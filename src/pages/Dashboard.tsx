import React from 'react';

const Dashboard: React.FC = () => {
  // 假資料，實際應由 API 取得
  const kpi = { total_pnl: 1000, win_rate: 0.6, avg_risk_reward: 2.1 };
  const equityCurve = [
    { date: '2025-09-01', equity: 10000 },
    { date: '2025-09-02', equity: 10100 },
    { date: '2025-09-03', equity: 10050 },
  ];
  return (
    <div>
      <h2>儀表板</h2>
      <div className="flex gap-4 mb-4">
        <div className="kpi-card">總損益: {kpi.total_pnl}</div>
        <div className="kpi-card">勝率: {(kpi.win_rate * 100).toFixed(1)}%</div>
        <div className="kpi-card">平均風險回報比: {kpi.avg_risk_reward}</div>
      </div>
      <div className="equity-curve">
        <h3>權益曲線</h3>
        <svg width="300" height="100">
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            points={equityCurve.map((p, i) => `${i * 50},${100 - (p.equity - 10000) / 2}`).join(' ')}
          />
        </svg>
      </div>
    </div>
  );
};

export default Dashboard;
