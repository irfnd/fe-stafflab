import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const StatusPegawaiAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const StatusPegawaiSlice = createSlice({
	name: "statusPegawai",
	initialState: StatusPegawaiAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => StatusPegawaiAdaptor.setAll(state, action.payload),
		add: StatusPegawaiAdaptor.addOne,
		update: StatusPegawaiAdaptor.updateOne,
		delete: StatusPegawaiAdaptor.removeOne,
	},
});

export const StatusPegawaiSelector = StatusPegawaiAdaptor.getSelectors((state) => state.statusPegawai);
export const StatusPegawaiActions = StatusPegawaiSlice.actions;

export default StatusPegawaiSlice;
