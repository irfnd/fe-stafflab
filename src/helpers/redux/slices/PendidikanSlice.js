import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const pendidikanAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const PendidikanSlice = createSlice({
	name: "pendidikan",
	initialState: pendidikanAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => pendidikanAdaptor.setAll(state, action.payload),
		add: pendidikanAdaptor.addOne,
		update: pendidikanAdaptor.updateOne,
		delete: pendidikanAdaptor.removeOne,
	},
});

export const PendidikanSelector = pendidikanAdaptor.getSelectors((state) => state.pendidikan);
export const PendidikanActions = PendidikanSlice.actions;

export default PendidikanSlice;
