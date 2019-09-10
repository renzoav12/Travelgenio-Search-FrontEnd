import React, { Component, MouseEvent } from 'react';
import './SearchOccupancyModal.scss';
import SearchOccupancyRoom from '../SearchOccupancyRoom/SearchOccupancyRoom';
import {RoomOccupancy} from '../SearchOccupancy';
import { JSXElement } from '@babel/types';

interface Props {
  occupancy: Array<RoomOccupancy>
  increaseAdults: any;
  decreaseAdults: any;
  increaseChildren: any;
  decreaseChildren: any;
  deleteRoom: any;
  close: any;
  addRoom: any;
  changeAges: any;
}

class SearchOccupancyModal extends Component<Props> {

  constructor(props: Props) {
    super(props);

    this.increaseAdults = this.increaseAdults.bind(this);
    this.decreaseAdults = this.decreaseAdults.bind(this);
    this.increaseChildren = this.increaseChildren.bind(this);
    this.decreaseChildren = this.decreaseChildren.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.close = this.close.bind(this);
    this.addRoom = this.addRoom.bind(this);
  }

  increaseAdults = (index: number): void => {
    this.props.increaseAdults(index);
  }

  decreaseAdults = (index: number): void => {
    this.props.decreaseAdults(index);
  }

  increaseChildren = (index: number): void => {
    this.props.increaseChildren(index);
  }

  decreaseChildren = (index: number): void => {
    this.props.decreaseChildren(index);
  }

  deleteRoom = (index: number): void => {
    if(this.props.occupancy.length > 1) {
      this.props.deleteRoom(index);
    }
  }

  close = (event :MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    this.props.close();
  }

  addRoom = (event :MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    this.props.addRoom();
  }

  changeAges = (ages: Array<number>, roomIndex:number): void => {
    this.props.changeAges(ages, roomIndex);
  }

  createRoom = (room: RoomOccupancy, index:number) => 
    <SearchOccupancyRoom 
        increaseAdults={this.increaseAdults} 
        decreaseAdults={this.decreaseAdults} 
        increaseChildren={this.increaseChildren} 
        decreaseChildren={this.decreaseChildren} 
        delete={this.deleteRoom}
        changeAges = {this.changeAges}
        key={index} 
        room={room} 
        index={index}>
    </SearchOccupancyRoom>;

  render() {
    const rooms = this.props.occupancy.map(this.createRoom);
  
    return <div className="searchOccupancyModal">
      <div className="searchOccupancyModalHeader">
        <div className="searchOccupancyModalHeaderAddRoom" onClick={this.addRoom}>Add Room</div>
        <div className="searchOccupancyModalHeaderClose" onClick={this.close}>Close</div>
      </div>
      <div>
        {rooms}
      </div>
    </div>;
  } 
}

export default SearchOccupancyModal;