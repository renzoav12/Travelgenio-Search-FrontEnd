import React, { Component, MouseEvent } from 'react';
import {RemoveCircleOutline, AddCircleOutline}  from '@material-ui/icons';

import './Quantity.scss';

export interface QuantityProp {
  title: string;
  subtitle: string;
  quantity: number;
  min?: number;
  max?: number;
  increase: () => void;
  decrease: () => void;
}

class Quantity extends Component<QuantityProp> {

  constructor(prop: QuantityProp) {
    super(prop);

    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  
  increase = (event: MouseEvent<HTMLDivElement>):void => {
    event.preventDefault();

    if(this.props.max === undefined || this.props.quantity < this.props.max) {
      this.props.increase();
    }
  }

  decrease = (event: MouseEvent<HTMLDivElement>):void => {
    event.preventDefault();

    if(this.props.min === undefined || this.props.quantity > this.props.min) {
      this.props.decrease();
    }
  }


  render() {
    return <div className="searchOccupancyQuantity">
      <div className="searchOccupancyQuantityTitles">
        <div className="SearchOccupancyQuantityTitle">{this.props.title}</div>
        <div className="SearchOccupancyQuantitySubtitle">{this.props.subtitle}</div>
      </div>
      <div className="SearchOccupancyQuantityNumbers">
        <div className="SearchOccupancyQuantityButton" onClick={this.decrease}><RemoveCircleOutline/></div>
        <div>{this.props.quantity}</div>
        <div className="SearchOccupancyQuantityButton" onClick={this.increase}><AddCircleOutline/></div>
      </div>
    </div>;
  } 
}

export default Quantity;