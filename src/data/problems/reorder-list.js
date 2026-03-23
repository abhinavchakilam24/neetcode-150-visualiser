export const reorderList = {
  id: 37,
  slug: "reorder-list",
  title: "Reorder List",
  difficulty: "Medium",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 37,
  artifactType: "LinkedList",
  companies: ["Amazon", "Meta", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/reorder-list/",

  pattern: "Find Middle + Reverse + Merge",
  patternExplanation: `Split the list into two halves at the midpoint, reverse the second half,
    then interleave (merge) the two halves. This three-phase pattern uses slow/fast pointers
    to find the middle, the standard reversal technique, and a two-pointer merge.`,

  intuition: {
    coreInsight: `The reordered list alternates between taking from the front and from the back:
      L0 -> Ln -> L1 -> Ln-1 -> ... To efficiently access both ends, we split the list at the
      middle, reverse the second half so its "back" becomes a new "front," then weave the two
      halves together. Each phase is O(n), giving O(n) total with O(1) space.`,

    mentalModel: `Imagine a deck of cards numbered 1 to 10. You split the deck into two piles:
      [1,2,3,4,5] and [6,7,8,9,10]. You flip the second pile upside down to get [10,9,8,7,6].
      Now you interleave: take from the first pile, then the flipped pile, alternating.
      Result: 1,10,2,9,3,8,4,7,5,6. That's exactly what this algorithm does with linked list nodes.`,

    whyNaiveFails: `A naive approach would copy all values to an array, reorder in the array,
      then build a new list. That's O(n) space. Another naive idea is to repeatedly find the
      last node — but finding the tail each time is O(n), making the total O(n^2). The three-phase
      approach achieves O(n) time and O(1) space by restructuring in place.`,

    keyObservation: `The key insight is that the second half of the list, when reversed, gives
      you direct access to the "back" elements in forward order. Once reversed, interleaving
      two equal-length (or off-by-one) lists is straightforward pointer manipulation.`,
  },

  problem: `You are given the head of a singly linked list. Reorder the list to be in the
    following form: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...
    You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,

  examples: [
    { input: "head = [1,2,3,4]", output: "[1,4,2,3]", explanation: "Interleave first and reversed second half." },
    { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]", explanation: "Middle element stays in place." },
  ],

  constraints: [
    "The number of nodes in the list is in the range [1, 5 * 10^4].",
    "1 <= Node.val <= 1000",
  ],

  approaches: {
    brute: {
      label: "Array Copy",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "Store all nodes in an array, then rewire using two pointers from both ends of the array.",

      javaCode: `public void reorderList(ListNode head) {
    List<ListNode> nodes = new ArrayList<>();
    ListNode curr = head;
    while (curr != null) {
        nodes.add(curr);
        curr = curr.next;
    }
    int i = 0, j = nodes.size() - 1;
    while (i < j) {
        nodes.get(i).next = nodes.get(j);
        i++;
        if (i == j) break;
        nodes.get(j).next = nodes.get(i);
        j--;
    }
    nodes.get(i).next = null;
}`,

      cppCode: `void reorderList(ListNode* head) {
    vector<ListNode*> nodes;
    ListNode* curr = head;
    while (curr) {
        nodes.push_back(curr);
        curr = curr->next;
    }
    int i = 0, j = nodes.size() - 1;
    while (i < j) {
        nodes[i]->next = nodes[j];
        i++;
        if (i == j) break;
        nodes[j]->next = nodes[i];
        j--;
    }
    nodes[i]->next = nullptr;
}`,

      pythonCode: `def reorderList(head: Optional[ListNode]) -> None:
    nodes = []
    curr = head
    while curr:
        nodes.append(curr)
        curr = curr.next
    i, j = 0, len(nodes) - 1
    while i < j:
        nodes[i].next = nodes[j]
        i += 1
        if i == j:
            break
        nodes[j].next = nodes[i]
        j -= 1
    nodes[i].next = None`,

      lineAnnotations: {
        2: "Collect all nodes into an array for random access",
        7: "Two pointers: i from start, j from end",
        9: "Link front node to back node",
        11: "Link back node to next front node",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { list: [1, 2, 3, 4] },
          expectedOutput: "[1, 4, 2, 3]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Collect nodes into array",
              explanation: "Walk the list and store all nodes in an array: [1, 2, 3, 4]. This gives us O(1) random access.",
              variables: { nodes: "[1,2,3,4]", i: "-", j: "-" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 3, next: 3, state: "visited" },
                  { id: 3, val: 4, next: null, state: "visited" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 9],
              shortLabel: "Link 1 -> 4",
              explanation: "i=0, j=3. Link nodes[0] (val 1) to nodes[3] (val 4). The front connects to the back.",
              variables: { i: 0, j: 3, "nodes[i]": 1, "nodes[j]": 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 3, state: "active" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: null, state: "active" },
                ],
                pointerAssignments: { i: 0, j: 3 },
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11],
              shortLabel: "Link 4 -> 2",
              explanation: "i=1, j=3. Link nodes[3] (val 4) to nodes[1] (val 2). Back connects to next front.",
              variables: { i: 1, j: 3, "nodes[i]": 2, "nodes[j]": 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 3, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 1, state: "active" },
                ],
                pointerAssignments: { i: 1, j: 3 },
              },
              delta: { changedIndices: [1, 3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9],
              shortLabel: "Link 2 -> 3, i meets j",
              explanation: "i=1, j=2. Link nodes[1] (val 2) to nodes[2] (val 3). After i++, i==j so we break.",
              variables: { i: 1, j: 2, "nodes[i]": 2, "nodes[j]": 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 3, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 3, next: null, state: "active" },
                  { id: 3, val: 4, next: 1, state: "visited" },
                ],
                pointerAssignments: { i: 1, j: 2 },
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14],
              shortLabel: "Set tail.next = null",
              explanation: "Set nodes[2].next = null to terminate the list. Final order: 1 -> 4 -> 2 -> 3.",
              variables: { answer: "[1, 4, 2, 3]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 3, state: "found" },
                  { id: 1, val: 2, next: 2, state: "found" },
                  { id: 2, val: 3, next: null, state: "found" },
                  { id: 3, val: 4, next: 1, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ list }) {
        const steps = [];
        const n = list.length;
        if (n <= 1) {
          steps.push({
            stepId: 0, lineNumbers: [1],
            shortLabel: "Single node — no reorder needed",
            explanation: "List has 0 or 1 nodes. Nothing to reorder.",
            variables: { answer: `[${list.join(", ")}]` },
            dataStructure: {
              nodes: list.map((v, i) => ({ id: i, val: v, next: null, state: "found" })),
              pointerAssignments: {},
            },
            delta: {}, isAnswer: true,
          });
          return steps;
        }
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Collect nodes into array",
          explanation: `Walk the list and store all ${n} nodes in an array for random access.`,
          variables: { nodes: `[${list.join(",")}]` },
          dataStructure: {
            nodes: list.map((v, i) => ({ id: i, val: v, next: i < n - 1 ? i + 1 : null, state: "visited" })),
            pointerAssignments: {},
          },
          delta: {}, isAnswer: false,
        });

        const nextPointers = list.map((_, i) => i < n - 1 ? i + 1 : null);
        let i = 0, j = n - 1;
        while (i < j) {
          nextPointers[i] = j;
          steps.push({
            stepId: steps.length, lineNumbers: [9],
            shortLabel: `Link ${list[i]} -> ${list[j]}`,
            explanation: `i=${i}, j=${j}. Link node ${list[i]} to node ${list[j]}.`,
            variables: { i, j, "nodes[i]": list[i], "nodes[j]": list[j] },
            dataStructure: {
              nodes: list.map((v, k) => ({ id: k, val: v, next: nextPointers[k], state: k === i || k === j ? "active" : "default" })),
              pointerAssignments: { i, j },
            },
            delta: { changedIndices: [i, j] }, isAnswer: false,
          });
          i++;
          if (i === j) break;
          nextPointers[j] = i;
          steps.push({
            stepId: steps.length, lineNumbers: [11],
            shortLabel: `Link ${list[j]} -> ${list[i]}`,
            explanation: `Link node ${list[j]} to node ${list[i]}.`,
            variables: { i, j, "nodes[i]": list[i], "nodes[j]": list[j] },
            dataStructure: {
              nodes: list.map((v, k) => ({ id: k, val: v, next: nextPointers[k], state: k === i || k === j ? "active" : "default" })),
              pointerAssignments: { i, j },
            },
            delta: { changedIndices: [i, j] }, isAnswer: false,
          });
          j--;
        }
        nextPointers[i] = null;
        steps.push({
          stepId: steps.length, lineNumbers: [14],
          shortLabel: "Terminate list",
          explanation: "Set last node's next to null. Reordering complete.",
          variables: { answer: "reordered" },
          dataStructure: {
            nodes: list.map((v, k) => ({ id: k, val: v, next: nextPointers[k], state: "found" })),
            pointerAssignments: {},
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Find Middle + Reverse + Merge",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Three phases: (1) Find the middle using slow/fast pointers. (2) Reverse the
        second half of the list. (3) Merge/interleave the two halves.`,

      javaCode: `public void reorderList(ListNode head) {
    // Phase 1: Find middle
    ListNode slow = head, fast = head.next;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Phase 2: Reverse second half
    ListNode second = slow.next;
    slow.next = null;
    ListNode prev = null;
    while (second != null) {
        ListNode tmp = second.next;
        second.next = prev;
        prev = second;
        second = tmp;
    }

    // Phase 3: Merge two halves
    ListNode first = head;
    second = prev;
    while (second != null) {
        ListNode tmp1 = first.next, tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}`,

      cppCode: `void reorderList(ListNode* head) {
    // Phase 1: Find middle
    ListNode* slow = head;
    ListNode* fast = head->next;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    // Phase 2: Reverse second half
    ListNode* second = slow->next;
    slow->next = nullptr;
    ListNode* prev = nullptr;
    while (second) {
        ListNode* tmp = second->next;
        second->next = prev;
        prev = second;
        second = tmp;
    }

    // Phase 3: Merge two halves
    ListNode* first = head;
    second = prev;
    while (second) {
        ListNode* tmp1 = first->next;
        ListNode* tmp2 = second->next;
        first->next = second;
        second->next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}`,

      pythonCode: `def reorderList(head: Optional[ListNode]) -> None:
    # Phase 1: Find middle
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Phase 2: Reverse second half
    second = slow.next
    slow.next = None
    prev = None
    while second:
        tmp = second.next
        second.next = prev
        prev = second
        second = tmp

    # Phase 3: Merge two halves
    first = head
    second = prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first = tmp1
        second = tmp2`,

      lineAnnotations: {
        3: "slow/fast pointers to find the middle node",
        4: "fast moves 2x speed; when it ends, slow is at middle",
        9: "second starts right after middle",
        10: "Cut the list in half",
        12: "Standard iterative reversal of second half",
        19: "first = head of first half, second = head of reversed second half",
        22: "Save next pointers before rewiring",
        23: "Front node points to back node",
        24: "Back node points to next front node",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard (Even)",
          description: "Four-node list — even number of elements",
          input: { list: [1, 2, 3, 4] },
          expectedOutput: "[1, 4, 2, 3]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Init slow=1, fast=2",
              explanation: "Start finding the middle. slow at node 1, fast at node 2. Fast moves twice as fast as slow.",
              variables: { slow: 1, fast: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "active" },
                  { id: 1, val: 2, next: 2, state: "pointer" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 0, fast: 1 },
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: "slow=2, fast=4(end)",
              explanation: "Advance slow to node 2, fast to node 4. fast.next is null, so loop ends. slow (node 2) is the middle.",
              variables: { slow: 2, fast: 4, middle: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: null, state: "pointer" },
                ],
                pointerAssignments: { slow: 1, fast: 3 },
              },
              delta: { changedIndices: [1, 3], movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10],
              shortLabel: "Split: [1,2] and [3,4]",
              explanation: "second = slow.next (node 3). Cut the link: slow.next = null. Now we have two lists: [1,2] and [3,4].",
              variables: { firstHalf: "[1,2]", secondHalf: "[3,4]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: null, state: "visited" },
                  { id: 2, val: 3, next: 3, state: "active" },
                  { id: 3, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { second: 2 },
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 14, 15],
              shortLabel: "Reverse second half: [4,3]",
              explanation: "Reverse the second half [3,4] to get [4,3]. Now node 4 is the head of the reversed second half.",
              variables: { prev: 4, secondHalfReversed: "[4,3]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: null, state: "visited" },
                  { id: 2, val: 3, next: null, state: "visited" },
                  { id: 3, val: 4, next: 2, state: "active" },
                ],
                pointerAssignments: { first: 0, second: 3 },
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [22, 23, 24],
              shortLabel: "Merge: 1->4, 4->2",
              explanation: "first=node 1, second=node 4. Link 1->4 and 4->2. Advance first to node 2, second to node 3.",
              variables: { first: 1, second: 4, "1.next": 4, "4.next": 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 3, state: "active" },
                  { id: 1, val: 2, next: null, state: "default" },
                  { id: 2, val: 3, next: null, state: "default" },
                  { id: 3, val: 4, next: 1, state: "active" },
                ],
                pointerAssignments: { first: 1, second: 2 },
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [22, 23, 24],
              shortLabel: "Merge: 2->3, second=null",
              explanation: "first=node 2, second=node 3. Link 2->3. second becomes null so loop ends. Final: 1->4->2->3.",
              variables: { first: 2, second: 3, "2.next": 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 3, state: "found" },
                  { id: 1, val: 2, next: 2, state: "found" },
                  { id: 2, val: 3, next: null, state: "found" },
                  { id: 3, val: 4, next: 1, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Odd Length",
          description: "Five-node list — middle element stays in place",
          input: { list: [1, 2, 3, 4, 5] },
          expectedOutput: "[1, 5, 2, 4, 3]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Init slow=1, fast=2",
              explanation: "Start finding the middle with slow/fast pointers.",
              variables: { slow: 1, fast: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "active" },
                  { id: 1, val: 2, next: 2, state: "pointer" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 0, fast: 1 },
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: "slow=2, fast=4",
              explanation: "Advance slow to node 2, fast to node 4.",
              variables: { slow: 2, fast: 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "pointer" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 1, fast: 3 },
              },
              delta: { changedIndices: [1, 3], movedPointers: ["slow", "fast"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6],
              shortLabel: "slow=3, fast=null(end)",
              explanation: "Advance slow to node 3, fast goes past end. slow (node 3) is the middle.",
              variables: { slow: 3, fast: "null", middle: 3 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 3, next: 3, state: "active" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 2 },
              },
              delta: { changedIndices: [2], movedPointers: ["slow"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9, 10],
              shortLabel: "Split: [1,2,3] and [4,5]",
              explanation: "second = slow.next (node 4). Cut: slow.next = null. Two lists: [1,2,3] and [4,5].",
              variables: { firstHalf: "[1,2,3]", secondHalf: "[4,5]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 3, next: null, state: "visited" },
                  { id: 3, val: 4, next: 4, state: "active" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { second: 3 },
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12, 13, 14, 15],
              shortLabel: "Reverse second half: [5,4]",
              explanation: "Reverse [4,5] to get [5,4]. Node 5 is the new head of the reversed second half.",
              variables: { prev: 5, secondHalfReversed: "[5,4]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 3, next: null, state: "visited" },
                  { id: 3, val: 4, next: null, state: "visited" },
                  { id: 4, val: 5, next: 3, state: "active" },
                ],
                pointerAssignments: { first: 0, second: 4 },
              },
              delta: { changedIndices: [3, 4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [22, 23, 24],
              shortLabel: "Merge: 1->5, 5->2",
              explanation: "Link 1->5, 5->2. Advance first to node 2, second to node 4.",
              variables: { first: 2, second: 4 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 4, state: "active" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 3, next: null, state: "default" },
                  { id: 3, val: 4, next: null, state: "default" },
                  { id: 4, val: 5, next: 1, state: "active" },
                ],
                pointerAssignments: { first: 1, second: 3 },
              },
              delta: { changedIndices: [0, 4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [22, 23, 24],
              shortLabel: "Merge: 2->4, 4->3",
              explanation: "Link 2->4, 4->3. second becomes null. Final order: 1->5->2->4->3.",
              variables: { answer: "[1, 5, 2, 4, 3]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 4, state: "found" },
                  { id: 1, val: 2, next: 3, state: "found" },
                  { id: 2, val: 3, next: null, state: "found" },
                  { id: 3, val: 4, next: 2, state: "found" },
                  { id: 4, val: 5, next: 1, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: { changedIndices: [0, 1, 2, 3, 4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ list }) {
        const steps = [];
        const n = list.length;
        if (n <= 2) {
          steps.push({
            stepId: 0, lineNumbers: [1],
            shortLabel: n <= 1 ? "Single node" : "Two nodes — already reordered",
            explanation: n <= 1 ? "Nothing to reorder." : "Two nodes: result is the same.",
            variables: { answer: `[${list.join(", ")}]` },
            dataStructure: {
              nodes: list.map((v, i) => ({ id: i, val: v, next: i < n - 1 ? i + 1 : null, state: "found" })),
              pointerAssignments: {},
            },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        // Phase 1: Find middle
        let slow = 0, fast = 1;
        steps.push({
          stepId: 0, lineNumbers: [3],
          shortLabel: `Init slow=${list[0]}, fast=${list[1]}`,
          explanation: `Start finding the middle. slow at node ${list[0]}, fast at node ${list[1]}.`,
          variables: { slow: list[0], fast: list[1] },
          dataStructure: {
            nodes: list.map((v, i) => ({ id: i, val: v, next: i < n - 1 ? i + 1 : null, state: i === 0 ? "active" : i === 1 ? "pointer" : "default" })),
            pointerAssignments: { slow: 0, fast: 1 },
          },
          delta: { changedIndices: [0, 1] }, isAnswer: false,
        });

        while (fast < n && fast + 1 < n) {
          slow++;
          fast += 2;
          steps.push({
            stepId: steps.length, lineNumbers: [4, 5, 6],
            shortLabel: `slow=${list[slow]}, fast=${fast < n ? list[fast] : "end"}`,
            explanation: `Advance slow to node ${list[slow]}${fast < n ? `, fast to node ${list[fast]}` : ", fast past end"}.`,
            variables: { slow: list[slow], fast: fast < n ? list[fast] : "null" },
            dataStructure: {
              nodes: list.map((v, i) => ({ id: i, val: v, next: i < n - 1 ? i + 1 : null, state: i < slow ? "visited" : i === slow ? "active" : i === fast ? "pointer" : "default" })),
              pointerAssignments: { slow, ...(fast < n ? { fast } : {}) },
            },
            delta: { movedPointers: ["slow", "fast"] }, isAnswer: false,
          });
        }

        const mid = slow;
        // Phase 2: split and reverse
        steps.push({
          stepId: steps.length, lineNumbers: [9, 10],
          shortLabel: `Split at node ${list[mid]}`,
          explanation: `Cut the list after node ${list[mid]}. First half: [${list.slice(0, mid + 1).join(",")}], second half: [${list.slice(mid + 1).join(",")}].`,
          variables: { firstHalf: `[${list.slice(0, mid + 1).join(",")}]`, secondHalf: `[${list.slice(mid + 1).join(",")}]` },
          dataStructure: {
            nodes: list.map((v, i) => ({ id: i, val: v, next: i === mid ? null : i < n - 1 ? i + 1 : null, state: i <= mid ? "visited" : i === mid + 1 ? "active" : "default" })),
            pointerAssignments: { second: mid + 1 },
          },
          delta: { changedIndices: [mid, mid + 1] }, isAnswer: false,
        });

        const secondHalf = list.slice(mid + 1).reverse();
        steps.push({
          stepId: steps.length, lineNumbers: [12, 13, 14, 15],
          shortLabel: `Reverse second half: [${secondHalf.join(",")}]`,
          explanation: `Reverse [${list.slice(mid + 1).join(",")}] to get [${secondHalf.join(",")}].`,
          variables: { secondHalfReversed: `[${secondHalf.join(",")}]` },
          dataStructure: {
            nodes: list.map((v, i) => {
              if (i <= mid) return { id: i, val: v, next: i < mid ? i + 1 : null, state: "visited" };
              const revIdx = n - 1 - (i - mid - 1);
              const revNext = i === mid + 1 ? null : i - 1;
              return { id: i, val: v, next: revNext === mid ? null : revNext, state: i === n - 1 ? "active" : "visited" };
            }),
            pointerAssignments: { first: 0, second: n - 1 },
          },
          delta: {}, isAnswer: false,
        });

        // Phase 3: Merge
        const result = [];
        let fi = 0, si = 0;
        const firstArr = list.slice(0, mid + 1);
        const nextPtrs = new Array(n).fill(null);

        for (let k = 0; k < n; k++) {
          if (result.length % 2 === 0 && fi < firstArr.length) {
            result.push(firstArr[fi]);
            fi++;
          } else if (si < secondHalf.length) {
            result.push(secondHalf[si]);
            si++;
          }
        }

        // Build final wiring
        const idxMap = {};
        list.forEach((v, i) => { idxMap[v] = i; });
        for (let k = 0; k < result.length - 1; k++) {
          nextPtrs[idxMap[result[k]]] = idxMap[result[k + 1]];
        }
        nextPtrs[idxMap[result[result.length - 1]]] = null;

        steps.push({
          stepId: steps.length, lineNumbers: [22, 23, 24],
          shortLabel: `Merge complete: [${result.join(",")}]`,
          explanation: `Interleave the two halves to get [${result.join(", ")}].`,
          variables: { answer: `[${result.join(", ")}]` },
          dataStructure: {
            nodes: list.map((v, i) => ({ id: i, val: v, next: nextPtrs[i], state: "found" })),
            pointerAssignments: {},
          },
          delta: { changedIndices: list.map((_, i) => i) }, isAnswer: true,
        });
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n)", space: "O(n)", explanation: "Array stores all n nodes" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Three in-place passes: find middle, reverse, merge", tradeoff: "Eliminates O(n) extra space by operating directly on pointers" },
  },

  interviewTips: [
    "Break the problem into three clear phases — interviewers love structured thinking.",
    "Mention that slow/fast pointer gives you the middle in one pass, no need to count length first.",
    "Clarify: 'I'll modify the list in place, is that acceptable?' (It's expected.)",
    "Draw out 4-5 nodes and trace each phase on the whiteboard before coding.",
    "Note that for odd-length lists, the middle node stays as the tail of the first half.",
  ],

  relatedProblems: ["reverse-linked-list", "merge-two-sorted-lists", "palindrome-linked-list"],
};
