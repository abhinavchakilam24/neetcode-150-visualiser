export const implementTrie = {
  id: 61,
  slug: "implement-trie",
  title: "Implement Trie (Prefix Tree)",
  difficulty: "Medium",
  topic: "tries",
  topicLabel: "Tries",
  neetcodeNumber: 61,
  artifactType: "Trie",
  companies: ["Google", "Amazon", "Microsoft", "Meta", "Uber"],
  leetcodeLink: "https://leetcode.com/problems/implement-trie-prefix-tree/",

  pattern: "Trie Node with Children Map",
  patternExplanation: `A Trie stores strings character by character in a tree. Each node has
    up to 26 children (for lowercase English). Insertion, search, and prefix-check all run
    in O(L) where L is the word length — independent of how many words are stored.`,

  intuition: {
    coreInsight: `A Trie is a tree where each edge represents a character. To insert "apple",
      we walk from root: a→p→p→l→e, creating nodes as needed, and mark the final node as
      a word-end. To search, walk the same path — if every node exists and the last is marked
      as word-end, the word exists. For startsWith, we just check that the path exists.`,

    mentalModel: `Think of a dictionary's index tabs. The first tab separates by first letter
      (a, b, c...), the second level by second letter, and so on. To look up "apple", you go
      to the 'a' tab, then 'p', then 'p', then 'l', then 'e'. Each tab level is a Trie node.
      Some tab positions have a bookmark saying "this is a complete word" (isEnd flag).`,

    whyNaiveFails: `Storing words in a HashSet gives O(L) search but O(N*L) to check all
      prefixes (check every word). A sorted array needs O(L log N) for binary search. A Trie
      gives O(L) for all three operations AND efficiently supports prefix queries and
      autocomplete — no other structure does all three in O(L).`,

    keyObservation: `The isEnd boolean is critical. Without it, searching for "app" would
      return true just because "apple" exists (the path a→p→p exists). The isEnd flag at the
      'p' node for "app" distinguishes "this is a stored word" from "this is just a prefix
      of another word."`,
  },

  problem: `A trie (pronounced "try") or prefix tree is a tree data structure used to efficiently
    store and retrieve keys in a dataset of strings. Implement the Trie class:
    Trie() Initializes the trie object.
    void insert(String word) Inserts the string word into the trie.
    boolean search(String word) Returns true if the string word is in the trie, false otherwise.
    boolean startsWith(String prefix) Returns true if there is a previously inserted string that
    has the prefix prefix, and false otherwise.`,

  examples: [
    {
      input: `["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]`,
      output: "[null, null, true, false, true, null, true]",
      explanation: "Insert 'apple'. Search 'apple'→true. Search 'app'→false (not inserted). startsWith 'app'→true. Insert 'app'. Search 'app'→true.",
    },
  ],

  constraints: [
    "1 <= word.length, prefix.length <= 2000",
    "word and prefix consist only of lowercase English letters.",
    "At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Trie with TrieNode",
      tier: "optimal",
      timeComplexity: "O(L) per operation",
      spaceComplexity: "O(N × L) total",
      idea: `Each TrieNode has a children map (or array of size 26) and an isEnd flag.
        Insert: walk/create nodes for each character, mark last as isEnd.
        Search: walk existing nodes; return true only if path exists AND last node isEnd.
        StartsWith: walk existing nodes; return true if path exists (ignore isEnd).`,

      javaCode: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new TrieNode();
            }
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return node.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return true;
    }
}`,

      cppCode: `class TrieNode {
public:
    TrieNode* children[26] = {};
    bool isEnd = false;
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }

    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!node->children[idx])
                node->children[idx] = new TrieNode();
            node = node->children[idx];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!node->children[idx]) return false;
            node = node->children[idx];
        }
        return node->isEnd;
    }

    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!node->children[idx]) return false;
            node = node->children[idx];
        }
        return true;
    }
};`,

      pythonCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.is_end

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True`,

      lineAnnotations: {
        1: "TrieNode: 26 children slots + end-of-word flag",
        9: "Initialize Trie with empty root node",
        13: "Insert: traverse/create nodes for each character",
        16: "If child doesn't exist, create a new TrieNode",
        19: "Move to the child node",
        21: "Mark the last node as end of a complete word",
        24: "Search: traverse existing nodes",
        27: "If child missing, word doesn't exist",
        30: "Word exists only if path exists AND last node is marked as end",
        33: "StartsWith: same as search but don't check isEnd",
        38: "Path exists → some word starts with this prefix",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Insert 'apple', search 'apple', search 'app', startsWith 'app'",
          input: { operations: ["insert apple", "search apple", "search app", "startsWith app"] },
          expectedOutput: "[null, true, false, true]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [9],
              shortLabel: "Init Trie",
              explanation: "Create Trie with empty root node. No children yet.",
              variables: { operation: "Trie()" },
              dataStructure: {
                trieNodes: [{ id: "root", label: "root", children: {}, isEnd: false, state: "default" }],
                currentPath: [],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [13, 14, 15, 16, 17, 19],
              shortLabel: "insert('apple') — walk a→p→p→l→e",
              explanation: "Insert 'apple': starting at root, create child nodes a→p→p→l→e. Each character becomes an edge in the trie. Creating 5 new nodes.",
              variables: { operation: "insert", word: "apple", charIndex: "0-4" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { p: "ap" }, isEnd: false, state: "visited" },
                  { id: "ap", label: "p", children: { p: "app" }, isEnd: false, state: "visited" },
                  { id: "app", label: "p", children: { l: "appl" }, isEnd: false, state: "visited" },
                  { id: "appl", label: "l", children: { e: "apple" }, isEnd: false, state: "visited" },
                  { id: "apple", label: "e", children: {}, isEnd: false, state: "active" },
                ],
                currentPath: ["root", "a", "ap", "app", "appl", "apple"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [21],
              shortLabel: "Mark 'e' node as isEnd=true",
              explanation: "After traversing all characters of 'apple', mark the final 'e' node as isEnd=true. This means 'apple' is a complete word in the trie.",
              variables: { operation: "insert", word: "apple", isEnd: true },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { p: "ap" }, isEnd: false, state: "default" },
                  { id: "ap", label: "p", children: { p: "app" }, isEnd: false, state: "default" },
                  { id: "app", label: "p", children: { l: "appl" }, isEnd: false, state: "default" },
                  { id: "appl", label: "l", children: { e: "apple" }, isEnd: false, state: "default" },
                  { id: "apple", label: "e", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "a", "ap", "app", "appl", "apple"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [24, 25, 26, 27, 28, 30],
              shortLabel: "search('apple') → true",
              explanation: "Search 'apple': walk root→a→p→p→l→e. Every node exists. Final node 'e' has isEnd=true. Return true — 'apple' is in the trie!",
              variables: { operation: "search", word: "apple", result: true },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { p: "ap" }, isEnd: false, state: "visited" },
                  { id: "ap", label: "p", children: { p: "app" }, isEnd: false, state: "visited" },
                  { id: "app", label: "p", children: { l: "appl" }, isEnd: false, state: "visited" },
                  { id: "appl", label: "l", children: { e: "apple" }, isEnd: false, state: "visited" },
                  { id: "apple", label: "e", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "a", "ap", "app", "appl", "apple"],
                searchResult: true,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [24, 25, 26, 27, 28, 30],
              shortLabel: "search('app') → false",
              explanation: "Search 'app': walk root→a→p→p. All nodes exist. BUT the 'p' node at depth 3 has isEnd=false. 'app' was never inserted as a complete word. Return false.",
              variables: { operation: "search", word: "app", result: false, isEnd: false },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { p: "ap" }, isEnd: false, state: "visited" },
                  { id: "ap", label: "p", children: { p: "app" }, isEnd: false, state: "visited" },
                  { id: "app", label: "p", children: { l: "appl" }, isEnd: false, state: "eliminated" },
                  { id: "appl", label: "l", children: { e: "apple" }, isEnd: false, state: "default" },
                  { id: "apple", label: "e", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "a", "ap", "app"],
                searchResult: false,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [33, 34, 35, 36, 37, 38],
              shortLabel: "startsWith('app') → true",
              explanation: "startsWith 'app': walk root→a→p→p. All nodes exist. For startsWith we DON'T check isEnd — the path existing is sufficient. Return true. Some word starts with 'app' (namely 'apple').",
              variables: { operation: "startsWith", prefix: "app", result: true },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { p: "ap" }, isEnd: false, state: "visited" },
                  { id: "ap", label: "p", children: { p: "app" }, isEnd: false, state: "visited" },
                  { id: "app", label: "p", children: { l: "appl" }, isEnd: false, state: "found" },
                  { id: "appl", label: "l", children: { e: "apple" }, isEnd: false, state: "default" },
                  { id: "apple", label: "e", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "a", "ap", "app"],
                searchResult: true,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Search Missing Word",
          description: "Search for a word that doesn't exist — path breaks midway",
          input: { operations: ["insert apple", "search apply"] },
          expectedOutput: "[null, false]",
          commonMistake: "Forgetting to check for null children during traversal and getting a NullPointerException.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [13, 14, 15, 16, 17, 19, 21],
              shortLabel: "insert('apple')",
              explanation: "Insert 'apple': create path root→a→p→p→l→e with isEnd=true at 'e'.",
              variables: { operation: "insert", word: "apple" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { p: "ap" }, isEnd: false, state: "default" },
                  { id: "ap", label: "p", children: { p: "app" }, isEnd: false, state: "default" },
                  { id: "app", label: "p", children: { l: "appl" }, isEnd: false, state: "default" },
                  { id: "appl", label: "l", children: { e: "apple" }, isEnd: false, state: "default" },
                  { id: "apple", label: "e", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "a", "ap", "app", "appl", "apple"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [24, 25, 26],
              shortLabel: "search('apply') — walk a→p→p→l",
              explanation: "Search 'apply': walk root→a→p→p→l. So far so good — these nodes all exist (shared prefix with 'apple').",
              variables: { operation: "search", word: "apply", charIndex: 3, current: "l" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { p: "ap" }, isEnd: false, state: "visited" },
                  { id: "ap", label: "p", children: { p: "app" }, isEnd: false, state: "visited" },
                  { id: "app", label: "p", children: { l: "appl" }, isEnd: false, state: "visited" },
                  { id: "appl", label: "l", children: { e: "apple" }, isEnd: false, state: "active" },
                  { id: "apple", label: "e", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "a", "ap", "app", "appl"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [27],
              shortLabel: "No 'y' child → return false",
              explanation: "At node 'l' (depth 4), look for child 'y'. node.children['y'] is null — no such path. Return false immediately. 'apply' is not in the trie.",
              variables: { operation: "search", word: "apply", charIndex: 4, lookingFor: "y", result: false },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { p: "ap" }, isEnd: false, state: "visited" },
                  { id: "ap", label: "p", children: { p: "app" }, isEnd: false, state: "visited" },
                  { id: "app", label: "p", children: { l: "appl" }, isEnd: false, state: "visited" },
                  { id: "appl", label: "l", children: { e: "apple" }, isEnd: false, state: "eliminated" },
                  { id: "apple", label: "e", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "a", "ap", "app", "appl"],
                searchResult: false,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations }) {
        const steps = [];
        const trieData = { root: { children: {}, isEnd: false } };

        function buildTrieNodes(data) {
          const nodes = [];
          function traverse(nodeData, id, label) {
            const node = {
              id,
              label,
              children: {},
              isEnd: nodeData.isEnd,
              state: "default",
            };
            for (const [char, child] of Object.entries(nodeData.children)) {
              const childId = id === "root" ? char : id + char;
              node.children[char] = childId;
              traverse(child, childId, char);
            }
            nodes.push(node);
          }
          traverse(data.root, "root", "root");
          return nodes;
        }

        steps.push({
          stepId: 0,
          lineNumbers: [9],
          shortLabel: "Init Trie",
          explanation: "Create Trie with empty root node.",
          variables: { operation: "Trie()" },
          dataStructure: {
            trieNodes: buildTrieNodes(trieData),
            currentPath: [],
            searchResult: null,
          },
          delta: {},
          isAnswer: false,
        });

        for (const op of operations) {
          const parts = op.split(" ");
          const action = parts[0];
          const word = parts[1];

          if (action === "insert") {
            let node = trieData.root;
            const path = ["root"];
            for (const c of word) {
              if (!node.children[c]) {
                node.children[c] = { children: {}, isEnd: false };
              }
              node = node.children[c];
              path.push(path.length === 1 ? c : path[path.length - 1] + c);
            }
            node.isEnd = true;

            steps.push({
              stepId: steps.length,
              lineNumbers: [13, 14, 15, 16, 17, 19, 21],
              shortLabel: `insert('${word}')`,
              explanation: `Insert '${word}': created/traversed path ${path.join("→")}. Marked final node isEnd=true.`,
              variables: { operation: "insert", word },
              dataStructure: {
                trieNodes: buildTrieNodes(trieData),
                currentPath: path,
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            });
          } else if (action === "search") {
            let node = trieData.root;
            const path = ["root"];
            let found = true;
            for (const c of word) {
              if (!node.children[c]) { found = false; break; }
              node = node.children[c];
              path.push(path.length === 1 ? c : path[path.length - 1] + c);
            }
            const result = found && node.isEnd;

            steps.push({
              stepId: steps.length,
              lineNumbers: [24, 25, 26, 27, 28, 30],
              shortLabel: `search('${word}') → ${result}`,
              explanation: `Search '${word}': ${found ? `path exists${node.isEnd ? " and isEnd=true" : " but isEnd=false"}` : "path breaks — child missing"}. Return ${result}.`,
              variables: { operation: "search", word, result },
              dataStructure: {
                trieNodes: buildTrieNodes(trieData),
                currentPath: path,
                searchResult: result,
              },
              delta: {},
              isAnswer: false,
            });
          } else if (action === "startsWith") {
            let node = trieData.root;
            const path = ["root"];
            let found = true;
            for (const c of word) {
              if (!node.children[c]) { found = false; break; }
              node = node.children[c];
              path.push(path.length === 1 ? c : path[path.length - 1] + c);
            }

            steps.push({
              stepId: steps.length,
              lineNumbers: [33, 34, 35, 36, 37, 38],
              shortLabel: `startsWith('${word}') → ${found}`,
              explanation: `startsWith '${word}': ${found ? "path exists — some word has this prefix" : "path breaks — no word has this prefix"}. Return ${found}.`,
              variables: { operation: "startsWith", prefix: word, result: found },
              dataStructure: {
                trieNodes: buildTrieNodes(trieData),
                currentPath: path,
                searchResult: found,
              },
              delta: {},
              isAnswer: false,
            });
          }
        }

        if (steps.length > 0) {
          steps[steps.length - 1].isAnswer = true;
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   null,
    optimal: { time: "O(L) per operation", space: "O(N × L) total", explanation: "Each operation traverses at most L characters; total storage for N words of avg length L", tradeoff: "Uses more memory than a HashSet but enables prefix queries and autocomplete" },
  },

  interviewTips: [
    "Start by explaining what a Trie is — not all interviewers assume you know.",
    "Draw the tree structure on the whiteboard: root → a → p → p → l → e.",
    "Emphasize the difference between search and startsWith: isEnd check vs. no isEnd check.",
    "Mention: in Java, children can be TrieNode[26] (array) or HashMap<Character, TrieNode> — array is faster, map is more flexible.",
    "If asked about deletion: you'd need to track if a node has no children and is not isEnd to prune it.",
    "This is the foundation for problems like Word Search II and autocomplete systems.",
  ],

  relatedProblems: ["add-search-words", "word-search-ii"],
};
