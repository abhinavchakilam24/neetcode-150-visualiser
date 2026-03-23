export const longestConsecutiveSequence = {
  id: 9,
  slug: "longest-consecutive-sequence",
  title: "Longest Consecutive Sequence",
  difficulty: "Medium",
  topic: "arrays-hashing",
  topicLabel: "Arrays & Hashing",
  neetcodeNumber: 9,
  artifactType: "ArrayHashMap",
  companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/longest-consecutive-sequence/",

  pattern: "HashSet for O(1) Membership + Sequence Start Detection",
  patternExplanation: `When you need to find consecutive sequences in unsorted data,
    a HashSet gives O(1) membership checks. The key trick: only start counting from
    sequence starts (numbers where num-1 is NOT in the set), so each element is visited
    at most twice — once when added to the set, once when counted in a sequence.`,

  intuition: {
    coreInsight: `Sorting works but costs O(n log n). Instead, dump everything into a HashSet.
      For each number, check if it's the START of a sequence — meaning (num - 1) is NOT in the set.
      If it is a start, count upward (num+1, num+2, ...) while each successor exists in the set.
      Track the longest chain. Every element is touched at most twice total across all sequence
      expansions, giving O(n) time.`,

    mentalModel: `Imagine you have a pile of numbered cards scattered on a table. You want to find
      the longest run of consecutive numbers. First, you spread them all face-up so you can see every
      card at a glance (the HashSet). Then you look for cards that have NO predecessor — these are
      sequence starters. From each starter, you count forward: "Is card 5 here? Yes. Card 6? Yes.
      Card 7? No. That sequence was length 3." You never count from the middle of a sequence because
      you'd just be repeating work.`,

    whyNaiveFails: `Sorting first in O(n log n) works but violates the O(n) requirement. A brute
      force approach — for each element, scan the entire array to find num+1, then num+2, etc. —
      is O(n²) or worse. With n=100,000, that's 10 billion operations. The HashSet approach does
      it in exactly 2n lookups worst case.`,

    keyObservation: `The critical insight is the "sequence start" check: if (num - 1) is NOT in the
      set, then num is the beginning of a new sequence. This prevents redundant counting. Without
      this check, you'd try to count forward from every element, leading to O(n²) in cases like
      [1, 2, 3, ..., n] where element 1 counts n steps, element 2 counts n-1 steps, etc.`,
  },

  problem: `Given an unsorted array of integers nums, return the length of the longest consecutive
    elements sequence. You must write an algorithm that runs in O(n) time.`,

  examples: [
    { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive sequence is [1, 2, 3, 4]. Its length is 4." },
    { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9", explanation: "The longest consecutive sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]. Its length is 9." },
  ],

  constraints: [
    "0 <= nums.length <= 10^5",
    "-10^9 <= nums[i] <= 10^9",
  ],

  approaches: {
    brute: {
      label: "Sort First",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      idea: "Sort the array, then scan linearly to find the longest run of consecutive values. Handle duplicates by skipping them.",

      javaCode: `public int longestConsecutive(int[] nums) {
    if (nums.length == 0) return 0;
    Arrays.sort(nums);
    int longest = 1, current = 1;
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] == nums[i - 1]) continue;
        if (nums[i] == nums[i - 1] + 1) {
            current++;
        } else {
            longest = Math.max(longest, current);
            current = 1;
        }
    }
    return Math.max(longest, current);
}`,

      cppCode: `int longestConsecutive(vector<int>& nums) {
    if (nums.empty()) return 0;
    sort(nums.begin(), nums.end());
    int longest = 1, current = 1;
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] == nums[i - 1]) continue;
        if (nums[i] == nums[i - 1] + 1) {
            current++;
        } else {
            longest = max(longest, current);
            current = 1;
        }
    }
    return max(longest, current);
}`,

      pythonCode: `def longestConsecutive(nums: List[int]) -> int:
    if not nums:
        return 0
    nums.sort()
    longest, current = 1, 1
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            continue
        if nums[i] == nums[i - 1] + 1:
            current += 1
        else:
            longest = max(longest, current)
            current = 1
    return max(longest, current)`,

      lineAnnotations: {
        2: "Edge case: empty array returns 0",
        3: "Sort the array — O(n log n)",
        4: "Track longest streak and current streak",
        5: "Scan from second element",
        6: "Skip duplicates — they don't count as consecutive",
        7: "If consecutive, extend current streak",
        8: "Increment current streak length",
        10: "Streak broken — update longest and reset",
        11: "Reset current streak to 1",
        13: "Final comparison — streak may end at the last element",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [100, 4, 200, 1, 3, 2] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Sort array",
              explanation: "Sort the input [100, 4, 200, 1, 3, 2] to get [1, 2, 3, 4, 100, 200]. Now consecutive elements are adjacent.",
              variables: { longest: 1, current: 1, sorted: "[1, 2, 3, 4, 100, 200]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [1, 2, 3, 4, 100, 200],
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 7, 8],
              shortLabel: "i=1: 2==1+1 → current=2",
              explanation: "At i=1, nums[1]=2. Previous is 1. 2 == 1+1, so this is consecutive. current becomes 2.",
              variables: { i: 1, "nums[i]": 2, "nums[i-1]": 1, current: 2, longest: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [1, 2, 3, 4, 100, 200],
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 7, 8],
              shortLabel: "i=2: 3==2+1 → current=3",
              explanation: "At i=2, nums[2]=3. Previous is 2. Consecutive. current becomes 3.",
              variables: { i: 2, "nums[i]": 3, "nums[i-1]": 2, current: 3, longest: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [1, 2, 3, 4, 100, 200],
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 7, 8],
              shortLabel: "i=3: 4==3+1 → current=4",
              explanation: "At i=3, nums[3]=4. Previous is 3. Consecutive. current becomes 4.",
              variables: { i: 3, "nums[i]": 4, "nums[i-1]": 3, current: 4, longest: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default" },
                arrayLabels: [1, 2, 3, 4, 100, 200],
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 10, 11],
              shortLabel: "i=4: 100≠4+1 → longest=4, reset",
              explanation: "At i=4, nums[4]=100. Previous is 4. 100 != 5 — streak broken. Update longest = max(1, 4) = 4. Reset current to 1.",
              variables: { i: 4, "nums[i]": 100, "nums[i-1]": 4, current: 1, longest: 4 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "active", 5: "default" },
                arrayLabels: [1, 2, 3, 4, 100, 200],
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 10, 11],
              shortLabel: "i=5: 200≠100+1 → reset",
              explanation: "At i=5, nums[5]=200. Previous is 100. 200 != 101 — streak broken again. longest stays 4, current resets to 1.",
              variables: { i: 5, "nums[i]": 200, "nums[i-1]": 100, current: 1, longest: 4 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "visited", 5: "active" },
                arrayLabels: [1, 2, 3, 4, 100, 200],
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13],
              shortLabel: "Return max(4, 1) = 4",
              explanation: "End of array. Return max(longest, current) = max(4, 1) = 4. The longest consecutive sequence was [1, 2, 3, 4].",
              variables: { longest: 4, current: 1, answer: 4 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "visited", 5: "visited" },
                arrayLabels: [1, 2, 3, 4, 100, 200],
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
        if (nums.length === 0) {
          steps.push({
            stepId: 0, lineNumbers: [2],
            shortLabel: "Empty array → 0",
            explanation: "Array is empty. Return 0.",
            variables: { answer: 0 },
            dataStructure: { arrayStates: {}, pointers: [], hashMap: {} },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const sorted = [...nums].sort((a, b) => a - b);
        steps.push({
          stepId: 0, lineNumbers: [3],
          shortLabel: "Sort array",
          explanation: `Sort the input to get [${sorted.join(", ")}]. Now consecutive elements are adjacent.`,
          variables: { longest: 1, current: 1, sorted: `[${sorted.join(", ")}]` },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            arrayLabels: sorted,
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        let longest = 1, current = 1;
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i] === sorted[i - 1]) {
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6],
              shortLabel: `i=${i}: ${sorted[i]}==${sorted[i-1]} skip dup`,
              explanation: `At i=${i}, nums[${i}]=${sorted[i]} equals previous ${sorted[i-1]}. Skip duplicate.`,
              variables: { i, "nums[i]": sorted[i], "nums[i-1]": sorted[i-1], current, longest },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
                arrayLabels: sorted,
                pointers: [{ name: "i", index: i, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
            continue;
          }
          if (sorted[i] === sorted[i - 1] + 1) {
            current++;
            steps.push({
              stepId: steps.length, lineNumbers: [5, 7, 8],
              shortLabel: `i=${i}: ${sorted[i]}==${sorted[i-1]}+1 → current=${current}`,
              explanation: `At i=${i}, nums[${i}]=${sorted[i]}. Previous is ${sorted[i-1]}. Consecutive! current becomes ${current}.`,
              variables: { i, "nums[i]": sorted[i], "nums[i-1]": sorted[i-1], current, longest },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
                arrayLabels: sorted,
                pointers: [{ name: "i", index: i, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          } else {
            longest = Math.max(longest, current);
            current = 1;
            steps.push({
              stepId: steps.length, lineNumbers: [5, 10, 11],
              shortLabel: `i=${i}: ${sorted[i]}≠${sorted[i-1]}+1 → reset`,
              explanation: `At i=${i}, nums[${i}]=${sorted[i]}. Previous is ${sorted[i-1]}. Not consecutive. Update longest=${longest}, reset current to 1.`,
              variables: { i, "nums[i]": sorted[i], "nums[i-1]": sorted[i-1], current, longest },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
                arrayLabels: sorted,
                pointers: [{ name: "i", index: i, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        longest = Math.max(longest, current);
        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: `Return ${longest}`,
          explanation: `End of array. Return max(longest, current) = ${longest}.`,
          variables: { longest, current, answer: longest },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, j) => [j, "visited"])),
            arrayLabels: sorted,
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
      label: "HashSet Sequence Starts",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Add all numbers to a HashSet. For each number, check if (num - 1) is NOT in the set —
        if so, it's a sequence start. Count upward from that start while (num + 1, num + 2, ...)
        exist in the set. Track the longest sequence found.`,

      javaCode: `public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int num : nums) set.add(num);

    int longest = 0;

    for (int num : set) {
        if (!set.contains(num - 1)) {
            int current = num;
            int streak = 1;

            while (set.contains(current + 1)) {
                current++;
                streak++;
            }

            longest = Math.max(longest, streak);
        }
    }

    return longest;
}`,

      cppCode: `int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());

    int longest = 0;

    for (int num : s) {
        if (s.find(num - 1) == s.end()) {
            int current = num;
            int streak = 1;

            while (s.find(current + 1) != s.end()) {
                current++;
                streak++;
            }

            longest = max(longest, streak);
        }
    }

    return longest;
}`,

      pythonCode: `def longestConsecutive(nums: List[int]) -> int:
    num_set = set(nums)

    longest = 0

    for num in num_set:
        if num - 1 not in num_set:
            current = num
            streak = 1

            while current + 1 in num_set:
                current += 1
                streak += 1

            longest = max(longest, streak)

    return longest`,

      lineAnnotations: {
        2: "Build HashSet from all numbers — O(n) time, O(n) space",
        3: "Add every element for O(1) lookups",
        5: "Track the longest consecutive sequence found so far",
        7: "Iterate through each unique number in the set",
        8: "KEY: Only start counting if this is a sequence START (no predecessor)",
        9: "Initialize current pointer at sequence start",
        10: "Initialize streak length to 1",
        12: "Extend the sequence: check if next consecutive number exists",
        13: "Move current pointer forward",
        14: "Increment streak length",
        17: "Update longest if this sequence is the new maximum",
        21: "Return the longest consecutive sequence length",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Mixed unsorted array with one clear longest sequence",
          input: { nums: [100, 4, 200, 1, 3, 2] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Build HashSet",
              explanation: "Add all elements to a HashSet: {100, 4, 200, 1, 3, 2}. This gives us O(1) lookups for any value. The array itself is shown for reference.",
              variables: { longest: 0, set: "{100, 4, 200, 1, 3, 2}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [],
                hashMap: {
                  100: { value: true, isNew: true },
                  4: { value: true, isNew: true },
                  200: { value: true, isNew: true },
                  1: { value: true, isNew: true },
                  3: { value: true, isNew: true },
                  2: { value: true, isNew: true },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8],
              shortLabel: "num=1: 0 in set? NO → sequence start!",
              explanation: "Check num=1. Is (1-1)=0 in the set? No! So 1 is a sequence START. We'll count forward from here.",
              variables: { num: 1, "num-1": 0, "inSet": false, longest: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "active", 4: "default", 5: "default" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [{ name: "num", index: 3, color: "pointer" }],
                hashMap: {
                  100: { value: true },
                  4: { value: true },
                  200: { value: true },
                  1: { value: true, isHighlighted: true },
                  3: { value: true },
                  2: { value: true },
                },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 12, 13, 14],
              shortLabel: "Count: 1→2→3→4, streak=4",
              explanation: "Starting from 1, count up. Is 2 in set? Yes (streak=2). Is 3 in set? Yes (streak=3). Is 4 in set? Yes (streak=4). Is 5 in set? No. Sequence [1,2,3,4] has length 4.",
              variables: { num: 1, current: 4, streak: 4, "next check": 5, longest: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "default", 3: "found", 4: "found", 5: "found" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [],
                hashMap: {
                  100: { value: true },
                  4: { value: true, isHighlighted: true },
                  200: { value: true },
                  1: { value: true, isHighlighted: true },
                  3: { value: true, isHighlighted: true },
                  2: { value: true, isHighlighted: true },
                },
              },
              delta: { changedIndices: [1, 3, 4, 5] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [17],
              shortLabel: "longest = max(0, 4) = 4",
              explanation: "Update longest = max(0, 4) = 4. This is the longest sequence so far.",
              variables: { streak: 4, longest: 4 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "default", 3: "found", 4: "found", 5: "found" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [],
                hashMap: {
                  100: { value: true },
                  4: { value: true, isHighlighted: true },
                  200: { value: true },
                  1: { value: true, isHighlighted: true },
                  3: { value: true, isHighlighted: true },
                  2: { value: true, isHighlighted: true },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8],
              shortLabel: "num=2: 1 in set? YES → skip",
              explanation: "Check num=2. Is (2-1)=1 in the set? Yes! So 2 is NOT a sequence start — it's part of the sequence we already counted starting from 1. Skip it.",
              variables: { num: 2, "num-1": 1, "inSet": true, longest: 4 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "active" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [{ name: "num", index: 5, color: "pointer" }],
                hashMap: {
                  100: { value: true },
                  4: { value: true },
                  200: { value: true },
                  1: { value: true },
                  3: { value: true },
                  2: { value: true, isHighlighted: true },
                },
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8],
              shortLabel: "num=3: 2 in set? YES → skip",
              explanation: "Check num=3. Is (3-1)=2 in the set? Yes! Not a sequence start. Skip.",
              variables: { num: 3, "num-1": 2, "inSet": true, longest: 4 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "active", 5: "default" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [{ name: "num", index: 4, color: "pointer" }],
                hashMap: {
                  100: { value: true },
                  4: { value: true },
                  200: { value: true },
                  1: { value: true },
                  3: { value: true, isHighlighted: true },
                  2: { value: true },
                },
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [7, 8],
              shortLabel: "num=4: 3 in set? YES → skip",
              explanation: "Check num=4. Is (4-1)=3 in the set? Yes! Not a sequence start. Skip.",
              variables: { num: 4, "num-1": 3, "inSet": true, longest: 4 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [{ name: "num", index: 1, color: "pointer" }],
                hashMap: {
                  100: { value: true },
                  4: { value: true, isHighlighted: true },
                  200: { value: true },
                  1: { value: true },
                  3: { value: true },
                  2: { value: true },
                },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [7, 8],
              shortLabel: "num=100: 99 in set? NO → start!",
              explanation: "Check num=100. Is 99 in the set? No! 100 is a sequence start. Count forward: is 101 in set? No. Sequence [100] has length 1. longest stays 4.",
              variables: { num: 100, "num-1": 99, streak: 1, longest: 4 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [{ name: "num", index: 0, color: "pointer" }],
                hashMap: {
                  100: { value: true, isHighlighted: true },
                  4: { value: true },
                  200: { value: true },
                  1: { value: true },
                  3: { value: true },
                  2: { value: true },
                },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [7, 8],
              shortLabel: "num=200: 199 in set? NO → start!",
              explanation: "Check num=200. Is 199 in the set? No! 200 is a sequence start. Count forward: is 201 in set? No. Sequence [200] has length 1. longest stays 4.",
              variables: { num: 200, "num-1": 199, streak: 1, longest: 4 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [{ name: "num", index: 2, color: "pointer" }],
                hashMap: {
                  100: { value: true },
                  4: { value: true },
                  200: { value: true, isHighlighted: true },
                  1: { value: true },
                  3: { value: true },
                  2: { value: true },
                },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [21],
              shortLabel: "Return 4",
              explanation: "All numbers processed. The longest consecutive sequence was [1, 2, 3, 4] with length 4. Each element was checked at most twice (once as a potential start, once during counting), so total work is O(n).",
              variables: { longest: 4, answer: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "visited", 3: "found", 4: "found", 5: "found" },
                arrayLabels: [100, 4, 200, 1, 3, 2],
                pointers: [],
                hashMap: {
                  100: { value: true },
                  4: { value: true, isHighlighted: true },
                  200: { value: true },
                  1: { value: true, isHighlighted: true },
                  3: { value: true, isHighlighted: true },
                  2: { value: true, isHighlighted: true },
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Duplicates",
          description: "Array with duplicate values — duplicates should not affect sequence length",
          input: { nums: [1, 2, 0, 1] },
          expectedOutput: "3",
          commonMistake: "Counting duplicates as extending the sequence. The HashSet naturally deduplicates, but a sorting approach must explicitly skip duplicates.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Build HashSet",
              explanation: "Add all elements to HashSet: {0, 1, 2}. Notice that the duplicate 1 is automatically removed — sets store unique values only.",
              variables: { longest: 0, set: "{0, 1, 2}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                arrayLabels: [1, 2, 0, 1],
                pointers: [],
                hashMap: {
                  0: { value: true, isNew: true },
                  1: { value: true, isNew: true },
                  2: { value: true, isNew: true },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8],
              shortLabel: "num=0: -1 in set? NO → start!",
              explanation: "Check num=0. Is -1 in the set? No! So 0 is a sequence start. We'll count forward from here.",
              variables: { num: 0, "num-1": -1, "inSet": false, longest: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default" },
                arrayLabels: [1, 2, 0, 1],
                pointers: [{ name: "num", index: 2, color: "pointer" }],
                hashMap: {
                  0: { value: true, isHighlighted: true },
                  1: { value: true },
                  2: { value: true },
                },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 12, 13, 14],
              shortLabel: "Count: 0→1→2, streak=3",
              explanation: "From 0: is 1 in set? Yes (streak=2). Is 2 in set? Yes (streak=3). Is 3 in set? No. Sequence [0,1,2] has length 3.",
              variables: { num: 0, current: 2, streak: 3, "next check": 3, longest: 0 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                arrayLabels: [1, 2, 0, 1],
                pointers: [],
                hashMap: {
                  0: { value: true, isHighlighted: true },
                  1: { value: true, isHighlighted: true },
                  2: { value: true, isHighlighted: true },
                },
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [17],
              shortLabel: "longest = max(0, 3) = 3",
              explanation: "Update longest = max(0, 3) = 3.",
              variables: { streak: 3, longest: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                arrayLabels: [1, 2, 0, 1],
                pointers: [],
                hashMap: {
                  0: { value: true, isHighlighted: true },
                  1: { value: true, isHighlighted: true },
                  2: { value: true, isHighlighted: true },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 8],
              shortLabel: "num=1: 0 in set? YES → skip",
              explanation: "Check num=1. Is 0 in the set? Yes! 1 is not a sequence start — already counted as part of [0,1,2]. Skip.",
              variables: { num: 1, "num-1": 0, "inSet": true, longest: 3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                arrayLabels: [1, 2, 0, 1],
                pointers: [{ name: "num", index: 0, color: "pointer" }],
                hashMap: {
                  0: { value: true },
                  1: { value: true, isHighlighted: true },
                  2: { value: true },
                },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8],
              shortLabel: "num=2: 1 in set? YES → skip",
              explanation: "Check num=2. Is 1 in the set? Yes! Not a sequence start. Skip.",
              variables: { num: 2, "num-1": 1, "inSet": true, longest: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "default", 3: "default" },
                arrayLabels: [1, 2, 0, 1],
                pointers: [{ name: "num", index: 1, color: "pointer" }],
                hashMap: {
                  0: { value: true },
                  1: { value: true },
                  2: { value: true, isHighlighted: true },
                },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [21],
              shortLabel: "Return 3",
              explanation: "All numbers processed. Longest consecutive sequence is [0, 1, 2] with length 3. Duplicates didn't affect the result because the HashSet deduplicated them.",
              variables: { longest: 3, answer: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                arrayLabels: [1, 2, 0, 1],
                pointers: [],
                hashMap: {
                  0: { value: true, isHighlighted: true },
                  1: { value: true, isHighlighted: true },
                  2: { value: true, isHighlighted: true },
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Multiple Sequences",
          description: "Two separate sequences of equal length — tests that we check all starts",
          input: { nums: [5, 6, 3, 10, 11, 12] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Build HashSet",
              explanation: "Add all elements to HashSet: {3, 5, 6, 10, 11, 12}. There are two sequences: [5,6] and [10,11,12], plus the isolated 3.",
              variables: { longest: 0, set: "{3, 5, 6, 10, 11, 12}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [],
                hashMap: {
                  3: { value: true, isNew: true },
                  5: { value: true, isNew: true },
                  6: { value: true, isNew: true },
                  10: { value: true, isNew: true },
                  11: { value: true, isNew: true },
                  12: { value: true, isNew: true },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8],
              shortLabel: "num=3: 2 in set? NO → start!",
              explanation: "Check num=3. Is 2 in the set? No! 3 is a sequence start. Count forward: is 4 in set? No. Sequence [3] has length 1.",
              variables: { num: 3, "num-1": 2, streak: 1, longest: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [{ name: "num", index: 2, color: "pointer" }],
                hashMap: {
                  3: { value: true, isHighlighted: true },
                  5: { value: true },
                  6: { value: true },
                  10: { value: true },
                  11: { value: true },
                  12: { value: true },
                },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [17],
              shortLabel: "longest = max(0, 1) = 1",
              explanation: "Update longest = max(0, 1) = 1.",
              variables: { streak: 1, longest: 1 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "visited", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [],
                hashMap: {
                  3: { value: true },
                  5: { value: true },
                  6: { value: true },
                  10: { value: true },
                  11: { value: true },
                  12: { value: true },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8, 9, 10, 12, 13, 14],
              shortLabel: "num=5: 4 not in set → start! 5→6, streak=2",
              explanation: "Check num=5. Is 4 in set? No! Sequence start. Count: is 6 in set? Yes (streak=2). Is 7 in set? No. Sequence [5,6] has length 2.",
              variables: { num: 5, streak: 2, longest: 1 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "visited", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [],
                hashMap: {
                  3: { value: true },
                  5: { value: true, isHighlighted: true },
                  6: { value: true, isHighlighted: true },
                  10: { value: true },
                  11: { value: true },
                  12: { value: true },
                },
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [17],
              shortLabel: "longest = max(1, 2) = 2",
              explanation: "Update longest = max(1, 2) = 2.",
              variables: { streak: 2, longest: 2 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "visited", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [],
                hashMap: {
                  3: { value: true },
                  5: { value: true, isHighlighted: true },
                  6: { value: true, isHighlighted: true },
                  10: { value: true },
                  11: { value: true },
                  12: { value: true },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8],
              shortLabel: "num=6: 5 in set? YES → skip",
              explanation: "Check num=6. Is 5 in set? Yes! Not a sequence start. Skip.",
              variables: { num: 6, "num-1": 5, longest: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "visited", 3: "default", 4: "default", 5: "default" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [{ name: "num", index: 1, color: "pointer" }],
                hashMap: {
                  3: { value: true },
                  5: { value: true },
                  6: { value: true, isHighlighted: true },
                  10: { value: true },
                  11: { value: true },
                  12: { value: true },
                },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [7, 8, 9, 10, 12, 13, 14],
              shortLabel: "num=10: 9 not in set → start! 10→11→12, streak=3",
              explanation: "Check num=10. Is 9 in set? No! Sequence start. Count: 11 in set? Yes (streak=2). 12 in set? Yes (streak=3). 13 in set? No. Sequence [10,11,12] has length 3.",
              variables: { num: 10, streak: 3, longest: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "visited", 3: "found", 4: "found", 5: "found" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [],
                hashMap: {
                  3: { value: true },
                  5: { value: true },
                  6: { value: true },
                  10: { value: true, isHighlighted: true },
                  11: { value: true, isHighlighted: true },
                  12: { value: true, isHighlighted: true },
                },
              },
              delta: { changedIndices: [3, 4, 5] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [17],
              shortLabel: "longest = max(2, 3) = 3",
              explanation: "Update longest = max(2, 3) = 3. This is the new maximum.",
              variables: { streak: 3, longest: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "visited", 3: "found", 4: "found", 5: "found" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [],
                hashMap: {
                  3: { value: true },
                  5: { value: true },
                  6: { value: true },
                  10: { value: true, isHighlighted: true },
                  11: { value: true, isHighlighted: true },
                  12: { value: true, isHighlighted: true },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [7, 8],
              shortLabel: "num=11: 10 in set → skip; num=12: 11 in set → skip",
              explanation: "num=11 has predecessor 10 in set — skip. num=12 has predecessor 11 in set — skip. Both are mid-sequence, already counted.",
              variables: { longest: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [],
                hashMap: {
                  3: { value: true },
                  5: { value: true },
                  6: { value: true },
                  10: { value: true },
                  11: { value: true },
                  12: { value: true },
                },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [21],
              shortLabel: "Return 3",
              explanation: "All numbers processed. The longest consecutive sequence was [10, 11, 12] with length 3. The sequence [5, 6] had length 2 and [3] had length 1.",
              variables: { longest: 3, answer: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "found", 4: "found", 5: "found" },
                arrayLabels: [5, 6, 3, 10, 11, 12],
                pointers: [],
                hashMap: {
                  3: { value: true },
                  5: { value: true },
                  6: { value: true },
                  10: { value: true, isHighlighted: true },
                  11: { value: true, isHighlighted: true },
                  12: { value: true, isHighlighted: true },
                },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        if (nums.length === 0) {
          steps.push({
            stepId: 0, lineNumbers: [21],
            shortLabel: "Empty → 0",
            explanation: "Array is empty. No consecutive sequence possible. Return 0.",
            variables: { answer: 0 },
            dataStructure: { arrayStates: {}, pointers: [], hashMap: {} },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const numSet = new Set(nums);
        const setObj = {};
        for (const n of numSet) setObj[n] = true;

        // Build HashSet step
        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Build HashSet",
          explanation: `Add all elements to HashSet: {${[...numSet].join(", ")}}. This gives O(1) lookups.`,
          variables: { longest: 0, set: `{${[...numSet].join(", ")}}` },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            arrayLabels: nums,
            pointers: [],
            hashMap: Object.fromEntries([...numSet].map(n => [n, { value: true, isNew: true }])),
          },
          delta: {}, isAnswer: false,
        });

        let longest = 0;

        for (const num of numSet) {
          if (!numSet.has(num - 1)) {
            // Sequence start found
            steps.push({
              stepId: steps.length, lineNumbers: [7, 8],
              shortLabel: `num=${num}: ${num - 1} not in set → start!`,
              explanation: `Check num=${num}. Is ${num - 1} in the set? No! So ${num} is a sequence start. Count forward from here.`,
              variables: { num, "num-1": num - 1, "inSet": false, longest },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, i) => [i, nums[i] === num ? "active" : "default"])),
                arrayLabels: nums,
                pointers: nums[0] === num ? [{ name: "num", index: 0, color: "pointer" }] :
                  [{ name: "num", index: nums.indexOf(num), color: "pointer" }],
                hashMap: Object.fromEntries([...numSet].map(n => [n, { value: true, isHighlighted: n === num }])),
              },
              delta: {}, isAnswer: false,
            });

            let current = num;
            let streak = 1;
            while (numSet.has(current + 1)) {
              current++;
              streak++;
            }

            const seqNums = [];
            for (let s = num; s <= current; s++) seqNums.push(s);

            steps.push({
              stepId: steps.length, lineNumbers: [9, 10, 12, 13, 14],
              shortLabel: `Count: ${seqNums.join("→")}, streak=${streak}`,
              explanation: `Starting from ${num}, count up. ${streak === 1 ? `Is ${num + 1} in set? No. Sequence [${num}] has length 1.` : `Sequence [${seqNums.join(",")}] has length ${streak}. ${current + 1} is NOT in the set, so the sequence ends.`}`,
              variables: { num, current, streak, "next check": current + 1, longest },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, i) => [i, seqNums.includes(nums[i]) ? "found" : "default"])),
                arrayLabels: nums,
                pointers: [],
                hashMap: Object.fromEntries([...numSet].map(n => [n, { value: true, isHighlighted: seqNums.includes(n) }])),
              },
              delta: {}, isAnswer: false,
            });

            longest = Math.max(longest, streak);

            steps.push({
              stepId: steps.length, lineNumbers: [17],
              shortLabel: `longest = max(${longest === streak ? longest - streak || 0 : longest}, ${streak}) = ${longest}`,
              explanation: `Update longest = ${longest}.`,
              variables: { streak, longest },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, i) => [i, seqNums.includes(nums[i]) ? "found" : "default"])),
                arrayLabels: nums,
                pointers: [],
                hashMap: Object.fromEntries([...numSet].map(n => [n, { value: true, isHighlighted: seqNums.includes(n) }])),
              },
              delta: {}, isAnswer: false,
            });
          } else {
            // Not a sequence start — skip
            steps.push({
              stepId: steps.length, lineNumbers: [7, 8],
              shortLabel: `num=${num}: ${num - 1} in set → skip`,
              explanation: `Check num=${num}. Is ${num - 1} in the set? Yes! Not a sequence start. Skip.`,
              variables: { num, "num-1": num - 1, "inSet": true, longest },
              dataStructure: {
                arrayStates: Object.fromEntries(nums.map((_, i) => [i, nums[i] === num ? "active" : "default"])),
                arrayLabels: nums,
                pointers: [{ name: "num", index: nums.indexOf(num), color: "pointer" }],
                hashMap: Object.fromEntries([...numSet].map(n => [n, { value: true, isHighlighted: n === num }])),
              },
              delta: {}, isAnswer: false,
            });
          }
        }

        // Final return step
        steps.push({
          stepId: steps.length, lineNumbers: [21],
          shortLabel: `Return ${longest}`,
          explanation: `All numbers processed. The longest consecutive sequence has length ${longest}.`,
          variables: { longest, answer: longest },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            arrayLabels: nums,
            pointers: [],
            hashMap: Object.fromEntries([...numSet].map(n => [n, { value: true }])),
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n)", space: "O(1)", explanation: "Sorting dominates; linear scan after sort" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "Each element visited at most twice — once in the set iteration, once during sequence counting. HashSet uses O(n) space.", tradeoff: "Trade O(n) space to eliminate the O(n log n) sorting step" },
  },

  interviewTips: [
    "Start by mentioning the O(n log n) sorting approach — it shows you can solve it even without the optimal insight.",
    "Explain WHY the HashSet approach is O(n): each element is touched at most twice total across all sequence expansions.",
    "The key insight to articulate: 'I only start counting from sequence starts — numbers whose predecessor is NOT in the set.'",
    "Ask: 'Can there be duplicates in the input?' — this affects the sorting approach (must skip duplicates).",
    "Mention that the HashSet naturally handles duplicates since sets store unique values.",
    "If asked about the space-time tradeoff: 'We trade O(n) space for the HashSet to avoid the O(n log n) sort.'",
  ],

  relatedProblems: ["contains-duplicate", "top-k-frequent-elements", "group-anagrams"],
};
