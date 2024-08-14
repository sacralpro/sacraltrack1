
"use client";

import Link from "next/link"
import PostMainLikes from "./PostMainLikes"
import React from "react";
import { useEffect, useRef, useState } from "react"
import useCreateBucketUrl from "../hooks/useCreateBucketUrl"
import { PostWithProfile, Product, PostMainCompTypes } from "../types"
import { usePathname } from "next/navigation";
import WaveSurfer from "wavesurfer.js"
import { BsFillStopFill, BsFillPlayFill, BsSkipForward, BsSkipBackward } from "react-icons/bs";
import toast from 'react-hot-toast';
import CartContext from "../context/CartContext"
import { useContext } from "react";

export default function PostMain({ post }: PostMainCompTypes) {

    const pathname = usePathname();
 
    {/*Add to cart */}
    
    const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart({
      product: post.id,
      name: post.trackname,
      image: post.image_url,
      audio: post.mp3_url,
      user: post.user_id,
      price: post.price,
    });
    console.log("added to cart");
    toast.success("Added to cart");
  };
  
    {/* WaveSurfer */}

    const [isPlaying, setIsPlaying] = useState(false);

    const waveformRef = useRef<HTMLDivElement>(null);
    const [wavesurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  
    useEffect(() => {
        if (waveformRef.current) {
          const newWaveSurfer = WaveSurfer.create({
            container: waveformRef.current,
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
          });
      
          newWaveSurfer.load(useCreateBucketUrl(post?.mp3_url));
          setWaveSurfer(newWaveSurfer);
      
          newWaveSurfer.on("finish", () => {
            console.log("song finished");
          });
      
          newWaveSurfer.on("ready", () => {
            console.log("Waveform is ready");
          });
        }

        
        return () => {
          if (wavesurfer) {
            wavesurfer.destroy();
          }
        };
      }, []);
    
    {/* WaveSurfer PlayPause */}
        // Update handlePause function to toggle the state
        const handlePause = () => {
          if (wavesurfer) {
              if (isPlaying) {
                  wavesurfer.stop();
                  setIsPlaying(false);
              } else {
                  wavesurfer.playPause();
                  setIsPlaying(true);
              }
          }
        };


    return (
      <>
      <div
        id={`PostMain-${post.id}`}
        style={{
          backgroundImage: `url(${useCreateBucketUrl(post?.image_url)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className={`relative flex flex-col justify-between p-2 mt-5 mb-5 mx-5 
          object-cover rounded-[20px] h-[500px] overflow-hidden w-[408px]
          ${pathname === '/' ? ' lg:w-[700px]' : 'w-full lg:w-[500px]'}`}
      >
          <div className="flex justify-between">

    

            {/* Profile Image */}
            <div className="cursor-pointer">
                <img className="rounded-[15px] max-h-[50px] w-[50px]" src={useCreateBucketUrl(post?.profile?.image)} />
            </div>

            {/* Name / Trackname */}
            <div className=" bg-[#272B43]/95 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[50px] flex items-between rounded-xl ml-2">
                <div className="pl-3 w-full px-2">
                    <div className="flex items-center justify-between">
                        <Link className="text-[#818BAC] size-[15px]" href={`/profile/${post.profile.user_id}`}>
                            <span className="font-bold hover:underline cursor-pointer">
                                {post.profile.name}
                            </span>
                        </Link>
                    </div>
                    <p className="text-[14px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post.text}</p>
                </div>
            </div>
            </div>

            {/* Tag */}

             {/* Genre */}
            <div className="absolute top-16 left-16 py-1 px-2 bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] flex items-center rounded-lg">
            <p className="text-[13px] text-[#818BAC] hover:text-white cursor-pointer ">{post.genre}</p>
            </div>

            {/* Controls */}
            <div className="wavesurfer-controls absolute z-5 top-[43%] left-[43%] {/*border b-4*/} border-color-white border-opacity-20 px-10 py-7 rounded-xl">
                <button className="w-[30px] h-[30px]" onClick={handlePause}>
                    {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
                </button>
            </div>

            {/* Audio */}
            <div className="flex overflow-hidden mt-80 absolute h-[40px] mb-10 w-full">
                <div style={{  }}>
                    <div ref={waveformRef} className="wavesurfer-container" />
                </div>
            </div>

            {/* comments slider */}

            {/* Buttons like comments share */}
            <div className="absolute w-full h-[60px] bottom-1 justify-between pr-4">
                <PostMainLikes post={post} />
            </div>

            {/* Add to cart */}
            <div className="absolute right-2 align-middle top-[30%]">
                <section>
                <button onClick={addToCartHandler} className="py-12 px-4 bg-[#20DDBB] text-white rounded-t-[12px]">
                        <img src="/images/cart.svg" alt="sacraltrack cart" />
                    </button>
                    <div className="w-auto flex item-center justify-center py-2 px-2 bg-[#21C3A6] text-white text-size-[12px] rounded-b-[12px]">
                        $ {post.price}
                    </div>
                </section>
            </div>
        </div>
      
        </>
    )
}
