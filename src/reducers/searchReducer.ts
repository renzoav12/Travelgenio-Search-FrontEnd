import _ from 'lodash';
import { Reducer } from 'redux';
import { Search, SearchFilterResponse, SearchFilter } from '../model/search';
import { SearchActionTypes } from '../actions/search/search.actionTypes';
import { SearchAction } from '../actions/search/search.action';
import moment, {Moment} from 'moment';
import { ValueFilterProp } from '../components/FilterBox/ValueFilter/ValueFilter';
import { SingleOptionFilterProp } from '../components/FilterBox/SingleOptionFilter/SingleOptionFilter';
import { RangeFilterProp } from '../components/FilterBox/RangeFilter/RangeFilter';

const initialState: Search = {
    box: {
        location: {
            code: '',
            type: ''
        },
        occupancy: {
            rooms: []
        },
        stay: {
            from: moment(),
            to: moment()
        }
    },
    filters: new Map(),
    pagination: {page: 0, size: 5},
    accommodations: [],
    loading: false,
    error: null
};

function convertFilters(searchFilter: SearchFilterResponse) : SearchFilter {
    const filter: SearchFilter = new Map();

    searchFilter.singleValue.forEach((value: ValueFilterProp) => {
        filter.set(value.field, value);
    })

    searchFilter.rangeValue.forEach((value: RangeFilterProp) => {
        filter.set(value.field, value);
    })
    
    searchFilter.singleOption.forEach((value: SingleOptionFilterProp) => {
        filter.set(value.field, value);
    })    
    return filter;
}

export const searchReducer: Reducer<Search, SearchAction> = (
    state = initialState, 
    action
) => {
    switch (action.type) {

        case SearchActionTypes.FETCH_START:
            return { ...state, loading: true };
        case SearchActionTypes.FETCH_FAILED:
            return { ...state, loading: false };
        case SearchActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                accommodations: state.accommodations.concat(action.payload.accommodations),
                filters: convertFilters(action.payload.filters),
                loading: false
            };

        case SearchActionTypes.SEARCH_INCREMENT_PAGE:
            return {
                ...state,
                pagination: {
                    page: state.pagination.page + 1,
                    size: state.pagination.size
                }
            };

        case SearchActionTypes.SAERCHBOX_CHANGE:
            return {
                ...state,
                box: {
                    ...action.searchBoxState
                }
            };            

        default:
            return state;
    }
};