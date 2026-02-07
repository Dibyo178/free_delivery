import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../../src/context/CartContext'; 
import { 
  FaShoppingCart, FaPlus, FaPhoneAlt, FaSearch, 
  FaCommentDots, FaArrowLeft, FaCheck, FaEye, FaTimes, FaArrowDown 
} from "react-icons/fa"; 
import { FaLocationDot } from "react-icons/fa6"; 
import Swal from 'sweetalert2';

const RestaurantPage = () => {
  const { restaurantSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const [activeCategory, setActiveCategory] = useState('All');
  const [isUserFiltering, setIsUserFiltering] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6); 
  const [tickedId, setTickedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartBouncing, setIsCartBouncing] = useState(false);

  const [restaurantData] = useState({
    logo: "https://cdn-icons-png.flaticon.com/512/732/732217.png", 
    name: restaurantSlug?.replace(/-/g, ' '),
    location: "Zindabazar, Sylhet"
  });

  const sidebarRef = useRef(null);

  // --- Category Scroll Observer ---
  useEffect(() => {
    if (isUserFiltering || searchTerm !== '') return;
    const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cat = entry.target.getAttribute('data-category');
          setActiveCategory(cat);
          const activeBtn = document.getElementById(`btn-${cat}`);
          if (activeBtn && sidebarRef.current) {
            sidebarRef.current.scrollTo({
              left: activeBtn.offsetLeft - 20,
              behavior: 'smooth'
            });
          }
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('.product-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleCount, searchTerm, isUserFiltering]);

  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      setIsUserFiltering(false);
      setActiveCategory('All');
      setVisibleCount(6);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsUserFiltering(true);
      setActiveCategory(cat);
    }
  };

  const handleAddToCart = async (product, id) => {
    try {
      const result = await addToCart(product, restaurantSlug);
      if (result && result.status === 'success') {
        setTickedId(id);
        setIsCartBouncing(true);

        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-center',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: 'success',
          title: `${product.name} added!`,
          background: '#1a1a1a',
          color: '#fff',
          iconColor: '#22c55e',
        });

        setTimeout(() => { 
          setTickedId(null); 
          setIsCartBouncing(false); 
        }, 1000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const allProducts = [
    { id: 1, category: 'Food Offer', img: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg', name: 'Club Sandwich Deal', price: 180, desc: "Buy 1 Get 1 Club Sandwich with Fries." },
    { id: 2, category: 'Food Offer', img: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg', name: 'Butter Naan Combo', price: 120, desc: "2 Butter Naan with Chicken Reshmi Kabab." },
    { id: 3, category: 'Food Offer', img: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg', name: 'Pizza Party Pack', price: 999, desc: "2 Medium Pizzas with 1L Coke." },
    { id: 4, category: 'Main Course', img: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg', name: 'Mutton Kacchi', price: 450, desc: "Traditional Sylheti Kacchi with Saffron Rice." },
    { id: 5, category: 'Main Course', img: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg', name: 'Grilled Chicken', price: 320, desc: "Quarter Grilled Chicken with Garlic Sauce." },
    { id: 6, category: 'Main Course', img: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg', name: 'Beef Tehari', price: 280, desc: "Old Dhaka style aromatic Beef Tehari." },
    { id: 8, category: 'Fast Food', img: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg', name: 'Cheese Burger', price: 280, desc: "Juicy beef patty with extra cheddar." },
    { id: 12, category: 'Seafood', img: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg', name: 'Grilled Salmon', price: 850, desc: "Imported Salmon with butter lemon sauce." },
    { id: 18, category: 'Chinese', img: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg', name: 'Hakka Noodles', price: 220, desc: "Stir-fried noodles with veggies." },
  ];

  const filteredProducts = useMemo(() => {
    if (searchTerm) return allProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (isUserFiltering) return allProducts.filter(p => p.category === activeCategory);
    return allProducts;
  }, [searchTerm, activeCategory, isUserFiltering]);

  const cartTotalItems = useMemo(() => {
    return Array.isArray(cart) ? cart.reduce((total, item) => total + (item.quantity || 0), 0) : 0;
  }, [cart]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-32 font-inter overflow-x-hidden">
      <style>{`
        .glass-morphism { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.2); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .green-pop { animation: pop 0.4s ease forwards; background: #22c55e !important; color: white !important; }
        @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
        
        .cart-status-float { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUp { from { transform: translateY(100%) translateX(-50%); opacity: 0; } to { transform: translateY(0) translateX(-50%); opacity: 1; } }
      `}</style>

      {/* Hero Section */}
      <div className="h-[45vh] md:h-[550px] relative overflow-hidden bg-slate-900">
        <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" className="w-full h-full object-cover opacity-40" alt="" />
        <button onClick={() => navigate(-1)} className="absolute top-5 left-5 z-50 bg-white/10 backdrop-blur-lg p-4 rounded-2xl text-white border border-white/20 hover:bg-white hover:text-black transition-all"><FaArrowLeft /></button>
        <div className="absolute bottom-12 left-5 right-5 md:left-20 z-20">
          <div className="flex items-center gap-4 md:gap-8 glass-morphism p-4 md:p-8 rounded-[35px] md:rounded-[50px] shadow-2xl w-full max-w-3xl">
             <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-[25px] flex items-center justify-center p-3">
                <img src={restaurantData.logo} className="w-full h-auto" alt="logo" />
             </div>
             <div className="flex-1">
                <h1 className="text-3xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">{restaurantData.name}</h1>
                <div className="flex items-center gap-2 mt-2 md:mt-4 text-white/70">
                   <FaLocationDot className="text-[#ff4d00] text-sm md:text-xl" />
                   <span className="text-[10px] md:text-lg font-bold uppercase tracking-widest">{restaurantData.location}</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 -mt-10 md:-mt-14 relative z-30">
        
        {/* --- Premium Search Bar --- */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/90 backdrop-blur-2xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] rounded-[40px] md:rounded-full p-2 border border-white flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center w-full px-8 h-16 md:h-20 bg-slate-50/50 rounded-full group focus-within:bg-white transition-all">
              <FaSearch className="text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Find your favorite dish..." 
                className="w-full bg-transparent outline-none font-bold text-lg md:text-xl text-slate-800 ml-4 placeholder:text-slate-300" 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <div className="flex w-full md:w-auto gap-2 p-1">
              <button className="flex-1 md:w-40 h-14 md:h-16 bg-white border border-slate-100 text-slate-900 rounded-full font-black text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all uppercase">
                <FaCommentDots size={16} className="text-red-500"/> Help
              </button>
              <a href="tel:+88" className="flex-1 md:w-48 h-14 md:h-16 bg-slate-900 text-white rounded-full font-black text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-xl uppercase">
                <FaPhoneAlt size={14}/> Call Now
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-14 mt-12 md:mt-24 items-start">
          {/* Sidebar */}
          <div className="w-full lg:w-[300px] lg:sticky lg:top-28 z-40">
            <div className="bg-white p-5 md:p-7 rounded-[40px] border border-slate-100 shadow-xl">
              <div ref={sidebarRef} className="flex lg:flex-col gap-2 md:gap-3 overflow-x-auto hide-scrollbar pb-2 lg:pb-0">
                {['All', 'Food Offer', 'Main Course', 'Fast Food', 'Seafood', 'Indian', 'Chinese'].map((cat) => (
                  <button key={cat} id={`btn-${cat}`} onClick={() => handleCategoryClick(cat)}
                    className={`flex-shrink-0 px-6 py-4 rounded-[22px] font-black text-[10px] md:text-[11px] uppercase transition-all duration-300 flex items-center justify-between min-w-fit lg:min-w-0
                    ${activeCategory === cat ? 'bg-slate-900 text-white shadow-2xl scale-105' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                    <span>{cat}</span>
                    {activeCategory === cat && <div className="hidden lg:block w-2.5 h-2.5 rounded-full bg-red-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
              {filteredProducts.slice(0, isUserFiltering ? 99 : visibleCount).map((product) => (
                <div key={product.id} data-category={product.category}
                  className="product-card bg-white rounded-[45px] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50 group cursor-pointer" 
                  onClick={() => setSelectedProduct(product)}>
                  <div className="aspect-square relative overflow-hidden rounded-[35px]">
                    <img src={product.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                    <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product, product.id); }}
                      className={`absolute top-4 right-4 w-14 h-14 rounded-[22px] flex items-center justify-center shadow-xl z-10 transition-all
                      ${tickedId === product.id ? 'green-pop' : 'bg-white/90 backdrop-blur-md text-red-600 hover:bg-red-600 hover:text-white'}`}>
                      {tickedId === product.id ? <FaCheck size={20} /> : <FaPlus size={20} />}
                    </button>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{product.category}</span>
                    <h4 className="text-xl font-black text-slate-800 italic mt-1">{product.name}</h4>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-2xl font-black text-slate-950 italic">৳{product.price}</span>
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-black group-hover:text-white transition-all"><FaEye size={18}/></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!isUserFiltering && !searchTerm && visibleCount < filteredProducts.length && (
              <div className="mt-16 flex justify-center">
                <button onClick={() => setVisibleCount(prev => prev + 6)} className="flex items-center gap-3 bg-white border-2 border-slate-200 px-10 py-5 rounded-full font-black text-slate-900 shadow-xl uppercase text-xs tracking-widest">Explore More <FaArrowDown /></button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Premium Floating Cart Bar --- */}
      {cartTotalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-md cart-status-float">
          <Link to={`/cart/${restaurantSlug}/ConfirmCart`} className="block">
            <div className="bg-slate-900 text-white rounded-[32px] p-2 flex items-center justify-between shadow-2xl border border-white/10 hover:scale-[1.02] active:scale-95 transition-all">
              <div className="flex items-center gap-4 pl-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
                    <FaShoppingCart className="text-white text-xl" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center ring-4 ring-slate-900">
                    {cartTotalItems}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Items in Bag</p>
                  <p className="text-sm font-bold tracking-tight italic">View Gourmet Selection</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl px-6 py-4 flex items-center gap-3">
                <span className="font-black text-xs tracking-widest uppercase">Proceed</span>
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <FaArrowDown className="-rotate-90 text-[10px]" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[6000] flex items-end md:items-center justify-center p-0 md:p-6 bg-slate-950/90 backdrop-blur-sm">
          <div className="bg-white rounded-t-[40px] md:rounded-[60px] overflow-hidden max-w-5xl w-full flex flex-col md:flex-row relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-5 right-5 z-50 bg-slate-100 p-4 rounded-full hover:bg-red-500 hover:text-white transition-all"><FaTimes/></button>
            <div className="w-full md:w-1/2 h-72 md:h-auto"><img src={selectedProduct.img} className="w-full h-full object-cover" alt="" /></div>
            <div className="p-8 md:p-16 flex-1 flex flex-col justify-center">
              <span className="text-red-500 font-black text-xs uppercase mb-3 tracking-widest">{selectedProduct.category}</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 italic mb-6 tracking-tighter">{selectedProduct.name}</h2>
              <p className="text-slate-500 mb-10 text-lg leading-relaxed">{selectedProduct.desc}</p>
              <div className="flex items-center justify-between gap-4">
                <span className="text-4xl md:text-5xl font-black italic">৳{selectedProduct.price}</span>
                <button onClick={() => { handleAddToCart(selectedProduct, selectedProduct.id); setSelectedProduct(null); }} className="flex-1 bg-red-600 text-white py-6 rounded-[25px] font-black text-xl shadow-2xl uppercase tracking-widest">Add To Basket</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;