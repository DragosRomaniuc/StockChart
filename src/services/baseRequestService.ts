import axios, { AxiosRequestConfig } from 'axios';

const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray = isParamTypeObject && (params[key].length >= 0);

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {      
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const baseRequestService = async (
  endpoint: string,
  options: AxiosRequestConfig
): Promise<any> => {
    try {
      if (!endpoint || !options?.method) {
        return Promise.reject("Please enter endpoint")
      };

      if (options.method === 'GET') {

        options['paramsSerializer'] = params => {
          return  parseParams(params)
        }
      }

      return axios(endpoint, options).then(response=> {
        return response.data
      })
    } catch (err) {
      
      console.log('err', err)
      return Promise.reject(err);
    }
 
};

export {
  baseRequestService
};
