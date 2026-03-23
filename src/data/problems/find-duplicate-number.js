export const findDuplicateNumber = {
  id: 42,
  slug: "find-duplicate-number",
  title: "Find the Duplicate Number",
  difficulty: "Medium",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 42,
  artifactType: "LinkedList",
  companies: ["Amazon", "Google", "Microsoft", "Bloomberg", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/find-the-duplicate-number/",

  pattern: "Floyd's Cycle Detection (Tortoise and Hare)",
  patternExplanation: `Treat the array as a linked list where index i points to nums[i].
    Since there's a duplicate, there must be a cycle. Use Floyd's algorithm to find the
    cycle entry point, which is the duplicate number.`,

  intuition: {
    coreInsight: `With n+1 numbers in the range [1,n], by pigeonhole principle there must be a
      duplicate. If we treat each value as a "next pointer" (index i → nums[i]), the duplicate
      creates a cycle because two indices point to the same value. Floyd's cycle detection
      finds the entry point of that cycle — which IS the duplicate number.`,

    mentalModel: `Imagine a treasure hunt where each clue card has a number telling you which
      card to visit next. If two different cards point to the same next card, following the
      chain will eventually loop. The duplicate is the card that two arrows point TO — it's
      the junction where the cycle begins.`,

    whyNaiveFails: `Sorting takes O(n log n) and modifies the array. Using a HashSet takes O(n)
      extra space. The constraint says: solve it in O(n) time, O(1) space, without modifying
      the array. Floyd's algorithm is the only approach that satisfies all constraints.`,

    keyObservation: `Phase 1: Move slow (one step) and fast (two steps) until they meet — this
      guarantees we're inside the cycle. Phase 2: Reset one pointer to start, then move both
      one step at a time — they meet at the cycle entry point, which is the duplicate.`,
  },

  problem: `Given an array of integers nums containing n + 1 integers where each integer is
    in the range [1, n] inclusive. There is only one repeated number in nums, return this
    repeated number. You must solve it without modifying the array and using only constant
    extra space.`,

  examples: [
    { input: "nums = [1,3,4,2,2]", output: "2", explanation: "2 is the repeated number." },
    { input: "nums = [3,1,3,4,2]", output: "3", explanation: "3 is the repeated number." },
  ],

  constraints: [
    "1 <= n <= 10^5",
    "nums.length == n + 1",
    "1 <= nums[i] <= n",
    "There is only one repeated number, but it could be repeated more than once.",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Sorting)",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      idea: "Sort the array, then scan for adjacent duplicates. (Note: modifies array)",

      javaCode: `public int findDuplicate(int[] nums) {
    Arrays.sort(nums);
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] == nums[i - 1]) {
            return nums[i];
        }
    }
    return -1;
}`,

      cppCode: `int findDuplicate(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] == nums[i - 1]) {
            return nums[i];
        }
    }
    return -1;
}`,

      pythonCode: `def findDuplicate(nums: List[int]) -> int:
    nums.sort()
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return nums[i]
    return -1`,

      lineAnnotations: {
        2: "Sort the array — O(n log n)",
        3: "Scan adjacent pairs",
        4: "Adjacent equal elements = duplicate found",
        5: "Return the duplicate",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [1, 3, 4, 2, 2] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort array",
              explanation: "Sort nums: [1,3,4,2,2] → [1,2,2,3,4].",
              variables: { nums: "[1, 2, 2, 3, 4]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "default" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 2, next: 3, state: "default" },
                  { id: 3, val: 3, next: 4, state: "default" },
                  { id: 4, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "i=1: nums[1]==nums[0]? 2!=1",
              explanation: "Compare nums[1]=2 with nums[0]=1. Not equal, continue.",
              variables: { i: 1, "nums[i]": 2, "nums[i-1]": 1 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 2, next: 3, state: "default" },
                  { id: 3, val: 3, next: 4, state: "default" },
                  { id: 4, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { i: 1 },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5],
              shortLabel: "i=2: nums[2]==nums[1]? 2==2 ✓",
              explanation: "Compare nums[2]=2 with nums[1]=2. Equal! Return 2.",
              variables: { i: 2, "nums[i]": 2, "nums[i-1]": 2, answer: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "found" },
                  { id: 2, val: 2, next: 3, state: "found" },
                  { id: 3, val: 3, next: 4, state: "default" },
                  { id: 4, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const sorted = [...nums].sort((a, b) => a - b);
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Sort array",
          explanation: `Sort: [${nums.join(",")}] → [${sorted.join(",")}].`,
          variables: { nums: JSON.stringify(sorted) },
          dataStructure: { nodes: sorted.map((v, i) => ({ id: i, val: v, next: i < sorted.length - 1 ? i + 1 : null, state: "default" })), pointerAssignments: {} },
          delta: {}, isAnswer: false,
        });
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i] === sorted[i - 1]) {
            steps.push({
              stepId: steps.length, lineNumbers: [3, 4, 5],
              shortLabel: `Found duplicate: ${sorted[i]}`,
              explanation: `nums[${i}]==${sorted[i]} equals nums[${i - 1}]. Duplicate is ${sorted[i]}.`,
              variables: { i, "nums[i]": sorted[i], answer: sorted[i] },
              dataStructure: { nodes: sorted.map((v, j) => ({ id: j, val: v, next: j < sorted.length - 1 ? j + 1 : null, state: j === i || j === i - 1 ? "found" : j < i ? "visited" : "default" })), pointerAssignments: {} },
              delta: {}, isAnswer: true,
            });
            return steps;
          }
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Floyd's Cycle Detection",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Treat array as linked list (i → nums[i]). Phase 1: slow and fast pointers meet
        inside the cycle. Phase 2: reset one to start, move both at speed 1 — they meet at
        the cycle entry point = duplicate number.`,

      javaCode: `public int findDuplicate(int[] nums) {
    int slow = nums[0];
    int fast = nums[0];

    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
}`,

      cppCode: `int findDuplicate(vector<int>& nums) {
    int slow = nums[0];
    int fast = nums[0];

    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
}`,

      pythonCode: `def findDuplicate(nums: List[int]) -> int:
    slow = nums[0]
    fast = nums[0]

    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break

    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]

    return slow`,

      lineAnnotations: {
        2: "Initialize slow pointer",
        3: "Initialize fast pointer",
        5: "Phase 1: detect cycle",
        6: "Slow moves one step: slow = nums[slow]",
        7: "Fast moves two steps: fast = nums[nums[fast]]",
        8: "Stop when they meet inside the cycle",
        10: "Phase 2: reset slow to start",
        11: "Move both at same speed until they meet",
        12: "Both advance one step",
        15: "Meeting point = cycle entry = duplicate number",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Array [1,3,4,2,2] — duplicate 2 creates cycle",
          input: { nums: [1, 3, 4, 2, 2] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: slow=fast=nums[0]=1",
              explanation: "Both pointers start at nums[0]=1. The linked list chain is: 0→1→3→2→4→2→4→... (cycle at 2).",
              variables: { slow: 1, fast: 1 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "default" },
                  { id: 1, val: 3, next: 3, state: "active" },
                  { id: 2, val: 4, next: 4, state: "default" },
                  { id: 3, val: 2, next: 2, state: "default" },
                  { id: 4, val: 2, next: 2, state: "default" },
                ],
                pointerAssignments: { slow: 1, fast: 1 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "Phase 1: slow→3, fast→2",
              explanation: "slow = nums[1] = 3. fast = nums[nums[1]] = nums[3] = 2. slow=3, fast=2. Not equal, continue.",
              variables: { slow: 3, fast: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 3, next: 3, state: "visited" },
                  { id: 2, val: 4, next: 4, state: "active" },
                  { id: 3, val: 2, next: 2, state: "active" },
                  { id: 4, val: 2, next: 2, state: "default" },
                ],
                pointerAssignments: { slow: 3, fast: 2 },
              },
              delta: { movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7],
              shortLabel: "Phase 1: slow→2, fast→2",
              explanation: "slow = nums[3] = 2. fast = nums[nums[2]] = nums[4] = 2. slow=2, fast=2. They meet at 2!",
              variables: { slow: 2, fast: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 3, next: 3, state: "visited" },
                  { id: 2, val: 4, next: 4, state: "found" },
                  { id: 3, val: 2, next: 2, state: "visited" },
                  { id: 4, val: 2, next: 2, state: "visited" },
                ],
                pointerAssignments: { slow: 2, fast: 2 },
              },
              delta: { movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10],
              shortLabel: "Phase 2: reset slow=nums[0]=1",
              explanation: "They met at position 2 (inside the cycle). Now reset slow to nums[0]=1. Keep fast at 2.",
              variables: { slow: 1, fast: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 3, next: 3, state: "active" },
                  { id: 2, val: 4, next: 4, state: "active" },
                  { id: 3, val: 2, next: 2, state: "visited" },
                  { id: 4, val: 2, next: 2, state: "visited" },
                ],
                pointerAssignments: { slow: 1, fast: 2 },
              },
              delta: { movedPointers: ["slow"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12, 13],
              shortLabel: "Phase 2: slow→3, fast→4",
              explanation: "slow = nums[1] = 3. fast = nums[2] = 4. slow=3, fast=4. Not equal yet.",
              variables: { slow: 3, fast: 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 3, next: 3, state: "visited" },
                  { id: 2, val: 4, next: 4, state: "visited" },
                  { id: 3, val: 2, next: 2, state: "active" },
                  { id: 4, val: 2, next: 2, state: "active" },
                ],
                pointerAssignments: { slow: 3, fast: 4 },
              },
              delta: { movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 12, 13, 15],
              shortLabel: "Phase 2: slow→2, fast→2. Found: 2",
              explanation: "slow = nums[3] = 2. fast = nums[4] = 2. They meet at 2! The duplicate number is 2.",
              variables: { slow: 2, fast: 2, answer: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 3, next: 3, state: "visited" },
                  { id: 2, val: 4, next: 4, state: "found" },
                  { id: 3, val: 2, next: 2, state: "visited" },
                  { id: 4, val: 2, next: 2, state: "visited" },
                ],
                pointerAssignments: { slow: 2, fast: 2 },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Duplicate at Start",
          description: "Duplicate is the first value — [3,1,3,4,2]",
          input: { nums: [3, 1, 3, 4, 2] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: slow=fast=nums[0]=3",
              explanation: "Both start at nums[0]=3. Chain: 0→3→4→2→3→4→... (cycle entry at 3).",
              variables: { slow: 3, fast: 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 3, state: "default" },
                  { id: 1, val: 1, next: 1, state: "default" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "active" },
                  { id: 4, val: 2, next: 2, state: "default" },
                ],
                pointerAssignments: { slow: 3, fast: 3 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "slow→4, fast→3",
              explanation: "slow = nums[3]=4. fast = nums[nums[3]]=nums[4]=2, then... wait, fast moves two: fast = nums[nums[3]] = nums[4] = 2. slow=4, fast=2.",
              variables: { slow: 4, fast: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 3, state: "visited" },
                  { id: 1, val: 1, next: 1, state: "default" },
                  { id: 2, val: 3, next: 3, state: "active" },
                  { id: 3, val: 4, next: 4, state: "visited" },
                  { id: 4, val: 2, next: 2, state: "active" },
                ],
                pointerAssignments: { slow: 4, fast: 2 },
              },
              delta: { movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7],
              shortLabel: "slow→2, fast→4",
              explanation: "slow = nums[4]=2. fast = nums[nums[2]]=nums[3]=4. slow=2, fast=4.",
              variables: { slow: 2, fast: 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 3, state: "visited" },
                  { id: 1, val: 1, next: 1, state: "default" },
                  { id: 2, val: 3, next: 3, state: "active" },
                  { id: 3, val: 4, next: 4, state: "visited" },
                  { id: 4, val: 2, next: 2, state: "active" },
                ],
                pointerAssignments: { slow: 2, fast: 4 },
              },
              delta: { movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "slow→3, fast→3. Meet!",
              explanation: "slow = nums[2]=3. fast = nums[nums[4]]=nums[2]=3. They meet at 3!",
              variables: { slow: 3, fast: 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 3, state: "visited" },
                  { id: 1, val: 1, next: 1, state: "default" },
                  { id: 2, val: 3, next: 3, state: "visited" },
                  { id: 3, val: 4, next: 4, state: "found" },
                  { id: 4, val: 2, next: 2, state: "visited" },
                ],
                pointerAssignments: { slow: 3, fast: 3 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10, 11, 12, 13, 15],
              shortLabel: "Phase 2: both meet at 3. Answer: 3",
              explanation: "Reset slow=nums[0]=3. slow=3, fast=3 — already equal! The duplicate is 3.",
              variables: { slow: 3, fast: 3, answer: 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 3, state: "visited" },
                  { id: 1, val: 1, next: 1, state: "default" },
                  { id: 2, val: 3, next: 3, state: "visited" },
                  { id: 3, val: 4, next: 4, state: "found" },
                  { id: 4, val: 2, next: 2, state: "visited" },
                ],
                pointerAssignments: { slow: 3, fast: 3 },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        let slow = nums[0], fast = nums[0];

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `Init: slow=fast=${slow}`,
          explanation: `Both pointers start at nums[0]=${slow}.`,
          variables: { slow, fast },
          dataStructure: {
            nodes: nums.map((v, i) => ({ id: i, val: v, next: v < nums.length ? v : null, state: i === slow ? "active" : "default" })),
            pointerAssignments: { slow, fast },
          },
          delta: {}, isAnswer: false,
        });

        do {
          slow = nums[slow];
          fast = nums[nums[fast]];
          steps.push({
            stepId: steps.length, lineNumbers: [5, 6, 7],
            shortLabel: `slow→${slow}, fast→${fast}`,
            explanation: `Phase 1: slow=${slow}, fast=${fast}. ${slow === fast ? "They meet!" : "Not equal, continue."}`,
            variables: { slow, fast },
            dataStructure: {
              nodes: nums.map((v, i) => ({ id: i, val: v, next: v < nums.length ? v : null, state: i === slow || i === fast ? "active" : "default" })),
              pointerAssignments: { slow, fast },
            },
            delta: { movedPointers: ["slow", "fast"] }, isAnswer: false,
          });
        } while (slow !== fast);

        slow = nums[0];
        while (slow !== fast) {
          slow = nums[slow];
          fast = nums[fast];
          steps.push({
            stepId: steps.length, lineNumbers: [11, 12, 13],
            shortLabel: `Phase 2: slow→${slow}, fast→${fast}`,
            explanation: `Phase 2: slow=${slow}, fast=${fast}. ${slow === fast ? "They meet — duplicate found!" : "Not equal, continue."}`,
            variables: { slow, fast },
            dataStructure: {
              nodes: nums.map((v, i) => ({ id: i, val: v, next: v < nums.length ? v : null, state: i === slow && slow === fast ? "found" : i === slow || i === fast ? "active" : "default" })),
              pointerAssignments: { slow, fast },
            },
            delta: { movedPointers: ["slow", "fast"] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [15],
          shortLabel: `Duplicate = ${slow}`,
          explanation: `Both pointers meet at ${slow}. The duplicate number is ${slow}.`,
          variables: { answer: slow },
          dataStructure: {
            nodes: nums.map((v, i) => ({ id: i, val: v, next: v < nums.length ? v : null, state: i === slow ? "found" : "default" })),
            pointerAssignments: { slow, fast },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n log n)", space: "O(1)", explanation: "Sorting then linear scan" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Floyd's cycle detection — each pointer traverses at most 2n steps", tradeoff: "Achieves both O(n) time and O(1) space without modifying the array" },
  },

  interviewTips: [
    "Explain why the array can be treated as a linked list: index i → nums[i].",
    "Clarify why a cycle must exist: n+1 values in range [1,n] means pigeonhole.",
    "Walk through both phases of Floyd's algorithm carefully.",
    "Mention that this doesn't modify the array and uses O(1) space.",
    "Compare with HashSet approach: O(n) time but O(n) space.",
  ],

  relatedProblems: ["linked-list-cycle", "happy-number", "missing-number"],
};
