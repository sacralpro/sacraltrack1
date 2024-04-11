import React from "react"
import TopNav from "./includes/TopNav"

export default function UploadLayout({ children }: { children: React.ReactNode }) {
    return (
      	<>
			<div className="bg-[#15161A] h-[100vh]">
                <TopNav/>
                <div className="flex bg-[#15161A] justify-between mx-auto w-full px-2 max-w-[1140px]">
                    {children}
                </div>
            </div>
      	</>
    )
}
  