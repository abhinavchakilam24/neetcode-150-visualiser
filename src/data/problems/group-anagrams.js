export const groupAnagrams = {
  id: 4,
  slug: "group-anagrams",
  title: "Group Anagrams",
  difficulty: "Medium",
  topic: "arrays-hashing",
  topicLabel: "Arrays & Hashing",
  neetcodeNumber: 4,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/group-anagrams/",

  pattern: "Canonical Key Grouping with HashMap",
  patternExplanation: `When grouping elements by equivalence (anagrams, permutations, etc.),
    transform each element into a canonical key that is identical for all equivalent elements.
    Use a HashMap to collect elements sharing the same key into the same bucket.`,

  intuition: {
    coreInsight: `Two strings are anagrams if and only if they contain the exact same characters
      in the exact same frequencies. Sorting a string produces a canonical form — all anagrams
      of "eat" sort to "aet". By using this sorted form as a HashMap key, every anagram maps to
      the same bucket automatically. One pass through the array, one sort per string, done.`,

    mentalModel: `Imagine a mailroom where letters arrive addressed with scrambled names. "eat",
      "tea", and "ate" are all the same person — just with jumbled letters on the envelope. The
      mailroom clerk alphabetizes each name to get the "real" name: all three become "aet". Now
      every letter for that person goes into the same mailbox. The sorted string IS the mailbox
      label, and the HashMap IS the wall of mailboxes.`,

    whyNaiveFails: `Brute force compares every pair of strings to check if they're anagrams.
      For n strings each of length k, that's O(n²) pairs, and each comparison takes O(k) time
      (sorting or counting characters). Total: O(n² * k). For n=10,000, that's 100 million
      string comparisons — far too slow. The HashMap approach does it in O(n * k * log(k)).`,

    keyObservation: `The key insight is choosing the right canonical form. Sorting each string
      works in O(k log k) per string. An alternative is using character frequency as the key
      (e.g., "1#0#0#...#1#0#1" for counts of a-z), which runs in O(k) per string. Both produce
      identical keys for anagrams and distinct keys for non-anagrams.`,
  },

  problem: `Given an array of strings strs, group the anagrams together. You can return the
    answer in any order. An anagram is a word or phrase formed by rearranging the letters of
    a different word or phrase, using all the original letters exactly once.`,

  examples: [
    { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: "Anagram groups: eat/tea/ate, tan/nat, bat" },
    { input: 'strs = [""]', output: '[[""]]', explanation: "Single empty string forms its own group" },
    { input: 'strs = ["a"]', output: '[["a"]]', explanation: "Single character forms its own group" },
  ],

  constraints: [
    "1 <= strs.length <= 10^4",
    "0 <= strs[i].length <= 100",
    "strs[i] consists of lowercase English letters.",
  ],

  approaches: {
    brute: {
      label: "Brute Force — Compare All Pairs",
      tier: "brute",
      timeComplexity: "O(n² * k)",
      spaceComplexity: "O(n * k)",
      idea: `For each string, compare it against all others to find anagrams. Use a visited
        array to avoid re-grouping. Two strings are anagrams if sorting both yields the same
        result. Group matches together.`,

      javaCode: `public List<List<String>> groupAnagrams(String[] strs) {
    List<List<String>> result = new ArrayList<>();
    boolean[] used = new boolean[strs.length];

    for (int i = 0; i < strs.length; i++) {
        if (used[i]) continue;
        List<String> group = new ArrayList<>();
        group.add(strs[i]);
        String sortedI = sortString(strs[i]);

        for (int j = i + 1; j < strs.length; j++) {
            if (!used[j] && sortString(strs[j]).equals(sortedI)) {
                group.add(strs[j]);
                used[j] = true;
            }
        }
        result.add(group);
    }
    return result;
}

private String sortString(String s) {
    char[] arr = s.toCharArray();
    Arrays.sort(arr);
    return new String(arr);
}`,

      cppCode: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    vector<vector<string>> result;
    vector<bool> used(strs.size(), false);

    for (int i = 0; i < strs.size(); i++) {
        if (used[i]) continue;
        vector<string> group;
        group.push_back(strs[i]);
        string sortedI = strs[i];
        sort(sortedI.begin(), sortedI.end());

        for (int j = i + 1; j < strs.size(); j++) {
            string sortedJ = strs[j];
            sort(sortedJ.begin(), sortedJ.end());
            if (!used[j] && sortedJ == sortedI) {
                group.push_back(strs[j]);
                used[j] = true;
            }
        }
        result.push_back(group);
    }
    return result;
}`,

      pythonCode: `def groupAnagrams(strs: List[str]) -> List[List[str]]:
    result = []
    used = [False] * len(strs)

    for i in range(len(strs)):
        if used[i]:
            continue
        group = [strs[i]]
        sorted_i = ''.join(sorted(strs[i]))

        for j in range(i + 1, len(strs)):
            if not used[j] and ''.join(sorted(strs[j])) == sorted_i:
                group.append(strs[j])
                used[j] = True
        result.append(group)
    return result`,

      lineAnnotations: {
        2: "Result list holds all anagram groups",
        3: "Track which strings have already been grouped",
        5: "Pick each ungrouped string as a new group leader",
        6: "Skip strings already assigned to a group",
        7: "Start a new group with this string",
        8: "Sort the leader string to get its canonical form",
        10: "Compare against every subsequent string",
        11: "If not used and sorts to the same key — it's an anagram",
        12: "Add the anagram to this group",
        13: "Mark it so we don't re-group it later",
        16: "Finished one group — add it to the result",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
          expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Initialize",
              explanation: "Create an empty result list and a used[] array of 6 falses. We'll scan through all strings, grouping anagrams together.",
              variables: { result: "[]", used: "[F,F,F,F,F,F]" },
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
              lineNumbers: [5, 7, 8],
              shortLabel: 'i=0: leader="eat", sorted="aet"',
              explanation: 'Start with i=0, string "eat". It\'s not used, so it becomes the leader of a new group. Sort it to get "aet" as the canonical form.',
              variables: { i: 0, "strs[i]": "eat", sortedI: "aet", group: '["eat"]' },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [10, 11],
              shortLabel: 'j=1: "tea" sorts to "aet" — match!',
              explanation: 'Compare j=1 ("tea"). Sort it: "aet". Matches "aet"! Add "tea" to the group and mark used[1]=true.',
              variables: { i: 0, j: 1, "strs[j]": "tea", sortedJ: "aet", sortedI: "aet", group: '["eat","tea"]' },
              dataStructure: {
                arrayStates: { 0: "active", 1: "found", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 1, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [10, 11],
              shortLabel: 'j=2: "tan" sorts to "ant" — no match',
              explanation: 'Compare j=2 ("tan"). Sort it: "ant". Does NOT match "aet". Skip — "tan" is not an anagram of "eat".',
              variables: { i: 0, j: 2, "strs[j]": "tan", sortedJ: "ant", sortedI: "aet" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "found", 2: "eliminated", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 2, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [10, 11, 12],
              shortLabel: 'j=3: "ate" sorts to "aet" — match!',
              explanation: 'Compare j=3 ("ate"). Sort it: "aet". Matches! Add "ate" to the group. Mark used[3]=true.',
              variables: { i: 0, j: 3, "strs[j]": "ate", sortedJ: "aet", sortedI: "aet", group: '["eat","tea","ate"]' },
              dataStructure: {
                arrayStates: { 0: "active", 1: "found", 2: "default", 3: "found", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 3, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [10, 11],
              shortLabel: 'j=4: "nat" sorts to "ant" — no match',
              explanation: 'Compare j=4 ("nat"). Sort it: "ant". Does NOT match "aet". Skip.',
              variables: { i: 0, j: 4, "strs[j]": "nat", sortedJ: "ant", sortedI: "aet" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "found", 2: "default", 3: "found", 4: "eliminated", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 4, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [10, 11],
              shortLabel: 'j=5: "bat" sorts to "abt" — no match',
              explanation: 'Compare j=5 ("bat"). Sort it: "abt". Does NOT match "aet". Skip. Inner loop done.',
              variables: { i: 0, j: 5, "strs[j]": "bat", sortedJ: "abt", sortedI: "aet" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "found", 2: "default", 3: "found", 4: "default", 5: "eliminated" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "j", index: 5, color: "active" }],
                hashMap: {},
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [16],
              shortLabel: 'Group 1 done: ["eat","tea","ate"]',
              explanation: 'First group complete: ["eat","tea","ate"]. Add to result. Move to next ungrouped string.',
              variables: { i: 0, group: '["eat","tea","ate"]', result: '[["eat","tea","ate"]]' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "default", 3: "visited", 4: "default", 5: "default" },
                pointers: [],
                hashMap: { "aet": { value: '["eat","tea","ate"]', isNew: true } },
              },
              delta: { mapAdded: [{ key: "aet", value: '["eat","tea","ate"]' }] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [5, 7, 8, 10, 11, 12, 16],
              shortLabel: 'i=2: "tan" group → ["tan","nat"]',
              explanation: 'i=1 is used (skip). i=2 ("tan") is free. Sort: "ant". Scan j=3..5: j=3 used, j=4 ("nat" → "ant") matches! Group: ["tan","nat"]. j=5 no match. Add group to result.',
              variables: { i: 2, "strs[i]": "tan", sortedI: "ant", group: '["tan","nat"]', result: '[["eat","tea","ate"],["tan","nat"]]' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "aet": { value: '["eat","tea","ate"]' }, "ant": { value: '["tan","nat"]', isNew: true } },
              },
              delta: { changedIndices: [2, 4], mapAdded: [{ key: "ant", value: '["tan","nat"]' }] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [5, 7, 16],
              shortLabel: 'i=5: "bat" group → ["bat"]',
              explanation: 'i=3,4 are used (skip). i=5 ("bat") is free. Sort: "abt". No j beyond 5. Group: ["bat"]. Add to result. All strings grouped!',
              variables: { i: 5, "strs[i]": "bat", sortedI: "abt", group: '["bat"]', result: '[["eat","tea","ate"],["tan","nat"],["bat"]]' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "found" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                hashMap: { "aet": { value: '["eat","tea","ate"]' }, "ant": { value: '["tan","nat"]' }, "abt": { value: '["bat"]', isNew: true } },
              },
              delta: { changedIndices: [5], mapAdded: [{ key: "abt", value: '["bat"]' }] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [17],
              shortLabel: "Return 3 groups",
              explanation: 'All strings are grouped. Return [["eat","tea","ate"],["tan","nat"],["bat"]]. Brute force works but required O(n²) pair comparisons.',
              variables: { result: '[["eat","tea","ate"],["tan","nat"],["bat"]]' },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found" },
                pointers: [],
                hashMap: { "aet": { value: '["eat","tea","ate"]', isHighlighted: true }, "ant": { value: '["tan","nat"]', isHighlighted: true }, "abt": { value: '["bat"]', isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1, 2, 3, 4, 5] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ strs }) {
        const steps = [];
        const n = strs.length;
        const used = new Array(n).fill(false);
        const result = [];
        const defaultStates = () => Object.fromEntries(strs.map((_, i) => [i, "default"]));
        const sortStr = (s) => s.split("").sort().join("");

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Initialize",
          explanation: `Create an empty result list and a used[] array of ${n} falses.`,
          variables: { result: "[]", used: "[" + new Array(n).fill("F").join(",") + "]" },
          dataStructure: { arrayStates: defaultStates(), pointers: [], hashMap: {} },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          if (used[i]) continue;
          const group = [strs[i]];
          const sortedI = sortStr(strs[i]);
          used[i] = true;

          const states = { ...defaultStates() };
          for (let x = 0; x < n; x++) {
            if (used[x] && x !== i) states[x] = "visited";
          }
          states[i] = "active";

          steps.push({
            stepId: steps.length, lineNumbers: [5, 7, 8],
            shortLabel: `i=${i}: leader="${strs[i]}", sorted="${sortedI}"`,
            explanation: `Pick i=${i} ("${strs[i]}") as group leader. Sort it: "${sortedI}". Scan for anagrams.`,
            variables: { i, "strs[i]": strs[i], sortedI, group: JSON.stringify(group) },
            dataStructure: {
              arrayStates: { ...states },
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: {},
            },
            delta: { changedIndices: [i] }, isAnswer: false,
          });

          for (let j = i + 1; j < n; j++) {
            if (used[j]) continue;
            const sortedJ = sortStr(strs[j]);
            if (sortedJ === sortedI) {
              group.push(strs[j]);
              used[j] = true;
              steps.push({
                stepId: steps.length, lineNumbers: [10, 11, 12],
                shortLabel: `j=${j}: "${strs[j]}" → "${sortedJ}" match!`,
                explanation: `j=${j} ("${strs[j]}") sorts to "${sortedJ}" — matches "${sortedI}"! Add to group.`,
                variables: { i, j, "strs[j]": strs[j], sortedJ, sortedI, group: JSON.stringify(group) },
                dataStructure: {
                  arrayStates: { ...states, [j]: "found" },
                  pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
                  hashMap: {},
                },
                delta: { changedIndices: [j] }, isAnswer: false,
              });
            } else {
              steps.push({
                stepId: steps.length, lineNumbers: [10, 11],
                shortLabel: `j=${j}: "${strs[j]}" → "${sortedJ}" no match`,
                explanation: `j=${j} ("${strs[j]}") sorts to "${sortedJ}" — doesn't match "${sortedI}". Skip.`,
                variables: { i, j, "strs[j]": strs[j], sortedJ, sortedI },
                dataStructure: {
                  arrayStates: { ...states, [j]: "eliminated" },
                  pointers: [{ name: "i", index: i, color: "pointer" }, { name: "j", index: j, color: "active" }],
                  hashMap: {},
                },
                delta: { changedIndices: [j] }, isAnswer: false,
              });
            }
          }

          result.push(group);
          steps.push({
            stepId: steps.length, lineNumbers: [16],
            shortLabel: `Group done: ${JSON.stringify(group)}`,
            explanation: `Group complete: ${JSON.stringify(group)}. Add to result.`,
            variables: { i, group: JSON.stringify(group), result: JSON.stringify(result) },
            dataStructure: {
              arrayStates: Object.fromEntries(strs.map((_, x) => [x, used[x] ? "visited" : "default"])),
              pointers: [],
              hashMap: {},
            },
            delta: {}, isAnswer: false,
          });
        }

        steps[steps.length - 1].isAnswer = true;
        steps[steps.length - 1].lineNumbers = [17];
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Sorted Key HashMap",
      tier: "optimal",
      timeComplexity: "O(n * k * log(k))",
      spaceComplexity: "O(n * k)",
      idea: `Sort each string to produce a canonical key. Use a HashMap where the key is the
        sorted string and the value is the list of original strings sharing that key. One pass
        through the input, one sort per string. Return all HashMap values.`,

      javaCode: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();

    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);

        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }

    return new ArrayList<>(map.values());
}`,

      cppCode: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> map;

    for (const string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());

        map[key].push_back(s);
    }

    vector<vector<string>> result;
    for (auto& [key, group] : map) {
        result.push_back(group);
    }
    return result;
}`,

      pythonCode: `def groupAnagrams(strs: List[str]) -> List[List[str]]:
    groups = defaultdict(list)

    for s in strs:
        key = ''.join(sorted(s))
        groups[key].append(s)

    return list(groups.values())`,

      lineAnnotations: {
        2: "HashMap: sorted string → list of original anagrams",
        4: "Iterate through each string once",
        5: "Convert to char array for sorting",
        6: "Sort characters to get canonical form",
        7: "Convert sorted chars back to string key",
        9: "Add original string to its anagram group bucket",
        12: "Return all groups as a list of lists",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with three anagram groups",
          input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
          expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashMap",
              explanation: "Create an empty HashMap. Keys will be sorted strings, values will be lists of original anagram strings sharing that key.",
              variables: { map: "{}" },
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
              lineNumbers: [4, 5, 6, 7],
              shortLabel: '"eat" → sort → "aet"',
              explanation: 'Process "eat". Sort its characters: e,a,t → a,e,t → key = "aet". This sorted form is the canonical representation — all anagrams of "eat" will produce this same key.',
              variables: { s: "eat", key: "aet", map: "{}" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9],
              shortLabel: 'map["aet"] = ["eat"]',
              explanation: 'Key "aet" doesn\'t exist in the map yet. Create a new list and add "eat" to it. The first member of this anagram group is now stored.',
              variables: { s: "eat", key: "aet", map: '{"aet":["eat"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "aet": { value: '["eat"]', isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: "aet", value: '["eat"]' }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: '"tea" → sort → "aet"',
              explanation: 'Process "tea". Sort its characters: t,e,a → a,e,t → key = "aet". Same key as "eat"! These are anagrams.',
              variables: { s: "tea", key: "aet", map: '{"aet":["eat"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "aet": { value: '["eat"]' } },
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9],
              shortLabel: 'map["aet"] = ["eat","tea"]',
              explanation: 'Key "aet" already exists in the map! Append "tea" to the existing list. Two anagrams found so far.',
              variables: { s: "tea", key: "aet", map: '{"aet":["eat","tea"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "default", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "aet": { value: '["eat","tea"]', isHighlighted: true } },
              },
              delta: { changedIndices: [1], mapHighlighted: ["aet"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: '"tan" → sort → "ant"',
              explanation: 'Process "tan". Sort: t,a,n → a,n,t → key = "ant". This is a different key from "aet" — "tan" is NOT an anagram of "eat".',
              variables: { s: "tan", key: "ant", map: '{"aet":["eat","tea"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "aet": { value: '["eat","tea"]' } },
              },
              delta: { changedIndices: [2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9],
              shortLabel: 'map["ant"] = ["tan"]',
              explanation: 'Key "ant" is new. Create a new group with "tan". Now we have two groups in the map.',
              variables: { s: "tan", key: "ant", map: '{"aet":["eat","tea"],"ant":["tan"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "default", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "aet": { value: '["eat","tea"]' }, "ant": { value: '["tan"]', isNew: true } },
              },
              delta: { changedIndices: [2], mapAdded: [{ key: "ant", value: '["tan"]' }] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [4, 5, 6, 7],
              shortLabel: '"ate" → sort → "aet"',
              explanation: 'Process "ate". Sort: a,t,e → a,e,t → key = "aet". Same key as "eat" and "tea"! Third anagram found.',
              variables: { s: "ate", key: "aet", map: '{"aet":["eat","tea"],"ant":["tan"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "aet": { value: '["eat","tea"]' }, "ant": { value: '["tan"]' } },
              },
              delta: { changedIndices: [3], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [9],
              shortLabel: 'map["aet"] = ["eat","tea","ate"]',
              explanation: 'Append "ate" to the "aet" group. Three anagrams of "eat" now live in one bucket.',
              variables: { s: "ate", key: "aet", map: '{"aet":["eat","tea","ate"],"ant":["tan"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "default", 5: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "aet": { value: '["eat","tea","ate"]', isHighlighted: true }, "ant": { value: '["tan"]' } },
              },
              delta: { changedIndices: [3], mapHighlighted: ["aet"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: '"nat" → "ant" → append',
              explanation: 'Process "nat". Sort: n,a,t → a,n,t → key = "ant". Key "ant" exists — append "nat". Now ["tan","nat"] are grouped.',
              variables: { s: "nat", key: "ant", map: '{"aet":["eat","tea","ate"],"ant":["tan","nat"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                hashMap: { "aet": { value: '["eat","tea","ate"]' }, "ant": { value: '["tan","nat"]', isHighlighted: true } },
              },
              delta: { changedIndices: [4], movedPointers: ["i"], mapHighlighted: ["ant"] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: '"bat" → "abt" → new group',
              explanation: 'Process "bat". Sort: b,a,t → a,b,t → key = "abt". New key — "bat" has no anagrams among the other strings. Create a new group.',
              variables: { s: "bat", key: "abt", map: '{"aet":["eat","tea","ate"],"ant":["tan","nat"],"abt":["bat"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "visited", 5: "visited" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                hashMap: { "aet": { value: '["eat","tea","ate"]' }, "ant": { value: '["tan","nat"]' }, "abt": { value: '["bat"]', isNew: true } },
              },
              delta: { changedIndices: [5], movedPointers: ["i"], mapAdded: [{ key: "abt", value: '["bat"]' }] },
              isAnswer: false,
            },
            {
              stepId: 11,
              lineNumbers: [12],
              shortLabel: "Return 3 groups",
              explanation: 'All strings processed in a single pass. Return map.values(): [["eat","tea","ate"],["tan","nat"],["bat"]]. Each string was sorted once (O(k log k)) and looked up once (O(1)). Total: O(n * k * log k).',
              variables: { result: '[["eat","tea","ate"],["tan","nat"],["bat"]]' },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found", 5: "found" },
                pointers: [],
                hashMap: { "aet": { value: '["eat","tea","ate"]', isHighlighted: true }, "ant": { value: '["tan","nat"]', isHighlighted: true }, "abt": { value: '["bat"]', isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1, 2, 3, 4, 5] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Empty Strings",
          description: "All strings are empty — they're all anagrams of each other",
          input: { strs: ["", "", ""] },
          expectedOutput: '[["","",""]]',
          commonMistake: "Forgetting that empty strings are valid anagrams of each other. Sorting an empty string gives an empty string, so they all share the key ''.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashMap",
              explanation: "Create an empty HashMap. All three strings are empty — let's see how the sorted-key approach handles this.",
              variables: { map: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: 'strs[0]: "" → sort → ""',
              explanation: 'Process first empty string. Sorting an empty string gives an empty string: key = "". Create new group with "".',
              variables: { s: '""', key: '""', map: '{"":[""]}'  },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { '""': { value: '[""]', isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: '""', value: '[""]' }] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: 'strs[1]: "" → append to ""',
              explanation: 'Second empty string also sorts to "". Key exists — append. Group is now ["",""].',
              variables: { s: '""', key: '""', map: '{"":["",""]}'  },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { '""': { value: '["",""]', isHighlighted: true } },
              },
              delta: { changedIndices: [1], mapHighlighted: ['""'] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: 'strs[2]: "" → append to ""',
              explanation: 'Third empty string also sorts to "". Append again. Group: ["","",""].',
              variables: { s: '""', key: '""', map: '{"":["","",""]}'  },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { '""': { value: '["","",""]', isHighlighted: true } },
              },
              delta: { changedIndices: [2], mapHighlighted: ['""'] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12],
              shortLabel: 'Return [["","",""]]',
              explanation: 'All three empty strings land in the same bucket. Return [["","",""]]. Empty strings are valid anagrams of each other — the sorted-key approach handles this naturally.',
              variables: { result: '[["","",""]]' },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { '""': { value: '["","",""]', isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "No Anagrams",
          description: "Every string is unique — no two are anagrams",
          input: { strs: ["abc", "def", "ghi"] },
          expectedOutput: '[["abc"],["def"],["ghi"]]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Init HashMap",
              explanation: "Create an empty HashMap. None of these strings are anagrams of each other — each will get its own bucket.",
              variables: { map: "{}" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: '"abc" → "abc" → new group',
              explanation: 'Process "abc". Sort: already sorted → key = "abc". New key, create group ["abc"].',
              variables: { s: "abc", key: "abc", map: '{"abc":["abc"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "abc": { value: '["abc"]', isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: "abc", value: '["abc"]' }] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: '"def" → "def" → new group',
              explanation: 'Process "def". Sort: already sorted → key = "def". Different from "abc". New group ["def"].',
              variables: { s: "def", key: "def", map: '{"abc":["abc"],"def":["def"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "abc": { value: '["abc"]' }, "def": { value: '["def"]', isNew: true } },
              },
              delta: { changedIndices: [1], mapAdded: [{ key: "def", value: '["def"]' }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6, 7, 9],
              shortLabel: '"ghi" → "ghi" → new group',
              explanation: 'Process "ghi". Sort: already sorted → key = "ghi". Another unique key. New group ["ghi"].',
              variables: { s: "ghi", key: "ghi", map: '{"abc":["abc"],"def":["def"],"ghi":["ghi"]}' },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "abc": { value: '["abc"]' }, "def": { value: '["def"]' }, "ghi": { value: '["ghi"]', isNew: true } },
              },
              delta: { changedIndices: [2], mapAdded: [{ key: "ghi", value: '["ghi"]' }] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12],
              shortLabel: "Return 3 single-element groups",
              explanation: 'No anagrams found — each string is its own group. Return [["abc"],["def"],["ghi"]]. Worst case for space: n groups of 1.',
              variables: { result: '[["abc"],["def"],["ghi"]]' },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { "abc": { value: '["abc"]', isHighlighted: true }, "def": { value: '["def"]', isHighlighted: true }, "ghi": { value: '["ghi"]', isHighlighted: true } },
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ strs }) {
        const steps = [];
        const map = {};
        const sortStr = (s) => s.split("").sort().join("");

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init HashMap",
          explanation: "Create an empty HashMap. Keys will be sorted strings, values will be lists of anagrams.",
          variables: { map: "{}" },
          dataStructure: {
            arrayStates: Object.fromEntries(strs.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < strs.length; i++) {
          const s = strs[i];
          const key = sortStr(s);

          // Step: compute the sorted key
          steps.push({
            stepId: steps.length, lineNumbers: [4, 5, 6, 7],
            shortLabel: `"${s}" → sort → "${key}"`,
            explanation: `Process "${s}". Sort its characters to get the canonical key: "${key}".`,
            variables: { s, key, map: JSON.stringify(map) },
            dataStructure: {
              arrayStates: Object.fromEntries(strs.map((_, j) => [j, j < i ? "visited" : j === i ? "active" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: Object.fromEntries(Object.entries(map).map(([k, v]) => [k, { value: JSON.stringify(v) }])),
            },
            delta: { changedIndices: [i], movedPointers: ["i"] }, isAnswer: false,
          });

          // Add to map
          if (!map[key]) {
            map[key] = [];
          }
          map[key].push(s);

          const isExistingKey = map[key].length > 1;
          steps.push({
            stepId: steps.length, lineNumbers: [9],
            shortLabel: isExistingKey ? `Append "${s}" to "${key}"` : `map["${key}"] = ["${s}"]`,
            explanation: isExistingKey
              ? `Key "${key}" already exists. Append "${s}" to the group: ${JSON.stringify(map[key])}.`
              : `Key "${key}" is new. Create group with ["${s}"].`,
            variables: { s, key, map: JSON.stringify(map) },
            dataStructure: {
              arrayStates: Object.fromEntries(strs.map((_, j) => [j, j <= i ? "visited" : "default"])),
              pointers: [{ name: "i", index: i, color: "pointer" }],
              hashMap: Object.fromEntries(Object.entries(map).map(([k, v]) => [k, {
                value: JSON.stringify(v),
                isNew: !isExistingKey && k === key,
                isHighlighted: isExistingKey && k === key,
              }])),
            },
            delta: isExistingKey
              ? { changedIndices: [i], mapHighlighted: [key] }
              : { changedIndices: [i], mapAdded: [{ key, value: JSON.stringify(map[key]) }] },
            isAnswer: false,
          });
        }

        // Final step: return result
        const result = Object.values(map);
        steps.push({
          stepId: steps.length, lineNumbers: [12],
          shortLabel: `Return ${result.length} groups`,
          explanation: `All strings processed. Return map.values(): ${JSON.stringify(result)}. Each string was sorted once and looked up once.`,
          variables: { result: JSON.stringify(result) },
          dataStructure: {
            arrayStates: Object.fromEntries(strs.map((_, i) => [i, "found"])),
            pointers: [],
            hashMap: Object.fromEntries(Object.entries(map).map(([k, v]) => [k, { value: JSON.stringify(v), isHighlighted: true }])),
          },
          delta: { changedIndices: strs.map((_, i) => i) },
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n² * k)", space: "O(n * k)", explanation: "Compare every pair of strings; each comparison involves sorting (O(k log k))" },
    optimal: { time: "O(n * k * log(k))", space: "O(n * k)", explanation: "Sort each of n strings of length k; HashMap operations are O(1) amortized", tradeoff: "Using O(n * k) space for the HashMap eliminates the O(n²) pair comparisons entirely" },
  },

  interviewTips: [
    "Start by clarifying: 'Are all characters lowercase English letters?' — this determines if frequency counting is viable.",
    "Mention brute force (compare all pairs) and its O(n² * k) complexity before jumping to optimal.",
    "Explain the canonical key idea clearly: 'All anagrams produce the same sorted string.'",
    "Proactively mention the O(n * k) alternative using character frequency as the key — it avoids the log(k) sorting cost.",
    "Discuss the space-time tradeoff: O(n * k) extra space for the HashMap saves us from O(n²) comparisons.",
    "Edge cases to mention: empty strings, single-character strings, all identical strings, no anagrams at all.",
  ],

  relatedProblems: ["valid-anagram", "group-shifted-strings", "find-all-anagrams-in-string"],
};
