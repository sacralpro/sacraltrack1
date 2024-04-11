import Link from "next/link"
import { debounce } from "debounce";
import { useRouter, usePathname } from "next/navigation"
import { BiSearch, BiUser } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import { useEffect, useState } from "react"
import { useUser } from "@/app/context/user"
import { useGeneralStore } from "@/app/stores/general"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { RandomUsers } from "@/app/types"
import useSearchProfilesByName from "@/app/hooks/useSearchProfilesByName";
import TopMenuItem from "./MenuItem"
import { BsPencil } from "react-icons/bs"

 

export default function TopNav() {    
    const userContext = useUser()
    const router = useRouter()
    const pathname = usePathname()
    const [isVideoMode, setIsAudioMode] = useState(false);

    

    const [searchProfiles, setSearchProfiles] = useState<RandomUsers[]>([])
    let [showMenu, setShowMenu] = useState<boolean>(false)
    let { isEditProfileOpen, setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore()

    useEffect(() => { setIsEditProfileOpen(false) }, [])

    const handleSearchName = debounce(async (event: { target: { value: string } }) => {
        if (event.target.value == "") return setSearchProfiles([])

        try {
            const result = await useSearchProfilesByName(event.target.value)
            if (result) return setSearchProfiles(result)
            setSearchProfiles([])
        } catch (error) {
            
            console.log(error)
            setSearchProfiles([])
            alert(error)
        }
    }, 500)

    const goTo = () => {
        if (!userContext?.user) return setIsLoginOpen(true)
        router.push('/upload')
    }

    const goToPeople = () => {
        if (!userContext?.user) return setIsLoginOpen(true);
        router.push("/people");
      };

    return (
        <>  <div className="fixed bg-[#15161A] w-full h-[20px]  z-30 flex items-center"></div>
            <div id="TopNav" className="fixed bg-[#272B43] z-30 flex items-center border-b h-[60px] left-5 mt-5 rounded-xl border-0.2 right-5 border-[#090C15] ">
                <div className={`flex items-center justify-between gap-6 w-full pl-5 pr-2 mx-auto ${pathname === '/' ? 'max-w-full' : ''}`}>

                    <Link href="/">
                        <img className="min-w-[115px] w-[115px]" src="/images/logotype.png"/>
                    </Link>

                    <div className="flex items-center justify-content-between">

                    <Link href="/">
                                <TopMenuItem 
                                    iconString="Genres" 
                                    colorString={pathname == '/]' ? '#F02C56' : ''} 
                                    sizeString="25"

                                />
                    </Link>

                    <button 
                            onClick={() => goToPeople()}
                            className="flex pl-[15px] pr-[15px] items-center bg-[#] rounded-lg py-[6px] hover:bg-[#]"
                        >
                            <AiOutlinePlus color="#fff" size="16"/>
                            <span className="px-2 py-1 font-medium text-[13px]">People</span>
                    </button>

                    </div>

                    <div className="relative hidden md:flex items-center justify-end bg-[#1A2338] p-1 rounded-xl max-w-[240px] w-full">
                            <input 
                                type="text" 
                                onChange={handleSearchName}
                                className="w-full pl-3 my-2 bg-transparent placeholder-[#1A2338] text-[13px] focus:outline-none"
                                placeholder="Search"
                            />

                            {searchProfiles.length > 0 ?
                                <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
                                    {searchProfiles.map((profile, index) => (
                                        <div className="p-1" key={index}>
                                            <Link 
                                                href={`/profile/${profile?.id}`}
                                                className="flex items-center justify-between w-full cursor-pointer hover:bg-[#F12B56] p-1 px-2 hover:text-white"
                                            >
                                                <div className="flex items-center">
                                                    <img className="rounded-md" width="40" src={useCreateBucketUrl(profile?.image)} />
                                                    <div className="truncate ml-2">{ profile?.name }</div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            : null}

                            <div className="px-3 py-1 flex items-center">
                                <BiSearch color="#fff" size="16" />
                            </div>
                    </div>

                    {/* AUDIO/VIDEO SWITCH */}
                    <div className={`h-[60px] w-[100px] py-2 my-2 cursor-pointer hidden rounded-xl flex items-center justify-center ${isVideoMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        <label htmlFor="modeSwitch" className="switch">
                            <input
                            type="checkbox"
                            id="modeSwitch"
                            checked={isVideoMode}
                            onChange={() => setIsAudioMode(!isVideoMode)}
                            className="hidden"
                            />
                            <div className="slider round"></div>
                        </label>
                        </div>

                    <div className="flex items-center gap-3 ">
                        <button 
                            onClick={() => goTo()}
                            className="flex pl-[15px] pr-[15px] items-center bg-[#20DDBB] rounded-lg py-[6px] hover:bg-[#21C3A6]"
                        >
                            <AiOutlinePlus color="#fff" size="16"/>
                            <span className="px-2 py-1 font-medium text-[13px]">Release a track</span>
                        </button>

                        {!userContext?.user?.id ? (
                            <div className="flex items-center">
                                <button 
                                    onClick={() => setIsLoginOpen(true)}
                                    className="flex items-center bg-[#3E83F7] text-white  rounded-lg px-3 py-[8px]"
                                >
                                    <span className="whitespace-nowrap mx-4 font-medium text-[14px]">Log in</span>
                                </button>
                                <BsThreeDotsVertical color="#161724" size="25"/>
                            </div>
                        ) : (
                            <div className="flex items-center">

                                <div className="relative">

                                    <button 
                                        onClick={() => setShowMenu(showMenu = !showMenu)} 
                                        className="mt-1 rounded-full"
                                    >
                                        <img className="rounded-[15px] w-[40px] h-[40px]" src={useCreateBucketUrl(userContext?.user?.image || '')} />
                                    </button>
                                    
                                    {showMenu ? (
                                        <div className="absolute bg-[#1A2338] rounded-lg py-1.5 w-[200px] shadow-xl top-[40px] right-0">
                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <BiUser size="16"/>
                                                <span className="pl-2 font-semibold text-[12px]">Profile</span>
                                            </button>

                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <BiUser size="16"/>
                                                <span className="pl-2 font-semibold text-[12px]">Messages</span>
                                            </button>

                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <BiUser size="16"/>
                                                <span className="pl-2 font-semibold text-[12px]">Friends</span>
                                            </button>

                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <BiUser size="16"/>
                                                <span className="pl-2 font-semibold text-[12px]">Royalty</span>
                                            </button>

                                            <button 
                                                onClick={async () => {
                                                    await userContext?.logout()
                                                    setShowMenu(false)
                                                }} 
                                                className="flex items-center justify-start w-full py-3 px-1.5 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <FiLogOut size={16} />
                                                <span className="pl-2 font-semibold text-[12px]">Log out</span>
                                            </button>

                                            <button 
                                                onClick={() => setIsEditProfileOpen(isEditProfileOpen = !isEditProfileOpen)}
                                                className="flex item-center rounded-xl py-1.5 px-3.5 mt-3 text-[15px] font-semibold hover:bg-[#1A2338]"
                                            >
                                                <BsPencil className="mt-0.5 mr-1" size="12"/>
                                                <span className="text-[12px] pl-2">Settings</span>
                                            </button>

                                            <div className="lg:block hidden text-[11px] text-gray-500">
                                                <p className="pt-4 px-2">© 2024 SACRAL TRACK</p>
                                            </div>

                                            
                                    


                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
  