import { useGeneralStore } from "@/app/stores/general";
import TextInput from "../TextInput";
import { useState } from "react";
import { ShowErrorObject } from "@/app/types";
import { useUser } from "@/app/context/user";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function Register() { 
    let { setIsLoginOpen } = useGeneralStore();

    const contextUser = useUser()
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string | ''>('');
    const [email, setEmail] = useState<string | ''>('');
    const [password, setPassword] = useState<string | ''>('');
    const [confirmPassword, setConfirmPassword] = useState<string | ''>('');
    const [error, setError] = useState<ShowErrorObject | null>(null)

    const showError = (type: string) => {
        if (error && Object.entries(error).length > 0 && error?.type == type) {
            return error.message
        }
        return ''
    }

    const validate = () => {
        setError(null)
        let isError = false

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!name) {
            setError({ type: 'name', message: 'A Name is required'})
            isError = true
        } else if (!email) {
            setError({ type: 'email', message: 'An Email is required'})
            isError = true
        } else if (!reg.test(email)) {
            setError({ type: 'email', message: 'The Email is not valid'})
            isError = true
        } else if (!password) {
            setError({ type: 'password', message: 'A Password is required'})
            isError = true
        } else if (password.length < 8) {
            setError({ type: 'password', message: 'The Password needs to be longer'})
            isError = true
        } else if (password != confirmPassword) {
            setError({ type: 'password', message: 'The Passwords do not match'})
            isError = true
        }
        return isError
    }

    const register = async () => {
        let isError = validate()
        if (isError) return
        if (!contextUser) return

        try {
            setLoading(true)
            await contextUser.register(name, email, password)
            setLoading(false)
            setIsLoginOpen(false)
            router.refresh()
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
                <h1 className="text-center text-[18px] mb-4 font-bold">Sign up</h1>

                <div className="px-6 pb-2 w-[100%]">

                    <TextInput 
                        string={name}
                        placeholder="Name"
                        onUpdate={setName}
                        inputType="text"
                        error={showError('name')}
                    />
                    
                </div>

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

                <div className="px-6 pb-2 w-[100%]">
                    <TextInput 
                        string={confirmPassword}
                        placeholder="Confirm Password"
                        onUpdate={setConfirmPassword}
                        inputType="password"
                        error={showError('confirmPassword')}
                    />
                </div>

                <div className="px-6 pb-2 mt-6 w-[100%]">
                    <button 
                        disabled={loading}
                        onClick={() => register()} 
                        className={`
                            flex items-center justify-center w-full text-[14px] font-semibold text-white py-6 rounded-xl
                            ${(!name || !email || !password || !confirmPassword) ? 'bg-[#40C998]' : 'bg-[#F02C56]'}
                        `}
                    >
                        {loading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : 'Sign up'}
                    </button>
                </div>
            </div>
            

            <div className=" flex flex-col items-center justify-center w-[460px]">
                    <img src="images/reg.png" className=" object-contain  rounded-2xl "/>
                </div>
           

                </div>
        </>
    )
}
