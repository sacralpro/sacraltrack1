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
import { convertWavToMp3 } from '@/app/utils/audioConverter';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import toast from 'react-hot-toast';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Link from "next/link";
import UploadModal from "@/app/components/UploadModal";


//import { mp3Blob } from '@/app/utils/audioConverter';

const genres = ['Genres', 'Afro house', 'Acapella', 'Ai', 'Ambient', 'Bass', 'Deep', 'Deep bass', 'Downtempo', 'Dubstep', 'DnB', 'Electronic', 'Electro', 'Films', 'Games', 'Hip-hop', 'House', 'Instrumental', 'K-pop', 'Lo-fi', 'Meditative', 'Minimal', 'Neurofunk', 'Poetry', 'Psychedelic', 'Rave', 'Techno', 'Trap']
// Define your list of genres

export default function Upload() {
    const contextUser = useUser()
    const router = useRouter() 
    const [trackProgress, setTrackProgress] = useState(0);
    const [genre, setGenre] = useState(''); // State to hold the selected genre
    const [isPostClicked, setIsPostClicked] = useState(false);
    const [mp3Blob, setMp3Blob] = useState<Blob | null>(null);
    const [mp3Url, setMp3Url] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(true); // State to control modal visibility


    // Modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(e.target.value);
    };

    // Include selectedGenre in your createNewPos

    let [fileDisplayAudio, setFileDisplayAudio] = useState<string>('');
    let [fileAudio, setFileAudio] = useState<File | null>(null);
    let [isUploading, setIsUploading] = useState<boolean>(false);
    let [trackname, setTrackname] = useState<string>('');
    let [Mp3File, setMp3File] = useState<File | null>(null); 
    
    // Separating the file state and display for image and audio
    let [fileDisplayImage, setFileDisplayImage] = useState<string>('');
    let [imageFile, setFileImage] = useState<File | null>(null);
    let [imageUploaded, setImageUploaded] = useState(false);

    let [caption, setCaption] = useState<string>('');
    let [error, setError] = useState<UploadError | null>(null);

    useEffect(() => {
        if (!contextUser?.user) router.push('/')
    }, [contextUser])

    /* AUDIO WAV ONLY*/
    
    const onChangeAudio = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
    
        if (files && files.length > 0) {
            const file = files[0];
    
            // Show a toast message if the file is not in WAV format
            if (file.type !== 'audio/wav') {
                toast.error('You can upload only .wav track');
                return; // Exit the function early if not a WAV file
            }
    
            const fileUrl = URL.createObjectURL(file);
            
            setFileDisplayAudio(fileUrl);
            setFileAudio(file);
    
            const ffmpeg = new FFmpeg();
            await ffmpeg.load();
    
            const fileData = await file.arrayBuffer();
    
            try {
                const result = await convertWavToMp3(ffmpeg, file);
    
                if ('mp3Url' in result) {
                    const mp3Url = result.mp3Url;
                    setMp3File(new File([fileData], file.name));
                    setMp3Blob(result.mp3Blob);
                    setMp3Url(result.mp3Url);
    
                    // Дополнительные действия с файлом MP3 или URL
                    // ...
                    
                    console.log('Успешно выполнена конвертация аудио! URL MP3:', mp3Url);
                  //  console.log('MP3 Data Length:', mp3Data.length);
                 //   console.log('MP3 Blob Size:', mp3Blob.size);
    
                } else {
                    console.error('Произошла ошибка во время конвертации аудио:', result.error);
                }
            } catch (error) {
                console.error('Произошла ошибка во время конвертации аудио:', error);
            }
        }
    };

      


    {/* PROGRESS BAR */}
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
    
        if (isPostClicked) {
            interval = setInterval(() => {
                setTrackProgress(prevProgress => {
                    if (prevProgress < 100) {
                        return prevProgress + 10; // Increase by 10% (you can adjust the value based on actual upload speed)
                    } else {
                        clearInterval(interval!);
                        setIsPostClicked(false); // Reset isPostClicked to false after upload is complete
                        return 100;
                    }
                });
            }, 1000); // Simulate upload every second
        }
    
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPostClicked]);

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
            setError({ type: 'caption', message: 'A description is required' });
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

        if (!mp3Blob || !mp3Url) {
            // Обработка ошибки, когда mp3Blob или mp3Url не инициализированы
            return;
          }

        setIsUploading(true);
        setIsPostClicked(true); // Set isPostClicked to true before starting the upload
        console.log('Blob Content:', mp3Blob); // Добавленный console.log для отладки
        console.log('в хуке до try createNewPost, MP3 Blob Size:', mp3Blob.size);  // Должен показать корректный размер до создания File

    
        try {
            if (fileAudio && imageFile && contextUser && contextUser.user) {
            
            console.log('в hook createNewPost, MP3 Blob Size:', mp3Blob.size);  // Должен показать корректный размер до создания File
        
            const mp3File = new File([mp3Blob], 'converted.mp3', { type: 'audio/mp3' });

            // Вывод информации о MP3 файле
            console.log('MP3 Blob Size:', mp3Blob.size);
            console.log('MP3 File:', mp3File);
            console.log('File Size:', mp3File.size, 'bytes');
    
            await useCreatePost(fileAudio, imageFile, contextUser.user.id, trackname, caption, mp3File, genre); // Updated to pass mp3File instead of genre
    
            //URL.revokeObjectURL(mp3Blob); // Освобождаем ресурсы Blob
    
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
                 {isModalOpen && <UploadModal onClose={closeModal} />}

                    <div className="flex flex-col items-center justify-center h-screen w-full shadow-lg rounded-md py-6 md:px-10 px-4">
                   

                    <div style={{ position: 'absolute', height: '10px', width: '100%', bottom: 0, left: 0, zIndex: 80 }}>
                        <ProgressBar progress={trackProgress} />
                    </div>


                        <div className="mt-6">
                            <h1 className="text-[20px] mt-[20px] mb-8 font-semibold">Your Sacral Track</h1>
                            {/* <h2 className="text-gray-400 mt-1">Send your track for release</h2> */}
                        </div>
                       

                    {/* Upload track */}

                    <h2 className="text-gray-400">Artist name: {contextUser?.user?.name || 'Unknown Artist'}</h2>
                    

                        {/* TRACK NAME */}
                        <div className="flex items-center align-center">
                        <div className="mt-4 sm:w-[566px] w-[170px] sm:mr-[20px] mr-5">
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
                                    placeholder="Track Name" 
                                    value={trackname}
                                    onChange={event => setTrackname(event.target.value)}
                                    style={{fontSize: '14px', color: '#ffff'}}
                                    //'::placeholder': {fontSize: '12px', color: '#7B7B8C'}}} // Размер и цвет плейсхолдера

                                />
                            </div>

                            {/* CHOOSE GENRE ----------------------- */}


                            <select className="bg-[#1E2136] text-[14px] justify-center w-[120px] md:w-[142px] sm:border-[0.5px solid#1E2136] p-4 rounded-xl h-[52px] px-4 mt-4" value={genre} onChange={handleGenreChange}>

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
                                    md:mb-12
                                    flex 
                                    items-center 
                                    justify-center 
                                    w-full 
                                    max-w-[100%] 
                                    h-[100%] 
                                    p-2
                                    rounded-xl
                                    cursor-pointer
                                    relative
                                "
                            >
                                {isUploading ? (
                                    <div className="">
                                       {/* <div className="mx-auto flex items-center justify-center gap-1">
                                            <BiLoaderCircle className="animate-spin" color="#F12B56" size={30} />
                                            <div className="text-white font-bold">Uploading...</div>
                                        </div> */}
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

                                    <div className="absolute flex items-center justify-center z-5 rounded-xl w-[100%] h-[100%] p-2 pt-5 bg-[image:url('/images/ok.png')] bg-cover">
                                    <div className="">
                                        <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                                        <p className="text-[11px] pl-1 truncate text-ellipsis">{File?.name}</p>
                                    </div>
                                    <button 
                                        onClick={() => clearAudio()} 
                                        className="border-2 border-[#ffffff] text-white rounded-xl px-5 items-center justify-center text-[13px] ml-2 font-semibold h-[40px] w-auto"
                                    >
                                        Cancel
                                    </button>
                                    </div>

                            </div>
                        }
                        </div>

                        

                       

                    {/* POPUP ----------------------- */}
                    
                        {showPopup && (
                        <div id="popupOverlay" className="top-0 popup-overlay absolute z-5 bg-[#161726] px-5 z-10 py-[160px] w-full h-screen flex-col justify-center items-center ">
                            <div className="popup-content">
                            <div className="flex flex-col items-center justify-center h-full w-full shadow-lg rounded-md py-6 md:px-10 px-5">
                            <div className="mt-1 mb-4">
                    <div className="flex flex-col items-center ">
                    {/* UPLOAD ARTWORK CAN BE HERE ----------------------- */} 
                    <div className="mt-0">
                            <h1 className="text-[20px]  mb-4 font-semibold">Upload image artwork</h1>
                            {/* <h2 className="text-gray-400 mt-1">Send your track for release</h2> */}
                        </div>

                    <div className="mx-auto mt-5 mb-6  md:w-[728px] w-[310px] h-[180px] text-center p-1 border-2 border-dashed border-[#1E2136] rounded-2xl hover:bg-[#1E2136] cursor-pointer">
                    {!fileDisplayImage ? (
                        <label
                            htmlFor="fileInputImage"
                            className="
                          
                                flex 
                                flex-col 
                                items-center 
                                justify-center 
                                md:w-[728px] w-[310px]
                                h-full
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

                  
                                   
                                        
                                                    flex 
                                                    items-center 
                                                    justify-center 
                                                    md:w-[728px] w-[310px]
                                                    h-full
                                                    p-2
                                                    rounded-2xl
                                                    cursor-pointer
                                                    relative
                                                "
                                            >
                                                {isUploading ? (
                                                    <div className="absolute flex items-center justify-center z-20 h-full w-full">
                                                        {/* <div className="mx-auto flex items-center justify-center gap-1">
                                                            <BiLoaderCircle className="animate-spin" color="#F12B56" size={30} />
                                                            <div className="text-white font-bold">Uploading...</div>
                                                        </div> */}
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

                {/*CAPTION*/}
                <div className="mt-5">
                                <div className="flex items-center justify-between ">
                                </div>
                                <input 
                            maxLength={150}
                            type="text"
                            className="
                                bg-[#1E2136]
                                md:w-[728px] w-[310px]
                                border-[0.5px solid#1E2136]
                                p-4
                                rounded-2xl
                                focus:outline-none
                                mt-5
                                placeholder:text-[12px] placeholder:text-[#7B7B8C]
                            "
                            placeholder="Some words about your release" 
                            value={caption}
                            onChange={event => setCaption(event.target.value)}
                            style={{fontSize: '12px', color: '#ffff'}}
                            />
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
                            <p className="text-[13px] text-[#838383] mt-4">By clicking the "release" button you automatically agree with the <Link href="/terms" className="text-[#018CFD] hover:underline">Sacral Track Terms of use</Link></p>

                                <button 
                                    disabled={isUploading}
                                    onClick={() => createNewPost(genre)}
                                    className="px-10 py-4 mt-8 text-[13px] text-white bg-[#20DDBB] rounded-2xl"
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
                        </div>

                        {/*back button*/}
                        <button className="close-button text-[13px] rounded-2xl absolute top-[100px] left-[20px] p-4 bg-[#1E2136]" onClick={handleClosePopup}>
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

