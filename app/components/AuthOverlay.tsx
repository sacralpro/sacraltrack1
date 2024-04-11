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
                className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
            >
                <div className="relative bg-[#1A1F2B] w-full max-w-[470px] h-[70%] p-4 rounded-lg">

                    <div className="w-full flex justify-end">
                        <button onClick={() => setIsLoginOpen(false)} className="p-1.5 rounded-full bg-[#272B43]">
                            <AiOutlineClose size="16"/>
                        </button>
                    </div>

                    {isRegister ? <Register /> : <Login />}

                    <div className="absolute flex items-center justify-center py-5 left-0 bottom-0 w-full">
                        <span className="text-[14px] text-white">Don’t have an account?</span>

                        <button onClick={() => setIsRegister(isRegister = !isRegister)} className="text-[14px] text-[#F02C56] font-semibold pl-1" >
                            <span>{!isRegister ? 'Register' : 'log in'}</span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
