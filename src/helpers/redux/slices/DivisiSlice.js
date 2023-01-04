import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const DivisiAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const DivisiSlice = createSlice({
	name: "divisi",
	initialState: DivisiAdapter.getInitialState(),
	reducers: {
		set: (state, action) => DivisiAdapter.setAll(state, action.payload),
		add: DivisiAdapter.addOne,
		update: DivisiAdapter.updateOne,
		delete: DivisiAdapter.removeOne,
	},
});

export const DivisiSelector = DivisiAdapter.getSelectors((state) => state.divisi);
export const DivisiActions = DivisiSlice.actions;

export default DivisiSlice;
