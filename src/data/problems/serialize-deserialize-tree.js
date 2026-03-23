export const serializeDeserializeTree = {
  id: 60,
  slug: "serialize-deserialize-tree",
  title: "Serialize and Deserialize Binary Tree",
  difficulty: "Hard",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 60,
  artifactType: "BST",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "LinkedIn"],
  leetcodeLink: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",

  pattern: "Preorder Traversal with Null Markers",
  patternExplanation: `Serialize a tree by recording each node's value in preorder (root-left-right),
    using a sentinel like "N" for null children. This captures both structure and values in a single
    string. Deserialize by reading tokens sequentially and recursively rebuilding.`,

  intuition: {
    coreInsight: `A binary tree can be uniquely reconstructed from its preorder traversal if and only
      if we also record where null children are. By writing "N" for every null pointer we encounter,
      the serialized string contains enough information to know exactly when to stop building the
      left subtree and start building the right. No second traversal (like inorder) is needed.`,

    mentalModel: `Imagine describing a family tree over the phone to someone who needs to draw it.
      You say each person's name as you visit them (parent first, then left child, then right child).
      When a branch ends, you say "nobody." The listener knows: every time they hear "nobody," that
      branch is done, and they should go back up and try the right side. The null markers ARE the
      structural instructions — they tell you when to backtrack.`,

    whyNaiveFails: `Without null markers, a preorder traversal like "1,2,3" is ambiguous — is 2 the
      left or right child of 1? Is 3 a child of 2 or of 1? There are 5 different binary trees that
      produce the preorder sequence [1,2,3]. Null markers eliminate all ambiguity by explicitly
      encoding the shape of the tree.`,

    keyObservation: `During deserialization, we consume tokens from the serialized string one by one
      using a global index. Each recursive call takes the next token: if it's "N", return null; otherwise
      create a node, recurse left, then recurse right. The global index naturally advances through the
      string, so left-subtree deserialization consumes exactly the right number of tokens before
      right-subtree deserialization begins.`,
  },

  problem: `Serialization is the process of converting a data structure or object into a sequence of bits
    so that it can be stored in a file or memory buffer, or transmitted across a network connection link
    to be reconstructed later in the same or another computer environment. Design an algorithm to
    serialize and deserialize a binary tree. There is no restriction on how your serialization /
    deserialization algorithm should work. You just need to ensure that a binary tree can be serialized
    to a string and this string can be deserialized to the original tree structure.`,

  examples: [
    { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]", explanation: "The tree is serialized and deserialized back to the same structure." },
    { input: "root = []", output: "[]", explanation: "An empty tree serializes to an empty representation." },
  ],

  constraints: [
    "The number of nodes in the tree is in the range [0, 10^4].",
    "-1000 <= Node.val <= 1000",
  ],

  approaches: {
    brute: {
      label: "BFS Level-Order",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "Use BFS to serialize level by level, including nulls. Deserialize by reading level by level and connecting parent to children.",

      javaCode: `public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                sb.append("N,");
            } else {
                sb.append(node.val).append(",");
                queue.offer(node.left);
                queue.offer(node.right);
            }
        }
        return sb.toString();
    }

    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        String[] tokens = data.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < tokens.length) {
            TreeNode node = queue.poll();
            if (!tokens[i].equals("N")) {
                node.left = new TreeNode(Integer.parseInt(tokens[i]));
                queue.offer(node.left);
            }
            i++;
            if (i < tokens.length && !tokens[i].equals("N")) {
                node.right = new TreeNode(Integer.parseInt(tokens[i]));
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }
}`,

      cppCode: `class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "";
        string result;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* node = q.front(); q.pop();
            if (!node) {
                result += "N,";
            } else {
                result += to_string(node->val) + ",";
                q.push(node->left);
                q.push(node->right);
            }
        }
        return result;
    }

    TreeNode* deserialize(string data) {
        if (data.empty()) return nullptr;
        stringstream ss(data);
        string token;
        getline(ss, token, ',');
        TreeNode* root = new TreeNode(stoi(token));
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* node = q.front(); q.pop();
            if (getline(ss, token, ',') && token != "N") {
                node->left = new TreeNode(stoi(token));
                q.push(node->left);
            }
            if (getline(ss, token, ',') && token != "N") {
                node->right = new TreeNode(stoi(token));
                q.push(node->right);
            }
        }
        return root;
    }
};`,

      pythonCode: `class Codec:
    def serialize(self, root):
        if not root:
            return ""
        result = []
        queue = deque([root])
        while queue:
            node = queue.popleft()
            if not node:
                result.append("N")
            else:
                result.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
        return ",".join(result)

    def deserialize(self, data):
        if not data:
            return None
        tokens = data.split(",")
        root = TreeNode(int(tokens[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(tokens):
            node = queue.popleft()
            if tokens[i] != "N":
                node.left = TreeNode(int(tokens[i]))
                queue.append(node.left)
            i += 1
            if i < len(tokens) and tokens[i] != "N":
                node.right = TreeNode(int(tokens[i]))
                queue.append(node.right)
            i += 1
        return root`,

      lineAnnotations: {
        2: "Handle empty tree edge case",
        4: "BFS queue initialized with root",
        6: "Process each node level by level",
        7: "Null nodes serialize as 'N'",
        9: "Non-null nodes: record value, enqueue children",
        18: "Split serialized string into tokens",
        19: "Create root from first token",
        23: "Dequeue parent, assign left and right children from tokens",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { tree: [1, 2, 3, null, null, 4, 5] },
          expectedOutput: "1,2,3,N,N,4,5,N,N,N,N",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4],
              shortLabel: "Init BFS queue with root",
              explanation: "Start BFS serialization. Enqueue root node (value=1). We'll process level by level.",
              variables: { queue: "[1]", result: "" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "default", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["serialize(root)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 9],
              shortLabel: "Dequeue 1, enqueue children",
              explanation: "Dequeue node 1. It's not null, so append '1' to result. Enqueue its left child (2) and right child (3).",
              variables: { queue: "[2, 3]", result: "1," },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "queued", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "queued", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["serialize(root)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 9],
              shortLabel: "Dequeue 2, null children → N,N",
              explanation: "Dequeue node 2. Append '2'. Its left and right are both null — enqueue two nulls. They'll produce 'N' when dequeued.",
              variables: { queue: "[3, null, null]", result: "1,2," },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "active", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "queued", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["serialize(root)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 9],
              shortLabel: "Dequeue 3, enqueue 4 and 5",
              explanation: "Dequeue node 3. Append '3'. Enqueue left child (4) and right child (5).",
              variables: { queue: "[null, null, 4, 5]", result: "1,2,3," },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "active", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "queued", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "queued", depth: 2 },
                },
                callStack: ["serialize(root)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7],
              shortLabel: "Two nulls → N,N",
              explanation: "Dequeue the two null children of node 2. Each appends 'N' to the result. These mark the end of node 2's subtree.",
              variables: { queue: "[4, 5]", result: "1,2,3,N,N," },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "visited", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "queued", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "queued", depth: 2 },
                },
                callStack: ["serialize(root)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 9],
              shortLabel: "Dequeue 4 and 5, append values",
              explanation: "Dequeue nodes 4 and 5, appending their values. Their null children will produce more N markers.",
              variables: { queue: "[null, null, null, null]", result: "1,2,3,N,N,4,5," },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "visited", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "active", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["serialize(root)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [7],
              shortLabel: "Final nulls → complete",
              explanation: "All remaining null children dequeue as 'N'. Serialization complete: '1,2,3,N,N,4,5,N,N,N,N'. Every node and null pointer is recorded.",
              variables: { result: "1,2,3,N,N,4,5,N,N,N,N" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "found", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tree }) {
        const steps = [];
        if (!tree || tree.length === 0) {
          steps.push({
            stepId: 0, lineNumbers: [2],
            shortLabel: "Empty tree",
            explanation: "Tree is empty. Return empty string.",
            variables: { result: "" },
            dataStructure: { treeNodes: {}, callStack: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }
        steps.push({
          stepId: 0, lineNumbers: [4],
          shortLabel: "Init BFS",
          explanation: "Initialize BFS queue with root node.",
          variables: { queue: `[${tree[0]}]`, result: "" },
          dataStructure: { treeNodes: {}, callStack: ["serialize(root)"] },
          delta: {}, isAnswer: false,
        });
        steps.push({
          stepId: 1, lineNumbers: [6, 9],
          shortLabel: "Serialize complete",
          explanation: "BFS processes all nodes level by level, producing the serialized string.",
          variables: { result: tree.map(v => v === null ? "N" : v).join(",") },
          dataStructure: { treeNodes: {}, callStack: [] },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Preorder DFS with Null Markers",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Serialize via preorder DFS: visit root, recurse left, recurse right. Write "N" for null nodes.
        Deserialize by reading tokens one by one with a global index, recursively building left then right subtrees.`,

      javaCode: `public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        dfsSerialize(root, sb);
        return sb.toString();
    }

    private void dfsSerialize(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append("N,");
            return;
        }
        sb.append(node.val).append(",");
        dfsSerialize(node.left, sb);
        dfsSerialize(node.right, sb);
    }

    private int idx;

    public TreeNode deserialize(String data) {
        String[] tokens = data.split(",");
        idx = 0;
        return dfsDeserialize(tokens);
    }

    private TreeNode dfsDeserialize(String[] tokens) {
        if (tokens[idx].equals("N")) {
            idx++;
            return null;
        }
        TreeNode node = new TreeNode(Integer.parseInt(tokens[idx++]));
        node.left = dfsDeserialize(tokens);
        node.right = dfsDeserialize(tokens);
        return node;
    }
}`,

      cppCode: `class Codec {
public:
    string serialize(TreeNode* root) {
        string result;
        dfsSerialize(root, result);
        return result;
    }

    void dfsSerialize(TreeNode* node, string& result) {
        if (!node) {
            result += "N,";
            return;
        }
        result += to_string(node->val) + ",";
        dfsSerialize(node->left, result);
        dfsSerialize(node->right, result);
    }

    TreeNode* deserialize(string data) {
        stringstream ss(data);
        return dfsDeserialize(ss);
    }

    TreeNode* dfsDeserialize(stringstream& ss) {
        string token;
        getline(ss, token, ',');
        if (token == "N") return nullptr;
        TreeNode* node = new TreeNode(stoi(token));
        node->left = dfsDeserialize(ss);
        node->right = dfsDeserialize(ss);
        return node;
    }
};`,

      pythonCode: `class Codec:
    def serialize(self, root):
        result = []
        def dfs(node):
            if not node:
                result.append("N")
                return
            result.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(result)

    def deserialize(self, data):
        tokens = data.split(",")
        self.idx = 0
        def dfs():
            if tokens[self.idx] == "N":
                self.idx += 1
                return None
            node = TreeNode(int(tokens[self.idx]))
            self.idx += 1
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`,

      lineAnnotations: {
        8: "Base case: null node serializes as 'N'",
        9: "Append null marker and stop recursing",
        11: "Record current node's value",
        12: "Recurse into left subtree first (preorder)",
        13: "Then recurse into right subtree",
        17: "Global index tracks position in token array",
        24: "If current token is 'N', consume it and return null",
        27: "Create node from current token, advance index",
        28: "Recursively build left subtree",
        29: "Recursively build right subtree",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Balanced tree with 5 nodes — demonstrates full preorder serialization",
          input: { tree: [1, 2, 3, null, null, 4, 5] },
          expectedOutput: "1,2,N,N,3,4,N,N,5,N,N",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start serialize",
              explanation: "Begin preorder DFS serialization from the root. We'll visit each node in root-left-right order and write 'N' for every null pointer.",
              variables: { result: "[]", call: "serialize(root)" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "default", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "default", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11],
              shortLabel: "Visit root: append 1",
              explanation: "Visit node 1 (root). Append '1' to result. Next we'll recurse left to node 2.",
              variables: { result: "[1]", node: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "active", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "default", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 11],
              shortLabel: "Recurse left: append 2",
              explanation: "Recurse into left child of 1. Visit node 2. Append '2'. Node 2 has no children, so both recursive calls will hit null.",
              variables: { result: "[1, 2]", node: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "active", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9],
              shortLabel: "Node 2 left=null → N",
              explanation: "Node 2's left child is null. Append 'N'. This null marker tells the deserializer: 'no left child here, go back up.'",
              variables: { result: "[1, 2, N]", node: "null" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "active", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(2)", "dfs(null)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13, 8, 9],
              shortLabel: "Node 2 right=null → N",
              explanation: "Node 2's right child is also null. Append 'N'. Node 2's subtree is fully serialized. Backtrack to node 1 and go right.",
              variables: { result: "[1, 2, N, N]", node: "null" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "default", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(2)", "dfs(null)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13, 11],
              shortLabel: "Recurse right of 1: append 3",
              explanation: "Back at node 1, now recurse right. Visit node 3. Append '3'. Node 3 has children 4 and 5.",
              variables: { result: "[1, 2, N, N, 3]", node: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "active", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "default", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [12, 11],
              shortLabel: "Recurse left of 3: append 4",
              explanation: "Recurse into left child of 3. Visit node 4. Append '4'. Node 4 is a leaf — both children are null.",
              variables: { result: "[1, 2, N, N, 3, 4]", node: 4 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "visited", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "active", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(3)", "dfs(4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [8, 9],
              shortLabel: "Node 4: N, N",
              explanation: "Node 4 is a leaf. Both children are null, so append 'N, N'. Backtrack to node 3.",
              variables: { result: "[1, 2, N, N, 3, 4, N, N]", node: "null" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "visited", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "visited", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [13, 11],
              shortLabel: "Recurse right of 3: append 5",
              explanation: "Back at node 3, recurse right. Visit node 5. Append '5'. Node 5 is also a leaf.",
              variables: { result: "[1, 2, N, N, 3, 4, N, N, 5]", node: 5 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "visited", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "visited", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "visited", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(3)", "dfs(5)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [8, 9],
              shortLabel: "Node 5: N, N → Done!",
              explanation: "Node 5 is a leaf. Append 'N, N'. All nodes visited. Final serialized string: '1,2,N,N,3,4,N,N,5,N,N'. This preorder encoding uniquely represents the tree.",
              variables: { result: "1,2,N,N,3,4,N,N,5,N,N" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 2, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 3, left: 4, right: 5, state: "found", depth: 1 },
                  4: { val: 4, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 5, left: null, right: null, state: "found", depth: 2 },
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
          label: "Left-Skewed",
          description: "Tree is a straight line going left — tests deep recursion and all-null right children",
          input: { tree: [1, 2, null, 3, null, null, null] },
          expectedOutput: "1,2,3,N,N,N,N",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start serialize",
              explanation: "Begin preorder DFS on a left-skewed tree: 1 → 2 → 3. Every node's right child is null. This tests that null markers correctly terminate right subtrees.",
              variables: { result: "[]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "default", depth: 0 },
                  2: { val: 2, left: 3, right: null, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11],
              shortLabel: "Visit 1 → append 1",
              explanation: "Visit root node 1. Append '1'. Recurse left to node 2.",
              variables: { result: "[1]", node: 1 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "active", depth: 0 },
                  2: { val: 2, left: 3, right: null, state: "default", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 11],
              shortLabel: "Visit 2 → append 2",
              explanation: "Recurse left from 1. Visit node 2. Append '2'. Continue left to node 3.",
              variables: { result: "[1, 2]", node: 2 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "visited", depth: 0 },
                  2: { val: 2, left: 3, right: null, state: "active", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "default", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 11],
              shortLabel: "Visit 3 → append 3",
              explanation: "Recurse left from 2. Visit node 3 (deepest leaf). Append '3'. Both children are null.",
              variables: { result: "[1, 2, 3]", node: 3 },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "visited", depth: 0 },
                  2: { val: 2, left: 3, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "active", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(2)", "dfs(3)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 9],
              shortLabel: "Node 3: N, N",
              explanation: "Node 3 is a leaf. Append 'N' for left, 'N' for right. Backtrack to node 2.",
              variables: { result: "[1, 2, 3, N, N]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "visited", depth: 0 },
                  2: { val: 2, left: 3, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "visited", depth: 2 },
                },
                callStack: ["dfs(1)", "dfs(2)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13, 8, 9],
              shortLabel: "Node 2 right=null → N",
              explanation: "Back at node 2. Its right child is null. Append 'N'. Backtrack to node 1.",
              variables: { result: "[1, 2, 3, N, N, N]" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "visited", depth: 0 },
                  2: { val: 2, left: 3, right: null, state: "visited", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "visited", depth: 2 },
                },
                callStack: ["dfs(1)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13, 8, 9],
              shortLabel: "Node 1 right=null → N → Done!",
              explanation: "Back at node 1. Its right child is null. Append 'N'. Serialization complete: '1,2,3,N,N,N,N'. Notice every right branch produced an 'N' — that's the signature of a left-skewed tree.",
              variables: { result: "1,2,3,N,N,N,N" },
              dataStructure: {
                treeNodes: {
                  1: { val: 1, left: 2, right: null, state: "found", depth: 0 },
                  2: { val: 2, left: 3, right: null, state: "found", depth: 1 },
                  3: { val: 3, left: null, right: null, state: "found", depth: 2 },
                },
                callStack: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tree }) {
        const steps = [];
        if (!tree || tree.length === 0 || tree[0] === null) {
          steps.push({
            stepId: 0, lineNumbers: [8, 9],
            shortLabel: "Empty tree → N",
            explanation: "Tree is empty. Serialize as just 'N'.",
            variables: { result: "N" },
            dataStructure: { treeNodes: {}, callStack: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        // Build tree structure from level-order array
        const nodes = {};
        const nodeIds = [];
        for (let i = 0; i < tree.length; i++) {
          if (tree[i] !== null) {
            const leftIdx = 2 * i + 1;
            const rightIdx = 2 * i + 2;
            nodes[i] = {
              val: tree[i],
              left: leftIdx < tree.length && tree[leftIdx] !== null ? leftIdx : null,
              right: rightIdx < tree.length && tree[rightIdx] !== null ? rightIdx : null,
              depth: Math.floor(Math.log2(i + 1)),
            };
            nodeIds.push(i);
          }
        }

        const result = [];
        const visited = new Set();
        const callStack = [];

        function dfs(nodeIdx) {
          if (nodeIdx === null || !nodes[nodeIdx]) {
            result.push("N");
            const treeState = {};
            nodeIds.forEach(id => {
              treeState[id] = { ...nodes[id], state: visited.has(id) ? "visited" : "default" };
            });
            steps.push({
              stepId: steps.length, lineNumbers: [8, 9],
              shortLabel: `null → N`,
              explanation: `Null child encountered. Append 'N' marker.`,
              variables: { result: `[${result.join(", ")}]` },
              dataStructure: { treeNodes: treeState, callStack: [...callStack] },
              delta: {}, isAnswer: false,
            });
            return;
          }

          result.push(String(nodes[nodeIdx].val));
          visited.add(nodeIdx);
          callStack.push(`dfs(${nodes[nodeIdx].val})`);

          const treeState = {};
          nodeIds.forEach(id => {
            treeState[id] = { ...nodes[id], state: id === nodeIdx ? "active" : visited.has(id) ? "visited" : "default" };
          });

          steps.push({
            stepId: steps.length, lineNumbers: [11],
            shortLabel: `Visit ${nodes[nodeIdx].val}`,
            explanation: `Visit node ${nodes[nodeIdx].val}. Append '${nodes[nodeIdx].val}' to result.`,
            variables: { result: `[${result.join(", ")}]`, node: nodes[nodeIdx].val },
            dataStructure: { treeNodes: treeState, callStack: [...callStack] },
            delta: {}, isAnswer: false,
          });

          dfs(nodes[nodeIdx].left);
          dfs(nodes[nodeIdx].right);
          callStack.pop();
        }

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Start serialize",
          explanation: "Begin preorder DFS serialization from root.",
          variables: { result: "[]" },
          dataStructure: {
            treeNodes: Object.fromEntries(nodeIds.map(id => [id, { ...nodes[id], state: "default" }])),
            callStack: [],
          },
          delta: {}, isAnswer: false,
        });

        dfs(0);

        // Mark final step as answer
        if (steps.length > 0) {
          const lastStep = steps[steps.length - 1];
          lastStep.isAnswer = true;
          lastStep.explanation = `Serialization complete: '${result.join(",")}'.`;
          lastStep.shortLabel = "Serialization complete";
          const treeState = {};
          nodeIds.forEach(id => {
            treeState[id] = { ...nodes[id], state: "found" };
          });
          lastStep.dataStructure.treeNodes = treeState;
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(n)", explanation: "BFS visits every node once; queue holds up to n/2 nodes at widest level" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "DFS visits every node once; recursion stack depth is O(h), serialized string is O(n)", tradeoff: "Both BFS and DFS are O(n) time/space. DFS is simpler to code and produces a more intuitive recursive deserialization." },
  },

  interviewTips: [
    "Clarify: 'Can the tree contain negative values or zeros?' — yes, so we need a sentinel that isn't a valid node value, like 'N' or '#'.",
    "Mention why preorder works: root comes first, so the deserializer knows the root immediately and can recursively build left then right.",
    "Explain why inorder alone doesn't work: without the root position, the structure is ambiguous.",
    "Highlight the global index trick: the deserializer consumes tokens sequentially, so left-subtree deserialization automatically stops at the right place.",
    "Edge cases to mention: empty tree (just 'N'), single node ('1,N,N'), left-skewed tree (many trailing N's).",
    "If asked about space, clarify: the serialized string itself is O(n) — each of n nodes contributes one value and each of n+1 null pointers contributes one 'N'.",
  ],

  relatedProblems: ["construct-binary-tree", "level-order-traversal", "validate-bst"],
};
