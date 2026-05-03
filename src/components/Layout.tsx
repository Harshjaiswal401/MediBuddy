import React from 'react';
import { useTheme } from '../context/ThemeContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PageLayoutProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'cyan';
  children: React.ReactNode;
  headerGradient?: string;
  accentColor?: string;
}

const badgeStylesDark: Record<string, string> = {
  blue: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  red: 'bg-red-500/15 text-red-300 border border-red-500/30',
  green: 'bg-green-500/15 text-green-300 border border-green-500/30',
  purple: 'bg-violet-500/15 text-violet-300 border border-violet-500/30',
  orange: 'bg-orange-500/15 text-orange-300 border border-orange-500/30',
  cyan: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
};

const badgeStylesLight: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
  red: 'bg-red-50 text-red-700 border border-red-200',
  green: 'bg-green-50 text-green-700 border border-green-200',
  purple: 'bg-violet-50 text-violet-700 border border-violet-200',
  orange: 'bg-orange-50 text-orange-700 border border-orange-200',
  cyan: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
};

export function PageLayout({
  icon,
  title,
  subtitle,
  badge,
  badgeColor = 'blue',
  children,
  headerGradient = 'from-blue-600/20 via-blue-500/5 to-transparent',
  accentColor = 'blue',
}: PageLayoutProps) {
  const { isDark } = useTheme();
  const badgeStyles = isDark ? badgeStylesDark : badgeStylesLight;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#080c14] bg-dark-grid' : 'bg-gray-50'}`}>
      {/* Page Header */}
      <div className={`relative border-b ${isDark ? `bg-gradient-to-b ${headerGradient} border-white/5` : 'bg-gradient-to-b from-blue-50 to-white border-gray-200'}`}>
        {/* Decorative orbs */}
        {isDark && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute -top-20 -right-20 w-80 h-80 bg-${accentColor}-600/10 rounded-full blur-3xl animate-orb`} />
            <div className={`absolute -bottom-20 -left-20 w-60 h-60 bg-${accentColor}-800/10 rounded-full blur-3xl`} />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${isDark ? `bg-${accentColor}-500/10 border border-${accentColor}-500/20` : `bg-${accentColor}-50 border border-${accentColor}-200`}`}>
                {icon}
              </div>
              {badge && (
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${badgeStyles[badgeColor]}`}>
                  {badge}
                </span>
              )}
            </div>
            <h1 className={`text-2xl md:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
            {subtitle && (
              <p className={`mt-3 text-sm md:text-base max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="animate-fade-in-up">
          {children}
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'blue' | 'red' | 'green' | 'violet' | 'cyan' | 'none';
}

export function Card({ children, className = '', hover = false, glow = 'none' }: CardProps) {
  const { isDark } = useTheme();

  const glowMap: Record<string, string> = {
    blue: 'hover:neon-blue hover:border-blue-500/30',
    red: 'hover:neon-red hover:border-red-500/30',
    green: 'hover:shadow-green-500/20',
    violet: 'hover:neon-violet hover:border-violet-500/30',
    cyan: 'hover:neon-cyan hover:border-cyan-500/30',
    none: '',
  };

  return (
    <div
      className={`rounded-2xl border ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'} ${hover ? `hover:-translate-y-1 transition-all duration-300 cursor-pointer ${isDark ? `hover:bg-white/8 ${glowMap[glow]}` : 'hover:shadow-lg hover:border-blue-300'}` : ''
        } ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  return (
    <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{children}</h2>
  );
}

export function SearchBar({
  placeholder,
  onSearch,
  buttonLabel = 'Search',
  accent = 'blue',
}: {
  placeholder: string;
  onSearch?: (val: string) => void;
  buttonLabel?: string;
  accent?: string;
}) {
  const [value, setValue] = React.useState('');
  const { isDark } = useTheme();

  const accentMap: Record<string, string> = {
    blue: 'bg-blue-600 hover:bg-blue-500 focus-within:ring-blue-500/40',
    red: 'bg-red-600 hover:bg-red-500 focus-within:ring-red-500/40',
    violet: 'bg-violet-600 hover:bg-violet-500 focus-within:ring-violet-500/40',
    cyan: 'bg-cyan-600 hover:bg-cyan-500 focus-within:ring-cyan-500/40',
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 p-1 rounded-2xl border ring-2 ring-transparent transition-all focus-within:ring-2 ${isDark ? `glass border-white/10 ${accentMap[accent]?.split(' ').slice(2).join(' ') || 'focus-within:ring-blue-500/30'}` : `bg-white border-gray-300 shadow-sm focus-within:ring-blue-500/30 focus-within:border-blue-400`
      }`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.(value)}
        placeholder={placeholder}
        className={`flex-1 px-5 py-3.5 bg-transparent focus:outline-none text-sm ${isDark ? 'text-white placeholder-slate-500' : 'text-gray-900 placeholder-gray-400'}`}
      />
      <button
        onClick={() => onSearch?.(value)}
        className={`${accentMap[accent]?.split(' ').slice(0, 2).join(' ') || 'bg-blue-600 hover:bg-blue-500'} text-white font-semibold px-7 py-3.5 rounded-xl transition shadow-lg text-sm whitespace-nowrap`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export function MapPlaceholder({ label = 'Map View' }: { label?: string }) {
  const { isDark } = useTheme();
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<L.Map | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = React.useState('');

  const enableGPS = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }
    setStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setStatus('success');
        if (mapContainerRef.current && !mapRef.current) {
          const map = L.map(mapContainerRef.current).setView([latitude, longitude], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(map);
          const icon = L.divIcon({
            html: '<div style="width:18px;height:18px;background:#3b82f6;border:3px solid #fff;border-radius:50%;box-shadow:0 0 10px rgba(59,130,246,0.6)"></div>',
            className: '',
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          });
          L.marker([latitude, longitude], { icon }).addTo(map)
            .bindPopup(`<b>📍 You are here</b><br/>Accuracy: ${Math.round(accuracy)}m`)
            .openPopup();
          L.circle([latitude, longitude], { radius: accuracy, color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1, weight: 1 }).addTo(map);
          mapRef.current = map;
          setTimeout(() => map.invalidateSize(), 200);
        }
      },
      (err) => {
        setStatus('error');
        setErrorMsg(err.code === 1 ? 'Location permission denied. Please allow access.' : 'Unable to retrieve your location. Please try again.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  React.useEffect(() => {
    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  if (status === 'success') {
    return (
      <div className="rounded-2xl overflow-hidden border border-blue-500/20">
        <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden h-72 md:h-96 flex items-center justify-center ${isDark ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
      <div className={`absolute inset-0 opacity-30 bg-dark-grid`} />
      <div className="absolute inset-0">
        <div className={`absolute top-1/3 left-0 right-0 h-px ${isDark ? 'bg-blue-500/30' : 'bg-blue-300/40'}`} />
        <div className={`absolute top-2/3 left-0 right-0 h-px ${isDark ? 'bg-blue-500/20' : 'bg-blue-200/40'}`} />
        <div className={`absolute left-1/4 top-0 bottom-0 w-px ${isDark ? 'bg-blue-500/30' : 'bg-blue-300/40'}`} />
        <div className={`absolute left-3/4 top-0 bottom-0 w-px ${isDark ? 'bg-blue-500/20' : 'bg-blue-200/40'}`} />
      </div>
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-300 animate-pulse-blue shadow-lg" />
      </div>
      <div className="absolute top-2/3 left-3/4 -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-red-300 animate-pulse-red shadow-lg" />
      </div>
      <div className={`relative z-10 text-center rounded-2xl px-8 py-6 border ${isDark ? 'glass border-white/10' : 'bg-white/90 border-gray-200 shadow-md'}`}>
        <div className="text-4xl mb-3">🗺️</div>
        <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</p>
        {status === 'error' && <p className="text-xs text-red-400 mt-1">{errorMsg}</p>}
        {status === 'loading' ? (
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>Getting your location...</span>
          </div>
        ) : (
          <>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Click to enable live GPS location</p>
            <button onClick={enableGPS} className="mt-3 text-xs bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-500 transition shadow-lg neon-blue">
              📍 Enable GPS
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function ChatUI() {
  const [messages, setMessages] = React.useState([
    { role: 'ai', text: "Hello! I'm MedAI, your personal healthcare assistant powered by advanced AI. How can I help you today?" },
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  // Function to send message to n8n AI
  const sendMessageToAI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId: "user-12345",
          chatInput: userMessage,
        }),
      });

      if (!response.ok) {
        console.error("MedAI response error:", response.status);
        return "Sorry, the AI service is temporarily unavailable. Please try again later.";
      }

      const data = await response.json();
      console.log("AI Doctor's Reply:", data.output);
      return data.output || "I received your query but couldn't generate a response. Please try again.";

    } catch (error) {
      console.error("Error connecting to MedAI:", error);
      return "Sorry, server se connection toot gaya. Thodi der baad try karein.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    const aiReplyText = await sendMessageToAI(userInput);
    setMessages((prev) => [...prev, { role: 'ai', text: aiReplyText }]);
    setIsLoading(false);
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className={`flex flex-col h-[520px] rounded-2xl border overflow-hidden ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
      {/* Chat header */}
      <div className={`flex items-center gap-3 px-5 py-4 border-b ${isDark ? 'border-white/8 bg-blue-500/5' : 'border-gray-200 bg-blue-50'}`}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg neon-blue">
          AI
        </div>
        <div>
          <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>MedAI Assistant</p>
          <p className="text-xs text-green-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
            Online · Always ready
          </p>
        </div>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            {msg.role === 'ai' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black mr-2 mt-0.5 flex-shrink-0">
                AI
              </div>
            )}
            <div
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm shadow-lg neon-blue'
                  : isDark ? 'glass text-slate-200 rounded-bl-sm border border-white/8' : 'bg-gray-100 text-gray-800 rounded-bl-sm border border-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black mr-2 mt-0.5 flex-shrink-0">
              AI
            </div>
            <div className={`px-4 py-3 rounded-2xl rounded-bl-sm text-sm ${isDark ? 'glass border border-white/8' : 'bg-gray-100 border border-gray-200'}`}>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} style={{ animationDelay: '0ms' }} />
                <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} style={{ animationDelay: '150ms' }} />
                <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`px-4 py-4 border-t flex gap-3 ${isDark ? 'border-white/8' : 'border-gray-200'}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isLoading ? "Waiting for AI response..." : "Type your health question..."}
          disabled={isLoading}
          className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition ${isDark ? 'glass border-white/10 text-white placeholder-slate-500 focus:border-blue-500/50' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-500 transition shadow-lg neon-blue ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export function EmptyResultCard({ icon, text }: { icon: string; text: string }) {
  const { isDark } = useTheme();
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}

export function InfoBadge({ label, value, color = 'blue' }: { label: string; value: string; color?: string }) {
  const { isDark } = useTheme();
  const colorMapDark: Record<string, string> = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    red: 'bg-red-500/10 border-red-500/20 text-red-300',
    green: 'bg-green-500/10 border-green-500/20 text-green-300',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
  };
  const colorMapLight: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    violet: 'bg-violet-50 border-violet-200 text-violet-700',
  };
  const colorMap = isDark ? colorMapDark : colorMapLight;
  return (
    <div className={`flex flex-col rounded-2xl border p-5 ${colorMap[color] ?? colorMap.blue}`}>
      <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</span>
      <span className="text-2xl font-black mt-1">{value}</span>
    </div>
  );
}

export function MedicineCard({
  name,
  brand,
  category,
  price,
  rating,
  trend,
  onClick,
}: {
  name: string;
  brand: string;
  category: string;
  price: string;
  rating: number;
  trend: string;
  onClick?: () => void;
}) {
  const { isDark } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl p-5 text-left hover:-translate-y-1 transition-all duration-300 group border ${isDark ? 'glass border-white/8 hover:bg-white/8 hover:border-blue-500/30 hover:neon-blue' : 'bg-white border-gray-200 hover:shadow-lg hover:border-blue-300'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
          💊
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${isDark ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-green-600 bg-green-50 border border-green-200'}`}>
          ↑ {trend}
        </span>
      </div>
      <h4 className={`font-bold text-sm transition ${isDark ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>{name}</h4>
      <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{brand} · {category}</p>
      <div className="flex items-center justify-between mt-4">
        <span className={`font-black text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{price}</span>
        <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
          ⭐ {rating}
        </span>
      </div>
    </button>
  );
}
