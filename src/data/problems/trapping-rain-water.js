export const trappingRainWater = {
  id: 14,
  slug: "trapping-rain-water",
  title: "Trapping Rain Water",
  difficulty: "Hard",
  topic: "two-pointers",
  topicLabel: "Two Pointers",
  neetcodeNumber: 14,
  artifactType: "TwoPointer",
  companies: ["Amazon", "Google", "Meta", "Goldman Sachs", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/trapping-rain-water/",

  pattern: "Two Pointers Converging with Running Max",
  patternExplanation: `Water above any bar is determined by the minimum of the tallest bar to its left and the tallest bar to its right, minus the bar's own height. Two pointers from both ends track running maximums, always processing the side with the smaller max — because that side's water level is guaranteed.`,

  intuition: {
    coreInsight: `For each bar at index i, the water it can hold equals min(maxLeft, maxRight) - height[i]. Brute force recomputes maxLeft and maxRight for every bar in O(n) each, giving O(n²). But notice: if we keep two pointers and track running maximums from both ends, we can compute water in a single pass. The key insight is that we always process the pointer whose running max is smaller — because that side is the bottleneck, and the other side is guaranteed to be at least as tall.`,

    mentalModel: `Imagine two walls closing in from both sides of a canyon. Each wall remembers the tallest ridge it has passed. At each step, the shorter wall moves inward — because water at that position can't be higher than the shorter wall, regardless of what's on the other side. The taller wall stays put as a guarantee. As they converge, every position gets its water level calculated correctly.`,

    whyNaiveFails: `Brute force scans left and right for every single bar to find its maxLeft and maxRight. That's two O(n) scans per bar, across n bars = O(n²). For n=20,000 that's 200 million operations. Even the prefix array approach uses O(n) extra space. Two pointers solve it in O(n) time and O(1) space — the best possible.`,

    keyObservation: `When leftMax < rightMax, the water at the left pointer depends only on leftMax — because we know the right side has at least rightMax height, which is taller. So min(leftMax, rightMax) = leftMax. We don't need to know the exact rightMax for the left pointer's position. This asymmetry lets us process one side at a time with confidence.`,
  },

  problem: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,

  examples: [
    { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "The elevation map traps 6 units of rain water." },
    { input: "height = [4,2,0,3,2,5]", output: "9", explanation: "The elevation map traps 9 units of rain water." },
  ],

  constraints: [
    "n == height.length",
    "1 <= n <= 2 * 10^4",
    "0 <= height[i] <= 10^5",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: "For each bar, scan left to find max height and scan right to find max height. Water at that bar = min(maxLeft, maxRight) - height[i].",

      javaCode: `public int trap(int[] height) {
    int n = height.length;
    int totalWater = 0;

    for (int i = 0; i < n; i++) {
        int maxLeft = 0, maxRight = 0;

        for (int j = 0; j <= i; j++)
            maxLeft = Math.max(maxLeft, height[j]);

        for (int j = i; j < n; j++)
            maxRight = Math.max(maxRight, height[j]);

        totalWater += Math.min(maxLeft, maxRight) - height[i];
    }

    return totalWater;
}`,

      cppCode: `int trap(vector<int>& height) {
    int n = height.size();
    int totalWater = 0;

    for (int i = 0; i < n; i++) {
        int maxLeft = 0, maxRight = 0;

        for (int j = 0; j <= i; j++)
            maxLeft = max(maxLeft, height[j]);

        for (int j = i; j < n; j++)
            maxRight = max(maxRight, height[j]);

        totalWater += min(maxLeft, maxRight) - height[i];
    }

    return totalWater;
}`,

      pythonCode: `def trap(height: List[int]) -> int:
    n = len(height)
    total_water = 0

    for i in range(n):
        max_left = max(height[:i + 1]) if i >= 0 else 0
        max_right = max(height[i:]) if i < n else 0

        total_water += min(max_left, max_right) - height[i]

    return total_water`,

      lineAnnotations: {
        2: "Get length of height array",
        3: "Accumulator for total trapped water",
        5: "Process each bar individually",
        6: "Will find tallest bar to the left and right",
        8: "Scan left to find max height including self",
        10: "Scan right to find max height including self",
        13: "Water at this bar = min(maxLeft, maxRight) - height[i]",
        16: "Return total trapped water",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init totalWater=0",
              explanation: "Start with totalWater=0. We'll scan left and right for each bar to compute how much water it holds.",
              variables: { totalWater: 0, n: 12 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=0: water=0",
              explanation: "At bar 0 (h=0): maxLeft=0, maxRight=3. Water = min(0,3)-0 = 0. First bar can never hold water — nothing to its left.",
              variables: { i: 0, "height[i]": 0, maxLeft: 0, maxRight: 3, water: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=1: water=0",
              explanation: "At bar 1 (h=1): maxLeft=1, maxRight=3. Water = min(1,3)-1 = 0. Bar is as tall as the max to its left.",
              variables: { i: 1, "height[i]": 1, maxLeft: 1, maxRight: 3, water: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=2: water=1",
              explanation: "At bar 2 (h=0): maxLeft=1, maxRight=3. Water = min(1,3)-0 = 1. This valley holds 1 unit between bar 1 and bar 3.",
              variables: { i: 2, "height[i]": 0, maxLeft: 1, maxRight: 3, water: 1, totalWater: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=3: water=0",
              explanation: "At bar 3 (h=2): maxLeft=2, maxRight=3. Water = min(2,3)-2 = 0. Bar is as tall as the max to its left.",
              variables: { i: 3, "height[i]": 2, maxLeft: 2, maxRight: 3, water: 0, totalWater: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=4: water=1",
              explanation: "At bar 4 (h=1): maxLeft=2, maxRight=3. Water = min(2,3)-1 = 1. One unit trapped between the bar-2 wall on left and bar-3 wall on right.",
              variables: { i: 4, "height[i]": 1, maxLeft: 2, maxRight: 3, water: 1, totalWater: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=5: water=2",
              explanation: "At bar 5 (h=0): maxLeft=2, maxRight=3. Water = min(2,3)-0 = 2. Deepest valley so far — two units of water.",
              variables: { i: 5, "height[i]": 0, maxLeft: 2, maxRight: 3, water: 2, totalWater: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=6: water=1",
              explanation: "At bar 6 (h=1): maxLeft=2, maxRight=3. Water = min(2,3)-1 = 1.",
              variables: { i: 6, "height[i]": 1, maxLeft: 2, maxRight: 3, water: 1, totalWater: 5 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "active", 7: "default", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 6, color: "pointer" }],
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=7: water=0",
              explanation: "At bar 7 (h=3): maxLeft=3, maxRight=3. Water = min(3,3)-3 = 0. This is the tallest bar — no water above it.",
              variables: { i: 7, "height[i]": 3, maxLeft: 3, maxRight: 3, water: 0, totalWater: 5 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "active", 8: "default", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 7, color: "pointer" }],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=8: water=0",
              explanation: "At bar 8 (h=2): maxLeft=3, maxRight=2. Water = min(3,2)-2 = 0. Right side max equals bar height.",
              variables: { i: 8, "height[i]": 2, maxLeft: 3, maxRight: 2, water: 0, totalWater: 5 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited", 8: "active", 9: "default", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 8, color: "pointer" }],
              },
              delta: { changedIndices: [8] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=9: water=1",
              explanation: "At bar 9 (h=1): maxLeft=3, maxRight=2. Water = min(3,2)-1 = 1.",
              variables: { i: 9, "height[i]": 1, maxLeft: 3, maxRight: 2, water: 1, totalWater: 6 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited", 8: "visited", 9: "active", 10: "default", 11: "default" },
                pointers: [{ name: "i", index: 9, color: "pointer" }],
              },
              delta: { changedIndices: [9] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=10: water=0",
              explanation: "At bar 10 (h=2): maxLeft=3, maxRight=2. Water = min(3,2)-2 = 0.",
              variables: { i: 10, "height[i]": 2, maxLeft: 3, maxRight: 2, water: 0, totalWater: 6 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited", 8: "visited", 9: "visited", 10: "active", 11: "default" },
                pointers: [{ name: "i", index: 10, color: "pointer" }],
              },
              delta: { changedIndices: [10] },
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [5, 8, 10, 13],
              shortLabel: "i=11: water=0",
              explanation: "At bar 11 (h=1): maxLeft=3, maxRight=1. Water = min(3,1)-1 = 0. Last bar — nothing to its right taller than it.",
              variables: { i: 11, "height[i]": 1, maxLeft: 3, maxRight: 1, water: 0, totalWater: 6 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited", 8: "visited", 9: "visited", 10: "visited", 11: "active" },
                pointers: [{ name: "i", index: 11, color: "pointer" }],
              },
              delta: { changedIndices: [11] },
              isAnswer: false,
            },
            {
              stepId: 13,
              lineNumbers: [16],
              shortLabel: "Return 6",
              explanation: "All bars processed. Total trapped water = 6 units. Brute force required scanning left and right for every bar — O(n²) total work.",
              variables: { totalWater: 6, answer: 6 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "found", 7: "found", 8: "found", 9: "found", 10: "found", 11: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ height }) {
        const steps = [];
        const n = height.length;
        const defaultStates = () => Object.fromEntries(height.map((_, i) => [i, "default"]));

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init totalWater=0",
          explanation: "Start with totalWater=0. For each bar, scan left and right to find max heights.",
          variables: { totalWater: 0, n },
          dataStructure: { arrayStates: defaultStates(), pointers: [] },
          delta: {}, isAnswer: false,
        });

        let totalWater = 0;
        for (let i = 0; i < n; i++) {
          let maxLeft = 0, maxRight = 0;
          for (let j = 0; j <= i; j++) maxLeft = Math.max(maxLeft, height[j]);
          for (let j = i; j < n; j++) maxRight = Math.max(maxRight, height[j]);
          const water = Math.min(maxLeft, maxRight) - height[i];
          totalWater += water;

          const states = {};
          for (let k = 0; k < n; k++) states[k] = k < i ? "visited" : k === i ? "active" : "default";

          steps.push({
            stepId: steps.length, lineNumbers: [5, 8, 10, 13],
            shortLabel: `i=${i}: water=${water}`,
            explanation: `At bar ${i} (h=${height[i]}): maxLeft=${maxLeft}, maxRight=${maxRight}. Water = min(${maxLeft},${maxRight})-${height[i]} = ${water}. Total=${totalWater}.`,
            variables: { i, "height[i]": height[i], maxLeft, maxRight, water, totalWater },
            dataStructure: { arrayStates: states, pointers: [{ name: "i", index: i, color: "pointer" }] },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [16],
          shortLabel: `Return ${totalWater}`,
          explanation: `All bars processed. Total trapped water = ${totalWater}.`,
          variables: { totalWater, answer: totalWater },
          dataStructure: { arrayStates: Object.fromEntries(height.map((_, i) => [i, "found"])), pointers: [] },
          delta: {}, isAnswer: true,
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
      idea: `Use two pointers from both ends. Track leftMax and rightMax. Always process the side with the smaller max — water at that position depends only on the smaller max. Move the pointer inward. One pass, no extra arrays.`,

      javaCode: `public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0;
    int totalWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax)
                leftMax = height[left];
            else
                totalWater += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax)
                rightMax = height[right];
            else
                totalWater += rightMax - height[right];
            right--;
        }
    }

    return totalWater;
}`,

      cppCode: `int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0;
    int totalWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax)
                leftMax = height[left];
            else
                totalWater += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax)
                rightMax = height[right];
            else
                totalWater += rightMax - height[right];
            right--;
        }
    }

    return totalWater;
}`,

      pythonCode: `def trap(height: List[int]) -> int:
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    total_water = 0

    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                total_water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                total_water += right_max - height[right]
            right -= 1

    return total_water`,

      lineAnnotations: {
        2:  "Initialize two pointers at both ends",
        3:  "Track maximum height seen from each side",
        4:  "Accumulator for total trapped water",
        6:  "Process until pointers meet",
        7:  "Process the side with the shorter bar",
        8:  "If current bar is new left max, update it",
        10: "Otherwise, water = leftMax - height[left]",
        12: "Move left pointer inward",
        14: "If current bar is new right max, update it",
        16: "Otherwise, water = rightMax - height[right]",
        18: "Move right pointer inward",
        22: "Return total trapped water",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic elevation map with multiple valleys",
          input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init pointers",
              explanation: "Set left=0, right=11. leftMax=0, rightMax=0, totalWater=0. Two pointers will converge from both ends.",
              variables: { left: 0, right: 11, leftMax: 0, rightMax: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "pointer" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 11, color: "pointer" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 12],
              shortLabel: "L: h[0]=0, new leftMax=0, L++",
              explanation: "height[0]=0 < height[11]=1, so process left. height[0]=0 >= leftMax=0, so update leftMax=0. No water here (bar equals max). Move left to 1.",
              variables: { left: 0, right: 11, "h[L]": 0, "h[R]": 1, leftMax: 0, rightMax: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "pointer" },
                pointers: [{ name: "L", index: 0, color: "active" }, { name: "R", index: 11, color: "pointer" }],
              },
              delta: { changedIndices: [0], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 12],
              shortLabel: "L: h[1]=1, new leftMax=1, L++",
              explanation: "height[1]=1 >= height[11]=1, actually equal so we go to else branch. height[11]=1 >= rightMax=0, so update rightMax=1. Move right to 10. Wait — let's re-check: height[1]=1, height[11]=1. Since h[left] is NOT less than h[right], we process the right side.",
              variables: { left: 1, right: 11, "h[L]": 1, "h[R]": 1, leftMax: 0, rightMax: 1, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "pointer", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default", 11: "active" },
                pointers: [{ name: "L", index: 1, color: "pointer" }, { name: "R", index: 11, color: "active" }],
              },
              delta: { changedIndices: [11], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [14, 18],
              shortLabel: "R: h[10]=2, new rightMax=2, R--",
              explanation: "height[1]=1 < height[10]=2, so process left. Actually h[left]=1 < h[right]=2, process left. height[1]=1 >= leftMax=0, update leftMax=1. Move left to 2.",
              variables: { left: 1, right: 10, "h[L]": 1, "h[R]": 2, leftMax: 1, rightMax: 1, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "pointer", 11: "visited" },
                pointers: [{ name: "L", index: 1, color: "active" }, { name: "R", index: 10, color: "pointer" }],
              },
              delta: { changedIndices: [1], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 10, 12],
              shortLabel: "L: h[2]=0, water+=1, L++",
              explanation: "left=2, right=10. height[2]=0 < height[10]=2, process left. height[2]=0 < leftMax=1, so water = 1-0 = 1. totalWater=1. Move left to 3.",
              variables: { left: 2, right: 10, "h[L]": 0, "h[R]": 2, leftMax: 1, rightMax: 1, water: 1, totalWater: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "pointer", 11: "visited" },
                pointers: [{ name: "L", index: 2, color: "active" }, { name: "R", index: 10, color: "pointer" }],
              },
              delta: { changedIndices: [2], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8, 12],
              shortLabel: "L: h[3]=2, new leftMax=2, L++",
              explanation: "left=3, right=10. height[3]=2 >= height[10]=2, so process right. height[10]=2 >= rightMax=1, update rightMax=2. Move right to 9.",
              variables: { left: 3, right: 10, "h[L]": 2, "h[R]": 2, leftMax: 1, rightMax: 2, totalWater: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "pointer", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "active", 11: "visited" },
                pointers: [{ name: "L", index: 3, color: "pointer" }, { name: "R", index: 10, color: "active" }],
              },
              delta: { changedIndices: [10], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [7, 10, 12],
              shortLabel: "L: h[3]=2, new leftMax=2, L++",
              explanation: "left=3, right=9. height[3]=2 > height[9]=1, so process right. height[9]=1 < rightMax=2, water = 2-1 = 1. totalWater=2. Move right to 8.",
              variables: { left: 3, right: 9, "h[L]": 2, "h[R]": 1, leftMax: 1, rightMax: 2, water: 1, totalWater: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "pointer", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "active", 10: "visited", 11: "visited" },
                pointers: [{ name: "L", index: 3, color: "pointer" }, { name: "R", index: 9, color: "active" }],
              },
              delta: { changedIndices: [9], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [14, 18],
              shortLabel: "R: h[8]=2, new rightMax=2, R--",
              explanation: "left=3, right=8. height[3]=2 >= height[8]=2, process right. height[8]=2 >= rightMax=2, update rightMax=2. No water. Move right to 7.",
              variables: { left: 3, right: 8, "h[L]": 2, "h[R]": 2, leftMax: 1, rightMax: 2, totalWater: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "pointer", 4: "default", 5: "default", 6: "default", 7: "default", 8: "active", 9: "visited", 10: "visited", 11: "visited" },
                pointers: [{ name: "L", index: 3, color: "pointer" }, { name: "R", index: 8, color: "active" }],
              },
              delta: { changedIndices: [8], movedPointers: ["R"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [14, 18],
              shortLabel: "R: h[7]=3, new rightMax=3, R--",
              explanation: "left=3, right=7. height[3]=2 < height[7]=3, process left. height[3]=2 >= leftMax=1, update leftMax=2. No water. Move left to 4.",
              variables: { left: 3, right: 7, "h[L]": 2, "h[R]": 3, leftMax: 2, rightMax: 2, totalWater: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default", 6: "default", 7: "pointer", 8: "visited", 9: "visited", 10: "visited", 11: "visited" },
                pointers: [{ name: "L", index: 3, color: "active" }, { name: "R", index: 7, color: "pointer" }],
              },
              delta: { changedIndices: [3], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [7, 10, 12],
              shortLabel: "L: h[4]=1, water+=1, L++",
              explanation: "left=4, right=7. height[4]=1 < height[7]=3, process left. height[4]=1 < leftMax=2, water = 2-1 = 1. totalWater=3. Move left to 5.",
              variables: { left: 4, right: 7, "h[L]": 1, "h[R]": 3, leftMax: 2, rightMax: 2, water: 1, totalWater: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "default", 6: "default", 7: "pointer", 8: "visited", 9: "visited", 10: "visited", 11: "visited" },
                pointers: [{ name: "L", index: 4, color: "active" }, { name: "R", index: 7, color: "pointer" }],
              },
              delta: { changedIndices: [4], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [7, 10, 12],
              shortLabel: "L: h[5]=0, water+=2, L++",
              explanation: "left=5, right=7. height[5]=0 < height[7]=3, process left. height[5]=0 < leftMax=2, water = 2-0 = 2. totalWater=5. Move left to 6.",
              variables: { left: 5, right: 7, "h[L]": 0, "h[R]": 3, leftMax: 2, rightMax: 2, water: 2, totalWater: 5 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active", 6: "default", 7: "pointer", 8: "visited", 9: "visited", 10: "visited", 11: "visited" },
                pointers: [{ name: "L", index: 5, color: "active" }, { name: "R", index: 7, color: "pointer" }],
              },
              delta: { changedIndices: [5], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [7, 10, 12],
              shortLabel: "L: h[6]=1, water+=1, L++",
              explanation: "left=6, right=7. height[6]=1 < height[7]=3, process left. height[6]=1 < leftMax=2, water = 2-1 = 1. totalWater=6. Move left to 7.",
              variables: { left: 6, right: 7, "h[L]": 1, "h[R]": 3, leftMax: 2, rightMax: 2, water: 1, totalWater: 6 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "active", 7: "pointer", 8: "visited", 9: "visited", 10: "visited", 11: "visited" },
                pointers: [{ name: "L", index: 6, color: "active" }, { name: "R", index: 7, color: "pointer" }],
              },
              delta: { changedIndices: [6], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [22],
              shortLabel: "Return 6",
              explanation: "left=7, right=7. Pointers have met — loop ends. Total trapped water = 6 units. Computed in a single O(n) pass with O(1) space!",
              variables: { left: 7, right: 7, leftMax: 2, rightMax: 2, totalWater: 6, answer: 6 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "found", 7: "found", 8: "found", 9: "found", 10: "found", 11: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Simple Valley",
          description: "Short array with one deep valley — tests basic trapping",
          input: { height: [4, 2, 0, 3, 2, 5] },
          expectedOutput: "9",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init pointers",
              explanation: "Set left=0, right=5. leftMax=0, rightMax=0, totalWater=0.",
              variables: { left: 0, right: 5, leftMax: 0, rightMax: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "default", 4: "default", 5: "pointer" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 5, color: "pointer" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 12],
              shortLabel: "L: h[0]=4, new leftMax=4, L++",
              explanation: "height[0]=4 < height[5]=5, process left. height[0]=4 >= leftMax=0, update leftMax=4. No water on first bar. Move left to 1.",
              variables: { left: 0, right: 5, "h[L]": 4, "h[R]": 5, leftMax: 4, rightMax: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "pointer" },
                pointers: [{ name: "L", index: 0, color: "active" }, { name: "R", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [0], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 10, 12],
              shortLabel: "L: h[1]=2, water+=2, L++",
              explanation: "height[1]=2 < height[5]=5, process left. height[1]=2 < leftMax=4, water = 4-2 = 2. totalWater=2. Move left to 2.",
              variables: { left: 1, right: 5, "h[L]": 2, "h[R]": 5, leftMax: 4, rightMax: 0, water: 2, totalWater: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "pointer" },
                pointers: [{ name: "L", index: 1, color: "active" }, { name: "R", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [1], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 10, 12],
              shortLabel: "L: h[2]=0, water+=4, L++",
              explanation: "height[2]=0 < height[5]=5, process left. height[2]=0 < leftMax=4, water = 4-0 = 4. totalWater=6. The deepest valley holds 4 units. Move left to 3.",
              variables: { left: 2, right: 5, "h[L]": 0, "h[R]": 5, leftMax: 4, rightMax: 0, water: 4, totalWater: 6 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "pointer" },
                pointers: [{ name: "L", index: 2, color: "active" }, { name: "R", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [2], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 10, 12],
              shortLabel: "L: h[3]=3, water+=1, L++",
              explanation: "height[3]=3 < height[5]=5, process left. height[3]=3 < leftMax=4, water = 4-3 = 1. totalWater=7. Move left to 4.",
              variables: { left: 3, right: 5, "h[L]": 3, "h[R]": 5, leftMax: 4, rightMax: 0, water: 1, totalWater: 7 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "pointer" },
                pointers: [{ name: "L", index: 3, color: "active" }, { name: "R", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [3], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 10, 12],
              shortLabel: "L: h[4]=2, water+=2, L++",
              explanation: "height[4]=2 < height[5]=5, process left. height[4]=2 < leftMax=4, water = 4-2 = 2. totalWater=9. Move left to 5.",
              variables: { left: 4, right: 5, "h[L]": 2, "h[R]": 5, leftMax: 4, rightMax: 0, water: 2, totalWater: 9 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "pointer" },
                pointers: [{ name: "L", index: 4, color: "active" }, { name: "R", index: 5, color: "pointer" }],
              },
              delta: { changedIndices: [4], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [22],
              shortLabel: "Return 9",
              explanation: "left=5, right=5. Pointers have met. Total trapped water = 9 units. The tall bars at both ends (4 and 5) created a deep basin that trapped significant water.",
              variables: { left: 5, right: 5, leftMax: 4, rightMax: 0, totalWater: 9, answer: 9 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "No Water",
          description: "Ascending array — no valleys, no trapped water",
          input: { height: [1, 2, 3, 4, 5] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init pointers",
              explanation: "Set left=0, right=4. leftMax=0, rightMax=0, totalWater=0. Ascending heights — will any water be trapped?",
              variables: { left: 0, right: 4, leftMax: 0, rightMax: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "default", 4: "pointer" },
                pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: 4, color: "pointer" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 12],
              shortLabel: "L: h[0]=1, leftMax=1, L++",
              explanation: "height[0]=1 < height[4]=5, process left. height[0]=1 >= leftMax=0, update leftMax=1. No water. Move left to 1.",
              variables: { left: 0, right: 4, "h[L]": 1, "h[R]": 5, leftMax: 1, rightMax: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "pointer" },
                pointers: [{ name: "L", index: 0, color: "active" }, { name: "R", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [0], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 12],
              shortLabel: "L: h[1]=2, leftMax=2, L++",
              explanation: "height[1]=2 < height[4]=5, process left. height[1]=2 >= leftMax=1, update leftMax=2. Each bar is a new max — no water possible. Move left to 2.",
              variables: { left: 1, right: 4, "h[L]": 2, "h[R]": 5, leftMax: 2, rightMax: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "pointer" },
                pointers: [{ name: "L", index: 1, color: "active" }, { name: "R", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [1], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8, 12],
              shortLabel: "L: h[2]=3, leftMax=3, L++",
              explanation: "height[2]=3 < height[4]=5, process left. height[2]=3 >= leftMax=2, update leftMax=3. Still ascending. Move left to 3.",
              variables: { left: 2, right: 4, "h[L]": 3, "h[R]": 5, leftMax: 3, rightMax: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "pointer" },
                pointers: [{ name: "L", index: 2, color: "active" }, { name: "R", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [2], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8, 12],
              shortLabel: "L: h[3]=4, leftMax=4, L++",
              explanation: "height[3]=4 < height[4]=5, process left. height[3]=4 >= leftMax=3, update leftMax=4. Move left to 4.",
              variables: { left: 3, right: 4, "h[L]": 4, "h[R]": 5, leftMax: 4, rightMax: 0, totalWater: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "pointer" },
                pointers: [{ name: "L", index: 3, color: "active" }, { name: "R", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [3], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [22],
              shortLabel: "Return 0",
              explanation: "left=4, right=4. Pointers met. totalWater=0. A monotonically increasing array has no valleys — water needs walls on both sides to be trapped.",
              variables: { left: 4, right: 4, leftMax: 4, rightMax: 0, totalWater: 0, answer: 0 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ height }) {
        const steps = [];
        const n = height.length;
        let left = 0, right = n - 1;
        let leftMax = 0, rightMax = 0;
        let totalWater = 0;

        const getStates = (l, r, activeIdx, activeSide) => {
          const s = {};
          for (let k = 0; k < n; k++) {
            if (k < l || k > r) s[k] = "visited";
            else if (k === activeIdx) s[k] = "active";
            else if (k === l || k === r) s[k] = "pointer";
            else s[k] = "default";
          }
          return s;
        };

        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4],
          shortLabel: "Init pointers",
          explanation: `Set left=0, right=${right}. leftMax=0, rightMax=0, totalWater=0.`,
          variables: { left: 0, right, leftMax: 0, rightMax: 0, totalWater: 0 },
          dataStructure: {
            arrayStates: getStates(0, right, -1, null),
            pointers: [{ name: "L", index: 0, color: "pointer" }, { name: "R", index: right, color: "pointer" }],
          },
          delta: {}, isAnswer: false,
        });

        while (left < right) {
          if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
              leftMax = height[left];
              steps.push({
                stepId: steps.length, lineNumbers: [7, 8, 12],
                shortLabel: `L: h[${left}]=${height[left]}, leftMax=${leftMax}, L++`,
                explanation: `height[${left}]=${height[left]} < height[${right}]=${height[right]}, process left. height[${left}]=${height[left]} >= leftMax=${leftMax}, update leftMax. No water. Move left.`,
                variables: { left, right, "h[L]": height[left], "h[R]": height[right], leftMax, rightMax, totalWater },
                dataStructure: {
                  arrayStates: getStates(left, right, left, "left"),
                  pointers: [{ name: "L", index: left, color: "active" }, { name: "R", index: right, color: "pointer" }],
                },
                delta: { changedIndices: [left], movedPointers: ["L"] }, isAnswer: false,
              });
            } else {
              const water = leftMax - height[left];
              totalWater += water;
              steps.push({
                stepId: steps.length, lineNumbers: [7, 10, 12],
                shortLabel: `L: h[${left}]=${height[left]}, water+=${water}, L++`,
                explanation: `height[${left}]=${height[left]} < height[${right}]=${height[right]}, process left. height[${left}]=${height[left]} < leftMax=${leftMax}, water = ${leftMax}-${height[left]} = ${water}. totalWater=${totalWater}.`,
                variables: { left, right, "h[L]": height[left], "h[R]": height[right], leftMax, rightMax, water, totalWater },
                dataStructure: {
                  arrayStates: getStates(left, right, left, "left"),
                  pointers: [{ name: "L", index: left, color: "active" }, { name: "R", index: right, color: "pointer" }],
                },
                delta: { changedIndices: [left], movedPointers: ["L"] }, isAnswer: false,
              });
            }
            left++;
          } else {
            if (height[right] >= rightMax) {
              rightMax = height[right];
              steps.push({
                stepId: steps.length, lineNumbers: [14, 18],
                shortLabel: `R: h[${right}]=${height[right]}, rightMax=${rightMax}, R--`,
                explanation: `height[${left}]=${height[left]} >= height[${right}]=${height[right]}, process right. height[${right}]=${height[right]} >= rightMax=${rightMax}, update rightMax. No water. Move right.`,
                variables: { left, right, "h[L]": height[left], "h[R]": height[right], leftMax, rightMax, totalWater },
                dataStructure: {
                  arrayStates: getStates(left, right, right, "right"),
                  pointers: [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "active" }],
                },
                delta: { changedIndices: [right], movedPointers: ["R"] }, isAnswer: false,
              });
            } else {
              const water = rightMax - height[right];
              totalWater += water;
              steps.push({
                stepId: steps.length, lineNumbers: [14, 16, 18],
                shortLabel: `R: h[${right}]=${height[right]}, water+=${water}, R--`,
                explanation: `height[${left}]=${height[left]} >= height[${right}]=${height[right]}, process right. height[${right}]=${height[right]} < rightMax=${rightMax}, water = ${rightMax}-${height[right]} = ${water}. totalWater=${totalWater}.`,
                variables: { left, right, "h[L]": height[left], "h[R]": height[right], leftMax, rightMax, water, totalWater },
                dataStructure: {
                  arrayStates: getStates(left, right, right, "right"),
                  pointers: [{ name: "L", index: left, color: "pointer" }, { name: "R", index: right, color: "active" }],
                },
                delta: { changedIndices: [right], movedPointers: ["R"] }, isAnswer: false,
              });
            }
            right--;
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [22],
          shortLabel: `Return ${totalWater}`,
          explanation: `Pointers have met. Total trapped water = ${totalWater}. Computed in O(n) time with O(1) space.`,
          variables: { left, right, leftMax, rightMax, totalWater, answer: totalWater },
          dataStructure: {
            arrayStates: Object.fromEntries(height.map((_, i) => [i, "found"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n\u00B2)", space: "O(1)", explanation: "For each bar, scan left and right to find max heights" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass with two pointers tracking running maximums", tradeoff: "Two pointers eliminate redundant left/right max scans entirely — no extra space needed" },
  },

  interviewTips: [
    "Start by explaining the brute force: for each bar, water = min(maxLeft, maxRight) - height[i]. This shows you understand the core formula.",
    "Mention the prefix array optimization (O(n) time, O(n) space) as a middle step before two pointers.",
    "For the two-pointer solution, clearly explain WHY we process the smaller side: the smaller max is the bottleneck that determines water level.",
    "Draw the elevation map! This problem is highly visual — interviewers expect a diagram.",
    "Edge cases to mention: empty array, single element, all same height, monotonically increasing/decreasing.",
  ],

  relatedProblems: ["container-with-water", "largest-rectangle-histogram"],
};
