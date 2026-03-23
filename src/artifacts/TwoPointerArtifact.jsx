import { motion, AnimatePresence } from 'framer-motion';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)',     text: 'var(--clr-active)' },
  found:      { bg: 'var(--clr-found-bg)',   border: 'var(--clr-found)',      text: 'var(--clr-found)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)',    text: 'var(--clr-visited)' },
  eliminated: { bg: 'var(--clr-elim-bg)',    border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)' },
  pointer:    { bg: 'var(--clr-pointer-bg)', border: 'var(--clr-pointer)',    text: 'var(--clr-pointer)' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)' },
};

function Cell({ value, index, state, pointers = [] }) {
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const highlighted = state === 'active' || state === 'found';

  return (
    <div className="flex flex-col items-center">
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
              <span className="text-[10px] font-mono font-bold" style={{ color: p.color === 'found' ? 'var(--clr-found)' : 'var(--clr-pointer)' }}>{p.name}</span>
              <svg width="6" height="5" viewBox="0 0 6 5" style={{ color: p.color === 'found' ? 'var(--clr-found)' : 'var(--clr-pointer)' }}>
                <polygon points="3,5 0,0 6,0" fill="currentColor" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-11 h-11 flex items-center justify-center rounded-lg text-sm font-mono font-bold"
        style={{
          backgroundColor: s.bg,
          border: `2px solid ${s.border}`,
          color: s.text,
          transform: highlighted ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {value}
      </motion.div>

      <span className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>{index}</span>
    </div>
  );
}

export default function TwoPointerArtifact({ step, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press ▶ or → to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { arrayStates = {}, pointers = [] } = dataStructure;
  const chars = input?.chars || input?.s?.split('') || input?.height || input?.nums || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          {typeof chars[0] === 'string' ? 'chars[]' : 'nums[]'}
        </span>
      </div>
      <div className="flex items-start gap-1.5 flex-wrap justify-center">
        {chars.map((val, idx) => (
          <Cell
            key={idx}
            value={val}
            index={idx}
            state={arrayStates[idx] || 'default'}
            pointers={pointers.filter(p => p.index === idx)}
          />
        ))}
      </div>

      <AnimatePresence>
        {step.isAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 py-2 rounded-lg font-mono text-sm font-bold"
            style={{ backgroundColor: 'var(--clr-found-bg)', color: 'var(--clr-found)', border: '1px solid var(--clr-found)' }}
          >
            ✓ {step.variables?.answer ?? 'Answer found'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
