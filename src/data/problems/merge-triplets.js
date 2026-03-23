export const mergeTriplets = {
  id: 126,
  slug: "merge-triplets",
  title: "Merge Triplets to Form Target Triplet",
  difficulty: "Medium",
  topic: "greedy",
  topicLabel: "Greedy",
  neetcodeNumber: 126,
  artifactType: "ArrayHashMap",
  companies: ["Google", "Amazon"],
  leetcodeLink: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",

  pattern: "Greedy Filter and Merge",
  patternExplanation: `Filter out triplets that have any value exceeding the target. From the remaining
    triplets, check if we can find the target value in each of the three positions.`,

  intuition: {
    coreInsight: `The merge operation takes the max of each position. If any triplet has a value
      EXCEEDING the target in any position, using it would make that position too large (since max
      can only stay or increase). So we filter those out. Among the remaining "safe" triplets,
      we just need each target value to appear in the correct position at least once.`,

    mentalModel: `Imagine mixing paint colors. Each triplet is a paint with three color intensities.
      Mixing (max) can only make colors brighter, never dimmer. If any paint is too bright in
      one channel, it ruins the mix. Filter out the too-bright paints, then check if the remaining
      paints can collectively reach the exact brightness needed in all three channels.`,

    whyNaiveFails: `Trying all subsets of triplets and checking if their merge equals the target
      is O(2^n * 3). The greedy observation — filter then check — reduces this to O(n).`,

    keyObservation: `A triplet [a, b, c] is "safe" if a <= target[0] AND b <= target[1] AND c <= target[2].
      Among safe triplets, if some has a == target[0], another has b == target[1], and another has
      c == target[2], then we can merge them to get exactly the target. The max operation across
      all three positions will reach the target values.`,
  },

  problem: `A triplet is an array of three integers. You are given a 2D integer array triplets,
    where triplets[i] = [ai, bi, ci] describes the ith triplet. You are also given an integer
    array target = [x, y, z]. You can apply the operation: choose two triplets and update one
    to [max(a,d), max(b,e), max(c,f)]. Return true if it is possible to obtain the target
    triplet as an element of triplets after any number of operations.`,

  examples: [
    { input: "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]", output: "true", explanation: "Use [2,5,3] and [1,7,5] → [max(2,1), max(5,7), max(3,5)] = [2,7,5]" },
    { input: "triplets = [[3,4,5],[4,5,6]], target = [3,2,5]", output: "false", explanation: "Both triplets have b > 2, so target[1]=2 can't be achieved" },
  ],

  constraints: [
    "1 <= triplets.length <= 10^5",
    "triplets[i].length == target.length == 3",
    "1 <= ai, bi, ci, x, y, z <= 1000",
  ],

  approaches: {
    brute: {
      label: "Try All Subsets",
      tier: "brute",
      timeComplexity: "O(2^n * 3)",
      spaceComplexity: "O(1)",
      idea: "Try all subsets of triplets, merge them, and check if any merge equals target.",

      javaCode: `public boolean mergeTriplets(int[][] triplets, int[] target) {
    int n = triplets.length;
    for (int mask = 1; mask < (1 << n); mask++) {
        int[] merged = {0, 0, 0};
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) {
                for (int j = 0; j < 3; j++)
                    merged[j] = Math.max(merged[j], triplets[i][j]);
            }
        }
        if (Arrays.equals(merged, target)) return true;
    }
    return false;
}`,

      cppCode: `bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
    int n = triplets.size();
    for (int mask = 1; mask < (1 << n); mask++) {
        vector<int> merged(3, 0);
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                for (int j = 0; j < 3; j++)
                    merged[j] = max(merged[j], triplets[i][j]);
            }
        }
        if (merged == target) return true;
    }
    return false;
}`,

      pythonCode: `def mergeTriplets(triplets: List[List[int]], target: List[int]) -> bool:
    n = len(triplets)
    for mask in range(1, 1 << n):
        merged = [0, 0, 0]
        for i in range(n):
            if mask & (1 << i):
                for j in range(3):
                    merged[j] = max(merged[j], triplets[i][j])
        if merged == target:
            return True
    return False`,

      lineAnnotations: {
        3: "Try every non-empty subset via bitmask",
        6: "If triplet i is in this subset, merge it",
        10: "Check if merged result equals target",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { triplets: [[2,5,3],[1,8,4],[1,7,5]], target: [2,7,5] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [1], shortLabel: "Try all subsets",
              explanation: "With 3 triplets, try 2^3 - 1 = 7 non-empty subsets. Check if merging any subset gives [2,7,5].",
              variables: { n: 3, subsets: 7, target: "[2,7,5]" },
              dataStructure: { arrayStates: {0:"default",1:"default",2:"default"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [6, 7, 10], shortLabel: "Subset {0,2}: merge [2,5,3]+[1,7,5]=[2,7,5]",
              explanation: "Triplets 0 and 2: max(2,1)=2, max(5,7)=7, max(3,5)=5 → [2,7,5] = target!",
              variables: { merged: "[2,7,5]", answer: true },
              dataStructure: { arrayStates: {0:"found",1:"default",2:"found"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ triplets, target }) {
        return [
          { stepId: 0, lineNumbers: [1], shortLabel: "Try subsets", explanation: `Try all ${Math.pow(2, triplets.length)-1} subsets.`, variables: { n: triplets.length }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [10], shortLabel: "Check result", explanation: "Find if any subset merges to target.", variables: { target: `[${target.join(',')}]` }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "Greedy Filter",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Skip triplets where any value exceeds target. From remaining, check if we can find
        each target value in the correct position.`,

      javaCode: `public boolean mergeTriplets(int[][] triplets, int[] target) {
    boolean[] found = new boolean[3];

    for (int[] t : triplets) {
        if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
            for (int j = 0; j < 3; j++) {
                if (t[j] == target[j]) found[j] = true;
            }
        }
    }

    return found[0] && found[1] && found[2];
}`,

      cppCode: `bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
    bool found[3] = {false, false, false};

    for (auto& t : triplets) {
        if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
            for (int j = 0; j < 3; j++) {
                if (t[j] == target[j]) found[j] = true;
            }
        }
    }

    return found[0] && found[1] && found[2];
}`,

      pythonCode: `def mergeTriplets(triplets: List[List[int]], target: List[int]) -> bool:
    found = [False, False, False]

    for t in triplets:
        if t[0] <= target[0] and t[1] <= target[1] and t[2] <= target[2]:
            for j in range(3):
                if t[j] == target[j]:
                    found[j] = True

    return all(found)`,

      lineAnnotations: {
        2: "Track which target positions we've matched",
        4: "Only consider 'safe' triplets (no value exceeds target)",
        6: "If this triplet has the exact target value at position j, mark it",
        11: "All three positions must be achievable",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Filter unsafe triplets, check remaining",
          input: { triplets: [[2,5,3],[1,8,4],[1,7,5]], target: [2,7,5] },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [2],
              shortLabel: "Init found = [F,F,F]",
              explanation: "Track which target values [2,7,5] we can achieve. Start with none found.",
              variables: { target: "[2,7,5]", found: "[F,F,F]" },
              dataStructure: {
                arrayStates: {0:"default",1:"default",2:"default"},
                pointers: [],
                hashMap: { pos0: {value:"F"}, pos1: {value:"F"}, pos2: {value:"F"} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [4, 5, 6],
              shortLabel: "t=[2,5,3]: safe, found[0]=T",
              explanation: "[2,5,3]: 2<=2, 5<=7, 3<=5 → safe. t[0]=2=target[0] → found[0]=true. t[1]=5≠7, t[2]=3≠5.",
              variables: { triplet: "[2,5,3]", safe: true, found: "[T,F,F]" },
              dataStructure: {
                arrayStates: {0:"found",1:"default",2:"default"},
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { pos0: {value:"T",isHighlighted:true}, pos1: {value:"F"}, pos2: {value:"F"} },
              },
              delta: { changedIndices: [0] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [4],
              shortLabel: "t=[1,8,4]: UNSAFE (8>7)",
              explanation: "[1,8,4]: t[1]=8 > target[1]=7 → unsafe! Skip this triplet. Using it would force position 1 above 7.",
              variables: { triplet: "[1,8,4]", safe: false, found: "[T,F,F]" },
              dataStructure: {
                arrayStates: {0:"found",1:"eliminated",2:"default"},
                pointers: [{ name: "i", index: 1, color: "active" }],
                hashMap: { pos0: {value:"T"}, pos1: {value:"F"}, pos2: {value:"F"} },
              },
              delta: { changedIndices: [1] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [4, 5, 6],
              shortLabel: "t=[1,7,5]: safe, found[1]=T, found[2]=T",
              explanation: "[1,7,5]: 1<=2, 7<=7, 5<=5 → safe. t[1]=7=target[1] → found[1]=true. t[2]=5=target[2] → found[2]=true.",
              variables: { triplet: "[1,7,5]", safe: true, found: "[T,T,T]" },
              dataStructure: {
                arrayStates: {0:"found",1:"eliminated",2:"found"},
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { pos0: {value:"T"}, pos1: {value:"T",isHighlighted:true}, pos2: {value:"T",isHighlighted:true} },
              },
              delta: { changedIndices: [2] }, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [11],
              shortLabel: "All found → true",
              explanation: "found = [T,T,T]. All three target values achievable from safe triplets. Merge [2,5,3] and [1,7,5] → [2,7,5].",
              variables: { answer: true, found: "[T,T,T]" },
              dataStructure: {
                arrayStates: {0:"found",1:"eliminated",2:"found"},
                pointers: [],
                hashMap: { pos0: {value:"T",isHighlighted:true}, pos1: {value:"T",isHighlighted:true}, pos2: {value:"T",isHighlighted:true} },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Impossible",
          description: "No safe triplet has target[1]=2",
          input: { triplets: [[3,4,5],[4,5,6]], target: [3,2,5] },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0, lineNumbers: [2],
              shortLabel: "Init found = [F,F,F]",
              explanation: "Target is [3,2,5]. Need to find safe triplets covering each position.",
              variables: { target: "[3,2,5]", found: "[F,F,F]" },
              dataStructure: { arrayStates: {0:"default",1:"default"}, pointers: [], hashMap: { pos0:{value:"F"}, pos1:{value:"F"}, pos2:{value:"F"} } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [4],
              shortLabel: "t=[3,4,5]: UNSAFE (4>2)",
              explanation: "[3,4,5]: t[1]=4 > target[1]=2 → unsafe. Skip.",
              variables: { triplet: "[3,4,5]", safe: false },
              dataStructure: { arrayStates: {0:"eliminated",1:"default"}, pointers: [{name:"i",index:0,color:"active"}], hashMap: { pos0:{value:"F"}, pos1:{value:"F"}, pos2:{value:"F"} } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [4],
              shortLabel: "t=[4,5,6]: UNSAFE (4>3, 5>2, 6>5)",
              explanation: "[4,5,6]: multiple values exceed target. Unsafe. Skip.",
              variables: { triplet: "[4,5,6]", safe: false },
              dataStructure: { arrayStates: {0:"eliminated",1:"eliminated"}, pointers: [{name:"i",index:1,color:"active"}], hashMap: { pos0:{value:"F"}, pos1:{value:"F"}, pos2:{value:"F"} } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [11],
              shortLabel: "Not all found → false",
              explanation: "found = [F,F,F]. No safe triplets exist — both have values exceeding the target. Impossible.",
              variables: { answer: false },
              dataStructure: { arrayStates: {0:"eliminated",1:"eliminated"}, pointers: [], hashMap: { pos0:{value:"F"}, pos1:{value:"F"}, pos2:{value:"F"} } },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ triplets, target }) {
        const steps = [];
        const found = [false, false, false];
        steps.push({ stepId: 0, lineNumbers: [2], shortLabel: "Init found", explanation: `Target: [${target.join(',')}]. Track which positions found.`, variables: { target: `[${target.join(',')}]` }, dataStructure: { arrayStates: Object.fromEntries(triplets.map((_,i)=>[i,"default"])), pointers: [], hashMap: {pos0:{value:"F"},pos1:{value:"F"},pos2:{value:"F"}} }, delta: {}, isAnswer: false });
        for (let i = 0; i < triplets.length; i++) {
          const t = triplets[i];
          const safe = t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2];
          if (safe) {
            for (let j = 0; j < 3; j++) if (t[j] === target[j]) found[j] = true;
          }
          steps.push({ stepId: steps.length, lineNumbers: safe ? [4,5,6] : [4], shortLabel: `t=[${t.join(',')}]: ${safe?'safe':'UNSAFE'}`, explanation: safe ? `Safe. Matches: ${found.map((f,j)=>f?`pos${j}`:'').filter(Boolean).join(', ')||'none new'}.` : `Unsafe — has value exceeding target.`, variables: { triplet: `[${t.join(',')}]`, safe, found: `[${found.map(f=>f?'T':'F').join(',')}]` }, dataStructure: { arrayStates: Object.fromEntries(triplets.map((_,k)=>[k, k<i?(safe?"visited":"eliminated"):k===i?(safe?"active":"eliminated"):"default"])), pointers: [{name:"i",index:i,color:"pointer"}], hashMap: {pos0:{value:found[0]?"T":"F"},pos1:{value:found[1]?"T":"F"},pos2:{value:found[2]?"T":"F"}} }, delta: {}, isAnswer: false });
        }
        const result = found[0] && found[1] && found[2];
        steps.push({ stepId: steps.length, lineNumbers: [11], shortLabel: `Result: ${result}`, explanation: result ? "All positions found." : "Missing at least one position.", variables: { answer: result }, dataStructure: { arrayStates: Object.fromEntries(triplets.map((_,i)=>[i,result?"found":"eliminated"])), pointers: [], hashMap: {pos0:{value:found[0]?"T":"F"},pos1:{value:found[1]?"T":"F"},pos2:{value:found[2]?"T":"F"}} }, delta: {}, isAnswer: true });
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(2^n)", space: "O(1)", explanation: "Try all subsets of triplets" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass through triplets with constant-space tracking", tradeoff: "Greedy insight eliminates need to consider subsets" },
  },

  interviewTips: [
    "The key insight: any triplet with a value EXCEEDING the target is permanently unusable.",
    "After filtering, you just need each target value to appear somewhere in the safe set.",
    "No need to actually perform merges — just check existence.",
    "This is O(n) with O(1) space — very elegant.",
    "Explain WHY max can only increase values, never decrease them.",
  ],

  relatedProblems: ["hand-of-straights", "partition-labels", "valid-parenthesis-string"],
};
