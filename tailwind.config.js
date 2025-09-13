module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A202C', // 深邃科技藍
        accent: '#FBBF24', // 活力金
        profit: '#228B22', // 森林綠
        loss: '#DC143C', // 緋紅
      },
      fontFamily: {
        sans: ['Inter', 'Nunito Sans', 'sans-serif'],
        mono: ['Roboto Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
