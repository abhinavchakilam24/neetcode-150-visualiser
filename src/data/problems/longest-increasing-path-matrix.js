export const longestIncreasingPathMatrix = {
  id: 116,
  slug: "longest-increasing-path-matrix",
  title: "Longest Increasing Path in a Matrix",
  difficulty: "Hard",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 116,
  artifactType: "DPTable2D",
  companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",

  pattern: "DFS + Memoization on Matrix",
  patternExplanation: `From each cell, DFS in 4 directions to cells with strictly larger values.
    Cache the result for each cell to avoid recomputation. Answer is the maximum cached value.`,

  intuition: {
    coreInsight: `From every cell, we can move to any adjacent cell with a strictly larger value,
      forming an increasing path. The longest path from cell (r,c) depends on the longest paths
      from its valid neighbors. Since paths are strictly increasing, there are no cycles, making
      memoization safe — each cell's answer is fixed once computed.`,

    mentalModel: `Imagine water flowing downhill on a terrain map. Each cell's "longest flow"
      depends on how far water can travel from its higher neighbors. Once you calculate the
      longest flow from a cell, you never need to recalculate it — water always flows the
      same way from the same point. The memo table is like marking each cell with its flow distance.`,

    whyNaiveFails: `Pure DFS from every cell without memoization revisits the same cells many
      times. For an m x n matrix, each of the m*n cells could trigger a DFS that visits O(m*n)
      cells, giving O((m*n)^2) in the worst case. With memoization, each cell is computed exactly
      once, reducing to O(m*n).`,

    keyObservation: `The strictly increasing constraint guarantees no cycles — if you move from A
      to B, B > A, so you can never return to A. This means the DFS naturally terminates and
      memoization is valid. The DAG structure of the problem is what makes DP applicable here.`,
  },

  problem: `Given an m x n integers matrix, return the length of the longest increasing path
    in matrix. From each cell, you can move in four directions: left, right, up, or down.
    You may not move diagonally or move outside the boundary.`,

  examples: [
    { input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]", output: "4", explanation: "Longest increasing path is [1, 2, 6, 9]" },
    { input: "matrix = [[3,4,5],[3,2,6],[2,2,1]]", output: "4", explanation: "Longest increasing path is [3, 4, 5, 6]" },
  ],

  constraints: [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 200",
    "0 <= matrix[i][j] <= 2^31 - 1",
  ],

  approaches: {
    brute: {
      label: "DFS Without Memo",
      tier: "brute",
      timeComplexity: "O((m*n)²)",
      spaceComplexity: "O(m*n)",
      idea: "Run DFS from every cell, exploring all increasing paths. No caching — lots of recomputation.",

      javaCode: `public int longestIncreasingPath(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int result = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result = Math.max(result, dfs(matrix, i, j, m, n));
        }
    }
    return result;
}

private int dfs(int[][] matrix, int r, int c, int m, int n) {
    int best = 1;
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    for (int[] d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nr < m && nc >= 0 && nc < n
            && matrix[nr][nc] > matrix[r][c]) {
            best = Math.max(best, 1 + dfs(matrix, nr, nc, m, n));
        }
    }
    return best;
}`,

      cppCode: `int longestIncreasingPath(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    int result = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result = max(result, dfs(matrix, i, j, m, n));
        }
    }
    return result;
}

int dfs(vector<vector<int>>& matrix, int r, int c, int m, int n) {
    int best = 1;
    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
    for (auto& d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nr < m && nc >= 0 && nc < n
            && matrix[nr][nc] > matrix[r][c]) {
            best = max(best, 1 + dfs(matrix, nr, nc, m, n));
        }
    }
    return best;
}`,

      pythonCode: `def longestIncreasingPath(matrix: List[List[int]]) -> int:
    m, n = len(matrix), len(matrix[0])
    def dfs(r, c):
        best = 1
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                best = max(best, 1 + dfs(nr, nc))
        return best
    result = 0
    for i in range(m):
        for j in range(n):
            result = max(result, dfs(i, j))
    return result`,

      lineAnnotations: {
        4: "Try starting DFS from every cell",
        12: "Each cell starts with path length 1 (itself)",
        15: "Explore all 4 neighbors",
        17: "Only move to strictly larger values",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { matrix: [[9,9,4],[6,6,8],[2,1,1]] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0, lineNumbers: [1, 4], shortLabel: "Start DFS from each cell",
              explanation: "Try DFS from every cell in the 3x3 matrix. Without memoization, many cells will be revisited multiple times.",
              variables: { m: 3, n: 3, result: 0 },
              dataStructure: { dpTable: [[9,9,4],[6,6,8],[2,1,1]], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [12, 15, 17], shortLabel: "DFS explores paths",
              explanation: "From cell (2,1) value=1: can go to (2,0)=2, then (1,0)=6, then (0,0)=9. Path [1,2,6,9] has length 4.",
              variables: { path: "[1,2,6,9]", length: 4 },
              dataStructure: { dpTable: [[9,9,4],[6,6,8],[2,1,1]], dpHighlight2D: { row: 2, col: 1 } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [8], shortLabel: "Result: 4",
              explanation: "After trying all starting cells, the longest increasing path is [1,2,6,9] with length 4.",
              variables: { answer: 4 },
              dataStructure: { dpTable: [[9,9,4],[6,6,8],[2,1,1]], dpHighlight2D: null },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ matrix }) {
        const m = matrix.length, n = matrix[0].length;
        const memo = Array.from({ length: m }, () => new Array(n).fill(0));
        function dfs(r, c) {
          if (memo[r][c]) return memo[r][c];
          let best = 1;
          for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
              best = Math.max(best, 1 + dfs(nr, nc));
            }
          }
          return memo[r][c] = best;
        }
        let result = 0;
        for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) result = Math.max(result, dfs(i, j));
        return [
          { stepId: 0, lineNumbers: [1], shortLabel: "Start", explanation: `Find longest increasing path in ${m}x${n} matrix.`, variables: { m, n }, dataStructure: { dpTable: matrix, dpHighlight2D: null }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [8], shortLabel: `Result: ${result}`, explanation: `Longest increasing path has length ${result}.`, variables: { answer: result }, dataStructure: { dpTable: matrix, dpHighlight2D: null }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "DFS + Memoization",
      tier: "optimal",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
      idea: `DFS from each cell with memoization. memo[r][c] stores the longest path starting
        at (r,c). Each cell computed once — total O(m*n).`,

      javaCode: `public int longestIncreasingPath(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int[][] memo = new int[m][n];
    int result = 0;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result = Math.max(result, dfs(matrix, memo, i, j, m, n));
        }
    }
    return result;
}

private int dfs(int[][] mat, int[][] memo, int r, int c, int m, int n) {
    if (memo[r][c] != 0) return memo[r][c];
    int best = 1;
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    for (int[] d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nr < m && nc >= 0 && nc < n
            && mat[nr][nc] > mat[r][c]) {
            best = Math.max(best, 1 + dfs(mat, memo, nr, nc, m, n));
        }
    }
    return memo[r][c] = best;
}`,

      cppCode: `int longestIncreasingPath(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<int>> memo(m, vector<int>(n, 0));
    int result = 0;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result = max(result, dfs(matrix, memo, i, j, m, n));
        }
    }
    return result;
}

int dfs(vector<vector<int>>& mat, vector<vector<int>>& memo,
        int r, int c, int m, int n) {
    if (memo[r][c] != 0) return memo[r][c];
    int best = 1;
    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
    for (auto& d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nr < m && nc >= 0 && nc < n
            && mat[nr][nc] > mat[r][c]) {
            best = max(best, 1 + dfs(mat, memo, nr, nc, m, n));
        }
    }
    return memo[r][c] = best;
}`,

      pythonCode: `def longestIncreasingPath(matrix: List[List[int]]) -> int:
    m, n = len(matrix), len(matrix[0])
    memo = [[0] * n for _ in range(m)]

    def dfs(r, c):
        if memo[r][c]: return memo[r][c]
        best = 1
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                best = max(best, 1 + dfs(nr, nc))
        memo[r][c] = best
        return best

    result = 0
    for i in range(m):
        for j in range(n):
            result = max(result, dfs(i, j))
    return result`,

      lineAnnotations: {
        3: "Memo table: memo[r][c] = longest path starting from (r,c)",
        7: "Try starting from every cell, track global max",
        15: "If already computed, return cached result",
        16: "Every cell has at least path length 1 (itself)",
        21: "Only move to strictly larger neighbors",
        25: "Cache result before returning",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "3x3 matrix with path [1,2,6,9]",
          input: { matrix: [[9,9,4],[6,6,8],[2,1,1]] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0, lineNumbers: [3],
              shortLabel: "Init memo table",
              explanation: "Create a 3x3 memo table initialized to 0. We'll fill it via DFS with memoization.",
              variables: { m: 3, n: 3 },
              dataStructure: {
                dpTable: [[0,0,0],[0,0,0],[0,0,0]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [7, 15, 16],
              shortLabel: "DFS(0,0): val=9, no larger neighbor",
              explanation: "Start at (0,0) value=9. Check all 4 neighbors: (0,1)=9 not larger, (1,0)=6 not larger. No valid moves. memo[0][0] = 1.",
              variables: { r: 0, c: 0, val: 9, best: 1 },
              dataStructure: {
                dpTable: [[1,0,0],[0,0,0],[0,0,0]],
                dpHighlight2D: { row: 0, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [7, 15, 16],
              shortLabel: "DFS(0,1): val=9, no larger",
              explanation: "At (0,1) value=9. Neighbors: (0,0)=9, (0,2)=4, (1,1)=6. None larger. memo[0][1] = 1.",
              variables: { r: 0, c: 1, val: 9, best: 1 },
              dataStructure: {
                dpTable: [[1,1,0],[0,0,0],[0,0,0]],
                dpHighlight2D: { row: 0, col: 1 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [15, 21, 22],
              shortLabel: "DFS(0,2): val=4, go to (1,2)=8",
              explanation: "At (0,2) value=4. Neighbor (1,2)=8 is larger. DFS into (1,2). From (1,2)=8, neighbor (0,1)=9 is larger → memo[0,1]=1. So memo[1][2]=2, memo[0][2]=3.",
              variables: { r: 0, c: 2, val: 4, "path": "[4,8,9]", best: 3 },
              dataStructure: {
                dpTable: [[1,1,3],[0,0,2],[0,0,0]],
                dpHighlight2D: { row: 0, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [15, 21, 22],
              shortLabel: "DFS(1,0): val=6, go to (0,0)=9",
              explanation: "At (1,0) value=6. Neighbor (0,0)=9 is larger, memo[0][0]=1. So memo[1][0] = 1 + 1 = 2.",
              variables: { r: 1, c: 0, val: 6, best: 2 },
              dataStructure: {
                dpTable: [[1,1,3],[2,0,2],[0,0,0]],
                dpHighlight2D: { row: 1, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [15, 21, 22],
              shortLabel: "DFS(2,0): val=2, path [2,6,9]",
              explanation: "At (2,0) value=2. Neighbor (1,0)=6 is larger, memo[1][0]=2. So memo[2][0] = 1 + 2 = 3.",
              variables: { r: 2, c: 0, val: 2, best: 3 },
              dataStructure: {
                dpTable: [[1,1,3],[2,0,2],[3,0,0]],
                dpHighlight2D: { row: 2, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [15, 21, 22],
              shortLabel: "DFS(2,1): val=1, path [1,2,6,9]",
              explanation: "At (2,1) value=1. Neighbor (2,0)=2 is larger, memo[2][0]=3. So memo[2][1] = 1 + 3 = 4. This is the longest path: [1,2,6,9]!",
              variables: { r: 2, c: 1, val: 1, best: 4, path: "[1,2,6,9]" },
              dataStructure: {
                dpTable: [[1,1,3],[2,2,2],[3,4,1]],
                dpHighlight2D: { row: 2, col: 1 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 7, lineNumbers: [10],
              shortLabel: "Return max = 4",
              explanation: "After computing all cells, the maximum in the memo table is 4. The longest increasing path is [1, 2, 6, 9], starting from (2,1).",
              variables: { answer: 4 },
              dataStructure: {
                dpTable: [[1,1,3],[2,2,2],[3,4,1]],
                dpHighlight2D: { row: 2, col: 1 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Row",
          description: "1x4 matrix — path goes left to right",
          input: { matrix: [[1,3,5,7]] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0, lineNumbers: [3],
              shortLabel: "Init memo",
              explanation: "1x4 matrix [1,3,5,7]. All values strictly increasing left to right.",
              variables: { m: 1, n: 4 },
              dataStructure: { dpTable: [[0,0,0,0]], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [15, 21],
              shortLabel: "DFS(0,0): chain 1→3→5→7",
              explanation: "From (0,0)=1, we can go right to 3, then 5, then 7. Path length 4. memo = [4,3,2,1].",
              variables: { path: "[1,3,5,7]", "memo": "[4,3,2,1]" },
              dataStructure: { dpTable: [[4,3,2,1]], dpHighlight2D: { row: 0, col: 0 } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [10],
              shortLabel: "Return 4",
              explanation: "The entire row forms an increasing path of length 4.",
              variables: { answer: 4 },
              dataStructure: { dpTable: [[4,3,2,1]], dpHighlight2D: { row: 0, col: 0 } },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ matrix }) {
        const steps = [];
        const m = matrix.length, n = matrix[0].length;
        const memo = Array.from({ length: m }, () => new Array(n).fill(0));

        function dfs(r, c) {
          if (memo[r][c]) return memo[r][c];
          let best = 1;
          for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
              best = Math.max(best, 1 + dfs(nr, nc));
            }
          }
          return memo[r][c] = best;
        }

        steps.push({
          stepId: 0, lineNumbers: [3],
          shortLabel: "Init memo",
          explanation: `Create ${m}x${n} memo table. DFS with memoization from each cell.`,
          variables: { m, n },
          dataStructure: { dpTable: memo.map(r => [...r]), dpHighlight2D: null },
          delta: {}, isAnswer: false,
        });

        let result = 0;
        for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
            const val = dfs(i, j);
            result = Math.max(result, val);
            steps.push({
              stepId: steps.length, lineNumbers: [7, 25],
              shortLabel: `memo[${i}][${j}]=${val}`,
              explanation: `DFS from (${i},${j}) value=${matrix[i][j]}: longest increasing path = ${val}.`,
              variables: { r: i, c: j, val: matrix[i][j], best: val, result },
              dataStructure: { dpTable: memo.map(r => [...r]), dpHighlight2D: { row: i, col: j } },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: `Return ${result}`,
          explanation: `Maximum in memo table is ${result}. That's the longest increasing path.`,
          variables: { answer: result },
          dataStructure: { dpTable: memo.map(r => [...r]), dpHighlight2D: null },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O((m*n)²)", space: "O(m*n)", explanation: "DFS from each cell without caching revisits cells" },
    optimal: { time: "O(m*n)", space: "O(m*n)", explanation: "Each cell computed once via memoization", tradeoff: "O(m*n) memo space ensures each cell is DFS'd at most once" },
  },

  interviewTips: [
    "Explain why memoization works: strictly increasing means no cycles → safe to cache.",
    "Mention this is essentially DP on a DAG (directed acyclic graph).",
    "The answer is the global max over all cells, not just a corner cell.",
    "Alternative: topological sort by cell value, process smallest first.",
    "Clarify: diagonal moves are NOT allowed.",
  ],

  relatedProblems: ["unique-paths", "longest-increasing-subsequence", "number-of-islands"],
};
