import {
  SEARCH_BOX_CHANGE,
  SearchBoxActionTypes,
} from "./searchBox.actionTypes";
import { SearchBoxState } from "@hotels/search-box";
import { ThunkAction } from "redux-thunk";
import { RootState, store } from "../../store";
import { RootAction } from "../action";
import {
  searchUpdate,
  searchAccommodationUpdate,
  searchFilterUpdate,
  searchSortUpdate,
} from "../search/search.action";
import { SearchResponse } from "../../model/search";
import { searchPaginationUpdate } from "../pagination/pagination.action";
import { cleanFilterBox } from "../filterBox/filterBox.action";
import {mapAccommodationUpdate, fetch as fetchMap} from "../map/map.action";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function searchBoxChange(
  searchBoxState: SearchBoxState
): SearchBoxActionTypes {
  return {
    type: SEARCH_BOX_CHANGE,
    searchBoxState,
  };
}

export const thunkSearchBoxChange = (
  searchBoxState: SearchBoxState
): ThunkResult<void> => async (dispatch) => {
  let mapView = store.getState().map.mapView;
  
  dispatch(cleanFilterBox());
  dispatch(searchBoxChange(searchBoxState));
  
  if(mapView){
    dispatch(fetchMap());
  }

  dispatch(
    searchUpdate((searchResponse: SearchResponse) => {
      dispatch(searchAccommodationUpdate(searchResponse.accommodations));
      dispatch(searchFilterUpdate(searchResponse.filters));
      dispatch(searchSortUpdate(searchResponse.sort));
      dispatch(searchPaginationUpdate(searchResponse.pagination));
      if(!mapView) {
        dispatch(mapAccommodationUpdate(searchResponse.accommodations));
      }
    })
  );
};
