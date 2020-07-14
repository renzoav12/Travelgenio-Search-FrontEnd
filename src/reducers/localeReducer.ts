import { Reducer } from 'redux';
import { LocaleAction, LocaleActionTypes } from '../actions/locale/locale.action';

export interface LocaleState {
    code: string | null;
}

const initialState: LocaleState = {
    code: null,
};

export const localeReducer: Reducer<LocaleState, LocaleAction> = (
    state = initialState, 
    action
) => {
    switch (action.type) {
        case LocaleActionTypes.SET:
            return { ...state, code: action.locale};
        default:
            return state;
    }
};
