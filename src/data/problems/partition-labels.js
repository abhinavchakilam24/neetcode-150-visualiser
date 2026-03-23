export const partitionLabels = {
  id: 127,
  slug: "partition-labels",
  title: "Partition Labels",
  difficulty: "Medium",
  topic: "greedy",
  topicLabel: "Greedy",
  neetcodeNumber: 127,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/partition-labels/",

  pattern: "Greedy Interval Merging",
  patternExplanation: `Find the last occurrence of each character. As we scan, extend the current
    partition's end to include the last occurrence of every character we encounter. When we reach
    the partition end, cut.`,

  intuition: {
    coreInsight: `Each character must appear entirely within one partition. If character 'a' appears
      at indices 0 and 8, the first partition must extend at least to index 8. As we scan from
      left to right, we track the farthest last-occurrence of any character we've seen. When
      our current index reaches that farthest point, no future character needs anything from
      this partition — safe to cut.`,

    mentalModel: `Imagine walking through a hallway placing items on shelves. Each item type must
      go on the same shelf. As you walk, you keep extending your current shelf to accommodate
      the last instance of each item type you've seen. When you pass the last instance of ALL
      item types on your current shelf, you can start a new shelf.`,

    whyNaiveFails: `Trying all possible partitions is exponential — a string of length n has
      2^(n-1) ways to partition. Checking each partition's validity requires scanning all
      characters. The greedy approach processes the string in O(n) with a single pass after
      preprocessing last occurrences.`,

    keyObservation: `Precompute lastIndex[c] = last occurrence of character c. Then scan left to
      right, maintaining 'end' = max(lastIndex[c]) for all c seen so far. When i == end, we've
      found a partition boundary. The greedy choice is always correct because no character
      in this partition appears later.`,
  },

  problem: `You are given a string s. We want to partition the string into as many parts as
    possible so that each letter appears in at most one part. Note that the partition is done
    so that after concatenating all the parts in order, the resultant string should be s.
    Return a list of integers representing the size of these parts.`,

  examples: [
    { input: 's = "ababcbacadefegdehijhklij"', output: "[9,7,8]", explanation: "Partition: 'ababcbaca', 'defegde', 'hijhklij'" },
    { input: 's = "eccbbbbdec"', output: "[10]", explanation: "All characters interleave — can't partition further" },
  ],

  constraints: [
    "1 <= s.length <= 500",
    "s consists of lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "Check All Partitions",
      tier: "brute",
      timeComplexity: "O(2^n * n)",
      spaceComplexity: "O(n)",
      idea: "Try all ways to partition the string and check if each partition has unique characters.",

      javaCode: `public List<Integer> partitionLabels(String s) {
    // Greedy is the natural approach; brute = check each split
    List<Integer> result = new ArrayList<>();
    int start = 0;
    while (start < s.length()) {
        int end = start;
        Set<Character> seen = new HashSet<>();
        for (int i = start; i <= end && i < s.length(); i++) {
            seen.add(s.charAt(i));
            for (int j = i + 1; j < s.length(); j++) {
                if (seen.contains(s.charAt(j))) end = Math.max(end, j);
            }
        }
        result.add(end - start + 1);
        start = end + 1;
    }
    return result;
}`,

      cppCode: `vector<int> partitionLabels(string s) {
    vector<int> result;
    int start = 0;
    while (start < s.size()) {
        int end = start;
        set<char> seen;
        for (int i = start; i <= end && i < s.size(); i++) {
            seen.insert(s[i]);
            for (int j = i + 1; j < s.size(); j++) {
                if (seen.count(s[j])) end = max(end, j);
            }
        }
        result.push_back(end - start + 1);
        start = end + 1;
    }
    return result;
}`,

      pythonCode: `def partitionLabels(s: str) -> List[int]:
    result = []
    start = 0
    while start < len(s):
        end = start
        seen = set()
        i = start
        while i <= end and i < len(s):
            seen.add(s[i])
            for j in range(i + 1, len(s)):
                if s[j] in seen:
                    end = max(end, j)
            i += 1
        result.append(end - start + 1)
        start = end + 1
    return result`,

      lineAnnotations: {
        4: "Process one partition at a time",
        7: "Scan characters, expanding 'end' whenever needed",
        9: "If any future char matches a seen char, extend the partition",
        12: "Partition size recorded; move start past end",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "ababcbacadefegdehijhklij" },
          expectedOutput: "[9,7,8]",
          steps: [
            {
              stepId: 0, lineNumbers: [1], shortLabel: "Start partitioning",
              explanation: 'Partition "ababcbacadefegdehijhklij" so each letter is in at most one part.',
              variables: { s: "ababcbacadefegdehijhklij", n: 24 },
              dataStructure: { arrayStates: {}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [12], shortLabel: "Result: [9,7,8]",
              explanation: "Partitions: 'ababcbaca' (9), 'defegde' (7), 'hijhklij' (8).",
              variables: { answer: "[9,7,8]" },
              dataStructure: { arrayStates: {}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const last = {};
        for (let i = 0; i < s.length; i++) last[s[i]] = i;
        let start = 0, end = 0;
        const result = [];
        for (let i = 0; i < s.length; i++) {
          end = Math.max(end, last[s[i]]);
          if (i === end) { result.push(end - start + 1); start = end + 1; }
        }
        return [
          { stepId: 0, lineNumbers: [1], shortLabel: "Start", explanation: `Partition "${s}".`, variables: { s }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [12], shortLabel: `Result: [${result.join(',')}]`, explanation: `Partitions of sizes [${result.join(',')}].`, variables: { answer: `[${result.join(',')}]` }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "Greedy with Last Occurrence",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Precompute each character's last index. Scan left to right, extending partition
        end to max(end, lastIndex[s[i]]). When i == end, partition is complete.`,

      javaCode: `public List<Integer> partitionLabels(String s) {
    int[] last = new int[26];
    for (int i = 0; i < s.length(); i++)
        last[s.charAt(i) - 'a'] = i;

    List<Integer> result = new ArrayList<>();
    int start = 0, end = 0;

    for (int i = 0; i < s.length(); i++) {
        end = Math.max(end, last[s.charAt(i) - 'a']);
        if (i == end) {
            result.add(end - start + 1);
            start = i + 1;
        }
    }

    return result;
}`,

      cppCode: `vector<int> partitionLabels(string s) {
    int last[26] = {};
    for (int i = 0; i < s.size(); i++)
        last[s[i] - 'a'] = i;

    vector<int> result;
    int start = 0, end = 0;

    for (int i = 0; i < s.size(); i++) {
        end = max(end, last[s[i] - 'a']);
        if (i == end) {
            result.push_back(end - start + 1);
            start = i + 1;
        }
    }

    return result;
}`,

      pythonCode: `def partitionLabels(s: str) -> List[int]:
    last = {c: i for i, c in enumerate(s)}

    result = []
    start = end = 0

    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            result.append(end - start + 1)
            start = i + 1

    return result`,

      lineAnnotations: {
        2: "Record last occurrence index of each character",
        7: "start = partition start, end = farthest we must extend",
        10: "Extend partition end to include last occurrence of current char",
        11: "If we've reached the end of this partition, record it",
        12: "Partition size = end - start + 1",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: '"ababcbacadefegdehijhklij" → [9,7,8]',
          input: { s: "ababcbacadefegdehijhklij" },
          expectedOutput: "[9,7,8]",
          steps: [
            {
              stepId: 0, lineNumbers: [2],
              shortLabel: "Build last-occurrence map",
              explanation: "Scan string to find each character's last index. a→8, b→5, c→7, d→14, e→15, f→11, g→13, h→19, i→22, j→23, k→20, l→21.",
              variables: { s: "ababcbacadefegdehijhklij" },
              dataStructure: {
                arrayStates: Object.fromEntries("ababcbacadefegdehijhklij".split('').map((_,i)=>[i,"default"])),
                pointers: [],
                hashMap: { a:{value:8}, b:{value:5}, c:{value:7}, d:{value:14}, e:{value:15}, f:{value:11} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10],
              shortLabel: "i=0 'a': end=max(0,8)=8",
              explanation: "At index 0, char 'a'. Last occurrence at 8. Extend partition end to 8. Must include all of 'a'.",
              variables: { i: 0, c: "a", end: 8, start: 0 },
              dataStructure: {
                arrayStates: {0:"active",1:"default",2:"default",3:"default",4:"default",5:"default",6:"default",7:"default",8:"pointer"},
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "end", index: 8, color: "active" }],
                hashMap: { a:{value:8,isHighlighted:true} },
              },
              delta: { changedIndices: [0] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [10],
              shortLabel: "i=1-4: end stays 8",
              explanation: "i=1 'b'(last=5): end=max(8,5)=8. i=2 'a'(last=8): 8. i=3 'b'(last=5): 8. i=4 'c'(last=7): 8. End doesn't grow past 8.",
              variables: { i: 4, end: 8, start: 0 },
              dataStructure: {
                arrayStates: {0:"visited",1:"visited",2:"visited",3:"visited",4:"active",5:"default",6:"default",7:"default",8:"pointer"},
                pointers: [{ name: "i", index: 4, color: "pointer" }, { name: "end", index: 8, color: "active" }],
                hashMap: { a:{value:8}, b:{value:5}, c:{value:7} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [11, 12],
              shortLabel: "i=8: i==end, partition 1 size=9",
              explanation: "At i=8 (char 'a'), i equals end (8). All characters in indices 0-8 have their last occurrence within this range. Cut! Partition 1 = 'ababcbaca', size 9.",
              variables: { i: 8, end: 8, start: 0, partitionSize: 9, result: "[9]" },
              dataStructure: {
                arrayStates: {0:"found",1:"found",2:"found",3:"found",4:"found",5:"found",6:"found",7:"found",8:"found",9:"default"},
                pointers: [],
                hashMap: {},
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [10],
              shortLabel: "i=9 'd': end=max(9,14)=14",
              explanation: "New partition starts at 9. Char 'd', last at 14. Extend end to 14.",
              variables: { i: 9, c: "d", end: 14, start: 9 },
              dataStructure: {
                arrayStates: {0:"found",1:"found",2:"found",3:"found",4:"found",5:"found",6:"found",7:"found",8:"found",9:"active",14:"pointer"},
                pointers: [{ name: "i", index: 9, color: "pointer" }, { name: "end", index: 14, color: "active" }],
                hashMap: { d:{value:14,isHighlighted:true}, e:{value:15} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [10],
              shortLabel: "i=10 'e': end=max(14,15)=15",
              explanation: "Char 'e', last at 15. Extend end to 15. The partition must grow to include all of 'e'.",
              variables: { i: 10, c: "e", end: 15, start: 9 },
              dataStructure: {
                arrayStates: {0:"found",1:"found",2:"found",3:"found",4:"found",5:"found",6:"found",7:"found",8:"found",9:"visited",10:"active",15:"pointer"},
                pointers: [{ name: "i", index: 10, color: "pointer" }, { name: "end", index: 15, color: "active" }],
                hashMap: { e:{value:15,isHighlighted:true} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [11, 12],
              shortLabel: "i=15: partition 2 size=7",
              explanation: "At i=15, i==end. Partition 2 = 'defegde', size 7. result = [9, 7].",
              variables: { i: 15, end: 15, start: 9, partitionSize: 7, result: "[9,7]" },
              dataStructure: {
                arrayStates: Object.fromEntries("ababcbacadefegdehijhklij".split('').map((_,i)=>[i, i<=15?"found":"default"])),
                pointers: [],
                hashMap: {},
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 7, lineNumbers: [11, 12],
              shortLabel: "i=23: partition 3 size=8",
              explanation: "Process indices 16-23 ('hijhklij'). End extends to 23 (last 'j'). At i=23, i==end. Partition 3 size=8. Result: [9,7,8].",
              variables: { result: "[9,7,8]", answer: "[9,7,8]" },
              dataStructure: {
                arrayStates: Object.fromEntries("ababcbacadefegdehijhklij".split('').map((_,i)=>[i,"found"])),
                pointers: [],
                hashMap: {},
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Single Partition",
          description: "All characters interleave",
          input: { s: "eccbbbbdec" },
          expectedOutput: "[10]",
          steps: [
            {
              stepId: 0, lineNumbers: [2],
              shortLabel: "Last occurrences",
              explanation: 'In "eccbbbbdec": e→8, c→9, b→6, d→7. Every character has its last occurrence near the end.',
              variables: { s: "eccbbbbdec" },
              dataStructure: { arrayStates: Object.fromEntries("eccbbbbdec".split('').map((_,i)=>[i,"default"])), pointers: [], hashMap: { e:{value:8}, c:{value:9}, b:{value:6}, d:{value:7} } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10],
              shortLabel: "i=0 'e': end=8, i=1 'c': end=9",
              explanation: "First char 'e' pushes end to 8. Second char 'c' pushes end to 9. End keeps growing to the string's end.",
              variables: { end: 9 },
              dataStructure: { arrayStates: {0:"active",1:"active",9:"pointer"}, pointers: [{name:"end",index:9,color:"active"}], hashMap: { e:{value:8}, c:{value:9,isHighlighted:true} } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [11, 12],
              shortLabel: "i=9: only at end, size=10",
              explanation: "i reaches end (9) only at the very last character. One partition of size 10.",
              variables: { result: "[10]", answer: "[10]" },
              dataStructure: { arrayStates: Object.fromEntries("eccbbbbdec".split('').map((_,i)=>[i,"found"])), pointers: [], hashMap: {} },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const steps = [];
        const last = {};
        for (let i = 0; i < s.length; i++) last[s[i]] = i;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Build last-occurrence map",
          explanation: `Last occurrences: ${Object.entries(last).map(([k,v])=>`${k}→${v}`).join(', ')}.`,
          variables: { n: s.length },
          dataStructure: { arrayStates: Object.fromEntries(s.split('').map((_,i)=>[i,"default"])), pointers: [], hashMap: Object.fromEntries(Object.entries(last).map(([k,v])=>[k,{value:v}])) },
          delta: {}, isAnswer: false,
        });

        let start = 0, end = 0;
        const result = [];
        for (let i = 0; i < s.length; i++) {
          end = Math.max(end, last[s[i]]);
          if (i === end) {
            result.push(end - start + 1);
            steps.push({
              stepId: steps.length, lineNumbers: [11, 12],
              shortLabel: `Partition: ${s.substring(start, end + 1)} (${end - start + 1})`,
              explanation: `At i=${i}, i==end. Partition '${s.substring(start, end + 1)}' complete, size ${end - start + 1}.`,
              variables: { start, end, size: end - start + 1, result: `[${result.join(',')}]` },
              dataStructure: { arrayStates: Object.fromEntries(s.split('').map((_,j)=>[j, j<=end?"found":"default"])), pointers: [], hashMap: {} },
              delta: {}, isAnswer: i === s.length - 1,
            });
            start = end + 1;
          }
        }

        if (steps.length === 1) {
          steps.push({ stepId: 1, lineNumbers: [16], shortLabel: `Result: [${result.join(',')}]`, explanation: `Partitions: [${result.join(',')}].`, variables: { answer: `[${result.join(',')}]` }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: true });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n²)", space: "O(n)", explanation: "For each partition, scan forward to find all character extents" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Two passes: one to build last-occurrence (26 chars = O(1) space), one to partition", tradeoff: "Precomputing last occurrences enables single-pass greedy" },
  },

  interviewTips: [
    "Start by explaining the constraint: each character in exactly one partition.",
    "The key insight: track the farthest last-occurrence of any character seen so far.",
    "When i == end, all characters in the current partition are fully contained.",
    "Only 26 lowercase letters, so the last-occurrence map is O(1) space.",
    "This is essentially an interval merging problem where each character defines an interval [first, last].",
  ],

  relatedProblems: ["merge-intervals", "hand-of-straights", "merge-triplets"],
};
