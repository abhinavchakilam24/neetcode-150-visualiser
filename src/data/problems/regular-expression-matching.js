export const regularExpressionMatching = {
  id: 120,
  slug: "regular-expression-matching",
  title: "Regular Expression Matching",
  difficulty: "Hard",
  topic: "dp-2d",
  topicLabel: "2-D Dynamic Programming",
  neetcodeNumber: 120,
  artifactType: "DPTable2D",
  companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/regular-expression-matching/",

  pattern: "2D DP Pattern Matching",
  patternExplanation: `dp[i][j] = whether s[0..i-1] matches p[0..j-1]. Handle '.' (any char)
    and '*' (zero or more of previous char) with careful case analysis.`,

  intuition: {
    coreInsight: `The challenge is the '*' operator which can match zero or more of the preceding
      character. For each position, if the pattern has 'x*', we either skip the pattern pair
      (zero occurrences) or match one character and stay on the same pattern (more occurrences).
      dp[i][j] tells us if the first i characters of s match the first j characters of p.`,

    mentalModel: `Think of two pointers walking through s and p. When p has a letter or '.', just
      match and advance both. When p has 'x*', you're at a fork: "Should I use this wildcard
      zero times (skip ahead in p by 2) or consume one character from s (if it matches x)
      and try again?" The DP table records every fork's outcome.`,

    whyNaiveFails: `Recursive matching without memoization branches at every '*'. Each '*' doubles
      the search space (use it or skip it), and nested '*'s create exponential paths. For strings
      of length m and patterns of length n, unmemoized recursion can be O(2^(m+n)). DP reduces
      this to O(m*n).`,

    keyObservation: `When p[j-1] == '*': dp[i][j] = dp[i][j-2] (zero occurrences of p[j-2]) OR
      (if p[j-2] matches s[i-1]) dp[i-1][j] (use one more occurrence). When p[j-1] is a letter
      or '.': dp[i][j] = dp[i-1][j-1] if characters match. Base case: dp[0][0] = true, and
      dp[0][j] = true only if p[0..j-1] is all 'x*' pairs.`,
  },

  problem: `Given an input string s and a pattern p, implement regular expression matching with
    support for '.' and '*' where: '.' matches any single character. '*' matches zero or more
    of the preceding element. The matching should cover the entire input string (not partial).`,

  examples: [
    { input: 's = "aa", p = "a"', output: "false", explanation: "'a' does not match the entire string 'aa'" },
    { input: 's = "aa", p = "a*"', output: "true", explanation: "'a*' means zero or more of 'a'. Two 'a's match." },
    { input: 's = "ab", p = ".*"', output: "true", explanation: "'.*' means zero or more of any character" },
  ],

  constraints: [
    "1 <= s.length <= 20",
    "1 <= p.length <= 20",
    "s contains only lowercase English letters.",
    "p contains only lowercase English letters, '.', and '*'.",
    "Each '*' has a previous valid character to match.",
  ],

  approaches: {
    brute: {
      label: "Recursive",
      tier: "brute",
      timeComplexity: "O(2^(m+n))",
      spaceComplexity: "O(m+n)",
      idea: "Recursively match characters, branching at '*' for zero or more matches.",

      javaCode: `public boolean isMatch(String s, String p) {
    if (p.isEmpty()) return s.isEmpty();
    boolean firstMatch = !s.isEmpty() &&
        (s.charAt(0) == p.charAt(0) || p.charAt(0) == '.');
    if (p.length() >= 2 && p.charAt(1) == '*') {
        return isMatch(s, p.substring(2)) ||
               (firstMatch && isMatch(s.substring(1), p));
    }
    return firstMatch && isMatch(s.substring(1), p.substring(1));
}`,

      cppCode: `bool isMatch(string s, string p) {
    if (p.empty()) return s.empty();
    bool firstMatch = !s.empty() &&
        (s[0] == p[0] || p[0] == '.');
    if (p.size() >= 2 && p[1] == '*') {
        return isMatch(s, p.substr(2)) ||
               (firstMatch && isMatch(s.substr(1), p));
    }
    return firstMatch && isMatch(s.substr(1), p.substr(1));
}`,

      pythonCode: `def isMatch(s: str, p: str) -> bool:
    if not p:
        return not s
    first_match = bool(s) and (s[0] == p[0] or p[0] == '.')
    if len(p) >= 2 and p[1] == '*':
        return isMatch(s, p[2:]) or (first_match and isMatch(s[1:], p))
    return first_match and isMatch(s[1:], p[1:])`,

      lineAnnotations: {
        2: "Base case: empty pattern matches only empty string",
        3: "Check if first characters match (including '.')",
        5: "If next char is '*', try zero matches or one match",
        6: "Zero matches: skip 'x*' in pattern",
        7: "One+ matches: consume one char from s, keep pattern",
        9: "No '*': both characters must match, advance both",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "aa", p: "a*" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [1], shortLabel: "Match 'aa' with 'a*'",
              explanation: "Pattern 'a*' means zero or more 'a'. String is 'aa' — need to match 2 a's.",
              variables: { s: "aa", p: "a*" },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [5, 7], shortLabel: "Use 'a*': consume first 'a'",
              explanation: "First char 'a' matches pattern 'a'. Use one occurrence of 'a*'. Recurse with s='a', p='a*'.",
              variables: { s: "a", p: "a*", firstMatch: true },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [5, 7], shortLabel: "Use 'a*' again: consume second 'a'",
              explanation: "s='a' matches 'a'. Use another occurrence. Recurse with s='', p='a*'.",
              variables: { s: "", p: "a*" },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [5, 6], shortLabel: "Zero matches: skip 'a*'",
              explanation: "s is empty. Try zero matches of 'a*': skip to p=''. Empty matches empty → true!",
              variables: { s: "", p: "", result: true },
              dataStructure: { dpTable: [], dpHighlight2D: null },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, p }) {
        const m = s.length, n = p.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
        dp[0][0] = true;
        for (let j = 2; j <= n; j++) { if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2]; }
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
              dp[i][j] = dp[i][j - 2] || ((p[j - 2] === s[i - 1] || p[j - 2] === '.') && dp[i - 1][j]);
            } else {
              dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === '.');
            }
          }
        }
        return [
          { stepId: 0, lineNumbers: [1], shortLabel: "Start", explanation: `Match "${s}" against "${p}".`, variables: { s, p }, dataStructure: { dpTable: [], dpHighlight2D: null }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [2], shortLabel: `Result: ${dp[m][n]}`, explanation: `isMatch("${s}", "${p}") = ${dp[m][n]}.`, variables: { answer: dp[m][n] }, dataStructure: { dpTable: [], dpHighlight2D: null }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "Bottom-Up 2D DP",
      tier: "optimal",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
      idea: `dp[i][j] = does s[0..i-1] match p[0..j-1]? Handle '*' by checking zero or more
        occurrences. Handle '.' as a wildcard for any character.`,

      javaCode: `public boolean isMatch(String s, String p) {
    int m = s.length(), n = p.length();
    boolean[][] dp = new boolean[m + 1][n + 1];
    dp[0][0] = true;

    for (int j = 2; j <= n; j++) {
        if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];
    }

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p.charAt(j - 1) == '*') {
                dp[i][j] = dp[i][j - 2];
                if (p.charAt(j - 2) == s.charAt(i - 1)
                    || p.charAt(j - 2) == '.') {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else if (p.charAt(j-1) == '.'
                       || p.charAt(j-1) == s.charAt(i-1)) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[m][n];
}`,

      cppCode: `bool isMatch(string s, string p) {
    int m = s.size(), n = p.size();
    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
    dp[0][0] = true;

    for (int j = 2; j <= n; j++) {
        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
    }

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 2];
                if (p[j - 2] == s[i - 1] || p[j - 2] == '.') {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else if (p[j-1] == '.' || p[j-1] == s[i-1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[m][n];
}`,

      pythonCode: `def isMatch(s: str, p: str) -> bool:
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True

    for j in range(2, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2]
                if p[j - 2] == s[i - 1] or p[j - 2] == '.':
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
            elif p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]

    return dp[m][n]`,

      lineAnnotations: {
        3: "dp[i][j] = does s[0..i-1] match p[0..j-1]?",
        4: "Empty string matches empty pattern",
        6: "Base case: patterns like 'a*b*' can match empty string",
        12: "If pattern char is '*', handle zero or more matches",
        13: "Zero occurrences: skip 'x*' pair (dp[i][j-2])",
        14: "If preceding char matches s[i-1], try one more occurrence",
        18: "'.' or exact match: carry diagonal value",
        24: "Answer: does entire s match entire p?",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 's="ab", p=".*" — wildcard matches all',
          input: { s: "ab", p: ".*" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 4, 6],
              shortLabel: "Init dp, base cases",
              explanation: 'Create 3x3 table. dp[0][0]=true. p=".*": p[1]="*", so dp[0][2]=dp[0][0]=true (zero "." matches empty).',
              variables: { s: "ab", p: ".*", m: 2, n: 2 },
              dataStructure: {
                dpTable: [[true, false, true], [false, false, false], [false, false, false]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [12, 13, 14, 16],
              shortLabel: "dp[1][1]: p[0]='.' matches 'a'",
              explanation: "p[0]='.', s[0]='a'. '.' matches any char. But p[0] is not '*', so dp[1][1] = dp[0][0] = true.",
              variables: { i: 1, j: 1, "s[0]": "a", "p[0]": ".", "dp[1][1]": true },
              dataStructure: {
                dpTable: [[true, false, true], [false, true, false], [false, false, false]],
                dpHighlight2D: { row: 1, col: 1 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [12, 13, 14, 16],
              shortLabel: "dp[1][2]: p[1]='*', zero or more '.'",
              explanation: "p[1]='*'. Zero occurrences: dp[1][0]=false. One+ occurrences: p[0]='.' matches s[0]='a', so dp[0][2]=true. dp[1][2] = false || true = true.",
              variables: { i: 1, j: 2, "dp[1][2]": true },
              dataStructure: {
                dpTable: [[true, false, true], [false, true, true], [false, false, false]],
                dpHighlight2D: { row: 1, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [18],
              shortLabel: "dp[2][1]: '.' matches 'b'",
              explanation: "p[0]='.', s[1]='b'. Match! dp[2][1] = dp[1][0] = false. (Only one '.' can't match 2 chars alone.)",
              variables: { i: 2, j: 1, "dp[2][1]": false },
              dataStructure: {
                dpTable: [[true, false, true], [false, true, true], [false, false, false]],
                dpHighlight2D: { row: 2, col: 1 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [12, 14, 16],
              shortLabel: "dp[2][2]: '.*' matches 'ab'",
              explanation: "p[1]='*'. Zero occurrences: dp[2][0]=false. One+ occurrences: p[0]='.' matches s[1]='b', so check dp[1][2]=true. dp[2][2] = true!",
              variables: { i: 2, j: 2, "dp[2][2]": true },
              dataStructure: {
                dpTable: [[true, false, true], [false, true, true], [false, false, true]],
                dpHighlight2D: { row: 2, col: 2 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [24],
              shortLabel: "dp[2][2] = true",
              explanation: '"ab" matches ".*". The pattern ".*" matches any string because "." matches any character and "*" allows zero or more repetitions.',
              variables: { answer: true },
              dataStructure: {
                dpTable: [[true, false, true], [false, true, true], [false, false, true]],
                dpHighlight2D: { row: 2, col: 2 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Match",
          description: 's="aa", p="a" — pattern too short',
          input: { s: "aa", p: "a" },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 4],
              shortLabel: "Init dp",
              explanation: 'Create 3x2 table. dp[0][0]=true. s="aa", p="a".',
              variables: { s: "aa", p: "a", m: 2, n: 1 },
              dataStructure: {
                dpTable: [[true, false], [false, false], [false, false]],
                dpHighlight2D: null,
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [18],
              shortLabel: "dp[1][1]: 'a'='a' → true",
              explanation: "s[0]='a' matches p[0]='a'. dp[1][1] = dp[0][0] = true.",
              variables: { i: 1, j: 1, "dp[1][1]": true },
              dataStructure: {
                dpTable: [[true, false], [false, true], [false, false]],
                dpHighlight2D: { row: 1, col: 1 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [18],
              shortLabel: "dp[2][1]: need dp[1][0]=false",
              explanation: "s[1]='a' matches p[0]='a', but dp[2][1] = dp[1][0] = false. Pattern 'a' can only match one character.",
              variables: { i: 2, j: 1, "dp[2][1]": false },
              dataStructure: {
                dpTable: [[true, false], [false, true], [false, false]],
                dpHighlight2D: { row: 2, col: 1 },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [24],
              shortLabel: "dp[2][1] = false",
              explanation: '"aa" does not match "a". Pattern is too short — it can only match a single \'a\'.',
              variables: { answer: false },
              dataStructure: {
                dpTable: [[true, false], [false, true], [false, false]],
                dpHighlight2D: { row: 2, col: 1 },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, p }) {
        const steps = [];
        const m = s.length, n = p.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
        dp[0][0] = true;
        for (let j = 2; j <= n; j++) {
          if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
        }

        steps.push({
          stepId: 0, lineNumbers: [3, 4, 6],
          shortLabel: "Init dp",
          explanation: `Create ${m + 1}x${n + 1} table. s="${s}", p="${p}".`,
          variables: { s, p, m, n },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: null },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
              dp[i][j] = dp[i][j - 2];
              if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
                dp[i][j] = dp[i][j] || dp[i - 1][j];
              }
            } else if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
              dp[i][j] = dp[i - 1][j - 1];
            }

            steps.push({
              stepId: steps.length, lineNumbers: p[j - 1] === '*' ? [12, 13] : [18],
              shortLabel: `dp[${i}][${j}]=${dp[i][j]}`,
              explanation: `s[${i - 1}]='${s[i - 1]}', p[${j - 1}]='${p[j - 1]}': dp[${i}][${j}] = ${dp[i][j]}.`,
              variables: { i, j, "dp[i][j]": dp[i][j] },
              dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: i, col: j } },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [24],
          shortLabel: `Result: ${dp[m][n]}`,
          explanation: `dp[${m}][${n}] = ${dp[m][n]}. "${s}" ${dp[m][n] ? 'matches' : 'does not match'} "${p}".`,
          variables: { answer: dp[m][n] },
          dataStructure: { dpTable: dp.map(r => [...r]), dpHighlight2D: { row: m, col: n } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(2^(m+n))", space: "O(m+n)", explanation: "Branching at every '*' creates exponential paths" },
    optimal: { time: "O(m*n)", space: "O(m*n)", explanation: "Fill (m+1)x(n+1) table once", tradeoff: "O(m*n) space eliminates exponential branching" },
  },

  interviewTips: [
    "Clarify the semantics of '*': zero or more of the PRECEDING element.",
    "Draw out the DP table with a small example before coding.",
    "Handle the base case carefully: patterns like 'a*b*c*' can match empty string.",
    "Distinguish between '.' (any single char) and '*' (repeat preceding).",
    "This is one of the hardest DP problems — start with the recursive solution to build intuition.",
  ],

  relatedProblems: ["wildcard-matching", "edit-distance", "longest-common-subsequence"],
};
