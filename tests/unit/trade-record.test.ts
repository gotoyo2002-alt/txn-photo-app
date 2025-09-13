import { describe, it, expect } from 'vitest';

// TradeRecord 型別定義（可根據實際 model 調整）
type TradeRecord = {
  id: string;
  user_id: string;
  symbol: string;
  side: 'buy' | 'sell';
  entry_price: number;
  stop_loss?: number;
  take_profit?: number;
  exit_price?: number;
  pnl: number;
  screenshot_url?: string;
  created_at: string;
};

describe('TradeRecord Entity', () => {
  it('should create a valid TradeRecord object', () => {
    const trade: TradeRecord = {
      id: 'uuid-123',
      user_id: 'user-1',
      symbol: 'AAPL',
      side: 'buy',
      entry_price: 100,
      stop_loss: 90,
      take_profit: 120,
      exit_price: 110,
      pnl: 10,
      screenshot_url: 'https://example.com/img.png',
      created_at: new Date().toISOString(),
    };
    expect(trade).toHaveProperty('id');
    expect(trade.side).toBe('buy');
    expect(typeof trade.pnl).toBe('number');
  });

  it('should allow optional stop_loss and take_profit', () => {
    const trade: TradeRecord = {
      id: 'uuid-456',
      user_id: 'user-2',
      symbol: 'TSLA',
      side: 'sell',
      entry_price: 200,
      pnl: -15,
      created_at: new Date().toISOString(),
    };
    expect(trade.stop_loss).toBeUndefined();
    expect(trade.take_profit).toBeUndefined();
  });
});
