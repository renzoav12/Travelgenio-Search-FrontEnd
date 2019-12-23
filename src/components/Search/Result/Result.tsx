import React, { Component } from 'react';
import _ from 'lodash';
import SearchCardList from '../../CardList';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Pagination } from '../../../model/search';
import { Grid, Box } from '@material-ui/core';
import { CardProps } from '../../Card/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Result.scss';

export interface ResultProps {
    loading: boolean;
    pagination: Pagination;
    accommodations: CardProps[];
    loadNextPage: () => void;
    selected: (id: string) => void;
}

class Result extends Component<ResultProps> {

    loadNextPage() {
        this.props.loadNextPage();
    }

    renderCardList() {
        return <SearchCardList 
                accommodations={this.props.accommodations}
                selected={this.props.selected}/>
    }

    renderLoaderWhenLoading() {
        if (this.props.loading) 
            return this.renderLoader();
    }

    renderLoader() {
        return <Box className="box"><CircularProgress/></Box>;
    }

    renderCardListWithInfiniteScroll() {
        return <InfiniteScroll
                    dataLength={this.props.accommodations.length} 
                    pageStart={1}
                    hasMore={true}
                    initialLoad={false}
                    next={this.loadNextPage.bind(this)}
                    loader={this.renderLoaderWhenLoading()}>
                    {this.renderCardList()}
                </InfiniteScroll>
    }

    render() {
        const hasCards = this.props.accommodations.length > 0;

        return <Grid container className="otravo-serach-card-list-container">
            <Grid item xs={12} className="otravo-title-2 otravo-serach-card-list-counter">
                <div>{this.props.pagination.elements} alojamientos encontrados</div>
            </Grid>
            <Grid item xs={12}>
                {hasCards && this.renderCardListWithInfiniteScroll()}
            </Grid>
        </Grid>
    }
}

export default Result