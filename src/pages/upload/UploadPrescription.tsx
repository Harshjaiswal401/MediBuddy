import { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle, X, File } from 'lucide-react';
import { PageLayout } from '../../components/Layout';
import { useTheme } from '../../context/ThemeContext';

export default function UploadPrescription() {
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
      icon={<FileText size={26} className="text-blue-400" />}
      title="Upload Prescription"
      subtitle="Digitize your prescription using AI. Extract medicine names, dosages, and instructions automatically."
      badge="OCR + AI"
      badgeColor="blue"
    >
      {/* Upload Zone */}
      <div
        className={`rounded-3xl border-2 border-dashed p-8 md:p-12 text-center transition-all cursor-pointer group mb-6 ${isDark ? 'glass border-blue-500/25 hover:border-blue-500/45' : 'bg-white border-blue-300 hover:border-blue-500 shadow-sm'}`}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />

        {!selectedFile ? (
          <>
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <FileText size={36} className="text-blue-400" />
            </div>
            <h2 className={`font-black text-xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Upload your prescription</h2>
            <p className={`text-sm mb-6 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>JPG, PNG, or PDF · Up to 10MB · Handwritten or printed</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="bg-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-500 transition shadow-lg text-sm">
                📁 Upload File
              </button>
              <button onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}
                className={`font-bold px-8 py-3.5 rounded-2xl transition text-sm border ${isDark ? 'glass border-white/15 text-slate-300 hover:bg-white/8' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'}`}>
                📷 Take Photo
              </button>
            </div>
          </>
        ) : (
          <div onClick={(e) => e.stopPropagation()}>
            {/* File Preview */}
            <div className="flex items-center justify-center gap-4 mb-4">
              {preview ? (
                <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-2xl border border-blue-500/30" />
              ) : (
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                  <File size={32} className="text-blue-400" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className={`font-bold text-sm truncate max-w-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFile.name}</p>
              <button onClick={clearFile} className="text-red-400 hover:text-red-300 transition"><X size={16} /></button>
            </div>
            <p className={`text-xs mb-4 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{(selectedFile.size / 1024).toFixed(1)} KB</p>

            {/* Progress Bar */}
            {(uploading || uploaded) && (
              <div className="max-w-sm mx-auto mb-4">
                <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${uploaded ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className={`text-xs mt-2 font-semibold ${uploaded ? 'text-green-400' : isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                  {uploaded ? '✅ Upload Complete!' : `Uploading... ${Math.round(uploadProgress)}%`}
                </p>
              </div>
            )}

            {!uploading && !uploaded && (
              <button onClick={simulateUpload}
                className="bg-blue-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-blue-500 transition shadow-lg text-sm flex items-center gap-2 mx-auto">
                <Upload size={16} /> Upload Prescription
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

      {/* How it works */}
      <div className={`rounded-3xl border p-6 ${isDark ? 'glass border-white/8' : 'bg-white border-gray-200 shadow-sm'}`}>
        <h3 className={`font-black text-lg mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>How it works</h3>
        <div className="space-y-3">
          {[
            { step: '1', text: 'Upload or photograph your prescription', icon: '📤' },
            { step: '2', text: 'AI OCR extracts all text from the image', icon: '🔍' },
            { step: '3', text: 'Medicines, dosages & frequency are identified', icon: '💊' },
            { step: '4', text: 'Find pharmacies with all medicines in stock', icon: '🏥' },
          ].map((s) => (
            <div key={s.step} className={`flex items-center gap-4 rounded-xl border p-4 ${isDark ? 'glass border-white/5' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 ${isDark ? 'bg-blue-500/15 border border-blue-500/25 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-600'}`}>{s.step}</span>
              <span className="text-xl">{s.icon}</span>
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{s.text}</p>
            </div>
          ))}
        </div>

        <div className={`mt-5 flex items-start gap-3 rounded-xl p-4 ${isDark ? 'bg-green-500/5 border border-green-500/15' : 'bg-green-50 border border-green-200'}`}>
          <span className="text-green-400 text-lg">🔒</span>
          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Your prescription is encrypted and processed securely. We never store personal medical information.</p>
        </div>
      </div>
    </PageLayout>
  );
}
