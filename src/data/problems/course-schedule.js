export const courseSchedule = {
  id: 87,
  slug: "course-schedule",
  title: "Course Schedule",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 87,
  artifactType: "GraphDFS",
  companies: ["Amazon", "Meta", "Microsoft", "Google", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/course-schedule/",

  pattern: "Cycle Detection via DFS in Directed Graph",
  patternExplanation: `To determine if all courses can be completed, model prerequisites as a
    directed graph and check for cycles. A cycle means circular dependencies — impossible to
    complete all courses. DFS with three states (unvisited, visiting, visited) detects cycles.`,

  intuition: {
    coreInsight: `This is a cycle detection problem on a directed graph. Each course is a node,
      each prerequisite is a directed edge. If the graph has a cycle, some courses depend on
      each other circularly — you can never start any of them. We use DFS with three states:
      WHITE (unvisited), GRAY (currently in the recursion stack), BLACK (fully processed). If we
      ever visit a GRAY node, we've found a back edge — a cycle.`,

    mentalModel: `Imagine course enrollment. CS201 requires CS101, CS301 requires CS201. That's
      fine — take CS101 first, then CS201, then CS301. But if CS101 also requires CS301, you
      have a deadlock: each course waits for another in a circle. DFS explores the dependency
      chain. If you ever loop back to a course you're currently exploring (a GRAY node in your
      current path), you've hit a deadlock.`,

    whyNaiveFails: `A naive approach might try to simulate enrollment: repeatedly find courses
      with no unmet prerequisites. This works (it's Kahn's algorithm / BFS topological sort) but
      is harder to implement correctly. DFS cycle detection is more intuitive: just follow the
      dependency chain and see if you ever circle back.`,

    keyObservation: `The three-state coloring is crucial. Two states (visited/unvisited) can't
      distinguish between "I'm currently exploring this node's subtree" (GRAY) and "I finished
      this node completely" (BLACK). Without this distinction, visiting an already-processed
      node from a different path would falsely report a cycle. GRAY means "in my current path"
      — only GRAY→GRAY is a cycle.`,
  },

  problem: `There are a total of numCourses courses you have to take, labeled from 0 to
    numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi]
    indicates that you must take course bi before course ai. Return true if you can finish
    all courses. Otherwise, return false.`,

  examples: [
    {
      input: "numCourses = 2, prerequisites = [[1,0]]",
      output: "true",
      explanation: "Take course 0, then course 1. No cycle.",
    },
    {
      input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
      output: "false",
      explanation: "Course 1 requires 0 and course 0 requires 1. Circular dependency.",
    },
  ],

  constraints: [
    "1 <= numCourses <= 2000",
    "0 <= prerequisites.length <= 5000",
    "prerequisites[i].length == 2",
    "0 <= ai, bi < numCourses",
    "All prerequisite pairs are unique",
  ],

  approaches: {
    brute: {
      label: "BFS Topological Sort (Kahn's)",
      tier: "brute",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      idea: `Build in-degree array and adjacency list. Start BFS from nodes with in-degree 0.
        Process each node by reducing neighbors' in-degrees. If all nodes are processed, no cycle exists.`,

      javaCode: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    int[] inDegree = new int[numCourses];
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());

    for (int[] pre : prerequisites) {
        adj.get(pre[1]).add(pre[0]);
        inDegree[pre[0]]++;
    }

    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) queue.offer(i);
    }

    int count = 0;
    while (!queue.isEmpty()) {
        int course = queue.poll();
        count++;
        for (int next : adj.get(course)) {
            if (--inDegree[next] == 0) queue.offer(next);
        }
    }

    return count == numCourses;
}`,

      cppCode: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> inDegree(numCourses, 0);

    for (auto& pre : prerequisites) {
        adj[pre[1]].push_back(pre[0]);
        inDegree[pre[0]]++;
    }

    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) q.push(i);
    }

    int count = 0;
    while (!q.empty()) {
        int course = q.front(); q.pop();
        count++;
        for (int next : adj[course]) {
            if (--inDegree[next] == 0) q.push(next);
        }
    }

    return count == numCourses;
}`,

      pythonCode: `def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:
    adj = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses

    for a, b in prerequisites:
        adj[b].append(a)
        in_degree[a] += 1

    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    count = 0

    while queue:
        course = queue.popleft()
        count += 1
        for nxt in adj[course]:
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0:
                queue.append(nxt)

    return count == numCourses`,

      lineAnnotations: {
        2: "Build adjacency list for the directed graph",
        3: "Track in-degree (number of prerequisites) for each course",
        6: "Edge from prerequisite to dependent course",
        7: "Increment in-degree for the dependent course",
        10: "Seed BFS queue with courses that have no prerequisites",
        16: "Process courses in topological order",
        17: "Increment count of processable courses",
        19: "If neighbor's in-degree drops to 0, it's ready",
        22: "If we processed all courses, no cycle exists",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { numCourses: 4, prerequisites: [[1,0],[2,0],[3,1],[3,2]] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Build graph",
              explanation: "Build adjacency list: 0→[1,2], 1→[3], 2→[3]. In-degrees: [0,1,1,2]. Course 0 has no prerequisites.",
              variables: { numCourses: 4, inDegree: "[0,1,1,2]", count: 0 },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 175, y: 50 },
                  1: { state: "default", x: 100, y: 175 },
                  2: { state: "default", x: 250, y: 175 },
                  3: { state: "default", x: 175, y: 300 },
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
              lineNumbers: [10, 11, 12],
              shortLabel: "Seed queue with course 0",
              explanation: "Only course 0 has in-degree 0 (no prerequisites). Add it to the BFS queue.",
              variables: { queue: "[0]", inDegree: "[0,1,1,2]", count: 0 },
              dataStructure: {
                graphNodes: {
                  0: { state: "queued", x: 175, y: 50 },
                  1: { state: "default", x: 100, y: 175 },
                  2: { state: "default", x: 250, y: 175 },
                  3: { state: "default", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: [],
                bfsQueue: ["0"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16, 17, 18, 19],
              shortLabel: "Process course 0 → courses 1,2 ready",
              explanation: "Dequeue course 0, count=1. Reduce in-degree of neighbors 1 and 2. Both drop to 0 — add both to queue.",
              variables: { queue: "[1, 2]", inDegree: "[0,0,0,2]", count: 1, processing: 0 },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 175, y: 50 },
                  1: { state: "queued", x: 100, y: 175 },
                  2: { state: "queued", x: 250, y: 175 },
                  3: { state: "default", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: [],
                bfsQueue: ["1", "2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [16, 17, 18, 19],
              shortLabel: "Process course 1 → course 3 in-degree drops to 1",
              explanation: "Dequeue course 1, count=2. Reduce in-degree of neighbor 3 from 2 to 1. Not 0 yet — course 3 still has another prerequisite.",
              variables: { queue: "[2]", inDegree: "[0,0,0,1]", count: 2, processing: 1 },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 175, y: 50 },
                  1: { state: "visited", x: 100, y: 175 },
                  2: { state: "queued", x: 250, y: 175 },
                  3: { state: "default", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: [],
                bfsQueue: ["2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16, 17, 18, 19],
              shortLabel: "Process course 2 → course 3 now ready",
              explanation: "Dequeue course 2, count=3. Reduce in-degree of neighbor 3 from 1 to 0. Course 3 is now ready — add to queue.",
              variables: { queue: "[3]", inDegree: "[0,0,0,0]", count: 3, processing: 2 },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 175, y: 50 },
                  1: { state: "visited", x: 100, y: 175 },
                  2: { state: "visited", x: 250, y: 175 },
                  3: { state: "queued", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                ],
                dfsStack: [],
                bfsQueue: ["3"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [16, 17, 22],
              shortLabel: "Process course 3 → count=4 = numCourses ✓",
              explanation: "Dequeue course 3, count=4. Queue empty. count (4) equals numCourses (4) — all courses can be completed. Return true.",
              variables: { queue: "[]", count: 4, numCourses: 4, result: "true" },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 175, y: 50 },
                  1: { state: "found", x: 100, y: 175 },
                  2: { state: "found", x: 250, y: 175 },
                  3: { state: "found", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                ],
                dfsStack: [],
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
        const adj = Array.from({ length: numCourses }, () => []);
        const inDegree = new Array(numCourses).fill(0);

        for (const [a, b] of prerequisites) {
          adj[b].push(a);
          inDegree[a]++;
        }

        const edges = prerequisites.map(([a, b]) => ({ from: String(b), to: String(a), state: "default" }));
        const positions = {};
        const cols = Math.ceil(Math.sqrt(numCourses));
        for (let i = 0; i < numCourses; i++) {
          positions[i] = { x: 80 + (i % cols) * 120, y: 60 + Math.floor(i / cols) * 120 };
        }

        const makeNodes = (states) => {
          const nodes = {};
          for (let i = 0; i < numCourses; i++) {
            nodes[i] = { state: states[i] || "default", ...positions[i] };
          }
          return nodes;
        };

        const nodeStates = new Array(numCourses).fill("default");
        const edgeStates = edges.map(() => "default");

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Build graph",
          explanation: `Build adjacency list and in-degree array. In-degrees: [${inDegree}].`,
          variables: { numCourses, inDegree: `[${inDegree}]`, count: 0 },
          dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: edges.map((e, i) => ({ ...e, state: edgeStates[i] })), dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        const queue = [];
        for (let i = 0; i < numCourses; i++) {
          if (inDegree[i] === 0) { queue.push(i); nodeStates[i] = "queued"; }
        }

        steps.push({
          stepId: 1, lineNumbers: [10, 11, 12],
          shortLabel: `Seed queue: [${queue}]`,
          explanation: `Courses with in-degree 0: [${queue}]. These have no prerequisites.`,
          variables: { queue: `[${queue}]`, inDegree: `[${inDegree}]`, count: 0 },
          dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: edges.map((e, i) => ({ ...e, state: edgeStates[i] })), dfsStack: [], bfsQueue: queue.map(String) },
          delta: {}, isAnswer: false,
        });

        let count = 0;
        const inDeg = [...inDegree];
        while (queue.length > 0) {
          const course = queue.shift();
          count++;
          nodeStates[course] = "visited";
          for (const next of adj[course]) {
            const eIdx = edges.findIndex(e => e.from === String(course) && e.to === String(next));
            if (eIdx !== -1) edgeStates[eIdx] = "traversed";
            inDeg[next]--;
            if (inDeg[next] === 0) { queue.push(next); nodeStates[next] = "queued"; }
          }

          const isLast = queue.length === 0;
          const done = count === numCourses;
          if (done) for (let i = 0; i < numCourses; i++) nodeStates[i] = "found";

          steps.push({
            stepId: steps.length, lineNumbers: done ? [16, 17, 22] : [16, 17, 18, 19],
            shortLabel: `Process course ${course} → count=${count}`,
            explanation: `Dequeue course ${course}, count=${count}.${done ? ` count equals numCourses — return true.` : ``}`,
            variables: { queue: `[${queue}]`, count, processing: course },
            dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: edges.map((e, i) => ({ ...e, state: edgeStates[i] })), dfsStack: [], bfsQueue: queue.map(String) },
            delta: {}, isAnswer: done,
          });
        }

        if (count < numCourses) {
          steps.push({
            stepId: steps.length, lineNumbers: [22],
            shortLabel: `count=${count} < ${numCourses} → false`,
            explanation: `Only processed ${count} out of ${numCourses} courses. A cycle exists — return false.`,
            variables: { count, numCourses, result: "false" },
            dataStructure: { graphNodes: makeNodes(nodeStates), graphEdges: edges.map((e, i) => ({ ...e, state: edgeStates[i] })), dfsStack: [] },
            delta: {}, isAnswer: true,
          });
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "DFS Cycle Detection (3-Color)",
      tier: "optimal",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      idea: `Build adjacency list. DFS from each unvisited node using 3 colors: WHITE (unvisited),
        GRAY (in current path), BLACK (fully processed). If DFS reaches a GRAY node, a cycle exists.`,

      javaCode: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] pre : prerequisites) adj.get(pre[1]).add(pre[0]);

    int[] color = new int[numCourses]; // 0=WHITE, 1=GRAY, 2=BLACK

    for (int i = 0; i < numCourses; i++) {
        if (color[i] == 0 && hasCycle(adj, color, i)) {
            return false;
        }
    }
    return true;
}

private boolean hasCycle(List<List<Integer>> adj, int[] color, int node) {
    color[node] = 1; // GRAY — entering

    for (int neighbor : adj.get(node)) {
        if (color[neighbor] == 1) return true;  // back edge → cycle
        if (color[neighbor] == 0 && hasCycle(adj, color, neighbor)) {
            return true;
        }
    }

    color[node] = 2; // BLACK — done
    return false;
}`,

      cppCode: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    for (auto& pre : prerequisites) adj[pre[1]].push_back(pre[0]);

    vector<int> color(numCourses, 0); // 0=WHITE, 1=GRAY, 2=BLACK

    for (int i = 0; i < numCourses; i++) {
        if (color[i] == 0 && hasCycle(adj, color, i)) {
            return false;
        }
    }
    return true;
}

bool hasCycle(vector<vector<int>>& adj, vector<int>& color, int node) {
    color[node] = 1;

    for (int neighbor : adj[node]) {
        if (color[neighbor] == 1) return true;
        if (color[neighbor] == 0 && hasCycle(adj, color, neighbor)) {
            return true;
        }
    }

    color[node] = 2;
    return false;
}`,

      pythonCode: `def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:
    adj = [[] for _ in range(numCourses)]
    for a, b in prerequisites:
        adj[b].append(a)

    color = [0] * numCourses  # 0=WHITE, 1=GRAY, 2=BLACK

    def has_cycle(node):
        color[node] = 1  # GRAY

        for neighbor in adj[node]:
            if color[neighbor] == 1:
                return True
            if color[neighbor] == 0 and has_cycle(neighbor):
                return True

        color[node] = 2  # BLACK
        return False

    for i in range(numCourses):
        if color[i] == 0 and has_cycle(i):
            return False
    return True`,

      lineAnnotations: {
        2: "Build adjacency list from prerequisites",
        4: "Edge: prerequisite → dependent course",
        6: "3-color array: 0=WHITE, 1=GRAY, 2=BLACK",
        8: "Try DFS from each unvisited (WHITE) node",
        9: "If cycle found, courses can't all be completed",
        12: "No cycle found — all courses completable",
        15: "DFS helper — returns true if cycle detected",
        16: "Mark GRAY — node is in current recursion path",
        18: "Visit each neighbor",
        19: "GRAY neighbor = back edge = CYCLE",
        20: "WHITE neighbor — recurse deeper",
        25: "Mark BLACK — fully processed, no cycle from here",
        26: "No cycle found from this node",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "No Cycle (DAG)",
          description: "4 courses with valid ordering: 0→1→3, 0→2→3",
          input: { numCourses: 4, prerequisites: [[1,0],[2,0],[3,1],[3,2]] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 4, 6],
              shortLabel: "Build graph, init colors",
              explanation: "Build adjacency list: 0→[1,2], 1→[3], 2→[3]. All nodes start WHITE (unvisited). This is a DAG — no cycles.",
              variables: { numCourses: 4, colors: "[W,W,W,W]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 175, y: 50 },
                  1: { state: "default", x: 100, y: 175 },
                  2: { state: "default", x: 250, y: 175 },
                  3: { state: "default", x: 175, y: 300 },
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
              lineNumbers: [8, 15, 16],
              shortLabel: "DFS(0): mark GRAY",
              explanation: "Start DFS from course 0 (WHITE). Mark it GRAY — it's now in our current exploration path. Explore neighbors [1, 2].",
              variables: { node: 0, colors: "[G,W,W,W]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "default", x: 100, y: 175 },
                  2: { state: "default", x: 250, y: 175 },
                  3: { state: "default", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["dfs(0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [18, 20, 16],
              shortLabel: "DFS(1): mark GRAY",
              explanation: "Recurse into neighbor 1 (WHITE). Mark it GRAY. Explore neighbor [3].",
              variables: { node: 1, colors: "[G,G,W,W]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "active", x: 100, y: 175 },
                  2: { state: "default", x: 250, y: 175 },
                  3: { state: "default", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "default" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["dfs(0)", "dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [18, 20, 16],
              shortLabel: "DFS(3): mark GRAY",
              explanation: "Recurse into neighbor 3 (WHITE). Mark it GRAY. Course 3 has no outgoing edges — no neighbors to explore.",
              variables: { node: 3, colors: "[G,G,W,G]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "active", x: 100, y: 175 },
                  2: { state: "default", x: 250, y: 175 },
                  3: { state: "active", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["dfs(0)", "dfs(1)", "dfs(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [25, 26],
              shortLabel: "DFS(3): mark BLACK ✓",
              explanation: "Course 3 has no neighbors. No cycle from here. Mark it BLACK (fully processed). Backtrack to DFS(1).",
              variables: { node: 3, colors: "[G,G,W,B]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "active", x: 100, y: 175 },
                  2: { state: "default", x: 250, y: 175 },
                  3: { state: "visited", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["dfs(0)", "dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [25, 26],
              shortLabel: "DFS(1): mark BLACK ✓",
              explanation: "All neighbors of course 1 explored. No cycle. Mark BLACK. Backtrack to DFS(0). Now explore next neighbor: course 2.",
              variables: { node: 1, colors: "[G,B,W,B]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "visited", x: 100, y: 175 },
                  2: { state: "default", x: 250, y: 175 },
                  3: { state: "visited", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "default" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["dfs(0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [18, 20, 16],
              shortLabel: "DFS(2): mark GRAY",
              explanation: "Recurse into neighbor 2 (WHITE). Mark it GRAY. Explore neighbor [3].",
              variables: { node: 2, colors: "[G,B,G,B]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "visited", x: 100, y: 175 },
                  2: { state: "active", x: 250, y: 175 },
                  3: { state: "visited", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "default" },
                ],
                dfsStack: ["dfs(0)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [18, 19],
              shortLabel: "Neighbor 3 is BLACK — skip",
              explanation: "Course 2's neighbor is course 3 — already BLACK (fully processed). No need to recurse. If it were GRAY, that would be a cycle — but it's BLACK, so it's safe.",
              variables: { node: 2, neighbor: 3, neighborColor: "BLACK" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "visited", x: 100, y: 175 },
                  2: { state: "active", x: 250, y: 175 },
                  3: { state: "found", x: 175, y: 300 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "0", to: "2", state: "traversed" },
                  { from: "1", to: "3", state: "traversed" },
                  { from: "2", to: "3", state: "traversed" },
                ],
                dfsStack: ["dfs(0)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [25, 26],
              shortLabel: "DFS(2): mark BLACK. DFS(0): mark BLACK",
              explanation: "Course 2 done — mark BLACK. Backtrack to course 0, mark BLACK. All courses explored with no cycle found.",
              variables: { colors: "[B,B,B,B]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "visited", x: 175, y: 50 },
                  1: { state: "visited", x: 100, y: 175 },
                  2: { state: "visited", x: 250, y: 175 },
                  3: { state: "visited", x: 175, y: 300 },
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
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [12],
              shortLabel: "No cycle → return true",
              explanation: "All 4 courses DFS-explored with no GRAY→GRAY back edge found. No circular dependencies. Return true — all courses can be finished.",
              variables: { result: "true" },
              dataStructure: {
                graphNodes: {
                  0: { state: "found", x: 175, y: 50 },
                  1: { state: "found", x: 100, y: 175 },
                  2: { state: "found", x: 250, y: 175 },
                  3: { state: "found", x: 175, y: 300 },
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
          description: "3 courses with a cycle: 0→1→2→0",
          input: { numCourses: 3, prerequisites: [[1,0],[2,1],[0,2]] },
          expectedOutput: "false",
          commonMistake: "Using only 2 states (visited/unvisited) can't distinguish between a node in the current path vs a node already fully processed from a different branch.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 4, 6],
              shortLabel: "Build graph, init colors",
              explanation: "Build adjacency list: 0→[1], 1→[2], 2→[0]. All nodes start WHITE. This graph has a cycle: 0→1→2→0.",
              variables: { numCourses: 3, colors: "[W,W,W]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "default", x: 175, y: 50 },
                  1: { state: "default", x: 300, y: 225 },
                  2: { state: "default", x: 50, y: 225 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "1", to: "2", state: "default" },
                  { from: "2", to: "0", state: "default" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 15, 16],
              shortLabel: "DFS(0): mark GRAY",
              explanation: "Start DFS from course 0. Mark GRAY — it's in our current exploration path.",
              variables: { node: 0, colors: "[G,W,W]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "default", x: 300, y: 225 },
                  2: { state: "default", x: 50, y: 225 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "default" },
                  { from: "1", to: "2", state: "default" },
                  { from: "2", to: "0", state: "default" },
                ],
                dfsStack: ["dfs(0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [18, 20, 16],
              shortLabel: "DFS(1): mark GRAY",
              explanation: "Recurse into neighbor 1 (WHITE). Mark GRAY. Continue down the path.",
              variables: { node: 1, colors: "[G,G,W]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "active", x: 300, y: 225 },
                  2: { state: "default", x: 50, y: 225 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "1", to: "2", state: "default" },
                  { from: "2", to: "0", state: "default" },
                ],
                dfsStack: ["dfs(0)", "dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [18, 20, 16],
              shortLabel: "DFS(2): mark GRAY",
              explanation: "Recurse into neighbor 2 (WHITE). Mark GRAY. Now explore neighbor [0].",
              variables: { node: 2, colors: "[G,G,G]" },
              dataStructure: {
                graphNodes: {
                  0: { state: "active", x: 175, y: 50 },
                  1: { state: "active", x: 300, y: 225 },
                  2: { state: "active", x: 50, y: 225 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "1", to: "2", state: "traversed" },
                  { from: "2", to: "0", state: "default" },
                ],
                dfsStack: ["dfs(0)", "dfs(1)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [18, 19],
              shortLabel: "Neighbor 0 is GRAY → CYCLE!",
              explanation: "Course 2's neighbor is course 0 — and it's GRAY! That means 0 is in our current DFS path. We've found a back edge: 0→1→2→0. This is a cycle — return true (hasCycle).",
              variables: { node: 2, neighbor: 0, neighborColor: "GRAY", cycle: "0→1→2→0" },
              dataStructure: {
                graphNodes: {
                  0: { state: "eliminated", x: 175, y: 50 },
                  1: { state: "eliminated", x: 300, y: 225 },
                  2: { state: "eliminated", x: 50, y: 225 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "1", to: "2", state: "traversed" },
                  { from: "2", to: "0", state: "traversed" },
                ],
                dfsStack: ["dfs(0)", "dfs(1)", "dfs(2)", "→ 0 GRAY!"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [9],
              shortLabel: "Return false — can't finish",
              explanation: "Cycle detected. Courses 0, 1, 2 form a circular dependency — none of them can be started. Return false.",
              variables: { result: "false", cycle: "0→1→2→0" },
              dataStructure: {
                graphNodes: {
                  0: { state: "eliminated", x: 175, y: 50 },
                  1: { state: "eliminated", x: 300, y: 225 },
                  2: { state: "eliminated", x: 50, y: 225 },
                },
                graphEdges: [
                  { from: "0", to: "1", state: "traversed" },
                  { from: "1", to: "2", state: "traversed" },
                  { from: "2", to: "0", state: "traversed" },
                ],
                dfsStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ numCourses, prerequisites }) {
        const steps = [];
        const adj = Array.from({ length: numCourses }, () => []);
        for (const [a, b] of prerequisites) adj[b].push(a);

        const edges = prerequisites.map(([a, b]) => ({ from: String(b), to: String(a), state: "default" }));
        const cols = Math.ceil(Math.sqrt(numCourses));
        const positions = {};
        for (let i = 0; i < numCourses; i++) {
          positions[i] = { x: 80 + (i % cols) * 150, y: 60 + Math.floor(i / cols) * 150 };
        }

        const color = new Array(numCourses).fill(0);
        const edgeStates = edges.map(() => "default");

        const makeNodes = () => {
          const nodes = {};
          for (let i = 0; i < numCourses; i++) {
            const c = color[i];
            nodes[i] = { state: c === 0 ? "default" : c === 1 ? "active" : "visited", ...positions[i] };
          }
          return nodes;
        };

        const dfsStackArr = [];

        steps.push({
          stepId: 0, lineNumbers: [2, 4, 6],
          shortLabel: "Build graph, init colors",
          explanation: `Adjacency list built. All ${numCourses} nodes start WHITE.`,
          variables: { numCourses, colors: `[${color.map(c => ["W","G","B"][c])}]` },
          dataStructure: { graphNodes: makeNodes(), graphEdges: edges.map((e, i) => ({ ...e, state: edgeStates[i] })), dfsStack: [] },
          delta: {}, isAnswer: false,
        });

        let cycleFound = false;

        function dfs(node) {
          if (cycleFound) return true;
          color[node] = 1;
          dfsStackArr.push(`dfs(${node})`);

          steps.push({
            stepId: steps.length, lineNumbers: [15, 16],
            shortLabel: `DFS(${node}): mark GRAY`,
            explanation: `Enter DFS for course ${node}. Mark GRAY.`,
            variables: { node, colors: `[${color.map(c => ["W","G","B"][c])}]` },
            dataStructure: { graphNodes: makeNodes(), graphEdges: edges.map((e, i) => ({ ...e, state: edgeStates[i] })), dfsStack: [...dfsStackArr] },
            delta: {}, isAnswer: false,
          });

          for (const neighbor of adj[node]) {
            const eIdx = edges.findIndex(e => e.from === String(node) && e.to === String(neighbor));
            if (eIdx !== -1) edgeStates[eIdx] = "traversed";

            if (color[neighbor] === 1) {
              cycleFound = true;
              for (let i = 0; i < numCourses; i++) {
                if (color[i] === 1) {
                  const n = makeNodes();
                  n[i] = { ...n[i], state: "eliminated" };
                }
              }
              steps.push({
                stepId: steps.length, lineNumbers: [18, 19],
                shortLabel: `Neighbor ${neighbor} is GRAY → CYCLE!`,
                explanation: `Course ${node}'s neighbor ${neighbor} is GRAY — in the current path. Cycle detected!`,
                variables: { node, neighbor, neighborColor: "GRAY" },
                dataStructure: {
                  graphNodes: (() => { const n = makeNodes(); for (let i = 0; i < numCourses; i++) if (color[i] === 1) n[i] = { ...n[i], state: "eliminated" }; return n; })(),
                  graphEdges: edges.map((e, i) => ({ ...e, state: edgeStates[i] })),
                  dfsStack: [...dfsStackArr, `→ ${neighbor} GRAY!`],
                },
                delta: {}, isAnswer: false,
              });
              return true;
            }
            if (color[neighbor] === 0) {
              if (dfs(neighbor)) return true;
            }
          }

          color[node] = 2;
          dfsStackArr.pop();

          steps.push({
            stepId: steps.length, lineNumbers: [25, 26],
            shortLabel: `DFS(${node}): mark BLACK`,
            explanation: `All neighbors of course ${node} explored. No cycle from here. Mark BLACK.`,
            variables: { node, colors: `[${color.map(c => ["W","G","B"][c])}]` },
            dataStructure: { graphNodes: makeNodes(), graphEdges: edges.map((e, i) => ({ ...e, state: edgeStates[i] })), dfsStack: [...dfsStackArr] },
            delta: {}, isAnswer: false,
          });

          return false;
        }

        for (let i = 0; i < numCourses; i++) {
          if (color[i] === 0) {
            if (dfs(i)) {
              steps.push({
                stepId: steps.length, lineNumbers: [9],
                shortLabel: "Return false",
                explanation: `Cycle detected — return false. Not all courses can be finished.`,
                variables: { result: "false" },
                dataStructure: {
                  graphNodes: (() => { const n = makeNodes(); for (let i2 = 0; i2 < numCourses; i2++) if (color[i2] === 1) n[i2] = { ...n[i2], state: "eliminated" }; return n; })(),
                  graphEdges: edges.map((e, i2) => ({ ...e, state: edgeStates[i2] })),
                  dfsStack: [],
                },
                delta: {}, isAnswer: true,
              });
              return steps;
            }
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [12],
          shortLabel: "No cycle → return true",
          explanation: `All courses explored. No cycle found. Return true.`,
          variables: { result: "true" },
          dataStructure: {
            graphNodes: (() => { const n = {}; for (let i = 0; i < numCourses; i++) n[i] = { state: "found", ...positions[i] }; return n; })(),
            graphEdges: edges.map((e, i) => ({ ...e, state: edgeStates[i] })),
            dfsStack: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(V + E)", space: "O(V + E)", explanation: "BFS topological sort processes each node and edge once" },
    optimal: { time: "O(V + E)", space: "O(V + E)", explanation: "DFS visits each node once; adjacency list stores all edges", tradeoff: "Both approaches are O(V+E). DFS is more natural for cycle detection; BFS (Kahn's) naturally produces topological order." },
  },

  interviewTips: [
    "Immediately recognize this as a cycle detection problem in a directed graph.",
    "Mention both approaches: DFS 3-color and BFS Kahn's algorithm.",
    "Explain the 3-color system: WHITE/GRAY/BLACK and what each means.",
    "Clarify: a back edge (GRAY→GRAY) means cycle; a cross edge (to BLACK) does not.",
    "If asked for the actual course order, pivot to Course Schedule II (topological sort).",
    "Ask: 'Can a course be a prerequisite for itself?' (self-loop = trivial cycle).",
  ],

  relatedProblems: ["course-schedule-ii", "graph-valid-tree", "redundant-connection"],
};
