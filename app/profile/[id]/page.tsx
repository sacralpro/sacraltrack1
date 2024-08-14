"use client";

import PostUser from "@/app/components/profile/PostUser";
import ProfileLayout from "@/app/layouts/ProfileLayout";
import { useEffect } from "react";
import { useUser } from "@/app/context/user";
import ClientOnly from "@/app/components/ClientOnly";
import { ProfilePageTypes } from "@/app/types";
import { usePostStore } from "@/app/stores/post";
import { useProfileStore } from "@/app/stores/profile";
import { useGeneralStore } from "@/app/stores/general";
import { PostWithProfile } from "@/app/types";
import PaidPosts from "@/app/components/profile/PaidPosts";
import ProfileComponents from "@/app/layouts/includes/ProfileComponents";
import  useDownloadsStore from '@/app/stores/downloadsStore';


export default function Profile({ params }: ProfilePageTypes) {

  const contextUser = useUser()
  let { postsByUser, setPostsByUser } = usePostStore()
  let { setCurrentProfile, currentProfile } = useProfileStore()
  let { isEditProfileOpen, setIsEditProfileOpen } = useGeneralStore()

  const { showPaidPosts, hidePostUser } = useDownloadsStore();


  useEffect(() => {
    setCurrentProfile(params?.id)
    setPostsByUser(params?.id)
  }, [params.id, setCurrentProfile]);

  return (
    <>
      <ProfileLayout params={{ params }}>
        <div className="pt-[90px] ml-[20px] lg:pr-0 w-[calc(100%-90px)] max-w-[1200px] 2xl:mx-auto">
          <ClientOnly>
          {!hidePostUser && (
              <div className="justify-center">
                {postsByUser?.map((post, index) => (
                 <PostUser
                 key={index}
                 params={{ userId: params.id, postId: post.id }}
                 post={post as PostWithProfile}
                 userId={params.id} // Add this line
               />
                ))}
              </div>
            )}
          </ClientOnly>

       
          {showPaidPosts && (
            <div className="mt-4">
            <PaidPosts userId={params.id} posts={[]} />

            </div>
          )}

          <div className="pb-20" />
        </div>
      </ProfileLayout>
    </>
  );
}
