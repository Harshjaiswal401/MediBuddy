import { useState } from 'react';
import { UserPlus, LogIn } from 'lucide-react';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Restrict phone to 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.email.endsWith('@gmail.com')) {
      setError('Email must be a valid @gmail.com address.');
      return false;
    }
    if (!isLogin && formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate Firebase Auth
    // In real app: createUserWithEmailAndPassword or signInWithEmailAndPassword
    const user = {
      uid: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Test User',
      email: formData.email,
      role: role,
      phone: formData.phone,
      streakCount: 3,
      badges: ['3-Day Streak']
    };
    
    onLogin(user);
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-form">
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        {error && <div className="error-msg" style={{ marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

        <div className="tab-nav">
          <button 
            onClick={() => setIsLogin(true)} 
            style={{ flex: 1 }}
            className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)} 
            style={{ flex: 1 }}
            className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="patient">Patient</option>
                <option value="caregiver">Caregiver</option>
              </select>
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="John Doe"
                required 
              />
            </div>
          )}

          <div className="form-group">
            <label>Email (@gmail.com)</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              placeholder="user@gmail.com"
              required 
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Phone Number (10 digits)</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                placeholder="9876543210"
                required 
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <button
            type="submit"
            style={{ width: '100%', marginTop: '20px', padding: '12px' }}
            className="bg-medical text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md">
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
