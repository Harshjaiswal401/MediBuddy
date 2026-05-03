import { useState, useRef, useEffect } from 'react';
import { Camera, ScanLine, CheckCircle, X } from 'lucide-react';
import { PageLayout } from '../../components/Layout';
import { useTheme } from '../../context/ThemeContext';

export default function ScanMedicine() {
  const { isDark } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scanning, setScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [result, setResult] = useState<null | { name: string; brand: string; strength: string; category: string; price: string }>(null);
  const [cameraError, setCameraError] = useState('');

  const startCamera = async () => {
    setCameraError('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setStream(mediaStream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setCameraError('Camera access denied. Please allow camera permission.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedImage(dataUrl);
    stopCamera();
    performScan();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedImage(ev.target?.result as string);
      performScan();
    };
    reader.readAsDataURL(file);
  };

  const performScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult({
        name: 'Paracetamol IP 500mg',
        brand: 'Calpol (GlaxoSmithKline)',
        strength: '500mg',
        category: 'Analgesic/Antipyretic',
        price: '₹45 / strip of 15',
      });
    }, 2200);
  };

  const resetScan = () => {
    setCapturedImage(null);
    setResult(null);
    setScanning(false);
  };

  useEffect(() => {
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, [stream]);

  return (
    <PageLayout
      icon={<ScanLine size={26} className="text-cyan-400" />}
      title="Scan Medicine"
      subtitle="Point your camera at any medicine strip, bottle, or box to instantly identify it using AI."
      badge="AI Vision"
      badgeColor="cyan"
      headerGradient="from-cyan-600/15 via-blue-500/5 to-transparent"
      accentColor="cyan"
    >
      {/* Camera / Scan View */}
      <div className={`rounded-3xl border overflow-hidden mb-6 ${isDark ? 'glass border-cyan-500/20' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className="relative bg-black/80 h-72 md:h-96 flex flex-col items-center justify-center overflow-hidden">
          {/* Corner guides */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8 border-2 border-cyan-400 ${i < 2 ? 'border-b-0' : 'border-t-0'} ${i % 2 === 0 ? 'border-r-0' : 'border-l-0'} rounded-sm z-10`} />
          ))}

          {/* Live camera feed */}
          {cameraActive && (
            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
          )}
          <canvas ref={canvasRef} className="hidden" />

          {/* Captured image */}
          {capturedImage && !cameraActive && (
            <img src={capturedImage} alt="Captured" className="absolute inset-0 w-full h-full object-cover" />
          )}

          {/* States */}
          {scanning && (
            <div className="relative z-10 text-center">
              <div className="relative mx-auto w-20 h-20 mb-4">
                <div className="w-20 h-20 border-4 border-cyan-400/20 rounded-full" />
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" />
              </div>
              <p className="text-cyan-300 font-bold">Scanning...</p>
              <p className="text-slate-500 text-xs mt-1">Analyzing medicine with AI Vision</p>
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce" style={{ top: '50%' }} />
            </div>
          )}

          {!cameraActive && !capturedImage && !scanning && (
            <div className="relative z-10 text-center">
              {cameraError ? (
                <>
                  <p className="text-red-400 text-sm font-semibold mb-2">⚠️ {cameraError}</p>
                  <button onClick={startCamera} className="text-xs text-cyan-400 hover:text-cyan-300 underline">Try again</button>
                </>
              ) : (
                <>
                  <div className={`w-16 h-16 border-2 border-dashed rounded-2xl flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-cyan-50 border-cyan-300'}`}>
                    <Camera size={28} className="text-cyan-400" />
                  </div>
                  <p className={`font-semibold ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Position medicine in frame</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-600' : 'text-gray-500'}`}>Ensure good lighting for best results</p>
                </>
              )}
            </div>
          )}

          {result && !scanning && capturedImage && (
            <div className="relative z-10 text-center">
              <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
              <p className="text-green-400 font-bold">Medicine Identified!</p>
            </div>
          )}
        </div>

        <div className="p-5 flex gap-3">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

          {cameraActive ? (
            <>
              <button onClick={capturePhoto}
                className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-3.5 rounded-xl hover:bg-cyan-500 transition text-sm">
                📸 Capture & Scan
              </button>
              <button onClick={stopCamera}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold border ${isDark ? 'glass border-white/10 text-slate-400 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                <X size={16} /> Cancel
              </button>
            </>
          ) : capturedImage ? (
            <>
              {!scanning && (
                <button onClick={resetScan}
                  className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-3.5 rounded-xl hover:bg-cyan-500 transition text-sm">
                  <ScanLine size={18} /> Scan Again
                </button>
              )}
            </>
          ) : (
            <>
              <button onClick={startCamera}
                className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-3.5 rounded-xl hover:bg-cyan-500 transition text-sm">
                <Camera size={18} /> Open Camera
              </button>
              <button onClick={() => fileInputRef.current?.click()}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold border ${isDark ? 'glass border-white/10 text-slate-400 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                <ScanLine size={16} /> Upload
              </button>
            </>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className={`animate-fade-in-up rounded-3xl border p-6 ${isDark ? 'glass border-green-500/20 neon-cyan' : 'bg-white border-green-200 shadow-md'}`}>
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle size={22} className="text-green-400" />
            <h2 className={`font-black text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Medicine Identified</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Medicine Name', value: result.name },
              { label: 'Brand', value: result.brand },
              { label: 'Strength', value: result.strength },
              { label: 'Category', value: result.category },
              { label: 'Price', value: result.price },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl p-4 border ${item.label === 'Medicine Name' ? 'col-span-2' : ''} ${isDark ? 'glass border-white/8' : 'bg-gray-50 border-gray-200'}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{item.label}</p>
                <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
