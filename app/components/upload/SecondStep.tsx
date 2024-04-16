"use client"
{/*UPLOAD PAGE*/}

import React, { useEffect, useState } from "react";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/user"

// import { convertWavToMp3 } from "../api/audioConverter"

export default function SecondStep() {
    const contextUser = useUser()
    const router = useRouter() 

    
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

    useEffect(() => {
        if (!contextUser?.user) router.push('/')
    }, [contextUser])


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
    const clearImage = () => {
        setFileDisplayImage('');
      };

    /* CREATE POST LOGIC */

    


    return (
        <>
                    <div className="w-full mt-[80px] mb-[40px] shadow-lg rounded-md py-6 md:px-10 px-4">

                        <div className="flex flex-col items-center justify-center h-screen">

                        <div className="mt-6">
                            <h1 className="text-[20px] font-semibold">Upload track</h1>
                            {/* <h2 className="text-gray-400 mt-1">Send your track for release</h2> */}
                        </div>

                        
                        
                        {/* UPLOAD ARTWORK CAN BE HERE ----------------------- */} 

                        <div className="mx-auto mt-8 mb-6 w-[500px] h-[180px] text-center p-1 border-2 border-dashed border-[#1E2136] rounded-lg hover:bg-[#1E2136] cursor-pointer">
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
                            max-w-[500px] 
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


                    </div>
                </div>
        </>
    )
}
