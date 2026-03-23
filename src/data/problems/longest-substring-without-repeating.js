export const longestSubstringWithoutRepeating = {
  id: 16,
  slug: "longest-substring-without-repeating",
  title: "Longest Substring Without Repeating Characters",
  difficulty: "Medium",
  topic: "sliding-window",
  topicLabel: "Sliding Window",
  neetcodeNumber: 16,
  artifactType: "SlidingWindow",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",

  pattern: "Sliding Window with HashSet",
  patternExplanation: `Use a sliding window that expands right when characters are unique,
    and shrinks from the left when a duplicate is found. A HashSet tracks characters
    currently inside the window for O(1) duplicate checks.`,

  intuition: {
    coreInsight: `We need the longest contiguous run of unique characters. A brute force
      approach checks every substring — O(n²) or O(n³). But notice: if the window
      [left..right] has all unique characters, we only need to check the new character
      at right+1. If it's already in the window, shrink from the left until the duplicate
      is removed. This is the classic sliding window pattern — expand right, contract left,
      never backtrack.`,

    mentalModel: `Imagine a caterpillar crawling along a string. Its body covers a substring.
      The front end (right pointer) stretches forward one character at a time. If the new
      character is already somewhere in the body, the tail (left pointer) contracts forward
      until the duplicate is gone. The caterpillar's maximum body length is our answer. It
      only moves forward — never backwards — so it visits each character at most twice.`,

    whyNaiveFails: `Brute force generates all O(n²) substrings and checks each for uniqueness
      in O(n), giving O(n³). Even with a HashSet optimization it's O(n²). For n=50,000,
      that's 2.5 billion operations. The sliding window does it in O(n) — each character is
      added and removed from the set at most once.`,

    keyObservation: `When we encounter a duplicate at position right, we don't need to restart
      from left+1. We only need to shrink the window until the duplicate character is removed.
      An even faster variant stores the last index of each character in a HashMap, letting us
      jump left directly past the duplicate — but the HashSet version is cleaner to explain
      and still O(n).`,
  },

  problem: `Given a string s, find the length of the longest substring without repeating
    characters. A substring is a contiguous non-empty sequence of characters within a string.`,

  examples: [
    { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with length 3.' },
    { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with length 1.' },
    { input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with length 3. Note "pwke" is a subsequence, not a substring.' },
  ],

  constraints: [
    "0 <= s.length <= 5 * 10^4",
    "s consists of English letters, digits, symbols and spaces.",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n³)",
      spaceComplexity: "O(min(n, m))",
      idea: "Check every possible substring. For each one, verify all characters are unique using a HashSet. Track the maximum length.",

      javaCode: `public int lengthOfLongestSubstring(String s) {
    int maxLen = 0;
    for (int i = 0; i < s.length(); i++) {
        for (int j = i; j < s.length(); j++) {
            if (allUnique(s, i, j)) {
                maxLen = Math.max(maxLen, j - i + 1);
            } else {
                break;
            }
        }
    }
    return maxLen;
}

private boolean allUnique(String s, int start, int end) {
    Set<Character> set = new HashSet<>();
    for (int i = start; i <= end; i++) {
        if (!set.add(s.charAt(i))) return false;
    }
    return true;
}`,

      cppCode: `int lengthOfLongestSubstring(string s) {
    int maxLen = 0;
    for (int i = 0; i < s.size(); i++) {
        for (int j = i; j < s.size(); j++) {
            if (allUnique(s, i, j)) {
                maxLen = max(maxLen, j - i + 1);
            } else {
                break;
            }
        }
    }
    return maxLen;
}

bool allUnique(string& s, int start, int end) {
    unordered_set<char> seen;
    for (int i = start; i <= end; i++) {
        if (seen.count(s[i])) return false;
        seen.insert(s[i]);
    }
    return true;
}`,

      pythonCode: `def lengthOfLongestSubstring(s: str) -> int:
    max_len = 0
    for i in range(len(s)):
        for j in range(i, len(s)):
            if len(set(s[i:j+1])) == j - i + 1:
                max_len = max(max_len, j - i + 1)
            else:
                break
    return max_len`,

      lineAnnotations: {
        2: "Track the longest valid substring found so far",
        3: "Outer loop: try every starting position",
        4: "Inner loop: extend to every ending position",
        5: "Check if substring s[i..j] has all unique characters",
        6: "Update max length if this substring is longer",
        8: "Duplicate found — no point extending further from this i",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "abcabcbb" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init maxLen=0",
              explanation: "Initialize maxLen to 0. We'll check every substring to find the longest one with all unique characters.",
              variables: { maxLen: 0, i: "-", j: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                windowLeft: -1,
                windowRight: -1,
                windowMeta: "maxLen=0",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=0: abc → len=3",
              explanation: "Starting at i=0, extend j. Substrings 'a', 'ab', 'abc' are all unique. 'abca' has duplicate 'a' — stop. maxLen = 3.",
              variables: { maxLen: 3, i: 0, j: 2, substring: "abc" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                windowLeft: 0,
                windowRight: 2,
                windowMeta: "maxLen=3",
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=1: bca → len=3",
              explanation: "Starting at i=1, extend j. 'b', 'bc', 'bca' are unique. 'bcab' has duplicate 'b' — stop. Length 3 ties maxLen.",
              variables: { maxLen: 3, i: 1, j: 3, substring: "bca" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "active", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                windowLeft: 1,
                windowRight: 3,
                windowMeta: "maxLen=3",
              },
              delta: { changedIndices: [1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11],
              shortLabel: "Return 3",
              explanation: "After checking all starting positions, the longest substring without repeating characters is 'abc' (or 'bca' or 'cab'), length 3.",
              variables: { maxLen: 3, answer: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                windowLeft: 0,
                windowRight: 2,
                windowMeta: "maxLen=3",
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const steps = [];
        const n = s.length;
        const defaultStates = () => Object.fromEntries([...s].map((_, i) => [i, "default"]));
        let maxLen = 0;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init maxLen=0",
          explanation: "Initialize maxLen to 0. Check every substring for uniqueness.",
          variables: { maxLen: 0, i: "-", j: "-" },
          dataStructure: {
            arrayStates: defaultStates(),
            pointers: [],
            windowLeft: -1, windowRight: -1,
            windowMeta: "maxLen=0",
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const seen = new Set();
          let bestJ = i - 1;
          for (let j = i; j < n; j++) {
            if (seen.has(s[j])) break;
            seen.add(s[j]);
            bestJ = j;
          }
          const len = bestJ - i + 1;
          maxLen = Math.max(maxLen, len);

          const states = defaultStates();
          for (let k = i; k <= bestJ; k++) states[k] = "active";

          steps.push({
            stepId: steps.length, lineNumbers: [3, 4, 5, 6],
            shortLabel: `i=${i}: ${s.slice(i, bestJ + 1)} → len=${len}`,
            explanation: `Starting at i=${i}, the longest unique substring is "${s.slice(i, bestJ + 1)}" (length ${len}). maxLen = ${maxLen}.`,
            variables: { maxLen, i, j: bestJ, substring: s.slice(i, bestJ + 1) },
            dataStructure: {
              arrayStates: states,
              pointers: [{ name: "i", index: i, color: "pointer" }],
              windowLeft: i, windowRight: bestJ,
              windowMeta: `maxLen=${maxLen}`,
            },
            delta: { changedIndices: Array.from({ length: len }, (_, k) => i + k) },
            isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [11],
          shortLabel: `Return ${maxLen}`,
          explanation: `After checking all starting positions, the answer is ${maxLen}.`,
          variables: { maxLen, answer: maxLen },
          dataStructure: {
            arrayStates: defaultStates(),
            pointers: [],
            windowLeft: -1, windowRight: -1,
            windowMeta: `maxLen=${maxLen}`,
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sliding Window + HashSet",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(n, m))",
      idea: `Maintain a window [left, right] where all characters are unique. Expand right
        one character at a time. If the new character is already in the set, shrink from
        the left until the duplicate is removed. Track the maximum window size.`,

      javaCode: `public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left));
            left++;
        }
        set.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}`,

      cppCode: `int lengthOfLongestSubstring(string s) {
    unordered_set<char> charSet;
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.size(); right++) {
        while (charSet.count(s[right])) {
            charSet.erase(s[left]);
            left++;
        }
        charSet.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }

    return maxLen;
}`,

      pythonCode: `def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)

    return max_len`,

      lineAnnotations: {
        2:  "HashSet tracks characters currently in the window",
        3:  "left pointer starts at 0; maxLen tracks our answer",
        5:  "Expand window: move right pointer one character at a time",
        6:  "If s[right] is already in the set, we have a duplicate",
        7:  "Remove s[left] from set — shrink window from the left",
        8:  "Advance left pointer past the removed character",
        10: "Duplicate cleared — add s[right] to the set",
        11: "Update maxLen with current window size",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with repeating characters mid-string",
          input: { s: "abcabcbb" },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init set={}, left=0",
              explanation: "Create empty HashSet and initialize left=0, maxLen=0. The window starts empty.",
              variables: { left: 0, right: "-", maxLen: 0, set: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }],
                windowLeft: -1,
                windowRight: -1,
                windowMeta: "maxLen=0, set={}",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 10, 11],
              shortLabel: "R=0: add 'a', len=1",
              explanation: "right=0, char='a'. 'a' is not in the set. Add 'a'. Window is [0,0]='a', length=1. maxLen=1.",
              variables: { left: 0, right: 0, "s[right]": "a", maxLen: 1, set: "{a}", windowLen: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 0, color: "active" }],
                windowLeft: 0,
                windowRight: 0,
                windowMeta: "maxLen=1, set={a}",
              },
              delta: { changedIndices: [0], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 10, 11],
              shortLabel: "R=1: add 'b', len=2",
              explanation: "right=1, char='b'. 'b' is not in the set. Add 'b'. Window is [0,1]='ab', length=2. maxLen=2.",
              variables: { left: 0, right: 1, "s[right]": "b", maxLen: 2, set: "{a,b}", windowLen: 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
                windowMeta: "maxLen=2, set={a,b}",
              },
              delta: { changedIndices: [1], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 10, 11],
              shortLabel: "R=2: add 'c', len=3",
              explanation: "right=2, char='c'. 'c' is not in the set. Add 'c'. Window is [0,2]='abc', length=3. maxLen=3.",
              variables: { left: 0, right: 2, "s[right]": "c", maxLen: 3, set: "{a,b,c}", windowLen: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 2, color: "active" }],
                windowLeft: 0,
                windowRight: 2,
                windowMeta: "maxLen=3, set={a,b,c}",
              },
              delta: { changedIndices: [2], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6],
              shortLabel: "R=3: 'a' duplicate!",
              explanation: "right=3, char='a'. 'a' IS in the set — duplicate found! We must shrink the window from the left until 'a' is removed.",
              variables: { left: 0, right: 3, "s[right]": "a", maxLen: 3, set: "{a,b,c}", duplicate: "a" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "eliminated", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 3, color: "active" }],
                windowLeft: 0,
                windowRight: 2,
                windowMeta: "maxLen=3, set={a,b,c}, dup='a'",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8],
              shortLabel: "Remove 'a', L→1",
              explanation: "Remove s[left]='a' from set. Move left to 1. Now set={b,c}. The duplicate 'a' is cleared.",
              variables: { left: 1, right: 3, "s[right]": "a", maxLen: 3, set: "{b,c}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 3, color: "active" }],
                windowLeft: 1,
                windowRight: 2,
                windowMeta: "maxLen=3, set={b,c}",
              },
              delta: { changedIndices: [0], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10, 11],
              shortLabel: "Add 'a', len=3",
              explanation: "Now add s[right]='a'. Window is [1,3]='bca', length=3. maxLen stays 3.",
              variables: { left: 1, right: 3, "s[right]": "a", maxLen: 3, set: "{b,c,a}", windowLen: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "active", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 3, color: "active" }],
                windowLeft: 1,
                windowRight: 3,
                windowMeta: "maxLen=3, set={b,c,a}",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "R=4: 'b' dup → L→2",
              explanation: "right=4, char='b'. 'b' is in the set. Remove s[1]='b', left=2. Duplicate cleared.",
              variables: { left: 2, right: 4, "s[right]": "b", maxLen: 3, set: "{c,a}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 2, color: "pointer" }, { name: "R", index: 4, color: "active" }],
                windowLeft: 2,
                windowRight: 3,
                windowMeta: "maxLen=3, set={c,a}",
              },
              delta: { changedIndices: [1], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [10, 11],
              shortLabel: "Add 'b', len=3",
              explanation: "Add 'b'. Window [2,4]='cab', length=3. maxLen stays 3.",
              variables: { left: 2, right: 4, maxLen: 3, set: "{c,a,b}", windowLen: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "active", 4: "active", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 2, color: "pointer" }, { name: "R", index: 4, color: "active" }],
                windowLeft: 2,
                windowRight: 4,
                windowMeta: "maxLen=3, set={c,a,b}",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "R=5: 'c' dup → L→3",
              explanation: "right=5, char='c'. 'c' is in the set. Remove s[2]='c', left=3. Duplicate cleared.",
              variables: { left: 3, right: 5, "s[right]": "c", maxLen: 3, set: "{a,b}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "active", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 3, color: "pointer" }, { name: "R", index: 5, color: "active" }],
                windowLeft: 3,
                windowRight: 4,
                windowMeta: "maxLen=3, set={a,b}",
              },
              delta: { changedIndices: [2], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [10, 11],
              shortLabel: "Add 'c', len=3",
              explanation: "Add 'c'. Window [3,5]='abc', length=3. maxLen stays 3.",
              variables: { left: 3, right: 5, maxLen: 3, set: "{a,b,c}", windowLen: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "active", 5: "active", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 3, color: "pointer" }, { name: "R", index: 5, color: "active" }],
                windowLeft: 3,
                windowRight: 5,
                windowMeta: "maxLen=3, set={a,b,c}",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "R=6: 'b' dup → shrink",
              explanation: "right=6, char='b'. 'b' is in the set. Remove s[3]='a', left=4. Still have 'b' — remove s[4]='b', left=5.",
              variables: { left: 5, right: 6, "s[right]": "b", maxLen: 3, set: "{c}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active", 6: "default", 7: "default" },
                pointers: [{ name: "L", index: 5, color: "pointer" }, { name: "R", index: 6, color: "active" }],
                windowLeft: 5,
                windowRight: 5,
                windowMeta: "maxLen=3, set={c}",
              },
              delta: { changedIndices: [3, 4], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [10, 11],
              shortLabel: "Add 'b', len=2",
              explanation: "Add 'b'. Window [5,6]='cb', length=2. maxLen stays 3.",
              variables: { left: 5, right: 6, maxLen: 3, set: "{c,b}", windowLen: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active", 6: "active", 7: "default" },
                pointers: [{ name: "L", index: 5, color: "pointer" }, { name: "R", index: 6, color: "active" }],
                windowLeft: 5,
                windowRight: 6,
                windowMeta: "maxLen=3, set={c,b}",
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 13,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "R=7: 'b' dup → shrink",
              explanation: "right=7, char='b'. 'b' is in the set. Remove s[5]='c', left=6. Remove s[6]='b', left=7. Duplicate cleared.",
              variables: { left: 7, right: 7, "s[right]": "b", maxLen: 3, set: "{}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "default" },
                pointers: [{ name: "L", index: 7, color: "pointer" }, { name: "R", index: 7, color: "active" }],
                windowLeft: 7,
                windowRight: 6,
                windowMeta: "maxLen=3, set={}",
              },
              delta: { changedIndices: [5, 6], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 14,
              lineNumbers: [10, 11],
              shortLabel: "Add 'b', len=1",
              explanation: "Add 'b'. Window [7,7]='b', length=1. maxLen stays 3.",
              variables: { left: 7, right: 7, maxLen: 3, set: "{b}", windowLen: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "active" },
                pointers: [{ name: "L", index: 7, color: "pointer" }, { name: "R", index: 7, color: "active" }],
                windowLeft: 7,
                windowRight: 7,
                windowMeta: "maxLen=3, set={b}",
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 15,
              lineNumbers: [13],
              shortLabel: "Return 3",
              explanation: "Loop complete. The longest substring without repeating characters has length 3 (e.g., 'abc'). Return 3.",
              variables: { maxLen: 3, answer: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited" },
                pointers: [],
                windowLeft: 0,
                windowRight: 2,
                windowMeta: "maxLen=3",
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Same Characters",
          description: "Every character is the same — window never grows beyond 1",
          input: { s: "bbbbb" },
          expectedOutput: "1",
          commonMistake: "Forgetting to shrink the window when a duplicate is encountered, leading to an incorrect count of the window size.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init set={}, left=0",
              explanation: "Start with empty set and left=0. Every character is 'b' — the window can never be bigger than 1.",
              variables: { left: 0, right: "-", maxLen: 0, set: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }],
                windowLeft: -1, windowRight: -1,
                windowMeta: "maxLen=0, set={}",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 10, 11],
              shortLabel: "R=0: add 'b', len=1",
              explanation: "right=0, char='b'. Not in set. Add it. Window [0,0]='b', length=1. maxLen=1.",
              variables: { left: 0, right: 0, "s[right]": "b", maxLen: 1, set: "{b}", windowLen: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 0, color: "active" }],
                windowLeft: 0, windowRight: 0,
                windowMeta: "maxLen=1, set={b}",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "R=1: 'b' dup → L→1",
              explanation: "right=1, char='b'. 'b' IS in set. Remove s[0]='b', left=1. Duplicate cleared.",
              variables: { left: 1, right: 1, "s[right]": "b", maxLen: 1, set: "{}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 1, color: "active" }],
                windowLeft: 1, windowRight: 0,
                windowMeta: "maxLen=1, set={}",
              },
              delta: { changedIndices: [0], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11],
              shortLabel: "Add 'b', len=1",
              explanation: "Add 'b'. Window [1,1]='b', length=1. maxLen stays 1. Pattern repeats for every index.",
              variables: { left: 1, right: 1, maxLen: 1, set: "{b}", windowLen: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 1, color: "active" }],
                windowLeft: 1, windowRight: 1,
                windowMeta: "maxLen=1, set={b}",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13],
              shortLabel: "Return 1",
              explanation: "After processing all characters, the window never exceeded length 1 because every character was 'b'. Return 1.",
              variables: { maxLen: 1, answer: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "found" },
                pointers: [],
                windowLeft: 4, windowRight: 4,
                windowMeta: "maxLen=1",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "All Unique",
          description: "No repeating characters — window spans entire string",
          input: { s: "abcdef" },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init set={}, left=0",
              explanation: "Start with empty set. Since all characters are unique, the window will grow to cover the entire string.",
              variables: { left: 0, right: "-", maxLen: 0, set: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }],
                windowLeft: -1, windowRight: -1,
                windowMeta: "maxLen=0, set={}",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 10, 11],
              shortLabel: "R=0: add 'a', len=1",
              explanation: "right=0, 'a' not in set. Add it. Window='a', maxLen=1.",
              variables: { left: 0, right: 0, maxLen: 1, set: "{a}", windowLen: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 0, color: "active" }],
                windowLeft: 0, windowRight: 0,
                windowMeta: "maxLen=1",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 10, 11],
              shortLabel: "R=1..5: grow window",
              explanation: "Each new character is unique. Window grows: 'ab', 'abc', 'abcd', 'abcde', 'abcdef'. No shrinking needed. maxLen=6.",
              variables: { left: 0, right: 5, maxLen: 6, set: "{a,b,c,d,e,f}", windowLen: 6 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 5, color: "active" }],
                windowLeft: 0, windowRight: 5,
                windowMeta: "maxLen=6, set={a,b,c,d,e,f}",
              },
              delta: { changedIndices: [1, 2, 3, 4, 5] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [13],
              shortLabel: "Return 6",
              explanation: "Loop complete. The entire string is one big unique substring. Return 6.",
              variables: { maxLen: 6, answer: 6 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found" },
                pointers: [],
                windowLeft: 0, windowRight: 5,
                windowMeta: "maxLen=6",
              },
              delta: { changedIndices: [0, 1, 2, 3, 4, 5] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const steps = [];
        const n = s.length;
        const charSet = new Set();
        let left = 0;
        let maxLen = 0;

        const makeArrayStates = (leftP, rightP) => {
          const states = {};
          for (let i = 0; i < n; i++) {
            if (i < leftP) states[i] = "visited";
            else if (i >= leftP && i <= rightP) states[i] = "active";
            else states[i] = "default";
          }
          return states;
        };

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init set={}, left=0",
          explanation: "Create empty HashSet. Initialize left=0, maxLen=0.",
          variables: { left: 0, right: "-", maxLen: 0, set: "{}" },
          dataStructure: {
            arrayStates: Object.fromEntries([...s].map((_, i) => [i, "default"])),
            pointers: [{ name: "L", index: 0, color: "pointer" }],
            windowLeft: -1, windowRight: -1,
            windowMeta: "maxLen=0, set={}",
          },
          delta: {}, isAnswer: false,
        });

        for (let right = 0; right < n; right++) {
          const ch = s[right];

          if (charSet.has(ch)) {
            // Shrink phase
            const oldLeft = left;
            while (charSet.has(s[right])) {
              charSet.delete(s[left]);
              left++;
            }

            steps.push({
              stepId: steps.length, lineNumbers: [5, 6, 7, 8],
              shortLabel: `R=${right}: '${ch}' dup → L→${left}`,
              explanation: `right=${right}, char='${ch}' is already in the set. Shrink window from left=${oldLeft} to left=${left} to remove the duplicate.`,
              variables: { left, right, "s[right]": ch, maxLen, set: `{${[...charSet].join(",")}}` },
              dataStructure: {
                arrayStates: makeArrayStates(left, right - 1),
                pointers: [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "active" }],
                windowLeft: left, windowRight: right - 1,
                windowMeta: `maxLen=${maxLen}, set={${[...charSet].join(",")}}`,
              },
              delta: { changedIndices: Array.from({ length: left - oldLeft }, (_, k) => oldLeft + k), movedPointers: ["L"] },
              isAnswer: false,
            });
          }

          charSet.add(ch);
          const windowLen = right - left + 1;
          maxLen = Math.max(maxLen, windowLen);

          steps.push({
            stepId: steps.length, lineNumbers: [10, 11],
            shortLabel: `Add '${ch}', len=${windowLen}`,
            explanation: `Add '${ch}' to set. Window [${left},${right}]='${s.slice(left, right + 1)}', length=${windowLen}. maxLen=${maxLen}.`,
            variables: { left, right, "s[right]": ch, maxLen, set: `{${[...charSet].join(",")}}`, windowLen },
            dataStructure: {
              arrayStates: makeArrayStates(left, right),
              pointers: [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "active" }],
              windowLeft: left, windowRight: right,
              windowMeta: `maxLen=${maxLen}, set={${[...charSet].join(",")}}`,
            },
            delta: { changedIndices: [right] },
            isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: `Return ${maxLen}`,
          explanation: `Loop complete. The longest substring without repeating characters has length ${maxLen}. Return ${maxLen}.`,
          variables: { maxLen, answer: maxLen },
          dataStructure: {
            arrayStates: Object.fromEntries([...s].map((_, i) => [i, "visited"])),
            pointers: [],
            windowLeft: -1, windowRight: -1,
            windowMeta: `maxLen=${maxLen}`,
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n³)", space: "O(min(n, m))", explanation: "O(n²) substrings, each checked for uniqueness in O(n). m = charset size." },
    optimal: { time: "O(n)",  space: "O(min(n, m))", explanation: "Each character is added and removed from the set at most once — two pointer passes. HashSet stores at most min(n, m) characters.", tradeoff: "O(min(n,m)) extra space for the HashSet buys us O(n) time vs O(n³)." },
  },

  interviewTips: [
    "Clarify: 'Can the string contain spaces, digits, and special characters?' (Yes — all ASCII.)",
    "State brute force O(n³) first, then explain the sliding window optimization.",
    "Explain why each character is visited at most twice (once by right, once by left) — this is why it's O(n).",
    "Mention the HashMap variant that stores last index for direct jump — O(n) with potentially fewer operations.",
    "Ask about empty string — return 0.",
    "Articulate the window invariant: all characters in [left, right] are unique at every step.",
  ],

  relatedProblems: ["longest-repeating-replacement", "minimum-window-substring", "permutation-in-string"],
};
