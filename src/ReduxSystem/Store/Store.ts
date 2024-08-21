import { configureStore } from "@reduxjs/toolkit";
import { initialData } from "../SignSlice";
import { userslogindata } from "../userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import RememberSlice from "../RememberSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import Settings from "../Settings";
import { homeapi, suwarType } from "../RTkQuery/HomeApi";
import RecitersData from "../recitersData";
import RadioStateSlice from "./../RadioSlice";
import filterReciters from "../filterReciters";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["RememberSlice", "Settings"],
};
const combine = combineReducers({
  RememberSlice,
  initialData,
  userslogindata,
  Settings,
  RecitersData,
  RadioStateSlice,
  filterReciters,
  [homeapi.reducerPath]: homeapi.reducer,
  [suwarType.reducerPath]: suwarType.reducer,
});
const persistedReducer = persistReducer(persistConfig, combine);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(homeapi.middleware)
      .concat(suwarType.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
export const presistore = persistStore(store);
