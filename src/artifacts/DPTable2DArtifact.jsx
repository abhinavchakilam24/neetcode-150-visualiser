import { motion, AnimatePresence } from 'framer-motion';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)', text: 'var(--clr-active)' },
  found:      { bg: 'var(--clr-found-bg)', border: 'var(--clr-found)', text: 'var(--clr-found)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)', text: 'var(--clr-visited)' },
  eliminated: { bg: 'var(--clr-elim-bg)', border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)' },
  queued:     { bg: 'var(--clr-queued-bg)', border: 'var(--clr-queued)', text: 'var(--clr-queued)' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)' },
};

function getCellState(r, c, highlight, dpTable) {
  if (highlight && highlight.row === r && highlight.col === c) return 'active';
  const val = dpTable[r]?.[c];
  if (val !== null && val !== undefined) return 'visited';
  return 'default';
}

function isArrowSource(r, c, arrows) {
  return arrows.some(a => a.from.r === r && a.from.c === c);
}

export default function DPTable2DArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const {
    dpTable = [],
    dpHighlight2D,
    dpArrows2D = [],
    dpRowHeaders = [],
    dpColHeaders = [],
    dpFormula,
  } = dataStructure;

  const rows = dpTable.length;
  const cols = rows > 0 ? dpTable[0]?.length || 0 : 0;
  const hasRowHeaders = dpRowHeaders.length > 0;
  const hasColHeaders = dpColHeaders.length > 0;

  return (
    <div className="space-y-5">
      {/* Table label */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>dp[][]</span>
      </div>

      {/* Grid */}
      <div className="flex justify-center overflow-x-auto">
        <div className="inline-block">
          {/* Column headers */}
          {hasColHeaders && (
            <div className="flex" style={{ marginLeft: hasRowHeaders ? '2.5rem' : 0 }}>
              {dpColHeaders.map((header, c) => (
                <div
                  key={c}
                  className="w-11 h-6 flex items-center justify-center text-[10px] font-mono font-bold"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {header}
                </div>
              ))}
            </div>
          )}

          {/* Rows */}
          {dpTable.map((row, r) => (
            <div key={r} className="flex items-center">
              {/* Row header */}
              {hasRowHeaders && (
                <div
                  className="w-10 h-11 flex items-center justify-center text-[10px] font-mono font-bold shrink-0"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {dpRowHeaders[r] ?? r}
                </div>
              )}

              {/* Cells */}
              {row.map((val, c) => {
                const state = getCellState(r, c, dpHighlight2D, dpTable);
                const s = STATE_STYLES[state] || STATE_STYLES.default;
                const isHighlighted = state === 'active';
                const isSource = isArrowSource(r, c, dpArrows2D);
                const isEmpty = val === null || val === undefined;

                let cellStyle = {
                  backgroundColor: s.bg,
                  border: `2px solid ${s.border}`,
                  color: s.text,
                };

                if (isSource && !isHighlighted) {
                  cellStyle = {
                    ...cellStyle,
                    border: '2px solid var(--clr-pointer)',
                    backgroundColor: 'var(--clr-pointer-bg, rgba(56,189,248,0.1))',
                  };
                }

                return (
                  <motion.div
                    key={`${r}-${c}`}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="w-11 h-11 flex items-center justify-center rounded text-xs font-mono font-bold m-[1px]"
                    style={{
                      ...cellStyle,
                      transform: isHighlighted ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: isHighlighted ? '0 2px 8px rgba(217,119,6,0.25)' : 'none',
                    }}
                  >
                    {isEmpty ? '' : val}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow legend / formula */}
      {dpFormula && (
        <motion.div
          key={dpFormula}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          <span
            className="inline-block px-3 py-1.5 rounded-md text-xs font-mono"
            style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            {dpFormula}
          </span>
        </motion.div>
      )}

      {/* Arrow indicators */}
      {dpArrows2D.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          {dpArrows2D.map((arrow, i) => (
            <span key={i} className="text-[10px] font-mono" style={{ color: 'var(--clr-pointer)' }}>
              [{arrow.from.r},{arrow.from.c}] &rarr; [{arrow.to.r},{arrow.to.c}]
            </span>
          ))}
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
