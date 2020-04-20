import React, { FunctionComponent } from 'react';
import {KeyboardArrowDown, KeyboardArrowUp}  from '@material-ui/icons';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
  label: string;
  onChange: (display: boolean) => void;
  display: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterHeader: {
      display: "flex",
      justifyContent: "space-between",
      cursor: "pointer",
      marginBottom: 12
    }
  }),
);

const FilterHeader: FunctionComponent<Props> = props => {
  
  const classes = useStyles();

  const toggleDisplay = (): void => {
    props.onChange(!props.display);
  }

  const arrow = () => props.display ? <KeyboardArrowUp/> : <KeyboardArrowDown/>;

  return <Box className={classes.filterHeader} onClick={toggleDisplay}>
          <Typography variant="h1">{props.label}</Typography>
          <Box>{arrow}</Box>
        </Box>;
}

export default FilterHeader;