export const minimumWindowSubstring = {
  id: 19,
  slug: "minimum-window-substring",
  title: "Minimum Window Substring",
  difficulty: "Hard",
  topic: "sliding-window",
  topicLabel: "Sliding Window",
  neetcodeNumber: 19,
  artifactType: "SlidingWindow",
  companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple", "LinkedIn"],
  leetcodeLink: "https://leetcode.com/problems/minimum-window-substring/",

  pattern: "Sliding Window with Character Frequency Map",
  patternExplanation: `When searching for a substring that satisfies a condition involving character counts,
    expand the window right to include characters and contract from the left to find the minimum valid window.
    Two frequency maps (or a single map with a "formed" counter) track when all required characters are present.`,

  intuition: {
    coreInsight: `We need the smallest substring of s that contains every character in t (including duplicates).
      Brute force checks all O(n^2) substrings. But notice: once a window contains all characters of t, we can
      only improve by shrinking from the left. And if shrinking makes it invalid, we expand right again. This
      "expand right, shrink left" dance is the sliding window pattern. A frequency map tracks how many of each
      required character we still need — when all counts hit zero or below, we have a valid window.`,

    mentalModel: `Imagine you're scanning a bookshelf for a section that contains at least one copy of every book
      on your reading list. You slide your right hand further along the shelf, picking up books. Once you have
      them all, you slide your left hand inward to find the tightest possible section. If you lose a required
      book, you extend right again. The window always moves forward — you never backtrack. That's why it's O(n).`,

    whyNaiveFails: `Brute force generates all O(n^2) substrings and checks each one against t's character
      frequencies in O(m) time, giving O(n^2 * m). For s of length 100,000, that's 10 billion operations.
      The sliding window does it in O(n + m) — each character is visited at most twice (once by right, once by left).`,

    keyObservation: `Maintain a counter "formed" that tracks how many unique characters in t have their required
      frequency met in the current window. When formed equals the number of unique characters in t, the window
      is valid. This avoids re-scanning the entire frequency map on every step — we update formed incrementally
      as characters enter and leave the window.`,
  },

  problem: `Given two strings s and t of lengths m and n respectively, return the minimum window substring
    of s such that every character in t (including duplicates) is included in the window. If there is no
    such substring, return the empty string "". The answer is guaranteed to be unique.`,

  examples: [
    { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: "The minimum window substring 'BANC' includes 'A', 'B', and 'C' from string t." },
    { input: 's = "a", t = "a"', output: '"a"', explanation: "The entire string s is the minimum window." },
    { input: 's = "a", t = "aa"', output: '""', explanation: "Both 'a's from t must be in the window. Since s only has one 'a', return empty string." },
  ],

  constraints: [
    "m == s.length, n == t.length",
    "1 <= m, n <= 10^5",
    "s and t consist of uppercase and lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n^2 * m)",
      spaceComplexity: "O(m)",
      idea: "Check every possible substring of s and verify if it contains all characters of t. Track the minimum valid one.",

      javaCode: `public String minWindow(String s, String t) {
    if (s.length() < t.length()) return "";
    Map<Character, Integer> tCount = new HashMap<>();
    for (char c : t.toCharArray()) tCount.merge(c, 1, Integer::sum);
    String result = "";
    int minLen = Integer.MAX_VALUE;
    for (int i = 0; i < s.length(); i++) {
        Map<Character, Integer> windowCount = new HashMap<>();
        for (int j = i; j < s.length(); j++) {
            windowCount.merge(s.charAt(j), 1, Integer::sum);
            if (j - i + 1 >= t.length() && containsAll(windowCount, tCount)) {
                if (j - i + 1 < minLen) {
                    minLen = j - i + 1;
                    result = s.substring(i, j + 1);
                }
                break;
            }
        }
    }
    return result;
}
private boolean containsAll(Map<Character, Integer> win, Map<Character, Integer> req) {
    for (var e : req.entrySet())
        if (win.getOrDefault(e.getKey(), 0) < e.getValue()) return false;
    return true;
}`,

      cppCode: `string minWindow(string s, string t) {
    if (s.size() < t.size()) return "";
    unordered_map<char, int> tCount;
    for (char c : t) tCount[c]++;
    string result = "";
    int minLen = INT_MAX;
    for (int i = 0; i < s.size(); i++) {
        unordered_map<char, int> windowCount;
        for (int j = i; j < s.size(); j++) {
            windowCount[s[j]]++;
            if (j - i + 1 >= t.size()) {
                bool valid = true;
                for (auto& [c, cnt] : tCount)
                    if (windowCount[c] < cnt) { valid = false; break; }
                if (valid && j - i + 1 < minLen) {
                    minLen = j - i + 1;
                    result = s.substr(i, j - i + 1);
                    break;
                }
            }
        }
    }
    return result;
}`,

      pythonCode: `def minWindow(s: str, t: str) -> str:
    if len(s) < len(t):
        return ""
    from collections import Counter
    t_count = Counter(t)
    result = ""
    min_len = float('inf')
    for i in range(len(s)):
        window_count = Counter()
        for j in range(i, len(s)):
            window_count[s[j]] += 1
            if j - i + 1 >= len(t):
                if all(window_count[c] >= t_count[c] for c in t_count):
                    if j - i + 1 < min_len:
                        min_len = j - i + 1
                        result = s[i:j+1]
                    break
    return result`,

      lineAnnotations: {
        3: "Count frequency of each character in t",
        7: "Outer loop: try every starting index",
        9: "Inner loop: extend window from i to j",
        10: "Add s[j] to window frequency count",
        11: "Check if window contains all of t's characters",
        13: "Update minimum if this window is smaller",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "ADOBECODEBANC", t: "ABC" },
          expectedOutput: '"BANC"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Count t chars",
              explanation: "Build frequency map for t='ABC': {A:1, B:1, C:1}. We need at least one of each in our window.",
              variables: { tCount: "{A:1,B:1,C:1}", result: '""', minLen: "INF" },
              dataStructure: {
                arrayStates: Object.fromEntries("ADOBECODEBANC".split("").map((_, i) => [i, "default"])),
                pointers: [],
                windowLeft: -1,
                windowRight: -1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 9, 10, 11],
              shortLabel: "i=0: expand to find ABC",
              explanation: "Starting at i=0. Expand j from 0 rightward. At j=5 (char 'C'), window 'ADOBEC' contains A, B, C. Length=6.",
              variables: { i: 0, j: 5, window: "ADOBEC", minLen: 6, result: '"ADOBEC"' },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default", 12: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 5, color: "active" }],
                windowLeft: 0,
                windowRight: 5,
                windowMeta: "len=6, has ABC",
              },
              delta: { changedIndices: [0, 1, 2, 3, 4, 5] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 9, 10, 11],
              shortLabel: "i=5: expand to find ABC",
              explanation: "Starting at i=5. Expand j. At j=10 (char 'A'), window 'CODEBANC' wait — at j=12 (char 'C'), window 'CODEBANC' from i=5... Actually we find 'BANC' at i=9. Brute force tries every starting point — this is why it's O(n^2).",
              variables: { i: 9, j: 12, window: "BANC", minLen: 4, result: '"BANC"' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited", 8: "visited", 9: "found", 10: "found", 11: "found", 12: "found" },
                pointers: [{ name: "i", index: 9, color: "pointer" }, { name: "j", index: 12, color: "active" }],
                windowLeft: 9,
                windowRight: 12,
                windowMeta: "len=4, has ABC",
              },
              delta: { changedIndices: [9, 10, 11, 12] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [18],
              shortLabel: 'Return "BANC"',
              explanation: "After checking all starting positions, the minimum window is 'BANC' with length 4. Brute force found it but took O(n^2) time.",
              variables: { result: '"BANC"', minLen: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited", 8: "visited", 9: "found", 10: "found", 11: "found", 12: "found" },
                pointers: [],
                windowLeft: 9,
                windowRight: 12,
                windowMeta: 'min="BANC", len=4',
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, t }) {
        const steps = [];
        const n = s.length;
        const tCount = {};
        for (const c of t) tCount[c] = (tCount[c] || 0) + 1;
        const uniqueT = Object.keys(tCount).length;

        steps.push({
          stepId: 0, lineNumbers: [3],
          shortLabel: "Count t chars",
          explanation: `Build frequency map for t='${t}': ${JSON.stringify(tCount)}.`,
          variables: { tCount: JSON.stringify(tCount), result: '""', minLen: "INF" },
          dataStructure: {
            arrayStates: Object.fromEntries(s.split("").map((_, i) => [i, "default"])),
            pointers: [], windowLeft: -1, windowRight: -1,
          },
          delta: {}, isAnswer: false,
        });

        let result = "";
        let minLen = Infinity;
        for (let i = 0; i < n; i++) {
          const windowCount = {};
          for (let j = i; j < n; j++) {
            windowCount[s[j]] = (windowCount[s[j]] || 0) + 1;
            if (j - i + 1 >= t.length) {
              let valid = true;
              for (const c of Object.keys(tCount)) {
                if ((windowCount[c] || 0) < tCount[c]) { valid = false; break; }
              }
              if (valid) {
                if (j - i + 1 < minLen) {
                  minLen = j - i + 1;
                  result = s.substring(i, j + 1);
                  const states = {};
                  for (let k = 0; k < n; k++) states[k] = k >= i && k <= j ? "active" : (k < i ? "visited" : "default");
                  steps.push({
                    stepId: steps.length, lineNumbers: [11, 13],
                    shortLabel: `i=${i},j=${j}: "${result}" len=${minLen}`,
                    explanation: `Window s[${i}..${j}]="${result}" contains all chars of t. Length=${minLen}.`,
                    variables: { i, j, window: `"${result}"`, minLen, result: `"${result}"` },
                    dataStructure: { arrayStates: states, pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }], windowLeft: i, windowRight: j, windowMeta: `len=${minLen}` },
                    delta: { changedIndices: [i, j] }, isAnswer: false,
                  });
                }
                break;
              }
            }
          }
        }

        const finalStates = {};
        if (result) {
          const start = s.indexOf(result);
          for (let k = 0; k < n; k++) finalStates[k] = k >= start && k < start + result.length ? "found" : "visited";
        } else {
          for (let k = 0; k < n; k++) finalStates[k] = "visited";
        }
        steps.push({
          stepId: steps.length, lineNumbers: [18],
          shortLabel: result ? `Return "${result}"` : 'Return ""',
          explanation: result ? `Minimum window is "${result}" with length ${minLen}.` : "No valid window found.",
          variables: { result: `"${result}"`, minLen: minLen === Infinity ? "INF" : minLen },
          dataStructure: { arrayStates: finalStates, pointers: [], windowLeft: result ? s.indexOf(result) : -1, windowRight: result ? s.indexOf(result) + result.length - 1 : -1 },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sliding Window with Two Pointers",
      tier: "optimal",
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(m)",
      idea: `Use two pointers (left, right) to maintain a sliding window. Expand right to include characters
        until the window is valid (contains all of t). Then shrink left to minimize the window while it remains
        valid. Track the minimum valid window seen. Each character enters and leaves the window at most once.`,

      javaCode: `public String minWindow(String s, String t) {
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
    int required = need.size();
    int formed = 0;
    Map<Character, Integer> window = new HashMap<>();
    int[] ans = {-1, 0, 0};
    int left = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        window.merge(c, 1, Integer::sum);
        if (need.containsKey(c) && window.get(c).intValue() == need.get(c).intValue())
            formed++;
        while (formed == required) {
            if (ans[0] == -1 || right - left + 1 < ans[0]) {
                ans[0] = right - left + 1;
                ans[1] = left;
                ans[2] = right;
            }
            char d = s.charAt(left);
            window.merge(d, -1, Integer::sum);
            if (need.containsKey(d) && window.get(d) < need.get(d))
                formed--;
            left++;
        }
    }
    return ans[0] == -1 ? "" : s.substring(ans[1], ans[2] + 1);
}`,

      cppCode: `string minWindow(string s, string t) {
    unordered_map<char, int> need;
    for (char c : t) need[c]++;
    int required = need.size();
    int formed = 0;
    unordered_map<char, int> window;
    int ansLen = -1, ansL = 0, ansR = 0;
    int left = 0;
    for (int right = 0; right < s.size(); right++) {
        char c = s[right];
        window[c]++;
        if (need.count(c) && window[c] == need[c])
            formed++;
        while (formed == required) {
            if (ansLen == -1 || right - left + 1 < ansLen) {
                ansLen = right - left + 1;
                ansL = left;
                ansR = right;
            }
            char d = s[left];
            window[d]--;
            if (need.count(d) && window[d] < need[d])
                formed--;
            left++;
        }
    }
    return ansLen == -1 ? "" : s.substr(ansL, ansLen);
}`,

      pythonCode: `def minWindow(s: str, t: str) -> str:
    from collections import Counter
    need = Counter(t)
    required = len(need)
    formed = 0
    window = {}
    ans = (float('inf'), 0, 0)
    left = 0
    for right in range(len(s)):
        c = s[right]
        window[c] = window.get(c, 0) + 1
        if c in need and window[c] == need[c]:
            formed += 1
        while formed == required:
            if right - left + 1 < ans[0]:
                ans = (right - left + 1, left, right)
            d = s[left]
            window[d] -= 1
            if d in need and window[d] < need[d]:
                formed -= 1
            left += 1
    return "" if ans[0] == float('inf') else s[ans[1]:ans[2]+1]`,

      lineAnnotations: {
        2:  "Build frequency map of characters needed from t",
        3:  "required = number of unique chars in t that must be satisfied",
        4:  "formed = how many unique chars currently have enough count in window",
        5:  "window = frequency map for current sliding window",
        8:  "Expand window by moving right pointer",
        10: "Add right character to window frequency",
        11: "If this character's count now matches the needed count, increment formed",
        13: "While window is valid (has all needed chars), try to shrink",
        14: "Update answer if current window is smaller",
        19: "Remove left character from window",
        20: "If removing it breaks the requirement, decrement formed",
        22: "Shrink window by advancing left pointer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Classic example: s="ADOBECODEBANC", t="ABC"',
          input: { s: "ADOBECODEBANC", t: "ABC" },
          expectedOutput: '"BANC"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Build need map",
              explanation: "Parse t='ABC'. need={A:1, B:1, C:1}. required=3 unique characters must be satisfied. formed=0 so far.",
              variables: { need: "{A:1,B:1,C:1}", required: 3, formed: 0, left: 0, right: "-", window: "{}", ans: "none" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default", 12: "default" },
                pointers: [],
                windowLeft: -1,
                windowRight: -1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 10],
              shortLabel: "right=0: add 'A'",
              explanation: "Expand right to 0, char='A'. window={A:1}. A's count (1) matches need (1), so formed becomes 1. Window not yet valid (formed=1 < required=3).",
              variables: { left: 0, right: 0, "s[right]": "A", window: "{A:1}", formed: 1, required: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default", 12: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 0, color: "active" }],
                windowLeft: 0,
                windowRight: 0,
                windowMeta: "formed=1/3",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 10],
              shortLabel: "right=1,2,3: D,O,B",
              explanation: "Expand right through indices 1('D'), 2('O'), 3('B'). D and O aren't in need — formed stays 1. At index 3, 'B' matches need, formed becomes 2. Still not valid (2 < 3).",
              variables: { left: 0, right: 3, "s[right]": "B", window: "{A:1,D:1,O:1,B:1}", formed: 2, required: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default", 12: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 3, color: "active" }],
                windowLeft: 0,
                windowRight: 3,
                windowMeta: "formed=2/3",
              },
              delta: { changedIndices: [1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 10, 11],
              shortLabel: "right=4,5: E,C → valid!",
              explanation: "right=4 adds 'E' (not needed). right=5 adds 'C' — window={A:1,D:1,O:1,B:1,E:1,C:1}. C matches need, formed=3=required. Window 'ADOBEC' (length 6) is valid!",
              variables: { left: 0, right: 5, window: "{A:1,D:1,O:1,B:1,E:1,C:1}", formed: 3, required: 3, ans: '"ADOBEC" len=6' },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default", 12: "default" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 5, color: "active" }],
                windowLeft: 0,
                windowRight: 5,
                windowMeta: "VALID! len=6",
              },
              delta: { changedIndices: [4, 5] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13, 14, 19, 22],
              shortLabel: "Shrink left: remove A",
              explanation: "Window is valid. Record ans='ADOBEC' (len=6). Now try to shrink. Remove s[0]='A' from window. A's count drops to 0 < need=1, so formed drops to 2. Window invalid — stop shrinking. left=1.",
              variables: { left: 1, right: 5, "removed": "A", window: "{D:1,O:1,B:1,E:1,C:1}", formed: 2, ans: '"ADOBEC" len=6' },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default", 12: "default" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 5, color: "active" }],
                windowLeft: 1,
                windowRight: 5,
                windowMeta: "INVALID, formed=2/3",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [8, 10],
              shortLabel: "right=6,7,8,9: O,D,E,B",
              explanation: "Keep expanding right. Add O(6), D(7), E(8), B(9). None are the missing 'A', so formed stays 2. Window still invalid.",
              variables: { left: 1, right: 9, window: "{D:2,O:2,B:2,E:2,C:1}", formed: 2, required: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active", 7: "active", 8: "active", 9: "active", 10: "default", 11: "default", 12: "default" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 9, color: "active" }],
                windowLeft: 1,
                windowRight: 9,
                windowMeta: "formed=2/3",
              },
              delta: { changedIndices: [6, 7, 8, 9] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [8, 10, 11],
              shortLabel: "right=10: add 'A' → valid!",
              explanation: "right=10, char='A'. window now has A:1 which matches need. formed=3=required. Window s[1..10]='DOBECODEBA' is valid but length 10 > current best 6. Don't update ans.",
              variables: { left: 1, right: 10, window: "{D:2,O:2,B:2,E:2,C:1,A:1}", formed: 3, ans: '"ADOBEC" len=6' },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active", 7: "active", 8: "active", 9: "active", 10: "active", 11: "default", 12: "default" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 10, color: "active" }],
                windowLeft: 1,
                windowRight: 10,
                windowMeta: "VALID! len=10",
              },
              delta: { changedIndices: [10] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [13, 19, 20, 22],
              shortLabel: "Shrink left to 6",
              explanation: "Shrink left: remove D(1), O(2), B(3)—wait, removing B makes B's count drop to 1 which still >= need=1. Remove E(4)—still valid. Remove C(5)—C's count drops to 0 < need=1, formed=2. Stop at left=6. Window s[5..10] was the last valid, len=6 ties best. Actually the shrink removes characters until formed < required.",
              variables: { left: 6, right: 10, formed: 2, ans: '"ADOBEC" len=6' },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "active", 7: "active", 8: "active", 9: "active", 10: "active", 11: "default", 12: "default" },
                pointers: [{ name: "L", index: 6, color: "pointer" }, { name: "R", index: 10, color: "active" }],
                windowLeft: 6,
                windowRight: 10,
                windowMeta: "INVALID, formed=2/3",
              },
              delta: { changedIndices: [1, 2, 3, 4, 5] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [8, 10, 11],
              shortLabel: "right=11: add 'N'",
              explanation: "right=11, char='N'. Not in need. formed stays 2. Keep expanding.",
              variables: { left: 6, right: 11, "s[right]": "N", formed: 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "active", 7: "active", 8: "active", 9: "active", 10: "active", 11: "active", 12: "default" },
                pointers: [{ name: "L", index: 6, color: "pointer" }, { name: "R", index: 11, color: "active" }],
                windowLeft: 6,
                windowRight: 11,
                windowMeta: "formed=2/3",
              },
              delta: { changedIndices: [11] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [8, 10, 11],
              shortLabel: "right=12: add 'C' → valid!",
              explanation: "right=12, char='C'. C's count reaches need. formed=3=required. Window s[6..12]='ODEBANC' length=7 > best=6. Don't update.",
              variables: { left: 6, right: 12, formed: 3, ans: '"ADOBEC" len=6' },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "active", 7: "active", 8: "active", 9: "active", 10: "active", 11: "active", 12: "active" },
                pointers: [{ name: "L", index: 6, color: "pointer" }, { name: "R", index: 12, color: "active" }],
                windowLeft: 6,
                windowRight: 12,
                windowMeta: "VALID! len=7",
              },
              delta: { changedIndices: [12] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [13, 14, 19, 22],
              shortLabel: "Shrink left to 9 → BANC len=4!",
              explanation: "Shrink: remove O(6), D(7), E(8). All non-essential. At left=9, window='BANC' len=4 < best=6. Update ans='BANC'! Remove B(9): B's count drops below need, formed=2. Stop at left=10.",
              variables: { left: 10, right: 12, formed: 2, ans: '"BANC" len=4' },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "found", 10: "found", 11: "found", 12: "found" },
                pointers: [{ name: "L", index: 10, color: "pointer" }, { name: "R", index: 12, color: "active" }],
                windowLeft: 9,
                windowRight: 12,
                windowMeta: 'ans="BANC" len=4',
              },
              delta: { changedIndices: [6, 7, 8, 9, 10, 11, 12] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [24],
              shortLabel: 'Return "BANC"',
              explanation: "Right pointer has reached end of string. No more expansion possible. The minimum window substring is 'BANC' with length 4. Each character was visited at most twice — O(n) time.",
              variables: { ans: '"BANC"', length: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited", 8: "visited", 9: "found", 10: "found", 11: "found", 12: "found" },
                pointers: [],
                windowLeft: 9,
                windowRight: 12,
                windowMeta: 'ANSWER: "BANC"',
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Exact Match",
          description: "s and t are identical single characters",
          input: { s: "a", t: "a" },
          expectedOutput: '"a"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Build need map",
              explanation: "t='a'. need={a:1}. required=1. The entire string s is just 'a' — this is the simplest possible case.",
              variables: { need: "{a:1}", required: 1, formed: 0, left: 0 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                windowLeft: -1,
                windowRight: -1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 10, 11],
              shortLabel: "right=0: add 'a' → valid!",
              explanation: "right=0, char='a'. window={a:1}. a's count matches need. formed=1=required. Window 'a' is valid immediately!",
              variables: { left: 0, right: 0, "s[right]": "a", window: "{a:1}", formed: 1, required: 1 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 0, color: "active" }],
                windowLeft: 0,
                windowRight: 0,
                windowMeta: "VALID! len=1",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [13, 14],
              shortLabel: "Record ans='a', shrink → invalid",
              explanation: "Record ans='a' (len=1). Shrink: remove 'a', formed drops to 0. left=1. Window invalid. Right pointer exhausted.",
              variables: { left: 1, right: 0, formed: 0, ans: '"a" len=1' },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                windowLeft: 0,
                windowRight: 0,
                windowMeta: 'ANSWER: "a"',
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [24],
              shortLabel: 'Return "a"',
              explanation: "The minimum window is 'a' — the entire string. Only possible answer when s equals t.",
              variables: { ans: '"a"' },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                windowLeft: 0,
                windowRight: 0,
                windowMeta: 'ANSWER: "a"',
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "No Valid Window",
          description: "t requires more characters than s has",
          input: { s: "a", t: "aa" },
          expectedOutput: '""',
          commonMistake: "Forgetting to handle the case where t has duplicate characters. need={a:2} means we need TWO a's in the window, not just one.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Build need map",
              explanation: "t='aa'. need={a:2}. required=1 unique character, but we need count=2. s only has one 'a' — impossible to satisfy.",
              variables: { need: "{a:2}", required: 1, formed: 0 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                windowLeft: -1,
                windowRight: -1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 10],
              shortLabel: "right=0: add 'a', count=1 < need=2",
              explanation: "right=0, char='a'. window={a:1}. But need={a:2}. window count (1) < need (2), so formed stays 0. Window never becomes valid.",
              variables: { left: 0, right: 0, window: "{a:1}", formed: 0, required: 1 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 0, color: "active" }],
                windowLeft: 0,
                windowRight: 0,
                windowMeta: "formed=0/1 (need 2 a's)",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [24],
              shortLabel: 'Return ""',
              explanation: "Right pointer exhausted the string. formed never reached required. No valid window exists. Return empty string.",
              variables: { ans: '""' },
              dataStructure: {
                arrayStates: { 0: "eliminated" },
                pointers: [],
                windowLeft: -1,
                windowRight: -1,
                windowMeta: "NO VALID WINDOW",
              },
              delta: { changedIndices: [0] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, t }) {
        const steps = [];
        const n = s.length;
        const need = {};
        for (const c of t) need[c] = (need[c] || 0) + 1;
        const required = Object.keys(need).length;
        let formed = 0;
        const window = {};
        let ansLen = -1, ansL = 0, ansR = 0;
        let left = 0;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Build need map",
          explanation: `Parse t='${t}'. need=${JSON.stringify(need)}. required=${required} unique chars.`,
          variables: { need: JSON.stringify(need), required, formed: 0, left: 0, right: "-", window: "{}" },
          dataStructure: {
            arrayStates: Object.fromEntries(s.split("").map((_, i) => [i, "default"])),
            pointers: [], windowLeft: -1, windowRight: -1,
          },
          delta: {}, isAnswer: false,
        });

        for (let right = 0; right < n; right++) {
          const c = s[right];
          window[c] = (window[c] || 0) + 1;
          if (need[c] !== undefined && window[c] === need[c]) formed++;

          const states = {};
          for (let k = 0; k < n; k++) states[k] = k < left ? "eliminated" : (k >= left && k <= right ? "active" : "default");

          steps.push({
            stepId: steps.length, lineNumbers: [8, 10, 11],
            shortLabel: `R=${right}: add '${c}', formed=${formed}/${required}`,
            explanation: `Expand right to ${right}, char='${c}'. ${need[c] !== undefined ? (window[c] === need[c] ? `${c}'s count now matches need — formed=${formed}.` : `${c} in need but count ${window[c]} ${window[c] < need[c] ? '<' : '>'} need ${need[c]}.`) : `'${c}' not in need.`} ${formed === required ? 'Window is VALID!' : 'Window not yet valid.'}`,
            variables: { left, right, "s[right]": c, window: JSON.stringify(window), formed, required },
            dataStructure: { arrayStates: states, pointers: [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "active" }], windowLeft: left, windowRight: right, windowMeta: `formed=${formed}/${required}` },
            delta: { changedIndices: [right] }, isAnswer: false,
          });

          while (formed === required) {
            if (ansLen === -1 || right - left + 1 < ansLen) {
              ansLen = right - left + 1;
              ansL = left;
              ansR = right;
            }
            const d = s[left];
            window[d]--;
            if (need[d] !== undefined && window[d] < need[d]) formed--;
            left++;

            const shrinkStates = {};
            for (let k = 0; k < n; k++) shrinkStates[k] = k < left ? "eliminated" : (k >= left && k <= right ? "active" : "default");
            if (ansLen > 0) { for (let k = ansL; k <= ansR; k++) if (shrinkStates[k] === "eliminated" || shrinkStates[k] === "default") {} }

            steps.push({
              stepId: steps.length, lineNumbers: [13, 14, 19, 22],
              shortLabel: `Shrink: remove '${d}', L=${left}`,
              explanation: `Window valid — record ans='${s.substring(ansL, ansR + 1)}' (len=${ansLen}). Remove s[${left - 1}]='${d}'. ${formed < required ? `formed dropped to ${formed} — window invalid, stop shrinking.` : 'Still valid — keep shrinking.'}`,
              variables: { left, right, removed: d, formed, ans: `"${s.substring(ansL, ansR + 1)}" len=${ansLen}` },
              dataStructure: { arrayStates: shrinkStates, pointers: [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "active" }], windowLeft: left, windowRight: right, windowMeta: formed === required ? "VALID" : `INVALID, formed=${formed}/${required}` },
              delta: { changedIndices: [left - 1] }, isAnswer: false,
            });
          }
        }

        const finalStates = {};
        for (let k = 0; k < n; k++) finalStates[k] = (ansLen > 0 && k >= ansL && k <= ansR) ? "found" : "visited";

        steps.push({
          stepId: steps.length, lineNumbers: [24],
          shortLabel: ansLen === -1 ? 'Return ""' : `Return "${s.substring(ansL, ansR + 1)}"`,
          explanation: ansLen === -1 ? "No valid window found. Return empty string." : `Minimum window is '${s.substring(ansL, ansR + 1)}' with length ${ansLen}. Each character visited at most twice — O(n + m) time.`,
          variables: { ans: ansLen === -1 ? '""' : `"${s.substring(ansL, ansR + 1)}"`, length: ansLen },
          dataStructure: { arrayStates: finalStates, pointers: [], windowLeft: ansLen > 0 ? ansL : -1, windowRight: ansLen > 0 ? ansR : -1, windowMeta: ansLen === -1 ? "NO VALID WINDOW" : `ANSWER: "${s.substring(ansL, ansR + 1)}"` },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n^2 * m)", space: "O(m)", explanation: "Try all O(n^2) substrings, check each against t's frequencies in O(m)" },
    optimal: { time: "O(n + m)",   space: "O(m)", explanation: "Each character enters and leaves the window at most once; m for the need map", tradeoff: "The sliding window avoids re-checking substrings by maintaining state incrementally" },
  },

  interviewTips: [
    "Start by clarifying: 'Does t have duplicate characters? Do I need to match their counts?' — Yes.",
    "Mention brute force O(n^2) first, then explain why sliding window works in O(n).",
    "The key insight: 'formed' counter avoids re-scanning the frequency map every step.",
    "Explain the expand-then-shrink pattern: right pointer finds validity, left pointer optimizes.",
    "Edge case: when t is longer than s, return '' immediately.",
    "Mention that each character is processed at most twice (once by right, once by left), proving O(n).",
  ],

  relatedProblems: ["longest-substring-without-repeating", "permutation-in-string", "longest-repeating-replacement"],
};
