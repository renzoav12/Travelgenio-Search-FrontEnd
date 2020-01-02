import React, {FunctionComponent} from 'react';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

export interface CategoryProps {
    stars: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    starIcon: {
      marginRight: 5,
      color: '#DFB915'
    }
  }),
);

const Category: FunctionComponent<CategoryProps> = props => {
  const classes = useStyles();

  const getStars = () => {
      let starsElements: JSX.Element[] = [];
      for (let index = 0; index < props.stars; index++) {
          starsElements.push(<StarIcon fontSize="small" className={classes.starIcon} key={index}/>);
      }
      return starsElements;
  }
  
  return <Box>{getStars()}</Box>;
}

export default Category;
