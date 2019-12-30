import React, { FunctionComponent } from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface PricingProps {
    id: string;
    nightlyPrice: Price;
    stayPrice: Price;
    strikethroughPrice: Price;
    selected: () => void;
};

interface Price {
    amount: Number;
    currency: string
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    strikeoutPrice: {
      textDecoration: "line-through"
    },
    stayPrice: {
      color: theme.palette.primary.main,
      fontSize: "20pt",
      fontWeight: "bold"
    },
    nightlyPrice: {
      fontSize: "10pt"
    },
    pricing: {
      padding: 10
    },
    detail: {
      marginTop: 30
    }
  }),
);

const Pricing: FunctionComponent<PricingProps> = props => {
  const classes = useStyles();

  const strikeThroughPrice = () => {return (props.stayPrice.amount !== props.strikethroughPrice.amount 
    || props.stayPrice.currency !== props.strikethroughPrice.currency)
        ? props.strikethroughPrice.amount + " " + props.strikethroughPrice.currency
        : null;}

  return <Box className={classes.pricing}>
      <Box className={classes.strikeoutPrice}>
        {strikeThroughPrice()}
      </Box>
      <Box  className={classes.stayPrice}>
          {props.stayPrice.amount} {props.stayPrice.currency} 
      </Box>
      <Box className={classes.nightlyPrice}>
          {props.nightlyPrice.amount} {props.nightlyPrice.currency} por noche.
      </Box>
      <Box className={classes.detail}>
          <Button variant="contained" color="primary" fullWidth onClick={props.selected}>Ver detalle</Button>
      </Box>
  </Box>;
}

export default Pricing;
