import { defineConfig } from 'vitest/config';
import path from 'path';
import fs from 'fs';

// 自動載入 src/.env.local
function loadDotenv() {
  const envPath = path.resolve(__dirname, 'src/.env.local');
  if (fs.existsSync(envPath)) {
    const env = fs.readFileSync(envPath, 'utf-8');
    env.split('\n').forEach(line => {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match) {
        process.env[match[1]] = match[2];
      }
    });
  }
}

loadDotenv();

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.ts'],
    include: [
      'src/**/*.test.{ts,tsx}',
      'tests/unit/**/*.test.{ts,tsx}',
      'tests/integration/**/*.test.{ts,tsx}'
    ],
    exclude: [
      'e2e/**',
      'tests/e2e/**',
      'tests/perf/**'
    ]
  }
});
