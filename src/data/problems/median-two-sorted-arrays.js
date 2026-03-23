export const medianTwoSortedArrays = {
  id: 34,
  slug: "median-two-sorted-arrays",
  title: "Median of Two Sorted Arrays",
  difficulty: "Hard",
  topic: "binary-search",
  topicLabel: "Binary Search",
  neetcodeNumber: 34,
  artifactType: "BinarySearch",
  companies: ["Google", "Amazon", "Apple", "Meta", "Goldman Sachs"],
  leetcodeLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/",

  pattern: "Binary Search on Partition Position",
  patternExplanation: `Instead of merging the arrays, binary search for the correct partition point
    in the smaller array. The partition divides both arrays such that all left elements <= all right elements.`,

  intuition: {
    coreInsight: `The median splits the combined sorted array into two equal halves. We don't need
      to actually merge — we just need to find where to "cut" each array so that everything on the
      left of both cuts is <= everything on the right of both cuts. Binary search on the smaller
      array's cut position gives us O(log(min(m,n))).`,

    mentalModel: `Imagine two sorted decks of cards laid out side by side. You need to draw a
      vertical line through both decks simultaneously so that exactly half the total cards are on
      the left. Instead of merging and counting, you slide the cut position in the smaller deck
      and compute where the cut must fall in the larger deck (since total left count is fixed).
      You binary search for the position where the boundary cards are in order.`,

    whyNaiveFails: `Merging both arrays takes O(m+n) time and space. The problem specifically asks
      for O(log(m+n)). Even the "merge until halfway" approach is O(m+n) in the worst case. Only
      binary search on the partition achieves the required logarithmic complexity.`,

    keyObservation: `If we take i elements from nums1 and j elements from nums2 where i+j = (m+n+1)/2,
      then we need: nums1[i-1] <= nums2[j] AND nums2[j-1] <= nums1[i]. If nums1[i-1] > nums2[j],
      we took too many from nums1 — move left. If nums2[j-1] > nums1[i], we took too few — move right.`,
  },

  problem: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the
    median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).`,

  examples: [
    { input: "nums1 = [1,3], nums2 = [2]", output: "2.0", explanation: "Merged = [1,2,3], median = 2.0" },
    { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5", explanation: "Merged = [1,2,3,4], median = (2+3)/2 = 2.5" },
  ],

  constraints: [
    "nums1.length == m, nums2.length == n",
    "0 <= m <= 1000, 0 <= n <= 1000",
    "1 <= m + n <= 2000",
    "-10^6 <= nums1[i], nums2[i] <= 10^6",
  ],

  approaches: {
    brute: {
      label: "Merge and Find Median",
      tier: "brute",
      timeComplexity: "O(m + n)",
      spaceComplexity: "O(m + n)",
      idea: "Merge both sorted arrays into one, then return the middle element(s).",

      javaCode: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    int[] merged = new int[nums1.length + nums2.length];
    int i = 0, j = 0, k = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) merged[k++] = nums1[i++];
        else merged[k++] = nums2[j++];
    }
    while (i < nums1.length) merged[k++] = nums1[i++];
    while (j < nums2.length) merged[k++] = nums2[j++];
    int mid = merged.length / 2;
    if (merged.length % 2 == 0)
        return (merged[mid - 1] + merged[mid]) / 2.0;
    return merged[mid];
}`,

      cppCode: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    vector<int> merged;
    int i = 0, j = 0;
    while (i < nums1.size() && j < nums2.size()) {
        if (nums1[i] <= nums2[j]) merged.push_back(nums1[i++]);
        else merged.push_back(nums2[j++]);
    }
    while (i < nums1.size()) merged.push_back(nums1[i++]);
    while (j < nums2.size()) merged.push_back(nums2[j++]);
    int mid = merged.size() / 2;
    if (merged.size() % 2 == 0)
        return (merged[mid - 1] + merged[mid]) / 2.0;
    return merged[mid];
}`,

      pythonCode: `def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    merged = []
    i, j = 0, 0
    while i < len(nums1) and j < len(nums2):
        if nums1[i] <= nums2[j]:
            merged.append(nums1[i]); i += 1
        else:
            merged.append(nums2[j]); j += 1
    merged.extend(nums1[i:])
    merged.extend(nums2[j:])
    mid = len(merged) // 2
    if len(merged) % 2 == 0:
        return (merged[mid - 1] + merged[mid]) / 2
    return merged[mid]`,

      lineAnnotations: {
        2: "Create merged array of total size",
        3: "Two pointers for merge sort merge step",
        4: "Compare and take the smaller element",
        9: "Find the middle index",
        10: "Even length: average of two middle elements",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums1: [1, 3], nums2: [2] },
          expectedOutput: "2.0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init merge",
              explanation: "Create empty merged array. i=0 points to nums1, j=0 points to nums2.",
              variables: { i: 0, j: 0, merged: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "Take 1 from nums1",
              explanation: "nums1[0]=1 <= nums2[0]=2. Take 1. merged=[1].",
              variables: { i: 1, j: 0, merged: "[1]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 6],
              shortLabel: "Take 2 from nums2",
              explanation: "nums1[1]=3 > nums2[0]=2. Take 2. merged=[1,2].",
              variables: { i: 1, j: 1, merged: "[1, 2]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7],
              shortLabel: "Take remaining 3",
              explanation: "nums2 exhausted. Take remaining nums1[1]=3. merged=[1,2,3].",
              variables: { i: 2, j: 1, merged: "[1, 2, 3]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 11],
              shortLabel: "Median = 2.0",
              explanation: "merged=[1,2,3], length=3 (odd). mid=1. Return merged[1]=2.0.",
              variables: { merged: "[1, 2, 3]", mid: 1, answer: 2.0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums1, nums2 }) {
        const steps = [];
        const merged = [];
        let i = 0, j = 0;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init merge",
          explanation: "Start merging two sorted arrays.",
          variables: { i: 0, j: 0, merged: "[]" },
          dataStructure: { arrayStates: {}, pointers: [] },
          delta: {}, isAnswer: false,
        });

        while (i < nums1.length && j < nums2.length) {
          if (nums1[i] <= nums2[j]) {
            merged.push(nums1[i]);
            i++;
          } else {
            merged.push(nums2[j]);
            j++;
          }
        }
        while (i < nums1.length) { merged.push(nums1[i]); i++; }
        while (j < nums2.length) { merged.push(nums2[j]); j++; }

        const mid = Math.floor(merged.length / 2);
        const median = merged.length % 2 === 0
          ? (merged[mid - 1] + merged[mid]) / 2
          : merged[mid];

        steps.push({
          stepId: 1, lineNumbers: [9, 10, 11],
          shortLabel: `Median = ${median}`,
          explanation: `merged=[${merged.join(",")}]. Median = ${median}.`,
          variables: { merged: JSON.stringify(merged), mid, answer: median },
          dataStructure: { arrayStates: {}, pointers: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Binary Search on Partition",
      tier: "optimal",
      timeComplexity: "O(log(min(m,n)))",
      spaceComplexity: "O(1)",
      idea: `Binary search on the smaller array to find partition i. Compute j = (m+n+1)/2 - i.
        Check if left elements <= right elements. Adjust i until partition is correct.`,

      javaCode: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    if (nums1.length > nums2.length)
        return findMedianSortedArrays(nums2, nums1);
    int m = nums1.length, n = nums2.length;
    int lo = 0, hi = m;

    while (lo <= hi) {
        int i = (lo + hi) / 2;
        int j = (m + n + 1) / 2 - i;

        int left1  = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
        int right1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
        int left2  = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
        int right2 = (j == n) ? Integer.MAX_VALUE : nums2[j];

        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 == 0)
                return (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;
            return Math.max(left1, left2);
        } else if (left1 > right2) {
            hi = i - 1;
        } else {
            lo = i + 1;
        }
    }
    return 0;
}`,

      cppCode: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if (nums1.size() > nums2.size())
        return findMedianSortedArrays(nums2, nums1);
    int m = nums1.size(), n = nums2.size();
    int lo = 0, hi = m;

    while (lo <= hi) {
        int i = (lo + hi) / 2;
        int j = (m + n + 1) / 2 - i;

        int left1  = (i == 0) ? INT_MIN : nums1[i - 1];
        int right1 = (i == m) ? INT_MAX : nums1[i];
        int left2  = (j == 0) ? INT_MIN : nums2[j - 1];
        int right2 = (j == n) ? INT_MAX : nums2[j];

        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 == 0)
                return (max(left1, left2) + min(right1, right2)) / 2.0;
            return max(left1, left2);
        } else if (left1 > right2) {
            hi = i - 1;
        } else {
            lo = i + 1;
        }
    }
    return 0;
}`,

      pythonCode: `def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    if len(nums1) > len(nums2):
        return findMedianSortedArrays(nums2, nums1)
    m, n = len(nums1), len(nums2)
    lo, hi = 0, m

    while lo <= hi:
        i = (lo + hi) // 2
        j = (m + n + 1) // 2 - i

        left1  = float('-inf') if i == 0 else nums1[i - 1]
        right1 = float('inf') if i == m else nums1[i]
        left2  = float('-inf') if j == 0 else nums2[j - 1]
        right2 = float('inf') if j == n else nums2[j]

        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2 == 0:
                return (max(left1, left2) + min(right1, right2)) / 2
            return max(left1, left2)
        elif left1 > right2:
            hi = i - 1
        else:
            lo = i + 1

    return 0`,

      lineAnnotations: {
        2: "Ensure nums1 is the smaller array for efficiency",
        5: "Binary search range: 0 to m elements from nums1",
        7: "Binary search: try taking i elements from nums1",
        8: "Compute j: we need (m+n+1)/2 total elements on the left",
        10: "Left boundary of nums1 partition",
        11: "Right boundary of nums1 partition",
        12: "Left boundary of nums2 partition",
        13: "Right boundary of nums2 partition",
        15: "Valid partition: all left <= all right",
        17: "Even total: average of max(left) and min(right)",
        18: "Odd total: max of left elements is the median",
        19: "left1 too large — take fewer from nums1",
        21: "left2 too large — take more from nums1",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Two small arrays with even total length",
          input: { nums1: [1, 3], nums2: [2] },
          expectedOutput: "2.0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 4, 5],
              shortLabel: "Setup: m=2, n=1",
              explanation: "nums1=[1,3] is already smaller (m=2 <= n=1... actually m > n, so swap). After swap: nums1=[2], nums2=[1,3], m=1, n=2. lo=0, hi=1.",
              variables: { nums1: "[2]", nums2: "[1, 3]", m: 1, n: 2, lo: 0, hi: 1 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                bsLeft: 0, bsMid: null, bsRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8],
              shortLabel: "i=0, j=2",
              explanation: "i=(0+1)/2=0. j=(1+2+1)/2 - 0 = 2. Take 0 from nums1, 2 from nums2. Left partition: [1, 3]. Right partition: [2].",
              variables: { i: 0, j: 2, lo: 0, hi: 1 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                bsLeft: 0, bsMid: 0, bsRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11, 12, 13],
              shortLabel: "left1=-inf, right1=2, left2=3, right2=inf",
              explanation: "i=0: left1=-inf (no elements from nums1 on left), right1=nums1[0]=2. j=2: left2=nums2[1]=3, right2=inf.",
              variables: { left1: "-inf", right1: 2, left2: 3, right2: "inf" },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                bsLeft: 0, bsMid: 0, bsRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15, 21],
              shortLabel: "left2=3 > right1=2 → move right",
              explanation: "left2=3 > right1=2. We took too few from nums1. lo = i + 1 = 1.",
              variables: { left1: "-inf", right1: 2, left2: 3, right2: "inf", lo: 1, hi: 1 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [],
                bsLeft: 1, bsMid: null, bsRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8, 10, 11, 12, 13],
              shortLabel: "i=1, j=1",
              explanation: "i=(1+1)/2=1. j=2-1=1. Take 1 from nums1 (=[2]), 1 from nums2 (=[1]). left1=nums1[0]=2, right1=inf, left2=nums2[0]=1, right2=nums2[1]=3.",
              variables: { i: 1, j: 1, left1: 2, right1: "inf", left2: 1, right2: 3 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                bsLeft: 1, bsMid: 1, bsRight: 1,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [15, 18],
              shortLabel: "Valid partition! Median = 2.0",
              explanation: "left1=2 <= right2=3 and left2=1 <= right1=inf. Valid! Total length=3 (odd). Median = max(left1, left2) = max(2, 1) = 2.0.",
              variables: { left1: 2, left2: 1, right1: "inf", right2: 3, answer: 2.0 },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                bsLeft: 1, bsMid: 1, bsRight: 1,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Even Total Length",
          description: "Both arrays of equal size — even total, average needed",
          input: { nums1: [1, 2], nums2: [3, 4] },
          expectedOutput: "2.5",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5],
              shortLabel: "Setup: m=2, n=2, lo=0, hi=2",
              explanation: "Both arrays have length 2. m=2, n=2. lo=0, hi=2. We need (2+2+1)/2=2 elements on the left side.",
              variables: { m: 2, n: 2, lo: 0, hi: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                bsLeft: 0, bsMid: null, bsRight: 2,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 10, 11, 12, 13],
              shortLabel: "i=1, j=1",
              explanation: "i=(0+2)/2=1. j=2-1=1. left1=nums1[0]=1, right1=nums1[1]=2, left2=nums2[0]=3, right2=nums2[1]=4.",
              variables: { i: 1, j: 1, left1: 1, right1: 2, left2: 3, right2: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                bsLeft: 0, bsMid: 1, bsRight: 2,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [15, 21],
              shortLabel: "left2=3 > right1=2 → lo=2",
              explanation: "left2=3 > right1=2. Take more from nums1. lo = i+1 = 2.",
              variables: { lo: 2, hi: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited" },
                pointers: [],
                bsLeft: 2, bsMid: null, bsRight: 2,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8, 10, 11, 12, 13],
              shortLabel: "i=2, j=0",
              explanation: "i=2, j=0. left1=nums1[1]=2, right1=inf, left2=-inf, right2=nums2[0]=3.",
              variables: { i: 2, j: 0, left1: 2, right1: "inf", left2: "-inf", right2: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active" },
                pointers: [],
                bsLeft: 2, bsMid: 2, bsRight: 2,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15, 16, 17],
              shortLabel: "Valid! Median = (2+3)/2 = 2.5",
              explanation: "left1=2 <= right2=3, left2=-inf <= right1=inf. Valid! Even total: median = (max(2,-inf) + min(inf,3))/2 = (2+3)/2 = 2.5.",
              variables: { left1: 2, left2: "-inf", right1: "inf", right2: 3, answer: 2.5 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                bsLeft: 2, bsMid: 2, bsRight: 2,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums1, nums2 }) {
        const steps = [];
        let a = nums1, b = nums2;
        if (a.length > b.length) { const t = a; a = b; b = t; }
        const m = a.length, n = b.length;
        let lo = 0, hi = m;

        steps.push({
          stepId: 0, lineNumbers: [2, 4, 5],
          shortLabel: `Setup: m=${m}, n=${n}`,
          explanation: `Ensure nums1 is smaller. m=${m}, n=${n}. lo=0, hi=${m}.`,
          variables: { m, n, lo, hi },
          dataStructure: { arrayStates: {}, pointers: [], bsLeft: lo, bsMid: null, bsRight: hi },
          delta: {}, isAnswer: false,
        });

        while (lo <= hi) {
          const i = Math.floor((lo + hi) / 2);
          const j = Math.floor((m + n + 1) / 2) - i;
          const left1 = i === 0 ? -Infinity : a[i - 1];
          const right1 = i === m ? Infinity : a[i];
          const left2 = j === 0 ? -Infinity : b[j - 1];
          const right2 = j === n ? Infinity : b[j];

          steps.push({
            stepId: steps.length, lineNumbers: [7, 8, 10, 11, 12, 13],
            shortLabel: `i=${i}, j=${j}`,
            explanation: `Partition: i=${i}, j=${j}. left1=${left1}, right1=${right1}, left2=${left2}, right2=${right2}.`,
            variables: { i, j, left1: left1 === -Infinity ? "-inf" : left1, right1: right1 === Infinity ? "inf" : right1, left2: left2 === -Infinity ? "-inf" : left2, right2: right2 === Infinity ? "inf" : right2 },
            dataStructure: { arrayStates: {}, pointers: [], bsLeft: lo, bsMid: i, bsRight: hi },
            delta: {}, isAnswer: false,
          });

          if (left1 <= right2 && left2 <= right1) {
            const median = (m + n) % 2 === 0
              ? (Math.max(left1, left2) + Math.min(right1, right2)) / 2
              : Math.max(left1, left2);
            steps.push({
              stepId: steps.length, lineNumbers: [15, 17, 18],
              shortLabel: `Median = ${median}`,
              explanation: `Valid partition found. Median = ${median}.`,
              variables: { answer: median },
              dataStructure: { arrayStates: {}, pointers: [], bsLeft: lo, bsMid: i, bsRight: hi },
              delta: {}, isAnswer: true,
            });
            return steps;
          } else if (left1 > right2) {
            hi = i - 1;
          } else {
            lo = i + 1;
          }
        }
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(m + n)", space: "O(m + n)", explanation: "Merge both arrays, then find middle" },
    optimal: { time: "O(log(min(m,n)))", space: "O(1)", explanation: "Binary search on partition of smaller array", tradeoff: "No extra space needed — pure binary search" },
  },

  interviewTips: [
    "Always binary search on the SMALLER array — this ensures O(log(min(m,n))).",
    "Handle edge cases with -inf and +inf for partition boundaries.",
    "Explain the partition invariant: left1 <= right2 AND left2 <= right1.",
    "Distinguish odd vs even total length for the final median calculation.",
    "Ask: 'Are both arrays guaranteed non-empty?' Handle empty array edge case.",
  ],

  relatedProblems: ["binary-search", "find-min-rotated-array", "koko-eating-bananas"],
};
