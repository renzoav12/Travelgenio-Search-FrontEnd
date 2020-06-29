import React, { FunctionComponent } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import classnames from "classnames";
import { CardProps } from "../Card/Card";
import config from "../../config";
import Map, { Place } from "@hotels/map";

interface Props {
  className?: string;
  accommodations: Array<CardProps>;
  select: (id:string) => void;
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: 800,
    },
  })
);

const SearchMap: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const places: Array<Place> = props.accommodations.map((accommodation) => ({
    accommodation: {
      id: accommodation.id,
      name: accommodation.content.name,
      category: accommodation.content.category,
      imageUrl: accommodation.content.images[0].url,
      pricing: accommodation.pricing,
    },
    geoPosition: accommodation.content.location.geoPosition,
  }));

  return (
    props.accommodations.length > 0 ?
    <Paper className={classnames(classes.container, props.className)}>
      <Map places={places} select={props.select} zoom={10} googleMapsKey={config.GOOGLE_MAP_KEY} loading={props.loading}/>
    </Paper> : null
  );
};

export default SearchMap;
