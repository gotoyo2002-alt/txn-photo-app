import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const validateEmail = (email: string) => /.+@.+\..+/.test(email);
const validatePwd = (pwd: string) => pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);

const RegisterForm: React.FC<{ onSwitch: (mode: 'login') => void }> = ({ onSwitch }) => {
  const { register, error, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', nickname: '', experience: '', initial_balance: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(form.email)) return setFormError('請輸入有效 Email');
    if (!validatePwd(form.password)) return setFormError('密碼需8碼以上且含大寫字母與數字');
    if (!form.nickname) return setFormError('請輸入暱稱');
    if (!form.experience) return setFormError('請選擇交易經驗');
    if (!form.initial_balance || isNaN(Number(form.initial_balance))) return setFormError('請輸入初始資金');
    await register(form.email, form.password, {
      nickname: form.nickname,
      experience: form.experience,
      initial_balance: Number(form.initial_balance),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-2xl bg-primary/80 shadow-xl max-w-sm mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-accent mb-2">註冊 TXN</h2>
      <input name="email" type="email" className="input focus:ring-2 focus:ring-accent/60 shadow-sm" placeholder="電子郵件" value={form.email} onChange={handleChange} autoFocus />
      <div className="relative">
        <input name="password" type={showPwd ? 'text' : 'password'} className="input focus:ring-2 focus:ring-accent/60 shadow-sm pr-10" placeholder="密碼（8碼含大寫與數字）" value={form.password} onChange={handleChange} />
        <button type="button" className="absolute right-2 top-2 text-accent text-sm" onClick={() => setShowPwd(v => !v)} tabIndex={-1}>{showPwd ? '隱藏' : '顯示'}</button>
      </div>
      <input name="nickname" className="input focus:ring-2 focus:ring-accent/60 shadow-sm" placeholder="暱稱" value={form.nickname} onChange={handleChange} />
      <select name="experience" className="input focus:ring-2 focus:ring-accent/60 shadow-sm" value={form.experience} onChange={handleChange}>
        <option value="">交易經驗</option>
        <option value="beginner">新手</option>
        <option value="intermediate">進階</option>
        <option value="expert">高手</option>
      </select>
      <input name="initial_balance" className="input focus:ring-2 focus:ring-accent/60 shadow-sm" placeholder="初始資金 (TWD)" value={form.initial_balance} onChange={handleChange} type="number" min="0" />
      {(formError || error) && <div className="text-loss font-bold">{formError || error}</div>}
      <button type="submit" className="btn w-full text-lg py-3" disabled={loading}>{loading ? '註冊中...' : '註冊'}</button>
      <div className="flex justify-between text-xs mt-2">
        <button type="button" className="underline text-accent" onClick={() => onSwitch('login')}>已有帳號？登入</button>
      </div>
    </form>
  );
};

export default RegisterForm;
