import { SearchActionTypes } from './search.actionTypes'
import { Action } from 'redux';
import { searchUpdate } from './searchFetchActions';
import { FilterBoxSelected } from '../../containers/FilterBox/FilterBoxContainer';

export interface FilterBoxChangeAction extends Action<SearchActionTypes.SAERCH_FILTER_CHANGED> {
    changed: FilterBoxSelected;
}

export const handleFilterBoxChange = (changed: FilterBoxSelected) => dispatch => {
    dispatch({
      type: SearchActionTypes.SAERCH_FILTER_CHANGED,
      changed: changed
    })
    dispatch(searchUpdate());
}

export type FilterBoxAction = FilterBoxChangeAction;
