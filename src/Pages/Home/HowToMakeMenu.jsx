import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from '../../Components/Button/CTAButton'; 
import menuDemo from '../../assets/images/createmenu.jpg';
import CreationModal from '../../Components/Shared/CreationModal';

const HowToMakeMenu = () => {
  const [openIndex, setOpenIndex] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps = [
    {
      title: "Secure Authentication",
      desc: "Access your centralized workstation via our encrypted gateway. Manage global assets, restaurant profiles, and historical archives from a singular, high-performance interface."
    },
    {
      title: "Strategic Selection",
      desc: "Browse a curated collection of industry-specific frameworks. Our intelligence-driven templates are designed to maximize appetite appeal and streamline customer decision-making."
    },
    {
      title: "Precision Engineering",
      desc: "Fine-tune every pixel. Our intuitive studio allows for complex brand integration, high-fidelity image processing, and sophisticated typography control without the steep learning curve."
    },
    {
      title: "Omnichannel Deployment",
      desc: "Instantly export ultra-high-definition assets for physical production or generate dynamic QR-linked digital menus for real-time customer engagement."
    }
  ];

  return (
    <section className="relative py-24 lg:py-36 bg-[#FFFFFF] font-['Inter',sans-serif] overflow-hidden">
      {/* Premium Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px]">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-50/60 rounded-full blur-[120px] opacity-70" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 lg:mb-32 gap-8">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-[1px] bg-red-600"></span>
              <span className="text-red-600 font-bold uppercase text-[11px] tracking-[0.4em]">Operations Flow</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
              Designed for <br />
              <span className="text-slate-300">Modern Gastronomy.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-slate-500 text-lg leading-relaxed border-l-2 border-slate-100 pl-6">
              Our streamlined workflow bridges the gap between high-end design and operational efficiency.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Visual Canvas (Sticky) */}
          <div className="lg:col-span-6 lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Image Frame with Glass Effect */}
              <div className="relative z-10 p-3 bg-white border border-slate-100 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]">
                <img 
                  src={menuDemo} 
                  alt="Interface" 
                  className="w-full h-auto rounded-[2.5rem] object-cover"
                />
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
            </motion.div>
          </div>

          {/* Interaction Zone */}
          <div className="lg:col-span-6 pt-4">
            <div className="space-y-4">
              {steps.map((item, index) => {
                const isActive = openIndex === index;
                return (
                  <motion.div 
                    key={index}
                    onClick={() => setOpenIndex(index)}
                    className={`group relative overflow-hidden transition-all duration-500 cursor-pointer rounded-[2.5rem] border ${
                      isActive 
                      ? 'bg-slate-950 border-slate-800 p-8 md:p-10 shadow-2xl' 
                      : 'bg-transparent border-transparent p-6 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-8">
                      {/* Abstract Step Indicator */}
                      <span className={`text-4xl font-black leading-none transition-all duration-500 ${
                        isActive ? 'text-red-600' : 'text-slate-100 group-hover:text-slate-200'
                      }`}>
                        0{index + 1}
                      </span>

                      <div className="flex-1">
                        <h3 className={`text-2xl font-black mb-4 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-800'
                        }`}>
                          {item.title}
                        </h3>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                {item.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Premium Arrow */}
                      <div className={`mt-2 transition-transform duration-500 ${isActive ? 'rotate-[-45deg] text-red-600' : 'text-slate-300'}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-16 flex flex-col sm:flex-row items-center gap-8 pl-25"
            >
              <div onClick={() => setIsModalOpen(true)}>
                <CTAButton>
                  Initiate Design Studio
                </CTAButton>
              </div>
             
            </motion.div>
          </div>

        </div>
      </div>

      <CreationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default HowToMakeMenu;