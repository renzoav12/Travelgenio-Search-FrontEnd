import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Keys from "@hotels/translation-keys";
import Translate from "@hotels/translation";

export interface Props {
  distance: DistanceProps;
}

export interface DistanceProps {
  region: RegionProps;
  value: number;
  unit: string;
}

export interface RegionProps {
  id: string;
  name: string;
  type: string;
}

const specificPlaceTypes = ["neighborhood", "airport", "point_of_interest", "train_station", "metro_station"];

const meters = "m";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    distance: {
      display: "flex",
      height: "100%",
      color: "#777777",
      fontSize: "9pt"
    },
  })
);

const Distance: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const formatDistance = (distance: DistanceProps) => {
    if(distance) {
      const distanceValue = (props.distance.unit === meters ? props.distance.value : props.distance.value.toFixed(1));
      const values = {n: distanceValue, m: distance.region.name};
      let key;

      if(specificPlaceTypes.includes(props.distance.region.type.toLowerCase())) {
        if(props.distance.unit === meters) {
          key = Keys.search.distance_meters_from;
        } else {
          key = Keys.search.distance_kilometers_from;
        }
      } else {
        if(props.distance.unit === meters) {
          key = Keys.search.distance_meters_from_center;
        } else {
          key = Keys.search.distance_kilometers_from_center;
        }
      }

      return <Translate tkey={key} values={values} />
    }else {
      return "";
    }
  }


  return <Box className={classes.distance}>
    {formatDistance(props.distance)}
  </Box>;
};

export default Distance;
