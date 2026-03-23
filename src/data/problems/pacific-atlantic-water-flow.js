export const pacificAtlanticWaterFlow = {
  id: 85,
  slug: "pacific-atlantic-water-flow",
  title: "Pacific Atlantic Water Flow",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 85,
  artifactType: "GraphBFS",
  companies: ["Google", "Amazon", "Meta", "Goldman Sachs", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/pacific-atlantic-water-flow/",

  pattern: "Reverse DFS from Ocean Borders",
  patternExplanation: `Instead of DFS from every cell to see if it reaches both oceans, reverse the
    problem: DFS inward from each ocean's border. A cell reachable from the Pacific border AND
    the Atlantic border is in the answer set. This reduces work from O((m*n)^2) to O(m*n).`,

  intuition: {
    coreInsight: `Water flows downhill, but we reverse the question: which cells can be reached
      by "climbing uphill" from each ocean? DFS from the Pacific border marks all cells that
      can drain to the Pacific. DFS from the Atlantic border marks all cells that can drain
      to the Atlantic. The intersection — cells marked by BOTH — is the answer.`,

    mentalModel: `Imagine the Pacific ocean rises and floods inward, climbing to equal or higher
      elevations. Separately, the Atlantic does the same. After both floods, cells that got
      wet from BOTH oceans are the answer. This "reverse flooding" is much faster than checking
      each cell individually.`,

    whyNaiveFails: `The naive approach runs DFS/BFS from every cell to check if it can reach both
      oceans. With m*n cells and each search potentially visiting m*n cells, that's O((m*n)^2).
      For a 200x200 grid, that's 1.6 billion operations. Reverse DFS from borders is O(m*n).`,

    keyObservation: `When DFS-ing from the ocean inward, we move to neighbors with EQUAL OR
      GREATER height (climbing uphill). This is the reverse of water flowing downhill. A cell
      reachable by uphill-climbing from the Pacific CAN drain water downhill to the Pacific.`,
  },

  problem: `There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic
    Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches
    the island's right and bottom edges. The island receives a lot of rain, and the rain water can
    flow to neighboring cells directly north, south, east, and west if the neighboring cell's
    height is less than or equal to the current cell's height. Water can flow from any cell
    adjacent to an ocean into the ocean. Return a 2D list of grid coordinates result where
    result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the
    Pacific and Atlantic oceans.`,

  examples: [
    {
      input: `heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]`,
      output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
      explanation: "These 7 cells can reach both oceans.",
    },
    {
      input: "heights = [[1]]",
      output: "[[0,0]]",
      explanation: "Single cell borders both oceans.",
    },
  ],

  constraints: [
    "m == heights.length",
    "n == heights[r].length",
    "1 <= m, n <= 200",
    "0 <= heights[r][c] <= 10^5",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Reverse DFS from Both Oceans",
      tier: "optimal",
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(m × n)",
      idea: `DFS from all Pacific border cells, marking reachable cells. DFS from all Atlantic
        border cells, marking reachable cells. Return cells that appear in both sets.`,

      javaCode: `public List<List<Integer>> pacificAtlantic(int[][] heights) {
    int rows = heights.length, cols = heights[0].length;
    boolean[][] pacific = new boolean[rows][cols];
    boolean[][] atlantic = new boolean[rows][cols];

    for (int r = 0; r < rows; r++) {
        dfs(heights, pacific, r, 0);
        dfs(heights, atlantic, r, cols - 1);
    }
    for (int c = 0; c < cols; c++) {
        dfs(heights, pacific, 0, c);
        dfs(heights, atlantic, rows - 1, c);
    }

    List<List<Integer>> result = new ArrayList<>();
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.add(Arrays.asList(r, c));
            }
        }
    }
    return result;
}

private void dfs(int[][] heights, boolean[][] ocean,
                 int r, int c) {
    ocean[r][c] = true;
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    for (int[] d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nr < heights.length
            && nc >= 0 && nc < heights[0].length
            && !ocean[nr][nc]
            && heights[nr][nc] >= heights[r][c]) {
            dfs(heights, ocean, nr, nc);
        }
    }
}`,

      cppCode: `vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
    int rows = heights.size(), cols = heights[0].size();
    vector<vector<bool>> pacific(rows, vector<bool>(cols, false));
    vector<vector<bool>> atlantic(rows, vector<bool>(cols, false));

    for (int r = 0; r < rows; r++) {
        dfs(heights, pacific, r, 0);
        dfs(heights, atlantic, r, cols - 1);
    }
    for (int c = 0; c < cols; c++) {
        dfs(heights, pacific, 0, c);
        dfs(heights, atlantic, rows - 1, c);
    }

    vector<vector<int>> result;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push_back({r, c});
            }
        }
    }
    return result;
}

void dfs(vector<vector<int>>& heights,
         vector<vector<bool>>& ocean, int r, int c) {
    ocean[r][c] = true;
    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
    for (auto& d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nr < (int)heights.size()
            && nc >= 0 && nc < (int)heights[0].size()
            && !ocean[nr][nc]
            && heights[nr][nc] >= heights[r][c]) {
            dfs(heights, ocean, nr, nc);
        }
    }
}`,

      pythonCode: `def pacificAtlantic(heights: List[List[int]]) -> List[List[int]]:
    rows, cols = len(heights), len(heights[0])
    pacific = set()
    atlantic = set()

    def dfs(r, c, ocean, prev_height):
        if (r, c) in ocean or r < 0 or r >= rows \\
            or c < 0 or c >= cols or heights[r][c] < prev_height:
            return
        ocean.add((r, c))
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            dfs(r + dr, c + dc, ocean, heights[r][c])

    for r in range(rows):
        dfs(r, 0, pacific, heights[r][0])
        dfs(r, cols - 1, atlantic, heights[r][cols - 1])

    for c in range(cols):
        dfs(0, c, pacific, heights[0][c])
        dfs(rows - 1, c, atlantic, heights[rows - 1][c])

    return [[r, c] for r, c in pacific & atlantic]`,

      lineAnnotations: {
        1: "Main function — returns list of cells reaching both oceans",
        3: "Boolean grids tracking which cells reach each ocean",
        6: "DFS from left column (Pacific) and right column (Atlantic)",
        10: "DFS from top row (Pacific) and bottom row (Atlantic)",
        15: "Collect cells that reach BOTH oceans",
        18: "Cell reaches both Pacific AND Atlantic — add to result",
        24: "DFS helper — marks cells reachable from an ocean",
        25: "Mark current cell as reachable",
        28: "Check neighbor: in bounds, not visited, height >= current",
        32: "Move uphill — reverse of water flowing downhill",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "3x3 grid with clear flow patterns",
          input: { heights: [[1,2,3],[8,9,4],[7,6,5]] },
          expectedOutput: "[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3],
              shortLabel: "Initialize pacific and atlantic sets",
              explanation: "Create two boolean grids: pacific[][] and atlantic[][]. Pacific borders: top row + left column. Atlantic borders: bottom row + right column.",
              variables: { rows: 3, cols: 3, pacificCount: 0, atlanticCount: 0 },
              dataStructure: {
                grid: [[1,2,3],[8,9,4],[7,6,5]],
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
              lineNumbers: [6, 10, 25],
              shortLabel: "DFS from Pacific borders",
              explanation: "DFS inward from top row and left column, climbing to equal-or-higher cells. Pacific reaches: (0,0)=1, (0,1)=2, (0,2)=3, (1,0)=8, (1,1)=9, (1,2)=4, (2,0)=7, (2,1)=6, (2,2)=5. All cells reachable from Pacific!",
              variables: { pacificCount: 9, ocean: "Pacific" },
              dataStructure: {
                grid: [[1,2,3],[8,9,4],[7,6,5]],
                gridStates: [
                  ["visited","visited","visited"],
                  ["visited","visited","visited"],
                  ["visited","visited","visited"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 11, 25],
              shortLabel: "DFS from Atlantic borders",
              explanation: "DFS inward from bottom row and right column, climbing uphill. Atlantic reaches: (2,0)=7, (2,1)=6, (2,2)=5, (1,0)=8, (1,1)=9, (1,2)=4, (0,2)=3. NOT (0,0)=1 or (0,1)=2 — too low to climb to from Atlantic.",
              variables: { atlanticCount: 7, ocean: "Atlantic" },
              dataStructure: {
                grid: [[1,2,3],[8,9,4],[7,6,5]],
                gridStates: [
                  ["default","default","active"],
                  ["active","active","active"],
                  ["active","active","active"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15, 18],
              shortLabel: "Intersection: 7 cells reach both",
              explanation: "Cells in BOTH pacific AND atlantic: (0,2), (1,0), (1,1), (1,2), (2,0), (2,1), (2,2). Cells (0,0) and (0,1) only reach Pacific — they're too low for Atlantic to climb to.",
              variables: { resultCount: 7 },
              dataStructure: {
                grid: [[1,2,3],[8,9,4],[7,6,5]],
                gridStates: [
                  ["eliminated","eliminated","found"],
                  ["found","found","found"],
                  ["found","found","found"],
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
          label: "Flat Grid",
          description: "All cells same height — water flows everywhere",
          input: { heights: [[1,1],[1,1]] },
          expectedOutput: "[[0,0],[0,1],[1,0],[1,1]]",
          commonMistake: "Using strict greater-than instead of greater-than-or-equal. Equal heights allow water flow, so flat grids should have ALL cells in the answer.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3],
              shortLabel: "Initialize — all heights equal",
              explanation: "2x2 grid, all heights = 1. Since water flows to equal-or-lower heights, every cell can reach every border.",
              variables: { rows: 2, cols: 2 },
              dataStructure: {
                grid: [[1,1],[1,1]],
                gridStates: [
                  ["default","default"],
                  ["default","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 10, 25],
              shortLabel: "Pacific DFS — all cells reachable",
              explanation: "DFS from Pacific borders: all cells are height 1, so we can move freely. All 4 cells reach Pacific.",
              variables: { pacificCount: 4 },
              dataStructure: {
                grid: [[1,1],[1,1]],
                gridStates: [
                  ["visited","visited"],
                  ["visited","visited"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 11, 25],
              shortLabel: "Atlantic DFS — all cells reachable",
              explanation: "DFS from Atlantic borders: same result. All 4 cells reach Atlantic.",
              variables: { atlanticCount: 4 },
              dataStructure: {
                grid: [[1,1],[1,1]],
                gridStates: [
                  ["active","active"],
                  ["active","active"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15, 18],
              shortLabel: "All 4 cells in answer",
              explanation: "Every cell reaches both oceans. Return all 4 coordinates.",
              variables: { answer: "[[0,0],[0,1],[1,0],[1,1]]", resultCount: 4 },
              dataStructure: {
                grid: [[1,1],[1,1]],
                gridStates: [
                  ["found","found"],
                  ["found","found"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ heights }) {
        const steps = [];
        const rows = heights.length;
        const cols = heights[0].length;
        const pacific = Array.from({ length: rows }, () => Array(cols).fill(false));
        const atlantic = Array.from({ length: rows }, () => Array(cols).fill(false));
        const states = Array.from({ length: rows }, () => Array(cols).fill("default"));

        steps.push({
          stepId: 0,
          lineNumbers: [1, 3],
          shortLabel: "Initialize",
          explanation: `Grid is ${rows}x${cols}. Create pacific[][] and atlantic[][] boolean grids.`,
          variables: { rows, cols },
          dataStructure: {
            grid: heights.map(r => [...r]),
            gridStates: states.map(r => [...r]),
            bfsQueue: [],
          },
          delta: {},
          isAnswer: false,
        });

        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

        function dfs(r, c, ocean) {
          ocean[r][c] = true;
          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && !ocean[nr][nc]
                && heights[nr][nc] >= heights[r][c]) {
              dfs(nr, nc, ocean);
            }
          }
        }

        // Pacific DFS
        for (let r = 0; r < rows; r++) dfs(r, 0, pacific);
        for (let c = 0; c < cols; c++) dfs(0, c, pacific);

        let pacificCount = 0;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (pacific[r][c]) { states[r][c] = "visited"; pacificCount++; }
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [6, 10, 25],
          shortLabel: `Pacific reaches ${pacificCount} cells`,
          explanation: `DFS from Pacific borders (top + left). ${pacificCount} cells can drain to Pacific.`,
          variables: { pacificCount },
          dataStructure: {
            grid: heights.map(r => [...r]),
            gridStates: states.map(r => [...r]),
            bfsQueue: [],
          },
          delta: {},
          isAnswer: false,
        });

        // Atlantic DFS
        for (let r = 0; r < rows; r++) dfs(r, cols - 1, atlantic);
        for (let c = 0; c < cols; c++) dfs(rows - 1, c, atlantic);

        let atlanticCount = 0;
        const statesAtlantic = Array.from({ length: rows }, () => Array(cols).fill("default"));
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (atlantic[r][c]) { statesAtlantic[r][c] = "active"; atlanticCount++; }
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [7, 11, 25],
          shortLabel: `Atlantic reaches ${atlanticCount} cells`,
          explanation: `DFS from Atlantic borders (bottom + right). ${atlanticCount} cells can drain to Atlantic.`,
          variables: { atlanticCount },
          dataStructure: {
            grid: heights.map(r => [...r]),
            gridStates: statesAtlantic.map(r => [...r]),
            bfsQueue: [],
          },
          delta: {},
          isAnswer: false,
        });

        // Intersection
        const result = [];
        const finalStates = Array.from({ length: rows }, () => Array(cols).fill("default"));
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
              finalStates[r][c] = "found";
              result.push([r, c]);
            } else if (pacific[r][c]) {
              finalStates[r][c] = "visited";
            } else if (atlantic[r][c]) {
              finalStates[r][c] = "active";
            } else {
              finalStates[r][c] = "eliminated";
            }
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [15, 18],
          shortLabel: `${result.length} cells reach both oceans`,
          explanation: `Intersection of Pacific and Atlantic sets: ${result.length} cells can drain to both oceans.`,
          variables: { resultCount: result.length, answer: JSON.stringify(result) },
          dataStructure: {
            grid: heights.map(r => [...r]),
            gridStates: finalStates.map(r => [...r]),
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
    optimal: { time: "O(m × n)", space: "O(m × n)", explanation: "Two DFS passes, each visiting every cell at most once; two boolean grids of size m*n", tradeoff: "Reverse DFS avoids O((m*n)^2) of forward DFS from every cell" },
  },

  interviewTips: [
    "The key insight: reverse the problem. Instead of from-cell-to-ocean, go from-ocean-to-cell.",
    "Mention that 'climbing uphill from the ocean' is equivalent to 'water flowing downhill to the ocean'.",
    "Use >= not > when comparing heights — equal heights allow water flow.",
    "BFS works too — DFS and BFS have the same complexity here.",
    "Edge case: single cell borders both oceans, so it's always in the result.",
    "Don't forget corner cells — they border BOTH oceans directly.",
  ],

  relatedProblems: ["number-of-islands", "surrounded-regions", "max-area-of-island"],
};
