import {
  MapActionTypes,
  MAP_FETCH_START,
  MAP_FETCH_FAILED,
  MAP_FETCH_SUCCESS,
  MAP_ACCOMMODATION_UPDATE,
  MAP_VIEW_SHOW,
  MAP_LIST_VIEW_SHOW,
} from "./map.actionTypes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import { SearchResponse } from "../../model/search";
import { AxiosResponse } from "axios";
import search from "../../api/search/search";
import { searchCreateRequest } from "../search/search.converts";
import { CardProps } from "../../components/Card/Card";
import { RootAction } from "../action";
import { MapState } from "../../reducers/mapReducer";
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function mapFetchStart(): MapActionTypes {
  return {
    type: MAP_FETCH_START,
  };
}

export function mapFetchSuccess(): MapActionTypes {
  return {
    type: MAP_FETCH_SUCCESS,
  };
}

export function mapFetchFailed(): MapActionTypes {
  return {
    type: MAP_FETCH_FAILED,
  };
}

export function mapAccommodationUpdate(
  accommodations: CardProps[]
): MapActionTypes {
  return {
    type: MAP_ACCOMMODATION_UPDATE,
    accommodations: accommodations,
  };
}

export const fetch = () => async (
  dispatch,
  getState: () => RootState
) => {
  dispatch(mapFetchStart());
  
  const params = searchCreateRequest(getState());
  
  try {
    const response: AxiosResponse<SearchResponse> = await search.post(
      "/search",
      {...params, page: 1, pageSize: 1000}
    );
    dispatch(mapAccommodationUpdate(response.data.accommodations));
    dispatch(mapFetchSuccess());
  } catch (e) {
    console.error(e);
    dispatch(mapFetchFailed());
  }
};

export function mapViewShow(): MapActionTypes {
  return {
    type: MAP_VIEW_SHOW,
  };
}

export function mapListViewShow(): MapActionTypes {
  return {
    type: MAP_LIST_VIEW_SHOW,
  };
}

export const enableView = (mapView: boolean): ThunkResult<void> => async (
  dispatch,
  getState: () => RootState
) => {
  if(mapView) {
    dispatch(mapViewShow());
    dispatch(fetch());
  } else {
    dispatch(mapListViewShow());
  }
};


