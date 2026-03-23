export const burstBalloons = {
  id: 119,
  slug: "burst-balloons",
  title: "Burst Balloons",
  difficulty: "Hard",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 119,
  artifactType: "DPTable2D",
  companies: ["Google", "Amazon", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/burst-balloons/",

  pattern: "Interval DP",
  patternExplanation: `Instead of choosing which balloon to burst first, choose which to burst LAST
    in each subrange. dp[i][j] = max coins from bursting all balloons between i and j (exclusive).`,

  intuition: {
    coreInsight: `The trick is to think backwards: instead of "which balloon do I burst first?",
      ask "which balloon do I burst LAST in this range?" If balloon k is the last one burst
      between boundaries i and j, then when we burst k, the only remaining neighbors are
      nums[i] and nums[j]. This gives us: dp[i][j] = max over k of (dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]).`,

    mentalModel: `Imagine a row of dominos where knocking one over gives you coins based on
      it and its neighbors. But neighbors change as dominos fall. The insight: plan from the
      END. "Which domino will be the LAST standing in this section?" Once you decide that,
      you know its neighbors will be the section boundaries, making the coin calculation simple.`,

    whyNaiveFails: `Trying all permutations of burst order gives n! possibilities. For n=300,
      that's astronomically large. The interval DP approach reduces this to O(n^3) by recognizing
      that subproblems overlap — the optimal solution for bursting balloons in range [i,j]
      doesn't depend on what happened outside that range.`,

    keyObservation: `We pad the array with 1s on both ends: [1, ...nums, 1]. dp[i][j] represents
      the max coins from bursting all balloons strictly between index i and j. When balloon k
      is the last to burst in (i,j), its neighbors are exactly nums[i] and nums[j] because
      everything else between i and j has already been burst.`,
  },

  problem: `You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a
    number on it represented by an array nums. You are asked to burst all the balloons. If you
    burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or
    i + 1 goes out of bounds, treat it as if there is a balloon with a 1 painted on it. Return
    the maximum coins you can collect by bursting the balloons wisely.`,

  examples: [
    { input: "nums = [3,1,5,8]", output: "167", explanation: "Burst order: 1,5,3,8 → 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 15+120+24+8 = 167" },
    { input: "nums = [1,5]", output: "10", explanation: "Burst 1 first (1*1*5=5), then 5 (1*5*1=5). Total = 10" },
  ],

  constraints: [
    "n == nums.length",
    "1 <= n <= 300",
    "0 <= nums[i] <= 100",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Try All Orders)",
      tier: "brute",
      timeComplexity: "O(n! * n)",
      spaceComplexity: "O(n)",
      idea: "Try all possible burst orders using backtracking. For each order, calculate total coins.",

      javaCode: `public int maxCoins(int[] nums) {
    List<Integer> list = new ArrayList<>();
    for (int n : nums) list.add(n);
    return backtrack(list);
}

private int backtrack(List<Integer> list) {
    if (list.isEmpty()) return 0;
    int max = 0;
    for (int i = 0; i < list.size(); i++) {
        int left = i > 0 ? list.get(i-1) : 1;
        int right = i < list.size()-1 ? list.get(i+1) : 1;
        int coins = left * list.get(i) * right;
        int val = list.remove(i);
        max = Math.max(max, coins + backtrack(list));
        list.add(i, val);
    }
    return max;
}`,

      cppCode: `int maxCoins(vector<int>& nums) {
    return backtrack(nums);
}

int backtrack(vector<int>& nums) {
    if (nums.empty()) return 0;
    int maxCoins = 0;
    for (int i = 0; i < nums.size(); i++) {
        int left = i > 0 ? nums[i-1] : 1;
        int right = i < nums.size()-1 ? nums[i+1] : 1;
        int coins = left * nums[i] * right;
        int val = nums[i];
        nums.erase(nums.begin() + i);
        maxCoins = max(maxCoins, coins + backtrack(nums));
        nums.insert(nums.begin() + i, val);
    }
    return maxCoins;
}`,

      pythonCode: `def maxCoins(nums: List[int]) -> int:
    def backtrack(arr):
        if not arr:
            return 0
        max_coins = 0
        for i in range(len(arr)):
            left = arr[i-1] if i > 0 else 1
            right = arr[i+1] if i < len(arr)-1 else 1
            coins = left * arr[i] * right
            new_arr = arr[:i] + arr[i+1:]
            max_coins = max(max_coins, coins + backtrack(new_arr))
        return max_coins
    return backtrack(nums)`,

      lineAnnotations: {
        7: "Base case: no balloons left",
        9: "Try bursting each balloon",
        10: "Left neighbor (or 1 if at boundary)",
        11: "Right neighbor (or 1 if at boundary)",
        12: "Coins from bursting balloon i",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [3, 1, 5, 8] },
          expectedOutput: "167",
          steps: [
            {
              stepId: 0, lineNumbers: [1], shortLabel: "Try all burst orders",
              explanation: "With 4 balloons, there are 4! = 24 possible burst orders. We try each one and track the maximum coins.",
              variables: { n: 4, permutations: "4! = 24" },
              dataStructure: { dpTable: [[3,1,5,8]], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [9, 12], shortLabel: "Best order: 1,5,3,8",
              explanation: "The optimal order is burst 1, then 5, then 3, then 8: (3*1*5)+(3*5*8)+(1*3*8)+(1*8*1) = 15+120+24+8 = 167.",
              variables: { order: "[1,5,3,8]", coins: "15+120+24+8=167" },
              dataStructure: { dpTable: [[3,1,5,8]], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [16], shortLabel: "Result: 167",
              explanation: "Maximum coins achievable is 167.",
              variables: { answer: 167 },
              dataStructure: { dpTable: [[3,1,5,8]], dpHighlight2D: null },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        // Use DP to compute answer for display in brute force
        const n = nums.length;
        const arr = [1, ...nums, 1];
        const dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(0));
        for (let len = 1; len <= n; len++) {
          for (let i = 1; i <= n - len + 1; i++) {
            const j = i + len - 1;
            for (let k = i; k <= j; k++) {
              dp[i][j] = Math.max(dp[i][j], dp[i][k-1] + arr[i-1]*arr[k]*arr[j+1] + dp[k+1][j]);
            }
          }
        }
        const ans = dp[1][n];
        return [
          { stepId: 0, lineNumbers: [1], shortLabel: "Try all orders", explanation: `${n} balloons = ${n}! possible orderings.`, variables: { n }, dataStructure: { dpTable: [nums], dpHighlight2D: null }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [16], shortLabel: `Result: ${ans}`, explanation: `Maximum coins: ${ans}.`, variables: { answer: ans }, dataStructure: { dpTable: [nums], dpHighlight2D: null }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "Interval DP",
      tier: "optimal",
      timeComplexity: "O(n³)",
      spaceComplexity: "O(n²)",
      idea: `Pad array with 1s. dp[i][j] = max coins from bursting all balloons between i and j
        (exclusive). For each k in (i,j), try k as last burst: dp[i][j] = max(dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]).`,

      javaCode: `public int maxCoins(int[] nums) {
    int n = nums.length;
    int[] arr = new int[n + 2];
    arr[0] = arr[n + 1] = 1;
    for (int i = 0; i < n; i++) arr[i + 1] = nums[i];

    int[][] dp = new int[n + 2][n + 2];

    for (int len = 1; len <= n; len++) {
        for (int left = 1; left <= n - len + 1; left++) {
            int right = left + len - 1;
            for (int k = left; k <= right; k++) {
                int coins = arr[left-1] * arr[k] * arr[right+1];
                dp[left][right] = Math.max(dp[left][right],
                    dp[left][k-1] + coins + dp[k+1][right]);
            }
        }
    }

    return dp[1][n];
}`,

      cppCode: `int maxCoins(vector<int>& nums) {
    int n = nums.size();
    vector<int> arr(n + 2, 1);
    for (int i = 0; i < n; i++) arr[i + 1] = nums[i];

    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));

    for (int len = 1; len <= n; len++) {
        for (int left = 1; left <= n - len + 1; left++) {
            int right = left + len - 1;
            for (int k = left; k <= right; k++) {
                int coins = arr[left-1] * arr[k] * arr[right+1];
                dp[left][right] = max(dp[left][right],
                    dp[left][k-1] + coins + dp[k+1][right]);
            }
        }
    }

    return dp[1][n];
}`,

      pythonCode: `def maxCoins(nums: List[int]) -> int:
    n = len(nums)
    arr = [1] + nums + [1]
    dp = [[0] * (n + 2) for _ in range(n + 2)]

    for length in range(1, n + 1):
        for left in range(1, n - length + 2):
            right = left + length - 1
            for k in range(left, right + 1):
                coins = arr[left-1] * arr[k] * arr[right+1]
                dp[left][right] = max(dp[left][right],
                    dp[left][k-1] + coins + dp[k+1][right])

    return dp[1][n]`,

      lineAnnotations: {
        3: "Pad array with 1s on both ends for boundary handling",
        7: "dp[i][j] = max coins from bursting balloons i..j",
        9: "Process intervals by increasing length",
        12: "Try each balloon k as the LAST one burst in [left, right]",
        13: "When k is last, its neighbors are arr[left-1] and arr[right+1]",
        14: "Combine: left subproblem + burst k + right subproblem",
        20: "Answer covers the entire original array",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "nums = [3,1,5,8], optimal = 167",
          input: { nums: [3, 1, 5, 8] },
          expectedOutput: "167",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 7],
              shortLabel: "Pad array, init dp",
              explanation: "Pad nums with 1s: arr = [1,3,1,5,8,1]. Create 6x6 dp table. dp[i][j] = max coins from bursting all balloons in range [i,j].",
              variables: { arr: "[1,3,1,5,8,1]", n: 4 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [9, 12, 13],
              shortLabel: "len=1: single balloons",
              explanation: "dp[1][1]: burst balloon 1 (val 3) last, neighbors 1,1 → 1*3*1=3. dp[2][2]: burst 2 (val 1), neighbors 3,5 → 3*1*5=15. dp[3][3]: 1*5*8=40. dp[4][4]: 5*8*1=40.",
              variables: { "dp[1][1]": 3, "dp[2][2]": 15, "dp[3][3]": 40, "dp[4][4]": 40 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,3,0,0,0,0],[0,0,15,0,0,0],[0,0,0,40,0,0],[0,0,0,0,40,0],[0,0,0,0,0,0]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [9, 12, 13, 14],
              shortLabel: "len=2: pairs",
              explanation: "dp[1][2]: try k=1 (burst 3 last: 0+1*3*5+15=30) or k=2 (burst 1 last: 3+3*1*5+0=18). Best=30. dp[2][3]: try k=2 (15+3*1*8+40=71) or k=3 (0+3*5*8+40=...). Best=135. dp[3][4]: 48 or 40+..., best=48.",
              variables: { "dp[1][2]": 30, "dp[2][3]": 135, "dp[3][4]": 48 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,3,30,0,0,0],[0,0,15,135,0,0],[0,0,0,40,48,0],[0,0,0,0,40,0],[0,0,0,0,0,0]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [9, 12, 13, 14],
              shortLabel: "len=3: dp[1][3]",
              explanation: "dp[1][3]: try k=1,2,3 as last burst. k=1: dp[1][0]+1*3*8+dp[2][3]=0+24+135=159. k=2: dp[1][1]+1*1*8+dp[3][3]=3+8+40=51. k=3: dp[1][2]+1*5*8+dp[4][3]=30+40+0=70. Best=159.",
              variables: { "dp[1][3]": 159 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,3,30,159,0,0],[0,0,15,135,0,0],[0,0,0,40,48,0],[0,0,0,0,40,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 1, col: 3 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [9, 12, 13, 14],
              shortLabel: "len=4: dp[1][4]=167",
              explanation: "dp[1][4]: try all k. k=1: 0+1*3*1+dp[2][4]. k=3: dp[1][2]+1*5*1+dp[4][4]=30+5+40=75. k=4: dp[1][3]+1*8*1+0=159+8=167. Best is 167.",
              variables: { "dp[1][4]": 167 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,3,30,159,167,0],[0,0,15,135,159,0],[0,0,0,40,48,0],[0,0,0,0,40,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 1, col: 4 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [20],
              shortLabel: "Return dp[1][4] = 167",
              explanation: "dp[1][4] = 167. The maximum coins from bursting all 4 balloons is 167. The optimal last-burst order corresponds to bursting 1, then 5, then 3, then 8.",
              variables: { answer: 167 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,3,30,159,167,0],[0,0,15,135,159,0],[0,0,0,40,48,0],[0,0,0,0,40,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 1, col: 4 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Two Balloons",
          description: "Simple case with just 2 balloons",
          input: { nums: [1, 5] },
          expectedOutput: "10",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 7],
              shortLabel: "Pad: arr=[1,1,5,1]",
              explanation: "arr = [1,1,5,1]. Two balloons to burst.",
              variables: { arr: "[1,1,5,1]", n: 2 },
              dataStructure: { dpTable: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [9, 12, 13],
              shortLabel: "len=1: dp[1][1]=1, dp[2][2]=5",
              explanation: "Single balloons: dp[1][1]=1*1*5=5, dp[2][2]=1*5*1=5.",
              variables: { "dp[1][1]": 5, "dp[2][2]": 5 },
              dataStructure: { dpTable: [[0,0,0,0],[0,5,0,0],[0,0,5,0],[0,0,0,0]], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [9, 12, 14],
              shortLabel: "len=2: dp[1][2]=10",
              explanation: "dp[1][2]: k=1 → 0+1*1*1+5=6. k=2 → 5+1*5*1+0=10. Best=10. Burst 1 first (1*1*5=5), then 5 last (1*5*1=5).",
              variables: { "dp[1][2]": 10 },
              dataStructure: { dpTable: [[0,0,0,0],[0,5,10,0],[0,0,5,0],[0,0,0,0]], dpHighlight2D: { row: 1, col: 2 } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [20],
              shortLabel: "Return 10",
              explanation: "Maximum coins from bursting [1,5] is 10.",
              variables: { answer: 10 },
              dataStructure: { dpTable: [[0,0,0,0],[0,5,10,0],[0,0,5,0],[0,0,0,0]], dpHighlight2D: { row: 1, col: 2 } },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        const arr = [1, ...nums, 1];
        const dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(0));

        steps.push({
          stepId: 0, lineNumbers: [3, 7],
          shortLabel: "Init",
          explanation: `Pad array: [1, ${nums.join(',')}, 1]. Create dp table.`,
          variables: { arr: `[${arr.join(',')}]`, n },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: null },
          delta: {}, isAnswer: false,
        });

        for (let len = 1; len <= n; len++) {
          for (let left = 1; left <= n - len + 1; left++) {
            const right = left + len - 1;
            for (let k = left; k <= right; k++) {
              const coins = arr[left - 1] * arr[k] * arr[right + 1];
              dp[left][right] = Math.max(dp[left][right], dp[left][k - 1] + coins + dp[k + 1][right]);
            }
            steps.push({
              stepId: steps.length, lineNumbers: [12, 13, 14],
              shortLabel: `dp[${left}][${right}]=${dp[left][right]}`,
              explanation: `Range [${left},${right}]: tried all k as last burst. Best = ${dp[left][right]}.`,
              variables: { left, right, "dp[l][r]": dp[left][right] },
              dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: left, col: right } },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [20],
          shortLabel: `Return ${dp[1][n]}`,
          explanation: `dp[1][${n}] = ${dp[1][n]}. Maximum coins from bursting all balloons.`,
          variables: { answer: dp[1][n] },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: 1, col: n } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n! * n)", space: "O(n)", explanation: "Try all n! burst permutations" },
    optimal: { time: "O(n³)", space: "O(n²)", explanation: "Three nested loops: length, left, k. dp table is n²", tradeoff: "O(n²) space for dp table reduces factorial time to cubic" },
  },

  interviewTips: [
    "The key insight: think about which balloon to burst LAST, not first.",
    "Padding with 1s simplifies boundary handling.",
    "Clearly define dp[i][j] as the range between i and j (exclusive vs inclusive matters).",
    "Walk through a small example to show the interval DP pattern.",
    "This is a classic interval DP problem — mention it belongs to the same family as matrix chain multiplication.",
  ],

  relatedProblems: ["coin-change", "unique-paths", "longest-common-subsequence"],
};
