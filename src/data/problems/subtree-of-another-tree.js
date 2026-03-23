export const subtreeOfAnotherTree = {
  id: 51,
  slug: "subtree-of-another-tree",
  title: "Subtree of Another Tree",
  difficulty: "Easy",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 51,
  artifactType: "BST",
  companies: ["Amazon", "Google", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/subtree-of-another-tree/",

  pattern: "DFS + Same Tree Check",
  patternExplanation: `For each node in the main tree, check if the subtree rooted at that node
    is identical to the target tree using the isSameTree helper. This combines tree traversal
    with the Same Tree comparison pattern.`,

  intuition: {
    coreInsight: `A tree subRoot is a subtree of root if there exists some node in root such that
      the subtree rooted at that node is structurally identical to subRoot (same values, same
      structure). So we traverse every node in root and run isSameTree at each one. If any check
      returns true, subRoot is a subtree. The time complexity is O(m * n) in the worst case, where
      m and n are the sizes of the two trees.`,

    mentalModel: `Imagine you have a large family tree (root) and a small family tree (subRoot).
      You want to know if the small family exists as an exact branch somewhere in the large family.
      You walk through every person in the large family and say: "If I start here, does the family
      below me look exactly like the small family tree?" You use your isSameTree skill at each stop.`,

    whyNaiveFails: `The naive approach IS the standard approach for this problem — there's no known
      solution better than O(m * n) without advanced techniques like tree hashing or serialization
      with KMP matching. The key inefficiency is that isSameTree is called at every node, even when
      the values don't match. A small optimization: only call isSameTree when root.val == subRoot.val.`,

    keyObservation: `The subtree must match exactly — same structure and same values from the matched
      node all the way down to the leaves. A common mistake is checking if subRoot's nodes appear
      somewhere in root without verifying structural identity. The isSameTree helper handles this
      correctly by requiring both trees to terminate (both null) at the same points.`,
  },

  problem: `Given the roots of two binary trees root and subRoot, return true if there is a subtree
    of root with the same structure and node values of subRoot and false otherwise. A subtree of a
    binary tree is a tree that consists of a node in tree and all of this node's descendants.`,

  examples: [
    {
      input: "root = [3,4,5,1,2], subRoot = [4,1,2]",
      output: "true",
      explanation: "The left subtree of root (rooted at 4) is identical to subRoot.",
    },
    {
      input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]",
      output: "false",
      explanation: "The subtree rooted at 4 has an extra node (0 under 2), so it doesn't match subRoot exactly.",
    },
  ],

  constraints: [
    "The number of nodes in root is in the range [1, 2000].",
    "The number of nodes in subRoot is in the range [1, 1000].",
    "-10^4 <= Node.val <= 10^4",
  ],

  approaches: {
    brute: null,

    better: null,

    optimal: {
      label: "DFS + Same Tree Check",
      tier: "optimal",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(h)",
      idea: `Traverse every node in root. At each node, check if the subtree rooted there is
        identical to subRoot using isSameTree. Return true if any check passes.`,

      javaCode: `public boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (root == null) return false;

    if (isSameTree(root, subRoot)) return true;

    return isSubtree(root.left, subRoot) ||
           isSubtree(root.right, subRoot);
}

private boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    if (p.val != q.val) return false;
    return isSameTree(p.left, q.left) &&
           isSameTree(p.right, q.right);
}`,

      cppCode: `bool isSubtree(TreeNode* root, TreeNode* subRoot) {
    if (root == nullptr) return false;

    if (isSameTree(root, subRoot)) return true;

    return isSubtree(root->left, subRoot) ||
           isSubtree(root->right, subRoot);
}

bool isSameTree(TreeNode* p, TreeNode* q) {
    if (p == nullptr && q == nullptr) return true;
    if (p == nullptr || q == nullptr) return false;
    if (p->val != q->val) return false;
    return isSameTree(p->left, q->left) &&
           isSameTree(p->right, q->right);
}`,

      pythonCode: `def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
    if not root:
        return False

    if self.isSameTree(root, subRoot):
        return True

    return self.isSubtree(root.left, subRoot) or \\
           self.isSubtree(root.right, subRoot)

def isSameTree(self, p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    if p.val != q.val:
        return False
    return self.isSameTree(p.left, q.left) and \\
           self.isSameTree(p.right, q.right)`,

      lineAnnotations: {
        1: "Main function: check if subRoot is a subtree of root",
        2: "Base case: null tree has no subtrees",
        4: "Check if tree rooted HERE is identical to subRoot",
        6: "Not a match here — try left subtree",
        7: "Try right subtree",
        10: "Helper: compare two trees for structural identity",
        11: "Both null — match at this point",
        12: "One null — structural mismatch",
        13: "Values differ — not the same",
        14: "Recurse into both children",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard (Found)",
          description: "subRoot matches the left subtree of root",
          input: { tree: [3, 4, 5, 1, 2], subTree: [4, 1, 2] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1],
              shortLabel: "Start at root (3)",
              explanation: "Begin at the root of the main tree (value 3). We need to check if subRoot [4,1,2] is a subtree anywhere.",
              variables: { "root.val": 3, "subRoot.val": 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 2, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["isSubtree(3, subRoot)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "isSameTree(3, 4) → false (3≠4)",
              explanation: "Check if tree rooted at 3 is identical to subRoot rooted at 4. root.val=3 but subRoot.val=4. Values differ. Not a match here.",
              variables: { "root.val": 3, "subRoot.val": 4, sameTree: false },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 2, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["isSubtree(3, subRoot)", "isSameTree(3,4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6],
              shortLabel: "Recurse left → node 4",
              explanation: "isSameTree failed at root. Try isSubtree(root.left, subRoot) — move to node 4.",
              variables: { "root.val": 4, "subRoot.val": 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 2, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["isSubtree(3, subRoot)", "isSubtree(4, subRoot)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4],
              shortLabel: "isSameTree(4, 4) — values match ✓",
              explanation: "At node 4. root.val=4 matches subRoot.val=4. Now we need to verify the entire subtree matches. Check left children: root.left=1, subRoot.left=1. Match! Check right children: root.right=2, subRoot.right=2. Match! Both leaf nodes have null children matching null children.",
              variables: { "root.val": 4, "subRoot.val": 4, sameTree: "checking..." },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "active", depth: 2 },
                  5: { val: 2, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["isSubtree(3, subRoot)", "isSubtree(4, subRoot)", "isSameTree(4,4)"],
              },
              delta: { changedIndices: [4, 5] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4],
              shortLabel: "isSameTree(4, 4) → true! Subtree found!",
              explanation: "The entire subtree rooted at node 4 matches subRoot exactly: same structure (4 with children 1 and 2), same values, same leaf positions. Return true — subRoot is indeed a subtree of root!",
              variables: { sameTree: true, answer: "true" },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "found", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 2, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: [],
              },
              delta: { changedIndices: [2, 4, 5] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Extra Node (Not Subtree)",
          description: "Almost matches but has an extra child node",
          input: { tree: [3, 4, 5, 1, 2, null, null, null, null, 0], subTree: [4, 1, 2] },
          expectedOutput: "false",
          commonMistake: "Thinking node 4 with children 1 and 2 matches subRoot [4,1,2]. But node 2 in root has a left child 0, while node 2 in subRoot has no children. The subtree match requires exact structural identity all the way to the leaves.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 4],
              shortLabel: "Root (3): isSameTree(3,4) → false",
              explanation: "Start at root value 3. subRoot has value 4. Values differ — not a match at the root.",
              variables: { "root.val": 3, "subRoot.val": 4, sameTree: false },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "default", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 2, left: 6, right: null, state: "default", depth: 2 },
                  6: { val: 0, left: null, right: null, state: "default", depth: 3 },
                },
                callStack: ["isSubtree(3, subRoot)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6],
              shortLabel: "Recurse left → node 4",
              explanation: "Try the left subtree. Move to node 4, which has the same value as subRoot's root.",
              variables: { "root.val": 4, "subRoot.val": 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 2, left: 6, right: null, state: "default", depth: 2 },
                  6: { val: 0, left: null, right: null, state: "default", depth: 3 },
                },
                callStack: ["isSubtree(3, subRoot)", "isSubtree(4, subRoot)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4],
              shortLabel: "isSameTree(4,4) — checking subtrees...",
              explanation: "root.val=4 matches subRoot.val=4. Check left: root.left=1, subRoot.left=1 — match! But when we check right subtrees: root.right has node 2 with a left child 0, while subRoot.right has node 2 with no children.",
              variables: { "root.val": 4, "subRoot.val": 4, leftMatch: true, rightMatch: "checking" },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "active", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 2, left: 6, right: null, state: "active", depth: 2 },
                  6: { val: 0, left: null, right: null, state: "active", depth: 3 },
                },
                callStack: ["isSubtree(3, subRoot)", "isSubtree(4, subRoot)", "isSameTree(4,4)"],
              },
              delta: { changedIndices: [4, 5, 6] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12],
              shortLabel: "Node 2 has extra child 0 → structural mismatch!",
              explanation: "In root's subtree, node 2 has left child 0. In subRoot, node 2 has no left child (null). isSameTree finds that p=node(0) but q=null — structural mismatch. isSameTree returns false.",
              variables: { "root node 2 left": "0", "subRoot node 2 left": "null", sameTree: false },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "eliminated", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "eliminated", depth: 2 },
                  5: { val: 2, left: 6, right: null, state: "eliminated", depth: 2 },
                  6: { val: 0, left: null, right: null, state: "eliminated", depth: 3 },
                },
                callStack: ["isSubtree(3, subRoot)"],
              },
              delta: { changedIndices: [2, 4, 5, 6] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7],
              shortLabel: "Try right subtree → node 5",
              explanation: "Left subtree didn't contain a matching subtree. Try isSubtree(root.right, subRoot) — node 5.",
              variables: { "root.val": 5, "subRoot.val": 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "eliminated", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "active", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "eliminated", depth: 2 },
                  5: { val: 2, left: 6, right: null, state: "eliminated", depth: 2 },
                  6: { val: 0, left: null, right: null, state: "eliminated", depth: 3 },
                },
                callStack: ["isSubtree(3, subRoot)", "isSubtree(5, subRoot)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 6, 7],
              shortLabel: "Node 5 is a leaf, 5≠4 → false. No more nodes.",
              explanation: "isSameTree(5,4) fails because 5≠4. Node 5 has no children to recurse into. We've exhausted all nodes in root. subRoot is NOT a subtree. Return false.",
              variables: { answer: "false" },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "eliminated", depth: 0 },
                  2: { val: 4, left: 4, right: 5, state: "eliminated", depth: 1 },
                  3: { val: 5, left: null, right: null, state: "eliminated", depth: 1 },
                  4: { val: 1, left: null, right: null, state: "eliminated", depth: 2 },
                  5: { val: 2, left: 6, right: null, state: "eliminated", depth: 2 },
                  6: { val: 0, left: null, right: null, state: "eliminated", depth: 3 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tree, subTree }) {
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

        const root = buildTree(tree);
        const subRoot = buildTree(subTree);
        const nodeStates = {};

        function getTreeNodes(node, depth) {
          if (!node) return {};
          const result = {};
          let counter = { val: 1 };
          function traverse(n, d) {
            if (!n) return null;
            const id = counter.val++;
            const leftId = traverse(n.left, d + 1);
            const rightId = traverse(n.right, d + 1);
            result[id] = {
              val: n.val, left: leftId, right: rightId,
              state: nodeStates[n.id] || "default", depth: d,
            };
            return id;
          }
          traverse(node, 0);
          return result;
        }

        function isSameTree(p, q) {
          if (!p && !q) return true;
          if (!p || !q) return false;
          if (p.val !== q.val) return false;
          return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        }

        function dfs(node, callStack) {
          if (!node) return false;
          nodeStates[node.id] = "active";
          const same = isSameTree(node, subRoot);
          steps.push({
            stepId: steps.length, lineNumbers: [4],
            shortLabel: `isSameTree(${node.val}, ${subRoot.val}) → ${same}`,
            explanation: same
              ? `Tree rooted at node ${node.val} is identical to subRoot! Return true.`
              : `Tree rooted at node ${node.val} does not match subRoot. Try children.`,
            variables: { "root.val": node.val, sameTree: same },
            dataStructure: { treeNodes: getTreeNodes(root, 0), callStack: [...callStack] },
            delta: {}, isAnswer: same,
          });
          if (same) {
            nodeStates[node.id] = "found";
            return true;
          }
          nodeStates[node.id] = "visited";
          if (dfs(node.left, [...callStack, `isSubtree(${node.left ? node.left.val : 'null'})`])) return true;
          if (dfs(node.right, [...callStack, `isSubtree(${node.right ? node.right.val : 'null'})`])) return true;
          nodeStates[node.id] = "eliminated";
          return false;
        }

        const result = dfs(root, ["isSubtree(root)"]);
        if (!result) {
          steps.push({
            stepId: steps.length, lineNumbers: [6, 7],
            shortLabel: "No match found → false",
            explanation: "Checked every node in root. No subtree matches subRoot. Return false.",
            variables: { answer: "false" },
            dataStructure: { treeNodes: getTreeNodes(root, 0), callStack: [] },
            delta: {}, isAnswer: true,
          });
        }
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(m * n)", space: "O(h)", explanation: "For each of m nodes in root, compare with n nodes in subRoot" },
    optimal: { time: "O(m * n)", space: "O(h)", explanation: "Same — advanced approaches (tree hashing) can achieve O(m + n) but are rarely expected in interviews" },
  },

  interviewTips: [
    "Start by explaining you'll reuse isSameTree as a helper.",
    "Clarify: subtree means from a node ALL the way down to leaves, not just a partial match.",
    "Mention the O(m * n) worst case and that it's acceptable for interviews.",
    "If asked for optimization: tree serialization + KMP or tree hashing can achieve O(m + n).",
    "Edge case: subRoot is a single node — just check if that value exists anywhere in root.",
  ],

  relatedProblems: ["same-tree", "invert-binary-tree", "count-good-nodes"],
};
