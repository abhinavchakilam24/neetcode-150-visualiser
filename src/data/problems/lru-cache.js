export const lruCache = {
  id: 43,
  slug: "lru-cache",
  title: "LRU Cache",
  difficulty: "Medium",
  topic: "linked-list",
  topicLabel: "Linked List",
  neetcodeNumber: 43,
  artifactType: "LinkedList",
  companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Netflix"],
  leetcodeLink: "https://leetcode.com/problems/lru-cache/",

  pattern: "HashMap + Doubly Linked List",
  patternExplanation: `Combine a HashMap for O(1) key lookup with a doubly linked list for O(1)
    insertion, removal, and reordering. The list maintains access order — most recently used at
    head, least recently used at tail.`,

  intuition: {
    coreInsight: `We need two operations in O(1): lookup by key (HashMap) and eviction of the
      least recently used item (linked list). Neither alone suffices — a HashMap can't track
      ordering, and a list can't do O(1) lookup. Combining them gives us both: the map points
      to list nodes, and the list tracks recency order.`,

    mentalModel: `Imagine a restaurant with limited seating. A hostess (HashMap) keeps a directory
      of who's seated where for instant lookup. The seating chart (doubly linked list) has the
      most recent diner at the front. When someone arrives and it's full, the person at the back
      (least recently served) gets removed. When an existing diner orders again, they get moved
      to the front.`,

    whyNaiveFails: `Using just a HashMap gives O(1) get/put but no way to know which key is
      least recently used without scanning all entries — O(n). Using just a list gives O(1)
      removal of LRU but O(n) lookup. We need both data structures working together.`,

    keyObservation: `The doubly linked list with dummy head and tail nodes eliminates all edge
      cases in node removal and insertion. Every real node has both a prev and next pointer,
      so removal is always the same three-line operation regardless of position.`,
  },

  problem: `Design a data structure that follows the constraints of a Least Recently Used (LRU)
    cache. Implement the LRUCache class: LRUCache(int capacity) initializes the cache with
    positive size capacity. int get(int key) returns the value if the key exists, otherwise -1.
    void put(int key, int value) updates or inserts the value. If the cache exceeds capacity,
    evict the least recently used key.`,

  examples: [
    {
      input: `["LRUCache","put","put","get","put","get","put","get","get","get"]
[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]`,
      output: "[null,null,null,1,null,-1,null,-1,3,4]",
      explanation: "Cache capacity=2. put(1,1), put(2,2), get(1)→1, put(3,3) evicts key 2, get(2)→-1, etc."
    },
  ],

  constraints: [
    "1 <= capacity <= 3000",
    "0 <= key <= 10^4",
    "0 <= value <= 10^5",
    "At most 2 * 10^5 calls to get and put",
  ],

  approaches: {
    brute: {
      label: "Brute Force (Array + Timestamp)",
      tier: "brute",
      timeComplexity: "O(n) per operation",
      spaceComplexity: "O(capacity)",
      idea: "Use a list/array with timestamps. On get, scan for key. On put, scan for LRU to evict.",

      javaCode: `class LRUCache {
    int capacity;
    List<int[]> cache; // [key, value, timestamp]
    int time;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new ArrayList<>();
        this.time = 0;
    }

    public int get(int key) {
        for (int[] entry : cache) {
            if (entry[0] == key) {
                entry[2] = ++time;
                return entry[1];
            }
        }
        return -1;
    }

    public void put(int key, int value) {
        for (int[] entry : cache) {
            if (entry[0] == key) {
                entry[1] = value;
                entry[2] = ++time;
                return;
            }
        }
        if (cache.size() == capacity) {
            int minIdx = 0;
            for (int i = 1; i < cache.size(); i++)
                if (cache.get(i)[2] < cache.get(minIdx)[2]) minIdx = i;
            cache.remove(minIdx);
        }
        cache.add(new int[]{key, value, ++time});
    }
}`,

      cppCode: `class LRUCache {
    int capacity, time = 0;
    vector<tuple<int,int,int>> cache; // key, value, timestamp

public:
    LRUCache(int capacity) : capacity(capacity) {}

    int get(int key) {
        for (auto& [k, v, t] : cache) {
            if (k == key) { t = ++time; return v; }
        }
        return -1;
    }

    void put(int key, int value) {
        for (auto& [k, v, t] : cache) {
            if (k == key) { v = value; t = ++time; return; }
        }
        if (cache.size() == capacity) {
            auto it = min_element(cache.begin(), cache.end(),
                [](auto& a, auto& b){ return get<2>(a) < get<2>(b); });
            cache.erase(it);
        }
        cache.push_back({key, value, ++time});
    }
};`,

      pythonCode: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = []  # [(key, value, timestamp)]
        self.time = 0

    def get(self, key: int) -> int:
        for entry in self.cache:
            if entry[0] == key:
                self.time += 1
                entry[2] = self.time
                return entry[1]
        return -1

    def put(self, key: int, value: int) -> None:
        for entry in self.cache:
            if entry[0] == key:
                entry[1] = value
                self.time += 1
                entry[2] = self.time
                return
        if len(self.cache) == self.capacity:
            min_idx = min(range(len(self.cache)),
                         key=lambda i: self.cache[i][2])
            self.cache.pop(min_idx)
        self.time += 1
        self.cache.append([key, value, self.time])`,

      lineAnnotations: {
        6: "Initialize cache with given capacity",
        12: "Linear scan to find key — O(n)",
        14: "Update timestamp on access",
        22: "Linear scan to check if key exists",
        29: "Find minimum timestamp entry — O(n)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { operations: ["LRUCache","put","put","get","put","get"], args: [[2],[1,1],[2,2],[1],[3,3],[2]] },
          expectedOutput: "[null,null,null,1,null,-1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [6],
              shortLabel: "Init capacity=2",
              explanation: "Create LRU cache with capacity 2. Empty cache.",
              variables: { capacity: 2, cache: "[]" },
              dataStructure: { nodes: [], pointerAssignments: {} },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [32],
              shortLabel: "put(1,1)",
              explanation: "Insert key=1, value=1. Cache: [(1,1)].",
              variables: { cache: "[(1,1)]", size: 1 },
              dataStructure: {
                nodes: [{ id: 0, val: "1:1", next: null, state: "active" }],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [32],
              shortLabel: "put(2,2)",
              explanation: "Insert key=2, value=2. Cache: [(1,1),(2,2)]. Full.",
              variables: { cache: "[(1,1),(2,2)]", size: 2 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "1:1", next: 1, state: "default" },
                  { id: 1, val: "2:2", next: null, state: "active" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12, 14, 15],
              shortLabel: "get(1) → 1",
              explanation: "Scan cache for key=1. Found! Return 1. Update timestamp — key 1 is now most recent.",
              variables: { key: 1, result: 1 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "1:1", next: 1, state: "found" },
                  { id: 1, val: "2:2", next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [28, 29, 30, 32],
              shortLabel: "put(3,3) → evict key=2",
              explanation: "Cache full. Key=2 has lowest timestamp (LRU). Evict it. Insert (3,3). Cache: [(1,1),(3,3)].",
              variables: { evicted: "key=2", cache: "[(1,1),(3,3)]" },
              dataStructure: {
                nodes: [
                  { id: 0, val: "1:1", next: 1, state: "default" },
                  { id: 1, val: "3:3", next: null, state: "active" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12, 18],
              shortLabel: "get(2) → -1",
              explanation: "Scan cache for key=2. Not found — it was evicted. Return -1.",
              variables: { key: 2, result: -1 },
              dataStructure: {
                nodes: [
                  { id: 0, val: "1:1", next: 1, state: "visited" },
                  { id: 1, val: "3:3", next: null, state: "visited" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations, args }) {
        const steps = [];
        const cache = new Map();
        let capacity = 0;

        for (let k = 0; k < operations.length; k++) {
          const op = operations[k];
          const a = args[k];

          if (op === "LRUCache") {
            capacity = a[0];
            steps.push({
              stepId: steps.length, lineNumbers: [6],
              shortLabel: `Init capacity=${capacity}`,
              explanation: `Create LRU cache with capacity ${capacity}.`,
              variables: { capacity, size: 0 },
              dataStructure: { nodes: [], pointerAssignments: {} },
              delta: {}, isAnswer: false,
            });
          } else if (op === "get") {
            const val = cache.has(a[0]) ? cache.get(a[0]) : -1;
            if (val !== -1) {
              cache.delete(a[0]);
              cache.set(a[0], val);
            }
            steps.push({
              stepId: steps.length, lineNumbers: [12],
              shortLabel: `get(${a[0]}) → ${val}`,
              explanation: `Look up key=${a[0]}. ${val === -1 ? "Not found." : `Found value=${val}.`}`,
              variables: { key: a[0], result: val },
              dataStructure: { nodes: [...cache.entries()].map(([key, v], i) => ({ id: i, val: `${key}:${v}`, next: i < cache.size - 1 ? i + 1 : null, state: key === a[0] ? "found" : "default" })), pointerAssignments: {} },
              delta: {}, isAnswer: false,
            });
          } else if (op === "put") {
            if (cache.has(a[0])) cache.delete(a[0]);
            cache.set(a[0], a[1]);
            if (cache.size > capacity) {
              const lruKey = cache.keys().next().value;
              cache.delete(lruKey);
            }
            steps.push({
              stepId: steps.length, lineNumbers: [22],
              shortLabel: `put(${a[0]},${a[1]})`,
              explanation: `Insert key=${a[0]}, value=${a[1]}. Cache size=${cache.size}.`,
              variables: { key: a[0], value: a[1], size: cache.size },
              dataStructure: { nodes: [...cache.entries()].map(([key, v], i) => ({ id: i, val: `${key}:${v}`, next: i < cache.size - 1 ? i + 1 : null, state: key === a[0] ? "active" : "default" })), pointerAssignments: {} },
              delta: {}, isAnswer: false,
            });
          }
        }

        if (steps.length > 0) steps[steps.length - 1].isAnswer = true;
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "HashMap + Doubly Linked List",
      tier: "optimal",
      timeComplexity: "O(1) per operation",
      spaceComplexity: "O(capacity)",
      idea: `HashMap maps key → node in a doubly linked list. On get: move node to head.
        On put: add to head, evict tail if over capacity. All operations are O(1).`,

      javaCode: `class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    Map<Integer, Node> map = new HashMap<>();
    Node head = new Node(0, 0), tail = new Node(0, 0);
    int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insertHead(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        Node node = new Node(key, value);
        map.put(key, node);
        insertHead(node);
        if (map.size() > capacity) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }

    void remove(Node n) {
        n.prev.next = n.next;
        n.next.prev = n.prev;
    }

    void insertHead(Node n) {
        n.next = head.next;
        n.prev = head;
        head.next.prev = n;
        head.next = n;
    }
}`,

      cppCode: `class LRUCache {
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };

    unordered_map<int, Node*> map;
    Node *head, *tail;
    int capacity;

    void remove(Node* n) {
        n->prev->next = n->next;
        n->next->prev = n->prev;
    }

    void insertHead(Node* n) {
        n->next = head->next;
        n->prev = head;
        head->next->prev = n;
        head->next = n;
    }

public:
    LRUCache(int capacity) : capacity(capacity) {
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (!map.count(key)) return -1;
        Node* node = map[key];
        remove(node);
        insertHead(node);
        return node->val;
    }

    void put(int key, int value) {
        if (map.count(key)) { remove(map[key]); delete map[key]; }
        Node* node = new Node(key, value);
        map[key] = node;
        insertHead(node);
        if (map.size() > capacity) {
            Node* lru = tail->prev;
            remove(lru);
            map.erase(lru->key);
            delete lru;
        }
    }
};`,

      pythonCode: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.map = {}
        self.head, self.tail = Node(), Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.map:
            return -1
        node = self.map[key]
        self._remove(node)
        self._insert_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            self._remove(self.map[key])
        node = Node(key, value)
        self.map[key] = node
        self._insert_head(node)
        if len(self.map) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.map[lru.key]`,

      lineAnnotations: {
        8: "HashMap for O(1) key → node lookup",
        9: "Dummy head and tail simplify edge cases",
        13: "Connect dummy head → dummy tail",
        18: "O(1) lookup via HashMap",
        20: "Move accessed node to head (most recent)",
        26: "If key exists, remove old node first",
        29: "Insert new node at head",
        30: "If over capacity, evict from tail",
        36: "Unlink node from its neighbors — O(1)",
        40: "Link node right after dummy head — O(1)",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Sequence of puts and gets with eviction",
          input: { operations: ["LRUCache","put","put","get","put","get","put","get","get","get"], args: [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]] },
          expectedOutput: "[null,null,null,1,null,-1,null,-1,3,4]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [11, 13],
              shortLabel: "Init capacity=2",
              explanation: "Create LRU cache with capacity=2. Initialize dummy head↔tail linked list.",
              variables: { capacity: 2, size: 0 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "tail", state: "default" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: { head: "head", tail: "tail" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [27, 28, 29],
              shortLabel: "put(1,1)",
              explanation: "Insert node (1,1) at head. List: HEAD ↔ (1,1) ↔ TAIL. Map: {1→node}.",
              variables: { key: 1, value: 1, size: 1 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "1", state: "default" },
                  { id: "1", val: "1:1", next: "tail", state: "active" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: { head: "head", tail: "tail", MRU: "1" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [27, 28, 29],
              shortLabel: "put(2,2)",
              explanation: "Insert node (2,2) at head. List: HEAD ↔ (2,2) ↔ (1,1) ↔ TAIL. Now at capacity.",
              variables: { key: 2, value: 2, size: 2 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "2", state: "default" },
                  { id: "2", val: "2:2", next: "1", state: "active" },
                  { id: "1", val: "1:1", next: "tail", state: "default" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: { head: "head", tail: "tail", MRU: "2", LRU: "1" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [18, 19, 20, 21, 22],
              shortLabel: "get(1) → 1",
              explanation: "Key 1 found. Remove (1,1) from its position and move to head. List: HEAD ↔ (1,1) ↔ (2,2) ↔ TAIL. Now key 2 is LRU.",
              variables: { key: 1, result: 1 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "1", state: "default" },
                  { id: "1", val: "1:1", next: "2", state: "found" },
                  { id: "2", val: "2:2", next: "tail", state: "default" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: { head: "head", tail: "tail", MRU: "1", LRU: "2" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [27, 28, 29, 30, 31, 32, 33],
              shortLabel: "put(3,3) — evict key=2",
              explanation: "Insert (3,3) at head. Over capacity! Evict LRU = key 2 (tail.prev). List: HEAD ↔ (3,3) ↔ (1,1) ↔ TAIL.",
              variables: { key: 3, value: 3, evicted: 2, size: 2 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "3", state: "default" },
                  { id: "3", val: "3:3", next: "1", state: "active" },
                  { id: "1", val: "1:1", next: "tail", state: "default" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: { head: "head", tail: "tail", MRU: "3", LRU: "1" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [18],
              shortLabel: "get(2) → -1",
              explanation: "Key 2 was evicted. Not in map. Return -1.",
              variables: { key: 2, result: -1 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "3", state: "default" },
                  { id: "3", val: "3:3", next: "1", state: "default" },
                  { id: "1", val: "1:1", next: "tail", state: "default" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: { head: "head", tail: "tail" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [27, 28, 29, 30, 31, 32, 33],
              shortLabel: "put(4,4) — evict key=1",
              explanation: "Insert (4,4) at head. Over capacity! Evict LRU = key 1. List: HEAD ↔ (4,4) ↔ (3,3) ↔ TAIL.",
              variables: { key: 4, value: 4, evicted: 1, size: 2 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "4", state: "default" },
                  { id: "4", val: "4:4", next: "3", state: "active" },
                  { id: "3", val: "3:3", next: "tail", state: "default" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: { head: "head", tail: "tail", MRU: "4", LRU: "3" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [18],
              shortLabel: "get(1) → -1",
              explanation: "Key 1 was evicted. Return -1.",
              variables: { key: 1, result: -1 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "4", state: "default" },
                  { id: "4", val: "4:4", next: "3", state: "default" },
                  { id: "3", val: "3:3", next: "tail", state: "default" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [18, 19, 20, 21, 22],
              shortLabel: "get(3) → 3",
              explanation: "Key 3 found. Move to head. List: HEAD ↔ (3,3) ↔ (4,4) ↔ TAIL. Return 3.",
              variables: { key: 3, result: 3 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "3", state: "default" },
                  { id: "3", val: "3:3", next: "4", state: "found" },
                  { id: "4", val: "4:4", next: "tail", state: "default" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: { head: "head", tail: "tail", MRU: "3", LRU: "4" },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [18, 19, 20, 21, 22],
              shortLabel: "get(4) → 4",
              explanation: "Key 4 found. Move to head. List: HEAD ↔ (4,4) ↔ (3,3) ↔ TAIL. Return 4.",
              variables: { key: 4, result: 4 },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: "4", state: "default" },
                  { id: "4", val: "4:4", next: "3", state: "found" },
                  { id: "3", val: "3:3", next: "tail", state: "default" },
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: { head: "head", tail: "tail", MRU: "4", LRU: "3" },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Capacity 1",
          description: "Single capacity — every put evicts the previous entry",
          input: { operations: ["LRUCache","put","put","get","put","get"], args: [[1],[1,10],[2,20],[1],[3,30],[2]] },
          expectedOutput: "[null,null,null,-1,null,-1]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [11, 13],
              shortLabel: "Init capacity=1",
              explanation: "Cache can hold only 1 entry.",
              variables: { capacity: 1 },
              dataStructure: { nodes: [{ id: "head", val: "HEAD", next: "tail", state: "default" }, { id: "tail", val: "TAIL", next: null, state: "default" }], pointerAssignments: {} },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [27, 28, 29],
              shortLabel: "put(1,10)",
              explanation: "Insert (1,10). List: HEAD ↔ (1,10) ↔ TAIL.",
              variables: { key: 1, value: 10, size: 1 },
              dataStructure: { nodes: [{ id: "head", val: "HEAD", next: "1", state: "default" }, { id: "1", val: "1:10", next: "tail", state: "active" }, { id: "tail", val: "TAIL", next: null, state: "default" }], pointerAssignments: {} },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [27, 28, 29, 30, 31, 32, 33],
              shortLabel: "put(2,20) — evict key=1",
              explanation: "Insert (2,20). Over capacity! Evict key=1. List: HEAD ↔ (2,20) ↔ TAIL.",
              variables: { key: 2, value: 20, evicted: 1, size: 1 },
              dataStructure: { nodes: [{ id: "head", val: "HEAD", next: "2", state: "default" }, { id: "2", val: "2:20", next: "tail", state: "active" }, { id: "tail", val: "TAIL", next: null, state: "default" }], pointerAssignments: {} },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [18],
              shortLabel: "get(1) → -1",
              explanation: "Key 1 was evicted. Return -1.",
              variables: { key: 1, result: -1 },
              dataStructure: { nodes: [{ id: "head", val: "HEAD", next: "2", state: "default" }, { id: "2", val: "2:20", next: "tail", state: "default" }, { id: "tail", val: "TAIL", next: null, state: "default" }], pointerAssignments: {} },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [27, 28, 29, 30, 31, 32, 33],
              shortLabel: "put(3,30) — evict key=2",
              explanation: "Insert (3,30). Evict key=2. List: HEAD ↔ (3,30) ↔ TAIL.",
              variables: { key: 3, value: 30, evicted: 2, size: 1 },
              dataStructure: { nodes: [{ id: "head", val: "HEAD", next: "3", state: "default" }, { id: "3", val: "3:30", next: "tail", state: "active" }, { id: "tail", val: "TAIL", next: null, state: "default" }], pointerAssignments: {} },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [18],
              shortLabel: "get(2) → -1",
              explanation: "Key 2 was evicted. Return -1.",
              variables: { key: 2, result: -1 },
              dataStructure: { nodes: [{ id: "head", val: "HEAD", next: "3", state: "default" }, { id: "3", val: "3:30", next: "tail", state: "default" }, { id: "tail", val: "TAIL", next: null, state: "default" }], pointerAssignments: {} },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations, args }) {
        const steps = [];
        const cache = new Map();
        let capacity = 0;

        for (let k = 0; k < operations.length; k++) {
          const op = operations[k];
          const a = args[k];

          if (op === "LRUCache") {
            capacity = a[0];
            steps.push({
              stepId: steps.length, lineNumbers: [11, 13],
              shortLabel: `Init capacity=${capacity}`,
              explanation: `Create LRU cache with capacity ${capacity}.`,
              variables: { capacity },
              dataStructure: { nodes: [{ id: "head", val: "HEAD", next: "tail", state: "default" }, { id: "tail", val: "TAIL", next: null, state: "default" }], pointerAssignments: {} },
              delta: {}, isAnswer: false,
            });
          } else if (op === "get") {
            const val = cache.has(a[0]) ? cache.get(a[0]) : -1;
            if (val !== -1) { cache.delete(a[0]); cache.set(a[0], val); }
            const entries = [...cache.entries()].reverse();
            steps.push({
              stepId: steps.length, lineNumbers: val === -1 ? [18] : [18, 19, 20, 21, 22],
              shortLabel: `get(${a[0]}) → ${val}`,
              explanation: `${val === -1 ? `Key ${a[0]} not found.` : `Key ${a[0]} found, value=${val}. Moved to head.`}`,
              variables: { key: a[0], result: val },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: entries.length > 0 ? String(entries[0][0]) : "tail", state: "default" },
                  ...entries.map(([key, v], i) => ({ id: String(key), val: `${key}:${v}`, next: i < entries.length - 1 ? String(entries[i + 1][0]) : "tail", state: key === a[0] ? "found" : "default" })),
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: {}, isAnswer: false,
            });
          } else if (op === "put") {
            if (cache.has(a[0])) cache.delete(a[0]);
            cache.set(a[0], a[1]);
            let evicted = null;
            if (cache.size > capacity) {
              evicted = cache.keys().next().value;
              cache.delete(evicted);
            }
            const entries = [...cache.entries()].reverse();
            steps.push({
              stepId: steps.length, lineNumbers: [27, 28, 29],
              shortLabel: `put(${a[0]},${a[1]})${evicted !== null ? ` evict ${evicted}` : ""}`,
              explanation: `Insert (${a[0]},${a[1]}).${evicted !== null ? ` Evicted key=${evicted}.` : ""} Size=${cache.size}.`,
              variables: { key: a[0], value: a[1], size: cache.size },
              dataStructure: {
                nodes: [
                  { id: "head", val: "HEAD", next: entries.length > 0 ? String(entries[0][0]) : "tail", state: "default" },
                  ...entries.map(([key, v], i) => ({ id: String(key), val: `${key}:${v}`, next: i < entries.length - 1 ? String(entries[i + 1][0]) : "tail", state: key === a[0] ? "active" : "default" })),
                  { id: "tail", val: "TAIL", next: null, state: "default" },
                ],
                pointerAssignments: {},
              },
              delta: {}, isAnswer: false,
            });
          }
        }

        if (steps.length > 0) steps[steps.length - 1].isAnswer = true;
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(n) per operation", space: "O(capacity)", explanation: "Linear scan for lookup and eviction" },
    optimal: { time: "O(1) per operation", space: "O(capacity)", explanation: "HashMap + doubly linked list — constant time for all operations", tradeoff: "More complex implementation but guarantees O(1) for both get and put" },
  },

  interviewTips: [
    "Start by identifying the two operations needed: O(1) lookup and O(1) eviction of LRU.",
    "Explain why each data structure alone is insufficient.",
    "Use dummy head and tail nodes to eliminate null-check edge cases.",
    "Walk through the pointer manipulation for remove and insertHead carefully.",
    "Mention that Python's OrderedDict is essentially this data structure built-in.",
  ],

  relatedProblems: ["design-twitter", "all-o-one-data-structure"],
};
