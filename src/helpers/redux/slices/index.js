import { combineReducers } from "@reduxjs/toolkit";

import AuthSlice from "@/helpers/redux/slices/AuthSlice";
import InstansiSlice from "@/helpers/redux/slices/InstansiSlice";
import DivisiSlice from "@/helpers/redux/slices/DivisiSlice";
import JabatanSlice from "@/helpers/redux/slices/JabatanSlice";
import StatusPegawaiSlice from "@/helpers/redux/slices/StatusPegawaiSlice";
import GolonganSlice from "@/helpers/redux/slices/GolonganSlice";
import PegawaiSlice from "@/helpers/redux/slices/PegawaiSlice";
import DataPribadiSlice from "@/helpers/redux/slices/DataPribadiSlice";
import DokumenSlice from "@/helpers/redux/slices/DokumenSlice";

const rootReducers = combineReducers({
	[AuthSlice.name]: AuthSlice.reducer,
	[InstansiSlice.name]: InstansiSlice.reducer,
	[DivisiSlice.name]: DivisiSlice.reducer,
	[JabatanSlice.name]: JabatanSlice.reducer,
	[StatusPegawaiSlice.name]: StatusPegawaiSlice.reducer,
	[GolonganSlice.name]: GolonganSlice.reducer,
	[PegawaiSlice.name]: PegawaiSlice.reducer,
	[DataPribadiSlice.name]: DataPribadiSlice.reducer,
	[DokumenSlice.name]: DokumenSlice.reducer,
});

export default rootReducers;
