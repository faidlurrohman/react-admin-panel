import { RESET_SETTING, SET_SETTING } from "stores/types";

const initialstate = {
  size: "middle",
  direction: "ltr",
  primary_color: "#1f55a2",
  theme: "light",
  radius: 6,
};

export default function settingReducer(state = initialstate, action) {
  const { type, payload } = action;

  if (type === SET_SETTING) {
    return { ...state, ...payload };
  }
  if (type === RESET_SETTING) {
    return initialstate;
  }

  return state;
}
