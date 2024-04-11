
import { useEffect, useRef, useState } from "react"
//import { PostMainCompTypes } from "../types"
//import PostMainLikes from "./PostMainLikes"
import Link from "next/link"
import { useUser } from "@/app/context/user"
import { useRouter } from "next/navigation"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { PostUserCompTypes } from "@/app/types"
import useDeletePostById from "@/app/hooks/useDeletePostById" // Assuming the correct import path
import WaveSurfer from "wavesurfer.js"
import {
  BsThreeDotsVertical,
    BsFillStopFill,
    BsFillPlayFill,
    BsSkipForward,
    BsSkipBackward,
  } from "react-icons/bs";

export default function PostUser({ post, params }: PostUserCompTypes) {

  const router = useRouter()
  const contextUser = useUser()

  {/* DELETE POST */}
  const [isDeleteing, setIsDeleteing] = useState<boolean>(false)

  const handleDeletePost = async () => {
    let res = confirm('Are you sure you want to delete this post?')
    if (!res) return

    setIsDeleteing(true)

    try {
        await useDeletePostById(params?.postId, post?.audio_url)
        router.push(`/profile/${params.userId}`)
        setIsDeleteing(false)
    } catch (error) {
        console.log(error)
        setIsDeleteing(false)
        alert(error)
    }
}


   {/* DROPDOWN */}
   const [isOpen, setIsOpen] = useState(false);

  
    const handleItemClick = (item: string) => {
        console.log(`Clicked on ${item}`);
    };

    const handleToggle = () => {
      console.log('Button clicked');
      setIsOpen(!isOpen);
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
            console.log("Песня завершена");
          });
      
          newWaveSurfer.on("ready", () => {
            console.log("Волновая форма готова");
          });
      
          const audio = document.getElementById(`audio${post?.id}`) as HTMLAudioElement;
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
      }, [post, useCreateBucketUrl]);

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
            id={`PostUser-${post.id}`}
            style={{
                backgroundImage: `url(${useCreateBucketUrl(post?.image_url)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className={`relative flex flex-col justify-between p-2 mt-5 mb-5 object-cover rounded-[20px] w-md:max-w-[500px] max-w-[720px] h-[500px] overflow-hidden`}
        >
            
            {/* Name / Trackname */}
            <div className=" bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[54px] flex items-between rounded-xl pt-0.5 ml-2">
                <div className="pl-3 w-full px-2">
                    <div className="flex items-center justify-between pb-0.5">
                    {post.profile && (
                        <Link className="text-[#818BAC] size-[15px]" href={`/profile/${post.profile.user_id}`}>
                            <span className="font-bold hover:underline cursor-pointer">
                                {post.profile.name}
                            </span>
                        </Link>
                    )}
                    </div>
                    <p className="text-[14px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post.trackname}</p>
                </div>
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


            {/* waveform */}
            <div className="flex overflow-hidden h-[40px] mb-16 w-full">
                <div style={{ transform: 'translateY(-40px)' }}>
                    <div ref={waveformRef} className="wavesurfer-container" />
                </div>
            </div>

            {/* Buttons like comments share
            <div className="absolute w-full h-[60px] bottom-1 left-1">
                <PostMainLikes post={post} />
            </div>
        */} 
        
        {/* MORE dropdown */}
        <div className="relative inline-block text-left">
          <button onClick={handleToggle} type="button" className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <BsThreeDotsVertical />
          </button>

          {isOpen && (
              <div className="origin-top-right mt-[-200px] absolute flex z-50 mt-2 w-[100px] rounded-md shadow-lg bg-[#272B43] ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button onClick={() => handleItemClick('Item 1')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Item 1</button>
                      {contextUser?.user?.id == post?.user_id ? (
                    <div>
                        {isDeleteing ? (
                            <div className="animate-spin" />
                        ) : (
                            <button disabled={isDeleteing} onClick={() => handleDeletePost()}>
                                <div className="cursor-pointer" /> Delete
                            </button>
                        )}
                    </div>
                ) : null}
                  </div>
              </div>
          )}
      </div>
      
     

        
        </div>
        
        </>
    )
}
