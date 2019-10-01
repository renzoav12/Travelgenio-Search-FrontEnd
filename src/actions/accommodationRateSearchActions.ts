import search from '../api';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../store';
import { SearchResponse} from '../reducers/accommodationRateSearchReducer';
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
    payload: SearchResponse;
}

interface FetchAccommodationRateSearchFailed {
    type: AccommodationRateSearchActionTypes.FETCH_FAILED;
}

export interface SearchParameters {
    readonly searchType: string,
    readonly searchCode: string,   
    readonly checkIn: string,
    readonly checkOut: string,
    readonly occupancy: string,
    readonly language: string,
    readonly country: string
}

export interface SearchHeaderParameters {
    readonly country: string
}


export const fetchAccommodationRateSearch = (queryParameters: SearchParameters): ThunkResult<void> => async dispatch => {
    handleFetchAccommodationRateSearch(dispatch);

    try {
        const response: AxiosResponse<SearchResponse> = await search.get('/search', {
            params: queryParameters,
            headers: {
                language: queryParameters.language,
                country: queryParameters.country
            }
        });
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
    response: SearchResponse
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
