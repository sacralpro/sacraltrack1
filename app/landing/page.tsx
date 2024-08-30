"use client"

import React from 'react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 text-white">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/images/st.png" alt="Logo" className="h-8" />
        </motion.div>
        <motion.nav
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-4"
        >
          <a href="#" className="hover:text-gray-400">
            How it works
          </a>
          <a href="#" className="hover:text-gray-400">
            Royalty
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </motion.nav>
      </header>

      {/* Section 1 */}



      <section className="bg-gray-900 text-white py-16 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
         {/* Бегущая строка */}
      <section className="text-white w-full overflow-hidden">
        <div className="div-run1">
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK
        </div>
        <div className="div-run2">
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK <img
            src="/images/st.png"
            alt="SACRAL TRACK"
            className="inline-block h-16 mr-4 rotate-90"
          />
          SACRAL TRACK
        </div>
        
      </section>


          <h1 className="text-4xl font-bold mb-4">Heading 1</h1>
          <h2 className="text-2xl font-bold mb-4">Heading 2</h2>
          <h3 className="text-2xl font-bold mb-4">Heading 3</h3>
        </motion.div>
      </section>

      {/* Section 2 */}
      <section className="bg-gray-800 text-white py-16 px-4 md:px-8 md:flex">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <h2 className="text-2xl font-bold mb-4">Section 2 Heading</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vestibulum, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec
            aliquam nisl nisl sit amet nisl.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2"
        >
          <img src="/images/st.png" alt="Section 2 Image" className="w-full" />
        </motion.div>
      </section>
 {/* Section 3 */}
 <section className="bg-gray-900 text-white py-16 px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Section 3 Heading 1</h2>
          <h2 className="text-2xl font-bold mb-4">Section 3 Heading 2</h2>
          <h2 className="text-2xl font-bold mb-8">Section 3 Heading 3</h2>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Call to Action
        </motion.button>
      </section>
    </div>
  );
};

export default LandingPage;