import React from "react";
const PersonaContext = React.createContext()

export function PersonaProvider({ children }) {
  const [personas, setPersonas] = React.useState(0)
  const [personasChange, setPersonasChange] = React.useState(false)
  const [firstPersonaCreated, setFirstPersonaCreated]  = React.useState(false)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { personas, setPersonas, personasChange, setPersonasChange, firstPersonaCreated, setFirstPersonaCreated}
  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
}

export function usePersonas() {
  const context = React.useContext(PersonaContext)
  if (context === undefined) {
    throw new Error('usePersonas must be used within a PersonaProvider')
  }
  return context
}

