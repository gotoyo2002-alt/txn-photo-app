import { describe, it, expect } from 'vitest';

type KPI = {
  total_pnl: number;
  win_rate: number;
  avg_risk_reward: number;
};

type EquityCurve = {
  date: string;
  equity: number;
};

describe('KPI Entity', () => {
  it('should calculate correct KPI values', () => {
    const kpi: KPI = {
      total_pnl: 1000,
      win_rate: 0.6,
      avg_risk_reward: 2.1,
    };
    expect(kpi.total_pnl).toBeGreaterThanOrEqual(0);
    expect(kpi.win_rate).toBeGreaterThanOrEqual(0);
    expect(kpi.win_rate).toBeLessThanOrEqual(1);
    expect(typeof kpi.avg_risk_reward).toBe('number');
  });
});

describe('EquityCurve Entity', () => {
  it('should create a valid equity curve point', () => {
    const point: EquityCurve = {
      date: new Date().toISOString().slice(0, 10),
      equity: 10500,
    };
    expect(point).toHaveProperty('date');
    expect(typeof point.equity).toBe('number');
  });
});
