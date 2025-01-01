/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Main teal color
          600: '#059669',
          700: '#047857',
        },
        secondary: '#64748b',
        dark: '#1e293b',
        light: '#f8fafc',
        background: '#f0fdf4', // Slight teal tint to background
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(16, 185, 129, 0.1)',
      },
    },
  },
  plugins: [],
};
