export const spiralMatrix = {
  id: 136,
  slug: "spiral-matrix",
  title: "Spiral Matrix",
  difficulty: "Medium",
  topic: "math-geometry",
  topicLabel: "Math & Geometry",
  neetcodeNumber: 136,
  artifactType: "Matrix",
  companies: ["Amazon", "Microsoft", "Apple", "Google", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/spiral-matrix/",

  pattern: "Layer-by-Layer Boundary Traversal",
  patternExplanation: `Maintain four boundaries (top, bottom, left, right) and peel the matrix
    layer by layer in spiral order: traverse right along the top row, down the right column,
    left along the bottom row, and up the left column, shrinking boundaries after each pass.`,

  intuition: {
    coreInsight: `A spiral is just four straight-line traversals repeated: go right across the top,
      go down the right side, go left across the bottom, go up the left side. After each full loop,
      the "frame" shrinks inward by one cell on each side. The key is tracking four boundary pointers
      and shrinking them correctly after each direction change.`,

    mentalModel: `Imagine peeling an onion layer by layer. The outermost ring is the first layer you
      read off in spiral order. Once that ring is consumed, you peel it away, revealing a smaller
      matrix underneath. You repeat until there's nothing left. The four boundaries (top, bottom,
      left, right) tell you where the current outermost ring starts and ends.`,

    whyNaiveFails: `A naive approach might try to simulate movement with direction vectors and
      visited markers, using O(m*n) extra space for a visited matrix. While it works, it's unnecessarily
      complex. The boundary approach needs only four integer variables and handles all edge cases
      (single row, single column, rectangular matrices) naturally.`,

    keyObservation: `After traversing each direction, immediately check whether the boundaries
      have crossed. For example, after going right along the top row and incrementing top, check
      if top > bottom before attempting the downward traversal. This handles non-square matrices
      where one dimension is exhausted before the other.`,
  },

  problem: `Given an m x n matrix, return all elements of the matrix in spiral order.`,

  examples: [
    { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]", explanation: "Spiral from outer ring inward" },
    { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1,2,3,4,8,12,11,10,9,5,6,7]", explanation: "3x4 matrix spiral" },
  ],

  constraints: [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 10",
    "-100 <= matrix[i][j] <= 100",
  ],

  approaches: {
    brute: {
      label: "Simulation with Visited Array",
      tier: "brute",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
      idea: "Use a visited matrix and direction vectors to simulate walking in spiral order, turning right when hitting a wall or visited cell.",

      javaCode: `public List<Integer> spiralOrder(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean[][] visited = new boolean[m][n];
    int[] dr = {0, 1, 0, -1};
    int[] dc = {1, 0, -1, 0};
    List<Integer> result = new ArrayList<>();
    int r = 0, c = 0, dir = 0;
    for (int i = 0; i < m * n; i++) {
        result.add(matrix[r][c]);
        visited[r][c] = true;
        int nr = r + dr[dir], nc = c + dc[dir];
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) {
            dir = (dir + 1) % 4;
            nr = r + dr[dir];
            nc = c + dc[dir];
        }
        r = nr;
        c = nc;
    }
    return result;
}`,

      cppCode: `vector<int> spiralOrder(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<bool>> visited(m, vector<bool>(n, false));
    int dr[] = {0, 1, 0, -1};
    int dc[] = {1, 0, -1, 0};
    vector<int> result;
    int r = 0, c = 0, dir = 0;
    for (int i = 0; i < m * n; i++) {
        result.push_back(matrix[r][c]);
        visited[r][c] = true;
        int nr = r + dr[dir], nc = c + dc[dir];
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) {
            dir = (dir + 1) % 4;
            nr = r + dr[dir];
            nc = c + dc[dir];
        }
        r = nr;
        c = nc;
    }
    return result;
}`,

      pythonCode: `def spiralOrder(matrix: List[List[int]]) -> List[int]:
    m, n = len(matrix), len(matrix[0])
    visited = [[False] * n for _ in range(m)]
    dr = [0, 1, 0, -1]
    dc = [1, 0, -1, 0]
    result = []
    r, c, d = 0, 0, 0
    for _ in range(m * n):
        result.append(matrix[r][c])
        visited[r][c] = True
        nr, nc = r + dr[d], c + dc[d]
        if nr < 0 or nr >= m or nc < 0 or nc >= n or visited[nr][nc]:
            d = (d + 1) % 4
            nr, nc = r + dr[d], c + dc[d]
        r, c = nr, nc
    return result`,

      lineAnnotations: {
        3: "Create visited matrix to track which cells we've read",
        4: "Direction vectors: right, down, left, up",
        8: "Process each of m*n cells exactly once",
        9: "Add current cell value to result",
        10: "Mark current cell as visited",
        11: "Compute next position in current direction",
        12: "If next position is invalid or already visited, turn right",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard 3x3",
          input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
          expectedOutput: "[1,2,3,6,9,8,7,4,5]",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 4], shortLabel: "Init",
              explanation: "Create a 3x3 visited matrix (all false) and direction vectors for right, down, left, up. Start at (0,0) facing right.",
              variables: { r: 0, c: 0, dir: "right", result: "[]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "active", "0,1": "default", "0,2": "default", "1,0": "default", "1,1": "default", "1,2": "default", "2,0": "default", "2,1": "default", "2,2": "default" },
                pointers: [{ name: "cursor", row: 0, col: 0 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [9, 10], shortLabel: "Read (0,0)=1",
              explanation: "Read matrix[0][0]=1, add to result. Mark (0,0) as visited. Next position (0,1) is valid, keep going right.",
              variables: { r: 0, c: 0, dir: "right", result: "[1]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "active", "0,2": "default", "1,0": "default", "1,1": "default", "1,2": "default", "2,0": "default", "2,1": "default", "2,2": "default" },
                pointers: [{ name: "cursor", row: 0, col: 1 }],
              },
              delta: { changedCells: ["0,0"] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [9, 10], shortLabel: "Read (0,1)=2",
              explanation: "Read matrix[0][1]=2, add to result. Mark visited. Continue right to (0,2).",
              variables: { r: 0, c: 1, dir: "right", result: "[1,2]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "active", "1,0": "default", "1,1": "default", "1,2": "default", "2,0": "default", "2,1": "default", "2,2": "default" },
                pointers: [{ name: "cursor", row: 0, col: 2 }],
              },
              delta: { changedCells: ["0,1"] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [9, 10, 12], shortLabel: "Read (0,2)=3, turn down",
              explanation: "Read matrix[0][2]=3. Next right would be (0,3) which is out of bounds. Turn to face down. Next position is (1,2).",
              variables: { r: 0, c: 2, dir: "down", result: "[1,2,3]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "default", "1,1": "default", "1,2": "active", "2,0": "default", "2,1": "default", "2,2": "default" },
                pointers: [{ name: "cursor", row: 1, col: 2 }],
              },
              delta: { changedCells: ["0,2"] }, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [9, 10], shortLabel: "Read (1,2)=6",
              explanation: "Read matrix[1][2]=6. Continue down to (2,2).",
              variables: { r: 1, c: 2, dir: "down", result: "[1,2,3,6]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "default", "1,1": "default", "1,2": "visited", "2,0": "default", "2,1": "default", "2,2": "active" },
                pointers: [{ name: "cursor", row: 2, col: 2 }],
              },
              delta: { changedCells: ["1,2"] }, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [9, 10, 12], shortLabel: "Read (2,2)=9, turn left",
              explanation: "Read matrix[2][2]=9. Next down would be (3,2) which is out of bounds. Turn to face left. Next position is (2,1).",
              variables: { r: 2, c: 2, dir: "left", result: "[1,2,3,6,9]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "default", "1,1": "default", "1,2": "visited", "2,0": "default", "2,1": "active", "2,2": "visited" },
                pointers: [{ name: "cursor", row: 2, col: 1 }],
              },
              delta: { changedCells: ["2,2"] }, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [9, 10], shortLabel: "Read (2,1)=8",
              explanation: "Read matrix[2][1]=8. Continue left to (2,0).",
              variables: { r: 2, c: 1, dir: "left", result: "[1,2,3,6,9,8]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "default", "1,1": "default", "1,2": "visited", "2,0": "active", "2,1": "visited", "2,2": "visited" },
                pointers: [{ name: "cursor", row: 2, col: 0 }],
              },
              delta: { changedCells: ["2,1"] }, isAnswer: false,
            },
            {
              stepId: 7, lineNumbers: [9, 10, 12], shortLabel: "Read (2,0)=7, turn up",
              explanation: "Read matrix[2][0]=7. Next left would be (2,-1) which is out of bounds. Turn to face up. Next position is (1,0).",
              variables: { r: 2, c: 0, dir: "up", result: "[1,2,3,6,9,8,7]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "active", "1,1": "default", "1,2": "visited", "2,0": "visited", "2,1": "visited", "2,2": "visited" },
                pointers: [{ name: "cursor", row: 1, col: 0 }],
              },
              delta: { changedCells: ["2,0"] }, isAnswer: false,
            },
            {
              stepId: 8, lineNumbers: [9, 10, 12], shortLabel: "Read (1,0)=4, turn right",
              explanation: "Read matrix[1][0]=4. Next up would be (0,0) which is already visited. Turn to face right. Next position is (1,1).",
              variables: { r: 1, c: 0, dir: "right", result: "[1,2,3,6,9,8,7,4]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "visited", "1,1": "active", "1,2": "visited", "2,0": "visited", "2,1": "visited", "2,2": "visited" },
                pointers: [{ name: "cursor", row: 1, col: 1 }],
              },
              delta: { changedCells: ["1,0"] }, isAnswer: false,
            },
            {
              stepId: 9, lineNumbers: [9, 10], shortLabel: "Read (1,1)=5 - Done!",
              explanation: "Read matrix[1][1]=5. All 9 cells have been visited. The spiral traversal is complete: [1,2,3,6,9,8,7,4,5].",
              variables: { r: 1, c: 1, result: "[1,2,3,6,9,8,7,4,5]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "visited", "1,1": "found", "1,2": "visited", "2,0": "visited", "2,1": "visited", "2,2": "visited" },
                pointers: [],
              },
              delta: { changedCells: ["1,1"] }, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ matrix }) {
        const steps = [];
        const m = matrix.length, n = matrix[0].length;
        const visited = Array.from({ length: m }, () => Array(n).fill(false));
        const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];
        const dirNames = ["right", "down", "left", "up"];
        const result = [];
        let r = 0, c = 0, dir = 0;

        const getCellStates = (cr, cc) => {
          const states = {};
          for (let i = 0; i < m; i++)
            for (let j = 0; j < n; j++)
              states[`${i},${j}`] = visited[i][j] ? "visited" : (i === cr && j === cc) ? "active" : "default";
          return states;
        };

        steps.push({
          stepId: 0, lineNumbers: [3, 4], shortLabel: "Init",
          explanation: `Create ${m}x${n} visited matrix and direction vectors. Start at (0,0) facing right.`,
          variables: { r: 0, c: 0, dir: "right", result: "[]" },
          dataStructure: { matrix, cellStates: getCellStates(0, 0), pointers: [{ name: "cursor", row: 0, col: 0 }] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < m * n; i++) {
          result.push(matrix[r][c]);
          visited[r][c] = true;
          let nr = r + dr[dir], nc = c + dc[dir];
          let turned = false;
          if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) {
            dir = (dir + 1) % 4;
            nr = r + dr[dir];
            nc = c + dc[dir];
            turned = true;
          }
          const isLast = i === m * n - 1;
          steps.push({
            stepId: steps.length, lineNumbers: turned ? [9, 10, 12] : [9, 10],
            shortLabel: `Read (${r},${c})=${matrix[r][c]}${turned ? ", turn " + dirNames[dir] : ""}`,
            explanation: `Read matrix[${r}][${c}]=${matrix[r][c]}.${turned ? ` Turned to face ${dirNames[dir]}.` : ""} Result so far: [${result.join(",")}].${isLast ? " All cells visited!" : ""}`,
            variables: { r, c, dir: dirNames[dir], result: `[${result.join(",")}]` },
            dataStructure: {
              matrix,
              cellStates: isLast ? (() => { const s = getCellStates(-1, -1); s[`${r},${c}`] = "found"; return s; })() : getCellStates(nr, nc),
              pointers: isLast ? [] : [{ name: "cursor", row: nr, col: nc }],
            },
            delta: { changedCells: [`${r},${c}`] }, isAnswer: isLast,
          });
          r = nr;
          c = nc;
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Boundary Shrinking",
      tier: "optimal",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(1)",
      idea: "Maintain top, bottom, left, right boundaries. Traverse each edge of the current layer, then shrink the boundary inward. Repeat until all elements are collected.",

      javaCode: `public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++)
            result.add(matrix[top][c]);
        top++;

        for (int r = top; r <= bottom; r++)
            result.add(matrix[r][right]);
        right--;

        if (top <= bottom) {
            for (int c = right; c >= left; c--)
                result.add(matrix[bottom][c]);
            bottom--;
        }

        if (left <= right) {
            for (int r = bottom; r >= top; r--)
                result.add(matrix[r][left]);
            left++;
        }
    }
    return result;
}`,

      cppCode: `vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;

    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++)
            result.push_back(matrix[top][c]);
        top++;

        for (int r = top; r <= bottom; r++)
            result.push_back(matrix[r][right]);
        right--;

        if (top <= bottom) {
            for (int c = right; c >= left; c--)
                result.push_back(matrix[bottom][c]);
            bottom--;
        }

        if (left <= right) {
            for (int r = bottom; r >= top; r--)
                result.push_back(matrix[r][left]);
            left++;
        }
    }
    return result;
}`,

      pythonCode: `def spiralOrder(matrix: List[List[int]]) -> List[int]:
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            result.append(matrix[top][c])
        top += 1

        for r in range(top, bottom + 1):
            result.append(matrix[r][right])
        right -= 1

        if top <= bottom:
            for c in range(right, left - 1, -1):
                result.append(matrix[bottom][c])
            bottom -= 1

        if left <= right:
            for r in range(bottom, top - 1, -1):
                result.append(matrix[r][left])
            left += 1

    return result`,

      lineAnnotations: {
        2: "Result list to collect spiral-ordered elements",
        3: "Top and bottom row boundaries",
        4: "Left and right column boundaries",
        6: "Continue while boundaries haven't crossed",
        7: "Traverse top row left to right",
        9: "Shrink top boundary down",
        10: "Traverse right column top to bottom",
        12: "Shrink right boundary left",
        14: "Check if rows remain before going left",
        15: "Traverse bottom row right to left",
        17: "Shrink bottom boundary up",
        19: "Check if columns remain before going up",
        20: "Traverse left column bottom to top",
        22: "Shrink left boundary right",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard 3x3",
          description: "Square matrix with a center element",
          input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
          expectedOutput: "[1,2,3,6,9,8,7,4,5]",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3, 4], shortLabel: "Init boundaries",
              explanation: "Initialize four boundaries: top=0, bottom=2, left=0, right=2. These define the outermost unvisited ring.",
              variables: { top: 0, bottom: 2, left: 0, right: 2, result: "[]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "default", "0,1": "default", "0,2": "default", "1,0": "default", "1,1": "default", "1,2": "default", "2,0": "default", "2,1": "default", "2,2": "default" },
                pointers: [],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [7, 8, 9], shortLabel: "Top row: 1,2,3",
              explanation: "Traverse top row (row 0) from left=0 to right=2: read 1, 2, 3. Then increment top to 1.",
              variables: { top: 1, bottom: 2, left: 0, right: 2, result: "[1,2,3]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "default", "1,1": "default", "1,2": "default", "2,0": "default", "2,1": "default", "2,2": "default" },
                pointers: [{ name: "top", row: 1, col: 0 }],
              },
              delta: { changedCells: ["0,0", "0,1", "0,2"] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [10, 11, 12], shortLabel: "Right col: 6,9",
              explanation: "Traverse right column (col 2) from top=1 to bottom=2: read 6, 9. Then decrement right to 1.",
              variables: { top: 1, bottom: 2, left: 0, right: 1, result: "[1,2,3,6,9]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "default", "1,1": "default", "1,2": "visited", "2,0": "default", "2,1": "default", "2,2": "visited" },
                pointers: [{ name: "right", row: 1, col: 1 }],
              },
              delta: { changedCells: ["1,2", "2,2"] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [14, 15, 16, 17], shortLabel: "Bottom row: 8,7",
              explanation: "top(1) <= bottom(2), so traverse bottom row (row 2) from right=1 to left=0: read 8, 7. Decrement bottom to 1.",
              variables: { top: 1, bottom: 1, left: 0, right: 1, result: "[1,2,3,6,9,8,7]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "default", "1,1": "default", "1,2": "visited", "2,0": "visited", "2,1": "visited", "2,2": "visited" },
                pointers: [{ name: "bottom", row: 1, col: 0 }],
              },
              delta: { changedCells: ["2,1", "2,0"] }, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [19, 20, 21, 22], shortLabel: "Left col: 4",
              explanation: "left(0) <= right(1), so traverse left column (col 0) from bottom=1 to top=1: read 4. Increment left to 1.",
              variables: { top: 1, bottom: 1, left: 1, right: 1, result: "[1,2,3,6,9,8,7,4]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "visited", "1,1": "default", "1,2": "visited", "2,0": "visited", "2,1": "visited", "2,2": "visited" },
                pointers: [{ name: "left", row: 1, col: 1 }],
              },
              delta: { changedCells: ["1,0"] }, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [7, 8, 9], shortLabel: "Top row (inner): 5",
              explanation: "New loop: top=1, bottom=1, left=1, right=1. Traverse top row (row 1) from left=1 to right=1: read 5. This is the center cell. Increment top to 2.",
              variables: { top: 2, bottom: 1, left: 1, right: 1, result: "[1,2,3,6,9,8,7,4,5]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,0": "visited", "1,1": "found", "1,2": "visited", "2,0": "visited", "2,1": "visited", "2,2": "visited" },
                pointers: [],
              },
              delta: { changedCells: ["1,1"] }, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [6], shortLabel: "Loop ends, return result",
              explanation: "top(2) > bottom(1), so while-loop exits. Return [1,2,3,6,9,8,7,4,5]. All elements collected in spiral order!",
              variables: { top: 2, bottom: 1, left: 1, right: 1, result: "[1,2,3,6,9,8,7,4,5]" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found", "1,0": "found", "1,1": "found", "1,2": "found", "2,0": "found", "2,1": "found", "2,2": "found" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Row",
          description: "1x4 matrix — only the top row traversal fires",
          input: { matrix: [[1,2,3,4]] },
          expectedOutput: "[1,2,3,4]",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3, 4], shortLabel: "Init boundaries",
              explanation: "top=0, bottom=0, left=0, right=3. A single-row matrix means top equals bottom.",
              variables: { top: 0, bottom: 0, left: 0, right: 3, result: "[]" },
              dataStructure: {
                matrix: [[1,2,3,4]],
                cellStates: { "0,0": "default", "0,1": "default", "0,2": "default", "0,3": "default" },
                pointers: [],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [7, 8, 9], shortLabel: "Top row: 1,2,3,4",
              explanation: "Traverse top row (row 0) from left=0 to right=3: read 1, 2, 3, 4. Increment top to 1.",
              variables: { top: 1, bottom: 0, left: 0, right: 3, result: "[1,2,3,4]" },
              dataStructure: {
                matrix: [[1,2,3,4]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "0,3": "visited" },
                pointers: [],
              },
              delta: { changedCells: ["0,0", "0,1", "0,2", "0,3"] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [6], shortLabel: "Loop ends, return result",
              explanation: "top(1) > bottom(0), so while-loop exits. Return [1,2,3,4]. The single-row case works because only the top-row traversal fires.",
              variables: { result: "[1,2,3,4]" },
              dataStructure: {
                matrix: [[1,2,3,4]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found", "0,3": "found" },
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
        let top = 0, bottom = m - 1, left = 0, right = n - 1;
        const result = [];

        const getCellStates = (visitedSet, highlightSet, foundAll) => {
          const states = {};
          for (let i = 0; i < m; i++)
            for (let j = 0; j < n; j++) {
              const key = `${i},${j}`;
              if (foundAll) states[key] = "found";
              else if (highlightSet && highlightSet.has(key)) states[key] = "active";
              else if (visitedSet.has(key)) states[key] = "visited";
              else states[key] = "default";
            }
          return states;
        };

        const visitedSet = new Set();

        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4], shortLabel: "Init boundaries",
          explanation: `Initialize boundaries: top=${top}, bottom=${bottom}, left=${left}, right=${right}.`,
          variables: { top, bottom, left, right, result: "[]" },
          dataStructure: { matrix, cellStates: getCellStates(visitedSet, null, false), pointers: [] },
          delta: {}, isAnswer: false,
        });

        while (top <= bottom && left <= right) {
          // Top row
          const topCells = new Set();
          for (let c = left; c <= right; c++) {
            result.push(matrix[top][c]);
            visitedSet.add(`${top},${c}`);
            topCells.add(`${top},${c}`);
          }
          top++;
          steps.push({
            stepId: steps.length, lineNumbers: [7, 8, 9],
            shortLabel: `Top row: ${Array.from(topCells).map(k => { const [r,c] = k.split(","); return matrix[r][c]; }).join(",")}`,
            explanation: `Traverse top row from left=${left} to right=${right-1+1-1+1}: read ${Array.from(topCells).map(k => { const [r,c] = k.split(","); return matrix[r][c]; }).join(", ")}. Increment top to ${top}.`,
            variables: { top, bottom, left, right, result: `[${result.join(",")}]` },
            dataStructure: { matrix, cellStates: getCellStates(visitedSet, null, false), pointers: [] },
            delta: { changedCells: Array.from(topCells) }, isAnswer: false,
          });

          // Right column
          if (top <= bottom) {
            const rightCells = new Set();
            for (let r = top; r <= bottom; r++) {
              result.push(matrix[r][right]);
              visitedSet.add(`${r},${right}`);
              rightCells.add(`${r},${right}`);
            }
            right--;
            steps.push({
              stepId: steps.length, lineNumbers: [10, 11, 12],
              shortLabel: `Right col: ${Array.from(rightCells).map(k => { const [r,c] = k.split(","); return matrix[r][c]; }).join(",")}`,
              explanation: `Traverse right column from top=${top} to bottom=${bottom}: read values. Decrement right to ${right}.`,
              variables: { top, bottom, left, right, result: `[${result.join(",")}]` },
              dataStructure: { matrix, cellStates: getCellStates(visitedSet, null, false), pointers: [] },
              delta: { changedCells: Array.from(rightCells) }, isAnswer: false,
            });
          }

          // Bottom row
          if (top <= bottom) {
            const bottomCells = new Set();
            for (let c = right; c >= left; c--) {
              result.push(matrix[bottom][c]);
              visitedSet.add(`${bottom},${c}`);
              bottomCells.add(`${bottom},${c}`);
            }
            bottom--;
            steps.push({
              stepId: steps.length, lineNumbers: [14, 15, 16, 17],
              shortLabel: `Bottom row: ${Array.from(bottomCells).map(k => { const [r,c] = k.split(","); return matrix[r][c]; }).join(",")}`,
              explanation: `Traverse bottom row from right=${right} to left=${left}: read values. Decrement bottom to ${bottom}.`,
              variables: { top, bottom, left, right, result: `[${result.join(",")}]` },
              dataStructure: { matrix, cellStates: getCellStates(visitedSet, null, false), pointers: [] },
              delta: { changedCells: Array.from(bottomCells) }, isAnswer: false,
            });
          }

          // Left column
          if (left <= right) {
            const leftCells = new Set();
            for (let r = bottom; r >= top; r--) {
              result.push(matrix[r][left]);
              visitedSet.add(`${r},${left}`);
              leftCells.add(`${r},${left}`);
            }
            left++;
            steps.push({
              stepId: steps.length, lineNumbers: [19, 20, 21, 22],
              shortLabel: `Left col: ${Array.from(leftCells).map(k => { const [r,c] = k.split(","); return matrix[r][c]; }).join(",")}`,
              explanation: `Traverse left column from bottom=${bottom} to top=${top}: read values. Increment left to ${left}.`,
              variables: { top, bottom, left, right, result: `[${result.join(",")}]` },
              dataStructure: { matrix, cellStates: getCellStates(visitedSet, null, false), pointers: [] },
              delta: { changedCells: Array.from(leftCells) }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [6], shortLabel: "Return result",
          explanation: `All elements collected. Return [${result.join(",")}].`,
          variables: { result: `[${result.join(",")}]` },
          dataStructure: { matrix, cellStates: getCellStates(visitedSet, null, true), pointers: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(m*n)", space: "O(m*n)", explanation: "Visit every cell; visited matrix uses O(m*n) extra space" },
    optimal: { time: "O(m*n)", space: "O(1)",   explanation: "Visit every cell; only four boundary variables needed", tradeoff: "Same time complexity but eliminate O(m*n) visited array" },
  },

  interviewTips: [
    "Clarify: Is the matrix always non-empty? (Yes per constraints.)",
    "Start by explaining the four-boundary approach — it's cleaner than direction simulation.",
    "Emphasize the boundary checks between bottom-row and left-column traversals to handle non-square matrices.",
    "Walk through a rectangular example (e.g., 1x4 or 3x1) to show edge case handling.",
    "Mention that output space is O(m*n) but auxiliary space is O(1) — interviewers care about this distinction.",
  ],

  relatedProblems: ["rotate-image", "set-matrix-zeroes"],
};
