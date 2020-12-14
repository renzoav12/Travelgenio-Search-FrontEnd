import * as Sentry from "@sentry/browser";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import Root from "./components/Root/root";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Header, Footer} from "@hotels/header-footer";
import createTheme from "@hotels/styles";
import { Provider } from 'react-redux';
import { createMuiTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

Sentry.init({
  dsn:
    "https://fd1b27603c3f40bcaa68c84e54c23301@o332894.ingest.sentry.io/5216597",
});

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 760,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {

  const xs_down = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <MuiThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Provider store={store}>
        <Header />
        <Root store={store} />
        {xs_down === true ? "" : <Footer />}
      </Provider>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
