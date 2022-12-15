import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const divisiAdaptor = createEntityAdapter({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createAt),
});

const DivisiSlice = createSlice({
	name: "divisi",
	initialState: divisiAdaptor.getInitialState(),
	reducers: {
		set: (state, action) => divisiAdaptor.setAll(state, action.payload),
		add: divisiAdaptor.addOne,
		update: divisiAdaptor.updateOne,
		delete: divisiAdaptor.removeOne,
	},
});

export const DivisiSelector = divisiAdaptor.getSelectors((state) => state.divisi);
export const DivisiActions = DivisiSlice.actions;

export default DivisiSlice;
