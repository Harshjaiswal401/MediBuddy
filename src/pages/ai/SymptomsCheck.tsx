import { useState } from 'react';
import { Stethoscope, Plus, X } from 'lucide-react';
import { PageLayout } from '../../components/Layout';

const commonSymptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Sore Throat',
  'Body Ache', 'Dizziness', 'Chest Pain', 'Shortness of Breath', 'Vomiting', 'Diarrhea',
];

const sampleDiagnosis = [
  { condition: 'Common Cold / Flu', probability: 78, medicines: ['Paracetamol 500mg', 'Cetirizine 10mg'], urgent: false },
  { condition: 'Viral Fever', probability: 65, medicines: ['Paracetamol 650mg', 'Domperidone 10mg'], urgent: false },
  { condition: 'Migraine', probability: 45, medicines: ['Sumatriptan 50mg', 'Ibuprofen 400mg'], urgent: false },
];

export default function SymptomsCheck() {
  const [selected, setSelected] = useState<string[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const toggle = (s: string) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    setAnalyzed(false);
  };

  return (
    <PageLayout
      icon={<Stethoscope size={26} className="text-pink-400" />}
      title="Symptom Checker"
      subtitle="Select your symptoms and let our AI analyze possible conditions and suggest medicines."
      badge="AI Diagnosis"
      badgeColor="purple"
      headerGradient="from-pink-600/15 via-violet-500/5 to-transparent"
      accentColor="violet"
    >
      {/* Select symptoms */}
      <div className="glass rounded-3xl border border-white/8 p-6 mb-6">
        <h2 className="font-black text-white mb-4">Select Your Symptoms</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {commonSymptoms.map((sym) => (
            <button
              key={sym}
              onClick={() => toggle(sym)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selected.includes(sym)
                  ? 'bg-violet-600 text-white border border-violet-400/50 shadow-lg'
                  : 'glass border border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              {selected.includes(sym) ? <X size={13} /> : <Plus size={13} />}
              {sym}
            </button>
          ))}
        </div>

        {selected.length > 0 && (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-slate-400">{selected.length} symptom{selected.length !== 1 ? 's' : ''} selected</p>
            <button
              onClick={() => setAnalyzed(true)}
              className="flex items-center gap-2 bg-violet-600 text-white font-bold px-7 py-3 rounded-xl hover:bg-violet-500 transition shadow-lg text-sm"
            >
              <Stethoscope size={16} /> Analyze Symptoms
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {analyzed && selected.length > 0 && (
        <div className="animate-fade-in-up">
          <h2 className="font-black text-white text-lg mb-4">🔬 AI Analysis Results</h2>
          <div className="space-y-4">
            {sampleDiagnosis.map((d) => (
              <div key={d.condition} className="glass rounded-2xl border border-white/8 p-6 hover:border-violet-500/20 transition">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <h3 className="font-bold text-white text-lg">{d.condition}</h3>
                    <p className="text-xs text-slate-500 mt-1">Based on selected symptoms</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Match Probability</p>
                    <p className="text-2xl font-black text-violet-400">{d.probability}%</p>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full mb-4">
                  <div className="h-full bg-gradient-to-r from-violet-600 to-pink-500 rounded-full transition-all" style={{ width: `${d.probability}%` }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Suggested Medicines</p>
                  <div className="flex flex-wrap gap-2">
                    {d.medicines.map((m) => (
                      <span key={m} className="text-xs glass border border-violet-500/20 text-violet-300 px-3 py-1.5 rounded-lg font-semibold">💊 {m}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 glass rounded-2xl border border-yellow-500/15 p-4 flex items-start gap-3">
            <span className="text-yellow-400 text-xl">⚠️</span>
            <p className="text-xs text-slate-500">This is an AI estimation only. Please consult a qualified doctor for accurate diagnosis and treatment.</p>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
