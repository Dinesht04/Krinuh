/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        
      },
      gridTemplateColumns:{
        'gallery':'repeat(auto-fit, minmax(250px, 1fr))',
      },
      fontFamily: {
        PlayfairDisplay: ['limelight', 'sans-serif'],
       },
    },
  },
  plugins: [],
};
