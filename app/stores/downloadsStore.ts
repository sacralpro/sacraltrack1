import { create } from 'zustand';

interface DownloadsStore {
  showPaidPosts: boolean;
  toggleShowPaidPosts: () => void;
  activatePaidPosts: () => void;
  hidePostUser: boolean;
  toggleHidePostUser: () => void;
}

const useDownloadsStore = create<DownloadsStore>((set) => ({
  showPaidPosts: false,
  hidePostUser: false,
  toggleShowPaidPosts: () => set((state) => ({ 
    showPaidPosts: !state.showPaidPosts, 
    hidePostUser: !state.showPaidPosts // Toggle both states together
  })),
  activatePaidPosts: () => set({ showPaidPosts: true, hidePostUser: true }),
  toggleHidePostUser: () => set((state) => ({ hidePostUser: !state.hidePostUser })),
}));

export default useDownloadsStore;
