import { create } from 'zustand';
import { VideoQueryParams } from '@/types/video';

interface VideoState {
  filters: VideoQueryParams;
  setFilters: (filters: Partial<VideoQueryParams>) => void;
  resetFilters: () => void;
}

const initialFilters: VideoQueryParams = {
  tagIds: [],
  keywords: '',
  pageNum: 0,
  pageSize: 24,
};

export const useVideoStore = create<VideoState>((set) => ({
  filters: initialFilters,
  setFilters: (filters) => 
    set((state) => ({
      filters: { ...state.filters, ...filters }
    })),
  resetFilters: () => set({ filters: initialFilters }),
})); 