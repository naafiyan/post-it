module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "screen/2": "50vh",
        "screen/5": "20vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "10vh": "10vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
