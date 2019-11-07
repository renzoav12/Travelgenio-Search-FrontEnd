import { Action } from 'redux';
import { FilterBoxSelected } from '../../components/FilterBox/FilterBox';

export const SEARCH_FILTER_CHANGE = 'SEARCH_FILTER_CHANGE'

export interface FilterChangeAction extends Action<typeof SEARCH_FILTER_CHANGE> {
    changed: FilterBoxSelected;
}

export type FilterActionTypes = FilterChangeAction;
