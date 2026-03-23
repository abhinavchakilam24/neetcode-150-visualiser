export const mergeKSortedLists = {
  id: 44,
  slug: "merge-k-sorted-lists",
  title: "Merge K Sorted Lists",
  difficulty: "Hard",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 44,
  artifactType: "LinkedList",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Uber"],
  leetcodeLink: "https://leetcode.com/problems/merge-k-sorted-lists/",

  pattern: "Divide and Conquer / Min-Heap Merge",
  patternExplanation: `Merge k sorted lists by either using a min-heap to always extract the
    smallest head across all lists, or by divide-and-conquer: repeatedly merge pairs of lists
    until one remains.`,

  intuition: {
    coreInsight: `With k lists totaling n nodes, we need to produce one sorted list. The key
      insight is that at any point, the next node in the merged result must be the smallest
      among all k list heads. A min-heap gives us that smallest head in O(log k), and we
      process each of the n nodes exactly once, giving O(n log k) total.`,

    mentalModel: `Imagine k conveyor belts, each carrying sorted packages. You stand at the
      junction picking the lightest package visible at the front of any belt. A min-heap is
      like a smart scale that instantly tells you which belt has the lightest front package.
      You pick it, the belt advances, and you repeat until all belts are empty.`,

    whyNaiveFails: `Brute force collects all values, sorts them O(n log n), and rebuilds the
      list. This ignores that the lists are already sorted. Merging two at a time sequentially
      is O(nk) because the first list gets re-scanned k-1 times. Divide and conquer reduces
      the number of merge rounds to log k.`,

    keyObservation: `Divide and conquer merges lists in pairs: k lists become k/2, then k/4,
      etc. — log k rounds. Each round processes all n nodes total. So total work = O(n log k).
      This matches the heap approach without needing the heap data structure.`,
  },

  problem: `You are given an array of k linked-lists lists, each linked-list is sorted in
    ascending order. Merge all the linked-lists into one sorted linked-list and return it.`,

  examples: [
    { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "Merge all three sorted lists into one sorted list." },
    { input: "lists = []", output: "[]", explanation: "Empty input returns empty list." },
    { input: "lists = [[]]", output: "[]", explanation: "Single empty list returns empty." },
  ],

  constraints: [
    "k == lists.length",
    "0 <= k <= 10^4",
    "0 <= lists[i].length <= 500",
    "-10^4 <= lists[i][j] <= 10^4",
    "lists[i] is sorted in ascending order",
    "The sum of lists[i].length will not exceed 10^4",
  ],

  approaches: {
    brute: {
      label: "Collect and Sort",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: "Collect all node values into an array, sort, then build a new linked list.",

      javaCode: `public ListNode mergeKLists(ListNode[] lists) {
    List<Integer> vals = new ArrayList<>();
    for (ListNode node : lists)
        while (node != null) { vals.add(node.val); node = node.next; }
    Collections.sort(vals);
    ListNode dummy = new ListNode(0), curr = dummy;
    for (int v : vals) { curr.next = new ListNode(v); curr = curr.next; }
    return dummy.next;
}`,

      cppCode: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    vector<int> vals;
    for (auto node : lists)
        while (node) { vals.push_back(node->val); node = node->next; }
    sort(vals.begin(), vals.end());
    ListNode dummy(0), *curr = &dummy;
    for (int v : vals) { curr->next = new ListNode(v); curr = curr->next; }
    return dummy.next;
}`,

      pythonCode: `def mergeKLists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    vals = []
    for node in lists:
        while node:
            vals.append(node.val)
            node = node.next
    vals.sort()
    dummy = curr = ListNode(0)
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next`,

      lineAnnotations: {
        2: "Collect all values from all lists",
        5: "Sort all collected values",
        6: "Build new sorted linked list from values",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { lists: [[1,4,5],[1,3,4],[2,6]] },
          expectedOutput: "[1,1,2,3,4,4,5,6]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Collect all values",
              explanation: "Traverse all lists. Collect values: [1,4,5,1,3,4,2,6].",
              variables: { vals: "[1,4,5,1,3,4,2,6]" },
              dataStructure: { nodes: [{ id: 0, val: "all values", next: null, state: "active" }], pointerAssignments: {} },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5],
              shortLabel: "Sort: [1,1,2,3,4,4,5,6]",
              explanation: "Sort all values: [1,1,2,3,4,4,5,6].",
              variables: { vals: "[1,1,2,3,4,4,5,6]" },
              dataStructure: { nodes: [{ id: 0, val: "sorted", next: null, state: "active" }], pointerAssignments: {} },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7],
              shortLabel: "Build linked list",
              explanation: "Create new linked list: 1→1→2→3→4→4→5→6.",
              variables: { result: "1→1→2→3→4→4→5→6" },
              dataStructure: {
                nodes: [1,1,2,3,4,4,5,6].map((v, i) => ({ id: i, val: v, next: i < 7 ? i + 1 : null, state: "found" })),
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ lists }) {
        const steps = [];
        const vals = lists.flat().sort((a, b) => a - b);
        steps.push({
          stepId: 0, lineNumbers: [2, 5],
          shortLabel: `Collect and sort ${vals.length} values`,
          explanation: `Collected and sorted: [${vals.join(",")}].`,
          variables: { count: vals.length, sorted: JSON.stringify(vals) },
          dataStructure: { nodes: vals.map((v, i) => ({ id: i, val: v, next: i < vals.length - 1 ? i + 1 : null, state: "found" })), pointerAssignments: {} },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Divide and Conquer",
      tier: "optimal",
      timeComplexity: "O(n log k)",
      spaceComplexity: "O(log k)",
      idea: `Merge lists in pairs: merge list 0 with list 1, list 2 with list 3, etc. Repeat
        until one list remains. Each round halves the number of lists — log k rounds total.`,

      javaCode: `public ListNode mergeKLists(ListNode[] lists) {
    if (lists.length == 0) return null;
    int interval = 1;
    while (interval < lists.length) {
        for (int i = 0; i + interval < lists.length; i += interval * 2) {
            lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
        }
        interval *= 2;
    }
    return lists[0];
}

ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0), curr = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
        else { curr.next = l2; l2 = l2.next; }
        curr = curr.next;
    }
    curr.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}`,

      cppCode: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    if (lists.empty()) return nullptr;
    int interval = 1;
    while (interval < lists.size()) {
        for (int i = 0; i + interval < lists.size(); i += interval * 2) {
            lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
        }
        interval *= 2;
    }
    return lists[0];
}

ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *curr = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { curr->next = l1; l1 = l1->next; }
        else { curr->next = l2; l2 = l2->next; }
        curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;
    return dummy.next;
}`,

      pythonCode: `def mergeKLists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    if not lists:
        return None
    interval = 1
    while interval < len(lists):
        for i in range(0, len(lists) - interval, interval * 2):
            lists[i] = mergeTwoLists(lists[i], lists[i + interval])
        interval *= 2
    return lists[0]

def mergeTwoLists(l1, l2):
    dummy = curr = ListNode(0)
    while l1 and l2:
        if l1.val <= l2.val:
            curr.next = l1; l1 = l1.next
        else:
            curr.next = l2; l2 = l2.next
        curr = curr.next
    curr.next = l1 or l2
    return dummy.next`,

      lineAnnotations: {
        2: "Handle empty input",
        3: "Start with merge interval of 1",
        4: "Each round doubles the interval — log k rounds",
        5: "Merge adjacent pairs at current interval",
        6: "Merge list[i] with list[i+interval]",
        8: "Double the interval for next round",
        10: "After all rounds, lists[0] contains the full merged list",
        13: "Standard merge of two sorted lists",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Three sorted lists merged pairwise",
          input: { lists: [[1,4,5],[1,3,4],[2,6]] },
          expectedOutput: "[1,1,2,3,4,4,5,6]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: 3 lists, interval=1",
              explanation: "We have 3 lists: [1,4,5], [1,3,4], [2,6]. Start with interval=1 — merge adjacent pairs.",
              variables: { k: 3, interval: 1 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "[1,4,5]", next: null, state: "default" },
                  { id: 1, val: "[1,3,4]", next: null, state: "default" },
                  { id: 2, val: "[2,6]", next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Merge lists[0] + lists[1]",
              explanation: "Merge [1,4,5] with [1,3,4] → [1,1,3,4,4,5]. Lists[2]=[2,6] unpaired.",
              variables: { i: 0, interval: 1, "merged": "[1,1,3,4,4,5]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: "1", next: 1, state: "active" },
                  { id: 1, val: "1", next: 2, state: "active" },
                  { id: 2, val: "3", next: 3, state: "active" },
                  { id: 3, val: "4", next: 4, state: "active" },
                  { id: 4, val: "4", next: 5, state: "active" },
                  { id: 5, val: "5", next: null, state: "active" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8],
              shortLabel: "interval=2, next round",
              explanation: "After round 1: lists = [[1,1,3,4,4,5], unused, [2,6]]. interval doubles to 2.",
              variables: { interval: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "[1,1,3,4,4,5]", next: null, state: "default" },
                  { id: 1, val: "[2,6]", next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6],
              shortLabel: "Merge lists[0] + lists[2]",
              explanation: "Merge [1,1,3,4,4,5] with [2,6] → [1,1,2,3,4,4,5,6]. All lists merged!",
              variables: { i: 0, interval: 2, merged: "[1,1,2,3,4,4,5,6]" },
              dataStructure: {
                nodes: [1,1,2,3,4,4,5,6].map((v, i) => ({ id: i, val: v, next: i < 7 ? i + 1 : null, state: "found" })),
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10],
              shortLabel: "Return merged list",
              explanation: "interval=4 >= length=3. Done. Return lists[0] = [1,1,2,3,4,4,5,6].",
              variables: { answer: "[1,1,2,3,4,4,5,6]" },
              dataStructure: {
                nodes: [1,1,2,3,4,4,5,6].map((v, i) => ({ id: i, val: v, next: i < 7 ? i + 1 : null, state: "found" })),
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Two Lists",
          description: "Simple case — just merge two sorted lists",
          input: { lists: [[1,3],[2,4]] },
          expectedOutput: "[1,2,3,4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: 2 lists, interval=1",
              explanation: "Two lists: [1,3] and [2,4]. interval=1.",
              variables: { k: 2, interval: 1 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "[1,3]", next: null, state: "default" },
                  { id: 1, val: "[2,4]", next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Merge → [1,2,3,4]",
              explanation: "Merge [1,3] with [2,4]: compare 1<2→take 1, compare 3>2→take 2, compare 3<4→take 3, take 4. Result: [1,2,3,4].",
              variables: { merged: "[1,2,3,4]" },
              dataStructure: {
                nodes: [1,2,3,4].map((v, i) => ({ id: i, val: v, next: i < 3 ? i + 1 : null, state: "found" })),
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10],
              shortLabel: "Return [1,2,3,4]",
              explanation: "Only one list remains. Return [1,2,3,4].",
              variables: { answer: "[1,2,3,4]" },
              dataStructure: {
                nodes: [1,2,3,4].map((v, i) => ({ id: i, val: v, next: i < 3 ? i + 1 : null, state: "found" })),
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ lists }) {
        const steps = [];
        if (lists.length === 0) {
          steps.push({ stepId: 0, lineNumbers: [2], shortLabel: "Empty input", explanation: "No lists to merge. Return null.", variables: {}, dataStructure: { nodes: [], pointerAssignments: {} }, delta: {}, isAnswer: true });
          return steps;
        }

        let arrays = lists.map(l => [...l]);
        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `${arrays.length} lists, interval=1`,
          explanation: `Starting with ${arrays.length} lists.`,
          variables: { k: arrays.length, interval: 1 },
          dataStructure: { nodes: arrays.map((a, i) => ({ id: i, val: `[${a.join(",")}]`, next: null, state: "default" })), pointerAssignments: {} },
          delta: {}, isAnswer: false,
        });

        let interval = 1;
        while (interval < arrays.length) {
          for (let i = 0; i + interval < arrays.length; i += interval * 2) {
            const merged = [];
            let a = 0, b = 0;
            const l1 = arrays[i], l2 = arrays[i + interval];
            while (a < l1.length && b < l2.length) {
              if (l1[a] <= l2[b]) merged.push(l1[a++]);
              else merged.push(l2[b++]);
            }
            while (a < l1.length) merged.push(l1[a++]);
            while (b < l2.length) merged.push(l2[b++]);
            arrays[i] = merged;

            steps.push({
              stepId: steps.length, lineNumbers: [5, 6],
              shortLabel: `Merge → [${merged.join(",")}]`,
              explanation: `Merged lists at indices ${i} and ${i + interval}: [${merged.join(",")}].`,
              variables: { i, interval },
              dataStructure: { nodes: merged.map((v, j) => ({ id: j, val: v, next: j < merged.length - 1 ? j + 1 : null, state: "active" })), pointerAssignments: {} },
              delta: {}, isAnswer: false,
            });
          }
          interval *= 2;
        }

        const result = arrays[0];
        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: `Return [${result.join(",")}]`,
          explanation: `Final merged list: [${result.join(",")}].`,
          variables: { answer: `[${result.join(",")}]` },
          dataStructure: { nodes: result.map((v, i) => ({ id: i, val: v, next: i < result.length - 1 ? i + 1 : null, state: "found" })), pointerAssignments: {} },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n log n)", space: "O(n)", explanation: "Collect all values and sort" },
    optimal: { time: "O(n log k)", space: "O(log k)", explanation: "log k merge rounds, each processing n nodes total", tradeoff: "When k << n, O(n log k) is significantly better than O(n log n)" },
  },

  interviewTips: [
    "Mention both heap and divide-and-conquer approaches — interviewers often want to see both.",
    "For the heap approach: push all k heads, pop min, push its next. O(n log k).",
    "For divide-and-conquer: merge pairs in rounds. Explain why it's log k rounds.",
    "Handle edge cases: empty lists array, lists containing empty lists.",
    "The mergeTwoLists helper is the same as the 'Merge Two Sorted Lists' problem.",
  ],

  relatedProblems: ["merge-two-sorted-lists", "sort-list", "kth-smallest-bst"],
};
