import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const CutiAdapter = createEntityAdapter();

const CutiSlice = createSlice({
	name: "cuti",
	initialState: CutiAdapter.getInitialState(),
	reducers: {
		set: (state, action) => CutiAdapter.setAll(state, action.payload),
		add: CutiAdapter.addOne,
		update: CutiAdapter.updateOne,
		delete: CutiAdapter.removeOne,
	},
});

export const CutiSelector = CutiAdapter.getSelectors((state) => state.cuti);
export const CutiActions = CutiSlice.actions;

export default CutiSlice;
