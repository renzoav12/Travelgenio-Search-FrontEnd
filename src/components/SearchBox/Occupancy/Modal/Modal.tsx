import React, { FunctionComponent, MouseEvent } from 'react';
import Room from '../Room/Room';
import {RoomOccupancy} from '../SearchOccupancy';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    occupancyModal: {
      display: "block",
      position: "absolute",
      marginTop: 0,
      marginLeft: 0,
      backgroundColor: "white",
      zIndex: 2,
      padding: "10px !important"
    },
    occupancyModalFooter: {
      display: "flex",
      justifyContent: "space-between",
    },
    addRoomButton: {
      cursor: "pointer",
      color: theme.palette.primary.main
    }
  }),
);

const Modal: FunctionComponent<ModalProps> = props => {

  const classes = useStyles();

  const increaseAdults = (index: number): void => {
    props.increaseAdults(index);
  }

  const decreaseAdults = (index: number): void => {
    props.decreaseAdults(index);
  }

  const increaseChildren = (index: number): void => {
    props.increaseChildren(index);
  }

  const decreaseChildren = (index: number): void => {
    props.decreaseChildren(index);
  }

  const deleteRoom = (index: number): void => {
    if(props.occupancy.length > 1) {
      props.deleteRoom(index);
    }
  }

  const close = (event :MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    props.close();
  }

  const addRoom = (event :MouseEvent): void => {
    event.preventDefault();
    props.addRoom();
  }

  const createRoom = (room: RoomOccupancy, index:number) => 
    <Room 
        increaseAdults={increaseAdults} 
        decreaseAdults={decreaseAdults} 
        increaseChildren={increaseChildren} 
        decreaseChildren={decreaseChildren} 
        delete={deleteRoom}
        onChangeAges = {props.onChangeAges}
        key={index} 
        room={room} 
        index={index}>
    </Room>;

  const rooms = props.occupancy.map(createRoom);

  return <Paper className={classes.occupancyModal}>
    <Box>
      {rooms}
    </Box>
    <Box className={classes.occupancyModalFooter}>
      { props.maxRooms > props.occupancy.length
      ? <Box  className={classes.addRoomButton} onClick={addRoom}>Añadir habitación</Box>
      : null }
    </Box>
  </Paper>;
}

export default Modal;