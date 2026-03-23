export const balancedBinaryTree = {
  id: 49,
  slug: "balanced-binary-tree",
  title: "Balanced Binary Tree",
  difficulty: "Easy",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 49,
  artifactType: "BST",
  companies: ["Amazon", "Google", "Bloomberg", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/balanced-binary-tree/",

  pattern: "Post-Order DFS with Early Termination",
  patternExplanation: `Compute heights bottom-up. If at any node the left and right heights differ
    by more than 1, return -1 as a sentinel to short-circuit. Otherwise return the actual height.`,

  intuition: {
    coreInsight: `A tree is balanced if, at every node, the heights of the left and right subtrees
      differ by at most 1. The naive approach computes the height of every subtree independently,
      leading to O(n^2). The optimal approach computes heights bottom-up in a single DFS pass,
      using -1 as a sentinel value to signal that a subtree is already unbalanced.`,

    mentalModel: `Imagine inspecting a building floor by floor from the bottom up. At each floor,
      you compare the heights of the left wing and right wing. If they differ by more than 1 story,
      the whole building is unbalanced — no need to keep checking higher floors. You immediately
      report "unbalanced" all the way up. If both wings are within 1 story, you report your own
      height as 1 + max(left, right).`,

    whyNaiveFails: `The naive approach calls height() at every node, and height() itself is O(n).
      So for a tree with n nodes, you do O(n) work at each of the n nodes, giving O(n^2). For a
      skewed tree, this is disastrous. The trick is to combine the balance check with the height
      calculation in a single pass.`,

    keyObservation: `Use -1 as a sentinel meaning "this subtree is unbalanced." If either child
      returns -1, propagate -1 immediately (short-circuit). If both return valid heights but differ
      by more than 1, return -1. Otherwise return the true height. The root call returns -1 if and
      only if the tree is unbalanced.`,
  },

  problem: `Given a binary tree, determine if it is height-balanced. A height-balanced binary tree
    is a binary tree in which the depth of the two subtrees of every node never differs by more than one.`,

  examples: [
    {
      input: "root = [3,9,20,null,null,15,7]",
      output: "true",
      explanation: "Both subtrees at every node differ in height by at most 1.",
    },
    {
      input: "root = [1,2,2,3,3,null,null,4,4]",
      output: "false",
      explanation: "The left subtree of node 1 has height 3, the right has height 1. Difference is 2.",
    },
    {
      input: "root = []",
      output: "true",
      explanation: "An empty tree is balanced.",
    },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [0, 5000].",
    "-10^4 <= Node.val <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Top-Down Height Check",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: `For each node, compute the height of left and right subtrees separately. If they
        differ by more than 1, return false. Recursively check both subtrees. This recalculates
        heights redundantly.`,

      javaCode: `public boolean isBalanced(TreeNode root) {
    if (root == null) return true;

    int leftH = height(root.left);
    int rightH = height(root.right);

    if (Math.abs(leftH - rightH) > 1) return false;

    return isBalanced(root.left) && isBalanced(root.right);
}

private int height(TreeNode node) {
    if (node == null) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
}`,

      cppCode: `bool isBalanced(TreeNode* root) {
    if (root == nullptr) return true;

    int leftH = height(root->left);
    int rightH = height(root->right);

    if (abs(leftH - rightH) > 1) return false;

    return isBalanced(root->left) && isBalanced(root->right);
}

int height(TreeNode* node) {
    if (node == nullptr) return 0;
    return 1 + max(height(node->left), height(node->right));
}`,

      pythonCode: `def isBalanced(self, root: Optional[TreeNode]) -> bool:
    if not root:
        return True

    left_h = self.height(root.left)
    right_h = self.height(root.right)

    if abs(left_h - right_h) > 1:
        return False

    return self.isBalanced(root.left) and self.isBalanced(root.right)

def height(self, node):
    if not node:
        return 0
    return 1 + max(self.height(node.left), self.height(node.right))`,

      lineAnnotations: {
        1: "Check if tree rooted here is balanced",
        2: "Base case: null tree is balanced",
        4: "Compute height of left subtree — O(n) each time",
        5: "Compute height of right subtree — O(n) each time",
        7: "If heights differ by more than 1, not balanced",
        9: "Recursively check both subtrees (redundant height work)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { tree: [3, 9, 20, null, null, 15, 7] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Check root (3)",
              explanation: "Start at root node 3. Compute height of left subtree (9) and right subtree (20).",
              variables: { "node.val": 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "default", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "default", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["isBalanced(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 7],
              shortLabel: "|1 - 2| = 1 <= 1 ✓",
              explanation: "height(left) = 1, height(right) = 2. |1 - 2| = 1 which is <= 1. Node 3 passes the check. Now recursively verify subtrees.",
              variables: { "node.val": 3, leftH: 1, rightH: 2, diff: 1, balanced: true },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "found", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "found", depth: 2 },
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
          shortLabel: "Brute force check",
          explanation: "Check balance at each node by recomputing heights. O(n^2).",
          variables: { approach: "brute" },
          dataStructure: { treeNodes: {}, callStack: [] },
          delta: {},
          isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Bottom-Up DFS with Sentinel",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      idea: `Single post-order DFS. Return -1 if any subtree is unbalanced (sentinel).
        Otherwise return the height. If either child returns -1, propagate -1 immediately.`,

      javaCode: `public boolean isBalanced(TreeNode root) {
    return checkHeight(root) != -1;
}

private int checkHeight(TreeNode node) {
    if (node == null) return 0;

    int leftH = checkHeight(node.left);
    if (leftH == -1) return -1;

    int rightH = checkHeight(node.right);
    if (rightH == -1) return -1;

    if (Math.abs(leftH - rightH) > 1) return -1;

    return 1 + Math.max(leftH, rightH);
}`,

      cppCode: `bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}

int checkHeight(TreeNode* node) {
    if (node == nullptr) return 0;

    int leftH = checkHeight(node->left);
    if (leftH == -1) return -1;

    int rightH = checkHeight(node->right);
    if (rightH == -1) return -1;

    if (abs(leftH - rightH) > 1) return -1;

    return 1 + max(leftH, rightH);
}`,

      pythonCode: `def isBalanced(self, root: Optional[TreeNode]) -> bool:
    return self.checkHeight(root) != -1

def checkHeight(self, node):
    if not node:
        return 0

    left_h = self.checkHeight(node.left)
    if left_h == -1:
        return -1

    right_h = self.checkHeight(node.right)
    if right_h == -1:
        return -1

    if abs(left_h - right_h) > 1:
        return -1

    return 1 + max(left_h, right_h)`,

      lineAnnotations: {
        1: "Entry: tree is balanced iff checkHeight doesn't return -1",
        2: "-1 is our sentinel meaning 'unbalanced subtree detected'",
        5: "Compute height or detect imbalance for this subtree",
        6: "Base case: null has height 0 (balanced trivially)",
        8: "Get left subtree height (or -1 if unbalanced)",
        9: "Short-circuit: left subtree already unbalanced",
        11: "Get right subtree height (or -1 if unbalanced)",
        12: "Short-circuit: right subtree already unbalanced",
        14: "Both subtrees balanced but heights differ by >1: unbalanced",
        16: "All good — return this subtree's height",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Balanced Tree",
          description: "A balanced tree — all nodes pass the height check",
          input: { tree: [3, 9, 20, null, null, 15, 7] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Call checkHeight(root)",
              explanation: "We call checkHeight on the root. If it returns -1, the tree is unbalanced. Any other value means balanced.",
              variables: { "node.val": 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "default", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "default", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "default", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 8],
              shortLabel: "checkHeight(3) → recurse left",
              explanation: "At root (3), recurse into left subtree first — node 9.",
              variables: { "node.val": 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "default", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "default", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["checkHeight(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 16],
              shortLabel: "Node 9 (leaf) → returns 1",
              explanation: "Node 9 is a leaf. Both children are null (height 0). |0 - 0| = 0 <= 1. Return height = 1.",
              variables: { "node.val": 9, leftH: 0, rightH: 0, diff: 0, returnVal: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "default", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["checkHeight(3)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11],
              shortLabel: "checkHeight(3) → recurse right → 20",
              explanation: "Back at root. leftH = 1 (not -1, so left subtree is balanced). Now check right subtree — node 20.",
              variables: { "node.val": 20, leftH: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "active", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["checkHeight(3)", "checkHeight(20)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 16],
              shortLabel: "Node 15 (leaf) → returns 1",
              explanation: "Recurse into node 20's left child — node 15. It's a leaf, returns height 1.",
              variables: { "node.val": 15, leftH: 0, rightH: 0, returnVal: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "visited", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["checkHeight(3)", "checkHeight(20)"],
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 16],
              shortLabel: "Node 7 (leaf) → returns 1",
              explanation: "Recurse into node 20's right child — node 7. Leaf, returns height 1.",
              variables: { "node.val": 7, leftH: 0, rightH: 0, returnVal: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "visited", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["checkHeight(3)", "checkHeight(20)"],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14, 16],
              shortLabel: "Node 20: |1-1|=0 ✓, returns 2",
              explanation: "At node 20: leftH=1, rightH=1. |1-1| = 0 <= 1. Balanced! Return height = 1 + max(1,1) = 2.",
              variables: { "node.val": 20, leftH: 1, rightH: 1, diff: 0, returnVal: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "found", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["checkHeight(3)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [14, 16, 2],
              shortLabel: "Root: |1-2|=1 ✓ → balanced!",
              explanation: "At root (3): leftH=1, rightH=2. |1-2| = 1 <= 1. Balanced! checkHeight returns 3 (not -1). The tree IS balanced.",
              variables: { "node.val": 3, leftH: 1, rightH: 2, diff: 1, returnVal: 3, answer: true },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "found", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "found", depth: 2 },
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
          label: "Unbalanced",
          description: "Tree that fails the balance check deep in the left subtree",
          input: { tree: [1, 2, 2, 3, 3, null, null, 4, 4] },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Call checkHeight(root)",
              explanation: "Call checkHeight on the root. This tree is left-heavy with 4 levels on the left but only 2 on the right.",
              variables: { "node.val": 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "default", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 2, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 3, left: 8, right: 9, state: "default", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "default", depth: 2 },
                  8: { val: 4, left: null, right: null, state: "default", depth: 3 },
                  9: { val: 4, left: null, right: null, state: "default", depth: 3 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8],
              shortLabel: "DFS left: 1 → 2 → 3 → 4",
              explanation: "Post-order DFS reaches the deepest left leaves first. Nodes 4,4 at depth 3 are leaves, returning height 1.",
              variables: { "node.val": 4, returnVal: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 2, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 3, left: 8, right: 9, state: "visited", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "default", depth: 2 },
                  8: { val: 4, left: null, right: null, state: "found", depth: 3 },
                  9: { val: 4, left: null, right: null, state: "found", depth: 3 },
                },
                callStack: ["checkHeight(1)", "checkHeight(2)", "checkHeight(3)"],
              },
              delta: { changedIndices: [8, 9] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [16],
              shortLabel: "Node 3(left): h=2, Node 3(right): h=1",
              explanation: "Node 3 (left child of 2) has height 2. Node 3 (right child of 2) is a leaf with height 1.",
              variables: { leftChildH: 2, rightChildH: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 2, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 3, left: 8, right: 9, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  8: { val: 4, left: null, right: null, state: "found", depth: 3 },
                  9: { val: 4, left: null, right: null, state: "found", depth: 3 },
                },
                callStack: ["checkHeight(1)", "checkHeight(2)"],
              },
              delta: { changedIndices: [4, 5] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [14, 16],
              shortLabel: "Node 2: |2-1|=1 ✓, h=3",
              explanation: "At left child (2): leftH=2, rightH=1. |2-1|=1 <= 1. Balanced here. Return height 3.",
              variables: { "node.val": 2, leftH: 2, rightH: 1, diff: 1, returnVal: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 2, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 3, left: 8, right: 9, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  8: { val: 4, left: null, right: null, state: "found", depth: 3 },
                  9: { val: 4, left: null, right: null, state: "found", depth: 3 },
                },
                callStack: ["checkHeight(1)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 16],
              shortLabel: "Right child (2): leaf, h=1",
              explanation: "Check right subtree of root. Node 2 (right) is a leaf. Returns height 1.",
              variables: { "node.val": 2, returnVal: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 2, left: null, right: null, state: "found", depth: 1 },
                  4: { val: 3, left: 8, right: 9, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  8: { val: 4, left: null, right: null, state: "found", depth: 3 },
                  9: { val: 4, left: null, right: null, state: "found", depth: 3 },
                },
                callStack: ["checkHeight(1)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14],
              shortLabel: "Root: |3-1|=2 > 1 → return -1!",
              explanation: "At root (1): leftH=3, rightH=1. |3-1| = 2 > 1. The tree is NOT balanced! Return -1 sentinel. checkHeight returned -1, so isBalanced returns false.",
              variables: { "node.val": 1, leftH: 3, rightH: 1, diff: 2, returnVal: -1, answer: false },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "eliminated", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 2, left: null, right: null, state: "found", depth: 1 },
                  4: { val: 3, left: 8, right: 9, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  8: { val: 4, left: null, right: null, state: "found", depth: 3 },
                  9: { val: 4, left: null, right: null, state: "found", depth: 3 },
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
            lineNumbers: [6],
            shortLabel: "Empty tree → balanced",
            explanation: "The tree is empty. An empty tree is balanced. Return true.",
            variables: { answer: true },
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

        const callStack = [];

        function makeTreeSnapshot() {
          const snap = {};
          for (const id in nodes) snap[id] = { ...nodes[id] };
          return snap;
        }

        function dfs(nodeId) {
          if (!nodeId || !nodes[nodeId]) return 0;

          const node = nodes[nodeId];
          callStack.push(`checkHeight(${node.val})`);
          nodes[nodeId].state = "active";

          steps.push({
            stepId: steps.length,
            lineNumbers: [5],
            shortLabel: `Visit node ${node.val}`,
            explanation: `Check subtree rooted at node ${node.val}.`,
            variables: { "node.val": node.val },
            dataStructure: { treeNodes: makeTreeSnapshot(), callStack: [...callStack] },
            delta: {},
            isAnswer: false,
          });

          nodes[nodeId].state = "visited";
          const leftH = dfs(node.left);
          if (leftH === -1) {
            callStack.pop();
            return -1;
          }

          const rightH = dfs(node.right);
          if (rightH === -1) {
            callStack.pop();
            return -1;
          }

          const diff = Math.abs(leftH - rightH);
          if (diff > 1) {
            nodes[nodeId].state = "eliminated";
            callStack.pop();

            steps.push({
              stepId: steps.length,
              lineNumbers: [14],
              shortLabel: `Node ${node.val}: |${leftH}-${rightH}|=${diff} > 1 → -1`,
              explanation: `At node ${node.val}: leftH=${leftH}, rightH=${rightH}. Difference = ${diff} > 1. Unbalanced! Return -1.`,
              variables: { "node.val": node.val, leftH, rightH, diff, returnVal: -1 },
              dataStructure: { treeNodes: makeTreeSnapshot(), callStack: [...callStack] },
              delta: { changedIndices: [nodeId] },
              isAnswer: false,
            });

            return -1;
          }

          const h = 1 + Math.max(leftH, rightH);
          nodes[nodeId].state = "found";
          callStack.pop();

          steps.push({
            stepId: steps.length,
            lineNumbers: [16],
            shortLabel: `Node ${node.val}: h=${h}`,
            explanation: `At node ${node.val}: leftH=${leftH}, rightH=${rightH}. |${leftH}-${rightH}|=${diff} <= 1. Balanced. Return height ${h}.`,
            variables: { "node.val": node.val, leftH, rightH, diff, returnVal: h },
            dataStructure: { treeNodes: makeTreeSnapshot(), callStack: [...callStack] },
            delta: { changedIndices: [nodeId] },
            isAnswer: false,
          });

          return h;
        }

        const result = dfs(1);
        const isBalanced = result !== -1;

        if (steps.length > 0) {
          steps[steps.length - 1].isAnswer = true;
          steps[steps.length - 1].variables.answer = isBalanced;
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n²)", space: "O(n)", explanation: "height() is O(n) and called at every node" },
    optimal: {
      time: "O(n)",
      space: "O(h)",
      explanation: "Single DFS pass. Each node visited exactly once. Stack depth = tree height.",
      tradeoff: "Use a sentinel (-1) to combine balance checking with height computation in one pass.",
    },
  },

  interviewTips: [
    "Define 'balanced' precisely: at every node, |leftHeight - rightHeight| <= 1.",
    "Explain the sentinel trick: returning -1 means 'already unbalanced, stop checking.'",
    "Contrast the O(n^2) naive (recalculates heights) vs O(n) optimal (single-pass).",
    "Mention early termination: if left subtree is unbalanced, don't even check the right.",
    "This pattern (piggyback a check onto height computation) recurs in diameter and path sum problems.",
  ],

  relatedProblems: ["max-depth-binary-tree", "diameter-binary-tree", "binary-tree-max-path-sum"],
};
