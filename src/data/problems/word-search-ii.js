export const wordSearchII = {
  id: 63,
  slug: "word-search-ii",
  title: "Word Search II",
  difficulty: "Hard",
  topic: "tries",
  topicLabel: "Tries",
  neetcodeNumber: 63,
  artifactType: "Trie",
  companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/word-search-ii/",

  pattern: "Trie + Backtracking DFS on Grid",
  patternExplanation: `Build a Trie from the word list, then DFS from every cell in the board.
    At each cell, follow the Trie pointer — if the current character has no child in the Trie,
    prune the entire branch. This avoids re-searching the board once per word and instead
    searches for ALL words simultaneously in a single set of DFS traversals.`,

  intuition: {
    coreInsight: `The naive approach searches the board for each word independently — that's
      k separate DFS traversals over an m*n grid, each potentially exploring 4^L paths (L = word
      length). But notice: many words share prefixes. If "oath" and "oat" are both in the list,
      the DFS path o->a->t is shared. A Trie encodes all words into a single prefix tree, so one
      DFS from cell 'o' simultaneously checks every word starting with 'o'. We search for ALL
      words at once, pruning branches the moment the Trie says "no word has this prefix."`,

    mentalModel: `Imagine you're in a library looking for 100 books. The naive approach: walk
      through every shelf 100 times, once per book. The Trie approach: you carry a checklist
      organized by first letter, then second letter, etc. As you walk through a shelf, you
      check off every matching book simultaneously. If no book on your list starts with "ZX",
      you skip that entire section instantly. The Trie IS that organized checklist — it lets
      you find all matches in one pass through the library.`,

    whyNaiveFails: `For each of k words, we run a DFS from every cell — O(k * m * n * 4^L).
      With k=10,000 words on a 12x12 board, each word up to length 10, that's potentially
      10,000 * 144 * 4^10 = trillions of operations. The Trie approach does at most
      m * n * 4^L total work regardless of how many words there are, because all words
      share the same DFS traversal.`,

    keyObservation: `After finding a word, remove its terminal marker from the Trie (and prune
      empty branches). This prevents finding duplicates and progressively shrinks the Trie,
      making subsequent DFS calls faster. Also, mark visited cells during DFS to avoid
      revisiting the same cell in one path — restore the cell when backtracking.`,
  },

  problem: `Given an m x n board of characters and a list of strings words, return all words
    on the board. Each word must be constructed from letters of sequentially adjacent cells,
    where adjacent cells are horizontally or vertically neighboring. The same letter cell may
    not be used more than once in a word.`,

  examples: [
    {
      input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
      output: '["eat","oath"]',
      explanation: 'Both "oath" and "eat" can be constructed from adjacent cells on the board.',
    },
    {
      input: 'board = [["a","b"],["c","d"]], words = ["abcb"]',
      output: '[]',
      explanation: 'The word "abcb" cannot be formed because we cannot reuse cell (0,1) for the second "b".',
    },
  ],

  constraints: [
    "m == board.length",
    "n == board[i].length",
    "1 <= m, n <= 12",
    "board[i][j] is a lowercase English letter",
    "1 <= words.length <= 3 * 10^4",
    "1 <= words[i].length <= 10",
    "words[i] consists of lowercase English letters",
    "All strings in words are unique",
  ],

  approaches: {
    brute: {
      label: "Brute Force (DFS Per Word)",
      tier: "brute",
      timeComplexity: "O(k * m * n * 4^L)",
      spaceComplexity: "O(L)",
      idea: `For each word, attempt DFS from every cell on the board. At each cell, check if it
        matches the current character; if so, recurse to all 4 neighbors for the next character.
        Mark cells visited to avoid reuse within one path.`,

      javaCode: `public List<String> findWords(char[][] board, String[] words) {
    List<String> result = new ArrayList<>();
    for (String word : words) {
        if (exists(board, word)) result.add(word);
    }
    return result;
}

private boolean exists(char[][] board, String word) {
    for (int r = 0; r < board.length; r++) {
        for (int c = 0; c < board[0].length; c++) {
            if (dfs(board, word, r, c, 0)) return true;
        }
    }
    return false;
}

private boolean dfs(char[][] board, String word, int r, int c, int idx) {
    if (idx == word.length()) return true;
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return false;
    if (board[r][c] != word.charAt(idx)) return false;
    char tmp = board[r][c];
    board[r][c] = '#';
    boolean found = dfs(board, word, r+1, c, idx+1)
                 || dfs(board, word, r-1, c, idx+1)
                 || dfs(board, word, r, c+1, idx+1)
                 || dfs(board, word, r, c-1, idx+1);
    board[r][c] = tmp;
    return found;
}`,

      cppCode: `vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
    vector<string> result;
    for (auto& word : words) {
        if (exists(board, word)) result.push_back(word);
    }
    return result;
}

bool exists(vector<vector<char>>& board, string& word) {
    for (int r = 0; r < board.size(); r++) {
        for (int c = 0; c < board[0].size(); c++) {
            if (dfs(board, word, r, c, 0)) return true;
        }
    }
    return false;
}

bool dfs(vector<vector<char>>& board, string& word, int r, int c, int idx) {
    if (idx == word.size()) return true;
    if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size()) return false;
    if (board[r][c] != word[idx]) return false;
    char tmp = board[r][c];
    board[r][c] = '#';
    bool found = dfs(board, word, r+1, c, idx+1)
              || dfs(board, word, r-1, c, idx+1)
              || dfs(board, word, r, c+1, idx+1)
              || dfs(board, word, r, c-1, idx+1);
    board[r][c] = tmp;
    return found;
}`,

      pythonCode: `def findWords(board: List[List[str]], words: List[str]) -> List[str]:
    result = []
    for word in words:
        if exists(board, word):
            result.append(word)
    return result

def exists(board, word):
    rows, cols = len(board), len(board[0])
    for r in range(rows):
        for c in range(cols):
            if dfs(board, word, r, c, 0):
                return True
    return False

def dfs(board, word, r, c, idx):
    if idx == len(word):
        return True
    if r < 0 or r >= len(board) or c < 0 or c >= len(board[0]):
        return False
    if board[r][c] != word[idx]:
        return False
    tmp = board[r][c]
    board[r][c] = '#'
    found = (dfs(board, word, r+1, c, idx+1) or
             dfs(board, word, r-1, c, idx+1) or
             dfs(board, word, r, c+1, idx+1) or
             dfs(board, word, r, c-1, idx+1))
    board[r][c] = tmp
    return found`,

      lineAnnotations: {
        2: "Try each word independently",
        3: "If the word can be found on the board, add it",
        8: "For each word, try starting DFS from every cell",
        14: "DFS: base case — matched all characters",
        15: "Out of bounds check",
        16: "Character mismatch — prune",
        17: "Mark cell visited by replacing with '#'",
        19: "Explore all 4 directions recursively",
        22: "Restore cell for backtracking",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: {
            board: [["o","a","t"],["e","t","a"]],
            words: ["oat", "eat"],
          },
          expectedOutput: '["oat","eat"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Start: word='oat'",
              explanation: "We begin searching for the first word 'oat'. We'll try DFS from every cell on the board looking for 'o' as the starting character.",
              variables: { word: "oat", result: "[]", wordsRemaining: 2 },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9, 10],
              shortLabel: "DFS (0,0) 'o' match",
              explanation: "Start DFS at cell (0,0) which contains 'o' — matches first character of 'oat'. Mark (0,0) as visited and look for 'a' in all 4 neighbors.",
              variables: { word: "oat", r: 0, c: 0, idx: 0, char: "o", match: true },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: { "0,0": "active" },
                },
              },
              delta: { changedIndices: ["0,0"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19, 20],
              shortLabel: "DFS (0,1) 'a' match",
              explanation: "Move right to (0,1) which contains 'a' — matches second character. Mark visited. Now look for 't' among neighbors of (0,1).",
              variables: { word: "oat", r: 0, c: 1, idx: 1, char: "a", match: true, path: "o->a" },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: { "0,0": "visited", "0,1": "active" },
                },
              },
              delta: { changedIndices: ["0,1"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [19, 20],
              shortLabel: "DFS (0,2) 't' match",
              explanation: "Move right to (0,2) which contains 't' — matches third and final character of 'oat'. idx+1 == word.length, so we've found 'oat'!",
              variables: { word: "oat", r: 0, c: 2, idx: 2, char: "t", match: true, path: "o->a->t" },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: { "0,0": "found", "0,1": "found", "0,2": "found" },
                },
              },
              delta: { changedIndices: ["0,2"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3],
              shortLabel: "'oat' found! Add to result",
              explanation: "The word 'oat' was found on the board via path (0,0)->(0,1)->(0,2). Add it to the result list. Now move on to the next word 'eat'.",
              variables: { word: "oat", result: '["oat"]', wordsRemaining: 1 },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [2, 8, 9, 10],
              shortLabel: "Search 'eat': DFS (1,0) 'e' match",
              explanation: "Now searching for 'eat'. Try every cell for starting character 'e'. Cell (1,0) contains 'e' — match! Mark visited and look for 'a'.",
              variables: { word: "eat", r: 1, c: 0, idx: 0, char: "e", match: true },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: { "1,0": "active" },
                },
              },
              delta: { changedIndices: ["1,0"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [19, 20],
              shortLabel: "DFS (0,0) 'a'? No, 'o'",
              explanation: "Check neighbor (0,0) for 'a' — but it contains 'o'. Mismatch. Try next neighbor.",
              variables: { word: "eat", r: 0, c: 0, idx: 1, char: "o", needed: "a", match: false },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: { "1,0": "visited", "0,0": "eliminated" },
                },
              },
              delta: { changedIndices: ["0,0"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [19, 20],
              shortLabel: "DFS (1,1) 'a'? No, 't'",
              explanation: "Check neighbor (1,1) for 'a' — it contains 't'. Mismatch. No valid path from (1,0) for 'eat'. Backtrack and try other starting cells.",
              variables: { word: "eat", r: 1, c: 1, idx: 1, char: "t", needed: "a", match: false },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: { "1,0": "visited", "1,1": "eliminated" },
                },
              },
              delta: { changedIndices: ["1,1"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [8, 9, 10],
              shortLabel: "Try other starts for 'eat'...",
              explanation: "No cell on the board starts a valid path for 'eat' using this brute force per-word approach. (In our small board, 'eat' actually can be found via (1,0) isn't working, but (1,2)->(1,1) path doesn't start with 'e'. Let's say 'eat' is not found here.) Actually: e(1,0)->a? The only 'a' neighbors are (0,0)='o' and (1,1)='t'. No 'a' adjacent to 'e'. So 'eat' is NOT on this board.",
              variables: { word: "eat", result: '["oat"]', found: false },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [5],
              shortLabel: "Final result: [\"oat\"]",
              explanation: "All words checked. 'oat' was found, 'eat' was not (no 'a' adjacent to 'e' on this board). Result: [\"oat\"]. Brute force did 2 full board scans — with k=10,000 words this approach is far too slow.",
              variables: { result: '["oat"]' },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","a"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ board, words }) {
        const steps = [];
        const rows = board.length;
        const cols = board[0].length;
        const result = [];

        steps.push({
          stepId: 0, lineNumbers: [1, 2],
          shortLabel: "Start brute force",
          explanation: `Check each of ${words.length} words by running DFS from every cell on the ${rows}x${cols} board.`,
          variables: { wordsCount: words.length, boardSize: `${rows}x${cols}`, result: "[]" },
          dataStructure: {
            treeNodes: {},
            trieHighlightPath: [],
            gridState: { cells: board, highlights: {} },
          },
          delta: {}, isAnswer: false,
        });

        for (const word of words) {
          let found = false;

          for (let r = 0; r < rows && !found; r++) {
            for (let c = 0; c < cols && !found; c++) {
              if (board[r][c] === word[0]) {
                const visited = new Set();
                const path = [];

                const dfs = (row, col, idx) => {
                  if (idx === word.length) return true;
                  if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
                  if (visited.has(`${row},${col}`)) return false;
                  if (board[row][col] !== word[idx]) return false;

                  visited.add(`${row},${col}`);
                  path.push([row, col]);

                  const highlights = {};
                  path.forEach(([pr, pc]) => { highlights[`${pr},${pc}`] = "active"; });

                  steps.push({
                    stepId: steps.length, lineNumbers: [14, 15, 16, 17],
                    shortLabel: `(${row},${col}) '${board[row][col]}' match`,
                    explanation: `DFS for '${word}': cell (${row},${col})='${board[row][col]}' matches character '${word[idx]}' at index ${idx}.`,
                    variables: { word, r: row, c: col, idx, char: board[row][col], pathLen: path.length },
                    dataStructure: {
                      treeNodes: {},
                      trieHighlightPath: [],
                      gridState: { cells: board, highlights },
                    },
                    delta: { changedIndices: [`${row},${col}`] }, isAnswer: false,
                  });

                  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
                  for (const [dr, dc] of dirs) {
                    if (dfs(row + dr, col + dc, idx + 1)) return true;
                  }

                  visited.delete(`${row},${col}`);
                  path.pop();
                  return false;
                };

                if (dfs(r, c, 0)) {
                  found = true;
                  result.push(word);

                  const highlights = {};
                  path.forEach(([pr, pc]) => { highlights[`${pr},${pc}`] = "found"; });

                  steps.push({
                    stepId: steps.length, lineNumbers: [3],
                    shortLabel: `'${word}' found!`,
                    explanation: `Word '${word}' found on the board. Add to result.`,
                    variables: { word, result: JSON.stringify(result) },
                    dataStructure: {
                      treeNodes: {},
                      trieHighlightPath: [],
                      gridState: { cells: board, highlights },
                    },
                    delta: {}, isAnswer: false,
                  });
                }
              }
            }
          }

          if (!found) {
            steps.push({
              stepId: steps.length, lineNumbers: [2, 3],
              shortLabel: `'${word}' not found`,
              explanation: `Word '${word}' cannot be formed on the board.`,
              variables: { word, result: JSON.stringify(result) },
              dataStructure: {
                treeNodes: {},
                trieHighlightPath: [],
                gridState: { cells: board, highlights: {} },
              },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [5],
          shortLabel: `Result: ${JSON.stringify(result)}`,
          explanation: `All words checked. Final result: ${JSON.stringify(result)}.`,
          variables: { result: JSON.stringify(result) },
          dataStructure: {
            treeNodes: {},
            trieHighlightPath: [],
            gridState: { cells: board, highlights: {} },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Trie + Backtracking DFS",
      tier: "optimal",
      timeComplexity: "O(m * n * 4^L)",
      spaceComplexity: "O(sum of word lengths)",
      idea: `Build a Trie from all words. DFS from every cell on the board — at each cell,
        follow the Trie pointer. If the Trie has no child for the current character, prune
        immediately. If we reach a word-end node, add the word to results and remove the
        terminal marker. This searches for ALL words simultaneously.`,

      javaCode: `class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    String word = null;
}

public List<String> findWords(char[][] board, String[] words) {
    TrieNode root = new TrieNode();
    for (String w : words) {
        TrieNode node = root;
        for (char c : w.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.word = w;
    }

    List<String> result = new ArrayList<>();
    for (int r = 0; r < board.length; r++) {
        for (int c = 0; c < board[0].length; c++) {
            dfs(board, r, c, root, result);
        }
    }
    return result;
}

private void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
    char ch = board[r][c];
    if (ch == '#' || !node.children.containsKey(ch)) return;

    node = node.children.get(ch);
    if (node.word != null) {
        result.add(node.word);
        node.word = null;
    }

    board[r][c] = '#';
    dfs(board, r+1, c, node, result);
    dfs(board, r-1, c, node, result);
    dfs(board, r, c+1, node, result);
    dfs(board, r, c-1, node, result);
    board[r][c] = ch;
}`,

      cppCode: `struct TrieNode {
    unordered_map<char, TrieNode*> children;
    string word = "";
};

vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
    TrieNode* root = new TrieNode();
    for (auto& w : words) {
        TrieNode* node = root;
        for (char c : w) {
            if (!node->children.count(c))
                node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->word = w;
    }

    vector<string> result;
    for (int r = 0; r < board.size(); r++) {
        for (int c = 0; c < board[0].size(); c++) {
            dfs(board, r, c, root, result);
        }
    }
    return result;
}

void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& result) {
    if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size()) return;
    char ch = board[r][c];
    if (ch == '#' || !node->children.count(ch)) return;

    node = node->children[ch];
    if (!node->word.empty()) {
        result.push_back(node->word);
        node->word = "";
    }

    board[r][c] = '#';
    dfs(board, r+1, c, node, result);
    dfs(board, r-1, c, node, result);
    dfs(board, r, c+1, node, result);
    dfs(board, r, c-1, node, result);
    board[r][c] = ch;
}`,

      pythonCode: `def findWords(board: List[List[str]], words: List[str]) -> List[str]:
    root = {}
    for w in words:
        node = root
        for c in w:
            node = node.setdefault(c, {})
        node['#'] = w

    result = []
    rows, cols = len(board), len(board[0])

    def dfs(r, c, node):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        ch = board[r][c]
        if ch not in node:
            return

        child = node[ch]
        if '#' in child:
            result.append(child['#'])
            del child['#']

        board[r][c] = '.'
        dfs(r+1, c, child)
        dfs(r-1, c, child)
        dfs(r, c+1, child)
        dfs(r, c-1, child)
        board[r][c] = ch

        if not child:
            del node[ch]

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)

    return result`,

      lineAnnotations: {
        1:  "TrieNode: each node has children map and optional complete word",
        6:  "Build Trie from all words",
        8:  "Insert each word character by character",
        9:  "Create child node if it doesn't exist",
        10: "Move to child node",
        12: "Mark terminal node with the complete word",
        15: "DFS from every cell — searches for ALL words at once",
        22: "Bounds check and visited check (# = visited)",
        23: "If Trie has no child for this character, prune entire branch",
        25: "Follow the Trie pointer to the matching child",
        26: "If this node is a terminal — we found a complete word!",
        27: "Add word to result",
        28: "Remove terminal marker to avoid duplicates",
        31: "Mark cell visited and explore all 4 directions",
        36: "Restore cell for other DFS paths (backtrack)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Small board with two findable words sharing prefix",
          input: {
            board: [["o","a","t"],["e","t","h"]],
            words: ["oath", "oat"],
          },
          expectedOutput: '["oat","oath"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [6, 7, 8, 9, 10, 12],
              shortLabel: "Build Trie",
              explanation: "Insert all words into a Trie. 'oath' and 'oat' share the prefix 'oat'. The Trie has: root->o->a->t (word='oat')->h (word='oath'). Two words, one shared path up to 't'.",
              variables: { words: '["oath","oat"]', trieSize: 5 },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["o"], state: "default", depth: 0 },
                  o: { val: "o", children: ["a"], state: "default", depth: 1 },
                  a: { val: "a", children: ["t"], state: "default", depth: 2 },
                  t: { val: "t", children: ["h"], state: "default", depth: 3, word: "oat" },
                  h: { val: "h", children: [], state: "default", depth: 4, word: "oath" },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","h"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [15, 16, 17],
              shortLabel: "DFS from (0,0)",
              explanation: "Start DFS from cell (0,0) which contains 'o'. Check if root has child 'o' in the Trie — yes it does. Follow the Trie pointer to node 'o'.",
              variables: { r: 0, c: 0, char: "o", trieChild: true, result: "[]" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["o"], state: "default", depth: 0 },
                  o: { val: "o", children: ["a"], state: "active", depth: 1 },
                  a: { val: "a", children: ["t"], state: "default", depth: 2 },
                  t: { val: "t", children: ["h"], state: "default", depth: 3, word: "oat" },
                  h: { val: "h", children: [], state: "default", depth: 4, word: "oath" },
                },
                trieHighlightPath: ["o"],
                gridState: {
                  cells: [["o","a","t"],["e","t","h"]],
                  highlights: { "0,0": "active" },
                },
              },
              delta: { changedIndices: ["0,0"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [22, 23, 25],
              shortLabel: "DFS (0,0)->(0,1) 'a'",
              explanation: "From (0,0), explore neighbor (0,1) which contains 'a'. Trie node 'o' has child 'a' — follow it. Now at Trie node 'a', board path is o->a.",
              variables: { r: 0, c: 1, char: "a", trieChild: true, path: "o->a" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["o"], state: "default", depth: 0 },
                  o: { val: "o", children: ["a"], state: "visited", depth: 1 },
                  a: { val: "a", children: ["t"], state: "active", depth: 2 },
                  t: { val: "t", children: ["h"], state: "default", depth: 3, word: "oat" },
                  h: { val: "h", children: [], state: "default", depth: 4, word: "oath" },
                },
                trieHighlightPath: ["o", "a"],
                gridState: {
                  cells: [["o","a","t"],["e","t","h"]],
                  highlights: { "0,0": "visited", "0,1": "active" },
                },
              },
              delta: { changedIndices: ["0,1"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [22, 23, 25, 26, 27],
              shortLabel: "DFS (0,1)->(0,2) 't' — FOUND 'oat'!",
              explanation: "From (0,1), explore (0,2) which contains 't'. Trie node 'a' has child 't' — follow it. Node 't' has word='oat' — we found a complete word! Add 'oat' to results and remove the terminal marker to avoid finding it again.",
              variables: { r: 0, c: 2, char: "t", word: "oat", result: '["oat"]', path: "o->a->t" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["o"], state: "default", depth: 0 },
                  o: { val: "o", children: ["a"], state: "visited", depth: 1 },
                  a: { val: "a", children: ["t"], state: "visited", depth: 2 },
                  t: { val: "t", children: ["h"], state: "found", depth: 3 },
                  h: { val: "h", children: [], state: "default", depth: 4, word: "oath" },
                },
                trieHighlightPath: ["o", "a", "t"],
                gridState: {
                  cells: [["o","a","t"],["e","t","h"]],
                  highlights: { "0,0": "visited", "0,1": "visited", "0,2": "found" },
                },
              },
              delta: { changedIndices: ["0,2"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [31, 32, 33, 34, 35],
              shortLabel: "Continue DFS: (0,2)->(1,2) 'h'",
              explanation: "Even after finding 'oat', we keep going — Trie node 't' still has child 'h', meaning 'oath' might be reachable. Explore (1,2) which contains 'h'. Trie node 't' has child 'h' — follow it.",
              variables: { r: 1, c: 2, char: "h", trieChild: true, path: "o->a->t->h" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["o"], state: "default", depth: 0 },
                  o: { val: "o", children: ["a"], state: "visited", depth: 1 },
                  a: { val: "a", children: ["t"], state: "visited", depth: 2 },
                  t: { val: "t", children: ["h"], state: "visited", depth: 3 },
                  h: { val: "h", children: [], state: "active", depth: 4, word: "oath" },
                },
                trieHighlightPath: ["o", "a", "t", "h"],
                gridState: {
                  cells: [["o","a","t"],["e","t","h"]],
                  highlights: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,2": "active" },
                },
              },
              delta: { changedIndices: ["1,2"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [26, 27, 28],
              shortLabel: "FOUND 'oath'!",
              explanation: "Trie node 'h' has word='oath' — another complete word found! Add 'oath' to results. Remove terminal marker. Node 'h' now has no children and no word — it can be pruned from the Trie.",
              variables: { r: 1, c: 2, char: "h", word: "oath", result: '["oat","oath"]' },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["o"], state: "default", depth: 0 },
                  o: { val: "o", children: ["a"], state: "visited", depth: 1 },
                  a: { val: "a", children: ["t"], state: "visited", depth: 2 },
                  t: { val: "t", children: ["h"], state: "visited", depth: 3 },
                  h: { val: "h", children: [], state: "found", depth: 4 },
                },
                trieHighlightPath: ["o", "a", "t", "h"],
                gridState: {
                  cells: [["o","a","t"],["e","t","h"]],
                  highlights: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "1,2": "found" },
                },
              },
              delta: { changedIndices: ["1,2"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [36],
              shortLabel: "Backtrack, restore cells",
              explanation: "DFS is complete from (0,0). Backtrack and restore all cells. Both 'oat' and 'oath' were found from a SINGLE DFS traversal starting at (0,0) — that's the power of the Trie. No need to scan the board twice.",
              variables: { result: '["oat","oath"]' },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["o"], state: "default", depth: 0 },
                  o: { val: "o", children: ["a"], state: "default", depth: 1 },
                  a: { val: "a", children: ["t"], state: "default", depth: 2 },
                  t: { val: "t", children: [], state: "default", depth: 3 },
                  h: { val: "h", children: [], state: "eliminated", depth: 4 },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","h"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [15, 16, 17],
              shortLabel: "Remaining cells: all pruned",
              explanation: "We continue DFS from remaining cells (0,1), (0,2), (1,0), (1,1), (1,2) — but the Trie has been pruned. Since both words are found and their terminal markers removed, these DFS calls terminate immediately. Final result: [\"oat\", \"oath\"].",
              variables: { result: '["oat","oath"]' },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: [], state: "default", depth: 0 },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["o","a","t"],["e","t","h"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Matches",
          description: "None of the words exist on the board — Trie prunes immediately",
          input: {
            board: [["a","b"],["c","d"]],
            words: ["xyz", "pqr"],
          },
          expectedOutput: "[]",
          commonMistake: "Not pruning early — without a Trie, you'd still run full DFS for each word even though no first character matches. The Trie lets us skip entire words if the root has no matching child.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [6, 7, 8, 9, 10, 12],
              shortLabel: "Build Trie",
              explanation: "Insert 'xyz' and 'pqr' into the Trie. Root has children 'x' and 'p'. Note: the board only contains a, b, c, d — none of which are in the Trie's root children.",
              variables: { words: '["xyz","pqr"]', trieSize: 7 },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["x", "p"], state: "default", depth: 0 },
                  x: { val: "x", children: ["y"], state: "default", depth: 1 },
                  y: { val: "y", children: ["z"], state: "default", depth: 2 },
                  z: { val: "z", children: [], state: "default", depth: 3, word: "xyz" },
                  p: { val: "p", children: ["q"], state: "default", depth: 1 },
                  q: { val: "q", children: ["r"], state: "default", depth: 2 },
                  r: { val: "r", children: [], state: "default", depth: 3, word: "pqr" },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["a","b"],["c","d"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [15, 16, 17, 22, 23],
              shortLabel: "DFS (0,0) 'a' — not in Trie",
              explanation: "Start DFS from (0,0) which contains 'a'. Check root's children: root has 'x' and 'p', but NOT 'a'. Pruned instantly — no DFS deeper into the board. This is the Trie's power: one check eliminates all words.",
              variables: { r: 0, c: 0, char: "a", trieChild: false, result: "[]" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["x", "p"], state: "active", depth: 0 },
                  x: { val: "x", children: ["y"], state: "default", depth: 1 },
                  y: { val: "y", children: ["z"], state: "default", depth: 2 },
                  z: { val: "z", children: [], state: "default", depth: 3, word: "xyz" },
                  p: { val: "p", children: ["q"], state: "default", depth: 1 },
                  q: { val: "q", children: ["r"], state: "default", depth: 2 },
                  r: { val: "r", children: [], state: "default", depth: 3, word: "pqr" },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["a","b"],["c","d"]],
                  highlights: { "0,0": "eliminated" },
                },
              },
              delta: { changedIndices: ["0,0"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [22, 23],
              shortLabel: "DFS (0,1) 'b' — not in Trie",
              explanation: "Cell (0,1) contains 'b'. Root has no child 'b'. Pruned instantly.",
              variables: { r: 0, c: 1, char: "b", trieChild: false, result: "[]" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["x", "p"], state: "active", depth: 0 },
                  x: { val: "x", children: ["y"], state: "default", depth: 1 },
                  y: { val: "y", children: ["z"], state: "default", depth: 2 },
                  z: { val: "z", children: [], state: "default", depth: 3, word: "xyz" },
                  p: { val: "p", children: ["q"], state: "default", depth: 1 },
                  q: { val: "q", children: ["r"], state: "default", depth: 2 },
                  r: { val: "r", children: [], state: "default", depth: 3, word: "pqr" },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["a","b"],["c","d"]],
                  highlights: { "0,0": "eliminated", "0,1": "eliminated" },
                },
              },
              delta: { changedIndices: ["0,1"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [22, 23],
              shortLabel: "DFS (1,0) 'c', (1,1) 'd' — pruned",
              explanation: "Cells (1,0)='c' and (1,1)='d' — neither is in the Trie root's children. All 4 cells checked, all pruned in O(1). Zero words found. Without the Trie, we'd have run 2 full DFS traversals — one per word.",
              variables: { result: "[]" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["x", "p"], state: "default", depth: 0 },
                  x: { val: "x", children: ["y"], state: "default", depth: 1 },
                  y: { val: "y", children: ["z"], state: "default", depth: 2 },
                  z: { val: "z", children: [], state: "default", depth: 3, word: "xyz" },
                  p: { val: "p", children: ["q"], state: "default", depth: 1 },
                  q: { val: "q", children: ["r"], state: "default", depth: 2 },
                  r: { val: "r", children: [], state: "default", depth: 3, word: "pqr" },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["a","b"],["c","d"]],
                  highlights: { "0,0": "eliminated", "0,1": "eliminated", "1,0": "eliminated", "1,1": "eliminated" },
                },
              },
              delta: { changedIndices: ["1,0", "1,1"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [18],
              shortLabel: "Result: []",
              explanation: "No words found on the board. The Trie allowed us to reject every cell in O(1) per cell — 4 checks total, regardless of how many words were in the list. This is dramatically faster than running separate DFS for each word.",
              variables: { result: "[]" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["x", "p"], state: "default", depth: 0 },
                  x: { val: "x", children: ["y"], state: "eliminated", depth: 1 },
                  y: { val: "y", children: ["z"], state: "eliminated", depth: 2 },
                  z: { val: "z", children: [], state: "eliminated", depth: 3, word: "xyz" },
                  p: { val: "p", children: ["q"], state: "eliminated", depth: 1 },
                  q: { val: "q", children: ["r"], state: "eliminated", depth: 2 },
                  r: { val: "r", children: [], state: "eliminated", depth: 3, word: "pqr" },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["a","b"],["c","d"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Shared Prefix, One Missing",
          description: "Words share a prefix but only one exists — tests Trie pruning after partial match",
          input: {
            board: [["c","a","t"],["d","o","g"]],
            words: ["cat", "car"],
          },
          expectedOutput: '["cat"]',
          commonMistake: "Not pruning Trie branches after finding a word. After finding 'cat', if 'car' shares the prefix 'ca' but 'r' is not adjacent to (0,1), we must backtrack cleanly without corrupting state.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [6, 7, 8, 9, 10, 12],
              shortLabel: "Build Trie: 'cat', 'car'",
              explanation: "Insert 'cat' and 'car' into the Trie. They share prefix 'ca': root->c->a->{t (word='cat'), r (word='car')}. The 'a' node has two children.",
              variables: { words: '["cat","car"]', trieSize: 5 },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["c"], state: "default", depth: 0 },
                  c: { val: "c", children: ["a"], state: "default", depth: 1 },
                  a: { val: "a", children: ["t_end", "r_end"], state: "default", depth: 2 },
                  t_end: { val: "t", children: [], state: "default", depth: 3, word: "cat" },
                  r_end: { val: "r", children: [], state: "default", depth: 3, word: "car" },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["c","a","t"],["d","o","g"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [15, 16, 17, 22, 23, 25],
              shortLabel: "DFS (0,0) 'c' — in Trie",
              explanation: "Start DFS from (0,0) which contains 'c'. Root has child 'c' — follow the Trie pointer. Mark (0,0) visited.",
              variables: { r: 0, c: 0, char: "c", trieChild: true, path: "c" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["c"], state: "default", depth: 0 },
                  c: { val: "c", children: ["a"], state: "active", depth: 1 },
                  a: { val: "a", children: ["t_end", "r_end"], state: "default", depth: 2 },
                  t_end: { val: "t", children: [], state: "default", depth: 3, word: "cat" },
                  r_end: { val: "r", children: [], state: "default", depth: 3, word: "car" },
                },
                trieHighlightPath: ["c"],
                gridState: {
                  cells: [["c","a","t"],["d","o","g"]],
                  highlights: { "0,0": "active" },
                },
              },
              delta: { changedIndices: ["0,0"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [25],
              shortLabel: "DFS (0,0)->(0,1) 'a'",
              explanation: "Explore neighbor (0,1) which contains 'a'. Trie node 'c' has child 'a' — follow it. Now at Trie node 'a' which has two children: 't' and 'r'. Both words are still possible!",
              variables: { r: 0, c: 1, char: "a", trieChild: true, path: "c->a", possibleWords: '["cat","car"]' },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["c"], state: "default", depth: 0 },
                  c: { val: "c", children: ["a"], state: "visited", depth: 1 },
                  a: { val: "a", children: ["t_end", "r_end"], state: "active", depth: 2 },
                  t_end: { val: "t", children: [], state: "default", depth: 3, word: "cat" },
                  r_end: { val: "r", children: [], state: "default", depth: 3, word: "car" },
                },
                trieHighlightPath: ["c", "a"],
                gridState: {
                  cells: [["c","a","t"],["d","o","g"]],
                  highlights: { "0,0": "visited", "0,1": "active" },
                },
              },
              delta: { changedIndices: ["0,1"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [25, 26, 27, 28],
              shortLabel: "DFS (0,1)->(0,2) 't' — FOUND 'cat'!",
              explanation: "Explore (0,2) which contains 't'. Trie node 'a' has child 't' — follow it. Node 't' has word='cat'. Found! Add 'cat' to results. Remove terminal marker from 't' node.",
              variables: { r: 0, c: 2, char: "t", word: "cat", result: '["cat"]', path: "c->a->t" },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["c"], state: "default", depth: 0 },
                  c: { val: "c", children: ["a"], state: "visited", depth: 1 },
                  a: { val: "a", children: ["t_end", "r_end"], state: "visited", depth: 2 },
                  t_end: { val: "t", children: [], state: "found", depth: 3 },
                  r_end: { val: "r", children: [], state: "default", depth: 3, word: "car" },
                },
                trieHighlightPath: ["c", "a", "t_end"],
                gridState: {
                  cells: [["c","a","t"],["d","o","g"]],
                  highlights: { "0,0": "visited", "0,1": "visited", "0,2": "found" },
                },
              },
              delta: { changedIndices: ["0,2"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [31, 32, 33, 34, 35],
              shortLabel: "Check neighbors of (0,2) for 'r'",
              explanation: "Node 't' has no more children (after removing word marker), so no further DFS from (0,2). Backtrack to (0,1). Now check other neighbors of (0,1) for 'r' (the other child of Trie node 'a'). Neighbors: (0,0)='c' visited, (0,2)='t' visited, (1,1)='o'. None is 'r'.",
              variables: { trieNode: "a", lookingFor: "r", neighbors: "o (1,1)", match: false },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["c"], state: "default", depth: 0 },
                  c: { val: "c", children: ["a"], state: "visited", depth: 1 },
                  a: { val: "a", children: ["t_end", "r_end"], state: "active", depth: 2 },
                  t_end: { val: "t", children: [], state: "found", depth: 3 },
                  r_end: { val: "r", children: [], state: "eliminated", depth: 3, word: "car" },
                },
                trieHighlightPath: ["c", "a"],
                gridState: {
                  cells: [["c","a","t"],["d","o","g"]],
                  highlights: { "0,0": "visited", "0,1": "active", "1,1": "eliminated" },
                },
              },
              delta: { changedIndices: ["1,1"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [36],
              shortLabel: "Backtrack from (0,0)",
              explanation: "No 'r' neighbor found from (0,1), so 'car' cannot be formed starting from (0,0). Backtrack fully, restore all cells. The word 'car' requires an 'r' adjacent to an 'a' that is adjacent to a 'c' — our board doesn't have that.",
              variables: { result: '["cat"]' },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["c"], state: "default", depth: 0 },
                  c: { val: "c", children: ["a"], state: "default", depth: 1 },
                  a: { val: "a", children: ["r_end"], state: "default", depth: 2 },
                  t_end: { val: "t", children: [], state: "eliminated", depth: 3 },
                  r_end: { val: "r", children: [], state: "default", depth: 3, word: "car" },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["c","a","t"],["d","o","g"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [15, 16, 17, 22, 23],
              shortLabel: "Remaining cells: all pruned",
              explanation: "Continue DFS from cells (0,1)='a', (0,2)='t', (1,0)='d', (1,1)='o', (1,2)='g'. Root only has child 'c', so cells a, t, d, o, g are all pruned instantly. Only (0,0)='c' was ever explored deeply.",
              variables: { result: '["cat"]' },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: ["c"], state: "default", depth: 0 },
                  c: { val: "c", children: ["a"], state: "default", depth: 1 },
                  a: { val: "a", children: ["r_end"], state: "default", depth: 2 },
                  r_end: { val: "r", children: [], state: "eliminated", depth: 3, word: "car" },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["c","a","t"],["d","o","g"]],
                  highlights: { "0,1": "eliminated", "0,2": "eliminated", "1,0": "eliminated", "1,1": "eliminated", "1,2": "eliminated" },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [18],
              shortLabel: "Result: [\"cat\"]",
              explanation: "All cells checked. 'cat' was found via path (0,0)->(0,1)->(0,2). 'car' was not found — no 'r' is adjacent to 'a' on the board. Final result: [\"cat\"]. One DFS traversal searched for both words simultaneously.",
              variables: { result: '["cat"]' },
              dataStructure: {
                treeNodes: {
                  root: { val: "root", children: [], state: "default", depth: 0 },
                },
                trieHighlightPath: [],
                gridState: {
                  cells: [["c","a","t"],["d","o","g"]],
                  highlights: {},
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ board, words }) {
        const steps = [];
        const rows = board.length;
        const cols = board[0].length;

        // Build Trie
        const root = {};
        const trieNodeMap = { root: { val: "root", children: [], state: "default", depth: 0 } };
        let nodeIdCounter = 0;

        for (const w of words) {
          let node = root;
          let parentId = "root";
          for (let ci = 0; ci < w.length; ci++) {
            const c = w[ci];
            if (!node[c]) {
              node[c] = {};
              const nodeId = `${c}_${nodeIdCounter++}`;
              node[c]._id = nodeId;
              trieNodeMap[nodeId] = { val: c, children: [], state: "default", depth: ci + 1 };
              trieNodeMap[parentId].children.push(nodeId);
            }
            parentId = node[c]._id;
            node = node[c];
          }
          node._word = w;
          if (trieNodeMap[node._id]) {
            trieNodeMap[node._id].word = w;
          }
        }

        steps.push({
          stepId: 0, lineNumbers: [6, 7, 8, 9, 10, 12],
          shortLabel: "Build Trie",
          explanation: `Insert ${words.length} word(s) into Trie: ${JSON.stringify(words)}. Words sharing prefixes share Trie nodes, reducing redundant work.`,
          variables: { words: JSON.stringify(words), trieNodes: Object.keys(trieNodeMap).length },
          dataStructure: {
            treeNodes: JSON.parse(JSON.stringify(trieNodeMap)),
            trieHighlightPath: [],
            gridState: { cells: board, highlights: {} },
          },
          delta: {}, isAnswer: false,
        });

        const result = [];
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

        const dfs = (r, c, node, path, triePathIds) => {
          if (r < 0 || r >= rows || c < 0 || c >= cols) return;
          if (visited[r][c]) return;
          const ch = board[r][c];
          if (!node[ch]) {
            const highlights = {};
            path.forEach(([pr, pc]) => { highlights[`${pr},${pc}`] = "visited"; });
            highlights[`${r},${c}`] = "eliminated";

            steps.push({
              stepId: steps.length, lineNumbers: [22, 23],
              shortLabel: `(${r},${c}) '${ch}' not in Trie`,
              explanation: `Cell (${r},${c})='${ch}' has no matching child in current Trie node. Prune this branch.`,
              variables: { r, c, char: ch, trieChild: false },
              dataStructure: {
                treeNodes: JSON.parse(JSON.stringify(trieNodeMap)),
                trieHighlightPath: [...triePathIds],
                gridState: { cells: board, highlights },
              },
              delta: { changedIndices: [`${r},${c}`] }, isAnswer: false,
            });
            return;
          }

          const childNode = node[ch];
          const childId = childNode._id;
          const newPath = [...path, [r, c]];
          const newTriePath = [...triePathIds, childId];

          visited[r][c] = true;

          const highlights = {};
          newPath.forEach(([pr, pc], idx) => {
            highlights[`${pr},${pc}`] = idx === newPath.length - 1 ? "active" : "visited";
          });

          if (trieNodeMap[childId]) trieNodeMap[childId].state = "active";

          steps.push({
            stepId: steps.length, lineNumbers: [25],
            shortLabel: `(${r},${c}) '${ch}' match`,
            explanation: `Cell (${r},${c})='${ch}' matches Trie child. Follow Trie pointer deeper.`,
            variables: { r, c, char: ch, pathLen: newPath.length, result: JSON.stringify(result) },
            dataStructure: {
              treeNodes: JSON.parse(JSON.stringify(trieNodeMap)),
              trieHighlightPath: newTriePath,
              gridState: { cells: board, highlights },
            },
            delta: { changedIndices: [`${r},${c}`] }, isAnswer: false,
          });

          if (childNode._word) {
            result.push(childNode._word);
            const foundWord = childNode._word;
            childNode._word = null;
            if (trieNodeMap[childId]) {
              trieNodeMap[childId].state = "found";
              delete trieNodeMap[childId].word;
            }

            const fHighlights = {};
            newPath.forEach(([pr, pc]) => { fHighlights[`${pr},${pc}`] = "found"; });

            steps.push({
              stepId: steps.length, lineNumbers: [26, 27, 28],
              shortLabel: `FOUND '${foundWord}'!`,
              explanation: `Reached terminal Trie node — word '${foundWord}' found on the board! Add to results and remove terminal marker.`,
              variables: { word: foundWord, result: JSON.stringify(result) },
              dataStructure: {
                treeNodes: JSON.parse(JSON.stringify(trieNodeMap)),
                trieHighlightPath: newTriePath,
                gridState: { cells: board, highlights: fHighlights },
              },
              delta: {}, isAnswer: false,
            });
          }

          const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
          for (const [dr, dc] of dirs) {
            dfs(r + dr, c + dc, childNode, newPath, newTriePath);
          }

          visited[r][c] = false;
          if (trieNodeMap[childId]) trieNodeMap[childId].state = "default";
        };

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            dfs(r, c, root, [], []);
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [18],
          shortLabel: `Result: ${JSON.stringify(result)}`,
          explanation: `All cells explored. Final result: ${JSON.stringify(result)}.`,
          variables: { result: JSON.stringify(result) },
          dataStructure: {
            treeNodes: JSON.parse(JSON.stringify(trieNodeMap)),
            trieHighlightPath: [],
            gridState: { cells: board, highlights: {} },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: {
      time: "O(k * m * n * 4^L)",
      space: "O(L)",
      explanation: "For each of k words, DFS from every cell. Each DFS explores up to 4^L paths. L = max word length.",
    },
    optimal: {
      time: "O(m * n * 4^L)",
      space: "O(sum of word lengths)",
      explanation: "Build Trie in O(total chars). DFS from each cell follows Trie — shared prefix means shared work. Trie pruning progressively reduces search space.",
      tradeoff: "The Trie uses O(total chars) space but eliminates the factor of k (number of words) from the time complexity. For k=10,000 words this is transformative.",
    },
  },

  interviewTips: [
    "Start by stating the brute force: DFS per word is O(k * m * n * 4^L) — too slow for large word lists.",
    "Explain the key insight: a Trie merges all words into one structure, so DFS searches for all words simultaneously.",
    "Mention the optimization of removing terminal markers after finding a word to avoid duplicates and shrink the Trie.",
    "Discuss pruning empty Trie branches: if a node has no children and no word, delete it to speed up future DFS calls.",
    "Ask clarifying questions: 'Are all words unique?', 'Can words overlap on the board?', 'What's the max word length?'",
    "When walking through the algorithm, emphasize that one DFS from a cell can find MULTIPLE words if they share a prefix.",
    "Mention the backtracking detail: mark cells visited with '#' during DFS and restore after — critical for correctness.",
  ],

  relatedProblems: ["implement-trie", "add-search-words", "word-search"],
};
