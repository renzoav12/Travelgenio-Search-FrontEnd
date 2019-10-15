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
  selected: boolean
}

const SingleOption = (props: Props) => {
    return <div className="otravo-filter-option">
      <div className="otravo-filter-option-checkbox">
        <Checkbox 
          style = {{ backgroundColor: 'transparent' }}
          color = "primary" 
          value = {props.option.code} 
          checked = {props.option.selected}
          onChange = {(event):void => props.onChange(event.target.checked)}/>
      </div>
      <div className="otravo-label otravo-filter-option-label">
        {props.option.label}
      </div>
      <div className="otravo-label otravo-filter-option-quantity">
        {props.option.quantity}
      </div>
    </div>;
}

export default SingleOption;