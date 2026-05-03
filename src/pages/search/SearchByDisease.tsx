import { useState } from 'react';
import { Activity } from 'lucide-react';
import { PageLayout, SearchBar, EmptyResultCard } from '../../components/Layout';

const diseases = [
  { disease: 'Type 2 Diabetes', medicines: ['Metformin', 'Glipizide', 'Sitagliptin', 'Insulin Glargine'], description: 'Chronic condition affecting blood sugar regulation', severity: 'Chronic' },
  { disease: 'Hypertension', medicines: ['Amlodipine', 'Losartan', 'Atenolol', 'Hydrochlorothiazide'], description: 'High blood pressure management', severity: 'Chronic' },
  { disease: 'Common Cold', medicines: ['Paracetamol', 'Cetirizine', 'Dextromethorphan', 'Phenylephrine'], description: 'Viral upper respiratory infection', severity: 'Mild' },
  { disease: 'Acid Reflux (GERD)', medicines: ['Omeprazole', 'Pantoprazole', 'Ranitidine', 'Antacids'], description: 'Stomach acid flowing into esophagus', severity: 'Moderate' },
  { disease: 'Bacterial Infection', medicines: ['Amoxicillin', 'Azithromycin', 'Ciprofloxacin', 'Doxycycline'], description: 'Infection caused by bacteria', severity: 'Variable' },
];

const severityColor: Record<string, string> = {
  Mild: 'text-green-400 bg-green-500/10 border-green-500/20',
  Moderate: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Chronic: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Variable: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
};

export default function SearchByDisease() {
  const [results, setResults] = useState(diseases);
  const [searched, setSearched] = useState(false);

  const handleSearch = (val: string) => {
    setSearched(true);
    setResults(!val.trim() ? diseases : diseases.filter(d => d.disease.toLowerCase().includes(val.toLowerCase())));
  };

  return (
    <PageLayout
      icon={<Activity size={26} className="text-pink-400" />}
      title="Search Medicine by Disease"
      subtitle="Find recommended medicines for specific diseases or health conditions."
      badge="Disease Database"
      badgeColor="purple"
      headerGradient="from-pink-600/15 via-violet-500/5 to-transparent"
      accentColor="violet"
    >
      <div className="mb-8">
        <SearchBar placeholder="Enter disease or condition (e.g. Diabetes, Hypertension...)" onSearch={handleSearch} accent="violet" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {results.length === 0 ? (
          <EmptyResultCard icon="🏥" text="No diseases found. Try a different condition name." />
        ) : (
          results.map((item) => (
            <div key={item.disease} className="glass rounded-2xl border border-white/8 p-6 hover:bg-white/5 transition-all duration-300 hover:border-violet-500/25 group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-white text-lg">{item.disease}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${severityColor[item.severity]}`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Recommended Medicines</p>
                <div className="flex flex-wrap gap-2">
                  {item.medicines.map((med) => (
                    <span key={med} className="text-sm glass border border-white/10 text-slate-300 px-4 py-2 rounded-xl hover:border-violet-500/30 hover:text-violet-300 transition cursor-pointer">
                      💊 {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
}
