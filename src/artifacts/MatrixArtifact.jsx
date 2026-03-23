import { motion, AnimatePresence } from 'framer-motion';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)', text: 'var(--clr-active)' },
  found:      { bg: 'var(--clr-found-bg)', border: 'var(--clr-found)', text: 'var(--clr-found)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)', text: 'var(--clr-visited)' },
  eliminated: { bg: 'var(--clr-elim-bg)', border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)' },
  queued:     { bg: 'var(--clr-queued-bg)', border: 'var(--clr-queued)', text: 'var(--clr-queued)' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)' },
};

function getCellState(r, c, matrixStates, cursor, trail) {
  if (cursor && cursor.row === r && cursor.col === c) return 'active';
  if (matrixStates && matrixStates[r] && matrixStates[r][c]) return matrixStates[r][c];
  if (trail && trail.some(t => t.r === r && t.c === c)) return 'visited';
  return 'default';
}

export default function MatrixArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { matrix = [], matrixStates = {}, cursor, trail = [] } = dataStructure;

  const rows = matrix.length;
  const cols = rows > 0 ? matrix[0]?.length || 0 : 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>matrix</span>
        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
          {rows}×{cols}
        </span>
      </div>

      {/* Grid */}
      <div className="flex justify-center overflow-x-auto">
        <div className="inline-block">
          {matrix.map((row, r) => (
            <div key={r} className="flex">
              {row.map((val, c) => {
                const state = getCellState(r, c, matrixStates, cursor, trail);
                const s = STATE_STYLES[state] || STATE_STYLES.default;
                const isCursor = cursor && cursor.row === r && cursor.col === c;

                return (
                  <motion.div
                    key={`${r}-${c}`}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="w-11 h-11 flex items-center justify-center rounded text-xs font-mono font-bold m-[1px]"
                    style={{
                      backgroundColor: s.bg,
                      border: `2px solid ${s.border}`,
                      color: s.text,
                      transform: isCursor ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: isCursor ? '0 2px 8px rgba(217,119,6,0.25)' : 'none',
                    }}
                  >
                    {val !== null && val !== undefined ? val : ''}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Cursor position indicator */}
      {cursor && (
        <motion.div
          key={`${cursor.row}-${cursor.col}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          <span
            className="inline-block px-3 py-1.5 rounded-md text-xs font-mono"
            style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            cursor: [{cursor.row}, {cursor.col}] = {matrix[cursor.row]?.[cursor.col] ?? '?'}
          </span>
        </motion.div>
      )}

      {/* Trail counter */}
      {trail.length > 0 && (
        <div className="flex items-center justify-center">
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
            visited: {trail.length} / {rows * cols}
          </span>
        </div>
      )}

      {/* Answer banner */}
      <AnimatePresence>
        {step.isAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 py-2 rounded-lg font-mono text-sm font-bold"
            style={{ backgroundColor: 'var(--clr-found-bg)', color: 'var(--clr-found)', border: '1px solid var(--clr-found)' }}
          >
            {step.variables?.answer || 'Answer found'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
