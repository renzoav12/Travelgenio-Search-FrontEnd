import React, { Component } from 'react';
import _ from 'lodash';
import { connect, DispatchProp } from 'react-redux';
import { RootState } from '../../store';
import SearchCardList from '../../components/SearchCardList';
import { SearchCardListProps } from '../../components/SearchCardList/SearchCardList';
import {searchFetchPage, handleSearchIncrementOnePage} from '../../actions/search/searchFetchActions';

import './SearchCardListContainer.scss';
import InfiniteScroll from 'react-infinite-scroller';
import { SearchPagination } from '../../model/search';
import { SearchAction } from '../../actions/search/search.action';

interface SearchCardListContainerDispatchProps {
    searchIncrementOnePage: () => void;
}

export interface SearchCardListContainerProps extends SearchCardListContainerDispatchProps, SearchCardListProps {
    pagination: SearchPagination;
}

class SearchCardListContainer extends Component<SearchCardListContainerProps> {

    incrementOnePage(page: number) {
        console.log("load more" + page);
        this.props.searchIncrementOnePage();
    }

    renderCardList() {
        return <SearchCardList accommodations={this.props.accommodations}></SearchCardList>
    }

    renderLoader() {
        return <div className="loader" key={0}>Loading ...</div>;
    }

    renderCardListWithInfiniteScroll() {
        return <InfiniteScroll
                    pageStart={0}
                    hasMore={true}
                    initialLoad={false}
                    loadMore={this.incrementOnePage.bind(this)}
                    loader={this.renderLoader()}>
                    {this.renderCardList()}
                </InfiniteScroll>
    }

    render() {
        const hasCards = this.props.accommodations.length > 0;

        return <div className="otravo-serach-card-list-container">
            <div className="otravo-serach-card-list-counter">
                <div>{this.props.accommodations.length} alojamientos encontrados</div>
            </div>
            <div>
            </div>
            <div>
                {hasCards && this.renderCardListWithInfiniteScroll()}
            </div>
        </div>
    }
}

const mapStateToProps = (rootState: RootState) => {
    return {
        accommodations: rootState.search.accommodations,
        pagination: rootState.search.pagination
    };
};

export default connect(
    mapStateToProps,
    {
        searchIncrementOnePage: handleSearchIncrementOnePage
    }
)(SearchCardListContainer);
