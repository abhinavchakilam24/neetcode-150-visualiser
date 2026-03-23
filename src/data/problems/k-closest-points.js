export const kClosestPoints = {
  id: 66,
  slug: "k-closest-points",
  title: "K Closest Points to Origin",
  difficulty: "Medium",
  topic: "heap-priority-queue",
  topicLabel: "Heap / Priority Queue",
  neetcodeNumber: 66,
  artifactType: "Heap",
  companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/k-closest-points-to-origin/",

  pattern: "Max-Heap of Size K for Top-K Selection",
  patternExplanation: `When selecting the K smallest (or largest) elements from a collection,
    maintain a heap of size K. A max-heap of size K naturally evicts the largest element when
    it overflows, leaving only the K smallest elements at the end.`,

  intuition: {
    coreInsight: `We need the K closest points to the origin. Distance is sqrt(x^2 + y^2), but
      since sqrt is monotonic, we can just compare x^2 + y^2 directly. Sorting all N points
      works but is O(N log N). Instead, maintain a max-heap of size K: as we scan points, if the
      heap has fewer than K elements, add. If the current point is closer than the heap's max
      (the farthest of the K closest so far), pop the max and push the current point. The heap
      always holds exactly the K closest points seen so far.`,

    mentalModel: `Imagine you're a coach selecting the 3 fastest runners from 100 tryouts.
      You keep a "slow board" showing the 3 best times so far, sorted so the slowest of the
      three is on top. Each new runner's time is compared to the slowest on the board. If the
      new runner is faster, they replace the slowest. After all tryouts, the board shows your
      3 fastest. The max-heap IS that board — it always exposes the weakest of your top K for
      easy comparison and replacement.`,

    whyNaiveFails: `Sorting all N points by distance takes O(N log N). For K << N (e.g., K=10,
      N=1,000,000), that's wasteful — we're fully ordering a million elements when we only need
      the top 10. A max-heap of size K processes each element in O(log K) time, giving
      O(N log K) total, which is much faster when K is small.`,

    keyObservation: `Use a MAX-heap of size K, not a min-heap. This seems counterintuitive since
      we want the K smallest distances. But the max-heap lets us efficiently compare each new
      point against the WORST of our current top K. If the new point is closer than the worst,
      we swap. After processing all points, the heap contains exactly the K closest.`,
  },

  problem: `Given an array of points where points[i] = [xi, yi] represents a point on the
    X-Y plane and an integer k, return the k closest points to the origin (0, 0). The distance
    between two points on the X-Y plane is the Euclidean distance sqrt(xi^2 + yi^2). You may
    return the answer in any order. The answer is guaranteed to be unique (except for the order).`,

  examples: [
    { input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]", explanation: "Distance of (1,3) = sqrt(10), distance of (-2,2) = sqrt(8). Closest is (-2,2)." },
    { input: "points = [[3,3],[5,-1],[-2,4]], k = 2", output: "[[3,3],[-2,4]]", explanation: "Distances: sqrt(18), sqrt(26), sqrt(20). Two closest: (3,3) and (-2,4)." },
  ],

  constraints: [
    "1 <= k <= points.length <= 10^4",
    "-10^4 <= xi, yi <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Sort by Distance",
      tier: "brute",
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      idea: "Compute distance for every point, sort all points by distance, return the first K.",

      javaCode: `public int[][] kClosest(int[][] points, int k) {
    Arrays.sort(points, (a, b) ->
        (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
    return Arrays.copyOfRange(points, 0, k);
}`,

      cppCode: `vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    sort(points.begin(), points.end(), [](auto& a, auto& b) {
        return a[0]*a[0] + a[1]*a[1] < b[0]*b[0] + b[1]*b[1];
    });
    return vector<vector<int>>(points.begin(), points.begin() + k);
}`,

      pythonCode: `def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
    points.sort(key=lambda p: p[0]**2 + p[1]**2)
    return points[:k]`,

      lineAnnotations: {
        2: "Sort all points by squared Euclidean distance",
        3: "Compare distances without sqrt (monotonic)",
        4: "Return the first K points (closest)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { points: [[1,3],[-2,2],[5,1]], k: 2 },
          expectedOutput: "[[-2,2],[1,3]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Compute distances",
              explanation: "Calculate squared distances: (1,3)=10, (-2,2)=8, (5,1)=26. We'll sort by these values.",
              variables: { k: 2, distances: "[10, 8, 26]" },
              dataStructure: {
                heap: [],
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [2, 3],
              shortLabel: "Sort by distance",
              explanation: "After sorting: [(-2,2), (1,3), (5,1)] with distances [8, 10, 26].",
              variables: { k: 2, sorted: "[(-2,2), (1,3), (5,1)]" },
              dataStructure: {
                heap: [],
                arrayStates: { 0: "active", 1: "active", 2: "default" },
                pointers: [],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4],
              shortLabel: "Return first K=2",
              explanation: "Return the first 2 points from sorted array: [(-2,2), (1,3)]. These are the 2 closest to origin.",
              variables: { k: 2, answer: "[[-2,2],[1,3]]" },
              dataStructure: {
                heap: [],
                arrayStates: { 0: "found", 1: "found", 2: "eliminated" },
                pointers: [],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ points, k }) {
        const steps = [];
        const dists = points.map(p => p[0]*p[0] + p[1]*p[1]);
        const defaultStates = () => Object.fromEntries(points.map((_, i) => [i, "default"]));

        steps.push({
          stepId: 0, lineNumbers: [1],
          shortLabel: "Compute distances",
          explanation: `Calculate squared distances for all ${points.length} points.`,
          variables: { k, distances: JSON.stringify(dists) },
          dataStructure: { heap: [], arrayStates: defaultStates(), pointers: [] },
          delta: {}, isAnswer: false,
        });

        const indexed = points.map((p, i) => ({ p, d: dists[i], origIdx: i }));
        indexed.sort((a, b) => a.d - b.d);

        steps.push({
          stepId: 1, lineNumbers: [2, 3],
          shortLabel: "Sort by distance",
          explanation: `Sorted points by distance. First ${k} are closest.`,
          variables: { k, sorted: JSON.stringify(indexed.map(x => x.p)) },
          dataStructure: {
            heap: [],
            arrayStates: Object.fromEntries(indexed.map((x, i) => [x.origIdx, i < k ? "active" : "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: false,
        });

        const answer = indexed.slice(0, k).map(x => x.p);
        steps.push({
          stepId: 2, lineNumbers: [4],
          shortLabel: `Return first K=${k}`,
          explanation: `Return the ${k} closest points: ${JSON.stringify(answer)}.`,
          variables: { k, answer: JSON.stringify(answer) },
          dataStructure: {
            heap: [],
            arrayStates: Object.fromEntries(indexed.map((x, i) => [x.origIdx, i < k ? "found" : "eliminated"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Max-Heap of Size K",
      tier: "optimal",
      timeComplexity: "O(N log K)",
      spaceComplexity: "O(K)",
      idea: `Maintain a max-heap of size K. For each point, if the heap has fewer than K elements,
        add it. Otherwise, if the current point's distance is less than the heap's max, pop the max
        and push the current point. After all points, the heap contains the K closest.`,

      javaCode: `public int[][] kClosest(int[][] points, int k) {
    PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
        (a, b) -> (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1]));

    for (int[] point : points) {
        maxHeap.offer(point);
        if (maxHeap.size() > k) {
            maxHeap.poll();
        }
    }

    int[][] result = new int[k][2];
    for (int i = 0; i < k; i++) {
        result[i] = maxHeap.poll();
    }
    return result;
}`,

      cppCode: `vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    auto cmp = [](vector<int>& a, vector<int>& b) {
        return a[0]*a[0] + a[1]*a[1] < b[0]*b[0] + b[1]*b[1];
    };
    priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> maxHeap(cmp);

    for (auto& point : points) {
        maxHeap.push(point);
        if (maxHeap.size() > k) {
            maxHeap.pop();
        }
    }

    vector<vector<int>> result;
    while (!maxHeap.empty()) {
        result.push_back(maxHeap.top());
        maxHeap.pop();
    }
    return result;
}`,

      pythonCode: `def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
    max_heap = []

    for x, y in points:
        dist = -(x * x + y * y)
        heapq.heappush(max_heap, (dist, x, y))
        if len(max_heap) > k:
            heapq.heappop(max_heap)

    return [[x, y] for _, x, y in max_heap]`,

      lineAnnotations: {
        2: "Max-heap: largest distance on top for easy eviction",
        3: "Comparator reverses natural order for max-heap behavior",
        5: "Iterate through every point",
        6: "Push current point into the max-heap",
        7: "If heap exceeds size K...",
        8: "...evict the farthest point (heap max)",
        12: "Extract remaining K points from the heap",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Find 2 closest points from 4 candidates",
          input: { points: [[3,3],[5,-1],[-2,4],[1,1]], k: 2 },
          expectedOutput: "[[1,1],[3,3]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init max-heap",
              explanation: "Create an empty max-heap. It will hold at most K=2 points, ordered by distance so the farthest point is on top.",
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
              lineNumbers: [5, 6],
              shortLabel: "Push (3,3) dist=18",
              explanation: "Point (3,3) has squared distance 9+9=18. Heap size is 0 < K=2, so we simply push it. Heap now has 1 element.",
              variables: { point: "(3,3)", dist: 18, k: 2, heapSize: 1, heap: "[(3,3):18]" },
              dataStructure: {
                heap: [{ value: "(3,3)", priority: 18, state: "active" }],
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "current", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6],
              shortLabel: "Push (5,-1) dist=26",
              explanation: "Point (5,-1) has squared distance 25+1=26. Heap size is 1 < K=2, so push. Heap now has 2 elements. (5,-1) is farthest, so it's the heap max.",
              variables: { point: "(5,-1)", dist: 26, k: 2, heapSize: 2, heap: "[(5,-1):26, (3,3):18]" },
              dataStructure: {
                heap: [
                  { value: "(5,-1)", priority: 26, state: "active" },
                  { value: "(3,3)", priority: 18, state: "default" },
                ],
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "current", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6],
              shortLabel: "Push (-2,4) dist=20",
              explanation: "Point (-2,4) has squared distance 4+16=20. Push into heap. Heap now has 3 elements, which exceeds K=2.",
              variables: { point: "(-2,4)", dist: 20, k: 2, heapSize: 3, heap: "[(5,-1):26, (3,3):18, (-2,4):20]" },
              dataStructure: {
                heap: [
                  { value: "(5,-1)", priority: 26, state: "default" },
                  { value: "(3,3)", priority: 18, state: "default" },
                  { value: "(-2,4)", priority: 20, state: "active" },
                ],
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default" },
                pointers: [{ name: "current", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8],
              shortLabel: "Evict (5,-1) dist=26",
              explanation: "Heap size 3 > K=2. Pop the max: (5,-1) with distance 26. It's the farthest — not in our top 2. Heap now has [(3,3):18, (-2,4):20].",
              variables: { evicted: "(5,-1)", dist: 26, k: 2, heapSize: 2, heap: "[(-2,4):20, (3,3):18]" },
              dataStructure: {
                heap: [
                  { value: "(-2,4)", priority: 20, state: "default" },
                  { value: "(3,3)", priority: 18, state: "default" },
                ],
                arrayStates: { 0: "visited", 1: "eliminated", 2: "visited", 3: "default" },
                pointers: [],
                stackOperation: "pop",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6],
              shortLabel: "Push (1,1) dist=2",
              explanation: "Point (1,1) has squared distance 1+1=2. Push into heap. Heap now has 3 elements, exceeding K=2.",
              variables: { point: "(1,1)", dist: 2, k: 2, heapSize: 3, heap: "[(-2,4):20, (3,3):18, (1,1):2]" },
              dataStructure: {
                heap: [
                  { value: "(-2,4)", priority: 20, state: "default" },
                  { value: "(3,3)", priority: 18, state: "default" },
                  { value: "(1,1)", priority: 2, state: "active" },
                ],
                arrayStates: { 0: "visited", 1: "eliminated", 2: "visited", 3: "active" },
                pointers: [{ name: "current", index: 3, color: "pointer" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [7, 8],
              shortLabel: "Evict (-2,4) dist=20",
              explanation: "Heap size 3 > K=2. Pop the max: (-2,4) with distance 20. Heap now has [(3,3):18, (1,1):2]. These are the 2 closest!",
              variables: { evicted: "(-2,4)", dist: 20, k: 2, heapSize: 2, heap: "[(3,3):18, (1,1):2]" },
              dataStructure: {
                heap: [
                  { value: "(3,3)", priority: 18, state: "default" },
                  { value: "(1,1)", priority: 2, state: "default" },
                ],
                arrayStates: { 0: "visited", 1: "eliminated", 2: "eliminated", 3: "visited" },
                pointers: [],
                stackOperation: "pop",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [12, 13, 14],
              shortLabel: "Return [(1,1),(3,3)]",
              explanation: "All points processed. Extract heap contents: [(1,1), (3,3)] — the 2 closest points to origin with distances 2 and 18.",
              variables: { answer: "[[1,1],[3,3]]" },
              dataStructure: {
                heap: [
                  { value: "(3,3)", priority: 18, state: "found" },
                  { value: "(1,1)", priority: 2, state: "found" },
                ],
                arrayStates: { 0: "found", 1: "eliminated", 2: "eliminated", 3: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "K equals N",
          description: "K equals array length — all points are in the answer",
          input: { points: [[1,0],[0,1]], k: 2 },
          expectedOutput: "[[1,0],[0,1]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init max-heap",
              explanation: "Create empty max-heap with K=2. Since there are exactly 2 points and K=2, all points will be in the answer.",
              variables: { k: 2, heapSize: 0, heap: "[]" },
              dataStructure: {
                heap: [],
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Push (1,0) dist=1",
              explanation: "Point (1,0) has squared distance 1. Heap size 0 < K=2, so push directly.",
              variables: { point: "(1,0)", dist: 1, k: 2, heapSize: 1 },
              dataStructure: {
                heap: [{ value: "(1,0)", priority: 1, state: "active" }],
                arrayStates: { 0: "active", 1: "default" },
                pointers: [{ name: "current", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6],
              shortLabel: "Push (0,1) dist=1",
              explanation: "Point (0,1) has squared distance 1. Heap size 1 < K=2, so push directly. Both points now in heap.",
              variables: { point: "(0,1)", dist: 1, k: 2, heapSize: 2 },
              dataStructure: {
                heap: [
                  { value: "(1,0)", priority: 1, state: "default" },
                  { value: "(0,1)", priority: 1, state: "active" },
                ],
                arrayStates: { 0: "visited", 1: "active" },
                pointers: [{ name: "current", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 14],
              shortLabel: "Return both points",
              explanation: "All points processed. Heap never exceeded K=2, so no evictions occurred. Return [[1,0],[0,1]].",
              variables: { answer: "[[1,0],[0,1]]" },
              dataStructure: {
                heap: [
                  { value: "(1,0)", priority: 1, state: "found" },
                  { value: "(0,1)", priority: 1, state: "found" },
                ],
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ points, k }) {
        const steps = [];
        const dist = (p) => p[0]*p[0] + p[1]*p[1];
        const defaultStates = () => Object.fromEntries(points.map((_, i) => [i, "default"]));

        // Max-heap simulation using sorted array (max on top)
        let heap = []; // [{point, d, origIdx}]

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init max-heap",
          explanation: `Create empty max-heap. It will hold at most K=${k} points.`,
          variables: { k, heapSize: 0, heap: "[]" },
          dataStructure: { heap: [], arrayStates: defaultStates(), pointers: [] },
          delta: {}, isAnswer: false,
        });

        const pointStates = points.map(() => "default");

        for (let i = 0; i < points.length; i++) {
          const d = dist(points[i]);
          heap.push({ point: points[i], d, origIdx: i });
          heap.sort((a, b) => b.d - a.d); // max on top
          pointStates[i] = "active";

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6],
            shortLabel: `Push (${points[i]}) dist=${d}`,
            explanation: `Point (${points[i]}) has squared distance ${d}. Push into heap. Heap size: ${heap.length}.`,
            variables: { point: `(${points[i]})`, dist: d, k, heapSize: heap.length },
            dataStructure: {
              heap: heap.map((h, idx) => ({ value: `(${h.point})`, priority: h.d, state: idx === heap.length - 1 ? "active" : "default" })),
              arrayStates: Object.fromEntries(pointStates.map((s, idx) => [idx, s])),
              pointers: [{ name: "current", index: i, color: "pointer" }],
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });

          if (heap.length > k) {
            const evicted = heap.shift(); // remove max
            pointStates[evicted.origIdx] = "eliminated";

            steps.push({
              stepId: steps.length, lineNumbers: [7, 8],
              shortLabel: `Evict (${evicted.point}) dist=${evicted.d}`,
              explanation: `Heap size ${heap.length + 1} > K=${k}. Evict max: (${evicted.point}) with distance ${evicted.d}.`,
              variables: { evicted: `(${evicted.point})`, dist: evicted.d, k, heapSize: heap.length },
              dataStructure: {
                heap: heap.map(h => ({ value: `(${h.point})`, priority: h.d, state: "default" })),
                arrayStates: Object.fromEntries(pointStates.map((s, idx) => [idx, s])),
                pointers: [],
                stackOperation: "pop",
              },
              delta: { changedIndices: [evicted.origIdx] }, isAnswer: false,
            });
          }

          pointStates[i] = pointStates[i] === "eliminated" ? "eliminated" : "visited";
        }

        const answer = heap.map(h => h.point);
        for (const h of heap) pointStates[h.origIdx] = "found";

        steps.push({
          stepId: steps.length, lineNumbers: [12, 13, 14],
          shortLabel: `Return ${k} closest`,
          explanation: `All points processed. Heap contains the ${k} closest: ${JSON.stringify(answer)}.`,
          variables: { answer: JSON.stringify(answer) },
          dataStructure: {
            heap: heap.map(h => ({ value: `(${h.point})`, priority: h.d, state: "found" })),
            arrayStates: Object.fromEntries(pointStates.map((s, idx) => [idx, s])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(N log N)", space: "O(N)", explanation: "Sorting all N points" },
    optimal: { time: "O(N log K)", space: "O(K)", explanation: "Each of N points inserted/removed from size-K heap in O(log K)", tradeoff: "When K << N, O(N log K) is significantly faster than O(N log N)" },
  },

  interviewTips: [
    "Clarify: can you compare squared distances instead of actual distances? Yes — sqrt is monotonic.",
    "Mention the sort approach first as the simple baseline, then optimize with a heap.",
    "Explain why max-heap of size K (not min-heap of size N) is optimal: O(N log K) vs O(N log N).",
    "An alternative O(N) average-case approach is Quickselect, but it's O(N^2) worst case.",
    "Ask: does the output order matter? Usually no — mention this.",
  ],

  relatedProblems: ["kth-largest-array", "top-k-frequent-elements", "kth-largest-stream"],
};
