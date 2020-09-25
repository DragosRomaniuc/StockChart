import { BestMatches } from 'domain/Stock';
import { Action } from '../../Action';

export enum StocksActionType {
  ADD_COMPANY = 'ADD_COMPANY',
  ADD_COMPANIES = 'ADD_COMPANIES'
}

export interface AddCompanyAction extends Action {
  type: StocksActionType.ADD_COMPANY,
  payload: {
    company: BestMatches
  }
}

const addCompanyAction = (
  company: BestMatches
): AddCompanyAction => ({
  type: StocksActionType.ADD_COMPANY,
  payload: {
    company
  }
})

export interface AddCompaniesAction extends Action {
  type: StocksActionType.ADD_COMPANIES,
  payload: {
    companies: BestMatches[]
  }
}

const addCompaniesAction = (
  companies: BestMatches[]
): AddCompaniesAction => ({
  type: StocksActionType.ADD_COMPANIES,
  payload: {
    companies
  }
})

export type StocksAction = AddCompanyAction | AddCompaniesAction

export {
  addCompanyAction,
  addCompaniesAction
};