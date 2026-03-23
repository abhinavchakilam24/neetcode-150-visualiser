export const combinationSum = {
  id: 72,
  slug: "combination-sum",
  title: "Combination Sum",
  difficulty: "Medium",
  topic: "backtracking",
  topicLabel: "Backtracking",
  neetcodeNumber: 72,
  artifactType: "Backtracking",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/combination-sum/",

  pattern: "Unbounded Backtracking with Reuse",
  patternExplanation: `Unlike Subsets where each element is used at most once, Combination Sum
    allows unlimited reuse of the same candidate. The key difference: when recursing after
    choosing candidate[i], we pass i (not i+1) so the same element can be picked again.`,

  intuition: {
    coreInsight: `We need to find all combinations of candidates that sum to target. Since each
      candidate can be reused unlimited times, our decision tree at index i has two branches:
      (1) include candidates[i] again and stay at index i, or (2) skip candidates[i] and move
      to index i+1. We stop when the remaining target reaches 0 (found!) or goes negative (prune).`,

    mentalModel: `Imagine you're at a vending machine with coins of denominations [2, 3, 6, 7] and
      you need to make exactly 7 cents. You can use any coin as many times as you want. You try
      stacking 2s (2+2+2+2 = 8, too much, backtrack). Then 2+2+3 = 7, that works! You systematically
      try every stacking combination, pruning whenever the total exceeds target.`,

    whyNaiveFails: `A pure brute force would generate ALL possible multisets up to some length,
      then filter for those summing to target. This explores a massive space including sums way
      past target. Backtracking with pruning (stop when remaining < 0) cuts off entire branches
      early, making it dramatically faster in practice.`,

    keyObservation: `By iterating candidates in order and only considering candidates from index i
      onward, we avoid generating duplicate combinations like [2,3] and [3,2]. The "stay at i"
      option handles reuse; the "move to i+1" option handles skipping. Sorting candidates lets
      us prune even earlier: if candidates[i] > remaining, all subsequent candidates are too large.`,
  },

  problem: `Given an array of distinct integers candidates and a target integer target, return a list
    of all unique combinations of candidates where the chosen numbers sum to target. You may
    return the combinations in any order. The same number may be chosen from candidates an
    unlimited number of times. Two combinations are unique if the frequency of at least one of
    the chosen numbers is different.`,

  examples: [
    { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]", explanation: "2+2+3=7 and 7=7 are the only two combinations." },
    { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]", explanation: "Three unique combinations sum to 8." },
    { input: "candidates = [2], target = 1", output: "[]", explanation: "No combination of 2s can sum to 1." },
  ],

  constraints: [
    "1 <= candidates.length <= 30",
    "2 <= candidates[i] <= 40",
    "All elements of candidates are distinct.",
    "1 <= target <= 40",
  ],

  approaches: {
    brute: null,
    better: null,

    optimal: {
      label: "Backtracking with Pruning",
      tier: "optimal",
      timeComplexity: "O(n^(t/m))",
      spaceComplexity: "O(t/m)",
      idea: `Sort candidates. Use backtracking: at each step, try including each candidate from
        index i onward. Since reuse is allowed, recurse with same index. If remaining target
        becomes 0, record the combination. If it goes negative, prune.`,

      javaCode: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    Arrays.sort(candidates);
    backtrack(candidates, target, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] candidates, int remaining,
                       int start, List<Integer> current,
                       List<List<Integer>> result) {
    if (remaining == 0) {
        result.add(new ArrayList<>(current));
        return;
    }

    for (int i = start; i < candidates.length; i++) {
        if (candidates[i] > remaining) break;
        current.add(candidates[i]);
        backtrack(candidates, remaining - candidates[i],
                  i, current, result);
        current.remove(current.size() - 1);
    }
}`,

      cppCode: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> result;
    sort(candidates.begin(), candidates.end());
    vector<int> current;
    backtrack(candidates, target, 0, current, result);
    return result;
}

void backtrack(vector<int>& candidates, int remaining,
               int start, vector<int>& current,
               vector<vector<int>>& result) {
    if (remaining == 0) {
        result.push_back(current);
        return;
    }

    for (int i = start; i < candidates.size(); i++) {
        if (candidates[i] > remaining) break;
        current.push_back(candidates[i]);
        backtrack(candidates, remaining - candidates[i],
                  i, current, result);
        current.pop_back();
    }
}`,

      pythonCode: `def combinationSum(candidates: List[int], target: int) -> List[List[int]]:
    result = []
    candidates.sort()

    def backtrack(remaining, start, current):
        if remaining == 0:
            result.append(current[:])
            return

        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break
            current.append(candidates[i])
            backtrack(remaining - candidates[i], i, current)
            current.pop()

    backtrack(target, 0, [])
    return result`,

      lineAnnotations: {
        2: "Result list for all valid combinations",
        3: "Sort to enable early pruning",
        4: "Start backtracking from index 0",
        11: "Base case: remaining is 0 — found a valid combination",
        12: "Add a copy of current combination to results",
        16: "Try each candidate from index start onward",
        17: "Pruning: if candidate > remaining, all subsequent are too large (sorted)",
        18: "Include this candidate",
        19: "Recurse with same index i (reuse allowed) and reduced remaining",
        21: "Backtrack: remove last candidate to try next option",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard [2,3,6,7] → 7",
          description: "Find all combinations from [2,3,6,7] summing to 7",
          input: { candidates: [2, 3, 6, 7], target: 7 },
          expectedOutput: "[[2,2,3],[7]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4],
              shortLabel: "Sort & start",
              explanation: "Sort candidates to [2,3,6,7]. Start backtracking with remaining=7, start=0, current=[].",
              variables: { remaining: 7, start: 0, current: "[]", results: "[]" },
              dataStructure: {
                tree: [{ id: 0, value: "[] rem=7", children: [], state: "active" }],
                currentPath: [0],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [16, 17, 18, 19],
              shortLabel: "Pick 2, rem=5",
              explanation: "i=0: candidates[0]=2 <= 7. Add 2 to current. Recurse with remaining=5, start=0.",
              variables: { remaining: 5, i: 0, current: "[2]", candidate: 2 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [], state: "active" },
                ],
                currentPath: [0, 1],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16, 17, 18, 19],
              shortLabel: "Pick 2 again, rem=3",
              explanation: "i=0: candidates[0]=2 <= 5. Add another 2. Recurse with remaining=3, start=0.",
              variables: { remaining: 3, i: 0, current: "[2,2]", candidate: 2 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [2], state: "visited" },
                  { id: 2, value: "[2,2] rem=3", children: [], state: "active" },
                ],
                currentPath: [0, 1, 2],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [16, 17, 18, 19],
              shortLabel: "Pick 2 again, rem=1",
              explanation: "i=0: candidates[0]=2 <= 3. Add another 2. Recurse with remaining=1, start=0.",
              variables: { remaining: 1, i: 0, current: "[2,2,2]", candidate: 2 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [2], state: "visited" },
                  { id: 2, value: "[2,2] rem=3", children: [3], state: "visited" },
                  { id: 3, value: "[2,2,2] rem=1", children: [], state: "active" },
                ],
                currentPath: [0, 1, 2, 3],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [17],
              shortLabel: "Prune: 2 > 1",
              explanation: "remaining=1. candidates[0]=2 > 1 — prune! No candidate fits. Backtrack from [2,2,2].",
              variables: { remaining: 1, current: "[2,2,2]", pruned: true },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [2], state: "visited" },
                  { id: 2, value: "[2,2] rem=3", children: [3], state: "visited" },
                  { id: 3, value: "[2,2,2] rem=1", children: [], state: "eliminated" },
                ],
                currentPath: [0, 1, 2],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [21, 16, 17, 18, 19],
              shortLabel: "Back to [2,2]: try 3, rem=0",
              explanation: "Backtrack to [2,2] rem=3. i=1: candidates[1]=3 <= 3. Add 3. remaining=0!",
              variables: { remaining: 0, i: 1, current: "[2,2,3]", candidate: 3 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [2], state: "visited" },
                  { id: 2, value: "[2,2] rem=3", children: [3, 4], state: "visited" },
                  { id: 3, value: "[2,2,2] rem=1", children: [], state: "eliminated" },
                  { id: 4, value: "[2,2,3] rem=0", children: [], state: "active" },
                ],
                currentPath: [0, 1, 2, 4],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12],
              shortLabel: "Found! [2,2,3]",
              explanation: "remaining == 0! Add [2,2,3] to results. First valid combination found!",
              variables: { current: "[2,2,3]", results: "[[2,2,3]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [2], state: "visited" },
                  { id: 2, value: "[2,2] rem=3", children: [3, 4], state: "visited" },
                  { id: 3, value: "[2,2,2] rem=1", children: [], state: "eliminated" },
                  { id: 4, value: "[2,2,3] rem=0", children: [], state: "found" },
                ],
                currentPath: [0, 1, 2, 4],
                results: [[2, 2, 3]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [21],
              shortLabel: "Backtrack, skip remaining for [2,2]",
              explanation: "Backtrack from [2,2,3]. Next candidates 6,7 > remaining=3 for [2,2], so prune. Backtrack to [2].",
              variables: { current: "[2]", remaining: 5 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [2, 5], state: "visited" },
                  { id: 2, value: "[2,2] rem=3", children: [3, 4], state: "visited" },
                  { id: 3, value: "[2,2,2] rem=1", children: [], state: "eliminated" },
                  { id: 4, value: "[2,2,3] rem=0", children: [], state: "found" },
                ],
                currentPath: [0, 1],
                results: [[2, 2, 3]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [16, 17, 18, 19],
              shortLabel: "Try [2,3], then [2,3,3] — prune",
              explanation: "From [2] rem=5: try 3 → [2,3] rem=2. Then try 2 again → 2<=2 → [2,3,2] but wait, we start at i=1 so try 3 → rem=-1 prune. All sub-branches pruned. Backtrack.",
              variables: { current: "[2,3]", remaining: 2 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [2, 5], state: "visited" },
                  { id: 2, value: "[2,2] rem=3", children: [3, 4], state: "visited" },
                  { id: 3, value: "[2,2,2] rem=1", children: [], state: "eliminated" },
                  { id: 4, value: "[2,2,3] rem=0", children: [], state: "found" },
                  { id: 5, value: "[2,3] rem=2", children: [], state: "eliminated" },
                ],
                currentPath: [0, 1],
                results: [[2, 2, 3]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [21, 16, 17],
              shortLabel: "Back to []: try 3,6 — prune, try 7",
              explanation: "Backtrack to [] rem=7. i=1: try 3 → [3] rem=4. [3,3] rem=1 prune. [3,6],[3,7] prune. Try 6 → [6] rem=1 prune. Now try 7.",
              variables: { current: "[]", remaining: 7 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1, 6, 7, 8], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [2, 5], state: "visited" },
                  { id: 2, value: "[2,2] rem=3", children: [3, 4], state: "visited" },
                  { id: 3, value: "[2,2,2] rem=1", children: [], state: "eliminated" },
                  { id: 4, value: "[2,2,3] rem=0", children: [], state: "found" },
                  { id: 5, value: "[2,3] rem=2", children: [], state: "eliminated" },
                  { id: 6, value: "[3] rem=4", children: [], state: "eliminated" },
                  { id: 7, value: "[6] rem=1", children: [], state: "eliminated" },
                ],
                currentPath: [0],
                results: [[2, 2, 3]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [11, 12],
              shortLabel: "Pick 7, rem=0 → Found! [7]",
              explanation: "i=3: candidates[3]=7 <= 7. Add 7. remaining = 7-7 = 0. Found [7]! Add to results.",
              variables: { current: "[7]", remaining: 0, results: "[[2,2,3],[7]]" },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1, 6, 7, 8], state: "visited" },
                  { id: 1, value: "[2] rem=5", children: [2, 5], state: "visited" },
                  { id: 2, value: "[2,2] rem=3", children: [3, 4], state: "visited" },
                  { id: 3, value: "[2,2,2] rem=1", children: [], state: "eliminated" },
                  { id: 4, value: "[2,2,3] rem=0", children: [], state: "found" },
                  { id: 5, value: "[2,3] rem=2", children: [], state: "eliminated" },
                  { id: 6, value: "[3] rem=4", children: [], state: "eliminated" },
                  { id: 7, value: "[6] rem=1", children: [], state: "eliminated" },
                  { id: 8, value: "[7] rem=0", children: [], state: "found" },
                ],
                currentPath: [0, 8],
                results: [[2, 2, 3], [7]],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [5],
              shortLabel: "Return [[2,2,3],[7]]",
              explanation: "All branches explored. Two valid combinations found: [2,2,3] and [7]. Both sum to 7.",
              variables: { answer: "[[2,2,3],[7]]", totalCombinations: 2 },
              dataStructure: {
                tree: [
                  { id: 0, value: "[] rem=7", children: [1, 6, 7, 8], state: "found" },
                  { id: 1, value: "[2] rem=5", children: [2, 5], state: "found" },
                  { id: 2, value: "[2,2] rem=3", children: [3, 4], state: "found" },
                  { id: 3, value: "[2,2,2] rem=1", children: [], state: "eliminated" },
                  { id: 4, value: "[2,2,3] rem=0", children: [], state: "found" },
                  { id: 5, value: "[2,3] rem=2", children: [], state: "eliminated" },
                  { id: 6, value: "[3] rem=4", children: [], state: "eliminated" },
                  { id: 7, value: "[6] rem=1", children: [], state: "eliminated" },
                  { id: 8, value: "[7] rem=0", children: [], state: "found" },
                ],
                currentPath: [],
                results: [[2, 2, 3], [7]],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Solution",
          description: "No combination of [2] can sum to 1",
          input: { candidates: [2], target: 1 },
          expectedOutput: "[]",
          commonMistake: "Forgetting to handle the case where no valid combination exists — return empty list, not null.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4],
              shortLabel: "Start: rem=1",
              explanation: "Candidates=[2], target=1. Start backtracking with remaining=1, start=0.",
              variables: { remaining: 1, start: 0, current: "[]", results: "[]" },
              dataStructure: {
                tree: [{ id: 0, value: "[] rem=1", children: [], state: "active" }],
                currentPath: [0],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [16, 17],
              shortLabel: "2 > 1, prune!",
              explanation: "i=0: candidates[0]=2 > remaining=1. Break immediately. No candidate fits!",
              variables: { remaining: 1, candidate: 2, pruned: true },
              dataStructure: {
                tree: [{ id: 0, value: "[] rem=1", children: [], state: "eliminated" }],
                currentPath: [0],
                results: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "Return []",
              explanation: "No valid combinations exist. The smallest candidate (2) is already larger than target (1).",
              variables: { answer: "[]", totalCombinations: 0 },
              dataStructure: {
                tree: [{ id: 0, value: "[] rem=1", children: [], state: "eliminated" }],
                currentPath: [],
                results: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ candidates, target }) {
        const steps = [];
        const results = [];
        const sorted = [...candidates].sort((a, b) => a - b);
        let treeNodes = [];
        let nodeId = 0;

        steps.push({
          stepId: 0,
          lineNumbers: [3, 4],
          shortLabel: "Sort & start",
          explanation: `Sort candidates to [${sorted.join(",")}]. Start with remaining=${target}.`,
          variables: { remaining: target, start: 0, current: "[]", results: "[]" },
          dataStructure: {
            tree: [{ id: 0, value: `[] rem=${target}`, children: [], state: "active" }],
            currentPath: [0],
            results: [],
          },
          delta: {},
          isAnswer: false,
        });

        treeNodes.push({ id: 0, value: `[] rem=${target}`, children: [], state: "active", parentId: null });
        nodeId = 1;

        function backtrack(remaining, start, current, parentId) {
          if (remaining === 0) {
            results.push([...current]);
            const node = treeNodes.find(n => n.id === parentId);
            if (node) node.state = "found";
            steps.push({
              stepId: steps.length,
              lineNumbers: [11, 12],
              shortLabel: `Found! [${current.join(",")}]`,
              explanation: `remaining == 0. [${current.join(",")}] sums to ${target}. Add to results.`,
              variables: { current: `[${current.join(",")}]`, results: `${results.length} found` },
              dataStructure: {
                tree: treeNodes.map(n => ({ ...n })),
                currentPath: getPath(parentId),
                results: results.map(r => [...r]),
              },
              delta: {},
              isAnswer: false,
            });
            return;
          }

          for (let i = start; i < sorted.length; i++) {
            if (sorted[i] > remaining) {
              steps.push({
                stepId: steps.length,
                lineNumbers: [17],
                shortLabel: `${sorted[i]} > ${remaining}, prune`,
                explanation: `candidates[${i}]=${sorted[i]} > remaining=${remaining}. Prune this and all larger candidates.`,
                variables: { remaining, candidate: sorted[i], pruned: true },
                dataStructure: {
                  tree: treeNodes.map(n => ({ ...n })),
                  currentPath: getPath(parentId),
                  results: results.map(r => [...r]),
                },
                delta: {},
                isAnswer: false,
              });
              break;
            }

            current.push(sorted[i]);
            const myId = nodeId++;
            const newRem = remaining - sorted[i];
            treeNodes.push({
              id: myId,
              value: `[${current.join(",")}] rem=${newRem}`,
              children: [],
              state: "active",
              parentId,
            });
            const parent = treeNodes.find(n => n.id === parentId);
            if (parent) parent.children.push(myId);

            steps.push({
              stepId: steps.length,
              lineNumbers: [18, 19],
              shortLabel: `Pick ${sorted[i]}, rem=${newRem}`,
              explanation: `Add ${sorted[i]}. current=[${current.join(",")}]. remaining=${newRem}.`,
              variables: { i, current: `[${current.join(",")}]`, remaining: newRem },
              dataStructure: {
                tree: treeNodes.map(n => ({ ...n })),
                currentPath: getPath(myId),
                results: results.map(r => [...r]),
              },
              delta: {},
              isAnswer: false,
            });

            backtrack(newRem, i, current, myId);

            current.pop();
            const nd = treeNodes.find(n => n.id === myId);
            if (nd && nd.state === "active") nd.state = "eliminated";
          }
        }

        function getPath(id) {
          const path = [];
          let cur = id;
          while (cur !== null && cur !== undefined) {
            path.unshift(cur);
            const node = treeNodes.find(n => n.id === cur);
            cur = node ? node.parentId : null;
          }
          return path;
        }

        backtrack(target, 0, [], 0);

        steps.push({
          stepId: steps.length,
          lineNumbers: [5],
          shortLabel: `Return ${results.length} combinations`,
          explanation: `Backtracking complete. Found ${results.length} combination(s) summing to ${target}.`,
          variables: { totalCombinations: results.length },
          dataStructure: {
            tree: treeNodes.map(n => ({ ...n })),
            currentPath: [],
            results: results.map(r => [...r]),
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: null,
    optimal: { time: "O(n^(t/m))", space: "O(t/m)", explanation: "t=target, m=min candidate. Recursion depth is at most t/m. Branching factor is n.", tradeoff: "Pruning with sorted candidates dramatically reduces actual work" },
  },

  interviewTips: [
    "Clarify: 'Can I reuse the same number?' — Yes, unlimited times.",
    "Sort first and break early when candidate > remaining — huge pruning.",
    "Explain: 'I start at index i, not i+1, to allow reuse of the same candidate.'",
    "Mention the difference from Combination Sum II: here elements are distinct and reusable; there they may have duplicates and each is used at most once.",
    "State complexity: O(n^(t/m)) where t=target, m=min candidate — the tree can be deep.",
    "Follow-up: If asked to return just the count, this becomes a DP coin change problem.",
  ],

  relatedProblems: ["combination-sum-ii", "subsets", "coin-change"],
};
