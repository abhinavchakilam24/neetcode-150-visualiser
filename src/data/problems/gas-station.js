export const gasStation = {
  id: 124,
  slug: "gas-station",
  title: "Gas Station",
  difficulty: "Medium",
  topic: "greedy",
  topicLabel: "Greedy",
  neetcodeNumber: 124,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Bloomberg", "Microsoft", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/gas-station/",

  pattern: "Greedy Single Pass with Running Surplus",
  patternExplanation: `When searching for a valid starting point in a circular problem, compute
    the net gain/loss at each station and track a running surplus. If the surplus drops below
    zero, reset the candidate start to the next station. If total gas >= total cost, a valid
    start is guaranteed to exist.`,

  intuition: {
    coreInsight: `If the total gas across all stations is at least the total cost, a solution
      must exist. The question is WHERE to start. If we begin at station s and our tank goes
      negative at station k, then no station between s and k can be a valid start either —
      because any station in that range would have LESS accumulated gas than s had at that
      point. So we skip ahead to k+1 as our new candidate.`,

    mentalModel: `Imagine you're walking along a circular path of gas stations. You carry a
      bucket (your tank). At each station you gain some gas but the road ahead costs some.
      If your bucket empties, you throw it away and start fresh at the next station with a
      new empty bucket. If your total gains across all stations outweigh total costs, then
      the last station where you picked up a fresh bucket is your answer.`,

    whyNaiveFails: `Brute force tries every station as a starting point and simulates the
      full circuit — O(n) per start × n starts = O(n²). For n=10^5, that's 10 billion
      operations. The greedy insight eliminates all impossible starts in one pass.`,

    keyObservation: `When tank goes negative at station k starting from s, we know: (1) the
      net gain from s to k is negative, and (2) any station between s and k already had a
      subset of that negative prefix. So they're all worse starting points. Skip to k+1.
      This "if you fail here, everything behind you also fails" logic is the core greedy
      insight.`,
  },

  problem: `There are n gas stations along a circular route, where the amount of gas at the
    ith station is gas[i]. You have a car with an unlimited size tank and it costs cost[i] of
    gas to travel from the ith station to its next (i + 1)th station. You begin the journey
    with an empty tank at one of the gas stations. Given two integer arrays gas and cost,
    return the starting gas station's index if you can travel around the circuit once in the
    clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed
    to be unique.`,

  examples: [
    { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3", explanation: "Start at station 3 (gas=4). Tank: 4-1=3 → 3+5-2=6 → 6+1-3=4 → 4+2-4=2 → 2+3-5=0. Complete circuit." },
    { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1", explanation: "Total gas (9) < total cost (10). Impossible to complete circuit." },
  ],

  constraints: [
    "n == gas.length == cost.length",
    "1 <= n <= 10^5",
    "0 <= gas[i], cost[i] <= 10^4",
  ],

  approaches: {
    brute: {
      label: "Brute Force — Try Every Start",
      tier: "brute",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      idea: "For each station as a starting point, simulate the full circuit. If tank never goes negative, return that station.",

      javaCode: `public int canCompleteCircuit(int[] gas, int[] cost) {
    int n = gas.length;
    for (int start = 0; start < n; start++) {
        int tank = 0;
        boolean valid = true;
        for (int j = 0; j < n; j++) {
            int idx = (start + j) % n;
            tank += gas[idx] - cost[idx];
            if (tank < 0) {
                valid = false;
                break;
            }
        }
        if (valid) return start;
    }
    return -1;
}`,

      cppCode: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int n = gas.size();
    for (int start = 0; start < n; start++) {
        int tank = 0;
        bool valid = true;
        for (int j = 0; j < n; j++) {
            int idx = (start + j) % n;
            tank += gas[idx] - cost[idx];
            if (tank < 0) {
                valid = false;
                break;
            }
        }
        if (valid) return start;
    }
    return -1;
}`,

      pythonCode: `def canCompleteCircuit(gas: List[int], cost: List[int]) -> int:
    n = len(gas)
    for start in range(n):
        tank = 0
        valid = True
        for j in range(n):
            idx = (start + j) % n
            tank += gas[idx] - cost[idx]
            if tank < 0:
                valid = False
                break
        if valid:
            return start
    return -1`,

      lineAnnotations: {
        3: "Try each station as the starting point",
        6: "Simulate the full circuit from this start",
        7: "Wrap around using modulo",
        8: "Add net gas at this station",
        9: "Tank went negative — this start fails",
        12: "Completed full circuit — return this start",
        14: "No valid start found",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [3],
              shortLabel: "Try start=0",
              explanation: "Try starting at station 0. Gas=1, cost to next=3. Net = 1-3 = -2. Tank goes negative immediately. Station 0 fails.",
              variables: { start: 0, tank: -2, "gas[0]": 1, "cost[0]": 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "start", index: 0, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [3],
              shortLabel: "Try start=1",
              explanation: "Try starting at station 1. Gas=2, cost=4. Net = -2. Fails immediately.",
              variables: { start: 1, tank: -2, "gas[1]": 2, "cost[1]": 4 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "start", index: 1, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [3],
              shortLabel: "Try start=2",
              explanation: "Try starting at station 2. Gas=3, cost=5. Net = -2. Fails immediately.",
              variables: { start: 2, tank: -2, "gas[2]": 3, "cost[2]": 5 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "default" },
                pointers: [{ name: "start", index: 2, color: "pointer" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [3, 6, 7, 8, 12],
              shortLabel: "Try start=3 → completes!",
              explanation: "Try starting at station 3. Tank: 4-1=3 → 3+5-2=6 → 6+1-3=4 → 4+2-4=2 → 2+3-5=0. Never goes negative! Return 3.",
              variables: { start: 3, tank: 0, answer: 3 },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "found", 4: "visited" },
                pointers: [{ name: "start", index: 3, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [3] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ gas, cost }) {
        const steps = [];
        const n = gas.length;

        for (let start = 0; start < n; start++) {
          let tank = 0;
          let valid = true;
          for (let j = 0; j < n; j++) {
            const idx = (start + j) % n;
            tank += gas[idx] - cost[idx];
            if (tank < 0) {
              valid = false;
              break;
            }
          }

          const states = Object.fromEntries(Array.from({ length: n }, (_, i) => [i, i < start ? "eliminated" : i === start ? (valid ? "found" : "eliminated") : "default"]));
          steps.push({
            stepId: steps.length, lineNumbers: valid ? [12] : [3],
            shortLabel: valid ? `start=${start} → works!` : `start=${start} fails`,
            explanation: valid
              ? `Starting at station ${start}, we complete the full circuit without tank going negative. Return ${start}.`
              : `Starting at station ${start}, tank goes negative. This start is invalid.`,
            variables: valid ? { start, answer: start } : { start, tank },
            dataStructure: { arrayStates: states, pointers: [{ name: "start", index: start, color: valid ? "found" : "pointer" }], hashMap: {} },
            delta: { changedIndices: [start] }, isAnswer: valid,
          });

          if (valid) return steps;
        }

        steps.push({
          stepId: steps.length, lineNumbers: [14],
          shortLabel: "No valid start",
          explanation: "No station allows completing the circuit. Return -1.",
          variables: { answer: -1 },
          dataStructure: { arrayStates: Object.fromEntries(Array.from({ length: n }, (_, i) => [i, "eliminated"])), pointers: [], hashMap: {} },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Greedy Single Pass",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Track totalSurplus and currentSurplus. If currentSurplus < 0, reset start to
        next station. If totalSurplus >= 0 at the end, start is the answer.`,

      javaCode: `public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalSurplus = 0;
    int currentSurplus = 0;
    int start = 0;

    for (int i = 0; i < gas.length; i++) {
        int net = gas[i] - cost[i];
        totalSurplus += net;
        currentSurplus += net;

        if (currentSurplus < 0) {
            start = i + 1;
            currentSurplus = 0;
        }
    }

    return totalSurplus >= 0 ? start : -1;
}`,

      cppCode: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int totalSurplus = 0;
    int currentSurplus = 0;
    int start = 0;

    for (int i = 0; i < gas.size(); i++) {
        int net = gas[i] - cost[i];
        totalSurplus += net;
        currentSurplus += net;

        if (currentSurplus < 0) {
            start = i + 1;
            currentSurplus = 0;
        }
    }

    return totalSurplus >= 0 ? start : -1;
}`,

      pythonCode: `def canCompleteCircuit(gas: List[int], cost: List[int]) -> int:
    total_surplus = 0
    current_surplus = 0
    start = 0

    for i in range(len(gas)):
        net = gas[i] - cost[i]
        total_surplus += net
        current_surplus += net

        if current_surplus < 0:
            start = i + 1
            current_surplus = 0

    return start if total_surplus >= 0 else -1`,

      lineAnnotations: {
        2: "Total net gas across ALL stations — determines feasibility",
        3: "Running surplus from current candidate start",
        4: "Current candidate starting station",
        6: "Scan each station once",
        7: "Net gas at this station: gain minus cost",
        8: "Track total for feasibility check",
        9: "Track running surplus from candidate start",
        11: "Tank went negative — current start is invalid",
        12: "Reset: next station becomes new candidate",
        13: "Fresh start — empty tank",
        16: "If total >= 0, a valid circuit exists and start is the answer",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Valid circuit starting at station 3",
          input: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] },
          expectedOutput: "3",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Initialize",
              explanation: "totalSurplus=0, currentSurplus=0, start=0. We'll scan all 5 stations in one pass.",
              variables: { totalSurplus: 0, currentSurplus: 0, start: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "start", index: 0, color: "found" }],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=0: net=1-3=-2",
              explanation: "Station 0: gas=1, cost=3. Net = -2. totalSurplus = -2, currentSurplus = -2.",
              variables: { i: 0, "gas[i]": 1, "cost[i]": 3, net: -2, totalSurplus: -2, currentSurplus: -2, start: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "start", index: 0, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [0], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12, 13],
              shortLabel: "currentSurplus<0 → reset start=1",
              explanation: "currentSurplus=-2 < 0. Starting from station 0 won't work. Reset: start=1, currentSurplus=0.",
              variables: { i: 0, totalSurplus: -2, currentSurplus: 0, start: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "default", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "start", index: 1, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=1: net=2-4=-2",
              explanation: "Station 1: gas=2, cost=4. Net = -2. totalSurplus = -4, currentSurplus = -2.",
              variables: { i: 1, "gas[i]": 2, "cost[i]": 4, net: -2, totalSurplus: -4, currentSurplus: -2, start: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "start", index: 1, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [1], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12, 13],
              shortLabel: "currentSurplus<0 → reset start=2",
              explanation: "currentSurplus=-2 < 0. Station 1 also fails. Reset: start=2, currentSurplus=0.",
              variables: { i: 1, totalSurplus: -4, currentSurplus: 0, start: 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default", 3: "default", 4: "default" },
                pointers: [{ name: "start", index: 2, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=2: net=3-5=-2",
              explanation: "Station 2: gas=3, cost=5. Net = -2. totalSurplus = -6, currentSurplus = -2.",
              variables: { i: 2, "gas[i]": 3, "cost[i]": 5, net: -2, totalSurplus: -6, currentSurplus: -2, start: 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "active", 3: "default", 4: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "start", index: 2, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [2], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [11, 12, 13],
              shortLabel: "currentSurplus<0 → reset start=3",
              explanation: "currentSurplus=-2 < 0. Station 2 also fails. Reset: start=3, currentSurplus=0.",
              variables: { i: 2, totalSurplus: -6, currentSurplus: 0, start: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "default", 4: "default" },
                pointers: [{ name: "start", index: 3, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=3: net=4-1=+3",
              explanation: "Station 3: gas=4, cost=1. Net = +3! totalSurplus = -3, currentSurplus = 3. Strong positive — promising start.",
              variables: { i: 3, "gas[i]": 4, "cost[i]": 1, net: 3, totalSurplus: -3, currentSurplus: 3, start: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "active", 4: "default" },
                pointers: [{ name: "i", index: 3, color: "pointer" }, { name: "start", index: 3, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [3], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=4: net=5-2=+3",
              explanation: "Station 4: gas=5, cost=2. Net = +3. totalSurplus = 0, currentSurplus = 6. Surplus stays positive — station 3 is viable!",
              variables: { i: 4, "gas[i]": 5, "cost[i]": 2, net: 3, totalSurplus: 0, currentSurplus: 6, start: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "visited", 4: "active" },
                pointers: [{ name: "i", index: 4, color: "pointer" }, { name: "start", index: 3, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [4], movedPointers: ["i"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [16],
              shortLabel: "totalSurplus=0 ≥ 0 → Return 3",
              explanation: "totalSurplus=0 which is >= 0, so a valid circuit exists. The candidate start=3 is our answer. Return 3.",
              variables: { totalSurplus: 0, start: 3, answer: 3 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated", 3: "found", 4: "visited" },
                pointers: [{ name: "start", index: 3, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [3] },
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Impossible",
          description: "Total gas < total cost — no valid circuit",
          input: { gas: [2, 3, 4], cost: [3, 4, 3] },
          expectedOutput: "-1",
          commonMistake: "Forgetting to check totalSurplus and returning the last candidate start, which hasn't been validated for the full circuit.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3, 4],
              shortLabel: "Initialize",
              explanation: "totalSurplus=0, currentSurplus=0, start=0.",
              variables: { totalSurplus: 0, currentSurplus: 0, start: 0 },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [{ name: "start", index: 0, color: "found" }],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=0: net=2-3=-1",
              explanation: "Station 0: net = -1. totalSurplus = -1, currentSurplus = -1.",
              variables: { i: 0, net: -1, totalSurplus: -1, currentSurplus: -1, start: 0 },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }, { name: "start", index: 0, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [11, 12, 13],
              shortLabel: "Reset start=1",
              explanation: "currentSurplus < 0. Reset start=1, currentSurplus=0.",
              variables: { totalSurplus: -1, currentSurplus: 0, start: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "default", 2: "default" },
                pointers: [{ name: "start", index: 1, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=1: net=3-4=-1",
              explanation: "Station 1: net = -1. totalSurplus = -2, currentSurplus = -1.",
              variables: { i: 1, net: -1, totalSurplus: -2, currentSurplus: -1, start: 1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "active", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }, { name: "start", index: 1, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12, 13],
              shortLabel: "Reset start=2",
              explanation: "currentSurplus < 0 again. Reset start=2, currentSurplus=0.",
              variables: { totalSurplus: -2, currentSurplus: 0, start: 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "default" },
                pointers: [{ name: "start", index: 2, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [6, 7, 8, 9],
              shortLabel: "i=2: net=4-3=+1",
              explanation: "Station 2: net = +1. totalSurplus = -1, currentSurplus = 1. Positive surplus but total is still negative.",
              variables: { i: 2, net: 1, totalSurplus: -1, currentSurplus: 1, start: 2 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "active" },
                pointers: [{ name: "i", index: 2, color: "pointer" }, { name: "start", index: 2, color: "found" }],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [16],
              shortLabel: "totalSurplus=-1 < 0 → Return -1",
              explanation: "totalSurplus = -1 which is < 0. There simply isn't enough gas to complete any circuit. Return -1.",
              variables: { totalSurplus: -1, answer: -1 },
              dataStructure: {
                arrayStates: { 0: "eliminated", 1: "eliminated", 2: "eliminated" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ gas, cost }) {
        const steps = [];
        const n = gas.length;
        let totalSurplus = 0, currentSurplus = 0, start = 0;

        steps.push({
          stepId: 0, lineNumbers: [2, 3, 4],
          shortLabel: "Initialize",
          explanation: "totalSurplus=0, currentSurplus=0, start=0.",
          variables: { totalSurplus: 0, currentSurplus: 0, start: 0 },
          dataStructure: {
            arrayStates: Object.fromEntries(Array.from({ length: n }, (_, i) => [i, "default"])),
            pointers: [{ name: "start", index: 0, color: "found" }],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < n; i++) {
          const net = gas[i] - cost[i];
          totalSurplus += net;
          currentSurplus += net;

          const states = Object.fromEntries(Array.from({ length: n }, (_, j) => [j, j < start ? "eliminated" : j === i ? "active" : j < i ? "visited" : "default"]));
          steps.push({
            stepId: steps.length, lineNumbers: [6, 7, 8, 9],
            shortLabel: `i=${i}: net=${net}`,
            explanation: `Station ${i}: gas=${gas[i]}, cost=${cost[i]}, net=${net}. totalSurplus=${totalSurplus}, currentSurplus=${currentSurplus}.`,
            variables: { i, "gas[i]": gas[i], "cost[i]": cost[i], net, totalSurplus, currentSurplus, start },
            dataStructure: {
              arrayStates: states,
              pointers: [{ name: "i", index: i, color: "pointer" }, { name: "start", index: start, color: "found" }],
              hashMap: {},
            },
            delta: { changedIndices: [i], movedPointers: ["i"] }, isAnswer: false,
          });

          if (currentSurplus < 0) {
            start = i + 1;
            currentSurplus = 0;

            const resetStates = Object.fromEntries(Array.from({ length: n }, (_, j) => [j, j <= i ? "eliminated" : "default"]));
            steps.push({
              stepId: steps.length, lineNumbers: [11, 12, 13],
              shortLabel: `Reset start=${start}`,
              explanation: `currentSurplus < 0. Everything from previous start to station ${i} is invalid. Reset: start=${start}, currentSurplus=0.`,
              variables: { totalSurplus, currentSurplus: 0, start },
              dataStructure: {
                arrayStates: resetStates,
                pointers: start < n ? [{ name: "start", index: start, color: "found" }] : [],
                hashMap: {},
              },
              delta: { changedIndices: [i] }, isAnswer: false,
            });
          }
        }

        const answer = totalSurplus >= 0 ? start : -1;
        const finalStates = Object.fromEntries(Array.from({ length: n }, (_, i) => [i, answer >= 0 && i === answer ? "found" : "eliminated"]));
        steps.push({
          stepId: steps.length, lineNumbers: [16],
          shortLabel: answer >= 0 ? `Return ${answer}` : "Return -1",
          explanation: totalSurplus >= 0
            ? `totalSurplus=${totalSurplus} >= 0. A valid circuit exists starting at station ${start}. Return ${start}.`
            : `totalSurplus=${totalSurplus} < 0. Not enough gas overall. Return -1.`,
          variables: { totalSurplus, answer },
          dataStructure: { arrayStates: finalStates, pointers: answer >= 0 ? [{ name: "start", index: answer, color: "found" }] : [], hashMap: {} },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n²)", space: "O(1)", explanation: "Try each of n starts, simulate n stations each" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass tracking running and total surplus", tradeoff: "Greedy skip eliminates redundant start attempts" },
  },

  interviewTips: [
    "Start by establishing feasibility: if sum(gas) < sum(cost), answer is always -1.",
    "Explain why skipping to i+1 is safe: all stations between old start and i had a subset of the negative prefix.",
    "Mention the problem guarantees a unique solution if one exists.",
    "Walk through the circular nature — the greedy proof relies on the total surplus determining feasibility.",
    "Common follow-up: what if the solution isn't unique? (This problem guarantees uniqueness.)",
  ],

  relatedProblems: ["jump-game", "jump-game-ii"],
};
