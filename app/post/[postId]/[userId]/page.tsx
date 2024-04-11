"use client"
{/* COMMENT SECTION HEAD */}


import Comments from "@/app/components/post/Comments"
import CommentsHeader from "@/app/components/post/CommentsHeader"
import Link from "next/link"
import { AiOutlineClose } from "react-icons/ai"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { useRouter } from "next/navigation"
import ClientOnly from "@/app/components/ClientOnly"
import { Post, PostPageTypes } from "@/app/types"
import { usePostStore } from "@/app/stores/post"
import { useLikeStore } from "@/app/stores/like"
import { useCommentStore } from "@/app/stores/comment"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import TopNav from "./includes/TopNav"
import { useEffect, useRef, useState } from "react"

import WaveSurfer from "wavesurfer.js"
import {
    BsFillStopFill,
    BsFillPlayFill,
    BsSkipForward,
    BsSkipBackward,
  } from "react-icons/bs";

export default function Post({  post, params }: PostPageTypes) {

   

    let { postById, postsByUser, setPostById, setPostsByUser } = usePostStore()
    let { setLikesByPost } = useLikeStore()
    let { setCommentsByPost } = useCommentStore()

    const router = useRouter()

    useEffect(() => { 
        setPostById(params.postId)
        setCommentsByPost(params.postId) 
        setLikesByPost(params.postId)
        setPostsByUser(params.userId) 
    }, [])

    const loopThroughPostsUp = () => {
        postsByUser.forEach(post => {
            if (post.id > params.postId) {
                router.push(`/post/${post.id}/${params.userId}`)
            }
        });
    }

    const loopThroughPostsDown = () => {
        postsByUser.forEach(post => {
            if (post.id < params.postId) {
                router.push(`/post/${post.id}/${params.userId}`)
            }
        });
    }


   
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
      
          newWaveSurfer.load(useCreateBucketUrl(postById?.audio_url));
          setWaveSurfer(newWaveSurfer);
      
          newWaveSurfer.on("finish", () => {
            console.log("Песня завершена");
          });
      
          newWaveSurfer.on("ready", () => {
            console.log("Волновая форма готова");
          });
      
          const audio = document.getElementById(`audio${postById?.id}`) as HTMLAudioElement;
          {/* Add event listeners to the audio element 
          setTimeout(() => {
            audio.addEventListener('mouseenter', () => { audio.play() });
            audio.addEventListener('mouseleave', () => { audio.pause() });
          }, 50); */}
        }
      
        return () => {
          if (wavesurfer) {
            wavesurfer.destroy();
          }
        };
    }, [postById, useCreateBucketUrl]);

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
            <div className="lg:flex-col w-full h-screen flex items-center justify-between overflow-auto">
            <div 
                id="PostPage" 
                className="lg:flex-col mt-[20px] rounded-xl items-center w-[700px]  h-[200px]  bg-black overflow-hidden "
                style={{ 
                    backgroundImage: `url(${useCreateBucketUrl(postById?.image_url)})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}
            >

              
                <div className="lg:w-[full] h-[20vh] relative">

                    {/* Close button */}
                    <Link
                        href={`/profile/${params?.userId}`}
                        className="absolute text-white z-20 m-5 rounded-xl bg-gray-700 p-1.5 hover:bg-gray-800"
                    >
                        <AiOutlineClose size="20"/>
                    </Link>

                    {/* SLIDE through posts 
                    <div >
                        <button 
                            onClick={() => loopThroughPostsUp()}
                            className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
                        >
                            <BiChevronUp size="30" color="#FFFFFF"/>
                        </button>

                        <button  
                            onClick={() => loopThroughPostsDown()}
                            className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
                        >
                            <BiChevronDown size="30" color="#FFFFFF"/>
                        </button>
                    </div> */}

                    

                      {/* audio */}

                    <div className="wavesurfer-controls absolute z-5 top-[43%] left-[43%] border b-4 border-color-white border-opacity-20 px-10 py-7 rounded-xl">
                        <button onClick={handlePause}>
                            <BsFillPlayFill />
                        </button>
                        <button className="hidden" onClick={handleStop}>
                            <BsFillStopFill />
                        </button>
                        </div>

                    <ClientOnly>
                        {postById?.audio_url ? (
                      
                            <div className="flex overflow-hidden h-[40px] mb-16 w-full">
                                <div style={{ transform: 'translateY(-40px)' }}>
                                    <div ref={waveformRef} className="wavesurfer-container" />
                                </div>
                            </div>

                        ) : null} 

                         <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
                            {postById?.audio_url ? (
                                 <div className="flex overflow-hidden h-[40px] mb-16 w-full">
                                    <div style={{ transform: 'translateY(-40px)' }}>
                                        <div ref={waveformRef} className="wavesurfer-container" />
                                    </div>
                                </div>
                  
                            ) : null}
                        </div>
                    </ClientOnly>

                </div>
                </div>


                {/* Comments */}

                <div id="InfoSection" className="absolute top-0 right-2 lg:max-w-[full] rounded-xl h-[80vh] bg-[#]">
                    <div className="py-7" />

                        <ClientOnly>
                            {postById ? (
                                <CommentsHeader post={postById} params={params}/>
                            ) : null}
                        </ClientOnly>
                      
 
                </div>
                <div id="InfoSection" className="relative lg:max-w-[full]  w-[700px] rounded-xl h-[80vh] mt-6 bg-[#]">
                  

                    
                        <Comments params={params}/>
 
                </div>
            </div>
         
        </>
    )
}
