// app/stores/genreStore.ts
import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface GenreState {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

export const useGenreStore = create<GenreState>()(
  devtools(
    persist(
      (set) => ({
        selectedGenre: 'all',
        setSelectedGenre: (genre: string) => set({ selectedGenre: genre }),
      }),
      {
        name: 'genre-storage', // уникальное имя для хранения Zustand
      }
    )
  )
);
