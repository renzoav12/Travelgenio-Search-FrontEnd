import React, { Component } from 'react';
import SingleOptionFilter, { SingleOptionFilterProp } from './SingleOptionFilter/SingleOptionFilter';
import RangeFilter, { RangeFilterProp, RangeProp } from './RangeFilter/RangeFilter';

import './FilterBox.scss';

interface Props {
  filters?: Array<RangeFilterProp | SingleOptionFilterProp>;
  onChange: (filters: Array<RangeFilterProp | SingleOptionFilterProp>) => void;
}

interface State {
  filters: Array<RangeFilterProp | SingleOptionFilterProp>;
}

class FilterBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {filters: this.props.filters ||
      [   
        {
          field: 'price',
          label: 'Price',
          boundaries: {
            min: 10,
            max: 1000
          },
          values: {
            min: 120,
            max: 788
          }

        },
        {
          field: 'amenity',
          label:'Amenities', 
          options:[
              {code: '1', label: 'Amenity 1', quantity: 10, selected: false},
              {code: '2', label: 'Amenity 2', quantity: 20, selected: true},
              {code: '3', label: 'Amenity 3', quantity: 30, selected: false},                  
              {code: '4', label: 'Amenity 4', quantity: 40, selected: false},                  
              {code: '5', label: 'Amenity 5', quantity: 50, selected: false}                   
          ]
        }, 
        {
          field: 'category',
          label:'Categories', 
          options:[
              {code: '11', label: 'Category 11', quantity: 11, selected: false},
              {code: '22', label: 'Category 22', quantity: 22, selected: true},
              {code: '33', label: 'Category 33', quantity: 33, selected: false},
              {code: '44', label: 'Category 44', quantity: 44, selected: false},
              {code: '55', label: 'Category 55', quantity: 55, selected: false}
          ]
        }
      ]
    };
  }

  onChangeSingleOption = (field: string, code: string, selected: boolean) => {
    this.setState((prevState: State) => {
      let filters: Array<any> = [...prevState.filters];
      let changedFilter = filters.find(filter => filter.field === field);
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
      let filters: Array<any> = [...prevState.filters];
      let changedFilter = filters.find(filter => filter.field === field);
      if(changedFilter) {
        changedFilter.options.forEach(option => option.selected = false);
      }

      this.sendOnChangeEvent(filters);
      
      return {filters: filters};
    });
  }


  onChangeRange = (field: string, values: RangeProp) => {
    this.setState((prevState: State) => {
      let filters: Array<any> = [...prevState.filters];
      let changedFilter = filters.find(filter => filter.field === field);
      if(changedFilter) {
        changedFilter.values = values;
      }

      this.sendOnChangeEvent(filters);
      
      return {filters: filters};
    });
  }

  sendOnChangeEvent = (filters: Array<RangeFilterProp | SingleOptionFilterProp>):void => {
    this.props.onChange(filters);
  }

  isRangeFilter = (filter: any): filter is RangeFilterProp => {
    return 'boundaries' in filter;
  }

  isSingleOptionFilter = (filter: any): filter is SingleOptionFilterProp => {
    return 'options' in filter;
  }

  renderFilters = () => {
    return this.state.filters.map(filter => this.renderFilter(filter));
  }

  renderFilter = (filter: any) => {
    let element: any = null;
    
    if(this.isRangeFilter(filter)) {
      element = this.renderRangeFilter(filter);
    } else if(this.isSingleOptionFilter(filter)){
      element = this.renderSingleOptionFilter(filter);
    }

    return element;
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