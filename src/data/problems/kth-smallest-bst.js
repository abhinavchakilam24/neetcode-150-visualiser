export const kthSmallestBst = {
  id: 57,
  slug: "kth-smallest-bst",
  title: "Kth Smallest Element in a BST",
  difficulty: "Medium",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 57,
  artifactType: "BST",
  companies: ["Amazon", "Meta", "Microsoft", "Uber", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",

  pattern: "Inorder Traversal with Early Termination",
  patternExplanation: `Inorder traversal of a BST visits nodes in ascending order. The kth node
    visited during inorder traversal is the kth smallest element. Stop as soon as k reaches 0.`,

  intuition: {
    coreInsight: `The defining property of a BST is that inorder traversal produces sorted order.
      So the kth smallest element is simply the kth node visited during an inorder traversal.
      We don't need to traverse the entire tree — we can stop as soon as we've visited k nodes.`,

    mentalModel: `Imagine the BST as a filing cabinet where left drawers have smaller files.
      Inorder traversal opens drawers from smallest to largest. You just count: "first smallest,
      second smallest, ..." and stop when you hit k. You never need to open all the drawers.`,

    whyNaiveFails: `Collecting all values and sorting is O(n log n). Even collecting all values
      via inorder and returning the kth element is O(n) time and space. With iterative inorder
      and early termination, we can stop after visiting exactly k nodes — O(h + k) time.`,

    keyObservation: `Iterative inorder using a stack lets us "pause" the traversal at any point.
      We push nodes going left, pop and process, then go right. When our counter hits k, we
      immediately return without processing the rest of the tree.`,
  },

  problem: `Given the root of a binary search tree, and an integer k, return the kth smallest
    value (1-indexed) of all the values of the nodes in the tree.`,

  examples: [
    { input: "root = [3,1,4,null,2], k = 1", output: "1", explanation: "Inorder: [1,2,3,4]. 1st smallest = 1." },
    { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3", explanation: "Inorder: [1,2,3,4,5,6]. 3rd smallest = 3." },
  ],

  constraints: [
    "The number of nodes in the tree is n",
    "1 <= k <= n <= 10^4",
    "0 <= Node.val <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Collect All + Sort",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "Inorder traversal to collect all values in sorted order, then return the (k-1)th index.",

      javaCode: `public int kthSmallest(TreeNode root, int k) {
    List<Integer> vals = new ArrayList<>();
    inorder(root, vals);
    return vals.get(k - 1);
}

void inorder(TreeNode node, List<Integer> vals) {
    if (node == null) return;
    inorder(node.left, vals);
    vals.add(node.val);
    inorder(node.right, vals);
}`,

      cppCode: `int kthSmallest(TreeNode* root, int k) {
    vector<int> vals;
    inorder(root, vals);
    return vals[k - 1];
}

void inorder(TreeNode* node, vector<int>& vals) {
    if (!node) return;
    inorder(node->left, vals);
    vals.push_back(node->val);
    inorder(node->right, vals);
}`,

      pythonCode: `def kthSmallest(root: Optional[TreeNode], k: int) -> int:
    vals = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        vals.append(node.val)
        inorder(node.right)
    inorder(root)
    return vals[k - 1]`,

      lineAnnotations: {
        2: "Collect all values via inorder",
        4: "Return the kth element (0-indexed: k-1)",
        9: "Inorder: left, then current, then right",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { root: [3, 1, 4, null, 2], k: 1 },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3], shortLabel: "Inorder: [1,2,3,4]",
              explanation: "Full inorder traversal gives [1, 2, 3, 4].",
              variables: { vals: "[1, 2, 3, 4]", k: 1 },
              dataStructure: { treeNodes: { 1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 1, left: null, right: 4, state: "visited", depth: 1 }, 3: { val: 4, left: null, right: null, state: "visited", depth: 1 }, 4: { val: 2, left: null, right: null, state: "visited", depth: 2 } }, callStack: [] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [4], shortLabel: "vals[0] = 1",
              explanation: "k=1, return vals[0] = 1.",
              variables: { k: 1, answer: 1 },
              dataStructure: { treeNodes: { 1: { val: 3, left: 2, right: 3, state: "default", depth: 0 }, 2: { val: 1, left: null, right: 4, state: "found", depth: 1 }, 3: { val: 4, left: null, right: null, state: "default", depth: 1 }, 4: { val: 2, left: null, right: null, state: "default", depth: 2 } }, callStack: [] },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root, k }) {
        const steps = [];
        steps.push({ stepId: 0, lineNumbers: [2], shortLabel: "Collect all via inorder", explanation: "Full inorder then index k-1.", variables: { k }, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Iterative Inorder with Early Stop",
      tier: "optimal",
      timeComplexity: "O(h + k)",
      spaceComplexity: "O(h)",
      idea: `Iterative inorder using a stack. Each time we pop (visit) a node, decrement k.
        When k reaches 0, that node's value is the answer. No need to visit remaining nodes.`,

      javaCode: `public int kthSmallest(TreeNode root, int k) {
    Stack<TreeNode> stack = new Stack<>();
    TreeNode curr = root;

    while (curr != null || !stack.isEmpty()) {
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }

        curr = stack.pop();
        k--;
        if (k == 0) return curr.val;

        curr = curr.right;
    }

    return -1;
}`,

      cppCode: `int kthSmallest(TreeNode* root, int k) {
    stack<TreeNode*> stk;
    TreeNode* curr = root;

    while (curr || !stk.empty()) {
        while (curr) {
            stk.push(curr);
            curr = curr->left;
        }

        curr = stk.top(); stk.pop();
        k--;
        if (k == 0) return curr->val;

        curr = curr->right;
    }

    return -1;
}`,

      pythonCode: `def kthSmallest(root: Optional[TreeNode], k: int) -> int:
    stack = []
    curr = root

    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left

        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val

        curr = curr.right

    return -1`,

      lineAnnotations: {
        2: "Stack for iterative inorder traversal",
        3: "Start from root",
        5: "Continue while there are nodes to process",
        6: "Go as far left as possible, pushing nodes onto stack",
        10: "Pop = visit the next smallest node",
        11: "Decrement k — we've found the next smallest",
        12: "k == 0 means this is the kth smallest — return immediately",
        14: "Move to right subtree for next inorder node",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Find 1st smallest in [3,1,4,null,2]",
          input: { root: [3, 1, 4, null, 2], k: 1 },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: curr=3, stack=[]",
              explanation: "Start at root (3). Empty stack. k=1.",
              variables: { k: 1, curr: 3, stack: "[]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "active", depth: 0 }, 2: { val: 1, left: null, right: 4, state: "default", depth: 1 }, 3: { val: 4, left: null, right: null, state: "default", depth: 1 }, 4: { val: 2, left: null, right: null, state: "default", depth: 2 } },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8],
              shortLabel: "Go left: push 3, push 1",
              explanation: "Push 3, go left to 1. Push 1, go left — null. Stack: [3, 1].",
              variables: { k: 1, curr: null, stack: "[3, 1]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "queued", depth: 0 }, 2: { val: 1, left: null, right: 4, state: "queued", depth: 1 }, 3: { val: 4, left: null, right: null, state: "default", depth: 1 }, 4: { val: 2, left: null, right: null, state: "default", depth: 2 } },
                callStack: ["3", "1"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11, 12],
              shortLabel: "Pop 1, k=0 → return 1",
              explanation: "Pop node 1. k=1-1=0. k is 0, so 1 is the 1st smallest. Return 1 immediately!",
              variables: { k: 0, "curr.val": 1, answer: 1 },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "queued", depth: 0 }, 2: { val: 1, left: null, right: 4, state: "found", depth: 1 }, 3: { val: 4, left: null, right: null, state: "default", depth: 1 }, 4: { val: 2, left: null, right: null, state: "default", depth: 2 } },
                callStack: ["3"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "k = 3",
          description: "Find 3rd smallest in [5,3,6,2,4,null,null,1]",
          input: { root: [5, 3, 6, 2, 4, null, null, 1], k: 3 },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: curr=5, k=3",
              explanation: "Start at root (5). Need the 3rd smallest element.",
              variables: { k: 3, curr: 5 },
              dataStructure: { treeNodes: { 1: { val: 5, left: 2, right: 3, state: "active", depth: 0 } }, callStack: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11],
              shortLabel: "Pop 1 (1st smallest), k=2",
              explanation: "After going all the way left, pop node 1. k=3-1=2.",
              variables: { k: 2, "curr.val": 1 },
              dataStructure: { treeNodes: { 1: { val: 5, left: 2, right: 3, state: "queued", depth: 0 } }, callStack: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11],
              shortLabel: "Pop 2 (2nd smallest), k=1",
              explanation: "Pop node 2. k=2-1=1.",
              variables: { k: 1, "curr.val": 2 },
              dataStructure: { treeNodes: { 1: { val: 5, left: 2, right: 3, state: "queued", depth: 0 } }, callStack: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11, 12],
              shortLabel: "Pop 3 (3rd smallest), k=0 → return 3",
              explanation: "Pop node 3. k=1-1=0. The 3rd smallest is 3. Return immediately!",
              variables: { k: 0, "curr.val": 3, answer: 3 },
              dataStructure: { treeNodes: { 1: { val: 5, left: 2, right: 3, state: "queued", depth: 0 } }, callStack: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root, k }) {
        const steps = [];
        if (!root || root.length === 0) {
          steps.push({ stepId: 0, lineNumbers: [17], shortLabel: "Empty", explanation: "No tree.", variables: { answer: -1 }, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true });
          return steps;
        }

        // Simulate iterative inorder on array-encoded tree
        const stack = [];
        let curr = 0;
        let remaining = k;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `Init: k=${k}`,
          explanation: `Start iterative inorder. Looking for the ${k}th smallest.`,
          variables: { k: remaining },
          dataStructure: { treeNodes: {}, callStack: [] },
          delta: {}, isAnswer: false,
        });

        // Inorder from array
        const inorderVals = [];
        function inorder(idx) {
          if (idx >= root.length || root[idx] === null) return;
          inorder(2 * idx + 1);
          inorderVals.push(root[idx]);
          inorder(2 * idx + 2);
        }
        inorder(0);

        for (let i = 0; i < inorderVals.length && remaining > 0; i++) {
          remaining--;
          if (remaining === 0) {
            steps.push({
              stepId: steps.length, lineNumbers: [10, 11, 12],
              shortLabel: `Pop ${inorderVals[i]}, k=0 → answer`,
              explanation: `Visited ${inorderVals[i]} (${k - remaining}th smallest). k reaches 0. Return ${inorderVals[i]}.`,
              variables: { k: 0, "curr.val": inorderVals[i], answer: inorderVals[i] },
              dataStructure: { treeNodes: {}, callStack: [] },
              delta: {}, isAnswer: true,
            });
          } else {
            steps.push({
              stepId: steps.length, lineNumbers: [10, 11],
              shortLabel: `Pop ${inorderVals[i]}, k=${remaining}`,
              explanation: `Visited ${inorderVals[i]} (${k - remaining}th smallest). k=${remaining}, continue.`,
              variables: { k: remaining, "curr.val": inorderVals[i] },
              dataStructure: { treeNodes: {}, callStack: [] },
              delta: {}, isAnswer: false,
            });
          }
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n)", space: "O(n)", explanation: "Full inorder traversal stores all n values" },
    optimal: { time: "O(h + k)", space: "O(h)", explanation: "Go down h levels to reach leftmost, then visit k nodes", tradeoff: "When k << n, much faster than traversing entire tree" },
  },

  interviewTips: [
    "Key insight: inorder of BST = sorted order. The kth smallest is the kth inorder node.",
    "Use iterative inorder (stack) for early termination — cleaner than recursive with global counter.",
    "Mention follow-up: if the BST is modified often, augment nodes with subtree size for O(h) queries.",
    "Clarify k is 1-indexed — common source of off-by-one bugs.",
    "Time is O(h + k): h to reach the leftmost node, then k visits.",
  ],

  relatedProblems: ["validate-bst", "binary-search", "invert-binary-tree"],
};
