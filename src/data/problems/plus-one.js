export const plusOne = {
  id: 139,
  slug: "plus-one",
  title: "Plus One",
  difficulty: "Easy",
  topic: "math-geometry",
  topicLabel: "Math & Geometry",
  neetcodeNumber: 139,
  artifactType: "Matrix",
  companies: ["Google", "Amazon", "Apple", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/plus-one/",

  pattern: "Right-to-Left Carry Propagation",
  patternExplanation: `When performing arithmetic on array-represented numbers, process
    digits from right to left, propagating carry. The only tricky case is when carry
    propagates through all digits (e.g., 999 → 1000).`,

  intuition: {
    coreInsight: `Adding 1 to a number represented as a digit array is just grade-school
      addition starting from the rightmost digit. If a digit is less than 9, increment it
      and you're done — no carry. If it's 9, it becomes 0 and you carry 1 to the next
      position. The only special case is when ALL digits are 9 (like 999), where carry
      propagates all the way and you need to prepend a 1.`,

    mentalModel: `Think of an odometer in a car. When the rightmost wheel hits 9 and rolls
      over to 0, it pushes the next wheel forward by one. This cascade continues until a
      wheel that isn't at 9 absorbs the increment. If all wheels are at 9, the entire
      odometer rolls over and a new digit appears on the left.`,

    whyNaiveFails: `Converting the array to a number, adding 1, and converting back would
      overflow for very large numbers (hundreds of digits). The array representation exists
      precisely to handle numbers that don't fit in int or long. Process the array directly.`,

    keyObservation: `Most of the time, you just increment the last digit and return. The
      carry-propagation loop only continues when digits are 9. In the worst case (all 9s),
      every digit becomes 0 and you prepend a 1. This can be handled by creating a new
      array of length n+1, setting the first element to 1 (rest are already 0).`,
  },

  problem: `You are given a large integer represented as an integer array digits, where each
    digits[i] is the ith digit of the integer. The digits are ordered from most significant
    to least significant in left-to-right order. The large integer does not contain any
    leading zeroes. Increment the large integer by one and return the resulting array of digits.`,

  examples: [
    { input: "digits = [1,2,3]", output: "[1,2,4]", explanation: "123 + 1 = 124" },
    { input: "digits = [4,3,2,1]", output: "[4,3,2,2]", explanation: "4321 + 1 = 4322" },
    { input: "digits = [9]", output: "[1,0]", explanation: "9 + 1 = 10" },
  ],

  constraints: [
    "1 <= digits.length <= 100",
    "0 <= digits[i] <= 9",
    "digits does not contain any leading 0's.",
  ],

  approaches: {
    brute: {
      label: "Right-to-Left with Carry",
      tier: "brute",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "Walk from the rightmost digit leftward. If the digit is < 9, increment and return. If it's 9, set to 0 and carry. If all digits were 9, prepend 1.",

      javaCode: `public int[] plusOne(int[] digits) {
    for (int i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    int[] result = new int[digits.length + 1];
    result[0] = 1;
    return result;
}`,

      cppCode: `vector<int> plusOne(vector<int>& digits) {
    for (int i = digits.size() - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.insert(digits.begin(), 1);
    return digits;
}`,

      pythonCode: `def plusOne(digits: List[int]) -> List[int]:
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,

      lineAnnotations: {
        2: "Walk from rightmost digit to leftmost",
        3: "If digit is less than 9, no carry needed",
        4: "Increment and we're done!",
        5: "Return immediately — no further carry",
        7: "Digit is 9 — it becomes 0 and carry propagates left",
        9: "All digits were 9 — need a new array with leading 1",
        10: "Set first element to 1 (rest default to 0)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard: [1,2,3]",
          input: { digits: [1, 2, 3] },
          expectedOutput: "[1,2,4]",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Start from right",
              explanation: "Begin at the rightmost digit. i=2, digits[2]=3. We're adding 1 to the number 123.",
              variables: { i: 2, "digits[i]": 3 },
              dataStructure: {
                matrix: [[1, 2, 3]],
                cellStates: { "0,0": "default", "0,1": "default", "0,2": "active" },
                pointers: [{ name: "i", row: 0, col: 2 }],
              },
              delta: { changedCells: ["0,2"] }, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [3, 4, 5], shortLabel: "3 < 9 → 4, return",
              explanation: "digits[2]=3, which is less than 9. Increment to 4 and return immediately. No carry needed! Result: [1,2,4].",
              variables: { i: 2, "digits[i]": 4, result: "[1,2,4]" },
              dataStructure: {
                matrix: [[1, 2, 4]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found" },
                pointers: [],
              },
              delta: { changedCells: ["0,2"] }, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Nines: [9,9,9]",
          description: "Every digit is 9 — carry propagates through all positions and a new digit is prepended",
          input: { digits: [9, 9, 9] },
          expectedOutput: "[1,0,0,0]",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Start from right",
              explanation: "i=2, digits[2]=9. This is the worst case — all digits are 9, so carry will propagate all the way.",
              variables: { i: 2, "digits[i]": 9 },
              dataStructure: {
                matrix: [[9, 9, 9]],
                cellStates: { "0,0": "default", "0,1": "default", "0,2": "active" },
                pointers: [{ name: "i", row: 0, col: 2 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [7], shortLabel: "9 → 0, carry",
              explanation: "digits[2]=9, so set it to 0 and carry 1 to the next position. Move left to i=1.",
              variables: { i: 1, "digits[2]": 0, carry: 1 },
              dataStructure: {
                matrix: [[9, 9, 0]],
                cellStates: { "0,0": "default", "0,1": "active", "0,2": "visited" },
                pointers: [{ name: "i", row: 0, col: 1 }],
              },
              delta: { changedCells: ["0,2"] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [7], shortLabel: "9 → 0, carry",
              explanation: "digits[1]=9, so set it to 0 and carry again. Move left to i=0.",
              variables: { i: 0, "digits[1]": 0, carry: 1 },
              dataStructure: {
                matrix: [[9, 0, 0]],
                cellStates: { "0,0": "active", "0,1": "visited", "0,2": "visited" },
                pointers: [{ name: "i", row: 0, col: 0 }],
              },
              delta: { changedCells: ["0,1"] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [7], shortLabel: "9 → 0, carry out",
              explanation: "digits[0]=9, so set it to 0. Carry propagates past the most significant digit. Loop ends.",
              variables: { i: -1, "digits[0]": 0, carry: 1 },
              dataStructure: {
                matrix: [[0, 0, 0]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited" },
                pointers: [],
              },
              delta: { changedCells: ["0,0"] }, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [9, 10], shortLabel: "Prepend 1 → [1,0,0,0]",
              explanation: "All digits were 9 and became 0. Create a new array of length 4, set result[0]=1. Return [1,0,0,0]. This is the only case where the array grows.",
              variables: { result: "[1,0,0,0]" },
              dataStructure: {
                matrix: [[1, 0, 0, 0]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found", "0,3": "found" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Partial Carry: [1,9,9]",
          description: "Carry propagates through trailing 9s but stops at a non-9 digit",
          input: { digits: [1, 9, 9] },
          expectedOutput: "[2,0,0]",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Start from right",
              explanation: "i=2, digits[2]=9. The trailing 9s will carry, but it stops at digit[0]=1.",
              variables: { i: 2, "digits[i]": 9 },
              dataStructure: {
                matrix: [[1, 9, 9]],
                cellStates: { "0,0": "default", "0,1": "default", "0,2": "active" },
                pointers: [{ name: "i", row: 0, col: 2 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [7], shortLabel: "9 → 0, carry",
              explanation: "digits[2]=9, set to 0. Carry propagates to i=1.",
              variables: { i: 1, "digits[2]": 0 },
              dataStructure: {
                matrix: [[1, 9, 0]],
                cellStates: { "0,0": "default", "0,1": "active", "0,2": "visited" },
                pointers: [{ name: "i", row: 0, col: 1 }],
              },
              delta: { changedCells: ["0,2"] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [7], shortLabel: "9 → 0, carry",
              explanation: "digits[1]=9, set to 0. Carry propagates to i=0.",
              variables: { i: 0, "digits[1]": 0 },
              dataStructure: {
                matrix: [[1, 0, 0]],
                cellStates: { "0,0": "active", "0,1": "visited", "0,2": "visited" },
                pointers: [{ name: "i", row: 0, col: 0 }],
              },
              delta: { changedCells: ["0,1"] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [3, 4, 5], shortLabel: "1 < 9 → 2, return",
              explanation: "digits[0]=1, which is less than 9. Increment to 2 and return. Result: [2,0,0]. The carry was absorbed.",
              variables: { i: 0, "digits[0]": 2, result: "[2,0,0]" },
              dataStructure: {
                matrix: [[2, 0, 0]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found" },
                pointers: [],
              },
              delta: { changedCells: ["0,0"] }, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ digits }) {
        const steps = [];
        const d = [...digits];
        const n = d.length;

        const getCellStates = (activeIdx, visitedFrom) => {
          const states = {};
          for (let j = 0; j < n; j++)
            states[`0,${j}`] = j === activeIdx ? "active" : j > visitedFrom ? "visited" : "default";
          return states;
        };

        steps.push({
          stepId: 0, lineNumbers: [2], shortLabel: "Start from right",
          explanation: `Begin at i=${n-1}, digits[${n-1}]=${d[n-1]}.`,
          variables: { i: n - 1, "digits[i]": d[n - 1] },
          dataStructure: {
            matrix: [[...d]],
            cellStates: getCellStates(n - 1, n),
            pointers: [{ name: "i", row: 0, col: n - 1 }],
          },
          delta: {}, isAnswer: false,
        });

        for (let i = n - 1; i >= 0; i--) {
          if (d[i] < 9) {
            d[i]++;
            const foundStates = {};
            for (let j = 0; j < n; j++) foundStates[`0,${j}`] = "found";
            steps.push({
              stepId: steps.length, lineNumbers: [3, 4, 5],
              shortLabel: `${d[i]-1} < 9 → ${d[i]}, return`,
              explanation: `digits[${i}]=${d[i]-1} is less than 9. Increment to ${d[i]} and return [${d.join(",")}].`,
              variables: { i, "digits[i]": d[i], result: `[${d.join(",")}]` },
              dataStructure: { matrix: [[...d]], cellStates: foundStates, pointers: [] },
              delta: { changedCells: [`0,${i}`] }, isAnswer: true,
            });
            return steps;
          }
          d[i] = 0;
          steps.push({
            stepId: steps.length, lineNumbers: [7],
            shortLabel: `9 → 0, carry`,
            explanation: `digits[${i}]=9, set to 0. Carry propagates left.`,
            variables: { i: i - 1, [`digits[${i}]`]: 0 },
            dataStructure: {
              matrix: [[...d]],
              cellStates: (() => {
                const s = {};
                for (let j = 0; j < n; j++)
                  s[`0,${j}`] = j === i - 1 ? "active" : j >= i ? "visited" : "default";
                return s;
              })(),
              pointers: i > 0 ? [{ name: "i", row: 0, col: i - 1 }] : [],
            },
            delta: { changedCells: [`0,${i}`] }, isAnswer: false,
          });
        }

        // All digits were 9
        const result = [1, ...d];
        const foundStates = {};
        for (let j = 0; j < result.length; j++) foundStates[`0,${j}`] = "found";
        steps.push({
          stepId: steps.length, lineNumbers: [9, 10],
          shortLabel: `Prepend 1 → [${result.join(",")}]`,
          explanation: `All digits were 9. Create new array with leading 1. Return [${result.join(",")}].`,
          variables: { result: `[${result.join(",")}]` },
          dataStructure: { matrix: [result], cellStates: foundStates, pointers: [] },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Right-to-Left with Carry (Same as Above)",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: "The brute force IS the optimal solution — there's no way to avoid scanning digits from right to left. O(n) time and O(1) extra space (ignoring the output array for the all-9s case).",

      javaCode: `public int[] plusOne(int[] digits) {
    for (int i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    int[] result = new int[digits.length + 1];
    result[0] = 1;
    return result;
}`,

      cppCode: `vector<int> plusOne(vector<int>& digits) {
    for (int i = digits.size() - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.insert(digits.begin(), 1);
    return digits;
}`,

      pythonCode: `def plusOne(digits: List[int]) -> List[int]:
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,

      lineAnnotations: {
        2: "Walk from rightmost digit to leftmost",
        3: "If digit is less than 9, no carry needed",
        4: "Increment and we're done!",
        5: "Return immediately — no further carry",
        7: "Digit is 9 — it becomes 0 and carry propagates left",
        9: "All digits were 9 — need a new array with leading 1",
        10: "Set first element to 1 (rest default to 0)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard: [1,2,3]",
          description: "Simple case — no carry needed",
          input: { digits: [1, 2, 3] },
          expectedOutput: "[1,2,4]",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Start at i=2",
              explanation: "Start at the rightmost digit. digits[2]=3. Since 3 < 9, we can just increment without any carry.",
              variables: { i: 2, "digits[i]": 3 },
              dataStructure: {
                matrix: [[1, 2, 3]],
                cellStates: { "0,0": "default", "0,1": "default", "0,2": "active" },
                pointers: [{ name: "i", row: 0, col: 2 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [3, 4, 5], shortLabel: "3 → 4, done!",
              explanation: "3 < 9, so increment to 4 and return [1,2,4]. No carry propagation needed — this is the best case.",
              variables: { i: 2, "digits[i]": 4, result: "[1,2,4]" },
              dataStructure: {
                matrix: [[1, 2, 4]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found" },
                pointers: [],
              },
              delta: { changedCells: ["0,2"] }, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Nines: [9,9]",
          description: "Every digit is 9 — array grows by one",
          input: { digits: [9, 9] },
          expectedOutput: "[1,0,0]",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Start at i=1",
              explanation: "i=1, digits[1]=9. Both digits are 9, so we'll carry all the way through.",
              variables: { i: 1, "digits[i]": 9 },
              dataStructure: {
                matrix: [[9, 9]],
                cellStates: { "0,0": "default", "0,1": "active" },
                pointers: [{ name: "i", row: 0, col: 1 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [7], shortLabel: "9 → 0, carry",
              explanation: "digits[1]=9 → set to 0, carry to i=0.",
              variables: { i: 0, "digits[1]": 0 },
              dataStructure: {
                matrix: [[9, 0]],
                cellStates: { "0,0": "active", "0,1": "visited" },
                pointers: [{ name: "i", row: 0, col: 0 }],
              },
              delta: { changedCells: ["0,1"] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [7], shortLabel: "9 → 0, carry out",
              explanation: "digits[0]=9 → set to 0. We've gone past all digits with a remaining carry.",
              variables: { "digits[0]": 0 },
              dataStructure: {
                matrix: [[0, 0]],
                cellStates: { "0,0": "visited", "0,1": "visited" },
                pointers: [],
              },
              delta: { changedCells: ["0,0"] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [9, 10], shortLabel: "Prepend 1 → [1,0,0]",
              explanation: "All digits overflowed. Create new array [1,0,0]. The number grew from 2 digits to 3.",
              variables: { result: "[1,0,0]" },
              dataStructure: {
                matrix: [[1, 0, 0]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ digits }) {
        const steps = [];
        const d = [...digits];
        const n = d.length;

        steps.push({
          stepId: 0, lineNumbers: [2], shortLabel: `Start at i=${n-1}`,
          explanation: `Start at rightmost digit. digits[${n-1}]=${d[n-1]}.`,
          variables: { i: n - 1, "digits[i]": d[n - 1] },
          dataStructure: {
            matrix: [[...d]],
            cellStates: Object.fromEntries(d.map((_, j) => [`0,${j}`, j === n - 1 ? "active" : "default"])),
            pointers: [{ name: "i", row: 0, col: n - 1 }],
          },
          delta: {}, isAnswer: false,
        });

        for (let i = n - 1; i >= 0; i--) {
          if (d[i] < 9) {
            d[i]++;
            steps.push({
              stepId: steps.length, lineNumbers: [3, 4, 5],
              shortLabel: `${d[i]-1} → ${d[i]}, done!`,
              explanation: `digits[${i}]=${d[i]-1} < 9. Increment to ${d[i]}. Return [${d.join(",")}].`,
              variables: { i, "digits[i]": d[i], result: `[${d.join(",")}]` },
              dataStructure: {
                matrix: [[...d]],
                cellStates: Object.fromEntries(d.map((_, j) => [`0,${j}`, "found"])),
                pointers: [],
              },
              delta: { changedCells: [`0,${i}`] }, isAnswer: true,
            });
            return steps;
          }
          d[i] = 0;
          steps.push({
            stepId: steps.length, lineNumbers: [7],
            shortLabel: "9 → 0, carry",
            explanation: `digits[${i}]=9 → 0. Carry propagates left.`,
            variables: { i: i - 1, [`digits[${i}]`]: 0 },
            dataStructure: {
              matrix: [[...d]],
              cellStates: Object.fromEntries(d.map((_, j) => [`0,${j}`, j === i - 1 ? "active" : j >= i ? "visited" : "default"])),
              pointers: i > 0 ? [{ name: "i", row: 0, col: i - 1 }] : [],
            },
            delta: { changedCells: [`0,${i}`] }, isAnswer: false,
          });
        }

        const result = [1, ...d];
        steps.push({
          stepId: steps.length, lineNumbers: [9, 10],
          shortLabel: `Prepend 1 → [${result.join(",")}]`,
          explanation: `All digits were 9. Return [${result.join(",")}].`,
          variables: { result: `[${result.join(",")}]` },
          dataStructure: {
            matrix: [result],
            cellStates: Object.fromEntries(result.map((_, j) => [`0,${j}`, "found"])),
            pointers: [],
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n)", space: "O(1)", explanation: "Single right-to-left pass; in-place modification" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Same — this problem has a single optimal approach", tradeoff: "O(n) new array only needed in the all-9s edge case" },
  },

  interviewTips: [
    "This is a warm-up problem — solve it quickly and cleanly to build momentum.",
    "Mention the all-9s edge case unprompted — it shows thoroughness.",
    "Don't convert to integer and back — that defeats the purpose of the array representation.",
    "Point out the early return optimization: most numbers don't require full traversal.",
    "If asked for follow-up, discuss adding arbitrary k instead of just 1.",
  ],

  relatedProblems: ["multiply-strings", "add-two-numbers"],
};
