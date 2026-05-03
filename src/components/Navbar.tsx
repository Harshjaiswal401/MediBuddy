import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Search, Pill, Building2, AlertTriangle, Bot, ScanLine, Upload,
  ChevronDown, Tag, Microscope, Activity, ArrowLeftRight, Bookmark,
  ShieldCheck, MapPin, Phone, CheckCircle, Heart, Stethoscope,
  Syringe, Ambulance, MessageSquare, ClipboardList, Lightbulb,
  Camera, FileText, Menu, X, Home, Zap, ShoppingCart, Moon, Sun, Clock,
  Package, User,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

type DropdownItem = {
  label: string;
  route: string;
  icon: React.ReactNode;
  description?: string;
};

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  isEmergency?: boolean;
  items: DropdownItem[];
};

const navItems: NavItem[] = [
  {
    id: 'search',
    label: 'Search Medicine',
    icon: <Search size={15} />,
    items: [
      { label: 'By Name', route: '/search/name', icon: <Pill size={14} />, description: 'Search using brand or generic name' },
      { label: 'By Salt', route: '/search/salt', icon: <Microscope size={14} />, description: 'Search by active ingredient' },
      { label: 'By Disease', route: '/search/disease', icon: <Activity size={14} />, description: 'Find medicines for a condition' },
    ],
  },
  {
    id: 'alternatives',
    label: 'Alternatives',
    icon: <ArrowLeftRight size={15} />,
    items: [
      { label: 'Cheapest Option', route: '/alternatives/cheap', icon: <Tag size={14} />, description: 'Same drug, lower cost' },
      { label: 'Same Brand', route: '/alternatives/brand', icon: <Bookmark size={14} />, description: 'Trusted brand variants' },
      { label: 'Less Side Effects', route: '/alternatives/safe', icon: <ShieldCheck size={14} />, description: 'Safer formulations' },
    ],
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy',
    icon: <Building2 size={15} />,
    items: [
      { label: 'Get Directions', route: '/pharmacy/directions', icon: <MapPin size={14} />, description: 'Navigate to nearest pharmacy' },
      { label: 'Call Pharmacy', route: '/pharmacy/call', icon: <Phone size={14} />, description: 'Direct call connection' },
      { label: 'Check Availability', route: '/pharmacy/availability', icon: <CheckCircle size={14} />, description: 'Real-time stock check' },
    ],
  },
  {
    id: 'emergency',
    label: 'Emergency',
    icon: <AlertTriangle size={15} />,
    isEmergency: true,
    items: [
      { label: 'Pre-Book Medicines', route: '/prebooking', icon: <Clock size={14} />, description: 'Emergency pre-order' },
      { label: 'Nearest Pharmacy', route: '/emergency/pharmacy', icon: <Building2 size={14} />, description: '24/7 emergency pharmacies' },
      { label: 'Nearest Hospital', route: '/emergency/hospital', icon: <Heart size={14} />, description: 'Locate hospitals now' },
      { label: 'Emergency Medicines', route: '/emergency/medicines', icon: <Syringe size={14} />, description: 'Critical medicine stock' },
      { label: 'Call Ambulance', route: '/emergency/ambulance', icon: <Ambulance size={14} />, description: 'One-tap emergency call' },
    ],
  },
  {
    id: 'ai',
    label: 'AI Assistant',
    icon: <Bot size={15} />,
    items: [
      { label: 'Ask Medicine', route: '/ai/medicine', icon: <MessageSquare size={14} />, description: 'AI drug information' },
      { label: 'Symptoms Check', route: '/ai/symptoms', icon: <Stethoscope size={14} />, description: 'Symptom analysis AI' },
      { label: 'Health Advice', route: '/ai/advice', icon: <Lightbulb size={14} />, description: 'Personalized health tips' },
      { label: 'Talk to Doctor', route: '/doctor', icon: <Stethoscope size={14} />, description: 'Book a consultation' },
    ],
  },
  {
    id: 'scanner',
    label: 'Scanner',
    icon: <ScanLine size={15} />,
    items: [
      { label: 'Scan Medicine', route: '/scan/medicine', icon: <Camera size={14} />, description: 'Identify medicine instantly' },
      { label: 'Scan Prescription', route: '/scan/prescription', icon: <ClipboardList size={14} />, description: 'Extract prescription data' },
    ],
  },
  {
    id: 'upload',
    label: 'Upload',
    icon: <Upload size={15} />,
    items: [
      { label: 'Upload Medicine Image', route: '/upload/medicine', icon: <Camera size={14} />, description: 'Photo recognition' },
      { label: 'Upload Prescription', route: '/upload/prescription', icon: <FileText size={14} />, description: 'Digitize your prescription' },
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <Package size={15} />,
    items: [
      { label: 'Order History', route: '/orders', icon: <Package size={14} />, description: 'Track your recent orders' },
      { label: 'Your Cart', route: '/cart', icon: <ShoppingCart size={14} />, description: 'View items ready for checkout' },
    ],
  },
];

function DropdownMenu({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActiveSection = item.items.some((i) => location.pathname === i.route);

  const handleItemClick = (route: string) => {
    navigate(route);
    setOpen(false);
    onNavigate();
  };

  if (item.isEmergency) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all
            ${open || isActiveSection
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 animate-pulse-red'
            }`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
          <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className={`animate-fade-in-down absolute top-full mt-2 left-0 w-64 rounded-2xl shadow-2xl z-50 overflow-hidden neon-red ${isDark ? 'glass-red' : 'bg-white border border-red-200'}`}>
            <div className={`px-4 py-3 border-b ${isDark ? 'border-red-500/20' : 'border-red-200'}`}>
              <p className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-red-400' : 'text-red-600'}`}>⚠ Emergency Services</p>
            </div>
            {item.items.map((dropItem) => (
              <button
                key={dropItem.route}
                onClick={() => handleItemClick(dropItem.route)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition group ${isDark ? 'hover:bg-red-500/10' : 'hover:bg-red-50'} ${
                  location.pathname === dropItem.route ? (isDark ? 'bg-red-500/15 border-l-2 border-red-400' : 'bg-red-50 border-l-2 border-red-400') : ''
                }`}
              >
                <span className={`mt-0.5 flex-shrink-0 ${location.pathname === dropItem.route ? 'text-red-400' : (isDark ? 'text-red-500/60 group-hover:text-red-400' : 'text-red-300 group-hover:text-red-500')} transition`}>
                  {dropItem.icon}
                </span>
                <div>
                  <p className={`text-sm font-medium ${location.pathname === dropItem.route ? 'text-red-300' : (isDark ? 'text-slate-200' : 'text-gray-800')}`}>
                    {dropItem.label}
                  </p>
                  {dropItem.description && (
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{dropItem.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
          ${open || isActiveSection
            ? (isDark ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-blue-50 text-blue-700 border border-blue-200')
            : (isDark ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent')
          }`}
      >
        {item.icon}
        <span>{item.label}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className={`animate-fade-in-down absolute top-full mt-2 left-0 w-64 rounded-2xl shadow-2xl z-50 overflow-hidden ${isDark ? 'glass neon-blue' : 'bg-white border border-gray-200'}`}>
          <div className={`px-4 py-3 border-b ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
            <p className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{item.label}</p>
          </div>
          {item.items.map((dropItem) => (
            <button
              key={dropItem.route}
              onClick={() => handleItemClick(dropItem.route)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left transition group ${isDark ? 'hover:bg-blue-500/10' : 'hover:bg-blue-50'} ${
                location.pathname === dropItem.route ? (isDark ? 'bg-blue-500/15 border-l-2 border-blue-400' : 'bg-blue-50 border-l-2 border-blue-400') : ''
              }`}
            >
              <span className={`mt-0.5 flex-shrink-0 transition ${location.pathname === dropItem.route ? 'text-blue-400' : (isDark ? 'text-slate-500 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-500')}`}>
                {dropItem.icon}
              </span>
              <div>
                <p className={`text-sm font-medium ${location.pathname === dropItem.route ? (isDark ? 'text-blue-300' : 'text-blue-700') : (isDark ? 'text-slate-200' : 'text-gray-800')}`}>
                  {dropItem.label}
                </p>
                {dropItem.description && (
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{dropItem.description}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleMobileSection = (id: string) => {
    setMobileExpanded((prev) => (prev === id ? null : id));
  };

  const cartCount = getCartCount();

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? (isDark ? 'glass border-b border-white/8 shadow-xl' : 'bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg')
        : (isDark ? 'bg-[#080c14]/80 backdrop-blur-sm border-b border-white/5' : 'bg-white/80 backdrop-blur-sm border-b border-gray-100')
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 neon-blue transition-all group-hover:scale-105">
              <span className="text-white font-black text-sm">Rx</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-black text-lg tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                NearMy<span className="text-blue-400">Med</span>
              </span>
              <span className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>AI Healthcare Platform</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                location.pathname === '/'
                  ? (isDark ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200')
                  : (isDark ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border-transparent' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-transparent')
              }`}
            >
              <Home size={15} />
              Home
            </Link>
            {navItems.map((item) => (
              <DropdownMenu key={item.id} item={item} onNavigate={() => {}} />
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition ${isDark ? 'text-slate-400 hover:bg-white/8 hover:text-yellow-400' : 'text-gray-500 hover:bg-gray-100 hover:text-orange-500'}`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => navigate('/search/name')}
              className="hidden sm:flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-500 transition shadow-lg neon-blue"
            >
              <Zap size={14} />
              Get Started
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-xl transition ${isDark ? 'text-slate-400 hover:bg-white/8' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className={`lg:hidden max-h-[80vh] overflow-y-auto scrollbar-hide animate-fade-in-down border-t ${isDark ? 'glass border-white/5' : 'bg-white border-gray-200'}`}>
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                location.pathname === '/' ? (isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-50 text-blue-700') : (isDark ? 'text-slate-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              <Home size={16} />
              Home
            </Link>

            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => toggleMobileSection(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    item.isEmergency
                      ? 'text-red-400 hover:bg-red-500/10'
                      : (isDark ? 'text-slate-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100')
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${mobileExpanded === item.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileExpanded === item.id && (
                  <div className={`ml-4 mt-1 mb-2 rounded-xl overflow-hidden border ${item.isEmergency ? 'border-red-500/20' : (isDark ? 'border-white/8' : 'border-gray-200')}`}>
                    {item.items.map((dropItem) => (
                      <button
                        key={dropItem.route}
                        onClick={() => {
                          navigate(dropItem.route);
                          setMobileOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition
                          ${location.pathname === dropItem.route
                            ? item.isEmergency ? 'bg-red-500/15 text-red-300 font-medium' : (isDark ? 'bg-blue-500/15 text-blue-300 font-medium' : 'bg-blue-50 text-blue-700 font-medium')
                            : (isDark ? 'text-slate-500 hover:bg-white/5 hover:text-slate-300' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800')
                          }`}
                      >
                        <span className={item.isEmergency ? 'text-red-500/60' : (isDark ? 'text-slate-600' : 'text-gray-400')}>{dropItem.icon}</span>
                        {dropItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
