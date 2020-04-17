import React, {FunctionComponent} from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import casino from '../../../../assets/images/icons/casino.svg';
import fitness from '../../../../assets/images/icons/fitness.svg';
import noSmoking from '../../../../assets/images/icons/no_smoking.svg';
import parking from '../../../../assets/images/icons/parking.svg';
import pool from '../../../../assets/images/icons/pool.svg';
import restaurant from '../../../../assets/images/icons/restaurant.svg';
import sauna from '../../../../assets/images/icons/sauna.svg';
import spa from '../../../../assets/images/icons/spa.svg';
import wifi from '../../../../assets/images/icons/wifi.svg';

export interface Props {
  amenities: Array<Amenity>;
};

export interface Amenity {
  id: string;
  name: string;
};

interface  AmenityIcon {
  icon: string
  order: number;
}

const icons:Map<string, string> = new Map(
  [
    ["1073742906", parking], 
    ["1073743549", pool],
    ["1073744117", pool],
    ["1073744119", pool],
    ["1073744121", pool],
    ["1073744122", pool],
    ["1073744272", parking],
    ["1073744273", parking],
    ["1073744274", parking],
    ["1073744275", parking],
    ["1073744276", parking],
    ["1073744277", parking],
    ["1073744278", parking],
    ["1073744279", parking],
    ["1073744280", parking],
    ["1073744373", parking],
    ["14", pool],
    ["19", restaurant],
    ["2017", spa],
    ["2074", pool],
    ["2112", casino],
    ["2123", spa],
    ["2129", spa],
    ["2134", sauna],
    ["2135", sauna],
    ["2137", noSmoking],
    ["2390", wifi],
    ["24",  pool],
    ["3761", parking],
    ["3863", parking],
    ["9",  fitness]
  ]);

  const orders:Map<string, number> = new Map(
    [
      [wifi, 1],
      [noSmoking, 2],
      [fitness, 3],
      [parking, 4], 
      [pool, 5],
      [restaurant,6],
      [spa, 7],
      [sauna, 8],
      [casino, 9]
    ]);

  const existAmenityIcon = (amenity: Amenity):boolean => icons.has(amenity.id);
  const getAmenityIcon = (amenity: Amenity): string | undefined => icons.get(amenity.id);
  const getAmenityOrder = (amenity: Amenity): number => orders.get(icons.get(amenity.id) || "") || 99;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: 15
    }
  })
);

const AmenityIcons: FunctionComponent<Props> = props => {

  const classes = useStyles();

  const amenities = props.amenities
    .filter(amenity => existAmenityIcon(amenity))
    .sort((amenity, otherAmenity) => {return getAmenityOrder(amenity) - getAmenityOrder(otherAmenity)})
    .map(amenity => <img src={getAmenityIcon(amenity)} className={classes.icon} alt="" key={amenity.id} title={amenity.name}/>);

  return <Box>{amenities}</Box>;
};

export default AmenityIcons;
