export const buySellWithCooldown = {
  id: 112,
  slug: "buy-sell-with-cooldown",
  title: "Best Time to Buy and Sell Stock with Cooldown",
  difficulty: "Medium",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 112,
  artifactType: "DPTable2D",
  companies: ["Amazon", "Google", "Goldman Sachs", "Meta", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",

  pattern: "State Machine DP",
  patternExplanation: `Model the problem as a state machine with states (holding, sold, cooldown). At each day, transition between states. Track the maximum profit reachable in each state using a DP table indexed by day and state.`,

  intuition: {
    coreInsight: `On any given day, you're in one of three states: holding a stock, just sold (in cooldown), or free to buy. Each state has clear transitions — holding can sell or hold, sold must cooldown, cooldown can buy or stay free. DP tracks the best profit for each (day, state) pair.`,

    mentalModel: `Think of a traffic light with three phases: Green (free to buy), Yellow (just sold, must wait), Red (holding stock). Each day the light can only transition in specific ways. Green can go to Red (buy), Yellow must go to Green (cooldown over), Red can go to Yellow (sell) or stay Red (hold). We want the maximum money when the market closes.`,

    whyNaiveFails: `Trying all combinations of buy-sell-cooldown sequences is exponential — at each day you have multiple choices, and the cooldown constraint makes greedy approaches fail. You can't just buy low and sell high because selling forces a one-day cooldown before the next buy.`,

    keyObservation: `The three states are: hold (have stock), sold (just sold, must cooldown tomorrow), and rest (no stock, free to act). The recurrences are: hold[i] = max(hold[i-1], rest[i-1] - prices[i]), sold[i] = hold[i-1] + prices[i], rest[i] = max(rest[i-1], sold[i-1]). Answer = max(sold[n-1], rest[n-1]).`,
  },

  problem: `You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions: After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day). Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).`,

  examples: [
    { input: "prices = [1,2,3,0,2]", output: "3", explanation: "Buy day 0, sell day 2 (profit=2), cooldown day 3, buy day 3, sell day 4 (profit=2). Total=3... actually buy day 0 price 1, sell day 1 price 2 (profit 1), cooldown day 2, buy day 3 price 0, sell day 4 price 2 (profit 2). Total=3." },
    { input: "prices = [1]", output: "0", explanation: "Only one day, no transaction possible." },
  ],

  constraints: [
    "1 <= prices.length <= 5000",
    "0 <= prices[i] <= 1000",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(3^n)",
      spaceComplexity: "O(n)",
      idea: "At each day, try all valid actions (buy, sell, cooldown) based on current state. Recurse and take maximum profit.",

      javaCode: `public int maxProfit(int[] prices) {
    return dfs(prices, 0, false, false);
}

private int dfs(int[] prices, int day, boolean holding, boolean cooldown) {
    if (day >= prices.length) return 0;
    if (cooldown) return dfs(prices, day + 1, false, false);
    int doNothing = dfs(prices, day + 1, holding, false);
    if (holding) {
        int sell = prices[day] + dfs(prices, day + 1, false, true);
        return Math.max(doNothing, sell);
    } else {
        int buy = -prices[day] + dfs(prices, day + 1, true, false);
        return Math.max(doNothing, buy);
    }
}`,

      cppCode: `int maxProfit(vector<int>& prices) {
    return dfs(prices, 0, false, false);
}

int dfs(vector<int>& prices, int day, bool holding, bool cooldown) {
    if (day >= prices.size()) return 0;
    if (cooldown) return dfs(prices, day + 1, false, false);
    int doNothing = dfs(prices, day + 1, holding, false);
    if (holding) {
        int sell = prices[day] + dfs(prices, day + 1, false, true);
        return max(doNothing, sell);
    } else {
        int buy = -prices[day] + dfs(prices, day + 1, true, false);
        return max(doNothing, buy);
    }
}`,

      pythonCode: `def maxProfit(prices: List[int]) -> int:
    def dfs(day, holding, cooldown):
        if day >= len(prices): return 0
        if cooldown: return dfs(day + 1, False, False)
        do_nothing = dfs(day + 1, holding, False)
        if holding:
            sell = prices[day] + dfs(day + 1, False, True)
            return max(do_nothing, sell)
        else:
            buy = -prices[day] + dfs(day + 1, True, False)
            return max(do_nothing, buy)
    return dfs(0, False, False)`,

      lineAnnotations: {
        2: "Start from day 0, not holding, not in cooldown",
        6: "Base case: past last day, no more profit",
        7: "Cooldown day: skip and reset cooldown",
        8: "Option 1: do nothing, keep current state",
        10: "Holding: can sell at today's price",
        13: "Not holding: can buy at today's price",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { prices: [1, 2, 3, 0, 2] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Start DFS",
              explanation: "Begin at day 0, not holding any stock, not in cooldown. We'll explore all possible buy/sell/cooldown sequences.",
              variables: { day: 0, holding: false, cooldown: false },
              dataStructure: {
                dpTable: [[null,null,null],[null,null,null],[null,null,null],[null,null,null],[null,null,null]],
                dpHighlight2D: { row: 0, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [13],
              shortLabel: "Day 0: Buy at 1",
              explanation: "Not holding, not cooldown. We can buy at price 1. Cost = -1. Or skip. We explore the buy branch.",
              variables: { day: 0, holding: false, action: "buy", price: 1, cost: -1 },
              dataStructure: {
                dpTable: [[null,null,null],[null,null,null],[null,null,null],[null,null,null],[null,null,null]],
                dpHighlight2D: { row: 0, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10],
              shortLabel: "Day 1: Sell at 2",
              explanation: "Holding from day 0 buy. Sell at price 2, profit from this trade = 2-1 = 1. Enter cooldown tomorrow.",
              variables: { day: 1, holding: true, action: "sell", price: 2, profit: 1 },
              dataStructure: {
                dpTable: [[null,null,null],[null,null,null],[null,null,null],[null,null,null],[null,null,null]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 0, c: 0 }, to: { r: 1, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7],
              shortLabel: "Day 2: Cooldown",
              explanation: "We just sold, so day 2 is forced cooldown. Skip to day 3.",
              variables: { day: 2, cooldown: true, action: "cooldown" },
              dataStructure: {
                dpTable: [[null,null,null],[null,null,null],[null,null,null],[null,null,null],[null,null,null]],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [{ from: { r: 1, c: 1 }, to: { r: 2, c: 2 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13],
              shortLabel: "Day 3: Buy at 0",
              explanation: "After cooldown, we're free. Buy at price 0 — the dip! Cost = 0.",
              variables: { day: 3, holding: false, action: "buy", price: 0, cost: 0 },
              dataStructure: {
                dpTable: [[null,null,null],[null,null,null],[null,null,null],[null,null,null],[null,null,null]],
                dpHighlight2D: { row: 3, col: 0 },
                dpArrows2D: [{ from: { r: 2, c: 2 }, to: { r: 3, c: 0 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [10],
              shortLabel: "Day 4: Sell at 2 → profit 3",
              explanation: "Sell at price 2. Profit from second trade = 2-0 = 2. Total profit = 1 + 2 = 3. This is the optimal sequence: buy@1, sell@2, cool, buy@0, sell@2.",
              variables: { day: 4, holding: true, action: "sell", price: 2, totalProfit: 3 },
              dataStructure: {
                dpTable: [[null,null,null],[null,null,null],[null,null,null],[null,null,null],[null,null,null]],
                dpHighlight2D: { row: 4, col: 1 },
                dpArrows2D: [{ from: { r: 3, c: 0 }, to: { r: 4, c: 1 } }],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ prices }) {
        const steps = [];
        const n = prices.length;
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Start DFS",
          explanation: `Begin recursive exploration over ${n} days.`,
          variables: { n, prices: JSON.stringify(prices) },
          dataStructure: {
            dpTable: Array.from({ length: n }, () => [null, null, null]),
            dpHighlight2D: { row: 0, col: 0 }, dpArrows2D: [],
          },
          delta: {}, isAnswer: false,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "State Machine DP",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Track three states per day: hold (max profit while holding stock), sold (max profit on the day we sold), rest (max profit while free). Transition: hold[i] = max(hold[i-1], rest[i-1] - price), sold[i] = hold[i-1] + price, rest[i] = max(rest[i-1], sold[i-1]). Answer = max(sold[-1], rest[-1]).`,

      javaCode: `public int maxProfit(int[] prices) {
    int n = prices.length;
    if (n < 2) return 0;

    int hold = -prices[0];
    int sold = 0;
    int rest = 0;

    for (int i = 1; i < n; i++) {
        int prevHold = hold;
        int prevSold = sold;
        hold = Math.max(hold, rest - prices[i]);
        sold = prevHold + prices[i];
        rest = Math.max(rest, prevSold);
    }

    return Math.max(sold, rest);
}`,

      cppCode: `int maxProfit(vector<int>& prices) {
    int n = prices.size();
    if (n < 2) return 0;

    int hold = -prices[0];
    int sold = 0;
    int rest = 0;

    for (int i = 1; i < n; i++) {
        int prevHold = hold;
        int prevSold = sold;
        hold = max(hold, rest - prices[i]);
        sold = prevHold + prices[i];
        rest = max(rest, prevSold);
    }

    return max(sold, rest);
}`,

      pythonCode: `def maxProfit(prices: List[int]) -> int:
    n = len(prices)
    if n < 2: return 0

    hold = -prices[0]
    sold = 0
    rest = 0

    for i in range(1, n):
        prev_hold = hold
        prev_sold = sold
        hold = max(hold, rest - prices[i])
        sold = prev_hold + prices[i]
        rest = max(rest, prev_sold)

    return max(sold, rest)`,

      lineAnnotations: {
        2: "Edge case: need at least 2 days for a transaction",
        4: "Initial state: if we buy on day 0, profit = -prices[0]",
        5: "sold = 0: haven't sold anything yet",
        6: "rest = 0: resting with no stock, no profit",
        8: "Process each subsequent day",
        9: "Save previous values before overwriting",
        11: "Hold: keep holding OR buy today (must have been resting)",
        12: "Sold: sell today (must have been holding)",
        13: "Rest: keep resting OR transition from sold (cooldown done)",
        16: "Answer: max of sold or resting on last day (holding is suboptimal)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Multiple transactions with cooldown",
          input: { prices: [1, 2, 3, 0, 2] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5, 6],
              shortLabel: "Init states",
              explanation: "Initialize three states. hold = -1 (bought at price 1), sold = 0, rest = 0. We model as a DP table: rows = days, columns = [hold, sold, rest].",
              variables: { hold: -1, sold: 0, rest: 0, "prices[0]": 1 },
              dataStructure: {
                dpTable: [[-1, 0, 0], [null, null, null], [null, null, null], [null, null, null], [null, null, null]],
                dpHighlight2D: { row: 0, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9, 10, 11, 12, 13],
              shortLabel: "Day 1: price=2",
              explanation: "hold = max(-1, 0-2) = max(-1, -2) = -1 (keep holding). sold = -1+2 = 1 (sell what we held). rest = max(0, 0) = 0. Best so far: selling gives profit 1.",
              variables: { i: 1, "prices[i]": 2, hold: -1, sold: 1, rest: 0 },
              dataStructure: {
                dpTable: [[-1, 0, 0], [-1, 1, 0], [null, null, null], [null, null, null], [null, null, null]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 0, c: 0 }, to: { r: 1, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9, 10, 11, 12, 13],
              shortLabel: "Day 2: price=3",
              explanation: "hold = max(-1, 0-3) = -1 (keep holding). sold = -1+3 = 2 (sell for bigger profit). rest = max(0, 1) = 1 (cooldown from yesterday's sale).",
              variables: { i: 2, "prices[i]": 3, hold: -1, sold: 2, rest: 1 },
              dataStructure: {
                dpTable: [[-1, 0, 0], [-1, 1, 0], [-1, 2, 1], [null, null, null], [null, null, null]],
                dpHighlight2D: { row: 2, col: 1 },
                dpArrows2D: [{ from: { r: 1, c: 0 }, to: { r: 2, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9, 10, 11, 12, 13],
              shortLabel: "Day 3: price=0",
              explanation: "hold = max(-1, 1-0) = 1 (buy at 0 after resting from previous sale — free stock!). sold = -1+0 = -1. rest = max(1, 2) = 2. Buying at 0 is excellent.",
              variables: { i: 3, "prices[i]": 0, hold: 1, sold: -1, rest: 2 },
              dataStructure: {
                dpTable: [[-1, 0, 0], [-1, 1, 0], [-1, 2, 1], [1, -1, 2], [null, null, null]],
                dpHighlight2D: { row: 3, col: 0 },
                dpArrows2D: [{ from: { r: 2, c: 2 }, to: { r: 3, c: 0 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 9, 10, 11, 12, 13],
              shortLabel: "Day 4: price=2",
              explanation: "hold = max(1, 2-2) = 1 (keep holding). sold = 1+2 = 3 (sell what we bought at 0 for profit 2, plus previous profit 1). rest = max(2, -1) = 2.",
              variables: { i: 4, "prices[i]": 2, hold: 1, sold: 3, rest: 2 },
              dataStructure: {
                dpTable: [[-1, 0, 0], [-1, 1, 0], [-1, 2, 1], [1, -1, 2], [1, 3, 2]],
                dpHighlight2D: { row: 4, col: 1 },
                dpArrows2D: [{ from: { r: 3, c: 0 }, to: { r: 4, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [16],
              shortLabel: "Answer: max(3, 2) = 3",
              explanation: "max(sold, rest) = max(3, 2) = 3. The optimal strategy: buy@1, sell@2 (profit 1), cooldown, buy@0, sell@2 (profit 2). Total = 3.",
              variables: { sold: 3, rest: 2, answer: 3 },
              dataStructure: {
                dpTable: [[-1, 0, 0], [-1, 1, 0], [-1, 2, 1], [1, -1, 2], [1, 3, 2]],
                dpHighlight2D: { row: 4, col: 1 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Day",
          description: "Only one price — no transaction possible",
          input: { prices: [5] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Check length",
              explanation: "Only 1 day. We need at least 2 days to complete a buy-sell transaction. Return 0 immediately.",
              variables: { n: 1, answer: 0 },
              dataStructure: {
                dpTable: [[-5, 0, 0]],
                dpHighlight2D: { row: 0, col: 2 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Decreasing Prices",
          description: "Prices only go down — best is to never buy",
          input: { prices: [5, 4, 3, 2, 1] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5, 6],
              shortLabel: "Init states",
              explanation: "hold = -5 (buy at 5), sold = 0, rest = 0.",
              variables: { hold: -5, sold: 0, rest: 0 },
              dataStructure: {
                dpTable: [[-5, 0, 0], [null, null, null], [null, null, null], [null, null, null], [null, null, null]],
                dpHighlight2D: { row: 0, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9, 10, 11, 12, 13],
              shortLabel: "Day 1: price=4",
              explanation: "hold = max(-5, 0-4) = -4 (better to buy now at 4 than at 5). sold = -5+4 = -1 (selling at loss). rest = max(0, 0) = 0.",
              variables: { i: 1, "prices[i]": 4, hold: -4, sold: -1, rest: 0 },
              dataStructure: {
                dpTable: [[-5, 0, 0], [-4, -1, 0], [null, null, null], [null, null, null], [null, null, null]],
                dpHighlight2D: { row: 1, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9, 10, 11, 12, 13],
              shortLabel: "Day 2: price=3",
              explanation: "hold = max(-4, 0-3) = -3. sold = -4+3 = -1. rest = max(0, -1) = 0. Selling always results in a loss.",
              variables: { i: 2, "prices[i]": 3, hold: -3, sold: -1, rest: 0 },
              dataStructure: {
                dpTable: [[-5, 0, 0], [-4, -1, 0], [-3, -1, 0], [null, null, null], [null, null, null]],
                dpHighlight2D: { row: 2, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9, 10, 11, 12, 13],
              shortLabel: "Day 3: price=2",
              explanation: "hold = max(-3, 0-2) = -2. sold = -3+2 = -1. rest = max(0, -1) = 0.",
              variables: { i: 3, "prices[i]": 2, hold: -2, sold: -1, rest: 0 },
              dataStructure: {
                dpTable: [[-5, 0, 0], [-4, -1, 0], [-3, -1, 0], [-2, -1, 0], [null, null, null]],
                dpHighlight2D: { row: 3, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 9, 10, 11, 12, 13],
              shortLabel: "Day 4: price=1",
              explanation: "hold = max(-2, 0-1) = -1. sold = -2+1 = -1. rest = max(0, -1) = 0. Every sell results in a loss.",
              variables: { i: 4, "prices[i]": 1, hold: -1, sold: -1, rest: 0 },
              dataStructure: {
                dpTable: [[-5, 0, 0], [-4, -1, 0], [-3, -1, 0], [-2, -1, 0], [-1, -1, 0]],
                dpHighlight2D: { row: 4, col: 2 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [16],
              shortLabel: "Answer: max(-1, 0) = 0",
              explanation: "max(sold, rest) = max(-1, 0) = 0. Best to never trade when prices only decline. The 'rest' state wins.",
              variables: { sold: -1, rest: 0, answer: 0 },
              dataStructure: {
                dpTable: [[-5, 0, 0], [-4, -1, 0], [-3, -1, 0], [-2, -1, 0], [-1, -1, 0]],
                dpHighlight2D: { row: 4, col: 2 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ prices }) {
        const steps = [];
        const n = prices.length;
        if (n < 2) {
          steps.push({
            stepId: 0, lineNumbers: [2],
            shortLabel: "Too few days",
            explanation: `Only ${n} day(s). Need at least 2 for a transaction. Return 0.`,
            variables: { n, answer: 0 },
            dataStructure: { dpTable: [[`-${prices[0]}`, 0, 0]], dpHighlight2D: { row: 0, col: 2 }, dpArrows2D: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        let hold = -prices[0], sold = 0, rest = 0;
        const table = [[hold, sold, rest]];

        steps.push({
          stepId: 0, lineNumbers: [4, 5, 6],
          shortLabel: "Init states",
          explanation: `hold = -${prices[0]}, sold = 0, rest = 0.`,
          variables: { hold, sold, rest, "prices[0]": prices[0] },
          dataStructure: {
            dpTable: table.map(r => [...r]).concat(Array.from({ length: n - 1 }, () => [null, null, null])),
            dpHighlight2D: { row: 0, col: 0 }, dpArrows2D: [],
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i < n; i++) {
          const pH = hold, pS = sold;
          hold = Math.max(hold, rest - prices[i]);
          sold = pH + prices[i];
          rest = Math.max(rest, pS);
          table.push([hold, sold, rest]);

          const bestCol = sold >= rest ? 1 : 2;
          const isLast = i === n - 1;

          steps.push({
            stepId: steps.length, lineNumbers: [8, 9, 10, 11, 12, 13],
            shortLabel: `Day ${i}: price=${prices[i]}`,
            explanation: `hold = max(${pH}, ${rest}-${prices[i]}) = ${hold}. sold = ${pH}+${prices[i]} = ${sold}. rest = max(${rest}, ${pS}) = ${rest}.`,
            variables: { i, "prices[i]": prices[i], hold, sold, rest, ...(isLast ? { answer: Math.max(sold, rest) } : {}) },
            dataStructure: {
              dpTable: table.map(r => [...r]).concat(Array.from({ length: n - 1 - i }, () => [null, null, null])),
              dpHighlight2D: { row: i, col: bestCol }, dpArrows2D: [],
            },
            delta: {}, isAnswer: false,
          });
        }

        const answer = Math.max(sold, rest);
        steps.push({
          stepId: steps.length, lineNumbers: [16],
          shortLabel: `Answer: ${answer}`,
          explanation: `max(sold=${sold}, rest=${rest}) = ${answer}.`,
          variables: { sold, rest, answer },
          dataStructure: {
            dpTable: table.map(r => [...r]),
            dpHighlight2D: { row: n - 1, col: sold >= rest ? 1 : 2 }, dpArrows2D: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(3^n)", space: "O(n)", explanation: "Three choices per day, n levels deep" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass with three variables", tradeoff: "State machine formulation reduces exponential to linear" },
  },

  interviewTips: [
    "Identify the three states first: holding, sold (cooldown), resting. Draw the state machine transitions.",
    "Explain why greedy fails: the cooldown constraint prevents simply selling at every local peak.",
    "Start with the O(n) space DP table version, then optimize to O(1) by noting each row depends only on the previous.",
    "Mention that without the cooldown constraint, this reduces to the basic 'buy and sell any number of times' problem.",
    "Be ready to trace through a small example on the whiteboard.",
  ],

  relatedProblems: ["best-time-to-buy-stock", "buy-sell-with-cooldown", "longest-increasing-subsequence"],
};
