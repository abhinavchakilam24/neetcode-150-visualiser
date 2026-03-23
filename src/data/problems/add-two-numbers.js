export const addTwoNumbers = {
  id: 40,
  slug: "add-two-numbers",
  title: "Add Two Numbers",
  difficulty: "Medium",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 40,
  artifactType: "LinkedList",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/add-two-numbers/",

  pattern: "Carry-Based Digit-by-Digit Processing",
  patternExplanation: `When adding numbers stored in reverse-digit linked lists, process both
    lists simultaneously from head to tail (least significant to most significant digit),
    maintaining a carry. This mirrors how you add numbers by hand, right-to-left.`,

  intuition: {
    coreInsight: `The numbers are stored in reverse order, which is actually convenient:
      the head is the ones digit, the second node is the tens digit, etc. We add digit
      by digit from head to tail, carrying over any overflow to the next position.
      This is exactly how grade-school addition works — just on linked lists.`,

    mentalModel: `Think of adding two numbers by hand on paper: 342 + 465. You start from
      the rightmost digit. 2+5=7 (no carry). 4+6=10 (write 0, carry 1). 3+4+1=8. The
      linked lists give us the digits in this right-to-left order already! We just walk
      both lists simultaneously, adding digits and tracking the carry.`,

    whyNaiveFails: `You might think: convert both lists to integers, add them, then convert
      back. But the problem states numbers can have up to 100 digits — far beyond what any
      integer type can hold. Even BigInteger works but defeats the purpose. The digit-by-digit
      approach handles arbitrary length naturally.`,

    keyObservation: `Three details matter: (1) Lists can be different lengths — when one runs
      out, treat its digit as 0. (2) After both lists are exhausted, check if carry > 0 —
      you need one more node (e.g., 999 + 1 = 1000). (3) The reverse storage order means
      we process least-significant first, which is exactly what we want for addition.`,
  },

  problem: `You are given two non-empty linked lists representing two non-negative integers.
    The digits are stored in reverse order, and each of their nodes contains a single digit.
    Add the two numbers and return the sum as a linked list. You may assume the two numbers
    do not contain any leading zeros, except the number 0 itself.`,

  examples: [
    { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
    { input: "l1 = [0], l2 = [0]", output: "[0]", explanation: "0 + 0 = 0." },
    { input: "l1 = [9,9,9,9], l2 = [9,9,9]", output: "[8,9,9,0,1]", explanation: "9999 + 999 = 10998." },
  ],

  constraints: [
    "The number of nodes in each linked list is in the range [1, 100].",
    "0 <= Node.val <= 9",
    "The list represents a number without leading zeros.",
  ],

  approaches: {
    brute: {
      label: "Convert to Integer",
      tier: "brute",
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(max(n, m))",
      idea: "Convert both lists to integers, add them, then convert the sum back to a linked list. Fails for very large numbers.",

      javaCode: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    // NOTE: Fails for numbers > 2^63. Use digit-by-digit instead.
    long num1 = 0, num2 = 0, place = 1;
    while (l1 != null) { num1 += l1.val * place; place *= 10; l1 = l1.next; }
    place = 1;
    while (l2 != null) { num2 += l2.val * place; place *= 10; l2 = l2.next; }
    long sum = num1 + num2;
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    if (sum == 0) return new ListNode(0);
    while (sum > 0) {
        curr.next = new ListNode((int)(sum % 10));
        curr = curr.next;
        sum /= 10;
    }
    return dummy.next;
}`,

      cppCode: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    // NOTE: Fails for numbers > 2^63. Use digit-by-digit instead.
    long long num1 = 0, num2 = 0, place = 1;
    while (l1) { num1 += (long long)l1->val * place; place *= 10; l1 = l1->next; }
    place = 1;
    while (l2) { num2 += (long long)l2->val * place; place *= 10; l2 = l2->next; }
    long long sum = num1 + num2;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    if (sum == 0) return new ListNode(0);
    while (sum > 0) {
        curr->next = new ListNode(sum % 10);
        curr = curr->next;
        sum /= 10;
    }
    return dummy.next;
}`,

      pythonCode: `def addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    # Python handles big integers natively, but this approach misses the point
    num1, num2, place = 0, 0, 1
    while l1:
        num1 += l1.val * place
        place *= 10
        l1 = l1.next
    place = 1
    while l2:
        num2 += l2.val * place
        place *= 10
        l2 = l2.next
    total = num1 + num2
    dummy = ListNode(0)
    curr = dummy
    if total == 0:
        return ListNode(0)
    while total > 0:
        curr.next = ListNode(total % 10)
        curr = curr.next
        total //= 10
    return dummy.next`,

      lineAnnotations: {
        3: "Convert l1 to integer by multiplying each digit by its place value",
        5: "Convert l2 to integer",
        7: "Add the two numbers",
        10: "Extract digits from the sum and build result list",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { l1: [2, 4, 3], l2: [5, 6, 4] },
          expectedOutput: "[7, 0, 8]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 4],
              shortLabel: "Convert l1: 342",
              explanation: "Read l1 digits: 2*1 + 4*10 + 3*100 = 342.",
              variables: { num1: 342, num2: "?", place: 1000 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 2, next: 1, state: "visited" },
                  { id: 1, val: 4, next: 2, state: "visited" },
                  { id: 2, val: 3, next: null, state: "visited" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6],
              shortLabel: "Convert l2: 465",
              explanation: "Read l2 digits: 5*1 + 6*10 + 4*100 = 465.",
              variables: { num1: 342, num2: 465 },
              dataStructure: {
                nodes: [
                  { id: 3, val: 5, next: 4, state: "visited" },
                  { id: 4, val: 6, next: 5, state: "visited" },
                  { id: 5, val: 4, next: null, state: "visited" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 10, 11, 12],
              shortLabel: "342 + 465 = 807 → [7,0,8]",
              explanation: "Sum = 807. Extract digits: 807%10=7, 80%10=0, 8%10=8. Build list [7, 0, 8].",
              variables: { sum: 807, answer: "[7, 0, 8]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 7, next: 1, state: "found" },
                  { id: 1, val: 0, next: 2, state: "found" },
                  { id: 2, val: 8, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ l1, l2 }) {
        const steps = [];
        let num1 = 0, num2 = 0, place = 1;
        for (const d of l1) { num1 += d * place; place *= 10; }
        place = 1;
        for (const d of l2) { num2 += d * place; place *= 10; }
        const sum = num1 + num2;

        steps.push({
          stepId: 0, lineNumbers: [3, 5],
          shortLabel: `${num1} + ${num2} = ${sum}`,
          explanation: `Convert lists to numbers: ${num1} + ${num2} = ${sum}.`,
          variables: { num1, num2, sum },
          dataStructure: { nodes: [], pointerAssignments: {} },
          delta: {}, isAnswer: false,
        });

        const digits = sum === 0 ? [0] : [];
        let temp = sum;
        while (temp > 0) { digits.push(temp % 10); temp = Math.floor(temp / 10); }

        steps.push({
          stepId: 1, lineNumbers: [10, 11, 12],
          shortLabel: `Result: [${digits.join(",")}]`,
          explanation: `Extract digits from ${sum}: [${digits.join(", ")}].`,
          variables: { answer: `[${digits.join(", ")}]` },
          dataStructure: {
            nodes: digits.map((d, i) => ({ id: i, val: d, next: i + 1 < digits.length ? i + 1 : null, state: "found" })),
            pointerAssignments: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Digit-by-Digit with Carry",
      tier: "optimal",
      timeComplexity: "O(max(n, m))",
      spaceComplexity: "O(max(n, m))",
      idea: `Walk both lists simultaneously. At each step, add the two digits plus
        carry. The new digit is sum % 10, and carry is sum / 10. Continue until both
        lists are exhausted AND carry is 0.`,

      javaCode: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    int carry = 0;

    while (l1 != null || l2 != null || carry > 0) {
        int sum = carry;
        if (l1 != null) { sum += l1.val; l1 = l1.next; }
        if (l2 != null) { sum += l2.val; l2 = l2.next; }
        carry = sum / 10;
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
    }

    return dummy.next;
}`,

      cppCode: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    int carry = 0;

    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        carry = sum / 10;
        curr->next = new ListNode(sum % 10);
        curr = curr->next;
    }

    return dummy.next;
}`,

      pythonCode: `def addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    carry = 0

    while l1 or l2 or carry:
        total = carry
        if l1:
            total += l1.val
            l1 = l1.next
        if l2:
            total += l2.val
            l2 = l2.next
        carry = total // 10
        curr.next = ListNode(total % 10)
        curr = curr.next

    return dummy.next`,

      lineAnnotations: {
        2: "Dummy head eliminates edge cases for first node creation",
        4: "Carry tracks overflow from previous digit addition",
        6: "Continue while either list has digits OR there's a remaining carry",
        7: "Start with carry from previous step",
        8: "Add l1's digit if available",
        9: "Add l2's digit if available",
        10: "New carry = sum / 10 (0 or 1)",
        11: "New digit = sum % 10",
        14: "Skip dummy and return actual head",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "342 + 465 = 807, no carry propagation across all digits",
          input: { l1: [2, 4, 3], l2: [5, 6, 4] },
          expectedOutput: "[7, 0, 8]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init: dummy, carry=0",
              explanation: "Create a dummy node. Set carry to 0. We'll add digits from both lists position by position.",
              variables: { carry: 0, l1: "2→4→3", l2: "5→6→4" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: null, state: "default" },
                  { id: 0, val: 2, next: 1, state: "default" },
                  { id: 1, val: 4, next: 2, state: "default" },
                  { id: 2, val: 3, next: null, state: "default" },
                  { id: 3, val: 5, next: 4, state: "default" },
                  { id: 4, val: 6, next: 5, state: "default" },
                  { id: 5, val: 4, next: null, state: "default" },
                ],
                pointerAssignments: { l1: 0, l2: 3, curr: "d" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 9, 10, 11],
              shortLabel: "Ones: 2+5+0=7, carry=0",
              explanation: "Ones digit: sum = 0 (carry) + 2 (l1) + 5 (l2) = 7. digit = 7%10 = 7. carry = 7/10 = 0. Create node with value 7.",
              variables: { sum: 7, digit: 7, carry: 0, l1: "4→3", l2: "6→4" },
              dataStructure: {
                nodes: [
                  { id: "d", val: "D", next: "r0", state: "default" },
                  { id: 0, val: 2, next: 1, state: "visited" },
                  { id: 1, val: 4, next: 2, state: "default" },
                  { id: 2, val: 3, next: null, state: "default" },
                  { id: 3, val: 5, next: 4, state: "visited" },
                  { id: 4, val: 6, next: 5, state: "default" },
                  { id: 5, val: 4, next: null, state: "default" },
                  { id: "r0", val: 7, next: null, state: "found" },
                ],
                pointerAssignments: { l1: 1, l2: 4, curr: "r0" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 9, 10, 11],
              shortLabel: "Tens: 4+6+0=10, carry=1",
              explanation: "Tens digit: sum = 0 + 4 + 6 = 10. digit = 10%10 = 0. carry = 10/10 = 1. This carry will affect the next position.",
              variables: { sum: 10, digit: 0, carry: 1, l1: "3", l2: "4" },
              dataStructure: {
                nodes: [
                  { id: "r0", val: 7, next: "r1", state: "found" },
                  { id: 0, val: 2, next: 1, state: "visited" },
                  { id: 1, val: 4, next: 2, state: "visited" },
                  { id: 2, val: 3, next: null, state: "default" },
                  { id: 3, val: 5, next: 4, state: "visited" },
                  { id: 4, val: 6, next: 5, state: "visited" },
                  { id: 5, val: 4, next: null, state: "default" },
                  { id: "r1", val: 0, next: null, state: "active" },
                ],
                pointerAssignments: { l1: 2, l2: 5, curr: "r1" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 9, 10, 11],
              shortLabel: "Hundreds: 3+4+1=8, carry=0",
              explanation: "Hundreds digit: sum = 1 (carry) + 3 + 4 = 8. digit = 8. carry = 0. Both lists exhausted and carry is 0.",
              variables: { sum: 8, digit: 8, carry: 0, l1: "null", l2: "null" },
              dataStructure: {
                nodes: [
                  { id: "r0", val: 7, next: "r1", state: "found" },
                  { id: "r1", val: 0, next: "r2", state: "found" },
                  { id: "r2", val: 8, next: null, state: "active" },
                ],
                pointerAssignments: { curr: "r2" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14],
              shortLabel: "Return [7, 0, 8]",
              explanation: "Loop ends: l1 is null, l2 is null, carry is 0. Result list: 7→0→8. This represents 807 (342 + 465 = 807).",
              variables: { answer: "[7, 0, 8] (= 807)" },
              dataStructure: {
                nodes: [
                  { id: "r0", val: 7, next: "r1", state: "found" },
                  { id: "r1", val: 0, next: "r2", state: "found" },
                  { id: "r2", val: 8, next: null, state: "found" },
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
          label: "Carry Propagation",
          description: "999 + 1 = 1000 — carry ripples through every digit and creates a new one",
          input: { l1: [9, 9, 9], l2: [1] },
          expectedOutput: "[0, 0, 0, 1]",
          commonMistake: "Forgetting to check carry after both lists are exhausted. Without the 'carry > 0' condition in the while loop, 999 + 1 would return [0, 0, 0] instead of [0, 0, 0, 1].",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init: carry=0",
              explanation: "Lists are different lengths (3 vs 1). When the shorter list runs out, we treat missing digits as 0.",
              variables: { carry: 0, l1: "9→9→9", l2: "1" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 9, next: 1, state: "default" },
                  { id: 1, val: 9, next: 2, state: "default" },
                  { id: 2, val: 9, next: null, state: "default" },
                  { id: 3, val: 1, next: null, state: "default" },
                ],
                pointerAssignments: { l1: 0, l2: 3 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 9, 10, 11],
              shortLabel: "Ones: 9+1=10, digit=0, carry=1",
              explanation: "sum = 0 + 9 + 1 = 10. digit = 0. carry = 1. The carry begins its chain reaction.",
              variables: { sum: 10, digit: 0, carry: 1, l1: "9→9", l2: "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 9, next: 1, state: "visited" },
                  { id: 1, val: 9, next: 2, state: "default" },
                  { id: 2, val: 9, next: null, state: "default" },
                  { id: 3, val: 1, next: null, state: "visited" },
                  { id: "r0", val: 0, next: null, state: "active" },
                ],
                pointerAssignments: { l1: 1, l2: null },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 10, 11],
              shortLabel: "Tens: 9+0+1=10, digit=0, carry=1",
              explanation: "sum = 1 (carry) + 9 (l1) + 0 (l2 exhausted) = 10. digit = 0. carry = 1. Still propagating!",
              variables: { sum: 10, digit: 0, carry: 1, l1: "9", l2: "null" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 9, next: 1, state: "visited" },
                  { id: 1, val: 9, next: 2, state: "visited" },
                  { id: 2, val: 9, next: null, state: "default" },
                  { id: "r0", val: 0, next: "r1", state: "found" },
                  { id: "r1", val: 0, next: null, state: "active" },
                ],
                pointerAssignments: { l1: 2, l2: null },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 10, 11],
              shortLabel: "Hundreds: 9+0+1=10, digit=0, carry=1",
              explanation: "sum = 1 + 9 + 0 = 10. digit = 0. carry = 1. Both lists exhausted but carry is still 1!",
              variables: { sum: 10, digit: 0, carry: 1, l1: "null", l2: "null" },
              dataStructure: {
                nodes: [
                  { id: "r0", val: 0, next: "r1", state: "found" },
                  { id: "r1", val: 0, next: "r2", state: "found" },
                  { id: "r2", val: 0, next: null, state: "active" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 10, 11],
              shortLabel: "carry=1: create final digit 1",
              explanation: "Both lists null, but carry = 1. sum = 1. digit = 1. carry = 0. This extra node is the thousands digit — without it we'd lose a digit!",
              variables: { sum: 1, digit: 1, carry: 0, answer: "[0, 0, 0, 1]" },
              dataStructure: {
                nodes: [
                  { id: "r0", val: 0, next: "r1", state: "found" },
                  { id: "r1", val: 0, next: "r2", state: "found" },
                  { id: "r2", val: 0, next: "r3", state: "found" },
                  { id: "r3", val: 1, next: null, state: "found" },
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
          label: "Unequal Lengths",
          description: "Lists of different lengths with no carry",
          input: { l1: [1, 2], l2: [3, 4, 5] },
          expectedOutput: "[4, 6, 5]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init: carry=0",
              explanation: "l1 has 2 digits (21), l2 has 3 digits (543). When l1 runs out, treat its digit as 0.",
              variables: { carry: 0, l1: "1→2", l2: "3→4→5" },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "default" },
                  { id: 1, val: 2, next: null, state: "default" },
                  { id: 2, val: 3, next: 3, state: "default" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { l1: 0, l2: 2 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 9, 10, 11],
              shortLabel: "Ones: 1+3=4",
              explanation: "sum = 0 + 1 + 3 = 4. digit = 4. carry = 0.",
              variables: { sum: 4, digit: 4, carry: 0 },
              dataStructure: {
                nodes: [
                  { id: 0, val: 1, next: 1, state: "visited" },
                  { id: 1, val: 2, next: null, state: "default" },
                  { id: 2, val: 3, next: 3, state: "visited" },
                  { id: 3, val: 4, next: 4, state: "default" },
                  { id: 4, val: 5, next: null, state: "default" },
                  { id: "r0", val: 4, next: null, state: "active" },
                ],
                pointerAssignments: { l1: 1, l2: 3 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 9, 10, 11],
              shortLabel: "Tens: 2+4=6",
              explanation: "sum = 0 + 2 + 4 = 6. digit = 6. carry = 0. l1 is now exhausted.",
              variables: { sum: 6, digit: 6, carry: 0, l1: "null" },
              dataStructure: {
                nodes: [
                  { id: "r0", val: 4, next: "r1", state: "found" },
                  { id: "r1", val: 6, next: null, state: "active" },
                  { id: 4, val: 5, next: null, state: "default" },
                ],
                pointerAssignments: { l1: null, l2: 4 },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 9, 10, 11, 14],
              shortLabel: "Hundreds: 0+5=5. Done!",
              explanation: "sum = 0 + 0 (l1 null) + 5 = 5. digit = 5. carry = 0. Result: [4, 6, 5] representing 564 (21 + 543 = 564).",
              variables: { sum: 5, digit: 5, carry: 0, answer: "[4, 6, 5]" },
              dataStructure: {
                nodes: [
                  { id: "r0", val: 4, next: "r1", state: "found" },
                  { id: "r1", val: 6, next: "r2", state: "found" },
                  { id: "r2", val: 5, next: null, state: "found" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ l1, l2 }) {
        const steps = [];
        let carry = 0;
        let i = 0, j = 0;
        const result = [];

        const buildInputNodes = () => {
          const nodes = [];
          l1.forEach((v, k) => nodes.push({ id: k, val: v, next: k + 1 < l1.length ? k + 1 : null, state: k < i ? "visited" : k === i ? "active" : "default" }));
          l2.forEach((v, k) => nodes.push({ id: l1.length + k, val: v, next: k + 1 < l2.length ? l1.length + k + 1 : null, state: k < j ? "visited" : k === j ? "active" : "default" }));
          return nodes;
        };

        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4],
          shortLabel: "Init: carry=0",
          explanation: `Two lists: [${l1.join(",")}] and [${l2.join(",")}]. Process digit by digit with carry.`,
          variables: { carry: 0, l1: l1.join("→"), l2: l2.join("→") },
          dataStructure: { nodes: buildInputNodes(), pointerAssignments: { l1: 0, l2: l1.length } },
          delta: {}, isAnswer: false,
        });

        while (i < l1.length || j < l2.length || carry > 0) {
          const d1 = i < l1.length ? l1[i] : 0;
          const d2 = j < l2.length ? l2[j] : 0;
          const sum = carry + d1 + d2;
          const digit = sum % 10;
          carry = Math.floor(sum / 10);
          result.push(digit);
          if (i < l1.length) i++;
          if (j < l2.length) j++;

          const resNodes = result.map((v, k) => ({
            id: `r${k}`, val: v, next: k + 1 < result.length ? `r${k + 1}` : null,
            state: k === result.length - 1 ? "active" : "found"
          }));

          steps.push({
            stepId: steps.length, lineNumbers: [6, 7, 8, 9, 10, 11],
            shortLabel: `${d1}+${d2}+${carry === 0 && sum >= 10 ? 0 : carry}=${sum}, digit=${digit}`,
            explanation: `sum = ${carry > 0 ? carry + " (carry) + " : ""}${d1} + ${d2} = ${sum}. digit = ${digit}. carry = ${Math.floor(sum / 10)}.`,
            variables: { sum, digit, carry, result: `[${result.join(",")}]` },
            dataStructure: { nodes: resNodes, pointerAssignments: {} },
            delta: {}, isAnswer: i >= l1.length && j >= l2.length && carry === 0,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n + m)", space: "O(max(n, m))", explanation: "Convert, add, convert back — but overflows for large numbers" },
    optimal: { time: "O(max(n, m))", space: "O(max(n, m))", explanation: "Single pass through both lists; result list has at most max(n,m)+1 nodes", tradeoff: "No integer overflow risk — works for numbers with hundreds of digits" },
  },

  interviewTips: [
    "Mention that reverse storage order is convenient — it lines up digits for addition.",
    "Don't forget the final carry check — 999 + 1 needs an extra digit.",
    "Handle unequal lengths: treat missing digits as 0, don't stop when the shorter list ends.",
    "The dummy head pattern simplifies the first node creation.",
    "Ask: 'Can the lists be different lengths?' (yes).",
  ],

  relatedProblems: ["reverse-linked-list", "multiply-strings"],
};
