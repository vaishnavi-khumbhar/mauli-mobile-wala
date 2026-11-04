/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#141416",      // headings / dark (logo black)
        blue: {
          DEFAULT: "#EE1450", // primary button (logo pink)
          deep: "#C20F42",
          soft: "#EE1450",
          light: "#F472A0",
        },
        gold: {
          DEFAULT: "#EE1450",
          muted: "#E5124B",
          champagne: "#FF8FB1",
        },
        ivory: "#FFF5F8",
        cream: "#FFFFFF",
        beige: "#F3E3E8",
        charcoal: "#252525",
        grey: "#6D6D6D",
        ink: "#1E1D1B",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
      },
      maxWidth: { site: "1280px" },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(20, 20, 22, 0.18)",
        card: "0 18px 40px -20px rgba(20, 20, 22, 0.28)",
      },
    },
  },
  plugins: [],
};
