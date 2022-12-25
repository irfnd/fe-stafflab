import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const InstansiAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const InstansiSlice = createSlice({
	name: "instansi",
	initialState: InstansiAdapter.getInitialState(),
	reducers: {
		set: (state, action) => InstansiAdapter.setAll(state, action.payload),
		add: InstansiAdapter.addOne,
		update: InstansiAdapter.updateOne,
		delete: InstansiAdapter.removeOne,
	},
});

export const InstansiSelector = InstansiAdapter.getSelectors((state) => state.instansi);
export const InstansiActions = InstansiSlice.actions;

export default InstansiSlice;
