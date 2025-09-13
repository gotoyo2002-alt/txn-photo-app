import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const validateEmail = (email: string) => /.+@.+\..+/.test(email);

const ForgotPasswordForm: React.FC<{ onSwitch: (mode: 'login') => void }> = ({ onSwitch }) => {
  const { resetPassword, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return setFormError('請輸入有效 Email');
    await resetPassword(email);
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-2xl bg-primary/80 shadow-xl max-w-sm mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-accent mb-2">重設密碼</h2>
      <input name="email" type="email" className="input focus:ring-2 focus:ring-accent/60 shadow-sm" placeholder="電子郵件" value={email} onChange={e => { setEmail(e.target.value); setFormError(''); }} autoFocus />
      {(formError || error) && <div className="text-loss font-bold">{formError || error}</div>}
      {sent && <div className="text-profit font-bold">重設信已寄出，請檢查信箱！</div>}
      <button type="submit" className="btn w-full text-lg py-3" disabled={loading}>{loading ? '寄送中...' : '寄送重設信'}</button>
      <div className="flex justify-between text-xs mt-2">
        <button type="button" className="underline text-accent" onClick={() => onSwitch('login')}>返回登入</button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
