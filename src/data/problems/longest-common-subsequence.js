export const longestCommonSubsequence = {
  id: 111,
  slug: "longest-common-subsequence",
  title: "Longest Common Subsequence",
  difficulty: "Medium",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 111,
  artifactType: "DPTable2D",
  companies: ["Amazon", "Google", "Microsoft", "Meta", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/longest-common-subsequence/",

  pattern: "2D DP Table with String Matching",
  patternExplanation: `When comparing two sequences character by character, build a 2D table where dp[i][j] represents the answer for the first i characters of one string and first j characters of the other. Each cell depends on its top, left, or diagonal neighbor.`,

  intuition: {
    coreInsight: `If the last characters of two strings match, they must be part of the LCS — so we add 1 to the LCS of the remaining prefixes. If they don't match, the LCS is the better of skipping one character from either string. This creates an optimal substructure that a 2D DP table captures perfectly.`,

    mentalModel: `Imagine two people reading their respective books aloud, trying to find the longest sequence of words they share in order. When both say the same word at the same time, they high-five and count it. When they differ, they try two strategies: one person waits while the other advances, and vice versa — then they pick whichever strategy found more shared words.`,

    whyNaiveFails: `A brute force approach generates all 2^n subsequences of one string and checks each against the other — exponential time. Even with memoization on just the recursion, without the table structure you'd have redundant state tracking. The 2D DP table ensures each (i, j) subproblem is solved exactly once in O(m*n) time.`,

    keyObservation: `The recurrence is simple: if text1[i-1] == text2[j-1], then dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]). The diagonal arrow means "both characters matched and contributed to the LCS." The up/left arrows mean "skip one character from one string."`,
  },

  problem: `Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements. If there is no common subsequence, return 0.`,

  examples: [
    { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: 'The longest common subsequence is "ace" and its length is 3.' },
    { input: 'text1 = "abc", text2 = "abc"', output: "3", explanation: 'The longest common subsequence is "abc" and its length is 3.' },
    { input: 'text1 = "abc", text2 = "def"', output: "0", explanation: "There is no common subsequence, so the result is 0." },
  ],

  constraints: [
    "1 <= text1.length, text2.length <= 1000",
    "text1 and text2 consist of only lowercase English characters.",
  ],

  approaches: {
    brute: {
      label: "Recursive (No Memo)",
      tier: "brute",
      timeComplexity: "O(2^(m+n))",
      spaceComplexity: "O(m+n)",
      idea: "Recursively compare characters. If they match, recurse on both shortened. If not, try skipping from each string and take the max.",

      javaCode: `public int longestCommonSubsequence(String text1, String text2) {
    return helper(text1, text2, 0, 0);
}

private int helper(String s1, String s2, int i, int j) {
    if (i == s1.length() || j == s2.length()) return 0;
    if (s1.charAt(i) == s2.charAt(j)) {
        return 1 + helper(s1, s2, i + 1, j + 1);
    }
    return Math.max(helper(s1, s2, i + 1, j),
                    helper(s1, s2, i, j + 1));
}`,

      cppCode: `int longestCommonSubsequence(string text1, string text2) {
    return helper(text1, text2, 0, 0);
}

int helper(string& s1, string& s2, int i, int j) {
    if (i == s1.size() || j == s2.size()) return 0;
    if (s1[i] == s2[j]) {
        return 1 + helper(s1, s2, i + 1, j + 1);
    }
    return max(helper(s1, s2, i + 1, j),
               helper(s1, s2, i, j + 1));
}`,

      pythonCode: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    def helper(i, j):
        if i == len(text1) or j == len(text2):
            return 0
        if text1[i] == text2[j]:
            return 1 + helper(i + 1, j + 1)
        return max(helper(i + 1, j), helper(i, j + 1))
    return helper(0, 0)`,

      lineAnnotations: {
        2: "Start recursion from the beginning of both strings",
        6: "Base case: one string is exhausted",
        7: "Characters match — include in LCS and advance both",
        8: "Add 1 for the matching character",
        10: "Characters don't match — try skipping from each string",
        11: "Take the maximum of both choices",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { text1: "ace", text2: "abcde" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Start recursion",
              explanation: "Begin comparing text1='ace' with text2='abcde' from indices (0,0). We'll explore all possible subsequence alignments recursively.",
              variables: { i: 0, j: 0, "text1[i]": "a", "text2[j]": "a" },
              dataStructure: {
                dpTable: [[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null]],
                dpHighlight2D: { row: 0, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8],
              shortLabel: "a == a, match!",
              explanation: "text1[0]='a' matches text2[0]='a'. This character is part of the LCS. We recurse on (1,1) and add 1 to whatever it returns.",
              variables: { i: 0, j: 0, "text1[i]": "a", "text2[j]": "a", match: true },
              dataStructure: {
                dpTable: [[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 0, c: 0 }, to: { r: 1, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11],
              shortLabel: "c != b, branch",
              explanation: "text1[1]='c' does not match text2[1]='b'. We branch: try skipping 'c' from text1 (recurse i+1,j) or skipping 'b' from text2 (recurse i,j+1), and take the max.",
              variables: { i: 1, j: 1, "text1[i]": "c", "text2[j]": "b", match: false },
              dataStructure: {
                dpTable: [[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null]],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8],
              shortLabel: "c == c, match!",
              explanation: "Exploring the branch where we skipped 'b': text1[1]='c' matches text2[2]='c'. Another LCS character found. Recurse on (2,3).",
              variables: { i: 1, j: 2, "text1[i]": "c", "text2[j]": "c", match: true },
              dataStructure: {
                dpTable: [[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null]],
                dpHighlight2D: { row: 2, col: 3 },
                dpArrows2D: [{ from: { r: 1, c: 2 }, to: { r: 2, c: 3 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10, 11],
              shortLabel: "e != d, branch",
              explanation: "text1[2]='e' does not match text2[3]='d'. Branch again: skip 'e' or skip 'd'.",
              variables: { i: 2, j: 3, "text1[i]": "e", "text2[j]": "d", match: false },
              dataStructure: {
                dpTable: [[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null]],
                dpHighlight2D: { row: 3, col: 4 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8],
              shortLabel: "e == e, match!",
              explanation: "Skipping 'd': text1[2]='e' matches text2[4]='e'. Third LCS character. Since both strings are now exhausted after this, the base case returns 0. Total = 1+1+1+0 = 3.",
              variables: { i: 2, j: 4, "text1[i]": "e", "text2[j]": "e", match: true, result: 3 },
              dataStructure: {
                dpTable: [[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null],[null,null,null,null,null,null]],
                dpHighlight2D: { row: 3, col: 5 },
                dpArrows2D: [{ from: { r: 2, c: 4 }, to: { r: 3, c: 5 } }],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ text1, text2 }) {
        const steps = [];
        const m = text1.length, n = text2.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(null));

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Start recursion",
          explanation: `Begin recursive comparison of "${text1}" and "${text2}".`,
          variables: { text1, text2 },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: 0, col: 0 }, dpArrows2D: [] },
          delta: {}, isAnswer: false,
        });

        // Bottom-up fill for visualization
        for (let i = m; i >= 0; i--) {
          for (let j = n; j >= 0; j--) {
            if (i === m || j === n) {
              dp[i][j] = 0;
            } else if (text1[i] === text2[j]) {
              dp[i][j] = 1 + dp[i + 1][j + 1];
            } else {
              dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
            }
          }
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Bottom-Up DP Table",
      tier: "optimal",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
      idea: `Build a (m+1) x (n+1) table bottom-up. dp[i][j] = LCS length of text1[i..] and text2[j..]. If characters match, dp[i][j] = 1 + dp[i+1][j+1]. Otherwise, dp[i][j] = max(dp[i+1][j], dp[i][j+1]).`,

      javaCode: `public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            if (text1.charAt(i) == text2.charAt(j)) {
                dp[i][j] = 1 + dp[i + 1][j + 1];
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
            }
        }
    }

    return dp[0][0];
}`,

      cppCode: `int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size(), n = text2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            if (text1[i] == text2[j]) {
                dp[i][j] = 1 + dp[i + 1][j + 1];
            } else {
                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1]);
            }
        }
    }

    return dp[0][0];
}`,

      pythonCode: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if text1[i] == text2[j]:
                dp[i][j] = 1 + dp[i + 1][j + 1]
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])

    return dp[0][0]`,

      lineAnnotations: {
        2: "Get lengths of both strings",
        3: "Create (m+1) x (n+1) DP table initialized to 0",
        5: "Iterate from bottom-right to top-left",
        6: "Inner loop over text2 characters",
        7: "Characters match — extend LCS by 1",
        8: "Take diagonal value + 1",
        10: "Characters don't match — take better option",
        14: "Answer is at dp[0][0] — full LCS length",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with interleaved matching characters",
          input: { text1: "ace", text2: "abcde" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init DP table",
              explanation: "Create a 4x6 DP table (3+1 rows for 'ace', 5+1 cols for 'abcde'). All cells initialized to 0. The last row and column are base cases (empty string has LCS = 0).",
              variables: { m: 3, n: 5, "dp[0][0]": "?" },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],
                dpHighlight2D: null,
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "i=2,j=4: e==e → 1",
              explanation: "text1[2]='e' matches text2[4]='e'. dp[2][4] = 1 + dp[3][5] = 1 + 0 = 1. We found the first match from the bottom-right.",
              variables: { i: 2, j: 4, "text1[i]": "e", "text2[j]": "e", "dp[i+1][j+1]": 0, "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 2, col: 4 },
                dpArrows2D: [{ from: { r: 3, c: 5 }, to: { r: 2, c: 4 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=2,j=3: e!=d → max(0,1)=1",
              explanation: "text1[2]='e' does not match text2[3]='d'. dp[2][3] = max(dp[3][3], dp[2][4]) = max(0, 1) = 1. We carry forward the LCS length from the right.",
              variables: { i: 2, j: 3, "text1[i]": "e", "text2[j]": "d", "dp[i+1][j]": 0, "dp[i][j+1]": 1, "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 2, col: 3 },
                dpArrows2D: [{ from: { r: 2, c: 4 }, to: { r: 2, c: 3 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=2,j=2: e!=c → max(0,1)=1",
              explanation: "text1[2]='e' does not match text2[2]='c'. dp[2][2] = max(dp[3][2], dp[2][3]) = max(0, 1) = 1.",
              variables: { i: 2, j: 2, "text1[i]": "e", "text2[j]": "c", "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [{ from: { r: 2, c: 3 }, to: { r: 2, c: 2 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=2,j=1: e!=b → 1",
              explanation: "text1[2]='e' does not match text2[1]='b'. dp[2][1] = max(dp[3][1], dp[2][2]) = max(0, 1) = 1.",
              variables: { i: 2, j: 1, "text1[i]": "e", "text2[j]": "b", "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 2, col: 1 },
                dpArrows2D: [{ from: { r: 2, c: 2 }, to: { r: 2, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=2,j=0: e!=a → 1",
              explanation: "text1[2]='e' does not match text2[0]='a'. dp[2][0] = max(dp[3][0], dp[2][1]) = max(0, 1) = 1.",
              variables: { i: 2, j: 0, "text1[i]": "e", "text2[j]": "a", "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,0,0,0,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 2, col: 0 },
                dpArrows2D: [{ from: { r: 2, c: 1 }, to: { r: 2, c: 0 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "i=1,j=4: c!=e → 1",
              explanation: "text1[1]='c' does not match text2[4]='e'. dp[1][4] = max(dp[2][4], dp[1][5]) = max(1, 0) = 1.",
              variables: { i: 1, j: 4, "text1[i]": "c", "text2[j]": "e", "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,0,0,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 1, col: 4 },
                dpArrows2D: [{ from: { r: 2, c: 4 }, to: { r: 1, c: 4 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=1,j=3: c!=d → 1",
              explanation: "text1[1]='c' does not match text2[3]='d'. dp[1][3] = max(dp[2][3], dp[1][4]) = max(1, 1) = 1.",
              variables: { i: 1, j: 3, "text1[i]": "c", "text2[j]": "d", "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,0,1,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 1, col: 3 },
                dpArrows2D: [{ from: { r: 2, c: 3 }, to: { r: 1, c: 3 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "i=1,j=2: c==c → 2",
              explanation: "text1[1]='c' matches text2[2]='c'. dp[1][2] = 1 + dp[2][3] = 1 + 1 = 2. We've found two matching characters so far (c and e).",
              variables: { i: 1, j: 2, "text1[i]": "c", "text2[j]": "c", "dp[i+1][j+1]": 1, "dp[i][j]": 2 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,0,2,1,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 1, col: 2 },
                dpArrows2D: [{ from: { r: 2, c: 3 }, to: { r: 1, c: 2 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=1,j=1: c!=b → 2",
              explanation: "text1[1]='c' does not match text2[1]='b'. dp[1][1] = max(dp[2][1], dp[1][2]) = max(1, 2) = 2.",
              variables: { i: 1, j: 1, "text1[i]": "c", "text2[j]": "b", "dp[i][j]": 2 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[0,2,2,1,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 1, c: 2 }, to: { r: 1, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=1,j=0: c!=a → 2",
              explanation: "text1[1]='c' does not match text2[0]='a'. dp[1][0] = max(dp[2][0], dp[1][1]) = max(1, 2) = 2.",
              variables: { i: 1, j: 0, "text1[i]": "c", "text2[j]": "a", "dp[i][j]": 2 },
              dataStructure: {
                dpTable: [[0,0,0,0,0,0],[2,2,2,1,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 1, col: 0 },
                dpArrows2D: [{ from: { r: 1, c: 1 }, to: { r: 1, c: 0 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=0,j=4: a!=e → 1",
              explanation: "text1[0]='a' does not match text2[4]='e'. dp[0][4] = max(dp[1][4], dp[0][5]) = max(1, 0) = 1.",
              variables: { i: 0, j: 4, "text1[i]": "a", "text2[j]": "e", "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,0,0,0,1,0],[2,2,2,1,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 0, col: 4 },
                dpArrows2D: [{ from: { r: 1, c: 4 }, to: { r: 0, c: 4 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=0,j=3: a!=d → 1",
              explanation: "text1[0]='a' does not match text2[3]='d'. dp[0][3] = max(dp[1][3], dp[0][4]) = max(1, 1) = 1.",
              variables: { i: 0, j: 3, "text1[i]": "a", "text2[j]": "d", "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,0,0,1,1,0],[2,2,2,1,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 0, col: 3 },
                dpArrows2D: [{ from: { r: 1, c: 3 }, to: { r: 0, c: 3 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 13,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=0,j=2: a!=c → 2",
              explanation: "text1[0]='a' does not match text2[2]='c'. dp[0][2] = max(dp[1][2], dp[0][3]) = max(2, 1) = 2.",
              variables: { i: 0, j: 2, "text1[i]": "a", "text2[j]": "c", "dp[i][j]": 2 },
              dataStructure: {
                dpTable: [[0,0,2,1,1,0],[2,2,2,1,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 0, col: 2 },
                dpArrows2D: [{ from: { r: 1, c: 2 }, to: { r: 0, c: 2 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 14,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=0,j=1: a!=b → 2",
              explanation: "text1[0]='a' does not match text2[1]='b'. dp[0][1] = max(dp[1][1], dp[0][2]) = max(2, 2) = 2.",
              variables: { i: 0, j: 1, "text1[i]": "a", "text2[j]": "b", "dp[i][j]": 2 },
              dataStructure: {
                dpTable: [[0,2,2,1,1,0],[2,2,2,1,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 0, col: 1 },
                dpArrows2D: [{ from: { r: 1, c: 1 }, to: { r: 0, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 15,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "i=0,j=0: a==a → 3",
              explanation: "text1[0]='a' matches text2[0]='a'. dp[0][0] = 1 + dp[1][1] = 1 + 2 = 3. The full LCS of 'ace' and 'abcde' has length 3. The LCS is 'ace'.",
              variables: { i: 0, j: 0, "text1[i]": "a", "text2[j]": "a", "dp[i+1][j+1]": 2, "dp[i][j]": 3, answer: 3 },
              dataStructure: {
                dpTable: [[3,2,2,1,1,0],[2,2,2,1,1,0],[1,1,1,1,1,0],[0,0,0,0,0,0]],
                dpHighlight2D: { row: 0, col: 0 },
                dpArrows2D: [{ from: { r: 1, c: 1 }, to: { r: 0, c: 0 } }],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Common",
          description: "Two strings with no common characters at all",
          input: { text1: "ab", text2: "cd" },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init DP table",
              explanation: "Create a 3x3 DP table for 'ab' vs 'cd'. All initialized to 0.",
              variables: { m: 2, n: 2 },
              dataStructure: {
                dpTable: [[0,0,0],[0,0,0],[0,0,0]],
                dpHighlight2D: null,
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=1,j=1: b!=d → 0",
              explanation: "text1[1]='b' does not match text2[1]='d'. dp[1][1] = max(dp[2][1], dp[1][2]) = max(0, 0) = 0. No common characters found yet.",
              variables: { i: 1, j: 1, "text1[i]": "b", "text2[j]": "d", "dp[i][j]": 0 },
              dataStructure: {
                dpTable: [[0,0,0],[0,0,0],[0,0,0]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=1,j=0: b!=c → 0",
              explanation: "text1[1]='b' does not match text2[0]='c'. dp[1][0] = max(dp[2][0], dp[1][1]) = max(0, 0) = 0.",
              variables: { i: 1, j: 0, "text1[i]": "b", "text2[j]": "c", "dp[i][j]": 0 },
              dataStructure: {
                dpTable: [[0,0,0],[0,0,0],[0,0,0]],
                dpHighlight2D: { row: 1, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=0,j=1: a!=d → 0",
              explanation: "text1[0]='a' does not match text2[1]='d'. dp[0][1] = max(dp[1][1], dp[0][2]) = max(0, 0) = 0.",
              variables: { i: 0, j: 1, "text1[i]": "a", "text2[j]": "d", "dp[i][j]": 0 },
              dataStructure: {
                dpTable: [[0,0,0],[0,0,0],[0,0,0]],
                dpHighlight2D: { row: 0, col: 1 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 9, 10],
              shortLabel: "i=0,j=0: a!=c → 0",
              explanation: "text1[0]='a' does not match text2[0]='c'. dp[0][0] = max(dp[1][0], dp[0][1]) = max(0, 0) = 0. No common subsequence exists between 'ab' and 'cd'.",
              variables: { i: 0, j: 0, "text1[i]": "a", "text2[j]": "c", "dp[i][j]": 0, answer: 0 },
              dataStructure: {
                dpTable: [[0,0,0],[0,0,0],[0,0,0]],
                dpHighlight2D: { row: 0, col: 0 },
                dpArrows2D: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ text1, text2 }) {
        const steps = [];
        const m = text1.length, n = text2.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init DP table",
          explanation: `Create a ${m+1}x${n+1} DP table for "${text1}" vs "${text2}". Base cases (last row and column) are 0.`,
          variables: { m, n },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: null, dpArrows2D: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = m - 1; i >= 0; i--) {
          for (let j = n - 1; j >= 0; j--) {
            const arrows = [];
            if (text1[i] === text2[j]) {
              dp[i][j] = 1 + dp[i + 1][j + 1];
              arrows.push({ from: { r: i + 1, c: j + 1 }, to: { r: i, c: j } });
            } else {
              dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
              if (dp[i + 1][j] >= dp[i][j + 1]) {
                arrows.push({ from: { r: i + 1, c: j }, to: { r: i, c: j } });
              } else {
                arrows.push({ from: { r: i, c: j + 1 }, to: { r: i, c: j } });
              }
            }

            const isLast = i === 0 && j === 0;
            const match = text1[i] === text2[j];
            steps.push({
              stepId: steps.length,
              lineNumbers: match ? [5, 6, 7, 8] : [5, 6, 9, 10],
              shortLabel: `i=${i},j=${j}: ${text1[i]}${match ? "==" : "!="}${text2[j]} → ${dp[i][j]}`,
              explanation: match
                ? `text1[${i}]='${text1[i]}' matches text2[${j}]='${text2[j]}'. dp[${i}][${j}] = 1 + dp[${i+1}][${j+1}] = 1 + ${dp[i+1][j+1]} = ${dp[i][j]}.`
                : `text1[${i}]='${text1[i]}' ≠ text2[${j}]='${text2[j]}'. dp[${i}][${j}] = max(dp[${i+1}][${j}], dp[${i}][${j+1}]) = max(${dp[i+1][j]}, ${dp[i][j+1]}) = ${dp[i][j]}.`,
              variables: { i, j, "text1[i]": text1[i], "text2[j]": text2[j], "dp[i][j]": dp[i][j], ...(isLast ? { answer: dp[0][0] } : {}) },
              dataStructure: {
                dpTable: dp.map(r => [...r]),
                dpHighlight2D: { row: i, col: j },
                dpArrows2D: arrows,
              },
              delta: {},
              isAnswer: isLast,
            });
          }
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(2^(m+n))", space: "O(m+n)", explanation: "Exponential branching at each mismatch" },
    optimal: { time: "O(m*n)", space: "O(m*n)", explanation: "Fill each cell once in the m x n table", tradeoff: "Can optimize space to O(min(m,n)) using rolling array since each row only depends on the next row" },
  },

  interviewTips: [
    "Clarify: a subsequence maintains relative order but need not be contiguous — this is different from a substring.",
    "Start by explaining the recursive structure before jumping to DP.",
    "Draw the 2D table on the whiteboard — interviewers love seeing the recurrence visually.",
    "Mention the space optimization: since each row only depends on the row below, you can use O(min(m,n)) space with a 1D array.",
    "If asked to reconstruct the actual LCS string, trace back through the DP table following diagonal moves.",
  ],

  relatedProblems: ["edit-distance", "distinct-subsequences", "longest-increasing-subsequence"],
};
