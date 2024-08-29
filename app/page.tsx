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
import React, { lazy, Suspense } from "react";
import { useInView } from 'react-intersection-observer';


export default function Home() {
  const { allPosts, setAllPosts, setGenre } = usePostStore();
  const { selectedGenre } = useContext(GenreContext);
  const router = useRouter();

  // Отфильтровываем посты по выбранному жанру
  const filteredPosts = allPosts.filter((post) => {
    return selectedGenre === "all" || (post.genre && post.genre.toLowerCase() === selectedGenre.toLowerCase());
  });

  // Используем useInView для отслеживания видимости элементов
  const [ref, inView] = useInView({
    threshold: 0.5, // Порог видимости элемента (50%)
    rootMargin: '200px', // Отступ от области видимости
  });

  useEffect(() => {
    setAllPosts();
  }, [selectedGenre, setAllPosts]);

  return (
    <>
      <RecoilRoot>
        <GenreProvider>
          <MainLayout>
            <div className="mt-[80px] w-full ml-auto">
              <ClientOnly>
                <Suspense fallback={<div>Loading...</div>}>
                  {filteredPosts.map((post, index) => (
                    <div ref={index === 0 ? ref : null} key={index}>
                      <PostMain
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
                    </div>
                  ))}
                </Suspense>
              </ClientOnly>
            </div>
          </MainLayout>
        </GenreProvider>
      </RecoilRoot>
    </>
  );
}
