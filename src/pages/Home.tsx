import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowLeftRight, Building2, Bot, ScanLine,
  Upload, Shield, Zap, MapPin, Activity, Pill, Heart, Clock, Users,
  TrendingUp, ChevronRight, Star, Microscope, Brain, Stethoscope, ShoppingCart, CheckCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { medicineDatabase } from '../data/medicineData';
import { useState } from 'react';

const quickActions = [
  { label: 'Search by Name', route: '/search/name', icon: <Search size={20} />, color: 'from-blue-500 to-blue-600', glow: 'neon-blue', text: 'text-blue-400' },
  { label: 'Find Alternatives', route: '/alternatives/cheap', icon: <ArrowLeftRight size={20} />, color: 'from-indigo-500 to-indigo-600', glow: 'neon-violet', text: 'text-indigo-400' },
  { label: 'Nearby Pharmacy', route: '/pharmacy/directions', icon: <Building2 size={20} />, color: 'from-teal-500 to-teal-600', glow: 'neon-cyan', text: 'text-teal-400' },
  { label: 'Pre-Book', route: '/prebooking', icon: <Clock size={20} />, color: 'from-orange-500 to-orange-600', text: 'text-orange-400', isEmergency: true },
  { label: 'AI Assistant', route: '/ai/medicine', icon: <Bot size={20} />, color: 'from-violet-500 to-violet-600', glow: 'neon-violet', text: 'text-violet-400' },
  { label: 'Talk to Doctor', route: '/doctor', icon: <Stethoscope size={20} />, color: 'from-green-500 to-green-600', text: 'text-green-400' },
  { label: 'Scan Medicine', route: '/scan/medicine', icon: <ScanLine size={20} />, color: 'from-cyan-500 to-cyan-600', glow: 'neon-cyan', text: 'text-cyan-400' },
  { label: 'Upload Rx', route: '/upload/prescription', icon: <Upload size={20} />, color: 'from-pink-500 to-pink-600', text: 'text-pink-400' },
];

const features = [
  { icon: <Zap size={22} className="text-yellow-400" />, title: 'Real-Time Availability', desc: 'Instantly check which pharmacies have your medicine in stock across your city.', bg: 'from-yellow-500/10 to-orange-500/5', border: 'border-yellow-500/15' },
  { icon: <Brain size={22} className="text-violet-400" />, title: 'AI-Powered Insights', desc: 'Get intelligent medicine info, symptom checks, and health advice from our AI.', bg: 'from-violet-500/10 to-indigo-500/5', border: 'border-violet-500/15' },
  { icon: <MapPin size={22} className="text-blue-400" />, title: 'Location Intelligence', desc: 'Find nearest pharmacies, hospitals, and emergency services using GPS.', bg: 'from-blue-500/10 to-cyan-500/5', border: 'border-blue-500/15' },
  { icon: <Shield size={22} className="text-green-400" />, title: 'Safe Alternatives', desc: 'Discover cheaper or safer medicine alternatives effortlessly.', bg: 'from-green-500/10 to-teal-500/5', border: 'border-green-500/15' },
];

const stats = [
  { label: 'Medicines Tracked', value: '50,000+', icon: '💊', color: 'text-blue-400' },
  { label: 'Active Users', value: '1.2M+', icon: '👥', color: 'text-indigo-400' },
  { label: 'Pharmacies Listed', value: '8,500+', icon: '🏪', color: 'text-teal-400' },
  { label: 'Avg. Response Time', value: '<2s', icon: '⚡', color: 'text-yellow-400' },
];

export default function Home() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { addToCart, isInCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const trendingMeds = medicineDatabase.slice(0, 6);

  const handleAddToCart = (med: typeof medicineDatabase[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id: med.id, name: med.name, brand: med.brand, price: med.price, priceDisplay: med.priceDisplay, type: med.type });
    setAddedId(med.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#080c14]' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${isDark ? 'bg-[#080c14]' : 'bg-gradient-to-b from-white to-blue-50'}`}>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isDark && (
            <>
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-3xl animate-orb" />
              <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-3xl animate-orb" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-dark-grid opacity-60" />
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center top, transparent 30%, #080c14 80%)' }} />
            </>
          )}
          {!isDark && (
            <>
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl animate-orb" />
              <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-3xl animate-orb" style={{ animationDelay: '2s' }} />
            </>
          )}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm font-semibold mb-8 border ${isDark ? 'glass border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className={isDark ? 'text-slate-300' : 'text-gray-600'}>AI-Powered · Real-Time · Trusted by <span className="text-blue-400">1.2M+</span> Users</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>Medicine </span>
              <span className="text-gradient">at Your</span>
              <br />
              <span className={isDark ? 'text-white' : 'text-gray-900'}>Fingertips</span>
            </h1>

            <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              NearMyMed helps you find medicines, discover alternatives, locate pharmacies,
              and access emergency healthcare — all powered by cutting-edge AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/search/name')}
                className="flex items-center justify-center gap-2.5 bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-500 transition shadow-2xl neon-blue text-sm">
                <Search size={18} /> Search Medicine Now
              </button>
              <button onClick={() => navigate('/prebooking')}
                className={`flex items-center justify-center gap-2.5 font-bold px-8 py-4 rounded-2xl transition text-sm ${isDark ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20' : 'bg-orange-50 border border-orange-200 text-orange-600 hover:bg-orange-100'}`}>
                <Clock size={18} /> Pre-Book Emergency
              </button>
            </div>
          </div>

          {/* Floating cards decoration */}
          <div className="hidden md:flex justify-center mt-16 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {['💊 Paracetamol found · 24 pharmacies', '🏥 City Hospital · 2.3 km away', '🤖 AI: Take with food'].map((text, i) => (
              <div key={i} className={`rounded-2xl px-5 py-3 text-sm border animate-float ${isDark ? 'glass border-white/8 text-slate-300' : 'bg-white border-gray-200 text-gray-600 shadow-sm'}`} style={{ animationDelay: `${i * 1.5}s` }}>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        {isDark && <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080c14] to-transparent" />}
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`rounded-3xl border grid grid-cols-2 md:grid-cols-4 overflow-hidden ${isDark ? 'glass border-white/8 divide-x divide-y md:divide-y-0 divide-white/5' : 'bg-white border-gray-200 shadow-sm divide-x divide-y md:divide-y-0 divide-gray-100'}`}>
          {stats.map((s) => (
            <div key={s.label} className={`flex items-center gap-4 px-6 py-6 group transition ${isDark ? 'hover:bg-white/3' : 'hover:bg-gray-50'}`}>
              <span className="text-3xl">{s.icon}</span>
              <div>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Everything you need, one tap away</p>
          </div>
          <span className={`text-xs px-4 py-2 rounded-full border ${isDark ? 'text-slate-500 glass border-white/8' : 'text-gray-500 bg-white border-gray-200'}`}>8 features</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.route}
              onClick={() => navigate(action.route)}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-2 group ${
                isDark
                  ? `glass border-white/8 ${action.isEmergency ? 'hover:border-orange-500/30' : 'hover:border-blue-500/20 hover:bg-white/5'}`
                  : `bg-white border-gray-200 ${action.isEmergency ? 'hover:border-orange-300 hover:shadow-orange-100' : 'hover:border-blue-300 hover:shadow-lg'}`
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <span className={`text-xs font-semibold text-center leading-tight transition ${
                action.isEmergency ? 'text-orange-400' : (isDark ? 'text-slate-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900')
              }`}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h2 className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Why <span className="text-gradient">NearMyMed?</span>
          </h2>
          <p className={`mt-3 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Everything you need for smarter healthcare decisions</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title}
              className={`rounded-3xl p-7 border hover:scale-105 transition-all duration-300 group cursor-pointer ${isDark ? `bg-gradient-to-br ${f.bg} ${f.border}` : 'bg-white border-gray-200 hover:shadow-lg'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform border ${isDark ? 'glass border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                {f.icon}
              </div>
              <h3 className={`font-bold mb-2 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Booking CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`relative rounded-3xl p-8 md:p-12 border overflow-hidden ${isDark ? 'bg-gradient-to-r from-orange-900/30 via-orange-800/20 to-orange-900/15 border-orange-500/20' : 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200'}`}>
          <div className="absolute right-0 top-0 bottom-0 w-64 opacity-5 flex items-center justify-center">
            <Heart size={300} />
          </div>
          {isDark && <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />}

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>Emergency Pre-Booking · Priority Delivery</span>
              </div>
              <h3 className={`text-3xl md:text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Need Medicines Urgently?</h3>
              <p className={`text-sm max-w-md ${isDark ? 'text-orange-200/70' : 'text-gray-600'}`}>
                Pre-book emergency medicines for priority preparation and fast delivery. Add reason, select urgency level, and get them delivered to your doorstep.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button onClick={() => navigate('/prebooking')}
                className={`flex items-center gap-2 font-black px-8 py-4 rounded-2xl hover:bg-opacity-90 transition text-sm shadow-xl ${isDark ? 'bg-white text-orange-700 hover:bg-orange-50' : 'bg-orange-600 text-white hover:bg-orange-500'}`}>
                <Clock size={18} /> Pre-Book Now
              </button>
              <button onClick={() => navigate('/doctor')}
                className={`flex items-center gap-2 font-bold px-8 py-4 rounded-2xl transition text-sm border ${isDark ? 'bg-orange-500/20 border-orange-500/40 text-orange-300 hover:bg-orange-500/30' : 'bg-white border-orange-200 text-orange-600 hover:bg-orange-50'}`}>
                <Stethoscope size={18} /> Talk to Doctor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Searches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Trending Medicines</h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Most searched in the last 24 hours</p>
          </div>
          <button onClick={() => navigate('/search/name')} className="text-blue-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingMeds.map((med) => (
            <div key={med.id}
              onClick={() => navigate(`/medicine/${med.id}`)}
              className={`rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 group cursor-pointer ${isDark ? 'glass border-white/8 hover:bg-white/5 hover:border-blue-500/30' : 'bg-white border-gray-200 hover:shadow-lg hover:border-blue-300'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>💊</div>
                <span className={`text-xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 ${isDark ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-green-600 bg-green-50 border border-green-200'}`}>
                  <TrendingUp size={10} /> {med.trend}
                </span>
              </div>
              <h4 className={`font-bold text-sm transition ${isDark ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>{med.name}</h4>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{med.brand} · {med.category}</p>
              <div className={`flex items-center justify-between mt-4 pt-3 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                <span className={`font-black text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{med.priceDisplay}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                    <Star size={11} className="text-yellow-400 fill-yellow-400" /> {med.rating}
                  </span>
                  <button onClick={(e) => handleAddToCart(med, e)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      addedId === med.id ? 'bg-green-600 text-white' :
                      isInCart(med.id) ? (isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600') :
                      'bg-blue-600 text-white hover:bg-blue-500'
                    }`}>
                    {addedId === med.id ? <CheckCircle size={11} /> : <ShoppingCart size={11} />}
                    {addedId === med.id ? '✓' : isInCart(med.id) ? '✓' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`relative rounded-3xl p-8 md:p-12 border overflow-hidden ${isDark ? 'bg-gradient-to-r from-green-900/25 via-teal-900/15 to-green-900/20 border-green-500/15' : 'bg-gradient-to-r from-green-50 to-teal-50 border-green-200'}`}>
          {isDark && <div className="absolute inset-0 bg-dark-grid opacity-30" />}
          {isDark && <div className="absolute top-0 left-0 w-96 h-96 bg-green-600/8 rounded-full blur-3xl" />}

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Stethoscope size={16} className={isDark ? 'text-green-400' : 'text-green-600'} />
                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-green-400' : 'text-green-600'}`}>Online Consultation</span>
              </div>
              <h3 className={`text-3xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Consult a<br /><span className="text-gradient">Doctor Online</span>
              </h3>
              <p className={`text-sm leading-relaxed max-w-md mb-6 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Talk to verified doctors across 10+ specialties via video, audio, or chat. Book your appointment in just 2 minutes.
              </p>
              <button onClick={() => navigate('/doctor')}
                className="flex items-center gap-2.5 bg-green-600 text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-green-500 transition shadow-xl text-sm">
                <Stethoscope size={16} /> Book Consultation
              </button>
            </div>

            <div className={`rounded-2xl border p-5 max-w-xs w-full ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
              <p className={`text-xs font-bold mb-3 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Available Now</p>
              <div className="space-y-3">
                {[
                  { name: 'Dr. Anita Sharma', spec: 'General Physician', fee: '₹300', avatar: '👩‍⚕️' },
                  { name: 'Dr. Priya Gupta', spec: 'Dermatologist', fee: '₹500', avatar: '👩‍⚕️' },
                  { name: 'Dr. Rajesh Patel', spec: 'Cardiologist', fee: '₹800', avatar: '👨‍⚕️' },
                ].map(d => (
                  <div key={d.name} className={`flex items-center gap-3 p-2 rounded-xl ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition cursor-pointer`} onClick={() => navigate('/doctor')}>
                    <span className="text-xl">{d.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{d.name}</p>
                      <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{d.spec}</p>
                    </div>
                    <span className={`text-xs font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{d.fee}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`relative rounded-3xl p-8 md:p-12 border overflow-hidden ${isDark ? 'bg-gradient-to-r from-violet-900/30 via-blue-900/20 to-indigo-900/30 border-violet-500/15' : 'bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-200'}`}>
          {isDark && <div className="absolute inset-0 bg-dark-grid opacity-30" />}
          {isDark && <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl" />}

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Bot size={16} className="text-violet-400" />
                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>AI-Powered</span>
              </div>
              <h3 className={`text-3xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Your Personal<br /><span className="text-gradient">Health AI</span>
              </h3>
              <p className={`text-sm leading-relaxed max-w-md mb-6 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Ask anything about medicines, check drug interactions, analyze symptoms, and get personalized health advice — 24/7.
              </p>
              <button onClick={() => navigate('/ai/medicine')}
                className="flex items-center gap-2.5 bg-violet-600 text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-violet-500 transition shadow-xl neon-violet text-sm">
                <Bot size={16} /> Try MedAI Now
              </button>
            </div>

            <div className={`rounded-2xl border p-5 max-w-xs w-full ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
              <div className="space-y-3">
                {[
                  { role: 'user', text: 'What is Metformin used for?' },
                  { role: 'ai', text: 'Metformin is a first-line medication for type 2 diabetes. It lowers blood sugar by reducing glucose production in the liver.' },
                ].map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-xl text-xs max-w-[80%] ${m.role === 'user' ? 'bg-blue-600 text-white' : (isDark ? 'glass border border-white/8 text-slate-300' : 'bg-gray-100 border border-gray-200 text-gray-700')}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t mt-8 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xs">Rx</div>
              <span className={`font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>NearMyMed</span>
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>· AI Healthcare Platform</span>
            </div>
            <p className={`text-xs text-center ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>
              © 2025 NearMyMed. Built with ❤️ for better healthcare access. Not a substitute for professional medical advice.
            </p>
            <div className={`flex gap-4 text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
              <a href="#" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Privacy</a>
              <a href="#" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Terms</a>
              <a href="#" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
