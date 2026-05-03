import { useState, useRef, useEffect } from 'react';
import { ClipboardList, Camera, Upload, CheckCircle, X, File } from 'lucide-react';
import { PageLayout } from '../../components/Layout';
import { useTheme } from '../../context/ThemeContext';

export default function ScanPrescription() {
  const { isDark } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
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
    simulateUpload();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedImage(ev.target?.result as string);
      simulateUpload();
    };
    reader.readAsDataURL(file);
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    setUploaded(false);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          setUploaded(true);
        }, 300);
      }
      setUploadProgress(Math.min(progress, 100));
    }, 200);
  };

  const resetAll = () => {
    setCapturedImage(null);
    setUploading(false);
    setUploadProgress(0);
    setUploaded(false);
  };

  useEffect(() => {
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, [stream]);

  return (
    <PageLayout
      icon={<ClipboardList size={26} className="text-blue-400" />}
      title="Scan Prescription"
      subtitle="Use AI OCR to digitize your doctor's prescription and extract medicine details automatically."
      badge="OCR Powered"
      badgeColor="blue"
    >
      <div className={`rounded-3xl border p-8 md:p-12 text-center ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>

        {/* Camera / captured view */}
        {cameraActive && (
          <div className="relative rounded-2xl overflow-hidden mb-6 bg-black" style={{ height: '300px' }}>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            {/* Corner guides */}
            {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-6 h-6 border-2 border-blue-400 ${i < 2 ? 'border-b-0' : 'border-t-0'} ${i % 2 === 0 ? 'border-r-0' : 'border-l-0'} rounded-sm`} />
            ))}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />

        {capturedImage && !cameraActive && (
          <div className="relative mb-6">
            <img src={capturedImage} alt="Captured" className="max-h-64 mx-auto rounded-2xl border border-blue-500/30" />
            <button onClick={resetAll} className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80 transition">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Upload progress */}
        {(uploading || uploaded) && (
          <div className="max-w-sm mx-auto mb-6">
            <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
              <div
                className={`h-full rounded-full transition-all duration-300 ${uploaded ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className={`text-xs mt-2 font-semibold ${uploaded ? 'text-green-400' : isDark ? 'text-blue-300' : 'text-blue-600'}`}>
              {uploaded ? '✅ Prescription scanned successfully! Extracting medicines...' : `Processing... ${Math.round(uploadProgress)}%`}
            </p>
          </div>
        )}

        {/* Default state */}
        {!cameraActive && !capturedImage && (
          <>
            <div className={`w-24 h-24 border-2 border-dashed rounded-3xl flex items-center justify-center mx-auto mb-6 ${isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-300'}`}>
              <ClipboardList size={40} className="text-blue-400" />
            </div>
            <h2 className={`font-black text-2xl mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Scan Your Prescription</h2>
            <p className={`text-sm max-w-md mx-auto mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Point your camera at a doctor's prescription or upload an image. Our AI will extract all medicine names, dosages, and instructions automatically.
            </p>
            {cameraError && <p className="text-xs text-red-400 mb-4">⚠️ {cameraError}</p>}
          </>
        )}

        {/* Action buttons */}
        <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {cameraActive ? (
            <>
              <button onClick={capturePhoto}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-500 transition shadow-lg text-sm">
                📸 Capture & Scan
              </button>
              <button onClick={stopCamera}
                className={`flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-2xl transition text-sm border ${isDark ? 'glass border-white/15 text-slate-300 hover:bg-white/8' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                <X size={16} /> Cancel
              </button>
            </>
          ) : capturedImage ? (
            uploaded && (
              <button onClick={resetAll}
                className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-green-500 transition shadow-lg text-sm">
                <CheckCircle size={16} /> Scan Another
              </button>
            )
          ) : (
            <>
              <button onClick={startCamera}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-500 transition shadow-lg text-sm">
                📷 Open Camera
              </button>
              <button onClick={() => fileInputRef.current?.click()}
                className={`flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-2xl transition text-sm border ${isDark ? 'glass border-white/15 text-slate-300 hover:bg-white/8' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                📁 Upload Image
              </button>
            </>
          )}
        </div>

        <p className={`text-xs mt-6 ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>Supports JPG, PNG, PDF · Max 10MB</p>
      </div>
    </PageLayout>
  );
}
