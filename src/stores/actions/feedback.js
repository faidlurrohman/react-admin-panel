import { SET_INIT, SET_LOADING, SET_CONFIRM, SET_TOAST } from "stores/types";

export const setInit = (payload) => ({ type: SET_INIT, payload });
export const setToast = (payload) => ({ type: SET_TOAST, payload });
export const setLoading = (payload) => ({ type: SET_LOADING, payload });
export const setConfirm = (payload) => ({ type: SET_CONFIRM, payload });
