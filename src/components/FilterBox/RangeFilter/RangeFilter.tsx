import React, { Component, MouseEvent, DOMElement } from 'react';
import Slider from '@material-ui/core/Slider';
import './RangeFilter.scss';

interface Props {
  filter: RangeFilterProp;
}

export interface RangeFilterProp {
  label: string;
  boundaries: RangeProp;
  values: RangeProp;
}

export interface RangeProp {
  min: number;
  max: number;
}

interface State {
}



class SingleOptionFilter extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
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
                  defaultValue= {[this.props.filter.values.min, this.props.filter.values.max]}/>
              </div>
            </div>;
  } 
}

export default SingleOptionFilter;