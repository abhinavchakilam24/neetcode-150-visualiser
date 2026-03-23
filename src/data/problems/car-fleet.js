export const carFleet = {
  id: 26,
  slug: "car-fleet",
  title: "Car Fleet",
  difficulty: "Medium",
  topic: "stack",
  topicLabel: "Stack",
  neetcodeNumber: 26,
  artifactType: "Stack",
  companies: ["Google", "Amazon", "Bloomberg", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/car-fleet/",

  pattern: "Stack to Count Merging Groups",
  patternExplanation: `Sort cars by starting position (descending — closest to target first). Compute
    each car's time to reach the target. If a car behind takes less time than the car in front,
    it merges into that fleet. Use a stack to track fleet leaders — only push when a car takes
    strictly more time than the current fleet leader.`,

  intuition: {
    coreInsight: `A car behind a slower car will catch up and merge into its fleet, never passing
      it. So we sort by position (descending) and compute each car's arrival time. If a car's
      time is less than or equal to the car ahead, it joins that fleet. If it takes MORE time,
      it forms a new fleet. The number of fleets equals the number of "time increases" when
      scanning from closest-to-target to farthest.`,

    mentalModel: `Picture a single-lane highway leading to a destination. Cars closer to the
      destination leave first. When you look at them in order of proximity, any car that would
      arrive later than the car ahead of it forms a "wall" — a new fleet. Cars behind it that
      would have arrived sooner get stuck behind this wall. Count the walls and you count the
      fleets.`,

    whyNaiveFails: `Brute force would simulate the movement tick by tick, checking which cars
      catch up to which others. This is O(n * target) at worst and extremely hard to implement
      correctly. The key insight is that we don't need simulation — just compare arrival times
      after sorting by position.`,

    keyObservation: `After sorting by position (descending), we only need to track whether each
      car's time-to-target is greater than the previous fleet leader's time. If yes, it's a new
      fleet. If no, it merges. A stack naturally tracks this: push new fleet leaders, and the
      stack size at the end is the answer.`,
  },

  problem: `There are n cars going to the same destination along a one-lane road. The destination
    is target miles away. You are given two integer arrays position and speed, both of length n,
    where position[i] is the position of the ith car and speed[i] is the speed of the ith car
    (in miles per hour). A car can never pass another car ahead of it, but it can catch up to it
    and drive bumper to bumper at the same speed. The faster car will slow down to match the slower
    car's speed. A car fleet is some non-empty set of cars driving at the same position and same
    speed. A single car is also a car fleet. If a car catches up to a car fleet right at the
    destination point, it still counts as one fleet. Return the number of car fleets that will
    arrive at the destination.`,

  examples: [
    { input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]", output: "3", explanation: "Cars at positions 10,8 form one fleet. Car at 0 is alone. Cars at 5,3 can't catch fleet ahead." },
    { input: "target = 10, position = [3], speed = [3]", output: "1", explanation: "Single car is one fleet." },
    { input: "target = 100, position = [0,2,4], speed = [4,2,1]", output: "1", explanation: "All cars catch up to the slowest car at position 4." },
  ],

  constraints: [
    "n == position.length == speed.length",
    "1 <= n <= 10^5",
    "0 < target <= 10^6",
    "0 <= position[i] < target",
    "0 < speed[i] <= 10^6",
    "All values of position are unique.",
  ],

  approaches: {
    brute: {
      label: "Sort + Linear Scan",
      tier: "brute",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: "Sort by position descending, compute time for each car, count how many times a new fleet starts (time increases).",

      javaCode: `public int carFleet(int target, int[] position, int[] speed) {
    int n = position.length;
    int[][] cars = new int[n][2];
    for (int i = 0; i < n; i++) {
        cars[i] = new int[]{position[i], speed[i]};
    }
    Arrays.sort(cars, (a, b) -> b[0] - a[0]);

    int fleets = 0;
    double lastTime = 0;
    for (int i = 0; i < n; i++) {
        double time = (double)(target - cars[i][0]) / cars[i][1];
        if (time > lastTime) {
            fleets++;
            lastTime = time;
        }
    }
    return fleets;
}`,

      cppCode: `int carFleet(int target, vector<int>& position, vector<int>& speed) {
    int n = position.size();
    vector<pair<int,int>> cars(n);
    for (int i = 0; i < n; i++) {
        cars[i] = {position[i], speed[i]};
    }
    sort(cars.begin(), cars.end(), [](auto& a, auto& b) {
        return a.first > b.first;
    });

    int fleets = 0;
    double lastTime = 0;
    for (int i = 0; i < n; i++) {
        double time = (double)(target - cars[i].first) / cars[i].second;
        if (time > lastTime) {
            fleets++;
            lastTime = time;
        }
    }
    return fleets;
}`,

      pythonCode: `def carFleet(target: int, position: List[int], speed: List[int]) -> int:
    cars = sorted(zip(position, speed), reverse=True)
    fleets = 0
    last_time = 0

    for pos, spd in cars:
        time = (target - pos) / spd
        if time > last_time:
            fleets += 1
            last_time = time

    return fleets`,

      lineAnnotations: {
        3:  "Pair each car's position with its speed",
        7:  "Sort by position descending — closest to target first",
        10: "Track the time of the current fleet leader",
        12: "Compute time for this car to reach the target",
        13: "If this car takes longer, it's a new fleet",
        14: "Increment fleet count",
        15: "Update the fleet leader's time",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 7],
              shortLabel: "Sort by position desc",
              explanation: "Pair and sort cars by position descending: [(10,2), (8,4), (5,1), (3,3), (0,1)]. The car closest to the target (position 10) comes first.",
              variables: { target: 12, fleets: 0, lastTime: 0, sorted: "[(10,2),(8,4),(5,1),(3,3),(0,1)]" },
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
              lineNumbers: [12, 13, 14, 15],
              shortLabel: "Car(10,2): t=1.0, new fleet",
              explanation: "Car at position 10, speed 2. Time = (12-10)/2 = 1.0. 1.0 > 0 (lastTime), so this is a new fleet. Fleets: 1.",
              variables: { target: 12, "pos": 10, "spd": 2, time: 1.0, lastTime: 1.0, fleets: 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [1.0],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13],
              shortLabel: "Car(8,4): t=1.0, merges",
              explanation: "Car at position 8, speed 4. Time = (12-8)/4 = 1.0. 1.0 <= 1.0 (lastTime). This car arrives at the same time or sooner — it merges into the fleet ahead. Fleets stays 1.",
              variables: { target: 12, "pos": 8, "spd": 4, time: 1.0, lastTime: 1.0, fleets: 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [1.0],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 14, 15],
              shortLabel: "Car(5,1): t=7.0, new fleet",
              explanation: "Car at position 5, speed 1. Time = (12-5)/1 = 7.0. 7.0 > 1.0 (lastTime). This car is much slower — it forms a new fleet. Fleets: 2.",
              variables: { target: 12, "pos": 5, "spd": 1, time: 7.0, lastTime: 7.0, fleets: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [1.0, 7.0],
                stackOperation: "push",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12, 13],
              shortLabel: "Car(3,3): t=3.0, merges",
              explanation: "Car at position 3, speed 3. Time = (12-3)/3 = 3.0. 3.0 <= 7.0 (lastTime). This car catches up to the fleet ahead. Merges. Fleets stays 2.",
              variables: { target: 12, "pos": 3, "spd": 3, time: 3.0, lastTime: 7.0, fleets: 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [1.0, 7.0],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12, 13, 14, 15],
              shortLabel: "Car(0,1): t=12.0, new fleet",
              explanation: "Car at position 0, speed 1. Time = (12-0)/1 = 12.0. 12.0 > 7.0 (lastTime). New fleet! Final answer: 3 fleets.",
              variables: { target: 12, "pos": 0, "spd": 1, time: 12.0, lastTime: 12.0, fleets: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "found" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: [1.0, 7.0, 12.0],
                stackOperation: "push",
              },
              delta: { changedIndices: [4] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ target, position, speed }) {
        const steps = [];
        const n = position.length;
        const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
        const stack = [];

        steps.push({
          stepId: 0,
          lineNumbers: [3, 7],
          shortLabel: "Sort by position desc",
          explanation: `Sort cars by position descending: [${cars.map(c => `(${c[0]},${c[1]})`).join(", ")}].`,
          variables: { target, fleets: 0, lastTime: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(cars.map((_, i) => [i, "default"])),
            pointers: [],
            stack: [],
          },
          delta: {},
          isAnswer: false,
        });

        let fleets = 0;
        let lastTime = 0;

        for (let i = 0; i < n; i++) {
          const time = (target - cars[i][0]) / cars[i][1];
          const merged = time <= lastTime;

          if (!merged) {
            fleets++;
            lastTime = time;
            stack.push(time);
          }

          const arrayStates = {};
          for (let j = 0; j < n; j++) {
            if (j < i) arrayStates[j] = "visited";
            else if (j === i) arrayStates[j] = merged ? "active" : (i === n - 1 ? "found" : "active");
            else arrayStates[j] = "default";
          }

          steps.push({
            stepId: steps.length,
            lineNumbers: merged ? [12, 13] : [12, 13, 14, 15],
            shortLabel: `Car(${cars[i][0]},${cars[i][1]}): t=${time.toFixed(1)}, ${merged ? "merges" : "new fleet"}`,
            explanation: merged
              ? `Car at position ${cars[i][0]}, speed ${cars[i][1]}. Time = ${time.toFixed(1)} <= ${lastTime.toFixed(1)} (lastTime). Merges into fleet ahead.`
              : `Car at position ${cars[i][0]}, speed ${cars[i][1]}. Time = ${time.toFixed(1)} > previous. New fleet! Fleets: ${fleets}.`,
            variables: { target, pos: cars[i][0], spd: cars[i][1], time: parseFloat(time.toFixed(2)), lastTime: parseFloat(lastTime.toFixed(2)), fleets },
            dataStructure: {
              arrayStates,
              pointers: [{ name: "i", index: i, color: "pointer" }],
              stack: [...stack],
              stackOperation: merged ? null : "push",
            },
            delta: { changedIndices: [i] },
            isAnswer: i === n - 1,
          });
        }

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Stack-Based Fleet Counting",
      tier: "optimal",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      idea: `Sort cars by position descending. Compute each car's time to reach the target.
        Push times onto a stack. If a car's time is <= the stack top, it merges (don't push).
        The stack size at the end equals the number of fleets.`,

      javaCode: `public int carFleet(int target, int[] position, int[] speed) {
    int n = position.length;
    int[][] cars = new int[n][2];
    for (int i = 0; i < n; i++) {
        cars[i] = new int[]{position[i], speed[i]};
    }
    Arrays.sort(cars, (a, b) -> b[0] - a[0]);

    Stack<Double> stack = new Stack<>();
    for (int i = 0; i < n; i++) {
        double time = (double)(target - cars[i][0]) / cars[i][1];
        if (stack.isEmpty() || time > stack.peek()) {
            stack.push(time);
        }
    }
    return stack.size();
}`,

      cppCode: `int carFleet(int target, vector<int>& position, vector<int>& speed) {
    int n = position.size();
    vector<pair<int,int>> cars(n);
    for (int i = 0; i < n; i++) {
        cars[i] = {position[i], speed[i]};
    }
    sort(cars.begin(), cars.end(), [](auto& a, auto& b) {
        return a.first > b.first;
    });

    stack<double> st;
    for (int i = 0; i < n; i++) {
        double time = (double)(target - cars[i].first) / cars[i].second;
        if (st.empty() || time > st.top()) {
            st.push(time);
        }
    }
    return st.size();
}`,

      pythonCode: `def carFleet(target: int, position: List[int], speed: List[int]) -> int:
    cars = sorted(zip(position, speed), reverse=True)
    stack = []

    for pos, spd in cars:
        time = (target - pos) / spd
        if not stack or time > stack[-1]:
            stack.append(time)

    return len(stack)`,

      lineAnnotations: {
        3:  "Pair position and speed for each car",
        7:  "Sort by position descending — process nearest to target first",
        9:  "Stack stores arrival times of fleet leaders",
        11: "Compute time for this car to reach the target",
        12: "If stack empty or this car is slower than the fleet ahead",
        13: "Push — this car is a new fleet leader",
        16: "Stack size = number of distinct fleets",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Mixed fleet — some cars merge, some don't",
          input: { target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 7, 9],
              shortLabel: "Sort + init stack",
              explanation: "Sort cars by position descending: [(10,2), (8,4), (5,1), (3,3), (0,1)]. Initialize empty stack to track fleet leader arrival times.",
              variables: { target: 12, stack: "[]", "stack.size": 0 },
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
              lineNumbers: [11, 12, 13],
              shortLabel: "Car(10,2): t=1.0, push",
              explanation: "Car at position 10, speed 2. Time = (12-10)/2 = 1.0. Stack is empty, so push 1.0. This car is the first fleet leader. Stack: [1.0].",
              variables: { target: 12, "pos": 10, "spd": 2, time: 1.0, stack: "[1.0]", "stack.size": 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [1.0],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "Car(8,4): t=1.0, merge",
              explanation: "Car at position 8, speed 4. Time = (12-8)/4 = 1.0. 1.0 <= stack.peek()=1.0. This car catches the fleet ahead at exactly the destination. Merges. Don't push.",
              variables: { target: 12, "pos": 8, "spd": 4, time: 1.0, "stack.peek": 1.0, stack: "[1.0]", "stack.size": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [1.0],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11, 12, 13],
              shortLabel: "Car(5,1): t=7.0, push",
              explanation: "Car at position 5, speed 1. Time = (12-5)/1 = 7.0. 7.0 > stack.peek()=1.0. This car is much slower — it can never catch the fleet ahead. New fleet! Push 7.0. Stack: [1.0, 7.0].",
              variables: { target: 12, "pos": 5, "spd": 1, time: 7.0, "stack.peek": 1.0, stack: "[1.0, 7.0]", "stack.size": 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [1.0, 7.0],
                stackOperation: "push",
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12],
              shortLabel: "Car(3,3): t=3.0, merge",
              explanation: "Car at position 3, speed 3. Time = (12-3)/3 = 3.0. 3.0 <= stack.peek()=7.0. This car would arrive sooner, so it catches the slow fleet at position 5. Merges. Don't push.",
              variables: { target: 12, "pos": 3, "spd": 3, time: 3.0, "stack.peek": 7.0, stack: "[1.0, 7.0]", "stack.size": 2 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                stack: [1.0, 7.0],
              },
              delta: { changedIndices: [3] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 12, 13],
              shortLabel: "Car(0,1): t=12.0, push",
              explanation: "Car at position 0, speed 1. Time = (12-0)/1 = 12.0. 12.0 > stack.peek()=7.0. Slowest car — new fleet. Push 12.0. Stack: [1.0, 7.0, 12.0]. Done! Stack size = 3 fleets.",
              variables: { target: 12, "pos": 0, "spd": 1, time: 12.0, "stack.peek": 7.0, stack: "[1.0, 7.0, 12.0]", "stack.size": 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "visited", 4: "found" },
                pointers: [{ name: "i", index: 4, color: "pointer" }],
                stack: [1.0, 7.0, 12.0],
                stackOperation: "push",
              },
              delta: { changedIndices: [4] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [16],
              shortLabel: "Return stack.size() = 3",
              explanation: "All cars processed. Stack has 3 entries — each entry represents a fleet leader. Answer: 3 fleets arrive at the destination.",
              variables: { answer: 3, stack: "[1.0, 7.0, 12.0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found", 4: "found" },
                pointers: [],
                stack: [1.0, 7.0, 12.0],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Merge Into One",
          description: "All cars catch up to the slowest — forms a single fleet",
          input: { target: 100, position: [0, 2, 4], speed: [4, 2, 1] },
          expectedOutput: "1",
          commonMistake: "Forgetting that a faster car behind a slower car cannot pass — it must slow down and merge.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 7, 9],
              shortLabel: "Sort + init stack",
              explanation: "Sort by position descending: [(4,1), (2,2), (0,4)]. The car at position 4 (speed 1) is closest to target but slowest.",
              variables: { target: 100, stack: "[]", "stack.size": 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                stack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11, 12, 13],
              shortLabel: "Car(4,1): t=96.0, push",
              explanation: "Car at position 4, speed 1. Time = (100-4)/1 = 96.0. Stack empty — push. This very slow car will block everything behind it. Stack: [96.0].",
              variables: { target: 100, "pos": 4, "spd": 1, time: 96.0, stack: "[96.0]", "stack.size": 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [96.0],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12],
              shortLabel: "Car(2,2): t=49.0, merge",
              explanation: "Car at position 2, speed 2. Time = (100-2)/2 = 49.0. 49.0 <= 96.0. This car would arrive much sooner, but it's stuck behind the slow car at position 4. Merges.",
              variables: { target: 100, "pos": 2, "spd": 2, time: 49.0, "stack.peek": 96.0, stack: "[96.0]", "stack.size": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [96.0],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11, 12],
              shortLabel: "Car(0,4): t=25.0, merge",
              explanation: "Car at position 0, speed 4. Time = (100-0)/4 = 25.0. 25.0 <= 96.0. Fastest car, but trapped behind the fleet. Merges. All cars form one fleet.",
              variables: { target: 100, "pos": 0, "spd": 4, time: 25.0, "stack.peek": 96.0, stack: "[96.0]", "stack.size": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [96.0],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16],
              shortLabel: "Return 1",
              explanation: "Stack size = 1. All cars merge into a single fleet behind the slowest car.",
              variables: { answer: 1, stack: "[96.0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                stack: [96.0],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "All Separate",
          description: "Each car is slower than the one ahead — no merging occurs",
          input: { target: 10, position: [6, 2, 0], speed: [1, 2, 3] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3, 7, 9],
              shortLabel: "Sort + init stack",
              explanation: "Sort by position descending: [(6,1), (2,2), (0,3)]. Each car is progressively farther and faster.",
              variables: { target: 10, stack: "[]", "stack.size": 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                stack: [],
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [11, 12, 13],
              shortLabel: "Car(6,1): t=4.0, push",
              explanation: "Position 6, speed 1. Time = (10-6)/1 = 4.0. Push. Stack: [4.0].",
              variables: { target: 10, "pos": 6, "spd": 1, time: 4.0, stack: "[4.0]", "stack.size": 1 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                stack: [4.0],
                stackOperation: "push",
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12, 13],
              shortLabel: "Car(2,2): t=4.0, merge",
              explanation: "Position 2, speed 2. Time = (10-2)/2 = 4.0. 4.0 <= 4.0 (stack top). Arrives at same time — merges. Don't push.",
              variables: { target: 10, "pos": 2, "spd": 2, time: 4.0, "stack.peek": 4.0, stack: "[4.0]", "stack.size": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                stack: [4.0],
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [11, 12, 13],
              shortLabel: "Car(0,3): t=3.33, merge",
              explanation: "Position 0, speed 3. Time = (10-0)/3 = 3.33. 3.33 <= 4.0. Merges. Stack: [4.0]. All cars form 1 fleet.",
              variables: { target: 10, "pos": 0, "spd": 3, time: 3.33, "stack.peek": 4.0, stack: "[4.0]", "stack.size": 1 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                stack: [4.0],
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [16],
              shortLabel: "Return 1",
              explanation: "Stack size = 1. Even though speeds differ, every car behind catches the first fleet by the destination. Answer: 1.",
              variables: { answer: 1, stack: "[4.0]" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                stack: [4.0],
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ target, position, speed }) {
        const steps = [];
        const n = position.length;
        const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
        const stack = [];

        steps.push({
          stepId: 0,
          lineNumbers: [3, 7, 9],
          shortLabel: "Sort + init stack",
          explanation: `Sort cars by position descending: [${cars.map(c => `(${c[0]},${c[1]})`).join(", ")}]. Initialize empty stack.`,
          variables: { target, stack: "[]", "stack.size": 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(cars.map((_, i) => [i, "default"])),
            pointers: [],
            stack: [],
          },
          delta: {},
          isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const time = (target - cars[i][0]) / cars[i][1];
          const merged = stack.length > 0 && time <= stack[stack.length - 1];

          if (!merged) {
            stack.push(time);
          }

          const arrayStates = {};
          for (let j = 0; j < n; j++) {
            if (j < i) arrayStates[j] = "visited";
            else if (j === i) arrayStates[j] = "active";
            else arrayStates[j] = "default";
          }

          steps.push({
            stepId: steps.length,
            lineNumbers: merged ? [11, 12] : [11, 12, 13],
            shortLabel: `Car(${cars[i][0]},${cars[i][1]}): t=${time.toFixed(1)}, ${merged ? "merge" : "push"}`,
            explanation: merged
              ? `Car at position ${cars[i][0]}, speed ${cars[i][1]}. Time = ${time.toFixed(1)} <= stack top. Merges into fleet ahead.`
              : `Car at position ${cars[i][0]}, speed ${cars[i][1]}. Time = ${time.toFixed(1)}. ${stack.length === 1 ? "Stack was empty — " : `${time.toFixed(1)} > stack top — `}new fleet. Push.`,
            variables: {
              target,
              pos: cars[i][0],
              spd: cars[i][1],
              time: parseFloat(time.toFixed(2)),
              stack: `[${stack.map(t => t.toFixed(1)).join(", ")}]`,
              "stack.size": stack.length,
            },
            dataStructure: {
              arrayStates,
              pointers: [{ name: "i", index: i, color: "pointer" }],
              stack: [...stack],
              stackOperation: merged ? null : "push",
            },
            delta: { changedIndices: [i] },
            isAnswer: false,
          });
        }

        // Final step
        steps.push({
          stepId: steps.length,
          lineNumbers: [16],
          shortLabel: `Return ${stack.length}`,
          explanation: `All cars processed. Stack has ${stack.length} entries — ${stack.length} fleet(s) arrive at the destination.`,
          variables: { answer: stack.length, stack: `[${stack.map(t => t.toFixed(1)).join(", ")}]` },
          dataStructure: {
            arrayStates: Object.fromEntries(cars.map((_, i) => [i, "found"])),
            pointers: [],
            stack: [...stack],
          },
          delta: {},
          isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n log n)", space: "O(n)", explanation: "Sorting dominates; linear scan after" },
    optimal: { time: "O(n log n)", space: "O(n)", explanation: "Sorting dominates; stack holds at most n elements", tradeoff: "Both approaches have the same asymptotic complexity; the stack version is cleaner and more extensible" },
  },

  interviewTips: [
    "Start by clarifying that cars cannot pass each other — this is the key constraint.",
    "Explain sorting by position descending: process cars from closest to farthest from target.",
    "The 'time to reach target' formula is (target - position) / speed — mention floating point.",
    "Emphasize: if a car behind is faster, it catches up and merges. It never creates a separate fleet.",
    "Ask: 'What if two cars arrive at exactly the same time?' They merge into one fleet.",
    "Mention that both brute and optimal are O(n log n) due to sorting — the stack doesn't change the asymptotic bound.",
  ],

  relatedProblems: ["daily-temperatures", "largest-rectangle-histogram", "valid-parentheses"],
};
