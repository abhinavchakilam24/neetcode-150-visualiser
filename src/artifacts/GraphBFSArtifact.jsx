import { motion, AnimatePresence } from 'framer-motion';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)', text: 'var(--clr-active)' },
  found:      { bg: 'var(--clr-found-bg)',  border: 'var(--clr-found)',  text: 'var(--clr-found)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)', text: 'var(--clr-visited)' },
  eliminated: { bg: 'var(--clr-elim-bg)',   border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)' },
  queued:     { bg: 'var(--clr-queued-bg)', border: 'var(--clr-queued)', text: 'var(--clr-queued)' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)' },
};

function GridCell({ value, row, col, state }) {
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const isHighlighted = state === 'active' || state === 'found';

  return (
    <motion.div
      layout
      animate={{
        backgroundColor: s.bg,
        borderColor: s.border,
        scale: isHighlighted ? 1.08 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="w-10 h-10 flex items-center justify-center rounded text-xs font-mono font-bold"
      style={{
        border: `2px solid ${s.border}`,
        color: s.text,
      }}
    >
      {value}
    </motion.div>
  );
}

function BFSQueuePanel({ queue = [] }) {
  return (
    <div>
      <span className="text-[10px] font-mono mb-1 block" style={{ color: 'var(--text-muted)' }}>
        BFS Queue
      </span>
      <div
        className="flex items-center gap-1 min-h-[32px] px-2 py-1.5 rounded-lg overflow-x-auto"
        style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)' }}
      >
        {queue.length === 0 ? (
          <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>empty</span>
        ) : (
          <AnimatePresence mode="popLayout">
            {queue.map((item, i) => (
              <motion.span
                key={`${item}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7, x: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold"
                style={{
                  backgroundColor: i === 0 ? 'var(--clr-active-bg)' : 'var(--clr-queued-bg)',
                  border: `1px solid ${i === 0 ? 'var(--clr-active)' : 'var(--clr-queued)'}`,
                  color: i === 0 ? 'var(--clr-active)' : 'var(--clr-queued)',
                }}
              >
                {typeof item === 'string' ? item : `(${item})`}
              </motion.span>
            ))}
          </AnimatePresence>
        )}
        {queue.length > 0 && (
          <span className="text-[9px] font-mono ml-1" style={{ color: 'var(--text-muted)' }}>
            &larr; front
          </span>
        )}
      </div>
    </div>
  );
}

function DFSStackPanel({ stack = [] }) {
  if (stack.length === 0) return null;
  return (
    <div className="flex flex-col items-start gap-1 min-w-[130px]">
      <span className="text-[10px] font-mono mb-1" style={{ color: 'var(--text-muted)' }}>DFS Stack</span>
      <div className="flex flex-col-reverse gap-1 w-full">
        <AnimatePresence mode="popLayout">
          {stack.map((frame, i) => (
            <motion.div
              key={`${frame}-${i}`}
              layout
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="px-2 py-1 rounded text-[11px] font-mono whitespace-nowrap"
              style={{
                backgroundColor: i === stack.length - 1 ? 'var(--clr-active-bg)' : 'var(--bg-raised)',
                border: `1px solid ${i === stack.length - 1 ? 'var(--clr-active)' : 'var(--border)'}`,
                color: i === stack.length - 1 ? 'var(--clr-active)' : 'var(--text-secondary)',
                fontWeight: i === stack.length - 1 ? 700 : 400,
              }}
            >
              {frame}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function GraphBFSArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { grid = [], gridStates = [], bfsQueue = [], dfsStack = [] } = dataStructure;

  const rows = grid.length;
  const cols = rows > 0 ? grid[0].length : 0;

  return (
    <div className="space-y-4">
      {/* Grid label */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          Grid ({rows} × {cols})
        </span>
      </div>

      {/* Grid + DFS Stack side by side */}
      <div className="flex gap-4 items-start">
        <div className="flex-1 min-w-0 flex justify-center overflow-x-auto">
          <div className="inline-flex flex-col gap-1">
            {grid.map((row, r) => (
              <div key={r} className="flex gap-1">
                {row.map((val, c) => (
                  <GridCell
                    key={`${r}-${c}`}
                    value={val}
                    row={r}
                    col={c}
                    state={gridStates[r]?.[c] || 'default'}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {dfsStack.length > 0 && (
          <div className="flex-shrink-0">
            <DFSStackPanel stack={dfsStack} />
          </div>
        )}
      </div>

      {/* BFS Queue (shown when present) */}
      {bfsQueue.length > 0 && <BFSQueuePanel queue={bfsQueue} />}

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
