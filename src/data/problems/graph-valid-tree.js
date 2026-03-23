export const graphValidTree = {
  id: 89,
  slug: "graph-valid-tree",
  title: "Graph Valid Tree",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 89,
  artifactType: "GraphDFS",
  companies: ["Google", "Amazon", "Meta", "LinkedIn", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/graph-valid-tree/",

  pattern: "Union-Find / DFS Connectivity Check",
  patternExplanation: `A valid tree must satisfy two conditions: (1) no cycles and (2) all
    nodes connected. DFS or Union-Find can verify both. A tree with n nodes has exactly n-1
    edges. If edges != n-1, it's immediately not a tree.`,

  intuition: {
    coreInsight: `A graph is a valid tree if and only if it has exactly n-1 edges AND is
      fully connected. With fewer edges, the graph is disconnected. With more edges, there
      must be a cycle. So we first check the edge count, then verify connectivity with a
      single DFS/BFS from any node — if all nodes are visited, it's a tree.`,

    mentalModel: `Think of building a tree one edge at a time. Each new edge connects one
      new node to the existing tree — that's why you need exactly n-1 edges for n nodes.
      If you ever add an edge that connects two nodes already in the same component, you've
      created a cycle. It's like building a road network between cities: a tree is the
      minimum connected network with no redundant roads.`,

    whyNaiveFails: `A naive approach might just check for cycles (DFS back-edge detection)
      but forget to check connectivity. A forest (multiple disconnected trees) has no cycles
      but isn't a single tree. Conversely, checking only connectivity misses cycles. You
      need both checks, or the elegant shortcut: edges == n-1 AND connected.`,

    keyObservation: `The two conditions (no cycles + connected) can be simplified to: the
      graph has exactly n-1 edges AND a DFS from node 0 visits all n nodes. The edge count
      check is O(1) and eliminates many cases immediately. This is much cleaner than
      separately detecting cycles.`,
  },

  problem: `You have a graph of n nodes labeled from 0 to n-1. You are given an integer n
    and a list of edges where edges[i] = [ai, bi] indicates an undirected edge between
    nodes ai and bi. Return true if the edges form a valid tree, otherwise return false.`,

  examples: [
    { input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true", explanation: "5 nodes, 4 edges, fully connected, no cycles — valid tree." },
    { input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]", output: "false", explanation: "5 nodes, 5 edges — too many edges, must contain a cycle (1-2-3-1)." },
  ],

  constraints: [
    "1 <= n <= 2000",
    "0 <= edges.length <= 5000",
    "edges[i].length == 2",
    "0 <= ai, bi < n",
    "ai != bi",
    "There are no self-loops or repeated edges.",
  ],

  approaches: {
    brute: {
      label: "DFS Cycle + Connectivity Check",
      tier: "brute",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      idea: `Build adjacency list. Run DFS from node 0, tracking visited nodes and parent
        to detect cycles. If any back edge is found (neighbor visited but not parent), cycle
        exists. After DFS, check if all nodes were visited.`,

      javaCode: `public boolean validTree(int n, int[][] edges) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
    for (int[] e : edges) {
        graph.get(e[0]).add(e[1]);
        graph.get(e[1]).add(e[0]);
    }
    boolean[] visited = new boolean[n];
    if (hasCycle(graph, 0, -1, visited)) return false;
    for (boolean v : visited) if (!v) return false;
    return true;
}

private boolean hasCycle(List<List<Integer>> graph, int node, int parent, boolean[] visited) {
    visited[node] = true;
    for (int neighbor : graph.get(node)) {
        if (neighbor == parent) continue;
        if (visited[neighbor]) return true;
        if (hasCycle(graph, neighbor, node, visited)) return true;
    }
    return false;
}`,

      cppCode: `bool validTree(int n, vector<vector<int>>& edges) {
    vector<vector<int>> graph(n);
    for (auto& e : edges) {
        graph[e[0]].push_back(e[1]);
        graph[e[1]].push_back(e[0]);
    }
    vector<bool> visited(n, false);
    function<bool(int, int)> hasCycle = [&](int node, int parent) -> bool {
        visited[node] = true;
        for (int nb : graph[node]) {
            if (nb == parent) continue;
            if (visited[nb]) return true;
            if (hasCycle(nb, node)) return true;
        }
        return false;
    };
    if (hasCycle(0, -1)) return false;
    for (bool v : visited) if (!v) return false;
    return true;
}`,

      pythonCode: `def validTree(n: int, edges: List[List[int]]) -> bool:
    graph = [[] for _ in range(n)]
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    visited = [False] * n

    def has_cycle(node, parent):
        visited[node] = True
        for neighbor in graph[node]:
            if neighbor == parent:
                continue
            if visited[neighbor]:
                return True
            if has_cycle(neighbor, node):
                return True
        return False

    if has_cycle(0, -1):
        return False
    return all(visited)`,

      lineAnnotations: {
        2: "Build undirected adjacency list",
        8: "Track visited nodes during DFS",
        9: "If DFS finds a cycle, return false",
        10: "If any node unvisited after DFS, graph is disconnected — not a tree",
        15: "Mark current node as visited",
        17: "Skip the edge back to parent — it's not a cycle",
        18: "If neighbor already visited via different path, cycle found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Valid Tree",
          input: { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4, 5, 6],
              shortLabel: "Build graph",
              explanation: "Build undirected adjacency list: 0↔1, 0↔2, 0↔3, 1↔4. Five nodes, four edges — the edge count n-1 is correct for a potential tree.",
              variables: { n: 5, edges: 4 },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 150, y: 50 },
                  1: { state: "default", x: 80, y: 150 },
                  2: { state: "default", x: 150, y: 150 },
                  3: { state: "default", x: 220, y: 150 },
                  4: { state: "default", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                  { from: "0", to: "3", state: "default" },
                  { from: "1", to: "4", state: "default" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [9, 15],
              shortLabel: "DFS(0): visit",
              explanation: "Start DFS from node 0 with parent=-1. Mark node 0 as visited.",
              variables: { node: 0, parent: -1, visited: "[T,F,F,F,F]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "default", x: 80, y: 150 },
                  2: { state: "default", x: 150, y: 150 },
                  3: { state: "default", x: 220, y: 150 },
                  4: { state: "default", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                  { from: "0", to: "3", state: "default" },
                  { from: "1", to: "4", state: "default" },
                ],
                dfsStack: ["DFS(0, par=-1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16, 19, 15],
              shortLabel: "DFS(1): visit",
              explanation: "From node 0, visit neighbor 1 (parent=0). Mark node 1 as visited.",
              variables: { node: 1, parent: 0, visited: "[T,T,F,F,F]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "active", x: 80, y: 150 },
                  2: { state: "default", x: 150, y: 150 },
                  3: { state: "default", x: 220, y: 150 },
                  4: { state: "default", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "0", to: "3", state: "default" },
                  { from: "1", to: "4", state: "default" },
                ],
                dfsStack: ["DFS(0, par=-1)", "DFS(1, par=0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [16, 19, 15],
              shortLabel: "DFS(4): visit",
              explanation: "From node 1, neighbor 0 is parent so skip. Visit neighbor 4 (parent=1). Mark visited.",
              variables: { node: 4, parent: 1, visited: "[T,T,F,F,T]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 150, y: 50 },
                  1: { state: "active", x: 80, y: 150 },
                  2: { state: "default", x: 150, y: 150 },
                  3: { state: "default", x: 220, y: 150 },
                  4: { state: "active", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "0", to: "3", state: "default" },
                  { from: "1", to: "4", state: "traversed" },
                ],
                dfsStack: ["DFS(0, par=-1)", "DFS(1, par=0)", "DFS(4, par=1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16, 17],
              shortLabel: "Node 4 done, backtrack",
              explanation: "Node 4's only neighbor is node 1 (parent), so skip. No cycle from this subtree. Backtrack.",
              variables: { node: 4, parent: 1, noCycle: true },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 150, y: 50 },
                  1: { state: "active", x: 80, y: 150 },
                  2: { state: "default", x: 150, y: 150 },
                  3: { state: "default", x: 220, y: 150 },
                  4: { state: "visited", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "0", to: "3", state: "default" },
                  { from: "1", to: "4", state: "traversed" },
                ],
                dfsStack: ["DFS(0, par=-1)", "DFS(1, par=0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [16, 19, 15],
              shortLabel: "DFS(2) and DFS(3): visit",
              explanation: "Back at node 0, visit remaining neighbors 2 and 3. Both are leaf nodes with only parent edge. No cycles found.",
              variables: { visited: "[T,T,T,T,T]", noCycle: true },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 150, y: 50 },
                  1: { state: "visited", x: 80, y: 150 },
                  2: { state: "visited", x: 150, y: 150 },
                  3: { state: "visited", x: 220, y: 150 },
                  4: { state: "visited", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "0", to: "3", state: "traversed" },
                  { from: "1", to: "4", state: "traversed" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10, 11],
              shortLabel: "All visited, return true",
              explanation: "No cycle was found, and all 5 nodes were visited. The graph is connected and acyclic — it's a valid tree!",
              variables: { visited: "[T,T,T,T,T]", result: true },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 150, y: 50 },
                  1: { state: "found", x: 80, y: 150 },
                  2: { state: "found", x: 150, y: 150 },
                  3: { state: "found", x: 220, y: 150 },
                  4: { state: "found", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "0", to: "3", state: "traversed" },
                  { from: "1", to: "4", state: "traversed" },
                ],
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
        const graph = Array.from({ length: n }, () => []);
        for (const [a, b] of edges) { graph[a].push(b); graph[b].push(a); }

        const cols = Math.ceil(Math.sqrt(n));
        const pos = (i) => ({ x: 80 + (i % cols) * 100, y: 50 + Math.floor(i / cols) * 100 });
        const visited = new Array(n).fill(false);

        const makeNodes = () => {
          const nodes = {};
          for (let i = 0; i < n; i++) nodes[i] = { state: visited[i] ? "visited" : "default", ...pos(i) };
          return nodes;
        };
        const makeEdges = () => edges.map(([a, b]) => ({ from: String(a), to: String(b), state: "default" }));

        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4, 5, 6],
          shortLabel: "Build graph",
          explanation: `Build undirected graph with ${n} nodes and ${edges.length} edges.`,
          variables: { n, edges: edges.length },
          dataStructure: { graphNodes: makeNodes(), graphEdges: makeEdges(), dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        let hasCycle = false;
        const dfsStack = [];

        function dfs(node, parent) {
          if (hasCycle) return;
          visited[node] = true;
          dfsStack.push(`DFS(${node})`);

          steps.push({
            stepId: steps.length, lineNumbers: [15],
            shortLabel: `Visit ${node}`,
            explanation: `DFS visits node ${node} (parent=${parent}).`,
            variables: { node, parent },
            dataStructure: { graphNodes: makeNodes(), graphEdges: makeEdges(), dfsStack: [...dfsStack] },
            delta: {}, isAnswer: false,
          });

          for (const nb of graph[node]) {
            if (nb === parent) continue;
            if (visited[nb]) {
              hasCycle = true;
              steps.push({
                stepId: steps.length, lineNumbers: [18],
                shortLabel: `Cycle at ${nb}!`,
                explanation: `Node ${nb} already visited and not parent — cycle detected!`,
                variables: { node, neighbor: nb, result: false },
                dataStructure: { graphNodes: makeNodes(), graphEdges: makeEdges(), dfsStack: [...dfsStack] },
                delta: {}, isAnswer: true,
              });
              return;
            }
            dfs(nb, node);
            if (hasCycle) return;
          }
          dfsStack.pop();
        }

        dfs(0, -1);

        if (!hasCycle) {
          const allVisited = visited.every(v => v);
          const nodes = makeNodes();
          if (allVisited) for (const k in nodes) nodes[k].state = "found";
          steps.push({
            stepId: steps.length, lineNumbers: [10, 11],
            shortLabel: allVisited ? "Valid tree!" : "Disconnected",
            explanation: allVisited ? "No cycle and all nodes connected — valid tree!" : "No cycle but not all nodes visited — disconnected, not a tree.",
            variables: { allVisited, result: allVisited },
            dataStructure: { graphNodes: nodes, graphEdges: makeEdges(), dfsStack: [] },
            delta: {}, isAnswer: true,
          });
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Union-Find",
      tier: "optimal",
      timeComplexity: "O(V · α(V))",
      spaceComplexity: "O(V)",
      idea: `Quick check: if edges != n-1, return false immediately. Then use Union-Find:
        for each edge, if both nodes share the same root, adding this edge creates a cycle.
        If we successfully union all edges, the graph is a valid tree.`,

      javaCode: `public boolean validTree(int n, int[][] edges) {
    if (edges.length != n - 1) return false;

    int[] parent = new int[n];
    int[] rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;

    for (int[] e : edges) {
        int rootA = find(parent, e[0]);
        int rootB = find(parent, e[1]);
        if (rootA == rootB) return false;
        union(parent, rank, rootA, rootB);
    }
    return true;
}

private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}

private void union(int[] parent, int[] rank, int a, int b) {
    if (rank[a] < rank[b]) { int t = a; a = b; b = t; }
    parent[b] = a;
    if (rank[a] == rank[b]) rank[a]++;
}`,

      cppCode: `bool validTree(int n, vector<vector<int>>& edges) {
    if (edges.size() != n - 1) return false;

    vector<int> parent(n), rnk(n, 0);
    iota(parent.begin(), parent.end(), 0);

    function<int(int)> find = [&](int x) -> int {
        return parent[x] == x ? x : parent[x] = find(parent[x]);
    };

    for (auto& e : edges) {
        int ra = find(e[0]), rb = find(e[1]);
        if (ra == rb) return false;
        if (rnk[ra] < rnk[rb]) swap(ra, rb);
        parent[rb] = ra;
        if (rnk[ra] == rnk[rb]) rnk[ra]++;
    }
    return true;
}`,

      pythonCode: `def validTree(n: int, edges: List[List[int]]) -> bool:
    if len(edges) != n - 1:
        return False

    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        if rank[a] < rank[b]:
            a, b = b, a
        parent[b] = a
        if rank[a] == rank[b]:
            rank[a] += 1

    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra == rb:
            return False
        union(ra, rb)

    return True`,

      lineAnnotations: {
        2: "Quick check: a tree with n nodes has exactly n-1 edges",
        4: "Initialize Union-Find: each node is its own parent",
        7: "Process each edge",
        8: "Find root of first endpoint",
        9: "Find root of second endpoint",
        10: "If same root, adding this edge creates a cycle",
        11: "Union the two components",
        16: "Path compression: point directly to root",
        21: "Union by rank: attach smaller tree under larger",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Valid Tree",
          description: "5 nodes, 4 edges, forms a valid tree",
          input: { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Check edges == n-1",
              explanation: "4 edges, n-1 = 4. Edge count matches. A tree with 5 nodes needs exactly 4 edges. Proceed to cycle check.",
              variables: { n: 5, edges: 4, "n-1": 4, check: "4 == 4 ✓" },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 150, y: 50 },
                  1: { state: "default", x: 80, y: 150 },
                  2: { state: "default", x: 150, y: 150 },
                  3: { state: "default", x: 220, y: 150 },
                  4: { state: "default", x: 80, y: 250 },
                },
                graphEdges: [],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "Init Union-Find",
              explanation: "Initialize parent array: each node is its own parent. Five separate components: {0}, {1}, {2}, {3}, {4}.",
              variables: { parent: "[0,1,2,3,4]", rank: "[0,0,0,0,0]", components: 5 },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 150, y: 50 },
                  1: { state: "default", x: 80, y: 150 },
                  2: { state: "default", x: 150, y: 150 },
                  3: { state: "default", x: 220, y: 150 },
                  4: { state: "default", x: 80, y: 250 },
                },
                graphEdges: [],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 9, 11],
              shortLabel: "Edge [0,1]: union",
              explanation: "Process edge [0,1]. find(0)=0, find(1)=1. Different roots — no cycle. Union them. parent[1]=0.",
              variables: { edge: "[0,1]", rootA: 0, rootB: 1, parent: "[0,0,2,3,4]", components: 4 },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "active", x: 80, y: 150 },
                  2: { state: "default", x: 150, y: 150 },
                  3: { state: "default", x: 220, y: 150 },
                  4: { state: "default", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8, 9, 11],
              shortLabel: "Edge [0,2]: union",
              explanation: "Process edge [0,2]. find(0)=0, find(2)=2. Different roots. Union: parent[2]=0.",
              variables: { edge: "[0,2]", rootA: 0, rootB: 2, parent: "[0,0,0,3,4]", components: 3 },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "visited", x: 80, y: 150 },
                  2: { state: "active", x: 150, y: 150 },
                  3: { state: "default", x: 220, y: 150 },
                  4: { state: "default", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8, 9, 11],
              shortLabel: "Edge [0,3]: union",
              explanation: "Process edge [0,3]. find(0)=0, find(3)=3. Different roots. Union: parent[3]=0.",
              variables: { edge: "[0,3]", rootA: 0, rootB: 3, parent: "[0,0,0,0,4]", components: 2 },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "visited", x: 80, y: 150 },
                  2: { state: "visited", x: 150, y: 150 },
                  3: { state: "active", x: 220, y: 150 },
                  4: { state: "default", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "0", to: "3", state: "traversed" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8, 9, 11],
              shortLabel: "Edge [1,4]: union",
              explanation: "Process edge [1,4]. find(1)=0, find(4)=4. Different roots. Union: parent[4]=0. All nodes now in one component.",
              variables: { edge: "[1,4]", rootA: 0, rootB: 4, parent: "[0,0,0,0,0]", components: 1 },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 150, y: 50 },
                  1: { state: "active", x: 80, y: 150 },
                  2: { state: "visited", x: 150, y: 150 },
                  3: { state: "visited", x: 220, y: 150 },
                  4: { state: "active", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "0", to: "3", state: "traversed" },
                  { from: "1", to: "4", state: "traversed" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13],
              shortLabel: "Return true",
              explanation: "All 4 edges processed with no cycle detected. Edge count was correct (n-1). This is a valid tree!",
              variables: { result: true },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 150, y: 50 },
                  1: { state: "found", x: 80, y: 150 },
                  2: { state: "found", x: 150, y: 150 },
                  3: { state: "found", x: 220, y: 150 },
                  4: { state: "found", x: 80, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "0", to: "3", state: "traversed" },
                  { from: "1", to: "4", state: "traversed" },
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
          label: "Has Cycle",
          description: "Extra edge creates a cycle — not a valid tree",
          input: { n: 5, edges: [[0,1],[1,2],[2,3],[1,3],[1,4]] },
          expectedOutput: "false",
          commonMistake: "Forgetting to check the edge count first. With n=5 and 5 edges, we can immediately return false since a tree needs exactly n-1=4 edges.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Check edges == n-1",
              explanation: "5 edges but n-1 = 4. Edge count mismatch! A tree with 5 nodes must have exactly 4 edges. With 5 edges there must be a cycle.",
              variables: { n: 5, edges: 5, "n-1": 4, check: "5 != 4" },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 50, y: 100 },
                  1: { state: "default", x: 150, y: 50 },
                  2: { state: "default", x: 250, y: 100 },
                  3: { state: "default", x: 200, y: 200 },
                  4: { state: "default", x: 100, y: 200 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "1", to: "2", state: "default" },
                  { from: "2", to: "3", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "1", to: "4", state: "default" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [2],
              shortLabel: "Return false immediately",
              explanation: "edges.length (5) != n - 1 (4). Return false immediately. No need to even build the Union-Find structure.",
              variables: { result: false, reason: "Too many edges" },
              dataStructure: {
                graphNodes: {
                  0: { state: "eliminated", x: 50, y: 100 },
                  1: { state: "eliminated", x: 150, y: 50 },
                  2: { state: "eliminated", x: 250, y: 100 },
                  3: { state: "eliminated", x: 200, y: 200 },
                  4: { state: "eliminated", x: 100, y: 200 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "1", to: "2", state: "default" },
                  { from: "2", to: "3", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "1", to: "4", state: "default" },
                ],
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
        const cols = Math.ceil(Math.sqrt(n));
        const pos = (i) => ({ x: 80 + (i % cols) * 100, y: 50 + Math.floor(i / cols) * 100 });

        const makeNodes = (states) => {
          const nodes = {};
          for (let i = 0; i < n; i++) nodes[i] = { state: states[i] || "default", ...pos(i) };
          return nodes;
        };

        const nodeStates = new Array(n).fill("default");
        const processedEdges = [];

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `Check edges == n-1`,
          explanation: `${edges.length} edges, n-1 = ${n - 1}. ${edges.length === n - 1 ? "Match!" : "Mismatch — not a tree."}`,
          variables: { n, edges: edges.length, "n-1": n - 1 },
          dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: edges.length !== n - 1,
        });

        if (edges.length !== n - 1) return steps;

        const parent = Array.from({ length: n }, (_, i) => i);
        const rank = new Array(n).fill(0);

        function find(x) {
          if (parent[x] !== x) parent[x] = find(parent[x]);
          return parent[x];
        }

        steps.push({
          stepId: 1, lineNumbers: [4, 5],
          shortLabel: "Init Union-Find",
          explanation: `Each node starts as its own component. ${n} separate components.`,
          variables: { parent: `[${parent.join(",")}]`, components: n },
          dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        for (const [a, b] of edges) {
          const ra = find(a), rb = find(b);
          if (ra === rb) {
            nodeStates[a] = "eliminated";
            nodeStates[b] = "eliminated";
            steps.push({
              stepId: steps.length, lineNumbers: [10],
              shortLabel: `Edge [${a},${b}]: cycle!`,
              explanation: `find(${a})=${ra}, find(${b})=${rb}. Same root — cycle detected! Not a tree.`,
              variables: { edge: `[${a},${b}]`, rootA: ra, rootB: rb, result: false },
              dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: [...processedEdges, { from: String(a), to: String(b), state: "default" }], dfsStack: [] },
              delta: {}, isAnswer: true,
            });
            return steps;
          }

          if (rank[ra] < rank[rb]) { parent[ra] = rb; } else { parent[rb] = ra; if (rank[ra] === rank[rb]) rank[ra]++; }
          nodeStates[a] = "visited";
          nodeStates[b] = "visited";
          processedEdges.push({ from: String(a), to: String(b), state: "traversed" });

          steps.push({
            stepId: steps.length, lineNumbers: [7, 8, 9, 11],
            shortLabel: `Edge [${a},${b}]: union`,
            explanation: `find(${a})=${ra}, find(${b})=${rb}. Different roots — union them.`,
            variables: { edge: `[${a},${b}]`, rootA: ra, rootB: rb, parent: `[${parent.join(",")}]` },
            dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: [...processedEdges], dfsStack: [] },
            delta: {}, isAnswer: false,
          });
        }

        for (let i = 0; i < n; i++) nodeStates[i] = "found";
        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: "Valid tree!",
          explanation: "All edges processed, no cycle. Edge count = n-1. Valid tree!",
          variables: { result: true },
          dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: processedEdges, dfsStack: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(V + E)", space: "O(V + E)", explanation: "DFS visits every node and edge; adjacency list uses O(V + E) space" },
    optimal: { time: "O(V · α(V))", space: "O(V)", explanation: "Union-Find with path compression and union by rank; α is the inverse Ackermann function, nearly constant", tradeoff: "Union-Find uses less space than DFS (no adjacency list needed) and is simpler to implement" },
  },

  interviewTips: [
    "State the two conditions for a valid tree: connected and acyclic.",
    "Mention the edge count shortcut: edges must equal n-1.",
    "Know both DFS and Union-Find approaches — show versatility.",
    "Explain path compression and union by rank in Union-Find.",
    "Handle the edge case: n=1 with no edges is a valid tree (single node).",
    "Clarify that the graph is undirected — affects cycle detection in DFS.",
  ],

  relatedProblems: ["connected-components", "redundant-connection", "number-of-islands"],
};
