import React, { useState } from 'react';
import TradeForm from './src/components/TradeForm';
import Dashboard from './src/pages/Dashboard';
import TradeHistory from './src/pages/TradeHistory';

type Page = 'dashboard' | 'trade' | 'history';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePage = (p: Page) => {
    setPage(p);
    setRefreshKey((k) => k + 1); // 切換時刷新
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex gap-4 p-4 bg-blue-600 text-white">
        <button onClick={() => handlePage('dashboard')}>儀表板</button>
        <button onClick={() => handlePage('trade')}>新增交易</button>
        <button onClick={() => handlePage('history')}>交易歷史</button>
      </nav>
      <main className="p-4 max-w-2xl mx-auto">
        {page === 'dashboard' && <Dashboard key={refreshKey} />}
        {page === 'trade' && <TradeForm onSubmit={() => { setPage('history'); setRefreshKey((k) => k + 1); }} />}
        {page === 'history' && <TradeHistory key={refreshKey} />}
      </main>
    </div>
  );
};

export default App;
