import { combineReducers } from "redux";

import profileReducer from "./profileReducer";
import eventReducer from "./eventReducer";
import ticketReducer from "./ticketReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
  event: eventReducer,
  ticket: ticketReducer,
});

export default rootReducer;
