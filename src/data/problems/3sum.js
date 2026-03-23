export const threeSum = {
  id: 12,
  slug: "3sum",
  title: "3Sum",
  difficulty: "Medium",
  topic: "two-pointers",
  topicLabel: "Two Pointers",
  neetcodeNumber: 12,
  artifactType: "TwoPointer",
  companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/3sum/",

  pattern: "Sort + Fix One + Two Pointers",
  patternExplanation: `Sort the array, fix one element, then use two pointers on the remaining
    subarray to find pairs that sum to the negation of the fixed element. Skip duplicates at
    every level to avoid repeated triplets.`,

  intuition: {
    coreInsight: `We need three numbers that sum to zero: a + b + c = 0, which means b + c = -a.
      If we sort the array and fix 'a', then finding b + c = -a in the remaining sorted subarray
      is exactly the Two Sum II problem — solvable in O(n) with two pointers. By fixing each
      element in turn and running two pointers on the rest, we get O(n^2) total.`,

    mentalModel: `Imagine lining up numbers on a number line from smallest to largest. You pick
      one number (the anchor) and then place your left hand on the smallest remaining number and
      your right hand on the largest. If the three numbers sum to zero, great — record them. If
      the sum is too small, slide your left hand right to increase it. If too large, slide your
      right hand left to decrease it. When your hands meet, pick a new anchor and repeat.`,

    whyNaiveFails: `Brute force checks every triple with three nested loops: O(n^3). For n=3000,
      that's 27 billion operations — far too slow. Even with early termination, the cubic growth
      makes it impractical. Sorting + two pointers reduces the inner two loops from O(n^2) to
      O(n), giving O(n^2) overall.`,

    keyObservation: `The hardest part isn't finding triplets — it's avoiding duplicates. After
      sorting, identical values are adjacent. Skip duplicate anchors: if nums[i] == nums[i-1],
      skip i. After finding a valid triplet, skip duplicate left values (while nums[left] ==
      nums[left+1], left++) and duplicate right values (while nums[right] == nums[right-1],
      right--). This guarantees each triplet appears exactly once without using a Set.`,
  },

  problem: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
    such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that
    the solution set must not contain duplicate triplets.`,

  examples: [
    { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "The distinct triplets are [-1,0,1] and [-1,-1,2]." },
    { input: "nums = [0,1,1]", output: "[]", explanation: "No three elements sum to 0." },
    { input: "nums = [0,0,0]", output: "[[0,0,0]]", explanation: "The only triplet is [0,0,0]." },
  ],

  constraints: [
    "3 <= nums.length <= 3000",
    "-10^5 <= nums[i] <= 10^5",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n³)",
      spaceComplexity: "O(n)",
      idea: "Try every triple (i, j, k) with i < j < k. Collect unique triplets that sum to zero. Sort each triplet and use a Set to avoid duplicates.",

      javaCode: `public List<List<Integer>> threeSum(int[] nums) {
    Set<List<Integer>> result = new HashSet<>();
    int n = nums.length;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            for (int k = j + 1; k < n; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    List<Integer> triplet = Arrays.asList(
                        nums[i], nums[j], nums[k]);
                    Collections.sort(triplet);
                    result.add(triplet);
                }
            }
        }
    }
    return new ArrayList<>(result);
}`,

      cppCode: `vector<vector<int>> threeSum(vector<int>& nums) {
    set<vector<int>> result;
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            for (int k = j + 1; k < n; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    vector<int> triplet = {
                        nums[i], nums[j], nums[k]};
                    sort(triplet.begin(), triplet.end());
                    result.insert(triplet);
                }
            }
        }
    }
    return vector<vector<int>>(
        result.begin(), result.end());
}`,

      pythonCode: `def threeSum(nums: List[int]) -> List[List[int]]:
    result = set()
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if nums[i] + nums[j] + nums[k] == 0:
                    triplet = tuple(sorted(
                        [nums[i], nums[j], nums[k]]))
                    result.add(triplet)
    return [list(t) for t in result]`,

      lineAnnotations: {
        2: "Use a Set to avoid duplicate triplets",
        4: "First element",
        5: "Second element",
        6: "Third element",
        7: "Check if triplet sums to zero",
        8: "Sort triplet so duplicates are caught by Set",
        11: "Add sorted triplet to result Set",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [-1, 0, 1, 2, -1, -4] },
          expectedOutput: "[[-1,-1,2],[-1,0,1]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init result set",
              explanation: "Create an empty Set to hold unique triplets. We'll check every possible triple (i, j, k).",
              variables: { i: "-", j: "-", k: "-", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "i=0,j=1,k=2: -1+0+1=0 ✓",
              explanation: "Triple (0,1,2): nums[0]+nums[1]+nums[2] = -1+0+1 = 0. Found a triplet! Sort it: [-1,0,1]. Add to result.",
              variables: { i: 0, j: 1, k: 2, "nums[i]": -1, "nums[j]": 0, "nums[k]": 1, sum: 0, result: "[[-1,0,1]]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [
                  { name: "i", index: 0, color: "pointer" },
                  { name: "j", index: 1, color: "active" },
                  { name: "k", index: 2, color: "found" },
                ],
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "i=0,j=1,k=3: -1+0+2=1 ✗",
              explanation: "Triple (0,1,3): -1+0+2 = 1 ≠ 0. Not a match. Continue checking triples.",
              variables: { i: 0, j: 1, k: 3, "nums[i]": -1, "nums[j]": 0, "nums[k]": 2, sum: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "eliminated", 4: "default", 5: "default" },
                pointers: [
                  { name: "i", index: 0, color: "pointer" },
                  { name: "j", index: 1, color: "active" },
                  { name: "k", index: 3, color: "eliminated" },
                ],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "... many triples later ...",
              explanation: "The brute force continues checking all C(6,3) = 20 triples. This is the fundamental problem — O(n^3) comparisons. For n=3000, that's 4.5 billion checks.",
              variables: { result: "[[-1,0,1]]", "triples checked": "20 total" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 6, 7, 11],
              shortLabel: "i=0,j=3,k=4: -1+2+(-1)=0 ✓",
              explanation: "Triple (0,3,4): -1+2+(-1) = 0. Found another triplet! Sort: [-1,-1,2]. Add to result. Final answer: [[-1,-1,2],[-1,0,1]].",
              variables: { i: 0, j: 3, k: 4, "nums[i]": -1, "nums[j]": 2, "nums[k]": -1, sum: 0, result: "[[-1,-1,2],[-1,0,1]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "found", 4: "found", 5: "default" },
                pointers: [
                  { name: "i", index: 0, color: "pointer" },
                  { name: "j", index: 3, color: "active" },
                  { name: "k", index: 4, color: "found" },
                ],
              },
              delta: { changedIndices: [0, 3, 4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14],
              shortLabel: "Return 2 triplets",
              explanation: "After checking all 20 triples, return the 2 unique triplets found: [[-1,-1,2],[-1,0,1]]. This took O(n^3) time.",
              variables: { answer: "[[-1,-1,2],[-1,0,1]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        const resultSet = new Set();
        const results = [];
        const defaultStates = () => Object.fromEntries(nums.map((_, i) => [i, "default"]));

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init result set",
          explanation: "Create empty Set for unique triplets. Will check all C(n,3) triples.",
          variables: { i: "-", j: "-", k: "-", result: "[]" },
          dataStructure: { arrayStates: defaultStates(), pointers: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
              const sum = nums[i] + nums[j] + nums[k];
              if (sum === 0) {
                const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
                const key = triplet.join(",");
                if (!resultSet.has(key)) {
                  resultSet.add(key);
                  results.push(triplet);
                }
                steps.push({
                  stepId: steps.length, lineNumbers: [4, 5, 6, 7, 11],
                  shortLabel: `i=${i},j=${j},k=${k}: ${nums[i]}+${nums[j]}+${nums[k]}=0 ✓`,
                  explanation: `Triple (${i},${j},${k}): ${nums[i]}+${nums[j]}+${nums[k]} = 0. Found triplet [${triplet}].`,
                  variables: { i, j, k, "nums[i]": nums[i], "nums[j]": nums[j], "nums[k]": nums[k], sum: 0, result: JSON.stringify(results) },
                  dataStructure: {
                    arrayStates: { ...defaultStates(), [i]: "found", [j]: "found", [k]: "found" },
                    pointers: [
                      { name: "i", index: i, color: "pointer" },
                      { name: "j", index: j, color: "active" },
                      { name: "k", index: k, color: "found" },
                    ],
                  },
                  delta: { changedIndices: [i, j, k] }, isAnswer: false,
                });
              }
            }
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [14],
          shortLabel: `Return ${results.length} triplet(s)`,
          explanation: `Finished checking all triples. Found ${results.length} unique triplet(s): ${JSON.stringify(results)}.`,
          variables: { answer: JSON.stringify(results) },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sort + Two Pointers",
      tier: "optimal",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: `Sort the array. For each element nums[i], set left = i+1, right = n-1.
        Move two pointers inward: if sum < 0, move left right; if sum > 0, move right left;
        if sum == 0, record triplet and skip duplicates on both sides. Skip duplicate anchors too.`,

      javaCode: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();

    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        if (nums[i] > 0) break;

        int left = i + 1, right = nums.length - 1;

        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];

            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                result.add(Arrays.asList(
                    nums[i], nums[left], nums[right]));
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            }
        }
    }
    return result;
}`,

      cppCode: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;

    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        if (nums[i] > 0) break;

        int left = i + 1, right = nums.size() - 1;

        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];

            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                result.push_back({
                    nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            }
        }
    }
    return result;
}`,

      pythonCode: `def threeSum(nums: List[int]) -> List[List[int]]:
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        if nums[i] > 0:
            break

        left, right = i + 1, len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append(
                    [nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1

    return result`,

      lineAnnotations: {
        2:  "Sort the array so two pointers can work and duplicates are adjacent",
        3:  "Result list for valid triplets",
        5:  "Fix the first element — anchor",
        6:  "Skip duplicate anchors to avoid duplicate triplets",
        7:  "If anchor > 0, no triplet can sum to 0 (all remaining are positive)",
        9:  "Initialize two pointers: left just after anchor, right at end",
        11: "Two-pointer loop — converge inward",
        12: "Compute three-element sum",
        14: "Sum too small — move left pointer right to increase sum",
        16: "Sum too large — move right pointer left to decrease sum",
        18: "Found a valid triplet!",
        19: "Record the triplet",
        21: "Skip duplicate left values",
        22: "Skip duplicate right values",
        23: "Move both pointers inward for next pair",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with two valid triplets",
          input: { nums: [-4, -1, -1, 0, 1, 2] },
          expectedOutput: "[[-1,-1,2],[-1,0,1]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort array",
              explanation: "Sort nums to enable two-pointer technique. Sorted: [-4, -1, -1, 0, 1, 2]. Duplicates are now adjacent, making them easy to skip.",
              variables: { nums: "[-4,-1,-1,0,1,2]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 9],
              shortLabel: "i=0: anchor=-4, L=1, R=5",
              explanation: "Fix anchor at index 0 (value=-4). Set left=1, right=5. We need left+right pair summing to 4.",
              variables: { i: 0, "nums[i]": -4, left: 1, right: 5, target: 4 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "pointer", 2: "default", 3: "default", 4: "default", 5: "pointer" },
                pointers: [
                  { name: "i", index: 0, color: "active" },
                  { name: "L", index: 1, color: "pointer" },
                  { name: "R", index: 5, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 1, 5], movedPointers: ["i", "L", "R"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 14],
              shortLabel: "sum=-4+(-1)+2=-3 < 0 → L++",
              explanation: "sum = -4 + (-1) + 2 = -3 < 0. Sum is too small — move left pointer right to increase it. left becomes 2.",
              variables: { i: 0, "nums[i]": -4, left: 1, right: 5, "nums[L]": -1, "nums[R]": 2, sum: -3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "eliminated", 2: "default", 3: "default", 4: "default", 5: "pointer" },
                pointers: [
                  { name: "i", index: 0, color: "active" },
                  { name: "L", index: 1, color: "eliminated" },
                  { name: "R", index: 5, color: "pointer" },
                ],
              },
              delta: { changedIndices: [1], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 14],
              shortLabel: "sum=-4+(-1)+2=-3 < 0 → L++",
              explanation: "left=2: sum = -4 + (-1) + 2 = -3 < 0. Still too small. Move left to 3.",
              variables: { i: 0, "nums[i]": -4, left: 2, right: 5, "nums[L]": -1, "nums[R]": 2, sum: -3 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "eliminated", 3: "default", 4: "default", 5: "pointer" },
                pointers: [
                  { name: "i", index: 0, color: "active" },
                  { name: "L", index: 2, color: "eliminated" },
                  { name: "R", index: 5, color: "pointer" },
                ],
              },
              delta: { changedIndices: [2], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12, 14],
              shortLabel: "sum=-4+0+2=-2 < 0 → L++",
              explanation: "left=3: sum = -4 + 0 + 2 = -2 < 0. Still too small. Move left to 4.",
              variables: { i: 0, "nums[i]": -4, left: 3, right: 5, "nums[L]": 0, "nums[R]": 2, sum: -2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "visited", 3: "eliminated", 4: "default", 5: "pointer" },
                pointers: [
                  { name: "i", index: 0, color: "active" },
                  { name: "L", index: 3, color: "eliminated" },
                  { name: "R", index: 5, color: "pointer" },
                ],
              },
              delta: { changedIndices: [3], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12, 14],
              shortLabel: "sum=-4+1+2=-1 < 0 → L++",
              explanation: "left=4: sum = -4 + 1 + 2 = -1 < 0. Move left to 5. Now left=5 = right=5, so left < right fails. No triplet with anchor -4.",
              variables: { i: 0, "nums[i]": -4, left: 4, right: 5, "nums[L]": 1, "nums[R]": 2, sum: -1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "visited", 3: "visited", 4: "eliminated", 5: "pointer" },
                pointers: [
                  { name: "i", index: 0, color: "active" },
                  { name: "L", index: 4, color: "eliminated" },
                  { name: "R", index: 5, color: "pointer" },
                ],
              },
              delta: { changedIndices: [4], movedPointers: ["L"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [5, 9],
              shortLabel: "i=1: anchor=-1, L=2, R=5",
              explanation: "Move anchor to index 1 (value=-1). Set left=2, right=5. We need left+right pair summing to 1.",
              variables: { i: 1, "nums[i]": -1, left: 2, right: 5, target: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "pointer", 3: "default", 4: "default", 5: "pointer" },
                pointers: [
                  { name: "i", index: 1, color: "active" },
                  { name: "L", index: 2, color: "pointer" },
                  { name: "R", index: 5, color: "pointer" },
                ],
              },
              delta: { changedIndices: [1, 2, 5], movedPointers: ["i", "L", "R"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [12, 18, 19],
              shortLabel: "sum=-1+(-1)+2=0 ✓ Found!",
              explanation: "sum = -1 + (-1) + 2 = 0. Found a valid triplet [-1, -1, 2]! Add it to the result. Now skip duplicates and move both pointers.",
              variables: { i: 1, "nums[i]": -1, left: 2, right: 5, "nums[L]": -1, "nums[R]": 2, sum: 0, result: "[[-1,-1,2]]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "found", 3: "default", 4: "default", 5: "found" },
                pointers: [
                  { name: "i", index: 1, color: "found" },
                  { name: "L", index: 2, color: "found" },
                  { name: "R", index: 5, color: "found" },
                ],
              },
              delta: { changedIndices: [1, 2, 5] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [21, 22, 23, 24],
              shortLabel: "Skip dupes, L=3, R=4",
              explanation: "Skip duplicate lefts and rights. No adjacent duplicates to skip here. Move left to 3, right to 4.",
              variables: { i: 1, "nums[i]": -1, left: 3, right: 4 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "visited", 3: "pointer", 4: "pointer", 5: "visited" },
                pointers: [
                  { name: "i", index: 1, color: "active" },
                  { name: "L", index: 3, color: "pointer" },
                  { name: "R", index: 4, color: "pointer" },
                ],
              },
              delta: { changedIndices: [3, 4], movedPointers: ["L", "R"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [12, 18, 19],
              shortLabel: "sum=-1+0+1=0 ✓ Found!",
              explanation: "sum = -1 + 0 + 1 = 0. Another valid triplet [-1, 0, 1]! Add to result. Move both pointers. left=4, right=3 — left < right fails, done with this anchor.",
              variables: { i: 1, "nums[i]": -1, left: 3, right: 4, "nums[L]": 0, "nums[R]": 1, sum: 0, result: "[[-1,-1,2],[-1,0,1]]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "visited", 3: "found", 4: "found", 5: "visited" },
                pointers: [
                  { name: "i", index: 1, color: "found" },
                  { name: "L", index: 3, color: "found" },
                  { name: "R", index: 4, color: "found" },
                ],
              },
              delta: { changedIndices: [3, 4] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [5, 6],
              shortLabel: "i=2: nums[2]==nums[1] → skip",
              explanation: "Move to i=2 (value=-1). But nums[2] == nums[1] == -1 — this is a duplicate anchor. Skip it to avoid duplicate triplets. This is the key deduplication step!",
              variables: { i: 2, "nums[i]": -1, "nums[i-1]": -1, skipped: true },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "eliminated", 3: "default", 4: "default", 5: "default" },
                pointers: [
                  { name: "i", index: 2, color: "eliminated" },
                ],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [5, 9, 12, 16],
              shortLabel: "i=3: anchor=0, sum=0+1+2=3 > 0",
              explanation: "Anchor at index 3 (value=0). left=4, right=5. sum = 0+1+2 = 3 > 0. Move right left. right=4, now left=right so we're done. No more valid anchors after this since nums[3]=0 > 0 check at line 7 would break for i=4.",
              variables: { i: 3, "nums[i]": 0, left: 4, right: 5, "nums[L]": 1, "nums[R]": 2, sum: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "pointer", 5: "eliminated" },
                pointers: [
                  { name: "i", index: 3, color: "active" },
                  { name: "L", index: 4, color: "pointer" },
                  { name: "R", index: 5, color: "eliminated" },
                ],
              },
              delta: { changedIndices: [3, 4, 5] },
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [27],
              shortLabel: "Return [[-1,-1,2],[-1,0,1]]",
              explanation: "All anchors processed. Return 2 unique triplets: [[-1,-1,2], [-1,0,1]]. Total work: O(n^2) — one pass per anchor, two pointers per pass.",
              variables: { answer: "[[-1,-1,2],[-1,0,1]]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Zeros",
          description: "Three zeros — tests duplicate skipping when all elements are the same",
          input: { nums: [0, 0, 0, 0] },
          expectedOutput: "[[0,0,0]]",
          commonMistake: "Without duplicate skipping, you'd return [[0,0,0],[0,0,0],[0,0,0],[0,0,0]] — four copies of the same triplet. Proper deduplication at the anchor level and after finding a match ensures exactly one result.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort: [0,0,0,0]",
              explanation: "Sort the array. Already sorted: [0, 0, 0, 0]. All elements are the same — this will test our duplicate-skipping logic.",
              variables: { nums: "[0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 9],
              shortLabel: "i=0: anchor=0, L=1, R=3",
              explanation: "Fix anchor at index 0 (value=0). left=1, right=3. We need a pair summing to 0.",
              variables: { i: 0, "nums[i]": 0, left: 1, right: 3, target: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "pointer", 2: "default", 3: "pointer" },
                pointers: [
                  { name: "i", index: 0, color: "active" },
                  { name: "L", index: 1, color: "pointer" },
                  { name: "R", index: 3, color: "pointer" },
                ],
              },
              delta: { changedIndices: [0, 1, 3], movedPointers: ["i", "L", "R"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 18, 19],
              shortLabel: "sum=0+0+0=0 ✓ Found!",
              explanation: "sum = 0 + 0 + 0 = 0. Found triplet [0, 0, 0]! Add to result.",
              variables: { i: 0, "nums[i]": 0, left: 1, right: 3, "nums[L]": 0, "nums[R]": 0, sum: 0, result: "[[0,0,0]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "found" },
                pointers: [
                  { name: "i", index: 0, color: "found" },
                  { name: "L", index: 1, color: "found" },
                  { name: "R", index: 3, color: "found" },
                ],
              },
              delta: { changedIndices: [0, 1, 3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [21, 22, 23, 24],
              shortLabel: "Skip dupes: L→2→3, R→2",
              explanation: "Skip duplicates: nums[left]=0==nums[left+1]=0, so left++. nums[right]=0==nums[right-1]=0, so right--. Then left++, right--. Now left=3, right=1 — left < right fails. Done with this anchor.",
              variables: { i: 0, left: 3, right: 1, "pointers crossed": true },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "visited", 3: "visited" },
                pointers: [
                  { name: "i", index: 0, color: "active" },
                ],
              },
              delta: { movedPointers: ["L", "R"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6],
              shortLabel: "i=1: nums[1]==nums[0] → skip",
              explanation: "i=1: nums[1]=0 == nums[0]=0. Duplicate anchor — skip. Same for i=2. No more valid anchors.",
              variables: { i: 1, "nums[i]": 0, "nums[i-1]": 0, skipped: true },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "eliminated", 2: "eliminated", 3: "visited" },
                pointers: [
                  { name: "i", index: 1, color: "eliminated" },
                ],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [27],
              shortLabel: "Return [[0,0,0]]",
              explanation: "All anchors processed. Exactly one unique triplet: [[0,0,0]]. Duplicate skipping correctly prevented 3 redundant copies.",
              variables: { answer: "[[0,0,0]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "No Solution",
          description: "All positive numbers — impossible to sum to zero",
          input: { nums: [1, 2, 3, 4] },
          expectedOutput: "[]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort: [1,2,3,4]",
              explanation: "Sort the array: [1, 2, 3, 4]. All positive — the smallest element is 1.",
              variables: { nums: "[1,2,3,4]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 7],
              shortLabel: "i=0: nums[0]=1 > 0 → break",
              explanation: "Anchor at index 0, value=1. Since nums[0] > 0 and the array is sorted, all remaining elements are also positive. Three positive numbers can never sum to zero. Break immediately.",
              variables: { i: 0, "nums[i]": 1, "early exit": "nums[i] > 0" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated" },
                pointers: [
                  { name: "i", index: 0, color: "eliminated" },
                ],
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [27],
              shortLabel: "Return []",
              explanation: "No valid triplets exist. The early-exit optimization saved us from doing any two-pointer work at all.",
              variables: { answer: "[]" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const sorted = [...nums].sort((a, b) => a - b);
        const n = sorted.length;
        const results = [];
        const defaultStates = () => Object.fromEntries(sorted.map((_, i) => [i, "default"]));

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Sort array",
          explanation: `Sort nums: [${sorted.join(", ")}]. This enables the two-pointer technique and groups duplicates.`,
          variables: { nums: `[${sorted.join(",")}]` },
          dataStructure: { arrayStates: defaultStates(), pointers: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n - 2; i++) {
          if (i > 0 && sorted[i] === sorted[i - 1]) {
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6],
              shortLabel: `i=${i}: dup anchor ${sorted[i]} → skip`,
              explanation: `nums[${i}]=${sorted[i]} == nums[${i - 1}]=${sorted[i - 1]}. Duplicate anchor — skip to avoid duplicate triplets.`,
              variables: { i, "nums[i]": sorted[i], "nums[i-1]": sorted[i - 1], skipped: true },
              dataStructure: {
                arrayStates: { ...defaultStates(), [i]: "eliminated" },
                pointers: [{ name: "i", index: i, color: "eliminated" }],
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
            continue;
          }

          if (sorted[i] > 0) {
            steps.push({
              stepId: steps.length, lineNumbers: [5, 7],
              shortLabel: `i=${i}: ${sorted[i]} > 0 → break`,
              explanation: `nums[${i}]=${sorted[i]} > 0. All remaining elements are positive, so no triplet can sum to 0. Break early.`,
              variables: { i, "nums[i]": sorted[i], "early exit": "nums[i] > 0" },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j >= i ? "eliminated" : "visited"])),
                pointers: [{ name: "i", index: i, color: "eliminated" }],
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
            break;
          }

          let left = i + 1;
          let right = n - 1;

          steps.push({
            stepId: steps.length, lineNumbers: [5, 9],
            shortLabel: `i=${i}: anchor=${sorted[i]}, L=${left}, R=${right}`,
            explanation: `Fix anchor at index ${i} (value=${sorted[i]}). Set left=${left}, right=${right}. Need pair summing to ${-sorted[i]}.`,
            variables: { i, "nums[i]": sorted[i], left, right, target: -sorted[i] },
            dataStructure: {
              arrayStates: { ...defaultStates(), [i]: "active", [left]: "pointer", [right]: "pointer" },
              pointers: [
                { name: "i", index: i, color: "active" },
                { name: "L", index: left, color: "pointer" },
                { name: "R", index: right, color: "pointer" },
              ],
            },
            delta: { changedIndices: [i, left, right], movedPointers: ["i", "L", "R"] }, isAnswer: false,
          });

          while (left < right) {
            const sum = sorted[i] + sorted[left] + sorted[right];

            if (sum < 0) {
              steps.push({
                stepId: steps.length, lineNumbers: [12, 14],
                shortLabel: `sum=${sorted[i]}+${sorted[left]}+${sorted[right]}=${sum} < 0 → L++`,
                explanation: `sum = ${sorted[i]} + ${sorted[left]} + ${sorted[right]} = ${sum} < 0. Too small — move left pointer right.`,
                variables: { i, "nums[i]": sorted[i], left, right, "nums[L]": sorted[left], "nums[R]": sorted[right], sum },
                dataStructure: {
                  arrayStates: { ...defaultStates(), [i]: "active", [left]: "eliminated", [right]: "pointer" },
                  pointers: [
                    { name: "i", index: i, color: "active" },
                    { name: "L", index: left, color: "eliminated" },
                    { name: "R", index: right, color: "pointer" },
                  ],
                },
                delta: { changedIndices: [left], movedPointers: ["L"] }, isAnswer: false,
              });
              left++;
            } else if (sum > 0) {
              steps.push({
                stepId: steps.length, lineNumbers: [12, 16],
                shortLabel: `sum=${sorted[i]}+${sorted[left]}+${sorted[right]}=${sum} > 0 → R--`,
                explanation: `sum = ${sorted[i]} + ${sorted[left]} + ${sorted[right]} = ${sum} > 0. Too large — move right pointer left.`,
                variables: { i, "nums[i]": sorted[i], left, right, "nums[L]": sorted[left], "nums[R]": sorted[right], sum },
                dataStructure: {
                  arrayStates: { ...defaultStates(), [i]: "active", [left]: "pointer", [right]: "eliminated" },
                  pointers: [
                    { name: "i", index: i, color: "active" },
                    { name: "L", index: left, color: "pointer" },
                    { name: "R", index: right, color: "eliminated" },
                  ],
                },
                delta: { changedIndices: [right], movedPointers: ["R"] }, isAnswer: false,
              });
              right--;
            } else {
              results.push([sorted[i], sorted[left], sorted[right]]);
              steps.push({
                stepId: steps.length, lineNumbers: [12, 18, 19],
                shortLabel: `sum=${sorted[i]}+${sorted[left]}+${sorted[right]}=0 ✓`,
                explanation: `sum = ${sorted[i]} + ${sorted[left]} + ${sorted[right]} = 0. Found triplet [${sorted[i]}, ${sorted[left]}, ${sorted[right]}]!`,
                variables: { i, "nums[i]": sorted[i], left, right, "nums[L]": sorted[left], "nums[R]": sorted[right], sum: 0, result: JSON.stringify(results) },
                dataStructure: {
                  arrayStates: { ...defaultStates(), [i]: "found", [left]: "found", [right]: "found" },
                  pointers: [
                    { name: "i", index: i, color: "found" },
                    { name: "L", index: left, color: "found" },
                    { name: "R", index: right, color: "found" },
                  ],
                },
                delta: { changedIndices: [i, left, right] }, isAnswer: false,
              });

              while (left < right && sorted[left] === sorted[left + 1]) left++;
              while (left < right && sorted[right] === sorted[right - 1]) right--;
              left++;
              right--;

              if (left < right) {
                steps.push({
                  stepId: steps.length, lineNumbers: [21, 22, 23, 24],
                  shortLabel: `Skip dupes → L=${left}, R=${right}`,
                  explanation: `Skip duplicate values and advance pointers. Now left=${left}, right=${right}.`,
                  variables: { i, "nums[i]": sorted[i], left, right },
                  dataStructure: {
                    arrayStates: { ...defaultStates(), [i]: "active", [left]: "pointer", [right]: "pointer" },
                    pointers: [
                      { name: "i", index: i, color: "active" },
                      { name: "L", index: left, color: "pointer" },
                      { name: "R", index: right, color: "pointer" },
                    ],
                  },
                  delta: { movedPointers: ["L", "R"] }, isAnswer: false,
                });
              }
            }
          }
        }

        steps.push({
          stepId: steps.length, lineNumbers: [27],
          shortLabel: `Return ${results.length} triplet(s)`,
          explanation: `All anchors processed. Found ${results.length} unique triplet(s): ${JSON.stringify(results)}.`,
          variables: { answer: JSON.stringify(results) },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, results.length > 0 ? "found" : "eliminated"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n³)", space: "O(n)", explanation: "Three nested loops; Set to store unique triplets" },
    optimal: { time: "O(n²)", space: "O(1)", explanation: "Sort is O(n log n); for each of n anchors, two pointers scan in O(n). Total O(n^2). Space is O(1) ignoring output (or O(log n) for sort).", tradeoff: "Sorting enables two-pointer convergence, reducing the inner two loops from O(n^2) to O(n)" },
  },

  interviewTips: [
    "Start by clarifying: 'The result must contain unique triplets, not unique indices — so [-1,-1,2] counts once even if there are multiple -1s.' This shows you read the problem carefully.",
    "Mention the brute force O(n^3) first, then explain why sorting + two pointers reduces it to O(n^2).",
    "Emphasize the three levels of duplicate skipping: (1) skip duplicate anchors, (2) skip duplicate lefts after a match, (3) skip duplicate rights after a match.",
    "Point out the early termination: if nums[i] > 0, break — since all remaining elements are positive.",
    "Compare to Two Sum II: once you fix one element, the remaining problem is exactly Two Sum II on a sorted array.",
    "Discuss why we sort first: it enables two-pointer convergence AND makes duplicates adjacent for easy skipping.",
  ],

  relatedProblems: ["two-sum", "two-sum-ii", "container-with-water"],
};
