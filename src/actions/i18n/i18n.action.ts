import {
  setTranslations,
  IreduxI18nState,
  setLanguage,
  ITranslations,
} from "redux-i18n";
import axios, { AxiosResponse } from "axios";
import config from "./../../config";
import { ThunkAction } from "redux-thunk";

export const loadI18n = (): ThunkAction<
  any,
  IreduxI18nState,
  any,
  any
> => async (dispatch) => {
  let translations = await resolveTranslations();

  dispatch(setTranslations(translations));
  dispatch(setLanguage(Object.keys(translations)[0]));
};

const resolveTranslations = async () => {
  const axiosInstance = axios.create({
    baseURL: config.TRANSLATION_API,
    headers: {
      "OT-Origin-Host": window.location.hostname,
    },
  });

  let translations: ITranslations = {};
  const key = "translations";
  const storage = window.sessionStorage;

  if (storage.getItem(key)) {
    translations = JSON.parse(storage.getItem(key) || "");
  } else {
    const response: AxiosResponse<any> = await axiosInstance.get(
      "/translations"
    );
    translations[response.data.locale] = response.data.translations;
    storage.setItem(key, JSON.stringify(translations));
  }

  return translations;
};
