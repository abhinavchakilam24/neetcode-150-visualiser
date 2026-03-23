export const climbingStairs = {
  id: 99,
  slug: "climbing-stairs",
  title: "Climbing Stairs",
  difficulty: "Easy",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 99,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Google", "Apple", "Adobe", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/climbing-stairs/",

  pattern: "Fibonacci-Style 1D DP",
  patternExplanation: `When the number of ways to reach state i depends only on the previous
    two states, the recurrence dp[i] = dp[i-1] + dp[i-2] applies — identical to Fibonacci.
    This pattern appears in stair-climbing, tiling, and many counting problems.`,

  intuition: {
    coreInsight: `To reach step i, you must have come from either step i-1 (one step) or step
      i-2 (two steps). So the total ways to reach step i = ways to reach (i-1) + ways to reach
      (i-2). This is exactly the Fibonacci sequence! dp[0]=1, dp[1]=1, and dp[i] = dp[i-1] + dp[i-2].`,

    mentalModel: `Imagine standing at the bottom of a staircase. At every step, you face a fork:
      take 1 step or take 2 steps. It's like a binary tree of decisions, but many paths converge
      at the same step. Instead of counting every full path (exponential), we count how many paths
      arrive at each step. The paths to step 5 = all paths that arrived at step 4 (then took 1)
      + all paths that arrived at step 3 (then took 2).`,

    whyNaiveFails: `Recursive brute force recomputes the same subproblems exponentially. To compute
      f(5), we compute f(4) + f(3). But f(4) = f(3) + f(2), so f(3) is computed twice. This
      cascades: f(n) has O(2^n) recursive calls. For n=45, that's over 1 billion calls.`,

    keyObservation: `The recurrence only depends on the last two values, so we don't even need
      a full array — just two variables. But the DP array is more intuitive for learning. The
      key insight is recognizing this IS Fibonacci: dp[i] = dp[i-1] + dp[i-2] with base cases
      dp[0] = dp[1] = 1.`,
  },

  problem: `You are climbing a staircase. It takes n steps to reach the top. Each time you can
    either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,

  examples: [
    { input: "n = 2", output: "2", explanation: "1+1 or 2. Two ways." },
    { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1. Three ways." },
    { input: "n = 5", output: "8", explanation: "There are 8 distinct ways to climb 5 steps." },
  ],

  constraints: [
    "1 <= n <= 45",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: "Recursively compute f(n) = f(n-1) + f(n-2) with base cases f(0) = f(1) = 1.",

      javaCode: `public int climbStairs(int n) {
    if (n <= 1) return 1;
    return climbStairs(n - 1) + climbStairs(n - 2);
}`,

      cppCode: `int climbStairs(int n) {
    if (n <= 1) return 1;
    return climbStairs(n - 1) + climbStairs(n - 2);
}`,

      pythonCode: `def climbStairs(n: int) -> int:
    if n <= 1:
        return 1
    return climbStairs(n - 1) + climbStairs(n - 2)`,

      lineAnnotations: {
        1: "Recursive function",
        2: "Base case: 1 way to stay at step 0 or reach step 1",
        3: "Recurse: ways = ways(n-1) + ways(n-2)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { n: 4 },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "climbStairs(4)",
              explanation: "Call climbStairs(4). This branches into climbStairs(3) + climbStairs(2). Exponential explosion begins.",
              variables: { n: 4, call: "f(4)" },
              dataStructure: {
                dpArray: [null, null, null, null, null],
                dpHighlight: 4,
                dpArrows: [],
                dpFormula: "f(4) = f(3) + f(2)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [2, 3],
              shortLabel: "Recursion tree explodes",
              explanation: "f(4) calls f(3) and f(2). f(3) calls f(2) and f(1). Notice f(2) is computed TWICE. This is the core inefficiency.",
              variables: { n: 4, "f(3)": "pending", "f(2)": "computed twice" },
              dataStructure: {
                dpArray: [1, 1, 2, null, null],
                dpHighlight: 2,
                dpArrows: [{from: 0, to: 2}, {from: 1, to: 2}],
                dpFormula: "f(2) = f(1) + f(0) = 1 + 1 = 2",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3],
              shortLabel: "Return 5",
              explanation: "Eventually all recursion resolves: f(0)=1, f(1)=1, f(2)=2, f(3)=3, f(4)=5. But we did far more work than needed.",
              variables: { n: 4, answer: 5 },
              dataStructure: {
                dpArray: [1, 1, 2, 3, 5],
                dpHighlight: 4,
                dpArrows: [{from: 2, to: 4}, {from: 3, to: 4}],
                dpFormula: "f(4) = f(3) + f(2) = 3 + 2 = 5",
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
      label: "Bottom-Up DP",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Build dp array bottom-up: dp[0]=1, dp[1]=1, then dp[i] = dp[i-1] + dp[i-2]
        for i from 2 to n. Return dp[n]. Each state computed exactly once.`,

      javaCode: `public int climbStairs(int n) {
    if (n <= 1) return 1;

    int[] dp = new int[n + 1];
    dp[0] = 1;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}`,

      cppCode: `int climbStairs(int n) {
    if (n <= 1) return 1;

    vector<int> dp(n + 1);
    dp[0] = 1;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}`,

      pythonCode: `def climbStairs(n: int) -> int:
    if n <= 1:
        return 1

    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]`,

      lineAnnotations: {
        1: "Handle trivial case",
        4: "Allocate DP array of size n+1",
        5: "Base case: 1 way to stand at step 0",
        6: "Base case: 1 way to reach step 1",
        8: "Fill dp array from step 2 to n",
        9: "Recurrence: ways to i = ways to (i-1) + ways to (i-2)",
        12: "Answer is dp[n] — ways to reach the top",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard (n=5)",
          description: "Classic Fibonacci-style fill from 0 to 5",
          input: { n: 5 },
          expectedOutput: "8",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5, 6],
              shortLabel: "Init dp[0]=1, dp[1]=1",
              explanation: "Create dp array of size 6. Set base cases: dp[0]=1 (one way to stay at ground), dp[1]=1 (one way to reach step 1 — take one step).",
              variables: { n: 5, i: "-", dp: "[1, 1, _, _, _, _]" },
              dataStructure: {
                dpArray: [1, 1, null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Base cases: dp[0] = 1, dp[1] = 1",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9],
              shortLabel: "dp[2] = dp[1] + dp[0] = 2",
              explanation: "i=2: To reach step 2, either come from step 1 (1 way) or step 0 (1 way). dp[2] = 1 + 1 = 2.",
              variables: { n: 5, i: 2, "dp[i-1]": 1, "dp[i-2]": 1, "dp[i]": 2 },
              dataStructure: {
                dpArray: [1, 1, 2, null, null, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }, { from: 1, to: 2 }],
                dpFormula: "dp[2] = dp[1] + dp[0] = 1 + 1 = 2",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9],
              shortLabel: "dp[3] = dp[2] + dp[1] = 3",
              explanation: "i=3: To reach step 3, come from step 2 (2 ways) or step 1 (1 way). dp[3] = 2 + 1 = 3.",
              variables: { n: 5, i: 3, "dp[i-1]": 2, "dp[i-2]": 1, "dp[i]": 3 },
              dataStructure: {
                dpArray: [1, 1, 2, 3, null, null],
                dpHighlight: 3,
                dpArrows: [{ from: 1, to: 3 }, { from: 2, to: 3 }],
                dpFormula: "dp[3] = dp[2] + dp[1] = 2 + 1 = 3",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9],
              shortLabel: "dp[4] = dp[3] + dp[2] = 5",
              explanation: "i=4: To reach step 4, come from step 3 (3 ways) or step 2 (2 ways). dp[4] = 3 + 2 = 5.",
              variables: { n: 5, i: 4, "dp[i-1]": 3, "dp[i-2]": 2, "dp[i]": 5 },
              dataStructure: {
                dpArray: [1, 1, 2, 3, 5, null],
                dpHighlight: 4,
                dpArrows: [{ from: 2, to: 4 }, { from: 3, to: 4 }],
                dpFormula: "dp[4] = dp[3] + dp[2] = 3 + 2 = 5",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 9],
              shortLabel: "dp[5] = dp[4] + dp[3] = 8",
              explanation: "i=5: To reach step 5, come from step 4 (5 ways) or step 3 (3 ways). dp[5] = 5 + 3 = 8.",
              variables: { n: 5, i: 5, "dp[i-1]": 5, "dp[i-2]": 3, "dp[i]": 8 },
              dataStructure: {
                dpArray: [1, 1, 2, 3, 5, 8],
                dpHighlight: 5,
                dpArrows: [{ from: 3, to: 5 }, { from: 4, to: 5 }],
                dpFormula: "dp[5] = dp[4] + dp[3] = 5 + 3 = 8",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12],
              shortLabel: "Return dp[5] = 8",
              explanation: "Return dp[5] = 8. There are 8 distinct ways to climb 5 steps. Notice the Fibonacci pattern: 1, 1, 2, 3, 5, 8.",
              variables: { n: 5, answer: 8 },
              dataStructure: {
                dpArray: [1, 1, 2, 3, 5, 8],
                dpHighlight: 5,
                dpArrows: [],
                dpFormula: "Answer: dp[5] = 8",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Minimal (n=1)",
          description: "Smallest non-trivial input — only one way",
          input: { n: 1 },
          expectedOutput: "1",
          commonMistake: "Forgetting the n <= 1 base case and trying to access dp[-1] or dp[0] - dp[-1].",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "n=1 → base case",
              explanation: "n=1, which is <= 1. Return 1 immediately. There's exactly one way to climb 1 step: take a single step.",
              variables: { n: 1, answer: 1 },
              dataStructure: {
                dpArray: [1, 1],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "Base case: n <= 1, return 1",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "n=3",
          description: "Small case to verify: 1+1+1, 1+2, 2+1 = 3 ways",
          input: { n: 3 },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5, 6],
              shortLabel: "Init dp[0]=1, dp[1]=1",
              explanation: "Create dp array of size 4. Set base cases: dp[0]=1, dp[1]=1.",
              variables: { n: 3, dp: "[1, 1, _, _]" },
              dataStructure: {
                dpArray: [1, 1, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Base cases: dp[0] = 1, dp[1] = 1",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9],
              shortLabel: "dp[2] = 1 + 1 = 2",
              explanation: "i=2: dp[2] = dp[1] + dp[0] = 1 + 1 = 2. Two ways: (1+1) or (2).",
              variables: { n: 3, i: 2, "dp[i]": 2 },
              dataStructure: {
                dpArray: [1, 1, 2, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }, { from: 1, to: 2 }],
                dpFormula: "dp[2] = dp[1] + dp[0] = 1 + 1 = 2",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9],
              shortLabel: "dp[3] = 2 + 1 = 3",
              explanation: "i=3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3. Three ways: (1+1+1), (1+2), (2+1).",
              variables: { n: 3, i: 3, "dp[i]": 3 },
              dataStructure: {
                dpArray: [1, 1, 2, 3],
                dpHighlight: 3,
                dpArrows: [{ from: 1, to: 3 }, { from: 2, to: 3 }],
                dpFormula: "dp[3] = dp[2] + dp[1] = 2 + 1 = 3",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12],
              shortLabel: "Return 3",
              explanation: "Return dp[3] = 3. The three ways are: 1+1+1, 1+2, and 2+1.",
              variables: { n: 3, answer: 3 },
              dataStructure: {
                dpArray: [1, 1, 2, 3],
                dpHighlight: 3,
                dpArrows: [],
                dpFormula: "Answer: dp[3] = 3",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        if (n <= 1) {
          steps.push({
            stepId: 0,
            lineNumbers: [1, 2],
            shortLabel: `n=${n} → base case, return 1`,
            explanation: `n=${n} is <= 1. Return 1 immediately.`,
            variables: { n, answer: 1 },
            dataStructure: {
              dpArray: n === 0 ? [1] : [1, 1],
              dpHighlight: n,
              dpArrows: [],
              dpFormula: `Base case: n <= 1, return 1`,
            },
            delta: {},
            isAnswer: true,
          });
          return steps;
        }

        const dp = new Array(n + 1).fill(null);
        dp[0] = 1;
        dp[1] = 1;

        steps.push({
          stepId: 0,
          lineNumbers: [4, 5, 6],
          shortLabel: "Init dp[0]=1, dp[1]=1",
          explanation: `Create dp array of size ${n + 1}. Base cases: dp[0]=1 (stand at ground), dp[1]=1 (one step).`,
          variables: { n, i: "-", dp: JSON.stringify(dp) },
          dataStructure: {
            dpArray: [...dp],
            dpHighlight: null,
            dpArrows: [],
            dpFormula: "Base cases: dp[0] = 1, dp[1] = 1",
          },
          delta: {},
          isAnswer: false,
        });

        for (let i = 2; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];

          steps.push({
            stepId: steps.length,
            lineNumbers: [8, 9],
            shortLabel: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i]}`,
            explanation: `i=${i}: To reach step ${i}, come from step ${i-1} (${dp[i-1]} ways) or step ${i-2} (${dp[i-2]} ways). dp[${i}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}.`,
            variables: { n, i, "dp[i-1]": dp[i-1], "dp[i-2]": dp[i-2], "dp[i]": dp[i] },
            dataStructure: {
              dpArray: [...dp],
              dpHighlight: i,
              dpArrows: [{ from: i - 2, to: i }, { from: i - 1, to: i }],
              dpFormula: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
            },
            delta: { changedIndices: [i] },
            isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [12],
          shortLabel: `Return dp[${n}] = ${dp[n]}`,
          explanation: `Return dp[${n}] = ${dp[n]}. There are ${dp[n]} distinct ways to climb ${n} steps.`,
          variables: { n, answer: dp[n] },
          dataStructure: {
            dpArray: [...dp],
            dpHighlight: n,
            dpArrows: [],
            dpFormula: `Answer: dp[${n}] = ${dp[n]}`,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(2^n)", space: "O(n)", explanation: "Exponential recursive calls with call stack depth n" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "Single pass filling dp array of size n+1", tradeoff: "Can optimize to O(1) space using two variables instead of array" },
  },

  interviewTips: [
    "Immediately recognize this as Fibonacci — mention it by name.",
    "Start with the recursive solution, explain why it's O(2^n), then optimize.",
    "Mention the O(1) space optimization using two variables — shows depth.",
    "Ask: 'What if we could take 1, 2, or 3 steps?' — generalizes to dp[i] = dp[i-1] + dp[i-2] + dp[i-3].",
    "The base case dp[0] = 1 means 'there is one way to stay at the ground' — some interviewers test this.",
  ],

  relatedProblems: ["min-cost-climbing-stairs", "house-robber", "decode-ways"],
};
