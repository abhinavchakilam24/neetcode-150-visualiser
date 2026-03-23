export const twoSum = {
  id: 1,
  slug: "two-sum",
  title: "Two Sum",
  difficulty: "Easy",
  topic: "arrays-hashing",
  topicLabel: "Arrays & Hashing",
  neetcodeNumber: 1,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Apple", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/two-sum/",

  pattern: "HashMap for O(1) Complement Lookup",
  patternExplanation: `When finding two elements satisfying a sum/difference condition,
    store seen values in a HashMap for O(1) lookup instead of nested loops.`,

  intuition: {
    coreInsight: `For any number X in the array, we only need to know if (target - X)
      has been seen before. A HashMap answers "does this value exist?" in O(1), turning
      an O(n²) pair-scan into a single O(n) pass. We ask: "Has what I need already walked
      past me?"`,

    mentalModel: `Imagine a party where you need to find someone whose height plus yours
      totals exactly 180cm. Instead of measuring everyone, you write your own height on a
      sticky note and post it on a board as you arrive. Each new guest checks the board
      first. The HashMap IS that board — it remembers everyone who came before you.`,

    whyNaiveFails: `Brute force tries every pair: for each of n elements, scan all
      subsequent n-1 elements. That's O(n²) — for n=10,000, that's 50 million operations.
      At n=100,000 it's 5 billion. The HashMap reduces this to exactly n operations.`,

    keyObservation: `Check for the complement BEFORE storing the current value. If we stored
      first, then for input [3,3] with target=6, we'd store 3→0, then immediately find 3
      in the map at index 1, returning [0,1] correctly — but the danger is: if we overwrote,
      we'd return [1,1], using the same element twice. Check first, store after.`,
  },

  problem: `Given an array of integers nums and an integer target, return indices of the
    two numbers such that they add up to target. You may assume each input has exactly one
    solution, and you may not use the same element twice. Return the answer in any order.`,

  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]",  explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
    { input: "nums = [3,2,4], target = 6",     output: "[1,2]",  explanation: "nums[1] + nums[2] = 2 + 4 = 6" },
    { input: "nums = [3,3], target = 6",       output: "[0,1]",  explanation: "nums[0] + nums[1] = 3 + 3 = 6" },
  ],

  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "Only one valid answer exists.",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: "Try every pair (i,j) with i<j. Return indices where sum equals target.",

      javaCode: `public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return new int[]{};
}`,

      cppCode: `vector<int> twoSum(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}`,

      pythonCode: `def twoSum(nums: List[int], target: int) -> List[int]:
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,

      lineAnnotations: {
        2: "Outer loop: fix first element",
        3: "Inner loop: try every subsequent element",
        4: "Check if this pair sums to target",
        5: "Found — return both indices",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [2, 7, 11, 15], target: 9 },
          expectedOutput: "[0, 1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "i=0",
              explanation: "Start with i=0. We'll try pairing nums[0]=2 with every element after it.",
              variables: { i: 0, j: "-", "nums[i]": 2, target: 9 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "j=1: 2+7=9 ✓",
              explanation: "j=1: nums[0]+nums[1] = 2+7 = 9 = target. Found immediately!",
              variables: { i: 0, j: 1, "nums[i]": 2, "nums[j]": 7, target: 9, sum: 9 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default" },
                pointers: [
                  { name: "i", index: 0, color: "pointer" },
                  { name: "j", index: 1, color: "active" },
                ],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "Return [0, 1]",
              explanation: "Match found. Return [0, 1]. Note: brute force got lucky — worst case scans the entire array.",
              variables: { i: 0, j: 1, answer: "[0, 1]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, target }) {
        const steps = [];
        const n = nums.length;
        const defaultStates = () => Object.fromEntries(nums.map((_, i) => [i, "default"]));

        for (let i = 0; i < n; i++) {
          steps.push({
            stepId: steps.length, lineNumbers: [2],
            shortLabel: `i=${i}`,
            explanation: `Fix i=${i} (value=${nums[i]}). Try pairing with every element after it.`,
            variables: { i, j: "-", "nums[i]": nums[i], target },
            dataStructure: {
              arrayStates: { ...defaultStates(), [i]: "active" },
              pointers: [{ name: "i", index: i, color: "pointer" }],
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });

          for (let j = i + 1; j < n; j++) {
            const sum = nums[i] + nums[j];
            if (sum === target) {
              steps.push({
                stepId: steps.length, lineNumbers: [3, 4],
                shortLabel: `j=${j}: ${nums[i]}+${nums[j]}=${sum} ✓`,
                explanation: `j=${j}: nums[${i}]+nums[${j}] = ${nums[i]}+${nums[j]} = ${sum} = target. Found!`,
                variables: { i, j, "nums[i]": nums[i], "nums[j]": nums[j], target, sum },
                dataStructure: {
                  arrayStates: { ...defaultStates(), [i]: "active", [j]: "active" },
                  pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
                },
                delta: { changedIndices: [j] }, isAnswer: false,
              });
              steps.push({
                stepId: steps.length, lineNumbers: [5],
                shortLabel: `Return [${i}, ${j}]`,
                explanation: `Match found. Return [${i}, ${j}].`,
                variables: { i, j, answer: `[${i}, ${j}]` },
                dataStructure: {
                  arrayStates: { ...defaultStates(), [i]: "found", [j]: "found" },
                  pointers: [],
                },
                delta: { changedIndices: [i, j] }, isAnswer: true,
              });
              return steps;
            }

            steps.push({
              stepId: steps.length, lineNumbers: [3, 4],
              shortLabel: `j=${j}: ${nums[i]}+${nums[j]}=${sum} ✗`,
              explanation: `j=${j}: nums[${i}]+nums[${j}] = ${nums[i]}+${nums[j]} = ${sum} ≠ ${target}. Not a match.`,
              variables: { i, j, "nums[i]": nums[i], "nums[j]": nums[j], target, sum },
              dataStructure: {
                arrayStates: { ...defaultStates(), [i]: "active", [j]: "eliminated" },
                pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
              },
              delta: { changedIndices: [j] }, isAnswer: false,
            });
          }
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "HashMap One Pass",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `For each nums[i], compute complement = target - nums[i].
        Check HashMap for complement. If found → return answer.
        Else store nums[i] → i and continue.`,

      javaCode: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];

        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }

        map.put(nums[i], i);
    }

    return new int[]{};
}`,

      cppCode: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;

    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];

        if (map.count(complement)) {
            return {map[complement], i};
        }

        map[nums[i]] = i;
    }

    return {};
}`,

      pythonCode: `def twoSum(nums: List[int], target: int) -> List[int]:
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:
            return [seen[complement], i]

        seen[num] = i

    return []`,

      lineAnnotations: {
        2:  "HashMap stores value → index for O(1) lookup",
        4:  "Single pass through the array",
        5:  "Compute what we NEED to have already seen",
        7:  "Has the complement appeared at any earlier index?",
        8:  "Yes! Return complement's index and current index",
        11: "No — store current value for future lookups",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Clean two-element answer found mid-scan",
          input: { nums: [2, 7, 11, 15], target: 9 },
          expectedOutput: "[0, 1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashMap",
              explanation: "Create an empty HashMap. It will store each value → index as we scan. This gives O(1) lookup.",
              variables: { i: "-", target: 9, map: "{}" },
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
              lineNumbers: [4, 5],
              shortLabel: "i=0: comp = 9-2 = 7",
              explanation: "At index 0, value=2. Complement = 9 - 2 = 7. We need 7 to have appeared somewhere before index 0.",
              variables: { i: 0, "nums[i]": 2, complement: 7, target: 9, map: "{}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7],
              shortLabel: "7 in map? NO",
              explanation: "map.containsKey(7) → false. Map is empty. No answer yet.",
              variables: { i: 0, "nums[i]": 2, complement: 7, target: 9, map: "{}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11],
              shortLabel: "Store 2 → 0",
              explanation: "7 wasn't in map. Store nums[0]=2 at index 0. Now if future elements need 2, we can answer in O(1).",
              variables: { i: 0, "nums[i]": 2, complement: 7, target: 9, map: "{2:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { 2: { value: 0, isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: 2, value: 0 }] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5],
              shortLabel: "i=1: comp = 9-7 = 2",
              explanation: "Move to index 1, value=7. Complement = 9 - 7 = 2. Has 2 appeared before?",
              variables: { i: 1, "nums[i]": 7, complement: 2, target: 9, map: "{2:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { 2: { value: 0, isNew: false } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8],
              shortLabel: "2 in map → YES! Return [0, 1]",
              explanation: "map.containsKey(2) → true! Complement 2 was stored at index 0. We're currently at index 1. Return [map.get(2), 1] = [0, 1]. Done in one pass!",
              variables: { i: 1, "nums[i]": 7, complement: 2, target: 9, answer: "[0, 1]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default" },
                pointers: [],
                hashMap: { 2: { value: 0, isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1], mapHighlighted: [2] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Duplicates",
          description: "Same value [3,3] — tests check-before-store ordering",
          input: { nums: [3, 3], target: 6 },
          expectedOutput: "[0, 1]",
          commonMistake: "If you store BEFORE checking: map[3]=0 gets stored, then when i=1 you check map[3] and find 0 — but you've already overwritten it to 1 in a naive implementation. Or worse, you return [0,0] if you check immediately after storing without advancing i.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashMap",
              explanation: "Empty HashMap. This duplicate case will test the ordering of our check vs store operations.",
              variables: { i: "-", target: 6, map: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 7],
              shortLabel: "i=0: comp=3, map empty → NO",
              explanation: "At index 0, value=3, complement=3. Check map: map is EMPTY. 3 is not stored yet. This is the critical moment — if we stored first, map would have 3→0, and we'd incorrectly return [0,0].",
              variables: { i: 0, "nums[i]": 3, complement: 3, target: 6, map: "{}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11],
              shortLabel: "Store 3 → 0",
              explanation: "Complement not found. Store 3 → 0. Now the map remembers that value 3 appeared at index 0.",
              variables: { i: 0, "nums[i]": 3, target: 6, map: "{3:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { 3: { value: 0, isNew: true } },
              },
              delta: { mapAdded: [{ key: 3, value: 0 }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 7, 8],
              shortLabel: "i=1: comp=3, map[3]=0 → Return [0,1]",
              explanation: "At index 1, value=3, complement=3. map.containsKey(3) → true! map.get(3)=0. Return [0, 1]. Two different indices, both value 3.",
              variables: { i: 1, "nums[i]": 3, complement: 3, target: 6, answer: "[0, 1]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: { 3: { value: 0, isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Answer at End",
          description: "Pair is the last two elements — must scan entire array",
          input: { nums: [1, 4, 6, 8], target: 14 },
          expectedOutput: "[2, 3]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashMap",
              explanation: "Start with empty HashMap. The answer is at the very end — we'll need to scan the whole array.",
              variables: { i: "-", target: 14, map: "{}" },
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
              lineNumbers: [4, 5, 7, 11],
              shortLabel: "i=0: comp=13, store 1→0",
              explanation: "At index 0, value=1. Complement=14-1=13. Not in map. Store 1→0.",
              variables: { i: 0, "nums[i]": 1, complement: 13, target: 14, map: "{1:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { 1: { value: 0, isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: 1, value: 0 }] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 7, 11],
              shortLabel: "i=1: comp=10, store 4→1",
              explanation: "At index 1, value=4. Complement=14-4=10. Not in map. Store 4→1.",
              variables: { i: 1, "nums[i]": 4, complement: 10, target: 14, map: "{1:0,4:1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { 1: { value: 0 }, 4: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [1], mapAdded: [{ key: 4, value: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 7, 11],
              shortLabel: "i=2: comp=8, store 6→2",
              explanation: "At index 2, value=6. Complement=14-6=8. Not in map. Store 6→2.",
              variables: { i: 2, "nums[i]": 6, complement: 8, target: 14, map: "{1:0,4:1,6:2}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { 1: { value: 0 }, 4: { value: 1 }, 6: { value: 2, isNew: true } },
              },
              delta: { changedIndices: [2], mapAdded: [{ key: 6, value: 2 }] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 7, 8],
              shortLabel: "i=3: comp=6, map[6]=2 → Return [2,3]",
              explanation: "At index 3, value=8. Complement=14-8=6. map.containsKey(6) → true! map.get(6)=2. Return [2, 3]. The answer was at the very end.",
              variables: { i: 3, "nums[i]": 8, complement: 6, target: 14, answer: "[2, 3]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "found", 3: "found" },
                pointers: [],
                hashMap: { 1: { value: 0 }, 4: { value: 1 }, 6: { value: 2, isHighlighted: true } },
              },
              delta: { changedIndices: [2, 3], mapHighlighted: [6] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, target }) {
        const steps = [];
        const map = {};

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init HashMap",
          explanation: "Create empty HashMap.",
          variables: { i: "-", target, map: "{}" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < nums.length; i++) {
          const complement = target - nums[i];

          steps.push({
            stepId: steps.length, lineNumbers: [4, 5],
            shortLabel: `i=${i}: comp=${complement}`,
            explanation: `At index ${i} (value=${nums[i]}), complement = ${target} - ${nums[i]} = ${complement}.`,
            variables: { i, "nums[i]": nums[i], complement, target, map: JSON.stringify(map) },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: Object.fromEntries(Object.entries(map).map(([k, v]) => [k, { value: v }])),
            },
            delta: { changedIndices: [i], movedPointers: ["i"] }, isAnswer: false,
          });

          if (map[complement] !== undefined) {
            steps.push({
              stepId: steps.length, lineNumbers: [7, 8],
              shortLabel: `Found! Return [${map[complement]}, ${i}]`,
              explanation: `map.containsKey(${complement}) → true at index ${map[complement]}. Return [${map[complement]}, ${i}].`,
              variables: { i, answer: `[${map[complement]}, ${i}]` },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, j) => [j, j === map[complement] || j === i ? "found" : "visited"])),
                pointers: [],
                hashMap: Object.fromEntries(Object.entries(map).map(([k, v]) => [k, { value: v, isHighlighted: String(k) == String(complement) }])),
              },
              delta: { changedIndices: [map[complement], i] }, isAnswer: true,
            });
            break;
          }

          map[nums[i]] = i;
          steps.push({
            stepId: steps.length, lineNumbers: [11],
            shortLabel: `Store ${nums[i]} → ${i}`,
            explanation: `Complement ${complement} not found. Store nums[${i}]=${nums[i]} → ${i} for future lookups.`,
            variables: { i, "nums[i]": nums[i], map: JSON.stringify(map) },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j <= i ? "visited" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: Object.fromEntries(Object.entries(map).map(([k, v]) => [k, { value: v, isNew: String(k) == String(nums[i]) }])),
            },
            delta: { changedIndices: [i], mapAdded: [{ key: nums[i], value: i }] }, isAnswer: false,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n²)", space: "O(1)",  explanation: "Two nested loops" },
    optimal: { time: "O(n)",  space: "O(n)",  explanation: "Single pass; HashMap stores up to n entries", tradeoff: "Trade O(n) space to gain O(n) time vs O(n²)" },
  },

  interviewTips: [
    "State brute force + complexity before jumping to optimal.",
    "Ask: 'Can there be duplicate values in nums?'",
    "Ask: 'Is it guaranteed exactly one solution exists?'",
    "Explicitly mention check-before-store ordering — shows depth.",
    "Articulate the space-time tradeoff: O(n) extra space buys us O(n) time.",
  ],

  relatedProblems: ["two-sum-ii", "3sum", "group-anagrams"],
};
