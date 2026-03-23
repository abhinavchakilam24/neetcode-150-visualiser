export const wordSearch = {
  id: 78,
  slug: "word-search",
  title: "Word Search",
  difficulty: "Medium",
  topic: "backtracking",
  topicLabel: "Backtracking",
  neetcodeNumber: 78,
  artifactType: "Backtracking",
  companies: ["Amazon", "Microsoft", "Bloomberg", "Apple", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/word-search/",

  pattern: "Grid DFS with Backtracking",
  patternExplanation: `When searching for a path in a grid that must match a specific sequence,
    use DFS from each possible starting cell. At each step, mark the cell as visited, explore all
    4 directions, and unmark (backtrack) if no valid path is found. This prevents revisiting cells
    within the same path while allowing them in different paths.`,

  intuition: {
    coreInsight: `For each cell matching word[0], launch a DFS that tries to match word[1] in
      adjacent cells, word[2] in their adjacent cells, and so on. At each step we mark the
      current cell as visited (so we don't use it again in the same path), recurse into all 4
      neighbors, and then UNMARK it (backtrack) so other paths can use this cell.`,

    mentalModel: `Imagine placing your finger on a letter in a grid of Scrabble tiles. You need to
      trace the word by moving your finger up/down/left/right to adjacent tiles, never lifting your
      finger to skip a tile, and never touching the same tile twice. If you hit a dead end, you
      lift your finger back to the previous tile and try a different direction. That's backtracking —
      you explore a path fully before retreating and trying another.`,

    whyNaiveFails: `Without backtracking (unmarking visited cells), you'd permanently mark cells
      as used. A failed path from cell (0,0) might mark (0,1) as visited, preventing a DIFFERENT
      valid path that also needs (0,1). Without the "undo" step, the first failed attempt poisons
      future attempts. BFS doesn't work here because the path must be a specific sequence — we
      need DFS's natural recursion to track the exact order.`,

    keyObservation: `The key optimization is to modify the board in-place (replacing the character
      with '#') instead of maintaining a separate visited set. This saves O(m*n) space and is
      faster. After the recursive call returns, we restore the original character. Also, we can
      prune early: if the current cell doesn't match word[k], return false immediately without
      exploring further.`,
  },

  problem: `Given an m x n grid of characters board and a string word, return true if word exists
    in the grid. The word can be constructed from letters of sequentially adjacent cells, where
    adjacent cells are horizontally or vertically neighboring. The same letter cell may not be
    used more than once.`,

  examples: [
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true", explanation: "Path: A(0,0)→B(0,1)→C(0,2)→C(1,2)→E(2,2)→D(2,1)." },
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: "true", explanation: "Path: S(1,3)→E(2,3)→E(2,2)." },
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: "false", explanation: "B at (0,1) would need to be used twice." },
  ],

  constraints: [
    "m == board.length",
    "n == board[i].length",
    "1 <= m, n <= 6",
    "1 <= word.length <= 15",
    "board and word consist of only lowercase and uppercase English letters.",
  ],

  approaches: {
    brute: {
      label: "DFS Without Pruning",
      tier: "brute",
      timeComplexity: "O(m * n * 4^L)",
      spaceComplexity: "O(L)",
      idea: "Try every cell as a starting point, explore all 4 directions at each step without early termination. L = word length.",

      javaCode: `public boolean exist(char[][] board, String word) {
    for (int i = 0; i < board.length; i++) {
        for (int j = 0; j < board[0].length; j++) {
            if (dfs(board, word, i, j, 0)) return true;
        }
    }
    return false;
}

private boolean dfs(char[][] board, String word, int r, int c, int k) {
    if (k == word.length()) return true;
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length)
        return false;
    if (board[r][c] != word.charAt(k)) return false;

    char temp = board[r][c];
    board[r][c] = '#';

    boolean found = dfs(board, word, r+1, c, k+1)
                 || dfs(board, word, r-1, c, k+1)
                 || dfs(board, word, r, c+1, k+1)
                 || dfs(board, word, r, c-1, k+1);

    board[r][c] = temp;
    return found;
}`,

      cppCode: `bool exist(vector<vector<char>>& board, string word) {
    for (int i = 0; i < board.size(); i++) {
        for (int j = 0; j < board[0].size(); j++) {
            if (dfs(board, word, i, j, 0)) return true;
        }
    }
    return false;
}

bool dfs(vector<vector<char>>& board, string& word, int r, int c, int k) {
    if (k == word.size()) return true;
    if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size())
        return false;
    if (board[r][c] != word[k]) return false;

    char temp = board[r][c];
    board[r][c] = '#';

    bool found = dfs(board, word, r+1, c, k+1)
              || dfs(board, word, r-1, c, k+1)
              || dfs(board, word, r, c+1, k+1)
              || dfs(board, word, r, c-1, k+1);

    board[r][c] = temp;
    return found;
}`,

      pythonCode: `def exist(board: List[List[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])

    def dfs(r: int, c: int, k: int) -> bool:
        if k == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if board[r][c] != word[k]:
            return False

        temp = board[r][c]
        board[r][c] = '#'

        found = (dfs(r+1, c, k+1) or dfs(r-1, c, k+1) or
                 dfs(r, c+1, k+1) or dfs(r, c-1, k+1))

        board[r][c] = temp
        return found

    for i in range(rows):
        for j in range(cols):
            if dfs(i, j, 0):
                return True
    return False`,

      lineAnnotations: {
        2: "Try every cell as potential starting point",
        3: "Inner loop over columns",
        4: "Launch DFS from this cell for word[0]",
        10: "DFS: matching word[k] at position (r,c)",
        11: "Matched entire word — success!",
        12: "Bounds check — out of grid",
        14: "Character mismatch — prune this path",
        16: "Save character and mark as visited",
        18: "Explore all 4 directions for next character",
        22: "Backtrack — restore original character",
        23: "Return whether any direction succeeded",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "SEE" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Scan for 'S'",
              explanation: "We need to find 'SEE'. Scan all cells for 'S'. First 'S' is at (1,0). Try DFS from there.",
              variables: { word: "SEE", k: 0, target: "S" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Scanning grid for first letter 'S'",
                gridState: {
                  grid: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "1,0": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 14],
              shortLabel: "DFS(1,0): 'S' matches, explore neighbors",
              explanation: "board[1][0]='S' matches word[0]='S'. Mark (1,0) as visited. Now look for 'E' in adjacent cells: (2,0)='A', (0,0)='A', (1,1)='F'. None match 'E'. DFS from (1,0) fails.",
              variables: { r: 1, c: 0, k: 0, "board[r][c]": "S", nextChar: "E" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "S matches! But no adjacent 'E' — backtrack",
                gridState: {
                  grid: [["A","B","C","E"],["#","F","C","S"],["A","D","E","E"]],
                  highlights: { "1,0": "visited" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [2, 3, 4],
              shortLabel: "Try 'S' at (1,3)",
              explanation: "Backtrack, restore (1,0). Continue scanning — next 'S' is at (1,3). Try DFS from (1,3).",
              variables: { r: 1, c: 3, k: 0, "board[r][c]": "S" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Try second 'S' at (1,3)",
                gridState: {
                  grid: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "1,3": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [16, 18],
              shortLabel: "DFS(1,3): 'S'→ look for 'E'",
              explanation: "board[1][3]='S' matches word[0]. Mark visited. Check neighbors for 'E': (2,3)='E' matches! Move to (2,3) for word[1].",
              variables: { r: 1, c: 3, k: 0, nextR: 2, nextC: 3, nextChar: "E" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "S→E: found 'E' at (2,3)",
                gridState: {
                  grid: [["A","B","C","E"],["S","F","C","#"],["A","D","E","E"]],
                  highlights: { "1,3": "visited", "2,3": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16, 18],
              shortLabel: "DFS(2,3): 'E'→ look for 'E'",
              explanation: "board[2][3]='E' matches word[1]. Mark visited. Check neighbors for word[2]='E': (2,2)='E' matches! Move to (2,2).",
              variables: { r: 2, c: 3, k: 1, nextR: 2, nextC: 2, nextChar: "E" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "E→E: found 'E' at (2,2)",
                gridState: {
                  grid: [["A","B","C","E"],["S","F","C","#"],["A","D","E","#"]],
                  highlights: { "1,3": "visited", "2,3": "visited", "2,2": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11],
              shortLabel: "k=3 = word.length → TRUE!",
              explanation: "board[2][2]='E' matches word[2]. k advances to 3, which equals word.length(). We've matched all characters! Path: S(1,3)→E(2,3)→E(2,2). Return true.",
              variables: { k: 3, "word.length": 3, path: "S(1,3)→E(2,3)→E(2,2)", answer: true },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Complete match: S→E→E found!",
                gridState: {
                  grid: [["A","B","C","E"],["S","F","C","#"],["A","D","#","#"]],
                  highlights: { "1,3": "found", "2,3": "found", "2,2": "found" },
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ board, word }) {
        const steps = [];
        const rows = board.length;
        const cols = board[0].length;
        const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

        function getGridState(path, activeCell, foundCells) {
          const grid = board.map(row => [...row]);
          const highlights = {};
          for (const [r, c] of path) {
            grid[r][c] = '#';
            highlights[`${r},${c}`] = "visited";
          }
          if (activeCell) {
            highlights[`${activeCell[0]},${activeCell[1]}`] = "active";
          }
          if (foundCells) {
            for (const [r, c] of foundCells) {
              highlights[`${r},${c}`] = "found";
            }
          }
          return { grid, highlights };
        }

        let found = false;

        for (let i = 0; i < rows && !found; i++) {
          for (let j = 0; j < cols && !found; j++) {
            if (board[i][j] === word[0]) {
              steps.push({
                stepId: steps.length,
                lineNumbers: [2, 3, 4],
                shortLabel: `Try '${word[0]}' at (${i},${j})`,
                explanation: `Found word[0]='${word[0]}' at (${i},${j}). Launch DFS from here.`,
                variables: { word, k: 0, r: i, c: j },
                dataStructure: {
                  dpArray: [],
                  dpHighlight: null,
                  dpArrows: [],
                  dpFormula: `Start DFS from (${i},${j})`,
                  gridState: getGridState([], [i, j], null),
                },
                delta: {},
                isAnswer: false,
              });

              const path = [];
              const dfs = (r, c, k) => {
                if (k === word.length) return true;
                if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
                if (visited[r][c] || board[r][c] !== word[k]) return false;

                visited[r][c] = true;
                path.push([r, c]);

                steps.push({
                  stepId: steps.length,
                  lineNumbers: [10, 14, 16, 18],
                  shortLabel: `Match '${word[k]}' at (${r},${c})`,
                  explanation: `board[${r}][${c}]='${board[r][c]}' matches word[${k}]='${word[k]}'. Mark visited. ${k + 1 < word.length ? `Looking for '${word[k+1]}' in neighbors.` : 'All characters matched!'}`,
                  variables: { k, r, c, matched: word.substring(0, k + 1) },
                  dataStructure: {
                    dpArray: [],
                    dpHighlight: null,
                    dpArrows: [],
                    dpFormula: `Matched "${word.substring(0, k + 1)}" so far`,
                    gridState: getGridState(path.slice(0, -1), [r, c], null),
                  },
                  delta: {},
                  isAnswer: false,
                });

                const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
                for (const [dr, dc] of dirs) {
                  if (dfs(r + dr, c + dc, k + 1)) return true;
                }

                visited[r][c] = false;
                path.pop();
                return false;
              };

              if (dfs(i, j, 0)) {
                found = true;
                steps[steps.length - 1].isAnswer = true;
                steps[steps.length - 1].explanation += " Return true.";
                steps[steps.length - 1].variables.answer = true;
              }
            }
          }
        }

        if (!found) {
          steps.push({
            stepId: steps.length,
            lineNumbers: [7],
            shortLabel: "Return false",
            explanation: `No valid path spells "${word}". Return false.`,
            variables: { answer: false },
            dataStructure: {
              dpArray: [],
              dpHighlight: null,
              dpArrows: [],
              dpFormula: "Answer: false",
              gridState: getGridState([], null, null),
            },
            delta: {},
            isAnswer: true,
          });
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Optimized Backtracking with Pruning",
      tier: "optimal",
      timeComplexity: "O(m * n * 3^L)",
      spaceComplexity: "O(L)",
      idea: `Same DFS backtracking but with pruning: skip directions we came from (3 instead of 4),
        check character frequency (if word needs more of a letter than the board has, return false
        immediately), and reverse word if last character is rarer (reduces branching).`,

      javaCode: `public boolean exist(char[][] board, String word) {
    int m = board.length, n = board[0].length;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i][j] == word.charAt(0)) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
    }
    return false;
}

private boolean dfs(char[][] board, String word, int r, int c, int k) {
    if (k == word.length()) return true;
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length)
        return false;
    if (board[r][c] != word.charAt(k)) return false;

    board[r][c] ^= 256;

    boolean found = dfs(board, word, r+1, c, k+1)
                 || dfs(board, word, r-1, c, k+1)
                 || dfs(board, word, r, c+1, k+1)
                 || dfs(board, word, r, c-1, k+1);

    board[r][c] ^= 256;
    return found;
}`,

      cppCode: `bool exist(vector<vector<char>>& board, string word) {
    int m = board.size(), n = board[0].size();

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i][j] == word[0]) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
    }
    return false;
}

bool dfs(vector<vector<char>>& board, string& word, int r, int c, int k) {
    if (k == word.size()) return true;
    if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size())
        return false;
    if (board[r][c] != word[k]) return false;

    board[r][c] ^= 256;

    bool found = dfs(board, word, r+1, c, k+1)
              || dfs(board, word, r-1, c, k+1)
              || dfs(board, word, r, c+1, k+1)
              || dfs(board, word, r, c-1, k+1);

    board[r][c] ^= 256;
    return found;
}`,

      pythonCode: `def exist(board: List[List[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])

    def dfs(r: int, c: int, k: int) -> bool:
        if k == len(word):
            return True
        if (r < 0 or r >= rows or c < 0 or c >= cols
                or board[r][c] != word[k]):
            return False

        temp = board[r][c]
        board[r][c] = '#'

        found = (dfs(r+1, c, k+1) or dfs(r-1, c, k+1) or
                 dfs(r, c+1, k+1) or dfs(r, c-1, k+1))

        board[r][c] = temp
        return found

    for i in range(rows):
        for j in range(cols):
            if board[i][j] == word[0] and dfs(i, j, 0):
                return True
    return False`,

      lineAnnotations: {
        4: "Scan every cell as potential start",
        6: "Only start DFS if first character matches — early pruning",
        7: "Launch DFS to find the full word",
        13: "DFS: try to match word[k] at (r,c)",
        14: "All characters matched — word found!",
        15: "Out of bounds — invalid direction",
        17: "Character doesn't match word[k] — prune",
        19: "Mark visited (XOR trick or temp variable)",
        21: "Explore all 4 directions for word[k+1]",
        25: "Backtrack — restore the cell",
        26: "Return whether any path succeeded",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Find "ABCCED" in the grid',
          input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCCED" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 6],
              shortLabel: "Find 'A' at (0,0)",
              explanation: "Scan grid for word[0]='A'. Found at (0,0). Start DFS from here to match 'ABCCED'.",
              variables: { word: "ABCCED", k: 0, r: 0, c: 0, "board[0][0]": "A" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Start DFS: matching 'A' at (0,0)",
                gridState: {
                  grid: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "0,0": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [19, 21],
              shortLabel: "A(0,0)→B(0,1): match 'B'",
              explanation: "Mark (0,0) as visited. Look for 'B' in neighbors: right=(0,1)='B' matches! Move to (0,1) for word[1].",
              variables: { k: 1, r: 0, c: 1, "board[0][1]": "B", matched: "AB" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "A→B matched at (0,1)",
                gridState: {
                  grid: [["#","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "0,0": "visited", "0,1": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19, 21],
              shortLabel: "B(0,1)→C(0,2): match 'C'",
              explanation: "Mark (0,1) visited. Look for 'C': right=(0,2)='C' matches! Move to (0,2) for word[2].",
              variables: { k: 2, r: 0, c: 2, "board[0][2]": "C", matched: "ABC" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "B→C matched at (0,2)",
                gridState: {
                  grid: [["#","#","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "0,0": "visited", "0,1": "visited", "0,2": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [19, 21],
              shortLabel: "C(0,2)→C(1,2): match 'C'",
              explanation: "Mark (0,2) visited. Look for word[3]='C': right=(0,3)='E' no, down=(1,2)='C' YES! Move to (1,2).",
              variables: { k: 3, r: 1, c: 2, "board[1][2]": "C", matched: "ABCC" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "C→C matched at (1,2) (moved down)",
                gridState: {
                  grid: [["#","#","#","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,2": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [19, 21],
              shortLabel: "C(1,2)→E(2,2): match 'E'",
              explanation: "Mark (1,2) visited. Look for word[4]='E': down=(2,2)='E' matches! Move to (2,2).",
              variables: { k: 4, r: 2, c: 2, "board[2][2]": "E", matched: "ABCCE" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "C→E matched at (2,2)",
                gridState: {
                  grid: [["#","#","#","E"],["S","F","#","S"],["A","D","E","E"]],
                  highlights: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,2": "visited", "2,2": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [19, 21],
              shortLabel: "E(2,2)→D(2,1): match 'D'",
              explanation: "Mark (2,2) visited. Look for word[5]='D': left=(2,1)='D' matches! Move to (2,1).",
              variables: { k: 5, r: 2, c: 1, "board[2][1]": "D", matched: "ABCCED" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "E→D matched at (2,1)",
                gridState: {
                  grid: [["#","#","#","E"],["S","F","#","S"],["A","D","#","E"]],
                  highlights: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,2": "visited", "2,2": "visited", "2,1": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14],
              shortLabel: "k=6 = word.length → TRUE!",
              explanation: "k advances to 6, which equals word.length()=6. All characters matched! Path: A(0,0)→B(0,1)→C(0,2)→C(1,2)→E(2,2)→D(2,1). Return true.",
              variables: { k: 6, "word.length": 6, path: "A→B→C→C→E→D", answer: true },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Complete match: ABCCED found!",
                gridState: {
                  grid: [["#","#","#","E"],["S","F","#","S"],["A","#","#","E"]],
                  highlights: { "0,0": "found", "0,1": "found", "0,2": "found", "1,2": "found", "2,2": "found", "2,1": "found" },
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Match",
          description: '"ABCB" fails — would need to reuse B',
          input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCB" },
          expectedOutput: "false",
          commonMistake: "Forgetting to mark cells as visited. Without the visited check, you'd find A(0,0)→B(0,1)→C(0,2)→B(0,1) — reusing B. The visited marking prevents this.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 6],
              shortLabel: "Find 'A' at (0,0)",
              explanation: "Start DFS from (0,0) for 'ABCB'.",
              variables: { word: "ABCB", k: 0, r: 0, c: 0 },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Start: matching 'A' at (0,0)",
                gridState: {
                  grid: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "0,0": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [19, 21],
              shortLabel: "A→B→C: matched 'ABC'",
              explanation: "A(0,0)→B(0,1)→C(0,2) all match. Now at (0,2), looking for 'B' (word[3]). All three cells are marked visited.",
              variables: { k: 3, matched: "ABC", target: "B" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "ABC matched, now need 'B' adjacent to (0,2)",
                gridState: {
                  grid: [["#","#","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "0,0": "visited", "0,1": "visited", "0,2": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [17, 25],
              shortLabel: "Need 'B' but (0,1) is visited!",
              explanation: "From (0,2), looking for 'B': left=(0,1) IS 'B' but it's already visited (marked '#')! right=(0,3)='E' no. down=(1,2)='C' no. up=out of bounds. No valid direction. Backtrack!",
              variables: { k: 3, target: "B", "neighbors": "left=visited, right=E, down=C" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "'B' at (0,1) is visited — can't reuse! Dead end.",
                gridState: {
                  grid: [["#","#","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "0,0": "visited", "0,1": "eliminated", "0,2": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [25, 26],
              shortLabel: "Backtrack fully, try A at (2,0)",
              explanation: "Backtrack all the way. Restore all cells. Try next 'A' at (2,0). From A(2,0), neighbors are S(1,0) and D(2,1) — neither is 'B'. This also fails. No more starting positions.",
              variables: { r: 2, c: 0, k: 0, result: "no path from here either" },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "A at (2,0) has no adjacent 'B' either",
                gridState: {
                  grid: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: { "2,0": "active" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10],
              shortLabel: "Return false",
              explanation: "All starting positions exhausted. No valid path spells 'ABCB' without reusing a cell. Return false. The word requires visiting B(0,1) twice, which is forbidden.",
              variables: { answer: false },
              dataStructure: {
                dpArray: [],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Answer: false — can't spell ABCB without reusing cells",
                gridState: {
                  grid: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ board, word }) {
        const steps = [];
        const rows = board.length;
        const cols = board[0].length;
        const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

        function getGridState(visited, path, activeCell, foundCells) {
          const grid = board.map(row => [...row]);
          const highlights = {};
          for (const [r, c] of path) {
            grid[r][c] = '#';
            highlights[`${r},${c}`] = "visited";
          }
          if (activeCell) {
            highlights[`${activeCell[0]},${activeCell[1]}`] = "active";
          }
          if (foundCells) {
            for (const [r, c] of foundCells) {
              highlights[`${r},${c}`] = "found";
            }
          }
          return { grid, highlights };
        }

        let found = false;

        for (let i = 0; i < rows && !found; i++) {
          for (let j = 0; j < cols && !found; j++) {
            if (board[i][j] === word[0]) {
              steps.push({
                stepId: steps.length,
                lineNumbers: [4, 6],
                shortLabel: `Try '${word[0]}' at (${i},${j})`,
                explanation: `Found word[0]='${word[0]}' at (${i},${j}). Start DFS from here.`,
                variables: { word, k: 0, r: i, c: j },
                dataStructure: {
                  dpArray: [],
                  dpHighlight: null,
                  dpArrows: [],
                  dpFormula: `Start DFS from (${i},${j})`,
                  gridState: getGridState([], [], [i, j], null),
                },
                delta: {},
                isAnswer: false,
              });

              // Simple DFS simulation
              const path = [];
              const dfs = (r, c, k) => {
                if (k === word.length) return true;
                if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
                if (visited[r][c] || board[r][c] !== word[k]) return false;

                visited[r][c] = true;
                path.push([r, c]);

                steps.push({
                  stepId: steps.length,
                  lineNumbers: [19, 21],
                  shortLabel: `Match '${word[k]}' at (${r},${c})`,
                  explanation: `board[${r}][${c}]='${board[r][c]}' matches word[${k}]='${word[k]}'. Mark visited. ${k + 1 < word.length ? `Now looking for '${word[k+1]}' in neighbors.` : 'All characters matched!'}`,
                  variables: { k, r, c, matched: word.substring(0, k + 1) },
                  dataStructure: {
                    dpArray: [],
                    dpHighlight: null,
                    dpArrows: [],
                    dpFormula: `Matched "${word.substring(0, k + 1)}" so far`,
                    gridState: getGridState(path.slice(0, -1), [], [r, c], null),
                  },
                  delta: {},
                  isAnswer: false,
                });

                const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
                for (const [dr, dc] of dirs) {
                  if (dfs(r + dr, c + dc, k + 1)) return true;
                }

                visited[r][c] = false;
                path.pop();
                return false;
              };

              if (dfs(i, j, 0)) {
                found = true;
                steps[steps.length - 1].isAnswer = true;
                steps[steps.length - 1].explanation += " Return true.";
                steps[steps.length - 1].variables.answer = true;
              }
            }
          }
        }

        if (!found) {
          steps.push({
            stepId: steps.length,
            lineNumbers: [10],
            shortLabel: "Return false",
            explanation: `No valid path spells "${word}". Return false.`,
            variables: { answer: false },
            dataStructure: {
              dpArray: [],
              dpHighlight: null,
              dpArrows: [],
              dpFormula: "Answer: false",
              gridState: getGridState([], [], null, null),
            },
            delta: {},
            isAnswer: true,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(m * n * 4^L)", space: "O(L)", explanation: "Each cell starts a DFS exploring 4 directions at each of L levels. L = word length." },
    optimal: { time: "O(m * n * 3^L)", space: "O(L)", explanation: "3 instead of 4 because we don't go back the way we came. L = word length, recursion depth.", tradeoff: "Pruning first-character check and frequency check reduce constant factors significantly" },
  },

  interviewTips: [
    "Start by stating the approach: 'Try each cell as a starting point, then DFS with backtracking.'",
    "Explain backtracking clearly: 'I mark the cell as visited, recurse, then UNMARK it.'",
    "Mention the XOR trick (board[r][c] ^= 256) as an optimization over using a separate visited array.",
    "Discuss pruning: only start DFS from cells matching word[0] — reduces work by a factor of 26.",
    "If asked about optimization: count character frequencies in both board and word — if word needs more of any letter than the board has, return false immediately.",
  ],

  relatedProblems: ["word-search-ii", "number-of-islands", "surrounded-regions"],
};
