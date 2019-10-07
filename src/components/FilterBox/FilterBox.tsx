import React, { Component } from 'react';
import SingleOptionFilter, { SingleOptionFilterProp } from './SingleOptionFilter/SingleOptionFilter';
import RangeFilter, { RangeFilterProp } from './RangeFilter/RangeFilter';

import './FilterBox.scss';

interface Props {
  filter?: Filter;
}

interface State {
  filter: Filter;
}

export interface Filter {
  price: RangeFilterProp;
  amenity: SingleOptionFilterProp;
  category: SingleOptionFilterProp;
}

class FilterBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {filter: this.props.filter ||
      {   
        price: {
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
        amenity:{
            label:'Amenities', 
            options:[
                {code: '1', label: 'Amenity 1', quantity: 10, selected: false},
                {code: '2', label: 'Amenity 2', quantity: 20, selected: true},
                {code: '3', label: 'Amenity 3', quantity: 30, selected: false},                  
                {code: '4', label: 'Amenity 4', quantity: 40, selected: false},                  
                {code: '5', label: 'Amenity 5', quantity: 50, selected: false}                   
            ]
        }, 
        category:{
            label:'Categories', 
            options:[
                {code: '11', label: 'Category 11', quantity: 11, selected: false},
                {code: '22', label: 'Category 22', quantity: 22, selected: true},
                {code: '33', label: 'Category 33', quantity: 33, selected: false},
                {code: '44', label: 'Category 44', quantity: 44, selected: false},
                {code: '55', label: 'Category 55', quantity: 55, selected: false}
            ]
        }
    }
    };
  }

  onChangeAmenity = (code: string, selected: boolean): void => {
    this.setState((prevState:State) => {
      let filter: Filter = prevState.filter;
      this.changeOption(filter.amenity, code, selected);
      return {filter: filter};
    });
  }

  onChangeCategory = (code: string, selected: boolean): void => {
    this.setState((prevState:State) => {
      let filter: Filter = prevState.filter;
      this.changeOption(filter.category, code, selected);
      return {filter: filter};
    });
  }

  changeOption = (optionFilter: SingleOptionFilterProp, code: string, selected: boolean): void => {
    let option = optionFilter.options.find(amenity => amenity.code === code);

    if(option) {
      option.selected = selected;
    }
  }

  render() {
    return  <div className="otravo-box">
              <div className="otravo-title">Filtrar por:</div>
              <div> 
                <div className="otravo-filter">
                  <RangeFilter 
                    filter = {this.state.filter.price}/>
                </div>
                <div className="otravo-filter">
                  <SingleOptionFilter 
                    initialShowQty={2} 
                    filter = {this.state.filter.amenity}
                    onChange = {this.onChangeAmenity}/>
                </div>
                <div className="otravo-filter">
                  <SingleOptionFilter 
                    initialShowQty={2} 
                    filter = {this.state.filter.category}
                    onChange = {this.onChangeCategory}/>
                </div>
              </div>
          </div>;
  } 
}

export default FilterBox;