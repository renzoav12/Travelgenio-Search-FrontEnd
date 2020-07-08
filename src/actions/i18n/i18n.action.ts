import {
  setTranslations,
  IreduxI18nState,
  setLanguage,
  ITranslations,
} from "redux-i18n";
import axios, { AxiosResponse } from "axios";
import config from "./../../config";
import { ThunkAction } from "redux-thunk";
import { OriginHostHeader } from "../../api/headers";
import { setLocale } from "../locale/locale.action";

export const loadI18n = (): ThunkAction<
  any,
  IreduxI18nState,
  any,
  any
> => async (dispatch) => {
  let translations = await resolveTranslations();
  let locale = Object.keys(translations)[0];

  dispatch(setLocale(locale));

  dispatch(setTranslations(translations));
  dispatch(setLanguage(locale));
};

const resolveTranslations = async () => {
  const axiosInstance = axios.create({
    baseURL: config.TRANSLATION_API,
    headers: {
      ...OriginHostHeader,
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
