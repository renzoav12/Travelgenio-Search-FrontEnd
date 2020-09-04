import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Keys from "@hotels/translation-keys";
import Translate from "@hotels/translation";
import { cloneDeep } from "lodash";

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

const specificPlaceTypes = [
  "airport",
  "point_of_interest",
  "train_station",
  "metro_station",
];

const meters = "m";
const kilometers = "km";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    distance: {
      display: "flex",
      height: "100%",
      color: "#777777",
      fontSize: "9pt",
    },
  })
);

const adjustUnit = (distance: DistanceProps): DistanceProps => {
  const adjustedDistance = cloneDeep(distance);

  if (adjustedDistance.unit === kilometers && adjustedDistance.value < 1) {
    adjustedDistance.value = adjustedDistance.value * 1000;
    adjustedDistance.unit = meters;
  }

  return adjustedDistance;
};

const selectKey = (distance: DistanceProps) => {
  if (specificPlaceTypes.includes(distance.region.type.toLowerCase())) {
    if (distance.unit === meters) {
      return Keys.search.distance_meters_from;
    } else {
      return Keys.search.distance_kilometers_from;
    }
  } else {
    if (distance.unit === meters) {
      return Keys.search.distance_meters_from_center;
    } else {
      return Keys.search.distance_kilometers_from_center;
    }
  }
};

const createValues = (distance: DistanceProps) => {
  const value =
    distance.unit === meters ? distance.value : distance.value.toFixed(1);
  return { n: value, m: distance.region.name };
};


const formatDistance = (distance: DistanceProps) => {
  if (distance) {
    const adjustedDistance = adjustUnit(distance);

    return (
      <Translate
        tkey={selectKey(adjustedDistance)}
        values={createValues(adjustedDistance)}
      />
    );
  } else {
    return "";
  }
};

const Distance: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.distance}>{formatDistance(props.distance)}</Box>
  );
};

export default Distance;
