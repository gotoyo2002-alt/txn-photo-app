import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

describe('Supabase API Integration', () => {
  it('should insert and fetch a trade record', async () => {
    const { data: insertData, error: insertError } = await supabase
      .from('trade_records')
      .insert([
        {
          user_id: 'test-user',
          symbol: 'AAPL',
          side: 'buy',
          entry_price: 100,
          pnl: 10,
          created_at: new Date().toISOString(),
        },
      ])
      .select();
    expect(insertError).toBeNull();
    expect(insertData).toBeTruthy();

    const { data: fetchData, error: fetchError } = await supabase
      .from('trade_records')
      .select('*')
      .eq('user_id', 'test-user');
    expect(fetchError).toBeNull();
    expect(fetchData?.length).toBeGreaterThan(0);
  });
});
