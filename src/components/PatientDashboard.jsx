import { useState, useEffect } from 'react';
import { CheckCircle, Clock, PlusCircle, Medal, Volume2 } from 'lucide-react';

export default function PatientDashboard({ user }) {
  // Mock data for medications
  const [medications, setMedications] = useState([
    {
      id: '1',
      name: 'Paracetamol 500mg',
      time: '08:00 AM',
      status: 'pending', // pending, taken, missed
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&q=80',
    },
    {
      id: '2',
      name: 'Vitamin D3',
      time: '01:00 PM',
      status: 'pending',
      imageUrl: 'https://images.unsplash.com/photo-1550572017-edb7df089871?w=150&q=80',
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  // Gamification: Healthy Streak
  const streakCount = user.streakCount || 0;
  const badges = user.badges || [];

  const playReminder = (medName) => {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = `It is time to take your ${medName}`;
      msg.rate = 0.9; // Slightly slower for elderly
      msg.pitch = 1;
      window.speechSynthesis.speak(msg);
    }
  };

  const markAsTaken = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, status: 'taken' } : med
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'var(--primary-color)' }}>Welcome, {user.name}</h1>
          <p className="text-secondary">Here is your schedule for today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="badge badge-streak" style={{ fontSize: '14px', padding: '8px 16px' }}>
            🔥 {streakCount} Day Streak
          </div>
          {badges.map((badge, idx) => (
            <div key={idx} className="badge" style={{ backgroundColor: 'var(--secondary-color)', color: 'white', padding: '8px 16px' }}>
              <Medal size={16} /> {badge}
            </div>
          ))}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md">
            <PlusCircle size={20} /> Add Medication
          </button>
        </div>
      </div>
      <div className="dashboard-grid">
        {medications.map(med => (
          <div key={med.id} className="card medication-card">
            <div className="med-header">
              <img src={med.imageUrl} alt={med.name} className="med-img" />
              <div className="time-pill">
                <Clock size={16} /> {med.time}
              </div>
            </div>
            
            <div className="med-info">
              <h3>{med.name}</h3>
              <p className="text-secondary" style={{ fontSize: '14px', marginBottom: '16px' }}>
                Take 1 pill after meal.
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                style={{ padding: '10px' }} 
                onClick={() => playReminder(med.name)}
                title="Play Audio Reminder"
                className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Volume2 size={20} />
              </button>
              
              {med.status === 'taken' ? (
                <button disabled style={{ flex: 1, opacity: 0.8 }} className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md">
                  <CheckCircle size={20} /> Taken
                </button>
              ) : (
                <button
                  style={{ flex: 1 }}
                  onClick={() => markAsTaken(med.id)}
                  className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md">
                  Mark as Taken
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="card" style={{ width: '400px', maxWidth: '90%' }}>
            <h2 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Add Medication</h2>
            <div className="form-group">
              <label>Medicine Name</label>
              <input type="text" placeholder="e.g. Paracetamol" />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" />
            </div>
            <div className="form-group">
              <label>Medicine Image (Upload)</label>
              <input type="file" accept="image/*" />
              <small className="text-secondary">Upload a physical picture of the pill/bottle.</small>
            </div>
            <div className="flex gap-2" style={{ marginTop: '20px' }}>
              <button style={{ flex: 1 }} onClick={() => setShowAddModal(false)} className="border-2 border-gray-200 text-gray-600 bg-transparent hover:bg-gray-50 hover:border-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-200">Cancel</button>
              <button
                style={{ flex: 1 }}
                onClick={() => setShowAddModal(false)}
                className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
