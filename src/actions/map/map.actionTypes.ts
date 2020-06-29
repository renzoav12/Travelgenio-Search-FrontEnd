import { Action } from "redux";
import { CardProps } from "../../components/Card/Card";

export const MAP_FETCH_START = "MAP_FETCH_START";
export const MAP_FETCH_SUCCESS = "MAP_FETCH_SUCCESS";
export const MAP_FETCH_FAILED = "MAP_FETCH_FAILED";
export const MAP_ACCOMMODATION_UPDATE = "MAP_ACCOMMODATION_UPDATE";
export const MAP_VIEW_SHOW = "MAP_VIEW_SHOW";
export const MAP_LIST_VIEW_SHOW = "MAP_LIST_VIEW_SHOW";

export interface MapFetchStartAction
  extends Action<typeof MAP_FETCH_START> {}

export interface MapFetchFailedAction
  extends Action<typeof MAP_FETCH_SUCCESS> {}

export interface MapFetchSuccessAction
  extends Action<typeof MAP_FETCH_FAILED> {}

export interface MapAccommodationUpdateAction
  extends Action<typeof MAP_ACCOMMODATION_UPDATE> {
  accommodations: CardProps[];
}

export interface MapViewShowAction
  extends Action<typeof MAP_VIEW_SHOW> {}

export interface MapListViewShowAction
  extends Action<typeof MAP_LIST_VIEW_SHOW> {}

export type MapActionTypes =
  | MapFetchStartAction
  | MapFetchFailedAction
  | MapFetchSuccessAction
  | MapAccommodationUpdateAction
  | MapViewShowAction
  | MapListViewShowAction;
