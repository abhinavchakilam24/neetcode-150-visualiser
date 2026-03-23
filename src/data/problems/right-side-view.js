export const rightSideView = {
  id: 54,
  slug: "right-side-view",
  title: "Binary Tree Right Side View",
  difficulty: "Medium",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 54,
  artifactType: "BST",
  companies: ["Meta", "Amazon", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/binary-tree-right-side-view/",

  pattern: "BFS Level-Order Traversal",
  patternExplanation: `When you need to see the tree level by level and pick the last node
    at each depth, BFS with a queue is the natural fit. Process each level as a batch,
    and the last node dequeued per level is the rightmost visible node.`,

  intuition: {
    coreInsight: `If you stand to the right of a binary tree and look left, you see the
      rightmost node at every depth. BFS processes the tree level by level — at each level,
      the last node in the queue is the one visible from the right side. We simply collect
      the last node from each level's batch.`,

    mentalModel: `Imagine the tree is a building viewed from the right side. Each floor
      (level) has rooms (nodes) stretching left. You can only see the rightmost room on
      each floor. BFS walks through each floor left to right, and we remember whichever
      room we see last — that's the one visible from outside.`,

    whyNaiveFails: `A naive DFS approach that always goes right first would miss cases
      where the left subtree is deeper than the right. For example, if the right child
      is a leaf but the left child has two more levels, those deeper left nodes ARE visible
      from the right side. DFS can work if you track max depth seen, but BFS is more
      intuitive and harder to get wrong.`,

    keyObservation: `At each BFS level, the last node processed is the rightmost node.
      We don't need any special logic — just iterate through the level and take the final
      element. Alternatively, DFS visiting right-before-left and tracking the first node
      seen at each new depth also works.`,
  },

  problem: `Given the root of a binary tree, imagine yourself standing on the right side
    of it, return the values of the nodes you can see ordered from top to bottom.`,

  examples: [
    {
      input: "root = [1,2,3,null,5,null,4]",
      output: "[1,3,4]",
      explanation: "From the right side: level 0 = 1, level 1 = 3, level 2 = 4.",
    },
    {
      input: "root = [1,null,3]",
      output: "[1,3]",
      explanation: "Only right children — both visible from the right.",
    },
    {
      input: "root = []",
      output: "[]",
      explanation: "Empty tree — nothing to see.",
    },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [0, 100].",
    "-100 <= Node.val <= 100",
  ],

  approaches: {
    brute: {
      label: "BFS Level-Order (collect last per level)",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Use BFS with a queue. Process each level as a batch, and at the end of
        each level, add the last node's value to the result list.`,

      javaCode: `public List<Integer> rightSideView(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        TreeNode rightmost = null;

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            rightmost = node;

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        result.add(rightmost.val);
    }

    return result;
}`,

      cppCode: `vector<int> rightSideView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size();
        TreeNode* rightmost = nullptr;

        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front(); q.pop();
            rightmost = node;

            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }

        result.push_back(rightmost->val);
    }

    return result;
}`,

      pythonCode: `def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)

        for i in range(level_size):
            node = queue.popleft()

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(node.val)

    return result`,

      lineAnnotations: {
        1: "Return a list of values visible from the right side",
        2: "Initialize result list",
        3: "Edge case: empty tree",
        5: "Start BFS with root in queue",
        8: "Process level by level",
        9: "Snapshot the current level's size",
        12: "Iterate through all nodes at this level",
        13: "Dequeue the next node",
        14: "Track the last node seen (rightmost)",
        16: "Enqueue left child for next level",
        17: "Enqueue right child for next level",
        20: "The last node in this level is the right side view",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Balanced tree — right side view picks rightmost at each level",
          input: { tree: [1, 2, 3, null, 5, null, 4] },
          expectedOutput: "[1, 3, 4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6],
              shortLabel: "Init queue with root",
              explanation: "Start BFS. Queue contains just the root node (1). Result is empty.",
              variables: { queue: "[1]", result: "[]", level: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "queued", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "default", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [9, 12, 13, 14],
              shortLabel: "Level 0: process node 1",
              explanation: "Level 0 has 1 node. Dequeue node 1 — it's the only node at this level, so it's the rightmost. Enqueue its children: 2 (left) and 3 (right).",
              variables: { queue: "[2, 3]", result: "[]", level: 0, levelSize: 1, "node.val": 1, rightmost: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "queued", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "queued", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["Level 0: size=1"],
              },
              delta: { changedIndices: [1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [20],
              shortLabel: "Add 1 to result",
              explanation: "Rightmost node at level 0 is 1. Add it to result. result = [1].",
              variables: { queue: "[2, 3]", result: "[1]", level: 0, rightmost: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "queued", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "queued", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["Level 0: rightmost=1"],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9, 12, 13, 14],
              shortLabel: "Level 1: process node 2",
              explanation: "Level 1 has 2 nodes. Dequeue node 2 first. It has a right child (5) — enqueue it. No left child.",
              variables: { queue: "[3, 5]", result: "[1]", level: 1, levelSize: 2, i: 0, "node.val": 2, rightmost: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "active", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "queued", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "queued", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["Level 1: size=2, i=0"],
              },
              delta: { changedIndices: [2, 4] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12, 13, 14],
              shortLabel: "Level 1: process node 3",
              explanation: "Dequeue node 3 — it's the second (last) node at level 1, so it becomes the rightmost. It has a right child (4) — enqueue it.",
              variables: { queue: "[5, 4]", result: "[1]", level: 1, levelSize: 2, i: 1, "node.val": 3, rightmost: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "active", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "queued", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "queued", depth: 2 },
                },
                callStack: ["Level 1: size=2, i=1"],
              },
              delta: { changedIndices: [3, 5] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [20],
              shortLabel: "Add 3 to result",
              explanation: "Rightmost node at level 1 is 3. Add it to result. result = [1, 3].",
              variables: { queue: "[5, 4]", result: "[1, 3]", level: 1, rightmost: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "queued", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "queued", depth: 2 },
                },
                callStack: ["Level 1: rightmost=3"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9, 12, 13, 14],
              shortLabel: "Level 2: process node 5",
              explanation: "Level 2 has 2 nodes. Dequeue node 5 (value 5). No children. Rightmost so far = 5.",
              variables: { queue: "[4]", result: "[1, 3]", level: 2, levelSize: 2, i: 0, "node.val": 5, rightmost: 5 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "active", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "queued", depth: 2 },
                },
                callStack: ["Level 2: size=2, i=0"],
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [12, 13, 14],
              shortLabel: "Level 2: process node 4",
              explanation: "Dequeue node 4 (value 4). It's the last node at level 2, so it becomes the rightmost. No children.",
              variables: { queue: "[]", result: "[1, 3]", level: 2, levelSize: 2, i: 1, "node.val": 4, rightmost: 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "visited", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["Level 2: size=2, i=1"],
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [20],
              shortLabel: "Add 4 to result — done!",
              explanation: "Rightmost at level 2 is 4. Add to result. Queue is empty — BFS complete. Final answer: [1, 3, 4].",
              variables: { queue: "[]", result: "[1, 3, 4]", level: 2, rightmost: 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "visited", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: [],
              },
              delta: { changedIndices: [5] },
              isAnswer: true,
            },
          ],
        },
        edgeCase1: {
          id: "edgeCase1",
          label: "Left-Heavy Tree",
          description: "Left subtree deeper than right — left node visible from right side",
          input: { tree: [1, 2, 3, 4] },
          expectedOutput: "[1, 3, 4]",
          commonMistake: "If you only traverse right children, you miss node 4 which is visible from the right because the right subtree has no depth-2 node.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6],
              shortLabel: "Init queue with root",
              explanation: "Start BFS with root (1) in the queue.",
              variables: { queue: "[1]", result: "[]", level: 0 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "queued", depth: 0 },
                  2: { val: 2, left: 4, right: null, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [9, 12, 13, 14, 20],
              shortLabel: "Level 0: node 1 → result [1]",
              explanation: "Dequeue node 1 — only node at level 0. Enqueue children 2 and 3. Add 1 to result.",
              variables: { queue: "[2, 3]", result: "[1]", level: 0, rightmost: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: 4, right: null, state: "queued", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "queued", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["Level 0: rightmost=1"],
              },
              delta: { changedIndices: [1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13, 14],
              shortLabel: "Level 1: process node 2",
              explanation: "Dequeue node 2. It has left child 4 — enqueue it. Rightmost so far at this level is 2.",
              variables: { queue: "[3, 4]", result: "[1]", level: 1, i: 0, "node.val": 2, rightmost: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: 4, right: null, state: "active", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "queued", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "queued", depth: 2 },
                },
                callStack: ["Level 1: size=2, i=0"],
              },
              delta: { changedIndices: [2, 4] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 14, 20],
              shortLabel: "Level 1: node 3 → result [1, 3]",
              explanation: "Dequeue node 3 — last at level 1, becomes rightmost. No children. Add 3 to result.",
              variables: { queue: "[4]", result: "[1, 3]", level: 1, i: 1, rightmost: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: 4, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "queued", depth: 2 },
                },
                callStack: ["Level 1: rightmost=3"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 12, 13, 14, 20],
              shortLabel: "Level 2: node 4 → result [1, 3, 4]",
              explanation: "Dequeue node 4 — only node at level 2. Even though it's a LEFT child, it's visible from the right side because there's no right child at this depth. Add 4 to result. Done!",
              variables: { queue: "[]", result: "[1, 3, 4]", level: 2, rightmost: 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: 4, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["Level 2: rightmost=4"],
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function(input) {
        const { tree } = input;
        const steps = [];
        if (!tree || tree.length === 0) return steps;

        // Build tree nodes
        const treeNodes = {};
        let nodeId = 1;
        for (let i = 0; i < tree.length; i++) {
          if (tree[i] !== null) {
            const leftIdx = 2 * i + 1;
            const rightIdx = 2 * i + 2;
            let leftChild = null, rightChild = null;
            // find node ids for children
            let lid = null, rid = null;
            if (leftIdx < tree.length && tree[leftIdx] !== null) lid = leftIdx;
            if (rightIdx < tree.length && tree[rightIdx] !== null) rid = rightIdx;
            treeNodes[i] = { val: tree[i], depth: Math.floor(Math.log2(i + 1)) };
          }
        }

        // Simple BFS simulation
        const queue = [0];
        const result = [];
        let level = 0;

        const getState = (idx, found, visited, queued, active) => {
          if (found.has(idx)) return "found";
          if (active === idx) return "active";
          if (queued.has(idx)) return "queued";
          if (visited.has(idx)) return "visited";
          return "default";
        };

        const buildTreeNodes = (found, visited, queued, active) => {
          const tn = {};
          let id = 1;
          for (let i = 0; i < tree.length; i++) {
            if (tree[i] !== null) {
              const leftIdx = 2 * i + 1;
              const rightIdx = 2 * i + 2;
              const hasLeft = leftIdx < tree.length && tree[leftIdx] !== null;
              const hasRight = rightIdx < tree.length && tree[rightIdx] !== null;
              tn[i + 1] = {
                val: tree[i],
                left: hasLeft ? leftIdx + 1 : null,
                right: hasRight ? rightIdx + 1 : null,
                state: getState(i, found, visited, queued, active),
                depth: Math.floor(Math.log2(i + 1)),
              };
            }
          }
          return tn;
        };

        const foundSet = new Set();
        const visitedSet = new Set();
        const queuedSet = new Set([0]);

        steps.push({
          stepId: 0,
          lineNumbers: [5, 6],
          shortLabel: "Init queue with root",
          explanation: `Start BFS with root (${tree[0]}) in the queue.`,
          variables: { queue: `[${tree[0]}]`, result: "[]", level: 0 },
          dataStructure: {
            treeNodes: buildTreeNodes(foundSet, visitedSet, queuedSet, null),
            callStack: [],
          },
          delta: {},
          isAnswer: false,
        });

        const bfsQueue = [0];
        while (bfsQueue.length > 0) {
          const levelSize = bfsQueue.length;
          let rightmost = null;
          for (let i = 0; i < levelSize; i++) {
            const idx = bfsQueue.shift();
            queuedSet.delete(idx);
            rightmost = idx;

            const leftIdx = 2 * idx + 1;
            const rightIdx = 2 * idx + 2;
            if (leftIdx < tree.length && tree[leftIdx] !== null) {
              bfsQueue.push(leftIdx);
              queuedSet.add(leftIdx);
            }
            if (rightIdx < tree.length && tree[rightIdx] !== null) {
              bfsQueue.push(rightIdx);
              queuedSet.add(rightIdx);
            }

            steps.push({
              stepId: steps.length,
              lineNumbers: [12, 13, 14],
              shortLabel: `Level ${level}: process ${tree[idx]}`,
              explanation: `Dequeue node ${tree[idx]} at level ${level}. ${i === levelSize - 1 ? "Last node at this level — rightmost." : "Not the last node at this level yet."}`,
              variables: { queue: `[${bfsQueue.map(q => tree[q]).join(", ")}]`, result: `[${result.join(", ")}]`, level, i, "node.val": tree[idx], rightmost: tree[rightmost] },
              dataStructure: {
                treeNodes: buildTreeNodes(foundSet, visitedSet, queuedSet, idx),
                callStack: [`Level ${level}: size=${levelSize}, i=${i}`],
              },
              delta: { changedIndices: [idx + 1] },
              isAnswer: false,
            });
            visitedSet.add(idx);
          }

          result.push(tree[rightmost]);
          foundSet.add(rightmost);

          steps.push({
            stepId: steps.length,
            lineNumbers: [20],
            shortLabel: `Add ${tree[rightmost]} to result`,
            explanation: `Rightmost at level ${level} is ${tree[rightmost]}. Result = [${result.join(", ")}].${bfsQueue.length === 0 ? " BFS complete!" : ""}`,
            variables: { queue: `[${bfsQueue.map(q => tree[q]).join(", ")}]`, result: `[${result.join(", ")}]`, level, rightmost: tree[rightmost] },
            dataStructure: {
              treeNodes: buildTreeNodes(foundSet, visitedSet, queuedSet, null),
              callStack: bfsQueue.length === 0 ? [] : [`Level ${level}: rightmost=${tree[rightmost]}`],
            },
            delta: { changedIndices: [rightmost + 1] },
            isAnswer: bfsQueue.length === 0,
          });

          level++;
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "DFS (Right-First, Depth Tracking)",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      idea: `Use DFS visiting right child before left. Maintain a result list. At each node,
        if the current depth equals result.size(), this is the first (rightmost) node seen
        at this depth — add it. The right-first traversal guarantees rightmost nodes are
        seen first at each level.`,

      javaCode: `public List<Integer> rightSideView(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    dfs(root, 0, result);
    return result;
}

private void dfs(TreeNode node, int depth, List<Integer> result) {
    if (node == null) return;

    if (depth == result.size()) {
        result.add(node.val);
    }

    dfs(node.right, depth + 1, result);
    dfs(node.left, depth + 1, result);
}`,

      cppCode: `vector<int> rightSideView(TreeNode* root) {
    vector<int> result;
    dfs(root, 0, result);
    return result;
}

void dfs(TreeNode* node, int depth, vector<int>& result) {
    if (!node) return;

    if (depth == result.size()) {
        result.push_back(node->val);
    }

    dfs(node->right, depth + 1, result);
    dfs(node->left, depth + 1, result);
}`,

      pythonCode: `def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
    result = []

    def dfs(node, depth):
        if not node:
            return

        if depth == len(result):
            result.append(node.val)

        dfs(node.right, depth + 1)
        dfs(node.left, depth + 1)

    dfs(root, 0)
    return result`,

      lineAnnotations: {
        1: "Main function — initialize result and start DFS",
        2: "Result list will collect one value per depth level",
        3: "Start DFS at root with depth 0",
        7: "DFS helper — takes node, its depth, and result list",
        8: "Base case: null node — return",
        10: "If this depth hasn't been seen yet, this is the rightmost node",
        11: "Add this node's value — first seen at this depth = rightmost",
        14: "Recurse RIGHT first — ensures rightmost nodes are visited first",
        15: "Then recurse LEFT — only matters if right subtree is shallower",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Tree with right-visible nodes at each level",
          input: { tree: [1, 2, 3, null, 5, null, 4] },
          expectedOutput: "[1, 3, 4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start DFS at root (1)",
              explanation: "Initialize empty result list. Call dfs(root, 0). Depth 0 == result.size() (0), so add 1 to result.",
              variables: { depth: 0, "node.val": 1, "result.size()": 0, result: "[]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "default", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1, 0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [10, 11],
              shortLabel: "Add 1 to result (depth 0)",
              explanation: "depth (0) == result.size() (0) — first node at this depth. Add 1. result = [1].",
              variables: { depth: 0, "node.val": 1, result: "[1]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "default", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1, 0)"],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [14],
              shortLabel: "Recurse right → node 3",
              explanation: "Visit right child first (key to seeing rightmost nodes first). Call dfs(3, 1).",
              variables: { depth: 1, "node.val": 3, "result.size()": 1, result: "[1]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "active", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1, 0)", "dfs(3, 1)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11],
              shortLabel: "Add 3 to result (depth 1)",
              explanation: "depth (1) == result.size() (1) — first node at depth 1. Since we went right first, 3 is the rightmost. Add 3. result = [1, 3].",
              variables: { depth: 1, "node.val": 3, result: "[1, 3]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1, 0)", "dfs(3, 1)"],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14],
              shortLabel: "Recurse right → node 4",
              explanation: "Node 3's right child is 4. Call dfs(4, 2).",
              variables: { depth: 2, "node.val": 4, "result.size()": 2, result: "[1, 3]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["dfs(1, 0)", "dfs(3, 1)", "dfs(4, 2)"],
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [10, 11],
              shortLabel: "Add 4 to result (depth 2)",
              explanation: "depth (2) == result.size() (2) — first node at depth 2. Add 4. result = [1, 3, 4].",
              variables: { depth: 2, "node.val": 4, result: "[1, 3, 4]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["dfs(1, 0)", "dfs(3, 1)", "dfs(4, 2)"],
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [15],
              shortLabel: "Backtrack → node 3, then left (null)",
              explanation: "Node 4 is a leaf. Backtrack to node 3, which has no left child. Backtrack to node 1.",
              variables: { depth: 1, "node.val": 3, result: "[1, 3, 4]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["dfs(1, 0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [15],
              shortLabel: "Recurse left → node 2",
              explanation: "Back at root (1). Now visit left child (2). Call dfs(2, 1).",
              variables: { depth: 1, "node.val": 2, "result.size()": 3, result: "[1, 3, 4]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "active", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["dfs(1, 0)", "dfs(2, 1)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [10],
              shortLabel: "Depth 1 already seen — skip node 2",
              explanation: "depth (1) != result.size() (3). Depth 1 was already captured by node 3 (the rightmost). Node 2 is hidden behind 3 from the right side.",
              variables: { depth: 1, "node.val": 2, "result.size()": 3, result: "[1, 3, 4]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: ["dfs(1, 0)", "dfs(2, 1)"],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [14],
              shortLabel: "Visit node 5 (depth 2 already seen)",
              explanation: "Node 2's right child is 5 (value 5). depth (2) != result.size() (3). Depth 2 was captured by node 4. Node 5 is hidden. DFS complete. Answer: [1, 3, 4].",
              variables: { depth: 2, "node.val": 5, result: "[1, 3, 4]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: 4, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: 5, state: "found", depth: 1 },
                  4: { val: 5, left: null, right: null, state: "visited", depth: 2 },
                  5: { val: 4, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: [],
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function(input) {
        const { tree } = input;
        const steps = [];
        if (!tree || tree.length === 0) return steps;

        const result = [];

        const buildTreeNodes = (states) => {
          const tn = {};
          for (let i = 0; i < tree.length; i++) {
            if (tree[i] !== null && tree[i] !== undefined) {
              const leftIdx = 2 * i + 1;
              const rightIdx = 2 * i + 2;
              const hasLeft = leftIdx < tree.length && tree[leftIdx] !== null && tree[leftIdx] !== undefined;
              const hasRight = rightIdx < tree.length && tree[rightIdx] !== null && tree[rightIdx] !== undefined;
              tn[i + 1] = {
                val: tree[i],
                left: hasLeft ? leftIdx + 1 : null,
                right: hasRight ? rightIdx + 1 : null,
                state: states[i] || "default",
                depth: Math.floor(Math.log2(i + 1)),
              };
            }
          }
          return tn;
        };

        const states = {};
        const callStack = [];

        function dfs(idx, depth) {
          if (idx >= tree.length || tree[idx] === null || tree[idx] === undefined) return;

          callStack.push(`dfs(${tree[idx]}, ${depth})`);
          states[idx] = "active";

          const isNew = depth === result.length;
          steps.push({
            stepId: steps.length,
            lineNumbers: isNew ? [10, 11] : [10],
            shortLabel: isNew ? `Add ${tree[idx]} (depth ${depth})` : `Skip ${tree[idx]} (depth ${depth} seen)`,
            explanation: isNew
              ? `depth (${depth}) == result.size() (${result.length}). First node at this depth — add ${tree[idx]}.`
              : `depth (${depth}) != result.size() (${result.length}). Depth ${depth} already captured. Skip.`,
            variables: { depth, "node.val": tree[idx], "result.size()": result.length, result: `[${result.join(", ")}]` },
            dataStructure: {
              treeNodes: buildTreeNodes(states),
              callStack: [...callStack],
            },
            delta: { changedIndices: [idx + 1] },
            isAnswer: false,
          });

          if (isNew) {
            result.push(tree[idx]);
            states[idx] = "found";
          } else {
            states[idx] = "visited";
          }

          // right first
          const rightIdx = 2 * idx + 2;
          dfs(rightIdx, depth + 1);

          // then left
          const leftIdx = 2 * idx + 1;
          dfs(leftIdx, depth + 1);

          callStack.pop();
        }

        dfs(0, 0);

        if (steps.length > 0) {
          steps[steps.length - 1].isAnswer = true;
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n)", space: "O(n)", explanation: "BFS visits every node; queue holds up to n/2 nodes at the widest level" },
    optimal: { time: "O(n)", space: "O(h)", explanation: "DFS visits every node; recursion stack depth = tree height h (log n balanced, n worst case)" },
  },

  interviewTips: [
    "Clarify: is it the right side view (rightmost at each depth) or just right children?",
    "Mention both BFS and DFS approaches — BFS is more intuitive, DFS is more space-efficient.",
    "For DFS, explain WHY right-before-left ordering guarantees correctness.",
    "Edge case: a left-heavy tree where left nodes appear on the right side.",
    "Time is O(n) for both — every node is visited exactly once.",
    "Space tradeoff: BFS uses O(width) ≈ O(n/2), DFS uses O(height) ≈ O(log n) for balanced trees.",
  ],

  relatedProblems: ["level-order-traversal", "max-depth-binary-tree"],
};
