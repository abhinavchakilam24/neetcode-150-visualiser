export const distinctSubsequences = {
  id: 117,
  slug: "distinct-subsequences",
  title: "Distinct Subsequences",
  difficulty: "Hard",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 117,
  artifactType: "DPTable2D",
  companies: ["Google", "Amazon", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/distinct-subsequences/",

  pattern: "2D DP Subsequence Counting",
  patternExplanation: `Count how many ways to form t as a subsequence of s using a 2D table
    where dp[i][j] = number of ways to form t[0..j-1] from s[0..i-1].`,

  intuition: {
    coreInsight: `For each character in s, we have two choices: use it to match the current
      character in t (if they're equal), or skip it. dp[i][j] accumulates both possibilities.
      When s[i-1] == t[j-1], we can either use this match (dp[i-1][j-1]) or skip s[i-1] (dp[i-1][j]).
      When they differ, we must skip s[i-1], so dp[i][j] = dp[i-1][j].`,

    mentalModel: `Imagine s is a library of letters and t is a word you want to spell. For each
      letter in the library, you decide: "Should I use this letter for my word, or skip it?"
      When a letter matches what you need, you can go either way — that's why we add both paths.
      dp[i][j] counts all the different "selection plans" that work.`,

    whyNaiveFails: `Brute force tries all 2^n subsets of s and checks each against t. For s of
      length 1000, that's 2^1000 subsets — impossibly large. The 2D DP reduces this to O(m*n)
      by reusing subproblem results.`,

    keyObservation: `The recurrence is: if s[i-1] == t[j-1], dp[i][j] = dp[i-1][j-1] + dp[i-1][j].
      The first term counts subsequences that USE s[i-1] to match t[j-1]. The second counts
      subsequences that SKIP s[i-1]. When they don't match, dp[i][j] = dp[i-1][j] (must skip).
      Base case: dp[i][0] = 1 for all i (empty t is always a subsequence).`,
  },

  problem: `Given two strings s and t, return the number of distinct subsequences of s which
    equals t. A subsequence is a sequence that can be derived from another string by deleting
    some or no characters without changing the order of the remaining characters.`,

  examples: [
    { input: 's = "rabbbit", t = "rabbit"', output: "3", explanation: "There are 3 ways to choose 'rabbit' from 'rabbbit'" },
    { input: 's = "babgbag", t = "bag"', output: "5", explanation: "There are 5 ways to form 'bag' from 'babgbag'" },
  ],

  constraints: [
    "1 <= s.length, t.length <= 1000",
    "s and t consist of English letters.",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(2^m)",
      spaceComplexity: "O(m)",
      idea: "For each character in s, choose to include or skip it. Count all valid subsequences.",

      javaCode: `public int numDistinct(String s, String t) {
    return helper(s, t, 0, 0);
}

private int helper(String s, String t, int i, int j) {
    if (j == t.length()) return 1;
    if (i == s.length()) return 0;
    int result = helper(s, t, i + 1, j);
    if (s.charAt(i) == t.charAt(j)) {
        result += helper(s, t, i + 1, j + 1);
    }
    return result;
}`,

      cppCode: `int numDistinct(string s, string t) {
    return helper(s, t, 0, 0);
}

int helper(string& s, string& t, int i, int j) {
    if (j == t.size()) return 1;
    if (i == s.size()) return 0;
    int result = helper(s, t, i + 1, j);
    if (s[i] == t[j]) {
        result += helper(s, t, i + 1, j + 1);
    }
    return result;
}`,

      pythonCode: `def numDistinct(s: str, t: str) -> int:
    def helper(i, j):
        if j == len(t): return 1
        if i == len(s): return 0
        result = helper(i + 1, j)
        if s[i] == t[j]:
            result += helper(i + 1, j + 1)
        return result
    return helper(0, 0)`,

      lineAnnotations: {
        5: "All of t matched — found one valid subsequence",
        6: "Ran out of s characters — can't complete t",
        7: "Always try skipping s[i]",
        8: "If characters match, also try using s[i] to match t[j]",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "rabbbit", t: "rabbit" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0, lineNumbers: [1, 2], shortLabel: "Start recursion",
              explanation: "Begin exploring all ways to form 'rabbit' from 'rabbbit'. Each 'b' in 'rabbbit' can be chosen or skipped.",
              variables: { s: "rabbbit", t: "rabbit", i: 0, j: 0 },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [7, 8, 9], shortLabel: "Result: 3",
              explanation: "After exploring all paths, there are 3 distinct ways to choose characters from 'rabbbit' to form 'rabbit' — picking each of the three 'b's differently.",
              variables: { answer: 3 },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, t }) {
        const m = s.length, n = t.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = 1;
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            dp[i][j] = dp[i - 1][j];
            if (s[i - 1] === t[j - 1]) dp[i][j] += dp[i - 1][j - 1];
          }
        }
        return [
          { stepId: 0, lineNumbers: [1], shortLabel: "Start", explanation: `Count subsequences of "${s}" equal to "${t}".`, variables: { s, t }, dataStructure: { dpTable: [], dpHighlight2D: null }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [7], shortLabel: `Result: ${dp[m][n]}`, explanation: `Found ${dp[m][n]} distinct subsequences.`, variables: { answer: dp[m][n] }, dataStructure: { dpTable: [], dpHighlight2D: null }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "Bottom-Up 2D DP",
      tier: "optimal",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
      idea: `Build dp[i][j] = number of distinct subsequences of s[0..i-1] that equal t[0..j-1].
        If s[i-1]==t[j-1]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]. Else: dp[i][j] = dp[i-1][j].`,

      javaCode: `public int numDistinct(String s, String t) {
    int m = s.length(), n = t.length();
    long[][] dp = new long[m + 1][n + 1];

    for (int i = 0; i <= m; i++) dp[i][0] = 1;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            dp[i][j] = dp[i-1][j];
            if (s.charAt(i-1) == t.charAt(j-1)) {
                dp[i][j] += dp[i-1][j-1];
            }
        }
    }

    return (int) dp[m][n];
}`,

      cppCode: `int numDistinct(string s, string t) {
    int m = s.size(), n = t.size();
    vector<vector<long long>> dp(m + 1, vector<long long>(n + 1, 0));

    for (int i = 0; i <= m; i++) dp[i][0] = 1;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            dp[i][j] = dp[i-1][j];
            if (s[i-1] == t[j-1]) {
                dp[i][j] += dp[i-1][j-1];
            }
        }
    }

    return dp[m][n];
}`,

      pythonCode: `def numDistinct(s: str, t: str) -> int:
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = 1

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = dp[i-1][j]
            if s[i-1] == t[j-1]:
                dp[i][j] += dp[i-1][j-1]

    return dp[m][n]`,

      lineAnnotations: {
        3: "DP table: dp[i][j] = ways to form t[0..j-1] from s[0..i-1]",
        5: "Base case: empty t is a subsequence of any prefix of s",
        9: "Skip s[i-1]: carry forward dp[i-1][j]",
        10: "If characters match, also add the 'use it' path",
        11: "dp[i-1][j-1] = ways if we match s[i-1] with t[j-1]",
        16: "Answer: ways to form all of t from all of s",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Count subsequences of "babgbag" equal to "bag"',
          input: { s: "babgbag", t: "bag" },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 5],
              shortLabel: "Init dp table",
              explanation: 'Create 8x4 table. First column all 1s (empty t is always a subsequence). s="babgbag", t="bag".',
              variables: { m: 7, n: 3, s: "babgbag", t: "bag" },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [9, 10, 11],
              shortLabel: "i=1 (b): dp[1][1]=1",
              explanation: "s[0]='b', t[0]='b': match! dp[1][1] = dp[0][1] + dp[0][0] = 0 + 1 = 1. One way to form 'b' from 'b'.",
              variables: { i: 1, j: 1, "s[0]": "b", "t[0]": "b", "dp[1][1]": 1 },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 0, c: 0 }, to: { r: 1, c: 1 } }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [9],
              shortLabel: "i=2 (a): dp[2][1]=1, dp[2][2]=1",
              explanation: "s[1]='a'. For j=1: 'a'≠'b', skip → dp[2][1]=dp[1][1]=1. For j=2: 'a'='a', match → dp[2][2]=dp[1][2]+dp[1][1]=0+1=1.",
              variables: { i: 2, "s[1]": "a", "dp[2][1]": 1, "dp[2][2]": 1 },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
                dpHighlight2D: { row: 2, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [9, 10, 11],
              shortLabel: "i=3 (b): dp[3][1]=2",
              explanation: "s[2]='b', t[0]='b': match! dp[3][1] = dp[2][1] + dp[2][0] = 1 + 1 = 2. Now there are 2 ways to pick 'b'.",
              variables: { i: 3, "s[2]": "b", "dp[3][1]": 2 },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,2,1,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
                dpHighlight2D: { row: 3, col: 1 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [9, 10, 11],
              shortLabel: "i=4 (g): dp[4][3]=1",
              explanation: "s[3]='g', t[2]='g': match! dp[4][3] = dp[3][3] + dp[3][2] = 0 + 1 = 1. First complete 'bag' found.",
              variables: { i: 4, "s[3]": "g", "dp[4][3]": 1 },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,2,1,0],[1,2,1,1],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
                dpHighlight2D: { row: 4, col: 3 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [9, 10, 11],
              shortLabel: "i=5,6,7: accumulate",
              explanation: "Continue filling: i=5 (b) adds more 'b' options, i=6 (a) adds 'a' options, i=7 (g) adds final 'g' matches. Values accumulate as more characters become available.",
              variables: { progress: "rows 5-7" },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,2,1,0],[1,2,1,1],[1,3,1,1],[1,3,4,1],[1,3,4,5]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [16],
              shortLabel: "dp[7][3] = 5",
              explanation: 'dp[7][3] = 5. There are 5 distinct subsequences of "babgbag" that equal "bag". Each picks b, a, g from different positions.',
              variables: { answer: 5 },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,2,1,0],[1,2,1,1],[1,3,1,1],[1,3,4,1],[1,3,4,5]],
                dpHighlight2D: { row: 7, col: 3 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Match",
          description: "t cannot be formed from s",
          input: { s: "abc", t: "xyz" },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 5],
              shortLabel: "Init dp table",
              explanation: 'Create 4x4 table. s="abc", t="xyz". No character in s matches any in t.',
              variables: { s: "abc", t: "xyz" },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [9],
              shortLabel: "No matches anywhere",
              explanation: "No character in s matches any character in t. Every dp[i][j] for j>0 stays 0 because we can only skip (carry forward 0).",
              variables: { "all dp[i][j>0]": 0 },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [16],
              shortLabel: "dp[3][3] = 0",
              explanation: "No way to form 'xyz' from 'abc'. Answer: 0.",
              variables: { answer: 0 },
              dataStructure: {
                dpTable: [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
                dpHighlight2D: { row: 3, col: 3 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, t }) {
        const steps = [];
        const m = s.length, n = t.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = 1;

        steps.push({
          stepId: 0, lineNumbers: [3, 5],
          shortLabel: "Init dp table",
          explanation: `Create ${m + 1}x${n + 1} table. First column all 1s.`,
          variables: { m, n, s, t },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: null },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            dp[i][j] = dp[i - 1][j];
            if (s[i - 1] === t[j - 1]) dp[i][j] += dp[i - 1][j - 1];

            steps.push({
              stepId: steps.length, lineNumbers: s[i - 1] === t[j - 1] ? [9, 10, 11] : [9],
              shortLabel: `dp[${i}][${j}]=${dp[i][j]}`,
              explanation: s[i - 1] === t[j - 1]
                ? `'${s[i - 1]}'='${t[j - 1]}': match! dp[${i}][${j}] = ${dp[i - 1][j]} + ${dp[i - 1][j - 1]} = ${dp[i][j]}.`
                : `'${s[i - 1]}'≠'${t[j - 1]}': skip. dp[${i}][${j}] = dp[${i - 1}][${j}] = ${dp[i][j]}.`,
              variables: { i, j, "dp[i][j]": dp[i][j] },
              dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: i, col: j } },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [16],
          shortLabel: `Result: ${dp[m][n]}`,
          explanation: `dp[${m}][${n}] = ${dp[m][n]} distinct subsequences.`,
          variables: { answer: dp[m][n] },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: m, col: n } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(2^m)", space: "O(m)", explanation: "Each character in s has include/skip choice" },
    optimal: { time: "O(m*n)", space: "O(m*n)", explanation: "Fill (m+1)x(n+1) table; optimizable to O(n) space", tradeoff: "Polynomial time+space replaces exponential exploration" },
  },

  interviewTips: [
    "Define dp[i][j] clearly: 'number of ways to form t[0..j-1] from s[0..i-1]'.",
    "The key recurrence has two terms when characters match: skip + use.",
    "Base case dp[i][0] = 1 is crucial — empty string is always a valid subsequence.",
    "Use long/long long to avoid overflow — counts can get very large.",
    "Mention 1D space optimization as a follow-up.",
  ],

  relatedProblems: ["longest-common-subsequence", "edit-distance", "interleaving-string"],
};
