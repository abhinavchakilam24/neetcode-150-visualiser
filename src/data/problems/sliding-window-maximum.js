export const slidingWindowMaximum = {
  id: 20,
  slug: "sliding-window-maximum",
  title: "Sliding Window Maximum",
  difficulty: "Hard",
  topic: "sliding-window",
  topicLabel: "Sliding Window",
  neetcodeNumber: 20,
  artifactType: "SlidingWindow",
  companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/sliding-window-maximum/",

  pattern: "Monotonic Deque for Sliding Window Extremes",
  patternExplanation: `When you need the maximum (or minimum) within every sliding window of size k,
    a monotonic deque maintains candidates in decreasing order. As the window slides, elements
    that can never be the maximum are discarded from the back, and expired elements are removed
    from the front. Each element enters and leaves the deque at most once, giving O(n) total.`,

  intuition: {
    coreInsight: `For each window position, we need the maximum element. Brute force re-scans
      every window in O(k), giving O(nk) total. But most of the work is redundant — when the
      window slides right by one, we only add one element and remove one. A monotonic decreasing
      deque keeps only "useful" candidates: elements that could still be the maximum for some
      future window. Any element smaller than a new arrival will never be the answer again, so
      we pop it from the back. The front of the deque is always the current window's maximum.`,

    mentalModel: `Imagine a line of people waiting to be "king of the hill." When a taller person
      arrives at the back of the line, everyone shorter in front of them gives up — they'll never
      be king while this taller person is around. They leave the line. Meanwhile, the current king
      at the front eventually walks out of the window and is removed. The deque IS this line:
      always sorted tallest-first, with hopeless candidates pruned on arrival.`,

    whyNaiveFails: `Brute force scans each window of size k to find the max: O(k) per window,
      n - k + 1 windows, giving O(nk). For n = 100,000 and k = 50,000, that's 5 billion
      operations. Even a max-heap approach gives O(n log k) because removing arbitrary elements
      from a heap is O(log k). The deque achieves O(n) amortized because each element is pushed
      and popped at most once across the entire traversal.`,

    keyObservation: `The deque stores indices, not values — this lets us check whether the front
      element has left the window (index < i - k + 1). We maintain a decreasing invariant: before
      pushing index i, pop all back elements with values <= nums[i]. The front is always the
      maximum for the current window. This "monotonic" property is the key insight.`,
  },

  problem: `You are given an array of integers nums, there is a sliding window of size k which
    is moving from the very left of the array to the very right. You can only see the k numbers
    in the window. Each time the sliding window moves right by one position. Return the max
    sliding window — an array containing the maximum element in each window position.`,

  examples: [
    { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]", explanation: "Window positions: [1,3,-1]=3, [3,-1,-3]=3, [-1,-3,5]=5, [-3,5,3]=5, [5,3,6]=6, [3,6,7]=7" },
    { input: "nums = [1], k = 1", output: "[1]", explanation: "Single element window." },
  ],

  constraints: [
    "1 <= nums.length <= 10^5",
    "−10^4 <= nums[i] <= 10^4",
    "1 <= k <= nums.length",
  ],

  approaches: {
    brute: {
      label: "Brute Force",
      tier: "brute",
      timeComplexity: "O(nk)",
      spaceComplexity: "O(n - k + 1)",
      idea: "For every window of size k, scan all k elements to find the maximum.",

      javaCode: `public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] result = new int[n - k + 1];
    for (int i = 0; i <= n - k; i++) {
        int max = nums[i];
        for (int j = i + 1; j < i + k; j++) {
            max = Math.max(max, nums[j]);
        }
        result[i] = max;
    }
    return result;
}`,

      cppCode: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    int n = nums.size();
    vector<int> result;
    for (int i = 0; i <= n - k; i++) {
        int mx = nums[i];
        for (int j = i + 1; j < i + k; j++) {
            mx = max(mx, nums[j]);
        }
        result.push_back(mx);
    }
    return result;
}`,

      pythonCode: `def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    n = len(nums)
    result = []
    for i in range(n - k + 1):
        result.append(max(nums[i:i + k]))
    return result`,

      lineAnnotations: {
        3: "Outer loop: each window starting position",
        4: "Initialize max with first element of window",
        5: "Inner loop: scan remaining k-1 elements",
        6: "Track the maximum in this window",
        8: "Store the window maximum in result",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 },
          expectedOutput: "[3, 3, 5, 5, 6, 7]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Window [0..2]",
              explanation: "First window covers indices 0-2: [1, 3, -1]. We scan all three to find the max.",
              variables: { i: 0, k: 3, max: "-", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                windowLeft: 0,
                windowRight: 2,
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6, 8],
              shortLabel: "max([1,3,-1]) = 3",
              explanation: "Scan window [1, 3, -1]. Maximum is 3. Append 3 to result.",
              variables: { i: 0, k: 3, max: 3, result: "[3]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "visited", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                windowLeft: 0,
                windowRight: 2,
                windowMeta: "max=3",
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3, 4, 5, 6, 8],
              shortLabel: "max([3,-1,-3]) = 3",
              explanation: "Slide window to [3, -1, -3]. Maximum is 3. Append 3 to result.",
              variables: { i: 1, k: 3, max: 3, result: "[3, 3]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "visited", 3: "visited", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                windowLeft: 1,
                windowRight: 3,
                windowMeta: "max=3",
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 4, 5, 6, 8],
              shortLabel: "max([-1,-3,5]) = 5",
              explanation: "Slide window to [-1, -3, 5]. Maximum is 5. Append 5 to result.",
              variables: { i: 2, k: 3, max: 5, result: "[3, 3, 5]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "visited", 3: "visited", 4: "found", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                windowLeft: 2,
                windowRight: 4,
                windowMeta: "max=5",
              },
              delta: { changedIndices: [1, 4] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [3, 4, 5, 6, 8],
              shortLabel: "max([-3,5,3]) = 5",
              explanation: "Slide window to [-3, 5, 3]. Maximum is 5. Append 5 to result. Almost done.",
              variables: { i: 3, k: 3, max: 5, result: "[3, 3, 5, 5]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "visited", 4: "found", 5: "visited", 6: "default", 7: "default" },
                pointers: [],
                windowLeft: 3,
                windowRight: 5,
                windowMeta: "max=5",
              },
              delta: { changedIndices: [2, 5] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [3, 4, 5, 6, 8],
              shortLabel: "max([5,3,6]) = 6",
              explanation: "Slide window to [5, 3, 6]. Maximum is 6. Append 6 to result.",
              variables: { i: 4, k: 3, max: 6, result: "[3, 3, 5, 5, 6]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "visited", 5: "visited", 6: "found", 7: "default" },
                pointers: [],
                windowLeft: 4,
                windowRight: 6,
                windowMeta: "max=6",
              },
              delta: { changedIndices: [3, 6] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [3, 4, 5, 6, 8],
              shortLabel: "max([3,6,7]) = 7",
              explanation: "Final window [3, 6, 7]. Maximum is 7. Append 7. Result complete: [3, 3, 5, 5, 6, 7].",
              variables: { i: 5, k: 3, max: 7, result: "[3, 3, 5, 5, 6, 7]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "visited", 6: "visited", 7: "found" },
                pointers: [],
                windowLeft: 5,
                windowRight: 7,
                windowMeta: "max=7",
              },
              delta: { changedIndices: [4, 7] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, k }) {
        const steps = [];
        const n = nums.length;
        const result = [];

        for (let i = 0; i <= n - k; i++) {
          let max = nums[i];
          for (let j = i + 1; j < i + k; j++) {
            max = Math.max(max, nums[j]);
          }
          result.push(max);

          const arrayStates = {};
          for (let j = 0; j < n; j++) {
            if (j < i || j >= i + k) arrayStates[j] = "default";
            else if (nums[j] === max) arrayStates[j] = "found";
            else arrayStates[j] = "visited";
          }

          steps.push({
            stepId: steps.length,
            lineNumbers: [3, 4, 5, 6, 8],
            shortLabel: `Window [${i}..${i + k - 1}] max=${max}`,
            explanation: `Window covers indices ${i} to ${i + k - 1}: [${nums.slice(i, i + k).join(", ")}]. Maximum is ${max}. Result so far: [${result.join(", ")}].`,
            variables: { i, k, max, result: `[${result.join(", ")}]` },
            dataStructure: {
              arrayStates,
              pointers: [],
              windowLeft: i,
              windowRight: i + k - 1,
              windowMeta: `max=${max}`,
            },
            delta: {},
            isAnswer: i === n - k,
          });
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Monotonic Deque",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(k)",
      idea: `Maintain a deque of indices in decreasing order of their values. For each new element,
        remove all smaller elements from the back (they'll never be the max). Remove the front if
        it's outside the window. The front is always the current window's maximum.`,

      javaCode: `public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] result = new int[n - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
        // Remove indices outside the window
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
            deque.pollFirst();
        }

        // Remove smaller elements from back
        while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
            deque.pollLast();
        }

        deque.offerLast(i);

        // Window is fully formed
        if (i >= k - 1) {
            result[i - k + 1] = nums[deque.peekFirst()];
        }
    }
    return result;
}`,

      cppCode: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    int n = nums.size();
    vector<int> result;
    deque<int> dq;

    for (int i = 0; i < n; i++) {
        // Remove indices outside the window
        while (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }

        // Remove smaller elements from back
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }

        dq.push_back(i);

        // Window is fully formed
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}`,

      pythonCode: `def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    from collections import deque
    dq = deque()  # stores indices
    result = []

    for i in range(len(nums)):
        # Remove indices outside the window
        while dq and dq[0] < i - k + 1:
            dq.popleft()

        # Remove smaller elements from back
        while dq and nums[dq[-1]] <= nums[i]:
            dq.pop()

        dq.append(i)

        # Window is fully formed
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result`,

      lineAnnotations: {
        4:  "Initialize an empty deque to store indices",
        6:  "Iterate through every element in nums",
        8:  "Remove front of deque if it's outside the current window",
        9:  "Pop expired index from front",
        13: "Remove elements from back that are smaller than current — they're useless",
        14: "Pop useless index from back",
        17: "Add current index to back of deque",
        20: "Once we've processed at least k elements, record the window max",
        21: "Front of deque is always the index of the current window maximum",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Classic example with mixed positive and negative values",
          input: { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 },
          expectedOutput: "[3, 3, 5, 5, 6, 7]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4],
              shortLabel: "Init deque",
              explanation: "Create an empty deque. It will store indices of elements in decreasing order of their values. The front will always hold the index of the current window maximum.",
              variables: { i: "-", k: 3, deque: "[]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [],
                windowLeft: 0,
                windowRight: -1,
                stack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 13, 14, 17],
              shortLabel: "i=0: push 0, deque=[0]",
              explanation: "Process index 0 (value=1). Deque is empty, so just push index 0. Deque: [0]. Window not yet full (need k=3 elements).",
              variables: { i: 0, "nums[i]": 1, k: 3, deque: "[0]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                windowLeft: 0,
                windowRight: 0,
                stack: [0],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 13, 14, 17],
              shortLabel: "i=1: pop 0, push 1",
              explanation: "Process index 1 (value=3). nums[0]=1 <= 3, so pop index 0 from back — value 1 will never be the max while 3 is in the window. Push index 1. Deque: [1]. Window still not full.",
              variables: { i: 1, "nums[i]": 3, k: 3, deque: "[1]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                windowLeft: 0,
                windowRight: 1,
                stack: [1],
                stackOperation: "push",
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 17, 20, 21],
              shortLabel: "i=2: push 2, max=3",
              explanation: "Process index 2 (value=-1). nums[1]=3 > -1, so -1 doesn't remove anything. Push index 2. Deque: [1, 2]. Window is now full (i >= k-1 = 2). Front of deque is index 1, nums[1]=3. First result: 3.",
              variables: { i: 2, "nums[i]": -1, k: 3, deque: "[1, 2]", result: "[3]" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "found", 2: "active", 3: "default", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                windowLeft: 0,
                windowRight: 2,
                windowMeta: "max=3",
                stack: [1, 2],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 17, 20, 21],
              shortLabel: "i=3: push 3, max=3",
              explanation: "Process index 3 (value=-3). nums[2]=-1 > -3, so no removal. Push index 3. Deque: [1, 2, 3]. Front index 1 is still in window [1..3]. nums[1]=3 is max. Result: [3, 3].",
              variables: { i: 3, "nums[i]": -3, k: 3, deque: "[1, 2, 3]", result: "[3, 3]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "visited", 3: "active", 4: "default", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                windowLeft: 1,
                windowRight: 3,
                windowMeta: "max=3",
                stack: [1, 2, 3],
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 8, 9, 13, 14, 17, 20, 21],
              shortLabel: "i=4: expire 1, pop 2,3, push 4, max=5",
              explanation: "Process index 4 (value=5). Front of deque is index 1, but 1 < 4-3+1=2, so it's expired — remove it. Now check back: nums[2]=-1 <= 5, pop; nums[3]=-3 <= 5, pop. Deque empty. Push index 4. Deque: [4]. nums[4]=5 is the max. Result: [3, 3, 5].",
              variables: { i: 4, "nums[i]": 5, k: 3, deque: "[4]", result: "[3, 3, 5]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "eliminated", 3: "eliminated", 4: "found", 5: "default", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                windowLeft: 2,
                windowRight: 4,
                windowMeta: "max=5",
                stack: [4],
              },
              delta: { changedIndices: [1, 2, 3, 4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [6, 17, 20, 21],
              shortLabel: "i=5: push 5, max=5",
              explanation: "Process index 5 (value=3). nums[4]=5 > 3, so no removal from back. Push index 5. Deque: [4, 5]. Front is index 4 (value=5), still in window [3..5]. Max=5. Result: [3, 3, 5, 5].",
              variables: { i: 5, "nums[i]": 3, k: 3, deque: "[4, 5]", result: "[3, 3, 5, 5]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "visited", 4: "found", 5: "active", 6: "default", 7: "default" },
                pointers: [{ name: "i", index: 5, color: "pointer" }],
                windowLeft: 3,
                windowRight: 5,
                windowMeta: "max=5",
                stack: [4, 5],
              },
              delta: { changedIndices: [2, 5] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [6, 8, 9, 13, 14, 17, 20, 21],
              shortLabel: "i=6: expire 4, pop 5, push 6, max=6",
              explanation: "Process index 6 (value=6). Front index 4 < 6-3+1=4? No, 4 >= 4, stays. Check back: nums[5]=3 <= 6, pop. nums[4]=5 <= 6, pop. Deque empty. Push 6. Deque: [6]. nums[6]=6. Result: [3, 3, 5, 5, 6].",
              variables: { i: 6, "nums[i]": 6, k: 3, deque: "[6]", result: "[3, 3, 5, 5, 6]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "eliminated", 5: "eliminated", 6: "found", 7: "default" },
                pointers: [{ name: "i", index: 6, color: "pointer" }],
                windowLeft: 4,
                windowRight: 6,
                windowMeta: "max=6",
                stack: [6],
              },
              delta: { changedIndices: [3, 4, 5, 6] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [6, 13, 14, 17, 20, 21],
              shortLabel: "i=7: pop 6, push 7, max=7",
              explanation: "Process index 7 (value=7). nums[6]=6 <= 7, pop index 6. Push index 7. Deque: [7]. nums[7]=7 is max. Final result: [3, 3, 5, 5, 6, 7]. Done!",
              variables: { i: 7, "nums[i]": 7, k: 3, deque: "[7]", result: "[3, 3, 5, 5, 6, 7]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default", 5: "visited", 6: "eliminated", 7: "found" },
                pointers: [{ name: "i", index: 7, color: "pointer" }],
                windowLeft: 5,
                windowRight: 7,
                windowMeta: "max=7",
                stack: [7],
              },
              delta: { changedIndices: [5, 6, 7] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Decreasing Array",
          description: "Sorted descending — deque never pops from back, only expires from front",
          input: { nums: [5, 4, 3, 2, 1], k: 3 },
          expectedOutput: "[5, 4, 3]",
          commonMistake: "Forgetting to remove expired indices from the front when the window slides past them.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4],
              shortLabel: "Init deque",
              explanation: "Empty deque. With a decreasing array, every new element is smaller than the previous, so nothing ever gets popped from the back. Only front expiration matters.",
              variables: { i: "-", k: 3, deque: "[]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                stack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 17],
              shortLabel: "i=0: push 0",
              explanation: "Push index 0 (value=5). Deque: [0]. Window not full yet.",
              variables: { i: 0, "nums[i]": 5, k: 3, deque: "[0]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [0],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 17],
              shortLabel: "i=1: push 1",
              explanation: "Push index 1 (value=4). 4 < 5, so nothing popped from back. Deque: [0, 1]. Window still not full.",
              variables: { i: 1, "nums[i]": 4, k: 3, deque: "[0, 1]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [0, 1],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 17, 20, 21],
              shortLabel: "i=2: push 2, max=5",
              explanation: "Push index 2 (value=3). Deque: [0, 1, 2]. Window full. Front is index 0, nums[0]=5. Result: [5].",
              variables: { i: 2, "nums[i]": 3, k: 3, deque: "[0, 1, 2]", result: "[5]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                windowLeft: 0,
                windowRight: 2,
                windowMeta: "max=5",
                stack: [0, 1, 2],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 8, 9, 17, 20, 21],
              shortLabel: "i=3: expire 0, push 3, max=4",
              explanation: "Index 3 (value=2). Front index 0 < 3-3+1=1, expired — remove. Deque: [1, 2, 3]. Push 3. Front is index 1, nums[1]=4. Result: [5, 4].",
              variables: { i: 3, "nums[i]": 2, k: 3, deque: "[1, 2, 3]", result: "[5, 4]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "found", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                windowLeft: 1,
                windowRight: 3,
                windowMeta: "max=4",
                stack: [1, 2, 3],
              },
              delta: { changedIndices: [0, 3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 8, 9, 17, 20, 21],
              shortLabel: "i=4: expire 1, push 4, max=3",
              explanation: "Index 4 (value=1). Front index 1 < 4-3+1=2, expired — remove. Push 4. Deque: [2, 3, 4]. Front is index 2, nums[2]=3. Final result: [5, 4, 3].",
              variables: { i: 4, "nums[i]": 1, k: 3, deque: "[2, 3, 4]", result: "[5, 4, 3]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "found", 3: "visited", 4: "active" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                windowLeft: 2,
                windowRight: 4,
                windowMeta: "max=3",
                stack: [2, 3, 4],
              },
              delta: { changedIndices: [1, 4] },
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "Increasing Array",
          description: "Sorted ascending — every new element clears the entire deque",
          input: { nums: [1, 2, 3, 4, 5], k: 3 },
          expectedOutput: "[3, 4, 5]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4],
              shortLabel: "Init deque",
              explanation: "Empty deque. With an increasing array, every new element is the largest so far, clearing the entire deque each time.",
              variables: { i: "-", k: 3, deque: "[]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [],
                stack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 17],
              shortLabel: "i=0: push 0",
              explanation: "Push index 0 (value=1). Deque: [0].",
              variables: { i: 0, "nums[i]": 1, k: 3, deque: "[0]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [0],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [6, 13, 14, 17],
              shortLabel: "i=1: pop 0, push 1",
              explanation: "Index 1 (value=2). nums[0]=1 <= 2, pop. Push 1. Deque: [1]. Value 1 will never be max while 2 exists.",
              variables: { i: 1, "nums[i]": 2, k: 3, deque: "[1]", result: "[]" },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [1],
              },
              delta: { changedIndices: [0, 1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 13, 14, 17, 20, 21],
              shortLabel: "i=2: pop 1, push 2, max=3",
              explanation: "Index 2 (value=3). nums[1]=2 <= 3, pop. Push 2. Deque: [2]. Window full. Max=3. Result: [3].",
              variables: { i: 2, "nums[i]": 3, k: 3, deque: "[2]", result: "[3]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "eliminated", 2: "found", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                windowLeft: 0,
                windowRight: 2,
                windowMeta: "max=3",
                stack: [2],
              },
              delta: { changedIndices: [1, 2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [6, 13, 14, 17, 20, 21],
              shortLabel: "i=3: pop 2, push 3, max=4",
              explanation: "Index 3 (value=4). nums[2]=3 <= 4, pop. Push 3. Deque: [3]. Max=4. Result: [3, 4].",
              variables: { i: 3, "nums[i]": 4, k: 3, deque: "[3]", result: "[3, 4]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "eliminated", 3: "found", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                windowLeft: 1,
                windowRight: 3,
                windowMeta: "max=4",
                stack: [3],
              },
              delta: { changedIndices: [2, 3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 13, 14, 17, 20, 21],
              shortLabel: "i=4: pop 3, push 4, max=5",
              explanation: "Index 4 (value=5). nums[3]=4 <= 5, pop. Push 4. Deque: [4]. Max=5. Final result: [3, 4, 5].",
              variables: { i: 4, "nums[i]": 5, k: 3, deque: "[4]", result: "[3, 4, 5]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "eliminated", 4: "found" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                windowLeft: 2,
                windowRight: 4,
                windowMeta: "max=5",
                stack: [4],
              },
              delta: { changedIndices: [3, 4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ nums, k }) {
        const steps = [];
        const n = nums.length;
        const deque = []; // stores indices
        const result = [];

        steps.push({
          stepId: 0,
          lineNumbers: [4],
          shortLabel: "Init deque",
          explanation: "Create an empty deque to store indices in decreasing order of their values.",
          variables: { i: "-", k, deque: "[]", result: "[]" },
          dataStructure: {
            arrayStates: Object.fromEntries(nums.map((_, i) => [i, "default"])),
            pointers: [],
            stack: [],
          },
          delta: {},
          isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          // Remove expired front
          while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
          }

          // Remove smaller elements from back
          while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
          }

          deque.push(i);

          if (i >= k - 1) {
            result.push(nums[deque[0]]);
          }

          const arrayStates = {};
          for (let j = 0; j < n; j++) {
            if (i >= k - 1 && j === deque[0]) arrayStates[j] = "found";
            else if (j === i) arrayStates[j] = "active";
            else if (j < i - k + 1) arrayStates[j] = "default";
            else if (j < i) arrayStates[j] = "visited";
            else arrayStates[j] = "default";
          }

          const windowFormed = i >= k - 1;

          steps.push({
            stepId: steps.length,
            lineNumbers: windowFormed ? [6, 17, 20, 21] : [6, 17],
            shortLabel: windowFormed
              ? `i=${i}: deque=[${deque.join(",")}], max=${nums[deque[0]]}`
              : `i=${i}: deque=[${deque.join(",")}]`,
            explanation: windowFormed
              ? `Process index ${i} (value=${nums[i]}). Deque: [${deque.join(", ")}]. Window [${i - k + 1}..${i}]. Front is index ${deque[0]}, value=${nums[deque[0]]}. Result: [${result.join(", ")}].`
              : `Process index ${i} (value=${nums[i]}). Deque: [${deque.join(", ")}]. Window not yet full.`,
            variables: {
              i,
              "nums[i]": nums[i],
              k,
              deque: `[${deque.join(", ")}]`,
              result: `[${result.join(", ")}]`,
            },
            dataStructure: {
              arrayStates,
              pointers: [{ name: "i", index: i, color: "pointer" }],
              windowLeft: Math.max(0, i - k + 1),
              windowRight: i,
              windowMeta: windowFormed ? `max=${nums[deque[0]]}` : undefined,
              stack: [...deque],
            },
            delta: { changedIndices: [i] },
            isAnswer: i === n - 1,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(nk)", space: "O(n - k + 1)", explanation: "Scan k elements for each of n-k+1 windows" },
    optimal: { time: "O(n)",  space: "O(k)",          explanation: "Each element enters and leaves the deque at most once; deque holds at most k elements", tradeoff: "The monotonic deque gives us amortized O(1) per element instead of O(k)" },
  },

  interviewTips: [
    "Start by explaining the brute force O(nk) approach before introducing the deque.",
    "Emphasize that the deque stores INDICES, not values — this is how we detect expiration.",
    "Explain the monotonic decreasing invariant: any element smaller than the incoming one can never be max.",
    "Mention that each element enters and leaves the deque exactly once, giving O(n) amortized.",
    "Clarify that this is a deque (double-ended queue), not a regular queue or stack.",
    "Ask: 'Should the output length always be n - k + 1?' to show attention to edge cases.",
  ],

  relatedProblems: ["minimum-window-substring", "longest-substring-without-repeating", "daily-temperatures"],
};
