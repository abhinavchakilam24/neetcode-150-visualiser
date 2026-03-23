export const wordBreak = {
  id: 110,
  slug: "word-break",
  title: "Word Break",
  difficulty: "Medium",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 110,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/word-break/",

  pattern: "Substring DP with Dictionary Lookup",
  patternExplanation: `When checking if a string can be segmented into valid words, use dp[i] to
    represent whether the first i characters can be segmented. For each position i, check all
    possible last-word boundaries j: if dp[j] is true and s[j..i] is in the dictionary, then dp[i] is true.`,

  intuition: {
    coreInsight: `For position i in the string, we ask: "Is there any split point j before i such that
      the first j characters form valid words (dp[j] = true) AND the substring from j to i is a
      dictionary word?" If yes, then dp[i] = true. We build this up from position 0 to position n.`,

    mentalModel: `Imagine reading a string with no spaces, like "leetcode". You're trying to place
      dividers to split it into real words. At each character position, you look back and ask:
      "Can I place a divider here such that everything before it already works, and the new segment
      is a real word?" Position 4 works because dp[0]=true and "leet" is a word. Position 8 works
      because dp[4]=true and "code" is a word.`,

    whyNaiveFails: `A recursive approach tries every possible split point at each position, leading
      to O(2^n) possibilities. For "aaaa...a" (n a's) with dictionary ["a", "aa", "aaa", ...],
      every subset of split points is valid, giving exponential calls. Many subproblems overlap:
      "can we segment s[3..n]?" is asked from multiple earlier splits.`,

    keyObservation: `dp[0] = true is the critical base case — it means "the empty prefix is trivially
      segmentable." Without this, no chain of valid splits can ever start. The inner loop checks
      all possible last words ending at position i, and we only need ONE valid split to set dp[i] = true.`,
  },

  problem: `Given a string s and a dictionary of strings wordDict, return true if s can be segmented
    into a space-separated sequence of one or more dictionary words. The same word in the dictionary
    may be reused multiple times in the segmentation.`,

  examples: [
    { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true", explanation: '"leetcode" can be segmented as "leet code".' },
    { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true", explanation: '"applepenapple" = "apple pen apple". Note "apple" is reused.' },
    { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: "false", explanation: 'No valid segmentation exists.' },
  ],

  constraints: [
    "1 <= s.length <= 300",
    "1 <= wordDict.length <= 1000",
    "1 <= wordDict[i].length <= 20",
    "s and wordDict[i] consist of only lowercase English letters.",
    "All the strings of wordDict are unique.",
  ],

  approaches: {
    brute: {
      label: "Recursive Brute Force",
      tier: "brute",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: "Try every possible prefix; if it's a dictionary word, recursively check the rest.",

      javaCode: `public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> set = new HashSet<>(wordDict);
    return canBreak(s, set, 0);
}

private boolean canBreak(String s, Set<String> set, int start) {
    if (start == s.length()) return true;

    for (int end = start + 1; end <= s.length(); end++) {
        if (set.contains(s.substring(start, end))) {
            if (canBreak(s, set, end)) return true;
        }
    }
    return false;
}`,

      cppCode: `bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    return canBreak(s, dict, 0);
}

bool canBreak(string& s, unordered_set<string>& dict, int start) {
    if (start == s.size()) return true;

    for (int end = start + 1; end <= s.size(); end++) {
        if (dict.count(s.substr(start, end - start))) {
            if (canBreak(s, dict, end)) return true;
        }
    }
    return false;
}`,

      pythonCode: `def wordBreak(s: str, wordDict: List[str]) -> bool:
    word_set = set(wordDict)

    def can_break(start: int) -> bool:
        if start == len(s):
            return True
        for end in range(start + 1, len(s) + 1):
            if s[start:end] in word_set:
                if can_break(end):
                    return True
        return False

    return can_break(0)`,

      lineAnnotations: {
        1: "Convert word list to set for O(1) lookup",
        5: "Recursive helper starting from index 'start'",
        6: "Base case: reached end of string successfully",
        8: "Try every possible end position for the current word",
        9: "Check if substring is a dictionary word",
        10: "If so, recursively try to break the remainder",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "leetcode", wordDict: ["leet", "code"] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6],
              shortLabel: "canBreak(0)",
              explanation: "Start at index 0. Try every possible prefix of 'leetcode' to see if it's a dictionary word.",
              variables: { start: 0, s: "leetcode", dict: '["leet","code"]' },
              dataStructure: {
                dpArray: [null, null, null, null, null, null, null, null, null],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "Try all prefixes from index 0",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9],
              shortLabel: '"leet" found at [0,4)',
              explanation: "Try prefixes: 'l' no, 'le' no, 'lee' no, 'leet' YES! 'leet' is in dictionary. Recurse from index 4.",
              variables: { start: 0, end: 4, substring: "leet", found: true },
              dataStructure: {
                dpArray: [true, null, null, null, null, null, null, null, null],
                dpHighlight: 4,
                dpArrows: [{ from: 0, to: 4 }],
                dpFormula: 's[0..4) = "leet" is in dict',
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9, 10],
              shortLabel: '"code" found at [4,8)',
              explanation: "From index 4, try prefixes: 'c' no, 'co' no, 'cod' no, 'code' YES! 'code' is in dictionary. Recurse from index 8.",
              variables: { start: 4, end: 8, substring: "code", found: true },
              dataStructure: {
                dpArray: [true, null, null, null, true, null, null, null, null],
                dpHighlight: 8,
                dpArrows: [{ from: 0, to: 4 }, { from: 4, to: 8 }],
                dpFormula: 's[4..8) = "code" is in dict',
              },
              delta: { changedIndices: [8] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6],
              shortLabel: "Index 8 = length → true",
              explanation: "start=8 equals s.length()=8. We've segmented the entire string: 'leet' + 'code'. Return true.",
              variables: { start: 8, "s.length()": 8, answer: true },
              dataStructure: {
                dpArray: [true, null, null, null, true, null, null, null, true],
                dpHighlight: 8,
                dpArrows: [{ from: 0, to: 4 }, { from: 4, to: 8 }],
                dpFormula: "Reached end → return true",
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
      timeComplexity: "O(n^2 * m)",
      spaceComplexity: "O(n)",
      idea: `dp[i] = true if s[0..i) can be segmented. For each i, check all j < i:
        if dp[j] is true and s[j..i) is in the dictionary, set dp[i] = true. m = max word length.`,

      javaCode: `public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> wordSet = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;

    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length()];
}`,

      cppCode: `bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> wordSet(wordDict.begin(), wordDict.end());
    vector<bool> dp(s.size() + 1, false);
    dp[0] = true;

    for (int i = 1; i <= s.size(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.size()];
}`,

      pythonCode: `def wordBreak(s: str, wordDict: List[str]) -> bool:
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True

    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break

    return dp[len(s)]`,

      lineAnnotations: {
        2: "Convert list to set for O(1) word lookup",
        3: "dp[i] = can s[0..i) be segmented?",
        4: "Base case: empty prefix is trivially valid",
        6: "For each position i (end of potential word)",
        7: "Try every split point j before i",
        8: "If s[0..j) works AND s[j..i) is a word → s[0..i) works",
        9: "Mark dp[i] as true",
        10: "One valid split is enough — no need to check more",
        14: "Answer: can the entire string be segmented?",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: '"leetcode" with dict ["leet","code"]',
          input: { s: "leetcode", wordDict: ["leet", "code"] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init dp[0]=true",
              explanation: "Create boolean dp array of size 9 (string length + 1). Set dp[0]=true: the empty prefix is trivially segmentable. All others start as false.",
              variables: { s: "leetcode", dict: '{"leet","code"}', dp: "[T, F, F, F, F, F, F, F, F]" },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 0, 0, 0, 0, 0],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "Base case: dp[0] = true (empty prefix)",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8],
              shortLabel: 'dp[1]: "l" not in dict → false',
              explanation: "i=1: Check j=0: dp[0]=true, s[0..1)='l'. Is 'l' in the dictionary? No. No valid split found. dp[1] stays false.",
              variables: { i: 1, j: 0, "s[j..i)": "l", "dp[j]": true, inDict: false, "dp[i]": false },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 0, 0, 0, 0, 0],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: 'dp[0]=T but "l" not in dict → dp[1]=F',
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8],
              shortLabel: 'dp[2]: "le" not in dict → false',
              explanation: "i=2: j=0: dp[0]=true, s[0..2)='le' not in dict. j=1: dp[1]=false, skip. dp[2] stays false.",
              variables: { i: 2, "dp[i]": false },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 0, 0, 0, 0, 0],
                dpHighlight: 2,
                dpArrows: [],
                dpFormula: 'No valid split for "le" → dp[2]=F',
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8],
              shortLabel: 'dp[3]: "lee" not in dict → false',
              explanation: "i=3: j=0: dp[0]=true, s[0..3)='lee' not in dict. No other j has dp[j]=true. dp[3] stays false.",
              variables: { i: 3, "dp[i]": false },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 0, 0, 0, 0, 0],
                dpHighlight: 3,
                dpArrows: [],
                dpFormula: 'No valid split for "lee" → dp[3]=F',
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: 'dp[4]: "leet" in dict → TRUE',
              explanation: "i=4: j=0: dp[0]=true, s[0..4)='leet' IS in dictionary! dp[4] = true. The first 4 characters can be segmented as 'leet'.",
              variables: { i: 4, j: 0, "s[j..i)": "leet", "dp[j]": true, inDict: true, "dp[i]": true },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 1, 0, 0, 0, 0],
                dpHighlight: 4,
                dpArrows: [{ from: 0, to: 4 }],
                dpFormula: 'dp[0]=T and "leet" in dict → dp[4]=T',
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 8],
              shortLabel: "dp[5]: no valid split → false",
              explanation: "i=5: j=0: s[0..5)='leetc' not in dict. j=4: dp[4]=true, s[4..5)='c' not in dict. dp[5] stays false.",
              variables: { i: 5, "dp[i]": false },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 1, 0, 0, 0, 0],
                dpHighlight: 5,
                dpArrows: [],
                dpFormula: "No valid split → dp[5]=F",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 7, 8],
              shortLabel: "dp[6]: no valid split → false",
              explanation: "i=6: j=0: s[0..6)='leetco' not in dict. j=4: dp[4]=true, s[4..6)='co' not in dict. dp[6] stays false.",
              variables: { i: 6, "dp[i]": false },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 1, 0, 0, 0, 0],
                dpHighlight: 6,
                dpArrows: [],
                dpFormula: "No valid split → dp[6]=F",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [6, 7, 8],
              shortLabel: "dp[7]: no valid split → false",
              explanation: "i=7: j=0: s[0..7)='leetcod' not in dict. j=4: dp[4]=true, s[4..7)='cod' not in dict. dp[7] stays false.",
              variables: { i: 7, "dp[i]": false },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 1, 0, 0, 0, 0],
                dpHighlight: 7,
                dpArrows: [],
                dpFormula: "No valid split → dp[7]=F",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: 'dp[8]: "code" in dict → TRUE',
              explanation: "i=8: j=0: s[0..8)='leetcode' not in dict. j=4: dp[4]=true, s[4..8)='code' IS in dictionary! dp[8] = true. 'leet' + 'code' = 'leetcode'.",
              variables: { i: 8, j: 4, "s[j..i)": "code", "dp[j]": true, inDict: true, "dp[i]": true },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                dpHighlight: 8,
                dpArrows: [{ from: 0, to: 4 }, { from: 4, to: 8 }],
                dpFormula: 'dp[4]=T and "code" in dict → dp[8]=T',
              },
              delta: { changedIndices: [8] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [14],
              shortLabel: "Return dp[8] = true",
              explanation: "dp[8] = true. The string 'leetcode' can be segmented as 'leet code'. Return true.",
              variables: { "s.length()": 8, answer: true },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                dpHighlight: 8,
                dpArrows: [{ from: 0, to: 4 }, { from: 4, to: 8 }],
                dpFormula: "Answer: dp[8] = true",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Segmentation",
          description: '"catsandog" cannot be fully segmented',
          input: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] },
          expectedOutput: "false",
          commonMistake: "Greedily matching 'cats' at the start leaves 'andog' which can't be segmented. Matching 'cat' + 'sand' leaves 'og' which also fails. DP correctly explores all paths and concludes none work.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init dp[0]=true",
              explanation: "Create dp array of size 10. dp[0]=true. We'll try to segment 'catsandog'.",
              variables: { s: "catsandog", dict: '{"cats","dog","sand","and","cat"}' },
              dataStructure: {
                dpArray: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "Base case: dp[0] = true",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: 'dp[3]: "cat" → TRUE',
              explanation: "i=1,2: no valid words. i=3: j=0: dp[0]=true, s[0..3)='cat' is in dict! dp[3]=true.",
              variables: { i: 3, j: 0, "s[0..3)": "cat", "dp[3]": true },
              dataStructure: {
                dpArray: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                dpHighlight: 3,
                dpArrows: [{ from: 0, to: 3 }],
                dpFormula: 'dp[0]=T and "cat" in dict → dp[3]=T',
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: 'dp[4]: "cats" → TRUE',
              explanation: "i=4: j=0: dp[0]=true, s[0..4)='cats' is in dict! dp[4]=true.",
              variables: { i: 4, j: 0, "s[0..4)": "cats", "dp[4]": true },
              dataStructure: {
                dpArray: [1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                dpHighlight: 4,
                dpArrows: [{ from: 0, to: 4 }],
                dpFormula: 'dp[0]=T and "cats" in dict → dp[4]=T',
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: 'dp[6]: "an" not in dict',
              explanation: "i=5: no valid splits. i=6: j=3: dp[3]=true, s[3..6)='san' not in dict. j=4: dp[4]=true, s[4..6)='an' not in dict. dp[6] stays false.",
              variables: { i: 6, "dp[6]": false },
              dataStructure: {
                dpArray: [1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                dpHighlight: 6,
                dpArrows: [],
                dpFormula: "No valid split → dp[6]=F",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: 'dp[7]: "sand"/"and" → TRUE',
              explanation: "i=7: j=3: dp[3]=true, s[3..7)='sand' is in dict! dp[7]=true. Also j=4: dp[4]=true, s[4..7)='and' is in dict — but we already found one.",
              variables: { i: 7, j: 3, "s[3..7)": "sand", "dp[7]": true },
              dataStructure: {
                dpArray: [1, 0, 0, 1, 1, 0, 0, 1, 0, 0],
                dpHighlight: 7,
                dpArrows: [{ from: 3, to: 7 }],
                dpFormula: 'dp[3]=T and "sand" in dict → dp[7]=T',
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 8],
              shortLabel: "dp[8], dp[9]: no valid splits",
              explanation: "i=8: j=7: dp[7]=true, s[7..8)='o' not in dict. No other dp[j]=true helps. dp[8]=false. i=9: j=7: s[7..9)='og' not in dict. dp[9]=false. The 'og' ending has no dictionary match.",
              variables: { i: 9, "dp[8]": false, "dp[9]": false },
              dataStructure: {
                dpArray: [1, 0, 0, 1, 1, 0, 0, 1, 0, 0],
                dpHighlight: 9,
                dpArrows: [],
                dpFormula: "No word ends at position 8 or 9 → both false",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14],
              shortLabel: "Return dp[9] = false",
              explanation: "dp[9] = false. Despite 'cat', 'cats', 'sand', 'and' all being valid words, no complete segmentation of 'catsandog' exists. The problem is 'og' — it's not a word.",
              variables: { answer: false },
              dataStructure: {
                dpArray: [1, 0, 0, 1, 1, 0, 0, 1, 0, 0],
                dpHighlight: 9,
                dpArrows: [],
                dpFormula: "Answer: dp[9] = false",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s, wordDict }) {
        const steps = [];
        const wordSet = new Set(wordDict);
        const n = s.length;
        const dp = new Array(n + 1).fill(false);
        dp[0] = true;

        steps.push({
          stepId: 0,
          lineNumbers: [2, 3, 4],
          shortLabel: "Init dp[0]=true",
          explanation: `Create dp array of size ${n + 1}. dp[0]=true (empty prefix is valid). String: "${s}", dictionary: [${wordDict.map(w => `"${w}"`).join(", ")}].`,
          variables: { s, dict: JSON.stringify(wordDict) },
          dataStructure: {
            dpArray: dp.map(v => v ? 1 : 0),
            dpHighlight: 0,
            dpArrows: [],
            dpFormula: "Base case: dp[0] = true (empty prefix)",
          },
          delta: {},
          isAnswer: false,
        });

        for (let i = 1; i <= n; i++) {
          let foundJ = -1;
          for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
              dp[i] = true;
              foundJ = j;
              break;
            }
          }

          const arrows = [];
          if (foundJ >= 0) {
            // trace back chain
            let pos = foundJ;
            while (pos > 0) {
              for (let k = 0; k < pos; k++) {
                if (dp[k] && wordSet.has(s.substring(k, pos))) {
                  arrows.push({ from: k, to: pos });
                  pos = k;
                  break;
                }
              }
              if (pos === arrows[arrows.length - 1]?.from) break;
              if (arrows.length > n) break;
            }
            arrows.push({ from: foundJ, to: i });
          }

          steps.push({
            stepId: steps.length,
            lineNumbers: dp[i] ? [6, 7, 8, 9] : [6, 7, 8],
            shortLabel: dp[i] ? `dp[${i}]: "${s.substring(foundJ, i)}" → TRUE` : `dp[${i}]: no split → false`,
            explanation: dp[i]
              ? `i=${i}: j=${foundJ}: dp[${foundJ}]=true, s[${foundJ}..${i})="${s.substring(foundJ, i)}" is in dictionary. dp[${i}]=true.`
              : `i=${i}: No split point j where dp[j]=true and s[j..${i}) is a dictionary word. dp[${i}] stays false.`,
            variables: { i, "dp[i]": dp[i] },
            dataStructure: {
              dpArray: dp.map(v => v ? 1 : 0),
              dpHighlight: i,
              dpArrows: dp[i] ? [{ from: foundJ, to: i }] : [],
              dpFormula: dp[i] ? `dp[${foundJ}]=T and "${s.substring(foundJ, i)}" in dict → dp[${i}]=T` : `No valid split → dp[${i}]=F`,
            },
            delta: { changedIndices: dp[i] ? [i] : [] },
            isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [14],
          shortLabel: `Return dp[${n}] = ${dp[n]}`,
          explanation: dp[n]
            ? `dp[${n}] = true. The string "${s}" can be segmented into dictionary words. Return true.`
            : `dp[${n}] = false. No valid segmentation exists for "${s}". Return false.`,
          variables: { answer: dp[n] },
          dataStructure: {
            dpArray: dp.map(v => v ? 1 : 0),
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
    brute:   { time: "O(2^n)", space: "O(n)", explanation: "Try every possible segmentation — exponential splits with recursion depth n" },
    optimal: { time: "O(n^2 * m)", space: "O(n)", explanation: "n^2 substring checks, each up to length m (max word length). dp array of size n+1", tradeoff: "Can optimize inner loop to only check substrings up to max word length" },
  },

  interviewTips: [
    "Start with the recursive approach, note overlapping subproblems, then optimize with DP.",
    "Clarify: dp[i] represents whether s[0..i) can be segmented — i is exclusive.",
    "dp[0]=true is the anchor — without it, no split chain can ever begin.",
    "Mention the optimization: only check j values where i-j <= max word length.",
    "If asked to return the actual segmentation, maintain a parent array to reconstruct the path.",
  ],

  relatedProblems: ["word-break-ii", "longest-palindromic-substring", "decode-ways"],
};
