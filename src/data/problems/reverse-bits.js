export const reverseBits = {
  id: 146,
  slug: "reverse-bits",
  title: "Reverse Bits",
  difficulty: "Easy",
  topic: "bit-manipulation",
  topicLabel: "Bit Manipulation",
  neetcodeNumber: 146,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Apple", "Microsoft", "Samsung"],
  leetcodeLink: "https://leetcode.com/problems/reverse-bits/",

  pattern: "Bit-by-Bit Construction",
  patternExplanation: `Extract bits from the input one at a time (from LSB) and place them into
    the result in reverse order. Shift the result left and the input right on each iteration
    to build the reversed 32-bit number.`,

  intuition: {
    coreInsight: `To reverse the bits of a 32-bit integer, extract the least significant bit of the
      input and make it the most significant bit of the result, then the second-least becomes the
      second-most, and so on. In each of 32 iterations: shift result left by 1, OR in the LSB of
      the input, then shift the input right by 1.`,

    mentalModel: `Imagine a row of 32 coins showing heads (1) or tails (0). You want to reverse
      their order. Pick up the rightmost coin, place it at the left end of a new row. Pick up
      the next rightmost, place it next in the new row. After 32 picks, the new row is the
      original in reverse. That's exactly what we do with bits: pop from the right, push to the left.`,

    whyNaiveFails: `Converting to a string, reversing, and converting back works but is unnecessarily
      slow and wasteful — string operations, memory allocations, and base conversions. Bit manipulation
      does it in-place with 32 constant-time operations, no extra memory beyond one integer.`,

    keyObservation: `The operation is always exactly 32 iterations — no early termination even if the
      input is 0. We must process all 32 bits to correctly place the reversed bits in their positions.
      A common mistake is stopping when the input becomes 0, which would miss leading zeros that
      become trailing zeros in the result.`,
  },

  problem: `Reverse bits of a given 32 bits unsigned integer.`,

  examples: [
    { input: "n = 00000010100101000001111010011100", output: "00111001011110000010100101000000 (964176192)", explanation: "The input binary string represents 43261596 in decimal." },
    { input: "n = 11111111111111111111111111111101", output: "10111111111111111111111111111111 (3221225471)", explanation: "The input represents 4294967293, output is 3221225471." },
  ],

  constraints: [
    "The input must be a binary string of length 32.",
  ],

  approaches: {
    brute: {
      label: "String Reverse",
      tier: "brute",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      idea: "Convert to 32-bit binary string, reverse it, parse back to integer. Constant time for fixed 32 bits.",

      javaCode: `public int reverseBits(int n) {
    String binary = String.format("%32s",
        Integer.toBinaryString(n)).replace(' ', '0');
    String reversed = new StringBuilder(binary).reverse().toString();
    return (int) Long.parseLong(reversed, 2);
}`,

      cppCode: `uint32_t reverseBits(uint32_t n) {
    string binary = bitset<32>(n).to_string();
    reverse(binary.begin(), binary.end());
    return bitset<32>(binary).to_ulong();
}`,

      pythonCode: `def reverseBits(n: int) -> int:
    binary = format(n, '032b')
    reversed_bin = binary[::-1]
    return int(reversed_bin, 2)`,

      lineAnnotations: {
        2: "Convert integer to 32-bit binary string with leading zeros",
        3: "Reverse the string",
        4: "Parse reversed binary string back to integer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { n: 13 },
          expectedOutput: "2952790016",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Convert to binary",
              explanation: "n = 13. Binary (32-bit): 00000000000000000000000000001101.",
              variables: { n: 13, binary: "00000000000000000000000000001101" },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [],
                hashMap: { "input": { value: "13 = ...00001101", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3],
              shortLabel: "Reverse string",
              explanation: "Reverse the 32-character string: 10110000000000000000000000000000.",
              variables: { reversed: "10110000000000000000000000000000" },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [],
                hashMap: { "reversed": { value: "10110000...0", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4],
              shortLabel: "Parse → 2952790016",
              explanation: "Parse the reversed binary string back to integer: 2952790016. The leading 1s in the original (which were trailing) now sit at the most significant positions.",
              variables: { answer: 2952790016 },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                hashMap: { "result": { value: "2952790016", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const binary = (n >>> 0).toString(2).padStart(32, '0');
        const reversed = binary.split('').reverse().join('');
        const result = parseInt(reversed, 2);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Convert to binary",
          explanation: `n = ${n}. Binary (32-bit): ${binary}.`,
          variables: { n, binary },
          dataStructure: { arrayStates: { 0: "active" }, pointers: [], hashMap: { "input": { value: `${n} = ${binary}`, isNew: true } } },
          delta: {}, isAnswer: false,
        });

        steps.push({
          stepId: 1, lineNumbers: [3],
          shortLabel: "Reverse string",
          explanation: `Reverse the 32-character string: ${reversed}.`,
          variables: { reversed },
          dataStructure: { arrayStates: { 0: "active" }, pointers: [], hashMap: { "reversed": { value: reversed, isNew: true } } },
          delta: {}, isAnswer: false,
        });

        steps.push({
          stepId: 2, lineNumbers: [4],
          shortLabel: `Parse → ${result}`,
          explanation: `Parse reversed binary back to integer: ${result}.`,
          variables: { answer: result },
          dataStructure: { arrayStates: { 0: "found" }, pointers: [], hashMap: { "result": { value: String(result), isHighlighted: true } } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Bit-by-Bit Shift",
      tier: "optimal",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      idea: `Iterate 32 times. Each iteration: shift result left by 1, OR in the LSB of n,
        then shift n right by 1. After 32 iterations, all bits are reversed.`,

      javaCode: `public int reverseBits(int n) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
        result <<= 1;
        result |= (n & 1);
        n >>= 1;
    }
    return result;
}`,

      cppCode: `uint32_t reverseBits(uint32_t n) {
    uint32_t result = 0;
    for (int i = 0; i < 32; i++) {
        result <<= 1;
        result |= (n & 1);
        n >>= 1;
    }
    return result;
}`,

      pythonCode: `def reverseBits(n: int) -> int:
    result = 0
    for i in range(32):
        result <<= 1
        result |= (n & 1)
        n >>= 1
    return result`,

      lineAnnotations: {
        2: "Initialize result to 0 — we'll build it bit by bit",
        3: "Exactly 32 iterations — one for each bit position",
        4: "Shift result left to make room for the next bit",
        5: "Extract LSB of n and place it into result's LSB",
        6: "Shift n right to expose the next bit",
        8: "All 32 bits reversed — return result",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard (n=13)",
          description: "13 = ...00001101 → reversed",
          input: { n: 13 },
          expectedOutput: "2952790016",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0",
              explanation: "Initialize result to 0. We'll extract bits from n=13 (binary: ...00001101) one at a time from the right and build the reversed number from the left.",
              variables: { n: "13 (1101)", result: "0 (0)", i: "-" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: { "n bits": { value: "1101", isNew: true }, "result bits": { value: "0", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=0: extract 1",
              explanation: "i=0. n&1 = 1 (LSB of 1101 is 1). result <<= 1 → 0, then result |= 1 → 1. n >>= 1 → 110 (6). We've placed the old LSB as the first bit of result.",
              variables: { i: 0, "n&1": 1, result: "1 (1)", n: "6 (110)" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "bit", index: 0, color: "pointer" }],
                hashMap: { "n bits": { value: "110", isHighlighted: true }, "result bits": { value: "1", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=1: extract 0",
              explanation: "i=1. n&1 = 0 (LSB of 110 is 0). result <<= 1 → 10, result |= 0 → 10 (2). n >>= 1 → 11 (3). A zero bit was placed.",
              variables: { i: 1, "n&1": 0, result: "2 (10)", n: "3 (11)" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "bit", index: 1, color: "pointer" }],
                hashMap: { "n bits": { value: "11", isHighlighted: true }, "result bits": { value: "10", isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=2: extract 1",
              explanation: "i=2. n&1 = 1 (LSB of 11 is 1). result <<= 1 → 100, result |= 1 → 101 (5). n >>= 1 → 1. Third bit extracted.",
              variables: { i: 2, "n&1": 1, result: "5 (101)", n: "1 (1)" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default" },
                pointers: [{ name: "bit", index: 2, color: "pointer" }],
                hashMap: { "n bits": { value: "1", isHighlighted: true }, "result bits": { value: "101", isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=3: extract 1",
              explanation: "i=3. n&1 = 1 (LSB of 1 is 1). result <<= 1 → 1010, result |= 1 → 1011 (11). n >>= 1 → 0. All significant bits extracted. Remaining 28 iterations will add zeros.",
              variables: { i: 3, "n&1": 1, result: "11 (1011)", n: "0 (0)" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active" },
                pointers: [{ name: "bit", index: 3, color: "pointer" }],
                hashMap: { "n bits": { value: "0", isHighlighted: true }, "result bits": { value: "1011", isHighlighted: true } },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=4..31: append 28 zeros",
              explanation: "For iterations 4 through 31, n is 0, so n&1 = 0 each time. Result shifts left 28 more times, appending 28 zeros. Final result = 1011 followed by 28 zeros = 10110000...0.",
              variables: { i: "4-31", result: "2952790016", "result binary": "10110000000000000000000000000000" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited" },
                pointers: [],
                hashMap: { "result bits": { value: "10110000...0 (32 bits)", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [8],
              shortLabel: "Return 2952790016",
              explanation: "All 32 bits reversed. 13 (00...001101) → 2952790016 (10110000...0). The four significant bits 1101 became 1011, now sitting at the most significant positions.",
              variables: { answer: 2952790016 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
                hashMap: { "result": { value: "2952790016", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Zeros",
          description: "n=0 — reversing all zeros gives all zeros",
          input: { n: 0 },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0",
              explanation: "n=0. All 32 bits are 0. Reversing zeros gives zeros — but we still must iterate 32 times.",
              variables: { n: 0, result: 0 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                hashMap: { "n": { value: "0 (all zeros)", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "32 iterations: all 0s",
              explanation: "Every iteration extracts n&1 = 0. Result stays 0 through all 32 shifts. No bits to reverse.",
              variables: { i: "0-31", "n&1": 0, result: 0 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [],
                hashMap: { "result": { value: "0", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8],
              shortLabel: "Return 0",
              explanation: "Reversed 0 is still 0. This confirms the algorithm handles the edge case correctly — it doesn't skip any iterations.",
              variables: { answer: 0 },
              dataStructure: {
                arrayStates: { 0: "found" },
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
          label: "Single Bit",
          description: "n=1 — only bit 0 is set, should move to bit 31",
          input: { n: 1 },
          expectedOutput: "2147483648",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0",
              explanation: "n=1 (binary: 000...001). After reversal, the single 1-bit should be at position 31 (MSB).",
              variables: { n: 1, result: 0 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                hashMap: { "n": { value: "1 = 000...001", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=0: extract 1",
              explanation: "First iteration: n&1 = 1. result = 1. n >>= 1 → 0. The single bit is captured.",
              variables: { i: 0, "n&1": 1, result: 1, n: 0 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "bit", index: 0, color: "pointer" }],
                hashMap: { "result": { value: "1", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5, 6],
              shortLabel: "i=1..31: shift left 31x",
              explanation: "Iterations 1-31: n is 0, so n&1=0 every time. Result shifts left 31 times, moving the 1-bit from position 0 to position 31. Result = 2^31 = 2147483648.",
              variables: { result: 2147483648, "result binary": "10000000000000000000000000000000" },
              dataStructure: {
                arrayStates: { 0: "visited" },
                pointers: [],
                hashMap: { "result": { value: "2^31 = 2147483648", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8],
              shortLabel: "Return 2147483648",
              explanation: "The single set bit moved from position 0 to position 31. 1 → 2147483648 (10000...0).",
              variables: { answer: 2147483648 },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                hashMap: { "result": { value: "2147483648", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        let result = 0;
        let remaining = n >>> 0;
        const inputBinary = (n >>> 0).toString(2).padStart(32, '0');

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "result = 0",
          explanation: `Initialize result to 0. n = ${n >>> 0} (binary: ${inputBinary}).`,
          variables: { n: `${n >>> 0}`, result: 0 },
          dataStructure: {
            arrayStates: { 0: "default" },
            pointers: [], hashMap: { "n bits": { value: inputBinary.slice(-8) + "...", isNew: true } },
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < 32; i++) {
          const bit = remaining & 1;
          result = (result << 1) | bit;
          remaining = remaining >>> 1;

          if (i < 8 || bit === 1 || i === 31) {
            steps.push({
              stepId: steps.length, lineNumbers: [3, 4, 5, 6],
              shortLabel: `i=${i}: extract ${bit}`,
              explanation: `Iteration ${i}: n&1 = ${bit}. result <<= 1, result |= ${bit}. result = ${result >>> 0}. n >>= 1.`,
              variables: { i, "n&1": bit, result: (result >>> 0).toString(), n: (remaining >>> 0).toString() },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [{ name: "bit", index: 0, color: "pointer" }],
                hashMap: {
                  "result bits": { value: (result >>> 0).toString(2), isHighlighted: true },
                },
              },
              delta: {}, isAnswer: false,
            });
          }
        }

        const finalResult = result >>> 0;
        steps.push({
          stepId: steps.length, lineNumbers: [8],
          shortLabel: `Return ${finalResult}`,
          explanation: `All 32 bits reversed. ${n >>> 0} → ${finalResult}.`,
          variables: { answer: finalResult },
          dataStructure: {
            arrayStates: { 0: "found" },
            pointers: [],
            hashMap: { "result": { value: String(finalResult), isHighlighted: true } },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(1)", space: "O(1)", explanation: "Fixed 32-bit input — string operations are constant" },
    optimal: { time: "O(1)", space: "O(1)", explanation: "Exactly 32 iterations with constant work each", tradeoff: "Bit manipulation avoids string allocation and parsing overhead" },
  },

  interviewTips: [
    "Clarify that the input is always a 32-bit unsigned integer — the loop is always exactly 32.",
    "Explain why you can't stop early when n becomes 0: leading zeros in n become trailing zeros in result.",
    "Mention the divide-and-conquer approach that swaps halves recursively for O(1) with fewer operations.",
    "Be careful with signed vs unsigned right shift: use >>> in Java/JS to avoid sign extension.",
    "If asked for follow-up optimization: cache 8-bit reversed chunks and combine (useful if called many times).",
  ],

  relatedProblems: ["number-of-1-bits", "counting-bits", "single-number"],
};
