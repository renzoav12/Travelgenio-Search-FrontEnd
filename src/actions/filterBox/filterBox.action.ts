import {
  SEARCH_FILTER_CHANGE,
  SEARCH_FILTER_CLEAN,
  FilterActionTypes,
} from "./filterBox.actionTypes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import { RootAction } from "../action";
import { SearchResponse } from "../../model/search";
import {
  searchAccommodationUpdate,
  searchFilterUpdate,
  searchUpdate,
} from "../search/search.action";
import { FilterBoxSelected } from "../../components/FilterBox/FilterBox";
import { searchPaginationUpdate } from "../pagination/pagination.action";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function filterBoxChange(
  filterBoxSelected: FilterBoxSelected
): FilterActionTypes {
  return {
    type: SEARCH_FILTER_CHANGE,
    changed: filterBoxSelected,
  };
}

export function cleanFilterBox(): FilterActionTypes {
  return {
    type: SEARCH_FILTER_CLEAN,
  };
}

export const thunkFilterBoxChange = (
  filterBoxSelected: FilterBoxSelected
): ThunkResult<void> => async (dispatch) => {
  dispatch(filterBoxChange(filterBoxSelected));
  dispatch(
    searchUpdate((searchResponse: SearchResponse) => {
      dispatch(searchAccommodationUpdate(searchResponse.accommodations));
      dispatch(searchFilterUpdate(searchResponse.filters));
      dispatch(searchPaginationUpdate(searchResponse.pagination));
    })
  );
};
