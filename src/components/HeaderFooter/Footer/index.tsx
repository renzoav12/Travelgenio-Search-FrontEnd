import React, { useState } from "react";
import { IFooterProps } from "../interfaces";

// Material UI
import { ArrowUpward } from "@material-ui/icons";
import { Container, Grid, Fab } from "@material-ui/core";

// Import i18n
import { i18n } from "./i18n";

// Components
import CountrySelector from "../CountrySelector";
import FooterLayout from "./components/FooterLayout";

// Styles
import "./styles.scss";

import facebook from '../img/TG/facebook-font.svg';
import imagesFooter from '../img/TG/images-footer.png';

const IFooter: React.SFC<IFooterProps> = (props): JSX.Element => {
  // Check with the real service response.
  if (props.initialData == null) return <React.Fragment />;

  return (
    <div className="footer-container">
      <Container maxWidth="lg" className="FABContainer">
        <Fab variant="round" aria-label="up" href="#">
          <ArrowUpward />
        </Fab>
      </Container>
      <div className="footer-container">
        <Container maxWidth="lg" className="footer">
          <Container maxWidth="lg" className="footer-lc">
            <Grid container item xs={12} sm={8} className="fb-icon">
              <Fab aria-label="facebook" href={props.initialData.optionParameters.facebookUrl}>
                <img src={facebook} alt={i18n.get("footer.facebook")} />
              </Fab>
            </Grid>
            <Grid container item xs={12} sm={4} className="country-selector">
              {props.initialData.optionParameters.enableSelectLanguage ? <CountrySelector countries={props.countries} currentSelection={props.initialData.currentSelection} /> : ""}
            </Grid>
          </Container>
          <FooterLayout i18n={i18n} initial={props.initialData} />
        </Container>
      </div>
      <div className="flags-container">
        <Container maxWidth="lg">
          <img src={imagesFooter} alt={i18n.get("footer.credit.cards")} />
        </Container>
      </div>
      <div className="disclaimer-container">
        <Container maxWidth="lg" className="footer-disclaimer">
          <h6>{i18n.get("footer.legals")}</h6>
        </Container>
      </div>
    </div>
  );
};

export default IFooter;
