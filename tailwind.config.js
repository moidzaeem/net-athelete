/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { spacing: { 7.5: "1.875rem", 15: "3.75rem", 50: "12.5rem" } },
  },
  plugins: [],
};
