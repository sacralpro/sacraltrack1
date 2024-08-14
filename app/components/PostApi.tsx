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

export default function PostMain() {

    const pathname = usePathname();

    {/*Add to cart */}
    
    const { addItemToCart } = useContext(CartContext);

    const addToCartHandler = (track: any) => {
        addItemToCart({
        product: track.id,
        name: track.attributes.name,
        image: track.attributes.images.coverart,
        audio: track.attributes.previews[0].url,
        user: track.attributes.artistId,
        price: 0.99, // Assuming a fixed price for now
        });
        console.log("added to cart");
        toast.success("Added to cart");
    };
    
    {/* WaveSurfer */}

    const [isPlaying, setIsPlaying] = useState(false);

    const waveformRef = useRef<HTMLDivElement>(null);
    const [wavesurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
    
    useEffect(() => {
      const fetchTracks = async () => {
        try {
          const response = await fetch("https://shazam-api6.p.rapidapi.com/shazam/top_tracks_city?city_name=Moscow&city_name=Moscow&country_code=RU&country_code=RU&limit=10", {
            method: 'GET',
            headers: {
              'x-rapidapi-key': 'b86b4a1c60msh15aa7380a612681p1990bejsn385e63344ab6',
              'x-rapidapi-host': 'shazam-api6.p.rapidapi.com'
            }
          });
    
          if (response.ok) {
            const result = await response.json();
            setTracks(result.result.data);
    
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
    
              newWaveSurfer.load(useCreateBucketUrl(tracks[0]?.attributes.previews[0].url));
              setWaveSurfer(newWaveSurfer);
    
              newWaveSurfer.on("finish", () => {
                console.log("song finished");
              });
    
              newWaveSurfer.on("ready", () => {
                console.log("Waveform is ready");
              });
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
    
      fetchTracks();
    
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

    // Rapid API data
    const [tracks, setTracks] = useState<any[]>([]);

    useEffect(() => {
        const fetchTracks = async () => {
        try {
            const response = await fetch("https://shazam-api6.p.rapidapi.com/shazam/top_tracks_city?city_name=Moscow&city_name=Moscow&country_code=RU&country_code=RU&limit=10", {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b86b4a1c60msh15aa7380a612681p1990bejsn385e63344ab6',
                'x-rapidapi-host': 'shazam-api6.p.rapidapi.com'
                }
                });

            if (response.ok) {
            const result = await response.json();
            setTracks(result.result.data);
            }
            } catch (err) {
            console.error(err);
            }
            };

            fetchTracks();
            }, []);

            return (
            <>
            {tracks.map((track) => (
  <div key={track.id} className={`relative flex flex-col justify-between p-2 mt-5 mb-5 mx-5 object-cover 
  rounded-[20px] h-[500px] overflow-hidden ${pathname === '/' ? 'lg:w-[700px]' : 'lg:w-[500px]'}`}>
    <div className="flex justify-between">
      {/* Profile Image */}
      <div className="cursor-pointer">
        {track.attributes.images?.coverart && (
          <img className="rounded-[15px] max-h-[50px] w-[50px]" src={track.attributes.images.coverart} />
        )}
      </div>

      {/* Name / Trackname */}
      <div className=" bg-[#272B43]/95 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[50px] flex items-between rounded-xl ml-2">
        <div className="pl-3 w-full px-2">
          <div className="flex items-center justify-between">
            <Link className="text-[#818BAC] size-[15px]" href={`/profile/${track.attributes.artistId}`}>
              <span className="font-bold hover:underline cursor-pointer">
                {track.attributes.artistName}
              </span>
            </Link>
          </div>
          <p className="text-[14px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{track.attributes.name}</p>
        </div>
      </div>
    </div>

    {/* Controls */}
    <div className="wavesurfer-controls absolute z-5 top-[43%] left-[43%] {/*border b-4*/} border-color-white border-opacity-20 px-10 py-7 rounded-xl">
      <button onClick={handlePause}>
        {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
      </button>
    </div>

    {/* Audio */}
    <div className="flex overflow-hidden h-[40px] mb-16 w-full">
      <div style={{ transform: 'translateY(-40px)' }}>
        <div ref={waveformRef} className="wavesurfer-container" />
      </div>
    </div>

    {/* Buttons like comments share */}
    <div className="absolute w-full h-[60px] bottom-1 justify-between pr-4">
      <PostMainLikes post={tracks[0]} />
    </div>

            {/* Add to cart */}
            
            </div>

            ))}
            </>
            );
            }


