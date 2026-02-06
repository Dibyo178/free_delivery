import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Mail, ChevronUp, Instagram, Twitter, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../assets/Images/logo.png';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Partner with Us", path: "/partner" },
        { name: "How It Works", path: "/how-it-works" },
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Pickup", path: "/pickup" },
        { name: "Dine-In", path: "/dine-in" },
        { name: "Food Delivery", path: "/delivery" },
        { name: "Subscription", path: "/subscription" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Help & Support", path: "/help" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
      ]
    }
  ];

  return (
    <footer className="relative bg-[#0F172A] pt-20 pb-10 overflow-hidden font-['Inter',sans-serif]">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <img 
                src={logo} 
                alt="FoodMenu BD" 
                className="h-25 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-105" 
              />
            </Link>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Crafting premium dining experiences through technology. Order your favorite meals with zero friction.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300 border border-slate-700/50"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Links Mapping */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest">{group.title}</h3>
                <ul className="space-y-4">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        to={link.path} 
                        className="text-slate-400 hover:text-red-500 text-sm transition-colors duration-200 block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter / Contact Column */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-400 group">
                <MapPin size={18} className="text-red-500 shrink-0" />
                <span className="text-sm group-hover:text-slate-200 transition-colors">Berlin, Germany</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 group">
                <Mail size={18} className="text-red-500 shrink-0" />
                <a href="mailto:info@freedelivery.com" className="text-sm group-hover:text-slate-200 transition-colors">info@smithitbd.com</a>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:border-red-500/50 transition-all"
                />
                <button className="absolute right-2 top-1.5 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg transition-colors">
                  <ChevronUp className="rotate-90" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
    
      </div>

      {/* Floating Scroll Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-red-600 text-white rounded-2xl shadow-[0_10px_30px_rgba(220,38,38,0.4)] flex items-center justify-center hover:bg-black hover:-translate-y-2 transition-all duration-300 group"
          >
            <ChevronUp className="group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;