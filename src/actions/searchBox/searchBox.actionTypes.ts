import { Action } from 'redux';
import { SearchBoxState } from '@hotels/search-box';

export const SEARCH_BOX_CHANGE = 'SEARCH_BOX_CHANGE'

export interface SearchBoxChangeAction extends Action<typeof SEARCH_BOX_CHANGE> {
    searchBoxState: SearchBoxState;
}

export type SearchBoxActionTypes = SearchBoxChangeAction;
