import React, { Component, MouseEvent } from 'react';
import SearchOccupancyModal from './Modal/Modal';
import {Hotel, Person, Face}  from '@material-ui/icons';
import './SearchOccupancy.scss';

interface Props {
  occupancy?: Array<RoomOccupancy>;
  onChange: (roomOccupancy: Array<RoomOccupancy>) => void;
  onClose: (roomOccupancy: Array<RoomOccupancy>) => void;
}

interface State {
  showModal: boolean,
  occupancy: Array<RoomOccupancy>
}

export interface RoomOccupancy {
  adults: number;
  childrenAges: Array<number>;
}

class SearchOccupancy extends Component<Props, State> {

  occupancyNode: any;

  constructor(props: Props) {
    super(props);
    this.state = {showModal: false, occupancy: this.props.occupancy || [ { adults : 2, childrenAges : [] } ]};

    this.increaseAdults = this.increaseAdults.bind(this);
    this.decreaseAdults = this.decreaseAdults.bind(this);
    this.increaseChildren = this.increaseChildren.bind(this);
    this.decreaseChildren = this.decreaseChildren.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.addRoom = this.addRoom.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendOnChangeEvent = this.sendOnChangeEvent.bind(this);
    this.sendOnCloseEvent = this.sendOnCloseEvent.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (event) => {

    let menu = document.getElementById("occupancy-age-selection");

    if(!this.occupancyNode.contains(event.target) 
        && this.state.showModal
        && (menu === null || !menu.contains(event.target))) {
      this.closeModal();
    }
  }

  sendOnChangeEvent = (occupancy: Array<RoomOccupancy>): void => {
    this.props.onChange(occupancy);
  }

  sendOnCloseEvent = (): void => {
    this.props.onClose(this.state.occupancy);
  }

  isValid = (): boolean => {
    return !this.state.occupancy
        .flatMap(room => room.childrenAges)
        .some(age => age == -1);
  }

  increaseAdults = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[index].adults++;
      this.sendOnChangeEvent(rooms);
      return {occupancy: rooms };
    });
  }

  decreaseAdults = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[index].adults--;
      this.sendOnChangeEvent(rooms);
      return {occupancy: rooms };
    });    
  }

  increaseChildren = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[index].childrenAges.push(-1);
      this.sendOnChangeEvent(rooms);
      return {occupancy: rooms };
    });
  }

  decreaseChildren = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[index].childrenAges.pop();
      this.sendOnChangeEvent(rooms);
      return {occupancy: rooms };
    }); 
  }

  deleteRoom = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      let updatedRooms = rooms.filter((room,roomIndex) => roomIndex !== index);
      this.sendOnChangeEvent(updatedRooms);
      return {occupancy: updatedRooms };
    });
  }

  addRoom = (): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      let updatedRooms = rooms.concat({adults: 2, childrenAges:[]});
      this.sendOnChangeEvent(updatedRooms);
      return {occupancy:  updatedRooms};
    });
  }

  changeAges = (ages: Array<number>, roomIndex: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[roomIndex].childrenAges = ages;
      this.sendOnChangeEvent(rooms);
      return {occupancy: rooms};
    });
  }

  closeModal = (): void => {
    if(this.isValid()) {
      this.setState({showModal: false});
      this.sendOnCloseEvent();
    }
  }

  toggleModal = (event :MouseEvent<HTMLDivElement>):void => {
    this.setState((prevState) => { return {showModal: !prevState.showModal}});
  }

  sumAdults = ():number => {
    return this.state.occupancy
        .map(room => room.adults)
        .reduce((sum, current) => sum + current, 0);
  };

  sumChildren = ():number => {
    return this.state.occupancy
        .map(room => room.childrenAges.length)
        .reduce((sum, current) => sum + current, 0);
  };

  render() {
    return <div ref={node => this.occupancyNode = node} className="searchOccupancy">
      <label className="otravo-label">Habitaciones:</label>
      <div className="searchOccupancySummary" onClick={this.toggleModal}>
        <div className="searchOccupancySummaryInfo otravo-info">
          <div><Hotel/></div>
          <div>{this.state.occupancy.length}</div>
        </div>
        <div className="searchOccupancySummaryInfo otravo-info">
        <div><Person/></div>
          <div>{this.sumAdults()}</div>
        </div>
        <div className="searchOccupancySummaryInfo otravo-info">
          <div><Face/></div>
          <div>{this.sumChildren()}</div>
        </div>
      </div>
      { this.state.showModal 
          ? <SearchOccupancyModal 
                increaseAdults={this.increaseAdults} 
                decreaseAdults={this.decreaseAdults} 
                increaseChildren={this.increaseChildren} 
                decreaseChildren={this.decreaseChildren} 
                deleteRoom={this.deleteRoom}
                occupancy={this.state.occupancy}
                maxRooms = {4}
                close={this.closeModal}
                addRoom={this.addRoom}
                onChangeAges={this.changeAges}>
            </SearchOccupancyModal> 
          : null }
    </div>;
  } 
}

export default SearchOccupancy;