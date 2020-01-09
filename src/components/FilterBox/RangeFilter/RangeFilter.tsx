import React, { FunctionComponent, useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import FilterHeader from '../FilterHeader/FilterHeader';
import { FilterType } from '../FilterBox';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
  filter: RangeFilterProp;
  onChange: (field: string, values: RangeProp) => void;
  display: boolean;
}

export interface RangeFilterProp {
  field: string;
  label: string;
  order: number;
  type: FilterType;
  boundaries: RangeProp;
  values?: RangeProp;
}

export interface RangeProp {
  min: number;
  max: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      marginTop: 45,
      marginLeft: 20,
      marginRight: 20
    }
  }),
);

const RangeFilter: FunctionComponent<Props> = props => {
  
  const classes = useStyles();
  
  const [display, setDisplay] = useState<boolean>(true);

  useEffect(() => {
    setDisplay(props.display);
  }, [props.display]);

  const onChangeDisplay = (show: boolean): void => {
    setDisplay(show);
  }

  const onChangeRange = (event: any, range: any): void => {
    props.onChange(props.filter.field, {min: range[0], max: range[1]});
  }


  const filterBody = display
    ? <Box className={classes.slider}>
        <Slider
          style = {{ backgroundColor: 'transparent' }}
          valueLabelDisplay="on"
          max = {props.filter.boundaries.max}
          min = {props.filter.boundaries.min}
          defaultValue = {(props.filter.values) 
            ? [props.filter.values.min, props.filter.values.max]
          : [props.filter.boundaries.min, props.filter.boundaries.max]}
          onChangeCommitted= {onChangeRange} />
      </Box>
    : null;

  return <Box>
            <Box>
              <FilterHeader label={props.filter.label} onChange={onChangeDisplay} display={display}/>
            </Box>
            { filterBody }
          </Box>;
}

export default RangeFilter;