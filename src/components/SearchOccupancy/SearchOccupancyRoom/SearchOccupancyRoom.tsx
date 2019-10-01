import React, { Component, MouseEvent } from 'react';
import './SearchOccupancyRoom.scss';
import SearchOccupancyQuantity, { OccupancyQuantityProp } from '../SearchOccupancyQuantity/SearchOccupancyQuantity';
import {RoomOccupancy} from '../SearchOccupancy';
import SearchOccupancyAge from '../SearchOccupancyAge';

interface Props {
  room: RoomOccupancy;
  index: number;
  increaseAdults: any;
  decreaseAdults: any;
  increaseChildren: any;
  decreaseChildren: any;
  delete: any;
  changeAges: any;
}

class SearchOccupancyRoom extends Component<Props> {
  constructor(props: Props) {
    super(props);
    
    this.increaseAdults = this.increaseAdults.bind(this);
    this.decreaseAdults = this.decreaseAdults.bind(this);

    this.increaseChildren = this.increaseChildren.bind(this);
    this.decreaseChildren = this.decreaseChildren.bind(this);

    this.delete = this.delete.bind(this);
  }

  increaseAdults = (): void => {
    this.props.increaseAdults(this.props.index);
  }

  decreaseAdults = ():void => {
    this.props.decreaseAdults(this.props.index);
  }

  increaseChildren = (): void => {
    this.props.increaseChildren(this.props.index);
  }

  decreaseChildren = (): void => {
    this.props.decreaseChildren(this.props.index);
  }

  delete = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    this.props.delete(this.props.index);
  }

  changeAge = (age: number, ageIndex: number): void => {
    let ages = [...this.props.room.childrenAges];
    ages[ageIndex] = age;
    this.props.changeAges(ages, this.props.index);
  }

  createChildAge = (childAge: number, index: number) => {
    return <SearchOccupancyAge
        title = {"Edad del Niño"}
        subtitle = {"Al finalizar viaje"}
        age = {childAge}
        index = {index}
        changeAge = {this.changeAge}
        key = {index}
    >
    </SearchOccupancyAge>
  }

  render() {
    const adults = <SearchOccupancyQuantity
        title={"Adultos"}
        subtitle={"+18 años"}
        quantity={this.props.room.adults}
        min={1}
        max={4}
        decrease={this.decreaseAdults}
        increase={this.increaseAdults}
    >
    </SearchOccupancyQuantity>;

    const children = <SearchOccupancyQuantity
        title={"Niños"}
        subtitle={"-17 años al finalizar el viaje."}
        quantity={this.props.room.childrenAges.length}
        min={0}
        max={6}
        decrease={this.decreaseChildren}
        increase={this.increaseChildren}
      >
      </SearchOccupancyQuantity>;
  
    const childrenAges = this.props.room.childrenAges.map(this.createChildAge);

    return <div className="searchOccupancyRoom">
      <div className="searchOccupancyRoomHeader">
        <div className="otravo-title-2">Habitación {this.props.index + 1}</div>
        {this.props.index > 0 
          ? <div className="otravo-small-button" onClick={this.delete}>Eliminar</div>
          : null}
      </div>
      <div>
        {adults}
        {children}
        {childrenAges}
      </div>
    </div>;
  } 
}

export default SearchOccupancyRoom;