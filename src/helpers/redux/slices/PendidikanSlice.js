import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const PendidikanAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const PendidikanSlice = createSlice({
	name: "pendidikan",
	initialState: PendidikanAdapter.getInitialState(),
	reducers: {
		set: (state, action) => PendidikanAdapter.setAll(state, action.payload),
		add: PendidikanAdapter.addOne,
		update: PendidikanAdapter.updateOne,
		delete: PendidikanAdapter.removeOne,
		reset: (state) => PendidikanAdapter.removeAll(state),
	},
});

export const PendidikanSelector = PendidikanAdapter.getSelectors((state) => state.pendidikan);
export const PendidikanActions = PendidikanSlice.actions;

export default PendidikanSlice;
