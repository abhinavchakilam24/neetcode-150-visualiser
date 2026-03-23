export const nonOverlappingIntervals = {
  id: 131,
  slug: "non-overlapping-intervals",
  title: "Non-overlapping Intervals",
  difficulty: "Medium",
  topic: "intervals",
  topicLabel: "Intervals",
  neetcodeNumber: 131,
  artifactType: "ArrayHashMap",
  companies: ["Google", "Meta", "Amazon", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/non-overlapping-intervals/",

  pattern: "Greedy Interval Scheduling",
  patternExplanation: `Sort intervals by end time, then greedily keep the interval that finishes earliest.
    Any interval that starts before the previous one ends must be removed. This maximizes the number of
    non-overlapping intervals kept, minimizing removals.`,

  intuition: {
    coreInsight: `To minimize removals, we want to maximize the number of non-overlapping intervals we KEEP.
      Sorting by end time and greedily picking the earliest-ending interval at each step is optimal because
      an interval that ends sooner leaves the most room for future intervals. This is the classic interval
      scheduling maximization problem — choosing greedily by end time always yields the maximum set.`,

    mentalModel: `Imagine you're a conference room scheduler. You have a list of meeting requests, and you want
      to cancel as few as possible while eliminating all conflicts. Your strategy: always confirm the meeting
      that ends earliest first, then skip anything that overlaps with it. By freeing up the room as soon as
      possible, you maximize how many meetings fit. Each "skipped" meeting is one removal.`,

    whyNaiveFails: `Brute force would try every possible subset of non-overlapping intervals — that's 2^n
      subsets to check, exponential time. Even a DP approach on unsorted intervals is O(n^2). But sorting
      by end time lets us make a single greedy pass in O(n log n), because the locally optimal choice
      (pick earliest end) is globally optimal — provable by exchange argument.`,

    keyObservation: `Sort by END time, not start time. If you sort by start time, you might greedily pick a
      long interval that blocks many short ones. Sorting by end time ensures each chosen interval "uses up"
      the minimum possible timeline. The number of removals = total intervals - maximum non-overlapping kept.`,
  },

  problem: `Given an array of intervals where intervals[i] = [start_i, end_i], return the minimum number
    of intervals you need to remove to make the rest of the intervals non-overlapping.
    Note: Intervals that only touch at a point are non-overlapping. For example, [1,2] and [2,3] are non-overlapping.`,

  examples: [
    { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Remove [1,3] — the remaining [[1,2],[2,3],[3,4]] are non-overlapping." },
    { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2", explanation: "Two of the three identical intervals must be removed." },
    { input: "intervals = [[1,2],[2,3]]", output: "0", explanation: "Already non-overlapping (touching endpoints don't count as overlap)." },
  ],

  constraints: [
    "1 <= intervals.length <= 10^5",
    "intervals[i].length == 2",
    "-5 * 10^4 <= start_i < end_i <= 5 * 10^4",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Sort by Start + Compare)",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: `Sort by start time. For each pair of overlapping intervals, remove the one with the larger
        end time (it blocks more future intervals). This is O(n^2) in the worst case because after each
        removal we may need to re-check.`,

      javaCode: `public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    int removals = 0;
    int prevEnd = intervals[0][1];

    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            removals++;
            prevEnd = Math.min(prevEnd, intervals[i][1]);
        } else {
            prevEnd = intervals[i][1];
        }
    }

    return removals;
}`,

      cppCode: `int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    int removals = 0;
    int prevEnd = intervals[0][1];

    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] < prevEnd) {
            removals++;
            prevEnd = min(prevEnd, intervals[i][1]);
        } else {
            prevEnd = intervals[i][1];
        }
    }

    return removals;
}`,

      pythonCode: `def eraseOverlapIntervals(intervals: List[List[int]]) -> int:
    intervals.sort()
    removals = 0
    prev_end = intervals[0][1]

    for i in range(1, len(intervals)):
        if intervals[i][0] < prev_end:
            removals += 1
            prev_end = min(prev_end, intervals[i][1])
        else:
            prev_end = intervals[i][1]

    return removals`,

      lineAnnotations: {
        2: "Sort intervals by start time",
        3: "Count of intervals we need to remove",
        4: "Track end of the last kept interval",
        6: "Check if current interval overlaps with previous",
        7: "Overlap found — must remove one interval",
        8: "Keep the one with smaller end (remove the one extending further)",
        10: "No overlap — update prevEnd to current interval's end",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { intervals: [[1,2],[2,3],[3,4],[1,3]] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort by start",
              explanation: "Sort intervals by start time: [[1,2],[1,3],[2,3],[3,4]]. Now we process them left to right.",
              variables: { sorted: "[[1,2],[1,3],[2,3],[3,4]]", removals: 0, prevEnd: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "prevEnd = 2",
              explanation: "Initialize prevEnd to the end of the first interval [1,2]. prevEnd = 2.",
              variables: { i: 0, interval: "[1,2]", removals: 0, prevEnd: 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "prev", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8],
              shortLabel: "i=1: [1,3] overlaps, remove it",
              explanation: "Interval [1,3] starts at 1 < prevEnd=2, so it overlaps with [1,2]. We remove the one with the larger end. [1,3] ends at 3 > prevEnd=2, so we remove [1,3]. prevEnd stays 2. removals = 1.",
              variables: { i: 1, interval: "[1,3]", removals: 1, prevEnd: 2, overlap: true },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 10],
              shortLabel: "i=2: [2,3] no overlap",
              explanation: "Interval [2,3] starts at 2 >= prevEnd=2. No overlap (touching endpoints are fine). Update prevEnd = 3.",
              variables: { i: 2, interval: "[2,3]", removals: 1, prevEnd: 3, overlap: false },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "found", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 10],
              shortLabel: "i=3: [3,4] no overlap",
              explanation: "Interval [3,4] starts at 3 >= prevEnd=3. No overlap. Update prevEnd = 4.",
              variables: { i: 3, interval: "[3,4]", removals: 1, prevEnd: 4, overlap: false },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "found", 3: "found" },
                pointers: [{ name: "i", index: 3, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13],
              shortLabel: "Return 1",
              explanation: "Done scanning. We removed 1 interval ([1,3]). The remaining [[1,2],[2,3],[3,4]] are non-overlapping.",
              variables: { removals: 1, answer: 1 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "found", 3: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ intervals }) {
        const steps = [];
        const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
        const n = sorted.length;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Sort by start",
          explanation: `Sort intervals by start time: [${sorted.map(iv => `[${iv}]`).join(",")}].`,
          variables: { sorted: JSON.stringify(sorted), removals: 0, prevEnd: "-" },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        let removals = 0;
        let prevEnd = sorted[0][1];

        steps.push({
          stepId: 1, lineNumbers: [4],
          shortLabel: `prevEnd = ${prevEnd}`,
          explanation: `Initialize prevEnd to end of first interval [${sorted[0]}]. prevEnd = ${prevEnd}.`,
          variables: { i: 0, interval: `[${sorted[0]}]`, removals: 0, prevEnd },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, i === 0 ? "active" : "default"])),
            pointers: [{ name: "prev", index: 0, color: "pointer" }], hashMap: {},
          },
          delta: { changedIndices: [0] }, isAnswer: false,
        });

        const states = sorted.map(() => "default");
        states[0] = "found";

        for (let i = 1; i < n; i++) {
          if (sorted[i][0] < prevEnd) {
            removals++;
            prevEnd = Math.min(prevEnd, sorted[i][1]);
            states[i] = "eliminated";

            steps.push({
              stepId: steps.length, lineNumbers: [6, 7, 8],
              shortLabel: `i=${i}: [${sorted[i]}] overlaps, remove`,
              explanation: `Interval [${sorted[i]}] starts at ${sorted[i][0]} < prevEnd=${prevEnd}. Overlap! Remove the one ending later. removals = ${removals}.`,
              variables: { i, interval: `[${sorted[i]}]`, removals, prevEnd, overlap: true },
              dataStructure: {
                arrayStates: Object.fromEntries(states.map((s, j) => [j, s])),
                pointers: [{ name: "i", index: i, color: "active" }], hashMap: {},
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          } else {
            prevEnd = sorted[i][1];
            states[i] = "found";

            steps.push({
              stepId: steps.length, lineNumbers: [6, 10],
              shortLabel: `i=${i}: [${sorted[i]}] no overlap`,
              explanation: `Interval [${sorted[i]}] starts at ${sorted[i][0]} >= prevEnd. No overlap. Update prevEnd = ${prevEnd}.`,
              variables: { i, interval: `[${sorted[i]}]`, removals, prevEnd, overlap: false },
              dataStructure: {
                arrayStates: Object.fromEntries(states.map((s, j) => [j, s])),
                pointers: [{ name: "i", index: i, color: "active" }], hashMap: {},
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: `Return ${removals}`,
          explanation: `Done. Removed ${removals} interval(s).`,
          variables: { removals, answer: removals },
          dataStructure: {
            arrayStates: Object.fromEntries(states.map((s, j) => [j, s])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Greedy — Sort by End Time",
      tier: "optimal",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      idea: `Sort intervals by end time. Greedily keep each interval whose start >= prevEnd.
        Count overlapping ones as removals. Sorting by end time guarantees optimal — the
        interval that finishes earliest leaves the most room for future intervals.`,

      javaCode: `public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
    int removals = 0;
    int prevEnd = intervals[0][1];

    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= prevEnd) {
            prevEnd = intervals[i][1];
        } else {
            removals++;
        }
    }

    return removals;
}`,

      cppCode: `int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(),
         [](const auto& a, const auto& b) { return a[1] < b[1]; });
    int removals = 0;
    int prevEnd = intervals[0][1];

    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] >= prevEnd) {
            prevEnd = intervals[i][1];
        } else {
            removals++;
        }
    }

    return removals;
}`,

      pythonCode: `def eraseOverlapIntervals(intervals: List[List[int]]) -> int:
    intervals.sort(key=lambda x: x[1])
    removals = 0
    prev_end = intervals[0][1]

    for i in range(1, len(intervals)):
        if intervals[i][0] >= prev_end:
            prev_end = intervals[i][1]
        else:
            removals += 1

    return removals`,

      lineAnnotations: {
        2: "Sort by END time — key to greedy correctness",
        3: "Count intervals we must remove",
        4: "Track end time of last kept interval",
        6: "For each subsequent interval...",
        7: "If it starts at or after prevEnd — no overlap, keep it",
        8: "Update prevEnd to this interval's end",
        10: "Overlaps — must remove this interval",
        13: "Return total removals",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Mixed intervals with one removal needed",
          input: { intervals: [[1,2],[2,3],[3,4],[1,3]] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort by end time",
              explanation: "Sort intervals by end time: [[1,2],[1,3],[2,3],[3,4]]. Processing in this order guarantees we always pick the interval that finishes earliest.",
              variables: { sorted: "[[1,2],[1,3],[2,3],[3,4]]", removals: 0, prevEnd: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Keep [1,2], prevEnd=2",
              explanation: "First interval [1,2] is always kept. Set prevEnd = 2. This is the earliest-ending interval, giving us maximum room.",
              variables: { i: 0, interval: "[1,2]", removals: 0, prevEnd: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "prevEnd", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 10],
              shortLabel: "i=1: [1,3] overlaps → remove",
              explanation: "Interval [1,3] starts at 1 < prevEnd=2. It overlaps with [1,2]. We remove [1,3] because it was chosen greedily — [1,2] ends earlier and was already kept. removals = 1.",
              variables: { i: 1, interval: "[1,3]", removals: 1, prevEnd: 2, overlap: true },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8],
              shortLabel: "i=2: [2,3] fits → keep",
              explanation: "Interval [2,3] starts at 2 >= prevEnd=2. No overlap! Touching endpoints are non-overlapping. Keep it, update prevEnd = 3.",
              variables: { i: 2, interval: "[2,3]", removals: 1, prevEnd: 3, overlap: false },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "found", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8],
              shortLabel: "i=3: [3,4] fits → keep",
              explanation: "Interval [3,4] starts at 3 >= prevEnd=3. No overlap. Keep it, update prevEnd = 4.",
              variables: { i: 3, interval: "[3,4]", removals: 1, prevEnd: 4, overlap: false },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "found", 3: "found" },
                pointers: [{ name: "i", index: 3, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13],
              shortLabel: "Return 1",
              explanation: "All intervals processed. We removed 1 interval ([1,3]). The remaining 3 intervals [[1,2],[2,3],[3,4]] are non-overlapping. Answer: 1.",
              variables: { removals: 1, answer: 1 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "found", 3: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Identical",
          description: "Three identical intervals — must remove two",
          input: { intervals: [[1,2],[1,2],[1,2]] },
          expectedOutput: "2",
          commonMistake: "Forgetting that identical intervals overlap each other. Only one can be kept.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort by end time",
              explanation: "Sort by end time: [[1,2],[1,2],[1,2]]. All identical, so order unchanged.",
              variables: { sorted: "[[1,2],[1,2],[1,2]]", removals: 0, prevEnd: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Keep [1,2], prevEnd=2",
              explanation: "Keep the first [1,2]. Set prevEnd = 2.",
              variables: { i: 0, interval: "[1,2]", removals: 0, prevEnd: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default" },
                pointers: [{ name: "prevEnd", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 10],
              shortLabel: "i=1: [1,2] overlaps → remove",
              explanation: "Second [1,2] starts at 1 < prevEnd=2. Overlaps! Remove it. removals = 1.",
              variables: { i: 1, interval: "[1,2]", removals: 1, prevEnd: 2, overlap: true },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 10],
              shortLabel: "i=2: [1,2] overlaps → remove",
              explanation: "Third [1,2] starts at 1 < prevEnd=2. Also overlaps! Remove it. removals = 2.",
              variables: { i: 2, interval: "[1,2]", removals: 2, prevEnd: 2, overlap: true },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "eliminated" },
                pointers: [{ name: "i", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13],
              shortLabel: "Return 2",
              explanation: "Two of the three identical intervals removed. Only one [1,2] remains. Answer: 2.",
              variables: { removals: 2, answer: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated", 2: "eliminated" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Already Non-overlapping",
          description: "Touching endpoints — zero removals needed",
          input: { intervals: [[1,2],[2,3]] },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort by end time",
              explanation: "Sort by end time: [[1,2],[2,3]]. Already sorted.",
              variables: { sorted: "[[1,2],[2,3]]", removals: 0, prevEnd: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Keep [1,2], prevEnd=2",
              explanation: "Keep first interval [1,2]. prevEnd = 2.",
              variables: { i: 0, interval: "[1,2]", removals: 0, prevEnd: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default" },
                pointers: [{ name: "prevEnd", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8],
              shortLabel: "i=1: [2,3] fits → keep",
              explanation: "[2,3] starts at 2 >= prevEnd=2. Touching endpoints are NOT overlapping. Keep it. prevEnd = 3.",
              variables: { i: 1, interval: "[2,3]", removals: 0, prevEnd: 3, overlap: false },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [{ name: "i", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [13],
              shortLabel: "Return 0",
              explanation: "No removals needed. Both intervals are non-overlapping. Answer: 0.",
              variables: { removals: 0, answer: 0 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ intervals }) {
        const steps = [];
        const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
        const n = sorted.length;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Sort by end time",
          explanation: `Sort intervals by end time: [${sorted.map(iv => `[${iv}]`).join(",")}].`,
          variables: { sorted: JSON.stringify(sorted), removals: 0, prevEnd: "-" },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        let removals = 0;
        let prevEnd = sorted[0][1];
        const states = sorted.map(() => "default");
        states[0] = "found";

        steps.push({
          stepId: 1, lineNumbers: [4],
          shortLabel: `Keep [${sorted[0]}], prevEnd=${prevEnd}`,
          explanation: `Keep first interval [${sorted[0]}]. prevEnd = ${prevEnd}.`,
          variables: { i: 0, interval: `[${sorted[0]}]`, removals: 0, prevEnd },
          dataStructure: {
            arrayStates: Object.fromEntries(states.map((s, j) => [j, s])),
            pointers: [{ name: "prevEnd", index: 0, color: "pointer" }], hashMap: {},
          },
          delta: { changedIndices: [0] }, isAnswer: false,
        });

        for (let i = 1; i < n; i++) {
          if (sorted[i][0] >= prevEnd) {
            prevEnd = sorted[i][1];
            states[i] = "found";
            steps.push({
              stepId: steps.length, lineNumbers: [7, 8],
              shortLabel: `i=${i}: [${sorted[i]}] fits → keep`,
              explanation: `[${sorted[i]}] starts at ${sorted[i][0]} >= prevEnd=${prevEnd}. No overlap. Keep it. prevEnd = ${sorted[i][1]}.`,
              variables: { i, interval: `[${sorted[i]}]`, removals, prevEnd, overlap: false },
              dataStructure: {
                arrayStates: Object.fromEntries(states.map((s, j) => [j, s])),
                pointers: [{ name: "i", index: i, color: "active" }], hashMap: {},
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          } else {
            removals++;
            states[i] = "eliminated";
            steps.push({
              stepId: steps.length, lineNumbers: [7, 10],
              shortLabel: `i=${i}: [${sorted[i]}] overlaps → remove`,
              explanation: `[${sorted[i]}] starts at ${sorted[i][0]} < prevEnd=${prevEnd}. Overlap! Remove it. removals = ${removals}.`,
              variables: { i, interval: `[${sorted[i]}]`, removals, prevEnd, overlap: true },
              dataStructure: {
                arrayStates: Object.fromEntries(states.map((s, j) => [j, s])),
                pointers: [{ name: "i", index: i, color: "active" }], hashMap: {},
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: `Return ${removals}`,
          explanation: `All intervals processed. Removed ${removals} interval(s). Answer: ${removals}.`,
          variables: { removals, answer: removals },
          dataStructure: {
            arrayStates: Object.fromEntries(states.map((s, j) => [j, s])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n)", space: "O(1)", explanation: "Sorting dominates; single pass after" },
    optimal: { time: "O(n log n)", space: "O(1)", explanation: "Sort by end time + single greedy pass", tradeoff: "Both approaches are O(n log n) — the sort-by-end version is simpler and provably optimal" },
  },

  interviewTips: [
    "Clarify: are intervals open or closed? Do touching endpoints count as overlap?",
    "Explain WHY sort by end time: earliest finish leaves most room for future intervals.",
    "Mention this is the classic 'interval scheduling maximization' — well-known greedy problem.",
    "Note: removals = n - (max non-overlapping set). Frame it as maximizing kept intervals.",
    "If asked for proof, mention the exchange argument: swapping any kept interval for an earlier-ending one never worsens the solution.",
  ],

  relatedProblems: ["merge-intervals", "insert-interval", "meeting-rooms", "meeting-rooms-ii"],
};
