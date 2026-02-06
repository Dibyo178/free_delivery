import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import OrderTrackerWidget from "../../Button/OrderTrackerSticky";
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const restaurants = [
  { id: 1, name: "Panshi Restaurant", slug: "panshi", address: "Zindabazar, Sylhet", img: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" },
  { id: 2, name: "Woondal King", slug: "woondal", address: "Amberkhana, Sylhet", img: "https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg" },
  { id: 3, name: "Bhujon Bari", slug: "bhujon", address: "Modina Market, Sylhet", img: "https://images.pexels.com/photos/687824/pexels-photo-687824.jpeg" },
];

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-[100] w-full transition-all duration-500 ${
      scrolled ? "bg-white shadow-md py-1" : "bg-white py-2"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* ১. লোগো */}
          <div className="shrink-0 flex items-center gap-4">
            {/* মোবাইল মেনু বাটন (৩-বার) */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Bars3Icon className="w-7 h-7" />
            </button>
            <Link to="/" className="flex items-center">
              <img src={logo} alt="logo" className="h-10 md:h-20 w-auto" />
            </Link>
          </div>

          {/* ২. ডেস্কটপ মেনু ও সার্চ */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8 font-bold text-slate-600 text-sm uppercase">
              <Link to="/" className={`hover:text-red-500 transition-colors ${location.pathname === '/' ? 'text-red-600' : ''}`}>Home</Link>
              <Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link>
            </div>

            {/* সার্চ বক্স */}
            <div className="relative" ref={searchRef}>
              <div className="flex items-center bg-gray-100 border border-transparent rounded-2xl px-3 py-2 w-32 sm:w-48 md:w-64 focus-within:w-40 sm:focus-within:w-72 transition-all duration-300 focus-within:bg-white focus-within:border-red-200">
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => {setQuery(e.target.value); setShowSuggestions(true);}}
                  className="bg-transparent border-none outline-none text-sm w-full font-medium"
                />
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
              </div>

              {/* ড্রপডাউন (সার্চ রেজাল্ট) */}
              <AnimatePresence>
                {showSuggestions && query && (
                  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    {filtered.map(r => (
                      <Link key={r.id} to={`/cart/${r.slug}`} className="flex items-center gap-3 p-3 hover:bg-gray-50" onClick={() => setShowSuggestions(false)}>
                        <img src={r.img} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="text-sm font-bold text-slate-800">{r.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <OrderTrackerWidget />
          </div>
        </div>
      </div>

      {/* ৩. মোবাইল ড্রয়ার মেনু (Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* ব্যাকগ্রাউন্ড ব্লার ইফেক্ট */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]"
            />
            {/* মেনু কন্টেন্ট */}
            <motion.div 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[120] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <img src={logo} alt="logo" className="h-8 w-auto" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <XMarkIcon className="w-6 h-6 text-slate-800" />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-lg font-black text-slate-800 uppercase tracking-tighter">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-600 transition-all border-b border-gray-50 pb-2">Home</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-600 transition-all border-b border-gray-50 pb-2">About Us</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-600 transition-all border-b border-gray-50 pb-2">Contact</Link>
              </div>

              <div className="mt-auto pt-10">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                  <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                  <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;