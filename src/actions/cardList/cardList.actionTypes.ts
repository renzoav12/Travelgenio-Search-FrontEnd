import { Action } from "redux";

export const SEARCH_ACCOMMODATION_SELECT = "SEARCH_ACCOMMODATION_SELECT_";

export interface AccommodationSelectAction
  extends Action<typeof SEARCH_ACCOMMODATION_SELECT> {
  id: string;
}

export type ResultActionTypes = AccommodationSelectAction;
