import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, MessageSquare, RotateCcw, Download, MapPin, Star,
  Phone, Clock, Send, Package, Stethoscope, FileText, Shield,
  HelpCircle, ChevronRight, CheckCircle, XCircle, Share2,
  Bell, Heart,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useOrderHistory } from '../../context/OrderHistoryContext';
import { useCart } from '../../context/CartContext';

export default function OrderMorePage() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder, cancelOrder } = useOrderHistory();
  const { addToCart } = useCart();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; from: 'user' | 'doctor'; time: string }[]>([
    { text: 'Hello! I have a question about my prescribed medicines.', from: 'user', time: '10:30 AM' },
    { text: 'Hi! I\'m Dr. Sharma. Sure, I\'d be happy to help. What would you like to know about your medicines?', from: 'doctor', time: '10:32 AM' },
    { text: 'Can I take Dolo 650 with Azithromycin together?', from: 'user', time: '10:33 AM' },
    { text: 'Yes, you can take them together. Dolo 650 (Paracetamol) and Azithromycin don\'t have any harmful interactions. However, maintain at least a 30-minute gap between the two for better absorption.', from: 'doctor', time: '10:35 AM' },
  ]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const order = orderId ? getOrder(orderId) : undefined;

  if (!order) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#080c14]' : 'bg-gray-50'}`}>
        <div className="text-center animate-fade-in-up">
          <Package size={48} className={isDark ? 'text-slate-600 mx-auto mb-4' : 'text-gray-300 mx-auto mb-4'} />
          <h2 className={`text-xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Order Not Found</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>This order doesn't exist or has been removed</p>
          <button onClick={() => navigate('/orders')} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-500 transition text-sm">
            View All Orders
          </button>
        </div>
      </div>
    );
  }

  const sendMessage = () => {
    if (!message.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { text: message, from: 'user', time }]);
    setMessage('');
    // Simulated doctor reply
    setTimeout(() => {
      const replies = [
        'Thank you for your message. Let me review your order details and get back to you shortly.',
        'I understand your concern. Please make sure to follow the prescribed dosage carefully.',
        'That\'s a great question. I\'d recommend taking the medicine 30 minutes after meals for best results.',
        'If you experience any side effects, please don\'t hesitate to reach out. I\'m here to help!',
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      setMessages(p => [...p, { text: reply, from: 'doctor', time: replyTime }]);
    }, 1500);
  };

  const handleReorder = () => {
    order.items.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        priceDisplay: item.priceDisplay,
        type: item.type,
      });
    });
    navigate('/cart');
  };

  const handleSubmitReview = () => {
    if (rating > 0) {
      setReviewSubmitted(true);
    }
  };

  const handleCancelOrder = () => {
    cancelOrder(order.id);
    setShowCancel(false);
    navigate('/orders');
  };

  const moreOptions = [
    {
      id: 'message-doctor',
      icon: <MessageSquare size={20} />,
      title: 'Message Doctor',
      description: 'Chat with the doctor about your medicines anytime',
      color: isDark ? 'text-green-400' : 'text-green-500',
      bgColor: isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200',
    },
    {
      id: 'reorder',
      icon: <RotateCcw size={20} />,
      title: 'Reorder',
      description: 'Add the same items to your cart again',
      color: isDark ? 'text-blue-400' : 'text-blue-500',
      bgColor: isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200',
    },
    {
      id: 'track-order',
      icon: <MapPin size={20} />,
      title: 'Track Order',
      description: 'Live tracking of your delivery',
      color: isDark ? 'text-violet-400' : 'text-violet-500',
      bgColor: isDark ? 'bg-violet-500/10 border-violet-500/20' : 'bg-violet-50 border-violet-200',
    },
    {
      id: 'download-invoice',
      icon: <Download size={20} />,
      title: 'Download Invoice',
      description: 'Get a PDF copy of your invoice',
      color: isDark ? 'text-amber-400' : 'text-amber-500',
      bgColor: isDark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200',
    },
    {
      id: 'rate-review',
      icon: <Star size={20} />,
      title: 'Rate & Review',
      description: 'Share your experience with this order',
      color: isDark ? 'text-yellow-400' : 'text-yellow-500',
      bgColor: isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200',
    },
    {
      id: 'prescription',
      icon: <FileText size={20} />,
      title: 'View Prescription',
      description: 'See the prescription linked to this order',
      color: isDark ? 'text-cyan-400' : 'text-cyan-500',
      bgColor: isDark ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-cyan-50 border-cyan-200',
    },
    {
      id: 'help',
      icon: <HelpCircle size={20} />,
      title: 'Need Help?',
      description: 'Contact support or report an issue',
      color: isDark ? 'text-orange-400' : 'text-orange-500',
      bgColor: isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200',
    },
    {
      id: 'share',
      icon: <Share2 size={20} />,
      title: 'Share Order',
      description: 'Share order details with family or caregiver',
      color: isDark ? 'text-pink-400' : 'text-pink-500',
      bgColor: isDark ? 'bg-pink-500/10 border-pink-500/20' : 'bg-pink-50 border-pink-200',
    },
  ];

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition ${isDark ? 'glass border border-white/10 text-white placeholder-slate-500 focus:ring-blue-500/40' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500/30'}`;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#080c14] bg-dark-grid' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'bg-gradient-to-b from-violet-600/12 via-purple-500/5 to-transparent border-white/5' : 'bg-gradient-to-b from-violet-50 to-white border-gray-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => navigate('/orders')} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            <ArrowLeft size={16} /> Back to Orders
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Order Options</h1>
              <p className={`text-sm mt-1 flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${isDark ? 'bg-violet-500/15 text-violet-300' : 'bg-violet-100 text-violet-600'}`}>{order.id}</span>
                · {order.items.length} item{order.items.length !== 1 ? 's' : ''} · ₹{order.total}
              </p>
            </div>
            {order.status === 'confirmed' && (
              <button onClick={() => setShowCancel(true)}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition border ${isDark ? 'border-red-500/20 text-red-400 hover:bg-red-500/10' : 'border-red-200 text-red-500 hover:bg-red-50'}`}>
                <XCircle size={13} /> Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cancel Confirmation Modal */}
        {showCancel && (
          <div className={`rounded-2xl border p-6 mb-6 animate-fade-in ${isDark ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
            <h3 className={`font-bold text-sm mb-2 ${isDark ? 'text-red-300' : 'text-red-700'}`}>⚠ Cancel this order?</h3>
            <p className={`text-xs mb-4 ${isDark ? 'text-red-400/70' : 'text-red-600/70'}`}>This action cannot be undone. Your order will be cancelled immediately.</p>
            <div className="flex gap-2">
              <button onClick={handleCancelOrder} className="bg-red-600 text-white font-bold px-5 py-2 rounded-xl text-xs hover:bg-red-500 transition">Yes, Cancel</button>
              <button onClick={() => setShowCancel(false)} className={`font-bold px-5 py-2 rounded-xl text-xs transition border ${isDark ? 'border-white/10 text-slate-400 hover:text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}>Keep Order</button>
            </div>
          </div>
        )}

        {/* Options Grid */}
        {!activeSection && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in-up">
            {moreOptions.map((opt, idx) => (
              <button key={opt.id}
                onClick={() => {
                  if (opt.id === 'reorder') handleReorder();
                  else setActiveSection(opt.id);
                }}
                className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 group ${isDark ? 'glass border-white/8 hover:border-violet-500/25 hover:bg-white/3' : 'bg-white border-gray-200 hover:shadow-lg hover:border-violet-300'}`}
                style={{ animationDelay: `${idx * 50}ms` }}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${opt.bgColor}`}>
                  <span className={opt.color}>{opt.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{opt.title}</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{opt.description}</p>
                </div>
                <ChevronRight size={16} className={`mt-1 transition-transform group-hover:translate-x-1 ${isDark ? 'text-slate-600' : 'text-gray-300'}`} />
              </button>
            ))}
          </div>
        )}

        {/* ── MESSAGE DOCTOR ── */}
        {activeSection === 'message-doctor' && (
          <div className="animate-fade-in-up">
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <ArrowLeft size={16} /> Back to Options
            </button>
            <div className={`rounded-2xl border overflow-hidden ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
              {/* Chat Header */}
              <div className={`p-4 border-b flex items-center gap-3 ${isDark ? 'border-white/5 bg-green-500/5' : 'border-gray-100 bg-green-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-100 border border-green-200'}`}>
                  <Stethoscope size={18} className={isDark ? 'text-green-400' : 'text-green-500'} />
                </div>
                <div className="flex-1">
                  <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Dr. Priya Sharma</p>
                  <p className={`text-xs flex items-center gap-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
                  </p>
                </div>
                <button className={`p-2 rounded-xl transition ${isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <Phone size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className={`p-4 h-80 overflow-y-auto space-y-3 ${isDark ? 'bg-[#080c14]/50' : 'bg-gray-50'}`}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${msg.from === 'user'
                      ? (isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (isDark ? 'glass border border-white/10 text-slate-200' : 'bg-white border border-gray-200 text-gray-800')
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.from === 'user' ? 'text-blue-200' : (isDark ? 'text-slate-500' : 'text-gray-400')}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className={`p-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                <div className="flex gap-2">
                  <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className={inputClass}
                  />
                  <button onClick={sendMessage}
                    className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-500 transition flex-shrink-0">
                    <Send size={16} />
                  </button>
                </div>
                <p className={`text-xs mt-2 flex items-center gap-1 ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>
                  <Shield size={10} /> Messages are encrypted & confidential
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── TRACK ORDER ── */}
        {activeSection === 'track-order' && (
          <div className="animate-fade-in-up">
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <ArrowLeft size={16} /> Back to Options
            </button>
            <div className={`rounded-2xl border p-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
              <h3 className={`font-black text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>📍 Live Order Tracking</h3>
              <div className="space-y-0">
                {[
                  { step: 'Order Placed', desc: 'Your order has been confirmed', time: new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), done: true },
                  { step: 'Processing', desc: 'Pharmacy is preparing your order', time: '', done: ['processing', 'shipped', 'delivered'].includes(order.status) },
                  { step: 'Out for Delivery', desc: 'Your order is on the way', time: '', done: ['shipped', 'delivered'].includes(order.status) },
                  { step: 'Delivered', desc: 'Order delivered successfully', time: '', done: order.status === 'delivered' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.done
                        ? (isDark ? 'bg-green-500/20 border-2 border-green-400' : 'bg-green-100 border-2 border-green-400')
                        : (isDark ? 'bg-white/5 border-2 border-white/10' : 'bg-gray-100 border-2 border-gray-200')
                      }`}>
                        {s.done ? <CheckCircle size={14} className="text-green-400" /> : <Clock size={14} className={isDark ? 'text-slate-600' : 'text-gray-400'} />}
                      </div>
                      {i < 3 && <div className={`w-0.5 h-12 ${s.done ? (isDark ? 'bg-green-500/30' : 'bg-green-200') : (isDark ? 'bg-white/5' : 'bg-gray-200')}`} />}
                    </div>
                    <div className="pb-8">
                      <p className={`font-bold text-sm ${s.done ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-slate-500' : 'text-gray-400')}`}>{s.step}</p>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{s.desc}</p>
                      {s.time && <p className={`text-xs mt-1 font-medium ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>{s.time}</p>}
                    </div>
                  </div>
                ))}
              </div>
              {order.status === 'cancelled' && (
                <div className={`rounded-xl p-4 ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`text-sm font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>❌ This order was cancelled</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── DOWNLOAD INVOICE ── */}
        {activeSection === 'download-invoice' && (
          <div className="animate-fade-in-up">
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <ArrowLeft size={16} /> Back to Options
            </button>
            <div className={`rounded-2xl border p-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
              <h3 className={`font-black text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>🧾 Invoice</h3>
              <div className={`rounded-xl border p-5 mb-4 ${isDark ? 'border-white/5 bg-white/2' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className={`text-xs font-bold ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>INVOICE TO</p>
                    <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.deliveryAddress.fullName}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{order.deliveryAddress.address1}, {order.deliveryAddress.city}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>ORDER</p>
                    <p className={`font-bold text-sm ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>{order.id}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
                <div className={`border-t pt-3 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
                  {order.items.map(item => (
                    <div key={item.id} className={`flex justify-between py-2 text-sm border-b last:border-0 ${isDark ? 'border-white/5 text-slate-300' : 'border-gray-100 text-gray-700'}`}>
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className={`border-t pt-2 mt-2 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <div className={`flex justify-between text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      <span>Subtotal</span><span>₹{order.subtotal}</span>
                    </div>
                    <div className={`flex justify-between text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      <span>Delivery</span><span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
                    </div>
                    <div className={`flex justify-between font-black text-lg mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <span>Total</span><span className={isDark ? 'text-blue-400' : 'text-blue-600'}>₹{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white font-bold py-3 rounded-xl hover:bg-violet-500 transition text-sm">
                <Download size={16} /> Download as PDF
              </button>
            </div>
          </div>
        )}

        {/* ── RATE & REVIEW ── */}
        {activeSection === 'rate-review' && (
          <div className="animate-fade-in-up">
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <ArrowLeft size={16} /> Back to Options
            </button>
            <div className={`rounded-2xl border p-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
              {reviewSubmitted ? (
                <div className="text-center py-8 animate-fade-in-up">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-green-500/20 border-2 border-green-400/40' : 'bg-green-100 border-2 border-green-300'}`}>
                    <Heart size={36} className="text-green-400 fill-green-400" />
                  </div>
                  <h3 className={`text-xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Thank You! 💖</h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Your review helps us improve our service</p>
                </div>
              ) : (
                <>
                  <h3 className={`font-black text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>⭐ Rate Your Experience</h3>
                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} onClick={() => setRating(star)}
                        className="transition-transform hover:scale-125">
                        <Star size={36} className={`transition ${star <= rating ? 'text-yellow-400 fill-yellow-400' : (isDark ? 'text-slate-600' : 'text-gray-300')}`} />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className={`text-center text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      {rating === 1 ? '😔 Poor' : rating === 2 ? '😐 Fair' : rating === 3 ? '🙂 Good' : rating === 4 ? '😊 Very Good' : '🤩 Excellent!'}
                    </p>
                  )}
                  <textarea value={review} onChange={e => setReview(e.target.value)}
                    placeholder="Share your experience (optional)..."
                    className={inputClass} rows={4} />
                  <button onClick={handleSubmitReview}
                    disabled={rating === 0}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm mt-4 transition ${
                      rating === 0 ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-yellow-500 text-black hover:bg-yellow-400'
                    }`}>
                    <Star size={16} /> Submit Review
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── VIEW PRESCRIPTION ── */}
        {activeSection === 'prescription' && (
          <div className="animate-fade-in-up">
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <ArrowLeft size={16} /> Back to Options
            </button>
            <div className={`rounded-2xl border p-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
              <h3 className={`font-black text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>📋 Prescription</h3>
              <div className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>💡 Prescription is available if you uploaded one while ordering. For OTC medicines, no prescription is required.</p>
              </div>
              <div className={`rounded-xl border-2 border-dashed p-12 text-center ${isDark ? 'border-white/10' : 'border-gray-300'}`}>
                <FileText size={48} className={`mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-gray-300'}`} />
                <p className={`text-sm font-bold mb-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>No prescription attached</p>
                <p className={`text-xs ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>Upload a prescription for future orders</p>
              </div>
            </div>
          </div>
        )}

        {/* ── HELP ── */}
        {activeSection === 'help' && (
          <div className="animate-fade-in-up">
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <ArrowLeft size={16} /> Back to Options
            </button>
            <div className={`rounded-2xl border p-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
              <h3 className={`font-black text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>🆘 Help & Support</h3>
              <div className="space-y-3">
                {[
                  { icon: <Phone size={16} />, title: 'Call Support', desc: '24/7 customer support hotline', action: '1800-XXX-XXXX' },
                  { icon: <MessageSquare size={16} />, title: 'Live Chat', desc: 'Chat with our support team', action: 'Start Chat' },
                  { icon: <Bell size={16} />, title: 'Report Issue', desc: 'Report a problem with your order', action: 'Report' },
                  { icon: <RotateCcw size={16} />, title: 'Request Refund', desc: 'Initiate a return or refund', action: 'Request' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border transition ${isDark ? 'border-white/5 hover:bg-white/3' : 'border-gray-100 hover:bg-gray-50'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-500'}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                      <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{item.desc}</p>
                    </div>
                    <button className={`text-xs font-bold px-4 py-2 rounded-lg transition ${isDark ? 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}>
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SHARE ── */}
        {activeSection === 'share' && (
          <div className="animate-fade-in-up">
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 text-sm mb-4 transition ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <ArrowLeft size={16} /> Back to Options
            </button>
            <div className={`rounded-2xl border p-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-md'}`}>
              <h3 className={`font-black text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>📤 Share Order Details</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Share your order details with a family member or caregiver so they can help track your medicines.</p>
              <div className={`rounded-xl border p-4 mb-6 ${isDark ? 'border-white/5 bg-white/2' : 'border-gray-100 bg-gray-50'}`}>
                <p className={`text-xs font-bold mb-2 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>ORDER SUMMARY</p>
                <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.id} · ₹{order.total}</p>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{order.items.map(i => i.name).join(', ')}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'WhatsApp', emoji: '📱', color: 'bg-green-600 hover:bg-green-500' },
                  { label: 'SMS', emoji: '💬', color: 'bg-blue-600 hover:bg-blue-500' },
                  { label: 'Email', emoji: '📧', color: 'bg-violet-600 hover:bg-violet-500' },
                  { label: 'Copy Link', emoji: '🔗', color: isDark ? 'glass border border-white/10 hover:bg-white/5' : 'bg-gray-100 hover:bg-gray-200' },
                ].map((btn, i) => (
                  <button key={i}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition ${btn.color} ${i < 3 ? 'text-white' : (isDark ? 'text-slate-300' : 'text-gray-700')}`}>
                    <span>{btn.emoji}</span> {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
