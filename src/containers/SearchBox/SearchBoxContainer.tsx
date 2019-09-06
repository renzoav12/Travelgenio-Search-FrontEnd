import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchAccommodationRateSearch, SearchParameters} from '../../actions/accommodationRateSearchActions';
import SearchBox from '../../components/SearchBox';

export interface SearchBoxContainerProps {
    fetchAccommodationRateSearch: (parameters: SearchParameters) => void;
}

class SearchBoxContainer extends Component<SearchBoxContainerProps> {
    constructor(props: SearchBoxContainerProps) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(asd: String) {
        this.props.fetchAccommodationRateSearch(
            {
                type: 'asd',
                value: 'asd',                
                checkIn: '2010-12-22',
                checkOut: '2010-12-22',
                occupancy: '123'
            }
        )
    }

    render() {
        return <SearchBox onClick={this.handleSearch}></SearchBox>;
    }
}

export default connect(null, {fetchAccommodationRateSearch})(SearchBoxContainer);
