import React, { createContext, useReducer, useContext } from "react";

export const state = createContext();

export const Context = ({ reducer, initialState, children }) => (
  <state.Provider value={useReducer(reducer, initialState)}>
    {children}
  </state.Provider>
);

export const StateValue = () => useContext(state);
