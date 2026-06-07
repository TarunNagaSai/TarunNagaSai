type Skill = {
  label: string;
  sub?: string;
  score: number;
  color: string;
};

const SKILLS: Skill[] = [
  { label: 'Mobile', sub: 'Flutter', score: 95, color: '#1D9E75' },
  { label: 'AI / LLM', sub: 'Pipelines', score: 85, color: '#7F77DD' },
  { label: 'Data / ETL', sub: 'Engineering', score: 80, color: '#5DCAA5' },
  { label: 'Automation', sub: 'Engineering', score: 78, color: '#AFA9EC' },
  { label: 'Backend', sub: 'NestJS / Laravel', score: 72, color: '#378ADD' },
  { label: 'Frontend', sub: 'Svelte / React', score: 65, color: '#85B7EB' },
  { label: 'DevOps', sub: 'Deployment', score: 60, color: '#FAC775' },
  { label: 'LLM Fine-tuning', sub: 'LoRA / PEFT', score: 58, color: '#9B59B6' },
  { label: 'Agentic AI', score: 52, color: '#D85A30' },
  { label: 'Systems', sub: 'Rust / low-level', score: 35, color: '#E24B4A' },
];

const HIGHLIGHTS = [
  { label: 'Strongest area', value: 'Mobile (Flutter)' },
  { label: 'Rising fast', value: 'LLM Fine-tuning' },
  { label: 'Gap to close', value: 'Systems / Low-level' },
];

const SIZE = 440;
const CENTER = SIZE / 2;
const CHART_RADIUS = 138;
const LABEL_RADIUS = CHART_RADIUS + 26;
const NUM_AXES = SKILLS.length;
const RINGS = [20, 40, 60, 80, 100];

function pointFor(index: number, value: number) {
  const angle = (index / NUM_AXES) * 2 * Math.PI - Math.PI / 2;
  const r = (value / 100) * CHART_RADIUS;
  return {
    x: CENTER + Math.cos(angle) * r,
    y: CENTER + Math.sin(angle) * r,
    angle,
  };
}

function labelAnchor(angle: number): 'start' | 'middle' | 'end' {
  const cos = Math.cos(angle);
  if (cos > 0.2) return 'start';
  if (cos < -0.2) return 'end';
  return 'middle';
}

function labelBaseline(angle: number): 'auto' | 'middle' | 'hanging' {
  const sin = Math.sin(angle);
  if (sin < -0.5) return 'auto';
  if (sin > 0.5) return 'hanging';
  return 'middle';
}

export function SkillRadar() {
  const polygonPoints = SKILLS.map((s, i) => {
    const p = pointFor(i, s.score);
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }).join(' ');

  return (
    <div>
      {/* Highlight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {HIGHLIGHTS.map((h) => (
          <div
            key={h.label}
            className="rounded-lg border border-border bg-bg/30 px-4 py-3 text-center"
          >
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1.5">
              {h.label}
            </div>
            <div className="text-sm font-medium text-fg">{h.value}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="relative mx-auto w-full max-w-[520px]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block w-full h-auto"
          role="img"
          aria-label="Radar chart of skill strength across 10 career domains"
        >
          <title>Skill strength across 10 career domains</title>
          <desc>
            {SKILLS.map((s) => `${s.label}: ${s.score}`).join('. ')}
          </desc>

          {/* Grid rings */}
          {RINGS.map((value) => {
            const pts = SKILLS.map((_, i) => {
              const p = pointFor(i, value);
              return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
            }).join(' ');
            return (
              <polygon
                key={value}
                points={pts}
                fill="none"
                className="stroke-border"
                strokeWidth="0.75"
                opacity={value === 100 ? 0.9 : 0.55}
              />
            );
          })}

          {/* Axes */}
          {SKILLS.map((_, i) => {
            const p = pointFor(i, 100);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                className="stroke-border"
                strokeWidth="0.5"
                opacity={0.6}
              />
            );
          })}

          {/* Value polygon */}
          <polygon
            points={polygonPoints}
            className="fill-accent/20 stroke-accent"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Points */}
          {SKILLS.map((s, i) => {
            const p = pointFor(i, s.score);
            return (
              <circle
                key={s.label}
                cx={p.x}
                cy={p.y}
                r={4.5}
                fill={s.color}
                className="stroke-bg"
                strokeWidth="2"
              />
            );
          })}

          {/* Labels */}
          {SKILLS.map((s, i) => {
            const angle = (i / NUM_AXES) * 2 * Math.PI - Math.PI / 2;
            const x = CENTER + Math.cos(angle) * LABEL_RADIUS;
            const y = CENTER + Math.sin(angle) * LABEL_RADIUS;
            const anchor = labelAnchor(angle);
            const baseline = labelBaseline(angle);
            const subOffset = s.sub ? -6 : 0;

            return (
              <g key={`label-${s.label}`}>
                <text
                  x={x}
                  y={y + subOffset}
                  textAnchor={anchor}
                  dominantBaseline={baseline}
                  className="fill-fg font-medium"
                  fontSize="11.5"
                >
                  {s.label}
                </text>
                {s.sub && (
                  <text
                    x={x}
                    y={y + 7}
                    textAnchor={anchor}
                    dominantBaseline={baseline}
                    className="fill-muted"
                    fontSize="9.5"
                  >
                    {s.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-8 border-t border-border pt-6">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2.5">
          {SKILLS.map((s) => (
            <li
              key={`legend-${s.label}`}
              className="flex items-center gap-2 text-xs text-subtle"
            >
              <span
                aria-hidden
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: s.color }}
              />
              <span className="truncate">{s.label}</span>
              <span className="ml-auto font-mono text-[11px] text-fg">{s.score}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
