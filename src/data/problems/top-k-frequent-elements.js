export const topKFrequentElements = {
  id: 5,
  slug: "top-k-frequent-elements",
  title: "Top K Frequent Elements",
  difficulty: "Medium",
  topic: "arrays-hashing",
  topicLabel: "Arrays & Hashing",
  neetcodeNumber: 5,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Meta", "Google", "Apple", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/top-k-frequent-elements/",

  pattern: "Frequency Count + Bucket Sort",
  patternExplanation: `When you need the top-k elements by frequency, count occurrences with a HashMap,
    then use bucket sort (indexed by frequency) to extract the k most frequent in O(n) time
    instead of sorting in O(n log n).`,

  intuition: {
    coreInsight: `The key realization is that frequency values are bounded: no element can appear more
      than n times in an array of length n. This means we can use an array of size n+1 as "buckets"
      where index i holds all elements that appeared exactly i times. We fill the buckets in O(n),
      then walk backwards from the highest bucket to collect the k most frequent elements. No sorting needed.`,

    mentalModel: `Imagine sorting mail into mailboxes at a post office. Each mailbox is numbered 1 through n,
      representing "appeared this many times." First, you count how many letters each person received
      (HashMap). Then you drop each person's name into the mailbox matching their count. To find the
      top k recipients, you start at the highest-numbered mailbox and work down, collecting names until
      you have k. The mailboxes ARE the bucket array — pre-sorted by frequency for free.`,

    whyNaiveFails: `The brute force approach counts frequencies (O(n)) then sorts entries by frequency
      (O(n log n)). For n=100,000 elements, that's ~1.7 million operations just for sorting. The bucket
      sort approach does it in O(n) because frequencies are integers bounded by n — we exploit this
      structure instead of using a general-purpose sort.`,

    keyObservation: `Frequencies are bounded by array length. An element can appear at most n times in an
      array of n elements. This lets us use the frequency as an array index — bucket sort by frequency —
      turning the "sort by frequency" step from O(n log n) into O(n). Walk the buckets from right to
      left to get the most frequent first.`,
  },

  problem: `Given an integer array nums and an integer k, return the k most frequent elements.
    You may return the answer in any order.`,

  examples: [
    { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]", explanation: "1 appears 3 times, 2 appears 2 times. These are the 2 most frequent." },
    { input: "nums = [1], k = 1",            output: "[1]",   explanation: "Only one element, return it." },
    { input: "nums = [4,4,4,1,1,2,2,3], k = 2", output: "[4,1] or [4,2]", explanation: "4 appears 3 times (most frequent). 1 and 2 both appear 2 times — either is valid for the second slot." },
  ],

  constraints: [
    "1 <= nums.length <= 10^5",
    "−10^4 <= nums[i] <= 10^4",
    "k is in the range [1, number of unique elements]",
    "The answer is guaranteed to be unique (no ties at the k-th boundary).",
  ],

  approaches: {
    brute: {
      label: "Sort by Frequency",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: "Count frequency of each element with a HashMap, then sort entries by frequency descending and take the first k.",

      javaCode: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int num : nums) {
        count.put(num, count.getOrDefault(num, 0) + 1);
    }

    List<Map.Entry<Integer, Integer>> entries = new ArrayList<>(count.entrySet());
    entries.sort((a, b) -> b.getValue() - a.getValue());

    int[] result = new int[k];
    for (int i = 0; i < k; i++) {
        result[i] = entries.get(i).getKey();
    }
    return result;
}`,

      cppCode: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int num : nums) {
        count[num]++;
    }

    vector<pair<int, int>> entries(count.begin(), count.end());
    sort(entries.begin(), entries.end(),
         [](auto& a, auto& b) { return a.second > b.second; });

    vector<int> result;
    for (int i = 0; i < k; i++) {
        result.push_back(entries[i].first);
    }
    return result;
}`,

      pythonCode: `def topKFrequent(nums: List[int], k: int) -> List[int]:
    count = {}
    for num in nums:
        count[num] = count.get(num, 0) + 1

    entries = sorted(count.items(), key=lambda x: -x[1])

    result = []
    for i in range(k):
        result.append(entries[i][0])
    return result`,

      lineAnnotations: {
        2: "HashMap to count frequency of each element",
        3: "Iterate through every element in the array",
        4: "Increment count for this element (default 0 if first time)",
        7: "Convert map entries to a sortable list",
        8: "Sort entries by frequency in descending order — O(n log n)",
        10: "Prepare result array of size k",
        11: "Take the first k entries (highest frequency)",
        12: "Extract just the element value (key), not the count",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
          expectedOutput: "[1, 2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init count map",
              explanation: "Create an empty HashMap to count how many times each number appears in the array.",
              variables: { k: 2, count: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "Count all frequencies",
              explanation: "Scan the entire array and count occurrences: 1 appears 3 times, 2 appears 2 times, 3 appears 1 time. HashMap now holds {1:3, 2:2, 3:1}.",
              variables: { k: 2, count: "{1:3, 2:2, 3:1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [],
                hashMap: { 1: { value: 3, isNew: true }, 2: { value: 2, isNew: true }, 3: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0, 1, 2, 3, 4, 5] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8],
              shortLabel: "Sort by frequency desc",
              explanation: "Sort the entries by frequency in descending order: [(1,3), (2,2), (3,1)]. This sorting step costs O(n log n) — the bottleneck of the brute force approach.",
              variables: { k: 2, sorted: "[(1,3), (2,2), (3,1)]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [],
                hashMap: { 1: { value: 3, isHighlighted: true }, 2: { value: 2, isHighlighted: true }, 3: { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11, 12],
              shortLabel: "Take top k=2 → [1, 2]",
              explanation: "Take the first k=2 elements from the sorted list: element 1 (frequency 3) and element 2 (frequency 2). Return [1, 2].",
              variables: { k: 2, answer: "[1, 2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "default" },
                pointers: [],
                hashMap: { 1: { value: 3, isHighlighted: true }, 2: { value: 2, isHighlighted: true }, 3: { value: 1 } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, k }) {
        const steps = [];
        const count = {};
        const n = nums.length;
        const defaultStates = () => Object.fromEntries(nums.map((_, i) => [i, "default"]));

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init count map",
          explanation: "Create an empty HashMap to count how many times each number appears.",
          variables: { k, count: "{}" },
          dataStructure: { arrayStates: defaultStates(), pointers: [], hashMap: {} },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          count[nums[i]] = (count[nums[i]] || 0) + 1;
        }

        steps.push({
          stepId: 1, lineNumbers: [3, 4],
          shortLabel: "Count all frequencies",
          explanation: `Scan the entire array and count occurrences: ${Object.entries(count).map(([k, v]) => `${k} appears ${v} times`).join(", ")}.`,
          variables: { k, count: JSON.stringify(count) },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
            hashMap: Object.fromEntries(Object.entries(count).map(([key, val]) => [key, { value: val, isNew: true }])),
          },
          delta: { changedIndices: nums.map((_, i) => i) }, isAnswer: false,
        });

        const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);

        steps.push({
          stepId: 2, lineNumbers: [7, 8],
          shortLabel: "Sort by frequency desc",
          explanation: `Sort entries by frequency descending: [${sorted.map(([k, v]) => `(${k},${v})`).join(", ")}]. This costs O(n log n).`,
          variables: { k, sorted: `[${sorted.map(([k, v]) => `(${k},${v})`).join(", ")}]` },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
            hashMap: Object.fromEntries(Object.entries(count).map(([key, val]) => [key, { value: val }])),
          },
          delta: {}, isAnswer: false,
        });

        const result = sorted.slice(0, k).map(([key]) => Number(key));

        steps.push({
          stepId: 3, lineNumbers: [10, 11, 12],
          shortLabel: `Take top k=${k} → [${result.join(", ")}]`,
          explanation: `Take the first k=${k} elements from the sorted list: ${result.join(", ")}. Return [${result.join(", ")}].`,
          variables: { k, answer: `[${result.join(", ")}]` },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, result.includes(nums[i]) ? "found" : "default"])),
            pointers: [],
            hashMap: Object.fromEntries(Object.entries(count).map(([key, val]) => [key, { value: val, isHighlighted: result.includes(Number(key)) }])),
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Bucket Sort",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Count frequencies with a HashMap. Create a bucket array of size n+1 where index i
        holds elements with frequency i. Walk buckets from right (highest frequency) to left,
        collecting elements until we have k. No sorting needed — O(n) total.`,

      javaCode: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int num : nums) {
        count.put(num, count.getOrDefault(num, 0) + 1);
    }

    List<Integer>[] buckets = new List[nums.length + 1];
    for (int i = 0; i <= nums.length; i++) {
        buckets[i] = new ArrayList<>();
    }

    for (Map.Entry<Integer, Integer> e : count.entrySet()) {
        buckets[e.getValue()].add(e.getKey());
    }

    int[] result = new int[k];
    int idx = 0;
    for (int freq = buckets.length - 1; freq >= 0 && idx < k; freq--) {
        for (int val : buckets[freq]) {
            result[idx++] = val;
            if (idx == k) break;
        }
    }
    return result;
}`,

      cppCode: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int num : nums) {
        count[num]++;
    }

    vector<vector<int>> buckets(nums.size() + 1);

    for (auto& [val, freq] : count) {
        buckets[freq].push_back(val);
    }

    vector<int> result;
    for (int freq = buckets.size() - 1; freq >= 0 && (int)result.size() < k; freq--) {
        for (int val : buckets[freq]) {
            result.push_back(val);
            if ((int)result.size() == k) break;
        }
    }
    return result;
}`,

      pythonCode: `def topKFrequent(nums: List[int], k: int) -> List[int]:
    count = {}
    for num in nums:
        count[num] = count.get(num, 0) + 1

    buckets = [[] for _ in range(len(nums) + 1)]

    for val, freq in count.items():
        buckets[freq].append(val)

    result = []
    for freq in range(len(buckets) - 1, -1, -1):
        for val in buckets[freq]:
            result.append(val)
            if len(result) == k:
                return result
    return result`,

      lineAnnotations: {
        2:  "HashMap to count frequency of each element",
        3:  "Iterate through every element",
        4:  "Increment count (getOrDefault handles first occurrence)",
        7:  "Create bucket array: index = frequency, value = list of elements",
        8:  "Initialize each bucket as an empty list",
        12: "Place each element into the bucket matching its frequency",
        13: "Element goes into buckets[frequency]",
        16: "Prepare result array of size k",
        18: "Walk buckets from highest frequency down to lowest",
        19: "Collect all elements at this frequency level",
        20: "Add element to result; stop when we have k elements",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic case with distinct frequencies — [1,1,1,2,2,3], k=2",
          input: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
          expectedOutput: "[1, 2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init count map",
              explanation: "Create an empty HashMap to count how many times each number appears in the array.",
              variables: { k: 2, count: "{}", buckets: "not created yet" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "Count: nums[0]=1 → count=1",
              explanation: "Visit index 0, value=1. First time seeing 1, so count[1] = 0 + 1 = 1. The HashMap now tracks one element.",
              variables: { i: 0, "nums[i]": 1, k: 2, count: "{1:1}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { 1: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: 1, value: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4],
              shortLabel: "Count: nums[1]=1 → count=2",
              explanation: "Visit index 1, value=1. Seen before — increment count[1] from 1 to 2.",
              variables: { i: 1, "nums[i]": 1, k: 2, count: "{1:2}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { 1: { value: 2, isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4],
              shortLabel: "Count: nums[2]=1 → count=3",
              explanation: "Visit index 2, value=1. Increment count[1] from 2 to 3. Element 1 has now appeared 3 times.",
              variables: { i: 2, "nums[i]": 1, k: 2, count: "{1:3}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { 1: { value: 3, isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 4],
              shortLabel: "Count: nums[3]=2 → count=1",
              explanation: "Visit index 3, value=2. First time seeing 2, so count[2] = 1.",
              variables: { i: 3, "nums[i]": 2, k: 2, count: "{1:3, 2:1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { 1: { value: 3 }, 2: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [3], mapAdded: [{ key: 2, value: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [3, 4],
              shortLabel: "Count: nums[4]=2 → count=2",
              explanation: "Visit index 4, value=2. Increment count[2] from 1 to 2.",
              variables: { i: 4, "nums[i]": 2, k: 2, count: "{1:3, 2:2}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                hashMap: { 1: { value: 3 }, 2: { value: 2, isHighlighted: true } },
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [3, 4],
              shortLabel: "Count: nums[5]=3 → count=1",
              explanation: "Visit index 5, value=3. First time seeing 3, so count[3] = 1. Frequency counting is complete: {1:3, 2:2, 3:1}.",
              variables: { i: 5, "nums[i]": 3, k: 2, count: "{1:3, 2:2, 3:1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                hashMap: { 1: { value: 3 }, 2: { value: 2 }, 3: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [5], mapAdded: [{ key: 3, value: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [7, 8, 9],
              shortLabel: "Create buckets[0..6]",
              explanation: "Create a bucket array of size n+1 = 7 (indices 0 through 6). Each bucket[i] will hold elements that appeared exactly i times. Since max frequency is bounded by n, this is our O(n) sorting trick.",
              variables: { k: 2, count: "{1:3, 2:2, 3:1}", buckets: "[[], [], [], [], [], [], []]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [],
                hashMap: { 1: { value: 3 }, 2: { value: 2 }, 3: { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [12, 13],
              shortLabel: "Fill buckets: 1→b[3], 2→b[2], 3→b[1]",
              explanation: "Place each element into the bucket matching its frequency. Element 1 (freq 3) goes into buckets[3]. Element 2 (freq 2) goes into buckets[2]. Element 3 (freq 1) goes into buckets[1]. Now elements are grouped by frequency without sorting!",
              variables: { k: 2, buckets: "[[], [3], [2], [1], [], [], []]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [],
                hashMap: { 1: { value: "b[3]", isHighlighted: true }, 2: { value: "b[2]", isHighlighted: true }, 3: { value: "b[1]", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [18, 19, 20],
              shortLabel: "Bucket 6: empty, skip",
              explanation: "Start from the highest bucket (index 6). It's empty — no element appeared 6 times. Move to the next bucket down.",
              variables: { freq: 6, k: 2, result: "[]", "buckets[6]": "[]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [],
                hashMap: { 1: { value: "b[3]" }, 2: { value: "b[2]" }, 3: { value: "b[1]" } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [18, 19, 20],
              shortLabel: "Buckets 5,4: empty, skip",
              explanation: "Buckets 5 and 4 are also empty. No element appeared 5 or 4 times. Continue walking down.",
              variables: { freq: 4, k: 2, result: "[]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [],
                hashMap: { 1: { value: "b[3]" }, 2: { value: "b[2]" }, 3: { value: "b[1]" } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [18, 19, 20],
              shortLabel: "Bucket 3: pick element 1",
              explanation: "Bucket 3 contains [1] — element 1 appeared 3 times. Add 1 to result. Result = [1]. We have 1 of the k=2 elements we need.",
              variables: { freq: 3, k: 2, result: "[1]", "buckets[3]": "[1]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [],
                hashMap: { 1: { value: 3, isHighlighted: true }, 2: { value: 2 }, 3: { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [18, 19, 20],
              shortLabel: "Bucket 2: pick element 2 → done!",
              explanation: "Bucket 2 contains [2] — element 2 appeared 2 times. Add 2 to result. Result = [1, 2]. We now have k=2 elements. Return [1, 2]. The bucket sort gave us the answer in O(n) — no sorting required!",
              variables: { freq: 2, k: 2, result: "[1, 2]", answer: "[1, 2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "visited" },
                pointers: [],
                hashMap: { 1: { value: 3, isHighlighted: true }, 2: { value: 2, isHighlighted: true }, 3: { value: 1 } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Element",
          description: "Array with one element — trivial k=1 case",
          input: { nums: [1], k: 1 },
          expectedOutput: "[1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init count map",
              explanation: "Create an empty HashMap. With only one element, this will be quick.",
              variables: { k: 1, count: "{}" },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "Count: nums[0]=1 → count=1",
              explanation: "Only element is 1. count[1] = 1. Frequency counting done.",
              variables: { i: 0, "nums[i]": 1, k: 1, count: "{1:1}" },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { 1: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: 1, value: 1 }] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 9],
              shortLabel: "Create buckets[0..1]",
              explanation: "Create bucket array of size n+1 = 2. buckets[0] and buckets[1] are empty lists.",
              variables: { k: 1, buckets: "[[], []]" },
              dataStructure: {
                arrayStates: { 0: "visited" },
                pointers: [],
                hashMap: { 1: { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13],
              shortLabel: "Fill: 1→b[1]",
              explanation: "Element 1 has frequency 1. Place it in buckets[1].",
              variables: { k: 1, buckets: "[[], [1]]" },
              dataStructure: {
                arrayStates: { 0: "visited" },
                pointers: [],
                hashMap: { 1: { value: "b[1]", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [18, 19, 20],
              shortLabel: "Bucket 1: pick 1 → done!",
              explanation: "Start from highest bucket (index 1). It contains [1]. Add to result. We have k=1 elements. Return [1].",
              variables: { freq: 1, k: 1, result: "[1]", answer: "[1]" },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                hashMap: { 1: { value: 1, isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Tied Frequencies",
          description: "Multiple elements share a frequency — bucket holds multiple values",
          input: { nums: [4, 4, 4, 1, 1, 2, 2, 3], k: 2 },
          expectedOutput: "[4, 1] or [4, 2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init count map",
              explanation: "Create an empty HashMap to count frequencies. This input has a tie: both 1 and 2 appear twice.",
              variables: { k: 2, count: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "Count all frequencies",
              explanation: "Scan the array: 4 appears 3 times, 1 appears 2 times, 2 appears 2 times, 3 appears 1 time. Note: 1 and 2 are tied at frequency 2.",
              variables: { k: 2, count: "{4:3, 1:2, 2:2, 3:1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited" },
                pointers: [],
                hashMap: { 4: { value: 3, isNew: true }, 1: { value: 2, isNew: true }, 2: { value: 2, isNew: true }, 3: { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0, 1, 2, 3, 4, 5, 6, 7] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 9],
              shortLabel: "Create buckets[0..8]",
              explanation: "Create bucket array of size n+1 = 9 (indices 0 through 8). Each bucket will hold elements with that exact frequency.",
              variables: { k: 2, buckets: "9 empty lists" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited" },
                pointers: [],
                hashMap: { 4: { value: 3 }, 1: { value: 2 }, 2: { value: 2 }, 3: { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13],
              shortLabel: "Fill buckets",
              explanation: "Place elements into buckets by frequency. 4 (freq 3) → buckets[3]. Both 1 and 2 (freq 2) → buckets[2]. 3 (freq 1) → buckets[1]. Notice buckets[2] has TWO elements — this is the tied-frequency case.",
              variables: { k: 2, "buckets[3]": "[4]", "buckets[2]": "[1, 2]", "buckets[1]": "[3]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited" },
                pointers: [],
                hashMap: { 4: { value: "b[3]", isHighlighted: true }, 1: { value: "b[2]", isHighlighted: true }, 2: { value: "b[2]", isHighlighted: true }, 3: { value: "b[1]" } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [18, 19, 20],
              shortLabel: "Bucket 3: pick 4 (freq=3)",
              explanation: "Start from highest bucket. Bucket 3 contains [4]. Add 4 to result. Result = [4]. Need 1 more element.",
              variables: { freq: 3, k: 2, result: "[4]", "buckets[3]": "[4]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited" },
                pointers: [],
                hashMap: { 4: { value: 3, isHighlighted: true }, 1: { value: 2 }, 2: { value: 2 }, 3: { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [18, 19, 20],
              shortLabel: "Bucket 2: pick 1 (freq=2) → done!",
              explanation: "Move to bucket 2, which contains [1, 2]. Pick the first element: 1. Result = [4, 1]. We have k=2 elements — done! Note: we could have also picked 2 since both have the same frequency. The problem guarantees the answer is unique at the k-th boundary, so either is valid.",
              variables: { freq: 2, k: 2, result: "[4, 1]", answer: "[4, 1]", "buckets[2]": "[1, 2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "visited", 6: "visited", 7: "visited" },
                pointers: [],
                hashMap: { 4: { value: 3, isHighlighted: true }, 1: { value: 2, isHighlighted: true }, 2: { value: 2 }, 3: { value: 1 } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, k }) {
        const steps = [];
        const n = nums.length;
        const count = {};
        const defaultStates = () => Object.fromEntries(nums.map((_, i) => [i, "default"]));

        // Step 0: Init
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init count map",
          explanation: "Create an empty HashMap to count how many times each number appears in the array.",
          variables: { k, count: "{}" },
          dataStructure: { arrayStates: defaultStates(), pointers: [], hashMap: {} },
          delta: {}, isAnswer: false,
        });

        // Count frequencies one by one
        for (let i = 0; i < n; i++) {
          count[nums[i]] = (count[nums[i]] || 0) + 1;
          const mapSnapshot = () => Object.fromEntries(
            Object.entries(count).map(([key, val]) => [key, {
              value: val,
              isNew: Number(key) === nums[i] && val === 1,
              isHighlighted: Number(key) === nums[i] && val > 1,
            }])
          );

          steps.push({
            stepId: steps.length, lineNumbers: [3, 4],
            shortLabel: `Count: nums[${i}]=${nums[i]} → count=${count[nums[i]]}`,
            explanation: count[nums[i]] === 1
              ? `Visit index ${i}, value=${nums[i]}. First time seeing ${nums[i]}, so count[${nums[i]}] = 1.`
              : `Visit index ${i}, value=${nums[i]}. Increment count[${nums[i]}] to ${count[nums[i]]}.`,
            variables: { i, "nums[i]": nums[i], k, count: JSON.stringify(count) },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: mapSnapshot(),
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        // Create buckets
        const buckets = Array.from({ length: n + 1 }, () => []);
        steps.push({
          stepId: steps.length, lineNumbers: [7, 8, 9],
          shortLabel: `Create buckets[0..${n}]`,
          explanation: `Create a bucket array of size n+1 = ${n + 1}. Each bucket[i] will hold elements that appeared exactly i times. Since max frequency is bounded by n=${n}, this is our O(n) sorting trick.`,
          variables: { k, count: JSON.stringify(count), buckets: `${n + 1} empty lists` },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
            hashMap: Object.fromEntries(Object.entries(count).map(([key, val]) => [key, { value: val }])),
          },
          delta: {}, isAnswer: false,
        });

        // Fill buckets
        for (const [val, freq] of Object.entries(count)) {
          buckets[freq].push(Number(val));
        }

        const bucketSummary = buckets
          .map((b, i) => b.length > 0 ? `b[${i}]=[${b.join(",")}]` : null)
          .filter(Boolean)
          .join(", ");

        steps.push({
          stepId: steps.length, lineNumbers: [12, 13],
          shortLabel: "Fill buckets by frequency",
          explanation: `Place each element into the bucket matching its frequency: ${bucketSummary}. Elements are now grouped by frequency without any sorting!`,
          variables: { k, buckets: bucketSummary },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
            hashMap: Object.fromEntries(Object.entries(count).map(([key, val]) => [key, { value: `b[${val}]`, isHighlighted: true }])),
          },
          delta: {}, isAnswer: false,
        });

        // Collect results from highest bucket down
        const result = [];
        for (let freq = n; freq >= 0 && result.length < k; freq--) {
          if (buckets[freq].length === 0) continue;

          for (const val of buckets[freq]) {
            result.push(val);

            const isDone = result.length === k;

            steps.push({
              stepId: steps.length, lineNumbers: [18, 19, 20],
              shortLabel: isDone
                ? `Bucket ${freq}: pick ${val} → done!`
                : `Bucket ${freq}: pick ${val}`,
              explanation: isDone
                ? `Bucket ${freq} contains [${buckets[freq].join(", ")}]. Pick ${val}. Result = [${result.join(", ")}]. We have k=${k} elements — done!`
                : `Bucket ${freq} contains [${buckets[freq].join(", ")}]. Pick ${val}. Result = [${result.join(", ")}]. Need ${k - result.length} more.`,
              variables: {
                freq, k,
                result: `[${result.join(", ")}]`,
                ...(isDone ? { answer: `[${result.join(", ")}]` } : {}),
              },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, i) => [i, result.includes(nums[i]) ? "found" : "visited"])),
                pointers: [],
                hashMap: Object.fromEntries(Object.entries(count).map(([key, v]) => [key, {
                  value: v,
                  isHighlighted: result.includes(Number(key)),
                }])),
              },
              delta: {}, isAnswer: isDone,
            });

            if (isDone) break;
          }
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n)", space: "O(n)", explanation: "HashMap counting is O(n), but sorting entries by frequency costs O(n log n)" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "HashMap counting O(n) + bucket array fill O(n) + bucket scan O(n) = O(n) total", tradeoff: "Bucket sort exploits the bounded frequency range [1..n] to avoid comparison-based sorting entirely" },
  },

  interviewTips: [
    "Start by mentioning the brute force: count + sort = O(n log n). Then ask: can we do better?",
    "The key insight to articulate: frequencies are bounded by n, so we can bucket sort by frequency in O(n).",
    "Mention the heap alternative: a min-heap of size k gives O(n log k). Bucket sort is O(n) — strictly better.",
    "Clarify: 'Are there ties at the k-th boundary?' The problem says the answer is unique, so no ambiguity.",
    "Walk through the bucket array concept clearly — interviewers love seeing you explain WHY it works, not just HOW.",
    "If asked about a follow-up with streaming data, pivot to a heap-based approach since bucket sort needs all data upfront.",
  ],

  relatedProblems: ["group-anagrams", "kth-largest-array", "sort-characters-by-frequency"],
};
