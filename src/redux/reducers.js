import { combineReducers } from "redux";
import myFeatureReducer from "./features/myFeatureSlice";

const rootReducer = combineReducers({
  myFeature: myFeatureReducer,
});

export default rootReducer;
