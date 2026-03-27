import { allProblems } from '../../data/index.js';
import { TOPICS } from '../../data/topics.js';

export default function Footer() {
  return (
    <footer className="py-4 text-center">
      <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
        {allProblems.length} Problems &middot; {TOPICS.length} Topics &middot; Free
      </p>
    </footer>
  );
}
