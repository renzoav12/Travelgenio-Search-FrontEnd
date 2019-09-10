import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchAccommodationRateSearch, SearchParameters} from '../../actions/accommodationRateSearchActions';
import SearchBox from '../../components/SearchBox';
import { SearchBoxState } from '../../components/SearchBox/SearchBox';

export interface SearchBoxContainerProps {
    fetchAccommodationRateSearch: (parameters: SearchParameters) => void;
}

class SearchBoxContainer extends Component<SearchBoxContainerProps> {
    constructor(props: SearchBoxContainerProps) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(searchRequest: SearchBoxState) {
        this.props.fetchAccommodationRateSearch(
            {
                type: searchRequest.type,
                code: searchRequest.code,
                checkIn: searchRequest.from.toISOString().substring(0, 10),
                checkOut: searchRequest.to.toISOString().substring(0, 10),
                occupancy: searchRequest.occupancy
            }
        )
    }

    render() {
        return <SearchBox onClick={this.handleSearch}></SearchBox>;
    }
}

export default connect(null, {fetchAccommodationRateSearch})(SearchBoxContainer);
