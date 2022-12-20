import { combineReducers } from "@reduxjs/toolkit";

import AuthSlice from "@/helpers/redux/slices/AuthSlice";
import InstansiSlice from "@/helpers/redux/slices/InstansiSlice";
import DivisiSlice from "@/helpers/redux/slices/DivisiSlice";
import JabatanSlice from "@/helpers/redux/slices/JabatanSlice";
import StatusPegawaiSlice from "@/helpers/redux/slices/StatusPegawaiSlice";
import GolonganSlice from "@/helpers/redux/slices/GolonganSlice";

const rootReducers = combineReducers({
	[AuthSlice.name]: AuthSlice.reducer,
	[InstansiSlice.name]: InstansiSlice.reducer,
	[DivisiSlice.name]: DivisiSlice.reducer,
	[JabatanSlice.name]: JabatanSlice.reducer,
	[StatusPegawaiSlice.name]: StatusPegawaiSlice.reducer,
	[GolonganSlice.name]: GolonganSlice.reducer,
});

export default rootReducers;
