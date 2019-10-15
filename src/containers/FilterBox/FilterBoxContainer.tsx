import React, { Component } from 'react';
import FilterBox from '../../components/FilterBox';
import { RangeFilterProp } from '../../components/FilterBox/RangeFilter/RangeFilter';
import { SingleOptionFilterProp } from '../../components/FilterBox/SingleOptionFilter/SingleOptionFilter';
import { ValueFilterProp } from '../../components/FilterBox/ValueFilter/ValueFilter';
import { FilterType } from '../../components/FilterBox/FilterBox';

export interface FilterBoxContainerProps {
}

export interface State {
  filters: Map<string, ValueFilterProp 
  | RangeFilterProp 
  | SingleOptionFilterProp>;
}

class FilterBoxContainer extends Component<FilterBoxContainerProps, State> {
    constructor(props: FilterBoxContainerProps) {
        super(props);
        this.state = {filters: this.createFilters()}
    }

    onChange = (field: string, filterType: FilterType, values: Array<string>): void => {
        console.info("Filters has changed -> field = " + field + ", type = " + filterType + ", values = " + JSON.stringify(values));

        this.setState((prevState:State) => {

          let filters: Map<string, any> = prevState.filters;

          let filter: any = prevState.filters.get(field);

          if (filterType == FilterType.Value) {
            filter.value = values[0];
          } else if (filterType == FilterType.Range) {
            filter.values.min = parseInt(values[0]);
            filter.values.max = parseInt(values[1]);
          } else if (filterType == FilterType.Option) {
            filter.options.forEach(option => { option.selected = values.indexOf(option.code)>-1});
          }

          return {filters : filters};

        });
    }

    createFilters = ():Map<string, RangeFilterProp 
    | SingleOptionFilterProp
    | ValueFilterProp> => {
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

        return filters;
    }


    render() {
        return <FilterBox filters={this.state.filters} onChange={this.onChange}></FilterBox>;
    }
}

export default FilterBoxContainer;
