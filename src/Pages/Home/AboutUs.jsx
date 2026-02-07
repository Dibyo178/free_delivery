import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaClock, FaHeart, FaShieldAlt } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-[#FCFCFC] min-h-screen font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      
      {/* --- Section 1: Minimalist Hero --- */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
          >

          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-light text-slate-900 tracking-tighter leading-none"
          >
            Digitalizing the <br />
            <span className="font-serif italic text-slate-400">Art of Dining.</span>
          </motion.h1>
        </div>
      </section>

      {/* --- Section 2: German Vibe Image Grid --- */}
      
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          className="md:col-span-8 h-[500px] rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80" 
            alt="Premium Dining"
            className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
          />
        </motion.div>
        
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-[2rem] p-10 flex-1 text-white flex flex-col justify-end">
            <h3 className="text-3xl font-bold mb-4">Quality over <br /> Everything.</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We follow the precision of technology to bring the warmth of hospitality to your doorstep.
            </p>
          </div>
          <div className="bg-red-600 rounded-[2rem] h-[150px] p-10 flex items-center justify-center">
            <span className="text-white text-6xl font-black">25+</span>
            <p className="text-white/80 text-xs uppercase font-bold ml-4 tracking-widest">Partner <br /> Brands</p>
          </div>
        </div>
      </section>

      {/* --- Section 3: Values (The German Precision) --- */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          {[
            { icon: FaUtensils, title: "Curated Menus", desc: "Every restaurant is hand-picked for quality." },
            { icon: FaClock, title: "Punctual Delivery", desc: "Precision in timing, every single order." },
            { icon: FaShieldAlt, title: "Pure Trust", desc: "Verified reviews and transparent pricing." },
            { icon: FaHeart, title: "Soulful Tech", desc: "Built with passion for the people of Sylhet." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-all duration-300">
                <item.icon className="text-red-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Section 4: Mission --- */}
      
      <section className="bg-slate-50 py-32 rounded-[4rem] mx-4 mb-10 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">
            Our Philosophy
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-12">
           Luxury is in the details. We provide an uncompromising bridge between gourmet artistry and modern convenience.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-red-600 transition-all">
              Our Partners
            </button>
            <button className="border border-slate-300 text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-white transition-all">
              Contact Us
            </button>
          </div>
        </div>
        
        {/* Background Decorative Text */}
        <div className="absolute bottom-[-50px] left-0 w-full opacity-[0.03] select-none pointer-events-none">
          <h1 className="text-[200px] font-black leading-none text-black whitespace-nowrap">
            PRECISION • QUALITY • SYLHET
          </h1>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;