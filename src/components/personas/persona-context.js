import React from "react";

export const personas = {
  main: "main",
};


export const PersonaContext = React.createContext({
    persona: personas.main,
    setPersona: () => {}
});

