export const subsets = {
  id: 71,
  slug: "subsets",
  title: "Subsets",
  difficulty: "Medium",
  topic: "backtracking",
  topicLabel: "Backtracking",
  neetcodeNumber: 71,
  artifactType: "Backtracking",
  companies: ["Amazon", "Google", "Meta", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/subsets/",

  pattern: "Include/Exclude Backtracking",
  patternExplanation: `For each element, make a binary choice: include it or skip it. This
    creates a decision tree of depth n. Every leaf represents a unique subset. Backtracking
    explores all 2^n paths, collecting results at every node (not just leaves).`,

  intuition: {
    coreInsight: `Generating all subsets is equivalent to making a binary choice for each element:
      include it or don't. With n elements, there are exactly 2^n subsets. We can build them
      incrementally: start with [], then for each element, decide include/exclude and recurse
      on the remaining elements. Every node in the recursion tree IS a valid subset.`,

    mentalModel: `Imagine you're packing for a trip with 3 items: [1, 2, 3]. For each item,
      you stand at a fork: pack it (go left) or leave it (go right). After deciding for all
      items, whatever's in your bag is one subset. The tree of all decisions gives you every
      possible packing combination — that's all 2^3 = 8 subsets.`,

    whyNaiveFails: `There's no "faster" alternative — we MUST generate all 2^n subsets, so
      O(n * 2^n) is optimal. The naive approach isn't wrong, it's about implementation:
      iterating through all possible bitmasks (0 to 2^n-1) works but is less intuitive
      and harder to extend to problems with constraints (like Subsets II with duplicates).`,

    keyObservation: `We add the current subset to results BEFORE the loop, not after. This
      means every node in the recursion tree contributes a result — not just leaves. The
      loop starts at the current index (not 0) to avoid generating duplicate subsets like
      [1,2] and [2,1]. Order is enforced by always moving forward.`,
  },

  problem: `Given an integer array nums of unique elements, return all possible subsets (the
    power set). The solution set must not contain duplicate subsets. Return the solution in
    any order.`,

  examples: [
    { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", explanation: "All 8 subsets of a 3-element set." },
    { input: "nums = [0]", output: "[[],[0]]", explanation: "Two subsets: empty set and {0}." },
  ],

  constraints: [
    "1 <= nums.length <= 10",
    "-10 <= nums[i] <= 10",
    "All the numbers of nums are unique.",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Backtracking",
      tier: "optimal",
      timeComplexity: "O(n × 2^n)",
      spaceComplexity: "O(n)",
      idea: `Use backtracking with index tracking. At each call, add the current subset to
        results, then try adding each remaining element (from index onward) and recurse.
        After recursion, remove the element (backtrack) to explore the "exclude" branch.`,

      javaCode: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start,
                       List<Integer> current,
                       List<List<Integer>> result) {
    result.add(new ArrayList<>(current));

    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.remove(current.size() - 1);
    }
}`,

      cppCode: `vector<vector<int>> subsets(vector<int>& nums) {
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
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.pop_back();
    }
}`,

      pythonCode: `def subsets(nums: List[int]) -> List[List[int]]:
    result = []

    def backtrack(start, current):
        result.append(current[:])

        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()

    backtrack(0, [])
    return result`,

      lineAnnotations: {
        2: "Result list to collect all subsets",
        3: "Start backtracking from index 0 with empty current subset",
        10: "Add a COPY of current subset to results (every node is a valid subset)",
        12: "Try adding each remaining element",
        13: "Include nums[i] in current subset",
        14: "Recurse with next index — only consider elements after i",
        15: "Backtrack: remove nums[i] to explore the 'exclude' branch",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard [1,2,3]",
          description: "Generate all 8 subsets of [1,2,3]",
          input: { nums: [1, 2, 3] },
          expectedOutput: "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 10],
              shortLabel: "Start: add []",
              explanation: "Call backtrack(start=0, current=[]). First action: add a copy of current [] to results. The empty set is always a valid subset.",
              variables: { start: 0, current: "[]", results: "[[]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 5, 7], state: "active" },
                ],
                currentPath: [0],
                results: [[]],
                callStack: ["backtrack(0,[])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 13, 14],
              shortLabel: "Include 1 → [1]",
              explanation: "i=0: Add nums[0]=1 to current. current=[1]. Recurse with start=1. Add [1] to results.",
              variables: { start: 0, i: 0, current: "[1]", results: "[[], [1]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 5, 7], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "active" },
                ],
                currentPath: [0, 1],
                results: [[], [1]],
                callStack: ["backtrack(0,[])", "backtrack(1,[1])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13, 14],
              shortLabel: "Include 2 → [1,2]",
              explanation: "From [1], i=1: Add nums[1]=2. current=[1,2]. Recurse with start=2. Add [1,2] to results.",
              variables: { start: 1, i: 1, current: "[1, 2]", results: "[[], [1], [1,2]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 5, 7], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "active" },
                ],
                currentPath: [0, 1, 2],
                results: [[], [1], [1, 2]],
                callStack: ["backtrack(0,[])", "backtrack(1,[1])", "backtrack(2,[1,2])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 14],
              shortLabel: "Include 3 → [1,2,3]",
              explanation: "From [1,2], i=2: Add nums[2]=3. current=[1,2,3]. Recurse with start=3. Add [1,2,3] to results. No more elements — leaf node.",
              variables: { start: 2, i: 2, current: "[1, 2, 3]", results: "[[], [1], [1,2], [1,2,3]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 5, 7], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "active" },
                ],
                currentPath: [0, 1, 2, 3],
                results: [[], [1], [1, 2], [1, 2, 3]],
                callStack: ["backtrack(0,[])", "backtrack(1,[1])", "backtrack(2,[1,2])", "backtrack(3,[1,2,3])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15],
              shortLabel: "Backtrack: remove 3 → [1,2]",
              explanation: "No more elements after index 2. Backtrack: remove 3 from current. Return to [1,2]. Loop ends at [1,2] level too — backtrack: remove 2.",
              variables: { current: "[1, 2]", backtracked: 3 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 5, 7], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                ],
                currentPath: [0, 1, 2],
                results: [[], [1], [1, 2], [1, 2, 3]],
                callStack: ["backtrack(0,[])", "backtrack(1,[1])", "backtrack(2,[1,2])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12, 13, 14, 15],
              shortLabel: "Back to [1]: try 3 → [1,3]",
              explanation: "Backtracked to [1]. Now i=2: Add nums[2]=3. current=[1,3]. Add [1,3] to results. No more elements, backtrack.",
              variables: { start: 0, i: 2, current: "[1, 3]", results: "[[], [1], [1,2], [1,2,3], [1,3]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 5, 7], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [], state: "active" },
                ],
                currentPath: [0, 1, 4],
                results: [[], [1], [1, 2], [1, 2, 3], [1, 3]],
                callStack: ["backtrack(0,[])", "backtrack(1,[1])", "backtrack(3,[1,3])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [12, 13, 14, 15],
              shortLabel: "Back to []: try 2 → [2], [2,3]",
              explanation: "Backtracked to []. Now i=1: Try nums[1]=2. Generates [2] and [2,3].",
              variables: { start: 0, i: 1, current: "[2]", results: "[..., [2], [2,3]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 5, 7], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [], state: "found" },
                  { id: 5, value: "[2]", children: [6], state: "active" },
                  { id: 6, value: "[2,3]", children: [], state: "active" },
                ],
                currentPath: [0, 5],
                results: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]],
                callStack: ["backtrack(0,[])", "backtrack(1,[2])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [12, 13, 14, 15],
              shortLabel: "Back to []: try 3 → [3]",
              explanation: "Backtracked to []. Now i=2: Try nums[2]=3. Generates [3]. No more elements. All paths explored!",
              variables: { start: 0, i: 2, current: "[3]", results: "all 8 subsets" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 5, 7], state: "visited" },
                  { id: 1, value: "[1]", children: [2, 4], state: "visited" },
                  { id: 2, value: "[1,2]", children: [3], state: "visited" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [], state: "found" },
                  { id: 5, value: "[2]", children: [6], state: "visited" },
                  { id: 6, value: "[2,3]", children: [], state: "found" },
                  { id: 7, value: "[3]", children: [], state: "active" },
                ],
                currentPath: [0, 7],
                results: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
                callStack: ["backtrack(0,[])", "backtrack(2,[3])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [4],
              shortLabel: "Return all 8 subsets",
              explanation: "Backtracking complete. Generated all 2^3 = 8 subsets. Every node in the decision tree contributed one subset to the result.",
              variables: { answer: "8 subsets", totalSubsets: 8 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1, 5, 7], state: "found" },
                  { id: 1, value: "[1]", children: [2, 4], state: "found" },
                  { id: 2, value: "[1,2]", children: [3], state: "found" },
                  { id: 3, value: "[1,2,3]", children: [], state: "found" },
                  { id: 4, value: "[1,3]", children: [], state: "found" },
                  { id: 5, value: "[2]", children: [6], state: "found" },
                  { id: 6, value: "[2,3]", children: [], state: "found" },
                  { id: 7, value: "[3]", children: [], state: "found" },
                ],
                currentPath: [],
                results: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Element",
          description: "Only one element — 2 subsets: [] and [0]",
          input: { nums: [0] },
          expectedOutput: "[[], [0]]",
          commonMistake: "Forgetting to add the empty set. The empty set is ALWAYS a valid subset.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 10],
              shortLabel: "Start: add []",
              explanation: "Call backtrack(start=0, current=[]). Add [] to results.",
              variables: { start: 0, current: "[]", results: "[[]]" },
              dataStructure: {
                tree: [{ id: 0, value: "[]", children: [1], state: "active" }],
                currentPath: [0],
                results: [[]],
                callStack: ["backtrack(0,[])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 13, 14],
              shortLabel: "Include 0 → [0]",
              explanation: "i=0: Add nums[0]=0. current=[0]. Recurse with start=1. Add [0] to results. start=1 >= nums.length, so loop doesn't execute.",
              variables: { start: 0, i: 0, current: "[0]", results: "[[], [0]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1], state: "visited" },
                  { id: 1, value: "[0]", children: [], state: "active" },
                ],
                currentPath: [0, 1],
                results: [[], [0]],
                callStack: ["backtrack(0,[])", "backtrack(1,[0])"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4],
              shortLabel: "Return [[], [0]]",
              explanation: "Backtracking complete. 2^1 = 2 subsets generated: [] and [0].",
              variables: { answer: "[[], [0]]", totalSubsets: 2 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[]", children: [1], state: "found" },
                  { id: 1, value: "[0]", children: [], state: "found" },
                ],
                currentPath: [],
                results: [[], [0]],
                callStack: [],
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
        const callStackTracker = [];

        function backtrack(start, current, parentId) {
          const myId = nodeId++;
          const subsetStr = `[${current.join(",")}]`;

          treeNodes.push({
            id: myId,
            value: subsetStr,
            children: [],
            state: "active",
            parentId: parentId,
          });

          // Add parent→child link
          if (parentId !== null) {
            const parent = treeNodes.find(n => n.id === parentId);
            if (parent) parent.children.push(myId);
          }

          callStackTracker.push(`backtrack(${start},[${current.join(",")}])`);
          results.push([...current]);

          steps.push({
            stepId: steps.length,
            lineNumbers: [10],
            shortLabel: `Add ${subsetStr}`,
            explanation: `Add ${subsetStr} to results. ${current.length === 0 ? "Empty set is always valid." : `Subset of size ${current.length}.`} Total results: ${results.length}.`,
            variables: { start, current: subsetStr, totalResults: results.length },
            dataStructure: {
              tree: treeNodes.map(n => ({ ...n })),
              currentPath: getPathToNode(myId),
              results: results.map(r => [...r]),
              callStack: [...callStackTracker],
            },
            delta: {},
            isAnswer: false,
          });

          for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current, myId);

            // After returning, mark as backtracked
            current.pop();
            callStackTracker.pop();

            if (i < nums.length - 1 || start === 0) {
              steps.push({
                stepId: steps.length,
                lineNumbers: [15],
                shortLabel: `Backtrack: remove ${nums[i]}`,
                explanation: `Remove ${nums[i]} from current. Backtrack to explore next option.`,
                variables: { backtracked: nums[i], current: `[${current.join(",")}]` },
                dataStructure: {
                  tree: treeNodes.map(n => ({ ...n })),
                  currentPath: getPathToNode(myId),
                  results: results.map(r => [...r]),
                  callStack: [...callStackTracker],
                },
                delta: {},
                isAnswer: false,
              });
            }
          }

          // Mark node as fully explored
          const node = treeNodes.find(n => n.id === myId);
          if (node) node.state = "found";
        }

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

        backtrack(0, [], null);

        // Final step
        steps.push({
          stepId: steps.length,
          lineNumbers: [4],
          shortLabel: `Return ${results.length} subsets`,
          explanation: `Backtracking complete. Generated all ${results.length} = 2^${nums.length} subsets.`,
          variables: { totalSubsets: results.length },
          dataStructure: {
            tree: treeNodes.map(n => ({ ...n, state: "found" })),
            currentPath: [],
            results: results.map(r => [...r]),
            callStack: [],
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   null,
    optimal: { time: "O(n × 2^n)", space: "O(n)", explanation: "2^n subsets, each taking O(n) to copy. Recursion depth is n.", tradeoff: "No way to avoid O(2^n) — that's how many subsets exist" },
  },

  interviewTips: [
    "Immediately state: '2^n subsets exist, so O(n * 2^n) is optimal.'",
    "Explain the include/exclude choice for each element — shows you understand the recursion tree.",
    "Mention: 'start at index i, not 0, to avoid duplicates like [1,2] and [2,1].'",
    "Draw the recursion tree — it makes the algorithm crystal clear.",
    "Follow up: Subsets II adds duplicates — sort first, then skip consecutive equal elements.",
    "Alternative: iterative bitmask approach — for each number 0 to 2^n-1, include element i if bit i is set.",
  ],

  relatedProblems: ["subsets-ii", "combination-sum", "permutations"],
};
