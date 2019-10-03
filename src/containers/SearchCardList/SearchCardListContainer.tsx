import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import SearchCardList from '../../components/SearchCardList';
import { SearchCardListProps } from '../../components/SearchCardList/SearchCardList';

import './SearchCardListContainer.scss';

class SearchCardListContainer extends Component<SearchCardListProps> {
    render() {
        return <div className="otravo-serach-card-list-container">
                <div className="otravo-serach-card-list-counter">
                    <div>{this.props.accommodations.length} alojamientos encontrados</div>
                </div>
                <SearchCardList accommodations={this.props.accommodations}></SearchCardList>
            </div>
    }
}

const mapStateToProps = (rootState: RootState) => {
    return {
        accommodations: rootState.search.data.accommodations
    };
};

export default connect(mapStateToProps, {})(SearchCardListContainer);
