import { SET_INIT, SET_LOADING, SET_CONFIRM, SET_TOAST } from "stores/types";

const initialstate = { init: true, loading: false, toast: null, confirm: null };

export default function feedbackReducer(state = initialstate, action) {
  const { type, payload } = action;

  if (type === SET_INIT) {
    return { ...state, init: payload };
  }
  if (type === SET_LOADING) {
    return { ...state, loading: payload };
  }
  if (type === SET_TOAST) {
    return { ...state, toast: payload };
  }
  if (type === SET_CONFIRM) {
    return { ...state, confirm: payload };
  }

  return state;
}
