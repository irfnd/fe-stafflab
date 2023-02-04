import rootReducers from "@/helpers/redux/slices";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = { key: "stafflab", version: 1, storage, whitelist: ["auth"] };
const persistedReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
	reducer: persistedReducers,
	middleware: [thunk],
	devTools: import.meta.env.MODE === "development",
});

export const persistor = persistStore(store);

export default store;
