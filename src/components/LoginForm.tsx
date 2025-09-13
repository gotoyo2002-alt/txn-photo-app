import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const validateEmail = (email: string) => /.+@.+\..+/.test(email);

const LoginForm: React.FC<{ onSwitch: (mode: 'register' | 'forgot') => void }> = ({ onSwitch }) => {
  const { login, error, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(form.email)) return setFormError('請輸入有效 Email');
    if (!form.password) return setFormError('請輸入密碼');
    await login(form.email, form.password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-2xl bg-primary/80 shadow-xl max-w-sm mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-accent mb-2">登入 TXN</h2>
      <div>
        <input
          name="email"
          type="email"
          className="input focus:ring-2 focus:ring-accent/60 shadow-sm"
          placeholder="電子郵件"
          value={form.email}
          onChange={handleChange}
          autoFocus
        />
      </div>
      <div className="relative">
        <input
          name="password"
          type={showPwd ? 'text' : 'password'}
          className="input focus:ring-2 focus:ring-accent/60 shadow-sm pr-10"
          placeholder="密碼"
          value={form.password}
          onChange={handleChange}
        />
        <button type="button" className="absolute right-2 top-2 text-accent text-sm" onClick={() => setShowPwd(v => !v)} tabIndex={-1}>
          {showPwd ? '隱藏' : '顯示'}
        </button>
      </div>
      {(formError || error) && <div className="text-loss font-bold">{formError || error}</div>}
      <button type="submit" className="btn w-full text-lg py-3" disabled={loading}>{loading ? '登入中...' : '登入'}</button>
      <div className="flex justify-between text-xs mt-2">
        <button type="button" className="underline text-accent" onClick={() => onSwitch('register')}>註冊新帳號</button>
        <button type="button" className="underline text-accent" onClick={() => onSwitch('forgot')}>忘記密碼？</button>
      </div>
    </form>
  );
};

export default LoginForm;
