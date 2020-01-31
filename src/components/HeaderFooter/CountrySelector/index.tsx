import React from "react";
import { ICountrySelectorProps, InitialService as IS } from "../interfaces";

// Import Material UI
import { Select, MenuItem } from "@material-ui/core";

// Import SVG Logo
import { WorldLogo } from "../img/svg";

// Styles
import "./styles.scss";

const CountrySelector: React.SFC<ICountrySelectorProps> = (props) => {
  if (!props.countries || props.countries.length === 0) return null;
  return (
    <div className="language">
      <span className="world-logo">
        <WorldLogo />
      </span>
      <span className="select">
        <Select value={props.currentSelection.cultureCode} className="select-menu">
          {props.countries.map((country: IS.ICountry, index: number) => (
            <MenuItem key={index} value={country.cultureCode}>
              {country.id}
            </MenuItem>
          ))}
        </Select>
      </span>
    </div>
  );
};

export default CountrySelector;
