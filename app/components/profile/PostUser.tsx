
import { useEffect, useRef, useState } from "react"
//import { PostMainCompTypes } from "../types"
import PostMainLikes from "@/app/components/PostMainLikes"
import Link from "next/link"
import { useUser } from "@/app/context/user"
import { useRouter } from "next/navigation"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { PostUserCompTypes } from "@/app/types"
import toast from 'react-hot-toast';
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
  const [isDeleteing, setIsDeleteing] = useState<boolean>(false); // изменено на isDeleteing

  const handleDeletePost = async () => {
    let res = confirm('Are you sure you want to delete this post?');
    if (!res) return;

    setIsDeleteing(true); // изменено на isDeleteing

    try {
      await useDeletePostById(params?.postId, post?.audio_url);
      router.push(`/profile/${params.userId}`);
      setIsDeleteing(false); // изменено на isDeleteing
      toast.success('Your release will be removed after the page refreshes.', { duration: 7000 }); // Показывать сообщение в течение 1 секунды
    } catch (error) {
      console.log(error);
      setIsDeleteing(false); // изменено на isDeleteing
      toast.error('An error occurred while deleting the post.', { duration: 7000 }); // Показывать сообщение в течение 1 секунды

      
    }
  };


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
            id={`PostUser-${post.id}`}
            style={{
                backgroundImage: `url(${useCreateBucketUrl(post?.image_url)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className={`relative flex flex-col justify-between p-2 mb-5 mt-2 object-cover rounded-2xl md:mr-[0px] mr-[40px] md:w-[500px] w-[220px] h-[500px] overflow-hidden`}
        >

           
            
            {/* Name / Trackname */}
            <div className=" bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[54px] flex items-between rounded-2xl pt-0.5">
                
                  {/* Profile Image
                <div className="cursor-pointer">
                    <img className="rounded-[15px] max-h-[50px] w-[50px]" src={useCreateBucketUrl(post?.profile?.image)} />
                </div> */}

                <div className="pl-3 w-full px-2">
                    <div className="flex items-center justify-between pb-0.5">

                    {post && post.profile && (
              <Link className="text-[#818BAC] size-[15px]" href={`/profile/${post.profile.user_id}`}>
                  <span className="font-bold hover:underline cursor-pointer">
                      {post.profile.name}
                  </span>
              </Link>
          )}
                    </div>
                    <p className="text-[14px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post.text}</p>
                </div>

                <button disabled={isDeleteing} onClick={() => handleDeletePost()}>
                     <img src="/images/del.svg" alt="del" className="w-[18px] h-[18px] cursor-pointer opacity-80 hover:opacity-100 rounded-full mr-5" />
                      </button>

          {/* MORE dropdown 
              <div className="relative inline-block text-left">
              <button onClick={handleToggle} type="button" className="inline-flex justify-center mt-2 mr-2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-black text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <BsThreeDotsVertical />
              </button>

          {isOpen && (
            <div className="origin-top-left absolute left-0 mt-2 w-[100px] rounded-md shadow-lg bg-[#272B43] ring-1 ring-black ring-opacity-5">
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
        </div>*/}

            </div> 
    


                {/* Controls */}
                <div className="wavesurfer-controls absolute z-5 top-[43%] left-[43%] {/*border b-4*/} border-color-white border-opacity-20 px-10 py-7 rounded-xl">
                <button onClick={handlePause}>
                    {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
                </button>
            </div>

            {/* Audio */}
            <div className="flex overflow-hidden h-[40px] mb-16 w-full">
                <div style={{  }}>
                    <div ref={waveformRef} className="wavesurfer-container" />
                </div>
            </div>

            <div className="absolute w-[97%] h-[60px] bottom-1">
                <PostMainLikes post={post} />
            </div>
        
        
        
         
        </div>
        
        </>
    )
}
