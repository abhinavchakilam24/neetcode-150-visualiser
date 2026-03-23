import TopicCard from './TopicCard.jsx';
import { TOPICS } from '../../data/topics.js';

export default function TopicGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>All Topics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {TOPICS.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
