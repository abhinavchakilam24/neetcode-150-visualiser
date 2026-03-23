export const productExceptSelf = {
  id: 7,
  slug: "product-except-self",
  title: "Product of Array Except Self",
  difficulty: "Medium",
  topic: "arrays-hashing",
  topicLabel: "Arrays & Hashing",
  neetcodeNumber: 7,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Meta", "Apple", "Microsoft", "Google"],
  leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/",

  pattern: "Prefix/Suffix Products",
  patternExplanation: `Build cumulative products from both directions. The product of all elements
    except self at index i equals the product of everything to its left multiplied by the product
    of everything to its right. Two linear passes replace the need for division or nested loops.`,

  intuition: {
    coreInsight: `For each index i, answer[i] is the product of all elements before i times the
      product of all elements after i. If we precompute prefix products (left-to-right) and suffix
      products (right-to-left), we can combine them in O(1) per index. The key insight: we don't
      need the total product — we need to exclude exactly one element, and prefix/suffix splits
      do that naturally without division.`,

    mentalModel: `Imagine a row of factory workers on an assembly line. Each worker needs to know
      the combined output of every OTHER worker. Instead of each worker surveying the entire line
      (O(n) per worker = O(n²) total), the manager walks left-to-right whispering "everyone before
      you produced X total," then walks right-to-left whispering "everyone after you produced Y
      total." Each worker multiplies X × Y. Two walks, done. The prefix array is the left walk,
      the suffix pass is the right walk.`,

    whyNaiveFails: `Brute force computes the product of all other elements for each index — that's
      n-1 multiplications repeated n times = O(n²). For n=100,000, that's 10 billion operations.
      You might think "just divide total product by nums[i]" — but the problem explicitly forbids
      division, and zeros in the array would cause division-by-zero errors anyway.`,

    keyObservation: `We can do the suffix pass in-place by accumulating a running suffix product
      from right to left directly into the answer array (which already holds prefix products).
      This reduces extra space from O(n) to O(1) — the output array doesn't count as extra space
      per the problem's convention.`,
  },

  problem: `Given an integer array nums, return an array answer such that answer[i] is equal to
    the product of all the elements of nums except nums[i]. You must write an algorithm that runs
    in O(n) time and without using the division operation.`,

  examples: [
    { input: "nums = [1,2,3,4]", output: "[24,12,8,6]", explanation: "answer[0]=2*3*4=24, answer[1]=1*3*4=12, answer[2]=1*2*4=8, answer[3]=1*2*3=6" },
    { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]", explanation: "answer[2]=(-1)*1*(-3)*3=9, all others include the 0 so they become 0" },
  ],

  constraints: [
    "2 <= nums.length <= 10^5",
    "-30 <= nums[i] <= 30",
    "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
    "You must write an algorithm that runs in O(n) time and without using the division operation.",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      idea: "For each element, multiply all other elements together to get the product except self.",

      javaCode: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] answer = new int[n];

    for (int i = 0; i < n; i++) {
        int product = 1;
        for (int j = 0; j < n; j++) {
            if (j != i) {
                product *= nums[j];
            }
        }
        answer[i] = product;
    }

    return answer;
}`,

      cppCode: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> answer(n);

    for (int i = 0; i < n; i++) {
        int product = 1;
        for (int j = 0; j < n; j++) {
            if (j != i) {
                product *= nums[j];
            }
        }
        answer[i] = product;
    }

    return answer;
}`,

      pythonCode: `def productExceptSelf(nums: List[int]) -> List[int]:
    n = len(nums)
    answer = [0] * n

    for i in range(n):
        product = 1
        for j in range(n):
            if j != i:
                product *= nums[j]
        answer[i] = product

    return answer`,

      lineAnnotations: {
        2: "Get array length",
        3: "Create result array",
        5: "For each index i, compute product of all others",
        6: "Start with product = 1",
        7: "Inner loop: iterate over every element",
        8: "Skip the current index i",
        9: "Multiply all other elements together",
        12: "Store the product for index i",
        15: "Return the completed answer array",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [1, 2, 3, 4] },
          expectedOutput: "[24, 12, 8, 6]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init answer array",
              explanation: "Create an answer array of length 4. We'll compute each answer[i] by multiplying all elements except nums[i].",
              variables: { n: 4, answer: "[0, 0, 0, 0]" },
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
              lineNumbers: [5, 6],
              shortLabel: "i=0: start product=1",
              explanation: "Computing answer[0]. We need the product of all elements except nums[0]=1. Initialize product=1.",
              variables: { i: 0, product: 1, "nums[i]": 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 9],
              shortLabel: "i=0: multiply j=1,2,3",
              explanation: "Skip j=0 (same as i). Multiply: 1 × nums[1]=2 → 2, × nums[2]=3 → 6, × nums[3]=4 → 24. answer[0] = 24.",
              variables: { i: 0, product: 24, "nums[i]": 1, answer: "[24, 0, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "visited", 3: "visited" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "answer[0]": { value: 24, isNew: true } },
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 8, 9, 12],
              shortLabel: "i=1: product = 1×3×4 = 12",
              explanation: "Computing answer[1]. Skip j=1. Multiply: 1 × nums[0]=1 → 1, × nums[2]=3 → 3, × nums[3]=4 → 12. answer[1] = 12.",
              variables: { i: 1, product: 12, "nums[i]": 2, answer: "[24, 12, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "visited", 3: "visited" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "answer[0]": { value: 24 }, "answer[1]": { value: 12, isNew: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 7, 8, 9, 12],
              shortLabel: "i=2: product = 1×2×4 = 8",
              explanation: "Computing answer[2]. Skip j=2. Multiply: 1 × nums[0]=1 → 1, × nums[1]=2 → 2, × nums[3]=4 → 8. answer[2] = 8.",
              variables: { i: 2, product: 8, "nums[i]": 3, answer: "[24, 12, 8, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "visited" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "answer[0]": { value: 24 }, "answer[1]": { value: 12 }, "answer[2]": { value: 8, isNew: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7, 8, 9, 12],
              shortLabel: "i=3: product = 1×2×3 = 6",
              explanation: "Computing answer[3]. Skip j=3. Multiply: 1 × nums[0]=1 → 1, × nums[1]=2 → 2, × nums[2]=3 → 6. answer[3] = 6.",
              variables: { i: 3, product: 6, "nums[i]": 4, answer: "[24, 12, 8, 6]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "answer[0]": { value: 24 }, "answer[1]": { value: 12 }, "answer[2]": { value: 8 }, "answer[3]": { value: 6, isNew: true } },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [15],
              shortLabel: "Return [24, 12, 8, 6]",
              explanation: "All products computed. Return [24, 12, 8, 6]. This took O(n²) — for each of 4 elements, we scanned all 4 elements. The optimal solution does this in two passes.",
              variables: { answer: "[24, 12, 8, 6]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
                hashMap: { "answer[0]": { value: 24, isHighlighted: true }, "answer[1]": { value: 12, isHighlighted: true }, "answer[2]": { value: 8, isHighlighted: true }, "answer[3]": { value: 6, isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        const answer = new Array(n).fill(0);
        const defaultStates = () => Object.fromEntries(nums.map((_, i) => [i, "default"]));

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init answer array",
          explanation: `Create an answer array of length ${n}. We'll compute each answer[i] by multiplying all elements except nums[i].`,
          variables: { n, answer: JSON.stringify(answer) },
          dataStructure: {
            arrayStates: defaultStates(),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          let product = 1;
          for (let j = 0; j < n; j++) {
            if (j !== i) {
              product *= nums[j];
            }
          }
          answer[i] = product;

          const hashMap = {};
          for (let k = 0; k <= i; k++) {
            hashMap[`answer[${k}]`] = { value: answer[k], isNew: k === i };
          }

          steps.push({
            stepId: steps.length, lineNumbers: [5, 6, 7, 8, 9, 12],
            shortLabel: `i=${i}: product = ${product}`,
            explanation: `Computing answer[${i}]. Skip j=${i}. Multiply all other elements: product = ${product}. answer[${i}] = ${product}.`,
            variables: { i, product, "nums[i]": nums[i], answer: JSON.stringify(answer) },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j === i ? "active" : "visited"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap,
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        const finalHashMap = {};
        for (let k = 0; k < n; k++) {
          finalHashMap[`answer[${k}]`] = { value: answer[k], isHighlighted: true };
        }

        steps.push({
          stepId: steps.length, lineNumbers: [15],
          shortLabel: `Return [${answer.join(", ")}]`,
          explanation: `All products computed. Return [${answer.join(", ")}]. This took O(n²) time.`,
          variables: { answer: JSON.stringify(answer) },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "found"])),
            pointers: [],
            hashMap: finalHashMap,
          },
          delta: { changedIndices: nums.map((_, i) => i) }, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Prefix-Suffix",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Build prefix products left-to-right into the answer array, then multiply suffix
        products right-to-left in a second pass. Each element gets (product of all before it) ×
        (product of all after it). Output array doesn't count as extra space.`,

      javaCode: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] answer = new int[n];

    answer[0] = 1;
    for (int i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    int suffix = 1;
    for (int i = n - 2; i >= 0; i--) {
        suffix *= nums[i + 1];
        answer[i] *= suffix;
    }

    return answer;
}`,

      cppCode: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> answer(n);

    answer[0] = 1;
    for (int i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    int suffix = 1;
    for (int i = n - 2; i >= 0; i--) {
        suffix *= nums[i + 1];
        answer[i] *= suffix;
    }

    return answer;
}`,

      pythonCode: `def productExceptSelf(nums: List[int]) -> List[int]:
    n = len(nums)
    answer = [0] * n

    answer[0] = 1
    for i in range(1, n):
        answer[i] = answer[i - 1] * nums[i - 1]

    suffix = 1
    for i in range(n - 2, -1, -1):
        suffix *= nums[i + 1]
        answer[i] *= suffix

    return answer`,

      lineAnnotations: {
        2: "Get array length",
        3: "Create result array",
        5: "Base case: nothing to the left of index 0, so prefix = 1",
        6: "Left-to-right pass: build prefix products",
        7: "answer[i] = product of all elements before index i",
        10: "Initialize suffix accumulator to 1",
        11: "Right-to-left pass: multiply in suffix products",
        12: "Accumulate the product of elements to the right",
        13: "Multiply prefix (already stored) by suffix",
        16: "Return the final answer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Clean four-element array — see prefix and suffix passes clearly",
          input: { nums: [1, 2, 3, 4] },
          expectedOutput: "[24, 12, 8, 6]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init answer array",
              explanation: "Create answer array of length 4. We'll fill it in two passes: first with prefix products (left-to-right), then multiply by suffix products (right-to-left).",
              variables: { n: 4, answer: "[0, 0, 0, 0]" },
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
              lineNumbers: [5],
              shortLabel: "answer[0] = 1 (no prefix)",
              explanation: "There are no elements to the left of index 0, so the prefix product is 1. Set answer[0] = 1.",
              variables: { n: 4, answer: "[1, 0, 0, 0]", "answer[0]": 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7],
              shortLabel: "i=1: prefix = 1×1 = 1",
              explanation: "answer[1] = answer[0] × nums[0] = 1 × 1 = 1. The prefix product of everything before index 1 is just nums[0]=1.",
              variables: { i: 1, "answer[i-1]": 1, "nums[i-1]": 1, "answer[i]": 1, answer: "[1, 1, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: 1, isNew: true } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7],
              shortLabel: "i=2: prefix = 1×2 = 2",
              explanation: "answer[2] = answer[1] × nums[1] = 1 × 2 = 2. The prefix product of elements before index 2 is nums[0]×nums[1] = 1×2 = 2.",
              variables: { i: 2, "answer[i-1]": 1, "nums[i-1]": 2, "answer[i]": 2, answer: "[1, 1, 2, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: 1 }, "answer[2]": { value: 2, isNew: true } },
              },
              delta: { changedIndices: [2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7],
              shortLabel: "i=3: prefix = 2×3 = 6",
              explanation: "answer[3] = answer[2] × nums[2] = 2 × 3 = 6. The prefix product of elements before index 3 is 1×2×3 = 6. Prefix pass complete!",
              variables: { i: 3, "answer[i-1]": 2, "nums[i-1]": 3, "answer[i]": 6, answer: "[1, 1, 2, 6]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: 1 }, "answer[2]": { value: 2 }, "answer[3]": { value: 6, isNew: true } },
              },
              delta: { changedIndices: [3], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [10],
              shortLabel: "Init suffix = 1",
              explanation: "Start the right-to-left pass. Initialize suffix = 1. We'll accumulate the product of elements to the right of each index and multiply it into answer[i].",
              variables: { suffix: 1, answer: "[1, 1, 2, 6]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited" },
                pointers: [],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: 1 }, "answer[2]": { value: 2 }, "answer[3]": { value: 6 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12, 13],
              shortLabel: "i=2: suffix=4, answer[2]=2×4=8",
              explanation: "i=2: suffix = 1 × nums[3] = 1 × 4 = 4. answer[2] = answer[2] × suffix = 2 × 4 = 8. Now answer[2] has the full product of all elements except nums[2].",
              variables: { i: 2, suffix: 4, "nums[i+1]": 4, "answer[i]": 8, answer: "[1, 1, 8, 6]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "visited" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: 1 }, "answer[2]": { value: 8, isNew: true }, "answer[3]": { value: 6 } },
              },
              delta: { changedIndices: [2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [11, 12, 13],
              shortLabel: "i=1: suffix=12, answer[1]=1×12=12",
              explanation: "i=1: suffix = 4 × nums[2] = 4 × 3 = 12. answer[1] = answer[1] × suffix = 1 × 12 = 12. The product of all elements except nums[1]=2 is indeed 1×3×4=12.",
              variables: { i: 1, suffix: 12, "nums[i+1]": 3, "answer[i]": 12, answer: "[1, 12, 8, 6]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "visited", 3: "visited" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: 12, isNew: true }, "answer[2]": { value: 8 }, "answer[3]": { value: 6 } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [11, 12, 13],
              shortLabel: "i=0: suffix=24, answer[0]=1×24=24",
              explanation: "i=0: suffix = 12 × nums[1] = 12 × 2 = 24. answer[0] = answer[0] × suffix = 1 × 24 = 24. The product of all elements except nums[0]=1 is 2×3×4=24.",
              variables: { i: 0, suffix: 24, "nums[i+1]": 2, "answer[i]": 24, answer: "[24, 12, 8, 6]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "visited", 3: "visited" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "answer[0]": { value: 24, isNew: true }, "answer[1]": { value: 12 }, "answer[2]": { value: 8 }, "answer[3]": { value: 6 } },
              },
              delta: { changedIndices: [0], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [16],
              shortLabel: "Return [24, 12, 8, 6]",
              explanation: "Both passes complete. Return [24, 12, 8, 6]. Two O(n) passes = O(n) total time. Only one extra variable (suffix) beyond the output array = O(1) extra space.",
              variables: { answer: "[24, 12, 8, 6]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
                hashMap: { "answer[0]": { value: 24, isHighlighted: true }, "answer[1]": { value: 12, isHighlighted: true }, "answer[2]": { value: 8, isHighlighted: true }, "answer[3]": { value: 6, isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Contains Zero",
          description: "Array with a zero — tests that non-zero positions get zeroed out",
          input: { nums: [-1, 1, 0, -3, 3] },
          expectedOutput: "[0, 0, 9, 0, 0]",
          commonMistake: "Using division (total product / nums[i]) would cause division by zero here. The prefix-suffix approach handles zeros naturally because the zero gets multiplied into prefix or suffix for all other indices.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init answer array",
              explanation: "Create answer array of length 5. This array contains a zero at index 2 — division-based approaches would fail here, but prefix-suffix handles it naturally.",
              variables: { n: 5, answer: "[0, 0, 0, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5],
              shortLabel: "answer[0] = 1 (no prefix)",
              explanation: "No elements to the left of index 0. Set answer[0] = 1.",
              variables: { n: 5, "answer[0]": 1, answer: "[1, 0, 0, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7],
              shortLabel: "i=1: prefix = 1×(-1) = -1",
              explanation: "answer[1] = answer[0] × nums[0] = 1 × (-1) = -1. Prefix product before index 1 is just -1.",
              variables: { i: 1, "answer[i-1]": 1, "nums[i-1]": -1, "answer[i]": -1, answer: "[1, -1, 0, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: -1, isNew: true } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7],
              shortLabel: "i=2: prefix = -1×1 = -1",
              explanation: "answer[2] = answer[1] × nums[1] = -1 × 1 = -1. Prefix product before index 2 is (-1)×1 = -1.",
              variables: { i: 2, "answer[i-1]": -1, "nums[i-1]": 1, "answer[i]": -1, answer: "[1, -1, -1, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: -1 }, "answer[2]": { value: -1, isNew: true } },
              },
              delta: { changedIndices: [2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7],
              shortLabel: "i=3: prefix = -1×0 = 0",
              explanation: "answer[3] = answer[2] × nums[2] = -1 × 0 = 0. The zero at index 2 poisons the prefix product — everything after it gets a prefix of 0.",
              variables: { i: 3, "answer[i-1]": -1, "nums[i-1]": 0, "answer[i]": 0, answer: "[1, -1, -1, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: -1 }, "answer[2]": { value: -1 }, "answer[3]": { value: 0, isNew: true } },
              },
              delta: { changedIndices: [3], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7],
              shortLabel: "i=4: prefix = 0×(-3) = 0",
              explanation: "answer[4] = answer[3] × nums[3] = 0 × (-3) = 0. The zero continues to poison all subsequent prefixes. Prefix pass complete.",
              variables: { i: 4, "answer[i-1]": 0, "nums[i-1]": -3, "answer[i]": 0, answer: "[1, -1, -1, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: -1 }, "answer[2]": { value: -1 }, "answer[3]": { value: 0 }, "answer[4]": { value: 0, isNew: true } },
              },
              delta: { changedIndices: [4], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10],
              shortLabel: "Init suffix = 1",
              explanation: "Start right-to-left pass with suffix = 1. The suffix pass will also encounter the zero, zeroing out elements to its left.",
              variables: { suffix: 1, answer: "[1, -1, -1, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited" },
                pointers: [],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: -1 }, "answer[2]": { value: -1 }, "answer[3]": { value: 0 }, "answer[4]": { value: 0 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [11, 12, 13],
              shortLabel: "i=3: suffix=3, answer[3]=0×3=0",
              explanation: "i=3: suffix = 1 × nums[4] = 1 × 3 = 3. answer[3] = 0 × 3 = 0. The prefix was already 0 (from the zero at index 2), so the final answer stays 0.",
              variables: { i: 3, suffix: 3, "nums[i+1]": 3, "answer[i]": 0, answer: "[1, -1, -1, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "visited" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: -1 }, "answer[2]": { value: -1 }, "answer[3]": { value: 0 }, "answer[4]": { value: 0 } },
              },
              delta: { changedIndices: [3], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [11, 12, 13],
              shortLabel: "i=2: suffix=-9, answer[2]=-1×(-9)=9",
              explanation: "i=2: suffix = 3 × nums[3] = 3 × (-3) = -9. answer[2] = (-1) × (-9) = 9. Index 2 is the zero — its answer is the product of all non-zero elements: (-1)×1×(-3)×3 = 9.",
              variables: { i: 2, suffix: -9, "nums[i+1]": -3, "answer[i]": 9, answer: "[1, -1, 9, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "visited", 4: "visited" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: -1 }, "answer[2]": { value: 9, isNew: true }, "answer[3]": { value: 0 }, "answer[4]": { value: 0 } },
              },
              delta: { changedIndices: [2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [11, 12, 13],
              shortLabel: "i=1: suffix=0, answer[1]=-1×0=0",
              explanation: "i=1: suffix = -9 × nums[2] = -9 × 0 = 0. The zero at index 2 poisons the suffix. answer[1] = (-1) × 0 = 0. Any index that has the zero in its product range gets zeroed.",
              variables: { i: 1, suffix: 0, "nums[i+1]": 0, "answer[i]": 0, answer: "[1, 0, 9, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "visited", 3: "visited", 4: "visited" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: 0, isNew: true }, "answer[2]": { value: 9 }, "answer[3]": { value: 0 }, "answer[4]": { value: 0 } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [11, 12, 13],
              shortLabel: "i=0: suffix=0, answer[0]=1×0=0",
              explanation: "i=0: suffix = 0 × nums[1] = 0 × 1 = 0. answer[0] = 1 × 0 = 0. Once the suffix includes the zero, everything to its left gets zeroed too.",
              variables: { i: 0, suffix: 0, "nums[i+1]": 1, "answer[i]": 0, answer: "[0, 0, 9, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited", 2: "visited", 3: "visited", 4: "visited" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "answer[0]": { value: 0, isNew: true }, "answer[1]": { value: 0 }, "answer[2]": { value: 9 }, "answer[3]": { value: 0 }, "answer[4]": { value: 0 } },
              },
              delta: { changedIndices: [0], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [16],
              shortLabel: "Return [0, 0, 9, 0, 0]",
              explanation: "Done! Return [0, 0, 9, 0, 0]. Only answer[2] (the position of the zero) is non-zero, because it's the only position whose product doesn't include the zero itself.",
              variables: { answer: "[0, 0, 9, 0, 0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found" },
                pointers: [],
                hashMap: { "answer[0]": { value: 0, isHighlighted: true }, "answer[1]": { value: 0, isHighlighted: true }, "answer[2]": { value: 9, isHighlighted: true }, "answer[3]": { value: 0, isHighlighted: true }, "answer[4]": { value: 0, isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1, 2, 3, 4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Two Elements",
          description: "Minimum array size — each element is the other's answer",
          input: { nums: [3, 5] },
          expectedOutput: "[5, 3]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init answer array",
              explanation: "Create answer array of length 2. With only two elements, answer[0] = nums[1] and answer[1] = nums[0].",
              variables: { n: 2, answer: "[0, 0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5],
              shortLabel: "answer[0] = 1",
              explanation: "No elements before index 0. Set answer[0] = 1.",
              variables: { "answer[0]": 1, answer: "[1, 0]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1, isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7],
              shortLabel: "i=1: prefix = 1×3 = 3",
              explanation: "answer[1] = answer[0] × nums[0] = 1 × 3 = 3. Prefix pass complete.",
              variables: { i: 1, "answer[i]": 3, answer: "[1, 3]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "answer[0]": { value: 1 }, "answer[1]": { value: 3, isNew: true } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11, 12, 13],
              shortLabel: "i=0: suffix=5, answer[0]=1×5=5",
              explanation: "suffix = 1 × nums[1] = 5. answer[0] = 1 × 5 = 5. Suffix pass complete with just one iteration.",
              variables: { i: 0, suffix: 5, "answer[i]": 5, answer: "[5, 3]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "visited" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "answer[0]": { value: 5, isNew: true }, "answer[1]": { value: 3 } },
              },
              delta: { changedIndices: [0], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16],
              shortLabel: "Return [5, 3]",
              explanation: "Return [5, 3]. Each element is simply the other element. Two passes still work correctly for the minimum-size case.",
              variables: { answer: "[5, 3]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found" },
                pointers: [],
                hashMap: { "answer[0]": { value: 5, isHighlighted: true }, "answer[1]": { value: 3, isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums }) {
        const steps = [];
        const n = nums.length;
        const answer = new Array(n).fill(0);

        const buildHashMap = (ans) => {
          const hm = {};
          for (let k = 0; k < ans.length; k++) {
            hm[`answer[${k}]`] = { value: ans[k] };
          }
          return hm;
        };

        // Init step
        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Init answer array",
          explanation: `Create answer array of length ${n}. Two passes: prefix products left-to-right, then suffix products right-to-left.`,
          variables: { n, answer: JSON.stringify(answer) },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        // Prefix pass: answer[0] = 1
        answer[0] = 1;
        const hm1 = buildHashMap(answer);
        hm1["answer[0]"] = { value: 1, isNew: true };
        steps.push({
          stepId: steps.length, lineNumbers: [5],
          shortLabel: "answer[0] = 1 (no prefix)",
          explanation: "No elements to the left of index 0. Set answer[0] = 1.",
          variables: { n, "answer[0]": 1, answer: JSON.stringify(answer) },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, i === 0 ? "active" : "default"])),
            pointers: [{ name: "i", index: 0, color: "pointer" }],
            hashMap: hm1,
          },
          delta: { changedIndices: [0] }, isAnswer: false,
        });

        // Prefix pass: i = 1 to n-1
        for (let i = 1; i < n; i++) {
          answer[i] = answer[i - 1] * nums[i - 1];
          const hm = buildHashMap(answer);
          hm[`answer[${i}]`] = { value: answer[i], isNew: true };
          steps.push({
            stepId: steps.length, lineNumbers: [6, 7],
            shortLabel: `i=${i}: prefix = ${answer[i - 1]}×${nums[i - 1]} = ${answer[i]}`,
            explanation: `answer[${i}] = answer[${i - 1}] × nums[${i - 1}] = ${answer[i - 1]} × ${nums[i - 1]} = ${answer[i]}. Prefix product of elements before index ${i}.`,
            variables: { i, "answer[i-1]": answer[i - 1], "nums[i-1]": nums[i - 1], "answer[i]": answer[i], answer: JSON.stringify(answer) },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: hm,
            },
            delta: { changedIndices: [i], movedPointers: ["i"] }, isAnswer: false,
          });
        }

        // Suffix init
        steps.push({
          stepId: steps.length, lineNumbers: [10],
          shortLabel: "Init suffix = 1",
          explanation: "Start right-to-left pass with suffix = 1. We'll accumulate the product of elements to the right and multiply into each answer[i].",
          variables: { suffix: 1, answer: JSON.stringify(answer) },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "visited"])),
            pointers: [],
            hashMap: buildHashMap(answer),
          },
          delta: {}, isAnswer: false,
        });

        // Suffix pass: i = n-2 down to 0
        let suffix = 1;
        for (let i = n - 2; i >= 0; i--) {
          suffix *= nums[i + 1];
          answer[i] *= suffix;
          const hm = buildHashMap(answer);
          hm[`answer[${i}]`] = { value: answer[i], isNew: true };
          steps.push({
            stepId: steps.length, lineNumbers: [11, 12, 13],
            shortLabel: `i=${i}: suffix=${suffix}, answer[${i}]=${answer[i]}`,
            explanation: `i=${i}: suffix = suffix × nums[${i + 1}] = ${suffix}. answer[${i}] = prefix × suffix = ${answer[i]}.`,
            variables: { i, suffix, "nums[i+1]": nums[i + 1], "answer[i]": answer[i], answer: JSON.stringify(answer) },
            dataStructure: {
              arrayStates: Object.fromEntries(nums.map((_, j) => [j, j === i ? "active" : "visited"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: hm,
            },
            delta: { changedIndices: [i], movedPointers: ["i"] }, isAnswer: false,
          });
        }

        // Final return step
        const finalHm = {};
        for (let k = 0; k < n; k++) {
          finalHm[`answer[${k}]`] = { value: answer[k], isHighlighted: true };
        }
        steps.push({
          stepId: steps.length, lineNumbers: [16],
          shortLabel: `Return [${answer.join(", ")}]`,
          explanation: `Both passes complete. Return [${answer.join(", ")}]. Two O(n) passes = O(n) total time, O(1) extra space.`,
          variables: { answer: JSON.stringify(answer) },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "found"])),
            pointers: [],
            hashMap: finalHm,
          },
          delta: { changedIndices: nums.map((_, i) => i) }, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n²)", space: "O(n)", explanation: "For each of n elements, multiply all other n-1 elements" },
    optimal: { time: "O(n)",  space: "O(1)", explanation: "Two linear passes; output array doesn't count as extra space", tradeoff: "Clever prefix/suffix decomposition eliminates nested loops entirely — no extra space needed beyond the output" },
  },

  interviewTips: [
    "Immediately clarify: 'No division allowed' — this rules out the obvious total-product / nums[i] approach.",
    "Mention the brute force O(n²) approach first, then explain why prefix/suffix is O(n).",
    "Explain why the output array doesn't count as extra space — it's the required output.",
    "Handle the zero case verbally: 'If there's a zero, only the zero's position gets a non-zero answer.'",
    "If asked about follow-up O(1) space, explain the suffix variable trick — accumulate right-to-left into the answer array.",
    "Articulate the two-pass structure clearly: 'First pass builds prefix products, second pass multiplies in suffix products.'",
  ],

  relatedProblems: ["two-sum", "contains-duplicate", "valid-anagram"],
};
