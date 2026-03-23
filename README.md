# Visualiser 150

An interactive DSA learning platform that brings the NeetCode 150 problems to life through step-by-step algorithm visualization. Every problem has its own animated dry run, synchronized code highlighting, and a fully interactive controls system — so you can watch an algorithm *think*, one step at a time.

---

## What it does

- **149 problems** across 18 topics, each with its own dedicated page at `/problems/:slug`
- **Step-by-step visualizer** — play, pause, step forward/back, scrub to any step, or use keyboard arrows
- **Code synchronized** — the active line(s) in Java/C++/Python highlight in sync with the visualization
- **Three solution tiers** per problem: Brute Force → Better → Optimal, each with its own dry run
- **Multiple scenarios** per problem (standard, edge cases) plus custom input support
- **15 artifact types** that render the exact data structure used by each algorithm
- **Progress tracking** via localStorage — mark problems solved, resume where you left off

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| Routing | React Router DOM v7 |
| State | Zustand (progress + localStorage) |
| Code highlight | Prism React Renderer (GitHub light theme) |
| Icons | Lucide React |
| Fonts | JetBrains Mono (code), Plus Jakarta Sans (UI) |

No backend. No database. All 149 problem data files are static JS exports.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── main.jsx
├── App.jsx
├── index.css                        # CSS variables + warm light theme
│
├── data/
│   ├── index.js                     # Aggregates all problems + topics
│   ├── topics.js                    # 18 topics with all 149 problem slugs
│   └── problems/                    # 149 individual problem data files
│       ├── two-sum.js               # Gold standard — all others follow this shape
│       ├── climbing-stairs.js
│       └── ...
│
├── pages/
│   ├── Landing.jsx                  # Homepage: hero + 18-topic grid
│   ├── ProblemList.jsx              # Searchable + filterable problem list
│   ├── ProblemDetail.jsx            # /problems/:slug — resizable 3-panel IDE layout
│   └── TopicPage.jsx                # /topics/:topicId
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── TopicGrid.jsx
│   │   ├── TopicCard.jsx
│   │   └── ProgressSummary.jsx
│   ├── problem/
│   │   ├── CodePanel.jsx            # Syntax-highlighted code, active line scroll
│   │   ├── ExplanationBox.jsx       # Per-step explanation text
│   │   └── CustomInputModal.jsx     # Custom input modal
│   └── ui/
│       ├── DifficultyBadge.jsx
│       ├── SearchBar.jsx
│       └── ArtifactControls.jsx     # Play/pause/step/scrubber/speed controls
│
├── artifacts/                       # 15 data-structure visualizers
│   ├── index.js                     # Lazy registry
│   ├── ArrayHashMapArtifact.jsx     # Array + HashMap side by side
│   ├── TwoPointerArtifact.jsx       # Array with left/right pointers
│   ├── SlidingWindowArtifact.jsx    # Array with animated window overlay
│   ├── StackArtifact.jsx            # Vertical stack with push/pop animations
│   ├── BinarySearchArtifact.jsx     # Sorted array with lo/mid/hi pointers
│   ├── LinkedListArtifact.jsx       # Node-arrow chain with pointer labels
│   ├── BSTArtifact.jsx              # Binary tree with call stack panel
│   ├── GraphBFSArtifact.jsx         # Grid visualization with BFS queue
│   ├── GraphDFSArtifact.jsx         # Node-edge graph with DFS stack
│   ├── DPTable1DArtifact.jsx        # 1D DP array with recurrence arrows
│   ├── DPTable2DArtifact.jsx        # 2D DP table with contributing-cell highlights
│   ├── HeapArtifact.jsx             # Binary heap tree + array representation
│   ├── TrieArtifact.jsx             # Trie tree with character-labeled edges
│   ├── BacktrackingArtifact.jsx     # Decision tree with call stack
│   └── MatrixArtifact.jsx           # 2D matrix with animated cursor + trail
│
├── hooks/
│   ├── useStepPlayer.js             # Step state, autoplay timer, speed control
│   └── useKeyboardNav.js            # Arrow keys, Space, Home, End
│
└── store/
    └── progressStore.js             # Zustand: solved problems, localStorage persist
```

---

## Problem Page Layout

Each problem at `/problems/:slug` is a full-viewport, zero-scroll, three-panel layout:

```
┌─────────────────┬──┬──────────────────────────────────┐
│  LEFT PANEL     │▐ │  RIGHT PANEL                      │
│  (35% default)  │▐ │                                   │
│                 │▐ │  ┌─ Approach Tabs / Lang Toggle ─┐ │
│  Title          │▐ │  │                               │ │
│  Difficulty     │▐ │  │   VISUALIZER ARTIFACT         │ │
│  Mark Solved    │▐ │  │   (animated data structure)   │ │
│  LeetCode link  │▐ │  │                               │ │
│                 │▐ │  │   Explanation + Variables      │ │
│  Problem desc   │▐ │  │   Transport Controls           │ │
│  Examples       │▐ │  ├═══════════════════════════════┤ │
│  Constraints    │▐ │  │                               │ │
│  Complexity     │▐ │  │   CODE PANEL                  │ │
│  Companies      │▐ │  │   (syntax highlighted)        │ │
│                 │▐ │  │                               │ │
└─────────────────┴──┴──────────────────────────────────┘
  ▐ = draggable      ═ = draggable vertical handle
```

All three drag handles are resizable. Left panel: 20–75% range. Visualizer/code split: 20–75% range.

---

## Routes

| Route | Page |
|---|---|
| `/` | Homepage — hero + 18-topic grid |
| `/problems` | Full problem list with search + difficulty + topic filters |
| `/problems/:slug` | Individual problem page (e.g. `/problems/two-sum`) |
| `/topics/:topicId` | Topic overview (e.g. `/topics/sliding-window`) |

---

## Visualizer Controls

| Control | Action |
|---|---|
| `▶ / ⏸` | Play / Pause autoplay |
| `◀ ▶` buttons | Step backward / forward |
| `⏮ ⏭` buttons | Jump to start / end |
| Scrubber | Drag to any step |
| `← →` arrow keys | Step backward / forward |
| Speed buttons | `0.5x` `0.75x` `1x` `1.5x` `2x` |
| Scenario pills | Switch between Standard / Edge Case scenarios |
| Custom Input | Enter your own array/input and generate new steps |

---

## Problem Data Format

Each problem file exports an object with this shape:

```js
export const twoSum = {
  id, slug, title, difficulty, topic, artifactType,
  companies, leetcodeLink, pattern,

  problem,        // problem statement text
  examples,       // [{ input, output, explanation }]
  constraints,    // string[]

  approaches: {
    brute:   { label, timeComplexity, spaceComplexity, idea, javaCode, cppCode, pythonCode, lineAnnotations, dryRunScenarios, computeSteps },
    better:  null,   // or same shape as brute
    optimal: { ... },
  },

  complexity: { brute: { time, space }, optimal: { time, space } },
};
```

`computeSteps(input)` runs the algorithm and emits a step array — this powers the custom input feature. Each step includes `lineNumbers`, `explanation`, `variables`, and `dataStructure` fields that drive the artifact and code panel simultaneously.

---

## Design System

Warm, Claude-console-inspired light theme. All colors via CSS variables in `src/index.css`.

| Token | Value | Use |
|---|---|---|
| `--bg-page` | `#FAF9F7` | Page background |
| `--bg-card` | `#FFFFFF` | Card surfaces |
| `--bg-raised` | `#F5F4F0` | Raised elements, code bg |
| `--clr-active` | `#D97706` | Currently processed (amber) |
| `--clr-found` | `#059669` | Answer / valid (green) |
| `--clr-visited` | `#7C3AED` | Already processed (purple) |
| `--clr-eliminated` | `#DC2626` | Wrong / removed (red) |
| `--clr-pointer` | `#2563EB` | Pointer variables (blue) |
| `--clr-queued` | `#EA580C` | In queue / stack (orange) |
| `--text-primary` | `#2D2B28` | Main text (warm near-black) |

---

## Topics Covered

Arrays & Hashing · Two Pointers · Sliding Window · Stack · Binary Search · Linked List · Trees · Tries · Heap / Priority Queue · Backtracking · Graphs · Advanced Graphs · 1-D Dynamic Programming · 2-D Dynamic Programming · Greedy · Intervals · Math & Geometry · Bit Manipulation
