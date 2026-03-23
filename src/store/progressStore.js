import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProgressStore = create(
  persist(
    (set, get) => ({
      solved: {},       // { [slug]: true }
      bookmarks: {},    // { [slug]: true }

      markSolved: (slug) =>
        set(state => ({ solved: { ...state.solved, [slug]: true } })),

      markUnsolved: (slug) =>
        set(state => {
          const next = { ...state.solved };
          delete next[slug];
          return { solved: next };
        }),

      toggleSolved: (slug) => {
        const { solved } = get();
        if (solved[slug]) {
          set(state => {
            const next = { ...state.solved };
            delete next[slug];
            return { solved: next };
          });
        } else {
          set(state => ({ solved: { ...state.solved, [slug]: true } }));
        }
      },

      isSolved: (slug) => !!get().solved[slug],

      solvedCount: () => Object.keys(get().solved).length,

      toggleBookmark: (slug) =>
        set(state => {
          const next = { ...state.bookmarks };
          if (next[slug]) delete next[slug];
          else next[slug] = true;
          return { bookmarks: next };
        }),

      isBookmarked: (slug) => !!get().bookmarks[slug],
    }),
    {
      name: 'neetcode-progress',
    }
  )
);
