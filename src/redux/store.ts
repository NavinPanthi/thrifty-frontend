import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

// import storageSession from "redux-persist/lib/storage/session";

import userSlice from "./slices/user-slice";

// const persistConfig = {
//   key: "root",
//   storage: storageSession,
// };

// const persistedReducer = persistReducer(persistConfig, projectSlice);

export const store = configureStore({
  reducer: { user: userSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
