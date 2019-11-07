import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import SearchBox from '../SearchBox';
import { SearchBoxProps, SearchBoxState, SearchBoxSuggestionState } from '../SearchBox/SearchBox';
import FilterBox, { FilterBoxProps, FilterBoxSelected } from '../FilterBox/FilterBox';

import Result, { ResultProps } from './Result/Result';
import { Pagination, SearchFilter } from '../../model/search';
import { CardProps } from '../Card/Card';

import './Search.scss';

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

class Search extends Component<SearchProps> {
    render() {
        return <Grid container alignItems="flex-start">
        <Grid container item md={4} lg={3}>
            <SearchBox
                    init={this.props.search}
                    onChange={this.props.onChange} 
                    onChangeSuggestion={this.props.onChangeSuggestion}/>

            <FilterBox
                    filters={this.props.filters}
                    onChange={this.props.filtersOnChange}/>
        </Grid>
        <Grid container item md={8} lg={9}>
            <Result
                    accommodations={this.props.accommodations}
                    loadNextPage={this.props.loadNextPage}
                    loading={this.props.loading}
                    selected={this.props.selected}
                    pagination={this.props.pagination}/>
        </Grid>
    </Grid>;
    }
}

export default Search;