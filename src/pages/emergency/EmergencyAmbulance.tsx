import { Ambulance, Phone, MapPin } from 'lucide-react';
import { PageLayout } from '../../components/Layout';

const ambulanceServices = [
  { name: 'National Emergency', number: '112', description: 'All emergencies — police, fire, ambulance', priority: 'primary' },
  { name: 'Ambulance Direct', number: '108', description: 'Medical emergency ambulance service', priority: 'primary' },
  { name: 'Apollo Emergency', number: '1066', description: 'Apollo Hospitals emergency response', priority: 'secondary' },
  { name: 'CATS Ambulance', number: '1099', description: 'Central Accident & Trauma Services', priority: 'secondary' },
];

const steps = [
  { step: '1', text: 'Press the call button below or dial 108/112', icon: '📞' },
  { step: '2', text: 'Share your name and location clearly', icon: '📍' },
  { step: '3', text: 'Describe the emergency and number of people', icon: '🏥' },
  { step: '4', text: 'Stay on the line until help arrives', icon: '🆘' },
];

export default function EmergencyAmbulance() {
  return (
    <PageLayout
      icon={<Ambulance size={26} className="text-red-400" />}
      title="Call Ambulance"
      subtitle="One-tap access to emergency ambulance services. Available 24/7."
      badge="🚨 24/7 Emergency"
      badgeColor="red"
      headerGradient="from-red-800/30 via-red-600/10 to-transparent"
      accentColor="red"
    >
      {/* Primary SOS */}
      <div className="glass-red rounded-3xl border border-red-500/30 p-8 md:p-12 text-center mb-8 neon-red">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-red shadow-2xl neon-red">
          <Ambulance size={36} className="text-white" />
        </div>
        <h2 className="text-4xl font-black text-white mb-2">Emergency?</h2>
        <p className="text-slate-400 mb-8">Press below for immediate ambulance dispatch</p>
        <a
          href="tel:108"
          className="inline-flex items-center gap-3 bg-red-600 text-white font-black px-12 py-5 rounded-2xl text-2xl hover:bg-red-500 transition shadow-2xl neon-red"
        >
          <Phone size={28} /> Call 108
        </a>
        <p className="text-slate-500 text-xs mt-4">Free · 24/7 · Government Service</p>
      </div>

      {/* All Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {ambulanceServices.map((s) => (
          <a
            key={s.name}
            href={`tel:${s.number}`}
            className={`glass rounded-2xl border p-5 hover:-translate-y-1 transition-all duration-300 group ${s.priority === 'primary' ? 'border-red-500/25 hover:border-red-500/40' : 'border-white/8 hover:border-white/15'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-3xl font-black ${s.priority === 'primary' ? 'text-red-400' : 'text-slate-300'}`}>{s.number}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.priority === 'primary' ? 'bg-red-600' : 'bg-white/10'}`}>
                <Phone size={18} className="text-white" />
              </div>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-red-300 transition">{s.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{s.description}</p>
          </a>
        ))}
      </div>

      {/* Instructions */}
      <div className="glass rounded-3xl border border-white/8 p-6">
        <h3 className="font-black text-white text-lg mb-5">📋 What to do when you call</h3>
        <div className="space-y-3">
          {steps.map((s) => (
            <div key={s.step} className="flex items-center gap-4 p-3 glass rounded-xl border border-white/5">
              <span className="w-8 h-8 bg-red-500/15 border border-red-500/25 rounded-lg flex items-center justify-center text-red-400 font-black text-sm flex-shrink-0">{s.step}</span>
              <span className="text-xl">{s.icon}</span>
              <p className="text-slate-300 text-sm">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
