import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { AccommodationRateModel } from '../../reducers/accommodationRateSearchReducer';
import SearchCardList from '../../components/SearchCardList';

export interface AccommodationRateSearchProps {
    models: AccommodationRateModel[];
}

class SearchCardListContainer extends Component<AccommodationRateSearchProps> {
    render() {
        return <SearchCardList models={this.props.models}></SearchCardList>
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        models: _.values(state.search.items)
    };
};

export default connect(mapStateToProps, {})(SearchCardListContainer);
