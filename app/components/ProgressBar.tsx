import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
    progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
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