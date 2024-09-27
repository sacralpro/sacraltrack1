"use client";

import Link from "next/link";
import PostMainLikes from "./PostMainLikes";
import React, { useEffect, useRef, useState, useCallback, useContext, memo } from "react";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import { PostWithProfile, PostMainCompTypes } from "../types";
import { usePathname } from "next/navigation";
import WaveSurfer from "wavesurfer.js";
import { BsFillStopFill, BsFillPlayFill } from "react-icons/bs";
import toast from "react-hot-toast";
import CartContext from "../context/CartContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface MyWaveSurfer extends WaveSurfer {
  destroy: () => void;
}


const PostMain = memo(({ post }: PostMainCompTypes) => {
  const pathname = usePathname();

  // Add to cart
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = useCallback(() => {
    addItemToCart({
      product: post.id,
      name: post.text,
      image: post.image_url,
      audio: post.mp3_url,
      user: post.user_id,
      price: post.price,
    });
    console.log("added to cart");
    toast.success("Added to cart");
  }, [addItemToCart, post]);

  // WaveSurfer
  const [isPlaying, setIsPlaying] = useState(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const [wavesurfer, setWaveSurfer] = useState<MyWaveSurfer | null>(null);
  const [wavesurferList, setWavesurferList] = useState<MyWaveSurfer[]>([]);

  useEffect(() => {
    if (waveformRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Если элемент находится в видимой области экрана
              if (!wavesurfer) {
                const newWaveSurfer = WaveSurfer.create({
                  container: waveformRef.current as HTMLElement,
                  waveColor: "#ffffff",
                  progressColor: "#018CFD",
                  dragToSeek: true,
                  width: "47vw",
                  hideScrollbar: true,
                  normalize: true,
                  barGap: 1,
                  height: 40,
                  barHeight: 20,
                  barRadius: 20,
                  barWidth: 4,
                }) as MyWaveSurfer;

                newWaveSurfer.load(useCreateBucketUrl(post?.mp3_url));

                setWaveSurfer(newWaveSurfer);
                setWavesurferList((prevList) => [...prevList, newWaveSurfer]);

                newWaveSurfer.on("finish", () => {
                  console.log("Песня закончилась");
                  setIsPlaying(false);
                });

                newWaveSurfer.on("ready", () => {
                  console.log("Волновая форма готова");
                  if (isPlaying) {
                    newWaveSurfer.play();
                  }
                });
              } else {
                if (isPlaying) {
                  wavesurfer.play();
                }
              }
            } else {
              // Если элемент находится за пределами видимой области экрана
              // Не делаем ничего, трек должен продолжать играть
            }
          });
        },
        {
          rootMargin: "0px",
          threshold: 0.5,
        }
      );

      observer.observe(waveformRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [post?.mp3_url, wavesurfer, isPlaying]);

  useEffect(() => {
    if (wavesurfer) {
      const playHandler = () => setIsPlaying(true);
      const pauseHandler = () => setIsPlaying(false);
      const finishHandler = () => setIsPlaying(false);

      wavesurfer.on("play", playHandler);
      wavesurfer.on("pause", pauseHandler);
      wavesurfer.on("finish", finishHandler);

      return () => {
       
      };
    }
  }, [wavesurfer]);

  const handlePause = useCallback((currentWaveSurfer: MyWaveSurfer) => {
    wavesurferList.forEach((ws) => {
      if (ws !== currentWaveSurfer) {
        ws.pause();
      } else {
        ws.playPause();
        setIsPlaying((prevState) => !prevState);
      }
    });
  }, [wavesurferList]);
  
  

  const fetchAndLoadAudio = (audioUrl: string) => {
    const cachedAudio = localStorage.getItem(audioUrl);
    if (cachedAudio) {
      wavesurfer?.load(cachedAudio);
    } else {
      fetch(useCreateBucketUrl(audioUrl))
        .then((response) => response.blob())
        .then((blob) => {
          const audioUrl = URL.createObjectURL(blob);
          wavesurfer?.load(audioUrl);
          localStorage.setItem(audioUrl, audioUrl);
        })
        .catch((error) => {
          console.error("Ошибка при предварительной загрузке аудио:", error);
        });
    }
  };
  
  return (
    <div
      id={`PostMain-${post.id}`}
      style={{
        backgroundImage: `url(${useCreateBucketUrl(post?.image_url)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative flex flex-col justify-between p-2 mt-5 mb-5 
        object-cover rounded-[20px] h-[500px] overflow-hidden 
        md:w-[700px] w-[318px] mx-auto"
    >
      {post ? (
        <>
          <div className="flex justify-between">
            {/* Profile Image */}
            <div className="cursor-pointer">
              <LazyLoadImage
                className="rounded-[15px] max-h-[50px] w-[50px]"
                src={useCreateBucketUrl(post?.profile?.image)}
                alt="Profile"
                loading="lazy"
              />
            </div>

            {/* Name / Trackname */}
            <div className="bg-[#272B43]/95 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[50px] flex items-between rounded-xl ml-2">
              <div className="pl-3 w-full px-2">
                <div className="flex items-center justify-between">
                  <Link
                    className="text-[#818BAC] text-[15px]"
                    href={`/profile/${post.profile.user_id}`}
                  >
                    <span className="font-bold hover:underline cursor-pointer">
                      {post.profile.name}
                    </span>
                  </Link>
                </div>
                <p className="text-[14px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">
                  {post.text}
                </p>
              </div>
            </div>
          </div>

          {/* Genre Tag */}
          <div className="absolute top-16 left-16 py-1 px-2 bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] flex items-center rounded-lg">
            <p className="text-[13px] text-[#818BAC] hover:text-white cursor-pointer ">
              {post.genre}
            </p>
          </div>

          {/* Audio Controls */}
          <div className="wavesurfer-controls absolute z-5 top-[40%] left-[43%] border-color-white border-opacity-20 px-10 py-7 rounded-xl">
          <button
            className="w-[40px] h-[40px]"
            onClick={() => handlePause(wavesurfer as MyWaveSurfer)}
          >
            {isPlaying ? (
              <BsFillStopFill size={24} />
            ) : (
              <BsFillPlayFill size={24} />
            )}
          </button>
          </div>

          {/* Audio Waveform */}
          <div className="flex overflow-hidden mt-80 absolute h-[40px] mb-10 w-full">
            <div>
              <div ref={waveformRef} className="wavesurfer-container" />
            </div>
          </div>

          {/* Interaction Buttons */}
          <div className="absolute w-full h-[60px] bottom-1 justify-between pr-4">
            <PostMainLikes post={post} />
          </div>

          {/* Add to Cart Button */}
          <div className="absolute right-2 align-middle top-[30%]">
          <button
            onClick={addToCartHandler}
            className="py-12 px-4 bg-[#20DDBB] text-white rounded-t-xl"
          >
            <img src="/images/cart.svg" alt="sacraltrack cart" />
          </button>
          <div className="w-auto flex items-center justify-center py-2 px-2 bg-[#21C3A6] text-white text-size-[12px] rounded-b-xl">
            ${post.price}
          </div>
        </div>
        </>
        ) : (
        <div className="flex flex-col justify-between p-2 mt-5 mb-5 object-cover rounded-[20px] h-[500px] overflow-hidden">
          <div className="flex justify-between">
            <div className="cursor-pointer">
              <Skeleton
                className="rounded-[15px] max-h-[50px] w-[50px]"
                height={50}
                width={50}
              />
            </div>
            <div className="bg-[#272B43]/95 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[50px] flex items-between rounded-xl ml-2">
              <div className="pl-3 w-full px-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="text-[#818BAC] size-[15px]" width={100} />
                </div>
                <Skeleton className="text-[14px] pb-0.5" width={200} />
              </div>
            </div>
          </div>

        <div className="absolute top-16 left-16 py-1 px-2 bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] flex items-center rounded-lg">
          <Skeleton className="text-[13px] text-[#818BAC]" width={80} />
        </div>

        <div className="wavesurfer-controls absolute z-5 top-[40%] left-[43%] border-color-white border-opacity-20 px-10 py-7 rounded-xl">
          <Skeleton className="w-[40px] h-[40px]" />
        </div>

        <div className="flex overflow-hidden mt-80 absolute h-[40px] mb-10 w-full">
          <div>
            <Skeleton className="wavesurfer-container" height={40} />
          </div>
        </div>

        <div className="absolute w-full h-[60px] bottom-1 justify-between pr-4">
          <Skeleton className="w-full h-[60px]" />
        </div>

        <div className="absolute right-2 align-middle top-[30%]">
          <section>
            <Skeleton className="py-12 px-4 bg-[#20DDBB] text-white rounded-t-[12px]" height={60} />
            <Skeleton className="w-auto flex items-center justify-center py-2 px-2 bg-[#21C3A6] text-white text-size-[12px] rounded-b-[12px]" height={40} />
          </section>
        </div>
      </div>
      )}
      </div>
      );
      });

export default PostMain;