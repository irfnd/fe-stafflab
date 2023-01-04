import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const MutasiAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const MutasiSlice = createSlice({
	name: "mutasi",
	initialState: MutasiAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => MutasiAdaptor.setAll(state, action.payload),
		add: MutasiAdaptor.addOne,
		update: MutasiAdaptor.updateOne,
		delete: MutasiAdaptor.removeOne,
	},
});

export const MutasiSelector = MutasiAdaptor.getSelectors((state) => state.mutasi);
export const MutasiActions = MutasiSlice.actions;

export default MutasiSlice;
