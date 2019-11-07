import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem, Menu } from '@material-ui/core';

import './Age.scss';

export interface AgeProp {
  title: string;
  subtitle: string;
  age: number;
  index: number;
  onChangeAge: (value: number, index: number) => void;
}

interface State {
  selectedValue: number;
}

interface AgeOption {
  value: number,
  label: string
}


class Age extends Component<AgeProp, State> {

  ageOptions: Array<AgeOption> = [
    { value: 0, label: 'Hasta 1 año' },
    { value: 1, label: '1 año' },
    { value: 2, label: '2 años' },
    { value: 3, label: '3 años' },
    { value: 4, label: '4 años' },
    { value: 5, label: '5 años' },
    { value: 6, label: '6 años' },
    { value: 7, label: '7 años' },
    { value: 8, label: '8 años' },
    { value: 9, label: '9 años' },
    { value: 10, label: '10 años' },
    { value: 11, label: '11 años' },
    { value: 12, label: '12 años' },
    { value: 13, label: '13 años' },
    { value: 14, label: '14 años' },
    { value: 15, label: '15 años' },
    { value: 16, label: '16 años' },
    { value: 17, label: '17 años' } 
  ];

  constructor(props: AgeProp) {
    super(props);
    this.state = {
      selectedValue: this.props.age
    };
  }
 
  onChangeAge = (event: any, child?: any): void => {
    this.setState((prevState: State) => {
      return {selectedValue: event.target.value};
    });

    this.props.onChangeAge(event.target.value, this.props.index);
  } 
  
  render() {

    const ageItems = this.ageOptions.map(option => 
        <MenuItem 
            key={option.value} 
            value={option.value} 
            className="SearchOcuppancyAgeItem">
              {option.label}
        </MenuItem>);

    const invalidAge: string = this.state.selectedValue == -1 ? " InvalidAge" : "";
    

    return <div className="searchOccupancyAge">
      <div className="searchOccupancyAgeTitles">
        <div className={"SearchOccupancyAgeTitle" + invalidAge}>{this.props.title}</div>
        <div className="SearchOccupancyAgeSubtitle">{this.props.subtitle}</div>
      </div>
      <div className="SearchOccupancyAgeSelector">
        <Select
          value = {this.state.selectedValue}
          onChange = {this.onChangeAge}
          MenuProps={{ id: "occupancy-age-selection" }}
          >
              {ageItems}
        </Select>
      </div>
    </div>;
  } 
}

export default Age;