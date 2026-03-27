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

const POINTER_COLORS = {
  lo:  'var(--clr-pointer)',
  mid: 'var(--clr-active)',
  hi:  'var(--clr-visited)',
};

function getCellState(idx, bsLeft, bsMid, bsRight, arrayStates, isAnswer) {
  // Explicit arrayStates take priority
  if (arrayStates && arrayStates[idx]) {
    return arrayStates[idx];
  }

  if (isAnswer && idx === bsMid) return 'found';
  if (idx === bsMid) return 'active';
  // Use != null to handle both null and undefined (brute force steps may set bsLeft: null)
  if (bsLeft != null && bsRight != null) {
    if (idx < bsLeft || idx > bsRight) return 'eliminated';
  }
  return 'default';
}

function getPointersForIndex(idx, bsLeft, bsMid, bsRight, extraPointers) {
  const ptrs = [];
  if (bsLeft != null && idx === bsLeft) ptrs.push({ name: 'lo', color: POINTER_COLORS.lo });
  if (bsMid != null && idx === bsMid) ptrs.push({ name: 'mid', color: POINTER_COLORS.mid });
  if (bsRight != null && idx === bsRight) ptrs.push({ name: 'hi', color: POINTER_COLORS.hi });

  // Also include any extra pointers from the step data
  if (extraPointers) {
    extraPointers.filter(p => p.index === idx).forEach(p => {
      if (!ptrs.find(existing => existing.name === p.name)) {
        ptrs.push({ name: p.name, color: POINTER_COLORS[p.name] || 'var(--clr-pointer)' });
      }
    });
  }

  return ptrs;
}

function BinarySearchCell({ value, index, state, pointers = [] }) {
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const isHighlighted = state === 'active' || state === 'found';
  const isEliminated = state === 'eliminated';

  return (
    <div className="flex flex-col items-center">
      {/* Pointer labels above */}
      <div className="h-5 flex items-end justify-center gap-0.5 mb-1">
        <AnimatePresence mode="popLayout">
          {pointers.map(p => (
            <motion.div
              key={p.name}
              layoutId={`bs-ptr-${p.name}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex flex-col items-center"
            >
              <span className="text-[10px] font-mono font-bold" style={{ color: p.color }}>{p.name}</span>
              <svg width="6" height="5" viewBox="0 0 6 5" style={{ color: p.color }}>
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
          opacity: isEliminated ? 0.4 : 1,
          transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {value}
      </motion.div>

      {/* Index */}
      <span
        className="text-[10px] font-mono mt-1"
        style={{ color: 'var(--text-muted)', opacity: isEliminated ? 0.4 : 1 }}
      >
        {index}
      </span>
    </div>
  );
}

function ConditionLabel({ condition }) {
  if (!condition) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-center"
    >
      <span
        className="inline-block px-3 py-1.5 rounded-md text-xs font-mono"
        style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        {condition}
      </span>
    </motion.div>
  );
}

export default function BinarySearchArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { bsLeft, bsMid, bsRight, bsCondition, arrayStates = {}, pointers = [] } = dataStructure;
  const nums = input?.nums || [];
  // Only show binary-search-specific UI when the scenario actually performs a binary search
  const hasBsSearch = bsLeft != null || input?._scenarioUsesBsSearch === true;

  return (
    <div className="space-y-5">
      {/* Array label */}
      <div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>nums[] (sorted)</span>
        </div>

        {/* Array cells */}
        <div className="flex items-start gap-2 flex-wrap justify-center">
          {nums.map((val, idx) => {
            const cellState = getCellState(idx, bsLeft, bsMid, bsRight, arrayStates, step.isAnswer);
            const cellPointers = getPointersForIndex(idx, bsLeft, bsMid, bsRight, pointers);

            return (
              <BinarySearchCell
                key={idx}
                value={val}
                index={idx}
                state={cellState}
                pointers={cellPointers}
              />
            );
          })}
        </div>
      </div>

      {/* Search range indicator — only when real values are present (not null from brute force) */}
      {bsLeft != null && bsRight != null && !step.isAnswer && (
        <div className="flex items-center justify-center">
          <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
            search range: [{bsLeft}..{bsRight}]
          </span>
        </div>
      )}

      {/* Condition label */}
      <ConditionLabel condition={bsCondition} />

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
            {step.variables?.answer || 'Target found'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
