export const coinChangeII = {
  id: 113,
  slug: "coin-change-ii",
  title: "Coin Change II",
  difficulty: "Medium",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 113,
  artifactType: "DPTable2D",
  companies: ["Amazon", "Google", "Bloomberg", "Goldman Sachs", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/coin-change-ii/",

  pattern: "Unbounded Knapsack DP",
  patternExplanation: `When counting combinations (not permutations) with unlimited item reuse,
    build a 2D table where rows represent coins considered so far and columns represent amounts.
    Each cell either includes the current coin or skips it.`,

  intuition: {
    coreInsight: `For each coin, at each amount, we have exactly two choices: skip this coin
      (take the value from the row above) or use this coin (take the value from the same row
      at amount - coin). By iterating coins as the outer loop, we naturally avoid counting
      permutations — [1,2] and [2,1] are the same combination, and the coin ordering prevents
      double-counting.`,

    mentalModel: `Imagine a cashier making change. They go through their coin tray left to right:
      first pennies, then nickels, then dimes. For each denomination, they decide "how many of
      these do I use?" Once they move past a denomination, they never go back. This ordered
      consideration is exactly what the 2D DP table enforces — each row "unlocks" one more coin
      type.`,

    whyNaiveFails: `A recursive approach without memoization tries every combination of coins
      at every amount, leading to exponential branching. Even worse, if you iterate amounts
      first and coins second, you count permutations instead of combinations. The 2D DP table
      with coins as rows ensures each combination is counted exactly once in O(n * amount) time.`,

    keyObservation: `dp[i][j] = dp[i-1][j] + dp[i][j - coins[i]]. The first term skips the
      current coin entirely; the second term uses it at least once (and stays in the same row
      because we can reuse coins). The base case is dp[i][0] = 1 for all i — there's exactly
      one way to make amount 0: use no coins.`,
  },

  problem: `You are given an integer array coins representing coins of different denominations
    and an integer amount representing a total amount of money. Return the number of combinations
    that make up that amount. If that amount of money cannot be made up by any combination of
    the coins, return 0. You may assume that you have an infinite number of each kind of coin.`,

  examples: [
    { input: "amount = 5, coins = [1,2,5]", output: "4", explanation: "5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1" },
    { input: "amount = 3, coins = [2]", output: "0", explanation: "Cannot make 3 with only coin 2." },
    { input: "amount = 10, coins = [10]", output: "1", explanation: "Only one way: use one 10-coin." },
  ],

  constraints: [
    "1 <= coins.length <= 300",
    "1 <= coins[i] <= 5000",
    "All values of coins are unique.",
    "0 <= amount <= 5000",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(2^(n * amount))",
      spaceComplexity: "O(amount)",
      idea: "Recursively try including or excluding each coin. For each coin, either skip it or subtract it from the remaining amount and recurse.",

      javaCode: `public int change(int amount, int[] coins) {
    return helper(coins, 0, amount);
}

private int helper(int[] coins, int idx, int remaining) {
    if (remaining == 0) return 1;
    if (remaining < 0 || idx == coins.length) return 0;
    return helper(coins, idx + 1, remaining)
         + helper(coins, idx, remaining - coins[idx]);
}`,

      cppCode: `int change(int amount, vector<int>& coins) {
    return helper(coins, 0, amount);
}

int helper(vector<int>& coins, int idx, int remaining) {
    if (remaining == 0) return 1;
    if (remaining < 0 || idx == coins.size()) return 0;
    return helper(coins, idx + 1, remaining)
         + helper(coins, idx, remaining - coins[idx]);
}`,

      pythonCode: `def change(amount: int, coins: List[int]) -> int:
    def helper(idx, remaining):
        if remaining == 0:
            return 1
        if remaining < 0 or idx == len(coins):
            return 0
        return helper(idx + 1, remaining) + helper(idx, remaining - coins[idx])
    return helper(0, amount)`,

      lineAnnotations: {
        5: "Base case: amount reached exactly",
        6: "Base case: overshot or no coins left",
        7: "Skip this coin OR use it (stay at same index for reuse)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { amount: 5, coins: [1, 2, 5] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0, lineNumbers: [1, 2],
              shortLabel: "Start recursion",
              explanation: "Call helper(coins, 0, 5). We'll try combinations starting with coin index 0 (value=1).",
              variables: { idx: 0, remaining: 5, "coins[idx]": 1 },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [7, 8],
              shortLabel: "Branch: skip coin 1 or use it",
              explanation: "Two choices: skip coin 1 entirely (move to idx=1) or use coin 1 (remaining becomes 4, stay at idx=0). This branching is exponential.",
              variables: { idx: 0, remaining: 5, skip: "helper(1,5)", use: "helper(0,4)" },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [5],
              shortLabel: "Reaches amount=0 multiple times",
              explanation: "After exploring all branches, we find 4 paths that reach remaining=0: {1,1,1,1,1}, {1,1,1,2}, {1,2,2}, {5}. Exponential branching made this slow.",
              variables: { result: 4 },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ amount, coins }) {
        const steps = [];
        let result = 0;
        function helper(idx, rem) {
          if (rem === 0) { result++; return 1; }
          if (rem < 0 || idx === coins.length) return 0;
          return helper(idx + 1, rem) + helper(idx, rem - coins[idx]);
        }
        steps.push({
          stepId: 0, lineNumbers: [1, 2],
          shortLabel: "Start recursion",
          explanation: `Recursively explore all combinations of coins [${coins}] to make amount ${amount}.`,
          variables: { amount, coins: JSON.stringify(coins) },
          dataStructure: { dpTable: [], dpHighlight2D: null },
          delta: {}, isAnswer: false,
        });
        result = helper(0, amount);
        steps.push({
          stepId: 1, lineNumbers: [5],
          shortLabel: `Result: ${result}`,
          explanation: `After exploring all branches, found ${result} combinations.`,
          variables: { result },
          dataStructure: { dpTable: [], dpHighlight2D: null },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "2D DP (Unbounded Knapsack)",
      tier: "optimal",
      timeComplexity: "O(n * amount)",
      spaceComplexity: "O(n * amount)",
      idea: `Build a 2D table where dp[i][j] = number of ways to make amount j using coins[0..i].
        dp[i][j] = dp[i-1][j] (skip coin i) + dp[i][j - coins[i]] (use coin i, if j >= coins[i]).`,

      javaCode: `public int change(int amount, int[] coins) {
    int n = coins.length;
    int[][] dp = new int[n + 1][amount + 1];
    for (int i = 0; i <= n; i++) dp[i][0] = 1;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= amount; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j >= coins[i - 1]) {
                dp[i][j] += dp[i][j - coins[i - 1]];
            }
        }
    }

    return dp[n][amount];
}`,

      cppCode: `int change(int amount, vector<int>& coins) {
    int n = coins.size();
    vector<vector<int>> dp(n + 1, vector<int>(amount + 1, 0));
    for (int i = 0; i <= n; i++) dp[i][0] = 1;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= amount; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j >= coins[i - 1]) {
                dp[i][j] += dp[i][j - coins[i - 1]];
            }
        }
    }

    return dp[n][amount];
}`,

      pythonCode: `def change(amount: int, coins: List[int]) -> int:
    n = len(coins)
    dp = [[0] * (amount + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        dp[i][0] = 1

    for i in range(1, n + 1):
        for j in range(1, amount + 1):
            dp[i][j] = dp[i - 1][j]
            if j >= coins[i - 1]:
                dp[i][j] += dp[i][j - coins[i - 1]]

    return dp[n][amount]`,

      lineAnnotations: {
        2: "Create (n+1) x (amount+1) DP table",
        3: "Base case: 1 way to make amount 0 — use no coins",
        5: "For each coin (row)",
        6: "For each amount (column)",
        7: "Skip this coin: inherit from row above",
        8: "If current coin fits in this amount",
        9: "Add ways that include this coin (same row, j - coin)",
        14: "Answer is bottom-right cell",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "coins=[1,2,5], amount=5 — classic example",
          input: { amount: 5, coins: [1, 2, 5] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3],
              shortLabel: "Init DP table",
              explanation: "Create a 4x6 table (3 coins + 1 base row, amounts 0-5). Set dp[i][0] = 1 for all rows — there's exactly one way to make amount 0: use no coins.",
              variables: { n: 3, amount: 5, coins: "[1,2,5]" },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0],
                ],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [5, 6, 7],
              shortLabel: "Row 1 (coin=1), j=1",
              explanation: "Using coin 1: dp[1][1] = dp[0][1] (skip) + dp[1][0] (use coin 1). Skip gives 0, use gives 1. dp[1][1] = 1. Only one way: {1}.",
              variables: { i: 1, j: 1, "coins[0]": 1, "dp[0][1]": 0, "dp[1][0]": 1, "dp[1][1]": 1 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0, 0],
                  [1, 1, 0, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 0, c: 1 }, to: { r: 1, c: 1 } }, { from: { r: 1, c: 0 }, to: { r: 1, c: 1 } }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "Row 1 (coin=1), j=2..5",
              explanation: "With only coin 1, there's exactly 1 way to make any amount: use that many 1-coins. dp[1][2]=1, dp[1][3]=1, dp[1][4]=1, dp[1][5]=1.",
              variables: { i: 1, "coins[0]": 1, row: "[1,1,1,1,1,1]" },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 1],
                  [1, 0, 0, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 1, col: 5 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [5, 6, 7],
              shortLabel: "Row 2 (coin=2), j=1",
              explanation: "dp[2][1] = dp[1][1] (skip coin 2) + nothing (j=1 < coin=2, can't use). dp[2][1] = 1. Can't use a 2-coin for amount 1.",
              variables: { i: 2, j: 1, "coins[1]": 2, "dp[1][1]": 1, "dp[2][1]": 1 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 0, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 2, col: 1 },
                dpArrows2D: [{ from: { r: 1, c: 1 }, to: { r: 2, c: 1 } }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [7, 8, 9],
              shortLabel: "Row 2 (coin=2), j=2",
              explanation: "dp[2][2] = dp[1][2] (skip=1) + dp[2][0] (use coin 2, go to j=0, which is 1). dp[2][2] = 2. Two ways: {1,1} and {2}.",
              variables: { i: 2, j: 2, "coins[1]": 2, "dp[1][2]": 1, "dp[2][0]": 1, "dp[2][2]": 2 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 2, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [{ from: { r: 1, c: 2 }, to: { r: 2, c: 2 } }, { from: { r: 2, c: 0 }, to: { r: 2, c: 2 } }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [7, 8, 9],
              shortLabel: "Row 2 (coin=2), j=3..5",
              explanation: "Continuing: dp[2][3]=2 ({1,1,1},{1,2}), dp[2][4]=3 ({1,1,1,1},{1,1,2},{2,2}), dp[2][5]=3 ({1,1,1,1,1},{1,1,1,2},{1,2,2}).",
              variables: { i: 2, "coins[1]": 2, row: "[1,1,2,2,3,3]" },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 2, 2, 3, 3],
                  [1, 0, 0, 0, 0, 0],
                ],
                dpHighlight2D: { row: 2, col: 5 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [5, 6, 7],
              shortLabel: "Row 3 (coin=5), j=1..4",
              explanation: "For amounts 1-4, coin 5 is too large to use. dp[3][j] = dp[2][j] for j=1..4. Values: 1, 2, 2, 3.",
              variables: { i: 3, "coins[2]": 5 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 2, 2, 3, 3],
                  [1, 1, 2, 2, 3, 0],
                ],
                dpHighlight2D: { row: 3, col: 4 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 7, lineNumbers: [7, 8, 9],
              shortLabel: "Row 3 (coin=5), j=5",
              explanation: "dp[3][5] = dp[2][5] (skip coin 5, gives 3) + dp[3][0] (use coin 5, gives 1). dp[3][5] = 3 + 1 = 4. The four combinations: {1,1,1,1,1}, {1,1,1,2}, {1,2,2}, {5}.",
              variables: { i: 3, j: 5, "coins[2]": 5, "dp[2][5]": 3, "dp[3][0]": 1, "dp[3][5]": 4 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 2, 2, 3, 3],
                  [1, 1, 2, 2, 3, 4],
                ],
                dpHighlight2D: { row: 3, col: 5 },
                dpArrows2D: [{ from: { r: 2, c: 5 }, to: { r: 3, c: 5 } }, { from: { r: 3, c: 0 }, to: { r: 3, c: 5 } }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 8, lineNumbers: [14],
              shortLabel: "Return dp[3][5] = 4",
              explanation: "The bottom-right cell dp[3][5] = 4. There are 4 combinations of coins [1,2,5] that sum to 5.",
              variables: { answer: 4 },
              dataStructure: {
                dpTable: [
                  [1, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 2, 2, 3, 3],
                  [1, 1, 2, 2, 3, 4],
                ],
                dpHighlight2D: { row: 3, col: 5 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Impossible",
          description: "No combination possible — coin doesn't divide amount",
          input: { amount: 3, coins: [2] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3],
              shortLabel: "Init DP table",
              explanation: "Create a 2x4 table. dp[i][0] = 1 for all rows.",
              variables: { n: 1, amount: 3, coins: "[2]" },
              dataStructure: {
                dpTable: [[1, 0, 0, 0], [1, 0, 0, 0]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [5, 6, 7],
              shortLabel: "Row 1 (coin=2), j=1",
              explanation: "j=1 < coin=2, can't use it. dp[1][1] = dp[0][1] = 0. No way to make 1 with coin 2.",
              variables: { i: 1, j: 1, "coins[0]": 2, "dp[1][1]": 0 },
              dataStructure: {
                dpTable: [[1, 0, 0, 0], [1, 0, 0, 0]],
                dpHighlight2D: { row: 1, col: 1 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [7, 8, 9],
              shortLabel: "Row 1 (coin=2), j=2",
              explanation: "dp[1][2] = dp[0][2] (skip=0) + dp[1][0] (use=1). dp[1][2] = 1. One way: {2}.",
              variables: { i: 1, j: 2, "dp[1][2]": 1 },
              dataStructure: {
                dpTable: [[1, 0, 0, 0], [1, 0, 1, 0]],
                dpHighlight2D: { row: 1, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [7, 8, 9],
              shortLabel: "Row 1 (coin=2), j=3",
              explanation: "dp[1][3] = dp[0][3] (skip=0) + dp[1][1] (use=0). dp[1][3] = 0. Cannot make odd amount 3 with only even coin 2.",
              variables: { i: 1, j: 3, "dp[1][3]": 0 },
              dataStructure: {
                dpTable: [[1, 0, 0, 0], [1, 0, 1, 0]],
                dpHighlight2D: { row: 1, col: 3 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [14],
              shortLabel: "Return dp[1][3] = 0",
              explanation: "dp[1][3] = 0. There's no way to make amount 3 using only coin 2. Odd amounts are impossible with only even coins.",
              variables: { answer: 0 },
              dataStructure: {
                dpTable: [[1, 0, 0, 0], [1, 0, 1, 0]],
                dpHighlight2D: { row: 1, col: 3 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ amount, coins }) {
        const steps = [];
        const n = coins.length;
        const dp = Array.from({ length: n + 1 }, () => new Array(amount + 1).fill(0));
        for (let i = 0; i <= n; i++) dp[i][0] = 1;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init DP table",
          explanation: `Create ${n + 1}x${amount + 1} table. dp[i][0] = 1 for all rows.`,
          variables: { n, amount, coins: JSON.stringify(coins) },
          dataStructure: {
            dpTable: dp.map(r => [...r]),
            dpHighlight2D: null,
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i <= n; i++) {
          for (let j = 1; j <= amount; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j >= coins[i - 1]) {
              dp[i][j] += dp[i][j - coins[i - 1]];
            }
            steps.push({
              stepId: steps.length, lineNumbers: [7, 8, 9],
              shortLabel: `dp[${i}][${j}] = ${dp[i][j]}`,
              explanation: `Coin=${coins[i - 1]}, amount=${j}. Skip=${dp[i - 1][j]}${j >= coins[i - 1] ? `, use=${dp[i][j - coins[i - 1]]}` : ', can\'t use'}. dp[${i}][${j}] = ${dp[i][j]}.`,
              variables: { i, j, "coins[i-1]": coins[i - 1], "dp[i][j]": dp[i][j] },
              dataStructure: {
                dpTable: dp.map(r => [...r]),
                dpHighlight2D: { row: i, col: j },
                dpArrows2D: j >= coins[i - 1]
                  ? [{ from: { r: i - 1, c: j }, to: { r: i, c: j } }, { from: { r: i, c: j - coins[i - 1] }, to: { r: i, c: j } }]
                  : [{ from: { r: i - 1, c: j }, to: { r: i, c: j } }],
              },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [14],
          shortLabel: `Return ${dp[n][amount]}`,
          explanation: `dp[${n}][${amount}] = ${dp[n][amount]}. This is the number of combinations.`,
          variables: { answer: dp[n][amount] },
          dataStructure: {
            dpTable: dp.map(r => [...r]),
            dpHighlight2D: { row: n, col: amount },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(2^(n*amount))", space: "O(amount)", explanation: "Exponential branching at each coin/amount" },
    optimal: { time: "O(n * amount)", space: "O(n * amount)", explanation: "Fill each cell once in a (n+1) x (amount+1) table", tradeoff: "Can optimize to O(amount) space with 1D DP array" },
  },

  interviewTips: [
    "Clarify: are we counting combinations or permutations? Combinations means order doesn't matter.",
    "Start with the brute force recursive solution and identify overlapping subproblems.",
    "Explain why coins as the outer loop avoids double-counting permutations.",
    "Mention the 1D space optimization: dp[j] += dp[j - coin] iterating coins then amounts.",
    "Handle edge case: amount = 0 should return 1 (empty set is a valid combination).",
  ],

  relatedProblems: ["coin-change", "combination-sum", "target-sum"],
};
