export const maximumProductSubarray = {
  id: 109,
  slug: "maximum-product-subarray",
  title: "Maximum Product Subarray",
  difficulty: "Medium",
  topic: "dp-1d",
  topicLabel: "1-D Dynamic Programming",
  neetcodeNumber: 109,
  artifactType: "DPTable1D",
  companies: ["Amazon", "Google", "Microsoft", "LinkedIn", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/maximum-product-subarray/",

  pattern: "Track Min and Max DP",
  patternExplanation: `When computing maximum products, a negative number can flip the minimum into the
    maximum. Track both the running maximum and minimum product ending at each position. At each step,
    the new max is the largest of: current element, current * prevMax, current * prevMin.`,

  intuition: {
    coreInsight: `Unlike maximum sum subarray (Kadane's), products have a twist: multiplying two
      negatives gives a positive. A very negative product at position i can become the maximum product
      at position i+1 if nums[i+1] is also negative. So we must track BOTH the running max AND
      running min product at every position. The answer is the global maximum across all positions.`,

    mentalModel: `Imagine riding a roller coaster where your score multiplies at each segment. A
      negative segment flips your score's sign. If you're deeply negative and hit another negative,
      you soar to a high positive! That's why you must remember both your highest high and lowest
      low — either one could become the new champion after the next multiplication.`,

    whyNaiveFails: `Brute force checks all O(n^2) subarrays and computes their products, giving
      O(n^2) or O(n^3) time. A naive Kadane's approach (just tracking max) fails because it
      discards negative products that could become massive positives. For [-2, 3, -4], tracking
      only max gives 3, but the true answer is (-2)*3*(-4) = 24.`,

    keyObservation: `At each position, the maximum product subarray ending here is one of three
      things: (1) the element alone (starting fresh), (2) prevMax * current (extending a positive
      streak), or (3) prevMin * current (two negatives making a positive). We compute both
      newMax = max(nums[i], prevMax*nums[i], prevMin*nums[i]) and newMin = min(same three).
      Zero resets both to the current element.`,
  },

  problem: `Given an integer array nums, find a subarray that has the largest product, and return
    the product. A subarray is a contiguous non-empty sequence of elements. The test cases are
    generated so the answer fits in a 32-bit integer.`,

  examples: [
    { input: "nums = [2,3,-2,4]", output: "6", explanation: "The subarray [2,3] has the largest product 6." },
    { input: "nums = [-2,0,-1]", output: "0", explanation: "The result cannot be 2, because [-2,-1] is not a subarray (0 is in between)." },
    { input: "nums = [-2,3,-4]", output: "24", explanation: "The entire array [-2,3,-4] = 24." },
  ],

  constraints: [
    "1 <= nums.length <= 2 * 10^4",
    "-10 <= nums[i] <= 10",
    "The product of any subarray fits in a 32-bit integer.",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      idea: "Check every subarray, compute its product, and track the maximum.",

      javaCode: `public int maxProduct(int[] nums) {
    int result = nums[0];

    for (int i = 0; i < nums.length; i++) {
        int product = 1;
        for (int j = i; j < nums.length; j++) {
            product *= nums[j];
            result = Math.max(result, product);
        }
    }

    return result;
}`,

      cppCode: `int maxProduct(vector<int>& nums) {
    int result = nums[0];

    for (int i = 0; i < nums.size(); i++) {
        int product = 1;
        for (int j = i; j < nums.size(); j++) {
            product *= nums[j];
            result = max(result, product);
        }
    }

    return result;
}`,

      pythonCode: `def maxProduct(nums: List[int]) -> int:
    result = nums[0]

    for i in range(len(nums)):
        product = 1
        for j in range(i, len(nums)):
            product *= nums[j]
            result = max(result, product)

    return result`,

      lineAnnotations: {
        2: "Initialize result with first element",
        4: "Fix start of subarray",
        5: "Running product for current subarray",
        6: "Extend subarray one element at a time",
        7: "Multiply current element into product",
        8: "Update global maximum",
        11: "Return the best product found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [2, 3, -2, 4] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 4],
              shortLabel: "Start i=0",
              explanation: "Initialize result=2 (first element). Start from i=0, trying all subarrays beginning at index 0.",
              variables: { i: 0, result: 2 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "result = 2",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8],
              shortLabel: "Subarrays from i=0",
              explanation: "[2]=2, [2,3]=6 (new max!), [2,3,-2]=-12, [2,3,-2,4]=-48. Best so far: 6.",
              variables: { i: 0, products: "[2, 6, -12, -48]", result: 6 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "max product starting at 0: [2,3] = 6",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 6, 7, 8],
              shortLabel: "Subarrays from i=1,2,3",
              explanation: "i=1: [3]=3, [3,-2]=-6, [3,-2,4]=-24. i=2: [-2]=-2, [-2,4]=-8. i=3: [4]=4. None beat 6.",
              variables: { result: 6 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "No subarray beats 6",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11],
              shortLabel: "Return 6",
              explanation: "Return 6. The subarray [2,3] has the largest product. The negative element breaks the positive streak.",
              variables: { answer: 6 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Answer: max product = 6",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        let result = nums[0];

        steps.push({
          stepId: 0,
          lineNumbers: [2],
          shortLabel: `Init result=${nums[0]}`,
          explanation: `Initialize result with nums[0]=${nums[0]}.`,
          variables: { result, i: "-", j: "-", product: "-" },
          dataStructure: {
            dpArray: [...nums],
            dpHighlight: null,
            dpArrows: [],
            dpFormula: `result = ${nums[0]}`,
          },
          delta: {},
          isAnswer: false,
        });

        for (let i = 0; i < nums.length; i++) {
          let product = 1;
          for (let j = i; j < nums.length; j++) {
            product *= nums[j];
            const oldResult = result;
            result = Math.max(result, product);

            const arrayStates = {};
            for (let k = 0; k < nums.length; k++) {
              if (k >= i && k <= j) arrayStates[k] = product === result && result > oldResult ? "found" : "active";
              else if (k < i) arrayStates[k] = "visited";
              else arrayStates[k] = "default";
            }

            steps.push({
              stepId: steps.length,
              lineNumbers: [6, 7, 8],
              shortLabel: `[${i}..${j}]: prod=${product}, result=${result}`,
              explanation: `Subarray [${i}..${j}]: product = ${product}. result = max(${oldResult}, ${product}) = ${result}.${result > oldResult ? " New best!" : ""}`,
              variables: { result, i, j, product },
              dataStructure: {
                dpArray: [...nums],
                dpHighlight: j,
                dpArrows: [],
                dpFormula: `product([${i}..${j}]) = ${product}, result = ${result}`,
                arrayStates,
                pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
              },
              delta: { changedIndices: [j] },
              isAnswer: false,
            });
          }
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [11],
          shortLabel: `Return ${result}`,
          explanation: `All subarrays checked. Maximum product is ${result}.`,
          variables: { answer: result },
          dataStructure: {
            dpArray: [...nums],
            dpHighlight: null,
            dpArrows: [],
            dpFormula: `Answer: ${result}`,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Track Min/Max DP",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Track running max and min product at each position. At each element:
        newMax = max(nums[i], prevMax*nums[i], prevMin*nums[i]),
        newMin = min(same three). Update global result with newMax.`,

      javaCode: `public int maxProduct(int[] nums) {
    int result = nums[0];
    int curMax = 1;
    int curMin = 1;

    for (int num : nums) {
        int tempMax = curMax * num;
        int tempMin = curMin * num;

        curMax = Math.max(num, Math.max(tempMax, tempMin));
        curMin = Math.min(num, Math.min(tempMax, tempMin));

        result = Math.max(result, curMax);
    }

    return result;
}`,

      cppCode: `int maxProduct(vector<int>& nums) {
    int result = nums[0];
    int curMax = 1;
    int curMin = 1;

    for (int num : nums) {
        int tempMax = curMax * num;
        int tempMin = curMin * num;

        curMax = max({num, tempMax, tempMin});
        curMin = min({num, tempMax, tempMin});

        result = max(result, curMax);
    }

    return result;
}`,

      pythonCode: `def maxProduct(nums: List[int]) -> int:
    result = nums[0]
    cur_max = 1
    cur_min = 1

    for num in nums:
        temp_max = cur_max * num
        temp_min = cur_min * num

        cur_max = max(num, temp_max, temp_min)
        cur_min = min(num, temp_max, temp_min)

        result = max(result, cur_max)

    return result`,

      lineAnnotations: {
        2: "Global maximum — answer we're building",
        3: "Running maximum product ending at current position",
        4: "Running minimum product ending at current position (for negative flips)",
        6: "Iterate through each element",
        7: "Tentative max if we extend the max subarray",
        8: "Tentative min if we extend the min subarray",
        10: "New max: start fresh, extend max, or extend min (negative flip!)",
        11: "New min: start fresh, extend max (if num negative), or extend min",
        13: "Update global result with current max",
        16: "Return the best product seen",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "[2,3,-2,4] — negative breaks streak",
          input: { nums: [2, 3, -2, 4] },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init: result=2, curMax=1, curMin=1",
              explanation: "Initialize result to nums[0]=2. Set curMax=1 and curMin=1 as identity values before we start multiplying.",
              variables: { result: 2, curMax: 1, curMin: 1 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "result=2, curMax=1, curMin=1",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=2: curMax=2, curMin=2",
              explanation: "num=2: tempMax=1*2=2, tempMin=1*2=2. curMax=max(2,2,2)=2. curMin=min(2,2,2)=2. result=max(2,2)=2. Starting fresh with the first element.",
              variables: { num: 2, tempMax: 2, tempMin: 2, curMax: 2, curMin: 2, result: 2 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "curMax=2, curMin=2, result=2",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=3: curMax=6, result=6",
              explanation: "num=3: tempMax=2*3=6, tempMin=2*3=6. curMax=max(3,6,6)=6. curMin=min(3,6,6)=3. result=max(2,6)=6. Product [2,3]=6 is the new best!",
              variables: { num: 3, tempMax: 6, tempMin: 6, curMax: 6, curMin: 3, result: 6 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: 1,
                dpArrows: [{ from: 0, to: 1 }],
                dpFormula: "curMax=6 (2*3), curMin=3, result=6",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=-2: curMax=-2, curMin=-12",
              explanation: "num=-2: tempMax=6*(-2)=-12, tempMin=3*(-2)=-6. curMax=max(-2,-12,-6)=-2 (start fresh!). curMin=min(-2,-12,-6)=-12. result=max(6,-2)=6. The negative breaks the streak — curMax resets. But curMin=-12 remembers the negative product for a potential future flip.",
              variables: { num: -2, tempMax: -12, tempMin: -6, curMax: -2, curMin: -12, result: 6 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: 2,
                dpArrows: [],
                dpFormula: "curMax=-2 (fresh start), curMin=-12 (saved!), result=6",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=4: curMax=4, result=6",
              explanation: "num=4: tempMax=(-2)*4=-8, tempMin=(-12)*4=-48. curMax=max(4,-8,-48)=4 (start fresh again). curMin=min(4,-8,-48)=-48. result=max(6,4)=6. The 4 alone doesn't beat [2,3]=6.",
              variables: { num: 4, tempMax: -8, tempMin: -48, curMax: 4, curMin: -48, result: 6 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: 3,
                dpArrows: [],
                dpFormula: "curMax=4, curMin=-48, result=6",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [16],
              shortLabel: "Return 6",
              explanation: "Return result=6. The maximum product subarray is [2,3] with product 6. The -2 in the middle prevented the entire array from being the answer.",
              variables: { answer: 6 },
              dataStructure: {
                dpArray: [2, 3, -2, 4],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Answer: 6",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Double Negative",
          description: "[-2,3,-4] — two negatives make a positive",
          input: { nums: [-2, 3, -4] },
          expectedOutput: "24",
          commonMistake: "A naive Kadane's (max-only) approach would return 3, missing that (-2)*3*(-4)=24. You MUST track the minimum product to catch negative-times-negative flips.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init: result=-2, curMax=1, curMin=1",
              explanation: "Initialize result=-2 (first element, which is negative). curMax=1, curMin=1.",
              variables: { result: -2, curMax: 1, curMin: 1 },
              dataStructure: {
                dpArray: [-2, 3, -4],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "result=-2, curMax=1, curMin=1",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=-2: curMax=-2, curMin=-2",
              explanation: "num=-2: tempMax=1*(-2)=-2, tempMin=1*(-2)=-2. curMax=max(-2,-2,-2)=-2. curMin=min(-2,-2,-2)=-2. result=max(-2,-2)=-2.",
              variables: { num: -2, curMax: -2, curMin: -2, result: -2 },
              dataStructure: {
                dpArray: [-2, 3, -4],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "curMax=-2, curMin=-2, result=-2",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=3: curMax=3, curMin=-6",
              explanation: "num=3: tempMax=(-2)*3=-6, tempMin=(-2)*3=-6. curMax=max(3,-6,-6)=3 (start fresh). curMin=min(3,-6,-6)=-6. result=max(-2,3)=3. curMin=-6 is critical — it remembers [-2,3].",
              variables: { num: 3, curMax: 3, curMin: -6, result: 3 },
              dataStructure: {
                dpArray: [-2, 3, -4],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "curMax=3, curMin=-6 (saved for potential flip!)",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=-4: curMin*(-4)=24! result=24",
              explanation: "num=-4: tempMax=3*(-4)=-12, tempMin=(-6)*(-4)=24. curMax=max(-4,-12,24)=24! The negative minimum flipped to a massive positive! curMin=min(-4,-12,24)=-12. result=max(3,24)=24.",
              variables: { num: -4, tempMax: -12, tempMin: 24, curMax: 24, curMin: -12, result: 24 },
              dataStructure: {
                dpArray: [-2, 3, -4],
                dpHighlight: 2,
                dpArrows: [{ from: 0, to: 2 }],
                dpFormula: "curMin*(-4) = (-6)*(-4) = 24! Negative flip!",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16],
              shortLabel: "Return 24",
              explanation: "Return 24. The entire array [-2,3,-4] = 24. Two negatives cancel out! This is why tracking the minimum is essential — without it, we'd return 3.",
              variables: { answer: 24 },
              dataStructure: {
                dpArray: [-2, 3, -4],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Answer: 24 (entire array)",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Contains Zero",
          description: "[-2,0,-1] — zero breaks the chain",
          input: { nums: [-2, 0, -1] },
          expectedOutput: "0",
          commonMistake: "Thinking the answer is 2 from [-2]*[-1]. But [-2] and [-1] are not contiguous without the 0 in between. Zero forces both curMax and curMin to reset.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Init: result=-2",
              explanation: "result=-2. curMax=1, curMin=1.",
              variables: { result: -2, curMax: 1, curMin: 1 },
              dataStructure: {
                dpArray: [-2, 0, -1],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "result=-2",
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=-2: curMax=-2, curMin=-2",
              explanation: "num=-2: curMax=max(-2,-2,-2)=-2. curMin=-2. result=max(-2,-2)=-2.",
              variables: { num: -2, curMax: -2, curMin: -2, result: -2 },
              dataStructure: {
                dpArray: [-2, 0, -1],
                dpHighlight: 0,
                dpArrows: [],
                dpFormula: "curMax=-2, curMin=-2",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=0: everything resets to 0",
              explanation: "num=0: tempMax=(-2)*0=0, tempMin=(-2)*0=0. curMax=max(0,0,0)=0. curMin=min(0,0,0)=0. result=max(-2,0)=0. Zero kills any running product — both max and min reset.",
              variables: { num: 0, curMax: 0, curMin: 0, result: 0 },
              dataStructure: {
                dpArray: [-2, 0, -1],
                dpHighlight: 1,
                dpArrows: [],
                dpFormula: "Zero resets everything! curMax=0, curMin=0",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 10, 11, 13],
              shortLabel: "num=-1: curMax=0, curMin=-1",
              explanation: "num=-1: tempMax=0*(-1)=0, tempMin=0*(-1)=0. curMax=max(-1,0,0)=0. curMin=min(-1,0,0)=-1. result=max(0,0)=0. The -1 alone is worse than 0.",
              variables: { num: -1, curMax: 0, curMin: -1, result: 0 },
              dataStructure: {
                dpArray: [-2, 0, -1],
                dpHighlight: 2,
                dpArrows: [],
                dpFormula: "curMax=0, result stays 0",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16],
              shortLabel: "Return 0",
              explanation: "Return 0. The subarray [0] (just the zero) has the largest product. [-2] and [-1] are both negative, and they can't be combined because 0 separates them.",
              variables: { answer: 0 },
              dataStructure: {
                dpArray: [-2, 0, -1],
                dpHighlight: null,
                dpArrows: [],
                dpFormula: "Answer: 0",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        let result = nums[0];
        let curMax = 1;
        let curMin = 1;

        steps.push({
          stepId: 0,
          lineNumbers: [2, 3, 4],
          shortLabel: `Init: result=${result}, curMax=1, curMin=1`,
          explanation: `Initialize result=${result} (first element). curMax=1 and curMin=1 as multiplicative identities.`,
          variables: { result, curMax, curMin },
          dataStructure: {
            dpArray: [...nums],
            dpHighlight: null,
            dpArrows: [],
            dpFormula: `result=${result}, curMax=1, curMin=1`,
          },
          delta: {},
          isAnswer: false,
        });

        for (let idx = 0; idx < nums.length; idx++) {
          const num = nums[idx];
          const tempMax = curMax * num;
          const tempMin = curMin * num;

          curMax = Math.max(num, tempMax, tempMin);
          curMin = Math.min(num, tempMax, tempMin);
          result = Math.max(result, curMax);

          steps.push({
            stepId: steps.length,
            lineNumbers: [6, 7, 8, 10, 11, 13],
            shortLabel: `num=${num}: curMax=${curMax}, result=${result}`,
            explanation: `num=${num}: tempMax=${tempMax}, tempMin=${tempMin}. curMax=max(${num},${tempMax},${tempMin})=${curMax}. curMin=min(${num},${tempMax},${tempMin})=${curMin}. result=max(${result === curMax ? result : result + "," + curMax})=${result}.`,
            variables: { num, tempMax, tempMin, curMax, curMin, result },
            dataStructure: {
              dpArray: [...nums],
              dpHighlight: idx,
              dpArrows: [],
              dpFormula: `curMax=${curMax}, curMin=${curMin}, result=${result}`,
            },
            delta: { changedIndices: [idx] },
            isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length,
          lineNumbers: [16],
          shortLabel: `Return ${result}`,
          explanation: `Return ${result}. The maximum product subarray has product ${result}.`,
          variables: { answer: result },
          dataStructure: {
            dpArray: [...nums],
            dpHighlight: null,
            dpArrows: [],
            dpFormula: `Answer: ${result}`,
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n^2)", space: "O(1)", explanation: "Check all O(n^2) subarrays" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass tracking curMax, curMin, and result — three variables", tradeoff: "The insight is tracking min product alongside max product" },
  },

  interviewTips: [
    "Start by mentioning how this differs from Maximum Subarray (Kadane's): products have negative flips.",
    "Explicitly state: 'I need to track both max AND min because a negative times a negative is positive.'",
    "Walk through [-2,3,-4] to demonstrate the negative flip: curMin=(-2)*3=-6, then (-6)*(-4)=24.",
    "Handle the zero case: zero resets both running products to 0 (since 0 * anything = 0).",
    "Mention the edge case: single-element array — the answer is that element.",
  ],

  relatedProblems: ["maximum-subarray", "house-robber", "product-except-self"],
};
