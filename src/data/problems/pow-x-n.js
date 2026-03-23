export const powXN = {
  id: 140,
  slug: "pow-x-n",
  title: "Pow(x, n)",
  difficulty: "Medium",
  topic: "math-geometry",
  topicLabel: "Math & Geometry",
  neetcodeNumber: 140,
  artifactType: "Matrix",
  companies: ["Meta", "Amazon", "Google", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/powx-n/",

  pattern: "Binary Exponentiation (Fast Power)",
  patternExplanation: `Instead of multiplying x by itself n times (O(n)), we can square the base and halve the exponent each step. x^n = (x^2)^(n/2) when n is even, and x * (x^2)^((n-1)/2) when n is odd. This reduces O(n) multiplications to O(log n).`,

  intuition: {
    coreInsight: `Multiplying x by itself n times is O(n). But notice: x^10 = (x^5)^2, and x^5 = x * (x^2)^2. Each step we halve the exponent, so we only need log(n) multiplications instead of n. This is binary exponentiation — the same idea behind efficient modular arithmetic in cryptography.`,

    mentalModel: `Imagine you need to fold a piece of paper 10 times. Instead of folding once 10 times, you could fold it in half (that's x^2), then fold that result in half again (x^4), then again (x^8) — you've already surpassed 10 folds with just 3 operations. Binary exponentiation does the same: it squares repeatedly and only multiplies by x when the exponent is odd.`,

    whyNaiveFails: `Brute force multiplies x by itself n times in a loop. For n = 2^31, that's over 2 billion multiplications — far too slow. Binary exponentiation handles this in just 31 steps (log2 of 2^31). Also, naive approaches often forget to handle negative exponents correctly.`,

    keyObservation: `When n is negative, compute 1 / pow(x, -n). When n is even, pow(x, n) = pow(x*x, n/2). When n is odd, pow(x, n) = x * pow(x*x, (n-1)/2). The exponent halves each step, giving O(log n) time. Watch out for integer overflow when negating n = -2^31.`,
  },

  problem: `Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).`,

  examples: [
    { input: "x = 2.00000, n = 10", output: "1024.00000", explanation: "2^10 = 1024" },
    { input: "x = 2.10000, n = 3", output: "9.26100", explanation: "2.1^3 = 9.261" },
    { input: "x = 2.00000, n = -2", output: "0.25000", explanation: "2^(-2) = 1/4 = 0.25" },
  ],

  constraints: [
    "-100.0 < x < 100.0",
    "-2^31 <= n <= 2^31 - 1",
    "n is an integer.",
    "Either x is not zero or n > 0.",
    "-10^4 <= x^n <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Linear)",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "Multiply x by itself |n| times. If n is negative, return 1/result.",

      javaCode: `public double myPow(double x, int n) {
    long N = n;
    if (N < 0) {
        x = 1 / x;
        N = -N;
    }
    double result = 1.0;
    for (long i = 0; i < N; i++) {
        result *= x;
    }
    return result;
}`,

      cppCode: `double myPow(double x, int n) {
    long long N = n;
    if (N < 0) {
        x = 1 / x;
        N = -N;
    }
    double result = 1.0;
    for (long long i = 0; i < N; i++) {
        result *= x;
    }
    return result;
}`,

      pythonCode: `def myPow(x: float, n: int) -> float:
    if n < 0:
        x = 1 / x
        n = -n
    result = 1.0
    for i in range(n):
        result *= x
    return result`,

      lineAnnotations: {
        2: "Use long to handle n = -2^31 overflow",
        3: "Negative exponent: invert base, negate exponent",
        4: "Invert the base",
        5: "Make exponent positive",
        7: "Start with result = 1",
        8: "Multiply x, N times",
        9: "Accumulate product",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { x: 2, n: 4 },
          expectedOutput: "16",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 7],
              shortLabel: "Init result=1",
              explanation: "We want 2^4. N=4 is positive so no inversion needed. Start with result=1.",
              variables: { x: 2, N: 4, result: 1, i: "-" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9],
              shortLabel: "i=0: result = 1*2 = 2",
              explanation: "First multiplication: result = 1 * 2 = 2. We've computed x^1.",
              variables: { x: 2, N: 4, result: 2, i: 0 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 9],
              shortLabel: "i=1: result = 2*2 = 4",
              explanation: "Second multiplication: result = 2 * 2 = 4. We've computed x^2.",
              variables: { x: 2, N: 4, result: 4, i: 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9],
              shortLabel: "i=2: result = 4*2 = 8",
              explanation: "Third multiplication: result = 4 * 2 = 8. We've computed x^3.",
              variables: { x: 2, N: 4, result: 8, i: 2 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 9],
              shortLabel: "i=3: result = 8*2 = 16",
              explanation: "Fourth multiplication: result = 8 * 2 = 16. We've computed x^4 = 16. Loop ends.",
              variables: { x: 2, N: 4, result: 16, i: 3 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11],
              shortLabel: "Return 16",
              explanation: "Return result = 16. Brute force took 4 multiplications — fine for small n, but O(n) is too slow for n up to 2^31.",
              variables: { result: 16, answer: "16" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ x, n }) {
        const steps = [];
        let N = n;
        let base = x;
        if (N < 0) {
          base = 1 / base;
          N = -N;
        }
        steps.push({
          stepId: 0, lineNumbers: [2, 7],
          shortLabel: "Init result=1",
          explanation: `We want ${x}^${n}. ${n < 0 ? `n is negative, so invert base to ${base} and use N=${N}.` : `N=${N} is positive.`} Start with result=1.`,
          variables: { x: base, N, result: 1, i: "-" },
          dataStructure: { arrayStates: {}, pointers: [] },
          delta: {}, isAnswer: false,
        });
        let result = 1.0;
        for (let i = 0; i < N && i < 20; i++) {
          result *= base;
          steps.push({
            stepId: steps.length, lineNumbers: [8, 9],
            shortLabel: `i=${i}: result=${+(result.toFixed(5))}`,
            explanation: `Multiplication ${i + 1}: result = ${+(((result / base)).toFixed(5))} * ${base} = ${+(result.toFixed(5))}.`,
            variables: { x: base, N, result: +(result.toFixed(5)), i },
            dataStructure: { arrayStates: {}, pointers: [] },
            delta: {}, isAnswer: false,
          });
        }
        steps.push({
          stepId: steps.length, lineNumbers: [11],
          shortLabel: `Return ${+(result.toFixed(5))}`,
          explanation: `Return result = ${+(result.toFixed(5))}. Brute force used ${Math.min(N, 20)} multiplications.`,
          variables: { result: +(result.toFixed(5)), answer: `${+(result.toFixed(5))}` },
          dataStructure: { arrayStates: {}, pointers: [] },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Binary Exponentiation",
      tier: "optimal",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      idea: `Square the base and halve the exponent each iteration. When exponent is odd, multiply result by base first. This reduces n multiplications to log(n).`,

      javaCode: `public double myPow(double x, int n) {
    long N = n;
    if (N < 0) {
        x = 1 / x;
        N = -N;
    }
    double result = 1.0;
    while (N > 0) {
        if (N % 2 == 1) {
            result *= x;
        }
        x *= x;
        N /= 2;
    }
    return result;
}`,

      cppCode: `double myPow(double x, int n) {
    long long N = n;
    if (N < 0) {
        x = 1.0 / x;
        N = -N;
    }
    double result = 1.0;
    while (N > 0) {
        if (N % 2 == 1) {
            result *= x;
        }
        x *= x;
        N /= 2;
    }
    return result;
}`,

      pythonCode: `def myPow(x: float, n: int) -> float:
    if n < 0:
        x = 1 / x
        n = -n
    result = 1.0
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    return result`,

      lineAnnotations: {
        2: "Use long to safely negate -2^31",
        3: "Handle negative exponent",
        4: "Invert base: x^(-n) = (1/x)^n",
        5: "Make exponent positive",
        7: "Accumulator starts at 1",
        8: "Loop while exponent > 0",
        9: "If exponent is odd, multiply result by current base",
        10: "Capture the 'odd' factor",
        12: "Square the base: x → x^2",
        13: "Halve the exponent",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "2^10 = 1024, demonstrating halving the exponent",
          input: { x: 2, n: 10 },
          expectedOutput: "1024",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 7],
              shortLabel: "Init: x=2, N=10, result=1",
              explanation: "We want 2^10. N=10 is positive, no inversion needed. result starts at 1. We'll repeatedly square x and halve N.",
              variables: { x: 2, N: 10, result: 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9],
              shortLabel: "N=10 even, skip multiply",
              explanation: "N=10 is even (10 % 2 == 0), so we don't multiply result by x. result stays 1.",
              variables: { x: 2, N: 10, result: 1, "N%2": 0 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13],
              shortLabel: "x = 2*2 = 4, N = 10/2 = 5",
              explanation: "Square the base: x = 2 * 2 = 4. Halve the exponent: N = 10 / 2 = 5. Now we need 4^5 * result(1).",
              variables: { x: 4, N: 5, result: 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9, 10],
              shortLabel: "N=5 odd, result = 1*4 = 4",
              explanation: "N=5 is odd (5 % 2 == 1). Multiply result by x: result = 1 * 4 = 4. We've captured one factor of the current base.",
              variables: { x: 4, N: 5, result: 4, "N%2": 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12, 13],
              shortLabel: "x = 4*4 = 16, N = 5/2 = 2",
              explanation: "Square x: 4 * 4 = 16. Halve N: 5 / 2 = 2 (integer division). Now we need 16^2 * result(4).",
              variables: { x: 16, N: 2, result: 4 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [8, 9],
              shortLabel: "N=2 even, skip multiply",
              explanation: "N=2 is even. Don't multiply result. result stays 4.",
              variables: { x: 16, N: 2, result: 4, "N%2": 0 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [12, 13],
              shortLabel: "x = 16*16 = 256, N = 2/2 = 1",
              explanation: "Square x: 16 * 16 = 256. Halve N: 2 / 2 = 1. Now we need 256^1 * result(4).",
              variables: { x: 256, N: 1, result: 4 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [8, 9, 10],
              shortLabel: "N=1 odd, result = 4*256 = 1024",
              explanation: "N=1 is odd. Multiply result by x: result = 4 * 256 = 1024. We've captured the final factor.",
              variables: { x: 256, N: 1, result: 1024, "N%2": 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [12, 13],
              shortLabel: "N = 1/2 = 0, loop ends",
              explanation: "Square x (irrelevant now) and halve N: 1 / 2 = 0. The while loop condition N > 0 is now false. Done!",
              variables: { x: 65536, N: 0, result: 1024 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [15],
              shortLabel: "Return 1024",
              explanation: "Return result = 1024. We computed 2^10 in just 4 iterations (log2(10) ≈ 3.3) instead of 10 multiplications.",
              variables: { result: 1024, answer: "1024" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Negative Exponent",
          description: "x=2, n=-3 — must handle inversion correctly",
          input: { x: 2, n: -3 },
          expectedOutput: "0.125",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4, 5],
              shortLabel: "Negative n: invert base",
              explanation: "n=-3 is negative. Convert: 2^(-3) = (1/2)^3 = 0.5^3. Set x = 1/2 = 0.5, N = 3.",
              variables: { x: 0.5, N: 3, result: 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 9, 10],
              shortLabel: "N=3 odd, result = 1*0.5 = 0.5",
              explanation: "N=3 is odd. Multiply result by x: result = 1 * 0.5 = 0.5.",
              variables: { x: 0.5, N: 3, result: 0.5, "N%2": 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13],
              shortLabel: "x = 0.5*0.5 = 0.25, N = 1",
              explanation: "Square x: 0.5 * 0.5 = 0.25. Halve N: 3 / 2 = 1.",
              variables: { x: 0.25, N: 1, result: 0.5 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9, 10],
              shortLabel: "N=1 odd, result = 0.5*0.25 = 0.125",
              explanation: "N=1 is odd. Multiply result by x: result = 0.5 * 0.25 = 0.125.",
              variables: { x: 0.25, N: 1, result: 0.125, "N%2": 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12, 13],
              shortLabel: "N = 1/2 = 0, loop ends",
              explanation: "Halve N: 1 / 2 = 0. Loop ends.",
              variables: { x: 0.0625, N: 0, result: 0.125 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [15],
              shortLabel: "Return 0.125",
              explanation: "Return 0.125. 2^(-3) = 1/8 = 0.125. Only 2 iterations needed for |n|=3.",
              variables: { result: 0.125, answer: "0.125" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ x, n }) {
        const steps = [];
        let N = Math.abs(n);
        let base = n < 0 ? 1 / x : x;

        steps.push({
          stepId: 0, lineNumbers: n < 0 ? [2, 3, 4, 5] : [2, 7],
          shortLabel: `Init: x=${+(base.toFixed(5))}, N=${N}`,
          explanation: n < 0
            ? `n=${n} is negative. Convert: ${x}^(${n}) = (1/${x})^${N} = ${+(base.toFixed(5))}^${N}. result starts at 1.`
            : `We want ${x}^${n}. N=${N} is positive. result starts at 1.`,
          variables: { x: +(base.toFixed(5)), N, result: 1 },
          dataStructure: { arrayStates: {}, pointers: [] },
          delta: {}, isAnswer: false,
        });

        let result = 1.0;
        while (N > 0) {
          if (N % 2 === 1) {
            result *= base;
            steps.push({
              stepId: steps.length, lineNumbers: [8, 9, 10],
              shortLabel: `N=${N} odd, result=${+(result.toFixed(5))}`,
              explanation: `N=${N} is odd. Multiply result by x: result = ${+((result / base).toFixed(5))} * ${+(base.toFixed(5))} = ${+(result.toFixed(5))}.`,
              variables: { x: +(base.toFixed(5)), N, result: +(result.toFixed(5)), "N%2": 1 },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {}, isAnswer: false,
            });
          } else {
            steps.push({
              stepId: steps.length, lineNumbers: [8, 9],
              shortLabel: `N=${N} even, skip`,
              explanation: `N=${N} is even. Don't multiply result. result stays ${+(result.toFixed(5))}.`,
              variables: { x: +(base.toFixed(5)), N, result: +(result.toFixed(5)), "N%2": 0 },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {}, isAnswer: false,
            });
          }
          base *= base;
          N = Math.floor(N / 2);
          steps.push({
            stepId: steps.length, lineNumbers: [12, 13],
            shortLabel: `x=${+(base.toFixed(5))}, N=${N}`,
            explanation: `Square x and halve N. x = ${+(base.toFixed(5))}, N = ${N}.${N === 0 ? " Loop ends." : ""}`,
            variables: { x: +(base.toFixed(5)), N, result: +(result.toFixed(5)) },
            dataStructure: { arrayStates: {}, pointers: [] },
            delta: {}, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [15],
          shortLabel: `Return ${+(result.toFixed(5))}`,
          explanation: `Return result = ${+(result.toFixed(5))}. Computed ${x}^${n} in O(log n) iterations.`,
          variables: { result: +(result.toFixed(5)), answer: `${+(result.toFixed(5))}` },
          dataStructure: { arrayStates: {}, pointers: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(1)", explanation: "Linear loop of n multiplications" },
    optimal: { time: "O(log n)", space: "O(1)", explanation: "Exponent halves each iteration", tradeoff: "No extra space needed — purely algorithmic improvement" },
  },

  interviewTips: [
    "Start by mentioning the brute force O(n) approach before jumping to binary exponentiation.",
    "Handle the edge case of n = -2^31: negating it overflows int, so use long.",
    "Explain that this is the same technique behind modular exponentiation in RSA.",
    "Walk through the binary representation of n to show which factors get multiplied.",
    "Mention that Python's built-in pow() uses the same algorithm internally.",
  ],

  relatedProblems: ["multiply-strings", "sqrt-x"],
};
