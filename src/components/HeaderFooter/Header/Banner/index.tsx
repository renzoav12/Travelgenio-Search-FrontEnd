import React from "react";
import { Container } from "@material-ui/core";
import { IBannerProps } from "../../interfaces";
import CountrySelector from "../../CountrySelector";
import CurrencySelector from "./CurrencySelector";

// Import TG Logo
import { TGLogo } from "../../img/svg";

// Styles
import './styles.scss'; 

const Banner: React.SFC<IBannerProps> = (props): JSX.Element => {
  const { initialData } = props;
  return (
    <div className="banner">
      <Container maxWidth="lg" className="banner-content">
        <span className="logo">
          <TGLogo height={"44px"} />
        </span>
        <div className="banner-selectors">
          <CountrySelector countries = {props.countries} currentSelection={props.initialData.currentSelection}/>
          <CurrencySelector currencies = {props.currencies} initialData={initialData} />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
