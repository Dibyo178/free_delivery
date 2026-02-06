import React from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// কাস্টম উবার-স্টাইল পিন
const createCustomIcon = (name) => {
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #b02532; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(176,37,50,0.5); position: relative;">
            <div style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); background: white; padding: 2px 8px; border-radius: 4px; font-size: 8px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: #333;">${name}</div>
           </div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// জার্মানির বিভিন্ন শহরের ডাটা (Berlin, Munich, Hamburg)
const pinsData = [
  { name: 'Berlin Central', lat: 52.5200, lng: 13.4050 },
  { name: 'Munich Altstadt', lat: 48.1351, lng: 11.5820 },
  { name: 'Hamburg Port', lat: 53.5488, lng: 9.9872 },
  { name: 'Frankfurt City', lat: 50.1109, lng: 8.6821 },
  { name: 'Cologne Dome', lat: 50.9375, lng: 6.9603 },
];

const ExploreArea = () => {
  return (
    <section className="bg-white py-16 md:py-24 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-red-600 font-black text-xs uppercase tracking-[4px] mb-3">Germany Presence</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            Our Restaurants <br />
            <span className="text-slate-400 font-medium italic">Across Germany</span>
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.1)] border-8 border-white bg-slate-50"
        >
          <MapContainer 
            key="germany-map"
            center={[51.1657, 10.4515]} // জার্মানির একদম মাঝখানে ম্যাপ ফোকাস করবে
            zoom={6} // পুরো দেশ দেখার জন্য জুম কমিয়ে দেওয়া হয়েছে
            scrollWheelZoom={false}
            className="h-full w-full z-0"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap'
            />

            {pinsData.map((pin, index) => (
              <Marker 
                key={`pin-${index}`} 
                position={[pin.lat, pin.lng]} 
                icon={createCustomIcon(pin.name)}
              >
                <Popup closeButton={false}>
                  <div className="p-2 text-center min-w-[120px]">
                    <h3 className="font-black text-slate-800 text-sm mb-2">{pin.name}</h3>
                    <Link 
                      to={`/Arealist/${pin.name.replace(/\s/g, '-')}`}
                      className="inline-block bg-[#b02532] text-white text-[10px] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all no-underline"
                    >
                      View Menu
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>
      </div>

      <style>{`
        .leaflet-popup-content-wrapper { border-radius: 12px; padding: 0; overflow: hidden; }
        .leaflet-popup-content { margin: 0; }
        .leaflet-container { font-family: 'Inter', sans-serif; cursor: grab; }
        .leaflet-container:active { cursor: grabbing; }
      `}</style>
    </section>
  );
};

export default ExploreArea;