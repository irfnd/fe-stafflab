import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const DokumenAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.uploadedAt.localeCompare(b.uploadedAt),
});

const DokumenSlice = createSlice({
	name: "dokumen",
	initialState: DokumenAdapter.getInitialState(),
	reducers: {
		set: (state, action) => DokumenAdapter.setAll(state, action.payload),
		add: DokumenAdapter.addOne,
		update: DokumenAdapter.updateOne,
		delete: DokumenAdapter.removeOne,
		reset: (state) => DokumenAdapter.removeAll(state),
	},
});

export const DokumenSelector = DokumenAdapter.getSelectors((state) => state.dokumen);
export const DokumenActions = DokumenSlice.actions;

export default DokumenSlice;
