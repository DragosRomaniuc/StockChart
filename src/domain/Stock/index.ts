import moment from "moment";

export type BestMatches = {
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

export type MetaDataItem = {
  readonly '1. Information': string
  readonly '2. Symbol': string
  readonly '3. Last Refreshed': string
  readonly '4. Output Size': string
  readonly '5. Time Zone': string
}

export type TimeSeriesItem = {
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
    marker: {
      color: 'pink',
      size: 1
    },
    textinfo: 'label+text',
    text: item["Meta Data"]["2. Symbol"],
    hoverinfo: 'x+y+text',
  }

  return trace;
}

export const layout: any = {
  xaxis: {
    range: ['2010-02-17', moment().format('YYYY-MM-DD')],
    color: 'black',
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
    rangeslider: { range: ['2010-02-17', moment().format('YYYY-MM-DD')] },
    type: 'date'
  },
  yaxis: {
    color: 'black',
    autorange: true,
    range: [86.8700008333, 138.870004167],
    type: 'linear+marks'
  }
};

const findLastAvailableDate = (dataTrace: string[], date: string) => {
  let shouldSubtractMonth = false;
  for (let i = 0; i <= 6; i++) {
    let newDate = date.split('-');
    let day = newDate[2];
    let subtractOneDay: any = parseInt(day, 10) - i;
    if (Math.sign(subtractOneDay) === -1) {
      subtractOneDay = 0;
      shouldSubtractMonth = true
    }

    if (shouldSubtractMonth) {
      let month = newDate[1];
      let subtractOneMonth: any = parseInt(month, 10) - 1;
      if (Math.sign(subtractOneMonth) === -1) {
        subtractOneMonth = 0;
      }
      if (subtractOneMonth < 10) {
        subtractOneMonth = ('0' + subtractOneMonth).slice(-2)
      };
    }

    if (subtractOneDay < 10) {
      subtractOneDay = ('0' + subtractOneDay).slice(-2)
    };

    newDate[2] = subtractOneDay.toString();

    let modifiedDate: string = newDate.join('-');
    let dateIndex = dataTrace.indexOf(modifiedDate)

    if (dateIndex !== -1) {
      return dateIndex
    }
  }

  return 0
}

export type AverageObject = {
  readonly name?: string
  readonly average: number
}

export const getAverageValue = (items: DataTraceItemCustom[], range: string[]): AverageObject[] => {
  if (!range[0] || !range[1]) {
    return [{
      name: ' ',
      average: 0
    }]
  }
  const [first, second] = range.map((item) => moment(item).format('YYYY-MM-DD').split(' ')[0]);

  let averages = items.map((dataTrace: DataTraceItemCustom) => {
    let firstIndex = dataTrace.x.indexOf(first);

    let secondIndex = dataTrace.x.indexOf(second);

    if (secondIndex === -1) {
      if (firstIndex === -1) {
        secondIndex = findLastAvailableDate(dataTrace.x, second)
      } else {
        secondIndex = 0
      }
    }
    if (firstIndex === -1) {

      firstIndex = findLastAvailableDate(dataTrace.x, first)
      if (firstIndex === 0) firstIndex = dataTrace.x.length - 1
    }

    let newYArray = dataTrace.y.slice(secondIndex, firstIndex);

    if (newYArray) {
      let sum = newYArray.reduce((acc, curr) => { return acc + parseInt(curr, 10) }, 0);
      let average = sum / (firstIndex - secondIndex);
      return {
        name: dataTrace.name,
        average
      }
    }

    return {
      name: '',
      average: 0
    }
  });

  return averages
}