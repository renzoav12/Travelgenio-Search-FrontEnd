import React, { Component } from 'react';
import SingleOptionFilter, { SingleOptionFilterProp } from './SingleOptionFilter/SingleOptionFilter';

import './FilterBox.scss';

interface Props {
 
}

interface State {
  filter: Filter;
}

export interface Filter {
  amenity: SingleOptionFilterProp;
  category: SingleOptionFilterProp;
}

class FilterBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {filter: {
      amenity:{
          label:'Amenities', 
          options:[
              {code: '1', label: 'Amenity 1', quantity: 10, selected: false},
              {code: '2', label: 'Amenity 2', quantity: 20, selected: false},
              {code: '3', label: 'Amenity 3', quantity: 30, selected: false},                  
              {code: '4', label: 'Amenity 4', quantity: 40, selected: false},                  
              {code: '5', label: 'Amenity 5', quantity: 50, selected: false}                   
          ]
      }, 
      category:{
          label:'Categories', 
          options:[
              {code: '11', label: 'Category 11', quantity: 11, selected: false},
              {code: '22', label: 'Category 22', quantity: 22, selected: false},
              {code: '33', label: 'Category 33', quantity: 33, selected: false},
              {code: '44', label: 'Category 44', quantity: 44, selected: false},
              {code: '55', label: 'Category 55', quantity: 55, selected: false}
          ]
      }
  }};
  }

  render() {
    return  <div className="otravo-box">
              <div className="otravo-title">Filtrar por:</div>
              <div> 
                <div className="otravo-filter">
                  <SingleOptionFilter initialShowQty={2} filter = {this.state.filter.amenity}></SingleOptionFilter>
                </div>
                <div className="otravo-filter">
                  <SingleOptionFilter initialShowQty={2} filter = {this.state.filter.category}></SingleOptionFilter>
                </div>
              </div>
          </div>;
  } 
}

export default FilterBox;