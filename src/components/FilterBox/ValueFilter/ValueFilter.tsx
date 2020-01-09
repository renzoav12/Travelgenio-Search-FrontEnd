import React, { FunctionComponent, useState, useEffect } from 'react';
import FilterHeader from '../FilterHeader/FilterHeader';
import './ValueFilter.scss';
import { FilterType } from '../FilterBox';
import { Input, Box } from '@material-ui/core';

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

const ValueFilter: FunctionComponent<Props> = props => {

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
    ? <Box className="otravo-value-filter">
        <Box>
          <Input 
            type = {"text"} 
            value = {value} 
            fullWidth = {true}
            onChange = {onChangeValue}
            placeholder = {"Hotel"}/>
        </Box>
        <Box className="otravo-value-filter-button-section">
          <button className="otravo-value-filter-button" onClick={onApply}>Aplicar</button>
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