import search from '../../api/suggestions/suggestions';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState } from '../../store';
import { AxiosResponse } from 'axios';
import { RootAction } from '../action';
import { SuggestionEntry } from '@hotels/search-box/dist/Autocomplete/Autocomplete';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export enum SearchSuggestionsActionTypes {
    FETCH = 'FETCH_SEARCH_SUGGESTIONS',
    FETCH_SUCCESS = 'FETCH_SEARCH_SUGGESTIONS_SUCCESS',
    FETCH_FAILED = 'FETCH_SEARCH_SUGGESTIONS_FAILED',
    FETCH_NAME = 'FETCH_SEARCH_SUGGESTION_NAME',
    FETCH_NAME_SUCCESS = 'FETCH_SEARCH_SUGGESTION_NAME_SUCCESS',
    FETCH_NAME_FAILED = 'FETCH_SEARCH_SUGGESTION_NAME_FAILED'
}

interface FetchSearchSuggestion {
    type: SearchSuggestionsActionTypes.FETCH;
}

interface FetchSearchSuggestionSuccess {
    type: SearchSuggestionsActionTypes.FETCH_SUCCESS;
    suggestions: Array<SuggestionEntry>;
}

interface FetchSearchSuggestionFailed {
    type: SearchSuggestionsActionTypes.FETCH_FAILED;
}

interface FetchSearchSuggestionName {
  type: SearchSuggestionsActionTypes.FETCH_NAME;
}

interface FetchSearchSuggestionNameSuccess {
  type: SearchSuggestionsActionTypes.FETCH_NAME_SUCCESS;
  suggestion: SuggestionEntry;
}

interface FetchSearchSuggestionNameFailed {
  type: SearchSuggestionsActionTypes.FETCH_NAME_FAILED;
}

export interface SearchSuggestionParameters {
    readonly text: string;
}

export interface SearchNameSuggestionParameters {
  readonly type: string;
  readonly code: string;
}

export const fetchSuggestionSearch = (queryParameters: SearchSuggestionParameters): ThunkResult<void> => async dispatch => {
    handleFetchSuggestionSearch(dispatch);

    try {
        const response: AxiosResponse<Array<SuggestionEntry>> = await search.get('/suggestions', {
            params: queryParameters
        });
        handleSuggestionSearchSuccess(dispatch, response.data);
    } catch (e) {
        handleSuggestionSearchFailed(dispatch);
    }
};

export const fetchSuggestionSearchName = (queryParameters: SearchNameSuggestionParameters): ThunkResult<void> => async dispatch => {
  handleFetchSuggestionSearchName(dispatch);

  try {
      const response: AxiosResponse<SuggestionEntry> = await search.get('/suggestions/' + queryParameters.code , {
          params: {
              'type': queryParameters.type
          }
      });
      handleSuggestionSearchNameSuccess(dispatch, response.data);
  } catch (e) {
      handleSuggestionSearchNameFailed(dispatch);
  }
};

export const handleFetchSuggestionSearch = (dispatch: Dispatch<FetchSearchSuggestion>) => {
    dispatch({
        type: SearchSuggestionsActionTypes.FETCH
    });
};

export const handleSuggestionSearchSuccess = (
    dispatch: Dispatch<FetchSearchSuggestionSuccess>,
    response: Array<SuggestionEntry>
) => {
    dispatch({
        type: SearchSuggestionsActionTypes.FETCH_SUCCESS,
        suggestions: response
    });
};

export const handleSuggestionSearchFailed = (dispatch: Dispatch<FetchSearchSuggestionFailed>) => {
    dispatch({
        type: SearchSuggestionsActionTypes.FETCH_FAILED
    });
};

export const handleFetchSuggestionSearchName = (dispatch: Dispatch<FetchSearchSuggestionName>) => {
  dispatch({
      type: SearchSuggestionsActionTypes.FETCH_NAME
  });
};

export const handleSuggestionSearchNameSuccess = (
  dispatch: Dispatch<FetchSearchSuggestionNameSuccess>,
  response: SuggestionEntry
) => {
  dispatch({
      type: SearchSuggestionsActionTypes.FETCH_NAME_SUCCESS,
      suggestion: response
  });
};

export const handleSuggestionSearchNameFailed = (dispatch: Dispatch<FetchSearchSuggestionNameFailed>) => {
  dispatch({
      type: SearchSuggestionsActionTypes.FETCH_NAME_FAILED
  });
};

export type SearchSuggestionAction = 
    | FetchSearchSuggestion 
    | FetchSearchSuggestionSuccess 
    | FetchSearchSuggestionFailed    
    | FetchSearchSuggestionName 
    | FetchSearchSuggestionNameSuccess 
    | FetchSearchSuggestionNameFailed;
;
