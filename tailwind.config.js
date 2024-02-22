/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "lapis-shade": "#0076dc",
        heliotrope: "#7a1ba6",
      },
      backgroundImage: (theme) => ({
        "lapis-gradient":
          "linear-gradient(90deg, var(--lapis-shade) 0%, var(--heliotrope) 100%)",
        "eggplant-gradient":
          "linear-gradient(260.85deg, #7e5cef 10.29%, #002838 89.71%)",
      }),
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
