export const handOfStraights = {
  id: 125,
  slug: "hand-of-straights",
  title: "Hand of Straights",
  difficulty: "Medium",
  topic: "greedy",
  topicLabel: "Greedy",
  neetcodeNumber: 125,
  artifactType: "ArrayHashMap",
  companies: ["Google", "Amazon", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/hand-of-straights/",

  pattern: "Greedy with Sorted Order + HashMap",
  patternExplanation: `Sort the cards. Greedily form groups starting from the smallest available card.
    Use a frequency map to track remaining cards.`,

  intuition: {
    coreInsight: `If we sort the cards, the smallest card MUST be the start of some group. There's
      no other valid position for it. So we greedily build a group starting from it, consuming
      the next groupSize-1 consecutive values. If any value is missing, it's impossible.`,

    mentalModel: `Imagine sorting a hand of playing cards. The lowest card must start a run.
      You pull it out and look for the next consecutive cards. If you can't complete the run,
      the hand can't be divided. Repeat with whatever's left until all cards are used.`,

    whyNaiveFails: `Trying all possible groupings is combinatorial — with n cards and groups of
      size k, there are potentially C(n, k) * C(n-k, k) * ... groupings. The greedy approach
      works because the smallest card constrains exactly which group it belongs to.`,

    keyObservation: `After sorting, always start a new group from the smallest remaining card.
      If that card has count > 0, try to form a consecutive group of size groupSize. If any
      card in the sequence has count 0, return false. This greedy choice is always optimal
      because the smallest card can only appear at the start of a group.`,
  },

  problem: `Alice has some number of cards and she wants to rearrange the cards into groups so
    that each group is of size groupSize, and consists of groupSize consecutive cards. Given an
    integer array hand where hand[i] is the value written on the ith card and an integer groupSize,
    return true if she can rearrange the cards, or false otherwise.`,

  examples: [
    { input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3", output: "true", explanation: "Groups: [1,2,3], [2,3,4], [6,7,8]" },
    { input: "hand = [1,2,3,4,5], groupSize = 4", output: "false", explanation: "5 cards can't be divided into groups of 4" },
  ],

  constraints: [
    "1 <= hand.length <= 10^4",
    "0 <= hand[i] <= 10^9",
    "1 <= groupSize <= hand.length",
  ],

  approaches: {
    brute: {
      label: "Sort and Simulate",
      tier: "brute",
      timeComplexity: "O(n * groupSize)",
      spaceComplexity: "O(n)",
      idea: "Sort the array, then repeatedly find and remove consecutive groups from the remaining elements.",

      javaCode: `public boolean isNStraightHand(int[] hand, int groupSize) {
    if (hand.length % groupSize != 0) return false;
    Arrays.sort(hand);
    List<Integer> list = new ArrayList<>();
    for (int h : hand) list.add(h);
    while (!list.isEmpty()) {
        int start = list.get(0);
        for (int i = 0; i < groupSize; i++) {
            if (!list.remove(Integer.valueOf(start + i)))
                return false;
        }
    }
    return true;
}`,

      cppCode: `bool isNStraightHand(vector<int>& hand, int groupSize) {
    if (hand.size() % groupSize != 0) return false;
    sort(hand.begin(), hand.end());
    vector<int> list(hand.begin(), hand.end());
    while (!list.empty()) {
        int start = list[0];
        for (int i = 0; i < groupSize; i++) {
            auto it = find(list.begin(), list.end(), start + i);
            if (it == list.end()) return false;
            list.erase(it);
        }
    }
    return true;
}`,

      pythonCode: `def isNStraightHand(hand: List[int], groupSize: int) -> bool:
    if len(hand) % groupSize != 0:
        return False
    hand.sort()
    hand = list(hand)
    while hand:
        start = hand[0]
        for i in range(groupSize):
            if start + i not in hand:
                return False
            hand.remove(start + i)
    return True`,

      lineAnnotations: {
        2: "Quick check: total cards must be divisible by groupSize",
        3: "Sort to process smallest cards first",
        6: "Start each group from the smallest remaining card",
        8: "Try to find each consecutive card in the group",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { hand: [1,2,3,6,2,3,4,7,8], groupSize: 3 },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [3], shortLabel: "Sort hand",
              explanation: "Sort: [1,2,2,3,3,4,6,7,8]. 9 cards, groupSize=3 → need 3 groups.",
              variables: { sorted: "[1,2,2,3,3,4,6,7,8]", groups: 3 },
              dataStructure: { arrayStates: {0:"default",1:"default",2:"default",3:"default",4:"default",5:"default",6:"default",7:"default",8:"default"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [6, 7, 8], shortLabel: "Group 1: [1,2,3]",
              explanation: "Start=1. Remove 1, 2, 3. Remaining: [2,3,4,6,7,8].",
              variables: { start: 1, group: "[1,2,3]", remaining: 6 },
              dataStructure: { arrayStates: {0:"found",1:"found",2:"default",3:"found",4:"default",5:"default",6:"default",7:"default",8:"default"}, pointers: [], hashMap: {} },
              delta: { changedIndices: [0,1,3] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [6, 7, 8], shortLabel: "Group 2: [2,3,4]",
              explanation: "Start=2. Remove 2, 3, 4. Remaining: [6,7,8].",
              variables: { start: 2, group: "[2,3,4]", remaining: 3 },
              dataStructure: { arrayStates: {0:"found",1:"found",2:"found",3:"found",4:"found",5:"found",6:"default",7:"default",8:"default"}, pointers: [], hashMap: {} },
              delta: { changedIndices: [2,4,5] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [6, 7, 8], shortLabel: "Group 3: [6,7,8]",
              explanation: "Start=6. Remove 6, 7, 8. All cards used. Return true.",
              variables: { start: 6, group: "[6,7,8]", remaining: 0 },
              dataStructure: { arrayStates: {0:"found",1:"found",2:"found",3:"found",4:"found",5:"found",6:"found",7:"found",8:"found"}, pointers: [], hashMap: {} },
              delta: { changedIndices: [6,7,8] }, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ hand, groupSize }) {
        const steps = [];
        if (hand.length % groupSize !== 0) {
          steps.push({ stepId: 0, lineNumbers: [2], shortLabel: "Not divisible", explanation: `${hand.length} cards not divisible by ${groupSize}. Impossible.`, variables: { answer: false }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: true });
          return steps;
        }
        const sorted = [...hand].sort((a, b) => a - b);
        const freq = {};
        for (const c of sorted) freq[c] = (freq[c] || 0) + 1;
        steps.push({ stepId: 0, lineNumbers: [3], shortLabel: "Sort hand", explanation: `Sorted: [${sorted.join(',')}].`, variables: { n: hand.length, groupSize }, dataStructure: { arrayStates: Object.fromEntries(sorted.map((_,i) => [i,"default"])), pointers: [], hashMap: {} }, delta: {}, isAnswer: false });
        const keys = [...new Set(sorted)].sort((a,b) => a - b);
        let possible = true;
        for (const start of keys) {
          while (freq[start] > 0) {
            for (let i = 0; i < groupSize; i++) {
              if (!freq[start + i] || freq[start + i] <= 0) { possible = false; break; }
              freq[start + i]--;
            }
            if (!possible) break;
          }
          if (!possible) break;
        }
        steps.push({ stepId: 1, lineNumbers: [11], shortLabel: `Result: ${possible}`, explanation: possible ? "All groups formed successfully." : "Could not form all groups.", variables: { answer: possible }, dataStructure: { arrayStates: Object.fromEntries(sorted.map((_,i) => [i, possible ? "found" : "eliminated"])), pointers: [], hashMap: {} }, delta: {}, isAnswer: true });
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sort + HashMap Greedy",
      tier: "optimal",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: `Sort the array. Use a frequency map. For each smallest remaining card, greedily
        form a group of consecutive values by decrementing counts.`,

      javaCode: `public boolean isNStraightHand(int[] hand, int groupSize) {
    if (hand.length % groupSize != 0) return false;
    TreeMap<Integer, Integer> freq = new TreeMap<>();
    for (int card : hand) freq.merge(card, 1, Integer::sum);

    while (!freq.isEmpty()) {
        int start = freq.firstKey();
        for (int i = 0; i < groupSize; i++) {
            int card = start + i;
            if (!freq.containsKey(card)) return false;
            if (freq.get(card) == 1) freq.remove(card);
            else freq.put(card, freq.get(card) - 1);
        }
    }

    return true;
}`,

      cppCode: `bool isNStraightHand(vector<int>& hand, int groupSize) {
    if (hand.size() % groupSize != 0) return false;
    map<int, int> freq;
    for (int card : hand) freq[card]++;

    while (!freq.empty()) {
        int start = freq.begin()->first;
        for (int i = 0; i < groupSize; i++) {
            int card = start + i;
            if (freq.find(card) == freq.end()) return false;
            if (--freq[card] == 0) freq.erase(card);
        }
    }

    return true;
}`,

      pythonCode: `def isNStraightHand(hand: List[int], groupSize: int) -> bool:
    if len(hand) % groupSize != 0:
        return False
    freq = Counter(hand)

    for start in sorted(freq):
        count = freq[start]
        if count > 0:
            for i in range(groupSize):
                card = start + i
                if freq[card] < count:
                    return False
                freq[card] -= count

    return True`,

      lineAnnotations: {
        2: "Quick divisibility check",
        3: "Build frequency map of all card values",
        6: "Process from smallest card (TreeMap keeps order)",
        7: "Start a new group from the smallest remaining",
        9: "If any consecutive card is missing, impossible",
        10: "Decrement count; remove if zero",
        15: "All groups formed successfully",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
          input: { hand: [1,2,3,6,2,3,4,7,8], groupSize: 3 },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [2, 3],
              shortLabel: "Build freq map",
              explanation: "9 % 3 = 0, possible. Frequency: {1:1, 2:2, 3:2, 4:1, 6:1, 7:1, 8:1}.",
              variables: { n: 9, groupSize: 3 },
              dataStructure: {
                arrayStates: {0:"default",1:"default",2:"default",3:"default",4:"default",5:"default",6:"default",7:"default",8:"default"},
                pointers: [],
                hashMap: { 1: {value:1}, 2: {value:2}, 3: {value:2}, 4: {value:1}, 6: {value:1}, 7: {value:1}, 8: {value:1} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [6, 7, 8, 9, 10],
              shortLabel: "Group 1: start=1, [1,2,3]",
              explanation: "Smallest key is 1. Need 1,2,3. All present. Decrement: freq becomes {2:1, 3:1, 4:1, 6:1, 7:1, 8:1}.",
              variables: { start: 1, group: "[1,2,3]" },
              dataStructure: {
                arrayStates: {0:"default",1:"default",2:"default",3:"default",4:"default",5:"default",6:"default",7:"default",8:"default"},
                pointers: [],
                hashMap: { 2: {value:1,isHighlighted:true}, 3: {value:1,isHighlighted:true}, 4: {value:1}, 6: {value:1}, 7: {value:1}, 8: {value:1} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [6, 7, 8, 9, 10],
              shortLabel: "Group 2: start=2, [2,3,4]",
              explanation: "Smallest key is 2. Need 2,3,4. All present. Decrement: freq becomes {6:1, 7:1, 8:1}.",
              variables: { start: 2, group: "[2,3,4]" },
              dataStructure: {
                arrayStates: {0:"default",1:"default",2:"default",3:"default",4:"default",5:"default",6:"default",7:"default",8:"default"},
                pointers: [],
                hashMap: { 6: {value:1,isHighlighted:true}, 7: {value:1}, 8: {value:1} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [6, 7, 8, 9, 10],
              shortLabel: "Group 3: start=6, [6,7,8]",
              explanation: "Smallest key is 6. Need 6,7,8. All present. Decrement all to 0. Map is empty.",
              variables: { start: 6, group: "[6,7,8]" },
              dataStructure: {
                arrayStates: {0:"found",1:"found",2:"found",3:"found",4:"found",5:"found",6:"found",7:"found",8:"found"},
                pointers: [],
                hashMap: {},
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [15],
              shortLabel: "Return true",
              explanation: "All cards used, all groups formed. Three groups of 3 consecutive cards each: [1,2,3], [2,3,4], [6,7,8].",
              variables: { answer: true },
              dataStructure: {
                arrayStates: {0:"found",1:"found",2:"found",3:"found",4:"found",5:"found",6:"found",7:"found",8:"found"},
                pointers: [],
                hashMap: {},
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Not Divisible",
          description: "Card count not divisible by groupSize",
          input: { hand: [1,2,3,4,5], groupSize: 4 },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0, lineNumbers: [2],
              shortLabel: "5 % 4 ≠ 0",
              explanation: "5 cards cannot be evenly divided into groups of 4. Return false immediately.",
              variables: { n: 5, groupSize: 4, "5%4": 1 },
              dataStructure: { arrayStates: {0:"default",1:"default",2:"default",3:"default",4:"default"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [2],
              shortLabel: "Return false",
              explanation: "Impossible: 5 is not divisible by 4.",
              variables: { answer: false },
              dataStructure: { arrayStates: {0:"eliminated",1:"eliminated",2:"eliminated",3:"eliminated",4:"eliminated"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ hand, groupSize }) {
        const steps = [];
        if (hand.length % groupSize !== 0) {
          steps.push({ stepId: 0, lineNumbers: [2], shortLabel: `${hand.length} % ${groupSize} ≠ 0`, explanation: "Not divisible. Return false.", variables: { answer: false }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: true });
          return steps;
        }
        const freq = {};
        for (const c of hand) freq[c] = (freq[c] || 0) + 1;
        const hmDisplay = () => Object.fromEntries(Object.entries(freq).filter(([,v]) => v > 0).map(([k,v]) => [k, {value: v}]));
        steps.push({ stepId: 0, lineNumbers: [3], shortLabel: "Build freq map", explanation: `Frequency map built from [${hand.join(',')}].`, variables: { n: hand.length, groupSize }, dataStructure: { arrayStates: Object.fromEntries(hand.map((_,i)=>[i,"default"])), pointers: [], hashMap: hmDisplay() }, delta: {}, isAnswer: false });
        const keys = Object.keys(freq).map(Number).sort((a,b)=>a-b);
        let possible = true;
        for (const start of keys) {
          while (freq[start] > 0) {
            for (let i = 0; i < groupSize; i++) {
              if (!freq[start+i] || freq[start+i] <= 0) { possible = false; break; }
              freq[start+i]--;
            }
            if (!possible) break;
            steps.push({ stepId: steps.length, lineNumbers: [7,8], shortLabel: `Group from ${start}`, explanation: `Formed group [${Array.from({length:groupSize},(_,i)=>start+i).join(',')}].`, variables: { start }, dataStructure: { arrayStates: Object.fromEntries(hand.map((_,i)=>[i,"default"])), pointers: [], hashMap: hmDisplay() }, delta: {}, isAnswer: false });
          }
          if (!possible) break;
        }
        steps.push({ stepId: steps.length, lineNumbers: [15], shortLabel: `Result: ${possible}`, explanation: possible ? "All groups formed." : "Cannot form all groups.", variables: { answer: possible }, dataStructure: { arrayStates: Object.fromEntries(hand.map((_,i)=>[i, possible?"found":"eliminated"])), pointers: [], hashMap: hmDisplay() }, delta: {}, isAnswer: true });
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n * groupSize)", space: "O(n)", explanation: "Repeated linear scans through the list" },
    optimal: { time: "O(n log n)", space: "O(n)", explanation: "Sort dominates; TreeMap operations are O(log n) each", tradeoff: "HashMap gives O(1) lookups after O(n log n) sort" },
  },

  interviewTips: [
    "Start with the divisibility check — it's an easy early exit.",
    "Explain why the smallest card must start a group (greedy justification).",
    "TreeMap (Java) or map (C++) keeps keys sorted; Counter + sorted() in Python.",
    "This problem is also known as 'Divide Array in Sets of K Consecutive Numbers'.",
    "Watch for the edge case where groupSize = 1 (always true if divisible).",
  ],

  relatedProblems: ["merge-triplets", "partition-labels", "task-scheduler"],
};
