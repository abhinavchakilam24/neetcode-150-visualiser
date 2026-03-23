export const interleavingString = {
  id: 115,
  slug: "interleaving-string",
  title: "Interleaving String",
  difficulty: "Medium",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 115,
  artifactType: "DPTable2D",
  companies: ["Google", "Amazon", "Microsoft", "Bloomberg", "Uber"],
  leetcodeLink: "https://leetcode.com/problems/interleaving-string/",

  pattern: "2D Boolean DP on Two Strings",
  patternExplanation: `When checking if two strings can be interleaved to form a third, use a 2D
    boolean table where dp[i][j] = true means the first i chars of s1 and first j chars of s2
    can form the first (i+j) chars of s3. Each cell depends on its top or left neighbor.`,

  intuition: {
    coreInsight: `At each position in s3, the character must come from either s1 or s2, maintaining
      relative order in both. dp[i][j] is true if we've consumed i characters from s1 and j from s2
      to match the first i+j characters of s3. We check: did the current s3 character come from s1
      (look up) or s2 (look left)?`,

    mentalModel: `Imagine two conveyor belts (s1 and s2) feeding items onto a single assembly line
      (s3). You can pick the next item from either belt, but you can't rearrange items within a belt.
      dp[i][j] asks: "Can I have taken exactly i items from belt 1 and j items from belt 2 to match
      the first i+j items on the assembly line?" You check if the latest item came from belt 1 or belt 2.`,

    whyNaiveFails: `Without memoization, at each of the m+n positions in s3, we branch into two
      choices (take from s1 or s2), giving O(2^(m+n)) complexity. Many branches reach the same
      (i, j) state from different paths. The 2D DP table ensures each (i, j) is computed exactly
      once in O(m*n) time.`,

    keyObservation: `dp[i][j] = (dp[i-1][j] AND s1[i-1] == s3[i+j-1]) OR (dp[i][j-1] AND s2[j-1] == s3[i+j-1]).
      The OR captures both possibilities: the latest s3 character came from s1 (check cell above)
      or from s2 (check cell to the left). A quick length check s1.length + s2.length == s3.length
      can reject immediately.`,
  },

  problem: `Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.
    An interleaving of two strings s and t is a configuration where s and t are divided into substrings
    such that s = s1 + s2 + ... + sn, t = t1 + t2 + ... + tm, and the interleaving is
    s1 + t1 + s2 + t2 + ... (maintaining relative order within each original string).`,

  examples: [
    { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', output: "true", explanation: "s3 can be formed by interleaving s1 and s2." },
    { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"', output: "false", explanation: "s3 cannot be formed by any interleaving." },
    { input: 's1 = "", s2 = "", s3 = ""', output: "true", explanation: "All empty strings trivially interleave." },
  ],

  constraints: [
    "0 <= s1.length, s2.length <= 100",
    "0 <= s3.length <= 200",
    "s1, s2, and s3 consist of lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(2^(m+n))",
      spaceComplexity: "O(m+n)",
      idea: "At each position in s3, try taking the next character from s1 or s2. Recurse on both branches.",

      javaCode: `public boolean isInterleave(String s1, String s2, String s3) {
    if (s1.length() + s2.length() != s3.length()) return false;
    return helper(s1, s2, s3, 0, 0);
}

private boolean helper(String s1, String s2, String s3, int i, int j) {
    if (i + j == s3.length()) return true;
    boolean result = false;
    if (i < s1.length() && s1.charAt(i) == s3.charAt(i + j)) {
        result = helper(s1, s2, s3, i + 1, j);
    }
    if (!result && j < s2.length() && s2.charAt(j) == s3.charAt(i + j)) {
        result = helper(s1, s2, s3, i, j + 1);
    }
    return result;
}`,

      cppCode: `bool isInterleave(string s1, string s2, string s3) {
    if (s1.size() + s2.size() != s3.size()) return false;
    return helper(s1, s2, s3, 0, 0);
}

bool helper(string& s1, string& s2, string& s3, int i, int j) {
    if (i + j == s3.size()) return true;
    bool result = false;
    if (i < s1.size() && s1[i] == s3[i + j]) {
        result = helper(s1, s2, s3, i + 1, j);
    }
    if (!result && j < s2.size() && s2[j] == s3[i + j]) {
        result = helper(s1, s2, s3, i, j + 1);
    }
    return result;
}`,

      pythonCode: `def isInterleave(s1: str, s2: str, s3: str) -> bool:
    if len(s1) + len(s2) != len(s3):
        return False
    def helper(i, j):
        if i + j == len(s3):
            return True
        if i < len(s1) and s1[i] == s3[i + j]:
            if helper(i + 1, j):
                return True
        if j < len(s2) and s2[j] == s3[i + j]:
            if helper(i, j + 1):
                return True
        return False
    return helper(0, 0)`,

      lineAnnotations: {
        2: "Quick rejection: lengths must match",
        6: "Base: consumed all of s3 successfully",
        8: "Try taking next char from s1 if it matches",
        11: "Try taking next char from s2 if it matches",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s1: "ab", s2: "cd", s3: "acbd" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [1, 2, 3],
              shortLabel: "Check lengths",
              explanation: 's1="ab" (len=2), s2="cd" (len=2), s3="acbd" (len=4). Lengths match: 2+2=4. Proceed with recursion.',
              variables: { "s1.len": 2, "s2.len": 2, "s3.len": 4 },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [8, 9],
              shortLabel: "i=0,j=0: s1[0]='a'==s3[0]='a' -> take from s1",
              explanation: "Position 0 in s3 is 'a'. s1[0]='a' matches. Take from s1, advance i to 1.",
              variables: { i: 0, j: 0, "s3[0]": "a", "s1[0]": "a" },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [11, 12],
              shortLabel: "i=1,j=0: s2[0]='c'==s3[1]='c' -> take from s2",
              explanation: "Position 1 in s3 is 'c'. s1[1]='b' doesn't match. s2[0]='c' matches. Take from s2.",
              variables: { i: 1, j: 0, "s3[1]": "c", "s2[0]": "c" },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [8, 9],
              shortLabel: "i=1,j=1: s1[1]='b'==s3[2]='b' -> take from s1",
              explanation: "Position 2 in s3 is 'b'. s1[1]='b' matches. Take from s1.",
              variables: { i: 1, j: 1, "s3[2]": "b", "s1[1]": "b" },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [6],
              shortLabel: "i=2,j=1: s2[1]='d'==s3[3]='d' -> done!",
              explanation: "Position 3 in s3 is 'd'. s2[1]='d' matches. After taking it, i+j=4=len(s3). Interleaving found!",
              variables: { i: 2, j: 2, result: true },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s1, s2, s3 }) {
        const steps = [];
        steps.push({
          stepId: 0, lineNumbers: [1, 2],
          shortLabel: "Check lengths",
          explanation: `s1="${s1}" (len=${s1.length}), s2="${s2}" (len=${s2.length}), s3="${s3}" (len=${s3.length}).`,
          variables: { "s1.len": s1.length, "s2.len": s2.length, "s3.len": s3.length },
          dataStructure: { dpTable: [], dpHighlight2D: null },
          delta: {}, isAnswer: s1.length + s2.length !== s3.length,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "2D Boolean DP",
      tier: "optimal",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
      idea: `dp[i][j] = true if first i chars of s1 and first j chars of s2 interleave to form first
        (i+j) chars of s3. dp[i][j] = (dp[i-1][j] && s1[i-1]==s3[i+j-1]) || (dp[i][j-1] && s2[j-1]==s3[i+j-1]).`,

      javaCode: `public boolean isInterleave(String s1, String s2, String s3) {
    int m = s1.length(), n = s2.length();
    if (m + n != s3.length()) return false;

    boolean[][] dp = new boolean[m + 1][n + 1];
    dp[0][0] = true;

    for (int i = 1; i <= m; i++)
        dp[i][0] = dp[i - 1][0] && s1.charAt(i - 1) == s3.charAt(i - 1);
    for (int j = 1; j <= n; j++)
        dp[0][j] = dp[0][j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            dp[i][j] = (dp[i - 1][j] && s1.charAt(i - 1) == s3.charAt(i + j - 1))
                     || (dp[i][j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
        }
    }

    return dp[m][n];
}`,

      cppCode: `bool isInterleave(string s1, string s2, string s3) {
    int m = s1.size(), n = s2.size();
    if (m + n != s3.size()) return false;

    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
    dp[0][0] = true;

    for (int i = 1; i <= m; i++)
        dp[i][0] = dp[i - 1][0] && s1[i - 1] == s3[i - 1];
    for (int j = 1; j <= n; j++)
        dp[0][j] = dp[0][j - 1] && s2[j - 1] == s3[j - 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            dp[i][j] = (dp[i - 1][j] && s1[i - 1] == s3[i + j - 1])
                     || (dp[i][j - 1] && s2[j - 1] == s3[i + j - 1]);
        }
    }

    return dp[m][n];
}`,

      pythonCode: `def isInterleave(s1: str, s2: str, s3: str) -> bool:
    m, n = len(s1), len(s2)
    if m + n != len(s3):
        return False

    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True

    for i in range(1, m + 1):
        dp[i][0] = dp[i - 1][0] and s1[i - 1] == s3[i - 1]
    for j in range(1, n + 1):
        dp[0][j] = dp[0][j - 1] and s2[j - 1] == s3[j - 1]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = (dp[i - 1][j] and s1[i - 1] == s3[i + j - 1]) \
                     or (dp[i][j - 1] and s2[j - 1] == s3[i + j - 1])

    return dp[m][n]`,

      lineAnnotations: {
        2: "Get lengths of both strings",
        3: "Quick reject: total lengths must match",
        5: "Create boolean DP table",
        6: "Base: empty strings interleave to empty string",
        8: "First column: only s1 contributes",
        10: "First row: only s2 contributes",
        13: "Fill interior: check if char came from s1 (above) or s2 (left)",
        15: "From s1: dp[i-1][j] was valid AND s1[i-1] matches s3[i+j-1]",
        16: "From s2: dp[i][j-1] was valid AND s2[j-1] matches s3[i+j-1]",
        20: "Bottom-right cell is the answer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 's1="ab", s2="cd", s3="acbd"',
          input: { s1: "ab", s2: "cd", s3: "acbd" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3, 5, 6],
              shortLabel: "Init DP table",
              explanation: 's1="ab" (m=2), s2="cd" (n=2), s3="acbd" (len=4). Lengths match. Create 3x3 boolean table. dp[0][0] = true.',
              variables: { m: 2, n: 2, s1: "ab", s2: "cd", s3: "acbd" },
              dataStructure: {
                dpTable: [
                  ["T", "F", "F"],
                  ["F", "F", "F"],
                  ["F", "F", "F"],
                ],
                dpHighlight2D: { row: 0, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [8, 9],
              shortLabel: "Fill first column",
              explanation: 'dp[1][0]: s1[0]="a"==s3[0]="a" AND dp[0][0]=T -> T. dp[2][0]: s1[1]="b"==s3[1]="c"? No -> F. Using only s1, we can match "a" but not "ab" against s3 prefix.',
              variables: { "s1[0]": "a", "s3[0]": "a", "s1[1]": "b", "s3[1]": "c" },
              dataStructure: {
                dpTable: [
                  ["T", "F", "F"],
                  ["T", "F", "F"],
                  ["F", "F", "F"],
                ],
                dpHighlight2D: { row: 2, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [10, 11],
              shortLabel: "Fill first row",
              explanation: 'dp[0][1]: s2[0]="c"==s3[0]="a"? No -> F. dp[0][2] also F. Using only s2, "c" doesn\'t match s3[0]="a".',
              variables: { "s2[0]": "c", "s3[0]": "a" },
              dataStructure: {
                dpTable: [
                  ["T", "F", "F"],
                  ["T", "F", "F"],
                  ["F", "F", "F"],
                ],
                dpHighlight2D: { row: 0, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [15, 16],
              shortLabel: "dp[1][1]: s3[1]='c'",
              explanation: 'i=1,j=1. s3[1]="c". From s1: dp[0][1]=F. From s2: dp[1][0]=T AND s2[0]="c"==s3[1]="c" -> T. dp[1][1]=T. We took "a" from s1, "c" from s2 to match "ac".',
              variables: { i: 1, j: 1, "s3[1]": "c", "dp[1][1]": "T" },
              dataStructure: {
                dpTable: [
                  ["T", "F", "F"],
                  ["T", "T", "F"],
                  ["F", "F", "F"],
                ],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 1, c: 0 }, to: { r: 1, c: 1 } }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [15, 16],
              shortLabel: "dp[1][2]: s3[2]='b'",
              explanation: 'i=1,j=2. s3[2]="b". From s1: dp[0][2]=F. From s2: dp[1][1]=T AND s2[1]="d"==s3[2]="b"? No. dp[1][2]=F.',
              variables: { i: 1, j: 2, "s3[2]": "b", "dp[1][2]": "F" },
              dataStructure: {
                dpTable: [
                  ["T", "F", "F"],
                  ["T", "T", "F"],
                  ["F", "F", "F"],
                ],
                dpHighlight2D: { row: 1, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [15, 16],
              shortLabel: "dp[2][1]: s3[2]='b'",
              explanation: 'i=2,j=1. s3[2]="b". From s1: dp[1][1]=T AND s1[1]="b"==s3[2]="b" -> T! dp[2][1]=T. We took "a","c","b" matching s3 prefix "acb".',
              variables: { i: 2, j: 1, "s3[2]": "b", "s1[1]": "b", "dp[2][1]": "T" },
              dataStructure: {
                dpTable: [
                  ["T", "F", "F"],
                  ["T", "T", "F"],
                  ["F", "T", "F"],
                ],
                dpHighlight2D: { row: 2, col: 1 },
                dpArrows2D: [{ from: { r: 1, c: 1 }, to: { r: 2, c: 1 } }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [15, 16],
              shortLabel: "dp[2][2]: s3[3]='d'",
              explanation: 'i=2,j=2. s3[3]="d". From s1: dp[1][2]=F. From s2: dp[2][1]=T AND s2[1]="d"==s3[3]="d" -> T! dp[2][2]=T. Full interleaving: a(s1), c(s2), b(s1), d(s2) = "acbd".',
              variables: { i: 2, j: 2, "s3[3]": "d", "s2[1]": "d", "dp[2][2]": "T" },
              dataStructure: {
                dpTable: [
                  ["T", "F", "F"],
                  ["T", "T", "F"],
                  ["F", "T", "T"],
                ],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [{ from: { r: 2, c: 1 }, to: { r: 2, c: 2 } }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 7, lineNumbers: [20],
              shortLabel: "Return dp[2][2] = true",
              explanation: 'dp[2][2] = true. "acbd" IS a valid interleaving of "ab" and "cd". The path through the table shows: right from (1,0)->(1,1) then down (1,1)->(2,1) then right (2,1)->(2,2).',
              variables: { answer: true },
              dataStructure: {
                dpTable: [
                  ["T", "F", "F"],
                  ["T", "T", "F"],
                  ["F", "T", "T"],
                ],
                dpHighlight2D: { row: 2, col: 2 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Not Interleaving",
          description: "Strings that look similar but can't interleave",
          input: { s1: "ab", s2: "cd", s3: "abdc" },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3, 5, 6],
              shortLabel: "Init",
              explanation: 's1="ab", s2="cd", s3="abdc". Lengths match (2+2=4). Create 3x3 table.',
              variables: { m: 2, n: 2, s3: "abdc" },
              dataStructure: {
                dpTable: [["T","F","F"],["F","F","F"],["F","F","F"]],
                dpHighlight2D: { row: 0, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [8, 9],
              shortLabel: "First column",
              explanation: 'dp[1][0]: s1[0]="a"==s3[0]="a" -> T. dp[2][0]: s1[1]="b"==s3[1]="b" -> T. Using only s1, "ab" matches s3 prefix "ab".',
              variables: {},
              dataStructure: {
                dpTable: [["T","F","F"],["T","F","F"],["T","F","F"]],
                dpHighlight2D: { row: 2, col: 0 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [10, 11],
              shortLabel: "First row",
              explanation: 'dp[0][1]: s2[0]="c"==s3[0]="a"? No -> F. dp[0][2]: F. Can\'t start s3 with s2.',
              variables: {},
              dataStructure: {
                dpTable: [["T","F","F"],["T","F","F"],["T","F","F"]],
                dpHighlight2D: { row: 0, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [15, 16],
              shortLabel: "Fill interior",
              explanation: 'dp[1][1]: s3[1]="b". From s1: dp[0][1]=F. From s2: dp[1][0]=T but s2[0]="c"!="b". F. dp[1][2]: F. dp[2][1]: s3[2]="d". From s1: dp[1][1]=F. From s2: dp[2][0]=T and s2[0]="c"!="d". F. dp[2][2]: both neighbors F. F.',
              variables: { "dp[2][2]": "F" },
              dataStructure: {
                dpTable: [["T","F","F"],["T","F","F"],["T","F","F"]],
                dpHighlight2D: { row: 2, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [20],
              shortLabel: "Return false",
              explanation: 'dp[2][2] = false. "abdc" is NOT a valid interleaving of "ab" and "cd". The problem is that after consuming "ab" from s1, we\'d need "cd" from s2, but s3 has "dc" which reverses the order.',
              variables: { answer: false },
              dataStructure: {
                dpTable: [["T","F","F"],["T","F","F"],["T","F","F"]],
                dpHighlight2D: { row: 2, col: 2 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s1, s2, s3 }) {
        const steps = [];
        const m = s1.length, n = s2.length;

        if (m + n !== s3.length) {
          steps.push({
            stepId: 0, lineNumbers: [3],
            shortLabel: "Length mismatch",
            explanation: `s1 (${m}) + s2 (${n}) = ${m + n} != s3 (${s3.length}). Impossible.`,
            variables: { m, n, "s3.len": s3.length, answer: false },
            dataStructure: { dpTable: [], dpHighlight2D: null },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
        dp[0][0] = true;

        for (let i = 1; i <= m; i++) dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
        for (let j = 1; j <= n; j++) dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];

        const toStr = (table) => table.map(r => r.map(v => v ? "T" : "F"));

        steps.push({
          stepId: 0, lineNumbers: [5, 6, 8, 10],
          shortLabel: "Init table & borders",
          explanation: `Created ${m + 1}x${n + 1} table. Filled first row and column based on prefix matches.`,
          variables: { m, n, s1, s2, s3 },
          dataStructure: { dpTable: toStr(dp), dpHighlight2D: { row: 0, col: 0 } },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            const fromS1 = dp[i - 1][j] && s1[i - 1] === s3[i + j - 1];
            const fromS2 = dp[i][j - 1] && s2[j - 1] === s3[i + j - 1];
            dp[i][j] = fromS1 || fromS2;

            steps.push({
              stepId: steps.length, lineNumbers: [15, 16],
              shortLabel: `dp[${i}][${j}] = ${dp[i][j] ? "T" : "F"}`,
              explanation: `s3[${i + j - 1}]="${s3[i + j - 1]}". From s1: ${dp[i - 1][j] ? "T" : "F"} && s1[${i - 1}]="${s1[i - 1]}"=="${s3[i + j - 1]}"? ${fromS1}. From s2: ${dp[i][j - 1] ? "T" : "F"} && s2[${j - 1}]="${s2[j - 1]}"=="${s3[i + j - 1]}"? ${fromS2}. Result: ${dp[i][j]}.`,
              variables: { i, j, "s3[i+j-1]": s3[i + j - 1], result: dp[i][j] },
              dataStructure: {
                dpTable: toStr(dp),
                dpHighlight2D: { row: i, col: j },
              },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [20],
          shortLabel: `Return ${dp[m][n]}`,
          explanation: `dp[${m}][${n}] = ${dp[m][n]}. ${dp[m][n] ? "Valid" : "No valid"} interleaving exists.`,
          variables: { answer: dp[m][n] },
          dataStructure: { dpTable: toStr(dp), dpHighlight2D: { row: m, col: n } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(2^(m+n))", space: "O(m+n)", explanation: "Binary branching at each s3 position" },
    optimal: { time: "O(m*n)", space: "O(m*n)", explanation: "Fill (m+1)x(n+1) boolean table once", tradeoff: "Can optimize to O(n) space using a single row" },
  },

  interviewTips: [
    "Start with the length check — it's a free O(1) rejection.",
    "Explain why this is 2D DP: two pointers (one for each source string) define the state.",
    "Walk through a small example showing the OR logic: char came from s1 or s2.",
    "Mention the 1D space optimization: only need the previous row.",
    "Be careful with index mapping: dp[i][j] corresponds to s3[i+j-1].",
  ],

  relatedProblems: ["longest-common-subsequence", "edit-distance", "distinct-subsequences"],
};
