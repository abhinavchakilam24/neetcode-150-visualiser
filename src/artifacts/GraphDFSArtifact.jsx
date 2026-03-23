import { motion, AnimatePresence } from 'framer-motion';

const STATE_STYLES = {
  active:     { bg: 'var(--clr-active-bg)', border: 'var(--clr-active)', text: 'var(--clr-active)' },
  found:      { bg: 'var(--clr-found-bg)',  border: 'var(--clr-found)',  text: 'var(--clr-found)' },
  visited:    { bg: 'var(--clr-visited-bg)', border: 'var(--clr-visited)', text: 'var(--clr-visited)' },
  eliminated: { bg: 'var(--clr-elim-bg)',   border: 'var(--clr-eliminated)', text: 'var(--clr-eliminated)' },
  queued:     { bg: 'var(--clr-queued-bg)', border: 'var(--clr-queued)', text: 'var(--clr-queued)' },
  default:    { bg: 'var(--clr-default-bg)', border: 'var(--clr-default-border)', text: 'var(--text-primary)' },
};

const EDGE_STYLES = {
  traversed: { stroke: 'var(--clr-found)', width: 2.5 },
  active:    { stroke: 'var(--clr-active)', width: 2.5 },
  back:      { stroke: 'var(--clr-eliminated)', width: 2, dash: '4 3' },
  default:   { stroke: 'var(--border-bright)', width: 1.5 },
};

const NODE_RADIUS = 22;

function GraphEdge({ x1, y1, x2, y2, state, directed }) {
  const es = EDGE_STYLES[state] || EDGE_STYLES.default;

  // Shorten the line so it doesn't overlap the node circles
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const offsetX = (dx / dist) * NODE_RADIUS;
  const offsetY = (dy / dist) * NODE_RADIUS;

  const sx = x1 + offsetX;
  const sy = y1 + offsetY;
  const ex = x2 - offsetX;
  const ey = y2 - offsetY;

  return (
    <g>
      <motion.line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke={es.stroke}
        strokeWidth={es.width}
        strokeDasharray={es.dash || 'none'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {directed && (
        <ArrowHead x1={sx} y1={sy} x2={ex} y2={ey} color={es.stroke} />
      )}
    </g>
  );
}

function ArrowHead({ x1, y1, x2, y2, color }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const p1x = x2 - size * Math.cos(angle - Math.PI / 6);
  const p1y = y2 - size * Math.sin(angle - Math.PI / 6);
  const p2x = x2 - size * Math.cos(angle + Math.PI / 6);
  const p2y = y2 - size * Math.sin(angle + Math.PI / 6);

  return (
    <polygon
      points={`${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}`}
      fill={color}
    />
  );
}

function GraphNode({ id, x, y, state }) {
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
        {id}
      </text>
    </motion.g>
  );
}

function DFSStackPanel({ stack = [] }) {
  if (stack.length === 0) return null;

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-[10px] font-mono mb-1" style={{ color: 'var(--text-muted)' }}>DFS Stack</span>
      <div className="flex flex-col-reverse gap-1">
        <AnimatePresence mode="popLayout">
          {stack.map((item, i) => (
            <motion.div
              key={`${item}-${i}`}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="px-2 py-1 rounded text-[11px] font-mono font-bold"
              style={{
                backgroundColor: i === stack.length - 1 ? 'var(--clr-active-bg)' : 'var(--bg-raised)',
                border: `1px solid ${i === stack.length - 1 ? 'var(--clr-active)' : 'var(--border)'}`,
                color: i === stack.length - 1 ? 'var(--clr-active)' : 'var(--text-secondary)',
              }}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function GraphDFSArtifact({ step, prevStep, animating, input }) {
  if (!step) {
    return (
      <div className="flex items-center justify-center h-40 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
        Press &#9654; or &rarr; to start
      </div>
    );
  }

  const { dataStructure = {} } = step;
  const { graphNodes = {}, graphEdges = [], dfsStack = [] } = dataStructure;

  // Compute SVG bounds from node positions
  const nodeEntries = Object.entries(graphNodes);
  const padding = NODE_RADIUS + 20;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  nodeEntries.forEach(([, node]) => {
    if (node.x < minX) minX = node.x;
    if (node.y < minY) minY = node.y;
    if (node.x > maxX) maxX = node.x;
    if (node.y > maxY) maxY = node.y;
  });

  if (!isFinite(minX)) { minX = 0; minY = 0; maxX = 200; maxY = 200; }

  const svgWidth = maxX - minX + padding * 2;
  const svgHeight = maxY - minY + padding * 2;
  const offsetX = -minX + padding;
  const offsetY = -minY + padding;

  // Determine if graph is directed (check for any edge with explicit directed flag,
  // or default to directed for typical algorithm problems)
  const directed = graphEdges.some(e => e.directed !== false);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {/* Graph SVG */}
        <div className="flex-1 flex justify-center overflow-x-auto">
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="max-w-full"
          >
            {/* Edges */}
            {graphEdges.map((edge, i) => {
              const fromNode = graphNodes[edge.from];
              const toNode = graphNodes[edge.to];
              if (!fromNode || !toNode) return null;
              return (
                <GraphEdge
                  key={`${edge.from}-${edge.to}-${i}`}
                  x1={fromNode.x + offsetX}
                  y1={fromNode.y + offsetY}
                  x2={toNode.x + offsetX}
                  y2={toNode.y + offsetY}
                  state={edge.state || 'default'}
                  directed={directed}
                />
              );
            })}

            {/* Nodes */}
            {nodeEntries.map(([id, node]) => (
              <GraphNode
                key={id}
                id={id}
                x={node.x + offsetX}
                y={node.y + offsetY}
                state={node.state || 'default'}
              />
            ))}
          </svg>
        </div>

        {/* DFS Stack */}
        {dfsStack.length > 0 && (
          <div className="flex-shrink-0">
            <DFSStackPanel stack={dfsStack} />
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
