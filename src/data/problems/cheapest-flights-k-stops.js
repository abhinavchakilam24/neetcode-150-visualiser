export const cheapestFlightsKStops = {
  id: 98,
  slug: "cheapest-flights-k-stops",
  title: "Cheapest Flights Within K Stops",
  difficulty: "Medium",
  topic: "advanced-graphs",
  topicLabel: "Advanced Graphs",
  neetcodeNumber: 98,
  artifactType: "GraphDFS",
  companies: ["Amazon", "Google", "Meta", "Bloomberg", "Airbnb"],
  leetcodeLink: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",

  pattern: "Bellman-Ford with K+1 Relaxation Rounds",
  patternExplanation: `When finding shortest paths with a constraint on the number of edges (stops),
    Bellman-Ford is ideal: run exactly K+1 rounds of relaxation over all edges. Each round extends
    paths by one edge. After K+1 rounds, the shortest path using at most K+1 edges (K stops) is found.`,

  intuition: {
    coreInsight: `Bellman-Ford naturally builds shortest paths by number of edges used. After round 1,
      we know the cheapest direct flights. After round 2, the cheapest routes with one stop. After
      round K+1, the cheapest routes with at most K stops. By limiting to K+1 rounds instead of
      the usual n-1, we get the constraint for free.`,

    mentalModel: `Imagine you're a travel agent planning a trip with a budget airline that charges per
      leg. Your client says: "I can tolerate at most K layovers." You check: what's the cheapest
      direct flight? Then: what if I allow one layover — can I find something cheaper by connecting
      through another city? Each round you add one more allowed layover and check if any route
      improves. After K+1 rounds, you've explored every possibility within the client's patience.`,

    whyNaiveFails: `Dijkstra's algorithm finds shortest paths greedily, but it doesn't naturally
      limit the number of edges. You could modify it with a (cost, node, stops) tuple in the
      priority queue, but this can lead to exploring exponentially many states. BFS on unweighted
      graphs doesn't account for varying edge weights. Bellman-Ford's round-by-round approach is
      the cleanest way to incorporate the "at most K stops" constraint.`,

    keyObservation: `When relaxing edges in round i, we must use the distances from round i-1 (not
      the current round's partially-updated distances). If we update in-place, a chain of relaxations
      in a single round could use more edges than allowed. Copying the previous round's distances
      before each round prevents this subtle bug.`,
  },

  problem: `There are n cities connected by some number of flights. You are given an array flights
    where flights[i] = [from_i, to_i, price_i] indicates that there is a flight from city from_i
    to city to_i with cost price_i. You are also given three integers src, dst, and k. Return the
    cheapest price from src to dst with at most k stops. If there is no such route, return -1.`,

  examples: [
    { input: "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1", output: "700", explanation: "The cheapest route 0 → 1 → 3 costs 100 + 600 = 700 with 1 stop." },
    { input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1", output: "200", explanation: "0 → 1 → 2 costs 200 with 1 stop, cheaper than the direct flight of 500." },
    { input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0", output: "500", explanation: "With 0 stops, only direct flights work. 0 → 2 costs 500." },
  ],

  constraints: [
    "1 <= n <= 100",
    "0 <= flights.length <= n * (n - 1) / 2",
    "flights[i].length == 3",
    "0 <= from_i, to_i < n",
    "from_i != to_i",
    "1 <= price_i <= 10^4",
    "0 <= src, dst, k < n",
    "src != dst",
  ],

  approaches: {
    brute: {
      label: "DFS with Pruning",
      tier: "brute",
      timeComplexity: "O(n^k)",
      spaceComplexity: "O(n)",
      idea: "DFS from src exploring all paths up to K+1 edges. Track the minimum cost path that reaches dst. Prune branches exceeding the current minimum.",

      javaCode: `class Solution {
    int minCost = Integer.MAX_VALUE;

    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        Map<Integer, List<int[]>> graph = new HashMap<>();
        for (int[] f : flights) {
            graph.computeIfAbsent(f[0], x -> new ArrayList<>()).add(new int[]{f[1], f[2]});
        }
        boolean[] visited = new boolean[n];
        dfs(graph, visited, src, dst, k + 1, 0);
        return minCost == Integer.MAX_VALUE ? -1 : minCost;
    }

    void dfs(Map<Integer, List<int[]>> graph, boolean[] visited, int node, int dst, int stops, int cost) {
        if (node == dst) { minCost = Math.min(minCost, cost); return; }
        if (stops == 0 || cost >= minCost) return;
        visited[node] = true;
        for (int[] next : graph.getOrDefault(node, new ArrayList<>())) {
            if (!visited[next[0]]) {
                dfs(graph, visited, next[0], dst, stops - 1, cost + next[1]);
            }
        }
        visited[node] = false;
    }
}`,

      cppCode: `class Solution {
public:
    int minCost = INT_MAX;

    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        unordered_map<int, vector<pair<int,int>>> graph;
        for (auto& f : flights) {
            graph[f[0]].push_back({f[1], f[2]});
        }
        vector<bool> visited(n, false);
        dfs(graph, visited, src, dst, k + 1, 0);
        return minCost == INT_MAX ? -1 : minCost;
    }

    void dfs(unordered_map<int, vector<pair<int,int>>>& graph, vector<bool>& visited,
             int node, int dst, int stops, int cost) {
        if (node == dst) { minCost = min(minCost, cost); return; }
        if (stops == 0 || cost >= minCost) return;
        visited[node] = true;
        for (auto& [next, price] : graph[node]) {
            if (!visited[next]) {
                dfs(graph, visited, next, dst, stops - 1, cost + price);
            }
        }
        visited[node] = false;
    }
};`,

      pythonCode: `def findCheapestPrice(n, flights, src, dst, k):
    graph = defaultdict(list)
    for u, v, w in flights:
        graph[u].append((v, w))
    min_cost = [float('inf')]

    def dfs(node, stops, cost):
        if node == dst:
            min_cost[0] = min(min_cost[0], cost)
            return
        if stops == 0 or cost >= min_cost[0]:
            return
        for next_node, price in graph[node]:
            dfs(next_node, stops - 1, cost + price)

    dfs(src, k + 1, 0)
    return min_cost[0] if min_cost[0] != float('inf') else -1`,

      lineAnnotations: {
        2: "Track global minimum cost found so far",
        5: "Build adjacency list from flights array",
        10: "Start DFS from source with k+1 allowed edges",
        14: "Reached destination — update minimum cost",
        15: "Prune: no stops left or cost already exceeds best",
        17: "Explore all neighbors recursively",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 1 },
          expectedOutput: "200",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5],
              shortLabel: "Build graph",
              explanation: "Build adjacency list. 0→[(1,100),(2,500)], 1→[(2,100)]. We need cheapest route from 0 to 2 with at most 1 stop.",
              variables: { src: 0, dst: 2, k: 1, minCost: "INF" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 50, y: 150 },
                  1: { state: "default", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: ["0"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [17, 18],
              shortLabel: "DFS: 0 → 1 (cost=100)",
              explanation: "From node 0, try neighbor 1 with cost 100. We've used 1 edge, 0 stops remaining after this move (we started with k+1=2 edges allowed).",
              variables: { node: 1, stops: 1, cost: 100, minCost: "INF" },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 50, y: 150 },
                  1: { state: "active", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: ["0", "1"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [17, 18, 14],
              shortLabel: "DFS: 1 → 2 (cost=200) → dst!",
              explanation: "From node 1, go to neighbor 2 with cost 100+100=200. Node 2 is the destination! Update minCost = 200.",
              variables: { node: 2, stops: 0, cost: 200, minCost: 200 },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 50, y: 150 },
                  1: { state: "visited", x: 200, y: 50 },
                  2: { state: "found", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "traversed", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: ["0", "1", "2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [17, 18],
              shortLabel: "Backtrack, try 0 → 2 (cost=500)",
              explanation: "Backtrack to node 0. Try direct flight 0→2 with cost 500. Node 2 is destination, but 500 > 200 (current min). minCost stays 200.",
              variables: { node: 2, stops: 1, cost: 500, minCost: 200 },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 50, y: 150 },
                  1: { state: "default", x: 200, y: 50 },
                  2: { state: "active", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "traversed", label: "500" },
                ],
                dfsStack: ["0", "2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11],
              shortLabel: "Return 200",
              explanation: "All paths explored. The cheapest route is 0→1→2 costing 200, which uses 1 stop (within the limit of k=1). Return 200.",
              variables: { answer: 200 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "found", x: 200, y: 50 },
                  2: { state: "found", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "traversed", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n, flights, src, dst, k }) {
        const steps = [];
        steps.push({
          stepId: 0, lineNumbers: [5],
          shortLabel: "Build graph",
          explanation: `Build adjacency list from ${flights.length} flights. Find cheapest route from ${src} to ${dst} with at most ${k} stops.`,
          variables: { src, dst, k, minCost: "INF" },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [String(src)] },
          delta: {}, isAnswer: false,
        });
        // Simplified dynamic computation
        const prices = new Array(n).fill(Infinity);
        prices[src] = 0;
        let result = -1;
        for (let i = 0; i <= k; i++) {
          const temp = [...prices];
          for (const [u, v, w] of flights) {
            if (prices[u] !== Infinity && prices[u] + w < temp[v]) {
              temp[v] = prices[u] + w;
            }
          }
          for (let j = 0; j < n; j++) prices[j] = temp[j];
        }
        result = prices[dst] === Infinity ? -1 : prices[dst];
        steps.push({
          stepId: 1, lineNumbers: [11],
          shortLabel: result === -1 ? "No route found" : `Return ${result}`,
          explanation: result === -1 ? "No route exists within the stop limit." : `Cheapest route costs ${result}.`,
          variables: { answer: result },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Bellman-Ford (K+1 Rounds)",
      tier: "optimal",
      timeComplexity: "O(K * E)",
      spaceComplexity: "O(n)",
      idea: `Run Bellman-Ford for exactly K+1 rounds. In each round, relax all edges using
        the previous round's distances (copy before relaxing). After K+1 rounds, prices[dst]
        holds the cheapest price reachable within K stops.`,

      javaCode: `public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    int[] prices = new int[n];
    Arrays.fill(prices, Integer.MAX_VALUE);
    prices[src] = 0;

    for (int i = 0; i <= k; i++) {
        int[] temp = prices.clone();
        for (int[] flight : flights) {
            int u = flight[0], v = flight[1], w = flight[2];
            if (prices[u] != Integer.MAX_VALUE && prices[u] + w < temp[v]) {
                temp[v] = prices[u] + w;
            }
        }
        prices = temp;
    }

    return prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];
}`,

      cppCode: `int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<int> prices(n, INT_MAX);
    prices[src] = 0;

    for (int i = 0; i <= k; i++) {
        vector<int> temp(prices);
        for (auto& f : flights) {
            int u = f[0], v = f[1], w = f[2];
            if (prices[u] != INT_MAX && prices[u] + w < temp[v]) {
                temp[v] = prices[u] + w;
            }
        }
        prices = temp;
    }

    return prices[dst] == INT_MAX ? -1 : prices[dst];
}`,

      pythonCode: `def findCheapestPrice(n, flights, src, dst, k):
    prices = [float('inf')] * n
    prices[src] = 0

    for i in range(k + 1):
        temp = prices.copy()
        for u, v, w in flights:
            if prices[u] != float('inf') and prices[u] + w < temp[v]:
                temp[v] = prices[u] + w
        prices = temp

    return prices[dst] if prices[dst] != float('inf') else -1`,

      lineAnnotations: {
        2: "Initialize all cities with infinite cost",
        3: "Source city costs 0 to reach",
        5: "Run exactly K+1 relaxation rounds",
        6: "CRITICAL: copy prices from previous round to avoid using this round's updates",
        8: "For each flight edge (u → v, cost w)",
        9: "If source city u is reachable AND going through u is cheaper",
        10: "Update temp[v] — this path uses one more edge",
        15: "After K+1 rounds, return cost to dst (or -1 if unreachable)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "3 cities, connecting flight cheaper than direct — demonstrates K limits relaxation rounds",
          input: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 1 },
          expectedOutput: "200",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init prices",
              explanation: "Initialize prices array: all cities cost infinity except source (city 0) which costs 0. We'll run k+1 = 2 rounds of relaxation.",
              variables: { prices: "[0, INF, INF]", round: "-", k: 1 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "default", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Round 1: copy prices",
              explanation: "Round 1 (i=0). Copy prices to temp = [0, INF, INF]. We'll relax all edges using the ORIGINAL prices, not the updated ones — this is the key to limiting to K stops.",
              variables: { prices: "[0, INF, INF]", temp: "[0, INF, INF]", round: 1 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "default", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9, 10],
              shortLabel: "Relax 0→1: temp[1]=100",
              explanation: "Edge 0→1 (cost 100). prices[0]=0 is not INF and 0+100=100 < INF=temp[1]. Update temp[1]=100. City 1 is now reachable with 1 direct flight.",
              variables: { edge: "0→1", "prices[0]": 0, w: 100, "temp[1]": 100, round: 1 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "active", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9],
              shortLabel: "Relax 1→2: skip (prices[1]=INF)",
              explanation: "Edge 1→2 (cost 100). prices[1]=INF — city 1 wasn't reachable in the PREVIOUS round. Skip. This is why we use prices (not temp): temp[1] is already 100, but using it would allow a 2-edge path in a single round.",
              variables: { edge: "1→2", "prices[1]": "INF", "temp[2]": "INF", round: 1 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "active", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "eliminated", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 9, 10],
              shortLabel: "Relax 0→2: temp[2]=500",
              explanation: "Edge 0→2 (cost 500). prices[0]=0 and 0+500=500 < INF=temp[2]. Update temp[2]=500. City 2 is reachable directly for 500.",
              variables: { edge: "0→2", "prices[0]": 0, w: 500, "temp[2]": 500, round: 1 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "visited", x: 200, y: 50 },
                  2: { state: "active", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "traversed", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13],
              shortLabel: "Round 1 done: prices=[0,100,500]",
              explanation: "Round 1 complete. Copy temp to prices. prices = [0, 100, 500]. After 1 round, we know cheapest 1-edge paths: city 1 costs 100, city 2 costs 500 (direct flight).",
              variables: { prices: "[0, 100, 500]", round: "1 done" },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "visited", x: 200, y: 50 },
                  2: { state: "visited", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [5, 6],
              shortLabel: "Round 2: copy prices",
              explanation: "Round 2 (i=1). Copy prices to temp = [0, 100, 500]. Now we'll check if 2-edge paths improve anything.",
              variables: { prices: "[0, 100, 500]", temp: "[0, 100, 500]", round: 2 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "visited", x: 200, y: 50 },
                  2: { state: "visited", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [8, 9],
              shortLabel: "Relax 0→1: no improvement",
              explanation: "Edge 0→1. prices[0]+100=100 = temp[1]=100. No improvement. Skip.",
              variables: { edge: "0→1", "temp[1]": 100, round: 2 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "visited", x: 200, y: 50 },
                  2: { state: "visited", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "eliminated", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [8, 9, 10],
              shortLabel: "Relax 1→2: 100+100=200 < 500!",
              explanation: "Edge 1→2. prices[1]=100, so 100+100=200 < temp[2]=500. Update temp[2]=200! The 2-edge path 0→1→2 (cost 200) is cheaper than the direct flight (cost 500). This is the key improvement.",
              variables: { edge: "1→2", "prices[1]": 100, w: 100, "temp[2]": "500→200", round: 2 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "active", x: 200, y: 50 },
                  2: { state: "active", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "traversed", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [15],
              shortLabel: "Return prices[2] = 200",
              explanation: "Both rounds complete. prices = [0, 100, 200]. prices[dst] = prices[2] = 200. The cheapest flight from 0 to 2 with at most 1 stop is 200 (route: 0→1→2). Return 200.",
              variables: { prices: "[0, 100, 200]", answer: 200 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "found", x: 200, y: 50 },
                  2: { state: "found", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "traversed", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
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
          label: "K=0 (Direct Only)",
          description: "With 0 stops, only direct flights are considered — tests that K limits relaxation",
          input: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 0 },
          expectedOutput: "500",
          commonMistake: "Forgetting to copy prices before relaxation. Without copying, a single round could chain 0→1→2 (using updated temp values), producing 200 instead of the correct 500.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init prices",
              explanation: "Initialize prices = [0, INF, INF]. With k=0, we run exactly 1 round — only direct flights count.",
              variables: { prices: "[0, INF, INF]", k: 0 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "default", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Round 1: copy prices",
              explanation: "Only 1 round (k+1=1). Copy prices to temp. We can only discover paths using exactly 1 edge.",
              variables: { prices: "[0, INF, INF]", temp: "[0, INF, INF]", round: 1 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "default", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9, 10],
              shortLabel: "Relax 0→1: temp[1]=100",
              explanation: "Edge 0→1. 0+100=100 < INF. temp[1]=100.",
              variables: { edge: "0→1", "temp[1]": 100 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "active", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9],
              shortLabel: "Relax 1→2: skip (prices[1]=INF)",
              explanation: "Edge 1→2. prices[1]=INF (not temp[1]!). City 1 wasn't reachable in the PREVIOUS round. Skip. This is why the copy matters — if we used temp[1]=100, we'd get 200, allowing a 2-edge path in a k=0 scenario.",
              variables: { edge: "1→2", "prices[1]": "INF", "temp[2]": "INF" },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "active", x: 200, y: 50 },
                  2: { state: "default", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed", label: "100" },
                  { from: "1", to: "2", state: "eliminated", label: "100" },
                  { from: "0", to: "2", state: "default", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 9, 10],
              shortLabel: "Relax 0→2: temp[2]=500",
              explanation: "Edge 0→2. 0+500=500 < INF. temp[2]=500. Direct flight is the only option.",
              variables: { edge: "0→2", "temp[2]": 500 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "visited", x: 200, y: 50 },
                  2: { state: "active", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "traversed", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [15],
              shortLabel: "Return 500",
              explanation: "Single round done. prices = [0, 100, 500]. With 0 stops (direct flights only), the cheapest route to city 2 costs 500. Return 500.",
              variables: { prices: "[0, 100, 500]", answer: 500 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 50, y: 150 },
                  1: { state: "visited", x: 200, y: 50 },
                  2: { state: "found", x: 200, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default", label: "100" },
                  { from: "1", to: "2", state: "default", label: "100" },
                  { from: "0", to: "2", state: "traversed", label: "500" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n, flights, src, dst, k }) {
        const steps = [];
        let prices = new Array(n).fill(Infinity);
        prices[src] = 0;

        const fmtPrices = (p) => "[" + p.map(v => v === Infinity ? "INF" : v).join(", ") + "]";
        const makeGraphState = (highlightEdge, nodeStates) => {
          const gn = {};
          for (let i = 0; i < n; i++) {
            const angle = (2 * Math.PI * i) / n;
            gn[i] = { state: nodeStates?.[i] || "default", x: 150 + 100 * Math.cos(angle), y: 150 + 100 * Math.sin(angle) };
          }
          if (prices[src] === 0) gn[src].state = "found";
          return {
            graphNodes: gn,
            graphEdges: flights.map(([u, v, w], idx) => ({
              from: String(u), to: String(v), state: idx === highlightEdge ? "traversed" : "default", label: String(w),
            })),
            dfsStack: [],
          };
        };

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init prices",
          explanation: `Initialize prices array. All cities INF except source ${src} = 0. Will run ${k + 1} rounds.`,
          variables: { prices: fmtPrices(prices), k },
          dataStructure: makeGraphState(-1),
          delta: {}, isAnswer: false,
        });

        for (let round = 0; round <= k; round++) {
          const temp = [...prices];

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6],
            shortLabel: `Round ${round + 1}: copy`,
            explanation: `Round ${round + 1}. Copy prices to temp. Relax all edges using previous round's distances.`,
            variables: { prices: fmtPrices(prices), temp: fmtPrices(temp), round: round + 1 },
            dataStructure: makeGraphState(-1),
            delta: {}, isAnswer: false,
          });

          for (let fi = 0; fi < flights.length; fi++) {
            const [u, v, w] = flights[fi];
            if (prices[u] !== Infinity && prices[u] + w < temp[v]) {
              temp[v] = prices[u] + w;
              steps.push({
                stepId: steps.length, lineNumbers: [8, 9, 10],
                shortLabel: `${u}→${v}: temp[${v}]=${temp[v]}`,
                explanation: `Edge ${u}→${v} (cost ${w}). prices[${u}]=${prices[u]} + ${w} = ${prices[u] + w} < ${temp[v] === prices[u] + w ? "old" : temp[v]}. Update temp[${v}]=${temp[v]}.`,
                variables: { edge: `${u}→${v}`, [`temp[${v}]`]: temp[v], round: round + 1 },
                dataStructure: makeGraphState(fi, { [u]: "active", [v]: "active" }),
                delta: {}, isAnswer: false,
              });
            }
          }

          prices = temp;
        }

        const result = prices[dst] === Infinity ? -1 : prices[dst];
        steps.push({
          stepId: steps.length, lineNumbers: [15],
          shortLabel: result === -1 ? "No route" : `Return ${result}`,
          explanation: result === -1
            ? `prices[${dst}] is still INF. No route from ${src} to ${dst} within ${k} stops. Return -1.`
            : `prices[${dst}] = ${result}. Cheapest flight from ${src} to ${dst} with at most ${k} stops costs ${result}.`,
          variables: { prices: fmtPrices(prices), answer: result },
          dataStructure: makeGraphState(-1),
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n^k)", space: "O(n)", explanation: "DFS explores up to n branches at each of k+1 levels" },
    optimal: { time: "O(K * E)", space: "O(n)", explanation: "K+1 rounds, each relaxing all E edges. Two arrays of size n.", tradeoff: "Bellman-Ford trades the generality of Dijkstra for a natural way to limit edge count. O(K*E) is much better than O(n^k) for small K." },
  },

  interviewTips: [
    "Start by mentioning Dijkstra's limitation: it doesn't naturally limit the number of edges.",
    "Explain why copying prices before each round is critical: prevents multi-edge chains in a single round.",
    "Walk through the K=0 case to show your understanding: only direct flights, exactly 1 round.",
    "Mention the alternative: modified Dijkstra with (cost, node, stops) in the priority queue — O(E*K*log(E*K)).",
    "Clarify: 'K stops' means K+1 edges. The loop runs K+1 times.",
    "Edge case: src == dst should return 0 (no flights needed).",
  ],

  relatedProblems: ["network-delay-time", "swim-in-rising-water", "min-cost-connect-points"],
};
