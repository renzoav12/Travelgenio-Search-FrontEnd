import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import SearchBox from '../../components/SearchBox';
import { SearchBoxState, SearchBoxSuggestionState, SearchBoxStayState, SearchBoxLocationState, SearchBoxOccupancyState } from '../../components/SearchBox/SearchBox';
import { RoomOccupancy } from '../../components/SearchOccupancy/SearchOccupancy';
import { fetchSearchSuggestion, SearchSuggestionParameters } from '../../actions/search/searchBoxSuggestionAction';
import { handleSearchBoxChange } from '../../actions/search/searchBoxActions';

export interface SearchBoxContainerProps {
    onChange: (searchBoxState: SearchBoxState) => void;
    fetchSuggestions: (parameters: SearchSuggestionParameters) => void;
}

class SearchBoxContainer extends Component<SearchBoxContainerProps> {
    constructor(props: SearchBoxContainerProps) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSuggestions = this.handleSuggestions.bind(this);
        this.convertOccupancy = this.convertOccupancy.bind(this);
    }

    convertOccupancy = (rooms: Array<RoomOccupancy>): string => {
        return rooms.map(room => room.adults + ((room.childrenAges.length === 0) ?"" : "-") +room.childrenAges.join("-")).join("!");
    };

    handleOnChange = (searchBoxState: SearchBoxState) : void => {
        this.props.onChange(searchBoxState);
        console.log("handle search");
        /*
        this.props.fetchSearch(
            {
                locationType: state.locationType,
                locationCode: state.locationCode,
                checkIn: state.from.toISOString().substring(0, 10),
                checkOut: state.to.toISOString().substring(0, 10),
                occupancy: this.convertOccupancy(state.occupancy),
                country: 'US',
                language: 'en',
                page: 0,
                size: 20
            }
        )
        */
    }

    handleSuggestions(state: SearchBoxSuggestionState) {
        console.log("handle suggestions");
    }

    handleChangeOccuppancy(state: SearchBoxOccupancyState) {
        console.log("ocupancy change");
    }

    handleChangeLocation(state: SearchBoxLocationState) {
        console.log("location change");
    }

    handleChangeStay(state: SearchBoxStayState) {
        console.log("stay picker change");
    }

    render() {
        return <SearchBox
                    onChangeSuggestion={this.handleSuggestions}
                    onChange={this.handleOnChange}/>
    }
}

export default connect(
    null, 
    {
        onChange: handleSearchBoxChange,
        fetchSuggestions: fetchSearchSuggestion
    }
)(SearchBoxContainer);
