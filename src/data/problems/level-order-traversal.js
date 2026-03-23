export const levelOrderTraversal = {
  id: 53,
  slug: "level-order-traversal",
  title: "Binary Tree Level Order Traversal",
  difficulty: "Medium",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 53,
  artifactType: "BST",
  companies: ["Amazon", "Meta", "Microsoft", "Bloomberg", "Google"],
  leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/",

  pattern: "BFS with Level Grouping",
  patternExplanation: `Use a queue for BFS. At each level, process exactly queue.size() nodes
    (the entire current level), collecting their values, and enqueue their children for the next level.`,

  intuition: {
    coreInsight: `BFS naturally visits nodes level by level. The key insight is that at the start
      of each level, the queue contains exactly all nodes of that level. By recording queue.size()
      before processing, we know how many nodes belong to the current level and can group them.`,

    mentalModel: `Imagine a building where each floor has rooms. You explore floor by floor,
      left to right. When you arrive on a floor, you note how many rooms are on it (queue size).
      You visit each room, record its number, and for each room, add its children (rooms on the
      floor below) to your todo list. After visiting all rooms on this floor, everything in your
      todo list is the next floor.`,

    whyNaiveFails: `DFS (preorder/inorder/postorder) visits nodes in depth-first order, mixing
      levels. You could use DFS with a depth parameter to group by level, but BFS is the more
      natural and standard approach for level-order traversal.`,

    keyObservation: `The queue size at the start of each iteration tells you exactly how many
      nodes are at the current level. This is the separator between levels — process that many
      nodes, then everything remaining in the queue is the next level.`,
  },

  problem: `Given the root of a binary tree, return the level order traversal of its nodes'
    values. (i.e., from left to right, level by level).`,

  examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", explanation: "Level 0: [3], Level 1: [9, 20], Level 2: [15, 7]." },
    { input: "root = [1]", output: "[[1]]", explanation: "Single node at level 0." },
    { input: "root = []", output: "[]", explanation: "Empty tree." },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [0, 2000]",
    "-1000 <= Node.val <= 1000",
  ],

  approaches: {
    brute: {
      label: "DFS with Depth Tracking",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "DFS through the tree, passing depth as a parameter. Append each node's value to the list at its depth index.",

      javaCode: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    dfs(root, 0, result);
    return result;
}

void dfs(TreeNode node, int depth, List<List<Integer>> result) {
    if (node == null) return;
    if (depth == result.size()) result.add(new ArrayList<>());
    result.get(depth).add(node.val);
    dfs(node.left, depth + 1, result);
    dfs(node.right, depth + 1, result);
}`,

      cppCode: `vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    dfs(root, 0, result);
    return result;
}

void dfs(TreeNode* node, int depth, vector<vector<int>>& result) {
    if (!node) return;
    if (depth == result.size()) result.push_back({});
    result[depth].push_back(node->val);
    dfs(node->left, depth + 1, result);
    dfs(node->right, depth + 1, result);
}`,

      pythonCode: `def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
    result = []
    def dfs(node, depth):
        if not node:
            return
        if depth == len(result):
            result.append([])
        result[depth].append(node.val)
        dfs(node.left, depth + 1)
        dfs(node.right, depth + 1)
    dfs(root, 0)
    return result`,

      lineAnnotations: {
        7: "Base case: null node",
        8: "New depth? Create a new list for this level",
        9: "Add current node's value to its level's list",
        10: "Recurse left (depth + 1)",
        11: "Recurse right (depth + 1)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { root: [3, 9, 20, null, null, 15, 7] },
          expectedOutput: "[[3],[9,20],[15,7]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start DFS from root",
              explanation: "Begin DFS at root (3), depth 0. result = [].",
              variables: { depth: 0, "node.val": 3, result: "[]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "active", depth: 0 }, 2: { val: 9, left: null, right: null, state: "default", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "default", depth: 1 }, 4: { val: 15, left: null, right: null, state: "default", depth: 2 }, 5: { val: 7, left: null, right: null, state: "default", depth: 2 } },
                callStack: ["dfs(3, 0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9],
              shortLabel: "Add 3 to level 0",
              explanation: "depth 0 = result.size(). Create level 0 list. Add 3. result = [[3]].",
              variables: { depth: 0, "node.val": 3, result: "[[3]]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "default", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "default", depth: 1 }, 4: { val: 15, left: null, right: null, state: "default", depth: 2 }, 5: { val: 7, left: null, right: null, state: "default", depth: 2 } },
                callStack: ["dfs(3, 0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10],
              shortLabel: "DFS left→9, Add to level 1",
              explanation: "DFS to left child 9 at depth 1. Create level 1 list. Add 9. result = [[3],[9]].",
              variables: { depth: 1, "node.val": 9, result: "[[3],[9]]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "active", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "default", depth: 1 }, 4: { val: 15, left: null, right: null, state: "default", depth: 2 }, 5: { val: 7, left: null, right: null, state: "default", depth: 2 } },
                callStack: ["dfs(3, 0)", "dfs(9, 1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9, 11],
              shortLabel: "DFS right→20, Add to level 1",
              explanation: "Back to root, DFS to right child 20 at depth 1. Add 20 to level 1. result = [[3],[9,20]].",
              variables: { depth: 1, "node.val": 20, result: "[[3],[9,20]]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "visited", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "active", depth: 1 }, 4: { val: 15, left: null, right: null, state: "default", depth: 2 }, 5: { val: 7, left: null, right: null, state: "default", depth: 2 } },
                callStack: ["dfs(3, 0)", "dfs(20, 1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10, 11],
              shortLabel: "Add 15 and 7 to level 2",
              explanation: "DFS from 20: left child 15 at depth 2, right child 7 at depth 2. result = [[3],[9,20],[15,7]].",
              variables: { result: "[[3],[9,20],[15,7]]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "visited", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "visited", depth: 1 }, 4: { val: 15, left: null, right: null, state: "found", depth: 2 }, 5: { val: 7, left: null, right: null, state: "found", depth: 2 } },
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root }) {
        const steps = [];
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "DFS approach",
          explanation: "Using DFS with depth tracking to group nodes by level.",
          variables: {},
          dataStructure: { treeNodes: {}, callStack: [] },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "BFS with Queue",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Use a queue. At each level, record queue size, process that many nodes (adding their
        children), and collect values into a level list.`,

      javaCode: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        result.add(level);
    }

    return result;
}`,

      cppCode: `vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> level;

        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }

        result.push_back(level);
    }

    return result;
}`,

      pythonCode: `def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []
    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result`,

      lineAnnotations: {
        3: "Handle empty tree",
        4: "Initialize queue with root",
        7: "Process levels while queue has nodes",
        8: "Record how many nodes are at this level",
        11: "Process exactly levelSize nodes (this level only)",
        12: "Dequeue front node",
        13: "Add its value to current level's list",
        14: "Enqueue left child for next level",
        15: "Enqueue right child for next level",
        18: "Add completed level to result",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Three-level tree [3,9,20,null,null,15,7]",
          input: { root: [3, 9, 20, null, null, 15, 7] },
          expectedOutput: "[[3],[9,20],[15,7]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5],
              shortLabel: "Init: queue=[3]",
              explanation: "Start BFS. Enqueue root (3). Queue: [3].",
              variables: { queue: "[3]", result: "[]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "queued", depth: 0 }, 2: { val: 9, left: null, right: null, state: "default", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "default", depth: 1 }, 4: { val: 15, left: null, right: null, state: "default", depth: 2 }, 5: { val: 7, left: null, right: null, state: "default", depth: 2 } },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 11, 12, 13, 14, 15],
              shortLabel: "Level 0: dequeue 3, enqueue 9, 20",
              explanation: "levelSize=1. Dequeue 3, add to level. Enqueue left child 9 and right child 20. Level 0 = [3]. Queue: [9, 20].",
              variables: { levelSize: 1, level: "[3]", queue: "[9, 20]", result: "[[3]]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "queued", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "queued", depth: 1 }, 4: { val: 15, left: null, right: null, state: "default", depth: 2 }, 5: { val: 7, left: null, right: null, state: "default", depth: 2 } },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 11, 12, 13, 14, 15],
              shortLabel: "Level 1: dequeue 9, 20, enqueue 15, 7",
              explanation: "levelSize=2. Dequeue 9 (no children) and 20 (children 15, 7). Level 1 = [9, 20]. Queue: [15, 7].",
              variables: { levelSize: 2, level: "[9, 20]", queue: "[15, 7]", result: "[[3],[9,20]]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "visited", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "visited", depth: 1 }, 4: { val: 15, left: null, right: null, state: "queued", depth: 2 }, 5: { val: 7, left: null, right: null, state: "queued", depth: 2 } },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8, 11, 12, 13, 18],
              shortLabel: "Level 2: dequeue 15, 7",
              explanation: "levelSize=2. Dequeue 15 and 7 (both leaves). Level 2 = [15, 7]. Queue empty.",
              variables: { levelSize: 2, level: "[15, 7]", queue: "[]", result: "[[3],[9,20],[15,7]]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "visited", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "visited", depth: 1 }, 4: { val: 15, left: null, right: null, state: "found", depth: 2 }, 5: { val: 7, left: null, right: null, state: "found", depth: 2 } },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [21],
              shortLabel: "Return [[3],[9,20],[15,7]]",
              explanation: "Queue empty. All levels processed. Return [[3],[9,20],[15,7]].",
              variables: { answer: "[[3],[9,20],[15,7]]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "found", depth: 0 }, 2: { val: 9, left: null, right: null, state: "found", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "found", depth: 1 }, 4: { val: 15, left: null, right: null, state: "found", depth: 2 }, 5: { val: 7, left: null, right: null, state: "found", depth: 2 } },
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Node",
          description: "Tree with only root",
          input: { root: [1] },
          expectedOutput: "[[1]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5],
              shortLabel: "Init: queue=[1]",
              explanation: "Enqueue root (1). Queue: [1].",
              variables: { queue: "[1]" },
              dataStructure: { treeNodes: { 1: { val: 1, left: null, right: null, state: "queued", depth: 0 } }, callStack: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 11, 12, 13, 18],
              shortLabel: "Level 0: [1]",
              explanation: "Dequeue 1. No children. Level 0 = [1]. Queue empty.",
              variables: { result: "[[1]]" },
              dataStructure: { treeNodes: { 1: { val: 1, left: null, right: null, state: "found", depth: 0 } }, callStack: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [21],
              shortLabel: "Return [[1]]",
              explanation: "Done. Return [[1]].",
              variables: { answer: "[[1]]" },
              dataStructure: { treeNodes: { 1: { val: 1, left: null, right: null, state: "found", depth: 0 } }, callStack: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root }) {
        const steps = [];
        if (!root || root.length === 0) {
          steps.push({ stepId: 0, lineNumbers: [2, 3], shortLabel: "Empty tree", explanation: "Root is null. Return [].", variables: { answer: "[]" }, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true });
          return steps;
        }

        // Build tree from array
        const nodes = {};
        for (let i = 0; i < root.length; i++) {
          if (root[i] !== null) {
            const left = 2 * i + 1 < root.length && root[2 * i + 1] !== null ? 2 * i + 2 : null;
            const right = 2 * i + 2 < root.length && root[2 * i + 2] !== null ? 2 * i + 3 : null;
            nodes[i + 1] = { val: root[i], left: left, right: right, state: "default", depth: Math.floor(Math.log2(i + 1)) };
          }
        }

        steps.push({
          stepId: 0, lineNumbers: [4, 5],
          shortLabel: `Init: queue=[${root[0]}]`,
          explanation: `Enqueue root (${root[0]}).`,
          variables: { queue: `[${root[0]}]` },
          dataStructure: { treeNodes: { ...nodes, 1: { ...nodes[1], state: "queued" } }, callStack: [] },
          delta: {}, isAnswer: false,
        });

        // Simulate BFS
        const result = [];
        const queue = [0]; // indices into root array
        let level = 0;

        while (queue.length > 0) {
          const levelSize = queue.length;
          const levelVals = [];
          for (let i = 0; i < levelSize; i++) {
            const idx = queue.shift();
            if (root[idx] !== null && root[idx] !== undefined) {
              levelVals.push(root[idx]);
              if (2 * idx + 1 < root.length && root[2 * idx + 1] !== null) queue.push(2 * idx + 1);
              if (2 * idx + 2 < root.length && root[2 * idx + 2] !== null) queue.push(2 * idx + 2);
            }
          }
          if (levelVals.length > 0) result.push(levelVals);

          steps.push({
            stepId: steps.length, lineNumbers: [7, 8, 11, 18],
            shortLabel: `Level ${level}: [${levelVals.join(",")}]`,
            explanation: `Processed level ${level}: [${levelVals.join(",")}]. Queue has ${queue.length} nodes for next level.`,
            variables: { level, levelVals: JSON.stringify(levelVals), result: JSON.stringify(result) },
            dataStructure: { treeNodes: nodes, callStack: [] },
            delta: {}, isAnswer: false,
          });
          level++;
        }

        steps[steps.length - 1].isAnswer = true;
        steps[steps.length - 1].variables.answer = JSON.stringify(result);
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n)", space: "O(n)", explanation: "DFS visits each node once; recursion stack O(h), result O(n)" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "BFS visits each node once; queue holds at most one level (widest level)", tradeoff: "Both are O(n) — BFS is more natural for level-order" },
  },

  interviewTips: [
    "Explain the queue.size() trick for separating levels — this is the key insight.",
    "Mention that BFS naturally gives level-order; DFS requires depth tracking.",
    "Handle the null root edge case first.",
    "This is a building block for many tree problems: zigzag traversal, right side view, etc.",
    "Space complexity is O(w) for the queue where w is the maximum width of the tree.",
  ],

  relatedProblems: ["right-side-view", "count-good-nodes", "max-depth-binary-tree"],
};
