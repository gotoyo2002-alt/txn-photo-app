-- TradeRecord 資料表 schema
CREATE TABLE IF NOT EXISTS trade_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  symbol text NOT NULL,
  side text CHECK (side IN ('buy', 'sell')) NOT NULL,
  entry_price numeric NOT NULL,
  stop_loss numeric,
  take_profit numeric,
  exit_price numeric,
  pnl numeric NOT NULL,
  screenshot_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
