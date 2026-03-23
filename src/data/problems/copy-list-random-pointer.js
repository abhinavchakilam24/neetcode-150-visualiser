export const copyListRandomPointer = {
  id: 39,
  slug: "copy-list-random-pointer",
  title: "Copy List with Random Pointer",
  difficulty: "Medium",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 39,
  artifactType: "LinkedList",
  companies: ["Amazon", "Meta", "Microsoft", "Bloomberg", "Google"],
  leetcodeLink: "https://leetcode.com/problems/copy-list-with-random-pointer/",

  pattern: "HashMap for Old→New Node Mapping",
  patternExplanation: `When cloning a graph-like structure where nodes reference other nodes
    arbitrarily (not just .next), use a HashMap to map each original node to its clone.
    First pass creates all clones; second pass wires up .next and .random using the map.`,

  intuition: {
    coreInsight: `The challenge is that random pointers can point to any node in the list —
      including nodes we haven't created yet. We can't clone in one pass because when we
      encounter a random pointer to node 5, node 5's clone might not exist yet. A HashMap
      solves this: first pass creates all clones (old→new mapping), second pass wires up
      .next and .random by looking up clones in the map.`,

    mentalModel: `Imagine you need to photocopy a company org chart where each employee card
      has a "reports to" field (next) and a "best friend" field (random). You can't fill in
      "best friend" until every employee card has been copied. So you first copy all cards
      (creating blank clones), then go through again filling in the connections by looking
      up each person's clone in your directory. The HashMap IS that directory.`,

    whyNaiveFails: `A naive approach might try to clone in a single pass: create a new node,
      set its next, and set its random. But the random pointer might point to a node that
      hasn't been cloned yet. You'd need to either create nodes on-demand (messy tracking)
      or do two passes with a map (clean and simple). Without a map, you'd need O(n) time
      per random pointer lookup, giving O(n²) total.`,

    keyObservation: `The two-pass approach is clean: Pass 1 creates a clone for every node
      and stores old→new in a HashMap. Pass 2 iterates again and sets clone.next = map[old.next]
      and clone.random = map[old.random]. This works because by Pass 2, every node's clone
      exists in the map. The interleaving approach (O(1) space) weaves clones between originals,
      but the HashMap approach is cleaner and easier to explain in interviews.`,
  },

  problem: `A linked list of length n is given such that each node contains an additional random
    pointer, which could point to any node in the list, or null. Construct a deep copy of the list.
    The deep copy should consist of exactly n brand new nodes, where each new node has its value
    set to the value of its corresponding original node. Both the next and random pointer of the
    new nodes should point to new nodes in the copied list such that the pointers in the original
    list and copied list represent the same list state. None of the pointers in the new list should
    point to nodes in the original list. Return the head of the copied linked list.`,

  examples: [
    { input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]", explanation: "Deep copy with random pointers preserved." },
    { input: "head = [[1,1],[2,1]]", output: "[[1,1],[2,1]]", explanation: "Both nodes' random pointers point to the second node." },
    { input: "head = [[3,null],[3,0],[3,null]]", output: "[[3,null],[3,0],[3,null]]", explanation: "Duplicate values with different random pointers." },
  ],

  constraints: [
    "0 <= n <= 1000",
    "-10^4 <= Node.val <= 10^4",
    "random is null or points to a node in the linked list.",
  ],

  approaches: {
    brute: {
      label: "Two-Pass HashMap",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      idea: "First pass: create a clone of each node and store old→new in a HashMap. Second pass: wire up .next and .random using the map.",

      javaCode: `public Node copyRandomList(Node head) {
    if (head == null) return null;
    Map<Node, Node> map = new HashMap<>();

    Node curr = head;
    while (curr != null) {
        map.put(curr, new Node(curr.val));
        curr = curr.next;
    }

    curr = head;
    while (curr != null) {
        map.get(curr).next = map.get(curr.next);
        map.get(curr).random = map.get(curr.random);
        curr = curr.next;
    }

    return map.get(head);
}`,

      cppCode: `Node* copyRandomList(Node* head) {
    if (!head) return nullptr;
    unordered_map<Node*, Node*> map;

    Node* curr = head;
    while (curr) {
        map[curr] = new Node(curr->val);
        curr = curr->next;
    }

    curr = head;
    while (curr) {
        map[curr]->next = map[curr->next];
        map[curr]->random = map[curr->random];
        curr = curr->next;
    }

    return map[head];
}`,

      pythonCode: `def copyRandomList(head: 'Optional[Node]') -> 'Optional[Node]':
    if not head:
        return None
    old_to_new = {}

    curr = head
    while curr:
        old_to_new[curr] = Node(curr.val)
        curr = curr.next

    curr = head
    while curr:
        old_to_new[curr].next = old_to_new.get(curr.next)
        old_to_new[curr].random = old_to_new.get(curr.random)
        curr = curr.next

    return old_to_new[head]`,

      lineAnnotations: {
        2: "HashMap maps each original node to its clone",
        4: "Pass 1: create a clone for every original node",
        5: "Store old→new mapping in the HashMap",
        9: "Pass 2: wire up .next and .random pointers",
        10: "Clone's next = clone of original's next",
        11: "Clone's random = clone of original's random",
        14: "Return the clone of the head node",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Three-node list with random pointers",
          input: { values: [7, 13, 11], randoms: [null, 0, 0] },
          expectedOutput: "[[7,null],[13,0],[11,0]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashMap",
              explanation: "Create an empty HashMap to store the mapping from original nodes to their clones.",
              variables: { map: "{}", curr: "node(7)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: 1, state: "default" },
                  { id: 1, val: 13, next: 2, state: "default" },
                  { id: 2, val: 11, next: null, state: "default" },
                ],
                pointerAssignments: { curr: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: "Clone node(7)",
              explanation: "Create a clone of node with value 7. Store original→clone in the HashMap. Move curr to node(13).",
              variables: { map: "{7→7'}", curr: "node(13)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: 1, state: "active" },
                  { id: 1, val: 13, next: 2, state: "default" },
                  { id: 2, val: 11, next: null, state: "default" },
                  { id: "c0", val: "7'", next: null, state: "queued" },
                ],
                pointerAssignments: { curr: 1 },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6],
              shortLabel: "Clone node(13)",
              explanation: "Create a clone of node with value 13. Store in HashMap. Move curr to node(11).",
              variables: { map: "{7→7', 13→13'}", curr: "node(11)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: 1, state: "visited" },
                  { id: 1, val: 13, next: 2, state: "active" },
                  { id: 2, val: 11, next: null, state: "default" },
                  { id: "c0", val: "7'", next: null, state: "queued" },
                  { id: "c1", val: "13'", next: null, state: "queued" },
                ],
                pointerAssignments: { curr: 2 },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6],
              shortLabel: "Clone node(11)",
              explanation: "Create a clone of node with value 11. All originals now have clones in the map. Pass 1 complete.",
              variables: { map: "{7→7', 13→13', 11→11'}", curr: "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: 1, state: "visited" },
                  { id: 1, val: 13, next: 2, state: "visited" },
                  { id: 2, val: 11, next: null, state: "active" },
                  { id: "c0", val: "7'", next: null, state: "queued" },
                  { id: "c1", val: "13'", next: null, state: "queued" },
                  { id: "c2", val: "11'", next: null, state: "queued" },
                ],
                pointerAssignments: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10, 11],
              shortLabel: "Wire 7': next→13', random→null",
              explanation: "For node 7: clone.next = map[original.next] = map[13] = 13'. clone.random = map[null] = null. Node 7's clone is fully wired.",
              variables: { curr: "node(7)", "clone.next": "13'", "clone.random": "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: 1, state: "active" },
                  { id: 1, val: 13, next: 2, state: "visited" },
                  { id: 2, val: 11, next: null, state: "visited" },
                  { id: "c0", val: "7'", next: "c1", state: "found" },
                  { id: "c1", val: "13'", next: null, state: "queued" },
                  { id: "c2", val: "11'", next: null, state: "queued" },
                ],
                pointerAssignments: { curr: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [9, 10, 11],
              shortLabel: "Wire 13': next→11', random→7'",
              explanation: "For node 13: clone.next = map[11] = 11'. clone.random = map[node at index 0] = 7'. Node 13's clone is wired.",
              variables: { curr: "node(13)", "clone.next": "11'", "clone.random": "7'" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: 1, state: "visited" },
                  { id: 1, val: 13, next: 2, state: "active" },
                  { id: 2, val: 11, next: null, state: "visited" },
                  { id: "c0", val: "7'", next: "c1", state: "found" },
                  { id: "c1", val: "13'", next: "c2", state: "found" },
                  { id: "c2", val: "11'", next: null, state: "queued" },
                ],
                pointerAssignments: { curr: 1 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9, 10, 11, 14],
              shortLabel: "Wire 11': next→null, random→7'",
              explanation: "For node 11: clone.next = null. clone.random = map[node at index 0] = 7'. All clones wired. Return map[head] = 7'.",
              variables: { curr: "node(11)", "clone.next": "null", "clone.random": "7'", answer: "7'→13'→11'" },
              dataStructure: {
                nodes: [
                  { id: "c0", val: "7'", next: "c1", state: "found" },
                  { id: "c1", val: "13'", next: "c2", state: "found" },
                  { id: "c2", val: "11'", next: null, state: "found" },
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
          label: "Self-Referencing Random",
          description: "A node's random pointer points to itself",
          input: { values: [1, 2], randoms: [0, 1] },
          expectedOutput: "[[1,0],[2,1]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashMap",
              explanation: "Create empty HashMap. Each node's random points to itself — the clone must do the same.",
              variables: { map: "{}" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "default" },
                  { id: 1, val: 2, next: null, state: "default" },
                ],
                pointerAssignments: { curr: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: "Clone both nodes",
              explanation: "Pass 1: Clone node(1) and node(2). HashMap: {1→1', 2→2'}.",
              variables: { map: "{1→1', 2→2'}" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: null, state: "visited" },
                  { id: "c0", val: "1'", next: null, state: "queued" },
                  { id: "c1", val: "2'", next: null, state: "queued" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10, 11],
              shortLabel: "Wire 1': random→1' (self)",
              explanation: "Node 1's random points to itself (index 0). So clone 1'.random = map[node(1)] = 1'. The clone correctly self-references.",
              variables: { curr: "node(1)", "clone.random": "1' (self)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "active" },
                  { id: 1, val: 2, next: null, state: "visited" },
                  { id: "c0", val: "1'", next: "c1", state: "found" },
                  { id: "c1", val: "2'", next: null, state: "queued" },
                ],
                pointerAssignments: { curr: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [9, 10, 11, 14],
              shortLabel: "Wire 2': random→2' (self). Done!",
              explanation: "Node 2's random points to itself. Clone 2'.random = 2'. All wired. Return 1'→2'.",
              variables: { answer: "[[1,0],[2,1]]" },
              dataStructure: {
                nodes: [
                  { id: "c0", val: "1'", next: "c1", state: "found" },
                  { id: "c1", val: "2'", next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ values, randoms }) {
        const steps = [];
        const n = values.length;
        if (n === 0) {
          steps.push({
            stepId: 0, lineNumbers: [1],
            shortLabel: "Empty list",
            explanation: "Head is null. Return null.",
            variables: { answer: "null" },
            dataStructure: { nodes: [], pointerAssignments: {} },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const origNodes = values.map((v, i) => ({
          id: i, val: v, next: i + 1 < n ? i + 1 : null, state: "default"
        }));

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init HashMap",
          explanation: "Create empty HashMap to store old→new node mapping.",
          variables: { map: "{}" },
          dataStructure: { nodes: [...origNodes], pointerAssignments: { curr: 0 } },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const nodesState = origNodes.map((nd, j) => ({
            ...nd, state: j < i ? "visited" : j === i ? "active" : "default"
          }));
          const clones = [];
          for (let j = 0; j <= i; j++) {
            clones.push({ id: `c${j}`, val: `${values[j]}'`, next: null, state: "queued" });
          }
          steps.push({
            stepId: steps.length, lineNumbers: [4, 5, 6],
            shortLabel: `Clone node(${values[i]})`,
            explanation: `Create clone of node with value ${values[i]}. Store in HashMap.`,
            variables: { map: `{${values.slice(0, i + 1).map(v => `${v}→${v}'`).join(", ")}}` },
            dataStructure: { nodes: [...nodesState, ...clones], pointerAssignments: { curr: i + 1 < n ? i + 1 : null } },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        const finalClones = values.map((v, i) => ({
          id: `c${i}`, val: `${v}'`, next: i + 1 < n ? `c${i + 1}` : null, state: "found"
        }));

        steps.push({
          stepId: steps.length, lineNumbers: [14],
          shortLabel: "All clones wired. Return head clone.",
          explanation: `All ${n} clones created and wired with .next and .random pointers. Return the clone of the head.`,
          variables: { answer: `[${values.join("→")}]' (deep copy)` },
          dataStructure: { nodes: finalClones, pointerAssignments: {} },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Interleave Nodes (O(1) Space)",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Weave cloned nodes between original nodes: A→A'→B→B'→C→C'. Then set random
        pointers using original.random.next. Finally, extract the cloned list by unlinking
        every other node.`,

      javaCode: `public Node copyRandomList(Node head) {
    if (head == null) return null;

    // Step 1: Interleave clones
    Node curr = head;
    while (curr != null) {
        Node clone = new Node(curr.val);
        clone.next = curr.next;
        curr.next = clone;
        curr = clone.next;
    }

    // Step 2: Set random pointers
    curr = head;
    while (curr != null) {
        if (curr.random != null) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }

    // Step 3: Extract cloned list
    Node dummy = new Node(0);
    Node tail = dummy;
    curr = head;
    while (curr != null) {
        tail.next = curr.next;
        tail = tail.next;
        curr.next = tail.next;
        curr = curr.next;
    }

    return dummy.next;
}`,

      cppCode: `Node* copyRandomList(Node* head) {
    if (!head) return nullptr;

    // Step 1: Interleave clones
    Node* curr = head;
    while (curr) {
        Node* clone = new Node(curr->val);
        clone->next = curr->next;
        curr->next = clone;
        curr = clone->next;
    }

    // Step 2: Set random pointers
    curr = head;
    while (curr) {
        if (curr->random) {
            curr->next->random = curr->random->next;
        }
        curr = curr->next->next;
    }

    // Step 3: Extract cloned list
    Node dummy(0);
    Node* tail = &dummy;
    curr = head;
    while (curr) {
        tail->next = curr->next;
        tail = tail->next;
        curr->next = tail->next;
        curr = curr->next;
    }

    return dummy.next;
}`,

      pythonCode: `def copyRandomList(head: 'Optional[Node]') -> 'Optional[Node]':
    if not head:
        return None

    # Step 1: Interleave clones
    curr = head
    while curr:
        clone = Node(curr.val)
        clone.next = curr.next
        curr.next = clone
        curr = clone.next

    # Step 2: Set random pointers
    curr = head
    while curr:
        if curr.random:
            curr.next.random = curr.random.next
        curr = curr.next.next

    # Step 3: Extract cloned list
    dummy = Node(0)
    tail = dummy
    curr = head
    while curr:
        tail.next = curr.next
        tail = tail.next
        curr.next = tail.next
        curr = curr.next

    return dummy.next`,

      lineAnnotations: {
        5: "Iterate through the original list",
        6: "Create a clone with the same value",
        7: "Clone's next points to original's next",
        8: "Insert clone right after the original",
        9: "Move to the next original node",
        13: "Now set random pointers using the interleaved structure",
        14: "If original has a random pointer...",
        15: "Clone's random = original's random's next (which is the clone of random)",
        17: "Skip to next original (every other node)",
        22: "Extract the cloned list from the interleaved structure",
        24: "Clone is always curr.next",
        26: "Restore original's next pointer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Three-node list with various random pointers",
          input: { values: [7, 13, 11], randoms: [null, 0, 0] },
          expectedOutput: "[[7,null],[13,0],[11,0]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5],
              shortLabel: "Start interleaving",
              explanation: "We'll insert a clone of each node right after it. Start with the original list: 7→13→11.",
              variables: { phase: "Interleave", curr: "node(7)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: 1, state: "default" },
                  { id: 1, val: 13, next: 2, state: "default" },
                  { id: 2, val: 11, next: null, state: "default" },
                ],
                pointerAssignments: { curr: 0 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "Insert 7' after 7",
              explanation: "Create clone of 7. Insert between 7 and 13. List: 7→7'→13→11.",
              variables: { phase: "Interleave", curr: "node(13)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: "c0", state: "visited" },
                  { id: "c0", val: "7'", next: 1, state: "queued" },
                  { id: 1, val: 13, next: 2, state: "default" },
                  { id: 2, val: 11, next: null, state: "default" },
                ],
                pointerAssignments: { curr: 1 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "Insert 13' after 13",
              explanation: "Create clone of 13. Insert between 13 and 11. List: 7→7'→13→13'→11.",
              variables: { phase: "Interleave", curr: "node(11)" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: "c0", state: "visited" },
                  { id: "c0", val: "7'", next: 1, state: "queued" },
                  { id: 1, val: 13, next: "c1", state: "visited" },
                  { id: "c1", val: "13'", next: 2, state: "queued" },
                  { id: 2, val: 11, next: null, state: "default" },
                ],
                pointerAssignments: { curr: 2 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "Insert 11' after 11",
              explanation: "Create clone of 11. List: 7→7'→13→13'→11→11'. Interleaving complete!",
              variables: { phase: "Interleave complete" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: "c0", state: "visited" },
                  { id: "c0", val: "7'", next: 1, state: "queued" },
                  { id: 1, val: 13, next: "c1", state: "visited" },
                  { id: "c1", val: "13'", next: 2, state: "queued" },
                  { id: 2, val: 11, next: "c2", state: "visited" },
                  { id: "c2", val: "11'", next: null, state: "queued" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13, 14, 15, 17],
              shortLabel: "Set random pointers",
              explanation: "For node 7: random is null, so 7'.random stays null. For node 13: random→node(7), so 13'.random = 7.next = 7'. For node 11: random→node(7), so 11'.random = 7'. All random pointers wired!",
              variables: { phase: "Random pointers set" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: "c0", state: "visited" },
                  { id: "c0", val: "7'", next: 1, state: "active" },
                  { id: 1, val: 13, next: "c1", state: "visited" },
                  { id: "c1", val: "13'", next: 2, state: "active" },
                  { id: 2, val: 11, next: "c2", state: "visited" },
                  { id: "c2", val: "11'", next: null, state: "active" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [21, 22, 23, 24, 25, 26, 29],
              shortLabel: "Extract cloned list",
              explanation: "Separate the interleaved list into original (7→13→11) and clone (7'→13'→11'). Return clone head 7'. Deep copy complete!",
              variables: { answer: "7'→13'→11'" },
              dataStructure: {
                nodes: [
                  { id: "c0", val: "7'", next: "c1", state: "found" },
                  { id: "c1", val: "13'", next: "c2", state: "found" },
                  { id: "c2", val: "11'", next: null, state: "found" },
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
          label: "All Randoms Null",
          description: "No random pointers — tests the basic interleave/extract",
          input: { values: [1, 2], randoms: [null, null] },
          expectedOutput: "[[1,null],[2,null]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4, 5, 6, 7, 8, 9],
              shortLabel: "Interleave: 1→1'→2→2'",
              explanation: "Insert clones after each original. List becomes 1→1'→2→2'.",
              variables: { phase: "Interleave complete" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: "c0", state: "visited" },
                  { id: "c0", val: "1'", next: 1, state: "queued" },
                  { id: 1, val: 2, next: "c1", state: "visited" },
                  { id: "c1", val: "2'", next: null, state: "queued" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [13, 14, 17],
              shortLabel: "No random pointers to set",
              explanation: "Both nodes have random = null, so no clone random pointers need wiring. Skip the random phase.",
              variables: { phase: "Random: nothing to do" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: "c0", state: "visited" },
                  { id: "c0", val: "1'", next: 1, state: "active" },
                  { id: 1, val: 2, next: "c1", state: "visited" },
                  { id: "c1", val: "2'", next: null, state: "active" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [21, 22, 29],
              shortLabel: "Extract: 1'→2'. Done!",
              explanation: "Separate into original (1→2) and clone (1'→2'). Return 1'→2'. Both random pointers are null.",
              variables: { answer: "[[1,null],[2,null]]" },
              dataStructure: {
                nodes: [
                  { id: "c0", val: "1'", next: "c1", state: "found" },
                  { id: "c1", val: "2'", next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ values, randoms }) {
        const steps = [];
        const n = values.length;
        if (n === 0) {
          steps.push({
            stepId: 0, lineNumbers: [1],
            shortLabel: "Empty list",
            explanation: "Head is null. Return null.",
            variables: { answer: "null" },
            dataStructure: { nodes: [], pointerAssignments: {} },
            delta: {}, isAnswer: true,
          });
          return steps;
        }

        const origNodes = values.map((v, i) => ({
          id: i, val: v, next: i + 1 < n ? i + 1 : null, state: "default"
        }));

        steps.push({
          stepId: 0, lineNumbers: [4, 5],
          shortLabel: "Start interleaving",
          explanation: `Original list: ${values.join("→")}. We'll insert clones between each pair.`,
          variables: { phase: "Interleave" },
          dataStructure: { nodes: [...origNodes], pointerAssignments: { curr: 0 } },
          delta: {}, isAnswer: false,
        });

        // Show interleaved result
        const interleaved = [];
        for (let i = 0; i < n; i++) {
          interleaved.push({ id: i, val: values[i], next: `c${i}`, state: "visited" });
          interleaved.push({ id: `c${i}`, val: `${values[i]}'`, next: i + 1 < n ? i + 1 : null, state: "queued" });
        }
        steps.push({
          stepId: 1, lineNumbers: [6, 7, 8, 9],
          shortLabel: "Interleaving complete",
          explanation: `All clones inserted. List: ${values.map(v => `${v}→${v}'`).join("→")}.`,
          variables: { phase: "Interleave complete" },
          dataStructure: { nodes: interleaved, pointerAssignments: {} },
          delta: {}, isAnswer: false,
        });

        // Final result
        const cloneNodes = values.map((v, i) => ({
          id: `c${i}`, val: `${v}'`, next: i + 1 < n ? `c${i + 1}` : null, state: "found"
        }));
        steps.push({
          stepId: 2, lineNumbers: [29],
          shortLabel: "Extract and return clone list",
          explanation: `Separate interleaved list. Return deep copy: ${values.join("→")}'.`,
          variables: { answer: `${values.join("→")}' (deep copy)` },
          dataStructure: { nodes: cloneNodes, pointerAssignments: {} },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(n)",  explanation: "HashMap stores n mappings" },
    optimal: { time: "O(n)", space: "O(1)",  explanation: "Interleave clones in-place — no extra data structure needed", tradeoff: "Both are O(n) time; optimal avoids the HashMap for O(1) space" },
  },

  interviewTips: [
    "Start with the HashMap approach — it's cleaner and shows you understand the core challenge.",
    "Explain WHY a HashMap is needed: random pointers can reference any node, including ones not yet cloned.",
    "Mention the interleave approach as a follow-up for O(1) space.",
    "Ask: 'Can random pointers point to null? To the node itself?' (both yes).",
    "Emphasize that the deep copy must not share ANY nodes with the original.",
  ],

  relatedProblems: ["clone-graph", "linked-list-cycle"],
};
