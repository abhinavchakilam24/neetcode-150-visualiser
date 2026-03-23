export const invertBinaryTree = {
  id: 46,
  slug: "invert-binary-tree",
  title: "Invert Binary Tree",
  difficulty: "Easy",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 46,
  artifactType: "BST",
  companies: ["Google", "Amazon", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/invert-binary-tree/",

  pattern: "Recursive DFS Tree Transformation",
  patternExplanation: `When you need to transform every node in a tree, use post-order DFS:
    recurse into both children first, then transform the current node using the results.
    This bottom-up approach naturally handles the entire tree without extra bookkeeping.`,

  intuition: {
    coreInsight: `Inverting a binary tree means swapping every node's left and right children.
      If you swap the children of the root, you still need to invert the left subtree and the
      right subtree independently. This is a textbook recursive structure: to invert a tree,
      invert both subtrees, then swap them at the current node. The base case is null — an
      empty tree is already its own mirror.`,

    mentalModel: `Imagine holding a tree drawing up to a mirror. Every left child becomes a
      right child and vice versa, at every level simultaneously. Now think about doing this
      bottom-up: first mirror the leaves (trivial — they have no children), then mirror their
      parents by swapping the already-mirrored subtrees. By the time you reach the root,
      everything below is already flipped — you just swap root.left and root.right.`,

    whyNaiveFails: `There's no "brute force" that's meaningfully worse here — any correct
      solution must visit every node at least once, giving O(n). The real trap is trying to
      do it iteratively without understanding the recursion: people forget that swapping at
      the root alone doesn't invert the subtrees. You must swap at every single node.`,

    keyObservation: `The order of operations doesn't actually matter for correctness — you
      can swap before recursing (pre-order), after recursing (post-order), or even use BFS.
      The key insight is that swapping at every node is both necessary and sufficient. Post-order
      is the most natural: "invert my children first, then swap them."`,
  },

  problem: `Given the root of a binary tree, invert the tree, and return its root.
    Inverting a binary tree means that every left child becomes the right child and every
    right child becomes the left child, at every node in the tree.`,

  examples: [
    {
      input: "root = [4,2,7,1,3,6,9]",
      output: "[4,7,2,9,6,3,1]",
      explanation: "The tree is mirrored: 2 and 7 swap, 1 and 3 swap, 6 and 9 swap.",
    },
    {
      input: "root = [2,1,3]",
      output: "[2,3,1]",
      explanation: "Left child 1 and right child 3 are swapped.",
    },
    {
      input: "root = []",
      output: "[]",
      explanation: "An empty tree is already inverted.",
    },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [0, 100].",
    "-100 <= Node.val <= 100",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Recursive DFS (Post-Order)",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      idea: `Recursively invert the left subtree and the right subtree, then swap
        root.left and root.right. Base case: if root is null, return null.`,

      javaCode: `public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;

    TreeNode left = invertTree(root.left);
    TreeNode right = invertTree(root.right);

    root.left = right;
    root.right = left;

    return root;
}`,

      cppCode: `TreeNode* invertTree(TreeNode* root) {
    if (root == nullptr) return nullptr;

    TreeNode* left = invertTree(root->left);
    TreeNode* right = invertTree(root->right);

    root->left = right;
    root->right = left;

    return root;
}`,

      pythonCode: `def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
    if not root:
        return None

    left = self.invertTree(root.left)
    right = self.invertTree(root.right)

    root.left = right
    root.right = left

    return root`,

      lineAnnotations: {
        1: "Take the root of the tree (or subtree) to invert",
        2: "Base case: null node — nothing to invert",
        4: "Recursively invert the entire left subtree",
        5: "Recursively invert the entire right subtree",
        7: "Swap: left child becomes the inverted right subtree",
        8: "Swap: right child becomes the inverted left subtree",
        10: "Return this node (now with swapped children) to the caller",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Full 7-node tree — shows complete recursive inversion",
          input: { tree: [4, 2, 7, 1, 3, 6, 9] },
          expectedOutput: "[4, 7, 2, 9, 6, 3, 1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Start at root (4)",
              explanation: "Begin at the root node with value 4. We'll recurse into both subtrees before swapping.",
              variables: { "root.val": 4, callDepth: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Recurse left → node 2",
              explanation: "Call invertTree(root.left) — recurse into the left subtree rooted at node 2.",
              variables: { "root.val": 2, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(2)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4],
              shortLabel: "Recurse left → node 1",
              explanation: "Call invertTree(root.left) on node 2 — recurse into leaf node 1.",
              variables: { "root.val": 1, callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "active", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(2)", "invertTree(1)"],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [2, 4, 5],
              shortLabel: "Node 1 is a leaf — both children null",
              explanation: "Node 1 has no children. invertTree(null) returns null for both left and right. Swap null with null — no change. Return node 1.",
              variables: { "root.val": 1, left: "null", right: "null", callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(2)"],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5],
              shortLabel: "Recurse right → node 3",
              explanation: "Back at node 2: left subtree (node 1) is inverted. Now call invertTree(root.right) on leaf node 3.",
              variables: { "root.val": 3, callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "active", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(2)", "invertTree(3)"],
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [2, 4, 5],
              shortLabel: "Node 3 is a leaf — return",
              explanation: "Node 3 has no children. Both recursive calls return null. Swap null with null — no change. Return node 3.",
              variables: { "root.val": 3, left: "null", right: "null", callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "visited", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(2)"],
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [7, 8],
              shortLabel: "Swap children of node 2: 1 <-> 3",
              explanation: "Back at node 2. Left subtree returned node 1, right subtree returned node 3. Now swap: root.left = right (node 3), root.right = left (node 1). Node 2's children are now [3, 1] instead of [1, 3].",
              variables: { "root.val": 2, "root.left": "3 (was 1)", "root.right": "1 (was 3)", callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "active", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(2)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [10],
              shortLabel: "Return inverted subtree (2)",
              explanation: "Node 2's subtree is fully inverted: [3, 1] instead of [1, 3]. Return node 2 to the caller (node 4).",
              variables: { "root.val": 2, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [5],
              shortLabel: "Recurse right → node 7",
              explanation: "Back at root (4). Left subtree is fully inverted. Now call invertTree(root.right) on node 7.",
              variables: { "root.val": 7, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "active", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(7)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [4],
              shortLabel: "Recurse left → node 6",
              explanation: "At node 7, recurse into left child — leaf node 6.",
              variables: { "root.val": 6, callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "visited", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "active", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(7)", "invertTree(6)"],
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [2, 4, 5],
              shortLabel: "Node 6 is a leaf — return",
              explanation: "Node 6 has no children. Return node 6 unchanged.",
              variables: { "root.val": 6, left: "null", right: "null", callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "visited", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(7)"],
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [5],
              shortLabel: "Recurse right → node 9",
              explanation: "Back at node 7. Left child (6) is done. Now recurse into right child — leaf node 9.",
              variables: { "root.val": 9, callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "visited", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(7)", "invertTree(9)"],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [2, 4, 5],
              shortLabel: "Node 9 is a leaf — return",
              explanation: "Node 9 has no children. Return node 9 unchanged.",
              variables: { "root.val": 9, left: "null", right: "null", callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 6, right: 7, state: "visited", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(7)"],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 13,
              lineNumbers: [7, 8],
              shortLabel: "Swap children of node 7: 6 <-> 9",
              explanation: "Back at node 7. Left returned node 6, right returned node 9. Swap: root.left = 9, root.right = 6. Node 7's children are now [9, 6] instead of [6, 9].",
              variables: { "root.val": 7, "root.left": "9 (was 6)", "root.right": "6 (was 9)", callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 7, right: 6, state: "active", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["invertTree(4)", "invertTree(7)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 14,
              lineNumbers: [10],
              shortLabel: "Return inverted subtree (7)",
              explanation: "Node 7's subtree is fully inverted: [9, 6] instead of [6, 9]. Return node 7 to the root.",
              variables: { "root.val": 7, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 7, right: 6, state: "found", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["invertTree(4)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 15,
              lineNumbers: [7, 8],
              shortLabel: "Swap children of root (4): 2 <-> 7",
              explanation: "Back at root (4). Left returned inverted subtree rooted at 2, right returned inverted subtree rooted at 7. Swap: root.left = 7, root.right = 2. The entire tree is now inverted!",
              variables: { "root.val": 4, "root.left": "7 (was 2)", "root.right": "2 (was 7)", callDepth: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 3, right: 2, state: "active", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 7, right: 6, state: "found", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["invertTree(4)"],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 16,
              lineNumbers: [10],
              shortLabel: "Return root — tree fully inverted!",
              explanation: "The entire tree is inverted. Original [4,2,7,1,3,6,9] is now [4,7,2,9,6,3,1]. Every node's left and right children have been swapped, bottom-up.",
              variables: { answer: "[4, 7, 2, 9, 6, 3, 1]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 4, left: 3, right: 2, state: "found", depth: 0 },
                  2: { val: 2, left: 5, right: 4, state: "found", depth: 1 },
                  3: { val: 7, left: 7, right: 6, state: "found", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  6: { val: 6, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "found", depth: 2 },
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
          label: "Simple 3-Node",
          description: "Minimal tree with root and two children — simplest non-trivial case",
          input: { tree: [2, 1, 3] },
          expectedOutput: "[2, 3, 1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Start at root (2)",
              explanation: "Begin at the root node with value 2. It has left child 1 and right child 3.",
              variables: { "root.val": 2, callDepth: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 2, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 1, left: null, right: null, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                },
                callStack: ["invertTree(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Recurse left → node 1 (leaf)",
              explanation: "Call invertTree(root.left) on node 1. It's a leaf — both children are null. Return node 1 unchanged.",
              variables: { "root.val": 1, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 2, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 1, left: null, right: null, state: "active", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                },
                callStack: ["invertTree(2)", "invertTree(1)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [2],
              shortLabel: "Node 1 is a leaf — return",
              explanation: "Node 1 has no children. Both recursive calls hit the null base case. Return node 1.",
              variables: { "root.val": 1, left: "null", right: "null", callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 2, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 1, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                },
                callStack: ["invertTree(2)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5],
              shortLabel: "Recurse right → node 3 (leaf)",
              explanation: "Back at root (2). Now call invertTree(root.right) on node 3. It's also a leaf.",
              variables: { "root.val": 3, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 2, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 1, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "active", depth: 1 },
                },
                callStack: ["invertTree(2)", "invertTree(3)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [2],
              shortLabel: "Node 3 is a leaf — return",
              explanation: "Node 3 has no children. Return node 3 unchanged.",
              variables: { "root.val": 3, left: "null", right: "null", callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 2, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 1, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 1 },
                },
                callStack: ["invertTree(2)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8],
              shortLabel: "Swap children of root (2): 1 <-> 3",
              explanation: "Back at root (2). Left returned node 1, right returned node 3. Swap: root.left = 3, root.right = 1. Done!",
              variables: { "root.val": 2, "root.left": "3 (was 1)", "root.right": "1 (was 3)", callDepth: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 2, left: 3, right: 2, state: "active", depth: 0 },
                  2: { val: 1, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 1 },
                },
                callStack: ["invertTree(2)"],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10],
              shortLabel: "Return root — tree inverted!",
              explanation: "The tree is fully inverted. Original [2, 1, 3] is now [2, 3, 1]. Left and right children have been swapped.",
              variables: { answer: "[2, 3, 1]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 2, left: 3, right: 2, state: "found", depth: 0 },
                  2: { val: 1, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 1 },
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

        if (!tree || tree.length === 0) {
          steps.push({
            stepId: 0,
            lineNumbers: [2],
            shortLabel: "Empty tree — return null",
            explanation: "The tree is empty (root is null). Return null immediately.",
            variables: { root: "null" },
            dataStructure: { treeNodes: {}, callStack: [] },
            delta: {},
            isAnswer: true,
          });
          return steps;
        }

        // Build tree from level-order array
        // nodeId is 1-based; tree array is 0-based
        const nodes = {};
        const nodeCount = tree.length;

        for (let i = 0; i < nodeCount; i++) {
          if (tree[i] === null || tree[i] === undefined) continue;
          const nodeId = i + 1;
          const leftIdx = 2 * i + 1;
          const rightIdx = 2 * i + 2;
          const depth = Math.floor(Math.log2(nodeId));
          nodes[nodeId] = {
            val: tree[i],
            left: leftIdx < nodeCount && tree[leftIdx] != null ? leftIdx + 1 : null,
            right: rightIdx < nodeCount && tree[rightIdx] != null ? rightIdx + 1 : null,
            state: "default",
            depth,
          };
        }

        const callStack = [];

        function makeTreeSnapshot(overrides) {
          const snapshot = {};
          for (const id in nodes) {
            snapshot[id] = { ...nodes[id] };
          }
          if (overrides) {
            for (const id in overrides) {
              if (snapshot[id]) {
                snapshot[id] = { ...snapshot[id], ...overrides[id] };
              }
            }
          }
          return snapshot;
        }

        function dfs(nodeId) {
          if (!nodeId || !nodes[nodeId]) return;

          const node = nodes[nodeId];
          callStack.push(`invertTree(${node.val})`);

          // Visit node
          nodes[nodeId].state = "active";
          steps.push({
            stepId: steps.length,
            lineNumbers: [1],
            shortLabel: `Visit node ${node.val}`,
            explanation: `Arrive at node ${node.val}. We'll recurse into both children before swapping.`,
            variables: { "root.val": node.val, callDepth: callStack.length - 1 },
            dataStructure: {
              treeNodes: makeTreeSnapshot(),
              callStack: [...callStack],
            },
            delta: {},
            isAnswer: false,
          });

          const hasLeft = node.left && nodes[node.left];
          const hasRight = node.right && nodes[node.right];

          // Recurse left
          if (hasLeft) {
            nodes[nodeId].state = "visited";
            dfs(node.left);
          }

          // Recurse right
          if (hasRight) {
            nodes[nodeId].state = "visited";
            dfs(node.right);
          }

          // If leaf node
          if (!hasLeft && !hasRight) {
            nodes[nodeId].state = "found";
            callStack.pop();
            steps.push({
              stepId: steps.length,
              lineNumbers: [2],
              shortLabel: `Node ${node.val} is a leaf — return`,
              explanation: `Node ${node.val} has no children. Both recursive calls return null. Return node ${node.val}.`,
              variables: { "root.val": node.val, left: "null", right: "null" },
              dataStructure: {
                treeNodes: makeTreeSnapshot(),
                callStack: [...callStack],
              },
              delta: {},
              isAnswer: false,
            });
            return;
          }

          // Swap children
          const oldLeft = nodes[nodeId].left;
          const oldRight = nodes[nodeId].right;
          nodes[nodeId].left = oldRight;
          nodes[nodeId].right = oldLeft;
          nodes[nodeId].state = "active";

          const leftVal = oldLeft && nodes[oldLeft] ? nodes[oldLeft].val : "null";
          const rightVal = oldRight && nodes[oldRight] ? nodes[oldRight].val : "null";

          steps.push({
            stepId: steps.length,
            lineNumbers: [7, 8],
            shortLabel: `Swap children of ${node.val}: ${leftVal} <-> ${rightVal}`,
            explanation: `Back at node ${node.val}. Swap left (${leftVal}) and right (${rightVal}). Node ${node.val}'s children are now [${rightVal}, ${leftVal}].`,
            variables: {
              "root.val": node.val,
              "root.left": `${rightVal} (was ${leftVal})`,
              "root.right": `${leftVal} (was ${rightVal})`,
            },
            dataStructure: {
              treeNodes: makeTreeSnapshot(),
              callStack: [...callStack],
            },
            delta: {},
            isAnswer: false,
          });

          // Return
          nodes[nodeId].state = "found";
          callStack.pop();

          steps.push({
            stepId: steps.length,
            lineNumbers: [10],
            shortLabel: `Return inverted subtree (${node.val})`,
            explanation: `Node ${node.val}'s subtree is fully inverted. Return to caller.`,
            variables: { "root.val": node.val },
            dataStructure: {
              treeNodes: makeTreeSnapshot(),
              callStack: [...callStack],
            },
            delta: {},
            isAnswer: false,
          });
        }

        dfs(1);

        // Mark last step as answer
        if (steps.length > 0) {
          steps[steps.length - 1].isAnswer = true;

          // Build result array from inverted tree
          const result = [];
          const queue = [1];
          while (queue.length > 0) {
            const id = queue.shift();
            if (!id || !nodes[id]) {
              continue;
            }
            result.push(nodes[id].val);
            if (nodes[id].left) queue.push(nodes[id].left);
            if (nodes[id].right) queue.push(nodes[id].right);
          }
          steps[steps.length - 1].variables = { answer: JSON.stringify(result) };
          steps[steps.length - 1].shortLabel = "Tree fully inverted!";
          steps[steps.length - 1].explanation = `The entire tree is inverted. Result: [${result.join(", ")}].`;
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: null,
    optimal: {
      time: "O(n)",
      space: "O(h)",
      explanation: "Visit every node exactly once. Recursion stack depth equals tree height h (O(log n) balanced, O(n) skewed).",
      tradeoff: "No space-time tradeoff — O(n) time is mandatory since every node must be swapped. O(h) stack space is the cost of recursion.",
    },
  },

  interviewTips: [
    "Start by clarifying: 'Invert means swap left and right children at every node, correct?'",
    "Mention the recursive structure immediately: 'This is a natural recursive problem — to invert a tree, invert both subtrees, then swap.'",
    "State the base case clearly: 'If the node is null, return null.'",
    "Point out that pre-order, post-order, and BFS all work — the key is swapping at every node.",
    "Mention time complexity O(n) and space O(h) for the recursion stack — distinguish balanced O(log n) from worst-case O(n).",
    "If asked for iterative: use a queue (BFS) — pop a node, swap its children, push non-null children.",
    "This is a classic 'easy but reveals depth' problem — interviewers watch how cleanly you handle recursion.",
  ],

  relatedProblems: ["max-depth-binary-tree", "same-tree", "subtree-of-another-tree", "balanced-binary-tree"],
};
