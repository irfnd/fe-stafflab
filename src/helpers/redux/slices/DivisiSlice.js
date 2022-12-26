import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const DivisiAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const DivisiSlice = createSlice({
	name: "divisi",
	initialState: DivisiAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => DivisiAdaptor.setAll(state, action.payload),
		add: DivisiAdaptor.addOne,
		update: DivisiAdaptor.updateOne,
		delete: DivisiAdaptor.removeOne,
	},
});

export const DivisiSelector = DivisiAdaptor.getSelectors((state) => state.divisi);
export const DivisiActions = DivisiSlice.actions;

export default DivisiSlice;
