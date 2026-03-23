export const searchRotatedArray = {
  id: 32,
  slug: "search-rotated-array",
  title: "Search in Rotated Sorted Array",
  difficulty: "Medium",
  topic: "binary-search",
  topicLabel: "Binary Search",
  neetcodeNumber: 32,
  artifactType: "BinarySearch",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/search-in-rotated-sorted-array/",

  pattern: "Modified Binary Search on Rotated Array",
  patternExplanation: `When a sorted array has been rotated, one half is always sorted.
    Determine which half is sorted, then check if target lies in that sorted half.
    If yes, search there; otherwise search the other half. Still O(log n).`,

  intuition: {
    coreInsight: `A rotated sorted array has a key property: when you split it at any midpoint,
      at least one half is always perfectly sorted. By checking which half is sorted (compare
      nums[left] with nums[mid]), you can determine whether the target lies in that sorted range.
      If it does, eliminate the other half. If it doesn't, eliminate the sorted half. This gives
      you the same O(log n) halving that normal binary search provides.`,

    mentalModel: `Imagine a clock face where the numbers 1-12 are in order, but the starting
      position has been rotated — maybe it starts at 5 and wraps around: 5,6,7,8,9,10,11,12,1,2,3,4.
      If you pick any point and look at the half going clockwise vs counterclockwise, one direction
      always gives you a properly ascending run. You use that sorted run to decide which direction
      your target number lies in, then repeat. Each step eliminates half the clock face.`,

    whyNaiveFails: `Linear scan is O(n) — for an array of 10,000 elements, that's 10,000 comparisons.
      Since the array was originally sorted (just rotated), we should be able to exploit that structure.
      Binary search on a plain sorted array is O(log n) = ~13 comparisons for n=10,000. The rotation
      adds a twist, but doesn't destroy the sortedness — it just splits it into two sorted halves.`,

    keyObservation: `The decision at each step is: "Is the LEFT half sorted, or the RIGHT half?"
      Compare nums[left] <= nums[mid]. If true, the left half [left..mid] is sorted — check if
      target falls in [nums[left], nums[mid]]. If nums[mid] <= nums[right], the right half is
      sorted. This single comparison replaces the simple nums[mid] vs target check of standard
      binary search, and correctly handles the rotation pivot.`,
  },

  problem: `There is an integer array nums sorted in ascending order (with distinct values).
    Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k
    (1 <= k <= nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1],
    nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might become
    [4,5,6,7,0,1,2]. Given the array nums after the possible rotation and an integer target,
    return the index of target if it is in nums, or -1 if it is not in nums. You must write an
    algorithm with O(log n) runtime complexity.`,

  examples: [
    { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "0 is at index 4" },
    { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1", explanation: "3 is not in the array" },
    { input: "nums = [1], target = 0", output: "-1", explanation: "Single element, not the target" },
  ],

  constraints: [
    "1 <= nums.length <= 5000",
    "-10^4 <= nums[i] <= 10^4",
    "All values of nums are unique.",
    "nums is an ascending array that is possibly rotated.",
    "-10^4 <= target <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Linear Scan",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "Scan through the entire array and check each element against target.",

      javaCode: `public int search(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == target) {
            return i;
        }
    }
    return -1;
}`,

      cppCode: `int search(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] == target) {
            return i;
        }
    }
    return -1;
}`,

      pythonCode: `def search(nums: List[int], target: int) -> int:
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1`,

      lineAnnotations: {
        2: "Iterate through every element",
        3: "Check if current element matches target",
        4: "Found — return the index",
        7: "Target not found in array",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "i=0: 4≠0",
              explanation: "Check nums[0]=4. Not equal to target 0. Move on.",
              variables: { i: 0, "nums[i]": 4, target: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [2, 3],
              shortLabel: "i=1: 5≠0",
              explanation: "Check nums[1]=5. Not equal to target 0.",
              variables: { i: 1, "nums[i]": 5, target: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [2, 3],
              shortLabel: "i=2: 6≠0",
              explanation: "Check nums[2]=6. Not equal to target 0.",
              variables: { i: 2, "nums[i]": 6, target: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [2, 3],
              shortLabel: "i=3: 7≠0",
              explanation: "Check nums[3]=7. Not equal to target 0.",
              variables: { i: 3, "nums[i]": 7, target: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [2, 3, 4],
              shortLabel: "i=4: 0=0 ✓",
              explanation: "Check nums[4]=0. Equal to target 0! Return index 4.",
              variables: { i: 4, "nums[i]": 0, target: 0, answer: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "found", 5: "default", 6: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, target }) {
        const steps = [];
        for (let i = 0; i < nums.length; i++) {
          const states = {};
          for (let j = 0; j < nums.length; j++) {
            states[j] = j < i ? "visited" : j === i ? "active" : "default";
          }
          if (nums[i] === target) {
            states[i] = "found";
            steps.push({
              stepId: steps.length, lineNumbers: [2, 3, 4],
              shortLabel: `i=${i}: ${nums[i]}=${target} ✓`,
              explanation: `nums[${i}]=${nums[i]} equals target ${target}. Return ${i}.`,
              variables: { i, "nums[i]": nums[i], target, answer: i },
              dataStructure: { arrayStates: states, pointers: [{ name: "i", index: i, color: "pointer" }] },
              delta: { changedIndices: [i] }, isAnswer: true,
            });
            return steps;
          }
          steps.push({
            stepId: steps.length, lineNumbers: [2, 3],
            shortLabel: `i=${i}: ${nums[i]}≠${target}`,
            explanation: `nums[${i}]=${nums[i]} ≠ target ${target}. Continue.`,
            variables: { i, "nums[i]": nums[i], target },
            dataStructure: { arrayStates: states, pointers: [{ name: "i", index: i, color: "pointer" }] },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }
        steps.push({
          stepId: steps.length, lineNumbers: [7],
          shortLabel: "Not found → -1",
          explanation: `Scanned entire array. Target ${target} not found. Return -1.`,
          variables: { answer: -1 },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Modified Binary Search",
      tier: "optimal",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      idea: `Use binary search. At each step, determine which half is sorted by comparing
        nums[left] with nums[mid]. If target lies within the sorted half, search there.
        Otherwise, search the other half.`,

      javaCode: `public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;
        }

        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}`,

      cppCode: `int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;
        }

        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}`,

      pythonCode: `def search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,

      lineAnnotations: {
        2: "Initialize left and right boundaries",
        4: "Standard binary search loop",
        5: "Compute mid to avoid overflow",
        7: "Direct hit — target found at mid",
        8: "Return mid immediately",
        11: "Left half is sorted (nums[left] <= nums[mid])",
        12: "Target falls within the sorted left half?",
        13: "Yes — narrow search to left half",
        15: "No — target must be in the right (unsorted) half",
        18: "Right half is sorted",
        19: "Target falls within the sorted right half?",
        20: "Yes — narrow search to right half",
        22: "No — target must be in the left (unsorted) half",
        26: "Target not found in array",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Target in the rotated portion, found after two narrows",
          input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init: left=0, right=6",
              explanation: "Set left=0, right=6. The array [4,5,6,7,0,1,2] was sorted then rotated. The pivot is between index 3 and 4. We need to find target=0.",
              variables: { left: 0, right: 6, target: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 0, bsMid: null, bsRight: 6,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "mid=3, nums[3]=7",
              explanation: "Compute mid = 0 + (6-0)/2 = 3. nums[3]=7. Is 7 == target 0? No.",
              variables: { left: 0, right: 6, mid: 3, "nums[mid]": 7, target: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "mid", index: 3, color: "active" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 0, bsMid: 3, bsRight: 6,
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "Left sorted [4..7], 0 not in [4,7)",
              explanation: "nums[left]=4 <= nums[mid]=7, so the left half [4,5,6,7] is sorted. Is target=0 in range [4, 7)? No — 0 < 4. So target must be in the right half.",
              variables: { left: 0, right: 6, mid: 3, "nums[left]": 4, "nums[mid]": 7, target: 0, sorted: "left" },
              dataStructure: {
                arrayStates: { 0: "pointer", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "mid", index: 3, color: "active" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 0, bsMid: 3, bsRight: 6,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15],
              shortLabel: "left = mid+1 = 4",
              explanation: "Target 0 is not in the sorted left half. Move left to mid+1 = 4. Now searching [0, 1, 2].",
              variables: { left: 4, right: 6, target: 0 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "default", 5: "default", 6: "default" },
                pointers: [
                  { name: "left", index: 4, color: "pointer" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 4, bsMid: null, bsRight: 6,
              },
              delta: { changedIndices: [0, 1, 2, 3], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5],
              shortLabel: "mid=5, nums[5]=1",
              explanation: "Compute mid = 4 + (6-4)/2 = 5. nums[5]=1. Is 1 == 0? No.",
              variables: { left: 4, right: 6, mid: 5, "nums[mid]": 1, target: 0 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "default", 5: "active", 6: "default" },
                pointers: [
                  { name: "left", index: 4, color: "pointer" },
                  { name: "mid", index: 5, color: "active" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 4, bsMid: 5, bsRight: 6,
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 12, 13],
              shortLabel: "Left sorted [0..1], 0 in [0,1) → right=4",
              explanation: "nums[left]=0 <= nums[mid]=1, so left half [0,1] is sorted. Is target=0 in [0, 1)? Yes! 0 >= 0 and 0 < 1. Narrow to left: right = mid-1 = 4.",
              variables: { left: 4, right: 4, mid: 5, "nums[left]": 0, "nums[mid]": 1, target: 0 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "default", 5: "eliminated", 6: "eliminated" },
                pointers: [
                  { name: "left", index: 4, color: "pointer" },
                  { name: "right", index: 4, color: "pointer" },
                ],
                bsLeft: 4, bsMid: null, bsRight: 4,
              },
              delta: { changedIndices: [5, 6], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [4, 5, 7, 8],
              shortLabel: "mid=4, nums[4]=0 = target ✓",
              explanation: "mid = 4 + (4-4)/2 = 4. nums[4]=0, which equals target=0. Found! Return 4.",
              variables: { left: 4, right: 4, mid: 4, "nums[mid]": 0, target: 0, answer: 4 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "found", 5: "eliminated", 6: "eliminated" },
                pointers: [
                  { name: "mid", index: 4, color: "found" },
                ],
                bsLeft: 4, bsMid: 4, bsRight: 4,
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Not Found",
          description: "Target does not exist in the array",
          input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 },
          expectedOutput: "-1",
          commonMistake: "Forgetting to handle the case where binary search exhausts all possibilities. Some implementations incorrectly return mid instead of -1 when left > right.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init: left=0, right=6",
              explanation: "Set left=0, right=6. Searching for target=3 in [4,5,6,7,0,1,2]. Spoiler: 3 is not in this array.",
              variables: { left: 0, right: 6, target: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 0, bsMid: null, bsRight: 6,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 7],
              shortLabel: "mid=3, nums[3]=7≠3",
              explanation: "mid=3, nums[3]=7. Not target. nums[left]=4 <= nums[mid]=7, so left half [4,5,6,7] is sorted.",
              variables: { left: 0, right: 6, mid: 3, "nums[mid]": 7, target: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "mid", index: 3, color: "active" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 0, bsMid: 3, bsRight: 6,
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12, 15],
              shortLabel: "3 not in [4,7) → left=4",
              explanation: "Is target=3 in sorted range [4, 7)? No — 3 < 4. Move left = mid+1 = 4.",
              variables: { left: 4, right: 6, target: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "default", 5: "default", 6: "default" },
                pointers: [
                  { name: "left", index: 4, color: "pointer" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 4, bsMid: null, bsRight: 6,
              },
              delta: { changedIndices: [0, 1, 2, 3], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 7],
              shortLabel: "mid=5, nums[5]=1≠3",
              explanation: "mid=5, nums[5]=1. Not target. nums[left]=0 <= nums[mid]=1, so left half [0,1] is sorted.",
              variables: { left: 4, right: 6, mid: 5, "nums[mid]": 1, target: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "default", 5: "active", 6: "default" },
                pointers: [
                  { name: "left", index: 4, color: "pointer" },
                  { name: "mid", index: 5, color: "active" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 4, bsMid: 5, bsRight: 6,
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12, 15],
              shortLabel: "3 not in [0,1) → left=6",
              explanation: "Is target=3 in sorted range [0, 1)? No — 3 > 1. Move left = mid+1 = 6.",
              variables: { left: 6, right: 6, target: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "default" },
                pointers: [
                  { name: "left", index: 6, color: "pointer" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 6, bsMid: null, bsRight: 6,
              },
              delta: { changedIndices: [4, 5], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5, 7],
              shortLabel: "mid=6, nums[6]=2≠3",
              explanation: "mid=6, nums[6]=2. Not target 3.",
              variables: { left: 6, right: 6, mid: 6, "nums[mid]": 2, target: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "active" },
                pointers: [
                  { name: "left", index: 6, color: "pointer" },
                  { name: "mid", index: 6, color: "active" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 6, bsMid: 6, bsRight: 6,
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12, 15],
              shortLabel: "left=7 > right=6 → loop ends",
              explanation: "nums[left]=2 <= nums[mid]=2, left half is sorted. 3 not in [2,2). Move left=7. Now left > right, loop exits.",
              variables: { left: 7, right: 6, target: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated" },
                pointers: [],
                bsLeft: 7, bsMid: null, bsRight: 6,
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [26],
              shortLabel: "Return -1",
              explanation: "Search space exhausted. Target 3 does not exist in the array. Return -1.",
              variables: { answer: -1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated" },
                pointers: [],
                bsLeft: 7, bsMid: null, bsRight: 6,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Target in Left Sorted Half",
          description: "Target is in the sorted portion before the pivot",
          input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 5 },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init: left=0, right=6",
              explanation: "Set left=0, right=6. Searching for target=5 in [4,5,6,7,0,1,2]. Target is in the sorted left portion.",
              variables: { left: 0, right: 6, target: 5 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 0, bsMid: null, bsRight: 6,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 7],
              shortLabel: "mid=3, nums[3]=7≠5",
              explanation: "mid=3, nums[3]=7. Not target 5. Left half [4,5,6,7] is sorted (4 <= 7).",
              variables: { left: 0, right: 6, mid: 3, "nums[mid]": 7, target: 5 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "mid", index: 3, color: "active" },
                  { name: "right", index: 6, color: "pointer" },
                ],
                bsLeft: 0, bsMid: 3, bsRight: 6,
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12, 13],
              shortLabel: "5 in [4,7) → right=2",
              explanation: "Is target=5 in sorted range [4, 7)? Yes! 4 <= 5 < 7. Narrow to left half: right = mid-1 = 2.",
              variables: { left: 0, right: 2, target: 5 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 2, color: "pointer" },
                ],
                bsLeft: 0, bsMid: null, bsRight: 2,
              },
              delta: { changedIndices: [3, 4, 5, 6], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 7],
              shortLabel: "mid=1, nums[1]=5 = target ✓",
              explanation: "mid = 0 + (2-0)/2 = 1. nums[1]=5, which equals target=5. Found! Return 1.",
              variables: { left: 0, right: 2, mid: 1, "nums[mid]": 5, target: 5, answer: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "found", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated" },
                pointers: [
                  { name: "mid", index: 1, color: "found" },
                ],
                bsLeft: 0, bsMid: 1, bsRight: 2,
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, target }) {
        const steps = [];
        let left = 0, right = nums.length - 1;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `Init: left=0, right=${right}`,
          explanation: `Initialize left=0, right=${right}. Searching for target=${target} in the rotated sorted array.`,
          variables: { left: 0, right, target },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [
              { name: "left", index: 0, color: "pointer" },
              { name: "right", index: right, color: "pointer" },
            ],
            bsLeft: 0, bsMid: null, bsRight: right,
          },
          delta: {}, isAnswer: false,
        });

        while (left <= right) {
          const mid = left + Math.floor((right - left) / 2);
          const states = {};
          for (let j = 0; j < nums.length; j++) {
            if (j < left || j > right) states[j] = "eliminated";
            else if (j === mid) states[j] = "active";
            else states[j] = "default";
          }

          if (nums[mid] === target) {
            states[mid] = "found";
            steps.push({
              stepId: steps.length, lineNumbers: [4, 5, 7, 8],
              shortLabel: `mid=${mid}, nums[${mid}]=${nums[mid]} = target ✓`,
              explanation: `mid=${mid}, nums[${mid}]=${nums[mid]} equals target=${target}. Found! Return ${mid}.`,
              variables: { left, right, mid, "nums[mid]": nums[mid], target, answer: mid },
              dataStructure: {
                arrayStates: states,
                pointers: [{ name: "mid", index: mid, color: "found" }],
                bsLeft: left, bsMid: mid, bsRight: right,
              },
              delta: { changedIndices: [mid] }, isAnswer: true,
            });
            return steps;
          }

          steps.push({
            stepId: steps.length, lineNumbers: [4, 5, 7],
            shortLabel: `mid=${mid}, nums[${mid}]=${nums[mid]}≠${target}`,
            explanation: `mid=${mid}, nums[${mid}]=${nums[mid]}. Not equal to target ${target}.`,
            variables: { left, right, mid, "nums[mid]": nums[mid], target },
            dataStructure: {
              arrayStates: states,
              pointers: [
                { name: "left", index: left, color: "pointer" },
                { name: "mid", index: mid, color: "active" },
                { name: "right", index: right, color: "pointer" },
              ],
              bsLeft: left, bsMid: mid, bsRight: right,
            },
            delta: { changedIndices: [mid] }, isAnswer: false,
          });

          if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
              const oldRight = right;
              right = mid - 1;
              steps.push({
                stepId: steps.length, lineNumbers: [11, 12, 13],
                shortLabel: `Left sorted, ${target} in [${nums[left]},${nums[mid]}) → right=${right}`,
                explanation: `Left half is sorted. Target ${target} is in range [${nums[left]}, ${nums[mid]}). Narrow right to ${right}.`,
                variables: { left, right, target },
                dataStructure: {
                  arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < left || j > right ? "eliminated" : "default"])),
                  pointers: [
                    { name: "left", index: left, color: "pointer" },
                    { name: "right", index: right, color: "pointer" },
                  ],
                  bsLeft: left, bsMid: null, bsRight: right,
                },
                delta: { movedPointers: ["right"] }, isAnswer: false,
              });
            } else {
              const oldLeft = left;
              left = mid + 1;
              steps.push({
                stepId: steps.length, lineNumbers: [11, 12, 15],
                shortLabel: `Left sorted, ${target} not in range → left=${left}`,
                explanation: `Left half is sorted but target ${target} is outside [${nums[oldLeft]}, ${nums[mid]}). Move left to ${left}.`,
                variables: { left, right, target },
                dataStructure: {
                  arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < left || j > right ? "eliminated" : "default"])),
                  pointers: [
                    { name: "left", index: left, color: "pointer" },
                    { name: "right", index: right, color: "pointer" },
                  ],
                  bsLeft: left, bsMid: null, bsRight: right,
                },
                delta: { movedPointers: ["left"] }, isAnswer: false,
              });
            }
          } else {
            if (nums[mid] < target && target <= nums[right]) {
              const oldLeft = left;
              left = mid + 1;
              steps.push({
                stepId: steps.length, lineNumbers: [18, 19, 20],
                shortLabel: `Right sorted, ${target} in (${nums[mid]},${nums[right]}] → left=${left}`,
                explanation: `Right half is sorted. Target ${target} is in range (${nums[mid]}, ${nums[right]}]. Move left to ${left}.`,
                variables: { left, right, target },
                dataStructure: {
                  arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < left || j > right ? "eliminated" : "default"])),
                  pointers: [
                    { name: "left", index: left, color: "pointer" },
                    { name: "right", index: right, color: "pointer" },
                  ],
                  bsLeft: left, bsMid: null, bsRight: right,
                },
                delta: { movedPointers: ["left"] }, isAnswer: false,
              });
            } else {
              const oldRight = right;
              right = mid - 1;
              steps.push({
                stepId: steps.length, lineNumbers: [18, 19, 22],
                shortLabel: `Right sorted, ${target} not in range → right=${right}`,
                explanation: `Right half is sorted but target ${target} is outside (${nums[mid]}, ${nums[oldRight]}]. Narrow right to ${right}.`,
                variables: { left, right, target },
                dataStructure: {
                  arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < left || j > right ? "eliminated" : "default"])),
                  pointers: [
                    { name: "left", index: left, color: "pointer" },
                    { name: "right", index: right, color: "pointer" },
                  ],
                  bsLeft: left, bsMid: null, bsRight: right,
                },
                delta: { movedPointers: ["right"] }, isAnswer: false,
              });
            }
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [26],
          shortLabel: "Return -1",
          explanation: `Search space exhausted (left=${left} > right=${right}). Target ${target} not found. Return -1.`,
          variables: { answer: -1 },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "eliminated"])),
            pointers: [],
            bsLeft: left, bsMid: null, bsRight: right,
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(1)", explanation: "Linear scan through the entire array" },
    optimal: { time: "O(log n)", space: "O(1)", explanation: "Modified binary search halves the search space each iteration", tradeoff: "Exploits the rotated-sorted structure for logarithmic time" },
  },

  interviewTips: [
    "Clarify: 'Are all elements distinct?' — duplicates require a different approach (LC 81).",
    "Start by explaining standard binary search, then describe the modification for rotation.",
    "Emphasize the key insight: at least one half is always sorted.",
    "Walk through the decision tree: which half is sorted → is target in that half → narrow accordingly.",
    "Mention edge case: array not rotated at all (already sorted) — the algorithm handles it correctly since the left half will always be 'sorted'.",
    "Time complexity: O(log n) — same as standard binary search despite the rotation.",
  ],

  relatedProblems: ["find-min-rotated-array", "binary-search", "search-2d-matrix"],
};
