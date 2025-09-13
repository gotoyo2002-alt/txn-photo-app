import React from 'react';

const mockData = [
  { symbol: 'AAPL', pnl: 100, date: '2025-09-01' },
  { symbol: 'TSLA', pnl: -50, date: '2025-09-02' },
];

const TradeHistory: React.FC = () => {
  return (
    <div>
      <h2>交易歷史</h2>
      <div className="mb-2">
        <input placeholder="搜尋標的..." className="input" />
        {/* 篩選器可擴充 */}
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>日期</th>
            <th>標的</th>
            <th>損益</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((row, i) => (
            <tr key={i}>
              <td>{row.date}</td>
              <td>{row.symbol}</td>
              <td className={row.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>{row.pnl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeHistory;
