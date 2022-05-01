import { combineReducers } from "redux";

import profileReducer from "./profileReducer";
import eventReducer from "./eventReducer";
import ticketReducer from "./ticketReducer";
import transactionReducer from "./transactionReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
  event: eventReducer,
  ticket: ticketReducer,
  transaction: transactionReducer,
});

export default rootReducer;
