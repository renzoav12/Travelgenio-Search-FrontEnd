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
    type: string;
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
        console.info("Filters has changed -> field = " + field + ", type = " + filterType + ", values = " + JSON.stringify(values));

        this.setState((prevState:State) => {

          let filters: Map<string, any> = prevState.filters;

          let filter: any = prevState.filters.get(field);

          if (filterType == FilterType.Value) {
            filter.value = values[0];
          } else if (filterType == FilterType.Range) {
            filter.values.min = parseInt(values[0]);
            filter.values.max = parseInt(values[1]);
          } else if (filterType == FilterType.Option) {
            filter.options.forEach(option => { option.selected = values.indexOf(option.code)>-1});
          }

          return {filters : filters};

        });
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