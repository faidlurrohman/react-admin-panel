import { RESET_SETTING, SET_SETTING } from "stores/types";

export const setSetting = (payload) => ({ type: SET_SETTING, payload });
export const resetSetting = () => ({ type: RESET_SETTING });
