export const validPalindrome = {
  id: 10,
  slug: "valid-palindrome",
  title: "Valid Palindrome",
  difficulty: "Easy",
  topic: "two-pointers",
  topicLabel: "Two Pointers",
  neetcodeNumber: 10,
  artifactType: "TwoPointer",
  companies: ["Meta", "Microsoft", "Amazon"],
  leetcodeLink: "https://leetcode.com/problems/valid-palindrome/",

  pattern: "Two Pointers from Both Ends",
  patternExplanation: "Compare characters from both ends, skipping non-alphanumeric, converging toward the center.",

  intuition: {
    coreInsight: "A palindrome reads the same forwards and backwards. Use two pointers from each end, skip non-alphanumeric characters, and compare.",
    mentalModel: "Imagine two people reading the same word — one from the front, one from the back. If they always agree on the current letter, it's a palindrome.",
    whyNaiveFails: "Reversing the string and comparing works but uses O(n) extra space. Two pointers solve it in O(1) space.",
    keyObservation: "Skip non-alphanumeric characters and compare case-insensitively. The pointers converge — if they ever disagree, it's not a palindrome.",
  },

  problem: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.",

  examples: [
    { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
    { input: 's = "race a car"', output: "false", explanation: '"raceacar" is not a palindrome.' },
    { input: 's = " "', output: "true", explanation: "After removing non-alphanumeric, s is empty. Empty string is a palindrome." },
  ],

  constraints: [
    "1 <= s.length <= 2 * 10^5",
    "s consists only of printable ASCII characters.",
  ],

  approaches: {
    brute: {
      label: "Clean + Reverse",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "Filter non-alphanumeric, lowercase, reverse, compare.",

      javaCode: `public boolean isPalindrome(String s) {
    String cleaned = s.replaceAll("[^a-zA-Z0-9]", "")
                      .toLowerCase();
    String reversed = new StringBuilder(cleaned)
                      .reverse().toString();
    return cleaned.equals(reversed);
}`,
      cppCode: `bool isPalindrome(string s) {
    string cleaned;
    for (char c : s)
        if (isalnum(c)) cleaned += tolower(c);
    string rev = cleaned;
    reverse(rev.begin(), rev.end());
    return cleaned == rev;
}`,
      pythonCode: `def isPalindrome(s: str) -> bool:
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]`,

      lineAnnotations: {
        2: "Remove non-alphanumeric and lowercase",
        4: "Reverse the cleaned string",
        6: "Compare original cleaned vs reversed",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "racecar" },
          expectedOutput: "true",
          steps: [
            { stepId: 0, lineNumbers: [2], shortLabel: "Clean string", explanation: "Remove non-alphanumeric, lowercase: 'racecar'.", variables: { cleaned: "racecar" }, dataStructure: { arrayStates: {}, pointers: [] }, delta: {}, isAnswer: false },
            { stepId: 1, lineNumbers: [4], shortLabel: "Reverse", explanation: "Reversed: 'racecar'. Same as original!", variables: { cleaned: "racecar", reversed: "racecar" }, dataStructure: { arrayStates: {}, pointers: [] }, delta: {}, isAnswer: false },
            { stepId: 2, lineNumbers: [6], shortLabel: "Equal → true", explanation: "'racecar' == 'racecar' → true. It's a palindrome.", variables: { answer: "true" }, dataStructure: { arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "found" }, pointers: [] }, delta: {}, isAnswer: true },
          ],
        },
      },

      computeSteps: function({ s }) {
        const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const chars = cleaned.split('');
        const reversed = [...chars].reverse().join('');
        const isPalin = cleaned === reversed;
        const states = Object.fromEntries(chars.map((_, i) => [i, isPalin ? "found" : "eliminated"]));
        return [
          { stepId: 0, lineNumbers: [2], shortLabel: "Clean", explanation: `Cleaned: "${cleaned}"`, variables: { cleaned }, dataStructure: { arrayStates: Object.fromEntries(chars.map((_, i) => [i, "default"])), pointers: [] }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [4], shortLabel: "Reverse", explanation: `Reversed: "${reversed}"`, variables: { cleaned, reversed }, dataStructure: { arrayStates: Object.fromEntries(chars.map((_, i) => [i, "default"])), pointers: [] }, delta: {}, isAnswer: false },
          { stepId: 2, lineNumbers: [6], shortLabel: isPalin ? "Equal → true" : "Not equal → false", explanation: `"${cleaned}" ${isPalin ? '==' : '!='} "${reversed}" → ${isPalin}`, variables: { answer: String(isPalin) }, dataStructure: { arrayStates: states, pointers: [] }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "Two Pointers",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "Two pointers from both ends, skip non-alphanumeric, compare case-insensitively.",

      javaCode: `public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;

    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left)))
            left++;
        while (left < right && !Character.isLetterOrDigit(s.charAt(right)))
            right--;

        if (Character.toLowerCase(s.charAt(left)) !=
            Character.toLowerCase(s.charAt(right)))
            return false;

        left++;
        right--;
    }
    return true;
}`,
      cppCode: `bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;

    while (left < right) {
        while (left < right && !isalnum(s[left]))
            left++;
        while (left < right && !isalnum(s[right]))
            right--;

        if (tolower(s[left]) != tolower(s[right]))
            return false;

        left++;
        right--;
    }
    return true;
}`,
      pythonCode: `def isPalindrome(s: str) -> bool:
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1
    return True`,

      lineAnnotations: {
        2:  "Initialize pointers at both ends",
        4:  "Move inward while pointers haven't crossed",
        5:  "Skip non-alphanumeric from left",
        7:  "Skip non-alphanumeric from right",
        10: "Compare characters (case-insensitive)",
        12: "Mismatch → not a palindrome",
        14: "Match — move both pointers inward",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Palindrome",
          description: "A clean palindrome string",
          input: { s: "racecar", chars: ["r","a","c","e","c","a","r"] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Init pointers",
              explanation: "left=0 ('r'), right=6 ('r'). We'll compare from both ends moving inward.",
              variables: { left: 0, right: 6, "s[L]": "r", "s[R]": "r" },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "pointer" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 6, color: "pointer" }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10, 14], shortLabel: "r == r ✓",
              explanation: "'r' == 'r' → match! Move left to 1, right to 5.",
              variables: { left: 0, right: 6, "s[L]": "r", "s[R]": "r", match: "✓" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "found" },
                pointers: [{ name: "L", index: 0, color: "found" }, { name: "R", index: 6, color: "found" }],
              },
              delta: { changedIndices: [0, 6] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [10, 14], shortLabel: "a == a ✓",
              explanation: "left=1 ('a'), right=5 ('a') → match! Move to 2, 4.",
              variables: { left: 1, right: 5, "s[L]": "a", "s[R]": "a", match: "✓" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default", 4: "default", 5: "found", 6: "found" },
                pointers: [{ name: "L", index: 1, color: "found" }, { name: "R", index: 5, color: "found" }],
              },
              delta: { changedIndices: [1, 5] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [10, 14], shortLabel: "c == c ✓",
              explanation: "left=2 ('c'), right=4 ('c') → match! Move to 3, 3.",
              variables: { left: 2, right: 4, "s[L]": "c", "s[R]": "c", match: "✓" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "default", 4: "found", 5: "found", 6: "found" },
                pointers: [{ name: "L", index: 2, color: "found" }, { name: "R", index: 4, color: "found" }],
              },
              delta: { changedIndices: [2, 4] }, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [17], shortLabel: "Pointers crossed → true",
              explanation: "left=3, right=3. left is no longer < right. All pairs matched. It's a palindrome!",
              variables: { left: 3, right: 3, answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "found" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Not Palindrome",
          description: "Fails on first comparison",
          input: { s: "hello", chars: ["h","e","l","l","o"] },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Init pointers",
              explanation: "left=0 ('h'), right=4 ('o').",
              variables: { left: 0, right: 4, "s[L]": "h", "s[R]": "o" },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "default", 4: "pointer" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 4, color: "pointer" }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10, 12], shortLabel: "h != o → false",
              explanation: "'h' != 'o' → mismatch on first comparison. Not a palindrome.",
              variables: { left: 0, right: 4, "s[L]": "h", "s[R]": "o", answer: "false" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "default", 2: "default", 3: "default", 4: "eliminated" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [0, 4] }, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const chars = cleaned.split('');
        const n = chars.length;
        const steps = [];
        const states = Object.fromEntries(chars.map((_, i) => [i, "default"]));

        let left = 0, right = n - 1;

        steps.push({
          stepId: 0, lineNumbers: [2], shortLabel: "Init pointers",
          explanation: `left=0 ('${chars[0]}'), right=${right} ('${chars[right]}').`,
          variables: { left, right, "s[L]": chars[left], "s[R]": chars[right] },
          dataStructure: {
            arrayStates: { ...states, [left]: "pointer", [right]: "pointer" },
            pointers: [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "pointer" }],
          },
          delta: {}, isAnswer: false,
        });

        while (left < right) {
          const cl = chars[left], cr = chars[right];
          if (cl !== cr) {
            steps.push({
              stepId: steps.length, lineNumbers: [10, 12],
              shortLabel: `${cl} != ${cr} → false`,
              explanation: `'${cl}' != '${cr}' → not a palindrome.`,
              variables: { left, right, "s[L]": cl, "s[R]": cr, answer: "false" },
              dataStructure: {
                arrayStates: { ...states, [left]: "eliminated", [right]: "eliminated" },
                pointers: [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "pointer" }],
              },
              delta: { changedIndices: [left, right] }, isAnswer: true,
            });
            return steps;
          }

          states[left] = "found";
          states[right] = "found";
          steps.push({
            stepId: steps.length, lineNumbers: [10, 14],
            shortLabel: `${cl} == ${cr} ✓`,
            explanation: `'${cl}' == '${cr}' → match! Move inward.`,
            variables: { left, right, "s[L]": cl, "s[R]": cr, match: "✓" },
            dataStructure: {
              arrayStates: { ...states },
              pointers: [{ name: "L", index: left, color: "found" }, { name: "R", index: right, color: "found" }],
            },
            delta: { changedIndices: [left, right] }, isAnswer: false,
          });
          left++;
          right--;
        }

        if (left === right) states[left] = "found";
        steps.push({
          stepId: steps.length, lineNumbers: [17],
          shortLabel: "Pointers crossed → true",
          explanation: "All pairs matched. It's a palindrome!",
          variables: { answer: "true" },
          dataStructure: { arrayStates: { ...states }, pointers: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(n)", explanation: "Create cleaned + reversed strings" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Two pointers, no extra space" },
  },

  interviewTips: [
    "Clarify: does the input contain only lowercase? Or mixed case + special chars?",
    "Mention the O(1) space advantage of two pointers over reverse approach.",
    "Handle edge case: empty or single character strings are palindromes.",
  ],
};
