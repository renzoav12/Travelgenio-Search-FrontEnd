import React, { FunctionComponent } from "react";
import Image, { ImageProps } from "./Image/Image";
import Location, { LocationProps } from "./Location/Location";
import AmenityIcons, { Amenity } from "./AmenityIcons/AmenityIcons";
import { Grid, Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MealPlan, { MealPlanProps } from "@hotels/mealplan";
import Map from "./Map/Map";
import Category from "@hotels/category";
import Distance, { DistanceProps } from "./Distance/Distance";

export interface Props {
  content: ContentProps;
  mealPlan?: MealPlanProps | undefined;
}

export interface ContentProps {
  name: string;
  category: CategoryProps;
  location: LocationProps;
  amenities: Amenity[];
  images: ImageProps;
  distance: DistanceProps;
}

interface CategoryProps {
  id: string;
  code: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      display: "flex",
      padding: 10,
      height: "100%",
    },
    image: {
      width: "30%",
    },
    info: {
      width: "70%",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontSize: "16pt",
      fontWeight: "bold",
      paddingTop: 5,
      minHeight: 40,
    },
    categoryMap: {
      display: "flex",
      minHeight: 20,
      paddingBottom: 5,
      height: 30,
    },
    category: {
      marginRight: 30,
    },
    address: {
      marginTop: 5,
    },
    distance: {
    },
    amenities: {
      [theme.breakpoints.up("md")]: {
        marginTop: 10,
        height: 22,
      },
    },
    mealPlan: {
      display: "flex",
      alignItems: "center",
      marginTop: 5,
    },
  })
);

const Content: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.content}>
      <Grid item xs={12} md={4} className={classes.image}>
        <Image {...props.content.images}></Image>
      </Grid>
      <Grid item xs={12} md={8} className={classes.info}>
        <Box className={classes.title}>{props.content.name}</Box>
        <Box className={classes.categoryMap}>
          <Box className={classes.category}>
            <Category stars={parseInt(props.content.category.code)} />
          </Box>
          <Map
            location={props.content.location}
            accommodationName={props.content.name}
          />
        </Box>
        <Box className={classes.address}>
          <Location location={props.content.location} />
        </Box>
        <Box className={classes.distance}>
          <Distance distance={props.content.distance} />
        </Box>
        <Box className={classes.amenities}>
          <AmenityIcons {...props.content} />
        </Box>
        <Box className={classes.mealPlan}>
          {props.mealPlan && props.mealPlan.type? <MealPlan {...props.mealPlan} /> : null}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Content;
