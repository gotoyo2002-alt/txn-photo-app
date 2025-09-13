
import React, { useEffect, useState } from 'react';
import supabase from '../api/supabase';
import KpiCard from '../components/KpiCard';

interface Trade {
  id: string;
  symbol: string;
  side: string;
  entry_price: number;
  stop_loss?: number;
  take_profit?: number;
  exit_price?: number;
  pnl?: number;
  screenshot_url?: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from('trade_records').select('*').order('created_at', { ascending: true });
        if (error) setError(error.message);
        else setTrades(data || []);
      } catch (err: any) {
        setError(err.message || '資料讀取失敗');
      } finally {
        setLoading(false);
      }
    };
    fetchTrades();
  }, []);

  // KPI 計算
  const total_pnl = trades.reduce((sum, t) => sum + (t.pnl ?? 0), 0);
  const win_count = trades.filter((t) => (t.pnl ?? 0) > 0).length;
  const win_rate = trades.length ? win_count / trades.length : 0;
  const avg_risk_reward = trades.length
    ? trades.reduce((sum, t) => sum + ((t.take_profit && t.stop_loss && t.entry_price) ? Math.abs((t.take_profit - t.entry_price) / (t.entry_price - t.stop_loss)) : 0), 0) / trades.length
    : 0;
  // 權益曲線
  let equity = 10000;
  const equityCurve = trades.map((t) => {
    equity += t.pnl ?? 0;
    return { date: t.created_at.slice(0, 10), equity };
  });
  // KPI 趨勢
  const last5 = trades.slice(-5);
  const prev5 = trades.slice(-10, -5);
  const last5_pnl = last5.reduce((sum, t) => sum + (t.pnl ?? 0), 0);
  const prev5_pnl = prev5.reduce((sum, t) => sum + (t.pnl ?? 0), 0);
  const pnl_trend = last5_pnl > prev5_pnl ? 'up' : last5_pnl < prev5_pnl ? 'down' : null;
  const win_trend = (() => {
    const last = last5.filter((t) => (t.pnl ?? 0) > 0).length;
    const prev = prev5.filter((t) => (t.pnl ?? 0) > 0).length;
    return last > prev ? 'up' : last < prev ? 'down' : null;
  })();

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-accent drop-shadow-lg">儀表板</h2>
      {error && <div className="text-loss font-bold mb-2">{error}</div>}
      {loading ? (
        <div className="text-lg text-gray-300 animate-pulse">載入中...</div>
      ) : (
        <>
          {/* KPI 卡片列 */}
          <div className="flex gap-6 mb-10 flex-wrap justify-center">
            <KpiCard label="總損益" value={total_pnl.toFixed(0)} trend={pnl_trend as any} color={total_pnl >= 0 ? '#228B22' : '#DC143C'} className="bg-gradient-to-br from-accent/30 to-primary/90 shadow-2xl hover:scale-105 hover:shadow-accent/40 transition-transform duration-200" />
            <KpiCard label="勝率" value={`${(win_rate * 100).toFixed(1)}%`} trend={win_trend as any} color="#FBBF24" className="bg-gradient-to-br from-primary/80 to-accent/20 shadow-2xl hover:scale-105 hover:shadow-accent/40 transition-transform duration-200" />
            <KpiCard label="平均風險回報比" value={avg_risk_reward.toFixed(2)} className="bg-gradient-to-br from-primary/70 to-accent/10 shadow-2xl hover:scale-105 hover:shadow-accent/40 transition-transform duration-200" />
          </div>
          {/* 權益曲線 */}
          <div className="rounded-2xl p-8 mb-10 shadow-xl bg-gradient-to-br from-primary/80 via-primary/60 to-accent/10 border border-accent/10 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-accent drop-shadow">權益曲線</h3>
            <div className="w-full overflow-x-auto">
              <svg width={Math.max(320, equityCurve.length * 40)} height="120">
                <defs>
                  <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1A202C" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="url(#equityGradient)"
                  strokeWidth="4"
                  points={equityCurve.map((p, i) => `${i * 40},${110 - (p.equity - 10000) / 10}`).join(' ')}
                  style={{ filter: 'drop-shadow(0 2px 8px #FBBF2440)' }}
                />
                {equityCurve.map((p, i) => (
                  <circle key={i} cx={i * 40} cy={110 - (p.equity - 10000) / 10} r="3.5" fill="#FBBF24" stroke="#fff" strokeWidth="1" />
                ))}
              </svg>
            </div>
          </div>
          {/* 近期交易快覽 */}
          <div className="rounded-2xl p-8 shadow-xl bg-gradient-to-br from-primary/70 via-primary/60 to-accent/10 border border-accent/10 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-accent drop-shadow">近期交易</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-base rounded-xl overflow-hidden shadow bg-primary/80">
                <thead>
                  <tr className="text-accent border-b border-accent/30">
                    <th className="px-3 py-2 font-mono">#</th>
                    <th className="px-3 py-2">商品</th>
                    <th className="px-3 py-2">方向</th>
                    <th className="px-3 py-2">進場</th>
                    <th className="px-3 py-2">出場</th>
                    <th className="px-3 py-2">損益</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.slice(-5).reverse().map((t, i) => (
                    <tr key={t.id} className="border-b border-accent/10 hover:bg-accent/20 transition-colors duration-150">
                      <td className="px-3 py-2 font-mono text-xs text-gray-400">{trades.length - i}</td>
                      <td className="px-3 py-2 font-bold">{t.symbol}</td>
                      <td className={`px-3 py-2 font-mono ${t.side === 'long' ? 'text-profit' : 'text-loss'}`}>{t.side === 'long' ? '多' : '空'}</td>
                      <td className="px-3 py-2 font-mono">{t.entry_price}</td>
                      <td className="px-3 py-2 font-mono">{t.exit_price ?? '-'}</td>
                      <td className={`px-3 py-2 font-mono font-bold ${t.pnl && t.pnl > 0 ? 'text-profit' : t.pnl && t.pnl < 0 ? 'text-loss' : ''}`}>{t.pnl?.toFixed(0) ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
