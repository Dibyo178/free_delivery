import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js'; // সঠিক ইমপোর্ট: @stripe/stripe-js
import {
  FaPlus, FaMinus, FaChevronLeft, FaUtensils, 
  FaMotorcycle, FaClock, FaPaperPlane, FaMoneyBillWave, FaCreditCard,
  FaUser, FaPhoneAlt, FaMapMarkerAlt
} from 'react-icons/fa';
import OrderSuccess from './OrderSuccess';

// আপনার স্ট্রাইপ পাবলিশেবল কী এখানে দিন
const stripePromise = loadStripe("pk_test_your_public_key");

const ConfirmCart = () => {
  const { restaurantSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  
  // কন্টাক্ট এবং এড্রেস ইনফো
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [selectedArea, setSelectedArea] = useState('Select Area');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // ডিফল্ট COD
  
  const cartKey = `global_cart_data`;

  const areaCharges = { 
    Zindabazar: 40, Amberkhana: 50, Shibgonj: 60, Uposhohor: 55, Others: 80 
  };
  
  const currentCharge = areaCharges[selectedArea] || 0;

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem(cartKey)) || [];
    setCartItems(saved);
    window.scrollTo(0, 0);
  }, []);

  const totalAmount = cartItems.reduce((a, i) => a + i.price * i.quantity, 0);
  const finalTotal = totalAmount + currentCharge;

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

const handleConfirmOrder = async () => {
  if (!userInfo.name || !userInfo.phone || !userInfo.address) {
    return Swal.fire('Missing Info', 'Please provide name, phone and address', 'warning');
  }
  if (selectedArea === 'Select Area') {
    return Swal.fire('Error', 'Please select a delivery area', 'error');
  }

  if (paymentMethod === 'Online') {
    Swal.fire({
      title: 'Redirecting to Stripe...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      const stripe = await stripePromise;

      // ১. আপনার ব্যাকএন্ড এপিআই কল করুন সেশন আইডি পাওয়ার জন্য
      const response = await fetch("YOUR_BACKEND_URL/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          customer: userInfo,
          total: finalTotal
        }),
      });

      const session = await response.json();

      // ২. স্ট্রাইপ চেকআউটে রিডাইরেক্ট করুন
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        Swal.fire('Error', result.error.message, 'error');
      }
    } catch (error) {
      console.error("Stripe Error:", error);
      Swal.fire('Error', 'Failed to connect to Stripe. Try COD.', 'error');
    }
  } else {
    // ক্যাশ অন ডেলিভারি আগের মতোই কাজ করবে
    setOrderData({ 
      total: finalTotal, 
      area: selectedArea, 
      method: 'Cash on Delivery',
      customer: userInfo 
    });
    setShowSuccess(true);
    sessionStorage.removeItem(cartKey);
  }
};

  return (
    <div className="bg-[#fcfdfe] min-h-screen px-4 md:px-10 py-6 md:py-10 font-inter">
      <div className="max-w-[1150px] mx-auto">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 font-bold mb-6 hover:text-black">
          <FaChevronLeft size={12} /> Return to Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
          
          {/* অর্ডার সামারি */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-2 text-gray-900">
              <FaUtensils className="text-[#be1e2d]" /> Order Summary
            </h2>

            <div className="space-y-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-[25px] border border-gray-100 flex items-center gap-4 shadow-sm">
                  <img src={item.img} className="w-16 h-16 rounded-xl object-cover" alt={item.name} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-sm font-bold text-[#be1e2d]">৳{item.price}</p>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full font-black text-xs">x{item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="bg-white p-5 rounded-[25px] border border-dashed border-gray-200 flex justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <FaMotorcycle /> <span className="text-xs font-black uppercase tracking-tight">Fee: ৳{currentCharge}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaClock /> <span className="text-xs font-black uppercase tracking-tight">30-45 Mins</span>
              </div>
            </div>
          </div>

          {/* ডেলিভারি এবং পেমেন্ট ফর্ম */}
          <div className="sticky top-6">
            <div className="bg-white p-6 rounded-[35px] shadow-2xl border border-gray-50">
              <h3 className="text-xl font-black mb-6 text-gray-900">Delivery Information</h3>
              
              {/* কন্টাক্ট ফিল্ডস */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  <input 
                    type="text" name="name" placeholder="Full Name" value={userInfo.name} onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-[#be1e2d] outline-none"
                  />
                </div>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  <input 
                    type="tel" name="phone" placeholder="Contact Number" value={userInfo.phone} onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-[#be1e2d] outline-none"
                  />
                </div>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400 text-xs" />
                  <textarea 
                    name="address" placeholder="Full Delivery Address" rows="2" value={userInfo.address} onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-[#be1e2d] outline-none resize-none"
                  />
                </div>
              </div>

              {/* এরিয়া সিলেকশন */}
              <div className="mb-6">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Delivery Area</label>
                <select 
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full mt-1 p-3.5 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#be1e2d]"
                >
                  <option disabled>Select Area</option>
                  {Object.keys(areaCharges).map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* পেমেন্ট মেথড */}
              <div className="mb-8">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button 
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'COD' ? 'border-[#be1e2d] bg-red-50' : 'border-gray-100'}`}
                  >
                    <FaMoneyBillWave className={paymentMethod === 'COD' ? 'text-[#be1e2d]' : 'text-gray-400'} />
                    <span className="text-[9px] font-black">CASH ON DELIVERY</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('Online')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'Online' ? 'border-[#be1e2d] bg-red-50' : 'border-gray-100'}`}
                  >
                    <FaCreditCard className={paymentMethod === 'Online' ? 'text-[#be1e2d]' : 'text-gray-400'} />
                    <span className="text-[9px] font-black">ONLINE PAYMENT</span>
                  </button>
                </div>
              </div>

              {/* টোটাল ক্যালকুলেশন */}
              <div className="space-y-2 border-t border-dashed pt-4">
                <div className="flex justify-between font-bold text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>৳{totalAmount}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-500 text-sm">
                  <span>Delivery Fee</span>
                  <span>৳{currentCharge}</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-gray-900 pt-2 border-t border-gray-100 mt-2">
                  <span>Total</span>
                  <span className="text-[#be1e2d]">৳{finalTotal}</span>
                </div>
              </div>

              <button 
                onClick={handleConfirmOrder}
                className="w-full mt-8 bg-[#be1e2d] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95"
              >
                {paymentMethod === 'Online' ? 'Confirm & Pay' : 'Place Order (COD)'} <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && <OrderSuccess order={orderData} onClose={() => setShowSuccess(false)} />}
    </div>
  );
};

export default ConfirmCart;