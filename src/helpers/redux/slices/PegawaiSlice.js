import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const PegawaiAdapter = createEntityAdapter({
	selectId: (pegawai) => pegawai.nip,
});

const PegawaiSlice = createSlice({
	name: "pegawai",
	initialState: PegawaiAdapter.getInitialState(),
	reducers: {
		set: (state, action) => PegawaiAdapter.setAll(state, action.payload),
		add: PegawaiAdapter.addOne,
		update: PegawaiAdapter.updateOne,
		delete: PegawaiAdapter.removeOne,
		reset: (state) => PegawaiAdapter.removeAll(state),
	},
});

export const PegawaiSelector = PegawaiAdapter.getSelectors((state) => state.pegawai);
export const PegawaiActions = PegawaiSlice.actions;

export default PegawaiSlice;
