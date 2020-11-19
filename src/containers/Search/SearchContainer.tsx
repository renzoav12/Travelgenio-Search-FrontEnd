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
import { Pagination, SearchFilter, SortField } from '../../model/search';
import { FilterBoxSelected } from '../../components/FilterBox/FilterBox';
import { CardProps } from '../../components/Card/Card';
import { initCobrand } from "@hotels/header-footer";
import config from "../../config";
import { enableView } from "../../actions/map/map.action";
import { thunkSort } from '../../actions/search/search.action';
import { LocaleState } from '../../reducers/localeReducer';

export interface SearchContainerProps {
  initialSearch: SearchBoxState;
  search: SearchBoxState;
  suggestionName: string;
  onChange: (state: SearchBoxState) => void;
  onChangeSuggestionHint: (suggestionHint: SuggestionHint) => void;
  searchSuggestionName: (params: SearchNameSuggestionParameters) => void;

  loading: boolean;
  pagination: Pagination;
  accommodations: CardProps[];
  mapAccommodations: CardProps[];
  loadNextPage: () => void;
  selected: (id: string) => void;
  loadI18n: () => void;

  filtersOnChange: (searchBoxState: FilterBoxSelected) => void;
  filters: SearchFilter;

  sortFields: SortField[];
  sort: (field: string, order: string) => void;

  suggestions: SuggestionEntry[];

  initCobrand?: (url: string, emailSubscriptionUrl: string) => void;
  enableView: (listView: boolean) => void;
  loadingMap: boolean;

  locale: LocaleState;
}

const SearchContainer: FunctionComponent<SearchContainerProps> = props => {

  useEffect(() => {
    props.loadI18n();
    props.initCobrand && props.initCobrand(config.COBRAND, config.EMAIL_SUBSCRIPTION);
  }, []);

  useEffect(() => {
    if(props.locale.code !== null){
      props.onChange(props.initialSearch);
      props.searchSuggestionName(props.initialSearch.location);
      }
  }, [props.locale.code]);

  return <Container maxWidth="lg">
    <Search
      initialSearch={props.initialSearch}
      search={props.search}
      suggestionName={props.suggestionName}
      onChange={props.onChange}
      onChangeSuggestionHint={props.onChangeSuggestionHint}
      accommodations={props.accommodations}
      mapAccommodations={props.mapAccommodations}
      loading={props.loading}
      loadNextPage={props.loadNextPage}
      pagination={props.pagination}
      selected={props.selected}
      filters={props.filters}
      filtersOnChange={props.filtersOnChange}
      sortFields={props.sortFields}
      sort={props.sort}
      suggestions={props.suggestions}
      enableView = {props.enableView}
      loadingMap = {props.loadingMap}
      code = {props.locale.code}
      display={false}
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
      code: params.locationCode,
      name: "init"
    },
    occupancy: parseOccupancy(params.occupancy)
  };
}

const mapStateToProps = (rootState: RootState, ownProps) => {
  return {
    initialSearch: createSearchFromParams(ownProps.match.params),
    search: rootState.search.box,
    accommodations: rootState.search.accommodations,
    mapAccommodations: rootState.map.accommodations,
    pagination: rootState.search.pagination,
    loading: rootState.search.loading,
    filters: rootState.search.filters,
    sortFields: rootState.search.sortFields,
    suggestions: rootState.searchSuggestion.suggestions,
    suggestionName: rootState.searchSuggestion.suggestionName,
    loadingMap: rootState.map.loading,
    locale: rootState.locale,
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
    filtersOnChange: thunkFilterBoxChange,
    initCobrand: initCobrand,
    enableView: enableView,
    sort: thunkSort,
  }
)(SearchContainer);
