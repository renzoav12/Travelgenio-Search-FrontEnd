import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import SearchCardList from '../../components/SearchCardList';
import { SearchCardListProps } from '../../components/SearchCardList/SearchCardList';

class SearchCardListContainer extends Component<SearchCardListProps> {
    render() {
        return <SearchCardList accommodations={this.props.accommodations}></SearchCardList>
    }
}

const mapStateToProps = (rootState: RootState) => {
    return {
        accommodations: rootState.search.data.accommodations
    };
};

export default connect(mapStateToProps, {})(SearchCardListContainer);
