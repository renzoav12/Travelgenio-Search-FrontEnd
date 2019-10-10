import React, { Component } from 'react';
import SingleOptionFilter, { SingleOptionFilterProp } from './SingleOptionFilter/SingleOptionFilter';
import RangeFilter, { RangeFilterProp, RangeProp } from './RangeFilter/RangeFilter';

import './FilterBox.scss';
import ValueFilter, { ValueFilterProp } from './ValueFilter/ValueFilter';

interface Props {
  filters?: Map<string, ValueFilterProp 
  | RangeFilterProp 
  | SingleOptionFilterProp>;
  onChange: (filters: Map<string, 
    ValueFilterProp
    | RangeFilterProp 
    | SingleOptionFilterProp>) => void;
}

interface State {
  filters: Map<string, RangeFilterProp 
  | SingleOptionFilterProp
  | ValueFilterProp>;
}

class FilterBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if(this.props.filters) {
      this.state = {filters: this.props.filters};
    } else {
      let filters: Map<string, RangeFilterProp 
      | SingleOptionFilterProp
      | ValueFilterProp> = new Map<string, RangeFilterProp 
      | SingleOptionFilterProp
      | ValueFilterProp>();
    
      filters.set("price", {
        field: 'price',
        label: 'Price',
        order: 1,
        boundaries: {
          min: 10,
          max: 1000
        },
        values: {
          min: 120,
          max: 788
        }
      });

      filters.set("hotel", 
        {
          field: 'hotel',
          label: 'Hotel',
          order: 2,
          value: 'Berlin Hilton'
        }
      );

      filters.set("amenity", 
        {
          field: 'amenity',
          label:'Amenities', 
          order: 3,
          options:[
              {code: '1', label: 'Amenity 1', quantity: 10, selected: false},
              {code: '2', label: 'Amenity 2', quantity: 20, selected: true},
              {code: '3', label: 'Amenity 3', quantity: 30, selected: false},                  
              {code: '4', label: 'Amenity 4', quantity: 40, selected: false},                  
              {code: '5', label: 'Amenity 5', quantity: 50, selected: false}                   
          ]
        }
      );

      filters.set("category", 
        {
          field: 'category',
          label:'Categories', 
          order: 4,
          options:[
              {code: '11', label: 'Category 11', quantity: 11, selected: false},
              {code: '22', label: 'Category 22', quantity: 22, selected: true},
              {code: '33', label: 'Category 33', quantity: 33, selected: false},
              {code: '44', label: 'Category 44', quantity: 44, selected: false},
              {code: '55', label: 'Category 55', quantity: 55, selected: false}
          ]
        }
      );


      this.state = {filters: filters};
    }
  }

  onChangeValue = (field: string, value: string) => {
    this.setState((prevState: State) => {
      let filters: Map<string, any> = prevState.filters;
      
      let changedFilter = filters.get(field);
      
      if(changedFilter) {
        changedFilter.value = value;
      }

      this.sendOnChangeEvent(filters);
      
      return {filters: filters};
    });
  }

  onChangeRange = (field: string, values: RangeProp) => {
    this.setState((prevState: State) => {
      let filters: Map<string, any> = prevState.filters;
      let changedFilter = filters.get(field);
      if(changedFilter) {
        changedFilter.values = values;
      }

      this.sendOnChangeEvent(filters);
      
      return {filters: filters};
    });
  }

  onChangeSingleOption = (field: string, code: string, selected: boolean) => {
    this.setState((prevState: State) => {
      let filters: Map<string, any> = prevState.filters;
      let changedFilter = filters.get(field);
      if(changedFilter) {
        let changedOption = changedFilter.options.find(option => option.code === code);
        if(changedOption) {
          changedOption.selected = selected;
        }
      }

      this.sendOnChangeEvent(filters);
      
      return {filters: filters};
    });
  }

  onCleanSelectionSingleOption = (field: string) => {
    this.setState((prevState: State) => {
      let filters: Map<string, any> = prevState.filters;
      let changedFilter = filters.get(field);
      if(changedFilter) {
        changedFilter.options.forEach(option => option.selected = false);
      }

      this.sendOnChangeEvent(filters);
      
      return {filters: filters};
    });
  }

  sendOnChangeEvent = (filters: Map<string, 
    ValueFilterProp
    | RangeFilterProp 
    | SingleOptionFilterProp >):void => {
    this.props.onChange(filters);
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
    return Array.from(this.state.filters.values())
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