export const timeBasedKeyValue = {
  id: 33,
  slug: "time-based-key-value",
  title: "Time Based Key-Value Store",
  difficulty: "Medium",
  topic: "binary-search",
  topicLabel: "Binary Search",
  neetcodeNumber: 33,
  artifactType: "BinarySearch",
  companies: ["Google", "Amazon", "Lyft", "Netflix", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/time-based-key-value-store/",

  pattern: "Binary Search on Timestamps",
  patternExplanation: `When values are stored with increasing timestamps and you need to find
    the most recent value at or before a given timestamp, binary search on the timestamp list
    gives O(log n) lookup instead of O(n) linear scan.`,

  intuition: {
    coreInsight: `Since set() is always called with strictly increasing timestamps, the list of
      (timestamp, value) pairs for any key is already sorted by timestamp. When get() asks for
      the value at timestamp t, we need the largest timestamp <= t. This is exactly what binary
      search's "find the rightmost element <= target" variant does. Instead of scanning all
      entries, we binary search the sorted timestamp list in O(log n).`,

    mentalModel: `Think of a diary where you write entries with dates. Someone asks: "What was
      the entry on or before March 15th?" You don't read every page — you flip to roughly the
      middle, check the date, and narrow down. If March 15 has no entry, you take the most
      recent one before it. The timestamps are your sorted page numbers, and binary search is
      your efficient flipping strategy.`,

    whyNaiveFails: `A brute force approach would store all (timestamp, value) pairs in a list
      and scan backward from the end to find the largest timestamp <= t. For n entries, each
      get() is O(n). If there are millions of set() calls followed by millions of get() calls,
      this becomes O(n*m) total. Binary search makes each get() O(log n), drastically improving
      performance.`,

    keyObservation: `The problem guarantees timestamps are strictly increasing for each key.
      This means we never need to sort — the data arrives pre-sorted. We just need to binary
      search for the rightmost timestamp <= the query timestamp. If no such timestamp exists,
      return "". This is the classic "upper bound minus one" or "rightmost insertion point"
      binary search pattern.`,
  },

  problem: `Design a time-based key-value data structure that can store multiple values for
    the same key at different time stamps and retrieve the key's value at a certain timestamp.
    Implement the TimeMap class: TimeMap() initializes the object. void set(String key, String
    value, int timestamp) stores the key with the value at the given timestamp. String
    get(String key, int timestamp) returns a value such that set was called previously with
    timestamp_prev <= timestamp. If there are multiple such values, it returns the value
    associated with the largest timestamp_prev. If there are no values, it returns "".`,

  examples: [
    {
      input: 'TimeMap timeMap = new TimeMap();\ntimeMap.set("foo", "bar", 1);\ntimeMap.get("foo", 1); // return "bar"\ntimeMap.get("foo", 3); // return "bar"\ntimeMap.set("foo", "bar2", 4);\ntimeMap.get("foo", 4); // return "bar2"\ntimeMap.get("foo", 5); // return "bar2"',
      output: '[null, null, "bar", "bar", null, "bar2", "bar2"]',
      explanation: 'get("foo", 1) returns "bar" (exact match). get("foo", 3) returns "bar" (latest before 3). get("foo", 5) returns "bar2" (latest before 5).',
    },
  ],

  constraints: [
    '1 <= key.length, value.length <= 100',
    'key and value consist of lowercase English letters and digits.',
    '1 <= timestamp <= 10^7',
    'All timestamps of set are strictly increasing.',
    'At most 2 * 10^5 calls will be made to set and get.',
  ],

  approaches: {
    brute: {
      label: "Linear Scan",
      tier: "brute",
      timeComplexity: "O(n) per get",
      spaceComplexity: "O(n)",
      idea: "Store (timestamp, value) pairs per key. For get(), scan backward through the list to find the largest timestamp <= query.",

      javaCode: `class TimeMap {
    Map<String, List<int[]>> map;
    Map<String, List<String>> vals;

    public TimeMap() {
        map = new HashMap<>();
        vals = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(new int[]{timestamp});
        vals.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
    }

    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        List<int[]> times = map.get(key);
        List<String> values = vals.get(key);
        for (int i = times.size() - 1; i >= 0; i--) {
            if (times.get(i)[0] <= timestamp) {
                return values.get(i);
            }
        }
        return "";
    }
}`,

      cppCode: `class TimeMap {
    unordered_map<string, vector<pair<int, string>>> store;
public:
    TimeMap() {}

    void set(string key, string value, int timestamp) {
        store[key].push_back({timestamp, value});
    }

    string get(string key, int timestamp) {
        if (store.find(key) == store.end()) return "";
        auto& pairs = store[key];
        for (int i = pairs.size() - 1; i >= 0; i--) {
            if (pairs[i].first <= timestamp) {
                return pairs[i].second;
            }
        }
        return "";
    }
};`,

      pythonCode: `class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""
        pairs = self.store[key]
        for i in range(len(pairs) - 1, -1, -1):
            if pairs[i][0] <= timestamp:
                return pairs[i][1]
        return ""`,

      lineAnnotations: {
        5: "Initialize empty storage",
        10: "Append (timestamp, value) to key's list",
        15: "Key doesn't exist — return empty",
        18: "Scan backward through timestamps",
        19: "Found a timestamp <= query — return its value",
        22: "No valid timestamp found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { operations: ["set(foo,bar,1)", "set(foo,bar2,4)", "get(foo,3)"], key: "foo", timestamps: [1, 4], values: ["bar", "bar2"], queryTimestamp: 3 },
          expectedOutput: '"bar"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [10],
              shortLabel: "set(foo,bar,1)",
              explanation: "Store (1, 'bar') for key 'foo'. The timestamps list for 'foo' is now [1].",
              variables: { key: "foo", timestamp: 1, value: "bar", "store[foo]": "[(1,bar)]" },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                bsLeft: null, bsMid: null, bsRight: null,
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10],
              shortLabel: "set(foo,bar2,4)",
              explanation: "Store (4, 'bar2') for key 'foo'. Timestamps list is now [1, 4].",
              variables: { key: "foo", timestamp: 4, value: "bar2", "store[foo]": "[(1,bar),(4,bar2)]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found" },
                pointers: [],
                bsLeft: null, bsMid: null, bsRight: null,
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [18, 19],
              shortLabel: "get(foo,3): scan i=1, ts=4>3",
              explanation: "Query get('foo', 3). Start scanning backward. i=1: timestamp=4 > 3. Not valid, continue.",
              variables: { key: "foo", queryTs: 3, i: 1, "ts[i]": 4 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                bsLeft: null, bsMid: null, bsRight: null,
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [18, 19, 20],
              shortLabel: "i=0, ts=1<=3 → return 'bar'",
              explanation: "i=0: timestamp=1 <= 3. This is the most recent value at or before timestamp 3. Return 'bar'.",
              variables: { key: "foo", queryTs: 3, i: 0, "ts[i]": 1, answer: "bar" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "eliminated" },
                pointers: [{ name: "i", index: 0, color: "found" }],
                bsLeft: null, bsMid: null, bsRight: null,
              },
              delta: { changedIndices: [0] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ timestamps, values, queryTimestamp }) {
        const steps = [];
        for (let i = 0; i < timestamps.length; i++) {
          steps.push({
            stepId: steps.length, lineNumbers: [10],
            shortLabel: `set(ts=${timestamps[i]}, val=${values[i]})`,
            explanation: `Store (${timestamps[i]}, '${values[i]}'). Timestamps list now has ${i + 1} entries.`,
            variables: { timestamp: timestamps[i], value: values[i] },
            dataStructure: {
              arrayStates: Object.fromEntries(timestamps.slice(0, i + 1).map((_, j) => [j, j === i ? "found" : "visited"])),
              pointers: [],
              bsLeft: null, bsMid: null, bsRight: null,
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }
        for (let i = timestamps.length - 1; i >= 0; i--) {
          if (timestamps[i] <= queryTimestamp) {
            steps.push({
              stepId: steps.length, lineNumbers: [18, 19, 20],
              shortLabel: `i=${i}: ts=${timestamps[i]}<=${queryTimestamp} → '${values[i]}'`,
              explanation: `Scanning backward: i=${i}, timestamp=${timestamps[i]} <= ${queryTimestamp}. Return '${values[i]}'.`,
              variables: { i, "ts[i]": timestamps[i], queryTs: queryTimestamp, answer: values[i] },
              dataStructure: {
                arrayStates: Object.fromEntries(timestamps.map((_, j) => [j, j === i ? "found" : j > i ? "eliminated" : "default"])),
                pointers: [{ name: "i", index: i, color: "found" }],
                bsLeft: null, bsMid: null, bsRight: null,
              },
              delta: { changedIndices: [i] }, isAnswer: true,
            });
            return steps;
          }
          steps.push({
            stepId: steps.length, lineNumbers: [18, 19],
            shortLabel: `i=${i}: ts=${timestamps[i]}>${queryTimestamp}`,
            explanation: `i=${i}: timestamp=${timestamps[i]} > ${queryTimestamp}. Not valid, continue backward.`,
            variables: { i, "ts[i]": timestamps[i], queryTs: queryTimestamp },
            dataStructure: {
              arrayStates: Object.fromEntries(timestamps.map((_, j) => [j, j === i ? "active" : j > i ? "eliminated" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              bsLeft: null, bsMid: null, bsRight: null,
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }
        steps.push({
          stepId: steps.length, lineNumbers: [22],
          shortLabel: "No valid timestamp → ''",
          explanation: `No timestamp <= ${queryTimestamp}. Return empty string.`,
          variables: { answer: '""' },
          dataStructure: {
            arrayStates: Object.fromEntries(timestamps.map((_, i) => [i, "eliminated"])),
            pointers: [],
            bsLeft: null, bsMid: null, bsRight: null,
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Binary Search on Timestamps",
      tier: "optimal",
      timeComplexity: "O(log n) per get",
      spaceComplexity: "O(n)",
      idea: `Since timestamps arrive in strictly increasing order, each key's timestamp list
        is already sorted. For get(), binary search for the rightmost timestamp <= query.
        This is the classic "floor" binary search variant.`,

      javaCode: `class TimeMap {
    Map<String, List<Pair<Integer, String>>> map;

    public TimeMap() {
        map = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        map.computeIfAbsent(key, k -> new ArrayList<>())
           .add(new Pair<>(timestamp, value));
    }

    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        List<Pair<Integer, String>> list = map.get(key);

        int left = 0, right = list.size() - 1;
        String result = "";

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (list.get(mid).getKey() <= timestamp) {
                result = list.get(mid).getValue();
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}`,

      cppCode: `class TimeMap {
    unordered_map<string, vector<pair<int, string>>> store;
public:
    TimeMap() {}

    void set(string key, string value, int timestamp) {
        store[key].push_back({timestamp, value});
    }

    string get(string key, int timestamp) {
        if (store.find(key) == store.end()) return "";
        auto& pairs = store[key];

        int left = 0, right = pairs.size() - 1;
        string result = "";

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (pairs[mid].first <= timestamp) {
                result = pairs[mid].second;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
};`,

      pythonCode: `class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""
        pairs = self.store[key]

        left, right = 0, len(pairs) - 1
        result = ""

        while left <= right:
            mid = left + (right - left) // 2
            if pairs[mid][0] <= timestamp:
                result = pairs[mid][1]
                left = mid + 1
            else:
                right = mid - 1

        return result`,

      lineAnnotations: {
        4: "Initialize empty HashMap for storage",
        8: "Append (timestamp, value) pair — always in sorted order",
        13: "Key not found — return empty string",
        14: "Get the list of (timestamp, value) pairs for this key",
        16: "Binary search boundaries on the timestamp list",
        17: "Result tracks the best answer found so far",
        19: "Standard binary search loop",
        20: "Compute mid index",
        21: "This timestamp is <= query — it's a valid candidate",
        22: "Save this value as current best answer",
        23: "Look for an even later valid timestamp (move right)",
        25: "This timestamp is too large — search left half",
        28: "Return the best valid value found (or '' if none)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Query between two timestamps, binary search finds the floor",
          input: { timestamps: [1, 4, 7, 10], values: ["a", "b", "c", "d"], queryTimestamp: 6 },
          expectedOutput: '"b"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [8],
              shortLabel: "Build store: 4 entries",
              explanation: "After set() calls, key has entries: [(1,'a'), (4,'b'), (7,'c'), (10,'d')]. Timestamps are sorted. Now we call get(key, 6).",
              variables: { "store": "[(1,a),(4,b),(7,c),(10,d)]", queryTs: 6 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                bsLeft: null, bsMid: null, bsRight: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [16, 17],
              shortLabel: "Init: left=0, right=3, result=''",
              explanation: "Binary search on timestamps [1, 4, 7, 10] for the largest timestamp <= 6. Set left=0, right=3, result=''.",
              variables: { left: 0, right: 3, result: '""', queryTs: 6 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
                bsLeft: 0, bsMid: null, bsRight: 3,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19, 20, 21],
              shortLabel: "mid=1, ts=4<=6 ✓ result='b'",
              explanation: "mid=1, timestamp=4. Is 4 <= 6? Yes! This is a valid candidate. Save result='b'. Move left=mid+1=2 to look for an even larger valid timestamp.",
              variables: { left: 2, right: 3, mid: 1, "ts[mid]": 4, result: '"b"', queryTs: 6 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "default", 3: "default" },
                pointers: [
                  { name: "left", index: 2, color: "pointer" },
                  { name: "mid", index: 1, color: "found" },
                  { name: "right", index: 3, color: "pointer" },
                ],
                bsLeft: 2, bsMid: 1, bsRight: 3,
              },
              delta: { changedIndices: [1], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [19, 20, 21],
              shortLabel: "mid=2, ts=7>6 → right=1",
              explanation: "mid=2, timestamp=7. Is 7 <= 6? No! This timestamp is too large. Move right=mid-1=1. Now left=2 > right=1, loop exits.",
              variables: { left: 2, right: 1, mid: 2, "ts[mid]": 7, result: '"b"', queryTs: 6 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "found", 2: "active", 3: "eliminated" },
                pointers: [
                  { name: "mid", index: 2, color: "active" },
                ],
                bsLeft: 2, bsMid: 2, bsRight: 1,
              },
              delta: { changedIndices: [2], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [28],
              shortLabel: "Return 'b'",
              explanation: "Binary search complete. The largest timestamp <= 6 is 4, with value 'b'. Return 'b'.",
              variables: { result: '"b"', answer: '"b"' },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "found", 2: "eliminated", 3: "eliminated" },
                pointers: [{ name: "result", index: 1, color: "found" }],
                bsLeft: 2, bsMid: null, bsRight: 1,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Exact Match",
          description: "Query timestamp matches an exact entry",
          input: { timestamps: [1, 4, 7, 10], values: ["a", "b", "c", "d"], queryTimestamp: 7 },
          expectedOutput: '"c"',
          steps: [
            {
              stepId: 0,
              lineNumbers: [16, 17],
              shortLabel: "Init: left=0, right=3",
              explanation: "Binary search timestamps [1, 4, 7, 10] for largest <= 7. Set left=0, right=3, result=''.",
              variables: { left: 0, right: 3, result: '""', queryTs: 7 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 3, color: "pointer" },
                ],
                bsLeft: 0, bsMid: null, bsRight: 3,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [19, 20, 21, 22, 23],
              shortLabel: "mid=1, ts=4<=7 → result='b', left=2",
              explanation: "mid=1, timestamp=4. 4 <= 7, so it's valid. Save result='b'. Move left=2 to search for a larger valid timestamp.",
              variables: { left: 2, right: 3, mid: 1, "ts[mid]": 4, result: '"b"', queryTs: 7 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "default", 3: "default" },
                pointers: [
                  { name: "left", index: 2, color: "pointer" },
                  { name: "mid", index: 1, color: "found" },
                  { name: "right", index: 3, color: "pointer" },
                ],
                bsLeft: 2, bsMid: 1, bsRight: 3,
              },
              delta: { changedIndices: [1], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19, 20, 21, 22, 23],
              shortLabel: "mid=2, ts=7<=7 → result='c', left=3",
              explanation: "mid=2, timestamp=7. 7 <= 7 — exact match! Save result='c'. Move left=3 to check if there's anything even closer (there won't be).",
              variables: { left: 3, right: 3, mid: 2, "ts[mid]": 7, result: '"c"', queryTs: 7 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "visited", 2: "found", 3: "default" },
                pointers: [
                  { name: "left", index: 3, color: "pointer" },
                  { name: "mid", index: 2, color: "found" },
                  { name: "right", index: 3, color: "pointer" },
                ],
                bsLeft: 3, bsMid: 2, bsRight: 3,
              },
              delta: { changedIndices: [2], movedPointers: ["left"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [19, 20, 21, 22, 23],
              shortLabel: "mid=3, ts=10>7 → right=2",
              explanation: "mid=3, timestamp=10. 10 > 7 — too large. Move right=2. Now left=3 > right=2, loop exits.",
              variables: { left: 3, right: 2, mid: 3, "ts[mid]": 10, result: '"c"', queryTs: 7 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "found", 3: "active" },
                pointers: [
                  { name: "mid", index: 3, color: "active" },
                ],
                bsLeft: 3, bsMid: 3, bsRight: 2,
              },
              delta: { changedIndices: [3], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [28],
              shortLabel: "Return 'c'",
              explanation: "Binary search complete. Exact match found: timestamp 7 has value 'c'. Return 'c'.",
              variables: { result: '"c"', answer: '"c"' },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "found", 3: "eliminated" },
                pointers: [{ name: "result", index: 2, color: "found" }],
                bsLeft: 3, bsMid: null, bsRight: 2,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Before All Timestamps",
          description: "Query timestamp is smaller than all stored timestamps",
          input: { timestamps: [5, 10, 15], values: ["x", "y", "z"], queryTimestamp: 3 },
          expectedOutput: '""',
          commonMistake: "Returning the first value instead of empty string when the query timestamp is before all stored timestamps. The binary search must handle this by checking if result was ever updated.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [16, 17],
              shortLabel: "Init: left=0, right=2",
              explanation: "Binary search timestamps [5, 10, 15] for largest <= 3. Since 3 < 5 (the smallest), we should return ''.",
              variables: { left: 0, right: 2, result: '""', queryTs: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "right", index: 2, color: "pointer" },
                ],
                bsLeft: 0, bsMid: null, bsRight: 2,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [19, 20, 25],
              shortLabel: "mid=1, ts=10>3 → right=0",
              explanation: "mid=1, timestamp=10. 10 > 3 — too large. Move right=0.",
              variables: { left: 0, right: 0, mid: 1, "ts[mid]": 10, result: '""', queryTs: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "eliminated" },
                pointers: [
                  { name: "left", index: 0, color: "pointer" },
                  { name: "mid", index: 1, color: "active" },
                  { name: "right", index: 0, color: "pointer" },
                ],
                bsLeft: 0, bsMid: 1, bsRight: 0,
              },
              delta: { changedIndices: [1], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19, 20, 25],
              shortLabel: "mid=0, ts=5>3 → right=-1",
              explanation: "mid=0, timestamp=5. 5 > 3 — still too large. Move right=-1. Now left=0 > right=-1, loop exits. Result was never updated.",
              variables: { left: 0, right: -1, mid: 0, "ts[mid]": 5, result: '""', queryTs: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "eliminated", 2: "eliminated" },
                pointers: [
                  { name: "mid", index: 0, color: "active" },
                ],
                bsLeft: 0, bsMid: 0, bsRight: -1,
              },
              delta: { changedIndices: [0], movedPointers: ["right"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [28],
              shortLabel: "Return ''",
              explanation: "Binary search exhausted. No timestamp <= 3 was found. Return empty string ''.",
              variables: { result: '""', answer: '""' },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated" },
                pointers: [],
                bsLeft: 0, bsMid: null, bsRight: -1,
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ timestamps, values, queryTimestamp }) {
        const steps = [];
        const n = timestamps.length;

        steps.push({
          stepId: 0, lineNumbers: [8],
          shortLabel: `Build store: ${n} entries`,
          explanation: `After set() calls, key has ${n} entries with timestamps [${timestamps.join(', ')}]. Now querying for timestamp ${queryTimestamp}.`,
          variables: { "store": `[${timestamps.map((t, i) => `(${t},${values[i]})`).join(',')}]`, queryTs: queryTimestamp },
          dataStructure: {
            arrayStates: Object.fromEntries(timestamps.map((_, i) => [i, "default"])),
            pointers: [],
            bsLeft: null, bsMid: null, bsRight: null,
          },
          delta: {}, isAnswer: false,
        });

        let left = 0, right = n - 1;
        let result = "";
        let resultIdx = -1;

        steps.push({
          stepId: steps.length, lineNumbers: [16, 17],
          shortLabel: `Init: left=0, right=${right}`,
          explanation: `Binary search on timestamps for largest <= ${queryTimestamp}. Set left=0, right=${right}, result=''.`,
          variables: { left: 0, right, result: '""', queryTs: queryTimestamp },
          dataStructure: {
            arrayStates: Object.fromEntries(timestamps.map((_, i) => [i, "default"])),
            pointers: [
              { name: "left", index: 0, color: "pointer" },
              { name: "right", index: right, color: "pointer" },
            ],
            bsLeft: 0, bsMid: null, bsRight: right,
          },
          delta: {}, isAnswer: false,
        });

        while (left <= right) {
          const mid = left + Math.floor((right - left) / 2);

          if (timestamps[mid] <= queryTimestamp) {
            result = values[mid];
            resultIdx = mid;
            left = mid + 1;
            steps.push({
              stepId: steps.length, lineNumbers: [19, 20, 21, 22, 23],
              shortLabel: `mid=${mid}, ts=${timestamps[mid]}<=${queryTimestamp} → result='${result}'`,
              explanation: `mid=${mid}, timestamp=${timestamps[mid]} <= ${queryTimestamp}. Valid! Save result='${result}'. Move left=${left} to find larger valid timestamp.`,
              variables: { left, right, mid, "ts[mid]": timestamps[mid], result: `"${result}"`, queryTs: queryTimestamp },
              dataStructure: {
                arrayStates: Object.fromEntries(timestamps.map((_, j) => [j, j === mid ? "found" : j < left && j !== resultIdx ? "visited" : j > right ? "eliminated" : "default"])),
                pointers: [
                  ...(left <= right ? [{ name: "left", index: left, color: "pointer" }] : []),
                  { name: "mid", index: mid, color: "found" },
                  ...(left <= right ? [{ name: "right", index: right, color: "pointer" }] : []),
                ],
                bsLeft: left, bsMid: mid, bsRight: right,
              },
              delta: { changedIndices: [mid], movedPointers: ["left"] }, isAnswer: false,
            });
          } else {
            right = mid - 1;
            steps.push({
              stepId: steps.length, lineNumbers: [19, 20, 25],
              shortLabel: `mid=${mid}, ts=${timestamps[mid]}>${queryTimestamp} → right=${right}`,
              explanation: `mid=${mid}, timestamp=${timestamps[mid]} > ${queryTimestamp}. Too large. Move right=${right}.`,
              variables: { left, right, mid, "ts[mid]": timestamps[mid], result: result ? `"${result}"` : '""', queryTs: queryTimestamp },
              dataStructure: {
                arrayStates: Object.fromEntries(timestamps.map((_, j) => {
                  if (j === mid) return [j, "active"];
                  if (j === resultIdx) return [j, "found"];
                  if (j > right && j !== mid) return [j, "eliminated"];
                  if (j < left) return [j, "visited"];
                  return [j, "default"];
                })),
                pointers: [
                  ...(left <= right ? [{ name: "left", index: left, color: "pointer" }] : []),
                  { name: "mid", index: mid, color: "active" },
                  ...(left <= right ? [{ name: "right", index: right, color: "pointer" }] : []),
                ],
                bsLeft: left, bsMid: mid, bsRight: right,
              },
              delta: { changedIndices: [mid], movedPointers: ["right"] }, isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [28],
          shortLabel: result ? `Return '${result}'` : "Return ''",
          explanation: result
            ? `Binary search complete. Largest timestamp <= ${queryTimestamp} has value '${result}'. Return '${result}'.`
            : `Binary search complete. No timestamp <= ${queryTimestamp} found. Return ''.`,
          variables: { result: result ? `"${result}"` : '""', answer: result ? `"${result}"` : '""' },
          dataStructure: {
            arrayStates: Object.fromEntries(timestamps.map((_, i) => [i, i === resultIdx ? "found" : "eliminated"])),
            pointers: resultIdx >= 0 ? [{ name: "result", index: resultIdx, color: "found" }] : [],
            bsLeft: left, bsMid: null, bsRight: right,
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n) per get", space: "O(n)", explanation: "Linear scan backward through all timestamps" },
    optimal: { time: "O(log n) per get", space: "O(n)", explanation: "Binary search on pre-sorted timestamp list; set() is O(1) amortized", tradeoff: "Same space, but binary search exploits the sorted timestamp invariant" },
  },

  interviewTips: [
    "Clarify: 'Are set() timestamps always strictly increasing?' — yes, per the constraints.",
    "Mention that since timestamps are pre-sorted, no sorting is needed — just binary search on get().",
    "Explain the 'floor' binary search variant: find the rightmost element <= target.",
    "Discuss the choice of data structure: HashMap<String, List<Pair>> vs TreeMap.",
    "Edge case: get() with a timestamp smaller than all stored timestamps should return ''.",
    "Mention that TreeMap's floorKey() solves this in O(log n) too, but a custom binary search avoids the overhead.",
  ],

  relatedProblems: ["binary-search", "search-2d-matrix", "koko-eating-bananas"],
};
