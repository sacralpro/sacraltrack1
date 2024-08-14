import { AiOutlineClose } from "react-icons/ai";
import { useGeneralStore } from"@/app/stores/general"
import Login from '@/app/components/auth/Login'
import Register from '@/app/components/auth/Register'
import { useState } from "react";
 
export default function AuthOverlay() {
    let { setIsLoginOpen } = useGeneralStore()

    let [isRegister, setIsRegister] = useState<boolean>(false)

    return (
        <>
            <div 
                id="AuthOverlay" 
                className=" flex fixed items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
            >
                <div className="relative bg-[#1A1F2B] w-full max-w-[800px] h-[500px] p-2 rounded-2xl">

                    <div className="w-full flex justify-end absolute top-4 right-4">
                        <button onClick={() => setIsLoginOpen(false)} className="p-4 rounded-2xl bg-[#272B43] opacity-90">
                            <AiOutlineClose size="16"/>
                        </button>
                    </div>

                    {isRegister ? <Register /> : <Login />}

                    <div className="absolute flex items-left justify-left py-5 left-0 bottom-0 w-full ml-8">
                        <span className="text-[14px] text-white">Don’t have an account?</span>

                        <button onClick={() => setIsRegister(isRegister = !isRegister)} className="text-[14px] text-[#DA4A9A] font-semibold pl-1" >
                            <span>{!isRegister ? 'Sign up' : 'log in'}</span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
