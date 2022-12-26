import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const DataPribadiAdapter = createEntityAdapter({
	selectId: (dataPribadi) => dataPribadi.nipPegawai,
});

const DataPribadiSlice = createSlice({
	name: "dataPribadi",
	initialState: DataPribadiAdapter.getInitialState(),
	reducers: {
		set: (state, action) => DataPribadiAdapter.setAll(state, action.payload),
		add: DataPribadiAdapter.addOne,
		update: DataPribadiAdapter.updateOne,
		delete: DataPribadiAdapter.removeOne,
		reset: (state) => DataPribadiAdapter.removeAll(state),
	},
});

export const DataPribadiSelector = DataPribadiAdapter.getSelectors((state) => state.dataPribadi);
export const DataPribadiActions = DataPribadiSlice.actions;

export default DataPribadiSlice;
