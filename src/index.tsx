import * as Sentry from "@sentry/browser";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import Root from "./components/Root/root";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Header, Footer} from "@hotels/header-footer";
import { brandStyle } from "@hotels/styles";
import { Provider } from 'react-redux';
Sentry.init({
  dsn:
    "https://fd1b27603c3f40bcaa68c84e54c23301@o332894.ingest.sentry.io/5216597",
});

const brand = window.location.hostname.split(".")[1];
const theme = createMuiTheme(brandStyle(brand ? brand : "travelgenio"));

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Header />
        <Root store={store} />
        <Footer />
      </Provider>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
