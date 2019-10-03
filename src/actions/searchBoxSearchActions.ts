import search from '../api/search/search';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../store';
import { SearchResponse} from '../reducers/searchBoxSearchReducer';
import { AxiosResponse } from 'axios';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

export enum AccommodationRateSearchActionTypes {
    FETCH = 'FETCH_ACCOMMODATION_RATE_SEARCH',
    FETCH_SUCCESS = 'FETCH_ACCOMMODATION_RATE_SEARCH_SUCCESS',
    FETCH_FAILED = 'FETCH_ACCOMMODATION_RATE_SEARCH_FAILED'
}

interface FetchSearchBoxSearch {
    type: AccommodationRateSearchActionTypes.FETCH;
}

interface FetchSearchBoxSearchSuccess {
    type: AccommodationRateSearchActionTypes.FETCH_SUCCESS;
    payload: SearchResponse;
}

interface FetchSearchBoxSearchFailed {
    type: AccommodationRateSearchActionTypes.FETCH_FAILED;
}

export interface SearchParameters {
    readonly locationType: string,
    readonly locationCode: string,   
    readonly checkIn: string,
    readonly checkOut: string,
    readonly occupancy: string,
    readonly language: string,
    readonly country: string
}

export interface SearchHeaderParameters {
    readonly country: string
}


export const fetchSearchBoxSearch = (queryParameters: SearchParameters): ThunkResult<void> => async dispatch => {
    handleFetchSearchBoxSearch(dispatch);

    try {
        const response: AxiosResponse<SearchResponse> = await search.get('/search', {
            params: queryParameters,
            headers: {
                language: queryParameters.language,
                country: queryParameters.country
            }
        });
        handleFetchSearchBoxSearchSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchSearchBoxSearchFailed(dispatch);
    }
};



export const handleFetchSearchBoxSearch = (dispatch: Dispatch<FetchSearchBoxSearch>) => {
    dispatch({
        type: AccommodationRateSearchActionTypes.FETCH
    });
};

export const handleFetchSearchBoxSearchSuccess = (
    dispatch: Dispatch<FetchSearchBoxSearchSuccess>,
    response: SearchResponse
) => {
    dispatch({
        type: AccommodationRateSearchActionTypes.FETCH_SUCCESS,
        payload: response
    });
};

export const handleFetchSearchBoxSearchFailed = (dispatch: Dispatch<FetchSearchBoxSearchFailed>) => {
    dispatch({
        type: AccommodationRateSearchActionTypes.FETCH_FAILED
    });
};

export type AccommodationRateSearchAction = 
    | FetchSearchBoxSearch 
    | FetchSearchBoxSearchSuccess 
    | FetchSearchBoxSearchFailed;
