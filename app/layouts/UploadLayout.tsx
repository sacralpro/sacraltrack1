import React from "react"
import TopNav from "./includes/TopNav"
//import { AudioProvider } from "../context/audioContext"

export default function UploadLayout({ children }: { children: React.ReactNode }) {
    return (
      	<>

			<div className="">
                <TopNav/>
                <div className="flex justify-between mx-auto w-full px-2">
                    {children}
                </div>
            </div>
      	</>
    )
}
  