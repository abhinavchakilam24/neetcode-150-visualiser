export const kthLargestArray = {
  id: 67,
  slug: "kth-largest-array",
  title: "Kth Largest Element in an Array",
  difficulty: "Medium",
  topic: "heap-priority-queue",
  topicLabel: "Heap / Priority Queue",
  neetcodeNumber: 67,
  artifactType: "Heap",
  companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/",

  pattern: "Min-Heap of Size K for Kth Largest",
  patternExplanation: `To find the Kth largest element, maintain a min-heap of size K. The
    min-heap's root is always the smallest among the K largest elements seen so far — which
    is exactly the Kth largest element.`,

  intuition: {
    coreInsight: `The Kth largest element is the element that would sit at index K-1 if the
      array were sorted in descending order. We don't need full sorting though. A min-heap of
      size K acts as a "bouncer" — it keeps exactly the K largest elements, and its root (the
      minimum of those K) is our answer. Any element smaller than the root can't possibly be
      in the top K, so we skip it. Any element larger replaces the root.`,

    mentalModel: `Imagine a VIP lounge with exactly K seats. A bouncer at the door compares each
      new guest's VIP score to the lowest score inside. If the newcomer's score is higher, the
      lowest-scoring person leaves and the newcomer sits down. After everyone has tried the door,
      the person with the lowest score inside is the Kth most important guest — that's the
      min-heap root.`,

    whyNaiveFails: `Sorting the entire array is O(N log N). For a single query of "what's the
      Kth largest?", that's overkill. We're ordering N elements when we only need to identify
      one specific element. The heap approach does O(N log K) work, which is faster when K << N.
      For K=1 (finding the max), the heap degenerates to a single-element scan in O(N).`,

    keyObservation: `Use a MIN-heap of size K, not a max-heap. The min-heap root is the smallest
      of the K largest elements — which IS the Kth largest. After processing all elements, just
      return heap.peek(). This is the key insight: the Kth largest = the minimum of the top K.`,
  },

  problem: `Given an integer array nums and an integer k, return the kth largest element in the
    array. Note that it is the kth largest element in the sorted order, not the kth distinct
    element. Can you solve it without sorting?`,

  examples: [
    { input: "nums = [3,2,1,5,6,4], k = 2", output: "5", explanation: "Sorted desc: [6,5,4,3,2,1]. 2nd largest is 5." },
    { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4", explanation: "Sorted desc: [6,5,5,4,3,3,2,2,1]. 4th largest is 4." },
  ],

  constraints: [
    "1 <= k <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Sort Descending",
      tier: "brute",
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(1)",
      idea: "Sort the array in descending order and return the element at index k-1.",

      javaCode: `public int findKthLargest(int[] nums, int k) {
    Arrays.sort(nums);
    return nums[nums.length - k];
}`,

      cppCode: `int findKthLargest(vector<int>& nums, int k) {
    sort(nums.begin(), nums.end());
    return nums[nums.size() - k];
}`,

      pythonCode: `def findKthLargest(self, nums: List[int], k: int) -> int:
    nums.sort()
    return nums[-k]`,

      lineAnnotations: {
        2: "Sort array in ascending order",
        3: "Kth largest is at index (length - k) in ascending order",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [3, 2, 1, 5, 6, 4], k: 2 },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort array",
              explanation: "Sort [3,2,1,5,6,4] in ascending order to get [1,2,3,4,5,6].",
              variables: { k: 2, sorted: "[1,2,3,4,5,6]" },
              dataStructure: {
                heap: [],
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3],
              shortLabel: "Return nums[4] = 5",
              explanation: "Kth largest (k=2) is at index length-k = 6-2 = 4. nums[4] = 5. The 2nd largest element is 5.",
              variables: { k: 2, index: 4, answer: 5 },
              dataStructure: {
                heap: [],
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "found", 5: "visited" },
                pointers: [{ name: "k", index: 4, color: "found" }],
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, k }) {
        const steps = [];
        const sorted = [...nums].sort((a, b) => a - b);
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Sort array",
          explanation: `Sort [${nums}] to get [${sorted}].`,
          variables: { k, sorted: JSON.stringify(sorted) },
          dataStructure: { heap: [], arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])), pointers: [] },
          delta: {}, isAnswer: false,
        });
        const idx = sorted.length - k;
        steps.push({
          stepId: 1, lineNumbers: [3],
          shortLabel: `Return sorted[${idx}] = ${sorted[idx]}`,
          explanation: `Kth largest (k=${k}) at index ${sorted.length}-${k}=${idx}. Answer: ${sorted[idx]}.`,
          variables: { k, index: idx, answer: sorted[idx] },
          dataStructure: {
            heap: [],
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, i === idx ? "found" : "visited"])),
            pointers: [{ name: "k", index: idx, color: "found" }],
          },
          delta: { changedIndices: [idx] }, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Min-Heap of Size K",
      tier: "optimal",
      timeComplexity: "O(N log K)",
      spaceComplexity: "O(K)",
      idea: `Maintain a min-heap of size K. Push each element; if heap size exceeds K, pop the
        minimum. After all elements, the heap root is the Kth largest.`,

      javaCode: `public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    for (int num : nums) {
        minHeap.offer(num);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }

    return minHeap.peek();
}`,

      cppCode: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;

    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }

    return minHeap.top();
}`,

      pythonCode: `def findKthLargest(self, nums: List[int], k: int) -> int:
    min_heap = []

    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)

    return min_heap[0]`,

      lineAnnotations: {
        2: "Min-heap: smallest element on top",
        4: "Process each element in the array",
        5: "Push element into the min-heap",
        6: "If heap exceeds K elements...",
        7: "...remove the smallest (it can't be Kth largest)",
        10: "Root of min-heap = Kth largest element",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Find 2nd largest in [3,2,1,5,6,4]",
          input: { nums: [3, 2, 1, 5, 6, 4], k: 2 },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init min-heap",
              explanation: "Create empty min-heap. It will hold the K=2 largest elements, with the smallest of them (the Kth largest) on top.",
              variables: { k: 2, heapSize: 0, heap: "[]" },
              dataStructure: {
                heap: [],
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "Push 3",
              explanation: "Push 3 into heap. Size=1 <= K=2, no eviction needed.",
              variables: { num: 3, k: 2, heapSize: 1, heapRoot: 3, heap: "[3]" },
              dataStructure: {
                heap: [{ value: 3, priority: 3, state: "active" }],
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5],
              shortLabel: "Push 2",
              explanation: "Push 2 into heap. Size=2 <= K=2, no eviction. Heap: [2, 3] (min on top).",
              variables: { num: 2, k: 2, heapSize: 2, heapRoot: 2, heap: "[2, 3]" },
              dataStructure: {
                heap: [
                  { value: 2, priority: 2, state: "active" },
                  { value: 3, priority: 3, state: "default" },
                ],
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "Push 1, evict 1",
              explanation: "Push 1. Size=3 > K=2, so pop min=1. Element 1 can't be in the top 2. Heap: [2, 3].",
              variables: { num: 1, evicted: 1, k: 2, heapSize: 2, heapRoot: 2, heap: "[2, 3]" },
              dataStructure: {
                heap: [
                  { value: 2, priority: 2, state: "default" },
                  { value: 3, priority: 3, state: "default" },
                ],
                arrayStates: { 0: "visited", 1: "visited", 2: "eliminated", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stackOperation: "pop",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "Push 5, evict 2",
              explanation: "Push 5. Size=3 > K=2, pop min=2. Now the top 2 are [3, 5]. Heap root=3.",
              variables: { num: 5, evicted: 2, k: 2, heapSize: 2, heapRoot: 3, heap: "[3, 5]" },
              dataStructure: {
                heap: [
                  { value: 3, priority: 3, state: "default" },
                  { value: 5, priority: 5, state: "active" },
                ],
                arrayStates: { 0: "visited", 1: "eliminated", 2: "eliminated", 3: "active", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stackOperation: "pop",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "Push 6, evict 3",
              explanation: "Push 6. Size=3 > K=2, pop min=3. Top 2 are now [5, 6]. Heap root=5.",
              variables: { num: 6, evicted: 3, k: 2, heapSize: 2, heapRoot: 5, heap: "[5, 6]" },
              dataStructure: {
                heap: [
                  { value: 5, priority: 5, state: "default" },
                  { value: 6, priority: 6, state: "active" },
                ],
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "visited", 4: "active", 5: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stackOperation: "pop",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "Push 4, evict 4",
              explanation: "Push 4. Size=3 > K=2, pop min=4. The newcomer 4 is immediately evicted because it's smaller than both 5 and 6. Heap unchanged: [5, 6].",
              variables: { num: 4, evicted: 4, k: 2, heapSize: 2, heapRoot: 5, heap: "[5, 6]" },
              dataStructure: {
                heap: [
                  { value: 5, priority: 5, state: "default" },
                  { value: 6, priority: 6, state: "default" },
                ],
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "visited", 4: "visited", 5: "eliminated" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                stackOperation: "pop",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [10],
              shortLabel: "Return heap root = 5",
              explanation: "All elements processed. Min-heap root = 5. This is the smallest of the top K=2 elements [5, 6], which means 5 is the 2nd largest element.",
              variables: { answer: 5, heap: "[5, 6]" },
              dataStructure: {
                heap: [
                  { value: 5, priority: 5, state: "found" },
                  { value: 6, priority: 6, state: "found" },
                ],
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "found", 5: "eliminated" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Duplicates",
          description: "Array with duplicate values — Kth largest counts duplicates",
          input: { nums: [3, 3, 3, 1], k: 2 },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init min-heap",
              explanation: "Create empty min-heap. K=2. Note: duplicates count as separate elements for Kth largest.",
              variables: { k: 2, heapSize: 0, heap: "[]" },
              dataStructure: {
                heap: [],
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "Push 3",
              explanation: "Push first 3. Heap: [3]. Size=1 <= K=2.",
              variables: { num: 3, k: 2, heapSize: 1, heap: "[3]" },
              dataStructure: {
                heap: [{ value: 3, priority: 3, state: "active" }],
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5],
              shortLabel: "Push 3",
              explanation: "Push second 3. Heap: [3, 3]. Size=2 = K=2.",
              variables: { num: 3, k: 2, heapSize: 2, heap: "[3, 3]" },
              dataStructure: {
                heap: [
                  { value: 3, priority: 3, state: "default" },
                  { value: 3, priority: 3, state: "active" },
                ],
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "Push 3, evict 3",
              explanation: "Push third 3. Size=3 > K=2, pop min=3. One of the 3s is evicted. Heap stays [3, 3].",
              variables: { num: 3, evicted: 3, k: 2, heapSize: 2, heap: "[3, 3]" },
              dataStructure: {
                heap: [
                  { value: 3, priority: 3, state: "default" },
                  { value: 3, priority: 3, state: "default" },
                ],
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stackOperation: "pop",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "Push 1, evict 1",
              explanation: "Push 1. Size=3 > K=2, pop min=1. The 1 is immediately evicted. Heap: [3, 3].",
              variables: { num: 1, evicted: 1, k: 2, heapSize: 2, heap: "[3, 3]" },
              dataStructure: {
                heap: [
                  { value: 3, priority: 3, state: "default" },
                  { value: 3, priority: 3, state: "default" },
                ],
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "eliminated" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stackOperation: "pop",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [10],
              shortLabel: "Return heap root = 3",
              explanation: "All elements processed. Heap root = 3. The 2nd largest element is 3 (duplicates count separately).",
              variables: { answer: 3 },
              dataStructure: {
                heap: [
                  { value: 3, priority: 3, state: "found" },
                  { value: 3, priority: 3, state: "found" },
                ],
                arrayStates: { 0: "found", 1: "found", 2: "visited", 3: "eliminated" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, k }) {
        const steps = [];

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init min-heap",
          explanation: `Create empty min-heap. It will hold the K=${k} largest elements.`,
          variables: { k, heapSize: 0, heap: "[]" },
          dataStructure: { heap: [], arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])), pointers: [] },
          delta: {}, isAnswer: false,
        });

        // Simulate min-heap with sorted array
        let heap = [];
        const arrStates = nums.map(() => "default");

        for (let i = 0; i < nums.length; i++) {
          heap.push(nums[i]);
          heap.sort((a, b) => a - b);
          arrStates[i] = "active";

          if (heap.length > k) {
            const evicted = heap.shift();
            // Mark evicted elements
            steps.push({
              stepId: steps.length, lineNumbers: [4, 5, 6, 7],
              shortLabel: `Push ${nums[i]}, evict ${evicted}`,
              explanation: `Push ${nums[i]}. Size=${heap.length + 1} > K=${k}, pop min=${evicted}. Heap: [${heap}].`,
              variables: { num: nums[i], evicted, k, heapSize: heap.length, heapRoot: heap[0], heap: `[${heap}]` },
              dataStructure: {
                heap: heap.map((v, idx) => ({ value: v, priority: v, state: idx === heap.length - 1 ? "active" : "default" })),
                arrayStates: Object.fromEntries(arrStates.map((s, idx) => [idx, s])),
                pointers: [{ name: "i", index: i, color: "pointer" }],
                stackOperation: "pop",
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
            if (evicted === nums[i]) arrStates[i] = "eliminated";
            else arrStates[i] = "visited";
          } else {
            steps.push({
              stepId: steps.length, lineNumbers: [4, 5],
              shortLabel: `Push ${nums[i]}`,
              explanation: `Push ${nums[i]}. Size=${heap.length} <= K=${k}, no eviction. Heap: [${heap}].`,
              variables: { num: nums[i], k, heapSize: heap.length, heapRoot: heap[0], heap: `[${heap}]` },
              dataStructure: {
                heap: heap.map((v, idx) => ({ value: v, priority: v, state: idx === heap.length - 1 ? "active" : "default" })),
                arrayStates: Object.fromEntries(arrStates.map((s, idx) => [idx, s])),
                pointers: [{ name: "i", index: i, color: "pointer" }],
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
            arrStates[i] = "visited";
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: `Return ${heap[0]}`,
          explanation: `All elements processed. Min-heap root = ${heap[0]}, which is the ${k}th largest element.`,
          variables: { answer: heap[0] },
          dataStructure: {
            heap: heap.map(v => ({ value: v, priority: v, state: "found" })),
            arrayStates: Object.fromEntries(arrStates.map((s, idx) => [idx, s])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(N log N)", space: "O(1)", explanation: "Sorting the entire array" },
    optimal: { time: "O(N log K)", space: "O(K)", explanation: "Each element pushed/popped from size-K heap in O(log K)", tradeoff: "Quickselect can do O(N) average but O(N^2) worst case; heap is O(N log K) guaranteed" },
  },

  interviewTips: [
    "Start with the sort approach — it's clean and correct, then optimize.",
    "Explain why min-heap of size K works: root = smallest of K largest = Kth largest.",
    "Mention Quickselect as an O(N) average alternative, but note its O(N^2) worst case.",
    "Clarify: Kth largest counts duplicates — [3,3,3] has 2nd largest = 3.",
    "If k = 1, this degenerates to finding the max. If k = n, finding the min.",
  ],

  relatedProblems: ["k-closest-points", "kth-largest-stream", "top-k-frequent-elements"],
};
