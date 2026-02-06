import React, { useState } from 'react';
import Video from '../../assets/video/cover.mp4';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative w-full h-[85vh] lg:h-[90vh] overflow-hidden font-['Gilroy']">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" /> 
        
        {!videoLoaded && (
          <div className="absolute inset-0 bg-slate-900 animate-pulse" />
        )}

        <video
          autoPlay 
          muted 
          loop 
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={Video} type="video/mp4" />
        </video>
      </div>

      {/* --- Main Hero Content --- */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        
        {/* Top Mini Badge (Premium Addition) */}
      

        {/* Main Title with Wave/Floating Animation */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <h1 className="text-5xl lg:text-9xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
            DESIRE IT? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              TASTE IT!
            </span>
          </h1>
        </motion.div>

        {/* Dynamic Context Addition (Premium Addition) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12"
        >
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-white leading-none">30 min</p>
            <p className="text-[10px] md:text-xs text-white/60 font-bold uppercase mt-1 tracking-widest">Avg Delivery</p>
          </div>
          <div className="w-[1px] h-10 bg-white/20 hidden md:block"></div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-white leading-none">500+</p>
            <p className="text-[10px] md:text-xs text-white/60 font-bold uppercase mt-1 tracking-widest">Restaurants</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="w-48 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(220,38,38,0.4)]">
            Order Now
          </button>
          <button className="w-48 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-red-600 transition-all shadow-xl">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Bottom Subtle Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;