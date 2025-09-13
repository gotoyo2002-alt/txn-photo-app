import React, { useState } from 'react';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthModal from './src/components/AuthModal';
import TradeFormModal from './src/components/TradeFormModal';
import Dashboard from './src/pages/Dashboard';
import TradeHistory from './src/pages/TradeHistory';


type Page = 'dashboard' | 'trade' | 'history';


const MainApp: React.FC = () => {
  const [page, setPage] = useState<Page>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const handlePage = (p: Page) => {
    setPage(p);
    setRefreshKey((k) => k + 1);
  };

  // 未登入時強制彈出登入
  React.useEffect(() => {
    if (!loading && !user) setAuthOpen(true);
    else setAuthOpen(false);
  }, [user, loading]);

  return (
    <div className="min-h-screen bg-primary text-white">
      <nav className="flex gap-4 p-4 bg-primary/90 text-accent font-bold text-lg shadow items-center">
        <button onClick={() => handlePage('dashboard')}>儀表板</button>
        <button onClick={() => setModalOpen(true)} disabled={!user}>新增交易</button>
        <button onClick={() => handlePage('history')}>交易歷史</button>
        <div className="flex-1" />
        {user ? (
          <>
            <span className="font-mono text-sm mr-2">{user.nickname || user.email}</span>
            <button className="btn px-3 py-1 text-sm" onClick={logout}>登出</button>
          </>
        ) : (
          <button className="btn px-3 py-1 text-sm" onClick={() => setAuthOpen(true)}>登入</button>
        )}
      </nav>
      <main className="p-4 max-w-5xl mx-auto">
        {page === 'dashboard' && <Dashboard key={refreshKey} />}
        {page === 'history' && <TradeHistory key={refreshKey} />}
      </main>
      <TradeFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={() => {
          setModalOpen(false);
          setPage('history');
          setRefreshKey((k) => k + 1);
        }}
      />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
