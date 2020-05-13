import { Action } from "redux";
import { FilterBoxSelected } from "../../components/FilterBox/FilterBox";

export const SEARCH_FILTER_CHANGE = "SEARCH_FILTER_CHANGE";
export const SEARCH_FILTER_CLEAN = "SEARCH_FILTER_CLEAN";

export interface FilterChangeAction
  extends Action<typeof SEARCH_FILTER_CHANGE> {
  changed: FilterBoxSelected;
}

export interface FilterCleanAction extends Action<typeof SEARCH_FILTER_CLEAN> {}

export type FilterActionTypes = FilterChangeAction | FilterCleanAction;
