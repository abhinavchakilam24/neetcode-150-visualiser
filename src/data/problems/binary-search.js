export const binarySearch = {
  id: 28,
  slug: "binary-search",
  title: "Binary Search",
  difficulty: "Easy",
  topic: "binary-search",
  topicLabel: "Binary Search",
  neetcodeNumber: 28,
  artifactType: "BinarySearch",
  companies: ["Google", "Microsoft", "Amazon"],
  leetcodeLink: "https://leetcode.com/problems/binary-search/",

  pattern: "Divide and Conquer via Midpoint Elimination",
  patternExplanation: `When searching a sorted array, compare the middle element to the target.
    Each comparison eliminates half the remaining elements, giving O(log n) time.`,

  intuition: {
    coreInsight: `A sorted array is a goldmine of information — every single comparison tells you
      which HALF the target must live in. By checking the middle element, you either find the
      target or eliminate 50% of the search space in one step. After k comparisons, only n/2^k
      elements remain. To shrink n elements to 1, you need log₂(n) comparisons. For n=1,000,000
      that's just 20 steps instead of 1,000,000.`,

    mentalModel: `Think of the dictionary game: someone picks a word, and you open the dictionary
      to the middle. They say "later" or "earlier." You never flip page by page — you always
      jump to the middle of whatever section remains. Each "later/earlier" answer cuts your
      search space in half. Binary search does exactly this: the sorted order IS the alphabetical
      order, and nums[mid] vs target IS the "later or earlier" answer.`,

    whyNaiveFails: `Linear scan checks every element one by one — O(n). For n=10^6, that's a
      million comparisons. But we're ignoring the most powerful property we have: the array is
      sorted! Every element to the left of any value is smaller, every element to the right is
      larger. Linear scan treats a sorted array the same as an unsorted one — pure waste.`,

    keyObservation: `The loop invariant is everything: the target, if it exists, is ALWAYS within
      [lo, hi]. Every iteration either finds the target at mid, or shrinks [lo, hi] by moving
      lo or hi past mid. When lo > hi, the interval is empty — the target doesn't exist. Getting
      the boundary updates right (lo = mid + 1, hi = mid - 1, NOT lo = mid or hi = mid) is what
      prevents infinite loops.`,
  },

  problem: `Given an array of integers nums which is sorted in ascending order, and an integer
    target, write a function to search target in nums. If target exists, return its index.
    Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.`,

  examples: [
    { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4" },
    { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1" },
  ],

  constraints: [
    "1 <= nums.length <= 10^4",
    "All integers in nums are unique.",
    "nums is sorted in ascending order.",
    "-10^4 < nums[i], target < 10^4",
  ],

  approaches: {
    brute: {
      label: "Linear Scan",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "Scan every element left to right. Return the index if found, -1 if not.",

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
        2: "Scan every element from left to right",
        3: "Check if current element equals target",
        4: "Found — return index",
        7: "Not found after scanning all elements",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "i=0: -1 ≠ 9",
              explanation: "Start scanning. i=0, nums[0]=-1. Not equal to target 9. Move on.",
              variables: { i: 0, "nums[i]": -1, target: 9 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [2, 3],
              shortLabel: "i=1: 0 ≠ 9",
              explanation: "i=1, nums[1]=0. Not equal to 9. Continue.",
              variables: { i: 1, "nums[i]": 0, target: 9 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [2, 3],
              shortLabel: "i=2: 3 ≠ 9",
              explanation: "i=2, nums[2]=3. Not equal to 9. Continue.",
              variables: { i: 2, "nums[i]": 3, target: 9 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [2, 3],
              shortLabel: "i=3: 5 ≠ 9",
              explanation: "i=3, nums[3]=5. Not equal to 9. Continue.",
              variables: { i: 3, "nums[i]": 5, target: 9 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 4],
              shortLabel: "i=4: 9 = 9 ✓",
              explanation: "i=4, nums[4]=9. Found the target! Return index 4. Linear scan took 5 comparisons — binary search would take just 3.",
              variables: { i: 4, "nums[i]": 9, target: 9, answer: "4" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "found", 5: "default" },
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
          const found = nums[i] === target;
          steps.push({
            stepId: steps.length,
            lineNumbers: found ? [3, 4] : [2, 3],
            shortLabel: found ? `i=${i}: ${nums[i]} = ${target} ✓` : `i=${i}: ${nums[i]} ≠ ${target}`,
            explanation: found
              ? `i=${i}, nums[${i}]=${nums[i]}. Found the target! Return index ${i}.`
              : `i=${i}, nums[${i}]=${nums[i]}. Not equal to target ${target}. Move on.`,
            variables: found
              ? { i, "nums[i]": nums[i], target, answer: String(i) }
              : { i, "nums[i]": nums[i], target },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? (found ? "found" : "active") : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
            },
            delta: { changedIndices: [i] },
            isAnswer: found,
          });
          if (found) return steps;
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [7],
          shortLabel: "Not found → return -1",
          explanation: `Scanned all ${nums.length} elements. Target ${target} not found. Return -1.`,
          variables: { target, answer: "-1" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, j) => [j, "visited"])),
            pointers: [],
          },
          delta: {},
          isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Binary Search",
      tier: "optimal",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      idea: `Maintain two pointers lo and hi defining the search range. Compute mid = lo + (hi - lo) / 2.
        If nums[mid] == target, return mid. If nums[mid] < target, search right half (lo = mid + 1).
        If nums[mid] > target, search left half (hi = mid - 1). If lo > hi, target doesn't exist.`,

      javaCode: `public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;

        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return -1;
}`,

      cppCode: `int search(vector<int>& nums, int target) {
    int lo = 0, hi = nums.size() - 1;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;

        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return -1;
}`,

      pythonCode: `def search(nums: List[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1

    while lo <= hi:
        mid = lo + (hi - lo) // 2

        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return -1`,

      lineAnnotations: {
        2:  "Initialize search range to entire array",
        4:  "Loop while search range is non-empty",
        5:  "Compute midpoint — avoids integer overflow vs (lo+hi)/2",
        7:  "Target found at mid — return immediately",
        8:  "Return the index",
        9:  "Target is larger — eliminate left half",
        10: "Move lo past mid to search right half only",
        11: "Target is smaller — eliminate right half",
        12: "Move hi before mid to search left half only",
        16: "Search range empty — target not in array",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Target found after two halvings",
          input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init lo=0, hi=5",
              explanation: "Initialize the search range to the entire array: lo=0, hi=5. The target 9 must be somewhere in nums[0..5] if it exists at all.",
              variables: { lo: 0, hi: 5, target: 9 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: null,
                bsRight: 5,
                bsCondition: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "mid=2, nums[2]=3",
              explanation: "lo=0, hi=5. Compute mid = 0 + (5-0)/2 = 2. nums[2]=3. We'll compare 3 against target 9.",
              variables: { lo: 0, hi: 5, mid: 2, "nums[mid]": 3, target: 9 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 2, color: "active" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 2,
                bsRight: 5,
                bsCondition: "nums[2]=3 < target=9",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10],
              shortLabel: "3 < 9 → search right, lo=3",
              explanation: "nums[2]=3 < target=9. The target must be in the RIGHT half. Set lo = mid + 1 = 3. We just eliminated indices 0, 1, 2 — half the array gone in one comparison!",
              variables: { lo: 3, hi: 5, mid: 2, "nums[mid]": 3, target: 9 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "default", 5: "default" },
                pointers: [
                  { name: "lo", index: 3, color: "pointer" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 3,
                bsMid: 2,
                bsRight: 5,
                bsCondition: "nums[2]=3 < target=9 → search right",
              },
              delta: { changedIndices: [0, 1, 2], movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5],
              shortLabel: "mid=4, nums[4]=9",
              explanation: "lo=3, hi=5. Compute mid = 3 + (5-3)/2 = 4. nums[4]=9. Compare against target 9.",
              variables: { lo: 3, hi: 5, mid: 4, "nums[mid]": 9, target: 9 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "active", 5: "default" },
                pointers: [
                  { name: "lo", index: 3, color: "pointer" },
                  { name: "mid", index: 4, color: "active" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 3,
                bsMid: 4,
                bsRight: 5,
                bsCondition: "nums[4]=9 == target=9",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8],
              shortLabel: "9 == 9 → Found! Return 4",
              explanation: "nums[4]=9 == target=9. Found the target at index 4! Return 4. Binary search found it in just 2 comparisons — linear scan would have needed 5.",
              variables: { lo: 3, hi: 5, mid: 4, "nums[mid]": 9, target: 9, answer: "4" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "found", 5: "default" },
                pointers: [
                  { name: "mid", index: 4, color: "active" },
                ],
                bsLeft: 3,
                bsMid: 4,
                bsRight: 5,
                bsCondition: "nums[4]=9 == target=9 → FOUND",
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Not Found",
          description: "Target 2 does not exist — search range collapses to empty",
          input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 },
          expectedOutput: "-1",
          commonMistake: "Forgetting to return -1 when lo > hi. Or using lo < hi instead of lo <= hi as the loop condition — this misses the case where lo == hi and that single element could be the target.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init lo=0, hi=5",
              explanation: "Initialize search range: lo=0, hi=5. We're looking for target=2 which would sit between indices 1 and 2 (between 0 and 3).",
              variables: { lo: 0, hi: 5, target: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: null,
                bsRight: 5,
                bsCondition: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "mid=2, nums[2]=3",
              explanation: "lo=0, hi=5. mid = 0 + (5-0)/2 = 2. nums[2]=3. Compare 3 against target 2.",
              variables: { lo: 0, hi: 5, mid: 2, "nums[mid]": 3, target: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 2, color: "active" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 2,
                bsRight: 5,
                bsCondition: "nums[2]=3 > target=2",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "3 > 2 → search left, hi=1",
              explanation: "nums[2]=3 > target=2. Target must be in the LEFT half. Set hi = mid - 1 = 1. Indices 2, 3, 4, 5 are eliminated.",
              variables: { lo: 0, hi: 1, mid: 2, "nums[mid]": 3, target: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 1, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 2,
                bsRight: 1,
                bsCondition: "nums[2]=3 > target=2 → search left",
              },
              delta: { changedIndices: [2, 3, 4, 5], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5],
              shortLabel: "mid=0, nums[0]=-1",
              explanation: "lo=0, hi=1. mid = 0 + (1-0)/2 = 0. nums[0]=-1. Compare -1 against target 2.",
              variables: { lo: 0, hi: 1, mid: 0, "nums[mid]": -1, target: 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 0, color: "active" },
                  { name: "hi", index: 1, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 0,
                bsRight: 1,
                bsCondition: "nums[0]=-1 < target=2",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10],
              shortLabel: "-1 < 2 → search right, lo=1",
              explanation: "nums[0]=-1 < target=2. Search right half. Set lo = mid + 1 = 1. Now lo=1, hi=1 — only one element left.",
              variables: { lo: 1, hi: 1, mid: 0, "nums[mid]": -1, target: 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "default", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated" },
                pointers: [
                  { name: "lo", index: 1, color: "pointer" },
                  { name: "hi", index: 1, color: "pointer" },
                ],
                bsLeft: 1,
                bsMid: 0,
                bsRight: 1,
                bsCondition: "nums[0]=-1 < target=2 → search right",
              },
              delta: { changedIndices: [0], movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5],
              shortLabel: "mid=1, nums[1]=0",
              explanation: "lo=1, hi=1. mid = 1 + (1-1)/2 = 1. nums[1]=0. Compare 0 against target 2. This is our last chance.",
              variables: { lo: 1, hi: 1, mid: 1, "nums[mid]": 0, target: 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated" },
                pointers: [
                  { name: "lo", index: 1, color: "pointer" },
                  { name: "mid", index: 1, color: "active" },
                  { name: "hi", index: 1, color: "pointer" },
                ],
                bsLeft: 1,
                bsMid: 1,
                bsRight: 1,
                bsCondition: "nums[1]=0 < target=2",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9, 10],
              shortLabel: "0 < 2 → lo=2, lo > hi",
              explanation: "nums[1]=0 < target=2. Set lo = mid + 1 = 2. Now lo=2 > hi=1. The search range is empty — there's nowhere left to look.",
              variables: { lo: 2, hi: 1, mid: 1, "nums[mid]": 0, target: 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated" },
                pointers: [],
                bsLeft: 2,
                bsMid: 1,
                bsRight: 1,
                bsCondition: "lo=2 > hi=1 → range empty",
              },
              delta: { changedIndices: [1], movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [16],
              shortLabel: "Return -1",
              explanation: "Loop exits because lo > hi. The search range collapsed without finding target 2. It would sit between nums[1]=0 and nums[2]=3, but it doesn't exist in the array. Return -1.",
              variables: { lo: 2, hi: 1, target: 2, answer: "-1" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated" },
                pointers: [],
                bsLeft: 2,
                bsMid: null,
                bsRight: 1,
                bsCondition: "Target 2 not found in array",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, target }) {
        const steps = [];
        const n = nums.length;
        let lo = 0, hi = n - 1;

        // Helper to build arrayStates with eliminated tracking
        const eliminated = new Set();

        steps.push({
          stepId: 0,
          lineNumbers: [2],
          shortLabel: `Init lo=0, hi=${hi}`,
          explanation: `Initialize search range: lo=0, hi=${hi}. Looking for target=${target}.`,
          variables: { lo: 0, hi, target },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [
              { name: "lo", index: 0, color: "pointer" },
              { name: "hi", index: hi, color: "pointer" },
            ],
            bsLeft: 0,
            bsMid: null,
            bsRight: hi,
            bsCondition: null,
          },
          delta: {},
          isAnswer: false,
        });

        while (lo <= hi) {
          const mid = lo + Math.floor((hi - lo) / 2);
          const midVal = nums[mid];

          const buildArrayStates = (activeIdx) => {
            const states = {};
            for (let i = 0; i < n; i++) {
              if (eliminated.has(i)) states[i] = "eliminated";
              else if (i === activeIdx) states[i] = "active";
              else states[i] = "default";
            }
            return states;
          };

          // Step: compute mid
          steps.push({
            stepId: steps.length,
            lineNumbers: [4, 5],
            shortLabel: `mid=${mid}, nums[${mid}]=${midVal}`,
            explanation: `lo=${lo}, hi=${hi}. mid = ${lo} + (${hi}-${lo})/2 = ${mid}. nums[${mid}]=${midVal}. Compare against target ${target}.`,
            variables: { lo, hi, mid, "nums[mid]": midVal, target },
            dataStructure: {
              arrayStates: buildArrayStates(mid),
              pointers: [
                { name: "lo", index: lo, color: "pointer" },
                { name: "mid", index: mid, color: "active" },
                { name: "hi", index: hi, color: "pointer" },
              ],
              bsLeft: lo,
              bsMid: mid,
              bsRight: hi,
              bsCondition: midVal === target
                ? `nums[${mid}]=${midVal} == target=${target}`
                : midVal < target
                  ? `nums[${mid}]=${midVal} < target=${target}`
                  : `nums[${mid}]=${midVal} > target=${target}`,
            },
            delta: { changedIndices: [mid] },
            isAnswer: false,
          });

          if (midVal === target) {
            // Found
            const foundStates = {};
            for (let i = 0; i < n; i++) {
              foundStates[i] = eliminated.has(i) ? "eliminated" : i === mid ? "found" : "default";
            }
            steps.push({
              stepId: steps.length,
              lineNumbers: [7, 8],
              shortLabel: `${midVal} == ${target} → Found! Return ${mid}`,
              explanation: `nums[${mid}]=${midVal} == target=${target}. Found the target at index ${mid}! Return ${mid}.`,
              variables: { lo, hi, mid, "nums[mid]": midVal, target, answer: String(mid) },
              dataStructure: {
                arrayStates: foundStates,
                pointers: [{ name: "mid", index: mid, color: "active" }],
                bsLeft: lo,
                bsMid: mid,
                bsRight: hi,
                bsCondition: `nums[${mid}]=${midVal} == target=${target} → FOUND`,
              },
              delta: { changedIndices: [mid] },
              isAnswer: true,
            });
            return steps;
          } else if (midVal < target) {
            // Eliminate left half
            for (let k = lo; k <= mid; k++) eliminated.add(k);
            const oldLo = lo;
            lo = mid + 1;
            steps.push({
              stepId: steps.length,
              lineNumbers: [9, 10],
              shortLabel: `${midVal} < ${target} → lo=${lo}`,
              explanation: `nums[${mid}]=${midVal} < target=${target}. Target is in the right half. Set lo = mid + 1 = ${lo}. Eliminated indices ${oldLo} through ${mid}.`,
              variables: { lo, hi, mid, "nums[mid]": midVal, target },
              dataStructure: {
                arrayStates: (() => {
                  const s = {};
                  for (let i = 0; i < n; i++) s[i] = eliminated.has(i) ? "eliminated" : "default";
                  return s;
                })(),
                pointers: lo <= hi ? [
                  { name: "lo", index: lo, color: "pointer" },
                  { name: "hi", index: hi, color: "pointer" },
                ] : [],
                bsLeft: lo,
                bsMid: mid,
                bsRight: hi,
                bsCondition: `nums[${mid}]=${midVal} < target=${target} → search right`,
              },
              delta: { changedIndices: Array.from({ length: mid - oldLo + 1 }, (_, i) => oldLo + i), movedPointers: ["lo"] },
              isAnswer: false,
            });
          } else {
            // Eliminate right half
            for (let k = mid; k <= hi; k++) eliminated.add(k);
            const oldHi = hi;
            hi = mid - 1;
            steps.push({
              stepId: steps.length,
              lineNumbers: [11, 12],
              shortLabel: `${midVal} > ${target} → hi=${hi}`,
              explanation: `nums[${mid}]=${midVal} > target=${target}. Target is in the left half. Set hi = mid - 1 = ${hi}. Eliminated indices ${mid} through ${oldHi}.`,
              variables: { lo, hi, mid, "nums[mid]": midVal, target },
              dataStructure: {
                arrayStates: (() => {
                  const s = {};
                  for (let i = 0; i < n; i++) s[i] = eliminated.has(i) ? "eliminated" : "default";
                  return s;
                })(),
                pointers: lo <= hi ? [
                  { name: "lo", index: lo, color: "pointer" },
                  { name: "hi", index: hi, color: "pointer" },
                ] : [],
                bsLeft: lo,
                bsMid: mid,
                bsRight: hi,
                bsCondition: `nums[${mid}]=${midVal} > target=${target} → search left`,
              },
              delta: { changedIndices: Array.from({ length: oldHi - mid + 1 }, (_, i) => mid + i), movedPointers: ["hi"] },
              isAnswer: false,
            });
          }
        }

        // Not found
        steps.push({
          stepId: steps.length,
          lineNumbers: [16],
          shortLabel: "Return -1",
          explanation: `Loop exits because lo (${lo}) > hi (${hi}). Search range is empty — target ${target} does not exist in the array. Return -1.`,
          variables: { lo, hi, target, answer: "-1" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "eliminated"])),
            pointers: [],
            bsLeft: lo,
            bsMid: null,
            bsRight: hi,
            bsCondition: `Target ${target} not found in array`,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(1)", explanation: "Linear scan through every element" },
    optimal: { time: "O(log n)", space: "O(1)", explanation: "Each comparison halves the search space; log₂(n) halvings reduce n elements to 1", tradeoff: "No extra space needed — binary search is both time-optimal and space-optimal for sorted array search" },
  },

  interviewTips: [
    "Always clarify: 'Is the array sorted?' — binary search requires sorted input.",
    "Use mid = lo + (hi - lo) / 2 instead of (lo + hi) / 2 to prevent integer overflow.",
    "State the loop invariant: 'If the target exists, it is within [lo, hi].'",
    "Explain why lo = mid + 1 and hi = mid - 1 (not mid) — prevents infinite loops and ensures progress.",
    "Mention the while condition: lo <= hi (not lo < hi) — the single-element case lo == hi must be checked.",
    "Know the time complexity derivation: n → n/2 → n/4 → ... → 1 takes log₂(n) steps.",
    "Binary search is the foundation for many harder problems: rotated arrays, Koko's bananas, capacity scheduling.",
  ],

  relatedProblems: ["search-2d-matrix", "koko-eating-bananas", "find-min-rotated-array", "search-rotated-array"],
};
