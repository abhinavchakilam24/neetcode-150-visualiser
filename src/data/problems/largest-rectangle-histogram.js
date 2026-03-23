export const largestRectangleHistogram = {
  id: 27,
  slug: "largest-rectangle-histogram",
  title: "Largest Rectangle in Histogram",
  difficulty: "Hard",
  topic: "stack",
  topicLabel: "Stack",
  neetcodeNumber: 27,
  artifactType: "Stack",
  companies: ["Amazon", "Google", "Microsoft", "Meta", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/largest-rectangle-in-histogram/",

  pattern: "Monotonic Stack for Next Smaller Element",
  patternExplanation: `Use a monotonic increasing stack to efficiently find the nearest smaller bar
    on both left and right for each bar. This determines the maximum width each bar can extend,
    enabling O(n) computation of the largest rectangle.`,

  intuition: {
    coreInsight: `For each bar of height h, the largest rectangle using that bar as the shortest
      bar extends left and right until it hits a shorter bar. The key is finding, for every bar,
      the nearest shorter bar on each side. A monotonic increasing stack does this in O(n) total:
      when we pop a bar, the current bar is its right boundary and the new stack top is its left boundary.`,

    mentalModel: `Imagine stacking blocks of increasing height. When you encounter a shorter block,
      every taller block on top can no longer extend further right. So you "settle" each popped
      block's rectangle: its height is its own value, its right boundary is the current position,
      and its left boundary is whatever is below it on the stack. The stack acts as a "waiting list"
      of bars still hoping to extend rightward.`,

    whyNaiveFails: `Brute force checks every pair (i, j) and finds the min height between them,
      giving O(n²) or O(n³). For n=100,000 bars, that's up to 10^15 operations — completely
      impractical. The stack processes each bar exactly twice (push + pop), giving O(n).`,

    keyObservation: `When you pop bar X from the stack because bar Y is shorter, you know:
      (1) Y is X's right boundary (first shorter bar to the right), and (2) the new stack top
      is X's left boundary (first shorter bar to the left). Width = right - left - 1. This
      gives the exact maximum rectangle using X as the minimum height.`,
  },

  problem: `Given an array of integers heights representing the histogram's bar height where
    the width of each bar is 1, return the area of the largest rectangle in the histogram.`,

  examples: [
    { input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "The largest rectangle has area = 10 (from bars at index 2 and 3, height 5, width 2; or equivalently the rectangle of height 2 from index 2 to 5 isn't as large)." },
    { input: "heights = [2,4]", output: "4", explanation: "The largest rectangle is either bar 1 alone (area=4) or both bars with min height 2 (area=4)." },
  ],

  constraints: [
    "1 <= heights.length <= 10^5",
    "0 <= heights[i] <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: "For each bar, expand left and right while bars are >= current height. Compute area.",

      javaCode: `public int largestRectangleArea(int[] heights) {
    int maxArea = 0;
    for (int i = 0; i < heights.length; i++) {
        int minH = heights[i];
        for (int j = i; j < heights.length; j++) {
            minH = Math.min(minH, heights[j]);
            maxArea = Math.max(maxArea, minH * (j - i + 1));
        }
    }
    return maxArea;
}`,

      cppCode: `int largestRectangleArea(vector<int>& heights) {
    int maxArea = 0;
    for (int i = 0; i < heights.size(); i++) {
        int minH = heights[i];
        for (int j = i; j < heights.size(); j++) {
            minH = min(minH, heights[j]);
            maxArea = max(maxArea, minH * (j - i + 1));
        }
    }
    return maxArea;
}`,

      pythonCode: `def largestRectangleArea(heights: List[int]) -> int:
    max_area = 0
    for i in range(len(heights)):
        min_h = heights[i]
        for j in range(i, len(heights)):
            min_h = min(min_h, heights[j])
            max_area = max(max_area, min_h * (j - i + 1))
    return max_area`,

      lineAnnotations: {
        2: "Track the global maximum area",
        3: "Fix the left boundary at each bar",
        4: "Track minimum height in [i..j]",
        5: "Expand right boundary",
        6: "Update minimum height as we go right",
        7: "Compute area = minHeight * width",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { heights: [2, 1, 5, 6, 2, 3] },
          expectedOutput: "10",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init maxArea=0",
              explanation: "Initialize maxArea to 0. We'll check every possible rectangle.",
              variables: { maxArea: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
                stack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 5, 6, 7],
              shortLabel: "i=0: best=2",
              explanation: "Starting from bar 0 (h=2): width 1→area 2, width 2→min(2,1)=1→area 2. Best from i=0 is 2.",
              variables: { i: 0, maxArea: 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 5, 6, 7],
              shortLabel: "i=2: best=10",
              explanation: "Starting from bar 2 (h=5): j=2→area 5, j=3→min(5,6)=5→area 10. j=4→min(5,6,2)=2→area 6. Best from i=2 is 10. maxArea=10.",
              variables: { i: 2, maxArea: 10 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "active", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [],
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9],
              shortLabel: "Return 10",
              explanation: "After checking all starting positions, the largest rectangle has area 10.",
              variables: { maxArea: 10, answer: 10 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "found", 3: "found", 4: "default", 5: "default" },
                pointers: [],
                stack: [],
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ heights }) {
        const steps = [];
        const n = heights.length;
        let maxArea = 0;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init maxArea=0",
          explanation: "Initialize maxArea to 0.",
          variables: { maxArea: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(heights.map((_, i) => [i, "default"])),
            pointers: [], stack: [],
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          let minH = heights[i];
          let bestArea = 0;
          for (let j = i; j < n; j++) {
            minH = Math.min(minH, heights[j]);
            const area = minH * (j - i + 1);
            bestArea = Math.max(bestArea, area);
          }
          maxArea = Math.max(maxArea, bestArea);
          steps.push({
            stepId: steps.length, lineNumbers: [3, 5, 6, 7],
            shortLabel: `i=${i}: best=${bestArea}`,
            explanation: `Starting from bar ${i} (h=${heights[i]}), best rectangle area is ${bestArea}. maxArea=${maxArea}.`,
            variables: { i, "heights[i]": heights[i], bestArea, maxArea },
            dataStructure: {
              arrayStates: Object.fromEntries(heights.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              stack: [],
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: `Return ${maxArea}`,
          explanation: `After all starting positions, largest rectangle = ${maxArea}.`,
          variables: { maxArea, answer: maxArea },
          dataStructure: {
            arrayStates: Object.fromEntries(heights.map((_, i) => [i, "default"])),
            pointers: [], stack: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Monotonic Stack",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Maintain a monotonic increasing stack of bar indices. When we encounter a bar shorter
        than the stack top, pop and compute the rectangle for the popped bar: height = popped bar's
        height, width = current index - new stack top - 1.`,

      javaCode: `public int largestRectangleArea(int[] heights) {
    Stack<Integer> stack = new Stack<>();
    int maxArea = 0;
    int n = heights.length;

    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];

        while (!stack.isEmpty() && h < heights[stack.peek()]) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }

        stack.push(i);
    }

    return maxArea;
}`,

      cppCode: `int largestRectangleArea(vector<int>& heights) {
    stack<int> stk;
    int maxArea = 0;
    int n = heights.size();

    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];

        while (!stk.empty() && h < heights[stk.top()]) {
            int height = heights[stk.top()]; stk.pop();
            int width = stk.empty() ? i : i - stk.top() - 1;
            maxArea = max(maxArea, height * width);
        }

        stk.push(i);
    }

    return maxArea;
}`,

      pythonCode: `def largestRectangleArea(heights: List[int]) -> int:
    stack = []
    max_area = 0
    n = len(heights)

    for i in range(n + 1):
        h = 0 if i == n else heights[i]

        while stack and h < heights[stack[-1]]:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)

        stack.append(i)

    return max_area`,

      lineAnnotations: {
        2: "Monotonic increasing stack stores indices",
        3: "Track maximum rectangle area found",
        6: "Iterate through bars + one sentinel (height 0)",
        7: "Sentinel height 0 forces all remaining bars to pop",
        9: "Pop while current bar is shorter than stack top",
        10: "Popped bar's height determines rectangle height",
        11: "Width = distance between left boundary (new top) and right boundary (i)",
        12: "Update max area with this rectangle",
        15: "Push current index onto stack",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic histogram with answer spanning middle bars",
          input: { heights: [2, 1, 5, 6, 2, 3] },
          expectedOutput: "10",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init stack, maxArea=0",
              explanation: "Create an empty monotonic stack and set maxArea to 0. The stack will hold indices of bars in increasing height order.",
              variables: { maxArea: 0, stack: "[]" },
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
              lineNumbers: [6, 7, 15],
              shortLabel: "i=0: push 0 (h=2)",
              explanation: "Bar 0 has height 2. Stack is empty, so just push index 0. Stack: [0].",
              variables: { i: 0, h: 2, maxArea: 0, stack: "[0]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [0],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 9, 10, 11, 12],
              shortLabel: "i=1: h=1 < h[0]=2, pop 0",
              explanation: "Bar 1 has height 1 which is less than heights[stack.top()]=heights[0]=2. Pop index 0. Rectangle: height=2, width=1 (stack empty so width=i=1). Area=2. maxArea=2.",
              variables: { i: 1, h: 1, poppedIdx: 0, height: 2, width: 1, area: 2, maxArea: 2, stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [],
                stackOperation: "pop",
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15],
              shortLabel: "Push 1 (h=1)",
              explanation: "No more pops needed. Push index 1. Stack: [1].",
              variables: { i: 1, h: 1, maxArea: 2, stack: "[1]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [1],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 15],
              shortLabel: "i=2: push 2 (h=5)",
              explanation: "Bar 2 has height 5 >= heights[1]=1. Push index 2. Stack: [1, 2].",
              variables: { i: 2, h: 5, maxArea: 2, stack: "[1, 2]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [1, 2],
                stackOperation: "push",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 15],
              shortLabel: "i=3: push 3 (h=6)",
              explanation: "Bar 3 has height 6 >= heights[2]=5. Push index 3. Stack: [1, 2, 3].",
              variables: { i: 3, h: 6, maxArea: 2, stack: "[1, 2, 3]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [1, 2, 3],
                stackOperation: "push",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9, 10, 11, 12],
              shortLabel: "i=4: h=2 < h[3]=6, pop 3",
              explanation: "Bar 4 has height 2 < heights[3]=6. Pop index 3. Rectangle: height=6, width=4-2-1=1. Area=6. maxArea stays 6.",
              variables: { i: 4, h: 2, poppedIdx: 3, height: 6, width: 1, area: 6, maxArea: 6, stack: "[1, 2]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "eliminated", 4: "active", 5: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: [1, 2],
                stackOperation: "pop",
              },
              delta: { changedIndices: [3, 4] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [9, 10, 11, 12],
              shortLabel: "Still h=2 < h[2]=5, pop 2",
              explanation: "heights[stack.top()]=heights[2]=5 > 2. Pop index 2. Rectangle: height=5, width=4-1-1=2. Area=10. maxArea=10!",
              variables: { i: 4, h: 2, poppedIdx: 2, height: 5, width: 2, area: 10, maxArea: 10, stack: "[1]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "found", 3: "found", 4: "active", 5: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: [1],
                stackOperation: "pop",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [15],
              shortLabel: "Push 4 (h=2)",
              explanation: "heights[1]=1 <= 2, stop popping. Push index 4. Stack: [1, 4].",
              variables: { i: 4, h: 2, maxArea: 10, stack: "[1, 4]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: [1, 4],
                stackOperation: "push",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [6, 7, 15],
              shortLabel: "i=5: push 5 (h=3)",
              explanation: "Bar 5 has height 3 >= heights[4]=2. Push index 5. Stack: [1, 4, 5].",
              variables: { i: 5, h: 3, maxArea: 10, stack: "[1, 4, 5]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                stack: [1, 4, 5],
                stackOperation: "push",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [6, 7, 9, 10, 11, 12],
              shortLabel: "i=6 (sentinel): pop remaining",
              explanation: "Sentinel bar (h=0) forces all remaining bars to pop. Pop 5: h=3, w=6-4-1=1, area=3. Pop 4: h=2, w=6-1-1=4, area=8. Pop 1: h=1, w=6, area=6. None beat maxArea=10.",
              variables: { i: 6, h: 0, maxArea: 10, stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [],
                stack: [],
                stackOperation: "pop",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [18],
              shortLabel: "Return 10",
              explanation: "The largest rectangle in the histogram has area 10 — formed by bars at indices 2 and 3 (heights 5 and 6), both at least height 5, spanning width 2.",
              variables: { maxArea: 10, answer: 10 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "found", 3: "found", 4: "default", 5: "default" },
                pointers: [],
                stack: [],
                stackOperation: null,
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Ascending",
          description: "Strictly increasing bars — all pops happen at sentinel",
          input: { heights: [1, 2, 3, 4] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init stack, maxArea=0",
              explanation: "Empty stack and maxArea=0. With ascending bars, nothing gets popped until the sentinel.",
              variables: { maxArea: 0, stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [], stack: [], stackOperation: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 15],
              shortLabel: "Push all: [0,1,2,3]",
              explanation: "All bars are ascending, so we push indices 0, 1, 2, 3 without any pops. Stack: [0, 1, 2, 3].",
              variables: { maxArea: 0, stack: "[0, 1, 2, 3]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "active" },
                pointers: [],
                stack: [0, 1, 2, 3],
                stackOperation: "push",
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 9, 10, 11, 12],
              shortLabel: "Sentinel: pop 3, area=4",
              explanation: "Sentinel h=0. Pop 3: height=4, width=4-2-1=1, area=4. maxArea=4.",
              variables: { poppedIdx: 3, height: 4, width: 1, area: 4, maxArea: 4, stack: "[0, 1, 2]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "eliminated" },
                pointers: [],
                stack: [0, 1, 2],
                stackOperation: "pop",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9, 10, 11, 12],
              shortLabel: "Pop 2: area=6, maxArea=6",
              explanation: "Pop 2: height=3, width=4-1-1=2, area=6. maxArea=6.",
              variables: { poppedIdx: 2, height: 3, width: 2, area: 6, maxArea: 6, stack: "[0, 1]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "found", 3: "found" },
                pointers: [],
                stack: [0, 1],
                stackOperation: "pop",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10, 11, 12],
              shortLabel: "Pop 1: area=6, Pop 0: area=4",
              explanation: "Pop 1: height=2, width=4-0-1=3, area=6 (ties maxArea). Pop 0: height=1, width=4, area=4. maxArea stays 6.",
              variables: { maxArea: 6, stack: "[]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited" },
                pointers: [],
                stack: [],
                stackOperation: "pop",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [18],
              shortLabel: "Return 6",
              explanation: "Largest rectangle has area 6 — bars at indices 2-3 with min height 3 and width 2, or bars 1-3 with min height 2 and width 3.",
              variables: { maxArea: 6, answer: 6 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "found", 3: "found" },
                pointers: [], stack: [], stackOperation: null,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ heights }) {
        const steps = [];
        const n = heights.length;
        const stack = [];
        let maxArea = 0;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init stack, maxArea=0",
          explanation: "Create empty monotonic stack and set maxArea=0.",
          variables: { maxArea: 0, stack: "[]" },
          dataStructure: {
            arrayStates: Object.fromEntries(heights.map((_, i) => [i, "default"])),
            pointers: [], stack: [], stackOperation: null,
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i <= n; i++) {
          const h = i === n ? 0 : heights[i];

          while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
            const poppedIdx = stack.pop();
            const height = heights[poppedIdx];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            const area = height * width;
            maxArea = Math.max(maxArea, area);

            steps.push({
              stepId: steps.length, lineNumbers: [9, 10, 11, 12],
              shortLabel: `Pop ${poppedIdx}: h=${height}, w=${width}, area=${area}`,
              explanation: `Pop index ${poppedIdx} (height=${height}). Width = ${width}. Area = ${height} * ${width} = ${area}. maxArea=${maxArea}.`,
              variables: { i, h, poppedIdx, height, width, area, maxArea, stack: JSON.stringify(stack) },
              dataStructure: {
                arrayStates: Object.fromEntries(heights.map((_, j) => [j, j === poppedIdx ? "eliminated" : j === i && i < n ? "active" : stack.includes(j) ? "queued" : j < i ? "visited" : "default"])),
                pointers: i < n ? [{ name: "i", index: i, color: "pointer" }] : [],
                stack: [...stack],
                stackOperation: "pop",
              },
              delta: { changedIndices: [poppedIdx] }, isAnswer: false,
            });
          }

          if (i < n) {
            stack.push(i);
            steps.push({
              stepId: steps.length, lineNumbers: [15],
              shortLabel: `Push ${i} (h=${heights[i]})`,
              explanation: `Push index ${i} (height=${heights[i]}). Stack: [${stack.join(", ")}].`,
              variables: { i, h: heights[i], maxArea, stack: JSON.stringify(stack) },
              dataStructure: {
                arrayStates: Object.fromEntries(heights.map((_, j) => [j, j === i ? "active" : stack.includes(j) ? "queued" : j < i ? "visited" : "default"])),
                pointers: [{ name: "i", index: i, color: "pointer" }],
                stack: [...stack],
                stackOperation: "push",
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [18],
          shortLabel: `Return ${maxArea}`,
          explanation: `Largest rectangle area = ${maxArea}.`,
          variables: { maxArea, answer: maxArea },
          dataStructure: {
            arrayStates: Object.fromEntries(heights.map((_, i) => [i, "default"])),
            pointers: [], stack: [], stackOperation: null,
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n²)", space: "O(1)", explanation: "Two nested loops over all pairs" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "Each bar is pushed and popped at most once", tradeoff: "Stack uses O(n) space to achieve O(n) time vs O(n²)" },
  },

  interviewTips: [
    "Start by explaining the brute force approach and why it's O(n²).",
    "Introduce the monotonic stack concept — stack of indices in increasing height order.",
    "Explain the sentinel trick: appending a 0-height bar forces all remaining bars to pop.",
    "When computing width after popping, handle the empty-stack case: width = i.",
    "Walk through the key insight: popping tells us both left and right boundaries simultaneously.",
  ],

  relatedProblems: ["daily-temperatures", "trapping-rain-water", "max-area-of-island"],
};
