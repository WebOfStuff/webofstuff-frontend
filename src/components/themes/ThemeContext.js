import React from "react";

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(0)
  const [themeChanges, setThemeChanges] = React.useState(true)
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
