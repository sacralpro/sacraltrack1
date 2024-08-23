import React from 'react';
import { FaTelegram, FaFacebook, FaVk } from 'react-icons/fa';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  trackImageUrl: string;
  trackTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  postId,
  trackImageUrl,
  trackTitle,
}) => {
  const shareOnTelegram = () => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://sacraltrack.store';
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(`${domain}/post/${postId}`)}&text=${encodeURIComponent(`Listen to new exclusive track: "${trackTitle}" on Sacral Track`)}&photo=${encodeURIComponent(trackImageUrl.replace('.jpg', '.png'))}`;
    window.open(telegramUrl, '_blank');
    onClose();
  };

  const shareOnFacebook = () => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://sacraltrack.store';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${domain}/post/${postId}`)}&quote=${encodeURIComponent(`Listen to new exclusive track: "${trackTitle}" on Sacral Track`)}&picture=${encodeURIComponent(trackImageUrl)}`;
    window.open(facebookUrl, '_blank');
    onClose();
  };

  const shareOnVk = () => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://sacraltrack.store';
    const vkUrl = `https://vk.com/share.php?url=${encodeURIComponent(`${domain}/post/${postId}`)}&title=${encodeURIComponent(`Listen to new exclusive track: "${trackTitle}" on Sacral Track`)}&image=${encodeURIComponent(trackImageUrl)}`;
    window.open(vkUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#272B43] rounded-2xl shadow-lg p-6 pb-10 w-full max-w-md relative">
          <h2 className="text-white text-lg font-bold mb-4">Share</h2>
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
            className="absolute top-0 right-0 m-4 bg-[#1E2136] hover:bg-[#0f101a] text-white font-bold py-2 px-4 rounded-xl focus:outline-none"
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
