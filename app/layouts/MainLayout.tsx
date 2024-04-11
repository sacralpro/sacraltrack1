import React, { useState, useEffect } from 'react';
import SideNavMain from "./includes/SideNavMain"
import TopNav from "./includes/TopNav"
import { usePathname } from "next/navigation"
import RightSideBar from "./includes/RightSideBar"
import MainComponentsFilter from "./includes/MainComponentsFilter"
import { motion, Variants } from 'framer-motion';
import Preloader from "../components/Preloader"


export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
	
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
		<TopNav/>
		
		<div className="flex justify-between mx-auto w-full px-0">
			
			<div className="flex justify-start bg-[#15191F] w-auto md:w-300 px-0">
			<motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-start bg-[#15191F] w-auto md:w-300 px-0"
            >
				{/*<SideNavMain />*/}
				<MainComponentsFilter />
				</motion.div>
			</div>

			<div className="flex justify-center bg-[#15191F] w-[720px] px-0">
			<motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center bg-[#15191F] w-[720px] px-0"
            >
				{children}
				</motion.div>
			</div>

			<div className="hidden md:flex justify-end bg-[#15191F] w-[300px] pr-[20px]">
			<motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex justify-end bg-[#15191F] w-[300px] pr-[20px]"
            >
    				<RightSideBar />
					</motion.div>
			</div>

		</div>
		</>
            )}
	</>
    )
}


