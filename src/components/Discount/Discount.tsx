import React, {FunctionComponent} from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface DiscountProps {
    percentage: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    percentage: {
      marginLeft: 0,
      padding: 0
    }
  }),
);
  
const Discount: FunctionComponent<DiscountProps> = props => {
    const classes = useStyles();

    const percentageNumber = () => {return props.percentage == "0" ?  " " 
            : "-" + props.percentage + "%";}

    return <Box className={classes.percentage}>
      <Box className={classes.percentage}>
        {percentageNumber()}
      </Box>
  </Box>
}


export default Discount;