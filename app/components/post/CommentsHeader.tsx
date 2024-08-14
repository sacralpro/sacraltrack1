"use client"

{/* COMMENTS RIGHT SECTION */}

import Link from "next/link"
import { AiFillHeart } from "react-icons/ai"
import { BsChatDots, BsTrash3 } from "react-icons/bs"
import { ImMusic } from "react-icons/im"
import moment from "moment"
import { useUser } from "@/app/context/user"
import { useEffect, useState } from "react"
import { BiLoaderCircle } from "react-icons/bi"
import ClientOnly from "../ClientOnly"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { useLikeStore } from "@/app/stores/like"
import { useCommentStore } from "@/app/stores/comment"
import { useGeneralStore } from "@/app/stores/general"
import { useRouter } from "next/navigation"
import useIsLiked from "@/app/hooks/useIsLiked"
import useCreateLike from "@/app/hooks/useCreateLike"
import useDeleteLike from "@/app/hooks/useDeleteLike"
import useDeletePostById from "@/app/hooks/useDeletePostById"
import { CommentsHeaderCompTypes } from "@/app/types"

export default function CommentsHeader({ post, params }: CommentsHeaderCompTypes) {

    let { setLikesByPost, likesByPost } = useLikeStore()
    let { commentsByPost, setCommentsByPost } = useCommentStore()
    let { setIsLoginOpen } = useGeneralStore()

    const contextUser = useUser()
    const router = useRouter()
    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false)
    const [isDeleteing, setIsDeleteing] = useState<boolean>(false)
    const [userLiked, setUserLiked] = useState<boolean>(false)

    useEffect(() => { 
        setCommentsByPost(params?.postId) 
        setLikesByPost(params?.postId)
    }, [post])
    useEffect(() => { hasUserLikedPost() }, [likesByPost])
    
    const hasUserLikedPost = () => {
        if (likesByPost.length < 1 || !contextUser?.user?.id) {
            setUserLiked(false)
            return
        }
        let res = useIsLiked(contextUser.user.id, params.postId, likesByPost)
        setUserLiked(res ? true : false)
    }

    const like = async () => {
        try {
            setHasClickedLike(true)
            await useCreateLike(contextUser?.user?.id || '', params.postId)
            setLikesByPost(params.postId)
            setHasClickedLike(false)
        } catch (error) {
            console.log(error)
            alert(error)
            setHasClickedLike(false)
        }
    }

    const unlike = async (id: string) => {
        try {
            setHasClickedLike(true)
            await useDeleteLike(id)
            setLikesByPost(params.postId)
            setHasClickedLike(false)
        } catch (error) {
            console.log(error)
            alert(error)
            setHasClickedLike(false)
        }
    }

    const likeOrUnlike = () => {
        if (!contextUser?.user) return setIsLoginOpen(true)

        let res = useIsLiked(contextUser.user.id, params.postId, likesByPost)
        if (!res) {
            like()
        } else {
            likesByPost.forEach(like => {
                if (contextUser?.user?.id && contextUser.user.id == like.user_id && like.post_id == params.postId) {
                    unlike(like.id) 
                }
            })
        }
    }

    const deletePost = async () => {
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
    return (
        <>  
        <div className="bg-[#1A2338] py-5 rounded-2xl mt-2 mr-[20px] md:block hidden">

            <div className="flex w-[320px] items-center justify-between px-2 bg-[#1A2338]">
                <div className="flex items-center">
                    <Link href={`/profile/${post?.user_id}`}>
                        {post?.profile.image ? (
                            <img className="rounded-2xl lg:mx-0 mx-auto" width="50" src={useCreateBucketUrl(post?.profile.image)} />
                        ) : (
                            <div className="w-[50x] h-[50px] bg-gray-200 rounded-2xl"></div>
                        )}
                    </Link>
                    <div className="ml-3 pt-0.5">

                        <Link 
                            href={`/profile/${post?.user_id}`} 
                            className="relative z-10 text-[15px] font-semibold hover:underline"
                        >
                            {post?.profile.name}
                        </Link>

                        <div className="relative z-0 text-[13px] -mt-5 font-light">

                            <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5 ">.</span>
                            <span className="font-medium text-[#8F9BB3]">{moment(post?.created_at).calendar()}</span>
                        </div>
                    </div>
                </div>
                
                {/*<></>
                {contextUser?.user?.id == post?.user_id ? (
                    <div>
                        {isDeleteing ? (
                            <BiLoaderCircle className="animate-spin" size="25"/>
                        ) : (
                            <button disabled={isDeleteing} onClick={() => deletePost()}>
                                <BsTrash3 className="cursor-pointer" size="25"/>
                            </button>
                        )}
                    </div>
                ) : null} */}
            </div>

            <p className="px-8 mt-4 text-sm">{post?.text}</p>

            <p className="flex item-center gap-2 px-8 mt-6 text-sm font-bold">
                <ImMusic size="17"/>
                <span className="text-[#8F9BB3]">Track name</span>
                {post?.profile.name}
               
            </p>

            <div className="flex items-center px-8 mt-8 ">
                <ClientOnly>
                    <div className="pb-4 text-center flex items-center">
                        <button 
                            disabled={hasClickedLike}
                            onClick={() => likeOrUnlike()} 
                            className="rounded-xl bg-[#313451] p-5 cursor-pointer"
                        >
                            {!hasClickedLike ? (
                                <AiFillHeart color={likesByPost.length > 0 && userLiked ? '#ff2626' : ''} size="18"/>
                            ) : (
                                <BiLoaderCircle className="animate-spin" size="18"/>
                            )}
                        </button>
                        <span className="text-xs pl-2 pr-4 text-white font-semibold">
                            {likesByPost.length}
                        </span>
                    </div>
                </ClientOnly>

                <div className="pb-4 text-center flex items-center">
                    <div className="rounded-xl bg-[#313451] p-5 cursor-pointer">
                        <img src="/images/comments.svg" alt="comment" />
                    </div>
                    <span className="text-xs pl-2 text-white font-semibold">{commentsByPost?.length}</span>
                </div>
            </div>
            </div>
        </>
    )
}
