import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const MutasiAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const MutasiSlice = createSlice({
	name: "mutasi",
	initialState: MutasiAdapter.getInitialState(),
	reducers: {
		set: (state, action) => MutasiAdapter.setAll(state, action.payload),
		add: MutasiAdapter.addOne,
		update: MutasiAdapter.updateOne,
		delete: MutasiAdapter.removeOne,
		reset: (state) => MutasiAdapter.removeAll(state),
	},
});

export const MutasiSelector = MutasiAdapter.getSelectors((state) => state.mutasi);
export const MutasiActions = MutasiSlice.actions;

export default MutasiSlice;
