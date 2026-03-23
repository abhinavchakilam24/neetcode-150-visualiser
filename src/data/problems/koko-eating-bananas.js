export const kokoEatingBananas = {
  id: 30,
  slug: "koko-eating-bananas",
  title: "Koko Eating Bananas",
  difficulty: "Medium",
  topic: "binary-search",
  topicLabel: "Binary Search",
  neetcodeNumber: 30,
  artifactType: "BinarySearch",
  companies: ["Google", "Amazon", "Facebook", "DoorDash", "Uber"],
  leetcodeLink: "https://leetcode.com/problems/koko-eating-bananas/",

  pattern: "Binary Search on Answer Space",
  patternExplanation: `When the problem asks for the minimum/maximum value satisfying a condition,
    and the answer space is monotonic (if speed k works, then k+1 also works), binary search on
    the answer itself rather than on the input array.`,

  intuition: {
    coreInsight: `We're not searching through the piles — we're searching through possible eating
      speeds. The answer k is somewhere between 1 and max(piles). For any speed k, we can compute
      how many hours Koko needs: sum of ceil(pile/k) for each pile. If hours <= h, speed k works.
      The key: if speed k works, any speed > k also works. If speed k fails, any speed < k also
      fails. This monotonicity is what makes binary search applicable.`,

    mentalModel: `Imagine a dial that controls Koko's eating speed, going from 1 to max(piles).
      Turn it all the way up and she finishes easily. Turn it all the way down and she can't
      finish in time. There's a sweet spot — the lowest setting where she just barely finishes.
      Instead of trying every setting from 1 upward, you jump to the middle, check if she
      finishes, then narrow down. Binary search finds that sweet spot in log(max(piles)) tries.`,

    whyNaiveFails: `Testing every speed from 1 to max(piles) is O(max(piles) * n). If piles
      have values up to 10^9, that's billions of iterations. Binary search reduces this to
      O(n * log(max(piles))) — about 30 iterations of the outer search, each scanning n piles.`,

    keyObservation: `The feasibility function is monotonic: canFinish(k) returns false for small k
      and true for large k. We want the smallest k where canFinish(k) is true. This is the
      classic "find the leftmost true" binary search pattern. Use ceil(pile/k) = (pile + k - 1) / k
      to avoid floating point.`,
  },

  problem: `Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i]
    bananas. The guards have gone and will come back in h hours. Koko can decide her
    bananas-per-hour eating speed of k. Each hour, she chooses some pile and eats k bananas
    from it. If the pile has less than k bananas, she eats all of them and won't eat any more
    during that hour. Return the minimum integer k such that she can eat all bananas within h hours.`,

  examples: [
    { input: "piles = [3,6,7,11], h = 8", output: "4", explanation: "At speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 <= 8" },
    { input: "piles = [30,11,23,4,20], h = 5", output: "30", explanation: "At speed 30 each pile takes 1 hour = 5 hours total" },
    { input: "piles = [30,11,23,4,20], h = 6", output: "23", explanation: "At speed 23: 2+1+1+1+1 = 6 <= 6" },
  ],

  constraints: [
    "1 <= piles.length <= 10^4",
    "piles.length <= h <= 10^9",
    "1 <= piles[i] <= 10^9",
  ],

  approaches: {
    brute: {
      label: "Linear Search from k=1",
      tier: "brute",
      timeComplexity: "O(max(piles) * n)",
      spaceComplexity: "O(1)",
      idea: "Try every speed k from 1 to max(piles). For each k, compute total hours. Return the first k where hours <= h.",

      javaCode: `public int minEatingSpeed(int[] piles, int h) {
    int maxPile = 0;
    for (int p : piles) maxPile = Math.max(maxPile, p);

    for (int k = 1; k <= maxPile; k++) {
        long hours = 0;
        for (int p : piles) {
            hours += (p + k - 1) / k;
        }
        if (hours <= h) return k;
    }
    return maxPile;
}`,

      cppCode: `int minEatingSpeed(vector<int>& piles, int h) {
    int maxPile = *max_element(piles.begin(), piles.end());

    for (int k = 1; k <= maxPile; k++) {
        long long hours = 0;
        for (int p : piles) {
            hours += (p + k - 1) / k;
        }
        if (hours <= h) return k;
    }
    return maxPile;
}`,

      pythonCode: `def minEatingSpeed(piles: List[int], h: int) -> int:
    max_pile = max(piles)

    for k in range(1, max_pile + 1):
        hours = sum((p + k - 1) // k for p in piles)
        if hours <= h:
            return k
    return max_pile`,

      lineAnnotations: {
        2: "Find the maximum pile size — upper bound for k",
        5: "Try every speed from 1 to max",
        6: "Calculate total hours needed at speed k",
        7: "For each pile: hours = ceil(pile / k)",
        8: "Ceiling division without floating point",
        10: "First k where total hours fits — that's our answer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { piles: [3, 6, 7, 11], h: 8 },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "maxPile = 11",
              explanation: "Find the maximum pile: max(3,6,7,11) = 11. We'll try speeds from 1 to 11.",
              variables: { maxPile: 11, h: 8 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default" },
                pointers: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "k=1: hours=27 > 8",
              explanation: "At speed k=1: ceil(3/1)+ceil(6/1)+ceil(7/1)+ceil(11/1) = 3+6+7+11 = 27. Way too slow (27 > 8).",
              variables: { k: 1, hours: 27, h: 8 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default" },
                pointers: [{ name: "k", index: 0, color: "pointer" }],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "k=2: hours=15 > 8",
              explanation: "At speed k=2: ceil(3/2)+ceil(6/2)+ceil(7/2)+ceil(11/2) = 2+3+4+6 = 15. Still too slow.",
              variables: { k: 2, hours: 15, h: 8 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default" },
                pointers: [{ name: "k", index: 1, color: "pointer" }],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 8],
              shortLabel: "k=3: hours=10 > 8",
              explanation: "At speed k=3: ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10. Still over 8.",
              variables: { k: 3, hours: 10, h: 8 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default" },
                pointers: [{ name: "k", index: 2, color: "pointer" }],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [5, 6, 7, 8, 10],
              shortLabel: "k=4: hours=8 <= 8 ✓",
              explanation: "At speed k=4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8. Exactly 8 <= 8! Return 4.",
              variables: { k: 4, hours: 8, h: 8, answer: "4" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default" },
                pointers: [{ name: "k", index: 3, color: "active" }],
              },
              delta: { changedIndices: [3] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ piles, h }) {
        const steps = [];
        const maxPile = Math.max(...piles);
        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: `maxPile = ${maxPile}`,
          explanation: `Maximum pile size is ${maxPile}. Try speeds from 1 to ${maxPile}.`,
          variables: { maxPile, h },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: maxPile }, (_, i) => [i, "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: false,
        });

        for (let k = 1; k <= maxPile; k++) {
          let hours = 0;
          for (const p of piles) hours += Math.ceil(p / k);
          const fits = hours <= h;
          steps.push({
            stepId: steps.length, lineNumbers: fits ? [5, 6, 7, 8, 10] : [5, 6, 7, 8],
            shortLabel: fits ? `k=${k}: hours=${hours} <= ${h} ✓` : `k=${k}: hours=${hours} > ${h}`,
            explanation: fits
              ? `At speed k=${k}: total hours = ${hours} <= ${h}. This works! Return ${k}.`
              : `At speed k=${k}: total hours = ${hours} > ${h}. Too slow.`,
            variables: { k, hours, h, ...(fits ? { answer: String(k) } : {}) },
            dataStructure: {
              arrayStates: Object.fromEntries(Array.from({ length: Math.min(maxPile, 20) }, (_, i) => [i, i < k - 1 ? "eliminated" : i === k - 1 ? (fits ? "found" : "active") : "default"])),
              pointers: [{ name: "k", index: k - 1, color: fits ? "active" : "pointer" }],
            },
            delta: { changedIndices: [k - 1] }, isAnswer: fits,
          });
          if (fits) return steps;
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Binary Search on Speed",
      tier: "optimal",
      timeComplexity: "O(n * log(max(piles)))",
      spaceComplexity: "O(1)",
      idea: `Binary search on speed k in range [1, max(piles)]. For each candidate k, compute total
        hours needed. If hours <= h, k might be the answer — try smaller. If hours > h, k is too
        slow — try larger. Return the smallest valid k.`,

      javaCode: `public int minEatingSpeed(int[] piles, int h) {
    int lo = 1, hi = 0;
    for (int p : piles) hi = Math.max(hi, p);

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        long hours = 0;
        for (int p : piles) {
            hours += (p + mid - 1) / mid;
        }
        if (hours <= h) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }

    return lo;
}`,

      cppCode: `int minEatingSpeed(vector<int>& piles, int h) {
    int lo = 1, hi = *max_element(piles.begin(), piles.end());

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        long long hours = 0;
        for (int p : piles) {
            hours += (p + mid - 1) / mid;
        }
        if (hours <= h) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }

    return lo;
}`,

      pythonCode: `def minEatingSpeed(piles: List[int], h: int) -> int:
    lo, hi = 1, max(piles)

    while lo < hi:
        mid = lo + (hi - lo) // 2
        hours = sum((p + mid - 1) // mid for p in piles)
        if hours <= h:
            hi = mid
        else:
            lo = mid + 1

    return lo`,

      lineAnnotations: {
        2: "lo=1 (minimum speed), hi=max(piles) (eat any pile in 1 hour)",
        3: "Find the maximum pile for upper bound",
        5: "Binary search: lo < hi because we're finding leftmost valid",
        6: "Try the middle speed",
        7: "Compute total hours needed at this speed",
        8: "For each pile: ceil(pile / mid) hours",
        9: "Ceiling division without floating point",
        11: "hours <= h means speed mid works — but maybe we can go slower",
        12: "Keep mid as a candidate, search left for smaller valid speed",
        13: "hours > h means speed mid is too slow",
        14: "Discard mid and everything slower",
        17: "lo == hi == the minimum valid speed",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Finding minimum speed to eat [3,6,7,11] in 8 hours",
          input: { piles: [3, 6, 7, 11], h: 8 },
          expectedOutput: "4",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init lo=1, hi=11",
              explanation: "Speed range: lo=1 (slowest possible), hi=11 (max pile — finishes any pile in 1 hour). We need to find the minimum k where Koko finishes in 8 hours.",
              variables: { lo: 1, hi: 11, h: 8, piles: "[3,6,7,11]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 10, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: null,
                bsRight: 10,
                bsCondition: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "mid=6: hours=7",
              explanation: "mid = 1 + (11-1)/2 = 6. At speed 6: ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 hours. 6 <= 8, so speed 6 works.",
              variables: { lo: 1, hi: 11, mid: 6, hours: 6, h: 8 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "active", 6: "default", 7: "default", 8: "default", 9: "default", 10: "default" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 5, color: "active" },
                  { name: "hi", index: 10, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 5,
                bsRight: 10,
                bsCondition: "hours=6 <= h=8 → can try slower",
              },
              delta: { changedIndices: [5] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "6 <= 8 → hi=6, search slower",
              explanation: "Speed 6 works! But maybe we can eat slower. Set hi = mid = 6. Search range is now speeds 1..6.",
              variables: { lo: 1, hi: 6, mid: 6, hours: 6, h: 8 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 5,
                bsRight: 5,
                bsCondition: "hours <= h → hi = mid = 6",
              },
              delta: { changedIndices: [6, 7, 8, 9, 10], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "mid=3: hours=10",
              explanation: "mid = 1 + (6-1)/2 = 3. At speed 3: ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 hours. 10 > 8 — too slow!",
              variables: { lo: 1, hi: 6, mid: 3, hours: 10, h: 8 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "active", 3: "default", 4: "default", 5: "default", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated" },
                pointers: [
                  { name: "lo", index: 0, color: "pointer" },
                  { name: "mid", index: 2, color: "active" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 0,
                bsMid: 2,
                bsRight: 5,
                bsCondition: "hours=10 > h=8 → too slow",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13, 14],
              shortLabel: "10 > 8 → lo=4, search faster",
              explanation: "Speed 3 is too slow. Set lo = mid + 1 = 4. Now searching speeds 4..6.",
              variables: { lo: 4, hi: 6, mid: 3, hours: 10, h: 8 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "default", 5: "default", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated" },
                pointers: [
                  { name: "lo", index: 3, color: "pointer" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 3,
                bsMid: 2,
                bsRight: 5,
                bsCondition: "hours > h → lo = mid + 1 = 4",
              },
              delta: { changedIndices: [0, 1, 2], movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "mid=5: hours=7",
              explanation: "mid = 4 + (6-4)/2 = 5. At speed 5: ceil(3/5)+ceil(6/5)+ceil(7/5)+ceil(11/5) = 1+2+2+3 = 8. Wait, let me recalculate: 1+2+2+3 = 8. 8 <= 8 — works!",
              variables: { lo: 4, hi: 6, mid: 5, hours: 8, h: 8 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "active", 5: "default", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated" },
                pointers: [
                  { name: "lo", index: 3, color: "pointer" },
                  { name: "mid", index: 4, color: "active" },
                  { name: "hi", index: 5, color: "pointer" },
                ],
                bsLeft: 3,
                bsMid: 4,
                bsRight: 5,
                bsCondition: "hours=8 <= h=8 → can try slower",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12],
              shortLabel: "8 <= 8 → hi=5, search slower",
              explanation: "Speed 5 works! Try slower. Set hi = mid = 5. Now lo=4, hi=5.",
              variables: { lo: 4, hi: 5, mid: 5, hours: 8, h: 8 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "default", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated" },
                pointers: [
                  { name: "lo", index: 3, color: "pointer" },
                  { name: "hi", index: 4, color: "pointer" },
                ],
                bsLeft: 3,
                bsMid: 4,
                bsRight: 4,
                bsCondition: "hours <= h → hi = mid = 5",
              },
              delta: { changedIndices: [5], movedPointers: ["hi"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "mid=4: hours=8",
              explanation: "mid = 4 + (5-4)/2 = 4. At speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8. 8 <= 8 — works!",
              variables: { lo: 4, hi: 5, mid: 4, hours: 8, h: 8 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "active", 4: "default", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated" },
                pointers: [
                  { name: "lo", index: 3, color: "pointer" },
                  { name: "mid", index: 3, color: "active" },
                  { name: "hi", index: 4, color: "pointer" },
                ],
                bsLeft: 3,
                bsMid: 3,
                bsRight: 4,
                bsCondition: "hours=8 <= h=8 → can try slower",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [11, 12],
              shortLabel: "8 <= 8 → hi=4, lo == hi",
              explanation: "Speed 4 works. Set hi = mid = 4. Now lo=4 == hi=4. Loop exits. The minimum speed is 4.",
              variables: { lo: 4, hi: 4, answer: "4" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated" },
                pointers: [{ name: "answer", index: 3, color: "active" }],
                bsLeft: 3,
                bsMid: 3,
                bsRight: 3,
                bsCondition: "lo == hi == 4 → ANSWER",
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [17],
              shortLabel: "Return 4",
              explanation: "lo == hi == 4. The minimum eating speed for Koko to finish all piles within 8 hours is 4 bananas per hour.",
              variables: { lo: 4, hi: 4, answer: "4" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "eliminated", 5: "eliminated", 6: "eliminated", 7: "eliminated", 8: "eliminated", 9: "eliminated", 10: "eliminated" },
                pointers: [{ name: "answer", index: 3, color: "active" }],
                bsLeft: 3, bsMid: 3, bsRight: 3, bsCondition: "Minimum speed = 4",
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "One Pile Per Hour",
          description: "h equals number of piles — must eat each pile in exactly 1 hour",
          input: { piles: [30, 11, 23, 4, 20], h: 5 },
          expectedOutput: "30",
          commonMistake: "When h == piles.length, each pile must be eaten in one hour, so k must be at least max(piles). Some forget that Koko can only eat from one pile per hour.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init lo=1, hi=30",
              explanation: "Speed range: 1 to 30. With h=5 and 5 piles, Koko must finish each pile in exactly 1 hour. That means k must be >= max(piles) = 30.",
              variables: { lo: 1, hi: 30, h: 5, piles: "[30,11,23,4,20]" },
              dataStructure: {
                arrayStates: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, "default"])),
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "hi", index: 29, color: "pointer" }],
                bsLeft: 0, bsMid: null, bsRight: 29, bsCondition: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "mid=15: hours=8",
              explanation: "mid=15. Hours: ceil(30/15)+ceil(11/15)+ceil(23/15)+ceil(4/15)+ceil(20/15) = 2+1+2+1+2 = 8. 8 > 5 — too slow.",
              variables: { lo: 1, hi: 30, mid: 15, hours: 8, h: 5 },
              dataStructure: {
                arrayStates: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, i === 14 ? "active" : "default"])),
                pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "mid", index: 14, color: "active" }, { name: "hi", index: 29, color: "pointer" }],
                bsLeft: 0, bsMid: 14, bsRight: 29, bsCondition: "hours=8 > h=5 → too slow",
              },
              delta: { changedIndices: [14] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [13, 14],
              shortLabel: "8 > 5 → lo=16",
              explanation: "Speed 15 is too slow. Set lo = 16. Search speeds 16..30.",
              variables: { lo: 16, hi: 30, h: 5 },
              dataStructure: {
                arrayStates: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, i < 15 ? "eliminated" : "default"])),
                pointers: [{ name: "lo", index: 15, color: "pointer" }, { name: "hi", index: 29, color: "pointer" }],
                bsLeft: 15, bsMid: 14, bsRight: 29, bsCondition: "lo = mid + 1 = 16",
              },
              delta: { movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "mid=23: hours=6",
              explanation: "mid=23. Hours: ceil(30/23)+ceil(11/23)+ceil(23/23)+ceil(4/23)+ceil(20/23) = 2+1+1+1+1 = 6. 6 > 5 — still too slow.",
              variables: { lo: 16, hi: 30, mid: 23, hours: 6, h: 5 },
              dataStructure: {
                arrayStates: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, i < 15 ? "eliminated" : i === 22 ? "active" : "default"])),
                pointers: [{ name: "lo", index: 15, color: "pointer" }, { name: "mid", index: 22, color: "active" }, { name: "hi", index: 29, color: "pointer" }],
                bsLeft: 15, bsMid: 22, bsRight: 29, bsCondition: "hours=6 > h=5 → too slow",
              },
              delta: { changedIndices: [22] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [13, 14],
              shortLabel: "6 > 5 → lo=24",
              explanation: "Speed 23 is too slow. Set lo = 24.",
              variables: { lo: 24, hi: 30, h: 5 },
              dataStructure: {
                arrayStates: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, i < 23 ? "eliminated" : "default"])),
                pointers: [{ name: "lo", index: 23, color: "pointer" }, { name: "hi", index: 29, color: "pointer" }],
                bsLeft: 23, bsMid: 22, bsRight: 29, bsCondition: "lo = mid + 1 = 24",
              },
              delta: { movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "mid=27: hours=5",
              explanation: "mid=27. Hours: ceil(30/27)+ceil(11/27)+ceil(23/27)+ceil(4/27)+ceil(20/27) = 2+1+1+1+1 = 6. Wait — ceil(30/27)=2. Still 6 > 5.",
              variables: { lo: 24, hi: 30, mid: 27, hours: 6, h: 5 },
              dataStructure: {
                arrayStates: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, i < 23 ? "eliminated" : i === 26 ? "active" : "default"])),
                pointers: [{ name: "lo", index: 23, color: "pointer" }, { name: "mid", index: 26, color: "active" }, { name: "hi", index: 29, color: "pointer" }],
                bsLeft: 23, bsMid: 26, bsRight: 29, bsCondition: "hours=6 > h=5",
              },
              delta: { changedIndices: [26] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [13, 14],
              shortLabel: "6 > 5 → lo=28",
              explanation: "Speed 27 too slow. lo = 28.",
              variables: { lo: 28, hi: 30, h: 5 },
              dataStructure: {
                arrayStates: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, i < 27 ? "eliminated" : "default"])),
                pointers: [{ name: "lo", index: 27, color: "pointer" }, { name: "hi", index: 29, color: "pointer" }],
                bsLeft: 27, bsMid: 26, bsRight: 29, bsCondition: "lo = 28",
              },
              delta: { movedPointers: ["lo"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "mid=29: hours=6",
              explanation: "mid=29. ceil(30/29)=2, rest are 1 each. 2+1+1+1+1 = 6 > 5. Still too slow!",
              variables: { lo: 28, hi: 30, mid: 29, hours: 6, h: 5 },
              dataStructure: {
                arrayStates: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, i < 27 ? "eliminated" : i === 28 ? "active" : "default"])),
                pointers: [{ name: "lo", index: 27, color: "pointer" }, { name: "mid", index: 28, color: "active" }, { name: "hi", index: 29, color: "pointer" }],
                bsLeft: 27, bsMid: 28, bsRight: 29, bsCondition: "hours=6 > h=5",
              },
              delta: { changedIndices: [28] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [13, 14],
              shortLabel: "6 > 5 → lo=30, lo == hi",
              explanation: "lo = 30 == hi = 30. Loop exits. The answer is 30 — Koko must eat at speed 30 (the biggest pile) to finish in time.",
              variables: { lo: 30, hi: 30, answer: "30" },
              dataStructure: {
                arrayStates: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, i === 29 ? "found" : "eliminated"])),
                pointers: [{ name: "answer", index: 29, color: "active" }],
                bsLeft: 29, bsMid: 29, bsRight: 29, bsCondition: "lo == hi == 30 → ANSWER",
              },
              delta: { changedIndices: [29] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ piles, h }) {
        const steps = [];
        const maxPile = Math.max(...piles);
        let lo = 1, hi = maxPile;
        const eliminated = new Set();
        const dispLen = Math.min(maxPile, 30);

        const buildStates = (activeIdx) => {
          const s = {};
          for (let i = 0; i < dispLen; i++) {
            s[i] = eliminated.has(i) ? "eliminated" : i === activeIdx ? "active" : "default";
          }
          return s;
        };

        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: `Init lo=1, hi=${hi}`,
          explanation: `Speed range: 1 to ${hi}. Binary search for the minimum speed where Koko finishes in ${h} hours.`,
          variables: { lo: 1, hi, h, piles: JSON.stringify(piles) },
          dataStructure: {
            arrayStates: buildStates(-1),
            pointers: [{ name: "lo", index: 0, color: "pointer" }, { name: "hi", index: Math.min(hi - 1, dispLen - 1), color: "pointer" }],
            bsLeft: 0, bsMid: null, bsRight: Math.min(hi - 1, dispLen - 1), bsCondition: null,
          },
          delta: {}, isAnswer: false,
        });

        while (lo < hi) {
          const mid = lo + Math.floor((hi - lo) / 2);
          let hours = 0;
          for (const p of piles) hours += Math.ceil(p / mid);
          const fits = hours <= h;

          const midIdx = Math.min(mid - 1, dispLen - 1);
          steps.push({
            stepId: steps.length, lineNumbers: [5, 6, 7, 8, 9],
            shortLabel: `mid=${mid}: hours=${hours}`,
            explanation: `Try speed ${mid}. Total hours = ${hours}. ${fits ? `${hours} <= ${h} — speed ${mid} works.` : `${hours} > ${h} — too slow.`}`,
            variables: { lo, hi, mid, hours, h },
            dataStructure: {
              arrayStates: buildStates(midIdx),
              pointers: [
                { name: "lo", index: Math.min(lo - 1, dispLen - 1), color: "pointer" },
                { name: "mid", index: midIdx, color: "active" },
                { name: "hi", index: Math.min(hi - 1, dispLen - 1), color: "pointer" },
              ],
              bsLeft: Math.min(lo - 1, dispLen - 1), bsMid: midIdx, bsRight: Math.min(hi - 1, dispLen - 1),
              bsCondition: fits ? `hours=${hours} <= h=${h}` : `hours=${hours} > h=${h}`,
            },
            delta: { changedIndices: [midIdx] }, isAnswer: false,
          });

          if (fits) {
            for (let k = mid; k <= hi; k++) if (k - 1 < dispLen) eliminated.add(k - 1);
            hi = mid;
            // Re-add hi since it's still a candidate
            eliminated.delete(hi - 1);
          } else {
            for (let k = lo; k <= mid; k++) if (k - 1 < dispLen) eliminated.add(k - 1);
            lo = mid + 1;
          }

          steps.push({
            stepId: steps.length, lineNumbers: fits ? [11, 12] : [13, 14],
            shortLabel: fits ? `${hours} <= ${h} → hi=${hi}` : `${hours} > ${h} → lo=${lo}`,
            explanation: fits
              ? `Speed ${mid} works. Maybe slower works too. Set hi = ${hi}.`
              : `Speed ${mid} too slow. Set lo = ${lo}.`,
            variables: { lo, hi, h },
            dataStructure: {
              arrayStates: buildStates(-1),
              pointers: lo < hi
                ? [{ name: "lo", index: Math.min(lo - 1, dispLen - 1), color: "pointer" }, { name: "hi", index: Math.min(hi - 1, dispLen - 1), color: "pointer" }]
                : [{ name: "answer", index: Math.min(lo - 1, dispLen - 1), color: "active" }],
              bsLeft: Math.min(lo - 1, dispLen - 1), bsMid: midIdx, bsRight: Math.min(hi - 1, dispLen - 1),
              bsCondition: lo >= hi ? `lo == hi == ${lo} → ANSWER` : (fits ? `hi = ${hi}` : `lo = ${lo}`),
            },
            delta: { movedPointers: fits ? ["hi"] : ["lo"] }, isAnswer: false,
          });
        }

        steps.push({
          stepId: steps.length, lineNumbers: [17],
          shortLabel: `Return ${lo}`,
          explanation: `lo == hi == ${lo}. The minimum eating speed is ${lo}.`,
          variables: { lo, hi, answer: String(lo) },
          dataStructure: {
            arrayStates: (() => { const s = {}; for (let i = 0; i < dispLen; i++) s[i] = i === lo - 1 ? "found" : "eliminated"; return s; })(),
            pointers: [{ name: "answer", index: Math.min(lo - 1, dispLen - 1), color: "active" }],
            bsLeft: Math.min(lo - 1, dispLen - 1), bsMid: Math.min(lo - 1, dispLen - 1), bsRight: Math.min(lo - 1, dispLen - 1),
            bsCondition: `Minimum speed = ${lo}`,
          },
          delta: {}, isAnswer: true,
        });
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(max(piles) * n)", space: "O(1)", explanation: "Try every speed from 1 to max, each time scanning all n piles" },
    optimal: { time: "O(n * log(max(piles)))", space: "O(1)", explanation: "Binary search over log(max(piles)) speeds, each requiring O(n) to compute hours", tradeoff: "No extra space — pure binary search on the answer space" },
  },

  interviewTips: [
    "Recognize the 'binary search on answer' pattern — the answer space is monotonic.",
    "State the feasibility function clearly: canFinish(k) = sum(ceil(pile/k)) <= h.",
    "Use ceiling division without floating point: ceil(a/b) = (a + b - 1) / b.",
    "Explain why lo < hi (not <=): we're searching for leftmost true, and lo == hi is the answer.",
    "Mention that hi = mid (not mid - 1) because mid itself could be the answer.",
    "Clarify the constraint: Koko eats from ONE pile per hour, even if she finishes early.",
  ],

  relatedProblems: ["binary-search", "find-min-rotated-array", "search-rotated-array"],
};
