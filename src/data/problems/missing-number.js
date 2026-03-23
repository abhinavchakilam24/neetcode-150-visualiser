export const missingNumber = {
  id: 147,
  slug: "missing-number",
  title: "Missing Number",
  difficulty: "Easy",
  topic: "bit-manipulation",
  topicLabel: "Bit Manipulation",
  neetcodeNumber: 147,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Microsoft", "Apple", "Meta", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/missing-number/",

  pattern: "XOR Cancellation / Gauss Sum",
  patternExplanation: `XOR every index 0..n with every value in the array. Since XOR cancels duplicates
    (a ^ a = 0), the unpaired number — the missing one — survives. Alternatively, use Gauss's formula
    n*(n+1)/2 to compute the expected sum and subtract the actual sum.`,

  intuition: {
    coreInsight: `The array contains n numbers from the range [0, n], so exactly one number is missing.
      If we XOR all indices 0 through n with all array values, every number that's present appears
      twice (once as an index, once as a value) and cancels to 0. The missing number appears only
      once (as an index) and survives. This gives us O(n) time and O(1) space.`,

    mentalModel: `Imagine a classroom roster of students numbered 0 through n. You call roll and each
      student present says their number. To find who's absent, XOR every expected number (0..n) with
      every number called out. The pairs cancel, and the absent student's number is what remains —
      like a mathematical roll call where noise-canceling reveals the missing voice.`,

    whyNaiveFails: `A HashSet approach uses O(n) space to store all values, then checks which number
      in [0,n] is missing. Sorting takes O(n log n). Both work but are suboptimal. XOR achieves
      O(n) time with O(1) space — no data structure needed beyond a single integer accumulator.`,

    keyObservation: `The trick is that we have indices 0 to n-1 and values from {0, 1, ..., n}.
      By XOR-ing all indices AND all values AND the extra value n, every present number appears
      exactly twice (cancels) and the missing number appears exactly once (survives). The Gauss
      sum approach is equally valid: missing = n*(n+1)/2 - sum(nums).`,
  },

  problem: `Given an array nums containing n distinct numbers in the range [0, n], return the
    only number in the range that is missing from the array.`,

  examples: [
    { input: "nums = [3,0,1]", output: "2", explanation: "n=3, range is [0,3]. 2 is missing." },
    { input: "nums = [0,1]", output: "2", explanation: "n=2, range is [0,2]. 2 is missing." },
    { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8", explanation: "n=9, range is [0,9]. 8 is missing." },
  ],

  constraints: [
    "n == nums.length",
    "1 <= n <= 10^4",
    "0 <= nums[i] <= n",
    "All the numbers of nums are unique.",
  ],

  approaches: {
    brute: {
      label: "HashSet Lookup",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "Store all values in a HashSet. Check each number 0 to n — the one not in the set is missing.",

      javaCode: `public int missingNumber(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int num : nums) {
        set.add(num);
    }
    for (int i = 0; i <= nums.length; i++) {
        if (!set.contains(i)) {
            return i;
        }
    }
    return -1;
}`,

      cppCode: `int missingNumber(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    for (int i = 0; i <= nums.size(); i++) {
        if (s.find(i) == s.end()) {
            return i;
        }
    }
    return -1;
}`,

      pythonCode: `def missingNumber(nums: List[int]) -> int:
    num_set = set(nums)
    for i in range(len(nums) + 1):
        if i not in num_set:
            return i
    return -1`,

      lineAnnotations: {
        2: "Create a HashSet for O(1) lookups",
        3: "Add all array values to the set",
        4: "Store each number",
        6: "Check every number 0 to n",
        7: "Is this number missing from the set?",
        8: "Found the missing number — return it",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [3, 0, 1] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashSet",
              explanation: "Create empty HashSet. We'll add all values from the array.",
              variables: { n: 3, set: "{}" },
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
              shortLabel: "Add 3, 0, 1",
              explanation: "Add all values to the set: {3, 0, 1}.",
              variables: { set: "{0, 1, 3}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [],
                hashMap: { 0: { value: "present", isNew: true }, 1: { value: "present", isNew: true }, 3: { value: "present", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7],
              shortLabel: "Check 0: in set",
              explanation: "i=0: set.contains(0) → true. Not missing.",
              variables: { i: 0, "in set": true },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [],
                hashMap: { 0: { value: "present", isHighlighted: true }, 1: { value: "present" }, 3: { value: "present" } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7],
              shortLabel: "Check 1: in set",
              explanation: "i=1: set.contains(1) → true. Not missing.",
              variables: { i: 1, "in set": true },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [],
                hashMap: { 0: { value: "present" }, 1: { value: "present", isHighlighted: true }, 3: { value: "present" } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8],
              shortLabel: "Check 2: NOT in set!",
              explanation: "i=2: set.contains(2) → false! 2 is the missing number. Return 2.",
              variables: { i: 2, "in set": false, answer: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [],
                hashMap: { 0: { value: "present" }, 1: { value: "present" }, 2: { value: "MISSING", isHighlighted: true }, 3: { value: "present" } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        const numSet = new Set(nums);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init HashSet",
          explanation: "Create empty HashSet.",
          variables: { n },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        const mapEntries = {};
        nums.forEach(v => { mapEntries[v] = { value: "present", isNew: true }; });
        steps.push({
          stepId: 1, lineNumbers: [3, 4],
          shortLabel: `Add all values`,
          explanation: `Add all values to the set: {${[...numSet].sort((a,b)=>a-b).join(', ')}}.`,
          variables: { set: `{${[...numSet].sort((a,b)=>a-b).join(', ')}}` },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
            hashMap: { ...mapEntries },
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i <= n; i++) {
          if (!numSet.has(i)) {
            steps.push({
              stepId: steps.length, lineNumbers: [6, 7, 8],
              shortLabel: `Check ${i}: NOT in set!`,
              explanation: `i=${i}: set.contains(${i}) → false! ${i} is the missing number.`,
              variables: { i, "in set": false, answer: i },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, j) => [j, "visited"])),
                pointers: [],
                hashMap: { ...Object.fromEntries([...numSet].map(v => [v, { value: "present" }])), [i]: { value: "MISSING", isHighlighted: true } },
              },
              delta: {}, isAnswer: true,
            });
            break;
          } else {
            steps.push({
              stepId: steps.length, lineNumbers: [6, 7],
              shortLabel: `Check ${i}: in set`,
              explanation: `i=${i}: set.contains(${i}) → true. Not missing.`,
              variables: { i, "in set": true },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, j) => [j, "visited"])),
                pointers: [],
                hashMap: { ...Object.fromEntries([...numSet].map(v => [v, { value: "present", isHighlighted: v === i }])) },
              },
              delta: {}, isAnswer: false,
            });
          }
        }

        return steps;
      },
    },

    better: {
      label: "Gauss Sum",
      tier: "better",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "Compute expected sum n*(n+1)/2 and subtract actual sum. The difference is the missing number.",

      javaCode: `public int missingNumber(int[] nums) {
    int n = nums.length;
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int num : nums) {
        actualSum += num;
    }
    return expectedSum - actualSum;
}`,

      cppCode: `int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int num : nums) {
        actualSum += num;
    }
    return expectedSum - actualSum;
}`,

      pythonCode: `def missingNumber(nums: List[int]) -> int:
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum`,

      lineAnnotations: {
        2: "n is the length of the array",
        3: "Gauss's formula: sum of 0 to n = n*(n+1)/2",
        4: "Initialize actual sum counter",
        5: "Sum all values in the array",
        6: "Add each number to actual sum",
        8: "Difference = missing number",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [3, 0, 1] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "expectedSum = 6",
              explanation: "n=3. Expected sum = 3 * 4 / 2 = 6. If no number were missing, 0+1+2+3 = 6.",
              variables: { n: 3, expectedSum: 6 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: { "expected": { value: "6", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: "actualSum = 4",
              explanation: "Sum all array values: 3 + 0 + 1 = 4.",
              variables: { actualSum: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [],
                hashMap: { "expected": { value: "6" }, "actual": { value: "4", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8],
              shortLabel: "6 - 4 = 2",
              explanation: "Missing = expectedSum - actualSum = 6 - 4 = 2. The gap in the sum reveals the missing number.",
              variables: { expectedSum: 6, actualSum: 4, answer: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [],
                hashMap: { "expected": { value: "6" }, "actual": { value: "4" }, "missing": { value: "2", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        const expectedSum = n * (n + 1) / 2;
        const actualSum = nums.reduce((a, b) => a + b, 0);
        const missing = expectedSum - actualSum;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `expectedSum = ${expectedSum}`,
          explanation: `n=${n}. Expected sum = ${n} * ${n + 1} / 2 = ${expectedSum}.`,
          variables: { n, expectedSum },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [], hashMap: { "expected": { value: String(expectedSum), isNew: true } },
          },
          delta: {}, isAnswer: false,
        });

        steps.push({
          stepId: 1, lineNumbers: [4, 5, 6],
          shortLabel: `actualSum = ${actualSum}`,
          explanation: `Sum all array values: ${nums.join(' + ')} = ${actualSum}.`,
          variables: { actualSum },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [], hashMap: { "expected": { value: String(expectedSum) }, "actual": { value: String(actualSum), isNew: true } },
          },
          delta: {}, isAnswer: false,
        });

        steps.push({
          stepId: 2, lineNumbers: [8],
          shortLabel: `${expectedSum} - ${actualSum} = ${missing}`,
          explanation: `Missing = ${expectedSum} - ${actualSum} = ${missing}.`,
          variables: { expectedSum, actualSum, answer: missing },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [], hashMap: { "expected": { value: String(expectedSum) }, "actual": { value: String(actualSum) }, "missing": { value: String(missing), isHighlighted: true } },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    optimal: {
      label: "XOR Cancellation",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `XOR all indices 0..n with all array values. Every present number appears twice
        (once as index, once as value) and cancels. The missing number appears only once and survives.`,

      javaCode: `public int missingNumber(int[] nums) {
    int xor = 0;
    for (int i = 0; i < nums.length; i++) {
        xor ^= i ^ nums[i];
    }
    xor ^= nums.length;
    return xor;
}`,

      cppCode: `int missingNumber(vector<int>& nums) {
    int xorVal = 0;
    for (int i = 0; i < nums.size(); i++) {
        xorVal ^= i ^ nums[i];
    }
    xorVal ^= nums.size();
    return xorVal;
}`,

      pythonCode: `def missingNumber(nums: List[int]) -> int:
    xor = 0
    for i in range(len(nums)):
        xor ^= i ^ nums[i]
    xor ^= len(nums)
    return xor`,

      lineAnnotations: {
        2: "Initialize XOR accumulator to 0",
        3: "Iterate through all indices",
        4: "XOR in both the index and the value — pairs will cancel",
        6: "XOR in the final index n (which has no corresponding value)",
        7: "Only the missing number survives — return it",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "nums = [3,0,1] — missing 2",
          input: { nums: [3, 0, 1] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "xor = 0",
              explanation: "Initialize XOR accumulator to 0. We'll XOR every index with every value. Present numbers appear twice (cancel), missing appears once (survives).",
              variables: { xor: 0, n: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: { "xor": { value: "0", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "i=0: 0^0^3 = 3",
              explanation: "i=0, nums[0]=3. xor = 0 ^ 0 ^ 3 = 3. We've introduced index 0 and value 3 into the accumulator.",
              variables: { i: 0, "nums[i]": 3, xor: 3, operation: "0 ^ 0 ^ 3 = 3" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "xor": { value: "3 (011)", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4],
              shortLabel: "i=1: 3^1^0 = 2",
              explanation: "i=1, nums[1]=0. xor = 3 ^ 1 ^ 0 = 2. Index 0 appeared as both index and value — it's cancelling.",
              variables: { i: 1, "nums[i]": 0, xor: 2, operation: "3 ^ 1 ^ 0 = 2" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "xor": { value: "2 (010)", isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4],
              shortLabel: "i=2: 2^2^1 = 1",
              explanation: "i=2, nums[2]=1. xor = 2 ^ 2 ^ 1 = 1. Index 2 and value 2 just cancelled! The XOR accumulator is narrowing in.",
              variables: { i: 2, "nums[i]": 1, xor: 1, operation: "2 ^ 2 ^ 1 = 1" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "xor": { value: "1 (001)", isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6],
              shortLabel: "xor ^= 3 → 2",
              explanation: "XOR in n=3 (the final index with no corresponding array value). xor = 1 ^ 3 = 2. Now 3 appeared as both index 3 and value 3 (in nums[0]) — cancelled! Only 2 remains.",
              variables: { "n": 3, xor: 2, operation: "1 ^ 3 = 2" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [],
                hashMap: { "xor": { value: "2 — the missing number!", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7],
              shortLabel: "Return 2",
              explanation: "All pairs cancelled. xor = 2 is the only number that appeared an odd number of times — it's the missing number.",
              variables: { answer: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { "missing": { value: "2", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Missing 0",
          description: "The missing number is 0 — tests that zero is handled correctly",
          input: { nums: [1] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "xor = 0",
              explanation: "n=1. Array has one element. Range is [0,1]. One of them is missing.",
              variables: { xor: 0, n: 1 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                hashMap: { "xor": { value: "0", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "i=0: 0^0^1 = 1",
              explanation: "i=0, nums[0]=1. xor = 0 ^ 0 ^ 1 = 1.",
              variables: { i: 0, "nums[i]": 1, xor: 1 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "xor": { value: "1", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6],
              shortLabel: "xor ^= 1 → 0",
              explanation: "XOR in n=1. xor = 1 ^ 1 = 0. Value 1 appeared as both nums[0] and index n=1 — cancelled. Only 0 remains.",
              variables: { n: 1, xor: 0 },
              dataStructure: {
                arrayStates: { 0: "visited" },
                pointers: [],
                hashMap: { "xor": { value: "0 — the missing number!", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7],
              shortLabel: "Return 0",
              explanation: "The missing number is 0. XOR correctly identified it even though 0 is the XOR identity — the cancellation logic still works perfectly.",
              variables: { answer: 0 },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                hashMap: { "missing": { value: "0", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Missing n",
          description: "The last number n is missing — tests the final XOR step",
          input: { nums: [0, 1] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "xor = 0",
              explanation: "n=2. Array has [0,1]. Range is [0,2]. Missing number should be 2.",
              variables: { xor: 0, n: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                hashMap: { "xor": { value: "0", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "i=0: 0^0^0 = 0",
              explanation: "i=0, nums[0]=0. xor = 0 ^ 0 ^ 0 = 0. Index 0 and value 0 both entered — they cancel immediately.",
              variables: { i: 0, "nums[i]": 0, xor: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "xor": { value: "0", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4],
              shortLabel: "i=1: 0^1^1 = 0",
              explanation: "i=1, nums[1]=1. xor = 0 ^ 1 ^ 1 = 0. Index 1 and value 1 cancel.",
              variables: { i: 1, "nums[i]": 1, xor: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "xor": { value: "0", isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6],
              shortLabel: "xor ^= 2 → 2",
              explanation: "XOR in n=2. xor = 0 ^ 2 = 2. This index has no matching value in the array — 2 is the missing number!",
              variables: { n: 2, xor: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited" },
                pointers: [],
                hashMap: { "xor": { value: "2 — the missing number!", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7],
              shortLabel: "Return 2",
              explanation: "Missing number is 2 — it only appeared as an index, never as a value. XOR revealed it.",
              variables: { answer: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: { "missing": { value: "2", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        let xor = 0;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "xor = 0",
          explanation: `Initialize XOR accumulator. n=${n}, range is [0,${n}].`,
          variables: { xor: 0, n },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [], hashMap: { "xor": { value: "0", isNew: true } },
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const prev = xor;
          xor = prev ^ i ^ nums[i];
          steps.push({
            stepId: steps.length, lineNumbers: [3, 4],
            shortLabel: `i=${i}: ${prev}^${i}^${nums[i]} = ${xor}`,
            explanation: `i=${i}, nums[${i}]=${nums[i]}. xor = ${prev} ^ ${i} ^ ${nums[i]} = ${xor}.`,
            variables: { i, "nums[i]": nums[i], xor, operation: `${prev} ^ ${i} ^ ${nums[i]} = ${xor}` },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: { "xor": { value: String(xor), isHighlighted: true } },
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        const prevXor = xor;
        xor ^= n;
        steps.push({
          stepId: steps.length, lineNumbers: [6],
          shortLabel: `xor ^= ${n} → ${xor}`,
          explanation: `XOR in n=${n}. xor = ${prevXor} ^ ${n} = ${xor}.`,
          variables: { n, xor },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
            hashMap: { "xor": { value: `${xor} — the missing number!`, isHighlighted: true } },
          },
          delta: {}, isAnswer: false,
        });

        steps.push({
          stepId: steps.length, lineNumbers: [7],
          shortLabel: `Return ${xor}`,
          explanation: `All pairs cancelled. The missing number is ${xor}.`,
          variables: { answer: xor },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "found"])),
            pointers: [],
            hashMap: { "missing": { value: String(xor), isHighlighted: true } },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(n)", explanation: "HashSet stores all n values for lookup" },
    better:  { time: "O(n)", space: "O(1)", explanation: "Gauss sum — single pass, one variable" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "XOR — single pass, one variable, no overflow risk", tradeoff: "XOR avoids the integer overflow risk of the sum approach for very large n" },
  },

  interviewTips: [
    "Mention three approaches: HashSet O(n)/O(n), Sum O(n)/O(1), XOR O(n)/O(1).",
    "Explain why XOR is preferred over sum: no risk of integer overflow with very large values.",
    "Walk through the pairing logic: index i pairs with value i for all present numbers.",
    "Note that the Gauss sum approach can overflow for 64-bit ranges in some languages.",
    "Ask clarifying questions: is the array guaranteed to have exactly one missing number?",
  ],

  relatedProblems: ["single-number", "counting-bits", "number-of-1-bits"],
};
