import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./teamContext.js";

export default configureStore({
  reducer: {
    teamState: teamReducer,
  },
});
