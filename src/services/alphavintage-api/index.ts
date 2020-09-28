import { AVApiFactory } from './api';

const config = {
  apiKey: 'PBZQEWAEXCFONYE9',
  basePath: 'https://www.alphavantage.co/query?'
}

const ApiFactory = AVApiFactory(config)

export default ApiFactory;