export const taskScheduler = {
  id: 68,
  slug: "task-scheduler",
  title: "Task Scheduler",
  difficulty: "Medium",
  topic: "heap-priority-queue",
  topicLabel: "Heap / Priority Queue",
  neetcodeNumber: 68,
  artifactType: "Heap",
  companies: ["Meta", "Amazon", "Google", "Microsoft", "Bloomberg"],
  leetcodeLink: "https://leetcode.com/problems/task-scheduler/",

  pattern: "Greedy Scheduling with Max Heap + Cooldown Queue",
  patternExplanation: `When scheduling tasks with cooldown constraints, always prioritize
    the most frequent task first. A max heap gives us the highest-frequency task in O(log k),
    and a cooldown queue holds tasks that are waiting out their idle time.`,

  intuition: {
    coreInsight: `The key insight is that the most frequent task dictates the minimum time.
      If task A appears 3 times and cooldown is 2, we need at least: A _ _ A _ _ A = 7 slots.
      We fill those gaps with other tasks sorted by frequency. A max heap always gives us
      the best task to schedule next, minimizing idle slots.`,

    mentalModel: `Imagine you're a chef with multiple dishes to cook, but after cooking any
      dish, the oven needs n minutes to cool before you can cook the same dish again. You'd
      naturally start with the dish you need to cook the most — that way you spread its
      instances across the timeline. While the oven cools, you cook other dishes. The max
      heap is your priority list of "which dish needs the most remaining servings."`,

    whyNaiveFails: `A naive approach that processes tasks in order ignores frequency.
      For tasks = ["A","A","A","B","B","B"], n=2, processing left to right gives
      A B A B A B = 6 units. But if frequencies are unbalanced like ["A","A","A","B","C","D"],
      n=2, a naive approach might create unnecessary idle time by not choosing optimally.`,

    keyObservation: `After executing a task, don't put it back in the heap immediately —
      put it in a cooldown queue with the time it becomes available. Only when the current
      time reaches that availability time do we re-add it to the heap. This elegantly handles
      the cooldown constraint without complex bookkeeping.`,
  },

  problem: `You are given an array of CPU tasks, each represented by letters A to Z, and a
    cooling interval n. Each cycle or interval allows the completion of one task. Tasks can
    be completed in any order, but there's a constraint: identical tasks must be separated
    by at least n intervals. Return the minimum number of intervals the CPU will take to
    finish all the given tasks.`,

  examples: [
    { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8", explanation: "A -> B -> idle -> A -> B -> idle -> A -> B" },
    { input: 'tasks = ["A","A","A","B","B","B"], n = 0', output: "6", explanation: "No cooldown needed, just run all 6 tasks" },
    { input: 'tasks = ["A","A","A","A","B","B","B","C","C"], n = 2', output: "10", explanation: "A -> B -> C -> A -> B -> C -> A -> B -> idle -> A" },
  ],

  constraints: [
    "1 <= tasks.length <= 10^4",
    "tasks[i] is upper-case English letter",
    "0 <= n <= 100",
  ],

  approaches: {
    brute: {
      label: "Simulation with Sorting",
      tier: "brute",
      timeComplexity: "O(time * 26)",
      spaceComplexity: "O(26)",
      idea: "At each time step, sort remaining tasks by frequency and greedily pick the most frequent one that isn't on cooldown.",

      javaCode: `public int leastInterval(char[] tasks, int n) {
    int[] freq = new int[26];
    for (char t : tasks) freq[t - 'A']++;

    int time = 0;
    int[] cooldown = new int[26];
    int remaining = tasks.length;

    while (remaining > 0) {
        time++;
        int bestIdx = -1, bestFreq = 0;
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0 && cooldown[i] <= time && freq[i] > bestFreq) {
                bestFreq = freq[i];
                bestIdx = i;
            }
        }
        if (bestIdx != -1) {
            freq[bestIdx]--;
            cooldown[bestIdx] = time + n + 1;
            remaining--;
        }
    }
    return time;
}`,

      cppCode: `int leastInterval(vector<char>& tasks, int n) {
    vector<int> freq(26, 0);
    for (char t : tasks) freq[t - 'A']++;

    int time = 0;
    vector<int> cooldown(26, 0);
    int remaining = tasks.size();

    while (remaining > 0) {
        time++;
        int bestIdx = -1, bestFreq = 0;
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0 && cooldown[i] <= time && freq[i] > bestFreq) {
                bestFreq = freq[i];
                bestIdx = i;
            }
        }
        if (bestIdx != -1) {
            freq[bestIdx]--;
            cooldown[bestIdx] = time + n + 1;
            remaining--;
        }
    }
    return time;
}`,

      pythonCode: `def leastInterval(tasks: List[str], n: int) -> int:
    freq = [0] * 26
    for t in tasks:
        freq[ord(t) - ord('A')] += 1

    time = 0
    cooldown = [0] * 26
    remaining = len(tasks)

    while remaining > 0:
        time += 1
        best_idx, best_freq = -1, 0
        for i in range(26):
            if freq[i] > 0 and cooldown[i] <= time and freq[i] > best_freq:
                best_freq = freq[i]
                best_idx = i
        if best_idx != -1:
            freq[best_idx] -= 1
            cooldown[best_idx] = time + n + 1
            remaining -= 1
    return time`,

      lineAnnotations: {
        2: "Count frequency of each task",
        8: "Process one time unit per iteration",
        10: "Find highest-frequency task not on cooldown",
        11: "Must have remaining count and be off cooldown",
        16: "Execute the task and set its next available time",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { tasks: ["A","A","A","B","B","B"], n: 2 },
          expectedOutput: "8",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2],
              shortLabel: "Count frequencies",
              explanation: "Count task frequencies: A=3, B=3. These are the two tasks we need to schedule with cooldown n=2.",
              variables: { "freq[A]": 3, "freq[B]": 3, n: 2, remaining: 6 },
              dataStructure: {
                heap: [3, 3],
                heapLabels: ["A:3", "B:3"],
                heapHighlight: null,
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [8, 10, 16],
              shortLabel: "t=1: Execute A",
              explanation: "Time 1: Pick A (freq=3, highest). Execute A, decrement to 2. A is on cooldown until time 4.",
              variables: { time: 1, "freq[A]": 2, "freq[B]": 3, "cooldown[A]": 4, remaining: 5 },
              dataStructure: {
                heap: [3, 2],
                heapLabels: ["B:3", "A:2"],
                heapHighlight: 0,
                schedule: ["A"],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [8, 10, 16],
              shortLabel: "t=2: Execute B",
              explanation: "Time 2: A is on cooldown. Pick B (freq=3). Execute B, decrement to 2. B is on cooldown until time 5.",
              variables: { time: 2, "freq[A]": 2, "freq[B]": 2, "cooldown[B]": 5, remaining: 4 },
              dataStructure: {
                heap: [2, 2],
                heapLabels: ["A:2", "B:2"],
                heapHighlight: 1,
                schedule: ["A", "B"],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 10],
              shortLabel: "t=3: Idle",
              explanation: "Time 3: Both A and B are on cooldown. No task can run. CPU idles.",
              variables: { time: 3, "freq[A]": 2, "freq[B]": 2, remaining: 4 },
              dataStructure: {
                heap: [2, 2],
                heapLabels: ["A:2", "B:2"],
                heapHighlight: null,
                schedule: ["A", "B", "idle"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [8, 10, 16],
              shortLabel: "t=4: Execute A",
              explanation: "Time 4: A is off cooldown. Pick A (freq=2). Execute, decrement to 1. Cooldown until time 7.",
              variables: { time: 4, "freq[A]": 1, "freq[B]": 2, remaining: 3 },
              dataStructure: {
                heap: [2, 1],
                heapLabels: ["B:2", "A:1"],
                heapHighlight: 0,
                schedule: ["A", "B", "idle", "A"],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [8, 10, 16],
              shortLabel: "t=5: Execute B",
              explanation: "Time 5: B is off cooldown. Pick B (freq=2). Execute, decrement to 1. Cooldown until time 8.",
              variables: { time: 5, "freq[A]": 1, "freq[B]": 1, remaining: 2 },
              dataStructure: {
                heap: [1, 1],
                heapLabels: ["A:1", "B:1"],
                heapHighlight: 1,
                schedule: ["A", "B", "idle", "A", "B"],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [8, 10],
              shortLabel: "t=6: Idle",
              explanation: "Time 6: Both on cooldown again. CPU idles.",
              variables: { time: 6, "freq[A]": 1, "freq[B]": 1, remaining: 2 },
              dataStructure: {
                heap: [1, 1],
                heapLabels: ["A:1", "B:1"],
                heapHighlight: null,
                schedule: ["A", "B", "idle", "A", "B", "idle"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [8, 10, 16],
              shortLabel: "t=7: Execute A",
              explanation: "Time 7: A is off cooldown. Execute last A. freq[A]=0.",
              variables: { time: 7, "freq[A]": 0, "freq[B]": 1, remaining: 1 },
              dataStructure: {
                heap: [1],
                heapLabels: ["B:1"],
                heapHighlight: 0,
                schedule: ["A", "B", "idle", "A", "B", "idle", "A"],
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [8, 10, 16],
              shortLabel: "t=8: Execute B → Done!",
              explanation: "Time 8: B is off cooldown. Execute last B. All tasks done! Total time = 8.",
              variables: { time: 8, "freq[A]": 0, "freq[B]": 0, remaining: 0, answer: 8 },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                schedule: ["A", "B", "idle", "A", "B", "idle", "A", "B"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tasks, n }) {
        const steps = [];
        const freq = {};
        for (const t of tasks) freq[t] = (freq[t] || 0) + 1;
        const cooldown = {};
        let remaining = tasks.length;
        let time = 0;

        const heapState = () => {
          const entries = Object.entries(freq).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
          return {
            heap: entries.map(([, v]) => v),
            heapLabels: entries.map(([k, v]) => `${k}:${v}`),
          };
        };

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Count frequencies",
          explanation: `Count task frequencies: ${Object.entries(freq).map(([k, v]) => `${k}=${v}`).join(", ")}.`,
          variables: { ...Object.fromEntries(Object.entries(freq).map(([k, v]) => [`freq[${k}]`, v])), n, remaining },
          dataStructure: { ...heapState(), heapHighlight: null },
          delta: {}, isAnswer: false,
        });

        const schedule = [];
        while (remaining > 0) {
          time++;
          let bestTask = null, bestFreq = 0;
          for (const [task, f] of Object.entries(freq)) {
            if (f > 0 && (!cooldown[task] || cooldown[task] <= time) && f > bestFreq) {
              bestFreq = f;
              bestTask = task;
            }
          }
          if (bestTask) {
            freq[bestTask]--;
            cooldown[bestTask] = time + n + 1;
            remaining--;
            schedule.push(bestTask);
            steps.push({
              stepId: steps.length, lineNumbers: [8, 10, 16],
              shortLabel: `t=${time}: Execute ${bestTask}`,
              explanation: `Time ${time}: Execute ${bestTask} (freq was ${freq[bestTask] + 1}, now ${freq[bestTask]}). ${remaining === 0 ? "All done!" : ""}`,
              variables: { time, ...Object.fromEntries(Object.entries(freq).map(([k, v]) => [`freq[${k}]`, v])), remaining },
              dataStructure: { ...heapState(), heapHighlight: 0, schedule: [...schedule] },
              delta: {}, isAnswer: remaining === 0,
            });
          } else {
            schedule.push("idle");
            steps.push({
              stepId: steps.length, lineNumbers: [8, 10],
              shortLabel: `t=${time}: Idle`,
              explanation: `Time ${time}: All tasks on cooldown. CPU idles.`,
              variables: { time, ...Object.fromEntries(Object.entries(freq).map(([k, v]) => [`freq[${k}]`, v])), remaining },
              dataStructure: { ...heapState(), heapHighlight: null, schedule: [...schedule] },
              delta: {}, isAnswer: false,
            });
          }
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Max Heap + Cooldown Queue",
      tier: "optimal",
      timeComplexity: "O(n * log 26) → O(n)",
      spaceComplexity: "O(26) → O(1)",
      idea: `Use a max heap to always pick the most frequent available task. After executing,
        place it in a cooldown queue with its next-available time. When the queue front becomes
        available, push it back onto the heap. If both are empty but tasks remain, idle.`,

      javaCode: `public int leastInterval(char[] tasks, int n) {
    int[] freq = new int[26];
    for (char t : tasks) freq[t - 'A']++;

    PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
    for (int f : freq) if (f > 0) heap.offer(f);

    Queue<int[]> cooldownQ = new LinkedList<>();
    int time = 0;

    while (!heap.isEmpty() || !cooldownQ.isEmpty()) {
        time++;

        if (!cooldownQ.isEmpty() && cooldownQ.peek()[1] <= time) {
            heap.offer(cooldownQ.poll()[0]);
        }

        if (!heap.isEmpty()) {
            int count = heap.poll() - 1;
            if (count > 0) {
                cooldownQ.offer(new int[]{count, time + n + 1});
            }
        }
    }
    return time;
}`,

      cppCode: `int leastInterval(vector<char>& tasks, int n) {
    vector<int> freq(26, 0);
    for (char t : tasks) freq[t - 'A']++;

    priority_queue<int> heap;
    for (int f : freq) if (f > 0) heap.push(f);

    queue<pair<int,int>> cooldownQ;
    int time = 0;

    while (!heap.empty() || !cooldownQ.empty()) {
        time++;

        if (!cooldownQ.empty() && cooldownQ.front().second <= time) {
            heap.push(cooldownQ.front().first);
            cooldownQ.pop();
        }

        if (!heap.empty()) {
            int count = heap.top() - 1;
            heap.pop();
            if (count > 0) {
                cooldownQ.push({count, time + n + 1});
            }
        }
    }
    return time;
}`,

      pythonCode: `def leastInterval(tasks: List[str], n: int) -> int:
    freq = Counter(tasks)
    heap = [-f for f in freq.values()]
    heapq.heapify(heap)

    cooldown_q = deque()
    time = 0

    while heap or cooldown_q:
        time += 1

        if cooldown_q and cooldown_q[0][1] <= time:
            heapq.heappush(heap, cooldown_q.popleft()[0])

        if heap:
            count = heapq.heappop(heap) + 1  # +1 because max heap uses negatives
            if count < 0:
                cooldown_q.append((count, time + n + 1))

    return time`,

      lineAnnotations: {
        2: "Count frequency of each task letter",
        5: "Max heap holds remaining counts of each task type",
        8: "Cooldown queue: [remaining_count, available_at_time]",
        11: "Process until all tasks done (heap and queue both empty)",
        14: "If front of cooldown queue is ready, push it back to heap",
        18: "Pop highest-frequency task from heap and execute it",
        20: "If count remains, put it in cooldown queue",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Balanced frequencies with cooldown causing idles",
          input: { tasks: ["A","A","A","B","B","B"], n: 2 },
          expectedOutput: "8",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 5],
              shortLabel: "Build heap",
              explanation: "Count frequencies: A=3, B=3. Push both into max heap. Heap = [3, 3].",
              variables: { time: 0, heap: "[3, 3]", cooldownQ: "[]" },
              dataStructure: {
                heap: [3, 3],
                heapLabels: ["A:3", "B:3"],
                heapHighlight: null,
                cooldownQueue: [],
                schedule: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11, 18, 20],
              shortLabel: "t=1: Pop 3, exec A",
              explanation: "Time 1: Pop 3 from heap (task A). Decrement to 2. Push (2, time=4) to cooldown queue. A can't run again until time 4.",
              variables: { time: 1, heap: "[3]", cooldownQ: "[(2,4)]" },
              dataStructure: {
                heap: [3],
                heapLabels: ["B:3"],
                heapHighlight: null,
                cooldownQueue: [{ count: 2, availableAt: 4, label: "A:2@t4" }],
                schedule: ["A"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 18, 20],
              shortLabel: "t=2: Pop 3, exec B",
              explanation: "Time 2: Cooldown queue front (2,4) not ready. Pop 3 from heap (task B). Decrement to 2. Push (2, time=5) to cooldown.",
              variables: { time: 2, heap: "[]", cooldownQ: "[(2,4),(2,5)]" },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                cooldownQueue: [
                  { count: 2, availableAt: 4, label: "A:2@t4" },
                  { count: 2, availableAt: 5, label: "B:2@t5" },
                ],
                schedule: ["A", "B"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11, 14],
              shortLabel: "t=3: Idle",
              explanation: "Time 3: Heap is empty. Cooldown front (2,4): 4 > 3, not ready. CPU must idle.",
              variables: { time: 3, heap: "[]", cooldownQ: "[(2,4),(2,5)]" },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                cooldownQueue: [
                  { count: 2, availableAt: 4, label: "A:2@t4" },
                  { count: 2, availableAt: 5, label: "B:2@t5" },
                ],
                schedule: ["A", "B", "idle"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 14, 18, 20],
              shortLabel: "t=4: A ready, exec A",
              explanation: "Time 4: Cooldown front (2,4): 4 <= 4, pop and push count=2 back to heap. Pop 2 from heap, execute A. Decrement to 1, push (1, time=7).",
              variables: { time: 4, heap: "[]", cooldownQ: "[(2,5),(1,7)]" },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                cooldownQueue: [
                  { count: 2, availableAt: 5, label: "B:2@t5" },
                  { count: 1, availableAt: 7, label: "A:1@t7" },
                ],
                schedule: ["A", "B", "idle", "A"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 14, 18, 20],
              shortLabel: "t=5: B ready, exec B",
              explanation: "Time 5: Cooldown front (2,5): 5 <= 5, pop and push count=2 to heap. Pop 2, execute B. Decrement to 1, push (1, time=8).",
              variables: { time: 5, heap: "[]", cooldownQ: "[(1,7),(1,8)]" },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                cooldownQueue: [
                  { count: 1, availableAt: 7, label: "A:1@t7" },
                  { count: 1, availableAt: 8, label: "B:1@t8" },
                ],
                schedule: ["A", "B", "idle", "A", "B"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 14],
              shortLabel: "t=6: Idle",
              explanation: "Time 6: Heap empty. Front (1,7): 7 > 6, not ready. Idle again.",
              variables: { time: 6, heap: "[]", cooldownQ: "[(1,7),(1,8)]" },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                cooldownQueue: [
                  { count: 1, availableAt: 7, label: "A:1@t7" },
                  { count: 1, availableAt: 8, label: "B:1@t8" },
                ],
                schedule: ["A", "B", "idle", "A", "B", "idle"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [11, 14, 18],
              shortLabel: "t=7: A ready, exec A (last)",
              explanation: "Time 7: Pop (1,7) from cooldown, push 1 to heap. Pop 1, execute A. Count becomes 0 — don't re-add.",
              variables: { time: 7, heap: "[]", cooldownQ: "[(1,8)]" },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                cooldownQueue: [{ count: 1, availableAt: 8, label: "B:1@t8" }],
                schedule: ["A", "B", "idle", "A", "B", "idle", "A"],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [11, 14, 18],
              shortLabel: "t=8: B ready, exec B → Done!",
              explanation: "Time 8: Pop (1,8) from cooldown, push 1 to heap. Pop 1, execute B. Count becomes 0. Heap and queue both empty. Return 8.",
              variables: { time: 8, heap: "[]", cooldownQ: "[]", answer: 8 },
              dataStructure: {
                heap: [],
                heapLabels: [],
                heapHighlight: null,
                cooldownQueue: [],
                schedule: ["A", "B", "idle", "A", "B", "idle", "A", "B"],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "No Cooldown",
          description: "n=0 means no idle time needed — just count the tasks",
          input: { tasks: ["A","A","A","B","B","B"], n: 0 },
          expectedOutput: "6",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 5],
              shortLabel: "Build heap",
              explanation: "Frequencies: A=3, B=3. With n=0, no cooldown at all — every slot is productive.",
              variables: { time: 0, heap: "[3, 3]", cooldownQ: "[]", n: 0 },
              dataStructure: { heap: [3, 3], heapLabels: ["A:3", "B:3"], heapHighlight: null, cooldownQueue: [], schedule: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11, 18, 20],
              shortLabel: "t=1: exec A (3→2)",
              explanation: "Pop 3 (A), exec. Cooldown until time 2 (n+1=1). Push (2, 2) to queue.",
              variables: { time: 1, heap: "[3]", cooldownQ: "[(2,2)]" },
              dataStructure: { heap: [3], heapLabels: ["B:3"], heapHighlight: null, cooldownQueue: [{ count: 2, availableAt: 2, label: "A:2@t2" }], schedule: ["A"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 14, 18, 20],
              shortLabel: "t=2: A ready, exec B (3→2)",
              explanation: "A available at t=2 — push back. Pop 3 (B), exec. Push (2,3). Now A:2 and B:2 cycling.",
              variables: { time: 2, heap: "[2]", cooldownQ: "[(2,3)]" },
              dataStructure: { heap: [2], heapLabels: ["A:2"], heapHighlight: null, cooldownQueue: [{ count: 2, availableAt: 3, label: "B:2@t3" }], schedule: ["A", "B"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11, 14, 18, 20],
              shortLabel: "t=3: exec A (2→1)",
              explanation: "B available at t=3. Pop from heap (could be A:2 or B:2). Execute, decrement.",
              variables: { time: 3, heap: "[2]", cooldownQ: "[(1,4)]" },
              dataStructure: { heap: [2], heapLabels: ["B:2"], heapHighlight: null, cooldownQueue: [{ count: 1, availableAt: 4, label: "A:1@t4" }], schedule: ["A", "B", "A"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 14, 18, 20],
              shortLabel: "t=4: exec B (2→1)",
              explanation: "Continue alternating. Execute B, decrement to 1.",
              variables: { time: 4, heap: "[1]", cooldownQ: "[(1,5)]" },
              dataStructure: { heap: [1], heapLabels: ["A:1"], heapHighlight: null, cooldownQueue: [{ count: 1, availableAt: 5, label: "B:1@t5" }], schedule: ["A", "B", "A", "B"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 14, 18],
              shortLabel: "t=5: exec A (last A)",
              explanation: "Execute last A. Count = 0, don't re-add.",
              variables: { time: 5, heap: "[]", cooldownQ: "[(1,6)]" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null, cooldownQueue: [{ count: 1, availableAt: 6, label: "B:1@t6" }], schedule: ["A", "B", "A", "B", "A"] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 14, 18],
              shortLabel: "t=6: exec B → Done!",
              explanation: "Execute last B. Everything empty. Return 6. No idle time because n=0.",
              variables: { time: 6, answer: 6 },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null, cooldownQueue: [], schedule: ["A", "B", "A", "B", "A", "B"] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ tasks, n }) {
        const steps = [];
        const freq = {};
        for (const t of tasks) freq[t] = (freq[t] || 0) + 1;

        // Build max heap as sorted array of [count, label]
        let heap = Object.entries(freq).map(([k, v]) => ({ label: k, count: v }));
        heap.sort((a, b) => b.count - a.count);
        const cooldownQ = [];
        const schedule = [];
        let time = 0;

        steps.push({
          stepId: 0, lineNumbers: [2, 5],
          shortLabel: "Build heap",
          explanation: `Frequencies: ${Object.entries(freq).map(([k, v]) => `${k}=${v}`).join(", ")}. Build max heap.`,
          variables: { time: 0, heap: `[${heap.map(h => h.count).join(",")}]`, cooldownQ: "[]" },
          dataStructure: {
            heap: heap.map(h => h.count),
            heapLabels: heap.map(h => `${h.label}:${h.count}`),
            heapHighlight: null, cooldownQueue: [], schedule: [],
          },
          delta: {}, isAnswer: false,
        });

        while (heap.length > 0 || cooldownQ.length > 0) {
          time++;

          if (cooldownQ.length > 0 && cooldownQ[0].availableAt <= time) {
            const item = cooldownQ.shift();
            heap.push(item);
            heap.sort((a, b) => b.count - a.count);
          }

          if (heap.length > 0) {
            const task = heap.shift();
            task.count--;
            schedule.push(task.label);
            if (task.count > 0) {
              cooldownQ.push({ ...task, availableAt: time + n + 1 });
            }
          } else {
            schedule.push("idle");
          }

          const isDone = heap.length === 0 && cooldownQ.length === 0;
          steps.push({
            stepId: steps.length, lineNumbers: isDone ? [11, 14, 18] : [11, 18, 20],
            shortLabel: `t=${time}: ${schedule[schedule.length - 1] === "idle" ? "Idle" : `exec ${schedule[schedule.length - 1]}`}${isDone ? " → Done!" : ""}`,
            explanation: `Time ${time}: ${schedule[schedule.length - 1] === "idle" ? "All tasks on cooldown. Idle." : `Execute ${schedule[schedule.length - 1]}.`}${isDone ? ` All done! Return ${time}.` : ""}`,
            variables: { time, heap: `[${heap.map(h => h.count).join(",")}]`, cooldownQ: `[${cooldownQ.map(q => `(${q.count},${q.availableAt})`).join(",")}]`, ...(isDone ? { answer: time } : {}) },
            dataStructure: {
              heap: heap.map(h => h.count),
              heapLabels: heap.map(h => `${h.label}:${h.count}`),
              heapHighlight: null,
              cooldownQueue: cooldownQ.map(q => ({ count: q.count, availableAt: q.availableAt, label: `${q.label}:${q.count}@t${q.availableAt}` })),
              schedule: [...schedule],
            },
            delta: {}, isAnswer: isDone,
          });
        }

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(time * 26)", space: "O(26)", explanation: "Each time step scans all 26 possible tasks" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "At most 26 distinct tasks, so heap ops are O(log 26) = O(1). Total: O(n) to count + O(n) time steps", tradeoff: "Heap gives us O(1) access to the best task instead of scanning all 26 each step" },
  },

  interviewTips: [
    "Start by explaining why the most frequent task matters — it determines minimum time.",
    "Clarify the cooldown constraint: same task needs n intervals gap, not n+1.",
    "Mention the math formula approach: answer = max(tasks.length, (maxFreq-1)*(n+1) + countOfMax).",
    "Walk through a small example showing idle slots being filled.",
    "Discuss the tradeoff between simulation (heap) and formula approaches.",
  ],

  relatedProblems: ["top-k-frequent-elements", "k-closest-points"],
};
