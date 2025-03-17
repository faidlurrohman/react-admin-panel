import Cookies from "js-cookie";
import localStorage from "redux-persist/lib/storage";
import { CLEAR_SESSION, SET_SESSION } from "stores/types";

const initialstate = { user: null };

export default function sessionReducer(state = initialstate, action) {
  const { type, payload } = action;

  if (type === SET_SESSION) {
    return { ...state, user: payload };
  }
  if (type === CLEAR_SESSION) {
    Cookies.remove(import.meta.env.VITE_APP_ACCESS_TOKEN);
    localStorage.removeItem("persist:persist-storage");
    return { ...state, user: null };
  }

  return state;
}
