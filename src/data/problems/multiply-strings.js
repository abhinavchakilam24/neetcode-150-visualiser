export const multiplyStrings = {
  id: 141,
  slug: "multiply-strings",
  title: "Multiply Strings",
  difficulty: "Medium",
  topic: "math-geometry",
  topicLabel: "Math & Geometry",
  neetcodeNumber: 141,
  artifactType: "Matrix",
  companies: ["Google", "Meta", "Microsoft", "Amazon", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/multiply-strings/",

  pattern: "Grade-School Multiplication with Position Mapping",
  patternExplanation: `Multiply two numbers represented as strings digit by digit, just like manual long multiplication. The key insight is that digit i of num1 times digit j of num2 contributes to position i+j and i+j+1 in the result array.`,

  intuition: {
    coreInsight: `When we multiply two numbers by hand, each digit pair (i, j) produces a partial product that lands at a specific position in the result. For digits at positions i and j (from the end), their product contributes to result positions i+j and i+j+1. We accumulate all partial products in an array, handle carries, then convert to string.`,

    mentalModel: `Think of long multiplication on paper. When you multiply 123 by 45, you compute 123*5 = 615, then 123*4 = 492 shifted left one position. Each digit-by-digit multiplication hits a specific column. The result array is like the columns on your paper — each column accumulates values from multiple digit pairs, and you carry overflow to the next column.`,

    whyNaiveFails: `Converting strings to integers and multiplying directly fails because the numbers can be up to 200 digits long — far exceeding what any integer type (even long or BigInteger in some contexts) can hold. We must work with individual digits and handle position/carry manually.`,

    keyObservation: `The maximum length of the product of an m-digit number and an n-digit number is m+n digits. Position mapping: num1[i] * num2[j] lands at result[i+j+1] (ones digit) and result[i+j] (tens/carry digit). Process from least significant digit to most, accumulate, then strip leading zeros.`,
  },

  problem: `Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string. You must not use any built-in BigInteger library or convert the inputs to integer directly.`,

  examples: [
    { input: 'num1 = "2", num2 = "3"', output: '"6"', explanation: "2 * 3 = 6" },
    { input: 'num1 = "123", num2 = "456"', output: '"56088"', explanation: "123 * 456 = 56088" },
  ],

  constraints: [
    "1 <= num1.length, num2.length <= 200",
    "num1 and num2 consist of digits only.",
    "Neither num1 nor num2 contain leading zeros, except the number 0 itself.",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Add Repeatedly)",
      tier: "brute",
      timeComplexity: "O(m * n * max(m,n))",
      spaceComplexity: "O(m + n)",
      idea: "Simulate multiplication by adding num1 to itself num2 times using string addition. Extremely slow for large inputs.",

      javaCode: `public String multiply(String num1, String num2) {
    if (num1.equals("0") || num2.equals("0")) return "0";
    String result = "0";
    for (int j = num2.length() - 1; j >= 0; j--) {
        int digit = num2.charAt(j) - '0';
        String partial = multiplyByDigit(num1, digit);
        for (int z = 0; z < num2.length() - 1 - j; z++)
            partial += "0";
        result = addStrings(result, partial);
    }
    return result;
}`,

      cppCode: `string multiply(string num1, string num2) {
    if (num1 == "0" || num2 == "0") return "0";
    string result = "0";
    for (int j = num2.size() - 1; j >= 0; j--) {
        int digit = num2[j] - '0';
        string partial = multiplyByDigit(num1, digit);
        for (int z = 0; z < (int)num2.size() - 1 - j; z++)
            partial += "0";
        result = addStrings(result, partial);
    }
    return result;
}`,

      pythonCode: `def multiply(num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
        return "0"
    result = "0"
    for j in range(len(num2) - 1, -1, -1):
        digit = int(num2[j])
        partial = multiply_by_digit(num1, digit)
        partial += "0" * (len(num2) - 1 - j)
        result = add_strings(result, partial)
    return result`,

      lineAnnotations: {
        2: "Zero check — anything times zero is zero",
        4: "Process each digit of num2 from right to left",
        5: "Extract current digit",
        6: "Multiply num1 by this single digit",
        7: "Shift left by position (append zeros)",
        9: "Add partial product to running result",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { num1: "12", num2: "34" },
          expectedOutput: "408",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init result = '0'",
              explanation: "Neither number is '0'. Initialize result to '0'. We'll multiply 12 by each digit of 34.",
              variables: { num1: "12", num2: "34", result: "0" },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: "j=1: 12 * 4 = 48",
              explanation: "Take digit num2[1] = 4. Multiply 12 by 4 to get partial product '48'. No shift needed (ones place).",
              variables: { j: 1, digit: 4, partial: "48", result: "0" },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9],
              shortLabel: "result = 0 + 48 = 48",
              explanation: "Add partial '48' to result '0'. result = '48'.",
              variables: { j: 1, partial: "48", result: "48" },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: "j=0: 12 * 3 = 36, shift → 360",
              explanation: "Take digit num2[0] = 3. Multiply 12 by 3 = '36'. Shift left by 1 position: append '0' → '360'.",
              variables: { j: 0, digit: 3, partial: "360", result: "48" },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9],
              shortLabel: "result = 48 + 360 = 408",
              explanation: "Add partial '360' to result '48'. result = '408'. All digits processed.",
              variables: { partial: "360", result: "408", answer: "408" },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ num1, num2 }) {
        const steps = [];
        if (num1 === "0" || num2 === "0") {
          steps.push({
            stepId: 0, lineNumbers: [2],
            shortLabel: "Zero input → return '0'",
            explanation: "One of the inputs is '0'. Product is '0'.",
            variables: { num1, num2, answer: "0" },
            dataStructure: { arrayStates: {}, pointers: [] },
            delta: {}, isAnswer: true,
          });
          return steps;
        }
        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init result='0'",
          explanation: `Multiply ${num1} by ${num2}. Initialize result to '0'.`,
          variables: { num1, num2, result: "0" },
          dataStructure: { arrayStates: {}, pointers: [] },
          delta: {}, isAnswer: false,
        });

        let result = 0;
        for (let j = num2.length - 1; j >= 0; j--) {
          const digit = parseInt(num2[j]);
          const partial = parseInt(num1) * digit;
          const shift = num2.length - 1 - j;
          const shifted = partial * Math.pow(10, shift);
          result += shifted;
          steps.push({
            stepId: steps.length, lineNumbers: [4, 5, 6, 9],
            shortLabel: `j=${j}: ${num1}*${digit}${"0".repeat(shift)} = ${shifted}`,
            explanation: `Digit num2[${j}] = ${digit}. ${num1} * ${digit} = ${partial}${shift > 0 ? `, shifted left ${shift}: ${shifted}` : ""}. result = ${result}.`,
            variables: { j, digit, partial: String(shifted), result: String(result) },
            dataStructure: { arrayStates: {}, pointers: [] },
            delta: {}, isAnswer: j === 0,
          });
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Grade-School Multiplication (Position Mapping)",
      tier: "optimal",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m + n)",
      idea: `Use an array of size m+n. For each pair of digits num1[i] and num2[j], add their product to positions i+j and i+j+1. Handle carries at the end, then convert to string.`,

      javaCode: `public String multiply(String num1, String num2) {
    int m = num1.length(), n = num2.length();
    int[] result = new int[m + n];

    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
            int p1 = i + j, p2 = i + j + 1;
            int sum = mul + result[p2];

            result[p2] = sum % 10;
            result[p1] += sum / 10;
        }
    }

    StringBuilder sb = new StringBuilder();
    for (int digit : result) {
        if (!(sb.length() == 0 && digit == 0))
            sb.append(digit);
    }
    return sb.length() == 0 ? "0" : sb.toString();
}`,

      cppCode: `string multiply(string num1, string num2) {
    int m = num1.size(), n = num2.size();
    vector<int> result(m + n, 0);

    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            int mul = (num1[i] - '0') * (num2[j] - '0');
            int p1 = i + j, p2 = i + j + 1;
            int sum = mul + result[p2];

            result[p2] = sum % 10;
            result[p1] += sum / 10;
        }
    }

    string str;
    for (int digit : result) {
        if (!(str.empty() && digit == 0))
            str += to_string(digit);
    }
    return str.empty() ? "0" : str;
}`,

      pythonCode: `def multiply(num1: str, num2: str) -> str:
    m, n = len(num1), len(num2)
    result = [0] * (m + n)

    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            mul = int(num1[i]) * int(num2[j])
            p1, p2 = i + j, i + j + 1
            total = mul + result[p2]

            result[p2] = total % 10
            result[p1] += total // 10

    result_str = ''.join(map(str, result)).lstrip('0')
    return result_str if result_str else "0"`,

      lineAnnotations: {
        2: "Get lengths of both number strings",
        3: "Result array: max possible digits = m + n",
        5: "Process num1 from least significant digit",
        6: "Process num2 from least significant digit",
        7: "Multiply current digit pair",
        8: "p1 = carry position, p2 = ones position",
        9: "Add product to existing value at p2 (handles accumulated carries)",
        11: "Store ones digit at p2",
        12: "Add carry to p1",
        16: "Build result string, skipping leading zeros",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Multiply 23 * 45 = 1035 step by step",
          input: { num1: "23", num2: "45" },
          expectedOutput: "1035",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init result[0..3] = [0,0,0,0]",
              explanation: "num1='23' (m=2), num2='45' (n=2). Create result array of size m+n = 4, filled with zeros. Each position represents a digit column.",
              variables: { num1: "23", num2: "45", m: 2, n: 2, result: "[0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "i=1,j=1: 3*5=15",
              explanation: "num1[1]=3, num2[1]=5. Product = 3*5 = 15. Positions: p1=2, p2=3. sum = 15 + result[3](0) = 15.",
              variables: { i: 1, j: 1, "num1[i]": 3, "num2[j]": 5, mul: 15, p1: 2, p2: 3, sum: 15 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "active" },
                pointers: [{ name: "p2", index: 3, color: "active" }, { name: "p1", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "result[3]=5, result[2]+=1",
              explanation: "result[3] = 15 % 10 = 5. result[2] += 15 / 10 = 1. Result array: [0, 0, 1, 5].",
              variables: { "result[3]": 5, "result[2]": 1, result: "[0,0,1,5]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "found", 3: "found" },
                pointers: [],
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "i=1,j=0: 3*4=12",
              explanation: "num1[1]=3, num2[0]=4. Product = 3*4 = 12. Positions: p1=1, p2=2. sum = 12 + result[2](1) = 13.",
              variables: { i: 1, j: 0, "num1[i]": 3, "num2[j]": 4, mul: 12, p1: 1, p2: 2, sum: 13 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "visited" },
                pointers: [{ name: "p2", index: 2, color: "active" }, { name: "p1", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12],
              shortLabel: "result[2]=3, result[1]+=1",
              explanation: "result[2] = 13 % 10 = 3. result[1] += 13 / 10 = 1. Result array: [0, 1, 3, 5].",
              variables: { "result[2]": 3, "result[1]": 1, result: "[0,1,3,5]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "found", 3: "visited" },
                pointers: [],
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "i=0,j=1: 2*5=10",
              explanation: "num1[0]=2, num2[1]=5. Product = 2*5 = 10. Positions: p1=1, p2=2. sum = 10 + result[2](3) = 13.",
              variables: { i: 0, j: 1, "num1[i]": 2, "num2[j]": 5, mul: 10, p1: 1, p2: 2, sum: 13 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "visited" },
                pointers: [{ name: "p2", index: 2, color: "active" }, { name: "p1", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12],
              shortLabel: "result[2]=3, result[1]+=1",
              explanation: "result[2] = 13 % 10 = 3. result[1] += 13 / 10 = 1. Result array: [0, 2, 3, 5].",
              variables: { "result[2]": 3, "result[1]": 2, result: "[0,2,3,5]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "found", 3: "visited" },
                pointers: [],
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "i=0,j=0: 2*4=8",
              explanation: "num1[0]=2, num2[0]=4. Product = 2*4 = 8. Positions: p1=0, p2=1. sum = 8 + result[1](2) = 10.",
              variables: { i: 0, j: 0, "num1[i]": 2, "num2[j]": 4, mul: 8, p1: 0, p2: 1, sum: 10 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "visited", 3: "visited" },
                pointers: [{ name: "p2", index: 1, color: "active" }, { name: "p1", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [11, 12],
              shortLabel: "result[1]=0, result[0]+=1",
              explanation: "result[1] = 10 % 10 = 0. result[0] += 10 / 10 = 1. Result array: [1, 0, 3, 5]. Read as '1035'.",
              variables: { "result[1]": 0, "result[0]": 1, result: "[1,0,3,5]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [16, 17, 18, 20],
              shortLabel: "Return '1035'",
              explanation: "Convert array [1,0,3,5] to string '1035'. No leading zeros to strip. 23 * 45 = 1035.",
              variables: { result: "[1,0,3,5]", answer: "1035" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Zero Input",
          description: "Multiplying by zero should return '0'",
          input: { num1: "999", num2: "0" },
          expectedOutput: "0",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init result array",
              explanation: "num1='999', num2='0'. m=3, n=1. Create result array of size 4: [0,0,0,0].",
              variables: { num1: "999", num2: "0", result: "[0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7],
              shortLabel: "i=2,j=0: 9*0=0",
              explanation: "num1[2]=9, num2[0]=0. Product = 9*0 = 0. Nothing added to result.",
              variables: { i: 2, j: 0, mul: 0, result: "[0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "active" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7],
              shortLabel: "i=1,j=0: 9*0=0",
              explanation: "num1[1]=9, num2[0]=0. Product = 0. All partial products are zero.",
              variables: { i: 1, j: 0, mul: 0, result: "[0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7],
              shortLabel: "i=0,j=0: 9*0=0",
              explanation: "num1[0]=9, num2[0]=0. Product = 0. All zeros.",
              variables: { i: 0, j: 0, mul: 0, result: "[0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "active", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16, 20],
              shortLabel: "Return '0'",
              explanation: "Result array is all zeros. After stripping leading zeros, the string is empty, so return '0'.",
              variables: { result: "[0,0,0,0]", answer: "0" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ num1, num2 }) {
        const steps = [];
        const m = num1.length, n = num2.length;
        const result = new Array(m + n).fill(0);

        const arrStates = () => Object.fromEntries(result.map((_, i) => [i, "default"]));

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `Init result[0..${m + n - 1}]`,
          explanation: `num1='${num1}' (m=${m}), num2='${num2}' (n=${n}). Create result array of size ${m + n}, filled with zeros.`,
          variables: { num1, num2, m, n, result: JSON.stringify(result) },
          dataStructure: { arrayStates: arrStates(), pointers: [] },
          delta: {}, isAnswer: false,
        });

        for (let i = m - 1; i >= 0; i--) {
          for (let j = n - 1; j >= 0; j--) {
            const d1 = parseInt(num1[i]);
            const d2 = parseInt(num2[j]);
            const mul = d1 * d2;
            const p1 = i + j, p2 = i + j + 1;
            const sum = mul + result[p2];
            result[p2] = sum % 10;
            result[p1] += Math.floor(sum / 10);

            steps.push({
              stepId: steps.length, lineNumbers: [5, 6, 7, 8, 9, 11, 12],
              shortLabel: `i=${i},j=${j}: ${d1}*${d2}=${mul}`,
              explanation: `num1[${i}]=${d1}, num2[${j}]=${d2}. Product=${mul}. p1=${p1}, p2=${p2}. sum=${sum}. result[${p2}]=${result[p2]}, result[${p1}]=${result[p1]}.`,
              variables: { i, j, mul, p1, p2, sum, result: JSON.stringify(result) },
              dataStructure: {
                arrayStates: Object.fromEntries(result.map((_, k) => [k, k === p2 ? "active" : k === p1 ? "pointer" : "default"])),
                pointers: [{ name: "p2", index: p2, color: "active" }, { name: "p1", index: p1, color: "pointer" }],
              },
              delta: { changedIndices: [p1, p2] }, isAnswer: false,
            });
          }
        }

        let ans = result.join("").replace(/^0+/, "") || "0";
        steps.push({
          stepId: steps.length, lineNumbers: [16, 20],
          shortLabel: `Return '${ans}'`,
          explanation: `Convert result array [${result.join(",")}] to string, strip leading zeros. Answer: '${ans}'.`,
          variables: { result: JSON.stringify(result), answer: ans },
          dataStructure: {
            arrayStates: Object.fromEntries(result.map((_, k) => [k, "found"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(m * n * max(m,n))", space: "O(m + n)", explanation: "String addition for each digit of num2" },
    optimal: { time: "O(m * n)", space: "O(m + n)", explanation: "Each digit pair multiplied once; result array of size m+n", tradeoff: "Direct position mapping avoids costly string additions" },
  },

  interviewTips: [
    "Clarify that you cannot convert to int/long — the numbers can be 200 digits.",
    "Draw the position mapping: i + j and i + j + 1 — this is the key insight.",
    "Handle leading zeros: '0123' should not be a valid result.",
    "Check the zero edge case: '0' * anything = '0'.",
    "Mention this is essentially how hardware multipliers work at a conceptual level.",
  ],

  relatedProblems: ["plus-one", "pow-x-n"],
};
