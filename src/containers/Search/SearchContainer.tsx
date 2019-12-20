import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RootState } from '../../store';

import { loadNextPage } from '../../actions/pagination/pagination.action';
import { thunkAccommodationSelect } from '../../actions/cardList/cardList.action';
import Search, { SearchProps } from '../../components/Search/Search';
import { thunkFilterBoxChange } from '../../actions/filterBox/filterBox.action';
import { thunkSearchBoxChange } from '../../actions/searchBox/searchBox.action';
import { fetchSearchSuggestion } from '../../actions/suggestion/suggestion.action';

import moment from 'moment';
import { SearchBoxState, SearchBoxOccupancyState, SearchBoxStayState } from '../../components/SearchBox/SearchBox';

import './SearchContainer.scss';
import { Room } from '@material-ui/icons';

class SearchContainer extends Component<SearchProps> {
    
    componentDidMount() {
        this.props.onChange(this.props.search);
    }
    
    render() {
        return <Search
                search={this.props.search}
                onChange={this.props.onChange}
                onChangeSuggestion={this.props.onChangeSuggestion}
                accommodations={this.props.accommodations}
                loading={this.props.loading}
                loadNextPage={this.props.loadNextPage}
                pagination={this.props.pagination}
                selected={this.props.selected}
                filters={this.props.filters}
                filtersOnChange={this.props.filtersOnChange}
                />
    }
}

function parseStay(from: string, to: string): SearchBoxStayState {
    return {
        from: moment(from, "YYYY-MM-DD"),
        to: moment(to, "YYYY-MM-DD")
    };
}

function parseOccupancy(searchOccupancy: string): SearchBoxOccupancyState {
  let rooms = searchOccupancy.split("!")
      .map(room => {
        let guests = room.split("-"); 
        return {
          adults: parseInt(guests[0]),
          childrenAges: guests.slice(1,guests.length).map(age => parseInt(age))
        };
      });
  return { rooms };
}

function createSearchFromParams(params: any): SearchBoxState {
    return {
        stay: parseStay(params.stayFrom, params.stayTo),
        location: {
            type: params.locationType,
            code: params.locationCode
        },
        occupancy: parseOccupancy(params.occupancy)
    };
}

const mapStateToProps = (rootState: RootState, ownProps) => {
    return {
        search: createSearchFromParams(ownProps.match.params),
        accommodations: rootState.search.accommodations,
        pagination: rootState.search.pagination,
        loading: rootState.search.loading,
        filters: rootState.search.filters
    };
};

export default connect(
    mapStateToProps,
    {
        onChange: thunkSearchBoxChange,
        onChangeSuggestion: fetchSearchSuggestion,
        loadNextPage: loadNextPage,
        selected: thunkAccommodationSelect,
        filtersOnChange: thunkFilterBoxChange
    }
)(SearchContainer);
