import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import { Container, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';

import { AverageObject, DataTraceItemCustom, getAverageValue, layout } from 'domain/Stock'
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10
  },
  linearProgress: {
    width: '70%'
  }
}));

interface CustomPlotProps {
  readonly loading: boolean
  readonly dataTraces: DataTraceItemCustom[]
}

export const CustomPlot = ({
  loading,
  dataTraces
}: CustomPlotProps) => {
  const classes = useStyles();

  const [selectedRange, setSelectedRange] = useState<any[]>([moment('2010-02-17').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
  const [averages, setAverages] = useState<AverageObject[]>([{
    name: '',
    average: 0
  }]);

  useEffect(() => {
    let average: AverageObject[] = getAverageValue(dataTraces, selectedRange);

    setAverages(average)
  }, [selectedRange])

  const handleRelayout = (item: any) => {
    if (item['xaxis.range']) {
      setSelectedRange(item['xaxis.range'])
    } else {
      const keys: any = Object.keys(item);
      let dateRange = keys.map((key: any) => {
        console.log(item[key]);
        return item[key];
      });

      if (dateRange.length === 2) setSelectedRange(dateRange)
    }
  };

  if (loading) return (
    <Grid container justify="center" className={classes.container}>
      <LinearProgress className={classes.linearProgress} />
      <LinearProgress color="primary" className={classes.linearProgress} />
    </Grid>
  )

  return (
    <Container fixed>

      <Plot
        data={dataTraces || []}
        layout={layout}
        config={{
          // responsive: true,
          autosizable: true,
        }}
        onRelayout={(event: any) => handleRelayout(event)}

      />

      <Grid
        item
        container
        justify="center"
        alignItems="center"
        direction="column"
        xs={12}
      >
        <Typography style={{ padding: 10 }} variant="h4" component="h4" color="primary">
          Selected Range
        </Typography>
        <Grid container
          justify="center"
          alignItems="center"

          item xs={12}
          direction="row">

          {selectedRange.map((date: string, index: number) =>
            <Typography key={index} style={{ padding: 10 }} variant="h6" component="h6" >
              {moment(date).format('YYYY-MMMM-DD')}
            </Typography>
          )}
        </Grid>

        {averages.map((item: AverageObject, index: number) =>
          <Typography key={index} style={{ padding: 10 }} variant="h6" component="h6" color="secondary" >
            Average for {item.name} : {item.average.toFixed(3)}
          </Typography>
        )}
      </Grid>



    </Container>
  )

}
