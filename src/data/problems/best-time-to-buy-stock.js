export const bestTimeToBuyStock = {
  id: 15,
  slug: "best-time-to-buy-stock",
  title: "Best Time to Buy and Sell Stock",
  difficulty: "Easy",
  topic: "sliding-window",
  topicLabel: "Sliding Window",
  neetcodeNumber: 15,
  artifactType: "SlidingWindow",
  companies: ["Amazon", "Meta", "Google", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",

  pattern: "Sliding Window / Kadane's Variant",
  patternExplanation: "Track minimum price seen so far, compute profit at each step.",

  intuition: {
    coreInsight: "Track the minimum price seen so far. At each price, the best profit is current price minus the minimum. Keep updating the global max profit.",
    mentalModel: "You're walking through a timeline of stock prices with a notepad. Write down the cheapest price you've seen. At each new price, calculate: 'If I had bought at my cheapest, how much would I make selling now?'",
    whyNaiveFails: "Brute force checks every buy-sell pair: O(n²). We only need one pass tracking the running minimum.",
    keyObservation: "You must buy before you sell. So iterate left to right, always knowing the cheapest price so far.",
  },

  problem: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If you cannot achieve any profit, return 0.",

  examples: [
    { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 1 (price=1), sell on day 4 (price=6), profit = 6-1 = 5." },
    { input: "prices = [7,6,4,3,1]", output: "0", explanation: "Prices only decrease. No profitable transaction possible." },
  ],

  constraints: [
    "1 <= prices.length <= 10^5",
    "0 <= prices[i] <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: "Try every pair of buy and sell days.",

      javaCode: `public int maxProfit(int[] prices) {
    int maxProfit = 0;
    for (int i = 0; i < prices.length; i++) {
        for (int j = i + 1; j < prices.length; j++) {
            maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
        }
    }
    return maxProfit;
}`,
      cppCode: `int maxProfit(vector<int>& prices) {
    int maxProfit = 0;
    for (int i = 0; i < prices.size(); i++) {
        for (int j = i + 1; j < prices.size(); j++) {
            maxProfit = max(maxProfit, prices[j] - prices[i]);
        }
    }
    return maxProfit;
}`,
      pythonCode: `def maxProfit(prices: List[int]) -> int:
    max_profit = 0
    for i in range(len(prices)):
        for j in range(i + 1, len(prices)):
            max_profit = max(max_profit, prices[j] - prices[i])
    return max_profit`,

      lineAnnotations: { 3: "Fix buy day", 4: "Try every sell day after", 5: "Track max profit" },

      dryRunScenarios: {
        standard: {
          id: "standard", label: "Standard",
          input: { nums: [7, 1, 5, 3, 6, 4] },
          expectedOutput: "5",
          steps: [
            { stepId: 0, lineNumbers: [2], shortLabel: "Init", explanation: "maxProfit = 0. Try every pair.", variables: { maxProfit: 0 }, dataStructure: { arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" }, pointers: [] }, delta: {}, isAnswer: false },
            { stepId: 1, lineNumbers: [8], shortLabel: "Answer: 5", explanation: "Best pair: buy at index 1 (price=1), sell at index 4 (price=6). Profit = 5.", variables: { answer: "5", buyDay: 1, sellDay: 4 }, dataStructure: { arrayStates: { 0: "visited", 1: "found", 2: "visited", 3: "visited", 4: "found", 5: "visited" }, pointers: [] }, delta: {}, isAnswer: true },
          ],
        },
      },

      computeSteps: function({ nums }) {
        let maxP = 0, bi = 0, si = 0;
        for (let i = 0; i < nums.length; i++)
          for (let j = i + 1; j < nums.length; j++)
            if (nums[j] - nums[i] > maxP) { maxP = nums[j] - nums[i]; bi = i; si = j; }
        const states = Object.fromEntries(nums.map((_, i) => [i, i === bi || i === si ? "found" : "visited"]));
        return [
          { stepId: 0, lineNumbers: [2], shortLabel: "Init", explanation: "maxProfit = 0.", variables: { maxProfit: 0 }, dataStructure: { arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])), pointers: [] }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [8], shortLabel: `Answer: ${maxP}`, explanation: `Best profit = ${maxP}.`, variables: { answer: String(maxP) }, dataStructure: { arrayStates: states, pointers: [] }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "One Pass Min Tracking",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "Track minimum price so far. At each price, compute profit = price - minPrice. Update maxProfit.",

      javaCode: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;

    for (int i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
    }
    return maxProfit;
}`,
      cppCode: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;

    for (int i = 0; i < prices.size(); i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            maxProfit = max(maxProfit, prices[i] - minPrice);
        }
    }
    return maxProfit;
}`,
      pythonCode: `def maxProfit(prices: List[int]) -> int:
    min_price = float('inf')
    max_profit = 0

    for price in prices:
        if price < min_price:
            min_price = price
        else:
            max_profit = max(max_profit, price - min_price)
    return max_profit`,

      lineAnnotations: {
        2: "Track cheapest price seen so far",
        3: "Track best profit achievable",
        6: "New minimum found — update buy price",
        8: "Compute profit if we sell today",
      },

      dryRunScenarios: {
        standard: {
          id: "standard", label: "Standard",
          description: "Classic case with dip then rise",
          input: { nums: [7, 1, 5, 3, 6, 4] },
          expectedOutput: "5",
          steps: [
            { stepId: 0, lineNumbers: [2, 3], shortLabel: "Init", explanation: "minPrice = ∞, maxProfit = 0.", variables: { minPrice: "∞", maxProfit: 0 }, dataStructure: { arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" }, pointers: [], windowLeft: undefined, windowRight: undefined }, delta: {}, isAnswer: false },
            { stepId: 1, lineNumbers: [5, 6], shortLabel: "i=0: min=7", explanation: "prices[0]=7 < ∞ → new minPrice = 7.", variables: { i: 0, price: 7, minPrice: 7, maxProfit: 0 }, dataStructure: { arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" }, pointers: [{ name: "i", index: 0, color: "pointer" }], windowLeft: 0, windowRight: 0, windowMeta: "min=7, profit=0" }, delta: { changedIndices: [0] }, isAnswer: false },
            { stepId: 2, lineNumbers: [5, 6], shortLabel: "i=1: min=1", explanation: "prices[1]=1 < 7 → new minPrice = 1. This is our new best buy day.", variables: { i: 1, price: 1, minPrice: 1, maxProfit: 0 }, dataStructure: { arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" }, pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "buy", index: 1, color: "found" }], windowLeft: 1, windowRight: 1, windowMeta: "min=1, profit=0" }, delta: { changedIndices: [1] }, isAnswer: false },
            { stepId: 3, lineNumbers: [8], shortLabel: "i=2: profit=4", explanation: "prices[2]=5. Profit = 5 - 1 = 4. maxProfit = max(0, 4) = 4.", variables: { i: 2, price: 5, minPrice: 1, profit: 4, maxProfit: 4 }, dataStructure: { arrayStates: { 0: "visited", 1: "found", 2: "active", 3: "default", 4: "default", 5: "default" }, pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "buy", index: 1, color: "found" }], windowLeft: 1, windowRight: 2, windowMeta: "min=1, profit=4" }, delta: { changedIndices: [2] }, isAnswer: false },
            { stepId: 4, lineNumbers: [8], shortLabel: "i=3: profit=2", explanation: "prices[3]=3. Profit = 3 - 1 = 2 < 4. maxProfit stays 4.", variables: { i: 3, price: 3, minPrice: 1, profit: 2, maxProfit: 4 }, dataStructure: { arrayStates: { 0: "visited", 1: "found", 2: "visited", 3: "active", 4: "default", 5: "default" }, pointers: [{ name: "i", index: 3, color: "pointer" }, { name: "buy", index: 1, color: "found" }], windowLeft: 1, windowRight: 3, windowMeta: "min=1, profit=4" }, delta: { changedIndices: [3] }, isAnswer: false },
            { stepId: 5, lineNumbers: [8], shortLabel: "i=4: profit=5 ✓", explanation: "prices[4]=6. Profit = 6 - 1 = 5 > 4. New maxProfit = 5!", variables: { i: 4, price: 6, minPrice: 1, profit: 5, maxProfit: 5 }, dataStructure: { arrayStates: { 0: "visited", 1: "found", 2: "visited", 3: "visited", 4: "active", 5: "default" }, pointers: [{ name: "i", index: 4, color: "pointer" }, { name: "buy", index: 1, color: "found" }], windowLeft: 1, windowRight: 4, windowMeta: "min=1, profit=5" }, delta: { changedIndices: [4] }, isAnswer: false },
            { stepId: 6, lineNumbers: [8], shortLabel: "i=5: profit=3", explanation: "prices[5]=4. Profit = 4 - 1 = 3 < 5. maxProfit stays 5.", variables: { i: 5, price: 4, minPrice: 1, profit: 3, maxProfit: 5 }, dataStructure: { arrayStates: { 0: "visited", 1: "found", 2: "visited", 3: "visited", 4: "found", 5: "active" }, pointers: [{ name: "i", index: 5, color: "pointer" }], windowLeft: 1, windowRight: 5, windowMeta: "min=1, profit=5" }, delta: { changedIndices: [5] }, isAnswer: false },
            { stepId: 7, lineNumbers: [12], shortLabel: "Return 5", explanation: "Done scanning. Best profit = 5 (buy at 1, sell at 6).", variables: { answer: "5", maxProfit: 5 }, dataStructure: { arrayStates: { 0: "visited", 1: "found", 2: "visited", 3: "visited", 4: "found", 5: "visited" }, pointers: [] }, delta: {}, isAnswer: true },
          ],
        },

        edgeCase1: {
          id: "edgeCase1", label: "Decreasing",
          description: "Prices only go down — no profit",
          input: { nums: [7, 6, 4, 3, 1] },
          expectedOutput: "0",
          steps: [
            { stepId: 0, lineNumbers: [2, 3], shortLabel: "Init", explanation: "minPrice = ∞, maxProfit = 0.", variables: { minPrice: "∞", maxProfit: 0 }, dataStructure: { arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" }, pointers: [] }, delta: {}, isAnswer: false },
            { stepId: 1, lineNumbers: [5, 6, 12], shortLabel: "All decreasing → 0", explanation: "Every price is a new minimum. We never find a profitable sell. Return 0.", variables: { answer: "0", maxProfit: 0 }, dataStructure: { arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited" }, pointers: [] }, delta: {}, isAnswer: true },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        let minPrice = Infinity, maxProfit = 0, buyIdx = 0;
        const n = nums.length;

        steps.push({ stepId: 0, lineNumbers: [2, 3], shortLabel: "Init", explanation: "minPrice = ∞, maxProfit = 0.", variables: { minPrice: "∞", maxProfit: 0 }, dataStructure: { arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])), pointers: [] }, delta: {}, isAnswer: false });

        for (let i = 0; i < n; i++) {
          const price = nums[i];
          if (price < minPrice) {
            minPrice = price;
            buyIdx = i;
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6], shortLabel: `i=${i}: min=${price}`,
              explanation: `prices[${i}]=${price} < ${i === 0 ? '∞' : nums[i-1]} → new minPrice = ${price}.`,
              variables: { i, price, minPrice, maxProfit },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
                pointers: [{ name: "i", index: i, color: "pointer" }],
                windowLeft: buyIdx, windowRight: i, windowMeta: `min=${minPrice}, profit=${maxProfit}`,
              }, delta: { changedIndices: [i] }, isAnswer: false,
            });
          } else {
            const profit = price - minPrice;
            maxProfit = Math.max(maxProfit, profit);
            steps.push({
              stepId: steps.length, lineNumbers: [8], shortLabel: `i=${i}: profit=${profit}`,
              explanation: `prices[${i}]=${price}. Profit = ${price} - ${minPrice} = ${profit}. maxProfit = ${maxProfit}.`,
              variables: { i, price, minPrice, profit, maxProfit },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, j) => [j, j === buyIdx ? "found" : j < i ? "visited" : j === i ? "active" : "default"])),
                pointers: [{ name: "i", index: i, color: "pointer" }, { name: "buy", index: buyIdx, color: "found" }],
                windowLeft: buyIdx, windowRight: i, windowMeta: `min=${minPrice}, profit=${maxProfit}`,
              }, delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        steps.push({ stepId: steps.length, lineNumbers: [12], shortLabel: `Return ${maxProfit}`, explanation: `Done. Max profit = ${maxProfit}.`, variables: { answer: String(maxProfit) }, dataStructure: { arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])), pointers: [] }, delta: {}, isAnswer: true });
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n²)", space: "O(1)", explanation: "Two nested loops" },
    optimal: { time: "O(n)",  space: "O(1)", explanation: "Single pass tracking minimum" },
  },

  interviewTips: [
    "Clarify: can we buy and sell on the same day? (No — must be different days.)",
    "Mention the greedy insight: at each price, the best buy is the lowest price before it.",
    "This is a special case of Kadane's algorithm.",
  ],
};
