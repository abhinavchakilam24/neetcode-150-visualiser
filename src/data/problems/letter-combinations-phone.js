export const letterCombinationsPhone = {
  id: 78,
  slug: "letter-combinations-phone",
  title: "Letter Combinations of a Phone Number",
  difficulty: "Medium",
  topic: "backtracking",
  topicLabel: "Backtracking",
  neetcodeNumber: 78,
  artifactType: "Backtracking",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",

  pattern: "Backtracking Cartesian Product",
  patternExplanation: `Each digit maps to multiple letters. We need every combination of one letter per digit.
    This is a Cartesian product generated via backtracking — at each digit position, try each possible letter.`,

  intuition: {
    coreInsight: `Each digit maps to 3-4 letters. For a string of n digits, we need all possible strings formed by
      picking one letter per digit. This is a tree where each level represents a digit, and each branch represents
      a letter choice. Backtracking explores every root-to-leaf path to generate all combinations.`,

    mentalModel: `Imagine a combination lock with n dials. Each dial has 3-4 options (the letters mapped to that digit).
      You need to list every possible combination. You fix the first dial, then try every option on the second dial,
      and so on. When you reach the end, record the combination, go back one dial, and try the next option.`,

    whyNaiveFails: `An iterative approach that builds all combinations in memory simultaneously would require
      storing intermediate results and merging them. While this works, it uses more memory and is less elegant.
      Backtracking builds one combination at a time, using O(n) space for the current path.`,

    keyObservation: `The total number of combinations is the product of letters per digit — typically 3^n or 4^n.
      There's no way to reduce this; we must generate all of them. The backtracking structure ensures we
      generate each combination exactly once with minimal overhead.`,
  },

  problem: `Given a string containing digits from 2-9 inclusive, return all possible letter combinations
    that the number could represent. Return the answer in any order. A mapping of digits to letters
    (just like on telephone buttons) is given.`,

  examples: [
    { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', explanation: "2 maps to abc, 3 maps to def" },
    { input: 'digits = ""', output: "[]", explanation: "Empty input returns empty list" },
    { input: 'digits = "2"', output: '["a","b","c"]', explanation: "Single digit maps to its letters" },
  ],

  constraints: [
    "0 <= digits.length <= 4",
    "digits[i] is a digit in the range ['2', '9'].",
  ],

  approaches: {
    brute: {
      label: "Backtracking",
      tier: "brute",
      timeComplexity: "O(4^n × n)",
      spaceComplexity: "O(n)",
      idea: "For each digit, try each mapped letter. Build combinations character by character via recursion.",

      javaCode: `public List<String> letterCombinations(String digits) {
    if (digits.isEmpty()) return new ArrayList<>();
    String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    List<String> result = new ArrayList<>();
    backtrack(digits, 0, new StringBuilder(), result, map);
    return result;
}

private void backtrack(String digits, int idx, StringBuilder sb, List<String> result, String[] map) {
    if (idx == digits.length()) {
        result.add(sb.toString());
        return;
    }
    String letters = map[digits.charAt(idx) - '0'];
    for (char c : letters.toCharArray()) {
        sb.append(c);
        backtrack(digits, idx + 1, sb, result, map);
        sb.deleteCharAt(sb.length() - 1);
    }
}`,

      cppCode: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        string map[] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        vector<string> result;
        string current;
        backtrack(digits, 0, current, result, map);
        return result;
    }

    void backtrack(string& digits, int idx, string& current, vector<string>& result, string map[]) {
        if (idx == digits.size()) {
            result.push_back(current);
            return;
        }
        string& letters = map[digits[idx] - '0'];
        for (char c : letters) {
            current.push_back(c);
            backtrack(digits, idx + 1, current, result, map);
            current.pop_back();
        }
    }
};`,

      pythonCode: `def letterCombinations(digits: str) -> List[str]:
    if not digits:
        return []
    phone = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl",
             "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}
    result = []

    def backtrack(idx, path):
        if idx == len(digits):
            result.append("".join(path))
            return
        for char in phone[digits[idx]]:
            path.append(char)
            backtrack(idx + 1, path)
            path.pop()

    backtrack(0, [])
    return result`,

      lineAnnotations: {
        1: "Handle empty input edge case",
        3: "Phone digit-to-letter mapping",
        8: "Base case: built a complete combination",
        9: "Add finished combination to result",
        11: "Get letters for current digit",
        12: "Try each letter mapped to this digit",
        13: "Choose: append letter",
        14: "Explore: recurse to next digit",
        15: "Un-choose: remove last letter (backtrack)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Generate combinations for "23"',
          input: { digits: "23" },
          expectedOutput: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Map digits",
              explanation: 'Digit "2" maps to "abc", digit "3" maps to "def". We need all combinations of one letter from each.',
              variables: { digits: "23", idx: 0, path: "" },
              dataStructure: { treeNodes: { "root": { val: "23", state: "active", children: [] } }, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 13],
              shortLabel: "Choose 'a' (digit 2)",
              explanation: 'At digit "2", try letter "a". Append to path and recurse for digit "3".',
              variables: { idx: 0, digit: "2", letter: "a", path: "a" },
              dataStructure: { treeNodes: { "root": { val: "23", state: "visited" }, "a": { val: "a", state: "active" } }, currentPath: ["a"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13, 8, 9],
              shortLabel: "Choose 'd' → 'ad' ✓",
              explanation: 'At digit "3", try "d". Path = "ad". idx=2 equals digits.length=2. Add "ad" to result.',
              variables: { idx: 1, letter: "d", path: "ad", result: '["ad"]' },
              dataStructure: { treeNodes: { "a": { val: "a", state: "visited" }, "ad": { val: "d", state: "found" } }, currentPath: ["a", "d"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15, 12, 13, 8, 9],
              shortLabel: "Backtrack, choose 'e' → 'ae' ✓",
              explanation: 'Backtrack, remove "d". Try "e". Path = "ae". Reached end. Add "ae" to result.',
              variables: { letter: "e", path: "ae", result: '["ad","ae"]' },
              dataStructure: { treeNodes: { "a": { val: "a", state: "visited" }, "ae": { val: "e", state: "found" } }, currentPath: ["a", "e"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15, 12, 13, 8, 9],
              shortLabel: "Backtrack, choose 'f' → 'af' ✓",
              explanation: 'Backtrack, remove "e". Try "f". Path = "af". Reached end. Add "af" to result.',
              variables: { letter: "f", path: "af", result: '["ad","ae","af"]' },
              dataStructure: { treeNodes: { "a": { val: "a", state: "visited" }, "af": { val: "f", state: "found" } }, currentPath: ["a", "f"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [15, 12, 13],
              shortLabel: "Backtrack to digit 2, choose 'b'",
              explanation: 'All options for "a" explored. Backtrack to digit "2", try "b".',
              variables: { idx: 0, letter: "b", path: "b" },
              dataStructure: { treeNodes: { "root": { val: "23", state: "visited" }, "b": { val: "b", state: "active" } }, currentPath: ["b"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [12, 13, 8, 9],
              shortLabel: "'bd', 'be', 'bf' ✓",
              explanation: 'Try all letters for digit "3" with prefix "b". Generate "bd", "be", "bf" — all added to result.',
              variables: { path: "b*", result: '["ad","ae","af","bd","be","bf"]' },
              dataStructure: { treeNodes: { "b": { val: "b", state: "visited" }, "bd": { val: "d", state: "found" } }, currentPath: ["b"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [15, 12, 13],
              shortLabel: "Backtrack to digit 2, choose 'c'",
              explanation: 'All options for "b" explored. Try "c" from digit "2".',
              variables: { idx: 0, letter: "c", path: "c" },
              dataStructure: { treeNodes: { "root": { val: "23", state: "visited" }, "c": { val: "c", state: "active" } }, currentPath: ["c"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [12, 13, 8, 9],
              shortLabel: "'cd', 'ce', 'cf' ✓",
              explanation: 'Try all letters for digit "3" with prefix "c". Generate "cd", "ce", "cf" — all added.',
              variables: { path: "c*", result: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
              dataStructure: { treeNodes: { "c": { val: "c", state: "visited" }, "cf": { val: "f", state: "found" } }, currentPath: ["c"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [1],
              shortLabel: "Return 9 combinations",
              explanation: 'All branches explored. 3 letters × 3 letters = 9 combinations total. Return result.',
              variables: { result: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
              dataStructure: { treeNodes: { "root": { val: "done", state: "found" } }, currentPath: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Digit",
          description: "Single digit — just return its letters",
          input: { digits: "7" },
          expectedOutput: '["p","q","r","s"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: 'Digit "7" → "pqrs"',
              explanation: 'Digit "7" maps to "pqrs" — four letters. Only one digit, so each letter is a complete combination.',
              variables: { digits: "7", idx: 0 },
              dataStructure: { treeNodes: { "root": { val: "7", state: "active" } }, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 13, 8, 9],
              shortLabel: 'Generate "p"',
              explanation: 'Try "p". idx+1 = 1 = digits.length. Add "p" to result.',
              variables: { letter: "p", path: "p", result: '["p"]' },
              dataStructure: { treeNodes: { "p": { val: "p", state: "found" } }, currentPath: ["p"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13, 8, 9],
              shortLabel: 'Generate "q"',
              explanation: 'Backtrack, try "q". Add "q" to result.',
              variables: { letter: "q", path: "q", result: '["p","q"]' },
              dataStructure: { treeNodes: { "q": { val: "q", state: "found" } }, currentPath: ["q"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 8, 9],
              shortLabel: 'Generate "r", "s"',
              explanation: 'Similarly generate "r" and "s". All 4 combinations found.',
              variables: { result: '["p","q","r","s"]' },
              dataStructure: { treeNodes: { "s": { val: "s", state: "found" } }, currentPath: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ digits }) {
        const steps = [];
        if (!digits || digits.length === 0) {
          steps.push({
            stepId: 0, lineNumbers: [1],
            shortLabel: "Empty input",
            explanation: "Input is empty. Return empty list.",
            variables: { digits: "", result: "[]" },
            dataStructure: { treeNodes: {}, currentPath: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const phone = { "2": "abc", "3": "def", "4": "ghi", "5": "jkl", "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz" };
        const result = [];

        steps.push({
          stepId: 0, lineNumbers: [3],
          shortLabel: "Map digits",
          explanation: `Digits "${digits}" map to: ${[...digits].map(d => `"${d}"→"${phone[d]}"`).join(", ")}.`,
          variables: { digits, idx: 0, path: "" },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: false,
        });

        function backtrack(idx, path) {
          if (idx === digits.length) {
            const combo = path.join("");
            result.push(combo);
            steps.push({
              stepId: steps.length, lineNumbers: [8, 9],
              shortLabel: `"${combo}" ✓`,
              explanation: `Reached end. Add "${combo}" to result. (${result.length} so far)`,
              variables: { idx, path: combo, result: JSON.stringify(result) },
              dataStructure: { treeNodes: {}, currentPath: [...path] },
              delta: {}, isAnswer: false,
            });
            return;
          }

          const letters = phone[digits[idx]];
          for (const c of letters) {
            path.push(c);
            steps.push({
              stepId: steps.length, lineNumbers: [12, 13],
              shortLabel: `Choose '${c}' (digit ${digits[idx]})`,
              explanation: `At digit "${digits[idx]}" (index ${idx}), choose letter "${c}". Path: "${path.join("")}".`,
              variables: { idx, digit: digits[idx], letter: c, path: path.join("") },
              dataStructure: { treeNodes: {}, currentPath: [...path] },
              delta: {}, isAnswer: false,
            });
            backtrack(idx + 1, path);
            path.pop();
          }
        }

        backtrack(0, []);

        steps.push({
          stepId: steps.length, lineNumbers: [1],
          shortLabel: `Return ${result.length} combinations`,
          explanation: `All branches explored. Generated ${result.length} combinations.`,
          variables: { result: JSON.stringify(result) },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Iterative BFS-style",
      tier: "optimal",
      timeComplexity: "O(4^n × n)",
      spaceComplexity: "O(4^n × n)",
      idea: "Start with an empty string. For each digit, expand every existing combination by appending each mapped letter.",

      javaCode: `public List<String> letterCombinations(String digits) {
    if (digits.isEmpty()) return new ArrayList<>();
    List<String> result = new ArrayList<>();
    result.add("");
    String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

    for (char digit : digits.toCharArray()) {
        List<String> next = new ArrayList<>();
        String letters = map[digit - '0'];
        for (String prev : result) {
            for (char c : letters.toCharArray()) {
                next.add(prev + c);
            }
        }
        result = next;
    }
    return result;
}`,

      cppCode: `vector<string> letterCombinations(string digits) {
    if (digits.empty()) return {};
    vector<string> result = {""};
    string map[] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

    for (char digit : digits) {
        vector<string> next;
        string& letters = map[digit - '0'];
        for (auto& prev : result) {
            for (char c : letters) {
                next.push_back(prev + c);
            }
        }
        result = next;
    }
    return result;
}`,

      pythonCode: `def letterCombinations(digits: str) -> List[str]:
    if not digits:
        return []
    phone = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl",
             "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}
    result = [""]

    for digit in digits:
        next_result = []
        for prev in result:
            for char in phone[digit]:
                next_result.append(prev + char)
        result = next_result

    return result`,

      lineAnnotations: {
        1: "Handle empty input",
        3: "Seed with empty string — will be expanded",
        6: "Process each digit left to right",
        7: "New list to hold expanded combinations",
        9: "For each existing combination...",
        10: "...append each possible letter",
        11: "Build new combination",
        14: "Replace with expanded list",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Iteratively build combinations for "23"',
          input: { digits: "23" },
          expectedOutput: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: 'Seed: [""]',
              explanation: 'Start with result = [""]. Each iteration will expand every string by appending letters for the next digit.',
              variables: { digits: "23", result: '[""]' },
              dataStructure: { treeNodes: {}, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 9, 10, 11],
              shortLabel: 'Digit "2": "" → a,b,c',
              explanation: 'Process digit "2" (maps to "abc"). Expand "" by appending each letter: "a", "b", "c".',
              variables: { digit: "2", letters: "abc", result: '["a","b","c"]' },
              dataStructure: { treeNodes: { "a": { val: "a", state: "active" }, "b": { val: "b", state: "active" }, "c": { val: "c", state: "active" } }, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 9, 10, 11],
              shortLabel: 'Digit "3": expand a,b,c',
              explanation: 'Process digit "3" (maps to "def"). Expand each of "a","b","c" by appending "d","e","f". Result: 3×3 = 9 combinations.',
              variables: { digit: "3", letters: "def", result: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
              dataStructure: { treeNodes: {}, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [16],
              shortLabel: "Return 9 combinations",
              explanation: 'All digits processed. Return 9 combinations. Same result as backtracking, built iteratively.',
              variables: { result: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
              dataStructure: { treeNodes: {}, currentPath: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Empty Input",
          description: "No digits — return empty list",
          input: { digits: "" },
          expectedOutput: "[]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Empty input → []",
              explanation: "Input digits is empty. Return empty list immediately.",
              variables: { digits: "", result: "[]" },
              dataStructure: { treeNodes: {}, currentPath: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ digits }) {
        const steps = [];
        if (!digits || digits.length === 0) {
          steps.push({
            stepId: 0, lineNumbers: [1],
            shortLabel: "Empty input → []",
            explanation: "Input is empty. Return empty list.",
            variables: { digits: "", result: "[]" },
            dataStructure: { treeNodes: {}, currentPath: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const phone = { "2": "abc", "3": "def", "4": "ghi", "5": "jkl", "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz" };
        let result = [""];

        steps.push({
          stepId: 0, lineNumbers: [3],
          shortLabel: 'Seed: [""]',
          explanation: 'Start with [""] and expand for each digit.',
          variables: { digits, result: '[""]' },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: false,
        });

        for (const digit of digits) {
          const letters = phone[digit];
          const next = [];
          for (const prev of result) {
            for (const c of letters) {
              next.push(prev + c);
            }
          }
          result = next;

          steps.push({
            stepId: steps.length, lineNumbers: [6, 7, 9, 10, 11],
            shortLabel: `Digit "${digit}": ${result.length} combos`,
            explanation: `Process digit "${digit}" (→"${letters}"). Expanded to ${result.length} combinations.`,
            variables: { digit, letters, resultSize: result.length, result: JSON.stringify(result.slice(0, 6)) + (result.length > 6 ? "..." : "") },
            dataStructure: { treeNodes: {}, currentPath: [] },
            delta: {}, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [16],
          shortLabel: `Return ${result.length} combinations`,
          explanation: `All digits processed. Return ${result.length} combinations.`,
          variables: { result: JSON.stringify(result) },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(4^n × n)", space: "O(n)", explanation: "Recursion depth n, up to 4 branches per level" },
    optimal: { time: "O(4^n × n)", space: "O(4^n × n)", explanation: "Same time, but stores all intermediates in memory", tradeoff: "Iterative approach trades higher space for simpler logic" },
  },

  interviewTips: [
    "Clarify the digit-to-letter mapping — mention that 7 and 9 have 4 letters.",
    "Handle the empty input edge case first.",
    "Explain that this is fundamentally a Cartesian product problem.",
    "Mention both recursive (backtracking) and iterative (BFS-style) approaches.",
    "Time complexity is the same regardless of approach — you must generate all combinations.",
  ],

  relatedProblems: ["combination-sum", "permutations", "subsets"],
};
