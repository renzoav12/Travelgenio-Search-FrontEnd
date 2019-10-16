import React from 'react';
import SearchCardListContainer from '../../containers/SearchCardList';
import SearchBoxContainer from '../../containers/SearchBox';
import FilterBoxContainer from '../../containers/FilterBox';
import { Grid } from '@material-ui/core';
import './Search.scss';

const Search = () => {
    return (
        <Grid container alignItems="flex-start">
            <Grid container item md={4} lg={3}>
                <SearchBoxContainer></SearchBoxContainer>
                <FilterBoxContainer></FilterBoxContainer>
            </Grid>
            <Grid container item md={8} lg={9}>
                <SearchCardListContainer></SearchCardListContainer>
            </Grid>
        </Grid>
    );
};

export default Search;