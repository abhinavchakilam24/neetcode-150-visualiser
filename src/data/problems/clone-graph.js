export const cloneGraph = {
  id: 82,
  slug: "clone-graph",
  title: "Clone Graph",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 82,
  artifactType: "GraphDFS",
  companies: ["Meta", "Amazon", "Google", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/clone-graph/",

  pattern: "DFS with HashMap for Node Cloning",
  patternExplanation: `When cloning a graph, use DFS to traverse the original while maintaining
    a HashMap from original node to cloned node. This prevents infinite loops on cycles and
    ensures each node is cloned exactly once.`,

  intuition: {
    coreInsight: `The challenge isn't traversing — it's avoiding duplication. If node A points to
      B and B points back to A, naive recursion loops forever. The solution: a HashMap mapping
      each original node to its clone. Before recursing into a neighbor, check if it's already
      been cloned. If yes, return the existing clone. If no, create a new clone, store the
      mapping, then recurse on its neighbors.`,

    mentalModel: `Imagine photocopying a friendship network. You start with one person, make a
      copy of their contact card, and then visit each of their friends. For each friend, you
      check: "Have I already copied this person?" If yes, just link to the existing copy. If
      no, copy them and continue. The "already copied" registry (HashMap) prevents you from
      copying the same person twice and going in circles.`,

    whyNaiveFails: `Without the visited/cloned HashMap, DFS would revisit nodes in cycles
      indefinitely. Even in acyclic graphs, shared neighbors would be cloned multiple times,
      creating incorrect duplicates. The HashMap serves dual purpose: cycle detection AND
      ensuring each node is cloned exactly once.`,

    keyObservation: `The HashMap entry is created BEFORE recursing into neighbors. This is
      critical: if we recurse first and create the entry after, a cycle would cause infinite
      recursion before the entry is ever stored. Create the clone, store the mapping, THEN
      recursively clone neighbors.`,
  },

  problem: `Given a reference of a node in a connected undirected graph, return a deep copy
    (clone) of the graph. Each node in the graph contains a value (int) and a list
    (List[Node]) of its neighbors. The graph is represented in the test case using an
    adjacency list. The given node will always be the first node with val = 1.`,

  examples: [
    {
      input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
      output: "[[2,4],[1,3],[2,4],[1,3]]",
      explanation: "4 nodes. Node 1 connects to 2,4. Node 2 connects to 1,3. Node 3 connects to 2,4. Node 4 connects to 1,3.",
    },
    {
      input: "adjList = [[]]",
      output: "[[]]",
      explanation: "Single node with no neighbors.",
    },
  ],

  constraints: [
    "The number of nodes in the graph is in the range [0, 100]",
    "1 <= Node.val <= 100",
    "Node.val is unique for each node",
    "There are no repeated edges and no self-loops",
    "The Graph is connected and all nodes can be visited starting from the given node",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "DFS with HashMap",
      tier: "optimal",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      idea: `DFS from the starting node. Maintain a HashMap mapping original nodes to their clones.
        For each node: create its clone, store the mapping, then recursively clone all neighbors
        and add them to the clone's neighbor list.`,

      javaCode: `public Node cloneGraph(Node node) {
    if (node == null) return null;
    Map<Node, Node> map = new HashMap<>();
    return dfs(node, map);
}

private Node dfs(Node node, Map<Node, Node> map) {
    if (map.containsKey(node)) return map.get(node);

    Node clone = new Node(node.val);
    map.put(node, clone);

    for (Node neighbor : node.neighbors) {
        clone.neighbors.add(dfs(neighbor, map));
    }

    return clone;
}`,

      cppCode: `Node* cloneGraph(Node* node) {
    if (!node) return nullptr;
    unordered_map<Node*, Node*> mp;
    return dfs(node, mp);
}

Node* dfs(Node* node, unordered_map<Node*, Node*>& mp) {
    if (mp.count(node)) return mp[node];

    Node* clone = new Node(node->val);
    mp[node] = clone;

    for (Node* neighbor : node->neighbors) {
        clone->neighbors.push_back(dfs(neighbor, mp));
    }

    return clone;
}`,

      pythonCode: `def cloneGraph(node: 'Node') -> 'Node':
    if not node:
        return None
    cloned = {}

    def dfs(node):
        if node in cloned:
            return cloned[node]

        clone = Node(node.val)
        cloned[node] = clone

        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)`,

      lineAnnotations: {
        1: "Entry point — handle null input",
        3: "HashMap: original node → cloned node",
        4: "Start DFS from the given node",
        7: "DFS helper — clones one node and its subgraph",
        8: "Already cloned? Return existing clone (prevents cycles)",
        10: "Create a new clone with same value",
        11: "Store mapping BEFORE recursing — critical for cycles",
        13: "Recursively clone each neighbor",
        14: "Add cloned neighbor to clone's neighbor list",
        16: "Return the clone",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "4-node cycle graph: 1-2-3-4-1",
          input: { adjList: [[2,4],[1,3],[2,4],[1,3]] },
          expectedOutput: "[[2,4],[1,3],[2,4],[1,3]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3, 4],
              shortLabel: "Start cloneGraph(node 1)",
              explanation: "Begin with node 1. Create an empty HashMap to track original → clone mappings. Call dfs(node 1).",
              variables: { currentNode: 1, map: "{}" },
              dataStructure: {
                graphNodes: {
                  1: { state: "active", x: 100, y: 100 },
                  2: { state: "default", x: 250, y: 100 },
                  3: { state: "default", x: 250, y: 250 },
                  4: { state: "default", x: 100, y: 250 },
                },
                graphEdges: [
                  { from: "1", to: "2", state: "default" },
                  { from: "2", to: "3", state: "default" },
                  { from: "3", to: "4", state: "default" },
                  { from: "4", to: "1", state: "default" },
                ],
                dfsStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 10, 11],
              shortLabel: "Clone node 1, map: {1→1'}",
              explanation: "Node 1 not in map. Create clone 1'. Store mapping 1→1'. Now recurse on node 1's neighbors: [2, 4].",
              variables: { currentNode: 1, map: "{1→1'}", cloneVal: 1 },
              dataStructure: {
                graphNodes: {
                  1: { state: "active", x: 100, y: 100 },
                  2: { state: "default", x: 250, y: 100 },
                  3: { state: "default", x: 250, y: 250 },
                  4: { state: "default", x: 100, y: 250 },
                },
                graphEdges: [
                  { from: "1", to: "2", state: "default" },
                  { from: "2", to: "3", state: "default" },
                  { from: "3", to: "4", state: "default" },
                  { from: "4", to: "1", state: "default" },
                ],
                dfsStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [13, 14, 10, 11],
              shortLabel: "Recurse → clone node 2, map: {1→1', 2→2'}",
              explanation: "Recurse dfs(2). Node 2 not in map. Create clone 2', store mapping 2→2'. Now recurse on node 2's neighbors: [1, 3].",
              variables: { currentNode: 2, map: "{1→1', 2→2'}", cloneVal: 2 },
              dataStructure: {
                graphNodes: {
                  1: { state: "visited", x: 100, y: 100 },
                  2: { state: "active", x: 250, y: 100 },
                  3: { state: "default", x: 250, y: 250 },
                  4: { state: "default", x: 100, y: 250 },
                },
                graphEdges: [
                  { from: "1", to: "2", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                  { from: "3", to: "4", state: "default" },
                  { from: "4", to: "1", state: "default" },
                ],
                dfsStack: ["dfs(1)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8],
              shortLabel: "Neighbor 1 already cloned — return 1'",
              explanation: "dfs(2) recurses into neighbor 1. But node 1 IS in the map — return existing clone 1'. This prevents infinite recursion on the cycle 1→2→1→2→...",
              variables: { currentNode: 1, map: "{1→1', 2→2'}", alreadyCloned: true },
              dataStructure: {
                graphNodes: {
                  1: { state: "found", x: 100, y: 100 },
                  2: { state: "active", x: 250, y: 100 },
                  3: { state: "default", x: 250, y: 250 },
                  4: { state: "default", x: 100, y: 250 },
                },
                graphEdges: [
                  { from: "1", to: "2", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                  { from: "3", to: "4", state: "default" },
                  { from: "4", to: "1", state: "default" },
                ],
                dfsStack: ["dfs(1)", "dfs(2)", "dfs(1)→cached"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13, 14, 10, 11],
              shortLabel: "Recurse → clone node 3, map has 3 entries",
              explanation: "dfs(2) recurses into neighbor 3. Node 3 not in map. Create clone 3', store mapping. Recurse on neighbors [2, 4].",
              variables: { currentNode: 3, map: "{1→1', 2→2', 3→3'}", cloneVal: 3 },
              dataStructure: {
                graphNodes: {
                  1: { state: "visited", x: 100, y: 100 },
                  2: { state: "visited", x: 250, y: 100 },
                  3: { state: "active", x: 250, y: 250 },
                  4: { state: "default", x: 100, y: 250 },
                },
                graphEdges: [
                  { from: "1", to: "2", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                  { from: "3", to: "4", state: "default" },
                  { from: "4", to: "1", state: "default" },
                ],
                dfsStack: ["dfs(1)", "dfs(2)", "dfs(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [8, 10, 11],
              shortLabel: "Node 2 cached. Clone node 4, map complete",
              explanation: "dfs(3): neighbor 2 is already in map — return cached clone. Neighbor 4 is new — create clone 4', store mapping. dfs(4): neighbors 1 and 3 both cached.",
              variables: { currentNode: 4, map: "{1→1', 2→2', 3→3', 4→4'}", cloneVal: 4 },
              dataStructure: {
                graphNodes: {
                  1: { state: "visited", x: 100, y: 100 },
                  2: { state: "visited", x: 250, y: 100 },
                  3: { state: "visited", x: 250, y: 250 },
                  4: { state: "active", x: 100, y: 250 },
                },
                graphEdges: [
                  { from: "1", to: "2", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                  { from: "3", to: "4", state: "traversed" },
                  { from: "4", to: "1", state: "traversed" },
                ],
                dfsStack: ["dfs(1)", "dfs(2)", "dfs(3)", "dfs(4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [16],
              shortLabel: "All nodes cloned — recursion unwinds",
              explanation: "dfs(4) returns clone 4'. dfs(3) adds 4' to 3'.neighbors, returns 3'. dfs(2) adds 3' to 2'.neighbors, returns 2'. dfs(1) adds 2' to 1'.neighbors. Now process neighbor 4 of node 1.",
              variables: { map: "{1→1', 2→2', 3→3', 4→4'}" },
              dataStructure: {
                graphNodes: {
                  1: { state: "visited", x: 100, y: 100 },
                  2: { state: "visited", x: 250, y: 100 },
                  3: { state: "visited", x: 250, y: 250 },
                  4: { state: "visited", x: 100, y: 250 },
                },
                graphEdges: [
                  { from: "1", to: "2", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                  { from: "3", to: "4", state: "traversed" },
                  { from: "4", to: "1", state: "traversed" },
                ],
                dfsStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [16],
              shortLabel: "Return cloned graph — deep copy complete",
              explanation: "Node 1's other neighbor (4) is already cloned — add cached 4' to 1'.neighbors. Return clone 1'. The entire graph has been deep-copied: every node cloned exactly once, all edges preserved.",
              variables: { answer: "Deep copy of graph", nodesCloned: 4 },
              dataStructure: {
                graphNodes: {
                  1: { state: "found", x: 100, y: 100 },
                  2: { state: "found", x: 250, y: 100 },
                  3: { state: "found", x: 250, y: 250 },
                  4: { state: "found", x: 100, y: 250 },
                },
                graphEdges: [
                  { from: "1", to: "2", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                  { from: "3", to: "4", state: "traversed" },
                  { from: "4", to: "1", state: "traversed" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Node",
          description: "Graph with just one node and no edges",
          input: { adjList: [[]] },
          expectedOutput: "[[]]",
          commonMistake: "Forgetting to handle the case where the node has no neighbors. The clone should still be created — just with an empty neighbor list.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3, 4],
              shortLabel: "Start with single node",
              explanation: "Node 1 has no neighbors. Create empty HashMap. Call dfs(node 1).",
              variables: { currentNode: 1, map: "{}" },
              dataStructure: {
                graphNodes: {
                  1: { state: "active", x: 175, y: 175 },
                },
                graphEdges: [],
                dfsStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 10, 11],
              shortLabel: "Clone node 1 — no neighbors to recurse",
              explanation: "Node 1 not in map. Create clone 1'. Store mapping. Node 1 has no neighbors, so the for-loop doesn't execute.",
              variables: { currentNode: 1, map: "{1→1'}", neighbors: "[]" },
              dataStructure: {
                graphNodes: {
                  1: { state: "active", x: 175, y: 175 },
                },
                graphEdges: [],
                dfsStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16],
              shortLabel: "Return clone 1' — done",
              explanation: "Return clone 1'. Deep copy complete — single node with empty neighbor list.",
              variables: { answer: "Clone of node 1", nodesCloned: 1 },
              dataStructure: {
                graphNodes: {
                  1: { state: "found", x: 175, y: 175 },
                },
                graphEdges: [],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ adjList }) {
        const steps = [];
        if (!adjList || adjList.length === 0) {
          steps.push({
            stepId: 0, lineNumbers: [1, 2],
            shortLabel: "Null input — return null",
            explanation: "Input is null or empty. Return null.",
            variables: { answer: "null" },
            dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const n = adjList.length;
        const graphNodes = {};
        const graphEdges = [];
        const edgeSet = new Set();

        for (let i = 0; i < n; i++) {
          const angle = (2 * Math.PI * i) / n;
          graphNodes[i + 1] = {
            state: "default",
            x: 175 + 100 * Math.cos(angle),
            y: 175 + 100 * Math.sin(angle),
          };
        }

        for (let i = 0; i < n; i++) {
          for (const neighbor of adjList[i]) {
            const key = Math.min(i + 1, neighbor) + "-" + Math.max(i + 1, neighbor);
            if (!edgeSet.has(key)) {
              edgeSet.add(key);
              graphEdges.push({ from: String(i + 1), to: String(neighbor), state: "default" });
            }
          }
        }

        const cloned = new Set();
        const dfsStack = [];

        steps.push({
          stepId: 0, lineNumbers: [1, 3, 4],
          shortLabel: "Start cloneGraph",
          explanation: `Graph has ${n} nodes. Create empty HashMap. Begin DFS from node 1.`,
          variables: { currentNode: 1, map: "{}", nodesCloned: 0 },
          dataStructure: {
            graphNodes: JSON.parse(JSON.stringify(graphNodes)),
            graphEdges: graphEdges.map(e => ({...e})),
            dfsStack: ["dfs(1)"],
          },
          delta: {}, isAnswer: false,
        });

        // Simulate DFS
        const dfsOrder = [];
        const visited = new Set();
        function dfs(node) {
          if (visited.has(node)) return;
          visited.add(node);
          dfsOrder.push(node);
          for (const neighbor of adjList[node - 1]) {
            dfs(neighbor);
          }
        }
        dfs(1);

        let mapStr = "{";
        for (let idx = 0; idx < dfsOrder.length; idx++) {
          const node = dfsOrder[idx];
          cloned.add(node);
          mapStr = "{" + [...cloned].map(n => `${n}→${n}'`).join(", ") + "}";

          const gn = JSON.parse(JSON.stringify(graphNodes));
          for (const c of cloned) gn[c].state = "visited";
          gn[node].state = "active";

          const ge = graphEdges.map(e => {
            const f = parseInt(e.from), t = parseInt(e.to);
            if (cloned.has(f) && cloned.has(t)) return {...e, state: "traversed"};
            return {...e};
          });

          steps.push({
            stepId: steps.length,
            lineNumbers: [10, 11],
            shortLabel: `Clone node ${node}, map: ${mapStr}`,
            explanation: `Node ${node} not in map. Create clone ${node}'. Store mapping. Recurse on neighbors.`,
            variables: { currentNode: node, map: mapStr, nodesCloned: cloned.size },
            dataStructure: {
              graphNodes: gn,
              graphEdges: ge,
              dfsStack: dfsOrder.slice(0, idx + 1).map(n => `dfs(${n})`),
            },
            delta: {}, isAnswer: false,
          });
        }

        // Final step
        const gnFinal = JSON.parse(JSON.stringify(graphNodes));
        for (const key in gnFinal) gnFinal[key].state = "found";
        const geFinal = graphEdges.map(e => ({...e, state: "traversed"}));

        steps.push({
          stepId: steps.length,
          lineNumbers: [16],
          shortLabel: "Return cloned graph",
          explanation: `All ${n} nodes cloned. Every edge preserved. Return deep copy.`,
          variables: { answer: "Deep copy complete", nodesCloned: n },
          dataStructure: {
            graphNodes: gnFinal,
            graphEdges: geFinal,
            dfsStack: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: null,
    optimal: { time: "O(V + E)", space: "O(V)", explanation: "Visit every node once, traverse every edge; HashMap stores V entries", tradeoff: "HashMap prevents infinite loops and ensures O(1) clone lookup" },
  },

  interviewTips: [
    "Clarify: is the graph connected? If yes, single DFS/BFS from any node reaches all nodes.",
    "Emphasize the HashMap serves two purposes: cycle prevention AND deduplication.",
    "Store the clone in the map BEFORE recursing — this is the key to handling cycles.",
    "BFS works equally well — mention both approaches.",
    "Edge case: null input should return null. Single node with no neighbors should return a clone with empty neighbor list.",
  ],

  relatedProblems: ["number-of-islands", "course-schedule", "connected-components"],
};
