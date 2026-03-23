export const setMatrixZeroes = {
  id: 137,
  slug: "set-matrix-zeroes",
  title: "Set Matrix Zeroes",
  difficulty: "Medium",
  topic: "math-geometry",
  topicLabel: "Math & Geometry",
  neetcodeNumber: 137,
  artifactType: "Matrix",
  companies: ["Amazon", "Microsoft", "Meta", "Apple", "Google"],
  leetcodeLink: "https://leetcode.com/problems/set-matrix-zeroes/",

  pattern: "In-Place Marker with First Row/Column",
  patternExplanation: `Use the first row and first column of the matrix itself as markers
    to record which rows and columns need to be zeroed, avoiding extra O(m+n) space.`,

  intuition: {
    coreInsight: `We need to zero entire rows and columns wherever a 0 appears. The challenge
      is doing this without using extra space proportional to the matrix dimensions. The trick:
      use the matrix's own first row and first column as "flag arrays." When we find a 0 at
      (i,j), we set matrix[i][0]=0 and matrix[0][j]=0 to remember that row i and column j
      should be zeroed. Then in a second pass, we use those flags to zero the appropriate cells.`,

    mentalModel: `Imagine a classroom seating chart. If any student in a row is absent (0),
      the entire row gets marked. Instead of making a separate attendance list, you write the
      marks directly on the first seat of each row and the first seat of each column. Then you
      walk through and zero out any row/column that has a mark in its first seat. You just need
      two extra booleans for whether the first row and first column themselves contained a 0.`,

    whyNaiveFails: `A naive approach copies the entire matrix (O(m*n) space) or uses separate
      boolean arrays for rows and columns (O(m+n) space). While correct, interviewers expect
      the O(1) space solution. The key difficulty with in-place modification is that setting
      cells to 0 prematurely creates "false positives" — the in-place marker approach avoids
      this by separating the marking phase from the zeroing phase.`,

    keyObservation: `Process the matrix in two passes. First pass: scan for zeros and mark
      the first row/column. Second pass: use the markers to zero cells. Critically, zero the
      inner matrix first (rows 1+ and columns 1+), then handle the first row and first column
      last. If you zero the first row/column first, you destroy the markers before using them.`,
  },

  problem: `Given an m x n integer matrix, if an element is 0, set its entire row and column
    to 0's. You must do it in place.`,

  examples: [
    { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]", explanation: "The 0 at (1,1) zeros out row 1 and column 1" },
    { input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]", output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]", explanation: "Zeros at (0,0) and (0,3) zero out row 0, column 0, and column 3" },
  ],

  constraints: [
    "m == matrix.length",
    "n == matrix[0].length",
    "1 <= m, n <= 200",
    "-2^31 <= matrix[i][j] <= 2^31 - 1",
  ],

  approaches: {
    brute: {
      label: "Extra Arrays",
      tier: "brute",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m+n)",
      idea: "Use separate boolean arrays to track which rows and columns contain a zero, then zero them in a second pass.",

      javaCode: `public void setZeroes(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean[] zeroRows = new boolean[m];
    boolean[] zeroCols = new boolean[n];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (matrix[i][j] == 0) {
                zeroRows[i] = true;
                zeroCols[j] = true;
            }
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (zeroRows[i] || zeroCols[j])
                matrix[i][j] = 0;
}`,

      cppCode: `void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    vector<bool> zeroRows(m, false);
    vector<bool> zeroCols(n, false);
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (matrix[i][j] == 0) {
                zeroRows[i] = true;
                zeroCols[j] = true;
            }
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (zeroRows[i] || zeroCols[j])
                matrix[i][j] = 0;
}`,

      pythonCode: `def setZeroes(matrix: List[List[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    zero_rows = [False] * m
    zero_cols = [False] * n
    for i in range(m):
        for j in range(n):
            if matrix[i][j] == 0:
                zero_rows[i] = True
                zero_cols[j] = True
    for i in range(m):
        for j in range(n):
            if zero_rows[i] or zero_cols[j]:
                matrix[i][j] = 0`,

      lineAnnotations: {
        3: "Boolean array to track which rows contain a zero",
        4: "Boolean array to track which columns contain a zero",
        5: "First pass: scan entire matrix for zeros",
        7: "Mark the row and column of each zero",
        11: "Second pass: zero out marked rows and columns",
        13: "If this cell's row or column is marked, set to 0",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { matrix: [[1,1,1],[1,0,1],[1,1,1]] },
          expectedOutput: "[[1,0,1],[0,0,0],[1,0,1]]",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 4], shortLabel: "Init marker arrays",
              explanation: "Create zeroRows=[F,F,F] and zeroCols=[F,F,F]. We'll scan the matrix to find where the zeros are.",
              variables: { zeroRows: "[F,F,F]", zeroCols: "[F,F,F]" },
              dataStructure: {
                matrix: [[1,1,1],[1,0,1],[1,1,1]],
                cellStates: { "0,0": "default", "0,1": "default", "0,2": "default", "1,0": "default", "1,1": "default", "1,2": "default", "2,0": "default", "2,1": "default", "2,2": "default" },
                pointers: [],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [5, 6, 7, 8, 9], shortLabel: "Find zero at (1,1)",
              explanation: "Scan the matrix. Found 0 at (1,1). Mark zeroRows[1]=true, zeroCols[1]=true. This means row 1 and column 1 will be zeroed.",
              variables: { zeroRows: "[F,T,F]", zeroCols: "[F,T,F]", "found at": "(1,1)" },
              dataStructure: {
                matrix: [[1,1,1],[1,0,1],[1,1,1]],
                cellStates: { "0,0": "default", "0,1": "queued", "0,2": "default", "1,0": "queued", "1,1": "active", "1,2": "queued", "2,0": "default", "2,1": "queued", "2,2": "default" },
                pointers: [{ name: "zero", row: 1, col: 1 }],
              },
              delta: { changedCells: ["1,1"] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [11, 12, 13, 14], shortLabel: "Zero row 1 and col 1",
              explanation: "Second pass: for each cell, if its row or column is marked, set to 0. Row 1 and column 1 are marked, so (1,0), (1,1), (1,2), (0,1), (2,1) all become 0.",
              variables: { zeroRows: "[F,T,F]", zeroCols: "[F,T,F]" },
              dataStructure: {
                matrix: [[1,0,1],[0,0,0],[1,0,1]],
                cellStates: { "0,0": "default", "0,1": "eliminated", "0,2": "default", "1,0": "eliminated", "1,1": "eliminated", "1,2": "eliminated", "2,0": "default", "2,1": "eliminated", "2,2": "default" },
                pointers: [],
              },
              delta: { changedCells: ["0,1", "1,0", "1,2", "2,1"] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [14], shortLabel: "Done",
              explanation: "Matrix is now [[1,0,1],[0,0,0],[1,0,1]]. The zero at (1,1) correctly zeroed its entire row and column.",
              variables: { result: "[[1,0,1],[0,0,0],[1,0,1]]" },
              dataStructure: {
                matrix: [[1,0,1],[0,0,0],[1,0,1]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found", "1,0": "found", "1,1": "found", "1,2": "found", "2,0": "found", "2,1": "found", "2,2": "found" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ matrix }) {
        const steps = [];
        const m = matrix.length, n = matrix[0].length;
        const mat = matrix.map(r => [...r]);
        const zeroRows = new Array(m).fill(false);
        const zeroCols = new Array(n).fill(false);

        const getCellStates = (mat, highlights) => {
          const states = {};
          for (let i = 0; i < m; i++)
            for (let j = 0; j < n; j++)
              states[`${i},${j}`] = highlights?.[`${i},${j}`] || "default";
          return states;
        };

        steps.push({
          stepId: 0, lineNumbers: [3, 4], shortLabel: "Init marker arrays",
          explanation: `Create zeroRows and zeroCols arrays of size ${m} and ${n}.`,
          variables: { zeroRows: `[${zeroRows.map(v => v ? "T" : "F").join(",")}]`, zeroCols: `[${zeroCols.map(v => v ? "T" : "F").join(",")}]` },
          dataStructure: { matrix: mat.map(r => [...r]), cellStates: getCellStates(mat, {}), pointers: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < m; i++)
          for (let j = 0; j < n; j++)
            if (mat[i][j] === 0) { zeroRows[i] = true; zeroCols[j] = true; }

        const highlights = {};
        for (let i = 0; i < m; i++)
          for (let j = 0; j < n; j++)
            if (mat[i][j] === 0) highlights[`${i},${j}`] = "active";
            else if (zeroRows[i] || zeroCols[j]) highlights[`${i},${j}`] = "queued";

        steps.push({
          stepId: 1, lineNumbers: [5, 6, 7, 8, 9], shortLabel: "Mark zeros found",
          explanation: `Scanned matrix. Marked rows and columns containing zeros.`,
          variables: { zeroRows: `[${zeroRows.map(v => v ? "T" : "F").join(",")}]`, zeroCols: `[${zeroCols.map(v => v ? "T" : "F").join(",")}]` },
          dataStructure: { matrix: mat.map(r => [...r]), cellStates: getCellStates(mat, highlights), pointers: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < m; i++)
          for (let j = 0; j < n; j++)
            if (zeroRows[i] || zeroCols[j]) mat[i][j] = 0;

        const elimHighlights = {};
        for (let i = 0; i < m; i++)
          for (let j = 0; j < n; j++)
            elimHighlights[`${i},${j}`] = (zeroRows[i] || zeroCols[j]) ? "eliminated" : "default";

        steps.push({
          stepId: 2, lineNumbers: [11, 12, 13, 14], shortLabel: "Apply zeros",
          explanation: `Zero out all cells in marked rows and columns.`,
          variables: { zeroRows: `[${zeroRows.map(v => v ? "T" : "F").join(",")}]`, zeroCols: `[${zeroCols.map(v => v ? "T" : "F").join(",")}]` },
          dataStructure: { matrix: mat.map(r => [...r]), cellStates: getCellStates(mat, elimHighlights), pointers: [] },
          delta: {}, isAnswer: false,
        });

        const foundStates = {};
        for (let i = 0; i < m; i++)
          for (let j = 0; j < n; j++) foundStates[`${i},${j}`] = "found";

        steps.push({
          stepId: 3, lineNumbers: [14], shortLabel: "Done",
          explanation: `Matrix transformation complete.`,
          variables: { result: JSON.stringify(mat) },
          dataStructure: { matrix: mat.map(r => [...r]), cellStates: foundStates, pointers: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "In-Place First Row/Column Markers",
      tier: "optimal",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(1)",
      idea: "Use the first row and first column as marker arrays. Two booleans track whether the first row/column themselves need zeroing. Mark in one pass, apply in reverse order.",

      javaCode: `public void setZeroes(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean firstRowZero = false, firstColZero = false;

    for (int i = 0; i < m; i++)
        if (matrix[i][0] == 0) firstColZero = true;
    for (int j = 0; j < n; j++)
        if (matrix[0][j] == 0) firstRowZero = true;

    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }

    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][0] == 0 || matrix[0][j] == 0)
                matrix[i][j] = 0;

    if (firstRowZero)
        for (int j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstColZero)
        for (int i = 0; i < m; i++) matrix[i][0] = 0;
}`,

      cppCode: `void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRowZero = false, firstColZero = false;

    for (int i = 0; i < m; i++)
        if (matrix[i][0] == 0) firstColZero = true;
    for (int j = 0; j < n; j++)
        if (matrix[0][j] == 0) firstRowZero = true;

    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }

    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][0] == 0 || matrix[0][j] == 0)
                matrix[i][j] = 0;

    if (firstRowZero)
        for (int j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstColZero)
        for (int i = 0; i < m; i++) matrix[i][0] = 0;
}`,

      pythonCode: `def setZeroes(matrix: List[List[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))

    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0`,

      lineAnnotations: {
        3: "Track whether first row/column originally contain zeros",
        5: "Check first column for any zeros",
        7: "Check first row for any zeros",
        10: "Scan inner matrix (skip row 0 and col 0)",
        12: "Found a zero — mark its row header and column header",
        17: "Apply markers: zero inner cells whose row or column header is 0",
        21: "Finally, zero the first row if it originally had a zero",
        23: "Finally, zero the first column if it originally had a zero",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Single zero in center of 3x3 matrix",
          input: { matrix: [[1,1,1],[1,0,1],[1,1,1]] },
          expectedOutput: "[[1,0,1],[0,0,0],[1,0,1]]",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3], shortLabel: "Init flags",
              explanation: "Check first row and first column for zeros. First row [1,1,1] has no zero: firstRowZero=false. First column [1,1,1] has no zero: firstColZero=false.",
              variables: { firstRowZero: false, firstColZero: false },
              dataStructure: {
                matrix: [[1,1,1],[1,0,1],[1,1,1]],
                cellStates: { "0,0": "pointer", "0,1": "pointer", "0,2": "pointer", "1,0": "pointer", "1,1": "default", "1,2": "default", "2,0": "pointer", "2,1": "default", "2,2": "default" },
                pointers: [],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10, 11, 12, 13, 14], shortLabel: "Mark: (1,1) is 0",
              explanation: "Scan inner matrix (rows 1-2, cols 1-2). Found 0 at (1,1). Set matrix[1][0]=0 (mark row 1) and matrix[0][1]=0 (mark column 1).",
              variables: { firstRowZero: false, firstColZero: false, "marked row": 1, "marked col": 1 },
              dataStructure: {
                matrix: [[1,0,1],[0,0,1],[1,1,1]],
                cellStates: { "0,0": "default", "0,1": "active", "0,2": "default", "1,0": "active", "1,1": "eliminated", "1,2": "default", "2,0": "default", "2,1": "default", "2,2": "default" },
                pointers: [{ name: "zero", row: 1, col: 1 }],
              },
              delta: { changedCells: ["0,1", "1,0"] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [17, 18, 19, 20], shortLabel: "Apply: zero inner cells",
              explanation: "For each inner cell (i,j), if matrix[i][0]==0 or matrix[0][j]==0, set matrix[i][j]=0. Row 1 marker is 0, col 1 marker is 0. Cells (1,1), (1,2), (2,1) become 0.",
              variables: { firstRowZero: false, firstColZero: false },
              dataStructure: {
                matrix: [[1,0,1],[0,0,0],[1,0,1]],
                cellStates: { "0,0": "default", "0,1": "active", "0,2": "default", "1,0": "active", "1,1": "eliminated", "1,2": "eliminated", "2,0": "default", "2,1": "eliminated", "2,2": "default" },
                pointers: [],
              },
              delta: { changedCells: ["1,2", "2,1"] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [21, 23], shortLabel: "Skip first row/col (no original zeros)",
              explanation: "firstRowZero=false, firstColZero=false, so we skip zeroing the first row and column. They only have markers, not original zeros. Final matrix: [[1,0,1],[0,0,0],[1,0,1]].",
              variables: { firstRowZero: false, firstColZero: false, result: "[[1,0,1],[0,0,0],[1,0,1]]" },
              dataStructure: {
                matrix: [[1,0,1],[0,0,0],[1,0,1]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found", "1,0": "found", "1,1": "found", "1,2": "found", "2,0": "found", "2,1": "found", "2,2": "found" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Zero in First Row",
          description: "Tests that first-row flag correctly zeros the entire first row",
          input: { matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]] },
          expectedOutput: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3], shortLabel: "Init flags",
              explanation: "Check first row [0,1,2,0]: contains zeros, so firstRowZero=true. Check first column [0,3,1]: contains zero, so firstColZero=true.",
              variables: { firstRowZero: true, firstColZero: true },
              dataStructure: {
                matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]],
                cellStates: { "0,0": "active", "0,1": "pointer", "0,2": "pointer", "0,3": "active", "1,0": "pointer", "1,1": "default", "1,2": "default", "1,3": "default", "2,0": "pointer", "2,1": "default", "2,2": "default", "2,3": "default" },
                pointers: [],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10, 11, 12, 13, 14], shortLabel: "Scan inner: no new zeros",
              explanation: "Scan inner matrix (rows 1-2, cols 1-3). No zeros found in the inner portion. The first row/column markers remain from step 0.",
              variables: { firstRowZero: true, firstColZero: true },
              dataStructure: {
                matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]],
                cellStates: { "0,0": "active", "0,1": "default", "0,2": "default", "0,3": "active", "1,0": "default", "1,1": "default", "1,2": "default", "1,3": "default", "2,0": "default", "2,1": "default", "2,2": "default", "2,3": "default" },
                pointers: [],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [17, 18, 19, 20], shortLabel: "Apply inner markers",
              explanation: "For inner cells: matrix[0][3]=0 so column 3 is marked. Cells (1,3) and (2,3) should become 0. matrix[0][0]=0 flags column 0 but we handle first col separately.",
              variables: { firstRowZero: true, firstColZero: true },
              dataStructure: {
                matrix: [[0,1,2,0],[3,4,5,0],[1,3,1,0]],
                cellStates: { "0,0": "active", "0,1": "default", "0,2": "default", "0,3": "active", "1,0": "default", "1,1": "default", "1,2": "default", "1,3": "eliminated", "2,0": "default", "2,1": "default", "2,2": "default", "2,3": "eliminated" },
                pointers: [],
              },
              delta: { changedCells: ["1,3", "2,3"] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [21, 22], shortLabel: "Zero first row",
              explanation: "firstRowZero=true: set entire first row to 0. Row 0 becomes [0,0,0,0].",
              variables: { firstRowZero: true, firstColZero: true },
              dataStructure: {
                matrix: [[0,0,0,0],[3,4,5,0],[1,3,1,0]],
                cellStates: { "0,0": "eliminated", "0,1": "eliminated", "0,2": "eliminated", "0,3": "eliminated", "1,0": "default", "1,1": "default", "1,2": "default", "1,3": "eliminated", "2,0": "default", "2,1": "default", "2,2": "default", "2,3": "eliminated" },
                pointers: [],
              },
              delta: { changedCells: ["0,1", "0,2"] }, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [23, 24], shortLabel: "Zero first column",
              explanation: "firstColZero=true: set entire first column to 0. Column 0 becomes all zeros. Final: [[0,0,0,0],[0,4,5,0],[0,3,1,0]].",
              variables: { firstRowZero: true, firstColZero: true, result: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]" },
              dataStructure: {
                matrix: [[0,0,0,0],[0,4,5,0],[0,3,1,0]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found", "0,3": "found", "1,0": "found", "1,1": "found", "1,2": "found", "1,3": "found", "2,0": "found", "2,1": "found", "2,2": "found", "2,3": "found" },
                pointers: [],
              },
              delta: { changedCells: ["1,0", "2,0"] }, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ matrix }) {
        const steps = [];
        const m = matrix.length, n = matrix[0].length;
        const mat = matrix.map(r => [...r]);

        const allCellStates = (state) => {
          const s = {};
          for (let i = 0; i < m; i++)
            for (let j = 0; j < n; j++) s[`${i},${j}`] = state;
          return s;
        };

        let firstRowZero = false, firstColZero = false;
        for (let j = 0; j < n; j++) if (mat[0][j] === 0) firstRowZero = true;
        for (let i = 0; i < m; i++) if (mat[i][0] === 0) firstColZero = true;

        steps.push({
          stepId: 0, lineNumbers: [2, 3], shortLabel: "Init flags",
          explanation: `Check first row/column. firstRowZero=${firstRowZero}, firstColZero=${firstColZero}.`,
          variables: { firstRowZero, firstColZero },
          dataStructure: { matrix: mat.map(r => [...r]), cellStates: allCellStates("default"), pointers: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i < m; i++)
          for (let j = 1; j < n; j++)
            if (mat[i][j] === 0) { mat[i][0] = 0; mat[0][j] = 0; }

        steps.push({
          stepId: 1, lineNumbers: [10, 11, 12, 13, 14], shortLabel: "Mark inner zeros",
          explanation: `Scanned inner matrix and marked row/column headers for any zeros found.`,
          variables: { firstRowZero, firstColZero },
          dataStructure: { matrix: mat.map(r => [...r]), cellStates: allCellStates("default"), pointers: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i < m; i++)
          for (let j = 1; j < n; j++)
            if (mat[i][0] === 0 || mat[0][j] === 0) mat[i][j] = 0;

        steps.push({
          stepId: 2, lineNumbers: [17, 18, 19, 20], shortLabel: "Apply inner markers",
          explanation: `Zeroed inner cells based on first row/column markers.`,
          variables: { firstRowZero, firstColZero },
          dataStructure: { matrix: mat.map(r => [...r]), cellStates: allCellStates("default"), pointers: [] },
          delta: {}, isAnswer: false,
        });

        if (firstRowZero) for (let j = 0; j < n; j++) mat[0][j] = 0;
        if (firstColZero) for (let i = 0; i < m; i++) mat[i][0] = 0;

        steps.push({
          stepId: 3, lineNumbers: [21, 23], shortLabel: "Handle first row/col, done",
          explanation: `Applied first row/column zeros. Final matrix: ${JSON.stringify(mat)}.`,
          variables: { firstRowZero, firstColZero, result: JSON.stringify(mat) },
          dataStructure: { matrix: mat.map(r => [...r]), cellStates: allCellStates("found"), pointers: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(m*n)", space: "O(m+n)", explanation: "Two passes; extra boolean arrays for rows and columns" },
    optimal: { time: "O(m*n)", space: "O(1)",   explanation: "Two passes; first row/column used as markers + two booleans", tradeoff: "Eliminate O(m+n) space by reusing the matrix itself" },
  },

  interviewTips: [
    "Start with the O(m+n) space solution — it's correct and easy to explain.",
    "Then optimize: 'What if I used the matrix itself as the marker arrays?'",
    "Emphasize the order: mark inner, apply inner, then handle first row/column LAST.",
    "Explain why you need firstRowZero and firstColZero — the first row/column serve dual duty as data and markers.",
    "Ask: 'Should I modify in place or return a new matrix?' — this problem requires in-place.",
  ],

  relatedProblems: ["spiral-matrix", "rotate-image"],
};
