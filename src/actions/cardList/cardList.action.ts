import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import { RootAction } from '../action';
import { SEARCH_ACCOMMODATION_SELECT, ResultActionTypes } from './cardList.actionTypes';
import { push } from 'connected-react-router';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function accommodationSelect(id: string) : ResultActionTypes {
  return {
    type: SEARCH_ACCOMMODATION_SELECT,
    id: id
  }
}

export const thunkAccommodationSelect = (accommodationId: string) => async (
  dispatch
) => {
  window.open("http://d1m9g3t59jyyir.cloudfront.net/Hotel%20Hilton-"+ accommodationId + "/2019-11-15/2019-11-24/2");
};