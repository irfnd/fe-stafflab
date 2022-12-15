import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	session: null,
	subscription: null,
};

const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setSession: (state, action) => {
			state.session = action.payload;
		},
		reset: () => initialState,
	},
});

export const AuthSelector = (state) => state.auth;
export const AuthActions = AuthSlice.actions;

export default AuthSlice;
