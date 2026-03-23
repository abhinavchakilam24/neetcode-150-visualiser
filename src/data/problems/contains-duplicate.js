export const containsDuplicate = {
  id: 2,
  slug: "contains-duplicate",
  title: "Contains Duplicate",
  difficulty: "Easy",
  topic: "arrays-hashing",
  topicLabel: "Arrays & Hashing",
  neetcodeNumber: 2,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Apple", "Microsoft", "Adobe"],
  leetcodeLink: "https://leetcode.com/problems/contains-duplicate/",

  pattern: "HashSet for O(1) Membership Testing",
  patternExplanation: `When checking if any element appears more than once, a HashSet provides
    O(1) insertion and lookup. Instead of comparing every pair, we simply ask: "Have I seen
    this value before?" as we scan through the array.`,

  intuition: {
    coreInsight: `The question boils down to: does any value repeat? A brute force approach
      compares every pair — O(n²). Sorting groups duplicates adjacently — O(n log n). But the
      fastest way is to maintain a HashSet of values we've already encountered. For each new
      element, we check: "Is this already in my set?" If yes, we found a duplicate. If we
      finish scanning without finding one, every element is unique. One pass, O(n).`,

    mentalModel: `Imagine a bouncer at a club with a guest list. As each person arrives, the
      bouncer checks their ID against the list. If the name is already on the list, they've
      been here before — duplicate detected. If not, the bouncer writes the name down and
      lets them in. The HashSet IS that guest list — instant lookup, instant registration.
      You never need to compare guests against each other.`,

    whyNaiveFails: `Brute force compares every pair (i, j) where i < j, checking if
      nums[i] == nums[j]. That's n*(n-1)/2 comparisons — O(n²). For n=100,000, that's
      roughly 5 billion operations. Even the sorting approach, while better at O(n log n),
      modifies the input array or requires O(n) extra space for a copy. The HashSet approach
      achieves O(n) time with a single read-only pass.`,

    keyObservation: `We don't need to find WHICH elements are duplicates or HOW MANY times
      they appear. We just need to know if ANY duplicate exists. This means we can return
      true the instant we encounter the first repeated value — no need to process the rest
      of the array. Early termination makes the best case O(1) and the average case much
      faster than processing the entire array.`,
  },

  problem: `Given an integer array nums, return true if any value appears at least twice
    in the array, and return false if every element is distinct.`,

  examples: [
    { input: "nums = [1,2,3,1]",   output: "true",  explanation: "1 appears at indices 0 and 3" },
    { input: "nums = [1,2,3,4]",   output: "false", explanation: "All elements are distinct" },
    { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true", explanation: "Multiple duplicates exist" },
  ],

  constraints: [
    "1 <= nums.length <= 10^5",
    "-10^9 <= nums[i] <= 10^9",
  ],

  approaches: {
    brute: {
      label: "Sorting",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      idea: "Sort the array first. After sorting, duplicates must be adjacent. Scan for any two consecutive equal elements.",

      javaCode: `public boolean containsDuplicate(int[] nums) {
    Arrays.sort(nums);

    for (int i = 1; i < nums.length; i++) {
        if (nums[i] == nums[i - 1]) {
            return true;
        }
    }

    return false;
}`,

      cppCode: `bool containsDuplicate(vector<int>& nums) {
    sort(nums.begin(), nums.end());

    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] == nums[i - 1]) {
            return true;
        }
    }

    return false;
}`,

      pythonCode: `def containsDuplicate(nums: List[int]) -> bool:
    nums.sort()

    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return True

    return False`,

      lineAnnotations: {
        2: "Sort the array — duplicates become adjacent",
        4: "Scan from index 1, comparing each element to its predecessor",
        5: "If two adjacent elements are equal, a duplicate exists",
        6: "Found a duplicate — return true immediately",
        9: "No adjacent duplicates found — all elements are unique",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Array with one duplicate, found after sorting",
          input: { nums: [1, 2, 3, 1] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Input array",
              explanation: "We start with the unsorted array [1, 2, 3, 1]. Our goal is to determine if any value repeats.",
              variables: { nums: "[1, 2, 3, 1]" },
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
              lineNumbers: [2],
              shortLabel: "Sort array",
              explanation: "Sort the array. [1, 2, 3, 1] becomes [1, 1, 2, 3]. Now any duplicates must be next to each other.",
              variables: { nums: "[1, 1, 2, 3]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5],
              shortLabel: "i=1: nums[1]==nums[0]? 1==1 YES",
              explanation: "Compare nums[1]=1 with nums[0]=1. They are equal — we found a duplicate immediately! The value 1 appears at least twice.",
              variables: { i: 1, "nums[i]": 1, "nums[i-1]": 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default" },
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
              stepId: 3,
              lineNumbers: [6],
              shortLabel: "Return true",
              explanation: "Adjacent elements are equal after sorting, confirming a duplicate exists. Return true.",
              variables: { answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Duplicates",
          description: "All unique elements — must scan the entire sorted array",
          input: { nums: [1, 2, 3, 4] },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Input array",
              explanation: "Start with [1, 2, 3, 4]. Every element is unique, so we'll need to scan the entire sorted array before concluding.",
              variables: { nums: "[1, 2, 3, 4]" },
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
              lineNumbers: [2],
              shortLabel: "Sort array",
              explanation: "Sort the array. [1, 2, 3, 4] is already sorted, so no changes.",
              variables: { nums: "[1, 2, 3, 4]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5],
              shortLabel: "i=1: 2==1? NO",
              explanation: "Compare nums[1]=2 with nums[0]=1. They differ — no duplicate here. Continue scanning.",
              variables: { i: 1, "nums[i]": 2, "nums[i-1]": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
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
              stepId: 3,
              lineNumbers: [4, 5],
              shortLabel: "i=2: 3==2? NO",
              explanation: "Compare nums[2]=3 with nums[1]=2. Different values — still no duplicate found.",
              variables: { i: 2, "nums[i]": 3, "nums[i-1]": 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default" },
                pointers: [
                  { name: "i-1", index: 1, color: "pointer" },
                  { name: "i", index: 2, color: "active" },
                ],
                hashMap: {},
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5],
              shortLabel: "i=3: 4==3? NO",
              explanation: "Compare nums[3]=4 with nums[2]=3. Different. We've checked every adjacent pair in the sorted array.",
              variables: { i: 3, "nums[i]": 4, "nums[i-1]": 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active" },
                pointers: [
                  { name: "i-1", index: 2, color: "pointer" },
                  { name: "i", index: 3, color: "active" },
                ],
                hashMap: {},
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [9],
              shortLabel: "Return false",
              explanation: "We've compared every adjacent pair in the sorted array. No two consecutive elements were equal. All elements are distinct — return false.",
              variables: { answer: "false" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const sorted = [...nums];

        steps.push({
          stepId: 0, lineNumbers: [1],
          shortLabel: "Input array",
          explanation: `Start with the unsorted array [${nums.join(", ")}].`,
          variables: { nums: `[${nums.join(", ")}]` },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        sorted.sort((a, b) => a - b);

        steps.push({
          stepId: 1, lineNumbers: [2],
          shortLabel: "Sort array",
          explanation: `Sort the array. Result: [${sorted.join(", ")}]. Duplicates are now adjacent.`,
          variables: { nums: `[${sorted.join(", ")}]` },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: {},
          },
          delta: { changedIndices: sorted.map((_, i) => i) }, isAnswer: false,
        });

        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i] === sorted[i - 1]) {
            steps.push({
              stepId: steps.length, lineNumbers: [4, 5],
              shortLabel: `i=${i}: ${sorted[i]}==${sorted[i-1]}? YES`,
              explanation: `Compare nums[${i}]=${sorted[i]} with nums[${i-1}]=${sorted[i-1]}. They are equal — duplicate found!`,
              variables: { i, "nums[i]": sorted[i], "nums[i-1]": sorted[i-1] },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j < i - 1 ? "visited" : j <= i ? "active" : "default"])),
                pointers: [
                  { name: "i-1", index: i - 1, color: "pointer" },
                  { name: "i", index: i, color: "active" },
                ],
                hashMap: {},
              },
              delta: { changedIndices: [i - 1, i] }, isAnswer: false,
            });

            steps.push({
              stepId: steps.length, lineNumbers: [6],
              shortLabel: "Return true",
              explanation: `Duplicate value ${sorted[i]} found at adjacent positions after sorting. Return true.`,
              variables: { answer: "true" },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j === i - 1 || j === i ? "found" : j < i - 1 ? "visited" : "default"])),
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [i - 1, i] }, isAnswer: true,
            });
            return steps;
          }

          steps.push({
            stepId: steps.length, lineNumbers: [4, 5],
            shortLabel: `i=${i}: ${sorted[i]}==${sorted[i-1]}? NO`,
            explanation: `Compare nums[${i}]=${sorted[i]} with nums[${i-1}]=${sorted[i-1]}. Different values — no duplicate here.`,
            variables: { i, "nums[i]": sorted[i], "nums[i-1]": sorted[i-1] },
            dataStructure: {
              arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [
                { name: "i-1", index: i - 1, color: "pointer" },
                { name: "i", index: i, color: "active" },
              ],
              hashMap: {},
            },
            delta: { changedIndices: [i - 1, i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: "Return false",
          explanation: "All adjacent pairs compared — no duplicates found. Every element is distinct. Return false.",
          variables: { answer: "false" },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "visited"])),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "HashSet",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Scan through the array. For each element, check if it already exists in a HashSet.
        If yes, return true. If no, add it to the set and continue. If we finish without finding
        a duplicate, return false.`,

      javaCode: `public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();

    for (int i = 0; i < nums.length; i++) {
        if (seen.contains(nums[i])) {
            return true;
        }
        seen.add(nums[i]);
    }

    return false;
}`,

      cppCode: `bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;

    for (int i = 0; i < nums.size(); i++) {
        if (seen.count(nums[i])) {
            return true;
        }
        seen.insert(nums[i]);
    }

    return false;
}`,

      pythonCode: `def containsDuplicate(nums: List[int]) -> bool:
    seen = set()

    for num in nums:
        if num in seen:
            return True
        seen.add(num)

    return False`,

      lineAnnotations: {
        2: "Initialize an empty HashSet for O(1) lookups",
        4: "Iterate through every element in the array",
        5: "Check if this value has been seen before — O(1) lookup",
        6: "Duplicate found — return true immediately",
        8: "Not seen before — add to the set for future checks",
        11: "Finished scanning — no duplicates exist",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Array with a duplicate found mid-scan",
          input: { nums: [1, 2, 3, 1] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashSet",
              explanation: "Create an empty HashSet called 'seen'. It will remember every value we've encountered so far, with O(1) lookup time.",
              variables: { i: "-", "seen.size": 0, seen: "{}" },
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
              lineNumbers: [4, 5],
              shortLabel: "i=0: 1 in seen? NO",
              explanation: "At index 0, value=1. Check: is 1 already in the set? No — the set is empty. This is the first element we've ever seen.",
              variables: { i: 0, "nums[i]": 1, "seen.size": 0, seen: "{}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8],
              shortLabel: "Add 1 to set",
              explanation: "Value 1 is new. Add it to the set. Now seen = {1}. If we encounter 1 again later, we'll detect the duplicate instantly.",
              variables: { i: 0, "nums[i]": 1, "seen.size": 1, seen: "{1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { 1: { value: true, isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: 1, value: true }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5],
              shortLabel: "i=1: 2 in seen? NO",
              explanation: "At index 1, value=2. Check: is 2 in the set? No — seen only contains {1}. Value 2 is new.",
              variables: { i: 1, "nums[i]": 2, "seen.size": 1, seen: "{1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { 1: { value: true } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8],
              shortLabel: "Add 2 to set",
              explanation: "Value 2 is new. Add it to the set. Now seen = {1, 2}.",
              variables: { i: 1, "nums[i]": 2, "seen.size": 2, seen: "{1, 2}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { 1: { value: true }, 2: { value: true, isNew: true } },
              },
              delta: { changedIndices: [1], mapAdded: [{ key: 2, value: true }] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5],
              shortLabel: "i=2: 3 in seen? NO",
              explanation: "At index 2, value=3. Check: is 3 in the set? No — seen = {1, 2}. Value 3 hasn't appeared before.",
              variables: { i: 2, "nums[i]": 3, "seen.size": 2, seen: "{1, 2}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { 1: { value: true }, 2: { value: true } },
              },
              delta: { changedIndices: [2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [8],
              shortLabel: "Add 3 to set",
              explanation: "Value 3 is new. Add it to the set. Now seen = {1, 2, 3}.",
              variables: { i: 2, "nums[i]": 3, "seen.size": 3, seen: "{1, 2, 3}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { 1: { value: true }, 2: { value: true }, 3: { value: true, isNew: true } },
              },
              delta: { changedIndices: [2], mapAdded: [{ key: 3, value: true }] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [4, 5],
              shortLabel: "i=3: 1 in seen? YES",
              explanation: "At index 3, value=1. Check: is 1 in the set? YES! We saw 1 at the very beginning. Duplicate detected!",
              variables: { i: 3, "nums[i]": 1, "seen.size": 3, seen: "{1, 2, 3}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { 1: { value: true, isHighlighted: true }, 2: { value: true }, 3: { value: true } },
              },
              delta: { changedIndices: [3], movedPointers: ["i"], mapHighlighted: [1] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [6],
              shortLabel: "Return true",
              explanation: "Value 1 was already in the set — it appeared at index 0 and again at index 3. A duplicate exists. Return true.",
              variables: { answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "visited", 2: "visited", 3: "found" },
                pointers: [],
                hashMap: { 1: { value: true, isHighlighted: true }, 2: { value: true }, 3: { value: true } },
              },
              delta: { changedIndices: [0, 3], mapHighlighted: [1] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Unique",
          description: "No duplicates — must scan entire array and return false",
          input: { nums: [1, 2, 3, 4] },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashSet",
              explanation: "Create an empty HashSet. Since all elements are unique, we'll scan the entire array without finding any duplicate.",
              variables: { i: "-", "seen.size": 0, seen: "{}" },
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
              lineNumbers: [4, 5, 8],
              shortLabel: "i=0: 1 new, add to set",
              explanation: "At index 0, value=1. Not in the set (it's empty). Add 1 to the set.",
              variables: { i: 0, "nums[i]": 1, "seen.size": 1, seen: "{1}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { 1: { value: true, isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: 1, value: true }] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 8],
              shortLabel: "i=1: 2 new, add to set",
              explanation: "At index 1, value=2. Not in the set. Add 2. seen = {1, 2}.",
              variables: { i: 1, "nums[i]": 2, "seen.size": 2, seen: "{1, 2}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { 1: { value: true }, 2: { value: true, isNew: true } },
              },
              delta: { changedIndices: [1], mapAdded: [{ key: 2, value: true }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 8],
              shortLabel: "i=2: 3 new, add to set",
              explanation: "At index 2, value=3. Not in the set. Add 3. seen = {1, 2, 3}.",
              variables: { i: 2, "nums[i]": 3, "seen.size": 3, seen: "{1, 2, 3}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { 1: { value: true }, 2: { value: true }, 3: { value: true, isNew: true } },
              },
              delta: { changedIndices: [2], mapAdded: [{ key: 3, value: true }] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 8],
              shortLabel: "i=3: 4 new, add to set",
              explanation: "At index 3, value=4. Not in the set. Add 4. seen = {1, 2, 3, 4}. This is the last element.",
              variables: { i: 3, "nums[i]": 4, "seen.size": 4, seen: "{1, 2, 3, 4}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { 1: { value: true }, 2: { value: true }, 3: { value: true }, 4: { value: true, isNew: true } },
              },
              delta: { changedIndices: [3], mapAdded: [{ key: 4, value: true }] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11],
              shortLabel: "Return false",
              explanation: "We've scanned every element. The set grew to size 4 — equal to the array length. No value was ever already in the set. All elements are distinct. Return false.",
              variables: { answer: "false", "seen.size": 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited" },
                pointers: [],
                hashMap: { 1: { value: true }, 2: { value: true }, 3: { value: true }, 4: { value: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Immediate Duplicate",
          description: "Duplicate at the very start — best case for early termination",
          input: { nums: [5, 5, 3, 7] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashSet",
              explanation: "Create an empty HashSet. This scenario has a duplicate right at the start — we'll find it almost immediately.",
              variables: { i: "-", "seen.size": 0, seen: "{}" },
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
              lineNumbers: [4, 5],
              shortLabel: "i=0: 5 in seen? NO",
              explanation: "At index 0, value=5. Is 5 in the set? No — the set is empty.",
              variables: { i: 0, "nums[i]": 5, "seen.size": 0, seen: "{}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8],
              shortLabel: "Add 5 to set",
              explanation: "Value 5 is new. Add it to the set. seen = {5}.",
              variables: { i: 0, "nums[i]": 5, "seen.size": 1, seen: "{5}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { 5: { value: true, isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: 5, value: true }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5],
              shortLabel: "i=1: 5 in seen? YES",
              explanation: "At index 1, value=5. Is 5 in the set? YES! We just added 5 from index 0. Duplicate found after only 2 elements!",
              variables: { i: 1, "nums[i]": 5, "seen.size": 1, seen: "{5}" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { 5: { value: true, isHighlighted: true } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"], mapHighlighted: [5] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6],
              shortLabel: "Return true",
              explanation: "Value 5 appears at index 0 and index 1. We found the duplicate in just 2 iterations — this is the power of early termination. We never even looked at indices 2 and 3. Return true.",
              variables: { answer: "true" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default" },
                pointers: [],
                hashMap: { 5: { value: true, isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1], mapHighlighted: [5] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const seen = new Set();

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init HashSet",
          explanation: "Create an empty HashSet to track values we've seen.",
          variables: { i: "-", "seen.size": 0, seen: "{}" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < nums.length; i++) {
          const val = nums[i];

          // Check step
          steps.push({
            stepId: steps.length, lineNumbers: [4, 5],
            shortLabel: `i=${i}: ${val} in seen? ${seen.has(val) ? "YES" : "NO"}`,
            explanation: seen.has(val)
              ? `At index ${i}, value=${val}. Is ${val} in the set? YES! We've seen ${val} before. Duplicate detected!`
              : `At index ${i}, value=${val}. Is ${val} in the set? No — ${seen.size === 0 ? "the set is empty" : `seen = {${[...seen].join(", ")}}`}. Value ${val} is new.`,
            variables: { i, "nums[i]": val, "seen.size": seen.size, seen: `{${[...seen].join(", ")}}` },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: Object.fromEntries([...seen].map(v => [v, { value: true, isHighlighted: v === val && seen.has(val) }])),
            },
            delta: { changedIndices: [i], movedPointers: ["i"], ...(seen.has(val) ? { mapHighlighted: [val] } : {}) },
            isAnswer: false,
          });

          if (seen.has(val)) {
            // Found duplicate — return true
            steps.push({
              stepId: steps.length, lineNumbers: [6],
              shortLabel: "Return true",
              explanation: `Value ${val} was already in the set. A duplicate exists. Return true.`,
              variables: { answer: "true" },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, j) => {
                  if (j === i) return [j, "found"];
                  // Find the first occurrence of this value
                  for (let k = 0; k < i; k++) {
                    if (nums[k] === val && k !== i) return j === k ? [j, "found"] : [j, j < i ? "visited" : "default"];
                  }
                  return [j, j < i ? "visited" : "default"];
                })),
                pointers: [],
                hashMap: Object.fromEntries([...seen].map(v => [v, { value: true, isHighlighted: v === val }])),
              },
              delta: { mapHighlighted: [val] }, isAnswer: true,
            });
            return steps;
          }

          // Add to set step
          seen.add(val);
          steps.push({
            stepId: steps.length, lineNumbers: [8],
            shortLabel: `Add ${val} to set`,
            explanation: `Value ${val} is new. Add it to the set. seen = {${[...seen].join(", ")}}.`,
            variables: { i, "nums[i]": val, "seen.size": seen.size, seen: `{${[...seen].join(", ")}}` },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j <= i ? "visited" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: Object.fromEntries([...seen].map(v => [v, { value: true, isNew: v === val }])),
            },
            delta: { changedIndices: [i], mapAdded: [{ key: val, value: true }] }, isAnswer: false,
          });
        }

        // No duplicate found
        steps.push({
          stepId: steps.length, lineNumbers: [11],
          shortLabel: "Return false",
          explanation: "Scanned every element. No value appeared twice. All elements are distinct. Return false.",
          variables: { answer: "false", "seen.size": seen.size },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
            hashMap: Object.fromEntries([...seen].map(v => [v, { value: true }])),
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n)", space: "O(1)", explanation: "Sorting dominates; in-place sort uses constant extra space" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "Single pass through array; HashSet stores up to n elements", tradeoff: "Trade O(n) space to improve time from O(n log n) to O(n)" },
  },

  interviewTips: [
    "Start by mentioning the brute force O(n²) nested loop approach, then immediately improve to sorting O(n log n), then HashSet O(n).",
    "Ask: 'Can I modify the input array?' — if yes, sorting is viable without extra space. If no, HashSet is the way.",
    "Mention that HashSet uses O(n) space in the worst case (all unique elements), but enables early termination.",
    "Point out that the best case for HashSet is O(1) — if the first two elements are duplicates, we're done instantly.",
    "If the interviewer asks about a follow-up with limited memory, mention sorting (O(1) space) or bit manipulation for bounded integer ranges.",
    "This problem is a gateway to understanding when to use a HashSet vs HashMap — here we only need existence checks, not value lookups.",
  ],

  relatedProblems: ["valid-anagram", "two-sum", "longest-consecutive-sequence"],
};
