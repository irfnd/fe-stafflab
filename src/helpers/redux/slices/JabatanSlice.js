import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const JabatanAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const JabatanSlice = createSlice({
	name: "jabatan",
	initialState: JabatanAdapter.getInitialState(),
	reducers: {
		set: (state, action) => JabatanAdapter.setAll(state, action.payload),
		add: JabatanAdapter.addOne,
		update: JabatanAdapter.updateOne,
		delete: JabatanAdapter.removeOne,
	},
});

export const JabatanSelector = JabatanAdapter.getSelectors((state) => state.jabatan);
export const JabatanActions = JabatanSlice.actions;

export default JabatanSlice;
