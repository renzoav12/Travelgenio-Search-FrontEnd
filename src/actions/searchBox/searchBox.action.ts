import {SEARCH_BOX_CHANGE, SearchBoxActionTypes} from './searchBox.actionTypes';
import { SearchBoxState } from '../../components/SearchBox/SearchBox';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import { RootAction } from '../action';
import { searchUpdate, searchAccommodationUpdate, searchFilterUpdate } from '../search/search.action';
import { SearchResponse } from '../../model/search';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function searchBoxChange(searchBoxState: SearchBoxState) : SearchBoxActionTypes {
  return {
      type: SEARCH_BOX_CHANGE,
      searchBoxState
  }
}

export const thunkSearchBoxChange = (searchBoxState: SearchBoxState): ThunkResult<void> => async (
  dispatch
) => {
  dispatch(searchBoxChange(searchBoxState));
  dispatch(
    searchUpdate(
        (searchResponse: SearchResponse) => {
            dispatch(searchAccommodationUpdate(searchResponse.accommodations));
            dispatch(searchFilterUpdate(searchResponse.filters));
        }
    )
  );
};

