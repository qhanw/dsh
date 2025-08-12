import { create } from 'zustand';
import { TagCategory } from '@/types/navigation';

interface NavigationState {
  categories: TagCategory[];
  activeCategory: number | null;
  activeSubCategory: number | null;
  setCategories: (categories: TagCategory[]) => void;
  setActiveCategory: (id: number | null) => void;
  setActiveSubCategory: (id: number | null) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  categories: [],
  activeCategory: null,
  activeSubCategory: null,
  setCategories: (categories) => set({ categories }),
  setActiveCategory: (id) => set({ activeCategory: id }),
  setActiveSubCategory: (id) => set({ activeSubCategory: id }),
})); 