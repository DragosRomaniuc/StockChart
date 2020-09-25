import { createContext, Dispatch, useContext } from 'react';

import { GlobalState, initialState} from './global-reducer';
import { Action } from '../Action';

export interface GlobalContextValue extends GlobalState {
  dispatch: Dispatch<Action>
};

export const GlobalContext = createContext<GlobalContextValue>({
  ...initialState,
  dispatch: () => {}
});

export const useGlobalContext = (): GlobalContextValue =>
  useContext(GlobalContext);
