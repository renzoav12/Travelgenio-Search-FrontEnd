import React, { FunctionComponent, useState } from 'react';
import StayPicker from './StayPicker/StayPicker';
import { Moment } from 'moment'
import Autocomplete, { SuggestionEntry, SuggestionHint } from './Autocomplete/Autocomplete';
import SearchOccupancy,  { RoomOccupancy } from './Occupancy/SearchOccupancy';
import 'react-dates/lib/css/_datepicker.css';
import './SearchBox.scss';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface SearchBoxProps {
    init: SearchBoxState;
    suggestionName: string;
    onChange: (state: SearchBoxState) => void
    onChangeSuggestionHint: (suggestionHint: SuggestionHint) => void;
    horizontal: boolean;
    suggestions: SuggestionEntry[];
}

export interface SearchBoxSuggestionState {
    text: string;
}

export interface SearchBoxLocationState {
    type: string;
    code: string;
}

export interface SearchBoxOccupancyState {
    rooms: Array<RoomOccupancy>;
}

export interface SearchBoxState {
    location: SearchBoxLocationState;
    stay: SearchBoxStayState;
    occupancy: SearchBoxOccupancyState;
}

export interface SearchBoxStayState {
    from: Moment;
    to: Moment;
}

interface ItemColumns {
  xs: any,
  sm: any,
  md: any,
  lg: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBox: {
      width: "100%"
    },
    searchBoxAutocomplete: {
      marginTop: "2px !important",
    }
  }),
);

const SearchBox: FunctionComponent<SearchBoxProps> = props => {
  
  const classes = useStyles();

  const [location, setLocation] = useState<SearchBoxLocationState>(props.init.location);
  const [stay, setStay] = useState<SearchBoxStayState>(props.init.stay);
  const [occupancy, setOccupancy] = useState<SearchBoxOccupancyState>(props.init.occupancy);

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    props.onChange({location, stay, occupancy});
  }

  const handleStayPickerChange = (dates) => {
    setStay({
            from: dates.startDate,
            to: dates.endDate
    });
  }

  const handleLocationChange = (suggestionEntry: SuggestionEntry): void => {
    setLocation({
            type: suggestionEntry.type,
            code: suggestionEntry.code
    });
  }

  const handleOccupancyChange = (occupancy: Array<RoomOccupancy>): void => {
  }

  const handleOccupancyClose = (occupancy: Array<RoomOccupancy>): void => {
  }

  const verticalColumns: ItemColumns = {xs: 12, sm: 12, md:12, lg: 12};

  const locationColumns: ItemColumns = props.horizontal 
      ? {xs: 12, sm: 12, md:12, lg: 5} : verticalColumns;

  const stayColumns: ItemColumns = props.horizontal 
      ? {xs: 12, sm: 7, md:6, lg: 4} : verticalColumns;

  const occupancyColumns: ItemColumns = props.horizontal 
      ? {xs: 12, sm: 5, md:5, lg: 2} : verticalColumns;

  const buttonColumns: ItemColumns = props.horizontal 
      ? {xs: 12, sm: 12, md:1, lg: 1} : verticalColumns;

  return <Paper className={classes.searchBox}>
    <Grid container item xs={12} alignItems="flex-start" spacing={2}>
      <Grid item xs={12}><Typography variant="h1">Modificar búsqueda</Typography></Grid>
      <Grid item xs={locationColumns.xs} sm={locationColumns.sm} md={locationColumns.md} lg={locationColumns.lg} className={classes.searchBoxAutocomplete}>
          <Autocomplete
                      code = {props.init.location.code}
                      type = {props.init.location.code}
                      name = {props.suggestionName}
                      onChange={handleLocationChange}
                      onChangeSuggestionHint={props.onChangeSuggestionHint}
                      suggestions={props.suggestions}/>
      </Grid>
      <Grid item xs={stayColumns.xs} sm={stayColumns.sm} md={stayColumns.md} lg={stayColumns.lg}>
          <StayPicker
                      calendars={2}
                      startDate={stay.from}
                      endDate={stay.to}
                      onChange={handleStayPickerChange}/>
      </Grid>
      <Grid item xs={occupancyColumns.xs} sm={occupancyColumns.sm} md={occupancyColumns.md} lg={occupancyColumns.lg}>
          <SearchOccupancy
                      onChange={handleOccupancyChange} 
                      onClose={handleOccupancyClose} 
                      occupancy={occupancy.rooms}/>
      </Grid>
      <Grid item xs={buttonColumns.xs} sm={buttonColumns.sm} md={buttonColumns.md} lg={buttonColumns.lg}>
          <button onClick={handleSubmit}>Buscar</button>
      </Grid>
    </Grid>
  </Paper>;
}

export default SearchBox;