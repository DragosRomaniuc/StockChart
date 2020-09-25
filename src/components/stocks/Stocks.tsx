import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useCookies } from 'react-cookie';
import moment, { MomentInput } from 'moment';

import { ButtonBase, Chip, Grid, LinearProgress, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ApiFactory from '../../services/alphavintage-api';
import { BestMatches, BestMatchesEnum, DataTraceItemCustom, generateDataTracesDomain, layout, TimeSeriesDaily } from 'domain/Stock'
import { BasicError } from 'domain/Global'
import { useGlobalContext } from 'context/global/GlobalContext';
import { addCompaniesAction } from 'context/global/stocks/stocks-actions';
import logo from '../../assets/trading.jpg'
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    marginTop: 30
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 20,
    zIndex: -2,
    width: 300
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export const Stocks = () => {
  const classes = useStyles();
  const fixedOptions: BestMatches[] = [{
    '1. symbol': "FB",
    '2. name': "Facebook Inc.",
    '3. type': "Equity",
    '4. region': "United States",
    '8. currency': "USD",
  }];

  const [cookies, setCookie, removeCookie] = useCookies(['shoreline']);

  const [dataTraces, setDataTraces] = useState<DataTraceItemCustom[]>();
  const [searchedCompanies, setSearchedCompany] = useState<BestMatches[]>([]);
  const [errors, setErrors] = useState<BasicError[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    stocks: {
      companies
    },
    dispatch
  } = useGlobalContext();

  useEffect(() => {
    generateDataTraces();
  }, [companies]);


  const generateDataTraces = async () => {
    setLoading(true)
    let queryPromises = companies.map((item: BestMatches) => ApiFactory.getTimeSeriesDaily(item[BestMatchesEnum.symbol]!))
    let queryResponses: TimeSeriesDaily[] = await Promise.all(queryPromises);
    let withoutError = queryResponses.filter((item: TimeSeriesDaily) => !item.Note);

    if (queryResponses.length !== withoutError.length) {
      setErrors([{
        message: 'Thank you for using Shoreline! Our standard API call frequency is 5 calls per minute and 500 calls per day.'
      }])

      if (!cookies.shoreline) setCookie('shoreline', moment().add(1, 'minutes'), {
        expires: moment().add(1, 'minutes').toDate()
      });

      let companiesWithoutApiError = companies.filter((company: BestMatches) =>
        withoutError.find((item: TimeSeriesDaily) => company["1. symbol"] === item["Meta Data"]["2. Symbol"])
      )

      dispatch(addCompaniesAction(companiesWithoutApiError))
      setLoading(false)

    } else {

      let dataTraces: DataTraceItemCustom[] = withoutError.flatMap((item: TimeSeriesDaily) =>
        item["Time Series (Daily)"] ? generateDataTracesDomain(item) : []
      );

      setDataTraces(dataTraces)
      setLoading(false)
    }
  }


  const handleTextInput = async (ev: any) => {
    ev.preventDefault();
    if (!ev.target[0].value) return;

    let query = ev.target[0].value
    let {
      bestMatches
    }: {
      bestMatches: BestMatches[]
    } = await ApiFactory.searchSymbols(query);

    setSearchedCompany(bestMatches);
  }

  const handleAutoComplete = (newValue: BestMatches[]) => {
    dispatch(addCompaniesAction([
      ...newValue.filter((option: BestMatches) => fixedOptions.indexOf(option) === -1!),
    ]))
  }

  return (
    <div>
      <Grid container direction="column" justify="center" >

        <Grid
          // spacing={10}
          container
          justify="center"
          item sm
          xs={12}
          className={classes.container}
          alignContent="center"
          alignItems="center"
        >

          <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={companies}
            disabled={!!cookies.shoreline}
            onChange={(event, newValue) => handleAutoComplete(newValue)}
            options={searchedCompanies}
            getOptionLabel={(option: BestMatches) => option["2. name"]!}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option["1. symbol"]}
                  {...getTagProps({ index })}
                  disabled={fixedOptions.indexOf(option) !== -1}
                />
              ))
            }
            style={{ minWidth: '50vw' }}
            renderInput={(params) => (
              <form onSubmit={handleTextInput}>
                <TextField {...params} label="Search Company" variant="outlined" placeholder={`Search Company`} />
              </form>
            )}
          />
        </Grid>

        <Grid
          container
          justify="center"
          item sm
          xs={12}
          className={classes.container}
          alignContent="center"
          alignItems="center"
        >
          <div>
            {errors && errors.map((item: BasicError) => (
              <Alert severity="error">{item.message} </Alert>
            ))}
          </div>
          {cookies.shoreline &&
            <Alert severity="info">Api available again in {moment(cookies.shoreline).fromNow()}</Alert>
          }
        </Grid>

        {loading ? <Grid>
          <LinearProgress />
          <LinearProgress color="primary" /> </Grid> :
          <Grid item><Plot
            data={dataTraces || []}
            layout={layout}
            config={{
              responsive: true,
              fillFrame: true,
              // frameMargins: 100,
              autosizable: true,
              // editable: false,
              showSources: true
            }}
            style={{paddingBottom: 100, marginBottom: 50}}
          />
          </Grid>
        }
      </Grid>
    </div>
  );
}
