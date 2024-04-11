"use client"

import PostUser from "@/app/components/profile/PostUser"
import ProfileLayout from "@/app/layouts/ProfileLayout"
import { BsPencil } from "react-icons/bs"
import { useEffect } from "react"
import { useUser } from "@/app/context/user"
import ClientOnly from "@/app/components/ClientOnly"
import { ProfilePageTypes, User } from "@/app/types"
import { usePostStore } from "@/app/stores/post"
import { useProfileStore } from "@/app/stores/profile"
import { useGeneralStore } from "@/app/stores/general"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"

export default function Profile({ params }: ProfilePageTypes) {
    const contextUser = useUser()
    let { postsByUser, setPostsByUser } = usePostStore()
    let { setCurrentProfile, currentProfile } = useProfileStore()
    let { isEditProfileOpen, setIsEditProfileOpen } = useGeneralStore()

    useEffect(() => {
        setCurrentProfile(params?.id)
        setPostsByUser(params?.id)
    }, [])

    return (
        <>
            <ProfileLayout>
                <div className="pt-[90px] ml-[20px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1200px] 2xl:mx-auto">

                  

                    <ClientOnly>
                        
                    <div className="justify-center">
               
        
                            {postsByUser?.map((post, index) => (
                                <PostUser key={index} post={post} />
                            ))}
                 
                        </div>

                    </ClientOnly>

                    <div className="pb-20" />
                </div>
            </ProfileLayout>
        </>
    )
}
