import { useProgressStore } from '../store/progressStore';

export function useProgress() {
  return useProgressStore();
}
