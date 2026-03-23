export const editDistance = {
  id: 118,
  slug: "edit-distance",
  title: "Edit Distance",
  difficulty: "Medium",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 118,
  artifactType: "DPTable2D",
  companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/edit-distance/",

  pattern: "2D DP String Transformation",
  patternExplanation: `Build a 2D table where dp[i][j] = min operations to convert word1[0..i-1]
    to word2[0..j-1]. Each cell considers insert, delete, or replace.`,

  intuition: {
    coreInsight: `To transform one string into another, at each position we have three choices:
      insert a character, delete a character, or replace a character. dp[i][j] represents
      the minimum edits to convert the first i characters of word1 into the first j characters
      of word2. If characters match, no edit needed; otherwise take the minimum of the three operations plus one.`,

    mentalModel: `Imagine you're a text editor with three buttons: Insert, Delete, Replace.
      You're converting one word into another character by character. At each step you ask:
      "Do these characters already match? Great, no button press needed. Otherwise, which
      single button press gets me closest to the target?" The DP table records the cheapest
      sequence of button presses for every prefix pair.`,

    whyNaiveFails: `Trying all possible sequences of insert/delete/replace operations creates
      an exponential search space. Each position has 3 choices, and the string can be up to
      500 characters long. The DP approach stores subproblem results in an (m+1) x (n+1) table,
      reducing the complexity to O(m*n).`,

    keyObservation: `When word1[i-1] == word2[j-1], dp[i][j] = dp[i-1][j-1] — no operation needed.
      Otherwise, dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]), corresponding to
      delete, insert, and replace respectively. The base cases are: converting empty string to
      word2[0..j-1] requires j insertions, and word1[0..i-1] to empty requires i deletions.`,
  },

  problem: `Given two strings word1 and word2, return the minimum number of operations required
    to convert word1 to word2. You have three operations: Insert a character, Delete a character,
    Replace a character.`,

  examples: [
    { input: 'word1 = "horse", word2 = "ros"', output: "3", explanation: 'horse → rorse (replace h with r) → rose (remove r) → ros (remove e)' },
    { input: 'word1 = "intention", word2 = "execution"', output: "5", explanation: 'intention → enention → exention → exection → execuion → execution' },
  ],

  constraints: [
    "0 <= word1.length, word2.length <= 500",
    "word1 and word2 consist of lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "Recursive (Top-Down)",
      tier: "brute",
      timeComplexity: "O(3^(m+n))",
      spaceComplexity: "O(m+n)",
      idea: "Recursively try all three operations at each position and return the minimum.",

      javaCode: `public int minDistance(String word1, String word2) {
    return helper(word1, word2, word1.length(), word2.length());
}

private int helper(String w1, String w2, int i, int j) {
    if (i == 0) return j;
    if (j == 0) return i;
    if (w1.charAt(i - 1) == w2.charAt(j - 1)) {
        return helper(w1, w2, i - 1, j - 1);
    }
    return 1 + Math.min(
        helper(w1, w2, i - 1, j),
        Math.min(helper(w1, w2, i, j - 1),
                 helper(w1, w2, i - 1, j - 1))
    );
}`,

      cppCode: `int minDistance(string word1, string word2) {
    return helper(word1, word2, word1.size(), word2.size());
}

int helper(string& w1, string& w2, int i, int j) {
    if (i == 0) return j;
    if (j == 0) return i;
    if (w1[i - 1] == w2[j - 1]) {
        return helper(w1, w2, i - 1, j - 1);
    }
    return 1 + min({
        helper(w1, w2, i - 1, j),
        helper(w1, w2, i, j - 1),
        helper(w1, w2, i - 1, j - 1)
    });
}`,

      pythonCode: `def minDistance(word1: str, word2: str) -> int:
    def helper(i, j):
        if i == 0: return j
        if j == 0: return i
        if word1[i - 1] == word2[j - 1]:
            return helper(i - 1, j - 1)
        return 1 + min(
            helper(i - 1, j),
            helper(i, j - 1),
            helper(i - 1, j - 1)
        )
    return helper(len(word1), len(word2))`,

      lineAnnotations: {
        5: "Base case: word1 exhausted, insert remaining j characters",
        6: "Base case: word2 exhausted, delete remaining i characters",
        7: "Characters match — no operation needed",
        10: "Try delete (i-1, j), insert (i, j-1), replace (i-1, j-1)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { word1: "horse", word2: "ros" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Start recursion",
              explanation: "Begin recursive exploration: convert 'horse' (len 5) to 'ros' (len 3). This will branch into exponentially many subproblems.",
              variables: { i: 5, j: 3, word1: "horse", word2: "ros" },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 12, 13],
              shortLabel: "Exponential branching",
              explanation: "At each mismatch, we branch into 3 recursive calls. With m=5, n=3, this creates a huge recursion tree with many repeated subproblems.",
              variables: { branches: "3^(m+n)", m: 5, n: 3 },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10],
              shortLabel: "Result: 3",
              explanation: "After exploring all paths, minimum edit distance is 3: replace h→r, delete r, delete e.",
              variables: { answer: 3 },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ word1, word2 }) {
        const m = word1.length, n = word2.length;
        const dp = Array.from({ length: m + 1 }, (_, i) => {
          const row = new Array(n + 1).fill(0);
          row[0] = i;
          return row;
        });
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
          }
        }
        return [
          { stepId: 0, lineNumbers: [1], shortLabel: "Start", explanation: `Convert "${word1}" to "${word2}".`, variables: { word1, word2 }, dataStructure: { dpTable: [], dpHighlight2D: null }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [10], shortLabel: `Result: ${dp[m][n]}`, explanation: `Minimum edit distance is ${dp[m][n]}.`, variables: { answer: dp[m][n] }, dataStructure: { dpTable: [], dpHighlight2D: null }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "Bottom-Up 2D DP",
      tier: "optimal",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
      idea: `Build a (m+1) x (n+1) table where dp[i][j] = min edits to convert word1[0..i-1]
        to word2[0..j-1]. Fill row by row using the recurrence.`,

      javaCode: `public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i-1) == word2.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i-1][j-1],
                    Math.min(dp[i-1][j], dp[i][j-1])
                );
            }
        }
    }

    return dp[m][n];
}`,

      cppCode: `int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i-1] == word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + min({
                    dp[i-1][j-1],
                    dp[i-1][j],
                    dp[i][j-1]
                });
            }
        }
    }

    return dp[m][n];
}`,

      pythonCode: `def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j-1],
                    dp[i-1][j],
                    dp[i][j-1]
                )

    return dp[m][n]`,

      lineAnnotations: {
        3: "Create (m+1) x (n+1) DP table",
        5: "Base case: converting word1[0..i-1] to empty string = i deletions",
        6: "Base case: converting empty string to word2[0..j-1] = j insertions",
        10: "Characters match — no operation needed, carry diagonal value",
        13: "Characters differ — take min of replace, delete, insert + 1",
        21: "Answer is in dp[m][n] — full word1 to full word2",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Convert "horse" to "ros"',
          input: { word1: "horse", word2: "ros" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 5, 6],
              shortLabel: "Init base cases",
              explanation: 'Create a 6x4 DP table. First column = [0,1,2,3,4,5] (deletions). First row = [0,1,2,3] (insertions). Converting "horse" to "ros".',
              variables: { m: 5, n: 3, word1: "horse", word2: "ros" },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]],
                dpHighlight2D: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 13],
              shortLabel: 'dp[1][1]: h≠r → 1+min(0,1,1)=1',
              explanation: "Comparing h and r: they differ. Replace=dp[0][0]+1=1, Delete=dp[0][1]+1=2, Insert=dp[1][0]+1=2. Min is 1 (replace h with r).",
              variables: { i: 1, j: 1, "w1[0]": "h", "w2[0]": "r", "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,1,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 0, c: 0 }, to: { r: 1, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 13],
              shortLabel: 'dp[1][2]: h≠o → 1+min(1,1,2)=2',
              explanation: "h vs o: differ. Replace=dp[0][1]+1=2, Delete=dp[0][2]+1=3, Insert=dp[1][1]+1=2. Min is 2.",
              variables: { i: 1, j: 2, "w1[0]": "h", "w2[1]": "o", "dp[i][j]": 2 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,1,2,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]],
                dpHighlight2D: { row: 1, col: 2 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 13],
              shortLabel: 'dp[1][3]: h≠s → 1+min(2,2,3)=3',
              explanation: "h vs s: differ. Min of replace/delete/insert = 3.",
              variables: { i: 1, j: 3, "dp[i][j]": 3 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,1,2,3],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]],
                dpHighlight2D: { row: 1, col: 3 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10],
              shortLabel: 'dp[2][1]: o≠r → 1+min(1,1,2)=2',
              explanation: "o vs r: differ. Replace=dp[1][0]+1=2, but min is actually 1+min(dp[1][0],dp[1][1],dp[2][0])=1+min(1,1,2)=2.",
              variables: { i: 2, j: 1, "dp[i][j]": 2 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,1,2,3],[2,2,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]],
                dpHighlight2D: { row: 2, col: 1 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [10],
              shortLabel: 'dp[2][2]: o=o → dp[1][1]=1',
              explanation: "o matches o! No edit needed. dp[2][2] = dp[1][1] = 1. Characters match — carry the diagonal value.",
              variables: { i: 2, j: 2, "w1[1]": "o", "w2[1]": "o", "dp[i][j]": 1 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,1,2,3],[2,2,1,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]],
                dpHighlight2D: { row: 2, col: 2 },
                dpArrows2D: [{ from: { r: 1, c: 1 }, to: { r: 2, c: 2 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10, 13],
              shortLabel: "Fill remaining rows",
              explanation: "Continue filling the table row by row. Each cell considers match/replace/insert/delete. The table gradually fills up.",
              variables: { progress: "rows 2-5" },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,1,2,3],[2,2,1,2],[3,2,2,2],[4,3,3,2],[5,4,4,3]],
                dpHighlight2D: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [21],
              shortLabel: "dp[5][3] = 3",
              explanation: 'The answer is dp[5][3] = 3. It takes 3 operations to convert "horse" to "ros": replace h→r, remove r, remove e.',
              variables: { answer: 3, "dp[m][n]": 3 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,1,2,3],[2,2,1,2],[3,2,2,2],[4,3,3,2],[5,4,4,3]],
                dpHighlight2D: { row: 5, col: 3 },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        sameStrings: {
          id: "sameStrings",
          label: "Same Strings",
          description: "Both strings identical — zero edits needed",
          input: { word1: "abc", word2: "abc" },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 5, 6],
              shortLabel: "Init base cases",
              explanation: 'Create 4x4 table. Base: row 0 = [0,1,2,3], col 0 = [0,1,2,3]. Strings "abc" and "abc" are identical.',
              variables: { word1: "abc", word2: "abc", m: 3, n: 3 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,0,0,0],[2,0,0,0],[3,0,0,0]],
                dpHighlight2D: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10],
              shortLabel: "dp[1][1]: a=a → 0",
              explanation: "a matches a. dp[1][1] = dp[0][0] = 0. No edit needed.",
              variables: { i: 1, j: 1, "dp[i][j]": 0 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,0,0,0],[2,0,0,0],[3,0,0,0]],
                dpHighlight2D: { row: 1, col: 1 },
                dpArrows2D: [{ from: { r: 0, c: 0 }, to: { r: 1, c: 1 } }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10],
              shortLabel: "All diagonal matches",
              explanation: "Every character matches its counterpart. The diagonal dp[1][1], dp[2][2], dp[3][3] all carry forward from dp[i-1][j-1].",
              variables: { "dp[2][2]": 0, "dp[3][3]": 0 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,0,1,2],[2,1,0,1],[3,2,1,0]],
                dpHighlight2D: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [21],
              shortLabel: "dp[3][3] = 0",
              explanation: "Identical strings need 0 edits. dp[3][3] = 0.",
              variables: { answer: 0 },
              dataStructure: {
                dpTable: [[0,1,2,3],[1,0,1,2],[2,1,0,1],[3,2,1,0]],
                dpHighlight2D: { row: 3, col: 3 },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ word1, word2 }) {
        const steps = [];
        const m = word1.length, n = word2.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;

        steps.push({
          stepId: 0, lineNumbers: [3, 5, 6],
          shortLabel: "Init base cases",
          explanation: `Create ${m + 1}x${n + 1} table. Base cases: first row = insertions, first col = deletions.`,
          variables: { m, n, word1, word2 },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: null },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1];
            } else {
              dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
            }

            steps.push({
              stepId: steps.length, lineNumbers: word1[i - 1] === word2[j - 1] ? [10] : [13],
              shortLabel: `dp[${i}][${j}]=${dp[i][j]}`,
              explanation: word1[i - 1] === word2[j - 1]
                ? `'${word1[i - 1]}' = '${word2[j - 1]}': match! dp[${i}][${j}] = dp[${i - 1}][${j - 1}] = ${dp[i][j]}.`
                : `'${word1[i - 1]}' ≠ '${word2[j - 1]}': dp[${i}][${j}] = 1 + min(${dp[i - 1][j - 1]}, ${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}.`,
              variables: { i, j, "dp[i][j]": dp[i][j] },
              dataStructure: {
                dpTable: dp.map(r => [...r]),
                dpHighlight2D: { row: i, col: j },
              },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [21],
          shortLabel: `Result: ${dp[m][n]}`,
          explanation: `dp[${m}][${n}] = ${dp[m][n]}. Minimum ${dp[m][n]} operations to convert "${word1}" to "${word2}".`,
          variables: { answer: dp[m][n] },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: m, col: n } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(3^(m+n))", space: "O(m+n)", explanation: "Exponential recursion with 3 branches per call" },
    optimal: { time: "O(m*n)", space: "O(m*n)", explanation: "Fill (m+1)x(n+1) table once; can optimize space to O(n) with two rows", tradeoff: "O(m*n) space for table eliminates exponential recomputation" },
  },

  interviewTips: [
    "Clearly define what dp[i][j] represents before writing code.",
    "Draw the base cases: empty string requires insertions/deletions.",
    "Explain the three operations: insert = dp[i][j-1], delete = dp[i-1][j], replace = dp[i-1][j-1].",
    "Mention space optimization: only need two rows at a time → O(min(m,n)) space.",
    "This is a classic interview problem — practice tracing the table by hand.",
  ],

  relatedProblems: ["longest-common-subsequence", "distinct-subsequences", "interleaving-string"],
};
