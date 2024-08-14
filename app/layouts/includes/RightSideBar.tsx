import Link from "next/link"
import { usePathname } from "next/navigation"
import MenuItem from "./MenuItem"
import MenuItemFollow from "./MenuItemFollow"
import { useEffect } from "react"

import { useGeneralStore } from "@/app/stores/general"





export default function RightSideBar() {

    let { setRandomUsers, randomUsers } = useGeneralStore()

    const pathname = usePathname()

    useEffect(() => {
        setRandomUsers()
    }, [])

    return (
        <>
                    <div 
                        id="RightSideBar" 
                        className={`
                            fixed z-20 bg-[#272B43] pt-[10px] h-auto mt-[100px] ml-[20px] overflow-hidden p-[20px] rounded-[20px] justify-center
                            flex flex-col items-center // Add this line for centering along the y-axis
                            ${pathname === '/' ? 'lg:w-[310px]' : 'lg:w-[310px]'}
                        `}
                    >   

                   
                        <p>Top 100</p>
                        <div id="devider" className="w-full m-1 h-[0.3px] bg-white"/>
                        
                        {/*tracklist card*/}
                        <div className="flex items-between w-full h-[80px] bg-[#1A2338] rounded-xl mt-[20px] style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)' }}">
                            <img className="w-[50px] h-[50px] rounded-full" src="https://i.pravatar.cc/300?img=2"/>
                            <div className="flex items-center">
                            <div className="flex flex-col">
                            <span> price</span>
                            </div>

                            <div className="flex flex-col h-full w-[50px] bg-[#243867] right-0">
                                <button className="w-[50px]"></button>
                                <button></button>
                            </div>

                        </div>

                        </div>

    

                        <div className="pb-14"></div>
                        </div>

                       
                        </>
)
}
