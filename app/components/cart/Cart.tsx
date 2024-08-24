"use client";

import { useContext, useEffect, useState, useRef } from "react";
import CartContext from "@/app/context/CartContext";
import TopNav from "@/app/layouts/includes/TopNav";
import { CartSideBar } from "@/app/layouts/includes/CartSideBar";
import { PostMainCompTypes } from "@/app/types";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { CartItem } from "@/app/types";
import getStripe from "@/libs/getStripe";
import toast from 'react-hot-toast';
import { useUser } from "@/app/context/user";
import Link from "next/link";
import { BsThreeDotsVertical, BsFillPlayFill, BsFillStopFill } from 'react-icons/bs';
import PostMainLikes from "@/app/components/PostMainLikes";
import WaveSurfer from "wavesurfer.js";
import { setupWaveSurfer } from "@/app/utils/wavesurfer";
import { motion } from "framer-motion";
import Preloader from "@/app/components/Preloader";
import { useRouter } from 'next/router';
import { ProfilePageTypes } from '@/app/types';



const Cart: React.FC<{ post: PostMainCompTypes | null }> = ({ post = null }) => {
   

    // Contexts
    const { deleteItemFromCart, cart } = useContext(CartContext);
    const cartItems = cart?.cartItems || [];

    // Debugging logs
    console.log('Post data:', post);
    console.log('Cart items:', cartItems);
    

    // States
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


      // Audio player
      const [isAudioPlaying, setIsAudioPlaying] = useState(false);
      const audioRef = useRef<HTMLAudioElement>(null);
  
      const handleAudioPause = () => {
          if (audioRef.current) {
              if (isAudioPlaying) {
                  audioRef.current.pause();
                  setIsAudioPlaying(false);
              } else {
                  audioRef.current.play();
                  setIsAudioPlaying(true);
              }
          }
      };
  

    {/* WaveSurfer */}

    const [isPlaying, setIsPlaying] = useState(false);
    const waveformRef = useRef<HTMLDivElement>(null);
    const [wavesurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  
    useEffect(() => {
        if (waveformRef.current && cartItems.length > 0) {
            const newWaveSurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: "#ffffff",
                progressColor: "#018CFD",
                dragToSeek: true,
                width: "47vw",
                hideScrollbar: true,
                normalize: true,
                barGap: 1,
                height: 40,
                barHeight: 20,
                barRadius: 20,
                barWidth: 4,
            });

            newWaveSurfer.load(useCreateBucketUrl(cartItems[0].audio));
            setWaveSurfer(newWaveSurfer);

            console.log('Current audio URL:', useCreateBucketUrl(cartItems[0].audio));
            console.log('Wavesurfer instance:', wavesurfer);

            newWaveSurfer.on("finish", () => {
                console.log("song finished");
                setIsPlaying(false);
            });

            newWaveSurfer.on("ready", () => {
                console.log("Waveform is ready");
            });
        }

        return () => {
            if (wavesurfer) {
                wavesurfer.destroy();
            }
        };
    }, [cartItems]);

    // WaveSurfer PlayPause
    const handlePause = () => {
        if (wavesurfer) {
            if (isPlaying) {
                wavesurfer.stop();
                setIsPlaying(false);
            } else {
                wavesurfer.play();
                setIsPlaying(true);
            }
        }
    };


    // Получаем текущего пользователя
    const userContext = useUser();

    // Effects
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    // Handlers STRIPE
    const createCheckoutSession = async (cartItems: CartItem[], userId?: string) => {
        try {
            const stripe = await getStripe();

            console.log('Request Body:', cartItems);

            const response = await fetch("/api/checkout_sessions/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                cache: "no-cache",
                body: JSON.stringify({ cartItems, userId }),
            });

            console.log('Response Status:', response.status);

    if (response.status === 404) {
        throw new Error("Resource not found");
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Response Data:', data);

        if (data.session) {
            stripe?.redirectToCheckout({ sessionId: data.session.id });
        }
    } else {
        throw new Error("Response is not valid JSON");
    }
    } catch (error) {
        console.error('Error creating checkout session:', error);
    }
    };

    const handlePayClick = () => {
    if (!userContext || !userContext.user) {
        console.error('User is not logged in.');
        return;
    }

    createCheckoutSession(cartItems, userContext.user.id);
    };

   // Conditional Rendering based on 'loading' and 'cartItems'
    if (loading) {
    return <Preloader />;
  }

    if (!cart?.cartItems.length) {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-white text-2xl font-bold mb-4">Your cart is empty.</div>
            <Link href="/" className="bg-[#20DDBB] text-white px-6 py-3 rounded-lg hover:bg-[#21C3A6]">
              Go to Home Page
            </Link>
          </div>
        );
      }

    const handleToggle = () => {
    setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
    console.log(`Clicked on ${item}`);
    };

    //Delete card
    const handleDeletePost = async (id: string) => {
        try {
          await deleteItemFromCart(id);
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      };
    


    return (
        <>
             <TopNav params={{ id: userContext?.user?.id as string }} />


          <div></div>
            <CartSideBar handlePayClick={handlePayClick} />
            {/* Card */}
            <div className="justify-center ml-5 md:pt-[100px] mx-auto w-full px-0 h-screen items-center md:w-auto pt-[450px]">
                {cart.cartItems.map((cartItem: CartItem, index: number) => (
                    <div
                        key={index}
                        className="relative md:w-[720px] w-[330px] h-[500px] bg-cover bg-center rounded-2xl mb-5 pt-2 p-2"
                        style={{
                            backgroundImage: `url(${useCreateBucketUrl(cartItem.image)})`
                        }}
                    >
                        <div className="bg-[#272B43]/90 shadow-[0px_5px_5px_-10px_rgba(0,0,0,0.5)] w-full h-[54px] flex items-between rounded-xl pt-0.5">
                            <div className="cursor-pointer">
                             {/*   <img className="rounded-[15px] max-h-[50px] w-[50px]" src={useCreateBucketUrl(post?.profile?.image)} /> */}
                            </div>

                            <a href="#" className="hover:text-blue-600 text-white ml-2 text-[13px]">
                                {cartItem.name}
                            </a>

                            <div className="pl-3 w-full px-2">
                                <div className="flex items-center justify-between pb-0.5">
                                    {post && post.profile && (
                                        <Link href={`/profile/${post.profile.user_id}`} className="text-[#818BAC] size-[15px]">
                                            <span className="font-bold hover:underline cursor-pointer">
                                                {post.profile.name}
                                            </span>
                                        </Link>
                                    )}
                                </div>
                                <p className="text-[14px] pb-0.5 break-words md:max-w-[400px] max-w-[240px]">{post?.trackname}</p>
                            </div>

                            <p className="font-semibold not-italic mt-3">
                                ${cartItem.price * cartItem.quantity}
                            </p>


                            {/*Delete Button*/}
                            <button
                            disabled={isDeleting}
                            onClick={() => deleteItemFromCart(cartItem?.product)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                           <img src="/images/del.svg" className="h-[20px] w-[20px] mr-2" />
                            </button>
                     




                             {/* Audio player */}
                                <div className="flex items-center justify-center mt-4">
                                    <button className="absolute z-5 top-[47%] left-[50%]" onClick={handleAudioPause}>
                                        {isAudioPlaying ? (
                                            <BsFillStopFill className="text-white" />
                                        ) : (
                                            <BsFillPlayFill className="text-white" />
                                        )}
                                    </button>

                                    <audio style={{ display: "none" }} ref={audioRef} controls>
                                        <source src={useCreateBucketUrl(cartItem.audio)} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>

                                   {/* Другие элементы карточки */}

                            {/* Audio waveserfer
                       
                                        
                            <div className="wavesurfer-controls absolute z-5 top-[43%] left-[43%] border-color-white border-opacity-20 px-10 py-7 rounded-xl">
                                <button onClick={handlePause}>
                                    {isPlaying ? <BsFillStopFill className="text-white" /> : <BsFillPlayFill className="text-white" />}
                                </button>
                            </div>

                            <div className="flex overflow-hidden h-[40px] mb-16 w-full">
                                <div style={{ transform: 'translateY(-40px)' }}>
                                    <div ref={waveformRef} className="wavesurfer-container" />
                                </div>
                            </div>

                            */}

                 
                           
                       
                            {/* 
                            <div className="absolute w-full h-[60px] bottom-1 left-1">
                                <PostMainLikes post={post} />
                            </div>
                            */}

                        </div>
                    </div>
                ))}
            </div>
        </> 
        
    );
};

export default Cart;