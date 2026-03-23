export const findMedianDataStream = {
  id: 70,
  slug: "find-median-data-stream",
  title: "Find Median from Data Stream",
  difficulty: "Hard",
  topic: "heap-priority-queue",
  topicLabel: "Heap / Priority Queue",
  neetcodeNumber: 70,
  artifactType: "Heap",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Netflix"],
  leetcodeLink: "https://leetcode.com/problems/find-median-from-data-stream/",

  pattern: "Two Heaps (Max Heap + Min Heap) for Running Median",
  patternExplanation: `Maintain two heaps: a max heap for the smaller half and a min heap for
    the larger half. The median is always at the top of one or both heaps. This gives O(log n)
    insertion and O(1) median retrieval.`,

  intuition: {
    coreInsight: `The median splits a sorted list into two halves. If we maintain the left half
      in a max heap and the right half in a min heap, the median is always accessible at the tops.
      The max heap's top is the largest of the smaller half; the min heap's top is the smallest
      of the larger half. We just need to keep them balanced (sizes differ by at most 1).`,

    mentalModel: `Imagine a seesaw with numbers. The left side holds all numbers up to the median
      (you always want the biggest one visible — max heap). The right side holds all numbers above
      the median (you want the smallest one visible — min heap). When a new number arrives, you
      put it on the appropriate side and rebalance if one side gets too heavy. The median is always
      the number(s) sitting right at the fulcrum.`,

    whyNaiveFails: `Inserting into a sorted array takes O(n) for shifting elements. For n insertions,
      that's O(n^2) total. With 50,000 operations, that's 2.5 billion shifts. The two-heap approach
      reduces each insertion to O(log n), giving O(n log n) total — 800x faster at n=50,000.`,

    keyObservation: `Always add to the max heap first, then move its top to the min heap. Then if
      the min heap is larger, move its top back to the max heap. This guarantees: (1) max heap top <=
      min heap top, and (2) sizes differ by at most 1 (max heap can be 1 larger). The invariant
      is self-maintaining — no extra checks needed.`,
  },

  problem: `The MedianFinder class supports two operations: addNum(int num) adds an integer from
    the data stream, and findMedian() returns the median of all elements so far. If the count is
    even, return the average of the two middle values.`,

  examples: [
    {
      input: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]',
      output: "[null,null,null,1.5,null,2.0]",
      explanation: "After adding 1 and 2, median = (1+2)/2 = 1.5. After adding 3, median = 2.0.",
    },
  ],

  constraints: [
    "-10^5 <= num <= 10^5",
    "findMedian is called only after at least one addNum",
    "At most 5 * 10^4 calls to addNum and findMedian",
  ],

  approaches: {
    brute: {
      label: "Sorted List Insertion",
      tier: "brute",
      timeComplexity: "O(n) per addNum, O(1) per findMedian",
      spaceComplexity: "O(n)",
      idea: "Maintain a sorted list. Insert each number in the correct position using binary search + shift. Median is the middle element(s).",

      javaCode: `class MedianFinder {
    List<Integer> sorted;

    public MedianFinder() {
        sorted = new ArrayList<>();
    }

    public void addNum(int num) {
        int pos = Collections.binarySearch(sorted, num);
        if (pos < 0) pos = -(pos + 1);
        sorted.add(pos, num);
    }

    public double findMedian() {
        int n = sorted.size();
        if (n % 2 == 1) return sorted.get(n / 2);
        return (sorted.get(n / 2 - 1) + sorted.get(n / 2)) / 2.0;
    }
}`,

      cppCode: `class MedianFinder {
    vector<int> sorted;
public:
    MedianFinder() {}

    void addNum(int num) {
        auto pos = lower_bound(sorted.begin(), sorted.end(), num);
        sorted.insert(pos, num);
    }

    double findMedian() {
        int n = sorted.size();
        if (n % 2 == 1) return sorted[n / 2];
        return (sorted[n / 2 - 1] + sorted[n / 2]) / 2.0;
    }
};`,

      pythonCode: `class MedianFinder:
    def __init__(self):
        self.sorted = []

    def addNum(self, num: int) -> None:
        bisect.insort(self.sorted, num)

    def findMedian(self) -> float:
        n = len(self.sorted)
        if n % 2 == 1:
            return self.sorted[n // 2]
        return (self.sorted[n // 2 - 1] + self.sorted[n // 2]) / 2.0`,

      lineAnnotations: {
        4: "Initialize empty sorted list",
        8: "Binary search for insertion position",
        10: "Insert at correct position (O(n) shift)",
        14: "If odd count, return middle element",
        15: "If even count, average two middle elements",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { operations: ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"], args: [[],[1],[2],[],[3],[]] },
          expectedOutput: "[null,null,null,1.5,null,2.0]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4],
              shortLabel: "Init",
              explanation: "Create empty sorted list.",
              variables: { sorted: "[]" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 10],
              shortLabel: "addNum(1)",
              explanation: "Insert 1 into sorted list. sorted = [1].",
              variables: { sorted: "[1]", num: 1 },
              dataStructure: { heap: [1], heapLabels: ["1"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 10],
              shortLabel: "addNum(2)",
              explanation: "Insert 2 into sorted list. sorted = [1, 2].",
              variables: { sorted: "[1, 2]", num: 2 },
              dataStructure: { heap: [1, 2], heapLabels: ["1", "2"], heapHighlight: 1 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [14, 15],
              shortLabel: "findMedian() → 1.5",
              explanation: "n=2 (even). Median = (sorted[0] + sorted[1]) / 2 = (1 + 2) / 2 = 1.5.",
              variables: { n: 2, median: 1.5 },
              dataStructure: { heap: [1, 2], heapLabels: ["1", "2"], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 10],
              shortLabel: "addNum(3)",
              explanation: "Insert 3 into sorted list. sorted = [1, 2, 3].",
              variables: { sorted: "[1, 2, 3]", num: 3 },
              dataStructure: { heap: [1, 2, 3], heapLabels: ["1", "2", "3"], heapHighlight: 2 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14],
              shortLabel: "findMedian() → 2.0",
              explanation: "n=3 (odd). Median = sorted[1] = 2. Return 2.0.",
              variables: { n: 3, median: 2.0, answer: "[null,null,null,1.5,null,2.0]" },
              dataStructure: { heap: [1, 2, 3], heapLabels: ["1", "2", "3"], heapHighlight: 1 },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations, args }) {
        const steps = [];
        const sorted = [];

        for (let op = 0; op < operations.length; op++) {
          const name = operations[op];
          const a = args[op];

          if (name === "MedianFinder") {
            steps.push({
              stepId: steps.length, lineNumbers: [4],
              shortLabel: "Init",
              explanation: "Create empty sorted list.",
              variables: { sorted: "[]" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {}, isAnswer: false,
            });
          } else if (name === "addNum") {
            const num = a[0];
            let pos = 0;
            while (pos < sorted.length && sorted[pos] < num) pos++;
            sorted.splice(pos, 0, num);
            steps.push({
              stepId: steps.length, lineNumbers: [8, 10],
              shortLabel: `addNum(${num})`,
              explanation: `Insert ${num} at position ${pos}. sorted = [${sorted.join(", ")}].`,
              variables: { sorted: `[${sorted.join(", ")}]`, num },
              dataStructure: { heap: [...sorted], heapLabels: sorted.map(String), heapHighlight: pos },
              delta: {}, isAnswer: false,
            });
          } else if (name === "findMedian") {
            const n = sorted.length;
            const median = n % 2 === 1 ? sorted[Math.floor(n / 2)] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
            const isLast = op === operations.length - 1;
            steps.push({
              stepId: steps.length, lineNumbers: n % 2 === 1 ? [14] : [14, 15],
              shortLabel: `findMedian() → ${median}`,
              explanation: `n=${n} (${n % 2 === 1 ? "odd" : "even"}). Median = ${median}.`,
              variables: { n, median, ...(isLast ? { answer: median } : {}) },
              dataStructure: { heap: [...sorted], heapLabels: sorted.map(String), heapHighlight: Math.floor(n / 2) },
              delta: {}, isAnswer: isLast,
            });
          }
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Two Heaps (Max Heap + Min Heap)",
      tier: "optimal",
      timeComplexity: "O(log n) per addNum, O(1) per findMedian",
      spaceComplexity: "O(n)",
      idea: `Maintain a max heap (left half) and a min heap (right half). On addNum: push to
        max heap, move max heap's top to min heap, then rebalance if min heap is larger. Median
        is max heap's top (odd count) or average of both tops (even count).`,

      javaCode: `class MedianFinder {
    PriorityQueue<Integer> maxHeap;  // left half (smaller values)
    PriorityQueue<Integer> minHeap;  // right half (larger values)

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());

        if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,

      cppCode: `class MedianFinder {
    priority_queue<int> maxHeap;
    priority_queue<int, vector<int>, greater<int>> minHeap;
public:
    MedianFinder() {}

    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top());
        maxHeap.pop();

        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }

    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        }
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};`,

      pythonCode: `class MedianFinder:
    def __init__(self):
        self.max_heap = []  # left half (negated for max heap)
        self.min_heap = []  # right half

    def addNum(self, num: int) -> None:
        heapq.heappush(self.max_heap, -num)
        heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))

        if len(self.min_heap) > len(self.max_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))

    def findMedian(self) -> float:
        if len(self.max_heap) > len(self.min_heap):
            return -self.max_heap[0]
        return (-self.max_heap[0] + self.min_heap[0]) / 2.0`,

      lineAnnotations: {
        2: "Max heap: stores the smaller half (left of median)",
        3: "Min heap: stores the larger half (right of median)",
        10: "Step 1: Push new number to max heap",
        11: "Step 2: Move max heap's top to min heap (ensures ordering)",
        13: "Step 3: Rebalance — max heap should be >= min heap in size",
        19: "Odd total: median is max heap's top",
        22: "Even total: median is average of both tops",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Add numbers one by one and find median",
          input: { operations: ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"], args: [[],[1],[2],[],[3],[]] },
          expectedOutput: "[null,null,null,1.5,null,2.0]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6, 7],
              shortLabel: "Init two heaps",
              explanation: "Create empty max heap (left half) and min heap (right half). Max heap will always have size >= min heap.",
              variables: { maxHeap: "[]", minHeap: "[]" },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                auxHeap: [],
                auxHeapLabels: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10],
              shortLabel: "addNum(1): push 1 to maxHeap",
              explanation: "Push 1 to max heap. maxHeap = [1].",
              variables: { num: 1, maxHeap: "[1]", minHeap: "[]" },
              dataStructure: {
                heap: [1],
                heapLabels: ["maxH:1"],
                heapHighlight: 0,
                auxHeap: [],
                auxHeapLabels: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11],
              shortLabel: "Move maxHeap top → minHeap",
              explanation: "Pop 1 from maxHeap, push to minHeap. maxHeap = [], minHeap = [1].",
              variables: { maxHeap: "[]", minHeap: "[1]" },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                auxHeap: [1],
                auxHeapLabels: ["minH:1"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [13, 14],
              shortLabel: "Rebalance: minHeap larger",
              explanation: "minHeap.size()=1 > maxHeap.size()=0. Move minHeap top (1) back to maxHeap. maxHeap = [1], minHeap = [].",
              variables: { maxHeap: "[1]", minHeap: "[]", sizes: "1 vs 0" },
              dataStructure: {
                heap: [1],
                heapLabels: ["maxH:1"],
                heapHighlight: 0,
                auxHeap: [],
                auxHeapLabels: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10],
              shortLabel: "addNum(2): push 2 to maxHeap",
              explanation: "Push 2 to max heap. maxHeap = [2, 1].",
              variables: { num: 2, maxHeap: "[2, 1]", minHeap: "[]" },
              dataStructure: {
                heap: [2, 1],
                heapLabels: ["maxH:2", "maxH:1"],
                heapHighlight: 0,
                auxHeap: [],
                auxHeapLabels: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11],
              shortLabel: "Move maxHeap top (2) → minHeap",
              explanation: "Pop 2 from maxHeap, push to minHeap. maxHeap = [1], minHeap = [2]. Now left half has smaller values, right has larger.",
              variables: { maxHeap: "[1]", minHeap: "[2]" },
              dataStructure: {
                heap: [1],
                heapLabels: ["maxH:1"],
                heapHighlight: null,
                auxHeap: [2],
                auxHeapLabels: ["minH:2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13],
              shortLabel: "Sizes equal — no rebalance",
              explanation: "maxHeap.size()=1 == minHeap.size()=1. Balanced. No move needed.",
              variables: { maxHeap: "[1]", minHeap: "[2]", sizes: "1 vs 1" },
              dataStructure: {
                heap: [1],
                heapLabels: ["maxH:1"],
                heapHighlight: null,
                auxHeap: [2],
                auxHeapLabels: ["minH:2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [19, 22],
              shortLabel: "findMedian() → 1.5",
              explanation: "Even count (1+1=2). Median = (maxHeap.top + minHeap.top) / 2 = (1 + 2) / 2 = 1.5.",
              variables: { "maxHeap.top": 1, "minHeap.top": 2, median: 1.5 },
              dataStructure: {
                heap: [1],
                heapLabels: ["maxH:1"],
                heapHighlight: 0,
                auxHeap: [2],
                auxHeapLabels: ["minH:2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [10],
              shortLabel: "addNum(3): push 3 to maxHeap",
              explanation: "Push 3 to max heap. maxHeap = [3, 1].",
              variables: { num: 3, maxHeap: "[3, 1]", minHeap: "[2]" },
              dataStructure: {
                heap: [3, 1],
                heapLabels: ["maxH:3", "maxH:1"],
                heapHighlight: 0,
                auxHeap: [2],
                auxHeapLabels: ["minH:2"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [11],
              shortLabel: "Move maxHeap top (3) → minHeap",
              explanation: "Pop 3 from maxHeap, push to minHeap. maxHeap = [1], minHeap = [2, 3].",
              variables: { maxHeap: "[1]", minHeap: "[2, 3]" },
              dataStructure: {
                heap: [1],
                heapLabels: ["maxH:1"],
                heapHighlight: null,
                auxHeap: [2, 3],
                auxHeapLabels: ["minH:2", "minH:3"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [13, 14],
              shortLabel: "Rebalance: move minHeap top (2) → maxHeap",
              explanation: "minHeap.size()=2 > maxHeap.size()=1. Move 2 from minHeap to maxHeap. maxHeap = [2, 1], minHeap = [3].",
              variables: { maxHeap: "[2, 1]", minHeap: "[3]", sizes: "2 vs 1" },
              dataStructure: {
                heap: [2, 1],
                heapLabels: ["maxH:2", "maxH:1"],
                heapHighlight: 0,
                auxHeap: [3],
                auxHeapLabels: ["minH:3"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [19, 20],
              shortLabel: "findMedian() → 2.0",
              explanation: "Odd count (2+1=3). maxHeap is larger. Median = maxHeap.top = 2. Stream is [1, 2, 3], median is indeed 2.",
              variables: { "maxHeap.top": 2, median: 2.0, answer: "[null,null,null,1.5,null,2.0]" },
              dataStructure: {
                heap: [2, 1],
                heapLabels: ["maxH:2", "maxH:1"],
                heapHighlight: 0,
                auxHeap: [3],
                auxHeapLabels: ["minH:3"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Descending Order",
          description: "Numbers arrive in decreasing order",
          input: { operations: ["MedianFinder","addNum","addNum","addNum","findMedian"], args: [[],[3],[2],[1],[]] },
          expectedOutput: "[null,null,null,null,2.0]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6, 7],
              shortLabel: "Init",
              explanation: "Empty heaps.",
              variables: { maxHeap: "[]", minHeap: "[]" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null, auxHeap: [], auxHeapLabels: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11, 13, 14],
              shortLabel: "addNum(3)",
              explanation: "Push 3 to maxHeap → move top(3) to minHeap → rebalance (minHeap larger, move 3 back). maxHeap=[3], minHeap=[].",
              variables: { maxHeap: "[3]", minHeap: "[]" },
              dataStructure: { heap: [3], heapLabels: ["maxH:3"], heapHighlight: 0, auxHeap: [], auxHeapLabels: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11, 13],
              shortLabel: "addNum(2)",
              explanation: "Push 2 to maxHeap=[3,2] → move top(3) to minHeap. maxHeap=[2], minHeap=[3]. Balanced.",
              variables: { maxHeap: "[2]", minHeap: "[3]" },
              dataStructure: { heap: [2], heapLabels: ["maxH:2"], heapHighlight: 0, auxHeap: [3], auxHeapLabels: ["minH:3"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11, 13, 14],
              shortLabel: "addNum(1)",
              explanation: "Push 1 to maxHeap=[2,1] → move top(2) to minHeap=[2,3]. minHeap larger → move top(2) back. maxHeap=[2,1], minHeap=[3].",
              variables: { maxHeap: "[2, 1]", minHeap: "[3]" },
              dataStructure: { heap: [2, 1], heapLabels: ["maxH:2", "maxH:1"], heapHighlight: 0, auxHeap: [3], auxHeapLabels: ["minH:3"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [19, 20],
              shortLabel: "findMedian() → 2.0",
              explanation: "Odd count (2+1=3). maxHeap larger. Median = maxHeap.top = 2. Stream [3,2,1] sorted is [1,2,3], median = 2.",
              variables: { median: 2.0, answer: 2.0 },
              dataStructure: { heap: [2, 1], heapLabels: ["maxH:2", "maxH:1"], heapHighlight: 0, auxHeap: [3], auxHeapLabels: ["minH:3"] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations, args }) {
        const steps = [];
        const maxHeap = []; // simulated as sorted desc
        const minHeap = []; // simulated as sorted asc

        const maxPush = (v) => { maxHeap.push(v); maxHeap.sort((a, b) => b - a); };
        const maxPop = () => maxHeap.shift();
        const minPush = (v) => { minHeap.push(v); minHeap.sort((a, b) => a - b); };
        const minPop = () => minHeap.shift();

        for (let op = 0; op < operations.length; op++) {
          const name = operations[op];
          const a = args[op];

          if (name === "MedianFinder") {
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6, 7],
              shortLabel: "Init",
              explanation: "Create empty max heap and min heap.",
              variables: { maxHeap: "[]", minHeap: "[]" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null, auxHeap: [], auxHeapLabels: [] },
              delta: {}, isAnswer: false,
            });
          } else if (name === "addNum") {
            const num = a[0];
            maxPush(num);
            const moved = maxPop();
            minPush(moved);

            let rebalanced = false;
            if (minHeap.length > maxHeap.length) {
              const back = minPop();
              maxPush(back);
              rebalanced = true;
            }

            steps.push({
              stepId: steps.length, lineNumbers: rebalanced ? [10, 11, 13, 14] : [10, 11, 13],
              shortLabel: `addNum(${num})`,
              explanation: `Push ${num} to maxHeap, move top(${moved}) to minHeap.${rebalanced ? " Rebalance: move minHeap top back." : " Balanced."} maxHeap=[${maxHeap.join(",")}], minHeap=[${minHeap.join(",")}].`,
              variables: { num, maxHeap: `[${maxHeap.join(", ")}]`, minHeap: `[${minHeap.join(", ")}]` },
              dataStructure: {
                heap: [...maxHeap], heapLabels: maxHeap.map(v => `maxH:${v}`), heapHighlight: 0,
                auxHeap: [...minHeap], auxHeapLabels: minHeap.map(v => `minH:${v}`),
              },
              delta: {}, isAnswer: false,
            });
          } else if (name === "findMedian") {
            const total = maxHeap.length + minHeap.length;
            const median = maxHeap.length > minHeap.length ? maxHeap[0] : (maxHeap[0] + minHeap[0]) / 2;
            const isLast = op === operations.length - 1;
            steps.push({
              stepId: steps.length, lineNumbers: maxHeap.length > minHeap.length ? [19, 20] : [19, 22],
              shortLabel: `findMedian() → ${median}`,
              explanation: `${total % 2 === 1 ? "Odd" : "Even"} count. Median = ${median}.`,
              variables: { median, ...(isLast ? { answer: median } : {}) },
              dataStructure: {
                heap: [...maxHeap], heapLabels: maxHeap.map(v => `maxH:${v}`), heapHighlight: 0,
                auxHeap: [...minHeap], auxHeapLabels: minHeap.map(v => `minH:${v}`),
              },
              delta: {}, isAnswer: isLast,
            });
          }
        }
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n) per addNum", space: "O(n)", explanation: "Binary search is O(log n) but shifting elements is O(n)" },
    optimal: { time: "O(log n) per addNum, O(1) per findMedian", space: "O(n)", explanation: "Heap push/pop is O(log n). Median is always at heap tops.", tradeoff: "Two heaps trade simplicity for O(log n) insertion vs O(n) sorted insertion" },
  },

  interviewTips: [
    "Immediately mention the 'two heaps' pattern — it's a classic signal of preparedness.",
    "Explain the invariant: max heap top <= min heap top, and sizes differ by at most 1.",
    "Walk through the 3-step add process: push to max, move to min, rebalance.",
    "Clarify: Python's heapq is a min heap, so negate values for max heap behavior.",
    "Mention follow-up: if all numbers are in [0, 100], you could use a counting array for O(1) per operation.",
  ],

  relatedProblems: ["kth-largest-stream", "sliding-window-maximum"],
};
