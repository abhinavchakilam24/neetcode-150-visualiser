export const connectedComponents = {
  id: 90,
  slug: "connected-components",
  title: "Number of Connected Components in an Undirected Graph",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 90,
  artifactType: "GraphDFS",
  companies: ["Amazon", "Google", "Meta", "LinkedIn", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",

  pattern: "DFS/BFS Graph Traversal or Union-Find",
  patternExplanation: `Count connected components by either DFS/BFS from unvisited nodes (each traversal = one component)
    or using Union-Find to merge connected nodes and count distinct roots.`,

  intuition: {
    coreInsight: `A connected component is a group of nodes where every node can reach every other node through
      some path. To count them, start DFS from any unvisited node — everything you visit is one component.
      Repeat until all nodes are visited. The number of DFS calls equals the number of components.`,

    mentalModel: `Imagine islands in an ocean, connected by bridges. You parachute onto an unvisited island,
      walk across every bridge you can find, painting each island red as you go. When you can't reach any
      more islands, you've explored one connected component. Fly to the next unpainted island and repeat.
      The number of parachute drops equals the number of connected components.`,

    whyNaiveFails: `Checking every pair of nodes for connectivity would be O(n²) per pair (path finding),
      leading to O(n⁴) overall. DFS visits each node and edge once — O(n + e). Union-Find achieves
      nearly the same with O(α(n)) amortized per operation.`,

    keyObservation: `Each DFS/BFS from an unvisited node discovers exactly one complete connected component.
      The number of times we initiate a new traversal equals the number of components. Alternatively,
      Union-Find's count of distinct parents gives the same answer.`,
  },

  problem: `You have a graph of n nodes. You are given an integer n and an array edges where
    edges[i] = [ai, bi] indicates there is an edge between ai and bi. Return the number of
    connected components in the graph.`,

  examples: [
    { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2", explanation: "Component 1: {0,1,2}, Component 2: {3,4}" },
    { input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]", output: "1", explanation: "All nodes connected" },
  ],

  constraints: [
    "1 <= n <= 2000",
    "1 <= edges.length <= 5000",
    "edges[i].length == 2",
    "0 <= ai <= bi < n",
    "There are no repeated edges.",
  ],

  approaches: {
    brute: {
      label: "DFS",
      tier: "brute",
      timeComplexity: "O(n + e)",
      spaceComplexity: "O(n + e)",
      idea: "Build adjacency list. For each unvisited node, run DFS to mark all reachable nodes. Count the number of DFS calls.",

      javaCode: `public int countComponents(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) {
        adj.get(e[0]).add(e[1]);
        adj.get(e[1]).add(e[0]);
    }
    boolean[] visited = new boolean[n];
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, adj, visited);
            count++;
        }
    }
    return count;
}

private void dfs(int node, List<List<Integer>> adj, boolean[] visited) {
    visited[node] = true;
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}`,

      cppCode: `int countComponents(int n, vector<vector<int>>& edges) {
    vector<vector<int>> adj(n);
    for (auto& e : edges) {
        adj[e[0]].push_back(e[1]);
        adj[e[1]].push_back(e[0]);
    }
    vector<bool> visited(n, false);
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, adj, visited);
            count++;
        }
    }
    return count;
}

void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}`,

      pythonCode: `def countComponents(n: int, edges: List[List[int]]) -> int:
    adj = [[] for _ in range(n)]
    for a, b in edges:
        adj[a].append(b)
        adj[b].append(a)

    visited = set()
    count = 0

    def dfs(node):
        visited.add(node)
        for neighbor in adj[node]:
            if neighbor not in visited:
                dfs(neighbor)

    for i in range(n):
        if i not in visited:
            dfs(i)
            count += 1

    return count`,

      lineAnnotations: {
        1: "Build adjacency list from edge list",
        7: "Track which nodes have been visited",
        8: "Count of connected components",
        10: "If node unvisited, it's a new component",
        11: "DFS marks all reachable nodes as visited",
        12: "Increment component count",
        17: "DFS: mark current node visited",
        19: "Visit all unvisited neighbors recursively",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Two Components",
          description: "5 nodes, two connected components",
          input: { n: 5, edges: [[0,1],[1,2],[3,4]] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Build adjacency list",
              explanation: "Build graph: 0↔1, 1↔2, 3↔4. Nodes 0,1,2 form one group; nodes 3,4 form another.",
              variables: { n: 5, count: 0, visited: "{}" },
              dataStructure: {
                graphNodes: { 0: { state: "default" }, 1: { state: "default" }, 2: { state: "default" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "default" }, { from: "1", to: "2", state: "default" }, { from: "3", to: "4", state: "default" }],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11],
              shortLabel: "Node 0 unvisited → DFS",
              explanation: "Node 0 not visited. Start DFS — this begins component #1.",
              variables: { i: 0, count: 0, visited: "{}" },
              dataStructure: {
                graphNodes: { 0: { state: "active" }, 1: { state: "default" }, 2: { state: "default" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "default" }, { from: "1", to: "2", state: "default" }, { from: "3", to: "4", state: "default" }],
                dfsStack: ["dfs(0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [17, 19],
              shortLabel: "DFS(0) → visit 1",
              explanation: "Mark 0 as visited. Neighbor 1 is unvisited — DFS to 1.",
              variables: { node: 0, neighbor: 1, visited: "{0}" },
              dataStructure: {
                graphNodes: { 0: { state: "visited" }, 1: { state: "active" }, 2: { state: "default" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "default" }, { from: "3", to: "4", state: "default" }],
                dfsStack: ["dfs(0)", "dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [17, 19],
              shortLabel: "DFS(1) → visit 2",
              explanation: "Mark 1 as visited. Neighbor 0 already visited, neighbor 2 unvisited — DFS to 2.",
              variables: { node: 1, neighbor: 2, visited: "{0,1}" },
              dataStructure: {
                graphNodes: { 0: { state: "visited" }, 1: { state: "visited" }, 2: { state: "active" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }, { from: "3", to: "4", state: "default" }],
                dfsStack: ["dfs(0)", "dfs(1)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [17, 12],
              shortLabel: "DFS(2) done → count=1",
              explanation: "Mark 2 as visited. No unvisited neighbors. DFS returns all the way. Component #1 complete: {0,1,2}. count=1.",
              variables: { node: 2, count: 1, visited: "{0,1,2}" },
              dataStructure: {
                graphNodes: { 0: { state: "visited" }, 1: { state: "visited" }, 2: { state: "visited" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }, { from: "3", to: "4", state: "default" }],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [10, 11],
              shortLabel: "Node 3 unvisited → DFS",
              explanation: "Nodes 1,2 already visited (skip). Node 3 not visited. Start DFS — component #2.",
              variables: { i: 3, count: 1, visited: "{0,1,2}" },
              dataStructure: {
                graphNodes: { 0: { state: "visited" }, 1: { state: "visited" }, 2: { state: "visited" }, 3: { state: "active" }, 4: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }, { from: "3", to: "4", state: "default" }],
                dfsStack: ["dfs(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [17, 19],
              shortLabel: "DFS(3) → visit 4",
              explanation: "Mark 3 visited. Neighbor 4 unvisited — DFS to 4.",
              variables: { node: 3, neighbor: 4, visited: "{0,1,2,3}" },
              dataStructure: {
                graphNodes: { 0: { state: "visited" }, 1: { state: "visited" }, 2: { state: "visited" }, 3: { state: "visited" }, 4: { state: "active" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }, { from: "3", to: "4", state: "traversed" }],
                dfsStack: ["dfs(3)", "dfs(4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [17, 12],
              shortLabel: "DFS(4) done → count=2",
              explanation: "Mark 4 visited. No unvisited neighbors. Component #2 complete: {3,4}. count=2.",
              variables: { count: 2, visited: "{0,1,2,3,4}" },
              dataStructure: {
                graphNodes: { 0: { state: "found" }, 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" }, 4: { state: "found" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }, { from: "3", to: "4", state: "traversed" }],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [15],
              shortLabel: "Return 2",
              explanation: "All nodes visited. Found 2 connected components: {0,1,2} and {3,4}.",
              variables: { count: 2 },
              dataStructure: {
                graphNodes: { 0: { state: "found" }, 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" }, 4: { state: "found" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }, { from: "3", to: "4", state: "traversed" }],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Connected",
          description: "All nodes in one component",
          input: { n: 3, edges: [[0,1],[1,2]] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Build graph: 0-1-2",
              explanation: "Linear graph: 0↔1↔2. All nodes reachable from any node.",
              variables: { n: 3 },
              dataStructure: {
                graphNodes: { 0: { state: "default" }, 1: { state: "default" }, 2: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "default" }, { from: "1", to: "2", state: "default" }],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 17, 19],
              shortLabel: "DFS from 0 → visits all",
              explanation: "Start DFS from node 0. Visit 0→1→2. All 3 nodes marked visited in one DFS call.",
              variables: { count: 0, visited: "{0,1,2}" },
              dataStructure: {
                graphNodes: { 0: { state: "visited" }, 1: { state: "visited" }, 2: { state: "visited" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }],
                dfsStack: ["dfs(0)", "dfs(1)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [15],
              shortLabel: "Return 1",
              explanation: "Only one DFS call needed. All nodes connected. Return 1.",
              variables: { count: 1 },
              dataStructure: {
                graphNodes: { 0: { state: "found" }, 1: { state: "found" }, 2: { state: "found" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n, edges }) {
        const steps = [];
        const adj = Array.from({ length: n }, () => []);
        for (const [a, b] of edges) {
          adj[a].push(b);
          adj[b].push(a);
        }
        const visited = new Set();
        let count = 0;
        const dfsStackState = [];

        const makeGraphNodes = () => {
          const nodes = {};
          for (let i = 0; i < n; i++) {
            nodes[i] = { state: visited.has(i) ? "visited" : "default" };
          }
          return nodes;
        };

        steps.push({
          stepId: 0, lineNumbers: [1],
          shortLabel: "Build adjacency list",
          explanation: `Build graph with ${n} nodes and ${edges.length} edges.`,
          variables: { n, edgeCount: edges.length },
          dataStructure: {
            graphNodes: makeGraphNodes(),
            graphEdges: edges.map(([a, b]) => ({ from: String(a), to: String(b), state: "default" })),
            dfsStack: [],
          },
          delta: {}, isAnswer: false,
        });

        function dfs(node) {
          dfsStackState.push(`dfs(${node})`);
          visited.add(node);
          for (const neighbor of adj[node]) {
            if (!visited.has(neighbor)) {
              steps.push({
                stepId: steps.length, lineNumbers: [17, 19],
                shortLabel: `DFS(${node}) → ${neighbor}`,
                explanation: `Visit ${node}, traverse to unvisited neighbor ${neighbor}.`,
                variables: { node, neighbor, visited: JSON.stringify([...visited]) },
                dataStructure: {
                  graphNodes: makeGraphNodes(),
                  graphEdges: edges.map(([a, b]) => ({ from: String(a), to: String(b), state: "default" })),
                  dfsStack: [...dfsStackState],
                },
                delta: {}, isAnswer: false,
              });
              dfs(neighbor);
            }
          }
          dfsStackState.pop();
        }

        for (let i = 0; i < n; i++) {
          if (!visited.has(i)) {
            steps.push({
              stepId: steps.length, lineNumbers: [10, 11],
              shortLabel: `Node ${i} → new component`,
              explanation: `Node ${i} unvisited. Start DFS — new component #${count + 1}.`,
              variables: { i, count },
              dataStructure: {
                graphNodes: makeGraphNodes(),
                graphEdges: edges.map(([a, b]) => ({ from: String(a), to: String(b), state: "default" })),
                dfsStack: [`dfs(${i})`],
              },
              delta: {}, isAnswer: false,
            });
            dfs(i);
            count++;
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [15],
          shortLabel: `Return ${count}`,
          explanation: `All nodes visited. Found ${count} connected component(s).`,
          variables: { count },
          dataStructure: {
            graphNodes: makeGraphNodes(),
            graphEdges: edges.map(([a, b]) => ({ from: String(a), to: String(b), state: "traversed" })),
            dfsStack: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Union-Find",
      tier: "optimal",
      timeComplexity: "O(n + e × α(n))",
      spaceComplexity: "O(n)",
      idea: "Use Union-Find with path compression and union by rank. Start with n components. Each edge merges two components (if not already connected). Final count = remaining components.",

      javaCode: `public int countComponents(int n, int[][] edges) {
    int[] parent = new int[n];
    int[] rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int components = n;

    for (int[] e : edges) {
        int rootA = find(parent, e[0]);
        int rootB = find(parent, e[1]);
        if (rootA != rootB) {
            if (rank[rootA] < rank[rootB]) { int t = rootA; rootA = rootB; rootB = t; }
            parent[rootB] = rootA;
            if (rank[rootA] == rank[rootB]) rank[rootA]++;
            components--;
        }
    }
    return components;
}

private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,

      cppCode: `int countComponents(int n, vector<vector<int>>& edges) {
    vector<int> parent(n), rank(n, 0);
    iota(parent.begin(), parent.end(), 0);
    int components = n;

    for (auto& e : edges) {
        int rootA = find(parent, e[0]);
        int rootB = find(parent, e[1]);
        if (rootA != rootB) {
            if (rank[rootA] < rank[rootB]) swap(rootA, rootB);
            parent[rootB] = rootA;
            if (rank[rootA] == rank[rootB]) rank[rootA]++;
            components--;
        }
    }
    return components;
}

int find(vector<int>& parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,

      pythonCode: `def countComponents(n: int, edges: List[List[int]]) -> int:
    parent = list(range(n))
    rank = [0] * n
    components = n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        nonlocal components
        rootA, rootB = find(a), find(b)
        if rootA == rootB:
            return
        if rank[rootA] < rank[rootB]:
            rootA, rootB = rootB, rootA
        parent[rootB] = rootA
        if rank[rootA] == rank[rootB]:
            rank[rootA] += 1
        components -= 1

    for a, b in edges:
        union(a, b)

    return components`,

      lineAnnotations: {
        1: "Each node starts as its own parent (component)",
        2: "Rank for union by rank optimization",
        4: "Initially n components (one per node)",
        6: "Process each edge",
        7: "Find root of both endpoints",
        9: "If different roots, merge components",
        10: "Union by rank: attach smaller tree to larger",
        13: "Merging reduces component count by 1",
        18: "Path compression: point directly to root",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Two Components",
          description: "Union-Find on 5 nodes, 3 edges",
          input: { n: 5, edges: [[0,1],[1,2],[3,4]] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2, 4],
              shortLabel: "Init: 5 components",
              explanation: "Each node is its own component. parent = [0,1,2,3,4]. Components = 5.",
              variables: { parent: "[0,1,2,3,4]", components: 5 },
              dataStructure: {
                graphNodes: { 0: { state: "default" }, 1: { state: "default" }, 2: { state: "default" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 9, 11, 13],
              shortLabel: "Edge [0,1]: merge → 4 components",
              explanation: "Process edge [0,1]. find(0)=0, find(1)=1. Different roots — merge. parent[1]=0. Components: 5→4.",
              variables: { edge: "[0,1]", rootA: 0, rootB: 1, parent: "[0,0,2,3,4]", components: 4 },
              dataStructure: {
                graphNodes: { 0: { state: "active" }, 1: { state: "active" }, 2: { state: "default" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }],
                dfsStack: ["find(0)", "find(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 9, 11, 13],
              shortLabel: "Edge [1,2]: merge → 3 components",
              explanation: "Process edge [1,2]. find(1)=0 (path compression), find(2)=2. Different — merge. parent[2]=0. Components: 4→3.",
              variables: { edge: "[1,2]", rootA: 0, rootB: 2, parent: "[0,0,0,3,4]", components: 3 },
              dataStructure: {
                graphNodes: { 0: { state: "active" }, 1: { state: "visited" }, 2: { state: "active" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }],
                dfsStack: ["find(1)", "find(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 9, 11, 13],
              shortLabel: "Edge [3,4]: merge → 2 components",
              explanation: "Process edge [3,4]. find(3)=3, find(4)=4. Different — merge. parent[4]=3. Components: 3→2.",
              variables: { edge: "[3,4]", rootA: 3, rootB: 4, parent: "[0,0,0,3,3]", components: 2 },
              dataStructure: {
                graphNodes: { 0: { state: "visited" }, 1: { state: "visited" }, 2: { state: "visited" }, 3: { state: "active" }, 4: { state: "active" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }, { from: "3", to: "4", state: "traversed" }],
                dfsStack: ["find(3)", "find(4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15],
              shortLabel: "Return 2",
              explanation: "All edges processed. 2 components remain: {0,1,2} and {3,4}.",
              variables: { components: 2 },
              dataStructure: {
                graphNodes: { 0: { state: "found" }, 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" }, 4: { state: "found" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }, { from: "3", to: "4", state: "traversed" }],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Edges",
          description: "Isolated nodes — each is its own component",
          input: { n: 3, edges: [] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 4],
              shortLabel: "Init: 3 components",
              explanation: "3 nodes, no edges. Each node is its own component.",
              variables: { parent: "[0,1,2]", components: 3 },
              dataStructure: {
                graphNodes: { 0: { state: "default" }, 1: { state: "default" }, 2: { state: "default" } },
                graphEdges: [],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [15],
              shortLabel: "Return 3",
              explanation: "No edges to process. All 3 nodes remain isolated. Return 3.",
              variables: { components: 3 },
              dataStructure: {
                graphNodes: { 0: { state: "found" }, 1: { state: "found" }, 2: { state: "found" } },
                graphEdges: [],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n, edges }) {
        const steps = [];
        const parent = Array.from({ length: n }, (_, i) => i);
        const rank = Array(n).fill(0);
        let components = n;

        function find(x) {
          if (parent[x] !== x) parent[x] = find(parent[x]);
          return parent[x];
        }

        steps.push({
          stepId: 0, lineNumbers: [1, 2, 4],
          shortLabel: `Init: ${n} components`,
          explanation: `Each of ${n} nodes is its own component.`,
          variables: { parent: JSON.stringify(parent), components },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        for (const [a, b] of edges) {
          const rootA = find(a);
          const rootB = find(b);

          if (rootA !== rootB) {
            if (rank[rootA] < rank[rootB]) {
              parent[rootA] = rootB;
            } else {
              parent[rootB] = rootA;
              if (rank[rootA] === rank[rootB]) rank[rootA]++;
            }
            components--;

            steps.push({
              stepId: steps.length, lineNumbers: [6, 7, 9, 13],
              shortLabel: `Edge [${a},${b}]: merge → ${components}`,
              explanation: `Edge [${a},${b}]: roots ${rootA} and ${rootB} differ. Merge. Components: ${components + 1}→${components}.`,
              variables: { edge: `[${a},${b}]`, rootA, rootB, components, parent: JSON.stringify(parent) },
              dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`find(${a})`, `find(${b})`] },
              delta: {}, isAnswer: false,
            });
          } else {
            steps.push({
              stepId: steps.length, lineNumbers: [6, 7, 9],
              shortLabel: `Edge [${a},${b}]: same root`,
              explanation: `Edge [${a},${b}]: both have root ${rootA}. Already connected. No merge.`,
              variables: { edge: `[${a},${b}]`, rootA, components },
              dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`find(${a})`, `find(${b})`] },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [15],
          shortLabel: `Return ${components}`,
          explanation: `All edges processed. ${components} component(s) remain.`,
          variables: { components },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n + e)", space: "O(n + e)", explanation: "DFS visits each node and edge once; adjacency list stores all edges" },
    optimal: { time: "O(n + e × α(n))", space: "O(n)", explanation: "Union-Find with path compression and rank — α(n) is nearly constant", tradeoff: "Union-Find uses less space (no adjacency list) and is often faster in practice" },
  },

  interviewTips: [
    "Mention both DFS and Union-Find approaches — shows breadth.",
    "Union-Find is preferred when edges arrive as a stream (online algorithm).",
    "Explain path compression and union by rank — they make it nearly O(1) amortized.",
    "The inverse Ackermann function α(n) is ≤ 4 for all practical n.",
    "This problem is a building block for many graph problems — connected components appear everywhere.",
  ],

  relatedProblems: ["number-of-islands", "graph-valid-tree", "redundant-connection"],
};
