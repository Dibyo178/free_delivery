import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';const ContactUs = () => {
  return (
    <div className="bg-[#FCFCFC] min-h-screen font-['Plus_Jakarta_Sans',sans-serif] pb-20">
      
      {/* --- Section 1: Hero Header --- */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            Available 24/7 — Priority Support
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-light text-slate-900 tracking-tighter leading-none"
          >
            Connect with us <br />
          </motion.h1>
        </div>
      </section>

      {/* --- Section 2: Contact Grid --- */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-50"
        >
          <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Send a Message</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-red-500/20 transition-all font-medium text-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-red-500/20 transition-all font-medium text-slate-800" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Subject</label>
              <input type="text" placeholder="Inquiry about delivery" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-red-500/20 transition-all font-medium text-slate-800" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Message</label>
              <textarea rows="5" placeholder="How can we help you?" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-red-500/20 transition-all font-medium text-slate-800 resize-none"></textarea>
            </div>
            <button className="bg-slate-900 text-white w-full md:w-auto px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.2em] hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200">
              Send Message <FaPaperPlane />
            </button>
          </form>
        </motion.div>

        {/* Right: Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          

 
<div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
  <FaMapMarkerAlt className="text-red-500 absolute top-10 right-10 text-4xl opacity-20 group-hover:scale-110 transition-transform" />
  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 mb-6">Headquarters</h4>
  
  <p className="text-xl font-light leading-relaxed mb-2 text-slate-200">
    Friedrichstraße 176, <br />
  
  </p>
  
  <p className="text-slate-400 text-sm tracking-wide">10117 Berlin, Mitte District</p>
</div>

          {/* Card 2: Contact Info */}
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 flex-1 shadow-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-10">Direct Lines</h4>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-red-600">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Support</p>
                  <p className="font-black text-slate-900">+880 1234-567890</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-red-600">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email</p>
                  <p className="font-black text-slate-900">support@fooddelivery.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Social Tag */}
        {/* Card 3: Social Tag with Icons */}
<div className="bg-red-600 rounded-[2.5rem] p-8 flex items-center justify-between group overflow-hidden relative">
  <span className="text-white font-black uppercase text-xs tracking-widest relative z-10">
    Follow Our Journey
  </span>
  
  <div className="flex gap-3 relative z-10">
    {/* Facebook */}
    <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white hover:text-red-600 transition-all duration-500 rounded-xl flex items-center justify-center text-white shadow-lg backdrop-blur-md">
      <FaFacebookF size={16} />
    </a>
    
    {/* Instagram */}
    <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white hover:text-red-600 transition-all duration-500 rounded-xl flex items-center justify-center text-white shadow-lg backdrop-blur-md">
      <FaInstagram size={18} />
    </a>
    
    {/* Linkedin */}
    <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white hover:text-red-600 transition-all duration-500 rounded-xl flex items-center justify-center text-white shadow-lg backdrop-blur-md">
      <FaLinkedinIn size={18} />
    </a>
  </div>

  {/* Background Decorative Circle */}
  <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
</div>

        </div>
      </section>

      {/* --- Decorative Background Text --- */}
      <div className="mt-20 opacity-[0.03] select-none pointer-events-none overflow-hidden">
          {/* <h1 className="text-[120px] md:text-[180px] font-black leading-none text-black whitespace-nowrap uppercase">
            Contact• Support
          </h1> */}
      </div>
    </div>
  );
};

export default ContactUs;