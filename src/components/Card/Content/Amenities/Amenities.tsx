import React, {FunctionComponent} from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import foodIcon from '../../../../assets/images/icons/food_icon.svg';

export interface Props {
  amenities: Array<AmenityProps>;
};

export interface AmenityProps {
  id: string;
  name: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    amenities: {
      marginTop: 30
    },
    icon: {
      marginRight: 15
    }
  })
);

const Amenities: FunctionComponent<Props> = props => {

  const classes = useStyles();

  const amenities = props.amenities.map(amenity => <img src={foodIcon} className={classes.icon} key={amenity.id}/>);    

  return <Box className={classes.amenities}>{amenities}</Box>;
};

export default Amenities;
