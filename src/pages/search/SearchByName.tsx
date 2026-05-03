import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, TrendingUp, Filter, ShoppingCart, CheckCircle } from 'lucide-react';
import { PageLayout, SearchBar, EmptyResultCard } from '../../components/Layout';
import { medicineDatabase, searchMedicines } from '../../data/medicineData';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export default function SearchByName() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(medicineDatabase);
  const [searched, setSearched] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { isDark } = useTheme();

  const handleSearch = (val: string) => {
    setQuery(val);
    setSearched(true);
    if (!val.trim()) { setResults(medicineDatabase); return; }
    setResults(searchMedicines(val));
  };

  const handleAddToCart = (med: typeof medicineDatabase[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id: med.id, name: med.name, brand: med.brand, price: med.price, priceDisplay: med.priceDisplay, type: med.type });
    setAddedId(med.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <PageLayout
      icon={<Search size={26} className="text-blue-400" />}
      title="Search Medicine by Name"
      subtitle="Find medicines by brand name or generic name. Get real-time stock info, pricing, and detailed information."
      badge="Search Engine"
      badgeColor="blue"
      accentColor="blue"
    >
      {/* Search */}
      <div className="mb-8">
        <SearchBar
          placeholder="Enter medicine name (e.g. Paracetamol, Calpol, Metformin...)"
          onSearch={handleSearch}
          buttonLabel="Search"
          accent="blue"
        />
      </div>

      {/* Popular Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['Paracetamol', 'Omeprazole', 'Metformin', 'Azithromycin', 'Cetirizine', 'Amoxicillin', 'Vitamin D3', 'Dolo 650'].map((tag) => (
          <button
            key={tag}
            onClick={() => handleSearch(tag)}
            className={`text-xs px-4 py-2 rounded-full border transition ${isDark ? 'glass border-white/10 text-slate-400 hover:text-blue-300 hover:border-blue-500/30' : 'bg-white border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {searched ? `${results.length} Result${results.length !== 1 ? 's' : ''} Found` : `All Medicines (${results.length})`}
          </h2>
          <button className={`flex items-center gap-2 text-xs border px-3 py-2 rounded-xl transition ${isDark ? 'text-slate-400 glass border-white/8 hover:text-white' : 'text-gray-500 bg-white border-gray-200 hover:text-gray-900'}`}>
            <Filter size={13} /> Filter
          </button>
        </div>

        {results.length === 0 ? (
          <EmptyResultCard icon="🔍" text="No medicines found. Try a different name." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((med) => (
              <div
                key={med.id}
                onClick={() => navigate(`/medicine/${med.id}`)}
                className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 group cursor-pointer ${isDark ? 'glass border-white/8 hover:bg-white/5 hover:border-blue-500/25' : 'bg-white border-gray-200 hover:shadow-lg hover:border-blue-300'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                    💊
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${isDark ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-green-600 bg-green-50 border border-green-200'}`}>
                      <TrendingUp size={10} /> {med.trend}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      med.inStock
                        ? (isDark ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-green-600 bg-green-50 border border-green-200')
                        : (isDark ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 'text-red-600 bg-red-50 border border-red-200')
                    }`}>
                      {med.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                <h3 className={`font-bold text-sm mb-1 transition ${isDark ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>{med.name}</h3>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{med.brand} · {med.category}</p>
                <p className={`text-xs mt-2 leading-relaxed line-clamp-2 ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>{med.description}</p>
                <div className={`flex items-center justify-between mt-4 pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                  <span className={`font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{med.priceDisplay}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                      <Star size={11} className="text-yellow-400 fill-yellow-400" /> {med.rating}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(med, e)}
                      disabled={!med.inStock}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        addedId === med.id
                          ? 'bg-green-600 text-white'
                          : !med.inStock
                            ? (isDark ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed')
                            : isInCart(med.id)
                              ? (isDark ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-blue-50 text-blue-600 border border-blue-200')
                              : (isDark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-500')
                      }`}
                    >
                      {addedId === med.id ? <><CheckCircle size={12} /> Added!</> :
                       isInCart(med.id) ? <><ShoppingCart size={12} /> In Cart</> :
                       <><ShoppingCart size={12} /> Add</>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
