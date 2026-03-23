import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import DifficultyBadge from '../ui/DifficultyBadge.jsx';
import { useProgressStore } from '../../store/progressStore.js';

export default function TopicCard({ topic }) {
  const { solved } = useProgressStore();
  const total = topic.problems.length;
  const solvedCount = topic.problems.filter(p => solved[p.slug]).length;
  const pct = total > 0 ? Math.round((solvedCount / total) * 100) : 0;

  return (
    <div
      className="rounded-xl border overflow-hidden transition-shadow hover:shadow-md"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-1.5">
          <Link
            to={`/topics/${topic.id}`}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <span className="text-lg">{topic.icon}</span>
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{topic.label}</span>
          </Link>
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            {solvedCount}/{total}
          </span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-raised)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: 'var(--clr-found)' }}
          />
        </div>
      </div>

      {/* Problem list */}
      <div>
        {topic.problems.map((problem, i) => {
          const isSolved = !!solved[problem.slug];
          return (
            <Link
              key={problem.slug}
              to={`/problems/${problem.slug}`}
              className="flex items-center gap-2.5 px-4 py-2 transition-colors hover:bg-[#EFEDE8] group"
              style={{ borderTop: i > 0 ? '1px solid var(--bg-raised)' : 'none' }}
            >
              <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                {isSolved ? (
                  <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--clr-found)' }}>
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: 'var(--border-strong)' }} />
                )}
              </span>
              <span
                className="flex-1 text-sm truncate"
                style={{ color: isSolved ? 'var(--text-muted)' : 'var(--text-primary)' }}
              >
                {problem.title}
              </span>
              <DifficultyBadge difficulty={problem.difficulty} compact />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
