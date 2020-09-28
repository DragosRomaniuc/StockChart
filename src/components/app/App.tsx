import React from 'react';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { Routes } from './Routes';
import { GlobalContextProvider } from 'context/global/GlobalContextProvider';
import { appTheme } from 'config/style-config';

const theme = createMuiTheme(appTheme);

const App = (props: any) => {
  return (
    <div className="App">
      <CookiesProvider>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter >
            <GlobalContextProvider>
              <Routes />
            </GlobalContextProvider>
          </BrowserRouter>
        </MuiThemeProvider>
      </CookiesProvider>
    </div>
  );
};

export default App;