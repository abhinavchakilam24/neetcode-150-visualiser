import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)', text: 'var(--clr-active)' },
  found:      { bg: 'var(--clr-found-bg)',  border: 'var(--clr-found)',  text: 'var(--clr-found)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)', text: 'var(--clr-visited)' },
  eliminated: { bg: 'var(--clr-elim-bg)',   border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)' },
  queued:     { bg: 'var(--clr-queued-bg)', border: 'var(--clr-queued)', text: 'var(--clr-queued)' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)' },
};

const NODE_RADIUS = 20;
const LEVEL_HEIGHT = 60;
const MIN_H_GAP = 50;

function computeLayout(treeNodes) {
  if (!treeNodes || Object.keys(treeNodes).length === 0) return { positions: {}, width: 0, height: 0 };

  // Find root: node not referenced as any other node's child
  const childIds = new Set();
  Object.values(treeNodes).forEach(n => {
    if (n.left != null) childIds.add(String(n.left));
    if (n.right != null) childIds.add(String(n.right));
  });
  const rootId = Object.keys(treeNodes).find(id => !childIds.has(id)) || Object.keys(treeNodes)[0];

  const positions = {};
  let xCounter = 0;

  // In-order traversal to assign x positions
  function inorder(id) {
    if (id == null || !treeNodes[id]) return;
    inorder(treeNodes[id].left);
    positions[id] = { x: xCounter * MIN_H_GAP, y: (treeNodes[id].depth || 0) * LEVEL_HEIGHT };
    xCounter++;
    inorder(treeNodes[id].right);
  }

  inorder(rootId);

  // Center the tree
  const xs = Object.values(positions).map(p => p.x);
  const ys = Object.values(positions).map(p => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  Object.keys(positions).forEach(id => {
    positions[id].x -= minX;
  });

  return {
    positions,
    width: maxX - minX,
    height: maxY,
  };
}

function TreeEdge({ x1, y1, x2, y2, state }) {
  const edgeColor = state === 'found' ? 'var(--clr-found)'
    : state === 'active' ? 'var(--clr-active)'
    : state === 'visited' ? 'var(--clr-visited)'
    : 'var(--border-bright)';

  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={edgeColor}
      strokeWidth={2}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

function TreeNode({ id, val, x, y, state }) {
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const isHighlighted = state === 'active' || state === 'found';

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: isHighlighted ? 1.1 : 1, x, y }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <circle
        r={NODE_RADIUS}
        fill={s.bg}
        stroke={s.border}
        strokeWidth={2}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill={s.text}
        fontSize={13}
        fontFamily="'JetBrains Mono', monospace"
        fontWeight={600}
      >
        {val}
      </text>
    </motion.g>
  );
}

function CallStackPanel({ callStack = [] }) {
  if (callStack.length === 0) return null;

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-[10px] font-mono mb-1" style={{ color: 'var(--text-muted)' }}>Call Stack</span>
      <div className="flex flex-col-reverse gap-1">
        <AnimatePresence mode="popLayout">
          {callStack.map((frame, i) => (
            <motion.div
              key={`${frame}-${i}`}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="px-2 py-1 rounded text-[11px] font-mono"
              style={{
                backgroundColor: i === callStack.length - 1 ? 'var(--clr-active-bg)' : 'var(--bg-raised)',
                border: `1px solid ${i === callStack.length - 1 ? 'var(--clr-active)' : 'var(--border)'}`,
                color: i === callStack.length - 1 ? 'var(--clr-active)' : 'var(--text-secondary)',
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

export default function BSTArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { treeNodes = {}, callStack = [] } = dataStructure;

  const { positions, width, height } = useMemo(() => computeLayout(treeNodes), [treeNodes]);

  const padding = NODE_RADIUS + 10;
  const svgWidth = width + padding * 2;
  const svgHeight = height + padding * 2;

  // Build edges
  const edges = [];
  Object.entries(treeNodes).forEach(([id, node]) => {
    const parentPos = positions[id];
    if (!parentPos) return;
    [node.left, node.right].forEach(childId => {
      if (childId != null && positions[childId]) {
        const childPos = positions[childId];
        const childNode = treeNodes[childId];
        // Edge state: use child's state to color the edge leading to it
        const edgeState = childNode?.state || 'default';
        edges.push({
          key: `${id}-${childId}`,
          x1: parentPos.x + padding,
          y1: parentPos.y + padding + NODE_RADIUS,
          x2: childPos.x + padding,
          y2: childPos.y + padding - NODE_RADIUS,
          state: edgeState,
        });
      }
    });
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {/* Tree SVG */}
        <div className="flex-1 flex justify-center overflow-x-auto">
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="max-w-full"
          >
            {/* Edges */}
            {edges.map(e => (
              <TreeEdge key={e.key} {...e} />
            ))}

            {/* Nodes */}
            {Object.entries(treeNodes).map(([id, node]) => {
              const pos = positions[id];
              if (!pos) return null;
              return (
                <TreeNode
                  key={id}
                  id={id}
                  val={node.val}
                  x={pos.x + padding}
                  y={pos.y + padding}
                  state={node.state || 'default'}
                />
              );
            })}
          </svg>
        </div>

        {/* Call Stack */}
        {callStack.length > 0 && (
          <div className="flex-shrink-0">
            <CallStackPanel callStack={callStack} />
          </div>
        )}
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
