import { Building2, MapPin, Navigation, Phone } from 'lucide-react';
import { PageLayout, MapPlaceholder } from '../../components/Layout';

const emergencyPharmacies = [
  { name: 'Apollo 24/7 Pharmacy', distance: '0.2 km', address: 'MG Road Emergency Wing', phone: '+91 1800 000 111', always: true, rating: 4.9 },
  { name: 'City Emergency Medical', distance: '0.5 km', address: '5 Ambulance Lane, Near Civil Hospital', phone: '+91 1800 000 112', always: true, rating: 4.7 },
  { name: 'LifeGuard Pharmacy', distance: '1.1 km', address: '22 Emergency Blvd', phone: '+91 1800 000 113', always: true, rating: 4.6 },
];

export default function EmergencyPharmacy() {
  return (
    <PageLayout
      icon={<Building2 size={26} className="text-red-400" />}
      title="Emergency Pharmacies"
      subtitle="24/7 pharmacies open right now for emergency medicine needs."
      badge="🚨 Emergency · 24/7"
      badgeColor="red"
      headerGradient="from-red-800/25 via-red-600/10 to-transparent"
      accentColor="red"
    >
      {/* SOS Banner */}
      <div className="glass-red rounded-3xl p-6 mb-8 border border-red-500/25 neon-red">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">⚠ Emergency Alert</p>
            <h3 className="text-white font-black text-xl">Need Immediate Help?</h3>
            <p className="text-slate-400 text-sm mt-1">Call national emergency helpline now</p>
          </div>
          <a href="tel:112" className="flex items-center gap-2 bg-red-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-red-500 transition text-lg animate-pulse-red shadow-xl">
            📞 112
          </a>
        </div>
      </div>

      <div className="mb-8">
        <MapPlaceholder label="Emergency Pharmacies Map" />
      </div>

      <div className="space-y-3">
        {emergencyPharmacies.map((p) => (
          <div key={p.name} className="glass rounded-2xl border border-red-500/15 p-5 hover:bg-red-500/5 hover:border-red-500/30 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-11 h-11 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-xl">🏥</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-bold text-white group-hover:text-red-300 transition">{p.name}</h3>
                    {p.always && <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">● 24/7 Open</span>}
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{p.address}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={11} className="text-red-400" /> {p.distance}</span>
                    <span>⭐ {p.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <a href={`tel:${p.phone}`} className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-red-500 transition shadow-lg">
                  <Phone size={12} /> Call
                </a>
                <button className="flex items-center gap-1.5 glass border border-white/10 text-slate-400 text-xs font-bold px-4 py-2.5 rounded-xl hover:text-white transition">
                  <Navigation size={12} /> Go
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
