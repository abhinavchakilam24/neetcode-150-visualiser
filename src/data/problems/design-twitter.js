export const designTwitter = {
  id: 69,
  slug: "design-twitter",
  title: "Design Twitter",
  difficulty: "Medium",
  topic: "heap-priority-queue",
  topicLabel: "Heap / Priority Queue",
  neetcodeNumber: 69,
  artifactType: "Heap",
  companies: ["Amazon", "Twitter", "Meta", "Google", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/design-twitter/",

  pattern: "Merge K Sorted Lists with Min Heap",
  patternExplanation: `The news feed is essentially merging K sorted lists (one per followed user)
    and returning the top 10 most recent tweets. A min heap of size 10 efficiently tracks the
    10 most recent tweets across all followed users.`,

  intuition: {
    coreInsight: `Each user has a list of tweets sorted by time (most recent first). Getting
      a user's news feed means merging the tweet lists of everyone they follow and returning
      the 10 most recent. This is exactly the "merge K sorted lists" pattern — a heap gives
      us the most recent tweet across all lists in O(log K) time.`,

    mentalModel: `Imagine you follow 5 friends on social media. Each friend has a stack of
      postcards (tweets) sorted newest on top. To find the 10 most recent posts across all
      friends, you look at the top postcard of each stack, pick the newest one, then look at
      the next card from that friend's stack. A max heap automates this "peek at all tops and
      pick the best" process.`,

    whyNaiveFails: `A brute force approach collects ALL tweets from ALL followed users into
      one list, sorts by timestamp, and returns the first 10. If users have thousands of tweets,
      this is wasteful — we sort potentially millions of tweets just to get 10. The heap approach
      only processes at most 10 tweets total by leveraging the pre-sorted order of each user's
      tweet list.`,

    keyObservation: `We only need the 10 most recent tweets. We don't need to merge all tweets —
      just process enough from each user's list to find the top 10. By using a heap and pulling
      one tweet at a time from the most-recent-tweet user, we stop as soon as we have 10.`,
  },

  problem: `Design a simplified version of Twitter where users can post tweets, follow/unfollow
    other users, and view the 10 most recent tweets in their news feed. Implement the Twitter
    class: Twitter() initializes, postTweet(userId, tweetId) posts a tweet, getNewsFeed(userId)
    returns the 10 most recent tweet IDs from followed users and self, follow(followerId, followeeId)
    follows a user, unfollow(followerId, followeeId) unfollows a user.`,

  examples: [
    {
      input: '["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"]\n[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]',
      output: "[null,null,[5],null,null,[6,5],null,[5]]",
      explanation: "User 1 posts tweet 5, sees [5]. Follows user 2 who posts tweet 6. Now sees [6,5]. After unfollowing, sees only [5].",
    },
  ],

  constraints: [
    "1 <= userId, followerId, followeeId <= 500",
    "0 <= tweetId <= 10^4",
    "All tweets have unique IDs",
    "At most 3 * 10^4 calls total",
  ],

  approaches: {
    brute: {
      label: "Collect and Sort",
      tier: "brute",
      timeComplexity: "O(N log N) per getNewsFeed",
      spaceComplexity: "O(N)",
      idea: "For getNewsFeed, gather all tweets from self and followed users into one list, sort by timestamp, return first 10.",

      javaCode: `class Twitter {
    private Map<Integer, List<int[]>> tweets;
    private Map<Integer, Set<Integer>> follows;
    private int time;

    public Twitter() {
        tweets = new HashMap<>();
        follows = new HashMap<>();
        time = 0;
    }

    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -> new ArrayList<>())
              .add(new int[]{time++, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        List<int[]> all = new ArrayList<>();
        Set<Integer> users = new HashSet<>(follows.getOrDefault(userId, Set.of()));
        users.add(userId);
        for (int u : users) {
            all.addAll(tweets.getOrDefault(u, List.of()));
        }
        all.sort((a, b) -> b[0] - a[0]);
        List<Integer> feed = new ArrayList<>();
        for (int i = 0; i < Math.min(10, all.size()); i++) {
            feed.add(all.get(i)[1]);
        }
        return feed;
    }

    public void follow(int followerId, int followeeId) {
        follows.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        follows.getOrDefault(followerId, Set.of()).remove(followeeId);
    }
}`,

      cppCode: `class Twitter {
    unordered_map<int, vector<pair<int,int>>> tweets;
    unordered_map<int, unordered_set<int>> follows;
    int time = 0;
public:
    Twitter() {}

    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({time++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        vector<pair<int,int>> all;
        unordered_set<int> users = follows[userId];
        users.insert(userId);
        for (int u : users)
            for (auto& t : tweets[u]) all.push_back(t);
        sort(all.begin(), all.end(), greater<>());
        vector<int> feed;
        for (int i = 0; i < min(10, (int)all.size()); i++)
            feed.push_back(all[i].second);
        return feed;
    }

    void follow(int followerId, int followeeId) {
        follows[followerId].insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) {
        follows[followerId].erase(followeeId);
    }
};`,

      pythonCode: `class Twitter:
    def __init__(self):
        self.tweets = defaultdict(list)
        self.follows = defaultdict(set)
        self.time = 0

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        all_tweets = []
        users = self.follows[userId] | {userId}
        for u in users:
            all_tweets.extend(self.tweets[u])
        all_tweets.sort(key=lambda x: -x[0])
        return [t[1] for t in all_tweets[:10]]

    def follow(self, followerId: int, followeeId: int) -> None:
        self.follows[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.follows[followerId].discard(followeeId)`,

      lineAnnotations: {
        6: "Initialize data structures",
        12: "Append tweet with timestamp for ordering",
        17: "Collect ALL tweets from self and followed users",
        23: "Sort all collected tweets by time descending",
        25: "Return first 10 tweet IDs",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { operations: ["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"], args: [[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]] },
          expectedOutput: "[null,null,[5],null,null,[6,5],null,[5]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [6],
              shortLabel: "Init Twitter",
              explanation: "Create empty Twitter instance. No tweets, no follows yet.",
              variables: { tweets: "{}", follows: "{}", time: 0 },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12],
              shortLabel: "User 1 posts tweet 5",
              explanation: "User 1 posts tweet 5 at time=0. tweets = {1: [(0,5)]}.",
              variables: { tweets: "{1:[(0,5)]}", time: 1 },
              dataStructure: { heap: [5], heapLabels: ["t0:tweet5"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [17, 23, 25],
              shortLabel: "getFeed(1) → [5]",
              explanation: "User 1 follows nobody. Collect own tweets: [(0,5)]. Sort. Return [5].",
              variables: { userId: 1, feed: "[5]" },
              dataStructure: { heap: [5], heapLabels: ["tweet5"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [30],
              shortLabel: "User 1 follows User 2",
              explanation: "follows = {1: {2}}. Now User 1's feed will include User 2's tweets.",
              variables: { follows: "{1:{2}}" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [12],
              shortLabel: "User 2 posts tweet 6",
              explanation: "User 2 posts tweet 6 at time=1. tweets = {1:[(0,5)], 2:[(1,6)]}.",
              variables: { tweets: "{1:[(0,5)],2:[(1,6)]}", time: 2 },
              dataStructure: { heap: [6, 5], heapLabels: ["t1:tweet6", "t0:tweet5"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [17, 23, 25],
              shortLabel: "getFeed(1) → [6,5]",
              explanation: "User 1 follows {2}. Collect self + User 2 tweets: [(0,5),(1,6)]. Sort by time desc: [(1,6),(0,5)]. Return [6,5].",
              variables: { userId: 1, feed: "[6, 5]" },
              dataStructure: { heap: [6, 5], heapLabels: ["tweet6", "tweet5"], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [34],
              shortLabel: "User 1 unfollows User 2",
              explanation: "Remove 2 from User 1's follow set. follows = {1: {}}.",
              variables: { follows: "{1:{}}" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [17, 23, 25],
              shortLabel: "getFeed(1) → [5]",
              explanation: "User 1 no longer follows User 2. Only own tweets: [(0,5)]. Return [5]. User 2's tweet 6 is gone from feed.",
              variables: { userId: 1, feed: "[5]", answer: "[null,null,[5],null,null,[6,5],null,[5]]" },
              dataStructure: { heap: [5], heapLabels: ["tweet5"], heapHighlight: 0 },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations, args }) {
        const steps = [];
        const tweets = {};
        const follows = {};
        let time = 0;
        const results = [];

        for (let op = 0; op < operations.length; op++) {
          const name = operations[op];
          const a = args[op];

          if (name === "Twitter") {
            results.push(null);
            steps.push({
              stepId: steps.length, lineNumbers: [6],
              shortLabel: "Init Twitter",
              explanation: "Create empty Twitter instance.",
              variables: { tweets: "{}", follows: "{}", time: 0 },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {}, isAnswer: false,
            });
          } else if (name === "postTweet") {
            const [userId, tweetId] = a;
            if (!tweets[userId]) tweets[userId] = [];
            tweets[userId].push([time++, tweetId]);
            results.push(null);
            steps.push({
              stepId: steps.length, lineNumbers: [12],
              shortLabel: `User ${userId} posts tweet ${tweetId}`,
              explanation: `User ${userId} posts tweet ${tweetId} at time=${time - 1}.`,
              variables: { userId, tweetId, time },
              dataStructure: { heap: [tweetId], heapLabels: [`tweet${tweetId}`], heapHighlight: 0 },
              delta: {}, isAnswer: false,
            });
          } else if (name === "getNewsFeed") {
            const [userId] = a;
            const users = new Set(follows[userId] || []);
            users.add(userId);
            const all = [];
            for (const u of users) {
              if (tweets[u]) all.push(...tweets[u]);
            }
            all.sort((x, y) => y[0] - x[0]);
            const feed = all.slice(0, 10).map(t => t[1]);
            results.push(feed);
            const isLast = op === operations.length - 1;
            steps.push({
              stepId: steps.length, lineNumbers: [17, 23, 25],
              shortLabel: `getFeed(${userId}) → [${feed.join(",")}]`,
              explanation: `Collect tweets from user ${userId} and followed users. Sort by time. Return [${feed.join(", ")}].`,
              variables: { userId, feed: `[${feed.join(", ")}]` },
              dataStructure: { heap: feed, heapLabels: feed.map(f => `tweet${f}`), heapHighlight: null },
              delta: {}, isAnswer: isLast,
            });
          } else if (name === "follow") {
            const [followerId, followeeId] = a;
            if (!follows[followerId]) follows[followerId] = new Set();
            follows[followerId].add(followeeId);
            results.push(null);
            steps.push({
              stepId: steps.length, lineNumbers: [30],
              shortLabel: `User ${followerId} follows User ${followeeId}`,
              explanation: `Add ${followeeId} to ${followerId}'s follow set.`,
              variables: { followerId, followeeId },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {}, isAnswer: false,
            });
          } else if (name === "unfollow") {
            const [followerId, followeeId] = a;
            if (follows[followerId]) follows[followerId].delete(followeeId);
            results.push(null);
            steps.push({
              stepId: steps.length, lineNumbers: [34],
              shortLabel: `User ${followerId} unfollows User ${followeeId}`,
              explanation: `Remove ${followeeId} from ${followerId}'s follow set.`,
              variables: { followerId, followeeId },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {}, isAnswer: false,
            });
          }
        }
        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Merge K Lists with Max Heap",
      tier: "optimal",
      timeComplexity: "O(K log K) per getNewsFeed, K = followed users",
      spaceComplexity: "O(N) total for all tweets",
      idea: `Store each user's tweets in a list. For getNewsFeed, push the most recent tweet
        from each followed user into a max heap. Pop the top (most recent), and push the
        next tweet from that user's list. Repeat until 10 tweets collected.`,

      javaCode: `class Twitter {
    private Map<Integer, List<int[]>> tweets;
    private Map<Integer, Set<Integer>> follows;
    private int time;

    public Twitter() {
        tweets = new HashMap<>();
        follows = new HashMap<>();
        time = 0;
    }

    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -> new ArrayList<>())
              .add(new int[]{time++, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        // Max heap: [time, tweetId, userId, index in user's tweet list]
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        Set<Integer> users = new HashSet<>(follows.getOrDefault(userId, Set.of()));
        users.add(userId);

        for (int u : users) {
            List<int[]> userTweets = tweets.getOrDefault(u, List.of());
            if (!userTweets.isEmpty()) {
                int idx = userTweets.size() - 1;
                int[] t = userTweets.get(idx);
                heap.offer(new int[]{t[0], t[1], u, idx});
            }
        }

        List<Integer> feed = new ArrayList<>();
        while (!heap.isEmpty() && feed.size() < 10) {
            int[] top = heap.poll();
            feed.add(top[1]);
            int nextIdx = top[3] - 1;
            if (nextIdx >= 0) {
                int[] next = tweets.get(top[2]).get(nextIdx);
                heap.offer(new int[]{next[0], next[1], top[2], nextIdx});
            }
        }
        return feed;
    }

    public void follow(int followerId, int followeeId) {
        follows.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        follows.getOrDefault(followerId, Set.of()).remove(followeeId);
    }
}`,

      cppCode: `class Twitter {
    unordered_map<int, vector<pair<int,int>>> tweets;
    unordered_map<int, unordered_set<int>> follows;
    int time = 0;
public:
    Twitter() {}

    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({time++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        auto cmp = [](auto& a, auto& b) { return get<0>(a) < get<0>(b); };
        priority_queue<tuple<int,int,int,int>, vector<tuple<int,int,int,int>>, decltype(cmp)> heap(cmp);
        unordered_set<int> users = follows[userId];
        users.insert(userId);

        for (int u : users) {
            if (!tweets[u].empty()) {
                int idx = tweets[u].size() - 1;
                heap.push({tweets[u][idx].first, tweets[u][idx].second, u, idx});
            }
        }

        vector<int> feed;
        while (!heap.empty() && feed.size() < 10) {
            auto [t, tid, uid, idx] = heap.top(); heap.pop();
            feed.push_back(tid);
            if (idx > 0) {
                heap.push({tweets[uid][idx-1].first, tweets[uid][idx-1].second, uid, idx-1});
            }
        }
        return feed;
    }

    void follow(int followerId, int followeeId) {
        follows[followerId].insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) {
        follows[followerId].erase(followeeId);
    }
};`,

      pythonCode: `class Twitter:
    def __init__(self):
        self.tweets = defaultdict(list)
        self.follows = defaultdict(set)
        self.time = 0

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        heap = []
        users = self.follows[userId] | {userId}

        for u in users:
            if self.tweets[u]:
                idx = len(self.tweets[u]) - 1
                t, tid = self.tweets[u][idx]
                heapq.heappush(heap, (-t, tid, u, idx))

        feed = []
        while heap and len(feed) < 10:
            neg_t, tid, uid, idx = heapq.heappop(heap)
            feed.append(tid)
            if idx > 0:
                t2, tid2 = self.tweets[uid][idx - 1]
                heapq.heappush(heap, (-t2, tid2, uid, idx - 1))
        return feed

    def follow(self, followerId: int, followeeId: int) -> None:
        self.follows[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.follows[followerId].discard(followeeId)`,

      lineAnnotations: {
        6: "Initialize tweets map, follows map, and global timestamp",
        12: "Append tweet with auto-incrementing timestamp",
        18: "Max heap ordered by timestamp — most recent on top",
        23: "Push each followed user's most recent tweet into heap",
        32: "Pop most recent tweet, then push that user's next tweet",
        36: "If the user has an older tweet, push it for consideration",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Post, follow, get feed, unfollow sequence",
          input: { operations: ["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"], args: [[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]] },
          expectedOutput: "[null,null,[5],null,null,[6,5],null,[5]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [6],
              shortLabel: "Init Twitter",
              explanation: "Initialize Twitter with empty tweets map, follows map, and timestamp counter at 0.",
              variables: { tweets: "{}", follows: "{}", time: 0 },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12],
              shortLabel: "postTweet(1, 5)",
              explanation: "User 1 posts tweet 5 at time=0. tweets[1] = [(0, 5)]. Time increments to 1.",
              variables: { userId: 1, tweetId: 5, time: 1, "tweets[1]": "[(0,5)]" },
              dataStructure: { heap: [5], heapLabels: ["t0:tweet5(user1)"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [18, 23],
              shortLabel: "getNewsFeed(1): build heap",
              explanation: "User 1 follows nobody. Users = {1}. Push User 1's most recent tweet (0,5) into heap.",
              variables: { userId: 1, users: "{1}", heap: "[(0,5,1,0)]" },
              dataStructure: { heap: [5], heapLabels: ["tweet5"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [32, 36],
              shortLabel: "Pop tweet5 → feed=[5]",
              explanation: "Pop (0,5) from heap. Add tweet 5 to feed. No more tweets from User 1. Heap empty. Return [5].",
              variables: { feed: "[5]", heapSize: 0 },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [43],
              shortLabel: "follow(1, 2)",
              explanation: "User 1 follows User 2. follows[1] = {2}.",
              variables: { followerId: 1, followeeId: 2, "follows[1]": "{2}" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [12],
              shortLabel: "postTweet(2, 6)",
              explanation: "User 2 posts tweet 6 at time=1. tweets[2] = [(1, 6)].",
              variables: { userId: 2, tweetId: 6, time: 2, "tweets[2]": "[(1,6)]" },
              dataStructure: { heap: [6], heapLabels: ["t1:tweet6(user2)"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [18, 23],
              shortLabel: "getNewsFeed(1): build heap",
              explanation: "Users = {1, 2}. Push User 1's latest (0,5) and User 2's latest (1,6). Heap top = (1,6) — most recent.",
              variables: { userId: 1, users: "{1,2}", heap: "[(1,6,2,0),(0,5,1,0)]" },
              dataStructure: { heap: [6, 5], heapLabels: ["tweet6(user2)", "tweet5(user1)"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [32],
              shortLabel: "Pop tweet6, pop tweet5 → [6,5]",
              explanation: "Pop (1,6) → feed=[6]. User 2 has no more tweets. Pop (0,5) → feed=[6,5]. Heap empty. Return [6,5].",
              variables: { feed: "[6, 5]" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [47],
              shortLabel: "unfollow(1, 2)",
              explanation: "User 1 unfollows User 2. follows[1] = {}.",
              variables: { followerId: 1, followeeId: 2, "follows[1]": "{}" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [18, 23, 32],
              shortLabel: "getNewsFeed(1) → [5]",
              explanation: "Users = {1} only. Push (0,5). Pop → feed=[5]. User 2's tweets excluded. Return [5].",
              variables: { feed: "[5]", answer: "[null,null,[5],null,null,[6,5],null,[5]]" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Multiple Tweets",
          description: "One user posts many tweets, verify ordering",
          input: { operations: ["Twitter","postTweet","postTweet","postTweet","getNewsFeed"], args: [[],[1,1],[1,2],[1,3],[1]] },
          expectedOutput: "[null,null,null,null,[3,2,1]]",
          steps: [
            {
              stepId: 0,
              lineNumbers: [6],
              shortLabel: "Init Twitter",
              explanation: "Create empty Twitter.",
              variables: { time: 0 },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [12],
              shortLabel: "postTweet(1, 1)",
              explanation: "User 1 posts tweet 1 at time=0.",
              variables: { "tweets[1]": "[(0,1)]", time: 1 },
              dataStructure: { heap: [1], heapLabels: ["tweet1"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [12],
              shortLabel: "postTweet(1, 2)",
              explanation: "User 1 posts tweet 2 at time=1.",
              variables: { "tweets[1]": "[(0,1),(1,2)]", time: 2 },
              dataStructure: { heap: [2, 1], heapLabels: ["tweet2", "tweet1"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [12],
              shortLabel: "postTweet(1, 3)",
              explanation: "User 1 posts tweet 3 at time=2.",
              variables: { "tweets[1]": "[(0,1),(1,2),(2,3)]", time: 3 },
              dataStructure: { heap: [3, 2, 1], heapLabels: ["tweet3", "tweet2", "tweet1"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [18, 23],
              shortLabel: "getNewsFeed(1): push latest",
              explanation: "Push User 1's most recent tweet (2,3) into heap. Start popping.",
              variables: { heap: "[(2,3,1,2)]" },
              dataStructure: { heap: [3], heapLabels: ["tweet3"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [32, 36],
              shortLabel: "Pop tweet3, push tweet2",
              explanation: "Pop (2,3) → feed=[3]. Push next tweet (1,2) from User 1.",
              variables: { feed: "[3]", heap: "[(1,2,1,1)]" },
              dataStructure: { heap: [2], heapLabels: ["tweet2"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [32, 36],
              shortLabel: "Pop tweet2, push tweet1",
              explanation: "Pop (1,2) → feed=[3,2]. Push next tweet (0,1).",
              variables: { feed: "[3, 2]", heap: "[(0,1,1,0)]" },
              dataStructure: { heap: [1], heapLabels: ["tweet1"], heapHighlight: 0 },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [32],
              shortLabel: "Pop tweet1 → feed=[3,2,1]",
              explanation: "Pop (0,1) → feed=[3,2,1]. No more tweets. Return [3,2,1]. Most recent first.",
              variables: { feed: "[3, 2, 1]", answer: "[3, 2, 1]" },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ operations, args }) {
        const steps = [];
        const tweets = {};
        const follows = {};
        let time = 0;

        for (let op = 0; op < operations.length; op++) {
          const name = operations[op];
          const a = args[op];

          if (name === "Twitter") {
            steps.push({
              stepId: steps.length, lineNumbers: [6],
              shortLabel: "Init Twitter",
              explanation: "Create empty Twitter.",
              variables: { time: 0 },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {}, isAnswer: false,
            });
          } else if (name === "postTweet") {
            const [userId, tweetId] = a;
            if (!tweets[userId]) tweets[userId] = [];
            tweets[userId].push([time++, tweetId]);
            steps.push({
              stepId: steps.length, lineNumbers: [12],
              shortLabel: `postTweet(${userId}, ${tweetId})`,
              explanation: `User ${userId} posts tweet ${tweetId} at time=${time - 1}.`,
              variables: { userId, tweetId, time },
              dataStructure: { heap: [tweetId], heapLabels: [`tweet${tweetId}`], heapHighlight: 0 },
              delta: {}, isAnswer: false,
            });
          } else if (name === "getNewsFeed") {
            const [userId] = a;
            const users = new Set(follows[userId] || []);
            users.add(userId);
            const all = [];
            for (const u of users) {
              if (tweets[u]) all.push(...tweets[u]);
            }
            all.sort((x, y) => y[0] - x[0]);
            const feed = all.slice(0, 10).map(t => t[1]);
            const isLast = op === operations.length - 1;
            steps.push({
              stepId: steps.length, lineNumbers: [18, 23, 32],
              shortLabel: `getNewsFeed(${userId}) → [${feed.join(",")}]`,
              explanation: `Merge tweets from followed users. Return [${feed.join(", ")}].`,
              variables: { userId, feed: `[${feed.join(", ")}]`, ...(isLast ? { answer: `[${feed.join(", ")}]` } : {}) },
              dataStructure: { heap: feed, heapLabels: feed.map(f => `tweet${f}`), heapHighlight: null },
              delta: {}, isAnswer: isLast,
            });
          } else if (name === "follow") {
            const [followerId, followeeId] = a;
            if (!follows[followerId]) follows[followerId] = new Set();
            follows[followerId].add(followeeId);
            steps.push({
              stepId: steps.length, lineNumbers: [43],
              shortLabel: `follow(${followerId}, ${followeeId})`,
              explanation: `User ${followerId} follows User ${followeeId}.`,
              variables: { followerId, followeeId },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {}, isAnswer: false,
            });
          } else if (name === "unfollow") {
            const [followerId, followeeId] = a;
            if (follows[followerId]) follows[followerId].delete(followeeId);
            steps.push({
              stepId: steps.length, lineNumbers: [47],
              shortLabel: `unfollow(${followerId}, ${followeeId})`,
              explanation: `User ${followerId} unfollows User ${followeeId}.`,
              variables: { followerId, followeeId },
              dataStructure: { heap: [], heapLabels: [], heapHighlight: null },
              delta: {}, isAnswer: false,
            });
          }
        }
        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(N log N) per getNewsFeed", space: "O(N)", explanation: "Collect all tweets then sort" },
    optimal: { time: "O(K log K) per getNewsFeed", space: "O(N)", explanation: "Merge K sorted lists using heap, only process 10 tweets. K = number of followed users", tradeoff: "Heap avoids sorting all tweets — only touches the minimum needed" },
  },

  interviewTips: [
    "Recognize this as 'merge K sorted lists' — a classic heap pattern.",
    "Each user's tweets are already sorted by time — exploit this.",
    "Clarify: do users see their own tweets? (Yes, always include self.)",
    "Mention that follow/unfollow/postTweet are all O(1) — the complexity is in getNewsFeed.",
    "Discuss how this scales: even with millions of tweets, we only touch K * 10 at most.",
  ],

  relatedProblems: ["merge-k-sorted-lists", "kth-largest-stream"],
};
