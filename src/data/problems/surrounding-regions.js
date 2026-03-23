export const surroundingRegions = {
  id: 86,
  slug: "surrounding-regions",
  title: "Surrounding Regions",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 86,
  artifactType: "GraphBFS",
  companies: ["Google", "Amazon", "Microsoft", "Meta", "Uber"],
  leetcodeLink: "https://leetcode.com/problems/surrounded-regions/",

  pattern: "Border DFS to Protect Unsurrounded Regions",
  patternExplanation: `Instead of checking which 'O' regions are fully surrounded, reverse the
    problem: find all 'O's connected to the border (which CANNOT be surrounded) and protect them.
    Then flip all remaining 'O's (which ARE surrounded) to 'X'.`,

  intuition: {
    coreInsight: `An 'O' region is surrounded only if it doesn't touch any border. Rather than
      checking every 'O' region, we invert the logic: start DFS from every border 'O' and mark
      all connected 'O's as "safe". After marking, any 'O' still unmarked must be surrounded
      (it has no path to any border). Flip those to 'X' and restore the safe ones to 'O'.`,

    mentalModel: `Imagine the board is a walled garden. Any 'O' touching the wall (border) is
      an escape tunnel that leads outside — it and everything connected to it cannot be captured.
      First, walk the perimeter and mark every tunnel entrance. Then flood inward from each
      entrance to mark the entire tunnel network as "safe." Everything NOT in a tunnel is
      trapped and gets flipped to 'X'.`,

    whyNaiveFails: `The naive approach checks every 'O' region: DFS to see if it touches a border.
      If multiple 'O' regions exist, we might revisit the same cells many times. Worse, the logic
      is complex: a region is "not surrounded" if ANY cell in it touches a border, requiring us
      to explore the entire region before deciding. Starting from the border is simpler and faster.`,

    keyObservation: `We use a three-phase approach: (1) DFS from border 'O's to mark them as 'T'
      (temporary safe marker), (2) flip all remaining 'O's to 'X' (they're surrounded), (3)
      flip all 'T's back to 'O' (they're safe). This avoids needing a separate visited array.`,
  },

  problem: `You are given an m x n matrix board containing 'X' and 'O'. Capture all regions that
    are 4-directionally surrounded by 'X'. A region is captured by flipping all 'O's into 'X's
    in that surrounded region. An 'O' on the border of the board is not surrounded.`,

  examples: [
    {
      input: `board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]`,
      output: `[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]`,
      explanation: "The 'O' at (3,1) is on the border — not captured. The 'O's at (1,1), (1,2), (2,2) are surrounded — captured.",
    },
    {
      input: `board = [["X"]]`,
      output: `[["X"]]`,
      explanation: "Single cell, already 'X'.",
    },
  ],

  constraints: [
    "m == board.length",
    "n == board[i].length",
    "1 <= m, n <= 200",
    "board[i][j] is 'X' or 'O'",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Border DFS — Mark, Capture, Restore",
      tier: "optimal",
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(m × n)",
      idea: `Phase 1: DFS from every border 'O', marking connected 'O's as 'T' (safe).
        Phase 2: Flip remaining 'O's to 'X' (they're surrounded).
        Phase 3: Flip 'T's back to 'O' (restore safe cells).`,

      javaCode: `public void solve(char[][] board) {
    int rows = board.length, cols = board[0].length;

    // Phase 1: DFS from border O's — mark as 'T'
    for (int r = 0; r < rows; r++) {
        if (board[r][0] == 'O') dfs(board, r, 0);
        if (board[r][cols-1] == 'O') dfs(board, r, cols-1);
    }
    for (int c = 0; c < cols; c++) {
        if (board[0][c] == 'O') dfs(board, 0, c);
        if (board[rows-1][c] == 'O') dfs(board, rows-1, c);
    }

    // Phase 2 & 3: Capture surrounded, restore safe
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (board[r][c] == 'O') board[r][c] = 'X';
            else if (board[r][c] == 'T') board[r][c] = 'O';
        }
    }
}

private void dfs(char[][] board, int r, int c) {
    if (r < 0 || r >= board.length || c < 0
        || c >= board[0].length || board[r][c] != 'O') return;
    board[r][c] = 'T';
    dfs(board, r+1, c);
    dfs(board, r-1, c);
    dfs(board, r, c+1);
    dfs(board, r, c-1);
}`,

      cppCode: `void solve(vector<vector<char>>& board) {
    int rows = board.size(), cols = board[0].size();

    // Phase 1: DFS from border O's
    for (int r = 0; r < rows; r++) {
        if (board[r][0] == 'O') dfs(board, r, 0);
        if (board[r][cols-1] == 'O') dfs(board, r, cols-1);
    }
    for (int c = 0; c < cols; c++) {
        if (board[0][c] == 'O') dfs(board, 0, c);
        if (board[rows-1][c] == 'O') dfs(board, rows-1, c);
    }

    // Phase 2 & 3
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (board[r][c] == 'O') board[r][c] = 'X';
            else if (board[r][c] == 'T') board[r][c] = 'O';
        }
    }
}

void dfs(vector<vector<char>>& board, int r, int c) {
    if (r < 0 || r >= (int)board.size() || c < 0
        || c >= (int)board[0].size() || board[r][c] != 'O') return;
    board[r][c] = 'T';
    dfs(board, r+1, c);
    dfs(board, r-1, c);
    dfs(board, r, c+1);
    dfs(board, r, c-1);
}`,

      pythonCode: `def solve(board: List[List[str]]) -> None:
    rows, cols = len(board), len(board[0])

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols \\
            or board[r][c] != 'O':
            return
        board[r][c] = 'T'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    # Phase 1: Mark border-connected O's
    for r in range(rows):
        if board[r][0] == 'O': dfs(r, 0)
        if board[r][cols - 1] == 'O': dfs(r, cols - 1)
    for c in range(cols):
        if board[0][c] == 'O': dfs(0, c)
        if board[rows - 1][c] == 'O': dfs(rows - 1, c)

    # Phase 2 & 3: Capture and restore
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == 'O':
                board[r][c] = 'X'
            elif board[r][c] == 'T':
                board[r][c] = 'O'`,

      lineAnnotations: {
        1: "Main function — modifies board in-place",
        4: "Phase 1: DFS from left and right borders",
        5: "Left border — any 'O' starts a DFS",
        6: "Right border — any 'O' starts a DFS",
        8: "Phase 1: DFS from top and bottom borders",
        14: "Phase 2 & 3: scan entire board",
        16: "Remaining 'O' is surrounded — flip to 'X'",
        17: "'T' was safe (border-connected) — restore to 'O'",
        21: "DFS helper — marks border-connected 'O's as 'T'",
        22: "Base case: out of bounds or not 'O'",
        24: "Mark as 'T' to protect from capture",
        25: "Recurse in all 4 directions",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "4x4 board with one surrounded region and one border-connected O",
          input: { board: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]] },
          expectedOutput: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Initial board state",
              explanation: "4x4 board. 'O's at (1,1), (1,2), (2,2), (3,1). We need to determine which are surrounded by 'X' and which connect to a border.",
              variables: { rows: 4, cols: 4, phase: "Setup" },
              dataStructure: {
                grid: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]],
                gridStates: [
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: "Phase 1: Scan left & right borders",
              explanation: "Walk left column (c=0) and right column (c=3). No 'O's on left or right borders. Nothing to mark.",
              variables: { phase: "Border scan - columns", safeCells: 0 },
              dataStructure: {
                grid: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]],
                gridStates: [
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9, 10],
              shortLabel: "Phase 1: Scan top & bottom borders",
              explanation: "Walk top row (r=0) and bottom row (r=3). Top row: all 'X'. Bottom row: (3,1) is 'O'! DFS from (3,1).",
              variables: { phase: "Border scan - rows", borderO: "(3,1)" },
              dataStructure: {
                grid: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]],
                gridStates: [
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","active","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:3,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [21, 24, 25],
              shortLabel: "DFS from (3,1) — mark as 'T' (safe)",
              explanation: "DFS from border 'O' at (3,1). Mark (3,1) as 'T'. Check neighbors: (2,1) is 'X', (3,0) is 'X', (3,2) is 'X'. No connected 'O's — only (3,1) is safe.",
              variables: { phase: "DFS", cell: "(3,1)", marked: "T", safeCells: 1 },
              dataStructure: {
                grid: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","T","X","X"]],
                gridStates: [
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","found","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:3,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14, 16],
              shortLabel: "Phase 2: Capture surrounded O's → X",
              explanation: "Scan entire board. (1,1), (1,2), (2,2) are still 'O' — they never connected to a border. Flip them to 'X'. They're captured!",
              variables: { phase: "Capture", captured: 3 },
              dataStructure: {
                grid: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","T","X","X"]],
                gridStates: [
                  ["default","default","default","default"],
                  ["default","eliminated","eliminated","default"],
                  ["default","default","eliminated","default"],
                  ["default","found","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:1,c:1},{r:1,c:2},{r:2,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [17],
              shortLabel: "Phase 3: Restore T → O (safe cells)",
              explanation: "Flip (3,1) from 'T' back to 'O'. This cell was border-connected and should remain 'O'. Board is now complete.",
              variables: { phase: "Restore", restored: 1 },
              dataStructure: {
                grid: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]],
                gridStates: [
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","default","default","default"],
                  ["default","found","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:3,c:1}] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [1],
              shortLabel: "Done — 3 captured, 1 safe",
              explanation: "Final board: (1,1), (1,2), (2,2) were surrounded and captured to 'X'. (3,1) was border-connected and remains 'O'. Three-phase approach processes the entire board in O(m*n).",
              variables: { captured: 3, safe: 1, answer: "Board modified" },
              dataStructure: {
                grid: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]],
                gridStates: [
                  ["found","found","found","found"],
                  ["found","found","found","found"],
                  ["found","found","found","found"],
                  ["found","found","found","found"],
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
          label: "All Border Connected",
          description: "All O's connect to border — nothing captured",
          input: { board: [["O","O","O"],["O","X","O"],["O","O","O"]] },
          expectedOutput: '[["O","O","O"],["O","X","O"],["O","O","O"]]',
          commonMistake: "Assuming there must be something to capture. If all 'O's connect to the border, the board stays unchanged.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Initial board — O's form border ring",
              explanation: "3x3 board. All 'O's are on the border or connected to border 'O's. The only 'X' is at (1,1) in the center.",
              variables: { rows: 3, cols: 3 },
              dataStructure: {
                grid: [["O","O","O"],["O","X","O"],["O","O","O"]],
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
              lineNumbers: [4, 5, 6, 8, 9, 10],
              shortLabel: "Phase 1: All border O's → T",
              explanation: "DFS from every border 'O'. All 8 'O' cells are interconnected via the border. All marked as 'T'. No 'O's remain to capture.",
              variables: { phase: "Border DFS", safeCells: 8 },
              dataStructure: {
                grid: [["T","T","T"],["T","X","T"],["T","T","T"]],
                gridStates: [
                  ["found","found","found"],
                  ["found","default","found"],
                  ["found","found","found"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [14, 16, 17],
              shortLabel: "Phase 2 & 3: No O's to capture, restore T → O",
              explanation: "No remaining 'O's to flip — nothing is surrounded. All 'T's restored to 'O'. Board is unchanged from the original.",
              variables: { captured: 0, restored: 8, answer: "Board unchanged" },
              dataStructure: {
                grid: [["O","O","O"],["O","X","O"],["O","O","O"]],
                gridStates: [
                  ["found","found","found"],
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
      },

      computeSteps: function({ board }) {
        const steps = [];
        const rows = board.length;
        const cols = board[0].length;
        const b = board.map(r => r.map(v => v));
        const states = Array.from({ length: rows }, () => Array(cols).fill("default"));

        steps.push({
          stepId: 0,
          lineNumbers: [1, 2],
          shortLabel: "Initial board",
          explanation: `Board is ${rows}x${cols}. Begin three-phase capture algorithm.`,
          variables: { rows, cols },
          dataStructure: {
            grid: b.map(r => [...r]),
            gridStates: states.map(r => [...r]),
            bfsQueue: [],
          },
          delta: {},
          isAnswer: false,
        });

        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        let safeCells = 0;

        function dfs(r, c) {
          if (r < 0 || r >= rows || c < 0 || c >= cols || b[r][c] !== 'O') return;
          b[r][c] = 'T';
          states[r][c] = "found";
          safeCells++;
          for (const [dr, dc] of dirs) {
            dfs(r + dr, c + dc);
          }
        }

        // Phase 1: border DFS
        for (let r = 0; r < rows; r++) {
          if (b[r][0] === 'O') dfs(r, 0);
          if (b[r][cols - 1] === 'O') dfs(r, cols - 1);
        }
        for (let c = 0; c < cols; c++) {
          if (b[0][c] === 'O') dfs(0, c);
          if (b[rows - 1][c] === 'O') dfs(rows - 1, c);
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [4, 5, 6, 8, 9, 10, 24],
          shortLabel: `Phase 1: ${safeCells} safe cell(s) marked`,
          explanation: `DFS from border 'O's. ${safeCells} cell(s) marked as 'T' (safe — connected to border).`,
          variables: { phase: 1, safeCells },
          dataStructure: {
            grid: b.map(r => [...r]),
            gridStates: states.map(r => [...r]),
            bfsQueue: [],
          },
          delta: {},
          isAnswer: false,
        });

        // Phase 2 & 3
        let captured = 0;
        let restored = 0;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (b[r][c] === 'O') {
              b[r][c] = 'X';
              states[r][c] = "eliminated";
              captured++;
            } else if (b[r][c] === 'T') {
              b[r][c] = 'O';
              states[r][c] = "found";
              restored++;
            }
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [14, 16, 17],
          shortLabel: `Captured ${captured}, restored ${restored}`,
          explanation: `Phase 2: ${captured} surrounded 'O'(s) flipped to 'X'. Phase 3: ${restored} safe 'T'(s) restored to 'O'.`,
          variables: { captured, restored },
          dataStructure: {
            grid: b.map(r => [...r]),
            gridStates: states.map(r => [...r]),
            bfsQueue: [],
          },
          delta: {},
          isAnswer: false,
        });

        // Final
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            states[r][c] = "found";
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [1],
          shortLabel: "Done",
          explanation: `Board modified in-place. ${captured} region(s) captured, ${safeCells} border-connected cell(s) preserved.`,
          variables: { captured, safe: safeCells, answer: "Board modified" },
          dataStructure: {
            grid: b.map(r => [...r]),
            gridStates: states.map(r => [...r]),
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
    optimal: { time: "O(m × n)", space: "O(m × n)", explanation: "DFS visits each cell at most once; recursion stack can be O(m*n) in worst case", tradeoff: "In-place 'T' marker avoids a separate visited array" },
  },

  interviewTips: [
    "The key insight: reverse the problem. Instead of finding surrounded O's, find UNsurrounded O's from the border.",
    "Mention the three-phase approach: mark safe, capture surrounded, restore safe.",
    "Using 'T' as a temporary marker avoids needing a separate visited array — clean in-place solution.",
    "BFS from borders works equally well — avoids stack overflow risk on large grids.",
    "Edge case: board with no 'O's — nothing to do. Board with all 'O's — all border-connected, nothing captured.",
    "Clarify: 'surrounded' means 4-directionally, not diagonally.",
  ],

  relatedProblems: ["number-of-islands", "pacific-atlantic-water-flow", "walls-and-gates"],
};
