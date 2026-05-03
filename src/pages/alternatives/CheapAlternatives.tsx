import { Tag, ArrowRight } from 'lucide-react';
import { PageLayout, SearchBar } from '../../components/Layout';

const cheapAlts = [
  {
    original: { name: 'Calpol 500mg', price: '₹45', brand: 'GSK' },
    alternatives: [
      { name: 'Dolo 650mg', price: '₹15', savings: '67%', brand: 'Micro Labs', rating: 4.7 },
      { name: 'Paracip 500mg', price: '₹12', savings: '73%', brand: 'Cipla', rating: 4.5 },
      { name: 'Crocin 500mg', price: '₹20', savings: '56%', brand: 'Haleon', rating: 4.6 },
    ],
  },
  {
    original: { name: 'Lipitor 10mg', price: '₹180', brand: 'Pfizer' },
    alternatives: [
      { name: 'Storvas 10mg', price: '₹55', savings: '69%', brand: 'Sun Pharma', rating: 4.6 },
      { name: 'Atorva 10mg', price: '₹48', savings: '73%', brand: 'Zydus', rating: 4.5 },
    ],
  },
];

export default function CheapAlternatives() {
  return (
    <PageLayout
      icon={<Tag size={26} className="text-green-400" />}
      title="Cheapest Alternatives"
      subtitle="Find the most affordable medicines with the same active ingredient and efficacy."
      badge="Cost Saver"
      badgeColor="green"
      headerGradient="from-green-600/15 via-teal-500/5 to-transparent"
      accentColor="green"
    >
      <div className="mb-8">
        <SearchBar placeholder="Enter medicine name to find cheaper alternatives..." onSearch={() => {}} accent="blue" />
      </div>

      <div className="space-y-6">
        {cheapAlts.map((item) => (
          <div key={item.original.name} className="glass rounded-3xl border border-white/8 overflow-hidden">
            {/* Original */}
            <div className="p-5 bg-white/3 border-b border-white/5">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-semibold">Original Medicine</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💊</span>
                  <div>
                    <p className="font-bold text-white">{item.original.name}</p>
                    <p className="text-xs text-slate-500">{item.original.brand}</p>
                  </div>
                </div>
                <span className="text-lg font-black text-slate-400 line-through">{item.original.price}</span>
              </div>
            </div>

            {/* Alternatives */}
            <div className="p-5">
              <p className="text-xs text-green-400 uppercase tracking-widest mb-4 font-bold">💰 Cheaper Alternatives</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {item.alternatives.map((alt) => (
                  <div key={alt.name} className="glass rounded-2xl p-4 border border-green-500/15 hover:border-green-500/30 transition group cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-bold text-white text-sm group-hover:text-green-300 transition">{alt.name}</p>
                      <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                        -{alt.savings}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{alt.brand} · ⭐ {alt.rating}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-black text-lg">{alt.price}</span>
                      <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition">
                        View <ArrowRight size={12} />
                      </button>
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
