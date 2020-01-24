import React, { FunctionComponent, useState, useEffect } from 'react';
import FilterHeader from '../FilterHeader/FilterHeader';
import { FilterType } from '../FilterBox';
import { Input, Box, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
  filter: ValueFilterProp;
  onChange: (field: string, value: string) => void;
  display: boolean;
}

export interface ValueFilterProp {
  field: string;
  label: string;
  order: number;
  type: FilterType;
  value?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      '&:before': {
        borderBottom: '2px solid ' + theme.palette.primary.main + ' !important',
      }
    },
    button: {
      width: 90
    },
    buttonBox: {
      marginTop: 10
    }
  }),
);

const ValueFilter: FunctionComponent<Props> = props => {
  const classes = useStyles();

  const [display, setDisplay] = useState<boolean>(true);
  const [value, setValue] = useState<string>(props.filter.value ? props.filter.value : "");

  useEffect(() => {
    setValue(props.filter.value ? props.filter.value : "");
  }, [props.filter.value]);

  useEffect(() => {
    setDisplay(props.display);
  }, [props.display]);

  const onChangeDisplay = (show: boolean): void => {
    setDisplay(show);
  }

  const onChangeValue = (event: any): void => {
    setValue(event.target.value);
  }

  const onApply = (event: any): void => {
    props.onChange(props.filter.field, value);
  }

  const filterBody = display
    ? <Box>
        <Box>
          <Input
            type = {"text"} 
            value = {value} 
            fullWidth = {true}
            onChange = {onChangeValue}
            placeholder = {"Hotel"}
            className = {classes.input}/>
        </Box>
        <Box className={classes.buttonBox}>
          <Button variant="contained" color="primary" className={classes.button} onClick={onApply}>Aplicar</Button>
        </Box>
      </Box>
    : null;

    return <Box>
            <Box>
              <FilterHeader label={props.filter.label} onChange={onChangeDisplay} display={display}/>
            </Box>
            { filterBody }
          </Box>;
}

export default ValueFilter;