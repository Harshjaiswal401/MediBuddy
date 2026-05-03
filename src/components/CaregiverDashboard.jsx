import { useState } from 'react';
import { Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function CaregiverDashboard({ user }) {
  // Mock data for linked patients
  const [patients, setPatients] = useState([
    {
      id: 'p1',
      name: 'Robert Doe (Father)',
      adherenceScore: 92,
      status: 'on-track', // on-track, delayed, missed
      lastUpdated: '10 mins ago',
      missedDoses: 0
    },
    {
      id: 'p2',
      name: 'Martha Doe (Mother)',
      adherenceScore: 65,
      status: 'missed',
      lastUpdated: '2 hours ago',
      missedDoses: 1
    },
    {
      id: 'p3',
      name: 'William Smith (Uncle)',
      adherenceScore: 80,
      status: 'delayed',
      lastUpdated: '30 mins ago',
      missedDoses: 0
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'on-track': return 'var(--secondary-color)';
      case 'delayed': return 'var(--warning-color)';
      case 'missed': return 'var(--danger-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'on-track': return <CheckCircle size={24} color={getStatusColor(status)} />;
      case 'delayed': return <Clock size={24} color={getStatusColor(status)} />;
      case 'missed': return <AlertTriangle size={24} color={getStatusColor(status)} />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'var(--primary-color)' }}>Caregiver Monitor</h1>
          <p className="text-secondary">Real-time medication adherence for your linked patients.</p>
        </div>
        <button className="btn-secondary">
          <Users size={20} /> Link New Patient
        </button>
      </div>

      <div className="dashboard-grid">
        {patients.map(patient => (
          <div key={patient.id} className="card" style={{ borderTop: `4px solid ${getStatusColor(patient.status)}` }}>
            <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{patient.name}</h3>
                <p className="text-secondary" style={{ fontSize: '12px' }}>Last updated: {patient.lastUpdated}</p>
              </div>
              {getStatusIcon(patient.status)}
            </div>

            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
              <div>
                <p className="text-secondary" style={{ fontSize: '14px' }}>Adherence Score</p>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: getStatusColor(patient.status) }}>
                  {patient.adherenceScore}%
                </div>
              </div>
              {patient.missedDoses > 0 && (
                <div className="badge" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: 'var(--danger-color)' }}>
                  {patient.missedDoses} Missed Dose{patient.missedDoses > 1 ? 's' : ''}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button style={{ width: '100%' }} className={patient.status === 'missed' ? 'btn-danger' : 'btn-secondary'}>
                {patient.status === 'missed' ? 'Send Urgent Reminder' : 'View Details'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
