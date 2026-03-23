export const longestIncreasingSubsequence = {
  id: 109,
  slug: "longest-increasing-subsequence",
  title: "Longest Increasing Subsequence",
  difficulty: "Medium",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 109,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/longest-increasing-subsequence/",

  pattern: "1D DP with Previous Element Comparison",
  patternExplanation: `For each element, look back at all previous elements to find the longest
    subsequence that can be extended. dp[i] = 1 + max(dp[j]) for all j < i where nums[j] < nums[i].`,

  intuition: {
    coreInsight: `Every element can either start a new subsequence of length 1 or extend an existing one.
      For each position i, we ask: "Which earlier elements are smaller than me?" Among those, we pick
      the one with the longest subsequence so far, and extend it by 1. dp[i] stores the answer to
      "what's the longest increasing subsequence ending at index i?"`,

    mentalModel: `Imagine stacking boxes where each new box must be taller than the one below it.
      For each new box, you look at all existing stacks and find the tallest stack whose top box
      is shorter than yours. You place your box on top of that stack. dp[i] records the height of
      the tallest stack that ends with box i.`,

    whyNaiveFails: `A brute-force approach generates all 2^n subsequences and checks each for
      increasing order — that's exponential. Even generating only increasing subsequences via
      backtracking is O(2^n) in the worst case. The DP approach reduces this to O(n^2) by
      reusing previously computed results.`,

    keyObservation: `dp[i] doesn't just depend on dp[i-1] — it depends on ALL previous dp values
      where the corresponding element is smaller. This is why we need a nested loop: for each i,
      scan all j < i. The answer is max(dp[0..n-1]), not just dp[n-1], because the LIS might
      not end at the last element.`,
  },

  problem: `Given an integer array nums, return the length of the longest strictly increasing
    subsequence. A subsequence is derived from the array by deleting some or no elements without
    changing the order of the remaining elements.`,

  examples: [
    { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The LIS is [2,3,7,101], length 4" },
    { input: "nums = [0,1,0,3,2,3]", output: "4", explanation: "The LIS is [0,1,2,3], length 4" },
    { input: "nums = [7,7,7,7,7,7,7]", output: "1", explanation: "All elements are equal, so LIS has length 1" },
  ],

  constraints: [
    "1 <= nums.length <= 2500",
    "-10^4 <= nums[i] <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Recursion)",
      tier: "brute",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: "Try including or excluding each element. For each element, recurse on the rest keeping track of the previous element chosen.",

      javaCode: `public int lengthOfLIS(int[] nums) {
    return helper(nums, 0, Integer.MIN_VALUE);
}

private int helper(int[] nums, int i, int prev) {
    if (i == nums.length) return 0;
    int skip = helper(nums, i + 1, prev);
    int take = 0;
    if (nums[i] > prev) {
        take = 1 + helper(nums, i + 1, nums[i]);
    }
    return Math.max(skip, take);
}`,

      cppCode: `int lengthOfLIS(vector<int>& nums) {
    return helper(nums, 0, INT_MIN);
}

int helper(vector<int>& nums, int i, int prev) {
    if (i == nums.size()) return 0;
    int skip = helper(nums, i + 1, prev);
    int take = 0;
    if (nums[i] > prev) {
        take = 1 + helper(nums, i + 1, nums[i]);
    }
    return max(skip, take);
}`,

      pythonCode: `def lengthOfLIS(nums: List[int]) -> int:
    def helper(i, prev):
        if i == len(nums):
            return 0
        skip = helper(i + 1, prev)
        take = 0
        if nums[i] > prev:
            take = 1 + helper(i + 1, nums[i])
        return max(skip, take)
    return helper(0, float('-inf'))`,

      lineAnnotations: {
        1: "Entry point — start recursion from index 0",
        5: "Base case: reached end of array",
        6: "Option 1: skip current element",
        8: "Option 2: take current element if it's larger than prev",
        9: "Taking adds 1 to the subsequence length",
        11: "Return the better of skip vs take",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Start recursion",
              explanation: "Begin exploring all possible subsequences starting from index 0 with no previous element chosen.",
              variables: { i: 0, prev: "-inf", result: "-" },
              dataStructure: {
                dpArray: [null, null, null, null, null, null, null, null],
                dpHighlight: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 8, 9],
              shortLabel: "Exponential branching",
              explanation: "At each element we branch: take or skip. With 8 elements, this creates up to 2^8 = 256 paths. The recursion tree is enormous even for small inputs.",
              variables: { branches: "2^n", n: 8 },
              dataStructure: {
                dpArray: [null, null, null, null, null, null, null, null],
                dpHighlight: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11],
              shortLabel: "Result: 4",
              explanation: "After exploring all paths, the longest increasing subsequence found is [2,3,7,101] with length 4. But this took exponential time.",
              variables: { answer: 4, lis: "[2,3,7,101]" },
              dataStructure: {
                dpArray: [null, null, null, null, null, null, null, null],
                dpHighlight: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        steps.push({
          stepId: 0, lineNumbers: [1],
          shortLabel: "Start recursion",
          explanation: `Begin exploring all possible subsequences of [${nums.join(',')}].`,
          variables: { n: nums.length, approach: "Brute Force" },
          dataStructure: { dpArray: nums.map(() => null), dpHighlight: null },
          delta: {}, isAnswer: false,
        });
        // Brute force just shows the concept
        function lis(nums) {
          const n = nums.length;
          const dp = new Array(n).fill(1);
          for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
              if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
            }
          }
          return Math.max(...dp);
        }
        const result = lis(nums);
        steps.push({
          stepId: 1, lineNumbers: [11],
          shortLabel: `Result: ${result}`,
          explanation: `After exploring all paths, the LIS length is ${result}.`,
          variables: { answer: result },
          dataStructure: { dpArray: nums.map(() => null), dpHighlight: null },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Bottom-Up DP",
      tier: "optimal",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: `Build dp[] where dp[i] = length of LIS ending at index i. For each i,
        check all j < i: if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1).
        Answer is max(dp[]).`,

      javaCode: `public int lengthOfLIS(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    int maxLen = 1;

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }

    return maxLen;
}`,

      cppCode: `int lengthOfLIS(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, 1);
    int maxLen = 1;

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLen = max(maxLen, dp[i]);
    }

    return maxLen;
}`,

      pythonCode: `def lengthOfLIS(nums: List[int]) -> int:
    n = len(nums)
    dp = [1] * n
    max_len = 1

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
        max_len = max(max_len, dp[i])

    return max_len`,

      lineAnnotations: {
        3: "dp[i] = LIS length ending at index i; initialize all to 1",
        4: "Track global maximum LIS length",
        6: "For each element starting from index 1",
        7: "Look back at all previous elements",
        8: "If nums[j] < nums[i], we can extend j's subsequence",
        9: "Take the best extension: dp[j] + 1",
        12: "Update global max after processing index i",
        15: "Return the longest increasing subsequence found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with LIS = [2,3,7,101]",
          input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Init dp = [1,1,1,1,1,1,1,1]",
              explanation: "Initialize dp array with all 1s. Every element by itself is an increasing subsequence of length 1.",
              variables: { maxLen: 1, dp: "[1,1,1,1,1,1,1,1]" },
              dataStructure: {
                dpArray: [1, 1, 1, 1, 1, 1, 1, 1],
                dpHighlight: null,
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=1: nums[0]=10 > nums[1]=9, skip",
              explanation: "At i=1 (value 9), check j=0 (value 10). 10 is NOT less than 9, so we can't extend. dp[1] stays 1.",
              variables: { i: 1, j: 0, "nums[i]": 9, "nums[j]": 10, "dp[i]": 1, maxLen: 1 },
              dataStructure: {
                dpArray: [1, 1, 1, 1, 1, 1, 1, 1],
                dpHighlight: 1,
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "j", index: 0, color: "active" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=2: no j < 2, dp[2]=1",
              explanation: "At i=2 (value 2), check j=0 (10>2, skip), j=1 (9>2, skip). No earlier element is smaller. dp[2] stays 1.",
              variables: { i: 2, "nums[i]": 2, "dp[i]": 1, maxLen: 1 },
              dataStructure: {
                dpArray: [1, 1, 1, 1, 1, 1, 1, 1],
                dpHighlight: 2,
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9],
              shortLabel: "i=3: nums[2]=2 < 5, dp[3]=dp[2]+1=2",
              explanation: "At i=3 (value 5), check j=2 (value 2). 2 < 5, so we can extend: dp[3] = max(1, dp[2]+1) = max(1, 2) = 2. Subsequence: [2, 5].",
              variables: { i: 3, j: 2, "nums[i]": 5, "nums[j]": 2, "dp[i]": 2, maxLen: 2 },
              dataStructure: {
                dpArray: [1, 1, 1, 2, 1, 1, 1, 1],
                dpHighlight: 3,
                dpArrows: [{ from: 2, to: 3 }],
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }, { name: "j", index: 2, color: "active" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 9],
              shortLabel: "i=4: nums[2]=2 < 3, dp[4]=2",
              explanation: "At i=4 (value 3), check all j<4. Only j=2 (value 2) is smaller: dp[4] = max(1, dp[2]+1) = 2. Subsequence: [2, 3].",
              variables: { i: 4, j: 2, "nums[i]": 3, "nums[j]": 2, "dp[i]": 2, maxLen: 2 },
              dataStructure: {
                dpArray: [1, 1, 1, 2, 2, 1, 1, 1],
                dpHighlight: 4,
                dpArrows: [{ from: 2, to: 4 }],
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [8, 9],
              shortLabel: "i=5: best from j=4, dp[5]=3",
              explanation: "At i=5 (value 7), j=2 (2<7, dp=1), j=3 (5<7, dp=2), j=4 (3<7, dp=2). Best is dp[3]+1=3 or dp[4]+1=3. dp[5]=3. Subsequence: [2, 5, 7] or [2, 3, 7].",
              variables: { i: 5, "nums[i]": 7, "dp[i]": 3, maxLen: 3 },
              dataStructure: {
                dpArray: [1, 1, 1, 2, 2, 3, 1, 1],
                dpHighlight: 5,
                dpArrows: [{ from: 3, to: 5 }, { from: 4, to: 5 }],
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [8, 9],
              shortLabel: "i=6: dp[6]=4 (extend [2,3,7]→101)",
              explanation: "At i=6 (value 101), all previous values are smaller. Best extension is from j=5 (dp=3): dp[6] = 3+1 = 4. Subsequence: [2, 3, 7, 101]. New maximum!",
              variables: { i: 6, "nums[i]": 101, "dp[i]": 4, maxLen: 4 },
              dataStructure: {
                dpArray: [1, 1, 1, 2, 2, 3, 4, 1],
                dpHighlight: 6,
                dpArrows: [{ from: 5, to: 6 }],
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "active", 7: "default" },
                pointers: [{ name: "i", index: 6, color: "pointer" }],
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [8, 9],
              shortLabel: "i=7: dp[7]=4 (extend [2,3,7]→18)",
              explanation: "At i=7 (value 18), j=5 (7<18, dp=3) gives dp[7]=4. But 18 < 101, so can't extend from j=6. dp[7]=4. Subsequence: [2, 3, 7, 18].",
              variables: { i: 7, "nums[i]": 18, "dp[i]": 4, maxLen: 4 },
              dataStructure: {
                dpArray: [1, 1, 1, 2, 2, 3, 4, 4],
                dpHighlight: 7,
                dpArrows: [{ from: 5, to: 7 }],
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "active" },
                pointers: [{ name: "i", index: 7, color: "pointer" }],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [15],
              shortLabel: "Return maxLen = 4",
              explanation: "Final dp = [1,1,1,2,2,3,4,4]. Maximum is 4. The LIS is [2,3,7,101] or [2,3,7,18], both length 4.",
              variables: { maxLen: 4, dp: "[1,1,1,2,2,3,4,4]", answer: 4 },
              dataStructure: {
                dpArray: [1, 1, 1, 2, 2, 3, 4, 4],
                dpHighlight: null,
                arrayStates: { 0: "default", 1: "default", 2: "found", 3: "default", 4: "found", 5: "found", 6: "found", 7: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        allEqual: {
          id: "allEqual",
          label: "All Equal",
          description: "All elements the same — LIS is 1",
          input: { nums: [7, 7, 7, 7] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Init dp = [1,1,1,1]",
              explanation: "Initialize all dp values to 1. Each element alone is a subsequence of length 1.",
              variables: { maxLen: 1, dp: "[1,1,1,1]" },
              dataStructure: {
                dpArray: [1, 1, 1, 1],
                dpHighlight: null,
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=1: 7 not < 7, dp[1]=1",
              explanation: "At i=1 (value 7), j=0 (value 7). 7 is NOT strictly less than 7. Cannot extend. dp[1] stays 1.",
              variables: { i: 1, j: 0, "nums[i]": 7, "nums[j]": 7, "dp[i]": 1, maxLen: 1 },
              dataStructure: {
                dpArray: [1, 1, 1, 1],
                dpHighlight: 1,
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "j", index: 0, color: "active" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=2: no smaller, dp[2]=1",
              explanation: "At i=2 (value 7), all previous are 7 — not strictly less. dp[2] stays 1.",
              variables: { i: 2, "nums[i]": 7, "dp[i]": 1, maxLen: 1 },
              dataStructure: {
                dpArray: [1, 1, 1, 1],
                dpHighlight: 2,
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=3: no smaller, dp[3]=1",
              explanation: "At i=3 (value 7), same story. No extension possible. dp[3]=1.",
              variables: { i: 3, "nums[i]": 7, "dp[i]": 1, maxLen: 1 },
              dataStructure: {
                dpArray: [1, 1, 1, 1],
                dpHighlight: 3,
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15],
              shortLabel: "Return 1",
              explanation: "All dp values are 1. When all elements are equal, strictly increasing means no two can be in the same subsequence. Answer: 1.",
              variables: { maxLen: 1, answer: 1 },
              dataStructure: {
                dpArray: [1, 1, 1, 1],
                dpHighlight: null,
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default" },
                pointers: [],
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
        const dp = new Array(n).fill(1);
        let maxLen = 1;

        steps.push({
          stepId: 0, lineNumbers: [3],
          shortLabel: `Init dp = [${dp.join(',')}]`,
          explanation: "Initialize dp array with all 1s. Every element is a subsequence of length 1.",
          variables: { maxLen: 1, dp: `[${dp.join(',')}]` },
          dataStructure: {
            dpArray: [...dp],
            dpHighlight: null,
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i < n; i++) {
          let bestJ = -1;
          for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
              if (dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                bestJ = j;
              }
            }
          }
          maxLen = Math.max(maxLen, dp[i]);

          const arrows = bestJ >= 0 ? [{ from: bestJ, to: i }] : [];
          steps.push({
            stepId: steps.length, lineNumbers: [8, 9, 12],
            shortLabel: `i=${i}: dp[${i}]=${dp[i]}`,
            explanation: bestJ >= 0
              ? `At i=${i} (value ${nums[i]}), best extension from j=${bestJ} (value ${nums[bestJ]}, dp=${dp[bestJ]}). dp[${i}] = ${dp[i]}. maxLen = ${maxLen}.`
              : `At i=${i} (value ${nums[i]}), no earlier element is strictly smaller. dp[${i}] stays ${dp[i]}.`,
            variables: { i, "nums[i]": nums[i], "dp[i]": dp[i], maxLen },
            dataStructure: {
              dpArray: [...dp],
              dpHighlight: i,
              dpArrows: arrows,
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [15],
          shortLabel: `Return ${maxLen}`,
          explanation: `Final dp = [${dp.join(',')}]. Maximum value is ${maxLen}.`,
          variables: { maxLen, answer: maxLen, dp: `[${dp.join(',')}]` },
          dataStructure: {
            dpArray: [...dp],
            dpHighlight: null,
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, dp[i] === maxLen ? "found" : "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(2^n)", space: "O(n)", explanation: "Exponential recursion trying all subsequences" },
    optimal: { time: "O(n²)", space: "O(n)", explanation: "Double loop over dp array; O(n log n) possible with patience sorting", tradeoff: "O(n) space for dp array eliminates exponential recomputation" },
  },

  interviewTips: [
    "Start by defining dp[i] clearly: 'LIS length ending at index i'.",
    "Emphasize that the answer is max(dp[]), not dp[n-1].",
    "Mention the O(n log n) binary search solution as a follow-up.",
    "Ask if the subsequence needs to be contiguous (it doesn't — that's subarray).",
    "Walk through why we need the inner loop: dp[i] depends on ALL previous values, not just dp[i-1].",
  ],

  relatedProblems: ["longest-common-subsequence", "maximum-product-subarray", "longest-palindromic-substring"],
};
