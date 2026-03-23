export const rotateImage = {
  id: 135,
  slug: "rotate-image",
  title: "Rotate Image",
  difficulty: "Medium",
  topic: "math-geometry",
  topicLabel: "Math & Geometry",
  neetcodeNumber: 135,
  artifactType: "Matrix",
  companies: ["Amazon", "Google", "Microsoft", "Apple", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/rotate-image/",

  pattern: "Transpose + Reverse Rows",
  patternExplanation: `Rotating a matrix 90 degrees clockwise can be decomposed into two simple
    operations: first transpose the matrix (swap rows and columns), then reverse each row.
    This avoids the complexity of tracking 4-way swaps layer by layer.`,

  intuition: {
    coreInsight: `A 90-degree clockwise rotation moves element (i,j) to position (j, n-1-i).
      Instead of doing this directly (which requires careful 4-way swaps), we can decompose
      the rotation into two simpler operations: (1) Transpose: swap (i,j) with (j,i), then
      (2) Reverse each row. The composition of these two operations equals a 90-degree rotation.`,

    mentalModel: `Imagine the matrix printed on a transparency sheet. First, flip it along the
      main diagonal (top-left to bottom-right) — this is the transpose. Now the rows became
      columns. Then reverse each row (flip left-to-right). The result is a 90-degree clockwise
      rotation. Two simple operations, each easy to implement, combine to produce the complex
      transformation.`,

    whyNaiveFails: `Creating a new matrix and copying rotated values is O(n^2) space. The
      interviewer usually requires in-place rotation (O(1) extra space). The layer-by-layer
      approach works but is error-prone with 4-way swaps and index arithmetic. Transpose +
      reverse is much cleaner and harder to get wrong.`,

    keyObservation: `For the transpose, only swap elements where i < j (upper triangle). If you
      swap ALL (i,j) with (j,i), you'd swap each pair twice, ending up with the original matrix.
      For the reverse, swap matrix[i][j] with matrix[i][n-1-j] for j < n/2.`,
  },

  problem: `You are given an n x n 2D matrix representing an image, rotate the image by 90
    degrees (clockwise). You have to rotate the image in-place, which means you have to modify
    the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.`,

  examples: [
    {
      input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      output: "[[7,4,1],[8,5,2],[9,6,3]]",
      explanation: "After 90-degree clockwise rotation.",
    },
    {
      input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
      output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
      explanation: "4x4 matrix rotated 90 degrees clockwise.",
    },
  ],

  constraints: [
    "n == matrix.length == matrix[i].length",
    "1 <= n <= 20",
    "-1000 <= matrix[i][j] <= 1000",
  ],

  approaches: {
    brute: {
      label: "New Matrix Copy",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n²)",
      idea: "Create a new matrix. Place element (i,j) at position (j, n-1-i). Copy back.",

      javaCode: `public void rotate(int[][] matrix) {
    int n = matrix.length;
    int[][] copy = new int[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            copy[j][n - 1 - i] = matrix[i][j];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            matrix[i][j] = copy[i][j];
}`,

      cppCode: `void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    vector<vector<int>> copy(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            copy[j][n - 1 - i] = matrix[i][j];
    matrix = copy;
}`,

      pythonCode: `def rotate(matrix: List[List[int]]) -> None:
    n = len(matrix)
    copy = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            copy[j][n - 1 - i] = matrix[i][j]
    for i in range(n):
        for j in range(n):
            matrix[i][j] = copy[i][j]`,

      lineAnnotations: {
        3: "Allocate new n x n matrix — O(n²) extra space",
        6: "Place (i,j) at rotated position (j, n-1-i)",
        8: "Copy result back to original matrix",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
          expectedOutput: "[[7,4,1],[8,5,2],[9,6,3]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Create copy matrix",
              explanation: "Allocate a new 3x3 matrix. We'll fill it with rotated values.",
              variables: { n: 3 },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                matrixStates: [["default","default","default"],["default","default","default"],["default","default","default"]],
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6],
              shortLabel: "Map all elements to rotated positions",
              explanation: "(0,0)→(0,2), (0,1)→(1,2), (0,2)→(2,2), etc. Each (i,j) goes to (j, n-1-i). Uses O(n²) extra space.",
              variables: { n: 3 },
              dataStructure: {
                matrix: [[7,4,1],[8,5,2],[9,6,3]],
                matrixStates: [["found","found","found"],["found","found","found"],["found","found","found"]],
                cursor: null,
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
      label: "Transpose + Reverse Rows",
      tier: "optimal",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: `Step 1: Transpose the matrix (swap matrix[i][j] with matrix[j][i] for i < j).
        Step 2: Reverse each row. The combined effect is a 90-degree clockwise rotation.
        Both operations are in-place — no extra matrix needed.`,

      javaCode: `public void rotate(int[][] matrix) {
    int n = matrix.length;

    // Step 1: Transpose
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // Step 2: Reverse each row
    for (int i = 0; i < n; i++) {
        int left = 0, right = n - 1;
        while (left < right) {
            int temp = matrix[i][left];
            matrix[i][left] = matrix[i][right];
            matrix[i][right] = temp;
            left++;
            right--;
        }
    }
}`,

      cppCode: `void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();

    // Transpose
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(matrix[i][j], matrix[j][i]);

    // Reverse each row
    for (auto& row : matrix)
        reverse(row.begin(), row.end());
}`,

      pythonCode: `def rotate(matrix: List[List[int]]) -> None:
    n = len(matrix)

    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Reverse each row
    for row in matrix:
        row.reverse()`,

      lineAnnotations: {
        4: "Step 1: Transpose — swap across main diagonal",
        5: "Only iterate upper triangle (j starts at i+1)",
        7: "Swap matrix[i][j] with matrix[j][i]",
        13: "Step 2: Reverse each row in-place",
        15: "Two-pointer approach to reverse row",
        17: "Swap left and right elements",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard 3x3",
          description: "Rotate [[1,2,3],[4,5,6],[7,8,9]] step by step",
          input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
          expectedOutput: "[[7,4,1],[8,5,2],[9,6,3]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Original matrix",
              explanation: "Starting matrix: [[1,2,3],[4,5,6],[7,8,9]]. We'll rotate 90 degrees clockwise using transpose + reverse.",
              variables: { n: 3, step: "Start" },
              dataStructure: {
                matrix: [[1,2,3],[4,5,6],[7,8,9]],
                matrixStates: [["default","default","default"],["default","default","default"],["default","default","default"]],
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "Transpose: swap (0,1)↔(1,0)",
              explanation: "Swap matrix[0][1]=2 with matrix[1][0]=4. After: row 0 = [1,4,3], row 1 = [2,5,6].",
              variables: { i: 0, j: 1, "swap": "2 ↔ 4" },
              dataStructure: {
                matrix: [[1,4,3],[2,5,6],[7,8,9]],
                matrixStates: [["default","active","default"],["active","default","default"],["default","default","default"]],
                cursor: { row: 0, col: 1 },
              },
              delta: { changedCells: [{r:0,c:1},{r:1,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7],
              shortLabel: "Transpose: swap (0,2)↔(2,0)",
              explanation: "Swap matrix[0][2]=3 with matrix[2][0]=7. After: row 0 = [1,4,7], row 2 = [3,8,9].",
              variables: { i: 0, j: 2, "swap": "3 ↔ 7" },
              dataStructure: {
                matrix: [[1,4,7],[2,5,6],[3,8,9]],
                matrixStates: [["default","default","active"],["default","default","default"],["active","default","default"]],
                cursor: { row: 0, col: 2 },
              },
              delta: { changedCells: [{r:0,c:2},{r:2,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "Transpose: swap (1,2)↔(2,1)",
              explanation: "Swap matrix[1][2]=6 with matrix[2][1]=8. Transpose complete! Matrix is now [[1,4,7],[2,5,8],[3,6,9]].",
              variables: { i: 1, j: 2, "swap": "6 ↔ 8" },
              dataStructure: {
                matrix: [[1,4,7],[2,5,8],[3,6,9]],
                matrixStates: [["visited","visited","visited"],["default","default","active"],["default","active","default"]],
                cursor: { row: 1, col: 2 },
              },
              delta: { changedCells: [{r:1,c:2},{r:2,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4],
              shortLabel: "Transpose complete",
              explanation: "After transpose: [[1,4,7],[2,5,8],[3,6,9]]. Rows and columns are swapped. Now we reverse each row to complete the rotation.",
              variables: { step: "Transpose done" },
              dataStructure: {
                matrix: [[1,4,7],[2,5,8],[3,6,9]],
                matrixStates: [["visited","visited","visited"],["visited","visited","visited"],["visited","visited","visited"]],
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13, 15, 17],
              shortLabel: "Reverse row 0: [1,4,7] → [7,4,1]",
              explanation: "Reverse row 0: swap positions 0 and 2. [1,4,7] becomes [7,4,1].",
              variables: { row: 0, before: "[1,4,7]", after: "[7,4,1]" },
              dataStructure: {
                matrix: [[7,4,1],[2,5,8],[3,6,9]],
                matrixStates: [["active","default","active"],["default","default","default"],["default","default","default"]],
                cursor: { row: 0, col: 0 },
              },
              delta: { changedCells: [{r:0,c:0},{r:0,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13, 15, 17],
              shortLabel: "Reverse row 1: [2,5,8] → [8,5,2]",
              explanation: "Reverse row 1: swap positions 0 and 2. [2,5,8] becomes [8,5,2].",
              variables: { row: 1, before: "[2,5,8]", after: "[8,5,2]" },
              dataStructure: {
                matrix: [[7,4,1],[8,5,2],[3,6,9]],
                matrixStates: [["found","found","found"],["active","default","active"],["default","default","default"]],
                cursor: { row: 1, col: 0 },
              },
              delta: { changedCells: [{r:1,c:0},{r:1,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [13, 15, 17],
              shortLabel: "Reverse row 2: [3,6,9] → [9,6,3]",
              explanation: "Reverse row 2: swap positions 0 and 2. [3,6,9] becomes [9,6,3]. Rotation complete!",
              variables: { row: 2, before: "[3,6,9]", after: "[9,6,3]" },
              dataStructure: {
                matrix: [[7,4,1],[8,5,2],[9,6,3]],
                matrixStates: [["found","found","found"],["found","found","found"],["active","default","active"]],
                cursor: { row: 2, col: 0 },
              },
              delta: { changedCells: [{r:2,c:0},{r:2,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [23],
              shortLabel: "Done! Matrix rotated 90°",
              explanation: "Final result: [[7,4,1],[8,5,2],[9,6,3]]. Original [[1,2,3],[4,5,6],[7,8,9]] has been rotated 90 degrees clockwise in-place using O(1) extra space.",
              variables: { answer: "[[7,4,1],[8,5,2],[9,6,3]]" },
              dataStructure: {
                matrix: [[7,4,1],[8,5,2],[9,6,3]],
                matrixStates: [["found","found","found"],["found","found","found"],["found","found","found"]],
                cursor: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "2x2 Matrix",
          description: "Smallest non-trivial case",
          input: { matrix: [[1,2],[3,4]] },
          expectedOutput: "[[3,1],[4,2]]",
          commonMistake: "Off-by-one errors in the transpose loop. Make sure j starts at i+1, not i, to avoid swapping an element with itself or double-swapping.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Original: [[1,2],[3,4]]",
              explanation: "2x2 matrix. Only one swap needed for transpose, then reverse each row.",
              variables: { n: 2 },
              dataStructure: {
                matrix: [[1,2],[3,4]],
                matrixStates: [["default","default"],["default","default"]],
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "Transpose: swap (0,1)↔(1,0): 2↔3",
              explanation: "Only one pair to swap: matrix[0][1]=2 with matrix[1][0]=3. After transpose: [[1,3],[2,4]].",
              variables: { i: 0, j: 1, "swap": "2 ↔ 3" },
              dataStructure: {
                matrix: [[1,3],[2,4]],
                matrixStates: [["default","active"],["active","default"]],
                cursor: { row: 0, col: 1 },
              },
              delta: { changedCells: [{r:0,c:1},{r:1,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [13, 15, 17],
              shortLabel: "Reverse rows: [1,3]→[3,1], [2,4]→[4,2]",
              explanation: "Reverse each row. [1,3] → [3,1]. [2,4] → [4,2]. Final: [[3,1],[4,2]].",
              variables: { step: "Reverse rows" },
              dataStructure: {
                matrix: [[3,1],[4,2]],
                matrixStates: [["active","active"],["active","active"]],
                cursor: null,
              },
              delta: { changedCells: [{r:0,c:0},{r:0,c:1},{r:1,c:0},{r:1,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [23],
              shortLabel: "Done: [[3,1],[4,2]]",
              explanation: "Rotation complete. [[1,2],[3,4]] → [[3,1],[4,2]]. Verified: top-left 1 moved to top-right, bottom-left 3 moved to top-left.",
              variables: { answer: "[[3,1],[4,2]]" },
              dataStructure: {
                matrix: [[3,1],[4,2]],
                matrixStates: [["found","found"],["found","found"]],
                cursor: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ matrix }) {
        const steps = [];
        const n = matrix.length;
        // Deep copy
        const m = matrix.map(row => [...row]);
        const defaultStates = () => Array.from({ length: n }, () => Array(n).fill("default"));

        steps.push({
          stepId: 0,
          lineNumbers: [1, 2],
          shortLabel: `Original ${n}x${n} matrix`,
          explanation: `Starting with a ${n}x${n} matrix. Will apply transpose + reverse rows.`,
          variables: { n },
          dataStructure: {
            matrix: m.map(r => [...r]),
            matrixStates: defaultStates(),
            cursor: null,
          },
          delta: {},
          isAnswer: false,
        });

        // Step 1: Transpose
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            const temp = m[i][j];
            m[i][j] = m[j][i];
            m[j][i] = temp;

            const states = defaultStates();
            states[i][j] = "active";
            states[j][i] = "active";

            steps.push({
              stepId: steps.length,
              lineNumbers: [5, 6, 7],
              shortLabel: `Transpose: swap (${i},${j})↔(${j},${i})`,
              explanation: `Swap matrix[${i}][${j}]=${temp} with matrix[${j}][${i}]=${m[i][j]}. Now matrix[${i}][${j}]=${m[i][j]}, matrix[${j}][${i}]=${m[j][i]}.`,
              variables: { i, j, "swap": `${temp} ↔ ${m[j][i]}` },
              dataStructure: {
                matrix: m.map(r => [...r]),
                matrixStates: states,
                cursor: { row: i, col: j },
              },
              delta: { changedCells: [{r:i,c:j},{r:j,c:i}] },
              isAnswer: false,
            });
          }
        }

        // Step 2: Reverse each row
        for (let i = 0; i < n; i++) {
          let left = 0, right = n - 1;
          while (left < right) {
            const temp = m[i][left];
            m[i][left] = m[i][right];
            m[i][right] = temp;
            left++;
            right--;
          }

          const states = defaultStates();
          for (let j = 0; j < n; j++) states[i][j] = "active";

          steps.push({
            stepId: steps.length,
            lineNumbers: [13, 15, 17],
            shortLabel: `Reverse row ${i}`,
            explanation: `Reverse row ${i}: [${m[i].join(",")}].`,
            variables: { row: i, result: `[${m[i].join(",")}]` },
            dataStructure: {
              matrix: m.map(r => [...r]),
              matrixStates: states,
              cursor: { row: i, col: 0 },
            },
            delta: {},
            isAnswer: false,
          });
        }

        // Final
        const finalStates = Array.from({ length: n }, () => Array(n).fill("found"));
        steps.push({
          stepId: steps.length,
          lineNumbers: [23],
          shortLabel: "Rotation complete",
          explanation: `Matrix rotated 90 degrees clockwise in-place. Result: [${m.map(r => `[${r.join(",")}]`).join(",")}].`,
          variables: { answer: m.map(r => `[${r.join(",")}]`).join(",") },
          dataStructure: {
            matrix: m.map(r => [...r]),
            matrixStates: finalStates,
            cursor: null,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n²)", space: "O(n²)", explanation: "Copy all elements to a new matrix" },
    optimal: { time: "O(n²)", space: "O(1)", explanation: "Transpose and reverse are both in-place operations", tradeoff: "Same time complexity but O(1) space vs O(n²) space" },
  },

  interviewTips: [
    "State both approaches: new matrix (O(n²) space) and transpose+reverse (O(1) space).",
    "Explain WHY transpose + reverse = 90° rotation — interviewers love the mathematical insight.",
    "For counterclockwise rotation: reverse rows FIRST, then transpose. Or transpose then reverse columns.",
    "Edge case: 1x1 matrix — no-op.",
    "Mention the layer-by-layer 4-way swap approach as an alternative — shows breadth of knowledge.",
    "The transpose loop condition j > i (not j != i) prevents double-swapping.",
  ],

  relatedProblems: ["spiral-matrix", "set-matrix-zeroes"],
};
