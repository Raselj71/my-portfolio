import type { ContributionWeek } from '@/lib/github';

const CELL = 11;
const GAP = 3;

function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

const FILL = [
  'rgba(255,255,255,0.04)',
  'rgba(56,189,248,0.25)',
  'rgba(56,189,248,0.5)',
  'rgba(56,189,248,0.75)',
  'rgba(56,189,248,1)',
];

export function ContributionGraph({
  weeks,
  total,
}: {
  weeks: ContributionWeek[];
  total: number;
}) {
  const width = weeks.length * (CELL + GAP);
  const height = 7 * (CELL + GAP);

  return (
    <div className="overflow-x-auto">
      <div className="text-sm text-text-muted">
        <span className="font-mono text-text">{total.toLocaleString()}</span>{' '}
        contributions in the last year
      </div>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`GitHub contribution graph: ${total} contributions in the last year`}
        className="mt-3"
      >
        {weeks.map((week, x) =>
          week.map((day, y) => (
            <rect
              key={`${x}-${y}`}
              x={x * (CELL + GAP)}
              y={y * (CELL + GAP)}
              width={CELL}
              height={CELL}
              rx={2}
              fill={FILL[levelFor(day.count)]}
            >
              <title>
                {day.date}: {day.count} contributions
              </title>
            </rect>
          )),
        )}
      </svg>
    </div>
  );
}
