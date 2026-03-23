export const diameterBinaryTree = {
  id: 48,
  slug: "diameter-binary-tree",
  title: "Diameter of Binary Tree",
  difficulty: "Easy",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 48,
  artifactType: "BST",
  companies: ["Meta", "Google", "Amazon", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/diameter-of-binary-tree/",

  pattern: "Post-Order DFS with Global Variable",
  patternExplanation: `At each node, compute the height of both subtrees. The diameter passing
    through that node is leftHeight + rightHeight. Track the maximum diameter seen globally.
    Return the height (1 + max(left, right)) to the parent.`,

  intuition: {
    coreInsight: `The diameter is the longest path between any two nodes. This path may or may
      not pass through the root. At every node, the longest path through it equals the height of
      its left subtree plus the height of its right subtree. So we compute heights bottom-up via
      DFS, and at each node we update a global maximum with leftHeight + rightHeight.`,

    mentalModel: `Imagine stretching a rope through the tree. The longest rope you can lay passes
      through some node where it goes as far down-left as possible and as far down-right as possible.
      At each node, you measure "how far left can I go?" + "how far right can I go?" — that's the
      candidate diameter. The actual diameter is the maximum over all nodes.`,

    whyNaiveFails: `A common mistake is computing the diameter as just the height of the left subtree
      plus the height of the right subtree at the root. This fails when the longest path doesn't pass
      through the root — for example, a tree where one subtree is much deeper and wider than the other.
      You must check the diameter candidate at every node, not just the root.`,

    keyObservation: `The key insight is that computing the height of a subtree (which we need anyway)
      gives us exactly the information needed to compute the diameter through that node. We piggyback
      the diameter calculation onto the height calculation. The function returns height but updates
      a global diameter variable as a side effect.`,
  },

  problem: `Given the root of a binary tree, return the length of the diameter of the tree.
    The diameter of a binary tree is the length of the longest path between any two nodes in
    the tree. This path may or may not pass through the root. The length of a path between
    two nodes is represented by the number of edges between them.`,

  examples: [
    {
      input: "root = [1,2,3,4,5]",
      output: "3",
      explanation: "The longest path is 4 → 2 → 1 → 3 or 5 → 2 → 1 → 3, which has 3 edges.",
    },
    {
      input: "root = [1,2]",
      output: "1",
      explanation: "The path 2 → 1 has 1 edge.",
    },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [1, 10^4].",
    "-100 <= Node.val <= 100",
  ],

  approaches: {
    brute: {
      label: "Brute Force — BFS from Every Node",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: `For every node, run BFS/DFS to find the farthest node from it. The maximum
        distance found across all starting nodes is the diameter.`,

      javaCode: `public int diameterOfBinaryTree(TreeNode root) {
    int[] maxDiam = {0};
    List<TreeNode> nodes = new ArrayList<>();
    collectNodes(root, nodes);
    for (TreeNode node : nodes) {
        int dist = farthestDistance(node, root);
        maxDiam[0] = Math.max(maxDiam[0], dist);
    }
    return maxDiam[0];
}`,

      cppCode: `int diameterOfBinaryTree(TreeNode* root) {
    int maxDiam = 0;
    vector<TreeNode*> nodes;
    collectNodes(root, nodes);
    for (auto node : nodes) {
        int dist = farthestDistance(node, root);
        maxDiam = max(maxDiam, dist);
    }
    return maxDiam;
}`,

      pythonCode: `def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
    max_diam = 0
    nodes = []
    self.collectNodes(root, nodes)
    for node in nodes:
        dist = self.farthestDistance(node, root)
        max_diam = max(max_diam, dist)
    return max_diam`,

      lineAnnotations: {
        1: "Find the diameter of the binary tree",
        4: "Collect all nodes into a list",
        5: "For each node, find the farthest distance from it",
        7: "Track the maximum distance seen",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { tree: [1, 2, 3, 4, 5] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Start brute force",
              explanation: "We collect all nodes and for each one, find the farthest node from it. This is O(n) per node, giving O(n^2) total.",
              variables: { maxDiam: 0, totalNodes: 5 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "default", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "From node 4, farthest = 3 (to node 3)",
              explanation: "Starting from node 4: path 4 → 2 → 1 → 3 has distance 3. This is currently the max.",
              variables: { maxDiam: 3, currentNode: 4, dist: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "active", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8],
              shortLabel: "Diameter = 3",
              explanation: "After checking all nodes, the maximum distance found is 3 (e.g., path 4 → 2 → 1 → 3). Brute force works but is O(n^2).",
              variables: { maxDiam: 3, answer: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function ({ tree }) {
        const steps = [];
        steps.push({
          stepId: 0,
          lineNumbers: [1],
          shortLabel: "Brute force approach",
          explanation: "For each node, find the farthest distance. O(n^2) total.",
          variables: { approach: "brute", note: "See optimal for full walkthrough" },
          dataStructure: { treeNodes: {}, callStack: [] },
          delta: {},
          isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "DFS Height with Global Diameter",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      idea: `Post-order DFS computes the height of each subtree. At each node, the diameter
        through it is leftHeight + rightHeight. Update a global max. Return height to parent.`,

      javaCode: `int maxDiameter = 0;

public int diameterOfBinaryTree(TreeNode root) {
    height(root);
    return maxDiameter;
}

private int height(TreeNode node) {
    if (node == null) return 0;

    int leftHeight = height(node.left);
    int rightHeight = height(node.right);

    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
}`,

      cppCode: `int maxDiameter = 0;

int diameterOfBinaryTree(TreeNode* root) {
    height(root);
    return maxDiameter;
}

int height(TreeNode* node) {
    if (node == nullptr) return 0;

    int leftHeight = height(node->left);
    int rightHeight = height(node->right);

    maxDiameter = max(maxDiameter, leftHeight + rightHeight);

    return 1 + max(leftHeight, rightHeight);
}`,

      pythonCode: `def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
    self.max_diameter = 0

    def height(node):
        if not node:
            return 0

        left_height = height(node.left)
        right_height = height(node.right)

        self.max_diameter = max(self.max_diameter, left_height + right_height)

        return 1 + max(left_height, right_height)

    height(root)
    return self.max_diameter`,

      lineAnnotations: {
        1: "Global variable to track maximum diameter found so far",
        4: "Kick off the DFS — height() will update maxDiameter as a side effect",
        5: "Return the maximum diameter found across all nodes",
        8: "Compute height of the subtree rooted at this node",
        9: "Base case: null node has height 0",
        11: "Recursively find the height of the left subtree",
        12: "Recursively find the height of the right subtree",
        14: "Diameter through this node = left height + right height. Update global max.",
        16: "Return the height of this subtree to the parent (1 + taller child)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Balanced tree — diameter passes through root",
          input: { tree: [1, 2, 3, 4, 5] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 4],
              shortLabel: "Init maxDiameter = 0",
              explanation: "Initialize maxDiameter to 0. We'll call height(root) which will compute heights bottom-up and update maxDiameter at every node.",
              variables: { maxDiameter: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "default", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8],
              shortLabel: "height(1) — visit root",
              explanation: "Call height on root node 1. We need to recurse into both subtrees first (post-order).",
              variables: { "node.val": 1, maxDiameter: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["height(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11],
              shortLabel: "height(2) — visit node 2",
              explanation: "Recurse into left child of node 1 — node 2. Node 2 has children 4 and 5.",
              variables: { "node.val": 2, maxDiameter: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["height(1)", "height(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11],
              shortLabel: "height(4) — leaf node",
              explanation: "Recurse into left child of node 2 — node 4. Node 4 is a leaf.",
              variables: { "node.val": 4, maxDiameter: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "active", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["height(1)", "height(2)", "height(4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14, 16],
              shortLabel: "Node 4: diam=0+0=0, height=1",
              explanation: "Node 4 is a leaf — leftHeight=0, rightHeight=0. Diameter through node 4 = 0 + 0 = 0. maxDiameter stays 0. Return height = 1 + max(0,0) = 1.",
              variables: { "node.val": 4, leftHeight: 0, rightHeight: 0, diamThrough: 0, maxDiameter: 0, returnHeight: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["height(1)", "height(2)"],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12],
              shortLabel: "height(5) — leaf node",
              explanation: "Back at node 2. leftHeight = 1 (from node 4). Now recurse into right child — node 5.",
              variables: { "node.val": 5, maxDiameter: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["height(1)", "height(2)", "height(5)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14, 16],
              shortLabel: "Node 5: diam=0, height=1",
              explanation: "Node 5 is a leaf — leftHeight=0, rightHeight=0. Diameter = 0. Return height = 1.",
              variables: { "node.val": 5, leftHeight: 0, rightHeight: 0, diamThrough: 0, maxDiameter: 0, returnHeight: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["height(1)", "height(2)"],
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [14, 16],
              shortLabel: "Node 2: diam=1+1=2, height=2",
              explanation: "Back at node 2. leftHeight=1 (node 4), rightHeight=1 (node 5). Diameter through node 2 = 1+1 = 2. maxDiameter updates from 0 to 2. Return height = 1 + max(1,1) = 2.",
              variables: { "node.val": 2, leftHeight: 1, rightHeight: 1, diamThrough: 2, maxDiameter: 2, returnHeight: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["height(1)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [12],
              shortLabel: "height(3) — leaf node",
              explanation: "Back at root (node 1). leftHeight = 2 (from node 2). Now recurse into right child — node 3.",
              variables: { "node.val": 3, maxDiameter: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "active", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["height(1)", "height(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [14, 16],
              shortLabel: "Node 3: diam=0, height=1",
              explanation: "Node 3 is a leaf. Diameter = 0, height = 1. maxDiameter stays at 2.",
              variables: { "node.val": 3, leftHeight: 0, rightHeight: 0, diamThrough: 0, maxDiameter: 2, returnHeight: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["height(1)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [14, 16],
              shortLabel: "Root: diam=2+1=3, height=3",
              explanation: "Back at root (node 1). leftHeight=2, rightHeight=1. Diameter through root = 2 + 1 = 3. maxDiameter updates from 2 to 3! Return height = 1 + max(2,1) = 3. The diameter of the tree is 3.",
              variables: { "node.val": 1, leftHeight: 2, rightHeight: 1, diamThrough: 3, maxDiameter: 3, answer: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: [],
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Diameter Not Through Root",
          description: "The longest path does not pass through the root",
          input: { tree: [1, 2, null, 3, 4, null, null, 5, null, null, 6] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 4],
              shortLabel: "Init maxDiameter = 0",
              explanation: "This tree is left-skewed. The diameter might not pass through the root — it could be entirely within the left subtree.",
              variables: { maxDiameter: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "default", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "default", depth: 1 },
                  4: { val: 3, left: 8, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: 11, state: "default", depth: 2 },
                  8: { val: 5, left: null, right: null, state: "default", depth: 3 },
                  11: { val: 6, left: null, right: null, state: "default", depth: 3 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 11],
              shortLabel: "DFS down to leaf 5",
              explanation: "Recursing down the left side: root(1) → 2 → 3 → 5 (leaf). Node 5 returns height 1.",
              variables: { "node.val": 5, leftHeight: 0, rightHeight: 0, returnHeight: 1, maxDiameter: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  4: { val: 3, left: 8, right: null, state: "visited", depth: 2 },
                  5: { val: 4, left: null, right: 11, state: "default", depth: 2 },
                  8: { val: 5, left: null, right: null, state: "found", depth: 3 },
                  11: { val: 6, left: null, right: null, state: "default", depth: 3 },
                },
                callStack: ["height(1)", "height(2)", "height(3)"],
              },
              delta: { changedIndices: [8] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [14, 16],
              shortLabel: "Node 3: diam=1+0=1, height=2",
              explanation: "Node 3 has leftHeight=1 (node 5), rightHeight=0. Diameter through 3 = 1. maxDiameter = 1. Return height 2.",
              variables: { "node.val": 3, leftHeight: 1, rightHeight: 0, diamThrough: 1, maxDiameter: 1, returnHeight: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  4: { val: 3, left: 8, right: null, state: "found", depth: 2 },
                  5: { val: 4, left: null, right: 11, state: "default", depth: 2 },
                  8: { val: 5, left: null, right: null, state: "found", depth: 3 },
                  11: { val: 6, left: null, right: null, state: "default", depth: 3 },
                },
                callStack: ["height(1)", "height(2)"],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 14, 16],
              shortLabel: "Node 4: diam=0+1=1, height=2",
              explanation: "Now recurse right from node 2 to node 4. Node 4 has rightHeight=1 (node 6), leftHeight=0. Diameter = 1. maxDiameter stays 1. Return height 2.",
              variables: { "node.val": 4, leftHeight: 0, rightHeight: 1, diamThrough: 1, maxDiameter: 1, returnHeight: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  4: { val: 3, left: 8, right: null, state: "found", depth: 2 },
                  5: { val: 4, left: null, right: 11, state: "found", depth: 2 },
                  8: { val: 5, left: null, right: null, state: "found", depth: 3 },
                  11: { val: 6, left: null, right: null, state: "found", depth: 3 },
                },
                callStack: ["height(1)", "height(2)"],
              },
              delta: { changedIndices: [5, 11] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14, 16],
              shortLabel: "Node 2: diam=2+2=4! height=3",
              explanation: "Back at node 2. leftHeight=2 (path to node 5), rightHeight=2 (path to node 6). Diameter through node 2 = 2+2 = 4. maxDiameter updates to 4! This is the longest path: 5 → 3 → 2 → 4 → 6. It doesn't pass through the root!",
              variables: { "node.val": 2, leftHeight: 2, rightHeight: 2, diamThrough: 4, maxDiameter: 4, returnHeight: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  4: { val: 3, left: 8, right: null, state: "found", depth: 2 },
                  5: { val: 4, left: null, right: 11, state: "found", depth: 2 },
                  8: { val: 5, left: null, right: null, state: "found", depth: 3 },
                  11: { val: 6, left: null, right: null, state: "found", depth: 3 },
                },
                callStack: ["height(1)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14, 5],
              shortLabel: "Root: diam=3+0=3, max stays 4",
              explanation: "At root (1): leftHeight=3, rightHeight=0. Diameter through root = 3, but maxDiameter is already 4. The answer is 4 — the longest path does NOT pass through the root.",
              variables: { "node.val": 1, leftHeight: 3, rightHeight: 0, diamThrough: 3, maxDiameter: 4, answer: 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "found", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  4: { val: 3, left: 8, right: null, state: "found", depth: 2 },
                  5: { val: 4, left: null, right: 11, state: "found", depth: 2 },
                  8: { val: 5, left: null, right: null, state: "found", depth: 3 },
                  11: { val: 6, left: null, right: null, state: "found", depth: 3 },
                },
                callStack: [],
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function ({ tree }) {
        const steps = [];

        if (!tree || tree.length === 0 || tree[0] === null) {
          steps.push({
            stepId: 0,
            lineNumbers: [9],
            shortLabel: "Empty tree — diameter = 0",
            explanation: "The tree is empty. Diameter is 0.",
            variables: { answer: 0 },
            dataStructure: { treeNodes: {}, callStack: [] },
            delta: {},
            isAnswer: true,
          });
          return steps;
        }

        const nodes = {};
        for (let i = 0; i < tree.length; i++) {
          if (tree[i] === null || tree[i] === undefined) continue;
          const nodeId = i + 1;
          const leftIdx = 2 * i + 1;
          const rightIdx = 2 * i + 2;
          const depth = Math.floor(Math.log2(nodeId));
          nodes[nodeId] = {
            val: tree[i],
            left: leftIdx < tree.length && tree[leftIdx] != null ? leftIdx + 1 : null,
            right: rightIdx < tree.length && tree[rightIdx] != null ? rightIdx + 1 : null,
            state: "default",
            depth,
          };
        }

        let maxDiam = 0;
        const callStack = [];

        function makeTreeSnapshot() {
          const snap = {};
          for (const id in nodes) snap[id] = { ...nodes[id] };
          return snap;
        }

        steps.push({
          stepId: 0,
          lineNumbers: [1, 4],
          shortLabel: "Init maxDiameter = 0",
          explanation: "Start with maxDiameter = 0. We'll compute heights bottom-up and update the diameter at each node.",
          variables: { maxDiameter: 0 },
          dataStructure: { treeNodes: makeTreeSnapshot(), callStack: [] },
          delta: {},
          isAnswer: false,
        });

        function dfs(nodeId) {
          if (!nodeId || !nodes[nodeId]) return 0;

          const node = nodes[nodeId];
          callStack.push(`height(${node.val})`);
          nodes[nodeId].state = "active";

          steps.push({
            stepId: steps.length,
            lineNumbers: [8],
            shortLabel: `Visit node ${node.val}`,
            explanation: `Enter height(${node.val}). Recurse into both subtrees.`,
            variables: { "node.val": node.val, maxDiameter: maxDiam },
            dataStructure: { treeNodes: makeTreeSnapshot(), callStack: [...callStack] },
            delta: {},
            isAnswer: false,
          });

          nodes[nodeId].state = "visited";
          const leftH = dfs(node.left);
          const rightH = dfs(node.right);
          const diamThrough = leftH + rightH;
          maxDiam = Math.max(maxDiam, diamThrough);
          const h = 1 + Math.max(leftH, rightH);

          nodes[nodeId].state = "found";
          callStack.pop();

          steps.push({
            stepId: steps.length,
            lineNumbers: [14, 16],
            shortLabel: `Node ${node.val}: diam=${diamThrough}, h=${h}`,
            explanation: `Back at node ${node.val}. leftHeight=${leftH}, rightHeight=${rightH}. Diameter through this node = ${diamThrough}. maxDiameter = ${maxDiam}. Return height ${h}.`,
            variables: { "node.val": node.val, leftHeight: leftH, rightHeight: rightH, diamThrough, maxDiameter: maxDiam, returnHeight: h },
            dataStructure: { treeNodes: makeTreeSnapshot(), callStack: [...callStack] },
            delta: { changedIndices: [nodeId] },
            isAnswer: false,
          });

          return h;
        }

        dfs(1);

        if (steps.length > 0) {
          steps[steps.length - 1].isAnswer = true;
          steps[steps.length - 1].variables.answer = maxDiam;
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n²)", space: "O(n)", explanation: "BFS/DFS from every node" },
    optimal: {
      time: "O(n)",
      space: "O(h)",
      explanation: "Single DFS pass visits each node once. Stack depth is the height of the tree.",
      tradeoff: "No tradeoff needed — O(n) time is optimal since we must visit every node.",
    },
  },

  interviewTips: [
    "Clarify: diameter is measured in edges, not nodes. The path 4→2→1→3 has 3 edges.",
    "Emphasize that the diameter may NOT pass through the root — that's the key insight.",
    "Show the interviewer how you piggyback diameter calculation onto height calculation.",
    "Mention that this is the same DFS as maxDepth, just with a global variable tracking the max left+right sum.",
    "State the recurrence: at each node, candidate diameter = leftHeight + rightHeight; height = 1 + max(leftHeight, rightHeight).",
  ],

  relatedProblems: ["max-depth-binary-tree", "balanced-binary-tree", "binary-tree-max-path-sum"],
};
