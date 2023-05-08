/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'head-pattern': "url('/src/assets/img/head-pattern.png')",
        'location-pattern': "url('/src/assets/img/location-pattern.png')",
        'partner-pattern': "url('/src/assets/img/partner-pattern.png')",
      }
    },
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
    require("daisyui"),
    require('tailwind-scrollbar-hide')
  ]
}