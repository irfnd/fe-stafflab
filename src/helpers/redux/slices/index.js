import { combineReducers } from "@reduxjs/toolkit";

import AuthSlice from "@/helpers/redux/slices/AuthSlice";
import InstansiSlice from "@/helpers/redux/slices/InstansiSlice";
import DivisiSlice from "@/helpers/redux/slices/DivisiSlice";

const rootReducers = combineReducers({
	[AuthSlice.name]: AuthSlice.reducer,
	[InstansiSlice.name]: InstansiSlice.reducer,
	[DivisiSlice.name]: DivisiSlice.reducer,
});

export default rootReducers;
