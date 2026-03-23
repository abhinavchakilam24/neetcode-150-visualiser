export const countGoodNodes = {
  id: 55,
  slug: "count-good-nodes",
  title: "Count Good Nodes in Binary Tree",
  difficulty: "Medium",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 55,
  artifactType: "BST",
  companies: ["Microsoft", "Amazon", "Google"],
  leetcodeLink: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",

  pattern: "DFS with Path Maximum Tracking",
  patternExplanation: `DFS through the tree, passing the maximum value seen on the path from
    root to current node. A node is "good" if its value >= the path maximum.`,

  intuition: {
    coreInsight: `A node is "good" if no node on the path from root to it has a strictly greater
      value. This means we just need to track the maximum value seen so far along the current
      path. At each node, compare its value to the running max — if node.val >= max, it's good.
      Update max = Math.max(max, node.val) before recursing to children.`,

    mentalModel: `Imagine hiking down a mountain with branching trails. You carry a sign showing
      the highest altitude reached so far. At each checkpoint, if the current altitude is at least
      as high as your sign, it's a "good" checkpoint — you update the sign. Otherwise, it's not
      good (you're in a valley relative to some earlier peak).`,

    whyNaiveFails: `Without passing the path maximum, you'd need to store the entire path and
      scan it at each node — O(h) per node, O(nh) total. By passing a single max value down
      the recursion, we do O(1) work per node.`,

    keyObservation: `The root is always a good node (no ancestors). For every other node, it's
      good iff its value >= the maximum value on the path from root to its parent. DFS naturally
      follows root-to-leaf paths, making it ideal for this tracking.`,
  },

  problem: `Given a binary tree root, a node X in the tree is named good if in the path from
    root to X there are no nodes with a value greater than X. Return the number of good nodes
    in the binary tree.`,

  examples: [
    { input: "root = [3,1,4,3,null,1,5]", output: "4", explanation: "Good nodes: 3 (root), 4, 3 (left-left), 5. Node 1 (left child of root) is not good because 3 > 1." },
    { input: "root = [3,3,null,4,2]", output: "3", explanation: "Good nodes: 3 (root), 3 (left), 4." },
    { input: "root = [1]", output: "1", explanation: "Root is always good." },
  ],

  constraints: [
    "The number of nodes in the binary tree is in [1, 10^5]",
    "Each node's value is between [-10^4, 10^4]",
  ],

  approaches: {
    brute: {
      label: "DFS with Full Path",
      tier: "brute",
      timeComplexity: "O(n*h)",
      spaceComplexity: "O(n)",
      idea: "DFS through tree, storing the full path. At each node, scan the path for any value > current.",

      javaCode: `public int goodNodes(TreeNode root) {
    return dfs(root, new ArrayList<>());
}

int dfs(TreeNode node, List<Integer> path) {
    if (node == null) return 0;
    int count = 0;
    boolean isGood = true;
    for (int val : path) {
        if (val > node.val) { isGood = false; break; }
    }
    if (isGood) count = 1;
    path.add(node.val);
    count += dfs(node.left, path);
    count += dfs(node.right, path);
    path.remove(path.size() - 1);
    return count;
}`,

      cppCode: `int goodNodes(TreeNode* root) {
    vector<int> path;
    return dfs(root, path);
}

int dfs(TreeNode* node, vector<int>& path) {
    if (!node) return 0;
    int count = 0;
    bool isGood = true;
    for (int val : path) {
        if (val > node->val) { isGood = false; break; }
    }
    if (isGood) count = 1;
    path.push_back(node->val);
    count += dfs(node->left, path);
    count += dfs(node->right, path);
    path.pop_back();
    return count;
}`,

      pythonCode: `def goodNodes(root: TreeNode) -> int:
    def dfs(node, path):
        if not node:
            return 0
        is_good = all(v <= node.val for v in path)
        count = 1 if is_good else 0
        path.append(node.val)
        count += dfs(node.left, path)
        count += dfs(node.right, path)
        path.pop()
        return count
    return dfs(root, [])`,

      lineAnnotations: {
        5: "DFS with full path stored",
        9: "Scan entire path for any value > node.val",
        13: "Add current node to path before recursing",
        16: "Backtrack: remove node from path after both subtrees",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { root: [3, 1, 4, 3, null, 1, 5] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Start DFS",
              explanation: "Begin DFS at root (3). Path is empty, so root is always good.",
              variables: { "node.val": 3, path: "[]", count: 0 },
              dataStructure: { treeNodes: { 1: { val: 3, left: 2, right: 3, state: "active", depth: 0 } }, callStack: ["dfs(3)"] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [9, 12, 13], shortLabel: "3 is good (root)",
              explanation: "No values in path > 3. Root is good. count=1. Add 3 to path, recurse.",
              variables: { "node.val": 3, isGood: true, count: 1 },
              dataStructure: { treeNodes: { 1: { val: 3, left: 2, right: 3, state: "found", depth: 0 } }, callStack: ["dfs(3)"] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [14], shortLabel: "Final count = 4",
              explanation: "After full DFS: good nodes are 3 (root), 3 (left-left), 4 (right), 5 (right-right). Total = 4.",
              variables: { answer: 4 },
              dataStructure: { treeNodes: { 1: { val: 3, left: 2, right: 3, state: "found", depth: 0 } }, callStack: [] },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root }) {
        const steps = [];
        steps.push({ stepId: 0, lineNumbers: [2], shortLabel: "DFS brute force", explanation: "DFS with full path tracking.", variables: {}, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "DFS with Path Max",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      idea: `Pass the maximum value seen on the path from root. At each node, if node.val >= maxSoFar,
        it's good. Update maxSoFar = max(maxSoFar, node.val) for children.`,

      javaCode: `public int goodNodes(TreeNode root) {
    return dfs(root, root.val);
}

int dfs(TreeNode node, int maxSoFar) {
    if (node == null) return 0;
    int count = node.val >= maxSoFar ? 1 : 0;
    maxSoFar = Math.max(maxSoFar, node.val);
    count += dfs(node.left, maxSoFar);
    count += dfs(node.right, maxSoFar);
    return count;
}`,

      cppCode: `int goodNodes(TreeNode* root) {
    return dfs(root, root->val);
}

int dfs(TreeNode* node, int maxSoFar) {
    if (!node) return 0;
    int count = node->val >= maxSoFar ? 1 : 0;
    maxSoFar = max(maxSoFar, node->val);
    count += dfs(node->left, maxSoFar);
    count += dfs(node->right, maxSoFar);
    return count;
}`,

      pythonCode: `def goodNodes(root: TreeNode) -> int:
    def dfs(node, max_so_far):
        if not node:
            return 0
        count = 1 if node.val >= max_so_far else 0
        max_so_far = max(max_so_far, node.val)
        count += dfs(node.left, max_so_far)
        count += dfs(node.right, max_so_far)
        return count
    return dfs(root, root.val)`,

      lineAnnotations: {
        2: "Start DFS with root value as initial max",
        5: "Base case: null node contributes 0 good nodes",
        6: "Good if current value >= max seen on path",
        7: "Update max for children's paths",
        8: "Recurse left subtree with updated max",
        9: "Recurse right subtree with updated max",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Tree [3,1,4,3,null,1,5] — 4 good nodes",
          input: { root: [3, 1, 4, 3, null, 1, 5] },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Start: dfs(3, max=3)",
              explanation: "Begin at root (3). maxSoFar = 3. Since 3 >= 3, root is GOOD. Count = 1.",
              variables: { "node.val": 3, maxSoFar: 3, isGood: true, count: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 1, left: 4, right: null, state: "default", depth: 1 },
                  3: { val: 4, left: 5, right: 6, state: "default", depth: 1 },
                  4: { val: 3, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(3, 3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "dfs(1, max=3): NOT good",
              explanation: "Node 1 < maxSoFar 3. NOT good. maxSoFar stays 3 for children.",
              variables: { "node.val": 1, maxSoFar: 3, isGood: false, count: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 1, left: 4, right: null, state: "eliminated", depth: 1 },
                  3: { val: 4, left: 5, right: 6, state: "default", depth: 1 },
                  4: { val: 3, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(3, 3)", "dfs(1, 3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "dfs(3, max=3): GOOD",
              explanation: "Left-left child: value 3 >= maxSoFar 3. GOOD! Running total good nodes so far: 2.",
              variables: { "node.val": 3, maxSoFar: 3, isGood: true },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 1, left: 4, right: null, state: "visited", depth: 1 },
                  3: { val: 4, left: 5, right: 6, state: "default", depth: 1 },
                  4: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(3, 3)", "dfs(1, 3)", "dfs(3, 3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "dfs(4, max=3): GOOD",
              explanation: "Right child of root: value 4 >= maxSoFar 3. GOOD! maxSoFar becomes 4.",
              variables: { "node.val": 4, maxSoFar: 4, isGood: true },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 1, left: 4, right: null, state: "visited", depth: 1 },
                  3: { val: 4, left: 5, right: 6, state: "found", depth: 1 },
                  4: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 1, left: null, right: null, state: "default", depth: 2 },
                  6: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(3, 3)", "dfs(4, 3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 8],
              shortLabel: "dfs(1, max=4): NOT good",
              explanation: "Left child of 4: value 1 < maxSoFar 4. NOT good.",
              variables: { "node.val": 1, maxSoFar: 4, isGood: false },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 1, left: 4, right: null, state: "visited", depth: 1 },
                  3: { val: 4, left: 5, right: 6, state: "visited", depth: 1 },
                  4: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 1, left: null, right: null, state: "eliminated", depth: 2 },
                  6: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(3, 3)", "dfs(4, 3)", "dfs(1, 4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 9],
              shortLabel: "dfs(5, max=4): GOOD",
              explanation: "Right child of 4: value 5 >= maxSoFar 4. GOOD! Total good = 4.",
              variables: { "node.val": 5, maxSoFar: 5, isGood: true },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 1, left: 4, right: null, state: "visited", depth: 1 },
                  3: { val: 4, left: 5, right: 6, state: "visited", depth: 1 },
                  4: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 1, left: null, right: null, state: "eliminated", depth: 2 },
                  6: { val: 5, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["dfs(3, 3)", "dfs(4, 3)", "dfs(5, 4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10],
              shortLabel: "Return 4",
              explanation: "All nodes visited. Good nodes: 3 (root), 3 (left-left), 4 (right), 5 (right-right). Total = 4.",
              variables: { answer: 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 1, left: 4, right: null, state: "eliminated", depth: 1 },
                  3: { val: 4, left: 5, right: 6, state: "found", depth: 1 },
                  4: { val: 3, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 1, left: null, right: null, state: "eliminated", depth: 2 },
                  6: { val: 5, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Same Values",
          description: "All nodes have the same value — all are good",
          input: { root: [3, 3, 3] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Start: all values = 3",
              explanation: "All nodes have value 3. maxSoFar never changes. Every node is good.",
              variables: { maxSoFar: 3 },
              dataStructure: { treeNodes: { 1: { val: 3, left: 2, right: 3, state: "active", depth: 0 }, 2: { val: 3, left: null, right: null, state: "default", depth: 1 }, 3: { val: 3, left: null, right: null, state: "default", depth: 1 } }, callStack: [] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [6, 7, 8, 9, 10], shortLabel: "All 3 nodes are good",
              explanation: "Root 3 >= 3: good. Left 3 >= 3: good. Right 3 >= 3: good. Total = 3.",
              variables: { answer: 3 },
              dataStructure: { treeNodes: { 1: { val: 3, left: 2, right: 3, state: "found", depth: 0 }, 2: { val: 3, left: null, right: null, state: "found", depth: 1 }, 3: { val: 3, left: null, right: null, state: "found", depth: 1 } }, callStack: [] },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ root }) {
        if (!root || root.length === 0) {
          return [{ stepId: 0, lineNumbers: [3], shortLabel: "Empty tree", explanation: "No nodes.", variables: { answer: 0 }, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true }];
        }

        const steps = [];
        let goodCount = 0;

        function buildTree(arr) {
          const nodes = {};
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== null) {
              const leftIdx = 2 * i + 1;
              const rightIdx = 2 * i + 2;
              nodes[i + 1] = {
                val: arr[i],
                left: leftIdx < arr.length && arr[leftIdx] !== null ? leftIdx + 1 : null,
                right: rightIdx < arr.length && arr[rightIdx] !== null ? rightIdx + 1 : null,
                state: "default",
                depth: Math.floor(Math.log2(i + 1)),
              };
            }
          }
          return nodes;
        }

        const treeNodes = buildTree(root);

        function dfs(idx, maxSoFar) {
          if (idx >= root.length || root[idx] === null) return;
          const val = root[idx];
          const isGood = val >= maxSoFar;
          if (isGood) goodCount++;
          const nodeId = idx + 1;
          if (treeNodes[nodeId]) treeNodes[nodeId].state = isGood ? "found" : "eliminated";

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6, 7],
            shortLabel: `dfs(${val}, max=${maxSoFar}): ${isGood ? "GOOD" : "not good"}`,
            explanation: `Node ${val} ${isGood ? ">=" : "<"} maxSoFar ${maxSoFar}. ${isGood ? "GOOD!" : "Not good."} Good count: ${goodCount}.`,
            variables: { "node.val": val, maxSoFar, isGood, goodCount },
            dataStructure: { treeNodes: JSON.parse(JSON.stringify(treeNodes)), callStack: [] },
            delta: {}, isAnswer: false,
          });

          const newMax = Math.max(maxSoFar, val);
          dfs(2 * idx + 1, newMax);
          dfs(2 * idx + 2, newMax);
        }

        dfs(0, root[0]);

        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: `Return ${goodCount}`,
          explanation: `Total good nodes: ${goodCount}.`,
          variables: { answer: goodCount },
          dataStructure: { treeNodes: JSON.parse(JSON.stringify(treeNodes)), callStack: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n*h)", space: "O(n)", explanation: "At each node, scan the full path of length up to h" },
    optimal: { time: "O(n)", space: "O(h)", explanation: "Visit each node once; recursion stack depth = tree height h", tradeoff: "Passing max eliminates path scanning — O(1) work per node" },
  },

  interviewTips: [
    "Clarify: a node is 'good' if no ANCESTOR has a strictly greater value.",
    "Root is always good — mention this explicitly.",
    "The key optimization is passing maxSoFar instead of the full path.",
    "This is a classic 'DFS with parameter' pattern used in many tree problems.",
    "Space is O(h) for recursion stack — O(log n) for balanced, O(n) for skewed.",
  ],

  relatedProblems: ["max-depth-binary-tree", "validate-bst", "binary-tree-max-path-sum"],
};
