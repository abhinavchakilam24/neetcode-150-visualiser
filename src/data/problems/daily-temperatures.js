export const dailyTemperatures = {
  id: 25,
  slug: "daily-temperatures",
  title: "Daily Temperatures",
  difficulty: "Medium",
  topic: "stack",
  topicLabel: "Stack",
  neetcodeNumber: 25,
  artifactType: "Stack",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/daily-temperatures/",

  pattern: "Monotonic Decreasing Stack",
  patternExplanation: `When you need to find the next greater (or smaller) element for each position,
    a monotonic stack processes all elements in O(n) by maintaining a stack of candidates
    whose answer hasn't been determined yet. When a new element resolves a candidate,
    we pop and record the distance.`,

  intuition: {
    coreInsight: `For each day, we need to know how many days until a warmer temperature. Brute force
      checks every future day — O(n²). But notice: if we're scanning left to right and we hit a warm day,
      it simultaneously answers the question for ALL recent cooler days stacked up behind it. A monotonic
      decreasing stack holds indices of days still waiting for a warmer day. When a new temperature is
      warmer than the stack's top, we pop and compute the distance. Each element is pushed and popped
      at most once, so the total work is O(n).`,

    mentalModel: `Imagine a line of people at a theme park, each holding a sign with their height. They're
      all facing forward, waiting to see someone taller. When a tall person arrives, everyone shorter in
      front of them turns around and says "found you!" — they record how far back that tall person was.
      The tall person then joins the line. The stack IS that line of people still waiting.`,

    whyNaiveFails: `Brute force: for each day i, scan forward through days i+1, i+2, ... until you find
      a warmer one. Worst case (strictly decreasing temperatures like [100, 99, 98, ...]), every day scans
      all remaining days — O(n²). For n=100,000 that's 5 billion operations.`,

    keyObservation: `The stack maintains a monotonic decreasing invariant: temperatures corresponding to
      indices in the stack are always in decreasing order from bottom to top. When we encounter a
      temperature warmer than the top, we pop — because we've found the answer for that index. The key
      is that we store INDICES in the stack, not temperatures, so we can compute the day difference directly.`,
  },

  problem: `Given an array of integers temperatures represents the daily temperatures, return an array
    answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer
    temperature. If there is no future day for which this is possible, keep answer[i] == 0.`,

  examples: [
    { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]", explanation: "For day 0 (73°), the next warmer day is day 1 (74°), so answer[0] = 1" },
    { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]", explanation: "Each day's next warmer is immediately the next day, except the last" },
    { input: "temperatures = [30,60,90]", output: "[1,1,0]", explanation: "Strictly increasing — each day only waits 1 day" },
  ],

  constraints: [
    "1 <= temperatures.length <= 10^5",
    "30 <= temperatures[i] <= 100",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: "For each day, scan forward until we find a warmer temperature. Record the distance, or 0 if none found.",

      javaCode: `public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] answer = new int[n];

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
                answer[i] = j - i;
                break;
            }
        }
    }

    return answer;
}`,

      cppCode: `vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> answer(n, 0);

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
                answer[i] = j - i;
                break;
            }
        }
    }

    return answer;
}`,

      pythonCode: `def dailyTemperatures(temperatures: List[int]) -> List[int]:
    n = len(temperatures)
    answer = [0] * n

    for i in range(n):
        for j in range(i + 1, n):
            if temperatures[j] > temperatures[i]:
                answer[i] = j - i
                break

    return answer`,

      lineAnnotations: {
        2: "Get array length",
        3: "Initialize answer array with zeros",
        5: "For each day i",
        6: "Scan every future day j",
        7: "Found a warmer temperature?",
        8: "Record the number of days waited",
        9: "Stop scanning — we only need the NEXT warmer day",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] },
          expectedOutput: "[1,1,4,2,1,1,0,0]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init answer array",
              explanation: "Create answer array of length 8, filled with zeros. Each position will store the number of days until a warmer temperature.",
              variables: { n: 8, answer: "[0,0,0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "i=0: 73° → j=1: 74° > 73°",
              explanation: "Day 0 is 73°. Scan forward: day 1 is 74° which is warmer. answer[0] = 1 - 0 = 1. Found immediately.",
              variables: { i: 0, j: 1, "temps[i]": 73, "temps[j]": 74, "answer[i]": 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "found", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 1, color: "active" }],
                stack: [],
                stackOperation: null,
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7],
              shortLabel: "i=1: 74° → j=2: 75° > 74°",
              explanation: "Day 1 is 74°. Day 2 is 75° — warmer. answer[1] = 2 - 1 = 1.",
              variables: { i: 1, j: 2, "temps[i]": 74, "temps[j]": 75, "answer[i]": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "found", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "j", index: 2, color: "active" }],
                stack: [],
                stackOperation: null,
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "i=2: 75° → scans to j=6: 76°",
              explanation: "Day 2 is 75°. Days 3 (71°), 4 (69°), 5 (72°) are all cooler. Day 6 is 76° — warmer! answer[2] = 6 - 2 = 4. This shows why brute force is slow: we scanned 4 days.",
              variables: { i: 2, j: 6, "temps[i]": 75, "temps[j]": 76, "answer[i]": 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "found", 7: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "j", index: 6, color: "active" }],
                stack: [],
                stackOperation: null,
              },
              delta: { changedIndices: [2, 6] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13],
              shortLabel: "Final answer",
              explanation: "After processing all days: answer = [1,1,4,2,1,1,0,0]. Days 6 and 7 have no warmer future day, so they stay 0.",
              variables: { answer: "[1,1,4,2,1,1,0,0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "found", 7: "found" },
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

      computeSteps: function({ temperatures }) {
        const steps = [];
        const n = temperatures.length;
        const answer = new Array(n).fill(0);
        const defaultStates = () => Object.fromEntries(temperatures.map((_, i) => [i, "default"]));

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init answer array",
          explanation: `Create answer array of length ${n}, filled with zeros.`,
          variables: { n, answer: JSON.stringify(answer) },
          dataStructure: { arrayStates: defaultStates(), pointers: [], stack: [], stackOperation: null },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          let found = false;
          for (let j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
              answer[i] = j - i;
              steps.push({
                stepId: steps.length, lineNumbers: [5, 6, 7, 8],
                shortLabel: `i=${i}: ${temperatures[i]}° → j=${j}: ${temperatures[j]}°`,
                explanation: `Day ${i} is ${temperatures[i]}°. Day ${j} is ${temperatures[j]}° — warmer! answer[${i}] = ${j} - ${i} = ${j - i}.`,
                variables: { i, j, "temps[i]": temperatures[i], "temps[j]": temperatures[j], "answer[i]": answer[i] },
                dataStructure: {
                  arrayStates: { ...defaultStates(), [i]: "active", [j]: "found" },
                  pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
                  stack: [], stackOperation: null,
                },
                delta: { changedIndices: [i, j] }, isAnswer: false,
              });
              found = true;
              break;
            }
          }
          if (!found) {
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6],
              shortLabel: `i=${i}: ${temperatures[i]}° → no warmer day`,
              explanation: `Day ${i} is ${temperatures[i]}°. No future day is warmer. answer[${i}] stays 0.`,
              variables: { i, "temps[i]": temperatures[i], "answer[i]": 0 },
              dataStructure: {
                arrayStates: { ...defaultStates(), [i]: "eliminated" },
                pointers: [{ name: "i", index: i, color: "pointer" }],
                stack: [], stackOperation: null,
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: "Return answer",
          explanation: `Final answer: [${answer.join(",")}].`,
          variables: { answer: JSON.stringify(answer) },
          dataStructure: {
            arrayStates: Object.fromEntries(temperatures.map((_, i) => [i, "found"])),
            pointers: [], stack: [], stackOperation: null,
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Monotonic Decreasing Stack",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Maintain a stack of indices whose temperatures are in decreasing order. For each new temperature,
        pop all indices from the stack whose temperature is less than the current one — the current day
        is the next warmer day for each popped index. Then push the current index.`,

      javaCode: `public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] answer = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
            int prevDay = stack.pop();
            answer[prevDay] = i - prevDay;
        }
        stack.push(i);
    }

    return answer;
}`,

      cppCode: `vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> answer(n, 0);
    stack<int> stk;

    for (int i = 0; i < n; i++) {
        while (!stk.empty() && temperatures[i] > temperatures[stk.top()]) {
            int prevDay = stk.top();
            stk.pop();
            answer[prevDay] = i - prevDay;
        }
        stk.push(i);
    }

    return answer;
}`,

      pythonCode: `def dailyTemperatures(temperatures: List[int]) -> List[int]:
    n = len(temperatures)
    answer = [0] * n
    stack = []

    for i in range(n):
        while stack and temperatures[i] > temperatures[stack[-1]]:
            prev_day = stack.pop()
            answer[prev_day] = i - prev_day
        stack.append(i)

    return answer`,

      lineAnnotations: {
        2: "Get length of temperatures array",
        3: "Initialize answer array with all zeros",
        4: "Stack stores INDICES of days waiting for a warmer day",
        6: "Process each day left to right",
        7: "While current temp is warmer than the day on top of stack",
        8: "Pop that day — we found its next warmer day",
        9: "Distance = current index minus that day's index",
        11: "Push current day onto stack — it's now waiting for its warmer day",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with mixed temperatures showing multiple pops",
          input: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] },
          expectedOutput: "[1,1,4,2,1,1,0,0]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init stack + answer",
              explanation: "Create empty stack and answer array of zeros. The stack will hold indices of days still waiting for a warmer temperature.",
              variables: { n: 8, stack: "[]", answer: "[0,0,0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7],
              shortLabel: "i=0: 73° — stack empty",
              explanation: "Day 0 is 73°. Stack is empty, so the while loop doesn't execute. No one is waiting to be resolved.",
              variables: { i: 0, "temps[i]": 73, stack: "[]", answer: "[0,0,0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [],
                stackOperation: null,
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11],
              shortLabel: "Push index 0",
              explanation: "Push index 0 onto the stack. Day 0 (73°) is now waiting for a warmer day. Stack: [0].",
              variables: { i: 0, "temps[i]": 73, stack: "[0]", answer: "[0,0,0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "queued", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [0],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=1: 74° > 73° — pop 0",
              explanation: "Day 1 is 74°. Stack top is index 0 (73°). 74 > 73, so we pop index 0. answer[0] = 1 - 0 = 1. Day 0 waited 1 day for a warmer temperature!",
              variables: { i: 1, "temps[i]": 74, prevDay: 0, "temps[prevDay]": 73, "answer[0]": 1, stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [],
                stackOperation: "pop",
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11],
              shortLabel: "Push index 1",
              explanation: "Stack is now empty (nothing else to pop). Push index 1. Day 1 (74°) is now waiting. Stack: [1].",
              variables: { i: 1, "temps[i]": 74, stack: "[1]", answer: "[1,0,0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "queued", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [1],
                stackOperation: "push",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=2: 75° > 74° — pop 1",
              explanation: "Day 2 is 75°. Stack top is index 1 (74°). 75 > 74, pop index 1. answer[1] = 2 - 1 = 1.",
              variables: { i: 2, "temps[i]": 75, prevDay: 1, "answer[1]": 1, stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [],
                stackOperation: "pop",
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11],
              shortLabel: "Push index 2",
              explanation: "Push index 2. Day 2 (75°) is now waiting. Stack: [2].",
              variables: { i: 2, "temps[i]": 75, stack: "[2]", answer: "[1,1,0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "queued", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [2],
                stackOperation: "push",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [6, 7],
              shortLabel: "i=3: 71° < 75° — no pop",
              explanation: "Day 3 is 71°. Stack top is index 2 (75°). 71 < 75, so we don't pop. Day 3 is cooler — it can't resolve anyone.",
              variables: { i: 3, "temps[i]": 71, "stack top": "2 (75°)", stack: "[2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "queued", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [2],
                stackOperation: null,
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [11],
              shortLabel: "Push index 3",
              explanation: "Push index 3. Stack: [2, 3]. The stack is decreasing: 75° > 71°.",
              variables: { i: 3, "temps[i]": 71, stack: "[2, 3]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "queued", 3: "queued", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [2, 3],
                stackOperation: "push",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [6, 7, 11],
              shortLabel: "i=4: 69° < 71° — push",
              explanation: "Day 4 is 69°. Stack top is index 3 (71°). 69 < 71, no pop. Push index 4. Stack: [2, 3, 4]. Still monotonic decreasing: 75 > 71 > 69.",
              variables: { i: 4, "temps[i]": 69, stack: "[2, 3, 4]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "queued", 3: "queued", 4: "queued", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: [2, 3, 4],
                stackOperation: "push",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=5: 72° > 69° — pop 4",
              explanation: "Day 5 is 72°. Stack top is index 4 (69°). 72 > 69, pop! answer[4] = 5 - 4 = 1. Day 4 waited 1 day.",
              variables: { i: 5, "temps[i]": 72, prevDay: 4, "answer[4]": 1, stack: "[2, 3]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "queued", 3: "queued", 4: "found", 5: "active", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                stack: [2, 3],
                stackOperation: "pop",
              },
              delta: { changedIndices: [4, 5] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [7, 8, 9],
              shortLabel: "72° > 71° — pop 3",
              explanation: "Still in while loop. Stack top is now index 3 (71°). 72 > 71, pop! answer[3] = 5 - 3 = 2. Day 3 waited 2 days. This is the power of the stack — one day resolves multiple waiting days!",
              variables: { i: 5, "temps[i]": 72, prevDay: 3, "answer[3]": 2, stack: "[2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "queued", 3: "found", 4: "found", 5: "active", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                stack: [2],
                stackOperation: "pop",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [7, 11],
              shortLabel: "72° < 75° — push 5",
              explanation: "Stack top is index 2 (75°). 72 < 75, stop popping. Push index 5. Stack: [2, 5].",
              variables: { i: 5, "temps[i]": 72, stack: "[2, 5]", answer: "[1,1,0,2,1,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "queued", 3: "found", 4: "found", 5: "queued", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                stack: [2, 5],
                stackOperation: "push",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 13,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=6: 76° > 72° — pop 5",
              explanation: "Day 6 is 76°. Stack top is index 5 (72°). 76 > 72, pop! answer[5] = 6 - 5 = 1.",
              variables: { i: 6, "temps[i]": 76, prevDay: 5, "answer[5]": 1, stack: "[2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "queued", 3: "found", 4: "found", 5: "found", 6: "active", 7: "default" },
                pointers: [{ name: "i", index: 6, color: "pointer" }],
                stack: [2],
                stackOperation: "pop",
              },
              delta: { changedIndices: [5, 6] },
              isAnswer: false,
            },
            {
              stepId: 14,
              lineNumbers: [7, 8, 9],
              shortLabel: "76° > 75° — pop 2",
              explanation: "Stack top is index 2 (75°). 76 > 75, pop! answer[2] = 6 - 2 = 4. Day 2 waited 4 whole days for a warmer temperature.",
              variables: { i: 6, "temps[i]": 76, prevDay: 2, "answer[2]": 4, stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "active", 7: "default" },
                pointers: [{ name: "i", index: 6, color: "pointer" }],
                stack: [],
                stackOperation: "pop",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 15,
              lineNumbers: [11],
              shortLabel: "Push index 6",
              explanation: "Stack empty, push index 6. Stack: [6].",
              variables: { i: 6, "temps[i]": 76, stack: "[6]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "queued", 7: "default" },
                pointers: [{ name: "i", index: 6, color: "pointer" }],
                stack: [6],
                stackOperation: "push",
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 16,
              lineNumbers: [6, 7, 11],
              shortLabel: "i=7: 73° < 76° — push 7",
              explanation: "Day 7 is 73°. Stack top is index 6 (76°). 73 < 76, no pop. Push index 7. Stack: [6, 7].",
              variables: { i: 7, "temps[i]": 73, stack: "[6, 7]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "queued", 7: "queued" },
                pointers: [{ name: "i", index: 7, color: "pointer" }],
                stack: [6, 7],
                stackOperation: "push",
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 17,
              lineNumbers: [13],
              shortLabel: "Return [1,1,4,2,1,1,0,0]",
              explanation: "Loop finished. Indices 6 and 7 remain in the stack — they never found a warmer day, so answer[6] = answer[7] = 0. Final answer: [1,1,4,2,1,1,0,0]. Each element was pushed and popped at most once — O(n)!",
              variables: { answer: "[1,1,4,2,1,1,0,0]", "remaining stack": "[6, 7]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "found", 7: "found" },
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
          label: "Strictly Decreasing",
          description: "All temperatures decrease — no day ever gets a warmer future day",
          input: { temperatures: [76, 75, 74, 73] },
          expectedOutput: "[0,0,0,0]",
          commonMistake: "This is the worst case for brute force — every day scans all remaining days and finds nothing. Stack handles it in O(n) because nothing ever gets popped.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init",
              explanation: "Create empty stack and answer array [0,0,0,0]. With strictly decreasing temps, no day will ever resolve — the stack will just grow.",
              variables: { n: 4, stack: "[]", answer: "[0,0,0,0]" },
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
              lineNumbers: [6, 7, 11],
              shortLabel: "i=0: 76° — push",
              explanation: "Day 0 is 76°. Stack empty, push index 0. Stack: [0].",
              variables: { i: 0, "temps[i]": 76, stack: "[0]" },
              dataStructure: {
                arrayStates: { 0: "queued", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [0],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 11],
              shortLabel: "i=1: 75° < 76° — push",
              explanation: "Day 1 is 75°. 75 < 76 (stack top), no pop. Push index 1. Stack: [0, 1]. Monotonic: 76 > 75.",
              variables: { i: 1, "temps[i]": 75, stack: "[0, 1]" },
              dataStructure: {
                arrayStates: { 0: "queued", 1: "queued", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [0, 1],
                stackOperation: "push",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 11],
              shortLabel: "i=2: 74° < 75° — push",
              explanation: "Day 2 is 74°. 74 < 75, no pop. Push. Stack: [0, 1, 2].",
              variables: { i: 2, "temps[i]": 74, stack: "[0, 1, 2]" },
              dataStructure: {
                arrayStates: { 0: "queued", 1: "queued", 2: "queued", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [0, 1, 2],
                stackOperation: "push",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 11],
              shortLabel: "i=3: 73° < 74° — push",
              explanation: "Day 3 is 73°. 73 < 74, no pop. Push. Stack: [0, 1, 2, 3]. Every day is in the stack — none found a warmer day.",
              variables: { i: 3, "temps[i]": 73, stack: "[0, 1, 2, 3]" },
              dataStructure: {
                arrayStates: { 0: "queued", 1: "queued", 2: "queued", 3: "queued" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [0, 1, 2, 3],
                stackOperation: "push",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13],
              shortLabel: "Return [0,0,0,0]",
              explanation: "All indices remain in the stack — no day ever found a warmer future day. Answer stays [0,0,0,0]. The stack never popped, confirming the monotonic decreasing property.",
              variables: { answer: "[0,0,0,0]", "remaining stack": "[0,1,2,3]" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated" },
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
          label: "Strictly Increasing",
          description: "Every day is immediately warmer — each wait is exactly 1 day",
          input: { temperatures: [30, 40, 50, 60] },
          expectedOutput: "[1,1,1,0]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init",
              explanation: "Create empty stack and answer array [0,0,0,0].",
              variables: { n: 4, stack: "[]", answer: "[0,0,0,0]" },
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
              lineNumbers: [6, 7, 11],
              shortLabel: "i=0: 30° — push",
              explanation: "Day 0 is 30°. Stack empty, push index 0.",
              variables: { i: 0, "temps[i]": 30, stack: "[0]" },
              dataStructure: {
                arrayStates: { 0: "queued", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [0],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=1: 40° > 30° — pop 0",
              explanation: "Day 1 is 40°. 40 > 30, pop index 0. answer[0] = 1 - 0 = 1. Immediately resolved!",
              variables: { i: 1, "temps[i]": 40, prevDay: 0, "answer[0]": 1, stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [],
                stackOperation: "pop",
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11],
              shortLabel: "Push index 1",
              explanation: "Push index 1. Stack: [1].",
              variables: { i: 1, stack: "[1]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "queued", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [1],
                stackOperation: "push",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8, 9, 11],
              shortLabel: "i=2: 50° > 40° — pop 1, push 2",
              explanation: "Day 2 is 50°. 50 > 40, pop index 1. answer[1] = 2 - 1 = 1. Push index 2. Stack: [2].",
              variables: { i: 2, "temps[i]": 50, prevDay: 1, "answer[1]": 1, stack: "[2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "queued", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [2],
                stackOperation: "push",
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 8, 9, 11],
              shortLabel: "i=3: 60° > 50° — pop 2, push 3",
              explanation: "Day 3 is 60°. 60 > 50, pop index 2. answer[2] = 3 - 2 = 1. Push index 3. Stack: [3].",
              variables: { i: 3, "temps[i]": 60, prevDay: 2, "answer[2]": 1, stack: "[3]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "queued" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [3],
                stackOperation: "push",
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13],
              shortLabel: "Return [1,1,1,0]",
              explanation: "Loop done. Index 3 stays in the stack with no warmer future day. answer[3] = 0. Final answer: [1,1,1,0]. With strictly increasing temps, the stack never holds more than one element at a time.",
              variables: { answer: "[1,1,1,0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
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

      computeSteps: function({ temperatures }) {
        const steps = [];
        const n = temperatures.length;
        const answer = new Array(n).fill(0);
        const stack = [];
        const defaultStates = () => Object.fromEntries(temperatures.map((_, i) => [i, "default"]));
        const resolved = new Set();

        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4],
          shortLabel: "Init stack + answer",
          explanation: `Create empty stack and answer array of ${n} zeros.`,
          variables: { n, stack: "[]", answer: JSON.stringify(answer) },
          dataStructure: { arrayStates: defaultStates(), pointers: [], stack: [], stackOperation: null },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const getStates = () => {
            const states = {};
            for (let j = 0; j < n; j++) {
              if (resolved.has(j)) states[j] = "found";
              else if (stack.includes(j)) states[j] = "queued";
              else if (j === i) states[j] = "active";
              else states[j] = "default";
            }
            return states;
          };

          while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevDay = stack.pop();
            answer[prevDay] = i - prevDay;
            resolved.add(prevDay);

            steps.push({
              stepId: steps.length, lineNumbers: [7, 8, 9],
              shortLabel: `${temperatures[i]}° > ${temperatures[prevDay]}° — pop ${prevDay}`,
              explanation: `Day ${i} (${temperatures[i]}°) is warmer than day ${prevDay} (${temperatures[prevDay]}°). Pop index ${prevDay}. answer[${prevDay}] = ${i} - ${prevDay} = ${i - prevDay}.`,
              variables: { i, "temps[i]": temperatures[i], prevDay, "temps[prevDay]": temperatures[prevDay], [`answer[${prevDay}]`]: answer[prevDay], stack: `[${stack.join(", ")}]` },
              dataStructure: {
                arrayStates: { ...getStates(), [i]: "active" },
                pointers: [{ name: "i", index: i, color: "pointer" }],
                stack: [...stack],
                stackOperation: "pop",
              },
              delta: { changedIndices: [prevDay, i] }, isAnswer: false,
            });
          }

          stack.push(i);
          steps.push({
            stepId: steps.length, lineNumbers: [11],
            shortLabel: `Push index ${i}`,
            explanation: `Push index ${i} (${temperatures[i]}°) onto stack. Stack: [${stack.join(", ")}].`,
            variables: { i, "temps[i]": temperatures[i], stack: `[${stack.join(", ")}]` },
            dataStructure: {
              arrayStates: { ...getStates(), [i]: "queued" },
              pointers: [{ name: "i", index: i, color: "pointer" }],
              stack: [...stack],
              stackOperation: "push",
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: `Return [${answer.join(",")}]`,
          explanation: `Loop finished. Indices still in stack never found a warmer day — their answer stays 0. Final answer: [${answer.join(",")}].`,
          variables: { answer: JSON.stringify(answer) },
          dataStructure: {
            arrayStates: Object.fromEntries(temperatures.map((_, i) => [i, "found"])),
            pointers: [], stack: [], stackOperation: null,
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n²)", space: "O(1)", explanation: "For each day, scan all future days" },
    optimal: { time: "O(n)",  space: "O(n)", explanation: "Each index is pushed and popped at most once; stack holds up to n indices", tradeoff: "Trade O(n) stack space to eliminate the inner loop entirely" },
  },

  interviewTips: [
    "Start by explaining the brute force O(n²) approach, then motivate the stack optimization.",
    "Emphasize that the stack stores INDICES, not temperatures — this is how we compute day differences.",
    "Explain the monotonic decreasing invariant: the stack always has temperatures in decreasing order.",
    "Point out amortized O(n): each element is pushed once and popped at most once, so total operations <= 2n.",
    "Mention that remaining stack elements after the loop automatically have answer 0 — no extra work needed.",
    "Ask: 'Should I use a stack of indices or (index, temperature) pairs?' — indices suffice since we can look up temps[i].",
  ],

  relatedProblems: ["valid-parentheses", "min-stack", "largest-rectangle-histogram", "car-fleet"],
};
