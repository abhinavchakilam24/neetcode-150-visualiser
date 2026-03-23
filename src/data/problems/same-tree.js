export const sameTree = {
  id: 50,
  slug: "same-tree",
  title: "Same Tree",
  difficulty: "Easy",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 50,
  artifactType: "BST",
  companies: ["Amazon", "Google", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/same-tree/",

  pattern: "Simultaneous Recursive DFS on Two Trees",
  patternExplanation: `When comparing two trees structurally, recurse into both trees simultaneously.
    At each step, compare the current nodes. If both are null, they match. If one is null or values
    differ, they don't match. Otherwise, recurse into left-left and right-right.`,

  intuition: {
    coreInsight: `Two trees are the same if and only if three conditions hold at every node: (1) both
      nodes exist (or both are null), (2) their values are equal, and (3) their left subtrees are the
      same AND their right subtrees are the same. This naturally maps to a recursive function that
      walks both trees in lockstep.`,

    mentalModel: `Imagine two people each holding an identical-looking map of a maze. They start at
      the entrance (root) and walk through together, step by step. At every fork, they both go left
      together, then both go right together. If at any point one person hits a wall (null) but the
      other doesn't, or they see different room numbers (values), the mazes are different. Only if
      they complete the entire walk without any mismatch are the mazes identical.`,

    whyNaiveFails: `There's no meaningfully worse approach — any correct solution must visit every
      node in both trees at least once. The key mistake beginners make is trying to serialize both
      trees into arrays and compare arrays, which works but wastes O(n) extra space and obscures
      the elegant recursive structure. The recursive approach uses only O(h) stack space.`,

    keyObservation: `The base cases are critical: if both nodes are null, return true (both subtrees
      ended at the same point). If exactly one is null, return false (structural mismatch). If
      values differ, return false. Only when all three checks pass do we recurse deeper. This
      short-circuit evaluation makes the solution efficient — it stops as soon as any mismatch
      is found.`,
  },

  problem: `Given the roots of two binary trees p and q, write a function to check if they are
    the same or not. Two binary trees are considered the same if they are structurally identical,
    and the nodes have the same value.`,

  examples: [
    {
      input: "p = [1,2,3], q = [1,2,3]",
      output: "true",
      explanation: "Both trees have the same structure and node values.",
    },
    {
      input: "p = [1,2], q = [1,null,2]",
      output: "false",
      explanation: "Tree p has 2 as left child, tree q has 2 as right child.",
    },
    {
      input: "p = [1,2,1], q = [1,1,2]",
      output: "false",
      explanation: "Values at the left and right children are swapped.",
    },
  ],

  constraints: [
    "The number of nodes in both trees is in the range [0, 100].",
    "-10^4 <= Node.val <= 10^4",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "Recursive DFS",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      idea: `Compare both trees simultaneously using recursion. If both nodes are null, return true.
        If one is null or values differ, return false. Otherwise, recurse on left-left and right-right.`,

      javaCode: `public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    if (p.val != q.val) return false;

    return isSameTree(p.left, q.left) &&
           isSameTree(p.right, q.right);
}`,

      cppCode: `bool isSameTree(TreeNode* p, TreeNode* q) {
    if (p == nullptr && q == nullptr) return true;
    if (p == nullptr || q == nullptr) return false;
    if (p->val != q->val) return false;

    return isSameTree(p->left, q->left) &&
           isSameTree(p->right, q->right);
}`,

      pythonCode: `def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    if not p and not q:
        return True
    if not p or not q:
        return False
    if p.val != q.val:
        return False

    return self.isSameTree(p.left, q.left) and \\
           self.isSameTree(p.right, q.right)`,

      lineAnnotations: {
        1: "Take roots of both trees to compare",
        2: "Both null — structurally identical at this point",
        3: "One null, one not — structural mismatch",
        4: "Both exist but values differ — not the same",
        6: "Recurse: left subtrees must match",
        7: "Recurse: right subtrees must also match",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard (Same)",
          description: "Two identical 3-node trees — returns true",
          input: { treeP: [1, 2, 3], treeQ: [1, 2, 3] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Compare roots: p=1, q=1",
              explanation: "Start at the roots of both trees. p.val=1, q.val=1. Values match. We need to check both subtrees.",
              variables: { "p.val": 1, "q.val": 1, result: "pending" },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "default", depth: 1 },
                  3: { val: "p:3", left: null, right: null, state: "default", depth: 1 },
                  4: { val: "q:1", left: 5, right: 6, state: "active", depth: 0 },
                  5: { val: "q:2", left: null, right: null, state: "default", depth: 1 },
                  6: { val: "q:3", left: null, right: null, state: "default", depth: 1 },
                },
                callStack: ["isSameTree(1,1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [2, 3, 4],
              shortLabel: "p=1, q=1 — values match ✓",
              explanation: "Neither p nor q is null, and p.val (1) equals q.val (1). All base case checks pass. Recurse into left subtrees.",
              variables: { "p.val": 1, "q.val": 1, "both null?": "no", "one null?": "no", "vals equal?": "yes" },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "default", depth: 1 },
                  3: { val: "p:3", left: null, right: null, state: "default", depth: 1 },
                  4: { val: "q:1", left: 5, right: 6, state: "active", depth: 0 },
                  5: { val: "q:2", left: null, right: null, state: "default", depth: 1 },
                  6: { val: "q:3", left: null, right: null, state: "default", depth: 1 },
                },
                callStack: ["isSameTree(1,1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6],
              shortLabel: "Recurse left: p=2, q=2",
              explanation: "Call isSameTree(p.left, q.left). Both left children have value 2. They're leaves — both left and right children are null.",
              variables: { "p.val": 2, "q.val": 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "active", depth: 1 },
                  3: { val: "p:3", left: null, right: null, state: "default", depth: 1 },
                  4: { val: "q:1", left: 5, right: 6, state: "visited", depth: 0 },
                  5: { val: "q:2", left: null, right: null, state: "active", depth: 1 },
                  6: { val: "q:3", left: null, right: null, state: "default", depth: 1 },
                },
                callStack: ["isSameTree(1,1)", "isSameTree(2,2)"],
              },
              delta: { changedIndices: [2, 5] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [2, 3, 4, 6, 7],
              shortLabel: "Leaves p=2, q=2 — match ✓, return true",
              explanation: "p.val=2 equals q.val=2. Both children are null, so recursive calls on left-left and right-right both return true (both null). Return true.",
              variables: { "p.val": 2, "q.val": 2, leftMatch: true, rightMatch: true, result: true },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "found", depth: 1 },
                  3: { val: "p:3", left: null, right: null, state: "default", depth: 1 },
                  4: { val: "q:1", left: 5, right: 6, state: "visited", depth: 0 },
                  5: { val: "q:2", left: null, right: null, state: "found", depth: 1 },
                  6: { val: "q:3", left: null, right: null, state: "default", depth: 1 },
                },
                callStack: ["isSameTree(1,1)"],
              },
              delta: { changedIndices: [2, 5] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7],
              shortLabel: "Recurse right: p=3, q=3",
              explanation: "Left subtrees matched. Now call isSameTree(p.right, q.right). Both right children have value 3. They're also leaves.",
              variables: { "p.val": 3, "q.val": 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "found", depth: 1 },
                  3: { val: "p:3", left: null, right: null, state: "active", depth: 1 },
                  4: { val: "q:1", left: 5, right: 6, state: "visited", depth: 0 },
                  5: { val: "q:2", left: null, right: null, state: "found", depth: 1 },
                  6: { val: "q:3", left: null, right: null, state: "active", depth: 1 },
                },
                callStack: ["isSameTree(1,1)", "isSameTree(3,3)"],
              },
              delta: { changedIndices: [3, 6] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [2, 3, 4, 6, 7],
              shortLabel: "Leaves p=3, q=3 — match ✓, return true",
              explanation: "p.val=3 equals q.val=3. Both children are null. Return true.",
              variables: { "p.val": 3, "q.val": 3, result: true },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "found", depth: 1 },
                  3: { val: "p:3", left: null, right: null, state: "found", depth: 1 },
                  4: { val: "q:1", left: 5, right: 6, state: "visited", depth: 0 },
                  5: { val: "q:2", left: null, right: null, state: "found", depth: 1 },
                  6: { val: "q:3", left: null, right: null, state: "found", depth: 1 },
                },
                callStack: ["isSameTree(1,1)"],
              },
              delta: { changedIndices: [3, 6] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 7],
              shortLabel: "Both subtrees match → return true",
              explanation: "Back at the root. Left subtrees matched (true) AND right subtrees matched (true). Return true — the trees are identical!",
              variables: { "p.val": 1, "q.val": 1, leftMatch: true, rightMatch: true, answer: "true" },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "found", depth: 1 },
                  3: { val: "p:3", left: null, right: null, state: "found", depth: 1 },
                  4: { val: "q:1", left: 5, right: 6, state: "found", depth: 0 },
                  5: { val: "q:2", left: null, right: null, state: "found", depth: 1 },
                  6: { val: "q:3", left: null, right: null, state: "found", depth: 1 },
                },
                callStack: [],
              },
              delta: { changedIndices: [1, 4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Different Structure",
          description: "Trees with same values but different structure — p=[1,2], q=[1,null,2]",
          input: { treeP: [1, 2], treeQ: [1, null, 2] },
          expectedOutput: "false",
          commonMistake: "Only comparing values without checking structure. The values {1,2} appear in both trees, but node 2 is a left child in p and a right child in q.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2, 3, 4],
              shortLabel: "Compare roots: p=1, q=1 — match ✓",
              explanation: "Both roots exist with value 1. Values match. Recurse into subtrees.",
              variables: { "p.val": 1, "q.val": 1, "vals equal?": "yes" },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: null, state: "active", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "default", depth: 1 },
                  3: { val: "q:1", left: null, right: 4, state: "active", depth: 0 },
                  4: { val: "q:2", left: null, right: null, state: "default", depth: 1 },
                },
                callStack: ["isSameTree(1,1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6],
              shortLabel: "Recurse left: p=2, q=null",
              explanation: "Call isSameTree(p.left, q.left). p.left is node 2, but q.left is null. One exists, one doesn't.",
              variables: { "p.left": 2, "q.left": "null" },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: null, state: "visited", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "active", depth: 1 },
                  3: { val: "q:1", left: null, right: 4, state: "visited", depth: 0 },
                  4: { val: "q:2", left: null, right: null, state: "default", depth: 1 },
                },
                callStack: ["isSameTree(1,1)", "isSameTree(2,null)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3],
              shortLabel: "p=2, q=null → structural mismatch! Return false",
              explanation: "p is not null (value 2) but q is null. This is a structural mismatch — one tree has a node where the other doesn't. Return false immediately. No need to check right subtrees.",
              variables: { p: "node(2)", q: "null", answer: "false" },
              dataStructure: {
                treeNodes: {
                  1: { val: "p:1", left: 2, right: null, state: "eliminated", depth: 0 },
                  2: { val: "p:2", left: null, right: null, state: "eliminated", depth: 1 },
                  3: { val: "q:1", left: null, right: 4, state: "eliminated", depth: 0 },
                  4: { val: "q:2", left: null, right: null, state: "eliminated", depth: 1 },
                },
                callStack: [],
              },
              delta: { changedIndices: [1, 2, 3, 4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ treeP, treeQ }) {
        const steps = [];

        function buildTree(arr) {
          if (!arr || arr.length === 0) return null;
          const nodes = arr.map((v, i) => v !== null ? { val: v, left: null, right: null, id: i } : null);
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] !== null) {
              const li = 2 * i + 1, ri = 2 * i + 2;
              nodes[i].left = li < nodes.length && nodes[li] ? nodes[li] : null;
              nodes[i].right = ri < nodes.length && nodes[ri] ? nodes[ri] : null;
            }
          }
          return nodes[0];
        }

        const pRoot = buildTree(treeP);
        const qRoot = buildTree(treeQ);

        function getTreeNodesState(pNode, qNode, pStates, qStates) {
          const treeNodes = {};
          let id = 1;
          function addP(node, depth, parentId, side) {
            if (!node) return null;
            const myId = id++;
            treeNodes[myId] = {
              val: `p:${node.val}`,
              left: null, right: null,
              state: pStates[node.id] || "default",
              depth,
            };
            const leftId = addP(node.left, depth + 1, myId, "left");
            const rightId = addP(node.right, depth + 1, myId, "right");
            treeNodes[myId].left = leftId;
            treeNodes[myId].right = rightId;
            return myId;
          }
          addP(pNode, 0, null, null);
          function addQ(node, depth, parentId, side) {
            if (!node) return null;
            const myId = id++;
            treeNodes[myId] = {
              val: `q:${node.val}`,
              left: null, right: null,
              state: qStates[node.id] || "default",
              depth,
            };
            const leftId = addQ(node.left, depth + 1, myId, "left");
            const rightId = addQ(node.right, depth + 1, myId, "right");
            treeNodes[myId].left = leftId;
            treeNodes[myId].right = rightId;
            return myId;
          }
          addQ(qNode, 0, null, null);
          return treeNodes;
        }

        const pStates = {};
        const qStates = {};

        function recurse(p, q, callStack) {
          if (!p && !q) {
            steps.push({
              stepId: steps.length, lineNumbers: [2],
              shortLabel: "Both null → true",
              explanation: "Both p and q are null at this point. Structurally identical here. Return true.",
              variables: { p: "null", q: "null", result: true },
              dataStructure: { treeNodes: getTreeNodesState(pRoot, qRoot, pStates, qStates), callStack: [...callStack] },
              delta: {}, isAnswer: false,
            });
            return true;
          }
          if (!p || !q) {
            steps.push({
              stepId: steps.length, lineNumbers: [3],
              shortLabel: `${!p ? 'p=null' : 'q=null'} → false`,
              explanation: `Structural mismatch: ${!p ? 'p is null but q exists' : 'q is null but p exists'}. Return false.`,
              variables: { p: p ? p.val : "null", q: q ? q.val : "null", result: false },
              dataStructure: { treeNodes: getTreeNodesState(pRoot, qRoot, pStates, qStates), callStack: [...callStack] },
              delta: {}, isAnswer: true,
            });
            return false;
          }

          pStates[p.id] = "active";
          qStates[q.id] = "active";
          steps.push({
            stepId: steps.length, lineNumbers: [1, 4],
            shortLabel: `Compare p=${p.val}, q=${q.val}`,
            explanation: `Comparing p.val=${p.val} with q.val=${q.val}. ${p.val === q.val ? 'Values match — recurse deeper.' : 'Values differ — return false.'}`,
            variables: { "p.val": p.val, "q.val": q.val, "match?": p.val === q.val },
            dataStructure: { treeNodes: getTreeNodesState(pRoot, qRoot, pStates, qStates), callStack: [...callStack] },
            delta: {}, isAnswer: false,
          });

          if (p.val !== q.val) {
            pStates[p.id] = "eliminated";
            qStates[q.id] = "eliminated";
            steps.push({
              stepId: steps.length, lineNumbers: [4],
              shortLabel: `${p.val} ≠ ${q.val} → false`,
              explanation: `p.val=${p.val} does not equal q.val=${q.val}. Trees are not the same. Return false.`,
              variables: { "p.val": p.val, "q.val": q.val, result: false },
              dataStructure: { treeNodes: getTreeNodesState(pRoot, qRoot, pStates, qStates), callStack: [...callStack] },
              delta: {}, isAnswer: true,
            });
            return false;
          }

          const leftResult = recurse(p.left, q.left, [...callStack, `isSameTree(${p.left ? p.left.val : 'null'},${q.left ? q.left.val : 'null'})`]);
          if (!leftResult) return false;
          const rightResult = recurse(p.right, q.right, [...callStack, `isSameTree(${p.right ? p.right.val : 'null'},${q.right ? q.right.val : 'null'})`]);

          pStates[p.id] = leftResult && rightResult ? "found" : "eliminated";
          qStates[q.id] = leftResult && rightResult ? "found" : "eliminated";
          return leftResult && rightResult;
        }

        const result = recurse(pRoot, qRoot, ["isSameTree(root_p,root_q)"]);
        if (!steps[steps.length - 1].isAnswer) {
          steps.push({
            stepId: steps.length, lineNumbers: [6, 7],
            shortLabel: `Final result: ${result}`,
            explanation: `All nodes compared. The trees are ${result ? 'identical' : 'different'}.`,
            variables: { answer: String(result) },
            dataStructure: { treeNodes: getTreeNodesState(pRoot, qRoot, pStates, qStates), callStack: [] },
            delta: {}, isAnswer: true,
          });
        }
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(h)", explanation: "Visit every node once; recursion stack depth = tree height" },
    optimal: { time: "O(n)", space: "O(h)", explanation: "Same — there's no worse approach for this problem" },
  },

  interviewTips: [
    "Clarify: are we comparing by value AND structure, or just values?",
    "Mention all three base cases explicitly: both null, one null, values differ.",
    "Note that this is O(min(n1, n2)) — we stop as soon as a mismatch is found.",
    "This pattern is the foundation for Subtree of Another Tree.",
    "If asked for iterative: use two queues (BFS) or two stacks (DFS).",
  ],

  relatedProblems: ["subtree-of-another-tree", "invert-binary-tree", "max-depth-binary-tree"],
};
