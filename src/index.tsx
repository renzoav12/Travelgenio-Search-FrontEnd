import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import Root from './components/Root/root';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Header, { initialData as headerInitialData, countries, currencies } from '@hotels/header';
import Footer, { initialData as footerInitialData, subscribeEmail } from '@hotels/footer';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: "#1D54C1",
        dark: ' #0B3994',
        contrastText: "#FFFFFF",
    },
    background: {
      default: "#E5E5E5"
    },
    text: {
      primary: "#3D4355"
    },
    divider: "#C0C6D1"
  },
  typography: {
    fontFamily: "Open Sans",
    fontSize: 14,
    h1: {
      fontSize: 18,
      fontWeight: "bold"
    },
    h2: {
      fontSize: 16,
      fontWeight: 600
    }
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: 20,
        borderStyle: "solid",
        border: "1px",
        borderColor: "#C0C6D1"
      },
      elevation1: {
        boxShadow: "none"
      }
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header initialData={headerInitialData} countries={countries} currencies={currencies} />
      <Root store={store} />
      <Footer initialData={footerInitialData} countries={countries} subscribeEmail={subscribeEmail}/>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();