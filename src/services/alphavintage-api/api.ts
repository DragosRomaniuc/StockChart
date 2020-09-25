import * as url from 'url';
import { baseRequestService } from '../baseRequestService';

import { Configuration } from "./configuration";

const BASE_PATH = "https://www.alphavantage.co/query?".replace(/\/+$/, "");

export interface FetchArgs {
  readonly url?: string
  readonly options: any;
}

export class RequiredError extends Error {
  name: "RequiredError"
  constructor(public field: string, msg?: string) {
    super(msg);
  }
}

export const AVApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    getTimeSeriesDaily(symbol: string, outputsize?: string, datatype?: string, options: any = {}): FetchArgs {
      if (!symbol) {
        throw new RequiredError('symbol', 'Required parameter symbol was null or undefined when calling getTimesSeriesDaily');
      }

      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarQueryParameter = {} as any;

      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = configuration.apiKey;
        localVarQueryParameter["apikey"] = localVarApiKeyValue;
        localVarQueryParameter["basePath"] = configuration.basePath
      }

      localVarRequestOptions['params'] = {
        apikey: localVarQueryParameter.apikey
      }

      localVarRequestOptions['params']['function'] = 'TIME_SERIES_DAILY'

      if (symbol) {
        localVarRequestOptions['params']['symbol'] = symbol
      };

      if (outputsize) {
        localVarRequestOptions['params']['outputsize'] = outputsize
      }

      if (datatype) {
        localVarRequestOptions['params']['datatype'] = datatype
      }

      return {
        url: '',
        options: localVarRequestOptions
      }
    },
    searchSymbols(keywords: string, datatype?: string, options: any = {}): FetchArgs {
      if (!keywords) {
        throw new RequiredError('keywords', 'Required parameter keywords was null or undefined when calling searchSymbols');
      }

      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarQueryParameter = {} as any;

      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = configuration.apiKey;
        localVarQueryParameter["apikey"] = localVarApiKeyValue;
        localVarQueryParameter["basePath"] = configuration.basePath
      }

      localVarRequestOptions['params'] = {
        apikey: localVarQueryParameter.apikey
      }

      if (keywords) {
        localVarRequestOptions['params']['keywords'] = keywords
      }

      localVarRequestOptions['params']['function'] = 'SYMBOL_SEARCH'


      if (datatype) {
        localVarRequestOptions['params']['datatype'] = datatype
      }

      return {
        url: '',
        options: localVarRequestOptions
      }
    }
  }
}

const AVApiFp = function (configuration?: Configuration) {
  return {
    getTimeSeriesDaily(symbol: string, outputsize?: string, datatype?: string, options?: any): (basePath?: string) => Promise<any> {
      const localVarFetchArgs = AVApiFetchParamCreator(configuration).getTimeSeriesDaily(symbol, outputsize, datatype, options);

      return (basePath: string = BASE_PATH) => {
        return baseRequestService(basePath + localVarFetchArgs.url, localVarFetchArgs.options)
          .catch(err => {
            throw err
          })
      };
    },
    searchSymbols(keywords: string, datatype?: string, options?: any): (basePath?: string) => Promise<any> {
      const localVarFetchArgs = AVApiFetchParamCreator(configuration).searchSymbols(keywords, datatype, options);

      return (basePath: string = BASE_PATH) => {
        return baseRequestService(basePath + localVarFetchArgs.url, localVarFetchArgs.options)
          .catch(err => {
            throw err
          })
      };
    },
  }
}

export const AVApiFactory = (configuration?: Configuration, basePath?: string) => {
  return {
    getTimeSeriesDaily(symbol: string, outputsize: string = 'compact', datatype?: string, options?: any) {
      return AVApiFp(configuration).getTimeSeriesDaily(symbol, outputsize, datatype, options)(basePath)
    },
    searchSymbols(keywords: string, datatype?: string, options?: any) {
      return AVApiFp(configuration).searchSymbols(keywords, datatype, options)(basePath)
    }
  }
}