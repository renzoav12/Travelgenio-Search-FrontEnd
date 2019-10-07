import React, { Component } from 'react';
import StayPicker from '../StayPicker/StayPicker';
import moment, { Moment } from 'moment'
import 'react-dates/lib/css/_datepicker.css';
import Autocomplete, { SuggestionEntry } from '../Autocomplete/Autocomplete';
import SearchOccupancy,  { RoomOccupancy } from '../SearchOccupancy/SearchOccupancy';

import './SearchBox.scss';

interface SearchBoxProps {
    onClick: (state: SearchBoxState) => void;
    onChangeSuggestion: (state: SearchBoxSuggestionState) => void;
}

export interface SearchBoxSuggestionState {
    hint: string;
}

export interface SearchBoxState {
    locationType: string,
    locationCode: string,
    from: Moment,
    to: Moment,
    occupancy: Array<RoomOccupancy>
}

class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        this.state = {
            locationType: '',
            locationCode: '',
            from: moment(),
            to: moment(),
            occupancy: [{adults:2, childrenAges:[]}]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
        this.handleOccupancyChange = this.handleOccupancyChange.bind(this);
        this.handleOccupancyClose = this.handleOccupancyClose.bind(this);
    }

    handleChange = (event: any): void => {
    }

    handleSubmit = (event: any): void => {
        //alert('A name was submitted: ' + this.state);
        event.preventDefault();
        this.props.onClick(this.state);
    }

    handleStayPickerChange = (dates) => {
        this.setState({ from: dates.startDate, to: dates.endDate });
    }

    handleAutocompleteChange = (suggestionEntry: SuggestionEntry): void => {
        this.setState({
            locationType: suggestionEntry.type,
            locationCode: suggestionEntry.code
        });
    }

    handleOccupancyChange = (occupancy: Array<RoomOccupancy>): void => {
        console.info("---> Change Occupancy :" + JSON.stringify(occupancy));
    }

    handleOccupancyClose = (occupancy: Array<RoomOccupancy>): void => {
        console.info("---> Close Occupancy :" + JSON.stringify(occupancy));
    }

    render() {
        return (
            <div className="search-box otravo-box">
                <form onSubmit={this.handleSubmit}>
                    <div className="otravo-title">Modificar búsqueda</div>
                    <div className="search-box-element">
                        <Autocomplete onChange={this.handleAutocompleteChange} value={""}></Autocomplete>
                    </div>
                    <div className="search-box-element">
                        <StayPicker calendars={2} startDate={this.state.from} endDate={this.state.to} onChange={this.handleStayPickerChange}></StayPicker>
                    </div>
                    <div className="search-box-element">
                        <SearchOccupancy 
                            onChange = {this.handleOccupancyChange} 
                            onClose = {this.handleOccupancyClose} 
                            occupancy = {this.state.occupancy}/>
                    </div>
                    <div className="search-box-element">
                        <input type="submit" value="Buscar" />
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBox;
