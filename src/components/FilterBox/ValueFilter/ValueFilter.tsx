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
  order: number;
  value?: string;
}

interface State {
  display: boolean;
}

class ValueFilter extends Component<Props, State> {

  value: string;

  constructor(props: Props) {
    super(props);
    this.state = { display: true };
    this.value = props.filter.value ? props.filter.value :  "";
  }


  onChangeDisplay = (display: boolean): void => {
    this.setState((prevState: State) => {      
      return {
        display: display
      };
    });    
  }

  onChangeValue = (event: any): void => {
    console.info(event.target.value);
    this.value = event.target.value;
  }

  onApply = (event: any): void => {
    this.props.onChange(this.props.filter.field, this.value);
  }

  render() {

    const filterBody = this.state.display
    ? <div className="otravo-value-filter">
        <div>
          <Input 
            type = {"text"} 
            defaultValue = {(this.props.filter.value) ? this.props.filter.value : null} 
            fullWidth = {true}
            onChange = {this.onChangeValue}/>
        </div>
        <div className="otravo-value-filter-button-section">
          <button className="otravo-value-filter-button" onClick={this.onApply}>Aplicar</button>
        </div>
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