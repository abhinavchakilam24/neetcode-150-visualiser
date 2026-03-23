export const binaryTreeMaxPathSum = {
  id: 59,
  slug: "binary-tree-max-path-sum",
  title: "Binary Tree Maximum Path Sum",
  difficulty: "Hard",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 59,
  artifactType: "BST",
  companies: ["Meta", "Amazon", "Google", "Microsoft", "ByteDance"],
  leetcodeLink: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",

  pattern: "Post-order DFS with Global Maximum",
  patternExplanation: `At each node, compute the maximum "gain" from left and right subtrees.
    The path through the current node (left + node + right) is a candidate for the global max.
    Return the max single-side gain (node + max(left, right)) to the parent.`,

  intuition: {
    coreInsight: `A path can start and end at any node. At each node, we have two decisions:
      (1) Is the best path passing THROUGH this node (left + node + right)? This updates the
      global maximum. (2) What's the best gain we can OFFER to the parent? We can only go up
      through one branch, so we return node.val + max(leftGain, rightGain). Negative gains are
      clamped to 0 — it's better to not include a negative subtree.`,

    mentalModel: `Imagine each node is a city with a toll (its value, possibly negative). You're
      finding the most profitable trade route. At each city, you check: "What if the best route
      passes through me, connecting my left and right roads?" That's the through-path. But when
      reporting to your parent city, you can only extend one road — you pick the more profitable one.`,

    whyNaiveFails: `Checking all possible paths by trying every pair of start/end nodes is O(n^2)
      paths, each taking O(n) to evaluate — O(n^3) total. The DFS approach computes all relevant
      path sums in a single O(n) traversal by making the key observation at each node.`,

    keyObservation: `At every node, the maximum path sum through that node is:
      node.val + max(0, leftGain) + max(0, rightGain). We clamp gains to 0 because including
      a negative-sum subtree would only hurt. The value returned to the parent is different:
      node.val + max(0, max(leftGain, rightGain)) — pick only the better side.`,
  },

  problem: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in
    the sequence has an edge connecting them. A node can only appear in the sequence at most once.
    Note that the path does not need to pass through the root. The path sum of a path is the sum
    of the node's values in the path. Given the root of a binary tree, return the maximum path sum
    of any non-empty path.`,

  examples: [
    { input: "root = [1,2,3]", output: "6", explanation: "The optimal path is 2 → 1 → 3 with sum 2 + 1 + 3 = 6." },
    { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "The optimal path is 15 → 20 → 7 with sum 15 + 20 + 7 = 42." },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [1, 3 * 10^4]",
    "-1000 <= Node.val <= 1000",
  ],

  approaches: {
    brute: {
      label: "Brute Force (All Paths)",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: "For each node, compute the max path sum starting from that node going downward. Check all through-paths.",

      javaCode: `int maxSum = Integer.MIN_VALUE;

public int maxPathSum(TreeNode root) {
    maxSum = Integer.MIN_VALUE;
    findMax(root);
    return maxSum;
}

void findMax(TreeNode node) {
    if (node == null) return;
    int left = maxGain(node.left);
    int right = maxGain(node.right);
    maxSum = Math.max(maxSum, node.val + Math.max(0, left) + Math.max(0, right));
    findMax(node.left);
    findMax(node.right);
}

int maxGain(TreeNode node) {
    if (node == null) return 0;
    return node.val + Math.max(0, Math.max(maxGain(node.left), maxGain(node.right)));
}`,

      cppCode: `int maxSum = INT_MIN;

int maxPathSum(TreeNode* root) {
    maxSum = INT_MIN;
    findMax(root);
    return maxSum;
}

void findMax(TreeNode* node) {
    if (!node) return;
    int left = maxGain(node->left);
    int right = maxGain(node->right);
    maxSum = max(maxSum, node->val + max(0, left) + max(0, right));
    findMax(node->left);
    findMax(node->right);
}

int maxGain(TreeNode* node) {
    if (!node) return 0;
    return node->val + max(0, max(maxGain(node->left), maxGain(node->right)));
}`,

      pythonCode: `def maxPathSum(root: Optional[TreeNode]) -> int:
    max_sum = float('-inf')

    def find_max(node):
        nonlocal max_sum
        if not node:
            return
        left = max_gain(node.left)
        right = max_gain(node.right)
        max_sum = max(max_sum, node.val + max(0, left) + max(0, right))
        find_max(node.left)
        find_max(node.right)

    def max_gain(node):
        if not node:
            return 0
        return node.val + max(0, max(max_gain(node.left), max_gain(node.right)))

    find_max(root)
    return max_sum`,

      lineAnnotations: {
        9: "For each node, compute max gains from both sides",
        12: "Check if through-path at this node beats global max",
        18: "Compute max gain going down from this node",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { root: [1, 2, 3] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 4], shortLabel: "Init maxSum=-inf",
              explanation: "Start with maxSum = -infinity. Will check all possible through-paths.",
              variables: { maxSum: "-inf" },
              dataStructure: { treeNodes: { 1: { val: 1, left: 2, right: 3, state: "default", depth: 0 }, 2: { val: 2, left: null, right: null, state: "default", depth: 1 }, 3: { val: 3, left: null, right: null, state: "default", depth: 1 } }, callStack: [] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10, 11, 12], shortLabel: "At root: 2+1+3=6",
              explanation: "At root (1): leftGain=2, rightGain=3. Through-path = 2+1+3=6. maxSum=6.",
              variables: { "node.val": 1, leftGain: 2, rightGain: 3, throughPath: 6, maxSum: 6 },
              dataStructure: { treeNodes: { 1: { val: 1, left: 2, right: 3, state: "found", depth: 0 }, 2: { val: 2, left: null, right: null, state: "found", depth: 1 }, 3: { val: 3, left: null, right: null, state: "found", depth: 1 } }, callStack: [] },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root }) {
        const steps = [];
        steps.push({ stepId: 0, lineNumbers: [3], shortLabel: "Brute force", explanation: "Check all through-paths.", variables: {}, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "DFS with Global Max",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      idea: `Post-order DFS. At each node, compute left and right gains (clamped to 0). Update
        global max with through-path (left + node + right). Return single-side gain to parent.`,

      javaCode: `int maxSum = Integer.MIN_VALUE;

public int maxPathSum(TreeNode root) {
    maxSum = Integer.MIN_VALUE;
    dfs(root);
    return maxSum;
}

int dfs(TreeNode node) {
    if (node == null) return 0;

    int leftGain = Math.max(0, dfs(node.left));
    int rightGain = Math.max(0, dfs(node.right));

    int throughPath = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, throughPath);

    return node.val + Math.max(leftGain, rightGain);
}`,

      cppCode: `int maxSum = INT_MIN;

int maxPathSum(TreeNode* root) {
    maxSum = INT_MIN;
    dfs(root);
    return maxSum;
}

int dfs(TreeNode* node) {
    if (!node) return 0;

    int leftGain = max(0, dfs(node->left));
    int rightGain = max(0, dfs(node->right));

    int throughPath = node->val + leftGain + rightGain;
    maxSum = max(maxSum, throughPath);

    return node->val + max(leftGain, rightGain);
}`,

      pythonCode: `def maxPathSum(root: Optional[TreeNode]) -> int:
    max_sum = [float('-inf')]

    def dfs(node):
        if not node:
            return 0

        left_gain = max(0, dfs(node.left))
        right_gain = max(0, dfs(node.right))

        through_path = node.val + left_gain + right_gain
        max_sum[0] = max(max_sum[0], through_path)

        return node.val + max(left_gain, right_gain)

    dfs(root)
    return max_sum[0]`,

      lineAnnotations: {
        4: "Initialize global max to negative infinity",
        9: "Post-order DFS returns max gain from this subtree",
        10: "Base case: null contributes 0 gain",
        12: "Left gain, clamped to 0 (ignore negative subtrees)",
        13: "Right gain, clamped to 0",
        15: "Through-path: left + current + right (candidate for answer)",
        16: "Update global max if this through-path is the best",
        18: "Return to parent: current + better side only (can't fork)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Simple tree [1,2,3] — through-path is optimal",
          input: { root: [1, 2, 3] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4, 5],
              shortLabel: "Start DFS, maxSum=-inf",
              explanation: "Initialize maxSum to -infinity. Begin DFS from root (1).",
              variables: { maxSum: "-inf" },
              dataStructure: {
                treeNodes: { 1: { val: 1, left: 2, right: 3, state: "default", depth: 0 }, 2: { val: 2, left: null, right: null, state: "default", depth: 1 }, 3: { val: 3, left: null, right: null, state: "default", depth: 1 } },
                callStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [9, 10, 12],
              shortLabel: "dfs(2): leftGain=0, rightGain=0",
              explanation: "Node 2 is a leaf. Both children are null (gain=0). Through-path = 2+0+0 = 2. maxSum=2. Return 2 to parent.",
              variables: { "node.val": 2, leftGain: 0, rightGain: 0, throughPath: 2, maxSum: 2, returns: 2 },
              dataStructure: {
                treeNodes: { 1: { val: 1, left: 2, right: 3, state: "default", depth: 0 }, 2: { val: 2, left: null, right: null, state: "active", depth: 1 }, 3: { val: 3, left: null, right: null, state: "default", depth: 1 } },
                callStack: ["dfs(1)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 13],
              shortLabel: "dfs(3): throughPath=3, maxSum=3",
              explanation: "Node 3 is a leaf. Through-path = 3. maxSum = max(2, 3) = 3. Return 3 to parent.",
              variables: { "node.val": 3, leftGain: 0, rightGain: 0, throughPath: 3, maxSum: 3, returns: 3 },
              dataStructure: {
                treeNodes: { 1: { val: 1, left: 2, right: 3, state: "default", depth: 0 }, 2: { val: 2, left: null, right: null, state: "visited", depth: 1 }, 3: { val: 3, left: null, right: null, state: "active", depth: 1 } },
                callStack: ["dfs(1)", "dfs(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 15, 16],
              shortLabel: "dfs(1): 2+1+3=6, maxSum=6!",
              explanation: "At root (1): leftGain=2, rightGain=3. Through-path = 2+1+3 = 6. maxSum = max(3, 6) = 6! Return 1+max(2,3) = 4 (but we're done).",
              variables: { "node.val": 1, leftGain: 2, rightGain: 3, throughPath: 6, maxSum: 6 },
              dataStructure: {
                treeNodes: { 1: { val: 1, left: 2, right: 3, state: "found", depth: 0 }, 2: { val: 2, left: null, right: null, state: "found", depth: 1 }, 3: { val: 3, left: null, right: null, state: "found", depth: 1 } },
                callStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6],
              shortLabel: "Return 6",
              explanation: "DFS complete. Maximum path sum is 6 (path: 2 → 1 → 3).",
              variables: { answer: 6 },
              dataStructure: {
                treeNodes: { 1: { val: 1, left: 2, right: 3, state: "found", depth: 0 }, 2: { val: 2, left: null, right: null, state: "found", depth: 1 }, 3: { val: 3, left: null, right: null, state: "found", depth: 1 } },
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Negative Root",
          description: "Path doesn't go through root: [-10,9,20,null,null,15,7]",
          input: { root: [-10, 9, 20, null, null, 15, 7] },
          expectedOutput: "42",
          steps: [
            {
              stepId: 0, lineNumbers: [3, 4], shortLabel: "Init maxSum=-inf",
              explanation: "Start DFS. The optimal path won't go through the root (-10) because it's negative.",
              variables: { maxSum: "-inf" },
              dataStructure: { treeNodes: { 1: { val: -10, left: 2, right: 3, state: "default", depth: 0 }, 2: { val: 9, left: null, right: null, state: "default", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "default", depth: 1 }, 4: { val: 15, left: null, right: null, state: "default", depth: 2 }, 5: { val: 7, left: null, right: null, state: "default", depth: 2 } }, callStack: [] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [12, 13, 15, 16], shortLabel: "dfs(9): throughPath=9",
              explanation: "Node 9 (leaf): throughPath=9. maxSum=9.",
              variables: { "node.val": 9, throughPath: 9, maxSum: 9 },
              dataStructure: { treeNodes: { 1: { val: -10, left: 2, right: 3, state: "default", depth: 0 }, 2: { val: 9, left: null, right: null, state: "active", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "default", depth: 1 }, 4: { val: 15, left: null, right: null, state: "default", depth: 2 }, 5: { val: 7, left: null, right: null, state: "default", depth: 2 } }, callStack: ["dfs(-10)", "dfs(9)"] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [12, 13, 15, 16], shortLabel: "dfs(20): 15+20+7=42!",
              explanation: "Node 20: leftGain=15, rightGain=7. throughPath=15+20+7=42. maxSum=42!",
              variables: { "node.val": 20, leftGain: 15, rightGain: 7, throughPath: 42, maxSum: 42 },
              dataStructure: { treeNodes: { 1: { val: -10, left: 2, right: 3, state: "default", depth: 0 }, 2: { val: 9, left: null, right: null, state: "visited", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "found", depth: 1 }, 4: { val: 15, left: null, right: null, state: "found", depth: 2 }, 5: { val: 7, left: null, right: null, state: "found", depth: 2 } }, callStack: ["dfs(-10)", "dfs(20)"] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [12, 13, 15, 16], shortLabel: "dfs(-10): through=-10+9+35=34",
              explanation: "At root (-10): leftGain=9, rightGain=35 (20+15). throughPath=-10+9+35=34. maxSum stays 42. The best path (15→20→7) doesn't include the root.",
              variables: { "node.val": -10, leftGain: 9, rightGain: 35, throughPath: 34, maxSum: 42 },
              dataStructure: { treeNodes: { 1: { val: -10, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "visited", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "found", depth: 1 }, 4: { val: 15, left: null, right: null, state: "found", depth: 2 }, 5: { val: 7, left: null, right: null, state: "found", depth: 2 } }, callStack: ["dfs(-10)"] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [6], shortLabel: "Return 42",
              explanation: "Maximum path sum is 42 — the path 15 → 20 → 7, entirely in the right subtree.",
              variables: { answer: 42 },
              dataStructure: { treeNodes: { 1: { val: -10, left: 2, right: 3, state: "default", depth: 0 }, 2: { val: 9, left: null, right: null, state: "default", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "found", depth: 1 }, 4: { val: 15, left: null, right: null, state: "found", depth: 2 }, 5: { val: 7, left: null, right: null, state: "found", depth: 2 } }, callStack: [] },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root }) {
        const steps = [];
        if (!root || root.length === 0) {
          steps.push({ stepId: 0, lineNumbers: [10], shortLabel: "Empty", explanation: "No tree.", variables: { answer: 0 }, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true });
          return steps;
        }

        let maxSum = -Infinity;
        const treeNodes = {};
        let nid = 0;

        function buildNodes(arr) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== null) {
              const id = i + 1;
              treeNodes[id] = { val: arr[i], left: 2*i+1 < arr.length && arr[2*i+1] !== null ? 2*i+2 : null, right: 2*i+2 < arr.length && arr[2*i+2] !== null ? 2*i+3 : null, state: "default", depth: Math.floor(Math.log2(i + 1)) };
            }
          }
        }
        buildNodes(root);

        function dfs(idx) {
          if (idx >= root.length || root[idx] === null) return 0;
          const leftGain = Math.max(0, dfs(2 * idx + 1));
          const rightGain = Math.max(0, dfs(2 * idx + 2));
          const throughPath = root[idx] + leftGain + rightGain;
          maxSum = Math.max(maxSum, throughPath);

          const nodeId = idx + 1;
          if (treeNodes[nodeId]) treeNodes[nodeId].state = "visited";

          steps.push({
            stepId: steps.length, lineNumbers: [12, 13, 15, 16],
            shortLabel: `dfs(${root[idx]}): through=${throughPath}`,
            explanation: `Node ${root[idx]}: leftGain=${leftGain}, rightGain=${rightGain}. Through=${throughPath}. maxSum=${maxSum}.`,
            variables: { "node.val": root[idx], leftGain, rightGain, throughPath, maxSum },
            dataStructure: { treeNodes: JSON.parse(JSON.stringify(treeNodes)), callStack: [] },
            delta: {}, isAnswer: false,
          });

          return root[idx] + Math.max(leftGain, rightGain);
        }

        dfs(0);

        steps.push({
          stepId: steps.length, lineNumbers: [6],
          shortLabel: `Return ${maxSum}`,
          explanation: `Maximum path sum = ${maxSum}.`,
          variables: { answer: maxSum },
          dataStructure: { treeNodes: JSON.parse(JSON.stringify(treeNodes)), callStack: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n^2)", space: "O(n)", explanation: "For each node, compute max gain O(n); n nodes total" },
    optimal: { time: "O(n)", space: "O(h)", explanation: "Single DFS pass, O(1) work per node; recursion stack O(h)", tradeoff: "Combining two computations (global max + gain return) into one DFS" },
  },

  interviewTips: [
    "The key distinction: through-path (left + node + right) vs. single-side gain (returned to parent).",
    "Clamping gains to 0 is critical — don't include negative subtrees.",
    "The path does NOT need to include the root — it can be entirely in a subtree.",
    "Handle all-negative trees: maxSum starts at -inf, so even a single negative node is valid.",
    "This is one of the hardest tree problems — draw the distinction between 'use both sides' and 'pick one side'.",
  ],

  relatedProblems: ["diameter-binary-tree", "max-depth-binary-tree", "longest-increasing-path-matrix"],
};
