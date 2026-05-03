import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function EmergencyFab() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <button
      onClick={() => navigate('/prebooking')}
      className="fixed z-[9999] bottom-[100px] right-[28px] w-[58px] h-[58px] rounded-full sm:bottom-[80px] sm:right-[20px] sm:w-[50px] sm:h-[50px] flex items-center justify-center p-0 bg-transparent border-none cursor-pointer group"
      style={{ perspective: '600px', animation: 'fab-bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.2s' }}
      title="Emergency Pre-Booking"
      aria-label="Emergency Services"
    >
      {/* Outer red glow ring */}
      <div className="absolute inset-[-4px] rounded-full z-[-1] opacity-70 filter blur-[6px] transition-all duration-500 group-hover:opacity-100 group-hover:blur-[8px] group-hover:inset-[-6px]"
           style={{ background: 'conic-gradient(from 0deg, #ef4444, #b91c1c, #fca5a5, #ef4444)', animation: 'glow-spin 3s linear infinite' }} />

      {/* 3D Cube container */}
      <div className="relative w-[54px] h-[54px] sm:w-[46px] sm:h-[46px] rounded-full transition-transform duration-300 group-hover:scale-110 group-active:scale-95 flex items-center justify-center shadow-[0_8px_32px_rgba(239,68,68,0.5),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)] border-[1.5px] border-red-400/50"
           style={{ background: 'linear-gradient(145deg, #ef4444, #991b1b)' }}>
        <AlertTriangle size={24} className="text-white drop-shadow-md animate-pulse" />
      </div>

      {/* Tooltip label */}
      <div className={`absolute right-[68px] top-1/2 -translate-y-1/2 translate-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${isDark ? 'bg-slate-800 text-red-400 border border-red-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]' : 'bg-white text-red-600 border border-red-100 shadow-[0_4px_20px_rgba(239,68,68,0.2)]'}`}>
        Emergency SOS
      </div>
    </button>
  );
}
