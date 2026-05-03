import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope, Star, Clock, Video, Phone as PhoneIcon, MessageSquare,
  ArrowLeft, CheckCircle, Calendar, User, ChevronRight, MapPin, Award,
  Users, Globe,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { doctorDatabase, type Doctor } from '../../data/doctorData';

export default function TalkToDoctor() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingStep, setBookingStep] = useState(0); // 0: list, 1: booking form, 2: confirm, 3: done
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultType, setConsultType] = useState<'video' | 'audio' | 'chat'>('video');
  const [form, setForm] = useState({ name: '', age: '', gender: '', phone: '', symptoms: '' });

  const specialties = ['All', ...new Set(doctorDatabase.map(d => d.specialty))];
  const filtered = selectedSpecialty === 'All' ? doctorDatabase : doctorDatabase.filter(d => d.specialty === selectedSpecialty);

  const consultIcons = { video: <Video size={14} />, audio: <PhoneIcon size={14} />, chat: <MessageSquare size={14} /> };
  const consultLabels = { video: 'Video Call', audio: 'Audio Call', chat: 'Chat' };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition ${isDark ? 'glass border border-white/10 text-white placeholder-slate-500 focus:ring-blue-500/40' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500/30'}`;
  const selectClass = `w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition ${isDark ? 'bg-gray-800 border border-gray-700 text-white focus:ring-blue-500/40' : 'bg-white border border-gray-300 text-gray-900 focus:ring-blue-500/30'}`;

  const handleBooking = () => {
    if (form.name && form.phone && selectedSlot) setBookingStep(3);
  };

  // ── SUCCESS ──
  if (bookingStep === 3 && selectedDoctor) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#080c14]' : 'bg-gray-50'}`}>
        <div className="text-center animate-fade-in-up max-w-lg mx-auto px-4">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${isDark ? 'bg-green-500/20 border-2 border-green-400/40' : 'bg-green-100 border-2 border-green-300'}`}>
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h1 className={`text-3xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Appointment Booked! 🎉</h1>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Your consultation has been confirmed</p>

          <div className={`rounded-2xl border p-6 text-left mb-8 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedDoctor.avatar}</span>
              <div>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedDoctor.name}</p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{selectedDoctor.specialty}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                <span>Time Slot</span><span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedSlot} · Today</span>
              </div>
              <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                <span>Consultation</span><span className={isDark ? 'text-white' : 'text-gray-900'}>{consultLabels[consultType]}</span>
              </div>
              <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                <span>Fee</span><span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{selectedDoctor.feeDisplay}</span>
              </div>
              <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                <span>Patient</span><span className={isDark ? 'text-white' : 'text-gray-900'}>{form.name}</span>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-4 mb-8 ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
            <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>📩 A confirmation SMS and email will be sent to your registered contact. Join the consultation at the scheduled time.</p>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition text-sm">Back to Home</button>
            <button onClick={() => { setBookingStep(0); setSelectedDoctor(null); }}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition border ${isDark ? 'glass border-white/10 text-slate-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>Book Another</button>
          </div>
        </div>
      </div>
    );
  }

  // ── BOOKING FORM ──
  if (bookingStep >= 1 && selectedDoctor) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#080c14] bg-dark-grid' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button onClick={() => setBookingStep(0)} className={`flex items-center gap-2 text-sm mb-6 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            <ArrowLeft size={16} /> Back to Doctors
          </button>

          {/* Doctor Info */}
          <div className={`rounded-2xl border p-6 mb-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{selectedDoctor.avatar}</span>
              <div>
                <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedDoctor.name}</h2>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{selectedDoctor.specialty} · {selectedDoctor.qualification}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}><Star size={12} className="fill-current" /> {selectedDoctor.rating}</span>
                  <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{selectedDoctor.experience} yrs exp</span>
                  <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{selectedDoctor.patientsServed} patients</span>
                </div>
              </div>
              <div className="ml-auto">
                <span className={`text-2xl font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{selectedDoctor.feeDisplay}</span>
              </div>
            </div>
            <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{selectedDoctor.about}</p>
          </div>

          {/* Select Slot */}
          <div className={`rounded-2xl border p-6 mb-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className={isDark ? 'text-blue-400' : 'text-blue-500'} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Select Time Slot</h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {selectedDoctor.availableSlots.map(slot => (
                <button key={slot} onClick={() => setSelectedSlot(slot)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${selectedSlot === slot
                    ? (isDark ? 'border-blue-500/40 bg-blue-500/15 text-blue-300' : 'border-blue-400 bg-blue-50 text-blue-700')
                    : (isDark ? 'border-white/8 text-slate-400 hover:border-white/20' : 'border-gray-200 text-gray-600 hover:border-gray-300')
                  }`}>
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Type */}
          <div className={`rounded-2xl border p-6 mb-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Video size={18} className={isDark ? 'text-violet-400' : 'text-violet-500'} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Consultation Type</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {selectedDoctor.consultationType.map(type => (
                <button key={type} onClick={() => setConsultType(type)}
                  className={`p-3 rounded-xl border text-center transition ${consultType === type
                    ? (isDark ? 'border-violet-500/40 bg-violet-500/10' : 'border-violet-400 bg-violet-50')
                    : (isDark ? 'border-white/8 hover:border-white/20' : 'border-gray-200 hover:border-gray-300')
                  }`}>
                  <div className={`flex items-center justify-center mb-1 ${consultType === type ? (isDark ? 'text-violet-400' : 'text-violet-600') : (isDark ? 'text-slate-400' : 'text-gray-500')}`}>{consultIcons[type]}</div>
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{consultLabels[type]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Patient Info */}
          <div className={`rounded-2xl border p-6 mb-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className={isDark ? 'text-green-400' : 'text-green-500'} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Patient Details</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Full Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Patient name" className={inputClass} />
              </div>
              <div>
                <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Phone *</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className={inputClass} />
              </div>
              <div>
                <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Age</label>
                <input value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="Age" className={inputClass} />
              </div>
              <div>
                <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Gender</label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className={selectClass}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Symptoms / Reason for Visit</label>
                <textarea value={form.symptoms} onChange={e => setForm({ ...form, symptoms: e.target.value })} placeholder="Describe your symptoms or reason for consultation..." className={inputClass} rows={3} />
              </div>
            </div>
          </div>

          <button onClick={handleBooking}
            disabled={!form.name || !form.phone || !selectedSlot}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition shadow-lg ${
              !form.name || !form.phone || !selectedSlot
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-500'
            }`}>
            <CheckCircle size={18} /> Book Appointment · {selectedDoctor.feeDisplay}
          </button>
        </div>
      </div>
    );
  }

  // ── DOCTOR LIST ──
  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#080c14] bg-dark-grid' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'bg-gradient-to-b from-green-600/12 via-teal-500/5 to-transparent border-white/5' : 'bg-gradient-to-b from-green-50 to-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <button onClick={() => navigate(-1)} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
              <Stethoscope size={26} className={isDark ? 'text-green-400' : 'text-green-500'} />
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${isDark ? 'bg-green-500/15 text-green-300 border-green-500/30' : 'bg-green-50 text-green-700 border-green-200'}`}>Online Consultation</span>
          </div>
          <h1 className={`text-2xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Talk to a Doctor</h1>
          <p className={`text-sm mt-2 max-w-xl ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Book a consultation with verified, experienced doctors across multiple specialties. Video, audio, or chat — your choice.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Specialty Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {specialties.map(s => (
            <button key={s} onClick={() => setSelectedSpecialty(s)}
              className={`text-xs px-4 py-2 rounded-full font-semibold transition border ${selectedSpecialty === s
                ? (isDark ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-500 text-white border-blue-500')
                : (isDark ? 'text-slate-400 border-white/10 hover:border-white/20' : 'text-gray-600 border-gray-200 hover:border-gray-300')
              }`}>
              {s}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(doc => (
            <div key={doc.id}
              className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${isDark ? 'glass border-white/8 hover:border-green-500/25 hover:bg-white/3' : 'bg-white border-gray-200 hover:shadow-lg hover:border-green-300'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
                  {doc.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</h3>
                    {doc.isAvailableNow && <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">● Online</span>}
                  </div>
                  <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{doc.specialty}</p>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{doc.qualification}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-lg font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{doc.feeDisplay}</span>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>per session</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}><Star size={12} className="fill-current" /> {doc.rating}</span>
                <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}><Award size={12} /> {doc.experience} yrs</span>
                <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}><Users size={12} /> {doc.patientsServed}</span>
                <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}><Globe size={12} /> {doc.languages.slice(0, 2).join(', ')}</span>
              </div>
              <p className={`text-xs mt-3 flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}><MapPin size={11} /> {doc.hospital}</p>

              <div className={`flex items-center gap-2 mt-3 pt-3 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                <div className="flex gap-1.5">
                  {doc.consultationType.map(ct => (
                    <span key={ct} className={`text-xs px-2 py-1 rounded-lg border ${isDark ? 'border-white/10 text-slate-400' : 'border-gray-200 text-gray-500'}`}>
                      {consultLabels[ct]}
                    </span>
                  ))}
                </div>
                <button onClick={() => { setSelectedDoctor(doc); setBookingStep(1); setSelectedSlot(''); }}
                  className={`ml-auto flex items-center gap-1 px-5 py-2 rounded-xl text-xs font-bold transition ${isDark ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-600 text-white hover:bg-green-500'} shadow-lg`}>
                  Book Now <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
