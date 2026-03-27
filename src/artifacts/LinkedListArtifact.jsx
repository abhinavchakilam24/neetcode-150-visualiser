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

const POINTER_LABEL_COLORS = {
  prev: 'var(--clr-eliminated)',
  curr: 'var(--clr-active)',
  next: 'var(--clr-pointer)',
  head: 'var(--clr-found)',
  tail: 'var(--clr-visited)',
  slow: 'var(--clr-pointer)',
  fast: 'var(--clr-active)',
};

const NODE_WIDTH = 56;
const NODE_GAP = 40;
const ARROW_LENGTH = NODE_GAP;

function getPointerLabelsForNode(nodeId, pointerAssignments) {
  if (!pointerAssignments) return [];
  return Object.entries(pointerAssignments)
    .filter(([, id]) => id === nodeId)
    .map(([name]) => ({
      name,
      color: POINTER_LABEL_COLORS[name] || 'var(--clr-pointer)',
    }));
}

function ListNode({ node, pointerLabels = [], nodeIndex }) {
  const s = STATE_STYLES[node.state] || STATE_STYLES.default;
  const isHighlighted = node.state === 'active' || node.state === 'found';

  return (
    <motion.div
      layout
      layoutId={`ll-node-${node.id}`}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex flex-col items-center"
      style={{ width: NODE_WIDTH }}
    >
      {/* Pointer labels above */}
      <div className="h-5 flex items-end justify-center gap-0.5 mb-1">
        <AnimatePresence mode="popLayout">
          {pointerLabels.map(p => (
            <motion.div
              key={p.name}
              layoutId={`ll-ptr-${p.name}`}
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

      {/* Node box */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="flex items-center rounded-xl text-sm font-mono font-bold overflow-hidden transition-all duration-200"
        style={{
          backgroundColor: s.bg,
          border: `2px solid ${s.border}`,
          color: s.text,
          boxShadow: s.shadow,
          transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
          height: 44,
        }}
      >
        {/* Value section */}
        <div className="flex items-center justify-center px-3" style={{ minWidth: 36 }}>
          {node.val}
        </div>
        {/* Next pointer section (small box) */}
        <div
          className="flex items-center justify-center h-full px-1.5"
          style={{
            borderLeft: `1px solid ${s.border}`,
            minWidth: 16,
            opacity: 0.5,
          }}
        >
          <span className="text-[8px]">{node.next !== null ? '.' : 'x'}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Arrow({ fromState, reversed }) {
  const color = reversed ? 'var(--clr-active)' : 'var(--text-muted)';

  return (
    <motion.div
      layout
      className="flex items-center justify-center"
      style={{ width: ARROW_LENGTH }}
    >
      <motion.svg
        width={ARROW_LENGTH}
        height="20"
        viewBox={`0 0 ${ARROW_LENGTH} 20`}
        style={{ overflow: 'visible' }}
      >
        <motion.line
          x1={reversed ? ARROW_LENGTH - 4 : 4}
          y1="10"
          x2={reversed ? 8 : ARROW_LENGTH - 8}
          y2="10"
          stroke={color}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Arrowhead */}
        {reversed ? (
          <motion.polygon
            points="0,10 8,6 8,14"
            fill={color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          />
        ) : (
          <motion.polygon
            points={`${ARROW_LENGTH},10 ${ARROW_LENGTH - 8},6 ${ARROW_LENGTH - 8},14`}
            fill={color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          />
        )}
      </motion.svg>
    </motion.div>
  );
}

function NullTerminator() {
  return (
    <div className="flex items-center justify-center" style={{ width: 28 }}>
      <div className="flex flex-col items-center">
        <div className="h-5 mb-1" />
        <div
          className="w-7 h-7 flex items-center justify-center rounded text-[10px] font-mono font-bold"
          style={{ color: 'var(--text-muted)', border: '1.5px dashed var(--border)' }}
        >
          null
        </div>
      </div>
    </div>
  );
}

export default function LinkedListArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { nodes = [], pointerAssignments = {}, reversed = {} } = dataStructure;
  // Show pointer legend only when the scenario uses named pointers (slow/fast, prev/curr etc.)
  const showPointerLegend = Object.keys(pointerAssignments).length > 0 &&
    (input?._scenarioUsesPointerAssignments === true || Object.keys(pointerAssignments).length > 0);

  // Build a map from node id to node for ordering
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  // Find head node (the one not pointed to by any other node's next)
  const pointedTo = new Set(nodes.map(n => n.next).filter(n => n !== null && n !== undefined));
  let headId = null;
  for (const n of nodes) {
    if (!pointedTo.has(n.id)) {
      headId = n.id;
      break;
    }
  }
  // Fallback: use first node
  if (headId === null && nodes.length > 0) {
    headId = nodes[0].id;
  }

  // Traverse linked order from head
  const orderedNodes = [];
  const visitedIds = new Set();
  let currentId = headId;
  while (currentId !== null && currentId !== undefined && !visitedIds.has(currentId)) {
    visitedIds.add(currentId);
    const node = nodeMap[currentId];
    if (!node) break;
    orderedNodes.push(node);
    currentId = node.next;
  }

  // Add any nodes not reachable from head (disconnected)
  nodes.forEach(n => {
    if (!visitedIds.has(n.id)) {
      orderedNodes.push(n);
    }
  });

  // Check for cycle (last node's next points to a visited node)
  const lastNode = orderedNodes[orderedNodes.length - 1];
  const hasCycle = lastNode && lastNode.next !== null && lastNode.next !== undefined && visitedIds.has(lastNode.next);

  return (
    <div className="space-y-5">
      {/* List label */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Linked List</span>
        {hasCycle && (
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{ backgroundColor: 'var(--clr-active-bg)', color: 'var(--clr-active)', border: '1px solid var(--clr-active)' }}
          >
            cycle detected
          </span>
        )}
      </div>

      {/* Nodes and arrows */}
      <div className="flex items-center justify-center flex-wrap overflow-x-auto py-2">
        {orderedNodes.map((node, idx) => {
          const ptrLabels = getPointerLabelsForNode(node.id, pointerAssignments);
          const isLast = idx === orderedNodes.length - 1;
          // Check if the arrow from this node to next is reversed
          const isReversed = reversed && reversed[node.id];

          return (
            <div key={node.id} className="flex items-center">
              <ListNode
                node={node}
                pointerLabels={ptrLabels}
                nodeIndex={idx}
              />
              {/* Arrow to next */}
              {!isLast && (
                <Arrow fromState={node.state} reversed={isReversed} />
              )}
              {/* Null terminator at end (only if no cycle) */}
              {isLast && !hasCycle && (
                <>
                  <Arrow fromState={node.state} reversed={false} />
                  <NullTerminator />
                </>
              )}
            </div>
          );
        })}

        {/* Cycle arrow back (visual indicator) */}
        {hasCycle && lastNode && (
          <div className="flex items-center ml-1">
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded"
              style={{ color: 'var(--clr-active)', border: '1px dashed var(--clr-active)' }}
            >
              -&gt; node {lastNode.next}
            </span>
          </div>
        )}
      </div>

      {/* Pointer assignments legend */}
      {showPointerLegend && (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {Object.entries(pointerAssignments).map(([name, nodeId]) => {
            const color = POINTER_LABEL_COLORS[name] || 'var(--clr-pointer)';
            const node = nodeMap[nodeId];
            return (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-md"
                style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)' }}
              >
                <span style={{ color }} className="font-bold">{name}</span>
                <span style={{ color: 'var(--text-muted)' }}>=</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {nodeId === null || nodeId === undefined ? 'null' : `node(${node ? node.val : nodeId})`}
                </span>
              </span>
            );
          })}
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
