export interface ConfigurationParameters {
  apiKey?: string | ((name: string) => string);
  basePath?: string;
}

export class Configuration {
  /**
   * parameter for apiKey security
   * @param name security name
   * @memberof Configuration
   */
  apiKey?: string | ((name: string) => string);
  
  /**
   * override base path
   * 
   * @type {string}
   * @memberof Configuration
   */
  basePath?: string;

  constructor(param: ConfigurationParameters = {}) {
      this.apiKey = param.apiKey;
      this.basePath = param.basePath;
  }
}
