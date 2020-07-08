import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import { RootAction } from "../action";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export enum LocaleActionTypes {
  SET = "SET_LOCALE",
}

interface SetLocale {
  type: LocaleActionTypes.SET;
  locale: string;
}

export const setLocale = (locale: string): ThunkResult<void> => async (
  dispatch
) => {
  handleSetLocale(dispatch, locale);
};

export const handleSetLocale = (
  dispatch: Dispatch<SetLocale>,
  locale: string
) => {
  dispatch({
    type: LocaleActionTypes.SET,
    locale,
  });
};

export type LocaleAction = SetLocale;
