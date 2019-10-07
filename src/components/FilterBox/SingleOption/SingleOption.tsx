import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import './SingleOption.scss';

interface Props {
  option: SingleOptionProp;
  onChange: (selected: boolean) => void;
}

export interface SingleOptionProp {
  code: string,
  label: string,
  quantity: number,
  selected: boolean,
}

class SingleOption extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return <div className="otravo-filter-option">
      <div className="otravo-filter-option-checkbox">
        <Checkbox 
          style = {{ backgroundColor: 'transparent' }}
          color = "primary" 
          value = {this.props.option.code} 
          checked = {this.props.option.selected}
          onChange = {(event):void => this.props.onChange(event.target.checked)}/>
      </div>
      <div className="otravo-label otravo-filter-option-label">
        {this.props.option.label}
      </div>
      <div className="otravo-label otravo-filter-option-quantity">
        {this.props.option.quantity}
      </div>
    </div>;
  } 
}

export default SingleOption;