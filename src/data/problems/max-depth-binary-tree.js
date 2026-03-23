export const maxDepthBinaryTree = {
  id: 47,
  slug: "max-depth-binary-tree",
  title: "Maximum Depth of Binary Tree",
  difficulty: "Easy",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 47,
  artifactType: "BST",
  companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",

  pattern: "Recursive DFS Depth Calculation",
  patternExplanation: `To find the depth of a tree, recurse into both subtrees and return
    1 + max(leftDepth, rightDepth). The base case is null returning 0.`,

  intuition: {
    coreInsight: `The maximum depth of a binary tree is the longest path from the root
      to any leaf. At every node, the max depth is 1 (for the current node) plus the
      greater of the left subtree's depth and the right subtree's depth. A null node
      has depth 0. This recursive definition directly translates to code.`,

    mentalModel: `Imagine you're in a building and you want to find the tallest tower.
      You stand at the root floor and send two scouts: one goes left, one goes right.
      Each scout does the same at every fork. When a scout hits a dead end (null), they
      report back "0 floors." Each junction adds 1 to the taller report it receives.
      The root gets the final answer: the height of the tallest tower.`,

    whyNaiveFails: `There's no meaningfully worse approach — any correct solution must
      visit every node at least once to confirm the deepest path, giving O(n). The
      subtlety is understanding that you can't just follow one branch: you must explore
      all paths to find the longest one. BFS (level-order) also works in O(n) but uses
      O(n) space for the queue vs O(h) for DFS recursion.`,

    keyObservation: `The recurrence is: depth(node) = 1 + max(depth(left), depth(right)),
      with depth(null) = 0. This is the simplest tree recursion pattern and forms the
      basis for many harder tree problems like diameter and balanced checks.`,
  },

  problem: `Given the root of a binary tree, return its maximum depth. A binary tree's
    maximum depth is the number of nodes along the longest path from the root node down
    to the farthest leaf node.`,

  examples: [
    {
      input: "root = [3,9,20,null,null,15,7]",
      output: "3",
      explanation: "The longest path is 3 → 20 → 15 (or 3 → 20 → 7), which has 3 nodes.",
    },
    {
      input: "root = [1,null,2]",
      output: "2",
      explanation: "The path 1 → 2 has 2 nodes.",
    },
    {
      input: "root = []",
      output: "0",
      explanation: "An empty tree has depth 0.",
    },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [0, 10^4].",
    "-100 <= Node.val <= 100",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Recursive DFS",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      idea: `Recursively compute the depth of the left and right subtrees.
        Return 1 + max(leftDepth, rightDepth). Base case: null returns 0.`,

      javaCode: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;

    int leftDepth = maxDepth(root.left);
    int rightDepth = maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
}`,

      cppCode: `int maxDepth(TreeNode* root) {
    if (root == nullptr) return 0;

    int leftDepth = maxDepth(root->left);
    int rightDepth = maxDepth(root->right);

    return 1 + max(leftDepth, rightDepth);
}`,

      pythonCode: `def maxDepth(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0

    left_depth = self.maxDepth(root.left)
    right_depth = self.maxDepth(root.right)

    return 1 + max(left_depth, right_depth)`,

      lineAnnotations: {
        1: "Take the root of the tree (or subtree)",
        2: "Base case: null node has depth 0",
        4: "Recursively find the depth of the left subtree",
        5: "Recursively find the depth of the right subtree",
        7: "This node adds 1; take the deeper subtree",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Balanced tree with depth 3 — shows full recursive depth calculation",
          input: { tree: [3, 9, 20, null, null, 15, 7] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Start at root (3)",
              explanation: "Begin at the root node with value 3. We need to find the depth of both subtrees.",
              variables: { "root.val": 3, callDepth: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "default", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "default", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Recurse left → node 9",
              explanation: "Call maxDepth(root.left) — recurse into node 9.",
              variables: { "root.val": 9, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "active", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "default", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(3)", "maxDepth(9)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [2, 4, 5],
              shortLabel: "Node 9 is a leaf → left=0, right=0",
              explanation: "Node 9 has no children. maxDepth(null) returns 0 for both left and right. leftDepth=0, rightDepth=0.",
              variables: { "root.val": 9, leftDepth: 0, rightDepth: 0, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "active", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "default", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(3)", "maxDepth(9)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7],
              shortLabel: "Node 9 returns 1 + max(0,0) = 1",
              explanation: "1 + max(0, 0) = 1. Node 9 is a leaf at depth 1. Return 1 to the caller (node 3).",
              variables: { "root.val": 9, leftDepth: 0, rightDepth: 0, result: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "default", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(3)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5],
              shortLabel: "Recurse right → node 20",
              explanation: "Back at root (3). Left subtree returned depth 1. Now recurse into right subtree at node 20.",
              variables: { "root.val": 20, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "active", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "default", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(3)", "maxDepth(20)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4],
              shortLabel: "Recurse left → node 15",
              explanation: "At node 20, recurse into left child — leaf node 15.",
              variables: { "root.val": 15, callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "visited", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "active", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(3)", "maxDepth(20)", "maxDepth(15)"],
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [7],
              shortLabel: "Node 15 returns 1",
              explanation: "Node 15 is a leaf. Both children are null → leftDepth=0, rightDepth=0. Return 1 + max(0,0) = 1.",
              variables: { "root.val": 15, leftDepth: 0, rightDepth: 0, result: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "visited", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(3)", "maxDepth(20)"],
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5],
              shortLabel: "Recurse right → node 7",
              explanation: "Back at node 20. Left subtree (15) returned depth 1. Now recurse into right child — leaf node 7.",
              variables: { "root.val": 7, callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "visited", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["maxDepth(3)", "maxDepth(20)", "maxDepth(7)"],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [7],
              shortLabel: "Node 7 returns 1",
              explanation: "Node 7 is a leaf. Return 1 + max(0,0) = 1.",
              variables: { "root.val": 7, leftDepth: 0, rightDepth: 0, result: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "visited", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["maxDepth(3)", "maxDepth(20)"],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [7],
              shortLabel: "Node 20 returns 1 + max(1,1) = 2",
              explanation: "Back at node 20. Left depth = 1, right depth = 1. Return 1 + max(1, 1) = 2.",
              variables: { "root.val": 20, leftDepth: 1, rightDepth: 1, result: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 6, right: 7, state: "found", depth: 1 },
                  6: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  7: { val: 7, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["maxDepth(3)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [7],
              shortLabel: "Root returns 1 + max(1,2) = 3",
              explanation: "Back at root (3). Left depth = 1 (node 9), right depth = 2 (node 20). Return 1 + max(1, 2) = 3. The maximum depth of the tree is 3.",
              variables: { "root.val": 3, leftDepth: 1, rightDepth: 2, answer: 3 },
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
          label: "Skewed Right",
          description: "Linear chain — worst case for recursion depth",
          input: { tree: [1, null, 2, null, null, null, 3] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Start at root (1)",
              explanation: "Begin at root node 1. It has no left child and right child 2. This is a skewed tree.",
              variables: { "root.val": 1, callDepth: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: null, right: 3, state: "active", depth: 0 },
                  3: { val: 2, left: null, right: 7, state: "default", depth: 1 },
                  7: { val: 3, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Left is null → leftDepth = 0",
              explanation: "Node 1 has no left child. maxDepth(null) returns 0. leftDepth = 0.",
              variables: { "root.val": 1, leftDepth: 0, callDepth: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: null, right: 3, state: "active", depth: 0 },
                  3: { val: 2, left: null, right: 7, state: "default", depth: 1 },
                  7: { val: 3, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "Recurse right → node 2",
              explanation: "Recurse into right child — node 2.",
              variables: { "root.val": 2, callDepth: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: null, right: 3, state: "visited", depth: 0 },
                  3: { val: 2, left: null, right: 7, state: "active", depth: 1 },
                  7: { val: 3, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["maxDepth(1)", "maxDepth(2)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5],
              shortLabel: "Recurse right → node 3",
              explanation: "Node 2 also has no left child (leftDepth=0). Recurse into right child — node 3.",
              variables: { "root.val": 3, callDepth: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: null, right: 3, state: "visited", depth: 0 },
                  3: { val: 2, left: null, right: 7, state: "visited", depth: 1 },
                  7: { val: 3, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["maxDepth(1)", "maxDepth(2)", "maxDepth(3)"],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7],
              shortLabel: "Node 3 is a leaf → returns 1",
              explanation: "Node 3 has no children. Return 1 + max(0, 0) = 1.",
              variables: { "root.val": 3, leftDepth: 0, rightDepth: 0, result: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: null, right: 3, state: "visited", depth: 0 },
                  3: { val: 2, left: null, right: 7, state: "visited", depth: 1 },
                  7: { val: 3, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["maxDepth(1)", "maxDepth(2)"],
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7],
              shortLabel: "Node 2 returns 1 + max(0,1) = 2",
              explanation: "Back at node 2. Left depth = 0, right depth = 1. Return 1 + max(0, 1) = 2.",
              variables: { "root.val": 2, leftDepth: 0, rightDepth: 1, result: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: null, right: 3, state: "visited", depth: 0 },
                  3: { val: 2, left: null, right: 7, state: "found", depth: 1 },
                  7: { val: 3, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["maxDepth(1)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [7],
              shortLabel: "Root returns 1 + max(0,2) = 3",
              explanation: "Back at root (1). Left depth = 0, right depth = 2. Return 1 + max(0, 2) = 3. The max depth is 3 — the tree is a straight line from 1 → 2 → 3.",
              variables: { "root.val": 1, leftDepth: 0, rightDepth: 2, answer: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: null, right: 3, state: "found", depth: 0 },
                  3: { val: 2, left: null, right: 7, state: "found", depth: 1 },
                  7: { val: 3, left: null, right: null, state: "found", depth: 2 },
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
            shortLabel: "Empty tree — return 0",
            explanation: "The tree is empty (root is null). Return 0.",
            variables: { root: "null", answer: 0 },
            dataStructure: { treeNodes: {}, callStack: [] },
            delta: {},
            isAnswer: true,
          });
          return steps;
        }

        // Build tree from level-order array
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
          const snapshot = {};
          for (const id in nodes) {
            snapshot[id] = { ...nodes[id] };
          }
          return snapshot;
        }

        function dfs(nodeId) {
          if (!nodeId || !nodes[nodeId]) return 0;

          const node = nodes[nodeId];
          callStack.push(`maxDepth(${node.val})`);
          nodes[nodeId].state = "active";

          steps.push({
            stepId: steps.length,
            lineNumbers: [1],
            shortLabel: `Visit node ${node.val}`,
            explanation: `Arrive at node ${node.val}. Compute depths of both subtrees.`,
            variables: { "root.val": node.val, callDepth: callStack.length - 1 },
            dataStructure: { treeNodes: makeTreeSnapshot(), callStack: [...callStack] },
            delta: {},
            isAnswer: false,
          });

          nodes[nodeId].state = "visited";
          const leftDepth = dfs(node.left);
          const rightDepth = dfs(node.right);
          const result = 1 + Math.max(leftDepth, rightDepth);

          nodes[nodeId].state = "found";
          callStack.pop();

          steps.push({
            stepId: steps.length,
            lineNumbers: [7],
            shortLabel: `Node ${node.val} returns ${result}`,
            explanation: `Back at node ${node.val}. leftDepth=${leftDepth}, rightDepth=${rightDepth}. Return 1 + max(${leftDepth}, ${rightDepth}) = ${result}.`,
            variables: { "root.val": node.val, leftDepth, rightDepth, result },
            dataStructure: { treeNodes: makeTreeSnapshot(), callStack: [...callStack] },
            delta: { changedIndices: [nodeId] },
            isAnswer: false,
          });

          return result;
        }

        const answer = dfs(1);

        if (steps.length > 0) {
          steps[steps.length - 1].isAnswer = true;
          steps[steps.length - 1].variables = { answer };
          steps[steps.length - 1].explanation = `The maximum depth of the tree is ${answer}.`;
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
      explanation: "Visit every node once. Recursion stack depth equals tree height h (O(log n) balanced, O(n) skewed).",
      tradeoff: "No tradeoff — O(n) time is mandatory. BFS uses O(n) space for the queue; DFS uses O(h) for the call stack.",
    },
  },

  interviewTips: [
    "State the recurrence immediately: depth(node) = 1 + max(depth(left), depth(right)), base case depth(null) = 0.",
    "Mention both DFS (recursive, O(h) space) and BFS (iterative, O(n) space) approaches.",
    "Clarify the definition: depth counts nodes on the path, not edges. Some problems count edges instead.",
    "Point out worst-case recursion depth: a skewed tree has O(n) stack depth, which can cause stack overflow.",
    "This is the foundation for harder problems: diameter, balanced check, path sum, etc.",
  ],

  relatedProblems: ["diameter-binary-tree", "balanced-binary-tree", "invert-binary-tree"],
};
