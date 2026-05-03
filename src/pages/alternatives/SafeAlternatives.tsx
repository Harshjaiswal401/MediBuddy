import { ShieldCheck } from 'lucide-react';
import { PageLayout, SearchBar } from '../../components/Layout';

const safeAlts = [
  { original: 'Aspirin 500mg', reason: 'Can cause gastric bleeding', alternatives: [
    { name: 'Paracetamol 500mg', sideEffects: 'Rare hepatotoxicity', safetyScore: 9.2, price: '₹12', preferred: true },
    { name: 'Ibuprofen 200mg', sideEffects: 'Minimal GI effects', safetyScore: 8.5, price: '₹18', preferred: false },
  ]},
  { original: 'Naproxen 500mg', reason: 'Risk of cardiovascular events', alternatives: [
    { name: 'Celecoxib 100mg', sideEffects: 'Selective COX-2 inhibitor', safetyScore: 8.8, price: '₹65', preferred: true },
    { name: 'Acetaminophen 500mg', sideEffects: 'Very low side effects', safetyScore: 9.4, price: '₹15', preferred: true },
  ]},
];

export default function SafeAlternatives() {
  return (
    <PageLayout
      icon={<ShieldCheck size={26} className="text-teal-400" />}
      title="Safer Alternatives"
      subtitle="Find medicine alternatives with fewer side effects and lower risk profiles."
      badge="Safety First"
      badgeColor="green"
      headerGradient="from-teal-600/15 via-green-500/5 to-transparent"
      accentColor="green"
    >
      <div className="mb-8">
        <SearchBar placeholder="Enter medicine to find safer alternatives..." onSearch={() => {}} accent="blue" />
      </div>

      <div className="space-y-6">
        {safeAlts.map((item) => (
          <div key={item.original} className="glass rounded-3xl border border-white/8 overflow-hidden">
            <div className="p-5 bg-orange-500/5 border-b border-orange-500/10">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-bold text-orange-300">{item.original}</p>
                  <p className="text-xs text-orange-300/60 mt-0.5">{item.reason}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-teal-400 uppercase tracking-widest font-bold mb-4">🛡 Safer Options</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.alternatives.map((alt) => (
                  <div key={alt.name} className="glass rounded-2xl p-5 border border-teal-500/15 hover:border-teal-500/30 transition cursor-pointer group">
                    {alt.preferred && <span className="text-xs font-bold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full mb-3 inline-block">✓ Preferred</span>}
                    <h4 className="font-bold text-white group-hover:text-teal-300 transition mb-1">{alt.name}</h4>
                    <p className="text-xs text-slate-500 mb-3">{alt.sideEffects}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Safety Score</p>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-teal-500 to-green-400 rounded-full" style={{ width: `${alt.safetyScore * 10}%` }} />
                          </div>
                          <span className="text-teal-400 font-black text-sm">{alt.safetyScore}</span>
                        </div>
                      </div>
                      <span className="text-green-400 font-black">{alt.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
