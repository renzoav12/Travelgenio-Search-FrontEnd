import React, { Component } from 'react';
import FilterBox from '../../components/FilterBox';
import { RangeFilterProp } from '../../components/FilterBox/RangeFilter/RangeFilter';
import { SingleOptionFilterProp } from '../../components/FilterBox/SingleOptionFilter/SingleOptionFilter';
import { ValueFilterProp } from '../../components/FilterBox/ValueFilter/ValueFilter';

export interface FilterBoxContainerProps {
}

class FilterBoxContainer extends Component<FilterBoxContainerProps> {
    constructor(props: FilterBoxContainerProps) {
        super(props);
    }

    onChange = (filters: Map<string, 
        ValueFilterProp
        | RangeFilterProp 
        | SingleOptionFilterProp>): void => {
        console.info("Filters has changed -> " + JSON.stringify(filters));
    }

    render() {
        return <FilterBox onChange={this.onChange}></FilterBox>;
    }
}

export default FilterBoxContainer;
