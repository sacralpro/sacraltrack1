// app/contexts/GenreContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useGenreStore } from "@/app/stores/genreStore";
import { usePostStore } from "@/app/stores/post"; // Убедитесь, что usePostStore обновлен соответствующим образом

interface GenreContextProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

export const GenreContext = createContext<GenreContextProps>({
  selectedGenre: "all",
  setSelectedGenre: () => {},
});

interface GenreProviderProps {
  children: ReactNode;
}

export const GenreProvider: React.FC<GenreProviderProps> = ({ children }) => {
  const { selectedGenre, setSelectedGenre } = useGenreStore();
  const { setGenre } = usePostStore();

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setGenre(genre);  // Вызов setGenre в постовом хранилище
  };

  return (
    <GenreContext.Provider value={{ selectedGenre, setSelectedGenre: handleGenreSelect }}>
      {children}
    </GenreContext.Provider>
  );
};
