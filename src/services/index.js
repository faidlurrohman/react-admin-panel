import axios from "axios";
import Cookies from "js-cookie";
import { store } from "stores";
import { setLoading, setToast } from "stores/actions/feedback";
import { logout } from "stores/actions/session";
import i18n from "translations";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${Cookies.get(
        import.meta.env.VITE_APP_ACCESS_TOKEN
      )}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return error;
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('SUCCESS INTERCEPTOR ::: ', response);

    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      store.dispatch(
        setToast({
          severity: "error",
          message: error?.response?.data?.message ?? error?.message,
        })
      );
      store.dispatch(logout());
    } else if (error?.response?.status === 429) {
      store.dispatch(
        setToast({
          severity: "error",
          message: i18n.t("error:429"),
        })
      );
    } else if (error?.response?.status === 500) {
      store.dispatch(
        setToast({
          severity: "error",
          message: error?.response?.data?.message ?? error?.message,
        })
      );
    } else if (!error?.response && error?.code === "ERR_NETWORK") {
      store.dispatch(
        setToast({
          severity: "error",
          message: error?.response?.data?.message ?? error?.message,
        })
      );
    } else if (!error?.response && error?.code === "ECONNABORTED") {
      store.dispatch(setToast({ severity: "error", message: error?.message }));
    } else {
      store.dispatch(
        setToast({
          severity: "error",
          message: error?.response?.data?.message ?? error?.message,
        })
      );
    }

    store.dispatch(setLoading(false));

    console.log("REQUEST INTERCEPTOR ::: ", error.request);
    console.log("ERROR INTERCEPTOR ::: ", error);
    console.log("ERROR RESPONSE INTERCEPTOR ::: ", error.response);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response ?? error;
  }
);

export default api;
