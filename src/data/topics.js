export const TOPICS = [
  {
    id: "arrays-hashing",
    label: "Arrays & Hashing",
    icon: "🗂️",
    problems: [
      { slug: "two-sum",                       title: "Two Sum",                            difficulty: "Easy"   },
      { slug: "contains-duplicate",             title: "Contains Duplicate",                 difficulty: "Easy"   },
      { slug: "valid-anagram",                  title: "Valid Anagram",                      difficulty: "Easy"   },
      { slug: "group-anagrams",                 title: "Group Anagrams",                     difficulty: "Medium" },
      { slug: "top-k-frequent-elements",        title: "Top K Frequent Elements",            difficulty: "Medium" },
      { slug: "encode-decode-strings",          title: "Encode and Decode Strings",          difficulty: "Medium" },
      { slug: "product-except-self",            title: "Product of Array Except Self",       difficulty: "Medium" },
      { slug: "valid-sudoku",                   title: "Valid Sudoku",                       difficulty: "Medium" },
      { slug: "longest-consecutive-sequence",   title: "Longest Consecutive Sequence",       difficulty: "Medium" },
    ]
  },
  {
    id: "two-pointers",
    label: "Two Pointers",
    icon: "👆",
    problems: [
      { slug: "valid-palindrome",     title: "Valid Palindrome",             difficulty: "Easy"   },
      { slug: "two-sum-ii",           title: "Two Sum II",                   difficulty: "Medium" },
      { slug: "3sum",                 title: "3Sum",                         difficulty: "Medium" },
      { slug: "container-with-water", title: "Container With Most Water",    difficulty: "Medium" },
      { slug: "trapping-rain-water",  title: "Trapping Rain Water",          difficulty: "Hard"   },
    ]
  },
  {
    id: "sliding-window",
    label: "Sliding Window",
    icon: "🪟",
    problems: [
      { slug: "best-time-to-buy-stock",               title: "Best Time to Buy and Sell Stock",               difficulty: "Easy"   },
      { slug: "longest-substring-without-repeating",  title: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
      { slug: "longest-repeating-replacement",        title: "Longest Repeating Character Replacement",       difficulty: "Medium" },
      { slug: "permutation-in-string",                title: "Permutation in String",                         difficulty: "Medium" },
      { slug: "minimum-window-substring",             title: "Minimum Window Substring",                      difficulty: "Hard"   },
      { slug: "sliding-window-maximum",               title: "Sliding Window Maximum",                        difficulty: "Hard"   },
    ]
  },
  {
    id: "stack",
    label: "Stack",
    icon: "📚",
    problems: [
      { slug: "valid-parentheses",            title: "Valid Parentheses",                    difficulty: "Easy"   },
      { slug: "min-stack",                    title: "Min Stack",                            difficulty: "Medium" },
      { slug: "evaluate-reverse-polish",      title: "Evaluate Reverse Polish Notation",     difficulty: "Medium" },
      { slug: "generate-parentheses",         title: "Generate Parentheses",                 difficulty: "Medium" },
      { slug: "daily-temperatures",           title: "Daily Temperatures",                   difficulty: "Medium" },
      { slug: "car-fleet",                    title: "Car Fleet",                            difficulty: "Medium" },
      { slug: "largest-rectangle-histogram",  title: "Largest Rectangle in Histogram",       difficulty: "Hard"   },
    ]
  },
  {
    id: "binary-search",
    label: "Binary Search",
    icon: "🔍",
    problems: [
      { slug: "binary-search",            title: "Binary Search",                        difficulty: "Easy"   },
      { slug: "search-2d-matrix",         title: "Search a 2D Matrix",                   difficulty: "Medium" },
      { slug: "koko-eating-bananas",      title: "Koko Eating Bananas",                  difficulty: "Medium" },
      { slug: "find-min-rotated-array",   title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium" },
      { slug: "search-rotated-array",     title: "Search in Rotated Sorted Array",       difficulty: "Medium" },
      { slug: "time-based-key-value",     title: "Time Based Key-Value Store",           difficulty: "Medium" },
      { slug: "median-two-sorted-arrays", title: "Median of Two Sorted Arrays",          difficulty: "Hard"   },
    ]
  },
  {
    id: "linked-list",
    label: "Linked List",
    icon: "🔗",
    problems: [
      { slug: "reverse-linked-list",          title: "Reverse Linked List",                  difficulty: "Easy"   },
      { slug: "merge-two-sorted-lists",       title: "Merge Two Sorted Lists",               difficulty: "Easy"   },
      { slug: "reorder-list",                 title: "Reorder List",                         difficulty: "Medium" },
      { slug: "remove-nth-node-end",          title: "Remove Nth Node From End of List",     difficulty: "Medium" },
      { slug: "copy-list-random-pointer",     title: "Copy List with Random Pointer",        difficulty: "Medium" },
      { slug: "add-two-numbers",              title: "Add Two Numbers",                      difficulty: "Medium" },
      { slug: "linked-list-cycle",            title: "Linked List Cycle",                    difficulty: "Easy"   },
      { slug: "find-duplicate-number",        title: "Find the Duplicate Number",            difficulty: "Medium" },
      { slug: "lru-cache",                    title: "LRU Cache",                            difficulty: "Medium" },
      { slug: "merge-k-sorted-lists",         title: "Merge K Sorted Lists",                 difficulty: "Hard"   },
      { slug: "reverse-nodes-k-group",        title: "Reverse Nodes in k-Group",             difficulty: "Hard"   },
    ]
  },
  {
    id: "trees",
    label: "Trees",
    icon: "🌳",
    problems: [
      { slug: "invert-binary-tree",           title: "Invert Binary Tree",                   difficulty: "Easy"   },
      { slug: "max-depth-binary-tree",        title: "Maximum Depth of Binary Tree",         difficulty: "Easy"   },
      { slug: "diameter-binary-tree",         title: "Diameter of Binary Tree",              difficulty: "Easy"   },
      { slug: "balanced-binary-tree",         title: "Balanced Binary Tree",                 difficulty: "Easy"   },
      { slug: "same-tree",                    title: "Same Tree",                            difficulty: "Easy"   },
      { slug: "subtree-of-another-tree",      title: "Subtree of Another Tree",              difficulty: "Easy"   },
      { slug: "lowest-common-ancestor-bst",   title: "Lowest Common Ancestor of BST",        difficulty: "Medium" },
      { slug: "level-order-traversal",        title: "Binary Tree Level Order Traversal",    difficulty: "Medium" },
      { slug: "right-side-view",              title: "Binary Tree Right Side View",          difficulty: "Medium" },
      { slug: "count-good-nodes",             title: "Count Good Nodes in Binary Tree",      difficulty: "Medium" },
      { slug: "validate-bst",                 title: "Validate Binary Search Tree",          difficulty: "Medium" },
      { slug: "kth-smallest-bst",             title: "Kth Smallest Element in BST",          difficulty: "Medium" },
      { slug: "construct-binary-tree",        title: "Construct Binary Tree from Preorder and Inorder", difficulty: "Medium" },
      { slug: "binary-tree-max-path-sum",     title: "Binary Tree Maximum Path Sum",         difficulty: "Hard"   },
      { slug: "serialize-deserialize-tree",   title: "Serialize and Deserialize Binary Tree", difficulty: "Hard"  },
    ]
  },
  {
    id: "tries",
    label: "Tries",
    icon: "🌐",
    problems: [
      { slug: "implement-trie",    title: "Implement Trie (Prefix Tree)",               difficulty: "Medium" },
      { slug: "add-search-words",  title: "Design Add and Search Words Data Structure",  difficulty: "Medium" },
      { slug: "word-search-ii",    title: "Word Search II",                             difficulty: "Hard"   },
    ]
  },
  {
    id: "heap-priority-queue",
    label: "Heap / Priority Queue",
    icon: "⛰️",
    problems: [
      { slug: "kth-largest-stream",       title: "Kth Largest Element in a Stream",  difficulty: "Easy"   },
      { slug: "last-stone-weight",        title: "Last Stone Weight",                difficulty: "Easy"   },
      { slug: "k-closest-points",         title: "K Closest Points to Origin",       difficulty: "Medium" },
      { slug: "kth-largest-array",        title: "Kth Largest Element in an Array",  difficulty: "Medium" },
      { slug: "task-scheduler",           title: "Task Scheduler",                   difficulty: "Medium" },
      { slug: "design-twitter",           title: "Design Twitter",                   difficulty: "Medium" },
      { slug: "find-median-data-stream",  title: "Find Median from Data Stream",     difficulty: "Hard"   },
    ]
  },
  {
    id: "backtracking",
    label: "Backtracking",
    icon: "↩️",
    problems: [
      { slug: "subsets",                    title: "Subsets",                               difficulty: "Medium" },
      { slug: "combination-sum",            title: "Combination Sum",                       difficulty: "Medium" },
      { slug: "permutations",               title: "Permutations",                          difficulty: "Medium" },
      { slug: "subsets-ii",                 title: "Subsets II",                            difficulty: "Medium" },
      { slug: "combination-sum-ii",         title: "Combination Sum II",                    difficulty: "Medium" },
      { slug: "word-search",                title: "Word Search",                           difficulty: "Medium" },
      { slug: "palindrome-partitioning",    title: "Palindrome Partitioning",               difficulty: "Medium" },
      { slug: "letter-combinations-phone",  title: "Letter Combinations of a Phone Number", difficulty: "Medium" },
      { slug: "n-queens",                   title: "N-Queens",                              difficulty: "Hard"   },
    ]
  },
  {
    id: "graphs",
    label: "Graphs",
    icon: "🕸️",
    problems: [
      { slug: "number-of-islands",           title: "Number of Islands",                    difficulty: "Medium" },
      { slug: "max-area-of-island",          title: "Max Area of Island",                   difficulty: "Medium" },
      { slug: "clone-graph",                 title: "Clone Graph",                          difficulty: "Medium" },
      { slug: "walls-and-gates",             title: "Walls and Gates",                      difficulty: "Medium" },
      { slug: "rotting-oranges",             title: "Rotting Oranges",                      difficulty: "Medium" },
      { slug: "pacific-atlantic-water-flow", title: "Pacific Atlantic Water Flow",          difficulty: "Medium" },
      { slug: "surrounding-regions",         title: "Surrounding Regions",                  difficulty: "Medium" },
      { slug: "course-schedule",             title: "Course Schedule",                      difficulty: "Medium" },
      { slug: "course-schedule-ii",          title: "Course Schedule II",                   difficulty: "Medium" },
      { slug: "graph-valid-tree",            title: "Graph Valid Tree",                     difficulty: "Medium" },
      { slug: "connected-components",        title: "Number of Connected Components",       difficulty: "Medium" },
      { slug: "redundant-connection",        title: "Redundant Connection",                 difficulty: "Medium" },
      { slug: "word-ladder",                 title: "Word Ladder",                          difficulty: "Hard"   },
    ]
  },
  {
    id: "advanced-graphs",
    label: "Advanced Graphs",
    icon: "🗺️",
    problems: [
      { slug: "reconstruct-itinerary",    title: "Reconstruct Itinerary",                difficulty: "Hard"   },
      { slug: "min-cost-connect-points",  title: "Min Cost to Connect All Points",       difficulty: "Medium" },
      { slug: "network-delay-time",       title: "Network Delay Time",                   difficulty: "Medium" },
      { slug: "swim-in-rising-water",     title: "Swim in Rising Water",                 difficulty: "Hard"   },
      { slug: "alien-dictionary",         title: "Alien Dictionary",                     difficulty: "Hard"   },
      { slug: "cheapest-flights-k-stops", title: "Cheapest Flights Within K Stops",      difficulty: "Medium" },
    ]
  },
  {
    id: "dp-1d",
    label: "1-D Dynamic Programming",
    icon: "📈",
    problems: [
      { slug: "climbing-stairs",                title: "Climbing Stairs",                    difficulty: "Easy"   },
      { slug: "min-cost-climbing-stairs",       title: "Min Cost Climbing Stairs",           difficulty: "Easy"   },
      { slug: "house-robber",                   title: "House Robber",                       difficulty: "Medium" },
      { slug: "house-robber-ii",                title: "House Robber II",                    difficulty: "Medium" },
      { slug: "longest-palindromic-substring",  title: "Longest Palindromic Substring",      difficulty: "Medium" },
      { slug: "palindromic-substrings",         title: "Palindromic Substrings",             difficulty: "Medium" },
      { slug: "decode-ways",                    title: "Decode Ways",                        difficulty: "Medium" },
      { slug: "coin-change",                    title: "Coin Change",                        difficulty: "Medium" },
      { slug: "maximum-product-subarray",       title: "Maximum Product Subarray",           difficulty: "Medium" },
      { slug: "word-break",                     title: "Word Break",                         difficulty: "Medium" },
      { slug: "longest-increasing-subsequence", title: "Longest Increasing Subsequence",     difficulty: "Medium" },
    ]
  },
  {
    id: "dp-2d",
    label: "2-D Dynamic Programming",
    icon: "📊",
    problems: [
      { slug: "unique-paths",                   title: "Unique Paths",                       difficulty: "Medium" },
      { slug: "longest-common-subsequence",     title: "Longest Common Subsequence",         difficulty: "Medium" },
      { slug: "buy-sell-with-cooldown",         title: "Buy and Sell Stock With Cooldown",   difficulty: "Medium" },
      { slug: "coin-change-ii",                 title: "Coin Change II",                     difficulty: "Medium" },
      { slug: "target-sum",                     title: "Target Sum",                         difficulty: "Medium" },
      { slug: "interleaving-string",            title: "Interleaving String",                difficulty: "Medium" },
      { slug: "longest-increasing-path-matrix", title: "Longest Increasing Path in Matrix",  difficulty: "Hard"   },
      { slug: "distinct-subsequences",          title: "Distinct Subsequences",              difficulty: "Hard"   },
      { slug: "edit-distance",                  title: "Edit Distance",                      difficulty: "Medium" },
      { slug: "burst-balloons",                 title: "Burst Balloons",                     difficulty: "Hard"   },
      { slug: "regular-expression-matching",    title: "Regular Expression Matching",        difficulty: "Hard"   },
    ]
  },
  {
    id: "greedy",
    label: "Greedy",
    icon: "💰",
    problems: [
      { slug: "maximum-subarray",         title: "Maximum Subarray",                      difficulty: "Medium" },
      { slug: "jump-game",                title: "Jump Game",                             difficulty: "Medium" },
      { slug: "jump-game-ii",             title: "Jump Game II",                          difficulty: "Medium" },
      { slug: "gas-station",              title: "Gas Station",                           difficulty: "Medium" },
      { slug: "hand-of-straights",        title: "Hand of Straights",                     difficulty: "Medium" },
      { slug: "merge-triplets",           title: "Merge Triplets to Form Target Triplet", difficulty: "Medium" },
      { slug: "partition-labels",         title: "Partition Labels",                      difficulty: "Medium" },
      { slug: "valid-parenthesis-string", title: "Valid Parenthesis String",              difficulty: "Medium" },
    ]
  },
  {
    id: "intervals",
    label: "Intervals",
    icon: "📏",
    problems: [
      { slug: "insert-interval",           title: "Insert Interval",                       difficulty: "Medium" },
      { slug: "merge-intervals",           title: "Merge Intervals",                       difficulty: "Medium" },
      { slug: "non-overlapping-intervals", title: "Non-overlapping Intervals",             difficulty: "Medium" },
      { slug: "meeting-rooms",             title: "Meeting Rooms",                         difficulty: "Easy"   },
      { slug: "meeting-rooms-ii",          title: "Meeting Rooms II",                      difficulty: "Medium" },
      { slug: "minimum-interval-query",    title: "Minimum Interval to Include Each Query", difficulty: "Hard"  },
    ]
  },
  {
    id: "math-geometry",
    label: "Math & Geometry",
    icon: "📐",
    problems: [
      { slug: "rotate-image",       title: "Rotate Image",        difficulty: "Medium" },
      { slug: "spiral-matrix",      title: "Spiral Matrix",       difficulty: "Medium" },
      { slug: "set-matrix-zeroes",  title: "Set Matrix Zeroes",   difficulty: "Medium" },
      { slug: "happy-number",       title: "Happy Number",        difficulty: "Easy"   },
      { slug: "plus-one",           title: "Plus One",            difficulty: "Easy"   },
      { slug: "pow-x-n",            title: "Pow(x, n)",           difficulty: "Medium" },
      { slug: "multiply-strings",   title: "Multiply Strings",    difficulty: "Medium" },
      { slug: "detect-squares",     title: "Detect Squares",      difficulty: "Medium" },
    ]
  },
  {
    id: "bit-manipulation",
    label: "Bit Manipulation",
    icon: "⚡",
    problems: [
      { slug: "single-number",         title: "Single Number",          difficulty: "Easy"   },
      { slug: "number-of-1-bits",      title: "Number of 1 Bits",       difficulty: "Easy"   },
      { slug: "counting-bits",         title: "Counting Bits",          difficulty: "Easy"   },
      { slug: "reverse-bits",          title: "Reverse Bits",           difficulty: "Easy"   },
      { slug: "missing-number",        title: "Missing Number",         difficulty: "Easy"   },
      { slug: "sum-of-two-integers",   title: "Sum of Two Integers",    difficulty: "Medium" },
      { slug: "reverse-integer",       title: "Reverse Integer",        difficulty: "Medium" },
    ]
  },
];
