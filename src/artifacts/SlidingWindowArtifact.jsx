import { motion, AnimatePresence } from 'framer-motion';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)',     text: 'var(--clr-active)',     shadow: '0 2px 8px rgba(217,119,6,0.2)' },
  found:      { bg: 'var(--clr-found-bg)',   border: 'var(--clr-found)',      text: 'var(--clr-found)',      shadow: '0 2px 8px rgba(5,150,105,0.2)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)',    text: 'var(--clr-visited)',    shadow: 'none' },
  pointer:    { bg: 'var(--clr-pointer-bg)', border: 'var(--clr-pointer)',    text: 'var(--clr-pointer)',    shadow: 'none' },
  eliminated: { bg: 'var(--clr-elim-bg)',    border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)', shadow: 'none' },
  queued:     { bg: 'var(--clr-queued-bg)',   border: 'var(--clr-queued)',     text: 'var(--clr-queued)',     shadow: 'none' },
  window:     { bg: 'var(--clr-pointer-bg)', border: 'var(--clr-window)',     text: 'var(--text-primary)',   shadow: 'none' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)', shadow: 'none' },
};

function WindowCell({ value, index, state, pointers = [], inWindow }) {
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const isHighlighted = state === 'active' || state === 'found';

  return (
    <div className="flex flex-col items-center">
      {/* Pointer labels */}
      <div className="h-5 flex items-end justify-center gap-0.5 mb-1">
        <AnimatePresence mode="popLayout">
          {pointers.map(p => (
            <motion.div
              key={p.name}
              layoutId={`ptr-${p.name}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex flex-col items-center"
            >
              <span className="text-[10px] font-mono font-bold" style={{ color: 'var(--clr-pointer)' }}>{p.name}</span>
              <svg width="6" height="5" viewBox="0 0 6 5" style={{ color: 'var(--clr-pointer)' }}>
                <polygon points="3,5 0,0 6,0" fill="currentColor" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Cell */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-12 h-12 flex items-center justify-center rounded-lg text-sm font-mono font-bold transition-all duration-200"
        style={{
          backgroundColor: s.bg,
          border: `2px solid ${s.border}`,
          color: s.text,
          boxShadow: s.shadow,
          transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {value}
      </motion.div>

      {/* Index */}
      <span className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>{index}</span>
    </div>
  );
}

export default function SlidingWindowArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press ▶ or → to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { arrayStates = {}, pointers = [], windowLeft, windowRight, windowMeta, stack, stackOperation } = dataStructure;
  const nums = input?.nums || input?.s?.split('') || input?.prices || [];

  const hasWindow = windowLeft !== undefined && windowRight !== undefined && windowLeft >= 0;
  // Show deque panel only when the scenario actually uses it (e.g. Sliding Window Maximum optimal)
  const hasDeque = stack !== undefined && (stack.length > 0 || input?._scenarioUsesStack === true);

  // Build pointer map: index -> list of pointer objects for that index
  const buildPointerMap = () => {
    const map = {};
    (pointers || []).forEach(p => {
      if (p.index !== undefined) {
        if (!map[p.index]) map[p.index] = [];
        map[p.index].push(p);
      }
    });
    // Add L/R pointers from window bounds if no explicit pointers at those positions
    if (hasWindow) {
      if (!map[windowLeft]) map[windowLeft] = [];
      if (!map[windowLeft].find(p => p.name === 'L')) {
        map[windowLeft].push({ name: 'L', index: windowLeft, color: 'pointer' });
      }
      if (!map[windowRight]) map[windowRight] = [];
      if (!map[windowRight].find(p => p.name === 'R')) {
        map[windowRight].push({ name: 'R', index: windowRight, color: 'pointer' });
      }
    }
    return map;
  };

  const pointerMap = buildPointerMap();

  return (
    <div className="space-y-5">
      {/* Array with window overlay */}
      <div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
            {input?.s !== undefined ? 's[]' : input?.prices !== undefined ? 'prices[]' : 'nums[]'}
          </span>
        </div>

        <div className="relative flex items-start gap-2 flex-wrap justify-center">
          {/* Window highlight overlay */}
          {hasWindow && nums.length > 0 && (
            <motion.div
              layoutId="window-overlay"
              className="absolute rounded-lg pointer-events-none"
              style={{
                backgroundColor: 'rgba(14, 165, 233, 0.08)',
                border: '2px solid var(--clr-window)',
                boxShadow: '0 0 12px rgba(14, 165, 233, 0.15)',
                top: 20,
                height: 56,
                /* Each cell is 48px wide + 8px gap. Position based on windowLeft/Right */
                left: `calc(50% - ${(nums.length * 56 - 8) / 2}px + ${windowLeft * 56}px - 4px)`,
                width: `${(windowRight - windowLeft + 1) * 56 - 8 + 8}px`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}

          {nums.map((val, idx) => {
            const inWindow = hasWindow && idx >= windowLeft && idx <= windowRight;
            const cellState = arrayStates[idx] || (inWindow ? 'window' : 'default');

            return (
              <WindowCell
                key={idx}
                value={val}
                index={idx}
                state={cellState}
                pointers={pointerMap[idx] || []}
                inWindow={inWindow}
              />
            );
          })}
        </div>
      </div>

      {/* Window metadata */}
      {windowMeta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-3"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
            style={{
              backgroundColor: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <span style={{ color: 'var(--clr-window)' }}>window</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>{windowMeta}</span>
          </div>
        </motion.div>
      )}

      {/* Deque panel (e.g. Sliding Window Maximum monotonic deque) */}
      {hasDeque && (
        <div className="flex justify-center">
          <div style={{ minWidth: 160, maxWidth: 340 }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Deque</span>
              {stackOperation && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{
                    color: stackOperation === 'push' ? 'var(--clr-found)' : stackOperation === 'pop' ? 'var(--clr-eliminated)' : 'var(--clr-active)',
                    backgroundColor: stackOperation === 'push' ? 'var(--clr-found-bg)' : stackOperation === 'pop' ? 'var(--clr-elim-bg)' : 'var(--clr-active-bg)',
                  }}
                >
                  {stackOperation.toUpperCase()}
                </motion.span>
              )}
              <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>size: {stack.length}</span>
            </div>
            <div
              className="flex flex-row items-center gap-1.5 rounded-lg p-3 min-h-[52px]"
              style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)' }}
            >
              {stack.length === 0 ? (
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>empty</span>
              ) : (
                <AnimatePresence mode="popLayout">
                  {stack.map((item, idx) => (
                    <motion.div
                      key={`${idx}-${item}`}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="flex items-center justify-center px-2 py-1 rounded-md text-xs font-mono font-bold"
                      style={{
                        backgroundColor: idx === stack.length - 1 ? 'var(--clr-pointer-bg)' : 'var(--bg-card)',
                        border: idx === stack.length - 1 ? '2px solid var(--clr-pointer)' : '1px solid var(--border)',
                        color: idx === stack.length - 1 ? 'var(--clr-pointer)' : 'var(--text-primary)',
                      }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
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
