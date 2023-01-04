import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const TipePegawaiAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const tipePegawaiSlice = createSlice({
	name: "tipePegawai",
	initialState: TipePegawaiAdapter.getInitialState(),
	reducers: {
		set: (state, action) => TipePegawaiAdapter.setAll(state, action.payload),
		add: TipePegawaiAdapter.addOne,
		update: TipePegawaiAdapter.updateOne,
		delete: TipePegawaiAdapter.removeOne,
	},
});

export const TipePegawaiSelector = TipePegawaiAdapter.getSelectors((state) => state.tipePegawai);
export const TipePegawaiActions = tipePegawaiSlice.actions;

export default tipePegawaiSlice;
