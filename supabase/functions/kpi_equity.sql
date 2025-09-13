-- KPI 與 EquityCurve 統計查詢 SQL
-- KPI: 總損益、勝率、平均風險回報比
SELECT 
  SUM(pnl) AS total_pnl,
  AVG(CASE WHEN pnl > 0 THEN 1 ELSE 0 END) AS win_rate,
  AVG(CASE WHEN stop_loss IS NOT NULL AND take_profit IS NOT NULL THEN (take_profit - entry_price) / (entry_price - stop_loss) END) AS avg_risk_reward
FROM trade_records
WHERE user_id = $1;

-- EquityCurve: 權益曲線
SELECT 
  DATE(created_at) AS date,
  SUM(pnl) OVER (ORDER BY created_at) + 10000 AS equity -- 以 10000 為初始資產
FROM trade_records
WHERE user_id = $1
ORDER BY date;
