export const constructBinaryTree = {
  id: 58,
  slug: "construct-binary-tree",
  title: "Construct Binary Tree from Preorder and Inorder Traversal",
  difficulty: "Medium",
  topic: "trees",
  topicLabel: "Trees",
  neetcodeNumber: 58,
  artifactType: "BST",
  companies: ["Amazon", "Google", "Microsoft", "Bloomberg", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",

  pattern: "Recursive Divide and Conquer with Index Mapping",
  patternExplanation: `Preorder's first element is always the root. Find that root in inorder to
    split into left and right subtrees. Use a HashMap for O(1) inorder index lookup. Recurse on
    each subtree with adjusted boundaries.`,

  intuition: {
    coreInsight: `Preorder tells you WHO is the root (always the first element). Inorder tells you
      WHAT belongs to the left vs right subtree (everything left of root in inorder is in the left
      subtree). Together, they uniquely determine the tree structure. The root splits inorder into
      left and right halves, and the sizes of those halves tell us how to split preorder.`,

    mentalModel: `Imagine assembling a family tree from two lists. The "announcement order" (preorder)
      tells you the patriarch first, then their family in order. The "seating chart" (inorder) tells
      you who sits to the left and right of each person. The first person announced is the root.
      Everyone to their left in the seating chart is their left subtree.`,

    whyNaiveFails: `Without the HashMap for inorder lookups, finding the root's position in inorder
      takes O(n) per recursive call, giving O(n^2) total. The HashMap reduces each lookup to O(1),
      bringing total time to O(n).`,

    keyObservation: `The number of elements in the left subtree (found from inorder) tells us
      exactly how many elements in preorder belong to the left subtree. If root is at inorder
      index mid, left subtree has (mid - inStart) nodes, so left subtree's preorder is
      preStart+1 to preStart+leftSize.`,
  },

  problem: `Given two integer arrays preorder and inorder where preorder is the preorder traversal
    of a binary tree and inorder is the inorder traversal of the same tree, construct and return
    the binary tree.`,

  examples: [
    { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]", explanation: "Root=3, left subtree=[9], right subtree=[20,15,7]." },
    { input: "preorder = [-1], inorder = [-1]", output: "[-1]", explanation: "Single node." },
  ],

  constraints: [
    "1 <= preorder.length <= 3000",
    "inorder.length == preorder.length",
    "-3000 <= preorder[i], inorder[i] <= 3000",
    "preorder and inorder consist of unique values",
    "Each value of inorder also appears in preorder",
    "preorder is guaranteed to be the preorder traversal of the tree",
    "inorder is guaranteed to be the inorder traversal of the tree",
  ],

  approaches: {
    brute: {
      label: "Recursive without HashMap",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: "Recursively find root from preorder, search for it in inorder (linear scan), then split.",

      javaCode: `public TreeNode buildTree(int[] preorder, int[] inorder) {
    return build(preorder, 0, preorder.length - 1,
                 inorder, 0, inorder.length - 1);
}

TreeNode build(int[] pre, int preS, int preE,
               int[] in, int inS, int inE) {
    if (preS > preE) return null;
    TreeNode root = new TreeNode(pre[preS]);
    int mid = inS;
    while (in[mid] != pre[preS]) mid++;
    int leftSize = mid - inS;
    root.left = build(pre, preS+1, preS+leftSize, in, inS, mid-1);
    root.right = build(pre, preS+leftSize+1, preE, in, mid+1, inE);
    return root;
}`,

      cppCode: `TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    return build(preorder, 0, preorder.size()-1,
                 inorder, 0, inorder.size()-1);
}

TreeNode* build(vector<int>& pre, int preS, int preE,
                vector<int>& in, int inS, int inE) {
    if (preS > preE) return nullptr;
    TreeNode* root = new TreeNode(pre[preS]);
    int mid = inS;
    while (in[mid] != pre[preS]) mid++;
    int leftSize = mid - inS;
    root->left = build(pre, preS+1, preS+leftSize, in, inS, mid-1);
    root->right = build(pre, preS+leftSize+1, preE, in, mid+1, inE);
    return root;
}`,

      pythonCode: `def buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
    def build(preS, preE, inS, inE):
        if preS > preE:
            return None
        root = TreeNode(preorder[preS])
        mid = inS
        while inorder[mid] != preorder[preS]:
            mid += 1
        leftSize = mid - inS
        root.left = build(preS+1, preS+leftSize, inS, mid-1)
        root.right = build(preS+leftSize+1, preE, mid+1, inE)
        return root
    return build(0, len(preorder)-1, 0, len(inorder)-1)`,

      lineAnnotations: {
        8: "Base case: empty range",
        9: "Root is first element of preorder range",
        10: "Linear scan to find root in inorder — O(n) per call",
        12: "leftSize determines the split point",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7] },
          expectedOutput: "[3,9,20,null,null,15,7]",
          steps: [
            {
              stepId: 0, lineNumbers: [9, 10], shortLabel: "Root=3, find in inorder",
              explanation: "preorder[0]=3 is the root. Find 3 in inorder at index 1. Left subtree: inorder[0..0]=[9]. Right: inorder[2..4]=[15,20,7].",
              variables: { root: 3, mid: 1, leftSize: 1 },
              dataStructure: { treeNodes: { 1: { val: 3, left: null, right: null, state: "active", depth: 0 } }, callStack: ["build(3)"] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [13, 14], shortLabel: "Build complete tree",
              explanation: "Recursively build: left child=9 (leaf), right subtree root=20, its left=15, right=7.",
              variables: { tree: "[3,9,20,null,null,15,7]" },
              dataStructure: { treeNodes: { 1: { val: 3, left: 2, right: 3, state: "found", depth: 0 }, 2: { val: 9, left: null, right: null, state: "found", depth: 1 }, 3: { val: 20, left: 4, right: 5, state: "found", depth: 1 }, 4: { val: 15, left: null, right: null, state: "found", depth: 2 }, 5: { val: 7, left: null, right: null, state: "found", depth: 2 } }, callStack: [] },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ preorder, inorder }) {
        const steps = [];
        steps.push({ stepId: 0, lineNumbers: [9], shortLabel: "Build tree (brute)", explanation: "Recursive build with linear inorder search.", variables: {}, dataStructure: { treeNodes: {}, callStack: [] }, delta: {}, isAnswer: true });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Recursive with HashMap",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: `Pre-build a HashMap mapping each inorder value to its index. This makes finding the
        root position in inorder O(1) instead of O(n), reducing total time to O(n).`,

      javaCode: `public TreeNode buildTree(int[] preorder, int[] inorder) {
    Map<Integer, Integer> inMap = new HashMap<>();
    for (int i = 0; i < inorder.length; i++)
        inMap.put(inorder[i], i);
    return build(preorder, 0, preorder.length - 1,
                 0, inorder.length - 1, inMap);
}

TreeNode build(int[] pre, int preS, int preE,
               int inS, int inE, Map<Integer, Integer> inMap) {
    if (preS > preE) return null;
    TreeNode root = new TreeNode(pre[preS]);
    int mid = inMap.get(pre[preS]);
    int leftSize = mid - inS;
    root.left = build(pre, preS+1, preS+leftSize, inS, mid-1, inMap);
    root.right = build(pre, preS+leftSize+1, preE, mid+1, inE, inMap);
    return root;
}`,

      cppCode: `TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    unordered_map<int, int> inMap;
    for (int i = 0; i < inorder.size(); i++)
        inMap[inorder[i]] = i;
    return build(preorder, 0, preorder.size()-1,
                 0, inorder.size()-1, inMap);
}

TreeNode* build(vector<int>& pre, int preS, int preE,
                int inS, int inE, unordered_map<int,int>& inMap) {
    if (preS > preE) return nullptr;
    TreeNode* root = new TreeNode(pre[preS]);
    int mid = inMap[pre[preS]];
    int leftSize = mid - inS;
    root->left = build(pre, preS+1, preS+leftSize, inS, mid-1, inMap);
    root->right = build(pre, preS+leftSize+1, preE, mid+1, inE, inMap);
    return root;
}`,

      pythonCode: `def buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
    in_map = {val: idx for idx, val in enumerate(inorder)}

    def build(preS, preE, inS, inE):
        if preS > preE:
            return None
        root = TreeNode(preorder[preS])
        mid = in_map[preorder[preS]]
        leftSize = mid - inS
        root.left = build(preS+1, preS+leftSize, inS, mid-1)
        root.right = build(preS+leftSize+1, preE, mid+1, inE)
        return root

    return build(0, len(preorder)-1, 0, len(inorder)-1)`,

      lineAnnotations: {
        2: "Build HashMap: inorder value → index for O(1) lookup",
        11: "Base case: empty subarray",
        12: "Root is first element of current preorder range",
        13: "O(1) lookup of root's position in inorder",
        14: "Number of nodes in the left subtree",
        15: "Left subtree uses preorder[preS+1..preS+leftSize]",
        16: "Right subtree uses preorder[preS+leftSize+1..preE]",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Build tree from preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]",
          input: { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7] },
          expectedOutput: "[3,9,20,null,null,15,7]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Build inorder HashMap",
              explanation: "Map each inorder value to its index: {9:0, 3:1, 15:2, 20:3, 7:4}. This enables O(1) root lookups.",
              variables: { inMap: "{9:0, 3:1, 15:2, 20:3, 7:4}" },
              dataStructure: {
                treeNodes: {},
                callStack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12, 13, 14],
              shortLabel: "Root=3, mid=1, leftSize=1",
              explanation: "preorder[0]=3 is the root. inMap[3]=1. leftSize=1-0=1 (one node in left subtree). Left preorder: [9]. Right preorder: [20,15,7].",
              variables: { root: 3, mid: 1, leftSize: 1, leftPre: "[9]", rightPre: "[20,15,7]" },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: null, right: null, state: "active", depth: 0 } },
                callStack: ["build(0,4,0,4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13, 14, 15],
              shortLabel: "Left child: root=9 (leaf)",
              explanation: "preorder[1]=9. inMap[9]=0. leftSize=0-0=0. No left or right children. Node 9 is a leaf.",
              variables: { root: 9, mid: 0, leftSize: 0 },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: null, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "active", depth: 1 } },
                callStack: ["build(0,4,0,4)", "build(1,1,0,0)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 14, 16],
              shortLabel: "Right child: root=20",
              explanation: "preorder[2]=20. inMap[20]=3. leftSize=3-2=1 (node 15). Right has 1 node (7).",
              variables: { root: 20, mid: 3, leftSize: 1 },
              dataStructure: {
                treeNodes: { 1: { val: 3, left: 2, right: 3, state: "visited", depth: 0 }, 2: { val: 9, left: null, right: null, state: "found", depth: 1 }, 3: { val: 20, left: null, right: null, state: "active", depth: 1 } },
                callStack: ["build(0,4,0,4)", "build(2,4,2,4)"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [15, 16],
              shortLabel: "20's children: left=15, right=7",
              explanation: "20's left subtree: preorder[3]=15 (leaf). Right subtree: preorder[4]=7 (leaf). Tree complete!",
              variables: { "20.left": 15, "20.right": 7 },
              dataStructure: {
                treeNodes: {
                  1: { val: 3, left: 2, right: 3, state: "found", depth: 0 },
                  2: { val: 9, left: null, right: null, state: "found", depth: 1 },
                  3: { val: 20, left: 4, right: 5, state: "found", depth: 1 },
                  4: { val: 15, left: null, right: null, state: "found", depth: 2 },
                  5: { val: 7, left: null, right: null, state: "found", depth: 2 },
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
          label: "Left-skewed",
          description: "All nodes only have left children",
          input: { preorder: [3,2,1], inorder: [1,2,3] },
          expectedOutput: "[3,2,null,1]",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Build HashMap",
              explanation: "inMap: {1:0, 2:1, 3:2}.",
              variables: { inMap: "{1:0, 2:1, 3:2}" },
              dataStructure: { treeNodes: {}, callStack: [] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [12, 13, 14], shortLabel: "Root=3, leftSize=2",
              explanation: "Root=3 at inorder index 2. leftSize=2 (nodes 1 and 2 are in left subtree). No right subtree.",
              variables: { root: 3, leftSize: 2 },
              dataStructure: { treeNodes: { 1: { val: 3, left: null, right: null, state: "active", depth: 0 } }, callStack: ["build(3)"] },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [15, 16], shortLabel: "3→left=2→left=1",
              explanation: "3's left child is 2 (leftSize=1), 2's left child is 1 (leaf). Fully left-skewed tree.",
              variables: { tree: "[3,2,null,1]" },
              dataStructure: { treeNodes: { 1: { val: 3, left: 2, right: null, state: "found", depth: 0 }, 2: { val: 2, left: 3, right: null, state: "found", depth: 1 }, 3: { val: 1, left: null, right: null, state: "found", depth: 2 } }, callStack: [] },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ preorder, inorder }) {
        const steps = [];
        const inMap = {};
        inorder.forEach((v, i) => { inMap[v] = i; });

        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4],
          shortLabel: "Build inorder HashMap",
          explanation: `Map: {${inorder.map((v, i) => `${v}:${i}`).join(", ")}}.`,
          variables: { inMap: JSON.stringify(inMap) },
          dataStructure: { treeNodes: {}, callStack: [] },
          delta: {}, isAnswer: false,
        });

        let nodeId = 0;
        const treeNodes = {};

        function build(preS, preE, inS, inE, depth) {
          if (preS > preE) return null;
          const rootVal = preorder[preS];
          const mid = inMap[rootVal];
          const leftSize = mid - inS;
          nodeId++;
          const id = nodeId;

          treeNodes[id] = { val: rootVal, left: null, right: null, state: "active", depth };

          steps.push({
            stepId: steps.length, lineNumbers: [12, 13, 14],
            shortLabel: `Root=${rootVal}, leftSize=${leftSize}`,
            explanation: `preorder[${preS}]=${rootVal}. inMap[${rootVal}]=${mid}. leftSize=${leftSize}.`,
            variables: { root: rootVal, mid, leftSize },
            dataStructure: { treeNodes: JSON.parse(JSON.stringify(treeNodes)), callStack: [] },
            delta: {}, isAnswer: false,
          });

          const leftId = build(preS + 1, preS + leftSize, inS, mid - 1, depth + 1);
          const rightId = build(preS + leftSize + 1, preE, mid + 1, inE, depth + 1);
          treeNodes[id].left = leftId;
          treeNodes[id].right = rightId;
          treeNodes[id].state = "found";
          return id;
        }

        build(0, preorder.length - 1, 0, inorder.length - 1, 0);

        steps.push({
          stepId: steps.length, lineNumbers: [17],
          shortLabel: "Tree constructed",
          explanation: "Binary tree fully reconstructed from preorder and inorder traversals.",
          variables: { answer: "tree built" },
          dataStructure: { treeNodes: JSON.parse(JSON.stringify(treeNodes)), callStack: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n^2)", space: "O(n)", explanation: "Linear scan in inorder at each of n recursive calls" },
    optimal: { time: "O(n)", space: "O(n)", explanation: "HashMap gives O(1) lookup; each node processed once", tradeoff: "O(n) extra space for HashMap but reduces time from O(n^2) to O(n)" },
  },

  interviewTips: [
    "State clearly: preorder's first element = root; inorder splits left vs right subtree.",
    "Build the HashMap upfront — mention it reduces lookup from O(n) to O(1).",
    "Walk through the leftSize calculation carefully — it's the crux of the algorithm.",
    "Mention all values are unique — this is required for the algorithm to work.",
    "This problem tests understanding of traversal orders, not just coding ability.",
  ],

  relatedProblems: ["serialize-deserialize-tree", "validate-bst", "level-order-traversal"],
};
