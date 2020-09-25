import React from 'react';
import ApiFactory from '../../services/alphavintage-api';
import Plot from 'react-plotly.js';

import { BestMatches, BestMatchesEnum, DataTraceItem, DataTraceItemCustom, extractXY, generateDataTracesDomain, layout, MetaDataItem, TimeSeriesDaily } from 'domain/Stock'
import { useGlobalContext } from 'context/global/GlobalContext';
import { addCompanyAction, addCompaniesAction } from 'context/global/stocks/stocks-actions';
import { Avatar, Chip, Container, Divider, Grid, makeStyles, Paper, Typography, TextField } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import logo from '../../assets/trading2.jpg'

import ErrorIcon from '@material-ui/icons/Error'
import TimerIcon from '@material-ui/icons/Timer'
import { PlotData } from 'plotly.js';
import { useCookies } from 'react-cookie';
import moment, { MomentInput } from 'moment';

import { setIntervalX } from 'utils/TimeUtils';



interface BasicError {
  message: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    marginTop: 30
  }
}));

export const Stocks = () => {
  const classes = useStyles();
  const [metaData, setMetaData] = React.useState();
  const fixedOptions: BestMatches[] = [{
    '1. symbol': "FB",
    '2. name': "Facebook Inc.",
    '3. type': "Equity",
    '4. region': "United States",
    '8. currency': "USD",
  }];


  const [cookies, setCookie, removeCookie] = useCookies(['shoreline']);
  const [value, setValue] = React.useState<any>([...fixedOptions]);

  const [timeLeft, setTimeLeft] = React.useState<MomentInput>()

  const [dataTraces, setDataTraces] = React.useState<DataTraceItemCustom[]>();
  const [searchedCompanies, setSearchedCompany] = React.useState<BestMatches[]>([]);
  const [errors, setErrors] = React.useState<BasicError[]>()

  const {
    stocks: {
      companies
    },
    dispatch
  } = useGlobalContext();

  React.useEffect(() => {
    dispatch(addCompaniesAction(value))
  }, [value])

  React.useEffect(() => {
    generateDataTraces();
  }, [companies]);

 
  const generateDataTraces = async () => {
    let queryPromises = companies.map((item: BestMatches) => ApiFactory.getTimeSeriesDaily(item[BestMatchesEnum.symbol]!))
    let queryResponses: TimeSeriesDaily[] = await Promise.all(queryPromises);
    let withoutError = queryResponses.filter((item: TimeSeriesDaily) => !item.Note);

    if (queryResponses.length !== withoutError.length) {
      setErrors([{
        message: 'Thank you for using Shoreline! Our standard API call frequency is 5 calls per minute and 500 calls per day.'
      }])

      let companiesWithoutApiError = value.filter((company: BestMatches) => withoutError.find((item: TimeSeriesDaily) => company["1. symbol"] === item["Meta Data"]["2. Symbol"]))
      dispatch(addCompaniesAction(companiesWithoutApiError))
      setValue(companiesWithoutApiError)
    } else {
      let dataTraces: DataTraceItemCustom[] = withoutError.map((item: TimeSeriesDaily) => generateDataTracesDomain(item));
      setDataTraces(dataTraces)
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
    // fixedOptions,
    ...newValue.filter((option: BestMatches) => fixedOptions.indexOf(option) === -1!),
  ]))
 }



  const handleDelete = () => {
    setErrors([])
  };

  console.log('cookies',cookies)
  // if (dataTraces) return null;

  return (
    <div className={classes.root}>

      <Grid container spacing={3}>
        <Grid container className={classes.container}
          justify="center"
          alignItems="center"
        >
          <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={companies}
            // onChange={(event, newValue) => {
            //   setValue([
            //     // fixedOptions,
            //     ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
            //   ]);
            // }}
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
            style={{ width: 500 }}
            renderInput={(params) => (
              <form onSubmit={handleTextInput}><TextField {...params} label="Search Company" variant="outlined" placeholder="Favorites" /></form>
            )}
          />


        </Grid>

        <Grid item xs={12}>
          <Plot
            data={dataTraces || []}
            layout={layout}
          // style={{position: 'absolute', bottom: '0', right: '0'}}
          />
        </Grid>

        <Grid item xs={12}>
         <div>
           {errors && errors.map((item: BasicError) => (
             <Chip
             icon={<ErrorIcon />}
             label={item.message}
             onDelete={handleDelete}
             color="primary"
             variant="outlined"
           />
           ))}
         </div>
          
        </Grid>
            {/* {cookies.shoreline && <Chip
             icon={<TimerIcon />}
             label={"Api calls timeout"}
            //  onDelete={handleDelete}
             color="primary"
             variant="outlined"
           />}
      {moment(timeLeft).format('mm:ss')} */}
      </Grid>
    </div>
  );
}
