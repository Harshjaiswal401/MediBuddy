import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, AlertTriangle, Bot, CheckCircle, XCircle, 
  Heart, Users, TrendingUp, Activity, Pill, ShieldAlert,
  MapPin, Clock
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { medicineDatabase } from '../data/medicineData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Mock Data for Adherence Chart
const adherenceData = [
  { name: 'Mon', taken: 3, missed: 0 },
  { name: 'Tue', taken: 2, missed: 1 },
  { name: 'Wed', taken: 3, missed: 0 },
  { name: 'Thu', taken: 1, missed: 2 },
  { name: 'Fri', taken: 3, missed: 0 },
  { name: 'Sat', taken: 2, missed: 1 },
  { name: 'Sun', taken: 0, missed: 3 }, // Risk scenario
];

const mockPatients = [
  { id: 1, name: 'Robert Fox', age: 72, adherence: 65, status: 'critical', alerts: 3 },
  { id: 2, name: 'Esther Howard', age: 68, adherence: 92, status: 'good', alerts: 0 },
  { id: 3, name: 'Jenny Wilson', age: 81, adherence: 85, status: 'warning', alerts: 1 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  const [view, setView] = useState<'patient' | 'caregiver'>('patient');
  const [searchQuery, setSearchQuery] = useState('');
  const [schedule, setSchedule] = useState([
    { id: 1, name: 'Metformin 500mg', time: '08:00 AM', status: 'taken', type: 'Diabetes' },
    { id: 2, name: 'Amlodipine 5mg', time: '01:00 PM', status: 'missed', type: 'Blood Pressure' },
    { id: 3, name: 'Atorvastatin 20mg', time: '08:00 PM', status: 'pending', type: 'Cholesterol' },
  ]);

  const [missedCount, setMissedCount] = useState(3); // Mocking multiple missed doses for the demo
  const [showEmergency, setShowEmergency] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simulate adding to schedule from search
      setSchedule([...schedule, { 
        id: Date.now(), 
        name: searchQuery, 
        time: 'Scheduled', 
        status: 'pending',
        type: 'New Prescription'
      }]);
      setSearchQuery('');
    }
  };

  const markStatus = (id: number, status: 'taken' | 'missed') => {
    setSchedule(schedule.map(item => item.id === id ? { ...item, status } : item));
    if (status === 'missed') setMissedCount(prev => prev + 1);
  };

  const adherencePercentage = Math.round(
    ((schedule.filter(s => s.status === 'taken').length + 15) / (schedule.length + 20)) * 100
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#080c14]' : 'bg-gray-50'} pb-24`}>
      {/* Top Toggle Bar */}
      <div className={`sticky top-16 z-40 border-b ${isDark ? 'glass border-white/10' : 'bg-white border-gray-200 shadow-sm'} py-3 px-4 flex justify-center`}>
        <div className={`inline-flex rounded-full p-1 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          <button 
            onClick={() => setView('patient')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              view === 'patient' 
                ? (isDark ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600 shadow-sm') 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
            }`}
          >
            <Activity size={16} className="inline mr-2" /> Patient View
          </button>
          <button 
            onClick={() => setView('caregiver')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              view === 'caregiver' 
                ? (isDark ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-indigo-600 shadow-sm') 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
            }`}
          >
            <Users size={16} className="inline mr-2" /> Caregiver View
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {view === 'patient' ? (
          <div className="animate-fade-in-up">
            {/* Header & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
              <div className={`lg:col-span-2 rounded-3xl p-8 border relative overflow-hidden ${isDark ? 'glass border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-transparent' : 'bg-white border-blue-100 shadow-md'}`}>
                <h1 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Your Daily <span className="text-gradient">Adherence</span>
                </h1>
                <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  Track your medications to maintain your health streak.
                </p>
                
                {/* Search / Add to Schedule */}
                <form onSubmit={handleSearch} className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search medicine to add to schedule..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`block w-full pl-10 pr-32 py-4 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-[#0f172a] border-white/10 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
                  />
                  <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 rounded-lg text-sm transition-all shadow-md">
                    Add Schedule
                  </button>
                </form>
              </div>

              {/* Progress Circle Card */}
              <div className={`rounded-3xl p-8 border flex flex-col items-center justify-center text-center ${isDark ? 'glass border-white/10' : 'bg-white border-gray-200 shadow-md'}`}>
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="transparent" stroke={isDark ? '#1e293b' : '#f1f5f9'} strokeWidth="12" />
                    <circle 
                      cx="64" cy="64" r="56" fill="transparent" 
                      stroke="#3b82f6" strokeWidth="12" 
                      strokeDasharray="351" 
                      strokeDashoffset={351 - (351 * adherencePercentage) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{adherencePercentage}%</span>
                  </div>
                </div>
                <h3 className={`font-bold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Weekly Adherence</h3>
                <p className={`text-xs mt-1 ${adherencePercentage > 80 ? 'text-green-500' : 'text-orange-500'}`}>
                  {adherencePercentage > 80 ? 'Excellent! Keep it up.' : 'Needs improvement.'}
                </p>
              </div>
            </div>

            {/* AI Insights & Emergency Warnings */}
            {missedCount >= 3 && showEmergency && (
              <div className={`mb-8 rounded-2xl p-6 border animate-pulse-red relative overflow-hidden ${isDark ? 'bg-red-900/20 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-black text-red-500 mb-1`}>⚠️ AI Insights: Risk Increasing</h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-red-200/80' : 'text-red-800/80'}`}>
                      You have missed {missedCount} doses this week. This can significantly impact your treatment efficacy. Suggestion: Adjust your schedule or consult your doctor about alternative medicines with fewer side effects.
                    </p>
                    <div className="flex gap-3">
                      <button onClick={() => navigate('/alternatives/safe')} className="bg-red-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-red-600 transition shadow-lg">
                        Find Safe Alternatives
                      </button>
                      <button onClick={() => navigate('/emergency/pharmacy')} className={`text-sm font-bold px-5 py-2.5 rounded-xl transition border ${isDark ? 'bg-transparent border-red-500/40 text-red-400 hover:bg-red-500/10' : 'bg-white border-red-200 text-red-600 hover:bg-red-50'}`}>
                        Locate Emergency Pharmacy
                      </button>
                    </div>
                  </div>
                  <button onClick={() => setShowEmergency(false)} className={`p-2 rounded-lg ${isDark ? 'text-red-400 hover:bg-red-500/20' : 'text-red-600 hover:bg-red-100'}`}>
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Timeline Schedule */}
              <div className={`xl:col-span-2 rounded-3xl p-6 border ${isDark ? 'glass border-white/10' : 'bg-white border-gray-200 shadow-md'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Today's Schedule</h2>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    {schedule.length} Medicines
                  </span>
                </div>

                <div className="space-y-4">
                  {schedule.map((med, index) => (
                    <div key={med.id} className={`flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border transition-all ${
                      med.status === 'taken' ? (isDark ? 'border-green-500/30 bg-green-500/5' : 'border-green-200 bg-green-50') :
                      med.status === 'missed' ? (isDark ? 'border-red-500/30 bg-red-500/5' : 'border-red-200 bg-red-50') :
                      (isDark ? 'border-white/10 hover:border-blue-500/30 hover:bg-white/5' : 'border-gray-200 hover:border-blue-300 hover:shadow-md')
                    }`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl ${
                        med.status === 'taken' ? 'bg-green-500/20 text-green-500' :
                        med.status === 'missed' ? 'bg-red-500/20 text-red-500' :
                        isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {med.status === 'taken' ? <CheckCircle size={24} /> : med.status === 'missed' ? <XCircle size={24} /> : <Pill size={24} />}
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left w-full">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                          <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{med.name}</h3>
                          {med.status === 'pending' && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                        </div>
                        <p className={`text-sm flex items-center justify-center sm:justify-start gap-1.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                          <Clock size={14} /> {med.time} · {med.type}
                        </p>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        {med.status === 'pending' ? (
                          <>
                            <button onClick={() => markStatus(med.id, 'taken')} className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg text-sm">
                              Take Now
                            </button>
                            <button onClick={() => markStatus(med.id, 'missed')} className={`flex-1 sm:flex-none font-bold px-4 py-3 rounded-xl transition border text-sm ${isDark ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-red-200 text-red-600 hover:bg-red-50'}`}>
                              Missed
                            </button>
                          </>
                        ) : (
                          <div className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 ${
                            med.status === 'taken' 
                              ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') 
                              : (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')
                          }`}>
                            {med.status === 'taken' ? <><CheckCircle size={16} /> Taken</> : <><XCircle size={16} /> Missed</>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Visual Dashboard */}
              <div className={`rounded-3xl p-6 border flex flex-col ${isDark ? 'glass border-white/10' : 'bg-white border-gray-200 shadow-md'}`}>
                <div className="mb-6">
                  <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>7-Day Analytics</h2>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Medicines taken vs missed</p>
                </div>
                
                <div className="flex-1 w-full h-[300px] min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adherenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} vertical={false} />
                      <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 'bold' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="taken" name="Taken" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
                      <Bar dataKey="missed" name="Missed" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <button onClick={() => navigate('/pharmacy/directions')} className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition ${isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200 text-gray-900 hover:bg-gray-50'}`}>
                  <MapPin size={16} /> Inventory Running Low? Buy Now
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* CAREGIVER VIEW */
          <div className="animate-fade-in-up">
            <div className="mb-8">
              <h1 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Patient <span className="text-gradient">Monitoring</span>
              </h1>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Monitor medication adherence and health alerts for all your patients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPatients.map((patient) => (
                <div key={patient.id} className={`rounded-3xl p-6 border relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  patient.status === 'critical' ? (isDark ? 'bg-red-900/10 border-red-500/30' : 'bg-red-50 border-red-200') :
                  patient.status === 'warning' ? (isDark ? 'bg-yellow-900/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200') :
                  (isDark ? 'glass border-white/10' : 'bg-white border-gray-200')
                }`}>
                  {patient.status === 'critical' && <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/20 rounded-bl-full blur-xl" />}
                  
                  <div className="flex justify-between items-start mb-6 relative">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{patient.name}</h3>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{patient.age} years old</p>
                      </div>
                    </div>
                    {patient.alerts > 0 && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                        {patient.alerts}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Adherence Score</span>
                      <span className={`text-xl font-black ${
                        patient.adherence > 80 ? 'text-green-500' : patient.adherence > 60 ? 'text-yellow-500' : 'text-red-500'
                      }`}>{patient.adherence}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-full rounded-full ${patient.adherence > 80 ? 'bg-green-500' : patient.adherence > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${patient.adherence}%` }} 
                      />
                    </div>
                  </div>

                  {patient.status === 'critical' && (
                    <div className={`mt-4 p-3 rounded-xl flex items-start gap-2 ${isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700'}`}>
                      <ShieldAlert size={16} className="mt-0.5 flex-shrink-0" />
                      <p className="text-xs font-medium">Critical: Missed heart medication for 2 consecutive days.</p>
                    </div>
                  )}

                  <button className={`w-full mt-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-white' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-900'
                  }`}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
