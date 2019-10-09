import React, { Component, MouseEvent, DOMElement } from 'react';
import Input from '@material-ui/core/Input';
import FilterHeader from '../FilterHeader/FilterHeader';
import './ValueFilter.scss';

interface Props {
  filter: ValueFilterProp;
  onChange: (field: string, value: string) => void;
}

export interface ValueFilterProp {
  field: string;
  label: string;
  value?: string;
}

interface State {
  display: boolean;
}

class ValueFilter extends Component<Props, State> {

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

  onChangeValue = (event: any): void => {
    this.props.onChange(this.props.filter.field,event.target.value);
  }

  render() {

    const filterBody = this.state.display
    ? <div className="otravo-value-filter">
        <Input 
          type = {"text"} 
          defaultValue = {(this.props.filter.value) ? this.props.filter.value : null} 
          fullWidth = {true}
          onChange = {this.onChangeValue}/>
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

export default ValueFilter;