// UploadModal.tsx
import React from 'react';

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black opacity-85 px-5">
        <div className="bg-[#272B43] rounded-2xl shadow-lg p-6 pb-10 w-full max-w-md relative opacity-100">
          <h2 className="text-white text-lg font-bold mb-4">Caution!</h2>
          <p className="text-white mb-4">
          Caution!
          Only the artist who created the original composition can upload a track to the Sacral Track store. 
          If the uploaded track is not your authorship,
          it will be removed from the market. For more information about the terms of use, <a href="/terms" className="text-[#5492FA] hover:text-white">Please read here.</a>
          </p>
          <p className="text-white">
          *By uploading a track, the Sacral Track - Artists agreement takes effect, 
          where rights to the track are transferred to Sacral Track. 
          The artist have royalties amounting to 50% of the current price - $2.
          </p>
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

export default UploadModal;
