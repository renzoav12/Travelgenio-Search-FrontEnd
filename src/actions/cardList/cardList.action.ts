import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import { RootAction } from '../action';
import { SEARCH_ACCOMMODATION_SELECT, ResultActionTypes } from './cardList.actionTypes';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function accommodationSelect(id: string) : ResultActionTypes {
  return {
    type: SEARCH_ACCOMMODATION_SELECT,
    id: id
  }
}

export const thunkAccommodationSelect = (accommodationId: string) => async (
  dispatch,
  getState: () => RootState
) => {
  const host = "http://d1m9g3t59jyyir.cloudfront.net";
  const from = getState().search.box.stay.from.format("YYYY-MM-DD");
  const to = getState().search.box.stay.to.format("YYYY-MM-DD");
  const language = "es";
  const name = "Hotel";
  const occupancy = "2";

  const url = `${host}/${name}-${accommodationId}/${from}/${to}/${occupancy}/${language}`;
  window.open(url);
};