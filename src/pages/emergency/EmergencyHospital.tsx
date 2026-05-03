import { Heart, MapPin, Navigation, Phone } from 'lucide-react';
import { PageLayout, MapPlaceholder } from '../../components/Layout';

const hospitals = [
  { name: 'City General Hospital', distance: '0.8 km', address: '1 Hospital Road, Central District', phone: '+91 80 1234 5678', emergency: true, beds: '50 available', rating: 4.8, type: 'Government' },
  { name: "St. Mary's Medical Center", distance: '1.3 km', address: '23 Church Road, West End', phone: '+91 80 2345 6789', emergency: true, beds: '32 available', rating: 4.7, type: 'Private' },
  { name: 'Apollo Hospitals', distance: '2.1 km', address: '456 Bannerghatta Road', phone: '+91 80 3456 7890', emergency: true, beds: '125 available', rating: 4.9, type: 'Private' },
  { name: 'Manipal Hospital', distance: '3.5 km', address: '98 HAL Airport Road', phone: '+91 80 4567 8901', emergency: true, beds: '75 available', rating: 4.8, type: 'Private' },
];

export default function EmergencyHospital() {
  return (
    <PageLayout
      icon={<Heart size={26} className="text-red-400" />}
      title="Nearest Hospitals"
      subtitle="Find emergency hospitals near your location with real-time bed availability."
      badge="🏥 Emergency Hospitals"
      badgeColor="red"
      headerGradient="from-red-800/25 via-red-600/10 to-transparent"
      accentColor="red"
    >
      <div className="glass-red rounded-3xl p-5 mb-8 border border-red-500/25 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-red-400 font-black text-lg">Medical Emergency?</p>
          <p className="text-slate-400 text-sm">Dial 108 for ambulance or 112 for all emergencies</p>
        </div>
        <div className="flex gap-3">
          <a href="tel:108" className="bg-red-600 text-white px-6 py-3 rounded-xl font-black hover:bg-red-500 transition">📞 108</a>
          <a href="tel:112" className="glass border border-red-500/30 text-red-400 px-6 py-3 rounded-xl font-black hover:bg-red-500/10 transition">📞 112</a>
        </div>
      </div>

      <div className="mb-8"><MapPlaceholder label="Hospitals Map" /></div>

      <div className="space-y-3">
        {hospitals.map((h) => (
          <div key={h.name} className="glass rounded-2xl border border-red-500/10 p-5 hover:bg-red-500/5 hover:border-red-500/25 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🏥</div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-bold text-white group-hover:text-red-300 transition">{h.name}</h3>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-blue-300 bg-blue-500/10 border border-blue-500/20">{h.type}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{h.address}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin size={11} className="text-red-400" /> {h.distance}</span>
                      <span className="text-green-400 font-semibold">🛏 {h.beds}</span>
                      <span>⭐ {h.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${h.phone}`} className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-red-500 transition">
                      <Phone size={12} /> Call
                    </a>
                    <button className="flex items-center gap-1.5 glass border border-white/10 text-slate-400 text-xs font-bold px-4 py-2.5 rounded-xl hover:text-white transition">
                      <Navigation size={12} /> Go
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
