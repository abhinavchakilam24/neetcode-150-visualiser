export const targetSum = {
  id: 114,
  slug: "target-sum",
  title: "Target Sum",
  difficulty: "Medium",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 114,
  artifactType: "DPTable2D",
  companies: ["Meta", "Amazon", "Google", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/target-sum/",

  pattern: "0/1 Knapsack with Offset DP",
  patternExplanation: `Each element is either added or subtracted, which is equivalent to partitioning
    elements into two subsets (positive and negative). This transforms into a subset sum problem
    solvable with 2D DP where rows are elements and columns are possible sums.`,

  intuition: {
    coreInsight: `Each number must be assigned either + or -. If we let P be the sum of positives
      and N the sum of negatives, then P - N = target and P + N = totalSum. So P = (target + totalSum) / 2.
      The problem reduces to: "how many subsets of nums sum to P?" This is a classic 0/1 knapsack
      counting problem.`,

    mentalModel: `Imagine each number on a card. You're placing cards on two sides of a balance
      scale — left side (positive) and right side (negative). You need the left side to be exactly
      'target' heavier than the right. Since every card must go on one side, you're really just
      choosing which subset goes left. The DP table counts how many ways to pick a subset that
      sums to the required weight.`,

    whyNaiveFails: `Brute force tries all 2^n sign assignments — for 20 numbers, that's over a
      million combinations. Many of these reach the same intermediate sum from different prefixes,
      creating massive redundancy. DP with sum offsets (or the subset-sum transformation) computes
      each (index, sum) pair exactly once.`,

    keyObservation: `The transformation P = (target + totalSum) / 2 only works when (target + totalSum)
      is non-negative and even. If it's odd or if |target| > totalSum, the answer is 0 immediately.
      This mathematical insight converts a problem with negative indices into a standard subset sum.`,
  },

  problem: `You are given an integer array nums and an integer target. You want to build an
    expression out of nums by adding one of the symbols '+' and '-' before each integer in nums
    and then concatenate all the integers. Return the number of different expressions that you
    can build which evaluates to target.`,

  examples: [
    { input: "nums = [1,1,1,1,1], target = 3", output: "5", explanation: "Five ways: -1+1+1+1+1, +1-1+1+1+1, +1+1-1+1+1, +1+1+1-1+1, +1+1+1+1-1" },
    { input: "nums = [1], target = 1", output: "1", explanation: "Only +1 = 1." },
  ],

  constraints: [
    "1 <= nums.length <= 20",
    "0 <= nums[i] <= 1000",
    "0 <= sum(nums[i]) <= 1000",
    "-1000 <= target <= 1000",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: "For each number, try adding it or subtracting it. Count paths that reach the target.",

      javaCode: `public int findTargetSumWays(int[] nums, int target) {
    return helper(nums, 0, target);
}

private int helper(int[] nums, int idx, int remaining) {
    if (idx == nums.length) {
        return remaining == 0 ? 1 : 0;
    }
    return helper(nums, idx + 1, remaining - nums[idx])
         + helper(nums, idx + 1, remaining + nums[idx]);
}`,

      cppCode: `int findTargetSumWays(vector<int>& nums, int target) {
    return helper(nums, 0, target);
}

int helper(vector<int>& nums, int idx, int remaining) {
    if (idx == nums.size()) {
        return remaining == 0 ? 1 : 0;
    }
    return helper(nums, idx + 1, remaining - nums[idx])
         + helper(nums, idx + 1, remaining + nums[idx]);
}`,

      pythonCode: `def findTargetSumWays(nums: List[int], target: int) -> int:
    def helper(idx, remaining):
        if idx == len(nums):
            return 1 if remaining == 0 else 0
        return helper(idx + 1, remaining - nums[idx]) \
             + helper(idx + 1, remaining + nums[idx])
    return helper(0, target)`,

      lineAnnotations: {
        5: "Base case: used all numbers",
        6: "Count it if remaining sum is exactly 0",
        8: "Try adding (+) and subtracting (-) current number",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [1, 1, 1, 1, 1], target: 3 },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0, lineNumbers: [1, 2],
              shortLabel: "Start recursion",
              explanation: "Try assigning + or - to each of the five 1s to reach target=3. This means 2^5 = 32 total possibilities to explore.",
              variables: { idx: 0, remaining: 3, n: 5 },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [8, 9],
              shortLabel: "Branch on each element",
              explanation: "At each element, we branch into +1 (remaining-1) and -1 (remaining+1). Tree has depth 5 with 32 leaves.",
              variables: { idx: 0, remaining: 3, "add": "helper(1,2)", "subtract": "helper(1,4)" },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [5, 6],
              shortLabel: "Count leaves where remaining=0",
              explanation: "After exploring all 32 leaf nodes, 5 paths reach remaining=0: we need exactly one -1 and four +1s, and there are C(5,1) = 5 positions for the minus sign.",
              variables: { result: 5 },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, target }) {
        const steps = [];
        function helper(idx, rem) {
          if (idx === nums.length) return rem === 0 ? 1 : 0;
          return helper(idx + 1, rem - nums[idx]) + helper(idx + 1, rem + nums[idx]);
        }
        steps.push({
          stepId: 0, lineNumbers: [1, 2],
          shortLabel: "Start recursion",
          explanation: `Explore all 2^${nums.length} sign assignments for [${nums}] targeting ${target}.`,
          variables: { n: nums.length, target },
          dataStructure: { dpTable: [], dpHighlight2D: null },
          delta: {}, isAnswer: false,
        });
        const result = helper(0, target);
        steps.push({
          stepId: 1, lineNumbers: [5, 6],
          shortLabel: `Result: ${result}`,
          explanation: `Found ${result} ways to assign +/- to reach target ${target}.`,
          variables: { result },
          dataStructure: { dpTable: [], dpHighlight2D: null },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "2D DP (Subset Sum Transform)",
      tier: "optimal",
      timeComplexity: "O(n * sum)",
      spaceComplexity: "O(n * sum)",
      idea: `Transform to subset sum: P = (target + totalSum) / 2. Then dp[i][j] = number of ways
        to pick from first i elements to sum to j. dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i-1]].`,

      javaCode: `public int findTargetSumWays(int[] nums, int target) {
    int totalSum = 0;
    for (int num : nums) totalSum += num;
    if ((target + totalSum) % 2 != 0 || Math.abs(target) > totalSum) return 0;
    int subsetSum = (target + totalSum) / 2;

    int n = nums.length;
    int[][] dp = new int[n + 1][subsetSum + 1];
    dp[0][0] = 1;

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= subsetSum; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j >= nums[i - 1]) {
                dp[i][j] += dp[i - 1][j - nums[i - 1]];
            }
        }
    }

    return dp[n][subsetSum];
}`,

      cppCode: `int findTargetSumWays(vector<int>& nums, int target) {
    int totalSum = 0;
    for (int num : nums) totalSum += num;
    if ((target + totalSum) % 2 != 0 || abs(target) > totalSum) return 0;
    int subsetSum = (target + totalSum) / 2;

    int n = nums.size();
    vector<vector<int>> dp(n + 1, vector<int>(subsetSum + 1, 0));
    dp[0][0] = 1;

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= subsetSum; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j >= nums[i - 1]) {
                dp[i][j] += dp[i - 1][j - nums[i - 1]];
            }
        }
    }

    return dp[n][subsetSum];
}`,

      pythonCode: `def findTargetSumWays(nums: List[int], target: int) -> int:
    total_sum = sum(nums)
    if (target + total_sum) % 2 != 0 or abs(target) > total_sum:
        return 0
    subset_sum = (target + total_sum) // 2

    n = len(nums)
    dp = [[0] * (subset_sum + 1) for _ in range(n + 1)]
    dp[0][0] = 1

    for i in range(1, n + 1):
        for j in range(0, subset_sum + 1):
            dp[i][j] = dp[i - 1][j]
            if j >= nums[i - 1]:
                dp[i][j] += dp[i - 1][j - nums[i - 1]]

    return dp[n][subset_sum]`,

      lineAnnotations: {
        2: "Compute total sum of all numbers",
        3: "Check if target is achievable (must be even parity)",
        4: "Transform: subset sum = (target + totalSum) / 2",
        7: "Create DP table: rows = elements, cols = subset sums",
        8: "Base case: 1 way to make sum 0 with 0 elements",
        10: "For each element",
        11: "For each possible sum",
        12: "Don't include current element: inherit row above",
        13: "If current element fits",
        14: "Include it: add ways from complementary sum",
        19: "Answer at dp[n][subsetSum]",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Five 1s, target=3 — subset sum transform",
          input: { nums: [1, 1, 1, 1, 1], target: 3 },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3, 4],
              shortLabel: "Transform to subset sum",
              explanation: "totalSum = 5, target = 3. subsetSum = (3+5)/2 = 4. We need to find the number of subsets of [1,1,1,1,1] that sum to 4. This is equivalent to choosing 4 elements to be positive and 1 to be negative.",
              variables: { totalSum: 5, target: 3, subsetSum: 4 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 0, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10, 11, 12, 13, 14],
              shortLabel: "Row 1 (nums[0]=1)",
              explanation: "Element 1: dp[1][0] = dp[0][0] = 1 (skip). dp[1][1] = dp[0][1](0) + dp[0][0](1) = 1 (include). dp[1][2..4] = 0.",
              variables: { i: 1, "nums[0]": 1 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0],
                  [1, 1, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 1, col: 1 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [10, 11, 12, 13, 14],
              shortLabel: "Row 2 (nums[1]=1)",
              explanation: "Second 1: dp[2][0]=1, dp[2][1]=2 (skip or include), dp[2][2]=1 (include both). Now 2 ways to pick 1 item from two 1s, and 1 way to pick both.",
              variables: { i: 2, "nums[1]": 1 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0],
                  [1, 1, 0, 0, 0],
                  [1, 2, 1, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 2, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [10, 11, 12, 13, 14],
              shortLabel: "Row 3 (nums[2]=1)",
              explanation: "Third 1: dp[3][0]=1, dp[3][1]=3, dp[3][2]=3, dp[3][3]=1. These are C(3,0), C(3,1), C(3,2), C(3,3) — binomial coefficients!",
              variables: { i: 3, "nums[2]": 1 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0],
                  [1, 1, 0, 0, 0],
                  [1, 2, 1, 0, 0],
                  [1, 3, 3, 1, 0],
                  [0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 3, col: 3 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [10, 11, 12, 13, 14],
              shortLabel: "Row 4 (nums[3]=1)",
              explanation: "Fourth 1: dp[4] = [1,4,6,4,1]. Pascal's triangle row 4! C(4,j) for j=0..4.",
              variables: { i: 4, "nums[3]": 1 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0],
                  [1, 1, 0, 0, 0],
                  [1, 2, 1, 0, 0],
                  [1, 3, 3, 1, 0],
                  [1, 4, 6, 4, 1],
                  [0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 4, col: 4 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [10, 11, 12, 13, 14],
              shortLabel: "Row 5 (nums[4]=1)",
              explanation: "Fifth 1: dp[5] = [1,5,10,10,5]. dp[5][4] = 5 = C(5,4). There are 5 ways to choose 4 elements from 5 to be positive.",
              variables: { i: 5, "nums[4]": 1 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0],
                  [1, 1, 0, 0, 0],
                  [1, 2, 1, 0, 0],
                  [1, 3, 3, 1, 0],
                  [1, 4, 6, 4, 1],
                  [1, 5, 10, 10, 5],
                ],
                dpHighlight2D: { row: 5, col: 4 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [19],
              shortLabel: "Return dp[5][4] = 5",
              explanation: "dp[5][4] = 5. There are 5 ways to assign +/- to [1,1,1,1,1] to reach target 3. Each corresponds to choosing which single 1 gets a minus sign.",
              variables: { answer: 5 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0],
                  [1, 1, 0, 0, 0],
                  [1, 2, 1, 0, 0],
                  [1, 3, 3, 1, 0],
                  [1, 4, 6, 4, 1],
                  [1, 5, 10, 10, 5],
                ],
                dpHighlight2D: { row: 5, col: 4 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Element",
          description: "Only one number — tests base case",
          input: { nums: [1], target: 1 },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3, 4],
              shortLabel: "Transform",
              explanation: "totalSum=1, target=1. subsetSum = (1+1)/2 = 1. Find subsets of [1] summing to 1.",
              variables: { totalSum: 1, target: 1, subsetSum: 1 },
              dataStructure: {
                dpTable: [[1, 0], [0, 0]],
                dpHighlight2D: { row: 0, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10, 11, 12],
              shortLabel: "dp[1][0] = 1",
              explanation: "Skip num[0]=1: dp[1][0] = dp[0][0] = 1. One way to have sum 0: take nothing.",
              variables: { i: 1, j: 0, "dp[1][0]": 1 },
              dataStructure: {
                dpTable: [[1, 0], [1, 0]],
                dpHighlight2D: { row: 1, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [12, 13, 14],
              shortLabel: "dp[1][1] = 1",
              explanation: "dp[1][1] = dp[0][1](0) + dp[0][0](1) = 1. One way to reach sum 1: include the single 1.",
              variables: { i: 1, j: 1, "dp[1][1]": 1 },
              dataStructure: {
                dpTable: [[1, 0], [1, 1]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 0, c: 1 }, to: { r: 1, c: 1 } }, { from: { r: 0, c: 0 }, to: { r: 1, c: 1 } }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [19],
              shortLabel: "Return 1",
              explanation: "dp[1][1] = 1. Only one way: assign + to the single 1. Result: +1 = 1 = target.",
              variables: { answer: 1 },
              dataStructure: {
                dpTable: [[1, 0], [1, 1]],
                dpHighlight2D: { row: 1, col: 1 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, target }) {
        const steps = [];
        const totalSum = nums.reduce((a, b) => a + b, 0);

        if ((target + totalSum) % 2 !== 0 || Math.abs(target) > totalSum) {
          steps.push({
            stepId: 0, lineNumbers: [2, 3],
            shortLabel: "Impossible",
            explanation: `totalSum=${totalSum}, target=${target}. (target+totalSum)=${target + totalSum} is ${(target + totalSum) % 2 !== 0 ? 'odd' : 'out of range'}. No valid assignments exist.`,
            variables: { totalSum, target, answer: 0 },
            dataStructure: { dpTable: [], dpHighlight2D: null },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const subsetSum = (target + totalSum) / 2;
        const n = nums.length;
        const dp = Array.from({ length: n + 1 }, () => new Array(subsetSum + 1).fill(0));
        dp[0][0] = 1;

        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4, 7, 8],
          shortLabel: "Transform & init",
          explanation: `totalSum=${totalSum}, subsetSum=(${target}+${totalSum})/2=${subsetSum}. Create ${n + 1}x${subsetSum + 1} DP table.`,
          variables: { totalSum, target, subsetSum, n },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: 0, col: 0 } },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i <= n; i++) {
          for (let j = 0; j <= subsetSum; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j >= nums[i - 1]) {
              dp[i][j] += dp[i - 1][j - nums[i - 1]];
            }
          }
          steps.push({
            stepId: steps.length, lineNumbers: [10, 11, 12, 13, 14],
            shortLabel: `Row ${i} (nums[${i - 1}]=${nums[i - 1]})`,
            explanation: `After processing element ${nums[i - 1]}: row ${i} = [${dp[i].join(',')}].`,
            variables: { i, "nums[i-1]": nums[i - 1], row: `[${dp[i].join(',')}]` },
            dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: i, col: subsetSum } },
            delta: {}, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [19],
          shortLabel: `Return ${dp[n][subsetSum]}`,
          explanation: `dp[${n}][${subsetSum}] = ${dp[n][subsetSum]}. There are ${dp[n][subsetSum]} ways to assign +/- signs.`,
          variables: { answer: dp[n][subsetSum] },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: n, col: subsetSum } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(2^n)", space: "O(n)", explanation: "Explore all 2^n sign assignments" },
    optimal: { time: "O(n * sum)", space: "O(n * sum)", explanation: "Fill (n+1) x (subsetSum+1) table once", tradeoff: "Mathematical transformation eliminates negative indices, enabling standard DP" },
  },

  interviewTips: [
    "Start by explaining the brute force: 2^n sign assignments.",
    "Show the key mathematical transformation: P - N = target, P + N = total, so P = (target+total)/2.",
    "Immediately check edge cases: (target+total) must be non-negative and even.",
    "Explain this is now standard 0/1 knapsack (subset sum counting).",
    "Mention the 1D space optimization: iterate j from subsetSum down to nums[i].",
  ],

  relatedProblems: ["coin-change-ii", "subsets", "partition-equal-subset-sum"],
};
