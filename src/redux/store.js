import authReducer from "./auth/reducer";
import questionReducer from "./question/reducer";
import adminReducer from "./admin/reducer";
import answerReducer from "./answer/reducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
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
import storage from "redux-persist/lib/storage";

const { configureStore, combineReducers } = require("@reduxjs/toolkit");

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
    }),
  ],
};
const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
  admin: adminReducer,
  answer: answerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
