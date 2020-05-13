import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { Container } from "@material-ui/core";
import { loadNextPage } from '../../actions/pagination/pagination.action';
import { loadI18n } from '../../actions/i18n/i18n.action';
import { thunkAccommodationSelect } from '../../actions/cardList/cardList.action';
import Search from '../../components/Search/Search';
import { thunkFilterBoxChange } from '../../actions/filterBox/filterBox.action';
import { thunkSearchBoxChange } from '../../actions/searchBox/searchBox.action';
import { fetchSuggestionSearch, fetchSuggestionSearchName, SearchNameSuggestionParameters } from '../../actions/suggestion/suggestion.action';
import moment from 'moment';
import { SearchBoxState, SearchBoxOccupancyState, SearchBoxStayState } from '@hotels/search-box';
import { SuggestionHint, SuggestionEntry } from '@hotels/search-box/dist/Autocomplete/Autocomplete';
import { Pagination, SearchFilter } from '../../model/search';
import { FilterBoxSelected } from '../../components/FilterBox/FilterBox';
import { CardProps } from '../../components/Card/Card';

export interface SearchContainerProps {
  search: SearchBoxState;
  suggestionName: string;
  onChange: (state: SearchBoxState) => void;
  onChangeSuggestionHint: (suggestionHint: SuggestionHint) => void;
  searchSuggestionName: (params: SearchNameSuggestionParameters) => void;

  loading: boolean;
  pagination: Pagination;
  accommodations: CardProps[];
  loadNextPage: () => void;
  selected: (id: string) => void;
  loadI18n: () => void;

  filtersOnChange: (searchBoxState: FilterBoxSelected) => void;
  filters: SearchFilter;

  suggestions: SuggestionEntry[];
}

const SearchContainer: FunctionComponent<SearchContainerProps> = props => {

  useEffect(() => {
    props.onChange(props.search);
    props.searchSuggestionName(props.search.location);
    props.loadI18n();
  }, []);

  return <Container maxWidth="lg">
    <Search
      search={props.search}
      suggestionName={props.suggestionName}
      onChange={props.onChange}
      onChangeSuggestionHint={props.onChangeSuggestionHint}
      accommodations={props.accommodations}
      loading={props.loading}
      loadNextPage={props.loadNextPage}
      pagination={props.pagination}
      selected={props.selected}
      filters={props.filters}
      filtersOnChange={props.filtersOnChange}
      suggestions={props.suggestions}
    />
  </Container>
}

const parseStay = (from: string, to: string): SearchBoxStayState => {
  return {
    from: moment(from, "YYYY-MM-DD"),
    to: moment(to, "YYYY-MM-DD")
  };
}

const parseOccupancy = (searchOccupancy: string): SearchBoxOccupancyState => {
  let rooms = searchOccupancy.split("!")
    .map(room => {
      let guests = room.split("-");
      return {
        adults: parseInt(guests[0]),
        childrenAges: guests.slice(1, guests.length).map(age => parseInt(age))
      };
    });
  return { rooms };
}

const createSearchFromParams = (params: any): SearchBoxState => {
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
    filters: rootState.search.filters,
    suggestions: rootState.searchSuggestion.suggestions,
    suggestionName: rootState.searchSuggestion.suggestionName
  };
};

export default connect(
  mapStateToProps,
  {
    onChange: thunkSearchBoxChange,
    onChangeSuggestionHint: fetchSuggestionSearch,
    searchSuggestionName: fetchSuggestionSearchName,
    loadNextPage: loadNextPage,
    loadI18n: loadI18n,
    selected: thunkAccommodationSelect,
    filtersOnChange: thunkFilterBoxChange
  }
)(SearchContainer);
