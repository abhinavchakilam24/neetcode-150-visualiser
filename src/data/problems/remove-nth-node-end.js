export const removeNthNodeEnd = {
  id: 38,
  slug: "remove-nth-node-end",
  title: "Remove Nth Node From End of List",
  difficulty: "Medium",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 38,
  artifactType: "LinkedList",
  companies: ["Meta", "Amazon", "Apple", "Google"],
  leetcodeLink: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",

  pattern: "Two-Pointer Gap Technique",
  patternExplanation: `Advance the first pointer n steps ahead, then move both pointers
    together. When the first reaches the end, the second is at the node just before the
    target. This pattern lets you find the nth-from-end in a single pass.`,

  intuition: {
    coreInsight: `To find the nth node from the end, we need to know where the end is. A
      two-pass approach counts the length first, then walks (length - n) steps. But we can
      do it in one pass: place two pointers n nodes apart, then advance both. When the leader
      hits the end, the follower is exactly n nodes behind — at the target's predecessor.`,

    mentalModel: `Imagine two runners on a track with a fixed-length rope between them. If the
      rope is 3 meters long (n=3), and they both run at the same speed, when the front runner
      hits the finish line, the back runner is exactly 3 meters before the end. The gap between
      the pointers IS the rope — it encodes the distance from the end without ever counting it.`,

    whyNaiveFails: `A naive two-pass approach works: first pass counts the length L, second pass
      walks L-n steps to find the target. But interviewers specifically ask for a one-pass
      solution. The two-pointer technique achieves exactly one traversal of the list.`,

    keyObservation: `Use a dummy node before head. This handles the edge case where we need to
      remove the head node itself. Without the dummy, removing the first node requires special
      logic. With it, the follower's .next always points to the node to remove, even when that
      node is the original head.`,
  },

  problem: `Given the head of a linked list, remove the nth node from the end of the list
    and return its head.`,

  examples: [
    { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]", explanation: "Remove node 4, which is the 2nd from the end." },
    { input: "head = [1], n = 1", output: "[]", explanation: "Remove the only node." },
    { input: "head = [1,2], n = 1", output: "[1]", explanation: "Remove the last node." },
  ],

  constraints: [
    "The number of nodes in the list is sz.",
    "1 <= sz <= 30",
    "0 <= Node.val <= 100",
    "1 <= n <= sz",
  ],

  approaches: {
    brute: {
      label: "Two Pass",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "First pass: count the length L. Second pass: walk L-n steps and remove.",

      javaCode: `public ListNode removeNthFromEnd(ListNode head, int n) {
    int length = 0;
    ListNode curr = head;
    while (curr != null) {
        length++;
        curr = curr.next;
    }
    if (n == length) return head.next;
    curr = head;
    for (int i = 0; i < length - n - 1; i++) {
        curr = curr.next;
    }
    curr.next = curr.next.next;
    return head;
}`,

      cppCode: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    int length = 0;
    ListNode* curr = head;
    while (curr) {
        length++;
        curr = curr->next;
    }
    if (n == length) return head->next;
    curr = head;
    for (int i = 0; i < length - n - 1; i++) {
        curr = curr->next;
    }
    curr->next = curr->next->next;
    return head;
}`,

      pythonCode: `def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:
    length = 0
    curr = head
    while curr:
        length += 1
        curr = curr.next
    if n == length:
        return head.next
    curr = head
    for i in range(length - n - 1):
        curr = curr.next
    curr.next = curr.next.next
    return head`,

      lineAnnotations: {
        2: "First pass: count total nodes",
        7: "Edge case: removing the head node",
        9: "Walk to the node just BEFORE the target",
        12: "Skip over the target node",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { list: [1, 2, 3, 4, 5], n: 2 },
          expectedOutput: "[1, 2, 3, 5]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4, 5],
              shortLabel: "Count length = 5",
              explanation: "Walk the entire list to count nodes. Length = 5.",
              variables: { length: 5, n: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 3, next: 3, state: "visited" },
                  { id: 3, val: 4, next: 4, state: "visited" },
                  { id: 4, val: 5, next: null, state: "visited" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [9, 10],
              shortLabel: "Walk to index 2 (node 3)",
              explanation: "Need to walk length - n - 1 = 5 - 2 - 1 = 2 steps. After 2 steps, curr points to node 3, which is just before node 4 (the target).",
              variables: { length: 5, n: 2, "length-n-1": 2, curr: 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 3, next: 3, state: "active" },
                  { id: 3, val: 4, next: 4, state: "eliminated" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { curr: 2 },
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12],
              shortLabel: "Remove node 4",
              explanation: "Set curr.next = curr.next.next. Node 3 now points directly to node 5, skipping node 4. Result: [1,2,3,5].",
              variables: { answer: "[1, 2, 3, 5]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "found" },
                  { id: 1, val: 2, next: 2, state: "found" },
                  { id: 2, val: 3, next: 4, state: "found" },
                  { id: 3, val: 4, next: 4, state: "eliminated" },
                  { id: 4, val: 5, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: { changedIndices: [2, 3, 4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ list, n }) {
        const steps = [];
        const len = list.length;
        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4, 5],
          shortLabel: `Count length = ${len}`,
          explanation: `Walk the entire list to count nodes. Length = ${len}.`,
          variables: { length: len, n },
          dataStructure: {
            nodes: list.map((v, i) => ({ id: i, val: v, next: i < len - 1 ? i + 1 : null, state: "visited" })),
            pointerAssignments: {},
          },
          delta: {}, isAnswer: false,
        });

        const targetIdx = len - n;
        if (targetIdx === 0) {
          steps.push({
            stepId: 1, lineNumbers: [7],
            shortLabel: "Remove head",
            explanation: `n equals length, so we remove the head node. Return head.next.`,
            variables: { answer: `[${list.slice(1).join(", ")}]` },
            dataStructure: {
              nodes: list.map((v, i) => ({ id: i, val: v, next: i < len - 1 ? i + 1 : null, state: i === 0 ? "eliminated" : "found" })),
              pointerAssignments: {},
            },
            delta: { changedIndices: [0] }, isAnswer: true,
          });
        } else {
          const prevIdx = targetIdx - 1;
          steps.push({
            stepId: 1, lineNumbers: [9, 10],
            shortLabel: `Walk to node ${list[prevIdx]}`,
            explanation: `Walk ${prevIdx} steps to node ${list[prevIdx]}, which is just before the target.`,
            variables: { curr: list[prevIdx], targetNode: list[targetIdx] },
            dataStructure: {
              nodes: list.map((v, i) => ({ id: i, val: v, next: i < len - 1 ? i + 1 : null, state: i === prevIdx ? "active" : i === targetIdx ? "eliminated" : "default" })),
              pointerAssignments: { curr: prevIdx },
            },
            delta: { changedIndices: [prevIdx, targetIdx] }, isAnswer: false,
          });

          const result = list.filter((_, i) => i !== targetIdx);
          steps.push({
            stepId: 2, lineNumbers: [12],
            shortLabel: `Remove node ${list[targetIdx]}`,
            explanation: `Skip node ${list[targetIdx]}. Result: [${result.join(", ")}].`,
            variables: { answer: `[${result.join(", ")}]` },
            dataStructure: {
              nodes: list.map((v, i) => ({
                id: i, val: v,
                next: i === prevIdx ? (targetIdx + 1 < len ? targetIdx + 1 : null) : (i < len - 1 ? i + 1 : null),
                state: i === targetIdx ? "eliminated" : "found",
              })),
              pointerAssignments: {},
            },
            delta: { changedIndices: [prevIdx, targetIdx] }, isAnswer: true,
          });
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "One Pass Two Pointers",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Use a dummy node. Advance the fast pointer n+1 steps ahead of slow (both starting
        at dummy). Then move both until fast hits null. slow.next is the target to remove.`,

      javaCode: `public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode slow = dummy, fast = dummy;

    for (int i = 0; i <= n; i++) {
        fast = fast.next;
    }

    while (fast != null) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;
    return dummy.next;
}`,

      cppCode: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0, head);
    ListNode* slow = &dummy;
    ListNode* fast = &dummy;

    for (int i = 0; i <= n; i++) {
        fast = fast->next;
    }

    while (fast) {
        slow = slow->next;
        fast = fast->next;
    }

    slow->next = slow->next->next;
    return dummy.next;
}`,

      pythonCode: `def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:
    dummy = ListNode(0, head)
    slow = fast = dummy

    for i in range(n + 1):
        fast = fast.next

    while fast:
        slow = slow.next
        fast = fast.next

    slow.next = slow.next.next
    return dummy.next`,

      lineAnnotations: {
        2: "Dummy node handles edge case of removing head",
        3: "Both pointers start at dummy",
        5: "Advance fast n+1 steps to create the gap",
        9: "Move both pointers until fast reaches the end",
        13: "slow.next is the node to remove — skip it",
        14: "Return dummy.next (handles case where head was removed)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Remove 2nd from end in a 5-node list",
          input: { list: [1, 2, 3, 4, 5], n: 2 },
          expectedOutput: "[1, 2, 3, 5]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init dummy, slow=fast=dummy",
              explanation: "Create a dummy node pointing to head. Both slow and fast start at the dummy. The dummy ensures we can handle removing the head node.",
              variables: { slow: "dummy", fast: "dummy", n: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 1, state: "active" },
                  { id: 1, val: 1, next: 2, state: "default" },
                  { id: 2, val: 2, next: 3, state: "default" },
                  { id: 3, val: 3, next: 4, state: "default" },
                  { id: 4, val: 4, next: 5, state: "default" },
                  { id: 5, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 0, fast: 0 },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Advance fast 3 steps",
              explanation: "Move fast n+1 = 3 steps ahead: dummy -> 1 -> 2 -> 3. Now fast is at node 3, creating a gap of 3 nodes between slow and fast.",
              variables: { slow: "dummy", fast: 3, gap: 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 1, state: "active" },
                  { id: 1, val: 1, next: 2, state: "visited" },
                  { id: 2, val: 2, next: 3, state: "visited" },
                  { id: 3, val: 3, next: 4, state: "pointer" },
                  { id: 4, val: 4, next: 5, state: "default" },
                  { id: 5, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 0, fast: 3 },
              },
              delta: { changedIndices: [1, 2, 3], movedPointers: ["fast"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 11],
              shortLabel: "Move both: slow=1, fast=4",
              explanation: "Both advance one step. slow moves to node 1, fast moves to node 4. Gap maintained at 3.",
              variables: { slow: 1, fast: 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 1, state: "visited" },
                  { id: 1, val: 1, next: 2, state: "active" },
                  { id: 2, val: 2, next: 3, state: "default" },
                  { id: 3, val: 3, next: 4, state: "default" },
                  { id: 4, val: 4, next: 5, state: "pointer" },
                  { id: 5, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 1, fast: 4 },
              },
              delta: { changedIndices: [1, 4], movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9, 10, 11],
              shortLabel: "Move both: slow=2, fast=5",
              explanation: "Both advance again. slow at node 2, fast at node 5.",
              variables: { slow: 2, fast: 5 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 1, state: "visited" },
                  { id: 1, val: 1, next: 2, state: "visited" },
                  { id: 2, val: 2, next: 3, state: "default" },
                  { id: 3, val: 3, next: 4, state: "active" },
                  { id: 4, val: 4, next: 5, state: "default" },
                  { id: 5, val: 5, next: null, state: "pointer" },
                ],
                pointerAssignments: { slow: 2, fast: 5 },
              },
              delta: { changedIndices: [2, 5], movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10, 11],
              shortLabel: "Move both: slow=3, fast=null",
              explanation: "fast reaches null — loop ends. slow is at node 3. slow.next is node 4, the 2nd from the end — our target.",
              variables: { slow: 3, fast: "null", "slow.next": 4, target: 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 1, state: "visited" },
                  { id: 1, val: 1, next: 2, state: "visited" },
                  { id: 2, val: 2, next: 3, state: "visited" },
                  { id: 3, val: 3, next: 4, state: "active" },
                  { id: 4, val: 4, next: 5, state: "eliminated" },
                  { id: 5, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 3 },
              },
              delta: { changedIndices: [3, 4], movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [13, 14],
              shortLabel: "Remove node 4, return [1,2,3,5]",
              explanation: "Set slow.next = slow.next.next. Node 3 now points to node 5, skipping node 4. Return dummy.next = [1,2,3,5].",
              variables: { answer: "[1, 2, 3, 5]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 1, state: "visited" },
                  { id: 1, val: 1, next: 2, state: "found" },
                  { id: 2, val: 2, next: 3, state: "found" },
                  { id: 3, val: 3, next: 5, state: "found" },
                  { id: 4, val: 4, next: 5, state: "eliminated" },
                  { id: 5, val: 5, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: { changedIndices: [3, 4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Remove Head",
          description: "n equals list length — removes the head node",
          input: { list: [1, 2], n: 2 },
          expectedOutput: "[2]",
          commonMistake: "Without a dummy node, removing the head requires special-case logic. The dummy node elegantly handles this.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init dummy, slow=fast=dummy",
              explanation: "Create dummy -> 1 -> 2. Both pointers start at dummy.",
              variables: { slow: "dummy", fast: "dummy", n: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 1, state: "active" },
                  { id: 1, val: 1, next: 2, state: "default" },
                  { id: 2, val: 2, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 0, fast: 0 },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Advance fast 3 steps to null",
              explanation: "Move fast n+1 = 3 steps: dummy -> 1 -> 2 -> null. fast is now null.",
              variables: { slow: "dummy", fast: "null", gap: 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 1, state: "active" },
                  { id: 1, val: 1, next: 2, state: "visited" },
                  { id: 2, val: 2, next: null, state: "visited" },
                ],
                pointerAssignments: { slow: 0 },
              },
              delta: { changedIndices: [1, 2], movedPointers: ["fast"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9],
              shortLabel: "fast is null — skip while loop",
              explanation: "fast is already null. The while loop doesn't execute. slow is still at dummy. slow.next is node 1 — the head, which is our target.",
              variables: { slow: "dummy", "slow.next": 1, target: 1 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 1, state: "active" },
                  { id: 1, val: 1, next: 2, state: "eliminated" },
                  { id: 2, val: 2, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 0 },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [13, 14],
              shortLabel: "Remove node 1, return [2]",
              explanation: "Set slow.next = slow.next.next. Dummy now points to node 2, skipping node 1. Return dummy.next = [2]. The dummy node elegantly handled removing the head.",
              variables: { answer: "[2]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: "D", next: 2, state: "visited" },
                  { id: 1, val: 1, next: 2, state: "eliminated" },
                  { id: 2, val: 2, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ list, n }) {
        const steps = [];
        const sz = list.length;

        // We model the dummy as node index 0, actual nodes at indices 1..sz
        const allVals = ["D", ...list];
        const total = allVals.length;

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init dummy, slow=fast=dummy",
          explanation: "Create dummy node before head. Both slow and fast start at dummy.",
          variables: { slow: "dummy", fast: "dummy", n },
          dataStructure: {
            nodes: allVals.map((v, i) => ({ id: i, val: v, next: i < total - 1 ? i + 1 : null, state: i === 0 ? "active" : "default" })),
            pointerAssignments: { slow: 0, fast: 0 },
          },
          delta: { changedIndices: [0] }, isAnswer: false,
        });

        // Advance fast n+1 steps
        let fastPos = 0;
        for (let i = 0; i <= n; i++) fastPos++;
        steps.push({
          stepId: 1, lineNumbers: [5, 6],
          shortLabel: `Advance fast ${n + 1} steps`,
          explanation: `Move fast ${n + 1} steps ahead.${fastPos >= total ? " fast goes past end." : ` fast is at node ${allVals[fastPos]}.`}`,
          variables: { slow: "dummy", fast: fastPos < total ? allVals[fastPos] : "null" },
          dataStructure: {
            nodes: allVals.map((v, i) => ({ id: i, val: v, next: i < total - 1 ? i + 1 : null, state: i === 0 ? "active" : i <= fastPos && i < total ? "visited" : "default" })),
            pointerAssignments: { slow: 0, ...(fastPos < total ? { fast: fastPos } : {}) },
          },
          delta: { movedPointers: ["fast"] }, isAnswer: false,
        });

        // Move both until fast = null
        let slowPos = 0;
        while (fastPos < total) {
          slowPos++;
          fastPos++;
          steps.push({
            stepId: steps.length, lineNumbers: [9, 10, 11],
            shortLabel: `slow=${allVals[slowPos]}, fast=${fastPos < total ? allVals[fastPos] : "null"}`,
            explanation: `Both advance. slow at node ${allVals[slowPos]}, fast ${fastPos < total ? "at node " + allVals[fastPos] : "reaches null"}.`,
            variables: { slow: allVals[slowPos], fast: fastPos < total ? allVals[fastPos] : "null" },
            dataStructure: {
              nodes: allVals.map((v, i) => ({
                id: i, val: v, next: i < total - 1 ? i + 1 : null,
                state: i === slowPos ? "active" : i === slowPos + 1 && fastPos >= total ? "eliminated" : "default",
              })),
              pointerAssignments: { slow: slowPos, ...(fastPos < total ? { fast: fastPos } : {}) },
            },
            delta: { movedPointers: ["slow", "fast"] }, isAnswer: false,
          });
        }

        // Remove node
        const targetIdx = slowPos + 1;
        const result = list.filter((_, i) => i !== targetIdx - 1);
        steps.push({
          stepId: steps.length, lineNumbers: [13, 14],
          shortLabel: `Remove node ${allVals[targetIdx]}`,
          explanation: `Skip node ${allVals[targetIdx]}. Result: [${result.join(", ")}].`,
          variables: { answer: `[${result.join(", ")}]` },
          dataStructure: {
            nodes: allVals.map((v, i) => ({
              id: i, val: v,
              next: i === slowPos ? (targetIdx + 1 < total ? targetIdx + 1 : null) : (i < total - 1 ? i + 1 : null),
              state: i === 0 ? "visited" : i === targetIdx ? "eliminated" : "found",
            })),
            pointerAssignments: {},
          },
          delta: { changedIndices: [slowPos, targetIdx] }, isAnswer: true,
        });
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n)", space: "O(1)", explanation: "Two passes through the list" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass using two pointers with a fixed gap", tradeoff: "Same time complexity, but achieves it in strictly one pass" },
  },

  interviewTips: [
    "Immediately mention the dummy node trick — it shows you know linked list edge cases.",
    "Clarify: 'Is n guaranteed to be valid?' (Yes, per constraints.)",
    "Explain the gap: 'I advance fast n+1 steps so that when fast is null, slow.next is the target.'",
    "Walk through the edge case of removing the head node on the whiteboard.",
    "Mention that this is a single-pass solution, which is what the follow-up typically asks for.",
  ],

  relatedProblems: ["reverse-linked-list", "linked-list-cycle", "merge-two-sorted-lists"],
};
