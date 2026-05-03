import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle,
  ChevronRight, Trash2, ShoppingCart, RotateCcw, Filter,
  Calendar, CreditCard, MapPin,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useOrderHistory, type Order } from '../../context/OrderHistoryContext';

const statusConfig: Record<Order['status'], { label: string; color: string; darkColor: string; icon: React.ReactNode; bg: string; darkBg: string }> = {
  confirmed: { label: 'Confirmed', color: 'text-blue-600', darkColor: 'text-blue-400', icon: <CheckCircle size={14} />, bg: 'bg-blue-50 border-blue-200', darkBg: 'bg-blue-500/10 border-blue-500/30' },
  processing: { label: 'Processing', color: 'text-amber-600', darkColor: 'text-amber-400', icon: <Clock size={14} />, bg: 'bg-amber-50 border-amber-200', darkBg: 'bg-amber-500/10 border-amber-500/30' },
  shipped: { label: 'Shipped', color: 'text-violet-600', darkColor: 'text-violet-400', icon: <Truck size={14} />, bg: 'bg-violet-50 border-violet-200', darkBg: 'bg-violet-500/10 border-violet-500/30' },
  delivered: { label: 'Delivered', color: 'text-green-600', darkColor: 'text-green-400', icon: <CheckCircle size={14} />, bg: 'bg-green-50 border-green-200', darkBg: 'bg-green-500/10 border-green-500/30' },
  cancelled: { label: 'Cancelled', color: 'text-red-600', darkColor: 'text-red-400', icon: <XCircle size={14} />, bg: 'bg-red-50 border-red-200', darkBg: 'bg-red-500/10 border-red-500/30' },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function getRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

export default function OrderHistoryPage() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { orders, cancelOrder, clearHistory } = useOrderHistory();
  const [filter, setFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filters = [
    { value: 'all', label: 'All Orders' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  // Empty State
  if (orders.length === 0) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#080c14]' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center animate-fade-in-up max-w-md mx-auto px-4">
          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 ${isDark ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-violet-50 border border-violet-200'}`}>
            <Package size={40} className={isDark ? 'text-violet-400' : 'text-violet-500'} />
          </div>
          <h2 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No Orders Yet</h2>
          <p className={`text-sm mb-8 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Your order history will appear here once you place an order</p>
          <button onClick={() => navigate('/search/name')}
            className="bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-500 transition shadow-lg neon-blue text-sm">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#080c14] bg-dark-grid' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'bg-gradient-to-b from-violet-600/12 via-purple-500/5 to-transparent border-white/5' : 'bg-gradient-to-b from-violet-50 to-white border-gray-200'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <button onClick={() => navigate(-1)} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${isDark ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-violet-50 border border-violet-200'}`}>
                <Package size={26} className={isDark ? 'text-violet-400' : 'text-violet-500'} />
              </div>
              <div>
                <h1 className={`text-2xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Order History</h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
              </div>
            </div>
            {orders.length > 0 && (
              <button onClick={clearHistory}
                className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition border ${isDark ? 'border-red-500/20 text-red-400 hover:bg-red-500/10' : 'border-red-200 text-red-500 hover:bg-red-50'}`}>
                <Trash2 size={13} /> Clear History
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
          <Filter size={14} className={isDark ? 'text-slate-500' : 'text-gray-400'} />
          {filters.map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`text-xs px-4 py-2 rounded-full font-semibold transition border whitespace-nowrap ${filter === f.value
                ? (isDark ? 'bg-violet-500/20 text-violet-300 border-violet-500/30' : 'bg-violet-500 text-white border-violet-500')
                : (isDark ? 'text-slate-400 border-white/10 hover:border-white/20' : 'text-gray-600 border-gray-200 hover:border-gray-300')
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>No orders found for this filter</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order, idx) => {
              const sc = statusConfig[order.status];
              const isExpanded = expandedId === order.id;
              return (
                <div key={order.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isDark ? 'glass border-white/8 hover:border-violet-500/25' : 'bg-white border-gray-200 hover:shadow-lg'}`}
                  style={{ animationDelay: `${idx * 60}ms` }}>
                  {/* Order Header */}
                  <button onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="w-full p-5 text-left">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-violet-50 border border-violet-200'}`}>
                          <Package size={22} className={isDark ? 'text-violet-400' : 'text-violet-500'} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.id}</p>
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${isDark ? sc.darkBg + ' ' + sc.darkColor : sc.bg + ' ' + sc.color}`}>
                              {sc.icon} {sc.label}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                            {getRelativeTime(order.createdAt)} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-lg font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>₹{order.total}</span>
                        <ChevronRight size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''} ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className={`border-t px-5 pb-5 animate-fade-in ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                      {/* Timeline */}
                      <div className={`flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide`}>
                        {['confirmed', 'processing', 'shipped', 'delivered'].map((step, i) => {
                          const reached = ['confirmed', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= i;
                          const isCancelled = order.status === 'cancelled';
                          return (
                            <div key={step} className="flex items-center gap-2 flex-shrink-0">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                isCancelled ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : reached ? (isDark ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'bg-violet-500 text-white border-violet-400')
                                : (isDark ? 'bg-white/5 text-slate-600 border border-white/10' : 'bg-gray-100 text-gray-400 border border-gray-200')
                              }`}>
                                {i + 1}
                              </div>
                              <span className={`text-xs capitalize ${reached && !isCancelled ? (isDark ? 'text-violet-300' : 'text-violet-600') : (isDark ? 'text-slate-600' : 'text-gray-400')}`}>{step}</span>
                              {i < 3 && <div className={`w-8 h-0.5 ${reached && !isCancelled ? (isDark ? 'bg-violet-500/30' : 'bg-violet-200') : (isDark ? 'bg-white/5' : 'bg-gray-200')}`} />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Items */}
                      <div className={`rounded-xl border p-4 mb-4 ${isDark ? 'border-white/5 bg-white/2' : 'border-gray-100 bg-gray-50'}`}>
                        <h4 className={`text-xs font-bold mb-3 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>📦 ITEMS</h4>
                        {order.items.map(item => (
                          <div key={item.id} className={`flex justify-between py-2 text-sm border-b last:border-0 ${isDark ? 'border-white/5 text-slate-300' : 'border-gray-100 text-gray-700'}`}>
                            <span className="flex items-center gap-2">
                              <span className="text-lg">💊</span>
                              {item.name} <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>× {item.quantity}</span>
                            </span>
                            <span className="font-bold">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div className={`rounded-xl p-3 border ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                          <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                            <Calendar size={12} /> <span className="text-xs font-bold">DATE</span>
                          </div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatDate(order.createdAt)}</p>
                          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{formatTime(order.createdAt)}</p>
                        </div>
                        <div className={`rounded-xl p-3 border ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                          <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                            <CreditCard size={12} /> <span className="text-xs font-bold">PAYMENT</span>
                          </div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'upi' ? 'UPI Payment' : 'Card Payment'}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>₹{order.total}</p>
                        </div>
                        <div className={`rounded-xl p-3 border ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                          <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                            <MapPin size={12} /> <span className="text-xs font-bold">DELIVERY</span>
                          </div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.deliveryAddress.fullName}</p>
                          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => navigate(`/order/${order.id}/more`)}
                          className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition border ${isDark ? 'bg-violet-500/10 border-violet-500/20 text-violet-300 hover:bg-violet-500/20' : 'bg-violet-50 border-violet-200 text-violet-600 hover:bg-violet-100'}`}>
                          <ChevronRight size={12} /> More Options
                        </button>
                        {order.status === 'confirmed' && (
                          <button onClick={() => cancelOrder(order.id)}
                            className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition border ${isDark ? 'border-red-500/20 text-red-400 hover:bg-red-500/10' : 'border-red-200 text-red-500 hover:bg-red-50'}`}>
                            <XCircle size={12} /> Cancel Order
                          </button>
                        )}
                        <button onClick={() => navigate('/search/name')}
                          className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition border ${isDark ? 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                          <RotateCcw size={12} /> Reorder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
