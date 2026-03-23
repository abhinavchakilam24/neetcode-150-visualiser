export const numberOfOneBits = {
  id: 144,
  slug: "number-of-1-bits",
  title: "Number of 1 Bits",
  difficulty: "Easy",
  topic: "bit-manipulation",
  topicLabel: "Bit Manipulation",
  neetcodeNumber: 144,
  artifactType: "ArrayHashMap",
  companies: ["Apple", "Microsoft", "Amazon"],
  leetcodeLink: "https://leetcode.com/problems/number-of-1-bits/",

  pattern: "Bit Counting with n & (n-1)",
  patternExplanation: `The expression n & (n-1) clears the lowest set bit of n. Repeatedly applying
    this until n becomes 0 counts exactly how many 1-bits exist. Each iteration removes one bit,
    so the loop runs exactly k times where k is the number of set bits.`,

  intuition: {
    coreInsight: `n & (n-1) strips the rightmost 1-bit from n. Why? Subtracting 1 from n flips
      the rightmost 1-bit to 0 and all lower 0-bits to 1. AND-ing with original n keeps everything
      above unchanged but zeros out that rightmost 1-bit and everything below it. Count how many
      times you can do this before n hits 0 — that's your answer.`,

    mentalModel: `Imagine a row of light switches where some are ON (1-bits). The trick n & (n-1)
      is like reaching to the rightmost ON switch and flipping it OFF. You keep doing this until
      all switches are OFF, counting each flip. You never touch the OFF switches at all — that's
      why this is faster than checking every single switch position.`,

    whyNaiveFails: `The naive approach checks all 32 bit positions one by one (right-shift and check
      the last bit). This always takes 32 iterations regardless of how many bits are set. The
      n & (n-1) trick runs in O(k) where k is the number of set bits — for n=8 (just one bit set),
      it finishes in 1 iteration instead of 32.`,

    keyObservation: `Understanding why n-1 flips the trailing bits is the key insight.
      For n = 10100, n-1 = 10011. The rightmost 1 and all trailing 0s get flipped.
      AND-ing: 10100 & 10011 = 10000. One 1-bit removed, the rest preserved.`,
  },

  problem: `Write a function that takes the binary representation of a positive integer and returns
    the number of set bits it has (also known as the Hamming weight).`,

  examples: [
    { input: "n = 11 (binary: 1011)", output: "3", explanation: "The binary 1011 has three 1-bits." },
    { input: "n = 128 (binary: 10000000)", output: "1", explanation: "The binary 10000000 has one 1-bit." },
    { input: "n = 2147483645 (binary: 1111...1101)", output: "30", explanation: "31-bit number with 30 set bits." },
  ],

  constraints: [
    "1 <= n <= 2^31 - 1",
  ],

  approaches: {
    brute: {
      label: "Check Each Bit",
      tier: "brute",
      timeComplexity: "O(32)",
      spaceComplexity: "O(1)",
      idea: "Right-shift n by one position 32 times, checking the last bit each time.",

      javaCode: `public int hammingWeight(int n) {
    int count = 0;
    for (int i = 0; i < 32; i++) {
        if ((n & 1) == 1) {
            count++;
        }
        n >>= 1;
    }
    return count;
}`,

      cppCode: `int hammingWeight(uint32_t n) {
    int count = 0;
    for (int i = 0; i < 32; i++) {
        if (n & 1) {
            count++;
        }
        n >>= 1;
    }
    return count;
}`,

      pythonCode: `def hammingWeight(n: int) -> int:
    count = 0
    for i in range(32):
        if n & 1:
            count += 1
        n >>= 1
    return count`,

      lineAnnotations: {
        2: "Initialize bit counter",
        3: "Check all 32 bit positions",
        4: "Is the last bit a 1?",
        5: "Yes — increment count",
        7: "Shift right to expose the next bit",
        9: "Return total count of 1-bits",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { n: 11 },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "count = 0",
              explanation: "Initialize count to 0. n = 11 in binary is 1011, which has three 1-bits.",
              variables: { n: 11, binary: "1011", count: 0, i: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5],
              shortLabel: "Bit 0: 1 → count=1",
              explanation: "i=0: n & 1 = 1011 & 0001 = 1. It's a 1-bit! count becomes 1.",
              variables: { n: 11, binary: "1011", "n & 1": 1, count: 1, i: 0 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "bit", index: 0, color: "pointer" }],
                hashMap: { "count": { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7],
              shortLabel: "Shift: n = 5 (101)",
              explanation: "Right-shift n: 1011 >> 1 = 101 (decimal 5). The rightmost bit is gone.",
              variables: { n: 5, binary: "101", count: 1, i: 0 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: { "count": { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5],
              shortLabel: "Bit 1: 1 → count=2",
              explanation: "i=1: n & 1 = 101 & 001 = 1. Another 1-bit! count becomes 2.",
              variables: { n: 5, binary: "101", "n & 1": 1, count: 2, i: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "default", 3: "default" },
                pointers: [{ name: "bit", index: 1, color: "pointer" }],
                hashMap: { "count": { value: 2, isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7, 3, 4],
              shortLabel: "Bit 2: 0 → skip",
              explanation: "Shift: n = 101 >> 1 = 10 (decimal 2). i=2: n & 1 = 10 & 01 = 0. Not a 1-bit, skip.",
              variables: { n: 2, binary: "10", "n & 1": 0, count: 2, i: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "eliminated", 3: "default" },
                pointers: [{ name: "bit", index: 2, color: "pointer" }],
                hashMap: { "count": { value: 2 } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 3, 4, 5],
              shortLabel: "Bit 3: 1 → count=3",
              explanation: "Shift: n = 10 >> 1 = 1. i=3: n & 1 = 1. Third 1-bit found! count becomes 3.",
              variables: { n: 1, binary: "1", "n & 1": 1, count: 3, i: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "eliminated", 3: "found" },
                pointers: [{ name: "bit", index: 3, color: "pointer" }],
                hashMap: { "count": { value: 3, isHighlighted: true } },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9],
              shortLabel: "Return 3",
              explanation: "After checking remaining bits (all 0), return count = 3. Binary 1011 has three 1-bits.",
              variables: { answer: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "eliminated", 3: "found" },
                pointers: [],
                hashMap: { "count": { value: 3, isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const bits = [];
        let temp = n;
        while (temp > 0) { bits.push(temp & 1); temp >>= 1; }
        if (bits.length === 0) bits.push(0);
        const bitsToShow = Math.max(bits.length, 4);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "count = 0",
          explanation: `Initialize count to 0. n = ${n} in binary is ${n.toString(2)}.`,
          variables: { n, binary: n.toString(2), count: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: bitsToShow }, (_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        let count = 0;
        let current = n;
        for (let i = 0; i < bitsToShow; i++) {
          const bit = current & 1;
          if (bit === 1) count++;
          steps.push({
            stepId: steps.length, lineNumbers: bit ? [3, 4, 5] : [3, 4],
            shortLabel: `Bit ${i}: ${bit}${bit ? ` → count=${count}` : ' → skip'}`,
            explanation: `i=${i}: n & 1 = ${bit}. ${bit ? `It's a 1-bit! count = ${count}.` : 'Not a 1-bit, skip.'}`,
            variables: { n: current, binary: current.toString(2), "n & 1": bit, count, i },
            dataStructure: {
              arrayStates: Object.fromEntries(Array.from({ length: bitsToShow }, (_, j) => {
                if (j < i) return [j, bits[j] === 1 ? "found" : "eliminated"];
                if (j === i) return [j, bit === 1 ? "found" : "eliminated"];
                return [j, "default"];
              })),
              pointers: [{ name: "bit", index: i, color: "pointer" }],
              hashMap: { "count": { value: count, isHighlighted: bit === 1 } },
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
          current >>= 1;
        }

        steps.push({
          stepId: steps.length, lineNumbers: [9],
          shortLabel: `Return ${count}`,
          explanation: `Return count = ${count}. Binary ${n.toString(2)} has ${count} set bits.`,
          variables: { answer: count },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: bitsToShow }, (_, j) => [j, bits[j] === 1 ? "found" : "eliminated"])),
            pointers: [],
            hashMap: { "count": { value: count, isHighlighted: true } },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Brian Kernighan's Trick: n & (n-1)",
      tier: "optimal",
      timeComplexity: "O(k) where k = number of set bits",
      spaceComplexity: "O(1)",
      idea: `n & (n-1) clears the lowest set bit. Repeat until n = 0, counting iterations.
        Runs in O(k) where k is the number of 1-bits, not O(32).`,

      javaCode: `public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}`,

      cppCode: `int hammingWeight(uint32_t n) {
    int count = 0;
    while (n != 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}`,

      pythonCode: `def hammingWeight(n: int) -> int:
    count = 0
    while n:
        n = n & (n - 1)
        count += 1
    return count`,

      lineAnnotations: {
        2: "Initialize counter for set bits",
        3: "Loop until all bits are cleared",
        4: "Clear the lowest set bit — this is the key trick",
        5: "Each iteration removes exactly one 1-bit",
        7: "count equals the number of 1-bits",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "n=11 (1011) — three set bits",
          input: { n: 11 },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "count = 0",
              explanation: "Initialize count to 0. n = 11 = 1011 in binary. We expect 3 set bits.",
              variables: { n: 11, binary: "1011", count: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "active" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5],
              shortLabel: "1011 & 1010 = 1010, count=1",
              explanation: "n=1011, n-1=1010. n & (n-1) = 1011 & 1010 = 1010. The rightmost 1-bit (position 0) is cleared! count = 1.",
              variables: { n: 10, "n (before)": "1011", "n-1": "1010", "n & (n-1)": "1010", count: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "active" },
                pointers: [],
                hashMap: { "count": { value: 1, isNew: true }, "cleared bit": { value: "pos 0", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5],
              shortLabel: "1010 & 1001 = 1000, count=2",
              explanation: "n=1010, n-1=1001. n & (n-1) = 1010 & 1001 = 1000. Position 1's bit cleared! count = 2.",
              variables: { n: 8, "n (before)": "1010", "n-1": "1001", "n & (n-1)": "1000", count: 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default", 3: "active" },
                pointers: [],
                hashMap: { "count": { value: 2, isHighlighted: true }, "cleared bit": { value: "pos 1", isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5],
              shortLabel: "1000 & 0111 = 0000, count=3",
              explanation: "n=1000, n-1=0111. n & (n-1) = 1000 & 0111 = 0000. Last 1-bit cleared! n is now 0, loop ends. count = 3.",
              variables: { n: 0, "n (before)": "1000", "n-1": "0111", "n & (n-1)": "0000", count: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated" },
                pointers: [],
                hashMap: { "count": { value: 3, isHighlighted: true }, "cleared bit": { value: "pos 3", isHighlighted: true } },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [7],
              shortLabel: "Return 3",
              explanation: "n = 0, loop done. Return count = 3. Only 3 iterations for 3 set bits — we never wasted time on the 0-bits!",
              variables: { answer: 3 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "eliminated", 3: "found" },
                pointers: [],
                hashMap: { "count": { value: 3, isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Power of 2",
          description: "n=128 (10000000) — single set bit, single iteration",
          input: { n: 128 },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "count = 0",
              explanation: "n = 128 = 10000000. Only one 1-bit — the trick should finish in just one iteration.",
              variables: { n: 128, binary: "10000000", count: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "active" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5],
              shortLabel: "10000000 & 01111111 = 0, count=1",
              explanation: "n=10000000, n-1=01111111. n & (n-1) = 0. The single 1-bit is cleared in one operation! count = 1.",
              variables: { n: 0, "n (before)": "10000000", "n-1": "01111111", "n & (n-1)": "00000000", count: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated" },
                pointers: [],
                hashMap: { "count": { value: 1, isHighlighted: true } },
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7],
              shortLabel: "Return 1",
              explanation: "n = 0, done. Return 1. The brute force approach would have checked all 32 positions — this took just 1 iteration!",
              variables: { answer: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "eliminated", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "found" },
                pointers: [],
                hashMap: { "count": { value: 1, isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        let current = n;
        const binaryStr = n.toString(2);
        const bitLen = binaryStr.length;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "count = 0",
          explanation: `Initialize count to 0. n = ${n} = ${binaryStr} in binary.`,
          variables: { n, binary: binaryStr, count: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: bitLen }, (_, i) => [i, binaryStr[bitLen - 1 - i] === "1" ? "active" : "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        let count = 0;
        while (current !== 0) {
          const prev = current;
          current = current & (current - 1);
          count++;

          const newBin = current.toString(2).padStart(bitLen, "0");
          steps.push({
            stepId: steps.length, lineNumbers: [3, 4, 5],
            shortLabel: `${prev.toString(2)} & ${(prev - 1).toString(2)} = ${current.toString(2) || "0"}, count=${count}`,
            explanation: `n=${prev.toString(2)}, n-1=${(prev - 1).toString(2)}. n & (n-1) = ${current.toString(2) || "0"}. One 1-bit cleared. count = ${count}.`,
            variables: { n: current, "n (before)": prev.toString(2), "n-1": (prev - 1).toString(2), count },
            dataStructure: {
              arrayStates: Object.fromEntries(Array.from({ length: bitLen }, (_, i) => [i, newBin[bitLen - 1 - i] === "1" ? "active" : "eliminated"])),
              pointers: [],
              hashMap: { "count": { value: count, isHighlighted: true } },
            },
            delta: {}, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [7],
          shortLabel: `Return ${count}`,
          explanation: `n = 0, loop done. Return count = ${count}. Only ${count} iterations needed.`,
          variables: { answer: count },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: bitLen }, (_, i) => [i, binaryStr[bitLen - 1 - i] === "1" ? "found" : "eliminated"])),
            pointers: [],
            hashMap: { "count": { value: count, isHighlighted: true } },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(32)", space: "O(1)", explanation: "Always checks all 32 bit positions" },
    optimal: { time: "O(k)", space: "O(1)", explanation: "k = number of set bits. Each n & (n-1) clears one bit.", tradeoff: "Same space, but optimal skips 0-bits entirely" },
  },

  interviewTips: [
    "Mention Brian Kernighan's algorithm by name — shows you know the classics.",
    "Explain WHY n & (n-1) clears the lowest set bit using a concrete binary example.",
    "Point out the efficiency difference: for n=2^30, brute checks 32 bits, optimal checks just 1.",
    "This is a building block for many bit problems — recognizing it earns credibility.",
    "Mention that Java's Integer.bitCount() and Python's bin(n).count('1') exist as built-ins.",
  ],

  relatedProblems: ["counting-bits", "reverse-bits", "single-number"],
};
