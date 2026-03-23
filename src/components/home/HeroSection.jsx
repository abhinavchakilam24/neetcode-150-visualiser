import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Visualiser 150
        </h1>
        <p className="text-sm mb-5 max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
          150 problems. Interactive step-by-step dry runs.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/problems/two-sum"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90"
            style={{ backgroundColor: 'var(--clr-active)' }}
          >
            Start Learning
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/problems"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border hover:bg-[var(--bg-hover)]"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            All Problems
          </Link>
        </div>
      </div>
    </div>
  );
}
