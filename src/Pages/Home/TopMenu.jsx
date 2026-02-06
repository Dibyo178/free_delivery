import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft, HiStar, HiBadgeCheck } from 'react-icons/hi'; 

import { manualRestaurants } from '../../Components/Shared/data/restaurantsData';

const TopMenu = () => {
  const titleRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsDataLoading(false), 1000);
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStartTyping(true); },
      { threshold: 0.5 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, []);

  const MenuItemCard = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -12 }}
      onClick={() => navigate(`/cart/${item.slug}`)}
      className="group relative cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(176,37,50,0.12)] transition-all duration-700 border border-gray-50 mx-1 mb-6"
    >
      <div className="relative h-44 md:h-52 overflow-hidden m-3 rounded-[2rem]">
        <img
          src={item.pimage}
          alt={item.r_name}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 border border-white/50">
          <HiStar className="text-orange-400 text-xs" />
          <span className="text-[11px] font-black text-slate-900">{item.ratings || "4.8"}</span>
        </div>
      </div>
      
      <div className="p-6 pt-2 text-center">
        <div className="flex items-center justify-center gap-1 mb-2">
          <h3 className="font-black text-slate-800 text-base md:text-lg truncate tracking-tight group-hover:text-[#b02532] transition-colors">
            {item.r_name}
          </h3>
          <HiBadgeCheck className="text-blue-500 text-sm shrink-0" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          <span className="text-[9px] text-slate-400 group-hover:text-red-600 font-black uppercase tracking-widest transition-colors">Ready to Serve</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative py-24 bg-[#FAFAFB] font-['Gilroy'] overflow-hidden">
      {/* Bg Decors */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-red-100/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* Header Section (Centered) */}
        <div className="text-center mb-16" ref={titleRef}>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={startTyping ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="h-[2px] w-8 bg-[#b02532]"></span>
            <p className="text-[11px] font-black tracking-[0.3em] text-[#b02532] uppercase">
              Curated Collections
            </p>
            <span className="h-[2px] w-8 bg-[#b02532]"></span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02532] to-orange-500">Elite</span> <br /> 
            Dining Circle
          </h2>
        </div>

        {/* Carousel Unit */}
        <div className="relative group">
          {/* Custom Navigation */}
          <button className="swiper-prev-btn absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-[#b02532] hover:scale-110 transition-all opacity-0 group-hover:opacity-100 border border-gray-100 hidden lg:flex">
            <HiOutlineArrowNarrowLeft size={20} />
          </button>
          <button className="swiper-next-btn absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-[#b02532] hover:scale-110 transition-all opacity-0 group-hover:opacity-100 border border-gray-100 hidden lg:flex">
            <HiOutlineArrowNarrowRight size={20} />
          </button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={25}
            slidesPerView={1.3}
            navigation={{ nextEl: '.swiper-next-btn', prevEl: '.swiper-prev-btn' }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.8 },
              1280: { slidesPerView: 4.8 },
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="!pb-12"
          >
            {isDataLoading 
              ? [...Array(6)].map((_, i) => (
                  <SwiperSlide key={i}><div className="h-[320px] bg-gray-100 rounded-[2.5rem] animate-pulse" /></SwiperSlide>
                ))
              : manualRestaurants.map((rest) => (
                  <SwiperSlide key={rest.id}><MenuItemCard item={rest} /></SwiperSlide>
                ))
            }
          </Swiper>
        </div>

        {/* Action Button Section (Below Carousel) */}
        <div className="flex flex-col items-center mt-12">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/all-restaurants')} 
            className="group flex items-center gap-6 bg-slate-900 text-white pl-10 pr-5 py-5 rounded-[2rem] shadow-[0_20px_40px_rgba(15,23,42,0.2)] hover:bg-[#b02532] transition-all duration-500"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em]">Explore All</span>
            <div className="bg-white/10 p-2.5 rounded-xl group-hover:bg-white group-hover:text-[#b02532] transition-all">
               <HiOutlineArrowNarrowRight size={22} />
            </div>
          </motion.button>
          
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet { background: #E2E8F0; opacity: 1; height: 6px; width: 6px; }
        .swiper-pagination-bullet-active {
          background: #b02532 !important;
          width: 24px !important;
          border-radius: 10px !important;
        }
      `}</style>
    </section>
  );
};

export default TopMenu;
