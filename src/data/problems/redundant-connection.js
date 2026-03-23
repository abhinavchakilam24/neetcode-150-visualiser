export const redundantConnection = {
  id: 91,
  slug: "redundant-connection",
  title: "Redundant Connection",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 91,
  artifactType: "GraphDFS",
  companies: ["Amazon", "Google", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/redundant-connection/",

  pattern: "Union-Find Cycle Detection",
  patternExplanation: `Process edges one by one. If both endpoints already share the same root in the Union-Find,
    adding this edge would create a cycle — it's the redundant edge. Return it.`,

  intuition: {
    coreInsight: `A tree with n nodes has exactly n-1 edges. We're given n edges for n nodes, meaning exactly
      one edge is redundant (creates a cycle). If we process edges in order and use Union-Find, the first
      edge whose both endpoints are already connected is the answer — removing it would restore the tree.`,

    mentalModel: `Imagine building a road network between n cities, adding one road at a time. Each road connects
      two previously separate regions. At some point, you try to build a road between two cities that are
      already connected by existing roads — that road is unnecessary. Union-Find tells you instantly
      whether two cities are already connected.`,

    whyNaiveFails: `DFS/BFS could check for cycles, but you'd need to rebuild the graph and check connectivity
      after removing each candidate edge — that's O(n²). Union-Find processes each edge in nearly O(1)
      amortized time, giving O(n) total.`,

    keyObservation: `The problem guarantees exactly one redundant edge and asks for the one that appears last
      in the input. Union-Find naturally finds the first edge that creates a cycle when processed in order.
      Since there's exactly one cycle, this is the unique answer.`,
  },

  problem: `In this problem, a tree is an undirected graph that is connected and has no cycles.
    You are given a graph that started as a tree with n nodes (1-indexed), with one additional edge added.
    Return an edge that can be removed so the resulting graph is a tree. If there are multiple answers,
    return the answer that occurs last in the input.`,

  examples: [
    { input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]", explanation: "Removing [2,3] leaves a tree" },
    { input: "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]", output: "[1,4]", explanation: "Removing [1,4] eliminates the cycle 1-2-3-4-1" },
  ],

  constraints: [
    "n == edges.length",
    "3 <= n <= 1000",
    "edges[i].length == 2",
    "1 <= ai < bi <= edges.length",
    "There are no repeated edges.",
    "The given graph is connected.",
  ],

  approaches: {
    brute: {
      label: "DFS Cycle Detection",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: "For each edge, build the graph without it and check if the graph is still connected. The last removable edge is the answer.",

      javaCode: `public int[] findRedundantConnection(int[][] edges) {
    int n = edges.length;
    for (int i = n - 1; i >= 0; i--) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int j = 0; j <= n; j++) adj.add(new ArrayList<>());
        for (int j = 0; j < n; j++) {
            if (j == i) continue;
            adj.get(edges[j][0]).add(edges[j][1]);
            adj.get(edges[j][1]).add(edges[j][0]);
        }
        if (isConnected(adj, n)) return edges[i];
    }
    return new int[]{};
}

private boolean isConnected(List<List<Integer>> adj, int n) {
    boolean[] visited = new boolean[n + 1];
    dfs(1, adj, visited);
    for (int i = 1; i <= n; i++) if (!visited[i]) return false;
    return true;
}

private void dfs(int node, List<List<Integer>> adj, boolean[] visited) {
    visited[node] = true;
    for (int nei : adj.get(node)) if (!visited[nei]) dfs(nei, adj, visited);
}`,

      cppCode: `vector<int> findRedundantConnection(vector<vector<int>>& edges) {
    int n = edges.size();
    for (int i = n - 1; i >= 0; i--) {
        vector<vector<int>> adj(n + 1);
        for (int j = 0; j < n; j++) {
            if (j == i) continue;
            adj[edges[j][0]].push_back(edges[j][1]);
            adj[edges[j][1]].push_back(edges[j][0]);
        }
        vector<bool> visited(n + 1, false);
        function<void(int)> dfs = [&](int node) {
            visited[node] = true;
            for (int nei : adj[node]) if (!visited[nei]) dfs(nei);
        };
        dfs(1);
        bool connected = true;
        for (int j = 1; j <= n; j++) if (!visited[j]) connected = false;
        if (connected) return edges[i];
    }
    return {};
}`,

      pythonCode: `def findRedundantConnection(edges: List[List[int]]) -> List[int]:
    n = len(edges)
    for i in range(n - 1, -1, -1):
        adj = defaultdict(list)
        for j in range(n):
            if j == i:
                continue
            adj[edges[j][0]].append(edges[j][1])
            adj[edges[j][1]].append(edges[j][0])
        visited = set()
        def dfs(node):
            visited.add(node)
            for nei in adj[node]:
                if nei not in visited:
                    dfs(nei)
        dfs(1)
        if len(visited) == n:
            return edges[i]
    return []`,

      lineAnnotations: {
        2: "Try removing each edge, starting from the last",
        3: "Build graph without edge i",
        10: "Check if remaining graph is still connected",
        14: "DFS from node 1 to check connectivity",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Find redundant edge in triangle",
          input: { edges: [[1,2],[1,3],[2,3]] },
          expectedOutput: "[2,3]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Try removing last edge",
              explanation: "Try removing edge [2,3] (last in input). Build graph with [1,2],[1,3] only.",
              variables: { i: 2, removing: "[2,3]" },
              dataStructure: {
                graphNodes: { 1: { state: "default" }, 2: { state: "default" }, 3: { state: "default" } },
                graphEdges: [{ from: "1", to: "2", state: "default" }, { from: "1", to: "3", state: "default" }],
                dfsStack: ["remove([2,3])", "build_graph"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 14],
              shortLabel: "DFS: still connected ✓",
              explanation: "DFS from 1: visits 1→2, 1→3. All 3 nodes visited. Graph is still connected without [2,3].",
              variables: { visited: "{1,2,3}", connected: true },
              dataStructure: {
                graphNodes: { 1: { state: "visited" }, 2: { state: "visited" }, 3: { state: "visited" } },
                graphEdges: [{ from: "1", to: "2", state: "traversed" }, { from: "1", to: "3", state: "traversed" }],
                dfsStack: ["dfs(1)", "dfs(2)", "dfs(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10],
              shortLabel: "Return [2,3]",
              explanation: "Removing [2,3] keeps the graph connected. It's the last edge that can be removed. Return [2,3].",
              variables: { answer: "[2,3]" },
              dataStructure: {
                graphNodes: { 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" } },
                graphEdges: [{ from: "1", to: "2", state: "traversed" }, { from: "1", to: "3", state: "traversed" }, { from: "2", to: "3", state: "eliminated" }],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Larger Cycle",
          description: "4-node cycle",
          input: { edges: [[1,2],[2,3],[3,4],[1,4],[1,5]] },
          expectedOutput: "[1,4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Try removing [1,5]",
              explanation: "Try removing last edge [1,5]. Check connectivity without it.",
              variables: { i: 4, removing: "[1,5]" },
              dataStructure: {
                graphNodes: { 1: { state: "default" }, 2: { state: "default" }, 3: { state: "default" }, 4: { state: "default" }, 5: { state: "default" } },
                graphEdges: [{ from: "1", to: "2", state: "default" }, { from: "2", to: "3", state: "default" }, { from: "3", to: "4", state: "default" }, { from: "1", to: "4", state: "default" }],
                dfsStack: ["remove([1,5])", "build_graph"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10],
              shortLabel: "Not connected — node 5 isolated",
              explanation: "Without [1,5], node 5 is unreachable. Graph is NOT connected. Can't remove [1,5].",
              variables: { connected: false },
              dataStructure: {
                graphNodes: { 5: { state: "eliminated" } },
                graphEdges: [],
                dfsStack: ["dfs(1)", "dfs(2)", "dfs(3)", "dfs(4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [2, 10],
              shortLabel: "Try removing [1,4] — connected ✓",
              explanation: "Try removing [1,4]. Remaining: [1,2],[2,3],[3,4],[1,5]. DFS from 1 reaches all. Connected!",
              variables: { i: 3, removing: "[1,4]", connected: true },
              dataStructure: {
                graphNodes: { 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" }, 4: { state: "found" }, 5: { state: "found" } },
                graphEdges: [{ from: "1", to: "4", state: "eliminated" }],
                dfsStack: ["remove([1,4])", "dfs(1)→all"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10],
              shortLabel: "Return [1,4]",
              explanation: "Removing [1,4] keeps graph connected. Return [1,4].",
              variables: { answer: "[1,4]" },
              dataStructure: {
                graphNodes: { 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" }, 4: { state: "found" }, 5: { state: "found" } },
                graphEdges: [],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ edges }) {
        const steps = [];
        const n = edges.length;

        for (let i = n - 1; i >= 0; i--) {
          const adj = {};
          for (let j = 0; j < n; j++) {
            if (j === i) continue;
            const [a, b] = edges[j];
            if (!adj[a]) adj[a] = [];
            if (!adj[b]) adj[b] = [];
            adj[a].push(b);
            adj[b].push(a);
          }

          const visited = new Set();
          function dfs(node) {
            visited.add(node);
            for (const nei of (adj[node] || [])) {
              if (!visited.has(nei)) dfs(nei);
            }
          }
          dfs(edges[0][0]);

          const connected = visited.size === n;

          steps.push({
            stepId: steps.length, lineNumbers: [2, 10],
            shortLabel: `Remove [${edges[i]}]: ${connected ? "connected ✓" : "disconnected ✗"}`,
            explanation: `Try removing edge [${edges[i]}]. ${connected ? "Graph stays connected!" : "Graph becomes disconnected."}`,
            variables: { removing: `[${edges[i]}]`, connected },
            dataStructure: {
              graphNodes: {},
              graphEdges: [],
              dfsStack: connected ? [`remove([${edges[i]}])`, `dfs(1)→all`] : [`remove([${edges[i]}])`, "disconnected!"],
            },
            delta: {}, isAnswer: false,
          });

          if (connected) {
            steps[steps.length - 1].isAnswer = true;
            steps[steps.length - 1].shortLabel = `Return [${edges[i]}]`;
            return steps;
          }
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Union-Find",
      tier: "optimal",
      timeComplexity: "O(n × α(n))",
      spaceComplexity: "O(n)",
      idea: "Process edges in order. Use Union-Find. The first edge where both endpoints share the same root creates a cycle — return it.",

      javaCode: `public int[] findRedundantConnection(int[][] edges) {
    int n = edges.length;
    int[] parent = new int[n + 1];
    int[] rank = new int[n + 1];
    for (int i = 1; i <= n; i++) parent[i] = i;

    for (int[] e : edges) {
        int rootA = find(parent, e[0]);
        int rootB = find(parent, e[1]);
        if (rootA == rootB) return e;
        if (rank[rootA] < rank[rootB]) { int t = rootA; rootA = rootB; rootB = t; }
        parent[rootB] = rootA;
        if (rank[rootA] == rank[rootB]) rank[rootA]++;
    }
    return new int[]{};
}

private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,

      cppCode: `vector<int> findRedundantConnection(vector<vector<int>>& edges) {
    int n = edges.size();
    vector<int> parent(n + 1), rank(n + 1, 0);
    iota(parent.begin(), parent.end(), 0);

    for (auto& e : edges) {
        int rootA = find(parent, e[0]);
        int rootB = find(parent, e[1]);
        if (rootA == rootB) return e;
        if (rank[rootA] < rank[rootB]) swap(rootA, rootB);
        parent[rootB] = rootA;
        if (rank[rootA] == rank[rootB]) rank[rootA]++;
    }
    return {};
}

int find(vector<int>& parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,

      pythonCode: `def findRedundantConnection(edges: List[List[int]]) -> List[int]:
    n = len(edges)
    parent = list(range(n + 1))
    rank = [0] * (n + 1)

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    for a, b in edges:
        rootA, rootB = find(a), find(b)
        if rootA == rootB:
            return [a, b]
        if rank[rootA] < rank[rootB]:
            rootA, rootB = rootB, rootA
        parent[rootB] = rootA
        if rank[rootA] == rank[rootB]:
            rank[rootA] += 1

    return []`,

      lineAnnotations: {
        3: "Each node starts as its own parent",
        6: "Process each edge in order",
        7: "Find roots of both endpoints",
        9: "Same root = cycle detected! This edge is redundant",
        10: "Union by rank for efficiency",
        11: "Merge smaller tree into larger",
        16: "Path compression in find",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Detect redundant edge in triangle",
          input: { edges: [[1,2],[1,3],[2,3]] },
          expectedOutput: "[2,3]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Init Union-Find",
              explanation: "Initialize parent = [_,1,2,3]. Each node is its own root.",
              variables: { parent: "[_,1,2,3]" },
              dataStructure: {
                graphNodes: { 1: { state: "default" }, 2: { state: "default" }, 3: { state: "default" } },
                graphEdges: [],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 10, 11],
              shortLabel: "Edge [1,2]: union",
              explanation: "Process [1,2]. find(1)=1, find(2)=2. Different roots — merge. parent[2]=1.",
              variables: { edge: "[1,2]", rootA: 1, rootB: 2, parent: "[_,1,1,3]" },
              dataStructure: {
                graphNodes: { 1: { state: "active" }, 2: { state: "active" }, 3: { state: "default" } },
                graphEdges: [{ from: "1", to: "2", state: "traversed" }],
                dfsStack: ["find(1)=1", "find(2)=2", "union(1,2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 10, 11],
              shortLabel: "Edge [1,3]: union",
              explanation: "Process [1,3]. find(1)=1, find(3)=3. Different roots — merge. parent[3]=1.",
              variables: { edge: "[1,3]", rootA: 1, rootB: 3, parent: "[_,1,1,1]" },
              dataStructure: {
                graphNodes: { 1: { state: "active" }, 2: { state: "visited" }, 3: { state: "active" } },
                graphEdges: [{ from: "1", to: "2", state: "traversed" }, { from: "1", to: "3", state: "traversed" }],
                dfsStack: ["find(1)=1", "find(3)=3", "union(1,3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 9],
              shortLabel: "Edge [2,3]: CYCLE! Return [2,3]",
              explanation: "Process [2,3]. find(2)=1, find(3)=1. SAME ROOT! Adding this edge would create a cycle. Return [2,3].",
              variables: { edge: "[2,3]", rootA: 1, rootB: 1, answer: "[2,3]" },
              dataStructure: {
                graphNodes: { 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" } },
                graphEdges: [{ from: "1", to: "2", state: "traversed" }, { from: "1", to: "3", state: "traversed" }, { from: "2", to: "3", state: "eliminated" }],
                dfsStack: ["find(2)=1", "find(3)=1", "CYCLE! rootA==rootB"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Larger Cycle",
          description: "Cycle in a 5-node graph",
          input: { edges: [[1,2],[2,3],[3,4],[1,4],[1,5]] },
          expectedOutput: "[1,4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Init Union-Find",
              explanation: "5 nodes, each its own root.",
              variables: { parent: "[_,1,2,3,4,5]" },
              dataStructure: {
                graphNodes: { 1: { state: "default" }, 2: { state: "default" }, 3: { state: "default" }, 4: { state: "default" }, 5: { state: "default" } },
                graphEdges: [],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 11],
              shortLabel: "Edge [1,2]: union",
              explanation: "find(1)=1, find(2)=2. Different. Merge.",
              variables: { edge: "[1,2]", parent: "[_,1,1,3,4,5]" },
              dataStructure: {
                graphNodes: { 1: { state: "active" }, 2: { state: "active" } },
                graphEdges: [{ from: "1", to: "2", state: "traversed" }],
                dfsStack: ["find(1)=1", "find(2)=2", "union(1,2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 11],
              shortLabel: "Edge [2,3]: union",
              explanation: "find(2)=1, find(3)=3. Different. Merge.",
              variables: { edge: "[2,3]", parent: "[_,1,1,1,4,5]" },
              dataStructure: {
                graphNodes: { 1: { state: "visited" }, 2: { state: "visited" }, 3: { state: "active" } },
                graphEdges: [{ from: "1", to: "2", state: "traversed" }, { from: "2", to: "3", state: "traversed" }],
                dfsStack: ["find(2)=1", "find(3)=3", "union(1,3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 11],
              shortLabel: "Edge [3,4]: union",
              explanation: "find(3)=1, find(4)=4. Different. Merge.",
              variables: { edge: "[3,4]", parent: "[_,1,1,1,1,5]" },
              dataStructure: {
                graphNodes: { 3: { state: "visited" }, 4: { state: "active" } },
                graphEdges: [{ from: "3", to: "4", state: "traversed" }],
                dfsStack: ["find(3)=1", "find(4)=4", "union(1,4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 9],
              shortLabel: "Edge [1,4]: CYCLE! Return [1,4]",
              explanation: "find(1)=1, find(4)=1. SAME ROOT! Nodes 1 and 4 are already connected (1-2-3-4). Return [1,4].",
              variables: { edge: "[1,4]", rootA: 1, rootB: 1, answer: "[1,4]" },
              dataStructure: {
                graphNodes: { 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" }, 4: { state: "found" }, 5: { state: "default" } },
                graphEdges: [{ from: "1", to: "4", state: "eliminated" }],
                dfsStack: ["find(1)=1", "find(4)=1", "CYCLE! rootA==rootB"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ edges }) {
        const steps = [];
        const n = edges.length;
        const parent = Array.from({ length: n + 1 }, (_, i) => i);
        const rank = Array(n + 1).fill(0);

        function find(x) {
          if (parent[x] !== x) parent[x] = find(parent[x]);
          return parent[x];
        }

        steps.push({
          stepId: 0, lineNumbers: [3],
          shortLabel: "Init Union-Find",
          explanation: `Initialize ${n} nodes, each its own root.`,
          variables: { parent: JSON.stringify(parent.slice(1)) },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        for (const [a, b] of edges) {
          const rootA = find(a);
          const rootB = find(b);

          if (rootA === rootB) {
            steps.push({
              stepId: steps.length, lineNumbers: [6, 7, 9],
              shortLabel: `Edge [${a},${b}]: CYCLE! Return`,
              explanation: `find(${a})=${rootA}, find(${b})=${rootB}. Same root — cycle detected! Return [${a},${b}].`,
              variables: { edge: `[${a},${b}]`, rootA, rootB, answer: `[${a},${b}]` },
              dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`find(${a})=${rootA}`, `find(${b})=${rootB}`, `CYCLE! rootA==rootB`] },
              delta: {}, isAnswer: true,
            });
            return steps;
          }

          if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
          } else {
            parent[rootB] = rootA;
            if (rank[rootA] === rank[rootB]) rank[rootA]++;
          }

          steps.push({
            stepId: steps.length, lineNumbers: [6, 7, 11],
            shortLabel: `Edge [${a},${b}]: union`,
            explanation: `find(${a})=${rootA}, find(${b})=${rootB}. Different roots — merge.`,
            variables: { edge: `[${a},${b}]`, rootA, rootB },
            dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`find(${a})=${rootA}`, `find(${b})=${rootB}`, `union(${rootA},${rootB})`] },
            delta: {}, isAnswer: false,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n²)", space: "O(n)", explanation: "Try removing each edge and check connectivity via DFS" },
    optimal: { time: "O(n × α(n))", space: "O(n)", explanation: "Process each edge once with Union-Find", tradeoff: "Union-Find gives near-linear time vs quadratic DFS approach" },
  },

  interviewTips: [
    "Immediately recognize this as a Union-Find problem — cycle detection in an undirected graph.",
    "Explain why the last edge creating a cycle is the answer (problem guarantees unique answer).",
    "Describe path compression and union by rank — shows you know the optimizations.",
    "Mention that DFS can also detect cycles but is slower for this use case.",
    "Clarify that nodes are 1-indexed, so parent array needs size n+1.",
  ],

  relatedProblems: ["connected-components", "graph-valid-tree", "number-of-islands"],
};
