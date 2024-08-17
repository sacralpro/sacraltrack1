import React, { useEffect } from "react";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import { UserProfileCompTypes, Profile } from "../types"; // Импортируем тип PeopleCardCompTypes
import { useProfileStore } from "../stores/profile";
import  Link from "next/link";

const UserProfileCard = ({ profile }: UserProfileCompTypes) => {
    const userProfileImageUrl = useCreateBucketUrl(profile.image);
    const { setCurrentProfile } = useProfileStore();

    useEffect(() => {
        setCurrentProfile(profile.user_id);
    }, [profile.user_id, setCurrentProfile]);

    return (
        <>  
            <Link href={`/profile/${profile.user_id}`}>
            <div
                id={`UserProfile-${profile.user_id}`}
                className="flex flex-col items-center mt-5 mb-5 mx-5 rounded-xl max-w-sm bg-[#1E2136] shadow-lg h-[400px] w-[350px] md:w-[700px] overflow-hidden"
                style={{ position: 'relative', backgroundImage: `url(${userProfileImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}

            >
                 <div className="flex justify-between text-center absolute z-2 top-0 m-2 bg-black w-[96%] rounded-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <h3 className="py-3 pl-3 text-white text-lg font-semibold">{profile.name}</h3>
                    <img src="/images/star.svg" className="relative w-[30px] pr-3" alt="" />
                </div>
            </div>
            </Link>
        </>
    );
};

export default UserProfileCard;