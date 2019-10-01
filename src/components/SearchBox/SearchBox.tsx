import React, { Component } from 'react';
import StayPicker from '../StayPicker/StayPicker';
import moment, { Moment } from 'moment'
import 'react-dates/lib/css/_datepicker.css';
import Autocomplete, { SuggestionEntry } from '../Autocomplete/Autocomplete';
import SearchOccupancy,  { RoomOccupancy } from '../SearchOccupancy/SearchOccupancy';
import './SearchBox.scss';

interface SearchBoxProps {
    onClick: (state: SearchBoxState) => void;
}

export interface SearchBoxState {
    type: string,
    code: string,
    from: Moment,
    to: Moment,
    occupancy: Array<RoomOccupancy>;
}

class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        this.state = {
            type: 'city',
            code: '123',
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
            type: suggestionEntry.type,
            code: suggestionEntry.code
        });
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
                        <SearchOccupancy occupancy={this.state.occupancy}></SearchOccupancy>
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
