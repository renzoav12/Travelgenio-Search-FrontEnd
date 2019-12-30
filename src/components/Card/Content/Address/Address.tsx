import React, {FunctionComponent} from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface AddressProps {
    city: string;
    state: string;
    street: string;
    streetNumber: string;
    country: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    address: {
      color: theme.palette.primary.main
    }
  })
);

const Address: FunctionComponent<AddressProps> = props => {
  const classes = useStyles();

  const street = props.street + (props.streetNumber.length > 1 ? " " + props.streetNumber : "");
  const city = (street.length > 1 ? ", ": "") + props.city;

  return <Box className={classes.address}>{street}{city}</Box>;
}

export default Address;
