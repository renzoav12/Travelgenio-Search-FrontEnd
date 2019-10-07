import { SearchActionTypes } from './search.actionTypes'
import { SearchBoxState } from '../../components/SearchBox/SearchBox';
import { Action } from 'redux';
import { searchUpdate } from './searchFetchActions';

export interface SearchBoxChangeAction extends Action<SearchActionTypes.SAERCHBOX_CHANGE> {
    searchBoxState: SearchBoxState;
}

export const handleSearchBoxChange = (searchBoxState: SearchBoxState) => dispatch => {
    dispatch({
      type: SearchActionTypes.SAERCHBOX_CHANGE,
      searchBoxState
    })
    dispatch(searchUpdate());
}

export type SearchBoxAction = SearchBoxChangeAction;
