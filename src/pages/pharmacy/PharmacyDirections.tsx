import { MapPin, Navigation } from 'lucide-react';
import { PageLayout, MapPlaceholder } from '../../components/Layout';

const pharmacies = [
  { name: 'Apollo Pharmacy', distance: '0.3 km', address: '12 MG Road, Near Metro Station', open: true, hours: '24/7', phone: '+91 98765 43210', rating: 4.8 },
  { name: 'MedPlus Health', distance: '0.7 km', address: '45 Brigade Road, Ground Floor', open: true, hours: '8 AM – 10 PM', phone: '+91 98765 43211', rating: 4.5 },
  { name: 'Wellness Forever', distance: '1.2 km', address: '78 Church Street, Opp. City Bank', open: false, hours: '9 AM – 9 PM', phone: '+91 98765 43212', rating: 4.3 },
  { name: 'Netmeds Point', distance: '1.8 km', address: '23 Commercial Street', open: true, hours: '8 AM – 11 PM', phone: '+91 98765 43213', rating: 4.6 },
];

export default function PharmacyDirections() {
  return (
    <PageLayout
      icon={<MapPin size={26} className="text-blue-400" />}
      title="Nearby Pharmacies"
      subtitle="Find pharmacies near you with directions and real-time availability."
      badge="Location Services"
      badgeColor="blue"
    >
      <div className="mb-8">
        <MapPlaceholder label="Pharmacy Map" />
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4">Pharmacies Near You</h2>
        <div className="space-y-3">
          {pharmacies.map((p) => (
            <div key={p.name} className="glass rounded-2xl border border-white/8 p-5 hover:bg-white/5 hover:border-blue-500/25 transition-all group cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-11 h-11 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🏥</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-white group-hover:text-blue-300 transition">{p.name}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.open ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                        {p.open ? '● Open' : '○ Closed'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{p.address}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><MapPin size={11} className="text-blue-400" /> {p.distance}</span>
                      <span>🕐 {p.hours}</span>
                      <span>⭐ {p.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-500 transition shadow-lg ml-4 flex-shrink-0">
                  <Navigation size={13} /> Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
