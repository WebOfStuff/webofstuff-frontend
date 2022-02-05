import React from "react";

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
export const themes = [
  "light",
  "black",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "pastel",
  "wireframe",
]


export const icons = ["🌝", "🏴", "🧁", "🐝", "✳️", "🏢", "🌃 ", "🤖", "🌸", "🎃", "🌷", "🌲", "🐟", "👓", "🖍 ",];

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const [state, dispatch] = React.useState("light")
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}


/* 

export function createThemeContext(themeToSet, setTheme) {
  return React.createContext({
   theme: themes.themeToSet ,
   setTheme: setTheme
  });
 }
 */
