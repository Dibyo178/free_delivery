import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query"; 
import { Helmet } from "react-helmet-async"; 
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaStar, FaFilter, FaArrowRight, FaMotorcycle, FaCheckCircle, FaTimes } from "react-icons/fa";

import { manualRestaurants } from "../../Components/Shared/data/restaurantsData";

const AllRestaurants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("All");

  const areas = ["Zindabazar", "Amberkhana", "Chowhatta", "Upashahar", "Subidbazar", "South Surma"];

  const { data: apiRestaurants = [], isLoading } = useQuery({
    queryKey: ['restaurants'], 
    queryFn: async () => {
      try {
        const res = await axios.get(`https://foodmenubd.com/api/all-restaurants.php`);
        return res.data.restaurants || [];
      } catch (err) { return []; }
    },
  });

  const displayRestaurants = useMemo(() => {
    const combined = [...manualRestaurants, ...apiRestaurants];
    const uniqueMap = new Map();
    combined.forEach(item => { if(item.slug) uniqueMap.set(item.slug, item); });
    const unique = Array.from(uniqueMap.values());

    return unique.filter((res) => {
      const matchesSearch = res.r_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = selectedArea === "All" || 
        (res.address && res.address.toLowerCase().includes(selectedArea.toLowerCase()));
      return matchesSearch && matchesArea;
    });
  }, [apiRestaurants, searchTerm, selectedArea]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans">
      <Helmet><title>Explore Restaurants | FoodMenu BD</title></Helmet>

      {/* --- Header Section --- */}
      <div className="bg-white/70 backdrop-blur-2xl border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl md:text-4xl font-[900] text-slate-900 tracking-tight leading-none uppercase">
                {selectedArea === "All" ? "All" : selectedArea} <span className="text-red-600 italic">Eats</span>
              </h1>
            </motion.div>

            {/* Search Bar */}
            <div className="relative w-full md:w-[450px]">
              <input
                type="text"
                placeholder="Search restaurant..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-red-500/20 transition-all text-sm font-semibold outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* --- Area Filter Logic --- */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {selectedArea === "All" ? (
                // যখন "All" থাকবে, সব এরিয়া দেখাবে
                <motion.div 
                  key="area-list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2"
                >
                  <div className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-wider shrink-0 shadow-lg">
                    <FaFilter className="text-red-500" /> Filter Area
                  </div>
                  {areas.map((area) => (
                    <button
                      key={area}
                      onClick={() => setSelectedArea(area)}
                      className="px-7 py-3 rounded-2xl text-[12px] font-extrabold bg-white text-slate-600 border border-slate-100 hover:border-red-500 transition-all shadow-sm shrink-0"
                    >
                      {area}
                    </button>
                  ))}
                </motion.div>
              ) : (
                // যখন একটি এরিয়া সিলেক্ট হবে, বাকিগুলো হাইড হয়ে শুধু এটি দেখাবে
                <motion.div 
                  key="selected-area"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center"
                >
                  <div className="flex items-center gap-4 bg-red-50 border border-red-100 px-6 py-3 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-600" />
                      <span className="text-sm font-black text-red-600 uppercase tracking-tight">
                        Results in {selectedArea}
                      </span>
                    </div>
                    <button 
                      onClick={() => setSelectedArea("All")}
                      className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow-md shadow-red-200"
                      title="Clear Filter"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- Restaurant Grid --- */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        {displayRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
              ) : (
                displayRestaurants.map((item, idx) => (
                  <RestaurantCard key={item.slug} item={item} idx={idx} navigate={navigate} />
                ))
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-slate-100">
            <span className="text-6xl">🔍</span>
            <h3 className="text-xl font-black text-slate-800 mt-4">No results in {selectedArea}</h3>
            <button onClick={() => setSelectedArea("All")} className="text-red-600 font-bold mt-2 underline">Show all restaurants</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Restaurant Card ---
const RestaurantCard = ({ item, idx, navigate }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8 }}
    onClick={() => navigate(`/cart/${item.slug}`)}
    className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-500 cursor-pointer border border-slate-50"
  >
    <div className="relative h-48 overflow-hidden">
      <img src={item.pimage} alt={item.r_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
        <FaStar className="text-orange-400 text-xs" />
        <span className="text-slate-900 font-black text-[11px]">{item.ratings || "4.8"}</span>
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-center gap-1 mb-1">
        <h3 className="text-lg font-black text-slate-800 line-clamp-1 group-hover:text-red-600 transition-colors">{item.r_name}</h3>
        <FaCheckCircle className="text-blue-500 text-[10px]" />
      </div>
      <div className="flex items-center gap-1 text-slate-400 mb-5 text-[10px] font-bold uppercase tracking-tighter">
        <FaMapMarkerAlt className="text-red-500" /> {item.address}
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-4">
        <div className="flex items-center gap-2 text-slate-700 font-black text-[11px]">
          <FaMotorcycle className="text-red-500" /> 20-30m
        </div>
        <div className="w-9 h-9 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
          <FaArrowRight size={12} />
        </div>
      </div>
    </div>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-[2.5rem] p-4 h-72 animate-pulse border border-slate-100">
    <div className="h-40 bg-slate-100 rounded-[2rem] mb-4" />
    <div className="h-4 bg-slate-100 rounded-full w-3/4 mb-2" />
    <div className="h-4 bg-slate-100 rounded-full w-1/2" />
  </div>
);

export default AllRestaurants;