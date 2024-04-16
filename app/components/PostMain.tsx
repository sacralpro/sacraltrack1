
"use client";

import Link from "next/link"
import PostMainLikes from "./PostMainLikes"
import React from "react";
import { useEffect, useRef, useState } from "react"
import useCreateBucketUrl from "../hooks/useCreateBucketUrl"
import { PostMainCompTypes } from "../types"
import { Stripe } from "@stripe/stripe-js"; 
import { loadStripe } from '@stripe/stripe-js';
import getStripe from "../getStripe";
import { database } from "@/libs/AppWriteClient";
// import { Elements } from "@stripe/react-stripe-js";
// import PaymentForm from "./PaymentForm";
import WaveSurfer from "wavesurfer.js"
import {
    BsFillStopFill,
    BsFillPlayFill,
    BsSkipForward,
    BsSkipBackward,
  } from "react-icons/bs";

  // const stripePromise = loadStripe(
  //  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  // ); 

  
export default function PostMain({ post }: PostMainCompTypes) {

    // const [showPaymentForm, setShowPaymentForm] = useState(false);

    {/* Stripe */}
    const handleCheckout = async () => {
      const stripe = await getStripe();
      
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PostMain }),
        
      })

      if (response.status === 500) return;

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error("Response is not valid JSON:", error);
        return;
      }
      stripe.redirectToCheckout({ sessionId: data.id });
    }; 

    
    {/* WaveSurfer */}

    const [playPause, setPlayPause] = useState<boolean>(false);
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
      
          newWaveSurfer.load(useCreateBucketUrl(post?.audio_url));
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

    const handleStop = () => {
      if (wavesurfer) {
        wavesurfer.stop();
      }
    };
    const handlePause = () => {
      if (wavesurfer) {
        wavesurfer.playPause();
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
            className={`relative flex flex-col justify-between p-2 mt-5 mb-5 mx-5 object-cover rounded-[20px] max-w-[720px] h-[500px] overflow-hidden`}
        >
          <div className="flex justify-between">
            {/* Profile Image */}
            <div className="cursor-pointer">
                <img className="rounded-[15px] max-h-[50px] w-[50px]" src={useCreateBucketUrl(post?.profile?.image)} />
            </div>

            {/* Name / Trackname */}
            <div className=" bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[54px] flex items-between rounded-xl pt-0.5 ml-2">
                <div className="pl-3 w-full px-2">
                    <div className="flex items-center justify-between pb-0.5">
                        <Link className="text-[#818BAC] size-[15px]" href={`/profile/${post.profile.user_id}`}>
                            <span className="font-bold hover:underline cursor-pointer">
                                {post.profile.name}
                            </span>
                        </Link>
                    </div>
                    <p className="text-[14px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post.trackname}</p>
                </div>
            </div>
            </div>

            {/* Tag */}
            <div className="absolute top-16 left-16 py-1 px-2 bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] flex items-center rounded-lg">
            <p className="text-[13px] text-[#818BAC] hover:text-white cursor-pointer ">#techno</p>
            </div>

            {/* Controls */}
            <div className="wavesurfer-controls absolute z-5 top-[43%] left-[43%] border b-4 border-color-white border-opacity-20 px-10 py-7 rounded-xl">
                <button onClick={handlePause}>
                    <BsFillPlayFill />
                </button>
                <button className="hidden" onClick={handleStop}>
                    <BsFillStopFill />
                </button>
            </div>

            {/* Audio */}
            <div className="flex overflow-hidden h-[40px] mb-16 w-full">
                <div style={{ transform: 'translateY(-40px)' }}>
                    <div ref={waveformRef} className="wavesurfer-container" />
                </div>
            </div>

            {/* comments slider */}

            {/* Buttons like comments share */}
            <div className="absolute w-full h-[60px] bottom-1 left-1">
                <PostMainLikes post={post} />
            </div>

            {/* Stripe Checkout button */}
            <div className="absolute right-2 align-middle top-[30%]">
                <section>
                    <button onClick={handleCheckout} className="py-12 px-4 bg-[#20DDBB] text-white rounded-t-[12px]">
                        Buy
                    </button>
                    <div className="w-auto flex item-center justify-center py-2 px-2 bg-[#438171] text-white text-size-[12px] rounded-b-[12px]">
                        $2
                    </div>
                </section>
            </div>
        </div>
      
        </>
    )
}
