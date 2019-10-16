import React, { Component } from 'react';
import StayPicker from '../StayPicker/StayPicker';
import moment, { Moment } from 'moment'
import Autocomplete, { SuggestionEntry } from '../Autocomplete/Autocomplete';
import SearchOccupancy,  { RoomOccupancy } from '../SearchOccupancy/SearchOccupancy';

import 'react-dates/lib/css/_datepicker.css';
import './SearchBox.scss';
import { Grid } from '@material-ui/core';

interface SearchBoxProps {
    onChange: (state: SearchBoxState) => void
    onChangeSuggestion: (state: SearchBoxSuggestionState) => void;
}

export interface SearchBoxSuggestionState {
    hint: string;
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

class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        this.state = {
            location: {type: '', code: ''},
            stay: {
                from: moment(),
                to: moment()
            },
            occupancy: {rooms: [{adults:2, childrenAges:[]}]}
        };
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event: any): void => {
    }

    handleSubmit = (event: any): void => {
        event.preventDefault();
        this.props.onChange(this.state);
    }

    handleStayPickerChange = (dates) => {
        this.setState({ 
            stay: {
                from: dates.startDate,
                to: dates.endDate
            }
        });
    }

    handleLocationChange = (suggestionEntry: SuggestionEntry): void => {
        this.setState({
            location: {
                type: suggestionEntry.type,
                code: suggestionEntry.code
            }
        });
    }

    handleOccupancyChange = (occupancy: Array<RoomOccupancy>): void => {
    }

    handleOccupancyClose = (occupancy: Array<RoomOccupancy>): void => {
    }

    render() {
        return (
            <Grid container item xs={12} alignItems="flex-start" className="search-box otravo-box">
                <Grid item xs={12} className="otravo-title">Modificar búsqueda</Grid>
                <Grid item xs={12} className="search-box-element">
                    <Autocomplete
                                onChange={this.handleLocationChange} 
                                value={""}/>
                </Grid>
                <Grid item xs={12} className="search-box-element">
                    <StayPicker
                                calendars={2}
                                startDate={this.state.stay.from}
                                endDate={this.state.stay.to}
                                onChange={this.handleStayPickerChange}/>
                </Grid>
                <Grid item xs={12} className="search-box-element">
                    <SearchOccupancy
                                onChange = {this.handleOccupancyChange} 
                                onClose = {this.handleOccupancyClose} 
                                occupancy = {this.state.occupancy.rooms}/>
                </Grid>
                <Grid item xs={12} className="search-box-element">
                    <button onClick={this.handleSubmit}>Buscar</button>
                </Grid>
            </Grid>
        )
    }
}

export default SearchBox;
