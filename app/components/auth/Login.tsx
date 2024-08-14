import TextInput from "../TextInput";
import { useState } from "react";
import { ShowErrorObject } from "@/app/types";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";
import { BiLoaderCircle } from "react-icons/bi";
import { account } from '@/libs/AppWriteClient'

export default function Login() {
    let { setIsLoginOpen } = useGeneralStore();

    const contextUser = useUser()

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | ''>('');
    const [password, setPassword] = useState<string | ''>('');
    const [error, setError] = useState<ShowErrorObject | null>(null)


    const showError = (type: string) => {
        if (error && Object.entries(error).length > 0 && error?.type == type) {
            return error.message
        }
        return ''
    }

   {/* async function handleLogin (){
        account.create0Auth2Session(
            'google',
            'http://localhost:3000/',
            'http://localhost:3000/fail',
        )
    } */}

    const validate = () => {
        setError(null)
        let isError = false

        if (!email) {
            setError({ type: 'email', message: 'An Email is required'})
            isError = true
        } else if (!password) {
            setError({ type: 'password', message: 'A Password is required'})
            isError = true
        }
        return isError
    }

    const login = async () => {
        let isError = validate()
        if (isError) return
        if (!contextUser) return

        try {
            setLoading(true)
            await contextUser.login(email, password)
            setLoading(false)
            setIsLoginOpen(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            alert(error)
        }
    }

    return (
        <>
            <div className="w-full flex justify-center overflow-hidden">

                <div className="w-[440px] flex flex-col justify-center items-center">
                <h1 className="text-center text-[18px] mb-10 font-bold">Log in</h1>

                <div className="px-6 pb-2 w-[100%]">
                    <TextInput 
                        string={email}
                        placeholder="Email address"
                        onUpdate={setEmail}
                        inputType="email"
                        error={showError('email')}
                    />
                </div>

                <div className="px-6 pb-2 w-[100%]">
                    <TextInput 
                        string={password}
                        placeholder="Password"
                        onUpdate={setPassword}
                        inputType="password"
                        error={showError('password')}
                    />
                </div>

                <div className="px-6 pb-2 mt-6 w-[100%]">
                    <button 
                        disabled={loading}
                        onClick={() => login()} 
                        className={`
                            flex items-center justify-center w-full text-[14px] font-semibold text-white py-6 rounded-2xl
                            ${(!email || !password) ? 'bg-[#40C998]         ' : 'bg-[#3fba8f]'}
                        `}
                    >
                        {loading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : 'Log in'}
                    </button>
                </div>

                
                {/*Google auth*/}

                {/* IMG */}
                </div>
                <div className=" flex flex-col items-center justify-center w-[460px]">
                    <img src="images/login.png" className=" object-contain  rounded-2xl "/>
                </div>
           

            </div> 

        </>
    )
}
