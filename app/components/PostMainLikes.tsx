import { AiFillHeart } from "react-icons/ai"
import { FaShare, FaCommentDots, FaBuyNLarge } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useUser } from "../context/user"
import { BiLoaderCircle } from "react-icons/bi"
import { useGeneralStore } from "../stores/general"
import { useRouter } from "next/navigation"
import { Comment, Like, PostMainLikesCompTypes } from "../types"
import useGetCommentsByPostId from "../hooks/useGetCommentsByPostId"
import useGetLikesByPostId from "../hooks/useGetLikesByPostId"
import useIsLiked from "../hooks/useIsLiked"
import useCreateLike from "../hooks/useCreateLike"
import useDeleteLike from "../hooks/useDeleteLike"
import ShareModal from '@/app/components/ShareModal';


export default function PostMainLikes({ post }: PostMainLikesCompTypes) {


    let { setIsLoginOpen } = useGeneralStore();

    const router = useRouter()
    const contextUser = useUser()
    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false)
    const [userLiked, setUserLiked] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[]>([])
    const [likes, setLikes] = useState<Like[]>([])
    const user = useUser();




    {/*SHARE  
    const shareOnTelegram = (postId: string, trackImageUrl: string, trackTitle: string) => {
        const telegramUrl = `https://t.me/share/url?url=https://yourwebsite.com/posts/${postId}&text=${trackTitle} Слушайте новые эксклюзивные треки на Sacral Track&photo=${trackImageUrl}&w=600&h=340`;
        window.open(telegramUrl, '_blank');
    }; */}
    
    //Share modal
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const handleShareClick = () => {
        setIsShareModalOpen(true);
      };
    
      const handleCloseShareModal = () => {
        setIsShareModalOpen(false);
      };
    
    //Likes
    useEffect(() => { 
        getAllLikesByPost()
        getAllCommentsByPost()
    }, [post])

    useEffect(() => { hasUserLikedPost() }, [likes, contextUser])

    const getAllCommentsByPost = async () => {
        let result = await useGetCommentsByPostId(post?.id)
        setComments(result)
    }

    const getAllLikesByPost = async () => {
        let result = await useGetLikesByPostId(post?.id)
        setLikes(result)
    }

    const hasUserLikedPost = () => {
        if (!contextUser) return

        if (likes?.length < 1 || !contextUser?.user?.id) {
            setUserLiked(false)
            return
        }
        let res = useIsLiked(contextUser?.user?.id, post?.id, likes)
        setUserLiked(res ? true : false)
    }

    const like = async () => {
        setHasClickedLike(true)
        await useCreateLike(contextUser?.user?.id || '', post?.id)
        await getAllLikesByPost()
        hasUserLikedPost()
        setHasClickedLike(false)
    }

    const unlike = async (id: string) => {
        setHasClickedLike(true)
        await useDeleteLike(id)
        await getAllLikesByPost()
        hasUserLikedPost()
        setHasClickedLike(false)
    }

    const likeOrUnlike = () => {
        if (!contextUser?.user?.id) {
            setIsLoginOpen(true)
            return
        }
        
        let res = useIsLiked(contextUser?.user?.id, post?.id, likes)

        if (!res) {
            like()
        } else {
            likes.forEach((like: Like) => {
                if (contextUser?.user?.id == like?.user_id && like?.post_id == post?.id) {
                    unlike(like?.id) 
                }
            })
        }
    }

    return (
        <>
            <div id={`PostMainLikes-${post?.id}`} className="relative w-full justify-between">
                <div className="pb-4 text-center flex w-full h-full ">

                        {/* BUY BTN */}
                        
                        <div className="flex justify-between w-full">


                           {/* <div className="absolute right-0 rounded-[20px] bg-[#272B43] p-4 cursor-pointer">
                            <FaBuyNLarge size="25"/>
                            </div>
                            <span className="text-xs text-gray-800 font-semibold flex-grow">55</span> */}

                            <button 
                            disabled={hasClickedLike}
                            onClick={() => likeOrUnlike()} 
                            className="h-[50px] flex  rounded-xl bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] p-4 cursor-pointer"
                            >
                            {!hasClickedLike ? (
                                <AiFillHeart color={likes?.length > 0 && userLiked ? '#FF0000' : ''} size="18"/>
                            ) : (
                                <BiLoaderCircle className="animate-spin" size="16"/>
                            )}
                            <span className="text-xs text-white font-semibold 
                            flex-grow ml-2">
                            {likes?.length}
                            </span>
                            </button>
                            

                            <button 
                            onClick={() => router.push(`/post/${post?.id}/${post?.profile?.user_id}`)} 
                            className="flex h-[50px] rounded-xl  bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] p-4 cursor-pointer"
                            >
                            <img src="/images/comments.svg" className="w-[16px] h-[16px]"/>
                            <span className="text-xs text-white font-semibold flex-grow ml-2">{comments?.length}</span>

                            </button>

                            <button onClick={handleShareClick} className="justify-end flex h-[50px] rounded-xl  bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] p-4 cursor-pointer">
                            <img src="/images/share.svg" className="w-[16px] h-[16px]"/>
                            {/* <span className="text-xs text-white font-semibold flex-grow ml-2"></span>*/}
                            </button>
                           
                        </div>
                        </div>
                </div>

                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={handleCloseShareModal}
                    postId={post.id}
                    userId={user?.id ?? ''} 
                    trackImageUrl={post.image_url}
                    trackTitle={post.trackname}
                />
        </>
    )
}
