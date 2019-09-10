import React, { Component, MouseEvent } from 'react';
import './SearchOccupancy.scss';
import SearchOccupancyModal from './SearchOccupancyModal';

interface Props {
  occupancy: Array<RoomOccupancy>
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

  constructor(props: Props) {
    super(props);
    this.state = {showModal: false, occupancy: this.props.occupancy};

    this.increaseAdults = this.increaseAdults.bind(this);
    this.decreaseAdults = this.decreaseAdults.bind(this);
    this.increaseChildren = this.increaseChildren.bind(this);
    this.decreaseChildren = this.decreaseChildren.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.addRoom = this.addRoom.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



  increaseAdults = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[index].adults++;
      return {occupancy: rooms };
    });    
  }

  decreaseAdults = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[index].adults--;
      return {occupancy: rooms };
    });    
  }

  increaseChildren = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[index].childrenAges.push(-1);
      return {occupancy: rooms };
    });    
  }

  decreaseChildren = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[index].childrenAges.pop();
      return {occupancy: rooms };
    });    
  }

  deleteRoom = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      return {occupancy: rooms.filter((room,roomIndex) => roomIndex !== index) };
    });    
  }

  addRoom = (index: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      return {occupancy: rooms.concat({adults: 2, childrenAges:[]}) };
    });    
  }

  changeAges = (ages: Array<number>, roomIndex: number): void => {
    this.setState((prevState: State) => {      
      let rooms: Array<RoomOccupancy> = [...prevState.occupancy];
      rooms[roomIndex].childrenAges = ages;
      return {occupancy: rooms};
    });    
  }

  closeModal = (): void => {
    this.setState({showModal: false});    
  }

  toggleModal = (event :MouseEvent<HTMLDivElement>):void => {
    this.setState((prevState) => { return {showModal: !prevState.showModal}});
  }

  sumGuests = ():number => {
    return this.state.occupancy
        .map(room => room.adults + room.childrenAges.length)
        .reduce((sum, current) => sum + current, 0);
  };

  render() {
    return <div className="searchOccupancy">
      <div className="searchOccupancySummary" onClick={this.toggleModal}>
        <div>Rooms: {this.state.occupancy.length}</div>
        <div>Guests: {this.sumGuests()}</div>
      </div>
      { this.state.showModal 
          ? <SearchOccupancyModal 
                increaseAdults={this.increaseAdults} 
                decreaseAdults={this.decreaseAdults} 
                increaseChildren={this.increaseChildren} 
                decreaseChildren={this.decreaseChildren} 
                deleteRoom={this.deleteRoom}
                occupancy={this.state.occupancy}
                close={this.closeModal}
                addRoom={this.addRoom}
                changeAges={this.changeAges}>
            </SearchOccupancyModal> 
          : null }
    </div>;
  } 
}

export default SearchOccupancy;