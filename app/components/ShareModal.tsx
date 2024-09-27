import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

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
}) => {
  const [copySuccess, setCopySuccess] = useState('');

  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://sacraltrack.store';
  const shareUrl = `${domain}/post/${postId}/${userId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Error');
      console.error('Error copying text: ', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#272B43] rounded-2xl p-6 pb-10 w-[318px] md:w-full m-5 max-w-md relative shadow-lg">
          <h2 className="text-white text-lg font-bold mb-8">Share</h2>
          <div className="flex flex-col items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="bg-[#181a27] text-white rounded-xl p-2 w-full text-center pr-10 py-3"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-black"
                onClick={copyToClipboard}
              >
                <FaCopy size={24} />
              </button>
            </div>
            {copySuccess && <p className="text-white mt-8">{copySuccess}</p>}
          </div>
          <button
            className="absolute top-0 right-0 m-4 hover:bg-[#1e2036] text-white font-bold py-3 px-3 rounded-xl focus:outline-none"
            onClick={onClose}
          >
            <img src='/images/close.svg' alt="close" style={{width: '12px', height: '12px'}}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
