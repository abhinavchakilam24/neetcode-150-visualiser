export const mergeTwoSortedLists = {
  id: 36,
  slug: "merge-two-sorted-lists",
  title: "Merge Two Sorted Lists",
  difficulty: "Easy",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 36,
  artifactType: "LinkedList",
  companies: ["Amazon", "Microsoft", "Google", "Apple", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/",

  pattern: "Dummy Head Merge",
  patternExplanation: `When merging two sorted sequences into one, use a dummy head node
    so you never have to special-case the first insertion. Attach the smaller node each
    time and advance that list's pointer. This pattern appears in merge sort, merge-k-lists,
    and any problem that combines sorted streams.`,

  intuition: {
    coreInsight: `Both lists are already sorted. At every step, the globally smallest
      unprocessed node is whichever head is smaller. Pick it, attach it to the result,
      and advance that list. One pass through both lists, O(n + m) total.`,

    mentalModel: `Imagine two queues of people sorted by height. You're building one big
      sorted line. You always look at the front person of each queue and pull the shorter
      one into the merged line. When one queue empties, you append the remaining people
      from the other queue wholesale.`,

    whyNaiveFails: `You could dump both lists into an array, sort it, and rebuild a linked list,
      but that's O((n+m) log(n+m)) time and O(n+m) space. Since the inputs are already sorted,
      a simple merge is O(n+m) time and O(1) space (we reuse existing nodes).`,

    keyObservation: `Use a dummy node as the start of your result list. This eliminates the
      need to check "is the result list empty?" on every iteration. At the end, return
      dummy.next. Also, when one list is exhausted, just point tail.next to the remaining
      list — no need to copy nodes one by one.`,
  },

  problem: `You are given the heads of two sorted linked lists list1 and list2. Merge the
    two lists into one sorted list. The list should be made by splicing together the nodes
    of the first two lists. Return the head of the merged linked list.`,

  examples: [
    { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "Merge both sorted lists into one sorted list." },
    { input: "list1 = [], list2 = []", output: "[]", explanation: "Both lists are empty." },
    { input: "list1 = [], list2 = [0]", output: "[0]", explanation: "One list is empty; result is the other." },
  ],

  constraints: [
    "The number of nodes in both lists is in the range [0, 50].",
    "-100 <= Node.val <= 100",
    "Both list1 and list2 are sorted in non-decreasing order.",
  ],

  approaches: {
    brute: {
      label: "Collect and Sort",
      tier: "brute",
      timeComplexity: "O((n+m) log(n+m))",
      spaceComplexity: "O(n+m)",
      idea: "Collect all values from both lists into an array, sort it, then build a new linked list.",

      javaCode: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    List<Integer> vals = new ArrayList<>();
    while (list1 != null) { vals.add(list1.val); list1 = list1.next; }
    while (list2 != null) { vals.add(list2.val); list2 = list2.next; }
    Collections.sort(vals);
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int v : vals) { curr.next = new ListNode(v); curr = curr.next; }
    return dummy.next;
}`,

      cppCode: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    vector<int> vals;
    while (list1) { vals.push_back(list1->val); list1 = list1->next; }
    while (list2) { vals.push_back(list2->val); list2 = list2->next; }
    sort(vals.begin(), vals.end());
    ListNode dummy(0);
    ListNode* curr = &dummy;
    for (int v : vals) { curr->next = new ListNode(v); curr = curr->next; }
    return dummy.next;
}`,

      pythonCode: `def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    vals = []
    while list1:
        vals.append(list1.val)
        list1 = list1.next
    while list2:
        vals.append(list2.val)
        list2 = list2.next
    vals.sort()
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next`,

      lineAnnotations: {
        2: "Collect all values from list1",
        3: "Collect all values from list2",
        4: "Sort the combined array",
        5: "Build a new linked list from sorted values",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { list1: [1, 2, 4], list2: [1, 3, 4] },
          expectedOutput: "[1, 1, 2, 3, 4, 4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Collect all values",
              explanation: "Traverse both lists and collect all values into an array: [1, 2, 4, 1, 3, 4].",
              variables: { vals: "[1,2,4,1,3,4]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 4, next: null, state: "visited" },
                  { id: 3, val: 1, next: 4, state: "visited" },
                  { id: 4, val: 3, next: 5, state: "visited" },
                  { id: 5, val: 4, next: null, state: "visited" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "Sort: [1,1,2,3,4,4]",
              explanation: "Sort the collected values: [1, 1, 2, 3, 4, 4]. This costs O((n+m) log(n+m)).",
              variables: { vals: "[1,1,2,3,4,4]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "found" },
                  { id: 1, val: 1, next: 2, state: "found" },
                  { id: 2, val: 2, next: 3, state: "found" },
                  { id: 3, val: 3, next: 4, state: "found" },
                  { id: 4, val: 4, next: 5, state: "found" },
                  { id: 5, val: 4, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ list1, list2 }) {
        const steps = [];
        const all = [...list1, ...list2];
        const nodes1 = list1.map((v, i) => ({ id: i, val: v, next: i + 1 < list1.length ? i + 1 : null, state: "default" }));
        const nodes2 = list2.map((v, i) => ({ id: list1.length + i, val: v, next: i + 1 < list2.length ? list1.length + i + 1 : null, state: "default" }));

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Collect all values",
          explanation: `Collect all values: [${all.join(", ")}].`,
          variables: { vals: JSON.stringify(all) },
          dataStructure: { nodes: [...nodes1, ...nodes2].map(n => ({ ...n, state: "visited" })), pointerAssignments: {} },
          delta: {}, isAnswer: false,
        });

        const sorted = [...all].sort((a, b) => a - b);
        const sortedNodes = sorted.map((v, i) => ({ id: i, val: v, next: i + 1 < sorted.length ? i + 1 : null, state: "found" }));

        steps.push({
          stepId: 1, lineNumbers: [4],
          shortLabel: `Sorted: [${sorted.join(",")}]`,
          explanation: `Sort: [${sorted.join(", ")}]. Build new list.`,
          variables: { vals: JSON.stringify(sorted) },
          dataStructure: { nodes: sortedNodes, pointerAssignments: {} },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Iterative Merge with Dummy Head",
      tier: "optimal",
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(1)",
      idea: `Use a dummy head node. Compare the heads of both lists; attach the smaller one
        to the tail of the merged list and advance that list's pointer. When one list is
        exhausted, attach the remainder of the other.`,

      javaCode: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }

    tail.next = (list1 != null) ? list1 : list2;
    return dummy.next;
}`,

      cppCode: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;

    while (list1 && list2) {
        if (list1->val <= list2->val) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }
        tail = tail->next;
    }

    tail->next = list1 ? list1 : list2;
    return dummy.next;
}`,

      pythonCode: `def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    tail = dummy

    while list1 and list2:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next

    tail.next = list1 if list1 else list2
    return dummy.next`,

      lineAnnotations: {
        2: "Dummy node eliminates edge cases for first insertion",
        3: "tail tracks the end of the merged list",
        5: "While both lists have nodes remaining",
        6: "Compare heads: take the smaller value",
        7: "Attach list1's head to merged list",
        8: "Advance list1 pointer",
        10: "Attach list2's head to merged list",
        11: "Advance list2 pointer",
        13: "Advance tail to the node we just attached",
        16: "Attach whichever list still has remaining nodes",
        17: "Return merged list (skip the dummy node)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Two three-element lists with interleaving values",
          input: { list1: [1, 2, 4], list2: [1, 3, 4] },
          expectedOutput: "[1, 1, 2, 3, 4, 4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init dummy + tail",
              explanation: "Create a dummy node (value 0) that will anchor our merged list. tail points to dummy — we'll build the result by appending to tail.",
              variables: { "list1": 1, "list2": 1, tail: "dummy" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: null, state: "default" },
                  { id: 0, val: 1, next: 1, state: "default" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 4, next: null, state: "default" },
                  { id: 3, val: 1, next: 4, state: "default" },
                  { id: 4, val: 3, next: 5, state: "default" },
                  { id: 5, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { tail: "d", list1: 0, list2: 3 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8, 13],
              shortLabel: "1 <= 1, take list1's 1",
              explanation: "Compare list1.val (1) vs list2.val (1). 1 <= 1, so attach list1's node (val=1) to tail. Advance list1 to node 2. Advance tail.",
              variables: { "list1": 2, "list2": 1, tail: "node 1 (from L1)" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 0, state: "default" },
                  { id: 0, val: 1, next: null, state: "found" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 4, next: null, state: "default" },
                  { id: 3, val: 1, next: 4, state: "active" },
                  { id: 4, val: 3, next: 5, state: "default" },
                  { id: 5, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { tail: 0, list1: 1, list2: 3 },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 10, 11, 13],
              shortLabel: "2 > 1, take list2's 1",
              explanation: "Compare list1.val (2) vs list2.val (1). 2 > 1, so attach list2's node (val=1) to tail. Advance list2 to node 3. Advance tail.",
              variables: { "list1": 2, "list2": 3, tail: "node 1 (from L2)" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 0, state: "default" },
                  { id: 0, val: 1, next: 3, state: "found" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 4, next: null, state: "default" },
                  { id: 3, val: 1, next: null, state: "found" },
                  { id: 4, val: 3, next: 5, state: "default" },
                  { id: 5, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { tail: 3, list1: 1, list2: 4 },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 8, 13],
              shortLabel: "2 <= 3, take list1's 2",
              explanation: "Compare list1.val (2) vs list2.val (3). 2 <= 3, so attach list1's node (val=2). Advance list1 to node 4. Advance tail.",
              variables: { "list1": 4, "list2": 3, tail: "node 2" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 0, state: "default" },
                  { id: 0, val: 1, next: 3, state: "found" },
                  { id: 1, val: 2, next: null, state: "found" },
                  { id: 2, val: 4, next: null, state: "active" },
                  { id: 3, val: 1, next: 1, state: "found" },
                  { id: 4, val: 3, next: 5, state: "default" },
                  { id: 5, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { tail: 1, list1: 2, list2: 4 },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 10, 11, 13],
              shortLabel: "4 > 3, take list2's 3",
              explanation: "Compare list1.val (4) vs list2.val (3). 4 > 3, so attach list2's node (val=3). Advance list2 to node 4. Advance tail.",
              variables: { "list1": 4, "list2": 4, tail: "node 3" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 0, state: "default" },
                  { id: 0, val: 1, next: 3, state: "found" },
                  { id: 1, val: 2, next: 4, state: "found" },
                  { id: 2, val: 4, next: null, state: "active" },
                  { id: 3, val: 1, next: 1, state: "found" },
                  { id: 4, val: 3, next: null, state: "found" },
                  { id: 5, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { tail: 4, list1: 2, list2: 5 },
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7, 8, 13],
              shortLabel: "4 <= 4, take list1's 4",
              explanation: "Compare list1.val (4) vs list2.val (4). 4 <= 4, so attach list1's node (val=4). list1 is now exhausted. Advance tail.",
              variables: { "list1": "null", "list2": 4, tail: "node 4 (from L1)" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 0, state: "default" },
                  { id: 0, val: 1, next: 3, state: "found" },
                  { id: 1, val: 2, next: 4, state: "found" },
                  { id: 2, val: 4, next: null, state: "found" },
                  { id: 3, val: 1, next: 1, state: "found" },
                  { id: 4, val: 3, next: 2, state: "found" },
                  { id: 5, val: 4, next: null, state: "active" },
                ],
                pointerAssignments: { tail: 2, list1: null, list2: 5 },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [16, 17],
              shortLabel: "Attach remaining list2's 4",
              explanation: "list1 is null, so attach remainder of list2 (node with val=4). Merged list: 1 -> 1 -> 2 -> 3 -> 4 -> 4. Return dummy.next.",
              variables: { answer: "[1, 1, 2, 3, 4, 4]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "found" },
                  { id: 1, val: 1, next: 2, state: "found" },
                  { id: 2, val: 2, next: 3, state: "found" },
                  { id: 3, val: 3, next: 4, state: "found" },
                  { id: 4, val: 4, next: 5, state: "found" },
                  { id: 5, val: 4, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: { changedIndices: [5] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "One Empty List",
          description: "One list is empty — result is the other list entirely",
          input: { list1: [], list2: [1, 3, 5] },
          expectedOutput: "[1, 3, 5]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init dummy + tail",
              explanation: "Create dummy node. list1 is null, list2 points to node 1.",
              variables: { "list1": "null", "list2": 1, tail: "dummy" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: null, state: "default" },
                  { id: 0, val: 1, next: 1, state: "default" },
                  { id: 1, val: 3, next: 2, state: "default" },
                  { id: 2, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { tail: "d", list1: null, list2: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [16, 17],
              shortLabel: "list1 is null, attach list2",
              explanation: "The while loop doesn't execute because list1 is null. Attach the entire list2 to tail. Return dummy.next = [1, 3, 5].",
              variables: { answer: "[1, 3, 5]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "found" },
                  { id: 1, val: 3, next: 2, state: "found" },
                  { id: 2, val: 5, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ list1, list2 }) {
        const steps = [];
        let i = 0, j = 0;
        const merged = [];

        const buildNodes = () => {
          const nodes = [];
          for (let k = 0; k < merged.length; k++) {
            nodes.push({ id: k, val: merged[k], next: k + 1 < merged.length ? k + 1 : null, state: "found" });
          }
          return nodes;
        };

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init dummy + tail",
          explanation: "Create dummy node and set tail to dummy.",
          variables: { "list1": list1[0] ?? "null", "list2": list2[0] ?? "null", tail: "dummy" },
          dataStructure: {
            nodes: [
              ...list1.map((v, k) => ({ id: k, val: v, next: k + 1 < list1.length ? k + 1 : null, state: "default" })),
              ...list2.map((v, k) => ({ id: list1.length + k, val: v, next: k + 1 < list2.length ? list1.length + k + 1 : null, state: "default" })),
            ],
            pointerAssignments: { list1: list1.length > 0 ? 0 : null, list2: list2.length > 0 ? list1.length : null },
          },
          delta: {}, isAnswer: false,
        });

        while (i < list1.length && j < list2.length) {
          if (list1[i] <= list2[j]) {
            merged.push(list1[i]);
            i++;
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6, 7, 8, 13],
              shortLabel: `Take ${merged[merged.length - 1]} from L1`,
              explanation: `list1.val (${merged[merged.length - 1]}) <= list2.val (${list2[j] ?? "null"}). Attach to merged list.`,
              variables: { "list1": list1[i] ?? "null", "list2": list2[j] ?? "null" },
              dataStructure: { nodes: buildNodes(), pointerAssignments: {} },
              delta: {}, isAnswer: false,
            });
          } else {
            merged.push(list2[j]);
            j++;
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6, 10, 11, 13],
              shortLabel: `Take ${merged[merged.length - 1]} from L2`,
              explanation: `list1.val (${list1[i] ?? "null"}) > list2.val (${merged[merged.length - 1]}). Attach to merged list.`,
              variables: { "list1": list1[i] ?? "null", "list2": list2[j] ?? "null" },
              dataStructure: { nodes: buildNodes(), pointerAssignments: {} },
              delta: {}, isAnswer: false,
            });
          }
        }

        while (i < list1.length) { merged.push(list1[i]); i++; }
        while (j < list2.length) { merged.push(list2[j]); j++; }

        steps.push({
          stepId: steps.length, lineNumbers: [16, 17],
          shortLabel: `Merged: [${merged.join(",")}]`,
          explanation: `Attach remaining nodes. Final merged list: [${merged.join(", ")}].`,
          variables: { answer: `[${merged.join(", ")}]` },
          dataStructure: { nodes: buildNodes(), pointerAssignments: {} },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O((n+m) log(n+m))", space: "O(n+m)", explanation: "Collect + sort + rebuild" },
    optimal: { time: "O(n + m)", space: "O(1)", explanation: "Single merge pass, reusing existing nodes", tradeoff: "Exploiting pre-sorted order eliminates the need to sort" },
  },

  interviewTips: [
    "Start by mentioning the dummy head trick — it's a classic pattern.",
    "Clarify: 'Are both lists guaranteed to be sorted?' (yes).",
    "Handle edge cases: one or both lists empty.",
    "Mention that you're reusing existing nodes, not creating new ones — O(1) space.",
    "This is the building block for merge sort on linked lists and merge-k-sorted-lists.",
  ],

  relatedProblems: ["merge-k-sorted-lists", "sort-list"],
};
