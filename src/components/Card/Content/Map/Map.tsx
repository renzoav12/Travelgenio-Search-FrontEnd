import React, { FunctionComponent, useState } from "react";
import { Place } from "@hotels/map";
import { Box } from "@material-ui/core";
import MapDialog, { MapDialogProps } from "@hotels/map-dialog";
import ExploreIcon from "@material-ui/icons/Explore";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Keys from "@hotels/translation-keys";
import Translate from "@hotels/translation";
import { LocationProps } from "../Location/Location";
import config from "../../../../config";

export interface Props {
  location: LocationProps;
  accommodationName: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    verticalCentered: {
      verticalAlign: "middle",
    },
    mapLink: {
      cursor: "pointer",
      color: theme.palette.primary.main,
    },
  })
);

const Map: FunctionComponent<Props> = (props) => {
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
      googleMapsKey: config.GOOGLE_MAP_KEY,
    },
    open,
    onClose: closeMap,
  };

  return (
    <Box>
      <Box className={classes.mapLink} onClick={showMap}>
        <ExploreIcon fontSize="small" className={classes.verticalCentered} />{" "}
        <Translate tkey={Keys.search.see_map} />
      </Box>
      <MapDialog {...dialogProps} />
    </Box>
  );
};

export default Map;
