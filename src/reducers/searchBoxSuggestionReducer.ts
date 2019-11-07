import _ from 'lodash';
import { Reducer } from 'redux';
import { CardProps } from '../components/Card/Card';
import { SearchSuggestionAction, SearchSuggestionsActionTypes } from '../actions/suggestion/suggestion.action';

export interface SearchSuggestionResponse {
    accommodations: CardProps[];
}

export interface SearchSuggestionRequest {
    data: SearchSuggestionResponse;
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

export const accommodationRateSearchReducer: Reducer<SearchSuggestionRequest, SearchSuggestionAction> = (
    state = initialState, 
    action
) => {
    switch (action.type) {
        case SearchSuggestionsActionTypes.FETCH:
            return { ...state, loading: true };
        case SearchSuggestionsActionTypes.FETCH_FAILED:
            return { ...state, loading: false };
        case SearchSuggestionsActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                data: {...state.data, ...action.payload},
                loading: false
            };
        default:
            return state;
    }
};
