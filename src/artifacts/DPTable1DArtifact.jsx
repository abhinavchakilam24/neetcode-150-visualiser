import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)', text: 'var(--clr-active)' },
  found:      { bg: 'var(--clr-found-bg)', border: 'var(--clr-found)', text: 'var(--clr-found)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)', text: 'var(--clr-visited)' },
  eliminated: { bg: 'var(--clr-elim-bg)', border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)' },
  queued:     { bg: 'var(--clr-queued-bg)', border: 'var(--clr-queued)', text: 'var(--clr-queued)' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)' },
};

function getCellState(idx, highlight, dpArray) {
  if (idx === highlight) return 'active';
  if (dpArray[idx] !== null && dpArray[idx] !== undefined) return 'visited';
  return 'default';
}

function DPCell({ value, index, state }) {
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const isHighlighted = state === 'active' || state === 'found';
  const isEmpty = value === null || value === undefined;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-12 h-12 flex items-center justify-center rounded-lg text-sm font-mono font-bold"
        style={{
          backgroundColor: s.bg,
          border: `2px solid ${s.border}`,
          color: s.text,
          transform: isHighlighted ? 'scale(1.08)' : 'scale(1)',
          boxShadow: isHighlighted ? '0 2px 8px rgba(217,119,6,0.2)' : 'none',
        }}
      >
        {isEmpty ? '-' : value}
      </motion.div>
      <span className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>{index}</span>
    </div>
  );
}

function RecurrenceArrows({ arrows, cellCount, containerRef }) {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (!containerRef.current || !arrows || arrows.length === 0) {
      setPositions([]);
      return;
    }

    const cells = containerRef.current.querySelectorAll('[data-dp-cell]');
    if (cells.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions = arrows.map(({ from, to }) => {
      const fromCell = cells[from];
      const toCell = cells[to];
      if (!fromCell || !toCell) return null;

      const fromRect = fromCell.getBoundingClientRect();
      const toRect = toCell.getBoundingClientRect();

      return {
        x1: fromRect.left - containerRect.left + fromRect.width / 2,
        y1: fromRect.top - containerRect.top + fromRect.height + 4,
        x2: toRect.left - containerRect.left + toRect.width / 2,
        y2: toRect.top - containerRect.top + toRect.height + 4,
      };
    }).filter(Boolean);

    setPositions(newPositions);
  }, [arrows, cellCount, containerRef]);

  if (positions.length === 0) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      <defs>
        <marker id="dp1d-arrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="var(--clr-active)" />
        </marker>
      </defs>
      {positions.map((pos, i) => {
        const dx = pos.x2 - pos.x1;
        const cy = Math.max(20, Math.abs(dx) * 0.35);
        const path = `M ${pos.x1} ${pos.y1} Q ${(pos.x1 + pos.x2) / 2} ${pos.y1 + cy} ${pos.x2} ${pos.y2}`;

        return (
          <motion.path
            key={`${i}-${pos.x1}-${pos.x2}`}
            d={path}
            fill="none"
            stroke="var(--clr-active)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            markerEnd="url(#dp1d-arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        );
      })}
    </svg>
  );
}

export default function DPTable1DArtifact({ step, prevStep, animating, input }) {
  const containerRef = useRef(null);

  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { dpArray = [], dpHighlight, dpArrows = [], dpFormula } = dataStructure;

  return (
    <div className="space-y-5">
      {/* DP Array */}
      <div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>dp[]</span>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="flex items-start gap-2 flex-wrap justify-center">
            {dpArray.map((val, idx) => (
              <div key={idx} data-dp-cell>
                <DPCell
                  value={val}
                  index={idx}
                  state={getCellState(idx, dpHighlight, dpArray)}
                />
              </div>
            ))}
          </div>

          <RecurrenceArrows
            arrows={dpArrows}
            cellCount={dpArray.length}
            containerRef={containerRef}
          />
        </div>
      </div>

      {/* Formula */}
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
