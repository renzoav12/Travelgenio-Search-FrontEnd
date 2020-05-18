import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export interface Props {
  location: LocationProps;
}

export interface LocationProps {
  address: AddressProps;
  geoPosition: GeoPositionProps;
}

export interface AddressProps {
  city: string;
  state: string;
  street: string;
  streetNumber: string;
  country: string;
}

interface GeoPositionProps {
  longitude: number;
  latitude: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    address: {
      color: theme.palette.primary.main,
    },
  })
);

const Location: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const street =
    props.location.address.street +
    (props.location.address.streetNumber.length > 1
      ? " " + props.location.address.streetNumber
      : "");

  const city = (street.length > 1 ? ", " : "") + props.location.address.city;

  return (
    <Box className={classes.address}>
      {street}
      {city}
    </Box>
  );
};

export default Location;
