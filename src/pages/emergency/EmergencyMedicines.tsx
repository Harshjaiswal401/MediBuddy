import { Syringe, AlertTriangle } from 'lucide-react';
import { PageLayout } from '../../components/Layout';

const criticalMeds = [
  { name: 'Epinephrine (Adrenaline)', use: 'Anaphylaxis / Severe Allergic Reaction', dose: '0.3mg IM', available: true, urgency: 'Critical' },
  { name: 'Nitroglycerin', use: 'Chest Pain / Angina', dose: '0.4mg sublingual', available: true, urgency: 'Critical' },
  { name: 'Naloxone (Narcan)', use: 'Opioid Overdose Reversal', dose: '0.4mg IM/IV', available: true, urgency: 'Critical' },
  { name: 'Glucagon', use: 'Severe Hypoglycemia', dose: '1mg IM', available: false, urgency: 'High' },
  { name: 'Atropine', use: 'Bradycardia / Organophosphate Poisoning', dose: '0.5mg IV', available: true, urgency: 'High' },
  { name: 'Aspirin', use: 'Suspected Heart Attack (first aid)', dose: '325mg chew', available: true, urgency: 'Moderate' },
];

const urgencyStyles: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  High: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  Moderate: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
};

export default function EmergencyMedicines() {
  return (
    <PageLayout
      icon={<Syringe size={26} className="text-red-400" />}
      title="Emergency Medicines"
      subtitle="Critical medicines required during medical emergencies. Check availability at nearby pharmacies."
      badge="⚠ Critical Stock"
      badgeColor="red"
      headerGradient="from-red-800/25 via-red-600/10 to-transparent"
      accentColor="red"
    >
      <div className="flex items-start gap-3 glass-red rounded-2xl border border-red-500/25 p-4 mb-8">
        <AlertTriangle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-red-300">
          Emergency medicines should only be administered by trained medical professionals. This list is for informational purposes only.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {criticalMeds.map((med) => (
          <div key={med.name} className="glass rounded-2xl border border-white/8 p-5 hover:border-red-500/20 hover:bg-red-500/3 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">💉</span>
              <div className="flex gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${urgencyStyles[med.urgency]}`}>{med.urgency}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${med.available ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-slate-500 bg-white/5 border-white/10'}`}>
                  {med.available ? '✓ Available' : '✗ Out of Stock'}
                </span>
              </div>
            </div>
            <h3 className="font-bold text-white group-hover:text-red-300 transition text-sm mb-1">{med.name}</h3>
            <p className="text-xs text-slate-400 mb-3">{med.use}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Typical Dose:</span>
              <span className="text-xs font-bold text-blue-400 glass border border-blue-500/20 px-2 py-0.5 rounded-lg">{med.dose}</span>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
