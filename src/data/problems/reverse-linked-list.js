export const reverseLinkedList = {
  id: 35,
  slug: "reverse-linked-list",
  title: "Reverse Linked List",
  difficulty: "Easy",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 35,
  artifactType: "LinkedList",
  companies: ["Amazon", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/",

  pattern: "Iterative Three-Pointer Reversal",
  patternExplanation: `To reverse a singly linked list in-place, maintain three pointers —
    prev, curr, and next — and rewire each node's .next pointer to point backward
    instead of forward. This pattern appears whenever you need to reverse all or part
    of a linked list (e.g., Reverse Nodes in k-Group, Reorder List).`,

  intuition: {
    coreInsight: `A singly linked list only has forward pointers. To reverse it, we need to
      make each node point to its predecessor instead of its successor. We can do this in a
      single pass: at each node, save the next node, rewire the current node's pointer backward,
      then advance. Three pointers — prev, curr, next — are all we need to avoid losing
      references as we go.`,

    mentalModel: `Imagine a conga line where everyone has their hands on the shoulders of the
      person in front of them. To reverse the line, you walk from front to back. At each person,
      you turn them around so they grab the person behind them instead. You need to remember who
      was in front of them (next) before you turn them, otherwise the rest of the line walks
      away and you lose them. prev/curr/next are your three hands juggling this turnover.`,

    whyNaiveFails: `A naive approach might copy all values into an array, reverse the array,
      then build a new linked list. That works but uses O(n) extra space and creates entirely
      new nodes. The interviewer wants you to reverse the list in-place by rewiring pointers —
      O(1) space, O(n) time. The recursive approach is elegant but uses O(n) stack space;
      the iterative three-pointer method is the gold standard.`,

    keyObservation: `Before you can set curr.next = prev, you must save curr.next into a
      temporary variable. Otherwise you lose access to the rest of the list. This
      "save before overwrite" pattern is the single most important detail — miss it and
      you sever the list on the first iteration.`,
  },

  problem: `Given the head of a singly linked list, reverse the list, and return the
    reversed list.`,

  examples: [
    { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "The entire list is reversed." },
    { input: "head = [1,2]", output: "[2,1]", explanation: "Two nodes swap positions." },
    { input: "head = []", output: "[]", explanation: "Empty list remains empty." },
  ],

  constraints: [
    "The number of nodes in the list is in the range [0, 5000].",
    "-5000 <= Node.val <= 5000",
  ],

  approaches: {
    brute: null,
    better: null,

    optimal: {
      label: "Iterative Three Pointers",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Use three pointers — prev, curr, next. At each node: save next, reverse the
        pointer (curr.next = prev), then advance prev and curr forward. When curr is null,
        prev is the new head.`,

      javaCode: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,

      cppCode: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,

      pythonCode: `def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,

      lineAnnotations: {
        2: "prev starts at null (new tail), curr starts at head",
        3: "Iterate until curr falls off the end",
        4: "Save the next node before we overwrite curr.next",
        5: "Reverse the pointer: curr now points backward to prev",
        6: "Advance prev to curr (prev moves one step forward)",
        7: "Advance curr to next (curr moves one step forward)",
        9: "prev is now the new head of the reversed list",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Five-node list — full reversal walkthrough",
          input: { list: [1, 2, 3, 4, 5] },
          expectedOutput: "[5, 4, 3, 2, 1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init prev=null, curr=head",
              explanation: "Initialize prev to null (it will become the new tail) and curr to head (node 1). We'll walk the list left to right, reversing each pointer.",
              variables: { prev: "null", curr: 1, next: "-" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "active" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: null, curr: 0 },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "next = node 2",
              explanation: "Save curr.next (node 2) into next. This is critical — once we overwrite curr.next, we'd lose the rest of the list without this reference.",
              variables: { prev: "null", curr: 1, next: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "active" },
                  { id: 1, val: 2, next: 2, state: "queued" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: null, curr: 0, next: 1 },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "1.next = null (reversed)",
              explanation: "Set curr.next = prev. Node 1's pointer now points to null instead of node 2. The first link is reversed — node 1 is now the tail.",
              variables: { prev: "null", curr: 1, next: 2, "curr.next": "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "active" },
                  { id: 1, val: 2, next: 2, state: "queued" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: null, curr: 0, next: 1 },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7],
              shortLabel: "Advance: prev=1, curr=2",
              explanation: "Move prev to curr (node 1) and curr to next (node 2). We've finished reversing node 1's pointer; now we move on to node 2.",
              variables: { prev: 1, curr: 2, next: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: 0, curr: 1 },
              },
              delta: { changedIndices: [0, 1], movedPointers: ["prev", "curr"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4],
              shortLabel: "next = node 3",
              explanation: "Save curr.next (node 3) into next before we overwrite it.",
              variables: { prev: 1, curr: 2, next: 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 3, next: 3, state: "queued" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: 0, curr: 1, next: 2 },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5],
              shortLabel: "2.next = 1 (reversed)",
              explanation: "Set curr.next = prev. Node 2 now points back to node 1 instead of forward to node 3. Two links reversed so far: null <- 1 <- 2.",
              variables: { prev: 1, curr: 2, next: 3, "curr.next": 1 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "active" },
                  { id: 2, val: 3, next: 3, state: "queued" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: 0, curr: 1, next: 2 },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 7],
              shortLabel: "Advance: prev=2, curr=3",
              explanation: "Move prev to curr (node 2) and curr to next (node 3).",
              variables: { prev: 2, curr: 3, next: 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 3, state: "active" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: 1, curr: 2 },
              },
              delta: { changedIndices: [1, 2], movedPointers: ["prev", "curr"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [4],
              shortLabel: "next = node 4",
              explanation: "Save curr.next (node 4) into next.",
              variables: { prev: 2, curr: 3, next: 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 3, state: "active" },
                  { id: 3, val: 4, next: 4, state: "queued" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: 1, curr: 2, next: 3 },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [5],
              shortLabel: "3.next = 2 (reversed)",
              explanation: "Set curr.next = prev. Node 3 now points back to node 2. Chain so far: null <- 1 <- 2 <- 3.",
              variables: { prev: 2, curr: 3, next: 4, "curr.next": 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 1, state: "active" },
                  { id: 3, val: 4, next: 4, state: "queued" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: 1, curr: 2, next: 3 },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [6, 7],
              shortLabel: "Advance: prev=3, curr=4",
              explanation: "Move prev to curr (node 3) and curr to next (node 4).",
              variables: { prev: 3, curr: 4, next: 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 1, state: "visited" },
                  { id: 3, val: 4, next: 4, state: "active" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { prev: 2, curr: 3 },
              },
              delta: { changedIndices: [2, 3], movedPointers: ["prev", "curr"] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [4],
              shortLabel: "next = node 5",
              explanation: "Save curr.next (node 5) into next.",
              variables: { prev: 3, curr: 4, next: 5 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 1, state: "visited" },
                  { id: 3, val: 4, next: 4, state: "active" },
                  { id: 4, val: 5, next: null, state: "queued" },
                ],
                pointerAssignments: { prev: 2, curr: 3, next: 4 },
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [5],
              shortLabel: "4.next = 3 (reversed)",
              explanation: "Set curr.next = prev. Node 4 now points back to node 3. Chain: null <- 1 <- 2 <- 3 <- 4.",
              variables: { prev: 3, curr: 4, next: 5, "curr.next": 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 1, state: "visited" },
                  { id: 3, val: 4, next: 2, state: "active" },
                  { id: 4, val: 5, next: null, state: "queued" },
                ],
                pointerAssignments: { prev: 2, curr: 3, next: 4 },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 12,
              lineNumbers: [6, 7],
              shortLabel: "Advance: prev=4, curr=5",
              explanation: "Move prev to curr (node 4) and curr to next (node 5).",
              variables: { prev: 4, curr: 5, next: 5 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 1, state: "visited" },
                  { id: 3, val: 4, next: 2, state: "visited" },
                  { id: 4, val: 5, next: null, state: "active" },
                ],
                pointerAssignments: { prev: 3, curr: 4 },
              },
              delta: { changedIndices: [3, 4], movedPointers: ["prev", "curr"] },
              isAnswer: false,
            },
            {
              stepId: 13,
              lineNumbers: [4],
              shortLabel: "next = null",
              explanation: "Save curr.next — it's null. Node 5 is the last node.",
              variables: { prev: 4, curr: 5, next: "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 1, state: "visited" },
                  { id: 3, val: 4, next: 2, state: "visited" },
                  { id: 4, val: 5, next: null, state: "active" },
                ],
                pointerAssignments: { prev: 3, curr: 4, next: null },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 14,
              lineNumbers: [5],
              shortLabel: "5.next = 4 (reversed)",
              explanation: "Set curr.next = prev. Node 5 now points back to node 4. All links are reversed: null <- 1 <- 2 <- 3 <- 4 <- 5.",
              variables: { prev: 4, curr: 5, next: "null", "curr.next": 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 1, state: "visited" },
                  { id: 3, val: 4, next: 2, state: "visited" },
                  { id: 4, val: 5, next: 3, state: "active" },
                ],
                pointerAssignments: { prev: 3, curr: 4, next: null },
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 15,
              lineNumbers: [6, 7],
              shortLabel: "Advance: prev=5, curr=null",
              explanation: "Move prev to curr (node 5) and curr to next (null). curr is now null, so the while loop will exit on the next check.",
              variables: { prev: 5, curr: "null", next: "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 2, val: 3, next: 1, state: "visited" },
                  { id: 3, val: 4, next: 2, state: "visited" },
                  { id: 4, val: 5, next: 3, state: "visited" },
                ],
                pointerAssignments: { prev: 4, curr: null },
              },
              delta: { changedIndices: [4], movedPointers: ["prev", "curr"] },
              isAnswer: false,
            },
            {
              stepId: 16,
              lineNumbers: [9],
              shortLabel: "Return prev (node 5)",
              explanation: "curr is null — loop ends. prev points to node 5, which is the new head. The reversed list is 5 -> 4 -> 3 -> 2 -> 1 -> null. Done!",
              variables: { prev: 5, answer: "[5, 4, 3, 2, 1]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "found" },
                  { id: 1, val: 2, next: 0, state: "found" },
                  { id: 2, val: 3, next: 1, state: "found" },
                  { id: 3, val: 4, next: 2, state: "found" },
                  { id: 4, val: 5, next: 3, state: "found" },
                ],
                pointerAssignments: { prev: 4 },
              },
              delta: { changedIndices: [0, 1, 2, 3, 4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Two Nodes",
          description: "Minimal non-trivial case — only one pointer to reverse",
          input: { list: [1, 2] },
          expectedOutput: "[2, 1]",
          commonMistake: "Forgetting to save curr.next before overwriting it, causing curr to advance to null prematurely and losing the second node entirely.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init prev=null, curr=head",
              explanation: "Initialize prev to null and curr to head (node 1). Only two nodes to reverse.",
              variables: { prev: "null", curr: 1, next: "-" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "active" },
                  { id: 1, val: 2, next: null, state: "default" },
                ],
                pointerAssignments: { prev: null, curr: 0 },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "next = node 2",
              explanation: "Save curr.next (node 2) into next before we overwrite it.",
              variables: { prev: "null", curr: 1, next: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "active" },
                  { id: 1, val: 2, next: null, state: "queued" },
                ],
                pointerAssignments: { prev: null, curr: 0, next: 1 },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5],
              shortLabel: "1.next = null (reversed)",
              explanation: "Set curr.next = prev (null). Node 1 now points to null — it will be the new tail.",
              variables: { prev: "null", curr: 1, next: 2, "curr.next": "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "active" },
                  { id: 1, val: 2, next: null, state: "queued" },
                ],
                pointerAssignments: { prev: null, curr: 0, next: 1 },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7],
              shortLabel: "Advance: prev=1, curr=2",
              explanation: "Move prev to curr (node 1) and curr to next (node 2).",
              variables: { prev: 1, curr: 2, next: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: null, state: "active" },
                ],
                pointerAssignments: { prev: 0, curr: 1 },
              },
              delta: { changedIndices: [0, 1], movedPointers: ["prev", "curr"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4],
              shortLabel: "next = null",
              explanation: "Save curr.next — it's null. Node 2 is the last node.",
              variables: { prev: 1, curr: 2, next: "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: null, state: "active" },
                ],
                pointerAssignments: { prev: 0, curr: 1, next: null },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5],
              shortLabel: "2.next = 1 (reversed)",
              explanation: "Set curr.next = prev. Node 2 now points back to node 1. Both links reversed: null <- 1 <- 2.",
              variables: { prev: 1, curr: 2, next: "null", "curr.next": 1 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "active" },
                ],
                pointerAssignments: { prev: 0, curr: 1, next: null },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 7],
              shortLabel: "Advance: prev=2, curr=null",
              explanation: "Move prev to curr (node 2) and curr to next (null). Loop will exit.",
              variables: { prev: 2, curr: "null", next: "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "visited" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                ],
                pointerAssignments: { prev: 1, curr: null },
              },
              delta: { changedIndices: [1], movedPointers: ["prev", "curr"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [9],
              shortLabel: "Return prev (node 2)",
              explanation: "curr is null — loop ends. prev points to node 2, the new head. Reversed list: 2 -> 1 -> null.",
              variables: { prev: 2, answer: "[2, 1]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: null, state: "found" },
                  { id: 1, val: 2, next: 0, state: "found" },
                ],
                pointerAssignments: { prev: 1 },
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function ({ list }) {
        const steps = [];
        const n = list.length;

        if (n === 0) {
          steps.push({
            stepId: 0,
            lineNumbers: [2, 9],
            shortLabel: "Empty list — return null",
            explanation: "Head is null. Nothing to reverse. Return null immediately.",
            variables: { prev: "null", curr: "null" },
            dataStructure: { nodes: [], pointerAssignments: {} },
            delta: {},
            isAnswer: true,
          });
          return steps;
        }

        // Build initial nodes array
        const buildNodes = (nextOverrides, stateOverrides) => {
          return list.map((val, i) => ({
            id: i,
            val,
            next: nextOverrides[i] !== undefined ? nextOverrides[i] : (i < n - 1 ? i + 1 : null),
            state: stateOverrides[i] || "default",
          }));
        };

        // Init step
        const initStates = {};
        initStates[0] = "active";
        steps.push({
          stepId: 0,
          lineNumbers: [2],
          shortLabel: "Init prev=null, curr=head",
          explanation: `Initialize prev to null and curr to head (node ${list[0]}). We'll walk the list, reversing each pointer.`,
          variables: { prev: "null", curr: list[0], next: "-" },
          dataStructure: {
            nodes: buildNodes({}, initStates),
            pointerAssignments: { prev: null, curr: 0 },
          },
          delta: { changedIndices: [0] },
          isAnswer: false,
        });

        // Track the actual next pointers as they get reversed
        const nextPointers = {};
        // nextPointers[i] will override the default forward pointer once reversed

        let prevIdx = null;
        for (let i = 0; i < n; i++) {
          const currIdx = i;
          const nextIdx = i < n - 1 ? i + 1 : null;

          // Step: save next
          const saveStates = {};
          for (let j = 0; j < n; j++) {
            if (j < i) saveStates[j] = "visited";
            else if (j === i) saveStates[j] = "active";
            else if (j === i + 1) saveStates[j] = "queued";
            else saveStates[j] = "default";
          }
          const savePointers = { prev: prevIdx, curr: currIdx };
          if (nextIdx !== null) savePointers.next = nextIdx;
          else savePointers.next = null;

          steps.push({
            stepId: steps.length,
            lineNumbers: [4],
            shortLabel: nextIdx !== null ? `next = node ${list[nextIdx]}` : "next = null",
            explanation: nextIdx !== null
              ? `Save curr.next (node ${list[nextIdx]}) into next before overwriting.`
              : `Save curr.next — it's null. Node ${list[i]} is the last node.`,
            variables: {
              prev: prevIdx !== null ? list[prevIdx] : "null",
              curr: list[i],
              next: nextIdx !== null ? list[nextIdx] : "null",
            },
            dataStructure: {
              nodes: buildNodes(nextPointers, saveStates),
              pointerAssignments: savePointers,
            },
            delta: nextIdx !== null ? { changedIndices: [nextIdx] } : {},
            isAnswer: false,
          });

          // Step: reverse pointer
          nextPointers[currIdx] = prevIdx;
          const revStates = {};
          for (let j = 0; j < n; j++) {
            if (j < i) revStates[j] = "visited";
            else if (j === i) revStates[j] = "active";
            else if (j === i + 1) revStates[j] = "queued";
            else revStates[j] = "default";
          }

          const prevVal = prevIdx !== null ? list[prevIdx] : "null";
          steps.push({
            stepId: steps.length,
            lineNumbers: [5],
            shortLabel: `${list[i]}.next = ${prevVal} (reversed)`,
            explanation: `Set curr.next = prev. Node ${list[i]} now points to ${prevVal}.`,
            variables: {
              prev: prevVal,
              curr: list[i],
              next: nextIdx !== null ? list[nextIdx] : "null",
              "curr.next": prevVal,
            },
            dataStructure: {
              nodes: buildNodes(nextPointers, revStates),
              pointerAssignments: { prev: prevIdx, curr: currIdx, next: nextIdx },
            },
            delta: { changedIndices: [currIdx] },
            isAnswer: false,
          });

          // Step: advance
          const newPrevIdx = currIdx;
          const newCurrIdx = nextIdx;

          const advStates = {};
          for (let j = 0; j < n; j++) {
            if (j <= i) advStates[j] = "visited";
            else if (newCurrIdx !== null && j === newCurrIdx) advStates[j] = "active";
            else advStates[j] = "default";
          }

          const advPointers = { prev: newPrevIdx };
          if (newCurrIdx !== null) advPointers.curr = newCurrIdx;
          else advPointers.curr = null;

          steps.push({
            stepId: steps.length,
            lineNumbers: [6, 7],
            shortLabel: newCurrIdx !== null
              ? `Advance: prev=${list[newPrevIdx]}, curr=${list[newCurrIdx]}`
              : `Advance: prev=${list[newPrevIdx]}, curr=null`,
            explanation: newCurrIdx !== null
              ? `Move prev to node ${list[newPrevIdx]} and curr to node ${list[newCurrIdx]}.`
              : `Move prev to node ${list[newPrevIdx]} and curr to null. Loop will exit.`,
            variables: {
              prev: list[newPrevIdx],
              curr: newCurrIdx !== null ? list[newCurrIdx] : "null",
              next: nextIdx !== null ? list[nextIdx] : "null",
            },
            dataStructure: {
              nodes: buildNodes(nextPointers, advStates),
              pointerAssignments: advPointers,
            },
            delta: { changedIndices: [currIdx, ...(newCurrIdx !== null ? [newCurrIdx] : [])], movedPointers: ["prev", "curr"] },
            isAnswer: false,
          });

          prevIdx = newPrevIdx;
        }

        // Final step: return prev
        const finalStates = {};
        for (let j = 0; j < n; j++) finalStates[j] = "found";
        const reversed = [...list].reverse();

        steps.push({
          stepId: steps.length,
          lineNumbers: [9],
          shortLabel: `Return prev (node ${list[n - 1]})`,
          explanation: `curr is null — loop ends. prev points to node ${list[n - 1]}, the new head. Reversed list: [${reversed.join(", ")}].`,
          variables: { prev: list[n - 1], answer: `[${reversed.join(", ")}]` },
          dataStructure: {
            nodes: buildNodes(nextPointers, finalStates),
            pointerAssignments: { prev: n - 1 },
          },
          delta: { changedIndices: list.map((_, i) => i) },
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: null,
    optimal: {
      time: "O(n)",
      space: "O(1)",
      explanation: "Single pass through the list; only three pointer variables used regardless of list size.",
      tradeoff: "No tradeoff needed — this is both time and space optimal.",
    },
  },

  interviewTips: [
    "Clarify: 'Should I reverse in-place, or is creating a new list acceptable?' (In-place is expected.)",
    "Draw out 3 nodes on the whiteboard and trace prev/curr/next — it makes the pointer dance crystal clear.",
    "Mention that the recursive approach uses O(n) stack space, making iterative strictly better for space.",
    "State explicitly: 'I need to save curr.next BEFORE overwriting it, or I lose the rest of the list.'",
    "After coding, walk through the empty list case (head == null) and single-node case (no loop iterations) to show you handle edge cases.",
  ],

  relatedProblems: ["reverse-nodes-k-group", "reorder-list", "palindrome-linked-list"],
};
