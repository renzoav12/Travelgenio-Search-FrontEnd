import * as Sentry from "@sentry/browser";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import Root from "./components/Root/root";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header, {
  initialData as headerInitialData,
  countries,
  currencies,
} from "@hotels/header";
import Footer, {
  initialData as footerInitialData,
  subscribeEmail,
} from "@hotels/footer";
import { travelgenioTheme } from "@hotels/styles";

Sentry.init({
  dsn:
    "https://fd1b27603c3f40bcaa68c84e54c23301@o332894.ingest.sentry.io/5216597",
});

const theme = createMuiTheme(travelgenioTheme);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        initialData={headerInitialData}
        countries={countries}
        currencies={currencies}
      />
      <Root store={store} />
      <Footer
        initialData={footerInitialData}
        countries={countries}
        subscribeEmail={subscribeEmail}
      />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
