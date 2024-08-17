"use client"

import { useEffect } from "react"
import { useState, useContext } from "react"
import MainLayout from "./layouts/MainLayout"
import { usePostStore } from "@/app/stores/post"
import ClientOnly from "./components/ClientOnly"
import PostMain from "./components/PostMain"
import { RecoilRoot } from "recoil";
import { GenreProvider } from "@/app/context/GenreContext";
import { GenreContext } from "@/app/context/GenreContext";
import { useRouter } from "next/navigation";



export default function Home() {
  const { allPosts, setAllPosts, setGenre } = usePostStore();
  const { selectedGenre } = useContext(GenreContext);
  console.log("Selected Genre on Home:", selectedGenre);
  const router = useRouter();


  
  // Отфильтровываем посты по выбранному жанру
  const filteredPosts = allPosts.filter((post) => {
    console.log("Filtering posts by genre:", post.genre);
    return selectedGenre === "all" || (post.genre && post.genre.toLowerCase() === selectedGenre.toLowerCase());
  });


  useEffect(() => {
    console.log("setAllPosts called", selectedGenre);
    setAllPosts();
  }, [selectedGenre, setAllPosts]);
  

  console.log("Все посты:", allPosts);
  console.log("Filtered posts после выбоа жанра:", filteredPosts); // Add this line


  return (
    <>
      <RecoilRoot>
      <GenreProvider>
        <MainLayout>
          <div className="mt-[80px] w-full ml-auto">
            
          <ClientOnly>
          {filteredPosts.map((post, index) => (
              <PostMain
                key={index}
                post={post}
                router={useRouter()}
                id={post.id}
                user_id={post.user_id}
                audio_url={post.audio_url}
                image_url={post.image_url}
                price={post.price}
                mp3_url={post.mp3_url}
                text={post.text}
                trackname={post.trackname}
                created_at={post.created_at}
                genre={post.genre}
                profile={{
                  user_id: post.profile.user_id,
                  name: post.profile.name,
                  image: post.profile.image
                }}
              />
            ))}

          </ClientOnly>
          </div>
        </MainLayout>
        </GenreProvider>
      </RecoilRoot>
      
    </>
  );
}