import React, { useState, useEffect, useContext } from 'react';
import { useUser } from "@/app/context/user";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from 'react-icons/ai';
import useDownloadsStore from '@/app/stores/downloadsStore';




interface ProfileComponentsProps {
  showPaidPosts: boolean;
  toggleShowPaidPosts: () => void;
}

const ProfileComponents = () => {
  const userContext = useUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { showPaidPosts, toggleShowPaidPosts } = useDownloadsStore();



  const goTo = () => {
    if (!userContext?.user) 
      setIsLoginOpen(true);
    else
      router.push('/upload');
  };

  const goToPeople = () => {
    if (!userContext?.user) 
      setIsLoginOpen(true);
    else
      router.push("/people");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
        <div>
            {isMobile ? (
                 <div className="ml-[20px] mt-[320px]">
                   <button
            onClick={toggleShowPaidPosts}
            className={`flex items-center bg-[#231c2c] rounded-xl py-2 px-3 hover:bg-[#1f1a23] transition-colors duration-300`}
          >
                           <img src="/images/downloads.svg" alt="downloads" />
            <span className="ml-2 font-medium text-[14px] text-white">
              {showPaidPosts ? 'Hide Downloads' : 'Show Downloads'}
            </span>
          </button>
                    {/*
                    <button onClick={goTo} className={`flex px-3 items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">My playlists</span>
                    </button>

                    <button onClick={goTo} className={`flex px-3 items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">I like</span>
                    </button> */}
                </div> 
            ) : (
                <div className="ml-[20px] mt-[450px]"> <button
                onClick={toggleShowPaidPosts}
                className={`flex items-center bg-[#231c2c] rounded-xl py-2 px-3 hover:bg-[#1f1a23] transition-colors duration-300`}
              >
                <img src="/images/downloads.svg" alt="downloads" />
                <span className="ml-2 font-medium text-[14px] text-white">
                  {showPaidPosts ? 'Hide Downloads' : 'Show Downloads'}
                </span>
              </button>
                   {/*
                    <button onClick={goTo} className={`flex px-3 items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">My playlists</span>
                    </button>

                    <button onClick={goTo} className={`flex px-3 items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">I like</span>
                    </button>

                    <button onClick={goTo} className={`flex px-3 items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">My releases</span>
                    </button> */}
                </div>
            )}
        </div>
    );
}

export default ProfileComponents;
