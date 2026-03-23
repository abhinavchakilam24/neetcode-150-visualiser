export const meetingRooms = {
  id: 132,
  slug: "meeting-rooms",
  title: "Meeting Rooms",
  difficulty: "Easy",
  topic: "intervals",
  topicLabel: "Intervals",
  neetcodeNumber: 132,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Meta", "Google", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/meeting-rooms/",

  pattern: "Sort + Overlap Detection",
  patternExplanation: `Sort intervals by start time, then check each consecutive pair for overlap.
    If any interval starts before the previous one ends, attending all meetings is impossible.`,

  intuition: {
    coreInsight: `A person can attend all meetings only if no two meetings overlap in time. After sorting
      by start time, we only need to check each consecutive pair — if meeting[i] starts before meeting[i-1]
      ends, there's a conflict. This works because sorting guarantees all earlier-starting meetings come first,
      so the only possible overlap for meeting[i] is with its immediate predecessor.`,

    mentalModel: `Imagine laying out meeting blocks on a timeline from left to right, sorted by when they
      start. If any block overlaps the previous one, you'd have to be in two places at once — impossible.
      You just slide your finger along the timeline: if the next meeting starts before the current one ends,
      you've found a conflict. One pass, one comparison per step.`,

    whyNaiveFails: `Without sorting, you'd need to compare every pair of meetings — O(n^2) comparisons.
      With n=10,000 meetings that's 50 million checks. Sorting first (O(n log n)) lets us reduce the
      overlap check to a single O(n) pass, because sorted order guarantees we only need to compare
      adjacent intervals.`,

    keyObservation: `After sorting by start time, overlap can only occur between consecutive intervals.
      If intervals[i].start < intervals[i-1].end, there's an overlap. We don't need to check
      non-adjacent pairs because if interval A ends before interval B starts, and B starts before C,
      then A definitely ends before C (transitivity through sorted order).`,
  },

  problem: `Given an array of meeting time intervals where intervals[i] = [start_i, end_i], determine
    if a person could attend all meetings. Return true if a person can attend all meetings without
    any overlap, false otherwise.`,

  examples: [
    { input: "intervals = [[0,30],[5,10],[15,20]]", output: "false", explanation: "[0,30] and [5,10] overlap — can't attend both." },
    { input: "intervals = [[7,10],[2,4]]", output: "true", explanation: "After sorting: [[2,4],[7,10]] — no overlap." },
    { input: "intervals = [[1,5],[5,10]]", output: "true", explanation: "Touching at point 5 is not an overlap." },
  ],

  constraints: [
    "0 <= intervals.length <= 10^4",
    "intervals[i].length == 2",
    "0 <= start_i < end_i <= 10^6",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Check All Pairs)",
      tier: "brute",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      idea: "Compare every pair of intervals. If any two overlap, return false.",

      javaCode: `public boolean canAttendMeetings(int[][] intervals) {
    for (int i = 0; i < intervals.length; i++) {
        for (int j = i + 1; j < intervals.length; j++) {
            if (intervals[i][0] < intervals[j][1] &&
                intervals[j][0] < intervals[i][1]) {
                return false;
            }
        }
    }
    return true;
}`,

      cppCode: `bool canAttendMeetings(vector<vector<int>>& intervals) {
    for (int i = 0; i < intervals.size(); i++) {
        for (int j = i + 1; j < intervals.size(); j++) {
            if (intervals[i][0] < intervals[j][1] &&
                intervals[j][0] < intervals[i][1]) {
                return false;
            }
        }
    }
    return true;
}`,

      pythonCode: `def canAttendMeetings(intervals: List[List[int]]) -> bool:
    for i in range(len(intervals)):
        for j in range(i + 1, len(intervals)):
            if (intervals[i][0] < intervals[j][1] and
                intervals[j][0] < intervals[i][1]):
                return False
    return True`,

      lineAnnotations: {
        2: "Fix the first meeting",
        3: "Compare with every subsequent meeting",
        4: "Check if meeting i starts before meeting j ends",
        5: "AND meeting j starts before meeting i ends — mutual overlap",
        6: "Overlap detected — impossible to attend all",
        9: "No overlaps found — can attend all meetings",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { intervals: [[0,30],[5,10],[15,20]] },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "i=0: [0,30]",
              explanation: "Start with meeting [0,30]. We'll compare it with every other meeting to check for overlaps.",
              variables: { i: 0, j: "-", "intervals[i]": "[0,30]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=0,j=1: [0,30] & [5,10] overlap!",
              explanation: "Compare [0,30] and [5,10]: 0 < 10 AND 5 < 30 — both conditions true, so they overlap. Meeting [5,10] falls entirely within [0,30]. Return false immediately.",
              variables: { i: 0, j: 1, "intervals[i]": "[0,30]", "intervals[j]": "[5,10]", overlap: true },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default" },
                pointers: [
                  { name: "i", index: 0, color: "pointer" },
                  { name: "j", index: 1, color: "active" },
                ],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6],
              shortLabel: "Return false",
              explanation: "Overlap found between [0,30] and [5,10]. Cannot attend all meetings. Return false.",
              variables: { answer: false },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default" },
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
        const n = intervals.length;

        for (let i = 0; i < n; i++) {
          steps.push({
            stepId: steps.length, lineNumbers: [2],
            shortLabel: `i=${i}: [${intervals[i]}]`,
            explanation: `Check meeting [${intervals[i]}] against all subsequent meetings.`,
            variables: { i, j: "-", "intervals[i]": `[${intervals[i]}]` },
            dataStructure: {
              arrayStates: Object.fromEntries(intervals.map((_, k) => [k, k === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }], hashMap: {},
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });

          for (let j = i + 1; j < n; j++) {
            const overlap = intervals[i][0] < intervals[j][1] && intervals[j][0] < intervals[i][1];
            if (overlap) {
              steps.push({
                stepId: steps.length, lineNumbers: [3, 4, 5, 6],
                shortLabel: `[${intervals[i]}] & [${intervals[j]}] overlap!`,
                explanation: `[${intervals[i]}] and [${intervals[j]}] overlap. Return false.`,
                variables: { i, j, "intervals[i]": `[${intervals[i]}]`, "intervals[j]": `[${intervals[j]}]`, overlap: true, answer: false },
                dataStructure: {
                  arrayStates: Object.fromEntries(intervals.map((_, k) => [k, k === i || k === j ? "eliminated" : "default"])),
                  pointers: [], hashMap: {},
                },
                delta: { changedIndices: [i, j] }, isAnswer: true,
              });
              return steps;
            }

            steps.push({
              stepId: steps.length, lineNumbers: [3, 4, 5],
              shortLabel: `[${intervals[i]}] & [${intervals[j]}] OK`,
              explanation: `[${intervals[i]}] and [${intervals[j]}] don't overlap. Continue.`,
              variables: { i, j, "intervals[i]": `[${intervals[i]}]`, "intervals[j]": `[${intervals[j]}]`, overlap: false },
              dataStructure: {
                arrayStates: Object.fromEntries(intervals.map((_, k) => [k, k === i ? "active" : k === j ? "visited" : "default"])),
                pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }], hashMap: {},
              },
              delta: { changedIndices: [j] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: "Return true",
          explanation: "No overlaps found. Can attend all meetings.",
          variables: { answer: true },
          dataStructure: {
            arrayStates: Object.fromEntries(intervals.map((_, k) => [k, "found"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sort + Linear Scan",
      tier: "optimal",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      idea: `Sort meetings by start time. Then check each consecutive pair: if any meeting starts
        before the previous one ends, there's a conflict. One pass after sorting.`,

      javaCode: `public boolean canAttendMeetings(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false;
        }
    }

    return true;
}`,

      cppCode: `bool canAttendMeetings(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());

    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false;
        }
    }

    return true;
}`,

      pythonCode: `def canAttendMeetings(intervals: List[List[int]]) -> bool:
    intervals.sort()

    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False

    return True`,

      lineAnnotations: {
        2: "Sort meetings by start time",
        4: "Check each consecutive pair",
        5: "If this meeting starts before the previous one ends — overlap!",
        6: "Conflict found — can't attend all meetings",
        9: "No conflicts — all meetings are attendable",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Overlapping meetings — person can't attend all",
          input: { intervals: [[0,30],[5,10],[15,20]] },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort by start",
              explanation: "Sort meetings by start time: [[0,30],[5,10],[15,20]]. Already sorted in this case.",
              variables: { sorted: "[[0,30],[5,10],[15,20]]" },
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
              lineNumbers: [4, 5],
              shortLabel: "i=1: [5,10] starts before [0,30] ends",
              explanation: "Compare [5,10] with previous [0,30]: start=5 < prevEnd=30. Meeting [5,10] starts while [0,30] is still going. Overlap detected!",
              variables: { i: 1, "intervals[i]": "[5,10]", "intervals[i-1]": "[0,30]", prevEnd: 30, overlap: true },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default" },
                pointers: [
                  { name: "i-1", index: 0, color: "pointer" },
                  { name: "i", index: 1, color: "active" },
                ],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6],
              shortLabel: "Return false",
              explanation: "Overlap found between consecutive meetings [0,30] and [5,10]. Cannot attend all meetings. Return false.",
              variables: { answer: false },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default" },
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
          label: "No Overlap",
          description: "All meetings are non-overlapping after sorting",
          input: { intervals: [[7,10],[2,4]] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort by start",
              explanation: "Sort meetings by start time: [[2,4],[7,10]]. The order changed — [2,4] comes before [7,10].",
              variables: { sorted: "[[2,4],[7,10]]" },
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
              shortLabel: "i=1: [7,10] starts after [2,4] ends",
              explanation: "Compare [7,10] with previous [2,4]: start=7 >= prevEnd=4. No overlap! Meeting [7,10] starts well after [2,4] finishes. There's even a 3-unit gap.",
              variables: { i: 1, "intervals[i]": "[7,10]", "intervals[i-1]": "[2,4]", prevEnd: 4, overlap: false },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [
                  { name: "i-1", index: 0, color: "pointer" },
                  { name: "i", index: 1, color: "active" },
                ],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9],
              shortLabel: "Return true",
              explanation: "All consecutive pairs checked. No overlaps. Person can attend both meetings. Return true.",
              variables: { answer: true },
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

        edgeCase2: {
          id: "edgeCase2",
          label: "Touching Endpoints",
          description: "Meetings touch at a point — not an overlap",
          input: { intervals: [[1,5],[5,10],[10,15]] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort by start",
              explanation: "Sort by start time: [[1,5],[5,10],[10,15]]. Already sorted.",
              variables: { sorted: "[[1,5],[5,10],[10,15]]" },
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
              lineNumbers: [4, 5],
              shortLabel: "i=1: [5,10] start=5, prevEnd=5 → OK",
              explanation: "Compare [5,10] with [1,5]: start=5 is NOT < prevEnd=5 (equal, not less). Touching endpoints are fine — meeting [5,10] starts exactly when [1,5] ends.",
              variables: { i: 1, "intervals[i]": "[5,10]", "intervals[i-1]": "[1,5]", prevEnd: 5, overlap: false },
              dataStructure: {
                arrayStates: { 0: "found", 1: "active", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5],
              shortLabel: "i=2: [10,15] start=10, prevEnd=10 → OK",
              explanation: "Compare [10,15] with [5,10]: start=10 is NOT < prevEnd=10. Again, touching but not overlapping.",
              variables: { i: 2, "intervals[i]": "[10,15]", "intervals[i-1]": "[5,10]", prevEnd: 10, overlap: false },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9],
              shortLabel: "Return true",
              explanation: "All pairs checked. Touching endpoints don't count as overlap. Person can attend all three back-to-back meetings. Return true.",
              variables: { answer: true },
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
        const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
        const n = sorted.length;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Sort by start",
          explanation: `Sort meetings by start time: [${sorted.map(iv => `[${iv}]`).join(",")}].`,
          variables: { sorted: JSON.stringify(sorted) },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i < n; i++) {
          const overlap = sorted[i][0] < sorted[i - 1][1];

          if (overlap) {
            steps.push({
              stepId: steps.length, lineNumbers: [4, 5, 6],
              shortLabel: `i=${i}: [${sorted[i]}] overlaps [${sorted[i-1]}]`,
              explanation: `[${sorted[i]}] starts at ${sorted[i][0]} < prevEnd=${sorted[i-1][1]}. Overlap! Return false.`,
              variables: { i, "intervals[i]": `[${sorted[i]}]`, "intervals[i-1]": `[${sorted[i-1]}]`, prevEnd: sorted[i-1][1], overlap: true, answer: false },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, k) => [k, k === i || k === i - 1 ? "eliminated" : "default"])),
                pointers: [], hashMap: {},
              },
              delta: { changedIndices: [i - 1, i] }, isAnswer: true,
            });
            return steps;
          }

          steps.push({
            stepId: steps.length, lineNumbers: [4, 5],
            shortLabel: `i=${i}: [${sorted[i]}] OK`,
            explanation: `[${sorted[i]}] starts at ${sorted[i][0]} >= prevEnd=${sorted[i-1][1]}. No overlap.`,
            variables: { i, "intervals[i]": `[${sorted[i]}]`, "intervals[i-1]": `[${sorted[i-1]}]`, prevEnd: sorted[i-1][1], overlap: false },
            dataStructure: {
              arrayStates: Object.fromEntries(sorted.map((_, k) => [k, k <= i ? "found" : "default"])),
              pointers: [{ name: "i", index: i, color: "active" }], hashMap: {},
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: "Return true",
          explanation: "No overlaps found. Can attend all meetings. Return true.",
          variables: { answer: true },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, k) => [k, "found"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n^2)", space: "O(1)", explanation: "Compare every pair of intervals" },
    optimal: { time: "O(n log n)", space: "O(1)", explanation: "Sort + single linear pass", tradeoff: "Sorting takes O(n log n) but eliminates the need for pairwise comparisons" },
  },

  interviewTips: [
    "State that the key insight is: sorting reduces pairwise comparison to adjacent comparison.",
    "Clarify: do touching endpoints count as overlap? (Usually no.)",
    "Mention this is the foundation for harder interval problems like Meeting Rooms II.",
    "If array is empty or has one meeting, return true immediately — mention edge cases.",
    "Walk through the sorting step explicitly — interviewers want to see you handle the sort comparator.",
  ],

  relatedProblems: ["meeting-rooms-ii", "merge-intervals", "non-overlapping-intervals"],
};
