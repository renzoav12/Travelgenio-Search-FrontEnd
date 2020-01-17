import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import SearchBox from '../SearchBox/SearchBox';
import { SearchBoxState } from '../SearchBox/SearchBox';
import FilterBox, { FilterBoxSelected } from '../FilterBox/FilterBox';

import Result from './Result/Result';
import { Pagination, SearchFilter } from '../../model/search';
import { CardProps } from '../Card/Card';
import { SuggestionHint, SuggestionEntry } from '../SearchBox/Autocomplete/Autocomplete';

export interface SearchProps {
    search: SearchBoxState;
    suggestionName: string;
    onChange: (state: SearchBoxState) => void;
    onChangeSuggestionHint: (suggestionHint: SuggestionHint) => void;
    
    loading: boolean;
    pagination: Pagination;
    accommodations: CardProps[];
    loadNextPage: () => void;
    selected: (id: string) => void;

    filtersOnChange: (searchBoxState: FilterBoxSelected) => void;
    filters: SearchFilter;  
    
    suggestions: SuggestionEntry[];
}

const Search: FunctionComponent<SearchProps> = props => {
  return <Grid container alignItems="flex-start">
    <Grid container item md={4} lg={3}>
      <SearchBox
        init={props.search}
        suggestionName={props.suggestionName}
        onChange={props.onChange} 
        onChangeSuggestionHint={props.onChangeSuggestionHint}
        horizontal = {false}
        suggestions = {props.suggestions}/>
      <FilterBox
        filters={props.filters}
        onChange={props.filtersOnChange}
        loading={props.loading}/>
    </Grid>
    <Grid container item md={8} lg={9}>
      <Result
        accommodations={props.accommodations}
        loadNextPage={props.loadNextPage}
        loading={props.loading}
        selected={props.selected}
        pagination={props.pagination}/>
    </Grid>
  </Grid>;
}

export default Search;