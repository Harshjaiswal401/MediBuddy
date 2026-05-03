import { CheckCircle, Search } from 'lucide-react';
import { PageLayout, SearchBar } from '../../components/Layout';

const stockData = [
  { medicine: 'Paracetamol 500mg', pharmacies: [
    { name: 'Apollo Pharmacy', stock: 'High', qty: '200+ units', price: '₹12' },
    { name: 'MedPlus', stock: 'Medium', qty: '45 units', price: '₹14' },
    { name: 'City Medical', stock: 'Low', qty: '8 units', price: '₹12' },
  ]},
  { medicine: 'Metformin 500mg', pharmacies: [
    { name: 'Apollo Pharmacy', stock: 'High', qty: '150+ units', price: '₹28' },
    { name: 'Wellness Forever', stock: 'Out', qty: '0 units', price: '—' },
  ]},
];

const stockColor: Record<string, string> = {
  'High': 'text-green-400 bg-green-500/10 border-green-500/20',
  'Medium': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  'Low': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'Out': 'text-red-400 bg-red-500/10 border-red-500/20',
};

export default function PharmacyAvailability() {
  return (
    <PageLayout
      icon={<CheckCircle size={26} className="text-teal-400" />}
      title="Real-Time Stock Availability"
      subtitle="Check if your medicine is available at nearby pharmacies before you go."
      badge="Live Stock"
      badgeColor="cyan"
      headerGradient="from-teal-600/15 via-cyan-500/5 to-transparent"
      accentColor="cyan"
    >
      <div className="mb-8">
        <SearchBar placeholder="Search medicine to check availability..." onSearch={() => {}} accent="cyan" />
      </div>

      <div className="space-y-6">
        {stockData.map((item) => (
          <div key={item.medicine} className="glass rounded-3xl border border-white/8 overflow-hidden">
            <div className="p-5 bg-white/3 border-b border-white/5 flex items-center gap-3">
              <span className="text-2xl">💊</span>
              <h3 className="font-black text-white">{item.medicine}</h3>
              <span className="ml-auto text-xs text-teal-400 font-semibold">Live · Updated 2 min ago</span>
            </div>
            <div className="divide-y divide-white/5">
              {item.pharmacies.map((ph) => (
                <div key={ph.name} className="flex items-center justify-between px-5 py-4 hover:bg-white/3 transition group">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🏥</span>
                    <p className="font-semibold text-slate-200 text-sm">{ph.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">{ph.qty}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${stockColor[ph.stock]}`}>{ph.stock}</span>
                    <span className="text-sm font-black text-teal-400">{ph.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
