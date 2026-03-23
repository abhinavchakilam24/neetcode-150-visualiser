export const happyNumber = {
  id: 138,
  slug: "happy-number",
  title: "Happy Number",
  difficulty: "Easy",
  topic: "math-geometry",
  topicLabel: "Math & Geometry",
  neetcodeNumber: 138,
  artifactType: "Matrix",
  companies: ["Amazon", "Apple", "Google", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/happy-number/",

  pattern: "Cycle Detection via HashSet or Floyd's Algorithm",
  patternExplanation: `When a process repeatedly transforms a value and you need to detect
    if it enters a cycle or reaches a target, use either a HashSet to track seen values
    or Floyd's tortoise-and-hare two-pointer technique.`,

  intuition: {
    coreInsight: `Repeatedly replacing a number with the sum of the squares of its digits
      either converges to 1 (happy) or enters an infinite cycle. There are only finitely
      many possible values the sum can take (for a number with d digits, the max digit-square
      sum is 81*d), so we must eventually either hit 1 or revisit a number. Detecting the
      revisit is the whole problem.`,

    mentalModel: `Imagine a marble rolling down a track that forks at every junction. The
      marble always follows the "sum of squared digits" fork. The track either leads to a
      golden gate (the number 1, which loops to 1 forever) or loops back to a junction it
      already passed through. You need a way to detect if you're going in circles — either
      leave breadcrumbs (HashSet) or send two marbles at different speeds (Floyd's).`,

    whyNaiveFails: `Without cycle detection, you'd loop forever on unhappy numbers. A simple
      "run for 1000 iterations" hack works in practice but is theoretically unsound. The
      HashSet approach is clean and provably correct: if we ever see a repeated value, we
      know we're in a cycle and the number is not happy.`,

    keyObservation: `The digit-square sum of any number up to 10^9 is at most 81*10 = 810.
      After the first step, we're working with numbers <= 810. So the cycle detection is
      guaranteed to terminate quickly — the "universe" of possible states is tiny.`,
  },

  problem: `Write an algorithm to determine if a number n is happy. A happy number is defined
    by the following process: Starting with any positive integer, replace the number by the
    sum of the squares of its digits, and repeat until the number equals 1 (where it stays),
    or it loops endlessly in a cycle. A number is happy if this process ends in 1.`,

  examples: [
    { input: "n = 19", output: "true", explanation: "1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1² + 0² + 0² = 1" },
    { input: "n = 2", output: "false", explanation: "2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 (cycle)" },
  ],

  constraints: [
    "1 <= n <= 2^31 - 1",
  ],

  approaches: {
    brute: {
      label: "HashSet Cycle Detection",
      tier: "brute",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(log n)",
      idea: "Keep a set of seen numbers. At each step, compute the digit-square sum. If we reach 1, return true. If we see a repeated number, return false.",

      javaCode: `public boolean isHappy(int n) {
    Set<Integer> seen = new HashSet<>();
    while (n != 1) {
        if (seen.contains(n)) return false;
        seen.add(n);
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        n = sum;
    }
    return true;
}`,

      cppCode: `bool isHappy(int n) {
    unordered_set<int> seen;
    while (n != 1) {
        if (seen.count(n)) return false;
        seen.insert(n);
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        n = sum;
    }
    return true;
}`,

      pythonCode: `def isHappy(n: int) -> bool:
    seen = set()
    while n != 1:
        if n in seen:
            return False
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return True`,

      lineAnnotations: {
        2: "HashSet to detect if we revisit a number",
        3: "Keep going until we reach 1",
        4: "If we've seen this number before, it's a cycle — not happy",
        5: "Mark current number as seen",
        6: "Compute sum of squares of digits",
        7: "Extract each digit from right to left",
        8: "Get last digit",
        9: "Add its square to the running sum",
        12: "Replace n with the digit-square sum",
        14: "Reached 1 — it's a happy number!",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Happy: n=19",
          input: { n: 19 },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Init seen={}",
              explanation: "Start with n=19 and an empty HashSet. We'll track every number we visit.",
              variables: { n: 19, seen: "{}" },
              dataStructure: {
                matrix: [[19]],
                cellStates: { "0,0": "active" },
                pointers: [],
                hashMap: {},
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [5, 6, 7, 8, 9, 12], shortLabel: "19 → 82",
              explanation: "n=19 is not 1, not in seen. Add 19 to seen. Compute: 1² + 9² = 1 + 81 = 82. Set n=82.",
              variables: { n: 82, seen: "{19}", "1²+9²": 82 },
              dataStructure: {
                matrix: [[19, 82]],
                cellStates: { "0,0": "visited", "0,1": "active" },
                pointers: [],
                hashMap: { 19: { value: "seen", isNew: true } },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [5, 6, 7, 8, 9, 12], shortLabel: "82 → 68",
              explanation: "n=82 not in seen. Add it. Compute: 8² + 2² = 64 + 4 = 68. Set n=68.",
              variables: { n: 68, seen: "{19,82}", "8²+2²": 68 },
              dataStructure: {
                matrix: [[19, 82, 68]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "active" },
                pointers: [],
                hashMap: { 19: { value: "seen" }, 82: { value: "seen", isNew: true } },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [5, 6, 7, 8, 9, 12], shortLabel: "68 → 100",
              explanation: "n=68 not in seen. Compute: 6² + 8² = 36 + 64 = 100. Set n=100.",
              variables: { n: 100, seen: "{19,82,68}", "6²+8²": 100 },
              dataStructure: {
                matrix: [[19, 82, 68, 100]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "0,3": "active" },
                pointers: [],
                hashMap: { 19: { value: "seen" }, 82: { value: "seen" }, 68: { value: "seen", isNew: true } },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [5, 6, 7, 8, 9, 12], shortLabel: "100 → 1",
              explanation: "n=100 not in seen. Compute: 1² + 0² + 0² = 1. Set n=1.",
              variables: { n: 1, seen: "{19,82,68,100}", "1²+0²+0²": 1 },
              dataStructure: {
                matrix: [[19, 82, 68, 100, 1]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "0,3": "visited", "0,4": "found" },
                pointers: [],
                hashMap: { 19: { value: "seen" }, 82: { value: "seen" }, 68: { value: "seen" }, 100: { value: "seen", isNew: true } },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [14], shortLabel: "n=1 → Happy!",
              explanation: "n equals 1, so the while-loop exits. Return true — 19 is a happy number! The chain was 19 → 82 → 68 → 100 → 1.",
              variables: { n: 1, result: true },
              dataStructure: {
                matrix: [[19, 82, 68, 100, 1]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found", "0,3": "found", "0,4": "found" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Unhappy: n=2",
          description: "Enters a cycle — demonstrates cycle detection",
          input: { n: 2 },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Init seen={}",
              explanation: "Start with n=2. This number is NOT happy — it will enter a cycle.",
              variables: { n: 2, seen: "{}" },
              dataStructure: {
                matrix: [[2]],
                cellStates: { "0,0": "active" },
                pointers: [],
                hashMap: {},
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [5, 12], shortLabel: "2 → 4",
              explanation: "2² = 4. Set n=4.",
              variables: { n: 4, seen: "{2}", "2²": 4 },
              dataStructure: {
                matrix: [[2, 4]],
                cellStates: { "0,0": "visited", "0,1": "active" },
                pointers: [],
                hashMap: { 2: { value: "seen", isNew: true } },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [5, 12], shortLabel: "4 → 16",
              explanation: "4² = 16. Set n=16.",
              variables: { n: 16, seen: "{2,4}", "4²": 16 },
              dataStructure: {
                matrix: [[2, 4, 16]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "active" },
                pointers: [],
                hashMap: { 2: { value: "seen" }, 4: { value: "seen", isNew: true } },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [5, 12], shortLabel: "16 → 37",
              explanation: "1² + 6² = 1 + 36 = 37. Set n=37.",
              variables: { n: 37, seen: "{2,4,16}", "1²+6²": 37 },
              dataStructure: {
                matrix: [[2, 4, 16, 37]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "0,3": "active" },
                pointers: [],
                hashMap: { 2: { value: "seen" }, 4: { value: "seen" }, 16: { value: "seen", isNew: true } },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [5, 12], shortLabel: "37 → 58",
              explanation: "3² + 7² = 9 + 49 = 58. Set n=58.",
              variables: { n: 58, seen: "{2,4,16,37}" },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "0,3": "visited", "0,4": "active" },
                pointers: [],
                hashMap: { 2: { value: "seen" }, 4: { value: "seen" }, 16: { value: "seen" }, 37: { value: "seen", isNew: true } },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [5, 12], shortLabel: "58 → 89 → 145 → 42 → 20 → 4",
              explanation: "Continuing the chain: 58→89→145→42→20→4. We've seen 4 before! Cycle detected.",
              variables: { n: 4, seen: "{2,4,16,37,58,89,145,42,20}", cycle: true },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20, 4]],
                cellStates: { "0,0": "visited", "0,1": "eliminated", "0,2": "visited", "0,3": "visited", "0,4": "visited", "0,5": "visited", "0,6": "visited", "0,7": "visited", "0,8": "visited", "0,9": "eliminated" },
                pointers: [],
                hashMap: { 4: { value: "seen", isHighlighted: true } },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [4], shortLabel: "Cycle! Return false",
              explanation: "n=4 is already in the seen set — we've entered a cycle. Return false. The number 2 is not happy.",
              variables: { n: 4, result: false },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20, 4]],
                cellStates: { "0,0": "eliminated", "0,1": "eliminated", "0,2": "eliminated", "0,3": "eliminated", "0,4": "eliminated", "0,5": "eliminated", "0,6": "eliminated", "0,7": "eliminated", "0,8": "eliminated", "0,9": "eliminated" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const seen = new Set();
        const chain = [n];

        steps.push({
          stepId: 0, lineNumbers: [2], shortLabel: "Init seen={}",
          explanation: `Start with n=${n} and empty HashSet.`,
          variables: { n, seen: "{}" },
          dataStructure: { matrix: [[n]], cellStates: { "0,0": "active" }, pointers: [], hashMap: {} },
          delta: {}, isAnswer: false,
        });

        let current = n;
        while (current !== 1) {
          if (seen.has(current)) {
            steps.push({
              stepId: steps.length, lineNumbers: [4], shortLabel: `Cycle at ${current}! Return false`,
              explanation: `n=${current} is already in seen — cycle detected. Return false.`,
              variables: { n: current, result: false },
              dataStructure: {
                matrix: [chain],
                cellStates: Object.fromEntries(chain.map((_, i) => [`0,${i}`, "eliminated"])),
                pointers: [],
              },
              delta: {}, isAnswer: true,
            });
            return steps;
          }
          seen.add(current);
          let sum = 0, tmp = current;
          while (tmp > 0) { const d = tmp % 10; sum += d * d; tmp = Math.floor(tmp / 10); }
          chain.push(sum);
          current = sum;

          const isHappy = current === 1;
          steps.push({
            stepId: steps.length, lineNumbers: isHappy ? [14] : [5, 12],
            shortLabel: isHappy ? `→ 1 Happy!` : `→ ${sum}`,
            explanation: isHappy
              ? `Digit-square sum is 1. Return true — ${n} is happy!`
              : `Computed digit-square sum = ${sum}.`,
            variables: { n: current, seen: `{${[...seen].join(",")}}` },
            dataStructure: {
              matrix: [chain],
              cellStates: Object.fromEntries(chain.map((_, i) => [`0,${i}`, i === chain.length - 1 ? (isHappy ? "found" : "active") : "visited"])),
              pointers: [],
            },
            delta: {}, isAnswer: isHappy,
          });

          if (steps.length > 30) {
            steps.push({
              stepId: steps.length, lineNumbers: [4], shortLabel: "Truncated — cycle likely",
              explanation: "Chain is very long — likely in a cycle. Return false.",
              variables: { result: false },
              dataStructure: { matrix: [chain.slice(-10)], cellStates: {}, pointers: [] },
              delta: {}, isAnswer: true,
            });
            return steps;
          }
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Floyd's Cycle Detection (Two Pointers)",
      tier: "optimal",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      idea: "Use slow and fast pointers on the digit-square-sum sequence. Slow advances one step, fast advances two. If they meet at 1, happy. If they meet elsewhere, cycle.",

      javaCode: `public boolean isHappy(int n) {
    int slow = n, fast = getNext(n);
    while (fast != 1 && slow != fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    return fast == 1;
}

private int getNext(int n) {
    int sum = 0;
    while (n > 0) {
        int d = n % 10;
        sum += d * d;
        n /= 10;
    }
    return sum;
}`,

      cppCode: `bool isHappy(int n) {
    int slow = n, fast = getNext(n);
    while (fast != 1 && slow != fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    return fast == 1;
}

int getNext(int n) {
    int sum = 0;
    while (n > 0) {
        int d = n % 10;
        sum += d * d;
        n /= 10;
    }
    return sum;
}`,

      pythonCode: `def isHappy(n: int) -> bool:
    def get_next(num):
        return sum(int(d) ** 2 for d in str(num))

    slow, fast = n, get_next(n)
    while fast != 1 and slow != fast:
        slow = get_next(slow)
        fast = get_next(get_next(fast))
    return fast == 1`,

      lineAnnotations: {
        2: "Slow pointer starts at n, fast pointer starts one step ahead",
        3: "Continue until fast reaches 1 or slow catches fast (cycle)",
        4: "Slow moves one step in the sequence",
        5: "Fast moves two steps in the sequence",
        7: "If fast reached 1, the number is happy",
        10: "Helper: compute sum of squared digits",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Happy: n=19",
          description: "Fast pointer reaches 1 — happy number confirmed",
          input: { n: 19 },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Init pointers",
              explanation: "slow=19, fast=getNext(19)=82. Slow starts at n, fast starts one step ahead.",
              variables: { slow: 19, fast: 82 },
              dataStructure: {
                matrix: [[19, 82, 68, 100, 1]],
                cellStates: { "0,0": "pointer", "0,1": "active", "0,2": "default", "0,3": "default", "0,4": "default" },
                pointers: [{ name: "slow", row: 0, col: 0 }, { name: "fast", row: 0, col: 1 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [3, 4, 5], shortLabel: "slow=82, fast=100",
              explanation: "fast!=1 and slow!=fast. slow=getNext(19)=82. fast=getNext(getNext(82))=getNext(68)=100.",
              variables: { slow: 82, fast: 100 },
              dataStructure: {
                matrix: [[19, 82, 68, 100, 1]],
                cellStates: { "0,0": "visited", "0,1": "pointer", "0,2": "visited", "0,3": "active", "0,4": "default" },
                pointers: [{ name: "slow", row: 0, col: 1 }, { name: "fast", row: 0, col: 3 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [3, 4, 5], shortLabel: "slow=68, fast=1",
              explanation: "slow=getNext(82)=68. fast=getNext(getNext(100))=getNext(1)=1. Fast has reached 1!",
              variables: { slow: 68, fast: 1 },
              dataStructure: {
                matrix: [[19, 82, 68, 100, 1]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "pointer", "0,3": "visited", "0,4": "found" },
                pointers: [{ name: "slow", row: 0, col: 2 }, { name: "fast", row: 0, col: 4 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [7], shortLabel: "fast==1 → Happy!",
              explanation: "fast equals 1, so the while-loop exits. Return true — 19 is a happy number!",
              variables: { slow: 68, fast: 1, result: true },
              dataStructure: {
                matrix: [[19, 82, 68, 100, 1]],
                cellStates: { "0,0": "found", "0,1": "found", "0,2": "found", "0,3": "found", "0,4": "found" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Unhappy: n=2",
          description: "Pointers meet in a cycle — not happy",
          input: { n: 2 },
          expectedOutput: "false",
          steps: [
            {
              stepId: 0, lineNumbers: [2], shortLabel: "Init pointers",
              explanation: "slow=2, fast=getNext(2)=4. The sequence 2→4→16→37→58→89→145→42→20→4 cycles.",
              variables: { slow: 2, fast: 4 },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20]],
                cellStates: { "0,0": "pointer", "0,1": "active", "0,2": "default", "0,3": "default", "0,4": "default", "0,5": "default", "0,6": "default", "0,7": "default", "0,8": "default" },
                pointers: [{ name: "slow", row: 0, col: 0 }, { name: "fast", row: 0, col: 1 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [3, 4, 5], shortLabel: "slow=4, fast=37",
              explanation: "slow=getNext(2)=4. fast=getNext(getNext(4))=getNext(16)=37.",
              variables: { slow: 4, fast: 37 },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20]],
                cellStates: { "0,0": "visited", "0,1": "pointer", "0,2": "visited", "0,3": "active", "0,4": "default", "0,5": "default", "0,6": "default", "0,7": "default", "0,8": "default" },
                pointers: [{ name: "slow", row: 0, col: 1 }, { name: "fast", row: 0, col: 3 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [3, 4, 5], shortLabel: "slow=16, fast=145",
              explanation: "slow=getNext(4)=16. fast=getNext(getNext(37))=getNext(58)=89. Wait — let me recalculate. getNext(37)=58, getNext(58)=89. So fast=89.",
              variables: { slow: 16, fast: 89 },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "pointer", "0,3": "visited", "0,4": "visited", "0,5": "active", "0,6": "default", "0,7": "default", "0,8": "default" },
                pointers: [{ name: "slow", row: 0, col: 2 }, { name: "fast", row: 0, col: 5 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [3, 4, 5], shortLabel: "slow=37, fast=20",
              explanation: "slow=getNext(16)=37. fast=getNext(getNext(89))=getNext(145)=42. Then getNext(42)=20. So fast=20.",
              variables: { slow: 37, fast: 20 },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "0,3": "pointer", "0,4": "visited", "0,5": "visited", "0,6": "visited", "0,7": "visited", "0,8": "active" },
                pointers: [{ name: "slow", row: 0, col: 3 }, { name: "fast", row: 0, col: 8 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [3, 4, 5], shortLabel: "slow=58, fast=16",
              explanation: "slow=getNext(37)=58. fast=getNext(getNext(20))=getNext(4)=16. Both are in the cycle now, approaching each other.",
              variables: { slow: 58, fast: 16 },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "active", "0,3": "visited", "0,4": "pointer", "0,5": "visited", "0,6": "visited", "0,7": "visited", "0,8": "visited" },
                pointers: [{ name: "slow", row: 0, col: 4 }, { name: "fast", row: 0, col: 2 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 5, lineNumbers: [3, 4, 5], shortLabel: "slow=89, fast=58 → continue...",
              explanation: "slow=getNext(58)=89. fast=getNext(getNext(16))=getNext(37)=58. They haven't met yet.",
              variables: { slow: 89, fast: 58 },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "0,3": "visited", "0,4": "active", "0,5": "pointer", "0,6": "visited", "0,7": "visited", "0,8": "visited" },
                pointers: [{ name: "slow", row: 0, col: 5 }, { name: "fast", row: 0, col: 4 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 6, lineNumbers: [3, 4, 5], shortLabel: "slow=145, fast=145 → Meet!",
              explanation: "slow=getNext(89)=145. fast=getNext(getNext(58))=getNext(89)=145. slow==fast! They meet at 145, which is not 1.",
              variables: { slow: 145, fast: 145 },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20]],
                cellStates: { "0,0": "visited", "0,1": "visited", "0,2": "visited", "0,3": "visited", "0,4": "visited", "0,5": "visited", "0,6": "eliminated", "0,7": "visited", "0,8": "visited" },
                pointers: [{ name: "slow=fast", row: 0, col: 6 }],
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 7, lineNumbers: [7], shortLabel: "fast!=1 → Not happy",
              explanation: "fast=145, which is not 1. Return false — 2 is not a happy number. The cycle was detected without using any extra space!",
              variables: { fast: 145, result: false },
              dataStructure: {
                matrix: [[2, 4, 16, 37, 58, 89, 145, 42, 20]],
                cellStates: { "0,0": "eliminated", "0,1": "eliminated", "0,2": "eliminated", "0,3": "eliminated", "0,4": "eliminated", "0,5": "eliminated", "0,6": "eliminated", "0,7": "eliminated", "0,8": "eliminated" },
                pointers: [],
              },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ n }) {
        const steps = [];
        const getNext = (num) => {
          let sum = 0;
          while (num > 0) { const d = num % 10; sum += d * d; num = Math.floor(num / 10); }
          return sum;
        };

        // Pre-compute the full chain for visualization
        const chain = [];
        const chainSet = new Set();
        let tmp = n;
        while (!chainSet.has(tmp) && tmp !== 1) { chain.push(tmp); chainSet.add(tmp); tmp = getNext(tmp); }
        chain.push(tmp); // either 1 or the start of cycle

        let slow = n, fast = getNext(n);

        steps.push({
          stepId: 0, lineNumbers: [2], shortLabel: "Init pointers",
          explanation: `slow=${slow}, fast=${fast}.`,
          variables: { slow, fast },
          dataStructure: {
            matrix: [chain],
            cellStates: Object.fromEntries(chain.map((_, i) => [`0,${i}`, i === 0 ? "pointer" : i === 1 ? "active" : "default"])),
            pointers: [],
          },
          delta: {}, isAnswer: false,
        });

        while (fast !== 1 && slow !== fast) {
          slow = getNext(slow);
          fast = getNext(getNext(fast));

          const slowIdx = chain.indexOf(slow);
          const fastIdx = chain.indexOf(fast);
          const met = slow === fast;

          steps.push({
            stepId: steps.length, lineNumbers: met ? [7] : [3, 4, 5],
            shortLabel: met ? (fast === 1 ? "Meet at 1 → Happy!" : `Meet at ${fast} → Not happy`) : `slow=${slow}, fast=${fast}`,
            explanation: met
              ? (fast === 1 ? `Both pointers at 1. Return true!` : `Pointers meet at ${fast}, not 1. Return false.`)
              : `slow advanced to ${slow}, fast advanced to ${fast}.`,
            variables: { slow, fast, ...(met ? { result: fast === 1 } : {}) },
            dataStructure: {
              matrix: [chain],
              cellStates: Object.fromEntries(chain.map((_, i) => [`0,${i}`,
                met ? (fast === 1 ? "found" : "eliminated") :
                i === slowIdx ? "pointer" : i === fastIdx ? "active" : i < Math.max(slowIdx, fastIdx) ? "visited" : "default"
              ])),
              pointers: [],
            },
            delta: {}, isAnswer: met,
          });

          if (steps.length > 25) break;
        }

        if (fast === 1 && steps[steps.length - 1].isAnswer !== true) {
          steps.push({
            stepId: steps.length, lineNumbers: [7], shortLabel: "fast==1 → Happy!",
            explanation: `fast reached 1. Return true!`,
            variables: { result: true },
            dataStructure: {
              matrix: [chain],
              cellStates: Object.fromEntries(chain.map((_, i) => [`0,${i}`, "found"])),
              pointers: [],
            },
            delta: {}, isAnswer: true,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(log n)", space: "O(log n)", explanation: "Each step reduces number magnitude; HashSet stores visited numbers" },
    optimal: { time: "O(log n)", space: "O(1)",      explanation: "Floyd's cycle detection uses only two pointers", tradeoff: "Eliminate HashSet space by using two-pointer cycle detection" },
  },

  interviewTips: [
    "Start by explaining that the sequence either reaches 1 or cycles — there's no third option.",
    "The HashSet solution is perfectly fine for interviews — mention Floyd's as an optimization.",
    "Point out the 'universe' is small: after one step, we're always below 810.",
    "If asked about Floyd's, explain why slow/fast works for any cycle detection.",
    "Ask: 'Is n always positive?' (Yes per constraints, but good to confirm.)",
  ],

  relatedProblems: ["linked-list-cycle", "find-duplicate-number"],
};
