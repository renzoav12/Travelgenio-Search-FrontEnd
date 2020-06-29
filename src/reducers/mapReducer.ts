import { Reducer } from "redux";
import { CardProps } from "../components/Card/Card";
import { RootAction } from "../actions/action";
import {
  MAP_FETCH_START,
  MAP_FETCH_FAILED,
  MAP_FETCH_SUCCESS,
  MAP_ACCOMMODATION_UPDATE,
  MAP_VIEW_SHOW,
  MAP_LIST_VIEW_SHOW,
} from "../actions/map/map.actionTypes";
import { store } from "../store";

export interface MapState {
  accommodations: CardProps[];
  loading: boolean;
  mapView: boolean;
}

const initialState: MapState = {
  accommodations: [],
  loading: false,
  mapView: false,
}

export const mapReducer: Reducer<MapState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MAP_FETCH_START:
      return { ...state, loading: true };
    case MAP_FETCH_FAILED:
      return { ...state, accommodations: [], loading: false };
    case MAP_FETCH_SUCCESS:
      return { ...state, loading: false };
    case MAP_ACCOMMODATION_UPDATE:
      return {
        ...state,
        accommodations: action.accommodations,
      };
    case MAP_VIEW_SHOW:
      return { ...state, mapView: true };
    case MAP_LIST_VIEW_SHOW:
      return { ...state, mapView: false };
    default:
      return state;
  }
};
