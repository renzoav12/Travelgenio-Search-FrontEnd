import React, { Component, MouseEvent } from 'react';
import Quantity from '../Quantity/Quantity';
import {RoomOccupancy} from '../SearchOccupancy';
import Age from '../Age';

import './Room.scss';

interface RoomProps {
  room: RoomOccupancy;
  index: number;
  increaseAdults: (index: number) => void;
  decreaseAdults: (index: number) => void;
  increaseChildren: (index: number) => void;
  decreaseChildren: (index: number) => void;
  delete: (index: number) => void;
  onChangeAges: (ages: Array<number>, index: number) => void;
}

class Room extends Component<RoomProps> {
  constructor(props: RoomProps) {
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

  onChangeAge = (age: number, ageIndex: number): void => {
    let ages = [...this.props.room.childrenAges];
    ages[ageIndex] = age;
    this.props.onChangeAges(ages, this.props.index);
  }

  createChildAge = (childAge: number, index: number) => {
    return <Age
        title = {"Edad del Niño"}
        subtitle = {"Al finalizar viaje"}
        age = {childAge}
        index = {index}
        onChangeAge = {this.onChangeAge}
        key = {index}
    >
    </Age>
  }

  render() {
    const adults = <Quantity
        title={"Adultos"}
        subtitle={"+18 años"}
        quantity={this.props.room.adults}
        min={1}
        max={4}
        decrease={this.decreaseAdults}
        increase={this.increaseAdults}
    >
    </Quantity>;

    const children = <Quantity
        title={"Niños"}
        subtitle={"-17 años al finalizar el viaje."}
        quantity={this.props.room.childrenAges.length}
        min={0}
        max={6}
        decrease={this.decreaseChildren}
        increase={this.increaseChildren}
      >
      </Quantity>;
  
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

export default Room;