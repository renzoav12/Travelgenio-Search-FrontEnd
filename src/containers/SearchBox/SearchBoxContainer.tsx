import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchAccommodationRateSearch, SearchParameters} from '../../actions/accommodationRateSearchActions';
import SearchBox from '../../components/SearchBox';
import { SearchBoxState } from '../../components/SearchBox/SearchBox';
import { RoomOccupancy } from '../../components/SearchOccupancy/SearchOccupancy';

export interface SearchBoxContainerProps {
    fetchAccommodationRateSearch: (parameters: SearchParameters) => void;
}

class SearchBoxContainer extends Component<SearchBoxContainerProps> {
    constructor(props: SearchBoxContainerProps) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.convertOccupancy = this.convertOccupancy.bind(this);
    }

    convertOccupancy = (rooms: Array<RoomOccupancy>): string => {
        return rooms.map(room => room.adults + ((room.childrenAges.length === 0) ?"" : "-") +room.childrenAges.join("-")).join("!");
    };

    handleSearch(searchRequest: SearchBoxState) {
        this.props.fetchAccommodationRateSearch(
            {
                searchType: searchRequest.searchType,
                searchCode: searchRequest.searchCode,
                checkIn: searchRequest.from.toISOString().substring(0, 10),
                checkOut: searchRequest.to.toISOString().substring(0, 10),
                occupancy: this.convertOccupancy(searchRequest.occupancy),
                country: 'US',
                language: 'en'
            }
        )
    }

    render() {
        return <SearchBox onClick={this.handleSearch}></SearchBox>;
    }
}

export default connect(null, {fetchAccommodationRateSearch})(SearchBoxContainer);
