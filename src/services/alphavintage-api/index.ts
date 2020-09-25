import { Configuration } from './configuration'
import { AVApiFactory } from './api';

const config = new Configuration({
  apiKey: 'PBZQEWAEXCFONYE9',
  basePath: 'https://www.alphavantage.co/query?'
})

const ApiFactory = AVApiFactory(config)

export default ApiFactory;