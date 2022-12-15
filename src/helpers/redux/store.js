import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "@/helpers/redux/slices";

const store = configureStore({ reducer: rootReducers });

export default store;
