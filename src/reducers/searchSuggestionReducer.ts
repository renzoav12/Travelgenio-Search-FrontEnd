import { Reducer } from 'redux';
import { SearchSuggestionAction, SearchSuggestionsActionTypes } from '../actions/suggestion/suggestion.action';
import { SuggestionEntry } from '@hotels/search-box/dist/Autocomplete/Autocomplete';

export interface SearchSuggestion {
    suggestions: Array<SuggestionEntry>;
    suggestionName: string;
    loading: boolean;
    error: String | null
}

const initialState = {
    suggestions: [],
    suggestionName: "",
    loading: false,
    error: null
};

export const searchSuggestionReducer: Reducer<SearchSuggestion, SearchSuggestionAction> = (
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
                suggestions: action.suggestions,
                loading: false
            };
        case SearchSuggestionsActionTypes.FETCH_NAME_SUCCESS:
            return {
                ...state,
                suggestionName: action.suggestion.description,
                suggestions: [action.suggestion]
            };
        default:
            return state;
    }
};
