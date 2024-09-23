import React from "react"
import TopNav from "./includes/TopNav"
//import { AudioProvider } from "../context/audioContext"
import { RecoilRoot } from "recoil"
import { useUser } from "@/app/context/user";

export default function UploadLayout({ children }: { children: React.ReactNode }) {

    const userContext = useUser();   

    return (
      	<>
        <RecoilRoot>
			<div className="">
            <TopNav params={{ id: userContext?.user?.id as string }} />

                <div className="flex justify-between mx-auto w-full">
                    {children}
                </div>
            </div>
        </RecoilRoot>
      	</>
    )
}
  