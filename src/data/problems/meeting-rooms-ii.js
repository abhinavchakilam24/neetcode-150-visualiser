export const meetingRoomsII = {
  id: 133,
  slug: "meeting-rooms-ii",
  title: "Meeting Rooms II",
  difficulty: "Medium",
  topic: "intervals",
  topicLabel: "Intervals",
  neetcodeNumber: 133,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Meta", "Bloomberg", "Microsoft", "Uber"],
  leetcodeLink: "https://leetcode.com/problems/meeting-rooms-ii/",

  pattern: "Sweep Line / Event Counting",
  patternExplanation: `Decompose intervals into start and end events, sort them chronologically, then sweep
    through. Each start increments the active count, each end decrements it. The peak active count is the
    answer — the maximum number of simultaneously occurring events.`,

  intuition: {
    coreInsight: `We need the maximum number of meetings happening at the same time — that's how many rooms
      we need. Instead of tracking which meetings overlap with which, we can think of it as events: every
      meeting start adds +1 to the count of ongoing meetings, every meeting end subtracts -1. The peak of
      this running count is our answer. This is the classic "sweep line" technique.`,

    mentalModel: `Imagine a building lobby with a counter that goes up by 1 whenever someone walks in for a
      meeting, and down by 1 when they leave. You want to know the highest the counter ever reached — that's
      how many rooms you need. You don't care WHO is in which room, just the maximum simultaneous occupancy.
      Sort all arrivals and departures by time, sweep through, track the peak.`,

    whyNaiveFails: `Brute force checks every pair of meetings for overlap, then builds an overlap graph,
      then finds the maximum clique — that's at least O(n^2). Even a priority queue approach with sorting
      is O(n log n). But the sweep line approach is also O(n log n) for sorting, plus O(n) for the sweep,
      and it's conceptually simpler: just count events.`,

    keyObservation: `When a start time and end time are equal, process the END first. If a meeting ends at
      time 10 and another starts at time 10, they don't need separate rooms — the first room is freed before
      the second needs it. This is why we sort ends before starts at the same timestamp, or equivalently,
      use the two-pointer approach on separate sorted start/end arrays.`,
  },

  problem: `Given an array of meeting time intervals where intervals[i] = [start_i, end_i], return the
    minimum number of conference rooms required to hold all meetings.`,

  examples: [
    { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2", explanation: "[0,30] overlaps with [5,10] and [15,20], but [5,10] and [15,20] don't overlap with each other. At most 2 meetings at once." },
    { input: "intervals = [[7,10],[2,4]]", output: "1", explanation: "No overlap — one room suffices." },
    { input: "intervals = [[1,5],[2,6],[3,7]]", output: "3", explanation: "All three overlap at time 3. Need 3 rooms." },
  ],

  constraints: [
    "1 <= intervals.length <= 10^4",
    "0 <= start_i < end_i <= 10^6",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Min Heap / Priority Queue)",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: `Sort by start time. Use a min-heap tracking end times of active meetings.
        For each meeting, if it starts after the earliest ending meeting, reuse that room
        (pop from heap). Always push current meeting's end time. Heap size = rooms needed.`,

      javaCode: `public int minMeetingRooms(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    PriorityQueue<Integer> heap = new PriorityQueue<>();

    for (int[] interval : intervals) {
        if (!heap.isEmpty() && heap.peek() <= interval[0]) {
            heap.poll();
        }
        heap.offer(interval[1]);
    }

    return heap.size();
}`,

      cppCode: `int minMeetingRooms(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    priority_queue<int, vector<int>, greater<int>> heap;

    for (auto& interval : intervals) {
        if (!heap.empty() && heap.top() <= interval[0]) {
            heap.pop();
        }
        heap.push(interval[1]);
    }

    return heap.size();
}`,

      pythonCode: `def minMeetingRooms(intervals: List[List[int]]) -> int:
    intervals.sort()
    heap = []

    for start, end in intervals:
        if heap and heap[0] <= start:
            heapq.heappop(heap)
        heapq.heappush(heap, end)

    return len(heap)`,

      lineAnnotations: {
        2: "Sort meetings by start time",
        3: "Min-heap tracks end times of rooms in use",
        5: "Process each meeting in start-time order",
        6: "If earliest-ending room is free by now...",
        7: "...free that room (pop its end time)",
        9: "Assign current meeting to a room (push its end time)",
        11: "Heap size = number of rooms in use at peak",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { intervals: [[0,30],[5,10],[15,20]] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Sort + init heap",
              explanation: "Sort by start time: [[0,30],[5,10],[15,20]]. Initialize empty min-heap to track room end times.",
              variables: { sorted: "[[0,30],[5,10],[15,20]]", heap: "[]", rooms: 0 },
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
              shortLabel: "[0,30]: assign room 1",
              explanation: "Meeting [0,30]: heap is empty, so allocate a new room. Push end=30 onto heap. Heap = [30]. 1 room in use.",
              variables: { interval: "[0,30]", heap: "[30]", rooms: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "cur", index: 0, color: "pointer" }],
                hashMap: { "Room 1": { value: "ends@30", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 9],
              shortLabel: "[5,10]: room 1 busy, assign room 2",
              explanation: "Meeting [5,10]: earliest room ends at 30. 30 > 5, so room 1 is still occupied. Must allocate room 2. Push end=10. Heap = [10, 30]. 2 rooms in use — this is the peak.",
              variables: { interval: "[5,10]", heap: "[10,30]", rooms: 2, "heap.peek()": 30 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "cur", index: 1, color: "pointer" }],
                hashMap: { "Room 1": { value: "ends@30" }, "Room 2": { value: "ends@10", isNew: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 9],
              shortLabel: "[15,20]: room 2 free, reuse",
              explanation: "Meeting [15,20]: earliest room ends at 10. 10 <= 15, so room 2 is free! Pop 10 from heap, push 20. Heap = [20, 30]. Still 2 rooms — we reused room 2.",
              variables: { interval: "[15,20]", heap: "[20,30]", rooms: 2, "heap.peek()": 10 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "cur", index: 2, color: "pointer" }],
                hashMap: { "Room 1": { value: "ends@30" }, "Room 2": { value: "ends@20", isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11],
              shortLabel: "Return 2",
              explanation: "All meetings assigned. Heap has 2 entries = 2 rooms needed at peak. Answer: 2.",
              variables: { heap: "[20,30]", answer: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { "Room 1": { value: "ends@30" }, "Room 2": { value: "ends@20" } },
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
        const heap = [];

        const heapPush = (val) => { heap.push(val); heap.sort((a, b) => a - b); };
        const heapPop = () => heap.shift();
        const heapPeek = () => heap[0];

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Sort + init heap",
          explanation: `Sort by start: [${sorted.map(iv => `[${iv}]`).join(",")}]. Init empty heap.`,
          variables: { sorted: JSON.stringify(sorted), heap: "[]", rooms: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        let maxRooms = 0;
        for (let i = 0; i < sorted.length; i++) {
          const [start, end] = sorted[i];
          if (heap.length > 0 && heapPeek() <= start) {
            heapPop();
          }
          heapPush(end);
          maxRooms = Math.max(maxRooms, heap.length);

          const roomMap = {};
          heap.forEach((e, idx) => { roomMap[`Room ${idx + 1}`] = { value: `ends@${e}`, isNew: i === 0 || heap.length > maxRooms - 1 }; });

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6, 7, 9],
            shortLabel: `[${sorted[i]}]: ${heap.length} rooms`,
            explanation: `Meeting [${sorted[i]}]. Heap = [${heap}]. ${heap.length} room(s) in use.`,
            variables: { interval: `[${sorted[i]}]`, heap: `[${heap}]`, rooms: heap.length },
            dataStructure: {
              arrayStates: Object.fromEntries(sorted.map((_, k) => [k, k < i ? "visited" : k === i ? "active" : "default"])),
              pointers: [{ name: "cur", index: i, color: "pointer" }], hashMap: roomMap,
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [11],
          shortLabel: `Return ${maxRooms}`,
          explanation: `All meetings processed. Maximum simultaneous meetings: ${maxRooms}. Answer: ${maxRooms}.`,
          variables: { answer: maxRooms },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, k) => [k, "found"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sweep Line (Two Pointers on Sorted Events)",
      tier: "optimal",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: `Separate starts and ends into two arrays. Sort both. Use two pointers:
        if next event is a start, increment room count; if it's an end, decrement.
        Track the maximum count. No heap needed — just counting.`,

      javaCode: `public int minMeetingRooms(int[][] intervals) {
    int n = intervals.length;
    int[] starts = new int[n];
    int[] ends = new int[n];

    for (int i = 0; i < n; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }

    Arrays.sort(starts);
    Arrays.sort(ends);

    int rooms = 0, maxRooms = 0, endPtr = 0;

    for (int i = 0; i < n; i++) {
        if (starts[i] < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
        maxRooms = Math.max(maxRooms, rooms);
    }

    return maxRooms;
}`,

      cppCode: `int minMeetingRooms(vector<vector<int>>& intervals) {
    int n = intervals.size();
    vector<int> starts(n), ends(n);

    for (int i = 0; i < n; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }

    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());

    int rooms = 0, maxRooms = 0, endPtr = 0;

    for (int i = 0; i < n; i++) {
        if (starts[i] < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
        maxRooms = max(maxRooms, rooms);
    }

    return maxRooms;
}`,

      pythonCode: `def minMeetingRooms(intervals: List[List[int]]) -> int:
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])

    rooms = 0
    max_rooms = 0
    end_ptr = 0

    for i in range(len(intervals)):
        if starts[i] < ends[end_ptr]:
            rooms += 1
        else:
            end_ptr += 1
        max_rooms = max(max_rooms, rooms)

    return max_rooms`,

      lineAnnotations: {
        3:  "Extract all start times into one array",
        4:  "Extract all end times into another array",
        6:  "Populate start and end arrays",
        10: "Sort starts and ends independently",
        13: "rooms = current active meetings; endPtr = next end to process",
        15: "For each start time...",
        16: "If this start is before the next end — new room needed",
        17: "Increment active rooms",
        19: "A room freed up — advance end pointer instead",
        21: "Track peak room count",
        23: "Peak count is the answer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Two rooms needed — classic overlap scenario",
          input: { intervals: [[0,30],[5,10],[15,20]] },
          expectedOutput: "2",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4, 10],
              shortLabel: "Extract & sort starts/ends",
              explanation: "Extract start times [0,5,15] and end times [30,10,20]. Sort both: starts=[0,5,15], ends=[10,20,30]. We'll sweep through starts with an endPtr on ends.",
              variables: { starts: "[0,5,15]", ends: "[10,20,30]", rooms: 0, maxRooms: 0, endPtr: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: { "starts": { value: "[0,5,15]", isNew: true }, "ends": { value: "[10,20,30]", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [15, 16, 17],
              shortLabel: "i=0: start=0 < end=10 → rooms=1",
              explanation: "Start=0, next end=10 (ends[0]). Since 0 < 10, a new meeting begins before any meeting ends. Need a new room. rooms=1, maxRooms=1.",
              variables: { i: 0, "starts[i]": 0, "ends[endPtr]": 10, endPtr: 0, rooms: 1, maxRooms: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "starts": { value: "[0,5,15]" }, "ends": { value: "[10,20,30]" }, rooms: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [15, 16, 17, 21],
              shortLabel: "i=1: start=5 < end=10 → rooms=2",
              explanation: "Start=5, next end=10 (ends[0]). Since 5 < 10, another meeting starts before the earliest one ends. Need room 2. rooms=2, maxRooms=2.",
              variables: { i: 1, "starts[i]": 5, "ends[endPtr]": 10, endPtr: 0, rooms: 2, maxRooms: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "starts": { value: "[0,5,15]" }, "ends": { value: "[10,20,30]" }, rooms: { value: 2, isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15, 16, 19],
              shortLabel: "i=2: start=15 >= end=10 → reuse room",
              explanation: "Start=15, next end=10 (ends[0]). Since 15 >= 10, a meeting ended before this one starts. Reuse that room — advance endPtr to 1. rooms stays 2, maxRooms stays 2.",
              variables: { i: 2, "starts[i]": 15, "ends[endPtr]": 10, endPtr: 1, rooms: 2, maxRooms: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "starts": { value: "[0,5,15]" }, "ends": { value: "[10,20,30]" }, rooms: { value: 2 } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [23],
              shortLabel: "Return 2",
              explanation: "All starts processed. Maximum simultaneous meetings was 2. Need 2 conference rooms. Answer: 2.",
              variables: { maxRooms: 2, answer: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { rooms: { value: 2, isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Overlapping",
          description: "Three meetings all overlap — need 3 rooms",
          input: { intervals: [[1,5],[2,6],[3,7]] },
          expectedOutput: "3",
          commonMistake: "Forgetting that we need one room per simultaneously active meeting, not per overlap pair.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4, 10],
              shortLabel: "Extract & sort",
              explanation: "Starts = [1,2,3], Ends = [5,6,7]. Both already sorted.",
              variables: { starts: "[1,2,3]", ends: "[5,6,7]", rooms: 0, maxRooms: 0, endPtr: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: { "starts": { value: "[1,2,3]", isNew: true }, "ends": { value: "[5,6,7]", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [15, 16, 17],
              shortLabel: "i=0: start=1 < end=5 → rooms=1",
              explanation: "Start=1 < ends[0]=5. First meeting begins, no rooms free yet. rooms=1.",
              variables: { i: 0, "starts[i]": 1, "ends[endPtr]": 5, endPtr: 0, rooms: 1, maxRooms: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { rooms: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [15, 16, 17],
              shortLabel: "i=1: start=2 < end=5 → rooms=2",
              explanation: "Start=2 < ends[0]=5. Meeting [1,5] still active. Need a second room. rooms=2.",
              variables: { i: 1, "starts[i]": 2, "ends[endPtr]": 5, endPtr: 0, rooms: 2, maxRooms: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { rooms: { value: 2, isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [15, 16, 17, 21],
              shortLabel: "i=2: start=3 < end=5 → rooms=3",
              explanation: "Start=3 < ends[0]=5. Both previous meetings still active! Need a third room. rooms=3, maxRooms=3. At time=3, all three meetings [1,5],[2,6],[3,7] are running simultaneously.",
              variables: { i: 2, "starts[i]": 3, "ends[endPtr]": 5, endPtr: 0, rooms: 3, maxRooms: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { rooms: { value: 3, isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [23],
              shortLabel: "Return 3",
              explanation: "Peak concurrent meetings: 3. All three overlap in the interval [3,5). Need 3 rooms.",
              variables: { maxRooms: 3, answer: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { rooms: { value: 3, isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "No Overlap",
          description: "Sequential meetings — only 1 room needed",
          input: { intervals: [[7,10],[2,4]] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4, 10],
              shortLabel: "Extract & sort",
              explanation: "Starts = [2,7], Ends = [4,10]. Sorted.",
              variables: { starts: "[2,7]", ends: "[4,10]", rooms: 0, maxRooms: 0, endPtr: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                hashMap: { "starts": { value: "[2,7]", isNew: true }, "ends": { value: "[4,10]", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [15, 16, 17],
              shortLabel: "i=0: start=2 < end=4 → rooms=1",
              explanation: "Start=2 < ends[0]=4. First meeting begins. rooms=1.",
              variables: { i: 0, "starts[i]": 2, "ends[endPtr]": 4, endPtr: 0, rooms: 1, maxRooms: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { rooms: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [15, 16, 19],
              shortLabel: "i=1: start=7 >= end=4 → reuse",
              explanation: "Start=7 >= ends[0]=4. First meeting ended. Reuse its room — advance endPtr. rooms stays 1.",
              variables: { i: 1, "starts[i]": 7, "ends[endPtr]": 4, endPtr: 1, rooms: 1, maxRooms: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { rooms: { value: 1 } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [23],
              shortLabel: "Return 1",
              explanation: "Max rooms at any point: 1. The meetings are sequential, so one room suffices.",
              variables: { maxRooms: 1, answer: 1 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: { rooms: { value: 1, isHighlighted: true } },
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
        const starts = intervals.map(iv => iv[0]).sort((a, b) => a - b);
        const ends = intervals.map(iv => iv[1]).sort((a, b) => a - b);

        steps.push({
          stepId: 0, lineNumbers: [3, 4, 10],
          shortLabel: "Extract & sort",
          explanation: `Starts = [${starts}], Ends = [${ends}].`,
          variables: { starts: `[${starts}]`, ends: `[${ends}]`, rooms: 0, maxRooms: 0, endPtr: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(intervals.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: { "starts": { value: `[${starts}]`, isNew: true }, "ends": { value: `[${ends}]`, isNew: true } },
          },
          delta: {}, isAnswer: false,
        });

        let rooms = 0, maxRooms = 0, endPtr = 0;

        for (let i = 0; i < n; i++) {
          if (starts[i] < ends[endPtr]) {
            rooms++;
          } else {
            endPtr++;
          }
          maxRooms = Math.max(maxRooms, rooms);

          steps.push({
            stepId: steps.length, lineNumbers: [15, 16, 17, 21],
            shortLabel: `i=${i}: start=${starts[i]}, rooms=${rooms}`,
            explanation: `Start=${starts[i]}, ends[${endPtr}]=${ends[endPtr] !== undefined ? ends[endPtr] : ends[endPtr-1]}. rooms=${rooms}, maxRooms=${maxRooms}.`,
            variables: { i, "starts[i]": starts[i], endPtr, rooms, maxRooms },
            dataStructure: {
              arrayStates: Object.fromEntries(intervals.map((_, k) => [k, k < i ? "visited" : k === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: { rooms: { value: rooms, isHighlighted: rooms === maxRooms } },
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [23],
          shortLabel: `Return ${maxRooms}`,
          explanation: `All meetings processed. Peak rooms needed: ${maxRooms}.`,
          variables: { maxRooms, answer: maxRooms },
          dataStructure: {
            arrayStates: Object.fromEntries(intervals.map((_, k) => [k, "found"])),
            pointers: [],
            hashMap: { rooms: { value: maxRooms, isHighlighted: true } },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n)", space: "O(n)", explanation: "Sort + min-heap of size up to n" },
    optimal: { time: "O(n log n)", space: "O(n)", explanation: "Two sorted arrays + two-pointer sweep", tradeoff: "Both are O(n log n); sweep line is simpler and avoids heap operations" },
  },

  interviewTips: [
    "Clarify: if a meeting ends at time T and another starts at T, do they need separate rooms? (Usually no.)",
    "Start with the heap approach — it's more intuitive and what most interviewers expect.",
    "Then offer the sweep line as an optimization — shows breadth of knowledge.",
    "Mention that this problem is equivalent to 'maximum number of overlapping intervals at any point.'",
    "If asked for a follow-up, discuss how to assign specific rooms (track room IDs in the heap).",
  ],

  relatedProblems: ["meeting-rooms", "merge-intervals", "non-overlapping-intervals"],
};
