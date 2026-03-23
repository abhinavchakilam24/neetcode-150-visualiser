export const singleNumber = {
  id: 143,
  slug: "single-number",
  title: "Single Number",
  difficulty: "Easy",
  topic: "bit-manipulation",
  topicLabel: "Bit Manipulation",
  neetcodeNumber: 143,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Apple", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/single-number/",

  pattern: "XOR Cancellation",
  patternExplanation: `XOR of a number with itself is 0, and XOR of any number with 0 is itself.
    When every element appears exactly twice except one, XOR-ing all elements cancels out the pairs,
    leaving only the single number.`,

  intuition: {
    coreInsight: `XOR has two magical properties: a ^ a = 0 (any number XOR'd with itself vanishes)
      and a ^ 0 = a (XOR with zero is identity). If every number except one appears twice,
      XOR-ing the entire array causes every pair to cancel to 0, leaving only the lone survivor.
      It's like noise-canceling headphones for numbers.`,

    mentalModel: `Imagine a room where everyone has a twin. When twins meet, they both disappear.
      You send everyone into the room one at a time. At the end, the only person left standing
      has no twin — that's your single number. XOR is the "meeting and vanishing" operation.`,

    whyNaiveFails: `A HashMap approach works in O(n) time but uses O(n) space to count occurrences.
      Sorting works but takes O(n log n) time. XOR achieves O(n) time and O(1) space — the
      theoretical optimum for this problem. No extra data structure is needed at all.`,

    keyObservation: `XOR is commutative and associative — the order doesn't matter. Whether the
      array is [2,1,2] or [1,2,2], the result is the same: 2^1^2 = 1^(2^2) = 1^0 = 1.
      This means we don't need to sort or group — just XOR everything in one pass.`,
  },

  problem: `Given a non-empty array of integers nums, every element appears twice except for one.
    Find that single one. You must implement a solution with linear runtime complexity and use
    only constant extra space.`,

  examples: [
    { input: "nums = [2,2,1]", output: "1", explanation: "2 appears twice, 1 appears once." },
    { input: "nums = [4,1,2,1,2]", output: "4", explanation: "1 and 2 appear twice, 4 appears once." },
    { input: "nums = [1]", output: "1", explanation: "Only one element — it's the single number." },
  ],

  constraints: [
    "1 <= nums.length <= 3 * 10^4",
    "Each element appears twice except for one element which appears once.",
    "-3 * 10^4 <= nums[i] <= 3 * 10^4",
  ],

  approaches: {
    brute: {
      label: "HashMap Count",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "Count occurrences of each number in a HashMap. Return the one with count 1.",

      javaCode: `public int singleNumber(int[] nums) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int num : nums) {
        count.put(num, count.getOrDefault(num, 0) + 1);
    }
    for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
        if (entry.getValue() == 1) {
            return entry.getKey();
        }
    }
    return -1;
}`,

      cppCode: `int singleNumber(vector<int>& nums) {
    unordered_map<int, int> count;
    for (int num : nums) {
        count[num]++;
    }
    for (auto& [key, val] : count) {
        if (val == 1) return key;
    }
    return -1;
}`,

      pythonCode: `def singleNumber(nums: List[int]) -> int:
    count = {}
    for num in nums:
        count[num] = count.get(num, 0) + 1
    for key, val in count.items():
        if val == 1:
            return key
    return -1`,

      lineAnnotations: {
        2: "Create a HashMap to count occurrences",
        3: "Iterate through all numbers",
        4: "Increment count for each number",
        6: "Scan the map for the number with count 1",
        7: "Found the single number",
        8: "Return it",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [2, 2, 1] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashMap",
              explanation: "Create an empty HashMap to count how many times each number appears.",
              variables: { count: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "Count 2: 1",
              explanation: "First element is 2. Add to map: count[2] = 1.",
              variables: { num: 2, count: "{2:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { 2: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: 2, value: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4],
              shortLabel: "Count 2: 2",
              explanation: "Second element is 2. Increment: count[2] = 2.",
              variables: { num: 2, count: "{2:2}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { 2: { value: 2, isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4],
              shortLabel: "Count 1: 1",
              explanation: "Third element is 1. Add to map: count[1] = 1.",
              variables: { num: 1, count: "{2:2, 1:1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { 2: { value: 2 }, 1: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [2], mapAdded: [{ key: 1, value: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8],
              shortLabel: "Find count==1 → 1",
              explanation: "Scan the map: count[2]=2 (skip), count[1]=1 (found!). Return 1.",
              variables: { answer: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "found" },
                pointers: [],
                hashMap: { 2: { value: 2 }, 1: { value: 1, isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const count = {};

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init HashMap",
          explanation: "Create an empty HashMap to count occurrences.",
          variables: { count: "{}" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < nums.length; i++) {
          count[nums[i]] = (count[nums[i]] || 0) + 1;
          steps.push({
            stepId: steps.length, lineNumbers: [3, 4],
            shortLabel: `Count ${nums[i]}: ${count[nums[i]]}`,
            explanation: `Element at index ${i} is ${nums[i]}. count[${nums[i]}] = ${count[nums[i]]}.`,
            variables: { num: nums[i], count: JSON.stringify(count) },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: Object.fromEntries(Object.entries(count).map(([k, v]) => [k, { value: v, isNew: count[nums[i]] === 1 && String(k) === String(nums[i]) }])),
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        const single = Object.keys(count).find(k => count[k] === 1);
        const singleIdx = nums.indexOf(Number(single));
        steps.push({
          stepId: steps.length, lineNumbers: [6, 7, 8],
          shortLabel: `Find count==1 → ${single}`,
          explanation: `Scan the map for count == 1. Found ${single}. Return ${single}.`,
          variables: { answer: Number(single) },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, j) => [j, j === singleIdx ? "found" : "visited"])),
            pointers: [],
            hashMap: Object.fromEntries(Object.entries(count).map(([k, v]) => [k, { value: v, isHighlighted: v === 1 }])),
          },
          delta: { changedIndices: [singleIdx] }, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "XOR All Elements",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `XOR all elements together. Pairs cancel to 0 (a ^ a = 0), and 0 ^ single = single.
        One pass, no extra space.`,

      javaCode: `public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}`,

      cppCode: `int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}`,

      pythonCode: `def singleNumber(nums: List[int]) -> int:
    result = 0
    for num in nums:
        result ^= num
    return result`,

      lineAnnotations: {
        2: "Initialize result to 0 — XOR identity",
        3: "Iterate through every number",
        4: "XOR current number into result — pairs cancel",
        6: "Only the single number remains",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Simple array with one unpaired element",
          input: { nums: [2, 2, 1] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0",
              explanation: "Initialize result to 0. XOR with 0 is identity — so the first XOR just sets result to the first number.",
              variables: { result: 0, binary: "0000" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "0 ^ 2 = 2",
              explanation: "XOR result with nums[0]=2. result = 0 ^ 2 = 2. In binary: 0000 ^ 0010 = 0010.",
              variables: { num: 2, result: 2, "binary result": "0010", operation: "0000 ^ 0010 = 0010" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "result": { value: "2 (0010)", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4],
              shortLabel: "2 ^ 2 = 0",
              explanation: "XOR result with nums[1]=2. result = 2 ^ 2 = 0. The pair of 2s just cancelled each other out! In binary: 0010 ^ 0010 = 0000.",
              variables: { num: 2, result: 0, "binary result": "0000", operation: "0010 ^ 0010 = 0000" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "result": { value: "0 (0000)", isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4],
              shortLabel: "0 ^ 1 = 1",
              explanation: "XOR result with nums[2]=1. result = 0 ^ 1 = 1. The single number emerges! In binary: 0000 ^ 0001 = 0001.",
              variables: { num: 1, result: 1, "binary result": "0001", operation: "0000 ^ 0001 = 0001" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "result": { value: "1 (0001)", isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6],
              shortLabel: "Return 1",
              explanation: "All pairs have cancelled. result = 1 is the single number. O(n) time, O(1) space — no HashMap needed!",
              variables: { answer: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "found" },
                pointers: [],
                hashMap: { "result": { value: "1", isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Longer Array",
          description: "Multiple pairs with single element in the middle",
          input: { nums: [4, 1, 2, 1, 2] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0",
              explanation: "Initialize result to 0. We have 5 elements — two pairs and one single.",
              variables: { result: 0 },
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
              lineNumbers: [3, 4],
              shortLabel: "0 ^ 4 = 4",
              explanation: "XOR with 4: result = 0 ^ 4 = 4. Binary: 0000 ^ 0100 = 0100.",
              variables: { num: 4, result: 4, operation: "0 ^ 4 = 4" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "result": { value: "4 (0100)", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4],
              shortLabel: "4 ^ 1 = 5",
              explanation: "XOR with 1: result = 4 ^ 1 = 5. Binary: 0100 ^ 0001 = 0101. The bits are accumulating.",
              variables: { num: 1, result: 5, operation: "4 ^ 1 = 5" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "result": { value: "5 (0101)", isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4],
              shortLabel: "5 ^ 2 = 7",
              explanation: "XOR with 2: result = 5 ^ 2 = 7. Binary: 0101 ^ 0010 = 0111.",
              variables: { num: 2, result: 7, operation: "5 ^ 2 = 7" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "result": { value: "7 (0111)", isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 4],
              shortLabel: "7 ^ 1 = 6",
              explanation: "XOR with 1 again: result = 7 ^ 1 = 6. Binary: 0111 ^ 0001 = 0110. The pair of 1s has now cancelled out!",
              variables: { num: 1, result: 6, operation: "7 ^ 1 = 6" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "eliminated", 2: "visited", 3: "eliminated", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "result": { value: "6 (0110)", isHighlighted: true } },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [3, 4],
              shortLabel: "6 ^ 2 = 4",
              explanation: "XOR with 2 again: result = 6 ^ 2 = 4. Binary: 0110 ^ 0010 = 0100. The pair of 2s cancelled too — only 4 remains!",
              variables: { num: 2, result: 4, operation: "6 ^ 2 = 4" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                hashMap: { "result": { value: "4 (0100)", isHighlighted: true } },
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6],
              shortLabel: "Return 4",
              explanation: "All pairs cancelled. result = 4 is the single number. Notice: it didn't matter that 4 appeared first — XOR is order-independent.",
              variables: { answer: 4 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated" },
                pointers: [],
                hashMap: { "result": { value: "4", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Single Element",
          description: "Array with just one element",
          input: { nums: [1] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0",
              explanation: "Initialize result to 0. Only one element in the array — it must be the answer.",
              variables: { result: 0 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "0 ^ 1 = 1",
              explanation: "XOR with 1: result = 0 ^ 1 = 1. Only element, so it's trivially the single number.",
              variables: { num: 1, result: 1, operation: "0 ^ 1 = 1" },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "result": { value: "1", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6],
              shortLabel: "Return 1",
              explanation: "Return result = 1. With a single element, XOR simply produces that element.",
              variables: { answer: 1 },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                hashMap: { "result": { value: "1", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        let result = 0;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "result = 0",
          explanation: "Initialize result to 0. XOR with 0 is identity.",
          variables: { result: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        const seen = {};
        for (let i = 0; i < nums.length; i++) {
          const prev = result;
          result ^= nums[i];
          seen[nums[i]] = (seen[nums[i]] || 0) + 1;

          const states = {};
          for (let j = 0; j < nums.length; j++) {
            if (j < i) {
              states[j] = seen[nums[j]] === 2 ? "eliminated" : "visited";
            } else if (j === i) {
              states[j] = "active";
            } else {
              states[j] = "default";
            }
          }

          steps.push({
            stepId: steps.length, lineNumbers: [3, 4],
            shortLabel: `${prev} ^ ${nums[i]} = ${result}`,
            explanation: `XOR result with nums[${i}]=${nums[i]}. result = ${prev} ^ ${nums[i]} = ${result}.`,
            variables: { num: nums[i], result, operation: `${prev} ^ ${nums[i]} = ${result}` },
            dataStructure: {
              arrayStates: states,
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: { "result": { value: String(result), isHighlighted: true } },
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [6],
          shortLabel: `Return ${result}`,
          explanation: `All pairs cancelled. result = ${result} is the single number.`,
          variables: { answer: result },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, j) => [j, nums[j] === result ? "found" : "eliminated"])),
            pointers: [],
            hashMap: { "result": { value: String(result), isHighlighted: true } },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(n)", explanation: "HashMap stores up to n/2 entries" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass with one variable — XOR accumulator", tradeoff: "XOR eliminates the need for any extra data structure" },
  },

  interviewTips: [
    "Start by mentioning the HashMap approach as the straightforward O(n) solution.",
    "Then introduce XOR properties: a^a=0, a^0=a, commutativity, associativity.",
    "Clarify: this only works when exactly one element appears once and all others appear exactly twice.",
    "Walk through a small example showing bit-level XOR to demonstrate cancellation.",
    "Mention that this pattern extends: Single Number II (every element 3 times) needs a different bit trick.",
  ],

  relatedProblems: ["missing-number", "number-of-1-bits", "counting-bits"],
};
