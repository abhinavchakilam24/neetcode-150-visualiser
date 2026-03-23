export const reconstructItinerary = {
  id: 93,
  slug: "reconstruct-itinerary",
  title: "Reconstruct Itinerary",
  difficulty: "Hard",
  topic: "advanced-graphs",
  topicLabel: "Advanced Graphs",
  neetcodeNumber: 93,
  artifactType: "GraphDFS",
  companies: ["Google", "Amazon", "Meta", "Uber", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/reconstruct-itinerary/",

  pattern: "Eulerian Path via Hierholzer's Algorithm",
  patternExplanation: `When you need to visit every edge exactly once (Eulerian path), use Hierholzer's algorithm:
    build an adjacency list, greedily follow the smallest-lexicographic neighbor, and when stuck,
    backtrack by appending the current node to the front of the result.`,

  intuition: {
    coreInsight: `This is an Eulerian path problem — we must use every ticket (edge) exactly once.
      Hierholzer's algorithm solves this by doing a DFS and appending nodes to the result in reverse
      post-order. When we get stuck at a dead end, that node must be the last stop on some sub-path,
      so we add it to the front of our itinerary and backtrack to continue from where we left off.`,

    mentalModel: `Imagine you're a traveler with a pile of airline tickets. You sort them
      alphabetically for each departure city. You always pick the earliest alphabetical flight
      available. When you land somewhere with no remaining tickets, you write that city at the END
      of your itinerary (it's a dead end). Then you "un-fly" back and continue with remaining
      tickets. Reading the itinerary in reverse gives you the correct path — you placed dead-end
      cities last, which is exactly where they belong.`,

    whyNaiveFails: `A pure greedy DFS (always pick lexicographically smallest) can get stuck in a
      dead-end cycle before visiting all edges. For example, with tickets [JFK→ATL, JFK→SFO, SFO→JFK],
      greedy picks JFK→ATL first and gets stuck. You need the backtracking insight of Hierholzer's:
      dead ends get placed at the back of the itinerary, not the front.`,

    keyObservation: `Sort each adjacency list lexicographically, then DFS. When you run out of
      neighbors at a node, prepend it to the result. This reverse-post-order construction
      naturally handles the case where you must "save" certain edges for later by visiting
      dead-end branches first.`,
  },

  problem: `You are given a list of airline tickets where tickets[i] = [from_i, to_i] represent
    the departure and arrival airports of one flight. Reconstruct the itinerary in order and return it.
    All of the tickets belong to a man who departs from "JFK", thus the itinerary must begin with "JFK".
    If there are multiple valid itineraries, return the one with the smallest lexicographic order.
    You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.`,

  examples: [
    {
      input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
      output: '["JFK","MUC","LHR","SFO","SJC"]',
      explanation: "JFK → MUC → LHR → SFO → SJC uses all 4 tickets.",
    },
    {
      input: 'tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]',
      output: '["JFK","ATL","JFK","SFO","ATL","SFO"]',
      explanation: "Must use all 5 tickets. The lexicographically smallest valid path.",
    },
  ],

  constraints: [
    "1 <= tickets.length <= 300",
    "tickets[i].length == 2",
    "from_i.length == 3, to_i.length == 3 (airport codes)",
    "from_i and to_i consist of uppercase English letters",
    'from_i != to_i',
  ],

  approaches: {
    brute: {
      label: "Backtracking (All Permutations)",
      tier: "brute",
      timeComplexity: "O(E!)",
      spaceComplexity: "O(E)",
      idea: `Try all permutations of tickets. For each permutation, check if it forms a valid path starting from JFK.
        Return the lexicographically smallest valid one.`,

      javaCode: `class Solution {
    List<String> result;

    public List<String> findItinerary(List<List<String>> tickets) {
        Collections.sort(tickets, (a, b) -> {
            if (a.get(0).equals(b.get(0))) return a.get(1).compareTo(b.get(1));
            return a.get(0).compareTo(b.get(0));
        });
        result = new ArrayList<>();
        List<String> path = new ArrayList<>();
        path.add("JFK");
        boolean[] used = new boolean[tickets.size()];
        backtrack(tickets, path, used);
        return result;
    }

    boolean backtrack(List<List<String>> tickets, List<String> path, boolean[] used) {
        if (path.size() == tickets.size() + 1) {
            result = new ArrayList<>(path);
            return true;
        }
        String curr = path.get(path.size() - 1);
        for (int i = 0; i < tickets.size(); i++) {
            if (!used[i] && tickets.get(i).get(0).equals(curr)) {
                used[i] = true;
                path.add(tickets.get(i).get(1));
                if (backtrack(tickets, path, used)) return true;
                path.remove(path.size() - 1);
                used[i] = false;
            }
        }
        return false;
    }
}`,

      cppCode: `class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        sort(tickets.begin(), tickets.end());
        vector<string> result, path = {"JFK"};
        vector<bool> used(tickets.size(), false);
        backtrack(tickets, path, used, result);
        return result;
    }

    bool backtrack(vector<vector<string>>& tickets, vector<string>& path,
                   vector<bool>& used, vector<string>& result) {
        if (path.size() == tickets.size() + 1) {
            result = path;
            return true;
        }
        for (int i = 0; i < tickets.size(); i++) {
            if (!used[i] && tickets[i][0] == path.back()) {
                used[i] = true;
                path.push_back(tickets[i][1]);
                if (backtrack(tickets, path, used, result)) return true;
                path.pop_back();
                used[i] = false;
            }
        }
        return false;
    }
};`,

      pythonCode: `def findItinerary(tickets: List[List[str]]) -> List[str]:
    tickets.sort()
    result = []
    path = ["JFK"]
    used = [False] * len(tickets)

    def backtrack():
        if len(path) == len(tickets) + 1:
            result.extend(path)
            return True
        curr = path[-1]
        for i in range(len(tickets)):
            if not used[i] and tickets[i][0] == curr:
                used[i] = True
                path.append(tickets[i][1])
                if backtrack():
                    return True
                path.pop()
                used[i] = False
        return False

    backtrack()
    return result`,

      lineAnnotations: {
        5: "Sort tickets for lexicographic ordering",
        10: "Start path from JFK",
        14: "If all tickets used, we have a valid itinerary",
        18: "Try each unused ticket departing from current airport",
        20: "Mark ticket used and add destination",
        21: "Recurse — if it works, propagate success",
        22: "Backtrack — undo the choice",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { tickets: [["JFK","MUC"],["MUC","LHR"],["LHR","SFO"],["SFO","SJC"]] },
          expectedOutput: '["JFK","MUC","LHR","SFO","SJC"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [5],
              shortLabel: "Sort tickets",
              explanation: "Sort all tickets lexicographically. This ensures when we find the first valid path via backtracking, it is the lexicographically smallest.",
              variables: { path: '["JFK"]', ticketsUsed: "0/4" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "active", x: 50, y: 150 },
                  MUC: { state: "default", x: 175, y: 75 },
                  LHR: { state: "default", x: 300, y: 150 },
                  SFO: { state: "default", x: 425, y: 75 },
                  SJC: { state: "default", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "default" },
                  { from: "MUC", to: "LHR", state: "default" },
                  { from: "LHR", to: "SFO", state: "default" },
                  { from: "SFO", to: "SJC", state: "default" },
                ],
                dfsStack: ["JFK"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [18, 20],
              shortLabel: "JFK → MUC",
              explanation: "From JFK, the only available ticket goes to MUC. Use it and add MUC to the path.",
              variables: { path: '["JFK","MUC"]', ticketsUsed: "1/4", curr: "MUC" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "active", x: 175, y: 75 },
                  LHR: { state: "default", x: 300, y: 150 },
                  SFO: { state: "default", x: 425, y: 75 },
                  SJC: { state: "default", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "default" },
                  { from: "LHR", to: "SFO", state: "default" },
                  { from: "SFO", to: "SJC", state: "default" },
                ],
                dfsStack: ["JFK", "MUC"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [18, 20],
              shortLabel: "MUC → LHR",
              explanation: "From MUC, the only ticket goes to LHR. Use it.",
              variables: { path: '["JFK","MUC","LHR"]', ticketsUsed: "2/4", curr: "LHR" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "visited", x: 175, y: 75 },
                  LHR: { state: "active", x: 300, y: 150 },
                  SFO: { state: "default", x: 425, y: 75 },
                  SJC: { state: "default", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "default" },
                  { from: "SFO", to: "SJC", state: "default" },
                ],
                dfsStack: ["JFK", "MUC", "LHR"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [18, 20],
              shortLabel: "LHR → SFO",
              explanation: "From LHR, take the ticket to SFO.",
              variables: { path: '["JFK","MUC","LHR","SFO"]', ticketsUsed: "3/4", curr: "SFO" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "visited", x: 175, y: 75 },
                  LHR: { state: "visited", x: 300, y: 150 },
                  SFO: { state: "active", x: 425, y: 75 },
                  SJC: { state: "default", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "default" },
                ],
                dfsStack: ["JFK", "MUC", "LHR", "SFO"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [18, 20],
              shortLabel: "SFO → SJC",
              explanation: "From SFO, take the last ticket to SJC. All 4 tickets used.",
              variables: { path: '["JFK","MUC","LHR","SFO","SJC"]', ticketsUsed: "4/4", curr: "SJC" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "visited", x: 175, y: 75 },
                  LHR: { state: "visited", x: 300, y: 150 },
                  SFO: { state: "visited", x: 425, y: 75 },
                  SJC: { state: "active", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "traversed" },
                ],
                dfsStack: ["JFK", "MUC", "LHR", "SFO", "SJC"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14],
              shortLabel: "All tickets used — done!",
              explanation: "path.size() == tickets.size() + 1 (5 == 4+1). All tickets used. Return the itinerary: [JFK, MUC, LHR, SFO, SJC].",
              variables: { answer: '["JFK","MUC","LHR","SFO","SJC"]' },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "found", x: 50, y: 150 },
                  MUC: { state: "found", x: 175, y: 75 },
                  LHR: { state: "found", x: 300, y: 150 },
                  SFO: { state: "found", x: 425, y: 75 },
                  SJC: { state: "found", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "traversed" },
                ],
                dfsStack: ["JFK", "MUC", "LHR", "SFO", "SJC"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tickets }) {
        const steps = [];
        const sorted = [...tickets].sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
        const allNodes = [...new Set(sorted.flat())];
        const nodePos = {};
        allNodes.forEach((n, i) => { nodePos[n] = { x: 50 + i * 125, y: i % 2 === 0 ? 150 : 75 }; });

        const makeNodes = (states) => {
          const gn = {};
          allNodes.forEach(n => { gn[n] = { state: states[n] || "default", ...nodePos[n] }; });
          return gn;
        };
        const makeEdges = (usedSet) => sorted.map((t, i) => ({
          from: t[0], to: t[1], state: usedSet.has(i) ? "traversed" : "default"
        }));

        const path = ["JFK"];
        const used = new Set();

        function backtrack() {
          if (path.length === sorted.length + 1) {
            const states = {};
            allNodes.forEach(n => { states[n] = "found"; });
            steps.push({
              stepId: steps.length, lineNumbers: [14],
              shortLabel: "All tickets used — done!",
              explanation: `All ${sorted.length} tickets used. Itinerary: [${path.join(", ")}].`,
              variables: { answer: `[${path.join(",")}]` },
              dataStructure: { graphNodes: makeNodes(states), graphEdges: makeEdges(used), dfsStack: [...path] },
              delta: {}, isAnswer: true,
            });
            return true;
          }
          const curr = path[path.length - 1];
          for (let i = 0; i < sorted.length; i++) {
            if (!used.has(i) && sorted[i][0] === curr) {
              used.add(i);
              path.push(sorted[i][1]);
              const states = {};
              allNodes.forEach(n => { states[n] = "default"; });
              path.forEach((n, idx) => { states[n] = idx === path.length - 1 ? "active" : "visited"; });
              steps.push({
                stepId: steps.length, lineNumbers: [18, 20],
                shortLabel: `${curr} → ${sorted[i][1]}`,
                explanation: `From ${curr}, use ticket to ${sorted[i][1]}. ${used.size}/${sorted.length} tickets used.`,
                variables: { path: JSON.stringify(path), ticketsUsed: `${used.size}/${sorted.length}`, curr: sorted[i][1] },
                dataStructure: { graphNodes: makeNodes(states), graphEdges: makeEdges(used), dfsStack: [...path] },
                delta: {}, isAnswer: false,
              });
              if (backtrack()) return true;
              path.pop();
              used.delete(i);
            }
          }
          return false;
        }

        const initStates = {};
        allNodes.forEach(n => { initStates[n] = n === "JFK" ? "active" : "default"; });
        steps.push({
          stepId: 0, lineNumbers: [5],
          shortLabel: "Sort tickets",
          explanation: "Sort tickets lexicographically and start from JFK.",
          variables: { path: '["JFK"]', ticketsUsed: `0/${sorted.length}` },
          dataStructure: { graphNodes: makeNodes(initStates), graphEdges: makeEdges(new Set()), dfsStack: ["JFK"] },
          delta: {}, isAnswer: false,
        });

        backtrack();
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Hierholzer's Algorithm (DFS + Post-Order)",
      tier: "optimal",
      timeComplexity: "O(E log E)",
      spaceComplexity: "O(E)",
      idea: `Build adjacency list with sorted destinations (min-heap or sorted list).
        DFS from JFK: always visit the lexicographically smallest unvisited neighbor.
        When stuck (no more neighbors), prepend current node to result. This reverse
        post-order gives the Eulerian path.`,

      javaCode: `class Solution {
    Map<String, PriorityQueue<String>> graph = new HashMap<>();
    LinkedList<String> result = new LinkedList<>();

    public List<String> findItinerary(List<List<String>> tickets) {
        for (List<String> ticket : tickets) {
            graph.computeIfAbsent(ticket.get(0), k -> new PriorityQueue<>())
                 .add(ticket.get(1));
        }
        dfs("JFK");
        return result;
    }

    void dfs(String node) {
        PriorityQueue<String> neighbors = graph.get(node);
        while (neighbors != null && !neighbors.isEmpty()) {
            dfs(neighbors.poll());
        }
        result.addFirst(node);
    }
}`,

      cppCode: `class Solution {
public:
    unordered_map<string, priority_queue<string, vector<string>, greater<>>> graph;
    vector<string> result;

    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for (auto& t : tickets) {
            graph[t[0]].push(t[1]);
        }
        dfs("JFK");
        reverse(result.begin(), result.end());
        return result;
    }

    void dfs(string node) {
        while (graph.count(node) && !graph[node].empty()) {
            string next = graph[node].top();
            graph[node].pop();
            dfs(next);
        }
        result.push_back(node);
    }
};`,

      pythonCode: `def findItinerary(tickets: List[List[str]]) -> List[str]:
    graph = defaultdict(list)
    for src, dst in sorted(tickets, reverse=True):
        graph[src].append(dst)

    result = []

    def dfs(node):
        while graph[node]:
            dfs(graph[node].pop())
        result.append(node)

    dfs("JFK")
    return result[::-1]`,

      lineAnnotations: {
        6: "Build adjacency list — PriorityQueue keeps destinations sorted",
        7: "Add each destination to its source's priority queue",
        10: "Start DFS from JFK",
        14: "DFS: visit node",
        15: "While this node still has unvisited outgoing edges",
        16: "Poll smallest destination and recurse into it",
        18: "No more neighbors — this is a dead end. Prepend to result",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Linear path with no branches",
          input: { tickets: [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]] },
          expectedOutput: '["JFK","MUC","LHR","SFO","SJC"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [6, 7],
              shortLabel: "Build graph",
              explanation: "Build adjacency list from tickets. Each source maps to a priority queue (min-heap) of destinations: JFK→[MUC], MUC→[LHR], LHR→[SFO], SFO→[SJC].",
              variables: { graph: "JFK→[MUC], MUC→[LHR], LHR→[SFO], SFO→[SJC]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "default", x: 50, y: 150 },
                  MUC: { state: "default", x: 175, y: 75 },
                  LHR: { state: "default", x: 300, y: 150 },
                  SFO: { state: "default", x: 425, y: 75 },
                  SJC: { state: "default", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "default" },
                  { from: "MUC", to: "LHR", state: "default" },
                  { from: "LHR", to: "SFO", state: "default" },
                  { from: "SFO", to: "SJC", state: "default" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 14],
              shortLabel: "DFS(JFK)",
              explanation: "Start DFS from JFK. JFK has neighbors: poll MUC from its priority queue.",
              variables: { node: "JFK", neighbors: "[MUC]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "active", x: 50, y: 150 },
                  MUC: { state: "default", x: 175, y: 75 },
                  LHR: { state: "default", x: 300, y: 150 },
                  SFO: { state: "default", x: 425, y: 75 },
                  SJC: { state: "default", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "default" },
                  { from: "MUC", to: "LHR", state: "default" },
                  { from: "LHR", to: "SFO", state: "default" },
                  { from: "SFO", to: "SJC", state: "default" },
                ],
                dfsStack: ["JFK"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [15, 16],
              shortLabel: "JFK → MUC, DFS(MUC)",
              explanation: "Poll MUC from JFK's queue. Traverse edge JFK→MUC. Recurse into DFS(MUC). MUC has neighbors: [LHR].",
              variables: { node: "MUC", neighbors: "[LHR]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "active", x: 175, y: 75 },
                  LHR: { state: "default", x: 300, y: 150 },
                  SFO: { state: "default", x: 425, y: 75 },
                  SJC: { state: "default", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "default" },
                  { from: "LHR", to: "SFO", state: "default" },
                  { from: "SFO", to: "SJC", state: "default" },
                ],
                dfsStack: ["JFK", "MUC"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15, 16],
              shortLabel: "MUC → LHR, DFS(LHR)",
              explanation: "Poll LHR from MUC's queue. Traverse MUC→LHR. Recurse into DFS(LHR). LHR has neighbors: [SFO].",
              variables: { node: "LHR", neighbors: "[SFO]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "visited", x: 175, y: 75 },
                  LHR: { state: "active", x: 300, y: 150 },
                  SFO: { state: "default", x: 425, y: 75 },
                  SJC: { state: "default", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "default" },
                  { from: "SFO", to: "SJC", state: "default" },
                ],
                dfsStack: ["JFK", "MUC", "LHR"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15, 16],
              shortLabel: "LHR → SFO, DFS(SFO)",
              explanation: "Poll SFO from LHR's queue. Traverse LHR→SFO. Recurse into DFS(SFO). SFO has neighbors: [SJC].",
              variables: { node: "SFO", neighbors: "[SJC]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "visited", x: 175, y: 75 },
                  LHR: { state: "visited", x: 300, y: 150 },
                  SFO: { state: "active", x: 425, y: 75 },
                  SJC: { state: "default", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "default" },
                ],
                dfsStack: ["JFK", "MUC", "LHR", "SFO"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [15, 16],
              shortLabel: "SFO → SJC, DFS(SJC)",
              explanation: "Poll SJC from SFO's queue. Traverse SFO→SJC. Recurse into DFS(SJC). SJC has no neighbors — it's a dead end.",
              variables: { node: "SJC", neighbors: "[]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "visited", x: 175, y: 75 },
                  LHR: { state: "visited", x: 300, y: 150 },
                  SFO: { state: "visited", x: 425, y: 75 },
                  SJC: { state: "active", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "traversed" },
                ],
                dfsStack: ["JFK", "MUC", "LHR", "SFO", "SJC"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [18],
              shortLabel: "Dead end: prepend SJC",
              explanation: "SJC has no outgoing edges. Prepend SJC to result. Result = [SJC]. Backtrack to SFO.",
              variables: { node: "SJC", result: "[SJC]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "visited", x: 175, y: 75 },
                  LHR: { state: "visited", x: 300, y: 150 },
                  SFO: { state: "active", x: 425, y: 75 },
                  SJC: { state: "found", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "traversed" },
                ],
                dfsStack: ["JFK", "MUC", "LHR", "SFO"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [18],
              shortLabel: "Prepend SFO",
              explanation: "Back at SFO — no more neighbors. Prepend SFO. Result = [SFO, SJC]. Backtrack to LHR.",
              variables: { node: "SFO", result: "[SFO, SJC]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "visited", x: 175, y: 75 },
                  LHR: { state: "active", x: 300, y: 150 },
                  SFO: { state: "found", x: 425, y: 75 },
                  SJC: { state: "found", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "traversed" },
                ],
                dfsStack: ["JFK", "MUC", "LHR"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [18],
              shortLabel: "Prepend LHR",
              explanation: "Back at LHR — no more neighbors. Prepend LHR. Result = [LHR, SFO, SJC].",
              variables: { node: "LHR", result: "[LHR, SFO, SJC]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 50, y: 150 },
                  MUC: { state: "active", x: 175, y: 75 },
                  LHR: { state: "found", x: 300, y: 150 },
                  SFO: { state: "found", x: 425, y: 75 },
                  SJC: { state: "found", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "traversed" },
                ],
                dfsStack: ["JFK", "MUC"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [18],
              shortLabel: "Prepend MUC",
              explanation: "Back at MUC — no more neighbors. Prepend MUC. Result = [MUC, LHR, SFO, SJC].",
              variables: { node: "MUC", result: "[MUC, LHR, SFO, SJC]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "active", x: 50, y: 150 },
                  MUC: { state: "found", x: 175, y: 75 },
                  LHR: { state: "found", x: 300, y: 150 },
                  SFO: { state: "found", x: 425, y: 75 },
                  SJC: { state: "found", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "traversed" },
                ],
                dfsStack: ["JFK"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [18],
              shortLabel: "Prepend JFK — done!",
              explanation: "Back at JFK — no more neighbors. Prepend JFK. Final result = [JFK, MUC, LHR, SFO, SJC]. This is the complete Eulerian path using all tickets.",
              variables: { answer: '["JFK","MUC","LHR","SFO","SJC"]' },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "found", x: 50, y: 150 },
                  MUC: { state: "found", x: 175, y: 75 },
                  LHR: { state: "found", x: 300, y: 150 },
                  SFO: { state: "found", x: 425, y: 75 },
                  SJC: { state: "found", x: 550, y: 150 },
                },
                graphEdges: [
                  { from: "JFK", to: "MUC", state: "traversed" },
                  { from: "MUC", to: "LHR", state: "traversed" },
                  { from: "LHR", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "SJC", state: "traversed" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Cycle with Branch",
          description: "Graph has a cycle — greedy alone would get stuck",
          input: { tickets: [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]] },
          expectedOutput: '["JFK","ATL","JFK","SFO","ATL","SFO"]',
          commonMistake: "A naive greedy DFS picks JFK→ATL first (lexicographically smallest). From ATL it goes to JFK, then SFO, then ATL, then SFO — but now we've left the JFK→SFO ticket unused. Hierholzer's handles this by post-order insertion.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [6, 7],
              shortLabel: "Build graph",
              explanation: "Build adjacency list with min-heaps. JFK→[ATL, SFO], SFO→[ATL], ATL→[JFK, SFO]. Sorted lexicographically in each queue.",
              variables: { graph: "JFK→[ATL,SFO], SFO→[ATL], ATL→[JFK,SFO]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "default", x: 100, y: 50 },
                  ATL: { state: "default", x: 300, y: 50 },
                  SFO: { state: "default", x: 200, y: 200 },
                },
                graphEdges: [
                  { from: "JFK", to: "ATL", state: "default" },
                  { from: "JFK", to: "SFO", state: "default" },
                  { from: "SFO", to: "ATL", state: "default" },
                  { from: "ATL", to: "JFK", state: "default" },
                  { from: "ATL", to: "SFO", state: "default" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 14, 15, 16],
              shortLabel: "DFS(JFK) → ATL",
              explanation: "Start at JFK. Poll smallest neighbor: ATL. Traverse JFK→ATL. Recurse DFS(ATL).",
              variables: { node: "ATL", jfkQueue: "[SFO]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 100, y: 50 },
                  ATL: { state: "active", x: 300, y: 50 },
                  SFO: { state: "default", x: 200, y: 200 },
                },
                graphEdges: [
                  { from: "JFK", to: "ATL", state: "traversed" },
                  { from: "JFK", to: "SFO", state: "default" },
                  { from: "SFO", to: "ATL", state: "default" },
                  { from: "ATL", to: "JFK", state: "default" },
                  { from: "ATL", to: "SFO", state: "default" },
                ],
                dfsStack: ["JFK", "ATL"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [15, 16],
              shortLabel: "DFS(ATL) → JFK",
              explanation: "At ATL, poll smallest: JFK. Traverse ATL→JFK. Recurse DFS(JFK). JFK still has SFO in its queue.",
              variables: { node: "JFK", atlQueue: "[SFO]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "active", x: 100, y: 50 },
                  ATL: { state: "visited", x: 300, y: 50 },
                  SFO: { state: "default", x: 200, y: 200 },
                },
                graphEdges: [
                  { from: "JFK", to: "ATL", state: "traversed" },
                  { from: "JFK", to: "SFO", state: "default" },
                  { from: "SFO", to: "ATL", state: "default" },
                  { from: "ATL", to: "JFK", state: "traversed" },
                  { from: "ATL", to: "SFO", state: "default" },
                ],
                dfsStack: ["JFK", "ATL", "JFK"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15, 16],
              shortLabel: "DFS(JFK) → SFO",
              explanation: "Back at JFK (second visit). Poll SFO from JFK's queue. Traverse JFK→SFO. JFK's queue is now empty.",
              variables: { node: "SFO", jfkQueue: "[]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 100, y: 50 },
                  ATL: { state: "visited", x: 300, y: 50 },
                  SFO: { state: "active", x: 200, y: 200 },
                },
                graphEdges: [
                  { from: "JFK", to: "ATL", state: "traversed" },
                  { from: "JFK", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "ATL", state: "default" },
                  { from: "ATL", to: "JFK", state: "traversed" },
                  { from: "ATL", to: "SFO", state: "default" },
                ],
                dfsStack: ["JFK", "ATL", "JFK", "SFO"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15, 16],
              shortLabel: "DFS(SFO) → ATL",
              explanation: "At SFO, poll ATL. Traverse SFO→ATL. Recurse DFS(ATL). ATL still has SFO remaining.",
              variables: { node: "ATL", sfoQueue: "[]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 100, y: 50 },
                  ATL: { state: "active", x: 300, y: 50 },
                  SFO: { state: "visited", x: 200, y: 200 },
                },
                graphEdges: [
                  { from: "JFK", to: "ATL", state: "traversed" },
                  { from: "JFK", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "ATL", state: "traversed" },
                  { from: "ATL", to: "JFK", state: "traversed" },
                  { from: "ATL", to: "SFO", state: "default" },
                ],
                dfsStack: ["JFK", "ATL", "JFK", "SFO", "ATL"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [15, 16],
              shortLabel: "DFS(ATL) → SFO",
              explanation: "At ATL (second visit), poll SFO. Traverse ATL→SFO. All edges now used! SFO has empty queue.",
              variables: { node: "SFO", atlQueue: "[]", result: "[]" },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "visited", x: 100, y: 50 },
                  ATL: { state: "visited", x: 300, y: 50 },
                  SFO: { state: "active", x: 200, y: 200 },
                },
                graphEdges: [
                  { from: "JFK", to: "ATL", state: "traversed" },
                  { from: "JFK", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "ATL", state: "traversed" },
                  { from: "ATL", to: "JFK", state: "traversed" },
                  { from: "ATL", to: "SFO", state: "traversed" },
                ],
                dfsStack: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [18],
              shortLabel: "Unwind: SFO→ATL→SFO→JFK→ATL→JFK",
              explanation: "Now we unwind the recursion. Each node with no remaining neighbors gets prepended. SFO (dead end) → prepend. Then ATL → prepend. Then SFO → prepend. Then JFK → prepend. Then ATL → prepend. Then JFK → prepend. Final: [JFK, ATL, JFK, SFO, ATL, SFO].",
              variables: { answer: '["JFK","ATL","JFK","SFO","ATL","SFO"]' },
              dataStructure: {
                graphNodes: {
                  JFK: { state: "found", x: 100, y: 50 },
                  ATL: { state: "found", x: 300, y: 50 },
                  SFO: { state: "found", x: 200, y: 200 },
                },
                graphEdges: [
                  { from: "JFK", to: "ATL", state: "traversed" },
                  { from: "JFK", to: "SFO", state: "traversed" },
                  { from: "SFO", to: "ATL", state: "traversed" },
                  { from: "ATL", to: "JFK", state: "traversed" },
                  { from: "ATL", to: "SFO", state: "traversed" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tickets }) {
        const steps = [];
        const graph = {};
        const sorted = [...tickets].sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));

        for (const [src, dst] of sorted) {
          if (!graph[src]) graph[src] = [];
          graph[src].push(dst);
        }
        // Sort each adjacency list (already sorted due to sorted input, but ensure)
        for (const key in graph) graph[key].sort();

        const allNodes = [...new Set(sorted.flat())].sort();
        const nodePos = {};
        allNodes.forEach((n, i) => {
          nodePos[n] = { x: 50 + i * Math.min(150, 500 / allNodes.length), y: i % 2 === 0 ? 100 : 200 };
        });

        const edgesUsed = sorted.map(() => false);
        const result = [];
        const dfsPath = [];

        const makeNodes = (activeNode) => {
          const gn = {};
          allNodes.forEach(n => {
            let state = "default";
            if (result.includes(n)) state = "found";
            else if (n === activeNode) state = "active";
            else if (dfsPath.includes(n)) state = "visited";
            gn[n] = { state, ...nodePos[n] };
          });
          return gn;
        };
        const makeEdges = () => sorted.map((t, i) => ({
          from: t[0], to: t[1], state: edgesUsed[i] ? "traversed" : "default"
        }));

        steps.push({
          stepId: 0, lineNumbers: [6, 7],
          shortLabel: "Build graph",
          explanation: `Build adjacency list from ${sorted.length} tickets.`,
          variables: { graph: allNodes.map(n => `${n}→[${(graph[n] || []).join(",")}]`).join(", "), result: "[]" },
          dataStructure: { graphNodes: makeNodes(null), graphEdges: makeEdges(), dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        // Deep copy graph for DFS consumption
        const gCopy = {};
        for (const k in graph) gCopy[k] = [...graph[k]];

        function dfs(node) {
          dfsPath.push(node);
          while (gCopy[node] && gCopy[node].length > 0) {
            const next = gCopy[node].shift();
            // Mark the edge used
            for (let i = 0; i < sorted.length; i++) {
              if (!edgesUsed[i] && sorted[i][0] === node && sorted[i][1] === next) {
                edgesUsed[i] = true;
                break;
              }
            }
            steps.push({
              stepId: steps.length, lineNumbers: [15, 16],
              shortLabel: `${node} → ${next}`,
              explanation: `From ${node}, traverse to ${next}. ${edgesUsed.filter(Boolean).length}/${sorted.length} edges used.`,
              variables: { node: next, edgesUsed: `${edgesUsed.filter(Boolean).length}/${sorted.length}` },
              dataStructure: { graphNodes: makeNodes(next), graphEdges: makeEdges(), dfsStack: [...dfsPath, next] },
              delta: {}, isAnswer: false,
            });
            dfs(next);
          }
          result.unshift(node);
          dfsPath.pop();
          steps.push({
            stepId: steps.length, lineNumbers: [18],
            shortLabel: `Prepend ${node}`,
            explanation: `${node} has no more neighbors. Prepend to result: [${result.join(", ")}].`,
            variables: { node, result: `[${result.join(",")}]` },
            dataStructure: { graphNodes: makeNodes(null), graphEdges: makeEdges(), dfsStack: [...dfsPath] },
            delta: {}, isAnswer: result.length === sorted.length + 1,
          });
        }

        dfs("JFK");
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(E!)", space: "O(E)", explanation: "Try all permutations of edges" },
    optimal: { time: "O(E log E)", space: "O(E)", explanation: "Sort adjacency lists (E log E), then single DFS pass (E)", tradeoff: "Hierholzer's avoids exponential backtracking by using post-order insertion" },
  },

  interviewTips: [
    "Recognize this as an Eulerian path problem — visit every EDGE exactly once.",
    "Explain why greedy DFS alone fails (dead-end branches before completing the circuit).",
    "Hierholzer's key insight: dead-end nodes are placed last in the itinerary (prepend on backtrack).",
    "Mention that PriorityQueue (min-heap) handles lexicographic ordering automatically.",
    "Ask: 'Is it guaranteed all tickets form a valid itinerary?' (Yes, per the problem.)",
  ],

  relatedProblems: ["course-schedule", "course-schedule-ii"],
};
