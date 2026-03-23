export const reverseInteger = {
  id: 149,
  slug: "reverse-integer",
  title: "Reverse Integer",
  difficulty: "Medium",
  topic: "bit-manipulation",
  topicLabel: "Bit Manipulation",
  neetcodeNumber: 149,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Apple", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/reverse-integer/",

  pattern: "Digit Extraction with Overflow Check",
  patternExplanation: `Extract digits from the end using modulo 10, build the reversed number by
    multiplying result by 10 and adding the extracted digit. Check for 32-bit integer overflow
    before each multiplication to avoid undefined behavior.`,

  intuition: {
    coreInsight: `To reverse a number's digits, repeatedly extract the last digit with x % 10 and
      remove it with x / 10 (integer division). Build the result by shifting it left (multiply by 10)
      and adding the extracted digit. The key challenge is not the reversal itself — it's detecting
      overflow before it happens, since the reversed number might exceed 32-bit integer bounds.`,

    mentalModel: `Imagine a row of numbered blocks. To reverse them, pick up the rightmost block
      (x % 10), place it at the end of a new row (result * 10 + digit). Remove the block from the
      original row (x / 10). Repeat until the original row is empty. But your new row has a maximum
      capacity (2^31 - 1) — you must check before placing each block that you won't overflow.`,

    whyNaiveFails: `Converting to a string, reversing, and converting back works in languages with
      arbitrary precision, but in Java/C++ you'd overflow during parsing. Even with direct math,
      if you skip the overflow check, reversing 1534236469 silently wraps around to a garbage value.
      The overflow check is the core difficulty of this problem.`,

    keyObservation: `The overflow check must happen BEFORE the multiplication: if result > INT_MAX/10
      or (result == INT_MAX/10 and digit > 7), the next step would overflow. Similarly for negative:
      if result < INT_MIN/10 or (result == INT_MIN/10 and digit < -8). This pre-check is what
      interviewers want to see.`,
  },

  problem: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x
    causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
    Assume the environment does not allow you to store 64-bit integers.`,

  examples: [
    { input: "x = 123", output: "321", explanation: "Reverse digits of 123 to get 321." },
    { input: "x = -123", output: "-321", explanation: "Reverse digits; sign is preserved." },
    { input: "x = 120", output: "21", explanation: "Trailing zero in input becomes leading zero, which is dropped." },
  ],

  constraints: [
    "-2^31 <= x <= 2^31 - 1",
  ],

  approaches: {
    brute: {
      label: "String Reversal",
      tier: "brute",
      timeComplexity: "O(log x)",
      spaceComplexity: "O(log x)",
      idea: "Convert to string, reverse, convert back. Check bounds after conversion.",

      javaCode: `public int reverse(int x) {
    String s = String.valueOf(Math.abs(x));
    String reversed = new StringBuilder(s).reverse().toString();
    try {
        int result = Integer.parseInt(reversed);
        return x < 0 ? -result : result;
    } catch (NumberFormatException e) {
        return 0;
    }
}`,

      cppCode: `int reverse(int x) {
    string s = to_string(abs(x));
    std::reverse(s.begin(), s.end());
    long result = stol(s);
    if (result > INT_MAX) return 0;
    return x < 0 ? -(int)result : (int)result;
}`,

      pythonCode: `def reverse(x: int) -> int:
    sign = -1 if x < 0 else 1
    s = str(abs(x))[::-1]
    result = sign * int(s)
    if result < -(2**31) or result > 2**31 - 1:
        return 0
    return result`,

      lineAnnotations: {
        2: "Convert absolute value to string",
        3: "Reverse the string",
        4: "Parse back to integer — may overflow",
        5: "Restore original sign",
        6: "Return 0 if overflow occurred",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { x: 123 },
          expectedOutput: "321",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "\"123\"",
              explanation: "Convert x=123 to string: \"123\".",
              variables: { x: 123, s: "123" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: { "string": { value: "123", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3],
              shortLabel: "Reverse → \"321\"",
              explanation: "Reverse the string: \"123\" → \"321\".",
              variables: { reversed: "321" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active" },
                pointers: [],
                hashMap: { "reversed": { value: "321", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5],
              shortLabel: "Parse → 321",
              explanation: "Parse \"321\" to integer: 321. Within 32-bit range. x was positive, so return 321.",
              variables: { result: 321, answer: 321 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { "result": { value: "321", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ x }) {
        const steps = [];
        const sign = x < 0 ? -1 : 1;
        const s = String(Math.abs(x));
        const rev = s.split('').reverse().join('');
        const result = sign * parseInt(rev);
        const overflow = result < -(2**31) || result > 2**31 - 1;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `"${s}"`,
          explanation: `Convert x=${x} to string: "${s}".`,
          variables: { x, s },
          dataStructure: { arrayStates: { 0: "default" }, pointers: [], hashMap: { "string": { value: s, isNew: true } } },
          delta: {}, isAnswer: false,
        });

        steps.push({
          stepId: 1, lineNumbers: [3],
          shortLabel: `Reverse → "${rev}"`,
          explanation: `Reverse: "${s}" → "${rev}".`,
          variables: { reversed: rev },
          dataStructure: { arrayStates: { 0: "active" }, pointers: [], hashMap: { "reversed": { value: rev, isNew: true } } },
          delta: {}, isAnswer: false,
        });

        steps.push({
          stepId: 2, lineNumbers: [4, 5],
          shortLabel: overflow ? "Overflow → 0" : `Parse → ${result}`,
          explanation: overflow ? `Parsing "${rev}" gives ${Math.abs(parseInt(rev))}, which overflows 32-bit range. Return 0.` : `Parse "${rev}" → ${Math.abs(parseInt(rev))}. ${sign < 0 ? 'Restore negative sign. ' : ''}Result = ${result}.`,
          variables: { answer: overflow ? 0 : result },
          dataStructure: { arrayStates: { 0: "found" }, pointers: [], hashMap: { "result": { value: String(overflow ? 0 : result), isHighlighted: true } } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Math with Overflow Check",
      tier: "optimal",
      timeComplexity: "O(log x)",
      spaceComplexity: "O(1)",
      idea: `Extract digits from the end with x % 10, build result with result * 10 + digit.
        Before each multiplication, check if result would overflow 32-bit signed integer bounds.`,

      javaCode: `public int reverse(int x) {
    int result = 0;
    while (x != 0) {
        int digit = x % 10;
        x /= 10;
        if (result > Integer.MAX_VALUE / 10 ||
            (result == Integer.MAX_VALUE / 10 && digit > 7))
            return 0;
        if (result < Integer.MIN_VALUE / 10 ||
            (result == Integer.MIN_VALUE / 10 && digit < -8))
            return 0;
        result = result * 10 + digit;
    }
    return result;
}`,

      cppCode: `int reverse(int x) {
    int result = 0;
    while (x != 0) {
        int digit = x % 10;
        x /= 10;
        if (result > INT_MAX / 10 ||
            (result == INT_MAX / 10 && digit > 7))
            return 0;
        if (result < INT_MIN / 10 ||
            (result == INT_MIN / 10 && digit < -8))
            return 0;
        result = result * 10 + digit;
    }
    return result;
}`,

      pythonCode: `def reverse(x: int) -> int:
    INT_MAX, INT_MIN = 2**31 - 1, -(2**31)
    result = 0
    sign = -1 if x < 0 else 1
    x = abs(x)
    while x != 0:
        digit = x % 10
        x //= 10
        if result > INT_MAX // 10:
            return 0
        result = result * 10 + digit
    result *= sign
    if result < INT_MIN or result > INT_MAX:
        return 0
    return result`,

      lineAnnotations: {
        2: "Result accumulator — builds reversed number",
        3: "Process digits until x is fully consumed",
        4: "Extract the last digit (handles negatives too in Java/C++)",
        5: "Remove the last digit from x",
        6: "Overflow check: would result*10 exceed MAX_VALUE?",
        7: "Edge case: result*10 equals MAX boundary, check last digit",
        9: "Underflow check for negative numbers",
        11: "Safe to proceed — append digit to result",
        13: "All digits processed — return reversed number",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "x = 123 → 321",
          input: { x: 123 },
          expectedOutput: "321",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0",
              explanation: "Initialize result to 0. We'll extract digits from x=123 right-to-left and build the reversed number.",
              variables: { x: 123, result: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: { "x": { value: "123", isNew: true }, "result": { value: "0", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5],
              shortLabel: "digit=3, x=12",
              explanation: "digit = 123 % 10 = 3. x = 123 / 10 = 12. We've extracted the last digit.",
              variables: { digit: 3, x: 12, result: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active" },
                pointers: [{ name: "digit", index: 2, color: "pointer" }],
                hashMap: { "x": { value: "12", isHighlighted: true }, "digit": { value: "3", isNew: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 11],
              shortLabel: "result = 0*10+3 = 3",
              explanation: "Overflow check: result=0 < MAX/10=214748364. Safe. result = 0 * 10 + 3 = 3.",
              variables: { result: 3, "overflow?": "No (0 < 214748364)" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "visited" },
                pointers: [],
                hashMap: { "result": { value: "3", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5],
              shortLabel: "digit=2, x=1",
              explanation: "digit = 12 % 10 = 2. x = 12 / 10 = 1.",
              variables: { digit: 2, x: 1, result: 3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "visited" },
                pointers: [{ name: "digit", index: 1, color: "pointer" }],
                hashMap: { "x": { value: "1", isHighlighted: true }, "digit": { value: "2", isNew: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 11],
              shortLabel: "result = 3*10+2 = 32",
              explanation: "Overflow check: result=3 < 214748364. Safe. result = 3 * 10 + 2 = 32.",
              variables: { result: 32, "overflow?": "No (3 < 214748364)" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "visited", 2: "visited" },
                pointers: [],
                hashMap: { "result": { value: "32", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [3, 4, 5],
              shortLabel: "digit=1, x=0",
              explanation: "digit = 1 % 10 = 1. x = 1 / 10 = 0. Last digit extracted.",
              variables: { digit: 1, x: 0, result: 32 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "visited" },
                pointers: [{ name: "digit", index: 0, color: "pointer" }],
                hashMap: { "x": { value: "0 — done", isHighlighted: true }, "digit": { value: "1", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 11],
              shortLabel: "result = 32*10+1 = 321",
              explanation: "Overflow check: result=32 < 214748364. Safe. result = 32 * 10 + 1 = 321.",
              variables: { result: 321 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [],
                hashMap: { "result": { value: "321", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [3, 13],
              shortLabel: "x=0 → Return 321",
              explanation: "x = 0, loop ends. Return result = 321. Reversed 123 → 321 with overflow safety.",
              variables: { answer: 321 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { "result": { value: "321", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Negative",
          description: "x = -123 → -321",
          input: { x: -123 },
          expectedOutput: "-321",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0, x = -123",
              explanation: "x = -123. The modulo operator in Java/C++ preserves sign: -123 % 10 = -3. So negative numbers work naturally.",
              variables: { x: -123, result: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: { "x": { value: "-123", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 11],
              shortLabel: "digit=-3, result=-3",
              explanation: "digit = -123 % 10 = -3. x = -123 / 10 = -12. result = 0 * 10 + (-3) = -3. The sign propagates naturally.",
              variables: { digit: -3, x: -12, result: -3 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active" },
                pointers: [{ name: "digit", index: 2, color: "pointer" }],
                hashMap: { "x": { value: "-12" }, "result": { value: "-3", isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5, 11],
              shortLabel: "digit=-2, result=-32",
              explanation: "digit = -12 % 10 = -2. x = -1. result = -3 * 10 + (-2) = -32.",
              variables: { digit: -2, x: -1, result: -32 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "visited" },
                pointers: [{ name: "digit", index: 1, color: "pointer" }],
                hashMap: { "x": { value: "-1" }, "result": { value: "-32", isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5, 11],
              shortLabel: "digit=-1, result=-321",
              explanation: "digit = -1 % 10 = -1. x = 0. result = -32 * 10 + (-1) = -321.",
              variables: { digit: -1, x: 0, result: -321 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "visited" },
                pointers: [{ name: "digit", index: 0, color: "pointer" }],
                hashMap: { "x": { value: "0" }, "result": { value: "-321", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13],
              shortLabel: "Return -321",
              explanation: "x = 0. Return -321. The sign was preserved throughout — no special handling needed.",
              variables: { answer: -321 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { "result": { value: "-321", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Overflow",
          description: "x = 1534236469 — reversal overflows 32-bit",
          input: { x: 1534236469 },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0",
              explanation: "x = 1534236469. Reversed digits would be 9646324351, which exceeds 2^31 - 1 = 2147483647. We need to catch this overflow.",
              variables: { x: 1534236469, result: 0, "INT_MAX": 2147483647 },
              dataStructure: {
                arrayStates: { 0: "default" },
                pointers: [],
                hashMap: { "x": { value: "1534236469", isNew: true }, "INT_MAX": { value: "2147483647", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 11],
              shortLabel: "Digits: 9,6,4,6,3,2,4...",
              explanation: "Extract digits one by one: 9, 6, 4, 6, 3, 2, 4. After 7 digits, result = 9646324. Still safe (< 214748364).",
              variables: { result: 9646324, x: 153, "MAX/10": 214748364 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [],
                hashMap: { "result": { value: "9646324", isHighlighted: true }, "MAX/10": { value: "214748364" } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5, 11],
              shortLabel: "digit=3, result=96463243",
              explanation: "Extract 3. result = 9646324 * 10 + 3 = 96463243. Still < 214748364. Safe.",
              variables: { digit: 3, result: 96463243, x: 15 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [],
                hashMap: { "result": { value: "96463243", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5, 11],
              shortLabel: "digit=5, result=964632435",
              explanation: "Extract 5. result = 96463243 * 10 + 5 = 964632435. Still < 2147483647. Safe.",
              variables: { digit: 5, result: 964632435, x: 1 },
              dataStructure: {
                arrayStates: { 0: "active" },
                pointers: [],
                hashMap: { "result": { value: "964632435", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 4, 5, 6, 7],
              shortLabel: "digit=1: 964632435 > MAX/10 → OVERFLOW!",
              explanation: "Extract 1. Before computing result * 10 + 1: check overflow. result = 964632435 > INT_MAX/10 = 214748364. Overflow would occur! Return 0.",
              variables: { digit: 1, result: 964632435, "MAX/10": 214748364, "overflow": true },
              dataStructure: {
                arrayStates: { 0: "eliminated" },
                pointers: [],
                hashMap: { "result": { value: "964632435 > 214748364", isHighlighted: true }, "overflow!": { value: "Return 0", isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [8],
              shortLabel: "Return 0",
              explanation: "Overflow detected. Return 0. The reversed number 9646324351 exceeds the 32-bit signed integer maximum of 2147483647.",
              variables: { answer: 0 },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                hashMap: { "result": { value: "0 (overflow)", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase3: {
          id: "edgeCase3",
          label: "Trailing Zeros",
          description: "x = 120 — trailing zero becomes leading zero",
          input: { x: 120 },
          expectedOutput: "21",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "result = 0, x = 120",
              explanation: "x = 120. The trailing 0 will be extracted first but adds nothing (0 * 10 + 0 = 0).",
              variables: { x: 120, result: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: { "x": { value: "120", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4, 5, 11],
              shortLabel: "digit=0, result=0",
              explanation: "digit = 120 % 10 = 0. x = 12. result = 0 * 10 + 0 = 0. The trailing zero vanishes — leading zeros don't exist in integers.",
              variables: { digit: 0, x: 12, result: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active" },
                pointers: [{ name: "digit", index: 2, color: "pointer" }],
                hashMap: { "result": { value: "0 (leading zero dropped)", isHighlighted: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5, 11],
              shortLabel: "digit=2, result=2",
              explanation: "digit = 12 % 10 = 2. x = 1. result = 0 * 10 + 2 = 2.",
              variables: { digit: 2, x: 1, result: 2 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "visited" },
                pointers: [{ name: "digit", index: 1, color: "pointer" }],
                hashMap: { "result": { value: "2", isHighlighted: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5, 11],
              shortLabel: "digit=1, result=21",
              explanation: "digit = 1 % 10 = 1. x = 0. result = 2 * 10 + 1 = 21.",
              variables: { digit: 1, x: 0, result: 21 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "visited" },
                pointers: [{ name: "digit", index: 0, color: "pointer" }],
                hashMap: { "result": { value: "21", isHighlighted: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13],
              shortLabel: "Return 21",
              explanation: "x = 0. Return 21. The trailing zero in 120 naturally disappeared — no special handling needed.",
              variables: { answer: 21 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { "result": { value: "21", isHighlighted: true } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ x }) {
        const steps = [];
        const INT_MAX = 2147483647;
        const INT_MIN = -2147483648;
        let result = 0;
        let remaining = x;
        const digits = String(Math.abs(x)).split('');

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `result = 0, x = ${x}`,
          explanation: `Initialize result to 0. x = ${x}. We'll extract digits right-to-left.`,
          variables: { x, result: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(digits.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: { "x": { value: String(x), isNew: true }, "result": { value: "0", isNew: true } },
          },
          delta: {}, isAnswer: false,
        });

        let digitIdx = digits.length - 1;
        while (remaining !== 0) {
          const digit = remaining % 10;
          remaining = Math.trunc(remaining / 10);

          // Overflow check
          if (result > Math.trunc(INT_MAX / 10) || (result === Math.trunc(INT_MAX / 10) && digit > 7)) {
            steps.push({
              stepId: steps.length, lineNumbers: [6, 7],
              shortLabel: `Overflow! Return 0`,
              explanation: `result = ${result} > INT_MAX/10 = ${Math.trunc(INT_MAX / 10)}, or boundary digit > 7. Overflow! Return 0.`,
              variables: { result, digit, "overflow": true, answer: 0 },
              dataStructure: { arrayStates: { 0: "eliminated" }, pointers: [], hashMap: { "overflow": { value: "Return 0", isHighlighted: true } } },
              delta: {}, isAnswer: true,
            });
            return steps;
          }
          if (result < Math.trunc(INT_MIN / 10) || (result === Math.trunc(INT_MIN / 10) && digit < -8)) {
            steps.push({
              stepId: steps.length, lineNumbers: [9, 10],
              shortLabel: `Underflow! Return 0`,
              explanation: `result = ${result} < INT_MIN/10. Underflow! Return 0.`,
              variables: { result, digit, "underflow": true, answer: 0 },
              dataStructure: { arrayStates: { 0: "eliminated" }, pointers: [], hashMap: { "underflow": { value: "Return 0", isHighlighted: true } } },
              delta: {}, isAnswer: true,
            });
            return steps;
          }

          result = result * 10 + digit;

          steps.push({
            stepId: steps.length, lineNumbers: [3, 4, 5, 11],
            shortLabel: `digit=${digit}, result=${result}`,
            explanation: `digit = ${digit}. x = ${remaining}. result = ${result}.`,
            variables: { digit, x: remaining, result },
            dataStructure: {
              arrayStates: Object.fromEntries(digits.map((_, i) => [i, i > digitIdx ? "visited" : i === digitIdx ? "active" : "default"])),
              pointers: digitIdx >= 0 ? [{ name: "digit", index: digitIdx, color: "pointer" }] : [],
              hashMap: { "result": { value: String(result), isHighlighted: true } },
            },
            delta: { changedIndices: [digitIdx] }, isAnswer: false,
          });

          digitIdx--;
        }

        steps.push({
          stepId: steps.length, lineNumbers: [13],
          shortLabel: `Return ${result}`,
          explanation: `x = 0, loop ends. Return ${result}.`,
          variables: { answer: result },
          dataStructure: {
            arrayStates: Object.fromEntries(digits.map((_, i) => [i, "found"])),
            pointers: [],
            hashMap: { "result": { value: String(result), isHighlighted: true } },
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(log x)", space: "O(log x)", explanation: "String has log10(x) characters" },
    optimal: { time: "O(log x)", space: "O(1)", explanation: "Process each digit once — log10(x) digits total, constant space", tradeoff: "Math approach avoids string allocation and handles overflow in-place" },
  },

  interviewTips: [
    "Start by explaining the digit extraction loop: x % 10 gets last digit, x / 10 removes it.",
    "The interviewer cares most about the overflow check — explain it clearly before writing code.",
    "INT_MAX / 10 = 214748364. If result > that, multiplying by 10 overflows. If equal, check the digit > 7.",
    "For negative numbers, Java/C++ modulo preserves sign (-123 % 10 = -3), so no special handling needed.",
    "Mention that trailing zeros in input become leading zeros in output, which vanish naturally.",
  ],

  relatedProblems: ["reverse-bits", "sum-of-two-integers", "single-number"],
};
