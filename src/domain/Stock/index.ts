export interface BestMatches {
  readonly '1. symbol'?: string
  readonly '2. name'?: string
  readonly '3. type'?: string
  readonly '4. region'?: string
  readonly '8. currency'?: string
}

export enum BestMatchesEnum {
  symbol = '1. symbol',
  name = '2. name',
  type = '3. type',
  region = '4. region?',
  currency = '8. currency?'
}

export interface MetaDataItem {
  readonly '1. Information': string
  readonly '2. Symbol': string
  readonly '3. Last Refreshed': string
  readonly '4. Output Size': string
  readonly '5. Time Zone': string
}

export interface TimeSeriesItem {
  readonly '1. open'?: string
  readonly '2. high'?: string
  readonly '3. low'?: string
  readonly '4. close'?: string
  readonly '5. volume'?: string
}

export interface TimeSeriesDaily {
  readonly 'Meta Data': MetaDataItem
  readonly 'Time Series (Daily)': TimeSeriesItem[]
  readonly 'Note'?: string
}

export interface DataTraceItem {
  x: string[]
  y: string[]
}

export interface DataTraceItemCustom extends DataTraceItem {
  readonly type: any
  readonly mode: any
  readonly name: any
  readonly line?: any
  readonly text?: any
  readonly hovertext?: any
  readonly hoverinfo?: any
  readonly title?: any
  readonly textinfo?: any

}

export const facebookBestMatch: BestMatches = {
  '1. symbol': "FB",
  '2. name': "Facebook Inc.",
  '3. type': "Equity",
  '4. region': "United States",
  '8. currency': "USD",
};

export const extractXY = (data: any): DataTraceItem => {
  const x: string[] = Object.keys(data);
  const y: string[] = Object.keys(data).map((item: string) => {
    let key: any = Object.keys(data[item])[0];
    return data[item][key];
  })

  return {
    x, y
  }
}

export const generateDataTracesDomain = (item: TimeSeriesDaily): DataTraceItemCustom => {
  const { x, y } = extractXY(item["Time Series (Daily)"]);
  const trace = {
    x,
    y,
    type: "scatter",
    mode: "lines",
    name: item["Meta Data"]["2. Symbol"],
    line: {
      color: 'rgb(55, 128, 191)',
      width: 1
    },
    textinfo: 'label+text',
    text: item["Meta Data"]["2. Symbol"],
    hoverinfo: 'x+y+text',
  }

  return trace;
}

export const layout: any = {
  title: 'Shoreline Stock Market Chart',
  xaxis: {
    // autorange: true,
    color: '#7f7f7f',
    range: ['2010-02-17', Date.now()],
    rangeselector: {
      buttons: [
        {
          count: 1,
          label: '1m',
          step: 'month',
          stepmode: 'backward'
        },
        {
          count: 6,
          label: '6m',
          step: 'month',
          stepmode: 'backward'
        },
        { step: 'all' }
      ]
    },
    rangeslider: { range: ['2015-02-17', Date.now()] },
    type: 'date'
  },
  yaxis: {
    color: '#7f7f7f',
    autorange: true,
    range: [86.8700008333, 138.870004167],
    type: 'linear'
  },
  height: 500,
  showlegend: false,
};