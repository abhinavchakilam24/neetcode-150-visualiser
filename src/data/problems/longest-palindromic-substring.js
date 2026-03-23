export const longestPalindromicSubstring = {
  id: 103,
  slug: "longest-palindromic-substring",
  title: "Longest Palindromic Substring",
  difficulty: "Medium",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 5,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Microsoft", "Google", "Meta", "Adobe"],
  leetcodeLink: "https://leetcode.com/problems/longest-palindromic-substring/",

  pattern: "Expand Around Center",
  patternExplanation: `For each position in the string, expand outward while characters match on
    both sides. Check both odd-length (single center) and even-length (double center) palindromes.
    This reduces O(n^3) brute force to O(n^2) with O(1) space.`,

  intuition: {
    coreInsight: `Every palindrome has a center. For odd-length palindromes like "aba", the center
      is a single character. For even-length like "abba", the center is between two characters.
      If we try every possible center and expand outward while the characters match, we find
      every palindrome. There are only 2n-1 possible centers, and each expansion takes O(n),
      giving O(n^2) total.`,

    mentalModel: `Imagine dropping a pebble into a pond at each position in the string. The ripples
      expand outward symmetrically. As long as the characters on both sides match, the ripple
      keeps growing. When they stop matching, the ripple stops. The widest ripple across all
      drop points is your longest palindrome. You drop once for odd-length centers and once
      between each adjacent pair for even-length centers.`,

    whyNaiveFails: `Brute force checks all O(n^2) substrings and verifies each is a palindrome
      in O(n) — total O(n^3). For n=1000, that's a billion operations. Even DP using a 2D
      table (dp[i][j] = is s[i..j] a palindrome?) costs O(n^2) time AND O(n^2) space. Expand
      around center achieves O(n^2) time with only O(1) space.`,

    keyObservation: `You don't need to store all palindrome information in a table. Just track
      the start and length of the longest palindrome found so far. At each center, expand as
      far as possible and update the global best. The expansion stops the moment characters
      don't match — no wasted work.`,
  },

  problem: `Given a string s, return the longest palindromic substring in s.`,

  examples: [
    { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
    { input: 's = "cbbd"', output: '"bb"', explanation: "The longest palindromic substring is \"bb\"." },
  ],

  constraints: [
    "1 <= s.length <= 1000",
    "s consist of only digits and English letters.",
  ],

  approaches: {
    brute: {
      label: "Check All Substrings",
      tier: "brute",
      timeComplexity: "O(n^3)",
      spaceComplexity: "O(1)",
      idea: "Try every substring, check if it's a palindrome, track the longest.",

      javaCode: `public String longestPalindrome(String s) {
    String result = "";
    for (int i = 0; i < s.length(); i++) {
        for (int j = i; j < s.length(); j++) {
            if (isPalindrome(s, i, j) && j - i + 1 > result.length()) {
                result = s.substring(i, j + 1);
            }
        }
    }
    return result;
}

private boolean isPalindrome(String s, int lo, int hi) {
    while (lo < hi) {
        if (s.charAt(lo++) != s.charAt(hi--)) return false;
    }
    return true;
}`,

      cppCode: `string longestPalindrome(string s) {
    string result = "";
    for (int i = 0; i < s.size(); i++) {
        for (int j = i; j < s.size(); j++) {
            string sub = s.substr(i, j - i + 1);
            string rev = sub;
            reverse(rev.begin(), rev.end());
            if (sub == rev && sub.size() > result.size())
                result = sub;
        }
    }
    return result;
}`,

      pythonCode: `def longestPalindrome(s: str) -> str:
    result = ""
    for i in range(len(s)):
        for j in range(i, len(s)):
            sub = s[i:j+1]
            if sub == sub[::-1] and len(sub) > len(result):
                result = sub
    return result`,

      lineAnnotations: {
        2: "Try every starting position",
        3: "Try every ending position",
        4: "Check if substring is a palindrome and longer than current best",
        5: "Update result",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "babad" },
          expectedOutput: '"bab"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Start checking all substrings",
              explanation: 'String "babad" has 15 substrings. We check each one for palindrome property. This is O(n^3) — very slow.',
              variables: { s: "babad", n: 5, result: '""' },
              dataStructure: {
                dpArray: [null, null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: 'Check all O(n^2) substrings',
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5],
              shortLabel: '"bab" is palindrome, length 3',
              explanation: 'Found "bab" (indices 0-2) is a palindrome of length 3. Update result.',
              variables: { i: 0, j: 2, sub: "bab", isPalin: true, result: '"bab"' },
              dataStructure: {
                dpArray: [null, null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: 'result = "bab" (len 3)',
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8],
              shortLabel: 'Return "bab"',
              explanation: 'After checking all substrings, the longest palindrome is "bab" with length 3. "aba" also works.',
              variables: { answer: '"bab"' },
              dataStructure: {
                dpArray: [null, null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: 'Answer: "bab"',
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
      label: "Expand Around Center",
      tier: "optimal",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      idea: `For each index, expand outward from that center for odd-length palindromes, and
        from that index and i+1 for even-length palindromes. Track the longest found.`,

      javaCode: `public String longestPalindrome(String s) {
    int start = 0, maxLen = 1;

    for (int i = 0; i < s.length(); i++) {
        int len1 = expand(s, i, i);
        int len2 = expand(s, i, i + 1);
        int len = Math.max(len1, len2);
        if (len > maxLen) {
            maxLen = len;
            start = i - (len - 1) / 2;
        }
    }

    return s.substring(start, start + maxLen);
}

private int expand(String s, int left, int right) {
    while (left >= 0 && right < s.length()
           && s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}`,

      cppCode: `string longestPalindrome(string s) {
    int start = 0, maxLen = 1;

    auto expand = [&](int left, int right) -> int {
        while (left >= 0 && right < s.size()
               && s[left] == s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    };

    for (int i = 0; i < s.size(); i++) {
        int len1 = expand(i, i);
        int len2 = expand(i, i + 1);
        int len = max(len1, len2);
        if (len > maxLen) {
            maxLen = len;
            start = i - (len - 1) / 2;
        }
    }

    return s.substr(start, maxLen);
}`,

      pythonCode: `def longestPalindrome(s: str) -> str:
    start, max_len = 0, 1

    def expand(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1

    for i in range(len(s)):
        len1 = expand(i, i)
        len2 = expand(i, i + 1)
        length = max(len1, len2)
        if length > max_len:
            max_len = length
            start = i - (length - 1) // 2

    return s[start:start + max_len]`,

      lineAnnotations: {
        2: "Track start index and max length of best palindrome",
        4: "Try each position as a center",
        5: "Expand for odd-length palindrome (single center)",
        6: "Expand for even-length palindrome (double center)",
        7: "Take the longer of the two expansions",
        8: "Update if longer than current best",
        9: "Compute the start index from center and length",
        13: "Return the longest palindromic substring",
        16: "Expand outward while characters match",
        17: "Check bounds and character equality",
        21: "Return length of palindrome found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'String "babad" — odd-length palindrome found',
          input: { s: "babad" },
          expectedOutput: '"bab"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init start=0, maxLen=1",
              explanation: 'Initialize: best palindrome starts at index 0 with length 1 (single character "b" is always a palindrome).',
              variables: { s: "babad", start: 0, maxLen: 1, best: '"b"' },
              dataStructure: {
                dpArray: [null, null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: 'best = "b" (len 1)',
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Center 0: "b", odd=1, even=0',
              explanation: 'Center at index 0 ("b"). Odd expansion: "b" length 1. Even expansion: s[0]="b" vs s[1]="a" — mismatch, length 0. Best from center 0: 1. No update.',
              variables: { i: 0, center: "b", len1: 1, len2: 0, len: 1, maxLen: 1 },
              dataStructure: {
                dpArray: [1, null, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: 'Center "b": max(1, 0) = 1',
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6, 7, 8, 9],
              shortLabel: 'Center 1: "a" → "bab" len=3!',
              explanation: 'Center at index 1 ("a"). Odd: expand left=0,right=2 → s[0]="b"==s[2]="b" match! Expand left=-1 stops. "bab" length 3. Even: s[1]="a" vs s[2]="b" mismatch. Best from center 1: 3 > maxLen 1. Update! start=0, maxLen=3.',
              variables: { i: 1, center: "a", len1: 3, len2: 0, len: 3, maxLen: 3, start: 0, best: '"bab"' },
              dataStructure: {
                dpArray: [1, 3, null, null, null],
                dpHighlight: 1,
                dpArrows: [{ from: 0, to: 1 }, { from: 1, to: 2 }],
                dpFormula: '"bab" (len 3) — new best!',
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7, 8, 9],
              shortLabel: 'Center 2: "b" → "aba" len=3',
              explanation: 'Center at index 2 ("b"). Odd: expand left=1,right=3 → s[1]="a"==s[3]="a" match! left=0,right=4 → s[0]="b"==s[4]="d" mismatch. "aba" length 3. Even: s[2]="b" vs s[3]="a" mismatch. Best: 3 = maxLen. No update (tie).',
              variables: { i: 2, center: "b", len1: 3, len2: 0, len: 3, maxLen: 3 },
              dataStructure: {
                dpArray: [1, 3, 3, null, null],
                dpHighlight: 2,
                dpArrows: [{ from: 1, to: 2 }, { from: 2, to: 3 }],
                dpFormula: '"aba" (len 3) — ties best',
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Center 3: "a", odd=1, even=0',
              explanation: 'Center at index 3 ("a"). Odd: expand left=2,right=4 → s[2]="b"!=s[4]="d". Length 1. Even: s[3]="a" vs s[4]="d" mismatch. Best: 1 < maxLen. No update.',
              variables: { i: 3, center: "a", len1: 1, len2: 0, len: 1, maxLen: 3 },
              dataStructure: {
                dpArray: [1, 3, 3, 1, null],
                dpHighlight: 3,
                dpArrows: [],
                dpFormula: 'Center "a": max(1, 0) = 1',
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Center 4: "d", odd=1, even=0',
              explanation: 'Center at index 4 ("d"). Last character — odd length 1, no even expansion possible. No update.',
              variables: { i: 4, center: "d", len1: 1, len2: 0, len: 1, maxLen: 3 },
              dataStructure: {
                dpArray: [1, 3, 3, 1, 1],
                dpHighlight: 4,
                dpArrows: [],
                dpFormula: 'Center "d": max(1, 0) = 1',
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13],
              shortLabel: 'Return "bab"',
              explanation: 'Best palindrome: start=0, maxLen=3. Return s[0..2] = "bab". Note: "aba" is equally valid.',
              variables: { start: 0, maxLen: 3, answer: '"bab"' },
              dataStructure: {
                dpArray: [1, 3, 3, 1, 1],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: 'Answer: "bab"',
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Even Length",
          description: 'String "cbbd" — even-length palindrome "bb"',
          input: { s: "cbbd" },
          expectedOutput: '"bb"',
          commonMistake: "Forgetting to check even-length palindromes. Only expanding from single centers misses 'bb'.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init start=0, maxLen=1",
              explanation: 'Initialize with best = "c" (length 1).',
              variables: { s: "cbbd", start: 0, maxLen: 1 },
              dataStructure: {
                dpArray: [null, null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: 'best = "c" (len 1)',
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Center 0: "c", odd=1, even=0',
              explanation: 'Center at 0: odd expansion "c" length 1. Even: s[0]="c" vs s[1]="b" mismatch. No update.',
              variables: { i: 0, len1: 1, len2: 0, maxLen: 1 },
              dataStructure: {
                dpArray: [1, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: 'Center "c": 1',
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6, 7, 8, 9],
              shortLabel: 'Center 1: even → "bb" len=2!',
              explanation: 'Center at 1: odd "b" length 1. Even: s[1]="b"==s[2]="b" match! Expand: s[0]="c"!=s[3]="d" stop. "bb" length 2. 2 > maxLen 1. Update! start=1, maxLen=2.',
              variables: { i: 1, len1: 1, len2: 2, len: 2, maxLen: 2, start: 1, best: '"bb"' },
              dataStructure: {
                dpArray: [1, 2, null, null],
                dpHighlight: 1,
                dpArrows: [{ from: 1, to: 2 }],
                dpFormula: '"bb" (len 2) — new best!',
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Center 2: "b", odd=1, even=0',
              explanation: 'Center at 2: odd "b" length 1. Even: s[2]="b" vs s[3]="d" mismatch. No update.',
              variables: { i: 2, len1: 1, len2: 0, maxLen: 2 },
              dataStructure: {
                dpArray: [1, 2, 1, null],
                dpHighlight: 2,
                dpArrows: [],
                dpFormula: 'Center "b": 1',
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Center 3: "d", odd=1',
              explanation: 'Center at 3: last character, odd "d" length 1. No update.',
              variables: { i: 3, len1: 1, len2: 0, maxLen: 2 },
              dataStructure: {
                dpArray: [1, 2, 1, 1],
                dpHighlight: 3,
                dpArrows: [],
                dpFormula: 'Center "d": 1',
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13],
              shortLabel: 'Return "bb"',
              explanation: 'Best palindrome: start=1, maxLen=2. Return s[1..2] = "bb".',
              variables: { start: 1, maxLen: 2, answer: '"bb"' },
              dataStructure: {
                dpArray: [1, 2, 1, 1],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: 'Answer: "bb"',
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const steps = [];
        let start = 0, maxLen = 1;
        const n = s.length;
        const dpArr = new Array(n).fill(null);

        function expand(left, right) {
          while (left >= 0 && right < n && s[left] === s[right]) {
            left--;
            right++;
          }
          return right - left - 1;
        }

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init start=0, maxLen=1",
          explanation: `Initialize: best palindrome is single character "${s[0]}" with length 1.`,
          variables: { s, start: 0, maxLen: 1, best: `"${s[0]}"` },
          dataStructure: { dpArray: [...dpArr], dpHighlight: null, dpArrows: [], dpFormula: `best = "${s[0]}" (len 1)` },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const len1 = expand(i, i);
          const len2 = i + 1 < n ? expand(i, i + 1) : 0;
          const len = Math.max(len1, len2);
          dpArr[i] = len;

          if (len > maxLen) {
            maxLen = len;
            start = i - Math.floor((len - 1) / 2);
            steps.push({
              stepId: steps.length, lineNumbers: [4, 5, 6, 7, 8, 9],
              shortLabel: `Center ${i}: "${s[i]}" → len=${len} — new best!`,
              explanation: `Center at index ${i} ("${s[i]}"): odd=${len1}, even=${len2}. Best=${len}. New longest: "${s.substring(start, start + maxLen)}" (length ${maxLen}).`,
              variables: { i, center: s[i], len1, len2, len, maxLen, start, best: `"${s.substring(start, start + maxLen)}"` },
              dataStructure: {
                dpArray: [...dpArr], dpHighlight: i,
                dpArrows: len > 1 ? [{ from: start, to: i }, { from: i, to: start + maxLen - 1 }] : [],
                dpFormula: `"${s.substring(start, start + maxLen)}" (len ${maxLen}) — new best!`,
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          } else {
            steps.push({
              stepId: steps.length, lineNumbers: [4, 5, 6],
              shortLabel: `Center ${i}: "${s[i]}", odd=${len1}, even=${len2}`,
              explanation: `Center at index ${i} ("${s[i]}"): odd=${len1}, even=${len2}. Best=${len}. No improvement over maxLen=${maxLen}.`,
              variables: { i, center: s[i], len1, len2, len, maxLen },
              dataStructure: { dpArray: [...dpArr], dpHighlight: i, dpArrows: [], dpFormula: `Center "${s[i]}": max(${len1}, ${len2}) = ${len}` },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        const answer = s.substring(start, start + maxLen);
        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: `Return "${answer}"`,
          explanation: `Best palindrome: start=${start}, maxLen=${maxLen}. Return "${answer}".`,
          variables: { start, maxLen, answer: `"${answer}"` },
          dataStructure: { dpArray: [...dpArr], dpHighlight: null, dpArrows: [], dpFormula: `Answer: "${answer}"` },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n^3)", space: "O(1)", explanation: "Check all O(n^2) substrings, each palindrome check is O(n)" },
    optimal: { time: "O(n^2)", space: "O(1)", explanation: "2n-1 centers, each expands at most O(n)", tradeoff: "Manacher's algorithm achieves O(n) but is complex and rarely expected in interviews" },
  },

  interviewTips: [
    "Mention three approaches: brute O(n^3), DP O(n^2) space O(n^2), expand-around-center O(n^2) space O(1).",
    "Explain why you need both odd and even center checks.",
    "The formula start = i - (len - 1) / 2 is tricky — derive it from the center position.",
    "Mention Manacher's algorithm exists for O(n) but is rarely expected.",
    "Edge case: single character strings are always palindromes.",
  ],

  relatedProblems: ["palindromic-substrings", "longest-common-subsequence", "valid-palindrome"],
};
