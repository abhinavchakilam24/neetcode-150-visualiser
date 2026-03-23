export const numberOfIslands = {
  id: 80,
  slug: "number-of-islands",
  title: "Number of Islands",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 80,
  artifactType: "GraphBFS",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/number-of-islands/",

  pattern: "BFS/DFS Grid Traversal",
  patternExplanation: `When counting connected components in a 2D grid, iterate through every cell.
    When you find an unvisited land cell, trigger a BFS/DFS to mark the entire connected island
    as visited, then increment the island counter.`,

  intuition: {
    coreInsight: `Every '1' cell belongs to exactly one island. If we can "flood-fill" an entire
      island the moment we discover any cell in it, we'll never double-count. We scan the grid
      top-to-bottom, left-to-right. Each time we hit an unvisited '1', that's a brand-new island
      we haven't seen — increment the counter and BFS outward to mark every connected '1' as visited.`,

    mentalModel: `Imagine you're flying over a foggy ocean with islands below. You can only see
      directly down. Each time you spot land, you radio a ground team to paint that entire island
      bright red (BFS). From then on, any red land you fly over is already counted. The number
      of times you radioed the ground team IS the island count.`,

    whyNaiveFails: `Without marking visited cells, you'd count the same island multiple times —
      once for every '1' cell it contains. A 10x10 island would be counted 100 times. Marking
      cells as visited during BFS ensures each island is counted exactly once.`,

    keyObservation: `BFS from a single land cell reaches ALL cells in that island and only that
      island (because water blocks traversal). So one BFS call = one complete island discovered.
      The total number of BFS calls we initiate = the total number of islands.`,
  },

  problem: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water),
    return the number of islands. An island is surrounded by water and is formed by connecting
    adjacent lands horizontally or vertically. You may assume all four edges of the grid are
    surrounded by water.`,

  examples: [
    {
      input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
      output: "1",
      explanation: "All the 1s are connected, forming a single island.",
    },
    {
      input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
      output: "3",
      explanation: "There are three separate groups of connected 1s.",
    },
  ],

  constraints: [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 300",
    "grid[i][j] is '0' or '1'",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "BFS Flood Fill",
      tier: "optimal",
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(min(m, n))",
      idea: `Scan every cell. When we find an unvisited '1', increment island count and BFS
        to mark all connected '1's as visited. The BFS queue holds at most min(m,n) cells
        at any time for a well-shaped grid.`,

      javaCode: `public int numIslands(char[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    int islands = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                islands++;
                bfs(grid, r, c);
            }
        }
    }
    return islands;
}

private void bfs(char[][] grid, int r, int c) {
    int rows = grid.length, cols = grid[0].length;
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{r, c});
    grid[r][c] = '0';

    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] d : dirs) {
            int nr = cell[0] + d[0], nc = cell[1] + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && grid[nr][nc] == '1') {
                grid[nr][nc] = '0';
                queue.offer(new int[]{nr, nc});
            }
        }
    }
}`,

      cppCode: `int numIslands(vector<vector<char>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    int islands = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                islands++;
                bfs(grid, r, c);
            }
        }
    }
    return islands;
}

void bfs(vector<vector<char>>& grid, int r, int c) {
    int rows = grid.size(), cols = grid[0].size();
    queue<pair<int,int>> q;
    q.push({r, c});
    grid[r][c] = '0';

    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!q.empty()) {
        auto [cr, cc] = q.front(); q.pop();
        for (auto& d : dirs) {
            int nr = cr + d[0], nc = cc + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && grid[nr][nc] == '1') {
                grid[nr][nc] = '0';
                q.push({nr, nc});
            }
        }
    }
}`,

      pythonCode: `def numIslands(grid: List[List[str]]) -> int:
    rows, cols = len(grid), len(grid[0])
    islands = 0

    def bfs(r, c):
        queue = deque([(r, c)])
        grid[r][c] = '0'
        while queue:
            cr, cc = queue.popleft()
            for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                nr, nc = cr + dr, cc + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                    grid[nr][nc] = '0'
                    queue.append((nr, nc))

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                bfs(r, c)

    return islands`,

      lineAnnotations: {
        1: "Main function — returns total island count",
        5: "Scan every cell in the grid",
        7: "Found unvisited land — this is a new island",
        8: "Increment island counter",
        9: "BFS to mark all connected land as visited",
        17: "BFS helper — flood-fills one island",
        19: "Initialize queue with starting cell",
        20: "Mark starting cell as visited (set to '0')",
        22: "Four directions: right, left, down, up",
        24: "Dequeue front cell",
        26: "Check neighbor is in bounds and is land",
        28: "Mark neighbor visited and enqueue it",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Single island covering top-left region",
          input: { grid: [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6],
              shortLabel: "Start scanning grid",
              explanation: "Begin scanning the grid top-to-bottom, left-to-right. islands = 0. We look for any unvisited '1'.",
              variables: { islands: 0, r: 0, c: 0 },
              dataStructure: {
                grid: [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]],
                gridStates: [
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 9],
              shortLabel: "Found land at (0,0) — island #1",
              explanation: "grid[0][0] = '1'. New island found! Increment islands to 1. Start BFS from (0,0) to mark all connected land.",
              variables: { islands: 1, r: 0, c: 0 },
              dataStructure: {
                grid: [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]],
                gridStates: [
                  ["active","default","default","default","default"],
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: ["0,0"],
              },
              delta: { changedCells: [{r:0,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19, 20, 24, 26, 28],
              shortLabel: "BFS from (0,0) — enqueue neighbors",
              explanation: "Dequeue (0,0), mark visited. Check 4 neighbors: (0,1) is land — enqueue. (1,0) is land — enqueue. (0,-1) and (-1,0) are out of bounds.",
              variables: { islands: 1, queueSize: 2, processing: "(0,0)" },
              dataStructure: {
                grid: [[0,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]],
                gridStates: [
                  ["visited","queued","default","default","default"],
                  ["queued","default","default","default","default"],
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: ["0,1","1,0"],
              },
              delta: { changedCells: [{r:0,c:0},{r:0,c:1},{r:1,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [24, 26, 28],
              shortLabel: "Process (0,1) — enqueue (0,2)",
              explanation: "Dequeue (0,1), mark visited. Neighbors: (0,2) is land — enqueue. (0,0) already visited. (1,1) is land — enqueue.",
              variables: { islands: 1, queueSize: 3, processing: "(0,1)" },
              dataStructure: {
                grid: [[0,0,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]],
                gridStates: [
                  ["visited","visited","queued","default","default"],
                  ["queued","queued","default","default","default"],
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: ["1,0","0,2","1,1"],
              },
              delta: { changedCells: [{r:0,c:1},{r:0,c:2},{r:1,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [24, 26, 28],
              shortLabel: "BFS continues — spreading through island",
              explanation: "Continue BFS: process (1,0), enqueue (2,0). Process (0,2), enqueue (0,3). Process (1,1), enqueue (2,1). The flood fill spreads outward layer by layer.",
              variables: { islands: 1, queueSize: 4, processing: "multiple" },
              dataStructure: {
                grid: [[0,0,0,1,0],[0,0,0,1,0],[1,1,0,0,0],[0,0,0,0,0]],
                gridStates: [
                  ["visited","visited","visited","queued","default"],
                  ["visited","visited","default","queued","default"],
                  ["queued","queued","default","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: ["0,3","1,3","2,0","2,1"],
              },
              delta: { changedCells: [{r:1,c:0},{r:0,c:2},{r:1,c:1},{r:2,c:0},{r:2,c:1},{r:0,c:3},{r:1,c:3}] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [24, 26],
              shortLabel: "BFS complete — entire island marked",
              explanation: "BFS finishes. All connected '1's from (0,0) are now marked as visited. The queue is empty. Every land cell in this island has been reached.",
              variables: { islands: 1, queueSize: 0 },
              dataStructure: {
                grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                gridStates: [
                  ["visited","visited","visited","visited","default"],
                  ["visited","visited","default","visited","default"],
                  ["visited","visited","default","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [12],
              shortLabel: "Scan complete — return 1",
              explanation: "Continue scanning remaining cells. All are either '0' (water) or already visited. No new islands found. Return islands = 1.",
              variables: { islands: 1, answer: 1 },
              dataStructure: {
                grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                gridStates: [
                  ["found","found","found","found","default"],
                  ["found","found","default","found","default"],
                  ["found","found","default","default","default"],
                  ["default","default","default","default","default"],
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
          label: "Multiple Islands",
          description: "Three separate islands — tests that BFS doesn't leak across water",
          input: { grid: [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]] },
          expectedOutput: "3",
          commonMistake: "Forgetting to mark cells visited when enqueuing (not when dequeuing) causes cells to be added to the queue multiple times, leading to TLE or wrong results.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "Found island #1 at (0,0)",
              explanation: "Scanning from top-left. grid[0][0]='1' — new island! Increment to 1. Begin BFS from (0,0).",
              variables: { islands: 1, r: 0, c: 0 },
              dataStructure: {
                grid: [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]],
                gridStates: [
                  ["active","default","default","default","default"],
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: ["0,0"],
              },
              delta: { changedCells: [{r:0,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [19, 20, 24, 26, 28],
              shortLabel: "BFS marks island #1 complete",
              explanation: "BFS from (0,0) visits (0,0), (0,1), (1,0), (1,1). All four cells form island #1. Queue is now empty.",
              variables: { islands: 1, queueSize: 0 },
              dataStructure: {
                grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,1,1]],
                gridStates: [
                  ["visited","visited","default","default","default"],
                  ["visited","visited","default","default","default"],
                  ["default","default","default","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:0,c:0},{r:0,c:1},{r:1,c:0},{r:1,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "Found island #2 at (2,2)",
              explanation: "Continue scanning. Skip visited and water cells. grid[2][2]='1' — new island! Increment to 2.",
              variables: { islands: 2, r: 2, c: 2 },
              dataStructure: {
                grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,1,1]],
                gridStates: [
                  ["visited","visited","default","default","default"],
                  ["visited","visited","default","default","default"],
                  ["default","default","active","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: ["2,2"],
              },
              delta: { changedCells: [{r:2,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [24, 26],
              shortLabel: "BFS marks island #2 — single cell",
              explanation: "BFS from (2,2): all four neighbors are water or out of bounds. Island #2 is just one cell. Queue empty.",
              variables: { islands: 2, queueSize: 0 },
              dataStructure: {
                grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,1]],
                gridStates: [
                  ["visited","visited","default","default","default"],
                  ["visited","visited","default","default","default"],
                  ["default","default","visited","default","default"],
                  ["default","default","default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:2,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "Found island #3 at (3,3)",
              explanation: "Continue scanning. grid[3][3]='1' — new island! Increment to 3.",
              variables: { islands: 3, r: 3, c: 3 },
              dataStructure: {
                grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,1]],
                gridStates: [
                  ["visited","visited","default","default","default"],
                  ["visited","visited","default","default","default"],
                  ["default","default","visited","default","default"],
                  ["default","default","default","active","default"],
                ],
                bfsQueue: ["3,3"],
              },
              delta: { changedCells: [{r:3,c:3}] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [24, 26, 28],
              shortLabel: "BFS marks island #3 — two cells",
              explanation: "BFS from (3,3): neighbor (3,4) is land — enqueue. Process (3,4) — no more land neighbors. Island #3 has 2 cells.",
              variables: { islands: 3, queueSize: 0 },
              dataStructure: {
                grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                gridStates: [
                  ["visited","visited","default","default","default"],
                  ["visited","visited","default","default","default"],
                  ["default","default","visited","default","default"],
                  ["default","default","default","visited","visited"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:3,c:3},{r:3,c:4}] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [12],
              shortLabel: "Return 3",
              explanation: "Full scan complete. Found 3 separate islands. Each was discovered and fully explored via BFS exactly once.",
              variables: { islands: 3, answer: 3 },
              dataStructure: {
                grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                gridStates: [
                  ["found","found","default","default","default"],
                  ["found","found","default","default","default"],
                  ["default","default","found","default","default"],
                  ["default","default","default","found","found"],
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
        // Deep copy the grid so we can mutate it
        const g = grid.map(row => row.map(v => (typeof v === 'string' ? parseInt(v) : v)));
        const states = Array.from({ length: rows }, () => Array(cols).fill("default"));
        let islands = 0;

        steps.push({
          stepId: 0,
          lineNumbers: [1, 2, 3],
          shortLabel: "Initialize",
          explanation: `Grid is ${rows}x${cols}. islands = 0. Begin scanning for unvisited land cells.`,
          variables: { islands: 0, rows, cols },
          dataStructure: {
            grid: g.map(r => [...r]),
            gridStates: states.map(r => [...r]),
            bfsQueue: [],
          },
          delta: {},
          isAnswer: false,
        });

        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (g[r][c] === 1) {
              islands++;
              states[r][c] = "active";

              steps.push({
                stepId: steps.length,
                lineNumbers: [7, 8, 9],
                shortLabel: `Island #${islands} at (${r},${c})`,
                explanation: `grid[${r}][${c}] = '1'. New island found! Increment count to ${islands}. Start BFS.`,
                variables: { islands, r, c },
                dataStructure: {
                  grid: g.map(row => [...row]),
                  gridStates: states.map(row => [...row]),
                  bfsQueue: [`${r},${c}`],
                },
                delta: { changedCells: [{r, c}] },
                isAnswer: false,
              });

              // BFS
              const queue = [[r, c]];
              g[r][c] = 0;
              states[r][c] = "visited";

              while (queue.length > 0) {
                const [cr, cc] = queue.shift();
                for (const [dr, dc] of dirs) {
                  const nr = cr + dr;
                  const nc = cc + dc;
                  if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] === 1) {
                    g[nr][nc] = 0;
                    states[nr][nc] = "queued";
                    queue.push([nr, nc]);
                  }
                }

                // Mark dequeued cells as visited
                for (const [qr, qc] of queue) {
                  if (states[qr][qc] === "queued") {
                    // keep as queued
                  }
                }

                // After processing neighbors, emit a step
                if (queue.length > 0 || cr !== r || cc !== c) {
                  const queueLabels = queue.map(([qr, qc]) => `${qr},${qc}`);
                  steps.push({
                    stepId: steps.length,
                    lineNumbers: [24, 26, 28],
                    shortLabel: `BFS process (${cr},${cc})`,
                    explanation: `Dequeue (${cr},${cc}). Check neighbors and enqueue any unvisited land. Queue: [${queueLabels.join(", ")}].`,
                    variables: { islands, processing: `(${cr},${cc})`, queueSize: queue.length },
                    dataStructure: {
                      grid: g.map(row => [...row]),
                      gridStates: states.map(row => [...row]),
                      bfsQueue: queueLabels,
                    },
                    delta: { changedCells: [{r: cr, c: cc}] },
                    isAnswer: false,
                  });
                }

                // Mark processed cells as visited
                states[cr][cc] = "visited";
                for (const [qr, qc] of queue) {
                  // These stay queued until dequeued
                }
              }

              // Mark entire island as visited in states
              steps.push({
                stepId: steps.length,
                lineNumbers: [22, 23],
                shortLabel: `Island #${islands} fully explored`,
                explanation: `BFS complete for island #${islands}. All connected land cells are now marked visited.`,
                variables: { islands, queueSize: 0 },
                dataStructure: {
                  grid: g.map(row => [...row]),
                  gridStates: states.map(row => [...row]),
                  bfsQueue: [],
                },
                delta: {},
                isAnswer: false,
              });
            }
          }
        }

        // Final answer
        // Mark all visited as found
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (states[r][c] === "visited") states[r][c] = "found";
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [12],
          shortLabel: `Return ${islands}`,
          explanation: `Scan complete. Total islands found: ${islands}.`,
          variables: { islands, answer: islands },
          dataStructure: {
            grid: g.map(row => [...row]),
            gridStates: states.map(row => [...row]),
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
    brute:   null,
    optimal: { time: "O(m × n)", space: "O(min(m, n))", explanation: "Visit every cell once; BFS queue holds at most min(m,n) cells", tradeoff: "In-place modification avoids a separate visited array" },
  },

  interviewTips: [
    "Clarify: can we modify the grid in-place? If not, use a separate visited[][] boolean array.",
    "Mention both BFS and DFS approaches — BFS avoids stack overflow for very large grids.",
    "State the time complexity clearly: O(m*n) because each cell is visited at most once.",
    "Edge case: grid with all water (return 0) or all land (return 1).",
    "Mark cells as visited when ENQUEUING, not when DEQUEUING — avoids duplicates in the queue.",
  ],

  relatedProblems: ["max-area-of-island", "surrounded-regions", "pacific-atlantic-water-flow"],
};
