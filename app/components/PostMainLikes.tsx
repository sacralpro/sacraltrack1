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

export default function PostMainLikes({ post }: PostMainLikesCompTypes) {

    let { setIsLoginOpen } = useGeneralStore();

    const router = useRouter()
    const contextUser = useUser()
    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false)
    const [userLiked, setUserLiked] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[]>([])
    const [likes, setLikes] = useState<Like[]>([])

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
                <div className="bottom-0 pl-4">
                <div className="pb-4 text-center flex w-full h-full ">

                        {/* BUY BTN */}
                        
                        <div className="bottom-0 pl-2 flex items-center space-x-2"> 
                        <div className="w-full flex items-center space-x-2">

                           {/* <div className="absolute right-0 rounded-[20px] bg-[#272B43] p-4 cursor-pointer">
                            <FaBuyNLarge size="25"/>
                            </div>
                            <span className="text-xs text-gray-800 font-semibold flex-grow">55</span> */}

                            <button 
                            disabled={hasClickedLike}
                            onClick={() => likeOrUnlike()} 
                            className="flex-grow rounded-xl bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] p-4 cursor-pointer"
                            >
                            {!hasClickedLike ? (
                                <AiFillHeart color={likes?.length > 0 && userLiked ? '#FF0000' : ''} size="25"/>
                            ) : (
                                <BiLoaderCircle className="animate-spin" size="16"/>
                            )}
                            </button>
                            <span className="text-xs text-white font-semibold flex-grow">
                            {likes?.length}
                            </span>

                            <button 
                            onClick={() => router.push(`/post/${post?.id}/${post?.profile?.user_id}`)} 
                            className="flex-grow rounded-xl  bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] p-4 cursor-pointer"
                            >
                            <img src="/images/comments.svg" className="w-[16px] h-[16px]"/>
                            </button>
                            <span className="text-xs text-white font-semibold flex-grow">{comments?.length}</span>

                            <button className="justify-end flex-grow rounded-xl  bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] p-4 cursor-pointer">
                            <img src="/images/share.svg" className="w-[16px] h-[16px]"/>
                            </button>
                            <span className="text-xs text-white font-semibold flex-grow">55</span>
                        </div>
                        </div>
                </div>
                </div>
            </div>
        </>
    )
}
