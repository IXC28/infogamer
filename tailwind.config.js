/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // Permite que se respeten estilos inline (por ejemplo, text-align)
            p: { textAlign: 'inherit' },
            ul: {
              listStyleType: "disc",
              marginLeft: "1.5rem",
            },
            ol: {
              listStyleType: "decimal",
              marginLeft: "1.5rem",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('tailwind-scrollbar-hide')
  ],
};