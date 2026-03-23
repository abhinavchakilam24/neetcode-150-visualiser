export const wordLadder = {
  id: 92,
  slug: "word-ladder",
  title: "Word Ladder",
  difficulty: "Hard",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 92,
  artifactType: "GraphBFS",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/word-ladder/",

  pattern: "BFS Shortest Path in Implicit Graph",
  patternExplanation: `Each word is a node. Two words are connected if they differ by exactly one character.
    BFS from beginWord finds the shortest transformation sequence to endWord.`,

  intuition: {
    coreInsight: `Think of each word as a node in a graph. Two words are adjacent if they differ by exactly
      one letter. Finding the shortest transformation sequence is finding the shortest path in this graph.
      BFS guarantees the shortest path in an unweighted graph — the first time we reach endWord is optimal.`,

    mentalModel: `Imagine standing on a word in a dictionary. You can "jump" to any word that differs by
      one letter. You want to reach a target word in the fewest jumps. BFS explores all words reachable
      in 1 jump, then 2 jumps, etc. The first time you land on the target, that's the minimum number
      of jumps — guaranteed by BFS's level-by-level exploration.`,

    whyNaiveFails: `DFS would explore one path deeply before trying others, potentially finding a long
      transformation sequence first. It doesn't guarantee the shortest path. BFS, by exploring level
      by level, guarantees that the first path found is the shortest.`,

    keyObservation: `Instead of comparing every pair of words (O(n² × L)), we can generate all possible
      one-letter-changed versions of the current word (26 × L options) and check if each exists in our
      word set. For large word lists, this is much faster because L × 26 is usually much smaller than n.`,
  },

  problem: `A transformation sequence from word beginWord to word endWord using a dictionary wordList
    is a sequence such that: the first word is beginWord, the last word is endWord, each adjacent pair
    differs by a single letter, and every word in the sequence is in wordList. Return the number of
    words in the shortest transformation sequence, or 0 if no such sequence exists.`,

  examples: [
    { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5", explanation: 'hit → hot → dot → dog → cog (5 words)' },
    { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: "0", explanation: '"cog" is not in wordList, so no valid sequence' },
  ],

  constraints: [
    "1 <= beginWord.length <= 10",
    "endWord.length == beginWord.length",
    "1 <= wordList.length <= 5000",
    "All words have the same length.",
    "beginWord, endWord, and wordList[i] consist of lowercase English letters.",
    "beginWord != endWord",
  ],

  approaches: {
    brute: {
      label: "BFS",
      tier: "brute",
      timeComplexity: "O(n × L × 26)",
      spaceComplexity: "O(n × L)",
      idea: "BFS from beginWord. For each word, try changing each character to a-z. If the new word is in the word set and unvisited, enqueue it. First time we reach endWord, return the level.",

      javaCode: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord)) return 0;

    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    Set<String> visited = new HashSet<>();
    visited.add(beginWord);
    int level = 1;

    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            String word = queue.poll();
            char[] chars = word.toCharArray();
            for (int j = 0; j < chars.length; j++) {
                char original = chars[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[j] = c;
                    String next = new String(chars);
                    if (next.equals(endWord)) return level + 1;
                    if (wordSet.contains(next) && !visited.contains(next)) {
                        visited.add(next);
                        queue.offer(next);
                    }
                }
                chars[j] = original;
            }
        }
        level++;
    }
    return 0;
}`,

      cppCode: `int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> wordSet(wordList.begin(), wordList.end());
    if (!wordSet.count(endWord)) return 0;

    queue<string> q;
    q.push(beginWord);
    unordered_set<string> visited;
    visited.insert(beginWord);
    int level = 1;

    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            string word = q.front(); q.pop();
            for (int j = 0; j < word.size(); j++) {
                char original = word[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    word[j] = c;
                    if (word == endWord) return level + 1;
                    if (wordSet.count(word) && !visited.count(word)) {
                        visited.insert(word);
                        q.push(word);
                    }
                }
                word[j] = original;
            }
        }
        level++;
    }
    return 0;
}`,

      pythonCode: `def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
    word_set = set(wordList)
    if endWord not in word_set:
        return 0

    queue = deque([beginWord])
    visited = {beginWord}
    level = 1

    while queue:
        for _ in range(len(queue)):
            word = queue.popleft()
            for j in range(len(word)):
                for c in "abcdefghijklmnopqrstuvwxyz":
                    next_word = word[:j] + c + word[j+1:]
                    if next_word == endWord:
                        return level + 1
                    if next_word in word_set and next_word not in visited:
                        visited.add(next_word)
                        queue.append(next_word)
        level += 1

    return 0`,

      lineAnnotations: {
        2: "Convert word list to set for O(1) lookup",
        3: "If endWord not in dictionary, impossible",
        5: "BFS queue starts with beginWord",
        9: "Level tracks transformation sequence length",
        11: "Process all words at current BFS level",
        14: "Try changing each character position",
        16: "Try all 26 possible characters",
        18: "If we formed endWord, return level + 1",
        19: "If valid word and unvisited, enqueue",
        24: "Increment level after processing entire BFS layer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Find shortest path from "hit" to "cog"',
          input: { beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log","cog"] },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 5, 9],
              shortLabel: 'Init BFS from "hit"',
              explanation: 'Start BFS from "hit". Level = 1. Queue = ["hit"]. Word set has all 6 words including "cog".',
              variables: { level: 1, queue: '["hit"]', visited: '{"hit"}' },
              dataStructure: {
                graphNodes: { "hit": { state: "active" }, "hot": { state: "default" }, "dot": { state: "default" }, "dog": { state: "default" }, "lot": { state: "default" }, "log": { state: "default" }, "cog": { state: "default" } },
                graphEdges: [],
                bfsQueue: ["hit"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11, 14, 16, 19],
              shortLabel: 'Level 1: "hit" → "hot"',
              explanation: 'Process "hit". Try all one-letter changes. "hot" is in word set and unvisited — enqueue. No other valid neighbors.',
              variables: { level: 1, word: "hit", found: "hot", queue: '["hot"]' },
              dataStructure: {
                graphNodes: { "hit": { state: "visited" }, "hot": { state: "queued" }, "dot": { state: "default" }, "dog": { state: "default" }, "lot": { state: "default" }, "log": { state: "default" }, "cog": { state: "default" } },
                graphEdges: [{ from: "hit", to: "hot", state: "traversed" }],
                bfsQueue: ["hot"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [24, 11, 14, 16, 19],
              shortLabel: 'Level 2: "hot" → "dot", "lot"',
              explanation: 'Level 2. Process "hot". Neighbors: "dot" (h→d), "lot" (h→l). Both valid — enqueue.',
              variables: { level: 2, word: "hot", queue: '["dot","lot"]' },
              dataStructure: {
                graphNodes: { "hit": { state: "visited" }, "hot": { state: "visited" }, "dot": { state: "queued" }, "dog": { state: "default" }, "lot": { state: "queued" }, "log": { state: "default" }, "cog": { state: "default" } },
                graphEdges: [{ from: "hit", to: "hot", state: "traversed" }, { from: "hot", to: "dot", state: "traversed" }, { from: "hot", to: "lot", state: "traversed" }],
                bfsQueue: ["dot", "lot"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [24, 11, 14, 16, 19],
              shortLabel: 'Level 3: "dot"→"dog", "lot"→"log"',
              explanation: 'Level 3. Process "dot" → neighbor "dog". Process "lot" → neighbor "log". Both enqueued.',
              variables: { level: 3, queue: '["dog","log"]' },
              dataStructure: {
                graphNodes: { "hit": { state: "visited" }, "hot": { state: "visited" }, "dot": { state: "visited" }, "dog": { state: "queued" }, "lot": { state: "visited" }, "log": { state: "queued" }, "cog": { state: "default" } },
                graphEdges: [{ from: "dot", to: "dog", state: "traversed" }, { from: "lot", to: "log", state: "traversed" }],
                bfsQueue: ["dog", "log"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [24, 11, 14, 16, 18],
              shortLabel: 'Level 4: "dog" → "cog" — FOUND!',
              explanation: 'Level 4. Process "dog". Change d→c: "cog" = endWord! Return level + 1 = 5. Shortest path: hit→hot→dot→dog→cog.',
              variables: { level: 4, word: "dog", next: "cog", answer: 5 },
              dataStructure: {
                graphNodes: { "hit": { state: "visited" }, "hot": { state: "visited" }, "dot": { state: "visited" }, "dog": { state: "visited" }, "lot": { state: "visited" }, "log": { state: "visited" }, "cog": { state: "found" } },
                graphEdges: [{ from: "dog", to: "cog", state: "traversed" }],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Path",
          description: "endWord not in word list",
          input: { beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log"] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: '"cog" not in word set',
              explanation: '"cog" is not in the word list. No valid transformation sequence can end at "cog". Return 0 immediately.',
              variables: { endWord: "cog", inWordSet: false, answer: 0 },
              dataStructure: {
                graphNodes: { "hit": { state: "default" }, "cog": { state: "eliminated" } },
                graphEdges: [],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ beginWord, endWord, wordList }) {
        const steps = [];
        const wordSet = new Set(wordList);

        if (!wordSet.has(endWord)) {
          steps.push({
            stepId: 0, lineNumbers: [2, 3],
            shortLabel: `"${endWord}" not in word set`,
            explanation: `"${endWord}" is not in the word list. Return 0.`,
            variables: { answer: 0 },
            dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const queue = [beginWord];
        const visited = new Set([beginWord]);
        let level = 1;

        steps.push({
          stepId: 0, lineNumbers: [5, 9],
          shortLabel: `Init BFS from "${beginWord}"`,
          explanation: `Start BFS from "${beginWord}". Level = 1.`,
          variables: { level: 1, queue: JSON.stringify(queue) },
          dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [...queue] },
          delta: {}, isAnswer: false,
        });

        while (queue.length > 0) {
          const size = queue.length;
          const levelWords = [];
          for (let i = 0; i < size; i++) {
            const word = queue.shift();
            for (let j = 0; j < word.length; j++) {
              for (let c = 97; c <= 122; c++) {
                const next = word.substring(0, j) + String.fromCharCode(c) + word.substring(j + 1);
                if (next === endWord) {
                  steps.push({
                    stepId: steps.length, lineNumbers: [18],
                    shortLabel: `Level ${level}: "${word}" → "${endWord}" FOUND!`,
                    explanation: `Found "${endWord}"! Return level + 1 = ${level + 1}.`,
                    variables: { level, answer: level + 1 },
                    dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [] },
                    delta: {}, isAnswer: true,
                  });
                  return steps;
                }
                if (wordSet.has(next) && !visited.has(next)) {
                  visited.add(next);
                  queue.push(next);
                  levelWords.push(next);
                }
              }
            }
          }

          if (levelWords.length > 0) {
            steps.push({
              stepId: steps.length, lineNumbers: [11, 19, 24],
              shortLabel: `Level ${level}: found ${levelWords.length} neighbors`,
              explanation: `Level ${level}: discovered ${levelWords.join(", ")}. Enqueued for next level.`,
              variables: { level, neighbors: JSON.stringify(levelWords) },
              dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [...queue] },
              delta: {}, isAnswer: false,
            });
          }

          level++;
        }

        steps.push({
          stepId: steps.length, lineNumbers: [26],
          shortLabel: "No path found → 0",
          explanation: "BFS exhausted all reachable words without finding endWord. Return 0.",
          variables: { answer: 0 },
          dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Bidirectional BFS",
      tier: "optimal",
      timeComplexity: "O(n × L × 26)",
      spaceComplexity: "O(n × L)",
      idea: "Run BFS from both beginWord and endWord simultaneously. At each step, expand the smaller frontier. When frontiers meet, return the combined level.",

      javaCode: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord)) return 0;

    Set<String> front = new HashSet<>(), back = new HashSet<>();
    front.add(beginWord);
    back.add(endWord);
    Set<String> visited = new HashSet<>();
    visited.add(beginWord);
    visited.add(endWord);
    int level = 1;

    while (!front.isEmpty() && !back.isEmpty()) {
        if (front.size() > back.size()) {
            Set<String> temp = front; front = back; back = temp;
        }
        Set<String> nextFront = new HashSet<>();
        for (String word : front) {
            char[] chars = word.toCharArray();
            for (int j = 0; j < chars.length; j++) {
                char orig = chars[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[j] = c;
                    String next = new String(chars);
                    if (back.contains(next)) return level + 1;
                    if (wordSet.contains(next) && !visited.contains(next)) {
                        visited.add(next);
                        nextFront.add(next);
                    }
                }
                chars[j] = orig;
            }
        }
        front = nextFront;
        level++;
    }
    return 0;
}`,

      cppCode: `int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> wordSet(wordList.begin(), wordList.end());
    if (!wordSet.count(endWord)) return 0;

    unordered_set<string> front = {beginWord}, back = {endWord};
    unordered_set<string> visited = {beginWord, endWord};
    int level = 1;

    while (!front.empty() && !back.empty()) {
        if (front.size() > back.size()) swap(front, back);
        unordered_set<string> nextFront;
        for (auto& word : front) {
            string w = word;
            for (int j = 0; j < w.size(); j++) {
                char orig = w[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    w[j] = c;
                    if (back.count(w)) return level + 1;
                    if (wordSet.count(w) && !visited.count(w)) {
                        visited.insert(w);
                        nextFront.insert(w);
                    }
                }
                w[j] = orig;
            }
        }
        front = nextFront;
        level++;
    }
    return 0;
}`,

      pythonCode: `def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
    word_set = set(wordList)
    if endWord not in word_set:
        return 0

    front, back = {beginWord}, {endWord}
    visited = {beginWord, endWord}
    level = 1

    while front and back:
        if len(front) > len(back):
            front, back = back, front
        next_front = set()
        for word in front:
            for j in range(len(word)):
                for c in "abcdefghijklmnopqrstuvwxyz":
                    next_word = word[:j] + c + word[j+1:]
                    if next_word in back:
                        return level + 1
                    if next_word in word_set and next_word not in visited:
                        visited.add(next_word)
                        next_front.add(next_word)
        front = next_front
        level += 1

    return 0`,

      lineAnnotations: {
        5: "Two BFS frontiers: one from start, one from end",
        12: "Always expand the smaller frontier (optimization)",
        16: "Try all one-letter changes",
        23: "If next word is in the OTHER frontier, we've met in the middle!",
        24: "If valid and unvisited, add to next frontier",
        30: "Swap to newly expanded frontier",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Bidirectional BFS",
          description: 'Meet-in-the-middle from "hit" and "cog"',
          input: { beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log","cog"] },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 7],
              shortLabel: "Init two frontiers",
              explanation: 'Front = {"hit"}, Back = {"cog"}. Expand smaller frontier each step.',
              variables: { level: 1, front: '{"hit"}', back: '{"cog"}' },
              dataStructure: { graphNodes: { "hit": { state: "active" }, "cog": { state: "pointer" } }, graphEdges: [], bfsQueue: ["hit"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 16, 24],
              shortLabel: 'Expand front: "hit" → "hot"',
              explanation: 'Expand {"hit"}. Find "hot". Not in back set. next_front = {"hot"}. Level → 2.',
              variables: { level: 1, front: '{"hit"}', nextFront: '{"hot"}' },
              dataStructure: { graphNodes: { "hit": { state: "visited" }, "hot": { state: "queued" }, "cog": { state: "pointer" } }, graphEdges: [{ from: "hit", to: "hot", state: "traversed" }], bfsQueue: ["hot"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 16, 24],
              shortLabel: 'Expand back: "cog" → "dog","log"',
              explanation: 'Back set {"cog"} is smaller now (size 1 vs front size 1, equal so expand front). Actually both size 1. Expand "cog" → "dog", "log".',
              variables: { level: 2, expanding: "back", nextFront: '{"dog","log"}' },
              dataStructure: { graphNodes: { "cog": { state: "visited" }, "dog": { state: "queued" }, "log": { state: "queued" } }, graphEdges: [{ from: "cog", to: "dog", state: "traversed" }, { from: "cog", to: "log", state: "traversed" }], bfsQueue: ["dog", "log"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 16, 24],
              shortLabel: 'Expand front: "hot" → "dot","lot"',
              explanation: 'Expand {"hot"}. Find "dot" and "lot". Not in back set {dog,log}. Level → 3.',
              variables: { level: 3, nextFront: '{"dot","lot"}' },
              dataStructure: { graphNodes: { "hot": { state: "visited" }, "dot": { state: "queued" }, "lot": { state: "queued" } }, graphEdges: [{ from: "hot", to: "dot", state: "traversed" }, { from: "hot", to: "lot", state: "traversed" }], bfsQueue: ["dot", "lot"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12, 16, 23],
              shortLabel: 'Expand: "dot" → "dog" in BACK! Return 5',
              explanation: 'Expand front {"dot","lot"}. "dot" changes d→d,o→o,t→g: "dog" is in back set {"dog","log"}! Frontiers meet! Return level + 1 = 5.',
              variables: { level: 4, word: "dot", next: "dog", answer: 5 },
              dataStructure: { graphNodes: { "dot": { state: "visited" }, "dog": { state: "found" }, "cog": { state: "found" } }, graphEdges: [{ from: "dot", to: "dog", state: "traversed" }], bfsQueue: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Path",
          description: "endWord not in word list",
          input: { beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log"] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: '"cog" not in word set → 0',
              explanation: '"cog" is not in word list. Return 0 immediately.',
              variables: { answer: 0 },
              dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ beginWord, endWord, wordList }) {
        const steps = [];
        const wordSet = new Set(wordList);

        if (!wordSet.has(endWord)) {
          steps.push({
            stepId: 0, lineNumbers: [2, 3],
            shortLabel: `"${endWord}" not in word set → 0`,
            explanation: `"${endWord}" is not in the word list. Return 0.`,
            variables: { answer: 0 },
            dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        let front = new Set([beginWord]);
        let back = new Set([endWord]);
        const visited = new Set([beginWord, endWord]);
        let level = 1;

        steps.push({
          stepId: 0, lineNumbers: [5, 7],
          shortLabel: "Init two frontiers",
          explanation: `Front = {"${beginWord}"}, Back = {"${endWord}"}. Level = 1.`,
          variables: { level: 1, front: `{"${beginWord}"}`, back: `{"${endWord}"}` },
          dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [...front] },
          delta: {}, isAnswer: false,
        });

        while (front.size > 0 && back.size > 0) {
          if (front.size > back.size) {
            [front, back] = [back, front];
          }
          const nextFront = new Set();

          for (const word of front) {
            for (let j = 0; j < word.length; j++) {
              for (let c = 97; c <= 122; c++) {
                const next = word.substring(0, j) + String.fromCharCode(c) + word.substring(j + 1);
                if (back.has(next)) {
                  steps.push({
                    stepId: steps.length, lineNumbers: [23],
                    shortLabel: `"${word}" → "${next}" in back! Return ${level + 1}`,
                    explanation: `"${next}" found in opposite frontier! Return ${level + 1}.`,
                    variables: { level, answer: level + 1 },
                    dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [] },
                    delta: {}, isAnswer: true,
                  });
                  return steps;
                }
                if (wordSet.has(next) && !visited.has(next)) {
                  visited.add(next);
                  nextFront.add(next);
                }
              }
            }
          }

          if (nextFront.size > 0) {
            steps.push({
              stepId: steps.length, lineNumbers: [12, 24],
              shortLabel: `Level ${level}: expanded → ${[...nextFront].join(",")}`,
              explanation: `Expanded frontier. Found: ${[...nextFront].join(", ")}.`,
              variables: { level, nextFront: JSON.stringify([...nextFront]) },
              dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [...nextFront] },
              delta: {}, isAnswer: false,
            });
          }

          front = nextFront;
          level++;
        }

        steps.push({
          stepId: steps.length, lineNumbers: [33],
          shortLabel: "No path → 0",
          explanation: "Frontiers exhausted without meeting. Return 0.",
          variables: { answer: 0 },
          dataStructure: { graphNodes: {}, graphEdges: [], bfsQueue: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n × L × 26)", space: "O(n × L)", explanation: "BFS processes n words, each generates 26×L neighbors" },
    optimal: { time: "O(n × L × 26)", space: "O(n × L)", explanation: "Same worst case, but explores sqrt(n) levels from each side", tradeoff: "Bidirectional BFS reduces explored nodes from O(b^d) to O(b^(d/2)) where b is branching factor" },
  },

  interviewTips: [
    "Immediately frame this as a graph shortest-path problem — BFS on an implicit graph.",
    "Explain the neighbor generation strategy: 26 × L changes vs comparing all n words.",
    "Mention the early termination: return as soon as endWord is reached.",
    "Bidirectional BFS is a great optimization to discuss — it shows depth of knowledge.",
    "Always check if endWord exists in the word list first — O(1) set lookup.",
  ],

  relatedProblems: ["number-of-islands", "rotting-oranges", "course-schedule"],
};
