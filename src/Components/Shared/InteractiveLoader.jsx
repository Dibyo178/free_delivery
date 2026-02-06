import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { GiHamburger, GiPizzaSlice, GiCupcake, GiCoffeeCup, GiChickenOven } from "react-icons/gi";

const InteractiveLoader = ({ onFinished }) => {
  const foodIcons = [
    { icon: <GiHamburger />, angle: 0, delay: 0.2 },
    { icon: <GiPizzaSlice />, angle: 72, delay: 0.8 },
    { icon: <GiChickenOven />, angle: 144, delay: 1.4 },
    { icon: <GiCupcake />, angle: 216, delay: 2.0 },
    { icon: <GiCoffeeCup />, angle: 288, delay: 2.6 },
  ];

  useEffect(() => {
    // ঠিক ৪ সেকেন্ড পর আমরা App-কে বলব যে অ্যানিমেশন শেষ
    const timer = setTimeout(() => {
      if (onFinished) onFinished();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* সার্কেল ট্রাভার্সাল */}
        <svg className="absolute w-full h-full rotate-[-90deg]">
          <circle cx="128" cy="128" r="100" stroke="#F1F5F9" strokeWidth="8" fill="transparent" />
          <motion.circle
            cx="128"
            cy="128"
            r="100"
            stroke="#b02532"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="628"
            initial={{ strokeDashoffset: 628 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3.5, ease: "linear" }}
            strokeLinecap="round"
          />
        </svg>

        {/* আইকনগুলো একে একে আসা */}
        {foodIcons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay, duration: 0.4 }}
            style={{
              position: "absolute",
              transform: `rotate(${item.angle}deg) translateY(-100px) rotate(-${item.angle}deg)`,
            }}
            className="w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-[#b02532] text-2xl border border-gray-50 z-10"
          >
            {item.icon}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="text-center"
        >
        
        </motion.div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div className="h-1 bg-gray-100 w-40 rounded-full overflow-hidden mb-4">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
            className="h-full bg-[#b02532]"
          />
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">
          Loading the Menu...
        </p>
      </div>
    </div>
  );
};

export default InteractiveLoader;