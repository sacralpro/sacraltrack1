import React from "react"
import SideNavMain from "./includes/SideNavMain"
import TopNav from "./includes/TopNav"
import { usePathname } from "next/navigation"
import RightSideBar from "./includes/RightSideBar"
import ProfileComponents from "./includes/ProfileComponents"
import { ProfilePageTypes } from "../types"
import { RecoilRoot } from "recoil"
import { useUser } from "@/app/context/user";





export default function ProfileLayout({ children, params }: { children: React.ReactNode, params: ProfilePageTypes }) {

    const pathname = usePathname()

	const userContext = useUser();   


    return (
		<>
		<RecoilRoot>
		<TopNav params={{ id: userContext?.user?.id as string }} />
		
		<div className="flex justify-between mx-auto w-full px-0">
			<div className="flex justify-start bg-[#15191F] w-[340px] px-0">
                <div className="h-auto flex flex-col fixed">
				<SideNavMain params={params.params} />
                <ProfileComponents />
                </div>
			</div>
            
			<div className="flex justify-center bg-[#15191F] w-[720px] px-0">
				{children}
			</div>
			{/* <div className="hidden md:flex justify-end bg-[#15191F] w-[300px] md:pr-[20px]">

    			 <RightSideBar /> 
			</div>*/} 
		</div>
		</RecoilRoot>
	</>
    )
}


