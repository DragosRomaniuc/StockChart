import { GenericObject } from 'utils/GenericObject';
import { AnyAction } from '../AnyAction';
import { stocksInitialState, stocksReducer, StocksState } from './stocks/stocks-reducer';

export interface GlobalState {
  stocks: StocksState
}

export const initialState: GlobalState = {
  stocks: stocksInitialState
};

export const globalReducer = (
  state: GlobalState,
  action: AnyAction
) : GlobalState => {
  const { stocks } = state;

  return {
    stocks: stocksReducer(stocks, action)
  }
};
