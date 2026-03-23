export const minStack = {
  id: 22,
  slug: "min-stack",
  title: "Min Stack",
  difficulty: "Medium",
  topic: "stack",
  topicLabel: "Stack",
  neetcodeNumber: 22,
  artifactType: "Stack",
  companies: ["Amazon", "Google", "Bloomberg", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/min-stack/",

  pattern: "Auxiliary Stack for O(1) Min Tracking",
  patternExplanation: `When you need O(1) access to the minimum element in a stack that supports
    push and pop, maintain a second stack that mirrors the main stack but only tracks the running
    minimum at each level. Every push/pop on the main stack has a corresponding push/pop on the
    min stack.`,

  intuition: {
    coreInsight: `The trick is that the minimum can only change when we push or pop. When we push
      a new value, the new minimum is min(newValue, currentMin). When we pop, we lose the top
      element — but the minimum before that push is still stored in the min stack at the same
      position. By keeping a parallel stack of minimums, every level of the stack "remembers"
      what the minimum was at that point in time.`,

    mentalModel: `Imagine stacking books on a shelf, and next to each book you place a sticky note
      with the lightest book weight so far. When you add a 5lb book and the current lightest is 3lb,
      the sticky note says "3lb". When you add a 2lb book, the sticky note says "2lb". When you
      remove the top book, you just read the sticky note on the new top — it already knows the
      minimum without scanning. The min stack IS those sticky notes.`,

    whyNaiveFails: `Without the auxiliary stack, getMin() would need to scan all elements in O(n).
      You might try tracking a single "currentMin" variable, but when you pop the current minimum,
      you'd need to find the next minimum — which requires scanning all remaining elements. The
      min stack avoids this by pre-computing the answer at every stack level.`,

    keyObservation: `The min stack always has the same size as the main stack. On every push,
      we push min(val, minStack.top()) onto the min stack. On every pop, we pop from both stacks.
      getMin() simply peeks at the top of the min stack — always O(1). The key insight is that
      the minimum at any stack depth only depends on the minimum at the previous depth and the
      newly pushed value.`,
  },

  problem: `Design a stack that supports push, pop, top, and retrieving the minimum element
    in constant time. Implement the MinStack class: MinStack() initializes the stack object,
    void push(int val) pushes the element val onto the stack, void pop() removes the element
    on the top of the stack, int top() gets the top element of the stack, int getMin() retrieves
    the minimum element in the stack. You must implement a solution with O(1) time complexity
    for each function.`,

  examples: [
    {
      input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
      output: "[null,null,null,null,-3,null,0,-2]",
      explanation: "Push -2, 0, -3. getMin returns -3. Pop removes -3. top returns 0. getMin returns -2.",
    },
  ],

  constraints: [
    "-2^31 <= val <= 2^31 - 1",
    "Methods pop, top and getMin operations will always be called on non-empty stacks.",
    "At most 3 * 10^4 calls will be made to push, pop, top, and getMin.",
  ],

  approaches: {
    brute: {
      label: "Single Stack + Scan for Min",
      tier: "brute",
      timeComplexity: "O(n) for getMin",
      spaceComplexity: "O(n)",
      idea: "Use a single stack for push/pop/top. For getMin, scan all elements each time.",

      javaCode: `class MinStack {
    Stack<Integer> stack;

    public MinStack() {
        stack = new Stack<>();
    }

    public void push(int val) {
        stack.push(val);
    }

    public void pop() {
        stack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        int min = Integer.MAX_VALUE;
        for (int val : stack) {
            min = Math.min(min, val);
        }
        return min;
    }
}`,

      cppCode: `class MinStack {
    stack<int> st;
    vector<int> elements;
public:
    MinStack() {}

    void push(int val) {
        st.push(val);
        elements.push_back(val);
    }

    void pop() {
        st.pop();
        elements.pop_back();
    }

    int top() {
        return st.top();
    }

    int getMin() {
        int mn = INT_MAX;
        for (int val : elements) {
            mn = min(mn, val);
        }
        return mn;
    }
};`,

      pythonCode: `class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return min(self.stack)`,

      lineAnnotations: {
        2: "Single stack — no auxiliary structure",
        4: "Initialize empty stack",
        8: "Push value onto stack — O(1)",
        12: "Pop top element — O(1)",
        16: "Peek at top element — O(1)",
        20: "Scan all elements to find minimum — O(n)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { operations: ["push(-2)", "push(0)", "push(-3)", "getMin", "pop", "top", "getMin"] },
          expectedOutput: "[null, null, null, -3, null, 0, -2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4],
              shortLabel: "Init stack",
              explanation: "Create an empty stack. In the brute force approach, getMin will scan all elements each time — O(n) per call.",
              variables: { stack: "[]", "stack.size()": 0 },
              dataStructure: {
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8],
              shortLabel: "push(-2)",
              explanation: "Push -2 onto the stack. Stack is now [-2].",
              variables: { val: -2, stack: "[-2]", "stack.size()": 1 },
              dataStructure: {
                stack: [-2],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8],
              shortLabel: "push(0)",
              explanation: "Push 0 onto the stack. Stack is now [-2, 0].",
              variables: { val: 0, stack: "[-2, 0]", "stack.size()": 2 },
              dataStructure: {
                stack: [-2, 0],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8],
              shortLabel: "push(-3)",
              explanation: "Push -3 onto the stack. Stack is now [-2, 0, -3].",
              variables: { val: -3, stack: "[-2, 0, -3]", "stack.size()": 3 },
              dataStructure: {
                stack: [-2, 0, -3],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [20, 21, 22],
              shortLabel: "getMin → scan → -3",
              explanation: "getMin scans all 3 elements: -2, 0, -3. The minimum is -3. This scan takes O(n) time — the brute force weakness.",
              variables: { min: -3, stack: "[-2, 0, -3]", scanned: "all 3 elements" },
              dataStructure: {
                stack: [-2, 0, -3],
                stackOperation: "peek",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12],
              shortLabel: "pop → removes -3",
              explanation: "Pop the top element -3. Stack is now [-2, 0]. The minimum has changed but we won't know until we scan again.",
              variables: { popped: -3, stack: "[-2, 0]", "stack.size()": 2 },
              dataStructure: {
                stack: [-2, 0],
                stackOperation: "pop",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [16],
              shortLabel: "top → 0",
              explanation: "Peek at the top element: 0. This is O(1).",
              variables: { top: 0, stack: "[-2, 0]" },
              dataStructure: {
                stack: [-2, 0],
                stackOperation: "peek",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [20, 21, 22],
              shortLabel: "getMin → scan → -2",
              explanation: "getMin scans all 2 elements: -2, 0. The minimum is -2. Another O(n) scan. With n elements and m getMin calls, this approach costs O(n*m).",
              variables: { min: -2, stack: "[-2, 0]", scanned: "all 2 elements" },
              dataStructure: {
                stack: [-2, 0],
                stackOperation: "peek",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations }) {
        const steps = [];
        const stack = [];

        steps.push({
          stepId: 0, lineNumbers: [4],
          shortLabel: "Init stack",
          explanation: "Create an empty stack. getMin will scan all elements — O(n) per call.",
          variables: { stack: "[]", "stack.size()": 0 },
          dataStructure: { stack: [], stackOperation: null },
          delta: {}, isAnswer: false,
        });

        for (const op of operations) {
          if (op.startsWith("push")) {
            const val = parseInt(op.match(/-?\d+/)[0]);
            stack.push(val);
            steps.push({
              stepId: steps.length, lineNumbers: [8],
              shortLabel: `push(${val})`,
              explanation: `Push ${val} onto the stack. Stack is now [${stack.join(", ")}].`,
              variables: { val, stack: `[${stack.join(", ")}]`, "stack.size()": stack.length },
              dataStructure: { stack: [...stack], stackOperation: "push" },
              delta: {}, isAnswer: false,
            });
          } else if (op === "pop") {
            const popped = stack.pop();
            steps.push({
              stepId: steps.length, lineNumbers: [12],
              shortLabel: `pop → ${popped}`,
              explanation: `Pop top element ${popped}. Stack is now [${stack.join(", ")}].`,
              variables: { popped, stack: `[${stack.join(", ")}]`, "stack.size()": stack.length },
              dataStructure: { stack: [...stack], stackOperation: "pop" },
              delta: {}, isAnswer: false,
            });
          } else if (op === "top") {
            steps.push({
              stepId: steps.length, lineNumbers: [16],
              shortLabel: `top → ${stack[stack.length - 1]}`,
              explanation: `Peek at top: ${stack[stack.length - 1]}.`,
              variables: { top: stack[stack.length - 1], stack: `[${stack.join(", ")}]` },
              dataStructure: { stack: [...stack], stackOperation: "peek" },
              delta: {}, isAnswer: false,
            });
          } else if (op === "getMin") {
            const min = Math.min(...stack);
            steps.push({
              stepId: steps.length, lineNumbers: [20, 21, 22],
              shortLabel: `getMin → ${min}`,
              explanation: `Scan all ${stack.length} elements. Minimum is ${min}.`,
              variables: { min, stack: `[${stack.join(", ")}]`, scanned: `all ${stack.length} elements` },
              dataStructure: { stack: [...stack], stackOperation: "peek" },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps[steps.length - 1].isAnswer = true;
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Two Stacks (Main + Min)",
      tier: "optimal",
      timeComplexity: "O(1) all operations",
      spaceComplexity: "O(n)",
      idea: `Maintain two stacks: the main stack and a min stack. On every push, also push
        min(val, minStack.top()) onto the min stack. On every pop, pop from both. getMin()
        just peeks at the min stack — always O(1).`,

      javaCode: `class MinStack {
    Stack<Integer> stack;
    Stack<Integer> minStack;

    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }

    public void push(int val) {
        stack.push(val);
        int min = minStack.isEmpty()
            ? val
            : Math.min(val, minStack.peek());
        minStack.push(min);
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,

      cppCode: `class MinStack {
    stack<int> st;
    stack<int> minSt;
public:
    MinStack() {}

    void push(int val) {
        st.push(val);
        int mn = minSt.empty()
            ? val
            : min(val, minSt.top());
        minSt.push(mn);
    }

    void pop() {
        st.pop();
        minSt.pop();
    }

    int top() {
        return st.top();
    }

    int getMin() {
        return minSt.top();
    }
};`,

      pythonCode: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        mn = min(val, self.min_stack[-1]) if self.min_stack else val
        self.min_stack.append(mn)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,

      lineAnnotations: {
        2: "Main stack holds actual values",
        3: "Min stack tracks running minimum at each depth",
        6: "Initialize both stacks as empty",
        10: "Push value onto main stack",
        11: "Compute new minimum: min(val, current min)",
        14: "Push the new running minimum onto min stack",
        17: "Pop from BOTH stacks — keep them in sync",
        22: "Peek at main stack top — O(1)",
        26: "Peek at min stack top — O(1), the key insight",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Push values including a new minimum, pop it, verify min updates",
          input: { operations: ["push(-2)", "push(0)", "push(-3)", "getMin", "pop", "top", "getMin"] },
          expectedOutput: "[null, null, null, -3, null, 0, -2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6, 7],
              shortLabel: "Init two stacks",
              explanation: "Create two empty stacks: the main stack for values, and the min stack to track the running minimum at each level. They will always stay the same size.",
              variables: { stack: "[]", minStack: "[]" },
              dataStructure: {
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 14],
              shortLabel: "push(-2): min=-2",
              explanation: "Push -2 onto the main stack. Min stack is empty, so -2 is the minimum. Push -2 onto min stack too. Both stacks: [-2].",
              variables: { val: -2, stack: "[-2]", minStack: "[-2]", currentMin: -2 },
              dataStructure: {
                stack: [-2],
                stackLabels: { 0: "val:-2 min:-2" },
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11, 14],
              shortLabel: "push(0): min=-2",
              explanation: "Push 0 onto main stack. Compare 0 with min stack top (-2): min(-2, 0) = -2. Push -2 onto min stack. Main: [-2, 0], Min: [-2, -2].",
              variables: { val: 0, stack: "[-2, 0]", minStack: "[-2, -2]", currentMin: -2 },
              dataStructure: {
                stack: [-2, 0],
                stackLabels: { 0: "val:-2 min:-2", 1: "val:0 min:-2" },
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11, 14],
              shortLabel: "push(-3): min=-3",
              explanation: "Push -3 onto main stack. Compare -3 with min stack top (-2): min(-2, -3) = -3. Push -3 onto min stack. Main: [-2, 0, -3], Min: [-2, -2, -3]. The new minimum is -3.",
              variables: { val: -3, stack: "[-2, 0, -3]", minStack: "[-2, -2, -3]", currentMin: -3 },
              dataStructure: {
                stack: [-2, 0, -3],
                stackLabels: { 0: "val:-2 min:-2", 1: "val:0 min:-2", 2: "val:-3 min:-3" },
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [26],
              shortLabel: "getMin → -3",
              explanation: "Peek at the min stack top: -3. This is O(1) — no scanning needed! The min stack always knows the current minimum.",
              variables: { "minStack.peek()": -3, stack: "[-2, 0, -3]", minStack: "[-2, -2, -3]" },
              dataStructure: {
                stack: [-2, 0, -3],
                stackOperation: "peek",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [17, 18],
              shortLabel: "pop: removes -3",
              explanation: "Pop from BOTH stacks. Main stack: pop -3, becomes [-2, 0]. Min stack: pop -3, becomes [-2, -2]. The min stack top is now -2 — it automatically reverts to the previous minimum without any scanning.",
              variables: { popped: -3, stack: "[-2, 0]", minStack: "[-2, -2]", currentMin: -2 },
              dataStructure: {
                stack: [-2, 0],
                stackLabels: { 0: "val:-2 min:-2", 1: "val:0 min:-2" },
                stackOperation: "pop",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [22],
              shortLabel: "top → 0",
              explanation: "Peek at the main stack top: 0. This is the current top value.",
              variables: { top: 0, stack: "[-2, 0]", minStack: "[-2, -2]" },
              dataStructure: {
                stack: [-2, 0],
                stackOperation: "peek",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [26],
              shortLabel: "getMin → -2",
              explanation: "Peek at the min stack top: -2. After popping -3, the minimum reverted to -2 automatically. This is the power of the two-stack approach — O(1) getMin at all times.",
              variables: { "minStack.peek()": -2, stack: "[-2, 0]", minStack: "[-2, -2]" },
              dataStructure: {
                stack: [-2, 0],
                stackOperation: "peek",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Decreasing Values",
          description: "All pushes are decreasing — min changes every time",
          input: { operations: ["push(3)", "push(2)", "push(1)", "getMin", "pop", "getMin", "pop", "getMin"] },
          expectedOutput: "[null, null, null, 1, null, 2, null, 3]",
          commonMistake: "If you only track a single min variable, after popping the minimum you'd need to scan the entire stack to find the new min. The min stack handles this by storing the min at each depth.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6, 7],
              shortLabel: "Init two stacks",
              explanation: "Create two empty stacks. This scenario pushes strictly decreasing values, so the minimum changes on every push.",
              variables: { stack: "[]", minStack: "[]" },
              dataStructure: {
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 14],
              shortLabel: "push(3): min=3",
              explanation: "Push 3. Min stack is empty, so 3 is the minimum. Push 3 onto min stack. Both stacks: [3].",
              variables: { val: 3, stack: "[3]", minStack: "[3]", currentMin: 3 },
              dataStructure: {
                stack: [3],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11, 14],
              shortLabel: "push(2): min=2",
              explanation: "Push 2. Compare 2 with min stack top (3): min(3, 2) = 2. Push 2 onto min stack. Main: [3, 2], Min: [3, 2]. New minimum is 2.",
              variables: { val: 2, stack: "[3, 2]", minStack: "[3, 2]", currentMin: 2 },
              dataStructure: {
                stack: [3, 2],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11, 14],
              shortLabel: "push(1): min=1",
              explanation: "Push 1. Compare 1 with min stack top (2): min(2, 1) = 1. Push 1 onto min stack. Main: [3, 2, 1], Min: [3, 2, 1]. New minimum is 1.",
              variables: { val: 1, stack: "[3, 2, 1]", minStack: "[3, 2, 1]", currentMin: 1 },
              dataStructure: {
                stack: [3, 2, 1],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [26],
              shortLabel: "getMin → 1",
              explanation: "Peek at min stack top: 1. The minimum across all elements is 1.",
              variables: { "minStack.peek()": 1, stack: "[3, 2, 1]", minStack: "[3, 2, 1]" },
              dataStructure: {
                stack: [3, 2, 1],
                stackOperation: "peek",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [17, 18],
              shortLabel: "pop: removes 1",
              explanation: "Pop from both stacks. Main: pop 1 → [3, 2]. Min: pop 1 → [3, 2]. Min stack top is now 2 — the minimum automatically reverts.",
              variables: { popped: 1, stack: "[3, 2]", minStack: "[3, 2]", currentMin: 2 },
              dataStructure: {
                stack: [3, 2],
                stackOperation: "pop",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [26],
              shortLabel: "getMin → 2",
              explanation: "Peek at min stack top: 2. After removing 1, the new minimum is correctly 2. A single-variable approach would have needed to scan [3, 2] to find this.",
              variables: { "minStack.peek()": 2, stack: "[3, 2]", minStack: "[3, 2]" },
              dataStructure: {
                stack: [3, 2],
                stackOperation: "peek",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [17, 18],
              shortLabel: "pop: removes 2",
              explanation: "Pop from both stacks. Main: pop 2 → [3]. Min: pop 2 → [3]. Min stack top is now 3.",
              variables: { popped: 2, stack: "[3]", minStack: "[3]", currentMin: 3 },
              dataStructure: {
                stack: [3],
                stackOperation: "pop",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [26],
              shortLabel: "getMin → 3",
              explanation: "Peek at min stack top: 3. Only one element remains. Every pop correctly restored the previous minimum — O(1) at every step.",
              variables: { "minStack.peek()": 3, stack: "[3]", minStack: "[3]" },
              dataStructure: {
                stack: [3],
                stackOperation: "peek",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Duplicate Minimums",
          description: "Same minimum value pushed multiple times",
          input: { operations: ["push(1)", "push(1)", "push(1)", "getMin", "pop", "getMin", "pop", "getMin"] },
          expectedOutput: "[null, null, null, 1, null, 1, null, 1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6, 7],
              shortLabel: "Init two stacks",
              explanation: "Create two empty stacks. Pushing the same minimum multiple times tests whether the min stack handles duplicates.",
              variables: { stack: "[]", minStack: "[]" },
              dataStructure: {
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 14],
              shortLabel: "push(1): min=1",
              explanation: "Push 1. Min stack is empty, so 1 is the minimum. Both stacks: [1].",
              variables: { val: 1, stack: "[1]", minStack: "[1]", currentMin: 1 },
              dataStructure: { stack: [1], stackOperation: "push" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11, 14],
              shortLabel: "push(1): min=1",
              explanation: "Push 1. Compare 1 with min stack top (1): min(1, 1) = 1. Push 1 onto min stack. Both stacks: [1, 1].",
              variables: { val: 1, stack: "[1, 1]", minStack: "[1, 1]", currentMin: 1 },
              dataStructure: { stack: [1, 1], stackOperation: "push" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11, 14],
              shortLabel: "push(1): min=1",
              explanation: "Push 1 again. min(1, 1) = 1. Both stacks: [1, 1, 1]. Even with duplicates, each level independently tracks the minimum.",
              variables: { val: 1, stack: "[1, 1, 1]", minStack: "[1, 1, 1]", currentMin: 1 },
              dataStructure: { stack: [1, 1, 1], stackOperation: "push" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [26],
              shortLabel: "getMin → 1",
              explanation: "Min stack top: 1.",
              variables: { "minStack.peek()": 1 },
              dataStructure: { stack: [1, 1, 1], stackOperation: "peek" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [17, 18],
              shortLabel: "pop: removes 1",
              explanation: "Pop from both. Main: [1, 1]. Min: [1, 1]. Min is still 1.",
              variables: { popped: 1, stack: "[1, 1]", minStack: "[1, 1]", currentMin: 1 },
              dataStructure: { stack: [1, 1], stackOperation: "pop" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [26],
              shortLabel: "getMin → 1",
              explanation: "Min stack top: still 1. Because we pushed the min on every level, it persists correctly.",
              variables: { "minStack.peek()": 1 },
              dataStructure: { stack: [1, 1], stackOperation: "peek" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [17, 18],
              shortLabel: "pop: removes 1",
              explanation: "Pop from both. Main: [1]. Min: [1]. One element left.",
              variables: { popped: 1, stack: "[1]", minStack: "[1]", currentMin: 1 },
              dataStructure: { stack: [1], stackOperation: "pop" },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [26],
              shortLabel: "getMin → 1",
              explanation: "Min stack top: 1. Even after multiple pops of duplicate values, getMin remains O(1) and correct.",
              variables: { "minStack.peek()": 1 },
              dataStructure: { stack: [1], stackOperation: "peek" },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations }) {
        const steps = [];
        const stack = [];
        const minStack = [];

        steps.push({
          stepId: 0, lineNumbers: [5, 6, 7],
          shortLabel: "Init two stacks",
          explanation: "Create two empty stacks: main stack for values, min stack for running minimums.",
          variables: { stack: "[]", minStack: "[]" },
          dataStructure: { stack: [], stackOperation: null },
          delta: {}, isAnswer: false,
        });

        for (const op of operations) {
          if (op.startsWith("push")) {
            const val = parseInt(op.match(/-?\d+/)[0]);
            stack.push(val);
            const min = minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]);
            minStack.push(min);
            steps.push({
              stepId: steps.length, lineNumbers: [10, 11, 14],
              shortLabel: `push(${val}): min=${min}`,
              explanation: `Push ${val} onto main stack. ${minStack.length <= 1 ? `Min stack empty, so ${val} is the minimum.` : `Compare ${val} with min stack top (${minStack[minStack.length - 2]}): min = ${min}.`} Push ${min} onto min stack.`,
              variables: { val, stack: `[${stack.join(", ")}]`, minStack: `[${minStack.join(", ")}]`, currentMin: min },
              dataStructure: { stack: [...stack], stackOperation: "push" },
              delta: {}, isAnswer: false,
            });
          } else if (op === "pop") {
            const popped = stack.pop();
            minStack.pop();
            const currentMin = minStack.length > 0 ? minStack[minStack.length - 1] : "-";
            steps.push({
              stepId: steps.length, lineNumbers: [17, 18],
              shortLabel: `pop: removes ${popped}`,
              explanation: `Pop from both stacks. Removed ${popped}. ${minStack.length > 0 ? `Min stack top is now ${currentMin}.` : "Both stacks empty."}`,
              variables: { popped, stack: `[${stack.join(", ")}]`, minStack: `[${minStack.join(", ")}]`, currentMin },
              dataStructure: { stack: [...stack], stackOperation: "pop" },
              delta: {}, isAnswer: false,
            });
          } else if (op === "top") {
            const top = stack[stack.length - 1];
            steps.push({
              stepId: steps.length, lineNumbers: [22],
              shortLabel: `top → ${top}`,
              explanation: `Peek at main stack top: ${top}.`,
              variables: { top, stack: `[${stack.join(", ")}]` },
              dataStructure: { stack: [...stack], stackOperation: "peek" },
              delta: {}, isAnswer: false,
            });
          } else if (op === "getMin") {
            const min = minStack[minStack.length - 1];
            steps.push({
              stepId: steps.length, lineNumbers: [26],
              shortLabel: `getMin → ${min}`,
              explanation: `Peek at min stack top: ${min}. O(1) — no scanning.`,
              variables: { "minStack.peek()": min, stack: `[${stack.join(", ")}]`, minStack: `[${minStack.join(", ")}]` },
              dataStructure: { stack: [...stack], stackOperation: "peek" },
              delta: {}, isAnswer: false,
            });
          }
        }

        steps[steps.length - 1].isAnswer = true;
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n) for getMin", space: "O(n)", explanation: "getMin scans all elements each time" },
    optimal: { time: "O(1) all ops", space: "O(n)", explanation: "Two stacks of equal size — each operation is a single push/pop/peek", tradeoff: "Extra O(n) space for the min stack buys O(1) getMin instead of O(n)" },
  },

  interviewTips: [
    "Immediately mention the two-stack approach — it's the expected optimal solution.",
    "Explain why a single min variable fails: popping the min leaves you without the next min.",
    "Clarify that the min stack always has the same size as the main stack.",
    "Walk through the push logic: 'I push min(val, minStack.top()) onto the min stack.'",
    "Mention the alternative single-stack approach: store (val, currentMin) pairs.",
    "Discuss edge cases: pushing the same value as the current min, or all elements being the same.",
  ],

  relatedProblems: ["valid-parentheses", "daily-temperatures"],
};
