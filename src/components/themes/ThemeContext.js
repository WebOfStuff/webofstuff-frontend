import React from "react";

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(0)
  const [themeChanges, setThemeChanges] = React.useState(true)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { theme, setTheme,themeChanges, setThemeChanges}
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}


export const themes = [
/*   "light",
  "black",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate", */
  "synthwave",
  "mytheme",/* 
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "pastel",
  "wireframe", */
]


export const icons = ["🌝", "🏴", "🧁", "🐝", "✳️", "🏢", "🌃 ", "🤖", "🌸", "🎃", "🌷", "🌲", "🐟", "👓", "🖍 ",];


export function chooseRandomTheme(){
  let randomNumForTheme = Math.floor(Math.random() * themes.length);
  let theme = themes[randomNumForTheme]
  return theme
}

/* export const themes = {
  light: "light",
  black: "black",
  cupcake: "cupcake",
  bumblebee: "bumblebee",
  emerald: "emerald",
  corporate: "corporate",
  synthwave: "synthwave",
  cyberpunk: "cyberpunk",
  valentine: "valentine",
  halloween: "halloween",
  garden: "garden",
  forest: "forest",
  aqua: "aqua",
  pastel: "pastel",
  wireframe: "wireframe",
   
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  }, 
}; */
