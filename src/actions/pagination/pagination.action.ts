import {
  PaginationActionTypes,
  SEARCH_PAGINATION_PAGE,
  SEARCH_PAGINATION_UPDATE,
} from "./pagination.actionTypes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import {
  searchUpdate,
  searchAccommodationUpdate,
  searchFilterUpdate,
} from "../search/search.action";
import { SearchResponse, Pagination } from "../../model/search";
import { RootAction } from "../action";
import {mapAccommodationUpdate} from "../map/map.action";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function setPaginationPage(page: number): PaginationActionTypes {
  return {
    type: SEARCH_PAGINATION_PAGE,
    page,
  };
}

export function searchPaginationUpdate(
  pagination: Pagination
): PaginationActionTypes {
  return {
    type: SEARCH_PAGINATION_UPDATE,
    pagination,
  };
}

export const loadNextPage = (): ThunkResult<void> => async (
  dispatch,
  getState: () => RootState
) => {
  if (
    getState().search.pagination.number >= getState().search.pagination.pages
  ) {
    return;
  }

  var page = +getState().search.pagination.number + 1;

  dispatch(setPaginationPage(page));
  dispatch(
    searchUpdate((searchResponse: SearchResponse) => {
      dispatch(
        searchAccommodationUpdate(
          getState().search.accommodations.concat(searchResponse.accommodations)
        )
      );

      dispatch(searchFilterUpdate(searchResponse.filters));
      dispatch(mapAccommodationUpdate(searchResponse.accommodations));
    })
  );
};
