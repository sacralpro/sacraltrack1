import { useUser } from "@/app/context/user"
import Link from "next/link"
import { useState } from "react"
import { BiLoaderCircle } from "react-icons/bi"
import { BsTrash3 } from "react-icons/bs"
import { useCommentStore } from "@/app/stores/comment"
import moment from "moment"
import useDeleteComment from "@/app/hooks/useDeleteComment"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { SingleCommentCompTypes } from "@/app/types"

export default function SingleComment({ comment, params }: SingleCommentCompTypes) {

    {/* DROPDOWN */}
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const contextUser = useUser()
    let { setCommentsByPost } = useCommentStore()
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteThisComment = async () => {
        let res = confirm("Are you sure you weant to delete this comment?")
        if (!res) return

        try {
            setIsDeleting(true)
            await useDeleteComment(comment?.id)
            setCommentsByPost(params?.postId)
            setIsDeleting(false)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    return (
        <>
            <div id="SingleComment" className="flex items-center justify-between px-4 mt-4">
                <div className="flex items-center relative w-full">
                    <Link href={`/profile/${comment.profile.user_id}`}>
                        <img 
                            className="absolute top-0 rounded-xl lg:mx-0 mx-auto" 
                            width="50" 
                            src={useCreateBucketUrl(comment.profile.image)}
                        />
                    </Link>
                    <div className="ml-16 w-full">

                        <div className="text-[15px] font-semibold flex items-center justify-between">
                            <span className="flex items-center">
                                {comment?.profile?.name} - 
                                <span className="text-[12px] text-gray-600 font-light ml-1">
                                    {moment(comment?.created_at).calendar()}
                                </span>
                            </span>

                            <div className="relative">
                            <button onClick={toggleDropdown} className="text-gray-600">
                               <img className="cursor-pointer" width="20" src="/images/dots.svg" />
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-[auto] p-3 bg-[#1E2136] rounded-md shadow-lg z-10">
                                {/* Dropdown content goes here */}
                                
                            {/*DROP Delete button */}
                            {contextUser?.user?.id == comment.profile.user_id ? (
                                <button 
                                    disabled={isDeleting} 
                                    onClick={() => deleteThisComment()}
                                >
                                    {isDeleting 
                                        ? <BiLoaderCircle className="animate-spin" color="#E91E62" size="20"/>
                                        : <BsTrash3 className="cursor-pointer" size="16"/>
                                    }
                                </button>
                            ) : null}
                                
                                </div>
                            )}
                            </div>
                            
                        </div>

                    
                        
                        <p className="text-[15px] font-light">{comment.text}</p>

                    </div>
                </div>
            </div>
        </>
    )
}
