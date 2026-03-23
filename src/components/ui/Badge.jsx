export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[#1a2235] text-[#94a3b8] border border-[#1e293b]',
    emerald: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    amber:   'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    red:     'bg-red-500/15 text-red-400 border border-red-500/30',
    sky:     'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    indigo:  'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30',
  };

  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
