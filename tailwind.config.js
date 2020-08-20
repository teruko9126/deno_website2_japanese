const defaultTheme = require("tailwindcss/defaultTheme"); // eslint-disable-line

module.exports = {
  theme: {
    fontFamily: {
      mono: [
        "Menlo",
        "Monaco",
        '"Lucida Console"',
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", "Noto Sans JP", ...defaultTheme.fontFamily.sans],
      },
      width: {
        "72": "18rem",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [require("@tailwindcss/ui"), require("tailwindcss-hyphens")],
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./components/**/*.tsx",
      "./pages/**/*.tsx",
      "./public/posts/*.json",
    ],
  },
};
