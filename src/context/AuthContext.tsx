import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../api/supabase';

interface UserProfile {
  id: string;
  email: string;
  nickname?: string;
  experience?: string;
  initial_balance?: number;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, profile: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 會話管理與自動同步 user_profiles
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data, error } = await supabase
          .from('user_profiles')
          .upsert({ id: session.user.id, email: session.user.email }, { onConflict: 'id' })
          .select()
          .single();
        if (data) setUser(data);
  else setUser({ id: session.user.id || '', email: session.user.email || '' });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => { listener.subscription.unsubscribe(); };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const register = async (email: string, password: string, profile: Partial<UserProfile>) => {
    setLoading(true); setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    if (data.user) {
      await supabase.from('user_profiles').upsert({
        id: data.user.id,
        email,
        ...profile,
      });
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true); setError(null);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  const resetPassword = async (email: string) => {
    setLoading(true); setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 必須在 AuthProvider 內使用');
  return ctx;
};
