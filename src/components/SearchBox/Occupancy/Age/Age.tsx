import React, { FunctionComponent, useState } from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';

export interface AgeProp {
  title: string;
  subtitle: string;
  age: number;
  index: number;
  onChangeAge: (value: number, index: number) => void;
}

interface AgeOption {
  value: number,
  label: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    occupancyAge: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 10
    },
    occupancyAgeTitle: {
      color: "black"
    },
    occupancyAgeSubtitle: {
      color: "grey",
      fontSize: "10pt"
    },
    occupancyAgeSelector: {
      width: "50%",
      '& .MuiInput-root': {
        width: "100%"
      },
      '& .MuiInput-underline:before': {
        borderBottom: "0 !important"
      },
      '& .MuiInput-underline:after': {
        borderBottom: "0 !important"
      },
      '& .MuiSelect-root:focus': {
        backgroundColor: "white !important"
      }
    },
    ocuppancyAgeItem: {
      '&.Mui-selected': { 
        backgroundColor: "white !important",
        textAlign: "right"
      },
      '&:hover': { 
        backgroundColor: "#E9EFF9 !important"
      }
    }, 
    invalidAge: {
      color: "red !important"
    }
  }),
);

const Age: FunctionComponent<AgeProp> = props => {

  const classes = useStyles();

  const [selectedValue, setSelectedValue] = useState<number>(props.age);

  const ageOptions: Array<AgeOption> = [
    { value: 0, label: 'Hasta 1 año' },
    { value: 1, label: '1 año' },
    { value: 2, label: '2 años' },
    { value: 3, label: '3 años' },
    { value: 4, label: '4 años' },
    { value: 5, label: '5 años' },
    { value: 6, label: '6 años' },
    { value: 7, label: '7 años' },
    { value: 8, label: '8 años' },
    { value: 9, label: '9 años' },
    { value: 10, label: '10 años' },
    { value: 11, label: '11 años' },
    { value: 12, label: '12 años' },
    { value: 13, label: '13 años' },
    { value: 14, label: '14 años' },
    { value: 15, label: '15 años' },
    { value: 16, label: '16 años' },
    { value: 17, label: '17 años' } 
  ];
 

  const onChangeAge = (event: any, child?: any): void => {
    setSelectedValue(event.target.value);
    props.onChangeAge(event.target.value, props.index);
  } 
  
  
  const ageItems = ageOptions.map(option => 
      <MenuItem 
          key={option.value} 
          value={option.value} 
          className={classes.ocuppancyAgeItem}>
            {option.label}
      </MenuItem>);

  const invalidAge = selectedValue == -1 ? classes.invalidAge : null;

  return <Box className={classes.occupancyAge}>
    <Box>
      <Box className={classNames(classes.occupancyAgeTitle, invalidAge)}>{props.title}</Box>
      <Box className={classes.occupancyAgeSubtitle}>{props.subtitle}</Box>
    </Box>
    <Box className={classes.occupancyAgeSelector}>
      <Select
        value = {selectedValue}
        onChange = {onChangeAge}
        MenuProps={{ id: "occupancy-age-selection" }}
        >
          {ageItems}
      </Select>
    </Box>
  </Box>;

}

export default Age;