import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const PendidikanAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const PendidikanSlice = createSlice({
	name: "pendidikan",
	initialState: PendidikanAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => PendidikanAdaptor.setAll(state, action.payload),
		add: PendidikanAdaptor.addOne,
		update: PendidikanAdaptor.updateOne,
		delete: PendidikanAdaptor.removeOne,
		reset: (state) => PendidikanAdaptor.removeAll(state),
	},
});

export const PendidikanSelector = PendidikanAdaptor.getSelectors((state) => state.pendidikan);
export const PendidikanActions = PendidikanSlice.actions;

export default PendidikanSlice;
