export const houseRobber = {
  id: 101,
  slug: "house-robber",
  title: "House Robber",
  difficulty: "Medium",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 3,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Google", "Microsoft", "Cisco", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/house-robber/",

  pattern: "Adjacent Element Exclusion DP",
  patternExplanation: `When choosing elements from a sequence where adjacent picks are forbidden,
    use dp[i] = max(dp[i-1], dp[i-2] + nums[i]). At each position, decide: skip this element
    (keep previous best) or take it (add to the best excluding the neighbor).`,

  intuition: {
    coreInsight: `At each house, we face a binary choice: rob it or skip it. If we rob house i,
      we can't rob house i-1, so the best we can do is dp[i-2] + nums[i]. If we skip house i,
      we keep dp[i-1]. The answer is max of these two choices. This recurrence builds the
      globally optimal solution from locally optimal sub-decisions.`,

    mentalModel: `Imagine you're walking down a street and can pick up gold coins from houses,
      but an alarm connects each pair of adjacent houses — if you take from two neighbors, you
      get caught. At each house, you glance at your notebook: "What's the most I had two houses
      ago?" If adding this house's gold to that total beats your running best, you take it.
      Otherwise you walk past. Your notebook IS the DP array.`,

    whyNaiveFails: `Trying all subsets of non-adjacent houses is O(2^n). For each house, you
      either include or exclude it, creating a binary decision tree. With n=100 houses, that's
      2^100 ≈ 10^30 subsets. DP collapses this into n comparisons.`,

    keyObservation: `The key insight is that dp[i] = max(dp[i-1], dp[i-2] + nums[i]) captures
      ALL valid combinations, not just greedy ones. By carrying forward the best of "skip" vs
      "take", we implicitly evaluate every valid subset without enumerating them. Also, since
      we only look back 2 positions, we need only O(1) space.`,
  },

  problem: `You are a professional robber planning to rob houses along a street. Each house
    has a certain amount of money stashed, the only constraint stopping you from robbing each
    of them is that adjacent houses have security systems connected and it will automatically
    contact the police if two adjacent houses were broken into on the same night. Given an
    integer array nums representing the amount of money of each house, return the maximum
    amount of money you can rob tonight without alerting the police.`,

  examples: [
    { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 0 (1) + house 2 (3) = 4." },
    { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 0 (2) + house 2 (9) + house 4 (1) = 12." },
  ],

  constraints: [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 400",
  ],

  approaches: {
    brute: {
      label: "Recursive (Brute Force)",
      tier: "brute",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: "Try all combinations: for each house, either rob it (skip next) or skip it. Return the maximum across all valid subsets.",

      javaCode: `public int rob(int[] nums) {
    return helper(nums, nums.length - 1);
}

private int helper(int[] nums, int i) {
    if (i < 0) return 0;
    return Math.max(helper(nums, i - 1),
                    helper(nums, i - 2) + nums[i]);
}`,

      cppCode: `int helper(vector<int>& nums, int i) {
    if (i < 0) return 0;
    return max(helper(nums, i - 1),
               helper(nums, i - 2) + nums[i]);
}

int rob(vector<int>& nums) {
    return helper(nums, nums.size() - 1);
}`,

      pythonCode: `def rob(nums: List[int]) -> int:
    def helper(i):
        if i < 0:
            return 0
        return max(helper(i - 1),
                   helper(i - 2) + nums[i])

    return helper(len(nums) - 1)`,

      lineAnnotations: {
        2: "Start from the last house",
        5: "Base case: no houses left",
        6: "Skip this house: take best of i-1",
        7: "Rob this house: take best of i-2 + current value",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [1, 2, 3, 1] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Start: helper(3)",
              explanation: "Begin recursion from the last house (index 3). We'll decide for each house whether to rob or skip.",
              variables: { i: 3, n: 4 },
              dataStructure: {
                dpArray: [null, null, null, null],
                dpHighlight: 3,
                dpArrows: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5],
              shortLabel: "Base: dp[0] = 1",
              explanation: "With only house 0, the best we can do is rob it for 1.",
              variables: { i: 0, "nums[0]": 1, "dp[0]": 1 },
              dataStructure: {
                dpArray: [1, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7],
              shortLabel: "dp[1] = max(1, 2) = 2",
              explanation: "House 1: skip (dp[0]=1) or rob (nums[1]=2). max(1, 2) = 2. Rob house 1.",
              variables: { i: 1, "nums[1]": 2, "skip": 1, "rob": 2, "dp[1]": 2 },
              dataStructure: {
                dpArray: [1, 2, null, null],
                dpHighlight: 1,
                dpArrows: [],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7],
              shortLabel: "dp[2] = max(2, 1+3) = 4",
              explanation: "House 2: skip (dp[1]=2) or rob (dp[0]+nums[2] = 1+3 = 4). max(2, 4) = 4. Rob houses 0 and 2.",
              variables: { i: 2, "nums[2]": 3, "skip": 2, "rob": 4, "dp[2]": 4 },
              dataStructure: {
                dpArray: [1, 2, 4, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7],
              shortLabel: "dp[3] = max(4, 2+1) = 4",
              explanation: "House 3: skip (dp[2]=4) or rob (dp[1]+nums[3] = 2+1 = 3). max(4, 3) = 4. Skipping house 3 is better.",
              variables: { i: 3, "nums[3]": 1, "skip": 4, "rob": 3, "dp[3]": 4, answer: 4 },
              dataStructure: {
                dpArray: [1, 2, 4, 4],
                dpHighlight: 3,
                dpArrows: [],
              },
              delta: { changedIndices: [3] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        const dp = new Array(n).fill(null);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `Start: helper(${n-1})`,
          explanation: `Begin recursion from the last house (index ${n-1}).`,
          variables: { i: n-1, n },
          dataStructure: { dpArray: [...dp], dpHighlight: n-1, dpArrows: [] },
          delta: {}, isAnswer: false,
        });

        dp[0] = nums[0];
        steps.push({
          stepId: 1, lineNumbers: [5],
          shortLabel: `Base: dp[0] = ${nums[0]}`,
          explanation: `With only house 0, rob it for ${nums[0]}.`,
          variables: { i: 0, "nums[0]": nums[0], "dp[0]": dp[0] },
          dataStructure: { dpArray: [...dp], dpHighlight: 0, dpArrows: [] },
          delta: { changedIndices: [0] }, isAnswer: false,
        });

        if (n > 1) {
          dp[1] = Math.max(nums[0], nums[1]);
          steps.push({
            stepId: 2, lineNumbers: [6, 7],
            shortLabel: `dp[1] = max(${nums[0]}, ${nums[1]}) = ${dp[1]}`,
            explanation: `House 1: skip (dp[0]=${dp[0]}) or rob (nums[1]=${nums[1]}). max(${dp[0]}, ${nums[1]}) = ${dp[1]}.`,
            variables: { i: 1, "nums[1]": nums[1], skip: dp[0], rob: nums[1], "dp[1]": dp[1] },
            dataStructure: { dpArray: [...dp], dpHighlight: 1, dpArrows: [] },
            delta: { changedIndices: [1] }, isAnswer: false,
          });
        }

        for (let i = 2; i < n; i++) {
          const skip = dp[i-1];
          const rob = dp[i-2] + nums[i];
          dp[i] = Math.max(skip, rob);
          const arrows = dp[i] === rob ? [{ from: i-2, to: i }] : [];
          const isLast = i === n - 1;
          steps.push({
            stepId: steps.length, lineNumbers: [6, 7],
            shortLabel: `dp[${i}] = max(${skip}, ${dp[i-2]}+${nums[i]}) = ${dp[i]}`,
            explanation: `House ${i}: skip (dp[${i-1}]=${skip}) or rob (dp[${i-2}]+nums[${i}] = ${dp[i-2]}+${nums[i]} = ${rob}). max(${skip}, ${rob}) = ${dp[i]}.`,
            variables: { i, [`nums[${i}]`]: nums[i], skip, rob, [`dp[${i}]`]: dp[i], ...(isLast ? { answer: dp[i] } : {}) },
            dataStructure: { dpArray: [...dp], dpHighlight: i, dpArrows: arrows },
            delta: { changedIndices: [i] }, isAnswer: isLast,
          });
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Bottom-Up DP (O(1) Space)",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `At each house, choose max(skip=prev1, rob=prev2+nums[i]). Only two variables needed
        since we look back at most 2 positions.`,

      javaCode: `public int rob(int[] nums) {
    int prev2 = 0;
    int prev1 = 0;

    for (int num : nums) {
        int curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}`,

      cppCode: `int rob(vector<int>& nums) {
    int prev2 = 0;
    int prev1 = 0;

    for (int num : nums) {
        int curr = max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}`,

      pythonCode: `def rob(nums: List[int]) -> int:
    prev2 = 0
    prev1 = 0

    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr

    return prev1`,

      lineAnnotations: {
        2: "prev2 = best total two houses ago (initially 0)",
        3: "prev1 = best total one house ago (initially 0)",
        5: "Visit each house in order",
        6: "Choose: skip this house (prev1) or rob it (prev2 + num)",
        7: "Shift window forward",
        8: "Current becomes the new prev1",
        10: "prev1 holds the answer after processing all houses",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Four houses where skipping adjacent is optimal",
          input: { nums: [1, 2, 3, 1] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init prev2=0, prev1=0",
              explanation: "Start with prev2=0 and prev1=0. These represent the best loot from 'two houses ago' and 'one house ago' respectively. Before seeing any houses, both are 0.",
              variables: { prev2: 0, prev1: 0 },
              dataStructure: {
                dpArray: [null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "House 0: max(0, 0+1) = 1",
              explanation: "At house 0 (value=1): skip (prev1=0) or rob (prev2+1=0+1=1). max(0,1)=1. Rob house 0.",
              variables: { num: 1, prev2: 0, prev1: 0, curr: 1, decision: "Rob" },
              dataStructure: {
                dpArray: [1, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6],
              shortLabel: "House 1: max(1, 0+2) = 2",
              explanation: "At house 1 (value=2): skip (prev1=1) or rob (prev2+2=0+2=2). max(1,2)=2. Rob house 1 instead of house 0.",
              variables: { num: 2, prev2: 0, prev1: 1, curr: 2, decision: "Rob" },
              dataStructure: {
                dpArray: [1, 2, null, null],
                dpHighlight: 1,
                dpArrows: [],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6],
              shortLabel: "House 2: max(2, 1+3) = 4",
              explanation: "At house 2 (value=3): skip (prev1=2) or rob (prev2+3=1+3=4). max(2,4)=4. Rob houses 0 and 2 — they're not adjacent.",
              variables: { num: 3, prev2: 1, prev1: 2, curr: 4, decision: "Rob" },
              dataStructure: {
                dpArray: [1, 2, 4, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6],
              shortLabel: "House 3: max(4, 2+1) = 4",
              explanation: "At house 3 (value=1): skip (prev1=4) or rob (prev2+1=2+1=3). max(4,3)=4. Skipping is better — house 3's value is too small.",
              variables: { num: 1, prev2: 2, prev1: 4, curr: 4, decision: "Skip" },
              dataStructure: {
                dpArray: [1, 2, 4, 4],
                dpHighlight: 3,
                dpArrows: [],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [10],
              shortLabel: "Answer: 4",
              explanation: "prev1 = 4. The optimal strategy is to rob houses 0 and 2 for a total of 1 + 3 = 4.",
              variables: { prev1: 4, answer: 4 },
              dataStructure: {
                dpArray: [1, 2, 4, 4],
                dpHighlight: null,
                dpArrows: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Five Houses",
          description: "Longer input where skipping multiple is optimal",
          input: { nums: [2, 7, 9, 3, 1] },
          expectedOutput: "12",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init prev2=0, prev1=0",
              explanation: "Start with prev2=0 and prev1=0. No houses processed yet.",
              variables: { prev2: 0, prev1: 0 },
              dataStructure: {
                dpArray: [null, null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "House 0: max(0, 0+2) = 2",
              explanation: "At house 0 (value=2): skip=0 or rob=0+2=2. max(0,2)=2. Rob it.",
              variables: { num: 2, prev2: 0, prev1: 0, curr: 2 },
              dataStructure: {
                dpArray: [2, null, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6],
              shortLabel: "House 1: max(2, 0+7) = 7",
              explanation: "At house 1 (value=7): skip=2 or rob=0+7=7. max(2,7)=7. Rob house 1 (better than house 0 alone).",
              variables: { num: 7, prev2: 0, prev1: 2, curr: 7 },
              dataStructure: {
                dpArray: [2, 7, null, null, null],
                dpHighlight: 1,
                dpArrows: [],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6],
              shortLabel: "House 2: max(7, 2+9) = 11",
              explanation: "At house 2 (value=9): skip=7 or rob=2+9=11. max(7,11)=11. Rob houses 0 and 2.",
              variables: { num: 9, prev2: 2, prev1: 7, curr: 11 },
              dataStructure: {
                dpArray: [2, 7, 11, null, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6],
              shortLabel: "House 3: max(11, 7+3) = 11",
              explanation: "At house 3 (value=3): skip=11 or rob=7+3=10. max(11,10)=11. Skip — not worth it.",
              variables: { num: 3, prev2: 7, prev1: 11, curr: 11 },
              dataStructure: {
                dpArray: [2, 7, 11, 11, null],
                dpHighlight: 3,
                dpArrows: [],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6],
              shortLabel: "House 4: max(11, 11+1) = 12",
              explanation: "At house 4 (value=1): skip=11 or rob=11+1=12. max(11,12)=12. Rob houses 0, 2, and 4.",
              variables: { num: 1, prev2: 11, prev1: 11, curr: 12 },
              dataStructure: {
                dpArray: [2, 7, 11, 11, 12],
                dpHighlight: 4,
                dpArrows: [{ from: 2, to: 4 }],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10],
              shortLabel: "Answer: 12",
              explanation: "prev1 = 12. Rob houses 0 (2) + 2 (9) + 4 (1) = 12.",
              variables: { prev1: 12, answer: 12 },
              dataStructure: {
                dpArray: [2, 7, 11, 11, 12],
                dpHighlight: null,
                dpArrows: [],
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
        const dp = new Array(n).fill(null);
        let prev2 = 0, prev1 = 0;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init prev2=0, prev1=0",
          explanation: "Start with prev2=0 and prev1=0.",
          variables: { prev2, prev1 },
          dataStructure: { dpArray: [...dp], dpHighlight: null, dpArrows: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const curr = Math.max(prev1, prev2 + nums[i]);
          dp[i] = curr;
          const robbed = curr === prev2 + nums[i];
          const arrows = robbed && i >= 2 ? [{ from: i - 2, to: i }] : [];
          const isLast = i === n - 1;

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6],
            shortLabel: `House ${i}: max(${prev1}, ${prev2}+${nums[i]}) = ${curr}`,
            explanation: `At house ${i} (value=${nums[i]}): skip=${prev1} or rob=${prev2}+${nums[i]}=${prev2+nums[i]}. max(${prev1},${prev2+nums[i]})=${curr}. ${robbed ? 'Rob' : 'Skip'}.`,
            variables: { num: nums[i], prev2, prev1, curr },
            dataStructure: { dpArray: [...dp], dpHighlight: i, dpArrows: arrows },
            delta: { changedIndices: [i] }, isAnswer: false,
          });

          prev2 = prev1;
          prev1 = curr;
        }

        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: `Answer: ${prev1}`,
          explanation: `prev1 = ${prev1}. This is the maximum amount we can rob.`,
          variables: { prev1, answer: prev1 },
          dataStructure: { dpArray: [...dp], dpHighlight: null, dpArrows: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(2^n)", space: "O(n)", explanation: "Binary decision tree without memoization" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass with two rolling variables", tradeoff: "DP reduces exponential to linear time; space optimization from O(n) array to O(1)" },
  },

  interviewTips: [
    "Start by identifying this as a 'no two adjacent' selection problem.",
    "Write the recurrence first: dp[i] = max(dp[i-1], dp[i-2] + nums[i]).",
    "Mention space optimization: only prev1 and prev2 are needed.",
    "Clarify edge cases: single house → rob it, two houses → rob the larger.",
    "This pattern applies to many problems: delete-and-earn, paint houses, etc.",
  ],

  relatedProblems: ["house-robber-ii", "min-cost-climbing-stairs", "climbing-stairs"],
};
