import { RESET_SETTING, SET_SETTING } from "stores/types";

const initialstate = {
  original: {
    direction: "ltr",
    primary: "#1f55a2",
    language: "id",
    isDarkMode: false,
  },
  modified: {
    direction: null,
    primary: null,
    language: null,
    isDarkMode: null,
  },
};

export default function settingReducer(state = initialstate, action) {
  const { type, payload } = action;

  if (type === SET_SETTING) {
    return {
      ...state,
      modified: { ...state?.modified, ...payload },
    };
  }
  if (type === RESET_SETTING) {
    document.documentElement.style.setProperty(
      "--color-primary",
      initialstate?.original?.primary
    );

    return initialstate;
  }

  return state;
}
