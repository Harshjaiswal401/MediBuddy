import { useParams, useNavigate } from 'react-router-dom';
import {
  Pill, ShoppingCart, AlertTriangle, ChevronRight, Shield, Zap, Heart,
  FlaskConical, Package, Thermometer, Clock, CheckCircle, XCircle,
  ChevronDown, ChevronUp, ArrowLeft, Star, Info,
} from 'lucide-react';
import { getMedicineById, medicineDatabase } from '../../data/medicineData';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

function Section({ title, icon, children, defaultOpen = false, accentColor = 'blue' }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; accentColor?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { isDark } = useTheme();

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
      <button onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-6 py-4 text-left transition ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
        <div className="flex items-center gap-3">
          <span className={`text-${accentColor}-400`}>{icon}</span>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</span>
        </div>
        {open ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
      </button>
      {open && (
        <div className={`px-6 pb-5 border-t ${isDark ? 'border-white/5' : 'border-gray-100'} animate-fade-in`}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function MedicineDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { isDark } = useTheme();
  const [addedToast, setAddedToast] = useState(false);

  const medicine = getMedicineById(id || '');

  if (!medicine) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#080c14]' : 'bg-gray-50'}`}>
        <div className="text-center">
          <span className="text-6xl mb-4 block">💊</span>
          <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Medicine Not Found</h2>
          <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>The medicine you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/search/name')} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition">
            Search Medicines
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ id: medicine.id, name: medicine.name, brand: medicine.brand, price: medicine.price, priceDisplay: medicine.priceDisplay, type: medicine.type });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const relatedMeds = medicineDatabase.filter(m => m.category === medicine.category && m.id !== medicine.id).slice(0, 3);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#080c14] bg-dark-grid' : 'bg-gray-50'}`}>
      {/* Toast */}
      {addedToast && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border ${isDark ? 'bg-green-500/20 border-green-500/30 text-green-300' : 'bg-green-50 border-green-200 text-green-700'}`}>
            <CheckCircle size={18} />
            <span className="font-semibold text-sm">Added to cart!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`relative border-b ${isDark ? 'bg-gradient-to-b from-blue-600/15 via-blue-500/5 to-transparent border-white/5' : 'bg-gradient-to-b from-blue-50 to-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <button onClick={() => navigate(-1)} className={`flex items-center gap-2 text-sm mb-6 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            <ArrowLeft size={16} /> Back
          </button>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${isDark ? 'bg-blue-500/15 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{medicine.category}</span>
                {medicine.prescriptionRequired && (
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${isDark ? 'bg-orange-500/15 text-orange-300 border-orange-500/30' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>⚕️ Prescription Required</span>
                )}
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${medicine.inStock ? (isDark ? 'bg-green-500/15 text-green-300 border-green-500/30' : 'bg-green-50 text-green-700 border-green-200') : (isDark ? 'bg-red-500/15 text-red-300 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200')}`}>
                  {medicine.inStock ? '● In Stock' : '● Out of Stock'}
                </span>
              </div>

              <h1 className={`text-3xl md:text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{medicine.name}</h1>
              <p className={`text-lg mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{medicine.brand} · {medicine.genericName}</p>
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>by {medicine.manufacturer} · {medicine.type} · {medicine.stripSize}</p>

              <div className="flex items-center gap-4 mt-4">
                <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  <Star size={14} className="fill-current" /> {medicine.rating}
                </span>
                <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  ↑ {medicine.trend} trending
                </span>
              </div>

              <p className={`mt-5 text-sm leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{medicine.description}</p>
            </div>

            {/* Price card */}
            <div className={`w-full lg:w-80 rounded-2xl border p-6 flex-shrink-0 ${isDark ? 'glass border-white/10' : 'bg-white border-gray-200 shadow-md'}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`text-4xl font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{medicine.priceDisplay}</span>
                <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>/ strip</span>
              </div>
              <p className={`text-xs mb-6 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{medicine.stripSize}</p>

              <button onClick={handleAddToCart} disabled={!medicine.inStock}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition shadow-lg mb-3 ${
                  !medicine.inStock ? 'bg-gray-500 text-gray-300 cursor-not-allowed' :
                  isInCart(medicine.id) ? (isDark ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-600 text-white hover:bg-green-500') :
                  'bg-blue-600 text-white hover:bg-blue-500 neon-blue'
                }`}>
                <ShoppingCart size={18} />
                {!medicine.inStock ? 'Out of Stock' : isInCart(medicine.id) ? 'Add Another' : 'Add to Cart'}
              </button>

              <button onClick={() => navigate('/cart')}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition border ${isDark ? 'glass border-white/10 text-slate-300 hover:text-white hover:bg-white/5' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                View Cart <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Section title="Uses & Indications" icon={<CheckCircle size={18} />} defaultOpen accentColor="green">
              <ul className="mt-4 space-y-2">
                {medicine.uses.map((use, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                    {use}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Dosage Information" icon={<Clock size={18} />} defaultOpen accentColor="blue">
              <div className="mt-4 space-y-4">
                {[
                  { label: 'Adult Dosage', value: medicine.dosage.adult, icon: '💊' },
                  { label: 'Child Dosage', value: medicine.dosage.child, icon: '👶' },
                  ...(medicine.dosage.elderly ? [{ label: 'Elderly Dosage', value: medicine.dosage.elderly, icon: '🧓' }] : []),
                ].map((d, i) => (
                  <div key={i} className={`rounded-xl p-4 border ${isDark ? 'bg-blue-500/5 border-blue-500/15' : 'bg-blue-50 border-blue-100'}`}>
                    <p className={`text-xs font-bold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>{d.icon} {d.label}</p>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{d.value}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Side Effects" icon={<AlertTriangle size={18} />} accentColor="yellow">
              <div className="mt-4 space-y-4">
                <div>
                  <p className={`text-xs font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>Common Side Effects</p>
                  <div className="flex flex-wrap gap-2">
                    {medicine.sideEffects.common.map((se, i) => (
                      <span key={i} className={`text-xs px-3 py-1.5 rounded-full border ${isDark ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>{se}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={`text-xs font-bold mb-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>Rare but Serious</p>
                  <div className="flex flex-wrap gap-2">
                    {medicine.sideEffects.rare.map((se, i) => (
                      <span key={i} className={`text-xs px-3 py-1.5 rounded-full border ${isDark ? 'bg-red-500/10 border-red-500/20 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>{se}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Warnings & Precautions" icon={<Shield size={18} />} accentColor="orange">
              <ul className="mt-4 space-y-2">
                {medicine.warnings.map((w, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    <AlertTriangle size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Drug Interactions" icon={<FlaskConical size={18} />} accentColor="red">
              <ul className="mt-4 space-y-2">
                {medicine.interactions.map((inter, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    <XCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                    {inter}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="How It Works" icon={<Zap size={18} />} accentColor="violet">
              <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{medicine.howItWorks}</p>
            </Section>

            <Section title="Storage Instructions" icon={<Package size={18} />} accentColor="cyan">
              <p className={`mt-4 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{medicine.storage}</p>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Info */}
            <div className={`rounded-2xl border p-5 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
              <h3 className={`font-bold text-sm mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Info</h3>
              <div className="space-y-3">
                {[
                  { label: 'Type', value: medicine.type },
                  { label: 'Generic Name', value: medicine.genericName },
                  { label: 'Manufacturer', value: medicine.manufacturer },
                  { label: 'Strip Size', value: medicine.stripSize },
                  { label: 'Prescription', value: medicine.prescriptionRequired ? 'Required' : 'Not Required' },
                ].map((info, i) => (
                  <div key={i} className={`flex justify-between text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    <span className="font-medium">{info.label}</span>
                    <span className={isDark ? 'text-slate-300' : 'text-gray-800'}>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Medicines */}
            {relatedMeds.length > 0 && (
              <div className={`rounded-2xl border p-5 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
                <h3 className={`font-bold text-sm mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Related Medicines</h3>
                <div className="space-y-3">
                  {relatedMeds.map(m => (
                    <button key={m.id} onClick={() => navigate(`/medicine/${m.id}`)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${isDark ? 'hover:bg-white/5 border border-white/5' : 'hover:bg-gray-50 border border-gray-100'}`}>
                      <span className="text-2xl">💊</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{m.name}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{m.brand}</p>
                      </div>
                      <span className={`text-sm font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{m.priceDisplay}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className={`rounded-2xl border p-5 ${isDark ? 'bg-yellow-500/5 border-yellow-500/15' : 'bg-yellow-50 border-yellow-200'}`}>
              <div className="flex items-start gap-3">
                <Info size={18} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  This information is for reference only and should not replace professional medical advice. Always consult a licensed physician before starting any medication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
