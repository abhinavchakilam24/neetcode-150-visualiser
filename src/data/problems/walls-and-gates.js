export const wallsAndGates = {
  id: 83,
  slug: "walls-and-gates",
  title: "Walls and Gates",
  difficulty: "Medium",
  topic: "graphs",
  topicLabel: "Graphs",
  neetcodeNumber: 83,
  artifactType: "GraphBFS",
  companies: ["Meta", "Google", "Amazon", "DoorDash", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/walls-and-gates/",

  pattern: "Multi-Source BFS",
  patternExplanation: `Instead of BFS from each empty room to find the nearest gate (which would be
    O(m*n) per room), start BFS from ALL gates simultaneously. This "reverse BFS" naturally
    computes shortest distances from every room to its nearest gate in a single O(m*n) pass.`,

  intuition: {
    coreInsight: `The key insight is to reverse the direction of search. Instead of asking "how
      far is each room from a gate?", ask "how far does each gate's influence spread?" By
      starting BFS from ALL gates at once (multi-source BFS), the wavefront expands outward
      layer by layer. The first time a room is reached, that's its shortest distance to any
      gate — guaranteed, because BFS explores in order of distance.`,

    mentalModel: `Imagine dropping a pebble into water at every gate simultaneously. Ripples
      spread outward from each gate. When ripples reach an empty room, the distance the ripple
      traveled IS the shortest distance to the nearest gate. Rooms closer to gates get reached
      by earlier ripples. Walls block the ripples. This simultaneous expansion is exactly
      multi-source BFS.`,

    whyNaiveFails: `The naive approach runs BFS from each empty room to find the nearest gate.
      With R empty rooms in an m*n grid, that's O(R * m * n) — potentially O((m*n)^2) if most
      cells are empty rooms. Multi-source BFS from all gates does it in a single O(m*n) pass.`,

    keyObservation: `All gates start in the queue at distance 0. BFS naturally processes cells
      in order of increasing distance. The first time a room is reached, it's via the shortest
      path — so we never need to revisit or update a room's distance. This is why BFS gives
      correct shortest paths in unweighted graphs.`,
  },

  problem: `You are given an m x n grid rooms initialized with these three possible values:
    -1 — A wall or an obstacle. 0 — A gate. INF (2147483647) — An empty room. Fill each
    empty room with the distance to its nearest gate. If it is impossible to reach a gate,
    leave it as INF.`,

  examples: [
    {
      input: `rooms = [
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647]
]`,
      output: `[
  [3, -1, 0, 1],
  [2, 2, 1, -1],
  [1, -1, 2, -1],
  [0, -1, 3, 4]
]`,
      explanation: "Each empty room is filled with the distance to its nearest gate.",
    },
    {
      input: "rooms = [[-1]]",
      output: "[[-1]]",
      explanation: "Single wall — nothing to fill.",
    },
  ],

  constraints: [
    "m == rooms.length",
    "n == rooms[i].length",
    "1 <= m, n <= 250",
    "rooms[i][j] is -1, 0, or 2147483647",
  ],

  approaches: {
    brute: {
      label: "BFS from Each Room",
      tier: "brute",
      timeComplexity: "O((m×n)²)",
      spaceComplexity: "O(m × n)",
      idea: `For each empty room, run BFS to find the nearest gate. This works but is extremely
        slow because we repeat BFS for every single room.`,

      javaCode: `public void wallsAndGates(int[][] rooms) {
    int rows = rooms.length, cols = rooms[0].length;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (rooms[r][c] == Integer.MAX_VALUE) {
                rooms[r][c] = bfsToGate(rooms, r, c);
            }
        }
    }
}

private int bfsToGate(int[][] rooms, int r, int c) {
    int rows = rooms.length, cols = rooms[0].length;
    Queue<int[]> q = new LinkedList<>();
    boolean[][] visited = new boolean[rows][cols];
    q.offer(new int[]{r, c, 0});
    visited[r][c] = true;
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!q.isEmpty()) {
        int[] cell = q.poll();
        if (rooms[cell[0]][cell[1]] == 0) return cell[2];
        for (int[] d : dirs) {
            int nr = cell[0]+d[0], nc = cell[1]+d[1];
            if (nr>=0 && nr<rows && nc>=0 && nc<cols
                && !visited[nr][nc] && rooms[nr][nc] != -1) {
                visited[nr][nc] = true;
                q.offer(new int[]{nr, nc, cell[2]+1});
            }
        }
    }
    return Integer.MAX_VALUE;
}`,

      cppCode: `void wallsAndGates(vector<vector<int>>& rooms) {
    int rows = rooms.size(), cols = rooms[0].size();
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (rooms[r][c] == INT_MAX) {
                rooms[r][c] = bfsToGate(rooms, r, c);
            }
        }
    }
}

int bfsToGate(vector<vector<int>>& rooms, int r, int c) {
    int rows = rooms.size(), cols = rooms[0].size();
    queue<tuple<int,int,int>> q;
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    q.push({r, c, 0});
    visited[r][c] = true;
    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!q.empty()) {
        auto [cr, cc, dist] = q.front(); q.pop();
        if (rooms[cr][cc] == 0) return dist;
        for (auto& d : dirs) {
            int nr = cr+d[0], nc = cc+d[1];
            if (nr>=0 && nr<rows && nc>=0 && nc<cols
                && !visited[nr][nc] && rooms[nr][nc] != -1) {
                visited[nr][nc] = true;
                q.push({nr, nc, dist+1});
            }
        }
    }
    return INT_MAX;
}`,

      pythonCode: `def wallsAndGates(rooms: List[List[int]]) -> None:
    rows, cols = len(rooms), len(rooms[0])

    def bfs_to_gate(r, c):
        queue = deque([(r, c, 0)])
        visited = set()
        visited.add((r, c))
        for cr, cc, dist in queue:
            if rooms[cr][cc] == 0:
                return dist
            for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                nr, nc = cr + dr, cc + dc
                if 0 <= nr < rows and 0 <= nc < cols \\
                    and (nr,nc) not in visited and rooms[nr][nc] != -1:
                    visited.add((nr, nc))
                    queue.append((nr, nc, dist + 1))
        return 2147483647

    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 2147483647:
                rooms[r][c] = bfs_to_gate(r, c)`,

      lineAnnotations: {
        1: "Main — iterate over all cells",
        5: "Found an empty room — BFS to find nearest gate",
        6: "Set room's distance to nearest gate",
        12: "BFS helper — find shortest path from (r,c) to any gate",
        16: "Start BFS from the empty room",
        20: "If we reach a gate, return the distance",
        22: "Explore valid, unvisited, non-wall neighbors",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { rooms: [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]] },
          expectedOutput: "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3],
              shortLabel: "Start scanning for empty rooms",
              explanation: "Brute force: for each empty room (INF), run a separate BFS to find the nearest gate. This is very slow.",
              variables: { approach: "BFS per room" },
              dataStructure: {
                grid: [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]],
                gridStates: [
                  ["default","eliminated","found","default"],
                  ["default","default","default","eliminated"],
                  ["default","eliminated","default","eliminated"],
                  ["found","eliminated","default","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 20],
              shortLabel: "BFS from (0,0) finds gate at distance 3",
              explanation: "Room (0,0) is INF. BFS finds nearest gate at (0,2) with distance 3. Set rooms[0][0] = 3. This took O(m*n) work for just ONE room.",
              variables: { r: 0, c: 0, distance: 3 },
              dataStructure: {
                grid: [[3,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]],
                gridStates: [
                  ["active","eliminated","found","default"],
                  ["default","default","default","eliminated"],
                  ["default","eliminated","default","eliminated"],
                  ["found","eliminated","default","default"],
                ],
                bfsQueue: [],
              },
              delta: { changedCells: [{r:0,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6],
              shortLabel: "Repeat for all remaining rooms...",
              explanation: "We must repeat BFS for EVERY empty room. With many rooms, this leads to O((m*n)^2) time — far too slow for large grids.",
              variables: { totalBFS: "up to m*n", timePerBFS: "O(m*n)" },
              dataStructure: {
                grid: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]],
                gridStates: [
                  ["found","eliminated","found","found"],
                  ["found","found","found","eliminated"],
                  ["found","eliminated","found","eliminated"],
                  ["found","eliminated","found","found"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ rooms }) {
        // Simplified brute force compute steps
        const steps = [];
        const rows = rooms.length;
        const cols = rooms[0].length;
        const g = rooms.map(r => [...r]);
        const states = Array.from({ length: rows }, () => Array(cols).fill("default"));

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (g[r][c] === 0) states[r][c] = "found";
            else if (g[r][c] === -1) states[r][c] = "eliminated";
          }
        }

        steps.push({
          stepId: 0, lineNumbers: [1],
          shortLabel: "Initialize",
          explanation: "Brute force: BFS from each empty room to find nearest gate.",
          variables: { approach: "BFS per room" },
          dataStructure: { grid: g.map(r => [...r]), gridStates: states.map(r => [...r]), bfsQueue: [] },
          delta: {}, isAnswer: false,
        });

        // Just show final result for brute force
        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        const result = g.map(r => [...r]);
        // Multi-source BFS to compute answer
        const queue = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (result[r][c] === 0) queue.push([r, c]);
          }
        }
        while (queue.length > 0) {
          const [cr, cc] = queue.shift();
          for (const [dr, dc] of dirs) {
            const nr = cr + dr, nc = cc + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && result[nr][nc] === 2147483647) {
              result[nr][nc] = result[cr][cc] + 1;
              queue.push([nr, nc]);
            }
          }
        }

        const finalStates = result.map(row => row.map(v => v === -1 ? "eliminated" : "found"));
        steps.push({
          stepId: 1, lineNumbers: [6],
          shortLabel: "All rooms filled",
          explanation: "After BFS from each room, all distances computed.",
          variables: { answer: "Grid filled" },
          dataStructure: { grid: result, gridStates: finalStates, bfsQueue: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Multi-Source BFS from Gates",
      tier: "optimal",
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(m × n)",
      idea: `Start BFS from ALL gates simultaneously. Each BFS layer increases distance by 1.
        The first time a room is reached, that distance is guaranteed shortest. Process the
        entire grid in a single BFS pass.`,

      javaCode: `public void wallsAndGates(int[][] rooms) {
    int rows = rooms.length, cols = rooms[0].length;
    Queue<int[]> queue = new LinkedList<>();

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (rooms[r][c] == 0) {
                queue.offer(new int[]{r, c});
            }
        }
    }

    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] d : dirs) {
            int nr = cell[0] + d[0], nc = cell[1] + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && rooms[nr][nc] == Integer.MAX_VALUE) {
                rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;
                queue.offer(new int[]{nr, nc});
            }
        }
    }
}`,

      cppCode: `void wallsAndGates(vector<vector<int>>& rooms) {
    int rows = rooms.size(), cols = rooms[0].size();
    queue<pair<int,int>> q;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (rooms[r][c] == 0) {
                q.push({r, c});
            }
        }
    }

    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!q.empty()) {
        auto [cr, cc] = q.front(); q.pop();
        for (auto& d : dirs) {
            int nr = cr + d[0], nc = cc + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && rooms[nr][nc] == INT_MAX) {
                rooms[nr][nc] = rooms[cr][cc] + 1;
                q.push({nr, nc});
            }
        }
    }
}`,

      pythonCode: `def wallsAndGates(rooms: List[List[int]]) -> None:
    rows, cols = len(rooms), len(rooms[0])
    queue = deque()

    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0:
                queue.append((r, c))

    while queue:
        cr, cc = queue.popleft()
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = cr + dr, cc + dc
            if 0 <= nr < rows and 0 <= nc < cols \\
                and rooms[nr][nc] == 2147483647:
                rooms[nr][nc] = rooms[cr][cc] + 1
                queue.append((nr, nc))`,

      lineAnnotations: {
        1: "Main function — modifies grid in-place",
        3: "Queue for multi-source BFS",
        5: "Find ALL gates and add them to queue",
        7: "Gate found — add to initial BFS frontier",
        13: "BFS processes cells in order of distance",
        15: "Dequeue a cell and check its neighbors",
        17: "Check neighbor is in bounds",
        18: "Only process unvisited rooms (still INF)",
        19: "Distance = parent's distance + 1",
        20: "Enqueue for further exploration",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "4x4 grid with two gates, walls, and empty rooms",
          input: { rooms: [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]] },
          expectedOutput: "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3],
              shortLabel: "Initialize — find all gates",
              explanation: "Scan grid for gates (value 0). We find gates at (0,2) and (3,0). Add both to the BFS queue. These are our starting points at distance 0.",
              variables: { gates: "[(0,2), (3,0)]", queueSize: 2 },
              dataStructure: {
                grid: [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]],
                gridStates: [
                  ["default","eliminated","found","default"],
                  ["default","default","default","eliminated"],
                  ["default","eliminated","default","eliminated"],
                  ["found","eliminated","default","default"],
                ],
                bfsQueue: ["0,2","3,0"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [15, 17, 18, 19, 20],
              shortLabel: "Layer 1: distance = 1",
              explanation: "Process gates. From gate (0,2): room (0,3) gets distance 1, room (1,2) gets distance 1. From gate (3,0): room (2,0) gets distance 1. Walls block expansion.",
              variables: { layer: 1, roomsFilled: 3, queueSize: 3 },
              dataStructure: {
                grid: [[2147483647,-1,0,1],[2147483647,2147483647,1,-1],[1,-1,2147483647,-1],[0,-1,2147483647,2147483647]],
                gridStates: [
                  ["default","eliminated","found","queued"],
                  ["default","default","queued","eliminated"],
                  ["queued","eliminated","default","eliminated"],
                  ["found","eliminated","default","default"],
                ],
                bfsQueue: ["0,3","1,2","2,0"],
              },
              delta: { changedCells: [{r:0,c:3},{r:1,c:2},{r:2,c:0}] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [15, 17, 18, 19, 20],
              shortLabel: "Layer 2: distance = 2",
              explanation: "Process distance-1 rooms. From (1,2): room (1,1) gets distance 2. From (2,0): room (1,0) gets distance 2. Room (2,2) gets distance 2 from (1,2).",
              variables: { layer: 2, roomsFilled: 6, queueSize: 3 },
              dataStructure: {
                grid: [[2147483647,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,2147483647,2147483647]],
                gridStates: [
                  ["default","eliminated","found","visited"],
                  ["queued","queued","visited","eliminated"],
                  ["visited","eliminated","queued","eliminated"],
                  ["found","eliminated","default","default"],
                ],
                bfsQueue: ["1,0","1,1","2,2"],
              },
              delta: { changedCells: [{r:1,c:1},{r:1,c:0},{r:2,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15, 17, 18, 19, 20],
              shortLabel: "Layer 3: distance = 3",
              explanation: "Process distance-2 rooms. From (1,0): room (0,0) gets distance 3. From (2,2): room (3,2) gets distance 3.",
              variables: { layer: 3, roomsFilled: 8, queueSize: 2 },
              dataStructure: {
                grid: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,2147483647]],
                gridStates: [
                  ["queued","eliminated","found","visited"],
                  ["visited","visited","visited","eliminated"],
                  ["visited","eliminated","visited","eliminated"],
                  ["found","eliminated","queued","default"],
                ],
                bfsQueue: ["0,0","3,2"],
              },
              delta: { changedCells: [{r:0,c:0},{r:3,c:2}] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15, 17, 18, 19, 20],
              shortLabel: "Layer 4: distance = 4",
              explanation: "From (3,2): room (3,3) gets distance 4. From (0,0): no unvisited neighbors. Queue now empty.",
              variables: { layer: 4, roomsFilled: 9, queueSize: 0 },
              dataStructure: {
                grid: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]],
                gridStates: [
                  ["visited","eliminated","found","visited"],
                  ["visited","visited","visited","eliminated"],
                  ["visited","eliminated","visited","eliminated"],
                  ["found","eliminated","visited","queued"],
                ],
                bfsQueue: ["3,3"],
              },
              delta: { changedCells: [{r:3,c:3}] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13],
              shortLabel: "BFS complete — all rooms filled",
              explanation: "Queue is empty. Every reachable empty room now contains its shortest distance to the nearest gate. The grid is fully solved in a single BFS pass.",
              variables: { answer: "Grid complete" },
              dataStructure: {
                grid: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]],
                gridStates: [
                  ["found","eliminated","found","found"],
                  ["found","found","found","eliminated"],
                  ["found","eliminated","found","eliminated"],
                  ["found","eliminated","found","found"],
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
          label: "No Gates",
          description: "Grid with no gates — all rooms stay INF",
          input: { rooms: [[2147483647,2147483647],[-1,2147483647]] },
          expectedOutput: "[[2147483647,2147483647],[-1,2147483647]]",
          commonMistake: "Assuming every grid has at least one gate. If no gates exist, the BFS queue starts empty and no rooms are updated.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 3, 5],
              shortLabel: "Scan for gates — none found",
              explanation: "Scan the entire grid for gates (value 0). No gates exist. BFS queue is empty.",
              variables: { gates: "[]", queueSize: 0 },
              dataStructure: {
                grid: [[2147483647,2147483647],[-1,2147483647]],
                gridStates: [
                  ["default","default"],
                  ["eliminated","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [13],
              shortLabel: "Queue empty — nothing to process",
              explanation: "BFS while-loop doesn't execute because the queue is empty. All empty rooms remain INF — they're unreachable from any gate because no gates exist.",
              variables: { answer: "Grid unchanged" },
              dataStructure: {
                grid: [[2147483647,2147483647],[-1,2147483647]],
                gridStates: [
                  ["default","default"],
                  ["eliminated","default"],
                ],
                bfsQueue: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ rooms }) {
        const steps = [];
        const rows = rooms.length;
        const cols = rooms[0].length;
        const g = rooms.map(r => [...r]);
        const states = Array.from({ length: rows }, () => Array(cols).fill("default"));
        const INF = 2147483647;

        // Mark walls
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (g[r][c] === -1) states[r][c] = "eliminated";
            if (g[r][c] === 0) states[r][c] = "found";
          }
        }

        // Find all gates
        const queue = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (g[r][c] === 0) queue.push([r, c]);
          }
        }

        const gateLabels = queue.map(([r, c]) => `(${r},${c})`).join(", ");

        steps.push({
          stepId: 0,
          lineNumbers: [1, 3, 5],
          shortLabel: `Found ${queue.length} gate(s)`,
          explanation: `Scan grid for gates. Found ${queue.length} gate(s) at ${gateLabels || "none"}. Add all to BFS queue.`,
          variables: { gates: gateLabels || "none", queueSize: queue.length },
          dataStructure: {
            grid: g.map(r => [...r]),
            gridStates: states.map(r => [...r]),
            bfsQueue: queue.map(([r, c]) => `${r},${c}`),
          },
          delta: {},
          isAnswer: false,
        });

        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        let layer = 0;

        while (queue.length > 0) {
          const size = queue.length;
          layer++;
          const changed = [];

          for (let i = 0; i < size; i++) {
            const [cr, cc] = queue.shift();
            for (const [dr, dc] of dirs) {
              const nr = cr + dr, nc = cc + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] === INF) {
                g[nr][nc] = g[cr][cc] + 1;
                states[nr][nc] = "queued";
                queue.push([nr, nc]);
                changed.push({r: nr, c: nc});
              }
            }
            states[cr][cc] = "visited";
          }

          if (changed.length > 0) {
            steps.push({
              stepId: steps.length,
              lineNumbers: [15, 19, 20],
              shortLabel: `Layer ${layer}: distance = ${layer}`,
              explanation: `Process layer ${layer}. ${changed.length} room(s) reached at distance ${layer}.`,
              variables: { layer, roomsFilled: changed.length, queueSize: queue.length },
              dataStructure: {
                grid: g.map(r => [...r]),
                gridStates: states.map(r => [...r]),
                bfsQueue: queue.map(([r, c]) => `${r},${c}`),
              },
              delta: { changedCells: changed },
              isAnswer: false,
            });
          }
        }

        // Final step
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (states[r][c] === "visited" || states[r][c] === "queued") states[r][c] = "found";
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [13],
          shortLabel: "BFS complete",
          explanation: "All reachable rooms filled with shortest distances. Queue empty.",
          variables: { answer: "Grid complete" },
          dataStructure: {
            grid: g.map(r => [...r]),
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
    brute: { time: "O((m×n)²)", space: "O(m × n)", explanation: "BFS from each of up to m*n rooms, each BFS is O(m*n)" },
    optimal: { time: "O(m × n)", space: "O(m × n)", explanation: "Single multi-source BFS visits each cell at most once", tradeoff: "Reversing the search direction eliminates redundant BFS calls" },
  },

  interviewTips: [
    "Start by explaining the brute force (BFS per room) and why it's O((m*n)^2).",
    "The key insight is multi-source BFS — start from ALL gates simultaneously.",
    "Mention this pattern appears in Rotting Oranges and other 'minimum distance' grid problems.",
    "Clarify: rooms are modified in-place. If not allowed, use a separate distance matrix.",
    "Edge case: no gates means all rooms stay INF. All gates means all rooms are already 0.",
  ],

  relatedProblems: ["rotting-oranges", "number-of-islands", "surrounding-regions"],
};
