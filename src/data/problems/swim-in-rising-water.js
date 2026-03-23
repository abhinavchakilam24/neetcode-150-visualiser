export const swimInRisingWater = {
  id: 96,
  slug: "swim-in-rising-water",
  title: "Swim in Rising Water",
  difficulty: "Hard",
  topic: "advanced-graphs",
  topicLabel: "Advanced Graphs",
  neetcodeNumber: 96,
  artifactType: "GraphBFS",
  companies: ["Amazon", "Google", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/swim-in-rising-water/",

  pattern: "Modified Dijkstra / Binary Search + BFS",
  patternExplanation: `Find the minimum time to swim from (0,0) to (n-1,n-1). At time t, you can swim through
    any cell with elevation <= t. This is equivalent to finding the path that minimizes the maximum elevation.
    Dijkstra's with max-elevation as the "distance" solves this optimally.`,

  intuition: {
    coreInsight: `We want the path from top-left to bottom-right where the maximum cell value along the path
      is minimized. At time t, all cells with elevation <= t are flooded and swimmable. So we need the
      smallest t such that a connected path of cells with elevation <= t exists. This is a minimax path
      problem — minimize the maximum edge weight.`,

    mentalModel: `Imagine slowly filling a grid with water. At time 0, only cells with elevation 0 are flooded.
      At time 1, cells with elevation 0 or 1 are flooded. You're waiting for enough water to create a
      connected path from top-left to bottom-right. The answer is the time when this path first appears —
      which equals the highest elevation on the optimal path.`,

    whyNaiveFails: `BFS finds shortest paths by hop count, not by maximum elevation. DFS would explore all
      paths and compare their maximum elevations, which is exponential. Dijkstra's variant using max-elevation
      as the priority naturally finds the minimax path in O(n² log n).`,

    keyObservation: `This is NOT standard shortest path — we're minimizing the MAXIMUM cell value on any
      path, not the sum. The priority queue should use max(current_max, neighbor_elevation) as the key.
      When we reach (n-1, n-1), the key at that point is our answer.`,
  },

  problem: `You are given an n x n integer matrix grid where each value grid[i][j] represents the
    elevation at that point. The rain starts to rise. At time t, the depth of water everywhere is t.
    You can swim from a square to another 4-directionally adjacent square if and only if the elevation
    of both squares is at most t. Return the least time until you can reach the bottom right square
    (n-1, n-1) starting from the top left square (0, 0).`,

  examples: [
    { input: "grid = [[0,2],[1,3]]", output: "3", explanation: "At t=3, all cells are swimmable. Path: (0,0)→(1,0)→(1,1)" },
    { input: "grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]", output: "16", explanation: "Follow the spiral path with max elevation 16" },
  ],

  constraints: [
    "n == grid.length == grid[i].length",
    "1 <= n <= 50",
    "0 <= grid[i][j] < n²",
    "Each value grid[i][j] is unique.",
    "grid[0][0] == 0, grid[n-1][n-1] == n²-1 may not hold.",
  ],

  approaches: {
    brute: {
      label: "Binary Search + BFS",
      tier: "brute",
      timeComplexity: "O(n² log(n²))",
      spaceComplexity: "O(n²)",
      idea: "Binary search on the answer t. For each t, BFS to check if a path exists using only cells with elevation <= t.",

      javaCode: `public int swimInWater(int[][] grid) {
    int n = grid.length;
    int lo = grid[0][0], hi = n * n - 1;

    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (canReach(grid, n, mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

private boolean canReach(int[][] grid, int n, int t) {
    if (grid[0][0] > t) return false;
    boolean[][] visited = new boolean[n][n];
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{0, 0});
    visited[0][0] = true;
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        if (cell[0] == n-1 && cell[1] == n-1) return true;
        for (int[] d : dirs) {
            int nr = cell[0]+d[0], nc = cell[1]+d[1];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] <= t) {
                visited[nr][nc] = true;
                queue.offer(new int[]{nr, nc});
            }
        }
    }
    return false;
}`,

      cppCode: `int swimInWater(vector<vector<int>>& grid) {
    int n = grid.size();
    int lo = grid[0][0], hi = n * n - 1;

    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (canReach(grid, n, mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

bool canReach(vector<vector<int>>& grid, int n, int t) {
    if (grid[0][0] > t) return false;
    vector<vector<bool>> visited(n, vector<bool>(n, false));
    queue<pair<int,int>> q;
    q.push({0, 0});
    visited[0][0] = true;
    int dirs[][2] = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        if (r == n-1 && c == n-1) return true;
        for (auto& d : dirs) {
            int nr = r+d[0], nc = c+d[1];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] <= t) {
                visited[nr][nc] = true;
                q.push({nr, nc});
            }
        }
    }
    return false;
}`,

      pythonCode: `def swimInWater(grid: List[List[int]]) -> int:
    n = len(grid)
    lo, hi = grid[0][0], n * n - 1

    def can_reach(t):
        if grid[0][0] > t:
            return False
        visited = set()
        queue = deque([(0, 0)])
        visited.add((0, 0))
        while queue:
            r, c = queue.popleft()
            if r == n - 1 and c == n - 1:
                return True
            for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and (nr,nc) not in visited and grid[nr][nc] <= t:
                    visited.add((nr, nc))
                    queue.append((nr, nc))
        return False

    while lo < hi:
        mid = (lo + hi) // 2
        if can_reach(mid):
            hi = mid
        else:
            lo = mid + 1

    return lo`,

      lineAnnotations: {
        2: "Binary search range: min possible t to max possible t",
        5: "Binary search on the answer",
        6: "Check if we can reach (n-1,n-1) with water level mid",
        12: "BFS: can we reach bottom-right using only cells <= t?",
        19: "Found destination — path exists at this water level",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "2x2 Grid",
          description: "Binary search on a small grid",
          input: { grid: [[0,2],[1,3]] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Binary search [0, 3]",
              explanation: "Grid values range from 0 to 3. Binary search for minimum t where path exists. lo=0, hi=3.",
              variables: { lo: 0, hi: 3 },
              dataStructure: {
                grid: [[0,2],[1,3]],
                gridStates: [["default","default"],["default","default"]],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Try t=1: can't reach",
              explanation: "mid=1. BFS with t=1: cells {0,1} accessible. Can reach (1,0) but (1,1)=3 > 1. Dead end. lo=2.",
              variables: { mid: 1, canReach: false, lo: 2 },
              dataStructure: {
                grid: [[0,2],[1,3]],
                gridStates: [["visited","default"],["visited","default"]],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6],
              shortLabel: "Try t=2: can't reach",
              explanation: "mid=2. BFS with t=2: cells {0,1,2} accessible. (1,1)=3 > 2. Still can't reach. lo=3.",
              variables: { mid: 2, canReach: false, lo: 3 },
              dataStructure: {
                grid: [[0,2],[1,3]],
                gridStates: [["visited","visited"],["visited","default"]],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9],
              shortLabel: "lo=hi=3 → Return 3",
              explanation: "lo=3=hi. At t=3, all cells swimmable. Path: (0,0)→(1,0)→(1,1). Return 3.",
              variables: { lo: 3, hi: 3, answer: 3 },
              dataStructure: {
                grid: [[0,2],[1,3]],
                gridStates: [["found","found"],["found","found"]],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "1x1 Grid",
          description: "Single cell — already at destination",
          input: { grid: [[0]] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 5, 9],
              shortLabel: "1x1: already there → 0",
              explanation: "Grid is 1x1. Start = destination. At t=0, we're already at (0,0) = (n-1,n-1). Return 0.",
              variables: { answer: 0 },
              dataStructure: {
                grid: [[0]],
                gridStates: [["found"]],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ grid }) {
        const steps = [];
        const n = grid.length;
        let lo = grid[0][0], hi = n * n - 1;

        function canReach(t) {
          if (grid[0][0] > t) return false;
          const visited = new Set();
          const queue = [[0, 0]];
          visited.add("0,0");
          const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
          while (queue.length > 0) {
            const [r, c] = queue.shift();
            if (r === n - 1 && c === n - 1) return true;
            for (const [dr, dc] of dirs) {
              const nr = r + dr, nc = c + dc;
              if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited.has(`${nr},${nc}`) && grid[nr][nc] <= t) {
                visited.add(`${nr},${nc}`);
                queue.push([nr, nc]);
              }
            }
          }
          return false;
        }

        function makeGridStates(t) {
          return grid.map(row => row.map(val => val <= t ? 'visited' : 'default'));
        }

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `Binary search [${lo}, ${hi}]`,
          explanation: `Search for minimum t in range [${lo}, ${hi}].`,
          variables: { lo, hi },
          dataStructure: { grid, gridStates: grid.map(row => row.map(() => 'default')), bfsQueue: [] },
          delta: {}, isAnswer: false,
        });

        while (lo < hi) {
          const mid = Math.floor((lo + hi) / 2);
          const reachable = canReach(mid);

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6],
            shortLabel: `t=${mid}: ${reachable ? "reachable ✓" : "blocked ✗"}`,
            explanation: `Try t=${mid}. ${reachable ? "Can reach (n-1,n-1). Try smaller t." : "Can't reach. Need larger t."}`,
            variables: { mid, canReach: reachable, lo, hi },
            dataStructure: { grid, gridStates: makeGridStates(mid), bfsQueue: [] },
            delta: {}, isAnswer: false,
          });

          if (reachable) hi = mid;
          else lo = mid + 1;
        }

        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: `Return ${lo}`,
          explanation: `Binary search converged. Minimum time = ${lo}.`,
          variables: { answer: lo },
          dataStructure: { grid, gridStates: grid.map(row => row.map(() => 'found')), bfsQueue: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Modified Dijkstra (Minimax Path)",
      tier: "optimal",
      timeComplexity: "O(n² log n)",
      spaceComplexity: "O(n²)",
      idea: "Use min-heap with (max_elevation_on_path, row, col). Always expand the cell with smallest max-elevation. When we reach (n-1,n-1), that's the answer.",

      javaCode: `public int swimInWater(int[][] grid) {
    int n = grid.length;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{grid[0][0], 0, 0});
    boolean[][] visited = new boolean[n][n];
    visited[0][0] = true;
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int maxElev = curr[0], r = curr[1], c = curr[2];
        if (r == n-1 && c == n-1) return maxElev;
        for (int[] d : dirs) {
            int nr = r+d[0], nc = c+d[1];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                visited[nr][nc] = true;
                pq.offer(new int[]{Math.max(maxElev, grid[nr][nc]), nr, nc});
            }
        }
    }
    return -1;
}`,

      cppCode: `int swimInWater(vector<vector<int>>& grid) {
    int n = grid.size();
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> pq;
    pq.push({grid[0][0], 0, 0});
    vector<vector<bool>> visited(n, vector<bool>(n, false));
    visited[0][0] = true;
    int dirs[][2] = {{0,1},{0,-1},{1,0},{-1,0}};

    while (!pq.empty()) {
        auto [maxElev, r, c] = pq.top(); pq.pop();
        if (r == n-1 && c == n-1) return maxElev;
        for (auto& d : dirs) {
            int nr = r+d[0], nc = c+d[1];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                visited[nr][nc] = true;
                pq.push({max(maxElev, grid[nr][nc]), nr, nc});
            }
        }
    }
    return -1;
}`,

      pythonCode: `def swimInWater(grid: List[List[int]]) -> int:
    n = len(grid)
    heap = [(grid[0][0], 0, 0)]
    visited = set()
    visited.add((0, 0))

    while heap:
        max_elev, r, c = heapq.heappop(heap)
        if r == n - 1 and c == n - 1:
            return max_elev
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:
                visited.add((nr, nc))
                heapq.heappush(heap, (max(max_elev, grid[nr][nc]), nr, nc))

    return -1`,

      lineAnnotations: {
        3: "Min-heap: (max elevation on path to this cell, row, col)",
        4: "Start at (0,0) with its own elevation as the max",
        8: "Pop cell with smallest max-elevation",
        10: "Reached destination! max_elev is the answer",
        13: "Key: new max = max(current path max, neighbor elevation)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "2x2 Dijkstra",
          description: "Minimax path on 2x2 grid",
          input: { grid: [[0,2],[1,3]] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4],
              shortLabel: "Start: heap = [(0,0,0)]",
              explanation: "Push (grid[0][0]=0, row=0, col=0). The max elevation to reach (0,0) is 0.",
              variables: { heap: "[(0,0,0)]" },
              dataStructure: {
                grid: [[0,2],[1,3]],
                gridStates: [["active","default"],["default","default"]],
                bfsQueue: ["(0,0):0"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 13],
              shortLabel: "Pop (0,0,0): push neighbors",
              explanation: "Pop (0,0,0). Not destination. Neighbors: (0,1)=2 → push (max(0,2)=2,0,1). (1,0)=1 → push (max(0,1)=1,1,0).",
              variables: { maxElev: 0, r: 0, c: 0, heap: "[(1,1,0),(2,0,1)]" },
              dataStructure: {
                grid: [[0,2],[1,3]],
                gridStates: [["visited","queued"],["queued","default"]],
                bfsQueue: ["(1,0):1","(0,1):2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 13],
              shortLabel: "Pop (1,1,0): push (1,1)",
              explanation: "Pop (1,1,0). At (1,0) with max 1. Neighbor (1,1)=3 → push (max(1,3)=3,1,1).",
              variables: { maxElev: 1, r: 1, c: 0, heap: "[(2,0,1),(3,1,1)]" },
              dataStructure: {
                grid: [[0,2],[1,3]],
                gridStates: [["visited","queued"],["active","queued"]],
                bfsQueue: ["(0,1):2","(1,1):3"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 13],
              shortLabel: "Pop (2,0,1): push (1,1)",
              explanation: "Pop (2,0,1). At (0,1) with max 2. Neighbor (1,1)=3 already visited. No new pushes.",
              variables: { maxElev: 2, r: 0, c: 1 },
              dataStructure: {
                grid: [[0,2],[1,3]],
                gridStates: [["visited","active"],["visited","queued"]],
                bfsQueue: ["(1,1):3"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 10],
              shortLabel: "Pop (3,1,1): destination! Return 3",
              explanation: "Pop (3,1,1). r=1, c=1 = (n-1,n-1). Max elevation on path = 3. Return 3.",
              variables: { maxElev: 3, r: 1, c: 1, answer: 3 },
              dataStructure: {
                grid: [[0,2],[1,3]],
                gridStates: [["found","found"],["found","found"]],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "1x1 Grid",
          description: "Single cell",
          input: { grid: [[0]] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 8, 10],
              shortLabel: "Pop (0,0,0) = destination → 0",
              explanation: "Single cell. Pop (0,0,0). It IS the destination. Return 0.",
              variables: { answer: 0 },
              dataStructure: {
                grid: [[0]],
                gridStates: [["found"]],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ grid }) {
        const steps = [];
        const n = grid.length;
        const visitedSet = new Set();
        visitedSet.add("0,0");
        const heap = [[grid[0][0], 0, 0]];
        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        const cellState = Array.from({ length: n }, () => Array(n).fill('default'));
        cellState[0][0] = 'active';

        function getGridStates(activeR, activeC, inHeap) {
          return grid.map((row, r) => row.map((_, c) => {
            if (r === activeR && c === activeC) return 'active';
            if (visitedSet.has(`${r},${c}`) && !(r === activeR && c === activeC)) return 'visited';
            if (inHeap.has(`${r},${c}`)) return 'queued';
            return 'default';
          }));
        }

        const heapSet = new Set(["0,0"]);
        steps.push({
          stepId: 0, lineNumbers: [3, 4],
          shortLabel: `Start: heap = [(${grid[0][0]},0,0)]`,
          explanation: `Push starting cell (0,0) with elevation ${grid[0][0]}.`,
          variables: { heap: `[(${grid[0][0]},0,0)]` },
          dataStructure: {
            grid,
            gridStates: getGridStates(0, 0, heapSet),
            bfsQueue: [`(0,0):${grid[0][0]}`],
          },
          delta: {}, isAnswer: false,
        });

        while (heap.length > 0) {
          heap.sort((a, b) => a[0] - b[0]);
          const [maxElev, r, c] = heap.shift();
          heapSet.delete(`${r},${c}`);
          visitedSet.add(`${r},${c}`);

          if (r === n - 1 && c === n - 1) {
            steps.push({
              stepId: steps.length, lineNumbers: [8, 10],
              shortLabel: `Reach (${r},${c}): max=${maxElev}`,
              explanation: `Reached destination (${n-1},${n-1}). Max elevation on path = ${maxElev}. Return ${maxElev}.`,
              variables: { maxElev, answer: maxElev },
              dataStructure: {
                grid,
                gridStates: grid.map(row => row.map(() => 'found')),
                bfsQueue: [],
              },
              delta: {}, isAnswer: true,
            });
            return steps;
          }

          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visitedSet.has(`${nr},${nc}`)) {
              visitedSet.add(`${nr},${nc}`);
              heapSet.add(`${nr},${nc}`);
              heap.push([Math.max(maxElev, grid[nr][nc]), nr, nc]);
            }
          }

          steps.push({
            stepId: steps.length, lineNumbers: [8, 13],
            shortLabel: `Pop (${maxElev},${r},${c})`,
            explanation: `Process (${r},${c}) with max elevation ${maxElev}. Push unvisited neighbors.`,
            variables: { maxElev, r, c },
            dataStructure: {
              grid,
              gridStates: getGridStates(r, c, heapSet),
              bfsQueue: heap.slice().sort((a,b)=>a[0]-b[0]).map(([e,nr,nc]) => `(${nr},${nc}):${e}`),
            },
            delta: {}, isAnswer: false,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n² log(n²))", space: "O(n²)", explanation: "Binary search O(log n²) × BFS O(n²)" },
    optimal: { time: "O(n² log n)", space: "O(n²)", explanation: "Modified Dijkstra — each cell processed once with log n heap ops", tradeoff: "Dijkstra does one pass instead of binary search + multiple BFS passes" },
  },

  interviewTips: [
    "Identify this as a minimax path problem, not standard shortest path.",
    "Explain why the heap key is max(path_max, neighbor_elevation), not sum.",
    "Mention both approaches: binary search + BFS and modified Dijkstra.",
    "Dijkstra's variant is more elegant and often faster in practice.",
    "The key insight: we minimize the BOTTLENECK (max), not the total distance.",
  ],

  relatedProblems: ["network-delay-time", "cheapest-flights-k-stops", "min-cost-connect-points"],
};
