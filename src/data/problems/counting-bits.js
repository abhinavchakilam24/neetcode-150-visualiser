export const countingBits = {
  id: 145,
  slug: "counting-bits",
  title: "Counting Bits",
  difficulty: "Easy",
  topic: "bit-manipulation",
  topicLabel: "Bit Manipulation",
  neetcodeNumber: 145,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Apple", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/counting-bits/",

  pattern: "DP with Bit Manipulation",
  patternExplanation: `The number of 1-bits in a number can be derived from a previously computed
    result. Using dp[i] = dp[i >> 1] + (i & 1), we build the answer for every number from 0 to n
    in O(n) time by reusing earlier results.`,

  intuition: {
    coreInsight: `Every number i is just i >> 1 (right-shift, i.e., i / 2) with one extra bit appended.
      If that extra bit is 1 (i is odd), we have one more 1-bit than i >> 1. If it's 0 (i is even),
      we have the same count as i >> 1. So dp[i] = dp[i >> 1] + (i & 1). This recurrence lets us
      compute all answers in a single forward pass.`,

    mentalModel: `Think of binary numbers as a family tree. The number 6 (110) is the "parent" of
      both 12 (1100) and 13 (1101) — you get the children by appending a 0 or 1. The child's
      popcount is the parent's popcount plus whatever bit was appended. So once you know the parent's
      answer, both children are free. You're building a lookup table from small numbers to large.`,

    whyNaiveFails: `Counting bits for each number individually using Brian Kernighan's method or
      bit-shifting costs O(log n) per number, giving O(n log n) total. The DP approach exploits
      the relationship between i and i/2 to achieve O(n) total — each number is computed in O(1)
      from its already-known half.`,

    keyObservation: `The binary representation of i is the binary representation of i >> 1 with one
      bit appended on the right. That appended bit is i & 1. Therefore:
      dp[i] = dp[i >> 1] + (i & 1). This is the most elegant recurrence for this problem.`,
  },

  problem: `Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n),
    ans[i] is the number of 1's in the binary representation of i.`,

  examples: [
    { input: "n = 2", output: "[0, 1, 1]", explanation: "0 → 0; 1 → 1; 2 → 10 (one 1-bit)" },
    { input: "n = 5", output: "[0, 1, 1, 2, 1, 2]", explanation: "0→0, 1→1, 2→1, 3→2, 4→1, 5→2" },
  ],

  constraints: [
    "0 <= n <= 10^5",
  ],

  approaches: {
    brute: {
      label: "Count Each Number",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      idea: "For each number 0 to n, count its set bits individually using bit shifting.",

      javaCode: `public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    for (int i = 0; i <= n; i++) {
        int count = 0;
        int x = i;
        while (x > 0) {
            count += x & 1;
            x >>= 1;
        }
        ans[i] = count;
    }
    return ans;
}`,

      cppCode: `vector<int> countBits(int n) {
    vector<int> ans(n + 1);
    for (int i = 0; i <= n; i++) {
        int count = 0;
        int x = i;
        while (x > 0) {
            count += x & 1;
            x >>= 1;
        }
        ans[i] = count;
    }
    return ans;
}`,

      pythonCode: `def countBits(n: int) -> List[int]:
    ans = [0] * (n + 1)
    for i in range(n + 1):
        count = 0
        x = i
        while x > 0:
            count += x & 1
            x >>= 1
        ans[i] = count
    return ans`,

      lineAnnotations: {
        2: "Allocate result array of size n+1",
        3: "Iterate through every number 0 to n",
        4: "Counter for set bits in current number",
        5: "Copy i to a working variable",
        6: "Process each bit until x is 0",
        7: "Add the last bit (0 or 1) to count",
        8: "Right-shift to examine next bit",
        10: "Store the bit count for this number",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { n: 5 },
          expectedOutput: "[0, 1, 1, 2, 1, 2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init ans[0..5]",
              explanation: "Create result array of size 6 (indices 0 through 5), all initialized to 0.",
              variables: { n: 5, ans: "[0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 6, 7, 8, 10],
              shortLabel: "i=0: 0 bits",
              explanation: "i=0, binary = 0. No bits set. ans[0] = 0.",
              variables: { i: 0, binary: "0", count: 0, ans: "[0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "0": { value: "0 → 0 bits", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 6, 7, 8, 10],
              shortLabel: "i=1: 1 bit",
              explanation: "i=1, binary = 1. One 1-bit. ans[1] = 1.",
              variables: { i: 1, binary: "1", count: 1, ans: "[0,1,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "0": { value: "0 → 0 bits" }, "1": { value: "1 → 1 bit", isNew: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 6, 7, 8, 10],
              shortLabel: "i=2: 1 bit",
              explanation: "i=2, binary = 10. One 1-bit. ans[2] = 1.",
              variables: { i: 2, binary: "10", count: 1, ans: "[0,1,1,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "0": { value: "0 → 0 bits" }, "1": { value: "1 → 1 bit" }, "2": { value: "10 → 1 bit", isNew: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 6, 7, 8, 10],
              shortLabel: "i=3: 2 bits",
              explanation: "i=3, binary = 11. Two 1-bits. ans[3] = 2.",
              variables: { i: 3, binary: "11", count: 2, ans: "[0,1,1,2,0,0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "0": { value: "0 → 0 bits" }, "1": { value: "1 → 1 bit" }, "2": { value: "10 → 1 bit" }, "3": { value: "11 → 2 bits", isNew: true } },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [3, 6, 7, 8, 10],
              shortLabel: "i=4: 1 bit",
              explanation: "i=4, binary = 100. One 1-bit. ans[4] = 1.",
              variables: { i: 4, binary: "100", count: 1, ans: "[0,1,1,2,1,0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                hashMap: { "0": { value: "0 → 0" }, "1": { value: "1 → 1" }, "2": { value: "10 → 1" }, "3": { value: "11 → 2" }, "4": { value: "100 → 1", isNew: true } },
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [3, 6, 7, 8, 10],
              shortLabel: "i=5: 2 bits",
              explanation: "i=5, binary = 101. Two 1-bits. ans[5] = 2.",
              variables: { i: 5, binary: "101", count: 2, ans: "[0,1,1,2,1,2]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                hashMap: { "0": { value: "0 → 0" }, "1": { value: "1 → 1" }, "2": { value: "10 → 1" }, "3": { value: "11 → 2" }, "4": { value: "100 → 1" }, "5": { value: "101 → 2", isNew: true } },
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [12],
              shortLabel: "Return [0,1,1,2,1,2]",
              explanation: "All numbers processed. Return ans = [0, 1, 1, 2, 1, 2].",
              variables: { answer: "[0, 1, 1, 2, 1, 2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const size = n + 1;
        const ans = new Array(size).fill(0);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `Init ans[0..${n}]`,
          explanation: `Create result array of size ${size}, all initialized to 0.`,
          variables: { n, ans: JSON.stringify(ans) },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: size }, (_, i) => [i, "default"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i <= n; i++) {
          let count = 0;
          let x = i;
          while (x > 0) { count += x & 1; x >>= 1; }
          ans[i] = count;

          steps.push({
            stepId: steps.length, lineNumbers: [3, 6, 7, 8, 10],
            shortLabel: `i=${i}: ${count} bit${count !== 1 ? 's' : ''}`,
            explanation: `i=${i}, binary = ${i.toString(2)}. ${count} set bit${count !== 1 ? 's' : ''}. ans[${i}] = ${count}.`,
            variables: { i, binary: i.toString(2), count, ans: JSON.stringify(ans) },
            dataStructure: {
              arrayStates: Object.fromEntries(Array.from({ length: size }, (_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: { [String(i)]: { value: `${i.toString(2)} → ${count}`, isNew: true } },
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [12],
          shortLabel: `Return [${ans.join(',')}]`,
          explanation: `All numbers processed. Return ans = [${ans.join(', ')}].`,
          variables: { answer: `[${ans.join(', ')}]` },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: size }, (_, i) => [i, "found"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "DP with Bit Shift",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Use the recurrence dp[i] = dp[i >> 1] + (i & 1). The number i has the same bits as i/2,
        plus possibly one extra 1-bit if i is odd. Each answer is computed in O(1) from a previous answer.`,

      javaCode: `public int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}`,

      cppCode: `vector<int> countBits(int n) {
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}`,

      pythonCode: `def countBits(n: int) -> List[int]:
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,

      lineAnnotations: {
        2: "dp[0] = 0 — zero has no set bits",
        3: "Fill from 1 to n using the recurrence",
        4: "dp[i] = dp[i/2] + last bit of i",
        6: "Return the complete result array",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Build dp table for n=5",
          input: { n: 5 },
          expectedOutput: "[0, 1, 1, 2, 1, 2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "dp = [0,0,0,0,0,0]",
              explanation: "Initialize dp array of size 6. dp[0] = 0 because 0 has no set bits — this is our base case.",
              variables: { n: 5, dp: "[0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [],
                hashMap: { "dp[0]": { value: "0 (base)", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "i=1: dp[0]+1 = 1",
              explanation: "i=1 (binary 1). i>>1 = 0, i&1 = 1. dp[1] = dp[0] + 1 = 0 + 1 = 1. Number 1 has one set bit.",
              variables: { i: 1, "i>>1": 0, "i&1": 1, "dp[i>>1]": 0, "dp[i]": 1, dp: "[0,1,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "i>>1", index: 0, color: "active" }],
                hashMap: { "dp[0]": { value: "0" }, "dp[1]": { value: "1", isNew: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4],
              shortLabel: "i=2: dp[1]+0 = 1",
              explanation: "i=2 (binary 10). i>>1 = 1, i&1 = 0. dp[2] = dp[1] + 0 = 1 + 0 = 1. Shifting 10 right gives 1 — same bit count, since the appended bit was 0.",
              variables: { i: 2, "i>>1": 1, "i&1": 0, "dp[i>>1]": 1, "dp[i]": 1, dp: "[0,1,1,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "i>>1", index: 1, color: "active" }],
                hashMap: { "dp[0]": { value: "0" }, "dp[1]": { value: "1" }, "dp[2]": { value: "1", isNew: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4],
              shortLabel: "i=3: dp[1]+1 = 2",
              explanation: "i=3 (binary 11). i>>1 = 1, i&1 = 1. dp[3] = dp[1] + 1 = 1 + 1 = 2. Number 3 is number 1 with a 1 appended — one extra set bit.",
              variables: { i: 3, "i>>1": 1, "i&1": 1, "dp[i>>1]": 1, "dp[i]": 2, dp: "[0,1,1,2,0,0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }, { name: "i>>1", index: 1, color: "active" }],
                hashMap: { "dp[0]": { value: "0" }, "dp[1]": { value: "1" }, "dp[2]": { value: "1" }, "dp[3]": { value: "2", isNew: true } },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 4],
              shortLabel: "i=4: dp[2]+0 = 1",
              explanation: "i=4 (binary 100). i>>1 = 2, i&1 = 0. dp[4] = dp[2] + 0 = 1 + 0 = 1. Number 4 is number 2 with a 0 appended.",
              variables: { i: 4, "i>>1": 2, "i&1": 0, "dp[i>>1]": 1, "dp[i]": 1, dp: "[0,1,1,2,1,0]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }, { name: "i>>1", index: 2, color: "active" }],
                hashMap: { "dp[0]": { value: "0" }, "dp[1]": { value: "1" }, "dp[2]": { value: "1" }, "dp[3]": { value: "2" }, "dp[4]": { value: "1", isNew: true } },
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [3, 4],
              shortLabel: "i=5: dp[2]+1 = 2",
              explanation: "i=5 (binary 101). i>>1 = 2, i&1 = 1. dp[5] = dp[2] + 1 = 1 + 1 = 2. Number 5 is number 2 with a 1 appended — one extra set bit.",
              variables: { i: 5, "i>>1": 2, "i&1": 1, "dp[i>>1]": 1, "dp[i]": 2, dp: "[0,1,1,2,1,2]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active" },
                pointers: [{ name: "i", index: 5, color: "pointer" }, { name: "i>>1", index: 2, color: "active" }],
                hashMap: { "dp[0]": { value: "0" }, "dp[1]": { value: "1" }, "dp[2]": { value: "1" }, "dp[3]": { value: "2" }, "dp[4]": { value: "1" }, "dp[5]": { value: "2", isNew: true } },
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6],
              shortLabel: "Return [0,1,1,2,1,2]",
              explanation: "All values computed. Return dp = [0, 1, 1, 2, 1, 2]. Each number's popcount was derived in O(1) from its right-shifted parent.",
              variables: { answer: "[0, 1, 1, 2, 1, 2]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "n = 0",
          description: "Smallest input — only dp[0]",
          input: { n: 0 },
          expectedOutput: "[0]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "dp = [0]",
              explanation: "n=0. Create dp array of size 1. dp[0] = 0 — zero has no set bits. The loop doesn't execute.",
              variables: { n: 0, dp: "[0]" },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                hashMap: { "dp[0]": { value: "0 (base)", isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6],
              shortLabel: "Return [0]",
              explanation: "No iterations needed. Return dp = [0].",
              variables: { answer: "[0]" },
              dataStructure: {
                arrayStates: { 0: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Power of 2",
          description: "n=8 — powers of 2 always have exactly 1 set bit",
          input: { n: 8 },
          expectedOutput: "[0,1,1,2,1,2,2,3,1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "dp = [0,...,0]",
              explanation: "Initialize dp array of size 9. dp[0] = 0 is the base case.",
              variables: { n: 8, dp: "[0,0,0,0,0,0,0,0,0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3, 4],
              shortLabel: "i=1: dp[0]+1=1",
              explanation: "i=1 (1). i>>1=0, i&1=1. dp[1] = dp[0]+1 = 1.",
              variables: { i: 1, "i>>1": 0, "i&1": 1, "dp[i]": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "dp[1]": { value: "1", isNew: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4],
              shortLabel: "i=2: dp[1]+0=1",
              explanation: "i=2 (10). i>>1=1, i&1=0. dp[2] = dp[1]+0 = 1.",
              variables: { i: 2, "i>>1": 1, "i&1": 0, "dp[i]": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "dp[2]": { value: "1", isNew: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4],
              shortLabel: "i=3: dp[1]+1=2",
              explanation: "i=3 (11). i>>1=1, i&1=1. dp[3] = dp[1]+1 = 2.",
              variables: { i: 3, "i>>1": 1, "i&1": 1, "dp[i]": 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "dp[3]": { value: "2", isNew: true } },
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 4],
              shortLabel: "i=4: dp[2]+0=1",
              explanation: "i=4 (100). i>>1=2, i&1=0. dp[4] = dp[2]+0 = 1. Power of 2 — exactly one set bit.",
              variables: { i: 4, "i>>1": 2, "i&1": 0, "dp[i]": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "active", 5: "default", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                hashMap: { "dp[4]": { value: "1", isNew: true } },
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [3, 4],
              shortLabel: "i=5: dp[2]+1=2",
              explanation: "i=5 (101). i>>1=2, i&1=1. dp[5] = dp[2]+1 = 2.",
              variables: { i: 5, "i>>1": 2, "i&1": 1, "dp[i]": 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "active", 6: "default", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                hashMap: { "dp[5]": { value: "2", isNew: true } },
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [3, 4],
              shortLabel: "i=6: dp[3]+0=2",
              explanation: "i=6 (110). i>>1=3, i&1=0. dp[6] = dp[3]+0 = 2.",
              variables: { i: 6, "i>>1": 3, "i&1": 0, "dp[i]": 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "active", 7: "default", 8: "default" },
                pointers: [{ name: "i", index: 6, color: "pointer" }],
                hashMap: { "dp[6]": { value: "2", isNew: true } },
              },
              delta: { changedIndices: [6] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [3, 4],
              shortLabel: "i=7: dp[3]+1=3",
              explanation: "i=7 (111). i>>1=3, i&1=1. dp[7] = dp[3]+1 = 3. All three bits set.",
              variables: { i: 7, "i>>1": 3, "i&1": 1, "dp[i]": 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "active", 8: "default" },
                pointers: [{ name: "i", index: 7, color: "pointer" }],
                hashMap: { "dp[7]": { value: "3", isNew: true } },
              },
              delta: { changedIndices: [7] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [3, 4],
              shortLabel: "i=8: dp[4]+0=1",
              explanation: "i=8 (1000). i>>1=4, i&1=0. dp[8] = dp[4]+0 = 1. Power of 2 — exactly one set bit, as expected.",
              variables: { i: 8, "i>>1": 4, "i&1": 0, "dp[i]": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited", 6: "visited", 7: "visited", 8: "active" },
                pointers: [{ name: "i", index: 8, color: "pointer" }],
                hashMap: { "dp[8]": { value: "1", isNew: true } },
              },
              delta: { changedIndices: [8] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [6],
              shortLabel: "Return [0,1,1,2,1,2,2,3,1]",
              explanation: "All values computed. dp[8]=1 confirms powers of 2 always have exactly 1 set bit.",
              variables: { answer: "[0,1,1,2,1,2,2,3,1]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found", 6: "found", 7: "found", 8: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const size = n + 1;
        const dp = new Array(size).fill(0);

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `dp = [${dp.join(',')}]`,
          explanation: `Initialize dp array of size ${size}. dp[0] = 0 is the base case.`,
          variables: { n, dp: JSON.stringify(dp) },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: size }, (_, i) => [i, i === 0 ? "found" : "default"])),
            pointers: [],
            hashMap: { "dp[0]": { value: "0 (base)", isNew: true } },
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 1; i <= n; i++) {
          const half = i >> 1;
          const lastBit = i & 1;
          dp[i] = dp[half] + lastBit;

          steps.push({
            stepId: steps.length, lineNumbers: [3, 4],
            shortLabel: `i=${i}: dp[${half}]+${lastBit}=${dp[i]}`,
            explanation: `i=${i} (binary ${i.toString(2)}). i>>1=${half}, i&1=${lastBit}. dp[${i}] = dp[${half}] + ${lastBit} = ${dp[half] - lastBit} + ${lastBit} = ${dp[i]}.`,
            variables: { i, "i>>1": half, "i&1": lastBit, "dp[i>>1]": dp[half], "dp[i]": dp[i], dp: JSON.stringify(dp) },
            dataStructure: {
              arrayStates: Object.fromEntries(Array.from({ length: size }, (_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }, { name: "i>>1", index: half, color: "active" }],
              hashMap: { [`dp[${i}]`]: { value: String(dp[i]), isNew: true } },
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [6],
          shortLabel: `Return [${dp.join(',')}]`,
          explanation: `All values computed. Return dp = [${dp.join(', ')}].`,
          variables: { answer: `[${dp.join(', ')}]` },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: size }, (_, i) => [i, "found"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n)", space: "O(1)", explanation: "Each of n numbers takes O(log n) to count bits" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Each number computed in O(1) from its half via the DP recurrence", tradeoff: "DP recurrence eliminates per-number bit counting entirely" },
  },

  interviewTips: [
    "Start by mentioning the straightforward O(n log n) approach — count bits for each number.",
    "Then explain the key insight: i's binary is (i>>1)'s binary with one bit appended.",
    "Write the recurrence dp[i] = dp[i >> 1] + (i & 1) and verify with a small example.",
    "Mention that an alternative recurrence uses i & (i-1): dp[i] = dp[i & (i-1)] + 1.",
    "Clarify that the output array doesn't count as extra space for the O(1) space claim.",
  ],

  relatedProblems: ["number-of-1-bits", "single-number", "reverse-bits"],
};
