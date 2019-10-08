import React, { Component, MouseEvent, DOMElement } from 'react';
import Slider from '@material-ui/core/Slider';
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
}



class RangeFilter extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  onChange = (event: any, value: any): void => {
    console.info(value);
    this.props.onChange(this.props.filter.field, {min: value[0], max: value[1]});
  }

  render() {
    return <div>
              <div className="otravo-title-2">
                {this.props.filter.label}
              </div>
              <div className="otravo-slider">
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
            </div>;
  } 
}

export default RangeFilter;