export const lastStoneWeight = {
  id: 65,
  slug: "last-stone-weight",
  title: "Last Stone Weight",
  difficulty: "Easy",
  topic: "heap-priority-queue",
  topicLabel: "Heap / Priority Queue",
  neetcodeNumber: 65,
  artifactType: "Heap",
  companies: ["Amazon", "Google", "Bloomberg", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/last-stone-weight/",

  pattern: "Max-Heap Simulation",
  patternExplanation: `When a problem requires repeatedly selecting the largest elements and
    processing them, a max-heap gives O(log n) extraction of the maximum, making simulation
    efficient without sorting every iteration.`,

  intuition: {
    coreInsight: `We repeatedly smash the two heaviest stones. A max-heap lets us grab the
      two largest in O(log n) each, and insert the remainder back. Without a heap we'd need
      to re-sort or scan after every smash — O(n log n) or O(n) per round vs O(log n).`,

    mentalModel: `Imagine a sumo tournament bracket. Each round, the two heaviest wrestlers
      fight. The loser loses weight equal to the winner's weight (and the winner also loses
      that much). If they're equal, both are eliminated. The max-heap is the bracket system —
      it always surfaces the two heaviest for the next bout.`,

    whyNaiveFails: `Sorting every round costs O(n log n). With up to n rounds, that's O(n^2
      log n). A max-heap processes each round in O(log n) — total O(n log n) for all rounds.`,

    keyObservation: `After smashing stones x and y (x <= y), the result is y - x. If y - x
      > 0, we push it back. The heap shrinks by 1 or 2 each round, so we do at most n rounds.
      Each round is O(log n) for two polls and one optional offer.`,
  },

  problem: `You are given an array of integers stones where stones[i] is the weight of the ith
    stone. We are playing a game with the stones. On each turn, we choose the two heaviest stones
    and smash them together. Suppose the heaviest two stones have weights x and y with x <= y.
    If x == y, both stones are destroyed. If x != y, the stone of weight x is destroyed, and the
    stone of weight y has new weight y - x. At the end of the game, there is at most one stone
    left. Return the weight of the last remaining stone. If there are no stones left, return 0.`,

  examples: [
    { input: "stones = [2,7,4,1,8,1]", output: "1", explanation: "Smash 8,7→1; smash 4,2→2; smash 2,1→1; smash 1,1→0; left with 1" },
    { input: "stones = [1]", output: "1", explanation: "Only one stone, return it." },
  ],

  constraints: [
    "1 <= stones.length <= 30",
    "1 <= stones[i] <= 1000",
  ],

  approaches: {
    brute: {
      label: "Sort Each Round",
      tier: "brute",
      timeComplexity: "O(n^2 log n)",
      spaceComplexity: "O(1)",
      idea: "Each round, sort the array, take the two largest, smash them, repeat.",

      javaCode: `public int lastStoneWeight(int[] stones) {
    List<Integer> list = new ArrayList<>();
    for (int s : stones) list.add(s);

    while (list.size() > 1) {
        Collections.sort(list);
        int y = list.remove(list.size() - 1);
        int x = list.remove(list.size() - 1);
        if (y - x > 0) {
            list.add(y - x);
        }
    }
    return list.isEmpty() ? 0 : list.get(0);
}`,

      cppCode: `int lastStoneWeight(vector<int>& stones) {
    while (stones.size() > 1) {
        sort(stones.begin(), stones.end());
        int y = stones.back(); stones.pop_back();
        int x = stones.back(); stones.pop_back();
        if (y - x > 0) stones.push_back(y - x);
    }
    return stones.empty() ? 0 : stones[0];
}`,

      pythonCode: `def lastStoneWeight(self, stones: List[int]) -> int:
    while len(stones) > 1:
        stones.sort()
        y = stones.pop()
        x = stones.pop()
        if y - x > 0:
            stones.append(y - x)
    return stones[0] if stones else 0`,

      lineAnnotations: {
        5: "Repeat until one or zero stones remain",
        6: "Sort to find the two heaviest — O(n log n) each round",
        7: "Take largest (y)",
        8: "Take second largest (x)",
        9: "If not equal, push difference back",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { stones: [2, 7, 4, 1, 8, 1] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Init stones",
              explanation: "Start with stones = [2,7,4,1,8,1]. We'll sort and smash each round.",
              variables: { stones: "[2, 7, 4, 1, 8, 1]", size: 6 },
              dataStructure: { heap: [2, 7, 4, 1, 8, 1], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "Smash 8,7 → 1",
              explanation: "Sorted: [1,1,2,4,7,8]. Take y=8, x=7. Difference = 1. Push 1 back. Stones: [1,1,2,4,1].",
              variables: { x: 7, y: 8, diff: 1, stones: "[1, 1, 2, 4, 1]" },
              dataStructure: { heap: [1, 1, 2, 4, 1], heapHighlight: [4] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "Smash 4,2 → 2",
              explanation: "Sorted: [1,1,1,2,4]. Take y=4, x=2. Difference = 2. Push 2 back. Stones: [1,1,1,2].",
              variables: { x: 2, y: 4, diff: 2, stones: "[1, 1, 1, 2]" },
              dataStructure: { heap: [1, 1, 1, 2], heapHighlight: [3] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "Smash 2,1 → 1",
              explanation: "Sorted: [1,1,1,2]. Take y=2, x=1. Difference = 1. Push 1 back. Stones: [1,1,1].",
              variables: { x: 1, y: 2, diff: 1, stones: "[1, 1, 1]" },
              dataStructure: { heap: [1, 1, 1], heapHighlight: [2] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 7, 8],
              shortLabel: "Smash 1,1 → destroyed",
              explanation: "Sorted: [1,1,1]. Take y=1, x=1. Equal — both destroyed. Stones: [1].",
              variables: { x: 1, y: 1, diff: 0, stones: "[1]" },
              dataStructure: { heap: [1], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12],
              shortLabel: "Return 1",
              explanation: "Only one stone remains with weight 1. Return 1.",
              variables: { answer: 1 },
              dataStructure: { heap: [1], heapHighlight: [0] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: null,
    },

    better: null,

    optimal: {
      label: "Max-Heap",
      tier: "optimal",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: `Use a max-heap. Each round, poll the two largest, compute the difference,
        and push it back if non-zero. Repeat until 0 or 1 stones remain.`,

      javaCode: `public int lastStoneWeight(int[] stones) {
    PriorityQueue<Integer> maxHeap =
        new PriorityQueue<>(Collections.reverseOrder());
    for (int s : stones) maxHeap.offer(s);

    while (maxHeap.size() > 1) {
        int y = maxHeap.poll();
        int x = maxHeap.poll();
        if (y - x > 0) {
            maxHeap.offer(y - x);
        }
    }
    return maxHeap.isEmpty() ? 0 : maxHeap.peek();
}`,

      cppCode: `int lastStoneWeight(vector<int>& stones) {
    priority_queue<int> maxHeap(stones.begin(), stones.end());

    while (maxHeap.size() > 1) {
        int y = maxHeap.top(); maxHeap.pop();
        int x = maxHeap.top(); maxHeap.pop();
        if (y - x > 0) maxHeap.push(y - x);
    }
    return maxHeap.empty() ? 0 : maxHeap.top();
}`,

      pythonCode: `def lastStoneWeight(self, stones: List[int]) -> int:
    heap = [-s for s in stones]
    heapq.heapify(heap)

    while len(heap) > 1:
        y = -heapq.heappop(heap)
        x = -heapq.heappop(heap)
        if y - x > 0:
            heapq.heappush(heap, -(y - x))
    return -heap[0] if heap else 0`,

      lineAnnotations: {
        2: "Max-heap — largest element at root",
        4: "Add all stones to heap — O(n log n)",
        6: "Continue while at least 2 stones remain",
        7: "Poll heaviest stone (y)",
        8: "Poll second heaviest (x)",
        9: "If not equal, push difference back into heap",
        13: "Return last stone or 0 if none remain",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Smash stones until one or none remain",
          input: { stones: [2, 7, 4, 1, 8, 1] },
          expectedOutput: "1",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Build max-heap",
              explanation: "Insert all stones [2,7,4,1,8,1] into a max-heap. The heap orders them with the largest on top: [8,7,4,1,2,1].",
              variables: { heapSize: 6 },
              dataStructure: { heap: [8, 7, 4, 2, 1, 1], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8],
              shortLabel: "Poll 8 and 7",
              explanation: "Poll the two heaviest: y=8, x=7. These are the biggest stones and will be smashed together.",
              variables: { y: 8, x: 7, heapSize: 4 },
              dataStructure: { heap: [4, 2, 1, 1], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [9, 10],
              shortLabel: "8-7=1, push 1",
              explanation: "y - x = 8 - 7 = 1. Not zero, so push 1 back into the heap. Heap: [4,2,1,1,1].",
              variables: { y: 8, x: 7, diff: 1, heapSize: 5 },
              dataStructure: { heap: [4, 2, 1, 1, 1], heapHighlight: [4] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [7, 8],
              shortLabel: "Poll 4 and 2",
              explanation: "Poll y=4, x=2. Smashing the two current heaviest.",
              variables: { y: 4, x: 2, heapSize: 3 },
              dataStructure: { heap: [1, 1, 1], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [9, 10],
              shortLabel: "4-2=2, push 2",
              explanation: "y - x = 4 - 2 = 2. Push 2 back. Heap: [2,1,1,1].",
              variables: { y: 4, x: 2, diff: 2, heapSize: 4 },
              dataStructure: { heap: [2, 1, 1, 1], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [7, 8],
              shortLabel: "Poll 2 and 1",
              explanation: "Poll y=2, x=1.",
              variables: { y: 2, x: 1, heapSize: 2 },
              dataStructure: { heap: [1, 1], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [9, 10],
              shortLabel: "2-1=1, push 1",
              explanation: "y - x = 2 - 1 = 1. Push 1 back. Heap: [1,1,1].",
              variables: { y: 2, x: 1, diff: 1, heapSize: 3 },
              dataStructure: { heap: [1, 1, 1], heapHighlight: [2] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [7, 8],
              shortLabel: "Poll 1 and 1",
              explanation: "Poll y=1, x=1. Both equal weight.",
              variables: { y: 1, x: 1, heapSize: 1 },
              dataStructure: { heap: [1], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [9],
              shortLabel: "1-1=0, both destroyed",
              explanation: "y - x = 1 - 1 = 0. Both stones destroyed. Nothing pushed back. Heap: [1].",
              variables: { y: 1, x: 1, diff: 0, heapSize: 1 },
              dataStructure: { heap: [1], heapHighlight: [0] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [13],
              shortLabel: "Return 1",
              explanation: "Heap has 1 stone remaining with weight 1. Return 1.",
              variables: { answer: 1 },
              dataStructure: { heap: [1], heapHighlight: [0] },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Equal",
          description: "All stones have the same weight",
          input: { stones: [3, 3, 3, 3] },
          expectedOutput: "0",
          commonMistake: "Forgetting to return 0 when all stones are destroyed (even count of equal stones).",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Build max-heap [3,3,3,3]",
              explanation: "All stones are weight 3. Heap: [3,3,3,3].",
              variables: { heapSize: 4 },
              dataStructure: { heap: [3, 3, 3, 3], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [7, 8, 9],
              shortLabel: "Smash 3,3 → destroyed",
              explanation: "Poll y=3, x=3. Equal — both destroyed. Heap: [3,3].",
              variables: { y: 3, x: 3, diff: 0, heapSize: 2 },
              dataStructure: { heap: [3, 3], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [7, 8, 9],
              shortLabel: "Smash 3,3 → destroyed",
              explanation: "Poll y=3, x=3. Equal again — both destroyed. Heap is now empty.",
              variables: { y: 3, x: 3, diff: 0, heapSize: 0 },
              dataStructure: { heap: [], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [13],
              shortLabel: "Return 0",
              explanation: "Heap is empty — all stones were destroyed. Return 0.",
              variables: { answer: 0 },
              dataStructure: { heap: [], heapHighlight: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ stones }) {
        const steps = [];
        // Max-heap simulation using negation
        const heap = [];

        function heapPush(val) {
          heap.push(val);
          let i = heap.length - 1;
          while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (heap[parent] < heap[i]) {
              [heap[parent], heap[i]] = [heap[i], heap[parent]];
              i = parent;
            } else break;
          }
        }

        function heapPop() {
          if (heap.length === 1) return heap.pop();
          const max = heap[0];
          heap[0] = heap.pop();
          let i = 0;
          while (true) {
            let largest = i;
            const l = 2 * i + 1, r = 2 * i + 2;
            if (l < heap.length && heap[l] > heap[largest]) largest = l;
            if (r < heap.length && heap[r] > heap[largest]) largest = r;
            if (largest !== i) {
              [heap[largest], heap[i]] = [heap[i], heap[largest]];
              i = largest;
            } else break;
          }
          return max;
        }

        for (const s of stones) heapPush(s);

        steps.push({
          stepId: 0,
          lineNumbers: [2, 3, 4],
          shortLabel: `Build max-heap`,
          explanation: `Insert all stones into max-heap. Heap: [${[...heap].join(",")}].`,
          variables: { heapSize: heap.length },
          dataStructure: { heap: [...heap], heapHighlight: [] },
          delta: {},
          isAnswer: false,
        });

        while (heap.length > 1) {
          const y = heapPop();
          const x = heapPop();
          const diff = y - x;

          if (diff > 0) {
            heapPush(diff);
            steps.push({
              stepId: steps.length,
              lineNumbers: [7, 8, 9, 10],
              shortLabel: `Smash ${y},${x} → ${diff}`,
              explanation: `Poll y=${y}, x=${x}. Difference = ${diff}. Push ${diff} back. Heap: [${[...heap].join(",")}].`,
              variables: { y, x, diff, heapSize: heap.length },
              dataStructure: { heap: [...heap], heapHighlight: [heap.length - 1] },
              delta: {},
              isAnswer: false,
            });
          } else {
            steps.push({
              stepId: steps.length,
              lineNumbers: [7, 8, 9],
              shortLabel: `Smash ${y},${x} → destroyed`,
              explanation: `Poll y=${y}, x=${x}. Equal — both destroyed. Heap: [${[...heap].join(",")}].`,
              variables: { y, x, diff: 0, heapSize: heap.length },
              dataStructure: { heap: [...heap], heapHighlight: [] },
              delta: {},
              isAnswer: false,
            });
          }
        }

        const answer = heap.length === 0 ? 0 : heap[0];
        steps.push({
          stepId: steps.length,
          lineNumbers: [13],
          shortLabel: `Return ${answer}`,
          explanation: `${heap.length === 0 ? "Heap is empty — all stones destroyed." : `One stone remains: ${answer}.`} Return ${answer}.`,
          variables: { answer },
          dataStructure: { heap: [...heap], heapHighlight: heap.length > 0 ? [0] : [] },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n^2 log n)", space: "O(1)", explanation: "Sort every round (up to n rounds)" },
    optimal: { time: "O(n log n)", space: "O(n)", explanation: "n rounds, each O(log n) for heap operations", tradeoff: "Heap gives O(log n) per round vs O(n log n) per round with sorting" },
  },

  interviewTips: [
    "Immediately identify this as a max-heap problem — repeated extraction of maximum.",
    "In Python, negate values since heapq is a min-heap.",
    "Mention edge case: all stones equal and even count → return 0.",
    "Clarify: 'two heaviest' means poll twice, not just peek.",
    "This is a simulation problem — walk through one round to show understanding.",
  ],

  relatedProblems: ["kth-largest-stream", "kth-largest-array"],
};
