"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TopNav from "./includes/TopNav"
import { usePathname } from "next/navigation"
//import { CartList } from '../components/cart/Cart';
import Preloader from "../components/Preloader"
import { motion } from "framer-motion";
import { useUser } from "@/app/context/user";



export default function CartLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    // Получаем текущего пользователя
    const userContext = useUser();   

    {/*CART Functions */}
   
    
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

        
        <div className="flex justify-between mx-auto w-full px-0">
            
            <div className="flex justify-start bg-[#15191F] w-auto md:w-300 px-0">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-start bg-[#15191F] w-auto md:w-300 px-0"
            >
                </motion.div>
            </div>

            <div className="flex justify-center bg-[#15191F] w-[720px] px-0">
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center bg-[#15191F] w-[720px] px-0"
            >
        
        

                </motion.div>

            </div>

            <div className="hidden md:flex justify-end bg-[#15191F] w-[300px] pr-[20px]">
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex justify-end bg-[#15191F] w-[300px] pr-[20px]"
            >
                {/*CartSideBar*/}
                    </motion.div>
            </div>

            </div>
            </>
            )}

    </>
    )
}



