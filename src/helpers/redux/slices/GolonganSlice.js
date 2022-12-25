import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const GolonganAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const GolonganSlice = createSlice({
	name: "golongan",
	initialState: GolonganAdapter.getInitialState(),
	reducers: {
		set: (state, action) => GolonganAdapter.setAll(state, action.payload),
		add: GolonganAdapter.addOne,
		update: GolonganAdapter.updateOne,
		delete: GolonganAdapter.removeOne,
	},
});

export const GolonganSelector = GolonganAdapter.getSelectors((state) => state.golongan);
export const GolonganActions = GolonganSlice.actions;

export default GolonganSlice;
