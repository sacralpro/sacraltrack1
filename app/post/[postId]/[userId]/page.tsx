"use client"
{/* COMMENT SECTION HEAD */}

import { useEffect, useRef, useState } from "react"
import Comments from "@/app/components/post/Comments"
import CommentsHeader from "@/app/components/post/CommentsHeader"
import Link from "next/link"
import { AiOutlineClose } from "react-icons/ai"
import { useRouter } from "next/navigation"
import ClientOnly from "@/app/components/ClientOnly"
import { PostPageTypes } from "@/app/types"
import { usePostStore } from "@/app/stores/post"
import { useLikeStore } from "@/app/stores/like"
import { useCommentStore } from "@/app/stores/comment"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
//import TopNav from "./includes/TopNav"

import WaveSurfer from "wavesurfer.js"
import {
    BsFillStopFill,
    BsFillPlayFill,
    BsSkipForward,
    BsSkipBackward,
  } from "react-icons/bs";

  
  export default function Post({ params }: PostPageTypes) {


   

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
      
          if (postById?.mp3_url) {
            newWaveSurfer.load(useCreateBucketUrl(postById.mp3_url));
          }
      
          newWaveSurfer.on("finish", () => {
            console.log("Song finished");
          });
      
          newWaveSurfer.on("ready", () => {
            console.log("Waveform ready");
          });
      
          setWaveSurfer(newWaveSurfer);
        }
      
        return () => {
          if (wavesurfer) {
            wavesurfer.destroy();
          }
        };
      }, [postById]);

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
            <div className="lg:flex-col w-full h-screen md:flex px-[20px]  items-center justify-between overflow-auto">
            <div 
                id="PostPage" 
                className="lg:flex-col mt-[20px] rounded-2xl items-center w-max-[100%] md:w-[700px]  h-[200px]  bg-black overflow-hidden "
                style={{ 
                    backgroundImage: `url(${postById?.image_url ? useCreateBucketUrl(postById.image_url) : ''})`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}
            >

              
                <div className="lg:w-[full] h-[20vh] md:w-full  relative">

                    {/* Close button */}
                    <Link
                     //   href={`/profile/${params?.userId}`}
                     href={`/`}
                        className="absolute text-white z-20 m-5 rounded-xl bg-gray-700 p-1.5 hover:bg-gray-800 opacity-90"
                    >
                        <AiOutlineClose size="18"/>
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

                    <div className="wavesurfer-controls absolute z-5 top-0 m-[-6px] right-0  px-10 py-7 rounded-xl">
                    <button onClick={handlePause}>
                    {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
                    </button>
                        </div>

                    <ClientOnly>
                        {postById?.mp3_url ? (
                      
                            <div className="flex overflow-hidden h-[40px] mb-16 w-full">
                                <div style={{  }}>
                                    <div ref={waveformRef} className="wavesurfer-container" />
                                </div>
                            </div>

                        ) : null} 

                         <div className="lg:min-w-[480px] z-10 relative">
                            {postById?.mp3_url ? (
                                 <div className="flex overflow-hidden h-[40px] mb-16 w-full">
                                    <div style={{  }}>
                                        <div ref={waveformRef} className="wavesurfer-container" />
                                    </div>
                                </div>
                  
                            ) : null}
                        </div>
                    </ClientOnly>

                </div>
                </div>


                {/* Comments */}

                <div id="InfoSection" className="absolute top-0 right-2 lg:max-w-[full] rounded-2xl h-[80vh] bg-[#]">
                    <div className="mt-[20px]" />

                        <ClientOnly>
                            {postById ? (
                                <CommentsHeader post={postById} params={params}/>
                            ) : null}
                        </ClientOnly>
                      
 
                </div>
                <div id="InfoSection" className="relative lg:max-w-[full]  w-max-[100%] md:w-[700px]  rounded-2xl h-[80vh] mt-2 bg-[#] ">
                  

                    
                        <Comments params={params}/>
 
                </div>
            </div>
         
        </>
    )
}
