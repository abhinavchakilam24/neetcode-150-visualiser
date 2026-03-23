export const minCostClimbingStairs = {
  id: 100,
  slug: "min-cost-climbing-stairs",
  title: "Min Cost Climbing Stairs",
  difficulty: "Easy",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 2,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Google", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/min-cost-climbing-stairs/",

  pattern: "Bottom-Up DP with Two Variables",
  patternExplanation: `Classic 1D DP where each state depends on the previous two states.
    Since we only look back two positions, we can optimize from an O(n) array to O(1) space
    using two rolling variables.`,

  intuition: {
    coreInsight: `At every stair i, we had to arrive from either stair i-1 or stair i-2.
      The minimum cost to reach stair i is the cheaper of those two options plus cost[i].
      This gives us the recurrence dp[i] = cost[i] + min(dp[i-1], dp[i-2]). We build the
      answer from the bottom up, and the final answer is min(dp[n-1], dp[n-2]) since we
      can step over the top from either of the last two stairs.`,

    mentalModel: `Imagine climbing a staircase where each step has a toll booth. You can
      take one or two steps at a time. At each toll booth, you look back at the two booths
      behind you and think: "Which path cost me less to get here?" You always pick the
      cheaper history, pay the current toll, and move on. By the time you reach the top,
      you've automatically found the cheapest route.`,

    whyNaiveFails: `A recursive approach without memoization re-computes the same subproblems
      exponentially. For stair n, we compute stair n-1 and n-2. Each of those computes two
      more. This creates a binary tree of calls — O(2^n) time. For n=1000, that's astronomical.
      DP computes each stair exactly once in O(n).`,

    keyObservation: `We can start climbing from either step 0 or step 1 (both are free entry
      points). The "top of the floor" is BEYOND the last step — so the answer is
      min(dp[n-1], dp[n-2]), not just dp[n-1]. This is the most common mistake.`,
  },

  problem: `You are given an integer array cost where cost[i] is the cost of the ith step
    on a staircase. Once you pay the cost, you can either climb one or two steps. You can
    either start from the step with index 0, or the step with index 1. Return the minimum
    cost to reach the top of the floor.`,

  examples: [
    { input: "cost = [10,15,20]", output: "15", explanation: "Start at index 1, pay 15, climb two steps to the top." },
    { input: "cost = [1,100,1,1,1,100,1,1,100,1]", output: "6", explanation: "Pay costs at indices 0, 2, 4, 6, 7, 9 for a total of 6." },
  ],

  constraints: [
    "2 <= cost.length <= 1000",
    "0 <= cost[i] <= 999",
  ],

  approaches: {
    brute: {
      label: "Recursive (Top-Down without Memo)",
      tier: "brute",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: "Recursively compute the minimum cost to reach each step. Without memoization, this re-computes subproblems exponentially.",

      javaCode: `public int minCostClimbingStairs(int[] cost) {
    int n = cost.length;
    return Math.min(helper(cost, n - 1), helper(cost, n - 2));
}

private int helper(int[] cost, int i) {
    if (i < 0) return 0;
    if (i == 0 || i == 1) return cost[i];
    return cost[i] + Math.min(helper(cost, i - 1), helper(cost, i - 2));
}`,

      cppCode: `int helper(vector<int>& cost, int i) {
    if (i < 0) return 0;
    if (i == 0 || i == 1) return cost[i];
    return cost[i] + min(helper(cost, i - 1), helper(cost, i - 2));
}

int minCostClimbingStairs(vector<int>& cost) {
    int n = cost.size();
    return min(helper(cost, n - 1), helper(cost, n - 2));
}`,

      pythonCode: `def minCostClimbingStairs(cost: List[int]) -> int:
    def helper(i):
        if i < 0:
            return 0
        if i == 0 or i == 1:
            return cost[i]
        return cost[i] + min(helper(i - 1), helper(i - 2))

    n = len(cost)
    return min(helper(n - 1), helper(n - 2))`,

      lineAnnotations: {
        2: "Start from the top — we can reach top from n-1 or n-2",
        3: "Take the cheaper of the two final stairs",
        7: "Base cases: step 0 or 1 costs just cost[i]",
        8: "Recurrence: cost[i] + min of two previous stairs",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { cost: [10, 15, 20] },
          expectedOutput: "15",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Start recursion",
              explanation: "We want min(helper(2), helper(1)) — the minimum cost to reach the top from either of the last two stairs.",
              variables: { n: 3, "goal": "min(helper(2), helper(1))" },
              dataStructure: {
                dpArray: [null, null, null],
                dpHighlight: null,
                dpArrows: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7],
              shortLabel: "Base: dp[0] = 10",
              explanation: "helper(0) returns cost[0] = 10. This is a base case — the cost to be on step 0 is just 10.",
              variables: { i: 0, "cost[i]": 10, "dp[0]": 10 },
              dataStructure: {
                dpArray: [10, null, null],
                dpHighlight: 0,
                dpArrows: [],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7],
              shortLabel: "Base: dp[1] = 15",
              explanation: "helper(1) returns cost[1] = 15. Another base case.",
              variables: { i: 1, "cost[i]": 15, "dp[1]": 15 },
              dataStructure: {
                dpArray: [10, 15, null],
                dpHighlight: 1,
                dpArrows: [],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8],
              shortLabel: "dp[2] = 20 + min(15, 10) = 30",
              explanation: "helper(2) = cost[2] + min(helper(1), helper(0)) = 20 + min(15, 10) = 20 + 10 = 30.",
              variables: { i: 2, "cost[i]": 20, "dp[i-1]": 15, "dp[i-2]": 10, "dp[2]": 30 },
              dataStructure: {
                dpArray: [10, 15, 30],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3],
              shortLabel: "Answer: min(30, 15) = 15",
              explanation: "min(helper(2), helper(1)) = min(30, 15) = 15. Start at step 1, pay 15, jump two steps to the top.",
              variables: { "dp[n-1]": 30, "dp[n-2]": 15, answer: 15 },
              dataStructure: {
                dpArray: [10, 15, 30],
                dpHighlight: 1,
                dpArrows: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ cost }) {
        const steps = [];
        const n = cost.length;
        const dp = new Array(n).fill(null);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Start recursion",
          explanation: `We want min(helper(${n-1}), helper(${n-2})) — the minimum cost from either of the last two stairs.`,
          variables: { n, goal: `min(helper(${n-1}), helper(${n-2}))` },
          dataStructure: { dpArray: [...dp], dpHighlight: null, dpArrows: [] },
          delta: {}, isAnswer: false,
        });

        dp[0] = cost[0];
        steps.push({
          stepId: 1, lineNumbers: [7],
          shortLabel: `Base: dp[0] = ${cost[0]}`,
          explanation: `helper(0) = cost[0] = ${cost[0]}.`,
          variables: { i: 0, "cost[i]": cost[0], "dp[0]": dp[0] },
          dataStructure: { dpArray: [...dp], dpHighlight: 0, dpArrows: [] },
          delta: { changedIndices: [0] }, isAnswer: false,
        });

        dp[1] = cost[1];
        steps.push({
          stepId: 2, lineNumbers: [7],
          shortLabel: `Base: dp[1] = ${cost[1]}`,
          explanation: `helper(1) = cost[1] = ${cost[1]}.`,
          variables: { i: 1, "cost[i]": cost[1], "dp[1]": dp[1] },
          dataStructure: { dpArray: [...dp], dpHighlight: 1, dpArrows: [] },
          delta: { changedIndices: [1] }, isAnswer: false,
        });

        for (let i = 2; i < n; i++) {
          dp[i] = cost[i] + Math.min(dp[i-1], dp[i-2]);
          const fromIdx = dp[i-1] <= dp[i-2] ? i-1 : i-2;
          steps.push({
            stepId: steps.length, lineNumbers: [8],
            shortLabel: `dp[${i}] = ${cost[i]} + min(${dp[i-1]}, ${dp[i-2]}) = ${dp[i]}`,
            explanation: `helper(${i}) = cost[${i}] + min(dp[${i-1}], dp[${i-2}]) = ${cost[i]} + min(${dp[i-1]}, ${dp[i-2]}) = ${dp[i]}.`,
            variables: { i, "cost[i]": cost[i], "dp[i-1]": dp[i-1], "dp[i-2]": dp[i-2], [`dp[${i}]`]: dp[i] },
            dataStructure: { dpArray: [...dp], dpHighlight: i, dpArrows: [{ from: fromIdx, to: i }] },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        const answer = Math.min(dp[n-1], dp[n-2]);
        const answerIdx = dp[n-1] <= dp[n-2] ? n-1 : n-2;
        steps.push({
          stepId: steps.length, lineNumbers: [3],
          shortLabel: `Answer: min(${dp[n-1]}, ${dp[n-2]}) = ${answer}`,
          explanation: `min(dp[${n-1}], dp[${n-2}]) = min(${dp[n-1]}, ${dp[n-2]}) = ${answer}.`,
          variables: { "dp[n-1]": dp[n-1], "dp[n-2]": dp[n-2], answer },
          dataStructure: { dpArray: [...dp], dpHighlight: answerIdx, dpArrows: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Bottom-Up DP (O(1) Space)",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Build dp bottom-up. Since dp[i] only depends on dp[i-1] and dp[i-2], we only
        need two variables instead of an array. The answer is min(prev1, prev2) after the loop.`,

      javaCode: `public int minCostClimbingStairs(int[] cost) {
    int n = cost.length;
    int prev2 = cost[0];
    int prev1 = cost[1];

    for (int i = 2; i < n; i++) {
        int curr = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = curr;
    }

    return Math.min(prev1, prev2);
}`,

      cppCode: `int minCostClimbingStairs(vector<int>& cost) {
    int n = cost.size();
    int prev2 = cost[0];
    int prev1 = cost[1];

    for (int i = 2; i < n; i++) {
        int curr = cost[i] + min(prev1, prev2);
        prev2 = prev1;
        prev1 = curr;
    }

    return min(prev1, prev2);
}`,

      pythonCode: `def minCostClimbingStairs(cost: List[int]) -> int:
    n = len(cost)
    prev2 = cost[0]
    prev1 = cost[1]

    for i in range(2, n):
        curr = cost[i] + min(prev1, prev2)
        prev2 = prev1
        prev1 = curr

    return min(prev1, prev2)`,

      lineAnnotations: {
        2: "Get the length of the cost array",
        3: "prev2 = dp[0] = cost of first step",
        4: "prev1 = dp[1] = cost of second step",
        6: "Iterate from step 2 to the end",
        7: "Current step cost + cheaper of two previous paths",
        8: "Shift window: old prev1 becomes new prev2",
        9: "Shift window: curr becomes new prev1",
        11: "Answer: cheaper of the last two stairs to reach the top",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Simple 3-step staircase",
          input: { cost: [10, 15, 20] },
          expectedOutput: "15",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4],
              shortLabel: "Init prev2=10, prev1=15",
              explanation: "Initialize: prev2 = cost[0] = 10, prev1 = cost[1] = 15. These represent the minimum cost to stand on steps 0 and 1 respectively.",
              variables: { prev2: 10, prev1: 15, n: 3 },
              dataStructure: {
                dpArray: [10, 15, null],
                dpHighlight: null,
                dpArrows: [],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7],
              shortLabel: "i=2: curr = 20 + min(15,10) = 30",
              explanation: "At step 2: cost[2]=20. We can arrive from step 1 (cost 15) or step 0 (cost 10). min(15,10)=10. curr = 20 + 10 = 30.",
              variables: { i: 2, "cost[i]": 20, prev1: 15, prev2: 10, curr: 30 },
              dataStructure: {
                dpArray: [10, 15, 30],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9],
              shortLabel: "Shift: prev2=15, prev1=30",
              explanation: "Shift the rolling window: prev2 = 15, prev1 = 30. We've processed all stairs.",
              variables: { prev2: 15, prev1: 30 },
              dataStructure: {
                dpArray: [10, 15, 30],
                dpHighlight: null,
                dpArrows: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11],
              shortLabel: "Answer: min(30, 15) = 15",
              explanation: "The top of the floor is beyond the last step. We can reach it from step 1 (cost 15) or step 2 (cost 30). min(30, 15) = 15. Start at step 1, pay 15, jump two steps to the top.",
              variables: { prev1: 30, prev2: 15, answer: 15 },
              dataStructure: {
                dpArray: [10, 15, 30],
                dpHighlight: 1,
                dpArrows: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Longer Staircase",
          description: "A longer staircase with varied costs",
          input: { cost: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4],
              shortLabel: "Init prev2=1, prev1=100",
              explanation: "Initialize: prev2 = cost[0] = 1, prev1 = cost[1] = 100. Step 0 is very cheap, step 1 is expensive.",
              variables: { prev2: 1, prev1: 100, n: 10 },
              dataStructure: {
                dpArray: [1, 100, null, null, null, null, null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=2: curr = 1 + min(100,1) = 2",
              explanation: "cost[2]=1. min(prev1=100, prev2=1) = 1. curr = 1 + 1 = 2. It's cheaper to skip step 1 entirely.",
              variables: { i: 2, "cost[i]": 1, prev1: 100, prev2: 1, curr: 2 },
              dataStructure: {
                dpArray: [1, 100, 2, null, null, null, null, null, null, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=3: curr = 1 + min(2,100) = 3",
              explanation: "cost[3]=1. min(prev1=2, prev2=100) = 2. curr = 1 + 2 = 3.",
              variables: { i: 3, "cost[i]": 1, prev1: 2, prev2: 100, curr: 3 },
              dataStructure: {
                dpArray: [1, 100, 2, 3, null, null, null, null, null, null],
                dpHighlight: 3,
                dpArrows: [{ from: 2, to: 3 }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=4: curr = 1 + min(3,2) = 3",
              explanation: "cost[4]=1. min(prev1=3, prev2=2) = 2. curr = 1 + 2 = 3.",
              variables: { i: 4, "cost[i]": 1, prev1: 3, prev2: 2, curr: 3 },
              dataStructure: {
                dpArray: [1, 100, 2, 3, 3, null, null, null, null, null],
                dpHighlight: 4,
                dpArrows: [{ from: 2, to: 4 }],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=5: curr = 100 + min(3,3) = 103",
              explanation: "cost[5]=100. min(prev1=3, prev2=3) = 3. curr = 100 + 3 = 103. Expensive step!",
              variables: { i: 5, "cost[i]": 100, prev1: 3, prev2: 3, curr: 103 },
              dataStructure: {
                dpArray: [1, 100, 2, 3, 3, 103, null, null, null, null],
                dpHighlight: 5,
                dpArrows: [{ from: 3, to: 5 }],
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=6: curr = 1 + min(103,3) = 4",
              explanation: "cost[6]=1. min(prev1=103, prev2=3) = 3. curr = 1 + 3 = 4. We skip the expensive step 5.",
              variables: { i: 6, "cost[i]": 1, prev1: 103, prev2: 3, curr: 4 },
              dataStructure: {
                dpArray: [1, 100, 2, 3, 3, 103, 4, null, null, null],
                dpHighlight: 6,
                dpArrows: [{ from: 4, to: 6 }],
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=7: curr = 1 + min(4,103) = 5",
              explanation: "cost[7]=1. min(prev1=4, prev2=103) = 4. curr = 1 + 4 = 5.",
              variables: { i: 7, "cost[i]": 1, prev1: 4, prev2: 103, curr: 5 },
              dataStructure: {
                dpArray: [1, 100, 2, 3, 3, 103, 4, 5, null, null],
                dpHighlight: 7,
                dpArrows: [{ from: 6, to: 7 }],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=8: curr = 100 + min(5,4) = 104",
              explanation: "cost[8]=100. min(prev1=5, prev2=4) = 4. curr = 100 + 4 = 104. Another expensive step.",
              variables: { i: 8, "cost[i]": 100, prev1: 5, prev2: 4, curr: 104 },
              dataStructure: {
                dpArray: [1, 100, 2, 3, 3, 103, 4, 5, 104, null],
                dpHighlight: 8,
                dpArrows: [{ from: 6, to: 8 }],
              },
              delta: { changedIndices: [8] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=9: curr = 1 + min(104,5) = 6",
              explanation: "cost[9]=1. min(prev1=104, prev2=5) = 5. curr = 1 + 5 = 6. We skip the expensive step 8.",
              variables: { i: 9, "cost[i]": 1, prev1: 104, prev2: 5, curr: 6 },
              dataStructure: {
                dpArray: [1, 100, 2, 3, 3, 103, 4, 5, 104, 6],
                dpHighlight: 9,
                dpArrows: [{ from: 7, to: 9 }],
              },
              delta: { changedIndices: [9] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [11],
              shortLabel: "Answer: min(6, 104) = 6",
              explanation: "min(prev1=6, prev2=104) = 6. The optimal path avoids both expensive steps (100) by jumping over them.",
              variables: { prev1: 6, prev2: 104, answer: 6 },
              dataStructure: {
                dpArray: [1, 100, 2, 3, 3, 103, 4, 5, 104, 6],
                dpHighlight: 9,
                dpArrows: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ cost }) {
        const steps = [];
        const n = cost.length;
        const dp = new Array(n).fill(null);

        dp[0] = cost[0];
        dp[1] = cost[1];

        steps.push({
          stepId: 0, lineNumbers: [3, 4],
          shortLabel: `Init prev2=${cost[0]}, prev1=${cost[1]}`,
          explanation: `Initialize: prev2 = cost[0] = ${cost[0]}, prev1 = cost[1] = ${cost[1]}.`,
          variables: { prev2: dp[0], prev1: dp[1], n },
          dataStructure: { dpArray: [...dp], dpHighlight: null, dpArrows: [] },
          delta: { changedIndices: [0, 1] }, isAnswer: false,
        });

        for (let i = 2; i < n; i++) {
          dp[i] = cost[i] + Math.min(dp[i-1], dp[i-2]);
          const fromIdx = dp[i-1] <= dp[i-2] ? i-1 : i-2;
          steps.push({
            stepId: steps.length, lineNumbers: [6, 7, 8, 9],
            shortLabel: `i=${i}: curr = ${cost[i]} + min(${dp[i-1]}, ${dp[i-2]}) = ${dp[i]}`,
            explanation: `cost[${i}]=${cost[i]}. min(prev1=${dp[i-1]}, prev2=${dp[i-2]}) = ${Math.min(dp[i-1], dp[i-2])}. curr = ${cost[i]} + ${Math.min(dp[i-1], dp[i-2])} = ${dp[i]}.`,
            variables: { i, "cost[i]": cost[i], prev1: dp[i-1], prev2: dp[i-2], curr: dp[i] },
            dataStructure: { dpArray: [...dp], dpHighlight: i, dpArrows: [{ from: fromIdx, to: i }] },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        const answer = Math.min(dp[n-1], dp[n-2]);
        const answerIdx = dp[n-1] <= dp[n-2] ? n-1 : n-2;
        steps.push({
          stepId: steps.length, lineNumbers: [11],
          shortLabel: `Answer: min(${dp[n-1]}, ${dp[n-2]}) = ${answer}`,
          explanation: `min(dp[${n-1}]=${dp[n-1]}, dp[${n-2}]=${dp[n-2]}) = ${answer}.`,
          variables: { prev1: dp[n-1], prev2: dp[n-2], answer },
          dataStructure: { dpArray: [...dp], dpHighlight: answerIdx, dpArrows: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(2^n)", space: "O(n)", explanation: "Exponential recursive calls without memoization" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass with two rolling variables", tradeoff: "Bottom-up DP eliminates recursion overhead and reduces space from O(n) to O(1)" },
  },

  interviewTips: [
    "Clarify: 'Can I start from step 0 or step 1?' — yes, both are free entry points.",
    "Clarify: 'Is the top beyond the last step?' — yes, you need to step PAST the array.",
    "Start with the recurrence: dp[i] = cost[i] + min(dp[i-1], dp[i-2]).",
    "Mention the space optimization: since we only look back 2 steps, O(1) space suffices.",
    "Common mistake: returning dp[n-1] instead of min(dp[n-1], dp[n-2]).",
  ],

  relatedProblems: ["climbing-stairs", "house-robber"],
};
