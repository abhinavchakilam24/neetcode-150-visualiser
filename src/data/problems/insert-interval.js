export const insertInterval = {
  id: 129,
  slug: "insert-interval",
  title: "Insert Interval",
  difficulty: "Medium",
  topic: "intervals",
  topicLabel: "Intervals",
  neetcodeNumber: 129,
  artifactType: "ArrayHashMap",
  companies: ["Google", "Meta", "Amazon", "Microsoft", "LinkedIn"],
  leetcodeLink: "https://leetcode.com/problems/insert-interval/",

  pattern: "Interval Merge with Three-Phase Scan",
  patternExplanation: `When inserting into a sorted interval list, split the work into three phases:
    intervals entirely before the new one, intervals that overlap (merge them), and intervals
    entirely after. This avoids complex conditional logic.`,

  intuition: {
    coreInsight: `The intervals are already sorted by start time. When we insert a new interval,
      it can only overlap with a contiguous block of existing intervals. Everything before that
      block stays unchanged, everything after stays unchanged, and the overlapping block gets
      merged into one big interval using min(starts) and max(ends). Three clean phases.`,

    mentalModel: `Imagine a timeline on a wall with sticky notes representing meetings. You want
      to add a new meeting. Walk left to right: skip meetings that end before yours starts (they
      don't conflict). Then gather up all meetings that overlap with yours — peel them off and
      replace them with one big sticky note covering the entire combined time range. Finally, put
      back all the meetings that start after yours ends. Three sweeps, done.`,

    whyNaiveFails: `A naive approach might try to find the exact insertion point and handle merging
      with complex if-else chains. This leads to off-by-one errors and missed edge cases (new
      interval at the very start, at the very end, overlapping everything, or overlapping nothing).
      The three-phase approach handles all cases uniformly.`,

    keyObservation: `Two intervals [a,b] and [c,d] overlap if and only if a <= d AND c <= b.
      Equivalently, they DON'T overlap if b < c (first ends before second starts) or d < a
      (second ends before first starts). The three-phase scan uses these conditions cleanly:
      phase 1 collects intervals where end < newStart, phase 3 collects where start > newEnd.`,
  },

  problem: `You are given an array of non-overlapping intervals where intervals[i] = [start_i, end_i]
    sorted in ascending order by start_i. You are also given an interval newInterval = [start, end].
    Insert newInterval into intervals such that intervals is still sorted and non-overlapping
    (merge overlapping intervals if necessary). Return intervals after the insertion.`,

  examples: [
    { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]", explanation: "[2,5] overlaps with [1,3], merged into [1,5]" },
    { input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]", output: "[[1,2],[3,10],[12,16]]", explanation: "[4,8] overlaps with [3,5],[6,7],[8,10], merged into [3,10]" },
    { input: "intervals = [], newInterval = [5,7]", output: "[[5,7]]", explanation: "No existing intervals, just insert" },
  ],

  constraints: [
    "0 <= intervals.length <= 10^4",
    "intervals[i].length == 2",
    "0 <= start_i <= end_i <= 10^5",
    "intervals is sorted by start_i in ascending order",
    "newInterval.length == 2",
    "0 <= start <= end <= 10^5",
  ],

  approaches: {
    brute: {
      label: "Add and Re-sort",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: "Add the new interval to the list, re-sort, then merge all overlapping intervals in a single pass.",

      javaCode: `public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> all = new ArrayList<>(Arrays.asList(intervals));
    all.add(newInterval);
    all.sort((a, b) -> a[0] - b[0]);
    List<int[]> merged = new ArrayList<>();
    for (int[] curr : all) {
        if (!merged.isEmpty() && merged.get(merged.size()-1)[1] >= curr[0]) {
            merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], curr[1]);
        } else {
            merged.add(curr);
        }
    }
    return merged.toArray(new int[merged.size()][]);
}`,

      cppCode: `vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    intervals.push_back(newInterval);
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    for (auto& curr : intervals) {
        if (!merged.empty() && merged.back()[1] >= curr[0]) {
            merged.back()[1] = max(merged.back()[1], curr[1]);
        } else {
            merged.push_back(curr);
        }
    }
    return merged;
}`,

      pythonCode: `def insert(intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
    intervals.append(newInterval)
    intervals.sort()
    merged = []
    for curr in intervals:
        if merged and merged[-1][1] >= curr[0]:
            merged[-1][1] = max(merged[-1][1], curr[1])
        else:
            merged.append(curr)
    return merged`,

      lineAnnotations: {
        2: "Collect all intervals including the new one",
        3: "Sort wastes O(n log n) — intervals were already sorted",
        4: "Single pass to merge overlapping intervals",
        5: "Merge: extend the end of last merged interval",
        6: "Check if current overlaps with last merged",
        7: "Extend end to cover both intervals",
        9: "No overlap — add as new interval",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { intervals: [[1,3],[6,9]], newInterval: [2,5] },
          expectedOutput: "[[1,5],[6,9]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Add & sort",
              explanation: "Add [2,5] to the list, giving [[1,3],[6,9],[2,5]]. Sort by start time: [[1,3],[2,5],[6,9]]. Sorting costs O(n log n) even though the input was already sorted.",
              variables: { "all": "[[1,3],[2,5],[6,9]]", merged: "[]" },
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
              lineNumbers: [5, 9],
              shortLabel: "Process [1,3]",
              explanation: "merged is empty, so add [1,3] directly. merged = [[1,3]].",
              variables: { curr: "[1,3]", merged: "[[1,3]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default" },
                pointers: [{ name: "curr", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7],
              shortLabel: "Merge [2,5] into [1,3]",
              explanation: "merged[-1]=[1,3], end=3 >= start=2 of [2,5]. Overlap! Extend end to max(3,5)=5. merged = [[1,5]].",
              variables: { curr: "[2,5]", "merged[-1]": "[1,5]", merged: "[[1,5]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "active", 2: "default" },
                pointers: [{ name: "curr", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9],
              shortLabel: "Add [6,9] — no overlap",
              explanation: "merged[-1]=[1,5], end=5 < start=6 of [6,9]. No overlap. Add [6,9]. merged = [[1,5],[6,9]].",
              variables: { curr: "[6,9]", merged: "[[1,5],[6,9]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [{ name: "curr", index: 2, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ intervals, newInterval }) {
        const steps = [];
        const all = [...intervals, newInterval];
        all.sort((a, b) => a[0] - b[0]);

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Add & sort",
          explanation: `Add ${JSON.stringify(newInterval)} and sort. Result: ${JSON.stringify(all)}.`,
          variables: { all: JSON.stringify(all), merged: "[]" },
          dataStructure: {
            arrayStates: Object.fromEntries(all.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        const merged = [];
        for (let k = 0; k < all.length; k++) {
          const curr = all[k];
          if (merged.length > 0 && merged[merged.length - 1][1] >= curr[0]) {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], curr[1]);
            steps.push({
              stepId: steps.length, lineNumbers: [6, 7],
              shortLabel: `Merge ${JSON.stringify(curr)}`,
              explanation: `Overlap: merged[-1] end >= ${curr[0]}. Extend to max(${merged[merged.length-1][1]}, ${curr[1]}). merged = ${JSON.stringify(merged)}.`,
              variables: { curr: JSON.stringify(curr), merged: JSON.stringify(merged) },
              dataStructure: {
                arrayStates: Object.fromEntries(all.map((_, i) => [i, i <= k ? "active" : "default"])),
                pointers: [{ name: "curr", index: k, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [k] }, isAnswer: false,
            });
          } else {
            merged.push([...curr]);
            steps.push({
              stepId: steps.length, lineNumbers: [9],
              shortLabel: `Add ${JSON.stringify(curr)}`,
              explanation: `No overlap. Add ${JSON.stringify(curr)}. merged = ${JSON.stringify(merged)}.`,
              variables: { curr: JSON.stringify(curr), merged: JSON.stringify(merged) },
              dataStructure: {
                arrayStates: Object.fromEntries(all.map((_, i) => [i, i <= k ? "found" : "default"])),
                pointers: [{ name: "curr", index: k, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [k] }, isAnswer: k === all.length - 1,
            });
          }
        }

        steps[steps.length - 1].isAnswer = true;
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Three-Phase Linear Scan",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Scan left to right in three phases: (1) add all intervals ending before newInterval starts,
        (2) merge all overlapping intervals with newInterval, (3) add all remaining intervals.`,

      javaCode: `public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    int i = 0, n = intervals.length;

    while (i < n && intervals[i][1] < newInterval[0]) {
        result.add(intervals[i]);
        i++;
    }

    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.add(newInterval);

    while (i < n) {
        result.add(intervals[i]);
        i++;
    }

    return result.toArray(new int[result.size()][]);
}`,

      cppCode: `vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    vector<vector<int>> result;
    int i = 0, n = intervals.size();

    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push_back(intervals[i]);
        i++;
    }

    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = min(newInterval[0], intervals[i][0]);
        newInterval[1] = max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push_back(newInterval);

    while (i < n) {
        result.push_back(intervals[i]);
        i++;
    }

    return result;
}`,

      pythonCode: `def insert(intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
    result = []
    i, n = 0, len(intervals)

    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)

    while i < n:
        result.append(intervals[i])
        i += 1

    return result`,

      lineAnnotations: {
        2: "Result list and index pointer",
        4: "Phase 1: intervals that end before newInterval starts",
        5: "Add non-overlapping interval to result",
        9: "Phase 2: intervals that overlap with newInterval",
        10: "Expand newInterval start to cover overlap",
        11: "Expand newInterval end to cover overlap",
        14: "Add the merged newInterval",
        16: "Phase 3: remaining intervals after newInterval",
        17: "Add remaining non-overlapping intervals",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "New interval overlaps one existing interval",
          input: { intervals: [[1,3],[6,9]], newInterval: [2,5] },
          expectedOutput: "[[1,5],[6,9]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init result",
              explanation: "Create empty result list. We have intervals [[1,3],[6,9]] and want to insert [2,5]. We'll scan in three phases.",
              variables: { i: 0, newInterval: "[2,5]", result: "[]" },
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
              shortLabel: "Phase 1: check [1,3]",
              explanation: "Phase 1: Is intervals[0][1]=3 < newInterval[0]=2? No, 3 is not < 2. So [1,3] is NOT entirely before [2,5]. Phase 1 ends immediately.",
              variables: { i: 0, "intervals[0]": "[1,3]", newInterval: "[2,5]", result: "[]", condition: "3 < 2? NO" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 11],
              shortLabel: "Phase 2: merge [1,3] with [2,5]",
              explanation: "Phase 2: Is intervals[0][0]=1 <= newInterval[1]=5? Yes. Overlap! Merge: newInterval = [min(2,1), max(5,3)] = [1,5]. Advance i to 1.",
              variables: { i: 1, "intervals[0]": "[1,3]", newInterval: "[1,5]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [{ name: "i", index: 0, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9],
              shortLabel: "Phase 2: check [6,9]",
              explanation: "Is intervals[1][0]=6 <= newInterval[1]=5? No, 6 > 5. Phase 2 ends. No more overlaps.",
              variables: { i: 1, "intervals[1]": "[6,9]", newInterval: "[1,5]", result: "[]", condition: "6 <= 5? NO" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14],
              shortLabel: "Add merged [1,5]",
              explanation: "Add the merged newInterval [1,5] to result. result = [[1,5]].",
              variables: { i: 1, newInterval: "[1,5]", result: "[[1,5]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [16, 17],
              shortLabel: "Phase 3: add [6,9]",
              explanation: "Phase 3: Add remaining interval [6,9] to result. Final result = [[1,5],[6,9]].",
              variables: { i: 2, result: "[[1,5],[6,9]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Multiple Merges",
          description: "New interval overlaps several existing intervals",
          input: { intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval: [4,8] },
          expectedOutput: "[[1,2],[3,10],[12,16]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init result",
              explanation: "We need to insert [4,8] into five intervals. It will overlap [3,5], [6,7], and [8,10].",
              variables: { i: 0, newInterval: "[4,8]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5],
              shortLabel: "Phase 1: [1,2] before",
              explanation: "intervals[0][1]=2 < newInterval[0]=4? Yes. [1,2] ends before [4,8] starts. Add to result.",
              variables: { i: 1, "intervals[0]": "[1,2]", newInterval: "[4,8]", result: "[[1,2]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4],
              shortLabel: "Phase 1: check [3,5]",
              explanation: "intervals[1][1]=5 < newInterval[0]=4? No. [3,5] might overlap. Phase 1 ends.",
              variables: { i: 1, "intervals[1]": "[3,5]", newInterval: "[4,8]", condition: "5 < 4? NO" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9, 10, 11],
              shortLabel: "Phase 2: merge [3,5]",
              explanation: "intervals[1][0]=3 <= newInterval[1]=8? Yes. Merge: newInterval = [min(4,3), max(8,5)] = [3,8].",
              variables: { i: 2, "intervals[1]": "[3,5]", newInterval: "[3,8]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10, 11],
              shortLabel: "Phase 2: merge [6,7]",
              explanation: "intervals[2][0]=6 <= newInterval[1]=8? Yes. Merge: newInterval = [min(3,6), max(8,7)] = [3,8]. Unchanged bounds.",
              variables: { i: 3, "intervals[2]": "[6,7]", newInterval: "[3,8]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [9, 10, 11],
              shortLabel: "Phase 2: merge [8,10]",
              explanation: "intervals[3][0]=8 <= newInterval[1]=8? Yes. Merge: newInterval = [min(3,8), max(8,10)] = [3,10]. End expanded!",
              variables: { i: 4, "intervals[3]": "[8,10]", newInterval: "[3,10]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "visited", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9],
              shortLabel: "Phase 2: check [12,16]",
              explanation: "intervals[4][0]=12 <= newInterval[1]=10? No, 12 > 10. Phase 2 ends.",
              variables: { i: 4, "intervals[4]": "[12,16]", newInterval: "[3,10]", condition: "12 <= 10? NO" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "visited", 2: "visited", 3: "visited", 4: "active" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [14],
              shortLabel: "Add merged [3,10]",
              explanation: "Add the merged newInterval [3,10] to result. Three intervals merged into one!",
              variables: { newInterval: "[3,10]", result: "[[1,2],[3,10]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [16, 17],
              shortLabel: "Phase 3: add [12,16]",
              explanation: "Add remaining [12,16]. Final result = [[1,2],[3,10],[12,16]].",
              variables: { result: "[[1,2],[3,10],[12,16]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "No Overlap",
          description: "New interval fits between existing intervals without overlapping",
          input: { intervals: [[1,2],[6,9]], newInterval: [3,5] },
          expectedOutput: "[[1,2],[3,5],[6,9]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init result",
              explanation: "Insert [3,5] into [[1,2],[6,9]]. It fits cleanly between them with no overlap.",
              variables: { i: 0, newInterval: "[3,5]", result: "[]" },
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
              lineNumbers: [4, 5],
              shortLabel: "Phase 1: [1,2] before",
              explanation: "intervals[0][1]=2 < newInterval[0]=3? Yes. Add [1,2] to result.",
              variables: { i: 1, result: "[[1,2]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9],
              shortLabel: "Phase 2: check [6,9]",
              explanation: "intervals[1][0]=6 <= newInterval[1]=5? No. No overlaps at all. Phase 2 produces no merges.",
              variables: { i: 1, condition: "6 <= 5? NO" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "active" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [14],
              shortLabel: "Add [3,5] as-is",
              explanation: "No merges happened. Add newInterval [3,5] unchanged. result = [[1,2],[3,5]].",
              variables: { newInterval: "[3,5]", result: "[[1,2],[3,5]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16, 17],
              shortLabel: "Phase 3: add [6,9]",
              explanation: "Add remaining [6,9]. Final result = [[1,2],[3,5],[6,9]]. Clean insertion, no merges needed.",
              variables: { result: "[[1,2],[3,5],[6,9]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ intervals, newInterval }) {
        const steps = [];
        const n = intervals.length;
        let i = 0;
        const result = [];
        const nI = [...newInterval];

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init result",
          explanation: `Insert ${JSON.stringify(newInterval)} into ${JSON.stringify(intervals)}. Three-phase scan.`,
          variables: { i: 0, newInterval: JSON.stringify(nI), result: "[]" },
          dataStructure: {
            arrayStates: Object.fromEntries(intervals.map((_, idx) => [idx, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        // Phase 1
        while (i < n && intervals[i][1] < nI[0]) {
          result.push(intervals[i]);
          steps.push({
            stepId: steps.length, lineNumbers: [4, 5],
            shortLabel: `Phase 1: add ${JSON.stringify(intervals[i])}`,
            explanation: `intervals[${i}][1]=${intervals[i][1]} < newInterval[0]=${nI[0]}. Entirely before. Add to result.`,
            variables: { i: i + 1, result: JSON.stringify(result) },
            dataStructure: {
              arrayStates: Object.fromEntries(intervals.map((_, idx) => [idx, idx <= i ? "found" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: {},
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
          i++;
        }

        // Phase 2
        while (i < n && intervals[i][0] <= nI[1]) {
          nI[0] = Math.min(nI[0], intervals[i][0]);
          nI[1] = Math.max(nI[1], intervals[i][1]);
          steps.push({
            stepId: steps.length, lineNumbers: [9, 10, 11],
            shortLabel: `Phase 2: merge ${JSON.stringify(intervals[i])}`,
            explanation: `Overlap: intervals[${i}][0]=${intervals[i][0]} <= newInterval[1]=${nI[1]}. Merged: newInterval = ${JSON.stringify(nI)}.`,
            variables: { i: i + 1, newInterval: JSON.stringify(nI) },
            dataStructure: {
              arrayStates: Object.fromEntries(intervals.map((_, idx) => [idx, idx < result.length ? "found" : idx <= i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "active" }],
              hashMap: {},
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
          i++;
        }

        result.push([...nI]);
        steps.push({
          stepId: steps.length, lineNumbers: [14],
          shortLabel: `Add merged ${JSON.stringify(nI)}`,
          explanation: `Add merged newInterval ${JSON.stringify(nI)} to result.`,
          variables: { newInterval: JSON.stringify(nI), result: JSON.stringify(result) },
          dataStructure: {
            arrayStates: Object.fromEntries(intervals.map((_, idx) => [idx, idx < i ? "found" : "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: i >= n,
        });

        // Phase 3
        while (i < n) {
          result.push(intervals[i]);
          steps.push({
            stepId: steps.length, lineNumbers: [16, 17],
            shortLabel: `Phase 3: add ${JSON.stringify(intervals[i])}`,
            explanation: `Add remaining interval ${JSON.stringify(intervals[i])}.`,
            variables: { i: i + 1, result: JSON.stringify(result) },
            dataStructure: {
              arrayStates: Object.fromEntries(intervals.map((_, idx) => [idx, idx <= i ? "found" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: {},
            },
            delta: { changedIndices: [i] }, isAnswer: i === n - 1,
          });
          i++;
        }

        if (steps.length > 0) steps[steps.length - 1].isAnswer = true;
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n)", space: "O(n)", explanation: "Re-sorting the entire list after adding newInterval" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "Single linear scan with three phases; output list is O(n)", tradeoff: "Already sorted input means we never need to sort — just scan once" },
  },

  interviewTips: [
    "Immediately recognize the input is sorted — never re-sort sorted data.",
    "Describe the three phases clearly: before, overlap, after.",
    "Clarify the overlap condition: two intervals overlap iff a.start <= b.end AND b.start <= a.end.",
    "Handle edge cases explicitly: empty intervals array, newInterval at start/end, overlapping all.",
    "Mention that this is O(n) time — you touch each interval at most once.",
  ],

  relatedProblems: ["merge-intervals", "non-overlapping-intervals", "meeting-rooms-ii"],
};
