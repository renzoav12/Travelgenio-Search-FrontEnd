import React from "react";
import { ICurrencySelectorProps, InitialService as IS } from "../../../interfaces";

// Import Material UI
import { Select, MenuItem } from "@material-ui/core";

// Import SVG Logo
import { CurrencyLogo } from "../../img/svg";

// Styles
import "./styles.scss";

const CurrencySelector: React.SFC<ICurrencySelectorProps> = (props) => {
  const { initialData } = props;
  if (!props.currencies || props.currencies.length === 0 ||
    !initialData.optionParameters.enableSelectCurrencies) return null;
  return (
    <div className="currency">
      <span className="currency-logo">
        <CurrencyLogo />
      </span>
      <span className="select">
        <Select value={props.initialData.currentSelection.currencyCode} className="select-menu">
          {props.currencies.map((currency: IS.ICurrency, index: number) => (
            <MenuItem key={index} value={currency.code}>
              {currency.name} ({currency.symbol})
              </MenuItem>
          ))}
        </Select>
      </span>
    </div>
  );
};

export default CurrencySelector;
