import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const statusPegawaiAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createAt),
});

const StatusPegawaiSlice = createSlice({
	name: "statusPegawai",
	initialState: statusPegawaiAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => statusPegawaiAdaptor.setAll(state, action.payload),
		add: statusPegawaiAdaptor.addOne,
		update: statusPegawaiAdaptor.updateOne,
		delete: statusPegawaiAdaptor.removeOne,
	},
});

export const StatusPegawaiSelector = statusPegawaiAdaptor.getSelectors((state) => state.statusPegawai);
export const StatusPegawaiActions = StatusPegawaiSlice.actions;

export default StatusPegawaiSlice;
