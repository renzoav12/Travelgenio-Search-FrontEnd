import React, { Component } from 'react';
import SingleOptionFilter, { SingleOptionFilterProp } from './SingleOptionFilter/SingleOptionFilter';
import RangeFilter, { RangeFilterProp, RangeProp } from './RangeFilter/RangeFilter';
import ValueFilter, { ValueFilterProp } from './ValueFilter/ValueFilter';
import './FilterBox.scss';

export interface Props {
  filters: Map<string, ValueFilterProp 
  | RangeFilterProp 
  | SingleOptionFilterProp>;
  onChange: (field: string, type: FilterType, value: Array<string>) => void;
}

export enum FilterType {
  Value = "value",
  Range = "range",
  Option = "option"
}

class FilterBox extends Component<Props> {

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

      this.sendOnChangeEvent(field, FilterType.Option, selectedCodes);
    }
  }

  onCleanSelectionSingleOption = (field: string) => {
    this.sendOnChangeEvent(field, FilterType.Option, []);
  }

  sendOnChangeEvent = (field: string, type: FilterType, values: Array<string>):void => {
    this.props.onChange(field, type, values);
  }

  isRangeFilter = (filter: any): filter is RangeFilterProp => {
    return 'boundaries' in filter;
  }

  isSingleOptionFilter = (filter: any): filter is SingleOptionFilterProp => {
    return 'options' in filter;
  }

  isValueFilter = (filter: any): filter is ValueFilterProp => {
    return !this.isSingleOptionFilter(filter) 
        && !this.isRangeFilter(filter);
  }

  renderFilters = () => {
    return Array.from(this.props.filters.values())
        .sort((filter, anotherFilter) => {return filter.order - anotherFilter.order})
        .map(filter => this.renderFilter(filter));
  }

  renderFilter = (filter: any) => {
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
    return  <div className="otravo-box">
              <div className="otravo-title">Filtrar por:</div>
              <div>
                {this.renderFilters()}
              </div>
          </div>;
  } 
}

export default FilterBox;