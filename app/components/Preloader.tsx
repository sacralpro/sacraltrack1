import React from 'react';

const Preloader = () => {
    return (
        <div className="preloader bg-[#000] items-center w-full flex flex-col justify-center h-screen">
            <img className="w-[100px] h-auto items-center" src="/images/loader.gif" alt="sacraltrack preloader" />
            {/*<p className="text-center mt-4">Loading...</p>*/}
        </div>
    );
};

export default Preloader;