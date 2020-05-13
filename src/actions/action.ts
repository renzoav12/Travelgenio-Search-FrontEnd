import { SearchActionTypes } from "./search/search.actionTypes";
import { SearchBoxActionTypes } from "./searchBox/searchBox.actionTypes";
import { FilterActionTypes } from "./filterBox/filterBox.actionTypes";
import { PaginationActionTypes } from "./pagination/pagination.actionTypes";

export type RootAction =
  | SearchActionTypes
  | SearchBoxActionTypes
  | FilterActionTypes
  | PaginationActionTypes;
