import search from '../api';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../store';
import { AccommodationRateModel, AccommodationRateModels } from '../reducers/accommodationRateSearchReducer';
import { AxiosResponse } from 'axios';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

export enum AccommodationRateSearchActionTypes {
    FETCH = 'FETCH_ACCOMMODATION_RATE_SEARCH',
    FETCH_SUCCESS = 'FETCH_ACCOMMODATION_RATE_SEARCH_SUCCESS',
    FETCH_FAILED = 'FETCH_ACCOMMODATION_RATE_SEARCH_FAILED'
}

interface FetchAccommodationRateSearch {
    type: AccommodationRateSearchActionTypes.FETCH;
}

interface FetchAccommodationRateSearchSuccess {
    type: AccommodationRateSearchActionTypes.FETCH_SUCCESS;
    payload: AccommodationRateModels;
}

interface FetchAccommodationRateSearchFailed {
    type: AccommodationRateSearchActionTypes.FETCH_FAILED;
}

export interface SearchParameters {
    readonly type: string
    readonly code: string    
    readonly checkIn: string
    readonly checkOut: string
    readonly occupancy: string
}


export const fetchAccommodationRateSearch = (parameters: SearchParameters): ThunkResult<void> => async dispatch => {
    handleFetchAccommodationRateSearch(dispatch);

    try {
        const response: AxiosResponse<AccommodationRateModel[]> = await search.get('/rates', {params: parameters});
        handleAccommodationRateSearchSuccess(dispatch, response.data);
    } catch (e) {
        handleAccommodationRateSearchFailed(dispatch);
    }
};



export const handleFetchAccommodationRateSearch = (dispatch: Dispatch<FetchAccommodationRateSearch>) => {
    dispatch({
        type: AccommodationRateSearchActionTypes.FETCH
    });
};

export const handleAccommodationRateSearchSuccess = (
    dispatch: Dispatch<FetchAccommodationRateSearchSuccess>,
    response: AccommodationRateModels
) => {
    dispatch({
        type: AccommodationRateSearchActionTypes.FETCH_SUCCESS,
        payload: response
    });
};

export const handleAccommodationRateSearchFailed = (dispatch: Dispatch<FetchAccommodationRateSearchFailed>) => {
    dispatch({
        type: AccommodationRateSearchActionTypes.FETCH_FAILED
    });
};

export type AccommodationRateSearchAction = 
    | FetchAccommodationRateSearch 
    | FetchAccommodationRateSearchSuccess 
    | FetchAccommodationRateSearchFailed;
