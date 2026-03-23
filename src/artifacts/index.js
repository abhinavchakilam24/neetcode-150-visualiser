import { lazy } from 'react';

export const artifactRegistry = {
  "ArrayHashMap":  lazy(() => import("./ArrayHashMapArtifact.jsx")),
  "TwoPointer":    lazy(() => import("./TwoPointerArtifact.jsx")),
  "SlidingWindow": lazy(() => import("./SlidingWindowArtifact.jsx")),
  "Stack":         lazy(() => import("./StackArtifact.jsx")),
  "BinarySearch":  lazy(() => import("./BinarySearchArtifact.jsx")),
  "LinkedList":    lazy(() => import("./LinkedListArtifact.jsx")),
  "BST":           lazy(() => import("./BSTArtifact.jsx")),
  "GraphBFS":      lazy(() => import("./GraphBFSArtifact.jsx")),
  "GraphDFS":      lazy(() => import("./GraphDFSArtifact.jsx")),
  "DPTable1D":     lazy(() => import("./DPTable1DArtifact.jsx")),
  "DPTable2D":     lazy(() => import("./DPTable2DArtifact.jsx")),
  "Heap":          lazy(() => import("./HeapArtifact.jsx")),
  "Trie":          lazy(() => import("./TrieArtifact.jsx")),
  "Backtracking":  lazy(() => import("./BacktrackingArtifact.jsx")),
  "Matrix":        lazy(() => import("./MatrixArtifact.jsx")),
};
