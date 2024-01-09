/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        darkorange: "#fb7306",
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
      },
      borderRadius: {
        "13xl": "32px",
      },
    },
    fontSize: {
      "8xl": "27px",
      "13xl": "32px",
      "10xl": "29px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
