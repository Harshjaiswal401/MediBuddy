import { Phone } from 'lucide-react';
import { PageLayout } from '../../components/Layout';

const pharmacies = [
  { name: 'Apollo Pharmacy', phone: '+91 98765 43210', area: 'MG Road', open: true, type: 'Chain' },
  { name: 'MedPlus Health', phone: '+91 87654 32109', area: 'Brigade Road', open: true, type: 'Chain' },
  { name: 'Wellness Forever', phone: '+91 76543 21098', area: 'Church Street', open: false, type: 'Chain' },
  { name: 'City Medical Store', phone: '+91 65432 10987', area: 'Koramangala', open: true, type: 'Local' },
];

export default function PharmacyCall() {
  return (
    <PageLayout
      icon={<Phone size={26} className="text-green-400" />}
      title="Call a Pharmacy"
      subtitle="Direct one-tap calling to nearby pharmacies. No waiting, instant connection."
      badge="Direct Call"
      badgeColor="green"
      headerGradient="from-green-600/15 via-teal-500/5 to-transparent"
      accentColor="green"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pharmacies.map((p) => (
          <div key={p.name} className="glass rounded-2xl border border-white/8 p-6 hover:bg-white/5 transition-all hover:border-green-500/25 group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-white group-hover:text-green-300 transition">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{p.area} · {p.type}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.open ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                {p.open ? '● Open' : '○ Closed'}
              </span>
            </div>
            <p className="text-slate-300 font-mono text-lg font-bold mb-5">{p.phone}</p>
            <a
              href={`tel:${p.phone}`}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition ${p.open ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
            >
              <Phone size={16} />
              {p.open ? 'Call Now' : 'Currently Closed'}
            </a>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
