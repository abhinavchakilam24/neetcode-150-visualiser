export const validAnagram = {
  id: 3,
  slug: "valid-anagram",
  title: "Valid Anagram",
  difficulty: "Easy",
  topic: "arrays-hashing",
  topicLabel: "Arrays & Hashing",
  neetcodeNumber: 3,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Meta", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/valid-anagram/",

  pattern: "Frequency Counting with HashMap",
  patternExplanation: `When comparing whether two collections have the same elements (regardless of order),
    count the frequency of each element. Two collections are equivalent if and only if every element
    appears the same number of times in both.`,

  intuition: {
    coreInsight: `An anagram is just a rearrangement — same letters, same counts, different order.
      If we count every character in string s and every character in string t, the two frequency maps
      must be identical. We can do this in one pass: increment for s, decrement for t. If every count
      returns to zero, the strings are anagrams. If any count is non-zero, they aren't.`,

    mentalModel: `Imagine you have two bags of Scrabble tiles. To check if they contain the same tiles,
      dump bag 1 onto the table and sort them into piles by letter. Then for each tile in bag 2,
      remove one from its matching pile. If every pile is empty at the end, the bags were identical.
      If any pile has leftovers or you can't find a match, they're different. The HashMap IS those piles.`,

    whyNaiveFails: `Sorting both strings and comparing them works but costs O(n log n) time. For
      very long strings (n = 1,000,000), that's ~20 million operations. Frequency counting does it
      in O(n) — exactly 2n operations — one pass through each string. That's a 10x improvement
      at scale.`,

    keyObservation: `If the two strings have different lengths, they cannot be anagrams — return false
      immediately. This early exit avoids unnecessary work. Also, for lowercase English letters only,
      a fixed-size array of 26 integers works just as well as a HashMap and is faster in practice.`,
  },

  problem: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.
    An anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
    using all the original letters exactly once.`,

  examples: [
    { input: 's = "anagram", t = "nagaram"', output: "true",  explanation: "Both contain: a(3), n(1), g(1), r(1), m(1)" },
    { input: 's = "rat", t = "car"',         output: "false", explanation: "'rat' has t but no c; 'car' has c but no t" },
  ],

  constraints: [
    "1 <= s.length, t.length <= 5 * 10^4",
    "s and t consist of lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "Sort and Compare",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: "Sort both strings alphabetically. If the sorted versions are identical, they are anagrams.",

      javaCode: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;

    char[] sArr = s.toCharArray();
    char[] tArr = t.toCharArray();
    Arrays.sort(sArr);
    Arrays.sort(tArr);

    return Arrays.equals(sArr, tArr);
}`,

      cppCode: `bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;

    sort(s.begin(), s.end());
    sort(t.begin(), t.end());

    return s == t;
}`,

      pythonCode: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    return sorted(s) == sorted(t)`,

      lineAnnotations: {
        2: "Early exit: different lengths can never be anagrams",
        4: "Convert string s to character array for sorting",
        5: "Convert string t to character array for sorting",
        6: "Sort s alphabetically — O(n log n)",
        7: "Sort t alphabetically — O(n log n)",
        9: "Compare sorted arrays — if equal, it's an anagram",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "cat", t: "tac" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Length check",
              explanation: "Both strings have length 3. Lengths match, so we proceed — they could still be anagrams.",
              variables: { "s.length": 3, "t.length": 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "Sort both strings",
              explanation: "Sort s='cat' → 'act'. Sort t='tac' → 'act'. Both are now in alphabetical order so we can compare directly.",
              variables: { s: "cat", t: "tac", "sorted(s)": "act", "sorted(t)": "act" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9],
              shortLabel: "'act' == 'act' → true",
              explanation: "The sorted strings are identical: 'act' == 'act'. Therefore t is an anagram of s. Return true.",
              variables: { "sorted(s)": "act", "sorted(t)": "act", answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, t }) {
        const steps = [];

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Length check",
          explanation: `s has length ${s.length}, t has length ${t.length}. ${s.length !== t.length ? "Different lengths — cannot be anagrams. Return false." : "Lengths match, proceed to sort."}`,
          variables: { "s.length": s.length, "t.length": t.length },
          dataStructure: {
            arrayStates: Object.fromEntries([...s].map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        if (s.length !== t.length) {
          steps.push({
            stepId: 1, lineNumbers: [2],
            shortLabel: "Return false",
            explanation: `Lengths differ (${s.length} vs ${t.length}). Anagrams must use all letters exactly once, so different lengths means impossible. Return false.`,
            variables: { "s.length": s.length, "t.length": t.length, answer: "false" },
            dataStructure: {
              arrayStates: Object.fromEntries([...s].map((_, i) => [i, "eliminated"])),
              pointers: [],
              hashMap: {},
            },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const sortedS = [...s].sort().join("");
        const sortedT = [...t].sort().join("");

        steps.push({
          stepId: 1, lineNumbers: [4, 5, 6, 7],
          shortLabel: "Sort both strings",
          explanation: `Sort s='${s}' → '${sortedS}'. Sort t='${t}' → '${sortedT}'.`,
          variables: { s, t, "sorted(s)": sortedS, "sorted(t)": sortedT },
          dataStructure: {
            arrayStates: Object.fromEntries([...s].map((_, i) => [i, "active"])),
            pointers: [],
            hashMap: {},
          },
          delta: { changedIndices: [...s].map((_, i) => i) }, isAnswer: false,
        });

        const isAnagram = sortedS === sortedT;
        steps.push({
          stepId: 2, lineNumbers: [9],
          shortLabel: `'${sortedS}' ${isAnagram ? "==" : "!="} '${sortedT}' → ${isAnagram}`,
          explanation: `Sorted strings ${isAnagram ? "are identical" : "differ"}: '${sortedS}' ${isAnagram ? "==" : "!="} '${sortedT}'. Return ${isAnagram}.`,
          variables: { "sorted(s)": sortedS, "sorted(t)": sortedT, answer: String(isAnagram) },
          dataStructure: {
            arrayStates: Object.fromEntries([...s].map((_, i) => [i, isAnagram ? "found" : "eliminated"])),
            pointers: [],
            hashMap: {},
          },
          delta: { changedIndices: [...s].map((_, i) => i) }, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Frequency Count (HashMap)",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Count character frequencies for s (increment) and t (decrement) in a single HashMap.
        If all counts are zero at the end, the strings are anagrams. Space is O(1) because the
        alphabet is fixed at 26 lowercase letters.`,

      javaCode: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;

    int[] count = new int[26];

    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }

    for (int c : count) {
        if (c != 0) return false;
    }

    return true;
}`,

      cppCode: `bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;

    int count[26] = {0};

    for (int i = 0; i < s.length(); i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }

    for (int c : count) {
        if (c != 0) return false;
    }

    return true;
}`,

      pythonCode: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    count = {}

    for i in range(len(s)):
        count[s[i]] = count.get(s[i], 0) + 1
        count[t[i]] = count.get(t[i], 0) - 1

    for val in count.values():
        if val != 0:
            return False

    return True`,

      lineAnnotations: {
        2:  "Early exit: different lengths means not an anagram",
        4:  "Frequency array — 26 slots for lowercase letters",
        6:  "Single pass through both strings simultaneously",
        7:  "Increment count for character from s",
        8:  "Decrement count for character from t",
        11: "Check every count — all must be zero for anagram",
        12: "Non-zero count means character mismatch",
        15: "All counts zero — it's a valid anagram",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Simple anagram — all characters balance out",
          input: { s: "anagram", t: "nagaram" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Length check: 7 == 7",
              explanation: "Both s='anagram' and t='nagaram' have length 7. Lengths match, so we proceed to count character frequencies.",
              variables: { "s.length": 7, "t.length": 7 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Init frequency map",
              explanation: "Create an empty frequency map. We'll increment for each character in s and decrement for each character in t. If all counts return to zero, we have an anagram.",
              variables: { i: "-", count: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=0: s[0]='a' +1, t[0]='n' -1",
              explanation: "Process index 0. s[0]='a': increment count['a'] to 1. t[0]='n': decrement count['n'] to -1. The map tracks the balance between s and t for each character.",
              variables: { i: 0, "s[i]": "a", "t[i]": "n", count: "{a:1, n:-1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { a: { value: 1, isNew: true }, n: { value: -1, isNew: true } },
              },
              delta: { changedIndices: [0], movedPointers: ["i"], mapAdded: [{ key: "a", value: 1 }, { key: "n", value: -1 }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=1: s[1]='n' +1, t[1]='a' -1",
              explanation: "Process index 1. s[1]='n': increment count['n'] from -1 to 0. t[1]='a': decrement count['a'] from 1 to 0. Both 'a' and 'n' are now balanced at zero — they appear equally in both strings so far.",
              variables: { i: 1, "s[i]": "n", "t[i]": "a", count: "{a:0, n:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { a: { value: 0, isHighlighted: true }, n: { value: 0, isHighlighted: true } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=2: s[2]='a' +1, t[2]='g' -1",
              explanation: "Process index 2. s[2]='a': increment count['a'] from 0 to 1. t[2]='g': decrement count['g'] to -1. The 'a' imbalance returns, and 'g' is now owed by s.",
              variables: { i: 2, "s[i]": "a", "t[i]": "g", count: "{a:1, n:0, g:-1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { a: { value: 1 }, n: { value: 0 }, g: { value: -1, isNew: true } },
              },
              delta: { changedIndices: [2], movedPointers: ["i"], mapAdded: [{ key: "g", value: -1 }] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=3: s[3]='g' +1, t[3]='a' -1",
              explanation: "Process index 3. s[3]='g': increment count['g'] from -1 to 0. t[3]='a': decrement count['a'] from 1 to 0. Both balanced again.",
              variables: { i: 3, "s[i]": "g", "t[i]": "a", count: "{a:0, n:0, g:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { a: { value: 0, isHighlighted: true }, n: { value: 0 }, g: { value: 0, isHighlighted: true } },
              },
              delta: { changedIndices: [3], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=4: s[4]='r' +1, t[4]='r' -1",
              explanation: "Process index 4. s[4]='r': increment count['r'] to 1. t[4]='r': immediately decrement it back to 0. Same character at this position — instant cancellation.",
              variables: { i: 4, "s[i]": "r", "t[i]": "r", count: "{a:0, n:0, g:0, r:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                hashMap: { a: { value: 0 }, n: { value: 0 }, g: { value: 0 }, r: { value: 0, isNew: true } },
              },
              delta: { changedIndices: [4], movedPointers: ["i"], mapAdded: [{ key: "r", value: 0 }] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=5: s[5]='a' +1, t[5]='a' -1",
              explanation: "Process index 5. s[5]='a' and t[5]='a' — same character again. count['a'] stays at 0.",
              variables: { i: 5, "s[i]": "a", "t[i]": "a", count: "{a:0, n:0, g:0, r:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active", 6: "default" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                hashMap: { a: { value: 0 }, n: { value: 0 }, g: { value: 0 }, r: { value: 0 } },
              },
              delta: { changedIndices: [5], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=6: s[6]='m' +1, t[6]='m' -1",
              explanation: "Process index 6. s[6]='m' and t[6]='m' — same character. count['m'] stays at 0. We've processed every character.",
              variables: { i: 6, "s[i]": "m", "t[i]": "m", count: "{a:0, n:0, g:0, r:0, m:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "active" },
                pointers: [{ name: "i", index: 6, color: "pointer" }],
                hashMap: { a: { value: 0 }, n: { value: 0 }, g: { value: 0 }, r: { value: 0 }, m: { value: 0, isNew: true } },
              },
              delta: { changedIndices: [6], movedPointers: ["i"], mapAdded: [{ key: "m", value: 0 }] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [11, 12, 15],
              shortLabel: "All counts zero → true",
              explanation: "Check every count in the map: a=0, n=0, g=0, r=0, m=0. Every character appears the same number of times in both strings. Return true — 'nagaram' is a valid anagram of 'anagram'.",
              variables: { count: "{a:0, n:0, g:0, r:0, m:0}", answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "found" },
                pointers: [],
                hashMap: { a: { value: 0, isHighlighted: true }, n: { value: 0, isHighlighted: true }, g: { value: 0, isHighlighted: true }, r: { value: 0, isHighlighted: true }, m: { value: 0, isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1, 2, 3, 4, 5, 6] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Not Anagram",
          description: "Same length but different character sets — 'rat' vs 'car'",
          input: { s: "rat", t: "car" },
          expectedOutput: "false",
          commonMistake: "Forgetting to check all 26 counts. Some students only check characters that appear in s, missing extra characters in t that don't appear in s at all.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Length check: 3 == 3",
              explanation: "Both s='rat' and t='car' have length 3. Lengths match, but that doesn't guarantee an anagram — we need to verify character frequencies.",
              variables: { "s.length": 3, "t.length": 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Init frequency map",
              explanation: "Create an empty frequency map to track the balance between s and t.",
              variables: { i: "-", count: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=0: s[0]='r' +1, t[0]='c' -1",
              explanation: "Process index 0. s[0]='r': count['r']=1. t[0]='c': count['c']=-1. Already we see different characters — 'r' is in s but 'c' is in t at this position.",
              variables: { i: 0, "s[i]": "r", "t[i]": "c", count: "{r:1, c:-1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { r: { value: 1, isNew: true }, c: { value: -1, isNew: true } },
              },
              delta: { changedIndices: [0], movedPointers: ["i"], mapAdded: [{ key: "r", value: 1 }, { key: "c", value: -1 }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=1: s[1]='a' +1, t[1]='a' -1",
              explanation: "Process index 1. s[1]='a' and t[1]='a' — same character. count['a'] increments to 1, then decrements to 0. This character is balanced.",
              variables: { i: 1, "s[i]": "a", "t[i]": "a", count: "{r:1, c:-1, a:0}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { r: { value: 1 }, c: { value: -1 }, a: { value: 0, isNew: true } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"], mapAdded: [{ key: "a", value: 0 }] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=2: s[2]='t' +1, t[2]='r' -1",
              explanation: "Process index 2. s[2]='t': count['t']=1. t[2]='r': count['r'] decrements from 1 to 0. The 'r' balanced out, but now 't' has a surplus.",
              variables: { i: 2, "s[i]": "t", "t[i]": "r", count: "{r:0, c:-1, a:0, t:1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { r: { value: 0, isHighlighted: true }, c: { value: -1 }, a: { value: 0 }, t: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [2], movedPointers: ["i"], mapAdded: [{ key: "t", value: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 12],
              shortLabel: "c=-1 ≠ 0 → false",
              explanation: "Check counts: r=0 (ok), but c=-1 (not zero!). Character 'c' appears in t but not in s. This means t has a character that s doesn't — not an anagram. Return false.",
              variables: { count: "{r:0, c:-1, a:0, t:1}", answer: "false" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated" },
                pointers: [],
                hashMap: { r: { value: 0 }, c: { value: -1, isHighlighted: true }, a: { value: 0 }, t: { value: 1, isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Different Lengths",
          description: "Strings of different lengths — instant rejection",
          input: { s: "ab", t: "abc" },
          expectedOutput: "false",
          commonMistake: "Not checking lengths first and running the full algorithm. With different lengths, s and t can never be anagrams since anagrams must use ALL original letters exactly once.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Length check: 2 ≠ 3",
              explanation: "s='ab' has length 2, t='abc' has length 3. Different lengths — an anagram must use every letter exactly once, so different lengths make it impossible. Return false immediately.",
              variables: { "s.length": 2, "t.length": 3, answer: "false" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },

        edgeCase3: {
          id: "edgeCase3",
          label: "Single Character",
          description: "Minimal valid input — single character strings",
          input: { s: "a", t: "a" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Length check: 1 == 1",
              explanation: "Both strings have length 1. Proceed to frequency counting.",
              variables: { "s.length": 1, "t.length": 1 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Init frequency map",
              explanation: "Empty frequency map. With single-character strings, one iteration will tell us everything.",
              variables: { i: "-", count: "{}" },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=0: s[0]='a' +1, t[0]='a' -1",
              explanation: "Process index 0. s[0]='a': count['a']=1. t[0]='a': count['a'] decrements to 0. Same character — perfectly balanced.",
              variables: { i: 0, "s[i]": "a", "t[i]": "a", count: "{a:0}" },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { a: { value: 0, isNew: true } },
              },
              delta: { changedIndices: [0], movedPointers: ["i"], mapAdded: [{ key: "a", value: 0 }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11, 12, 15],
              shortLabel: "All counts zero → true",
              explanation: "Check counts: a=0. Every character balances out. Return true — 'a' is trivially an anagram of 'a'.",
              variables: { count: "{a:0}", answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                hashMap: { a: { value: 0, isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, t }) {
        const steps = [];
        const sChars = [...s];
        const tChars = [...t];
        const n = s.length;

        // Step 0: Length check
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `Length check: ${s.length} ${s.length === t.length ? "==" : "≠"} ${t.length}`,
          explanation: `s='${s}' has length ${s.length}, t='${t}' has length ${t.length}. ${s.length !== t.length ? "Different lengths — cannot be anagrams. Return false immediately." : "Lengths match, proceed to count frequencies."}`,
          variables: { "s.length": s.length, "t.length": t.length },
          dataStructure: {
            arrayStates: Object.fromEntries(sChars.map((_, i) => [i, s.length !== t.length ? "eliminated" : "default"])),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: s.length !== t.length,
        });

        if (s.length !== t.length) {
          return steps;
        }

        // Step 1: Init
        steps.push({
          stepId: 1, lineNumbers: [4],
          shortLabel: "Init frequency map",
          explanation: "Create an empty frequency map. We'll increment for each character in s and decrement for each character in t.",
          variables: { i: "-", count: "{}" },
          dataStructure: {
            arrayStates: Object.fromEntries(sChars.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        // Process each character
        const count = {};
        for (let i = 0; i < n; i++) {
          const sc = sChars[i];
          const tc = tChars[i];

          count[sc] = (count[sc] || 0) + 1;
          count[tc] = (count[tc] || 0) - 1;

          const countStr = JSON.stringify(count);
          const hmEntries = {};
          for (const [k, v] of Object.entries(count)) {
            hmEntries[k] = {
              value: v,
              isNew: (k === sc && i === 0) || (k === tc && i === 0) ||
                     (k === sc && count[sc] === 1 && !Object.keys(count).includes(sc)) ||
                     (k === tc && !(tc in count)),
            };
          }

          // Determine which keys are newly added this step
          const newKeys = [];
          if (sc === tc) {
            if (i === 0 || (count[sc] === 0 && !steps.some(st => {
              const hm = st.dataStructure?.hashMap;
              return hm && sc in hm;
            }))) {
              newKeys.push(sc);
            }
          } else {
            // Check if sc or tc are appearing in the map for the first time
          }

          const hashMap = {};
          for (const [k, v] of Object.entries(count)) {
            hashMap[k] = { value: v };
          }

          steps.push({
            stepId: steps.length, lineNumbers: [6, 7, 8],
            shortLabel: `i=${i}: s[${i}]='${sc}' +1, t[${i}]='${tc}' -1`,
            explanation: `Process index ${i}. s[${i}]='${sc}': increment count['${sc}'] to ${count[sc]}. t[${i}]='${tc}': decrement count['${tc}'] to ${count[tc]}.${sc === tc ? " Same character at this position — instant cancellation." : ""}`,
            variables: { i, "s[i]": sc, "t[i]": tc, count: countStr },
            dataStructure: {
              arrayStates: Object.fromEntries(sChars.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap,
            },
            delta: { changedIndices: [i], movedPointers: ["i"] }, isAnswer: false,
          });
        }

        // Final check
        const allZero = Object.values(count).every(v => v === 0);
        const nonZeroKeys = Object.entries(count).filter(([, v]) => v !== 0);
        const hashMapFinal = {};
        for (const [k, v] of Object.entries(count)) {
          hashMapFinal[k] = { value: v, isHighlighted: true };
        }

        if (allZero) {
          steps.push({
            stepId: steps.length, lineNumbers: [11, 12, 15],
            shortLabel: "All counts zero → true",
            explanation: `Check every count in the map: ${Object.entries(count).map(([k, v]) => `${k}=${v}`).join(", ")}. Every character appears the same number of times in both strings. Return true.`,
            variables: { count: JSON.stringify(count), answer: "true" },
            dataStructure: {
              arrayStates: Object.fromEntries(sChars.map((_, i) => [i, "found"])),
              pointers: [],
              hashMap: hashMapFinal,
            },
            delta: { changedIndices: sChars.map((_, i) => i) }, isAnswer: true,
          });
        } else {
          steps.push({
            stepId: steps.length, lineNumbers: [11, 12],
            shortLabel: `${nonZeroKeys[0][0]}=${nonZeroKeys[0][1]} ≠ 0 → false`,
            explanation: `Check counts: found ${nonZeroKeys.map(([k, v]) => `'${k}'=${v}`).join(", ")} — not zero. The character frequencies don't match. Return false.`,
            variables: { count: JSON.stringify(count), answer: "false" },
            dataStructure: {
              arrayStates: Object.fromEntries(sChars.map((_, i) => [i, "eliminated"])),
              pointers: [],
              hashMap: hashMapFinal,
            },
            delta: { changedIndices: sChars.map((_, i) => i) }, isAnswer: true,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n)", space: "O(n)", explanation: "Sorting both strings dominates; toCharArray creates O(n) copy" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass through both strings; fixed 26-slot frequency array is O(1) space", tradeoff: "Using a frequency array avoids the O(n log n) sorting cost entirely" },
  },

  interviewTips: [
    "Start with the brute force (sort + compare) and state it's O(n log n).",
    "Transition to frequency counting — explain why O(n) is better at scale.",
    "Ask: 'Are we limited to lowercase English letters, or could it be Unicode?'",
    "If Unicode, mention that a HashMap is needed instead of a 26-slot array.",
    "Mention the early exit on different lengths — shows attention to edge cases.",
    "Explain that O(1) space applies because the alphabet is a fixed constant (26 letters).",
  ],

  relatedProblems: ["group-anagrams", "contains-duplicate"],
};
