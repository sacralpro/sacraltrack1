import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@/app/context/user";
import { useRouter } from "next/navigation";

export default function MainComponentsFilter() {    
    const userContext = useUser();
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false); // Adjust the breakpoint as needed
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    

    const goTo = () => {
        if (!userContext?.user) return setIsLoginOpen(true);
        router.push('/upload');
    }

    const goToPeople = () => {
        if (!userContext?.user) return setIsLoginOpen(true);
        router.push("/people");
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {isMobile ? (
                <div className="ml-[20px] mt-[100px] hidden">
                    <button onClick={goToPeople} className={`flex pl-2 pr-2 items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">Downloads</span>
                    </button>

                    <button onClick={goTo} className={`flex px-3 items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">My playlists</span>
                    </button>

                    <button onClick={goTo} className={`flex px-3 items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">I like</span>
                    </button>
                </div>
            ) : (
                <div className="ml-[20px] mt-[100px] fixed">
                    <button onClick={goToPeople} className={`flex px-3 w-auto items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">Sacral Track</span>
                    </button>

                    <button onClick={goTo} className={`flex px-3 items-center bg-[#231c2c] rounded-xl py-1 hover:bg-[#1f1a23]`} style={{ marginTop: '10px' }}>
                        <AiOutlinePlus color="#fff" size={16}/>
                        <span className="px-2 py-1 font-medium text-[13px]">World tracks</span>
                    </button>

                </div>
            )}
        </div>
    );
}