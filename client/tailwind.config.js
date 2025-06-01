module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        glitch: "glitch 1.5s infinite",
        gradient: 'gradientBG 6s ease infinite',
      },
      keyframes: {
        glitch: {
          "0%": {
            transform: "translate(0)",
            textShadow: "2px 0 red, -2px 0 blue",
          },
          "50%": {
            transform: "translate(-2px, 2px)",
            textShadow: "-2px 0 green, 2px 0 yellow",
          },
          "100%": {
            transform: "translate(2px, -2px)",
            textShadow: "2px 0 purple, -2px 0 cyan",
          },
        },
        gradientBG: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
