import React, { Component } from 'react';
import StayPicker from '../StayPicker/StayPicker';
import moment, { Moment } from 'moment'
import 'react-dates/lib/css/_datepicker.css';
import Autocomplete, { SuggestionEntry } from '../Autocomplete/Autocomplete';
import SearchOccupancy,  { RoomOccupancy } from '../SearchOccupancy/SearchOccupancy';

interface SearchBoxProps {
    onClick: (state: SearchBoxState) => void;
}

export interface SearchBoxState {
    searchType: string,
    searchCode: string,
    from: Moment,
    to: Moment,
    occupancy: Array<RoomOccupancy>;
}

class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        this.state = {
            searchType: 'CITY',
            searchCode: '123',
            from: moment(),
            to: moment(),
            occupancy: [{adults:2, childrenAges:[]}]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
    }

    handleChange(event: any) {
    }

    handleSubmit(event: any) {
        //alert('A name was submitted: ' + this.state);
        event.preventDefault();
        this.props.onClick(this.state);
    }

    handleStayPickerChange = (dates) => {
        this.setState({ from: dates.startDate, to: dates.endDate });
    }

    handleAutocompleteChange(suggestionEntry: SuggestionEntry) {
        this.setState({
            searchType: suggestionEntry.type,
            searchCode: suggestionEntry.code
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="searchBox_code">
                    <Autocomplete onChange={this.handleAutocompleteChange} value={""}></Autocomplete>
                </label>
                <StayPicker calendars={2} startDate={this.state.from} endDate={this.state.to} onChange={this.handleStayPickerChange}></StayPicker>
                <SearchOccupancy occupancy={this.state.occupancy}></SearchOccupancy>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default SearchBox;
