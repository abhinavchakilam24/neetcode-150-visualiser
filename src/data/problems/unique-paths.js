export const uniquePaths = {
  id: 110,
  slug: "unique-paths",
  title: "Unique Paths",
  difficulty: "Medium",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 110,
  artifactType: "DPTable2D",
  companies: ["Google", "Amazon", "Meta", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/unique-paths/",

  pattern: "2D Grid DP with Top + Left Recurrence",
  patternExplanation: `When counting paths in a grid where movement is restricted to right and
    down, dp[i][j] = dp[i-1][j] + dp[i][j-1]. The first row and column are all 1s because
    there's only one way to reach any cell on the border — go straight right or straight down.`,

  intuition: {
    coreInsight: `A robot at cell (i,j) must have arrived from either the cell above (i-1,j)
      or the cell to the left (i,j-1) — those are the only two moves (down or right). So the
      number of unique paths to (i,j) = paths to (i-1,j) + paths to (i,j-1). This recurrence
      fills the entire grid, and dp[m-1][n-1] is the answer.`,

    mentalModel: `Imagine water flowing from the top-left corner. At every intersection, the
      water splits: some flows right, some flows down. The amount of water reaching any cell
      equals the water from above plus the water from the left. The first row only gets water
      from the left (1 stream), and the first column only from above (1 stream). Every other
      cell accumulates from both directions.`,

    whyNaiveFails: `Recursive brute force tries every path: at each cell, branch right and
      branch down. That's 2^(m+n) paths in the worst case. For a 20x20 grid, that's billions
      of paths. DP computes each cell once in O(m*n).`,

    keyObservation: `The entire first row and first column are 1s — there's exactly one way to
      reach any border cell (go entirely right or entirely down). This is the base case that
      seeds the entire DP table. From there, every interior cell is the sum of its top and left
      neighbors.`,
  },

  problem: `There is a robot on an m x n grid. The robot is initially located at the top-left
    corner (grid[0][0]). The robot tries to move to the bottom-right corner (grid[m-1][n-1]).
    The robot can only move either down or right at any point in time. Given the two integers
    m and n, return the number of possible unique paths the robot can take to reach the
    bottom-right corner.`,

  examples: [
    { input: "m = 3, n = 7", output: "28", explanation: "From top-left to bottom-right of a 3x7 grid, there are 28 unique paths." },
    { input: "m = 3, n = 2", output: "3", explanation: "Right then Down-Down, Down then Right then Down, Down-Down then Right." },
    { input: "m = 3, n = 3", output: "6", explanation: "Six unique paths through a 3x3 grid." },
  ],

  constraints: [
    "1 <= m, n <= 100",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(2^(m+n))",
      spaceComplexity: "O(m + n)",
      idea: "At each cell, recurse right and down. Base case: first row/col returns 1.",

      javaCode: `public int uniquePaths(int m, int n) {
    if (m == 1 || n == 1) return 1;
    return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
}`,

      cppCode: `int uniquePaths(int m, int n) {
    if (m == 1 || n == 1) return 1;
    return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
}`,

      pythonCode: `def uniquePaths(m: int, n: int) -> int:
    if m == 1 or n == 1:
        return 1
    return uniquePaths(m - 1, n) + uniquePaths(m, n - 1)`,

      lineAnnotations: {
        2: "Base case: border cells have exactly 1 path",
        3: "Recurse: paths from above + paths from left",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { m: 3, n: 3 },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "uniquePaths(3,3)",
              explanation: "Start at (3,3). This branches into uniquePaths(2,3) + uniquePaths(3,2). Many overlapping subproblems.",
              variables: { m: 3, n: 3 },
              dataStructure: {
                dpTable: [[null,null,null],[null,null,null],[null,null,null]],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [],
                dpRowHeaders: ["0", "1", "2"],
                dpColHeaders: ["0", "1", "2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3],
              shortLabel: "Result = 6",
              explanation: "After exponential recursion resolves, uniquePaths(3,3) = 6. Very slow for large inputs.",
              variables: { m: 3, n: 3, answer: 6 },
              dataStructure: {
                dpTable: [[1,1,1],[1,2,3],[1,3,6]],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [],
                dpRowHeaders: ["0", "1", "2"],
                dpColHeaders: ["0", "1", "2"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: null,
    },

    better: null,

    optimal: {
      label: "Bottom-Up 2D DP",
      tier: "optimal",
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(m × n)",
      idea: `Fill a 2D table where dp[i][j] = dp[i-1][j] + dp[i][j-1]. First row and column
        are all 1s (base case). Answer is dp[m-1][n-1].`,

      javaCode: `public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];

    for (int i = 0; i < m; i++) dp[i][0] = 1;
    for (int j = 0; j < n; j++) dp[0][j] = 1;

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}`,

      cppCode: `int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 0));

    for (int i = 0; i < m; i++) dp[i][0] = 1;
    for (int j = 0; j < n; j++) dp[0][j] = 1;

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}`,

      pythonCode: `def uniquePaths(m: int, n: int) -> int:
    dp = [[0] * n for _ in range(m)]

    for i in range(m):
        dp[i][0] = 1
    for j in range(n):
        dp[0][j] = 1

    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

    return dp[m - 1][n - 1]`,

      lineAnnotations: {
        2: "Create m x n DP table",
        4: "First column: only one path (go straight down)",
        5: "First row: only one path (go straight right)",
        7: "Fill interior cells row by row",
        9: "Recurrence: paths from above + paths from left",
        13: "Answer at bottom-right corner",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard (3x3)",
          description: "Fill a 3x3 DP table step by step",
          input: { m: 3, n: 3 },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Create 3x3 DP table",
              explanation: "Allocate a 3x3 table initialized to 0. We'll fill it with path counts.",
              variables: { m: 3, n: 3 },
              dataStructure: {
                dpTable: [[0,0,0],[0,0,0],[0,0,0]],
                dpHighlight2D: null,
                dpArrows2D: [],
                dpRowHeaders: ["0", "1", "2"],
                dpColHeaders: ["0", "1", "2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "Fill base cases: first row & column = 1",
              explanation: "Set first column dp[i][0]=1 and first row dp[0][j]=1. There's only one path along any border — straight line.",
              variables: { m: 3, n: 3 },
              dataStructure: {
                dpTable: [[1,1,1],[1,0,0],[1,0,0]],
                dpHighlight2D: null,
                dpArrows2D: [],
                dpRowHeaders: ["0", "1", "2"],
                dpColHeaders: ["0", "1", "2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 9],
              shortLabel: "dp[1][1] = dp[0][1] + dp[1][0] = 2",
              explanation: "i=1, j=1: The robot can reach (1,1) from above (1 path) or from left (1 path). dp[1][1] = 1 + 1 = 2.",
              variables: { i: 1, j: 1, "dp[i-1][j]": 1, "dp[i][j-1]": 1, "dp[i][j]": 2 },
              dataStructure: {
                dpTable: [[1,1,1],[1,2,0],[1,0,0]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [
                  { from: { r: 0, c: 1 }, to: { r: 1, c: 1 } },
                  { from: { r: 1, c: 0 }, to: { r: 1, c: 1 } },
                ],
                dpRowHeaders: ["0", "1", "2"],
                dpColHeaders: ["0", "1", "2"],
              },
              delta: { changedCells: [{ r: 1, c: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8, 9],
              shortLabel: "dp[1][2] = dp[0][2] + dp[1][1] = 3",
              explanation: "i=1, j=2: dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3. Three paths reach the right-middle cell.",
              variables: { i: 1, j: 2, "dp[i-1][j]": 1, "dp[i][j-1]": 2, "dp[i][j]": 3 },
              dataStructure: {
                dpTable: [[1,1,1],[1,2,3],[1,0,0]],
                dpHighlight2D: { row: 1, col: 2 },
                dpArrows2D: [
                  { from: { r: 0, c: 2 }, to: { r: 1, c: 2 } },
                  { from: { r: 1, c: 1 }, to: { r: 1, c: 2 } },
                ],
                dpRowHeaders: ["0", "1", "2"],
                dpColHeaders: ["0", "1", "2"],
              },
              delta: { changedCells: [{ r: 1, c: 2 }] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8, 9],
              shortLabel: "dp[2][1] = dp[1][1] + dp[2][0] = 3",
              explanation: "i=2, j=1: dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3.",
              variables: { i: 2, j: 1, "dp[i-1][j]": 2, "dp[i][j-1]": 1, "dp[i][j]": 3 },
              dataStructure: {
                dpTable: [[1,1,1],[1,2,3],[1,3,0]],
                dpHighlight2D: { row: 2, col: 1 },
                dpArrows2D: [
                  { from: { r: 1, c: 1 }, to: { r: 2, c: 1 } },
                  { from: { r: 2, c: 0 }, to: { r: 2, c: 1 } },
                ],
                dpRowHeaders: ["0", "1", "2"],
                dpColHeaders: ["0", "1", "2"],
              },
              delta: { changedCells: [{ r: 2, c: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8, 9],
              shortLabel: "dp[2][2] = dp[1][2] + dp[2][1] = 6",
              explanation: "i=2, j=2: dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6. This is the bottom-right corner — our answer!",
              variables: { i: 2, j: 2, "dp[i-1][j]": 3, "dp[i][j-1]": 3, "dp[i][j]": 6 },
              dataStructure: {
                dpTable: [[1,1,1],[1,2,3],[1,3,6]],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [
                  { from: { r: 1, c: 2 }, to: { r: 2, c: 2 } },
                  { from: { r: 2, c: 1 }, to: { r: 2, c: 2 } },
                ],
                dpRowHeaders: ["0", "1", "2"],
                dpColHeaders: ["0", "1", "2"],
              },
              delta: { changedCells: [{ r: 2, c: 2 }] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13],
              shortLabel: "Return 6",
              explanation: "Return dp[2][2] = 6. There are 6 unique paths from top-left to bottom-right in a 3x3 grid.",
              variables: { answer: 6 },
              dataStructure: {
                dpTable: [[1,1,1],[1,2,3],[1,3,6]],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [],
                dpRowHeaders: ["0", "1", "2"],
                dpColHeaders: ["0", "1", "2"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Row (1x5)",
          description: "Only one row — only one path (all right moves)",
          input: { m: 1, n: 5 },
          expectedOutput: "1",
          commonMistake: "Not handling the edge case where m=1 or n=1. The answer is always 1 because the robot can only move in one direction.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 4, 5],
              shortLabel: "1x5 grid — all base case",
              explanation: "With only 1 row, every cell is on the first row. dp[0][j]=1 for all j. There's only one path: go right 4 times.",
              variables: { m: 1, n: 5 },
              dataStructure: {
                dpTable: [[1,1,1,1,1]],
                dpHighlight2D: null,
                dpArrows2D: [],
                dpRowHeaders: ["0"],
                dpColHeaders: ["0", "1", "2", "3", "4"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [13],
              shortLabel: "Return 1",
              explanation: "dp[0][4] = 1. Only one unique path in a single-row grid.",
              variables: { answer: 1 },
              dataStructure: {
                dpTable: [[1,1,1,1,1]],
                dpHighlight2D: { row: 0, col: 4 },
                dpArrows2D: [],
                dpRowHeaders: ["0"],
                dpColHeaders: ["0", "1", "2", "3", "4"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ m, n }) {
        const steps = [];
        const dp = Array.from({ length: m }, () => Array(n).fill(0));
        const rowHeaders = Array.from({ length: m }, (_, i) => String(i));
        const colHeaders = Array.from({ length: n }, (_, j) => String(j));

        steps.push({
          stepId: 0,
          lineNumbers: [2],
          shortLabel: `Create ${m}x${n} DP table`,
          explanation: `Allocate a ${m}x${n} table initialized to 0.`,
          variables: { m, n },
          dataStructure: {
            dpTable: dp.map(r => [...r]),
            dpHighlight2D: null,
            dpArrows2D: [],
            dpRowHeaders: rowHeaders,
            dpColHeaders: colHeaders,
          },
          delta: {},
          isAnswer: false,
        });

        // Fill base cases
        for (let i = 0; i < m; i++) dp[i][0] = 1;
        for (let j = 0; j < n; j++) dp[0][j] = 1;

        steps.push({
          stepId: 1,
          lineNumbers: [4, 5],
          shortLabel: "Fill base cases: row 0 & col 0 = 1",
          explanation: "First column and first row all set to 1. Only one way to reach any border cell.",
          variables: { m, n },
          dataStructure: {
            dpTable: dp.map(r => [...r]),
            dpHighlight2D: null,
            dpArrows2D: [],
            dpRowHeaders: rowHeaders,
            dpColHeaders: colHeaders,
          },
          delta: {},
          isAnswer: false,
        });

        // Fill interior
        for (let i = 1; i < m; i++) {
          for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];

            steps.push({
              stepId: steps.length,
              lineNumbers: [7, 8, 9],
              shortLabel: `dp[${i}][${j}] = ${dp[i-1][j]} + ${dp[i][j-1]} = ${dp[i][j]}`,
              explanation: `dp[${i}][${j}] = dp[${i-1}][${j}] + dp[${i}][${j-1}] = ${dp[i-1][j]} + ${dp[i][j-1]} = ${dp[i][j]}.`,
              variables: { i, j, "dp[i-1][j]": dp[i-1][j], "dp[i][j-1]": dp[i][j-1], "dp[i][j]": dp[i][j] },
              dataStructure: {
                dpTable: dp.map(r => [...r]),
                dpHighlight2D: { row: i, col: j },
                dpArrows2D: [
                  { from: { r: i - 1, c: j }, to: { r: i, c: j } },
                  { from: { r: i, c: j - 1 }, to: { r: i, c: j } },
                ],
                dpRowHeaders: rowHeaders,
                dpColHeaders: colHeaders,
              },
              delta: { changedCells: [{ r: i, c: j }] },
              isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [13],
          shortLabel: `Return ${dp[m-1][n-1]}`,
          explanation: `Return dp[${m-1}][${n-1}] = ${dp[m-1][n-1]}. There are ${dp[m-1][n-1]} unique paths in a ${m}x${n} grid.`,
          variables: { answer: dp[m-1][n-1] },
          dataStructure: {
            dpTable: dp.map(r => [...r]),
            dpHighlight2D: { row: m - 1, col: n - 1 },
            dpArrows2D: [],
            dpRowHeaders: rowHeaders,
            dpColHeaders: colHeaders,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(2^(m+n))", space: "O(m + n)", explanation: "Exponential branching with recursion depth m+n" },
    optimal: { time: "O(m × n)", space: "O(m × n)", explanation: "Fill every cell once in the m×n table", tradeoff: "Can reduce to O(n) space by keeping only one row at a time" },
  },

  interviewTips: [
    "Draw the 2D grid on the whiteboard and fill in values — it's very visual.",
    "Mention the math solution: C(m+n-2, m-1) — combinatorics approach in O(m) time.",
    "Explain the O(n) space optimization: only need the previous row to compute the current row.",
    "Edge case: when m=1 or n=1, answer is always 1.",
    "This is the foundation for harder 2D DP problems like obstacle grids and minimum path sum.",
  ],

  relatedProblems: ["longest-common-subsequence", "edit-distance", "coin-change-ii"],
};
