import React, { Component } from 'react';
import FilterBox from '../../components/FilterBox';
import { RangeFilterProp } from '../../components/FilterBox/RangeFilter/RangeFilter';
import { SingleOptionFilterProp } from '../../components/FilterBox/SingleOptionFilter/SingleOptionFilter';
import { ValueFilterProp } from '../../components/FilterBox/ValueFilter/ValueFilter';
import { FilterType } from '../../components/FilterBox/FilterBox';
import { RootState } from '../../store';
import { connect } from 'react-redux';
import { handleFilterBoxChange } from '../../actions/search/searchFilterActions';
import { SearchFilter } from '../../model/search';

export interface FilterBoxSelected {
    type: FilterType;
    field: string;
    values: Array<String>;
}

export interface FilterBoxContainerProps {
    onChange: (searchBoxState: FilterBoxSelected) => void;
    filters: SearchFilter;
}

export interface State {
  filters: Map<string, ValueFilterProp 
  | RangeFilterProp 
  | SingleOptionFilterProp>;
}

class FilterBoxContainer extends Component<FilterBoxContainerProps, State> {
    constructor(props: FilterBoxContainerProps) {
        super(props);
    }

    onChange = (field: string, filterType: FilterType, values: Array<string>): void => {
        this.props.onChange({field: field, type: filterType, values});
    }

    render() {
        return <FilterBox filters={this.props.filters} onChange={this.onChange.bind(this)}></FilterBox>;
    }
}

const mapStateToProps = (rootState: RootState) => {
    return {
        filters: rootState.search.filters
    };
};

export default connect(
    mapStateToProps,
    {
        onChange: handleFilterBoxChange
    }
)(FilterBoxContainer);