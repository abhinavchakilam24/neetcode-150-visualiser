export const coinChange = {
  id: 108,
  slug: "coin-change",
  title: "Coin Change",
  difficulty: "Medium",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 108,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Google", "Microsoft", "Apple", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/coin-change/",

  pattern: "Unbounded Knapsack / Min-Cost DP",
  patternExplanation: `When you need the minimum number of items (coins) to reach a target value and
    each item can be used unlimited times, build a dp array where dp[i] = minimum items to make amount i.
    For each amount, try every coin denomination and take the minimum.`,

  intuition: {
    coreInsight: `For any amount i, the fewest coins needed is 1 + the fewest coins needed
      for (i - coin), tried across all coin denominations. If we already know the answer for
      every smaller amount, we can compute the answer for i in O(coins.length) time. This is
      classic bottom-up DP: build answers for small amounts first, then use them for larger amounts.`,

    mentalModel: `Imagine you're at a vending machine that gives change. You need to make
      exactly 11 cents using coins of 1, 3, and 5. For each amount from 1 to 11, you ask:
      "What's the best I can do if I use a 1-cent coin here? A 3-cent? A 5-cent?" You always
      pick the option that uses the fewest total coins. The dp table is your cheat sheet —
      once you figure out the answer for 6 cents, you never recompute it.`,

    whyNaiveFails: `A greedy approach (always pick the largest coin) fails badly. For coins
      [1, 3, 4] and amount 6, greedy picks 4+1+1 = 3 coins, but the optimal is 3+3 = 2 coins.
      Recursive brute force tries all combinations but recomputes the same subproblems: making
      change for amount 5 gets computed from amount 6 (via coin 1), amount 8 (via coin 3), etc.
      Without memoization, this is exponential.`,

    keyObservation: `The recurrence is dp[i] = min(dp[i - coin] + 1) for each coin where
      coin <= i. Initialize dp[0] = 0 (zero coins for zero amount) and dp[1..amount] = Infinity.
      If dp[amount] is still Infinity at the end, the amount can't be made — return -1.`,
  },

  problem: `You are given an integer array coins representing coin denominations and an integer
    amount representing a total amount of money. Return the fewest number of coins needed to
    make up that amount. If that amount cannot be made up by any combination of the coins,
    return -1. You may assume you have an infinite number of each coin.`,

  examples: [
    { input: "coins = [1,5,10], amount = 11", output: "3", explanation: "11 = 10 + 1. Three coins? No — 10+1 = 2 coins. Wait: 5+5+1 = 3 coins. Actually 10+1 = 2 coins." },
    { input: "coins = [2], amount = 3", output: "-1", explanation: "No combination of 2-cent coins makes 3." },
    { input: "coins = [1], amount = 0", output: "0", explanation: "0 coins needed for amount 0." },
  ],

  constraints: [
    "1 <= coins.length <= 12",
    "1 <= coins[i] <= 2^31 - 1",
    "0 <= amount <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(S^n)",
      spaceComplexity: "O(S)",
      idea: "Recursively try each coin at each step, tracking the minimum coins needed. S = amount, n = number of coin denominations.",

      javaCode: `public int coinChange(int[] coins, int amount) {
    if (amount == 0) return 0;
    if (amount < 0) return -1;

    int min = Integer.MAX_VALUE;
    for (int coin : coins) {
        int res = coinChange(coins, amount - coin);
        if (res >= 0 && res < min) {
            min = res + 1;
        }
    }
    return min == Integer.MAX_VALUE ? -1 : min;
}`,

      cppCode: `int coinChange(vector<int>& coins, int amount) {
    if (amount == 0) return 0;
    if (amount < 0) return -1;

    int minCoins = INT_MAX;
    for (int coin : coins) {
        int res = coinChange(coins, amount - coin);
        if (res >= 0 && res < minCoins) {
            minCoins = res + 1;
        }
    }
    return minCoins == INT_MAX ? -1 : minCoins;
}`,

      pythonCode: `def coinChange(coins: List[int], amount: int) -> int:
    if amount == 0:
        return 0
    if amount < 0:
        return -1

    min_coins = float('inf')
    for coin in coins:
        res = coinChange(coins, amount - coin)
        if res >= 0 and res < min_coins:
            min_coins = res + 1
    return -1 if min_coins == float('inf') else min_coins`,

      lineAnnotations: {
        1: "Base case: zero amount needs zero coins",
        2: "Negative amount means this path is invalid",
        4: "Track the minimum across all coin choices",
        5: "Try subtracting each coin denomination",
        6: "Recurse on the remaining amount",
        7: "If valid result and better than current min, update",
        10: "Return -1 if no valid combination found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { coins: [1, 3, 4], amount: 6 },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "coinChange(6)",
              explanation: "Start with amount=6. We'll try subtracting each coin (1, 3, 4) and recurse. This creates an exponential tree of calls.",
              variables: { amount: 6, coins: "[1, 3, 4]" },
              dataStructure: {
                dpArray: [null, null, null, null, null, null, null],
                dpHighlight: 6,
                dpArrows: [],
                dpFormula: "f(6) = min(f(5)+1, f(3)+1, f(2)+1)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Recursion explodes",
              explanation: "f(6) calls f(5), f(3), f(2). f(5) calls f(4), f(2), f(1). Notice f(2) is computed multiple times. The tree grows exponentially.",
              variables: { amount: 6, "f(5)": "pending", "f(3)": "pending", "f(2)": "computed twice" },
              dataStructure: {
                dpArray: [0, 1, 2, 1, 1, 2, null],
                dpHighlight: 6,
                dpArrows: [],
                dpFormula: "Exponential recomputation of subproblems",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10],
              shortLabel: "Return 2",
              explanation: "After exploring all paths: f(0)=0, f(1)=1, f(2)=2, f(3)=1, f(4)=1, f(5)=2, f(6)=2. The answer is 2 (coins 3+3). Greedy would pick 4+1+1=3 coins — wrong!",
              variables: { amount: 6, answer: 2 },
              dataStructure: {
                dpArray: [0, 1, 2, 1, 1, 2, 2],
                dpHighlight: 6,
                dpArrows: [{ from: 3, to: 6 }],
                dpFormula: "f(6) = f(3) + 1 = 1 + 1 = 2 (coins: 3+3)",
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
      timeComplexity: "O(amount * coins.length)",
      spaceComplexity: "O(amount)",
      idea: `Build dp array where dp[i] = minimum coins to make amount i. Initialize dp[0]=0,
        rest to Infinity. For each amount from 1 to target, try every coin and take minimum.`,

      javaCode: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
}`,

      cppCode: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
}`,

      pythonCode: `def coinChange(coins: List[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] <= amount else -1`,

      lineAnnotations: {
        2: "Create dp array, fill with amount+1 (acts as infinity)",
        3: "dp[0] = 0: zero coins needed for amount 0",
        5: "Try every amount from 1 to target",
        6: "Try every coin denomination",
        7: "Only use coin if it doesn't exceed current amount",
        8: "Take minimum: current best vs. using this coin",
        12: "If dp[amount] unchanged, no valid combination exists",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Coins [1,3,4] amount 6 — greedy fails here",
          input: { coins: [1, 3, 4], amount: 6 },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init dp[0]=0, rest=INF",
              explanation: "Create dp array of size 7. Set dp[0]=0 (zero coins for zero amount). Fill the rest with amount+1 = 7, which acts as infinity since we can never need more than 6 coins.",
              variables: { amount: 6, coins: "[1, 3, 4]", dp: "[0, INF, INF, INF, INF, INF, INF]" },
              dataStructure: {
                dpArray: [0, null, null, null, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "Base case: dp[0] = 0",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "dp[1] = dp[0]+1 = 1",
              explanation: "i=1: Try coin 1: dp[1-1]+1 = dp[0]+1 = 0+1 = 1. Coins 3 and 4 are too large. dp[1] = 1 (one 1-cent coin).",
              variables: { i: 1, coin: 1, "dp[i-coin]": 0, "dp[i]": 1 },
              dataStructure: {
                dpArray: [0, 1, null, null, null, null, null],
                dpHighlight: 1,
                dpArrows: [{ from: 0, to: 1 }],
                dpFormula: "dp[1] = min(INF, dp[0]+1) = 1",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "dp[2] = dp[1]+1 = 2",
              explanation: "i=2: Try coin 1: dp[2-1]+1 = dp[1]+1 = 1+1 = 2. Coins 3 and 4 are too large. dp[2] = 2 (two 1-cent coins).",
              variables: { i: 2, coin: 1, "dp[i-coin]": 1, "dp[i]": 2 },
              dataStructure: {
                dpArray: [0, 1, 2, null, null, null, null],
                dpHighlight: 2,
                dpArrows: [{ from: 1, to: 2 }],
                dpFormula: "dp[2] = min(INF, dp[1]+1) = 2",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "dp[3] = dp[0]+1 = 1",
              explanation: "i=3: Try coin 1: dp[2]+1 = 3. Try coin 3: dp[3-3]+1 = dp[0]+1 = 1. That's better! dp[3] = 1 (one 3-cent coin). Coin 4 is too large.",
              variables: { i: 3, "via coin 1": 3, "via coin 3": 1, "dp[i]": 1 },
              dataStructure: {
                dpArray: [0, 1, 2, 1, null, null, null],
                dpHighlight: 3,
                dpArrows: [{ from: 0, to: 3 }],
                dpFormula: "dp[3] = min(dp[2]+1, dp[0]+1) = min(3, 1) = 1",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "dp[4] = dp[0]+1 = 1",
              explanation: "i=4: Try coin 1: dp[3]+1 = 2. Try coin 3: dp[1]+1 = 2. Try coin 4: dp[4-4]+1 = dp[0]+1 = 1. Best is 1 (one 4-cent coin).",
              variables: { i: 4, "via coin 1": 2, "via coin 3": 2, "via coin 4": 1, "dp[i]": 1 },
              dataStructure: {
                dpArray: [0, 1, 2, 1, 1, null, null],
                dpHighlight: 4,
                dpArrows: [{ from: 0, to: 4 }],
                dpFormula: "dp[4] = min(dp[3]+1, dp[1]+1, dp[0]+1) = min(2, 2, 1) = 1",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "dp[5] = dp[4]+1 = 2",
              explanation: "i=5: Try coin 1: dp[4]+1 = 2. Try coin 3: dp[2]+1 = 3. Try coin 4: dp[1]+1 = 2. Best is 2.",
              variables: { i: 5, "via coin 1": 2, "via coin 3": 3, "via coin 4": 2, "dp[i]": 2 },
              dataStructure: {
                dpArray: [0, 1, 2, 1, 1, 2, null],
                dpHighlight: 5,
                dpArrows: [{ from: 4, to: 5 }],
                dpFormula: "dp[5] = min(dp[4]+1, dp[2]+1, dp[1]+1) = min(2, 3, 2) = 2",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "dp[6] = dp[3]+1 = 2",
              explanation: "i=6: Try coin 1: dp[5]+1 = 3. Try coin 3: dp[3]+1 = 1+1 = 2. Try coin 4: dp[2]+1 = 3. Best is 2 (two 3-cent coins). This is where greedy (4+1+1=3) would fail!",
              variables: { i: 6, "via coin 1": 3, "via coin 3": 2, "via coin 4": 3, "dp[i]": 2 },
              dataStructure: {
                dpArray: [0, 1, 2, 1, 1, 2, 2],
                dpHighlight: 6,
                dpArrows: [{ from: 3, to: 6 }],
                dpFormula: "dp[6] = min(dp[5]+1, dp[3]+1, dp[2]+1) = min(3, 2, 3) = 2",
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [12],
              shortLabel: "Return dp[6] = 2",
              explanation: "dp[6] = 2, which is <= 6, so a valid solution exists. Return 2. The optimal combination is 3+3. Greedy would have picked 4+1+1 = 3 coins — proving why DP is necessary.",
              variables: { amount: 6, answer: 2 },
              dataStructure: {
                dpArray: [0, 1, 2, 1, 1, 2, 2],
                dpHighlight: 6,
                dpArrows: [],
                dpFormula: "Answer: dp[6] = 2 (coins: 3 + 3)",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Impossible",
          description: "Amount cannot be made with given coins",
          input: { coins: [2], amount: 3 },
          expectedOutput: "-1",
          commonMistake: "Forgetting to check if dp[amount] is still infinity. If you return dp[amount] directly, you'll return a huge number instead of -1.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init dp[0]=0, rest=INF",
              explanation: "Create dp array of size 4. dp[0]=0, rest set to infinity (4). Only coin is 2.",
              variables: { amount: 3, coins: "[2]", dp: "[0, INF, INF, INF]" },
              dataStructure: {
                dpArray: [0, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "Base case: dp[0] = 0",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "dp[1]: coin 2 > 1, skip",
              explanation: "i=1: The only coin is 2, which exceeds amount 1. No coin fits. dp[1] stays at infinity — we cannot make amount 1.",
              variables: { i: 1, coin: 2, "dp[i]": "INF" },
              dataStructure: {
                dpArray: [0, null, null, null],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "dp[1] = INF (no coin fits)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "dp[2] = dp[0]+1 = 1",
              explanation: "i=2: Try coin 2: dp[2-2]+1 = dp[0]+1 = 0+1 = 1. dp[2] = 1 (one 2-cent coin).",
              variables: { i: 2, coin: 2, "dp[i-coin]": 0, "dp[i]": 1 },
              dataStructure: {
                dpArray: [0, null, 1, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
                dpFormula: "dp[2] = dp[0] + 1 = 1",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "dp[3]: dp[1]+1 = INF",
              explanation: "i=3: Try coin 2: dp[3-2]+1 = dp[1]+1 = INF+1 = INF. dp[1] was unreachable, so dp[3] is also unreachable. dp[3] stays at infinity.",
              variables: { i: 3, coin: 2, "dp[i-coin]": "INF", "dp[i]": "INF" },
              dataStructure: {
                dpArray: [0, null, 1, null],
                dpHighlight: 3,
                dpArrows: [{ from: 1, to: 3 }],
                dpFormula: "dp[3] = dp[1] + 1 = INF (unreachable)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12],
              shortLabel: "dp[3] > 3 → Return -1",
              explanation: "dp[3] is still infinity (greater than amount 3). This means no combination of 2-cent coins can make exactly 3. Return -1.",
              variables: { amount: 3, "dp[amount]": "INF", answer: -1 },
              dataStructure: {
                dpArray: [0, null, 1, null],
                dpHighlight: 3,
                dpArrows: [],
                dpFormula: "dp[3] > amount → return -1",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Zero Amount",
          description: "Amount is 0 — needs 0 coins",
          input: { coins: [1, 5, 10], amount: 0 },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init dp[0]=0",
              explanation: "dp array has size 1, containing just dp[0]=0. Zero amount needs zero coins.",
              variables: { amount: 0, dp: "[0]" },
              dataStructure: {
                dpArray: [0],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "dp[0] = 0",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12],
              shortLabel: "Return dp[0] = 0",
              explanation: "The loop doesn't execute (amount=0). dp[0]=0 <= 0. Return 0.",
              variables: { amount: 0, answer: 0 },
              dataStructure: {
                dpArray: [0],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "Answer: dp[0] = 0",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ coins, amount }) {
        const steps = [];
        const INF = amount + 1;
        const dp = new Array(amount + 1).fill(INF);
        dp[0] = 0;

        steps.push({
          stepId: 0,
          lineNumbers: [2, 3],
          shortLabel: "Init dp[0]=0, rest=INF",
          explanation: `Create dp array of size ${amount + 1}. Set dp[0]=0 (zero coins for zero amount). Fill the rest with ${INF} (acts as infinity).`,
          variables: { amount, coins: JSON.stringify(coins), dp: JSON.stringify(dp.map(v => v >= INF ? "INF" : v)) },
          dataStructure: {
            dpArray: dp.map(v => v >= INF ? null : v),
            dpHighlight: 0,
            dpArrows: [],
            dpFormula: "Base case: dp[0] = 0",
          },
          delta: {},
          isAnswer: false,
        });

        for (let i = 1; i <= amount; i++) {
          let bestCoin = null;
          for (const coin of coins) {
            if (coin <= i && dp[i - coin] + 1 < dp[i]) {
              dp[i] = dp[i - coin] + 1;
              bestCoin = coin;
            }
          }

          const fromIdx = bestCoin !== null ? i - bestCoin : null;
          steps.push({
            stepId: steps.length,
            lineNumbers: [5, 6, 7, 8],
            shortLabel: dp[i] >= INF ? `dp[${i}] = INF` : `dp[${i}] = ${dp[i]}`,
            explanation: dp[i] >= INF
              ? `i=${i}: No coin fits or all paths lead to unreachable amounts. dp[${i}] stays at infinity.`
              : `i=${i}: Best option is using coin ${bestCoin}: dp[${i}-${bestCoin}]+1 = dp[${fromIdx}]+1 = ${dp[fromIdx]}+1 = ${dp[i]}.`,
            variables: { i, "dp[i]": dp[i] >= INF ? "INF" : dp[i] },
            dataStructure: {
              dpArray: dp.map(v => v >= INF ? null : v),
              dpHighlight: i,
              dpArrows: fromIdx !== null ? [{ from: fromIdx, to: i }] : [],
              dpFormula: dp[i] >= INF ? `dp[${i}] = INF` : `dp[${i}] = dp[${fromIdx}] + 1 = ${dp[i]}`,
            },
            delta: { changedIndices: dp[i] < INF ? [i] : [] },
            isAnswer: false,
          });
        }

        const answer = dp[amount] >= INF ? -1 : dp[amount];
        steps.push({
          stepId: steps.length,
          lineNumbers: [12],
          shortLabel: `Return ${answer}`,
          explanation: dp[amount] >= INF
            ? `dp[${amount}] is still infinity — no valid coin combination exists. Return -1.`
            : `dp[${amount}] = ${dp[amount]}, which is <= ${amount}. Return ${dp[amount]}.`,
          variables: { amount, answer },
          dataStructure: {
            dpArray: dp.map(v => v >= INF ? null : v),
            dpHighlight: amount,
            dpArrows: [],
            dpFormula: `Answer: ${answer}`,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(S^n)", space: "O(S)", explanation: "S = amount, n = coin count. Exponential branching with recursion depth S" },
    optimal: { time: "O(S * n)", space: "O(S)", explanation: "For each of S amounts, try n coins. dp array of size S+1", tradeoff: "O(S) space to avoid exponential recomputation" },
  },

  interviewTips: [
    "Mention why greedy fails: coins [1,3,4] amount 6 — greedy picks 4+1+1=3, optimal is 3+3=2.",
    "Start by stating the recurrence: dp[i] = min(dp[i-coin]+1) for all coins.",
    "Clarify base case: dp[0]=0 means zero coins for zero amount.",
    "Explain why INF is amount+1: we can never use more than 'amount' coins (using all 1s).",
    "If asked for the actual coins used, maintain a parent array tracking which coin was chosen at each step.",
  ],

  relatedProblems: ["coin-change-ii", "climbing-stairs", "min-cost-climbing-stairs"],
};
