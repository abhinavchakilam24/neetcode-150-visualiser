import { useProgressStore } from '../../store/progressStore.js';
import { allProblems } from '../../data/index.js';

export default function ProgressSummary() {
  const { solvedCount } = useProgressStore();
  const solved = solvedCount();
  const total = allProblems.length;
  const pct = Math.round((solved / total) * 100);

  if (solved === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
      <div className="rounded-lg border p-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--clr-found)' }}>{solved}</span>
            {' / '}{total} completed
          </span>
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-raised)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: 'var(--clr-found)' }}
          />
        </div>
      </div>
    </div>
  );
}
