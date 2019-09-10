import React, { Component, MouseEvent } from 'react';
import './SearchOccupancyAge.scss';
import Select from 'react-select';
import { JSXAttribute } from '@babel/types';

export interface OccupancyAgeProp {
  title: string;
  subtitle: string;
  age: number;
  index: number;
  changeAge: any;
}

interface AgeOption {
  value: number,
  label: string
}

class SearchOccupancyAge extends Component<OccupancyAgeProp> {

  ageOptions: Array<AgeOption> = [
    { value: 0, label: '0 year' },
    { value: 1, label: '1 year' },
    { value: 2, label: '2 years' },
    { value: 3, label: '3 years' },
    { value: 4, label: '4 years' },
    { value: 5, label: '5 years' },
    { value: 6, label: '6 years' },
    { value: 7, label: '7 years' },
    { value: 8, label: '8 years' },
    { value: 9, label: '9 years' },
    { value: 10, label: '10 years' },
    { value: 11, label: '11 years' },
    { value: 12, label: '12 years' },
    { value: 13, label: '13 years' },
    { value: 14, label: '14 years' },
    { value: 15, label: '15 years' },
    { value: 16, label: '16 years' },
    { value: 17, label: '17 years' } 
  ];

  constructor(props: OccupancyAgeProp) {
    super(props);
    this.changeAge = this.changeAge.bind(this);
  }
  
  changeAge = (selectedOption: AgeOption) => {
    this.props.changeAge(selectedOption.value, this.props.index);
  }

  render() {
    return <div className="searchOccupancyAge">
      <div className="searchOccupancyAgeTitles">
        <div className="SearchOccupancyAgeTitle">{this.props.title}</div>
        <div className="SearchOccupancyAgeSubtitle">{this.props.subtitle}</div>
      </div>
      <div className="SearchOccupancyAgeSelector">
        <Select 
            menuPlacement="auto" 
            options={this.ageOptions} value = {this.ageOptions.find(option => option.value === this.props.age)} 
            onChange={this.changeAge}>
        </Select>
      </div>
    </div>;
  } 
}

export default SearchOccupancyAge;