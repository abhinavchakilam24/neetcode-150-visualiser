export const courseScheduleII = {
  id: 88,
  slug: "course-schedule-ii",
  title: "Course Schedule II",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 88,
  artifactType: "GraphDFS",
  companies: ["Amazon", "Meta", "Google", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/course-schedule-ii/",

  pattern: "Topological Sort via DFS",
  patternExplanation: `When you need to find a valid ordering of tasks with dependencies,
    use topological sort. DFS post-order reversal gives a valid topological ordering.
    Detect cycles by tracking nodes currently in the DFS recursion stack.`,

  intuition: {
    coreInsight: `Course Schedule II asks for a valid ordering — not just "is it possible?"
      but "give me the actual sequence." Topological sort does exactly this: it produces a
      linear ordering of nodes such that for every directed edge u→v, u appears before v.
      DFS naturally discovers this by visiting all descendants first (post-order), then
      reversing the result.`,

    mentalModel: `Imagine you're getting dressed. You must put on underwear before pants,
      socks before shoes, etc. If you DFS from any garment and recursively put on all
      prerequisites first, then add the current garment to your list, you get a valid
      dressing order. Reversing that list gives you the order you'd actually follow.
      A cycle means an impossible dependency — like needing pants on before underwear
      AND underwear on before pants.`,

    whyNaiveFails: `A naive approach might try all permutations of courses (n! possibilities)
      and check each for validity. For 2000 courses, that's astronomically impossible.
      Even a greedy "pick any available course" approach without proper cycle detection
      would miss cycles and produce invalid orderings.`,

    keyObservation: `The trick is using three states: unvisited, in-progress (on the current
      DFS path), and completed. If we encounter an "in-progress" node during DFS, we've
      found a cycle — return empty. Otherwise, when a node finishes (all descendants
      processed), add it to the result. The final reversed post-order IS the topological sort.`,
  },

  problem: `There are a total of numCourses courses you have to take, labeled from 0 to
    numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi]
    indicates that you must take course bi first if you want to take course ai. Return the
    ordering of courses you should take to finish all courses. If there are multiple valid
    answers, return any of them. If it is impossible to finish all courses, return an empty array.`,

  examples: [
    { input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", output: "[0,2,1,3] or [0,1,2,3]", explanation: "Course 0 has no prereqs. Courses 1,2 need 0. Course 3 needs 1 and 2." },
    { input: "numCourses = 2, prerequisites = [[1,0]]", output: "[0,1]", explanation: "Take course 0 first, then course 1." },
    { input: "numCourses = 1, prerequisites = []", output: "[0]", explanation: "Single course, no prerequisites." },
  ],

  constraints: [
    "1 <= numCourses <= 2000",
    "0 <= prerequisites.length <= numCourses * (numCourses - 1)",
    "prerequisites[i].length == 2",
    "0 <= ai, bi < numCourses",
    "ai != bi",
    "All pairs [ai, bi] are distinct.",
  ],

  approaches: {
    brute: {
      label: "BFS (Kahn's Algorithm)",
      tier: "brute",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      idea: `Compute in-degree for every node. Start with all zero in-degree nodes in a queue.
        Repeatedly dequeue, add to result, and decrement neighbors' in-degrees. If a neighbor
        reaches zero, enqueue it. If result has all nodes, return it; otherwise there's a cycle.`,

      javaCode: `public int[] findOrder(int numCourses, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    int[] inDegree = new int[numCourses];
    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
    for (int[] pre : prerequisites) {
        graph.get(pre[1]).add(pre[0]);
        inDegree[pre[0]]++;
    }
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) queue.offer(i);
    }
    int[] result = new int[numCourses];
    int idx = 0;
    while (!queue.isEmpty()) {
        int course = queue.poll();
        result[idx++] = course;
        for (int next : graph.get(course)) {
            if (--inDegree[next] == 0) queue.offer(next);
        }
    }
    return idx == numCourses ? result : new int[]{};
}`,

      cppCode: `vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    vector<int> inDegree(numCourses, 0);
    for (auto& pre : prerequisites) {
        graph[pre[1]].push_back(pre[0]);
        inDegree[pre[0]]++;
    }
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    vector<int> result;
    while (!q.empty()) {
        int course = q.front(); q.pop();
        result.push_back(course);
        for (int next : graph[course]) {
            if (--inDegree[next] == 0) q.push(next);
        }
    }
    return result.size() == numCourses ? result : vector<int>{};
}`,

      pythonCode: `def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    graph = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses
    for a, b in prerequisites:
        graph[b].append(a)
        in_degree[a] += 1
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    result = []
    while queue:
        course = queue.popleft()
        result.append(course)
        for nxt in graph[course]:
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0:
                queue.append(nxt)
    return result if len(result) == numCourses else []`,

      lineAnnotations: {
        2: "Build adjacency list representation of the graph",
        3: "Track in-degree (number of prerequisites) for each course",
        5: "Edge from prerequisite to dependent course",
        6: "Increment in-degree of the dependent course",
        8: "Initialize queue with all courses having no prerequisites",
        14: "Process courses in BFS order",
        15: "Add current course to result ordering",
        16: "For each dependent course, reduce its in-degree",
        17: "If in-degree reaches 0, all prereqs are met — enqueue it",
        20: "If we processed all courses, return result; otherwise cycle exists",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { numCourses: 4, prerequisites: [[1,0],[2,0],[3,1],[3,2]] },
          expectedOutput: "[0,1,2,3] or [0,2,1,3]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Build graph",
              explanation: "Build adjacency list: 0→[1,2], 1→[3], 2→[3]. In-degrees: [0,1,1,2]. Course 0 has no prerequisites.",
              variables: { graph: "0→[1,2], 1→[3], 2→[3]", inDegree: "[0,1,1,2]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 150, y: 50 },
                  1: { state: "default", x: 80, y: 150 },
                  2: { state: "default", x: 220, y: 150 },
                  3: { state: "default", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9, 10],
              shortLabel: "Queue: [0]",
              explanation: "Only course 0 has in-degree 0 (no prerequisites). Add it to the queue.",
              variables: { queue: "[0]", result: "[]", inDegree: "[0,1,1,2]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "queued", x: 150, y: 50 },
                  1: { state: "default", x: 80, y: 150 },
                  2: { state: "default", x: 220, y: 150 },
                  3: { state: "default", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                bfsQueue: ["0"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [14, 15],
              shortLabel: "Dequeue 0, result=[0]",
              explanation: "Dequeue course 0 and add it to result. Now process its neighbors: courses 1 and 2.",
              variables: { course: 0, queue: "[]", result: "[0]", inDegree: "[0,1,1,2]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 150, y: 50 },
                  1: { state: "default", x: 80, y: 150 },
                  2: { state: "default", x: 220, y: 150 },
                  3: { state: "default", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [16, 17],
              shortLabel: "Decrement neighbors, queue=[1,2]",
              explanation: "Decrement in-degree of courses 1 and 2. Both reach 0, so both are enqueued. In-degree: [0,0,0,2].",
              variables: { course: 0, queue: "[1,2]", result: "[0]", inDegree: "[0,0,0,2]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 150, y: 50 },
                  1: { state: "queued", x: 80, y: 150 },
                  2: { state: "queued", x: 220, y: 150 },
                  3: { state: "default", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                bfsQueue: ["1", "2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14, 15, 16, 17],
              shortLabel: "Dequeue 1, result=[0,1]",
              explanation: "Dequeue course 1, add to result. Decrement in-degree of course 3: 2→1. Course 3 still has a prerequisite (course 2).",
              variables: { course: 1, queue: "[2]", result: "[0,1]", inDegree: "[0,0,0,1]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 150, y: 50 },
                  1: { state: "visited", x: 80, y: 150 },
                  2: { state: "queued", x: 220, y: 150 },
                  3: { state: "default", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                bfsQueue: ["2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14, 15, 16, 17],
              shortLabel: "Dequeue 2, result=[0,1,2]",
              explanation: "Dequeue course 2, add to result. Decrement in-degree of course 3: 1→0. Course 3 now has no remaining prerequisites — enqueue it.",
              variables: { course: 2, queue: "[3]", result: "[0,1,2]", inDegree: "[0,0,0,0]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 150, y: 50 },
                  1: { state: "visited", x: 80, y: 150 },
                  2: { state: "visited", x: 220, y: 150 },
                  3: { state: "queued", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                ],
                bfsQueue: ["3"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14, 15, 20],
              shortLabel: "Dequeue 3, result=[0,1,2,3]",
              explanation: "Dequeue course 3, add to result. Queue is empty and we have all 4 courses in the result. Return [0,1,2,3].",
              variables: { course: 3, queue: "[]", result: "[0,1,2,3]", idx: 4 },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 150, y: 50 },
                  1: { state: "found", x: 80, y: 150 },
                  2: { state: "found", x: 220, y: 150 },
                  3: { state: "found", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ numCourses, prerequisites }) {
        const steps = [];
        const graph = Array.from({ length: numCourses }, () => []);
        const inDegree = new Array(numCourses).fill(0);
        for (const [a, b] of prerequisites) {
          graph[b].push(a);
          inDegree[a]++;
        }

        const positions = {};
        const cols = Math.ceil(Math.sqrt(numCourses));
        for (let i = 0; i < numCourses; i++) {
          positions[i] = { x: 80 + (i % cols) * 120, y: 50 + Math.floor(i / cols) * 100 };
        }

        const makeEdges = () => prerequisites.map(([a, b]) => ({ from: String(b), to: String(a), state: "default" }));
        const makeNodes = (states) => {
          const nodes = {};
          for (let i = 0; i < numCourses; i++) {
            nodes[i] = { state: states[i] || "default", ...positions[i] };
          }
          return nodes;
        };

        const nodeStates = new Array(numCourses).fill("default");
        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Build graph",
          explanation: `Build adjacency list and compute in-degrees. In-degrees: [${inDegree.join(",")}].`,
          variables: { inDegree: `[${inDegree.join(",")}]` },
          dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: makeEdges() },
          delta: {}, isAnswer: false,
        });

        const queue = [];
        for (let i = 0; i < numCourses; i++) {
          if (inDegree[i] === 0) { queue.push(i); nodeStates[i] = "queued"; }
        }

        steps.push({
          stepId: 1, lineNumbers: [8, 9, 10],
          shortLabel: `Queue: [${queue.join(",")}]`,
          explanation: `Courses with in-degree 0: [${queue.join(",")}]. These have no prerequisites.`,
          variables: { queue: `[${queue.join(",")}]`, result: "[]" },
          dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: makeEdges(), bfsQueue: queue.map(String) },
          delta: {}, isAnswer: false,
        });

        const result = [];
        const deg = [...inDegree];
        let qi = 0;
        while (qi < queue.length) {
          const course = queue[qi++];
          result.push(course);
          nodeStates[course] = "visited";

          for (const next of graph[course]) {
            deg[next]--;
            if (deg[next] === 0) { queue.push(next); nodeStates[next] = "queued"; }
          }

          steps.push({
            stepId: steps.length, lineNumbers: [14, 15, 16, 17],
            shortLabel: `Dequeue ${course}, result=[${result.join(",")}]`,
            explanation: `Process course ${course}. Result so far: [${result.join(",")}].`,
            variables: { course, queue: `[${queue.slice(qi).join(",")}]`, result: `[${result.join(",")}]` },
            dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: makeEdges(), bfsQueue: queue.slice(qi).map(String) },
            delta: {}, isAnswer: result.length === numCourses,
          });
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "DFS Topological Sort",
      tier: "optimal",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      idea: `Use DFS with three states (unvisited, in-progress, completed). For each unvisited
        node, DFS into all its neighbors. If we hit an in-progress node, there's a cycle.
        When a node completes, prepend it to the result. The final list is a valid topological order.`,

      javaCode: `public int[] findOrder(int numCourses, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
    for (int[] pre : prerequisites) graph.get(pre[1]).add(pre[0]);

    int[] state = new int[numCourses]; // 0=unvisited, 1=in-progress, 2=done
    List<Integer> order = new ArrayList<>();

    for (int i = 0; i < numCourses; i++) {
        if (state[i] == 0 && !dfs(graph, i, state, order))
            return new int[]{};
    }

    Collections.reverse(order);
    int[] result = new int[numCourses];
    for (int i = 0; i < numCourses; i++) result[i] = order.get(i);
    return result;
}

private boolean dfs(List<List<Integer>> graph, int node, int[] state, List<Integer> order) {
    state[node] = 1;
    for (int next : graph.get(node)) {
        if (state[next] == 1) return false;
        if (state[next] == 0 && !dfs(graph, next, state, order))
            return false;
    }
    state[node] = 2;
    order.add(node);
    return true;
}`,

      cppCode: `vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    for (auto& pre : prerequisites) graph[pre[1]].push_back(pre[0]);

    vector<int> state(numCourses, 0);
    vector<int> order;

    function<bool(int)> dfs = [&](int node) -> bool {
        state[node] = 1;
        for (int next : graph[node]) {
            if (state[next] == 1) return false;
            if (state[next] == 0 && !dfs(next)) return false;
        }
        state[node] = 2;
        order.push_back(node);
        return true;
    };

    for (int i = 0; i < numCourses; i++) {
        if (state[i] == 0 && !dfs(i)) return {};
    }
    reverse(order.begin(), order.end());
    return order;
}`,

      pythonCode: `def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    graph = [[] for _ in range(numCourses)]
    for a, b in prerequisites:
        graph[b].append(a)

    state = [0] * numCourses  # 0=unvisited, 1=in-progress, 2=done
    order = []

    def dfs(node):
        state[node] = 1
        for nxt in graph[node]:
            if state[nxt] == 1:
                return False
            if state[nxt] == 0 and not dfs(nxt):
                return False
        state[node] = 2
        order.append(node)
        return True

    for i in range(numCourses):
        if state[i] == 0 and not dfs(i):
            return []

    return order[::-1]`,

      lineAnnotations: {
        2: "Build adjacency list from prerequisites",
        5: "Three states: 0=unvisited, 1=in-progress (on current path), 2=completed",
        6: "Result list — nodes added in post-order, reversed at the end",
        8: "Try DFS from each unvisited node",
        9: "If DFS returns false, a cycle was detected — no valid ordering",
        12: "Reverse post-order gives topological order",
        19: "Mark node as in-progress (currently being explored)",
        21: "If neighbor is in-progress, we found a cycle — return false",
        22: "If neighbor is unvisited, recurse into it",
        25: "Mark node as completed — all descendants processed",
        26: "Add to order in post-order (will be reversed)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "DAG with diamond dependency pattern",
          input: { numCourses: 4, prerequisites: [[1,0],[2,0],[3,1],[3,2]] },
          expectedOutput: "[0,1,2,3] or [0,2,1,3]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Build graph",
              explanation: "Build adjacency list: 0→[1,2], 1→[3], 2→[3]. This is a diamond-shaped DAG with course 0 at the top and course 3 at the bottom.",
              variables: { graph: "0→[1,2], 1→[3], 2→[3]", state: "[0,0,0,0]", order: "[]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 150, y: 50 },
                  1: { state: "default", x: 80, y: 150 },
                  2: { state: "default", x: 220, y: 150 },
                  3: { state: "default", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 19],
              shortLabel: "DFS(0): mark in-progress",
              explanation: "Start DFS from node 0. Mark it as in-progress (state=1). This means we're currently exploring paths from node 0.",
              variables: { node: 0, state: "[1,0,0,0]", order: "[]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "default", x: 80, y: 150 },
                  2: { state: "default", x: 220, y: 150 },
                  3: { state: "default", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["DFS(0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [20, 22, 19],
              shortLabel: "DFS(1): mark in-progress",
              explanation: "From node 0, visit neighbor 1. Mark node 1 as in-progress. Recurse deeper.",
              variables: { node: 1, state: "[1,1,0,0]", order: "[]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "active", x: 80, y: 150 },
                  2: { state: "default", x: 220, y: 150 },
                  3: { state: "default", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["DFS(0)", "DFS(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [20, 22, 19],
              shortLabel: "DFS(3): mark in-progress",
              explanation: "From node 1, visit neighbor 3. Mark node 3 as in-progress. Node 3 has no outgoing edges.",
              variables: { node: 3, state: "[1,1,0,1]", order: "[]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "active", x: 80, y: 150 },
                  2: { state: "default", x: 220, y: 150 },
                  3: { state: "active", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["DFS(0)", "DFS(1)", "DFS(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [25, 26],
              shortLabel: "DFS(3) done, order=[3]",
              explanation: "Node 3 has no neighbors to visit. Mark it as completed (state=2) and add to post-order list. order=[3].",
              variables: { node: 3, state: "[1,1,0,2]", order: "[3]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "active", x: 80, y: 150 },
                  2: { state: "default", x: 220, y: 150 },
                  3: { state: "visited", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["DFS(0)", "DFS(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [25, 26],
              shortLabel: "DFS(1) done, order=[3,1]",
              explanation: "Back to node 1 — all neighbors processed. Mark completed, add to order. order=[3,1].",
              variables: { node: 1, state: "[1,2,0,2]", order: "[3,1]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "visited", x: 80, y: 150 },
                  2: { state: "default", x: 220, y: 150 },
                  3: { state: "visited", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["DFS(0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [20, 22, 19],
              shortLabel: "DFS(2): mark in-progress",
              explanation: "Back at node 0, visit next neighbor: node 2. Mark as in-progress.",
              variables: { node: 2, state: "[1,2,1,2]", order: "[3,1]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "visited", x: 80, y: 150 },
                  2: { state: "active", x: 220, y: 150 },
                  3: { state: "visited", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["DFS(0)", "DFS(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [20, 21],
              shortLabel: "Node 3 already done, skip",
              explanation: "Node 2's neighbor is node 3, but node 3 is already completed (state=2). Skip it — no need to re-explore.",
              variables: { node: 2, next: 3, "state[3]": 2, order: "[3,1]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "visited", x: 80, y: 150 },
                  2: { state: "active", x: 220, y: 150 },
                  3: { state: "visited", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                ],
                dfsStack: ["DFS(0)", "DFS(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [25, 26],
              shortLabel: "DFS(2) done, order=[3,1,2]",
              explanation: "Node 2 completed. Add to order. order=[3,1,2].",
              variables: { node: 2, state: "[1,2,2,2]", order: "[3,1,2]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 150, y: 50 },
                  1: { state: "visited", x: 80, y: 150 },
                  2: { state: "visited", x: 220, y: 150 },
                  3: { state: "visited", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                ],
                dfsStack: ["DFS(0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [25, 26, 12],
              shortLabel: "DFS(0) done, reverse → [0,2,1,3]",
              explanation: "Node 0 completed. order=[3,1,2,0]. Reverse to get topological order: [0,2,1,3]. All courses can be completed!",
              variables: { state: "[2,2,2,2]", order: "[3,1,2,0]", result: "[0,2,1,3]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 150, y: 50 },
                  1: { state: "found", x: 80, y: 150 },
                  2: { state: "found", x: 220, y: 150 },
                  3: { state: "found", x: 150, y: 250 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
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
          label: "Cycle Detected",
          description: "Circular dependency makes ordering impossible",
          input: { numCourses: 3, prerequisites: [[0,1],[1,2],[2,0]] },
          expectedOutput: "[]",
          commonMistake: "Forgetting the in-progress state and only using visited/unvisited will not detect cycles. You need three states to distinguish back edges from cross edges.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Build graph",
              explanation: "Build adjacency list: 0→[], 1→[0], 2→[1] with the reverse edges for prerequisites. Actually: 1→0, 2→1, 0→2. This forms a cycle: 0→2→1→0.",
              variables: { graph: "0→[2], 1→[0], 2→[1]", state: "[0,0,0]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 80, y: 50 },
                  1: { state: "default", x: 220, y: 50 },
                  2: { state: "default", x: 150, y: 150 },
                },
                graphEdges: [
                  { from: "1", to: "0", state: "default" },
                  { from: "2", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 19],
              shortLabel: "DFS(0): in-progress",
              explanation: "Start DFS from node 0. Mark as in-progress (state=1).",
              variables: { node: 0, state: "[1,0,0]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 80, y: 50 },
                  1: { state: "default", x: 220, y: 50 },
                  2: { state: "default", x: 150, y: 150 },
                },
                graphEdges: [
                  { from: "1", to: "0", state: "default" },
                  { from: "2", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                ],
                dfsStack: ["DFS(0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [22, 19],
              shortLabel: "DFS(2): in-progress",
              explanation: "Node 0's neighbor is node 2. Mark node 2 as in-progress.",
              variables: { node: 2, state: "[1,0,1]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 80, y: 50 },
                  1: { state: "default", x: 220, y: 50 },
                  2: { state: "active", x: 150, y: 150 },
                },
                graphEdges: [
                  { from: "1", to: "0", state: "default" },
                  { from: "2", to: "1", state: "default" },
                  { from: "0", to: "2", state: "traversed" },
                ],
                dfsStack: ["DFS(0)", "DFS(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [22, 19],
              shortLabel: "DFS(1): in-progress",
              explanation: "Node 2's neighbor is node 1. Mark node 1 as in-progress.",
              variables: { node: 1, state: "[1,1,1]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 80, y: 50 },
                  1: { state: "active", x: 220, y: 50 },
                  2: { state: "active", x: 150, y: 150 },
                },
                graphEdges: [
                  { from: "1", to: "0", state: "default" },
                  { from: "2", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                ],
                dfsStack: ["DFS(0)", "DFS(2)", "DFS(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [20, 21],
              shortLabel: "CYCLE! Node 0 is in-progress",
              explanation: "Node 1's neighbor is node 0. But node 0 is in-progress (state=1) — it's on our current DFS path! This is a back edge, confirming a cycle: 0→2→1→0. Return empty array — impossible to complete all courses.",
              variables: { node: 1, next: 0, "state[0]": 1, result: "CYCLE DETECTED" },
              dataStructure: {
                graphNodes: {
                  0: { state: "eliminated", x: 80, y: 50 },
                  1: { state: "eliminated", x: 220, y: 50 },
                  2: { state: "eliminated", x: 150, y: 150 },
                },
                graphEdges: [
                  { from: "1", to: "0", state: "traversed" },
                  { from: "2", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                ],
                dfsStack: ["DFS(0)", "DFS(2)", "DFS(1)"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ numCourses, prerequisites }) {
        const steps = [];
        const graph = Array.from({ length: numCourses }, () => []);
        for (const [a, b] of prerequisites) graph[b].push(a);

        const positions = {};
        const cols = Math.ceil(Math.sqrt(numCourses));
        for (let i = 0; i < numCourses; i++) {
          positions[i] = { x: 80 + (i % cols) * 120, y: 50 + Math.floor(i / cols) * 100 };
        }

        const state = new Array(numCourses).fill(0);
        const order = [];
        const dfsStack = [];
        let hasCycle = false;

        const makeNodes = () => {
          const nodes = {};
          for (let i = 0; i < numCourses; i++) {
            let s = "default";
            if (state[i] === 1) s = "active";
            else if (state[i] === 2) s = "visited";
            nodes[i] = { state: s, ...positions[i] };
          }
          return nodes;
        };
        const makeEdges = () => prerequisites.map(([a, b]) => ({ from: String(b), to: String(a), state: "default" }));

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Build graph",
          explanation: `Build adjacency list from ${prerequisites.length} prerequisites.`,
          variables: { numCourses, edges: prerequisites.length },
          dataStructure: { graphNodes: makeNodes(), graphEdges: makeEdges(), dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        function dfs(node) {
          if (hasCycle) return;
          state[node] = 1;
          dfsStack.push(`DFS(${node})`);

          steps.push({
            stepId: steps.length, lineNumbers: [19],
            shortLabel: `DFS(${node}): in-progress`,
            explanation: `Mark node ${node} as in-progress. Exploring its neighbors.`,
            variables: { node, state: `[${state.join(",")}]` },
            dataStructure: { graphNodes: makeNodes(), graphEdges: makeEdges(), dfsStack: [...dfsStack] },
            delta: {}, isAnswer: false,
          });

          for (const next of graph[node]) {
            if (state[next] === 1) {
              hasCycle = true;
              steps.push({
                stepId: steps.length, lineNumbers: [21],
                shortLabel: `CYCLE at node ${next}`,
                explanation: `Node ${next} is in-progress — cycle detected! Return empty array.`,
                variables: { node, next, result: "[]" },
                dataStructure: { graphNodes: makeNodes(), graphEdges: makeEdges(), dfsStack: [...dfsStack] },
                delta: {}, isAnswer: true,
              });
              return;
            }
            if (state[next] === 0) dfs(next);
            if (hasCycle) return;
          }

          state[node] = 2;
          order.push(node);
          dfsStack.pop();

          steps.push({
            stepId: steps.length, lineNumbers: [25, 26],
            shortLabel: `DFS(${node}) done`,
            explanation: `Node ${node} completed. Post-order: [${order.join(",")}].`,
            variables: { node, order: `[${order.join(",")}]` },
            dataStructure: { graphNodes: makeNodes(), graphEdges: makeEdges(), dfsStack: [...dfsStack] },
            delta: {}, isAnswer: false,
          });
        }

        for (let i = 0; i < numCourses; i++) {
          if (state[i] === 0) dfs(i);
          if (hasCycle) break;
        }

        if (!hasCycle) {
          const result = [...order].reverse();
          const nodes = makeNodes();
          for (const k in nodes) nodes[k].state = "found";
          steps.push({
            stepId: steps.length, lineNumbers: [12],
            shortLabel: `Result: [${result.join(",")}]`,
            explanation: `Reverse post-order to get topological sort: [${result.join(",")}].`,
            variables: { result: `[${result.join(",")}]` },
            dataStructure: { graphNodes: nodes, graphEdges: makeEdges(), dfsStack: [] },
            delta: {}, isAnswer: true,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(V + E)", space: "O(V + E)", explanation: "BFS visits every node and edge once; adjacency list and queue use O(V + E) space" },
    optimal: { time: "O(V + E)", space: "O(V + E)", explanation: "DFS visits every node and edge once; recursion stack depth up to V", tradeoff: "Both BFS and DFS achieve the same complexity; DFS is more natural for topological sort while BFS (Kahn's) more naturally produces the ordering" },
  },

  interviewTips: [
    "Clarify: should you return ANY valid ordering, or a specific one?",
    "Mention both BFS (Kahn's) and DFS approaches — shows breadth of knowledge.",
    "Explain the three-state cycle detection: unvisited, in-progress, completed.",
    "Emphasize that the result is reversed post-order — not just any DFS order.",
    "Ask about disconnected components — your solution should handle them.",
    "If cycles exist, state clearly that no valid ordering is possible.",
  ],

  relatedProblems: ["course-schedule", "alien-dictionary"],
};
