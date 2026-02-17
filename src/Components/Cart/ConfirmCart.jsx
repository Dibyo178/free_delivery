import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; // নতুন ইমপোর্ট
import {
  FaChevronLeft, FaUtensils, FaMotorcycle, FaClock, 
  FaPaperPlane, FaMoneyBillWave, FaCreditCard,
  FaUser, FaPhoneAlt, FaMapMarkerAlt
} from 'react-icons/fa';
import OrderSuccess from './OrderSuccess';

const stripePromise = loadStripe("pk_test_51T1sQpQ4Wg5qHTDtKWv1gdsKV2QCl0E4dfkk40MfsxjARC1od9JZ5U5sOMVxbL8icSl3oakfAUir8VvzCl5F9JJS00Tp1uTSAk");

// --- পেমেন্ট ফর্ম কম্পোনেন্ট ---
const StripePaymentForm = ({ total, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    // কার্ড এলিমেন্ট থেকে তথ্য নেওয়া
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      Swal.fire('Error', error.message, 'error');
      setIsProcessing(false);
    } else {
      // পেমেন্ট সফল হলে এই ফাংশনটি কল হবে
      onPaymentSuccess(paymentMethod.id);
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-2xl bg-gray-50 border-gray-200">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Card Information</label>
      <div className="bg-white p-3 rounded-xl border border-gray-200">
        <CardElement options={{
          style: {
            base: { fontSize: '14px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
            invalid: { color: '#9e2146' },
          },
        }} />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="w-full mt-4 bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-[#be1e2d] transition-all disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : `Pay ৳${total}`}
      </button>
    </div>
  );
};

// --- মূল কম্পোনেন্ট ---
const ConfirmCart = () => {
  const { restaurantSlug } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', address: '' });
  const [selectedArea, setSelectedArea] = useState('Select Area');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  const cartKey = `global_cart_data`;
  const areaCharges = { Zindabazar: 40, Amberkhana: 50, Shibgonj: 60, Uposhohor: 55, Others: 80 };
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

  // পেমেন্ট সফল হওয়ার পর অর্ডার প্লেস করা
  const handlePaymentSuccess = (paymentId) => {
    setOrderData({
      total: finalTotal,
      area: selectedArea,
      method: 'Online Paid',
      transactionId: paymentId,
      customer: userInfo
    });
    setShowSuccess(true);
    sessionStorage.removeItem(cartKey);
  };

  const handleConfirmOrder = () => {
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      return Swal.fire('Missing Info', 'Please provide name, phone and address', 'warning');
    }
    if (selectedArea === 'Select Area') {
      return Swal.fire('Error', 'Please select a delivery area', 'error');
    }

    // COD হলে সরাসরি অর্ডার প্লেস
    if (paymentMethod === 'COD') {
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
          
          {/* অর্ডার সামারি সেকশন (আপনার ডিজাইন অনুযায়ী) */}
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
          </div>

          {/* ডেলিভারি এবং পেমেন্ট ফর্ম */}
          <div className="sticky top-6">
            <div className="bg-white p-6 rounded-[35px] shadow-2xl border border-gray-50">
              <h3 className="text-xl font-black mb-6 text-gray-900">Delivery Information</h3>
              
              <div className="space-y-4 mb-6">
                <input type="text" name="name" placeholder="Full Name" value={userInfo.name} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-[#be1e2d] outline-none" />
                <input type="tel" name="phone" placeholder="Contact Number" value={userInfo.phone} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-[#be1e2d] outline-none" />
                <textarea name="address" placeholder="Full Delivery Address" rows="2" value={userInfo.address} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-[#be1e2d] outline-none resize-none" />
              </div>

              <div className="mb-6">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Delivery Area</label>
                <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="w-full mt-1 p-3 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#be1e2d]">
                  <option disabled>Select Area</option>
                  {Object.keys(areaCharges).map(area => <option key={area} value={area}>{area}</option>)}
                </select>
              </div>

              {/* পেমেন্ট মেথড বাটনসমূহ */}
              <div className="mb-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button onClick={() => setPaymentMethod('COD')} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'COD' ? 'border-[#be1e2d] bg-red-50' : 'border-gray-100'}`}>
                    <FaMoneyBillWave className={paymentMethod === 'COD' ? 'text-[#be1e2d]' : 'text-gray-400'} />
                    <span className="text-[9px] font-black uppercase">Cash On Delivery</span>
                  </button>
                  <button onClick={() => setPaymentMethod('Online')} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'Online' ? 'border-[#be1e2d] bg-red-50' : 'border-gray-100'}`}>
                    <FaCreditCard className={paymentMethod === 'Online' ? 'text-[#be1e2d]' : 'text-gray-400'} />
                    <span className="text-[9px] font-black uppercase">Online Payment</span>
                  </button>
                </div>
              </div>

              {/* অনলাইন পেমেন্ট সিলেক্ট করলে কার্ড ফর্ম আসবে */}
              {paymentMethod === 'Online' ? (
                <Elements stripe={stripePromise}>
                  <StripePaymentForm total={finalTotal} onPaymentSuccess={handlePaymentSuccess} />
                </Elements>
              ) : (
                <button 
                  onClick={handleConfirmOrder}
                  className="w-full mt-4 bg-[#be1e2d] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95"
                >
                  Place Order (COD) <FaPaperPlane />
                </button>
              )}

              {/* টোটাল ক্যালকুলেশন */}
              <div className="mt-6 border-t border-dashed pt-4 space-y-2">
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
            </div>
          </div>
        </div>
      </div>

      {showSuccess && <OrderSuccess order={orderData} onClose={() => setShowSuccess(false)} />}
    </div>
  );
};

export default ConfirmCart;