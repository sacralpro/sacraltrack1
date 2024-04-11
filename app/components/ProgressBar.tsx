import { motion } from "framer-motion";
import React from "react";

const ProgressBar = ({ progress }) => {
    return (
        <div>
            <motion.div 
                style={{ width: "100%", height: 10, background: "lightgray" }} 
                initial={{ width: 0 }} 
                animate={{ width: `${progress}%` }} 
            />
        </div>
    );
};

export default ProgressBar;