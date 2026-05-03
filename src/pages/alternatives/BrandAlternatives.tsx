import { Bookmark } from 'lucide-react';
import { PageLayout, SearchBar } from '../../components/Layout';

const brandAlts = [
  { name: 'Paracetamol', variants: [
    { name: 'Calpol 500mg', brand: 'GSK', price: '₹45', form: 'Tablet', strength: '500mg', rating: 4.8, premium: true },
    { name: 'Dolo 650mg', brand: 'Micro Labs', price: '₹15', form: 'Tablet', strength: '650mg', rating: 4.7, premium: false },
    { name: 'Crocin 500mg', brand: 'Haleon', price: '₹20', form: 'Tablet', strength: '500mg', rating: 4.6, premium: false },
    { name: 'Tylenol 500mg', brand: 'J&J', price: '₹85', form: 'Tablet', strength: '500mg', rating: 4.8, premium: true },
  ]},
];

export default function BrandAlternatives() {
  return (
    <PageLayout
      icon={<Bookmark size={26} className="text-indigo-400" />}
      title="Same Brand Alternatives"
      subtitle="Discover different variants, forms, and strengths from the same trusted brand."
      badge="Brand Variants"
      badgeColor="purple"
      headerGradient="from-indigo-600/15 via-violet-500/5 to-transparent"
      accentColor="violet"
    >
      <div className="mb-8">
        <SearchBar placeholder="Enter medicine or brand name..." onSearch={() => {}} accent="violet" />
      </div>

      {brandAlts.map((item) => (
        <div key={item.name} className="glass rounded-3xl border border-white/8 overflow-hidden">
          <div className="p-5 border-b border-white/5 bg-white/3">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Active Ingredient</p>
            <h3 className="font-black text-white text-xl">{item.name}</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.variants.map((v) => (
                <div key={v.name} className={`glass rounded-2xl p-5 border transition-all hover:-translate-y-1 duration-300 cursor-pointer group ${v.premium ? 'border-indigo-500/25 hover:border-indigo-500/40' : 'border-white/8 hover:border-white/15'}`}>
                  {v.premium && (
                    <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full mb-3 inline-block">⭐ Premium Brand</span>
                  )}
                  <h4 className="font-bold text-white group-hover:text-indigo-300 transition mb-1">{v.name}</h4>
                  <p className="text-xs text-slate-500">{v.brand} · {v.form} · {v.strength}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-indigo-400 font-black text-lg">{v.price}</span>
                    <span className="text-xs text-slate-500">⭐ {v.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </PageLayout>
  );
}
