export const permutations = {
  id: 73,
  slug: "permutations",
  title: "Permutations",
  difficulty: "Medium",
  topic: "backtracking",
  topicLabel: "Backtracking",
  neetcodeNumber: 73,
  artifactType: "Backtracking",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/permutations/",

  pattern: "Swap-based Backtracking / Used-array Backtracking",
  patternExplanation: `To generate all permutations, at each position we choose from the remaining
    unused elements. We track which elements are used and backtrack after each recursive call.
    This builds a decision tree of depth n with n! leaves — one per permutation.`,

  intuition: {
    coreInsight: `A permutation is an ordering of ALL elements. At position 0 we have n choices,
      at position 1 we have n-1 choices, and so on — giving n! total arrangements. We build each
      permutation one element at a time: pick an unused element, place it, recurse for the remaining
      positions, then un-place it (backtrack) and try the next unused element.`,

    mentalModel: `Imagine arranging 3 books on a shelf. For the first slot, you can pick any of the
      3 books. For the second slot, you pick from the remaining 2. The last slot gets the final book.
      That's 3 x 2 x 1 = 6 arrangements. Backtracking is like physically trying each book in slot 1,
      filling the rest, recording the arrangement, then swapping the first book out and trying another.`,

    whyNaiveFails: `There's no shortcut — we must generate all n! permutations, so the time complexity
      is inherently O(n * n!). The key mistake is generating duplicate permutations by not properly
      tracking which elements are already used in the current arrangement. Without a "used" set or
      swap-based approach, you'd need to check for duplicates, which wastes time.`,

    keyObservation: `Unlike subsets where we pick a subset of elements, permutations use ALL elements
      in every result. The recursion depth always equals n. The base case is when current.length === n
      (all positions filled). We use a "used" boolean array to track which elements are already placed
      in the current permutation — this prevents using the same element twice.`,
  },

  problem: `Given an array nums of distinct integers, return all the possible permutations. You can
    return the answer in any order.`,

  examples: [
    { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "All 6 permutations of [1,2,3]." },
    { input: "nums = [0,1]", output: "[[0,1],[1,0]]", explanation: "2 permutations of [0,1]." },
    { input: "nums = [1]", output: "[[1]]", explanation: "Only one permutation of a single element." },
  ],

  constraints: [
    "1 <= nums.length <= 6",
    "-10 <= nums[i] <= 10",
    "All the integers of nums are unique.",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Backtracking with Used Array",
      tier: "optimal",
      timeComplexity: "O(n × n!)",
      spaceComplexity: "O(n)",
      idea: `For each position in the permutation, iterate over all elements. If an element hasn't
        been used yet, add it to the current permutation and recurse. When current.length === n,
        we've built a complete permutation — add it to results. Backtrack by removing the last
        element and marking it unused.`,

      javaCode: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    boolean[] used = new boolean[nums.length];
    backtrack(nums, used, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, boolean[] used,
                       List<Integer> current,
                       List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }

    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        current.add(nums[i]);
        backtrack(nums, used, current, result);
        current.remove(current.size() - 1);
        used[i] = false;
    }
}`,

      cppCode: `vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    vector<bool> used(nums.size(), false);
    backtrack(nums, used, current, result);
    return result;
}

void backtrack(vector<int>& nums, vector<bool>& used,
               vector<int>& current,
               vector<vector<int>>& result) {
    if (current.size() == nums.size()) {
        result.push_back(current);
        return;
    }

    for (int i = 0; i < nums.size(); i++) {
        if (used[i]) continue;
        used[i] = true;
        current.push_back(nums[i]);
        backtrack(nums, used, current, result);
        current.pop_back();
        used[i] = false;
    }
}`,

      pythonCode: `def permute(nums: List[int]) -> List[List[int]]:
    result = []
    used = [False] * len(nums)

    def backtrack(current):
        if len(current) == len(nums):
            result.append(current[:])
            return

        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            current.append(nums[i])
            backtrack(current)
            current.pop()
            used[i] = False

    backtrack([])
    return result`,

      lineAnnotations: {
        2: "Result list collects all complete permutations",
        3: "Boolean array tracks which elements are in current permutation",
        11: "Base case: current has all n elements — it's a complete permutation",
        12: "Add a COPY of current to results",
        16: "Try every element as the next choice",
        17: "Skip elements already in the current permutation",
        18: "Mark element as used",
        19: "Add element to current permutation",
        20: "Recurse to fill the next position",
        21: "Backtrack: remove element from current",
        22: "Backtrack: mark element as unused",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard [1,2,3]",
          description: "Generate all 6 permutations of [1,2,3]",
          input: { nums: [1, 2, 3] },
          expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4],
              shortLabel: "Start backtracking",
              explanation: "Initialize: result=[], used=[false,false,false], current=[]. We need to fill 3 positions. For position 0, we can choose any of the 3 elements.",
              variables: { current: "[]", used: "[F,F,F]", results: "[]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "active" },
                ],
                currentPath: [0],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [16, 17, 18, 19, 20],
              shortLabel: "Pick 1 → [1]",
              explanation: "Position 0: Choose nums[0]=1. Mark used[0]=true. current=[1]. Recurse to fill position 1.",
              variables: { i: 0, current: "[1]", used: "[T,F,F]", results: "[]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "active" },
                ],
                currentPath: [0, 1],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16, 17, 18, 19, 20],
              shortLabel: "Pick 2 → [1,2]",
              explanation: "Position 1: Skip nums[0]=1 (used). Choose nums[1]=2. Mark used[1]=true. current=[1,2]. Recurse.",
              variables: { i: 1, current: "[1, 2]", used: "[T,T,F]", results: "[]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "active" },
                ],
                currentPath: [0, 1, 2],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [16, 17, 18, 19, 11, 12],
              shortLabel: "Pick 3 → [1,2,3] ✓",
              explanation: "Position 2: Only nums[2]=3 is unused. current=[1,2,3]. Length=3=n. Complete permutation! Add [1,2,3] to results.",
              variables: { current: "[1, 2, 3]", used: "[T,T,T]", results: "[[1,2,3]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                ],
                currentPath: [0, 1, 2, 3],
                results: [[1, 2, 3]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [21, 22],
              shortLabel: "Backtrack → [1], try 3",
              explanation: "Backtrack: remove 3, unmark used[2]. Backtrack again: remove 2, unmark used[1]. Now at [1], try nums[2]=3 for position 1.",
              variables: { current: "[1, 3]", used: "[T,F,T]", results: "[[1,2,3]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [5], state: "active" },
                ],
                currentPath: [0, 1, 4],
                results: [[1, 2, 3]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 12],
              shortLabel: "[1,3,2] ✓",
              explanation: "From [1,3], only nums[1]=2 unused. current=[1,3,2]. Complete! Add [1,3,2] to results.",
              variables: { current: "[1, 3, 2]", used: "[T,T,T]", results: "[[1,2,3],[1,3,2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [5], state: "visited" },
                  { id: 5, value: "[1,3,2]", children: [], state: "found" },
                ],
                currentPath: [0, 1, 4, 5],
                results: [[1, 2, 3], [1, 3, 2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [21, 22, 16, 18, 19],
              shortLabel: "Back to []: pick 2 → [2]",
              explanation: "Backtrack all the way to []. Now try nums[1]=2 for position 0. current=[2]. Recurse.",
              variables: { i: 1, current: "[2]", used: "[F,T,F]", results: "[[1,2,3],[1,3,2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [5], state: "visited" },
                  { id: 5, value: "[1,3,2]", children: [], state: "found" },
                  { id: 6, value: "[2]", children: [7, 9], state: "active" },
                ],
                currentPath: [0, 6],
                results: [[1, 2, 3], [1, 3, 2]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [11, 12],
              shortLabel: "[2,1,3] ✓ and [2,3,1] ✓",
              explanation: "From [2]: pick 1 then 3 → [2,1,3]. Backtrack, pick 3 then 1 → [2,3,1]. Two more permutations found.",
              variables: { current: "[2,...]", results: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [5], state: "visited" },
                  { id: 5, value: "[1,3,2]", children: [], state: "found" },
                  { id: 6, value: "[2]", children: [7, 9], state: "visited" },
                  { id: 7, value: "[2,1]", children: [8], state: "visited" },
                  { id: 8, value: "[2,1,3]", children: [], state: "found" },
                  { id: 9, value: "[2,3]", children: [10], state: "visited" },
                  { id: 10, value: "[2,3,1]", children: [], state: "found" },
                ],
                currentPath: [0, 6],
                results: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [16, 18, 19, 11, 12],
              shortLabel: "Pick 3 → [3,1,2] ✓ and [3,2,1] ✓",
              explanation: "Back to []. Pick nums[2]=3 for position 0. Generates [3,1,2] and [3,2,1]. All 6 permutations found.",
              variables: { current: "[3,...]", results: "all 6 permutations" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [5], state: "visited" },
                  { id: 5, value: "[1,3,2]", children: [], state: "found" },
                  { id: 6, value: "[2]", children: [7, 9], state: "visited" },
                  { id: 7, value: "[2,1]", children: [8], state: "visited" },
                  { id: 8, value: "[2,1,3]", children: [], state: "found" },
                  { id: 9, value: "[2,3]", children: [10], state: "visited" },
                  { id: 10, value: "[2,3,1]", children: [], state: "found" },
                  { id: 11, value: "[3]", children: [12, 14], state: "visited" },
                  { id: 12, value: "[3,1]", children: [13], state: "visited" },
                  { id: 13, value: "[3,1,2]", children: [], state: "found" },
                  { id: 14, value: "[3,2]", children: [15], state: "visited" },
                  { id: 15, value: "[3,2,1]", children: [], state: "found" },
                ],
                currentPath: [0, 11],
                results: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [5],
              shortLabel: "Return all 6 permutations",
              explanation: "Backtracking complete. Generated all 3! = 6 permutations of [1,2,3]. Every leaf in the decision tree is a complete permutation.",
              variables: { answer: "6 permutations", totalPermutations: 6 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 6, 11], state: "found" },
                  { id: 1, value: "[1]", children: [2, 4], state: "found" },
                  { id: 2, value: "[1,2]", children: [3], state: "found" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [5], state: "found" },
                  { id: 5, value: "[1,3,2]", children: [], state: "found" },
                  { id: 6, value: "[2]", children: [7, 9], state: "found" },
                  { id: 7, value: "[2,1]", children: [8], state: "found" },
                  { id: 8, value: "[2,1,3]", children: [], state: "found" },
                  { id: 9, value: "[2,3]", children: [10], state: "found" },
                  { id: 10, value: "[2,3,1]", children: [], state: "found" },
                  { id: 11, value: "[3]", children: [12, 14], state: "found" },
                  { id: 12, value: "[3,1]", children: [13], state: "found" },
                  { id: 13, value: "[3,1,2]", children: [], state: "found" },
                  { id: 14, value: "[3,2]", children: [15], state: "found" },
                  { id: 15, value: "[3,2,1]", children: [], state: "found" },
                ],
                currentPath: [],
                results: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Two Elements",
          description: "Only 2 elements — 2 permutations",
          input: { nums: [0, 1] },
          expectedOutput: "[[0,1],[1,0]]",
          commonMistake: "Forgetting to unmark used[i] after backtracking, causing only one permutation to be generated.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4],
              shortLabel: "Start",
              explanation: "Initialize: result=[], used=[false,false], current=[]. Two positions to fill.",
              variables: { current: "[]", used: "[F,F]", results: "[]" },
              dataStructure: {
                tree: [{ id: 0, value: "[]", children: [1, 3], state: "active" }],
                currentPath: [0],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [18, 19, 20],
              shortLabel: "Pick 0 → [0]",
              explanation: "Position 0: Choose nums[0]=0. used=[true,false]. current=[0]. Recurse.",
              variables: { i: 0, current: "[0]", used: "[T,F]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 3], state: "visited" },
                  { id: 1, value: "[0]", children: [2], state: "active" },
                ],
                currentPath: [0, 1],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "[0,1] ✓",
              explanation: "Only nums[1]=1 unused. current=[0,1]. Length=2=n. Complete! Add [0,1].",
              variables: { current: "[0, 1]", used: "[T,T]", results: "[[0,1]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 3], state: "visited" },
                  { id: 1, value: "[0]", children: [2], state: "visited" },
                  { id: 2, value: "[0,1]", children: [], state: "found" },
                ],
                currentPath: [0, 1, 2],
                results: [[0, 1]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [21, 22, 18, 19],
              shortLabel: "Backtrack, pick 1 → [1]",
              explanation: "Backtrack to []. Now try nums[1]=1 for position 0. used=[false,true]. current=[1].",
              variables: { i: 1, current: "[1]", used: "[F,T]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 3], state: "visited" },
                  { id: 1, value: "[0]", children: [2], state: "visited" },
                  { id: 2, value: "[0,1]", children: [], state: "found" },
                  { id: 3, value: "[1]", children: [4], state: "active" },
                ],
                currentPath: [0, 3],
                results: [[0, 1]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12],
              shortLabel: "[1,0] ✓",
              explanation: "Only nums[0]=0 unused. current=[1,0]. Complete! Add [1,0].",
              variables: { current: "[1, 0]", used: "[T,T]", results: "[[0,1],[1,0]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 3], state: "visited" },
                  { id: 1, value: "[0]", children: [2], state: "visited" },
                  { id: 2, value: "[0,1]", children: [], state: "found" },
                  { id: 3, value: "[1]", children: [4], state: "visited" },
                  { id: 4, value: "[1,0]", children: [], state: "found" },
                ],
                currentPath: [0, 3, 4],
                results: [[0, 1], [1, 0]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5],
              shortLabel: "Return 2 permutations",
              explanation: "Done. 2! = 2 permutations generated: [0,1] and [1,0].",
              variables: { answer: "[[0,1],[1,0]]", totalPermutations: 2 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 3], state: "found" },
                  { id: 1, value: "[0]", children: [2], state: "found" },
                  { id: 2, value: "[0,1]", children: [], state: "found" },
                  { id: 3, value: "[1]", children: [4], state: "found" },
                  { id: 4, value: "[1,0]", children: [], state: "found" },
                ],
                currentPath: [],
                results: [[0, 1], [1, 0]],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
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

        function backtrack(current, used, parentId) {
          const myId = nodeId++;
          const subsetStr = `[${current.join(",")}]`;

          treeNodes.push({
            id: myId, value: subsetStr, children: [], state: "active", parentId,
          });

          if (parentId !== null) {
            const parent = treeNodes.find(n => n.id === parentId);
            if (parent) parent.children.push(myId);
          }

          if (current.length === nums.length) {
            results.push([...current]);
            steps.push({
              stepId: steps.length, lineNumbers: [11, 12],
              shortLabel: `${subsetStr} ✓`,
              explanation: `Complete permutation: ${subsetStr}. Add to results. Total: ${results.length}.`,
              variables: { current: subsetStr, totalResults: results.length },
              dataStructure: {
                tree: treeNodes.map(n => ({ ...n })),
                currentPath: getPathToNode(myId),
                results: results.map(r => [...r]),
              },
              delta: {}, isAnswer: false,
            });
            const node = treeNodes.find(n => n.id === myId);
            if (node) node.state = "found";
            return;
          }

          steps.push({
            stepId: steps.length, lineNumbers: [16],
            shortLabel: `At ${subsetStr}`,
            explanation: `Current permutation: ${subsetStr}. Need ${nums.length - current.length} more element(s). Try each unused element.`,
            variables: { current: subsetStr, used: `[${used.map(u => u ? "T" : "F").join(",")}]` },
            dataStructure: {
              tree: treeNodes.map(n => ({ ...n })),
              currentPath: getPathToNode(myId),
              results: results.map(r => [...r]),
            },
            delta: {}, isAnswer: false,
          });

          for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            current.push(nums[i]);
            backtrack(current, used, myId);
            current.pop();
            used[i] = false;
          }

          const node = treeNodes.find(n => n.id === myId);
          if (node) node.state = "found";
        }

        backtrack([], new Array(nums.length).fill(false), null);

        steps.push({
          stepId: steps.length, lineNumbers: [5],
          shortLabel: `Return ${results.length} permutations`,
          explanation: `Backtracking complete. Generated all ${results.length} = ${nums.length}! permutations.`,
          variables: { totalPermutations: results.length },
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
    brute: null,
    optimal: { time: "O(n × n!)", space: "O(n)", explanation: "n! permutations, each taking O(n) to copy. Recursion depth is n.", tradeoff: "No shortcut — n! permutations must all be generated" },
  },

  interviewTips: [
    "State upfront: 'There are n! permutations, so O(n * n!) is optimal.'",
    "Clarify: 'All elements are distinct, so no duplicate handling needed.'",
    "Mention the used[] array approach vs. the swap-based approach — both are valid.",
    "Draw the recursion tree — at each level, branches fan out to unused elements only.",
    "Follow up: Permutations II with duplicates — sort first, then skip equal adjacent unused elements.",
    "Key difference from Subsets: permutations use ALL elements, subsets use any number.",
  ],

  relatedProblems: ["subsets", "combination-sum", "subsets-ii"],
};
