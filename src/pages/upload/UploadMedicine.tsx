import { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle, X, File } from 'lucide-react';
import { PageLayout } from '../../components/Layout';
import { useTheme } from '../../context/ThemeContext';

export default function UploadMedicine() {
  const { isDark } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setUploaded(false);
    setUploadProgress(0);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const simulateUpload = () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadProgress(0);
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

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadProgress(0);
    setUploading(false);
    setUploaded(false);
  };

  return (
    <PageLayout
      icon={<Camera size={26} className="text-orange-400" />}
      title="Upload Medicine Image"
      subtitle="Upload a photo of your medicine for AI-powered identification and detailed information."
      badge="AI Photo Recognition"
      badgeColor="orange"
      headerGradient="from-orange-600/15 via-amber-500/5 to-transparent"
      accentColor="orange"
    >
      {/* Upload Zone */}
      <div
        className={`rounded-3xl border-2 border-dashed p-8 md:p-12 text-center transition-all cursor-pointer group mb-6 ${isDark ? 'glass border-orange-500/25 hover:border-orange-500/45' : 'bg-white border-orange-300 hover:border-orange-500 shadow-sm'}`}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />

        {!selectedFile ? (
          <>
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform ${isDark ? 'bg-orange-500/10' : 'bg-orange-50'}`}>
              <Camera size={36} className="text-orange-400" />
            </div>
            <h2 className={`font-black text-xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Drop your image here</h2>
            <p className={`text-sm mb-6 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Drag & drop or click to browse. Supports JPG, PNG, WEBP up to 10MB</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="bg-orange-600 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-orange-500 transition shadow-lg text-sm">
                📁 Browse Files
              </button>
              <button onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}
                className={`font-bold px-8 py-3.5 rounded-2xl transition text-sm border ${isDark ? 'glass border-white/15 text-slate-300 hover:bg-white/8' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'}`}>
                📷 Take Photo
              </button>
            </div>
          </>
        ) : (
          <div onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-center gap-4 mb-4">
              {preview ? (
                <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-2xl border border-orange-500/30" />
              ) : (
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${isDark ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-orange-50 border border-orange-200'}`}>
                  <File size={32} className="text-orange-400" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className={`font-bold text-sm truncate max-w-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFile.name}</p>
              <button onClick={clearFile} className="text-red-400 hover:text-red-300 transition"><X size={16} /></button>
            </div>
            <p className={`text-xs mb-4 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{(selectedFile.size / 1024).toFixed(1)} KB</p>

            {(uploading || uploaded) && (
              <div className="max-w-sm mx-auto mb-4">
                <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${uploaded ? 'bg-green-500' : 'bg-orange-500'}`}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className={`text-xs mt-2 font-semibold ${uploaded ? 'text-green-400' : isDark ? 'text-orange-300' : 'text-orange-600'}`}>
                  {uploaded ? '✅ Upload Complete!' : `Uploading... ${Math.round(uploadProgress)}%`}
                </p>
              </div>
            )}

            {!uploading && !uploaded && (
              <button onClick={simulateUpload}
                className="bg-orange-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-orange-500 transition shadow-lg text-sm flex items-center gap-2 mx-auto">
                <Upload size={16} /> Identify Medicine
              </button>
            )}
            {uploaded && (
              <button onClick={clearFile}
                className="bg-green-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-green-500 transition shadow-lg text-sm flex items-center gap-2 mx-auto">
                <CheckCircle size={16} /> Upload Another
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className={`rounded-2xl border p-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
        <h3 className={`font-bold mb-4 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>📸 Tips for better recognition</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { tip: 'Ensure the medicine label is fully visible', icon: '✅' },
            { tip: 'Use good lighting for clearer images', icon: '💡' },
            { tip: 'Keep the image in focus and sharp', icon: '🎯' },
            { tip: 'Crop to show only the medicine strip/box', icon: '✂️' },
          ].map((item) => (
            <div key={item.tip} className={`flex items-center gap-3 text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              <span>{item.icon}</span>
              <span>{item.tip}</span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
