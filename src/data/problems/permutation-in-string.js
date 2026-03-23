export const permutationInString = {
  id: 18,
  slug: "permutation-in-string",
  title: "Permutation in String",
  difficulty: "Medium",
  topic: "sliding-window",
  topicLabel: "Sliding Window",
  neetcodeNumber: 18,
  artifactType: "SlidingWindow",
  companies: ["Microsoft", "Amazon", "Google", "Meta", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/permutation-in-string/",

  pattern: "Fixed-Size Sliding Window with Frequency Matching",
  patternExplanation: `When checking if any permutation of one string exists as a substring
    of another, use a fixed-size sliding window of length s1.length over s2. Maintain
    frequency counts and compare — if all 26 character counts match, a permutation exists.`,

  intuition: {
    coreInsight: `A permutation of s1 is just a rearrangement — same characters, same counts,
      different order. So instead of generating all permutations (factorial time!), we ask:
      does any substring of s2 with length equal to s1 have the exact same character
      frequencies as s1? We slide a fixed-size window across s2 and compare frequency arrays.`,

    mentalModel: `Imagine you have a bag of Scrabble tiles spelling s1. You slide a
      frame exactly len(s1) wide across s2. At each position, you check: do the tiles
      inside the frame match your bag exactly? Adding a new tile on the right and removing
      one on the left is O(1) — you just increment one counter and decrement another.
      You never need to sort or generate permutations.`,

    whyNaiveFails: `Generating all permutations of s1 takes O(n!) time where n = len(s1).
      For s1 of length 20, that is 2.4 * 10^18 permutations — completely infeasible.
      Even sorting each window (O(m * n log n)) is too slow. The frequency-matching
      approach reduces the per-window comparison to O(1) amortized by using a "matches"
      counter that tracks how many of the 26 characters already have equal counts.`,

    keyObservation: `Instead of comparing all 26 frequency entries on every slide (O(26) per
      step), maintain a 'matches' counter. When you add a character on the right, check if
      its count now matches or just un-matched. Same when removing from the left. If matches
      reaches 26, every character's count is equal — we found a permutation. This makes each
      slide O(1) instead of O(26).`,
  },

  problem: `Given two strings s1 and s2, return true if s2 contains a permutation of s1,
    or false otherwise. In other words, return true if one of s1's permutations is a
    substring of s2.`,

  examples: [
    { input: 's1 = "ab", s2 = "eidbaooo"', output: "true", explanation: "s2 contains one permutation of s1: 'ba' at index 3-4." },
    { input: 's1 = "ab", s2 = "eidboaoo"', output: "false", explanation: "No substring of length 2 in s2 has the same character counts as 'ab'." },
  ],

  constraints: [
    "1 <= s1.length, s2.length <= 10^4",
    "s1 and s2 consist of lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "Brute Force — Sort Each Window",
      tier: "brute",
      timeComplexity: "O(n * m log m)",
      spaceComplexity: "O(m)",
      idea: "Sort s1. For each window of length m = len(s1) in s2, sort the window and compare with sorted s1. If they match, return true.",

      javaCode: `public boolean checkInclusion(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    if (m > n) return false;
    char[] sorted1 = s1.toCharArray();
    Arrays.sort(sorted1);
    String target = new String(sorted1);

    for (int i = 0; i <= n - m; i++) {
        char[] window = s2.substring(i, i + m).toCharArray();
        Arrays.sort(window);
        if (new String(window).equals(target)) {
            return true;
        }
    }
    return false;
}`,

      cppCode: `bool checkInclusion(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    if (m > n) return false;
    string target = s1;
    sort(target.begin(), target.end());

    for (int i = 0; i <= n - m; i++) {
        string window = s2.substr(i, m);
        sort(window.begin(), window.end());
        if (window == target) {
            return true;
        }
    }
    return false;
}`,

      pythonCode: `def checkInclusion(s1: str, s2: str) -> bool:
    m, n = len(s1), len(s2)
    if m > n:
        return False
    target = sorted(s1)

    for i in range(n - m + 1):
        window = sorted(s2[i:i + m])
        if window == target:
            return True
    return False`,

      lineAnnotations: {
        2: "Get lengths of both strings",
        3: "If s1 is longer than s2, no permutation can exist",
        4: "Sort s1 to get the target signature",
        8: "Try every starting position for the window",
        9: "Extract and sort the current window",
        10: "Compare sorted window with sorted s1",
        11: "Match found — a permutation exists",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s1: "ab", s2: "eidbaooo" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4],
              shortLabel: "Sort s1 → 'ab'",
              explanation: "Sort s1='ab' to get target='ab'. We'll compare every window of length 2 in s2 against this sorted target.",
              variables: { target: "ab", m: 2, n: 8 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9, 10],
              shortLabel: "i=0: 'ei' sorted='ei' ≠ 'ab'",
              explanation: "Window [0..1] = 'ei'. Sorted = 'ei'. Not equal to 'ab'. Move on.",
              variables: { i: 0, window: "ei", sortedWindow: "ei", target: "ab" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9, 10],
              shortLabel: "i=3: 'ba' sorted='ab' = 'ab' ✓",
              explanation: "Window [3..4] = 'ba'. Sorted = 'ab'. Equals target 'ab'! Found a permutation of s1 in s2.",
              variables: { i: 3, window: "ba", sortedWindow: "ab", target: "ab" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "found", 4: "found", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                windowLeft: 3,
                windowRight: 4,
              },
              delta: { changedIndices: [3, 4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s1, s2 }) {
        const steps = [];
        const m = s1.length;
        const n = s2.length;
        if (m > n) {
          steps.push({
            stepId: 0, lineNumbers: [3],
            shortLabel: "s1 longer than s2, return false",
            explanation: `s1 has length ${m} but s2 has length ${n}. No permutation can fit. Return false.`,
            variables: { m, n },
            dataStructure: { arrayStates: {}, pointers: [], windowLeft: 0, windowRight: 0 },
            delta: {}, isAnswer: true,
          });
          return steps;
        }
        const target = s1.split("").sort().join("");
        steps.push({
          stepId: 0, lineNumbers: [4],
          shortLabel: `Sort s1 → '${target}'`,
          explanation: `Sort s1='${s1}' to get target='${target}'. Compare each window of length ${m} in s2.`,
          variables: { target, m, n },
          dataStructure: {
            arrayStates: Object.fromEntries(s2.split("").map((_, i) => [i, "default"])),
            pointers: [], windowLeft: 0, windowRight: m - 1,
          },
          delta: {}, isAnswer: false,
        });
        for (let i = 0; i <= n - m; i++) {
          const window = s2.substring(i, i + m);
          const sorted = window.split("").sort().join("");
          const match = sorted === target;
          steps.push({
            stepId: steps.length, lineNumbers: [8, 9, 10],
            shortLabel: `i=${i}: '${window}' sorted='${sorted}' ${match ? "= '" + target + "' ✓" : "≠ '" + target + "'"}`,
            explanation: `Window [${i}..${i + m - 1}] = '${window}'. Sorted = '${sorted}'. ${match ? "Matches target! Permutation found." : "Does not match target."}`,
            variables: { i, window, sortedWindow: sorted, target },
            dataStructure: {
              arrayStates: Object.fromEntries(s2.split("").map((_, j) => [j, j >= i && j < i + m ? (match ? "found" : "active") : j < i ? "visited" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              windowLeft: i, windowRight: i + m - 1,
            },
            delta: { changedIndices: [i] }, isAnswer: match,
          });
          if (match) return steps;
        }
        steps.push({
          stepId: steps.length, lineNumbers: [14],
          shortLabel: "Return false",
          explanation: "No window matched. No permutation of s1 exists in s2.",
          variables: {},
          dataStructure: {
            arrayStates: Object.fromEntries(s2.split("").map((_, i) => [i, "visited"])),
            pointers: [], windowLeft: 0, windowRight: 0,
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sliding Window with Matches Counter",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Build frequency arrays for s1 and for the first window of s2. Count how many
        of the 26 characters have matching frequencies ('matches'). Slide the window one
        character at a time: add the new right character and remove the old left character,
        updating the matches counter in O(1). If matches ever equals 26, return true.`,

      javaCode: `public boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) return false;
    int[] s1Count = new int[26], s2Count = new int[26];

    for (int i = 0; i < s1.length(); i++) {
        s1Count[s1.charAt(i) - 'a']++;
        s2Count[s2.charAt(i) - 'a']++;
    }

    int matches = 0;
    for (int i = 0; i < 26; i++) {
        if (s1Count[i] == s2Count[i]) matches++;
    }

    int left = 0;
    for (int right = s1.length(); right < s2.length(); right++) {
        if (matches == 26) return true;

        int idx = s2.charAt(right) - 'a';
        s2Count[idx]++;
        if (s2Count[idx] == s1Count[idx]) matches++;
        else if (s2Count[idx] == s1Count[idx] + 1) matches--;

        idx = s2.charAt(left) - 'a';
        s2Count[idx]--;
        if (s2Count[idx] == s1Count[idx]) matches++;
        else if (s2Count[idx] == s1Count[idx] - 1) matches--;

        left++;
    }

    return matches == 26;
}`,

      cppCode: `bool checkInclusion(string s1, string s2) {
    if (s1.size() > s2.size()) return false;
    int s1Count[26] = {0}, s2Count[26] = {0};

    for (int i = 0; i < s1.size(); i++) {
        s1Count[s1[i] - 'a']++;
        s2Count[s2[i] - 'a']++;
    }

    int matches = 0;
    for (int i = 0; i < 26; i++) {
        if (s1Count[i] == s2Count[i]) matches++;
    }

    int left = 0;
    for (int right = s1.size(); right < s2.size(); right++) {
        if (matches == 26) return true;

        int idx = s2[right] - 'a';
        s2Count[idx]++;
        if (s2Count[idx] == s1Count[idx]) matches++;
        else if (s2Count[idx] == s1Count[idx] + 1) matches--;

        idx = s2[left] - 'a';
        s2Count[idx]--;
        if (s2Count[idx] == s1Count[idx]) matches++;
        else if (s2Count[idx] == s1Count[idx] - 1) matches--;

        left++;
    }

    return matches == 26;
}`,

      pythonCode: `def checkInclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False
    s1_count = [0] * 26
    s2_count = [0] * 26

    for i in range(len(s1)):
        s1_count[ord(s1[i]) - ord('a')] += 1
        s2_count[ord(s2[i]) - ord('a')] += 1

    matches = 0
    for i in range(26):
        if s1_count[i] == s2_count[i]:
            matches += 1

    left = 0
    for right in range(len(s1), len(s2)):
        if matches == 26:
            return True

        idx = ord(s2[right]) - ord('a')
        s2_count[idx] += 1
        if s2_count[idx] == s1_count[idx]:
            matches += 1
        elif s2_count[idx] == s1_count[idx] + 1:
            matches -= 1

        idx = ord(s2[left]) - ord('a')
        s2_count[idx] -= 1
        if s2_count[idx] == s1_count[idx]:
            matches += 1
        elif s2_count[idx] == s1_count[idx] - 1:
            matches -= 1

        left += 1

    return matches == 26`,

      lineAnnotations: {
        2: "Edge case: s1 can't fit in s2",
        3: "Frequency arrays for s1 and initial window of s2",
        5: "Build initial frequency counts for both strings",
        10: "Count how many of 26 characters already match",
        15: "Left pointer of the sliding window",
        16: "Slide the window one character at a time",
        17: "If all 26 chars match, we found a permutation",
        19: "Add new right character to window count",
        20: "Increment s2Count — check if it now matches s1Count",
        21: "If it just went from matching to one-over, lose a match",
        23: "Remove left character from window count",
        24: "Decrement s2Count — check if it now matches s1Count",
        25: "If it just went from matching to one-under, lose a match",
        27: "Advance left pointer",
        30: "Final check: does the last window match?",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Permutation 'ba' found at indices 3-4 in s2",
          input: { s1: "ab", s2: "eidbaooo" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 5, 6, 7],
              shortLabel: "Build initial counts",
              explanation: "s1='ab', s2='eidbaooo'. Window size = 2. Build s1Count from 'ab': {a:1, b:1}. Build s2Count from first window 'ei': {e:1, i:1}.",
              variables: { s1: "ab", s2: "eidbaooo", m: 2, s1Count: "{a:1,b:1}", s2Count: "{e:1,i:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 12],
              shortLabel: "Count matches = 24",
              explanation: "Compare s1Count and s2Count for each of 26 characters. 'a': 1 vs 0 (no match). 'b': 1 vs 0 (no match). 'e': 0 vs 1 (no match). 'i': 0 vs 1 (no match). The other 22 characters all have count 0 in both — they match. matches = 22.",
              variables: { matches: 22, s1Count: "{a:1,b:1}", s2Count: "{e:1,i:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16, 17],
              shortLabel: "right=2: matches=22 ≠ 26",
              explanation: "Check matches before sliding: 22 ≠ 26, not a permutation yet.",
              variables: { left: 0, right: 2, matches: 22 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 2, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [19, 20, 21, 23, 24, 25, 27],
              shortLabel: "Slide: add 'd', remove 'e' → matches=23",
              explanation: "Add s2[2]='d': s2Count[d] goes 0→1. s1Count[d]=0, so 1≠0 — was matching (0=0), now unmatched. matches=21. Remove s2[0]='e': s2Count[e] goes 1→0. s1Count[e]=0, so 0=0 — was unmatched, now matches. matches=22. left moves to 1. Window = 'id'.",
              variables: { left: 1, right: 2, matches: 22, s2Count: "{d:1,i:1}", window: "id" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "left", index: 1, color: "pointer" }, { name: "right", index: 2, color: "active" }],
                windowLeft: 1,
                windowRight: 2,
              },
              delta: { changedIndices: [0, 2], movedPointers: ["left", "right"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16, 17, 19, 20, 21, 23, 24, 25, 27],
              shortLabel: "Slide: add 'b', remove 'i' → matches=24",
              explanation: "matches=22 ≠ 26. Add s2[3]='b': s2Count[b] goes 0→1. s1Count[b]=1, so 1=1 — now matches! matches=23. Remove s2[1]='i': s2Count[i] goes 1→0. s1Count[i]=0, so 0=0 — now matches! matches=24. left=2. Window = 'db'.",
              variables: { left: 2, right: 3, matches: 24, s2Count: "{b:1,d:1}", window: "db" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "eliminated", 2: "active", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "left", index: 2, color: "pointer" }, { name: "right", index: 3, color: "active" }],
                windowLeft: 2,
                windowRight: 3,
              },
              delta: { changedIndices: [1, 3], movedPointers: ["left", "right"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [16, 17, 19, 20, 21, 23, 24, 25, 27],
              shortLabel: "Slide: add 'a', remove 'd' → matches=26!",
              explanation: "matches=24 ≠ 26. Add s2[4]='a': s2Count[a] goes 0→1. s1Count[a]=1, so 1=1 — matches! matches=25. Remove s2[2]='d': s2Count[d] goes 1→0. s1Count[d]=0, so 0=0 — matches! matches=26. left=3. Window = 'ba'.",
              variables: { left: 3, right: 4, matches: 26, s2Count: "{a:1,b:1}", window: "ba" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "eliminated", 3: "active", 4: "active", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "left", index: 3, color: "pointer" }, { name: "right", index: 4, color: "active" }],
                windowLeft: 3,
                windowRight: 4,
              },
              delta: { changedIndices: [2, 4], movedPointers: ["left", "right"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [16, 17],
              shortLabel: "matches=26 → Return true!",
              explanation: "At the start of the next iteration, matches=26! All 26 character frequencies match. Window [3..4] = 'ba' is a permutation of 'ab'. Return true.",
              variables: { left: 3, right: 5, matches: 26, window: "ba", answer: "true" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "found", 4: "found", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "left", index: 3, color: "pointer" }, { name: "right", index: 4, color: "active" }],
                windowLeft: 3,
                windowRight: 4,
              },
              delta: { changedIndices: [3, 4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Permutation",
          description: "No permutation of s1 exists in s2 — must scan everything",
          input: { s1: "ab", s2: "eidboaoo" },
          expectedOutput: "false",
          commonMistake: "Some solutions forget to check the final window position. The last window must be checked after the loop ends (matches == 26 at return statement).",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 5, 6, 7],
              shortLabel: "Build initial counts",
              explanation: "s1='ab', s2='eidboaoo'. Build s1Count={a:1,b:1}. First window 'ei': s2Count={e:1,i:1}.",
              variables: { s1: "ab", s2: "eidboaoo", m: 2, s1Count: "{a:1,b:1}", s2Count: "{e:1,i:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 12],
              shortLabel: "Count matches = 22",
              explanation: "4 characters differ (a, b, e, i). 22 characters match (all have count 0 in both). matches = 22.",
              variables: { matches: 22 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16, 17, 19, 23, 27],
              shortLabel: "Slide window across: id → db → bo → oa → ao → oo",
              explanation: "We slide through windows: 'id'(22), 'db'(23), 'bo'(23), 'oa'(24), 'ao'(24), 'oo'(22). None reach matches=26. The letters a and b appear in s2 but never adjacent.",
              variables: { matches: 22, window: "oo" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "active", 7: "active" },
                pointers: [{ name: "left", index: 6, color: "pointer" }, { name: "right", index: 7, color: "active" }],
                windowLeft: 6,
                windowRight: 7,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [30],
              shortLabel: "Return false",
              explanation: "Loop ended. Final check: matches=22 ≠ 26. No permutation of 'ab' exists as a contiguous substring in 'eidboaoo'. Return false.",
              variables: { matches: 22, answer: "false" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited" },
                pointers: [],
                windowLeft: 0,
                windowRight: 7,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "First Window Match",
          description: "The very first window is already a permutation",
          input: { s1: "ba", s2: "abcdef" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 5, 6, 7],
              shortLabel: "Build initial counts",
              explanation: "s1='ba', s2='abcdef'. Build s1Count={a:1,b:1}. First window 'ab': s2Count={a:1,b:1}. The counts already match!",
              variables: { s1: "ba", s2: "abcdef", m: 2, s1Count: "{a:1,b:1}", s2Count: "{a:1,b:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 12],
              shortLabel: "Count matches = 26",
              explanation: "All 26 characters: a=1 vs 1 (match), b=1 vs 1 (match), c through z = 0 vs 0 (all match). matches = 26!",
              variables: { matches: 26 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16, 17],
              shortLabel: "matches=26 → Return true!",
              explanation: "Before even sliding, matches=26. The first window 'ab' is already a permutation of 'ba'. Return true immediately.",
              variables: { matches: 26, window: "ab", answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: 1, color: "active" }],
                windowLeft: 0,
                windowRight: 1,
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s1, s2 }) {
        const steps = [];
        const m = s1.length;
        const n = s2.length;

        if (m > n) {
          steps.push({
            stepId: 0, lineNumbers: [2],
            shortLabel: "s1 longer than s2, return false",
            explanation: `s1 (length ${m}) is longer than s2 (length ${n}). No permutation can exist. Return false.`,
            variables: { m, n, answer: "false" },
            dataStructure: { arrayStates: {}, pointers: [], windowLeft: 0, windowRight: 0 },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const s1Count = new Array(26).fill(0);
        const s2Count = new Array(26).fill(0);

        for (let i = 0; i < m; i++) {
          s1Count[s1.charCodeAt(i) - 97]++;
          s2Count[s2.charCodeAt(i) - 97]++;
        }

        const getCountStr = (arr) => {
          const result = {};
          for (let c = 0; c < 26; c++) {
            if (arr[c] > 0) result[String.fromCharCode(97 + c)] = arr[c];
          }
          return JSON.stringify(result);
        };

        steps.push({
          stepId: 0, lineNumbers: [3, 5, 6, 7],
          shortLabel: "Build initial counts",
          explanation: `Build s1Count from '${s1}': ${getCountStr(s1Count)}. Build s2Count from first window '${s2.substring(0, m)}': ${getCountStr(s2Count)}.`,
          variables: { s1, s2, m, s1Count: getCountStr(s1Count), s2Count: getCountStr(s2Count) },
          dataStructure: {
            arrayStates: Object.fromEntries(s2.split("").map((_, i) => [i, i < m ? "active" : "default"])),
            pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: m - 1, color: "active" }],
            windowLeft: 0, windowRight: m - 1,
          },
          delta: { changedIndices: Array.from({ length: m }, (_, i) => i) }, isAnswer: false,
        });

        let matches = 0;
        for (let i = 0; i < 26; i++) {
          if (s1Count[i] === s2Count[i]) matches++;
        }

        steps.push({
          stepId: 1, lineNumbers: [10, 11, 12],
          shortLabel: `Count matches = ${matches}`,
          explanation: `Compare frequencies for each of 26 characters. ${matches} characters have matching counts between s1 and the first window.`,
          variables: { matches },
          dataStructure: {
            arrayStates: Object.fromEntries(s2.split("").map((_, i) => [i, i < m ? "active" : "default"])),
            pointers: [{ name: "left", index: 0, color: "pointer" }, { name: "right", index: m - 1, color: "active" }],
            windowLeft: 0, windowRight: m - 1,
          },
          delta: {}, isAnswer: false,
        });

        let left = 0;
        for (let right = m; right < n; right++) {
          if (matches === 26) {
            steps.push({
              stepId: steps.length, lineNumbers: [16, 17],
              shortLabel: `matches=26 → Return true!`,
              explanation: `All 26 character frequencies match! Window [${left}..${right - 1}] = '${s2.substring(left, right)}' is a permutation of '${s1}'. Return true.`,
              variables: { left, right, matches: 26, window: s2.substring(left, right), answer: "true" },
              dataStructure: {
                arrayStates: Object.fromEntries(s2.split("").map((_, i) => [i, i >= left && i < right ? "found" : i < left ? "visited" : "default"])),
                pointers: [{ name: "left", index: left, color: "pointer" }, { name: "right", index: right - 1, color: "active" }],
                windowLeft: left, windowRight: right - 1,
              },
              delta: {}, isAnswer: true,
            });
            return steps;
          }

          const addIdx = s2.charCodeAt(right) - 97;
          s2Count[addIdx]++;
          if (s2Count[addIdx] === s1Count[addIdx]) matches++;
          else if (s2Count[addIdx] === s1Count[addIdx] + 1) matches--;

          const remIdx = s2.charCodeAt(left) - 97;
          s2Count[remIdx]--;
          if (s2Count[remIdx] === s1Count[remIdx]) matches++;
          else if (s2Count[remIdx] === s1Count[remIdx] - 1) matches--;

          left++;

          steps.push({
            stepId: steps.length, lineNumbers: [19, 20, 21, 23, 24, 25, 27],
            shortLabel: `Slide: add '${s2[right]}', rem '${s2[left - 1]}' → matches=${matches}`,
            explanation: `Add '${s2[right]}' on right, remove '${s2[left - 1]}' on left. Window = '${s2.substring(left, right + 1)}'. matches=${matches}.`,
            variables: { left, right, matches, window: s2.substring(left, right + 1), s2Count: getCountStr(s2Count) },
            dataStructure: {
              arrayStates: Object.fromEntries(s2.split("").map((_, i) => [i, i >= left && i <= right ? "active" : i < left ? "visited" : "default"])),
              pointers: [{ name: "left", index: left, color: "pointer" }, { name: "right", index: right, color: "active" }],
              windowLeft: left, windowRight: right,
            },
            delta: { changedIndices: [left - 1, right], movedPointers: ["left", "right"] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [30],
          shortLabel: matches === 26 ? "matches=26 → Return true!" : "Return false",
          explanation: matches === 26
            ? `Final window [${left}..${n - 1}] = '${s2.substring(left)}' is a permutation of '${s1}'. Return true.`
            : `All windows checked. matches=${matches} ≠ 26. No permutation of '${s1}' found in '${s2}'. Return false.`,
          variables: { matches, answer: matches === 26 ? "true" : "false" },
          dataStructure: {
            arrayStates: Object.fromEntries(s2.split("").map((_, i) => [i, matches === 26 && i >= left && i < left + m ? "found" : "visited"])),
            pointers: [], windowLeft: left, windowRight: left + m - 1,
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n * m log m)", space: "O(m)", explanation: "For each of n-m+1 windows, sort the window of length m" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass over s2; frequency arrays are fixed size 26. Each slide is O(1) via the matches counter", tradeoff: "The matches counter avoids comparing all 26 entries on every slide" },
  },

  interviewTips: [
    "Start by clarifying: we want to find if ANY permutation of s1 is a substring of s2.",
    "Key realization: permutation = same character frequencies, so we never need to generate permutations.",
    "Mention the brute force (sorting each window) and its O(n * m log m) complexity.",
    "The matches counter optimization is what makes this truly O(n) — explain it clearly.",
    "Edge case: s1 longer than s2 — immediately return false.",
    "Edge case: s1 and the first window of s2 already match — test this.",
    "Be precise about when matches increments vs decrements: only when crossing the s1Count boundary.",
  ],

  relatedProblems: ["minimum-window-substring", "longest-substring-without-repeating", "longest-repeating-replacement"],
};
