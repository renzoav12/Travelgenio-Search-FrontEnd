import React, { Component } from 'react';
import SingleOptionFilter, { SingleOptionFilterProp } from './SingleOptionFilter/SingleOptionFilter';
import RangeFilter, { RangeFilterProp, RangeProp } from './RangeFilter/RangeFilter';
import ValueFilter, { ValueFilterProp } from './ValueFilter/ValueFilter';
import './FilterBox.scss';
import { RangeOptionFilterProp } from './RangeOptionFilter/RangeOptionFilter';
import { Grid } from '@material-ui/core';

interface FilterBoxProps {
  filters: Map<string, ValueFilterProp 
  | RangeFilterProp 
  | SingleOptionFilterProp
  | RangeOptionFilterProp>;
  onChange: (field: string, type: FilterType, value: Array<string>) => void;
}

export enum FilterType {
  Value,
  Range,
  SingleOption,
  RangeOption
}

class FilterBox extends Component<FilterBoxProps> {
  constructor(props: FilterBoxProps) {
    super(props);
  }

  onChangeValue = (field: string, value: string): void => {
    this.sendOnChangeEvent(field, FilterType.Value, [value]);
  }

  onChangeRange = (field: string, values: RangeProp): void => {
    this.sendOnChangeEvent(field, FilterType.Range, [values.min.toString(), values.max.toString()]);
  }

  onChangeSingleOption = (field: string, code: string, selected: boolean): void => {
    let changedFilter: any = this.props.filters.get(field);
    if(changedFilter) {
      let selectedCodes: Array<string> = 
          changedFilter.options
              .filter(option => option.selected && option.code != code)
              .map(option => option.code);

      if(selected) {
        selectedCodes.push(code);
      }

      this.sendOnChangeEvent(field, FilterType.SingleOption, selectedCodes);
    }
  }

  onCleanSelectionSingleOption = (field: string) => {
    this.sendOnChangeEvent(field, FilterType.SingleOption, []);
  }

  sendOnChangeEvent = (field: string, type: FilterType, values: Array<string>):void => {
    this.props.onChange(field, type, values);
  }

  isValueFilter = (filter: ValueFilterProp | RangeFilterProp | SingleOptionFilterProp | RangeOptionFilterProp): boolean => {
    return FilterType.Value === filter.type;
  }

  isRangeFilter = (filter: ValueFilterProp | RangeFilterProp | SingleOptionFilterProp | RangeOptionFilterProp): boolean => {
    return FilterType.Range === filter.type;
  }

  isSingleOptionFilter = (filter: ValueFilterProp | RangeFilterProp | SingleOptionFilterProp | RangeOptionFilterProp): boolean => {
    return FilterType.SingleOption === filter.type;
  }

  isRangeOptionFilter = (filter: ValueFilterProp | RangeFilterProp | SingleOptionFilterProp | RangeOptionFilterProp): boolean => {
    return FilterType.RangeOption === filter.type;
  }

  renderFilters = () => {
    return Array.from(this.props.filters.values())
        .sort((filter, anotherFilter) => {return filter.order - anotherFilter.order})
        .map(filter => this.renderFilter(filter));
  }

  renderFilter = (filter: ValueFilterProp | RangeFilterProp | SingleOptionFilterProp | RangeOptionFilterProp) => {
    let element: any = null;

    if(this.isValueFilter(filter)) {
      element = this.renderValueFilter(filter);
    } else if(this.isRangeFilter(filter)) {
      element = this.renderRangeFilter(filter);
    } else if(this.isSingleOptionFilter(filter)){
      element = this.renderSingleOptionFilter(filter);
    }

    return element;
  }

  renderValueFilter = (filter: any) => {
    return  <div  key = {filter.field} className="otravo-filter">
              <ValueFilter filter = {filter} onChange = {this.onChangeValue}/>
            </div>;
  }

  renderRangeFilter = (filter: any) => {
    return  <div  key = {filter.field} className="otravo-filter">
              <RangeFilter filter = {filter} onChange = {this.onChangeRange}/>
            </div>;
  }

  renderSingleOptionFilter = (filter: any) => {
    return <div key = {filter.field} className="otravo-filter">
            <SingleOptionFilter 
              initialShowQty={2} 
              filter = {filter}
              onChange = {this.onChangeSingleOption}
              onCleanSelection = {this.onCleanSelectionSingleOption}/>
          </div>;
  }

  render = () => {
    return  this.props.filters.size > 0 
          ? <Grid container item className="otravo-box otravo-filter-container">
              <Grid item xs={12} className="otravo-title">Filtrar por:</Grid>
              <Grid item xs={12}>
                {this.renderFilters()}
              </Grid>
          </Grid> 
          : null;
  } 
}

export default FilterBox;