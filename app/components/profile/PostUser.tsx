"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import PostMainLikes from "@/app/components/PostMainLikes";
import Link from "next/link";
import { useUser } from "@/app/context/user";
import { useRouter } from "next/navigation";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { PostUserCompTypes } from "@/app/types";
import toast from "react-hot-toast";
import useDeletePostById from "@/app/hooks/useDeletePostById";
import WaveSurfer from "wavesurfer.js";
import {
  BsThreeDotsVertical,
  BsFillStopFill,
  BsFillPlayFill,
  BsSkipForward,
  BsSkipBackward,
} from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PostUser = memo(({ post, params }: PostUserCompTypes) => {
  const router = useRouter();
  const contextUser = useUser();

  // DELETE POST
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeletePost = useCallback(async () => {
    let res = confirm("Are you sure you want to delete this post?");
    if (!res) return;

    setIsDeleting(true);

    try {
      await useDeletePostById(params?.postId, post?.audio_url);
      router.push(`/profile/${params.userId}`);
      setIsDeleting(false);
      toast.success("Your release will be removed after the page refreshes.", {
        duration: 7000,
      });
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
      toast.error("An error occurred while deleting the post.", {
        duration: 7000,
      });
    }
  }, [params, post, router]);

  // DROPDOWN
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    console.log(`Clicked on ${item}`);
  };

  const handleToggle = () => {
    console.log("Button clicked");
    setIsOpen(!isOpen);
  };

  // WaveSurfer
  const [isPlaying, setIsPlaying] = useState(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const [wavesurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && waveformRef.current) {
          // Если элемент находится в видимой области экрана
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
            console.log("Песня закончилась");
          });
  
          newWaveSurfer.on("ready", () => {
            console.log("Волновая форма готова");
          });
        } else {
          // Если элемент находится за пределами видимой области экрана
          if (wavesurfer) {
            wavesurfer.destroy();
            setWaveSurfer(null);
          }
        }
      },
      { threshold: 0.1 }
    );
  
    waveformRef.current && observer.observe(waveformRef.current);
  
    return () => {
      observer.disconnect();
    };
  }, [post?.mp3_url]);
  
  // WaveSurfer PlayPause
  const handlePause = useCallback(() => {
    if (wavesurfer) {
      if (isPlaying) {
        wavesurfer.stop();
        setIsPlaying(false);
      } else {
        wavesurfer.playPause();
        setIsPlaying(true);
      }
    }
  }, [isPlaying, wavesurfer]);
  

  return (
    <>
      <div
        id={`PostUser-${post.id}`}
        style={{
          backgroundImage: `url(${useCreateBucketUrl(post?.image_url)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`relative flex flex-col justify-between p-2 mb-5 mt-2 object-cover rounded-2xl md:mr-[0px] mr-[40px] md:w-[500px] w-[220px] h-[500px] overflow-hidden`}
      >
        {/* Name / Trackname */}
        <div className=" bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[54px] flex items-center rounded-2xl pt-0.5">
          {post && post.profile && (
            <Link
              className="text-[#818BAC] size-[15px]"
              href={`/profile/${post.profile.user_id}`}
            >
              <span className="font-bold hover:underline cursor-pointer">
                {post.profile.name}
              </span>
            </Link>
          )}

          <div className="pl-3 w-full px-2">
            <div className="flex items-center justify-between pb-0.5">
              <p className="text-[14px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">
                {post.text}
              </p>
            </div>
          </div>

          <button disabled={isDeleting} onClick={handleDeletePost}>
            <img
              src="/images/del.svg"
              alt="del"
              className="w-[18px] h-[18px] cursor-pointer opacity-80 hover:opacity-100 rounded-full mr-5"
            />
          </button>
        </div>

        {/* Controls */}
        <div className="wavesurfer-controls absolute z-5 top-[43%] left-[43%] border-color-white border-opacity-20 px-10 py-7 rounded-xl">
          <button onClick={handlePause}>
            {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
          </button>
        </div>

        {/* Audio */}
        <div className="flex overflow-hidden h-[40px] mb-16 w-full">
          <div>
            <div ref={waveformRef} className="wavesurfer-container" />
          </div>
        </div>

        <div className="absolute w-[97%] h-[60px] bottom-1">
          <PostMainLikes post={post} />
        </div>
      </div>
    </>
  );
});

export default PostUser;
