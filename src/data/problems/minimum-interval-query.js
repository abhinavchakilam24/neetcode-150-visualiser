export const minimumIntervalQuery = {
  id: 134,
  slug: "minimum-interval-query",
  title: "Minimum Interval to Include Each Query",
  difficulty: "Hard",
  topic: "intervals",
  topicLabel: "Intervals",
  neetcodeNumber: 134,
  artifactType: "ArrayHashMap",
  companies: ["Google", "Amazon", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/minimum-interval-to-include-each-query/",

  pattern: "Sort + Min-Heap Sweep",
  patternExplanation: `Sort intervals by start and queries by value. Sweep through queries in order,
    adding all intervals that start before or at the query, removing expired ones, and taking
    the smallest from a min-heap.`,

  intuition: {
    coreInsight: `For each query value q, we need the smallest interval [l, r] containing q.
      By sorting both intervals and queries, we can process queries in order and maintain a
      min-heap of active intervals. As queries increase, we add new intervals (those starting
      ≤ q) and remove expired intervals (those ending < q). The heap's top is the answer.`,

    mentalModel: `Imagine a timeline. Intervals are bridges spanning sections of it. Queries are
      points on the timeline. You walk along the timeline from left to right. As you reach each
      point, you add all bridges that have started by now, remove bridges you've walked past,
      and among the remaining bridges overhead, pick the shortest one.`,

    whyNaiveFails: `For each query, checking all intervals is O(n*m). With n=10^5 intervals and
      m=10^5 queries, that's 10^10 operations. The heap-based sweep processes each interval
      at most once (add + remove) and each query in O(log n).`,

    keyObservation: `Sort intervals by start, sort queries by value (keeping original indices).
      Use a min-heap keyed by interval size. For each query, push all intervals starting ≤ q.
      Pop intervals from heap that end < q (expired). The heap top gives the smallest containing
      interval.`,
  },

  problem: `You are given a 2D integer array intervals, where intervals[i] = [lefti, righti]
    describes the ith interval starting at lefti and ending at righti (inclusive). You are also
    given an integer array queries. The answer to the jth query is the size of the smallest
    interval i such that lefti <= queries[j] <= righti. If no such interval exists, the answer
    is -1. Return an array containing the answers to the queries.`,

  examples: [
    { input: "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]", output: "[3,3,1,4]", explanation: "Query 2 → [2,4] size 3; Query 3 → [2,4] size 3; Query 4 → [4,4] size 1; Query 5 → [3,6] size 4" },
    { input: "intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]", output: "[2,1,4,6]", explanation: "Query 2 → [2,3] size 2; Query 19 → -1; etc." },
  ],

  constraints: [
    "1 <= intervals.length <= 10^5",
    "1 <= queries.length <= 10^5",
    "intervals[i].length == 2",
    "1 <= lefti <= righti <= 10^7",
    "1 <= queries[j] <= 10^7",
  ],

  approaches: {
    brute: {
      label: "Check All Intervals",
      tier: "brute",
      timeComplexity: "O(n * m)",
      spaceComplexity: "O(m)",
      idea: "For each query, scan all intervals and find the smallest one containing the query.",

      javaCode: `public int[] minInterval(int[][] intervals, int[] queries) {
    int[] result = new int[queries.length];
    for (int i = 0; i < queries.length; i++) {
        int minSize = Integer.MAX_VALUE;
        for (int[] interval : intervals) {
            if (interval[0] <= queries[i] && queries[i] <= interval[1]) {
                minSize = Math.min(minSize, interval[1] - interval[0] + 1);
            }
        }
        result[i] = minSize == Integer.MAX_VALUE ? -1 : minSize;
    }
    return result;
}`,

      cppCode: `vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
    vector<int> result(queries.size());
    for (int i = 0; i < queries.size(); i++) {
        int minSize = INT_MAX;
        for (auto& interval : intervals) {
            if (interval[0] <= queries[i] && queries[i] <= interval[1]) {
                minSize = min(minSize, interval[1] - interval[0] + 1);
            }
        }
        result[i] = minSize == INT_MAX ? -1 : minSize;
    }
    return result;
}`,

      pythonCode: `def minInterval(intervals: List[List[int]], queries: List[int]) -> List[int]:
    result = []
    for q in queries:
        min_size = float('inf')
        for left, right in intervals:
            if left <= q <= right:
                min_size = min(min_size, right - left + 1)
        result.append(min_size if min_size != float('inf') else -1)
    return result`,

      lineAnnotations: {
        3: "For each query, scan all intervals",
        5: "Check if query falls within this interval",
        6: "Track the smallest containing interval",
        9: "No interval found → -1",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { intervals: [[1,4],[2,4],[3,6],[4,4]], queries: [2,3,4,5] },
          expectedOutput: "[3,3,1,4]",
          steps: [
            {
              stepId: 0, lineNumbers: [1], shortLabel: "Brute force scan",
              explanation: "For each of 4 queries, check all 4 intervals. 16 comparisons total.",
              variables: { n: 4, m: 4 },
              dataStructure: { arrayStates: {0:"default",1:"default",2:"default",3:"default"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [3, 5, 6], shortLabel: "Query 2: min=[2,4] size 3",
              explanation: "Query=2: [1,4] contains 2 (size 4), [2,4] contains 2 (size 3), [3,6] no, [4,4] no. Min size = 3.",
              variables: { query: 2, minSize: 3 },
              dataStructure: { arrayStates: {0:"active"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [9], shortLabel: "Result: [3,3,1,4]",
              explanation: "Q=2→3, Q=3→3, Q=4→1 (from [4,4]), Q=5→4 (from [3,6]).",
              variables: { answer: "[3,3,1,4]" },
              dataStructure: { arrayStates: {0:"found",1:"found",2:"found",3:"found"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ intervals, queries }) {
        const result = queries.map(q => {
          let min = Infinity;
          for (const [l, r] of intervals) {
            if (l <= q && q <= r) min = Math.min(min, r - l + 1);
          }
          return min === Infinity ? -1 : min;
        });
        return [
          { stepId: 0, lineNumbers: [1], shortLabel: "Brute force", explanation: `Check all ${intervals.length} intervals for each of ${queries.length} queries.`, variables: { n: intervals.length, m: queries.length }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [9], shortLabel: `Result: [${result.join(',')}]`, explanation: `Answer: [${result.join(',')}].`, variables: { answer: `[${result.join(',')}]` }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "Sort + Min-Heap Sweep",
      tier: "optimal",
      timeComplexity: "O((n + m) log n)",
      spaceComplexity: "O(n + m)",
      idea: `Sort intervals by start, sort queries (with indices). Sweep: for each query,
        push all starting intervals into a min-heap (by size), remove expired ones, read top.`,

      javaCode: `public int[] minInterval(int[][] intervals, int[] queries) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    int[][] sortedQ = new int[queries.length][2];
    for (int i = 0; i < queries.length; i++)
        sortedQ[i] = new int[]{queries[i], i};
    Arrays.sort(sortedQ, (a, b) -> a[0] - b[0]);

    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    int[] result = new int[queries.length];
    Arrays.fill(result, -1);
    int j = 0;

    for (int[] q : sortedQ) {
        while (j < intervals.length && intervals[j][0] <= q[0]) {
            int size = intervals[j][1] - intervals[j][0] + 1;
            heap.offer(new int[]{size, intervals[j][1]});
            j++;
        }
        while (!heap.isEmpty() && heap.peek()[1] < q[0]) {
            heap.poll();
        }
        if (!heap.isEmpty()) {
            result[q[1]] = heap.peek()[0];
        }
    }

    return result;
}`,

      cppCode: `vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
    sort(intervals.begin(), intervals.end());
    vector<pair<int,int>> sortedQ;
    for (int i = 0; i < queries.size(); i++)
        sortedQ.push_back({queries[i], i});
    sort(sortedQ.begin(), sortedQ.end());

    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> heap;
    vector<int> result(queries.size(), -1);
    int j = 0;

    for (auto& [q, idx] : sortedQ) {
        while (j < intervals.size() && intervals[j][0] <= q) {
            int size = intervals[j][1] - intervals[j][0] + 1;
            heap.push({size, intervals[j][1]});
            j++;
        }
        while (!heap.empty() && heap.top().second < q) {
            heap.pop();
        }
        if (!heap.empty()) {
            result[idx] = heap.top().first;
        }
    }

    return result;
}`,

      pythonCode: `def minInterval(intervals: List[List[int]], queries: List[int]) -> List[int]:
    intervals.sort()
    sorted_q = sorted(enumerate(queries), key=lambda x: x[1])

    heap = []  # (size, right_end)
    result = [-1] * len(queries)
    j = 0

    for idx, q in sorted_q:
        while j < len(intervals) and intervals[j][0] <= q:
            size = intervals[j][1] - intervals[j][0] + 1
            heapq.heappush(heap, (size, intervals[j][1]))
            j += 1
        while heap and heap[0][1] < q:
            heapq.heappop(heap)
        if heap:
            result[idx] = heap[0][0]

    return result`,

      lineAnnotations: {
        2: "Sort intervals by start time",
        3: "Sort queries by value, keeping original indices",
        8: "Min-heap ordered by interval size",
        14: "Add all intervals starting at or before current query",
        20: "Remove intervals that end before the query (expired)",
        23: "Smallest valid interval is at the heap top",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "4 intervals, 4 queries",
          input: { intervals: [[1,4],[2,4],[3,6],[4,4]], queries: [2,3,4,5] },
          expectedOutput: "[3,3,1,4]",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3],
              shortLabel: "Sort intervals and queries",
              explanation: "Intervals sorted by start: [[1,4],[2,4],[3,6],[4,4]]. Queries sorted: [(2,0),(3,1),(4,2),(5,3)].",
              variables: { intervals: "[[1,4],[2,4],[3,6],[4,4]]", sortedQueries: "[2,3,4,5]" },
              dataStructure: { arrayStates: {0:"default",1:"default",2:"default",3:"default"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [14, 15, 16],
              shortLabel: "q=2: push [1,4](4), [2,4](3)",
              explanation: "Query=2. Intervals starting ≤ 2: [1,4] (size 4) and [2,4] (size 3). Push both. Heap top: size 3. result[0]=3.",
              variables: { q: 2, heapTop: 3, "result[0]": 3 },
              dataStructure: {
                arrayStates: {0:"active",1:"default",2:"default",3:"default"},
                pointers: [{ name: "q", index: 0, color: "pointer" }],
                hashMap: { "[1,4]": {value:"size 4"}, "[2,4]": {value:"size 3",isHighlighted:true} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [14, 15, 16, 23],
              shortLabel: "q=3: push [3,6](4). Top=3",
              explanation: "Query=3. Push [3,6] (size 4). No expired intervals. Heap: {3,4,4}. Top still 3 (from [2,4]). result[1]=3.",
              variables: { q: 3, heapTop: 3, "result[1]": 3 },
              dataStructure: {
                arrayStates: {0:"active",1:"active",2:"default",3:"default"},
                pointers: [{ name: "q", index: 1, color: "pointer" }],
                hashMap: { "[2,4]": {value:"size 3",isHighlighted:true}, "[1,4]": {value:"size 4"}, "[3,6]": {value:"size 4"} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [14, 15, 20, 23],
              shortLabel: "q=4: push [4,4](1). Top=1",
              explanation: "Query=4. Push [4,4] (size 1). No expired. Heap top: size 1 (from [4,4]). result[2]=1.",
              variables: { q: 4, heapTop: 1, "result[2]": 1 },
              dataStructure: {
                arrayStates: {0:"active",1:"active",2:"active",3:"default"},
                pointers: [{ name: "q", index: 2, color: "pointer" }],
                hashMap: { "[4,4]": {value:"size 1",isHighlighted:true}, "[2,4]": {value:"size 3"}, "[3,6]": {value:"size 4"} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [20, 23],
              shortLabel: "q=5: expire [4,4],[1,4],[2,4]. Top=4",
              explanation: "Query=5. Remove expired: [4,4] ends at 4 < 5, [1,4] ends at 4 < 5, [2,4] ends at 4 < 5. Only [3,6] remains (size 4). result[3]=4.",
              variables: { q: 5, heapTop: 4, "result[3]": 4 },
              dataStructure: {
                arrayStates: {0:"active",1:"active",2:"active",3:"active"},
                pointers: [{ name: "q", index: 3, color: "pointer" }],
                hashMap: { "[3,6]": {value:"size 4",isHighlighted:true} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [27],
              shortLabel: "Return [3,3,1,4]",
              explanation: "All queries processed. Result mapped back to original order: [3,3,1,4].",
              variables: { answer: "[3,3,1,4]" },
              dataStructure: {
                arrayStates: {0:"found",1:"found",2:"found",3:"found"},
                pointers: [],
                hashMap: {},
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Containing Interval",
          description: "Query falls outside all intervals",
          input: { intervals: [[1,2],[3,4]], queries: [5] },
          expectedOutput: "[-1]",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3],
              shortLabel: "Sort",
              explanation: "Intervals: [[1,2],[3,4]]. Query: [5]. Both intervals end before 5.",
              variables: { intervals: "[[1,2],[3,4]]", queries: "[5]" },
              dataStructure: { arrayStates: {0:"default"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [14, 20],
              shortLabel: "q=5: all expire, heap empty",
              explanation: "Push both intervals, then both expire (end < 5). Heap empty. result[0] = -1.",
              variables: { q: 5, heapEmpty: true, "result[0]": -1 },
              dataStructure: { arrayStates: {0:"eliminated"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [27],
              shortLabel: "Return [-1]",
              explanation: "No interval contains query 5. Answer: [-1].",
              variables: { answer: "[-1]" },
              dataStructure: { arrayStates: {0:"eliminated"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ intervals, queries }) {
        const steps = [];
        const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
        const sortedQ = queries.map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);
        steps.push({ stepId: 0, lineNumbers: [2, 3], shortLabel: "Sort", explanation: "Sort intervals by start and queries by value.", variables: { n: intervals.length, m: queries.length }, dataStructure: { arrayStates: Object.fromEntries(queries.map((_,i)=>[i,"default"])), pointers: [], hashMap: {} }, delta: {}, isAnswer: false });

        // Simple heap simulation
        const result = new Array(queries.length).fill(-1);
        const heap = []; // [size, right]
        let j = 0;
        for (const [q, idx] of sortedQ) {
          while (j < sorted.length && sorted[j][0] <= q) {
            heap.push([sorted[j][1] - sorted[j][0] + 1, sorted[j][1]]);
            j++;
          }
          // Remove expired
          const valid = heap.filter(h => h[1] >= q);
          heap.length = 0;
          heap.push(...valid);
          heap.sort((a, b) => a[0] - b[0]);
          if (heap.length > 0) result[idx] = heap[0][0];
        }

        steps.push({ stepId: 1, lineNumbers: [27], shortLabel: `Result: [${result.join(',')}]`, explanation: `Answer: [${result.join(',')}].`, variables: { answer: `[${result.join(',')}]` }, dataStructure: { arrayStates: Object.fromEntries(queries.map((_,i)=>[i,"found"])), pointers: [], hashMap: {} }, delta: {}, isAnswer: true });
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n*m)", space: "O(m)", explanation: "Check all intervals for each query" },
    optimal: { time: "O((n+m) log n)", space: "O(n+m)", explanation: "Sort + heap operations; each interval pushed/popped at most once", tradeoff: "Sorting + heap enable sweep-line processing" },
  },

  interviewTips: [
    "This is a sweep-line problem — sort events and process in order.",
    "Remember to keep original query indices when sorting queries.",
    "The heap is keyed by interval SIZE, not by start/end.",
    "Expired intervals (end < current query) must be lazily removed.",
    "Alternative: offline query processing with sorted intervals.",
  ],

  relatedProblems: ["merge-intervals", "insert-interval", "meeting-rooms-ii"],
};
