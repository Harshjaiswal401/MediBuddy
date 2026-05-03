import { Phone, PhoneCall, MapPin, Clock, Star } from 'lucide-react';
import { PageLayout, Card } from '../../components/Layout';

const pharmacies = [
  { name: 'Apollo Pharmacy', phone: '+91 80 4567 8900', address: '12, MG Road', dist: '0.3 km', open: true, hours: '24/7', rating: 4.8 },
  { name: 'MedPlus Pharmacy', phone: '+91 80 4321 6780', address: '45, Brigade Road', dist: '0.7 km', open: true, hours: '8 AM – 10 PM', rating: 4.5 },
  { name: 'Wellness Forever', phone: '+91 80 2233 4455', address: '8, Residency Road', dist: '1.1 km', open: false, hours: '8 AM – 9 PM', rating: 4.3 },
  { name: 'Frank Ross Pharmacy', phone: '+91 80 5566 7788', address: '33, Cunningham Road', dist: '1.6 km', open: true, hours: '9 AM – 9 PM', rating: 4.6 },
];

export default function CallPharmacy() {
  return (
    <PageLayout
      icon={<Phone size={22} className="text-white" />}
      title="Call Pharmacy"
      subtitle="Directly call nearby pharmacies to confirm availability or place medicine orders before visiting."
      badge="Direct Connect"
      badgeColor="blue"
    >
      {/* Search medicine to check before calling */}
      <Card className="p-5 mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-3">Check availability before calling</p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter medicine name..."
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">Check</button>
        </div>
      </Card>

      <div className="space-y-4">
        {pharmacies.map((ph) => (
          <Card key={ph.name} className="p-5 hover:border-blue-100 transition">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${ph.open ? 'bg-green-50' : 'bg-slate-100'}`}>
                  <Phone size={18} className={ph.open ? 'text-green-600' : 'text-slate-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-800 text-sm truncate">{ph.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${ph.open ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {ph.open ? '● Open' : '● Closed'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 truncate"><MapPin size={10} className="flex-shrink-0" /> <span className="truncate">{ph.address} · {ph.dist}</span></p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Clock size={10} className="flex-shrink-0" /> {ph.hours}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Star size={10} className="text-yellow-400 fill-yellow-400 flex-shrink-0" /> {ph.rating}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:items-end flex-shrink-0">
                <a
                  href={`tel:${ph.phone}`}
                  className={`flex justify-center items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-xl transition ${
                    ph.open
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <PhoneCall size={13} /> {ph.phone}
                </a>
                <p className="text-center sm:text-right text-xs text-slate-400">{ph.open ? 'Tap to call' : 'Currently closed'}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Helpline */}
      <Card className="p-5 mt-6 bg-blue-50 border-blue-100">
        <p className="text-sm font-bold text-blue-800 mb-1">🏛️ Government Medicine Helpline</p>
        <p className="text-xs text-blue-600 mb-3">For medicine queries, Jan Aushadhi, or emergency assistance</p>
        <a href="tel:1800-180-8080" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition">
          <PhoneCall size={16} /> 1800-180-8080 (Toll Free)
        </a>
      </Card>
    </PageLayout>
  );
}
