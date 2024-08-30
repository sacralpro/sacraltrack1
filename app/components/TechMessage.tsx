import { useState } from 'react';

const TechMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="bg-[#1E2136] fixed rounded-2xl w-full shadow-2xl max-w-[300px] p-6 text-white  h-[500px] mt-[100px]">
        <button
          className="absolute top-4 right-4 text-[#838383] hover:text-white transition-colors duration-300"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Dear User,</h2>
        <p className="mb-4 text-sm font-normal">
          We are excited to announce that our platform is now open in a testing mode. The basic functionality is working, including:
        </p>
        <ul className="list-disc pl-6 mb-4 text-sm">
          <li>Account registration</li>
          <li>Release publishing</li>
          <li>Listening</li>
          <li>Purchasing</li>
          <li>Downloading tracks</li>
          <li>Likes</li>
          <li>Comments</li>
          <li>Sharing</li>
          <li>Royalty withdrawal</li>
        </ul>
        <p className="mb-4 text-sm">
          We are still working on fixing bugs and improving the application. Thank you for your trust and for using our platform.
        </p>
        <p className="text-[#ffffff] font-bold text-sm">Enjoy the music! ST Team</p>
      </div>
    )
  );
};

export default TechMessage;
