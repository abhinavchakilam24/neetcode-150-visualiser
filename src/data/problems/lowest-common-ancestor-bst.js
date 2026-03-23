export const lowestCommonAncestorBst = {
  id: 52,
  slug: "lowest-common-ancestor-bst",
  title: "Lowest Common Ancestor of BST",
  difficulty: "Medium",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 52,
  artifactType: "BST",
  companies: ["Amazon", "Meta", "Google", "Microsoft", "LinkedIn"],
  leetcodeLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",

  pattern: "BST Property Exploitation",
  patternExplanation: `In a BST, all values in the left subtree are less than the root and all values
    in the right subtree are greater. Use this ordering to navigate directly to the LCA without
    exploring the entire tree.`,

  intuition: {
    coreInsight: `In a BST, the lowest common ancestor of two nodes p and q is the first node
      where p and q "split" — one goes left and the other goes right (or the node IS p or q).
      If both p and q are less than the current node, the LCA must be in the left subtree.
      If both are greater, the LCA must be in the right subtree. The moment they split (or we
      land on one of them), we've found the LCA.`,

    mentalModel: `Imagine walking down a highway that keeps forking. You're looking for the last
      fork where two friends (p and q) were still on the same road. At each fork, the BST tells
      you: smaller values go left, larger values go right. If both friends need to go left, you
      follow them left. If both need to go right, you follow them right. The moment one friend
      goes left and the other goes right — that fork is where they split. That's the LCA.`,

    whyNaiveFails: `A generic LCA algorithm on a binary tree (not BST) requires visiting every node
      to find p and q, giving O(n). But we're given a BST! The BST property lets us eliminate
      half the tree at each step, similar to binary search, giving O(h) where h is the height.
      For a balanced BST, that's O(log n) — exponentially better.`,

    keyObservation: `The split condition is the key: if p.val < node.val and q.val < node.val,
      go left. If p.val > node.val and q.val > node.val, go right. Otherwise, the current
      node IS the LCA. This works even when the current node equals p or q, because a node
      is considered an ancestor of itself.`,
  },

  problem: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two
    given nodes in the BST. The lowest common ancestor is the lowest node in the tree that has
    both p and q as descendants (where we allow a node to be a descendant of itself).`,

  examples: [
    {
      input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
      output: "6",
      explanation: "Node 2 is in the left subtree and node 8 is in the right subtree of 6. They split at 6.",
    },
    {
      input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
      output: "2",
      explanation: "Node 4 is a descendant of node 2. Node 2 is its own ancestor, so LCA is 2.",
    },
    {
      input: "root = [2,1], p = 2, q = 1",
      output: "2",
      explanation: "The root 2 is the ancestor of 1. LCA is 2.",
    },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [2, 10^5].",
    "-10^9 <= Node.val <= 10^9",
    "All Node.val are unique.",
    "p != q",
    "p and q will exist in the BST.",
  ],

  approaches: {
    brute: {
      label: "Generic LCA (Ignore BST Property)",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Treat the tree as a regular binary tree. Use DFS to find p and q, then find where
        paths diverge. This ignores the BST property and visits unnecessary nodes.`,

      javaCode: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;

    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);

    if (left != null && right != null) return root;
    return left != null ? left : right;
}`,

      cppCode: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (root == nullptr || root == p || root == q) return root;

    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);

    if (left != nullptr && right != nullptr) return root;
    return left != nullptr ? left : right;
}`,

      pythonCode: `def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    if not root or root == p or root == q:
        return root

    left = self.lowestCommonAncestor(root.left, p, q)
    right = self.lowestCommonAncestor(root.right, p, q)

    if left and right:
        return root
    return left if left else right`,

      lineAnnotations: {
        1: "Generic LCA — ignores BST ordering property",
        2: "Base case: found p, q, or reached null",
        4: "Search left subtree for p and q",
        5: "Search right subtree for p and q",
        7: "Both found on different sides → this node is the LCA",
        8: "Only one side found something → propagate it up",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { tree: [6, 2, 8, 0, 4, 7, 9], p: 2, q: 8 },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Start at root (6)",
              explanation: "Begin at root node 6. It's not p (2) and not q (8). Search both subtrees.",
              variables: { "root.val": 6, "p": 2, "q": 8 },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["LCA(6, 2, 8)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Recurse left → found p=2",
              explanation: "Search left subtree. Hit node 2 — that's p! Return node 2 immediately (base case).",
              variables: { "root.val": 2, "p": 2, leftResult: "node(2)" },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["LCA(6, 2, 8)", "LCA(2, 2, 8)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "Recurse right → found q=8",
              explanation: "Search right subtree. Hit node 8 — that's q! Return node 8 immediately.",
              variables: { "root.val": 8, "q": 8, rightResult: "node(8)" },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "found", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["LCA(6, 2, 8)", "LCA(8, 2, 8)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7],
              shortLabel: "Left=2, Right=8 → LCA is 6!",
              explanation: "Back at root 6. Left search returned node 2, right search returned node 8. Both are non-null, meaning p and q are on opposite sides. Node 6 is the LCA.",
              variables: { "root.val": 6, leftResult: "node(2)", rightResult: "node(8)", answer: "6" },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "found", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: { changedIndices: [1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tree, p, q }) {
        const steps = [];
        function buildTree(arr) {
          if (!arr || arr.length === 0) return null;
          const nodes = arr.map((v, i) => v !== null ? { val: v, left: null, right: null } : null);
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i]) {
              const li = 2 * i + 1, ri = 2 * i + 2;
              nodes[i].left = li < nodes.length ? nodes[li] : null;
              nodes[i].right = ri < nodes.length ? nodes[ri] : null;
            }
          }
          return nodes[0];
        }
        const root = buildTree(tree);
        // Simple step generation for brute force
        steps.push({
          stepId: 0, lineNumbers: [1],
          shortLabel: "Start generic LCA",
          explanation: `Search entire tree for p=${p} and q=${q} without using BST property.`,
          variables: { p, q },
          dataStructure: { treeNodes: {}, callStack: ["LCA(root)"] },
          delta: {}, isAnswer: false,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "BST-Guided Walk",
      tier: "optimal",
      timeComplexity: "O(h)",
      spaceComplexity: "O(1)",
      idea: `Starting from root, if both p and q are smaller, go left. If both are larger, go right.
        Otherwise, the current node is the LCA (the split point).`,

      javaCode: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    TreeNode curr = root;

    while (curr != null) {
        if (p.val < curr.val && q.val < curr.val) {
            curr = curr.left;
        } else if (p.val > curr.val && q.val > curr.val) {
            curr = curr.right;
        } else {
            return curr;
        }
    }

    return null;
}`,

      cppCode: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    TreeNode* curr = root;

    while (curr != nullptr) {
        if (p->val < curr->val && q->val < curr->val) {
            curr = curr->left;
        } else if (p->val > curr->val && q->val > curr->val) {
            curr = curr->right;
        } else {
            return curr;
        }
    }

    return nullptr;
}`,

      pythonCode: `def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    curr = root

    while curr:
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            return curr

    return None`,

      lineAnnotations: {
        1: "Start from the root of the BST",
        2: "Initialize current pointer at root",
        4: "Walk down the tree",
        5: "Both p and q are smaller → LCA must be in left subtree",
        6: "Move left",
        7: "Both p and q are larger → LCA must be in right subtree",
        8: "Move right",
        9: "Split point! p and q are on different sides (or we're at p or q)",
        10: "This node is the LCA",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Split at Root",
          description: "p and q are on opposite sides of the root",
          input: { tree: [6, 2, 8, 0, 4, 7, 9], p: 2, q: 8 },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Start at root (6)",
              explanation: "Begin at the root node with value 6. We need to find the LCA of p=2 and q=8.",
              variables: { "curr.val": 6, p: 2, q: 8 },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5],
              shortLabel: "p=2 < 6? YES. q=8 < 6? NO.",
              explanation: "Check: are both p and q less than curr (6)? p=2 < 6, but q=8 > 6. Condition fails — they're NOT both on the left.",
              variables: { "curr.val": 6, p: 2, q: 8, "both < curr?": false },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "pointer", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "pointer", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7],
              shortLabel: "p=2 > 6? NO. → Split point!",
              explanation: "Check: are both p and q greater than curr (6)? p=2 < 6. Condition fails. Since neither condition holds, p and q are on different sides of node 6. This is the split point!",
              variables: { "curr.val": 6, p: 2, q: 8, "both > curr?": false },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "pointer", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "pointer", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9, 10],
              shortLabel: "Return 6 — LCA found!",
              explanation: "p=2 goes left, q=8 goes right. Node 6 is where they split. Return 6 as the lowest common ancestor. We only visited ONE node — O(1) for this case!",
              variables: { "curr.val": 6, answer: "6" },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "pointer", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "pointer", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
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
          label: "Ancestor is One of the Nodes",
          description: "p=2, q=4 — node 2 is the ancestor of 4, so LCA is 2 itself",
          input: { tree: [6, 2, 8, 0, 4, 7, 9], p: 2, q: 4 },
          expectedOutput: "2",
          commonMistake: "Thinking the LCA must be a node above both p and q. A node is allowed to be a descendant of itself, so if p is an ancestor of q, then p is the LCA.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Start at root (6)",
              explanation: "Begin at root node 6. Looking for LCA of p=2 and q=4.",
              variables: { "curr.val": 6, p: 2, q: 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "p=2 < 6 AND q=4 < 6 → go left",
              explanation: "Both p=2 and q=4 are less than curr=6. The LCA must be in the left subtree. Move left to node 2.",
              variables: { "curr.val": 6, p: 2, q: 4, "both < curr?": true },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "p=2 < 2? NO. → Not both less",
              explanation: "At node 2. Check: are both p=2 and q=4 less than curr=2? p=2 is NOT less than 2. Condition fails.",
              variables: { "curr.val": 2, p: 2, q: 4, "both < curr?": false },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7],
              shortLabel: "p=2 > 2? NO. → Split point!",
              explanation: "Check: are both greater than 2? p=2 is NOT greater than 2. Neither condition holds. This means curr IS the split point. Since p=2 equals curr.val=2, the current node IS p, and q=4 is in its right subtree.",
              variables: { "curr.val": 2, p: 2, q: 4, "both > curr?": false },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "pointer", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10],
              shortLabel: "Return 2 — LCA found!",
              explanation: "Node 2 is the LCA. It IS p itself, and q=4 is its descendant. A node is its own ancestor, so this is correct. Only visited 2 nodes — O(h) in action.",
              variables: { "curr.val": 2, answer: "2" },
              dataStructure: {
                treeNodes: {
                  1: { val: 6, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 8, left: 6, right: 7, state: "default", depth: 1 },
                  4: { val: 0, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "pointer", depth: 2 },
                  6: { val: 7, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 9, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: { changedIndices: [2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tree, p, q }) {
        const steps = [];

        function buildTree(arr) {
          if (!arr || arr.length === 0) return null;
          const nodes = arr.map((v, i) => v !== null ? { val: v, left: null, right: null } : null);
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i]) {
              const li = 2 * i + 1, ri = 2 * i + 2;
              nodes[i].left = li < nodes.length ? nodes[li] : null;
              nodes[i].right = ri < nodes.length ? nodes[ri] : null;
            }
          }
          return nodes[0];
        }

        const root = buildTree(tree);
        const nodeStates = {};

        function getTreeNodes(node, depth) {
          const result = {};
          let counter = { val: 1 };
          function traverse(n, d) {
            if (!n) return null;
            const id = counter.val++;
            const leftId = traverse(n.left, d + 1);
            const rightId = traverse(n.right, d + 1);
            result[id] = {
              val: n.val, left: leftId, right: rightId,
              state: nodeStates[n.val] || "default", depth: d,
            };
            return id;
          }
          traverse(node, 0);
          return result;
        }

        let curr = root;
        nodeStates[curr.val] = "active";
        steps.push({
          stepId: 0, lineNumbers: [1, 2],
          shortLabel: `Start at root (${curr.val})`,
          explanation: `Begin at root node ${curr.val}. Looking for LCA of p=${p} and q=${q}.`,
          variables: { "curr.val": curr.val, p, q },
          dataStructure: { treeNodes: getTreeNodes(root, 0), callStack: [] },
          delta: {}, isAnswer: false,
        });

        while (curr) {
          if (p < curr.val && q < curr.val) {
            nodeStates[curr.val] = "visited";
            curr = curr.left;
            if (curr) nodeStates[curr.val] = "active";
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6],
              shortLabel: `Both < ${curr ? curr.val : '?'} → go left`,
              explanation: `Both p=${p} and q=${q} are less than ${nodeStates[curr?.val] ? curr.val : '?'}. Move left.`,
              variables: { "curr.val": curr ? curr.val : null, p, q },
              dataStructure: { treeNodes: getTreeNodes(root, 0), callStack: [] },
              delta: {}, isAnswer: false,
            });
          } else if (p > curr.val && q > curr.val) {
            nodeStates[curr.val] = "visited";
            curr = curr.right;
            if (curr) nodeStates[curr.val] = "active";
            steps.push({
              stepId: steps.length, lineNumbers: [7, 8],
              shortLabel: `Both > ${curr ? curr.val : '?'} → go right`,
              explanation: `Both p=${p} and q=${q} are greater than previous node. Move right.`,
              variables: { "curr.val": curr ? curr.val : null, p, q },
              dataStructure: { treeNodes: getTreeNodes(root, 0), callStack: [] },
              delta: {}, isAnswer: false,
            });
          } else {
            nodeStates[curr.val] = "found";
            steps.push({
              stepId: steps.length, lineNumbers: [9, 10],
              shortLabel: `Split point! LCA = ${curr.val}`,
              explanation: `p=${p} and q=${q} split at node ${curr.val}. This is the LCA!`,
              variables: { "curr.val": curr.val, answer: String(curr.val) },
              dataStructure: { treeNodes: getTreeNodes(root, 0), callStack: [] },
              delta: {}, isAnswer: true,
            });
            break;
          }
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(n)", explanation: "Generic LCA visits all nodes; recursion stack can be O(n)" },
    optimal: { time: "O(h)", space: "O(1)", explanation: "Walk down one path; O(log n) for balanced BST, O(n) for skewed", tradeoff: "Exploiting BST property eliminates half the tree at each step" },
  },

  interviewTips: [
    "Immediately mention the BST property — interviewers want to see you exploit it.",
    "Explain the split condition clearly: both left, both right, or split.",
    "Note the iterative solution uses O(1) space — no recursion needed.",
    "Clarify edge case: a node can be its own ancestor.",
    "Compare with generic LCA on a binary tree (uses DFS, O(n) time).",
  ],

  relatedProblems: ["validate-bst", "same-tree", "binary-search"],
};
