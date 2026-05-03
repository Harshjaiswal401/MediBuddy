import { Lightbulb } from 'lucide-react';
import { PageLayout } from '../../components/Layout';

const tips = [
  { category: 'Hydration', icon: '💧', title: 'Drink 8 Glasses of Water Daily', desc: 'Proper hydration supports metabolism, kidney function, and skin health. Aim for 2.5–3 liters per day.', color: 'border-blue-500/20 hover:border-blue-500/35', accent: 'text-blue-400' },
  { category: 'Nutrition', icon: '🥗', title: 'Eat a Rainbow of Vegetables', desc: 'Diverse colorful vegetables provide antioxidants, vitamins, and minerals essential for long-term health.', color: 'border-green-500/20 hover:border-green-500/35', accent: 'text-green-400' },
  { category: 'Sleep', icon: '😴', title: 'Prioritize 7-9 Hours of Sleep', desc: 'Quality sleep boosts immunity, mental health, and metabolism. Maintain a consistent sleep schedule.', color: 'border-indigo-500/20 hover:border-indigo-500/35', accent: 'text-indigo-400' },
  { category: 'Exercise', icon: '🏃', title: '30 Minutes of Exercise Daily', desc: 'Regular physical activity reduces risk of heart disease, diabetes, and depression while boosting energy.', color: 'border-orange-500/20 hover:border-orange-500/35', accent: 'text-orange-400' },
  { category: 'Mental Health', icon: '🧘', title: 'Practice Mindfulness Daily', desc: 'Just 10 minutes of meditation reduces stress, anxiety, and blood pressure significantly.', color: 'border-violet-500/20 hover:border-violet-500/35', accent: 'text-violet-400' },
  { category: 'Medication', icon: '💊', title: 'Never Skip Prescribed Doses', desc: 'Always complete antibiotic courses. Missing doses can lead to treatment failure and antibiotic resistance.', color: 'border-red-500/20 hover:border-red-500/35', accent: 'text-red-400' },
];

export default function HealthAdvice() {
  return (
    <PageLayout
      icon={<Lightbulb size={26} className="text-yellow-400" />}
      title="Personalized Health Advice"
      subtitle="AI-curated wellness tips and evidence-based health guidance for a better life."
      badge="AI Health Coach"
      badgeColor="orange"
      headerGradient="from-yellow-600/15 via-orange-500/5 to-transparent"
      accentColor="orange"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tips.map((tip) => (
          <div key={tip.title} className={`glass rounded-3xl border p-6 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 group cursor-pointer ${tip.color}`}>
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">{tip.icon}</span>
              <span className={`text-xs font-bold glass border border-white/10 px-3 py-1 rounded-full ${tip.accent}`}>
                {tip.category}
              </span>
            </div>
            <h3 className={`font-black text-white text-base mb-3 group-hover:${tip.accent} transition`}>{tip.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      {/* AI chat prompt */}
      <div className="mt-8 glass rounded-3xl border border-yellow-500/15 p-8 text-center">
        <div className="text-5xl mb-4">🤖</div>
        <h3 className="font-black text-white text-xl mb-3">Want Personalized Advice?</h3>
        <p className="text-slate-400 text-sm mb-6">Chat with MedAI for health advice tailored specifically to your profile, symptoms, and medical history.</p>
        <a href="/ai/medicine" className="inline-flex items-center gap-2 bg-yellow-500 text-black font-black px-8 py-3.5 rounded-2xl hover:bg-yellow-400 transition shadow-xl text-sm">
          <Lightbulb size={16} /> Get Personalized Tips
        </a>
      </div>
    </PageLayout>
  );
}
