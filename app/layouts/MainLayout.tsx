import React, { useState, useEffect } from 'react';
import SideNavMain from "./includes/SideNavMain"
import TopNav from "./includes/TopNav"
import { usePathname } from "next/navigation"
import RightSideBar from "./includes/RightSideBar"
import MainComponentsFilter from "./includes/MainComponentsFilter"
import { motion, Variants } from 'framer-motion';
import Preloader from "../components/Preloader"
//import { RecoilRoot } from "recoil";
import { useUser } from "@/app/context/user";
import TechMessage from '../components/TechMessage';



export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const userContext = useUser();   
	{/*Preloader*/}
	const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Имитация задержки загрузки для демонстрации
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
		<>

		  {loading ? (
                <Preloader />
            ) : (
                <>
		                    <TopNav params={{ id: userContext?.user?.id as string }} />

		
		<div className="flex  mx-auto w-full px-0">
			
			<div className="flex justify-start bg-[#15191F] w-auto md:w-300 px-0">
			<motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                      className="hidden md:flex justify-start bg-[#15191F] w-auto md:w-300 px-0"

            >
				{/*<SideNavMain />*/}
				{/* <MainComponentsFilter /> */}
				</motion.div>
			</div>

			<div className="flex justify-center bg-[#15191F] sm:w-full  px-0">
			<motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center bg-[#15191F] w-auto px-0"
            >
				{children}
				</motion.div>
			</div>

			<div className="hidden sm:block md:flex justify-end bg-[#15191F] w-[300px] pr-[20px]">

			<motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className=" md:flex justify-end bg-[#15191F] w-[300px] "
            >
    			{/*	<RightSideBar /> */}
                <TechMessage />

              
				
                </motion.div>
                
			</div>

              {/* Круглая кнопка "Support" */}
              <motion.a
                        href="http://t.me/sashaplayra"
                        target="_blank"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="fixed bottom-5 right-5 bg-[#272B43] text-white rounded-full w-20 h-20 flex items-center justify-center cursor-pointer hover:bg-[#1E2136] focus:outline-none"
                    >   <div className="block items-center justify-center">
                        <img src="/images/tel.svg" className="w-6 h-6" alt="" /> <span className="text-[10px]">Support</span>
                        </div>
                    </motion.a>

		</div>
		</>
            )}
       
	</>
    )
}


