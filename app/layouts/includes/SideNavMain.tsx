import Link from "next/link"
import { usePathname } from "next/navigation"
import MenuItem from "./MenuItem"
import MenuItemFollow from "./MenuItemFollow"
import { useEffect } from "react"
import { useUser } from "@/app/context/user"
import ClientOnly from "@/app/components/ClientOnly"
import { useGeneralStore } from "@/app/stores/general"
import { useRouter } from "next/navigation"
import { ProfilePageTypes, User } from "@/app/types"
import { useProfileStore } from "@/app/stores/profile"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"



export default function SideNavMain({ params }: ProfilePageTypes) {
    const contextUser = useUser()
    const router = useRouter()
    const pathname = usePathname()

    let { setCurrentProfile, currentProfile } = useProfileStore()
    let { isEditProfileOpen, setIsEditProfileOpen } = useGeneralStore()

    useEffect(() => {
        setCurrentProfile(params?.id)
    
    }, [])

    return (
        <>
                    <div 
                        id="SideNavMain" 
                        className={`
                            fixed z-20 bg-[#272B43] pt-[10px]  mt-[100px] ml-[20px] 
                            overflow-auto p-[20px] rounded-2xl justify-bottom
                            flex flex-col items-center w-[160px] h-[190px]
                            ${pathname === '/' ? 'lg:w-[290px] lg:h-[300px]' : 'lg:w-[290px] lg:h-[300px]'}
                        `}
                    >   

                        {/*Profile image*/}
                        <div className="2xl:mx-auto">

                        <div className="flex flex-col">
                            <ClientOnly>
                                {(currentProfile as User)?.name ? (
                                    <div>
                                        <p className="text-[14px] font-bold truncate">{currentProfile?.name}</p>
                                    </div>
                                ) : (
                                    <div className="h-[14px]">
                                    <p>User Name</p>
                                    </div>
                                )} 
                            </ClientOnly>

                            <ClientOnly>
                                {currentProfile ? (
                                    <img className="absolute left-0 mt-[5px] w-full max-h-[240px] object-cover rounded-2xl" 
                                    src={useCreateBucketUrl(currentProfile.image)} style={{ boxShadow: '0px 10px 10px -10px rgba(0, 0, 0, 0.3)' }} />
                                ) : (
                                    <img src="/images/user.svg" className="min-w-full max-h-[300px] rounded-xl" />
                                )}
                            </ClientOnly>

                        </div>


                        <div className="pb-2"></div>
                        </div>

                        </div>
                        </>
)
}
