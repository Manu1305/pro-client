import { createStore } from "redux";
import { reducers, } from "./rootReducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist:['userReducer']
};

const persistedReducer = persistReducer(persistConfig, reducers)


export const store = createStore(persistedReducer)

export const persistor = persistStore(store)