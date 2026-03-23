import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar.jsx';
import DifficultyBadge from '../components/ui/DifficultyBadge.jsx';
import { allProblems, allTopics } from '../data/index.js';
import { useProgressStore } from '../store/progressStore.js';

export default function ProblemList() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [topic, setTopic] = useState('All');
  const { solved } = useProgressStore();

  const filtered = useMemo(() => {
    return allProblems.filter(p => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
      const matchDiff = difficulty === 'All' || p.difficulty === difficulty;
      const matchTopic = topic === 'All' || p.topic === topic;
      return matchSearch && matchDiff && matchTopic;
    });
  }, [search, difficulty, topic]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Problems</h1>
      <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
        {Object.keys(solved).length} / {allProblems.length} solved
      </p>

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <SearchBar value={search} onChange={setSearch} placeholder="Search..." className="flex-1 min-w-[200px]" />
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="rounded-lg px-3 py-2 text-sm focus:outline-none"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)' }}
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select
          value={topic}
          onChange={e => setTopic(e.target.value)}
          className="rounded-lg px-3 py-2 text-sm focus:outline-none"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)' }}
        >
          <option value="All">All Topics</option>
          {allTopics.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
        {filtered.map((problem, i) => {
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
              <span className="flex-1 text-sm truncate" style={{ color: isSolved ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                {problem.title}
              </span>
              <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-muted)' }}>{problem.topicLabel}</span>
              <DifficultyBadge difficulty={problem.difficulty} compact />
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No matching problems.</div>
        )}
      </div>
    </div>
  );
}
