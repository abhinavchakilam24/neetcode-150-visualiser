export const maxAreaOfIsland = {
  id: 81,
  slug: "max-area-of-island",
  title: "Max Area of Island",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 81,
  artifactType: "GraphBFS",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "DoorDash"],
  leetcodeLink: "https://leetcode.com/problems/max-area-of-island/",

  pattern: "BFS/DFS Grid Traversal with Area Tracking",
  patternExplanation: `Similar to Number of Islands, but instead of just counting islands,
    we track the size of each island during the BFS/DFS traversal and keep a running maximum.`,

  intuition: {
    coreInsight: `This is Number of Islands with one twist: instead of just counting islands,
      we measure each one. During BFS/DFS, every cell we visit adds 1 to the current island's
      area. After fully exploring an island, compare its area to the global max. The algorithm
      is identical — we just carry a counter through the flood fill.`,

    mentalModel: `Imagine you're a cartographer mapping islands from a helicopter. Each time you
      spot new land, you send a survey team (BFS) to walk every square meter of that island
      and report back the total area. You write down each island's area and at the end,
      report the largest one. The survey team's pedometer IS the area counter.`,

    whyNaiveFails: `Without BFS/DFS, you'd have to figure out which cells belong to the same
      island using some other method — perhaps union-find, which works but is more complex.
      The naive approach of just counting 1s gives total land area, not the area of the
      largest single island. You need connected component analysis.`,

    keyObservation: `Each BFS/DFS call returns the area of exactly one island. We simply take
      the maximum across all calls. The key implementation detail: increment area for every
      cell dequeued (or visited in DFS), not when enqueuing — otherwise you might double-count
      cells that appear in the queue multiple times if you forget to mark on enqueue.`,
  },

  problem: `You are given an m x n binary matrix grid. An island is a group of 1's (representing
    land) connected 4-directionally (horizontal or vertical). You may assume all four edges of
    the grid are surrounded by water. The area of an island is the number of cells with a value
    1 in the island. Return the maximum area of an island in grid. If there is no island,
    return 0.`,

  examples: [
    {
      input: `grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]`,
      output: "6",
      explanation: "The largest island has area 6 (the connected region in the bottom-right area).",
    },
    {
      input: "grid = [[0,0,0,0,0,0,0,0]]",
      output: "0",
      explanation: "No island exists, return 0.",
    },
  ],

  constraints: [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 50",
    "grid[i][j] is either 0 or 1",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "BFS Flood Fill with Area Counter",
      tier: "optimal",
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(m × n)",
      idea: `Scan every cell. When we find an unvisited 1, BFS to explore the entire island
        while counting cells. Track the maximum area seen across all islands.`,

      javaCode: `public int maxAreaOfIsland(int[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    int maxArea = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                maxArea = Math.max(maxArea, bfs(grid, r, c));
            }
        }
    }
    return maxArea;
}

private int bfs(int[][] grid, int r, int c) {
    int rows = grid.length, cols = grid[0].length;
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{r, c});
    grid[r][c] = 0;
    int area = 0;

    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        area++;
        for (int[] d : dirs) {
            int nr = cell[0] + d[0], nc = cell[1] + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && grid[nr][nc] == 1) {
                grid[nr][nc] = 0;
                queue.offer(new int[]{nr, nc});
            }
        }
    }
    return area;
}`,

      cppCode: `int maxAreaOfIsland(vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    int maxArea = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                maxArea = max(maxArea, bfs(grid, r, c));
            }
        }
    }
    return maxArea;
}

int bfs(vector<vector<int>>& grid, int r, int c) {
    int rows = grid.size(), cols = grid[0].size();
    queue<pair<int,int>> q;
    q.push({r, c});
    grid[r][c] = 0;
    int area = 0;

    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!q.empty()) {
        auto [cr, cc] = q.front(); q.pop();
        area++;
        for (auto& d : dirs) {
            int nr = cr + d[0], nc = cc + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && grid[nr][nc] == 1) {
                grid[nr][nc] = 0;
                q.push({nr, nc});
            }
        }
    }
    return area;
}`,

      pythonCode: `def maxAreaOfIsland(grid: List[List[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    max_area = 0

    def bfs(r, c):
        queue = deque([(r, c)])
        grid[r][c] = 0
        area = 0
        while queue:
            cr, cc = queue.popleft()
            area += 1
            for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                nr, nc = cr + dr, cc + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 0
                    queue.append((nr, nc))
        return area

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                max_area = max(max_area, bfs(r, c))

    return max_area`,

      lineAnnotations: {
        1: "Main function — returns the max island area",
        3: "Track the largest area seen so far",
        5: "Scan every cell in the grid",
        7: "Found unvisited land — BFS to measure this island",
        8: "Update maxArea if this island is larger",
        14: "BFS helper — returns the area of one island",
        17: "Initialize queue with starting cell",
        18: "Mark starting cell visited",
        19: "Area counter for this island",
        22: "Dequeue front cell",
        23: "Increment area for each cell processed",
        25: "Check neighbor is in bounds and is land",
        27: "Mark neighbor visited and enqueue",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Two islands of different sizes",
          input: { grid: [[1,1,0,0],[1,0,0,0],[0,0,1,1],[0,0,1,0]] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3],
              shortLabel: "Initialize maxArea = 0",
              explanation: "Start scanning the 4x4 grid. maxArea = 0. We will BFS each island and track the largest area.",
              variables: { maxArea: 0, r: 0, c: 0 },
              dataStructure: {
                grid: [[1,1,0,0],[1,0,0,0],[0,0,1,1],[0,0,1,0]],
                gridStates: [
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 7],
              shortLabel: "Found land at (0,0) — start BFS",
              explanation: "grid[0][0] = 1. Start BFS to measure this island. Initialize area = 0.",
              variables: { maxArea: 0, r: 0, c: 0, area: 0 },
              dataStructure: {
                grid: [[1,1,0,0],[1,0,0,0],[0,0,1,1],[0,0,1,0]],
                gridStates: [
                  ["active","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                ],
                bfsQueue: ["0,0"],
              },
              delta: { changedCells: [{r:0,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [22, 23, 25, 27],
              shortLabel: "Process (0,0), area=1, enqueue (0,1),(1,0)",
              explanation: "Dequeue (0,0), area becomes 1. Neighbors (0,1) and (1,0) are land — enqueue them. (0,-1) and (-1,0) are out of bounds.",
              variables: { maxArea: 0, area: 1, processing: "(0,0)", queueSize: 2 },
              dataStructure: {
                grid: [[0,1,0,0],[1,0,0,0],[0,0,1,1],[0,0,1,0]],
                gridStates: [
                  ["visited","queued","default","default"],
                  ["queued","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                ],
                bfsQueue: ["0,1","1,0"],
              },
              delta: { changedCells: [{r:0,c:0},{r:0,c:1},{r:1,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [22, 23],
              shortLabel: "Process (0,1), area=2. Process (1,0), area=3",
              explanation: "Dequeue (0,1), area=2. No new land neighbors. Dequeue (1,0), area=3. No new land neighbors. Queue empty — island fully explored.",
              variables: { maxArea: 0, area: 3, queueSize: 0 },
              dataStructure: {
                grid: [[0,0,0,0],[0,0,0,0],[0,0,1,1],[0,0,1,0]],
                gridStates: [
                  ["visited","visited","default","default"],
                  ["visited","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:0,c:1},{r:1,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8],
              shortLabel: "Island area=3, maxArea=3",
              explanation: "BFS returned area=3. maxArea = max(0, 3) = 3. Continue scanning for more islands.",
              variables: { maxArea: 3, area: 3 },
              dataStructure: {
                grid: [[0,0,0,0],[0,0,0,0],[0,0,1,1],[0,0,1,0]],
                gridStates: [
                  ["visited","visited","default","default"],
                  ["visited","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 7],
              shortLabel: "Found land at (2,2) — start BFS",
              explanation: "Scanning continues. grid[2][2] = 1. Start BFS for island #2.",
              variables: { maxArea: 3, r: 2, c: 2, area: 0 },
              dataStructure: {
                grid: [[0,0,0,0],[0,0,0,0],[0,0,1,1],[0,0,1,0]],
                gridStates: [
                  ["visited","visited","default","default"],
                  ["visited","default","default","default"],
                  ["default","default","active","default"],
                  ["default","default","default","default"],
                ],
                bfsQueue: ["2,2"],
              },
              delta: { changedCells: [{r:2,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [22, 23, 25, 27],
              shortLabel: "BFS explores island #2 — area=3",
              explanation: "BFS from (2,2): process (2,2) area=1, enqueue (2,3) and (3,2). Process (2,3) area=2 — no new neighbors. Process (3,2) area=3 — no new neighbors. Queue empty.",
              variables: { maxArea: 3, area: 3, queueSize: 0 },
              dataStructure: {
                grid: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
                gridStates: [
                  ["visited","visited","default","default"],
                  ["visited","default","default","default"],
                  ["default","default","visited","visited"],
                  ["default","default","visited","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:2,c:2},{r:2,c:3},{r:3,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [8, 11],
              shortLabel: "Island area=3, maxArea stays 3. Return 3",
              explanation: "BFS returned area=3. maxArea = max(3, 3) = 3. Scan complete — no more land cells. Return maxArea = 3.",
              variables: { maxArea: 3, answer: 3 },
              dataStructure: {
                grid: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
                gridStates: [
                  ["found","found","default","default"],
                  ["found","default","default","default"],
                  ["default","default","found","found"],
                  ["default","default","found","default"],
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
          label: "Single Cell Islands",
          description: "Multiple isolated single-cell islands",
          input: { grid: [[1,0,1],[0,1,0],[1,0,1]] },
          expectedOutput: "1",
          commonMistake: "Forgetting that a single cell counts as an island of area 1. Some implementations skip BFS for isolated cells.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3],
              shortLabel: "Initialize maxArea = 0",
              explanation: "Start scanning the 3x3 grid. Every land cell is isolated — each forms its own island of area 1.",
              variables: { maxArea: 0 },
              dataStructure: {
                grid: [[1,0,1],[0,1,0],[1,0,1]],
                gridStates: [
                  ["default","default","default"],
                  ["default","default","default"],
                  ["default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 7, 22, 23],
              shortLabel: "Island at (0,0) — area=1, maxArea=1",
              explanation: "grid[0][0]=1. BFS: dequeue (0,0), area=1. No land neighbors. maxArea = max(0,1) = 1.",
              variables: { maxArea: 1, area: 1, r: 0, c: 0 },
              dataStructure: {
                grid: [[0,0,1],[0,1,0],[1,0,1]],
                gridStates: [
                  ["visited","default","default"],
                  ["default","default","default"],
                  ["default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:0,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 7, 22, 23],
              shortLabel: "Island at (0,2) — area=1, maxArea=1",
              explanation: "grid[0][2]=1. BFS: area=1. No land neighbors. maxArea stays 1.",
              variables: { maxArea: 1, area: 1, r: 0, c: 2 },
              dataStructure: {
                grid: [[0,0,0],[0,1,0],[1,0,1]],
                gridStates: [
                  ["visited","default","visited"],
                  ["default","default","default"],
                  ["default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:0,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 7, 8],
              shortLabel: "Remaining islands — all area=1",
              explanation: "Continue scanning: (1,1), (2,0), (2,2) each form islands of area 1. maxArea stays 1 throughout.",
              variables: { maxArea: 1, islandsFound: 5 },
              dataStructure: {
                grid: [[0,0,0],[0,0,0],[0,0,0]],
                gridStates: [
                  ["visited","default","visited"],
                  ["default","visited","default"],
                  ["visited","default","visited"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:1,c:1},{r:2,c:0},{r:2,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11],
              shortLabel: "Return 1",
              explanation: "All 5 islands have area 1. The maximum area is 1.",
              variables: { maxArea: 1, answer: 1 },
              dataStructure: {
                grid: [[0,0,0],[0,0,0],[0,0,0]],
                gridStates: [
                  ["found","default","found"],
                  ["default","found","default"],
                  ["found","default","found"],
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
        const g = grid.map(row => row.map(v => (typeof v === 'string' ? parseInt(v) : v)));
        const states = Array.from({ length: rows }, () => Array(cols).fill("default"));
        let maxArea = 0;

        steps.push({
          stepId: 0,
          lineNumbers: [1, 3],
          shortLabel: "Initialize maxArea = 0",
          explanation: `Grid is ${rows}x${cols}. maxArea = 0. Begin scanning for land.`,
          variables: { maxArea: 0, rows, cols },
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
              states[r][c] = "active";

              steps.push({
                stepId: steps.length,
                lineNumbers: [5, 7],
                shortLabel: `Found land at (${r},${c})`,
                explanation: `grid[${r}][${c}] = 1. Start BFS to measure this island.`,
                variables: { maxArea, r, c, area: 0 },
                dataStructure: {
                  grid: g.map(row => [...row]),
                  gridStates: states.map(row => [...row]),
                  bfsQueue: [`${r},${c}`],
                },
                delta: { changedCells: [{r, c}] },
                isAnswer: false,
              });

              const queue = [[r, c]];
              g[r][c] = 0;
              states[r][c] = "visited";
              let area = 0;

              while (queue.length > 0) {
                const [cr, cc] = queue.shift();
                area++;
                for (const [dr, dc] of dirs) {
                  const nr = cr + dr;
                  const nc = cc + dc;
                  if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] === 1) {
                    g[nr][nc] = 0;
                    states[nr][nc] = "queued";
                    queue.push([nr, nc]);
                  }
                }
                states[cr][cc] = "visited";
              }

              maxArea = Math.max(maxArea, area);

              steps.push({
                stepId: steps.length,
                lineNumbers: [8],
                shortLabel: `Island area=${area}, maxArea=${maxArea}`,
                explanation: `BFS complete. Island area = ${area}. maxArea = max(${maxArea === area ? maxArea : maxArea + ', ' + area}) = ${maxArea}.`,
                variables: { maxArea, area },
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

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (states[r][c] === "visited") states[r][c] = "found";
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [11],
          shortLabel: `Return ${maxArea}`,
          explanation: `Scan complete. The largest island has area ${maxArea}.`,
          variables: { maxArea, answer: maxArea },
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
    brute: null,
    optimal: { time: "O(m × n)", space: "O(m × n)", explanation: "Visit every cell once; BFS queue can hold up to m*n cells in worst case", tradeoff: "In-place modification avoids a separate visited array" },
  },

  interviewTips: [
    "Mention this is a direct extension of Number of Islands — same traversal, just track area.",
    "Clarify: can we modify the grid in-place? If not, use a visited set.",
    "Both BFS and DFS work identically here — mention both and pick one.",
    "Edge case: grid of all 0s should return 0, not throw an error.",
    "Time complexity is O(m*n) regardless of number of islands — each cell visited at most once.",
  ],

  relatedProblems: ["number-of-islands", "surrounded-regions", "pacific-atlantic-water-flow"],
};
