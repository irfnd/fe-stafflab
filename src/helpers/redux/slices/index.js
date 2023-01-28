import { combineReducers } from "@reduxjs/toolkit";

import AuthSlice from "@/helpers/redux/slices/AuthSlice";
import DataPribadiSlice from "@/helpers/redux/slices/DataPribadiSlice";
import DivisiSlice from "@/helpers/redux/slices/DivisiSlice";
import DokumenSlice from "@/helpers/redux/slices/DokumenSlice";
import GolonganSlice from "@/helpers/redux/slices/GolonganSlice";
import InstansiSlice from "@/helpers/redux/slices/InstansiSlice";
import JabatanSlice from "@/helpers/redux/slices/JabatanSlice";
import PegawaiSlice from "@/helpers/redux/slices/PegawaiSlice";
import PendidikanSlice from "@/helpers/redux/slices/PendidikanSlice";
import StatusPegawaiSlice from "@/helpers/redux/slices/StatusPegawaiSlice";
import TipePegawaiSlice from "@/helpers/redux/slices/TipePegawaiSlice";
import MutasiSlice from "@/helpers/redux/slices/MutasiSlice";
import CutiSlice from "@/helpers/redux/slices/CutiSlice";

const rootReducers = combineReducers({
	[AuthSlice.name]: AuthSlice.reducer,
	[DataPribadiSlice.name]: DataPribadiSlice.reducer,
	[DivisiSlice.name]: DivisiSlice.reducer,
	[DokumenSlice.name]: DokumenSlice.reducer,
	[GolonganSlice.name]: GolonganSlice.reducer,
	[InstansiSlice.name]: InstansiSlice.reducer,
	[JabatanSlice.name]: JabatanSlice.reducer,
	[PegawaiSlice.name]: PegawaiSlice.reducer,
	[PendidikanSlice.name]: PendidikanSlice.reducer,
	[StatusPegawaiSlice.name]: StatusPegawaiSlice.reducer,
	[TipePegawaiSlice.name]: TipePegawaiSlice.reducer,
	[MutasiSlice.name]: MutasiSlice.reducer,
	[CutiSlice.name]: CutiSlice.reducer,
});

export default rootReducers;
