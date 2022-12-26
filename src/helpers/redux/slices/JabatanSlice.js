import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const JabatanAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const JabatanSlice = createSlice({
	name: "jabatan",
	initialState: JabatanAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => JabatanAdaptor.setAll(state, action.payload),
		add: JabatanAdaptor.addOne,
		update: JabatanAdaptor.updateOne,
		delete: JabatanAdaptor.removeOne,
	},
});

export const JabatanSelector = JabatanAdaptor.getSelectors((state) => state.jabatan);
export const JabatanActions = JabatanSlice.actions;

export default JabatanSlice;
