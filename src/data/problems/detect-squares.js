export const detectSquares = {
  id: 142,
  slug: "detect-squares",
  title: "Detect Squares",
  difficulty: "Medium",
  topic: "math-geometry",
  topicLabel: "Math & Geometry",
  neetcodeNumber: 142,
  artifactType: "Matrix",
  companies: ["Google", "Amazon", "Meta", "Apple"],
  leetcodeLink: "https://leetcode.com/problems/detect-squares/",

  pattern: "HashMap Point Counting with Diagonal Enumeration",
  patternExplanation: `Store all added points in a frequency map. For each count query with point (px, py), iterate over all points that share the same x-coordinate but have a different y-coordinate. The y-difference gives the side length. Check if the other two corners of the square exist in the map and multiply frequencies.`,

  intuition: {
    coreInsight: `A square has four corners. Given one corner (px, py), if we know the side length d, the other three corners are determined (for axis-aligned squares). We can find d by looking at all points that share the same x-coordinate as (px, py). For each such point (px, qy), the side length is |py - qy|. Then we check if (px + d, py) and (px + d, qy) — or (px - d, py) and (px - d, qy) — exist.`,

    mentalModel: `Imagine you're on a grid. Someone gives you a point and asks: "How many squares have this as a corner?" You look straight up and down from your point — every point you find gives you a potential side length. For each potential side length, you look left and right to see if the other two corners exist. If they do, that's a valid square. Count up the combinations using point frequencies.`,

    whyNaiveFails: `Brute force would check every combination of 4 points to see if they form a square — O(n^4) or at best O(n^3). By fixing one corner (the query point) and enumerating potential side lengths from points sharing the same x-coordinate, we reduce to O(n) per query where n is the number of unique points.`,

    keyObservation: `We don't just check if corners exist — we multiply their frequencies. If point A appears 3 times and point B appears 2 times, that gives 3*2 = 6 squares. Also, we must check BOTH directions (left and right of the query point) to catch all squares. Duplicates are allowed and contribute to count.`,
  },

  problem: `You are given a stream of points on the X-Y plane. Design a data structure that:
    - Adds new points from the stream (duplicates allowed)
    - Given a query point, counts the number of ways to choose three points from the data structure such that the query point and the three chosen points form an axis-aligned square with positive area.
    An axis-aligned square has all sides parallel to the x-axis and y-axis.`,

  examples: [
    {
      input: '["DetectSquares","add","add","add","count","count","add","count"]\n[[],[3,10],[11,2],[3,2],[11,10],[14,8],[11,2],[11,10]]',
      output: "[null,null,null,null,1,0,null,2]",
      explanation: "After adding (3,10),(11,2),(3,2): count(11,10) finds 1 square with corners (3,10),(11,2),(3,2),(11,10). count(14,8) finds 0. After adding another (11,2): count(11,10) finds 2 squares.",
    },
  ],

  constraints: [
    "point.length == 2",
    "0 <= x, y <= 1000",
    "At most 3000 calls in total to add and count.",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Check All Triples)",
      tier: "brute",
      timeComplexity: "O(n³) per count",
      spaceComplexity: "O(n)",
      idea: "For each count query, check all combinations of three stored points to see if they form a square with the query point.",

      javaCode: `class DetectSquares {
    List<int[]> points = new ArrayList<>();

    public void add(int[] point) {
        points.add(point);
    }

    public int count(int[] point) {
        int px = point[0], py = point[1], ans = 0;
        for (int[] p1 : points) {
            for (int[] p2 : points) {
                for (int[] p3 : points) {
                    if (isSquare(px, py, p1, p2, p3))
                        ans++;
                }
            }
        }
        return ans;
    }
}`,

      cppCode: `class DetectSquares {
    vector<pair<int,int>> points;
public:
    void add(vector<int> point) {
        points.push_back({point[0], point[1]});
    }

    int count(vector<int> point) {
        int px = point[0], py = point[1], ans = 0;
        for (auto& p1 : points)
            for (auto& p2 : points)
                for (auto& p3 : points)
                    if (isSquare(px, py, p1, p2, p3))
                        ans++;
        return ans;
    }
};`,

      pythonCode: `class DetectSquares:
    def __init__(self):
        self.points = []

    def add(self, point: List[int]) -> None:
        self.points.append(point)

    def count(self, point: List[int]) -> int:
        px, py = point
        ans = 0
        for p1 in self.points:
            for p2 in self.points:
                for p3 in self.points:
                    if self.is_square(px, py, p1, p2, p3):
                        ans += 1
        return ans`,

      lineAnnotations: {
        2: "Store all points in a list",
        4: "add(): Simply append the new point",
        8: "count(): Extract query coordinates",
        9: "Try all combinations of 3 stored points",
        13: "Check if query + 3 points form axis-aligned square",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { operations: ["add", "add", "add", "count"], args: [[3, 10], [11, 2], [3, 2], [11, 10]] },
          expectedOutput: "[null, null, null, 1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [4],
              shortLabel: "add(3,10)",
              explanation: "Add point (3,10) to our list. Points: [(3,10)].",
              variables: { points: "[(3,10)]", operation: "add(3,10)" },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4],
              shortLabel: "add(11,2)",
              explanation: "Add point (11,2). Points: [(3,10),(11,2)].",
              variables: { points: "[(3,10),(11,2)]", operation: "add(11,2)" },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4],
              shortLabel: "add(3,2)",
              explanation: "Add point (3,2). Points: [(3,10),(11,2),(3,2)].",
              variables: { points: "[(3,10),(11,2),(3,2)]", operation: "add(3,2)" },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [8, 9, 13],
              shortLabel: "count(11,10) → 1",
              explanation: "Query (11,10). Check all triples: the triple ((3,10),(11,2),(3,2)) forms a valid square with (11,10). Corners: (3,2),(3,10),(11,10),(11,2) — side length 8. Answer: 1.",
              variables: { px: 11, py: 10, answer: 1 },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations, args }) {
        const steps = [];
        const points = [];
        for (let op = 0; op < operations.length; op++) {
          if (operations[op] === "add") {
            points.push(args[op]);
            steps.push({
              stepId: steps.length, lineNumbers: [4],
              shortLabel: `add(${args[op][0]},${args[op][1]})`,
              explanation: `Add point (${args[op][0]},${args[op][1]}). Total points: ${points.length}.`,
              variables: { operation: `add(${args[op]})`, totalPoints: points.length },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {}, isAnswer: false,
            });
          } else {
            steps.push({
              stepId: steps.length, lineNumbers: [8, 9, 13],
              shortLabel: `count(${args[op][0]},${args[op][1]})`,
              explanation: `Query (${args[op][0]},${args[op][1]}). Check all triples of stored points for axis-aligned squares.`,
              variables: { px: args[op][0], py: args[op][1], totalPoints: points.length },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {}, isAnswer: op === operations.length - 1,
            });
          }
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "HashMap Diagonal Enumeration",
      tier: "optimal",
      timeComplexity: "O(n) per count",
      spaceComplexity: "O(n)",
      idea: `Store points with frequencies in a map keyed by x-coordinate. For count(px, py), iterate over all points (px, qy) sharing the same x. Side length d = |py - qy|. Check if (px+d, py), (px+d, qy) exist (and symmetrically px-d). Multiply frequencies.`,

      javaCode: `class DetectSquares {
    Map<Integer, Map<Integer, Integer>> xMap = new HashMap<>();
    List<int[]> points = new ArrayList<>();

    public void add(int[] point) {
        int x = point[0], y = point[1];
        xMap.computeIfAbsent(x, k -> new HashMap<>())
            .merge(y, 1, Integer::sum);
        points.add(point);
    }

    public int count(int[] point) {
        int px = point[0], py = point[1], ans = 0;
        for (int[] p : points) {
            int qx = p[0], qy = p[1];
            if (qx == px || Math.abs(qy - py) != Math.abs(qx - px))
                continue;
            int d = Math.abs(qx - px);
            ans += getCount(px, qy) * getCount(qx, py);
        }
        return ans;
    }

    private int getCount(int x, int y) {
        return xMap.getOrDefault(x, Collections.emptyMap())
                   .getOrDefault(y, 0);
    }
}`,

      cppCode: `class DetectSquares {
    unordered_map<int, unordered_map<int, int>> xMap;
    vector<pair<int,int>> points;
public:
    void add(vector<int> point) {
        xMap[point[0]][point[1]]++;
        points.push_back({point[0], point[1]});
    }

    int count(vector<int> point) {
        int px = point[0], py = point[1], ans = 0;
        for (auto& [qx, qy] : points) {
            if (qx == px || abs(qy - py) != abs(qx - px))
                continue;
            ans += xMap[px][qy] * xMap[qx][py];
        }
        return ans;
    }
};`,

      pythonCode: `class DetectSquares:
    def __init__(self):
        self.points = []
        self.point_count = defaultdict(int)

    def add(self, point: List[int]) -> None:
        self.points.append(point)
        self.point_count[tuple(point)] += 1

    def count(self, point: List[int]) -> int:
        px, py = point
        ans = 0
        for qx, qy in self.points:
            if qx == px or abs(qy - py) != abs(qx - px):
                continue
            ans += (self.point_count[(px, qy)] *
                    self.point_count[(qx, py)])
        return ans`,

      lineAnnotations: {
        2: "Map x-coordinate → {y-coordinate → frequency}",
        3: "Also keep a list of all points for iteration",
        6: "Store point with frequency count",
        13: "For each stored point, check if it could be a diagonal corner",
        16: "Skip if same x (no square) or not forming a square side",
        18: "Multiply frequencies of the two missing corners",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Build a square from 4 points then query",
          input: { operations: ["add", "add", "add", "count"], args: [[3, 10], [11, 2], [3, 2], [11, 10]] },
          expectedOutput: "[null, null, null, 1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "add(3,10)",
              explanation: "Add (3,10). Store in xMap: {3: {10: 1}}. Points list: [(3,10)].",
              variables: { operation: "add(3,10)", xMap: "{3:{10:1}}", pointsList: "[(3,10)]" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1, isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "add(11,2)",
              explanation: "Add (11,2). xMap: {3:{10:1}, 11:{2:1}}. Points: [(3,10),(11,2)].",
              variables: { operation: "add(11,2)", xMap: "{3:{10:1},11:{2:1}}" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1 }, "11,2": { value: 1, isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "add(3,2)",
              explanation: "Add (3,2). xMap: {3:{10:1,2:1}, 11:{2:1}}. Points: [(3,10),(11,2),(3,2)].",
              variables: { operation: "add(3,2)", xMap: "{3:{10:1,2:1},11:{2:1}}" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1 }, "11,2": { value: 1 }, "3,2": { value: 1, isNew: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 13, 14],
              shortLabel: "count(11,10): iterate points",
              explanation: "Query (11,10). We iterate over all stored points looking for diagonal corners. A diagonal corner (qx,qy) must satisfy |qx-px| == |qy-py| and qx != px.",
              variables: { px: 11, py: 10, ans: 0 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1 }, "11,2": { value: 1 }, "3,2": { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [14, 15, 16],
              shortLabel: "Check (3,10): |3-11|=8, |10-10|=0, skip",
              explanation: "Point (3,10): |qx-px| = |3-11| = 8, |qy-py| = |10-10| = 0. These aren't equal, so (3,10) can't be a diagonal corner. Skip.",
              variables: { qx: 3, qy: 10, "|qx-px|": 8, "|qy-py|": 0, skip: true },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1, isHighlighted: true }, "11,2": { value: 1 }, "3,2": { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14, 15, 16],
              shortLabel: "Check (11,2): qx==px, skip",
              explanation: "Point (11,2): qx=11 == px=11. Same x-coordinate means no square (zero width). Skip.",
              variables: { qx: 11, qy: 2, skip: "same x" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1 }, "11,2": { value: 1, isHighlighted: true }, "3,2": { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14, 15, 16, 18],
              shortLabel: "Check (3,2): diagonal! d=8",
              explanation: "Point (3,2): |3-11|=8, |2-10|=8. Equal! (3,2) is a valid diagonal corner. Side length = 8. Missing corners: (11,2) and (3,10). freq(11,2)=1, freq(3,10)=1. ans += 1*1 = 1.",
              variables: { qx: 3, qy: 2, d: 8, "freq(px,qy)": 1, "freq(qx,py)": 1, ans: 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1, isHighlighted: true }, "11,2": { value: 1, isHighlighted: true }, "3,2": { value: 1, isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [20],
              shortLabel: "Return 1",
              explanation: "No more points to check. Return ans = 1. There is exactly 1 square with (11,10) as a corner.",
              variables: { ans: 1, answer: "1" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1 }, "11,2": { value: 1 }, "3,2": { value: 1 } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Duplicate Points",
          description: "Duplicates increase the count multiplicatively",
          input: { operations: ["add", "add", "add", "add", "count"], args: [[3, 10], [11, 2], [3, 2], [11, 2], [11, 10]] },
          expectedOutput: "[null, null, null, null, 2]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "add(3,10), add(11,2), add(3,2)",
              explanation: "Add three points: (3,10), (11,2), (3,2). xMap: {3:{10:1,2:1}, 11:{2:1}}.",
              variables: { xMap: "{3:{10:1,2:1},11:{2:1}}" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1 }, "11,2": { value: 1 }, "3,2": { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: "add(11,2) again → freq=2",
              explanation: "Add (11,2) a second time. Now xMap[11][2] = 2. Duplicates are allowed and will multiply the count.",
              variables: { xMap: "{3:{10:1,2:1},11:{2:2}}" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1 }, "11,2": { value: 2, isHighlighted: true }, "3,2": { value: 1 } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12, 13, 14, 15, 16, 18],
              shortLabel: "count(11,10): check diagonal (3,2)",
              explanation: "Query (11,10). The diagonal corner is (3,2): d=8. Missing corners: (11,2) freq=2, (3,10) freq=1. This point (3,2) appears once in the list, contributing 2*1 = 2.",
              variables: { px: 11, py: 10, qx: 3, qy: 2, "freq(11,2)": 2, "freq(3,10)": 1 },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1, isHighlighted: true }, "11,2": { value: 2, isHighlighted: true }, "3,2": { value: 1, isHighlighted: true } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [20],
              shortLabel: "Return 2",
              explanation: "With (11,2) appearing twice, there are 2 distinct squares. The duplicate point lets us form 2 squares with the same geometry but different point selections.",
              variables: { ans: 2, answer: "2" },
              dataStructure: {
                arrayStates: {},
                pointers: [],
                hashMap: { "3,10": { value: 1 }, "11,2": { value: 2 }, "3,2": { value: 1 } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations, args }) {
        const steps = [];
        const pointCount = {};
        const points = [];

        const key = (x, y) => `${x},${y}`;
        const getCount = (x, y) => pointCount[key(x, y)] || 0;

        for (let op = 0; op < operations.length; op++) {
          if (operations[op] === "add") {
            const [x, y] = args[op];
            pointCount[key(x, y)] = (pointCount[key(x, y)] || 0) + 1;
            points.push([x, y]);
            const hashMap = {};
            for (const k of Object.keys(pointCount)) {
              hashMap[k] = { value: pointCount[k], isNew: k === key(x, y) };
            }
            steps.push({
              stepId: steps.length, lineNumbers: [5, 6, 7, 8, 9],
              shortLabel: `add(${x},${y})`,
              explanation: `Add (${x},${y}). Frequency of (${x},${y}) is now ${pointCount[key(x, y)]}.`,
              variables: { operation: `add(${x},${y})`, freq: pointCount[key(x, y)] },
              dataStructure: { arrayStates: {}, pointers: [], hashMap },
              delta: {}, isAnswer: false,
            });
          } else {
            const [px, py] = args[op];
            let ans = 0;
            for (const [qx, qy] of points) {
              if (qx === px || Math.abs(qy - py) !== Math.abs(qx - px)) continue;
              ans += getCount(px, qy) * getCount(qx, py);
            }
            steps.push({
              stepId: steps.length, lineNumbers: [12, 13, 14, 18, 20],
              shortLabel: `count(${px},${py}) → ${ans}`,
              explanation: `Query (${px},${py}). Enumerate diagonal corners from stored points. Found ${ans} valid square(s).`,
              variables: { px, py, ans, answer: String(ans) },
              dataStructure: { arrayStates: {}, pointers: [] },
              delta: {}, isAnswer: op === operations.length - 1,
            });
          }
        }
        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n³) per count", space: "O(n)", explanation: "Check all triples against the query point" },
    optimal: { time: "O(n) per count, O(1) per add", space: "O(n)", explanation: "One pass over stored points; HashMap lookups are O(1)", tradeoff: "O(n) space for the point frequency map enables O(n) count queries" },
  },

  interviewTips: [
    "Clarify what 'axis-aligned' means — sides parallel to x and y axes.",
    "Ask about duplicate points — they are allowed and multiply the count.",
    "Explain why you enumerate diagonal corners rather than same-row/column points.",
    "Mention that iterating stored points and checking 2 corners is O(n) per query.",
    "Be careful: check both left and right directions for the missing corners.",
  ],

  relatedProblems: ["valid-sudoku", "set-matrix-zeroes"],
};
