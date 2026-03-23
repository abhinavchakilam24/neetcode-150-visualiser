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

function layoutTrie(nodes) {
  if (!nodes || nodes.length === 0) return { positioned: [], edges: [] };

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  // Find root (node with no parent)
  const childIds = new Set(nodes.flatMap(n => n.children || []));
  const root = nodes.find(n => !childIds.has(n.id)) || nodes[0];

  const positioned = [];
  const edges = [];
  const levelWidths = {};

  // BFS to assign levels
  const levels = {};
  const queue = [{ id: root.id, level: 0 }];
  const visited = new Set();

  while (queue.length > 0) {
    const { id, level } = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    levels[id] = level;
    if (!levelWidths[level]) levelWidths[level] = 0;
    levelWidths[level]++;

    const node = nodeMap[id];
    if (node?.children) {
      node.children.forEach(childId => {
        if (!visited.has(childId)) {
          queue.push({ id: childId, level: level + 1 });
        }
      });
    }
  }

  // Assign x positions per level
  const levelCounters = {};
  const maxLevel = Math.max(...Object.values(levels), 0);
  const totalWidth = Math.max(280, (Math.max(...Object.values(levelWidths), 1)) * 60);

  // DFS to assign positions in tree order
  function assignPositions(id, depth) {
    if (!nodeMap[id]) return;
    if (!levelCounters[depth]) levelCounters[depth] = 0;

    const node = nodeMap[id];
    const children = node.children || [];

    // Position children first for centering
    const childPositions = [];
    children.forEach(childId => {
      assignPositions(childId, depth + 1);
      const cp = positioned.find(p => p.id === childId);
      if (cp) childPositions.push(cp);
    });

    let x;
    if (childPositions.length > 0) {
      x = childPositions.reduce((sum, cp) => sum + cp.x, 0) / childPositions.length;
    } else {
      const count = levelWidths[depth] || 1;
      const spacing = totalWidth / (count + 1);
      levelCounters[depth]++;
      x = spacing * levelCounters[depth];
    }

    const y = depth * 60 + 28;
    positioned.push({ ...node, x, y, depth });

    // Create edges
    children.forEach(childId => {
      const child = positioned.find(p => p.id === childId);
      if (child) {
        const childNode = nodeMap[childId];
        edges.push({
          key: `${id}-${childId}`,
          x1: x, y1: y + 16,
          x2: child.x, y2: child.y - 16,
          char: childNode?.char || '',
          state: childNode?.state || 'default',
        });
      }
    });
  }

  assignPositions(root.id, 0);

  return { positioned, edges, width: totalWidth, height: (maxLevel + 1) * 60 + 56 };
}

function TrieNode({ node }) {
  const s = STATE_STYLES[node.state] || STATE_STYLES.default;
  const isHighlighted = node.state === 'active' || node.state === 'found';

  return (
    <motion.g
      layoutId={`trie-node-${node.id}`}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: isHighlighted ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <circle
        cx={node.x}
        cy={node.y}
        r={14}
        fill={s.bg}
        stroke={s.border}
        strokeWidth={2}
        style={{ filter: isHighlighted ? 'drop-shadow(0 2px 6px rgba(217,119,6,0.3))' : 'none' }}
      />
      {/* Display char or root marker */}
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        fill={s.text}
        fontSize="11"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="bold"
      >
        {node.char || (node.depth === 0 ? '*' : '')}
      </text>
      {/* Terminal marker */}
      {node.isEnd && (
        <circle
          cx={node.x + 12}
          cy={node.y - 12}
          r={3.5}
          fill="var(--clr-found)"
          stroke="var(--clr-found)"
          strokeWidth={1}
        />
      )}
    </motion.g>
  );
}

function TrieEdge({ edge }) {
  const isActive = edge.state === 'active' || edge.state === 'found';
  const color = isActive ? 'var(--clr-active)' : 'var(--border-bright)';

  const midX = (edge.x1 + edge.x2) / 2;
  const midY = (edge.y1 + edge.y2) / 2;

  return (
    <g>
      <motion.line
        x1={edge.x1} y1={edge.y1}
        x2={edge.x2} y2={edge.y2}
        stroke={color}
        strokeWidth={isActive ? 2 : 1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3 }}
      />
      {edge.char && (
        <text
          x={midX + 8}
          y={midY}
          textAnchor="middle"
          dominantBaseline="central"
          fill={isActive ? 'var(--clr-active)' : 'var(--text-muted)'}
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="bold"
        >
          {edge.char}
        </text>
      )}
    </g>
  );
}

export default function TrieArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { trieNodes = [] } = dataStructure;

  const { positioned, edges, width, height } = useMemo(
    () => layoutTrie(trieNodes),
    [trieNodes]
  );

  const svgWidth = width || 320;
  const svgHeight = height || 120;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Trie</span>
        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
          (dot = end of word)
        </span>
      </div>

      {/* Tree */}
      {positioned.length > 0 ? (
        <div className="flex justify-center overflow-x-auto">
          <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            {/* Edges first */}
            {edges.map(edge => (
              <TrieEdge key={edge.key} edge={edge} />
            ))}

            {/* Nodes */}
            {positioned.map(node => (
              <TrieNode key={node.id} node={node} />
            ))}
          </svg>
        </div>
      ) : (
        <div className="flex items-center justify-center h-20 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          Empty trie
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
