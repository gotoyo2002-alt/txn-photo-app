# API 合約

## 交易紀錄 TradeRecord
- 位置：`supabase/migrations/01_create_trade_record.sql`
- 欄位：
  - id (uuid, PK)
  - user_id (text)
  - symbol (text)
  - side (text: 'buy'|'sell')
  - entry_price (numeric)
  - stop_loss (numeric)
  - take_profit (numeric)
  - exit_price (numeric)
  - pnl (numeric)
  - screenshot_url (text)
  - created_at (timestamptz)

## KPI 與權益曲線查詢
- 位置：`supabase/functions/kpi_equity.sql`
- 輸入：user_id
- 輸出：
  - KPI: total_pnl, win_rate, avg_risk_reward
  - EquityCurve: date, equity
