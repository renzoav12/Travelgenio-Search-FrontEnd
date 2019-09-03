import _ from 'lodash';
import { AccommodationRateSearchAction, AccommodationRateSearchActionTypes } from '../actions/accommodationRateSearchActions';
import { Reducer } from 'redux';

export interface AccommodationRateModel {
    id: number;
    name: string;
}

export interface AccommodationRateModels {
    [id: number]: AccommodationRateModel;
}

export interface AccommodationRateSearchState {
    items: AccommodationRateModels;
    loading: boolean;
    error: String | null
}

const initialState = {
    items: {},
    loading: false,
    error: null
};

export const accommodationRateSearchReducer: Reducer<AccommodationRateSearchState, AccommodationRateSearchAction> = (
    state = initialState,
    action 
) => {
    switch (action.type) {
        case AccommodationRateSearchActionTypes.FETCH:
            return { ...state, loading: true };
        case AccommodationRateSearchActionTypes.FETCH_FAILED:
            return { ...state, loading: false };
        case AccommodationRateSearchActionTypes.FETCH_SUCCESS:
            return {...state, items: { ...state.items, ..._.mapKeys(action.payload, 'id') }, loading: false };
        default:
            return state;
    }
};
