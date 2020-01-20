import React, { FunctionComponent, MouseEvent } from 'react';
import Quantity from '../Quantity/Quantity';
import {RoomOccupancy} from '../SearchOccupancy';
import Age from '../Age';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    occupancyRoom: {
      marginBottom: 40
    },
    occupancyRoomHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    deleteRoomButton: {
      cursor: "pointer",
      color: theme.palette.primary.main
    }
  }),
);



const Room: FunctionComponent<RoomProps> = props => {

  const classes = useStyles();

  const increaseAdults = (): void => {
    props.increaseAdults(props.index);
  }

  const decreaseAdults = ():void => {
    props.decreaseAdults(props.index);
  }

  const increaseChildren = (): void => {
    props.increaseChildren(props.index);
  }

  const decreaseChildren = (): void => {
    props.decreaseChildren(props.index);
  }

  const deleteRoom = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    props.delete(props.index);
  }

  const onChangeAge = (age: number, ageIndex: number): void => {
    let ages = [...props.room.childrenAges];
    ages[ageIndex] = age;
    props.onChangeAges(ages, props.index);
  }

  const createChildAge = (childAge: number, index: number) => {
    return <Age
        title = {"Edad del Niño"}
        subtitle = {"Al finalizar viaje"}
        age = {childAge}
        index = {index}
        onChangeAge = {onChangeAge}
        key = {index}
    >
    </Age>
  }

  const adults = <Quantity
      title={"Adultos"}
      subtitle={"+18 años"}
      quantity={props.room.adults}
      min={1}
      max={4}
      decrease={decreaseAdults}
      increase={increaseAdults}
  >
  </Quantity>;

  const children = <Quantity
      title={"Niños"}
      subtitle={"-17 años al finalizar el viaje."}
      quantity={props.room.childrenAges.length}
      min={0}
      max={6}
      decrease={decreaseChildren}
      increase={increaseChildren}
    >
    </Quantity>;

  const childrenAges = props.room.childrenAges.map(createChildAge);

  return <Box className={classes.occupancyRoom}>
    <Box className={classes.occupancyRoomHeader}>
      <Typography variant="h2">Habitación {props.index + 1}</Typography>
      {props.index > 0 
        ? <Box className={classes.deleteRoomButton} onClick={deleteRoom}>Eliminar</Box>
        : null}
    </Box>
    <Box>
      {adults}
      {children}
      {childrenAges}
    </Box>
  </Box>;
}

export default Room;