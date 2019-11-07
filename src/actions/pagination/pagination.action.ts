import {
  PaginationActionTypes,
  SEARCH_PAGINATION_PAGE
} from './pagination.actionTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import { searchUpdate, searchAccommodationUpdate, searchFilterUpdate } from '../search/search.action';
import { SearchResponse } from '../../model/search';
import { RootAction } from '../action';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function setPaginationPage(page: number) : PaginationActionTypes {
  return {
      type: SEARCH_PAGINATION_PAGE,
      page
  }
}

export const loadNextPage = () : ThunkResult<void> => async (
  dispatch,
  getState: () => RootState
) => {
  if (getState().search.pagination.number >= getState().search.pagination.pages) {
    return;
  }

  dispatch(
    setPaginationPage(getState().search.pagination.number + 1)
  );
  dispatch(
    searchUpdate(
        (searchResponse: SearchResponse) => {
            dispatch(
              searchAccommodationUpdate(
                getState().search.accommodations.concat(searchResponse.accommodations)
              )
            );

            dispatch(
              searchFilterUpdate(
                searchResponse.filters
              )
            );            
        }
    )
  );
};