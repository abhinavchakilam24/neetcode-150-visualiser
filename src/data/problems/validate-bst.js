export const validateBst = {
  id: 56,
  slug: "validate-bst",
  title: "Validate Binary Search Tree",
  difficulty: "Medium",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 56,
  artifactType: "BST",
  companies: ["Amazon", "Meta", "Microsoft", "Bloomberg", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/validate-binary-search-tree/",

  pattern: "DFS with Valid Range",
  patternExplanation: `Pass a valid range [min, max] down the recursion. Each node's value must
    fall within its range. Going left narrows the max; going right narrows the min.`,

  intuition: {
    coreInsight: `A BST property isn't just "left < parent < right" at each node — it's that ALL
      nodes in the left subtree are less than the current node, and ALL in the right are greater.
      This means each node has a valid range [min, max] inherited from ancestors. We pass this
      range downward: going left, the current node becomes the new upper bound; going right,
      it becomes the new lower bound.`,

    mentalModel: `Imagine a number line with fences. The root can be any number. When you go left,
      you install a fence at the parent's value on the right side — nothing in this subtree can
      exceed it. When you go right, you install a fence on the left. Each node must fit within
      the corridor defined by all its ancestors' fences.`,

    whyNaiveFails: `The naive check "node.left.val < node.val && node.right.val > node.val" only
      validates the immediate children. It misses cases like: root=5, root.left=4, root.left.right=6.
      Here 6 > 4 (valid locally) but 6 > 5 (invalid — it's in the left subtree of 5). The range
      approach catches this because 6's max bound is 5.`,

    keyObservation: `Initialize the range as (-infinity, +infinity) at the root. For the left child,
      update range to (min, node.val). For the right child, update to (node.val, max). If any node
      violates its range, the tree is invalid. This is O(n) — one check per node.`,
  },

  problem: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).
    A valid BST is defined as: the left subtree of a node contains only nodes with keys strictly
    less than the node's key; the right subtree only nodes with keys strictly greater; both
    subtrees must also be valid BSTs.`,

  examples: [
    { input: "root = [2,1,3]", output: "true", explanation: "1 < 2 < 3. Valid BST." },
    { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "Node 4 is in the right subtree of 5, but 4 < 5. Invalid." },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [1, 10^4]",
    "-2^31 <= Node.val <= 2^31 - 1",
  ],

  approaches: {
    brute: {
      label: "Inorder Traversal Check",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "Inorder traversal of a valid BST produces sorted order. Collect values and check if sorted.",

      javaCode: `public boolean isValidBST(TreeNode root) {
    List<Integer> vals = new ArrayList<>();
    inorder(root, vals);
    for (int i = 1; i < vals.size(); i++) {
        if (vals.get(i) <= vals.get(i - 1)) return false;
    }
    return true;
}

void inorder(TreeNode node, List<Integer> vals) {
    if (node == null) return;
    inorder(node.left, vals);
    vals.add(node.val);
    inorder(node.right, vals);
}`,

      cppCode: `bool isValidBST(TreeNode* root) {
    vector<int> vals;
    inorder(root, vals);
    for (int i = 1; i < vals.size(); i++) {
        if (vals[i] <= vals[i - 1]) return false;
    }
    return true;
}

void inorder(TreeNode* node, vector<int>& vals) {
    if (!node) return;
    inorder(node->left, vals);
    vals.push_back(node->val);
    inorder(node->right, vals);
}`,

      pythonCode: `def isValidBST(root: Optional[TreeNode]) -> bool:
    vals = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        vals.append(node.val)
        inorder(node.right)
    inorder(root)
    for i in range(1, len(vals)):
        if vals[i] <= vals[i - 1]:
            return False
    return True`,

      lineAnnotations: {
        2: "Collect inorder traversal values",
        4: "Check if values are strictly increasing",
        5: "Any non-increasing pair means invalid BST",
        12: "Inorder: left → node → right",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { root: [2, 1, 3] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3], shortLabel: "Inorder: [1, 2, 3]",
              explanation: "Inorder traversal gives [1, 2, 3]. This is strictly increasing.",
              variables: { vals: "[1, 2, 3]" },
              dataStructure: { treeNodes: { 1: { val: 2, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 1, left: null, right: null, state: "visited", depth: 1 }, 3: { val: 3, left: null, right: null, state: "visited", depth: 1 } }, callStack: [] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [4, 5, 7], shortLabel: "Sorted → true",
              explanation: "1 < 2 < 3. All strictly increasing. Valid BST.",
              variables: { answer: true },
              dataStructure: { treeNodes: { 1: { val: 2, left: 2, right: 3, state: "found", depth: 0 }, 2: { val: 1, left: null, right: null, state: "found", depth: 1 }, 3: { val: 3, left: null, right: null, state: "found", depth: 1 } }, callStack: [] },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root }) {
        const steps = [];
        steps.push({ stepId: 0, lineNumbers: [2], shortLabel: "Inorder check", explanation: "Collect inorder, verify sorted.", variables: {}, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "DFS with Valid Range",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      idea: `Pass [min, max] range down the tree. Each node must satisfy min < node.val < max.
        Left child gets range [min, node.val]. Right child gets [node.val, max].`,

      javaCode: `public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val)
        && validate(node.right, node.val, max);
}`,

      cppCode: `bool isValidBST(TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}

bool validate(TreeNode* node, long min, long max) {
    if (!node) return true;
    if (node->val <= min || node->val >= max) return false;
    return validate(node->left, min, node->val)
        && validate(node->right, node->val, max);
}`,

      pythonCode: `def isValidBST(root: Optional[TreeNode]) -> bool:
    def validate(node, lo, hi):
        if not node:
            return True
        if node.val <= lo or node.val >= hi:
            return False
        return validate(node.left, lo, node.val) \\
            and validate(node.right, node.val, hi)
    return validate(root, float('-inf'), float('inf'))`,

      lineAnnotations: {
        2: "Start with range (-inf, +inf)",
        5: "Base case: null is always valid",
        6: "Node must be strictly within (min, max)",
        7: "Left subtree: upper bound becomes node.val",
        8: "Right subtree: lower bound becomes node.val",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Valid BST",
          description: "Simple valid BST [2,1,3]",
          input: { root: [2, 1, 3] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "validate(2, -inf, inf)",
              explanation: "Start at root (2). Range is (-inf, inf). 2 is within range. Valid so far.",
              variables: { "node.val": 2, min: "-inf", max: "inf" },
              dataStructure: {
                treeNodes: { 1: { val: 2, left: 2, right: 3, state: "active", depth: 0 }, 2: { val: 1, left: null, right: null, state: "default", depth: 1 }, 3: { val: 3, left: null, right: null, state: "default", depth: 1 } },
                callStack: ["validate(2, -inf, inf)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "validate(1, -inf, 2): valid",
              explanation: "Left child (1). Range is (-inf, 2). 1 is within range. No children to check.",
              variables: { "node.val": 1, min: "-inf", max: 2 },
              dataStructure: {
                treeNodes: { 1: { val: 2, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 1, left: null, right: null, state: "found", depth: 1 }, 3: { val: 3, left: null, right: null, state: "default", depth: 1 } },
                callStack: ["validate(2, -inf, inf)", "validate(1, -inf, 2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 8],
              shortLabel: "validate(3, 2, inf): valid",
              explanation: "Right child (3). Range is (2, inf). 3 > 2, valid. No children.",
              variables: { "node.val": 3, min: 2, max: "inf" },
              dataStructure: {
                treeNodes: { 1: { val: 2, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 1, left: null, right: null, state: "found", depth: 1 }, 3: { val: 3, left: null, right: null, state: "found", depth: 1 } },
                callStack: ["validate(2, -inf, inf)", "validate(3, 2, inf)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8],
              shortLabel: "Return true",
              explanation: "All nodes valid. The tree is a valid BST.",
              variables: { answer: true },
              dataStructure: {
                treeNodes: { 1: { val: 2, left: 2, right: 3, state: "found", depth: 0 }, 2: { val: 1, left: null, right: null, state: "found", depth: 1 }, 3: { val: 3, left: null, right: null, state: "found", depth: 1 } },
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Invalid BST",
          description: "Subtree violation: [5,1,4,null,null,3,6]",
          input: { root: [5, 1, 4, null, null, 3, 6] },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "validate(5, -inf, inf)",
              explanation: "Root (5). Range (-inf, inf). Valid.",
              variables: { "node.val": 5, min: "-inf", max: "inf" },
              dataStructure: { treeNodes: { 1: { val: 5, left: 2, right: 3, state: "active", depth: 0 }, 2: { val: 1, left: null, right: null, state: "default", depth: 1 }, 3: { val: 4, left: 4, right: 5, state: "default", depth: 1 }, 4: { val: 3, left: null, right: null, state: "default", depth: 2 }, 5: { val: 6, left: null, right: null, state: "default", depth: 2 } }, callStack: ["validate(5, -inf, inf)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "validate(1, -inf, 5): valid",
              explanation: "Left child (1). Range (-inf, 5). Valid.",
              variables: { "node.val": 1, min: "-inf", max: 5 },
              dataStructure: { treeNodes: { 1: { val: 5, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 1, left: null, right: null, state: "found", depth: 1 }, 3: { val: 4, left: 4, right: 5, state: "default", depth: 1 } }, callStack: ["validate(5, -inf, inf)", "validate(1, -inf, 5)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 8],
              shortLabel: "validate(4, 5, inf): INVALID!",
              explanation: "Right child (4). Range (5, inf). But 4 <= 5! Node 4 violates the BST property — it's in the right subtree of 5 but is less than 5.",
              variables: { "node.val": 4, min: 5, max: "inf", violation: "4 <= 5" },
              dataStructure: { treeNodes: { 1: { val: 5, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 1, left: null, right: null, state: "found", depth: 1 }, 3: { val: 4, left: 4, right: 5, state: "eliminated", depth: 1 } }, callStack: ["validate(5, -inf, inf)", "validate(4, 5, inf)"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6],
              shortLabel: "Return false",
              explanation: "BST violation found at node 4. Return false.",
              variables: { answer: false },
              dataStructure: { treeNodes: { 1: { val: 5, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 1, left: null, right: null, state: "found", depth: 1 }, 3: { val: 4, left: 4, right: 5, state: "eliminated", depth: 1 } }, callStack: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root }) {
        const steps = [];
        if (!root || root.length === 0) {
          steps.push({ stepId: 0, lineNumbers: [5], shortLabel: "Empty → true", explanation: "Empty tree is valid.", variables: { answer: true }, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true });
          return steps;
        }

        function buildTree(arr) {
          const nodes = {};
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== null) {
              nodes[i + 1] = { val: arr[i], left: 2*i+1 < arr.length && arr[2*i+1] !== null ? 2*i+2 : null, right: 2*i+2 < arr.length && arr[2*i+2] !== null ? 2*i+3 : null, state: "default", depth: Math.floor(Math.log2(i + 1)) };
            }
          }
          return nodes;
        }

        const treeNodes = buildTree(root);
        let result = true;

        function validate(idx, min, max) {
          if (idx >= root.length || root[idx] === null) return true;
          const val = root[idx];
          const nodeId = idx + 1;
          const valid = val > min && val < max;

          if (treeNodes[nodeId]) treeNodes[nodeId].state = valid ? "found" : "eliminated";

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6],
            shortLabel: `validate(${val}, ${min === -Infinity ? "-inf" : min}, ${max === Infinity ? "inf" : max}): ${valid ? "valid" : "INVALID"}`,
            explanation: `Node ${val} must be in (${min === -Infinity ? "-inf" : min}, ${max === Infinity ? "inf" : max}). ${valid ? "Valid." : "VIOLATION!"}`,
            variables: { "node.val": val, min: min === -Infinity ? "-inf" : min, max: max === Infinity ? "inf" : max },
            dataStructure: { treeNodes: JSON.parse(JSON.stringify(treeNodes)), callStack: [] },
            delta: {}, isAnswer: false,
          });

          if (!valid) { result = false; return false; }
          return validate(2 * idx + 1, min, val) && validate(2 * idx + 2, val, max);
        }

        validate(0, -Infinity, Infinity);

        steps.push({
          stepId: steps.length, lineNumbers: [8],
          shortLabel: `Return ${result}`,
          explanation: `${result ? "All nodes valid. Valid BST." : "BST violation found. Invalid."}`,
          variables: { answer: result },
          dataStructure: { treeNodes: JSON.parse(JSON.stringify(treeNodes)), callStack: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n)", space: "O(n)", explanation: "Inorder traversal stores all values" },
    optimal: { time: "O(n)", space: "O(h)", explanation: "DFS with range — O(h) recursion stack", tradeoff: "Same time but saves space by not storing all values" },
  },

  interviewTips: [
    "The most common mistake: only checking immediate children, not the full range constraint.",
    "Use long (not int) for min/max bounds to handle Integer.MIN_VALUE and MAX_VALUE nodes.",
    "Mention the inorder approach as an alternative — easier to understand, same time.",
    "Clarify: BST requires STRICTLY less/greater (no duplicates in standard definition).",
    "Draw the example [5,1,4,null,null,3,6] to show the subtree violation clearly.",
  ],

  relatedProblems: ["kth-smallest-bst", "lowest-common-ancestor-bst", "invert-binary-tree"],
};
