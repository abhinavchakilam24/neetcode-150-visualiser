export const palindromicSubstrings = {
  id: 104,
  slug: "palindromic-substrings",
  title: "Palindromic Substrings",
  difficulty: "Medium",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 6,
  artifactType: "DPTable1D",
  companies: ["Meta", "Amazon", "Microsoft", "Google", "Goldman Sachs"],
  leetcodeLink: "https://leetcode.com/problems/palindromic-substrings/",

  pattern: "Expand Around Center (Counting)",
  patternExplanation: `Same expand-around-center technique as Longest Palindromic Substring, but
    instead of tracking the longest, we count every palindrome found during expansion.
    Each expansion step that succeeds adds one more palindromic substring to the count.`,

  intuition: {
    coreInsight: `Every palindrome has a center. For each of the 2n-1 possible centers (n single
      characters for odd-length, n-1 gaps for even-length), we expand outward. Each successful
      expansion finds a new palindromic substring. When expansion stops (mismatch or boundary),
      we move to the next center. The total count across all centers is our answer.`,

    mentalModel: `Imagine each character (and each gap between characters) as the center of a
      potential palindrome. Place your fingers on the center and spread them outward one step at
      a time. Each time the characters under both fingers match, you've found a palindrome —
      add 1 to your count. When they don't match, stop and move to the next center. The key
      insight: every single character is itself a palindrome, so you start with at least n.`,

    whyNaiveFails: `Brute force generates all O(n^2) substrings and checks each for palindrome
      in O(n), giving O(n^3). For n=1000, that's a billion operations. Expand around center
      avoids redundant work: once an expansion fails, we know no larger palindrome exists at
      that center, so we skip directly.`,

    keyObservation: `The count of palindromic substrings equals the sum of expansion radii across
      all centers. At center i, if the palindrome expands k times, that's k palindromic substrings
      from that center (length 1, length 3, length 5, etc. for odd; length 2, length 4, etc. for
      even). Each expansion step = one more palindrome.`,
  },

  problem: `Given a string s, return the number of palindromic substrings in it. A string is a
    palindrome when it reads the same backward as forward. A substring is a contiguous sequence
    of characters within the string.`,

  examples: [
    { input: 's = "abc"', output: "3", explanation: 'Three palindromic substrings: "a", "b", "c".' },
    { input: 's = "aaa"', output: "6", explanation: '"a" x3, "aa" x2, "aaa" x1 = 6 palindromic substrings.' },
  ],

  constraints: [
    "1 <= s.length <= 1000",
    "s consists of lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "Check All Substrings",
      tier: "brute",
      timeComplexity: "O(n^3)",
      spaceComplexity: "O(1)",
      idea: "Generate all substrings, check each if palindrome, count the palindromic ones.",

      javaCode: `public int countSubstrings(String s) {
    int count = 0;
    for (int i = 0; i < s.length(); i++) {
        for (int j = i; j < s.length(); j++) {
            if (isPalindrome(s, i, j)) count++;
        }
    }
    return count;
}

private boolean isPalindrome(String s, int lo, int hi) {
    while (lo < hi) {
        if (s.charAt(lo++) != s.charAt(hi--)) return false;
    }
    return true;
}`,

      cppCode: `int countSubstrings(string s) {
    int count = 0;
    for (int i = 0; i < s.size(); i++) {
        for (int j = i; j < s.size(); j++) {
            bool isPalin = true;
            for (int l = i, r = j; l < r; l++, r--)
                if (s[l] != s[r]) { isPalin = false; break; }
            if (isPalin) count++;
        }
    }
    return count;
}`,

      pythonCode: `def countSubstrings(s: str) -> int:
    count = 0
    for i in range(len(s)):
        for j in range(i, len(s)):
            sub = s[i:j+1]
            if sub == sub[::-1]:
                count += 1
    return count`,

      lineAnnotations: {
        1: "Initialize count to 0",
        3: "Try each starting index",
        4: "Try each ending index",
        5: "If the substring is a palindrome, increment count",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "abc" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2, 3],
              shortLabel: "Check all substrings of 'abc'",
              explanation: 'String "abc" has 6 substrings: "a","ab","abc","b","bc","c". We check each for palindrome.',
              variables: { s: "abc", count: 0 },
              dataStructure: { dpArray: [null, null, null], dpHighlight: null, dpArrows: [], dpFormula: "Check all substrings" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: '"a" ✓, "b" ✓, "c" ✓ = 3',
              explanation: 'Only single characters are palindromes. "ab","bc","abc" are not. Count = 3.',
              variables: { count: 3, palindromes: '"a","b","c"' },
              dataStructure: { dpArray: [1, 1, 1], dpHighlight: null, dpArrows: [], dpFormula: "3 palindromes found" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7],
              shortLabel: "Return 3",
              explanation: "3 palindromic substrings total — each single character.",
              variables: { answer: 3 },
              dataStructure: { dpArray: [1, 1, 1], dpHighlight: null, dpArrows: [], dpFormula: "Answer: 3" },
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
      idea: `For each of the 2n-1 centers (n odd + n-1 even), expand outward counting each
        palindrome found. Each successful expansion = one more palindromic substring.`,

      javaCode: `public int countSubstrings(String s) {
    int count = 0;

    for (int i = 0; i < s.length(); i++) {
        count += expand(s, i, i);
        count += expand(s, i, i + 1);
    }

    return count;
}

private int expand(String s, int left, int right) {
    int count = 0;
    while (left >= 0 && right < s.length()
           && s.charAt(left) == s.charAt(right)) {
        count++;
        left--;
        right++;
    }
    return count;
}`,

      cppCode: `int countSubstrings(string s) {
    int count = 0;

    auto expand = [&](int left, int right) {
        while (left >= 0 && right < s.size()
               && s[left] == s[right]) {
            count++;
            left--;
            right++;
        }
    };

    for (int i = 0; i < s.size(); i++) {
        expand(i, i);
        expand(i, i + 1);
    }

    return count;
}`,

      pythonCode: `def countSubstrings(s: str) -> int:
    count = 0

    def expand(left, right):
        nonlocal count
        while left >= 0 and right < len(s) and s[left] == s[right]:
            count += 1
            left -= 1
            right += 1

    for i in range(len(s)):
        expand(i, i)
        expand(i, i + 1)

    return count`,

      lineAnnotations: {
        2: "Running count of palindromic substrings",
        4: "Try each position as a center",
        5: "Count odd-length palindromes from this center",
        6: "Count even-length palindromes from this center",
        9: "Return total count",
        12: "Expand outward from center",
        13: "Count palindromes found at this center",
        14: "While characters match on both sides",
        16: "Each match = one more palindromic substring",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'String "aaa" — many overlapping palindromes',
          input: { s: "aaa" },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init count = 0",
              explanation: 'Start with count=0. String "aaa" has lots of palindromes since all characters are the same.',
              variables: { s: "aaa", count: 0 },
              dataStructure: {
                dpArray: [null, null, null],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "count = 0",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: 'Center 0 odd: "a" → +1, "aaa" → +1',
              explanation: 'Center at index 0: expand(0,0) — "a" is palindrome (+1). Expand to left=-1 stops but right goes to s[0]="a"==s[0] then s[-1] out of bounds. Actually: s[0]="a" count+1. Expand: left=-1 stops. 1 odd palindrome found. Total count = 1.',
              variables: { i: 0, oddCount: 1, count: 1 },
              dataStructure: {
                dpArray: [1, null, null],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: 'Center 0 odd: "a" (+1)',
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6],
              shortLabel: 'Center 0 even: "aa" → +1',
              explanation: 'expand(0,1): s[0]="a"==s[1]="a" — palindrome "aa" (+1). Expand: left=-1 stops. 1 even palindrome. Total count = 2.',
              variables: { i: 0, evenCount: 1, count: 2 },
              dataStructure: {
                dpArray: [2, null, null],
                dpHighlight: 0,
                dpArrows: [{ from: 0, to: 1 }],
                dpFormula: 'Center 0 even: "aa" (+1). Total: 2',
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5],
              shortLabel: 'Center 1 odd: "a" → +1, "aaa" → +1',
              explanation: 'Center at index 1: expand(1,1) — "a" (+1). Expand: s[0]="a"==s[2]="a" — "aaa" (+1). Expand: left=-1 stops. 2 odd palindromes. Total count = 4.',
              variables: { i: 1, oddCount: 2, count: 4 },
              dataStructure: {
                dpArray: [2, 2, null],
                dpHighlight: 1,
                dpArrows: [{ from: 0, to: 1 }, { from: 1, to: 2 }],
                dpFormula: 'Center 1 odd: "a","aaa" (+2). Total: 4',
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6],
              shortLabel: 'Center 1 even: "aa" → +1',
              explanation: 'expand(1,2): s[1]="a"==s[2]="a" — palindrome "aa" (+1). Expand: right=3 out of bounds. 1 even palindrome. Total count = 5.',
              variables: { i: 1, evenCount: 1, count: 5 },
              dataStructure: {
                dpArray: [2, 3, null],
                dpHighlight: 1,
                dpArrows: [{ from: 1, to: 2 }],
                dpFormula: 'Center 1 even: "aa" (+1). Total: 5',
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5],
              shortLabel: 'Center 2 odd: "a" → +1',
              explanation: 'Center at index 2: expand(2,2) — "a" (+1). Expand: right=3 out of bounds. 1 odd palindrome. Total count = 6.',
              variables: { i: 2, oddCount: 1, count: 6 },
              dataStructure: {
                dpArray: [2, 3, 1],
                dpHighlight: 2,
                dpArrows: [],
                dpFormula: 'Center 2 odd: "a" (+1). Total: 6',
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6],
              shortLabel: "Center 2 even: 0 (out of bounds)",
              explanation: "expand(2,3): right=3 is out of bounds. No even palindromes from center 2. Count stays 6.",
              variables: { i: 2, evenCount: 0, count: 6 },
              dataStructure: {
                dpArray: [2, 3, 1],
                dpHighlight: 2,
                dpArrows: [],
                dpFormula: "Center 2 even: 0. Total: 6",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [9],
              shortLabel: "Return 6",
              explanation: 'Total: 6 palindromic substrings. "a" appears 3 times as a single-char palindrome, "aa" appears twice (positions 0-1 and 1-2), and "aaa" appears once.',
              variables: { answer: 6 },
              dataStructure: {
                dpArray: [2, 3, 1],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Answer: 6",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Multi-Char Palindromes",
          description: 'String "abc" — only single characters are palindromes',
          input: { s: "abc" },
          expectedOutput: "3",
          commonMistake: "Returning 0 by not counting single characters as palindromes.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init count = 0",
              explanation: 'String "abc" has all distinct characters. Only single chars will be palindromes.',
              variables: { s: "abc", count: 0 },
              dataStructure: { dpArray: [null, null, null], dpHighlight: null, dpArrows: [], dpFormula: "count = 0" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Center 0: "a" odd +1, even 0',
              explanation: 'Center 0: "a" is palindrome (+1). Even: s[0]="a" vs s[1]="b" mismatch. count = 1.',
              variables: { i: 0, count: 1 },
              dataStructure: { dpArray: [1, null, null], dpHighlight: 0, dpArrows: [], dpFormula: '"a" (+1). Total: 1' },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Center 1: "b" odd +1, even 0',
              explanation: 'Center 1: "b" (+1). Even: s[1]="b" vs s[2]="c" mismatch. count = 2.',
              variables: { i: 1, count: 2 },
              dataStructure: { dpArray: [1, 1, null], dpHighlight: 1, dpArrows: [], dpFormula: '"b" (+1). Total: 2' },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Center 2: "c" odd +1',
              explanation: 'Center 2: "c" (+1). No even expansion possible. count = 3.',
              variables: { i: 2, count: 3 },
              dataStructure: { dpArray: [1, 1, 1], dpHighlight: 2, dpArrows: [], dpFormula: '"c" (+1). Total: 3' },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9],
              shortLabel: "Return 3",
              explanation: "3 palindromic substrings — one per character. No multi-character palindromes exist.",
              variables: { answer: 3 },
              dataStructure: { dpArray: [1, 1, 1], dpHighlight: null, dpArrows: [], dpFormula: "Answer: 3" },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const steps = [];
        let count = 0;
        const n = s.length;
        const dpArr = new Array(n).fill(null);
        const centerCounts = new Array(n).fill(0);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init count = 0",
          explanation: `Start counting palindromic substrings in "${s}".`,
          variables: { s, count: 0 },
          dataStructure: { dpArray: [...dpArr], dpHighlight: null, dpArrows: [], dpFormula: "count = 0" },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          // Odd expansion
          let oddCount = 0;
          let left = i, right = i;
          while (left >= 0 && right < n && s[left] === s[right]) {
            oddCount++;
            left--;
            right++;
          }
          count += oddCount;
          centerCounts[i] += oddCount;

          // Even expansion
          let evenCount = 0;
          left = i;
          right = i + 1;
          while (left >= 0 && right < n && s[left] === s[right]) {
            evenCount++;
            left--;
            right++;
          }
          count += evenCount;
          centerCounts[i] += evenCount;
          dpArr[i] = centerCounts[i];

          const arrows = [];
          if (oddCount > 1) arrows.push({ from: i - (oddCount - 1), to: i + (oddCount - 1) });
          if (evenCount > 0) arrows.push({ from: i, to: i + 1 });

          steps.push({
            stepId: steps.length, lineNumbers: [4, 5, 6],
            shortLabel: `Center ${i}: odd +${oddCount}, even +${evenCount}`,
            explanation: `Center ${i} ("${s[i]}"): ${oddCount} odd palindrome(s), ${evenCount} even palindrome(s). Running count = ${count}.`,
            variables: { i, center: s[i], oddCount, evenCount, count },
            dataStructure: { dpArray: [...dpArr], dpHighlight: i, dpArrows: arrows, dpFormula: `Center ${i}: +${oddCount + evenCount}. Total: ${count}` },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: `Return ${count}`,
          explanation: `Total: ${count} palindromic substrings.`,
          variables: { answer: count },
          dataStructure: { dpArray: [...dpArr], dpHighlight: null, dpArrows: [], dpFormula: `Answer: ${count}` },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n^3)", space: "O(1)", explanation: "O(n^2) substrings, each checked in O(n)" },
    optimal: { time: "O(n^2)", space: "O(1)", explanation: "2n-1 centers, each expands at most O(n)", tradeoff: "Manacher's algorithm achieves O(n) but is complex" },
  },

  interviewTips: [
    "This is a counting variant of Longest Palindromic Substring — mention the connection.",
    "Each successful expansion step = one palindrome. Don't count length, count expansions.",
    "Clarify: single characters are palindromes, so minimum answer = n.",
    "Mention that the DP approach uses O(n^2) space; expand-around-center uses O(1).",
    "For follow-up: Manacher's algorithm counts all palindromes in O(n).",
  ],

  relatedProblems: ["longest-palindromic-substring", "valid-palindrome", "palindrome-partitioning"],
};
