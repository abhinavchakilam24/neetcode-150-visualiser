export const linkedListCycle = {
  id: 41,
  slug: "linked-list-cycle",
  title: "Linked List Cycle",
  difficulty: "Easy",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 41,
  artifactType: "LinkedList",
  companies: ["Amazon", "Microsoft", "Apple", "Google", "Meta"],
  leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/",

  pattern: "Floyd's Cycle Detection (Tortoise and Hare)",
  patternExplanation: `Use two pointers moving at different speeds. If there's a cycle,
    the fast pointer will eventually lap the slow pointer and they'll meet. If there's
    no cycle, the fast pointer reaches null first. This is the foundational technique
    for cycle detection in sequences and linked lists.`,

  intuition: {
    coreInsight: `If a linked list has a cycle, a fast pointer (moving 2 steps) will
      eventually catch up to a slow pointer (moving 1 step) inside the cycle. Think
      of it like two runners on a circular track — the faster one always laps the
      slower one. If there's no cycle, the fast pointer hits null and we know it's acyclic.`,

    mentalModel: `Imagine two runners on a track. If the track is a straight line (no cycle),
      the faster runner reaches the end first. But if the track loops back on itself,
      the faster runner will eventually come up behind the slower runner and they'll be
      at the same spot. The fast runner gains 1 step per iteration, so they're guaranteed
      to meet within one full loop of the cycle.`,

    whyNaiveFails: `A HashSet approach works: store every visited node, and if you see a node
      twice, there's a cycle. But this uses O(n) space. Floyd's algorithm achieves O(1)
      space by using the relative speed difference between two pointers instead of
      remembering every node.`,

    keyObservation: `Why does the fast pointer always catch the slow one? Inside the cycle,
      the distance between fast and slow decreases by 1 each step (fast gains 1 step per
      iteration). So if the gap is k, they meet after exactly k more iterations. The fast
      pointer never "jumps over" the slow one — the gap closes by exactly 1 each time.`,
  },

  problem: `Given head, the head of a linked list, determine if the linked list has a cycle
    in it. There is a cycle in a linked list if there is some node in the list that can be
    reached again by continuously following the next pointer. Return true if there is a
    cycle in the linked list. Otherwise, return false.`,

  examples: [
    { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "Tail connects to node index 1 (value 2), forming a cycle." },
    { input: "head = [1,2], pos = 0", output: "true", explanation: "Tail connects back to node 0 (value 1)." },
    { input: "head = [1], pos = -1", output: "false", explanation: "Single node with no cycle." },
  ],

  constraints: [
    "The number of nodes in the list is in the range [0, 10^4].",
    "-10^5 <= Node.val <= 10^5",
    "pos is -1 or a valid index in the linked list.",
  ],

  approaches: {
    brute: {
      label: "HashSet",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "Store each visited node in a HashSet. If we encounter a node already in the set, there's a cycle.",

      javaCode: `public boolean hasCycle(ListNode head) {
    Set<ListNode> visited = new HashSet<>();
    ListNode curr = head;
    while (curr != null) {
        if (visited.contains(curr)) {
            return true;
        }
        visited.add(curr);
        curr = curr.next;
    }
    return false;
}`,

      cppCode: `bool hasCycle(ListNode* head) {
    unordered_set<ListNode*> visited;
    ListNode* curr = head;
    while (curr) {
        if (visited.count(curr)) {
            return true;
        }
        visited.insert(curr);
        curr = curr->next;
    }
    return false;
}`,

      pythonCode: `def hasCycle(head: Optional[ListNode]) -> bool:
    visited = set()
    curr = head
    while curr:
        if curr in visited:
            return True
        visited.add(curr)
        curr = curr.next
    return False`,

      lineAnnotations: {
        2: "HashSet stores references to visited nodes",
        4: "Check if we've seen this node before",
        5: "Cycle detected — we revisited a node",
        7: "Mark this node as visited",
        8: "Move to next node",
        10: "Reached null — no cycle",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { values: [3, 2, 0, -4], cyclePos: 1 },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init HashSet",
              explanation: "Create empty HashSet. Start at head node with value 3. The tail (-4) connects back to node at index 1 (value 2).",
              variables: { curr: "node(3)", visited: "{}" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "default" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 0, next: 3, state: "default" },
                  { id: 3, val: -4, next: 1, state: "default" },
                ],
                pointerAssignments: { curr: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 7, 8],
              shortLabel: "Visit 3, move to 2",
              explanation: "node(3) not in set. Add it. Move to node(2).",
              variables: { curr: "node(2)", visited: "{3}" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 0, next: 3, state: "default" },
                  { id: 3, val: -4, next: 1, state: "default" },
                ],
                pointerAssignments: { curr: 1 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 7, 8],
              shortLabel: "Visit 2, move to 0",
              explanation: "node(2) not in set. Add it. Move to node(0).",
              variables: { curr: "node(0)", visited: "{3, 2}" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 0, next: 3, state: "default" },
                  { id: 3, val: -4, next: 1, state: "default" },
                ],
                pointerAssignments: { curr: 2 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 7, 8],
              shortLabel: "Visit 0, move to -4",
              explanation: "node(0) not in set. Add it. Move to node(-4).",
              variables: { curr: "node(-4)", visited: "{3, 2, 0}" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 0, next: 3, state: "visited" },
                  { id: 3, val: -4, next: 1, state: "active" },
                ],
                pointerAssignments: { curr: 3 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 7, 8],
              shortLabel: "Visit -4, next → node(2) again",
              explanation: "node(-4) not in set. Add it. Move to next which is node(2) — we're going back into the cycle.",
              variables: { curr: "node(2)", visited: "{3, 2, 0, -4}" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 0, next: 3, state: "visited" },
                  { id: 3, val: -4, next: 1, state: "visited" },
                ],
                pointerAssignments: { curr: 1 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5],
              shortLabel: "node(2) already visited → CYCLE!",
              explanation: "node(2) IS in the set! We've visited it before. This confirms a cycle exists. Return true.",
              variables: { answer: "true" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "found" },
                  { id: 2, val: 0, next: 3, state: "visited" },
                  { id: 3, val: -4, next: 1, state: "visited" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ values, cyclePos }) {
        const steps = [];
        const n = values.length;
        const nodes = values.map((v, i) => ({
          id: i, val: v, next: i + 1 < n ? i + 1 : (cyclePos >= 0 ? cyclePos : null), state: "default"
        }));

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init HashSet",
          explanation: "Create empty HashSet. Start traversal at head.",
          variables: { curr: `node(${values[0]})`, visited: "{}" },
          dataStructure: { nodes: [...nodes], pointerAssignments: { curr: 0 } },
          delta: {}, isAnswer: false,
        });

        const visited = new Set();
        for (let i = 0; i < n; i++) {
          visited.add(i);
          const updatedNodes = nodes.map((nd, j) => ({ ...nd, state: j <= i ? "visited" : "default" }));
          const nextIdx = i + 1 < n ? i + 1 : (cyclePos >= 0 ? cyclePos : null);

          if (nextIdx !== null && visited.has(nextIdx)) {
            updatedNodes[nextIdx] = { ...updatedNodes[nextIdx], state: "found" };
            steps.push({
              stepId: steps.length, lineNumbers: [4, 5],
              shortLabel: `node(${values[nextIdx]}) already visited → CYCLE!`,
              explanation: `Revisited node(${values[nextIdx]}). Cycle detected. Return true.`,
              variables: { answer: "true" },
              dataStructure: { nodes: updatedNodes, pointerAssignments: {} },
              delta: {}, isAnswer: true,
            });
            return steps;
          }

          steps.push({
            stepId: steps.length, lineNumbers: [4, 7, 8],
            shortLabel: `Visit ${values[i]}`,
            explanation: `node(${values[i]}) not in set. Add it and continue.`,
            variables: { curr: nextIdx !== null ? `node(${values[nextIdx]})` : "null" },
            dataStructure: { nodes: updatedNodes, pointerAssignments: nextIdx !== null ? { curr: nextIdx } : {} },
            delta: {}, isAnswer: false,
          });

          if (nextIdx === null) break;
        }

        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: "Reached null — no cycle",
          explanation: "Traversed entire list without revisiting a node. Return false.",
          variables: { answer: "false" },
          dataStructure: { nodes: nodes.map(nd => ({ ...nd, state: "visited" })), pointerAssignments: {} },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Floyd's Tortoise and Hare",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Use two pointers: slow moves 1 step, fast moves 2 steps. If they meet,
        there's a cycle. If fast reaches null, there isn't.`,

      javaCode: `public boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow == fast) {
            return true;
        }
    }

    return false;
}`,

      cppCode: `bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) {
            return true;
        }
    }

    return false;
}`,

      pythonCode: `def hasCycle(head: Optional[ListNode]) -> bool:
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False`,

      lineAnnotations: {
        2: "Slow pointer moves 1 step at a time",
        3: "Fast pointer moves 2 steps at a time",
        5: "Continue while fast can take 2 more steps",
        6: "Advance slow by 1",
        7: "Advance fast by 2",
        9: "If they meet, we've found a cycle",
        10: "Return true — cycle confirmed",
        13: "Fast reached null — no cycle exists",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Has Cycle",
          description: "Four nodes with tail connecting back to index 1",
          input: { values: [3, 2, 0, -4], cyclePos: 1 },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init slow=head, fast=head",
              explanation: "Both pointers start at head (node 3). Tail node (-4) connects back to node at index 1 (value 2), creating a cycle.",
              variables: { slow: "node(3)", fast: "node(3)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "active" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 0, next: 3, state: "default" },
                  { id: 3, val: -4, next: 1, state: "default" },
                ],
                pointerAssignments: { slow: 0, fast: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "slow→2, fast→0",
              explanation: "slow moves 1 step: 3→2. fast moves 2 steps: 3→2→0. They're at different nodes (2 and 0). No meeting yet.",
              variables: { slow: "node(2)", fast: "node(0)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "pointer" },
                  { id: 2, val: 0, next: 3, state: "active" },
                  { id: 3, val: -4, next: 1, state: "default" },
                ],
                pointerAssignments: { slow: 1, fast: 2 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7],
              shortLabel: "slow→0, fast→2",
              explanation: "slow: 2→0. fast: 0→-4→2 (wraps around the cycle!). slow at node(0), fast at node(2). Still different.",
              variables: { slow: "node(0)", fast: "node(2)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "active" },
                  { id: 2, val: 0, next: 3, state: "pointer" },
                  { id: 3, val: -4, next: 1, state: "visited" },
                ],
                pointerAssignments: { slow: 2, fast: 1 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 9, 10],
              shortLabel: "slow→-4, fast→-4 — MEET!",
              explanation: "slow: 0→-4. fast: 2→0→-4. Both are now at node(-4)! slow == fast confirms there's a cycle. Return true.",
              variables: { slow: "node(-4)", fast: "node(-4)", answer: "true" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 3, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "visited" },
                  { id: 2, val: 0, next: 3, state: "visited" },
                  { id: 3, val: -4, next: 1, state: "found" },
                ],
                pointerAssignments: { slow: 3, fast: 3 },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Cycle",
          description: "Straight list with no cycle — fast reaches null",
          input: { values: [1, 2, 3, 4], cyclePos: -1 },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init slow=1, fast=1",
              explanation: "Both start at head. No cycle — tail points to null.",
              variables: { slow: "node(1)", fast: "node(1)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "active" },
                  { id: 1, val: 2, next: 2, state: "default" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 0, fast: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "slow→2, fast→3",
              explanation: "slow: 1→2. fast: 1→2→3. Different nodes.",
              variables: { slow: "node(2)", fast: "node(3)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: 2, state: "pointer" },
                  { id: 2, val: 3, next: 3, state: "active" },
                  { id: 3, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { slow: 1, fast: 2 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 13],
              shortLabel: "fast.next = null → NO CYCLE",
              explanation: "fast is at node(3), which is the last node. fast.next is null, so the while condition fails. Fast reached the end without meeting slow. Return false.",
              variables: { slow: "node(3)", fast: "null", answer: "false" },
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
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Single Node Self-Loop",
          description: "One node pointing to itself",
          input: { values: [1], cyclePos: 0 },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init: slow=1, fast=1",
              explanation: "Single node that points back to itself. Both pointers start here.",
              variables: { slow: "node(1)", fast: "node(1)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 0, state: "active" },
                ],
                pointerAssignments: { slow: 0, fast: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 9, 10],
              shortLabel: "Both move to node(1) — MEET!",
              explanation: "slow: 1→1 (self-loop). fast: 1→1→1 (self-loop twice). slow == fast at node(1). Cycle confirmed! Return true.",
              variables: { slow: "node(1)", fast: "node(1)", answer: "true" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 0, state: "found" },
                ],
                pointerAssignments: { slow: 0, fast: 0 },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ values, cyclePos }) {
        const steps = [];
        const n = values.length;
        if (n === 0) {
          steps.push({
            stepId: 0, lineNumbers: [5, 13],
            shortLabel: "Empty list — no cycle",
            explanation: "Head is null. Return false.",
            variables: { answer: "false" },
            dataStructure: { nodes: [], pointerAssignments: {} },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const getNext = (idx) => {
          if (idx === null) return null;
          if (idx + 1 < n) return idx + 1;
          return cyclePos >= 0 ? cyclePos : null;
        };

        const nodes = values.map((v, i) => ({
          id: i, val: v, next: getNext(i), state: "default"
        }));

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init slow=head, fast=head",
          explanation: `Both pointers at head (value ${values[0]}).`,
          variables: { slow: `node(${values[0]})`, fast: `node(${values[0]})` },
          dataStructure: { nodes: nodes.map(nd => ({ ...nd, state: nd.id === 0 ? "active" : "default" })), pointerAssignments: { slow: 0, fast: 0 } },
          delta: {}, isAnswer: false,
        });

        let slow = 0, fast = 0;
        let maxIter = n * 3;
        while (maxIter-- > 0) {
          if (fast === null || getNext(fast) === null) {
            steps.push({
              stepId: steps.length, lineNumbers: [5, 13],
              shortLabel: "Fast reached null — no cycle",
              explanation: "Fast pointer reached the end. No cycle. Return false.",
              variables: { answer: "false" },
              dataStructure: { nodes: nodes.map(nd => ({ ...nd, state: "visited" })), pointerAssignments: {} },
              delta: {}, isAnswer: true,
            });
            return steps;
          }

          slow = getNext(slow);
          fast = getNext(getNext(fast));

          if (slow === fast) {
            const meetNodes = nodes.map(nd => ({ ...nd, state: "visited" }));
            meetNodes[slow] = { ...meetNodes[slow], state: "found" };
            steps.push({
              stepId: steps.length, lineNumbers: [6, 7, 9, 10],
              shortLabel: `Meet at node(${values[slow]}) — CYCLE!`,
              explanation: `slow and fast both at node(${values[slow]}). Cycle confirmed. Return true.`,
              variables: { slow: `node(${values[slow]})`, fast: `node(${values[fast]})`, answer: "true" },
              dataStructure: { nodes: meetNodes, pointerAssignments: { slow, fast } },
              delta: {}, isAnswer: true,
            });
            return steps;
          }

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6, 7],
            shortLabel: `slow→${values[slow]}, fast→${values[fast]}`,
            explanation: `slow at node(${values[slow]}), fast at node(${values[fast]}). Not equal, continue.`,
            variables: { slow: `node(${values[slow]})`, fast: `node(${values[fast]})` },
            dataStructure: {
              nodes: nodes.map(nd => ({
                ...nd,
                state: nd.id === slow ? "pointer" : nd.id === fast ? "active" : "default"
              })),
              pointerAssignments: { slow, fast },
            },
            delta: {}, isAnswer: false,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(n)", explanation: "HashSet stores up to n node references" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Two pointers only — no extra data structure", tradeoff: "Same time complexity, but O(1) space vs O(n)" },
  },

  interviewTips: [
    "Name-drop Floyd's algorithm — shows you know the classic technique.",
    "Explain WHY fast catches slow: the gap decreases by 1 each iteration.",
    "Mention that this same technique extends to finding the cycle start (LeetCode 142).",
    "Ask: 'Do I need to find where the cycle starts, or just detect it?' (just detect for this problem).",
    "Handle edge cases: empty list, single node, two nodes.",
  ],

  relatedProblems: ["find-duplicate-number", "linked-list-cycle-ii"],
};
