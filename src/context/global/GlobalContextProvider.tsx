import React, { useReducer, ReactNode } from 'react';

import { globalReducer, GlobalState, initialState } from './global-reducer';
import { GlobalContext } from './GlobalContext';

export const GlobalContextProvider = (props: { children: ReactNode }) => {
  const [state, dispatch]: [GlobalState, any]= useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  )
};