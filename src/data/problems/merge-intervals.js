export const mergeIntervals = {
  id: 130,
  slug: "merge-intervals",
  title: "Merge Intervals",
  difficulty: "Medium",
  topic: "intervals",
  topicLabel: "Intervals",
  neetcodeNumber: 130,
  artifactType: "ArrayHashMap",
  companies: ["Meta", "Google", "Amazon", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/merge-intervals/",

  pattern: "Sort + Linear Merge",
  patternExplanation: `When merging overlapping intervals, sort by start time first. Then a single
    left-to-right pass can merge overlaps by comparing each interval's start with the previous
    interval's end. Sorting guarantees that overlapping intervals are always adjacent.`,

  intuition: {
    coreInsight: `After sorting by start time, overlapping intervals are guaranteed to be adjacent.
      We only need to compare each interval with the last one in our result: if the current
      interval's start is <= the previous end, they overlap and we extend the end. Otherwise,
      it's a new non-overlapping interval. One sort + one pass = done.`,

    mentalModel: `Imagine laying out meeting time-blocks on a table, sorted left to right by start
      time. Walk along the table: if the next block's left edge overlaps the current block's right
      edge, slide them together into one longer block. If there's a gap, start a new block. You're
      essentially "sweeping" a cursor from left to right, merging as you go.`,

    whyNaiveFails: `Without sorting, you'd need to compare every interval with every other
      interval to find overlaps — that's O(n^2) comparisons. And merging chains of overlapping
      intervals (A overlaps B, B overlaps C) requires iterating until no more merges happen,
      making it even slower. Sorting collapses this to a single linear pass.`,

    keyObservation: `Two sorted intervals [a,b] and [c,d] where a <= c overlap if and only if
      c <= b. After sorting, we only need to check adjacent pairs. The merge operation is
      simply: extend the end to max(b, d). The start stays the same because we sorted by start.`,
  },

  problem: `Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping
    intervals, and return an array of the non-overlapping intervals that cover all the intervals
    in the input.`,

  examples: [
    { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "[1,3] and [2,6] overlap, merged to [1,6]" },
    { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", explanation: "[1,4] and [4,5] are touching (4=4), so they merge" },
  ],

  constraints: [
    "1 <= intervals.length <= 10^4",
    "intervals[i].length == 2",
    "0 <= start_i <= end_i <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Compare All Pairs",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: "Repeatedly scan all intervals, merging any overlapping pair, until no more merges are possible.",

      javaCode: `public int[][] merge(int[][] intervals) {
    List<int[]> list = new ArrayList<>(Arrays.asList(intervals));
    boolean merged = true;
    while (merged) {
        merged = false;
        for (int i = 0; i < list.size(); i++) {
            for (int j = i + 1; j < list.size(); j++) {
                if (list.get(i)[0] <= list.get(j)[1] && list.get(j)[0] <= list.get(i)[1]) {
                    list.get(i)[0] = Math.min(list.get(i)[0], list.get(j)[0]);
                    list.get(i)[1] = Math.max(list.get(i)[1], list.get(j)[1]);
                    list.remove(j);
                    merged = true;
                    break;
                }
            }
            if (merged) break;
        }
    }
    return list.toArray(new int[list.size()][]);
}`,

      cppCode: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    vector<vector<int>> list(intervals);
    bool merged = true;
    while (merged) {
        merged = false;
        for (int i = 0; i < list.size(); i++) {
            for (int j = i + 1; j < list.size(); j++) {
                if (list[i][0] <= list[j][1] && list[j][0] <= list[i][1]) {
                    list[i][0] = min(list[i][0], list[j][0]);
                    list[i][1] = max(list[i][1], list[j][1]);
                    list.erase(list.begin() + j);
                    merged = true;
                    break;
                }
            }
            if (merged) break;
        }
    }
    return list;
}`,

      pythonCode: `def merge(intervals: List[List[int]]) -> List[List[int]]:
    lst = [i[:] for i in intervals]
    merged = True
    while merged:
        merged = False
        for i in range(len(lst)):
            for j in range(i + 1, len(lst)):
                if lst[i][0] <= lst[j][1] and lst[j][0] <= lst[i][1]:
                    lst[i][0] = min(lst[i][0], lst[j][0])
                    lst[i][1] = max(lst[i][1], lst[j][1])
                    lst.pop(j)
                    merged = True
                    break
            if merged:
                break
    return lst`,

      lineAnnotations: {
        3: "Repeat until no more merges happen",
        5: "Compare every pair of intervals",
        6: "Inner loop: check all pairs after i",
        7: "Check if intervals i and j overlap",
        8: "Merge: take minimum start",
        9: "Merge: take maximum end",
        10: "Remove the merged interval",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { intervals: [[1,3],[2,6],[8,10],[15,18]] },
          expectedOutput: "[[1,6],[8,10],[15,18]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init list",
              explanation: "Copy all intervals into a mutable list. We'll repeatedly scan for overlapping pairs.",
              variables: { list: "[[1,3],[2,6],[8,10],[15,18]]", merged: true },
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
              lineNumbers: [5, 6, 7, 8, 9, 10],
              shortLabel: "Merge [1,3] & [2,6]",
              explanation: "i=0, j=1: [1,3] and [2,6] overlap (1<=6 and 2<=3). Merge into [1,6]. Remove [2,6]. Restart scan.",
              variables: { i: 0, j: 1, list: "[[1,6],[8,10],[15,18]]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7],
              shortLabel: "No more overlaps",
              explanation: "Rescan: [1,6] vs [8,10] — no overlap. [1,6] vs [15,18] — no overlap. [8,10] vs [15,18] — no overlap. No merges this pass.",
              variables: { list: "[[1,6],[8,10],[15,18]]", merged: false },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
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
        const list = intervals.map(i => [...i]);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init list",
          explanation: `Start with ${JSON.stringify(list)}. Repeatedly scan for overlapping pairs.`,
          variables: { list: JSON.stringify(list) },
          dataStructure: {
            arrayStates: Object.fromEntries(list.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        let didMerge = true;
        while (didMerge) {
          didMerge = false;
          for (let i = 0; i < list.length && !didMerge; i++) {
            for (let j = i + 1; j < list.length && !didMerge; j++) {
              if (list[i][0] <= list[j][1] && list[j][0] <= list[i][1]) {
                list[i][0] = Math.min(list[i][0], list[j][0]);
                list[i][1] = Math.max(list[i][1], list[j][1]);
                list.splice(j, 1);
                didMerge = true;
                steps.push({
                  stepId: steps.length, lineNumbers: [7, 8, 9, 10],
                  shortLabel: `Merge pair at ${i},${j}`,
                  explanation: `Merged overlapping pair. List now: ${JSON.stringify(list)}.`,
                  variables: { i, j, list: JSON.stringify(list) },
                  dataStructure: {
                    arrayStates: Object.fromEntries(list.map((_, idx) => [idx, idx === i ? "active" : "default"])),
                    pointers: [], hashMap: {},
                  },
                  delta: { changedIndices: [i] }, isAnswer: false,
                });
              }
            }
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [15],
          shortLabel: "Done — no more merges",
          explanation: `No overlapping pairs remain. Result: ${JSON.stringify(list)}.`,
          variables: { result: JSON.stringify(list) },
          dataStructure: {
            arrayStates: Object.fromEntries(list.map((_, i) => [i, "found"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sort + Linear Merge",
      tier: "optimal",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: `Sort intervals by start time. Then iterate once: if the current interval overlaps the
        last merged interval, extend its end. Otherwise, add a new interval to the result.`,

      javaCode: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> merged = new ArrayList<>();

    for (int[] curr : intervals) {
        if (!merged.isEmpty() && merged.get(merged.size()-1)[1] >= curr[0]) {
            merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], curr[1]);
        } else {
            merged.add(curr);
        }
    }

    return merged.toArray(new int[merged.size()][]);
}`,

      cppCode: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
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

      pythonCode: `def merge(intervals: List[List[int]]) -> List[List[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = []

    for curr in intervals:
        if merged and merged[-1][1] >= curr[0]:
            merged[-1][1] = max(merged[-1][1], curr[1])
        else:
            merged.append(curr)

    return merged`,

      lineAnnotations: {
        2: "Sort by start time — guarantees overlapping intervals are adjacent",
        3: "Result list of merged intervals",
        5: "Single pass through sorted intervals",
        6: "Check: does current overlap with the last merged interval?",
        7: "Yes — extend the end of last merged to cover both",
        9: "No overlap — start a new merged interval",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "One pair of overlapping intervals among non-overlapping ones",
          input: { intervals: [[1,3],[2,6],[8,10],[15,18]] },
          expectedOutput: "[[1,6],[8,10],[15,18]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort by start",
              explanation: "Sort intervals by start time. Already sorted: [[1,3],[2,6],[8,10],[15,18]]. Now overlapping intervals must be adjacent.",
              variables: { intervals: "[[1,3],[2,6],[8,10],[15,18]]", merged: "[]" },
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
              lineNumbers: [5, 9],
              shortLabel: "Add [1,3]",
              explanation: "First interval [1,3]. merged is empty, so add it directly. merged = [[1,3]].",
              variables: { curr: "[1,3]", merged: "[[1,3]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "curr", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7],
              shortLabel: "Merge [2,6] → [1,6]",
              explanation: "curr=[2,6]. merged[-1]=[1,3]. Is 3 >= 2? Yes — overlap! Extend end to max(3,6)=6. merged = [[1,6]].",
              variables: { curr: "[2,6]", "merged[-1]": "[1,6]", merged: "[[1,6]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "curr", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 9],
              shortLabel: "Add [8,10]",
              explanation: "curr=[8,10]. merged[-1]=[1,6]. Is 6 >= 8? No — no overlap. Add [8,10]. merged = [[1,6],[8,10]].",
              variables: { curr: "[8,10]", merged: "[[1,6],[8,10]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "default" },
                pointers: [{ name: "curr", index: 2, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 9],
              shortLabel: "Add [15,18]",
              explanation: "curr=[15,18]. merged[-1]=[8,10]. Is 10 >= 15? No — no overlap. Add [15,18]. Final: [[1,6],[8,10],[15,18]].",
              variables: { curr: "[15,18]", merged: "[[1,6],[8,10],[15,18]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [{ name: "curr", index: 3, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [3] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Merge Into One",
          description: "Every interval overlaps — they all merge into a single interval",
          input: { intervals: [[1,4],[2,5],[3,6]] },
          expectedOutput: "[[1,6]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort",
              explanation: "Already sorted: [[1,4],[2,5],[3,6]]. All overlap with each other.",
              variables: { intervals: "[[1,4],[2,5],[3,6]]", merged: "[]" },
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
              shortLabel: "Add [1,4]",
              explanation: "merged is empty. Add [1,4]. merged = [[1,4]].",
              variables: { curr: "[1,4]", merged: "[[1,4]]" },
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
              lineNumbers: [5, 6, 7],
              shortLabel: "Merge [2,5] → [1,5]",
              explanation: "merged[-1]=[1,4]. 4 >= 2? Yes — overlap. Extend to max(4,5)=5. merged = [[1,5]].",
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
              lineNumbers: [5, 6, 7],
              shortLabel: "Merge [3,6] → [1,6]",
              explanation: "merged[-1]=[1,5]. 5 >= 3? Yes — overlap. Extend to max(5,6)=6. merged = [[1,6]]. All three merged into one!",
              variables: { curr: "[3,6]", "merged[-1]": "[1,6]", merged: "[[1,6]]" },
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

        edgeCase2: {
          id: "edgeCase2",
          label: "Touching Endpoints",
          description: "Intervals share an endpoint — they should merge",
          input: { intervals: [[1,4],[4,5]] },
          expectedOutput: "[[1,5]]",
          commonMistake: "Using strict less-than (end < start) instead of less-than-or-equal (end >= start) would miss this case. Touching intervals should merge.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort",
              explanation: "Already sorted: [[1,4],[4,5]]. The endpoints touch exactly at 4.",
              variables: { intervals: "[[1,4],[4,5]]", merged: "[]" },
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
              lineNumbers: [5, 9],
              shortLabel: "Add [1,4]",
              explanation: "First interval. merged = [[1,4]].",
              variables: { curr: "[1,4]", merged: "[[1,4]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default" },
                pointers: [{ name: "curr", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7],
              shortLabel: "Merge [4,5] → [1,5]",
              explanation: "merged[-1]=[1,4]. Is 4 >= 4? Yes! They touch at 4. Extend to max(4,5)=5. merged = [[1,5]].",
              variables: { curr: "[4,5]", "merged[-1]": "[1,5]", merged: "[[1,5]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [{ name: "curr", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ intervals }) {
        const steps = [];
        const sorted = intervals.map(i => [...i]);
        sorted.sort((a, b) => a[0] - b[0]);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Sort by start",
          explanation: `Sort intervals by start time: ${JSON.stringify(sorted)}.`,
          variables: { intervals: JSON.stringify(sorted), merged: "[]" },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        const merged = [];
        for (let k = 0; k < sorted.length; k++) {
          const curr = sorted[k];
          if (merged.length > 0 && merged[merged.length - 1][1] >= curr[0]) {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], curr[1]);
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6, 7],
              shortLabel: `Merge ${JSON.stringify(curr)}`,
              explanation: `Overlap: merged[-1] end >= ${curr[0]}. Extend to ${merged[merged.length-1][1]}. merged = ${JSON.stringify(merged)}.`,
              variables: { curr: JSON.stringify(curr), merged: JSON.stringify(merged) },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, i) => [i, i <= k ? "active" : "default"])),
                pointers: [{ name: "curr", index: k, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [k] }, isAnswer: false,
            });
          } else {
            merged.push([...curr]);
            steps.push({
              stepId: steps.length, lineNumbers: [5, 9],
              shortLabel: `Add ${JSON.stringify(curr)}`,
              explanation: `No overlap. Add ${JSON.stringify(curr)}. merged = ${JSON.stringify(merged)}.`,
              variables: { curr: JSON.stringify(curr), merged: JSON.stringify(merged) },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, i) => [i, i <= k ? "found" : "default"])),
                pointers: [{ name: "curr", index: k, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [k] }, isAnswer: false,
            });
          }
        }

        if (steps.length > 0) steps[steps.length - 1].isAnswer = true;
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n²)", space: "O(n)", explanation: "Repeatedly scan all pairs until no merges remain" },
    optimal: { time: "O(n log n)", space: "O(n)", explanation: "Dominated by sorting; the merge pass is O(n)", tradeoff: "O(n log n) is optimal because any comparison-based solution must sort" },
  },

  interviewTips: [
    "Start by asking: 'Are the intervals already sorted?' — it changes the complexity.",
    "Mention that sorting by start time makes overlapping intervals adjacent.",
    "Clarify the overlap condition: prev.end >= curr.start means overlap (including touching).",
    "Be explicit about using >= not > for the overlap check — touching endpoints merge.",
    "Note that this is a classic sweep-line technique — mention that term to impress.",
  ],

  relatedProblems: ["insert-interval", "non-overlapping-intervals", "meeting-rooms"],
};
