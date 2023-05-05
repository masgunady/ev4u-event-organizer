/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daishyui:{
    themes:[
      {
        defaultTheme:{
          "primary":"#4c3f91",
          "secondary":"#373a42",
          "accent":"#ff3d71",
          "neutral":"#c1c5d0",
          "info":"#F4F7FF",
          "success":"#3366FF",
          "error":"#ff0000",
        }
      }
    ]
  },
  plugins: [
    require("daisyui")
  ],
}