import React, { FunctionComponent, useState } from "react";
import { Place } from "@hotels/map";
import { Grid, Box } from "@material-ui/core";
import MapDialog, { MapDialogProps } from "@hotels/map-dialog";
import ExploreIcon from "@material-ui/icons/Explore";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Keys from "@hotels/translation-keys";
import Translate from "@hotels/translation";

export interface Props {
  location: LocationProps;
  accommodationName: string;
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
    verticalCentered: {
      verticalAlign: "middle",
    },
    mapLink: {
      marginLeft: 30,
      cursor: "pointer",
      color: theme.palette.primary.main,
    },
  })
);

const Location: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const showMap = () => {
    setOpen(true);
  };

  const closeMap = () => {
    setOpen(false);
  };

  const street =
    props.location.address.street +
    (props.location.address.streetNumber.length > 1
      ? " " + props.location.address.streetNumber
      : "");
  const city = (street.length > 1 ? ", " : "") + props.location.address.city;
  const address = (
    <Box className={classes.address}>
      {street}
      {city}
    </Box>
  );

  const place: Place = {
    title: street + " " + city,
    geoPosition: props.location.geoPosition,
  };

  const dialogProps: MapDialogProps = {
    title: props.accommodationName,
    address: street + city,
    map: {
      places: [place],
      zoom: 14,
    },
    open,
    onClose: closeMap,
  };

  return (
    <Box>
      <Grid container item xs={12}>
        {address}
        <Box className={classes.mapLink} onClick={showMap}>
          <ExploreIcon fontSize="small" className={classes.verticalCentered} />{" "}
          <Translate tkey={Keys.search.see_map} />
        </Box>
      </Grid>
      <MapDialog {...dialogProps} />
    </Box>
  );
};

export default Location;
