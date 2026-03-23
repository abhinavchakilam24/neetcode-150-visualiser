export const palindromePartitioning = {
  id: 77,
  slug: "palindrome-partitioning",
  title: "Palindrome Partitioning",
  difficulty: "Medium",
  topic: "backtracking",
  topicLabel: "Backtracking",
  neetcodeNumber: 77,
  artifactType: "Backtracking",
  companies: ["Amazon", "Google", "Meta", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/palindrome-partitioning/",

  pattern: "Backtracking with Palindrome Check",
  patternExplanation: `At each position, try every possible substring starting there. If it's a palindrome,
    include it in the current partition and recurse on the remainder. Backtrack when you've explored all options.`,

  intuition: {
    coreInsight: `We need to find ALL ways to split a string so every piece is a palindrome. At each index,
      we try every possible cut — if the substring from the current index to some future index is a palindrome,
      we take that cut and recursively partition the rest. This naturally forms a decision tree where each
      branch represents a valid palindrome substring choice.`,

    mentalModel: `Imagine you have a long word written on a strip of paper. You need to cut it into pieces
      where each piece reads the same forwards and backwards. At each position, you try cutting at every
      possible spot ahead — but you only actually cut if that piece is a palindrome. After cutting, you
      move to the remaining strip and repeat. When you reach the end of the strip, you've found one valid
      way to partition it.`,

    whyNaiveFails: `A brute force approach would generate all possible partitions (2^(n-1) ways to place
      cuts) and then check each partition for palindromes. For n=16, that's 32768 partitions to generate
      and verify. The backtracking approach prunes early — if a prefix isn't a palindrome, we skip the
      entire subtree, dramatically reducing the search space.`,

    keyObservation: `We only recurse when we've confirmed the current substring is a palindrome. This
      means we never waste time exploring partitions that include non-palindrome pieces. The pruning
      happens naturally: isPalindrome check before the recursive call acts as our constraint.`,
  },

  problem: `Given a string s, partition s such that every substring of the partition is a palindrome.
    Return all possible palindrome partitionings of s.`,

  examples: [
    { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]', explanation: 'Both partitions have all palindromes' },
    { input: 's = "a"', output: '[["a"]]', explanation: 'Single character is always a palindrome' },
  ],

  constraints: [
    "1 <= s.length <= 16",
    "s contains only lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "Backtracking",
      tier: "brute",
      timeComplexity: "O(n × 2^n)",
      spaceComplexity: "O(n)",
      idea: "At each index, try all substrings starting there. If palindrome, recurse on the rest. Collect complete partitions.",

      javaCode: `public List<List<String>> partition(String s) {
    List<List<String>> result = new ArrayList<>();
    backtrack(s, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(String s, int start, List<String> path, List<List<String>> result) {
    if (start == s.length()) {
        result.add(new ArrayList<>(path));
        return;
    }
    for (int end = start + 1; end <= s.length(); end++) {
        String sub = s.substring(start, end);
        if (isPalindrome(sub)) {
            path.add(sub);
            backtrack(s, end, path, result);
            path.remove(path.size() - 1);
        }
    }
}

private boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        if (s.charAt(l++) != s.charAt(r--)) return false;
    }
    return true;
}`,

      cppCode: `class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> result;
        vector<string> path;
        backtrack(s, 0, path, result);
        return result;
    }

    void backtrack(string& s, int start, vector<string>& path, vector<vector<string>>& result) {
        if (start == s.size()) {
            result.push_back(path);
            return;
        }
        for (int end = start + 1; end <= s.size(); end++) {
            string sub = s.substr(start, end - start);
            if (isPalindrome(sub)) {
                path.push_back(sub);
                backtrack(s, end, path, result);
                path.pop_back();
            }
        }
    }

    bool isPalindrome(const string& s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            if (s[l++] != s[r--]) return false;
        }
        return true;
    }
};`,

      pythonCode: `def partition(s: str) -> List[List[str]]:
    result = []

    def backtrack(start, path):
        if start == len(s):
            result.append(path[:])
            return
        for end in range(start + 1, len(s) + 1):
            sub = s[start:end]
            if sub == sub[::-1]:
                path.append(sub)
                backtrack(end, path)
                path.pop()

    backtrack(0, [])
    return result`,

      lineAnnotations: {
        1: "Main function — start backtracking from index 0",
        7: "Base case: reached end of string, found valid partition",
        8: "Add copy of current path to results",
        10: "Try every possible end position for current substring",
        11: "Extract substring from start to end",
        12: "Only proceed if this substring is a palindrome",
        13: "Choose: add palindrome to current partition",
        14: "Explore: recurse with remaining string",
        15: "Un-choose: backtrack by removing last added",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Partition "aab" into palindromes',
          input: { s: "aab" },
          expectedOutput: '[["a","a","b"],["aa","b"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Start backtrack(0)",
              explanation: 'Begin partitioning "aab" from index 0. We\'ll try every possible first cut.',
              variables: { start: 0, path: "[]", result: "[]" },
              dataStructure: {
                treeNodes: { "root": { val: "aab", state: "active", children: [] } },
                currentPath: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 12],
              shortLabel: 'Try "a" — palindrome ✓',
              explanation: 'Try substring s[0:1] = "a". Is "a" a palindrome? Yes — single characters always are. Add "a" to path and recurse.',
              variables: { start: 0, end: 1, sub: "a", isPalin: true, path: '["a"]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a"] },
                  "a": { val: "a", state: "active", children: [] },
                },
                currentPath: ["a"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11, 12],
              shortLabel: 'Try "a" at idx 1 — palindrome ✓',
              explanation: 'Recurse from index 1. Try s[1:2] = "a". Palindrome? Yes. Add to path, recurse from index 2.',
              variables: { start: 1, end: 2, sub: "a", isPalin: true, path: '["a","a"]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a"] },
                  "a": { val: "a", state: "visited", children: ["a2"] },
                  "a2": { val: "a", state: "active", children: [] },
                },
                currentPath: ["a", "a"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11, 12],
              shortLabel: 'Try "b" — palindrome ✓',
              explanation: 'Recurse from index 2. Try s[2:3] = "b". Palindrome? Yes. Add to path, recurse from index 3.',
              variables: { start: 2, end: 3, sub: "b", isPalin: true, path: '["a","a","b"]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a"] },
                  "a": { val: "a", state: "visited", children: ["a2"] },
                  "a2": { val: "a", state: "visited", children: ["b"] },
                  "b": { val: "b", state: "active", children: [] },
                },
                currentPath: ["a", "a", "b"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8],
              shortLabel: 'Base case! Add ["a","a","b"]',
              explanation: 'start=3 equals s.length=3. We\'ve partitioned the entire string! Add ["a","a","b"] to result.',
              variables: { start: 3, path: '["a","a","b"]', result: '[["a","a","b"]]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a"] },
                  "a": { val: "a", state: "visited", children: ["a2"] },
                  "a2": { val: "a", state: "visited", children: ["b"] },
                  "b": { val: "b", state: "found", children: [] },
                },
                currentPath: ["a", "a", "b"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [15],
              shortLabel: "Backtrack — remove b, a",
              explanation: 'Backtrack: remove "b", then "a" from path. Back to index 1 — try longer substrings.',
              variables: { start: 1, path: '["a"]', result: '[["a","a","b"]]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a"] },
                  "a": { val: "a", state: "active", children: ["a2"] },
                  "a2": { val: "a", state: "eliminated", children: ["b"] },
                  "b": { val: "b", state: "eliminated", children: [] },
                },
                currentPath: ["a"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10, 11, 12],
              shortLabel: 'Try "ab" — not palindrome ✗',
              explanation: 'At index 1, try s[1:3] = "ab". Is "ab" a palindrome? No — skip this branch entirely.',
              variables: { start: 1, end: 3, sub: "ab", isPalin: false, path: '["a"]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a"] },
                  "a": { val: "a", state: "active", children: ["a2", "ab"] },
                  "a2": { val: "a", state: "eliminated", children: ["b"] },
                  "b": { val: "b", state: "eliminated", children: [] },
                  "ab": { val: "ab", state: "eliminated", children: [] },
                },
                currentPath: ["a"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [15],
              shortLabel: 'Backtrack — remove "a"',
              explanation: 'No more options from index 1 with prefix "a". Backtrack to index 0, try longer first substring.',
              variables: { start: 0, path: "[]", result: '[["a","a","b"]]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "active", children: ["a", "aa"] },
                  "a": { val: "a", state: "eliminated", children: [] },
                },
                currentPath: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [10, 11, 12],
              shortLabel: 'Try "aa" — palindrome ✓',
              explanation: 'At index 0, try s[0:2] = "aa". Is "aa" a palindrome? Yes! Add "aa" to path, recurse from index 2.',
              variables: { start: 0, end: 2, sub: "aa", isPalin: true, path: '["aa"]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a", "aa"] },
                  "a": { val: "a", state: "eliminated", children: [] },
                  "aa": { val: "aa", state: "active", children: [] },
                },
                currentPath: ["aa"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [10, 11, 12],
              shortLabel: 'Try "b" — palindrome ✓',
              explanation: 'Recurse from index 2. Try s[2:3] = "b". Palindrome? Yes. Add to path, recurse from index 3.',
              variables: { start: 2, end: 3, sub: "b", isPalin: true, path: '["aa","b"]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a", "aa"] },
                  "aa": { val: "aa", state: "visited", children: ["b2"] },
                  "b2": { val: "b", state: "active", children: [] },
                },
                currentPath: ["aa", "b"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [7, 8],
              shortLabel: 'Base case! Add ["aa","b"]',
              explanation: 'start=3 equals s.length. Add ["aa","b"] to result. Now we have both valid partitions.',
              variables: { start: 3, path: '["aa","b"]', result: '[["a","a","b"],["aa","b"]]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a", "aa"] },
                  "aa": { val: "aa", state: "visited", children: ["b2"] },
                  "b2": { val: "b", state: "found", children: [] },
                },
                currentPath: ["aa", "b"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [10, 11, 12],
              shortLabel: 'Try "aab" — not palindrome ✗',
              explanation: 'Back at index 0, try s[0:3] = "aab". Not a palindrome — skip. No more options. Done!',
              variables: { start: 0, end: 3, sub: "aab", isPalin: false },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "visited", children: ["a", "aa", "aab"] },
                  "aab": { val: "aab", state: "eliminated", children: [] },
                },
                currentPath: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [1],
              shortLabel: "Return result",
              explanation: 'All branches explored. Return [["a","a","b"],["aa","b"]] — these are the only two ways to partition "aab" into palindromes.',
              variables: { result: '[["a","a","b"],["aa","b"]]' },
              dataStructure: {
                treeNodes: {
                  "root": { val: "aab", state: "found", children: [] },
                },
                currentPath: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Same Characters",
          description: 'All characters identical — many valid partitions',
          input: { s: "aaa" },
          expectedOutput: '[["a","a","a"],["a","aa"],["aa","a"],["aaa"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Start backtrack(0)",
              explanation: 'Begin partitioning "aaa". Since every substring of identical characters is a palindrome, we expect many valid partitions.',
              variables: { start: 0, path: "[]", result: "[]" },
              dataStructure: { treeNodes: { "root": { val: "aaa", state: "active", children: [] } }, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 12, 13, 14],
              shortLabel: 'Cut "a" → recurse',
              explanation: 'Try s[0:1]="a" — palindrome. Recurse from index 1.',
              variables: { start: 0, sub: "a", path: '["a"]' },
              dataStructure: { treeNodes: { "root": { val: "aaa", state: "visited" }, "a": { val: "a", state: "active" } }, currentPath: ["a"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11, 12, 13, 14],
              shortLabel: 'Cut "a" at 1 → recurse',
              explanation: 'From index 1, try s[1:2]="a" — palindrome. Recurse from index 2.',
              variables: { start: 1, sub: "a", path: '["a","a"]' },
              dataStructure: { treeNodes: { "a": { val: "a", state: "visited" }, "a1": { val: "a", state: "active" } }, currentPath: ["a", "a"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8],
              shortLabel: 'Found ["a","a","a"]',
              explanation: 'From index 2, "a" is palindrome, recurse to index 3 = end. Add ["a","a","a"] to result.',
              variables: { path: '["a","a","a"]', result: '[["a","a","a"]]' },
              dataStructure: { treeNodes: { "a1": { val: "a", state: "visited" }, "a2": { val: "a", state: "found" } }, currentPath: ["a", "a", "a"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10, 11, 12, 7, 8],
              shortLabel: 'Found ["a","aa"]',
              explanation: 'Backtrack to index 1. Try s[1:3]="aa" — palindrome! Recurse to end. Add ["a","aa"].',
              variables: { start: 1, sub: "aa", path: '["a","aa"]', result: '[["a","a","a"],["a","aa"]]' },
              dataStructure: { treeNodes: { "a": { val: "a", state: "visited" }, "aa": { val: "aa", state: "found" } }, currentPath: ["a", "aa"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [10, 11, 12, 7, 8],
              shortLabel: 'Found ["aa","a"]',
              explanation: 'Backtrack to index 0. Try s[0:2]="aa" — palindrome. From index 2, "a" works. Add ["aa","a"].',
              variables: { sub: "aa", path: '["aa","a"]', result: '[["a","a","a"],["a","aa"],["aa","a"]]' },
              dataStructure: { treeNodes: { "aa0": { val: "aa", state: "visited" }, "a3": { val: "a", state: "found" } }, currentPath: ["aa", "a"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10, 11, 12, 7, 8],
              shortLabel: 'Found ["aaa"]',
              explanation: 'Try s[0:3]="aaa" — palindrome! Reaches end immediately. Add ["aaa"]. All partitions found.',
              variables: { sub: "aaa", path: '["aaa"]', result: '[["a","a","a"],["a","aa"],["aa","a"],["aaa"]]' },
              dataStructure: { treeNodes: { "aaa": { val: "aaa", state: "found" } }, currentPath: ["aaa"] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const steps = [];
        const result = [];

        function isPalindrome(str) {
          let l = 0, r = str.length - 1;
          while (l < r) {
            if (str[l] !== str[r]) return false;
            l++; r--;
          }
          return true;
        }

        steps.push({
          stepId: 0, lineNumbers: [1],
          shortLabel: "Start backtracking",
          explanation: `Begin partitioning "${s}" from index 0.`,
          variables: { start: 0, path: "[]", result: "[]" },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: false,
        });

        function backtrack(start, path) {
          if (start === s.length) {
            result.push([...path]);
            steps.push({
              stepId: steps.length, lineNumbers: [7, 8],
              shortLabel: `Found [${path.map(p => `"${p}"`).join(",")}]`,
              explanation: `Reached end of string. Add [${path.map(p => `"${p}"`).join(", ")}] to result.`,
              variables: { start, path: JSON.stringify(path), result: JSON.stringify(result) },
              dataStructure: { treeNodes: {}, currentPath: [...path] },
              delta: {}, isAnswer: result.length > 0 && start === s.length,
            });
            return;
          }

          for (let end = start + 1; end <= s.length; end++) {
            const sub = s.substring(start, end);
            const isPalin = isPalindrome(sub);

            steps.push({
              stepId: steps.length, lineNumbers: [10, 11, 12],
              shortLabel: `Try "${sub}" — ${isPalin ? "✓" : "✗"}`,
              explanation: `Try s[${start}:${end}] = "${sub}". ${isPalin ? "Palindrome! Recurse." : "Not a palindrome — skip."}`,
              variables: { start, end, sub, isPalin, path: JSON.stringify(path) },
              dataStructure: { treeNodes: {}, currentPath: [...path] },
              delta: {}, isAnswer: false,
            });

            if (isPalin) {
              path.push(sub);
              backtrack(end, path);
              path.pop();
            }
          }
        }

        backtrack(0, []);

        if (steps.length > 0 && !steps[steps.length - 1].isAnswer) {
          steps.push({
            stepId: steps.length, lineNumbers: [1],
            shortLabel: "Return result",
            explanation: `All branches explored. Found ${result.length} valid partition(s).`,
            variables: { result: JSON.stringify(result) },
            dataStructure: { treeNodes: {}, currentPath: [] },
            delta: {}, isAnswer: true,
          });
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Backtracking + DP Palindrome Cache",
      tier: "optimal",
      timeComplexity: "O(n × 2^n)",
      spaceComplexity: "O(n²)",
      idea: "Precompute a DP table where dp[i][j] = true if s[i..j] is a palindrome. Use this O(1) lookup during backtracking instead of O(n) palindrome checks.",

      javaCode: `public List<List<String>> partition(String s) {
    int n = s.length();
    boolean[][] dp = new boolean[n][n];
    for (int i = n - 1; i >= 0; i--) {
        for (int j = i; j < n; j++) {
            if (s.charAt(i) == s.charAt(j) && (j - i <= 2 || dp[i+1][j-1])) {
                dp[i][j] = true;
            }
        }
    }
    List<List<String>> result = new ArrayList<>();
    backtrack(s, 0, new ArrayList<>(), result, dp);
    return result;
}

private void backtrack(String s, int start, List<String> path, List<List<String>> result, boolean[][] dp) {
    if (start == s.length()) {
        result.add(new ArrayList<>(path));
        return;
    }
    for (int end = start; end < s.length(); end++) {
        if (dp[start][end]) {
            path.add(s.substring(start, end + 1));
            backtrack(s, end + 1, path, result, dp);
            path.remove(path.size() - 1);
        }
    }
}`,

      cppCode: `class Solution {
public:
    vector<vector<string>> partition(string s) {
        int n = s.size();
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && (j - i <= 2 || dp[i+1][j-1])) {
                    dp[i][j] = true;
                }
            }
        }
        vector<vector<string>> result;
        vector<string> path;
        backtrack(s, 0, path, result, dp);
        return result;
    }

    void backtrack(string& s, int start, vector<string>& path, vector<vector<string>>& result, vector<vector<bool>>& dp) {
        if (start == s.size()) {
            result.push_back(path);
            return;
        }
        for (int end = start; end < s.size(); end++) {
            if (dp[start][end]) {
                path.push_back(s.substr(start, end - start + 1));
                backtrack(s, end + 1, path, result, dp);
                path.pop_back();
            }
        }
    }
};`,

      pythonCode: `def partition(s: str) -> List[List[str]]:
    n = len(s)
    dp = [[False] * n for _ in range(n)]
    for i in range(n - 1, -1, -1):
        for j in range(i, n):
            if s[i] == s[j] and (j - i <= 2 or dp[i+1][j-1]):
                dp[i][j] = True

    result = []
    def backtrack(start, path):
        if start == n:
            result.append(path[:])
            return
        for end in range(start, n):
            if dp[start][end]:
                path.append(s[start:end+1])
                backtrack(end + 1, path)
                path.pop()

    backtrack(0, [])
    return result`,

      lineAnnotations: {
        2: "Build DP table: dp[i][j] = true if s[i..j] is palindrome",
        3: "Fill bottom-up: shorter substrings first",
        5: "Characters match AND inner substring is palindrome (or length <= 3)",
        10: "Start backtracking with precomputed palindrome info",
        15: "Base case: entire string partitioned",
        19: "O(1) palindrome check instead of O(n)",
        20: "Choose: add palindrome substring to partition",
        21: "Explore: recurse on remaining string",
        22: "Un-choose: backtrack",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: 'Partition "aab" with DP precomputation',
          input: { s: "aab" },
          expectedOutput: '[["a","a","b"],["aa","b"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Build DP table",
              explanation: 'Precompute palindrome table for "aab". dp[0][0]="a"✓, dp[1][1]="a"✓, dp[2][2]="b"✓, dp[0][1]="aa"✓, dp[1][2]="ab"✗, dp[0][2]="aab"✗.',
              variables: { s: "aab", n: 3 },
              dataStructure: {
                dpTable: [[true, true, false], [false, true, false], [false, false, true]],
                dpHighlight2D: null,
                treeNodes: {},
                currentPath: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10],
              shortLabel: "Start backtrack(0)",
              explanation: "Begin backtracking from index 0 with O(1) palindrome lookups ready.",
              variables: { start: 0, path: "[]", result: "[]" },
              dataStructure: { treeNodes: { "root": { val: "aab", state: "active" } }, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19, 20],
              shortLabel: 'dp[0][0]="a" ✓ → recurse',
              explanation: 'dp[0][0] is true — "a" is a palindrome. Add to path, recurse from index 1.',
              variables: { start: 0, end: 0, sub: "a", path: '["a"]' },
              dataStructure: { treeNodes: { "a": { val: "a", state: "active" } }, currentPath: ["a"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [19, 20, 21],
              shortLabel: 'dp[1][1]="a" ✓ → recurse',
              explanation: 'dp[1][1] is true. Add "a", recurse from 2. Then "b" works, reaching end.',
              variables: { start: 1, sub: "a", path: '["a","a"]' },
              dataStructure: { treeNodes: { "a1": { val: "a", state: "active" } }, currentPath: ["a", "a"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15, 16],
              shortLabel: 'Found ["a","a","b"]',
              explanation: '"b" is palindrome, reaches end. Add ["a","a","b"] to result.',
              variables: { path: '["a","a","b"]', result: '[["a","a","b"]]' },
              dataStructure: { treeNodes: { "b": { val: "b", state: "found" } }, currentPath: ["a", "a", "b"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [19],
              shortLabel: 'dp[1][2]="ab" ✗ — skip',
              explanation: 'dp[1][2] is false — "ab" is not a palindrome. O(1) check saves time.',
              variables: { start: 1, end: 2, sub: "ab" },
              dataStructure: { treeNodes: { "ab": { val: "ab", state: "eliminated" } }, currentPath: ["a"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [19, 20],
              shortLabel: 'dp[0][1]="aa" ✓ → recurse',
              explanation: 'Back at index 0. dp[0][1] is true — "aa" is a palindrome. Add to path, recurse from 2.',
              variables: { start: 0, end: 1, sub: "aa", path: '["aa"]' },
              dataStructure: { treeNodes: { "aa": { val: "aa", state: "active" } }, currentPath: ["aa"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [15, 16],
              shortLabel: 'Found ["aa","b"]',
              explanation: '"b" is palindrome, reaches end. Add ["aa","b"] to result.',
              variables: { path: '["aa","b"]', result: '[["a","a","b"],["aa","b"]]' },
              dataStructure: { treeNodes: { "b2": { val: "b", state: "found" } }, currentPath: ["aa", "b"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [19],
              shortLabel: 'dp[0][2]="aab" ✗ — skip',
              explanation: 'dp[0][2] is false — "aab" is not a palindrome. All options exhausted.',
              variables: { start: 0, end: 2, sub: "aab" },
              dataStructure: { treeNodes: { "aab": { val: "aab", state: "eliminated" } }, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [10],
              shortLabel: "Return result",
              explanation: 'Done. Return [["a","a","b"],["aa","b"]]. The DP table made every palindrome check O(1).',
              variables: { result: '[["a","a","b"],["aa","b"]]' },
              dataStructure: { treeNodes: { "root": { val: "result", state: "found" } }, currentPath: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Character",
          description: "Single character string — trivial case",
          input: { s: "a" },
          expectedOutput: '[["a"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Build DP table",
              explanation: 'For "a", dp[0][0]=true. Only one cell.',
              variables: { s: "a", n: 1 },
              dataStructure: { dpTable: [[true]], treeNodes: {}, currentPath: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 19, 20],
              shortLabel: '"a" is palindrome → recurse',
              explanation: 'dp[0][0]=true. Add "a" to path, recurse from index 1.',
              variables: { start: 0, end: 0, path: '["a"]' },
              dataStructure: { treeNodes: { "a": { val: "a", state: "active" } }, currentPath: ["a"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [15, 16],
              shortLabel: 'Found ["a"]',
              explanation: 'start=1 equals n=1. Add ["a"] to result. Only one possible partition.',
              variables: { result: '[["a"]]' },
              dataStructure: { treeNodes: { "a": { val: "a", state: "found" } }, currentPath: ["a"] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const steps = [];
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(false));

        for (let i = n - 1; i >= 0; i--) {
          for (let j = i; j < n; j++) {
            if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
              dp[i][j] = true;
            }
          }
        }

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Build DP table",
          explanation: `Precompute palindrome table for "${s}".`,
          variables: { s, n },
          dataStructure: { dpTable: dp.map(r => [...r]), treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: false,
        });

        const result = [];

        function backtrack(start, path) {
          if (start === n) {
            result.push([...path]);
            steps.push({
              stepId: steps.length, lineNumbers: [15, 16],
              shortLabel: `Found [${path.map(p => `"${p}"`).join(",")}]`,
              explanation: `Reached end. Add [${path.map(p => `"${p}"`).join(", ")}] to result.`,
              variables: { path: JSON.stringify(path), result: JSON.stringify(result) },
              dataStructure: { treeNodes: {}, currentPath: [...path] },
              delta: {}, isAnswer: false,
            });
            return;
          }

          for (let end = start; end < n; end++) {
            const sub = s.substring(start, end + 1);
            if (dp[start][end]) {
              steps.push({
                stepId: steps.length, lineNumbers: [19, 20],
                shortLabel: `"${sub}" palindrome ✓`,
                explanation: `dp[${start}][${end}]=true — "${sub}" is a palindrome. Add and recurse.`,
                variables: { start, end, sub, path: JSON.stringify(path) },
                dataStructure: { treeNodes: {}, currentPath: [...path, sub] },
                delta: {}, isAnswer: false,
              });
              path.push(sub);
              backtrack(end + 1, path);
              path.pop();
            } else {
              steps.push({
                stepId: steps.length, lineNumbers: [19],
                shortLabel: `"${sub}" not palindrome ✗`,
                explanation: `dp[${start}][${end}]=false — "${sub}" is not a palindrome. Skip.`,
                variables: { start, end, sub },
                dataStructure: { treeNodes: {}, currentPath: [...path] },
                delta: {}, isAnswer: false,
              });
            }
          }
        }

        backtrack(0, []);

        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: "Return result",
          explanation: `Done. Found ${result.length} valid partition(s).`,
          variables: { result: JSON.stringify(result) },
          dataStructure: { treeNodes: {}, currentPath: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n × 2^n)", space: "O(n)", explanation: "2^(n-1) possible partitions, O(n) palindrome check each" },
    optimal: { time: "O(n × 2^n)", space: "O(n²)", explanation: "Same worst case, but O(1) palindrome checks via DP table", tradeoff: "O(n²) space for DP table eliminates repeated palindrome checks" },
  },

  interviewTips: [
    "Start by explaining the backtracking structure: at each index, try all possible cuts.",
    "Mention that the palindrome check can be optimized from O(n) per call to O(1) with DP precomputation.",
    "Clarify that the worst-case time complexity doesn't change — the bottleneck is the number of valid partitions.",
    "Discuss how the DP table is filled: bottom-up, checking if characters match and inner substring is palindrome.",
    "Point out that for strings with many palindromic substrings (like 'aaa'), the number of partitions grows exponentially.",
  ],

  relatedProblems: ["palindromic-substrings", "longest-palindromic-substring"],
};
