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
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
    { value: 13, label: '13' },
    { value: 14, label: '14' },
    { value: 15, label: '15' },
    { value: 16, label: '16' },
    { value: 17, label: '17' } 
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
            onChange={this.changeAge}
            placeholder={"Edad"}>
        </Select>
      </div>
    </div>;
  } 
}

export default SearchOccupancyAge;