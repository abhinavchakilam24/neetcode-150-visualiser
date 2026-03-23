export const search2DMatrix = {
  id: 29,
  slug: "search-2d-matrix",
  title: "Search a 2D Matrix",
  difficulty: "Medium",
  topic: "binary-search",
  topicLabel: "Binary Search",
  neetcodeNumber: 29,
  artifactType: "BinarySearch",
  companies: ["Amazon", "Microsoft", "Bloomberg", "Meta", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/search-a-2d-matrix/",

  pattern: "Binary Search on Virtual 1D Array",
  patternExplanation: `Treat a sorted 2D matrix as a flattened 1D sorted array. Map virtual index to
    row/col with row = idx / cols, col = idx % cols. Then run standard binary search.`,

  intuition: {
    coreInsight: `The matrix has two sorting properties: each row is sorted left-to-right, and the
      first element of each row is greater than the last element of the previous row. This means if
      you read elements row by row, left to right, you get one long sorted sequence. A matrix with
      m rows and n columns is really a sorted array of m*n elements. Binary search on this virtual
      array runs in O(log(m*n)) = O(log m + log n).`,

    mentalModel: `Imagine unrolling a scroll. The matrix is a scroll written in rows — if you unroll
      it into one long strip, every number is in sorted order. You don't need to physically unroll it.
      Given any position on the strip (index k), you can instantly find which row (k / cols) and column
      (k % cols) it maps to. Binary search on the strip, read from the matrix.`,

    whyNaiveFails: `Scanning every cell is O(m*n). Even a smarter approach of binary-searching each
      row separately is O(m * log n). But we can do O(log(m*n)) by treating the entire matrix as one
      sorted array. The key insight is that the matrix IS a sorted array — just displayed in 2D.`,

    keyObservation: `The index mapping is the crux: virtual index k maps to matrix[k / n][k % n] where
      n is the number of columns. This lets you run a single binary search over all m*n elements without
      modifying the matrix or using extra space. The division and modulo operations replace the need for
      actual flattening.`,
  },

  problem: `You are given an m x n integer matrix with the following two properties: each row is sorted
    in non-decreasing order, and the first integer of each row is greater than the last integer of the
    previous row. Given an integer target, return true if target is in matrix, or false otherwise.
    You must write a solution in O(log(m * n)) time complexity.`,

  examples: [
    { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true", explanation: "3 is in the matrix at position [0][1]" },
    { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", output: "false", explanation: "13 is not in the matrix" },
  ],

  constraints: [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 100",
    "-10^4 <= matrix[i][j], target <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Linear Scan",
      tier: "brute",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(1)",
      idea: "Scan every cell in the matrix. Return true if any cell equals target.",

      javaCode: `public boolean searchMatrix(int[][] matrix, int target) {
    for (int i = 0; i < matrix.length; i++) {
        for (int j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == target) {
                return true;
            }
        }
    }
    return false;
}`,

      cppCode: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    for (int i = 0; i < matrix.size(); i++) {
        for (int j = 0; j < matrix[0].size(); j++) {
            if (matrix[i][j] == target) {
                return true;
            }
        }
    }
    return false;
}`,

      pythonCode: `def searchMatrix(matrix: List[List[int]], target: int) -> bool:
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            if matrix[i][j] == target:
                return True
    return False`,

      lineAnnotations: {
        2: "Iterate over each row",
        3: "Iterate over each column in the row",
        4: "Check if current cell equals target",
        5: "Found it — return true",
        9: "Scanned everything — target not found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3 },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "i=0, j=0: 1 ≠ 3",
              explanation: "Start scanning at matrix[0][0]=1. Not equal to target 3. Continue.",
              variables: { i: 0, j: 0, "matrix[i][j]": 1, target: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "scan", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [2, 3, 4, 5],
              shortLabel: "i=0, j=1: 3 = 3 ✓",
              explanation: "matrix[0][1]=3 equals target 3. Found it! Return true. Linear scan needed 2 checks.",
              variables: { i: 0, j: 1, "matrix[i][j]": 3, target: 3, answer: "true" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "scan", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ matrix, target }) {
        const steps = [];
        const flat = matrix.flat();
        const cols = matrix[0].length;
        for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < cols; j++) {
            const idx = i * cols + j;
            const found = matrix[i][j] === target;
            steps.push({
              stepId: steps.length,
              lineNumbers: found ? [2, 3, 4, 5] : [2, 3, 4],
              shortLabel: found ? `[${i}][${j}]: ${matrix[i][j]} = ${target} ✓` : `[${i}][${j}]: ${matrix[i][j]} ≠ ${target}`,
              explanation: found
                ? `matrix[${i}][${j}]=${matrix[i][j]} equals target ${target}. Found! Return true.`
                : `matrix[${i}][${j}]=${matrix[i][j]}. Not equal to target ${target}. Continue scanning.`,
              variables: { i, j, "matrix[i][j]": matrix[i][j], target, ...(found ? { answer: "true" } : {}) },
              dataStructure: {
                arrayStates: Object.fromEntries(flat.map((_, k) => [k, k < idx ? "visited" : k === idx ? (found ? "found" : "active") : "default"])),
                pointers: [{ name: "scan", index: idx, color: "pointer" }],
              },
              delta: { changedIndices: [idx] },
              isAnswer: found,
            });
            if (found) return steps;
          }
        }
        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: "Not found → false",
          explanation: `Scanned all ${flat.length} cells. Target ${target} not found. Return false.`,
          variables: { target, answer: "false" },
          dataStructure: {
            arrayStates: Object.fromEntries(flat.map((_, k) => [k, "visited"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Binary Search on Virtual 1D Array",
      tier: "optimal",
      timeComplexity: "O(log(m * n))",
      spaceComplexity: "O(1)",
      idea: `Treat the matrix as a flattened sorted array of m*n elements. Use binary search with
        lo=0, hi=m*n-1. Map virtual index to row = mid / cols, col = mid % cols.`,

      javaCode: `public boolean searchMatrix(int[][] matrix, int target) {
    int m = matrix.length, n = matrix[0].length;
    int lo = 0, hi = m * n - 1;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int val = matrix[mid / n][mid % n];

        if (val == target) {
            return true;
        } else if (val < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return false;
}`,

      cppCode: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int m = matrix.size(), n = matrix[0].size();
    int lo = 0, hi = m * n - 1;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int val = matrix[mid / n][mid % n];

        if (val == target) {
            return true;
        } else if (val < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return false;
}`,

      pythonCode: `def searchMatrix(matrix: List[List[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    lo, hi = 0, m * n - 1

    while lo <= hi:
        mid = lo + (hi - lo) // 2
        val = matrix[mid // n][mid % n]

        if val == target:
            return True
        elif val < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return False`,

      lineAnnotations: {
        2: "Get dimensions: m rows, n columns",
        3: "Search range covers all m*n virtual indices",
        5: "Standard binary search loop",
        6: "Compute midpoint of virtual array",
        7: "Convert virtual index to matrix[row][col]",
        9: "Target found — return true",
        10: "Return true",
        11: "Value too small — search right half",
        12: "Move lo past mid",
        13: "Value too large — search left half",
        14: "Move hi before mid",
        17: "Search exhausted — target not in matrix",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Target found in first row after two halvings",
          input: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3 },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init lo=0, hi=11",
              explanation: "Matrix is 3x4 = 12 elements. Treat it as a sorted array of indices 0..11. lo=0, hi=11. We're searching for target=3.",
              variables: { m: 3, n: 4, lo: 0, hi: 11, target: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 11, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: null,
                bsRight: 11,
                bsCondition: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "mid=5, matrix[1][1]=11",
              explanation: "mid = 0 + (11-0)/2 = 5. Map to matrix: row=5/4=1, col=5%4=1. matrix[1][1]=11. Compare 11 vs target 3.",
              variables: { lo: 0, hi: 11, mid: 5, row: 1, col: 1, val: 11, target: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "active", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 5, color: "active" },
                  { name: "hi", index: 11, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 5,
                bsRight: 11,
                bsCondition: "matrix[1][1]=11 > target=3",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [13, 14],
              shortLabel: "11 > 3 → search left, hi=4",
              explanation: "11 > 3. Target must be in the left half. Set hi = mid - 1 = 4. Eliminated virtual indices 5..11 (the bottom two rows).",
              variables: { lo: 0, hi: 4, mid: 5, val: 11, target: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 4, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 5,
                bsRight: 4,
                bsCondition: "11 > 3 → search left",
              },
              delta: { changedIndices: [5, 6, 7, 8, 9, 10, 11], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "mid=2, matrix[0][2]=5",
              explanation: "lo=0, hi=4. mid = 0 + (4-0)/2 = 2. Map: row=2/4=0, col=2%4=2. matrix[0][2]=5. Compare 5 vs target 3.",
              variables: { lo: 0, hi: 4, mid: 2, row: 0, col: 2, val: 5, target: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default", 4: "default", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 2, color: "active" },
                  { name: "hi", index: 4, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 2,
                bsRight: 4,
                bsCondition: "matrix[0][2]=5 > target=3",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13, 14],
              shortLabel: "5 > 3 → search left, hi=1",
              explanation: "5 > 3. Search left half. Set hi = mid - 1 = 1. Now only indices 0 and 1 remain.",
              variables: { lo: 0, hi: 1, mid: 2, val: 5, target: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 1, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 2,
                bsRight: 1,
                bsCondition: "5 > 3 → search left",
              },
              delta: { changedIndices: [2, 3, 4], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7],
              shortLabel: "mid=0, matrix[0][0]=1",
              explanation: "lo=0, hi=1. mid = 0 + (1-0)/2 = 0. matrix[0][0]=1. Compare 1 vs target 3.",
              variables: { lo: 0, hi: 1, mid: 0, row: 0, col: 0, val: 1, target: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 0, color: "active" },
                  { name: "hi", index: 1, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 0,
                bsRight: 1,
                bsCondition: "matrix[0][0]=1 < target=3",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12],
              shortLabel: "1 < 3 → search right, lo=1",
              explanation: "1 < 3. Search right half. Set lo = mid + 1 = 1. Now lo=1, hi=1 — one element left.",
              variables: { lo: 1, hi: 1, mid: 0, val: 1, target: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "default", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [
                  { name: "lo", index: 1, color: "pointer" },
                  { name: "hi", index: 1, color: "pointer" },
                ],
                bsLeft: 1,
                bsMid: 0,
                bsRight: 1,
                bsCondition: "1 < 3 → search right",
              },
              delta: { changedIndices: [0], movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 6, 7],
              shortLabel: "mid=1, matrix[0][1]=3",
              explanation: "lo=1, hi=1. mid=1. Map: row=1/4=0, col=1%4=1. matrix[0][1]=3. Compare 3 vs target 3.",
              variables: { lo: 1, hi: 1, mid: 1, row: 0, col: 1, val: 3, target: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [
                  { name: "lo", index: 1, color: "pointer" },
                  { name: "mid", index: 1, color: "active" },
                  { name: "hi", index: 1, color: "pointer" },
                ],
                bsLeft: 1,
                bsMid: 1,
                bsRight: 1,
                bsCondition: "matrix[0][1]=3 == target=3",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [9, 10],
              shortLabel: "3 == 3 → Found! Return true",
              explanation: "matrix[0][1]=3 equals target 3. Found it! Return true. Binary search on 12 elements took just 4 comparisons.",
              variables: { lo: 1, hi: 1, mid: 1, val: 3, target: 3, answer: "true" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "found", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [{ name: "mid", index: 1, color: "active" }],
                bsLeft: 1,
                bsMid: 1,
                bsRight: 1,
                bsCondition: "matrix[0][1]=3 == target=3 → FOUND",
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Not Found",
          description: "Target 13 falls between rows — doesn't exist in matrix",
          input: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 13 },
          expectedOutput: "false",
          commonMistake: "Some try to binary search row-by-row separately, missing the fact that the entire matrix can be treated as one sorted array. Others forget the index mapping formula and try to search rows and columns independently.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init lo=0, hi=11",
              explanation: "3x4 matrix = 12 elements. lo=0, hi=11. Searching for target=13 which sits between 11 (index 5) and 16 (index 6).",
              variables: { m: 3, n: 4, lo: 0, hi: 11, target: 13 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 11, color: "pointer" },
                ],
                bsLeft: 0, bsMid: null, bsRight: 11, bsCondition: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "mid=5, val=11",
              explanation: "mid=5. matrix[1][1]=11. Compare 11 vs 13.",
              variables: { lo: 0, hi: 11, mid: 5, row: 1, col: 1, val: 11, target: 13 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "active", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 5, color: "active" },
                  { name: "hi", index: 11, color: "pointer" },
                ],
                bsLeft: 0, bsMid: 5, bsRight: 11, bsCondition: "11 < target=13",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "11 < 13 → lo=6",
              explanation: "11 < 13. Search right. lo = 6.",
              variables: { lo: 6, hi: 11, mid: 5, val: 11, target: 13 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [
                  { name: "lo", index: 6, color: "pointer" },
                  { name: "hi", index: 11, color: "pointer" },
                ],
                bsLeft: 6, bsMid: 5, bsRight: 11, bsCondition: "11 < 13 → search right",
              },
              delta: { changedIndices: [0, 1, 2, 3, 4, 5], movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "mid=8, val=23",
              explanation: "mid=8. matrix[2][0]=23. Compare 23 vs 13.",
              variables: { lo: 6, hi: 11, mid: 8, row: 2, col: 0, val: 23, target: 13 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "default", 7: "default", 8: "active", 9: "default", 10: "default", 11: "default" },
                pointers: [
                  { name: "lo", index: 6, color: "pointer" },
                  { name: "mid", index: 8, color: "active" },
                  { name: "hi", index: 11, color: "pointer" },
                ],
                bsLeft: 6, bsMid: 8, bsRight: 11, bsCondition: "23 > target=13",
              },
              delta: { changedIndices: [8] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13, 14],
              shortLabel: "23 > 13 → hi=7",
              explanation: "23 > 13. Search left. hi = 7. Now lo=6, hi=7 — just indices 6 and 7 remain (values 16, 20).",
              variables: { lo: 6, hi: 7, mid: 8, val: 23, target: 13 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "default", 7: "default", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [
                  { name: "lo", index: 6, color: "pointer" },
                  { name: "hi", index: 7, color: "pointer" },
                ],
                bsLeft: 6, bsMid: 8, bsRight: 7, bsCondition: "23 > 13 → search left",
              },
              delta: { changedIndices: [8, 9, 10, 11], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7],
              shortLabel: "mid=6, val=16",
              explanation: "mid=6. matrix[1][2]=16. Compare 16 vs 13.",
              variables: { lo: 6, hi: 7, mid: 6, row: 1, col: 2, val: 16, target: 13 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "active", 7: "default", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [
                  { name: "lo", index: 6, color: "pointer" },
                  { name: "mid", index: 6, color: "active" },
                  { name: "hi", index: 7, color: "pointer" },
                ],
                bsLeft: 6, bsMid: 6, bsRight: 7, bsCondition: "16 > target=13",
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13, 14],
              shortLabel: "16 > 13 → hi=5, lo > hi",
              explanation: "16 > 13. hi = mid - 1 = 5. Now lo=6 > hi=5. Search range is empty — 13 does not exist in the matrix.",
              variables: { lo: 6, hi: 5, target: 13 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [],
                bsLeft: 6, bsMid: 6, bsRight: 5, bsCondition: "lo=6 > hi=5 → range empty",
              },
              delta: { changedIndices: [6], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [17],
              shortLabel: "Return false",
              explanation: "Loop exited because lo > hi. Target 13 falls between 11 and 16 but doesn't exist in the matrix. Return false.",
              variables: { lo: 6, hi: 5, target: 13, answer: "false" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated", 11: "eliminated" },
                pointers: [],
                bsLeft: 6, bsMid: null, bsRight: 5, bsCondition: "Target 13 not in matrix",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ matrix, target }) {
        const steps = [];
        const m = matrix.length;
        const n = matrix[0].length;
        const total = m * n;
        let lo = 0, hi = total - 1;
        const eliminated = new Set();

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `Init lo=0, hi=${hi}`,
          explanation: `Matrix is ${m}x${n} = ${total} elements. lo=0, hi=${hi}. Searching for target=${target}.`,
          variables: { m, n, lo: 0, hi, target },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: total }, (_, i) => [i, "default"])),
            pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "hi", index: hi, color: "pointer" }],
            bsLeft: 0, bsMid: null, bsRight: hi, bsCondition: null,
          },
          delta: {}, isAnswer: false,
        });

        while (lo <= hi) {
          const mid = lo + Math.floor((hi - lo) / 2);
          const row = Math.floor(mid / n);
          const col = mid % n;
          const val = matrix[row][col];

          const buildStates = (activeIdx) => {
            const s = {};
            for (let i = 0; i < total; i++) {
              s[i] = eliminated.has(i) ? "eliminated" : i === activeIdx ? "active" : "default";
            }
            return s;
          };

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6, 7],
            shortLabel: `mid=${mid}, matrix[${row}][${col}]=${val}`,
            explanation: `mid=${mid}. Map: row=${mid}/${n}=${row}, col=${mid}%${n}=${col}. matrix[${row}][${col}]=${val}. Compare ${val} vs target ${target}.`,
            variables: { lo, hi, mid, row, col, val, target },
            dataStructure: {
              arrayStates: buildStates(mid),
              pointers: [
                { name: "lo", index: lo, color: "pointer" },
                { name: "mid", index: mid, color: "active" },
                { name: "hi", index: hi, color: "pointer" },
              ],
              bsLeft: lo, bsMid: mid, bsRight: hi,
              bsCondition: val === target ? `${val} == target=${target}` : val < target ? `${val} < target=${target}` : `${val} > target=${target}`,
            },
            delta: { changedIndices: [mid] }, isAnswer: false,
          });

          if (val === target) {
            const foundStates = {};
            for (let i = 0; i < total; i++) foundStates[i] = eliminated.has(i) ? "eliminated" : i === mid ? "found" : "default";
            steps.push({
              stepId: steps.length, lineNumbers: [9, 10],
              shortLabel: `${val} == ${target} → Found! Return true`,
              explanation: `matrix[${row}][${col}]=${val} equals target ${target}. Found! Return true.`,
              variables: { lo, hi, mid, val, target, answer: "true" },
              dataStructure: {
                arrayStates: foundStates,
                pointers: [{ name: "mid", index: mid, color: "active" }],
                bsLeft: lo, bsMid: mid, bsRight: hi, bsCondition: `${val} == ${target} → FOUND`,
              },
              delta: { changedIndices: [mid] }, isAnswer: true,
            });
            return steps;
          } else if (val < target) {
            for (let k = lo; k <= mid; k++) eliminated.add(k);
            lo = mid + 1;
            steps.push({
              stepId: steps.length, lineNumbers: [11, 12],
              shortLabel: `${val} < ${target} → lo=${lo}`,
              explanation: `${val} < ${target}. Search right half. lo = ${lo}.`,
              variables: { lo, hi, mid, val, target },
              dataStructure: {
                arrayStates: (() => { const s = {}; for (let i = 0; i < total; i++) s[i] = eliminated.has(i) ? "eliminated" : "default"; return s; })(),
                pointers: lo <= hi ? [{ name: "lo", index: lo, color: "pointer" }, { name: "hi", index: hi, color: "pointer" }] : [],
                bsLeft: lo, bsMid: mid, bsRight: hi, bsCondition: `${val} < ${target} → search right`,
              },
              delta: { movedPointers: ["lo"] }, isAnswer: false,
            });
          } else {
            for (let k = mid; k <= hi; k++) eliminated.add(k);
            hi = mid - 1;
            steps.push({
              stepId: steps.length, lineNumbers: [13, 14],
              shortLabel: `${val} > ${target} → hi=${hi}`,
              explanation: `${val} > ${target}. Search left half. hi = ${hi}.`,
              variables: { lo, hi, mid, val, target },
              dataStructure: {
                arrayStates: (() => { const s = {}; for (let i = 0; i < total; i++) s[i] = eliminated.has(i) ? "eliminated" : "default"; return s; })(),
                pointers: lo <= hi ? [{ name: "lo", index: lo, color: "pointer" }, { name: "hi", index: hi, color: "pointer" }] : [],
                bsLeft: lo, bsMid: mid, bsRight: hi, bsCondition: `${val} > ${target} → search left`,
              },
              delta: { movedPointers: ["hi"] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [17],
          shortLabel: "Return false",
          explanation: `lo (${lo}) > hi (${hi}). Search exhausted. Target ${target} not in matrix. Return false.`,
          variables: { lo, hi, target, answer: "false" },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: total }, (_, i) => [i, "eliminated"])),
            pointers: [],
            bsLeft: lo, bsMid: null, bsRight: hi, bsCondition: `Target ${target} not in matrix`,
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(m * n)", space: "O(1)", explanation: "Scan every cell in the matrix" },
    optimal: { time: "O(log(m * n))", space: "O(1)", explanation: "Single binary search over m*n virtual elements; each comparison halves the search space", tradeoff: "No extra space needed — pure index arithmetic replaces physical flattening" },
  },

  interviewTips: [
    "Immediately recognize: sorted rows + first-of-row > last-of-prev-row = one sorted sequence.",
    "State the index mapping formula: row = idx / cols, col = idx % cols.",
    "Mention that O(log(m*n)) = O(log m + log n) — same asymptotic complexity as two separate binary searches.",
    "Ask: 'Are all elements distinct?' — the problem guarantees sorted but not uniqueness in general.",
    "An alternative two-step approach: binary search on rows, then binary search within a row. Same complexity but harder to code.",
    "Use lo + (hi - lo) / 2 to avoid integer overflow.",
  ],

  relatedProblems: ["binary-search", "search-rotated-array", "koko-eating-bananas"],
};
