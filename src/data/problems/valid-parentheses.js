export const validParentheses = {
  id: 21,
  slug: "valid-parentheses",
  title: "Valid Parentheses",
  difficulty: "Easy",
  topic: "stack",
  topicLabel: "Stack",
  neetcodeNumber: 21,
  artifactType: "Stack",
  companies: ["Amazon", "Google", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/valid-parentheses/",

  pattern: "Stack for Matching Pairs",
  patternExplanation: `When you need to match opening and closing delimiters in order,
    a stack naturally enforces the "most recently opened must be closed first" rule (LIFO).
    Push openers, pop on closers, and check that the popped opener matches.`,

  intuition: {
    coreInsight: `Every closing bracket must match the most recent unmatched opening bracket.
      This is exactly what a stack does — the last element pushed is the first one popped (LIFO).
      When we see an opener, we push it. When we see a closer, we pop the stack and check if
      the popped opener is the matching type. If it doesn't match, or the stack is empty when
      we need to pop, the string is invalid. If the stack is empty at the end, every opener
      was matched.`,

    mentalModel: `Think of Russian nesting dolls (matryoshka). You open the outermost doll first,
      then the next one inside, and so on. When you start closing them, you MUST close the
      innermost one first — you can't close the outer doll while the inner one is still open.
      The stack tracks which "dolls" are still open, and the top of the stack is always the
      innermost open doll that needs to be closed next.`,

    whyNaiveFails: `A naive approach might try to count brackets — e.g., ensure equal numbers of
      '(' and ')'. But "())(" has equal counts and is still invalid. Another naive approach
      repeatedly removes adjacent matching pairs like "()" from the string until nothing is left,
      which works but takes O(n²) time in the worst case (each removal pass is O(n), and you
      might need O(n) passes). The stack solves it in a single O(n) pass.`,

    keyObservation: `The stack must be empty at the end for the string to be valid. An opening
      bracket with no matching closer means the stack still has elements. A closing bracket
      with no matching opener means we try to pop from an empty stack. Both are invalid.
      The key invariant: at every point during the scan, the stack contains exactly the
      unmatched opening brackets, in order, waiting for their closers.`,
  },

  problem: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
    determine if the input string is valid. An input string is valid if: (1) Open brackets
    must be closed by the same type of brackets, (2) Open brackets must be closed in the
    correct order, and (3) Every close bracket has a corresponding open bracket of the same type.`,

  examples: [
    { input: 's = "()"',     output: "true",  explanation: "Single pair of matching parentheses." },
    { input: 's = "()[]{}"', output: "true",  explanation: "Three consecutive matching pairs." },
    { input: 's = "(]"',     output: "false", explanation: "'(' is not closed by ']' — type mismatch." },
  ],

  constraints: [
    "1 <= s.length <= 10^4",
    "s consists of parentheses only '()[]{}'",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Stack Matching",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Iterate through the string. Push every opening bracket onto the stack.
        When encountering a closing bracket, pop the stack and verify the popped opener
        matches. If it doesn't match, or the stack is empty on a close, return false.
        At the end, the string is valid only if the stack is empty.`,

      javaCode: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> map = Map.of(
        ')', '(', ']', '[', '}', '{');

    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);

        if (map.containsValue(c)) {
            stack.push(c);
        } else {
            if (stack.isEmpty() || stack.pop() != map.get(c)) {
                return false;
            }
        }
    }

    return stack.isEmpty();
}`,

      cppCode: `bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> map = {
        {')', '('}, {']', '['}, {'}', '{'}};

    for (int i = 0; i < s.size(); i++) {
        char c = s[i];

        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty() || st.top() != map[c]) {
                return false;
            }
            st.pop();
        }
    }

    return st.empty();
}`,

      pythonCode: `def isValid(s: str) -> bool:
    stack = []
    close_to_open = {')': '(', ']': '[', '}': '{'}

    for c in s:
        if c in close_to_open:
            if not stack or stack.pop() != close_to_open[c]:
                return False
        else:
            stack.append(c)

    return len(stack) == 0`,

      lineAnnotations: {
        2:  "Initialize an empty stack to track unmatched openers",
        3:  "Map each closer to its expected opener",
        6:  "Iterate through each character in the string",
        7:  "Get the current character",
        9:  "If it's an opening bracket, push onto stack",
        10: "Push the opener — it's waiting for its matching closer",
        12: "It's a closing bracket — pop and check",
        13: "If stack is empty (no opener to match) or mismatch → invalid",
        18: "All chars processed. Valid only if no unmatched openers remain",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Nested brackets — valid string with all three bracket types",
          input: { s: "({[]})", chars: ["(", "{", "[", "]", "}", ")"] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init stack",
              explanation: "Create an empty stack and a mapping of closing brackets to their matching openers. The stack will track unmatched opening brackets as we scan left to right.",
              variables: { i: "-", c: "-", stack: "[]", "stack.size()": 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 9, 10],
              shortLabel: "i=0: '(' → push",
              explanation: "Character is '(' — an opening bracket. Push it onto the stack. It's now waiting for a matching ')'.",
              variables: { i: 0, c: "(", stack: "['(']", "stack.size()": 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: ["("],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 9, 10],
              shortLabel: "i=1: '{' → push",
              explanation: "Character is '{' — another opener. Push it onto the stack. Now the stack has '(' at the bottom and '{' on top. The '{' must be closed before the '(' can be.",
              variables: { i: 1, c: "{", stack: "['(', '{']", "stack.size()": 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: ["(", "{"],
                stackOperation: "push",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 9, 10],
              shortLabel: "i=2: '[' → push",
              explanation: "Character is '[' — yet another opener. Push it. Stack is now ['(', '{', '[']. The innermost bracket '[' must close first.",
              variables: { i: 2, c: "[", stack: "['(', '{', '[']", "stack.size()": 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: ["(", "{", "["],
                stackOperation: "push",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 12],
              shortLabel: "i=3: ']' → pop '[' ✓",
              explanation: "Character is ']' — a closer. Pop the stack: we get '['. Does '[' match ']'? Yes! The innermost bracket pair is now matched. Stack becomes ['(', '{'].",
              variables: { i: 3, c: "]", popped: "[", match: "✓", stack: "['(', '{']", "stack.size()": 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "found", 3: "found", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: ["(", "{"],
                stackOperation: "pop",
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 12],
              shortLabel: "i=4: '}' → pop '{' ✓",
              explanation: "Character is '}' — a closer. Pop the stack: we get '{'. Does '{' match '}'? Yes! Stack becomes ['('].",
              variables: { i: 4, c: "}", popped: "{", match: "✓", stack: "['(']", "stack.size()": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "found", 3: "found", 4: "found", 5: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: ["("],
                stackOperation: "pop",
              },
              delta: { changedIndices: [1, 4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 7, 12],
              shortLabel: "i=5: ')' → pop '(' ✓",
              explanation: "Character is ')' — a closer. Pop the stack: we get '('. Does '(' match ')'? Yes! Stack is now empty.",
              variables: { i: 5, c: ")", popped: "(", match: "✓", stack: "[]", "stack.size()": 0 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                stack: [],
                stackOperation: "pop",
              },
              delta: { changedIndices: [0, 5] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [18],
              shortLabel: "Stack empty → true",
              explanation: "We've processed all characters. The stack is empty, meaning every opening bracket was matched by its correct closing bracket in the right order. Return true.",
              variables: { "stack.isEmpty()": true, result: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found" },
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
          label: "Interleaved Mismatch",
          description: "Brackets interleave incorrectly — ([)] is not valid",
          input: { s: "([)]", chars: ["(", "[", ")", "]"] },
          expectedOutput: "false",
          commonMistake: "Counting brackets gives 1 of each type — balanced counts. But the ORDER is wrong: ')' tries to close '[' which is a mismatch. This is why counting alone fails and a stack is necessary.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init stack",
              explanation: "Create an empty stack. This test case has balanced bracket counts but incorrect nesting — the stack will catch the ordering violation.",
              variables: { i: "-", c: "-", stack: "[]", "stack.size()": 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 9, 10],
              shortLabel: "i=0: '(' → push",
              explanation: "Character is '(' — an opening bracket. Push it onto the stack.",
              variables: { i: 0, c: "(", stack: "['(']", "stack.size()": 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: ["("],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 9, 10],
              shortLabel: "i=1: '[' → push",
              explanation: "Character is '[' — another opener. Push it. Stack is now ['(', '[']. The '[' is on top and must be closed next.",
              variables: { i: 1, c: "[", stack: "['(', '[']", "stack.size()": 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: ["(", "["],
                stackOperation: "push",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 12, 13],
              shortLabel: "i=2: ')' → pop '[' ✗ MISMATCH",
              explanation: "Character is ')' — a closer. Pop the stack: we get '['. Does '[' match ')'? No! '[' expects ']', not ')'. The brackets are interleaved incorrectly. Return false immediately.",
              variables: { i: 2, c: ")", popped: "[", expected: "(", match: "✗", result: "false" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "eliminated", 2: "eliminated", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: ["("],
                stackOperation: "pop",
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const chars = s.split("");
        const steps = [];
        const stack = [];
        const closeToOpen = { ")": "(", "]": "[", "}": "{" };
        const openers = new Set(["(", "[", "{"]);
        const n = chars.length;

        const getArrayStates = (currentIndex, matchedIndices, eliminatedIndices) => {
          const states = {};
          for (let j = 0; j < n; j++) {
            if (matchedIndices.has(j)) states[j] = "found";
            else if (eliminatedIndices.has(j)) states[j] = "eliminated";
            else if (j < currentIndex) states[j] = "visited";
            else if (j === currentIndex) states[j] = "active";
            else states[j] = "default";
          }
          return states;
        };

        const matched = new Set();
        const eliminated = new Set();
        // Track which index pushed each stack element
        const stackIndices = [];

        steps.push({
          stepId: 0,
          lineNumbers: [2, 3],
          shortLabel: "Init stack",
          explanation: "Create an empty stack and a mapping of closing brackets to their matching openers.",
          variables: { i: "-", c: "-", stack: "[]", "stack.size()": 0 },
          dataStructure: {
            arrayStates: getArrayStates(-1, matched, eliminated),
            pointers: [],
            stack: [],
            stackOperation: null,
          },
          delta: {},
          isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const c = chars[i];

          if (openers.has(c)) {
            stack.push(c);
            stackIndices.push(i);

            steps.push({
              stepId: steps.length,
              lineNumbers: [6, 7, 9, 10],
              shortLabel: `i=${i}: '${c}' → push`,
              explanation: `Character is '${c}' — an opening bracket. Push it onto the stack. Stack now has ${stack.length} element${stack.length > 1 ? "s" : ""}.`,
              variables: { i, c, stack: JSON.stringify(stack), "stack.size()": stack.length },
              dataStructure: {
                arrayStates: getArrayStates(i + 1, matched, eliminated),
                pointers: [{ name: "i", index: i, color: "pointer" }],
                stack: [...stack],
                stackOperation: "push",
              },
              delta: { changedIndices: [i] },
              isAnswer: false,
            });
          } else {
            // Closing bracket
            const expected = closeToOpen[c];

            if (stack.length === 0 || stack[stack.length - 1] !== expected) {
              // Mismatch or empty stack
              const popped = stack.length > 0 ? stack.pop() : null;
              const poppedIndex = stackIndices.length > 0 ? stackIndices.pop() : null;

              if (poppedIndex !== null) eliminated.add(poppedIndex);
              eliminated.add(i);

              steps.push({
                stepId: steps.length,
                lineNumbers: [6, 7, 12, 13],
                shortLabel: popped
                  ? `i=${i}: '${c}' → pop '${popped}' ✗`
                  : `i=${i}: '${c}' → stack empty ✗`,
                explanation: popped
                  ? `Character is '${c}'. Pop the stack: got '${popped}'. Expected '${expected}' but got '${popped}' — mismatch! Return false.`
                  : `Character is '${c}' but the stack is empty — no opening bracket to match. Return false.`,
                variables: { i, c, popped: popped || "none", expected, match: "✗", result: "false" },
                dataStructure: {
                  arrayStates: getArrayStates(i + 1, matched, eliminated),
                  pointers: [{ name: "i", index: i, color: "pointer" }],
                  stack: [...stack],
                  stackOperation: popped ? "pop" : null,
                },
                delta: { changedIndices: [i] },
                isAnswer: true,
              });
              return steps;
            }

            // Successful match
            const popped = stack.pop();
            const poppedIndex = stackIndices.pop();
            matched.add(poppedIndex);
            matched.add(i);

            steps.push({
              stepId: steps.length,
              lineNumbers: [6, 7, 12],
              shortLabel: `i=${i}: '${c}' → pop '${popped}' ✓`,
              explanation: `Character is '${c}'. Pop the stack: got '${popped}'. Does '${popped}' match '${c}'? Yes! Stack now has ${stack.length} element${stack.length !== 1 ? "s" : ""}.`,
              variables: { i, c, popped, match: "✓", stack: JSON.stringify(stack), "stack.size()": stack.length },
              dataStructure: {
                arrayStates: getArrayStates(i + 1, matched, eliminated),
                pointers: [{ name: "i", index: i, color: "pointer" }],
                stack: [...stack],
                stackOperation: "pop",
              },
              delta: { changedIndices: [poppedIndex, i] },
              isAnswer: false,
            });
          }
        }

        // Final check: is stack empty?
        const isValid = stack.length === 0;
        steps.push({
          stepId: steps.length,
          lineNumbers: [18],
          shortLabel: isValid ? "Stack empty → true" : "Stack not empty → false",
          explanation: isValid
            ? "All characters processed. The stack is empty — every opener was matched. Return true."
            : `All characters processed, but the stack still contains ${stack.length} unmatched opener${stack.length > 1 ? "s" : ""}: [${stack.join(", ")}]. Return false.`,
          variables: { "stack.isEmpty()": isValid, result: String(isValid) },
          dataStructure: {
            arrayStates: getArrayStates(n, matched, eliminated),
            pointers: [],
            stack: [...stack],
            stackOperation: null,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    optimal: {
      time: "O(n)",
      space: "O(n)",
      explanation: "Single pass through the string. Stack stores at most n/2 elements (all openers).",
      tradeoff: "O(n) space for the stack is unavoidable — we must track nesting order.",
    },
  },

  interviewTips: [
    "Mention the LIFO property of stacks — it naturally enforces 'most recently opened must close first'.",
    "Clarify edge cases: empty string (valid), single character (invalid), only openers (invalid).",
    "Explain why counting brackets alone fails — '([)]' has balanced counts but invalid nesting.",
    "Handle the empty-stack-on-close case explicitly — don't just pop without checking.",
    "Mention that the stack size is at most n/2 (all openers), so space is O(n).",
    "Walk through the algorithm verbally: 'I push openers, pop on closers, check for match, and verify the stack is empty at the end.'",
  ],

  relatedProblems: ["min-stack", "generate-parentheses", "valid-parenthesis-string"],
};
