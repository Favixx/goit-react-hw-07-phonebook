import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filtersReducer } from './filterSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'contacts',
    storage,
    whitelist: ['contacts']
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);
const filterReducer = persistReducer(persistConfig, filtersReducer);

export const store = configureStore({
    reducer: {
        contacts: persistedReducer,
        filter: filterReducer,
    },
});
export const persistor = persistStore(store);