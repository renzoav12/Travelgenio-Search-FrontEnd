import React, { Component } from 'react';
import FilterBox from '../../components/FilterBox';

export interface FilterBoxContainerProps {
}

class FilterBoxContainer extends Component<FilterBoxContainerProps> {
    constructor(props: FilterBoxContainerProps) {
        super(props);
    }


    render() {
        return <FilterBox></FilterBox>;
    }
}

export default FilterBoxContainer;
