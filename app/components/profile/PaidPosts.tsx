import React, { useState, useEffect, useRef } from 'react';
import useGetPaidPostByUserId, { PaidPostData } from '@/app/hooks/useGetPaidPostByUserId';
import useGetAllPostsForDownloads from '@/app/hooks/useGetAllPostsForDownloads';
import WaveSurfer from "wavesurfer.js"
import { BsFillStopFill, BsFillPlayFill, BsDownload } from 'react-icons/bs';
import { AiOutlineLike, AiOutlineComment } from 'react-icons/ai';
import PostMainLikes from '../PostMainLikes';
import Link from "next/link"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { usePaidPostStore } from '@/app/stores/usePaidPostStore';
import useFileDownload from '@/app/hooks/useFileDownload';
import { PostWithProfile } from '@/app/types';
import { client, storage } from '@/libs/AppWriteClient';







interface PaidPostsProps {
  userId: string;
  posts: Post[];
}

interface Post {
  id: string;
  user_id: string;
  audio_url: string;
  mp3_url: string;
  trackname: string;
  image_url: string;
  text: string;
  created_at: string;
  price: number;
  genre: string;
  likes: number;
  comments: number;
  profile: {
    id: string;
    user_id: string;
    name: string;
    image: string;
  };
}

const PaidPosts: React.FC<PaidPostsProps> = ({ userId, posts }) => {
  const { paidPosts, setPaidPosts } = usePaidPostStore();

  const [isLoading, setIsLoading] = useState(false);

  {/* Download Wav */}
  const handleDownload = async (post: Post) => {
    setIsLoading(true);
    try {
      const result = await storage.getFileDownload(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        post.audio_url
      );

      // Создаем ссылку для скачивания файла
      const downloadLink = document.createElement('a');
      downloadLink.href = result.href;
      downloadLink.setAttribute('download', post.trackname);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    setPaidPosts(userId);
  }, [userId, setPaidPosts]);

  // WaveSurfer
  const waveformRef = useRef<HTMLDivElement>(null);
  //const [wavesurfers, setWavesurfers] = useState<{ [key: string]: any }>({});

  const [wavesurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

      paidPosts.forEach((post) => {
        if (post && post.mp3_url) {
          newWaveSurfer.load(useCreateBucketUrl(post.mp3_url));
        }
      });

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
  }, [paidPosts]);
  
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
    {paidPosts.map((post, index) => (
      <div
        key={index}
        id={`PostMain-${post?.id}`}
        style={{
          backgroundImage: `url(${useCreateBucketUrl(post?.image_url as string)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className={`relative flex flex-col justify-between p-2 mt-5 mb-5 mx-5 object-cover rounded-[20px] md:mr-[0px] mr-[40px] md:w-[500px] w-[240px] h-[500px] overflow-hidden`}
      >
        <div className="flex justify-between">
          {/* Profile Image */}
          <div className="cursor-pointer">
            <img
              className="rounded-[15px] max-h-[50px] w-[50px]"
              src={useCreateBucketUrl(post?.profile.image as string)}
            />
          </div>

          {/* Name / Trackname */}
          <div className="bg-[#272B43]/95 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[50px] flex items-between rounded-xl ml-2">
            <div className="pl-3 w-full px-2">
              <div className="flex items-center justify-between">
                <Link
                  className="text-[#818BAC] size-[15px]"
                  href={`/profile/${post?.user_id}`}
                >
                  <span className="font-bold hover:underline cursor-pointer">
                  {post?.profile.name}
                  </span>
                </Link>
              </div>
              <p className="text-[14px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">
                {post?.text}
              </p>
            </div>
          </div>
        </div>

        {/* Genre */}
        <div className="absolute top-16 left-16 py-1 px-2 bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] flex items-center rounded-lg">
          <p className="text-[13px] text-[#818BAC] hover:text-white cursor-pointer ">
            {post?.genre}
          </p>
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

            {/* comments slider */}

            {/* Buttons like comments share */}
            <div className="absolute w-full h-[60px] bottom-1 justify-between pr-4">



            <PostMainLikes post={{ ...post, id: post?.id ?? '', profile: { user_id: post?.user_id ?? '', name: post?.profile.name ?? '', image: post?.profile.image ?? '' } } as PostWithProfile} />



            </div>
         {/* Download button*/}
         <div className="absolute right-2 align-middle top-[30%]">
            <section>
              
            <button
            className={`bg-[#272B43]/95 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] rounded-lg px-3 py-2 text-[#818BAC] hover:text-white cursor-pointer ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleDownload(post as Post)}
            disabled={isLoading}
            >
              <BsDownload />
            </button>



            </section>
          </div>
        </div>
      ))}
    </>
  );
};

export default PaidPosts;