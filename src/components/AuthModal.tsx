import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const AuthModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-gradient-to-br from-primary/90 via-primary/80 to-accent/10 rounded-3xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in-up">
        <button
          className="absolute top-4 right-4 text-accent text-3xl font-extrabold hover:scale-125 hover:text-accent/80 transition-transform duration-150"
          onClick={onClose}
          aria-label="關閉"
        >
          ×
        </button>
        {mode === 'login' && <LoginForm onSwitch={setMode} />}
        {mode === 'register' && <RegisterForm onSwitch={() => setMode('login')} />}
        {mode === 'forgot' && <ForgotPasswordForm onSwitch={() => setMode('login')} />}
      </div>
    </div>
  );
};

export default AuthModal;
