import { useParams, Link } from 'react-router-dom';
import { getTopicById } from '../data/index.js';
import { Check, ArrowLeft } from 'lucide-react';
import DifficultyBadge from '../components/ui/DifficultyBadge.jsx';
import { useProgressStore } from '../store/progressStore.js';

export default function TopicPage() {
  const { topicId } = useParams();
  const topic = getTopicById(topicId);
  const { solved } = useProgressStore();

  if (!topic) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Topic not found</h1>
        <Link to="/" className="text-sm mt-3 inline-block" style={{ color: 'var(--clr-active)' }}>← Back to Home</Link>
      </div>
    );
  }

  const solvedCount = topic.problems.filter(p => solved[p.slug]).length;
  const pct = Math.round((solvedCount / topic.problems.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/"
        className="flex items-center gap-1.5 text-xs transition-colors mb-6"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{topic.icon}</span>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{topic.label}</h1>
        </div>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {solvedCount} / {topic.problems.length} solved ({pct}%)
        </span>
        <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-raised)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: 'var(--clr-found)' }}
          />
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
        {topic.problems.map((problem, i) => {
          const isSolved = !!solved[problem.slug];
          return (
            <Link
              key={problem.slug}
              to={`/problems/${problem.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[#EFEDE8]"
              style={{ borderTop: i > 0 ? '1px solid var(--bg-raised)' : 'none' }}
            >
              <span className="w-4 flex-shrink-0">
                {isSolved ? (
                  <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--clr-found)' }}>
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: 'var(--border-strong)' }} />
                )}
              </span>
              <span className="flex-1 text-sm" style={{ color: isSolved ? 'var(--text-muted)' : 'var(--text-primary)' }}>
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
