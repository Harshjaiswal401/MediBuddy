import { Ambulance, Phone, AlertTriangle, MapPin, Heart, Clock } from 'lucide-react';
import { PageLayout, Card } from '../../components/Layout';

const steps = [
  { step: '1', title: 'Stay Calm', desc: 'Take a deep breath. Panicking can delay critical information.' },
  { step: '2', title: 'Call 108', desc: 'Tap the button below. The call is FREE from any phone, anywhere in India.' },
  { step: '3', title: 'State Your Location', desc: 'Give your exact address, landmark, or let them trace your GPS location.' },
  { step: '4', title: 'Describe Emergency', desc: 'Clearly state the nature of emergency: cardiac, accident, breathing issues, etc.' },
  { step: '5', title: 'Stay on the Line', desc: 'Do not hang up. The operator will guide you until the ambulance arrives.' },
];

const services = [
  { name: 'CATS Ambulance (Govt)', number: '102', type: 'Free · Maternal/Child Emergency', icon: '🚑' },
  { name: 'National Emergency', number: '112', type: 'Free · All Emergencies', icon: '📞' },
  { name: 'EMRI Ambulance', number: '108', type: 'Free · Any Medical Emergency', icon: '🏥' },
  { name: 'Police Emergency', number: '100', type: 'Free · Accident / Crime Scene', icon: '🚔' },
  { name: 'Fire Brigade', number: '101', type: 'Free · Fire Emergency', icon: '🚒' },
  { name: 'Poison Control', number: '1800-11-6117', type: 'Free · Poisoning / Overdose', icon: '☠️' },
];

export default function CallAmbulance() {
  return (
    <PageLayout
      icon={<Ambulance size={22} className="text-white" />}
      title="Call Ambulance"
      subtitle="One-tap emergency ambulance call. Free services available 24/7 across India."
      badge="⚠ Emergency – Act Fast"
      badgeColor="red"
      headerGradient="from-red-700 to-red-900"
    >
      {/* PRIMARY SOS BUTTON */}
      <div className="mb-8 text-center">
        <div className="inline-block">
          <div className="relative">
            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30 scale-110" />
            <a
              href="tel:108"
              className="relative flex flex-col items-center justify-center w-48 h-48 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-2xl hover:from-red-600 hover:to-red-800 transition-all duration-200 mx-auto border-4 border-red-300"
            >
              <Ambulance size={48} className="text-white mb-2" />
              <span className="text-white font-extrabold text-2xl">108</span>
              <span className="text-red-100 text-xs font-medium">Tap to Call Now</span>
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-600 font-medium">EMRI Ambulance · Free · 24/7</p>
        </div>
      </div>

      {/* Quick Services Grid */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">All Emergency Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((s) => (
            <a
              key={s.number}
              href={`tel:${s.number}`}
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-red-200 hover:bg-red-50 transition group shadow-sm"
            >
              <div className="w-11 h-11 bg-red-50 group-hover:bg-red-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition">
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.type}</p>
                <p className="text-red-600 font-extrabold text-base mt-0.5">{s.number}</p>
              </div>
              <Phone size={16} className="text-red-400 ml-auto flex-shrink-0 group-hover:text-red-600 transition" />
            </a>
          ))}
        </div>
      </div>

      {/* Steps */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-red-500" />
          What to Do When Calling
        </h2>
        <div className="space-y-4">
          {steps.map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {s.step}
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Location Share */}
      <Card className="p-5 bg-blue-50 border-blue-100">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-blue-800">Share Your Location</h3>
            <p className="text-xs text-blue-600 mt-1 mb-3">Share your GPS location with the emergency team for faster response.</p>
            <button className="text-sm bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2">
              <MapPin size={15} /> Share Live Location
            </button>
          </div>
        </div>
      </Card>

      {/* ETA Info */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { icon: <Clock size={18} className="text-blue-500" />, label: 'Avg ETA', value: '8 min', bg: 'bg-blue-50' },
          { icon: <Heart size={18} className="text-red-500" />, label: 'Ambulances Nearby', value: '4', bg: 'bg-red-50' },
          { icon: <Phone size={18} className="text-green-500" />, label: 'Call is Free', value: '24/7', bg: 'bg-green-50' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 flex flex-col items-center text-center`}>
            {stat.icon}
            <p className="text-xl font-extrabold text-slate-800 mt-1">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
