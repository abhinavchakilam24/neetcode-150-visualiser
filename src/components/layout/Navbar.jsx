import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/problems', label: 'Problems' },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(250,249,247,0.85)' }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12">
          <Link to="/" className="flex items-center gap-1.5 font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--clr-active)' }}>&#9670;</span>
            Visualiser 150
          </Link>

          <div className="flex items-center gap-1">
            {links.map(({ to, label }) => {
              const active = location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className="px-3 py-1.5 rounded-md text-sm transition-colors"
                  style={{
                    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
