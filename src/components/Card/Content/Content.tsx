import React, {FunctionComponent} from 'react';
import Image, { ImageProps } from './Image/Image';
import Category from '../../Category/Category';
import Address, { AddressProps } from './Address/Address';
import AmenityIcons, { Amenity } from './AmenityIcons/AmenityIcons';
import { Grid, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MealPlan, { MealPlanProps } from '../../MealPlan/MealPlan';

export interface Props {
  content: ContentProps;
  mealPlan: MealPlanProps;
};

export interface ContentProps {
  name: string;
  category: CategoryProps;
  location: LocationProps;
  amenities: Amenity[];
  images: ImageProps;
};

interface CategoryProps {
  id: string;
  code: string;
};

interface LocationProps {
  address: AddressProps;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: "16pt",
      fontWeight: "bold",
      paddingTop: 5
    },
    content: {
      display: "flex",
      padding: 10,
      height: "100%"
    },
    image: {
      width: "30%"
    },
    info: {
      width: "70%"
    },
    category: {
      minHeight: 20,
      paddingBottom: 5
    },
    amenities: {
      marginTop: 20
    },
    mealPlan: {
      marginTop: 10
    }
  })
);

const Content: FunctionComponent<Props> = props => {
  const classes = useStyles();

  return <Grid container className={classes.content}>
      <Grid item xs={12} md={4} className={classes.image}>
          <Image {...props.content.images}></Image>
      </Grid>
      <Grid item xs={12} md={8} className={classes.info}>
          <Box className={classes.title}>{props.content.name}</Box>
          <Box className={classes.category}>
              <Category stars={parseInt(props.content.category.code)}/>
          </Box>
          <Address {...props.content.location.address}/>
          <Box className={classes.amenities}>
            <AmenityIcons {...props.content}/>
          </Box>
          <Box className={classes.mealPlan}>
            <MealPlan {...props.mealPlan}/>
          </Box>
      </Grid>
  </Grid>;
}

export default Content;
