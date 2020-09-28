import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { Alert } from '@material-ui/lab';

import { Chip, Container, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import ApiFactory from '../../services/alphavintage-api';
import { BestMatches, BestMatchesEnum, DataTraceItemCustom, facebookBestMatch, generateDataTracesDomain, TimeSeriesDaily } from 'domain/Stock'
import { BasicError } from 'domain/Global'
import { useGlobalContext } from 'context/global/GlobalContext';
import { addCompaniesAction } from 'context/global/stocks/stocks-actions';
import logo from '../../assets/stock-market_1.png'
import { CustomPlot } from './CustomPlot';

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
    marginTop: 10
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 20,
    zIndex: -2,
    width: 300
  },
  img: {
    flex: 1,
    padding: 5,
    maxWidth: '25%'
  },
  linearProgress: {
    width: '70%'
  }
}));

export const Stocks = () => {
  const classes = useStyles();
  const fixedOptions: BestMatches[] = [facebookBestMatch];

  const [cookies, setCookie, removeCookie] = useCookies(['shoreline']);

  const [countDown, setCountDown] = useState<string>('');
  const [dataTraces, setDataTraces] = useState<DataTraceItemCustom[]>([]);
  const [searchedCompanies, setSearchedCompany] = useState<BestMatches[]>([]);
  const [errors, setErrors] = useState<BasicError[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    stocks: {
      companies
    },
    dispatch
  } = useGlobalContext();

  const generateDataTraces = async () => {
    try {
      if (cookies.shoreline) return;
      setLoading(true)
      let queryPromises: Promise<TimeSeriesDaily>[] = companies.map((item: BestMatches) => ApiFactory.getTimeSeriesDaily(item[BestMatchesEnum.symbol]!))
      let queryResponses: TimeSeriesDaily[] = await Promise.all(queryPromises);
      let withoutError = queryResponses.filter((item: TimeSeriesDaily) => !item.Note);

      if (queryResponses.length !== withoutError.length) {
        setErrors([{
          message: 'Thank you for using Shoreline! Our standard API call frequency is 5 calls per minute and 500 calls per day.'
        }])

        if (!cookies.shoreline) {
          setCookie('shoreline', moment().add(1, 'minutes'), {
            expires: moment().add(1, 'minutes').toDate()
          });

        }

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
    } catch (err) {
      setErrors([{
        message: 'Something went wrong, please try again'
      }])
    }
  }

  useEffect(() => {
    generateDataTraces();
  }, [companies]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (cookies.shoreline) {
      let countDownDate = moment(cookies.shoreline);

      let x = setInterval(function () {
        let diff = countDownDate.diff(moment());

        if (diff <= 0) {
          setCountDown(' ')
          clearInterval(x);
        } else
          setCountDown(moment.utc(diff).format("HH:mm:ss"))

      }, 1000);
    }
  }, [cookies]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (countDown === ' ') {
      removeCookie('shoreline');
      setErrors([])
    }
  }, [countDown]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTextInput = async (ev: any) => {
    try {
      ev.preventDefault();
      if (!ev.target[0].value) return;

      let query = ev.target[0].value
      let {
        bestMatches
      }: {
        bestMatches: BestMatches[]
      } = await ApiFactory.searchSymbols(query);

      setSearchedCompany(bestMatches);
    } catch (err) {
      setErrors([{
        message: 'Something went wrong, please try again'
      }])
    }
  }

  const handleAutoComplete = (newValue: BestMatches[]) => {
    dispatch(addCompaniesAction([
      ...newValue.filter((option: BestMatches) => fixedOptions.indexOf(option) === -1!),
    ]))
  }

  return (
    <div>
      <Container >
        <Grid
          container
          justify="space-around"
          item sm
          xs={12}
          alignContent="center"
          alignItems="center"
        >
          <img src={logo} className={classes.img} alt="logo" />
          <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={companies || []}
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
                <TextField
                  {...params}
                  id="filled-basic"
                  label="Search Company"
                  variant="outlined"
                  placeholder={`Search Company`} />
              </form>
            )}
          />
        </Grid>

        <Grid
          container
          justify="center"
          item sm
          xs={12}
          alignContent="center"
          alignItems="center"
        >
          <div>
            {errors && errors.map((item: BasicError) => (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrors([...errors.filter((err: BasicError) => item.message !== err.message)]);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="error">{item.message} </Alert>
            ))}
          </div>
          {cookies.shoreline ?
            <Alert severity="info">Api available again in {countDown}</Alert> : ''
          }
        </Grid>

        <CustomPlot
          loading={loading}
          dataTraces={dataTraces || []}
        />
      </Container>
    </div>
  );
}
