export const findMinRotatedArray = {
  id: 31,
  slug: "find-min-rotated-array",
  title: "Find Minimum in Rotated Sorted Array",
  difficulty: "Medium",
  topic: "binary-search",
  topicLabel: "Binary Search",
  neetcodeNumber: 31,
  artifactType: "BinarySearch",
  companies: ["Meta", "Amazon", "Microsoft", "Bloomberg", "Google"],
  leetcodeLink: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",

  pattern: "Binary Search on Rotation Pivot",
  patternExplanation: `In a rotated sorted array, the minimum is the pivot point where the rotation
    happened. Compare mid to the rightmost element — if nums[mid] > nums[hi], the minimum is in the
    right half; otherwise it's in the left half (including mid).`,

  intuition: {
    coreInsight: `A rotated sorted array has one "break point" where a large value is followed by a
      small value. Everything before the break is sorted and large, everything after is sorted and
      small. The minimum is right after the break. By comparing nums[mid] to nums[hi], we can
      determine which half contains the break. If nums[mid] > nums[hi], the break is between mid
      and hi. Otherwise, the break is between lo and mid (or there's no break at all).`,

    mentalModel: `Picture a clock face where someone took a sorted number line and bent it into a
      circle, then cut it at some point. The smallest number is right at the cut. You're standing
      at the middle of the visible arc. If the number you see is bigger than the rightmost number,
      the cut must be to your right (values went up past the top and wrapped around). If your number
      is smaller, the cut is to your left or you're standing on it.`,

    whyNaiveFails: `Linear scan finds the minimum in O(n) by looking for where nums[i] < nums[i-1].
      But we're wasting the sorted structure. Even though the array isn't fully sorted, it's composed
      of two sorted halves. We can use binary search to find the boundary between them in O(log n).`,

    keyObservation: `Always compare nums[mid] to nums[hi] (not nums[lo]). Comparing to nums[lo]
      is ambiguous: if nums[mid] > nums[lo], both "no rotation" and "rotation past mid" are possible.
      But nums[mid] > nums[hi] unambiguously means the minimum is in (mid, hi]. And nums[mid] <= nums[hi]
      means the right portion is sorted, so the minimum is in [lo, mid].`,
  },

  problem: `Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
    Given the sorted rotated array nums of unique elements, return the minimum element of this array.
    You must write an algorithm that runs in O(log n) time.`,

  examples: [
    { input: "nums = [3,4,5,1,2]", output: "1", explanation: "The original array was [1,2,3,4,5] rotated 3 times" },
    { input: "nums = [4,5,6,7,0,1,2]", output: "0", explanation: "The original array was [0,1,2,4,5,6,7] rotated 4 times" },
    { input: "nums = [11,13,15,17]", output: "11", explanation: "Not rotated (or rotated n times) — minimum is the first element" },
  ],

  constraints: [
    "n == nums.length",
    "1 <= n <= 5000",
    "-5000 <= nums[i] <= 5000",
    "All values are unique.",
    "nums is sorted and rotated between 1 and n times.",
  ],

  approaches: {
    brute: {
      label: "Linear Scan",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "Scan the entire array and track the minimum value.",

      javaCode: `public int findMin(int[] nums) {
    int min = nums[0];
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] < min) {
            min = nums[i];
        }
    }
    return min;
}`,

      cppCode: `int findMin(vector<int>& nums) {
    int min = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] < min) {
            min = nums[i];
        }
    }
    return min;
}`,

      pythonCode: `def findMin(nums: List[int]) -> int:
    result = nums[0]
    for i in range(1, len(nums)):
        if nums[i] < result:
            result = nums[i]
    return result`,

      lineAnnotations: {
        2: "Start with first element as candidate minimum",
        3: "Scan remaining elements",
        4: "Update minimum if current element is smaller",
        5: "New minimum found",
        8: "Return the overall minimum",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [3, 4, 5, 1, 2] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "min = nums[0] = 3",
              explanation: "Initialize minimum to first element: min = 3.",
              variables: { min: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "min", index: 0, color: "found" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "i=1: 4 > 3, skip",
              explanation: "nums[1]=4 >= min=3. Not smaller. Continue.",
              variables: { i: 1, "nums[i]": 4, min: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "min", index: 0, color: "found" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4],
              shortLabel: "i=2: 5 > 3, skip",
              explanation: "nums[2]=5 >= min=3. Continue.",
              variables: { i: 2, "nums[i]": 5, min: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "min", index: 0, color: "found" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5],
              shortLabel: "i=3: 1 < 3, new min!",
              explanation: "nums[3]=1 < min=3. Found a smaller value! Update min = 1. This is the rotation point.",
              variables: { i: 3, "nums[i]": 1, min: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "found", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }, { name: "min", index: 3, color: "found" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 4, 8],
              shortLabel: "i=4: 2 > 1, Return 1",
              explanation: "nums[4]=2 >= min=1. Done scanning. Return min = 1.",
              variables: { i: 4, "nums[i]": 2, min: 1, answer: "1" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "found", 4: "visited" },
                pointers: [{ name: "min", index: 3, color: "found" }],
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        let min = nums[0];
        let minIdx = 0;
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `min = nums[0] = ${min}`,
          explanation: `Initialize minimum to first element: min = ${min}.`,
          variables: { min },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, i === 0 ? "active" : "default"])),
            pointers: [{ name: "min", index: 0, color: "found" }],
          },
          delta: { changedIndices: [0] }, isAnswer: false,
        });
        for (let i = 1; i < nums.length; i++) {
          const isSmaller = nums[i] < min;
          if (isSmaller) { min = nums[i]; minIdx = i; }
          const isLast = i === nums.length - 1;
          steps.push({
            stepId: steps.length, lineNumbers: isSmaller ? [3, 4, 5] : (isLast ? [3, 4, 8] : [3, 4]),
            shortLabel: isSmaller ? `i=${i}: ${nums[i]} < ${min + (nums[i] === min ? 0 : nums[i] - min)}, new min!` : `i=${i}: ${nums[i]} >= ${min}`,
            explanation: isSmaller
              ? `nums[${i}]=${nums[i]} < min. New minimum found!`
              : `nums[${i}]=${nums[i]} >= min=${min}. ${isLast ? `Done. Return min = ${min}.` : 'Continue.'}`,
            variables: { i, "nums[i]": nums[i], min, ...(isLast ? { answer: String(min) } : {}) },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j === minIdx ? "found" : j <= i ? (j === i ? "active" : "visited") : "default"])),
              pointers: [{ name: "min", index: minIdx, color: "found" }, ...(isLast ? [] : [{ name: "i", index: i, color: "pointer" }])],
            },
            delta: { changedIndices: [i] }, isAnswer: isLast,
          });
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Binary Search",
      tier: "optimal",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      idea: `Compare nums[mid] to nums[hi]. If nums[mid] > nums[hi], the minimum is in the right
        half (lo = mid + 1). Otherwise the minimum is in the left half including mid (hi = mid).
        When lo == hi, that's the minimum.`,

      javaCode: `public int findMin(int[] nums) {
    int lo = 0, hi = nums.length - 1;

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;

        if (nums[mid] > nums[hi]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }

    return nums[lo];
}`,

      cppCode: `int findMin(vector<int>& nums) {
    int lo = 0, hi = nums.size() - 1;

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;

        if (nums[mid] > nums[hi]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }

    return nums[lo];
}`,

      pythonCode: `def findMin(nums: List[int]) -> int:
    lo, hi = 0, len(nums) - 1

    while lo < hi:
        mid = lo + (hi - lo) // 2

        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid

    return nums[lo]`,

      lineAnnotations: {
        2:  "Initialize search range to entire array",
        4:  "Loop until range narrows to single element",
        5:  "Compute midpoint",
        7:  "If mid > hi, rotation break is in right half",
        8:  "Minimum is strictly after mid — discard left half",
        9:  "If mid <= hi, right half is sorted — minimum is at mid or left",
        10: "Keep mid as candidate, discard right portion",
        13: "lo == hi — this is the minimum element",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Rotated array [3,4,5,1,2] — pivot is at index 3",
          input: { nums: [3, 4, 5, 1, 2] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init lo=0, hi=4",
              explanation: "Search range: lo=0, hi=4. Array [3,4,5,1,2] is [1,2,3,4,5] rotated 3 positions. The minimum is somewhere in this range.",
              variables: { lo: 0, hi: 4, "nums[lo]": 3, "nums[hi]": 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 4, color: "pointer" },
                ],
                bsLeft: 0, bsMid: null, bsRight: 4, bsCondition: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "mid=2, nums[2]=5",
              explanation: "mid = 0 + (4-0)/2 = 2. nums[mid]=5. Compare nums[mid]=5 vs nums[hi]=nums[4]=2.",
              variables: { lo: 0, hi: 4, mid: 2, "nums[mid]": 5, "nums[hi]": 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default", 4: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 2, color: "active" },
                  { name: "hi", index: 4, color: "pointer" },
                ],
                bsLeft: 0, bsMid: 2, bsRight: 4, bsCondition: "nums[2]=5 > nums[4]=2",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8],
              shortLabel: "5 > 2 → lo=3, min in right half",
              explanation: "nums[mid]=5 > nums[hi]=2. The rotation break is between mid and hi. The minimum is in the right half. Set lo = mid + 1 = 3.",
              variables: { lo: 3, hi: 4, mid: 2, "nums[mid]": 5, "nums[hi]": 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "default" },
                pointers: [
                  { name: "lo", index: 3, color: "pointer" },
                  { name: "hi", index: 4, color: "pointer" },
                ],
                bsLeft: 3, bsMid: 2, bsRight: 4, bsCondition: "5 > 2 → minimum in right half",
              },
              delta: { changedIndices: [0, 1, 2], movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5],
              shortLabel: "mid=3, nums[3]=1",
              explanation: "lo=3, hi=4. mid = 3 + (4-3)/2 = 3. nums[mid]=1. Compare nums[mid]=1 vs nums[hi]=nums[4]=2.",
              variables: { lo: 3, hi: 4, mid: 3, "nums[mid]": 1, "nums[hi]": 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "active", 4: "default" },
                pointers: [
                  { name: "lo", index: 3, color: "pointer" },
                  { name: "mid", index: 3, color: "active" },
                  { name: "hi", index: 4, color: "pointer" },
                ],
                bsLeft: 3, bsMid: 3, bsRight: 4, bsCondition: "nums[3]=1 <= nums[4]=2",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10],
              shortLabel: "1 <= 2 → hi=3, lo == hi",
              explanation: "nums[mid]=1 <= nums[hi]=2. Right portion is sorted, so minimum is at mid or to its left. Set hi = mid = 3. Now lo=3 == hi=3.",
              variables: { lo: 3, hi: 3, mid: 3, "nums[mid]": 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "eliminated" },
                pointers: [{ name: "lo=hi", index: 3, color: "active" }],
                bsLeft: 3, bsMid: 3, bsRight: 3, bsCondition: "lo == hi == 3",
              },
              delta: { changedIndices: [4], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13],
              shortLabel: "Return nums[3] = 1",
              explanation: "lo == hi == 3. The minimum element is nums[3] = 1. Found in just 2 comparisons instead of scanning all 5 elements!",
              variables: { lo: 3, hi: 3, "nums[lo]": 1, answer: "1" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "eliminated" },
                pointers: [{ name: "min", index: 3, color: "active" }],
                bsLeft: 3, bsMid: 3, bsRight: 3, bsCondition: "Minimum = nums[3] = 1",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Rotation",
          description: "Array is already sorted — minimum is at index 0",
          input: { nums: [1, 2, 3, 4, 5] },
          expectedOutput: "1",
          commonMistake: "If you compare to nums[lo] instead of nums[hi], a non-rotated array becomes ambiguous. With nums[mid] > nums[lo], you can't tell if the minimum is left or right. Comparing to nums[hi] avoids this.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init lo=0, hi=4",
              explanation: "lo=0, hi=4. Array [1,2,3,4,5] — already sorted, not rotated. The minimum should be at index 0.",
              variables: { lo: 0, hi: 4, "nums[lo]": 1, "nums[hi]": 5 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "hi", index: 4, color: "pointer" }],
                bsLeft: 0, bsMid: null, bsRight: 4, bsCondition: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "mid=2, nums[2]=3",
              explanation: "mid=2. nums[2]=3. Compare 3 vs nums[4]=5.",
              variables: { lo: 0, hi: 4, mid: 2, "nums[mid]": 3, "nums[hi]": 5 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "mid", index: 2, color: "active" }, { name: "hi", index: 4, color: "pointer" }],
                bsLeft: 0, bsMid: 2, bsRight: 4, bsCondition: "nums[2]=3 <= nums[4]=5",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10],
              shortLabel: "3 <= 5 → hi=2",
              explanation: "nums[mid]=3 <= nums[hi]=5. Right half is sorted — minimum can't be there. Set hi = mid = 2.",
              variables: { lo: 0, hi: 2, mid: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "eliminated", 4: "eliminated" },
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "hi", index: 2, color: "pointer" }],
                bsLeft: 0, bsMid: 2, bsRight: 2, bsCondition: "3 <= 5 → search left",
              },
              delta: { changedIndices: [3, 4], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5],
              shortLabel: "mid=1, nums[1]=2",
              explanation: "mid=1. nums[1]=2. Compare 2 vs nums[2]=3.",
              variables: { lo: 0, hi: 2, mid: 1, "nums[mid]": 2, "nums[hi]": 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "default", 3: "eliminated", 4: "eliminated" },
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "mid", index: 1, color: "active" }, { name: "hi", index: 2, color: "pointer" }],
                bsLeft: 0, bsMid: 1, bsRight: 2, bsCondition: "nums[1]=2 <= nums[2]=3",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10],
              shortLabel: "2 <= 3 → hi=1",
              explanation: "nums[mid]=2 <= nums[hi]=3. Set hi = 1.",
              variables: { lo: 0, hi: 1, mid: 1 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "eliminated", 3: "eliminated", 4: "eliminated" },
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "hi", index: 1, color: "pointer" }],
                bsLeft: 0, bsMid: 1, bsRight: 1, bsCondition: "2 <= 3 → search left",
              },
              delta: { changedIndices: [2], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5],
              shortLabel: "mid=0, nums[0]=1",
              explanation: "mid=0. nums[0]=1. Compare 1 vs nums[1]=2.",
              variables: { lo: 0, hi: 1, mid: 0, "nums[mid]": 1, "nums[hi]": 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "eliminated", 3: "eliminated", 4: "eliminated" },
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "mid", index: 0, color: "active" }, { name: "hi", index: 1, color: "pointer" }],
                bsLeft: 0, bsMid: 0, bsRight: 1, bsCondition: "nums[0]=1 <= nums[1]=2",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9, 10],
              shortLabel: "1 <= 2 → hi=0, lo == hi",
              explanation: "nums[mid]=1 <= nums[hi]=2. Set hi = 0. Now lo=0 == hi=0.",
              variables: { lo: 0, hi: 0 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated" },
                pointers: [{ name: "lo=hi", index: 0, color: "active" }],
                bsLeft: 0, bsMid: 0, bsRight: 0, bsCondition: "lo == hi == 0",
              },
              delta: { changedIndices: [1], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [13],
              shortLabel: "Return nums[0] = 1",
              explanation: "lo == hi == 0. Minimum is nums[0] = 1. Correctly found the minimum of a non-rotated array.",
              variables: { lo: 0, hi: 0, "nums[lo]": 1, answer: "1" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated" },
                pointers: [{ name: "min", index: 0, color: "active" }],
                bsLeft: 0, bsMid: 0, bsRight: 0, bsCondition: "Minimum = nums[0] = 1",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Rotated Large",
          description: "7-element array rotated 4 times — minimum at index 4",
          input: { nums: [4, 5, 6, 7, 0, 1, 2] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init lo=0, hi=6",
              explanation: "lo=0, hi=6. Array [4,5,6,7,0,1,2] — rotated 4 positions. Minimum 0 is at index 4.",
              variables: { lo: 0, hi: 6, "nums[lo]": 4, "nums[hi]": 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "hi", index: 6, color: "pointer" }],
                bsLeft: 0, bsMid: null, bsRight: 6, bsCondition: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "mid=3, nums[3]=7",
              explanation: "mid=3. nums[3]=7. Compare 7 vs nums[6]=2.",
              variables: { lo: 0, hi: 6, mid: 3, "nums[mid]": 7, "nums[hi]": 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "active", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "mid", index: 3, color: "active" }, { name: "hi", index: 6, color: "pointer" }],
                bsLeft: 0, bsMid: 3, bsRight: 6, bsCondition: "nums[3]=7 > nums[6]=2",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8],
              shortLabel: "7 > 2 → lo=4",
              explanation: "7 > 2. Rotation break is in right half. Set lo = mid + 1 = 4.",
              variables: { lo: 4, hi: 6, mid: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "default", 5: "default", 6: "default" },
                pointers: [{ name: "lo", index: 4, color: "pointer" }, { name: "hi", index: 6, color: "pointer" }],
                bsLeft: 4, bsMid: 3, bsRight: 6, bsCondition: "7 > 2 → min in right half",
              },
              delta: { changedIndices: [0, 1, 2, 3], movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5],
              shortLabel: "mid=5, nums[5]=1",
              explanation: "mid=5. nums[5]=1. Compare 1 vs nums[6]=2.",
              variables: { lo: 4, hi: 6, mid: 5, "nums[mid]": 1, "nums[hi]": 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "default", 5: "active", 6: "default" },
                pointers: [{ name: "lo", index: 4, color: "pointer" }, { name: "mid", index: 5, color: "active" }, { name: "hi", index: 6, color: "pointer" }],
                bsLeft: 4, bsMid: 5, bsRight: 6, bsCondition: "nums[5]=1 <= nums[6]=2",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10],
              shortLabel: "1 <= 2 → hi=5",
              explanation: "1 <= 2. Right sorted. Set hi = mid = 5.",
              variables: { lo: 4, hi: 5, mid: 5 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "default", 5: "default", 6: "eliminated" },
                pointers: [{ name: "lo", index: 4, color: "pointer" }, { name: "hi", index: 5, color: "pointer" }],
                bsLeft: 4, bsMid: 5, bsRight: 5, bsCondition: "1 <= 2 → search left",
              },
              delta: { changedIndices: [6], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5],
              shortLabel: "mid=4, nums[4]=0",
              explanation: "mid=4. nums[4]=0. Compare 0 vs nums[5]=1.",
              variables: { lo: 4, hi: 5, mid: 4, "nums[mid]": 0, "nums[hi]": 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "active", 5: "default", 6: "eliminated" },
                pointers: [{ name: "lo", index: 4, color: "pointer" }, { name: "mid", index: 4, color: "active" }, { name: "hi", index: 5, color: "pointer" }],
                bsLeft: 4, bsMid: 4, bsRight: 5, bsCondition: "nums[4]=0 <= nums[5]=1",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9, 10],
              shortLabel: "0 <= 1 → hi=4, lo == hi",
              explanation: "0 <= 1. Set hi = 4. lo=4 == hi=4.",
              variables: { lo: 4, hi: 4 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "found", 5: "eliminated", 6: "eliminated" },
                pointers: [{ name: "lo=hi", index: 4, color: "active" }],
                bsLeft: 4, bsMid: 4, bsRight: 4, bsCondition: "lo == hi == 4",
              },
              delta: { changedIndices: [5], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [13],
              shortLabel: "Return nums[4] = 0",
              explanation: "lo == hi == 4. Minimum is nums[4] = 0. Found the rotation pivot in O(log n)!",
              variables: { lo: 4, hi: 4, "nums[lo]": 0, answer: "0" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "found", 5: "eliminated", 6: "eliminated" },
                pointers: [{ name: "min", index: 4, color: "active" }],
                bsLeft: 4, bsMid: 4, bsRight: 4, bsCondition: "Minimum = nums[4] = 0",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        let lo = 0, hi = n - 1;
        const eliminated = new Set();

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `Init lo=0, hi=${hi}`,
          explanation: `Search range: lo=0, hi=${hi}. Looking for the minimum in rotated array.`,
          variables: { lo: 0, hi, "nums[lo]": nums[0], "nums[hi]": nums[hi] },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "hi", index: hi, color: "pointer" }],
            bsLeft: 0, bsMid: null, bsRight: hi, bsCondition: null,
          },
          delta: {}, isAnswer: false,
        });

        while (lo < hi) {
          const mid = lo + Math.floor((hi - lo) / 2);
          const buildStates = (activeIdx) => {
            const s = {};
            for (let i = 0; i < n; i++) s[i] = eliminated.has(i) ? "eliminated" : i === activeIdx ? "active" : "default";
            return s;
          };

          steps.push({
            stepId: steps.length, lineNumbers: [4, 5],
            shortLabel: `mid=${mid}, nums[${mid}]=${nums[mid]}`,
            explanation: `mid=${mid}. nums[${mid}]=${nums[mid]}. Compare vs nums[${hi}]=${nums[hi]}.`,
            variables: { lo, hi, mid, "nums[mid]": nums[mid], "nums[hi]": nums[hi] },
            dataStructure: {
              arrayStates: buildStates(mid),
              pointers: [{ name: "lo", index: lo, color: "pointer" }, { name: "mid", index: mid, color: "active" }, { name: "hi", index: hi, color: "pointer" }],
              bsLeft: lo, bsMid: mid, bsRight: hi, bsCondition: nums[mid] > nums[hi] ? `nums[${mid}]=${nums[mid]} > nums[${hi}]=${nums[hi]}` : `nums[${mid}]=${nums[mid]} <= nums[${hi}]=${nums[hi]}`,
            },
            delta: { changedIndices: [mid] }, isAnswer: false,
          });

          if (nums[mid] > nums[hi]) {
            for (let k = lo; k <= mid; k++) eliminated.add(k);
            lo = mid + 1;
            steps.push({
              stepId: steps.length, lineNumbers: [7, 8],
              shortLabel: `${nums[mid]} > ${nums[hi]} → lo=${lo}`,
              explanation: `Rotation break in right half. lo = ${lo}.`,
              variables: { lo, hi },
              dataStructure: {
                arrayStates: (() => { const s = {}; for (let i = 0; i < n; i++) s[i] = eliminated.has(i) ? "eliminated" : "default"; return s; })(),
                pointers: lo < hi ? [{ name: "lo", index: lo, color: "pointer" }, { name: "hi", index: hi, color: "pointer" }] : [{ name: "lo=hi", index: lo, color: "active" }],
                bsLeft: lo, bsMid: mid, bsRight: hi, bsCondition: `min in right half`,
              },
              delta: { movedPointers: ["lo"] }, isAnswer: false,
            });
          } else {
            for (let k = mid + 1; k <= hi; k++) eliminated.add(k);
            hi = mid;
            steps.push({
              stepId: steps.length, lineNumbers: [9, 10],
              shortLabel: `${nums[mid]} <= ${nums[hi+1] || '?'} → hi=${hi}`,
              explanation: `Right half sorted. hi = ${hi}.`,
              variables: { lo, hi },
              dataStructure: {
                arrayStates: (() => { const s = {}; for (let i = 0; i < n; i++) s[i] = eliminated.has(i) ? "eliminated" : i === hi ? "default" : (i >= lo && i <= hi ? "default" : (eliminated.has(i) ? "eliminated" : "default")); return s; })(),
                pointers: lo < hi ? [{ name: "lo", index: lo, color: "pointer" }, { name: "hi", index: hi, color: "pointer" }] : [{ name: "lo=hi", index: lo, color: "active" }],
                bsLeft: lo, bsMid: mid, bsRight: hi, bsCondition: lo === hi ? `lo == hi == ${lo}` : `search left`,
              },
              delta: { movedPointers: ["hi"] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: `Return nums[${lo}] = ${nums[lo]}`,
          explanation: `lo == hi == ${lo}. Minimum is nums[${lo}] = ${nums[lo]}.`,
          variables: { lo, hi, "nums[lo]": nums[lo], answer: String(nums[lo]) },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, i === lo ? "found" : "eliminated"])),
            pointers: [{ name: "min", index: lo, color: "active" }],
            bsLeft: lo, bsMid: lo, bsRight: lo, bsCondition: `Minimum = nums[${lo}] = ${nums[lo]}`,
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(1)", explanation: "Linear scan through all elements" },
    optimal: { time: "O(log n)", space: "O(1)", explanation: "Each comparison eliminates half the search space; the pivot is found in log n steps", tradeoff: "No extra space needed — pure binary search exploiting the rotated-sorted structure" },
  },

  interviewTips: [
    "Immediately state: 'A rotated sorted array has two sorted halves — I can binary search for the boundary.'",
    "Compare nums[mid] to nums[hi], NOT nums[lo]. Explain why: comparing to lo is ambiguous for non-rotated arrays.",
    "Use lo < hi (not <=) because we converge to a single element.",
    "Explain: hi = mid (not mid-1) because mid itself could be the minimum.",
    "Ask: 'Are there duplicates?' — duplicates change this from O(log n) to O(n) worst case.",
    "This is the foundation for 'Search in Rotated Sorted Array' — find the pivot first, then binary search the correct half.",
  ],

  relatedProblems: ["binary-search", "search-rotated-array", "search-2d-matrix"],
};
