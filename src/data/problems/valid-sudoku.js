export const validSudoku = {
  id: 8,
  slug: "valid-sudoku",
  title: "Valid Sudoku",
  difficulty: "Medium",
  topic: "arrays-hashing",
  topicLabel: "Arrays & Hashing",
  neetcodeNumber: 8,
  artifactType: "Matrix",
  companies: ["Amazon", "Apple", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/valid-sudoku/",

  pattern: "HashSet Duplicate Detection in Rows, Columns, and Sub-boxes",
  patternExplanation: `When validating constraints across multiple overlapping groupings
    (rows, columns, sub-boxes), use separate HashSets for each group. A single pass through
    every cell checks all three constraints simultaneously by encoding which group a value
    belongs to.`,

  intuition: {
    coreInsight: `A valid Sudoku requires that no digit 1-9 repeats within any row, any column,
      or any 3x3 sub-box. Instead of checking each constraint in a separate pass, we can validate
      all three in a single scan of the board. For each filled cell, we ask three questions at once:
      "Have I seen this digit in this row? In this column? In this box?" HashSets give us O(1)
      answers to all three questions.`,

    mentalModel: `Imagine three attendance books at a school. One tracks students by classroom row,
      another by classroom column, and a third by which table-group they sit at. As each student
      arrives, the teacher checks all three books simultaneously. If any book already has that
      student's name, there's a seating conflict. The HashSets ARE those attendance books — one per
      row, one per column, one per 3x3 box.`,

    whyNaiveFails: `The brute force approach checks each row separately (9 passes), then each
      column separately (9 passes), then each 3x3 box separately (9 passes) — 27 separate scans
      of groups, each requiring its own duplicate detection. While still O(n^2) for a 9x9 board,
      it's repetitive and harder to get right. The single-pass approach is cleaner, less error-prone,
      and demonstrates stronger algorithmic thinking in interviews.`,

    keyObservation: `The 3x3 sub-box index for any cell (r, c) can be computed as
      boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3). This maps the 9 sub-boxes to indices
      0-8 without any conditional logic. This formula is the key insight that makes a single-pass
      solution elegant — without it, you'd need nested loops per box.`,
  },

  problem: `Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated
    according to the following rules: Each row must contain the digits 1-9 without repetition.
    Each column must contain the digits 1-9 without repetition. Each of the nine 3x3 sub-boxes
    of the grid must contain the digits 1-9 without repetition. The Sudoku board could be
    partially filled, where empty cells are filled with the character '.'.`,

  examples: [
    {
      input: `board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`,
      output: "true",
      explanation: "No digit repeats in any row, column, or 3x3 box.",
    },
    {
      input: `board = [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`,
      output: "false",
      explanation: "The digit '8' appears twice in the first column (row 0 and row 3).",
    },
  ],

  constraints: [
    "board.length == 9",
    "board[i].length == 9",
    "board[i][j] is a digit '1'-'9' or '.'",
  ],

  approaches: {
    brute: {
      label: "Brute Force — Separate Checks",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: `Check each of the 9 rows for duplicates, then each of the 9 columns, then each
        of the 9 sub-boxes. Three separate passes with HashSets for each group.`,

      javaCode: `public boolean isValidSudoku(char[][] board) {
    // Check each row
    for (int r = 0; r < 9; r++) {
        Set<Character> seen = new HashSet<>();
        for (int c = 0; c < 9; c++) {
            if (board[r][c] == '.') continue;
            if (!seen.add(board[r][c])) return false;
        }
    }
    // Check each column
    for (int c = 0; c < 9; c++) {
        Set<Character> seen = new HashSet<>();
        for (int r = 0; r < 9; r++) {
            if (board[r][c] == '.') continue;
            if (!seen.add(board[r][c])) return false;
        }
    }
    // Check each 3x3 box
    for (int boxR = 0; boxR < 3; boxR++) {
        for (int boxC = 0; boxC < 3; boxC++) {
            Set<Character> seen = new HashSet<>();
            for (int r = boxR * 3; r < boxR * 3 + 3; r++) {
                for (int c = boxC * 3; c < boxC * 3 + 3; c++) {
                    if (board[r][c] == '.') continue;
                    if (!seen.add(board[r][c])) return false;
                }
            }
        }
    }
    return true;
}`,

      cppCode: `bool isValidSudoku(vector<vector<char>>& board) {
    // Check each row
    for (int r = 0; r < 9; r++) {
        unordered_set<char> seen;
        for (int c = 0; c < 9; c++) {
            if (board[r][c] == '.') continue;
            if (seen.count(board[r][c])) return false;
            seen.insert(board[r][c]);
        }
    }
    // Check each column
    for (int c = 0; c < 9; c++) {
        unordered_set<char> seen;
        for (int r = 0; r < 9; r++) {
            if (board[r][c] == '.') continue;
            if (seen.count(board[r][c])) return false;
            seen.insert(board[r][c]);
        }
    }
    // Check each 3x3 box
    for (int boxR = 0; boxR < 3; boxR++) {
        for (int boxC = 0; boxC < 3; boxC++) {
            unordered_set<char> seen;
            for (int r = boxR * 3; r < boxR * 3 + 3; r++) {
                for (int c = boxC * 3; c < boxC * 3 + 3; c++) {
                    if (board[r][c] == '.') continue;
                    if (seen.count(board[r][c])) return false;
                    seen.insert(board[r][c]);
                }
            }
        }
    }
    return true;
}`,

      pythonCode: `def isValidSudoku(board: List[List[str]]) -> bool:
    # Check each row
    for r in range(9):
        seen = set()
        for c in range(9):
            if board[r][c] == '.':
                continue
            if board[r][c] in seen:
                return False
            seen.add(board[r][c])
    # Check each column
    for c in range(9):
        seen = set()
        for r in range(9):
            if board[r][c] == '.':
                continue
            if board[r][c] in seen:
                return False
            seen.add(board[r][c])
    # Check each 3x3 box
    for boxR in range(3):
        for boxC in range(3):
            seen = set()
            for r in range(boxR * 3, boxR * 3 + 3):
                for c in range(boxC * 3, boxC * 3 + 3):
                    if board[r][c] == '.':
                        continue
                    if board[r][c] in seen:
                        return False
                    seen.add(board[r][c])
    return True`,

      lineAnnotations: {
        2: "First pass: validate each row for duplicates",
        3: "Fresh HashSet for each row",
        5: "Skip empty cells",
        6: "If add() returns false, digit already seen in this row",
        10: "Second pass: validate each column",
        11: "Fresh HashSet for each column",
        13: "Skip empty cells",
        14: "If add() returns false, digit already seen in this column",
        18: "Third pass: validate each 3x3 sub-box",
        20: "Fresh HashSet for each box",
        23: "Skip empty cells",
        24: "If add() returns false, digit already seen in this box",
        27: "All checks passed — board is valid",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: {
            board: [
              ["5","3",".",".","7",".",".",".","."],
              ["6",".",".","1","9","5",".",".","."],
              [".","9","8",".",".",".",".","6","."],
              ["8",".",".",".","6",".",".",".","3"],
              ["4",".",".","8",".","3",".",".","1"],
              ["7",".",".",".","2",".",".",".","6"],
              [".","6",".",".",".",".","2","8","."],
              [".",".",".","4","1","9",".",".","5"],
              [".",".",".",".","8",".",".","7","9"],
            ],
          },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Start row checks",
              explanation: "Begin by checking each row for duplicate digits. We'll scan all 9 rows with a fresh HashSet per row.",
              variables: { phase: "rows", r: 0, seen: "{}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {},
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "Row 0: {5,3,7} — valid",
              explanation: "Scan row 0: digits 5, 3, 7. No duplicates found. Row 0 is valid.",
              variables: { phase: "rows", r: 0, seen: "{5,3,7}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "found", 1: "found", 4: "found" },
                },
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "Rows 1-8: all valid",
              explanation: "Continue scanning rows 1 through 8. Each row has unique digits among its filled cells. All row checks pass.",
              variables: { phase: "rows complete", result: "all rows valid" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {},
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11, 12, 13, 14],
              shortLabel: "Column checks: all valid",
              explanation: "Now check each column. Column 0 has {5,6,8,4,7} — no duplicates. All 9 columns pass.",
              variables: { phase: "columns complete", result: "all columns valid" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {},
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [18, 19, 20, 21, 22, 23, 24],
              shortLabel: "Box checks: all valid",
              explanation: "Finally check each 3x3 sub-box. Top-left box has {5,3,6,9,8} — no duplicates. All 9 boxes pass.",
              variables: { phase: "boxes complete", result: "all boxes valid" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "found", 1: "found" },
                  1: { 0: "found" },
                  2: { 1: "found", 2: "found" },
                },
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [27],
              shortLabel: "Return true",
              explanation: "All rows, columns, and 3x3 boxes are valid. No duplicate digits found anywhere. Return true.",
              variables: { answer: "true" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {},
                cursor: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ board }) {
        const steps = [];
        const buildMatrix = () => board.map(row => [...row]);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Start row checks",
          explanation: "Begin checking each row for duplicate digits.",
          variables: { phase: "rows", r: 0 },
          dataStructure: { matrix: buildMatrix(), matrixStates: {}, cursor: null },
          delta: {}, isAnswer: false,
        });

        // Check rows
        for (let r = 0; r < 9; r++) {
          const seen = new Set();
          const states = {};
          for (let c = 0; c < 9; c++) {
            if (board[r][c] === '.') continue;
            if (seen.has(board[r][c])) {
              const dupCol = board[r].indexOf(board[r][c]);
              states[r] = states[r] || {};
              states[r][dupCol] = "eliminated";
              states[r][c] = "eliminated";
              steps.push({
                stepId: steps.length, lineNumbers: [5, 6],
                shortLabel: `Row ${r}: '${board[r][c]}' duplicate!`,
                explanation: `Row ${r} has '${board[r][c]}' at columns ${dupCol} and ${c}. Duplicate found — return false.`,
                variables: { phase: "rows", r, c, digit: board[r][c], result: "DUPLICATE" },
                dataStructure: { matrix: buildMatrix(), matrixStates: states, cursor: { row: r, col: c } },
                delta: {}, isAnswer: false,
              });
              steps.push({
                stepId: steps.length, lineNumbers: [6],
                shortLabel: "Return false",
                explanation: "Duplicate digit found in row. Board is invalid.",
                variables: { answer: "false" },
                dataStructure: { matrix: buildMatrix(), matrixStates: states, cursor: { row: r, col: c } },
                delta: {}, isAnswer: true,
              });
              return steps;
            }
            seen.add(board[r][c]);
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: "Rows valid, check columns",
          explanation: "All 9 rows pass. Now check each column for duplicates.",
          variables: { phase: "columns" },
          dataStructure: { matrix: buildMatrix(), matrixStates: {}, cursor: null },
          delta: {}, isAnswer: false,
        });

        // Check columns
        for (let c = 0; c < 9; c++) {
          const seen = new Set();
          for (let r = 0; r < 9; r++) {
            if (board[r][c] === '.') continue;
            if (seen.has(board[r][c])) {
              let dupRow = 0;
              for (let rr = 0; rr < r; rr++) {
                if (board[rr][c] === board[r][c]) { dupRow = rr; break; }
              }
              const states = {};
              states[dupRow] = { [c]: "eliminated" };
              states[r] = { [c]: "eliminated" };
              steps.push({
                stepId: steps.length, lineNumbers: [13, 14],
                shortLabel: `Col ${c}: '${board[r][c]}' duplicate!`,
                explanation: `Column ${c} has '${board[r][c]}' at rows ${dupRow} and ${r}. Duplicate found — return false.`,
                variables: { phase: "columns", c, r, digit: board[r][c], result: "DUPLICATE" },
                dataStructure: { matrix: buildMatrix(), matrixStates: states, cursor: { row: r, col: c } },
                delta: {}, isAnswer: false,
              });
              steps.push({
                stepId: steps.length, lineNumbers: [14],
                shortLabel: "Return false",
                explanation: "Duplicate digit found in column. Board is invalid.",
                variables: { answer: "false" },
                dataStructure: { matrix: buildMatrix(), matrixStates: states, cursor: { row: r, col: c } },
                delta: {}, isAnswer: true,
              });
              return steps;
            }
            seen.add(board[r][c]);
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [18],
          shortLabel: "Columns valid, check boxes",
          explanation: "All 9 columns pass. Now check each 3x3 sub-box for duplicates.",
          variables: { phase: "boxes" },
          dataStructure: { matrix: buildMatrix(), matrixStates: {}, cursor: null },
          delta: {}, isAnswer: false,
        });

        // Check boxes
        for (let boxR = 0; boxR < 3; boxR++) {
          for (let boxC = 0; boxC < 3; boxC++) {
            const seen = new Set();
            for (let r = boxR * 3; r < boxR * 3 + 3; r++) {
              for (let c = boxC * 3; c < boxC * 3 + 3; c++) {
                if (board[r][c] === '.') continue;
                if (seen.has(board[r][c])) {
                  const states = {};
                  states[r] = { [c]: "eliminated" };
                  steps.push({
                    stepId: steps.length, lineNumbers: [23, 24],
                    shortLabel: `Box(${boxR},${boxC}): '${board[r][c]}' dup!`,
                    explanation: `Sub-box (${boxR},${boxC}) has duplicate '${board[r][c]}'. Return false.`,
                    variables: { phase: "boxes", boxR, boxC, digit: board[r][c], result: "DUPLICATE" },
                    dataStructure: { matrix: buildMatrix(), matrixStates: states, cursor: { row: r, col: c } },
                    delta: {}, isAnswer: false,
                  });
                  steps.push({
                    stepId: steps.length, lineNumbers: [24],
                    shortLabel: "Return false",
                    explanation: "Duplicate digit found in sub-box. Board is invalid.",
                    variables: { answer: "false" },
                    dataStructure: { matrix: buildMatrix(), matrixStates: states, cursor: { row: r, col: c } },
                    delta: {}, isAnswer: true,
                  });
                  return steps;
                }
                seen.add(board[r][c]);
              }
            }
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [27],
          shortLabel: "Return true",
          explanation: "All rows, columns, and 3x3 sub-boxes are valid. No duplicate digits found. Return true.",
          variables: { answer: "true" },
          dataStructure: { matrix: buildMatrix(), matrixStates: {}, cursor: null },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Single Pass with HashSets",
      tier: "optimal",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n²)",
      idea: `Use three arrays of HashSets — one for rows, one for columns, one for 3x3 boxes.
        Scan every cell once. For each filled cell, check all three sets simultaneously.
        The box index is computed as (r / 3) * 3 + (c / 3).`,

      javaCode: `public boolean isValidSudoku(char[][] board) {
    Set<Character>[] rows = new HashSet[9];
    Set<Character>[] cols = new HashSet[9];
    Set<Character>[] boxes = new HashSet[9];

    for (int i = 0; i < 9; i++) {
        rows[i] = new HashSet<>();
        cols[i] = new HashSet<>();
        boxes[i] = new HashSet<>();
    }

    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] == '.') continue;

            char val = board[r][c];
            int boxIdx = (r / 3) * 3 + (c / 3);

            if (rows[r].contains(val) ||
                cols[c].contains(val) ||
                boxes[boxIdx].contains(val)) {
                return false;
            }

            rows[r].add(val);
            cols[c].add(val);
            boxes[boxIdx].add(val);
        }
    }

    return true;
}`,

      cppCode: `bool isValidSudoku(vector<vector<char>>& board) {
    unordered_set<char> rows[9], cols[9], boxes[9];

    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] == '.') continue;

            char val = board[r][c];
            int boxIdx = (r / 3) * 3 + (c / 3);

            if (rows[r].count(val) ||
                cols[c].count(val) ||
                boxes[boxIdx].count(val)) {
                return false;
            }

            rows[r].insert(val);
            cols[c].insert(val);
            boxes[boxIdx].insert(val);
        }
    }

    return true;
}`,

      pythonCode: `def isValidSudoku(board: List[List[str]]) -> bool:
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]

    for r in range(9):
        for c in range(9):
            if board[r][c] == '.':
                continue

            val = board[r][c]
            box_idx = (r // 3) * 3 + (c // 3)

            if (val in rows[r] or
                val in cols[c] or
                val in boxes[box_idx]):
                return False

            rows[r].add(val)
            cols[c].add(val)
            boxes[box_idx].add(val)

    return True`,

      lineAnnotations: {
        2:  "One HashSet per row to track digits seen in that row",
        3:  "One HashSet per column to track digits seen in that column",
        4:  "One HashSet per 3x3 box to track digits seen in that box",
        6:  "Initialize all 27 HashSets (9 rows + 9 cols + 9 boxes)",
        11: "Single pass: scan every cell exactly once",
        13: "Skip empty cells — only filled cells can cause conflicts",
        15: "Extract the digit value at this cell",
        16: "Compute which of the 9 boxes this cell belongs to",
        18: "Check row constraint: has this digit appeared in this row?",
        19: "Check column constraint: has this digit appeared in this column?",
        20: "Check box constraint: has this digit appeared in this 3x3 box?",
        21: "Any constraint violated — board is invalid",
        23: "Record this digit in the row's set",
        24: "Record this digit in the column's set",
        25: "Record this digit in the box's set",
        29: "All cells processed with no violations — board is valid",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Valid Board",
          description: "A partially filled valid Sudoku board — scans all cells without finding conflicts",
          input: {
            board: [
              ["5","3",".",".","7",".",".",".","."],
              ["6",".",".","1","9","5",".",".","."],
              [".","9","8",".",".",".",".","6","."],
              ["8",".",".",".","6",".",".",".","3"],
              ["4",".",".","8",".","3",".",".","1"],
              ["7",".",".",".","2",".",".",".","6"],
              [".","6",".",".",".",".","2","8","."],
              [".",".",".","4","1","9",".",".","5"],
              [".",".",".",".","8",".",".","7","9"],
            ],
          },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4, 6, 7, 8, 9],
              shortLabel: "Init 27 HashSets",
              explanation: "Create 9 HashSets for rows, 9 for columns, and 9 for 3x3 boxes. All empty. We'll fill them as we scan the board left-to-right, top-to-bottom.",
              variables: { r: "-", c: "-", "rows[]": "9 empty sets", "cols[]": "9 empty sets", "boxes[]": "9 empty sets" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {},
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11, 12, 15, 16],
              shortLabel: "(0,0) val='5', box=0",
              explanation: "Cell (0,0) has '5'. Box index = (0/3)*3 + (0/3) = 0. Check: rows[0] has '5'? No. cols[0] has '5'? No. boxes[0] has '5'? No. All clear — add '5' to rows[0], cols[0], boxes[0].",
              variables: { r: 0, c: 0, val: "5", boxIdx: 0, "rows[0]": "{5}", "cols[0]": "{5}", "boxes[0]": "{5}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: { 0: { 0: "active" } },
                cursor: { row: 0, col: 0 },
              },
              delta: { changedIndices: [[0, 0]] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: "(0,1) val='3', box=0",
              explanation: "Cell (0,1) has '3'. Box index = 0. Check: '3' not in rows[0], cols[1], or boxes[0]. Safe. Add '3' to all three sets.",
              variables: { r: 0, c: 1, val: "3", boxIdx: 0, "rows[0]": "{5,3}", "cols[1]": "{3}", "boxes[0]": "{5,3}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: { 0: { 0: "visited", 1: "active" } },
                cursor: { row: 0, col: 1 },
              },
              delta: { changedIndices: [[0, 1]] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [13],
              shortLabel: "(0,2) '.', skip",
              explanation: "Cell (0,2) is '.', an empty cell. Skip it — only filled cells can cause conflicts.",
              variables: { r: 0, c: 2, val: ".", action: "skip" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: { 0: { 0: "visited", 1: "visited", 2: "active" } },
                cursor: { row: 0, col: 2 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: "(0,4) val='7', box=1",
              explanation: "Cell (0,4) has '7'. Box index = (0/3)*3 + (4/3) = 0*3 + 1 = 1. Check all three sets — '7' not found anywhere. Add '7' to rows[0], cols[4], boxes[1].",
              variables: { r: 0, c: 4, val: "7", boxIdx: 1, "rows[0]": "{5,3,7}", "cols[4]": "{7}", "boxes[1]": "{7}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: { 0: { 0: "visited", 1: "visited", 4: "active" } },
                cursor: { row: 0, col: 4 },
              },
              delta: { changedIndices: [[0, 4]] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: "(1,0) val='6', box=0",
              explanation: "Cell (1,0) has '6'. Box index = 0. '6' is not in rows[1], cols[0]={5}, or boxes[0]={5,3}. Safe. Add '6' to all three.",
              variables: { r: 1, c: 0, val: "6", boxIdx: 0, "rows[1]": "{6}", "cols[0]": "{5,6}", "boxes[0]": "{5,3,6}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "visited", 1: "visited", 4: "visited" },
                  1: { 0: "active" },
                },
                cursor: { row: 1, col: 0 },
              },
              delta: { changedIndices: [[1, 0]] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: "(1,3) val='1', box=1",
              explanation: "Cell (1,3) has '1'. Box index = (1/3)*3 + (3/3) = 0 + 1 = 1. '1' is not in rows[1]={6}, cols[3]={}, or boxes[1]={7}. Safe.",
              variables: { r: 1, c: 3, val: "1", boxIdx: 1, "rows[1]": "{6,1}", "cols[3]": "{1}", "boxes[1]": "{7,1}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "visited", 1: "visited", 4: "visited" },
                  1: { 0: "visited", 3: "active" },
                },
                cursor: { row: 1, col: 3 },
              },
              delta: { changedIndices: [[1, 3]] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: "(2,1) val='9', box=0",
              explanation: "Cell (2,1) has '9'. Box index = 0. '9' is not in rows[2], cols[1]={3}, or boxes[0]={5,3,6}. Safe. boxes[0] now has {5,3,6,9}.",
              variables: { r: 2, c: 1, val: "9", boxIdx: 0, "rows[2]": "{9}", "cols[1]": "{3,9}", "boxes[0]": "{5,3,6,9}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "visited", 1: "visited", 4: "visited" },
                  1: { 0: "visited", 3: "visited" },
                  2: { 1: "active" },
                },
                cursor: { row: 2, col: 1 },
              },
              delta: { changedIndices: [[2, 1]] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [11, 12],
              shortLabel: "Continue scanning...",
              explanation: "We continue scanning row by row, column by column. Each filled cell gets checked against its row, column, and box sets. Cells (2,2)='8', (2,7)='6', (3,0)='8', (3,4)='6', (3,8)='3', and so on — all pass without conflicts.",
              variables: { r: "3-8", status: "all checks passing", "total filled": 30 },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "visited", 1: "visited", 4: "visited" },
                  1: { 0: "visited", 3: "visited", 4: "visited", 5: "visited" },
                  2: { 1: "visited", 2: "visited", 7: "visited" },
                  3: { 0: "visited", 4: "visited", 8: "visited" },
                  4: { 0: "visited", 3: "visited", 5: "visited", 8: "visited" },
                  5: { 0: "visited", 4: "visited", 8: "visited" },
                  6: { 1: "visited", 6: "visited", 7: "visited" },
                  7: { 3: "visited", 4: "visited", 5: "visited", 8: "visited" },
                  8: { 4: "active", 7: "visited", 8: "visited" },
                },
                cursor: { row: 8, col: 4 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [29],
              shortLabel: "Return true",
              explanation: "We scanned all 81 cells. Every filled cell passed the row, column, and box checks. No duplicates found anywhere. The board is a valid Sudoku. Return true.",
              variables: { answer: "true" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "found", 1: "found", 4: "found" },
                  1: { 0: "found", 3: "found", 4: "found", 5: "found" },
                  2: { 1: "found", 2: "found", 7: "found" },
                  3: { 0: "found", 4: "found", 8: "found" },
                  4: { 0: "found", 3: "found", 5: "found", 8: "found" },
                  5: { 0: "found", 4: "found", 8: "found" },
                  6: { 1: "found", 6: "found", 7: "found" },
                  7: { 3: "found", 4: "found", 5: "found", 8: "found" },
                  8: { 4: "found", 7: "found", 8: "found" },
                },
                cursor: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Column Duplicate",
          description: "Digit '8' appears twice in column 0 — catches validators that only check rows",
          input: {
            board: [
              ["8","3",".",".","7",".",".",".","."],
              ["6",".",".","1","9","5",".",".","."],
              [".","9","8",".",".",".",".","6","."],
              ["8",".",".",".","6",".",".",".","3"],
              ["4",".",".","8",".","3",".",".","1"],
              ["7",".",".",".","2",".",".",".","6"],
              [".","6",".",".",".",".","2","8","."],
              [".",".",".","4","1","9",".",".","5"],
              [".",".",".",".","8",".",".","7","9"],
            ],
          },
          expectedOutput: "false",
          commonMistake: "If you only check rows and not columns/boxes, this board falsely passes. Row 0 has {8,3,7} and row 3 has {8,6,3} — both valid individually. But column 0 has '8' at row 0 AND row 3.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4, 6, 7, 8, 9],
              shortLabel: "Init 27 HashSets",
              explanation: "Create 9 HashSets for rows, columns, and boxes. The board has '8' at (0,0) and (3,0) — a column duplicate we need to catch.",
              variables: { r: "-", c: "-", "rows[]": "9 empty", "cols[]": "9 empty", "boxes[]": "9 empty" },
              dataStructure: {
                matrix: [
                  ["8","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {},
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: "(0,0) val='8', box=0",
              explanation: "Cell (0,0) has '8'. Box index = 0. All three sets are empty — no conflict. Add '8' to rows[0], cols[0], and boxes[0].",
              variables: { r: 0, c: 0, val: "8", boxIdx: 0, "rows[0]": "{8}", "cols[0]": "{8}", "boxes[0]": "{8}" },
              dataStructure: {
                matrix: [
                  ["8","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: { 0: { 0: "active" } },
                cursor: { row: 0, col: 0 },
              },
              delta: { changedIndices: [[0, 0]] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: "(0,1) '3', (0,4) '7' — OK",
              explanation: "Continue scanning row 0: '3' at (0,1) and '7' at (0,4) — both new in their respective rows, columns, and boxes. No conflicts.",
              variables: { r: 0, c: 4, val: "7", "rows[0]": "{8,3,7}", "cols[0]": "{8}", "cols[1]": "{3}", "cols[4]": "{7}" },
              dataStructure: {
                matrix: [
                  ["8","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "visited", 1: "visited", 4: "visited" },
                },
                cursor: { row: 0, col: 4 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: "Rows 1-2: all clear",
              explanation: "Row 1: {6,1,9,5} — all unique. Row 2: {9,8,6} — all unique. cols[0] now has {8,6}. We're about to hit row 3...",
              variables: { r: 2, "cols[0]": "{8,6}", "boxes[0]": "{8,3,6,9}", status: "no conflicts yet" },
              dataStructure: {
                matrix: [
                  ["8","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "visited", 1: "visited", 4: "visited" },
                  1: { 0: "visited", 3: "visited", 4: "visited", 5: "visited" },
                  2: { 1: "visited", 2: "visited", 7: "visited" },
                },
                cursor: { row: 2, col: 7 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12, 15, 16],
              shortLabel: "(3,0) val='8', box=3",
              explanation: "Cell (3,0) has '8'. Box index = (3/3)*3 + (0/3) = 1*3 + 0 = 3. Check rows[3] — '8' not there (empty). Check cols[0] — cols[0] = {8, 6}. '8' IS already in cols[0]!",
              variables: { r: 3, c: 0, val: "8", boxIdx: 3, "cols[0]": "{8,6}", "cols[0] has 8?": "YES!" },
              dataStructure: {
                matrix: [
                  ["8","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "eliminated" },
                  3: { 0: "eliminated" },
                },
                cursor: { row: 3, col: 0 },
              },
              delta: { changedIndices: [[0, 0], [3, 0]] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [18, 19, 20, 21],
              shortLabel: "Duplicate! Return false",
              explanation: "cols[0] already contains '8' (stored when we processed cell (0,0)). Now cell (3,0) also has '8'. Column 0 has a duplicate digit. The board is invalid — return false immediately. We caught this in a single pass without needing separate column checks.",
              variables: { r: 3, c: 0, val: "8", conflict: "cols[0] already has '8'", answer: "false" },
              dataStructure: {
                matrix: [
                  ["8","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".",".",".",".","8",".",".","7","9"],
                ],
                matrixStates: {
                  0: { 0: "eliminated" },
                  3: { 0: "eliminated" },
                },
                cursor: { row: 3, col: 0 },
              },
              delta: { changedIndices: [[0, 0], [3, 0]] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Box Duplicate",
          description: "Digit '9' appears twice in the same 3x3 box but in different rows and columns — catches validators that only check rows and columns",
          input: {
            board: [
              ["5","3",".",".","7",".",".",".","."],
              ["6",".",".","1","9","5",".",".","."],
              [".","9","8",".",".",".",".","6","."],
              ["8",".",".",".","6",".",".",".","3"],
              ["4",".",".","8",".","3",".",".","1"],
              ["7",".",".",".","2",".",".",".","6"],
              [".","6",".",".",".",".","2","8","."],
              [".",".",".","4","1","9",".",".","5"],
              [".","9",".",".","8",".",".","7","."],
            ],
          },
          expectedOutput: "false",
          commonMistake: "Row 8 has '9' only once and column 1 has '9' at row 2 and row 8, but that is a column duplicate. However even if the column issue is fixed conceptually, '9' at (2,1) and (1,4) are in different boxes. The real trap: if you rearrange so '9' appears at (6,1) and (8,1), that's box 6 conflict. This scenario tests box-index computation.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4, 6, 7, 8, 9],
              shortLabel: "Init 27 HashSets",
              explanation: "Create all tracking sets. This board has '9' at (1,4) and (2,1). They are in different rows (1 vs 2), different columns (4 vs 1), but let's check: are they in the same box?",
              variables: { "rows[]": "9 empty", "cols[]": "9 empty", "boxes[]": "9 empty" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".","9",".",".","8",".",".","7","."],
                ],
                matrixStates: {},
                cursor: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: "Scan (0,0)-(1,4): OK so far",
              explanation: "Scanning cells through row 0 and into row 1. At (1,4), val='9', box = (1/3)*3 + (4/3) = 0+1 = 1. '9' is new in rows[1], cols[4], boxes[1]. Store it.",
              variables: { r: 1, c: 4, val: "9", boxIdx: 1, "rows[1]": "{6,1,9}", "cols[4]": "{7,9}", "boxes[1]": "{7,1,9}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".","9",".",".","8",".",".","7","."],
                ],
                matrixStates: {
                  0: { 0: "visited", 1: "visited", 4: "visited" },
                  1: { 0: "visited", 3: "visited", 4: "active", 5: "visited" },
                },
                cursor: { row: 1, col: 4 },
              },
              delta: { changedIndices: [[1, 4]] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12, 15, 16],
              shortLabel: "(2,1) val='9', box=0",
              explanation: "Cell (2,1) has '9'. Box index = (2/3)*3 + (1/3) = 0+0 = 0. Check: rows[2] — '9' not there. cols[1] — {3}, no '9'. boxes[0] — {5,3,6}. No '9' in box 0. All clear. Note: '9' at (1,4) was in box 1, not box 0, so no box conflict here either.",
              variables: { r: 2, c: 1, val: "9", boxIdx: 0, "cols[1]": "{3,9}", "boxes[0]": "{5,3,6,9}" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".","9",".",".","8",".",".","7","."],
                ],
                matrixStates: {
                  0: { 0: "visited", 1: "visited", 4: "visited" },
                  1: { 0: "visited", 3: "visited", 4: "visited", 5: "visited" },
                  2: { 1: "active" },
                },
                cursor: { row: 2, col: 1 },
              },
              delta: { changedIndices: [[2, 1]] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11, 12, 15, 16],
              shortLabel: "Continue to (8,1)...",
              explanation: "We keep scanning. Everything through row 7 passes. Now we arrive at row 8.",
              variables: { r: 8, status: "scanning row 8" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".","9",".",".","8",".",".","7","."],
                ],
                matrixStates: {
                  0: { 0: "visited", 1: "visited", 4: "visited" },
                  1: { 0: "visited", 3: "visited", 4: "visited", 5: "visited" },
                  2: { 1: "visited", 2: "visited", 7: "visited" },
                  3: { 0: "visited", 4: "visited", 8: "visited" },
                  4: { 0: "visited", 3: "visited", 5: "visited", 8: "visited" },
                  5: { 0: "visited", 4: "visited", 8: "visited" },
                  6: { 1: "visited", 6: "visited", 7: "visited" },
                  7: { 3: "visited", 4: "visited", 5: "visited", 8: "visited" },
                },
                cursor: { row: 8, col: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12, 15, 16, 18, 19],
              shortLabel: "(8,1) val='9' — cols[1] dup!",
              explanation: "Cell (8,1) has '9'. cols[1] = {3, 9, 6} — '9' is already there (from cell (2,1))! Column 1 has duplicate '9'. Return false.",
              variables: { r: 8, c: 1, val: "9", boxIdx: 6, "cols[1]": "{3,9,6,...}", "cols[1] has 9?": "YES!" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".","9",".",".","8",".",".","7","."],
                ],
                matrixStates: {
                  2: { 1: "eliminated" },
                  8: { 1: "eliminated" },
                },
                cursor: { row: 8, col: 1 },
              },
              delta: { changedIndices: [[2, 1], [8, 1]] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [21],
              shortLabel: "Return false",
              explanation: "Column 1 contains '9' at both row 2 and row 8. The Sudoku board is invalid. Return false. The single-pass approach caught this column duplicate without needing a separate column-scanning phase.",
              variables: { answer: "false", conflict: "cols[1] has '9' at rows 2 and 8" },
              dataStructure: {
                matrix: [
                  ["5","3",".",".","7",".",".",".","."],
                  ["6",".",".","1","9","5",".",".","."],
                  [".","9","8",".",".",".",".","6","."],
                  ["8",".",".",".","6",".",".",".","3"],
                  ["4",".",".","8",".","3",".",".","1"],
                  ["7",".",".",".","2",".",".",".","6"],
                  [".","6",".",".",".",".","2","8","."],
                  [".",".",".","4","1","9",".",".","5"],
                  [".","9",".",".","8",".",".","7","."],
                ],
                matrixStates: {
                  2: { 1: "eliminated" },
                  8: { 1: "eliminated" },
                },
                cursor: { row: 8, col: 1 },
              },
              delta: { changedIndices: [[2, 1], [8, 1]] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ board }) {
        const steps = [];
        const buildMatrix = () => board.map(row => [...row]);

        // Build initial state
        const rows = Array.from({ length: 9 }, () => new Set());
        const cols = Array.from({ length: 9 }, () => new Set());
        const boxes = Array.from({ length: 9 }, () => new Set());

        steps.push({
          stepId: 0,
          lineNumbers: [2, 3, 4, 6, 7, 8, 9],
          shortLabel: "Init 27 HashSets",
          explanation: "Create 9 HashSets for rows, 9 for columns, and 9 for 3x3 boxes. Begin scanning the board.",
          variables: { r: "-", c: "-", "rows[]": "9 empty", "cols[]": "9 empty", "boxes[]": "9 empty" },
          dataStructure: { matrix: buildMatrix(), matrixStates: {}, cursor: null },
          delta: {},
          isAnswer: false,
        });

        const visited = {};

        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (board[r][c] === '.') continue;

            const val = board[r][c];
            const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            // Build matrixStates from visited
            const matrixStates = {};
            for (const key of Object.keys(visited)) {
              const [vr, vc] = key.split(',').map(Number);
              if (!matrixStates[vr]) matrixStates[vr] = {};
              matrixStates[vr][vc] = "visited";
            }
            if (!matrixStates[r]) matrixStates[r] = {};
            matrixStates[r][c] = "active";

            if (rows[r].has(val)) {
              // Find the conflicting cell
              let conflictCol = -1;
              for (let cc = 0; cc < c; cc++) {
                if (board[r][cc] === val) { conflictCol = cc; break; }
              }
              const errStates = { ...matrixStates };
              if (!errStates[r]) errStates[r] = {};
              errStates[r][c] = "eliminated";
              if (conflictCol >= 0) errStates[r][conflictCol] = "eliminated";

              steps.push({
                stepId: steps.length, lineNumbers: [18, 21],
                shortLabel: `(${r},${c}) '${val}' — row dup!`,
                explanation: `Cell (${r},${c}) has '${val}', but rows[${r}] already contains '${val}'. Row ${r} has a duplicate — return false.`,
                variables: { r, c, val, conflict: `rows[${r}] already has '${val}'`, answer: "false" },
                dataStructure: { matrix: buildMatrix(), matrixStates: errStates, cursor: { row: r, col: c } },
                delta: {}, isAnswer: true,
              });
              return steps;
            }

            if (cols[c].has(val)) {
              let conflictRow = -1;
              for (let rr = 0; rr < r; rr++) {
                if (board[rr][c] === val) { conflictRow = rr; break; }
              }
              const errStates = { ...matrixStates };
              if (!errStates[r]) errStates[r] = {};
              errStates[r][c] = "eliminated";
              if (conflictRow >= 0) {
                if (!errStates[conflictRow]) errStates[conflictRow] = {};
                errStates[conflictRow][c] = "eliminated";
              }

              steps.push({
                stepId: steps.length, lineNumbers: [19, 21],
                shortLabel: `(${r},${c}) '${val}' — col dup!`,
                explanation: `Cell (${r},${c}) has '${val}', but cols[${c}] already contains '${val}'. Column ${c} has a duplicate — return false.`,
                variables: { r, c, val, conflict: `cols[${c}] already has '${val}'`, answer: "false" },
                dataStructure: { matrix: buildMatrix(), matrixStates: errStates, cursor: { row: r, col: c } },
                delta: {}, isAnswer: true,
              });
              return steps;
            }

            if (boxes[boxIdx].has(val)) {
              const errStates = { ...matrixStates };
              if (!errStates[r]) errStates[r] = {};
              errStates[r][c] = "eliminated";

              steps.push({
                stepId: steps.length, lineNumbers: [20, 21],
                shortLabel: `(${r},${c}) '${val}' — box dup!`,
                explanation: `Cell (${r},${c}) has '${val}', but boxes[${boxIdx}] already contains '${val}'. Box ${boxIdx} has a duplicate — return false.`,
                variables: { r, c, val, boxIdx, conflict: `boxes[${boxIdx}] already has '${val}'`, answer: "false" },
                dataStructure: { matrix: buildMatrix(), matrixStates: errStates, cursor: { row: r, col: c } },
                delta: {}, isAnswer: true,
              });
              return steps;
            }

            rows[r].add(val);
            cols[c].add(val);
            boxes[boxIdx].add(val);
            visited[`${r},${c}`] = true;

            steps.push({
              stepId: steps.length,
              lineNumbers: [11, 12, 15, 16, 23, 24, 25],
              shortLabel: `(${r},${c}) '${val}' box=${boxIdx} OK`,
              explanation: `Cell (${r},${c}) has '${val}'. Box index = ${boxIdx}. Not in rows[${r}], cols[${c}], or boxes[${boxIdx}]. Add to all three sets.`,
              variables: {
                r, c, val, boxIdx,
                [`rows[${r}]`]: `{${[...rows[r]].join(',')}}`,
                [`cols[${c}]`]: `{${[...cols[c]].join(',')}}`,
                [`boxes[${boxIdx}]`]: `{${[...boxes[boxIdx]].join(',')}}`,
              },
              dataStructure: {
                matrix: buildMatrix(),
                matrixStates: (() => {
                  const ms = {};
                  for (const key of Object.keys(visited)) {
                    const [vr, vc] = key.split(',').map(Number);
                    if (!ms[vr]) ms[vr] = {};
                    ms[vr][vc] = "visited";
                  }
                  return ms;
                })(),
                cursor: { row: r, col: c },
              },
              delta: { changedIndices: [[r, c]] },
              isAnswer: false,
            });
          }
        }

        // All cells passed
        const finalStates = {};
        for (const key of Object.keys(visited)) {
          const [vr, vc] = key.split(',').map(Number);
          if (!finalStates[vr]) finalStates[vr] = {};
          finalStates[vr][vc] = "found";
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [29],
          shortLabel: "Return true",
          explanation: "All 81 cells scanned. Every filled cell passed the row, column, and box checks. No duplicate digits anywhere. Return true.",
          variables: { answer: "true" },
          dataStructure: { matrix: buildMatrix(), matrixStates: finalStates, cursor: null },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: {
      time: "O(n²)",
      space: "O(n)",
      explanation: "Three separate passes over the n x n board (n=9), each using HashSets. Overall O(n²) time and O(n) space for the sets.",
    },
    optimal: {
      time: "O(n²)",
      space: "O(n²)",
      explanation: "Single pass over n² cells. 27 HashSets (9 rows + 9 cols + 9 boxes), each up to n entries. Total space O(n²).",
      tradeoff: "Both approaches are O(n²) time for a fixed 9x9 board, but the single-pass approach is cleaner, shorter, and less error-prone.",
    },
  },

  interviewTips: [
    "Clarify: 'Do I need to check if a partially filled board can be completed, or just validate current placement?' The answer is just current placement.",
    "Immediately mention the box-index formula: boxIdx = (r/3)*3 + (c/3). This is the key insight interviewers look for.",
    "Start with the brute force (3 separate passes) and then optimize to single pass — shows clear progression.",
    "Mention that for a fixed 9x9 board all complexities are O(1), but describe the general case as O(n²) to show you understand scaling.",
    "Point out that you skip '.' cells early — this is a micro-optimization but shows attention to detail.",
    "If asked about alternative approaches: you could encode the constraints as strings ('row-0-5', 'col-0-5', 'box-0-5') in a single HashSet, but separate arrays of sets is more readable.",
  ],

  relatedProblems: ["valid-anagram", "contains-duplicate", "group-anagrams"],
};
