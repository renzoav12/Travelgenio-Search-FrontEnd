import _ from 'lodash';
import { AccommodationRateSearchAction, AccommodationRateSearchActionTypes } from '../actions/accommodationRateSearchActions';
import { Reducer } from 'redux';
import { SearchCardProps } from '../components/SearchCard/SearchCard';

export interface SearchResponse {
    accommodations: SearchCardProps[];
}

export interface SearchRequest {
    data: SearchResponse;
    loading: boolean;
    error: String | null
}

const initialState = {
    data: {
        accommodations: []
    },
    loading: false,
    error: null
};

export const accommodationRateSearchReducer: Reducer<SearchRequest, AccommodationRateSearchAction> = (
    state = initialState, 
    action
) => {
    switch (action.type) {
        case AccommodationRateSearchActionTypes.FETCH:
            return { ...state, loading: true };
        case AccommodationRateSearchActionTypes.FETCH_FAILED:
            return { ...state, loading: false };
        case AccommodationRateSearchActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                data: {...state.data, ...convert(action.payload)},
                loading: false
            };
        default:
            return state;
    }
};


const convert = (searchResponse: SearchResponse): SearchResponse => {
    return searchResponse;
    /*
    alert(JSON.stringify(searchResponse));
    return [{
        content: {id: 'asd', title: '111', images: ['http://asd']}
    }]
    */
}

