export const rottingOranges = {
  id: 84,
  slug: "rotting-oranges",
  title: "Rotting Oranges",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 84,
  artifactType: "GraphBFS",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/rotting-oranges/",

  pattern: "Multi-Source BFS with Time Tracking",
  patternExplanation: `Start BFS from all rotten oranges simultaneously. Each BFS layer represents
    one minute of spreading. The total number of layers is the answer. After BFS, check if any
    fresh oranges remain (unreachable → return -1).`,

  intuition: {
    coreInsight: `Rotting spreads from ALL rotten oranges simultaneously, not one at a time.
      This is multi-source BFS: all initially rotten oranges enter the queue at time 0. Each
      BFS layer = 1 minute. The number of layers until the queue empties = total minutes. If
      any fresh orange is never reached, return -1.`,

    mentalModel: `Imagine a grid of oranges. The rotten ones release a poison gas that spreads
      one cell per minute in all four directions. All rotten oranges start releasing gas at
      the same time. After each minute, newly affected oranges also start releasing gas.
      The total time is how many "waves" of gas it takes to reach every fresh orange. If
      some oranges are walled off, they can never be reached.`,

    whyNaiveFails: `Running BFS from each rotten orange separately and taking the max would
      overcount: if two rotten oranges are spreading toward the same fresh orange, we want
      the minimum distance from either. Multi-source BFS naturally handles this because the
      first wave to reach a fresh orange "claims" it.`,

    keyObservation: `Track time by processing the queue in layers (level-order BFS). All cells
      at the same BFS depth were reached at the same time. The depth of the last layer is the
      answer. After BFS, scan for remaining fresh oranges — if any exist, return -1.`,
  },

  problem: `You are given an m x n grid where each cell can have one of three values:
    0 representing an empty cell, 1 representing a fresh orange, 2 representing a rotten orange.
    Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes
    rotten. Return the minimum number of minutes that must elapse until no cell has a fresh
    orange. If this is impossible, return -1.`,

  examples: [
    {
      input: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
      output: "4",
      explanation: "It takes 4 minutes for all oranges to become rotten.",
    },
    {
      input: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
      output: "-1",
      explanation: "The orange in the bottom left corner (2,0) can never be reached.",
    },
    {
      input: "grid = [[0,2]]",
      output: "0",
      explanation: "No fresh oranges at minute 0, so return 0.",
    },
  ],

  constraints: [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 10",
    "grid[i][j] is 0, 1, or 2",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Multi-Source BFS",
      tier: "optimal",
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(m × n)",
      idea: `Enqueue all rotten oranges at time 0. BFS layer by layer — each layer is one minute.
        Track fresh orange count. When a fresh orange is reached, decrement count and mark rotten.
        After BFS, if fresh count > 0, return -1. Otherwise return the number of minutes.`,

      javaCode: `public int orangesRotting(int[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    Queue<int[]> queue = new LinkedList<>();
    int fresh = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 2) queue.offer(new int[]{r, c});
            else if (grid[r][c] == 1) fresh++;
        }
    }

    if (fresh == 0) return 0;

    int minutes = 0;
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};

    while (!queue.isEmpty()) {
        int size = queue.size();
        boolean rotted = false;

        for (int i = 0; i < size; i++) {
            int[] cell = queue.poll();
            for (int[] d : dirs) {
                int nr = cell[0] + d[0], nc = cell[1] + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                    && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    rotted = true;
                    queue.offer(new int[]{nr, nc});
                }
            }
        }

        if (rotted) minutes++;
    }

    return fresh == 0 ? minutes : -1;
}`,

      cppCode: `int orangesRotting(vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    queue<pair<int,int>> q;
    int fresh = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 2) q.push({r, c});
            else if (grid[r][c] == 1) fresh++;
        }
    }

    if (fresh == 0) return 0;

    int minutes = 0;
    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};

    while (!q.empty()) {
        int size = q.size();
        bool rotted = false;

        for (int i = 0; i < size; i++) {
            auto [cr, cc] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = cr + d[0], nc = cc + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                    && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    rotted = true;
                    q.push({nr, nc});
                }
            }
        }

        if (rotted) minutes++;
    }

    return fresh == 0 ? minutes : -1;
}`,

      pythonCode: `def orangesRotting(grid: List[List[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    if fresh == 0:
        return 0

    minutes = 0

    while queue:
        size = len(queue)
        rotted = False

        for _ in range(size):
            cr, cc = queue.popleft()
            for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                nr, nc = cr + dr, cc + dc
                if 0 <= nr < rows and 0 <= nc < cols \\
                    and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    rotted = True
                    queue.append((nr, nc))

        if rotted:
            minutes += 1

    return minutes if fresh == 0 else -1`,

      lineAnnotations: {
        1: "Main function — returns minutes or -1",
        3: "Queue for multi-source BFS",
        4: "Count fresh oranges to check if all are reached",
        6: "Find all initially rotten oranges and count fresh ones",
        7: "Rotten orange → add to BFS queue",
        8: "Fresh orange → increment counter",
        11: "No fresh oranges → already done, return 0",
        13: "Minutes counter",
        16: "Process BFS layer by layer",
        17: "Process all cells at current time step",
        18: "Track if any rotting happened this minute",
        21: "Check all 4 neighbors",
        23: "Fresh neighbor becomes rotten",
        24: "Decrement fresh count",
        26: "Enqueue newly rotten orange",
        30: "Only increment minutes if rotting occurred",
        32: "If fresh > 0, some oranges are unreachable",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "All oranges reachable — takes 4 minutes",
          input: { grid: [[2,1,1],[1,1,0],[0,1,1]] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3, 4, 6],
              shortLabel: "Find rotten and count fresh",
              explanation: "Scan grid: 1 rotten orange at (0,0), 6 fresh oranges. Add (0,0) to queue. fresh = 6.",
              variables: { fresh: 6, minutes: 0, queueSize: 1 },
              dataStructure: {
                grid: [[2,1,1],[1,1,0],[0,1,1]],
                gridStates: [
                  ["found","default","default"],
                  ["default","default","default"],
                  ["default","default","default"],
                ],
                bfsQueue: ["0,0"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [16, 17, 21, 23, 24],
              shortLabel: "Minute 1: (0,1) and (1,0) rot",
              explanation: "Process (0,0). Neighbors (0,1) and (1,0) are fresh — they become rotten. fresh = 4. minutes = 1.",
              variables: { fresh: 4, minutes: 1, queueSize: 2 },
              dataStructure: {
                grid: [[2,2,1],[2,1,0],[0,1,1]],
                gridStates: [
                  ["visited","queued","default"],
                  ["queued","default","default"],
                  ["default","default","default"],
                ],
                bfsQueue: ["0,1","1,0"],
              },
              delta: { changedCells: [{r:0,c:1},{r:1,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16, 17, 21, 23, 24],
              shortLabel: "Minute 2: (0,2) and (1,1) rot",
              explanation: "Process (0,1) and (1,0). From (0,1): (0,2) rots. From (1,0): (1,1) rots (also reachable from (0,1)). fresh = 2. minutes = 2.",
              variables: { fresh: 2, minutes: 2, queueSize: 2 },
              dataStructure: {
                grid: [[2,2,2],[2,2,0],[0,1,1]],
                gridStates: [
                  ["visited","visited","queued"],
                  ["visited","queued","default"],
                  ["default","default","default"],
                ],
                bfsQueue: ["0,2","1,1"],
              },
              delta: { changedCells: [{r:0,c:2},{r:1,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [16, 17, 21, 23, 24],
              shortLabel: "Minute 3: (2,1) rots",
              explanation: "Process (0,2) and (1,1). From (1,1): (2,1) is fresh — rots. fresh = 1. minutes = 3.",
              variables: { fresh: 1, minutes: 3, queueSize: 1 },
              dataStructure: {
                grid: [[2,2,2],[2,2,0],[0,2,1]],
                gridStates: [
                  ["visited","visited","visited"],
                  ["visited","visited","default"],
                  ["default","queued","default"],
                ],
                bfsQueue: ["2,1"],
              },
              delta: { changedCells: [{r:2,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16, 17, 21, 23, 24],
              shortLabel: "Minute 4: (2,2) rots — last fresh orange",
              explanation: "Process (2,1). Neighbor (2,2) is fresh — rots. fresh = 0. minutes = 4. Queue now empty.",
              variables: { fresh: 0, minutes: 4, queueSize: 0 },
              dataStructure: {
                grid: [[2,2,2],[2,2,0],[0,2,2]],
                gridStates: [
                  ["visited","visited","visited"],
                  ["visited","visited","default"],
                  ["default","visited","queued"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:2,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [32],
              shortLabel: "Return 4 — all oranges rotten",
              explanation: "BFS complete. fresh == 0, so all oranges were reached. Return minutes = 4.",
              variables: { fresh: 0, minutes: 4, answer: 4 },
              dataStructure: {
                grid: [[2,2,2],[2,2,0],[0,2,2]],
                gridStates: [
                  ["found","found","found"],
                  ["found","found","default"],
                  ["default","found","found"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Unreachable Orange",
          description: "One fresh orange can never be reached — return -1",
          input: { grid: [[2,1,1],[0,1,1],[1,0,1]] },
          expectedOutput: "-1",
          commonMistake: "Forgetting to check if fresh > 0 after BFS. Just because BFS finished doesn't mean all oranges were reached — isolated oranges surrounded by empty cells are unreachable.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 6],
              shortLabel: "1 rotten, 7 fresh oranges",
              explanation: "Scan: rotten at (0,0), 7 fresh oranges scattered. Add (0,0) to queue.",
              variables: { fresh: 7, minutes: 0, queueSize: 1 },
              dataStructure: {
                grid: [[2,1,1],[0,1,1],[1,0,1]],
                gridStates: [
                  ["found","default","default"],
                  ["default","default","default"],
                  ["default","default","default"],
                ],
                bfsQueue: ["0,0"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [16, 17, 23, 24],
              shortLabel: "Minute 1: (0,1) rots",
              explanation: "Process (0,0). Only (0,1) is a fresh neighbor — rots. (1,0) is empty. fresh = 6.",
              variables: { fresh: 6, minutes: 1, queueSize: 1 },
              dataStructure: {
                grid: [[2,2,1],[0,1,1],[1,0,1]],
                gridStates: [
                  ["visited","queued","default"],
                  ["default","default","default"],
                  ["default","default","default"],
                ],
                bfsQueue: ["0,1"],
              },
              delta: { changedCells: [{r:0,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16, 17, 23, 24],
              shortLabel: "Minute 2: (0,2) and (1,1) rot",
              explanation: "Process (0,1). Neighbors (0,2) and (1,1) are fresh — rot. fresh = 4.",
              variables: { fresh: 4, minutes: 2, queueSize: 2 },
              dataStructure: {
                grid: [[2,2,2],[0,2,1],[1,0,1]],
                gridStates: [
                  ["visited","visited","queued"],
                  ["default","queued","default"],
                  ["default","default","default"],
                ],
                bfsQueue: ["0,2","1,1"],
              },
              delta: { changedCells: [{r:0,c:2},{r:1,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [16, 17, 23, 24],
              shortLabel: "Minute 3: (1,2) rots",
              explanation: "Process (0,2) and (1,1). From (0,2): (1,2) rots. From (1,1): (2,0) is NOT adjacent (blocked by empty). fresh = 3.",
              variables: { fresh: 3, minutes: 3, queueSize: 1 },
              dataStructure: {
                grid: [[2,2,2],[0,2,2],[1,0,1]],
                gridStates: [
                  ["visited","visited","visited"],
                  ["default","visited","queued"],
                  ["default","default","default"],
                ],
                bfsQueue: ["1,2"],
              },
              delta: { changedCells: [{r:1,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16, 17, 23, 24],
              shortLabel: "Minute 4: (2,2) rots",
              explanation: "Process (1,2). Neighbor (2,2) is fresh — rots. fresh = 2. But (2,0) is still unreachable!",
              variables: { fresh: 2, minutes: 4, queueSize: 1 },
              dataStructure: {
                grid: [[2,2,2],[0,2,2],[1,0,2]],
                gridStates: [
                  ["visited","visited","visited"],
                  ["default","visited","visited"],
                  ["default","default","queued"],
                ],
                bfsQueue: ["2,2"],
              },
              delta: { changedCells: [{r:2,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [32],
              shortLabel: "Return -1 — unreachable orange at (2,0)",
              explanation: "BFS complete but fresh = 2 > 0. Orange at (2,0) is surrounded by empty cells and can never be reached. Return -1.",
              variables: { fresh: 2, minutes: 4, answer: -1 },
              dataStructure: {
                grid: [[2,2,2],[0,2,2],[1,0,2]],
                gridStates: [
                  ["found","found","found"],
                  ["default","found","found"],
                  ["eliminated","default","found"],
                ],
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
        const rows = grid.length;
        const cols = grid[0].length;
        const g = grid.map(r => r.map(v => (typeof v === 'string' ? parseInt(v) : v)));
        const states = Array.from({ length: rows }, () => Array(cols).fill("default"));
        let fresh = 0;
        const queue = [];

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (g[r][c] === 2) {
              queue.push([r, c]);
              states[r][c] = "found";
            } else if (g[r][c] === 1) {
              fresh++;
            }
          }
        }

        steps.push({
          stepId: 0,
          lineNumbers: [1, 6],
          shortLabel: `${queue.length} rotten, ${fresh} fresh`,
          explanation: `Found ${queue.length} rotten orange(s) and ${fresh} fresh orange(s).`,
          variables: { fresh, minutes: 0, queueSize: queue.length },
          dataStructure: {
            grid: g.map(r => [...r]),
            gridStates: states.map(r => [...r]),
            bfsQueue: queue.map(([r, c]) => `${r},${c}`),
          },
          delta: {},
          isAnswer: false,
        });

        if (fresh === 0) {
          steps.push({
            stepId: 1,
            lineNumbers: [11],
            shortLabel: "No fresh oranges — return 0",
            explanation: "No fresh oranges exist. Return 0.",
            variables: { fresh: 0, answer: 0 },
            dataStructure: {
              grid: g.map(r => [...r]),
              gridStates: states.map(r => [...r]),
              bfsQueue: [],
            },
            delta: {},
            isAnswer: true,
          });
          return steps;
        }

        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        let minutes = 0;

        while (queue.length > 0) {
          const size = queue.length;
          let rotted = false;
          const changed = [];

          for (let i = 0; i < size; i++) {
            const [cr, cc] = queue.shift();
            states[cr][cc] = "visited";
            for (const [dr, dc] of dirs) {
              const nr = cr + dr, nc = cc + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] === 1) {
                g[nr][nc] = 2;
                fresh--;
                rotted = true;
                states[nr][nc] = "queued";
                queue.push([nr, nc]);
                changed.push({r: nr, c: nc});
              }
            }
          }

          if (rotted) {
            minutes++;
            steps.push({
              stepId: steps.length,
              lineNumbers: [16, 17, 23, 24, 30],
              shortLabel: `Minute ${minutes}: ${changed.length} orange(s) rot`,
              explanation: `Minute ${minutes}: ${changed.length} fresh orange(s) become rotten. ${fresh} fresh remaining.`,
              variables: { fresh, minutes, queueSize: queue.length },
              dataStructure: {
                grid: g.map(r => [...r]),
                gridStates: states.map(r => [...r]),
                bfsQueue: queue.map(([r, c]) => `${r},${c}`),
              },
              delta: { changedCells: changed },
              isAnswer: false,
            });
          }
        }

        // Final
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (states[r][c] === "visited" || states[r][c] === "queued") states[r][c] = "found";
            if (g[r][c] === 1) states[r][c] = "eliminated";
          }
        }

        const answer = fresh === 0 ? minutes : -1;
        steps.push({
          stepId: steps.length,
          lineNumbers: [32],
          shortLabel: `Return ${answer}`,
          explanation: fresh === 0
            ? `All oranges rotten after ${minutes} minute(s). Return ${minutes}.`
            : `${fresh} fresh orange(s) unreachable. Return -1.`,
          variables: { fresh, minutes, answer },
          dataStructure: {
            grid: g.map(r => [...r]),
            gridStates: states.map(r => [...r]),
            bfsQueue: [],
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: null,
    optimal: { time: "O(m × n)", space: "O(m × n)", explanation: "Each cell processed at most once in BFS; queue can hold up to m*n cells", tradeoff: "Multi-source BFS avoids redundant per-cell BFS calls" },
  },

  interviewTips: [
    "This is the classic multi-source BFS problem — mention Walls & Gates uses the same pattern.",
    "Count fresh oranges upfront — this lets you detect unreachable oranges in O(1) at the end.",
    "Process BFS in layers to track time — don't just count individual dequeues.",
    "Edge case: no fresh oranges at all → return 0 (not -1).",
    "Edge case: fresh oranges but no rotten ones → return -1 immediately.",
    "Mention the 'rotted' flag: only increment minutes when at least one orange actually rotted that round.",
  ],

  relatedProblems: ["walls-and-gates", "number-of-islands", "surrounded-regions"],
};
