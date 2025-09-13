import React, { useState } from 'react';
import TradeFormModal from './src/components/TradeFormModal';
import Dashboard from './src/pages/Dashboard';
import TradeHistory from './src/pages/TradeHistory';

type Page = 'dashboard' | 'trade' | 'history';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePage = (p: Page) => {
    setPage(p);
    setRefreshKey((k) => k + 1); // 切換時刷新
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      <nav className="flex gap-4 p-4 bg-primary/90 text-accent font-bold text-lg shadow">
        <button onClick={() => handlePage('dashboard')}>儀表板</button>
        <button onClick={() => setModalOpen(true)}>新增交易</button>
        <button onClick={() => handlePage('history')}>交易歷史</button>
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
    </div>
  );
};

export default App;
