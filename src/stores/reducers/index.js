import { combineReducers } from "redux";

import sessionReducer from "./session";
import feedbackReducer from "./feedback";
import settingReducer from "./setting";

export default combineReducers({
  session: sessionReducer,
  feedback: feedbackReducer,
  setting: settingReducer,
});
