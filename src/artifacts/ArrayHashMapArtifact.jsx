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
        className="w-12 h-12 flex items-center justify-center rounded-lg text-sm font-mono font-bold"
        style={{
          backgroundColor: s.bg,
          border: `2px solid ${s.border}`,
          color: s.text,
          boxShadow: s.shadow,
          transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
          transition: 'background-color 0.2s, border-color 0.2s, color 0.2s, transform 0.2s',
        }}
      >
        {value}
      </motion.div>

      {/* Index */}
      <span className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>{index}</span>
    </div>
  );
}

function HashMapPanel({ hashMap = {} }) {
  const entries = Object.entries(hashMap);

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>HashMap</span>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded font-mono"
          style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)' }}
        >
          value → index
        </span>
      </div>

      <div
        className="rounded-lg p-3"
        style={{
          backgroundColor: 'var(--bg-raised)',
          border: '1px solid var(--border)',
          minHeight: '44px',
          minWidth: '120px',
        }}
      >
        {entries.length === 0 ? (
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{'{ }'} empty</span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            <AnimatePresence mode="popLayout">
              {entries.map(([key, entry]) => {
                const isNew = entry?.isNew;
                const isHighlighted = entry?.isHighlighted;
                const value = entry?.value ?? entry;

                let style = {};
                if (isHighlighted) {
                  style = { backgroundColor: 'var(--clr-active-bg)', border: '1.5px solid var(--clr-active)', color: 'var(--clr-active)' };
                } else if (isNew) {
                  style = { backgroundColor: 'var(--clr-found-bg)', border: '1.5px solid var(--clr-found)', color: 'var(--clr-found)' };
                } else {
                  style = { backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' };
                }

                return (
                  <motion.span
                    key={key}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono"
                    style={style}
                  >
                    <span className="font-semibold">{key}</span>
                    <span style={{ opacity: 0.35 }}>→</span>
                    <span>{String(value)}</span>
                  </motion.span>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ArrayHashMapArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press ▶ or → to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { arrayStates = {}, pointers = [], hashMap } = dataStructure;
  const nums = input?.nums || [];
  const hasHashMap = hashMap !== undefined;

  return (
    <div className="space-y-5">
      {/*
        Always side-by-side: overflow-x-auto handles wide content.
        No flex-wrap between array and hashmap — they never stack vertically.
      */}
      <div className="flex justify-center overflow-x-auto">
        <div className="flex items-start gap-8" style={{ flexShrink: 0 }}>

          {/* Array column */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono mb-3 tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
              nums[]
            </span>
            <div className="flex items-start gap-2 flex-wrap justify-center" style={{ maxWidth: '360px' }}>
              {nums.map((val, idx) => (
                <ArrayCell
                  key={idx}
                  value={val}
                  index={idx}
                  state={arrayStates[idx] || 'default'}
                  pointers={pointers.filter(p => p.index === idx)}
                />
              ))}
            </div>
          </div>

          {/* Subtle vertical divider */}
          {hasHashMap && (
            <div
              className="w-px"
              style={{ backgroundColor: 'var(--border)', alignSelf: 'stretch', marginTop: '1.5rem' }}
            />
          )}

          {/* HashMap column — entries wrap inside, capped at 260px */}
          {hasHashMap && (
            <div style={{ maxWidth: '260px' }}>
              <HashMapPanel hashMap={hashMap} />
            </div>
          )}

        </div>
      </div>

      {/* Answer banner */}
      <AnimatePresence>
        {step.isAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-sm font-bold"
            style={{ backgroundColor: 'var(--clr-found-bg)', color: 'var(--clr-found)', border: '1px solid var(--clr-found)' }}
          >
            ✓ {step.variables?.answer || 'Answer found'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
