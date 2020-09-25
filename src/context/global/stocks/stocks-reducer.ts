import { BestMatches, BestMatchesEnum } from 'domain/Stock';
import { StocksAction, StocksActionType } from './stocks-actions';

export interface StocksState {
  companies: BestMatches[]
};

export const stocksInitialState: StocksState = {
  companies: [
    {
      '1. symbol': "FB",
      '2. name': "Facebook Inc.",
      '3. type': "Equity",
      '4. region': "United States",
      '8. currency': "USD",
    }
  ]
};

export const stocksReducer = (
  state: StocksState,
  action: StocksAction
): StocksState => {
  switch (action.type) {
    case StocksActionType.ADD_COMPANY:
      let index = state.companies.findIndex(el => el[BestMatchesEnum.symbol] == action.payload.company[BestMatchesEnum.symbol]);

      if (index == -1) {
        return {
          companies: [...state.companies, action.payload.company]
        }
      };

      return state;
    case StocksActionType.ADD_COMPANIES:
      return {
        companies: [...action.payload.companies]
      };
    default:
      return state;
  }
}