import React, { FunctionComponent } from "react";
import Pricing, { PricingProps } from "./Pricing/Pricing";
import Content, { ContentProps } from "./Content/Content";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export interface CardProps {
  id: string;
  content: ContentProps;
  pricing: PricingProps;
  selected: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginLeft: 0,
      padding: 0,
    },
    pricing: {
      [theme.breakpoints.up("xs")]: {
        borderLeftWidth: 1,
        borderLeftStyle: "solid",
        borderLeftColor: theme.palette.divider,
      },
      [theme.breakpoints.only("xs")]: {
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: theme.palette.divider,
      },
    },
  })
);

const Card: FunctionComponent<CardProps> = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.card}>
      <Grid container>
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <Content
            content={props.content}
            mealPlan={props.pricing.mealPlan}
          ></Content>
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={3} className={classes.pricing}>
          <Pricing {...props.pricing} selected={()=>{props.selected(props.id)}}></Pricing>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
