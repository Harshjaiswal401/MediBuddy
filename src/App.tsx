import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { OrderHistoryProvider } from './context/OrderHistoryContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AIWidget from './components/AIWidget';
import SearchByName from './pages/search/SearchByName';
import SearchBySalt from './pages/search/SearchBySalt';
import SearchByDisease from './pages/search/SearchByDisease';
import CheapAlternatives from './pages/alternatives/CheapAlternatives';
import BrandAlternatives from './pages/alternatives/BrandAlternatives';
import SafeAlternatives from './pages/alternatives/SafeAlternatives';
import PharmacyDirections from './pages/pharmacy/PharmacyDirections';
import PharmacyCall from './pages/pharmacy/PharmacyCall';
import PharmacyAvailability from './pages/pharmacy/PharmacyAvailability';
import EmergencyPharmacy from './pages/emergency/EmergencyPharmacy';
import EmergencyHospital from './pages/emergency/EmergencyHospital';
import EmergencyMedicines from './pages/emergency/EmergencyMedicines';
import EmergencyAmbulance from './pages/emergency/EmergencyAmbulance';
import AskMedicine from './pages/ai/AskMedicine';
import SymptomsCheck from './pages/ai/SymptomsCheck';
import HealthAdvice from './pages/ai/HealthAdvice';
import ScanMedicine from './pages/scanner/ScanMedicine';
import ScanPrescription from './pages/scanner/ScanPrescription';
import UploadMedicine from './pages/upload/UploadMedicine';
import UploadPrescription from './pages/upload/UploadPrescription';
import MedicineDetailPage from './pages/medicine/MedicineDetailPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/cart/CheckoutPage';
import PreBookingPage from './pages/prebooking/PreBookingPage';
import TalkToDoctor from './pages/doctor/TalkToDoctor';
import OrderHistoryPage from './pages/orders/OrderHistoryPage';
import OrderMorePage from './pages/orders/OrderMorePage';
import EmergencyFab from './components/EmergencyFab';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${isDark ? 'bg-[#080c14]' : 'bg-gray-50'}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search/name" element={<SearchByName />} />
        <Route path="/search/salt" element={<SearchBySalt />} />
        <Route path="/search/disease" element={<SearchByDisease />} />
        <Route path="/alternatives/cheap" element={<CheapAlternatives />} />
        <Route path="/alternatives/brand" element={<BrandAlternatives />} />
        <Route path="/alternatives/safe" element={<SafeAlternatives />} />
        <Route path="/pharmacy/directions" element={<PharmacyDirections />} />
        <Route path="/pharmacy/call" element={<PharmacyCall />} />
        <Route path="/pharmacy/availability" element={<PharmacyAvailability />} />
        <Route path="/emergency/pharmacy" element={<EmergencyPharmacy />} />
        <Route path="/emergency/hospital" element={<EmergencyHospital />} />
        <Route path="/emergency/medicines" element={<EmergencyMedicines />} />
        <Route path="/emergency/ambulance" element={<EmergencyAmbulance />} />
        <Route path="/ai/medicine" element={<AskMedicine />} />
        <Route path="/ai/symptoms" element={<SymptomsCheck />} />
        <Route path="/ai/advice" element={<HealthAdvice />} />
        <Route path="/scan/medicine" element={<ScanMedicine />} />
        <Route path="/scan/prescription" element={<ScanPrescription />} />
        <Route path="/upload/medicine" element={<UploadMedicine />} />
        <Route path="/upload/prescription" element={<UploadPrescription />} />
        {/* New Routes */}
        <Route path="/medicine/:id" element={<MedicineDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/prebooking" element={<PreBookingPage />} />
        <Route path="/doctor" element={<TalkToDoctor />} />
        {/* Order History & More */}
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/order/:orderId/more" element={<OrderMorePage />} />
        
        {/* Medication Adherence System Routes */}
      </Routes>
      <EmergencyFab />
      <AIWidget />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <OrderHistoryProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </OrderHistoryProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
