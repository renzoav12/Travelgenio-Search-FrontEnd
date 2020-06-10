import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import { RootAction } from "../action";
import {
  SEARCH_ACCOMMODATION_SELECT,
  ResultActionTypes,
} from "./cardList.actionTypes";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function accommodationSelect(id: string): ResultActionTypes {
  return {
    type: SEARCH_ACCOMMODATION_SELECT,
    id: id,
  };
}

export const thunkAccommodationSelect = (accommodationId: string) => async (
  dispatch,
  getState: () => RootState
) => {
  const basePath = "hotels/detail";
  const from = getState().search.box.stay.from?.format("YYYY-MM-DD");
  const to = getState().search.box.stay.to?.format("YYYY-MM-DD");
  const name = "Hotel";
  const occupancy = getState()
    .search.box.occupancy.rooms.map(
      (room) =>
        room.adults +
        (room.childrenAges.length === 0 ? "" : "-") +
        room.childrenAges.join("-")
    )
    .join("!");

  const url = `/${basePath}/${name}-${accommodationId}/${from}/${to}/${occupancy}`;
  window.open(url);
};
