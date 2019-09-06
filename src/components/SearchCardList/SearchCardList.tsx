import React, { Component } from 'react';
import _ from 'lodash';
import SearchCard from '../../components/SearchCard';
import { AccommodationRateModel } from '../../reducers/accommodationRateSearchReducer';

export interface SearchCardListProps {
    models: AccommodationRateModel[];
}

class SearchCardList extends Component<SearchCardListProps> {
    renderAll(): JSX.Element[] | null {
        const { models } = this.props;
        if (!models) {
            return null;
        }
        return models.map((accommodationRateModel: AccommodationRateModel) => {
            return <SearchCard rate={accommodationRateModel} key={accommodationRateModel.id} />;
        });
    }

    render() {
        return <div className="ui horizontal cards">{this.renderAll()}</div>;
    }
}

export default SearchCardList