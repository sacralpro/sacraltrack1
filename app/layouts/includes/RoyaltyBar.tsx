import Link from "next/link"
import { usePathname } from "next/navigation"
import MenuItem from "./MenuItem"
import MenuItemFollow from "./MenuItemFollow"
import { useEffect } from "react"

import { useGeneralStore } from "@/app/stores/general"





export default function RoyaltyBar() {

    let { setRandomUsers, randomUsers } = useGeneralStore()

    const pathname = usePathname()

    useEffect(() => {
        setRandomUsers()
    }, [])

    return (
        <>
                    <div 
                        id="RoyaltyBar" 
                        className={`
                            fixed z-20 bg-[#272B43] pt-[10px] h-auto mt-[100px] ml-[20px] overflow-hidden p-[20px] rounded-[20px] justify-center
                            flex flex-col items-center // Add this line for centering along the y-axis
                            ${pathname === '/' ? 'lg:w-[310px]' : 'lg:w-[310px]'}
                        `}
                    >   

                   
                        <p>Royalty statistics</p>
                        <div id="devider" className="w-full m-1 h-[0.3px] bg-white"/>
                        $1000
                        
                        Payout
                        -payout logic
                        -enter amount
                        -enter a crypto wallet 
                        \or visa credentials 
                        


                        <div className="pb-14"></div>
                        </div>

                       
                        </>
)
}
