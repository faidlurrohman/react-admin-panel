import { CLEAR_SESSION, SET_SESSION } from "stores/types";
import { setLoading } from "./feedback";
import api from "services";
import Cookies from "js-cookie";

export const setSession = (payload) => ({ type: SET_SESSION, payload });

export const login = (data) => (dispatch) => {
  dispatch(setLoading(true));

  data = { ...data, expiresInMins: 1800 }; // optional from API

  return api
    .post("/user/login", data)
    .then((response) => {
      if (response?.status === 200) {
        Cookies.set(
          import.meta.env.VITE_APP_ACCESS_TOKEN,
          response?.data?.accessToken,
          // 30 days
          { expires: 30, sameSite: "Strict" }
        );
        dispatch(getUser(response?.data?.id));
      }
    })
    .finally(() => dispatch(setLoading(false)));
};

export const getUser = (id) => async (dispatch) => {
  try {
    const user = await api.get(`/users/${id}`);
    dispatch(setSession(user?.data));
  } catch (error) {
    dispatch(setSession(null));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_SESSION });
};
