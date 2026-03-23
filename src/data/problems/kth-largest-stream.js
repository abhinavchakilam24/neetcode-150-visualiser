export const kthLargestStream = {
  id: 64,
  slug: "kth-largest-stream",
  title: "Kth Largest Element in a Stream",
  difficulty: "Easy",
  topic: "heap-priority-queue",
  topicLabel: "Heap / Priority Queue",
  neetcodeNumber: 64,
  artifactType: "Heap",
  companies: ["Amazon", "Google", "Meta", "Apple", "Netflix"],
  leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",

  pattern: "Min-Heap of Size K",
  patternExplanation: `To track the Kth largest element in a stream, maintain a min-heap of
    size K. The heap's root is always the Kth largest. When a new element arrives, if it's
    larger than the root, remove the root and insert the new element.`,

  intuition: {
    coreInsight: `We need the Kth largest at all times. If we keep exactly K elements in a
      min-heap, the smallest of those K elements (the heap root) IS the Kth largest. Any
      element smaller than the root can be ignored — it's not in the top K. Any element
      larger than the root displaces it, maintaining exactly the K largest seen so far.`,

    mentalModel: `Imagine a VIP section at a club that holds exactly K people, ordered by
      importance. The bouncer (min-heap root) is the least important person inside. When
      someone more important arrives, the bouncer kicks out the least important VIP and lets
      the newcomer in. The bouncer is always the Kth most important person — that's our answer.`,

    whyNaiveFails: `Sorting the entire stream after every addition takes O(n log n) per add
      call. With n additions of a stream of total size N, that's O(N^2 log N). A min-heap of
      size K processes each addition in O(log K) — much faster when K << N.`,

    keyObservation: `The min-heap root of a size-K heap IS the Kth largest element. We never
      need to look deeper into the heap. This gives us O(1) access to the answer and O(log K)
      updates — independent of how many total elements we've seen.`,
  },

  problem: `Design a class to find the kth largest element in a stream. Note that it is the kth
    largest element in sorted order, not the kth distinct element. Implement the KthLargest class:
    KthLargest(int k, int[] nums) initializes the object with the integer k and the stream of
    integers nums. int add(int val) appends the integer val to the stream and returns the element
    representing the kth largest element in the stream.`,

  examples: [
    {
      input: `["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]`,
      output: "[null, 4, 5, 5, 8, 8]",
      explanation: "After init with k=3, nums=[4,5,8,2]: add(3)→4, add(5)→5, add(10)→5, add(9)→8, add(4)→8",
    },
  ],

  constraints: [
    "1 <= k <= 10^4",
    "0 <= nums.length <= 10^4",
    "-10^4 <= nums[i] <= 10^4",
    "-10^4 <= val <= 10^4",
    "At most 10^4 calls will be made to add.",
    "It is guaranteed that there will be at least k elements when add is called.",
  ],

  approaches: {
    brute: {
      label: "Sort on Every Add",
      tier: "brute",
      timeComplexity: "O(n log n) per add",
      spaceComplexity: "O(n)",
      idea: "Store all elements in a list. On each add, sort and return the kth largest.",

      javaCode: `class KthLargest {
    List<Integer> list;
    int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.list = new ArrayList<>();
        for (int n : nums) list.add(n);
    }

    public int add(int val) {
        list.add(val);
        Collections.sort(list, Collections.reverseOrder());
        return list.get(k - 1);
    }
}`,

      cppCode: `class KthLargest {
    vector<int> nums;
    int k;
public:
    KthLargest(int k, vector<int>& nums) : k(k), nums(nums) {}

    int add(int val) {
        nums.push_back(val);
        sort(nums.rbegin(), nums.rend());
        return nums[k - 1];
    }
};`,

      pythonCode: `class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        self.k = k
        self.nums = nums

    def add(self, val: int) -> int:
        self.nums.append(val)
        self.nums.sort(reverse=True)
        return self.nums[self.k - 1]`,

      lineAnnotations: {
        5: "Store k and initial elements",
        11: "Add new value to list",
        12: "Sort entire list in descending order — O(n log n)",
        13: "Return kth largest (0-indexed: k-1)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { k: 3, nums: [4, 5, 8, 2], adds: [3] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6, 7],
              shortLabel: "Init: k=3, nums=[4,5,8,2]",
              explanation: "Initialize with k=3 and nums=[4,5,8,2]. Store all elements.",
              variables: { k: 3, list: "[4, 5, 8, 2]" },
              dataStructure: { heap: [4, 5, 8, 2], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11, 12, 13],
              shortLabel: "add(3): sort → return 4",
              explanation: "Add 3. Sort descending: [8,5,4,3,2]. 3rd largest (index 2) = 4.",
              variables: { k: 3, val: 3, sorted: "[8,5,4,3,2]", answer: 4 },
              dataStructure: { heap: [8, 5, 4, 3, 2], heapHighlight: [2] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: null,
    },

    better: null,

    optimal: {
      label: "Min-Heap of Size K",
      tier: "optimal",
      timeComplexity: "O(n log k) init, O(log k) per add",
      spaceComplexity: "O(k)",
      idea: `Maintain a min-heap of size K. During initialization, add all elements and
        keep only the top K. For each add(), offer the value, then poll if size > K.
        The root is always the Kth largest.`,

      javaCode: `class KthLargest {
    PriorityQueue<Integer> minHeap;
    int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.minHeap = new PriorityQueue<>();
        for (int n : nums) {
            minHeap.offer(n);
            if (minHeap.size() > k) minHeap.poll();
        }
    }

    public int add(int val) {
        minHeap.offer(val);
        if (minHeap.size() > k) minHeap.poll();
        return minHeap.peek();
    }
}`,

      cppCode: `class KthLargest {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;
public:
    KthLargest(int k, vector<int>& nums) : k(k) {
        for (int n : nums) {
            minHeap.push(n);
            if ((int)minHeap.size() > k) minHeap.pop();
        }
    }

    int add(int val) {
        minHeap.push(val);
        if ((int)minHeap.size() > k) minHeap.pop();
        return minHeap.top();
    }
};`,

      pythonCode: `class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > k:
            heapq.heappop(self.heap)
        return self.heap[0]`,

      lineAnnotations: {
        2: "Min-heap — smallest element at root",
        6: "Add each initial element to heap",
        8: "Add element to heap",
        9: "If heap exceeds size K, remove the smallest (not top-K)",
        14: "Add new value to heap",
        15: "If heap > K elements, evict the smallest",
        16: "Root of min-heap = Kth largest element",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Init with k=3, nums=[4,5,8,2], then add several values",
          input: { k: 3, nums: [4, 5, 8, 2], adds: [3, 5, 10, 9, 4] },
          expectedOutput: "[4, 5, 5, 8, 8]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6],
              shortLabel: "Init: k=3, start building heap",
              explanation: "Create min-heap with k=3. We'll add all initial elements, keeping only the top 3.",
              variables: { k: 3, heapSize: 0 },
              dataStructure: { heap: [], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9],
              shortLabel: "Add 4, 5, 8, 2 → heap=[4,5,8]",
              explanation: "Insert all initial elements. After adding 4,5,8: heap=[4,5,8] (size=3=k). Add 2: heap size would be 4 > k, so poll min (2). Final heap: [4,5,8].",
              variables: { k: 3, heapSize: 3, heap: "[4, 5, 8]", polled: 2 },
              dataStructure: { heap: [4, 5, 8], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [14, 15, 16],
              shortLabel: "add(3): 3 < root(4), poll 3 → return 4",
              explanation: "add(3): Insert 3 into heap → [3,4,5,8]. Size=4 > k=3, poll min=3. Heap=[4,5,8]. peek()=4. The 3rd largest is 4.",
              variables: { val: 3, heapBefore: "[4,5,8]", inserted: 3, polled: 3, "peek()": 4 },
              dataStructure: { heap: [4, 5, 8], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [14, 15, 16],
              shortLabel: "add(5): poll 4 → return 5",
              explanation: "add(5): Insert 5 → [4,5,5,8]. Size=4 > k=3, poll min=4. Heap=[5,5,8]. peek()=5. The 3rd largest is now 5.",
              variables: { val: 5, heapBefore: "[4,5,8]", inserted: 5, polled: 4, "peek()": 5 },
              dataStructure: { heap: [5, 5, 8], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14, 15, 16],
              shortLabel: "add(10): poll 5 → return 5",
              explanation: "add(10): Insert 10 → [5,5,8,10]. Size=4 > k=3, poll min=5. Heap=[5,8,10]. peek()=5. Still 5.",
              variables: { val: 10, heapBefore: "[5,5,8]", inserted: 10, polled: 5, "peek()": 5 },
              dataStructure: { heap: [5, 8, 10], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14, 15, 16],
              shortLabel: "add(9): poll 5 → return 8",
              explanation: "add(9): Insert 9 → [5,8,9,10]. Size=4 > k=3, poll min=5. Heap=[8,9,10]. peek()=8. The 3rd largest jumps to 8!",
              variables: { val: 9, heapBefore: "[5,8,10]", inserted: 9, polled: 5, "peek()": 8 },
              dataStructure: { heap: [8, 9, 10], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14, 15, 16],
              shortLabel: "add(4): 4 < root(8), poll 4 → return 8",
              explanation: "add(4): Insert 4 → [4,8,9,10]. Size=4 > k=3, poll min=4. Heap=[8,9,10]. peek()=8. The 4 was too small to affect the top 3.",
              variables: { val: 4, heapBefore: "[8,9,10]", inserted: 4, polled: 4, "peek()": 8 },
              dataStructure: { heap: [8, 9, 10], heapHighlight: [0] },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Empty Init",
          description: "Initialized with empty array — first add determines the only element",
          input: { k: 1, nums: [], adds: [5, 3, 8] },
          expectedOutput: "[5, 5, 8]",
          commonMistake: "Forgetting to handle an empty initial array. The heap starts empty and grows with add() calls.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6],
              shortLabel: "Init: k=1, nums=[]",
              explanation: "k=1, empty initial array. Heap is empty. The first add() call will establish the Kth largest.",
              variables: { k: 1, heapSize: 0 },
              dataStructure: { heap: [], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [14, 16],
              shortLabel: "add(5): heap=[5], return 5",
              explanation: "add(5): Insert 5. Heap=[5], size=1=k. peek()=5. Only element is the 1st largest.",
              variables: { val: 5, "peek()": 5 },
              dataStructure: { heap: [5], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [14, 15, 16],
              shortLabel: "add(3): poll 3, return 5",
              explanation: "add(3): Insert 3 → [3,5]. Size=2 > k=1, poll min=3. Heap=[5]. peek()=5. The 1st largest is still 5.",
              variables: { val: 3, polled: 3, "peek()": 5 },
              dataStructure: { heap: [5], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [14, 15, 16],
              shortLabel: "add(8): poll 5, return 8",
              explanation: "add(8): Insert 8 → [5,8]. Size=2 > k=1, poll min=5. Heap=[8]. peek()=8. New maximum!",
              variables: { val: 8, polled: 5, "peek()": 8 },
              dataStructure: { heap: [8], heapHighlight: [0] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ k, nums, adds }) {
        const steps = [];
        // Simple min-heap implementation
        const heap = [];

        function heapPush(val) {
          heap.push(val);
          let i = heap.length - 1;
          while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (heap[parent] > heap[i]) {
              [heap[parent], heap[i]] = [heap[i], heap[parent]];
              i = parent;
            } else break;
          }
        }

        function heapPop() {
          if (heap.length === 1) return heap.pop();
          const min = heap[0];
          heap[0] = heap.pop();
          let i = 0;
          while (true) {
            let smallest = i;
            const l = 2 * i + 1, r = 2 * i + 2;
            if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
            if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
            if (smallest !== i) {
              [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
              i = smallest;
            } else break;
          }
          return min;
        }

        steps.push({
          stepId: 0,
          lineNumbers: [5, 6],
          shortLabel: `Init: k=${k}`,
          explanation: `Create min-heap with k=${k}. Add initial elements and keep only top ${k}.`,
          variables: { k, heapSize: 0 },
          dataStructure: { heap: [], heapHighlight: [] },
          delta: {},
          isAnswer: false,
        });

        // Add initial elements
        for (const n of nums) {
          heapPush(n);
          if (heap.length > k) heapPop();
        }

        if (nums.length > 0) {
          steps.push({
            stepId: steps.length,
            lineNumbers: [8, 9],
            shortLabel: `After init: heap=[${[...heap].sort((a,b)=>a-b).join(",")}]`,
            explanation: `Added all ${nums.length} initial elements. Heap maintains top ${k} largest. Root = ${heap[0]} = Kth largest.`,
            variables: { k, heapSize: heap.length, heap: `[${[...heap].sort((a,b)=>a-b).join(", ")}]` },
            dataStructure: { heap: [...heap].sort((a, b) => a - b), heapHighlight: [0] },
            delta: {},
            isAnswer: false,
          });
        }

        // Process adds
        const results = [];
        const addsList = adds || [];
        for (const val of addsList) {
          heapPush(val);
          let polled = null;
          if (heap.length > k) {
            polled = heapPop();
          }
          const result = heap[0];
          results.push(result);

          const sortedHeap = [...heap].sort((a, b) => a - b);
          steps.push({
            stepId: steps.length,
            lineNumbers: [14, 15, 16],
            shortLabel: `add(${val}): return ${result}`,
            explanation: `add(${val}): Insert into heap.${polled !== null ? ` Size > k, poll min=${polled}.` : ""} Heap=[${sortedHeap.join(",")}]. peek()=${result}.`,
            variables: { val, polled: polled !== null ? polled : "-", "peek()": result, heapSize: heap.length },
            dataStructure: { heap: sortedHeap, heapHighlight: [0] },
            delta: {},
            isAnswer: false,
          });
        }

        // Mark last step as answer
        if (steps.length > 0) {
          steps[steps.length - 1].isAnswer = true;
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n) per add", space: "O(n)", explanation: "Sort entire list on every add call" },
    optimal: { time: "O(n log k) init + O(log k) per add", space: "O(k)", explanation: "Heap of size k; each operation is O(log k)", tradeoff: "Min-heap of fixed size K gives both fast updates and constant-time Kth largest access" },
  },

  interviewTips: [
    "Immediately say 'min-heap of size K' — this is the textbook approach.",
    "Explain WHY a min-heap (not max-heap): the root of a size-K min-heap is the Kth largest.",
    "Mention: 'If val < heap.peek(), we can skip the insert entirely' — optimization.",
    "Clarify: K is fixed throughout the lifetime of the object.",
    "Time per add() is O(log K), not O(log N) — this matters when K << N.",
  ],

  relatedProblems: ["kth-largest-array", "last-stone-weight", "find-median-data-stream"],
};
