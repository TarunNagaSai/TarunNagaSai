#!/usr/bin/env python3
"""
Send the AI Product Engineer profile card as an HTML email with the avatar
embedded INLINE via a Content-ID (cid:) reference. Supports single sends, bulk
sends to a recipient list, and both Gmail and iCloud SMTP.

Why this script exists
----------------------
The Gmail "create draft" assistant tool strips <img> tags out of the HTML before
it saves the draft, so neither cid: nor https: images ever survive. Building the
MIME message ourselves (multipart/related) bypasses that entirely — the image is
part of the message body and shows up without the recipient clicking "load
images". This is the standard, professional way to embed images in email.

Quick start
-----------
1) Preview only (writes scripts/profile-card.eml — double-click to open in Mail):

       python3 scripts/send_card_email.py --to someone@example.com

2) Send one email via iCloud:

       export ICLOUD_USER="tarunnagasai@icloud.com"
       export ICLOUD_APP_PASSWORD="xxxx-xxxx-xxxx-xxxx"   # appleid.apple.com -> App-Specific Passwords
       python3 scripts/send_card_email.py --to someone@example.com --provider icloud --send

3) Bulk send to a list (one message per person, throttled, resumable):

       python3 scripts/send_card_email.py --list scripts/recipients.txt --provider icloud --send

   recipients.txt format: one address per line. Optionally "email, Name".
   Lines starting with # are ignored. Already-sent addresses are skipped on
   re-runs (tracked in scripts/.sent_log.txt), so you can spread a large list
   across several days under iCloud's limits.

iCloud limits (important for bulk)
----------------------------------
iCloud Mail is a personal mailbox, not a bulk sender. Apple throttles outbound
volume (roughly a few hundred recipients/day) and may temporarily block the
account if you blast too fast. Keep --delay high (default 8s) and use
--limit to cap each run (e.g. --limit 150). Only email people who expect to
hear from you.

The avatar is read from public/card-avatar.jpg by default (--image to override).
"""

from __future__ import annotations

import argparse
import os
import re
import smtplib
import sys
import time
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_IMAGE = REPO_ROOT / "public" / "card-avatar.jpg"
DEFAULT_SENT_LOG = SCRIPT_DIR / ".sent_log.txt"


def load_dotenv() -> None:
    """Load KEY=VALUE pairs from a gitignored .env into os.environ.

    Looks in scripts/.env then repo-root .env. Existing environment variables
    win (so `export VAR=...` always overrides the file). No external deps.
    """
    for env_path in (SCRIPT_DIR / ".env", REPO_ROOT / ".env"):
        if not env_path.exists():
            continue
        for raw in env_path.read_text(encoding="utf-8").splitlines():
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            os.environ.setdefault(key, value)

# The Content-ID the HTML points at. Keep it simple + alphanumeric.
AVATAR_CID = "cardavatar"

FROM_NAME = "Tarun NagaSai"
SUBJECT = "Tarun NagaSai — AI Product Engineer"

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# SMTP settings per provider. The authenticated login also becomes the From
# address (sending as a different address gets rejected / marked as spam).
PROVIDERS = {
    "gmail": {
        "host": "smtp.gmail.com",
        "port": 465,
        "ssl": True,
        "user_env": "GMAIL_USER",
        "pass_env": "GMAIL_APP_PASSWORD",
        "app_pw_url": "https://myaccount.google.com/apppasswords",
    },
    "icloud": {
        "host": "smtp.mail.me.com",
        "port": 587,
        "ssl": False,  # STARTTLS on 587
        "user_env": "ICLOUD_USER",
        "pass_env": "ICLOUD_APP_PASSWORD",
        "app_pw_url": "https://appleid.apple.com (Sign-In and Security -> App-Specific Passwords)",
    },
}

PLAIN_TEXT = (
    "Tarun NagaSai — AI Product Engineer, Vishakhapatnam, India.\n\n"
    "A lot of AI demos look great but break once real users start using them. "
    "I build AI that actually works in the real world — taking your idea from a "
    "working MVP to a finished product that stays accurate, stays online, and "
    "doesn't waste money on idle GPUs. And I build the full product around it, so "
    "you hire one engineer instead of a team.\n\n"
    "Email: tarunnagasai@icloud.com · Web: tarun.avipra.com"
)


def build_html(avatar_cid: str) -> str:
    """Return the email-safe card HTML, referencing the inline avatar by cid."""
    return f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#ECECEC;-webkit-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ECECEC;">
  <tr>
    <td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#FFFFFF;border:2px solid #1F7AB0;border-radius:18px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

        <!-- Header -->
        <tr>
          <td style="padding:36px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle" style="padding-right:20px;">
                  <img src="cid:{avatar_cid}" alt="Tarun NagaSai" width="76" height="76" style="display:block;width:76px;height:76px;border-radius:50%;border:1px solid #DADADA;" />
                </td>
                <td valign="middle">
                  <div style="font-size:26px;font-weight:700;line-height:1.1;letter-spacing:-0.5px;color:#0A0A0A;">Tarun NagaSai</div>
                  <div style="margin-top:5px;font-size:14px;font-weight:600;color:#1F7AB0;">AI Product Engineer</div>
                  <div style="margin-top:4px;font-size:13px;color:#6B6B6B;">Vishakhapatnam, India</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Hairline -->
        <tr><td style="padding:24px 40px 0 40px;"><div style="height:1px;background-color:#E5E5E5;font-size:0;line-height:0;">&nbsp;</div></td></tr>

        <!-- Pitch -->
        <tr>
          <td style="padding:22px 40px 0 40px;font-size:15px;line-height:1.7;color:#2B2B2B;">
            A lot of AI demos look great but break once real users start using them. <strong style="color:#0A0A0A;">I build AI that actually works in the real world</strong> &mdash; taking your idea from a working MVP to a finished product that stays accurate, stays online, and doesn&rsquo;t waste money on idle GPUs. And I build the full product around it, so you hire one engineer instead of a team.
          </td>
        </tr>

        <!-- Hire me -->
        <tr>
          <td style="padding:22px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
              <td bgcolor="#1F7AB0" style="background-color:#1F7AB0;border-radius:10px;mso-padding-alt:13px 30px;">
                <a href="mailto:tarunnagasai@icloud.com?subject=Let%27s%20work%20together" style="display:inline-block;padding:13px 30px;font-size:14px;font-weight:700;letter-spacing:-0.2px;color:#FFFFFF;background-color:#1F7AB0;border-radius:10px;text-decoration:none;">Hire me &rarr;</a>
              </td>
            </tr></table>
          </td>
        </tr>

        <!-- What I can do for you -->
        <tr>
          <td style="padding:28px 40px 0 40px;">
            <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.8px;color:#1F7AB0;">What I can do for you</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;">
              <tr><td style="padding-bottom:12px;"><div style="font-size:14px;font-weight:600;color:#0A0A0A;">Ship AI from MVP to production</div><div style="margin-top:2px;font-size:13px;line-height:1.55;color:#555555;">Take your AI idea from a quick proof-of-value MVP to a hardened system real users can rely on.</div></td></tr>
              <tr><td style="padding-bottom:12px;"><div style="font-size:14px;font-weight:600;color:#0A0A0A;">Chatbots &amp; assistants over your own data</div><div style="margin-top:2px;font-size:13px;line-height:1.55;color:#555555;">AI that answers from your documents and knowledge, with sources, instead of generic replies.</div></td></tr>
              <tr><td style="padding-bottom:12px;"><div style="font-size:14px;font-weight:600;color:#0A0A0A;">Automations &amp; AI agents</div><div style="margin-top:2px;font-size:13px;line-height:1.55;color:#555555;">Agents that connect to your tools, make decisions, and finish multi-step tasks so hours of manual work run on their own.</div></td></tr>
              <tr><td style="padding-bottom:12px;"><div style="font-size:14px;font-weight:600;color:#0A0A0A;">Reliable, cost-controlled pipelines</div><div style="margin-top:2px;font-size:13px;line-height:1.55;color:#555555;">High-volume AI processing with quality checks built in and zero wasted spend on idle GPUs.</div></td></tr>
              <tr><td><div style="font-size:14px;font-weight:600;color:#0A0A0A;">The full product, end to end</div><div style="margin-top:2px;font-size:13px;line-height:1.55;color:#555555;">Mobile, backend, and frontend delivered around the AI, so you hire one engineer instead of a whole team.</div></td></tr>
            </table>
          </td>
        </tr>

        <!-- Flagship -->
        <tr>
          <td style="padding:24px 40px 0 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F9FC;border:1px solid #DCE8F0;border-radius:14px;">
              <tr><td style="padding:24px;">
                <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.8px;color:#1F7AB0;">Flagship &middot; Production</div>
                <div style="margin-top:6px;font-size:19px;font-weight:700;letter-spacing:-0.3px;color:#0A0A0A;">Yahuah AI Translation Pipeline</div>
                <div style="margin-top:10px;font-size:13px;line-height:1.65;color:#555555;">A client needed their scripture translated into four languages without changing the meaning of a single word. I built a system that did it all automatically, checked its own work to catch any mistakes, and only ran the expensive AI hardware while it was actually working, so no money was wasted.</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;"><tr>
                  <td width="33%" valign="top"><div style="font-size:22px;font-weight:700;letter-spacing:-0.5px;color:#1F7AB0;">100,000+</div><div style="margin-top:2px;font-size:11px;color:#6B6B6B;">verses translated</div></td>
                  <td width="33%" valign="top"><div style="font-size:22px;font-weight:700;letter-spacing:-0.5px;color:#1F7AB0;">4</div><div style="margin-top:2px;font-size:11px;color:#6B6B6B;">languages shipped</div></td>
                  <td width="33%" valign="top"><div style="font-size:22px;font-weight:700;letter-spacing:-0.5px;color:#1F7AB0;">0%</div><div style="margin-top:2px;font-size:11px;color:#6B6B6B;">error rate</div></td>
                </tr></table>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Selected Work -->
        <tr>
          <td style="padding:28px 40px 0 40px;">
            <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.8px;color:#1F7AB0;">Selected Work</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;">
              <tr><td style="padding-bottom:14px;border-bottom:1px solid #E5E5E5;"><strong style="font-size:14px;font-weight:600;color:#0A0A0A;">Horeb</strong><span style="font-size:13px;color:#555555;"> &mdash; offline-first multilingual Bible app for iOS &amp; Android; rebuilt the data layer to cut memory use 64% and render 3x faster.</span></td></tr>
              <tr><td style="padding:14px 0;border-bottom:1px solid #E5E5E5;"><strong style="font-size:14px;font-weight:600;color:#0A0A0A;">HealthPass by TruNord</strong><span style="font-size:13px;color:#555555;"> &mdash; health app live on the App Store, syncing real activity data from Apple Health &amp; Google Fit.</span></td></tr>
              <tr><td style="padding-top:14px;"><strong style="font-size:14px;font-weight:600;color:#0A0A0A;">Gemma 4 Pok&eacute;mon Fine-Tune</strong><span style="font-size:13px;color:#555555;"> &mdash; trained a custom domain model end to end and published it, proving the full fine-tuning lifecycle.</span></td></tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 40px 36px 40px;">
            <div style="height:1px;background-color:#E5E5E5;font-size:0;line-height:0;margin-bottom:24px;">&nbsp;</div>
            <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.8px;color:#1F7AB0;">Get in touch</div>
            <div style="margin-top:14px;">
              <a href="mailto:tarunnagasai@icloud.com" style="font-size:13px;font-weight:600;color:#0A0A0A;text-decoration:none;">tarunnagasai@icloud.com</a>
              <span style="color:#CCCCCC;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
              <a href="https://tarun.avipra.com" style="font-size:13px;font-weight:600;color:#0A0A0A;text-decoration:none;">tarun.avipra.com</a>
            </div>
            <div style="margin-top:10px;">
              <a href="https://github.com/TarunNagaSai" style="font-size:13px;color:#6B6B6B;text-decoration:none;">GitHub</a>
              <span style="color:#CCCCCC;">&nbsp;&nbsp;&nbsp;</span>
              <a href="https://linkedin.com/in/tarun-naga-sai" style="font-size:13px;color:#6B6B6B;text-decoration:none;">LinkedIn</a>
              <span style="color:#CCCCCC;">&nbsp;&nbsp;&nbsp;</span>
              <a href="https://medium.com/@tarunnagasai007" style="font-size:13px;color:#6B6B6B;text-decoration:none;">Medium</a>
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>"""


def build_message(from_addr: str, to_addr: str, image_bytes: bytes) -> MIMEMultipart:
    """Assemble a multipart/related message with the avatar embedded by cid."""
    # multipart/related ties the HTML to its inline image parts.
    root = MIMEMultipart("related")
    root["Subject"] = SUBJECT
    root["From"] = formataddr((FROM_NAME, from_addr))
    root["To"] = to_addr

    # multipart/alternative holds the plain-text + HTML versions.
    alt = MIMEMultipart("alternative")
    root.attach(alt)
    alt.attach(MIMEText(PLAIN_TEXT, "plain", "utf-8"))
    alt.attach(MIMEText(build_html(AVATAR_CID), "html", "utf-8"))

    # The inline image. The Content-ID MUST match the cid: in the HTML.
    img = MIMEImage(image_bytes, _subtype="jpeg")
    img.add_header("Content-ID", f"<{AVATAR_CID}>")
    img.add_header("Content-Disposition", "inline", filename="card-avatar.jpg")
    root.attach(img)

    return root


def parse_recipients(path: Path) -> list[tuple[str, str | None]]:
    """Read 'email' or 'email, Name' per line; skip blanks/comments/invalid."""
    recipients: list[tuple[str, str | None]] = []
    seen: set[str] = set()
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if "," in line:
            addr, name = (p.strip() for p in line.split(",", 1))
        else:
            addr, name = line, None
        addr = addr.strip("<>").lower()
        if not EMAIL_RE.match(addr):
            print(f"  ! skipping invalid address: {raw!r}")
            continue
        if addr in seen:
            continue
        seen.add(addr)
        recipients.append((addr, name or None))
    return recipients


def load_sent_log(path: Path) -> set[str]:
    if not path.exists():
        return set()
    return {ln.strip().lower() for ln in path.read_text().splitlines() if ln.strip()}


def open_smtp(provider: str) -> tuple[smtplib.SMTP, str]:
    """Log in and return (server, from_addr). from_addr == authenticated user."""
    cfg = PROVIDERS[provider]
    user = os.environ.get(cfg["user_env"])
    password = os.environ.get(cfg["pass_env"])
    if not user or not password:
        sys.exit(
            f"Set {cfg['user_env']} and {cfg['pass_env']} env vars to send via "
            f"{provider}.\nCreate an app-specific password at: {cfg['app_pw_url']}"
        )
    if cfg["ssl"]:
        server = smtplib.SMTP_SSL(cfg["host"], cfg["port"])
    else:
        server = smtplib.SMTP(cfg["host"], cfg["port"])
        server.starttls()
    server.login(user, password)
    return server, user


def main() -> None:
    load_dotenv()  # pull credentials from scripts/.env if present
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    target = parser.add_mutually_exclusive_group(required=True)
    target.add_argument("--to", help="A single recipient email address")
    target.add_argument(
        "--list", dest="list_path", type=Path, help="File of recipients (one per line)"
    )
    parser.add_argument(
        "--provider", choices=sorted(PROVIDERS), default="icloud",
        help="SMTP provider (default: icloud)",
    )
    parser.add_argument(
        "--image", type=Path, default=DEFAULT_IMAGE,
        help=f"Avatar image path (default: {DEFAULT_IMAGE})",
    )
    parser.add_argument("--send", action="store_true", help="Actually send (else preview only)")
    parser.add_argument(
        "--delay", type=float, default=8.0,
        help="Seconds to wait between sends (default: 8)",
    )
    parser.add_argument(
        "--limit", type=int, default=0,
        help="Max emails to send this run (0 = no cap). Use for daily limits.",
    )
    parser.add_argument(
        "--sent-log", type=Path, default=DEFAULT_SENT_LOG,
        help="File tracking already-sent addresses (skipped on re-runs)",
    )
    parser.add_argument(
        "--eml", type=Path, default=SCRIPT_DIR / "profile-card.eml",
        help="Where to write the preview .eml file",
    )
    args = parser.parse_args()

    if not args.image.exists():
        sys.exit(f"Image not found: {args.image}")
    image_bytes = args.image.read_bytes()

    # Resolve the recipient list.
    if args.to:
        recipients = [(args.to.strip().lower(), None)]
    else:
        if not args.list_path.exists():
            sys.exit(f"Recipient list not found: {args.list_path}")
        recipients = parse_recipients(args.list_path)
    if not recipients:
        sys.exit("No valid recipients found.")

    # Skip anyone already emailed (makes re-runs safe + resumable).
    already = load_sent_log(args.sent_log)
    pending = [(a, n) for (a, n) in recipients if a not in already]
    skipped = len(recipients) - len(pending)
    if skipped:
        print(f"Skipping {skipped} already-sent address(es) from {args.sent_log.name}.")
    if args.limit > 0:
        pending = pending[: args.limit]

    print(f"{len(pending)} email(s) queued (provider: {args.provider}).")

    # Preview mode: write one .eml and stop.
    if not args.send:
        sample = pending[0][0]
        msg = build_message("you@example.com", sample, image_bytes)
        args.eml.write_bytes(msg.as_bytes())
        print(f"Preview only — wrote {args.eml} (sample recipient: {sample}).")
        print("Re-run with --send (and the provider's app-password env vars) to send.")
        return

    # Send mode.
    server, from_addr = open_smtp(args.provider)
    sent = 0
    try:
        with args.sent_log.open("a", encoding="utf-8") as log:
            for i, (addr, _name) in enumerate(pending, 1):
                msg = build_message(from_addr, addr, image_bytes)
                try:
                    server.sendmail(from_addr, [addr], msg.as_bytes())
                except smtplib.SMTPException as exc:
                    print(f"  [{i}/{len(pending)}] FAILED {addr}: {exc}")
                    continue
                log.write(addr + "\n")
                log.flush()
                sent += 1
                print(f"  [{i}/{len(pending)}] sent -> {addr}")
                if i < len(pending) and args.delay > 0:
                    time.sleep(args.delay)
    finally:
        server.quit()

    print(f"Done. Sent {sent} email(s) from {from_addr}. Logged to {args.sent_log.name}.")


if __name__ == "__main__":
    main()
