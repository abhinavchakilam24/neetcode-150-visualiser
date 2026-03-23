export const networkDelayTime = {
  id: 95,
  slug: "network-delay-time",
  title: "Network Delay Time",
  difficulty: "Medium",
  topic: "advanced-graphs",
  topicLabel: "Advanced Graphs",
  neetcodeNumber: 95,
  artifactType: "GraphDFS",
  companies: ["Amazon", "Google", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/network-delay-time/",

  pattern: "Dijkstra's Shortest Path",
  patternExplanation: `Find the shortest path from a source to all other nodes in a weighted graph.
    The answer is the maximum shortest distance — the last node to receive the signal determines total delay.`,

  intuition: {
    coreInsight: `A signal travels from source node k at time 0. It reaches each node via the shortest path.
      The total time for all nodes to receive the signal equals the maximum shortest-path distance from k.
      If any node is unreachable, return -1. Dijkstra's algorithm finds shortest paths efficiently.`,

    mentalModel: `Imagine dropping a stone into a pond. Ripples spread outward at a constant speed, but some
      channels are narrower (longer travel time). The ripple reaches each point at its shortest-path time.
      We want to know when the LAST ripple arrives — that's when all nodes have been "reached." Dijkstra's
      simulates this ripple by always processing the nearest unvisited node first.`,

    whyNaiveFails: `BFS works for unweighted graphs, but here edges have different weights. BFS would treat
      all edges equally and might find a path through many short edges before finding a single long edge.
      Dijkstra's uses a priority queue to always process the node with the smallest known distance.`,

    keyObservation: `Dijkstra's guarantees that when a node is popped from the min-heap, we've found the
      shortest path to it. So we can skip any node that's already been processed. The answer is simply
      the maximum distance among all processed nodes — or -1 if we couldn't reach all n nodes.`,
  },

  problem: `You are given a network of n nodes labeled 1 to n. You are given times, a list of travel times
    as directed edges times[i] = (ui, vi, wi) where ui is source, vi is target, and wi is the time
    for a signal to travel from source to target. We send a signal from node k. Return the minimum
    time for all n nodes to receive the signal, or -1 if not all nodes can be reached.`,

  examples: [
    { input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", output: "2", explanation: "Signal: 2→1 (t=1), 2→3 (t=1), 3→4 (t=2). Max = 2." },
    { input: "times = [[1,2,1]], n = 2, k = 2", output: "-1", explanation: "Node 2 can't reach node 1" },
  ],

  constraints: [
    "1 <= k <= n <= 100",
    "1 <= times.length <= 6000",
    "1 <= ui, vi <= n",
    "0 <= wi <= 100",
  ],

  approaches: {
    brute: {
      label: "Bellman-Ford",
      tier: "brute",
      timeComplexity: "O(n × e)",
      spaceComplexity: "O(n)",
      idea: "Relax all edges n-1 times. Each relaxation pass may update shortest distances. After n-1 passes, all shortest paths are found.",

      javaCode: `public int networkDelayTime(int[][] times, int n, int k) {
    int[] dist = new int[n + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;

    for (int i = 0; i < n - 1; i++) {
        for (int[] t : times) {
            int u = t[0], v = t[1], w = t[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    int maxDist = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == Integer.MAX_VALUE) return -1;
        maxDist = Math.max(maxDist, dist[i]);
    }
    return maxDist;
}`,

      cppCode: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    vector<int> dist(n + 1, INT_MAX);
    dist[k] = 0;

    for (int i = 0; i < n - 1; i++) {
        for (auto& t : times) {
            int u = t[0], v = t[1], w = t[2];
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    int maxDist = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == INT_MAX) return -1;
        maxDist = max(maxDist, dist[i]);
    }
    return maxDist;
}`,

      pythonCode: `def networkDelayTime(times: List[List[int]], n: int, k: int) -> int:
    dist = [float('inf')] * (n + 1)
    dist[k] = 0

    for _ in range(n - 1):
        for u, v, w in times:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    max_dist = 0
    for i in range(1, n + 1):
        if dist[i] == float('inf'):
            return -1
        max_dist = max(max_dist, dist[i])
    return max_dist`,

      lineAnnotations: {
        2: "Initialize all distances to infinity",
        3: "Source node distance is 0",
        5: "Repeat n-1 times (longest possible shortest path has n-1 edges)",
        6: "Try relaxing every edge",
        8: "If we can reach v faster through u, update dist[v]",
        14: "Find maximum distance — last node to receive signal",
        15: "If any node unreachable, return -1",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Signal from node 2 in a 4-node graph",
          input: { times: [[2,1,1],[2,3,1],[3,4,1]], n: 4, k: 2 },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: dist[2]=0, rest=∞",
              explanation: "Set dist[2]=0 (source). All other nodes have distance infinity.",
              variables: { dist: "[_,∞,0,∞,∞]", k: 2 },
              dataStructure: {
                graphNodes: { 1: { state: "default" }, 2: { state: "active" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [{ from: "2", to: "1", state: "default" }, { from: "2", to: "3", state: "default" }, { from: "3", to: "4", state: "default" }],
                dfsStack: ["bellmanFord(src=2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 8],
              shortLabel: "Pass 1: relax all edges",
              explanation: "Edge 2→1: dist[1] = min(∞, 0+1) = 1. Edge 2→3: dist[3] = min(∞, 0+1) = 1. Edge 3→4: dist[4] = min(∞, 1+1) = 2.",
              variables: { pass: 1, dist: "[_,1,0,1,2]" },
              dataStructure: {
                graphNodes: { 1: { state: "visited" }, 2: { state: "visited" }, 3: { state: "visited" }, 4: { state: "visited" } },
                graphEdges: [{ from: "2", to: "1", state: "traversed" }, { from: "2", to: "3", state: "traversed" }, { from: "3", to: "4", state: "traversed" }],
                dfsStack: ["bellmanFord(src=2)", "pass=1: relax(2→1)", "relax(2→3)", "relax(3→4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [14, 15, 17],
              shortLabel: "Max dist = 2 → Return 2",
              explanation: "All nodes reachable. Distances: [1, 0, 1, 2]. Max = 2 (node 4). Signal reaches all nodes by time 2.",
              variables: { dist: "[_,1,0,1,2]", maxDist: 2 },
              dataStructure: {
                graphNodes: { 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" }, 4: { state: "found" } },
                graphEdges: [{ from: "2", to: "1", state: "traversed" }, { from: "2", to: "3", state: "traversed" }, { from: "3", to: "4", state: "traversed" }],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Unreachable Node",
          description: "Not all nodes can be reached",
          input: { times: [[1,2,1]], n: 2, k: 2 },
          expectedOutput: "-1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: dist[2]=0",
              explanation: "Source is node 2. Only edge is 1→2 (wrong direction for us).",
              variables: { dist: "[_,∞,0]", k: 2 },
              dataStructure: {
                graphNodes: { 1: { state: "default" }, 2: { state: "active" } },
                graphEdges: [{ from: "1", to: "2", state: "default" }],
                dfsStack: ["bellmanFord(src=2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 14, 15],
              shortLabel: "Node 1 unreachable → -1",
              explanation: "After all passes, dist[1] is still infinity. Edge 1→2 can't help us reach node 1 from node 2. Return -1.",
              variables: { dist: "[_,∞,0]", answer: -1 },
              dataStructure: {
                graphNodes: { 1: { state: "eliminated" }, 2: { state: "visited" } },
                graphEdges: [{ from: "1", to: "2", state: "default" }],
                dfsStack: ["node 1 unreachable!"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ times, n, k }) {
        const steps = [];
        const dist = Array(n + 1).fill(Infinity);
        dist[k] = 0;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `Init: dist[${k}]=0`,
          explanation: `Source node ${k}. All others start at infinity.`,
          variables: { k, dist: JSON.stringify(dist.slice(1).map(d => d === Infinity ? "∞" : d)) },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`bellmanFord(src=${k})`] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n - 1; i++) {
          let updated = false;
          for (const [u, v, w] of times) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
              dist[v] = dist[u] + w;
              updated = true;
            }
          }
          if (updated) {
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6, 8],
              shortLabel: `Pass ${i + 1}: distances updated`,
              explanation: `Relaxation pass ${i + 1}. Current distances: [${dist.slice(1).map(d => d === Infinity ? "∞" : d).join(",")}].`,
              variables: { pass: i + 1, dist: JSON.stringify(dist.slice(1).map(d => d === Infinity ? "∞" : d)) },
              dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`bellmanFord(src=${k})`, `pass ${i+1}: relaxing edges`] },
              delta: {}, isAnswer: false,
            });
          }
          if (!updated) break;
        }

        let maxDist = 0;
        for (let i = 1; i <= n; i++) {
          if (dist[i] === Infinity) {
            steps.push({
              stepId: steps.length, lineNumbers: [15],
              shortLabel: `Node ${i} unreachable → -1`,
              explanation: `Node ${i} is unreachable from node ${k}. Return -1.`,
              variables: { answer: -1 },
              dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`node ${i} unreachable!`] },
              delta: {}, isAnswer: true,
            });
            return steps;
          }
          maxDist = Math.max(maxDist, dist[i]);
        }

        steps.push({
          stepId: steps.length, lineNumbers: [17],
          shortLabel: `Max dist = ${maxDist}`,
          explanation: `All nodes reachable. Maximum distance = ${maxDist}. Return ${maxDist}.`,
          variables: { maxDist, answer: maxDist },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Dijkstra's Algorithm",
      tier: "optimal",
      timeComplexity: "O((n + e) log n)",
      spaceComplexity: "O(n + e)",
      idea: "Use min-heap to always process the nearest unvisited node. When all nodes processed, return the maximum distance.",

      javaCode: `public int networkDelayTime(int[][] times, int n, int k) {
    Map<Integer, List<int[]>> adj = new HashMap<>();
    for (int[] t : times)
        adj.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{0, k});
    Map<Integer, Integer> dist = new HashMap<>();

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (dist.containsKey(u)) continue;
        dist.put(u, d);
        if (adj.containsKey(u)) {
            for (int[] nei : adj.get(u)) {
                if (!dist.containsKey(nei[0])) {
                    pq.offer(new int[]{d + nei[1], nei[0]});
                }
            }
        }
    }
    return dist.size() == n ? Collections.max(dist.values()) : -1;
}`,

      cppCode: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    unordered_map<int, vector<pair<int,int>>> adj;
    for (auto& t : times)
        adj[t[0]].push_back({t[1], t[2]});

    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, k});
    unordered_map<int, int> dist;

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (dist.count(u)) continue;
        dist[u] = d;
        for (auto& [v, w] : adj[u]) {
            if (!dist.count(v)) {
                pq.push({d + w, v});
            }
        }
    }
    int maxDist = 0;
    for (auto& [_, d] : dist) maxDist = max(maxDist, d);
    return dist.size() == n ? maxDist : -1;
}`,

      pythonCode: `def networkDelayTime(times: List[List[int]], n: int, k: int) -> int:
    adj = defaultdict(list)
    for u, v, w in times:
        adj[u].append((v, w))

    heap = [(0, k)]
    dist = {}

    while heap:
        d, u = heapq.heappop(heap)
        if u in dist:
            continue
        dist[u] = d
        for v, w in adj[u]:
            if v not in dist:
                heapq.heappush(heap, (d + w, v))

    return max(dist.values()) if len(dist) == n else -1`,

      lineAnnotations: {
        2: "Build adjacency list from edge list",
        5: "Min-heap: (distance from source, node)",
        6: "Start at source k with distance 0",
        9: "Extract node with smallest distance",
        11: "Skip if already finalized",
        12: "Record shortest distance to this node",
        14: "Push unvisited neighbors with updated distances",
        19: "Return max distance if all nodes reached, else -1",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Dijkstra from node 2",
          input: { times: [[2,1,1],[2,3,1],[3,4,1]], n: 4, k: 2 },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 5, 6],
              shortLabel: "Init: heap = [(0,2)]",
              explanation: "Build adjacency list. Push source node 2 with distance 0 into min-heap.",
              variables: { heap: "[(0,2)]", dist: "{}" },
              dataStructure: {
                graphNodes: { 1: { state: "default" }, 2: { state: "active" }, 3: { state: "default" }, 4: { state: "default" } },
                graphEdges: [{ from: "2", to: "1", state: "default" }, { from: "2", to: "3", state: "default" }, { from: "3", to: "4", state: "default" }],
                dfsStack: ["dijkstra(2,d=0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [9, 11, 12, 14],
              shortLabel: "Pop (0,2): dist[2]=0",
              explanation: "Pop (0,2). Node 2 not in dist. Set dist[2]=0. Push neighbors: (1,1) and (1,3).",
              variables: { d: 0, u: 2, dist: "{2:0}", heap: "[(1,1),(1,3)]" },
              dataStructure: {
                graphNodes: { 1: { state: "queued" }, 2: { state: "visited" }, 3: { state: "queued" }, 4: { state: "default" } },
                graphEdges: [{ from: "2", to: "1", state: "traversed" }, { from: "2", to: "3", state: "traversed" }, { from: "3", to: "4", state: "default" }],
                dfsStack: ["dijkstra(2,d=0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 11, 12],
              shortLabel: "Pop (1,1): dist[1]=1",
              explanation: "Pop (1,1). Node 1 not in dist. Set dist[1]=1. Node 1 has no outgoing edges.",
              variables: { d: 1, u: 1, dist: "{2:0, 1:1}" },
              dataStructure: {
                graphNodes: { 1: { state: "visited" }, 2: { state: "visited" }, 3: { state: "queued" }, 4: { state: "default" } },
                graphEdges: [{ from: "2", to: "1", state: "traversed" }],
                dfsStack: ["dijkstra(2,d=0)", "dijkstra(1,d=1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9, 11, 12, 14],
              shortLabel: "Pop (1,3): dist[3]=1",
              explanation: "Pop (1,3). Node 3 not in dist. Set dist[3]=1. Push neighbor: (2,4).",
              variables: { d: 1, u: 3, dist: "{2:0, 1:1, 3:1}", heap: "[(2,4)]" },
              dataStructure: {
                graphNodes: { 1: { state: "visited" }, 2: { state: "visited" }, 3: { state: "visited" }, 4: { state: "queued" } },
                graphEdges: [{ from: "3", to: "4", state: "traversed" }],
                dfsStack: ["dijkstra(2,d=0)", "dijkstra(1,d=1)", "dijkstra(3,d=1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 11, 12, 19],
              shortLabel: "Pop (2,4): dist[4]=2 → max=2",
              explanation: "Pop (2,4). Set dist[4]=2. All 4 nodes reached. Max distance = 2 (node 4). Return 2.",
              variables: { d: 2, u: 4, dist: "{2:0, 1:1, 3:1, 4:2}", answer: 2 },
              dataStructure: {
                graphNodes: { 1: { state: "found" }, 2: { state: "found" }, 3: { state: "found" }, 4: { state: "found" } },
                graphEdges: [{ from: "2", to: "1", state: "traversed" }, { from: "2", to: "3", state: "traversed" }, { from: "3", to: "4", state: "traversed" }],
                dfsStack: ["dijkstra(2,d=0)", "dijkstra(1,d=1)", "dijkstra(3,d=1)", "dijkstra(4,d=2)"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Unreachable",
          description: "Node cannot be reached from source",
          input: { times: [[1,2,1]], n: 2, k: 2 },
          expectedOutput: "-1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6],
              shortLabel: "Init: heap = [(0,2)]",
              explanation: "Source is node 2. Only edge is 1→2, so node 2 can't reach node 1.",
              variables: { heap: "[(0,2)]" },
              dataStructure: {
                graphNodes: { 1: { state: "default" }, 2: { state: "active" } },
                graphEdges: [{ from: "1", to: "2", state: "default" }],
                dfsStack: ["dijkstra(2,d=0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [9, 12],
              shortLabel: "Pop (0,2): dist[2]=0",
              explanation: "Process node 2. No outgoing edges from 2. Heap is empty.",
              variables: { dist: "{2:0}" },
              dataStructure: {
                graphNodes: { 1: { state: "eliminated" }, 2: { state: "visited" } },
                graphEdges: [],
                dfsStack: ["dijkstra(2,d=0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19],
              shortLabel: "Only 1/2 nodes reached → -1",
              explanation: "dist has 1 node but n=2. Node 1 is unreachable. Return -1.",
              variables: { nodesReached: 1, n: 2, answer: -1 },
              dataStructure: {
                graphNodes: { 1: { state: "eliminated" }, 2: { state: "visited" } },
                graphEdges: [],
                dfsStack: ["node 1 unreachable!"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ times, n, k }) {
        const steps = [];
        const adj = {};
        for (const [u, v, w] of times) {
          if (!adj[u]) adj[u] = [];
          adj[u].push([v, w]);
        }

        const heap = [[0, k]];
        const dist = {};

        const processingOrder = [];
        steps.push({
          stepId: 0, lineNumbers: [2, 5, 6],
          shortLabel: `Init: heap = [(0,${k})]`,
          explanation: `Build graph. Start Dijkstra from node ${k}.`,
          variables: { k, heap: `[(0,${k})]` },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`dijkstra(${k},d=0)`] },
          delta: {}, isAnswer: false,
        });

        while (heap.length > 0) {
          heap.sort((a, b) => a[0] - b[0]);
          const [d, u] = heap.shift();
          if (dist[u] !== undefined) continue;
          dist[u] = d;
          processingOrder.push(`dijkstra(${u},d=${d})`);

          const neighbors = adj[u] || [];
          for (const [v, w] of neighbors) {
            if (dist[v] === undefined) {
              heap.push([d + w, v]);
            }
          }

          steps.push({
            stepId: steps.length, lineNumbers: [9, 12, 14],
            shortLabel: `Pop (${d},${u}): dist[${u}]=${d}`,
            explanation: `Process node ${u} with distance ${d}. ${Object.keys(dist).length}/${n} nodes finalized.`,
            variables: { d, u, dist: JSON.stringify(dist) },
            dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [...processingOrder] },
            delta: {}, isAnswer: false,
          });
        }

        const reached = Object.keys(dist).length;
        if (reached === n) {
          const maxDist = Math.max(...Object.values(dist));
          steps.push({
            stepId: steps.length, lineNumbers: [19],
            shortLabel: `All reached → max = ${maxDist}`,
            explanation: `All ${n} nodes reached. Maximum distance = ${maxDist}. Return ${maxDist}.`,
            variables: { answer: maxDist },
            dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
            delta: {}, isAnswer: true,
          });
        } else {
          steps.push({
            stepId: steps.length, lineNumbers: [19],
            shortLabel: `${reached}/${n} reached → -1`,
            explanation: `Only ${reached} of ${n} nodes reached. Return -1.`,
            variables: { answer: -1 },
            dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: ["some nodes unreachable!"] },
            delta: {}, isAnswer: true,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n × e)", space: "O(n)", explanation: "Bellman-Ford: n-1 passes over all edges" },
    optimal: { time: "O((n + e) log n)", space: "O(n + e)", explanation: "Dijkstra with binary heap — each node/edge processed once with log n heap ops", tradeoff: "Dijkstra is faster but requires non-negative weights" },
  },

  interviewTips: [
    "Immediately identify this as a shortest-path problem — Dijkstra's is the go-to for non-negative weights.",
    "Mention Bellman-Ford as an alternative that handles negative weights.",
    "The key insight is that the answer is max(shortest distances), not the sum.",
    "Discuss the lazy deletion approach: skip already-processed nodes when popping from heap.",
    "Edge case: if dist map size < n after Dijkstra, some nodes are unreachable → return -1.",
  ],

  relatedProblems: ["cheapest-flights-k-stops", "swim-in-rising-water", "min-cost-connect-points"],
};
