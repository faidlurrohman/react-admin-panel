import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// main app
import App from "app";
import "./index.css";
// dayjs
import dayjs from "dayjs";
import "dayjs/locale/id";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
// redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./stores";
/**
 * !!! TO DO
 * ? check new version of antd, currently not supporting React-19
 */
import "@ant-design/v5-patch-for-react-19";
import { StyleProvider } from "@ant-design/cssinjs";

// dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.locale("id");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyleProvider layer>
          <App />
        </StyleProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
