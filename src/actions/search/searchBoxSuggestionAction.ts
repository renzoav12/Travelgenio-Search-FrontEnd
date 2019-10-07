import search from '../../api/suggestions/suggestions';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../../store';
import { AxiosResponse } from 'axios';
import { SearchSuggestionResponse } from '../../reducers/searchBoxSuggestionReducer';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

export enum SearchSuggestionsActionTypes {
    FETCH = 'FETCH_SEARCH_SUGGESTIONS',
    FETCH_SUCCESS = 'FETCH_SEARCH_SUGGESTIONS_SUCCESS',
    FETCH_FAILED = 'FETCH_SEARCH_SUGGESTIONS_FAILED'
}

interface FetchSearchSuggestion {
    type: SearchSuggestionsActionTypes.FETCH;
}

interface FetchSearchSuggestionSuccess {
    type: SearchSuggestionsActionTypes.FETCH_SUCCESS;
    payload: SearchSuggestionResponse;
}

interface FetchSearchSuggestionFailed {
    type: SearchSuggestionsActionTypes.FETCH_FAILED;
}

export interface SearchSuggestionParameters {
    readonly hint: string
}

export const fetchSearchSuggestion = (queryParameters: SearchSuggestionParameters): ThunkResult<void> => async dispatch => {
    handleFetchSearchSuggestion(dispatch);

    try {
        const response: AxiosResponse<SearchSuggestionResponse> = await search.get('/suggestions', {
            params: queryParameters
        });
        handleAccommodationRateSearchSuccess(dispatch, response.data);
    } catch (e) {
        handleAccommodationRateSearchFailed(dispatch);
    }
};

export const handleFetchSearchSuggestion = (dispatch: Dispatch<FetchSearchSuggestion>) => {
    dispatch({
        type: SearchSuggestionsActionTypes.FETCH
    });
};

export const handleAccommodationRateSearchSuccess = (
    dispatch: Dispatch<FetchSearchSuggestionSuccess>,
    response: SearchSuggestionResponse
) => {
    dispatch({
        type: SearchSuggestionsActionTypes.FETCH_SUCCESS,
        payload: response
    });
};

export const handleAccommodationRateSearchFailed = (dispatch: Dispatch<FetchSearchSuggestionFailed>) => {
    dispatch({
        type: SearchSuggestionsActionTypes.FETCH_FAILED
    });
};

export type SearchSuggestionAction = 
    | FetchSearchSuggestion 
    | FetchSearchSuggestionSuccess 
    | FetchSearchSuggestionFailed;
