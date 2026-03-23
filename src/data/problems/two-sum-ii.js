export const twoSumII = {
  id: 11,
  slug: "two-sum-ii",
  title: "Two Sum II - Input Array Is Sorted",
  difficulty: "Medium",
  topic: "two-pointers",
  topicLabel: "Two Pointers",
  neetcodeNumber: 11,
  artifactType: "TwoPointer",
  companies: ["Amazon", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",

  pattern: "Two Pointers on Sorted Array",
  patternExplanation: `When the input array is sorted, two pointers starting from both ends
    can exploit the sorted order to find a pair in O(n). If the current sum is too small,
    move the left pointer right to increase it. If too large, move the right pointer left
    to decrease it. The sorted property guarantees we never miss the answer.`,

  intuition: {
    coreInsight: `Because the array is sorted, we know that moving the left pointer right
      increases the sum, and moving the right pointer left decreases it. This gives us a
      deterministic decision at every step: if the sum is too small, the only way to make
      it bigger is to advance the left pointer. If too big, retreat the right pointer. We
      never need to backtrack, so we examine each element at most once — O(n) total.`,

    mentalModel: `Imagine two people standing at opposite ends of a numbered line of stepping
      stones. They need to find two stones whose numbers add up to a target. If their current
      total is too low, the person on the left steps forward to a higher number. If it's too
      high, the person on the right steps backward to a lower number. Because the stones are
      in order, they'll always converge on the answer — they can never accidentally skip past it.`,

    whyNaiveFails: `Brute force checks all O(n²) pairs, completely ignoring the fact that the
      array is sorted. For n=30,000, that's 450 million pair checks. The two-pointer approach
      does at most n steps because each step either advances left or retreats right — the
      pointers can only move a combined total of n positions before they meet.`,

    keyObservation: `The sorted order creates a monotonic relationship: moving left pointer
      right can only increase the sum, moving right pointer left can only decrease it. This
      means we never need to revisit a position. Once we pass an element, it's permanently
      ruled out. This is why two pointers is O(n) and not O(n log n) — no binary search
      needed, just a linear sweep from both ends.`,
  },

  problem: `Given a 1-indexed array of integers numbers that is already sorted in non-decreasing
    order, find two numbers such that they add up to a specific target number. Let these two
    numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
    Return the indices of the two numbers, index1 and index2, added by one as an integer array
    [index1, index2] of length 2. The tests are generated such that there is exactly one solution.
    You may not use the same element twice. Your solution must use only constant extra space.`,

  examples: [
    { input: "numbers = [2,7,11,15], target = 9", output: "[1,2]", explanation: "numbers[1] + numbers[2] = 2 + 7 = 9. We return [1, 2]." },
    { input: "numbers = [2,3,4], target = 6", output: "[1,3]", explanation: "numbers[1] + numbers[3] = 2 + 4 = 6. We return [1, 3]." },
    { input: "numbers = [-1,0], target = -1", output: "[1,2]", explanation: "numbers[1] + numbers[2] = -1 + 0 = -1. We return [1, 2]." },
  ],

  constraints: [
    "2 <= numbers.length <= 3 * 10^4",
    "-1000 <= numbers[i] <= 1000",
    "numbers is sorted in non-decreasing order.",
    "-1000 <= target <= 1000",
    "The tests are generated such that there is exactly one solution.",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: "Try every pair (i, j) with i < j. Return 1-indexed positions where the sum equals target. Ignores the sorted property entirely.",

      javaCode: `public int[] twoSum(int[] numbers, int target) {
    for (int i = 0; i < numbers.length; i++) {
        for (int j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] == target) {
                return new int[]{i + 1, j + 1};
            }
        }
    }
    return new int[]{};
}`,

      cppCode: `vector<int> twoSum(vector<int>& numbers, int target) {
    for (int i = 0; i < numbers.size(); i++) {
        for (int j = i + 1; j < numbers.size(); j++) {
            if (numbers[i] + numbers[j] == target) {
                return {i + 1, j + 1};
            }
        }
    }
    return {};
}`,

      pythonCode: `def twoSum(numbers: List[int], target: int) -> List[int]:
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return [i + 1, j + 1]
    return []`,

      lineAnnotations: {
        2: "Outer loop: fix the first element",
        3: "Inner loop: try every subsequent element",
        4: "Check if this pair sums to target",
        5: "Found — return 1-indexed positions",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [2, 7, 11, 15], target: 9 },
          expectedOutput: "[1, 2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "i=0",
              explanation: "Start with i=0. We'll pair numbers[0]=2 with every element after it. This brute force ignores the sorted property.",
              variables: { i: 0, j: "-", "numbers[i]": 2, target: 9 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "j=1: 2+7=9 ✓",
              explanation: "j=1: numbers[0]+numbers[1] = 2+7 = 9 = target. Found on the first pair!",
              variables: { i: 0, j: 1, "numbers[i]": 2, "numbers[j]": 7, sum: 9, target: 9 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default" },
                pointers: [
                  { name: "i", index: 0, color: "pointer" },
                  { name: "j", index: 1, color: "active" },
                ],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "Return [1, 2]",
              explanation: "Match found. Return 1-indexed [1, 2]. Brute force got lucky here — worst case would check all O(n²) pairs.",
              variables: { i: 0, j: 1, answer: "[1, 2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, target }) {
        const steps = [];
        const n = nums.length;
        const defaultStates = () => Object.fromEntries(nums.map((_, i) => [i, "default"]));

        for (let i = 0; i < n; i++) {
          steps.push({
            stepId: steps.length,
            lineNumbers: [2],
            shortLabel: `i=${i}`,
            explanation: `Fix i=${i} (value=${nums[i]}). Try pairing with every element after it.`,
            variables: { i, j: "-", "numbers[i]": nums[i], target },
            dataStructure: {
              arrayStates: { ...defaultStates(), [i]: "active" },
              pointers: [{ name: "i", index: i, color: "pointer" }],
            },
            delta: { changedIndices: [i] },
            isAnswer: false,
          });

          for (let j = i + 1; j < n; j++) {
            const sum = nums[i] + nums[j];
            if (sum === target) {
              steps.push({
                stepId: steps.length,
                lineNumbers: [3, 4],
                shortLabel: `j=${j}: ${nums[i]}+${nums[j]}=${sum} ✓`,
                explanation: `j=${j}: numbers[${i}]+numbers[${j}] = ${nums[i]}+${nums[j]} = ${sum} = target. Found!`,
                variables: { i, j, "numbers[i]": nums[i], "numbers[j]": nums[j], sum, target },
                dataStructure: {
                  arrayStates: { ...defaultStates(), [i]: "active", [j]: "active" },
                  pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
                },
                delta: { changedIndices: [j] },
                isAnswer: false,
              });
              steps.push({
                stepId: steps.length,
                lineNumbers: [5],
                shortLabel: `Return [${i + 1}, ${j + 1}]`,
                explanation: `Match found. Return 1-indexed [${i + 1}, ${j + 1}].`,
                variables: { i, j, answer: `[${i + 1}, ${j + 1}]` },
                dataStructure: {
                  arrayStates: { ...defaultStates(), [i]: "found", [j]: "found" },
                  pointers: [],
                },
                delta: { changedIndices: [i, j] },
                isAnswer: true,
              });
              return steps;
            }

            steps.push({
              stepId: steps.length,
              lineNumbers: [3, 4],
              shortLabel: `j=${j}: ${nums[i]}+${nums[j]}=${sum} ✗`,
              explanation: `j=${j}: numbers[${i}]+numbers[${j}] = ${nums[i]}+${nums[j]} = ${sum} ≠ ${target}. Not a match.`,
              variables: { i, j, "numbers[i]": nums[i], "numbers[j]": nums[j], sum, target },
              dataStructure: {
                arrayStates: { ...defaultStates(), [i]: "active", [j]: "eliminated" },
                pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
              },
              delta: { changedIndices: [j] },
              isAnswer: false,
            });
          }
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Two Pointers",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Place one pointer at the start and one at the end of the sorted array.
        Compute the sum: if it equals target, return. If sum < target, move the left
        pointer right (increase sum). If sum > target, move the right pointer left
        (decrease sum). The sorted order guarantees convergence.`,

      javaCode: `public int[] twoSum(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;

    while (left < right) {
        int sum = numbers[left] + numbers[right];

        if (sum == target) {
            return new int[]{left + 1, right + 1};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return new int[]{};
}`,

      cppCode: `vector<int> twoSum(vector<int>& numbers, int target) {
    int left = 0;
    int right = numbers.size() - 1;

    while (left < right) {
        int sum = numbers[left] + numbers[right];

        if (sum == target) {
            return {left + 1, right + 1};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return {};
}`,

      pythonCode: `def twoSum(numbers: List[int], target: int) -> List[int]:
    left, right = 0, len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]

        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return []`,

      lineAnnotations: {
        2: "Left pointer starts at beginning of sorted array",
        3: "Right pointer starts at end of sorted array",
        5: "Continue while pointers haven't crossed",
        6: "Compute the sum of elements at both pointers",
        8: "Sum equals target — found the answer",
        9: "Return 1-indexed positions",
        10: "Sum too small — move left pointer right to increase",
        11: "Advance left pointer",
        12: "Sum too large — move right pointer left to decrease",
        13: "Retreat right pointer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Clean example — answer found after a few pointer moves",
          input: { nums: [2, 7, 11, 15], target: 9 },
          expectedOutput: "[1, 2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init pointers",
              explanation: "Place left pointer at index 0 (value=2) and right pointer at index 3 (value=15). These are the smallest and largest elements in the sorted array.",
              variables: { left: 0, right: 3, "numbers[left]": 2, "numbers[right]": 15, target: 9 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "pointer" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 3], movedPointers: ["left", "right"] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "sum = 2+15 = 17",
              explanation: "Compute sum = numbers[0] + numbers[3] = 2 + 15 = 17. Compare with target = 9.",
              variables: { left: 0, right: 3, "numbers[left]": 2, "numbers[right]": 15, sum: 17, target: 9 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "active" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13],
              shortLabel: "17 > 9 → right--",
              explanation: "Sum 17 > target 9. The sum is too large. Since the array is sorted, moving right pointer left will decrease the sum. Move right from 3 to 2.",
              variables: { left: 0, right: 2, "numbers[left]": 2, "numbers[right]": 11, target: 9, previousSum: 17 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "pointer", 3: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 2, color: "pointer" },
                ],
              },
              delta: { changedIndices: [2, 3], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6],
              shortLabel: "sum = 2+11 = 13",
              explanation: "Compute sum = numbers[0] + numbers[2] = 2 + 11 = 13. Compare with target = 9.",
              variables: { left: 0, right: 2, "numbers[left]": 2, "numbers[right]": 11, sum: 13, target: 9 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "active", 3: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 2, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12, 13],
              shortLabel: "13 > 9 → right--",
              explanation: "Sum 13 > target 9. Still too large. Move right pointer left again, from 2 to 1.",
              variables: { left: 0, right: 1, "numbers[left]": 2, "numbers[right]": 7, target: 9, previousSum: 13 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "pointer", 2: "eliminated", 3: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 1, color: "pointer" },
                ],
              },
              delta: { changedIndices: [1, 2], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6],
              shortLabel: "sum = 2+7 = 9",
              explanation: "Compute sum = numbers[0] + numbers[1] = 2 + 7 = 9. This equals the target!",
              variables: { left: 0, right: 1, "numbers[left]": 2, "numbers[right]": 7, sum: 9, target: 9 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "eliminated", 3: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 1, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [8, 9],
              shortLabel: "Return [1, 2]",
              explanation: "Sum equals target! Return 1-indexed positions [left+1, right+1] = [1, 2]. Found in just 3 iterations instead of checking all 6 pairs.",
              variables: { left: 0, right: 1, answer: "[1, 2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "eliminated", 3: "eliminated" },
                pointers: [],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Answer in Middle",
          description: "Answer pair is in the middle — both pointers must move inward",
          input: { nums: [1, 3, 5, 7, 9], target: 12 },
          expectedOutput: "[2, 5]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init pointers",
              explanation: "Place left at index 0 (value=1) and right at index 4 (value=9). The answer is [3,9] at indices 1 and 4 — both pointers will need to move.",
              variables: { left: 0, right: 4, "numbers[left]": 1, "numbers[right]": 9, target: 12 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "default", 4: "pointer" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 4, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 4], movedPointers: ["left", "right"] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "sum = 1+9 = 10",
              explanation: "Compute sum = numbers[0] + numbers[4] = 1 + 9 = 10. Compare with target = 12.",
              variables: { left: 0, right: 4, "numbers[left]": 1, "numbers[right]": 9, sum: 10, target: 12 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "active" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 4, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 4] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11],
              shortLabel: "10 < 12 → left++",
              explanation: "Sum 10 < target 12. Too small. Move left pointer right to increase the sum. Move left from 0 to 1.",
              variables: { left: 1, right: 4, "numbers[left]": 3, "numbers[right]": 9, target: 12, previousSum: 10 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "default", 3: "default", 4: "pointer" },
                pointers: [
                  { name: "left", index: 1, color: "pointer" },
                  { name: "right", index: 4, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 1], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6],
              shortLabel: "sum = 3+9 = 12",
              explanation: "Compute sum = numbers[1] + numbers[4] = 3 + 9 = 12. This equals the target!",
              variables: { left: 1, right: 4, "numbers[left]": 3, "numbers[right]": 9, sum: 12, target: 12 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "active" },
                pointers: [
                  { name: "left", index: 1, color: "pointer" },
                  { name: "right", index: 4, color: "pointer" },
                ],
              },
              delta: { changedIndices: [1, 4] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 9],
              shortLabel: "Return [2, 5]",
              explanation: "Sum equals target! Return 1-indexed [left+1, right+1] = [2, 5]. Found after just 2 iterations — the left pointer moved once to land on the answer.",
              variables: { left: 1, right: 4, answer: "[2, 5]" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "found", 2: "default", 3: "default", 4: "found" },
                pointers: [],
              },
              delta: { changedIndices: [1, 4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Multiple Moves",
          description: "Both pointers zig-zag inward before finding the answer",
          input: { nums: [1, 2, 4, 6, 10], target: 8 },
          expectedOutput: "[2, 4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init pointers",
              explanation: "Place left at index 0 (value=1) and right at index 4 (value=10).",
              variables: { left: 0, right: 4, "numbers[left]": 1, "numbers[right]": 10, target: 8 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "default", 4: "pointer" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 4, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 4], movedPointers: ["left", "right"] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "sum = 1+10 = 11",
              explanation: "Compute sum = numbers[0] + numbers[4] = 1 + 10 = 11. Compare with target = 8.",
              variables: { left: 0, right: 4, "numbers[left]": 1, "numbers[right]": 10, sum: 11, target: 8 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "active" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 4, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 4] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13],
              shortLabel: "11 > 8 → right--",
              explanation: "Sum 11 > target 8. Too large. Move right pointer left from 4 to 3.",
              variables: { left: 0, right: 3, "numbers[left]": 1, "numbers[right]": 6, target: 8, previousSum: 11 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "pointer", 4: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [3, 4], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6],
              shortLabel: "sum = 1+6 = 7",
              explanation: "Compute sum = numbers[0] + numbers[3] = 1 + 6 = 7. Compare with target = 8.",
              variables: { left: 0, right: 3, "numbers[left]": 1, "numbers[right]": 6, sum: 7, target: 8 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "active", 4: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10, 11],
              shortLabel: "7 < 8 → left++",
              explanation: "Sum 7 < target 8. Too small. Move left pointer right from 0 to 1.",
              variables: { left: 1, right: 3, "numbers[left]": 2, "numbers[right]": 6, target: 8, previousSum: 7 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "default", 3: "pointer", 4: "eliminated" },
                pointers: [
                  { name: "left", index: 1, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 1], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6],
              shortLabel: "sum = 2+6 = 8",
              explanation: "Compute sum = numbers[1] + numbers[3] = 2 + 6 = 8. This equals the target!",
              variables: { left: 1, right: 3, "numbers[left]": 2, "numbers[right]": 6, sum: 8, target: 8 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "active", 4: "eliminated" },
                pointers: [
                  { name: "left", index: 1, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [1, 3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [8, 9],
              shortLabel: "Return [2, 4]",
              explanation: "Sum equals target! Return 1-indexed [left+1, right+1] = [2, 4]. Both pointers moved inward — left moved once right, right moved once left — converging on the answer in 3 iterations.",
              variables: { left: 1, right: 3, answer: "[2, 4]" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "found", 2: "default", 3: "found", 4: "eliminated" },
                pointers: [],
              },
              delta: { changedIndices: [1, 3] },
              isAnswer: true,
            },
          ],
        },

        edgeCase3: {
          id: "edgeCase3",
          label: "Negatives",
          description: "Array with negative numbers — tests that the logic works with mixed signs",
          input: { nums: [-3, -1, 0, 2, 5], target: 1 },
          expectedOutput: "[2, 4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init pointers",
              explanation: "Place left at index 0 (value=-3) and right at index 4 (value=5). Array has negative numbers but the two-pointer logic still works because it's sorted.",
              variables: { left: 0, right: 4, "numbers[left]": -3, "numbers[right]": 5, target: 1 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "default", 4: "pointer" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 4, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 4], movedPointers: ["left", "right"] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "sum = -3+5 = 2",
              explanation: "Compute sum = numbers[0] + numbers[4] = -3 + 5 = 2. Compare with target = 1.",
              variables: { left: 0, right: 4, "numbers[left]": -3, "numbers[right]": 5, sum: 2, target: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "active" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 4, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 4] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13],
              shortLabel: "2 > 1 → right--",
              explanation: "Sum 2 > target 1. Too large. Move right pointer left from 4 to 3.",
              variables: { left: 0, right: 3, "numbers[left]": -3, "numbers[right]": 2, target: 1, previousSum: 2 },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "default", 2: "default", 3: "pointer", 4: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [3, 4], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6],
              shortLabel: "sum = -3+2 = -1",
              explanation: "Compute sum = numbers[0] + numbers[3] = -3 + 2 = -1. Compare with target = 1.",
              variables: { left: 0, right: 3, "numbers[left]": -3, "numbers[right]": 2, sum: -1, target: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "active", 4: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10, 11],
              shortLabel: "-1 < 1 → left++",
              explanation: "Sum -1 < target 1. Too small. Move left pointer right from 0 to 1.",
              variables: { left: 1, right: 3, "numbers[left]": -1, "numbers[right]": 2, target: 1, previousSum: -1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "pointer", 2: "default", 3: "pointer", 4: "eliminated" },
                pointers: [
                  { name: "left", index: 1, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 1], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6],
              shortLabel: "sum = -1+2 = 1",
              explanation: "Compute sum = numbers[1] + numbers[3] = -1 + 2 = 1. This equals the target!",
              variables: { left: 1, right: 3, "numbers[left]": -1, "numbers[right]": 2, sum: 1, target: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "active", 4: "eliminated" },
                pointers: [
                  { name: "left", index: 1, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [1, 3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [8, 9],
              shortLabel: "Return [2, 4]",
              explanation: "Sum equals target! Return 1-indexed [left+1, right+1] = [2, 4]. Negative numbers don't affect the two-pointer logic — the sorted property is all that matters.",
              variables: { left: 1, right: 3, answer: "[2, 4]" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "found", 2: "default", 3: "found", 4: "eliminated" },
                pointers: [],
              },
              delta: { changedIndices: [1, 3] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, target }) {
        const steps = [];
        const n = nums.length;

        let left = 0;
        let right = n - 1;

        // Init step
        steps.push({
          stepId: 0,
          lineNumbers: [2, 3],
          shortLabel: "Init pointers",
          explanation: `Place left pointer at index 0 (value=${nums[0]}) and right pointer at index ${right} (value=${nums[right]}).`,
          variables: { left: 0, right, "numbers[left]": nums[0], "numbers[right]": nums[right], target },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, i === 0 ? "pointer" : i === right ? "pointer" : "default"])),
            pointers: [
              { name: "left", index: 0, color: "pointer" },
              { name: "right", index: right, color: "pointer" },
            ],
          },
          delta: { changedIndices: [0, right], movedPointers: ["left", "right"] },
          isAnswer: false,
        });

        const eliminated = new Set();

        while (left < right) {
          const sum = nums[left] + nums[right];

          // Show the sum computation
          steps.push({
            stepId: steps.length,
            lineNumbers: [5, 6],
            shortLabel: `sum = ${nums[left]}+${nums[right]} = ${sum}`,
            explanation: `Compute sum = numbers[${left}] + numbers[${right}] = ${nums[left]} + ${nums[right]} = ${sum}. Compare with target = ${target}.`,
            variables: { left, right, "numbers[left]": nums[left], "numbers[right]": nums[right], sum, target },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, i) => [i, eliminated.has(i) ? "eliminated" : i === left || i === right ? "active" : "default"])),
              pointers: [
                { name: "left", index: left, color: "pointer" },
                { name: "right", index: right, color: "pointer" },
              ],
            },
            delta: { changedIndices: [left, right] },
            isAnswer: false,
          });

          if (sum === target) {
            // Answer found
            steps.push({
              stepId: steps.length,
              lineNumbers: [8, 9],
              shortLabel: `Return [${left + 1}, ${right + 1}]`,
              explanation: `Sum equals target! Return 1-indexed [left+1, right+1] = [${left + 1}, ${right + 1}].`,
              variables: { left, right, answer: `[${left + 1}, ${right + 1}]` },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, i) => [i, eliminated.has(i) ? "eliminated" : i === left || i === right ? "found" : "default"])),
                pointers: [],
              },
              delta: { changedIndices: [left, right] },
              isAnswer: true,
            });
            return steps;
          } else if (sum < target) {
            eliminated.add(left);
            left++;

            steps.push({
              stepId: steps.length,
              lineNumbers: [10, 11],
              shortLabel: `${sum} < ${target} → left++`,
              explanation: `Sum ${sum} < target ${target}. Too small. Move left pointer right from ${left - 1} to ${left}.`,
              variables: { left, right, "numbers[left]": nums[left], "numbers[right]": nums[right], target, previousSum: sum },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, i) => [i, eliminated.has(i) ? "eliminated" : i === left || i === right ? "pointer" : "default"])),
                pointers: [
                  { name: "left", index: left, color: "pointer" },
                  { name: "right", index: right, color: "pointer" },
                ],
              },
              delta: { changedIndices: [left - 1, left], movedPointers: ["left"] },
              isAnswer: false,
            });
          } else {
            eliminated.add(right);
            right--;

            steps.push({
              stepId: steps.length,
              lineNumbers: [12, 13],
              shortLabel: `${sum} > ${target} → right--`,
              explanation: `Sum ${sum} > target ${target}. Too large. Move right pointer left from ${right + 1} to ${right}.`,
              variables: { left, right, "numbers[left]": nums[left], "numbers[right]": nums[right], target, previousSum: sum },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, i) => [i, eliminated.has(i) ? "eliminated" : i === left || i === right ? "pointer" : "default"])),
                pointers: [
                  { name: "left", index: left, color: "pointer" },
                  { name: "right", index: right, color: "pointer" },
                ],
              },
              delta: { changedIndices: [right, right + 1], movedPointers: ["right"] },
              isAnswer: false,
            });
          }
        }

        // No solution found (shouldn't happen per constraints)
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n²)", space: "O(1)", explanation: "Two nested loops checking every pair" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass with two pointers converging from both ends. No extra data structures needed — the sorted array itself provides the structure.", tradeoff: "Unlike Two Sum I which trades O(n) space for O(n) time via HashMap, this problem achieves O(n) time AND O(1) space because the sorted input eliminates the need for a lookup table." },
  },

  interviewTips: [
    "Immediately note that the array is sorted — this is the key that unlocks two pointers.",
    "Mention brute force O(n²) first, then explain why sorted order enables O(n).",
    "Clarify: 'The problem asks for 1-indexed output, not 0-indexed.' — easy off-by-one mistake.",
    "Explain why pointers converge: left can only go right (increase sum), right can only go left (decrease sum).",
    "Compare with Two Sum I: there you need a HashMap because the array is unsorted. Here, sorted order gives O(1) space.",
    "Ask: 'Is the array guaranteed to have exactly one solution?' — affects early termination logic.",
  ],

  relatedProblems: ["two-sum", "3sum", "container-with-water"],
};
