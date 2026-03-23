export const maximumSubarray = {
  id: 121,
  slug: "maximum-subarray",
  title: "Maximum Subarray",
  difficulty: "Medium",
  topic: "greedy",
  topicLabel: "Greedy",
  neetcodeNumber: 121,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Microsoft", "Google", "Apple", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/maximum-subarray/",

  pattern: "Kadane's Algorithm (Running Maximum Subarray Sum)",
  patternExplanation: `Track the maximum sum ending at each position. If the running sum drops below zero, reset it — a negative prefix can never help a future subarray. The global maximum across all positions is the answer.`,

  intuition: {
    coreInsight: `At every index, you face a simple choice: should the current element extend the existing subarray, or start a brand new one? If the running sum so far is negative, it would only drag down anything we append to it — so we discard it and start fresh from the current element. The maximum we've ever seen across all these decisions is our answer.`,

    mentalModel: `Imagine you're walking along a number line collecting coins (positive numbers) and paying tolls (negative numbers). You carry a running total in your pocket. If your pocket goes negative, you're better off emptying it and starting fresh from the next position — no point carrying debt forward. The highest your pocket ever reached is the answer.`,

    whyNaiveFails: `Brute force checks every possible subarray: for each of n starting points, try every ending point, summing elements in between. That's O(n^2) subarrays (or O(n^3) with naive summing). For n=100,000, that's up to 10^10 operations — far too slow. Kadane's does it in a single pass.`,

    keyObservation: `The key insight is: maxEndingHere = max(nums[i], maxEndingHere + nums[i]). If maxEndingHere + nums[i] < nums[i], that means maxEndingHere was negative — so we restart. This single comparison per element gives us O(n) time.`,
  },

  problem: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,

  examples: [
    { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
    { input: "nums = [1]", output: "1", explanation: "The subarray [1] has the largest sum 1." },
    { input: "nums = [5,4,-1,7,8]", output: "23", explanation: "The subarray [5,4,-1,7,8] has the largest sum 23." },
  ],

  constraints: [
    "1 <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: "Try every subarray [i..j], compute its sum, and track the maximum.",

      javaCode: `public int maxSubArray(int[] nums) {
    int maxSum = Integer.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
        int currentSum = 0;
        for (int j = i; j < nums.length; j++) {
            currentSum += nums[j];
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    return maxSum;
}`,

      cppCode: `int maxSubArray(vector<int>& nums) {
    int maxSum = INT_MIN;
    for (int i = 0; i < nums.size(); i++) {
        int currentSum = 0;
        for (int j = i; j < nums.size(); j++) {
            currentSum += nums[j];
            maxSum = max(maxSum, currentSum);
        }
    }
    return maxSum;
}`,

      pythonCode: `def maxSubArray(nums: List[int]) -> int:
    max_sum = float('-inf')
    for i in range(len(nums)):
        current_sum = 0
        for j in range(i, len(nums)):
            current_sum += nums[j]
            max_sum = max(max_sum, current_sum)
    return max_sum`,

      lineAnnotations: {
        2: "Initialize maxSum to smallest possible value",
        3: "Outer loop: fix starting index of subarray",
        4: "Running sum for the current subarray starting at i",
        5: "Inner loop: extend subarray one element at a time",
        6: "Add next element to running sum",
        7: "Update global max if current subarray is better",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init maxSum = -∞",
              explanation: "Initialize maxSum to negative infinity. We'll check every possible subarray and track the best sum.",
              variables: { maxSum: "-∞", i: "-", j: "-", currentSum: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 6, 7],
              shortLabel: "i=0: best subarray sum = 1",
              explanation: "Starting at index 0, we try all subarrays: [-2]=-2, [-2,1]=-1, [-2,1,-3]=-4, [-2,1,-3,4]=0, [-2,1,-3,4,-1]=-1, [-2,1,-3,4,-1,2]=1, etc. Best from i=0 is 1. maxSum=1.",
              variables: { maxSum: 1, i: 0, currentSum: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5, 6, 7],
              shortLabel: "i=3: subarray [4,-1,2,1]=6",
              explanation: "Starting at index 3 (value=4), subarrays include [4]=4, [4,-1]=3, [4,-1,2]=5, [4,-1,2,1]=6, [4,-1,2,1,-5]=1, [4,-1,2,1,-5,4]=5. Best is 6. maxSum updated to 6.",
              variables: { maxSum: 6, i: 3, currentSum: 6 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "active", 5: "active", 6: "active", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3, 4, 5, 6] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9],
              shortLabel: "Return 6",
              explanation: "After checking all starting indices, the maximum subarray sum is 6, achieved by [4,-1,2,1] (indices 3 through 6).",
              variables: { maxSum: 6, answer: 6 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "found", 4: "found", 5: "found", 6: "found", 7: "default", 8: "default" },
                pointers: [],
              },
              delta: { changedIndices: [3, 4, 5, 6] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        const defaultStates = () => Object.fromEntries(nums.map((_, i) => [i, "default"]));
        let maxSum = -Infinity;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init maxSum = -∞",
          explanation: "Initialize maxSum to negative infinity.",
          variables: { maxSum: "-∞", i: "-", j: "-", currentSum: "-" },
          dataStructure: { arrayStates: defaultStates(), pointers: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          let currentSum = 0;
          let bestJ = i;
          let bestSum = nums[i];
          for (let j = i; j < n; j++) {
            currentSum += nums[j];
            if (currentSum > bestSum) { bestSum = currentSum; bestJ = j; }
          }
          maxSum = Math.max(maxSum, bestSum);
          const states = defaultStates();
          for (let k = 0; k < i; k++) states[k] = "visited";
          states[i] = "active";
          steps.push({
            stepId: steps.length, lineNumbers: [3, 4, 5, 6, 7],
            shortLabel: `i=${i}: best=${bestSum}`,
            explanation: `Starting at index ${i}, the best subarray sum is ${bestSum}. maxSum=${maxSum}.`,
            variables: { maxSum, i, currentSum: bestSum },
            dataStructure: { arrayStates: states, pointers: [{ name: "i", index: i, color: "pointer" }] },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: `Return ${maxSum}`,
          explanation: `After all starting indices, maximum subarray sum is ${maxSum}.`,
          variables: { maxSum, answer: maxSum },
          dataStructure: { arrayStates: defaultStates(), pointers: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Kadane's Algorithm",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Track running sum (maxEndingHere). If it drops below 0, reset to 0.
        Update global max at each step. Single pass.`,

      javaCode: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = 0;

    for (int i = 0; i < nums.length; i++) {
        if (currentSum < 0) {
            currentSum = 0;
        }
        currentSum += nums[i];
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}`,

      cppCode: `int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = 0;

    for (int i = 0; i < nums.size(); i++) {
        if (currentSum < 0) {
            currentSum = 0;
        }
        currentSum += nums[i];
        maxSum = max(maxSum, currentSum);
    }

    return maxSum;
}`,

      pythonCode: `def maxSubArray(nums: List[int]) -> int:
    max_sum = nums[0]
    current_sum = 0

    for num in nums:
        if current_sum < 0:
            current_sum = 0
        current_sum += num
        max_sum = max(max_sum, current_sum)

    return max_sum`,

      lineAnnotations: {
        2: "Global max — best subarray sum seen so far",
        3: "Running sum of current subarray",
        5: "Scan every element left to right",
        6: "If running sum is negative, it would hurt any extension",
        7: "Reset — start a fresh subarray from current element",
        9: "Extend current subarray by adding this element",
        10: "Update global max if current subarray is the best so far",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic mixed positive/negative array",
          input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init",
              explanation: "Initialize maxSum = nums[0] = -2, currentSum = 0. We'll scan left to right, resetting whenever the running sum goes negative.",
              variables: { maxSum: -2, currentSum: 0, i: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=0: cur=0+(-2)=-2",
              explanation: "currentSum=0 (not negative, no reset). Add nums[0]=-2: currentSum=-2. maxSum = max(-2,-2) = -2. The running sum is negative — next step will reset it.",
              variables: { i: 0, "nums[i]": -2, currentSum: -2, maxSum: -2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 9, 10],
              shortLabel: "i=1: reset, cur=1",
              explanation: "currentSum=-2 < 0, so we reset to 0 — carrying negative debt forward can never help. Add nums[1]=1: currentSum=1. maxSum = max(-2,1) = 1. New subarray starts at index 1.",
              variables: { i: 1, "nums[i]": 1, currentSum: 1, maxSum: 1, reset: true },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [0, 1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=2: cur=1+(-3)=-2",
              explanation: "currentSum=1 (positive, no reset). Add nums[2]=-3: currentSum=-2. maxSum stays 1. The -3 dragged us negative again.",
              variables: { i: 2, "nums[i]": -3, currentSum: -2, maxSum: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 7, 9, 10],
              shortLabel: "i=3: reset, cur=4",
              explanation: "currentSum=-2 < 0, reset to 0. Add nums[3]=4: currentSum=4. maxSum = max(1,4) = 4. Fresh subarray starting at index 3.",
              variables: { i: 3, "nums[i]": 4, currentSum: 4, maxSum: 4, reset: true },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=4: cur=4+(-1)=3",
              explanation: "currentSum=4 (positive, no reset). Add nums[4]=-1: currentSum=3. maxSum stays 4. Still positive — worth extending.",
              variables: { i: 4, "nums[i]": -1, currentSum: 3, maxSum: 4 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "active", 4: "active", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [4], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=5: cur=3+2=5",
              explanation: "currentSum=3 (positive, no reset). Add nums[5]=2: currentSum=5. maxSum = max(4,5) = 5.",
              variables: { i: 5, "nums[i]": 2, currentSum: 5, maxSum: 5 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "active", 4: "active", 5: "active", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [5], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=6: cur=5+1=6",
              explanation: "currentSum=5 (positive, no reset). Add nums[6]=1: currentSum=6. maxSum = max(5,6) = 6. This is the peak!",
              variables: { i: 6, "nums[i]": 1, currentSum: 6, maxSum: 6 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "found", 5: "found", 6: "found", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 6, color: "pointer" }],
              },
              delta: { changedIndices: [6], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=7: cur=6+(-5)=1",
              explanation: "currentSum=6, add nums[7]=-5: currentSum=1. maxSum stays 6. Still positive, but we passed the peak.",
              variables: { i: 7, "nums[i]": -5, currentSum: 1, maxSum: 6 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "found", 5: "found", 6: "found", 7: "active", 8: "default" },
                pointers: [{ name: "i", index: 7, color: "pointer" }],
              },
              delta: { changedIndices: [7], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=8: cur=1+4=5",
              explanation: "currentSum=1, add nums[8]=4: currentSum=5. maxSum stays 6. Scan complete.",
              variables: { i: 8, "nums[i]": 4, currentSum: 5, maxSum: 6 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "found", 5: "found", 6: "found", 7: "visited", 8: "active" },
                pointers: [{ name: "i", index: 8, color: "pointer" }],
              },
              delta: { changedIndices: [8], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [12],
              shortLabel: "Return 6",
              explanation: "Kadane's complete. The maximum subarray sum is 6, from subarray [4,-1,2,1] at indices 3-6. We found it in a single O(n) pass.",
              variables: { maxSum: 6, answer: 6 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "found", 4: "found", 5: "found", 6: "found", 7: "default", 8: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Negative",
          description: "Every element is negative — answer is the least negative",
          input: { nums: [-3, -1, -4, -2] },
          expectedOutput: "-1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init",
              explanation: "maxSum = nums[0] = -3, currentSum = 0. With all negatives, the answer will be the single least-negative element.",
              variables: { maxSum: -3, currentSum: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=0: cur=-3",
              explanation: "currentSum=0 (not negative). Add -3: currentSum=-3. maxSum = max(-3,-3) = -3.",
              variables: { i: 0, "nums[i]": -3, currentSum: -3, maxSum: -3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 9, 10],
              shortLabel: "i=1: reset, cur=-1",
              explanation: "currentSum=-3 < 0, reset to 0. Add -1: currentSum=-1. maxSum = max(-3,-1) = -1. The least negative so far.",
              variables: { i: 1, "nums[i]": -1, currentSum: -1, maxSum: -1, reset: true },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 9, 10],
              shortLabel: "i=2: reset, cur=-4",
              explanation: "currentSum=-1 < 0, reset to 0. Add -4: currentSum=-4. maxSum stays -1.",
              variables: { i: 2, "nums[i]": -4, currentSum: -4, maxSum: -1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "visited", 2: "active", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 7, 9, 10],
              shortLabel: "i=3: reset, cur=-2",
              explanation: "currentSum=-4 < 0, reset to 0. Add -2: currentSum=-2. maxSum stays -1.",
              variables: { i: 3, "nums[i]": -2, currentSum: -2, maxSum: -1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "visited", 2: "eliminated", 3: "active" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12],
              shortLabel: "Return -1",
              explanation: "All elements are negative. The maximum subarray is just [-1] at index 1. Kadane's handles this correctly because maxSum is initialized to nums[0], not 0.",
              variables: { maxSum: -1, answer: -1 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        let maxSum = nums[0];
        let currentSum = 0;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init",
          explanation: `Initialize maxSum = nums[0] = ${nums[0]}, currentSum = 0.`,
          variables: { maxSum: nums[0], currentSum: 0, i: "-" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const didReset = currentSum < 0;
          if (currentSum < 0) currentSum = 0;
          currentSum += nums[i];
          maxSum = Math.max(maxSum, currentSum);

          const lines = didReset ? [5, 6, 7, 9, 10] : [5, 6, 9, 10];
          const states = Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"]));

          steps.push({
            stepId: steps.length, lineNumbers: lines,
            shortLabel: `i=${i}: cur=${currentSum}${didReset ? " (reset)" : ""}`,
            explanation: `${didReset ? "currentSum was negative, reset to 0. " : ""}Add nums[${i}]=${nums[i]}: currentSum=${currentSum}. maxSum=${maxSum}.`,
            variables: { i, "nums[i]": nums[i], currentSum, maxSum },
            dataStructure: {
              arrayStates: states,
              pointers: [{ name: "i", index: i, color: "pointer" }],
            },
            delta: { changedIndices: [i], movedPointers: ["i"] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [12],
          shortLabel: `Return ${maxSum}`,
          explanation: `Kadane's complete. Maximum subarray sum is ${maxSum}.`,
          variables: { maxSum, answer: maxSum },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n²)", space: "O(1)", explanation: "Two nested loops over all subarrays" },
    optimal: { time: "O(n)",  space: "O(1)", explanation: "Single pass with two variables", tradeoff: "Kadane's achieves O(n) with O(1) space — no tradeoff needed" },
  },

  interviewTips: [
    "Start by mentioning the brute force O(n^2) approach, then introduce Kadane's.",
    "Clarify: 'Can the subarray be empty?' — usually no, at least one element required.",
    "Explain the reset logic clearly: negative prefix always hurts future sums.",
    "Handle the all-negative edge case: maxSum is initialized to nums[0], not 0.",
    "If asked for the subarray itself (not just sum), track start/end indices during the scan.",
    "Mention the divide-and-conquer O(n log n) approach as an alternative.",
  ],

  relatedProblems: ["maximum-product-subarray", "best-time-to-buy-stock"],
};
