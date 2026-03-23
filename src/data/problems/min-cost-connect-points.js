export const minCostConnectPoints = {
  id: 94,
  slug: "min-cost-connect-points",
  title: "Min Cost to Connect All Points",
  difficulty: "Medium",
  topic: "advanced-graphs",
  topicLabel: "Advanced Graphs",
  neetcodeNumber: 94,
  artifactType: "GraphDFS",
  companies: ["Amazon", "Google", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/min-cost-to-connect-all-points/",

  pattern: "Minimum Spanning Tree (Prim's / Kruskal's)",
  patternExplanation: `Connect all points with minimum total Manhattan distance. This is a classic MST problem.
    Prim's algorithm greedily adds the cheapest edge connecting an unvisited node to the visited set.`,

  intuition: {
    coreInsight: `We need to connect all points with edges (straight lines) such that the total cost
      (Manhattan distance) is minimized and all points are reachable. This is exactly the Minimum
      Spanning Tree problem. Prim's algorithm starts from any point and repeatedly picks the cheapest
      edge to an unconnected point until all points are connected.`,

    mentalModel: `Imagine you're laying cables between cities. You start at one city and always extend
      your network to the nearest unconnected city. At each step, you look at ALL cities not yet
      connected and pick the one with the shortest cable to any already-connected city. This greedy
      choice guarantees minimum total cable length.`,

    whyNaiveFails: `Trying all possible spanning trees is exponential. Even generating all n(n-1)/2 edges
      and sorting them (Kruskal's) works but requires O(n² log n). Prim's with a min-heap processes
      the dense graph efficiently in O(n² log n) but with better constants for dense graphs.`,

    keyObservation: `For n points, the complete graph has n(n-1)/2 edges. Since this is a dense graph,
      Prim's algorithm (especially with adjacency-matrix-style checking) is often more practical than
      Kruskal's, which would need to sort all edges first.`,
  },

  problem: `You are given an array points where points[i] = [xi, yi] represents a point on the X-Y plane.
    The cost of connecting two points is the Manhattan distance |xi - xj| + |yi - yj|. Return the
    minimum cost to make all points connected.`,

  examples: [
    { input: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]", output: "20", explanation: "MST connects all 5 points with total cost 20" },
    { input: "points = [[3,12],[-2,5],[-4,1]]", output: "18", explanation: "Connect all 3 points optimally" },
  ],

  constraints: [
    "1 <= points.length <= 1000",
    "-10^6 <= xi, yi <= 10^6",
    "All pairs (xi, yi) are distinct.",
  ],

  approaches: {
    brute: {
      label: "Kruskal's with Sort",
      tier: "brute",
      timeComplexity: "O(n² log n)",
      spaceComplexity: "O(n²)",
      idea: "Generate all edges, sort by cost, use Union-Find to add edges that don't create cycles.",

      javaCode: `public int minCostConnectPoints(int[][] points) {
    int n = points.length;
    List<int[]> edges = new ArrayList<>();
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            edges.add(new int[]{Math.abs(points[i][0]-points[j][0]) + Math.abs(points[i][1]-points[j][1]), i, j});
    edges.sort((a, b) -> a[0] - b[0]);

    int[] parent = new int[n], rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int cost = 0, edgesUsed = 0;

    for (int[] e : edges) {
        int ra = find(parent, e[1]), rb = find(parent, e[2]);
        if (ra != rb) {
            if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
            parent[rb] = ra;
            if (rank[ra] == rank[rb]) rank[ra]++;
            cost += e[0];
            if (++edgesUsed == n - 1) break;
        }
    }
    return cost;
}

private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,

      cppCode: `int minCostConnectPoints(vector<vector<int>>& points) {
    int n = points.size();
    vector<array<int,3>> edges;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            edges.push_back({abs(points[i][0]-points[j][0]) + abs(points[i][1]-points[j][1]), i, j});
    sort(edges.begin(), edges.end());

    vector<int> parent(n), rnk(n, 0);
    iota(parent.begin(), parent.end(), 0);
    int cost = 0, used = 0;

    for (auto& [w, u, v] : edges) {
        int ra = find(parent, u), rb = find(parent, v);
        if (ra != rb) {
            if (rnk[ra] < rnk[rb]) swap(ra, rb);
            parent[rb] = ra;
            if (rnk[ra] == rnk[rb]) rnk[ra]++;
            cost += w;
            if (++used == n - 1) break;
        }
    }
    return cost;
}

int find(vector<int>& parent, int x) {
    return parent[x] == x ? x : parent[x] = find(parent, parent[x]);
}`,

      pythonCode: `def minCostConnectPoints(points: List[List[int]]) -> int:
    n = len(points)
    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            cost = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
            edges.append((cost, i, j))
    edges.sort()

    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    total = 0
    used = 0
    for cost, u, v in edges:
        ru, rv = find(u), find(v)
        if ru != rv:
            if rank[ru] < rank[rv]:
                ru, rv = rv, ru
            parent[rv] = ru
            if rank[ru] == rank[rv]:
                rank[ru] += 1
            total += cost
            used += 1
            if used == n - 1:
                break

    return total`,

      lineAnnotations: {
        3: "Generate all n(n-1)/2 possible edges",
        6: "Manhattan distance as edge weight",
        7: "Sort edges by cost — cheapest first",
        12: "Process edges in cost order",
        14: "If endpoints in different components, add edge to MST",
        19: "Stop when we have n-1 edges (tree complete)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Connect 3 points with minimum cost",
          input: { points: [[0,0],[2,2],[3,10]] },
          expectedOutput: "12",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 7],
              shortLabel: "Generate & sort edges",
              explanation: "3 points → 3 edges. Distances: (0,0)↔(2,2)=4, (0,0)↔(3,10)=13, (2,2)↔(3,10)=9. Sorted: [4, 9, 13].",
              variables: { edges: "[(4,0,1), (9,1,2), (13,0,2)]" },
              dataStructure: { graphNodes: { 0: { state: "default" }, 1: { state: "default" }, 2: { state: "default" } }, graphEdges: [], dfsStack: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 14, 19],
              shortLabel: "Edge (0,1) cost=4: add",
              explanation: "Cheapest edge: (0,1) cost 4. Different components — add to MST. Total = 4. Edges used: 1.",
              variables: { cost: 4, u: 0, v: 1, total: 4, used: 1 },
              dataStructure: {
                graphNodes: { 0: { state: "active" }, 1: { state: "active" }, 2: { state: "default" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }],
                dfsStack: ["process(edge 0→1, cost=4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 14, 19],
              shortLabel: "Edge (1,2) cost=9: add → done",
              explanation: "Edge (1,2) cost 9. Different components — add. Total = 4+9 = 13. Edges used = 2 = n-1. MST complete!",
              variables: { cost: 9, u: 1, v: 2, total: 13, used: 2 },
              dataStructure: {
                graphNodes: { 0: { state: "found" }, 1: { state: "found" }, 2: { state: "found" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }],
                dfsStack: ["process(edge 1→2, cost=9)"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Two Points",
          description: "Only two points to connect",
          input: { points: [[0,0],[1,1]] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "One edge: cost 2",
              explanation: "Only 2 points → 1 edge. Manhattan distance = |0-1| + |0-1| = 2.",
              variables: { edges: "[(2,0,1)]" },
              dataStructure: { graphNodes: { 0: { state: "default" }, 1: { state: "default" } }, graphEdges: [], dfsStack: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 14],
              shortLabel: "Add edge → total = 2",
              explanation: "Add the only edge. Total cost = 2. MST complete with 1 edge = n-1.",
              variables: { total: 2 },
              dataStructure: {
                graphNodes: { 0: { state: "found" }, 1: { state: "found" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }],
                dfsStack: ["process(edge 0→1, cost=2)"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ points }) {
        const steps = [];
        const n = points.length;
        const edges = [];

        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            const cost = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
            edges.push([cost, i, j]);
          }
        }
        edges.sort((a, b) => a[0] - b[0]);

        const parent = Array.from({ length: n }, (_, i) => i);
        const rank = Array(n).fill(0);
        function find(x) {
          if (parent[x] !== x) parent[x] = find(parent[x]);
          return parent[x];
        }

        steps.push({
          stepId: 0, lineNumbers: [3, 7],
          shortLabel: `${edges.length} edges sorted`,
          explanation: `Generated ${edges.length} edges, sorted by cost.`,
          variables: { edgeCount: edges.length },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        let total = 0, used = 0;
        for (const [cost, u, v] of edges) {
          const ru = find(u), rv = find(v);
          if (ru !== rv) {
            if (rank[ru] < rank[rv]) parent[ru] = rv;
            else {
              parent[rv] = ru;
              if (rank[ru] === rank[rv]) rank[ru]++;
            }
            total += cost;
            used++;

            steps.push({
              stepId: steps.length, lineNumbers: [12, 14, 19],
              shortLabel: `Edge (${u},${v}) cost=${cost}: add`,
              explanation: `Add edge (${u},${v}) cost ${cost}. Total = ${total}. Edges used = ${used}/${n - 1}.`,
              variables: { cost, u, v, total, used },
              dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`process(edge ${u}→${v}, cost=${cost})`] },
              delta: {}, isAnswer: used === n - 1,
            });

            if (used === n - 1) break;
          }
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Prim's Algorithm",
      tier: "optimal",
      timeComplexity: "O(n² log n)",
      spaceComplexity: "O(n)",
      idea: "Start from point 0. Maintain min-heap of (cost, point). Always pick the cheapest unvisited point to add to MST.",

      javaCode: `public int minCostConnectPoints(int[][] points) {
    int n = points.length;
    boolean[] inMST = new boolean[n];
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{0, 0});
    int cost = 0, edges = 0;

    while (edges < n) {
        int[] curr = pq.poll();
        if (inMST[curr[1]]) continue;
        inMST[curr[1]] = true;
        cost += curr[0];
        edges++;

        for (int j = 0; j < n; j++) {
            if (!inMST[j]) {
                int dist = Math.abs(points[curr[1]][0]-points[j][0]) + Math.abs(points[curr[1]][1]-points[j][1]);
                pq.offer(new int[]{dist, j});
            }
        }
    }
    return cost;
}`,

      cppCode: `int minCostConnectPoints(vector<vector<int>>& points) {
    int n = points.size();
    vector<bool> inMST(n, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 0});
    int cost = 0, edges = 0;

    while (edges < n) {
        auto [d, u] = pq.top(); pq.pop();
        if (inMST[u]) continue;
        inMST[u] = true;
        cost += d;
        edges++;

        for (int j = 0; j < n; j++) {
            if (!inMST[j]) {
                int dist = abs(points[u][0]-points[j][0]) + abs(points[u][1]-points[j][1]);
                pq.push({dist, j});
            }
        }
    }
    return cost;
}`,

      pythonCode: `def minCostConnectPoints(points: List[List[int]]) -> int:
    n = len(points)
    in_mst = [False] * n
    heap = [(0, 0)]  # (cost, point_index)
    cost = 0
    edges = 0

    while edges < n:
        d, u = heapq.heappop(heap)
        if in_mst[u]:
            continue
        in_mst[u] = True
        cost += d
        edges += 1

        for j in range(n):
            if not in_mst[j]:
                dist = abs(points[u][0] - points[j][0]) + abs(points[u][1] - points[j][1])
                heapq.heappush(heap, (dist, j))

    return cost`,

      lineAnnotations: {
        3: "Track which points are in the MST",
        4: "Min-heap: (cost to connect, point index)",
        5: "Start from point 0 with cost 0",
        8: "Extract cheapest connection",
        9: "Skip if already in MST",
        10: "Add point to MST",
        14: "Add edges to all unvisited points",
        16: "Manhattan distance as edge weight",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Prim's",
          description: "Build MST for 3 points using Prim's",
          input: { points: [[0,0],[2,2],[3,10]] },
          expectedOutput: "13",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5],
              shortLabel: "Start at point 0",
              explanation: "Push (0, point 0) into heap. Point 0 at (0,0) is our starting point.",
              variables: { heap: "[(0,0)]", cost: 0, edges: 0 },
              dataStructure: { graphNodes: { 0: { state: "active" }, 1: { state: "default" }, 2: { state: "default" } }, graphEdges: [], dfsStack: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9, 10, 14],
              shortLabel: "Add point 0, cost 0",
              explanation: "Pop (0, 0). Add point 0 to MST. Push neighbors: (4, 1) and (13, 2).",
              variables: { popped: "(0,0)", cost: 0, edges: 1, heap: "[(4,1),(13,2)]" },
              dataStructure: {
                graphNodes: { 0: { state: "visited" }, 1: { state: "queued" }, 2: { state: "queued" } },
                graphEdges: [],
                dfsStack: ["prim: process(i=0, cost=0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9, 10, 14],
              shortLabel: "Add point 1, cost 4",
              explanation: "Pop (4, 1). Add point 1 to MST. Cost = 0 + 4 = 4. Push (9, 2) for point 2.",
              variables: { popped: "(4,1)", cost: 4, edges: 2, heap: "[(9,2),(13,2)]" },
              dataStructure: {
                graphNodes: { 0: { state: "visited" }, 1: { state: "visited" }, 2: { state: "queued" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }],
                dfsStack: ["prim: process(i=1, cost=4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9, 10],
              shortLabel: "Add point 2, cost 9 → total 13",
              explanation: "Pop (9, 2). Add point 2 to MST. Cost = 4 + 9 = 13. All 3 points connected!",
              variables: { popped: "(9,2)", cost: 13, edges: 3 },
              dataStructure: {
                graphNodes: { 0: { state: "found" }, 1: { state: "found" }, 2: { state: "found" } },
                graphEdges: [{ from: "0", to: "1", state: "traversed" }, { from: "1", to: "2", state: "traversed" }],
                dfsStack: ["prim: process(i=2, cost=9)"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Point",
          description: "Only one point — no edges needed",
          input: { points: [[0,0]] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5, 8, 10],
              shortLabel: "Single point → cost 0",
              explanation: "Only one point. Pop (0,0), add to MST. edges=1=n. Total cost = 0.",
              variables: { cost: 0, edges: 1 },
              dataStructure: { graphNodes: { 0: { state: "found" } }, graphEdges: [], dfsStack: ["prim: process(i=0, cost=0)"] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ points }) {
        const steps = [];
        const n = points.length;
        const inMST = Array(n).fill(false);
        // Simple min-heap simulation with array
        const heap = [[0, 0]];
        let cost = 0, edges = 0;

        steps.push({
          stepId: 0, lineNumbers: [4, 5],
          shortLabel: "Start at point 0",
          explanation: `Initialize heap with (0, point 0). Build MST for ${n} points.`,
          variables: { heap: "[(0,0)]", cost: 0 },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        while (edges < n && heap.length > 0) {
          heap.sort((a, b) => a[0] - b[0]);
          const [d, u] = heap.shift();
          if (inMST[u]) continue;
          inMST[u] = true;
          cost += d;
          edges++;

          steps.push({
            stepId: steps.length, lineNumbers: [8, 10],
            shortLabel: `Add point ${u}, cost ${d}`,
            explanation: `Add point ${u} to MST. Edge cost = ${d}. Total = ${cost}. Points in MST: ${edges}/${n}.`,
            variables: { point: u, edgeCost: d, totalCost: cost, edges },
            dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`prim: process(i=${u}, cost=${d})`] },
            delta: {}, isAnswer: edges === n,
          });

          if (edges === n) break;

          for (let j = 0; j < n; j++) {
            if (!inMST[j]) {
              const dist = Math.abs(points[u][0] - points[j][0]) + Math.abs(points[u][1] - points[j][1]);
              heap.push([dist, j]);
            }
          }
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n² log n)", space: "O(n²)", explanation: "Generate all edges, sort, process with Union-Find" },
    optimal: { time: "O(n² log n)", space: "O(n)", explanation: "Prim's with heap — dense graph so similar time, but less space", tradeoff: "Prim's avoids storing all edges upfront" },
  },

  interviewTips: [
    "Identify this as MST immediately — connect all nodes with minimum total cost.",
    "Mention both Kruskal's (sort edges + Union-Find) and Prim's (min-heap) approaches.",
    "For dense graphs (complete graph), Prim's is often better — avoids sorting O(n²) edges.",
    "Manhattan distance |x1-x2| + |y1-y2| is the edge weight, not Euclidean.",
    "MST always has exactly n-1 edges for n nodes — use this as a termination condition.",
  ],

  relatedProblems: ["network-delay-time", "swim-in-rising-water", "cheapest-flights-k-stops"],
};
