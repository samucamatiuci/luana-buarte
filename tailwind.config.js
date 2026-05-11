/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0d0d0d",
        neonPink: {
          DEFAULT: "#ff1493",
          glow: "#ff69b4",
        },
      },
      boxShadow: {
        'neon': '0 0 5px #ff1493, 0 0 20px #ff1493',
        'neon-strong': '0 0 10px #ff1493, 0 0 40px #ff1493',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
