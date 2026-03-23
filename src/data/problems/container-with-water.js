export const containerWithWater = {
  id: 13,
  slug: "container-with-water",
  title: "Container With Most Water",
  difficulty: "Medium",
  topic: "two-pointers",
  topicLabel: "Two Pointers",
  neetcodeNumber: 13,
  artifactType: "TwoPointer",
  companies: ["Amazon", "Google", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/container-with-most-water/",

  pattern: "Two Pointers Greedy Shrink",
  patternExplanation: `Start with the widest possible container (left=0, right=n-1). The area is min(height[left], height[right]) * (right - left). To potentially find a larger area, move the pointer at the shorter line inward — the taller line can never do better with less width.`,

  intuition: {
    coreInsight: `The area between two lines is limited by the shorter one: area = min(h[left], h[right]) * width. Starting from the widest container, we can only increase area by finding a taller short side. Moving the taller pointer inward would shrink width without any chance of increasing the minimum height — so we always move the shorter pointer. This greedy choice guarantees we never skip the optimal pair.`,

    mentalModel: `Imagine two people holding a plank of wood between them to catch rain. They start at opposite ends of a field. The water level is limited by the shorter person. If the short person moves inward, they might find a taller stand — potentially catching more water despite less width. But if the tall person moves inward, the water can only get worse: same or shorter height AND less width. So the short person always moves.`,

    whyNaiveFails: `Brute force checks every pair (i, j) with i < j, computing min(height[i], height[j]) * (j - i) for each. That's O(n^2) pairs. For n = 100,000 that's ~5 billion operations — far too slow. The two-pointer approach visits each index at most once for O(n) total.`,

    keyObservation: `When we move the shorter pointer inward, we might miss some pairs — but none of those pairs could be optimal. If height[left] < height[right], then for ANY index k between left and right, the container (left, k) has both less width AND height limited by height[left] (at best). So left can never do better than it already has with right. Moving left inward is the only rational move.`,
  },

  problem: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store. Notice that you may not slant the container.`,

  examples: [
    { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The max area is between index 1 (height 8) and index 8 (height 7): min(8,7) * (8-1) = 7 * 7 = 49." },
    { input: "height = [1,1]", output: "1", explanation: "min(1,1) * (1-0) = 1." },
  ],

  constraints: [
    "n == height.length",
    "2 <= n <= 10^5",
    "0 <= height[i] <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n\u00B2)",
      spaceComplexity: "O(1)",
      idea: "Try every pair of lines (i, j). Compute area = min(height[i], height[j]) * (j - i). Track the maximum.",

      javaCode: `public int maxArea(int[] height) {
    int maxArea = 0;
    for (int i = 0; i < height.length; i++) {
        for (int j = i + 1; j < height.length; j++) {
            int area = Math.min(height[i], height[j]) * (j - i);
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }
    return maxArea;
}`,

      cppCode: `int maxArea(vector<int>& height) {
    int maxArea = 0;
    for (int i = 0; i < height.size(); i++) {
        for (int j = i + 1; j < height.size(); j++) {
            int area = min(height[i], height[j]) * (j - i);
            maxArea = max(maxArea, area);
        }
    }
    return maxArea;
}`,

      pythonCode: `def maxArea(height: List[int]) -> int:
    max_area = 0
    for i in range(len(height)):
        for j in range(i + 1, len(height)):
            area = min(height[i], height[j]) * (j - i)
            max_area = max(max_area, area)
    return max_area`,

      lineAnnotations: {
        2: "Track the maximum area seen so far",
        3: "Outer loop: fix left boundary",
        4: "Inner loop: try every right boundary",
        5: "Area = shorter line * distance between lines",
        6: "Update max if this pair is better",
        10: "Return the best area found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
          expectedOutput: "49",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init maxArea = 0",
              explanation: "Initialize maxArea to 0. We will check every pair of lines to find the one that holds the most water.",
              variables: { maxArea: 0, i: "-", j: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5],
              shortLabel: "i=0, j=1: area=1",
              explanation: "Pair (0,1): min(1,8) * (1-0) = 1 * 1 = 1. maxArea = max(0,1) = 1.",
              variables: { i: 0, j: 1, "h[i]": 1, "h[j]": 8, area: 1, maxArea: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 1, color: "active" }],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5],
              shortLabel: "i=0, j=8: area=8",
              explanation: "Pair (0,8): min(1,7) * (8-0) = 1 * 8 = 8. maxArea = max(1,8) = 8. Even with the widest container, the short line at index 0 limits the area.",
              variables: { i: 0, j: 8, "h[i]": 1, "h[j]": 7, area: 8, maxArea: 8 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "active" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 8, color: "active" }],
              },
              delta: { changedIndices: [8] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5],
              shortLabel: "i=1, j=8: area=49",
              explanation: "Pair (1,8): min(8,7) * (8-1) = 7 * 7 = 49. maxArea = max(8,49) = 49. This is the optimal pair! But brute force doesn't know that yet and must keep checking.",
              variables: { i: 1, j: 8, "h[i]": 8, "h[j]": 7, area: 49, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "active" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "j", index: 8, color: "active" }],
              },
              delta: { changedIndices: [1, 8] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10],
              shortLabel: "Return 49",
              explanation: "After checking all O(n^2) pairs, the maximum area is 49 (between indices 1 and 8). Brute force works but is slow for large inputs.",
              variables: { maxArea: 49, answer: 49 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "found" },
                pointers: [],
              },
              delta: { changedIndices: [1, 8] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ height }) {
        const steps = [];
        const n = height.length;
        const defaultStates = () => Object.fromEntries(height.map((_, i) => [i, "default"]));
        let maxArea = 0;
        let bestI = 0, bestJ = 0;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init maxArea = 0",
          explanation: "Initialize maxArea to 0. Check every pair of lines.",
          variables: { maxArea: 0, i: "-", j: "-" },
          dataStructure: { arrayStates: defaultStates(), pointers: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            const area = Math.min(height[i], height[j]) * (j - i);
            const oldMax = maxArea;
            if (area > maxArea) { maxArea = area; bestI = i; bestJ = j; }
            steps.push({
              stepId: steps.length, lineNumbers: [3, 4, 5, 6],
              shortLabel: `(${i},${j}): area=${area}`,
              explanation: `Pair (${i},${j}): min(${height[i]},${height[j]}) * (${j}-${i}) = ${Math.min(height[i], height[j])} * ${j - i} = ${area}. maxArea = ${maxArea}${area > oldMax ? ' (new best!)' : ''}.`,
              variables: { i, j, "h[i]": height[i], "h[j]": height[j], area, maxArea },
              dataStructure: {
                arrayStates: { ...defaultStates(), [i]: "active", [j]: "active" },
                pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
              },
              delta: { changedIndices: [i, j] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: `Return ${maxArea}`,
          explanation: `After all pairs, max area = ${maxArea} (between indices ${bestI} and ${bestJ}).`,
          variables: { maxArea, answer: maxArea },
          dataStructure: {
            arrayStates: { ...defaultStates(), [bestI]: "found", [bestJ]: "found" },
            pointers: [],
          },
          delta: { changedIndices: [bestI, bestJ] }, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Two Pointers",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Start with pointers at both ends (widest container). Compute area. Move the pointer pointing to the shorter line inward — the shorter line is the bottleneck, so keeping it can't help. Repeat until the pointers meet. Track the maximum area.`,

      javaCode: `public int maxArea(int[] height) {
    int left = 0, right = height.length - 1;
    int maxArea = 0;

    while (left < right) {
        int area = Math.min(height[left], height[right]) * (right - left);
        maxArea = Math.max(maxArea, area);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}`,

      cppCode: `int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxArea = 0;

    while (left < right) {
        int area = min(height[left], height[right]) * (right - left);
        maxArea = max(maxArea, area);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}`,

      pythonCode: `def maxArea(height: List[int]) -> int:
    left, right = 0, len(height) - 1
    max_area = 0

    while left < right:
        area = min(height[left], height[right]) * (right - left)
        max_area = max(max_area, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_area`,

      lineAnnotations: {
        2:  "Initialize two pointers at the widest possible container",
        3:  "Track the maximum area found so far",
        5:  "Continue while the pointers haven't crossed",
        6:  "Area = shorter line * distance between lines",
        7:  "Update max area if this container is larger",
        9:  "If left line is shorter, move it inward (can't do better with it)",
        10: "Advance left pointer to try a taller line",
        12: "Right line is shorter (or equal) — move it inward",
        16: "Return the maximum area found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with the optimal pair in the middle",
          input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
          expectedOutput: "49",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init pointers",
              explanation: "Set left=0 and right=8 (the last index). This is the widest possible container. maxArea starts at 0.",
              variables: { left: 0, right: 8, "h[L]": 1, "h[R]": 7, maxArea: 0 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "pointer" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 8, color: "pointer" }],
              },
              delta: { movedPointers: ["L", "R"] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(1,7)*8 = 8",
              explanation: "Area = min(height[0], height[8]) * (8-0) = min(1,7) * 8 = 1 * 8 = 8. maxArea = max(0, 8) = 8. The short line at index 0 (height 1) is the bottleneck.",
              variables: { left: 0, right: 8, "h[L]": 1, "h[R]": 7, area: 8, maxArea: 8 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "active" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 8, color: "pointer" }],
              },
              delta: { changedIndices: [0, 8] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10],
              shortLabel: "h[L]=1 < h[R]=7, L++",
              explanation: "height[0]=1 < height[8]=7. The left line is shorter, so it's the bottleneck. Moving it inward might find a taller line. left becomes 1.",
              variables: { left: 1, right: 8, "h[L]": 8, "h[R]": 7, maxArea: 8 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "pointer" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 8, color: "pointer" }],
              },
              delta: { changedIndices: [0, 1], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(8,7)*7 = 49",
              explanation: "Area = min(height[1], height[8]) * (8-1) = min(8,7) * 7 = 7 * 7 = 49. maxArea = max(8, 49) = 49. Huge improvement! Both lines are tall and the width is still large.",
              variables: { left: 1, right: 8, "h[L]": 8, "h[R]": 7, area: 49, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "active" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 8, color: "pointer" }],
              },
              delta: { changedIndices: [1, 8] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=8 >= h[R]=7, R--",
              explanation: "height[1]=8 >= height[8]=7. The right line is shorter (or equal), so we move right inward. right becomes 7.",
              variables: { left: 1, right: 7, "h[L]": 8, "h[R]": 3, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "pointer", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 7, color: "pointer" }],
              },
              delta: { changedIndices: [7, 8], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(8,3)*6 = 18",
              explanation: "Area = min(8,3) * (7-1) = 3 * 6 = 18. maxArea stays 49. The short line at index 7 hurts.",
              variables: { left: 1, right: 7, "h[L]": 8, "h[R]": 3, area: 18, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "active", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 7, color: "pointer" }],
              },
              delta: { changedIndices: [1, 7] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=8 >= h[R]=3, R--",
              explanation: "height[1]=8 >= height[7]=3. Move right inward. right becomes 6.",
              variables: { left: 1, right: 6, "h[L]": 8, "h[R]": 8, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "default", 3: "default", 4: "default", 5: "default", 6: "pointer", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 6, color: "pointer" }],
              },
              delta: { changedIndices: [6, 7], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(8,8)*5 = 40",
              explanation: "Area = min(8,8) * (6-1) = 8 * 5 = 40. Close to 49 but not better. maxArea stays 49.",
              variables: { left: 1, right: 6, "h[L]": 8, "h[R]": 8, area: 40, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "active", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 6, color: "pointer" }],
              },
              delta: { changedIndices: [1, 6] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=8 >= h[R]=8, R--",
              explanation: "height[1]=8 >= height[6]=8. Equal heights — we move right inward (either works). right becomes 5.",
              variables: { left: 1, right: 5, "h[L]": 8, "h[R]": 4, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "default", 3: "default", 4: "default", 5: "pointer", 6: "eliminated", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [5, 6], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(8,4)*4 = 16",
              explanation: "Area = min(8,4) * (5-1) = 4 * 4 = 16. maxArea stays 49.",
              variables: { left: 1, right: 5, "h[L]": 8, "h[R]": 4, area: 16, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "default", 5: "active", 6: "eliminated", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [1, 5] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=8 >= h[R]=4, R--",
              explanation: "height[1]=8 >= height[5]=4. Move right inward. right becomes 4.",
              variables: { left: 1, right: 4, "h[L]": 8, "h[R]": 5, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "default", 3: "default", 4: "pointer", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [4, 5], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(8,5)*3 = 15",
              explanation: "Area = min(8,5) * (4-1) = 5 * 3 = 15. maxArea stays 49.",
              variables: { left: 1, right: 4, "h[L]": 8, "h[R]": 5, area: 15, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "active", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [1, 4] },
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=8 >= h[R]=5, R--",
              explanation: "height[1]=8 >= height[4]=5. Move right inward. right becomes 3.",
              variables: { left: 1, right: 3, "h[L]": 8, "h[R]": 2, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "default", 3: "pointer", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3, 4], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 13,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(8,2)*2 = 4",
              explanation: "Area = min(8,2) * (3-1) = 2 * 2 = 4. maxArea stays 49.",
              variables: { left: 1, right: 3, "h[L]": 8, "h[R]": 2, area: 4, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "active", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [1, 3] },
              isAnswer: false,
            },
            {
              stepId: 14,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=8 >= h[R]=2, R--",
              explanation: "height[1]=8 >= height[3]=2. Move right inward. right becomes 2.",
              variables: { left: 1, right: 2, "h[L]": 8, "h[R]": 6, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "pointer", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2, 3], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 15,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(8,6)*1 = 6",
              explanation: "Area = min(8,6) * (2-1) = 6 * 1 = 6. maxArea stays 49. Width is too narrow now.",
              variables: { left: 1, right: 2, "h[L]": 8, "h[R]": 6, area: 6, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "active", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 16,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=8 >= h[R]=6, R--",
              explanation: "height[1]=8 >= height[2]=6. Move right inward. right becomes 1. Now left=1 and right=1, so left is NOT less than right. Loop ends.",
              variables: { left: 1, right: 1, maxArea: 49 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "visited", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated" },
                pointers: [],
              },
              delta: { changedIndices: [1, 2], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 17,
              lineNumbers: [16],
              shortLabel: "Return 49",
              explanation: "Pointers have met. The maximum area found was 49, between indices 1 (height 8) and 8 (height 7). Done in O(n) time with a single pass!",
              variables: { maxArea: 49, answer: 49 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "found" },
                pointers: [],
              },
              delta: { changedIndices: [1, 8] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Equal Heights",
          description: "All lines have equal height — any pair gives the same height, so widest wins",
          input: { height: [5, 5, 5, 5] },
          expectedOutput: "15",
          commonMistake: "Thinking equal heights are a special case. The algorithm works the same — when heights are equal, moving either pointer is fine. The widest pair wins because min(h,h) is constant and only width varies.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init L=0, R=3",
              explanation: "Start with the widest container: left=0, right=3. All heights are 5, so the widest container will be optimal.",
              variables: { left: 0, right: 3, "h[L]": 5, "h[R]": 5, maxArea: 0 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "pointer" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 3, color: "pointer" }],
              },
              delta: { movedPointers: ["L", "R"] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(5,5)*3 = 15",
              explanation: "Area = min(5,5) * (3-0) = 5 * 3 = 15. maxArea = 15. With equal heights, width is the only variable — this is already optimal.",
              variables: { left: 0, right: 3, "h[L]": 5, "h[R]": 5, area: 15, maxArea: 15 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "active" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=5 >= h[R]=5, R--",
              explanation: "Heights are equal. We move right inward (the else branch). right becomes 2.",
              variables: { left: 0, right: 2, "h[L]": 5, "h[R]": 5, maxArea: 15 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "pointer", 3: "eliminated" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2, 3], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(5,5)*2 = 10",
              explanation: "Area = min(5,5) * (2-0) = 5 * 2 = 10. Less than 15 because width shrank. maxArea stays 15.",
              variables: { left: 0, right: 2, "h[L]": 5, "h[R]": 5, area: 10, maxArea: 15 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "active", 3: "eliminated" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [0, 2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=5 >= h[R]=5, R--",
              explanation: "Equal heights again. Move right inward. right becomes 1.",
              variables: { left: 0, right: 1, "h[L]": 5, "h[R]": 5, maxArea: 15 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "pointer", 2: "eliminated", 3: "eliminated" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1, 2], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(5,5)*1 = 5",
              explanation: "Area = min(5,5) * (1-0) = 5 * 1 = 5. maxArea stays 15.",
              variables: { left: 0, right: 1, "h[L]": 5, "h[R]": 5, area: 5, maxArea: 15 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "eliminated", 3: "eliminated" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12],
              shortLabel: "R-- => R=0, loop ends",
              explanation: "right becomes 0. Now left=0 and right=0, so left < right is false. Loop ends.",
              variables: { left: 0, right: 0, maxArea: 15 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "eliminated", 2: "eliminated", 3: "eliminated" },
                pointers: [],
              },
              delta: { movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [16],
              shortLabel: "Return 15",
              explanation: "The maximum area is 15, from the initial widest container (indices 0 and 3). With equal heights, the widest pair always wins.",
              variables: { maxArea: 15, answer: 15 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "found" },
                pointers: [],
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Decreasing Heights",
          description: "Heights decrease left to right — tests moving the right pointer repeatedly",
          input: { height: [6, 4, 3, 1] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init L=0, R=3",
              explanation: "Start with left=0 (height 6) and right=3 (height 1). maxArea = 0.",
              variables: { left: 0, right: 3, "h[L]": 6, "h[R]": 1, maxArea: 0 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "pointer" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 3, color: "pointer" }],
              },
              delta: { movedPointers: ["L", "R"] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(6,1)*3 = 3",
              explanation: "Area = min(6,1) * (3-0) = 1 * 3 = 3. maxArea = 3. The short right line limits us badly.",
              variables: { left: 0, right: 3, "h[L]": 6, "h[R]": 1, area: 3, maxArea: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "active" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10],
              shortLabel: "h[R]=1 < h[L]=6? No, R--",
              explanation: "Actually h[L]=6 >= h[R]=1, so we go to else: right--. Wait — the condition is h[L] < h[R]. Here h[L]=6 is NOT less than h[R]=1, so we take the else branch. right becomes 2.",
              variables: { left: 0, right: 2, "h[L]": 6, "h[R]": 3, maxArea: 3 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "pointer", 3: "eliminated" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2, 3], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(6,3)*2 = 6",
              explanation: "Area = min(6,3) * (2-0) = 3 * 2 = 6. maxArea = max(3, 6) = 6. Better!",
              variables: { left: 0, right: 2, "h[L]": 6, "h[R]": 3, area: 6, maxArea: 6 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "active", 3: "eliminated" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [0, 2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12],
              shortLabel: "h[L]=6 >= h[R]=3, R--",
              explanation: "height[0]=6 >= height[2]=3. Move right inward. right becomes 1.",
              variables: { left: 0, right: 1, "h[L]": 6, "h[R]": 4, maxArea: 6 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "pointer", 2: "eliminated", 3: "eliminated" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1, 2], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7],
              shortLabel: "area = min(6,4)*1 = 4",
              explanation: "Area = min(6,4) * (1-0) = 4 * 1 = 4. maxArea stays 6.",
              variables: { left: 0, right: 1, "h[L]": 6, "h[R]": 4, area: 4, maxArea: 6 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "eliminated", 3: "eliminated" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12],
              shortLabel: "R-- => R=0, loop ends",
              explanation: "right becomes 0. left=0, right=0 — pointers have met. Loop ends.",
              variables: { left: 0, right: 0, maxArea: 6 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "eliminated", 2: "eliminated", 3: "eliminated" },
                pointers: [],
              },
              delta: { movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [16],
              shortLabel: "Return 6",
              explanation: "The maximum area is 6, between indices 0 (height 6) and 2 (height 3). In a decreasing array, the left pointer never needed to move.",
              variables: { maxArea: 6, answer: 6 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "found", 3: "default" },
                pointers: [],
              },
              delta: { changedIndices: [0, 2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ height }) {
        const steps = [];
        const n = height.length;
        const defaultStates = () => Object.fromEntries(height.map((_, i) => [i, "default"]));
        let left = 0, right = n - 1;
        let maxArea = 0;
        let bestL = 0, bestR = n - 1;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `Init L=0, R=${right}`,
          explanation: `Set left=0 and right=${right}. Start with the widest possible container. maxArea=0.`,
          variables: { left: 0, right, "h[L]": height[0], "h[R]": height[right], maxArea: 0 },
          dataStructure: {
            arrayStates: { ...defaultStates(), 0: "pointer", [right]: "pointer" },
            pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: right, color: "pointer" }],
          },
          delta: { movedPointers: ["L", "R"] }, isAnswer: false,
        });

        while (left < right) {
          const area = Math.min(height[left], height[right]) * (right - left);
          const oldMax = maxArea;
          if (area > maxArea) { maxArea = area; bestL = left; bestR = right; }

          const states = defaultStates();
          for (let k = 0; k < left; k++) states[k] = "eliminated";
          for (let k = n - 1; k > right; k--) states[k] = "eliminated";
          states[left] = "active";
          states[right] = "active";

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6, 7],
            shortLabel: `area = min(${height[left]},${height[right]})*${right - left} = ${area}`,
            explanation: `Area = min(${height[left]}, ${height[right]}) * (${right}-${left}) = ${Math.min(height[left], height[right])} * ${right - left} = ${area}. maxArea = ${maxArea}${area > oldMax ? ' (new best!)' : ''}.`,
            variables: { left, right, "h[L]": height[left], "h[R]": height[right], area, maxArea },
            dataStructure: {
              arrayStates: { ...states },
              pointers: [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "pointer" }],
            },
            delta: { changedIndices: [left, right] }, isAnswer: false,
          });

          if (height[left] < height[right]) {
            const oldLeft = left;
            left++;
            const moveStates = defaultStates();
            for (let k = 0; k < left; k++) moveStates[k] = "eliminated";
            for (let k = n - 1; k > right; k--) moveStates[k] = "eliminated";
            if (left < right) {
              moveStates[left] = "pointer";
              moveStates[right] = "pointer";
            }

            steps.push({
              stepId: steps.length, lineNumbers: [9, 10],
              shortLabel: `h[L]=${height[oldLeft]} < h[R]=${height[right]}, L++`,
              explanation: `height[${oldLeft}]=${height[oldLeft]} < height[${right}]=${height[right]}. Left line is shorter — move left inward to try a taller line. left becomes ${left}.`,
              variables: { left, right, "h[L]": left < n ? height[left] : "-", "h[R]": height[right], maxArea },
              dataStructure: {
                arrayStates: { ...moveStates },
                pointers: left < right ? [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "pointer" }] : [],
              },
              delta: { changedIndices: [oldLeft, left], movedPointers: ["L"] }, isAnswer: false,
            });
          } else {
            const oldRight = right;
            right--;
            const moveStates = defaultStates();
            for (let k = 0; k < left; k++) moveStates[k] = "eliminated";
            for (let k = n - 1; k > right; k--) moveStates[k] = "eliminated";
            if (left < right) {
              moveStates[left] = "pointer";
              moveStates[right] = "pointer";
            }

            steps.push({
              stepId: steps.length, lineNumbers: [11, 12],
              shortLabel: `h[L]=${height[left]} >= h[R]=${height[oldRight]}, R--`,
              explanation: `height[${left}]=${height[left]} >= height[${oldRight}]=${height[oldRight]}. Right line is shorter (or equal) — move right inward. right becomes ${right}.`,
              variables: { left, right, "h[L]": height[left], "h[R]": right >= 0 ? height[right] : "-", maxArea },
              dataStructure: {
                arrayStates: { ...moveStates },
                pointers: left < right ? [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "pointer" }] : [],
              },
              delta: { changedIndices: [right, oldRight], movedPointers: ["R"] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [16],
          shortLabel: `Return ${maxArea}`,
          explanation: `Pointers have met. The maximum area is ${maxArea}, between indices ${bestL} (height ${height[bestL]}) and ${bestR} (height ${height[bestR]}).`,
          variables: { maxArea, answer: maxArea },
          dataStructure: {
            arrayStates: { ...defaultStates(), [bestL]: "found", [bestR]: "found" },
            pointers: [],
          },
          delta: { changedIndices: [bestL, bestR] }, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n\u00B2)", space: "O(1)", explanation: "Two nested loops check every pair of lines" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Two pointers traverse the array once, each index visited at most once", tradeoff: "No extra space needed — purely algorithmic improvement from greedy pointer movement" },
  },

  interviewTips: [
    "Start by stating the brute force: check all pairs in O(n\u00B2). Then explain why we can do better.",
    "Clearly explain WHY moving the shorter pointer is safe: the shorter line can never produce a better area with less width.",
    "If asked 'what if both heights are equal?', say moving either pointer is fine — both choices are equally safe because neither can do better with the current partner.",
    "Mention that this is a greedy approach, not divide-and-conquer or DP — we make a locally optimal choice (move shorter side) that's globally optimal.",
    "Draw the two lines and water between them. Visual explanation makes the proof much clearer.",
    "Note the key invariant: at every step, we have already considered all containers that include the eliminated pointer with any partner to its inside.",
  ],

  relatedProblems: ["two-sum-ii", "trapping-rain-water", "3sum"],
};
