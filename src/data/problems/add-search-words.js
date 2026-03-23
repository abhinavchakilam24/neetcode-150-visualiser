export const addSearchWords = {
  id: 62,
  slug: "add-search-words",
  title: "Design Add and Search Words Data Structure",
  difficulty: "Medium",
  topic: "tries",
  topicLabel: "Tries",
  neetcodeNumber: 62,
  artifactType: "Trie",
  companies: ["Meta", "Google", "Amazon", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",

  pattern: "Trie with DFS Wildcard Search",
  patternExplanation: `A Trie stores words character by character. The twist here is supporting '.'
    as a wildcard that matches any character. addWord is standard Trie insertion. search uses DFS —
    when we hit a '.', we branch into ALL children and return true if ANY branch leads to a match.`,

  intuition: {
    coreInsight: `addWord is identical to standard Trie insert — walk the tree creating nodes. The
      interesting part is search with '.'. When we encounter a '.', we can't follow a single edge — we
      must try ALL 26 possible children. This turns search into a DFS/backtracking problem: for each '.',
      branch into every existing child and recursively check the remaining pattern. If ANY branch succeeds,
      return true. This is why Trie + DFS is more efficient than checking every stored word against a regex.`,

    mentalModel: `Imagine a library filing system where books are organized letter by letter into nested
      folders: a/p/p/l/e/ for "apple". Searching for "apple" is just opening folders in sequence. But
      searching for "a..le" means: open the 'a' folder, then open EVERY subfolder (since '.' matches
      anything), then in each of those open EVERY sub-subfolder, then look for 'l', then 'e'. You're
      doing a tree search where '.' means "try all doors on this floor."`,

    whyNaiveFails: `A brute force approach stores all words in a list and for each search, iterates
      through every word checking character by character with '.' as wildcard. That's O(N * L) per search
      where N is the number of words. With a Trie, addWord is O(L) and search without wildcards is O(L).
      Even with wildcards, the branching factor is bounded by the alphabet size (26), so in practice it's
      much faster than scanning all words — especially when the pattern has few wildcards.`,

    keyObservation: `The '.' wildcard turns a linear traversal into a tree search. Without '.', search
      is O(L) — follow one path. With '.', at each wildcard position we branch into up to 26 children.
      The worst case is O(26^L) for "....." but in practice, most branches terminate early because children
      don't exist. The Trie's structure naturally prunes the search space.`,
  },

  problem: `Design a data structure that supports adding new words and finding if a string matches any
    previously added string. Implement the WordDictionary class:
    WordDictionary() Initializes the object.
    void addWord(word) Adds word to the data structure. It can be matched later.
    bool search(word) Returns true if there is any string in the data structure that matches word.
    word may contain dots '.' where dots can be matched with any letter.`,

  examples: [
    {
      input: `["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]`,
      output: "[null,null,null,null,false,true,true,true]",
      explanation: "addWord 'bad','dad','mad'. search 'pad'→false. search 'bad'→true. search '.ad'→true (matches bad,dad,mad). search 'b..'→true (matches bad).",
    },
  ],

  constraints: [
    "1 <= word.length <= 25",
    "word in addWord consists of lowercase English letters.",
    "word in search consists of '.' or lowercase English letters.",
    "At most 10^4 calls will be made to addWord and search.",
  ],

  approaches: {
    brute: {
      label: "Brute Force — List + Regex Match",
      tier: "brute",
      timeComplexity: "O(N × L) per search",
      spaceComplexity: "O(N × L)",
      idea: "Store all words in a list. For each search, iterate through every word and check if it matches the pattern character by character, treating '.' as a wildcard.",

      javaCode: `class WordDictionary {
    List<String> words;

    public WordDictionary() {
        words = new ArrayList<>();
    }

    public void addWord(String word) {
        words.add(word);
    }

    public boolean search(String word) {
        for (String w : words) {
            if (w.length() != word.length()) continue;
            boolean match = true;
            for (int i = 0; i < word.length(); i++) {
                if (word.charAt(i) != '.' && word.charAt(i) != w.charAt(i)) {
                    match = false;
                    break;
                }
            }
            if (match) return true;
        }
        return false;
    }
}`,

      cppCode: `class WordDictionary {
    vector<string> words;
public:
    WordDictionary() {}

    void addWord(string word) {
        words.push_back(word);
    }

    bool search(string word) {
        for (auto& w : words) {
            if (w.size() != word.size()) continue;
            bool match = true;
            for (int i = 0; i < word.size(); i++) {
                if (word[i] != '.' && word[i] != w[i]) {
                    match = false;
                    break;
                }
            }
            if (match) return true;
        }
        return false;
    }
};`,

      pythonCode: `class WordDictionary:
    def __init__(self):
        self.words = []

    def addWord(self, word: str) -> None:
        self.words.append(word)

    def search(self, word: str) -> bool:
        for w in self.words:
            if len(w) != len(word):
                continue
            match = True
            for i in range(len(word)):
                if word[i] != '.' and word[i] != w[i]:
                    match = False
                    break
            if match:
                return True
        return False`,

      lineAnnotations: {
        2: "Store all words in a flat list",
        8: "addWord: just append to the list",
        12: "search: iterate through every stored word",
        13: "Skip words of different length",
        16: "Check character by character; '.' matches any",
        22: "If all characters matched, return true",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { operations: ["addWord bad", "addWord dad", "addWord mad", "search .ad"] },
          expectedOutput: "[null, null, null, true]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4],
              shortLabel: "Init WordDictionary",
              explanation: "Create an empty WordDictionary with an empty word list.",
              variables: { words: "[]" },
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
              lineNumbers: [8],
              shortLabel: "addWord('bad')",
              explanation: "Append 'bad' to the words list. Simple O(1) add.",
              variables: { operation: "addWord", word: "bad", words: '["bad"]' },
              dataStructure: {
                trieNodes: [{ id: "root", label: "root", children: {}, isEnd: false, state: "default" }],
                currentPath: [],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8],
              shortLabel: "addWord('dad')",
              explanation: "Append 'dad' to the words list.",
              variables: { operation: "addWord", word: "dad", words: '["bad","dad"]' },
              dataStructure: {
                trieNodes: [{ id: "root", label: "root", children: {}, isEnd: false, state: "default" }],
                currentPath: [],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8],
              shortLabel: "addWord('mad')",
              explanation: "Append 'mad' to the words list. Now we have 3 words stored.",
              variables: { operation: "addWord", word: "mad", words: '["bad","dad","mad"]' },
              dataStructure: {
                trieNodes: [{ id: "root", label: "root", children: {}, isEnd: false, state: "default" }],
                currentPath: [],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12, 13, 16],
              shortLabel: "search('.ad') — check 'bad'",
              explanation: "Search '.ad': compare with 'bad'. Position 0: '.' matches 'b'. Position 1: 'a'=='a'. Position 2: 'd'=='d'. Full match! Return true. But brute force had to start scanning — with many words this gets slow.",
              variables: { operation: "search", pattern: ".ad", comparing: "bad", result: true },
              dataStructure: {
                trieNodes: [{ id: "root", label: "root", children: {}, isEnd: false, state: "default" }],
                currentPath: [],
                searchResult: true,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations }) {
        const steps = [];
        const words = [];

        steps.push({
          stepId: 0, lineNumbers: [4],
          shortLabel: "Init WordDictionary",
          explanation: "Create empty WordDictionary.",
          variables: { words: "[]" },
          dataStructure: {
            trieNodes: [{ id: "root", label: "root", children: {}, isEnd: false, state: "default" }],
            currentPath: [], searchResult: null,
          },
          delta: {}, isAnswer: false,
        });

        for (const op of operations) {
          const parts = op.split(" ");
          const action = parts[0];
          const word = parts[1];

          if (action === "addWord") {
            words.push(word);
            steps.push({
              stepId: steps.length, lineNumbers: [8],
              shortLabel: `addWord('${word}')`,
              explanation: `Append '${word}' to the words list. Now ${words.length} word(s) stored.`,
              variables: { operation: "addWord", word, words: JSON.stringify(words) },
              dataStructure: {
                trieNodes: [{ id: "root", label: "root", children: {}, isEnd: false, state: "default" }],
                currentPath: [], searchResult: null,
              },
              delta: {}, isAnswer: false,
            });
          } else if (action === "search") {
            let result = false;
            for (const w of words) {
              if (w.length !== word.length) continue;
              let match = true;
              for (let i = 0; i < word.length; i++) {
                if (word[i] !== '.' && word[i] !== w[i]) { match = false; break; }
              }
              if (match) { result = true; break; }
            }
            steps.push({
              stepId: steps.length, lineNumbers: [12, 13, 16, 22],
              shortLabel: `search('${word}') → ${result}`,
              explanation: `Search '${word}': scan all ${words.length} words. Result: ${result}.`,
              variables: { operation: "search", pattern: word, result },
              dataStructure: {
                trieNodes: [{ id: "root", label: "root", children: {}, isEnd: false, state: "default" }],
                currentPath: [], searchResult: result,
              },
              delta: {}, isAnswer: false,
            });
          }
        }

        if (steps.length > 0) steps[steps.length - 1].isAnswer = true;
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Trie + DFS Wildcard Search",
      tier: "optimal",
      timeComplexity: "O(L) add, O(26^L) worst-case search",
      spaceComplexity: "O(N × L)",
      idea: `Use a Trie for storage. addWord is standard Trie insertion. search uses DFS: for each
        character, if it's a letter, follow that child. If it's '.', recursively try ALL existing
        children. Return true if any branch reaches the end with isEnd=true.`,

      javaCode: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class WordDictionary {
    TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }

    public void addWord(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null)
                node.children[idx] = new TrieNode();
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        return dfs(word, 0, root);
    }

    private boolean dfs(String word, int i, TrieNode node) {
        if (i == word.length()) return node.isEnd;

        char c = word.charAt(i);
        if (c == '.') {
            for (TrieNode child : node.children) {
                if (child != null && dfs(word, i + 1, child))
                    return true;
            }
            return false;
        } else {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            return dfs(word, i + 1, node.children[idx]);
        }
    }
}`,

      cppCode: `class TrieNode {
public:
    TrieNode* children[26] = {};
    bool isEnd = false;
};

class WordDictionary {
    TrieNode* root;

    bool dfs(const string& word, int i, TrieNode* node) {
        if (i == word.size()) return node->isEnd;

        char c = word[i];
        if (c == '.') {
            for (auto child : node->children) {
                if (child && dfs(word, i + 1, child))
                    return true;
            }
            return false;
        } else {
            int idx = c - 'a';
            if (!node->children[idx]) return false;
            return dfs(word, i + 1, node->children[idx]);
        }
    }

public:
    WordDictionary() { root = new TrieNode(); }

    void addWord(string word) {
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
        return dfs(word, 0, root);
    }
};`,

      pythonCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word: str) -> bool:
        def dfs(i, node):
            if i == len(word):
                return node.is_end

            c = word[i]
            if c == '.':
                for child in node.children.values():
                    if dfs(i + 1, child):
                        return True
                return False
            else:
                if c not in node.children:
                    return False
                return dfs(i + 1, node.children[c])

        return dfs(0, self.root)`,

      lineAnnotations: {
        1: "TrieNode: 26 children + end-of-word flag",
        9: "Initialize with empty root node",
        12: "addWord: standard Trie insertion",
        16: "Create child node if it doesn't exist",
        20: "Mark final node as end of word",
        23: "search: delegate to DFS helper",
        27: "Base case: reached end of pattern, check isEnd",
        30: "Wildcard '.': try ALL existing children",
        31: "If any child leads to a match, return true",
        34: "No child matched the wildcard — return false",
        36: "Regular character: follow that specific child",
        37: "Child doesn't exist — word not found",
        38: "Recurse into matching child",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Insert bad, dad, mad — search with wildcards",
          input: { operations: ["addWord bad", "addWord dad", "addWord mad", "search .ad", "search b.."] },
          expectedOutput: "[null, null, null, true, true]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [9],
              shortLabel: "Init Trie",
              explanation: "Create a Trie with an empty root node. This will store all added words.",
              variables: { operation: "WordDictionary()" },
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
              lineNumbers: [12, 13, 14, 16, 18, 20],
              shortLabel: "addWord('bad') — b→a→d",
              explanation: "Insert 'bad': create path root→b→a→d. Three new nodes created. Mark 'd' node as isEnd=true.",
              variables: { operation: "addWord", word: "bad" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b" }, isEnd: false, state: "default" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "visited" },
                  { id: "ba", label: "a", children: { d: "bad" }, isEnd: false, state: "visited" },
                  { id: "bad", label: "d", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "b", "ba", "bad"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13, 14, 16, 18, 20],
              shortLabel: "addWord('dad') — d→a→d",
              explanation: "Insert 'dad': create path root→d→a→d. Three new nodes. Mark final 'd' as isEnd=true. The trie now has two branches from root: 'b' and 'd'.",
              variables: { operation: "addWord", word: "dad" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b", d: "d" }, isEnd: false, state: "default" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "default" },
                  { id: "ba", label: "a", children: { d: "bad" }, isEnd: false, state: "default" },
                  { id: "bad", label: "d", children: {}, isEnd: true, state: "default" },
                  { id: "d", label: "d", children: { a: "da" }, isEnd: false, state: "visited" },
                  { id: "da", label: "a", children: { d: "dad" }, isEnd: false, state: "visited" },
                  { id: "dad", label: "d", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "d", "da", "dad"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 14, 16, 18, 20],
              shortLabel: "addWord('mad') — m→a→d",
              explanation: "Insert 'mad': create path root→m→a→d. Three new nodes. Now root has three children: 'b', 'd', 'm'.",
              variables: { operation: "addWord", word: "mad" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b", d: "d", m: "m" }, isEnd: false, state: "default" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "default" },
                  { id: "ba", label: "a", children: { d: "bad" }, isEnd: false, state: "default" },
                  { id: "bad", label: "d", children: {}, isEnd: true, state: "default" },
                  { id: "d", label: "d", children: { a: "da" }, isEnd: false, state: "default" },
                  { id: "da", label: "a", children: { d: "dad" }, isEnd: false, state: "default" },
                  { id: "dad", label: "d", children: {}, isEnd: true, state: "default" },
                  { id: "m", label: "m", children: { a: "ma" }, isEnd: false, state: "visited" },
                  { id: "ma", label: "a", children: { d: "mad" }, isEnd: false, state: "visited" },
                  { id: "mad", label: "d", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "m", "ma", "mad"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [23, 27, 30],
              shortLabel: "search('.ad') — '.' at pos 0",
              explanation: "Search '.ad': the first character is '.', so we must try ALL children of root. Root has children: 'b', 'd', 'm'. We'll DFS into each one with the remaining pattern 'ad'.",
              variables: { operation: "search", pattern: ".ad", charIndex: 0, char: ".", branches: "b, d, m" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b", d: "d", m: "m" }, isEnd: false, state: "active" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "queued" },
                  { id: "ba", label: "a", children: { d: "bad" }, isEnd: false, state: "default" },
                  { id: "bad", label: "d", children: {}, isEnd: true, state: "default" },
                  { id: "d", label: "d", children: { a: "da" }, isEnd: false, state: "queued" },
                  { id: "da", label: "a", children: { d: "dad" }, isEnd: false, state: "default" },
                  { id: "dad", label: "d", children: {}, isEnd: true, state: "default" },
                  { id: "m", label: "m", children: { a: "ma" }, isEnd: false, state: "queued" },
                  { id: "ma", label: "a", children: { d: "mad" }, isEnd: false, state: "default" },
                  { id: "mad", label: "d", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [31, 36, 37, 38],
              shortLabel: "DFS branch 'b' → b→a→d ✓",
              explanation: "Try branch 'b': check 'a' at position 1 — node 'b' has child 'a'. Check 'd' at position 2 — node 'ba' has child 'd'. Reached end of pattern. node 'bad' has isEnd=true. Match found! Return true immediately without checking other branches.",
              variables: { operation: "search", pattern: ".ad", branch: "b", path: "b→a→d", result: true },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b", d: "d", m: "m" }, isEnd: false, state: "default" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "visited" },
                  { id: "ba", label: "a", children: { d: "bad" }, isEnd: false, state: "visited" },
                  { id: "bad", label: "d", children: {}, isEnd: true, state: "found" },
                  { id: "d", label: "d", children: { a: "da" }, isEnd: false, state: "default" },
                  { id: "da", label: "a", children: { d: "dad" }, isEnd: false, state: "default" },
                  { id: "dad", label: "d", children: {}, isEnd: true, state: "default" },
                  { id: "m", label: "m", children: { a: "ma" }, isEnd: false, state: "default" },
                  { id: "ma", label: "a", children: { d: "mad" }, isEnd: false, state: "default" },
                  { id: "mad", label: "d", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "b", "ba", "bad"],
                searchResult: true,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [23, 27, 30, 31],
              shortLabel: "search('b..') — 'b' then two '.'s",
              explanation: "Search 'b..': position 0 is 'b', follow root→b. Position 1 is '.', try all children of 'b'. Node 'b' has child 'a', so try 'a'. Position 2 is '.', try all children of 'ba'. Node 'ba' has child 'd'. Check 'bad': isEnd=true. Match found! Return true.",
              variables: { operation: "search", pattern: "b..", result: true },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b", d: "d", m: "m" }, isEnd: false, state: "default" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "visited" },
                  { id: "ba", label: "a", children: { d: "bad" }, isEnd: false, state: "visited" },
                  { id: "bad", label: "d", children: {}, isEnd: true, state: "found" },
                  { id: "d", label: "d", children: { a: "da" }, isEnd: false, state: "default" },
                  { id: "da", label: "a", children: { d: "dad" }, isEnd: false, state: "default" },
                  { id: "dad", label: "d", children: {}, isEnd: true, state: "default" },
                  { id: "m", label: "m", children: { a: "ma" }, isEnd: false, state: "default" },
                  { id: "ma", label: "a", children: { d: "mad" }, isEnd: false, state: "default" },
                  { id: "mad", label: "d", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "b", "ba", "bad"],
                searchResult: true,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Wildcard No Match",
          description: "Search with '.' but no word matches the full pattern",
          input: { operations: ["addWord bat", "addWord bar", "search .a.", "search .az"] },
          expectedOutput: "[null, null, true, false]",
          commonMistake: "Returning true from a wildcard search as soon as ANY child exists, without checking the remaining characters. You must DFS fully to the end and verify isEnd.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [9],
              shortLabel: "Init Trie",
              explanation: "Create an empty Trie with root node.",
              variables: { operation: "WordDictionary()" },
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
              lineNumbers: [12, 13, 14, 16, 18, 20],
              shortLabel: "addWord('bat') — b→a→t",
              explanation: "Insert 'bat': create path root→b→a→t. Mark 't' node as isEnd=true.",
              variables: { operation: "addWord", word: "bat" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b" }, isEnd: false, state: "default" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "visited" },
                  { id: "ba", label: "a", children: { t: "bat" }, isEnd: false, state: "visited" },
                  { id: "bat", label: "t", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "b", "ba", "bat"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13, 14, 16, 18, 20],
              shortLabel: "addWord('bar') — reuse b→a, add r",
              explanation: "Insert 'bar': root→b already exists, b→a already exists. Create new child 'r' from 'ba'. Mark 'r' as isEnd=true. The trie now shares the prefix 'ba' between 'bat' and 'bar'.",
              variables: { operation: "addWord", word: "bar" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b" }, isEnd: false, state: "default" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "visited" },
                  { id: "ba", label: "a", children: { t: "bat", r: "bar" }, isEnd: false, state: "visited" },
                  { id: "bat", label: "t", children: {}, isEnd: true, state: "default" },
                  { id: "bar", label: "r", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "b", "ba", "bar"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [23, 27, 30, 31],
              shortLabel: "search('.a.') — wildcard first & last",
              explanation: "Search '.a.': position 0 is '.', try all root children. Root has 'b'. DFS into 'b'. Position 1 is 'a', node 'b' has child 'a'. Position 2 is '.', try all children of 'ba': 't' (isEnd=true) and 'r' (isEnd=true). First branch 't' already matches. Return true.",
              variables: { operation: "search", pattern: ".a.", result: true },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b" }, isEnd: false, state: "default" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "visited" },
                  { id: "ba", label: "a", children: { t: "bat", r: "bar" }, isEnd: false, state: "visited" },
                  { id: "bat", label: "t", children: {}, isEnd: true, state: "found" },
                  { id: "bar", label: "r", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "b", "ba", "bat"],
                searchResult: true,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [23, 27, 30, 31, 34],
              shortLabel: "search('.az') → false",
              explanation: "Search '.az': position 0 is '.', try child 'b'. Position 1 is 'a', follow to 'ba'. Position 2 is 'z', look for child 'z' in node 'ba'. Node 'ba' has children 't' and 'r' but NOT 'z'. Return false from this branch. No more root children to try. Return false overall.",
              variables: { operation: "search", pattern: ".az", lookingFor: "z", result: false },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { b: "b" }, isEnd: false, state: "default" },
                  { id: "b", label: "b", children: { a: "ba" }, isEnd: false, state: "visited" },
                  { id: "ba", label: "a", children: { t: "bat", r: "bar" }, isEnd: false, state: "eliminated" },
                  { id: "bat", label: "t", children: {}, isEnd: true, state: "default" },
                  { id: "bar", label: "r", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "b", "ba"],
                searchResult: false,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "All Wildcards",
          description: "Pattern '...' — must match any 3-letter word",
          input: { operations: ["addWord abc", "addWord ab", "search ...", "search .."] },
          expectedOutput: "[null, null, true, true]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [9],
              shortLabel: "Init Trie",
              explanation: "Create an empty Trie.",
              variables: { operation: "WordDictionary()" },
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
              lineNumbers: [12, 13, 14, 16, 18, 20],
              shortLabel: "addWord('abc')",
              explanation: "Insert 'abc': create root→a→b→c. Mark 'c' as isEnd=true.",
              variables: { operation: "addWord", word: "abc" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { b: "ab" }, isEnd: false, state: "visited" },
                  { id: "ab", label: "b", children: { c: "abc" }, isEnd: false, state: "visited" },
                  { id: "abc", label: "c", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "a", "ab", "abc"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13, 14, 16, 18, 20],
              shortLabel: "addWord('ab')",
              explanation: "Insert 'ab': root→a exists, a→b exists. Just mark 'b' node (id='ab') as isEnd=true. No new nodes needed.",
              variables: { operation: "addWord", word: "ab" },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { b: "ab" }, isEnd: false, state: "visited" },
                  { id: "ab", label: "b", children: { c: "abc" }, isEnd: true, state: "found" },
                  { id: "abc", label: "c", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "a", "ab"],
                searchResult: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [23, 27, 30, 31],
              shortLabel: "search('...') → true",
              explanation: "Search '...': three wildcards, length 3. DFS tries all root children → 'a'. From 'a' try all children → 'b' (id='ab'). From 'ab' try all children → 'c' (id='abc'). At end, 'abc' has isEnd=true. Match found — return true. Pattern '...' matches any 3-letter word.",
              variables: { operation: "search", pattern: "...", result: true },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { b: "ab" }, isEnd: false, state: "visited" },
                  { id: "ab", label: "b", children: { c: "abc" }, isEnd: true, state: "visited" },
                  { id: "abc", label: "c", children: {}, isEnd: true, state: "found" },
                ],
                currentPath: ["root", "a", "ab", "abc"],
                searchResult: true,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [23, 27, 30, 31],
              shortLabel: "search('..') → true",
              explanation: "Search '..': two wildcards, length 2. DFS from root → 'a' → 'b' (id='ab'). At end (i=2), check isEnd on 'ab' — it's true (we inserted 'ab'). Return true.",
              variables: { operation: "search", pattern: "..", result: true },
              dataStructure: {
                trieNodes: [
                  { id: "root", label: "root", children: { a: "a" }, isEnd: false, state: "default" },
                  { id: "a", label: "a", children: { b: "ab" }, isEnd: false, state: "visited" },
                  { id: "ab", label: "b", children: { c: "abc" }, isEnd: true, state: "found" },
                  { id: "abc", label: "c", children: {}, isEnd: true, state: "default" },
                ],
                currentPath: ["root", "a", "ab"],
                searchResult: true,
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
              id, label,
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
          variables: { operation: "WordDictionary()" },
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

          if (action === "addWord") {
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

            const trieNodes = buildTrieNodes(trieData);
            const lastId = path[path.length - 1];
            trieNodes.forEach(n => {
              if (path.includes(n.id) && n.id !== "root") n.state = "visited";
              if (n.id === lastId) n.state = "found";
            });

            steps.push({
              stepId: steps.length,
              lineNumbers: [12, 13, 14, 16, 18, 20],
              shortLabel: `addWord('${word}')`,
              explanation: `Insert '${word}': created/traversed path ${path.join("→")}. Marked final node isEnd=true.`,
              variables: { operation: "addWord", word },
              dataStructure: { trieNodes, currentPath: path, searchResult: null },
              delta: {},
              isAnswer: false,
            });
          } else if (action === "search") {
            function dfsSearch(nodeData, i) {
              if (i === word.length) return nodeData.isEnd;
              const c = word[i];
              if (c === '.') {
                for (const child of Object.values(nodeData.children)) {
                  if (dfsSearch(child, i + 1)) return true;
                }
                return false;
              } else {
                if (!nodeData.children[c]) return false;
                return dfsSearch(nodeData.children[c], i + 1);
              }
            }

            const result = dfsSearch(trieData.root, 0);

            const trieNodes = buildTrieNodes(trieData);

            steps.push({
              stepId: steps.length,
              lineNumbers: [23, 27, 30, 31, 36, 37, 38],
              shortLabel: `search('${word}') → ${result}`,
              explanation: `Search '${word}': DFS through trie ${word.includes('.') ? 'with wildcard branching' : 'following exact path'}. Result: ${result}.`,
              variables: { operation: "search", pattern: word, result },
              dataStructure: { trieNodes, currentPath: [], searchResult: result },
              delta: {},
              isAnswer: false,
            });
          }
        }

        if (steps.length > 0) steps[steps.length - 1].isAnswer = true;
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(N × L) per search", space: "O(N × L)", explanation: "Scan all N words, each up to length L" },
    optimal: { time: "O(L) add, O(26^L) worst-case search", space: "O(N × L)", explanation: "Trie insertion is O(L). Search with wildcards branches at each '.', worst case trying all 26 children at each level. In practice much faster due to early termination.", tradeoff: "Trie uses more memory than a flat list but enables efficient prefix-based operations and typically fast wildcard search" },
  },

  interviewTips: [
    "Start by explaining the Trie structure — make sure the interviewer knows you understand the data structure before diving into wildcard handling.",
    "Clarify: 'Is the wildcard only ., or could there be * for zero-or-more?' — this problem only has '.' for single character.",
    "The key insight for search is recognizing it becomes a DFS problem when '.' is encountered.",
    "Mention the worst case O(26^L) but explain why it's fast in practice: most children don't exist, so branches terminate early.",
    "If asked about optimization: you could group words by length in the brute force approach to avoid comparing different-length words.",
    "Walk through the '.ad' example on the whiteboard to show how DFS branches and returns early.",
  ],

  relatedProblems: ["implement-trie", "word-search-ii"],
};
