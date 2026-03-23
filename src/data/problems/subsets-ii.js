export const subsetsII = {
  id: 74,
  slug: "subsets-ii",
  title: "Subsets II",
  difficulty: "Medium",
  topic: "backtracking",
  topicLabel: "Backtracking",
  neetcodeNumber: 74,
  artifactType: "Backtracking",
  companies: ["Amazon", "Google", "Bloomberg", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/subsets-ii/",

  pattern: "Sort + Skip Duplicates Backtracking",
  patternExplanation: `When the input contains duplicates, sort first, then during backtracking
    skip adjacent elements with the same value at the same recursion level. This prevents
    generating duplicate subsets while still exploring all unique combinations.`,

  intuition: {
    coreInsight: `Subsets I with unique elements generates 2^n subsets. With duplicates, some
      subsets would be identical. The fix: sort the array first, then at each recursion level,
      if we've already tried an element with the same value at this level, skip it. Sorting
      groups duplicates together so we can detect them with a simple nums[i] === nums[i-1] check.`,

    mentalModel: `Imagine choosing toppings for a pizza from [pepperoni, pepperoni, mushroom].
      At the first decision point, you can pick pepperoni or mushroom. If you already explored
      "pick pepperoni" branch, there's no point exploring "pick the other pepperoni" — it leads
      to the exact same set of pizzas. Sorting puts identical toppings next to each other so
      you can skip the second one at the same decision level.`,

    whyNaiveFails: `Without the skip logic, [1,2,2] would generate [2] twice — once from
      index 1 and once from index 2. Using a Set to deduplicate afterward works but wastes
      time generating duplicates and then converting arrays to strings for comparison. The
      sort+skip approach avoids generating duplicates in the first place.`,

    keyObservation: `The skip condition is: if i > start && nums[i] === nums[i-1], skip.
      The "i > start" part is crucial — we CAN use the same value as the previous element if
      it's deeper in the recursion (e.g., [2,2] is valid). We only skip when we're at the
      SAME level of the loop and the previous sibling had the same value.`,
  },

  problem: `Given an integer array nums that may contain duplicates, return all possible subsets
    (the power set). The solution set must not contain duplicate subsets. Return the solution in
    any order.`,

  examples: [
    { input: "nums = [1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]", explanation: "6 unique subsets (not 8, because duplicates are skipped)." },
    { input: "nums = [0]", output: "[[],[0]]", explanation: "Two subsets: empty and {0}." },
  ],

  constraints: [
    "1 <= nums.length <= 10",
    "-10 <= nums[i] <= 10",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Generate + Deduplicate)",
      tier: "brute",
      timeComplexity: "O(n × 2^n)",
      spaceComplexity: "O(n × 2^n)",
      idea: `Generate all 2^n subsets as in Subsets I, then use a Set (converting each subset
        to a sorted string) to remove duplicates. Wasteful because we generate duplicates just
        to throw them away.`,

      javaCode: `public List<List<Integer>> subsetsWithDup(int[] nums) {
    Arrays.sort(nums);
    Set<String> seen = new HashSet<>();
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result, seen);
    return result;
}

private void backtrack(int[] nums, int start,
                       List<Integer> current,
                       List<List<Integer>> result,
                       Set<String> seen) {
    String key = current.toString();
    if (seen.contains(key)) return;
    seen.add(key);
    result.add(new ArrayList<>(current));

    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(nums, i + 1, current, result, seen);
        current.remove(current.size() - 1);
    }
}`,

      cppCode: `vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    set<vector<int>> seen;
    vector<vector<int>> result;
    vector<int> current;
    backtrack(nums, 0, current, result, seen);
    return result;
}

void backtrack(vector<int>& nums, int start,
               vector<int>& current,
               vector<vector<int>>& result,
               set<vector<int>>& seen) {
    if (seen.count(current)) return;
    seen.insert(current);
    result.push_back(current);

    for (int i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result, seen);
        current.pop_back();
    }
}`,

      pythonCode: `def subsetsWithDup(nums: List[int]) -> List[List[int]]:
    nums.sort()
    seen = set()
    result = []

    def backtrack(start, current):
        key = tuple(current)
        if key in seen:
            return
        seen.add(key)
        result.append(current[:])

        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()

    backtrack(0, [])
    return result`,

      lineAnnotations: {
        2: "Sort to group duplicates together",
        3: "Set to track which subsets we've already added",
        14: "Convert subset to string key for deduplication",
        15: "Skip if we've already seen this exact subset",
        19: "Standard backtracking loop — generates duplicates",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard [1,2,2]",
          input: { nums: [1, 2, 2] },
          expectedOutput: "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Sort + init",
              explanation: "Sort nums → [1,2,2]. Initialize empty seen set and result list.",
              variables: { nums: "[1,2,2]", seen: "{}", results: "[]" },
              dataStructure: {
                tree: [{ id: 0, value: "[]", children: [], state: "active" }],
                currentPath: [0],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [14, 16],
              shortLabel: "Add []",
              explanation: "key='[]', not in seen. Add [] to results. seen={'[]'}.",
              variables: { current: "[]", seen: "{[]}", results: "[[]]" },
              dataStructure: {
                tree: [{ id: 0, value: "[]", children: [1, 4, 6], state: "active" }],
                currentPath: [0],
                results: [[]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [19],
              shortLabel: "Generate all subsets (with dups)",
              explanation: "Brute force generates all 2^3=8 subsets but deduplicates via seen set. Two subsets ([2] and [2,2]) would be generated twice from indices 1 and 2.",
              variables: { totalGenerated: 8, uniqueKept: 6 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4, 6], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 3], state: "visited" },
                  { id: 2, value: "[1,2]", children: [7], state: "visited" },
                  { id: 7, value: "[1,2,2]", children: [], state: "found" },
                  { id: 3, value: "[1,2]dup", children: [], state: "eliminated" },
                  { id: 4, value: "[2]", children: [5], state: "visited" },
                  { id: 5, value: "[2,2]", children: [], state: "found" },
                  { id: 6, value: "[2]dup", children: [], state: "eliminated" },
                ],
                currentPath: [],
                results: [[], [1], [1,2], [1,2,2], [2], [2,2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6],
              shortLabel: "Return 6 unique subsets",
              explanation: "After deduplication, 6 unique subsets remain. The brute force wasted work generating duplicates that were then filtered out.",
              variables: { answer: "6 subsets" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4, 6], state: "found" },
                  { id: 1, value: "[1]", children: [2, 3], state: "found" },
                  { id: 2, value: "[1,2]", children: [7], state: "found" },
                  { id: 7, value: "[1,2,2]", children: [], state: "found" },
                  { id: 3, value: "[1,2]dup", children: [], state: "eliminated" },
                  { id: 4, value: "[2]", children: [5], state: "found" },
                  { id: 5, value: "[2,2]", children: [], state: "found" },
                  { id: 6, value: "[2]dup", children: [], state: "eliminated" },
                ],
                currentPath: [],
                results: [[], [1], [1,2], [1,2,2], [2], [2,2]],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const sorted = [...nums].sort((a, b) => a - b);
        const steps = [];
        const results = [];
        const seen = new Set();

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Sort + init",
          explanation: `Sort nums → [${sorted.join(",")}]. Initialize seen set.`,
          variables: { nums: `[${sorted.join(",")}]` },
          dataStructure: { tree: [{ id: 0, value: "[]", children: [], state: "active" }], currentPath: [0], results: [] },
          delta: {}, isAnswer: false,
        });

        function backtrack(start, current) {
          const key = current.join(",");
          if (seen.has(key)) return;
          seen.add(key);
          results.push([...current]);

          steps.push({
            stepId: steps.length, lineNumbers: [16],
            shortLabel: `Add [${current.join(",")}]`,
            explanation: `Add [${current.join(",")}] to results. Total: ${results.length}.`,
            variables: { current: `[${current.join(",")}]`, totalResults: results.length },
            dataStructure: { tree: [], currentPath: [], results: results.map(r => [...r]) },
            delta: {}, isAnswer: false,
          });

          for (let i = start; i < sorted.length; i++) {
            current.push(sorted[i]);
            backtrack(i + 1, current);
            current.pop();
          }
        }

        backtrack(0, []);

        steps.push({
          stepId: steps.length, lineNumbers: [6],
          shortLabel: `Return ${results.length} subsets`,
          explanation: `Done. ${results.length} unique subsets generated.`,
          variables: { totalSubsets: results.length },
          dataStructure: { tree: [], currentPath: [], results: results.map(r => [...r]) },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sort + Skip Duplicates",
      tier: "optimal",
      timeComplexity: "O(n × 2^n)",
      spaceComplexity: "O(n)",
      idea: `Sort the array first. Use backtracking like Subsets I, but add one rule: at each
        recursion level, if nums[i] === nums[i-1] and i > start, skip nums[i]. This prevents
        generating duplicate subsets without needing a Set.`,

      javaCode: `public List<List<Integer>> subsetsWithDup(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start,
                       List<Integer> current,
                       List<List<Integer>> result) {
    result.add(new ArrayList<>(current));

    for (int i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i - 1]) continue;
        current.add(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.remove(current.size() - 1);
    }
}`,

      cppCode: `vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    vector<int> current;
    backtrack(nums, 0, current, result);
    return result;
}

void backtrack(vector<int>& nums, int start,
               vector<int>& current,
               vector<vector<int>>& result) {
    result.push_back(current);

    for (int i = start; i < nums.size(); i++) {
        if (i > start && nums[i] == nums[i - 1]) continue;
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.pop_back();
    }
}`,

      pythonCode: `def subsetsWithDup(nums: List[int]) -> List[List[int]]:
    nums.sort()
    result = []

    def backtrack(start, current):
        result.append(current[:])

        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()

    backtrack(0, [])
    return result`,

      lineAnnotations: {
        2: "Sort to group duplicates — critical for skip logic",
        3: "Result list for all unique subsets",
        11: "Add current subset (every node is valid, like Subsets I)",
        13: "Try each element from start index onward",
        14: "SKIP if same value as previous element at this level (prevents duplicates)",
        15: "Include nums[i] in current subset",
        16: "Recurse with i+1 to avoid reusing elements",
        17: "Backtrack: remove last element",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard [1,2,2]",
          description: "Duplicates present — skip logic prevents duplicate subsets",
          input: { nums: [1, 2, 2] },
          expectedOutput: "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Sort → [1,2,2]",
              explanation: "Sort nums → [1,2,2]. Duplicates (two 2s) are now adjacent. Initialize result=[].",
              variables: { nums: "[1,2,2]", start: 0, current: "[]", results: "[]" },
              dataStructure: {
                tree: [{ id: 0, value: "[]", children: [1, 4, 99], state: "active" }],
                currentPath: [0],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11],
              shortLabel: "Add []",
              explanation: "Add empty subset [] to results. Every node in the tree is a valid subset.",
              variables: { start: 0, current: "[]", results: "[[]]" },
              dataStructure: {
                tree: [{ id: 0, value: "[]", children: [1, 4], state: "active" }],
                currentPath: [0],
                results: [[]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [13, 15, 16],
              shortLabel: "Include 1 → [1]",
              explanation: "i=0 (start=0): Include nums[0]=1. current=[1]. Add [1] to results. Recurse with start=1.",
              variables: { i: 0, start: 0, current: "[1]", results: "[[], [1]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 3], state: "active" },
                ],
                currentPath: [0, 1],
                results: [[], [1]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [13, 15, 16],
              shortLabel: "Include 2 → [1,2]",
              explanation: "From [1], i=1 (start=1): Include nums[1]=2. current=[1,2]. Add [1,2]. Recurse with start=2.",
              variables: { i: 1, start: 1, current: "[1, 2]", results: "[[], [1], [1,2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 3], state: "visited" },
                  { id: 2, value: "[1,2]", children: [7], state: "active" },
                ],
                currentPath: [0, 1, 2],
                results: [[], [1], [1, 2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13, 15, 16],
              shortLabel: "Include 2 → [1,2,2]",
              explanation: "From [1,2], i=2 (start=2): Include nums[2]=2. current=[1,2,2]. Add [1,2,2]. This is NOT a skip because i===start (2===2).",
              variables: { i: 2, start: 2, current: "[1, 2, 2]", results: "[[], [1], [1,2], [1,2,2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 3], state: "visited" },
                  { id: 2, value: "[1,2]", children: [7], state: "visited" },
                  { id: 7, value: "[1,2,2]", children: [], state: "found" },
                ],
                currentPath: [0, 1, 2, 7],
                results: [[], [1], [1, 2], [1, 2, 2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [17, 14],
              shortLabel: "Backtrack to [1]: SKIP second 2",
              explanation: "Backtrack to [1]. Now i=2 (start=1): nums[2]=2 === nums[1]=2 and i>start (2>1). SKIP! This prevents generating [1,2] again from the second 2.",
              variables: { i: 2, start: 1, "nums[i]": 2, "nums[i-1]": 2, skipped: true },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 3], state: "visited" },
                  { id: 2, value: "[1,2]", children: [7], state: "visited" },
                  { id: 7, value: "[1,2,2]", children: [], state: "found" },
                  { id: 3, value: "[1,2]skip", children: [], state: "eliminated" },
                ],
                currentPath: [0, 1],
                results: [[], [1], [1, 2], [1, 2, 2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13, 15, 11],
              shortLabel: "Back to []: Include 2 → [2]",
              explanation: "Backtrack to []. i=1 (start=0): Include nums[1]=2. current=[2]. Add [2]. Recurse.",
              variables: { i: 1, start: 0, current: "[2]", results: "[[], [1], [1,2], [1,2,2], [2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 3], state: "visited" },
                  { id: 2, value: "[1,2]", children: [7], state: "visited" },
                  { id: 7, value: "[1,2,2]", children: [], state: "found" },
                  { id: 3, value: "[1,2]skip", children: [], state: "eliminated" },
                  { id: 4, value: "[2]", children: [5], state: "active" },
                ],
                currentPath: [0, 4],
                results: [[], [1], [1, 2], [1, 2, 2], [2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [13, 15, 11],
              shortLabel: "Include 2 → [2,2]",
              explanation: "From [2], i=2 (start=2): nums[2]=2 and i===start, so no skip. Include → [2,2]. Add [2,2].",
              variables: { i: 2, start: 2, current: "[2, 2]", results: "[..., [2], [2,2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 3], state: "visited" },
                  { id: 2, value: "[1,2]", children: [7], state: "visited" },
                  { id: 7, value: "[1,2,2]", children: [], state: "found" },
                  { id: 3, value: "[1,2]skip", children: [], state: "eliminated" },
                  { id: 4, value: "[2]", children: [5], state: "visited" },
                  { id: 5, value: "[2,2]", children: [], state: "found" },
                ],
                currentPath: [0, 4, 5],
                results: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [14],
              shortLabel: "Back to []: SKIP second 2",
              explanation: "Backtrack to []. i=2 (start=0): nums[2]=2 === nums[1]=2 and i>start (2>0). SKIP! This prevents generating [2] again.",
              variables: { i: 2, start: 0, "nums[i]": 2, "nums[i-1]": 2, skipped: true },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 3], state: "visited" },
                  { id: 2, value: "[1,2]", children: [7], state: "visited" },
                  { id: 7, value: "[1,2,2]", children: [], state: "found" },
                  { id: 3, value: "[1,2]skip", children: [], state: "eliminated" },
                  { id: 4, value: "[2]", children: [5], state: "visited" },
                  { id: 5, value: "[2,2]", children: [], state: "found" },
                  { id: 6, value: "[2]skip", children: [], state: "eliminated" },
                ],
                currentPath: [0],
                results: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [5],
              shortLabel: "Return 6 unique subsets",
              explanation: "Done! 6 unique subsets generated without any duplicates. The skip logic pruned 2 branches that would have produced duplicate subsets.",
              variables: { answer: "6 subsets", pruned: 2 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 4], state: "found" },
                  { id: 1, value: "[1]", children: [2], state: "found" },
                  { id: 2, value: "[1,2]", children: [7], state: "found" },
                  { id: 7, value: "[1,2,2]", children: [], state: "found" },
                  { id: 4, value: "[2]", children: [5], state: "found" },
                  { id: 5, value: "[2,2]", children: [], state: "found" },
                ],
                currentPath: [],
                results: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Duplicates [2,2,2]",
          description: "All elements are the same — only 4 unique subsets",
          input: { nums: [2, 2, 2] },
          expectedOutput: "[[],[2],[2,2],[2,2,2]]",
          commonMistake: "Without the skip condition, you'd generate [2] three times, [2,2] three times, etc. The i > start check is essential.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 11],
              shortLabel: "Sort → [2,2,2], add []",
              explanation: "Sort (already sorted). Add [] to results. All elements are 2, so aggressive pruning will occur.",
              variables: { nums: "[2,2,2]", current: "[]", results: "[[]]" },
              dataStructure: {
                tree: [{ id: 0, value: "[]", children: [1], state: "active" }],
                currentPath: [0],
                results: [[]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [13, 15, 11],
              shortLabel: "i=0: Include 2 → [2]",
              explanation: "i=0 (start=0): Include first 2. current=[2]. Add [2].",
              variables: { i: 0, current: "[2]", results: "[[], [2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1], state: "visited" },
                  { id: 1, value: "[2]", children: [2], state: "active" },
                ],
                currentPath: [0, 1],
                results: [[], [2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [13, 15, 11],
              shortLabel: "Include 2 → [2,2]",
              explanation: "From [2], i=1 (start=1): i===start so no skip. Include second 2. current=[2,2]. Add [2,2].",
              variables: { i: 1, start: 1, current: "[2, 2]", results: "[[], [2], [2,2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1], state: "visited" },
                  { id: 1, value: "[2]", children: [2], state: "visited" },
                  { id: 2, value: "[2,2]", children: [3], state: "active" },
                ],
                currentPath: [0, 1, 2],
                results: [[], [2], [2, 2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [13, 15, 11],
              shortLabel: "Include 2 → [2,2,2]",
              explanation: "From [2,2], i=2 (start=2): i===start, no skip. Include third 2. current=[2,2,2]. Add [2,2,2].",
              variables: { i: 2, start: 2, current: "[2, 2, 2]", results: "[[], [2], [2,2], [2,2,2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1], state: "visited" },
                  { id: 1, value: "[2]", children: [2], state: "visited" },
                  { id: 2, value: "[2,2]", children: [3], state: "visited" },
                  { id: 3, value: "[2,2,2]", children: [], state: "found" },
                ],
                currentPath: [0, 1, 2, 3],
                results: [[], [2], [2, 2], [2, 2, 2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14],
              shortLabel: "All remaining branches SKIPPED",
              explanation: "Every remaining branch at every level is skipped because nums[i]===nums[i-1] and i>start. Only 4 unique subsets of [2,2,2] exist: [], [2], [2,2], [2,2,2].",
              variables: { skippedBranches: 3, totalSubsets: 4 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1], state: "found" },
                  { id: 1, value: "[2]", children: [2], state: "found" },
                  { id: 2, value: "[2,2]", children: [3], state: "found" },
                  { id: 3, value: "[2,2,2]", children: [], state: "found" },
                ],
                currentPath: [],
                results: [[], [2], [2, 2], [2, 2, 2]],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const sorted = [...nums].sort((a, b) => a - b);
        const steps = [];
        const results = [];
        let treeNodes = [];
        let nodeId = 0;

        function getPathToNode(id) {
          const path = [];
          let current = id;
          while (current !== null) {
            path.unshift(current);
            const node = treeNodes.find(n => n.id === current);
            current = node ? node.parentId : null;
          }
          return path;
        }

        function backtrack(start, current, parentId) {
          const myId = nodeId++;
          const subsetStr = `[${current.join(",")}]`;

          treeNodes.push({ id: myId, value: subsetStr, children: [], state: "active", parentId });

          if (parentId !== null) {
            const parent = treeNodes.find(n => n.id === parentId);
            if (parent) parent.children.push(myId);
          }

          results.push([...current]);

          steps.push({
            stepId: steps.length, lineNumbers: [11],
            shortLabel: `Add ${subsetStr}`,
            explanation: `Add ${subsetStr} to results. Total: ${results.length}.`,
            variables: { start, current: subsetStr, totalResults: results.length },
            dataStructure: {
              tree: treeNodes.map(n => ({ ...n })),
              currentPath: getPathToNode(myId),
              results: results.map(r => [...r]),
            },
            delta: {}, isAnswer: false,
          });

          for (let i = start; i < sorted.length; i++) {
            if (i > start && sorted[i] === sorted[i - 1]) {
              steps.push({
                stepId: steps.length, lineNumbers: [14],
                shortLabel: `Skip dup ${sorted[i]}`,
                explanation: `i=${i}: nums[${i}]=${sorted[i]} === nums[${i - 1}]=${sorted[i - 1]} and i>start (${i}>${start}). SKIP to avoid duplicate.`,
                variables: { i, start, skipped: sorted[i] },
                dataStructure: {
                  tree: treeNodes.map(n => ({ ...n })),
                  currentPath: getPathToNode(myId),
                  results: results.map(r => [...r]),
                },
                delta: {}, isAnswer: false,
              });
              continue;
            }
            current.push(sorted[i]);
            backtrack(i + 1, current, myId);
            current.pop();
          }

          const node = treeNodes.find(n => n.id === myId);
          if (node) node.state = "found";
        }

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `Sort → [${sorted.join(",")}]`,
          explanation: `Sort nums → [${sorted.join(",")}]. Duplicates grouped together.`,
          variables: { nums: `[${sorted.join(",")}]` },
          dataStructure: { tree: [], currentPath: [], results: [] },
          delta: {}, isAnswer: false,
        });

        backtrack(0, [], null);

        steps.push({
          stepId: steps.length, lineNumbers: [5],
          shortLabel: `Return ${results.length} subsets`,
          explanation: `Done. ${results.length} unique subsets generated.`,
          variables: { totalSubsets: results.length },
          dataStructure: {
            tree: treeNodes.map(n => ({ ...n, state: "found" })),
            currentPath: [],
            results: results.map(r => [...r]),
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n × 2^n)", space: "O(n × 2^n)", explanation: "Generates all subsets plus stores a Set for dedup" },
    optimal: { time: "O(n × 2^n)", space: "O(n)", explanation: "Same time (worst case all unique), but O(n) space for recursion — no dedup Set needed", tradeoff: "Same time complexity but avoids wasted work and extra space" },
  },

  interviewTips: [
    "Start by saying: 'This is Subsets I with duplicates — sort first, then skip.'",
    "The key line is: 'if i > start && nums[i] == nums[i-1], skip.'",
    "Explain WHY i > start matters: we CAN use the same value deeper in recursion, just not at the same decision level.",
    "Draw the recursion tree and show which branches get pruned.",
    "Compare with Subsets I — only one extra line of code, but it changes the problem entirely.",
    "Mention: sorting is O(n log n) but that's dominated by O(n * 2^n) for generating subsets.",
  ],

  relatedProblems: ["subsets", "combination-sum-ii", "permutations"],
};
