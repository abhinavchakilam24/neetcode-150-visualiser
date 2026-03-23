export const sumOfTwoIntegers = {
  id: 148,
  slug: "sum-of-two-integers",
  title: "Sum of Two Integers",
  difficulty: "Medium",
  topic: "bit-manipulation",
  topicLabel: "Bit Manipulation",
  neetcodeNumber: 148,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Uber"],
  leetcodeLink: "https://leetcode.com/problems/sum-of-two-integers/",

  pattern: "Bit-Level Arithmetic with XOR and AND",
  patternExplanation: `Addition can be decomposed into two operations: XOR computes the sum without
    carry (like adding each column independently), and AND followed by left-shift computes the carry.
    Repeat until there's no carry left.`,

  intuition: {
    coreInsight: `Binary addition at each bit position produces two outputs: the sum bit and the carry bit.
      XOR gives us the sum bits (1+0=1, 0+1=1, 1+1=0, 0+0=0) and AND gives us the carry bits (only
      1+1=1 generates a carry). The carry must be shifted left by 1 (it goes to the next column). We
      then "add" the partial sum and the shifted carry — but that's the same problem! So we loop
      until the carry is zero.`,

    mentalModel: `Think of how you add numbers by hand in binary. You go column by column: if both bits
      are 1, you write 0 and carry 1 to the next column. XOR is writing the column result, AND is
      detecting the carry. You keep processing carries until they all settle — exactly like rippling
      carries in a hardware adder circuit.`,

    whyNaiveFails: `There is no "brute force" that avoids using + or -. The whole point of this problem
      is to implement addition from scratch using only bitwise operations. Any approach using
      arithmetic operators defeats the purpose. The bit manipulation approach IS the solution.`,

    keyObservation: `The loop always terminates because the carry (a & b) << 1 shifts left each iteration.
      Since integers have finite bits (32), the carry eventually shifts out to zero. For positive numbers,
      this is obvious. For negative numbers (two's complement), the same logic works because XOR and AND
      on two's complement are well-defined.`,
  },

  problem: `Given two integers a and b, return the sum of the two integers without using the
    operators + and -.`,

  examples: [
    { input: "a = 1, b = 2", output: "3", explanation: "1 + 2 = 3" },
    { input: "a = 2, b = 3", output: "5", explanation: "2 + 3 = 5" },
  ],

  constraints: [
    "-1000 <= a, b <= 1000",
  ],

  approaches: {
    brute: {
      label: "Bit-by-Bit Manual Add",
      tier: "brute",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      idea: "Process each of 32 bit positions manually, tracking the carry bit. Build the result bit by bit.",

      javaCode: `public int getSum(int a, int b) {
    int result = 0;
    int carry = 0;
    for (int i = 0; i < 32; i++) {
        int bitA = (a >> i) & 1;
        int bitB = (b >> i) & 1;
        int sum = bitA ^ bitB ^ carry;
        carry = (bitA & bitB) | (bitA & carry) | (bitB & carry);
        result |= (sum << i);
    }
    return result;
}`,

      cppCode: `int getSum(int a, int b) {
    int result = 0;
    int carry = 0;
    for (int i = 0; i < 32; i++) {
        int bitA = (a >> i) & 1;
        int bitB = (b >> i) & 1;
        int sum = bitA ^ bitB ^ carry;
        carry = (bitA & bitB) | (bitA & carry) | (bitB & carry);
        result |= (sum << i);
    }
    return result;
}`,

      pythonCode: `def getSum(a: int, b: int) -> int:
    result = 0
    carry = 0
    for i in range(32):
        bitA = (a >> i) & 1
        bitB = (b >> i) & 1
        s = bitA ^ bitB ^ carry
        carry = (bitA & bitB) | (bitA & carry) | (bitB & carry)
        result |= (s << i)
    if result >= 2**31:
        result -= 2**32
    return result`,

      lineAnnotations: {
        2: "Build result bit by bit",
        3: "Track carry from previous column",
        4: "Process all 32 bit positions",
        5: "Extract bit i from a",
        6: "Extract bit i from b",
        7: "Sum bit = XOR of all three (a, b, carry)",
        8: "New carry = majority function (at least 2 of 3 are 1)",
        9: "Place the sum bit at position i in result",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { a: 2, b: 3 },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init result=0, carry=0",
              explanation: "a=2 (10), b=3 (11). We'll add bit by bit, tracking carries like a hardware full adder.",
              variables: { a: "2 (10)", b: "3 (11)", result: 0, carry: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                hashMap: { "a": { value: "10", isNew: true }, "b": { value: "11", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6, 7, 8, 9],
              shortLabel: "Bit 0: 0+1+0 = 1, carry=0",
              explanation: "Position 0: bitA=0, bitB=1, carry=0. sum = 0^1^0 = 1. carry = 0. result bit 0 = 1.",
              variables: { i: 0, bitA: 0, bitB: 1, sum: 1, carry: 0, result: "1 (1)" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [{ name: "bit", index: 0, color: "pointer" }],
                hashMap: { "bit 0": { value: "0+1=1, c=0", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6, 7, 8, 9],
              shortLabel: "Bit 1: 1+1+0 = 0, carry=1",
              explanation: "Position 1: bitA=1, bitB=1, carry=0. sum = 1^1^0 = 0. carry = 1 (both bits are 1). result bit 1 = 0.",
              variables: { i: 1, bitA: 1, bitB: 1, sum: 0, carry: 1, result: "1 (01)" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active" },
                pointers: [{ name: "bit", index: 1, color: "pointer" }],
                hashMap: { "bit 0": { value: "0+1=1, c=0" }, "bit 1": { value: "1+1=0, c=1", isNew: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7, 8, 9],
              shortLabel: "Bit 2: 0+0+1 = 1, carry=0",
              explanation: "Position 2: bitA=0, bitB=0, carry=1. sum = 0^0^1 = 1. carry = 0. The carry has been absorbed. result = 101 (5).",
              variables: { i: 2, bitA: 0, bitB: 0, sum: 1, carry: 0, result: "5 (101)" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited" },
                pointers: [],
                hashMap: { "bit 0": { value: "1" }, "bit 1": { value: "0" }, "bit 2": { value: "1 (carry absorbed)", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11],
              shortLabel: "Return 5",
              explanation: "Remaining bits 3-31 are all 0 with no carry. Result = 5 (101). 2 + 3 = 5, computed purely with bitwise ops.",
              variables: { answer: 5 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: { "result": { value: "5 (101)", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ a, b }) {
        const steps = [];
        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init result=0, carry=0",
          explanation: `a=${a} (${(a >>> 0).toString(2)}), b=${b} (${(b >>> 0).toString(2)}). Add bit by bit.`,
          variables: { a: `${a} (${(a >>> 0).toString(2)})`, b: `${b} (${(b >>> 0).toString(2)})`, result: 0, carry: 0 },
          dataStructure: { arrayStates: { 0: "default" }, pointers: [], hashMap: { "a": { value: (a >>> 0).toString(2), isNew: true }, "b": { value: (b >>> 0).toString(2), isNew: true } } },
          delta: {}, isAnswer: false,
        });

        let result = 0, carry = 0;
        const maxBits = Math.max(Math.ceil(Math.log2(Math.abs(a) + 1)), Math.ceil(Math.log2(Math.abs(b) + 1)), 1) + 2;
        for (let i = 0; i < Math.min(maxBits, 32); i++) {
          const bitA = (a >> i) & 1;
          const bitB = (b >> i) & 1;
          const sum = bitA ^ bitB ^ carry;
          carry = (bitA & bitB) | (bitA & carry) | (bitB & carry);
          result |= (sum << i);

          steps.push({
            stepId: steps.length, lineNumbers: [4, 5, 6, 7, 8, 9],
            shortLabel: `Bit ${i}: ${bitA}+${bitB}+${i > 0 ? ((a >> (i-1)) & 1 & (b >> (i-1)) & 1) : 0 }=${sum}, c=${carry}`,
            explanation: `Position ${i}: bitA=${bitA}, bitB=${bitB}, carry_in=${bitA ^ bitB ^ sum}→sum=${sum}, carry_out=${carry}.`,
            variables: { i, bitA, bitB, sum, carry, result: result },
            dataStructure: { arrayStates: { 0: "active" }, pointers: [], hashMap: { [`bit ${i}`]: { value: `${bitA}+${bitB}=${sum}, c=${carry}`, isNew: true } } },
            delta: {}, isAnswer: false,
          });

          if (carry === 0 && i >= maxBits - 2) break;
        }

        steps.push({
          stepId: steps.length, lineNumbers: [11],
          shortLabel: `Return ${result}`,
          explanation: `Result = ${result}. ${a} + ${b} = ${result}, computed with bitwise operations only.`,
          variables: { answer: result },
          dataStructure: { arrayStates: { 0: "found" }, pointers: [], hashMap: { "result": { value: String(result), isHighlighted: true } } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "XOR + AND Loop",
      tier: "optimal",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      idea: `XOR gives sum without carry. AND shifted left gives carry. Replace a with the sum
        and b with the carry. Repeat until carry is 0. At most 32 iterations for 32-bit integers.`,

      javaCode: `public int getSum(int a, int b) {
    while (b != 0) {
        int carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}`,

      cppCode: `int getSum(int a, int b) {
    while (b != 0) {
        int carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}`,

      pythonCode: `def getSum(a: int, b: int) -> int:
    mask = 0xFFFFFFFF
    while b & mask:
        carry = ((a & b) << 1) & mask
        a = (a ^ b) & mask
        b = carry
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)`,

      lineAnnotations: {
        2: "Loop until there are no more carries to propagate",
        3: "Carry = positions where BOTH bits are 1, shifted left",
        4: "Sum without carry = XOR (like column-wise addition)",
        5: "The carry becomes the new 'b' to add in the next round",
        7: "When carry is 0, 'a' holds the final sum",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "a=2, b=3 — simple addition with one carry",
          input: { a: 2, b: 3 },
          expectedOutput: "5",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "a=2 (10), b=3 (11)",
              explanation: "Start with a=2 (binary 10) and b=3 (binary 11). We need to compute their sum without using +.",
              variables: { a: "2 (10)", b: "3 (11)" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                hashMap: { "a": { value: "10", isNew: true }, "b": { value: "11", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3],
              shortLabel: "carry = (10 & 11) << 1 = 100",
              explanation: "Compute carry: a & b = 10 & 11 = 10. Shift left: 10 << 1 = 100 (4). At bit position 1, both a and b have a 1, generating a carry into position 2.",
              variables: { "a&b": "10 (2)", carry: "100 (4)" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active" },
                pointers: [],
                hashMap: { "a&b": { value: "10", isNew: true }, "carry": { value: "100 (4)", isNew: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5],
              shortLabel: "a = 10^11 = 01, b = 100",
              explanation: "Sum without carry: a ^ b = 10 ^ 11 = 01 (1). Now a=1 (the partial sum) and b=4 (the carry to propagate). We need one more round.",
              variables: { a: "1 (01)", b: "4 (100)" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active" },
                pointers: [],
                hashMap: { "a (sum)": { value: "01 (1)", isHighlighted: true }, "b (carry)": { value: "100 (4)", isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [2, 3],
              shortLabel: "carry = (01 & 100) << 1 = 0",
              explanation: "b != 0, so loop again. carry = a & b = 01 & 100 = 000. Shifted: 0. No bits overlap — no carry this time!",
              variables: { "a&b": "000 (0)", carry: "0" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [],
                hashMap: { "a&b": { value: "000", isHighlighted: true }, "carry": { value: "0 — done!", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5],
              shortLabel: "a = 01^100 = 101, b = 0",
              explanation: "a ^ b = 001 ^ 100 = 101 (5). b = carry = 0. The loop will exit on the next check.",
              variables: { a: "5 (101)", b: "0" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [],
                hashMap: { "a (sum)": { value: "101 (5)", isHighlighted: true }, "b (carry)": { value: "0", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [2, 7],
              shortLabel: "b=0 → Return 5",
              explanation: "b = 0 — no more carries. Return a = 5. We computed 2 + 3 = 5 using only XOR, AND, and shift. Two iterations were needed because there was one level of carry propagation.",
              variables: { answer: 5 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: { "result": { value: "5 (101)", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Negative + Positive",
          description: "a = -1, b = 1 — tests two's complement handling",
          input: { a: -1, b: 1 },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "a=-1, b=1",
              explanation: "a=-1 (all 1s in two's complement: 11...1), b=1 (00...01). Their sum should be 0.",
              variables: { a: "-1 (11...1)", b: "1 (00...01)" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                hashMap: { "a": { value: "11111...1 (-1)", isNew: true }, "b": { value: "00000...1 (1)", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3],
              shortLabel: "carry = (all 1s & 1) << 1 = 10",
              explanation: "carry = (-1 & 1) << 1 = 1 << 1 = 2. Only the LSB of both a and b is 1.",
              variables: { carry: "2 (10)" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [],
                hashMap: { "carry": { value: "10 (2)", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5],
              shortLabel: "a = -1^1 = -2, b = 2",
              explanation: "a = -1 ^ 1 = -2 (11...10). b = 2. The XOR flipped the LSB from 1 to 0, giving -2. Carry propagation continues.",
              variables: { a: "-2 (11...10)", b: "2 (10)" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active" },
                pointers: [],
                hashMap: { "a": { value: "11...10 (-2)", isHighlighted: true }, "b": { value: "10 (2)", isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [2, 3, 4, 5],
              shortLabel: "Carry ripples through all bits...",
              explanation: "The carry ripples through all 32 bit positions (like adding 1 to 11...11 in binary). After the carry fully propagates, a becomes 0 and b becomes 0 (carry overflows out of 32 bits).",
              variables: { a: "0", b: "0" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active" },
                pointers: [],
                hashMap: { "a": { value: "0", isHighlighted: true }, "b": { value: "0 (overflow)", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7],
              shortLabel: "Return 0",
              explanation: "b = 0. Return a = 0. -1 + 1 = 0, correctly computed via two's complement bit manipulation.",
              variables: { answer: 0 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: { "result": { value: "0", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "No Carry",
          description: "a=5, b=2 — no overlapping bits, single iteration",
          input: { a: 5, b: 2 },
          expectedOutput: "7",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "a=5 (101), b=2 (010)",
              explanation: "a=5 (101) and b=2 (010). Notice: no bit positions have a 1 in both numbers. This means there will be no carry at all!",
              variables: { a: "5 (101)", b: "2 (010)" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                hashMap: { "a": { value: "101", isNew: true }, "b": { value: "010", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3],
              shortLabel: "carry = (101 & 010) << 1 = 0",
              explanation: "carry = (5 & 2) << 1 = 0 << 1 = 0. No overlapping 1-bits, so no carry. This will be a single-iteration addition.",
              variables: { "a&b": 0, carry: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [],
                hashMap: { "carry": { value: "0 — no carry!", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5],
              shortLabel: "a = 101^010 = 111, b = 0",
              explanation: "a = 5 ^ 2 = 7 (111). b = carry = 0. XOR combines the non-overlapping bits perfectly — it's pure addition when there are no carries.",
              variables: { a: "7 (111)", b: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active" },
                pointers: [],
                hashMap: { "a": { value: "111 (7)", isHighlighted: true }, "b": { value: "0", isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [2, 7],
              shortLabel: "b=0 → Return 7",
              explanation: "b = 0 — done in one iteration. Return 7. When no bits overlap, XOR alone is sufficient — it's like adding two numbers with no carrying.",
              variables: { answer: 7 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: { "result": { value: "7 (111)", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ a, b }) {
        const steps = [];
        const mask = 0xFFFFFFFF;
        let aa = a & mask;
        let bb = b & mask;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `a=${a}, b=${b}`,
          explanation: `Start with a=${a} (binary ${(a >>> 0).toString(2)}), b=${b} (binary ${(b >>> 0).toString(2)}).`,
          variables: { a: `${a}`, b: `${b}` },
          dataStructure: { arrayStates: { 0: "default" }, pointers: [], hashMap: { "a": { value: (a >>> 0).toString(2), isNew: true }, "b": { value: (b >>> 0).toString(2), isNew: true } } },
          delta: {}, isAnswer: false,
        });

        let iteration = 0;
        while ((bb & mask) !== 0 && iteration < 10) {
          const carry = ((aa & bb) << 1) & mask;
          const sum = (aa ^ bb) & mask;

          steps.push({
            stepId: steps.length, lineNumbers: [3, 4, 5],
            shortLabel: `Round ${iteration + 1}: sum=${sum >>> 0}, carry=${carry >>> 0}`,
            explanation: `carry = (a & b) << 1 = ${carry >>> 0}. a = a ^ b = ${sum >>> 0}. b = carry = ${carry >>> 0}.`,
            variables: { "a^b": sum >>> 0, "(a&b)<<1": carry >>> 0, a: sum >>> 0, b: carry >>> 0 },
            dataStructure: { arrayStates: { 0: "active" }, pointers: [], hashMap: { "sum (a^b)": { value: (sum >>> 0).toString(2), isHighlighted: true }, "carry": { value: (carry >>> 0).toString(2), isHighlighted: true } } },
            delta: {}, isAnswer: false,
          });

          aa = sum;
          bb = carry;
          iteration++;
        }

        let result = aa;
        if (result > 0x7FFFFFFF) result -= 0x100000000;

        steps.push({
          stepId: steps.length, lineNumbers: [7],
          shortLabel: `Return ${result}`,
          explanation: `b = 0 — no more carries. Return a = ${result}. Computed ${a} + ${b} = ${result} using only bitwise operations.`,
          variables: { answer: result },
          dataStructure: { arrayStates: { 0: "found" }, pointers: [], hashMap: { "result": { value: String(result), isHighlighted: true } } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(1)", space: "O(1)", explanation: "Fixed 32 iterations for 32-bit integers" },
    optimal: { time: "O(1)", space: "O(1)", explanation: "At most 32 iterations — carry shifts out in finite steps", tradeoff: "The XOR+AND loop is more elegant and typically runs in fewer iterations than bit-by-bit" },
  },

  interviewTips: [
    "Explain the two components of binary addition: sum (XOR) and carry (AND << 1).",
    "Draw a small example like 2+3 in binary to show XOR and carry visually.",
    "Mention that the loop terminates because carry shifts left each iteration — it exits the 32-bit range.",
    "For Python, discuss the need for masking since Python has arbitrary-precision integers.",
    "Connect to hardware: this is exactly how a ripple-carry adder works in digital circuits.",
  ],

  relatedProblems: ["single-number", "reverse-bits", "number-of-1-bits"],
};
