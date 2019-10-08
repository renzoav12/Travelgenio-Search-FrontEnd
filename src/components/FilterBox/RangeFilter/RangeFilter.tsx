import React, { Component, MouseEvent, DOMElement } from 'react';
import Slider from '@material-ui/core/Slider';
import FilterHeader from '../FilterHeader/FilterHeader';
import './RangeFilter.scss';

interface Props {
  filter: RangeFilterProp;
  onChange: (field: string, values: RangeProp) => void;
}

export interface RangeFilterProp {
  field: string;
  label: string;
  boundaries: RangeProp;
  values?: RangeProp;
}

export interface RangeProp {
  min: number;
  max: number;
}

interface State {
  display: boolean;
}



class RangeFilter extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { display: true };
  }

  onChangeDisplay = (display: boolean): void => {
    this.setState((prevState: State) => {      
      return {
        display: display
      };
    });    
  }

  onChange = (event: any, value: any): void => {
    console.info(value);
    this.props.onChange(this.props.filter.field, {min: value[0], max: value[1]});
  }

  render() {

    const filterBody = this.state.display
    ? <div className="otravo-slider">
        <Slider
          style = {{ backgroundColor: 'transparent' }}
          valueLabelDisplay="on"
          max = {this.props.filter.boundaries.max}
          min = {this.props.filter.boundaries.min}
          defaultValue = {(this.props.filter.values) 
            ? [this.props.filter.values.min, this.props.filter.values.max]
          : [this.props.filter.boundaries.min, this.props.filter.boundaries.max]}
          onChangeCommitted= {this.onChange} />
      </div>
    : null;

    return <div>
              <div>
                <FilterHeader label={this.props.filter.label} onChange={this.onChangeDisplay}/>
              </div>
              { filterBody }
            </div>;
  } 
}

export default RangeFilter;