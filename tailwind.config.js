module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        noto: `"Noto Sans TC", 微軟正黑體, "Microsoft JhengHei", "PingFang TC", sans-serif`,
      },
      colors: {
        friend: {
          primary: "#008cd6",
          gray: "#999999",
          normal: "#333333",
          major: "#000000",
          "selected-bg": "#dddddd",
          "selected-border": "#c4c4c4",
          red: "#f7243e",
        },
        "global-background": "#f0f4f9",
      },
    },
  },
  plugins: [],
};
