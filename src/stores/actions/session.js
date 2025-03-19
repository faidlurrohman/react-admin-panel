import { CLEAR_SESSION, SET_SESSION } from "stores/types";
import { setLoading } from "./feedback";
import api from "services";
import Cookies from "js-cookie";

export const setSession = (payload) => ({ type: SET_SESSION, payload });

export const login = (data) => (dispatch) => {
  dispatch(setLoading(true));

  return api
    .post("/auth/login", data)
    .then((response) => {
      if (response?.status === 201) {
        Cookies.set(
          import.meta.env.VITE_APP_ACCESS_TOKEN,
          response?.data?.access_token,
          // 30 days
          { expires: 30, sameSite: "Strict" }
        );

        dispatch(getUser());
      }
    })
    .finally(() => dispatch(setLoading(false)));
};

export const getUser = () => async (dispatch) => {
  try {
    const user = await api.get("/auth/profile");
    dispatch(setSession({ ...user?.data, username: user?.data?.name }));
  } catch (error) {
    dispatch(setSession(null));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_SESSION });
};
