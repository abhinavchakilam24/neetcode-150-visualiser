import { motion, AnimatePresence } from 'framer-motion';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)',     text: 'var(--clr-active)',     shadow: '0 2px 8px rgba(217,119,6,0.2)' },
  found:      { bg: 'var(--clr-found-bg)',   border: 'var(--clr-found)',      text: 'var(--clr-found)',      shadow: '0 2px 8px rgba(5,150,105,0.2)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)',    text: 'var(--clr-visited)',    shadow: 'none' },
  pointer:    { bg: 'var(--clr-pointer-bg)', border: 'var(--clr-pointer)',    text: 'var(--clr-pointer)',    shadow: 'none' },
  eliminated: { bg: 'var(--clr-elim-bg)',    border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)', shadow: 'none' },
  queued:     { bg: 'var(--clr-queued-bg)',   border: 'var(--clr-queued)',     text: 'var(--clr-queued)',     shadow: 'none' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)', shadow: 'none' },
};

function ArrayCell({ value, index, state, pointers = [] }) {
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

function StackPanel({ stack = [], stackOperation }) {
  // Stack renders bottom-to-top: array index 0 is the bottom
  const reversed = [...stack].reverse();
  const topIndex = stack.length - 1;

  const opLabel = stackOperation === 'push' ? 'PUSH' : stackOperation === 'pop' ? 'POP' : stackOperation === 'peek' ? 'PEEK' : null;
  const opColor = stackOperation === 'push' ? 'var(--clr-found)' : stackOperation === 'pop' ? 'var(--clr-eliminated)' : stackOperation === 'peek' ? 'var(--clr-active)' : null;

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Stack</span>
        {opLabel && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
            style={{ color: opColor, backgroundColor: `color-mix(in srgb, ${opColor} 15%, transparent)` }}
          >
            {opLabel}
          </motion.span>
        )}
        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
          size: {stack.length}
        </span>
      </div>

      <div
        className="flex flex-col items-center rounded-lg p-3 min-h-[60px]"
        style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)' }}
      >
        {stack.length === 0 ? (
          <span className="text-xs font-mono py-2" style={{ color: 'var(--text-muted)' }}>empty</span>
        ) : (
          <div className="flex flex-col-reverse items-center gap-1.5 w-full">
            <AnimatePresence mode="popLayout">
              {stack.map((item, idx) => {
                const isTop = idx === topIndex;
                const isPeek = stackOperation === 'peek' && isTop;
                const isPush = stackOperation === 'push' && isTop;
                const isPop = stackOperation === 'pop' && isTop;

                let itemStyle = {};
                if (isPeek) {
                  itemStyle = { backgroundColor: 'var(--clr-active-bg)', border: '2px solid var(--clr-active)', color: 'var(--clr-active)' };
                } else if (isPush) {
                  itemStyle = { backgroundColor: 'var(--clr-found-bg)', border: '2px solid var(--clr-found)', color: 'var(--clr-found)' };
                } else if (isPop) {
                  itemStyle = { backgroundColor: 'var(--clr-elim-bg)', border: '2px solid var(--clr-eliminated)', color: 'var(--clr-eliminated)' };
                } else if (isTop) {
                  itemStyle = { backgroundColor: 'var(--clr-pointer-bg)', border: '2px solid var(--clr-pointer)', color: 'var(--clr-pointer)' };
                } else {
                  itemStyle = { backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' };
                }

                return (
                  <motion.div
                    key={`${idx}-${item}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-full max-w-[120px] flex items-center justify-center py-1.5 px-3 rounded-md text-sm font-mono font-bold relative"
                    style={itemStyle}
                  >
                    {item}
                    {isTop && (
                      <span
                        className="absolute -right-8 text-[9px] font-mono"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        top
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StackArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press ▶ or → to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { arrayStates = {}, pointers = [], stack, stackOperation } = dataStructure;
  const nums = input?.nums || input?.s?.split('') || input?.temperatures || [];
  const hasArray = nums.length > 0 && Object.keys(arrayStates).length > 0;

  return (
    <div className="space-y-5">
      {/* Original array (if present) */}
      {hasArray && (
        <div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
              {input?.s !== undefined ? 's[]' : input?.temperatures !== undefined ? 'temperatures[]' : 'nums[]'}
            </span>
          </div>
          <div className="flex items-start gap-2 flex-wrap justify-center">
            {nums.map((val, idx) => (
              <ArrayCell
                key={idx}
                value={val}
                index={idx}
                state={arrayStates[idx] || 'default'}
                pointers={(pointers || []).filter(p => p.index === idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stack visualization */}
      {stack !== undefined && (
        <div className="flex justify-center">
          <div style={{ minWidth: 160, maxWidth: 280 }}>
            <StackPanel stack={stack} stackOperation={stackOperation} />
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
