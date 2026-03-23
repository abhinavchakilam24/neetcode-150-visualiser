export const generateParentheses = {
  id: 24,
  slug: "generate-parentheses",
  title: "Generate Parentheses",
  difficulty: "Medium",
  topic: "stack",
  topicLabel: "Stack",
  neetcodeNumber: 24,
  artifactType: "Stack",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/generate-parentheses/",

  pattern: "Backtracking with Validity Constraints",
  patternExplanation: `Generate all valid combinations by building strings character-by-character,
    using two simple rules to prune invalid paths: (1) you can add '(' if you have remaining opens,
    (2) you can add ')' only if close count < open count. The "stack" concept is implicit — the
    open count minus close count represents the current stack depth of unmatched parentheses.`,

  intuition: {
    coreInsight: `We need all strings of n pairs of parentheses that are "balanced." A string is
      balanced if at every position, the number of close parens never exceeds the number of open
      parens, and at the end they're equal. We can build valid strings character-by-character using
      backtracking: at each position, try adding '(' or ')' but only if it keeps the string potentially
      valid. Two rules: (1) add '(' only if openCount < n, (2) add ')' only if closeCount < openCount.`,

    mentalModel: `Think of building a sequence of nested boxes. You have n boxes to place. At each step,
      you can either OPEN a new box (if you haven't used all n) or CLOSE the most recently opened box
      (if there's one open). You can't close a box that was never opened. The openCount - closeCount
      tells you how many boxes are currently open, which is essentially the "stack depth" of nesting.`,

    whyNaiveFails: `Generating all 2^(2n) binary strings of '(' and ')' and filtering valid ones works
      but is extremely wasteful. For n=10, that's 2^20 = 1,048,576 strings, but only 16,796 are valid
      (the Catalan number C(10)). Backtracking prunes invalid branches early — we never even explore
      paths where closeCount would exceed openCount, so we only generate valid strings.`,

    keyObservation: `The number of valid combinations is the nth Catalan number: C(n) = (2n)! / ((n+1)! * n!).
      This grows much slower than 2^(2n). The backtracking approach generates exactly these valid strings
      with no wasted work. The two pruning conditions — openCount < n and closeCount < openCount — are
      necessary and sufficient to guarantee validity.`,
  },

  problem: `Given n pairs of parentheses, write a function to generate all combinations of
    well-formed parentheses.`,

  examples: [
    { input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]', explanation: "All 5 valid combinations of 3 pairs" },
    { input: "n = 1", output: '["()"]', explanation: "Only one way to arrange 1 pair" },
    { input: "n = 2", output: '["(())","()()"]', explanation: "Two valid combinations of 2 pairs" },
  ],

  constraints: [
    "1 <= n <= 8",
  ],

  approaches: {
    brute: {
      label: "Generate All & Filter",
      tier: "brute",
      timeComplexity: "O(2^(2n) * n)",
      spaceComplexity: "O(2^(2n) * n)",
      idea: "Generate all 2^(2n) strings of '(' and ')' of length 2n, then filter for valid ones.",

      javaCode: `public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    generateAll(new char[2 * n], 0, result);
    return result;
}

void generateAll(char[] current, int pos, List<String> result) {
    if (pos == current.length) {
        if (isValid(current)) {
            result.add(new String(current));
        }
        return;
    }
    current[pos] = '(';
    generateAll(current, pos + 1, result);
    current[pos] = ')';
    generateAll(current, pos + 1, result);
}

boolean isValid(char[] current) {
    int balance = 0;
    for (char c : current) {
        if (c == '(') balance++;
        else balance--;
        if (balance < 0) return false;
    }
    return balance == 0;
}`,

      cppCode: `vector<string> generateParenthesis(int n) {
    vector<string> result;
    string current(2 * n, ' ');
    generateAll(current, 0, result);
    return result;
}

void generateAll(string& current, int pos, vector<string>& result) {
    if (pos == current.size()) {
        if (isValid(current)) {
            result.push_back(current);
        }
        return;
    }
    current[pos] = '(';
    generateAll(current, pos + 1, result);
    current[pos] = ')';
    generateAll(current, pos + 1, result);
}

bool isValid(const string& s) {
    int balance = 0;
    for (char c : s) {
        if (c == '(') balance++;
        else balance--;
        if (balance < 0) return false;
    }
    return balance == 0;
}`,

      pythonCode: `def generateParenthesis(n: int) -> List[str]:
    result = []

    def generate_all(current, pos):
        if pos == 2 * n:
            if is_valid(current):
                result.append("".join(current))
            return
        current[pos] = "("
        generate_all(current, pos + 1)
        current[pos] = ")"
        generate_all(current, pos + 1)

    def is_valid(current):
        balance = 0
        for c in current:
            if c == "(": balance += 1
            else: balance -= 1
            if balance < 0: return False
        return balance == 0

    generate_all([""] * (2 * n), 0)
    return result`,

      lineAnnotations: {
        2: "Result list to collect valid combinations",
        3: "Start generating from position 0",
        7: "Base case: string is complete",
        8: "Check if the full string is valid",
        13: "Try '(' at this position",
        15: "Try ')' at this position",
        19: "Validate: balance must never go negative and must end at 0",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { n: 2 },
          expectedOutput: '["(())","()()"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start generation",
              explanation: "We need to generate all strings of length 4 (2*2) using '(' and ')'. Brute force tries all 2^4 = 16 combinations and filters valid ones.",
              variables: { n: 2, "total combinations": 16, "valid (Catalan)": 2 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 9],
              shortLabel: '"(())" — valid!',
              explanation: "Generated \"(())\". Check validity: balance goes 1,2,1,0. Never negative, ends at 0. Valid! Add to result.",
              variables: { current: "(())", balance: "1→2→1→0", valid: true, result: '["(())"]' },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", "(", ")", ")"],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8],
              shortLabel: '"()()" — valid!',
              explanation: "Generated \"()()\". Balance: 1,0,1,0. Valid! Add to result.",
              variables: { current: "()()", balance: "1→0→1→0", valid: true, result: '["(())","()()"]' },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", ")", "(", ")"],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8],
              shortLabel: '"())(" — invalid',
              explanation: "Generated \"())(\". Balance: 1,0,-1 — went negative at position 2! Invalid. This is why just counting isn't enough — ORDER matters.",
              variables: { current: "())(", balance: "1→0→-1", valid: false },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", ")", ")", "("],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [2],
              shortLabel: 'Return ["(())","()()"]',
              explanation: "Of all 16 combinations, only 2 are valid: \"(())\" and \"()()\". The brute force wasted work on 14 invalid strings. The backtracking approach avoids generating invalid strings entirely.",
              variables: { result: '["(())","()()"]', "tested": 16, "valid": 2 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const result = [];

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Start generation",
          explanation: `Generate all strings of length ${2*n} and filter valid ones. Total combinations: ${Math.pow(2, 2*n)}.`,
          variables: { n, "total combinations": Math.pow(2, 2*n) },
          dataStructure: { arrayStates: {}, pointers: [], stack: [], stackOperation: null },
          delta: {}, isAnswer: false,
        });

        function isValid(s) {
          let balance = 0;
          for (const c of s) {
            if (c === "(") balance++;
            else balance--;
            if (balance < 0) return false;
          }
          return balance === 0;
        }

        function generate(current, pos) {
          if (pos === 2 * n) {
            const s = current.join("");
            const valid = isValid(current);
            if (valid) {
              result.push(s);
              steps.push({
                stepId: steps.length, lineNumbers: [7, 8, 9],
                shortLabel: `"${s}" — valid!`,
                explanation: `Generated "${s}". Valid! Add to result. Result now has ${result.length} string(s).`,
                variables: { current: s, valid: true, result: JSON.stringify(result) },
                dataStructure: { arrayStates: {}, pointers: [], stack: [...current], stackOperation: "push" },
                delta: {}, isAnswer: false,
              });
            }
            return;
          }
          current[pos] = "(";
          generate(current, pos + 1);
          current[pos] = ")";
          generate(current, pos + 1);
        }

        generate(new Array(2 * n).fill(""), 0);

        steps.push({
          stepId: steps.length, lineNumbers: [2],
          shortLabel: `Return ${JSON.stringify(result)}`,
          explanation: `All combinations checked. ${result.length} valid string(s) found.`,
          variables: { result: JSON.stringify(result) },
          dataStructure: { arrayStates: {}, pointers: [], stack: [], stackOperation: null },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Backtracking",
      tier: "optimal",
      timeComplexity: "O(4^n / sqrt(n))",
      spaceComplexity: "O(n)",
      idea: `Build strings character-by-character. At each step, add '(' if openCount < n,
        or add ')' if closeCount < openCount. This ensures we only generate valid combinations,
        pruning all invalid branches immediately.`,

      javaCode: `public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(result, new StringBuilder(), 0, 0, n);
    return result;
}

void backtrack(List<String> result, StringBuilder current,
               int open, int close, int n) {
    if (current.length() == 2 * n) {
        result.add(current.toString());
        return;
    }

    if (open < n) {
        current.append('(');
        backtrack(result, current, open + 1, close, n);
        current.deleteCharAt(current.length() - 1);
    }

    if (close < open) {
        current.append(')');
        backtrack(result, current, open, close + 1, n);
        current.deleteCharAt(current.length() - 1);
    }
}`,

      cppCode: `vector<string> generateParenthesis(int n) {
    vector<string> result;
    string current;
    backtrack(result, current, 0, 0, n);
    return result;
}

void backtrack(vector<string>& result, string& current,
               int open, int close, int n) {
    if (current.size() == 2 * n) {
        result.push_back(current);
        return;
    }

    if (open < n) {
        current.push_back('(');
        backtrack(result, current, open + 1, close, n);
        current.pop_back();
    }

    if (close < open) {
        current.push_back(')');
        backtrack(result, current, open, close + 1, n);
        current.pop_back();
    }
}`,

      pythonCode: `def generateParenthesis(n: int) -> List[str]:
    result = []

    def backtrack(current, open_count, close_count):
        if len(current) == 2 * n:
            result.append("".join(current))
            return

        if open_count < n:
            current.append("(")
            backtrack(current, open_count + 1, close_count)
            current.pop()

        if close_count < open_count:
            current.append(")")
            backtrack(current, open_count, close_count + 1)
            current.pop()

    backtrack([], 0, 0)
    return result`,

      lineAnnotations: {
        2: "Result list to store all valid combinations",
        3: "Start backtracking with empty string, 0 opens, 0 closes",
        8: "Base case: string has 2n characters — it's complete and valid",
        9: "Add to result (guaranteed valid by our pruning rules)",
        12: "Can we add '('? Only if we haven't used all n opens",
        13: "Add '(' and recurse with open + 1",
        14: "Backtrack: remove the '(' we just added",
        17: "Can we add ')'? Only if closes < opens (unmatched opens exist)",
        18: "Add ')' and recurse with close + 1",
        19: "Backtrack: remove the ')' we just added",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Generate all valid combinations for n=3",
          input: { n: 3 },
          expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start backtracking",
              explanation: "Begin with empty string, open=0, close=0, n=3. We need strings of length 6. The Catalan number C(3) = 5, so we'll find exactly 5 valid combinations.",
              variables: { n: 3, current: '""', open: 0, close: 0, result: "[]" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 13],
              shortLabel: 'Add "(" — open=1',
              explanation: "open(0) < n(3), so we can add '('. Current: \"(\". This is the only choice when open = close = 0 — we can't close without an open.",
              variables: { current: '"("', open: 1, close: 0, "stack depth": 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["("],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13],
              shortLabel: 'Add "(" — open=2',
              explanation: "open(1) < n(3), add '('. Current: \"((\". We're exploring the deepest nesting first.",
              variables: { current: '"(("', open: 2, close: 0, "stack depth": 2 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", "("],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13],
              shortLabel: 'Add "(" — open=3',
              explanation: "open(2) < n(3), add '('. Current: \"(((\". Now open=3=n, so we can't add more '(' — only ')' from here.",
              variables: { current: '"((("', open: 3, close: 0, "stack depth": 3 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", "(", "("],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [17, 18],
              shortLabel: 'Add ")" three times',
              explanation: "open=3=n, can't add '('. close(0) < open(3), add ')' three times to close all. Current builds: \"((()\" → \"((()\", then \"((())\" → \"((()))\". Length = 6 = 2n.",
              variables: { current: '"((()))"', open: 3, close: 3, "stack depth": 0 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", "(", "(", ")", ")", ")"],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [8, 9],
              shortLabel: 'Found: "((()))"',
              explanation: "String is complete (length 6). Add \"((()))\" to result. This is the most deeply nested combination. Now backtrack to explore other branches.",
              variables: { current: '"((()))"', result: '["((()))"]', "result count": 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", "(", "(", ")", ")", ")"],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14, 17, 18],
              shortLabel: 'Backtrack → "(()())"',
              explanation: "Backtrack removes last chars. Instead of the third '(' at position 2, we close first: \"(()\" then open again: \"(()(\" then close twice: \"(()())\". Found second valid combination!",
              variables: { current: '"(()())"', result: '["((()))","(()())"]', "result count": 2 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", "(", ")", "(", ")", ")"],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [14, 17, 18],
              shortLabel: 'Backtrack → "(())()"',
              explanation: "Backtrack further. After \"(())\", instead of nesting, we start a new pair: \"(())()\". Found third valid combination!",
              variables: { current: '"(())()"', result: '["((()))","(()())","(())()"]', "result count": 3 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", "(", ")", ")", "(", ")"],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [14, 17, 18],
              shortLabel: 'Backtrack → "()(())"',
              explanation: "Backtrack to the very first choice. After \"()\", nest the remaining: \"()(())\". Found fourth valid combination!",
              variables: { current: '"()(())"', result: '["((()))","(()())","(())()","()(())"]', "result count": 4 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", ")", "(", "(", ")", ")"],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [14, 17, 18],
              shortLabel: 'Backtrack → "()()()"',
              explanation: "Last possibility: three separate pairs \"()()()\". Found fifth and final valid combination!",
              variables: { current: '"()()()"', result: '["((()))","(()())","(())()","()(())","()()()"]', "result count": 5 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", ")", "(", ")", "(", ")"],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [2],
              shortLabel: "Return 5 combinations",
              explanation: "Backtracking complete. Found exactly 5 valid combinations — the 3rd Catalan number C(3)=5. No invalid strings were ever generated, unlike brute force which would test all 64 combinations.",
              variables: { result: '["((()))","(()())","(())()","()(())","()()()"]', "C(3)": 5 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "n=1 (Minimal)",
          description: "Only one pair — only one valid combination",
          input: { n: 1 },
          expectedOutput: '["()"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start: n=1",
              explanation: "With n=1, we need strings of length 2. There's only one valid combination: \"()\". C(1)=1.",
              variables: { n: 1, current: '""', open: 0, close: 0 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 13],
              shortLabel: 'Add "("',
              explanation: "open(0) < n(1), add '('. Current: \"(\". Now open=1=n, so we can't add more '('.",
              variables: { current: '"("', open: 1, close: 0 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["("],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [17, 18],
              shortLabel: 'Add ")" → "()"',
              explanation: "open=n, can't add '('. close(0) < open(1), add ')'. Current: \"()\". Length=2=2n.",
              variables: { current: '"()"', open: 1, close: 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", ")"],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9],
              shortLabel: 'Found: "()"',
              explanation: "String is complete. Add \"()\" to result. Backtrack finds no more branches — both choices at position 0 are exhausted.",
              variables: { result: '["()"]' },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", ")"],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [2],
              shortLabel: 'Return ["()"]',
              explanation: "Only one valid combination for n=1. The key insight: at position 0, ')' would give close > open, so it's pruned. We MUST open first.",
              variables: { result: '["()"]' },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "n=2 (Two Pairs)",
          description: "Two pairs — shows the branching between nesting and sequencing",
          input: { n: 2 },
          expectedOutput: '["(())","()()"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start: n=2",
              explanation: "With n=2, strings have length 4. C(2)=2 valid combinations: either nest \"(())\" or sequence \"()()\".",
              variables: { n: 2, current: '""', open: 0, close: 0 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 13],
              shortLabel: '"(" — open=1',
              explanation: "Must start with '(' (close > open would be invalid). Current: \"(\".",
              variables: { current: '"("', open: 1, close: 0 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["("],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13],
              shortLabel: '"((" — open=2 (branch: nest)',
              explanation: "First branch: add another '('. Current: \"((\". open=2=n, so rest must be all closing.",
              variables: { current: '"(("', open: 2, close: 0, "branch": "nest" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", "("],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [17, 18, 8, 9],
              shortLabel: '"(())" — found!',
              explanation: "Close twice: \"(()\" → \"(())\". Length=4=2n. Add \"(())\" to result. This is the \"nested\" combination.",
              variables: { current: '"(())"', result: '["(())"]', "result count": 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", "(", ")", ")"],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14, 17, 18],
              shortLabel: 'Backtrack to "()" — branch: sequence',
              explanation: "Backtrack to after first '('. Instead of nesting, close first: \"()\". Then open again: \"()(\" → close: \"()()\". This is the \"sequential\" combination.",
              variables: { current: '"()"', open: 1, close: 1, "branch": "sequence" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", ")"],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [8, 9],
              shortLabel: '"()()" — found!',
              explanation: "After \"()\", add \"()\" again: \"()()\". Length=4=2n. Add to result. This is the \"sequential\" combination.",
              variables: { current: '"()()"', result: '["(())","()()"]', "result count": 2 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: ["(", ")", "(", ")"],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [2],
              shortLabel: 'Return ["(())","()()"]',
              explanation: "Backtracking complete. Found 2 valid combinations = C(2). The two branches at position 1 represent the fundamental choice: nest inside or start a new pair.",
              variables: { result: '["(())","()()"]', "C(2)": 2 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const result = [];

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `Start: n=${n}`,
          explanation: `Begin backtracking with n=${n}. Need strings of length ${2*n}.`,
          variables: { n, current: '""', open: 0, close: 0 },
          dataStructure: { arrayStates: {}, pointers: [], stack: [], stackOperation: null },
          delta: {}, isAnswer: false,
        });

        function backtrack(current, open, close) {
          if (current.length === 2 * n) {
            const s = current.join("");
            result.push(s);
            steps.push({
              stepId: steps.length, lineNumbers: [8, 9],
              shortLabel: `Found: "${s}"`,
              explanation: `String complete: "${s}". Add to result. Total found: ${result.length}.`,
              variables: { current: `"${s}"`, result: JSON.stringify(result), "result count": result.length },
              dataStructure: { arrayStates: {}, pointers: [], stack: [...current], stackOperation: null },
              delta: {}, isAnswer: false,
            });
            return;
          }

          if (open < n) {
            current.push("(");
            steps.push({
              stepId: steps.length, lineNumbers: [12, 13],
              shortLabel: `Add "(" — open=${open + 1}`,
              explanation: `open(${open}) < n(${n}), add '('. Current: "${current.join("")}". Stack depth: ${open + 1 - close}.`,
              variables: { current: `"${current.join("")}"`, open: open + 1, close },
              dataStructure: { arrayStates: {}, pointers: [], stack: [...current], stackOperation: "push" },
              delta: {}, isAnswer: false,
            });
            backtrack(current, open + 1, close);
            current.pop();
          }

          if (close < open) {
            current.push(")");
            steps.push({
              stepId: steps.length, lineNumbers: [17, 18],
              shortLabel: `Add ")" — close=${close + 1}`,
              explanation: `close(${close}) < open(${open}), add ')'. Current: "${current.join("")}". Stack depth: ${open - close - 1}.`,
              variables: { current: `"${current.join("")}"`, open, close: close + 1 },
              dataStructure: { arrayStates: {}, pointers: [], stack: [...current], stackOperation: "push" },
              delta: {}, isAnswer: false,
            });
            backtrack(current, open, close + 1);
            current.pop();
          }
        }

        backtrack([], 0, 0);

        steps.push({
          stepId: steps.length, lineNumbers: [2],
          shortLabel: `Return ${result.length} combinations`,
          explanation: `Backtracking complete. Found ${result.length} valid combinations = C(${n}).`,
          variables: { result: JSON.stringify(result), [`C(${n})`]: result.length },
          dataStructure: { arrayStates: {}, pointers: [], stack: [], stackOperation: null },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(2^(2n) * n)", space: "O(2^(2n) * n)", explanation: "Generate all 2^(2n) strings, validate each in O(n)" },
    optimal: { time: "O(4^n / sqrt(n))", space: "O(n)", explanation: "Generates only the C(n) valid strings; recursion depth is 2n; result space is O(4^n/sqrt(n))", tradeoff: "Backtracking prunes invalid branches early, generating only Catalan(n) results instead of 2^(2n)" },
  },

  interviewTips: [
    "Start by explaining the two rules: add '(' if open < n, add ')' if close < open.",
    "Mention the Catalan number — C(n) = (2n)! / ((n+1)! * n!) — shows you understand the math.",
    "Explain why this is a stack problem: open-close tracking IS stack depth tracking.",
    "Draw the recursion tree for n=2 to show how backtracking prunes — only 2 leaves, not 16.",
    "Clarify time complexity: O(4^n/sqrt(n)) is the nth Catalan number — not O(2^(2n)).",
    "If asked about iterative solution, mention you can use an explicit stack of (string, open, close) triples.",
  ],

  relatedProblems: ["valid-parentheses", "valid-parenthesis-string", "letter-combinations-phone"],
};
