import { useState } from 'react';
import { Microscope, AlertCircle } from 'lucide-react';
import { PageLayout, SearchBar, EmptyResultCard } from '../../components/Layout';

const salts = [
  { salt: 'Paracetamol', brands: ['Calpol 500mg', 'Dolo 650', 'Metacin'], category: 'Analgesic/Antipyretic', dose: '500mg/650mg', safe: true },
  { salt: 'Amoxicillin', brands: ['Amoxil 250mg', 'Novamox 500mg', 'Trimox'], category: 'Antibiotic', dose: '250mg/500mg', safe: true },
  { salt: 'Metformin HCl', brands: ['Glucophage 500mg', 'Glycomet', 'Riomet'], category: 'Antidiabetic', dose: '500mg/850mg/1000mg', safe: true },
  { salt: 'Atorvastatin', brands: ['Lipitor 10mg', 'Storvas', 'Atorva'], category: 'Statin', dose: '10mg/20mg/40mg', safe: false },
];

export default function SearchBySalt() {
  const [results, setResults] = useState(salts);
  const [searched, setSearched] = useState(false);

  const handleSearch = (val: string) => {
    setSearched(true);
    setResults(!val.trim() ? salts : salts.filter(s => s.salt.toLowerCase().includes(val.toLowerCase())));
  };

  return (
    <PageLayout
      icon={<Microscope size={26} className="text-cyan-400" />}
      title="Search by Salt / Ingredient"
      subtitle="Find all branded medicines containing a specific active ingredient or salt composition."
      badge="Salt Search"
      badgeColor="cyan"
      headerGradient="from-cyan-600/15 via-cyan-500/5 to-transparent"
      accentColor="cyan"
    >
      <div className="mb-8">
        <SearchBar placeholder="Enter salt name (e.g. Paracetamol, Amoxicillin...)" onSearch={handleSearch} accent="cyan" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {results.length === 0 ? (
          <EmptyResultCard icon="🧪" text="No salts found. Try a different ingredient name." />
        ) : (
          results.map((item) => (
            <div key={item.salt} className="glass rounded-2xl border border-white/8 p-6 hover:bg-white/5 transition-all duration-300 hover:border-cyan-500/25 group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-black text-white text-lg">{item.salt}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.safe ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-orange-400 bg-orange-500/10 border border-orange-500/20'}`}>
                      {item.safe ? '✓ Generally Safe' : '⚠ Prescription Required'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">{item.category} · Dosage: {item.dose}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Available Brands</p>
                <div className="flex flex-wrap gap-2">
                  {item.brands.map((brand) => (
                    <span key={brand} className="text-sm glass border border-white/10 text-slate-300 px-4 py-2 rounded-xl hover:border-cyan-500/30 hover:text-cyan-300 transition cursor-pointer">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {!item.safe && (
                <div className="mt-4 flex items-start gap-2 bg-orange-500/8 border border-orange-500/15 rounded-xl p-3">
                  <AlertCircle size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-orange-300">This salt requires a valid prescription. Please consult a doctor before use.</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
}
