export const houseRobberII = {
  id: 102,
  slug: "house-robber-ii",
  title: "House Robber II",
  difficulty: "Medium",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 4,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Google", "Microsoft", "Adobe", "Goldman Sachs"],
  leetcodeLink: "https://leetcode.com/problems/house-robber-ii/",

  pattern: "Circular Adjacent Exclusion DP",
  patternExplanation: `When houses are arranged in a circle, the first and last houses are adjacent.
    Break the circular constraint by running House Robber twice: once excluding the last house,
    once excluding the first house, and taking the maximum of both results.`,

  intuition: {
    coreInsight: `The circular arrangement means house 0 and house n-1 are neighbors. If we rob
      house 0, we cannot rob house n-1, and vice versa. This means the answer is the maximum of
      two linear House Robber problems: rob(nums[0..n-2]) and rob(nums[1..n-1]). We reduce a
      circular problem to two linear problems we already know how to solve.`,

    mentalModel: `Imagine houses arranged in a ring. You can't rob two neighbors, and the ring
      connects the first and last house. Picture cutting the ring at one point — you get a line.
      But which point? Cut between house 0 and house n-1: either house 0 is IN your plan (so
      house n-1 is OUT), or house 0 is OUT (so house n-1 might be IN). Run the linear robber
      on both halves and pick the richer heist.`,

    whyNaiveFails: `Brute force tries all 2^n subsets, checking adjacency (including circular).
      For n=100, that's 2^100 subsets. Even the linear DP solution applied naively fails because
      it doesn't account for the circular constraint — it might rob both house 0 and house n-1.`,

    keyObservation: `The key insight is that house 0 and house n-1 can never both be robbed. So
      we split into two cases that together cover all valid combinations: (1) consider houses
      0..n-2 (house 0 might be robbed, n-1 excluded), (2) consider houses 1..n-1 (house n-1
      might be robbed, 0 excluded). The answer is max of both. For n=1, just return nums[0].`,
  },

  problem: `You are a professional robber planning to rob houses along a street. Each house has
    a certain amount of money stashed. All houses at this place are arranged in a circle. That
    means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a
    security system connected, and it will automatically contact the police if two adjacent
    houses were broken into on the same night. Given an integer array nums representing the
    amount of money of each house, return the maximum amount of money you can rob tonight
    without alerting the police.`,

  examples: [
    { input: "nums = [2,3,2]", output: "3", explanation: "Cannot rob house 0 and house 2 (they are adjacent in circle). Rob house 1 = 3." },
    { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 0 (1) and house 2 (3) = 4." },
    { input: "nums = [1,2,3]", output: "3", explanation: "Rob house 1 = 3, or rob house 2 = 3." },
  ],

  constraints: [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 1000",
  ],

  approaches: {
    brute: {
      label: "Brute Force (All Subsets)",
      tier: "brute",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: "Try every subset of non-adjacent houses respecting the circular constraint. Return the maximum sum.",

      javaCode: `public int rob(int[] nums) {
    int n = nums.length;
    if (n == 1) return nums[0];
    return Math.max(
        robLinear(nums, 0, n - 2),
        robLinear(nums, 1, n - 1));
}

private int robLinear(int[] nums, int lo, int hi) {
    if (lo > hi) return 0;
    return Math.max(
        robLinear(nums, lo + 1, hi),
        nums[lo] + robLinear(nums, lo + 2, hi));
}`,

      cppCode: `int robLinear(vector<int>& nums, int lo, int hi) {
    if (lo > hi) return 0;
    return max(robLinear(nums, lo + 1, hi),
               nums[lo] + robLinear(nums, lo + 2, hi));
}

int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 1) return nums[0];
    return max(robLinear(nums, 0, n - 2),
               robLinear(nums, 1, n - 1));
}`,

      pythonCode: `def rob(nums: List[int]) -> int:
    if len(nums) == 1:
        return nums[0]

    def rob_linear(lo, hi):
        if lo > hi:
            return 0
        return max(rob_linear(lo + 1, hi),
                   nums[lo] + rob_linear(lo + 2, hi))

    return max(rob_linear(0, len(nums) - 2),
               rob_linear(1, len(nums) - 1))`,

      lineAnnotations: {
        2: "Single house edge case",
        3: "Split into two linear problems",
        4: "Case 1: exclude last house",
        5: "Case 2: exclude first house",
        9: "Linear house robber recursion",
        10: "Base case: no houses in range",
        11: "Skip this house",
        12: "Rob this house, skip next",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [2, 3, 2] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2, 3],
              shortLabel: "Split circular into two ranges",
              explanation: "Houses [2,3,2] are in a circle. House 0 and house 2 are adjacent. We split into: range [0..1] and range [1..2].",
              variables: { n: 3, range1: "[0..1]", range2: "[1..2]" },
              dataStructure: {
                dpArray: [null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "max(rob(0..1), rob(1..2))",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Range [0..1]: max = 3",
              explanation: "Rob houses 0..1 linearly: house 0 = 2, house 1 = 3. Can't take both (adjacent). max(2, 3) = 3.",
              variables: { range: "[0..1]", result1: 3 },
              dataStructure: {
                dpArray: [2, 3, null],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "rob(0..1) = max(2, 3) = 3",
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "Range [1..2]: max = 3",
              explanation: "Rob houses 1..2 linearly: house 1 = 3, house 2 = 2. Can't take both (adjacent). max(3, 2) = 3.",
              variables: { range: "[1..2]", result2: 3 },
              dataStructure: {
                dpArray: [null, 3, 2],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "rob(1..2) = max(3, 2) = 3",
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3],
              shortLabel: "Answer: max(3, 3) = 3",
              explanation: "max(range1=3, range2=3) = 3. The best we can do is rob house 1 for 3.",
              variables: { result1: 3, result2: 3, answer: 3 },
              dataStructure: {
                dpArray: [2, 3, 2],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "Answer: max(3, 3) = 3",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: null,
    },

    better: null,

    optimal: {
      label: "Two-Pass Linear DP",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Run House Robber I twice: once on nums[0..n-2] (excluding last), once on nums[1..n-1]
        (excluding first). Return the max. Each pass uses O(1) space with two variables.`,

      javaCode: `public int rob(int[] nums) {
    int n = nums.length;
    if (n == 1) return nums[0];
    return Math.max(
        robRange(nums, 0, n - 2),
        robRange(nums, 1, n - 1));
}

private int robRange(int[] nums, int lo, int hi) {
    int prev2 = 0, prev1 = 0;
    for (int i = lo; i <= hi; i++) {
        int curr = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,

      cppCode: `int robRange(vector<int>& nums, int lo, int hi) {
    int prev2 = 0, prev1 = 0;
    for (int i = lo; i <= hi; i++) {
        int curr = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 1) return nums[0];
    return max(robRange(nums, 0, n - 2),
               robRange(nums, 1, n - 1));
}`,

      pythonCode: `def rob(nums: List[int]) -> int:
    if len(nums) == 1:
        return nums[0]

    def rob_range(lo, hi):
        prev2 = prev1 = 0
        for i in range(lo, hi + 1):
            curr = max(prev1, prev2 + nums[i])
            prev2 = prev1
            prev1 = curr
        return prev1

    return max(rob_range(0, len(nums) - 2),
               rob_range(1, len(nums) - 1))`,

      lineAnnotations: {
        2: "Handle single house edge case",
        3: "Take the better of two linear passes",
        4: "Pass 1: houses 0 to n-2 (exclude last)",
        5: "Pass 2: houses 1 to n-1 (exclude first)",
        9: "Standard House Robber on a sub-range",
        10: "Two rolling variables",
        11: "Iterate through the range",
        12: "Skip (prev1) or rob (prev2 + nums[i])",
        13: "Shift window",
        14: "Update best",
        16: "Return best for this range",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Four houses in a circle — classic split into two ranges",
          input: { nums: [1, 2, 3, 1] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Split into two ranges",
              explanation: "Houses [1,2,3,1] form a circle. House 0 and house 3 are adjacent. We solve two linear problems: range [0..2] and range [1..3].",
              variables: { n: 4, range1: "[0..2]", range2: "[1..3]" },
              dataStructure: {
                dpArray: [null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "max(rob(0..2), rob(1..3))",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 10, 11, 12],
              shortLabel: "Pass 1, house 0: max(0, 0+1) = 1",
              explanation: "Range [0..2], house 0 (value=1): skip=0, rob=0+1=1. max(0,1)=1.",
              variables: { pass: 1, i: 0, "nums[i]": 1, prev2: 0, prev1: 0, curr: 1 },
              dataStructure: {
                dpArray: [1, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "Pass 1: dp[0] = 1",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "Pass 1, house 1: max(1, 0+2) = 2",
              explanation: "Range [0..2], house 1 (value=2): skip=1, rob=0+2=2. max(1,2)=2.",
              variables: { pass: 1, i: 1, "nums[i]": 2, prev2: 0, prev1: 1, curr: 2 },
              dataStructure: {
                dpArray: [1, 2, null, null],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "Pass 1: dp[1] = 2",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11, 12],
              shortLabel: "Pass 1, house 2: max(2, 1+3) = 4",
              explanation: "Range [0..2], house 2 (value=3): skip=2, rob=1+3=4. max(2,4)=4. Rob houses 0 and 2.",
              variables: { pass: 1, i: 2, "nums[i]": 3, prev2: 1, prev1: 2, curr: 4, result1: 4 },
              dataStructure: {
                dpArray: [1, 2, 4, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
                dpFormula: "Pass 1 result: 4",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 10, 11, 12],
              shortLabel: "Pass 2, house 1: max(0, 0+2) = 2",
              explanation: "Range [1..3], house 1 (value=2): skip=0, rob=0+2=2. max(0,2)=2.",
              variables: { pass: 2, i: 1, "nums[i]": 2, prev2: 0, prev1: 0, curr: 2 },
              dataStructure: {
                dpArray: [null, 2, null, null],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "Pass 2: dp[1] = 2",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 12],
              shortLabel: "Pass 2, house 2: max(2, 0+3) = 3",
              explanation: "Range [1..3], house 2 (value=3): skip=2, rob=0+3=3. max(2,3)=3.",
              variables: { pass: 2, i: 2, "nums[i]": 3, prev2: 0, prev1: 2, curr: 3 },
              dataStructure: {
                dpArray: [null, 2, 3, null],
                dpHighlight: 2,
                dpArrows: [],
                dpFormula: "Pass 2: dp[2] = 3",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12],
              shortLabel: "Pass 2, house 3: max(3, 2+1) = 3",
              explanation: "Range [1..3], house 3 (value=1): skip=3, rob=2+1=3. max(3,3)=3. Tie — skip is fine.",
              variables: { pass: 2, i: 3, "nums[i]": 1, prev2: 2, prev1: 3, curr: 3, result2: 3 },
              dataStructure: {
                dpArray: [null, 2, 3, 3],
                dpHighlight: 3,
                dpArrows: [],
                dpFormula: "Pass 2 result: 3",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [3],
              shortLabel: "Answer: max(4, 3) = 4",
              explanation: "max(pass1=4, pass2=3) = 4. Rob houses 0 and 2 for 1+3=4. This avoids the circular adjacency constraint.",
              variables: { result1: 4, result2: 3, answer: 4 },
              dataStructure: {
                dpArray: [1, 2, 4, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Answer: max(4, 3) = 4",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single House",
          description: "Only one house — must rob it",
          input: { nums: [5] },
          expectedOutput: "5",
          commonMistake: "Forgetting the n==1 edge case. With the two-pass approach, both ranges would be empty if not handled.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "n=1 → return nums[0]",
              explanation: "Only one house. No adjacency constraint applies. Rob it for 5.",
              variables: { n: 1, "nums[0]": 5, answer: 5 },
              dataStructure: {
                dpArray: [5],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "Single house: return 5",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Three Houses",
          description: "Circular with 3 houses — can only rob one",
          input: { nums: [2, 3, 2] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Split: [0..1] and [1..2]",
              explanation: "Three houses in a circle. Every pair is adjacent! We can only rob one house. Split into range [0..1] and [1..2].",
              variables: { n: 3, range1: "[0..1]", range2: "[1..2]" },
              dataStructure: {
                dpArray: [null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "max(rob(0..1), rob(1..2))",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Pass 1: rob(0..1) = 3",
              explanation: "Range [0..1]: house 0=2, house 1=3. max(2,3)=3. Rob house 1.",
              variables: { pass: 1, result1: 3 },
              dataStructure: {
                dpArray: [2, 3, null],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "Pass 1: max(2, 3) = 3",
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "Pass 2: rob(1..2) = 3",
              explanation: "Range [1..2]: house 1=3, house 2=2. max(3,2)=3. Rob house 1.",
              variables: { pass: 2, result2: 3 },
              dataStructure: {
                dpArray: [null, 3, 2],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "Pass 2: max(3, 2) = 3",
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3],
              shortLabel: "Answer: max(3, 3) = 3",
              explanation: "max(3, 3) = 3. Best is to rob house 1 alone.",
              variables: { result1: 3, result2: 3, answer: 3 },
              dataStructure: {
                dpArray: [2, 3, 2],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "Answer: 3",
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

        if (n === 1) {
          steps.push({
            stepId: 0, lineNumbers: [2],
            shortLabel: `n=1 → return ${nums[0]}`,
            explanation: `Only one house. Rob it for ${nums[0]}.`,
            variables: { n: 1, "nums[0]": nums[0], answer: nums[0] },
            dataStructure: { dpArray: [nums[0]], dpHighlight: 0, dpArrows: [], dpFormula: `Single house: return ${nums[0]}` },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Split into two ranges",
          explanation: `Houses form a circle. Split into range [0..${n-2}] and [1..${n-1}].`,
          variables: { n, range1: `[0..${n-2}]`, range2: `[1..${n-1}]` },
          dataStructure: { dpArray: new Array(n).fill(null), dpHighlight: null, dpArrows: [], dpFormula: `max(rob(0..${n-2}), rob(1..${n-1}))` },
          delta: {}, isAnswer: false,
        });

        function robRange(lo, hi, passNum) {
          let prev2 = 0, prev1 = 0;
          const dp = new Array(n).fill(null);
          for (let i = lo; i <= hi; i++) {
            const curr = Math.max(prev1, prev2 + nums[i]);
            dp[i] = curr;
            const robbed = curr === prev2 + nums[i];
            const arrows = robbed && i >= lo + 2 ? [{ from: i - 2, to: i }] : [];
            steps.push({
              stepId: steps.length, lineNumbers: [11, 12],
              shortLabel: `Pass ${passNum}, house ${i}: max(${prev1}, ${prev2}+${nums[i]}) = ${curr}`,
              explanation: `Pass ${passNum}, house ${i} (value=${nums[i]}): skip=${prev1}, rob=${prev2}+${nums[i]}=${prev2+nums[i]}. max=${curr}. ${robbed ? 'Rob' : 'Skip'}.`,
              variables: { pass: passNum, i, "nums[i]": nums[i], prev2, prev1, curr },
              dataStructure: { dpArray: [...dp], dpHighlight: i, dpArrows: arrows, dpFormula: `Pass ${passNum}: dp[${i}] = ${curr}` },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
            prev2 = prev1;
            prev1 = curr;
          }
          return prev1;
        }

        const result1 = robRange(0, n - 2, 1);
        const result2 = robRange(1, n - 1, 2);
        const answer = Math.max(result1, result2);

        steps.push({
          stepId: steps.length, lineNumbers: [3],
          shortLabel: `Answer: max(${result1}, ${result2}) = ${answer}`,
          explanation: `max(pass1=${result1}, pass2=${result2}) = ${answer}.`,
          variables: { result1, result2, answer },
          dataStructure: { dpArray: new Array(n).fill(null), dpHighlight: null, dpArrows: [], dpFormula: `Answer: max(${result1}, ${result2}) = ${answer}` },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(2^n)", space: "O(n)", explanation: "Exponential recursive subsets" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Two linear passes, each O(n) with O(1) space", tradeoff: "Reduces circular to two linear passes; same asymptotic cost as House Robber I" },
  },

  interviewTips: [
    "Immediately mention the circular constraint: first and last houses are adjacent.",
    "Explain the decomposition: max(rob(0..n-2), rob(1..n-1)).",
    "Handle n=1 as a special case before the split.",
    "This is House Robber I applied twice — reference the linear version.",
    "Mention that the O(1) space optimization still applies to each pass.",
  ],

  relatedProblems: ["house-robber", "climbing-stairs", "min-cost-climbing-stairs"],
};
