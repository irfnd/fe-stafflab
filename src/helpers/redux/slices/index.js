import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "@/helpers/redux/slices/AuthSlice";
import InstansiSlice from "@/helpers/redux/slices/InstansiSlice";

const rootReducers = combineReducers({
	[AuthSlice.name]: AuthSlice.reducer,
	[InstansiSlice.name]: InstansiSlice.reducer,
});

export default rootReducers;
