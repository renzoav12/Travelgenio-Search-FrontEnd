import React, { FunctionComponent } from 'react';
import { FilterType } from '../FilterBox';
import { RangeProp } from '../RangeFilter/RangeFilter';

interface Props {
  filter: RangeOptionFilterProp;
  initialShowQty: number;
  onChange: (field:string, code: string, selected: boolean) => void;
  onCleanSelection: (field:string) => void;
}

export interface RangeOptionFilterProp {
  field: string;
  label: string;
  order: number;
  type: FilterType;
  options: Array<RangeOptionProp>;
}

export interface RangeOptionProp {
  code: string,
  label: string,
  quantity: number,
  boundaries: RangeProp,
  selected: boolean
}

const RangeOptionFilter: FunctionComponent<Props> = props => {
  return null;
}

export default RangeOptionFilter;