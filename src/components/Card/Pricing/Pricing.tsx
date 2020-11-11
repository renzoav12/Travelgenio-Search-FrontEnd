import React, { FunctionComponent } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { MealPlanProps } from "@hotels/mealplan";
import Discount, { DiscountProps } from "../../Discount/Discount";
import Keys from "@hotels/translation-keys";
import Translate from "@hotels/translation";

export interface PricingProps {
  id: string;
  nightlyPrice: Price;
  stayPrice: Price;
  strikethroughPrice: Price;
  mealPlan: MealPlanProps;
  discount: DiscountProps;
  selected: () => void;
}

interface Price {
  amount: Number;
  currency: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    strikeoutPrice: {
      textDecoration: "line-through",
    },
    stayPrice: {
      color: theme.palette.primary.main,
      fontSize: "20pt",
      fontWeight: "bold",
    },
    price_total: {
      [theme.breakpoints.down("sm")]:{
        justifyContent:"flex-end",
        float: "right",
        paddingBottom: "7px"
      },
           
    },
    nightlyPrice: {
      fontSize: "10pt",
    },
    pricing: {
      padding: 10,
    },
    detail: {
      marginTop: 30,
    },
  })
);

const Pricing: FunctionComponent<PricingProps> = (props) => {
  const classes = useStyles();

  const strikeThroughPrice = () => {
    return props.stayPrice.amount !== props.strikethroughPrice.amount ||
      props.stayPrice.currency !== props.strikethroughPrice.currency
      ? props.strikethroughPrice.amount +
          " " +
          props.strikethroughPrice.currency
      : null;
  };

  return (
    <Box className={classes.pricing}>
      
      <Box className={classes.price_total}>
          <Discount {...props.discount} />
          <Box className={classes.strikeoutPrice}>{strikeThroughPrice()}</Box>
          <Box className={classes.stayPrice}>
            {props.stayPrice.amount} {props.stayPrice.currency}
          </Box>
          <Box className={classes.nightlyPrice}>
            {props.nightlyPrice.amount} {props.nightlyPrice.currency}{" "}
            <Translate tkey={Keys.search.by_night} />
          </Box>
      </Box>
      <Box className={classes.detail}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={props.selected}
        >
          <Translate tkey={Keys.search.see_detail} />
        </Button>
      </Box>
    </Box>
  );
};

export default Pricing;
