export const decodeWays = {
  id: 107,
  slug: "decode-ways",
  title: "Decode Ways",
  difficulty: "Medium",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 107,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Goldman Sachs"],
  leetcodeLink: "https://leetcode.com/problems/decode-ways/",

  pattern: "Fibonacci-Variant 1D DP with Conditional Transitions",
  patternExplanation: `Similar to Climbing Stairs, but with conditional transitions. At each position,
    you can take 1 digit or 2 digits, but only if they form valid letter codes (1-26). The recurrence
    is dp[i] = dp[i-1] (if single digit valid) + dp[i-2] (if two-digit number valid).`,

  intuition: {
    coreInsight: `At position i, the character can either be decoded alone (if it's '1'-'9') or as
      part of a two-digit number with the previous character (if they form 10-26). The total decodings
      for the first i characters equals the sum of valid transitions: dp[i-1] if single-digit valid,
      plus dp[i-2] if two-digit valid. A '0' can ONLY be part of a two-digit code (10 or 20).`,

    mentalModel: `Think of walking along the string, placing dividers. At each position you ask:
      "Can I read just this digit as a letter? Can I read this digit and the one before it together
      as a letter?" It's like Climbing Stairs, but some stairs are broken — you can't always take
      1 step or 2 steps. A '0' is a broken single stair: you MUST have come from 2 steps back
      (and only if the two-digit number is 10 or 20).`,

    whyNaiveFails: `Recursive brute force tries every valid split, leading to exponential calls.
      For "111111" (six 1s), each position can be decoded alone or paired, giving up to 2^(n/2)
      paths. Many subproblems overlap: the number of decodings for "1111" is computed from both
      "11111" (taking one digit) and "1111" directly.`,

    keyObservation: `The tricky part is '0'. Zero cannot stand alone — it must be part of 10 or 20.
      If a '0' follows anything other than '1' or '2', the string is invalid (return 0). Also,
      leading zeros are invalid. This is what makes Decode Ways harder than Climbing Stairs:
      certain transitions are forbidden.`,
  },

  problem: `A message containing letters A-Z can be encoded using the mapping: 'A' -> "1", 'B' -> "2",
    ..., 'Z' -> "26". Given a string s containing only digits, return the number of ways to decode it.
    The answer is guaranteed to fit in a 32-bit integer.`,

  examples: [
    { input: 's = "12"', output: "2", explanation: '"12" can be decoded as "AB" (1 2) or "L" (12).' },
    { input: 's = "226"', output: "3", explanation: '"226" can be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).' },
    { input: 's = "06"', output: "0", explanation: '"06" cannot be decoded. Leading zero is invalid — "06" is not "F".' },
  ],

  constraints: [
    "1 <= s.length <= 100",
    "s contains only digits and may contain leading zeros.",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: "At each position, try decoding one digit or two digits. Count all valid paths to the end.",

      javaCode: `public int numDecodings(String s) {
    return decode(s, 0);
}

private int decode(String s, int i) {
    if (i == s.length()) return 1;
    if (s.charAt(i) == '0') return 0;

    int ways = decode(s, i + 1);
    if (i + 1 < s.length()) {
        int twoDigit = Integer.parseInt(s.substring(i, i + 2));
        if (twoDigit >= 10 && twoDigit <= 26) {
            ways += decode(s, i + 2);
        }
    }
    return ways;
}`,

      cppCode: `int numDecodings(string s) {
    return decode(s, 0);
}

int decode(string& s, int i) {
    if (i == s.size()) return 1;
    if (s[i] == '0') return 0;

    int ways = decode(s, i + 1);
    if (i + 1 < s.size()) {
        int twoDigit = stoi(s.substr(i, 2));
        if (twoDigit >= 10 && twoDigit <= 26) {
            ways += decode(s, i + 2);
        }
    }
    return ways;
}`,

      pythonCode: `def numDecodings(s: str) -> int:
    def decode(i: int) -> int:
        if i == len(s):
            return 1
        if s[i] == '0':
            return 0

        ways = decode(i + 1)
        if i + 1 < len(s):
            two_digit = int(s[i:i+2])
            if 10 <= two_digit <= 26:
                ways += decode(i + 2)
        return ways

    return decode(0)`,

      lineAnnotations: {
        5: "Start decoding from position i",
        6: "Reached end — found one valid decoding",
        7: "Zero can't start a code — this path is invalid",
        9: "Option 1: decode single digit, recurse from i+1",
        10: "Check if we can take two digits",
        11: "Parse the two-digit number",
        12: "Only valid if between 10 and 26",
        13: "Option 2: decode two digits, recurse from i+2",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "226" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5],
              shortLabel: "decode(0)",
              explanation: "Start decoding '226' from index 0. s[0]='2', not zero, so we can proceed. Two options: take '2' alone, or take '22' together.",
              variables: { i: 0, s: "226" },
              dataStructure: {
                dpArray: [null, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "f(0) = f(1) + f(2) (both '2' and '22' are valid)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [9, 12, 13],
              shortLabel: "Branch: '2' or '22'",
              explanation: "From index 0: single digit '2' (valid, maps to B) leads to decode(1). Two digits '22' (valid, 10<=22<=26, maps to V) leads to decode(2). Both branches are explored.",
              variables: { i: 0, singleDigit: "2", twoDigit: 22 },
              dataStructure: {
                dpArray: [null, null, null, null],
                dpHighlight: 0,
                dpArrows: [{ from: 0, to: 1 }, { from: 0, to: 2 }],
                dpFormula: "f(0) = f(1) + f(2)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 12, 13],
              shortLabel: "Resolves: f(0) = 2 + 1 = 3",
              explanation: "After full recursion: f(3)=1 (base), f(2)=1 (only '6' works), f(1)=2 ('2'+'6' or '26'), f(0) = f(1)+f(2) = 2+1 = 3. Three decodings: 'BBF', 'BZ', 'VF'.",
              variables: { "f(0)": 3, "f(1)": 2, "f(2)": 1, "f(3)": 1, answer: 3 },
              dataStructure: {
                dpArray: [3, 2, 1, 1],
                dpHighlight: 0,
                dpArrows: [{ from: 1, to: 0 }, { from: 2, to: 0 }],
                dpFormula: "f(0) = f(1) + f(2) = 2 + 1 = 3",
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
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `dp[i] = number of ways to decode s[0..i). dp[0]=1 (empty prefix). For each i:
        if s[i-1] != '0', add dp[i-1]. If s[i-2..i) forms 10-26, add dp[i-2].`,

      javaCode: `public int numDecodings(String s) {
    int n = s.length();
    int[] dp = new int[n + 1];
    dp[0] = 1;
    dp[1] = s.charAt(0) != '0' ? 1 : 0;

    for (int i = 2; i <= n; i++) {
        int oneDigit = s.charAt(i - 1) - '0';
        int twoDigit = Integer.parseInt(s.substring(i - 2, i));

        if (oneDigit >= 1) {
            dp[i] += dp[i - 1];
        }
        if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[n];
}`,

      cppCode: `int numDecodings(string s) {
    int n = s.size();
    vector<int> dp(n + 1, 0);
    dp[0] = 1;
    dp[1] = s[0] != '0' ? 1 : 0;

    for (int i = 2; i <= n; i++) {
        int oneDigit = s[i - 1] - '0';
        int twoDigit = stoi(s.substr(i - 2, 2));

        if (oneDigit >= 1) {
            dp[i] += dp[i - 1];
        }
        if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[n];
}`,

      pythonCode: `def numDecodings(s: str) -> int:
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1 if s[0] != '0' else 0

    for i in range(2, n + 1):
        one_digit = int(s[i - 1])
        two_digit = int(s[i - 2:i])

        if one_digit >= 1:
            dp[i] += dp[i - 1]
        if 10 <= two_digit <= 26:
            dp[i] += dp[i - 2]

    return dp[n]`,

      lineAnnotations: {
        3: "dp[i] = number of ways to decode s[0..i)",
        4: "Base case: 1 way to decode empty string",
        5: "First character: 1 way if not '0', else 0 ways",
        7: "Fill from position 2 to n",
        8: "Single digit: the i-th character (1-indexed)",
        9: "Two digits: characters at positions i-2 and i-1",
        11: "If single digit is 1-9, we can decode it alone",
        12: "Add ways from dp[i-1] (took 1 character)",
        14: "If two-digit number is 10-26, valid as a pair",
        15: "Add ways from dp[i-2] (took 2 characters)",
        18: "Answer: ways to decode the entire string",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: '"226" has 3 decodings: BBF, BZ, VF',
          input: { s: "226" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4, 5],
              shortLabel: "Init dp[0]=1, dp[1]=1",
              explanation: "Create dp array of size 4. dp[0]=1 (empty prefix has one decoding). dp[1]=1 because s[0]='2' is not '0', so '2' maps to 'B' — one way.",
              variables: { s: "226", n: 3, dp: "[1, 1, _, _]" },
              dataStructure: {
                dpArray: [1, 1, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "dp[0]=1, dp[1]=1 (s[0]='2' is valid)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 9, 11, 12, 14, 15],
              shortLabel: "dp[2] = dp[1] + dp[0] = 2",
              explanation: "i=2: oneDigit=s[1]='2' (>=1, valid single). twoDigit=s[0..2)='22' (10<=22<=26, valid pair). dp[2] = dp[1] + dp[0] = 1 + 1 = 2. Two decodings of '22': 'BB' (2,2) or 'V' (22).",
              variables: { i: 2, oneDigit: 2, twoDigit: 22, "dp[i-1]": 1, "dp[i-2]": 1, "dp[i]": 2 },
              dataStructure: {
                dpArray: [1, 1, 2, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }, { from: 1, to: 2 }],
                dpFormula: "dp[2] = dp[1] + dp[0] = 1 + 1 = 2",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 9, 11, 12, 14, 15],
              shortLabel: "dp[3] = dp[2] + dp[1] = 3",
              explanation: "i=3: oneDigit=s[2]='6' (>=1, valid single). twoDigit=s[1..3)='26' (10<=26<=26, valid pair). dp[3] = dp[2] + dp[1] = 2 + 1 = 3. Three decodings: 'BBF' (2,2,6), 'VF' (22,6), 'BZ' (2,26).",
              variables: { i: 3, oneDigit: 6, twoDigit: 26, "dp[i-1]": 2, "dp[i-2]": 1, "dp[i]": 3 },
              dataStructure: {
                dpArray: [1, 1, 2, 3],
                dpHighlight: 3,
                dpArrows: [{ from: 1, to: 3 }, { from: 2, to: 3 }],
                dpFormula: "dp[3] = dp[2] + dp[1] = 2 + 1 = 3",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [18],
              shortLabel: "Return dp[3] = 3",
              explanation: "dp[3] = 3. The string '226' has 3 valid decodings: 'BBF' (2,2,6), 'VF' (22,6), 'BZ' (2,26). Return 3.",
              variables: { n: 3, answer: 3 },
              dataStructure: {
                dpArray: [1, 1, 2, 3],
                dpHighlight: 3,
                dpArrows: [],
                dpFormula: "Answer: dp[3] = 3",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Contains Zero",
          description: '"106" — zero must pair with preceding digit',
          input: { s: "106" },
          expectedOutput: "1",
          commonMistake: "Treating '0' as a valid single digit. '0' alone is NOT a letter. It must be part of '10' or '20'. If you skip this check, you'll overcount.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4, 5],
              shortLabel: "Init dp[0]=1, dp[1]=1",
              explanation: "dp[0]=1 (empty prefix). dp[1]=1 because s[0]='1' is valid (maps to 'A').",
              variables: { s: "106", n: 3, dp: "[1, 1, _, _]" },
              dataStructure: {
                dpArray: [1, 1, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "dp[0]=1, dp[1]=1",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 9, 14, 15],
              shortLabel: "dp[2]: '0' alone invalid, '10' valid → 1",
              explanation: "i=2: oneDigit=s[1]='0'. Zero is NOT >=1, so single digit is INVALID — we do NOT add dp[1]. twoDigit=s[0..2)='10' (10<=10<=26, valid). dp[2] = 0 + dp[0] = 1. Only decoding: '10' as 'J'.",
              variables: { i: 2, oneDigit: 0, twoDigit: 10, "dp[i]": 1 },
              dataStructure: {
                dpArray: [1, 1, 1, null],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
                dpFormula: "dp[2] = dp[0] = 1 (only '10' valid, not '0' alone)",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 9, 11, 12],
              shortLabel: "dp[3]: '6' valid, '06' invalid → 1",
              explanation: "i=3: oneDigit=s[2]='6' (>=1, valid single, maps to 'F'). dp[3] += dp[2] = 1. twoDigit=s[1..3)='06' (06 < 10, NOT valid). dp[3] = 1. Only decoding: 'JF' (10, 6).",
              variables: { i: 3, oneDigit: 6, twoDigit: 6, "dp[i]": 1 },
              dataStructure: {
                dpArray: [1, 1, 1, 1],
                dpHighlight: 3,
                dpArrows: [{ from: 2, to: 3 }],
                dpFormula: "dp[3] = dp[2] = 1 (only single '6', '06' invalid)",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [18],
              shortLabel: "Return dp[3] = 1",
              explanation: "dp[3] = 1. The only valid decoding of '106' is 'JF' (10→J, 6→F). Return 1.",
              variables: { n: 3, answer: 1 },
              dataStructure: {
                dpArray: [1, 1, 1, 1],
                dpHighlight: 3,
                dpArrows: [],
                dpFormula: "Answer: dp[3] = 1",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Leading Zero",
          description: '"06" — starts with zero, completely invalid',
          input: { s: "06" },
          expectedOutput: "0",
          commonMistake: "Not handling leading zeros. '06' looks like it could be 'F' but '06' is not a valid encoding — only '6' would be.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4, 5],
              shortLabel: "Init dp[0]=1, dp[1]=0",
              explanation: "dp[0]=1 (empty prefix). dp[1]=0 because s[0]='0' IS '0' — no valid single-digit decoding. This immediately poisons the rest.",
              variables: { s: "06", n: 2, dp: "[1, 0, _]" },
              dataStructure: {
                dpArray: [1, 0, null],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "dp[1]=0 (s[0]='0' is invalid as single digit)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 9, 11, 14],
              shortLabel: "dp[2] = 0",
              explanation: "i=2: oneDigit=s[1]='6' (>=1, valid). dp[2] += dp[1] = 0. twoDigit=s[0..2)='06' (06 < 10, invalid). dp[2] stays 0. No valid decoding exists.",
              variables: { i: 2, oneDigit: 6, twoDigit: 6, "dp[i]": 0 },
              dataStructure: {
                dpArray: [1, 0, 0],
                dpHighlight: 2,
                dpArrows: [],
                dpFormula: "dp[2] = 0 (dp[1]=0, '06' invalid pair)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [18],
              shortLabel: "Return dp[2] = 0",
              explanation: "dp[2] = 0. The string '06' has no valid decoding. A leading zero makes the entire string undecodable. Return 0.",
              variables: { n: 2, answer: 0 },
              dataStructure: {
                dpArray: [1, 0, 0],
                dpHighlight: 2,
                dpArrows: [],
                dpFormula: "Answer: dp[2] = 0",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const steps = [];
        const n = s.length;
        const dp = new Array(n + 1).fill(0);
        dp[0] = 1;
        dp[1] = s[0] !== '0' ? 1 : 0;

        steps.push({
          stepId: 0,
          lineNumbers: [3, 4, 5],
          shortLabel: `Init dp[0]=1, dp[1]=${dp[1]}`,
          explanation: `dp[0]=1 (empty prefix). dp[1]=${dp[1]} because s[0]='${s[0]}' ${s[0] !== '0' ? "is valid (maps to a letter)" : "is '0', which is invalid as a single digit"}.`,
          variables: { s, n, dp: JSON.stringify(dp.map((v, i) => i <= 1 ? v : "_")) },
          dataStructure: {
            dpArray: dp.map((v, i) => i <= 1 ? v : null),
            dpHighlight: null,
            dpArrows: [],
            dpFormula: `dp[0]=1, dp[1]=${dp[1]}`,
          },
          delta: {},
          isAnswer: false,
        });

        for (let i = 2; i <= n; i++) {
          const oneDigit = parseInt(s[i - 1]);
          const twoDigit = parseInt(s.substring(i - 2, i));

          if (oneDigit >= 1) {
            dp[i] += dp[i - 1];
          }
          if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] += dp[i - 2];
          }

          const arrows = [];
          if (oneDigit >= 1 && dp[i - 1] > 0) arrows.push({ from: i - 1, to: i });
          if (twoDigit >= 10 && twoDigit <= 26 && dp[i - 2] > 0) arrows.push({ from: i - 2, to: i });

          const parts = [];
          if (oneDigit >= 1) parts.push(`'${s[i-1]}' valid single → +dp[${i-1}]=${dp[i-1]}`);
          else parts.push(`'${s[i-1]}' is 0, invalid single`);
          if (twoDigit >= 10 && twoDigit <= 26) parts.push(`'${s.substring(i-2,i)}' valid pair → +dp[${i-2}]=${dp[i-2]}`);
          else parts.push(`'${s.substring(i-2,i)}' invalid pair`);

          steps.push({
            stepId: steps.length,
            lineNumbers: [7, 8, 9, 11, 12, 14, 15],
            shortLabel: `dp[${i}] = ${dp[i]}`,
            explanation: `i=${i}: ${parts.join(". ")}. dp[${i}] = ${dp[i]}.`,
            variables: { i, oneDigit, twoDigit, "dp[i]": dp[i] },
            dataStructure: {
              dpArray: dp.map((v, idx) => idx <= i ? v : null),
              dpHighlight: i,
              dpArrows: arrows,
              dpFormula: `dp[${i}] = ${dp[i]}`,
            },
            delta: { changedIndices: [i] },
            isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [18],
          shortLabel: `Return dp[${n}] = ${dp[n]}`,
          explanation: `dp[${n}] = ${dp[n]}. ${dp[n] === 0 ? "No valid decoding exists." : `There ${dp[n] === 1 ? "is 1 way" : `are ${dp[n]} ways`} to decode "${s}".`} Return ${dp[n]}.`,
          variables: { n, answer: dp[n] },
          dataStructure: {
            dpArray: [...dp],
            dpHighlight: n,
            dpArrows: [],
            dpFormula: `Answer: dp[${n}] = ${dp[n]}`,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(2^n)", space: "O(n)", explanation: "Each position branches into 1-digit or 2-digit decode, with recursion depth n" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "Single pass through the string, dp array of size n+1", tradeoff: "Can optimize to O(1) space with two variables, like Climbing Stairs" },
  },

  interviewTips: [
    "Immediately mention this is like Climbing Stairs but with constraints on which steps are valid.",
    "Handle the '0' case explicitly — it's the main source of bugs in this problem.",
    "dp[0]=1 is not intuitive — explain it as 'one way to decode the empty string (do nothing)'.",
    "Walk through '106' to show how zero forces a two-digit pairing.",
    "Ask: 'Can the input contain characters other than digits?' to show thoroughness.",
  ],

  relatedProblems: ["climbing-stairs", "decode-ways-ii", "word-break"],
};
