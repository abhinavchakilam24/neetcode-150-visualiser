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

function layoutTree(tree, currentPath) {
  if (!tree || tree.length === 0) return { positioned: [], edges: [], width: 320, height: 120 };

  const nodeMap = {};
  tree.forEach(n => { nodeMap[n.id] = n; });

  const pathSet = new Set(currentPath || []);

  // Find root (no parent)
  const childIds = new Set(tree.flatMap(n => n.children || []));
  const root = tree.find(n => !childIds.has(n.id)) || tree[0];

  const positioned = [];
  const edges = [];

  // Count leaves per subtree for width allocation
  function countLeaves(id) {
    const node = nodeMap[id];
    if (!node) return 0;
    const children = node.children || [];
    if (children.length === 0) return 1;
    return children.reduce((sum, cid) => sum + countLeaves(cid), 0);
  }

  const totalLeaves = Math.max(countLeaves(root.id), 1);
  const totalWidth = Math.max(300, totalLeaves * 52);
  let maxDepth = 0;

  function layout(id, depth, leftBound, rightBound) {
    const node = nodeMap[id];
    if (!node) return;

    maxDepth = Math.max(maxDepth, depth);
    const children = node.children || [];

    if (children.length === 0) {
      const x = (leftBound + rightBound) / 2;
      const y = depth * 56 + 28;
      positioned.push({ ...node, x, y, depth, onPath: pathSet.has(id) });
      return;
    }

    // Allocate width proportionally by leaf count
    const leafCounts = children.map(cid => countLeaves(cid));
    const totalChildLeaves = leafCounts.reduce((a, b) => a + b, 0) || 1;
    let currentLeft = leftBound;

    children.forEach((cid, i) => {
      const portion = (leafCounts[i] / totalChildLeaves) * (rightBound - leftBound);
      layout(cid, depth + 1, currentLeft, currentLeft + portion);
      currentLeft += portion;
    });

    // Center parent over children
    const childPositions = children.map(cid => positioned.find(p => p.id === cid)).filter(Boolean);
    const x = childPositions.length > 0
      ? childPositions.reduce((sum, cp) => sum + cp.x, 0) / childPositions.length
      : (leftBound + rightBound) / 2;
    const y = depth * 56 + 28;

    positioned.push({ ...node, x, y, depth, onPath: pathSet.has(id) });

    // Edges
    childPositions.forEach(cp => {
      const onActivePath = pathSet.has(id) && pathSet.has(cp.id);
      edges.push({
        key: `${id}-${cp.id}`,
        x1: x, y1: y + 14,
        x2: cp.x, y2: cp.y - 14,
        state: cp.state,
        onActivePath,
      });
    });
  }

  layout(root.id, 0, 0, totalWidth);

  return {
    positioned,
    edges,
    width: totalWidth,
    height: (maxDepth + 1) * 56 + 56,
  };
}

function DecisionNode({ node }) {
  const state = node.onPath ? (node.state || 'active') : (node.state || 'default');
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const isHighlighted = state === 'active' || state === 'found';

  return (
    <motion.g
      layoutId={`bt-node-${node.id}`}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: state === 'eliminated' ? 0.35 : 1,
        scale: isHighlighted ? 1.1 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <rect
        x={node.x - 18}
        y={node.y - 12}
        width={36}
        height={24}
        rx={6}
        fill={s.bg}
        stroke={s.border}
        strokeWidth={isHighlighted ? 2 : 1.5}
        style={{ filter: isHighlighted ? 'drop-shadow(0 2px 6px rgba(217,119,6,0.3))' : 'none' }}
      />
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        fill={s.text}
        fontSize="10"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="bold"
      >
        {String(node.value ?? '')}
      </text>
    </motion.g>
  );
}

function DecisionEdge({ edge }) {
  const isEliminated = edge.state === 'eliminated';
  const isActive = edge.onActivePath;
  const color = isActive ? 'var(--clr-active)' : isEliminated ? 'var(--clr-eliminated)' : 'var(--border-bright)';

  return (
    <motion.line
      x1={edge.x1} y1={edge.y1}
      x2={edge.x2} y2={edge.y2}
      stroke={color}
      strokeWidth={isActive ? 2 : 1.5}
      strokeDasharray={isEliminated ? '3 3' : 'none'}
      opacity={isEliminated ? 0.3 : 1}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

function CallStackPanel({ callStack = [] }) {
  if (callStack.length === 0) return null;

  return (
    <div className="flex flex-col items-start gap-1 min-w-[120px]">
      <span className="text-[10px] font-mono mb-1" style={{ color: 'var(--text-muted)' }}>Call Stack</span>
      <div className="flex flex-col-reverse gap-1 w-full">
        <AnimatePresence mode="popLayout">
          {callStack.map((frame, i) => (
            <motion.div
              key={`${frame}-${i}`}
              layout
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="px-2 py-1 rounded text-[11px] font-mono whitespace-nowrap"
              style={{
                backgroundColor: i === callStack.length - 1 ? 'var(--clr-active-bg)' : 'var(--bg-raised)',
                border: `1px solid ${i === callStack.length - 1 ? 'var(--clr-active)' : 'var(--border)'}`,
                color: i === callStack.length - 1 ? 'var(--clr-active)' : 'var(--text-secondary)',
                fontWeight: i === callStack.length - 1 ? 700 : 400,
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

export default function BacktrackingArtifact({ step, prevStep, animating, input }) {
  const { dataStructure = {} } = step || {};
  const { tree = [], currentPath = [], results = [], callStack: rawCallStack } = dataStructure;

  // Auto-derive callStack from currentPath + tree nodes if not explicitly provided
  const callStack = (rawCallStack && rawCallStack.length > 0) ? rawCallStack : (() => {
    if (currentPath.length === 0) return [];
    const nodeMap = {};
    tree.forEach(n => { nodeMap[n.id] = n; });
    return currentPath.map(id => {
      const node = nodeMap[id];
      if (!node) return `frame(${id})`;
      const val = node.value ?? '';
      if (String(val).includes('rem=')) return `backtrack(${val})`;
      if (String(val).startsWith('[')) return `backtrack(path=${val})`;
      return `backtrack(${val})`;
    });
  })();

  const { positioned, edges, width, height } = useMemo(
    () => layoutTree(tree, currentPath),
    [tree, currentPath]
  );

  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const svgWidth = width || 320;
  const svgHeight = height || 120;

  return (
    <div className="space-y-4">
      {/* Top row: Decision Tree + Call Stack side by side */}
      <div className="flex gap-4 items-start">
        {/* Decision Tree */}
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-mono mb-2 block" style={{ color: 'var(--text-muted)' }}>Decision Tree</span>
          {positioned.length > 0 ? (
            <div className="flex justify-center overflow-x-auto">
              <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {edges.map(edge => (
                  <DecisionEdge key={edge.key} edge={edge} />
                ))}
                {positioned.map(node => (
                  <DecisionNode key={node.id} node={node} />
                ))}
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center h-20 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              No decisions yet
            </div>
          )}
        </div>

        {/* Call Stack */}
        {callStack.length > 0 && (
          <div className="flex-shrink-0">
            <CallStackPanel callStack={callStack} />
          </div>
        )}
      </div>

      {/* Current path */}
      {currentPath.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>path:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {currentPath.map((id, i) => {
              const node = tree.find(n => n.id === id);
              return (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>&rarr;</span>}
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold"
                    style={{ backgroundColor: 'var(--clr-active-bg)', color: 'var(--clr-active)', border: '1px solid var(--clr-active)' }}
                  >
                    {node?.value ?? id}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Found results */}
      {results.length > 0 && (
        <div>
          <span className="text-[10px] font-mono mb-2 block" style={{ color: 'var(--text-muted)' }}>results</span>
          <div className="flex flex-wrap gap-1.5 justify-center">
            <AnimatePresence mode="popLayout">
              {results.map((result, i) => (
                <motion.span
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono"
                  style={{ backgroundColor: 'var(--clr-found-bg)', color: 'var(--clr-found)', border: '1px solid var(--clr-found)' }}
                >
                  [{Array.isArray(result) ? result.join(', ') : String(result)}]
                </motion.span>
              ))}
            </AnimatePresence>
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
