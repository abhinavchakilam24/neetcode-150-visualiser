export const jumpGameII = {
  id: 123,
  slug: "jump-game-ii",
  title: "Jump Game II",
  difficulty: "Medium",
  topic: "greedy",
  topicLabel: "Greedy",
  neetcodeNumber: 123,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/jump-game-ii/",

  pattern: "BFS-Style Greedy Range Expansion",
  patternExplanation: `Instead of exploring all possible jump paths (exponential), treat the array
    as a BFS graph: each "level" is the set of indices reachable in exactly k jumps. Track the
    farthest reachable index in each level and increment the jump count when you pass the current
    level's boundary.`,

  intuition: {
    coreInsight: `Think of indices reachable in 1 jump as "level 1", indices reachable in 2 jumps
      as "level 2", etc. As we scan left to right, we track the farthest index reachable from
      the current level. When our scan index passes the current level's end boundary, we must
      take another jump and the new boundary becomes the farthest we've seen so far. This is
      implicit BFS — no queue needed.`,

    mentalModel: `Imagine you're on stepping stones across a river. From each stone you can see
      several stones ahead. You walk forward, and at each stone you note how far ahead you COULD
      jump. When you reach the last stone you could have reached with your previous jump, you
      MUST jump — and you jump to the farthest stone you noted along the way. Each mandatory
      jump is one level of BFS.`,

    whyNaiveFails: `A recursive/DP approach tries every possible jump from every index — that's
      O(n * max(nums[i])) time and can be O(n^2) in the worst case. With n=10^4 and jumps up
      to 10^4, that's 100 million operations. The greedy approach does it in O(n) with a single
      pass because we never need to revisit any index.`,

    keyObservation: `We don't need to know WHICH path gives the minimum jumps — only HOW MANY
      jumps. By always extending our reach to the farthest possible index within each BFS level,
      we guarantee the minimum number of levels (jumps). The key variables are: currentEnd
      (right boundary of current level) and farthest (max reachable from this level).`,
  },

  problem: `You are given a 0-indexed array of integers nums of length n. You are initially
    positioned at nums[0]. Each element nums[i] represents the maximum length of a forward
    jump from index i. Return the minimum number of jumps to reach nums[n - 1]. The test
    cases are generated such that you can always reach nums[n - 1].`,

  examples: [
    { input: "nums = [2,3,1,1,4]", output: "2", explanation: "Jump 1: index 0 → index 1, Jump 2: index 1 → index 4. Minimum jumps = 2." },
    { input: "nums = [2,3,0,1,4]", output: "2", explanation: "Jump 1: index 0 → index 1, Jump 2: index 1 → index 4. Minimum jumps = 2." },
  ],

  constraints: [
    "1 <= nums.length <= 10^4",
    "0 <= nums[i] <= 1000",
    "It's guaranteed that you can reach nums[n - 1].",
  ],

  approaches: {
    brute: {
      label: "BFS with Queue",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: "Use explicit BFS: from each reachable index, enqueue all indices within jump range. Track levels as jump count.",

      javaCode: `public int jump(int[] nums) {
    int n = nums.length;
    if (n <= 1) return 0;
    Queue<Integer> queue = new LinkedList<>();
    boolean[] visited = new boolean[n];
    queue.offer(0);
    visited[0] = true;
    int jumps = 0;
    while (!queue.isEmpty()) {
        int size = queue.size();
        jumps++;
        for (int q = 0; q < size; q++) {
            int idx = queue.poll();
            for (int j = 1; j <= nums[idx]; j++) {
                int next = idx + j;
                if (next >= n - 1) return jumps;
                if (!visited[next]) {
                    visited[next] = true;
                    queue.offer(next);
                }
            }
        }
    }
    return jumps;
}`,

      cppCode: `int jump(vector<int>& nums) {
    int n = nums.size();
    if (n <= 1) return 0;
    queue<int> q;
    vector<bool> visited(n, false);
    q.push(0);
    visited[0] = true;
    int jumps = 0;
    while (!q.empty()) {
        int size = q.size();
        jumps++;
        for (int i = 0; i < size; i++) {
            int idx = q.front(); q.pop();
            for (int j = 1; j <= nums[idx]; j++) {
                int next = idx + j;
                if (next >= n - 1) return jumps;
                if (!visited[next]) {
                    visited[next] = true;
                    q.push(next);
                }
            }
        }
    }
    return jumps;
}`,

      pythonCode: `def jump(nums: List[int]) -> int:
    n = len(nums)
    if n <= 1:
        return 0
    queue = deque([0])
    visited = {0}
    jumps = 0
    while queue:
        size = len(queue)
        jumps += 1
        for _ in range(size):
            idx = queue.popleft()
            for j in range(1, nums[idx] + 1):
                nxt = idx + j
                if nxt >= n - 1:
                    return jumps
                if nxt not in visited:
                    visited.add(nxt)
                    queue.append(nxt)
    return jumps`,

      lineAnnotations: {
        3: "Base case: already at the end",
        7: "BFS level = one jump",
        10: "Process all nodes at current level",
        12: "Try every reachable index from current position",
        14: "Reached the last index — return jumps",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [2, 3, 1, 1, 4] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5],
              shortLabel: "Init BFS",
              explanation: "Initialize BFS queue with index 0. We start at the first position and need to reach the last.",
              variables: { jumps: 0, queue: "[0]", visited: "{0}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "start", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 10, 12],
              shortLabel: "Jump 1: from idx 0, reach 1,2",
              explanation: "Level 1 (jump 1): From index 0 (value=2), we can reach indices 1 and 2. Enqueue both. Neither reaches index 4 yet.",
              variables: { jumps: 1, queue: "[1, 2]", visited: "{0, 1, 2}", idx: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "queued", 2: "queued", 3: "default", 4: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 10, 12, 14],
              shortLabel: "Jump 2: from idx 1 (val=3), reach 4!",
              explanation: "Level 2 (jump 2): Process index 1 (value=3). We can reach indices 2, 3, 4. Index 4 is the last index — return 2 jumps!",
              variables: { jumps: 2, idx: 1, next: 4, answer: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "visited", 3: "queued", 4: "found" },
                pointers: [{ name: "idx", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1, 3, 4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        if (n <= 1) {
          steps.push({
            stepId: 0, lineNumbers: [3],
            shortLabel: "Already at end",
            explanation: "Array has 0 or 1 element. Already at the destination. Return 0.",
            variables: { answer: 0 },
            dataStructure: { arrayStates: { 0: "found" }, pointers: [], hashMap: {} },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const queue = [0];
        const visited = new Set([0]);
        let jumps = 0;

        steps.push({
          stepId: 0, lineNumbers: [4, 5],
          shortLabel: "Init BFS",
          explanation: "Start BFS from index 0.",
          variables: { jumps: 0, queue: "[0]" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, i === 0 ? "active" : "default"])),
            pointers: [{ name: "start", index: 0, color: "pointer" }],
            hashMap: {},
          },
          delta: { changedIndices: [0] }, isAnswer: false,
        });

        while (queue.length > 0) {
          const size = queue.length;
          jumps++;
          const nextLevel = [];
          for (let q = 0; q < size; q++) {
            const idx = queue.shift();
            for (let j = 1; j <= nums[idx]; j++) {
              const next = idx + j;
              if (next >= n - 1) {
                const states = Object.fromEntries(nums.map((_, i) => [i, visited.has(i) ? "visited" : "default"]));
                states[idx] = "active";
                states[n - 1] = "found";
                steps.push({
                  stepId: steps.length, lineNumbers: [14],
                  shortLabel: `Jump ${jumps}: reach end!`,
                  explanation: `From index ${idx} (value=${nums[idx]}), we reach index ${n - 1}. Return ${jumps} jumps.`,
                  variables: { jumps, idx, answer: jumps },
                  dataStructure: { arrayStates: states, pointers: [{ name: "idx", index: idx, color: "pointer" }], hashMap: {} },
                  delta: { changedIndices: [idx, n - 1] }, isAnswer: true,
                });
                return steps;
              }
              if (!visited.has(next)) {
                visited.add(next);
                nextLevel.push(next);
              }
            }
          }

          const states = Object.fromEntries(nums.map((_, i) => [i, visited.has(i) ? "visited" : "default"]));
          nextLevel.forEach(i => { states[i] = "queued"; });
          steps.push({
            stepId: steps.length, lineNumbers: [7, 8],
            shortLabel: `Jump ${jumps}: level processed`,
            explanation: `After jump ${jumps}, we can reach indices [${nextLevel.join(", ")}].`,
            variables: { jumps, queue: `[${nextLevel.join(", ")}]` },
            dataStructure: { arrayStates: states, pointers: [], hashMap: {} },
            delta: { changedIndices: nextLevel }, isAnswer: false,
          });

          queue.push(...nextLevel);
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Greedy BFS (Implicit)",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Scan left to right, tracking the farthest reachable index. When we pass the
        current level's end, increment jumps and set the new end to farthest. This is implicit
        BFS — no queue needed.`,

      javaCode: `public int jump(int[] nums) {
    int jumps = 0;
    int currentEnd = 0;
    int farthest = 0;

    for (int i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);

        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }

    return jumps;
}`,

      cppCode: `int jump(vector<int>& nums) {
    int jumps = 0;
    int currentEnd = 0;
    int farthest = 0;

    for (int i = 0; i < nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);

        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }

    return jumps;
}`,

      pythonCode: `def jump(nums: List[int]) -> int:
    jumps = 0
    current_end = 0
    farthest = 0

    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])

        if i == current_end:
            jumps += 1
            current_end = farthest

    return jumps`,

      lineAnnotations: {
        2: "Count of jumps taken so far",
        3: "Right boundary of current BFS level",
        4: "Farthest index reachable from current level",
        6: "Scan every index except the last (we want to REACH it, not jump FROM it)",
        7: "Update farthest reachable from this level",
        9: "We've exhausted all positions in the current level",
        10: "Must take a jump — increment counter",
        11: "New level boundary = farthest we can reach",
        14: "Return total jumps needed",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with clear level boundaries",
          input: { nums: [2, 3, 1, 1, 4] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Initialize",
              explanation: "Start with jumps=0, currentEnd=0 (end of level 0 is index 0 itself), farthest=0. We'll scan indices 0 through 3 (not 4, the last index).",
              variables: { jumps: 0, currentEnd: 0, farthest: 0, i: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7],
              shortLabel: "i=0: farthest = max(0, 0+2) = 2",
              explanation: "At index 0, value=2. We can reach index 0+2=2. farthest = max(0, 2) = 2. This is the farthest we can reach from level 0.",
              variables: { i: 0, "nums[i]": 2, jumps: 0, currentEnd: 0, farthest: 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 11],
              shortLabel: "i==currentEnd → jump! jumps=1, end=2",
              explanation: "i=0 equals currentEnd=0, so we've reached the boundary of level 0. We MUST jump. jumps becomes 1. New currentEnd = farthest = 2. Level 1 spans indices 1 to 2.",
              variables: { i: 0, jumps: 1, currentEnd: 2, farthest: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "queued", 2: "queued", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "end", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7],
              shortLabel: "i=1: farthest = max(2, 1+3) = 4",
              explanation: "At index 1, value=3. We can reach index 1+3=4. farthest = max(2, 4) = 4. From level 1, we can already reach the last index!",
              variables: { i: 1, "nums[i]": 3, jumps: 1, currentEnd: 2, farthest: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "queued", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "end", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7],
              shortLabel: "i=2: farthest = max(4, 2+1) = 4",
              explanation: "At index 2, value=1. We can reach index 2+1=3. farthest = max(4, 3) = 4. No improvement — index 1's jump already reached farther.",
              variables: { i: 2, "nums[i]": 1, jumps: 1, currentEnd: 2, farthest: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "end", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [9, 10, 11],
              shortLabel: "i==currentEnd → jump! jumps=2, end=4",
              explanation: "i=2 equals currentEnd=2. We've exhausted level 1. Jump again! jumps becomes 2. New currentEnd = farthest = 4. Level 2 reaches the end.",
              variables: { i: 2, jumps: 2, currentEnd: 4, farthest: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "queued", 4: "queued" },
                pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "end", index: 4, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2, 3, 4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 7],
              shortLabel: "i=3: farthest = max(4, 3+1) = 4",
              explanation: "At index 3, value=1. Reach = 3+1=4. farthest stays 4. We continue but the loop ends after i=3 (we don't process i=4).",
              variables: { i: 3, "nums[i]": 1, jumps: 2, currentEnd: 4, farthest: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "queued" },
                pointers: [{ name: "i", index: 3, color: "pointer" }, { name: "end", index: 4, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [3], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [14],
              shortLabel: "Return 2",
              explanation: "Loop complete. We needed exactly 2 jumps to reach the last index: 0 → 1 → 4. Return 2.",
              variables: { jumps: 2, answer: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "visited", 3: "visited", 4: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1, 4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Jump",
          description: "First element can reach the end directly",
          input: { nums: [5, 1, 1, 1, 1] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Initialize",
              explanation: "Start: jumps=0, currentEnd=0, farthest=0.",
              variables: { jumps: 0, currentEnd: 0, farthest: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7],
              shortLabel: "i=0: farthest = max(0, 0+5) = 5",
              explanation: "At index 0, value=5. We can reach index 5 (beyond array end at 4). farthest = 5.",
              variables: { i: 0, "nums[i]": 5, jumps: 0, currentEnd: 0, farthest: 5 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 11],
              shortLabel: "i==currentEnd → jump! jumps=1",
              explanation: "i=0 equals currentEnd=0. Jump! jumps=1, currentEnd=5. One jump covers the entire array.",
              variables: { i: 0, jumps: 1, currentEnd: 5, farthest: 5 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "queued", 2: "queued", 3: "queued", 4: "queued" },
                pointers: [{ name: "end", index: 4, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1, 2, 3, 4] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [14],
              shortLabel: "Return 1",
              explanation: "Loop continues through i=1,2,3 but no more jumps needed (i never equals currentEnd=5 again within bounds). Return 1.",
              variables: { jumps: 1, answer: 1 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "visited", 2: "visited", 3: "visited", 4: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [0, 4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "All Ones",
          description: "Every element is 1 — must take n-1 jumps",
          input: { nums: [1, 1, 1, 1] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Initialize",
              explanation: "jumps=0, currentEnd=0, farthest=0. With all 1s, each jump only advances one position.",
              variables: { jumps: 0, currentEnd: 0, farthest: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7],
              shortLabel: "i=0: farthest=1",
              explanation: "At index 0, value=1. farthest = max(0, 0+1) = 1. Can only reach one step ahead.",
              variables: { i: 0, "nums[i]": 1, jumps: 0, currentEnd: 0, farthest: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 11],
              shortLabel: "Jump 1: end=1",
              explanation: "i==currentEnd. Jump! jumps=1, currentEnd=1.",
              variables: { i: 0, jumps: 1, currentEnd: 1, farthest: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "queued", 2: "default", 3: "default" },
                pointers: [{ name: "end", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7],
              shortLabel: "i=1: farthest=2",
              explanation: "At index 1, value=1. farthest = max(1, 1+1) = 2.",
              variables: { i: 1, "nums[i]": 1, jumps: 1, currentEnd: 1, farthest: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "end", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10, 11],
              shortLabel: "Jump 2: end=2",
              explanation: "i==currentEnd. Jump! jumps=2, currentEnd=2.",
              variables: { i: 1, jumps: 2, currentEnd: 2, farthest: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "queued", 3: "default" },
                pointers: [{ name: "end", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7],
              shortLabel: "i=2: farthest=3",
              explanation: "At index 2, value=1. farthest = max(2, 2+1) = 3. We can now reach the end.",
              variables: { i: 2, "nums[i]": 1, jumps: 2, currentEnd: 2, farthest: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "end", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9, 10, 11],
              shortLabel: "Jump 3: end=3",
              explanation: "i==currentEnd. Jump! jumps=3, currentEnd=3. We've reached the last index.",
              variables: { i: 2, jumps: 3, currentEnd: 3, farthest: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "queued" },
                pointers: [{ name: "end", index: 3, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [14],
              shortLabel: "Return 3",
              explanation: "Loop ends (i only goes to n-2=2). Return jumps=3. With all 1s, we need n-1 jumps.",
              variables: { jumps: 3, answer: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;

        if (n <= 1) {
          steps.push({
            stepId: 0, lineNumbers: [14],
            shortLabel: "Already at end",
            explanation: "Single element array. Already at destination. Return 0.",
            variables: { answer: 0 },
            dataStructure: { arrayStates: { 0: "found" }, pointers: [], hashMap: {} },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        let jumps = 0, currentEnd = 0, farthest = 0;

        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4],
          shortLabel: "Initialize",
          explanation: "Start with jumps=0, currentEnd=0, farthest=0.",
          variables: { jumps: 0, currentEnd: 0, farthest: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n - 1; i++) {
          farthest = Math.max(farthest, i + nums[i]);

          const states = Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"]));
          steps.push({
            stepId: steps.length, lineNumbers: [6, 7],
            shortLabel: `i=${i}: farthest=${farthest}`,
            explanation: `At index ${i} (value=${nums[i]}), reach = ${i}+${nums[i]}=${i + nums[i]}. farthest = max(${farthest === i + nums[i] ? farthest : farthest}, ${i + nums[i]}) = ${farthest}.`,
            variables: { i, "nums[i]": nums[i], jumps, currentEnd, farthest },
            dataStructure: {
              arrayStates: states,
              pointers: [{ name: "i", index: i, color: "pointer" }, ...(currentEnd < n ? [{ name: "end", index: Math.min(currentEnd, n - 1), color: "active" }] : [])],
              hashMap: {},
            },
            delta: { changedIndices: [i], movedPointers: ["i"] }, isAnswer: false,
          });

          if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;

            const statesAfter = Object.fromEntries(nums.map((_, j) => [j, j <= i ? "visited" : j <= currentEnd ? "queued" : "default"]));
            steps.push({
              stepId: steps.length, lineNumbers: [9, 10, 11],
              shortLabel: `Jump ${jumps}: end=${currentEnd}`,
              explanation: `i=${i} equals currentEnd. Must jump! jumps=${jumps}, new currentEnd=${currentEnd}.`,
              variables: { i, jumps, currentEnd, farthest },
              dataStructure: {
                arrayStates: statesAfter,
                pointers: [{ name: "end", index: Math.min(currentEnd, n - 1), color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [14],
          shortLabel: `Return ${jumps}`,
          explanation: `Loop complete. Minimum jumps to reach the last index = ${jumps}.`,
          variables: { jumps, answer: jumps },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "found"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n²)", space: "O(n)", explanation: "BFS with queue explores all reachable indices per level" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass with two pointers tracking level boundaries", tradeoff: "Implicit BFS eliminates queue overhead entirely" },
  },

  interviewTips: [
    "Start by explaining the BFS intuition — the array is a graph where each index has edges to i+1 through i+nums[i].",
    "Mention that the greedy approach is implicit BFS — same idea, no queue needed.",
    "Clarify: we iterate to n-2, not n-1, because we want to REACH the last index, not jump FROM it.",
    "The two key variables are currentEnd (level boundary) and farthest (max reach from this level).",
    "This problem guarantees reachability — if it didn't, you'd check if farthest ever stops growing.",
  ],

  relatedProblems: ["jump-game", "maximum-subarray"],
};
