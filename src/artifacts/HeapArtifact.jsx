import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)', text: 'var(--clr-active)' },
  found:      { bg: 'var(--clr-found-bg)', border: 'var(--clr-found)', text: 'var(--clr-found)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)', text: 'var(--clr-visited)' },
  eliminated: { bg: 'var(--clr-elim-bg)', border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)' },
  queued:     { bg: 'var(--clr-queued-bg)', border: 'var(--clr-queued)', text: 'var(--clr-queued)' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)' },
};

function getNodeState(idx, highlight) {
  if (!highlight) return 'default';
  if (highlight.includes(idx)) return 'active';
  return 'default';
}

function computeTreeLayout(heap) {
  if (!heap || heap.length === 0) return [];

  const nodes = [];
  const depth = Math.floor(Math.log2(heap.length)) + 1;
  const baseWidth = Math.max(320, Math.pow(2, depth - 1) * 60);

  for (let i = 0; i < heap.length; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const posInLevel = i - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    const spacing = baseWidth / nodesInLevel;
    const x = spacing * (posInLevel + 0.5);
    const y = level * 64 + 24;

    nodes.push({ index: i, value: heap[i], x, y, level });
  }

  return nodes;
}

function TreeEdge({ x1, y1, x2, y2, isSwap }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={isSwap ? 'var(--clr-active)' : 'var(--border-bright)'}
      strokeWidth={isSwap ? 2 : 1.5}
      strokeDasharray={isSwap ? '4 2' : 'none'}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

function TreeNode({ node, state, isSwap }) {
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const isHighlighted = state === 'active';

  return (
    <motion.g
      layoutId={`heap-node-${node.index}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: isHighlighted ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <circle
        cx={node.x}
        cy={node.y}
        r={18}
        fill={s.bg}
        stroke={s.border}
        strokeWidth={2}
        style={{ filter: isHighlighted ? 'drop-shadow(0 2px 6px rgba(217,119,6,0.3))' : 'none' }}
      />
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        fill={s.text}
        fontSize="12"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="bold"
      >
        {node.value}
      </text>
    </motion.g>
  );
}

export default function HeapArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { heap = [], heapHighlight = [], heapType } = dataStructure;

  const treeNodes = useMemo(() => computeTreeLayout(heap), [heap]);
  const depth = heap.length > 0 ? Math.floor(Math.log2(heap.length)) + 1 : 1;
  const svgWidth = Math.max(320, Math.pow(2, depth - 1) * 60);
  const svgHeight = depth * 64 + 48;

  const swapSet = new Set(heapHighlight);

  // Build edges
  const edges = [];
  for (let i = 0; i < treeNodes.length; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    if (leftIdx < treeNodes.length) {
      const isSwap = swapSet.has(i) && swapSet.has(leftIdx);
      edges.push({ key: `${i}-${leftIdx}`, parent: treeNodes[i], child: treeNodes[leftIdx], isSwap });
    }
    if (rightIdx < treeNodes.length) {
      const isSwap = swapSet.has(i) && swapSet.has(rightIdx);
      edges.push({ key: `${i}-${rightIdx}`, parent: treeNodes[i], child: treeNodes[rightIdx], isSwap });
    }
  }

  return (
    <div className="space-y-5">
      {/* Heap type label */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          {heapType === 'max' ? 'Max Heap' : heapType === 'min' ? 'Min Heap' : 'Heap'}
        </span>
      </div>

      {/* Tree visualization */}
      {heap.length > 0 && (
        <div className="flex justify-center overflow-x-auto">
          <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            {/* Edges */}
            {edges.map(({ key, parent, child, isSwap }) => (
              <TreeEdge
                key={key}
                x1={parent.x} y1={parent.y + 18}
                x2={child.x} y2={child.y - 18}
                isSwap={isSwap}
              />
            ))}

            {/* Nodes */}
            {treeNodes.map(node => (
              <TreeNode
                key={node.index}
                node={node}
                state={getNodeState(node.index, heapHighlight)}
                isSwap={swapSet.has(node.index)}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Array representation */}
      <div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>array representation</span>
        </div>
        <div className="flex items-start gap-1.5 flex-wrap justify-center">
          {heap.map((val, idx) => {
            const state = getNodeState(idx, heapHighlight);
            const s = STATE_STYLES[state] || STATE_STYLES.default;

            return (
              <motion.div
                key={idx}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded text-xs font-mono font-bold"
                  style={{
                    backgroundColor: s.bg,
                    border: `2px solid ${s.border}`,
                    color: s.text,
                  }}
                >
                  {val}
                </div>
                <span className="text-[9px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{idx}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

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
