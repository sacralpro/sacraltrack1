"use client"
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
import CartContext from "@/app/context/CartContext"
import { useContext } from "react"
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
//import Genres from "@/app/components/Genres";
import { Genre } from "@/app/types";
import { GenreContext } from "@/app/context/GenreContext";
import { ProfilePageTypes, User } from "@/app/types"
import { useProfileStore } from "@/app/stores/profile"
import ClientOnly from "@/app/components/ClientOnly"
import { Post } from "@/app/types";
import { usePostStore } from "@/app/stores/post"





 

export default function TopNav({ params }: ProfilePageTypes) {    
    const userContext = useUser()
    const router = useRouter()
    const pathname = usePathname()
    const [isVideoMode, setIsAudioMode] = useState(false);
    const { cart } = useContext(CartContext);
    const cartItems = cart?.cartItems;


   {/*SEARCH*/}
   
   const { searchTracksByName } = usePostStore();
   const [searchProfiles, setSearchProfiles] = useState<(RandomUsers | Post)[]>([]);

    // Debounce function
  function debounce(func: Function, wait: number) {
    let timeout: number;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
    };
  }

// Define the handleSearchName function
const handleSearchName = async (event: { target: { value: string } }) => {
    if (event.target.value === "") {
      setSearchProfiles([]);
      return;
    }
  
    try {
      const [profileResults, trackResults] = await Promise.all([
        useSearchProfilesByName(event.target.value), // Assuming this function returns an array of RandomUsers
        searchTracksByName(event.target.value), // Assuming this function returns an array of Post
      ]);
  
      if (profileResults && trackResults) {
        const formattedTrackResults: Post[] = trackResults.map((track) => ({
            id: track.id,
            name: track.name,
            image: track.image,
            user_id: '',
            audio_url: '', // Добавьте свойство audio_url здесь
            image_url: '', // Добавьте свойство image_url здесь
            text: '', // Добавьте свойство text здесь
            created_at: '', // Добавьте свойство created_at здесь
            trackname: '', // Добавьте свойство trackname здесь
            genre: '', // Добавьте свойство genre здесь
            price: '', // Добавьте свойство price здесь
            type: '', // Добавьте свойство type здесь
            mp3_url: '', // Добавьте свойство mp3_url здесь
            profile: {
              user_id: '', // Добавьте свойство user_id здесь
              name: '', // Добавьте свойство name здесь
              image: '', // Добавьте свойство image здесь
            },
          }));
          
  
          const combinedResults: (RandomUsers | Post)[] = [
            ...profileResults.map((profile) => ({
              id: profile.id,
              name: profile.name,
              image: profile.image,
              type: 'someType', // Добавьте свойство type для RandomUsers
              profile: {
                user_id: 'userId', // Добавьте свойство user_id для RandomUsers
                name: 'userName', // Добавьте свойство name для RandomUsers
                image: 'userImage', // Добавьте свойство image для RandomUsers
              },
            })),
            ...formattedTrackResults, // Предполагается, что formattedTrackResults уже имеет тип Post[]
          ];
  
        setSearchProfiles(combinedResults);
      } else {
        setSearchProfiles([]);
      }
  
    } catch (error) {
      console.log(error);
      setSearchProfiles([]);
      alert(error);
    }
  };

  // Debounced search handler
    const debouncedSearch = debounce(handleSearchName, 500);

    let [showMenu, setShowMenu] = useState<boolean>(false)
    let { isEditProfileOpen, setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore()
    let { setCurrentProfile, currentProfile } = useProfileStore()


    useEffect(() => {
        setCurrentProfile(params?.id)
    }, [])

    useEffect(() => { setIsEditProfileOpen(false) }, [])



    const goTo = () => {
        if (!userContext?.user) return setIsLoginOpen(true)
        router.push('/upload')
    }

    const goToPeople = () => {
        if (!userContext?.user) return setIsLoginOpen(true);
        router.push("/people");
      };

      const goToCart = () => {
        if (!userContext?.user) return setIsLoginOpen(true);
        router.push("/cart");
      };

     /* Genres */
    const [showGenresPopup, setShowGenresPopup] = useState(false);
    const { setSelectedGenre } = useContext(GenreContext);

    const handleGenresClick = () => {
        setShowGenresPopup(!showGenresPopup);
    };
    

    const handleGenreSelect = (genreName: string) => {
        setSelectedGenre(genreName);
        console.log("Selected genre:", genreName);
        setShowGenresPopup(false); // Hide the dropdown menu after selecting a genre
        //router.push(`/?genre=${genreName.toLowerCase().replace(/\s/g, "-")}`);
      };

      const genres: Genre[] = [
        { id: "0", name: "All" },
        { id: "29", name: "Afro house" },
        { id: "16", name: "Ambient" },
        { id: "17", name: "Acapella" },
        { id: "18", name: "Ai" },
        { id: "10", name: "Bass" },
        { id: "9", name: "DnB" },
        { id: "28", name: "Downtempo" },
        { id: "3", name: "Deep" },
        { id: "24", name: "Deep bass" },
        { id: "27", name: "Dubstep" },
        { id: "26", name: "Electro" },
        { id: "6", name: "Electronic" },
        { id: "19", name: "Films" },
        { id: "20", name: "Games" },
        { id: "4", name: "Hip-hop" },
        { id: "21", name: "Instrumental" },
        { id: "2", name: "K-pop" },
        { id: "12", name: "Lo-fi" },
        { id: "5", name: "Meditative" },
        { id: "11", name: "Minimal" },
        { id: "13", name: "Neurofunk" },
        { id: "22", name: "Poetry" },
        { id: "14", name: "Psy" },
        { id: "7", name: "Rave" },
        { id: "1", name: "Techno" },
        { id: "15", name: "Trap" },
        { id: "8", name: "House" },
      ];
      
  

    return (
        <>  <div className="fixed bg-[#15191F] w-full h-[20px]  z-30 flex items-center"></div>
            <div id="TopNav" className="fixed bg-[#272B43] z-30 flex items-center  h-[60px] left-5 mt-5 rounded-2xl right-5 border-0.5 border-[#090C15] ">
                <div className={`flex items-center justify-between gap-6 w-full pl-5 pr-2 mx-auto ${pathname === '/' ? 'max-w-full' : ''}`}>

                    <Link href="/" className="flex items-center">
                        <img className="min-w-[20px] w-[20px] mr-0 md:mr-2" src="/images/st.png"/>
                        <span className="px-1 py-1 font-medium text-[13px] hidden md:inline">Sacral Track</span>   
                    </Link>
                    

                    {/* Genres */}
                    <div className="flex items-center justify-content-between">
                            {pathname === '/' && (
                                <button
                                className="text-white text-[13px] flex items-center mr-0 md:mr-4"
                                onClick={handleGenresClick}
                                onMouseEnter={(e) => {
                                  
                                e.currentTarget?.querySelector('img')?.classList.add('rotate-180');
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget?.querySelector('img')?.classList.remove('rotate-180');
                                }}
                                >
                                <img
                                    className="w-[15px] h-[15px] mr-2 transition-transform duration-300 ease-in-out"
                                    src="/images/genres.svg"
                                />
                                <span className="px-1 py-1 font-medium text-[13px] hidden md:inline">Genres</span>
                                </button>
                            )}
                    {showGenresPopup && (
                        <div className="absolute z-10 top-0 right-0 p-2 left-0 mt-[80px]  bg-[#272B43] rounded-2xl shadow-2xl">
                        <ul className=" grid grid-cols-2 gap-2">
                            {genres.map((genre) => (
                            <li
                                key={genre.id}
                                className="p-3 text-white text-[13px] rounded-lg hover:bg-[#15191F] cursor-pointer"
                                onClick={() => handleGenreSelect(genre.name)} 
                            >
                                {genre.name}
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}

                    {/*people*/}
                    <button
                    onClick={() => goToPeople()}
                    className="flex pl-[15px] pr-[15px] items-center bg-[#] rounded-lg py-[6px]"
                    >
                    <div
                        className="flex items-center hover:translate-y-[-2px] transition-transform duration-300 ease-in-out"
                        onMouseEnter={(e) => {
                        e.currentTarget?.querySelector('img')?.classList.add('hover:translate-y-[-1px]', 'transition-transform', 'duration-300', 'ease-in-out');
                        }}
                        onMouseLeave={(e) => {
                        e.currentTarget?.querySelector('img')?.classList.remove('hover:translate-y-[-1px]', 'transition-transform', 'duration-300', 'ease-in-out');
                        }}
                    >
                        <img className="w-[15px] h-[15px] mr-1" src="/images/people.svg" />
                        <span className="px-1 py-2 font-medium text-[13px] hidden md:inline">People</span>

                    </div>
                    </button>


                    </div>

                    {/* Search Bar */}
                    <div className="relative hidden md:flex items-center justify-end bg-[#1A2338] p-1 rounded-2xl max-w-[220px] w-full">
                            <input 
                                type="text" 
                                onChange={handleSearchName}
                                className="w-full pl-3 my-2 bg-transparent placeholder-[#1A2338] text-[13px] focus:outline-none"
                                placeholder="Search"
                            />
                             <ClientOnly>

                                {/* Search Profile */}{searchProfiles.length > 0 ?
                                    <div className="absolute bg-[#0D2D3F] max-w-[910px] h-auto w-full z-20 left-0 top-12 rounded-xl p-2 shadow-2xl">
                                    {searchProfiles.map((result, index) => (
                                        <div className="p-1" key={index}>
                                        <Link
                                            href={result.type === "track" ? `/post/${result.id}/${result.profile?.user_id}` : `/profile/${result.id}`}
                                            className="flex items-center justify-between w-full cursor-pointer hover:bg-[#1E2136] rounded-xl p-2 px-2 hover:text-white text-13px"
                                        >
                                            <div className="flex items-center">
                                            {result.type === "track" ? (
                                                <>
                                                <img className="rounded-2xl" width="40" src={useCreateBucketUrl(result.image || '')} />
                                                <div className="truncate ml-2">{result?.name}</div>
                                                </>
                                            ) : (
                                                <>
                                                <img className="rounded-2xl" width="40" src={useCreateBucketUrl(result.image || '')} />
                                                <div className="truncate ml-2">{result.name}</div>
                                                </>
                                            )}
                                            </div>
                                        </Link>
                                        </div>
                                    ))}
                                    </div>
                                    : null}


                            </ClientOnly>

                            <div className="px-3 py-1 flex items-center">
                                <BiSearch color="#fff" size="16" />
                            </div>
                    </div>

                    {/* AUDIO/VIDEO SWITCH */}
                    <div className={`h-[60px] w-[100px] py-2 my-2 cursor-pointer hidden rounded-xl  items-center justify-center ${isVideoMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
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
                    
                    
                    {/* Release a track button */}
                    <div className="flex items-center gap-4">
                    <button 
                        onClick={() => goTo()}
                        className="flex pl-[15px] pr-[15px] items-center bg-[#20DDBB] rounded-2xl py-[6px] hover:bg-[#21C3A6]"
                    >
                        <img className="w-[18px] h-[18px]" src="/images/wave.svg" />
                        <span className="px-2 py-1 font-medium text-[13px] h-[30px] md:hidden"></span>
                        <span className="px-1 py-1 font-medium text-[13px] hidden md:inline">Release a track</span>
                    </button>
                    </div>

                 
                    {/* CART button */} 

                        <button 
                        onClick={() => goToCart()}
                        className="md:w-[86px] w-[44px] bg-[#1A2338] rounded-2xl h-[44px] flex items-center justify-end">
                            <span className="font-medium text-[12px] hidden md:inline">{cartItems?.length || 0}</span>
                            <div className="md:ml-2 ml-0 h-[43px] w-[50px] bg-[#20DDBB] flex items-center justify-center rounded-2xl right-0 hover:bg-[#21C3A6]">
                                <img src="/images/cart.svg" alt="cart" />
                            </div>
                        </button>

                    {/* Profile button */}

                        {!userContext?.user?.id ? (
                            <div className="flex items-center">
                            <button
                              onClick={() => setIsLoginOpen(true)}
                              className="flex items-center bg-[#3E83F7] text-white rounded-2xl px-3 py-[10px] hover:bg-[#5492FA]"
                            >
                              <span className="whitespace-nowrap mx-4 font-medium text-[14px] md:inline hidden">Log in</span>
                              <img className="w-[16px] h-[16px] md:hidden m-[3px]" src="/images/Login.svg" alt="Login" />
                            </button>
                            <BsThreeDotsVertical color="#161724" size="25" />
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
                                        <div className="absolute bg-[#1A2338] rounded-xl mt-5 mr-[-8px] py-1.5 w-[200px] shadow-xl top-[40px] right-0">
                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <img src="/images/people.svg" className="w-[16px] h-[16px]"/>
                                                <span className="pl-2 font-semibold text-[12px]">Profile</span>
                                            </button>
                                            
                                            <button 
                                                onClick={() => { 
                                                   // router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <img src="/images/msg.svg" className="w-[16px] h-[16px]"/>
                                                <span className="pl-2 font-semibold text-[12px] text-[#818BAC]">Messages</span>
                                            </button>

                                            <button 
                                                onClick={() => { 
                                                    //router.push(`/friends}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <img src="/images/Friends.svg" className="w-[16px] h-[16px]"/>
                                                <span className="pl-2 font-semibold text-[12px] text-[#818BAC]">Friends</span>
                                            </button>

                                            <button 
                                                onClick={() => { 
                                                    router.push(`/royalty`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <img className="w-[16px] h-[16px]" src="/images/Card.svg"/>
                                                <span className="pl-2 font-semibold text-[12px]">Royalty</span>
                                            </button>

                                            <button 
                                                onClick={async () => {
                                                    await userContext?.logout()
                                                    setShowMenu(false)
                                                }} 
                                                className="flex items-center justify-start w-full py-3 px-1.5 hover:bg-[#272B43] cursor-pointer"
                                            >
                                                <img src="/images/logout.svg" className="w-[16px] h-[16px]"/>
                                                <span className="pl-2 font-semibold text-[12px]">Log out</span>
                                            </button>
                                            <ClientOnly>
                                            

                                            {pathname === `/profile/${userContext?.user?.id}` && (
                                            <button 
                                                onClick={() => setIsEditProfileOpen(isEditProfileOpen = !isEditProfileOpen)}
                                                className="flex item-center rounded-xl py-1.5 px-3.5 mt-3 text-[15px] font-semibold hover:bg-[#1A2338]"
                                            >
                                                <img src="/images/edit.svg" className="w-[12px] h-[12px] mt-0.5"/>
                                                <span className="text-[12px] pl-2">Settings</span>
                                            </button>
                                            )}
                                            </ClientOnly>
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
  