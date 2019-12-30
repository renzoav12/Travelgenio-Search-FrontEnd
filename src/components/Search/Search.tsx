import React, { SFC } from 'react';
import { Grid } from '@material-ui/core';
import SearchBox from '../SearchBox';
import { SearchBoxState, SearchBoxSuggestionState } from '../SearchBox/SearchBox';
import FilterBox, { FilterBoxSelected } from '../FilterBox/FilterBox';

import Result from './Result/Result';
import { Pagination, SearchFilter } from '../../model/search';
import { CardProps } from '../Card/Card';

export interface SearchProps {
    search: SearchBoxState;
    onChange: (state: SearchBoxState) => void;
    onChangeSuggestion: (state: SearchBoxSuggestionState) => void;
    
    loading: boolean;
    pagination: Pagination;
    accommodations: CardProps[];
    loadNextPage: () => void;
    selected: (id: string) => void;

    filtersOnChange: (searchBoxState: FilterBoxSelected) => void;
    filters: SearchFilter;    
}

const Search: SFC<SearchProps> = props => {
        return <Grid container alignItems="flex-start">
        <Grid container item md={4} lg={3}>
            <SearchBox
                    init={props.search}
                    onChange={props.onChange} 
                    onChangeSuggestion={props.onChangeSuggestion}/>

            <FilterBox
                    filters={props.filters}
                    onChange={props.filtersOnChange}/>
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