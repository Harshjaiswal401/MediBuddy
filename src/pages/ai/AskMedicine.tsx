import { Bot } from 'lucide-react';
import { PageLayout, ChatUI } from '../../components/Layout';

export default function AskMedicine() {
  return (
    <PageLayout
      icon={<Bot size={26} className="text-violet-400" />}
      title="Ask Medicine AI"
      subtitle="Get instant, AI-powered answers about medicines, drug interactions, dosages, and side effects."
      headerGradient="from-violet-600/15 via-indigo-500/5 to-transparent"
      accentColor="violet"
    >
      {/* Quick prompts */}
      <div className="mb-6">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-3">Try asking about</p>
        <div className="flex flex-wrap gap-2">
          {['What is Metformin?', 'Side effects of Ibuprofen', 'Can I take Paracetamol daily?', 'Drug interactions with Aspirin'].map((q) => (
            <button key={q} className="text-xs glass border border-white/10 text-slate-400 hover:text-violet-300 hover:border-violet-500/30 px-4 py-2 rounded-full transition">
              {q}
            </button>
          ))}
        </div>
      </div>

      <ChatUI />

      <div className="mt-5 flex items-start gap-3 glass rounded-2xl border border-white/8 p-4">
        <span className="text-yellow-400 text-xl">⚠️</span>
        <p className="text-xs text-slate-500 leading-relaxed">
          MedAI provides general information and should not replace professional medical advice. Always consult a licensed physician for diagnosis and treatment.
        </p>
      </div>
    </PageLayout>
  );
}
