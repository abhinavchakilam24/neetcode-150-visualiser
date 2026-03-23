export const alienDictionary = {
  id: 97,
  slug: "alien-dictionary",
  title: "Alien Dictionary",
  difficulty: "Hard",
  topic: "advanced-graphs",
  topicLabel: "Advanced Graphs",
  neetcodeNumber: 97,
  artifactType: "GraphDFS",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Airbnb"],
  leetcodeLink: "https://leetcode.com/problems/alien-dictionary/",

  pattern: "Topological Sort on Character Ordering",
  patternExplanation: `Compare adjacent words to extract character ordering constraints (directed edges).
    Then perform topological sort (BFS with in-degree or DFS) to find a valid character ordering.`,

  intuition: {
    coreInsight: `The words are sorted in alien order. By comparing adjacent words, we can derive which
      character comes before which — like "t comes before f" if "t" appears before "f" at the first
      differing position. These constraints form a directed graph. A valid topological ordering of
      this graph gives us the alien alphabet order.`,

    mentalModel: `Imagine you find a sorted alien phone book. You can't read the language, but the entries
      ARE sorted. By comparing consecutive entries, you deduce letter ordering: if "abc" comes before
      "abd", then c < d in this language. Collect all such deductions, then find an order that satisfies
      them all — that's topological sort.`,

    whyNaiveFails: `Simply reading characters from the words doesn't tell us the order. We need to extract
      CONSTRAINTS from the sorted order. Each pair of adjacent words gives at most one constraint
      (at the first differing character). Without topological sort, we'd need exponential enumeration
      of possible orderings.`,

    keyObservation: `Two important edge cases: (1) If a longer word comes before its prefix (e.g., "abc"
      before "ab"), the ordering is invalid — return "". (2) If there are cycles in the constraint
      graph, no valid ordering exists — return "". Topological sort naturally detects both.`,
  },

  problem: `There is a new alien language that uses the English alphabet. However, the order of the
    letters is unknown to you. You are given a list of strings words from the alien language's
    dictionary, where the strings are sorted lexicographically by the rules of this new language.
    Derive the order of letters in this language. If the order is invalid, return "". If there are
    multiple valid orderings, return any of them.`,

  examples: [
    { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"', explanation: "From comparisons: t<f, w<e, r<t, e<r" },
    { input: 'words = ["z","x"]', output: '"zx"', explanation: "z comes before x" },
    { input: 'words = ["z","x","z"]', output: '""', explanation: "Invalid — z before x before z creates a cycle" },
  ],

  constraints: [
    "1 <= words.length <= 100",
    "1 <= words[i].length <= 100",
    "words[i] consists of only lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "BFS Topological Sort (Kahn's)",
      tier: "brute",
      timeComplexity: "O(C)",
      spaceComplexity: "O(1)",
      idea: "Extract ordering constraints from adjacent word pairs. Build a graph. Use BFS (Kahn's algorithm) with in-degree tracking for topological sort. C = total characters across all words.",

      javaCode: `public String alienOrder(String[] words) {
    Map<Character, Set<Character>> adj = new HashMap<>();
    Map<Character, Integer> inDegree = new HashMap<>();
    for (String w : words)
        for (char c : w.toCharArray())
            inDegree.putIfAbsent(c, 0);

    for (int i = 0; i < words.length - 1; i++) {
        String w1 = words[i], w2 = words[i + 1];
        if (w1.length() > w2.length() && w1.startsWith(w2)) return "";
        for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
            if (w1.charAt(j) != w2.charAt(j)) {
                Set<Character> set = adj.computeIfAbsent(w1.charAt(j), k -> new HashSet<>());
                if (set.add(w2.charAt(j))) {
                    inDegree.merge(w2.charAt(j), 1, Integer::sum);
                }
                break;
            }
        }
    }

    Queue<Character> queue = new LinkedList<>();
    for (var e : inDegree.entrySet())
        if (e.getValue() == 0) queue.offer(e.getKey());

    StringBuilder sb = new StringBuilder();
    while (!queue.isEmpty()) {
        char c = queue.poll();
        sb.append(c);
        for (char nei : adj.getOrDefault(c, Set.of())) {
            inDegree.merge(nei, -1, Integer::sum);
            if (inDegree.get(nei) == 0) queue.offer(nei);
        }
    }
    return sb.length() == inDegree.size() ? sb.toString() : "";
}`,

      cppCode: `string alienOrder(vector<string>& words) {
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, int> inDegree;
    for (auto& w : words)
        for (char c : w)
            inDegree[c];  // ensure entry exists with 0

    for (int i = 0; i < words.size() - 1; i++) {
        string &w1 = words[i], &w2 = words[i+1];
        if (w1.size() > w2.size() && w1.substr(0, w2.size()) == w2) return "";
        for (int j = 0; j < min(w1.size(), w2.size()); j++) {
            if (w1[j] != w2[j]) {
                if (!adj[w1[j]].count(w2[j])) {
                    adj[w1[j]].insert(w2[j]);
                    inDegree[w2[j]]++;
                }
                break;
            }
        }
    }

    queue<char> q;
    for (auto& [c, deg] : inDegree)
        if (deg == 0) q.push(c);

    string result;
    while (!q.empty()) {
        char c = q.front(); q.pop();
        result += c;
        for (char nei : adj[c]) {
            if (--inDegree[nei] == 0) q.push(nei);
        }
    }
    return result.size() == inDegree.size() ? result : "";
}`,

      pythonCode: `def alienOrder(words: List[str]) -> str:
    adj = defaultdict(set)
    in_degree = {c: 0 for w in words for c in w}

    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        if len(w1) > len(w2) and w1[:len(w2)] == w2:
            return ""
        for j in range(min(len(w1), len(w2))):
            if w1[j] != w2[j]:
                if w2[j] not in adj[w1[j]]:
                    adj[w1[j]].add(w2[j])
                    in_degree[w2[j]] += 1
                break

    queue = deque([c for c in in_degree if in_degree[c] == 0])
    result = []

    while queue:
        c = queue.popleft()
        result.append(c)
        for nei in adj[c]:
            in_degree[nei] -= 1
            if in_degree[nei] == 0:
                queue.append(nei)

    return "".join(result) if len(result) == len(in_degree) else ""`,

      lineAnnotations: {
        2: "Collect all unique characters with initial in-degree 0",
        4: "Compare adjacent words to extract ordering constraints",
        6: "Invalid: longer word is prefix of shorter (e.g., 'abc' before 'ab')",
        8: "First differing character gives us an ordering edge",
        10: "Add edge and increment in-degree",
        11: "Only use first difference per word pair",
        14: "Start BFS with all zero-in-degree characters",
        18: "Process characters in topological order",
        20: "Decrement in-degree of neighbors",
        23: "If result length != total characters, there's a cycle → invalid",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Derive order from ["wrt","wrf","er","ett","rftt"]',
          input: { words: ["wrt","wrf","er","ett","rftt"] },
          expectedOutput: '"wertf"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Collect characters",
              explanation: "Characters found: {w, r, t, f, e}. Initialize all in-degrees to 0.",
              variables: { chars: "{w,r,t,f,e}", inDegree: "all 0" },
              dataStructure: { graphNodes: { w: { state: "default" }, r: { state: "default" }, t: { state: "default" }, f: { state: "default" }, e: { state: "default" } }, graphEdges: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 8, 10],
              shortLabel: "wrt vs wrf: t→f",
              explanation: '"wrt" vs "wrf": first difference at index 2: t vs f. So t comes before f. Add edge t→f.',
              variables: { w1: "wrt", w2: "wrf", edge: "t→f" },
              dataStructure: {
                graphNodes: { t: { state: "active" }, f: { state: "active" } },
                graphEdges: [{ from: "t", to: "f", state: "traversed" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 8, 10],
              shortLabel: "wrf vs er: w→e",
              explanation: '"wrf" vs "er": first difference at index 0: w vs e. Add edge w→e.',
              variables: { w1: "wrf", w2: "er", edge: "w→e" },
              dataStructure: {
                graphNodes: { w: { state: "active" }, e: { state: "active" } },
                graphEdges: [{ from: "t", to: "f", state: "traversed" }, { from: "w", to: "e", state: "traversed" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 8, 10],
              shortLabel: "er vs ett: r→t",
              explanation: '"er" vs "ett": first difference at index 1: r vs t. Add edge r→t.',
              variables: { w1: "er", w2: "ett", edge: "r→t" },
              dataStructure: {
                graphNodes: { r: { state: "active" }, t: { state: "active" } },
                graphEdges: [{ from: "t", to: "f", state: "traversed" }, { from: "w", to: "e", state: "traversed" }, { from: "r", to: "t", state: "traversed" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 8, 10],
              shortLabel: "ett vs rftt: e→r",
              explanation: '"ett" vs "rftt": first difference at index 0: e vs r. Add edge e→r.',
              variables: { w1: "ett", w2: "rftt", edge: "e→r" },
              dataStructure: {
                graphNodes: { e: { state: "active" }, r: { state: "active" } },
                graphEdges: [{ from: "t", to: "f", state: "traversed" }, { from: "w", to: "e", state: "traversed" }, { from: "r", to: "t", state: "traversed" }, { from: "e", to: "r", state: "traversed" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14],
              shortLabel: "BFS: start with in-degree 0",
              explanation: "In-degrees: w=0, e=1, r=1, t=1, f=1. Only 'w' has in-degree 0. Start BFS with 'w'.",
              variables: { queue: "[w]", inDegree: "w:0, e:1, r:1, t:1, f:1" },
              dataStructure: {
                graphNodes: { w: { state: "queued" } },
                graphEdges: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [18, 20],
              shortLabel: "Process w → e becomes 0",
              explanation: "Dequeue 'w'. Add to result. Neighbor 'e': in-degree 1→0. Enqueue 'e'. Result: 'w'.",
              variables: { result: "w", queue: "[e]" },
              dataStructure: {
                graphNodes: { w: { state: "visited" }, e: { state: "queued" } },
                graphEdges: [{ from: "w", to: "e", state: "traversed" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [18, 20],
              shortLabel: "Process e → r becomes 0",
              explanation: "Dequeue 'e'. Neighbor 'r': in-degree 0. Enqueue. Result: 'we'.",
              variables: { result: "we", queue: "[r]" },
              dataStructure: {
                graphNodes: { e: { state: "visited" }, r: { state: "queued" } },
                graphEdges: [{ from: "e", to: "r", state: "traversed" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [18, 20],
              shortLabel: "Process r → t → f",
              explanation: "Process 'r'→enqueue 't'. Process 't'→enqueue 'f'. Process 'f'. Result: 'wertf'.",
              variables: { result: "wertf" },
              dataStructure: {
                graphNodes: { r: { state: "visited" }, t: { state: "visited" }, f: { state: "visited" } },
                graphEdges: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [23],
              shortLabel: 'Return "wertf"',
              explanation: 'Result length 5 = number of characters 5. No cycle. Valid ordering: "wertf".',
              variables: { result: "wertf", answer: "wertf" },
              dataStructure: {
                graphNodes: { w: { state: "found" }, e: { state: "found" }, r: { state: "found" }, t: { state: "found" }, f: { state: "found" } },
                graphEdges: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Cycle → Invalid",
          description: "Contradictory ordering creates a cycle",
          input: { words: ["z","x","z"] },
          expectedOutput: '""',
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 8, 10],
              shortLabel: "z vs x: z→x, x vs z: x→z",
              explanation: "z before x → edge z→x. x before z → edge x→z. This creates a cycle!",
              variables: { edges: "z→x, x→z" },
              dataStructure: {
                graphNodes: { z: { state: "active" }, x: { state: "active" } },
                graphEdges: [{ from: "z", to: "x", state: "traversed" }, { from: "x", to: "z", state: "traversed" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [14],
              shortLabel: "No zero in-degree → cycle",
              explanation: "In-degrees: z=1, x=1. No character has in-degree 0. BFS can't start. Cycle detected.",
              variables: { inDegree: "z:1, x:1" },
              dataStructure: {
                graphNodes: { z: { state: "eliminated" }, x: { state: "eliminated" } },
                graphEdges: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [23],
              shortLabel: 'Return ""',
              explanation: "Result length 0 != 2 characters. Cycle exists — no valid ordering. Return empty string.",
              variables: { answer: "" },
              dataStructure: { graphNodes: {}, graphEdges: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ words }) {
        const steps = [];
        const adj = {};
        const inDegree = {};

        for (const w of words) {
          for (const c of w) {
            if (inDegree[c] === undefined) inDegree[c] = 0;
          }
        }

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Collect characters",
          explanation: `Found characters: {${Object.keys(inDegree).join(",")}}.`,
          variables: { chars: Object.keys(inDegree).join(",") },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < words.length - 1; i++) {
          const w1 = words[i], w2 = words[i + 1];
          if (w1.length > w2.length && w1.startsWith(w2)) {
            steps.push({
              stepId: steps.length, lineNumbers: [6],
              shortLabel: `"${w1}" prefix of "${w2}" — invalid!`,
              explanation: `"${w1}" is longer than "${w2}" and starts with it. Invalid ordering. Return "".`,
              variables: { answer: "" },
              dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
              delta: {}, isAnswer: true,
            });
            return steps;
          }
          for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
            if (w1[j] !== w2[j]) {
              if (!adj[w1[j]]) adj[w1[j]] = new Set();
              if (!adj[w1[j]].has(w2[j])) {
                adj[w1[j]].add(w2[j]);
                inDegree[w2[j]] = (inDegree[w2[j]] || 0) + 1;

                steps.push({
                  stepId: steps.length, lineNumbers: [8, 10],
                  shortLabel: `${w1} vs ${w2}: ${w1[j]}→${w2[j]}`,
                  explanation: `First difference: "${w1[j]}" vs "${w2[j]}". Edge: ${w1[j]}→${w2[j]}.`,
                  variables: { w1, w2, edge: `${w1[j]}→${w2[j]}` },
                  dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [`compare '${w1[j]}' vs '${w2[j]}'`] },
                  delta: {}, isAnswer: false,
                });
              }
              break;
            }
          }
        }

        const queue = Object.keys(inDegree).filter(c => inDegree[c] === 0);
        const result = [];

        while (queue.length > 0) {
          const c = queue.shift();
          result.push(c);
          for (const nei of (adj[c] || [])) {
            inDegree[nei]--;
            if (inDegree[nei] === 0) queue.push(nei);
          }
        }

        const answer = result.length === Object.keys(inDegree).length ? result.join("") : "";
        steps.push({
          stepId: steps.length, lineNumbers: [23],
          shortLabel: answer ? `Return "${answer}"` : 'Cycle → ""',
          explanation: answer ? `Valid topological order: "${answer}".` : "Cycle detected. No valid ordering.",
          variables: { answer },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: answer ? result.map(c => `process('${c}')`) : ["CYCLE!"] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "DFS Topological Sort",
      tier: "optimal",
      timeComplexity: "O(C)",
      spaceComplexity: "O(1)",
      idea: "Same constraint extraction, but use DFS-based topological sort. Post-order DFS gives reverse topological order. Detect cycles via 'visiting' state.",

      javaCode: `public String alienOrder(String[] words) {
    Map<Character, Set<Character>> adj = new HashMap<>();
    for (String w : words)
        for (char c : w.toCharArray())
            adj.putIfAbsent(c, new HashSet<>());

    for (int i = 0; i < words.length - 1; i++) {
        String w1 = words[i], w2 = words[i + 1];
        if (w1.length() > w2.length() && w1.startsWith(w2)) return "";
        for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
            if (w1.charAt(j) != w2.charAt(j)) {
                adj.get(w1.charAt(j)).add(w2.charAt(j));
                break;
            }
        }
    }

    Map<Character, Integer> state = new HashMap<>(); // 0=unvisited, 1=visiting, 2=visited
    StringBuilder result = new StringBuilder();

    for (char c : adj.keySet()) {
        if (state.getOrDefault(c, 0) == 0) {
            if (!dfs(c, adj, state, result)) return "";
        }
    }
    return result.reverse().toString();
}

private boolean dfs(char c, Map<Character, Set<Character>> adj, Map<Character, Integer> state, StringBuilder result) {
    state.put(c, 1); // visiting
    for (char nei : adj.getOrDefault(c, Set.of())) {
        if (state.getOrDefault(nei, 0) == 1) return false; // cycle
        if (state.getOrDefault(nei, 0) == 0 && !dfs(nei, adj, state, result)) return false;
    }
    state.put(c, 2); // visited
    result.append(c);
    return true;
}`,

      cppCode: `string alienOrder(vector<string>& words) {
    unordered_map<char, unordered_set<char>> adj;
    for (auto& w : words) for (char c : w) adj[c];

    for (int i = 0; i < words.size() - 1; i++) {
        string &w1 = words[i], &w2 = words[i+1];
        if (w1.size() > w2.size() && w1.substr(0, w2.size()) == w2) return "";
        for (int j = 0; j < min(w1.size(), w2.size()); j++) {
            if (w1[j] != w2[j]) { adj[w1[j]].insert(w2[j]); break; }
        }
    }

    unordered_map<char, int> state;
    string result;

    function<bool(char)> dfs = [&](char c) -> bool {
        state[c] = 1;
        for (char nei : adj[c]) {
            if (state[nei] == 1) return false;
            if (state[nei] == 0 && !dfs(nei)) return false;
        }
        state[c] = 2;
        result += c;
        return true;
    };

    for (auto& [c, _] : adj) if (state[c] == 0 && !dfs(c)) return "";
    reverse(result.begin(), result.end());
    return result;
}`,

      pythonCode: `def alienOrder(words: List[str]) -> str:
    adj = {c: set() for w in words for c in w}

    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        if len(w1) > len(w2) and w1[:len(w2)] == w2:
            return ""
        for j in range(min(len(w1), len(w2))):
            if w1[j] != w2[j]:
                adj[w1[j]].add(w2[j])
                break

    state = {}  # 0=unvisited, 1=visiting, 2=visited
    result = []

    def dfs(c):
        state[c] = 1
        for nei in adj[c]:
            if state.get(nei, 0) == 1:
                return False
            if state.get(nei, 0) == 0 and not dfs(nei):
                return False
        state[c] = 2
        result.append(c)
        return True

    for c in adj:
        if state.get(c, 0) == 0:
            if not dfs(c):
                return ""

    return "".join(reversed(result))`,

      lineAnnotations: {
        2: "Build adjacency map with all characters",
        6: "Invalid: longer word comes before its prefix",
        9: "First differing character gives ordering edge",
        13: "Three states: 0=unvisited, 1=visiting (in current DFS path), 2=done",
        16: "Mark as visiting (cycle detection)",
        18: "If neighbor is currently being visited → CYCLE",
        22: "Mark as fully processed",
        23: "Post-order: add to result after all descendants processed",
        28: "Reverse post-order = topological order",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "DFS Topo Sort",
          description: 'DFS-based ordering of ["wrt","wrf","er","ett","rftt"]',
          input: { words: ["wrt","wrf","er","ett","rftt"] },
          expectedOutput: '"wertf"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 4, 9],
              shortLabel: "Extract edges: t→f, w→e, r→t, e→r",
              explanation: "Compare adjacent words. Extract constraints: t→f, w→e, r→t, e→r.",
              variables: { edges: "t→f, w→e, r→t, e→r" },
              dataStructure: { graphNodes: {}, graphEdges: [{ from: "t", to: "f" }, { from: "w", to: "e" }, { from: "r", to: "t" }, { from: "e", to: "r" }], dfsStack: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [16, 17, 18, 22, 23],
              shortLabel: "DFS from w: w→e→r→t→f",
              explanation: "DFS from 'w': visit w→e→r→t→f. Post-order: f,t,r,e,w. No cycles.",
              variables: { postOrder: "f,t,r,e,w" },
              dataStructure: { graphNodes: { w: { state: "visited" }, e: { state: "visited" }, r: { state: "visited" }, t: { state: "visited" }, f: { state: "visited" } }, graphEdges: [], dfsStack: ["dfs('w')", "dfs('e')", "dfs('r')", "dfs('t')", "dfs('f')"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [28],
              shortLabel: 'Reverse → "wertf"',
              explanation: 'Reverse post-order: "wertf". Valid topological ordering.',
              variables: { answer: "wertf" },
              dataStructure: { graphNodes: { w: { state: "found" }, e: { state: "found" }, r: { state: "found" }, t: { state: "found" }, f: { state: "found" } }, graphEdges: [], dfsStack: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Prefix Invalid",
          description: "Longer word before its prefix",
          input: { words: ["abc","ab"] },
          expectedOutput: '""',
          steps: [
            {
              stepId: 0,
              lineNumbers: [6],
              shortLabel: '"abc" before "ab" — invalid!',
              explanation: '"abc" is longer than "ab" and starts with "ab". This is invalid in any ordering. Return "".',
              variables: { answer: "" },
              dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ words }) {
        const steps = [];
        const adj = {};
        for (const w of words) for (const c of w) if (!adj[c]) adj[c] = new Set();

        for (let i = 0; i < words.length - 1; i++) {
          const w1 = words[i], w2 = words[i + 1];
          if (w1.length > w2.length && w1.startsWith(w2)) {
            steps.push({
              stepId: 0, lineNumbers: [6],
              shortLabel: `"${w1}" before "${w2}" — invalid!`,
              explanation: `Prefix violation. Return "".`,
              variables: { answer: "" },
              dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: [] },
              delta: {}, isAnswer: true,
            });
            return steps;
          }
          for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
            if (w1[j] !== w2[j]) {
              adj[w1[j]].add(w2[j]);
              break;
            }
          }
        }

        const state = {};
        const result = [];
        let hasCycle = false;

        function dfs(c) {
          state[c] = 1;
          for (const nei of adj[c]) {
            if (state[nei] === 1) { hasCycle = true; return; }
            if (!state[nei]) dfs(nei);
            if (hasCycle) return;
          }
          state[c] = 2;
          result.push(c);
        }

        for (const c of Object.keys(adj)) {
          if (!state[c]) dfs(c);
          if (hasCycle) break;
        }

        const answer = hasCycle ? "" : result.reverse().join("");
        steps.push({
          stepId: 0, lineNumbers: [28],
          shortLabel: answer ? `Return "${answer}"` : 'Cycle → ""',
          explanation: answer ? `Valid ordering: "${answer}".` : "Cycle detected. No valid ordering.",
          variables: { answer },
          dataStructure: { graphNodes: {}, graphEdges: [], dfsStack: answer ? answer.split("").map(c => `dfs('${c}')`) : ["CYCLE detected!"] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(C)", space: "O(1)", explanation: "C = total characters. At most 26 unique characters, so graph operations are O(1)" },
    optimal: { time: "O(C)", space: "O(1)", explanation: "Same asymptotic complexity. DFS topo sort is cleaner for cycle detection", tradeoff: "DFS naturally detects cycles via 'visiting' state; BFS detects via incomplete result" },
  },

  interviewTips: [
    "Break the problem into two parts: (1) extract constraints, (2) topological sort.",
    "Handle the prefix edge case first — 'abc' before 'ab' is always invalid.",
    "Mention both BFS (Kahn's) and DFS approaches for topological sort.",
    "The alphabet has at most 26 letters, so the graph is tiny — O(1) for graph operations.",
    "If there are multiple valid orderings, any topological sort result is acceptable.",
  ],

  relatedProblems: ["course-schedule", "course-schedule-ii"],
};
