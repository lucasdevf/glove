/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#129E3F',
      },
    },
    fontFamily: {
      heading: 'Montserrat_600SemiBold',
      subtitle: 'Montserrat_500Medium',
      body: 'Montserrat_400Regular',
    },
  },
  plugins: [],
}
