import React from 'react';
import { FaTelegram, FaFacebook, FaVk } from 'react-icons/fa';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  userId: string;
  trackTitle: string;
  post: { image_url?: string };
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  postId,
  userId,
  trackTitle,
  post,
}) => {
  
  const shareOnTelegram = () => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://sacraltrack.store';
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(`${domain}/post/${postId}/${userId}`)}&text=${encodeURIComponent(`Listen to new exclusive track: "${trackTitle}" on Sacral Track`)}&photo=${encodeURIComponent(post.image_url || '')}`;
    console.log('Telegram URL:', telegramUrl); // Лог для проверки URL
    window.open(telegramUrl, '_blank');
    onClose();
  };
  
  const shareOnFacebook = () => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://sacraltrack.store';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${domain}/post/${postId}/${userId}`)}&quote=${encodeURIComponent(`Listen to new exclusive track: "${trackTitle}" on Sacral Track`)}&picture=${encodeURIComponent(post.image_url || '')}`;
    console.log('Facebook URL:', facebookUrl); // Лог для проверки URL
    window.open(facebookUrl, '_blank');
    onClose();
  };
  
  const shareOnVk = () => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://sacraltrack.store';
    const vkUrl = `https://vk.com/share.php?url=${encodeURIComponent(`${domain}/post/${postId}/${userId}`)}&title=${encodeURIComponent(`Listen to new exclusive track: "${trackTitle}" on Sacral Track`)}&image=${encodeURIComponent(post.image_url || '')}`;
    console.log('VK URL:', vkUrl); // Лог для проверки URL
    window.open(vkUrl, '_blank');
    onClose();
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#272B43] rounded-2xl p-6 pb-10 w-[318px] md:w-full m-5 max-w-md relative shadow-lg">
          <h2 className="text-white text-lg font-bold mb-8">Share</h2>
          <div className="flex justify-around">
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={shareOnTelegram}
            >
              <FaTelegram size={32} />
            </button>
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={shareOnFacebook}
            >
              <FaFacebook size={32} />
            </button>
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={shareOnVk}
            >
              <FaVk size={32} />
            </button>
          </div>
        
          <button
            className="absolute top-0 right-0 m-4 hover:bg-[#1e2036] text-white font-bold py-3 px-3 rounded-xl focus:outline-none"
            onClick={onClose}
          >
            <img src='/images/close.svg' alt="close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
