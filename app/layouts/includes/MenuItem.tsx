"use client"

import { AiOutlineHome } from "react-icons/ai"
import { BsChatRightDots } from "react-icons/bs"
import { BsCameraVideo } from "react-icons/bs"
import { MenuItemTypes } from "@/app/types"

export default function MenuItem({ iconString, colorString, sizeString }: MenuItemTypes) {

    const icons = () => {
        if (iconString == 'For You') return <AiOutlineHome size={sizeString} color={colorString} />
        // if (iconString == 'Messages') return <BsChatRightDots size={sizeString} color={colorString} />
        if (iconString == 'LIVE') return <BsCameraVideo size={sizeString} color={colorString} />
    }

    return (
        <>
            <div className="w-full flex items-center hover:bg-[#1A2338] p-2.5 rounded-xl">
                <div className="flex items-center lg:mx-0 mx-auto">

                    {icons()}

                    <p className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[13px] text-[${colorString}]`}>
                        {iconString}
                    </p>
                </div>
            </div>
        </>
    )
}
