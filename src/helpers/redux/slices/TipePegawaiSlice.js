import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const tipePegawaiAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const tipePegawaiSlice = createSlice({
	name: "tipePegawai",
	initialState: tipePegawaiAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => tipePegawaiAdaptor.setAll(state, action.payload),
		add: tipePegawaiAdaptor.addOne,
		update: tipePegawaiAdaptor.updateOne,
		delete: tipePegawaiAdaptor.removeOne,
	},
});

export const TipePegawaiSelector = tipePegawaiAdaptor.getSelectors((state) => state.tipePegawai);
export const TipePegawaiActions = tipePegawaiSlice.actions;

export default tipePegawaiSlice;
