export const longestRepeatingReplacement = {
  id: 17,
  slug: "longest-repeating-replacement",
  title: "Longest Repeating Character Replacement",
  difficulty: "Medium",
  topic: "sliding-window",
  topicLabel: "Sliding Window",
  neetcodeNumber: 17,
  artifactType: "SlidingWindow",
  companies: ["Google", "Amazon", "Microsoft", "Meta", "Adobe"],
  leetcodeLink: "https://leetcode.com/problems/longest-repeating-character-replacement/",

  pattern: "Sliding Window with Frequency Count",
  patternExplanation: `Maintain a sliding window where the number of characters that need
    to be replaced (window length minus the count of the most frequent character) never
    exceeds k. Expand the right boundary greedily, shrink the left when the constraint breaks.`,

  intuition: {
    coreInsight: `In any valid window of length L, we keep the most frequent character and
      replace the rest. The number of replacements needed is L - maxFreq. If that exceeds k,
      the window is too large. So the question becomes: what is the largest window where
      (windowLen - maxFreq) <= k? We slide a window from left to right, tracking character
      frequencies and the maximum frequency seen so far.`,

    mentalModel: `Imagine painting a fence. You have k buckets of paint to repaint mismatched
      planks. You slide a frame along the fence trying to find the longest section where,
      if you pick the most common color within the frame, the remaining planks (needing
      repaint) are at most k. If too many planks need repainting, slide the left edge of
      the frame forward to shrink it. The frame is your sliding window, and maxFreq tells
      you the dominant color count.`,

    whyNaiveFails: `Brute force checks every substring — O(n^2) substrings, each needing
      O(26) to count frequencies. That is O(26 * n^2) which is effectively O(n^2). For
      n = 100,000 that is 10 billion operations. The sliding window reduces this to O(n)
      by never re-scanning characters — each character is added once and removed at most once.`,

    keyObservation: `We do NOT need to decrement maxFreq when shrinking the window. The answer
      can only improve when maxFreq increases. If maxFreq stays the same or decreases, the
      window cannot grow beyond its current best. So we use a "lazy" maxFreq that only ever
      goes up. This avoids rescanning all 26 counts on every shrink and keeps the solution
      truly O(n).`,
  },

  problem: `You are given a string s and an integer k. You can choose any character of the
    string and change it to any other uppercase English letter. You can perform this operation
    at most k times. Return the length of the longest substring containing the same letter
    you can get after performing the above operations.`,

  examples: [
    { input: 's = "ABAB", k = 2', output: "4", explanation: "Replace the two A's with B's (or vice versa) to get 'BBBB' or 'AAAA'. Length = 4." },
    { input: 's = "AABABBA", k = 1', output: "4", explanation: "Replace the B at index 3 to get 'AAAAABA'. The longest repeating substring is 'AAAA' with length 4." },
  ],

  constraints: [
    "1 <= s.length <= 10^5",
    "s consists of only uppercase English letters.",
    "0 <= k <= s.length",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(26 * n²)",
      spaceComplexity: "O(1)",
      idea: "Try every substring. For each, count the most frequent character and check if the rest can be replaced within k operations.",

      javaCode: `public int characterReplacement(String s, int k) {
    int maxLen = 0;
    for (int i = 0; i < s.length(); i++) {
        int[] count = new int[26];
        int maxFreq = 0;
        for (int j = i; j < s.length(); j++) {
            count[s.charAt(j) - 'A']++;
            maxFreq = Math.max(maxFreq, count[s.charAt(j) - 'A']);
            int replacements = (j - i + 1) - maxFreq;
            if (replacements <= k) {
                maxLen = Math.max(maxLen, j - i + 1);
            } else {
                break;
            }
        }
    }
    return maxLen;
}`,

      cppCode: `int characterReplacement(string s, int k) {
    int maxLen = 0;
    for (int i = 0; i < s.size(); i++) {
        int count[26] = {0};
        int maxFreq = 0;
        for (int j = i; j < s.size(); j++) {
            count[s[j] - 'A']++;
            maxFreq = max(maxFreq, count[s[j] - 'A']);
            int replacements = (j - i + 1) - maxFreq;
            if (replacements <= k) {
                maxLen = max(maxLen, j - i + 1);
            } else {
                break;
            }
        }
    }
    return maxLen;
}`,

      pythonCode: `def characterReplacement(s: str, k: int) -> int:
    max_len = 0
    for i in range(len(s)):
        count = [0] * 26
        max_freq = 0
        for j in range(i, len(s)):
            count[ord(s[j]) - ord('A')] += 1
            max_freq = max(max_freq, count[ord(s[j]) - ord('A')])
            replacements = (j - i + 1) - max_freq
            if replacements <= k:
                max_len = max(max_len, j - i + 1)
            else:
                break
    return max_len`,

      lineAnnotations: {
        2: "Try every starting index",
        3: "Frequency count for this window",
        5: "Expand the window rightward",
        6: "Update frequency of current character",
        7: "Track the max frequency in this window",
        8: "Replacements needed = window size - max frequency",
        9: "If within budget, update the best answer",
        11: "Too many replacements — no point expanding further",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "ABAB", k: 2 },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "i=0, start scanning",
              explanation: "Start with i=0. We'll expand j rightward from index 0 and track the most frequent character in each substring.",
              variables: { i: 0, maxLen: 0, k: 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                windowLeft: 0,
                windowRight: 0,
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "i=0,j=3: ABAB, maxFreq=2, repl=2 <= k",
              explanation: "Expanding from i=0 to j=3 covers 'ABAB'. A appears 2 times, B appears 2 times, maxFreq=2. Replacements = 4 - 2 = 2 <= k=2. Valid! maxLen = 4.",
              variables: { i: 0, j: 3, maxFreq: 2, replacements: 2, maxLen: 4, k: 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "active" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 3, color: "active" }],
                windowLeft: 0,
                windowRight: 3,
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [14],
              shortLabel: "Return 4",
              explanation: "All starting positions explored. The longest valid substring is the entire string 'ABAB' with length 4. We can replace both A's or both B's.",
              variables: { maxLen: 4 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
                windowLeft: 0,
                windowRight: 3,
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, k }) {
        const steps = [];
        const chars = s.split("");
        const n = chars.length;
        let maxLen = 0;

        for (let i = 0; i < n; i++) {
          const count = new Array(26).fill(0);
          let maxFreq = 0;

          steps.push({
            stepId: steps.length,
            lineNumbers: [2],
            shortLabel: `i=${i}`,
            explanation: `Start new substring at index ${i} (char='${chars[i]}'). Reset frequency counts.`,
            variables: { i, maxLen, k },
            dataStructure: {
              arrayStates: Object.fromEntries(chars.map((_, idx) => [idx, idx === i ? "active" : idx < i ? "visited" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              windowLeft: i,
              windowRight: i,
            },
            delta: { changedIndices: [i] },
            isAnswer: false,
          });

          for (let j = i; j < n; j++) {
            count[chars[j].charCodeAt(0) - 65]++;
            maxFreq = Math.max(maxFreq, count[chars[j].charCodeAt(0) - 65]);
            const windowLen = j - i + 1;
            const replacements = windowLen - maxFreq;

            if (replacements <= k) {
              maxLen = Math.max(maxLen, windowLen);
              steps.push({
                stepId: steps.length,
                lineNumbers: [5, 6, 7, 8, 9],
                shortLabel: `j=${j}: repl=${replacements} <= ${k}, len=${windowLen}`,
                explanation: `Window [${i}..${j}] = '${s.substring(i, j + 1)}'. maxFreq=${maxFreq}, replacements=${replacements} <= k=${k}. Valid! maxLen=${maxLen}.`,
                variables: { i, j, maxFreq, replacements, windowLen, maxLen, k },
                dataStructure: {
                  arrayStates: Object.fromEntries(chars.map((_, idx) => [idx, idx >= i && idx <= j ? "active" : idx < i ? "visited" : "default"])),
                  pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
                  windowLeft: i,
                  windowRight: j,
                },
                delta: { changedIndices: [j] },
                isAnswer: false,
              });
            } else {
              steps.push({
                stepId: steps.length,
                lineNumbers: [8, 11],
                shortLabel: `j=${j}: repl=${replacements} > ${k}, break`,
                explanation: `Window [${i}..${j}] = '${s.substring(i, j + 1)}'. replacements=${replacements} > k=${k}. Too many replacements, break inner loop.`,
                variables: { i, j, maxFreq, replacements, windowLen, maxLen, k },
                dataStructure: {
                  arrayStates: Object.fromEntries(chars.map((_, idx) => [idx, idx >= i && idx <= j ? "eliminated" : idx < i ? "visited" : "default"])),
                  pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
                  windowLeft: i,
                  windowRight: j,
                },
                delta: { changedIndices: [j] },
                isAnswer: false,
              });
              break;
            }
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [14],
          shortLabel: `Return ${maxLen}`,
          explanation: `All substrings checked. The longest valid substring has length ${maxLen}.`,
          variables: { maxLen },
          dataStructure: {
            arrayStates: Object.fromEntries(chars.map((_, idx) => [idx, "found"])),
            pointers: [],
            windowLeft: 0,
            windowRight: n - 1,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sliding Window",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Maintain a window [left, right]. Track character frequencies and maxFreq (the
        highest frequency of any single character in the window). If windowLen - maxFreq > k,
        shrink from left. The key insight: maxFreq never needs to decrease — the answer only
        improves when maxFreq increases.`,

      javaCode: `public int characterReplacement(String s, int k) {
    int[] count = new int[26];
    int left = 0, maxFreq = 0, maxLen = 0;

    for (int right = 0; right < s.length(); right++) {
        count[s.charAt(right) - 'A']++;
        maxFreq = Math.max(maxFreq, count[s.charAt(right) - 'A']);

        while ((right - left + 1) - maxFreq > k) {
            count[s.charAt(left) - 'A']--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}`,

      cppCode: `int characterReplacement(string s, int k) {
    int count[26] = {0};
    int left = 0, maxFreq = 0, maxLen = 0;

    for (int right = 0; right < s.size(); right++) {
        count[s[right] - 'A']++;
        maxFreq = max(maxFreq, count[s[right] - 'A']);

        while ((right - left + 1) - maxFreq > k) {
            count[s[left] - 'A']--;
            left++;
        }

        maxLen = max(maxLen, right - left + 1);
    }

    return maxLen;
}`,

      pythonCode: `def characterReplacement(s: str, k: int) -> int:
    count = [0] * 26
    left = 0
    max_freq = 0
    max_len = 0

    for right in range(len(s)):
        count[ord(s[right]) - ord('A')] += 1
        max_freq = max(max_freq, count[ord(s[right]) - ord('A')])

        while (right - left + 1) - max_freq > k:
            count[ord(s[left]) - ord('A')] -= 1
            left += 1

        max_len = max(max_len, right - left + 1)

    return max_len`,

      lineAnnotations: {
        2: "Frequency array for 26 uppercase letters",
        3: "left pointer, max frequency in window, best answer",
        5: "Expand window by moving right pointer",
        6: "Increment frequency of the new character",
        7: "Update maxFreq — the dominant character count",
        9: "If replacements needed exceed k, window is invalid",
        10: "Decrement frequency of character leaving the window",
        11: "Shrink window from left",
        14: "Update best answer with current valid window size",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with alternating characters",
          input: { s: "AABABBA", k: 1 },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Initialize",
              explanation: "Create a frequency array of size 26 (all zeros). Set left=0, maxFreq=0, maxLen=0. We'll slide a window across the string 'AABABBA' with k=1 replacement allowed.",
              variables: { left: 0, right: "-", maxFreq: 0, maxLen: 0, k: 1, counts: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [],
                windowLeft: 0,
                windowRight: -1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "right=0: 'A', maxFreq=1",
              explanation: "Expand to right=0. Character is 'A'. count[A]=1. maxFreq = max(0, 1) = 1. Window = 'A', length=1.",
              variables: { left: 0, right: 0, maxFreq: 1, windowLen: 1, replacements: 0, maxLen: 0, k: 1, counts: "{A:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 0, color: "active" }],
                windowLeft: 0,
                windowRight: 0,
              },
              delta: { changedIndices: [0], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 14],
              shortLabel: "valid: 1-1=0 <= 1, maxLen=1",
              explanation: "Replacements = windowLen - maxFreq = 1 - 1 = 0 <= k=1. Window is valid. maxLen = max(0, 1) = 1.",
              variables: { left: 0, right: 0, maxFreq: 1, windowLen: 1, replacements: 0, maxLen: 1, k: 1 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 0, color: "active" }],
                windowLeft: 0,
                windowRight: 0,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "right=1: 'A', maxFreq=2",
              explanation: "Expand to right=1. Character is 'A'. count[A]=2. maxFreq = max(1, 2) = 2. Window = 'AA', length=2.",
              variables: { left: 0, right: 1, maxFreq: 2, windowLen: 2, replacements: 0, maxLen: 1, k: 1, counts: "{A:2}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: { changedIndices: [1], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 14],
              shortLabel: "valid: 2-2=0 <= 1, maxLen=2",
              explanation: "Replacements = 2 - 2 = 0 <= 1. Both characters are 'A', no replacements needed. maxLen = 2.",
              variables: { left: 0, right: 1, maxFreq: 2, windowLen: 2, replacements: 0, maxLen: 2, k: 1 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7],
              shortLabel: "right=2: 'B', maxFreq=2",
              explanation: "Expand to right=2. Character is 'B'. count[B]=1. maxFreq = max(2, 1) = 2 (A is still dominant). Window = 'AAB', length=3.",
              variables: { left: 0, right: 2, maxFreq: 2, windowLen: 3, replacements: 1, maxLen: 2, k: 1, counts: "{A:2,B:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 2, color: "active" }],
                windowLeft: 0,
                windowRight: 2,
              },
              delta: { changedIndices: [2], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9, 14],
              shortLabel: "valid: 3-2=1 <= 1, maxLen=3",
              explanation: "Replacements = 3 - 2 = 1 <= k=1. We can replace the one 'B' with 'A' to get 'AAA'. maxLen = 3.",
              variables: { left: 0, right: 2, maxFreq: 2, windowLen: 3, replacements: 1, maxLen: 3, k: 1 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 2, color: "active" }],
                windowLeft: 0,
                windowRight: 2,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 6, 7],
              shortLabel: "right=3: 'B', maxFreq=2",
              explanation: "Expand to right=3. Character is 'B'. count[B]=2. maxFreq = max(2, 2) = 2. Window = 'AABB', length=4.",
              variables: { left: 0, right: 3, maxFreq: 2, windowLen: 4, replacements: 2, maxLen: 3, k: 1, counts: "{A:2,B:2}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 3, color: "active" }],
                windowLeft: 0,
                windowRight: 3,
              },
              delta: { changedIndices: [3], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [9, 10, 11],
              shortLabel: "invalid: 4-2=2 > 1, shrink left",
              explanation: "Replacements = 4 - 2 = 2 > k=1. Window is invalid! We need to shrink. Decrement count[A] (count[A]=1), move left from 0 to 1. Now window = 'ABB', length=3, replacements = 3 - 2 = 1 <= 1. Valid again.",
              variables: { left: 1, right: 3, maxFreq: 2, windowLen: 3, replacements: 1, maxLen: 3, k: 1, counts: "{A:1,B:2}" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "active", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 1, color: "pointer" }, { name: "right", index: 3, color: "active" }],
                windowLeft: 1,
                windowRight: 3,
              },
              delta: { changedIndices: [0], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [14],
              shortLabel: "valid: 3-2=1 <= 1, maxLen=3",
              explanation: "After shrinking, window [1..3] = 'ABB', length=3. Replacements = 3 - 2 = 1 <= 1. maxLen stays 3.",
              variables: { left: 1, right: 3, maxFreq: 2, windowLen: 3, replacements: 1, maxLen: 3, k: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "active", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 1, color: "pointer" }, { name: "right", index: 3, color: "active" }],
                windowLeft: 1,
                windowRight: 3,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [5, 6, 7],
              shortLabel: "right=4: 'B', maxFreq=3",
              explanation: "Expand to right=4. Character is 'B'. count[B]=3. maxFreq = max(2, 3) = 3. Window = 'ABBB', length=4.",
              variables: { left: 1, right: 4, maxFreq: 3, windowLen: 4, replacements: 1, maxLen: 3, k: 1, counts: "{A:1,B:3}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "active", 3: "active", 4: "active", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 1, color: "pointer" }, { name: "right", index: 4, color: "active" }],
                windowLeft: 1,
                windowRight: 4,
              },
              delta: { changedIndices: [4], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [9, 14],
              shortLabel: "valid: 4-3=1 <= 1, maxLen=4",
              explanation: "Replacements = 4 - 3 = 1 <= k=1. We can replace the one 'A' with 'B' to get 'BBBB'. maxLen = max(3, 4) = 4!",
              variables: { left: 1, right: 4, maxFreq: 3, windowLen: 4, replacements: 1, maxLen: 4, k: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "found", 3: "found", 4: "found", 5: "default", 6: "default" },
                pointers: [{ name: "left", index: 1, color: "pointer" }, { name: "right", index: 4, color: "active" }],
                windowLeft: 1,
                windowRight: 4,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [5, 6, 7],
              shortLabel: "right=5: 'B', maxFreq=4",
              explanation: "Expand to right=5. Character is 'B'. count[B]=4. maxFreq = 4. Window = 'ABBBB', length=5 but only 1 A, replacements = 5-4 = 1 <= 1.",
              variables: { left: 1, right: 5, maxFreq: 4, windowLen: 5, replacements: 1, maxLen: 4, k: 1, counts: "{A:1,B:4}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "default" },
                pointers: [{ name: "left", index: 1, color: "pointer" }, { name: "right", index: 5, color: "active" }],
                windowLeft: 1,
                windowRight: 5,
              },
              delta: { changedIndices: [5], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 13,
              lineNumbers: [9, 14],
              shortLabel: "valid: 5-4=1 <= 1, maxLen=5",
              explanation: "Replacements = 5 - 4 = 1 <= 1. Window [1..5] = 'ABBBB' has 4 B's and 1 A — replace the A. maxLen = 5!",
              variables: { left: 1, right: 5, maxFreq: 4, windowLen: 5, replacements: 1, maxLen: 5, k: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "default" },
                pointers: [{ name: "left", index: 1, color: "pointer" }, { name: "right", index: 5, color: "active" }],
                windowLeft: 1,
                windowRight: 5,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 14,
              lineNumbers: [5, 6, 7],
              shortLabel: "right=6: 'A', maxFreq=4",
              explanation: "Expand to right=6. Character is 'A'. count[A]=2. maxFreq = max(4, 2) = 4 (B still dominant). Window = 'ABBBBA', length=6.",
              variables: { left: 1, right: 6, maxFreq: 4, windowLen: 6, replacements: 2, maxLen: 5, k: 1, counts: "{A:2,B:4}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active" },
                pointers: [{ name: "left", index: 1, color: "pointer" }, { name: "right", index: 6, color: "active" }],
                windowLeft: 1,
                windowRight: 6,
              },
              delta: { changedIndices: [6], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 15,
              lineNumbers: [9, 10, 11],
              shortLabel: "invalid: 6-4=2 > 1, shrink left",
              explanation: "Replacements = 6 - 4 = 2 > k=1. Shrink: decrement count[s[1]]='A' (count[A]=1), left moves to 2. Window = 'BBBBA', length=5, replacements = 5 - 4 = 1 <= 1. Valid.",
              variables: { left: 2, right: 6, maxFreq: 4, windowLen: 5, replacements: 1, maxLen: 5, k: 1, counts: "{A:1,B:4}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "eliminated", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active" },
                pointers: [{ name: "left", index: 2, color: "pointer" }, { name: "right", index: 6, color: "active" }],
                windowLeft: 2,
                windowRight: 6,
              },
              delta: { changedIndices: [1], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 16,
              lineNumbers: [14],
              shortLabel: "valid: 5-4=1 <= 1, maxLen=5",
              explanation: "Window [2..6] = 'BBBBA', length=5, replacements=1. maxLen stays 5.",
              variables: { left: 2, right: 6, maxFreq: 4, windowLen: 5, replacements: 1, maxLen: 5, k: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active" },
                pointers: [{ name: "left", index: 2, color: "pointer" }, { name: "right", index: 6, color: "active" }],
                windowLeft: 2,
                windowRight: 6,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 17,
              lineNumbers: [17],
              shortLabel: "Return 5",
              explanation: "Right pointer has scanned the entire string. The longest valid window had length 5: 'ABBBB' (indices 1-5) or 'BBBBA' (indices 2-6), both needing only 1 replacement. Return 5.",
              variables: { maxLen: 5 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "found" },
                pointers: [],
                windowLeft: 1,
                windowRight: 5,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Same Characters",
          description: "String is already all the same character — no replacements needed",
          input: { s: "AAAA", k: 2 },
          expectedOutput: "4",
          commonMistake: "Some solutions overcomplicate the case where no replacements are needed. The window should simply expand to cover the entire string without ever shrinking.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Initialize",
              explanation: "Create frequency array, set left=0, maxFreq=0, maxLen=0. String is 'AAAA' with k=2.",
              variables: { left: 0, right: "-", maxFreq: 0, maxLen: 0, k: 2, counts: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                windowLeft: 0,
                windowRight: -1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 14],
              shortLabel: "right=0: 'A', maxFreq=1, maxLen=1",
              explanation: "Include 'A' at index 0. count[A]=1, maxFreq=1. Window='A', length=1, replacements=0. maxLen=1.",
              variables: { left: 0, right: 0, maxFreq: 1, windowLen: 1, replacements: 0, maxLen: 1, k: 2, counts: "{A:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 0, color: "active" }],
                windowLeft: 0,
                windowRight: 0,
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 14],
              shortLabel: "right=1: 'A', maxFreq=2, maxLen=2",
              explanation: "Include 'A' at index 1. count[A]=2, maxFreq=2. Window='AA', replacements=0. maxLen=2.",
              variables: { left: 0, right: 1, maxFreq: 2, windowLen: 2, replacements: 0, maxLen: 2, k: 2, counts: "{A:2}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 14],
              shortLabel: "right=2: 'A', maxFreq=3, maxLen=3",
              explanation: "Include 'A' at index 2. count[A]=3, maxFreq=3. Window='AAA', replacements=0. maxLen=3.",
              variables: { left: 0, right: 2, maxFreq: 3, windowLen: 3, replacements: 0, maxLen: 3, k: 2, counts: "{A:3}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 2, color: "active" }],
                windowLeft: 0,
                windowRight: 2,
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 7, 14],
              shortLabel: "right=3: 'A', maxFreq=4, maxLen=4",
              explanation: "Include 'A' at index 3. count[A]=4, maxFreq=4. Window='AAAA', replacements=0. maxLen=4. The entire string is one character — window never needed to shrink.",
              variables: { left: 0, right: 3, maxFreq: 4, windowLen: 4, replacements: 0, maxLen: 4, k: 2, counts: "{A:4}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "active" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 3, color: "active" }],
                windowLeft: 0,
                windowRight: 3,
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [17],
              shortLabel: "Return 4",
              explanation: "Entire string 'AAAA' is already uniform. Zero replacements needed. Return 4.",
              variables: { maxLen: 4 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
                windowLeft: 0,
                windowRight: 3,
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "k = 0",
          description: "No replacements allowed — find longest run of identical characters",
          input: { s: "AABBA", k: 0 },
          expectedOutput: "2",
          commonMistake: "When k=0, the problem reduces to finding the longest run of consecutive identical characters. The sliding window still works correctly: any mismatch forces an immediate shrink.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Initialize",
              explanation: "k=0 means no replacements allowed. We can only find the longest substring of identical characters. Initialize left=0, maxFreq=0, maxLen=0.",
              variables: { left: 0, right: "-", maxFreq: 0, maxLen: 0, k: 0, counts: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                windowLeft: 0,
                windowRight: -1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 14],
              shortLabel: "right=0: 'A', maxLen=1",
              explanation: "Include 'A'. count[A]=1, maxFreq=1. Replacements = 1 - 1 = 0 <= 0. maxLen=1.",
              variables: { left: 0, right: 0, maxFreq: 1, windowLen: 1, replacements: 0, maxLen: 1, k: 0, counts: "{A:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 0, color: "active" }],
                windowLeft: 0,
                windowRight: 0,
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 14],
              shortLabel: "right=1: 'A', maxLen=2",
              explanation: "Include 'A'. count[A]=2, maxFreq=2. Replacements = 2 - 2 = 0 <= 0. maxLen=2.",
              variables: { left: 0, right: 1, maxFreq: 2, windowLen: 2, replacements: 0, maxLen: 2, k: 0, counts: "{A:2}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 9, 10, 11],
              shortLabel: "right=2: 'B', invalid, shrink",
              explanation: "Include 'B'. count[B]=1, maxFreq=2. Window='AAB', replacements = 3 - 2 = 1 > 0. Must shrink! Remove 'A' at left=0 (count[A]=1), left=1. Window='AB', replacements = 2 - 1 = 1 > 0. Shrink again: remove 'A' at left=1 (count[A]=0), left=2. Window='B', replacements = 1 - 1 = 0 <= 0.",
              variables: { left: 2, right: 2, maxFreq: 2, windowLen: 1, replacements: 0, maxLen: 2, k: 0, counts: "{A:0,B:1}" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "left", index: 2, color: "pointer" }, { name: "right", index: 2, color: "active" }],
                windowLeft: 2,
                windowRight: 2,
              },
              delta: { changedIndices: [0, 1, 2], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 7, 14],
              shortLabel: "right=3: 'B', maxLen=2",
              explanation: "Include 'B'. count[B]=2, maxFreq=2. Window='BB', replacements = 2 - 2 = 0 <= 0. maxLen stays 2.",
              variables: { left: 2, right: 3, maxFreq: 2, windowLen: 2, replacements: 0, maxLen: 2, k: 0, counts: "{B:2}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "active", 4: "default" },
                pointers: [{ name: "left", index: 2, color: "pointer" }, { name: "right", index: 3, color: "active" }],
                windowLeft: 2,
                windowRight: 3,
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7, 9, 10, 11, 14],
              shortLabel: "right=4: 'A', invalid, shrink to 1",
              explanation: "Include 'A'. count[A]=1, maxFreq=2. Window='BBA', replacements = 3 - 2 = 1 > 0. Shrink: left moves to 3, then to 4. Window='A', length=1. maxLen stays 2.",
              variables: { left: 4, right: 4, maxFreq: 2, windowLen: 1, replacements: 0, maxLen: 2, k: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active" },
                pointers: [{ name: "left", index: 4, color: "pointer" }, { name: "right", index: 4, color: "active" }],
                windowLeft: 4,
                windowRight: 4,
              },
              delta: { changedIndices: [2, 3, 4], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [17],
              shortLabel: "Return 2",
              explanation: "Done scanning. The longest substring of identical characters is 'AA' (indices 0-1) or 'BB' (indices 2-3), both length 2. Return 2.",
              variables: { maxLen: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "visited", 3: "visited", 4: "visited" },
                pointers: [],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, k }) {
        const steps = [];
        const chars = s.split("");
        const n = chars.length;
        const count = new Array(26).fill(0);
        let left = 0;
        let maxFreq = 0;
        let maxLen = 0;
        let bestLeft = 0;
        let bestRight = 0;

        const getCounts = () => {
          const result = {};
          for (let c = 0; c < 26; c++) {
            if (count[c] > 0) result[String.fromCharCode(65 + c)] = count[c];
          }
          return JSON.stringify(result);
        };

        steps.push({
          stepId: 0,
          lineNumbers: [2, 3],
          shortLabel: "Initialize",
          explanation: "Create frequency array, set left=0, maxFreq=0, maxLen=0.",
          variables: { left: 0, right: "-", maxFreq: 0, maxLen: 0, k, counts: "{}" },
          dataStructure: {
            arrayStates: Object.fromEntries(chars.map((_, i) => [i, "default"])),
            pointers: [],
            windowLeft: 0,
            windowRight: -1,
          },
          delta: {},
          isAnswer: false,
        });

        for (let right = 0; right < n; right++) {
          count[chars[right].charCodeAt(0) - 65]++;
          maxFreq = Math.max(maxFreq, count[chars[right].charCodeAt(0) - 65]);
          const windowLen = right - left + 1;
          const replacements = windowLen - maxFreq;

          steps.push({
            stepId: steps.length,
            lineNumbers: [5, 6, 7],
            shortLabel: `right=${right}: '${chars[right]}', maxFreq=${maxFreq}`,
            explanation: `Expand to right=${right} (char='${chars[right]}'). count[${chars[right]}]=${count[chars[right].charCodeAt(0) - 65]}. maxFreq=${maxFreq}. Window='${s.substring(left, right + 1)}', length=${windowLen}.`,
            variables: { left, right, maxFreq, windowLen, replacements, maxLen, k, counts: getCounts() },
            dataStructure: {
              arrayStates: Object.fromEntries(chars.map((_, i) => [i, i >= left && i <= right ? "active" : i < left ? "visited" : "default"])),
              pointers: [{ name: "left", index: left, color: "pointer" }, { name: "right", index: right, color: "active" }],
              windowLeft: left,
              windowRight: right,
            },
            delta: { changedIndices: [right], movedPointers: ["right"] },
            isAnswer: false,
          });

          if (replacements > k) {
            count[chars[left].charCodeAt(0) - 65]--;
            left++;

            steps.push({
              stepId: steps.length,
              lineNumbers: [9, 10, 11],
              shortLabel: `invalid: ${windowLen}-${maxFreq}=${replacements} > ${k}, shrink`,
              explanation: `Replacements = ${replacements} > k=${k}. Shrink: remove '${chars[left - 1]}' at left=${left - 1}, move left to ${left}. Window='${s.substring(left, right + 1)}', length=${right - left + 1}.`,
              variables: { left, right, maxFreq, windowLen: right - left + 1, replacements: (right - left + 1) - maxFreq, maxLen, k, counts: getCounts() },
              dataStructure: {
                arrayStates: Object.fromEntries(chars.map((_, i) => [i, i >= left && i <= right ? "active" : i < left ? "eliminated" : "default"])),
                pointers: [{ name: "left", index: left, color: "pointer" }, { name: "right", index: right, color: "active" }],
                windowLeft: left,
                windowRight: right,
              },
              delta: { changedIndices: [left - 1], movedPointers: ["left"] },
              isAnswer: false,
            });
          }

          const currentLen = right - left + 1;
          if (currentLen > maxLen) {
            maxLen = currentLen;
            bestLeft = left;
            bestRight = right;
          }

          steps.push({
            stepId: steps.length,
            lineNumbers: [14],
            shortLabel: `maxLen=${maxLen}`,
            explanation: `Current window [${left}..${right}] = '${s.substring(left, right + 1)}', length=${currentLen}. maxLen = max(${maxLen === currentLen ? maxLen : maxLen}, ${currentLen}) = ${maxLen}.`,
            variables: { left, right, maxFreq, windowLen: currentLen, maxLen, k },
            dataStructure: {
              arrayStates: Object.fromEntries(chars.map((_, i) => [i, i >= left && i <= right ? "active" : i < left ? "visited" : "default"])),
              pointers: [{ name: "left", index: left, color: "pointer" }, { name: "right", index: right, color: "active" }],
              windowLeft: left,
              windowRight: right,
            },
            delta: {},
            isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [17],
          shortLabel: `Return ${maxLen}`,
          explanation: `Finished scanning. The longest valid window was '${s.substring(bestLeft, bestRight + 1)}' (indices ${bestLeft}-${bestRight}) with length ${maxLen}. Return ${maxLen}.`,
          variables: { maxLen },
          dataStructure: {
            arrayStates: Object.fromEntries(chars.map((_, i) => [i, i >= bestLeft && i <= bestRight ? "found" : "visited"])),
            pointers: [],
            windowLeft: bestLeft,
            windowRight: bestRight,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(26 * n²)", space: "O(1)", explanation: "Check every substring, each needing O(26) to find max frequency" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass with two pointers; frequency array is fixed size 26", tradeoff: "The sliding window avoids recomputing frequencies for overlapping substrings" },
  },

  interviewTips: [
    "Clarify: are characters only uppercase English letters? This bounds the frequency array to size 26.",
    "Start by explaining the brute force: check every substring, which is O(n^2).",
    "The key insight is: in a valid window, (window length - max frequency) <= k.",
    "Explain why maxFreq never needs to decrease — the answer only grows when maxFreq grows.",
    "Mention that the frequency array gives O(1) space since it is bounded by alphabet size.",
    "Walk through the shrinking logic: when the window becomes invalid, we slide left forward by 1.",
  ],

  relatedProblems: ["longest-substring-without-repeating", "minimum-window-substring", "permutation-in-string"],
};
