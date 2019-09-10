import React, { Component, MouseEvent } from 'react';
import './SearchOccupancyQuantity.scss';

export interface OccupancyQuantityProp {
  title: string;
  subtitle: string;
  quantity: number;
  min?: number;
  max?: number;
  increase: any;
  decrease: any;
}

class SearchOccupancyQuantity extends Component<OccupancyQuantityProp> {

  constructor(prop: OccupancyQuantityProp) {
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
        <div className="SearchOccupancyQuantityDecrease" onClick={this.decrease}>-</div>
        <div>{this.props.quantity}</div>
        <div className="SearchOccupancyQuantityIncrease" onClick={this.increase}>+</div>
      </div>
    </div>;
  } 
}

export default SearchOccupancyQuantity;