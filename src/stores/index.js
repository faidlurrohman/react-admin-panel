import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import localStorage from "redux-persist/lib/storage";
import reducers from "./reducers";

// create persist reducer
const PERSIST_STORAGE = {
  key: "persist-storage",
  storage: localStorage,
  blacklist: ["feedback"], // blacklist state will not be persisted
};
const persistedReducer = persistReducer(PERSIST_STORAGE, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
