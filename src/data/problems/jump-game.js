export const jumpGame = {
  id: 122,
  slug: "jump-game",
  title: "Jump Game",
  difficulty: "Medium",
  topic: "greedy",
  topicLabel: "Greedy",
  neetcodeNumber: 122,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Microsoft", "Google", "Apple", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/jump-game/",

  pattern: "Greedy Reachability (Furthest Reach Tracking)",
  patternExplanation: `Track the furthest index reachable so far. At each position, update the furthest reach. If the current index exceeds the furthest reach, we're stuck and can't reach the end.`,

  intuition: {
    coreInsight: `You don't need to find the exact path — just whether any path exists. At each index i, the furthest you can ever reach is max(furthestReach, i + nums[i]). If at any point i > furthestReach, you've fallen into a gap you can never cross. If furthestReach >= n-1, you can reach the last index.`,

    mentalModel: `Imagine you're hopping across lily pads on a pond. Each pad tells you the maximum distance you can jump. As you hop forward, you keep track of the furthest pad you could possibly reach. If you ever land on a pad beyond your reach — you've fallen in the water. If your reach extends to the shore, you're safe.`,

    whyNaiveFails: `A recursive/backtracking approach tries every possible jump from every index. From index 0 with value k, you'd try indices 1..k, each spawning their own recursive calls. This creates an exponential tree of possibilities — O(2^n) in the worst case. The greedy approach needs only a single left-to-right scan.`,

    keyObservation: `We only need to track one variable: the furthest index reachable so far. We never need to track which specific path we took. If furthestReach >= last index at any point, return true immediately. If i > furthestReach, return false — we've hit an unreachable position.`,
  },

  problem: `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.`,

  examples: [
    { input: "nums = [2,3,1,1,4]", output: "true", explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index." },
    { input: "nums = [3,2,1,0,4]", output: "false", explanation: "You will always arrive at index 3. Its value is 0, so you can never reach index 4." },
  ],

  constraints: [
    "1 <= nums.length <= 10^4",
    "0 <= nums[i] <= 10^5",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Backtracking)",
      tier: "brute",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: "Recursively try every possible jump from each index. If any path reaches the last index, return true.",

      javaCode: `public boolean canJump(int[] nums) {
    return canReach(nums, 0);
}

private boolean canReach(int[] nums, int pos) {
    if (pos >= nums.length - 1) return true;
    for (int jump = nums[pos]; jump >= 1; jump--) {
        if (canReach(nums, pos + jump)) return true;
    }
    return false;
}`,

      cppCode: `bool canJump(vector<int>& nums) {
    return canReach(nums, 0);
}

bool canReach(vector<int>& nums, int pos) {
    if (pos >= nums.size() - 1) return true;
    for (int jump = nums[pos]; jump >= 1; jump--) {
        if (canReach(nums, pos + jump)) return true;
    }
    return false;
}`,

      pythonCode: `def canJump(nums: List[int]) -> bool:
    def can_reach(pos):
        if pos >= len(nums) - 1:
            return True
        for jump in range(nums[pos], 0, -1):
            if can_reach(pos + jump):
                return True
        return False
    return can_reach(0)`,

      lineAnnotations: {
        2: "Start from position 0",
        5: "Base case: reached or passed last index",
        6: "Try every possible jump length from current position",
        7: "Recursively check if we can reach from the new position",
        9: "No jump worked — this path is a dead end",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [2, 3, 1, 1, 4] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Start at index 0",
              explanation: "Begin at index 0, value=2. We can jump 1 or 2 steps. Try the recursive backtracking approach.",
              variables: { pos: 0, "nums[pos]": 2, target: "index 4" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "pos", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7],
              shortLabel: "Jump 2 → index 2",
              explanation: "Try jumping 2 from index 0 to index 2. At index 2, value=1, so we can jump 1.",
              variables: { pos: 2, "nums[pos]": 1, jump: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "pos", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7],
              shortLabel: "Jump 1 → index 3",
              explanation: "From index 2, jump 1 to index 3. At index 3, value=1, jump 1 to index 4.",
              variables: { pos: 3, "nums[pos]": 1, jump: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "pos", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5],
              shortLabel: "Reached index 4!",
              explanation: "From index 3, jump 1 to index 4. pos >= nums.length-1 → return true. Path: 0→2→3→4.",
              variables: { pos: 4, answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "found", 3: "found", 4: "found" },
                pointers: [],
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        const defaultStates = () => Object.fromEntries(nums.map((_, i) => [i, "default"]));

        function solve(pos, path) {
          if (pos >= n - 1) {
            const states = defaultStates();
            path.forEach(p => states[p] = "found");
            if (pos < n) states[pos] = "found";
            steps.push({
              stepId: steps.length, lineNumbers: [5],
              shortLabel: `Reached index ${pos}!`,
              explanation: `Reached the end. Path: ${path.join("→")}→${pos}. Return true.`,
              variables: { pos, answer: "true" },
              dataStructure: { arrayStates: states, pointers: [] },
              delta: {}, isAnswer: true,
            });
            return true;
          }

          const states = defaultStates();
          path.forEach(p => states[p] = "visited");
          states[pos] = "active";
          steps.push({
            stepId: steps.length, lineNumbers: [6, 7],
            shortLabel: `At index ${pos}, val=${nums[pos]}`,
            explanation: `At index ${pos}, value=${nums[pos]}. Can jump up to ${nums[pos]} steps.`,
            variables: { pos, "nums[pos]": nums[pos] },
            dataStructure: { arrayStates: states, pointers: [{ name: "pos", index: pos, color: "pointer" }] },
            delta: { changedIndices: [pos] }, isAnswer: false,
          });

          for (let jump = nums[pos]; jump >= 1; jump--) {
            if (steps.length > 30) break;
            if (solve(pos + jump, [...path, pos])) return true;
          }
          return false;
        }

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Start at index 0",
          explanation: `Begin at index 0, value=${nums[0]}.`,
          variables: { pos: 0, "nums[0]": nums[0] },
          dataStructure: { arrayStates: defaultStates(), pointers: [{ name: "pos", index: 0, color: "pointer" }] },
          delta: {}, isAnswer: false,
        });

        if (n <= 1) {
          steps.push({
            stepId: 1, lineNumbers: [5],
            shortLabel: "Already at end!",
            explanation: "Array has only one element — we're already at the last index.",
            variables: { answer: "true" },
            dataStructure: { arrayStates: { 0: "found" }, pointers: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        solve(0, []);
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Greedy (Furthest Reach)",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Scan left to right. Track the furthest reachable index. If current
        index exceeds furthest reach, return false. If furthest reach >= last index, return true.`,

      javaCode: `public boolean canJump(int[] nums) {
    int furthest = 0;

    for (int i = 0; i < nums.length; i++) {
        if (i > furthest) return false;
        furthest = Math.max(furthest, i + nums[i]);
        if (furthest >= nums.length - 1) return true;
    }

    return true;
}`,

      cppCode: `bool canJump(vector<int>& nums) {
    int furthest = 0;

    for (int i = 0; i < nums.size(); i++) {
        if (i > furthest) return false;
        furthest = max(furthest, i + nums[i]);
        if (furthest >= (int)nums.size() - 1) return true;
    }

    return true;
}`,

      pythonCode: `def canJump(nums: List[int]) -> bool:
    furthest = 0

    for i in range(len(nums)):
        if i > furthest:
            return False
        furthest = max(furthest, i + nums[i])
        if furthest >= len(nums) - 1:
            return True

    return True`,

      lineAnnotations: {
        2: "Track the furthest index we can reach",
        4: "Scan every index left to right",
        5: "If current index exceeds furthest reach — we're stuck",
        6: "Update furthest reachable index from here",
        7: "Early exit: if we can already reach the end, done",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Reachable",
          description: "Can reach the end — standard case",
          input: { nums: [2, 3, 1, 1, 4] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init furthest=0",
              explanation: "Set furthest reachable index to 0. We start at index 0 and will scan right, expanding our reach.",
              variables: { furthest: 0, i: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: "i=0: furthest=max(0,2)=2",
              explanation: "At index 0 (value=2), i=0 <= furthest=0 so we're reachable. Update furthest = max(0, 0+2) = 2. We can reach up to index 2.",
              variables: { i: 0, "nums[i]": 2, "i+nums[i]": 2, furthest: 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "queued", 2: "queued", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "furthest", index: 2, color: "active" }],
              },
              delta: { changedIndices: [0, 1, 2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6],
              shortLabel: "i=1: furthest=max(2,4)=4",
              explanation: "At index 1 (value=3), i=1 <= furthest=2 so reachable. furthest = max(2, 1+3) = 4. We can now reach the last index!",
              variables: { i: 1, "nums[i]": 3, "i+nums[i]": 4, furthest: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "queued", 3: "queued", 4: "queued" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "furthest", index: 4, color: "active" }],
              },
              delta: { changedIndices: [1, 3, 4], movedPointers: ["i", "furthest"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7],
              shortLabel: "furthest=4 >= 4 → true",
              explanation: "furthest (4) >= nums.length-1 (4). We can reach the last index! Return true immediately — no need to check remaining indices.",
              variables: { furthest: 4, "nums.length-1": 4, answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Unreachable",
          description: "Blocked by a zero — cannot reach the end",
          input: { nums: [3, 2, 1, 0, 4] },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init furthest=0",
              explanation: "Set furthest = 0. The trap here is index 3 which has value 0 — a dead end.",
              variables: { furthest: 0, i: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: "i=0: furthest=max(0,3)=3",
              explanation: "At index 0 (value=3), furthest = max(0, 0+3) = 3. We can reach up to index 3.",
              variables: { i: 0, "nums[i]": 3, "i+nums[i]": 3, furthest: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "queued", 2: "queued", 3: "queued", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "furthest", index: 3, color: "active" }],
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6],
              shortLabel: "i=1: furthest=max(3,3)=3",
              explanation: "At index 1 (value=2), furthest = max(3, 1+2) = 3. No improvement.",
              variables: { i: 1, "nums[i]": 2, "i+nums[i]": 3, furthest: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "queued", 3: "queued", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "furthest", index: 3, color: "active" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6],
              shortLabel: "i=2: furthest=max(3,3)=3",
              explanation: "At index 2 (value=1), furthest = max(3, 2+1) = 3. Still stuck at 3.",
              variables: { i: 2, "nums[i]": 1, "i+nums[i]": 3, furthest: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "queued", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "furthest", index: 3, color: "active" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 6],
              shortLabel: "i=3: furthest=max(3,3)=3",
              explanation: "At index 3 (value=0!), furthest = max(3, 3+0) = 3. The zero means no progress. We can't jump past index 3.",
              variables: { i: 3, "nums[i]": 0, "i+nums[i]": 3, furthest: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }, { name: "furthest", index: 3, color: "active" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5],
              shortLabel: "i=4 > furthest=3 → false",
              explanation: "i=4 > furthest=3. We've reached an index beyond our furthest reach — we're stuck! Return false. The 0 at index 3 created an impassable barrier.",
              variables: { i: 4, furthest: 3, answer: "false" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "eliminated", 4: "eliminated" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [3, 4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        let furthest = 0;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init furthest=0",
          explanation: "Set furthest reachable index to 0.",
          variables: { furthest: 0, i: "-" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          if (i > furthest) {
            steps.push({
              stepId: steps.length, lineNumbers: [4, 5],
              shortLabel: `i=${i} > furthest=${furthest} → false`,
              explanation: `i=${i} exceeds furthest reach ${furthest}. We're stuck. Return false.`,
              variables: { i, furthest, answer: "false" },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "eliminated" : "default"])),
                pointers: [{ name: "i", index: i, color: "pointer" }],
              },
              delta: { changedIndices: [i] }, isAnswer: true,
            });
            return steps;
          }

          furthest = Math.max(furthest, i + nums[i]);

          const states = Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : j <= furthest ? "queued" : "default"]));
          steps.push({
            stepId: steps.length, lineNumbers: [4, 5, 6],
            shortLabel: `i=${i}: furthest=${furthest}`,
            explanation: `At index ${i} (value=${nums[i]}), furthest = max(prev, ${i}+${nums[i]}) = ${furthest}.`,
            variables: { i, "nums[i]": nums[i], "i+nums[i]": i + nums[i], furthest },
            dataStructure: {
              arrayStates: states,
              pointers: [{ name: "i", index: i, color: "pointer" }, { name: "furthest", index: Math.min(furthest, n - 1), color: "active" }],
            },
            delta: { changedIndices: [i], movedPointers: ["i"] }, isAnswer: false,
          });

          if (furthest >= n - 1) {
            steps.push({
              stepId: steps.length, lineNumbers: [7],
              shortLabel: `furthest=${furthest} >= ${n - 1} → true`,
              explanation: `furthest (${furthest}) >= last index (${n - 1}). We can reach the end! Return true.`,
              variables: { furthest, "nums.length-1": n - 1, answer: "true" },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, j) => [j, "found"])),
                pointers: [],
              },
              delta: {}, isAnswer: true,
            });
            return steps;
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: "Return true",
          explanation: "Scanned all indices without getting stuck. Return true.",
          variables: { furthest, answer: "true" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, j) => [j, "found"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(2^n)", space: "O(n)", explanation: "Recursive backtracking with exponential branching" },
    optimal: { time: "O(n)",   space: "O(1)", explanation: "Single left-to-right pass tracking one variable", tradeoff: "No space needed — greedy is both time and space optimal" },
  },

  interviewTips: [
    "State the brute force (try all paths) and its exponential time, then pivot to greedy.",
    "Explain the invariant: 'furthest is the maximum index reachable from any index 0..i'.",
    "Handle edge case: single element array → always true.",
    "Clarify: nums[i] is max jump length, not exact jump length.",
    "Show early termination: return true as soon as furthest >= n-1.",
    "Mention that this is a reachability problem, not a shortest-path problem.",
  ],

  relatedProblems: ["jump-game-ii"],
};
