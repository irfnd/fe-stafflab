import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const TipePegawaiAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const tipePegawaiSlice = createSlice({
	name: "tipePegawai",
	initialState: TipePegawaiAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => TipePegawaiAdaptor.setAll(state, action.payload),
		add: TipePegawaiAdaptor.addOne,
		update: TipePegawaiAdaptor.updateOne,
		delete: TipePegawaiAdaptor.removeOne,
	},
});

export const TipePegawaiSelector = TipePegawaiAdaptor.getSelectors((state) => state.tipePegawai);
export const TipePegawaiActions = tipePegawaiSlice.actions;

export default tipePegawaiSlice;
