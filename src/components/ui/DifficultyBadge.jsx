export default function DifficultyBadge({ difficulty, compact = false }) {
  const styles = {
    Easy:   { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
    Medium: { bg: '#FEF3E2', color: '#D97706', border: '#FDE68A' },
    Hard:   { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  };

  const s = styles[difficulty] || styles.Medium;
  const shortMap = { Easy: 'E', Medium: 'M', Hard: 'H' };

  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {compact ? shortMap[difficulty] : difficulty}
    </span>
  );
}
