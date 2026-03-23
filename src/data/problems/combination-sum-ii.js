export const combinationSumII = {
  id: 76,
  slug: "combination-sum-ii",
  title: "Combination Sum II",
  difficulty: "Medium",
  topic: "backtracking",
  topicLabel: "Backtracking",
  neetcodeNumber: 76,
  artifactType: "Backtracking",
  companies: ["Amazon", "Google", "Microsoft", "Bloomberg", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/combination-sum-ii/",

  pattern: "Sort + Backtracking with Duplicate Skipping",
  patternExplanation: `When generating combinations from a list with duplicates where each element
    can only be used once, sort first, then backtrack. At each level of the decision tree, skip
    elements that are the same as the previous sibling — this prevents duplicate combinations
    while still allowing the same value to appear multiple times from different indices.`,

  intuition: {
    coreInsight: `The challenge isn't the backtracking itself — it's avoiding duplicate combinations
      when the input has repeated values. By sorting the candidates first, all duplicates are adjacent.
      Then at each branching point, we skip a candidate if it equals the previous candidate at the
      same level. This ensures we never generate the same combination twice, because we only use the
      FIRST occurrence of each value at each decision point.`,

    mentalModel: `Imagine picking items from a sorted shelf where some items are identical. At each
      decision point, you scan left to right. If you pick item X, you recurse deeper. When you come
      back and see another X immediately to the right, you skip it — because picking THIS X would
      generate the exact same sub-combinations you already explored with the PREVIOUS X. The sort
      groups duplicates together; the skip ensures you only branch on each unique value once per level.`,

    whyNaiveFails: `Without duplicate skipping, input [1,1,2] with target 3 would produce [1,2]
      twice — once using the first 1 and once using the second 1. Using a HashSet to deduplicate
      results works but wastes time generating duplicates only to discard them. The sorted + skip
      approach prevents duplicates from ever being generated, giving a clean O(2^n) solution.`,

    keyObservation: `The skip condition is: if i > start && candidates[i] == candidates[i-1], skip.
      The "i > start" part is crucial — it means we only skip when we're trying a SIBLING, not when
      we're going deeper. The first occurrence at each level is always explored; only subsequent
      identical siblings are skipped.`,
  },

  problem: `Given a collection of candidate numbers (candidates) and a target number (target),
    find all unique combinations in candidates where the candidate numbers sum to target.
    Each number in candidates may only be used once in the combination. Note: The solution set
    must not contain duplicate combinations.`,

  examples: [
    { input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]", explanation: "All unique combinations that sum to 8." },
    { input: "candidates = [2,5,2,1,2], target = 5", output: "[[1,2,2],[5]]", explanation: "1+2+2=5 and 5=5 are the only unique combinations." },
  ],

  constraints: [
    "1 <= candidates.length <= 100",
    "1 <= candidates[i] <= 50",
    "1 <= target <= 30",
  ],

  approaches: {
    brute: {
      label: "Backtrack + HashSet Dedup",
      tier: "brute",
      timeComplexity: "O(2^n * n)",
      spaceComplexity: "O(2^n * n)",
      idea: "Generate all subsets that sum to target via backtracking. Use a HashSet of sorted tuples to filter duplicate combinations.",

      javaCode: `public List<List<Integer>> combinationSum2(int[] candidates, int target) {
    Arrays.sort(candidates);
    Set<List<Integer>> resultSet = new HashSet<>();
    backtrack(candidates, target, 0, new ArrayList<>(), resultSet);
    return new ArrayList<>(resultSet);
}

void backtrack(int[] cand, int remain, int start, List<Integer> path, Set<List<Integer>> res) {
    if (remain == 0) {
        res.add(new ArrayList<>(path));
        return;
    }
    for (int i = start; i < cand.length; i++) {
        if (cand[i] > remain) break;
        path.add(cand[i]);
        backtrack(cand, remain - cand[i], i + 1, path, res);
        path.remove(path.size() - 1);
    }
}`,

      cppCode: `vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    set<vector<int>> resultSet;
    vector<int> path;
    backtrack(candidates, target, 0, path, resultSet);
    return vector<vector<int>>(resultSet.begin(), resultSet.end());
}

void backtrack(vector<int>& cand, int remain, int start, vector<int>& path, set<vector<int>>& res) {
    if (remain == 0) {
        res.insert(path);
        return;
    }
    for (int i = start; i < cand.size(); i++) {
        if (cand[i] > remain) break;
        path.push_back(cand[i]);
        backtrack(cand, remain - cand[i], i + 1, path, res);
        path.pop_back();
    }
}`,

      pythonCode: `def combinationSum2(candidates, target):
    candidates.sort()
    result_set = set()
    def backtrack(remain, start, path):
        if remain == 0:
            result_set.add(tuple(path))
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remain:
                break
            backtrack(remain - candidates[i], i + 1, path + [candidates[i]])
    backtrack(target, 0, [])
    return [list(c) for c in result_set]`,

      lineAnnotations: {
        2: "Sort to group duplicates and enable early termination",
        3: "HashSet stores results — duplicates auto-eliminated",
        8: "If remaining sum is 0, we found a valid combination",
        12: "Early termination: sorted, so all future candidates too large",
        14: "Recurse with i+1: each element used at most once",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { candidates: [2, 5, 2, 1, 2], target: 5 },
          expectedOutput: "[[1,2,2],[5]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort candidates",
              explanation: "Sort candidates: [2,5,2,1,2] → [1,2,2,2,5]. Sorting groups duplicates together and allows early termination when a candidate exceeds the remaining target.",
              variables: { candidates: "[1,2,2,2,5]", target: 5, path: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 14],
              shortLabel: "Pick 1, recurse",
              explanation: "Start backtracking at index 0. Pick candidates[0]=1. Remaining = 5-1 = 4. Recurse from index 1.",
              variables: { path: "[1]", remain: 4, i: 0, start: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [14],
              shortLabel: "Pick 2, pick 2 → [1,2,2] sum=5 ✓",
              explanation: "From [1], pick 2 at index 1 (remain=2), then pick 2 at index 2 (remain=0). Path [1,2,2] sums to 5. Add to result set!",
              variables: { path: "[1,2,2]", remain: 0, result: "[[1,2,2]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "default", 4: "default" },
                pointers: [],
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [14],
              shortLabel: "Try [5] → sum=5 ✓",
              explanation: "Backtrack all the way. Try candidates[4]=5 at the top level. 5=target. Path [5] sums to 5. Add to result set!",
              variables: { path: "[5]", remain: 0, result: "[[1,2,2],[5]]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "found" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5],
              shortLabel: "Return [[1,2,2],[5]]",
              explanation: "All branches explored. The HashSet contains [[1,2,2],[5]]. Note: duplicates like picking the second or third '2' for [1,2,2] were filtered by the set. Return result.",
              variables: { answer: "[[1,2,2],[5]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "default", 4: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ candidates, target }) {
        const sorted = [...candidates].sort((a, b) => a - b);
        const steps = [];
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Sort candidates",
          explanation: `Sort candidates: [${candidates}] → [${sorted}].`,
          variables: { candidates: `[${sorted}]`, target, path: "[]" },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: false,
        });
        const results = [];
        function bt(remain, start, path) {
          if (remain === 0) {
            results.push([...path]);
            return;
          }
          for (let i = start; i < sorted.length; i++) {
            if (sorted[i] > remain) break;
            path.push(sorted[i]);
            bt(remain - sorted[i], i + 1, path);
            path.pop();
          }
        }
        bt(target, 0, []);
        const unique = [...new Set(results.map(r => JSON.stringify(r)))].map(s => JSON.parse(s));
        steps.push({
          stepId: 1, lineNumbers: [5],
          shortLabel: `Return ${JSON.stringify(unique)}`,
          explanation: `Found ${unique.length} unique combinations summing to ${target}.`,
          variables: { answer: JSON.stringify(unique) },
          dataStructure: { arrayStates: {}, pointers: [] },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sort + Skip Duplicates",
      tier: "optimal",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
      idea: `Sort candidates. Backtrack with a loop from start to end. At each level, skip
        candidates[i] if i > start and candidates[i] == candidates[i-1]. This prevents
        duplicate combinations without needing a HashSet.`,

      javaCode: `public List<List<Integer>> combinationSum2(int[] candidates, int target) {
    Arrays.sort(candidates);
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), result);
    return result;
}

void backtrack(int[] cand, int remain, int start, List<Integer> path, List<List<Integer>> res) {
    if (remain == 0) {
        res.add(new ArrayList<>(path));
        return;
    }
    for (int i = start; i < cand.length; i++) {
        if (i > start && cand[i] == cand[i - 1]) continue;
        if (cand[i] > remain) break;
        path.add(cand[i]);
        backtrack(cand, remain - cand[i], i + 1, path, res);
        path.remove(path.size() - 1);
    }
}`,

      cppCode: `vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> result;
    vector<int> path;
    backtrack(candidates, target, 0, path, result);
    return result;
}

void backtrack(vector<int>& cand, int remain, int start, vector<int>& path, vector<vector<int>>& res) {
    if (remain == 0) {
        res.push_back(path);
        return;
    }
    for (int i = start; i < cand.size(); i++) {
        if (i > start && cand[i] == cand[i - 1]) continue;
        if (cand[i] > remain) break;
        path.push_back(cand[i]);
        backtrack(cand, remain - cand[i], i + 1, path, res);
        path.pop_back();
    }
}`,

      pythonCode: `def combinationSum2(candidates, target):
    candidates.sort()
    result = []

    def backtrack(remain, start, path):
        if remain == 0:
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            if candidates[i] > remain:
                break
            path.append(candidates[i])
            backtrack(remain - candidates[i], i + 1, path)
            path.pop()

    backtrack(target, 0, [])
    return result`,

      lineAnnotations: {
        2: "Sort so duplicates are adjacent — key to the skip logic",
        8: "Base case: remaining is 0, we found a valid combination",
        9: "Add a COPY of the current path to results",
        12: "Loop through candidates starting from 'start'",
        13: "SKIP DUPLICATES: if same value as previous sibling AND not the first at this level",
        14: "Pruning: sorted array, so if current exceeds remain, all future will too",
        15: "Choose: add candidate to path",
        16: "Recurse: move to i+1 (each element used once), reduce remaining",
        17: "Unchoose: remove last element (backtrack)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Input with duplicates — demonstrates the skip logic in action",
          input: { candidates: [2, 5, 2, 1, 2], target: 5 },
          expectedOutput: "[[1,2,2],[5]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort: [1,2,2,2,5]",
              explanation: "Sort candidates: [2,5,2,1,2] → [1,2,2,2,5]. Now duplicates (the three 2's) are adjacent, enabling our skip logic.",
              variables: { candidates: "[1,2,2,2,5]", target: 5, path: "[]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 15],
              shortLabel: "Pick cand[0]=1",
              explanation: "Level 0, start=0. Pick candidates[0]=1. Path=[1], remain=5-1=4. Recurse from index 1.",
              variables: { path: "[1]", remain: 4, i: 0, start: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 15],
              shortLabel: "Pick cand[1]=2",
              explanation: "Level 1, start=1. Pick candidates[1]=2. Path=[1,2], remain=4-2=2. Recurse from index 2.",
              variables: { path: "[1,2]", remain: 2, i: 1, start: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 15, 8, 9],
              shortLabel: "Pick cand[2]=2 → [1,2,2] sum=5 ✓",
              explanation: "Level 2, start=2. Pick candidates[2]=2. Path=[1,2,2], remain=2-2=0. Remain is 0 — found a valid combination! Add [1,2,2] to result.",
              variables: { path: "[1,2,2]", remain: 0, result: "[[1,2,2]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "default", 4: "default" },
                pointers: [],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [17],
              shortLabel: "Backtrack: pop 2",
              explanation: "Backtrack from [1,2,2]. Pop last element. Path=[1,2], remain=2. Continue loop at level 2 from i=3.",
              variables: { path: "[1,2]", remain: 2, i: 3, start: 2 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "visited", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13],
              shortLabel: "Skip cand[3]=2 (duplicate!)",
              explanation: "i=3, start=2. candidates[3]=2 == candidates[2]=2 AND i > start. SKIP! If we picked this 2, we'd generate the exact same sub-combinations we already explored with the previous 2. This is the core deduplication logic.",
              variables: { path: "[1,2]", remain: 2, i: 3, "cand[i]": 2, "cand[i-1]": 2, skip: true },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "visited", 3: "eliminated", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "active" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14],
              shortLabel: "cand[4]=5 > remain=2 → break",
              explanation: "i=4. candidates[4]=5 > remain=2. Since array is sorted, no more candidates can work. Break out of loop.",
              variables: { path: "[1,2]", remain: 2, i: 4, "cand[i]": 5 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "visited", 3: "eliminated", 4: "eliminated" },
                pointers: [{ name: "i", index: 4, color: "active" }],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [17],
              shortLabel: "Backtrack: pop 2, try next at level 1",
              explanation: "Backtrack from [1,2]. Pop 2. Path=[1], remain=4. Continue at level 1 from i=2.",
              variables: { path: "[1]", remain: 4, i: 2, start: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [13],
              shortLabel: "Skip cand[2]=2 (dup at level 1)",
              explanation: "i=2, start=1. candidates[2]=2 == candidates[1]=2 AND i > start. SKIP again! We already explored all combinations starting with [1,2,...]. Picking another 2 at this same level would be redundant.",
              variables: { path: "[1]", remain: 4, i: 2, skip: true },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "eliminated", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "active" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [13],
              shortLabel: "Skip cand[3]=2 (dup at level 1)",
              explanation: "i=3. candidates[3]=2 == candidates[2]=2 AND i > start. Skip again. All three 2's produce identical branches at this level.",
              variables: { path: "[1]", remain: 4, i: 3, skip: true },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "eliminated", 3: "eliminated", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "active" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [14],
              shortLabel: "cand[4]=5 > remain=4 → break",
              explanation: "i=4. candidates[4]=5 > remain=4. Break. No more candidates for path [1,...].",
              variables: { path: "[1]", remain: 4, i: 4 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "eliminated", 3: "eliminated", 4: "eliminated" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [17, 12, 15],
              shortLabel: "Backtrack to root, pick cand[1]=2",
              explanation: "Backtrack from [1]. Pop 1. Path=[], remain=5. At level 0, move to i=1. Pick candidates[1]=2. Path=[2], remain=3.",
              variables: { path: "[2]", remain: 3, i: 1, start: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [12, 15, 14],
              shortLabel: "[2,2] remain=1, [2,2,2] > remain → no",
              explanation: "From [2], pick 2 at idx 2 → [2,2], remain=1. Then try idx 3: cand[3]=2 > 1? No, 2>1 yes — break. Backtrack. From [2], skip idx 3 (dup). Try idx 4: cand[4]=5 > 3 → break. No valid combos starting with [2,...].",
              variables: { path: "[2]", remain: 3, result: "[[1,2,2]]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 13,
              lineNumbers: [13],
              shortLabel: "Skip cand[2]=2 and cand[3]=2 at root",
              explanation: "Back at root level. i=2 and i=3 are both 2, same as cand[1]=2. Skip both — we already explored all combinations starting with 2.",
              variables: { path: "[]", remain: 5, i: "2,3", skip: true },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "eliminated", 3: "eliminated", 4: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 14,
              lineNumbers: [12, 15, 8, 9],
              shortLabel: "Pick cand[4]=5 → [5] sum=5 ✓",
              explanation: "At root level, i=4. Pick candidates[4]=5. Path=[5], remain=5-5=0. Found another valid combination! Add [5] to result.",
              variables: { path: "[5]", remain: 0, result: "[[1,2,2],[5]]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "eliminated", 3: "eliminated", 4: "found" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 15,
              lineNumbers: [4],
              shortLabel: "Return [[1,2,2],[5]]",
              explanation: "All branches exhausted. Result = [[1,2,2],[5]]. Two unique combinations found — no duplicates generated, thanks to the sort + skip approach. No HashSet needed!",
              variables: { answer: "[[1,2,2],[5]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "default", 4: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Same Values",
          description: "Input [1,1,1,1] target 2 — heavy deduplication needed",
          input: { candidates: [1, 1, 1, 1], target: 2 },
          expectedOutput: "[[1,1]]",
          commonMistake: "Without the skip condition, you'd generate [1,1] four times: using indices (0,1), (0,2), (0,3), (1,2), (1,3), (2,3) — six pairs total, all producing the same [1,1].",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort: [1,1,1,1]",
              explanation: "Already sorted. All four elements are 1. The skip logic should ensure we only generate [1,1] once.",
              variables: { candidates: "[1,1,1,1]", target: 2, path: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 15],
              shortLabel: "Pick cand[0]=1",
              explanation: "Level 0, start=0. Pick first 1. Path=[1], remain=1. Recurse from index 1.",
              variables: { path: "[1]", remain: 1, i: 0, start: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 15, 8, 9],
              shortLabel: "Pick cand[1]=1 → [1,1] sum=2 ✓",
              explanation: "Level 1, start=1. Pick candidates[1]=1. Path=[1,1], remain=0. Found valid combination [1,1]! Add to result.",
              variables: { path: "[1,1]", remain: 0, result: "[[1,1]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [17, 13],
              shortLabel: "Backtrack, skip cand[2]=1 and cand[3]=1",
              explanation: "Backtrack to [1]. At level 1, i=2: cand[2]=1 == cand[1]=1 and i>start → skip. i=3: same skip. No more candidates at this level.",
              variables: { path: "[1]", remain: 1, skip: "indices 2,3" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "eliminated", 3: "eliminated" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [17, 13],
              shortLabel: "Backtrack to root, skip all remaining 1's",
              explanation: "Backtrack from [1]. At level 0, i=1: cand[1]=1 == cand[0]=1 → skip. i=2: skip. i=3: skip. All remaining 1's are duplicates of the first. Done!",
              variables: { path: "[]", remain: 2, skip: "indices 1,2,3" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "eliminated", 2: "eliminated", 3: "eliminated" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4],
              shortLabel: "Return [[1,1]]",
              explanation: "All branches explored. Only one unique combination [1,1]. Without skip logic, we'd have generated it 6 times (C(4,2) = 6 ways to pick 2 from 4 identical 1's). The skip eliminated 5 redundant branches.",
              variables: { answer: "[[1,1]]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default" },
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
          description: "No combination sums to target — tests full exhaustion",
          input: { candidates: [3, 5, 7], target: 2 },
          expectedOutput: "[]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Sort: [3,5,7]",
              explanation: "Already sorted. Target is 2 but smallest candidate is 3. No combination can work.",
              variables: { candidates: "[3,5,7]", target: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [14],
              shortLabel: "cand[0]=3 > remain=2 → break",
              explanation: "First candidate 3 already exceeds target 2. Since array is sorted, all candidates are too large. Break immediately. No valid combinations exist.",
              variables: { path: "[]", remain: 2, "cand[0]": 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated" },
                pointers: [{ name: "i", index: 0, color: "active" }],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4],
              shortLabel: "Return []",
              explanation: "No valid combinations found. Return empty list. The sorted + pruning approach terminates almost immediately here.",
              variables: { answer: "[]" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ candidates, target }) {
        const sorted = [...candidates].sort((a, b) => a - b);
        const steps = [];
        const results = [];

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `Sort: [${sorted}]`,
          explanation: `Sort candidates: [${candidates}] → [${sorted}].`,
          variables: { candidates: `[${sorted}]`, target, path: "[]", result: "[]" },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: false,
        });

        function backtrack(remain, start, path) {
          if (remain === 0) {
            results.push([...path]);
            steps.push({
              stepId: steps.length, lineNumbers: [8, 9],
              shortLabel: `Found [${path}]`,
              explanation: `Path [${path}] sums to ${target}. Add to results.`,
              variables: { path: `[${path}]`, remain: 0, result: JSON.stringify(results) },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, i) => [i, path.includes(sorted[i]) ? "found" : "default"])),
                pointers: [],
              },
              delta: {}, isAnswer: false,
            });
            return;
          }

          for (let i = start; i < sorted.length; i++) {
            if (i > start && sorted[i] === sorted[i - 1]) {
              steps.push({
                stepId: steps.length, lineNumbers: [13],
                shortLabel: `Skip dup ${sorted[i]}`,
                explanation: `candidates[${i}]=${sorted[i]} equals candidates[${i - 1}]=${sorted[i - 1]} and i>${start}. Skip duplicate.`,
                variables: { path: `[${path}]`, remain, i, skip: true },
                dataStructure: {
                  arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j === i ? "eliminated" : "default"])),
                  pointers: [{ name: "i", index: i, color: "active" }],
                },
                delta: {}, isAnswer: false,
              });
              continue;
            }
            if (sorted[i] > remain) {
              steps.push({
                stepId: steps.length, lineNumbers: [14],
                shortLabel: `${sorted[i]} > ${remain} → break`,
                explanation: `candidates[${i}]=${sorted[i]} exceeds remaining ${remain}. All future candidates too large. Break.`,
                variables: { path: `[${path}]`, remain, i, "cand[i]": sorted[i] },
                dataStructure: {
                  arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j >= i ? "eliminated" : "default"])),
                  pointers: [{ name: "i", index: i, color: "active" }],
                },
                delta: {}, isAnswer: false,
              });
              break;
            }

            path.push(sorted[i]);
            steps.push({
              stepId: steps.length, lineNumbers: [15, 16],
              shortLabel: `Pick ${sorted[i]}`,
              explanation: `Pick candidates[${i}]=${sorted[i]}. Path=[${path}], remain=${remain - sorted[i]}.`,
              variables: { path: `[${path}]`, remain: remain - sorted[i], i },
              dataStructure: {
                arrayStates: Object.fromEntries(sorted.map((_, j) => [j, j === i ? "active" : "default"])),
                pointers: [{ name: "i", index: i, color: "pointer" }],
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });

            backtrack(remain - sorted[i], i + 1, path);
            path.pop();
          }
        }

        backtrack(target, 0, []);

        steps.push({
          stepId: steps.length, lineNumbers: [4],
          shortLabel: `Return ${JSON.stringify(results)}`,
          explanation: `All branches explored. ${results.length} unique combination(s) found.`,
          variables: { answer: JSON.stringify(results) },
          dataStructure: {
            arrayStates: Object.fromEntries(sorted.map((_, i) => [i, "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(2^n * n)", space: "O(2^n * n)", explanation: "Generate all subsets; HashSet stores and deduplicates them, each up to length n" },
    optimal: { time: "O(2^n)", space: "O(n)", explanation: "Each element is either included or not (2^n combinations max). Recursion depth is at most n. No HashSet needed.", tradeoff: "The sort + skip approach avoids generating duplicates entirely, saving the O(n) comparison cost per duplicate and the O(2^n * n) HashSet storage." },
  },

  interviewTips: [
    "Start by clarifying: 'Each element can only be used once, but duplicates exist in the input — so we need unique combinations.'",
    "Explain why sorting is essential: it groups duplicates and enables both the skip logic and early termination.",
    "Walk through the skip condition: 'i > start && cand[i] == cand[i-1]'. Emphasize that i > start means we only skip siblings, not the first occurrence.",
    "Contrast with Combination Sum I: there, elements can be reused (recurse with i, not i+1) and there are no duplicates in input.",
    "Mention the pruning: 'if cand[i] > remain, break' — this is O(1) early termination thanks to sorting.",
    "Common follow-up: 'What if we want combinations of exactly size k?' — add a length check to the base case.",
  ],

  relatedProblems: ["combination-sum", "subsets-ii", "permutations"],
};
