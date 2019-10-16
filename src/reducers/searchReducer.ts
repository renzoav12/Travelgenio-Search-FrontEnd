import _ from 'lodash';
import { Reducer } from 'redux';
import { Search, SearchFilterResponse, SearchFilter } from '../model/search';
import { SearchActionTypes } from '../actions/search/search.actionTypes';
import { SearchAction } from '../actions/search/search.action';
import moment, {Moment} from 'moment';
import { ValueFilterProp } from '../components/FilterBox/ValueFilter/ValueFilter';
import { SingleOptionFilterProp } from '../components/FilterBox/SingleOptionFilter/SingleOptionFilter';
import { RangeFilterProp } from '../components/FilterBox/RangeFilter/RangeFilter';
import { FilterBoxSelected } from '../containers/FilterBox/FilterBoxContainer';
import { FilterType } from '../components/FilterBox/FilterBox';
import { Filter } from '@material-ui/icons';

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
    const filters: SearchFilter = new Map();

    searchFilter.singleValue.forEach((value: ValueFilterProp) => {
        filters.set(value.field, value);
        value.type = FilterType.Value;
    })

    searchFilter.rangeValue.forEach((value: RangeFilterProp) => {
        filters.set(value.field, value);
        value.type = FilterType.Range;
    })
    
    searchFilter.singleOption.forEach((value: SingleOptionFilterProp) => {
        filters.set(value.field, value);
        value.type = FilterType.SingleOption;
    })
    console.log('convertFilters' + JSON.stringify(filters));

    return filters;
}

function filterApplySelected(filters: SearchFilter, selected: FilterBoxSelected) : SearchFilter {
    const newFilters: SearchFilter = new Map;

    switch (selected.type) {
        case FilterType.SingleOption:
            const filter = filters.get(selected.field) as SingleOptionFilterProp;

            filter.options.forEach((option) => {
                if (selected.values.includes(option.code)) {
                    option.selected = true;
                }
            });
        case FilterType.Range:
        break;
        case FilterType.Value:
        break;
    }

    console.log('filterApplySelected' + JSON.stringify(filters));
    return filters;
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
            
        case SearchActionTypes.SAERCH_FILTER_CHANGED:
            alert(JSON.stringify(state.filters));
            return {
                ...state,
                filters: filterApplySelected(state.filters, action.changed)
            };

        default:
            return state;
    }
};