export const nQueens = {
  id: 79,
  slug: "n-queens",
  title: "N-Queens",
  difficulty: "Hard",
  topic: "backtracking",
  topicLabel: "Backtracking",
  neetcodeNumber: 79,
  artifactType: "Backtracking",
  companies: ["Amazon", "Google", "Microsoft", "Bloomberg", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/n-queens/",

  pattern: "Constraint-Based Backtracking",
  patternExplanation: `Place one queen per row. For each row, try each column. Before placing, check three constraints:
    no queen in same column, same main diagonal, or same anti-diagonal. Backtrack when no valid column exists.`,

  intuition: {
    coreInsight: `We place queens row by row. Since each row must have exactly one queen, we just need to decide
      which column to place it in. For each candidate column, we check if it conflicts with any previously
      placed queen via column, main diagonal (row-col constant), or anti-diagonal (row+col constant).
      If safe, place and recurse. If all n queens placed, record the solution.`,

    mentalModel: `Imagine placing a queen on the first row of a chessboard. For each valid column, you lock in
      that choice and move to the next row. If you reach a row where no column is safe, you go back and
      try a different column in the previous row. It's like navigating a maze: go forward when you can,
      retreat when you hit a dead end. The constraint checking is your wall detector.`,

    whyNaiveFails: `Brute force would try all n^n possible placements (one queen per row, any column).
      For n=8, that's 16 million. Most are invalid. Backtracking prunes immediately when a conflict is
      detected, reducing the search space by orders of magnitude. The three sets (columns, diagonals,
      anti-diagonals) give O(1) conflict checks.`,

    keyObservation: `Two queens share a main diagonal if (row1 - col1) == (row2 - col2). They share an
      anti-diagonal if (row1 + col1) == (row2 + col2). By maintaining sets of occupied columns,
      diagonals, and anti-diagonals, we can check conflicts in O(1) instead of scanning all placed queens.`,
  },

  problem: `The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that
    no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens
    puzzle. Each solution contains a distinct board configuration where 'Q' indicates a queen and '.'
    indicates an empty space.`,

  examples: [
    { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', explanation: "Two distinct solutions for 4-queens" },
    { input: "n = 1", output: '[["Q"]]', explanation: "Single cell, single queen" },
  ],

  constraints: [
    "1 <= n <= 9",
  ],

  approaches: {
    brute: {
      label: "Backtracking with Sets",
      tier: "brute",
      timeComplexity: "O(n!)",
      spaceComplexity: "O(n²)",
      idea: "Place queens row by row. Track occupied columns, diagonals, and anti-diagonals in sets for O(1) conflict checks.",

      javaCode: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    Set<Integer> cols = new HashSet<>();
    Set<Integer> diag = new HashSet<>();
    Set<Integer> antiDiag = new HashSet<>();
    char[][] board = new char[n][n];
    for (char[] row : board) Arrays.fill(row, '.');
    backtrack(0, n, board, cols, diag, antiDiag, result);
    return result;
}

private void backtrack(int row, int n, char[][] board, Set<Integer> cols,
                        Set<Integer> diag, Set<Integer> antiDiag, List<List<String>> result) {
    if (row == n) {
        List<String> solution = new ArrayList<>();
        for (char[] r : board) solution.add(new String(r));
        result.add(solution);
        return;
    }
    for (int col = 0; col < n; col++) {
        if (cols.contains(col) || diag.contains(row - col) || antiDiag.contains(row + col))
            continue;
        board[row][col] = 'Q';
        cols.add(col); diag.add(row - col); antiDiag.add(row + col);
        backtrack(row + 1, n, board, cols, diag, antiDiag, result);
        board[row][col] = '.';
        cols.remove(col); diag.remove(row - col); antiDiag.remove(row + col);
    }
}`,

      cppCode: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> result;
        unordered_set<int> cols, diag, antiDiag;
        vector<string> board(n, string(n, '.'));
        backtrack(0, n, board, cols, diag, antiDiag, result);
        return result;
    }

    void backtrack(int row, int n, vector<string>& board, unordered_set<int>& cols,
                   unordered_set<int>& diag, unordered_set<int>& antiDiag,
                   vector<vector<string>>& result) {
        if (row == n) {
            result.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag.count(row - col) || antiDiag.count(row + col))
                continue;
            board[row][col] = 'Q';
            cols.insert(col); diag.insert(row - col); antiDiag.insert(row + col);
            backtrack(row + 1, n, board, cols, diag, antiDiag, result);
            board[row][col] = '.';
            cols.erase(col); diag.erase(row - col); antiDiag.erase(row + col);
        }
    }
};`,

      pythonCode: `def solveNQueens(n: int) -> List[List[str]]:
    result = []
    cols = set()
    diag = set()       # row - col
    anti_diag = set()  # row + col
    board = [["." for _ in range(n)] for _ in range(n)]

    def backtrack(row):
        if row == n:
            result.append(["".join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row - col) in diag or (row + col) in anti_diag:
                continue
            board[row][col] = "Q"
            cols.add(col)
            diag.add(row - col)
            anti_diag.add(row + col)
            backtrack(row + 1)
            board[row][col] = "."
            cols.remove(col)
            diag.remove(row - col)
            anti_diag.remove(row + col)

    backtrack(0)
    return result`,

      lineAnnotations: {
        1: "Initialize empty board and constraint sets",
        3: "Track occupied columns",
        4: "Track occupied main diagonals (row - col)",
        5: "Track occupied anti-diagonals (row + col)",
        8: "Start placing queens from row 0",
        13: "Base case: all n queens placed successfully",
        19: "Try each column in current row",
        20: "Skip if column, diagonal, or anti-diagonal occupied",
        22: "Place queen and mark constraints",
        24: "Recurse to next row",
        25: "Remove queen and unmark constraints (backtrack)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "4-Queens",
          description: "Find all solutions for n=4",
          input: { n: 4 },
          expectedOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Init 4x4 board",
              explanation: "Start with empty 4x4 board. Place queens row by row. Track constraints in three sets.",
              variables: { n: 4, row: 0, cols: "{}", diag: "{}", antiDiag: "{}" },
              dataStructure: { treeNodes: { "root": { val: "row 0", state: "active" } }, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [19, 22],
              shortLabel: "Row 0: try col 0",
              explanation: "Row 0, try column 0. No conflicts (sets are empty). Place queen at (0,0).",
              variables: { row: 0, col: 0, cols: "{0}", diag: "{0}", antiDiag: "{0}" },
              dataStructure: { treeNodes: { "00": { val: "Q(0,0)", state: "active" } }, currentPath: ["(0,0)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19, 20],
              shortLabel: "Row 1: col 0,1 blocked",
              explanation: "Row 1: col 0 in cols, col 1 has row-col=0 in diag. Both blocked.",
              variables: { row: 1, cols: "{0}", diag: "{0}", antiDiag: "{0}" },
              dataStructure: { treeNodes: { "00": { val: "Q(0,0)", state: "visited" }, "1x": { val: "row 1", state: "active" } }, currentPath: ["(0,0)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [19, 22],
              shortLabel: "Row 1: place at col 2",
              explanation: "Row 1, col 2: not in cols, diag(1-2=-1) not in diag, antiDiag(1+2=3) not in antiDiag. Safe! Place queen.",
              variables: { row: 1, col: 2, cols: "{0,2}", diag: "{0,-1}", antiDiag: "{0,3}" },
              dataStructure: { treeNodes: { "12": { val: "Q(1,2)", state: "active" } }, currentPath: ["(0,0)", "(1,2)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [19, 20],
              shortLabel: "Row 2: all cols blocked",
              explanation: "Row 2: col 0 in cols, col 1 anti-diag(3) blocked, col 2 in cols, col 3 diag(-1) blocked. Dead end!",
              variables: { row: 2 },
              dataStructure: { treeNodes: { "2x": { val: "row 2", state: "eliminated" } }, currentPath: ["(0,0)", "(1,2)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [25],
              shortLabel: "Backtrack row 1, try col 3",
              explanation: "Remove queen from (1,2). Try col 3 in row 1. diag(1-3=-2) safe, antiDiag(1+3=4) safe. Place queen at (1,3).",
              variables: { row: 1, col: 3, cols: "{0,3}", diag: "{0,-2}", antiDiag: "{0,4}" },
              dataStructure: { treeNodes: { "13": { val: "Q(1,3)", state: "active" } }, currentPath: ["(0,0)", "(1,3)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [19, 20],
              shortLabel: "Row 2: col 0,2 blocked, try col 1",
              explanation: "Row 2: col 0 in cols. Col 1: not in cols, diag(2-1=1) safe, antiDiag(2+1=3) safe. Place at (2,1).",
              variables: { row: 2, col: 1, cols: "{0,3,1}" },
              dataStructure: { treeNodes: { "21": { val: "Q(2,1)", state: "active" } }, currentPath: ["(0,0)", "(1,3)", "(2,1)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [19, 20],
              shortLabel: "Row 3: all blocked",
              explanation: "Row 3: all columns conflict with existing queens. Dead end — backtrack.",
              variables: { row: 3 },
              dataStructure: { treeNodes: { "3x": { val: "row 3", state: "eliminated" } }, currentPath: ["(0,0)", "(1,3)", "(2,1)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [25],
              shortLabel: "Backtrack to row 0, try col 1",
              explanation: "Deep backtrack: remove queens from rows 2, 1, 0. Try col 1 at row 0. Place queen at (0,1).",
              variables: { row: 0, col: 1, cols: "{1}" },
              dataStructure: { treeNodes: { "01": { val: "Q(0,1)", state: "active" } }, currentPath: ["(0,1)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [19, 22, 24],
              shortLabel: "Build solution 1: (0,1)(1,3)(2,0)(3,2)",
              explanation: "Row 1→col 3, Row 2→col 0, Row 3→col 2. All constraints satisfied! First solution found: .Q../...Q/Q.../..Q.",
              variables: { solution: '[".Q..","...Q","Q...","..Q."]', resultCount: 1 },
              dataStructure: { treeNodes: { "sol1": { val: "Solution 1", state: "found" } }, currentPath: ["(0,1)", "(1,3)", "(2,0)", "(3,2)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [19, 22, 24],
              shortLabel: "Build solution 2: (0,2)(1,0)(2,3)(3,1)",
              explanation: "After more backtracking: Row 0→col 2, Row 1→col 0, Row 2→col 3, Row 3→col 1. Second solution: ..Q./Q.../...Q/.Q..",
              variables: { solution: '["..Q.","Q...","...Q",".Q.."]', resultCount: 2 },
              dataStructure: { treeNodes: { "sol2": { val: "Solution 2", state: "found" } }, currentPath: ["(0,2)", "(1,0)", "(2,3)", "(3,1)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [8],
              shortLabel: "Return 2 solutions",
              explanation: "All possibilities explored. For n=4, there are exactly 2 distinct solutions.",
              variables: { resultCount: 2 },
              dataStructure: { treeNodes: { "done": { val: "2 solutions", state: "found" } }, currentPath: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "n=1",
          description: "Trivial case — single queen on single cell",
          input: { n: 1 },
          expectedOutput: '[["Q"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Init 1x1 board",
              explanation: "n=1: single cell board. Place one queen.",
              variables: { n: 1 },
              dataStructure: { treeNodes: { "root": { val: "1x1", state: "active" } }, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [19, 22],
              shortLabel: "Place Q at (0,0)",
              explanation: "Row 0, col 0. No conflicts. Place queen.",
              variables: { row: 0, col: 0 },
              dataStructure: { treeNodes: { "00": { val: "Q(0,0)", state: "active" } }, currentPath: ["(0,0)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [13, 14, 15],
              shortLabel: 'Solution: ["Q"]',
              explanation: "row=1 equals n=1. All queens placed. Return the single solution.",
              variables: { result: '[["Q"]]' },
              dataStructure: { treeNodes: { "00": { val: "Q", state: "found" } }, currentPath: ["(0,0)"] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const result = [];
        const cols = new Set(), diag = new Set(), antiDiag = new Set();
        const board = Array.from({ length: n }, () => Array(n).fill("."));

        steps.push({
          stepId: 0, lineNumbers: [1],
          shortLabel: `Init ${n}x${n} board`,
          explanation: `Start with empty ${n}x${n} board. Place queens row by row with constraint sets.`,
          variables: { n, row: 0 },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: false,
        });

        function backtrack(row) {
          if (row === n) {
            result.push(board.map(r => r.join("")));
            steps.push({
              stepId: steps.length, lineNumbers: [13, 14, 15],
              shortLabel: `Solution ${result.length} found!`,
              explanation: `All ${n} queens placed. Solution ${result.length} recorded.`,
              variables: { resultCount: result.length },
              dataStructure: { treeNodes: {}, currentPath: [] },
              delta: {}, isAnswer: false,
            });
            return;
          }

          for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag.has(row - col) || antiDiag.has(row + col)) {
              continue;
            }

            board[row][col] = "Q";
            cols.add(col); diag.add(row - col); antiDiag.add(row + col);

            steps.push({
              stepId: steps.length, lineNumbers: [19, 22],
              shortLabel: `Place Q(${row},${col})`,
              explanation: `Row ${row}, col ${col}: no conflicts. Place queen at (${row},${col}).`,
              variables: { row, col, cols: JSON.stringify([...cols]), diag: JSON.stringify([...diag]) },
              dataStructure: { treeNodes: {}, currentPath: [] },
              delta: {}, isAnswer: false,
            });

            backtrack(row + 1);

            board[row][col] = ".";
            cols.delete(col); diag.delete(row - col); antiDiag.delete(row + col);
          }
        }

        backtrack(0);

        steps.push({
          stepId: steps.length, lineNumbers: [8],
          shortLabel: `Return ${result.length} solutions`,
          explanation: `All possibilities explored. Found ${result.length} solution(s) for ${n}-queens.`,
          variables: { resultCount: result.length },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Optimized Backtracking with Bitmask",
      tier: "optimal",
      timeComplexity: "O(n!)",
      spaceComplexity: "O(n)",
      idea: "Same algorithm, but use integer bitmasks instead of sets for O(1) constraint checks with smaller constant factor.",

      javaCode: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    int[] queens = new int[n];
    Arrays.fill(queens, -1);
    solve(0, n, 0, 0, 0, queens, result);
    return result;
}

private void solve(int row, int n, int cols, int diag, int antiDiag,
                    int[] queens, List<List<String>> result) {
    if (row == n) {
        List<String> board = new ArrayList<>();
        for (int q : queens) {
            char[] r = new char[n];
            Arrays.fill(r, '.');
            r[q] = 'Q';
            board.add(new String(r));
        }
        result.add(board);
        return;
    }
    int available = ((1 << n) - 1) & ~(cols | diag | antiDiag);
    while (available > 0) {
        int bit = available & (-available);
        int col = Integer.numberOfTrailingZeros(bit);
        queens[row] = col;
        solve(row + 1, n, cols | bit, (diag | bit) << 1, (antiDiag | bit) >> 1, queens, result);
        available -= bit;
    }
}`,

      cppCode: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> result;
        vector<int> queens(n, -1);
        solve(0, n, 0, 0, 0, queens, result);
        return result;
    }

    void solve(int row, int n, int cols, int diag, int antiDiag,
               vector<int>& queens, vector<vector<string>>& result) {
        if (row == n) {
            vector<string> board;
            for (int q : queens) {
                string r(n, '.');
                r[q] = 'Q';
                board.push_back(r);
            }
            result.push_back(board);
            return;
        }
        int available = ((1 << n) - 1) & ~(cols | diag | antiDiag);
        while (available) {
            int bit = available & (-available);
            int col = __builtin_ctz(bit);
            queens[row] = col;
            solve(row + 1, n, cols | bit, (diag | bit) << 1, (antiDiag | bit) >> 1, queens, result);
            available -= bit;
        }
    }
};`,

      pythonCode: `def solveNQueens(n: int) -> List[List[str]]:
    result = []
    queens = [-1] * n

    def solve(row, cols, diag, anti_diag):
        if row == n:
            board = []
            for q in queens:
                board.append("." * q + "Q" + "." * (n - q - 1))
            result.append(board)
            return
        available = ((1 << n) - 1) & ~(cols | diag | anti_diag)
        while available:
            bit = available & (-available)
            col = bit.bit_length() - 1
            queens[row] = col
            solve(row + 1, cols | bit, (diag | bit) << 1, (anti_diag | bit) >> 1)
            available -= bit

    solve(0, 0, 0, 0)
    return result`,

      lineAnnotations: {
        3: "queens[i] stores which column queen is in for row i",
        11: "Base case: all queens placed",
        21: "Bitmask of available columns (not blocked by any constraint)",
        22: "Extract lowest set bit — next available column",
        23: "Convert bit position to column index",
        25: "Recurse: shift diagonal masks to propagate constraints",
        26: "Remove this column from available options",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "4-Queens Bitmask",
          description: "Solve 4-queens using bitmask optimization",
          input: { n: 4 },
          expectedOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3],
              shortLabel: "Init bitmasks",
              explanation: "Initialize cols=0, diag=0, antiDiag=0. Available = 0b1111 (all 4 columns open).",
              variables: { n: 4, cols: "0000", diag: "0000", antiDiag: "0000", available: "1111" },
              dataStructure: { treeNodes: { "root": { val: "4-Queens", state: "active" } }, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [21, 22, 23],
              shortLabel: "Row 0: col 0 available",
              explanation: "Available=1111. Lowest bit=0001 → col 0. Place queen at (0,0). Update: cols=0001, diag shifts left, antiDiag shifts right.",
              variables: { row: 0, col: 0, cols: "0001", available: "1111" },
              dataStructure: { treeNodes: { "00": { val: "Q(0,0)", state: "active" } }, currentPath: ["(0,0)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [21, 22, 23, 25],
              shortLabel: "Row 1: try cols, place at 2",
              explanation: "After propagation, cols=0001, diag=0010, antiDiag=0000. Available = 1111 & ~(0011) = 1100. Lowest bit → col 2.",
              variables: { row: 1, col: 2 },
              dataStructure: { treeNodes: { "12": { val: "Q(1,2)", state: "active" } }, currentPath: ["(0,0)", "(1,2)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [21],
              shortLabel: "Row 2: no available cols",
              explanation: "All columns blocked after (0,0) and (1,2). Available = 0. Backtrack.",
              variables: { row: 2, available: "0000" },
              dataStructure: { treeNodes: { "2x": { val: "dead end", state: "eliminated" } }, currentPath: ["(0,0)", "(1,2)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [25, 22, 23],
              shortLabel: "Row 1: try col 3",
              explanation: "Backtrack row 1. Next available bit → col 3. Place queen at (1,3).",
              variables: { row: 1, col: 3 },
              dataStructure: { treeNodes: { "13": { val: "Q(1,3)", state: "active" } }, currentPath: ["(0,0)", "(1,3)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [22, 23, 25],
              shortLabel: "Complete: (0,1)(1,3)(2,0)(3,2)",
              explanation: "After more exploration, find first solution: .Q../...Q/Q.../..Q. Record it.",
              variables: { solution: 1 },
              dataStructure: { treeNodes: { "sol1": { val: "Solution 1", state: "found" } }, currentPath: ["(0,1)", "(1,3)", "(2,0)", "(3,2)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [22, 23, 25],
              shortLabel: "Complete: (0,2)(1,0)(2,3)(3,1)",
              explanation: "Continue searching. Find second solution: ..Q./Q.../...Q/.Q.. Record it.",
              variables: { solution: 2 },
              dataStructure: { treeNodes: { "sol2": { val: "Solution 2", state: "found" } }, currentPath: ["(0,2)", "(1,0)", "(2,3)", "(3,1)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [1],
              shortLabel: "Return 2 solutions",
              explanation: "All bit patterns exhausted. Found exactly 2 solutions for 4-queens.",
              variables: { resultCount: 2 },
              dataStructure: { treeNodes: { "done": { val: "2 solutions", state: "found" } }, currentPath: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "n=1",
          description: "Trivial single cell",
          input: { n: 1 },
          expectedOutput: '[["Q"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "n=1",
              explanation: "1x1 board. Only one possibility.",
              variables: { n: 1 },
              dataStructure: { treeNodes: {}, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [21, 22, 23, 11],
              shortLabel: "Place Q(0,0) → solution",
              explanation: "Place queen at (0,0). row+1=1=n. Solution found: [\"Q\"].",
              variables: { result: '[["Q"]]' },
              dataStructure: { treeNodes: { "Q": { val: "Q", state: "found" } }, currentPath: ["(0,0)"] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const result = [];
        const queens = Array(n).fill(-1);

        steps.push({
          stepId: 0, lineNumbers: [1],
          shortLabel: `Init ${n}-queens`,
          explanation: `Solve ${n}-queens using bitmask backtracking.`,
          variables: { n },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: false,
        });

        function solve(row, cols, diag, antiDiag) {
          if (row === n) {
            const board = queens.map(q => ".".repeat(q) + "Q" + ".".repeat(n - q - 1));
            result.push(board);
            steps.push({
              stepId: steps.length, lineNumbers: [11],
              shortLabel: `Solution ${result.length} found`,
              explanation: `All ${n} queens placed. Solution ${result.length} recorded.`,
              variables: { resultCount: result.length },
              dataStructure: { treeNodes: {}, currentPath: queens.map((c, r) => `(${r},${c})`) },
              delta: {}, isAnswer: false,
            });
            return;
          }

          let available = ((1 << n) - 1) & ~(cols | diag | antiDiag);
          while (available > 0) {
            const bit = available & (-available);
            const col = Math.log2(bit & -bit);
            queens[row] = col;

            steps.push({
              stepId: steps.length, lineNumbers: [22, 23],
              shortLabel: `Place Q(${row},${col})`,
              explanation: `Row ${row}: place queen at column ${col}.`,
              variables: { row, col },
              dataStructure: { treeNodes: {}, currentPath: queens.slice(0, row + 1).map((c, r) => `(${r},${c})`) },
              delta: {}, isAnswer: false,
            });

            solve(row + 1, cols | bit, (diag | bit) << 1, (antiDiag | bit) >> 1);
            available -= bit;
          }
        }

        solve(0, 0, 0, 0);

        steps.push({
          stepId: steps.length, lineNumbers: [1],
          shortLabel: `Return ${result.length} solutions`,
          explanation: `Done. Found ${result.length} solution(s) for ${n}-queens.`,
          variables: { resultCount: result.length },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n!)", space: "O(n²)", explanation: "At most n choices for row 0, n-1 for row 1, etc. Board stored as n² chars." },
    optimal: { time: "O(n!)", space: "O(n)", explanation: "Same time complexity, but bitmask uses O(1) space for constraints", tradeoff: "Bitmask operations are faster than set operations by a constant factor" },
  },

  interviewTips: [
    "Explain the row-by-row approach: since each row needs exactly one queen, iterate rows.",
    "Describe the three constraint checks: column, main diagonal (row-col), anti-diagonal (row+col).",
    "Start with the set-based approach — it's clearer. Mention bitmask as optimization.",
    "For n=4, there are 2 solutions. For n=8, there are 92. These are good to know.",
    "Discuss time complexity: it's O(n!) because each row has fewer valid columns than the last.",
  ],

  relatedProblems: ["subsets", "permutations", "word-search"],
};
