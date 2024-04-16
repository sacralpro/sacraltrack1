"use client"
{/*UPLOAD PAGE*/}

import React, { useEffect, useState } from "react";
import UploadLayout from "../layouts/UploadLayout";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/user"
import { UploadError } from "../types";
import ProgressBar from "../components/ProgressBar";
import useCreatePost from "../hooks/useCreatePost";

// import { convertWavToMp3 } from "../api/audioConverter";


const genres = ['Techno', 'Hip-hop', 'Meditative', 'Electronic', 'Rave', 'House', 'DnB', 'Bass', 'Minimal', 'Lo-fi', 'Neurofunk', 'Psychedelic', 'Trap', 'Ambient', 'Acaplla', 'Ai']; // Define your list of genres


export default function Upload() {
    const contextUser = useUser()
    const router = useRouter() 

    const [genre, setGenre] = useState(''); // State to hold the selected genre

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(e.target.value);
    };

    // Include selectedGenre in your createNewPos


    let [fileDisplayAudio, setFileDisplayAudio] = useState<string>('');
    let [fileAudio, setFileAudio] = useState<File | null>(null);
    let [isUploading, setIsUploading] = useState<boolean>(false);
    let [trackname, setTrackname] = useState<string>('');
    
    // Separating the file state and display for image and audio
    let [fileDisplayImage, setFileDisplayImage] = useState<string>('');
    let [imageFile, setFileImage] = useState<File | null>(null);
    let [imageUploaded, setImageUploaded] = useState(false);

    let [caption, setCaption] = useState<string>('');
    let [error, setError] = useState<UploadError | null>(null);

    useEffect(() => {
        if (!contextUser?.user) router.push('/')
    }, [contextUser])

    {/* AUDIO WAV ONLY
    const onChangeAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
    
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type !== 'audio/wav') {
                // Notify user that only WAV files are allowed
                alert('Please upload an audio WAV file.');
                return;
            }
            
            const fileUrl = URL.createObjectURL(file);
            setFileDisplayAudio(fileUrl);
            setFileAudio(file);
        }
    }*/}
    const onChangeAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
    
        if (files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setFileDisplayAudio(fileUrl);
            setFileAudio(file);
        }
    }


    {/* IMAGE */}
    const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
    
        if (files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setFileDisplayImage(fileUrl);
            setFileImage(file);
            setImageUploaded(true);
        }
    }

    const discard = () => {
        setFileDisplayImage('')
        setFileImage(null)
        setCaption('')
    }

    const clearAudio = () => {
        setFileDisplayAudio('')
        setFileAudio(null)
    }

    const clearImage = () => {
        setFileDisplayImage('');
      };


      {/* POPUP */}

        const [showPopup, setShowPopup] = useState(false);
    
        const handleOpenPopup = () => {
            setShowPopup(true);
        };
    
        const handleClosePopup = () => {
            setShowPopup(false);
        };



      {/*VALIDATION*/}

      const validate = () => {
        setError(null);
        let isError = false;
    
        if (!fileAudio) {
            setError({ type: 'File', message: 'An audio file is required' });
            isError = true;
        } else if (!caption) {
            setError({ type: 'caption', message: 'A caption is required' });
            isError = true;
        } else if (!trackname) {
            setError({ type: 'trackname', message: 'A trackname is required' });
            isError = true;
        }
        return isError;
    };

    /* CREATE POST LOGIC */

    
    const createNewPost = async (genre: string) => {
        let isError = validate();
        if (isError) return;
        setIsUploading(true);
    
        try {
            if (fileAudio && imageFile && genre && contextUser && contextUser.user) {
                await useCreatePost(fileAudio, imageFile, contextUser.user.id, trackname, caption, genre); // Передайте genre здесь
            } else {
                throw new Error('File, image, genre, or user is missing');
            }
    
            router.push(`/profile/${contextUser.user.id}`);
            setIsUploading(false);
        } catch (error) {
            console.log(error);
            setIsUploading(false);
            alert(error);
        }
    };
    


    return (
        <>
                <UploadLayout>
                    <div className="flex flex-col items-center justify-center h-screen w-full shadow-lg rounded-md py-6 md:px-10 px-4">
                        <ProgressBar progress={2} />

                        <div className="mt-6">
                            <h1 className="text-[20px] mt-[20px] mb-8 font-semibold">Upload track</h1>
                            {/* <h2 className="text-gray-400 mt-1">Send your track for release</h2> */}
                        </div>
                       

                    {/* Upload track */}

                    Artist name (user.id.name)
                    

                        {/* TRACK NAME */}
                        <div className="flex items-center align-center">
                        <div className="mt-4 w-full sm:w-[580px] sm:mr-[20px]">
                                <div className="flex items-center justify-between">
                                </div>
                                <input 
                                    maxLength={150}
                                    type="text"
                                    className="
                                        bg-[#1E2136]
                                        w-full
                                        border-[0.5px solid#1E2136]
                                        p-4
                                        rounded-xl
                                        focus:outline-none
                                    "
                                    placeholder="trackname" 
                                    value={trackname}
                                    onChange={event => setTrackname(event.target.value)}
                                    style={{fontSize: '12px', color: '#ffff'}}
                                    //'::placeholder': {fontSize: '12px', color: '#7B7B8C'}}} // Размер и цвет плейсхолдера

                                />
                            </div>

                            {/* CHOOSE GENRE ----------------------- */}


                            <select className="bg-[#1E2136] justify-center sm:w-max-[180px] sm:border-[0.5px solid#1E2136] p-4 rounded-xl h-[48px] px-4" value={genre} onChange={handleGenreChange}>

                                {genres.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                       
                            </div>

                    {/*UPLOAD AUDIO*/}
                    <div className="mx-auto mt-5 mb-6 w-full sm:w-[728px] h-[180px] 
                    text-center p-1 border-2 border-dashed border-[#1E2136] 
                    rounded-xl hover:bg-[#1E2136] cursor-pointer">

                        {!fileDisplayAudio ? 
                            <label 
                                htmlFor="fileInput"
                                className="
                                    md:mx-0
                                    mx-auto
                                    mt-4
                                    mb-6
                                    flex 
                                    flex-col 
                                    items-center 
                                    justify-center 
                                    w-full 
                                    h-[150px] 
                                    text-center 
                                    p-1   
                                "
                            >
                                <BiSolidCloudUpload size="20" color="#b3b3b1"/>
                                <p className="mt-2 text-[13px]">Select audio to upload</p>
                                <p className="mt-1.5 text-gray-500 text-[13px]">Or drag and drop a file</p>
                                <p className="mt-4 text-gray-400 text-sm">Only WAV</p>
                                <p className="mt-2 text-gray-400 text-[13px]">Up to 12 minutes</p>
                              {/* <p className="mt-2 text-gray-400 text-[13px]">Less than 1 GB</p> */}
                                
                              <input 
                                    type="file" 
                                    id="fileInput"
                                    onChange={onChangeAudio}
                                    hidden 
                                    accept=".wav, .mp3" 
                                />
                            </label>
                        :
                            <div
                                className="
                                    md:mx-0
                                    mx-auto
                                    mt-4
                                    md:mb-12
                                    mb-16
                                    flex 
                                    items-center 
                                    justify-center 
                                    w-full 
                                    max-w-[260px] 
                                    h-[20px] 
                                    p-3 
                                    rounded-2xl
                                    cursor-pointer
                                    relative
                                "
                            >
                                {isUploading ? (
                                    <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                                        <div className="mx-auto flex items-center justify-center gap-1">
                                            <BiLoaderCircle className="animate-spin" color="#F12B56" size={30} />
                                            <div className="text-white font-bold">Uploading...</div>
                                        </div>
                                    </div>
                                ) : null}
                                
                               {/* <img 
                                    className="absolute z-20 pointer-events-none" 
                                    src="/images/mobile-case.png"
                                />
                                <img 
                                    className="absolute right-100 bottom-6 z-20" 
                                    width="90" 
                                    src="/images/tiktok-logo-white.png"
                                /> */}

                                <audio 
                                    autoPlay
                                    loop
                                    muted
                                    className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full" 
                                    src={fileDisplayAudio} 
                                />

                                <div className="absolute bottom-2 right-2 flex items-center justify-between z-5 rounded-xl  w-full p-2">
                                    <div className="flex items-center truncate">
                                        <AiOutlineCheckCircle size="16" className="min-w-[16px]"/>
                                        <p className="text-[11px] pl-1 truncate text-ellipsis">{File?.name}</p>
                                    </div>
                                    <button onClick={() => clearAudio()} className="text-[11px] ml-2 font-semibold">
                                        Change
                                    </button>
                                </div>
                            </div>
                        }
                        </div>

                        

                       

                    {/* POPUP ----------------------- */}
                    
                        {showPopup && (
                        <div id="popupOverlay" className="top-0 popup-overlay absolute z-5 bg-[#161726] z-10 py-[160px] w-full h-screen flex-col items-center ">
                            <div className="popup-content">
                            <div className="mx-auto mt-1 w-[728px] p-3 rounded-2xl cursor-pointer">
                        <div className="mt-1 mb-4">
                        
                    {/* UPLOAD ARTWORK CAN BE HERE ----------------------- */} 

                    <div className="mx-auto mt-8 mb-6 md:w-[728px] h-[180px] text-center p-1 border-2 border-dashed border-[#1E2136] rounded-lg hover:bg-[#1E2136] cursor-pointer">
                    {!fileDisplayImage ? (
                        <label
                            htmlFor="fileInputImage"
                            className="
                                md:mx-0
                                mx-auto
                                mt-4
                                mb-6
                                flex 
                                flex-col 
                                items-center 
                                justify-center 
                                w-full 
                                max-w-[728px] 
                                h-[120px] 
                                text-center 
                                p-1 
                            "
                        >
                            <p className="mt-2 text-[13px]">Select image to upload</p>
                            <p className="mt-1.5 text-gray-500 text-[13px]">Or drag and drop a file</p>
                            <p className="mt-4 text-gray-400 text-sm">JPEG, PNG</p>
                            <p className="mt-2 text-gray-400 text-[13px]">Up to 5 MB</p>
                            <input 
                                type="file" 
                                id="fileInputImage"
                                onChange={onChangeImage}
                                hidden 
                                accept=".jpg, .jpeg, .png" 
                            />
                                            </label>
                                        ) : (
                                            <div
                                                className="
                                                    md:mx-0
                                                    mx-auto
                                                    mt-4
                                                    md:mb-12
                                                    mb-16
                                                    flex 
                                                    items-center 
                                                    justify-center 
                                                    w-full 
                                                    max-w-[260px] 
                                                    h-[120px] 
                                                    p-3 
                                                    rounded-2xl
                                                    cursor-pointer
                                                    relative
                                                "
                                            >
                                                {isUploading ? (
                                                    <div className="absolute flex items-center justify-center z-20 h-full w-full rounded-[50px] bg-opacity-50">
                                                        <div className="mx-auto flex items-center justify-center gap-1">
                                                            <BiLoaderCircle className="animate-spin" color="#F12B56" size={30} />
                                                            <div className="text-white font-bold">Uploading...</div>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            <img
                                className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                                src={fileDisplayImage}
                                alt="Selected Image"
                    />
                            <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl  w-full p-2">
                                <div className="flex items-center truncate">
                                    <AiOutlineCheckCircle size="16" className="min-w-[16px]"/>
                                    <p className="text-[11px] pl-1 truncate text-ellipsis">{File?.name}</p>
                                </div>
                                <button onClick={() => clearImage()} className="text-[11px] ml-2 font-semibold">
                                    Change
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                            {/* BUTTON CANCEL */}
                            <div className="flex gap-3 ">
                                <button 
                                    disabled={isUploading}
                                    onClick={() => discard()}
                                    className="hidden px-10 py-2.5 mt-8 border-[0.2px solid#1E2136] text-[13px] hover:bg-[#1E2136] rounded-xl"
                                >
                                    Cancel
                                </button>

                            {/* BUTTON POST */}

                                <button 
                                    disabled={isUploading}
                                    onClick={() => createNewPost(genre)}
                                    className="px-10 py-2.5 mt-8 text-[13px] text-white bg-[#20DDBB] rounded-xl"
                                >
                                    {isUploading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : 'Release'}
                                </button>

                            </div>

                            {error ? (
                                <div className="text-yellow-600 mt-4">
                                    {error.message}
                                </div>
                            ) : null}

                        </div>
                        </div>
                        </div>
                        <button className="close-button absolute top-20 left-[25%] py-2 bg-[#20DDBB]" onClick={handleClosePopup}>
                            <img src="/close.svg" alt="" />
                            Back</button>


                     </div>
                    )}
                      <button className="py-3 px-6 bg-[#20DDBB] rounded-2xl" onClick={handleOpenPopup}>Next</button>

             

              
                      </div>
            </UploadLayout>
        </>
    );
}

