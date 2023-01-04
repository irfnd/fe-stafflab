import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const StatusPegawaiAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const StatusPegawaiSlice = createSlice({
	name: "statusPegawai",
	initialState: StatusPegawaiAdapter.getInitialState(),
	reducers: {
		set: (state, action) => StatusPegawaiAdapter.setAll(state, action.payload),
		add: StatusPegawaiAdapter.addOne,
		update: StatusPegawaiAdapter.updateOne,
		delete: StatusPegawaiAdapter.removeOne,
	},
});

export const StatusPegawaiSelector = StatusPegawaiAdapter.getSelectors((state) => state.statusPegawai);
export const StatusPegawaiActions = StatusPegawaiSlice.actions;

export default StatusPegawaiSlice;
