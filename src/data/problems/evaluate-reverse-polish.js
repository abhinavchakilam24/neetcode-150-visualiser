export const evaluateReversePolish = {
  id: 23,
  slug: "evaluate-reverse-polish",
  title: "Evaluate Reverse Polish Notation",
  difficulty: "Medium",
  topic: "stack",
  topicLabel: "Stack",
  neetcodeNumber: 23,
  artifactType: "Stack",
  companies: ["Amazon", "Google", "Microsoft", "LinkedIn"],
  leetcodeLink: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",

  pattern: "Stack for Expression Evaluation",
  patternExplanation: `Reverse Polish Notation (postfix) eliminates the need for parentheses and
    operator precedence rules. A stack naturally evaluates it: push operands, and when you hit an
    operator, pop two operands, apply the operator, and push the result back.`,

  intuition: {
    coreInsight: `In RPN, operators always follow their operands. When we encounter a number, we
      don't know what to do with it yet — so we save it (push onto stack). When we encounter an
      operator, we know the two most recent numbers are its operands. Pop them, compute, and push
      the result back. The stack acts as a "waiting room" for numbers that haven't met their
      operator yet.`,

    mentalModel: `Imagine a conveyor belt delivering items to a worker. Numbers are boxes — the
      worker stacks them on a shelf. Operators are instructions — "add the top two boxes." The
      worker grabs the top two boxes off the shelf, combines them into one, and puts the result
      back. At the end, there's exactly one box left on the shelf: the final answer. The shelf
      IS the stack.`,

    whyNaiveFails: `With infix notation (like "3 + 4 * 2"), you need to handle operator precedence,
      parentheses, and associativity — which requires either recursive descent parsing or the
      Shunting-yard algorithm. RPN was specifically designed to avoid this complexity. The stack-based
      evaluation is the standard and optimal approach — there's no simpler way.`,

    keyObservation: `The order of popping matters for non-commutative operators (subtraction and
      division). The SECOND popped value is the LEFT operand, and the FIRST popped value is the
      RIGHT operand. For "4 2 -", you pop 2 first, then 4, and compute 4 - 2 = 2. Getting this
      backwards is the #1 bug in interviews. Also, division truncates toward zero (not floor division).`,
  },

  problem: `You are given an array of strings tokens that represents an arithmetic expression in
    Reverse Polish Notation. Evaluate the expression. Return an integer that represents the value
    of the expression. Valid operators are +, -, *, and /. Each operand may be an integer or another
    expression. The division between two integers always truncates toward zero. There will not be
    any division by zero. The input always represents a valid arithmetic expression.`,

  examples: [
    { input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "((2 + 1) * 3) = 9" },
    { input: 'tokens = ["4","13","5","/","+"]', output: "6", explanation: "(4 + (13 / 5)) = 4 + 2 = 6" },
    { input: 'tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]', output: "22", explanation: "((10 * (6 / ((9 + 3) * -11))) + 17 + 5) = 22" },
  ],

  constraints: [
    "1 <= tokens.length <= 10^4",
    "tokens[i] is either an operator (+, -, *, /) or an integer in range [-200, 200]",
    "The expression is always valid and produces a single result",
    "Division truncates toward zero",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Stack Evaluation",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Iterate through tokens. If the token is a number, push it onto the stack. If it's
        an operator, pop two values (b first, then a), compute a op b, and push the result.
        The final value on the stack is the answer.`,

      javaCode: `public int evalRPN(String[] tokens) {
    Deque<Integer> stack = new ArrayDeque<>();

    for (String token : tokens) {
        if ("+-*/".contains(token)) {
            int b = stack.pop();
            int a = stack.pop();

            switch (token) {
                case "+": stack.push(a + b); break;
                case "-": stack.push(a - b); break;
                case "*": stack.push(a * b); break;
                case "/": stack.push(a / b); break;
            }
        } else {
            stack.push(Integer.parseInt(token));
        }
    }

    return stack.pop();
}`,

      cppCode: `int evalRPN(vector<string>& tokens) {
    stack<int> stk;

    for (const string& token : tokens) {
        if (token == "+" || token == "-" ||
            token == "*" || token == "/") {
            int b = stk.top(); stk.pop();
            int a = stk.top(); stk.pop();

            if (token == "+") stk.push(a + b);
            else if (token == "-") stk.push(a - b);
            else if (token == "*") stk.push(a * b);
            else stk.push(a / b);
        } else {
            stk.push(stoi(token));
        }
    }

    return stk.top();
}`,

      pythonCode: `def evalRPN(tokens: List[str]) -> int:
    stack = []

    for token in tokens:
        if token in "+-*/":
            b = stack.pop()
            a = stack.pop()

            if token == "+": stack.append(a + b)
            elif token == "-": stack.append(a - b)
            elif token == "*": stack.append(a * b)
            else: stack.append(int(a / b))
        else:
            stack.append(int(token))

    return stack[0]`,

      lineAnnotations: {
        2: "Stack holds operands waiting to be used",
        4: "Process each token left to right",
        5: "Is this token an operator?",
        6: "Pop right operand first (LIFO order)",
        7: "Pop left operand second",
        9: "Apply the operator to (a op b) and push result",
        10: "Subtraction: order matters! a - b, not b - a",
        11: "Multiplication",
        12: "Division truncates toward zero",
        15: "It's a number — push onto stack",
        19: "Last value on stack is the final answer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Simple expression: (2 + 1) * 3 = 9",
          input: { tokens: ["2", "1", "+", "3", "*"] },
          expectedOutput: "9",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init stack",
              explanation: "Create an empty stack. We'll process tokens left to right: [\"2\", \"1\", \"+\", \"3\", \"*\"]. Numbers get pushed, operators pop two and push the result.",
              variables: { stack: "[]", tokens: '["2","1","+","3","*"]' },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 15],
              shortLabel: 'Token "2" — push 2',
              explanation: "Token is \"2\" — it's a number, not an operator. Parse it as integer 2 and push onto the stack. Stack: [2].",
              variables: { token: "2", stack: "[2]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [2],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 15],
              shortLabel: 'Token "1" — push 1',
              explanation: "Token is \"1\" — a number. Push 1. Stack: [2, 1]. Both operands are waiting for an operator.",
              variables: { token: "1", stack: "[2, 1]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [2, 1],
                stackOperation: "push",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: 'Token "+" — pop 1,2 → push 3',
              explanation: "Token is \"+\" — an operator! Pop b=1 (right operand), then pop a=2 (left operand). Compute a + b = 2 + 1 = 3. Push 3 back onto the stack. Stack: [3].",
              variables: { token: "+", a: 2, b: 1, "a + b": 3, stack: "[3]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [3],
                stackOperation: "push",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 15],
              shortLabel: 'Token "3" — push 3',
              explanation: "Token is \"3\" — a number. Push 3. Stack: [3, 3]. The first 3 is the result of (2+1), the second 3 is the new operand.",
              variables: { token: "3", stack: "[3, 3]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [3, 3],
                stackOperation: "push",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5, 6, 7, 11],
              shortLabel: 'Token "*" — pop 3,3 → push 9',
              explanation: "Token is \"*\" — an operator! Pop b=3, then a=3. Compute a * b = 3 * 3 = 9. Push 9. Stack: [9]. This represents (2+1)*3 = 9.",
              variables: { token: "*", a: 3, b: 3, "a * b": 9, stack: "[9]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: [9],
                stackOperation: "push",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [19],
              shortLabel: "Return 9",
              explanation: "All tokens processed. Pop the stack: 9. This is ((2 + 1) * 3) = 9. The stack-based evaluation handled operator grouping without any parentheses!",
              variables: { answer: 9, stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found" },
                pointers: [],
                stack: [],
                stackOperation: "pop",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Division Order",
          description: "Tests correct operand ordering for non-commutative division",
          input: { tokens: ["4", "13", "5", "/", "+"] },
          expectedOutput: "6",
          commonMistake: "Popping a before b reverses the operands: you'd compute 5/13=0 instead of 13/5=2. Always remember: first pop is the RIGHT operand (b), second pop is the LEFT operand (a).",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init stack",
              explanation: "Empty stack. Tokens: [\"4\", \"13\", \"5\", \"/\", \"+\"]. This expression is 4 + (13 / 5).",
              variables: { stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 15],
              shortLabel: 'Push 4',
              explanation: "Token \"4\" is a number. Push 4. Stack: [4].",
              variables: { token: "4", stack: "[4]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [4],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 15],
              shortLabel: 'Push 13',
              explanation: "Token \"13\" is a number. Push 13. Stack: [4, 13].",
              variables: { token: "13", stack: "[4, 13]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [4, 13],
                stackOperation: "push",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 15],
              shortLabel: 'Push 5',
              explanation: "Token \"5\" is a number. Push 5. Stack: [4, 13, 5].",
              variables: { token: "5", stack: "[4, 13, 5]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [4, 13, 5],
                stackOperation: "push",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 6, 7, 12],
              shortLabel: '"/" — pop 5,13 → 13/5=2 → push 2',
              explanation: "Token \"/\" is an operator. Pop b=5 (right), pop a=13 (left). Compute a / b = 13 / 5 = 2 (truncated toward zero). Push 2. Stack: [4, 2]. Critical: if we reversed a and b, we'd get 5/13=0 — wrong!",
              variables: { token: "/", a: 13, b: 5, "a / b": 2, stack: "[4, 2]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [4, 2],
                stackOperation: "push",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: '"+" — pop 2,4 → 4+2=6 → push 6',
              explanation: "Token \"+\" is an operator. Pop b=2, pop a=4. Compute a + b = 4 + 2 = 6. Push 6. Stack: [6].",
              variables: { token: "+", a: 4, b: 2, "a + b": 6, stack: "[6]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: [6],
                stackOperation: "push",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [19],
              shortLabel: "Return 6",
              explanation: "All tokens processed. Stack has one value: 6. This is 4 + (13/5) = 4 + 2 = 6. The pop ordering for division was critical here.",
              variables: { answer: 6 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found" },
                pointers: [],
                stack: [],
                stackOperation: "pop",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Negative & Subtraction",
          description: "Tests subtraction ordering and negative intermediate results",
          input: { tokens: ["3", "11", "-", "5", "*"] },
          expectedOutput: "-40",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init stack",
              explanation: "Empty stack. Tokens: [\"3\", \"11\", \"-\", \"5\", \"*\"]. This is (3 - 11) * 5.",
              variables: { stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 15],
              shortLabel: 'Push 3',
              explanation: "Token \"3\" is a number. Push 3. Stack: [3].",
              variables: { token: "3", stack: "[3]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [3],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 15],
              shortLabel: 'Push 11',
              explanation: "Token \"11\" is a number. Push 11. Stack: [3, 11].",
              variables: { token: "11", stack: "[3, 11]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [3, 11],
                stackOperation: "push",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7, 10],
              shortLabel: '"-" — pop 11,3 → 3-11=-8 → push -8',
              explanation: "Token \"-\" — operator! Pop b=11, pop a=3. Compute a - b = 3 - 11 = -8. Push -8. Stack: [-8]. The result is negative — that's fine, intermediate values can be negative.",
              variables: { token: "-", a: 3, b: 11, "a - b": -8, stack: "[-8]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [-8],
                stackOperation: "push",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 15],
              shortLabel: 'Push 5',
              explanation: "Token \"5\" is a number. Push 5. Stack: [-8, 5].",
              variables: { token: "5", stack: "[-8, 5]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [-8, 5],
                stackOperation: "push",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5, 6, 7, 11],
              shortLabel: '"*" — pop 5,-8 → -8*5=-40 → push -40',
              explanation: "Token \"*\" — operator! Pop b=5, pop a=-8. Compute a * b = -8 * 5 = -40. Push -40. Stack: [-40].",
              variables: { token: "*", a: -8, b: 5, "a * b": -40, stack: "[-40]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: [-40],
                stackOperation: "push",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [19],
              shortLabel: "Return -40",
              explanation: "All tokens processed. Answer is -40. This is (3 - 11) * 5 = -8 * 5 = -40.",
              variables: { answer: -40 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found" },
                pointers: [],
                stack: [],
                stackOperation: "pop",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tokens }) {
        const steps = [];
        const stack = [];
        const ops = new Set(["+", "-", "*", "/"]);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init stack",
          explanation: "Create an empty stack to hold operands.",
          variables: { stack: "[]", tokens: JSON.stringify(tokens) },
          dataStructure: {
            arrayStates: Object.fromEntries(tokens.map((_, i) => [i, "default"])),
            pointers: [], stack: [], stackOperation: null,
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          const getArrayStates = () => {
            const states = {};
            for (let j = 0; j < tokens.length; j++) {
              states[j] = j < i ? "visited" : j === i ? "active" : "default";
            }
            return states;
          };

          if (ops.has(token)) {
            const b = stack.pop();
            const a = stack.pop();
            let result;
            if (token === "+") result = a + b;
            else if (token === "-") result = a - b;
            else if (token === "*") result = a * b;
            else result = Math.trunc(a / b);

            stack.push(result);

            steps.push({
              stepId: steps.length,
              lineNumbers: [4, 5, 6, 7, token === "+" ? 9 : token === "-" ? 10 : token === "*" ? 11 : 12],
              shortLabel: `"${token}" — ${a} ${token} ${b} = ${result}`,
              explanation: `Token "${token}" is an operator. Pop b=${b} (right), pop a=${a} (left). Compute a ${token} b = ${a} ${token} ${b} = ${result}. Push ${result}. Stack: [${stack.join(", ")}].`,
              variables: { token, a, b, [`a ${token} b`]: result, stack: `[${stack.join(", ")}]` },
              dataStructure: {
                arrayStates: getArrayStates(),
                pointers: [{ name: "i", index: i, color: "pointer" }],
                stack: [...stack],
                stackOperation: "push",
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          } else {
            const num = parseInt(token, 10);
            stack.push(num);

            steps.push({
              stepId: steps.length, lineNumbers: [4, 15],
              shortLabel: `Push ${num}`,
              explanation: `Token "${token}" is a number. Push ${num}. Stack: [${stack.join(", ")}].`,
              variables: { token, stack: `[${stack.join(", ")}]` },
              dataStructure: {
                arrayStates: getArrayStates(),
                pointers: [{ name: "i", index: i, color: "pointer" }],
                stack: [...stack],
                stackOperation: "push",
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [19],
          shortLabel: `Return ${stack[0]}`,
          explanation: `All tokens processed. The single remaining value on the stack is ${stack[0]}. This is the final answer.`,
          variables: { answer: stack[0] },
          dataStructure: {
            arrayStates: Object.fromEntries(tokens.map((_, i) => [i, "found"])),
            pointers: [], stack: [], stackOperation: "pop",
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(n)", explanation: "Stack evaluation is already optimal — no brute force alternative" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "Single pass through tokens; stack holds at most (n+1)/2 operands", tradeoff: "No meaningful tradeoff — this is the canonical approach" },
  },

  interviewTips: [
    "Clarify: 'Division truncates toward zero, not floor division, correct?' — this matters for negative numbers (e.g., -7/2 = -3, not -4).",
    "Emphasize the pop ordering: first pop is the RIGHT operand, second pop is the LEFT operand.",
    "Mention that a valid RPN expression always has exactly (operators + 1) operands.",
    "If asked about error handling, note: an invalid expression would cause a stack underflow (popping from empty stack).",
    "Point out this is O(n) time and O(n) space — there's no way to do better since we must read every token.",
    "For Java, use ArrayDeque instead of Stack — it's faster (Stack is synchronized).",
  ],

  relatedProblems: ["valid-parentheses", "min-stack", "generate-parentheses"],
};
