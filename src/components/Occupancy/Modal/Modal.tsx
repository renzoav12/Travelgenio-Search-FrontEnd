import React, { Component, MouseEvent } from 'react';
import Room from '../Room/Room';
import {RoomOccupancy} from '../SearchOccupancy';

import './Modal.scss';

interface ModalProps {
  occupancy: Array<RoomOccupancy>
  maxRooms: number,
  increaseAdults: (index: number) => void,
  decreaseAdults: (index: number) => void,
  increaseChildren: (index: number) => void,
  decreaseChildren: (index: number) => void,
  deleteRoom: (index: number) => void,
  close: () => void,
  addRoom: () => void,
  onChangeAges: (ages: Array<number>, roomIndex: number) => void
}

class Modal extends Component<ModalProps> {

  constructor(props: ModalProps) {
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

  createRoom = (room: RoomOccupancy, index:number) => 
    <Room 
        increaseAdults={this.increaseAdults} 
        decreaseAdults={this.decreaseAdults} 
        increaseChildren={this.increaseChildren} 
        decreaseChildren={this.decreaseChildren} 
        delete={this.deleteRoom}
        onChangeAges = {this.props.onChangeAges}
        key={index} 
        room={room} 
        index={index}>
    </Room>;

  render() {
    const rooms = this.props.occupancy.map(this.createRoom);
  
    return <div className="otravo-box-with-border searchOccupancyModal">
      <div>
        {rooms}
      </div>
      <div className="searchOccupancyModalFooter">
        {this.props.maxRooms > this.props.occupancy.length
        ? <div className="otravo-small-button" onClick={this.addRoom}>Añadir habitación</div>
        : null }
      </div>
    </div>;
  } 
}

export default Modal;