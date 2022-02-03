import {useState, useRef } from 'react';

export function useStateCollection(states, initialValue, name, setter) {
  const [state, setState] = useState(initialValue);
  states[name] = state
  states[setter] = setState
  return [state, setState];
}