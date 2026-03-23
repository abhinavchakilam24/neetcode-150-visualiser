export const reverseNodesKGroup = {
  id: 45,
  slug: "reverse-nodes-k-group",
  title: "Reverse Nodes in k-Group",
  difficulty: "Hard",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 45,
  artifactType: "LinkedList",
  companies: ["Amazon", "Microsoft", "Google", "Meta", "ByteDance"],
  leetcodeLink: "https://leetcode.com/problems/reverse-nodes-in-k-group/",

  pattern: "In-Place Linked List Reversal with Group Counting",
  patternExplanation: `Count k nodes ahead. If k nodes exist, reverse that segment in-place
    by re-pointing next pointers. Connect the reversed group to the previous group's tail and
    the next group's head. Repeat until fewer than k nodes remain.`,

  intuition: {
    coreInsight: `We reverse the list in chunks of k. For each chunk: (1) verify k nodes exist,
      (2) reverse those k nodes using the standard reversal technique, (3) reconnect — the
      previous group's tail points to the new head of this reversed group, and this group's
      new tail points to the next group's head. A dummy node before the head simplifies
      connection logic.`,

    mentalModel: `Imagine a train with carriages. You need to reverse every k carriages as a
      group. First, count k carriages ahead. If you have enough, detach the group, reverse it
      (last car becomes first), then reattach it. The key is keeping track of the "coupler"
      before and after each group so the train stays connected.`,

    whyNaiveFails: `Using an array to store nodes and reversing chunks in the array works but
      uses O(n) extra space. The problem asks for O(1) extra space — in-place pointer
      manipulation only. The challenge is managing the connections between reversed groups
      without losing references.`,

    keyObservation: `Use a dummy node before head. For each group: groupPrev = node before the
      group, groupNext = node after the group. After reversing k nodes, groupPrev.next should
      point to the new first node (previously last), and the new last node (previously first)
      should point to groupNext. Then advance groupPrev to the new last node.`,
  },

  problem: `Given the head of a linked list, reverse the nodes of the list k at a time, and
    return the modified list. k is a positive integer and is less than or equal to the length
    of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in
    the end, should remain as it is. You may not alter the values in the list's nodes, only
    nodes themselves may be changed.`,

  examples: [
    { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]", explanation: "Reverse in groups of 2: [1,2]→[2,1], [3,4]→[4,3], [5] stays." },
    { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]", explanation: "Reverse first group of 3: [1,2,3]→[3,2,1]. [4,5] has fewer than 3 nodes, stays." },
  ],

  constraints: [
    "The number of nodes in the list is n",
    "1 <= k <= n <= 5000",
    "0 <= Node.val <= 1000",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Array)",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "Store values in array, reverse each k-group in the array, rebuild list.",

      javaCode: `public ListNode reverseKGroup(ListNode head, int k) {
    List<Integer> vals = new ArrayList<>();
    ListNode curr = head;
    while (curr != null) { vals.add(curr.val); curr = curr.next; }
    for (int i = 0; i + k <= vals.size(); i += k) {
        int l = i, r = i + k - 1;
        while (l < r) {
            int tmp = vals.get(l);
            vals.set(l, vals.get(r));
            vals.set(r, tmp);
            l++; r--;
        }
    }
    ListNode dummy = new ListNode(0); curr = dummy;
    for (int v : vals) { curr.next = new ListNode(v); curr = curr.next; }
    return dummy.next;
}`,

      cppCode: `ListNode* reverseKGroup(ListNode* head, int k) {
    vector<int> vals;
    ListNode* curr = head;
    while (curr) { vals.push_back(curr->val); curr = curr->next; }
    for (int i = 0; i + k <= vals.size(); i += k) {
        int l = i, r = i + k - 1;
        while (l < r) swap(vals[l++], vals[r--]);
    }
    ListNode dummy(0); curr = &dummy;
    for (int v : vals) { curr->next = new ListNode(v); curr = curr->next; }
    return dummy.next;
}`,

      pythonCode: `def reverseKGroup(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    vals = []
    curr = head
    while curr:
        vals.append(curr.val)
        curr = curr.next
    for i in range(0, len(vals) - k + 1, k):
        vals[i:i+k] = vals[i:i+k][::-1]
    dummy = curr = ListNode(0)
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next`,

      lineAnnotations: {
        2: "Collect all values into array",
        5: "Reverse each k-group in the array",
        13: "Rebuild linked list from modified array",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { head: [1, 2, 3, 4, 5], k: 2 },
          expectedOutput: "[2,1,4,3,5]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Collect: [1,2,3,4,5]",
              explanation: "Traverse list and collect values: [1,2,3,4,5].",
              variables: { vals: "[1,2,3,4,5]", k: 2 },
              dataStructure: {
                nodes: [1,2,3,4,5].map((v, i) => ({ id: i, val: v, next: i < 4 ? i + 1 : null, state: "default" })),
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "Reverse groups: [2,1,4,3,5]",
              explanation: "Reverse [1,2]→[2,1], reverse [3,4]→[4,3], [5] stays. Result: [2,1,4,3,5].",
              variables: { vals: "[2,1,4,3,5]" },
              dataStructure: {
                nodes: [2,1,4,3,5].map((v, i) => ({ id: i, val: v, next: i < 4 ? i + 1 : null, state: "found" })),
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ head, k }) {
        const steps = [];
        const vals = [...head];
        for (let i = 0; i + k <= vals.length; i += k) {
          let l = i, r = i + k - 1;
          while (l < r) { const t = vals[l]; vals[l] = vals[r]; vals[r] = t; l++; r--; }
        }
        steps.push({
          stepId: 0, lineNumbers: [5],
          shortLabel: `Reversed: [${vals.join(",")}]`,
          explanation: `After reversing k-groups: [${vals.join(",")}].`,
          variables: { result: JSON.stringify(vals) },
          dataStructure: { nodes: vals.map((v, i) => ({ id: i, val: v, next: i < vals.length - 1 ? i + 1 : null, state: "found" })), pointerAssignments: {} },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "In-Place Reversal",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Use a dummy node. For each group: count k nodes ahead, reverse them in-place,
        reconnect to previous and next groups. Advance the pointer and repeat.`,

      javaCode: `public ListNode reverseKGroup(ListNode head, int k) {
    ListNode dummy = new ListNode(0, head);
    ListNode groupPrev = dummy;

    while (true) {
        ListNode kth = getKth(groupPrev, k);
        if (kth == null) break;
        ListNode groupNext = kth.next;

        ListNode prev = kth.next, curr = groupPrev.next;
        while (curr != groupNext) {
            ListNode tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
        }

        ListNode tmp = groupPrev.next;
        groupPrev.next = kth;
        groupPrev = tmp;
    }

    return dummy.next;
}

ListNode getKth(ListNode curr, int k) {
    while (curr != null && k > 0) { curr = curr.next; k--; }
    return curr;
}`,

      cppCode: `ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode dummy(0, head);
    ListNode* groupPrev = &dummy;

    while (true) {
        ListNode* kth = getKth(groupPrev, k);
        if (!kth) break;
        ListNode* groupNext = kth->next;

        ListNode* prev = kth->next;
        ListNode* curr = groupPrev->next;
        while (curr != groupNext) {
            ListNode* tmp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = tmp;
        }

        ListNode* tmp = groupPrev->next;
        groupPrev->next = kth;
        groupPrev = tmp;
    }

    return dummy.next;
}

ListNode* getKth(ListNode* curr, int k) {
    while (curr && k > 0) { curr = curr->next; k--; }
    return curr;
}`,

      pythonCode: `def reverseKGroup(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    dummy = ListNode(0, head)
    groupPrev = dummy

    while True:
        kth = getKth(groupPrev, k)
        if not kth:
            break
        groupNext = kth.next

        prev, curr = kth.next, groupPrev.next
        while curr != groupNext:
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp

        tmp = groupPrev.next
        groupPrev.next = kth
        groupPrev = tmp

    return dummy.next

def getKth(curr, k):
    while curr and k > 0:
        curr = curr.next
        k -= 1
    return curr`,

      lineAnnotations: {
        2: "Dummy node simplifies head connection",
        3: "groupPrev tracks the node before current group",
        5: "Find the kth node from groupPrev",
        6: "If fewer than k nodes remain, stop",
        7: "groupNext = first node of the NEXT group",
        9: "Standard reversal: prev starts at groupNext",
        10: "curr starts at first node of this group",
        11: "Reverse pointers one by one",
        17: "Reconnect: groupPrev → kth (new head of reversed group)",
        18: "Advance groupPrev to old first node (now tail of group)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Reverse [1,2,3,4,5] in groups of 2",
          input: { head: [1, 2, 3, 4, 5], k: 2 },
          expectedOutput: "[2,1,4,3,5]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: dummy→1→2→3→4→5",
              explanation: "Create dummy node before head. groupPrev = dummy. List: dummy→1→2→3→4→5.",
              variables: { k: 2, groupPrev: "dummy" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 0, state: "default" },
                  { id: 0, val: 1, next: 1, state: "default" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { groupPrev: "d" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "Group 1: kth=node(2), groupNext=node(3)",
              explanation: "Find 2nd node from groupPrev: kth = node with value 2. groupNext = node with value 3.",
              variables: { kth: 2, groupNext: 3 },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 0, state: "default" },
                  { id: 0, val: 1, next: 1, state: "active" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { groupPrev: "d", kth: 1 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 11, 12, 13, 14],
              shortLabel: "Reverse group 1: 2→1",
              explanation: "Reverse nodes 1 and 2: 1.next→3 (groupNext), 2.next→1. Now: dummy→2→1→3→4→5.",
              variables: { reversed: "2→1" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 1, state: "default" },
                  { id: 1, val: 2, next: 0, state: "found" },
                  { id: 0, val: 1, next: 2, state: "found" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { groupPrev: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "Group 2: kth=node(4), groupNext=node(5)",
              explanation: "Find 2nd node from groupPrev (node 1): kth = node with value 4. groupNext = node with value 5.",
              variables: { kth: 4, groupNext: 5 },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 1, state: "default" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 0, val: 1, next: 2, state: "visited" },
                  { id: 2, val: 3, next: 3, state: "active" },
                  { id: 3, val: 4, next: 4, state: "active" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { groupPrev: 0, kth: 3 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10, 11, 12, 13, 14],
              shortLabel: "Reverse group 2: 4→3",
              explanation: "Reverse nodes 3 and 4: 3.next→5, 4.next→3. Now: 2→1→4→3→5.",
              variables: { reversed: "4→3" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: 1, state: "default" },
                  { id: 1, val: 2, next: 0, state: "visited" },
                  { id: 0, val: 1, next: 3, state: "visited" },
                  { id: 3, val: 4, next: 2, state: "found" },
                  { id: 2, val: 3, next: 4, state: "found" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { groupPrev: 2 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 20],
              shortLabel: "Only 1 node left, stop",
              explanation: "getKth from node(3) finds only 1 node (value 5). k=2 but only 1 remains. Break. Return dummy.next = [2,1,4,3,5].",
              variables: { answer: "[2,1,4,3,5]" },
              dataStructure: {
                nodes: [
                  { id: 1, val: 2, next: 0, state: "found" },
                  { id: 0, val: 1, next: 3, state: "found" },
                  { id: 3, val: 4, next: 2, state: "found" },
                  { id: 2, val: 3, next: 4, state: "found" },
                  { id: 4, val: 5, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "k = 3",
          description: "Group size 3 with remainder",
          input: { head: [1, 2, 3, 4, 5], k: 3 },
          expectedOutput: "[3,2,1,4,5]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: 1→2→3→4→5, k=3",
              explanation: "List has 5 nodes. k=3. First group [1,2,3] will be reversed, [4,5] stays.",
              variables: { k: 3 },
              dataStructure: {
                nodes: [1,2,3,4,5].map((v, i) => ({ id: i, val: v, next: i < 4 ? i + 1 : null, state: "default" })),
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [9, 10, 11, 17, 18],
              shortLabel: "Reverse group 1: 3→2→1",
              explanation: "Reverse first 3 nodes: [1,2,3] → [3,2,1]. List becomes: 3→2→1→4→5.",
              variables: { reversed: "3→2→1" },
              dataStructure: {
                nodes: [
                  { id: 2, val: 3, next: 1, state: "found" },
                  { id: 1, val: 2, next: 0, state: "found" },
                  { id: 0, val: 1, next: 3, state: "found" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 20],
              shortLabel: "Only 2 nodes left < k=3, stop",
              explanation: "Only 2 nodes remain [4,5] which is less than k=3. Don't reverse. Return [3,2,1,4,5].",
              variables: { answer: "[3,2,1,4,5]" },
              dataStructure: {
                nodes: [
                  { id: 2, val: 3, next: 1, state: "found" },
                  { id: 1, val: 2, next: 0, state: "found" },
                  { id: 0, val: 1, next: 3, state: "found" },
                  { id: 3, val: 4, next: 4, state: "found" },
                  { id: 4, val: 5, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ head, k }) {
        const steps = [];
        const vals = [...head];
        const result = [...vals];

        for (let i = 0; i + k <= result.length; i += k) {
          let l = i, r = i + k - 1;
          while (l < r) { const t = result[l]; result[l] = result[r]; result[r] = t; l++; r--; }

          steps.push({
            stepId: steps.length, lineNumbers: [9, 10, 11],
            shortLabel: `Reverse group at ${i}: [${result.slice(i, i + k).join(",")}]`,
            explanation: `Reversed nodes at positions ${i} to ${i + k - 1}.`,
            variables: { groupStart: i, k },
            dataStructure: { nodes: result.map((v, j) => ({ id: j, val: v, next: j < result.length - 1 ? j + 1 : null, state: j >= i && j < i + k ? "found" : j < i ? "visited" : "default" })), pointerAssignments: {} },
            delta: {}, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [20],
          shortLabel: `Return [${result.join(",")}]`,
          explanation: `Final list: [${result.join(",")}].`,
          variables: { answer: `[${result.join(",")}]` },
          dataStructure: { nodes: result.map((v, i) => ({ id: i, val: v, next: i < result.length - 1 ? i + 1 : null, state: "found" })), pointerAssignments: {} },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n)", space: "O(n)", explanation: "Store all values in array, reverse groups, rebuild" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "In-place pointer reversal — each node visited at most twice", tradeoff: "Same time complexity but O(1) space vs O(n) for array approach" },
  },

  interviewTips: [
    "Use a dummy node to handle the head being part of the first group.",
    "Separate concerns: getKth counts ahead, main loop handles reversal and reconnection.",
    "Draw the pointer reassignments on paper — there are 4 key connections per group.",
    "Emphasize that leftover nodes (< k) are untouched — important constraint.",
    "Mention this combines two patterns: counting ahead and in-place reversal.",
  ],

  relatedProblems: ["reverse-linked-list", "swap-nodes-in-pairs"],
};
