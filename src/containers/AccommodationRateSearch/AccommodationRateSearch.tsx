import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import AccommodationRate from '../../components/accommodationRate';
import { fetchAccommodationRateSearch } from '../../actions/accommodationRateSearchActions';
import { RootState } from '../../store';
import { AccommodationRateModel } from '../../reducers/accommodationRateSearchReducer';

export interface AccommodationRateSearchProps {
    models: AccommodationRateModel[];
    fetchAccommodationRateSearch: () => any;
}

class AccommodationRateSearch extends Component<AccommodationRateSearchProps> {
    componentDidMount(): void {
        this.props.fetchAccommodationRateSearch();
    }

    renderAll(): JSX.Element[] | null {
        const { models } = this.props;
        if (!models) {
            return null;
        }
        return models.map((accommodationRateModel: AccommodationRateModel) => {
            return <AccommodationRate rate={accommodationRateModel} key={accommodationRateModel.id} />;
        });
    }

    render() {
        return <div className="ui horizontal cards">{this.renderAll()}</div>;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        models: _.values(state.search.items)
    };
};

export default connect(mapStateToProps, { fetchAccommodationRateSearch })(AccommodationRateSearch);
