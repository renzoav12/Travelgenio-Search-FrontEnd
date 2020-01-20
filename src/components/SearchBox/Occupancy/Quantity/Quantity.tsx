import React, { FunctionComponent, MouseEvent } from 'react';
import {RemoveCircleOutline, AddCircleOutline}  from '@material-ui/icons';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface QuantityProp {
  title: string;
  subtitle: string;
  quantity: number;
  min?: number;
  max?: number;
  increase: () => void;
  decrease: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    occupancyQuantity: {
      display: "flex",
      "justifyContent": "space-between",
      "marginTop": 10
    },
    occupancyQuantityTitle: {
      color: "black"
    },
    occupancyQuantitySubtitle: {
      color: "grey",
      fontSize: 10
    },
    occupancyQuantityNumbers: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      minWidth: 90
    },
    occupancyQuantityButton: {
      cursor: "pointer",
      color: theme.palette.primary.main,
      textAlign: "center"
    }
  }),
);


const Quantity: FunctionComponent<QuantityProp> = props => {
  
  const classes = useStyles();
  
  const increase = (event: MouseEvent<HTMLDivElement>):void => {
    event.preventDefault();

    if(props.max === undefined || props.quantity < props.max) {
      props.increase();
    }
  }

  const decrease = (event: MouseEvent<HTMLDivElement>):void => {
    event.preventDefault();

    if(props.min === undefined || props.quantity > props.min) {
      props.decrease();
    }
  }

  return <Box className={classes.occupancyQuantity}>
    <Box>
      <Box className={classes.occupancyQuantityTitle}>{props.title}</Box>
      <Box className={classes.occupancyQuantitySubtitle}>{props.subtitle}</Box>
    </Box>
    <Box className={classes.occupancyQuantityNumbers}>
      <Box className={classes.occupancyQuantityButton} onClick={decrease}><RemoveCircleOutline/></Box>
      <Box>{props.quantity}</Box>
      <Box className={classes.occupancyQuantityButton} onClick={increase}><AddCircleOutline/></Box>
    </Box>
  </Box>;
}

export default Quantity;